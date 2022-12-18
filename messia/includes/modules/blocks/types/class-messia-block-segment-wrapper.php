<?php
/**
 * Block Types Editor
 *
 * @package Messia\Modules\Gutenberg\Blocks
 */

declare( strict_types=1 );

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
 * Messia_Block_Segment_Wrapper class.
 *
 * @package Messia\Modules\Gutenberg\Blocks
 */
class Messia_Block_Segment_Wrapper extends Messia_Block_Abstract_Dynamic {

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
	 * @var bool
	 */
	protected bool $refer_widget = false;

	/**
	 * Where block can be used: pages block editor, widgets editor.
	 * If "widget editor" then $refer_widget should point to a
	 * valid widget id.
	 *
	 * @var array
	 */
	protected array $scope = [ 'widgets', 'page' ];

	/**
	 * Comment length.
	 *
	 * @var int
	 */
	protected int $comment_length;

	/**
	 * Messia_Block_Segment_Wrapper Constructor
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
				'enqueue' => false,
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
				'isExample'   => [
					'type'    => 'boolean',
					'default' => false,
				],
				'forSegments' => [
					'type'    => 'array',
					'default' => [],
				],
			]
		);
	}

	/**
	 * Render the Categories links block.
	 * It is top level category term and their direct children.
	 *
	 * @param array  $attributes Current attributes.
	 * @param string $content    Block content.
	 *
	 * @throws Exception On unexpected $this->refer_widget value.
	 *
	 * @return string
	 */
	public function render( array $attributes, string $content = null ): string {

		switch ( true ) {
			case false === $this->refer_widget:
				$this->register_block_frontend_assets();
				$render = $this->render_block( $attributes, $content );
				return $this->output( $attributes, $render, $this->refer_widget );

			default:
				$rf = wp_json_encode( $this->refer_widget );
				throw new Exception( "Undefined logic for '{$rf}' value in " . __CLASS__ );
		}
	}

	/**
	 * Render the Testimonials block inner content.
	 *
	 * @param array  $attributes Current attributes.
	 * @param string $content    Block content.
	 *
	 * @return string
	 */
	public function render_block( array $attributes, string $content ): string {

		$errors = [];

		if ( ! is_singular( 'messia_object' ) && ! $this->helpers::is_listing_page() ) {
			// translators: %s - block name.
			$errors[] = sprintf( __( '%s can be used only at valid object or listing page.', 'messia' ), $this->block_name );
			$errors   = $this->helpers::print_errors( $this->block_name, $errors );

			echo $errors;
			return '';
		}

		if ( is_singular( 'messia_object' ) ) {
			$postid = get_the_ID();

			$post_segments  = $this->helpers::get_post_terms( [ $postid ], [ 'messia_object_segment' ] );
			$valid_segments = array_intersect( $attributes['forSegments'], array_column( $post_segments, 'slug' ) );

		} elseif ( $this->helpers::is_listing_page() ) {
			$listing_segment = $this->helpers::parse_listing_query()->segment_term;
			$valid_segments  = array_intersect( $attributes['forSegments'], (array) $listing_segment );
		}

		if ( empty( $valid_segments ) ) {

			// translators: %s - block name.
			$errors[] = sprintf( __( '%s skipped render it\'s content due to inappropriate segment.', 'messia' ), $this->block_name );
			$errors   = $this->helpers::print_errors( $this->block_name, $errors );
			echo $errors;

			return '';
		}

		return $content;
	}

	/**
	 * Build data for HTML elements on backend.
	 *
	 * @return array.
	 */
	/**
	 * Route for getting testimonials by block attributes.
	 * Used to build data for HTML elements on backend.
	 *
	 * @return void
	 */
	public function rest(): void {
		register_rest_route(
			'messia/v1',
			'/block-segment-wrapper',
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
						FROM
							$wpdb->terms AS t
						INNER JOIN $wpdb->term_taxonomy AS tt ON t.term_id = tt.term_id
						WHERE
							tt.taxonomy IN ('messia_object_segment')
						ORDER BY
							t.name ASC;";

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
	 * @param array $db_terms   Segment terms to validate.
	 * @param array $attributes Current block attributes.
	 *
	 * @return array
	 */
	private function validate_current_attributes( array $db_terms, array $attributes ): array {

		$tabs = $attributes['tabsConstructed'];

		if ( empty( $tabs ) ) {
			return $attributes;
		}

		$valid_filters = [];

		$segments = array_column( $db_terms['segment'], 'value' );

		foreach ( $tabs as $tab ) {

			$filter_valid   = false;
			$filter_segment = $tab['segmentSlug'];

			if ( in_array( $filter_segment, $segments, true ) ) {
				$filter_valid = true;
			}

			if ( true === $filter_valid ) {
				$valid_filters[] = $tab;
			}
		}

		$attributes['tabsConstructed'] = $valid_filters;

		return $attributes;
	}
}
