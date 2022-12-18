<?php
/**
 * Messia_Home_Tmpl_Base
 *
 * @package Messia\Modules\Home\Skins
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Modules\Home\Skins;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Smartbits\Messia\Includes\Modules\Messia_Module_Base;
use WP_Term;

/**
 * Base class for all template for home page render.
 *
 * @package Messia\Modules\Home\Skins
 */
abstract class Messia_Home_Tmpl_Base extends Messia_Module_Base {

	/**
	 * Current blog settings.
	 *
	 * @var array
	 */
	protected array $blog_settings = [];

	/**
	 * Messia_Listing_Tmpl_Base Constructor.
	 */
	protected function __construct() {
		parent::__construct();

		$this->blog_settings = MIA()->get_module( 'settings' )->get_blog_setting( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME );
		$this->init_hooks();
	}

	/**
	 * Child class forced to use it for page rendring.
	 *
	 * @return void
	 */
	abstract protected function generate_page(): void;

	/**
	 * Required in class WP hooks actions.
	 *
	 * @return void
	 */
	private function init_hooks(): void {
		add_filter( 'messia_post_title', [ $this, 'seo_title' ], 10, 2 );
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue' ] );
	}

	/**
	 * Enqueue page scripts & styles for this page type.
	 *
	 * @return void
	 */
	public function enqueue(): void {
		wp_enqueue_script( 'messia_home_js' );
		wp_enqueue_style( 'messia_home_css' );
	}

	/**
	 * Get base undeletable segment term.
	 *
	 * @return WP_Term|array|false
	 */
	protected function get_default_segment() {
		return MIA()->get_default_segment_term();
	}
}
