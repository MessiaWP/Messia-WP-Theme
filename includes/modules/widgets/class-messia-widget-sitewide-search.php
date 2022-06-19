<?php
/**
 * Messia_Widget_Sitewide_Search
 *
 * @package Messia\Modules\Widgets
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Modules\Widgets;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use WP_Widget;

/**
 * Class for Search widget implementation.
 *
 * @package Messia\Modules\Widgets
 */
class Messia_Widget_Sitewide_Search extends WP_Widget {

	/**
	 * Whether or not widget available in blocks editor..
	 *
	 * @var bool
	 */
	private bool $as_block = false;

	/**
	 * Widget scripts and styles.
	 *
	 * @var array
	 */
	protected array $widget_assets = [];

	/**
	 * Widget constructor.
	 *
	 * @return void
	 */
	public function __construct() {

		$this->widget_assets = [
			'style'  => [
				'handle' => 'widget-sitewide-search',
				'file'   => 'block-sitewide-search',
				'deps'   => [ 'messia-frontend' ],
				'shared' => true,
			],
			'script' => [
				'handle' => 'widget-sitewide-search',
				'file'   => 'block-sitewide-search',
				'deps'   => [ 'messia-frontend' ],
				'shared' => true,
			],
		];

		parent::__construct(
			// Base ID.
			'messia_widget_sitewide_search',
			// Name.
			'&#10070; ' . esc_html__( 'Messia', 'messia' ) . ' &raquo; ' . esc_html__( 'Sitewide search', 'messia' ),
			// Args.
			[
				'description'           => __( 'Provides sitewide search.', 'messia' ),
				'classname'             => 'messia-widget-sitewide-search',
				'show_instance_in_rest' => false,
			]
		);
	}

	/**
	 * Render widget content in frontend.
	 *
	 * @param array $args All widget data it was registered with.
	 * @param array $instance Current saved value.
	 * @param bool  $block_mode Whether called as block (turn off then scripts and styles).
	 *
	 * @return void
	 */
	public function widget( $args, $instance, $block_mode = false ): void {

		if ( false === $block_mode ) {

			$scripts = MIA()->get_module( 'scripts' );
			$scripts::register_widget_frontend_assets( $this->widget_assets );

			// STYLES.
			wp_enqueue_style( 'messia-widget-sitewide-search' );

			// SCRIPTS.
			wp_enqueue_script( 'messia-widget-sitewide-search' );
		}

		$helpers = MIA()->get_module( 'help' );
		$svgs    = $helpers::get_theme_svg_icons();

		echo $args['before_widget'];
		echo $args['before_title'];

		if ( ! empty( $instance['title'] ) ) {
			echo "<span>{$instance['title']}</span>";
		}
		echo "<span class='d-block' data-bs-toggle='modal' data-bs-target='#searchbox'>{$svgs->search->icon}</span>";

		echo $args['after_title'];
		add_action( 'wp_footer', [ $this, 'get_search_form' ] );
		echo $args['after_widget'];
	}

	/**
	 * Render widget form in backend.
	 *
	 * @param mixed $instance Saved value.
	 *
	 * @return void
	 */
	public function form( $instance ): void {

		$instance = wp_parse_args(
			(array) $instance,
			[
				'title' => null,
			]
		);

		$title = esc_attr( $instance['title'] );

		?>
		<p><?php esc_html_e( 'Provides sitewide search.', 'messia' ); ?></p>
		<p>
			<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php esc_html_e( 'Title', 'messia' ); ?></label>
			<input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo $title; ?>" />
		</p>
		<?php
	}

	/**
	 * Save widget data into DB.
	 *
	 * @param mixed $new_instance New value.
	 * @param mixed $old_instance Previous value.
	 *
	 * @return array
	 */
	public function update( $new_instance, $old_instance ): array {

		$instance          = [];
		$instance['title'] = wp_strip_all_tags( $new_instance['title'] );

		return $instance;
	}

	/**
	 * Render WP search form.
	 *
	 * @return void
	 */
	public function get_search_form(): void {
		?>
		<div class="modal fade" id="searchbox" tabindex="-1" >
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content border-0">
					<div class="modal-header px-3 py-2">
						<h5 class="modal-title"><?php esc_html_e( 'Sitewide search', 'messia' ); ?></h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body p-5">
						<div class="searchbox d-flex justify-content-center">
							<?php get_search_form(); ?>
						</div>
					</div>
				</div>
			</div>
		</div>
		<?php
	}

	/**
	 * Getter of widget property "as_block".
	 *
	 * @return bool
	 */
	public function get_as_block(): bool {
		return $this->as_block;
	}
}
