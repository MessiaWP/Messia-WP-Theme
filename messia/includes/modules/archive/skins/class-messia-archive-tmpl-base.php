<?php
/**
 * Messia_Page_Tmpl_Base
 *
 * @package Messia\Modules\Archive
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Modules\Archive\Skins;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Smartbits\Messia\Includes\Modules\Messia_Module_Base;

/**
 * Base class for all template for archive page render.
 *
 * @package Messia\Modules\Archive
 */
abstract class Messia_Archive_Tmpl_Base extends Messia_Module_Base {

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

		wp_enqueue_style( 'messia-archive' );
		wp_enqueue_script( 'messia-archive' );
	}

	/**
	 * Output blog archive page pagination HTML,
	 * should be invoked inside WP loop.
	 *
	 * @return void
	 */
	protected function get_pagination(): void {

		$prev_text = '&larr;';
		$next_text = '&rarr;';

		$posts_pagination = get_the_posts_pagination(
			[
				'mid_size'  => 1,
				'prev_text' => $prev_text,
				'next_text' => $next_text,
			]
		);

		if ( $posts_pagination ) {
			?>
			<div><?php echo $posts_pagination; ?></div>
			<?php
		}
	}
}
