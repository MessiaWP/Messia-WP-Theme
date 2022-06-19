<?php
/**
 * Messia_Scripts
 *
 * @package Messia\Config
 */

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Config;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use PHPWee;
use Exception;

/**
 * Class register and minify all theme styles and scripts,
 * including external.
 *
 * @package Messia\Config
 */
class Messia_Scripts {

	/**
	 * Full class name.
	 *
	 * @var Messia_Help
	 */
	private static string $helpers;

	/**
	 * Real host name where theme running.
	 *
	 * @var string
	 */
	private static string $site_host;

	/**
	 * All theme settings relative to blog.
	 *
	 * @var array
	 */
	private static array $blog_settings;

	/**
	 * Class entry point where required actions fired.
	 *
	 * @return string
	 */
	public static function init(): string {

		self::$helpers       = MIA()->get_module( 'help' );
		self::$site_host     = wp_parse_url( get_site_url(), PHP_URL_HOST );
		self::$blog_settings = MIA()->get_module( 'settings' )->get_blog_setting( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME );

		add_action( 'messia_block_preview_requested', [ __CLASS__, 'scripts_front' ], 10 );
		add_action( 'wp_enqueue_scripts', [ __CLASS__, 'scripts_front' ], 9 );
		add_action( 'admin_init', [ __CLASS__, 'scripts_admin' ] );

		return __CLASS__;
	}

