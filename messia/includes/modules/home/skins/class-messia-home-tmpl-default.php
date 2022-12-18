<?php
/**
 * Template Name: Default
 *
 * @package Messia\Modules\Home\Skins
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped

declare(strict_types=1);

namespace Smartbits\Messia\Includes\Modules\Home\Skins;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Smartbits\Messia\Includes\Modules\Home\Skins\Messia_Home_Tmpl_Base;
use WP_Term;

/**
 * Class template for home page render.
 *
 * @package Messia\Modules\Home\Skins
 */
class Messia_Home_Tmpl_Default extends Messia_Home_Tmpl_Base {


	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Home_Tmpl_Default
	 */
	private static ?Messia_Home_Tmpl_Default $instance = null; // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

	/**
	 * The default segment.
	 *
	 * @var WP_Term
	 */
	private ?WP_Term $default_segment = null; // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

	/**
	 * Messia_Home_Tmpl_Default Constructor.
	 */
	private function __construct() {
		parent::__construct();

		$this->set_assets();

		$this->default_segment = $this->get_default_segment();

		// TODO handle this event at the time of segment deletion.
		// 0 - segment not selected.
		// false - selected segment has been deleted.
		if (
			false === $this->default_segment instanceof WP_Term ||
			true === is_null( $this->default_segment ) ||
			false === $this->default_segment ||
			0 === $this->default_segment->term_id
		) {
			wp_die(
				sprintf( '<p><strong>%s</strong>: %s</p>', __( 'Error', 'messia' ), __( 'The main segment is not set when using the "One segment" main page template.', 'messia' ) ),
				__( 'Default Segment is not set', 'messia' ),
				[
					'response'  => 200,
					'back_link' => true,
				]
			);
		}
	}

	/**
	 * Messia Messia_Home_Tmpl_Default Instance.
	 * Ensures only one instance of Messia_Home_Tmpl_Default is loaded or can be loaded.
	 *
	 * @return Messia_Home_Tmpl_Default Instance.
	 */
	public static function instance(): Messia_Home_Tmpl_Default {

		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Set modules assets to register in WP and
	 * load it later on front.
	 *
	 * @return void
	 */
	private function set_assets(): void {

		$this->assets = [
			'styles'  => [
				[
					'handle' => 'messia_home_css',
					'src'    => '/assets/css/home-default.css',
					'deps'   => [ 'messia-frontend' ],
					'shared' => true,
				],
			],
			'scripts' => [
				[
					'handle'    => 'messia_home_js',
					'src'       => '/assets/js/home-default.js',
					'deps'      => [ 'messia-frontend' ],
					'in_footer' => true,
					'shared'    => true,
				],
			],
		];
	}

	/**
	 * Child class forced to use it for page rendring.
	 *
	 * @return void
	 */
	public function generate_page(): void {

		$shape_container = $this->get_shape();
		$page_content    = $this->get_content();

		?>
		<section id="post-<?php the_ID(); ?>" <?php post_class( 'messia-section' ); ?>>
		<?php
		echo $shape_container;
		echo $page_content;
		?>
		</section>
		<?php
	}

	/**
	 * Component for $this->generate_page(),
	 * output post content.
	 *
	 * @return string
	 */
	private function get_content(): string {

		ob_start();
		?>
		<div class="content">
			<?php the_content(); ?>
		</div>
		<?php
		return ob_get_clean();
	}

	/**
	 * Component for $this->generate_page(),
	 * output home hero area HTML.
	 *
	 * @return string
	 */
	private function get_shape(): string {

		$banner_html  = null;
		$content_html = null;

		$banner  = json_decode( $this->blog_settings['homepage_hero_image'] );
		$content = $this->blog_settings['homepage_hero_content'];

		if ( count( $banner ) > 0 ) {
			$banner_html = 'style="background: center / cover no-repeat url(' . wp_get_attachment_url( $banner[0]->id ) . ')";';
		}

		if ( ! empty( $content ) ) {
			$content_html = "<div class='container'>{$content}</div>";
		}

		ob_start();

		if ( ! is_null( $banner_html ) || ! is_null( $content_html ) ) {
			?>
			<div class="home-header py-5 min-vh-75 text-center d-flex align-items-center justify-content-center position-relative" <?php echo $banner_html; ?>>
				<div class="home-header-overlay position-absolute w-100 h-100 top-0 start-0"></div>
				<div class="zi-10 position-relative w-100">
					<?php echo do_blocks( $content_html ); ?>
				</div>
			</div>
			<?php
		}

		return ob_get_clean();
	}
}
