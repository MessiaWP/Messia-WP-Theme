<?php
/**
 * Template Name: Default
 *
 * @package Messia\Modules\Objects\Skins
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped

declare( strict_types=1 );

namespace Smartbits\Messia\Includes\Modules\Objects\Skins;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Smartbits\Messia\Includes\Modules\Objects\Skins\Messia_Object_Tmpl_Base;

/**
 * Class template for object page render.
 *
 * @package Messia\Modules\Objects\Skins
 */
class Messia_Object_Tmpl_Default extends Messia_Object_Tmpl_Base {

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Object_Tmpl_Default
	 */
	private static ?Messia_Object_Tmpl_Default $instance = null; // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

	/**
	 * Messia_Object_Tmpl_Default Constructor.
	 */
	private function __construct() { // phpcs:ignore Generic.CodeAnalysis.UselessOverridingMethod.Found
		parent::__construct();

		$this->set_assets();
	}

	/**
	 * Messia_Object_Tmpl_Default Instance.
	 * Ensures only one instance of Messia_Object_Tmpl_Default is loaded or can be loaded.
	 *
	 * @return Messia_Object_Tmpl_Default Instance.
	 */
	public static function instance(): Messia_Object_Tmpl_Default {

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
					'handle' => 'messia-object',
					'src'    => '/assets/css/object-default.css',
					'deps'   => [ 'messia-frontend' ],
					'shared' => true,
				],
			],
			'scripts' => [
				[
					'handle'    => 'messia-object',
					'src'       => '/assets/js/object-default.js',
					'deps'      => [ 'messia-frontend' ],
					'in_footer' => true,
					'shared'    => true,
				],
			],
		];
	}

	/**
	 * Produce hole page HTML data.
	 *
	 * @return void
	 */
	public function generate_page(): void {

		$content_hero    = $this->get_content_hero();
		$content_top     = $this->get_content_top();
		$content_general = $this->get_content_general();
		$content_bottom  = $this->get_content_bottom();
		$content_sidebar = $this->get_sidebar();

		?>
		<section id="post-<?php the_ID(); ?>" <?php post_class( 'messia-section mt-4' ); ?>>
			<div class="container">
				<?php
				if ( ! empty( $content_hero ) ) {
					echo $content_hero;
				}
				?>
				<div class="row mb-5">
					<div class="col-xl-9 col-lg-9 flex-grow-1">
						<?php

						if ( ! empty( $content_top ) ) {
							echo $content_top;
						}

						if ( ! empty( $content_general ) || ! empty( $content_sidebar ) ) {

							if ( ! empty( $content_general ) ) {
								echo $content_general;
							}
						}

						?>
					</div>
					<?php
					if ( false === is_null( $content_sidebar ) ) {
						echo $content_sidebar;
					}
					?>
				</div>
				<?php

				if ( ! empty( $content_bottom ) ) {
					echo $content_bottom;
				}

				?>
			</div>
		</section>
		<?php
	}

	/**
	 * Component for $this->generate_page(),
	 * output sidebar HTML.
	 *
	 * @return string
	 */
	private function get_sidebar(): ?string {

		if ( is_active_sidebar( 'sidebar-object' ) ) {

			ob_start();
			?>
			<div class="col-xl-3 col-lg-3">
				<?php dynamic_sidebar( 'sidebar-object' ); ?>
			</div>
			<?php

			return ob_get_clean();
		}

		return null;
	}

	/**
	 * Component for $this->generate_page(),
	 * output very top content HTML.
	 *
	 * @return string
	 */
	private function get_content_hero(): ?string {

		if ( is_active_sidebar( 'widget-area-hero-object' ) ) {

			ob_start();
			dynamic_sidebar( 'widget-area-hero-object' );
			return ob_get_clean();
		}

		return null;
	}

	/**
	 * Component for $this->generate_page(),
	 * output content before general content HTML.
	 *
	 * @return string
	 */
	private function get_content_top(): ?string {

		if ( is_active_sidebar( 'widget-area-top-object' ) ) {
			ob_start();
			dynamic_sidebar( 'widget-area-top-object' );
			return ob_get_clean();
		}

		return null;
	}

	/**
	 * Component for $this->generate_page(),
	 * output general content page HTML.
	 *
	 * @return string
	 */
	private function get_content_general(): ?string {

		if ( is_active_sidebar( 'widget-area-general-object' ) ) {
			ob_start();
			?>
			<div class="content">
				<?php dynamic_sidebar( 'widget-area-general-object' ); ?>
			</div>
			<?php
			return ob_get_clean();
		}

		return null;
	}

	/**
	 * Component for $this->generate_page(),
	 * output content after general content HTML.
	 *
	 * @return string
	 */
	private function get_content_bottom(): ?string {

		if ( is_active_sidebar( 'widget-area-bottom-object' ) ) {
			ob_start();
			dynamic_sidebar( 'widget-area-bottom-object' );
			return ob_get_clean();
		}

		return null;
	}
}