	/**
	 * Register all scripts and styles for using in frontend.
	 * Excluding assets of widgets and blcoks.
	 * They should do it them self.
	 *
	 * Shared key means that helper resolve_assets_path() will
	 * try to find a script/style in a child theme first.
	 *
	 * @return void
	 */
	public static function scripts_front(): void {

		$gcaptcha_html = self::$blog_settings['google_captcha_v3_public_key'];
		$gcaptcha_secr = self::$blog_settings['google_captcha_v3_secret_key'];

		$use_google_meterial_icons = self::$blog_settings['use_google_meterial_icons'];
		$fontawesome_kitname       = self::$blog_settings['fontawesome_kit_name'];
		$updated                   = self::$blog_settings['last_modified'];

		$data = [
			'styles'  => [
				[
					'handle' => 'messia-range',
					'src'    => '/assets/css/libraries/ion-range.css',
					'deps'   => [ 'messia-frontend' ],
					'shared' => true,
				],
				[
					'handle' => 'messia-fancybox',
					'src'    => '/assets/css/libraries/fancybox.css',
					'deps'   => [ 'messia-frontend' ],
					'shared' => true,
				],
				[
					'handle' => 'messia-slick',
					'src'    => '/assets/css/libraries/slick-carousel.css',
					'deps'   => [ 'messia-frontend' ],
					'shared' => true,
				],
				[
					'handle' => 'messia-frontend',
					'src'    => '/assets/css/frontend.css',
					'deps'   => [],
					'shared' => true,
				],
				[
					'handle' => 'messia-custom',
					'src'    => '/assets/css/_custom_blog_id_' . get_current_blog_id() . '.css',
					'deps'   => [],
					'shared' => true,
					'ver'    => $updated,
				],
				[
					'handle' => 'messia-errors',
					'src'    => '/assets/css/errors.css',
					'deps'   => [ 'messia-frontend' ],
					'shared' => true,
				],
				[
					'handle' => 'messia-archive',
					'src'    => '/assets/css/archive.css',
					'deps'   => [ 'messia-frontend' ],
					'shared' => true,
				],
				[
					'handle' => 'messia-page',
					'src'    => '/assets/css/page.css',
					'deps'   => [ 'messia-frontend' ],
					'shared' => true,
				],
				[
					'handle' => 'messia-single',
					'src'    => '/assets/css/single.css',
					'deps'   => [ 'messia-frontend' ],
					'shared' => true,
				],
				[
					'handle' => 'messia-comment-form',
					'src'    => '/assets/css/comment-form.css',
					'deps'   => [ 'messia-frontend' ],
					'shared' => true,
				],
				[
					'handle' => 'messia-comment-list',
					'src'    => '/assets/css/comment-list.css',
					'deps'   => [ 'messia-frontend' ],
					'shared' => true,
				],
			],
			'scripts' => [
				[
					// Worker registered to share it with child theme
					// It will be invoked by frontend.js script, not theme.
					'handle'    => 'messia-worker',
					'src'       => '/assets/js/messia-worker.js',
					'deps'      => [],
					'shared'    => true,
					'in_footer' => true,
				],
				[
					'handle'    => 'messia-range',
					'src'       => '/assets/js/libraries/ion-range.js',
					'deps'      => [ 'messia-frontend' ],
					'shared'    => true,
					'in_footer' => true,
				],
				[
					'handle'    => 'messia-fancybox',
					'src'       => '/assets/js/libraries/fancybox.js',
					'deps'      => [ 'messia-frontend' ],
					'shared'    => true,
					'in_footer' => true,
				],
				[
					'handle'    => 'messia-slick',
					'src'       => '/assets/js/libraries/slick-carousel.js',
					'deps'      => [ 'messia-frontend' ],
					'shared'    => true,
					'in_footer' => true,
				],
				[
					'handle'    => 'messia-frontend',
					'src'       => '/assets/js/frontend.js',
					'deps'      => [],
					'shared'    => true,
					'in_footer' => true,
				],
				[
					'handle'    => 'messia-archive',
					'src'       => '/assets/js/archive.js',
					'deps'      => [ 'messia-frontend' ],
					'shared'    => true,
					'in_footer' => true,
				],
				[
					'handle'    => 'messia-page',
					'src'       => '/assets/js/page.js',
					'deps'      => [ 'messia-frontend' ],
					'shared'    => true,
					'in_footer' => true,
				],
				[
					'handle'    => 'messia-single',
					'src'       => '/assets/js/single.js',
					'deps'      => [ 'messia-frontend' ],
					'shared'    => true,
					'in_footer' => true,
				],
				[
					'handle'    => 'messia-comment-form',
					'src'       => '/assets/js/comment-form.js',
					'deps'      => [ 'messia-frontend' ],
					'shared'    => true,
					'in_footer' => true,
				],
			],
		];

		$ext = [
			'styles'  => [],
			'scripts' => [],
		];

		if ( 1 === $use_google_meterial_icons ) {

			$srcs = [
				[
					'id'  => 'google-material-icons',
					'src' => 'https://fonts.googleapis.com/icon?family=Material+Icons&display=swap',
				],
				[
					'id'  => 'google-material-icons-outlined',
					'src' => 'https://fonts.googleapis.com/icon?family=Material+Icons+Outlined&display=swap',
				],
				[
					'id'  => 'google-material-icons-rounded',
					'src' => 'https://fonts.googleapis.com/icon?family=Material+Icons+Round&display=swap',
				],
				[
					'id'  => 'google-material-icons-two-tone',
					'src' => 'https://fonts.googleapis.com/icon?family=Material+Icons+Two+Tone&display=swap',
				],
				[
					'id'  => 'google-material-icons-sharp',
					'src' => 'https://fonts.googleapis.com/icon?family=Material+Icons+Sharp&display=swap',
				],
			];

			foreach ( $srcs as $font ) {
				$ext['styles'][] = [
					'handle' => $font['id'],
					'src'    => $font['src'],
					'deps'   => [],
				];
			}
		}

		if ( $gcaptcha_html && $gcaptcha_secr ) {
			$ext['scripts'][] = [
				'handle'    => 'gcaptcha-v3',
				'src'       => "https://www.google.com/recaptcha/api.js?render={$gcaptcha_html}",
				'deps'      => [],
				'in_footer' => true,
			];
		}

		if ( $fontawesome_kitname ) {
			$ext['scripts'][] = [
				'handle'    => 'fontawesome',
				'src'       => "https://kit.fontawesome.com/{$fontawesome_kitname}.js",
				'deps'      => [],
				'ver'       => null,
				'in_footer' => true,
			];
		}

		$modules = [
			MIA()->get_module( 'page' ),
			MIA()->get_module( 'listing' ),
			MIA()->get_module( 'object' ),
		];

		foreach ( $modules as $module ) {
			if ( true === is_null( $module ) ) {
				continue;
			}
			$module_assets = $module->get_assets();

			foreach ( $module_assets['styles'] as $module_style ) {
				$data['styles'][] = $module_style;
			}
			foreach ( $module_assets['scripts'] as $module_script ) {
				$data['scripts'][] = $module_script;
			}
		}

		// For debug only.
		// wp_deregister_style( 'dashicons' );

		self::register_scripts( $data );
		self::register_ext_scripts( $ext );
	}

