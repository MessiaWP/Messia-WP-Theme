<?php
/**
 * Messia_Listing_Tmpl_Base
 *
 * @package Messia\Modules\Listing\Skins
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscapede

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Modules\Listing\Skins;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Smartbits\Messia\Includes\Modules\Messia_Module_Base;
use Exception;
use stdClass;

/**
 * Base class for all template for List of objects render.
 *
 * @package Messia\Modules\Listing\Skins
 */
abstract class Messia_Listing_Tmpl_Base extends Messia_Module_Base {

	/**
	 * Current blog settings.
	 *
	 * @var array
	 */
	protected array $blog_settings = [];

	/**
	 * SVG pictures.
	 *
	 * @var stdClass
	 */
	protected stdClass $svgs;

	/**
	 * Custom post type config.
	 *
	 * @var array
	 */
	protected array $cpt;

	/**
	 * Runtime enviroment type.
	 *
	 * @var string
	 */
	protected string $mode;

	/**
	 * Segment term in request.
	 *
	 * @var string
	 */
	protected string $segment_term;

	/**
	 * Current listing URL.
	 *
	 * @var string
	 */
	protected string $listing_query;

	/**
	 * Segment term id in request.
	 *
	 * @var int
	 */
	protected int $segment_term_id;

	/**
	 * Category terms in request.
	 *
	 * @var array
	 */
	protected array $category_terms;

	/**
	 * Properties data in request.
	 *
	 * @var array
	 */
	protected ?array $properties;

	/**
	 * All terms in request.
	 *
	 * @var array
	 */
	protected array $listing_terms = [
		'segment_term_id'  => [],
		'category_term_id' => [],
		'property_term_id' => [],
	];

	/**
	 * Objects found by request condition.
	 *
	 * @var array
	 */
	protected array $objects;

	/**
	 * Validate cookie.
	 *
	 * @var stdClass
	 */
	protected stdClass $cookie;

	/**
	 * Objects found by request condition
	 * and reduced to page size.
	 *
	 * @var array
	 */
	protected array $objects_paged;

	/**
	 * Hierarchical and flatten terms of
	 * messia taxonomy to build filters.
	 *
	 * @var array
	 */
	protected array $messia_cpt_filter_terms;

	/**
	 * The order that terms should be in
	 *
	 * @var array
	 */
	protected array $global_terms_order = [
		'messia_object_category'    => [],
		'messia_object_property'    => [],
		'messia_object_constructor' => [],
	];

	/**
	 * Messia_Listing_Tmpl_Base Constructor.
	 */
	protected function __construct() {
		parent::__construct();

		$this->blog_settings = MIA()->get_module( 'settings' )->get_blog_setting( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME );
		$this->cookie        = MIA()->get_cookie();
		$this->svgs          = $this->helpers::get_theme_svg_icons();

		if ( $this->helpers::messia_doing_ajax( 'get_listing' ) ) {
			$this->mode = 'listing_ajax';
			$this->init();
		} elseif ( $this->helpers::is_listing_page() ) {
			$this->mode = 'listing_normal';
			$this->init();
		}
		$this->init_hooks();
	}

	/**
	 * Child class forced to use it for page rendring.
	 *
	 * @return void
	 */
	abstract protected function generate_page(): void;

	/**
	 * Child class forced to use it for filters rendring.
	 *
	 * @param array $args     All widget data it was registered with.
	 * @param array $instance Current saved value.
	 *
	 * @return string
	 */
	abstract public function get_filters( array $args, array $instance ): string;

	/**
	 * Required in class WP hooks actions.
	 *
	 * @return void
	 */
	private function init_hooks(): void {
		add_filter( 'messia_post_title', [ $this, 'seo_title' ], 10, 2 );
		add_action( 'messia_after_post_title', [ $this, 'seo_description' ] );
	}

	/**
	 * Required in class WP hooks actions.
	 *
	 * @return void
	 * @throws Exception When using template not for listing page.
	 */
	private function init(): void {

		if ( ! isset( $this->mode ) ) {
			throw new Exception( 'The listing template is connected to a page that is not a list of objects page.' );
		}

		$this->setup_terms();
		$this->setup_filters_terms();
		$this->validate_listing_request();
		$this->setup_objects();

		if ( 'listing_normal' === $this->mode ) {
			add_action( 'wp_enqueue_scripts', [ $this, 'enqueue' ] );
		}
	}

