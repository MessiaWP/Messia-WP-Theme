<?php
/**
 * Messia_Widget_Listing_Data
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
 * Class for listing results implementation.
 *
 * @package Messia\Modules\Widgets
 */
class Messia_Widget_Listing_Data extends WP_Widget {

	/**
	 * Full class name.
	 *
	 * @var Messia_Help
	 */
	private string $helpers;

	/**
	 * Whether or not widget available in blocks editor.
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

		$this->helpers = MIA()->get_module( 'help' );

		parent::__construct(
			// Base ID.
			'Messia_Widget_Listing_Data',
			// Name.
			'&#10070; ' . esc_html__( 'Messia', 'messia' ) . ' &raquo; ' . esc_html__( 'Listing results', 'messia' ),
			// Args.
			[
				'description'           => __( 'Shows listing results.', 'messia' ),
				'classname'             => 'messia-widget-listing-data',
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

		if ( false === $block_mode ) { // phpcs:ignore: Generic.CodeAnalysis.EmptyStatement.DetectedIf
			// STYLES.
			// Nothing here. Listing is a page served as a module with own assests.

			// SCRIPTS.
			// Nothing here. Listing is a page served as a module with own assests.
		}

		$errors  = [];
		$listing = MIA()->get_module( 'listing' );

		if ( is_null( $listing ) ) {

			// translators: %s - widget or block name.
			$errors[] = sprintf( __( '%s can be used only at valid listing page.', 'messia' ), $this->name );
			$errors   = $this->helpers::print_errors( $this->name, $errors );

			echo $args['before_widget'];
			echo $errors;
			echo $args['after_widget'];
		} else {
			echo MIA()->get_module( 'listing' )->get_listing( $args, $instance );
		}
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
				// Keys should be the same as in corresponding block.
				'blockTitle' => null,
				'columns'    => 3,
			]
		);

		$block_title = esc_attr( $instance['blockTitle'] );
		$columns     = (int) esc_attr( $instance['columns'] );

		?>
		<p>
			<label for="<?php echo $this->get_field_id( 'blockTitle' ); ?>"><?php esc_html_e( 'Title:', 'messia' ); ?></label>
			<input
				type="text"
				class="widefat"
				id="<?php echo $this->get_field_id( 'blockTitle' ); ?>"
				name="<?php echo $this->get_field_name( 'blockTitle' ); ?>"
				value="<?php echo $block_title; ?>"
			/>
		</p>

		<p><?php esc_html_e( 'Split cards to columns in grid view mode by:', 'messia' ); ?></p>
		<div class="messia-widget-listing-data">
			<div class="columns-option">
				<input
					type="radio"
					class="widefat"
					id="<?php echo $this->get_field_id( 'columns-2' ); ?>"
					name="<?php echo $this->get_field_name( 'columns' ); ?>"
					<?php checked( $columns, 2 ); ?>
					value="2"
				/>
				<label for="<?php echo $this->get_field_id( 'columns-2' ); ?>"><?php esc_html_e( 'Two', 'messia' ); ?></label>
				<input
					type="radio"
					class="widefat"
					id="<?php echo $this->get_field_id( 'columns-3' ); ?>"
					name="<?php echo $this->get_field_name( 'columns' ); ?>"
					<?php checked( $columns, 3 ); ?>
					value="3"
				/>
				<label for="<?php echo $this->get_field_id( 'columns-3' ); ?>"><?php esc_html_e( 'Three', 'messia' ); ?></label>
			</div>
		</div>
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

		$instance = [];

		$instance['blockTitle'] = wp_strip_all_tags( $new_instance['blockTitle'] );
		$instance['columns']    = (int) wp_strip_all_tags( $new_instance['columns'] );

		return $instance;
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