	/**
	 * Register all scripts and styles except externas for using in backend.
	 *
	 * @return void
	 */
	public static function scripts_admin() {

		$use_google_meterial_icons = self::$blog_settings['use_google_meterial_icons'];

		$data = [
			'styles'  => [
				[
					'handle' => 'messia-backend',
					'src'    => '/assets/css/backend/backend.css',
					'deps'   => [ 'messia-jquery-ui', 'messia-select2', 'messia-dialog' ],
				],
				[
					'handle' => 'messia-fancybox',
					'src'    => '/assets/css/libraries/fancybox.css',
					'deps'   => [],
				],
				[
					'handle' => 'messia-dialog',
					'src'    => '/assets/css/backend/libraries/dialog.css',
					'deps'   => [],
				],
				[
					'handle' => 'messia-widgets',
					'src'    => '/assets/css/backend/widgets.css',
					'deps'   => [],
				],
				[
					'handle' => 'messia-post-edit',
					'src'    => '/assets/css/backend/post-edit.css',
					'deps'   => [],
				],
				[
					'handle' => 'messia-post-list',
					'src'    => '/assets/css/backend/post-list.css',
					'deps'   => [ 'messia-backend' ],
				],
				[
					'handle' => 'messia-term-edit',
					'src'    => '/assets/css/backend/term-edit.css',
					'deps'   => [ 'messia-jquery-ui' ],
				],
				[
					'handle' => 'messia-jquery-ui',
					'src'    => '/assets/css/backend/jquery-ui.css',
					'deps'   => [],
				],
				[
					'handle' => 'messia-settings',
					'src'    => '/assets/css/backend/settings.css',
					'deps'   => [ 'messia-spectrum' ],
				],
				[
					'handle' => 'messia-menu-page',
					'src'    => '/assets/css/backend/menu-page.css',
					'deps'   => [ 'messia-jquery-ui', 'messia-settings', 'messia-fancybox' ],
				],
				[
					'handle' => 'messia-media',
					'src'    => '/assets/css/backend/media.css',
					'deps'   => [],
				],
				[
					'handle' => 'messia-spectrum',
					'src'    => '/assets/css/backend/libraries/spectrum.css',
					'deps'   => [],
				],
				[
					'handle' => 'messia-select2',
					'src'    => '/assets/css/backend/libraries/select2.css',
					'deps'   => [],
				],
			],
			'scripts' => [
				[
					// Worker registered to share it with child theme
					// It will be invoked by backend.js script, not theme.
					'handle'    => 'messia-worker',
					'src'       => '/assets/js/messia-worker.js',
					'deps'      => [],
					'shared'    => true,
					'in_footer' => true,
				],
				[
					'handle'    => 'messia-backend',
					'src'       => '/assets/js/backend/backend.js',
					'deps'      => [ 'jquery', 'messia-select2', 'messia-dialog', 'jquery-ui-dialog', 'jquery-effects-drop' ],
					'in_footer' => true,
				],
				[
					'handle'    => 'messia-fancybox',
					'src'       => '/assets/js/libraries/fancybox.js',
					'deps'      => [],
					'in_footer' => true,
				],
				[
					'handle'    => 'messia-widgets-filters',
					'src'       => '/assets/js/backend/widgets-filters.js',
					'deps'      => [ 'jquery', 'jquery-ui-sortable' ],
					'in_footer' => true,
				],
				[
					'handle'    => 'messia-widget-tabs-panel',
					'src'       => '/assets/js/backend/widgets-tabs-panel.js',
					'deps'      => [ 'jquery', 'jquery-ui-sortable', 'jquery-effects-blind', 'jquery-effects-highlight' ],
					'in_footer' => true,
				],
				[
					'handle'    => 'messia-widgets-constructor-fields',
					'src'       => '/assets/js/backend/widgets-constructor-fields.js',
					'deps'      => [ 'jquery', 'jquery-ui-sortable' ],
					'in_footer' => true,
				],
				[
					'handle'    => 'messia-post-list',
					'src'       => '/assets/js/backend/post-list.js',
					'deps'      => [ 'jquery', 'jquery-effects-drop', 'jquery-ui-touch-punch', 'messia-backend' ],
					'in_footer' => true,
				],
				[
					'handle'    => 'messia-post-edit',
					'src'       => '/assets/js/backend/post-edit.js',
					'deps'      => [ 'jquery', 'jquery-ui-sortable', 'jquery-effects-drop', 'jquery-ui-tooltip', 'messia-radio-segment' ],
					'in_footer' => true,
				],
				[
					'handle'    => 'messia-term-edit',
					'src'       => '/assets/js/backend/term-edit.js',
					'deps'      => [ 'jquery', 'jquery-ui-draggable', 'jquery-ui-sortable', 'jquery-ui-droppable', 'jquery-ui-tooltip', 'jquery-ui-touch-punch' ],
					'in_footer' => true,
				],
				[
					'handle'    => 'messia-settings',
					'src'       => '/assets/js/backend/settings.js',
					'deps'      => [ 'jquery', 'jquery-ui-autocomplete', 'jquery-ui-sortable', 'jquery-ui-dialog', 'jquery-effects-fade', 'jquery-ui-touch-punch', 'messia-spectrum' ],
					'in_footer' => true,
				],
				[
					'handle'    => 'messia-menu-page',
					'src'       => '/assets/js/backend/menu-page.js',
					'deps'      => [ 'jquery', 'jquery-ui-tabs', 'jquery-effects-core', 'jquery-ui-draggable', 'jquery-ui-tooltip', 'jquery-effects-fade', 'messia-fancybox' ],
					'in_footer' => true,
				],
				[
					'handle'    => 'messia-spectrum',
					'src'       => '/assets/js/backend/libraries/spectrum.js',
					'deps'      => [],
					'in_footer' => true,
				],
				[
					'handle'    => 'messia-radio-segment',
					'src'       => '/assets/js/backend/libraries/radio-segment.js',
					'deps'      => [ 'wp-edit-post', 'wp-element', 'wp-editor', 'wp-components', 'wp-data', 'wp-plugins', 'wp-edit-post', 'wp-api', 'lodash' ],
					'in_footer' => true,
				],
				[
					'handle'    => 'messia-dialog',
					'src'       => '/assets/js/backend/libraries/dialog.js',
					'deps'      => [],
					'in_footer' => true,
				],
				[
					'handle'    => 'jquery-ui-touch-punch',
					'src'       => '/assets/js/backend/libraries/jquery-ui-touch-punch.js',
					'deps'      => [ 'jquery-ui-mouse' ],
					'in_footer' => true,
				],
				[
					'handle'    => 'messia-select2',
					'src'       => '/assets/js/backend/libraries/select2.js',
					'deps'      => [],
					'in_footer' => true,
				],
				[
					'handle'    => 'messia-media',
					'src'       => '/assets/js/backend/media.js',
					'deps'      => [ 'jquery', 'jquery-ui-draggable', 'jquery-ui-sortable', 'jquery-ui-droppable' ],
					'in_footer' => true,
				],
			],
		];

		$ext = [
			'styles'  => [],
			'scripts' => [],
		];

		if ( 1 === $use_google_meterial_icons ) {

			$srcs = [
				[
					'id'  => 'google-material-icons',
					'src' => 'https://fonts.googleapis.com/icon?family=Material+Icons',
				],
				[
					'id'  => 'google-material-icons-outlined',
					'src' => 'https://fonts.googleapis.com/icon?family=Material+Icons+Outlined',
				],
				[
					'id'  => 'google-material-icons-rounded',
					'src' => 'https://fonts.googleapis.com/icon?family=Material+Icons+Round',
				],
				[
					'id'  => 'google-material-icons-two-tone',
					'src' => 'https://fonts.googleapis.com/icon?family=Material+Icons+Two+Tone',
				],
				[
					'id'  => 'google-material-icons-sharp',
					'src' => 'https://fonts.googleapis.com/icon?family=Material+Icons+Sharp',
				],
			];

			foreach ( $srcs as $font ) {
				$ext['styles'][] = [
					'handle' => $font['id'],
					'src'    => $font['src'],
					'deps'   => [],
				];
			}
		}

		// @only for debug mode.
		// wp_deregister_script( 'heartbeat' );

		self::register_scripts( $data );
		self::register_ext_scripts( $ext );
	}

