<?php
/**
 * Block Types Widget
 *
 * @package Messia\Modules\Gutenberg\Blocks
 */

declare(strict_types = 1);

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
namespace Smartbits\Messia\Includes\Modules\Blocks\Types;

use WP_REST_Request;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Smartbits\Messia\Includes\Modules\Blocks\Messia_Block_Abstract_Dynamic;
use ReflectionClass;
use Exception;

/**
 * Messia_Block_Tabs_Panel class.
 *
 * @package Messia\Modules\Gutenberg\Blocks
 */
class Messia_Block_Custom_Fields extends Messia_Block_Abstract_Dynamic {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected string $block_name;

	/**
	 * Block scripts and styles.
	 *
	 * @var array
	 */
	protected array $block_assets = [];

	/**
	 * Render block from widget or self.
	 *
	 * @var string
	 */
	protected string $refer_widget = 'messia_widget_custom_fields';

	/**
	 * Where block can be used: pages block editor, widgets editor.
	 * If "widget editor" then $refer_widget should point to a
	 * valid widget id.
	 *
	 * @var array
	 */
	protected array $scope = [ 'widgets' ];

	/**
	 * Messia_Block_Tabs_Panel Constructor
	 *
	 * @return void
	 */
	public function __construct() {

		add_action( 'rest_api_init', [ $this, 'rest' ] );

		$this->block_assets = [
			'editor_script' => [
				'enqueue' => true,
				'deps'    => [ 'jquery', 'jquery-ui-sortable', 'jquery-effects-blind' ],
			],
			'editor_style'  => [
				'enqueue' => true,
				'deps'    => [],
			],
			'style'         => [
				'enqueue' => true,
				'deps'    => [ 'messia-frontend' ],
			],
			'script'        => [
				'enqueue' => true,
				'deps'    => [],
			],
		];

		$class_shortname  = ( new ReflectionClass( $this ) )->getShortName();
		$this->block_name = strtolower( str_replace( [ 'Messia_', '_' ], [ '', '-' ], $class_shortname ) );

		$this->register_block_type();
	}

	/**
	 * Get block attributes.
	 *
	 * @return array
	 */
	protected function get_attributes(): array {

		return $this->join_shared_attributes(
			[
				'isExample'         => [
					'type'    => 'boolean',
					'default' => false,
				],
				'constructedFields' => [
					'type'    => 'array',
					'default' => [],
					'items'   => [
						'type'       => 'object',
						'properties' => [
							'segmentSlug' => [
								'type' => 'string',
							],
							'fieldSlug'   => [
								'type' => 'string',
							],
							'fieldOpts'   => [
								'type' => 'object',
							],
						],
					],
				],
			]
		);
	}

	/**
	 * Render the Categories links block.
	 * It is top level category term and their direct children.
	 *
	 * @param array  $attributes Current attributes.
	 * @param string $content    Block content (always null due to block is dynamic).
	 *
	 * @throws Exception On unexpected $this->refer_widget value.
	 *
	 * @return string
	 */
	public function render( array $attributes, string $content = null ): string {

		switch ( true ) {
			case false !== $this->refer_widget:
				$instance = [
					'title'              => array_fill_keys( array_unique( array_column( $attributes['constructedFields'], 'segmentSlug' ) ), null ),
					'constructor_fields' => array_fill_keys( array_unique( array_column( $attributes['constructedFields'], 'segmentSlug' ) ), [] ),
				];

				foreach ( $attributes['constructedFields'] as $field_data ) {
					$instance['constructor_fields'][ $field_data['segmentSlug'] ][ $field_data['fieldSlug'] ] = $field_data['fieldOpts'];
				}
				$this->register_block_frontend_assets();
				$render = $this->render_widget( $this->refer_widget, $instance );
				return $this->output( $attributes, $render, $this->refer_widget );

			default:
				$rf = wp_json_encode( $this->refer_widget );
				throw new Exception( "Undefined logic for '{$rf}' value in " . __CLASS__ );
		}
	}

