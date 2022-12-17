<?php
/**
 * Messia Theme entry point.
 *
 * @package Messia
 */

use Smartbits\Messia\Includes\{
	Messia_Requirements,
	Messia_Core,
};

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Define MESSIA_FUNCTIONS_FILE.
if ( ! defined( 'MESSIA_FUNCTIONS_FILE' ) ) {
	define( 'MESSIA_FUNCTIONS_FILE', __FILE__ );

	// Define MESSIA_THEME_DIR.
	if ( ! defined( 'MESSIA_THEME_DIR' ) ) {
		define( 'MESSIA_THEME_DIR', get_template_directory() );
	}

	// Define MESSIA_THEME_DIR_CHILD.
	if ( ! defined( 'MESSIA_THEME_DIR_CHILD' ) ) {
		define( 'MESSIA_THEME_DIR_CHILD', get_stylesheet_directory() );
	}
}

// Check requirements.
if ( ! class_exists( 'Messia_Requirements' ) ) {
	require_once __DIR__ . '/includes/class-messia-requirements.php';
	$requirements = Messia_Requirements::instance();
}

// Include the main Messia_Core class.
if ( ! class_exists( 'Messia_Core' ) ) {
	require_once __DIR__ . '/includes/class-messia-core.php';
}

/**
 * Returns the main instance of Messia.
 *
 * @return Messia_Core
 */
function MIA() { // phpcs:ignore WordPress.NamingConventions.ValidFunctionName.FunctionNameInvalid
	return Messia_Core::instance();
}

MIA();
