<?php
/**
 * Messia_Widget_Listing_Filters
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
 * Class for listing filters implementation.
 *
 * @package Messia\Modules\Widgets
 */
class Messia_Widget_Listing_Filters extends WP_Widget {

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
	 * @var string
	 */
	private readonly string $widget_id;

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

		$this->widget_id = 'messia_widget_listing_filters';
		$this->helpers   = MIA()->get_module_helpers();

		parent::__construct(
			// Base ID.
			$this->widget_id,
			// Name.
			'&#10070; ' . esc_html__( 'Messia', 'messia' ) . ' &raquo; ' . esc_html__( 'Listing filters', 'messia' ),
			// Args.
			[
				'description'           => __( 'Creates and displays elements for filtering & searching objects.', 'messia' ),
				'classname'             => 'messia-widget-listing-filters',
				'show_instance_in_rest' => false,
			]
		);
	}

	/**
	 * Render widget content in frontend.
	 *
	 * @param array $args       All widget data it was registered with.
	 * @param array $instance   Current saved value.
	 * @param bool  $block_mode Whether called as block (turn off then scripts and styles).
	 *
	 * @return void
	 */
	public function widget( $args, $instance, $block_mode = false ): void { // phpcs:ignore Squiz.Commenting.FunctionComment.TypeHintMissing, Squiz.Commenting.FunctionComment.ScalarTypeHintMissing

		$active = apply_filters( "{$this->widget_id}_active", true );

		if ( ! $active ) {
			return;
		}

		if ( false === $block_mode ) { // phpcs:ignore: Generic.CodeAnalysis.EmptyStatement.DetectedIf
			// STYLES.
			// Nothing here. Listing is a page served as a module with own assests.

			// SCRIPTS.
			// Nothing here. Listing is a page served as a module with own assests.
		}

		$errors  = [];
		$listing = MIA()->get_module_listing();

		if ( is_null( $listing ) ) {

			// translators: %s - widget or block name.
			$errors[] = sprintf( __( '%s can be used only at valid listing page.', 'messia' ), $this->name );
			$errors   = $this->helpers::print_errors( $this->name, $errors );

			echo $args['before_widget'];
			echo $errors;
			echo $args['after_widget'];
		} else {
			echo MIA()->get_module_listing()->get_filters( $args, $instance );
		}
	}

	/**
	 * Render widget form in backend.
	 *
	 * @param mixed $instance Saved value.
	 *
	 * @return void
	 */
	public function form( mixed $instance ): void {

		$instance = wp_parse_args(
			(array) $instance,
			[
				// Keys should be the same as in corresponding block.
				'blockTitle'   => null,
				'filtersOrder' => [
					[
						'id'    => 'messia_reset',
						'title' => '',
					],
					[
						'id'    => 'messia_search',
						'title' => '',
					],
					[
						'id'    => 'messia_constructor',
						'title' => '',
					],
					[
						'id'    => 'messia_object_category',
						'title' => '',
					],
					[
						'id'    => 'messia_object_property',
						'title' => '',
					],
				],
			]
		);

		$id_name_map = [
			'messia_reset'           => __( 'Reset', 'messia' ),
			'messia_search'          => __( 'Search', 'messia' ),
			'messia_constructor'     => __( 'Custom fields', 'messia' ),
			'messia_object_category' => __( 'Categories', 'messia' ),
			'messia_object_property' => __( 'Properties', 'messia' ),
		];

		$filter_html = [];
		$block_title = esc_attr( $instance['blockTitle'] );

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

		<?php
		foreach ( $instance['filtersOrder'] as $filter ) {
			ob_start();
			?>
			<div class="search-filter">
				<div class="search-filter-inner">
					<div class="reorder-filter">&equiv;</div>
					<div><?php echo $id_name_map[ $filter['id'] ]; ?></div>
					<input
						type="hidden"
						name="<?php echo $this->get_field_name( "filtersOrder[{$filter['id']}]" ); ?>"
						value="<?php echo esc_attr( $filter['id'] ); ?>"
					/>
					<input
						type="text"
						class="widefat"
						id="<?php echo $this->get_field_id( "filtersOrder[{$filter['id']}][title]" ); ?>"
						name="<?php echo $this->get_field_name( "filtersOrder[{$filter['id']}][title]" ); ?>"
						value="<?php echo esc_attr( $filter['title'] ); ?>"
					/>
				</div>
			</div>
			<?php
			$filter_html[] = ob_get_clean();
		}
		?>

		<p><?php esc_html_e( 'Order filter groups as needed.', 'messia' ); ?></p>
		<div class="messia-widget-listing-filters">
			<div class="filters-order-wrapper">
				<h3><?php esc_html_e( 'Order of filter groups:', 'messia' ); ?></h3>
				<div class="filters-order-drop-zone">
					<?php echo implode( "\n", $filter_html ); ?>
				</div>
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
	public function update( mixed $new_instance, mixed $old_instance ): array {

		$instance = [];

		foreach ( $new_instance['filtersOrder'] as $id => $filter_data ) {
			$instance['filtersOrder'][] = [
				'id'    => $id,
				'title' => wp_strip_all_tags( $filter_data['title'] ),
			];
		}

		$instance['blockTitle'] = wp_strip_all_tags( $new_instance['blockTitle'] );

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
