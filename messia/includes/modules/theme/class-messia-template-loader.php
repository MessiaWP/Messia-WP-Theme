<?php
/**
 * Messia_Template_Loader
 *
 * @package Messia\Modules\Theme
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Modules\Theme;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Exception;

/**
 * This class contains static specific methods.
 *
 * @package Messia\Modules\Theme
 */
class Messia_Template_Loader {

	/**
	 * Full class name.
	 *
	 * @var Messia_Help
	 */
	private static string $helpers;

	/**
	 * Get namespaced class name.
	 *
	 * @return Messia_Help
	 */
	public static function init(): string {
		self::$helpers = MIA()->get_module_helpers();
		return __CLASS__;
	}

	/**
	 * Searches for specific Messia template files. First of all, the search is
	 * carried out in the folders of the child theme if it is active.
	 * Child theme templates take precedence over parent theme
	 * templates and will overwrite them if names match. Only class files
	 * with the template name in the headers annotation are considered as templates.
	 *
	 * @param string $template One of listing|object|home.
	 *
	 * @return array fullyqualified_class_name => Human readable name.
	 */
	public static function search_messia_template( string $template ): array {

		$return         = [];
		$skins_set      = [];
		$post_templates = [];

		$templates_search_map = [
			'listing' => '/modules/listing/skins/',
			'object'  => '/modules/objects/skins/',
			'home'    => '/modules/home/skins/',
			'archive' => '/modules/archive/skins/',
			'page'    => '/modules/page/skins/',
			'single'  => '/modules/single/skins/',
		];

		if ( true === array_key_exists( $template, $templates_search_map ) ) {

			$relative_path = $templates_search_map[ $template ];

			$path_parent = MESSIA_CORE_ABSPATH . $relative_path;
			$path_child  = MESSIA_CORE_ABSPATH_CHILD . $relative_path;

			if ( is_dir( $path_parent ) ) {
				$skins_set['parent'] = $path_parent;
			}

			if ( is_child_theme() && is_dir( $path_child ) ) {
				$skins_set['child'] = $path_child;
			}
		} else {
			// translators: %1$s - template type, %2$s - method.
			$return['errors'][] = sprintf( __( 'Unrecognized template type <strong>%1$s</strong> passes to <strong>%2$s</strong>.', 'messia' ), $template, __METHOD__ );
		}

		foreach ( $skins_set as $scope => $skins_path ) {

			$suffixes = [];

			$skins = scandir( $skins_path );
			$skins = array_values( array_diff( $skins, [ '..', '.' ] ) );

			foreach ( $skins as $skin ) {

				if ( 'php' !== strtolower( pathinfo( $skin, PATHINFO_EXTENSION ) ) ) {
					continue;
				}
				if ( 'child' === $scope ) {
					$suffixes[] = __( 'Child theme', 'messia' );
				}

				$skin_file_content = file_get_contents( $skins_path . $skin ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents

				if ( ! preg_match( '|Template Name:(.*)$|mi', $skin_file_content, $header ) ) {
					continue;
				}

				preg_match( '/class\s+(\w+)(.*)(\s*)?\{/', $skin_file_content, $class );
				preg_match( '/namespace\s+(.*);/', $skin_file_content, $namespace );

				if ( ! isset( $class[1] ) ) {
					continue;
				}

				$fully_qualified_class_name = $class[1];

				if ( isset( $namespace[1] ) ) {
					$fully_qualified_class_name = "{$namespace[1]}\\{$fully_qualified_class_name}";
				}

				if ( isset( $post_templates[ $fully_qualified_class_name ] ) ) {
					// translators: %s - template name.
					$suffixes[] = sprintf( __( 'overrides %s', 'messia' ), '"' . $post_templates[ $fully_qualified_class_name ] . '"' );
				}

				if ( ! empty( $suffixes ) ) {
					$suffixes = ' (' . implode( ' ', $suffixes ) . ')';
				} else {
					$suffixes = null;
				}

				$post_templates[ $fully_qualified_class_name ] = _cleanup_header_comment( $header[1] . $suffixes );
			}
		}

		if ( empty( $post_templates ) ) {
			// translators: %s - template type.
			$return['errors'][] = sprintf( __( 'Fail to load default template class of type <strong>%s</strong>.', 'messia' ), $template );
		} else {

			$first_key               = key( $post_templates );
			$return['default']       = _cleanup_header_comment( $post_templates[ $first_key ] );
			$return['default_value'] = $first_key;

			unset( $post_templates[ $first_key ] );

			$return['options'] = $post_templates;
		}

		return $return;
	}

	/**
	 * Check that template name are still valid class and try to
	 * instantiate it.
	 * It could be setted, but then changed or deleted in child theme.
	 * Or child theme may become swithced off.
	 *
	 * @param string $template_class Full qualified class name of template.
	 * @param string $type           Template type listing|object|home.
	 *
	 * @return object Instance of template class.
	 * @throws Exception If class does not exists.
	 */
	public static function load_messia_themplate( string $template_class, string $type ): object {

		add_filter(
			'body_class',
			function( $classes ) use ( $type ) {
				$classes[] = "module-{$type}";
				return $classes;
			},
			20
		);

		try {
			$template = $template_class::instance();
		} catch ( Exception $e ) {

			// translators: %s - PHP class name.
			$errors[]      = sprintf( __( 'Template class %s for a page not found. Fallback to default one. Did you switched theme to parent?', 'messia' ), $template_class );
			$default_class = self::search_messia_template( $type );

			if ( false === isset( $default_class['default_value'] ) ) {

				$errors = array_merge( $errors, $default_class['errors'] );

				wp_die(
					sprintf( '<p><strong>%s</strong>: %s</p>', __( 'Fail to load template class:', 'messia' ), '<ul><li>' . implode( '</li><li>', $errors ) . '</li><ul>' ),
					__( 'Comment Submission Failure', 'messia' ),
					[
						'response'  => 404,
						'back_link' => true,
					]
				);
			}

			echo self::$helpers::print_errors( 'Template loading error', $errors );

			$template_class = $default_class['default_value'];
			$template       = $template_class::instance();
		}

		return $template;
	}

	/**
	 * Locate custom theme template in child (if On) and parent theme.
	 *
	 * @param string $file_name Template file name to search for.
	 *
	 * @return string
	 */
	public static function locate_custom_template( string $file_name ): string {

		// Try child theme first.
		if ( is_child_theme() ) {
			$template = MESSIA_THEME_DIR_CHILD . MESSIA_WP_TEMPLATES_PREFIX . "/{$file_name}";

			if ( is_readable( $template ) && is_file( $template ) && file_exists( $template ) ) {
				return $template;
			}
		}

		// Child theme did not override template, return parent.
		return MESSIA_THEME_DIR . MESSIA_WP_TEMPLATES_PREFIX . "/{$file_name}";
	}
}
