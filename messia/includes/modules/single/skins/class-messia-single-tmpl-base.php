<?php
/**
 * Messia_Single_Tmpl_Base
 *
 * @package Messia\Modules\SinglePage
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Modules\Single\Skins;

use Smartbits\Messia\Includes\Modules\Messia_Module_Base;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Base class for all template for archive page render.
 *
 * @package Messia\Modules\SinglePage
 */
abstract class Messia_Single_Tmpl_Base extends Messia_Module_Base {

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
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue' ] );
	}

	/**
	 * Enqueue page scripts & styles for this page type.
	 *
	 * @return void
	 */
	public function enqueue(): void {
		wp_enqueue_style( 'messia-single' );
		wp_enqueue_script( 'messia-single' );
	}

	/**
	 * Output single post pagination HTML,
	 * should be invoked inside WP loop.
	 *
	 * @return void
	 */
	protected function get_navigation(): void {

		$date_format = get_option( 'date_format' );
		$next_post   = get_next_post();
		$prev_post   = get_previous_post();

		if ( $next_post || $prev_post ) {

			$staff_data         = null;
			$pagination_classes = '';

			if ( ! $next_post ) {
				$pagination_classes = ' only-one only-prev';
			} elseif ( ! $prev_post ) {
				$pagination_classes = ' only-one only-next';
			}

			if ( 1 === $this->blog_settings['wp_post_smooth_update'] ) {
				$staff_data = 'data-smooth="true"';
			}

			?>
			<nav class="section-inner<?php echo esc_attr( $pagination_classes ); ?>" role="navigation" <?php echo $staff_data; ?>>
				<div class="pagination-single-inner d-flex justify-content-between flex-wrap mt-5">
					<?php
					if ( $prev_post ) {

						$post_url   = get_permalink( $prev_post->ID );
						$post_title = mb_strimwidth( get_the_title( $prev_post->ID ), 0, 25, '...' );
						$thumbnail  = $this->get_thumbnail( $prev_post->ID );
						?>

						<a class="previous-post messia-ripple-click d-flex align-items-center mb-4 fs-6" href="<?php echo esc_url( $post_url ); ?>">
							<span class="background-post-nav d-block flex-shrink-0" style="background-image: url(<?php echo esc_url( $thumbnail ); ?>)"></span>
							<span class="title-date-container flex-grow-1 p-2">
								<span class="title-post-nav d-block px-3"><?php echo wp_kses_post( $post_title ); ?></span>
								<span class="date-post-nav px-3 mt-2"><?php echo get_the_date( $date_format, $prev_post->ID ); ?></span>
							</span>
						</a>

						<?php
					}

					if ( $next_post ) {

						$post_url   = get_permalink( $next_post->ID );
						$post_title = mb_strimwidth( get_the_title( $next_post->ID ), 0, 35, '...' );
						$thumbnail  = $this->get_thumbnail( $next_post->ID );
						?>

						<a class="next-post messia-ripple-click d-flex align-items-center mb-4 fs-6" href="<?php echo esc_url( $post_url ); ?>">
							<span class="background-post-nav d-block flex-shrink-0 order-3" style="background-image: url(<?php echo esc_url( $thumbnail ); ?>)"></span>
							<span class="title-date-container flex-grow-1 p-2">
								<span class="title-post-nav d-block px-3"><?php echo wp_kses_post( $post_title ); ?></span>
								<span class="date-post-nav px-3 mt-2"><?php echo get_the_date( $date_format, $next_post->ID ); ?></span>
							</span>
						</a>
						<?php
					}
					?>
				</div>
			</nav>
			<?php
		}
	}

	/**
	 * Get post thumnail URL or dummy if none.
	 *
	 * @param int $post_id WP_Post ID.
	 *
	 * @return string
	 */
	private function get_thumbnail( int $post_id ): string {

		if ( has_post_thumbnail( $post_id ) ) {
			$thumbnail = get_the_post_thumbnail_url( $post_id, 'thumbnail' );
		} else {
			$thumbnail = '/wp-content/themes/messia/includes/assets/images/svg/thumbnail-placeholder.svg';
		}
		return $thumbnail;
	}
}
