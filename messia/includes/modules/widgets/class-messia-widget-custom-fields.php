<?php
/**
 * Messia_Widget_Custom_Fields
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
use Exception;

/**
 * Class for constructor fields implementation.
 *
 * @package Messia\Modules\Widgets
 */
class Messia_Widget_Custom_Fields extends WP_Widget {

	use \Smartbits\Messia\Includes\Traits\Messia_Custom_Fields;

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
	 * Configuration array of all custom taxonomies.
	 *
	 * @var array
	 */
	private array $custom_taxonomies_config;

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

		$this->helpers                  = MIA()->get_module( 'help' );
		$this->blog_settings            = MIA()->get_module( 'settings' )->get_blog_setting( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME );
		$this->custom_taxonomies_config = MIA()->get_module( 'cpt_config' )->get_custom_taxonomies_config();

		parent::__construct(
			// Base ID.
			'messia_widget_custom_fields',
			// Name.
			'&#10070; ' . esc_html__( 'Messia', 'messia' ) . ' &raquo; ' . esc_html__( 'Object custom fields', 'messia' ),
			// Args.
			[
				'description'           => __( 'Displays the value of a specific constructor field for an object.', 'messia' ),
				'classname'             => 'messia-widget-custom-fields',
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
	public function widget( $args, $instance, $block_mode = false ): void {

		$errors       = [];
		$widget_title = null;

		if ( ! is_singular( 'messia_object' ) ) {
			// translators: %s - widget or block name.
			$errors[] = sprintf( __( '%s can be used only at valid object page.', 'messia' ), $this->name );
			$errors   = $this->helpers::print_errors( $this->name, $errors );

			echo $errors;
			return;
		}

		$widget_html   = null;
		$postid        = get_the_ID();
		$post_segments = $this->helpers::get_post_terms( [ $postid ], [ 'messia_object_segment' ] );

		if ( count( $post_segments ) === 0 ) {

			// translators: %s - widget or block name.
			$errors[] = sprintf( __( '%s can not show anything if object does not belong to at least one segment termin.', 'messia' ), $this->name );
			echo $errors;
			return;
		}

		$url_alias              = get_query_var( 'messia_alias', false );
		$messia_object_page_now = is_singular( 'messia_object' );

		foreach ( $post_segments as $post_segment ) {

			$post_segment->term_id = (int) $post_segment->term_id;

			// The constructor for this term is empty.
			if ( ! isset( $instance['constructor_fields'][ $post_segment->slug ] ) ) {
				continue;
			}

			// The query has an alias for the segment term, which means you need to show the object data only in this term.
			$term_alias = $this->helpers::messia_get_term_meta( $post_segment->term_id, 'alias' );
			if ( false !== $messia_object_page_now && $url_alias && ! empty( $url_alias ) && $term_alias !== $url_alias ) {
				continue;
			}

			$meta_key           = str_replace( '%Id%', (string) $post_segment->term_id, MESSIA_POSTMETA_CONSTRUCTED_NAME );
			$object_constructed = json_decode( get_post_meta( $postid, $meta_key, true ), true );
			$term_constructed   = $this->helpers::messia_get_term_meta( $post_segment->term_id, 'constructor_cf' );

			// The meta fields of this term are empty.
			if ( ! is_array( $object_constructed ) || empty( $object_constructed ) ) {
				continue;
			}

			if ( $instance['title'][ $post_segment->slug ] ) {
				$widget_title = $instance['title'][ $post_segment->slug ];
			}

			foreach ( $instance['constructor_fields'][ $post_segment->slug ] as $field_slug => $widget_field_value ) {

				if ( ! $widget_field_value['active'] ) {
					continue;
				}

				$object_field_value = $object_constructed[ $field_slug ];

				foreach ( $term_constructed as $constructor_field ) {
					if ( $field_slug === $constructor_field['slug'] ) {

						// Field content.
						unset( $widget_field_value['active'] );
						$field_html = $this->get_custom_field( $constructor_field['field_type'], $constructor_field, (int) $post_segment->term_id, $object_field_value, $widget_field_value, $block_mode );

						if ( true === is_string( $field_html ) ) {
							$widget_html .= $this->helpers::parse_placeholders( $field_html );
						}
					}
				}
			}
		}

		if ( is_null( $widget_html ) ) {
			return;
		}

		echo $args['before_widget'];

		if ( $widget_title ) {
			echo "{$args['before_title']}<span>{$widget_title}</span>{$args['after_title']}";
		}

		echo $widget_html;
		echo $args['after_widget'];
	}

	/**
	 * Render widget form in backend.
	 *
	 * @param mixed $instance Saved value.
	 *
	 * @return void
	 * @throws Exception If custom constructor field has in config unknown HTML type.
	 */
	public function form( $instance ): void {

		global $wpdb;

		$segment_terms = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT
					t.term_id,
					t.slug,
					t.name,
					tt.count,
					tt.taxonomy
				FROM $wpdb->terms AS t
				INNER JOIN $wpdb->term_taxonomy AS tt ON t.term_id = tt.term_id
				WHERE tt.taxonomy IN (%s)
				ORDER BY t.term_id ASC;",
				'messia_object_segment'
			)
		);

		if ( 0 === count( $segment_terms ) ) {
			echo '<p>' . __( 'No segments found.', 'messia' ) . '</p>';
			return;
		}

		$instance = wp_parse_args(
			(array) $instance,
			[
				'title'              => null,
				'constructor_fields' => [],
			]
		);

		echo '<p>' . __( 'Select one of the fields you created in the constructor.', 'messia' ) . '</p>';

		foreach ( $segment_terms as $segment_term ) {

			$segment_term->term_id = (int) $segment_term->term_id;

			$value = [];
			$title = __( 'The field is active and its value will be displayed?', 'messia' );

			$term_custom_fields = $this->helpers::messia_get_term_meta( $segment_term->term_id, 'constructor_cf' );

			if ( $term_custom_fields ) {
				$term_html = null;
			} else {
				$term_html          = __( 'The constructor for this term is empty', 'messia' );
				$term_custom_fields = [];
			}

			/*
			 * The fields in the meta data of constructor of the term must be sorted according to their
			 * the order stored in the widget before displaying.
			 */
			$this->sort_fields( $instance['constructor_fields'], $term_custom_fields, $segment_term->slug );

			foreach ( $term_custom_fields as $term_custom_field ) {

				$options_html = null;
				$field_config = array_reverse( $this->custom_taxonomies_config['messia_object_segment']['post_custom_fields'][ $term_custom_field['field_type'] ]['settings'] );

				foreach ( $field_config as $option_name => $field_option ) {
					if ( 'instance' !== $field_option['scope'] ) {
						continue;
					}

					$status = 'inactive';

					switch ( $field_option['tag'] ) {
						case 'input':
							if ( 'checkbox' === $field_option['type'] ) {

								if ( isset( $instance['constructor_fields'][ $segment_term->slug ][ $term_custom_field['slug'] ] ) ) {
									$field_value = $instance['constructor_fields'][ $segment_term->slug ][ $term_custom_field['slug'] ];
									$checked     = checked( $field_value[ $option_name ], true, false );
									$status      = ( $field_value['active'] ) ? 'active' : 'inactive';
								} else {
									$checked = checked( $field_option['default'], true, false );
								}

								$options_html .= "<div class='option' data-option-name='{$option_name}'>
													<span>{$field_option['label']}</span>
													<{$field_option['tag']} type='{$field_option['type']}' {$checked} title='{$field_option['title']}' value='true'></{$field_option['tag']}>
												</div>";

								$value[ $term_custom_field['slug'] ][ $option_name ] = $field_option['default'];
								break;

							} else {
								throw new Exception( 'Unknown field option type.' );
							}

						default:
							throw new Exception( 'Unknown field option tag.' );
					}
				}

				$term_html .= "<div class='termin {$status}' data-field-slug='{$term_custom_field['slug']}'>
									<span>- {$term_custom_field['name']} ({$term_custom_field['slug']})</span>
									{$options_html}
							</div>";
			}

			$value = wp_json_encode( $value );
			$title = null;

			if ( is_array( $instance['title'] ) && isset( $instance['title'][ $segment_term->slug ] ) ) {
				$title = esc_attr( $instance['title'][ $segment_term->slug ] );
			}

			?>
			<p>
				<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php esc_html_e( 'Title:', 'messia' ); ?></label>
				<input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( "title[$segment_term->slug]" ); ?>" type="text" value="<?php echo $title; ?>" />
			</p>
			<?php

			// translators: %s - taxonomy term name.
			$h4 = sprintf( __( 'Segment %s', 'messia' ), $segment_term->name );

			echo "<div class='messia-widget-constructor-fields'>
					<h4>{$h4}:</h4>
					<div class='term-fields'>{$term_html}</div>
					<input class='data' type='hidden' name='" . $this->get_field_name( "constructor_fields[$segment_term->slug]" ) . "' value='{$value}'>
				</div>";
		}
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

		foreach ( $new_instance['title'] as $segment_slug => $title ) {
			$new_instance['title'][ $segment_slug ] = wp_strip_all_tags( $title );
		}

		foreach ( $new_instance['constructor_fields'] as $segment_slug => $constructor_fields ) {
			$new_instance['constructor_fields'][ $segment_slug ] = json_decode( $constructor_fields, true );
		}
		return $new_instance;
	}

	/**
	 * Sorts the fields in the term meta constructor
	 * according to their stored order in the widget.
	 *
	 * @param array  $instance           Saved value.
	 * @param array  $term_custom_fields Custom fields constructed for term.
	 * @param string $segment_slug       Term id of taxonomy segment.
	 *
	 * @return void
	 */
	private function sort_fields( array $instance, array &$term_custom_fields, string $segment_slug ): void {

		// This can be when a new instance of the widget is created.
		if ( ! isset( $instance[ $segment_slug ] ) ) {
			return;
		}

		$instance_keys = array_keys( $instance[ $segment_slug ] );
		usort(
			$term_custom_fields,
			function( $a, $b ) use ( $instance_keys ) {

				$position_a = array_search( $a['slug'], $instance_keys, true );
				$position_b = array_search( $b['slug'], $instance_keys, true );

				if ( $position_a === $position_b ) {
					return 0;
				} elseif ( $position_a > $position_b ) {
					return 1;
				} else {
					return -1;
				}
			}
		);
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
