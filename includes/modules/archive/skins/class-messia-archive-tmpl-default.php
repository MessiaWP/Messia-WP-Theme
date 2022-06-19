<?php
/**
 * Template Name: Default
 *
 * @package Messia\Modules\Archive
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Modules\Archive\Skins;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class template for archive page render.
 *
 * @package Messia\Modules\Archive
 */
class Messia_Archive_Tmpl_Default extends Messia_Archive_Tmpl_Base {

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Archive_Tmpl_Default
	 */
	private static ?Messia_Archive_Tmpl_Default $instance = null; // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

	/**
	 * Messia_Archive_Tmpl_Default Constructor.
	 */
	private function __construct() { // phpcs:ignore Generic.CodeAnalysis.UselessOverridingMethod.Found
		parent::__construct();
	}

	/**
	 * Messia_Archive_Tmpl_Default Instance.
	 * Ensures only one instance of Messia_Archive_Tmpl_Default is loaded or can be loaded.
	 *
	 * @return Messia_Archive_Tmpl_Default Instance.
	 */
	public static function instance(): Messia_Archive_Tmpl_Default {

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
						<?php
						$this->get_search_subtitle();

						if ( have_posts() ) {
							$i = 0;
							while ( have_posts() ) {
								$i++;
								if ( $i > 1 ) {
									echo '<hr class="mb-5"/>';
								}
								the_post();
								?>
								<div class="post mb-5 post-id-<?php echo get_the_ID(); ?>"><?php $this->get_post(); ?></div>
								<?php
							}
						}
						$this->get_pagination();
						?>
					</div>
				</div>
			</div>
		</section>
		<?php
	}

	/**
	 * Component for $this->generate_page(),
	 * when request is of type WP Search.
	 * Output embedded WP search form.
	 *
	 * @return void
	 */
	private function get_search_subtitle(): void {

		if ( is_search() ) {
			global $wp_query;

			$search_form = null;

			if ( $wp_query->found_posts ) {
				$subtitle = sprintf(
					// translators: %s: Number of search results.
					_n(
						'%s result found.',
						'%s results found.',
						$wp_query->found_posts,
						'messia'
					),
					number_format_i18n( $wp_query->found_posts )
				);
			} else {
				$subtitle    = __( 'We could not find any results for your search. You can give it another try using the search form below.', 'messia' );
				$search_form = get_search_form( false );
			}
			?>
			<h2 class="text-center"><?php echo $subtitle; ?></h2>
			<div class="form-search-page"><?php echo $search_form; ?></div>
			<?php
		}
	}

	/**
	 * Component for $this->generate_page(),
	 * output post preview HTML.
	 *
	 * @return void
	 */
	private function get_post(): void {

		$post_url   = get_permalink();
		$post_title = get_the_title();
		$this->get_post_categories();
		$this->get_image();
		?>

		<div class="title-rating d-flex align-items-center flex-wrap mb-3">
			<h2 class="flex-grow-1 my-3"><a href="<?php echo esc_url( $post_url ); ?>">
				<?php echo $post_title; ?>
				</a>
			</h2>
			<?php $this->get_post_rating(); ?>
		</div>
		<?php $this->get_post_meta(); ?>
		<?php $this->get_content(); ?>
		<a class="messia-btn messia-ripple-click" href="<?php echo esc_url( $post_url ); ?>"><?php esc_html_e( 'Read more', 'messia' ); ?></a> 
		<?php
	}

	/**
	 * Component for $this->get_post(),
	 * output post excerpt data.
	 *
	 * @return void
	 */
	private function get_content(): void {
		the_excerpt();
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
			$this->get_post_meta_sticky();
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

		$svgs = $this->helpers::get_theme_svg_icons();

		?>
		<li class="d-flex align-items-center me-3 mb-2">
			<?php echo $svgs->user->icon; ?>
			<span class="ms-2">
			<?php
			printf(
				/* translators: %s: Author name */
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

		$svgs = $this->helpers::get_theme_svg_icons();

		?>
		<li class="d-flex align-items-center me-3 mb-2">
			<?php echo $svgs->calendar->icon; ?>
			<span class="ms-2">
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

		$svgs = $this->helpers::get_theme_svg_icons();

		if ( ! post_password_required() && ( comments_open() || get_comments_number() ) ) {

			?>
			<li class="d-flex align-items-center me-3 mb-2">
				<?php echo $svgs->comment->icon; ?>
				<span class="meta-data ms-2">
					<?php comments_popup_link(); ?>
				</span>
			</li>
			<?php
		}
	}

	/**
	 * Component for $this->get_post_meta(),
	 * output sticky post notification HTML.
	 *
	 * @return void
	 */
	private function get_post_meta_sticky(): void {

		$svgs = $this->helpers::get_theme_svg_icons();

		if ( is_sticky() ) {

			?>
			<li class="d-flex align-items-center me-3 mb-2">
				<?php echo $svgs->bookmark->icon; ?>
				<span class="meta-data ms-2">
					<?php esc_html_e( 'Sticky post', 'messia' ); ?>
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

		$svgs = $this->helpers::get_theme_svg_icons();

		if ( has_tag() ) {

			?>
			<li class="d-flex align-items-center me-3 mb-2">
				<?php echo $svgs->tag->icon; ?>
				<span class="meta-data ms-2">
					<?php the_tags( '', ', ', '' ); ?>
				</span>
			</li>
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
	 * Component for $this->generate_page(),
	 * output sidebar HTML.
	 *
	 * @return string
	 */
	private function get_sidebar(): ?string {
		if ( is_active_sidebar( 'sidebar-archive-post' ) ) {

			ob_start();
			?>

			<?php dynamic_sidebar( 'sidebar-archive-post' ); ?>
				<?php
				return ob_get_clean();
		}

		return null;
	}
}

