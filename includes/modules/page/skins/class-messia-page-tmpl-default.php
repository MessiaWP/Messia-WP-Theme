<?php
/**
 * Template Name: Default
 *
 * @package Messia\Modules\Page
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped

declare( strict_types=1 );

namespace Smartbits\Messia\Includes\Modules\Page\Skins;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Smartbits\Messia\Includes\Modules\Page\Skins\Messia_Page_Tmpl_Base;

/**
 * Class template for regular page render.
 *
 * @package Messia\Modules\Page
 */
class Messia_Page_Tmpl_Default extends Messia_Page_Tmpl_Base {

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Page_Tmpl_Default
	 */
	private static ?Messia_Page_Tmpl_Default $instance = null; // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

	/**
	 * Messia_Page_Tmpl_Default Constructor.
	 */
	private function __construct() { // phpcs:ignore Generic.CodeAnalysis.UselessOverridingMethod.Found
		parent::__construct();
	}

	/**
	 * Messia Messia_Page_Tmpl_Default Instance.
	 * Ensures only one instance of Messia_Page_Tmpl_Default is loaded or can be loaded.
	 *
	 * @return Messia_Page_Tmpl_Default Instance.
	 */
	public static function instance(): Messia_Page_Tmpl_Default {

		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Produce hole page HTML data.
	 *
	 * @return void
	 */
	public function generate_page(): void {

		$sidebar = $this->get_sidebar();
		?>
		<section id="post-<?php the_ID(); ?>" <?php post_class( 'messia-section mt-4' ); ?>>
			<div class="container">
				<div class="row">
					<?php if ( false === is_null( $sidebar ) ) { ?>
						<div class="col-xl-3 col-lg-3 mb-3 order-<?php echo ( 'left' === $this->blog_settings['sidebar_position'] ) ? 0 : 1; ?>">
							<?php echo $sidebar; ?>
						</div>
					<?php } ?>
					<div class="col content">
						<div class="post-data">
							<?php the_content(); ?>
						</div>
						<?php
						$this->get_comments();
						$this->get_comment_form();
						$this->get_post_edit_link();
						?>
					</div>
				</div>
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
		if ( is_active_sidebar( 'sidebar-page' ) ) {

			ob_start();
			?>

			<?php dynamic_sidebar( 'sidebar-page' ); ?>
			<?php
			return ob_get_clean();
		}

		return null;
	}

	/**
	 * Component for $this->generate_page(),
	 * output post comments list HTML.
	 *
	 * @return void
	 */
	private function get_comments(): void {

		if ( ( is_single() || is_page() ) && ( comments_open() || get_comments_number() ) && ! post_password_required() ) {
			?>
			<div class="comments-wrapper section-inner mt-5">
				<?php comments_template(); ?>
			</div>
			<?php
		}
	}

	/**
	 * Component for $this->generate_page(),
	 * output post new comment form HTML.
	 *
	 * @return void
	 */
	private function get_comment_form(): void {
		echo '<div class="widget widget_comments regular mt-4">' . do_shortcode( '[add_review_form]' ) . '</div>';
	}

	/**
	 * Component for $this->get_post_meta(),
	 * output post edit URL.
	 *
	 * @return void
	 */
	private function get_post_edit_link(): void {

		$edit_url = get_edit_post_link();

		if ( ! $edit_url ) {
			return;
		}

		$icons = $this->helpers::get_theme_svg_icons();
		?>
		<div class="d-flex my-2">
			<?php echo $icons->edit->icon; ?>
			<span class="meta-data edit-post ml-2">
				<a href="<?php echo esc_url( $edit_url ); ?>">Edit</a>
			</span>
		</div>
		<?php
	}
}