	/**
	 * Enqueue page scripts & styles for this page type.
	 *
	 * @return void
	 */
	public function enqueue(): void {
		wp_enqueue_script( 'messia-listing' );
		wp_enqueue_style( 'messia-listing' );
	}

	/**
	 * Parse URL and detect terms by texonomies.
	 *
	 * @return void
	 */
	private function setup_terms(): void {
		$parsed_url = $this->helpers::parse_listing_query();

		$this->listing_query  = $parsed_url->listing_query;
		$this->segment_term   = $parsed_url->segment_term;
		$this->category_terms = $parsed_url->category_terms;
		$this->properties     = $parsed_url->properties;

		global $wpdb;

		$segment_terms_found = [];

		// SEGMENT.
		$segment_terms_found = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT
					term_taxonomy_id
				FROM $wpdb->terms
				INNER JOIN $wpdb->term_taxonomy ON $wpdb->terms.term_id = $wpdb->term_taxonomy.term_id
				WHERE $wpdb->term_taxonomy.taxonomy IN ('messia_object_segment') AND $wpdb->terms.slug = %s;",
				$this->segment_term
			),
			OBJECT_K
		);

		$this->segment_term_id = array_key_first( $segment_terms_found );
	}

	/**
	 * Define what terms should be shown as filters based
	 * on terms provided in URL.
	 *
	 * @return void
	 */
	private function setup_filters_terms(): void {

		$category_terms = $this->helpers::get_terms_for_segment( 'messia_object_category', $this->segment_term, [ 'select_all', 'filter_label', 'branch_as_filter', 'filter_type' ] );
		$property_terms = $this->helpers::get_terms_for_segment( 'messia_object_property', $this->segment_term, [ 'property_group', 'category_parent', 'term_as_filter' ] );
		$constructor    = $this->helpers::messia_get_term_meta( $this->segment_term_id, 'constructor_cf' );

		$this->messia_cpt_filter_terms['messia_object_category']['tree'] = $this->helpers::get_terms_tree( $category_terms );
		$this->messia_cpt_filter_terms['messia_object_category']['flat'] = $this->helpers::walk_terms_tree_for_filters( $this->messia_cpt_filter_terms['messia_object_category']['tree'], $this->global_terms_order['messia_object_category'] );

		$this->messia_cpt_filter_terms['messia_object_property']['tree'] = $this->helpers::get_terms_tree( $property_terms );
		$this->messia_cpt_filter_terms['messia_object_property']['flat'] = $this->helpers::walk_terms_tree_for_filters( $this->messia_cpt_filter_terms['messia_object_property']['tree'], $this->global_terms_order['messia_object_property'] );

		$this->messia_cpt_filter_terms['messia_object_constructor'] = $constructor;
		$this->global_terms_order['messia_object_constructor']      = $constructor;
	}

	/**
	 * Compares terms transmitted through URL with existing terms.
	 * All URL terms must exist in the database and be in same order
	 * as they do in DB.
	 *
	 * @return bool
	 */
	protected function validate_listing_request(): bool {

		if ( 1 === $this->blog_settings['listing_use_canonical_url'] ) {

			$correct_url = $this->helpers::create_listing_url( $this->global_terms_order, $this->segment_term, $this->category_terms, $this->properties );

			if ( is_wp_error( $correct_url ) ) {
				$this->helpers::page404();
			}

			if ( $this->listing_query !== $correct_url ) {
				if ( 'listing_ajax' === $this->mode ) {
					wp_send_json_success(
						[
							'code'     => 301,
							'location' => $correct_url,
							// translators: %s - URL.
							'message'  => sprintf( __( 'Invalid listing URL, redirecting to correct one %s.', 'messia' ), $correct_url ),
						]
					);
				} else {
					wp_safe_redirect( $correct_url, 301 );
					exit;
				}
			}
		}

		$category_terms_found = array_intersect( $this->global_terms_order['messia_object_category'], $this->category_terms );
		$property_terms_found = array_intersect( $this->global_terms_order['messia_object_property'], $this->properties['prop'] );

		$this->listing_terms['segment_term_id']  = [ $this->segment_term_id ];
		$this->listing_terms['category_term_id'] = array_keys( $category_terms_found );
		$this->listing_terms['property_term_id'] = array_keys( $property_terms_found );
		$this->listing_terms['constructor_term'] = $this->properties['cf'];

		return true;
	}

	/**
	 * Slice all found objects to current viewing pagination.
	 *
	 * @return void
	 */
	private function setup_objects(): void {

		$list              = $this->properties['list'];
		$per_page          = (int) $this->blog_settings['objects_per_pocket'];
		$request_terms_id  = array_merge( $this->listing_terms['segment_term_id'], $this->listing_terms['category_term_id'], $this->listing_terms['property_term_id'] );
		$constructor_query = $this->listing_terms['constructor_term'];

		// Found objects.
		$this->objects = $this->get_objects( $request_terms_id, $constructor_query, $this->properties['sort'], $this->properties['search'] );

		// Number of listing pages (if per_page > $this->objects -> lists = 1).
		$lists = ( $per_page > 0 ) ? (int) count( $this->objects ) / $per_page : 0;

		$this->properties['lists'] = ( $lists < 1 ) ? 1 : (int) ceil( $lists );

		/*
		 * Trimming the array in accordance with pagination, this can be done in an SQL query, but if you need to output somewhere
		 * number of found objects - you will have to make two requests, which is slower than making one and then trimming it
		 */
		if ( 'listing_ajax' === $this->mode ) {

			if ( ! check_ajax_referer( 'messiaFrontendAjax', 'messiaNonce', false ) ) {
				wp_send_json_error(
					[
						'code'     => 403,
						'btn_text' => __( 'Permission error - please reload the page & try again', 'messia' ),
					]
				);
			}

			$keep_list = filter_var( $_POST['data']['keepList'], FILTER_VALIDATE_BOOLEAN );

			if ( true === $keep_list ) {
				// All objects from the first page.
				$this->objects_paged = array_slice( $this->objects, 0, $list * $per_page );
			} else {
				$this->objects_paged = array_slice( $this->objects, $list * $per_page - $per_page, $per_page );
			}
		} elseif ( 'listing_normal' === $this->mode ) {
			// All objects from the first page.
			$this->objects_paged = array_slice( $this->objects, 0, $list * $per_page );
		}
	}

	/**
	 * Conditionaly adds root category terms to request URL if its not specified.
	 *
	 * @param array $terms Category terms parsed from URL.
	 *
	 * @return array
	 */
	protected function maybe_add_root_category_terms( array $terms ): array {

		$root_category_terms_required = $this->blog_settings['root_category_terms_required'];

		if ( $root_category_terms_required ) {

			$root_category_terms = $this->helpers::get_root_terms( 'messia_object_category' );
			$root_category_terms = array_keys( $root_category_terms );

			$to_add = array_diff( $root_category_terms, $terms );

			if ( count( $to_add ) > 0 ) {
				$terms = array_merge( $terms, $to_add );
			}
		}

		return $terms;
	}

	/**
	 * Search for objects by URL condition.
	 *
	 * @param array  $taxonomies_terms  Taxonomy term IDs to search objects within.
	 * @param array  $constructor_query Constructor terms.
	 * @param string $sort              Valid sort order condition.
	 * @param string $search            Search substring.
	 *
	 * @return array
	 */
	protected function get_objects( array $taxonomies_terms, array $constructor_query, string $sort, ?string $search = null ): array {

		global $wpdb;

		/**
		 * Filters admin menu options array.
		 *
		 * @param string $param Menu config
		 * @hook before_messia_menu_render
		 */
		$pre = apply_filters( 'messia_pre_get_objects_for_listing', $taxonomies_terms, $constructor_query );

		$like                = null;
		$object_custom_order = json_decode( $this->blog_settings['objects_search_order'], true );
		$taxonomies_terms    = $this->maybe_add_root_category_terms( $taxonomies_terms );

		if ( false === is_null( $search ) ) {
			$search = '%' . esc_sql( $wpdb->esc_like( $search ) ) . '%';
			$like   = " AND posts.post_title LIKE '$search' ";
		}

		$in = implode( ',', array_map( 'intval', $taxonomies_terms ) );

		$single_terms_in     = array_map( 'intval', $taxonomies_terms ); // Suppose that all terms are single initially.
		$categories_single   = [];
		$categories_multiple = [];
		$exists_subqueries   = [];

		$category_terms_sql =
			"SELECT #find category terms, groupped by its parent term#
				parent,
				GROUP_CONCAT(t.term_id) as children_ids
			FROM $wpdb->terms AS t
			INNER JOIN $wpdb->term_taxonomy AS tt ON t.term_id = tt.term_id
			WHERE
				t.term_id IN ($in)
				AND taxonomy = 'messia_object_category'
			GROUP BY
				parent";

		$category_terms = $wpdb->get_results( $category_terms_sql ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

		/*
		 * Fill 2 arrays with category terms - one with terms that has NO common parent (it is single select on front),
		 * second with terms that HAS common parent (it is multiple select on front).
		 */
		foreach ( $category_terms as $category_term ) {

			$terms_array = array_map( 'intval', explode( ',', $category_term->children_ids ) );

			if ( 0 === (int) $category_term->parent ) {
				foreach ( $terms_array as $root_term ) {
					$filter_type = $this->helpers::messia_get_term_meta( $root_term, 'filter_type' );

					if ( 'select-multi' === $filter_type ) {
						$categories_multiple[] = [ $root_term ];
					} elseif ( 'select-single' === $filter_type ) {
						$categories_single[] = $root_term;
					}
				}
			} else {
				$filter_type = $this->helpers::messia_get_term_meta( (int) $category_term->parent, 'filter_type' );

				if ( 'select-multi' === $filter_type ) {
					$categories_multiple[] = $terms_array;
				} elseif ( 'select-single' === $filter_type ) {
					$categories_single = array_merge( $categories_single, $terms_array );
				}
			}
		}

		// Fill $single_terms_in with all incoming terms, except multiple.
		$categories_multiple_flat = array_unique( call_user_func_array( 'array_merge', $categories_multiple ) );
		$single_terms_in          = array_diff( $taxonomies_terms, $categories_multiple_flat );

		// Prepare data for SQL.
		$single_terms_count = count( $single_terms_in );
		$single_terms_in    = implode( ',', $single_terms_in );

		$sorting_args = explode( ',', $sort );

		$sort_dir = 'asc';
		$sorting  = [
			'type' => 'core',
			'prop' => MESSIA_LIST_SORT_SEARCH['sort'],
		];

		// For security reasons - it will go into SQL query.
		if ( 'asc' === $sorting_args[1] ) {
			$sort_dir = 'asc';
		} elseif ( 'desc' === $sorting_args[1] ) {
			$sort_dir = 'desc';
		}

		if ( 'name' === $sorting_args[0] ) {
			$sorting = [
				'type' => 'core',
				'prop' => 'name',
			];
		} elseif ( 'rating' === $sorting_args[0] ) {
			$sorting = [
				'type' => 'core',
				'prop' => 'rating',
			];
		} else {
			preg_match( '/^cf_sort_([\S\d]+)$/', $sorting_args[0], $matches );
			if ( isset( $matches[1] ) ) {
				$sorting = $matches[1];
				$sorting = [
					'type' => 'constructor',
					'prop' => $matches[1],
				];
			}
		}

		/*
		 * General search starts here and has next global logic:
		 * First iteration search objects by category and property terms and sorting args.
		 * Second iteration search objects by constructor filters terms inside found on first iteration keeping original sorting.
		 */
		// TODO - these requests do not search for an object that belongs to several segments at once.
		// FIRST ITERATION.
		switch ( $sorting['type'] ) {
			case 'core':
				switch ( $sorting['prop'] ) {
					case 'name':
						$sql =
							"SELECT
								posts.ID
							FROM
								$wpdb->posts AS posts
								INNER JOIN $wpdb->term_relationships as tr ON posts.ID = tr.object_id
							WHERE
								posts.post_type = 'messia_object'
								AND posts.post_status = 'publish'
								AND tr.term_taxonomy_id IN ($single_terms_in)
								%multiple_filters_subqueries%
								$like
							GROUP BY
								posts.ID
							HAVING
								count(posts.ID) = $single_terms_count
							ORDER BY
								posts.post_title {$sort_dir}";
						break;

					case 'rating':
						$blog_settings = MIA()->get_module( 'settings' )->get_blog_setting( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME );

						if ( 1 === $blog_settings['substitute_rating_by_site_rating'] ) {

							$segment_term = $wpdb->get_var(
								$wpdb->prepare(
									"SELECT
										t.term_id
									FROM $wpdb->terms AS t
									INNER JOIN $wpdb->term_taxonomy AS tt ON t.term_id = tt.term_id
									WHERE
										tt.taxonomy IN ('messia_object_segment')
										AND t.slug = %s
										LIMIT 1",
									$this->segment_term
								)
							);

							$rating_key = str_replace( '%Id%', $segment_term, MESSIA_SITERATING_NAME );

							$sql =
								"SELECT
									posts.ID,
									(
										SELECT
											meta_value
										FROM $wpdb->postmeta
										WHERE
											meta_key = '$rating_key'
											AND post_id = posts.ID
									) as 'site_rating'
								FROM
									$wpdb->posts as posts
									INNER JOIN $wpdb->term_relationships as tr ON posts.ID = tr.object_id
								WHERE
									posts.post_type = 'messia_object'
									AND posts.post_status = 'publish'
									AND tr.term_taxonomy_id IN ($single_terms_in)
									%multiple_filters_subqueries%
									$like
								GROUP BY
									posts.ID
								HAVING
									count(posts.ID) = $single_terms_count
								ORDER BY
									CAST(site_rating AS DECIMAL(4,2)) {$sort_dir}";
						} else {

							$sql =
								"SELECT
									posts.ID,
									(
										SELECT SUM(commentsmeta.meta_value) / COUNT(posts_inner.ID) AS 'rating'
										FROM $wpdb->posts AS posts_inner
										INNER JOIN $wpdb->comments AS comments ON posts_inner.ID = comments.comment_post_ID
										INNER JOIN $wpdb->commentmeta AS commentsmeta ON comments.comment_ID = commentsmeta.comment_id
										WHERE commentsmeta.meta_key = 'messia_rating' AND posts_inner.ID = posts.ID
										GROUP BY posts.ID
									) AS 'rating'
								FROM $wpdb->posts as posts
								INNER JOIN $wpdb->term_relationships as tr ON posts.ID = tr.object_id
								WHERE
									posts.post_type = 'messia_object'
									AND posts.post_status = 'publish'
									AND tr.term_taxonomy_id IN ($single_terms_in)
									%multiple_filters_subqueries%
									$like
								GROUP BY
									posts.ID
								HAVING
									count(posts.ID) = $single_terms_count
								ORDER BY
									CAST(rating AS DECIMAL(4,2)) {$sort_dir}";
						}
						break;
				}
				break;

			case 'constructor':
				$sql =
					"SELECT
							posts.ID,
							JSON_EXTRACT(meta_value, '$.{$sorting['prop']}') * 1 AS constructor_field
						FROM
							$wpdb->posts AS posts
							INNER JOIN $wpdb->term_relationships as tr ON posts.ID = tr.object_id
							INNER JOIN $wpdb->postmeta as post_meta ON posts.ID = post_meta.post_id AND post_meta.meta_key = '_segment_constructor_term_id_2'
						WHERE
							posts.post_type = 'messia_object'
							AND posts.post_status = 'publish'
							AND tr.term_taxonomy_id IN ($single_terms_in)
							AND (post_meta.meta_key = '_segment_constructor_term_id_2')
							%multiple_filters_subqueries%
							$like
						GROUP BY
							posts.ID
						HAVING
							count(posts.ID) = $single_terms_count
					UNION
						SELECT
							posts.ID,
							JSON_EXTRACT(meta_value, '$.{$sorting['prop']}') * 1 AS constructor_field
						FROM
							$wpdb->posts AS posts
							INNER JOIN $wpdb->term_relationships as tr ON posts.ID = tr.object_id
							LEFT JOIN $wpdb->postmeta as post_meta ON posts.ID = post_meta.post_id AND post_meta.meta_key = '_segment_constructor_term_id_2'
						WHERE
							posts.post_type = 'messia_object'
							AND posts.post_status = 'publish'
							AND tr.term_taxonomy_id IN ($single_terms_in)
							%multiple_filters_subqueries%
							$like
						GROUP BY
							posts.ID
						HAVING
							count(posts.ID) = $single_terms_count
						ORDER BY constructor_field {$sort_dir};";
		}

		if ( ! empty( $categories_multiple ) ) {
			foreach ( $categories_multiple as $category_multiple ) {

				$category_multiple_in = implode( ',', $category_multiple );

				$exists_subqueries[] =
					"AND posts.ID IN (
						SELECT object_id
						FROM $wpdb->term_relationships as tr
						WHERE tr.term_taxonomy_id IN ($category_multiple_in)
					)";
			}
		}

		$sql     = str_replace( '%multiple_filters_subqueries%', implode( "\n", $exists_subqueries ), $sql );
		$objects = array_map( 'intval', $wpdb->get_col( $sql ) ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

		// SECOND ITERATION.
		if ( ! empty( $constructor_query ) && ! empty( $objects ) ) {

			$select   = [ 'posts.ID' ];
			$having   = [];
			$in       = implode( ',', $objects );
			$meta_key = str_replace( '%Id%', (string) $this->segment_term_id, MESSIA_POSTMETA_CONSTRUCTED_NAME );

			$constructor_terms = $this->messia_cpt_filter_terms['messia_object_constructor'];
			$constructor_slugs = array_column( $constructor_terms, 'slug' );

			foreach ( $constructor_query as $slug => $search_data ) {
				$index = array_search( $slug, $constructor_slugs, true );
				$term  = $constructor_terms[ $index ];

				switch ( $term['field_type'] ) {
					case 'input_number':
						$select[] = "JSON_EXTRACT(meta_value, '$.{$term['slug']}') * 1 AS {$term['slug']}";
						$having[] = "{$term['slug']} >= {$search_data['a']} AND {$term['slug']} <= {$search_data['b']}";
						break;
				}
			}

			$select = implode( ', ', $select );
			$having = implode( ' AND ', $having );

			// phpcs:disable WordPress.DB.PreparedSQL.InterpolatedNotPrepared
			$constructor = $wpdb->get_col(
				$wpdb->prepare(
					"SELECT
						{$select}
					FROM
						$wpdb->posts AS posts
						INNER JOIN $wpdb->postmeta as pm ON posts.ID = pm.post_id
					WHERE
						posts.ID IN ($in)
						AND pm.meta_key = %s
					HAVING
						{$having}
					ORDER BY posts.ID asc",
					$meta_key
				)
			);
			// phpcs:enable WordPress.DB.PreparedSQL.InterpolatedNotPrepared

			$constructor = array_map( 'intval', $constructor );
			$objects     = array_intersect( $objects, $constructor ); // -> keep objects order from first iteration.
		}

		if ( $object_custom_order ) {
			$object_custom_order = array_column( $object_custom_order, 'postid' );

			$to_top    = array_intersect( $object_custom_order, $objects );
			$after_top = array_diff( $objects, $object_custom_order );
			$objects   = array_merge( $to_top, $after_top );
		}

		return $objects;
	}

	/**
	 * Put property filters into corresponding user groups.
	 *
	 * @param array $property_groups User custom groups.
	 * @param array $property_terms  Taxonomy Property terms.
	 *
	 * @return array
	 */
	protected function regroup_properties( array $property_groups, array $property_terms ): array {

		$property_groups = array_merge(
			array_fill_keys( array_keys( $property_groups ), [] ),
			[
				'ungrouped' => [],
			]
		);

		foreach ( $property_terms as $property_child_terms ) {

			foreach ( $property_child_terms as $property_child_term ) {
				if ( is_null( $property_child_term[0]['property_group'] ) || -1 === (int) $property_child_term[0]['property_group'] ) {
					$group_key = 'ungrouped';
				} else {

					$group_key = $property_child_term[0]['property_group'];

					/*
					 * This could be if group was deleted in options but
					 * terms meta update failed for some reasons.
					 */
					if ( ! isset( $property_groups[ $group_key ] ) ) {
						$group_key = 'ungrouped';
					}
				}
				$property_groups[ $group_key ][] = $property_child_term[0];
			}
		}

		return $property_groups;
	}

	/**
	 * Get category terms available for current request.
	 *
	 * Logic:
	 * Lets say we have filters values:
	 * - USA
	 * -- Alabama
	 * --- Montgomery
	 * - $051-$100, $101-$150, $151-$200
	 * - 2-stars, 3-stars, 4-stars
	 *
	 * then we parse all these terms and get their parents as array:
	 * [
	 *  parent_id => ['child_id, child_id, child_id ...]'
	 * ...
	 * ]
	 * where parent_id are only those terms that has filter type 'select-multi'.
	 *
	 * Next fire the loop on filter values removing multiple filters like this:
	 * Serach object 1:
	 * - USA
	 * -- Alabama
	 * --- Montgomery
	 * - $051-$100, $101-$150, $151-$200 (REMOVED)
	 * - 2-stars, 3-stars, 4-stars
	 *
	 * Serach object 2:
	 * - USA
	 * -- Alabama
	 * --- Montgomery
	 * - $051-$100, $101-$150, $151-$200
	 * - 2-stars, 3-stars, 4-stars (REMOVED)
	 *
	 * And merge searches - Serach object 1 + Serach object 2 as $objects_multi_filter.
	 * Next we search category terms for $objects_multi_filter and it will give us available terms
	 * for such a filters combination.
	 *
	 * @return array
	 */
	protected function get_available_categories(): array {

		global $wpdb;

		$listing_terms = array_merge( $this->listing_terms['segment_term_id'], $this->listing_terms['category_term_id'] );
		$in            = implode( ',', $listing_terms );

		$category_terms_sql =
			"SELECT #find category terms, groupped by its parent term#
				parent,
				GROUP_CONCAT(t.term_id) as children_ids
			FROM $wpdb->terms AS t
			INNER JOIN $wpdb->term_taxonomy AS tt ON t.term_id = tt.term_id
			WHERE
				t.term_id IN ($in)
				AND taxonomy = 'messia_object_category'
				AND parent IN
					(
						SELECT
							term_id
						FROM $wpdb->termmeta AS tm
						WHERE
							tm.term_id        = parent
							AND tm.meta_key   = 'filter_type'
							AND tm.meta_value = 'select-multi'
					)
			GROUP BY parent";

		$multi_terms_groups   = $wpdb->get_results( $category_terms_sql ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
		$objects_multi_filter = [];

		if ( empty( $multi_terms_groups ) ) {
			$objects_multi_filter = $this->objects;
		} else {
			foreach ( $multi_terms_groups as $multi_terms ) {
				$children_ids = array_map( 'intval', explode( ',', $multi_terms->children_ids ) );
				$try_preset   = array_diff( $listing_terms, $children_ids );

				$objects              = $this->get_objects( $try_preset, [], $this->properties['sort'], $this->properties['search'] );
				$objects_multi_filter = array_merge( $objects, $objects_multi_filter );
			}
		}

		$available_categories = array_keys( $this->helpers::get_object_terms( array_unique( $objects_multi_filter ), [ 'messia_object_category' ] ) );

		return $available_categories;
	}

	/**
	 * Get property terms available for current request.
	 *
	 * @return array
	 */
	protected function get_available_properties(): array {
		return array_keys( $this->helpers::get_object_terms( $this->objects, [ 'messia_object_property' ] ) );
	}

	/**
	 * Getter for current valid segment term detected.
	 *
	 * @return string Term slug.
	 */
	public function get_current_segment_term(): string {
		return $this->segment_term;
	}

	/**
	 * Getter for current valid category terms detected.
	 *
	 * @return array Terms slugs.
	 */
	public function get_current_category_terms(): array {
		return $this->category_terms;
	}
}
