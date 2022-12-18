<?php
/**
 * Messia Child Core
 *
 * @package MessiaChild
 */

/*
 * The value of MESSIA_THEME_NAMESPACE_BASE may be used as prefix for theme
 * custom templates classes namespace.
 * On runtime it will be replaced with real child theme root path value and joined with the rest of path.
 * It will be assumed as class directory path to search class within.
 * You may comment it out - default 'Smartbits\MessiaChild' will be used.
 */
define( 'MESSIA_THEME_NAMESPACE_BASE_CHILD', 'Smartbits\MessiaChild' );

/*
 * The path to the folder with the child theme assets.
 * You may comment it out - default '/includes' will be used.
 */
define( 'MESSIA_CODEPATH_PREFIX_CHILD', '/includes' );

add_action( 'wp_enqueue_scripts', 'messia_child_enqueue_scripts' );
add_action( 'messia_core_init', 'on_parent_theme_init' );

load_theme_textdomain( 'messia', get_stylesheet_directory() . '/includes/assets/langs' );

/**
 * Example.
 * Parent instantiated. All calasses loaded.
 * Possible way to extend any
 * of parent theme classes.
 *
 * @return void
 */
function on_parent_theme_init () {
	// add what you need to run.
}

/**
 * Example.
 * How to enqueue child theme styles and scripts.
 *
 * @return void
 */
function messia_child_enqueue_scripts() {
	wp_register_style( 'childstyle', get_stylesheet_directory_uri() . '/style.css' );
	wp_enqueue_style( 'childstyle' );
}