	/**
	 * Route for getting segment terms and property terms.
	 * Used to build data for HTML elements on backend.
	 *
	 * @return void
	 */
	public function rest(): void {
		register_rest_route(
			'messia/v1',
			'/block-custom-fields',
			[
				'methods'             => 'POST',
				'permission_callback' => function ( WP_REST_Request $request ) {
					return current_user_can( 'edit_others_posts' );
				},
				'callback'            => function ( WP_REST_Request $request ) {

					$return = [
						'terms'      => [],
						'validAttrs' => [],
					];
					$params = $request->get_params();

					global $wpdb;

					$sql_segment =
						"SELECT
							t.term_id,
							t.slug,
							t.name,
							tt.parent,
							tt.count,
							tt.taxonomy
						FROM $wpdb->terms AS t
						INNER JOIN $wpdb->term_taxonomy AS tt ON t.term_id = tt.term_id
						WHERE tt.taxonomy IN ('messia_object_segment')
						ORDER BY t.name ASC;";

					$segments = $wpdb->get_results( $sql_segment ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

					$return['terms'] = [
						'segment' => [],
					];

					foreach ( $segments as $segment ) {

						$custom_fields    = [];
						$segment->term_id = (int) $segment->term_id;

						$custom_taxonomies_config = MIA()->get_module( 'cpt_config' )->get_custom_taxonomies_config();
						$term_custom_fields       = $this->helpers::messia_get_term_meta( $segment->term_id, 'constructor_cf' );

						/*
						* The fields in the meta data of constructor of the term must be sorted according to their
						* the order stored in the widget before displaying.
						*/
						$this->sort_fields( $params['currentAttrs']['constructedFields'], $term_custom_fields, $segment->slug );

						foreach ( $term_custom_fields as $term_custom_field ) {

							$field_config = array_reverse( $custom_taxonomies_config['messia_object_segment']['post_custom_fields'][ $term_custom_field['field_type'] ]['settings'] );

							$custom_fields[ $term_custom_field['slug'] ] = [
								'title'   => $term_custom_field['name'],
								'options' => [],
							];

							foreach ( $field_config as $option_name => $field_option ) {
								if ( 'instance' !== $field_option['scope'] ) {
									continue;
								}

								switch ( $field_option['tag'] ) {
									case 'input':
										if ( 'checkbox' === $field_option['type'] ) {
											$custom_fields[ $term_custom_field['slug'] ]['options'][] = array_merge(
												[ 'id' => $option_name ],
												$field_option,
											);
											break;

										} else {
											throw new Exception( 'Unknown field option type.' );
										}

									default:
										throw new Exception( 'Unknown field option tag.' );
								}
							}
						}

						$return['terms']['segment'][] = [
							'label'             => "{$segment->name} [{$segment->count}]",
							'value'             => $segment->slug,
							'constructorFields' => $custom_fields,
						];
					}

					$return['validAttrs'] = $this->validate_current_attributes( $return['terms'], $params['currentAttrs'] );

					return $return;
				},
			]
		);
	}

	/**
	 * Validate current saved attributes
	 * Some terms could be deleted after creating block -
	 * they should be removed from saved attrs.
	 *
	 * @param array $db_terms   Segment terms to validate.
	 * @param array $attributes Current block attributes.
	 *
	 * @return array
	 */
	private function validate_current_attributes( array $db_terms, array $attributes ): array {

		$constructed_filtered = [];
		$constructed_current  = $attributes['constructedFields'];

		foreach ( $db_terms['segment'] as $segment_data ) {

			$constructed_current_segment = array_values(
				array_filter(
					$constructed_current,
					function( $field_data ) use ( $segment_data ) {
						if ( $field_data['segmentSlug'] === $segment_data['value'] ) {
							return $field_data;
						}
					}
				)
			);

			foreach ( $segment_data['constructorFields'] as $slug => $config ) {

				$field_opts  = [];
				$field_index = array_search( $slug, array_column( $constructed_current_segment, 'fieldSlug' ), true );

				foreach ( $config['options'] as $option ) {
					if ( false === $field_index ) {
						$field_opts[ $option['id'] ] = $option['default'];
					} else {
						$saved = $constructed_current_segment[ $field_index ];

						$field_opts[ $option['id'] ] = $saved['fieldOpts'][ $option['id'] ];
					}
				}
				$constructed_filtered[] = [
					'segmentSlug' => $segment_data['value'],
					'fieldSlug'   => $slug,
					'fieldOpts'   => $field_opts,
				];
			}
		}

		$attributes['constructedFields'] = $constructed_filtered;

		return $attributes;
	}

	/**
	 * Sorts the fields in the term meta constructor
	 * according to their stored order in the block.
	 *
	 * @param array  $instance           Saved value.
	 * @param array  $term_custom_fields Custom fields constructed for term.
	 * @param string $segment_slug       Term id of taxonomy segment.
	 *
	 * @return void
	 */
	private function sort_fields( array $instance, array &$term_custom_fields, string $segment_slug ): void {

		$segment_fields = array_map(
			function( $field_data ) use ( $segment_slug ) {
				if ( $field_data['segmentSlug'] === $segment_slug ) {
					return $field_data['fieldSlug'];
				}
			},
			$instance
		);

		usort(
			$term_custom_fields,
			function( $a, $b ) use ( $segment_fields ) {

				$position_a = array_search( $a['slug'], $segment_fields, true );
				$position_b = array_search( $b['slug'], $segment_fields, true );

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
}