	/**
	 * Register scripts and styles in WP to make it available for enqueuing.
	 *
	 * @param array $data For Scripts.
	 *                    - handle    Defalt false                 - sript registration name.
	 *                    - src       Defalt false                 - path to file relative to theme 'includes' folder.
	 *                    - deps      Default []                   - dependencies array.
	 *                    - ver       Default MESSIA_THEME_VERSION - script version.
	 *                    - in_footer Default false                - Pint script into <head> or <body>.
	 *                    - shared    Default false                - If true theme will try to find script in child theme first.
	 *                    For styles.
	 *                    - handle    Defalt false                 - sript registration name.
	 *                    - src       Defalt false                 - path to file relative to theme 'includes' folder.
	 *                    - deps      Default []                   - dependencies array.
	 *                    - ver       Default MESSIA_THEME_VERSION - script version.
	 *                    - media     Default 'all'                - The media for which this stylesheet has been defined.
	 *                    - shared    Default false                - If true theme will try to find script in child theme first.
	 *
	 * @return void
	 */
	public static function register_scripts( array $data ): void {

		if ( isset( $data['scripts'] ) ) {

			foreach ( $data['scripts'] as $script ) {

				$script_args = wp_parse_args(
					$script,
					[
						'handle'    => false,
						'src'       => false,
						'deps'      => [],
						'ver'       => MESSIA_THEME_VERSION,
						'in_footer' => false,
						'shared'    => false,
					]
				);

				self::$helpers::resolve_assets_path( $script_args );

				if ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) {
					wp_register_script( $script_args['handle'], $script_args['src'], $script_args['deps'], $script_args['ver'], $script_args['in_footer'] );
				} else {

					$minified_url = self::minify( $script_args['handle'], $script_args['src'] );

					if ( false !== $minified_url ) {

						wp_register_script( $script_args['handle'], $minified_url, $script_args['deps'], $script_args['ver'], $script_args['in_footer'] );
					}
				}
			}
		}

