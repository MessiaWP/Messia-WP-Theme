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
 * Messia_Block_Objects_Filtered class.
 *
 * @package Messia\Modules\Gutenberg\Blocks
 */
class Messia_Block_Objects_Filtered extends Messia_Block_Abstract_Dynamic {

	/**
	 * Messia_Block_Objects_Filtered Constructor
	 *
	 * @return void
	 */
	public function __construct() {

		add_action( 'rest_api_init', [ $this, 'rest' ] );

		$this->scope        = [ 'page' ];
		$this->refer_widget = false;
		$this->block_assets = [
			'editor_script' => [
				'enqueue' => true,
				'deps'    => [ 'jquery', 'messia-select2' ],
			],
			'editor_style'  => [
				'enqueue' => true,
				'deps'    => [ 'messia-select2' ],
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
				'segment'    => [
					'type'    => 'string',
					'default' => false,
				],
				'category'   => [
					'type'    => 'array',
					'default' => [],
				],
				'property'   => [
					'type'    => 'array',
					'default' => [],
				],
				'isFeatured' => [
					'type'    => 'integer',
					'default' => 0,
				],
				'isExample'  => [
					'type'    => 'boolean',
					'default' => false,
				],
				'limit'      => [
					'type'    => 'integer',
					'default' => 4,
				],
				'columns'    => [
					'type'    => 'integer',
					'default' => 4,
					'enum'    => [ 3, 4 ],
				],
				'orderBy'    => [
					'type'    => 'string',
					'default' => 'post_date',
					'enum'    => [ 'post_date', 'post_title', 'rating', 'reviews' ],
				],
				'orderDir'   => [
					'type'    => 'string',
					'default' => 'ASC',
					'enum'    => [ 'ASC', 'DESC', 'RND' ],
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
	 * Render the Object Filtered block inner content.
	 *
	 * @param array $attributes Current attributes.
	 *
	 * @return string
	 */
	public function render_block( array $attributes ): string {

		global $wpdb;
		$errors = [];
		$render = '';
		// translators: %s - block name.
		$trick = sprintf( __( 'To fix errors you may try to change conditions and re-save %s.', 'messia' ), $this->block_name );

		if ( 1 === $this->blog_settings['debugger'] ) {

			$db_terms = [
				'segment'  => [],
				'category' => [],
				'property' => [],
			];

			$sql_segment =
					"SELECT
						t.term_id,
						t.slug as value,
						t.name as label,
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
						t.slug as value,
						t.name as label,
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
						t.slug as value,
						t.name as label,
						tt.parent,
						tt.count,
						tt.taxonomy
					FROM $wpdb->terms AS t
					INNER JOIN $wpdb->term_taxonomy AS tt ON t.term_id = tt.term_id
					WHERE tt.taxonomy IN ('messia_object_property')
					ORDER BY t.name ASC;";

			$db_terms['segment']  = $wpdb->get_results( $sql_segment ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
			$db_terms['category'] = $wpdb->get_results( $sql_category ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
			$db_terms['property'] = $wpdb->get_results( $sql_property ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

			$attributes = $this->validate_current_attributes( $db_terms, $attributes );

			if ( false === $attributes['segment'] ) {
				$errors[] = __( 'Missing segment.', 'messia' );
			}

			if ( ! empty( $attributes['errors'] ) ) {
				$errors = array_merge( $errors, $attributes['errors'] );
			}
		}

		// SQL.
		$segment_term = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT t.term_id
				FROM $wpdb->terms AS t
				INNER JOIN $wpdb->term_taxonomy AS tt ON t.term_id = tt.term_id
				WHERE
					tt.taxonomy IN ('messia_object_segment')
					AND t.slug IN (%s)
				LIMIT 1",
				$attributes['segment']
			)
		);

		// Find terms id.
		$where = [];

		if ( false !== $attributes['segment'] ) {
			$in_segment = esc_sql( $attributes['segment'] );
			$where[]    = "( $wpdb->term_taxonomy.taxonomy IN ('messia_object_segment') AND $wpdb->terms.slug IN ('$in_segment') )";
		}

		if ( ! empty( $attributes['category'] ) ) {
			$in_category = "'" . implode( "','", esc_sql( $attributes['category'] ) ) . "'";
			$where[]     = "( $wpdb->term_taxonomy.taxonomy IN ('messia_object_category') AND $wpdb->terms.slug IN ($in_category) )";
		}

		if ( ! empty( $attributes['property'] ) ) {
			$in_property = "'" . implode( "','", esc_sql( $attributes['property'] ) ) . "'";
			$where[]     = "( $wpdb->term_taxonomy.taxonomy IN ('messia_object_property') AND $wpdb->terms.slug IN ($in_property) )";
		}

		if ( empty( $where ) ) {
			$where = null;
		} else {
			$where = 'WHERE (' . implode( ' OR ', $where ) . ')';
		}

		$terms_sql =
			"SELECT
				term_taxonomy_id
			FROM $wpdb->terms
			INNER JOIN $wpdb->term_taxonomy ON $wpdb->terms.term_id = $wpdb->term_taxonomy.term_id $where;";

		$terms_id = $wpdb->get_results( $terms_sql, OBJECT_K ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

		// Find objects.
		$objects = [];
		$sql     = null;
		$in      = implode( ',', array_keys( $terms_id ) );
		$count   = count( $terms_id );
		$limit   = ( $attributes['limit'] > 0 ) ? ' LIMIT ' . (int) $attributes['limit'] : null;

		if ( 'reviews' === $attributes['orderBy'] ) {

			if ( 0 === $this->blog_settings['substitute_rating_by_site_rating'] ) {

				$sql =
					"SELECT
						posts.ID,
						(
							SELECT COUNT(1)
							FROM $wpdb->comments
							WHERE comment_post_ID = posts.ID
						) as reviews # alias is block parameter
					FROM $wpdb->posts as posts
					INNER JOIN $wpdb->postmeta as postmeta ON ( posts.ID = postmeta.post_id )
					WHERE
						(
							SELECT
								COUNT(1)
							FROM
								$wpdb->term_relationships
							WHERE
								term_taxonomy_id IN($in) AND object_id = posts.ID
						) = $count
						AND posts.post_type = 'messia_object'
						AND posts.post_status = 'publish'
						%featured%
					GROUP BY posts.ID
					##ORDER BY reviews## $limit;";

			} else {
				$errors[] = __( 'You have overrided visitor ratings. In this case, sorting by number of reviews is not possible. To use it, turn off "Override visitor ratings" option in Messia theme settings.', 'messia' );
			}
		} elseif ( 'rating' === $attributes['orderBy'] ) {

			if ( 0 === $this->blog_settings['substitute_rating_by_site_rating'] ) {

				$sql =
					"SELECT posts.ID,
						(
							SELECT SUM(commentsmeta.meta_value) / COUNT(posts_inner.ID) AS 'rating'
							FROM $wpdb->posts AS posts_inner
							INNER JOIN $wpdb->comments AS comments ON posts_inner.ID = comments.comment_post_ID
							INNER JOIN $wpdb->commentmeta AS commentsmeta ON comments.comment_ID = commentsmeta.comment_id
							WHERE commentsmeta.meta_key = 'messia_rating' AND posts_inner.ID = posts.ID
							GROUP BY posts.ID
						) AS 'rating'
					FROM $wpdb->posts as posts
					INNER JOIN $wpdb->postmeta as postmeta ON ( posts.ID = postmeta.post_id )
					WHERE
						(
							SELECT
								COUNT(1)
							FROM
								$wpdb->term_relationships
							WHERE
								term_taxonomy_id IN($in) AND object_id = posts.ID
						) = $count
						AND posts.post_type = 'messia_object'
						AND posts.post_status = 'publish'
						%featured%
					GROUP BY posts.ID
					##ORDER BY CAST(rating AS DECIMAL)## $limit";
			} else {

				$rating_key = str_replace( '%Id%', $segment_term, MESSIA_SITERATING_NAME );

				$sql =
					"SELECT posts.ID, (SELECT meta_value FROM $wpdb->postmeta WHERE meta_key = '$rating_key' AND post_id = posts.ID) as 'site_rating'
					FROM $wpdb->posts as posts
					INNER JOIN $wpdb->postmeta as postmeta ON ( posts.ID = postmeta.post_id )
					WHERE
						(
							SELECT
								COUNT(1)
							FROM
								$wpdb->term_relationships
							WHERE
								term_taxonomy_id IN($in) AND object_id = posts.ID
						) = $count
						AND posts.post_type = 'messia_object'
						AND posts.post_status = 'publish'
						%featured%
					GROUP BY posts.ID ##ORDER BY CAST(site_rating AS DECIMAL)## $limit";
			}
		} elseif ( 'post_title' === $attributes['orderBy'] || 'post_date' === $attributes['orderBy'] ) {

			$sql =
				"SELECT posts.ID
				FROM $wpdb->posts as posts
				INNER JOIN $wpdb->postmeta as postmeta ON ( posts.ID = postmeta.post_id )
				WHERE
					(
						SELECT
							COUNT(1)
						FROM
							$wpdb->term_relationships
						WHERE
							term_taxonomy_id IN($in) AND object_id = posts.ID
					) = $count
					AND posts.post_type = 'messia_object'
					AND posts.post_status = 'publish'
					%featured%
				GROUP BY posts.ID ##ORDER BY {$attributes['orderBy']}## $limit;";

		} else {
			// translators: %s - sorting parameter.
			$errors[] = sprintf( __( 'Unrecognized sorting parameter %s', 'messia' ), $attributes['orderBy'] );
		}

		if ( ! is_null( $sql ) ) {

			switch ( $attributes['orderDir'] ) {
				case 'ASC':
				case 'DESC':
					$sql = preg_replace( '/##(.*)##/smi', "$1 {$attributes['orderDir']}", $sql );
					break;

				case 'RND':
					$sql = preg_replace( '/##(.*)##/smi', 'ORDER BY RAND()', $sql );
					break;

				default:
					// translators: %s - sorting direction.
					$errors[] = sprintf( __( 'Unrecognized sorting direction %s', 'messia' ), $attributes['orderBy'] );
					break;
			}

			switch ( $attributes['isFeatured'] ) {
				case -1:
					$featured_key = str_replace( [ '%name%', '%Id%' ], [ 'is_featured', $segment_term ], MESSIA_POSTMETA_STUFF_NAME );
					$sql          = str_replace( '%featured%', "AND ( postmeta.meta_key = '{$featured_key}' AND postmeta.meta_value = 0 )", $sql );
					break;

				case 1:
					$featured_key = str_replace( [ '%name%', '%Id%' ], [ 'is_featured', $segment_term ], MESSIA_POSTMETA_STUFF_NAME );
					$sql          = str_replace( '%featured%', "AND ( postmeta.meta_key = '{$featured_key}' AND postmeta.meta_value = 1 )", $sql );
					break;

				default:
					$sql = str_replace( '%featured%', '', $sql );
			}

			$objects = array_keys( $wpdb->get_results( $sql, OBJECT_K ) ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
		}

		$card_args = [
			'animated_appearance' => false,
			'ripple_hover'        => ( 1 === $this->blog_settings['object_card_bubble_hover'] ) ? true : false,
			'ripple_click'        => true,
			'image_size'          => ( $attributes['columns'] < 4 ) ? 'messia_card_thumb_m' : 'messia_card_thumb_s',
		];

		// SQL.
		$more     = __( 'More...', 'messia' );
		$more_url = home_url() . "/{$attributes['segment']}/";
		$helper   = MIA()->get_module( 'object_card' );

		foreach ( $objects as $object_id ) {
			$render .= $helper::get_object_card( (int) $segment_term, $object_id, $card_args );
		}

		if ( 0 === count( $objects ) && 1 === $this->blog_settings['debugger'] ) {
			$errors[] = __( 'Nothing found. Change conditions or object\'s data.', 'messia' );
		}

		$errors = $this->helpers::print_errors( $this->block_name, $errors, $trick );
		$render = "	{$errors}
					<div class='row listing-col-{$attributes['columns']} align-items-stretch mb-4'>{$render}</div>
					<div class='text-center'><a href='{$more_url}' class='messia-btn-lg messia-btn more-objects px-5 py-2 d-inline-block'>{$more}</a></div>";

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
			'/block-objects-filtered',
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

					$category = $this->setup_empty_terms( $category );

					$return['terms'] = [
						'segment'  => [],
						'category' => [],
						'property' => [],
						'orderBy'  => [
							[
								'label'    => __( 'Date published', 'messia' ),
								'value'    => 'post_date',
								'disabled' => false,
							],
							[
								'label'    => __( 'Name', 'messia' ),
								'value'    => 'post_title',
								'disabled' => false,
							],
							[
								'label'    => __( 'Rating', 'messia' ),
								'value'    => 'rating',
								'disabled' => false,
							],
							[
								'label'    => __( 'Reviews', 'messia' ),
								'value'    => 'reviews',
								'disabled' => $this->blog_settings['substitute_rating_by_site_rating'],
							],
						],
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
					unset( $terms[ $k ] );
				}
			}
		}
		return $terms;
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

		$attributes['errors'] = [];

		if ( false !== $attributes['segment'] ) {

			$segments = array_column( $db_terms['segment'], 'value' );

			if ( ! in_array( $attributes['segment'], $segments, true ) ) {
				$attributes['errors'] = [
					// translators: %s - term slug.
					sprintf( __( 'Segment term %s does not exist and was ignored.', 'messia' ), $attributes['segment'] ),
				];
				unset( $attributes['segment'] );
			}
		}
		if ( ! empty( $attributes['category'] ) ) {

			$categories = array_column( $db_terms['category'], 'value' );

			foreach ( $attributes['category'] as $index => $attr_cat ) {
				if ( ! in_array( $attr_cat, $categories, true ) ) {
					$attributes['errors'] = [
						// translators: %s - term slug.
						sprintf( __( 'Category term %s does not exist and was ignored.', 'messia' ), $attr_cat ),
					];
					unset( $attributes['category'][ $index ] );
				}
			}
		}
		if ( false !== $attributes['property'] ) {

			$properties = array_column( $db_terms['property'], 'value' );

			foreach ( $attributes['property'] as $index => $attr_prop ) {
				if ( ! in_array( $attr_prop, $properties, true ) ) {
					$attributes['errors'] = [
						// translators: %s - term slug.
						sprintf( __( 'Property term %s does not exist and was ignored.', 'messia' ), $attr_prop ),
					];
					unset( $attributes['property'][ $index ] );
				}
			}
		}

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
	private function build_category_flat( array $terms, array $flat = [], int $level = 0 ): array {

		foreach ( $terms as $term ) {

			if ( 0 === (int) $term->parent ) {
				$level = 0;
			}

			$flat[] = [
				'label' => str_repeat( '— ', $level ) . " {$term->name} [{$term->count}]",
				'value' => $term->slug,
			];

			if ( isset( $term->children ) ) {
				++$level;
				$flat = $this->build_category_flat( $term->children, $flat, $level );
				--$level;
			}
		}
		return $flat;
	}
}
