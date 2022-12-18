<?php
/**
 * Template Name: Default
 *
 * @package Messia\Modules\SinglePage
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Modules\Single\Skins;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Smartbits\Messia\Includes\Modules\Single\Skins\Messia_Single_Tmpl_Base;

/**
 * Class template for archive page render.
 *
 * @package Messia\Modules\SinglePage
 */
class Messia_Single_Tmpl_Default extends Messia_Single_Tmpl_Base {

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Single_Tmpl_Default
	 */
	private static ?Messia_Single_Tmpl_Default $instance = null; // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

	/**
	 * Messia_Single_Tmpl_Default Constructor.
	 */
	private function __construct() { // phpcs:ignore Generic.CodeAnalysis.UselessOverridingMethod.Found
		parent::__construct();
	}

	/**
	 * Messia_Single_Tmpl_Default Instance.
	 *
	 * Ensures only one instance of Messia_Single_Tmpl_Default is loaded or can be loaded.
	 *
	 * @return Messia_Single_Tmpl_Default Instance.
	 */
	public static function instance(): Messia_Single_Tmpl_Default {

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
					<div class="col content post postid-<?php echo get_the_ID(); ?>">
						<?php
						if ( have_posts() ) {

							$i = 0;

							while ( have_posts() ) {
								++$i;
								if ( $i > 1 ) {
									echo '<hr/>';
								}
								the_post();
								?>
								<div class="post-data">
									<?php $this->get_post(); ?>
								</div>
								<?php
							}

							$this->get_navigation();
							$this->get_comments();
							$this->get_comment_form();
						}
						?>
					</div>
				</div>
			</div>
		</section>
		<?php
	}

	/**
	 * Component for $this->generate_page(),
	 * output post HTML.
	 *
	 * @return void
	 */
	private function get_post(): void {

		$post_title = get_the_title();

		$this->get_post_categories();
		$this->get_image();
		?>
		<div class="title-rating title-rating d-flex align-items-center flex-wrap">
			<h2 class="flex-grow-1 my-3">
				<a href="<?php echo esc_url( get_permalink() ); ?>"><?php echo $post_title; ?></a>
			</h2>
			<?php
			$this->get_post_rating();
			?>
		</div>
		<?php
		$this->get_post_meta();
		$this->get_content();
	}

	/**
	 * Component for $this->get_post(),
	 * output post content.
	 *
	 * @return void
	 */
	private function get_content(): void {

		if ( is_attachment() ) {
			$post = get_post();
			echo wp_get_attachment_image( $post->ID, 'full' );

			if ( ! empty( $post->post_excerpt ) ) {
				echo "<p>{$post->post_excerpt}</p>";
			}

			if ( ! empty( $post->post_content ) ) {
				echo "<p>{$post->post_content}</p>";
			}
		} else {
			the_content();
		}
	}

	/**
	 * Component for $this->get_post(),
	 * output post categories HTML.
	 *
	 * @return void
	 */
	private function get_post_categories(): void {

		if ( has_category() ) {
			?>
			<div class="categories-post d-flex align-items-center mb-3">
				<span class="me-2"><?php esc_html_e( 'Categories:', 'messia' ); ?></span>
				<div><?php the_category( ' | ' ); ?></div>
			</div>
			<?php
		}
	}

	/**
	 * Component for $this->get_post(),
	 * output post data HTML (author, date etc..).
	 *
	 * @return void
	 */
	private function get_post_meta(): void {
		?>
		<ul class="characteristics-post mb-1 list-none p-0 d-flex align-items-center flex-wrap">
			<?php
			$this->get_post_meta_author();
			$this->get_post_meta_date();
			$this->get_post_meta_comments();
			$this->get_post_meta_tags();
			$this->get_post_edit_link();
			?>
		</ul>
		<?php
	}

	/**
	 * Component for $this->get_post_meta(),
	 * output post author HTML.
	 *
	 * @return void
	 */
	private function get_post_meta_author(): void {

		$icons = $this->helpers::get_theme_svg_icons();

		?>
		<li class="d-flex align-items-center me-3 mb-2">
			<?php echo $icons->user->icon; ?>
			<span class="meta-data author  ms-2">
			<?php
			printf(
				// translators: %s: Author name.
				__( 'By %s', 'messia' ),
				'<a href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author_meta( 'display_name' ) ) . '</a>'
			);
			?>
			</span>
		</li>
		<?php
	}

	/**
	 * Component for $this->get_post_meta(),
	 * output post date HTML.
	 *
	 * @return void
	 */
	private function get_post_meta_date(): void {

		$icons = $this->helpers::get_theme_svg_icons();

		?>
		<li class="d-flex align-items-center me-3 mb-2">
			<?php echo $icons->calendar->icon; ?>
			<span class="meta-data date  ms-2">
				<a href="<?php the_permalink(); ?>"><?php the_time( get_option( 'date_format' ) ); ?></a>
			</span>
		</li>
		<?php
	}

	/**
	 * Component for $this->get_post_meta(),
	 * output post comments link.
	 *
	 * @return void
	 */
	private function get_post_meta_comments(): void {

		$icons = $this->helpers::get_theme_svg_icons();

		if ( ! post_password_required() && ( comments_open() || get_comments_number() ) ) {

			?>
			<li class="d-flex align-items-center me-3 mb-2">
				<?php echo $icons->comment->icon; ?>
				<span class="meta-data comments  ms-2">
					<?php comments_popup_link(); ?>
				</span>
			</li>
			<?php
		}
	}

	/**
	 * Component for $this->get_post_meta(),
	 * output post tags cloud HTML.
	 *
	 * @return void
	 */
	private function get_post_meta_tags(): void {

		$icons = $this->helpers::get_theme_svg_icons();

		if ( has_tag() ) {

			?>
			<li class="d-flex align-items-center me-3 mb-2">
				<?php echo $icons->tag->icon; ?>
				<span class="meta-data tags  ms-2">
					<?php the_tags( '', ', ', '' ); ?>
				</span>
			</li>
			<?php
		}
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
		<li class="d-flex align-items-center me-3 mb-2">
			<?php echo $icons->edit->icon; ?>
			<span class="meta-data edit-post ms-2">
				<a href="<?php echo esc_url( $edit_url ); ?>">Edit</a>
			</span>
		</li>
		<?php
	}

	/**
	 * Component for $this->get_post_meta(),
	 * output post thumbnail HTML.
	 *
	 * @return void
	 */
	private function get_image(): void {

		the_post_thumbnail(
			'full',
			[
				'class' => 'blog-image',
			]
		);

		$caption = get_the_post_thumbnail_caption();

		if ( $caption ) {
			?>
			<figcaption class="wp-caption-text"><?php echo ( $caption ); ?></figcaption>
			<?php
		}
	}

	/**
	 * Component for $this->get_post_meta(),
	 * output post rating HTML.
	 *
	 * @return void
	 */
	private function get_post_rating(): void {

		$post_rating = $this->helpers::get_object_rating_snippet(
			get_the_ID(),
			[
				'stars'       => true,
				'date'        => false,
				'av_point'    => false,
				'av_point_of' => true,
				'reviews'     => false,
			],
			false
		);

		echo $post_rating;
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
			<div class="comments-wrapper mt-5 section-inner">
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
	 * Component for $this->generate_page(),
	 * output sidebar HTML.
	 *
	 * @return string
	 */
	private function get_sidebar(): ?string {
		if ( is_active_sidebar( 'sidebar-archive-post' ) ) {

			ob_start();
			dynamic_sidebar( 'sidebar-archive-post' );

			return ob_get_clean();
		}

		return null;
	}
}

