<?php
/**
 * Messia_Widget
 *
 * @package Messia\Modules\Widgets
 */

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Modules\Widgets;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register widgets and define base parameters.
 *
 * @package Messia\Modules\Widgets
 */
class Messia_Widget {

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Widget
	 */
	private static ?Messia_Widget $instance = null; // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

	/**
	 * Args for sidebars registartion.
	 *
	 * @var array
	 */
	private array $shared_args = [];

	/**
	 * Messia_Widget Constructor.
	 *
	 * @return void
	 */
	private function __construct() {
		$this->init_hooks();
	}

	/**
	 * Main Messia_Widget Instance.
	 * Ensures only one instance of Messia_Widget is loaded or can be loaded.
	 *
	 * @return Messia_Widget Instance.
	 */
	public static function instance(): Messia_Widget {

		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Enqueue required for this class WP hooks.
	 *
	 * @return void
	 */
	private function init_hooks(): void {

		add_action( 'widgets_init', [ $this, 'setup_widgets' ] );
		add_filter( 'widget_types_to_hide_from_legacy_widget_block', [ $this, 'hide_widgets_from_widget_blocks' ] );
	}

	/**
	 * Callback for WP widget_types_to_hide_from_legacy_widget_block filter.
	 * Filters the list of widget-type IDs that should **not** be offered by the
	 * Legacy Widget block.
	 *
	 * Returning an empty array will make all widgets available.
	 *
	 * @param array $excluded An array of excluded widget-type IDs.
	 *
	 * @return array
	 */
	public function hide_widgets_from_widget_blocks( array $excluded ): array {

		global $wp_widget_factory;

		$widgets = preg_grep( '/^Smartbits\\\\Messia\\\\Includes\\\\Modules\\\\Widgets/', array_keys( $wp_widget_factory->widgets ) );

		foreach ( $widgets as $widget_class ) {
			$as_block = $wp_widget_factory->widgets[ $widget_class ]->get_as_block();
			if ( false === $as_block ) {
				$excluded[] = $wp_widget_factory->widgets[ $widget_class ]->id_base;
			}
		}

		return $excluded;
	}

	/**
	 * Callback for WP widgets_init action.
	 * Register all messia widgets and widget areas.
	 *
	 * @return void
	 */
	public function setup_widgets() {

		// Arguments used in all register_sidebar() calls.
		$this->shared_args = [
			'before_title'   => '<h4 class="widget-title subheading">',
			'after_title'    => '</h4>',
			'before_widget'  => '<div class="widget %2$s regular"><div class="widget-content">',
			'after_widget'   => '</div></div>',
			'before_sidebar' => '<div id="%1$s" class="%2$s">',
			'after_sidebar'  => '</div>',
		];

		register_sidebar(
			array_merge(
				$this->shared_args,
				[
					'id'          => 'widget-area-header-top-col-1',
					'name'        => __( 'Header top (column 1)', 'messia' ),
					'class'       => 'widget-area widget-area-header-top-col-1',
					'description' => __( 'Place here the widgets that you want to be on the very top of your pages.', 'messia' ),
				]
			)
		);

		register_sidebar(
			array_merge(
				$this->shared_args,
				[
					'id'          => 'widget-area-header-top-col-2',
					'name'        => __( 'Header top (column 2)', 'messia' ),
					'class'       => 'widget-area widget-area-header-top-col-2',
					'description' => __( 'Place here the widgets that you want to be on the very top of your pages.', 'messia' ),
				]
			)
		);

		register_sidebar(
			array_merge(
				$this->shared_args,
				[
					'id'          => 'widget-area-header-right',
					'name'        => __( 'Header right', 'messia' ),
					'class'       => 'widget-area widget-area-header-right',
					'description' => __( 'Place here the widgets that you want to be to the right of the main menu.', 'messia' ),
				]
			)
		);

		register_sidebar(
			array_merge(
				$this->shared_args,
				[
					'id'          => 'widget-area-footer-top-col-1',
					'name'        => __( 'Footer top (column 1)', 'messia' ),
					'class'       => 'widget-area widget-area-footer-top-col-1',
					'description' => __( 'Place here the widgets that you want to be at the bootom of your pages after content.', 'messia' ),
				]
			)
		);

		register_sidebar(
			array_merge(
				$this->shared_args,
				[
					'id'          => 'widget-area-footer-top-col-2',
					'name'        => __( 'Footer top (column 2)', 'messia' ),
					'class'       => 'widget-area widget-area-footer-top-col-2',
					'description' => __( 'Place here the widgets that you want to be at the bootom of your pages after content.', 'messia' ),
				]
			)
		);

		register_sidebar(
			array_merge(
				$this->shared_args,
				[
					'id'          => 'widget-area-footer-top-col-3',
					'name'        => __( 'Footer top (column 3)', 'messia' ),
					'class'       => 'widget-area widget-area-footer-top-col-3',
					'description' => __( 'Place here the widgets that you want to be at the bootom of your pages after content.', 'messia' ),
				]
			)
		);

		register_sidebar(
			array_merge(
				$this->shared_args,
				[
					'id'          => 'widget-area-footer-top-col-4',
					'name'        => __( 'Footer top (column 4)', 'messia' ),
					'class'       => 'widget-area widget-area-footer-top-col-4',
					'description' => __( 'Place here the widgets that you want to be at the bootom of your pages after content.', 'messia' ),
				]
			)
		);

		register_sidebar(
			array_merge(
				$this->shared_args,
				[
					'id'          => 'widget-area-footer-bottom-col-1',
					'name'        => __( 'Footer bottom (column 1)', 'messia' ),
					'class'       => 'widget-area widget-area-footer-bottom-col-1',
					'description' => __( 'Place here the widgets that you want to be at the very bootom of page after footer top area.', 'messia' ),
				]
			)
		);

		register_sidebar(
			array_merge(
				$this->shared_args,
				[
					'id'          => 'widget-area-footer-bottom-col-2',
					'name'        => __( 'Footer bottom (column 2)', 'messia' ),
					'class'       => 'widget-area widget-area-footer-bottom-col-2',
					'description' => __( 'Place here the widgets that you need at the very bootom of page after footer top area.', 'messia' ),
				]
			)
		);

		register_sidebar(
			array_merge(
				$this->shared_args,
				[
					'id'          => 'sidebar-object',
					'name'        => __( 'Sidebar of Object page', 'messia' ),
					'class'       => 'sidebar sidebar-object position-sticky',
					'description' => __( 'Place here the widgets that you want to be at the sidebar on your object page.', 'messia' ),
				]
			)
		);

		register_sidebar(
			array_merge(
				$this->shared_args,
				[
					'id'          => 'sidebar-search',
					'name'        => __( 'Sidebar of Search page', 'messia' ),
					'class'       => 'sidebar sidebar-search',
					'description' => __( 'Place here the widgets that you want to be at the sidebar of the object list page.', 'messia' ),
				]
			)
		);

		register_sidebar(
			array_merge(
				$this->shared_args,
				[
					'id'          => 'sidebar-page',
					'name'        => __( 'Sidebar of Regular page', 'messia' ),
					'class'       => 'sidebar sidebar-page',
					'description' => __( 'Place here the widgets that you want to be at any regular WP page.', 'messia' ),
				]
			)
		);

		register_sidebar(
			array_merge(
				$this->shared_args,
				[
					'id'          => 'sidebar-archive-post',
					'name'        => __( 'Sidebar of Archive post', 'messia' ),
					'class'       => 'sidebar sidebar-archive-post',
					'description' => __( 'Place here the widgets that you want to be at WP archive page.', 'messia' ),
				]
			)
		);

		register_sidebar(
			array_merge(
				$this->shared_args,
				[
					'id'          => 'widget-area-hero-listing',
					'name'        => __( 'Search page Hero', 'messia' ),
					'class'       => 'widget-area widget-area-hero-listing',
					'description' => __( 'Place here the widgets that you want to be right after header at listing page.', 'messia' ),
				]
			)
		);

		register_sidebar(
			array_merge(
				$this->shared_args,
				[
					'id'          => 'widget-area-general-listing',
					'name'        => __( 'Search page content', 'messia' ),
					'class'       => 'widget-area widget-area-general-listing',
					'description' => __( 'Place here the widgets that you want to be at the main part of search page, after the header.', 'messia' ),
				]
			)
		);

		register_sidebar(
			array_merge(
				$this->shared_args,
				[
					'id'          => 'widget-area-bottom-listing',
					'name'        => __( 'Search page bootm', 'messia' ),
					'class'       => 'widget-area widget-area-bottom-listing',
					'description' => __( 'Place here the widgets that you want to be at the bottom of object page, after content and sidebar.', 'messia' ),
				]
			)
		);

		register_sidebar(
			array_merge(
				preg_replace( '/regular/m', 'flat', $this->shared_args ),
				[
					'id'          => 'widget-area-hero-object',
					'name'        => __( 'Object page Hero', 'messia' ),
					'class'       => 'widget-area widget-area-hero-object',
					'description' => __( 'Place here the widgets that you want to be at the top of object page, after the header.', 'messia' ),
				]
			)
		);

		register_sidebar(
			array_merge(
				$this->shared_args,
				[
					'id'          => 'widget-area-top-object',
					'name'        => __( 'Object page top', 'messia' ),
					'class'       => 'widget-area widget-area-top-object',
					'description' => __( 'Place here the widgets that you want to be at the top of object page, after the hero area.', 'messia' ),
				]
			)
		);

		register_sidebar(
			array_merge(
				$this->shared_args,
				[
					'id'          => 'widget-area-general-object',
					'name'        => __( 'Object page content', 'messia' ),
					'class'       => 'widget-area widget-area-general-object',
					'description' => __( 'Place here the widgets that you want to be at the main part of object page, after top zone.', 'messia' ),
				]
			)
		);

		register_sidebar(
			array_merge(
				preg_replace( '/regular/m', 'flat', $this->shared_args ),
				[
					'id'          => 'widget-area-bottom-object',
					'name'        => __( 'Object page bottom', 'messia' ),
					'class'       => 'widget-area widget-area-bottom-object',
					'description' => __( 'Place here the widgets that you want to be at the bottom of object page, after content and sidebar.', 'messia' ),
				]
			)
		);

		register_widget( Messia_Widget_Category_Crosslinks::class );
		register_widget( Messia_Widget_Custom_Fields::class );
		register_widget( Messia_Widget_Object_Categories::class );
		register_widget( Messia_Widget_Object_Properties::class );
		register_widget( Messia_Widget_Tabs_Panel::class );
		register_widget( Messia_Widget_Listing_Filters::class );
		register_widget( Messia_Widget_Listing_Data::class );
		register_widget( Messia_Widget_Sitewide_Search::class );
		register_widget( Messia_Widget_Post_Content::class );
	}

	/**
	 * Getter for $this->shared_args.
	 *
	 * @return array
	 */
	public function get_shared_args(): array {
		return $this->shared_args;
	}
}
