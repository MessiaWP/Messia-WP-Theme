<?php
/**
 * Block Types Editor
 *
 * @package Messia\Modules\Gutenberg\Blocks
 */

declare(strict_types = 1);

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
namespace Smartbits\Messia\Includes\Modules\Blocks\Types;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Smartbits\Messia\Includes\Modules\Blocks\Messia_Block_Abstract_Dynamic;
use WP_REST_Request;
use ReflectionClass;
use Exception;

/**
 * Messia_Block_Category_Crosslinks class.
 *
 * @package Messia\Modules\Gutenberg\Blocks
 */
class Messia_Block_Category_Crosslinks extends Messia_Block_Abstract_Dynamic {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name;

	/**
	 * Block scripts and styles.
	 *
	 * @var array
	 */
	protected $block_assets = [];

	/**
	 * Render block from widget or self.
	 *
	 * @var string
	 */
	protected string $refer_widget = 'messia_widget_category_crosslinks';

	/**
	 * Where block can be used: pages block editor, widgets editor.
	 * If "widget editor" then $refer_widget should point to a
	 * valid widget id.
	 *
	 * @var array
	 */
	protected array $scope = [ 'page', 'widgets' ];

	/**
	 * Messia_Block_Category_Crosslinks Constructor
	 *
	 * @return void
	 */
	public function __construct() {

		add_action( 'rest_api_init', [ $this, 'rest' ] );

		$this->block_assets = [
			'editor_script' => [
				'enqueue' => true,
				'deps'    => [],
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
				'deps'    => [ 'messia-frontend' ],
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
				'isExample'          => [
					'type'    => 'boolean',
					'default' => false,
				],
				'segmentTerms'       => [
					'type'    => 'array',
					'default' => [],
					'items'   => [
						'type' => 'string',
					],
				],
				'initVisibleInGroup' => [
					'type'    => 'integer',
					'default' => 4,
				],
				'withCount'          => [
					'type'    => 'boolean',
					'default' => true,
				],
			]
		);
	}

	/**
	 * Render the Categories links block.
	 * It is top level category term and their direct children.
	 *
	 * @param array  $attributes Current attributes.
	 * @param string $content Block content (always null due to block is dynamic).
	 *
	 * @throws Exception On unexpected $this->refer_widget value.
	 *
	 * @return string
	 */
	public function render( array $attributes, string $content = null ): string {

		switch ( true ) {
			case false !== $this->refer_widget:
				$this->register_block_frontend_assets();
				$render = $this->render_widget( $this->refer_widget, $attributes );
				return $this->output( $attributes, $render, $this->refer_widget );

			default:
				$rf = wp_json_encode( $this->refer_widget );
				throw new Exception( "Undefined logic for '{$rf}' value in " . __CLASS__ );
		}
	}

	/**
	 * Route for getting segment terms.
	 * Used to build data for HTML elements on backend.
	 *
	 * @return void
	 */
	public function rest(): void {
		register_rest_route(
			'messia/v1',
			'/block-category-crosslinks',
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
						$return['terms']['segment'][] = [
							'label' => "{$segment->name} [{$segment->count}]",
							'value' => $segment->slug,
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
	 * @param array $db_terms Segment terms to validate.
	 * @param array $attributes Current block attributes.
	 *
	 * @return array
	 */
	private function validate_current_attributes( array $db_terms, array $attributes ): array {

		$terms = $attributes['segmentTerms'];

		if ( empty( $terms ) ) {
			return $attributes;
		}

		$valid_terms = [];

		$segments = array_column( $db_terms['segment'], 'value' );

		foreach ( $terms as $term ) {

			$term_valid = false;

			if ( in_array( $term, $segments, true ) ) {
				$term_valid = true;
			}

			if ( true === $term_valid ) {
				$valid_terms[] = $term;
			}
		}

		$attributes['segmentTerms'] = $valid_terms;

		if ( (int) $attributes['initVisibleInGroup'] < 0 ) {
			$attrs                            = $this->get_attributes();
			$attributes['initVisibleInGroup'] = $attrs['initVisibleInGroup']['default'];
		}
		return $attributes;
	}
}