		if ( isset( $data['styles'] ) ) {

			foreach ( $data['styles'] as $style ) {

				$style_args = wp_parse_args(
					$style,
					[
						'handle' => false,
						'src'    => false,
						'deps'   => [],
						'ver'    => MESSIA_THEME_VERSION,
						'media'  => 'all',
						'shared' => false,
					]
				);

				self::$helpers::resolve_assets_path( $style_args );

				if ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) {
					wp_register_style( $style_args['handle'], $style_args['src'], $style_args['deps'], $style_args['ver'], $style_args['media'] );
				} else {

					$minified_url = self::minify( $style_args['handle'], $style_args['src'] );

					if ( false !== $minified_url ) {

						wp_register_style( $style_args['handle'], $minified_url, $style_args['deps'], $style_args['ver'], $style_args['media'] );
					}
				}
			}
		}
	}

	/**
	 * Register external scripts and styles in WP to make it available for enqueuing.
	 *
	 * @param array $data Scripts and styles with data according to requirements of wp_register_script() and wp_register_style().
	 *
	 * @return void
	 */
	public static function register_ext_scripts( array $data ): void {

		if ( isset( $data['scripts'] ) ) {

			foreach ( $data['scripts'] as $script ) {

				$script_args = wp_parse_args(
					$script,
					[
						'handle'    => false,
						'src'       => false,
						'deps'      => [],
						'ver'       => null,
						'in_footer' => false,
					]
				);
				wp_register_script( $script_args['handle'], $script_args['src'], $script_args['deps'], $script_args['ver'], $script_args['in_footer'] );
			}
		}

		if ( isset( $data['styles'] ) ) {

			foreach ( $data['styles'] as $style ) {

				$style_args = wp_parse_args(
					$style,
					[
						'handle' => false,
						'src'    => false,
						'deps'   => [],
						'ver'    => null,
						'media'  => 'all',
					]
				);
				wp_register_style( $style_args['handle'], $style_args['src'], $style_args['deps'], $style_args['ver'], $style_args['media'] );
			}
		}
	}

	/**
	 * Register widget styles and script for front.
	 * Each widget should enqueue it themself.
	 *
	 * @param array $assets Styles and Scripts data.
	 *
	 * @return void
	 */
	public static function register_widget_frontend_assets( array $assets ): void {

		$min = '.min';

		if ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) {
			$min = null;
		}

		if ( array_key_exists( 'script', $assets ) && ! empty( $assets['script'] ) ) {

			$assets['script']['src'] = "/assets/js/blocks/{$assets['script']['file']}{$min}.js";
			self::$helpers::resolve_assets_path( $assets['script'] );

			$script_name_front = "messia-{$assets['script']['handle']}";

			wp_register_script(
				$script_name_front,
				$assets['script']['src'],
				$assets['script']['deps'],
				MESSIA_THEME_VERSION,
				true
			);
		}

		if ( array_key_exists( 'style', $assets ) && ! empty( $assets['style'] ) ) {

			$assets['style']['src'] = "/assets/js/blocks/{$assets['style']['file']}{$min}.js";
			self::$helpers::resolve_assets_path( $assets['style'] );

			$style_name_front = "messia-{$assets['style']['handle']}";

			wp_register_style(
				$style_name_front,
				$assets['style']['src'],
				$assets['style']['deps'],
				MESSIA_THEME_VERSION,
				'all'
			);
		}
	}

	/**
	 * Minify JS and CSS file content and save minified file to disk.
	 *
	 * @param string $handle Script or style registered in WP name.
	 * @param string $src Absolute path to source file registered in WP script or style.
	 *
	 * @return string|bool Path to min file or false.
	 * @throws Exception If PHPWee can not be loaded.
	 */
	private static function minify( string $handle, string $src ) {

		$minified = false;

		if ( false !== $src ) {

			$url = wp_parse_url( $src );

			if ( $url['host'] !== self::$site_host ) {
				return $src;
			}

			if ( is_multisite() ) {
				$url['path'] = str_replace( get_blog_details()->path, '/', $url['path'] );
			}

			$path       = dirname( $_SERVER['DOCUMENT_ROOT'] . $url['path'] );
			$src_name   = basename( $url['path'] );
			$path_parts = pathinfo( $src_name );
			$min_name   = "{$path_parts['filename']}.min.{$path_parts['extension']}";

			$src_full_path = $path . '/' . $src_name;
			$min_full_path = $path . '/' . $min_name;

			if ( ! file_exists( $src_full_path ) ) {
				return false;
			}

			if ( 'messia-custom' !== $handle ) {
				return dirname( $src ) . '/' . $min_name;
			}

			$src_time = filemtime( $src_full_path );

			if ( file_exists( $min_full_path ) ) {

				$min_time = filemtime( $min_full_path );

				( $min_time !== $src_time ) ? $do_min = true : $do_min = false;
			} else {
				$do_min = true;
			}

			if ( $do_min ) {

				if ( ! class_exists( 'PHPWee\Minify', false ) ) {
					require_once str_replace( '\\', '/', MESSIA_CORE_ABSPATH ) . '/phpwee/phpwee.php';
				}

				$ext    = pathinfo( $src_name, PATHINFO_EXTENSION );
				$to_min = file_get_contents( $src_full_path ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents

				if ( 'js' === $ext ) {
					$min = PHPWee\Minify::js( $to_min );
				} elseif ( 'css' === $ext ) {
					$min = PHPWee\Minify::css( $to_min );
				} else {
					$min = $to_min;
				}

				$min_file = file_put_contents( $min_full_path, $min ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_read_file_put_contents

				if ( false !== $min && false !== $min_file ) {
					touch( $min_full_path, $src_time );
					$minified = true;
				}
			} else {
				$minified = true;
			}
		}

		if ( false !== $minified ) {
			return dirname( $src ) . '/' . $min_name;
		} else {
			return false;
		}
	}
}
