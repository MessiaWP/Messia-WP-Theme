<?php
/**
 * Messia_Autoloader
 *
 * @package Messia
 */

declare(strict_types = 1);

namespace Smartbits\Messia\Includes;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

use Exception;

/**
 * Class that loads Messia and Messia Child classes.
 * Child goes first. Namespace part "Smartbits\Messia"
 * will be replaced with "includes" relative to theme folder.
 *
 * @package Messia
 */
class Messia_Autoloader {

	/**
	 * Paths to the includes directory.
	 *
	 * @var array
	 */
	private array $include_paths;

	/**
	 * Messia_Autoloader Constructor.
	 *
	 * @return void
	 */
	public function __construct() {
		if ( function_exists( '__autoload' ) ) {
			spl_autoload_register( '__autoload' );
		}

		if ( is_child_theme() ) {
			// If child theme is active try to load resources from it`s first.
			$this->include_paths['child'] = untrailingslashit( MESSIA_THEME_DIR_CHILD );
		}
		$this->include_paths['parent'] = untrailingslashit( MESSIA_THEME_DIR );

		$messia_autoloader = [ $this, 'autoload' ];

		/**
		 * Filter after messia PHP autoloader callback.
		 *
		 * @hook messia_autoloader_register
		 */
		$messia_autoloader = apply_filters( 'messia_autoloader_register', $messia_autoloader );

		spl_autoload_register( $messia_autoloader );

		/**
		 * Fire after messia PHP autoloader callback registered.
		 *
		 * @hook messia_autoload_registered
		 */
		do_action( 'messia_autoload_registered' );
	}

	/**
	 * Auto-load Messia classes on demand to reduce memory consumption.
	 *
	 * @param string $class Fully cvalified class name to search and include.
	 *
	 * @return void
	 */
	public function autoload( string $class ): void {

		if ( 0 !== strpos( $class, MESSIA_THEME_NAMESPACE_BASE ) ) {
			return;
		}

		$file = $this->get_filename_from_class( $class );
		$this->load_file( $file );
	}

	/**
	 * Take a class name and turn it into a file name following naming convention.
	 * If the class uses a namespace, then MESSIA_THEME_NAMESPACE_BASE(_CHILD) in the route
	 * will be replaced with the MESSIA_CODEPATH_PREFIX(_CHILD)
	 * Example: "Smartbits\Messia\Includes\Config\Messia_Settings" -> "includes\Config\Messia_Settings".
	 * The resulting string will be normalized to the correct file path.
	 *
	 * @param string $class Fully cvalified class name to search and include.
	 *
	 * @return string Path to the file.
	 */
	private function get_filename_from_class( string $class ): ?string {

		$class_path = null;

		// Replace fragments A,B.. with real directory name in "A\B\C\...".
		if ( 0 === strpos( $class, MESSIA_THEME_NAMESPACE_BASE_CHILD ) ) {
			$class = str_replace( MESSIA_THEME_NAMESPACE_BASE_CHILD, (string) null, $class ); // child may keep code whereever inside it's root.
		} elseif ( 0 === strpos( $class, MESSIA_THEME_NAMESPACE_BASE ) ) {
			$class = str_replace( MESSIA_THEME_NAMESPACE_BASE, (string) null, $class ); // parent keep code whereever inside it's root/includes.
		}

		// Low case all.
		$class = strtolower( $class );

		if ( false !== strpos( $class, 'messia' ) ) {

			// Replace _ with - to match file mames.
			$class = str_replace( '_', '-', $class );

			// Replace \ slashes to / - Unix format.
			$class = str_replace( '\\', '/', $class );

			// Get class name from path.
			$class_name = basename( $class );

			// Build file name and path.
			if ( false === strpos( $class, 'traits' ) ) {
				$class_path = str_replace( $class_name, 'class-' . $class_name . '.php', $class );
			} else {
				$class_path = str_replace( $class_name, 'trait-' . $class_name . '.php', $class );
			}
		}
		return $class_path;
	}

	/**
	 * Include a class file. The file will be included first of
	 * all from the child theme folder if it is active.
	 *
	 * @param string $file Full file name with namespace to include.
	 *
	 * @return void
	 * @throws Exception If fail to load file.
	 */
	private function load_file( string $file ): void {

		// First in array - Child theme.
		foreach ( $this->include_paths as $path ) {

			$fullpath = $path . $file;

			if ( is_readable( $fullpath ) && is_file( $fullpath ) && file_exists( $fullpath ) ) {

				/**
				 * Fire befole messia include class file.
				 *
				 * @hook messia_include_path
				 */
				$fullpath = apply_filters( 'messia_include_path', $fullpath );
				include_once $fullpath;

				/*
				 * If here - child theme is active and
				 * has valid file that was included above
				 * and it overrides parent file.
				 */
				return;
			}
		}

		throw new Exception( sprintf( 'Fail to include file by path %s.', $fullpath ) );
	}
}
