<?php
/**
 * Messia_Page_Tmpl_Base
 *
 * @package Messia\Modules\Page
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Modules\Page\Skins;

use Smartbits\Messia\Includes\Modules\Messia_Module_Base;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Base class for all template for regular page render.
 *
 * @package Messia\Modules\Page
 */
abstract class Messia_Page_Tmpl_Base extends Messia_Module_Base {

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

		$this->blog_settings = MIA()->get_module_settings()->get_blog_setting( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME );
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
		wp_enqueue_style( 'messia-page' );
		wp_enqueue_script( 'messia-page' );
	}
}
