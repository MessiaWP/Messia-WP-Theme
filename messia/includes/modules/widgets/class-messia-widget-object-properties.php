<?php
/**
 * Messia_Widget_Object_Properties
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
 * Class for object categories implementation.
 *
 * @package Messia\Modules\Widgets
 */
class Messia_Widget_Object_Properties extends WP_Widget {

	/**
	 * Full class name.
	 *
	 * @var Messia_Help
	 */
	private string $helpers;

	/**
	 * Current blog settings.
	 *
	 * @var array
	 */
	private array $blog_settings;

	/**
	 * Whether or not widget available in blocks editor..
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
	 * Widget constructor
	 *
	 * @return void
	 */
	public function __construct() {

		$this->widget_id     = 'messia_widget_object_properties';
		$this->helpers       = MIA()->get_module_helpers();
		$this->blog_settings = MIA()->get_module_settings()->get_blog_setting( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME );

		$this->widget_assets = [
			'style'  => [
				'handle' => 'widget-object-properties',
				'file'   => 'block-object-properties',
				'deps'   => [ 'messia-frontend' ],
				'shared' => true,
			],
			'script' => [],
		];

		parent::__construct(
			// Base ID.
			$this->widget_id,
			// Name.
			'&#10070; ' . esc_html__( 'Messia', 'messia' ) . ' &raquo; ' . esc_html__( 'Object properties', 'messia' ),
			// Args.
			[
				'description'           => __( 'List of properties that the object belongs to.', 'messia' ),
				'classname'             => 'messia-widget-object-properties',
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

		if ( false === $block_mode ) {

			$scripts = MIA()->get_module_scripts();
			$scripts::register_widget_frontend_assets( $this->widget_assets );

			// STYLES.
			wp_enqueue_style( 'messia-widget-object-properties' );

			// SCRIPTS.
			// wp_enqueue_script( 'messia-widget-object-properties' ); - not required for now.
		}

		$errors = [];

		if ( ! is_singular( 'messia_object' ) ) {
			// translators: %s - widget or block name.
			$errors[] = sprintf( __( '%s can be used only at valid object page.', 'messia' ), $this->name );
			$errors   = $this->helpers::print_errors( $this->name, $errors );

			echo $errors;
			return;
		}

		$postid = get_the_ID();

		$post_segments   = $this->helpers::get_post_terms( [ $postid ], [ 'messia_object_segment' ] );
		$post_properties = $this->helpers::get_post_terms( [ $postid ], [ 'messia_object_property' ], [ 'term_icon' ] );

		if ( count( $post_segments ) === 0 || count( $post_properties ) === 0 ) {

			// translators: %s - widget or block name.
			$errors[] = sprintf( __( '%s can\'t show anything if the object does not belong to at least one segment and one property.', 'messia' ), $this->name );
			$errors   = $this->helpers::print_errors( $this->name, $errors );
			echo $errors;

			return;
		}

		$delimiter = '?';

		if ( 'hash' === $this->blog_settings['property_url_position'] ) {
			$delimiter = '#';
		}

		foreach ( $post_segments as $post_segment ) {

			$property_html = null;
			foreach ( $post_properties as $post_property ) {

				$image = null;
				if ( ! empty( $post_property->term_icon ) ) {
					$image = $this->helpers::get_media_icon_front( json_decode( $post_property->term_icon, false ) );
				}

				$path = ( is_multisite() ) ? get_blog_details()->path : '/';

				// translators: %s - taxonomy term name.
				$title          = sprintf( __( 'Objects within property %s', 'messia' ), $post_property->name );
				$property_html .= "<li class='d-flex align-items-center px-2 py-1 mb-2 me-2'>{$image}<a title='{$title}' class='ms-2' href='{$path}{$post_segment->slug}/{$delimiter}prop={$post_property->slug}'>{$post_property->name}</a></li>";
			}
		}

		echo $args['before_widget'];

		if ( ! empty( $instance['title'] ) ) {
			echo "{$args['before_title']}<span>{$instance['title']}</span>{$args['after_title']}";
		}
		echo "<ul class='cross-propertires d-flex flex-wrap p-0'>{$property_html}</ul>";
		echo $args['after_widget'];
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
				'title' => null,
			]
		);

		$title = esc_attr( $instance['title'] );

		?>
		<p><?php esc_html_e( 'Widget works only at object page.', 'messia' ); ?></p>
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
	public function update( mixed $new_instance, mixed $old_instance ): array {

		$instance = [];

		$instance['title'] = wp_strip_all_tags( $new_instance['title'] );

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
