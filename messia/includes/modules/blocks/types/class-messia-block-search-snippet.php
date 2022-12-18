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
 * Messia_Block_Search_Snippet class.
 *
 * @package Messia\Modules\Gutenberg\Blocks
 */
class Messia_Block_Search_Snippet extends Messia_Block_Abstract_Dynamic {

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
	protected array $scope = [ 'page' ];

	/**
	 * Select all title.
	 *
	 * @var string
	 */
	private string $select_all_cat_alias;

	/**
	 * Select all title.
	 *
	 * @var string
	 */
	private string $select_all_prop_alias;

	/**
	 * Errors in form data detected on form submit.
	 *
	 * @var array
	 */
	private array $submit_validation_errs = [];

	/**
	 * Messia_Block_Search_Snippet Constructor
	 *
	 * @return void
	 */
	public function __construct() {

		add_action( 'rest_api_init', [ $this, 'rest' ] );

		$this->block_assets = [
			'editor_script' => [
				'enqueue' => true,
				'deps'    => [
					'jquery',
					'jquery-ui-draggable',
					'jquery-ui-sortable',
					'jquery-ui-droppable',
					'jquery-ui-touch-punch',
				],
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
		$this->is_submitted();
	}

	/**
	 * Get block attributes.
	 *
	 * @return array
	 */
	protected function get_attributes(): array {

		$this->select_all_cat_alias  = __( 'Select Category', 'messia' );
		$this->select_all_prop_alias = __( 'Select Property', 'messia' );

		return $this->join_shared_attributes(
			[
				'isExample'          => [
					'type'    => 'boolean',
					'default' => false,
				],
				'withCount'          => [
					'type'    => 'boolean',
					'default' => true,
				],
				'filtersConstructed' => [
					'type'    => 'array',
					'default' => [],
					'items'   => [
						'type'       => 'object',
						'properties' => [
							'id'          => [
								'type' => 'string',
							],
							'segmentSlug' => [
								'type' => 'string',
							],
							'by'          => [
								'type' => 'string',
								'enum' => [ 'string', 'category', 'property' ],
							],
						],
					],
				],
				'selectAllCatAlias'  => [
					'type'    => 'string',
					'default' => $this->select_all_cat_alias,
				],
				'selectAllPropAlias' => [
					'type'    => 'string',
					'default' => $this->select_all_prop_alias,
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
			case false === $this->refer_widget:
				$this->register_block_frontend_assets();
				$render = $this->render_block( $attributes );
				return $this->output( $attributes, $render, $this->refer_widget );

			default:
				$rf = wp_json_encode( $this->refer_widget );
				throw new Exception( "Undefined logic for '{$rf}' value in " . __CLASS__ );
		}
	}

	/**
	 * Render the Search Snippet block inner content.
	 *
	 * @param array $attributes Current attributes.
	 *
	 * @return string
	 */
	public function render_block( array $attributes ): string {

		global $wpdb;
		$errors     = [];
		$render     = '';
		$with_count = $attributes['withCount'];
		$filters    = $attributes['filtersConstructed'];

		$non_empty_property_terms = $this->blog_settings['messia_object_property_empty_terms_to_filter'];

		if ( empty( $filters ) ) {
			$errors = [
				__( 'Nothing to show. Change conditions.', 'messia' ),
			];

			return $this->helpers::print_errors( $this->block_name, $errors );
		}

		if ( ! empty( $this->submit_validation_errs ) ) {
			$errors = array_merge( $errors, $this->submit_validation_errs );
		}

		$filter_segmented = [];

		// Filters by segments.
		foreach ( $filters as $filter ) {
			$filter_segmented[ $filter['segmentSlug'] ][] = $filter;
		}

		// Exclude unexisting segment terms.
		foreach ( $filter_segmented as $segment_slug => $filters_in_segment ) {

			$segment_term = get_term_by( 'slug', $segment_slug, 'messia_object_segment' );

			if ( false === $segment_term ) {

				// translators: %s - taxonomy slug.
				$errors[] = sprintf( __( 'Segement term with slug %s does not exist.', 'messia' ), $segment_slug );
				unset( $filter_segmented[ $segment_slug ] );
				continue;
			}

			foreach ( $filters_in_segment as $index => $filter ) {

				if ( isset( $filter['selectAllCatAlias'] ) ) {
					$selet_all_cat = $filter['selectAllCatAlias'];
				} else {
					$selet_all_cat = $this->select_all_cat_alias;
				}
				if ( isset( $filter['selectAllPropAlias'] ) ) {
					$selet_all_prop = $filter['selectAllPropAlias'];
				} else {
					$selet_all_prop = $this->select_all_prop_alias;
				}

				ob_start();

				switch ( $filter['by'] ) {
					case 'string':
						?>
						<div class="messia-textfield me-2 mb-1 mt-1 flex-grow-1">
							<input type="text" class="messia-filter-text" autocomplete="off" name="string" data-url="query">
							<div class="messia-label-container">
								<span class="messia-outline"></span>
								<label>
									<span><?php esc_html_e( 'Search by object name', 'messia' ); ?></span>
								</label>
							</div>
						</div>
						<?php
						break;

					case 'category':
						$category_term = get_term_by( 'slug', $filter['value'], 'messia_object_category' );

						// Category term valid.
						if ( false === $category_term ) {

							// translators: %s - taxonomy slug.
							$errors[] = sprintf( __( 'Category with slug %s does not exist.', 'messia' ), $filter['value'] );
							unset( $filter_segmented[ $segment_slug ][ $index ] );
							ob_end_clean();
							continue 2;
						}
						$sql_category =
							"SELECT
								t.term_id,
								t.slug,
								t.name,
								tt.parent,
								tt.count,
								tt.taxonomy
							FROM $wpdb->terms as t
							INNER JOIN $wpdb->term_taxonomy as tt ON t.term_id = tt.term_id
							WHERE
								tt.taxonomy IN ('messia_object_category')
								AND parent = $category_term->term_id
							ORDER BY t.name ASC;";

						$category_terms = $wpdb->get_results( $sql_category ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

						// Category term's children exists.
						if ( empty( $category_terms ) ) {

							// translators: %s - taxonomy slug.
							$errors[] = sprintf( __( 'Category term "%s" does not have any children.', 'messia' ), $category_term->name );
							unset( $filter_segmented[ $segment_slug ][ $index ] );
							ob_end_clean();
							continue 2;
						}

						$setted_terms = $this->setup_empty_terms( $category_terms );

						if ( ! empty( $setted_terms['empty'] ) ) {
							// translators: %s - taxonomy slug.
							$errors[] = sprintf( __( 'Category term "%s" is empty and was excluded due to current theme setting.', 'messia' ), implode( ', ', array_column( $setted_terms['empty'], 'name' ) ) );
						}

						$category_terms = $setted_terms['valid'];

						$options = "<option value='-1'>{$selet_all_cat}</option>";

						foreach ( $category_terms as $category_term ) {

							$count = null;

							if ( $with_count ) {
								$count = " [{$category_term->count}]";
							}

							$options .= "<option value='{$category_term->slug}'>{$category_term->name}{$count}</option>";
						}
						?>
						<div class="me-2 mb-1 mt-1 flex-grow-1"><select name="category[]"><?php echo $options; ?></select></div>
						<?php
						break;

					case 'property':
						if ( empty( $filter['value'] ) ) {

							// translators: %s - block name.
							$errors[] = sprintf( __( 'No term selected in %s settings. Nothing to show.', 'messia' ), $this->block_name );
							unset( $filter_segmented[ $segment_slug ][ $index ] );
							ob_end_clean();
							continue 2;
						}
						$slugs = "'" . implode( "', '", esc_sql( $filter['value'] ) ) . "'";

						$sql_property =
							"SELECT
								t.term_id,
								t.slug,
								t.name,
								tt.parent,
								tt.count,
								tt.taxonomy
							FROM $wpdb->terms AS t
							INNER JOIN $wpdb->term_taxonomy AS tt ON t.term_id = tt.term_id
							WHERE
								tt.taxonomy IN ('messia_object_property')
								AND t.slug IN ( $slugs )
							ORDER BY t.term_id ASC;";

						$property_terms = $wpdb->get_results( $sql_property, OBJECT_K ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

						if ( count( $property_terms ) !== count( $filter['value'] ) ) {

							$not_found = array_diff( $filter['value'], array_column( $property_terms, 'slug' ) );
							// translators: %s - taxonomy slugs.
							$errors[] = sprintf( __( 'Next Property slug does not exist: %s.', 'messia' ), implode( ', ', $not_found ) );
						}

						$options = "<option value='-1'>{$selet_all_prop}</option>";

						foreach ( $property_terms as $property_term ) {

							if ( 1 === $non_empty_property_terms && '0' === $property_term->count ) {
								// translators: %s - taxonomy slug.
								$errors[] = sprintf( __( 'Category term "%s" is empty and was excluded due to current theme setting.', 'messia' ), $property_term->name );
								continue;
							}

							$count = null;

							if ( $with_count ) {
								$count = " [{$property_term->count}]";
							}

							$options .= "<option value='{$property_term->slug}'>{$property_term->name}{$count}</option>";
						}
						?>
						<div class="me-2 mb-1 mt-1 flex-grow-1"><select name="property[]"><?php echo $options; ?></select></div>
						<?php
						break;
				}

				$filter_segmented[ $segment_slug ][ $index ] = ob_get_clean();
			}
		}

		// translators: %s - block name.
		$trick = sprintf( __( 'To fix errors you may try to resave the %s.', 'messia' ), $this->block_name );

		if ( 0 === count( $filter_segmented ) ) {

			$render = $this->helpers::print_errors( $this->block_name, $errors, $trick );

		} elseif ( 1 === count( $filter_segmented ) ) {

			reset( $filter_segmented );

			$errors = $this->helpers::print_errors( $this->block_name, $errors, $trick );
			$first  = key( $filter_segmented );

			$segment = '<input type="hidden" name="segment" value="' . $first . '">';
			$search  = '<button class="messia-btn messia-ripple-click">' . __( 'Search', 'messia' ) . '</button>';
			$nonce   = wp_nonce_field( 'search_snippet', 'search_snippet_nonce', false, false );
			$render  = implode( '', $filter_segmented[ $first ] ) . $segment . $nonce . $search;
			$render  = "<div class='wrapper'>
							<div class='tab-content px-3'>
								<div class='tab-pane active'>
									<form method='get' class='d-flex align-items-center flex-wrap justify-content-center' action>{$render}</form>
								</div>
							</div>
							{$errors}
						</div>";

		} else {
			$i = 1;

			$tabs    = null;
			$content = null;
			$errors  = $this->helpers::print_errors( $this->block_name, $errors, $trick );

			foreach ( $filter_segmented as $segment_term_slug => $filters ) {

				$uniqid       = uniqid();
				$class_name   = ( 1 === $i ) ? 'show active' : '';
				$segment_term = get_term_by( 'slug', $segment_term_slug, 'messia_object_segment' );

				$segment = '<input type="hidden" name="segment" value="' . $segment_term_slug . '">';
				$search  = '<button class="messia-btn messia-ripple-click">' . __( 'Search', 'messia' ) . '</button>';
				$nonce   = wp_nonce_field( 'search_snippet', 'search_snippet_nonce', false, false );

				$inner    = implode( '', $filters ) . $segment . $nonce . $search;
				$tabs    .= "<a class='nav-link {$class_name}' data-bs-toggle='tab' href='#segment-{$uniqid}' role='tab' aria-controls='segment-{$uniqid}' aria-selected='true'>{$segment_term->name}</a>";
				$content .= "<div class='tab-pane fade {$class_name}' id='segment-{$uniqid}' role='tabpanel'>
								<form class='d-flex align-items-center flex-wrap justify-content-center' method='get' action>{$inner}</form>
							</div>";

				++$i;
			}

			$render = "<div class='wrapper'>
							<nav class='nav nav-pills mb-3' role='tablist'>{$tabs}</nav>
							<div class='tab-content'>{$content}</div>
							{$errors}
						</div>";
		}

		return $render;
	}

	/**
	 * Route for getting segment terms, category terms and property terms.
	 * Used to build data for HTML elements on backend.
	 *
	 * @return void
	 */
	public function rest(): void {
		register_rest_route(
			'messia/v1',
			'/block-search-snippet',
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
					$non_empty_property_terms = $this->blog_settings['messia_object_property_empty_terms_to_filter'];

					if ( 1 === $non_empty_property_terms ) {
						$empty_sql = ' AND tt.count > 0';
					} else {
						$empty_sql = null;
					}

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

					$sql_category =
						"SELECT
							t.term_id,
							t.slug,
							t.name,
							tt.parent,
							tt.count,
							tt.taxonomy
						FROM $wpdb->terms AS t
						INNER JOIN $wpdb->term_taxonomy AS tt ON t.term_id = tt.term_id
						WHERE tt.taxonomy IN ('messia_object_category')
						ORDER BY t.name ASC;";

					$sql_property =
						"SELECT
							t.term_id,
							t.slug,
							t.name,
							tt.parent,
							tt.count,
							tt.taxonomy
						FROM $wpdb->terms AS t
						INNER JOIN $wpdb->term_taxonomy AS tt ON t.term_id = tt.term_id
						WHERE tt.taxonomy IN ('messia_object_property') $empty_sql
						ORDER BY t.name ASC;";

					$segments   = $wpdb->get_results( $sql_segment ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
					$category   = $wpdb->get_results( $sql_category ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
					$properties = $wpdb->get_results( $sql_property ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

					$setted   = $this->setup_empty_terms( $category );
					$category = $setted['valid'];

					$return['terms'] = [
						'segment'  => [],
						'category' => [],
						'property' => [],
					];

					$return['terms']['category'] = $this->build_category( $category );

					foreach ( $segments as $segment ) {
						$return['terms']['segment'][] = [
							'label' => "{$segment->name} [{$segment->count}]",
							'value' => $segment->slug,
						];
					}

					foreach ( $properties as $properties ) {
						$return['terms']['property'][] = [
							'label' => "{$properties->name} [{$properties->count}]",
							'value' => $properties->slug,
						];
					}

					$return['validAttrs'] = $this->validate_current_attributes( $return['terms'], $params['currentAttrs'] );

					return $return;
				},
			]
		);
	}

	/**
	 * Remove empty terms if it has no non-empty direct children.
	 * Subordinate to the value of the "Empty category terms" option.
	 *
	 * @param array $terms Terms to validate.
	 *
	 * @return array
	 */
	private function setup_empty_terms( array $terms ): array {

		$empty_category_terms     = [];
		$non_empty_category_terms = $this->blog_settings['messia_object_category_empty_terms_to_filter'];

		// Empty terms should be returned if their descendants are not empty.
		if ( 1 === $non_empty_category_terms && is_array( $terms ) ) {
			foreach ( $terms as $k => $term ) {
				if ( ! $term->count ) {
					$children = get_term_children( $term->term_id, $term->taxonomy );
					if ( is_array( $children ) ) {
						foreach ( $children as $child_id ) {
							$child = get_term( $child_id, $term->taxonomy );
							if ( $child->count ) {
								continue 2;
							}
						}
					}

					// Definitely empty.
					$empty_category_terms[] = $terms[ $k ];
					unset( $terms[ $k ] );
				}
			}
		}

		return [
			'valid' => $terms,
			'empty' => $empty_category_terms,
		];
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

		$filters = $attributes['filtersConstructed'];

		if ( empty( $filters ) ) {
			return $attributes;
		}

		$valid_filters = [];

		$segments   = array_column( $db_terms['segment'], 'value' );
		$categories = array_column( $db_terms['category'], 'value' );
		$properties = array_column( $db_terms['property'], 'value' );

		foreach ( $filters as $filter ) {

			$filter_valid   = false;
			$filter_segment = $filter['segmentSlug'];

			if ( in_array( $filter_segment, $segments, true ) ) {
				$filter_valid = true;
			}

			switch ( $filter['by'] ) {

				case 'category':
					if ( ! in_array( $filter['value'], $categories, true ) ) {
						$filter['value'] = $categories[0];
					}
					break;

				case 'property':
					$filter['value'] = array_values( array_intersect( $filter['value'], $properties ) );
					break;
			}

			if ( true === $filter_valid ) {
				$valid_filters[] = $filter;
			}
		}

		$attributes['filtersConstructed'] = $valid_filters;

		return $attributes;
	}

	/**
	 * Build ordered data for HTML element.
	 * It is array of key->value pairs for using in Select tag
	 * where pair are in tree-like order.
	 *
	 * @param array $terms Terms to work with.
	 *
	 * @return array
	 */
	private function build_category( array $terms ): array {

		$tree = $this->build_category_tree( $terms );
		$flat = $this->build_category_flat( $tree );

		return $flat;
	}

	/**
	 * Rebuild flat array of terms to hierarchical.
	 *
	 * @param array $terms     Flat array of terms.
	 * @param int   $parent_id Stuff data, do not pass here anything.
	 *
	 * @return array
	 */
	private function build_category_tree( array $terms, int $parent_id = 0 ): array {

		$tree = [];

		foreach ( $terms as $term ) {

			if ( (int) $term->parent === $parent_id ) {

				$children = $this->build_category_tree( $terms, (int) $term->term_id );

				if ( $children ) {
					$term->children = $children;
				}
				$tree[ $term->term_id ] = $term;
			}
		}

		return $tree;
	}

	/**
	 * Rebuild hierarchical array of terms to flat with
	 * formatting to use later as source for select tag options.
	 *
	 * @param array $terms Hierarchical array of terms.
	 * @param array $flat  Stuff data, do not pass here anything.
	 * @param int   $level Stuff data, do not pass here anything.
	 *
	 * @return array
	 */
	private function build_category_flat( array $terms, $flat = [], $level = 0 ): array {

		foreach ( $terms as $term ) {

			if ( 0 === (int) $term->parent ) {
				$level = 0;
			}

			// Reject deepest term without child/children.
			if ( isset( $term->children ) ) {

				$flat[] = [
					'label' => str_repeat( '— ', $level ) . " {$term->name} [{$term->count}]",
					'value' => $term->slug,
				];

				++$level;
				$flat = $this->build_category_flat( $term->children, $flat, $level );
			}
			--$level;
		}

		return $flat;
	}

	/**
	 * Action if snippet form submitted
	 *
	 * @return void
	 */
	private function is_submitted(): void {

		if ( ! isset( $_GET['search_snippet_nonce'] ) ) {
			return;
		}

		if ( ! wp_verify_nonce( $_GET['search_snippet_nonce'], 'search_snippet' ) ) {
			return;
		}

		if ( ! isset( $_GET['segment'] ) ) {
			return;
		}

		$segment_term = $_GET['segment'];

		$global_terms_order = [];

		$category_terms = [];
		$property       = [];

		if ( isset( $_GET['string'] ) && ! empty( $_GET['string'] ) ) {
			$property['search'] = $_GET['string'];
		}

		if ( isset( $_GET['category'] ) ) {

			$unique_category = array_unique( $_GET['category'] );

			if ( '-1' !== implode( '', $unique_category ) ) {

				$global_terms_order['messia_object_category'] = [];

				$category_terms      = $this->helpers::get_terms_for_segment( 'messia_object_category', $segment_term, [ 'branch_as_filter' ] );
				$category_terms_tree = $this->helpers::get_terms_tree( $category_terms );

				$this->helpers::walk_terms_tree_for_filters( $category_terms_tree, $global_terms_order['messia_object_category'] );

				$category_terms = $unique_category;
			}
		}

		if ( isset( $_GET['property'] ) ) {

			$unique_property = array_unique( $_GET['property'] );

			if ( '-1' !== implode( '', $unique_property ) ) {

				$global_terms_order['messia_object_property'] = [];

				$property_terms      = $this->helpers::get_terms_for_segment( 'messia_object_property', $segment_term );
				$property_terms_tree = $this->helpers::get_terms_tree( $property_terms );

				$this->helpers::walk_terms_tree_for_filters( $property_terms_tree, $global_terms_order['messia_object_property'] );

				$property['prop'] = $unique_property;
			}
		}

		$url = $this->helpers::create_listing_url( $global_terms_order, $segment_term, $category_terms, $property );

		if ( is_wp_error( $url ) ) {
			$this->submit_validation_errs[] = $url->get_error_message();
			return;
		}

		wp_safe_redirect( $url, 302 );
		exit;
	}
}
