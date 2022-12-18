<?php
/**
 * Messia_Help_Database
 *
 * @package Messia\Helpers
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Helpers;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use stdClass;
use WP_Error;

/**
 * This class contains static specific simple methods
 * independant for interactions with database.
 *
 * @package Messia\Helpers
 */
class Messia_Help_Database {

	/**
	 * The cache of segment terms.
	 *
	 * @var array
	 */
	private static array $get_terms_segment_cache = [];

	/**
	 * The cache of category terms.
	 *
	 * @var array
	 */
	private static array $get_terms_category_cache = [];

	/**
	 * The cache of property terms.
	 *
	 * @var array
	 */
	private static array $get_terms_property_cache = [];

	/**
	 * The cache of posts links.
	 *
	 * @var array
	 */
	private static array $messia_get_term_meta_cache = [];

	/**
	 * The cache of top level terms children.
	 *
	 * @var array
	 */
	private static array $get_top_terms_children_cache = [];

	/**
	 * Get all terms of segment taxonomy.
	 *
	 * @return array
	 */
	public static function get_terms_segment(): array {

		global $wpdb;

		if ( empty( self::$get_terms_segment_cache ) ) {

			$sql =
				"SELECT
						t.slug,
						t.term_id,
						t.name,
						tt.count,
						tt.taxonomy
				FROM $wpdb->terms AS t
				INNER JOIN $wpdb->term_taxonomy AS tt ON t.term_id = tt.term_id
				WHERE tt.taxonomy IN ('messia_object_segment')
				ORDER BY t.term_id ASC;";

			self::$get_terms_segment_cache = $wpdb->get_results( $sql, OBJECT_K ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
		}

		return self::$get_terms_segment_cache;
	}

	/**
	 * Get all terms of category taxonomy.
	 *
	 * @return array
	 */
	public static function get_terms_category(): array {

		global $wpdb;

		if ( empty( self::$get_terms_category_cache ) ) {

			$sql =
				"SELECT
					t.slug,
					t.term_id,
					t.name,
					tt.parent,
					tt.count,
					tt.taxonomy
				FROM $wpdb->terms AS t
				INNER JOIN $wpdb->term_taxonomy AS tt ON t.term_id = tt.term_id
				WHERE tt.taxonomy IN ('messia_object_category')
				ORDER BY t.term_id ASC;";

			self::$get_terms_category_cache = $wpdb->get_results( $sql, OBJECT_K ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
		}

		return self::$get_terms_category_cache;
	}

	/**
	 * Get all terms of property taxonomy.
	 *
	 * @return array
	 */
	public static function get_terms_property(): array {

		global $wpdb;

		if ( empty( self::$get_terms_property_cache ) ) {

			$sql =
				"SELECT
					t.slug,
					t.term_id,
					t.name,
					tt.count,
					tt.taxonomy
				FROM $wpdb->terms AS t
				INNER JOIN $wpdb->term_taxonomy AS tt ON t.term_id = tt.term_id
				WHERE tt.taxonomy IN ('messia_object_property')
				ORDER BY t.term_id ASC;";

			self::$get_terms_property_cache = $wpdb->get_results( $sql, OBJECT_K ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
		}

		return self::$get_terms_property_cache;
	}

	/**
	 * Wrapper for WP get_term_meta, having own cache.
	 *
	 * @param int    $term_id     ID of term.
	 * @param string $meta_name   Meta value key.
	 * @param bool   $flush_cache Whether to bypass cache.
	 *
	 * @return mixed
	 */
	public static function messia_get_term_meta( int $term_id, string $meta_name, bool $flush_cache = false ) {

		if ( ! isset( self::$messia_get_term_meta_cache[ $term_id ] ) ) {
			self::$messia_get_term_meta_cache[ $term_id ] = [];
		}

		if ( ! array_key_exists( $meta_name, self::$messia_get_term_meta_cache[ $term_id ] ) || $flush_cache ) {
			$term_meta = get_term_meta( $term_id, $meta_name, true );

			if ( empty( $term_meta ) ) {
				$term_meta = [];
			}
			self::$messia_get_term_meta_cache[ $term_id ][ $meta_name ] = $term_meta;
		}

		return self::$messia_get_term_meta_cache[ $term_id ][ $meta_name ];
	}

	/**
	 * Get taxonomy terms that has no parents.
	 *
	 * @param string $taxonomy Registered taxonomy name.
	 *
	 * @return array
	 */
	public static function get_root_terms( string $taxonomy ): array {

		global $wpdb;

		$terms = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT term_id
				FROM $wpdb->term_taxonomy
				WHERE
					parent = 0
					AND taxonomy = %s;",
				$taxonomy
			),
			OBJECT_K
		);

		return $terms;
	}

	/**
	 * Get direct children of terms that has no parents. Not uses now.
	 *
	 * @param string $taxonomy Registered taxonomy name.
	 *
	 * @return array
	 * @nonused
	 */
	public static function get_top_terms_children( string $taxonomy ): array {

		global $wpdb;

		if ( empty( self::$get_top_terms_children_cache[ $taxonomy ] ) ) {

			$top_terms = $wpdb->get_results(
				$wpdb->prepare(
					"SELECT t.term_id
					FROM $wpdb->terms AS t INNER JOIN $wpdb->term_taxonomy AS tt ON t.term_id = tt.term_id
					WHERE
						tt.parent = 0
						AND tt.taxonomy IN (%s)
					ORDER BY t.term_id ASC;",
					$taxonomy
				),
				OBJECT_K
			);

			if ( count( $top_terms ) > 0 ) {
				$top_terms = array_keys( $top_terms );
				$top_terms = implode( ',', array_map( 'intval', $top_terms ) );
				$taxonomy  = esc_sql( $taxonomy );

				$sql =
					"SELECT t.term_id, t.slug, t.name
					FROM $wpdb->terms AS t INNER JOIN $wpdb->term_taxonomy AS tt ON t.term_id = tt.term_id
					WHERE
						tt.parent IN ($top_terms)
						AND tt.taxonomy IN ('$taxonomy')
					ORDER BY t.name ASC;";

				self::$get_top_terms_children_cache[ $taxonomy ] = $wpdb->get_results( $sql ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

			} else {
				self::$get_top_terms_children_cache[ $taxonomy ] = [];
			}
		}
		return self::$get_top_terms_children_cache[ $taxonomy ];
	}

	/**
	 * Get terms post belongs to.
	 *
	 * @param array $postid    ID of post.
	 * @param array $taxonomy  Registered taxonomy names.
	 * @param array $meta_keys Meta key which value to include in result.
	 *
	 * @return array
	 */
	public static function get_post_terms( array $postid, array $taxonomy, array $meta_keys = [] ): array {

		global $wpdb;

		$meta_keys_select = (string) null;
		$meta_keys_from   = (string) null;

		$postid   = implode( ',', array_map( 'intval', $postid ) );
		$taxonomy = "'" . implode( "','", esc_sql( $taxonomy ) ) . "'";

		$sql =
			"SELECT t.*, tt.* %meta_keys_select%
			FROM $wpdb->terms AS t
			INNER JOIN $wpdb->term_taxonomy AS tt ON t.term_id = tt.term_id
			INNER JOIN $wpdb->term_relationships AS tr ON tr.term_taxonomy_id = tt.term_taxonomy_id
			%meta_keys_from%
			WHERE
				tt.taxonomy IN ($taxonomy)
				AND tr.object_id IN ($postid)
			ORDER BY t.name ASC;";

		foreach ( $meta_keys as $meta_key ) {

			$meta_keys_select .= "{$meta_key}.meta_value as {$meta_key},";
			$meta_keys_from   .= "LEFT JOIN (SELECT term_id, meta_value FROM $wpdb->termmeta WHERE meta_key = '{$meta_key}') AS {$meta_key} ON t.term_id = {$meta_key}.term_id ";
		}

		if ( $meta_keys ) {
			$meta_keys_select = ', ' . trim( $meta_keys_select, ',' );
		}

		$sql = str_replace( '%meta_keys_select%', $meta_keys_select, $sql );
		$sql = str_replace( '%meta_keys_from%', $meta_keys_from, $sql );

		return $wpdb->get_results( $sql ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
	}

	/**
	 * Get terms objects belongs to.
	 *
	 * @param array $objects   ID of objects.
	 * @param array $taxonomy  Registered taxonomy names.
	 * @param array $meta_keys Meta key which value to include in result.
	 *
	 * @return array
	 */
	public static function get_object_terms( array $objects, array $taxonomy, array $meta_keys = [] ): array {

		global $wpdb;

		$meta_keys_select = null;
		$meta_keys_from   = null;

		if ( count( $objects ) > 0 ) {
			$objects = implode( ',', array_map( 'intval', $objects ) );
		} else {
			return [];
		}

		$taxonomy = "'" . implode( "','", esc_sql( $taxonomy ) ) . "'";

		$sql =
			"SELECT t.slug, t.term_id, t.name, tt.term_taxonomy_id, tt.taxonomy, tt.parent, tt.count %meta_keys_select%
			FROM $wpdb->terms AS t
			INNER JOIN $wpdb->term_taxonomy AS tt ON t.term_id = tt.term_id 
			INNER JOIN $wpdb->term_relationships AS tr ON tr.term_taxonomy_id = tt.term_taxonomy_id
			%meta_keys_from%
			WHERE
				tt.taxonomy IN ($taxonomy)
				AND tr.object_id IN ($objects)
			GROUP BY t.name
			ORDER BY #1,2,3...n, 0
				CASE t.term_order
					WHEN t.term_order = 0 OR t.term_order IS NULL THEN t.name
					ELSE -t.term_order
				END ASC,
				t.name ASC;";

		foreach ( $meta_keys as $meta_key ) {

			$meta_keys_select .= "{$meta_key}.meta_value as {$meta_key},";
			$meta_keys_from   .= "LEFT JOIN (SELECT term_id, meta_value FROM $wpdb->termmeta WHERE meta_key = '{$meta_key}') AS {$meta_key} ON t.term_id = {$meta_key}.term_id ";
		}

		if ( $meta_keys ) {
			$meta_keys_select = ', ' . trim( $meta_keys_select, ',' );
		}

		$sql = str_replace( '%meta_keys_select%', (string) $meta_keys_select, $sql );
		$sql = str_replace( '%meta_keys_from%', (string) $meta_keys_from, $sql );

		$objects = $wpdb->get_results( $sql, OBJECT_K ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
		return $objects;
	}

	/**
	 * Get term children.
	 *
	 * @param stdClass $term Term.
	 *
	 * @return array
	 */
	public static function get_category_ancestors( stdClass $term ): array {

		global $wpdb;
		$ancestors = [];

		$term->term_id = (int) $term->term_id;
		$term->parent  = (int) $term->parent;

		while ( ! empty( $term->parent ) && ! array_key_exists( $term->parent, $ancestors ) ) {

			$sql =
				"SELECT t.term_id, t.name, t.slug, tt.term_taxonomy_id, tt.taxonomy, tt.parent, tt.count
				FROM $wpdb->terms AS t
				INNER JOIN $wpdb->term_taxonomy AS tt ON t.term_id = tt.term_id
				WHERE
					tt.taxonomy IN ('messia_object_category')
					AND t.term_id = $term->parent
				LIMIT 1;";

			$parent_term = $wpdb->get_row( $sql ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

			$parent_term->term_id          = (int) $parent_term->term_id;
			$parent_term->term_taxonomy_id = (int) $parent_term->term_taxonomy_id;
			$parent_term->count            = (int) $parent_term->count;
			$parent_term->parent           = (int) $parent_term->parent;

			$ancestors[ (int) $term->parent ] = $parent_term;

			$term = $parent_term;
		}
		return array_reverse( $ancestors, true );
	}

	/**
	 * Return a chain of all parent terms for deepest term in $terms_slugs of messia_object_category taxonomy.
	 * ATTENTION - it can not be invoked before WP init event when WP does not know
	 * about custom taxonomies yet!!!
	 *
	 * @param array $terms_slugs Slugs of messia_object_category taxonomy.
	 *
	 * @return array|WP_Error
	 */
	public static function get_path_to_deepest_term( array $terms_slugs ) {

		$parents = [];

		if ( empty( $terms_slugs ) ) {
			return $parents;
		}

		global $wpdb;
		$last_term_slug = end( $terms_slugs );

		$term = $wpdb->get_row(
			$wpdb->prepare(
				"SELECT t.term_id, tt.parent
				FROM $wpdb->terms as t INNER JOIN $wpdb->term_taxonomy as tt ON t.term_id = tt.term_id
				WHERE
					taxonomy = 'messia_object_category'
					AND slug IN (%s);",
				$last_term_slug
			)
		);

		if ( false === $term || is_null( $term ) ) {
			// translators: %s - taxonomy term slug.
			return new WP_Error( 'term_not_exist', sprintf( __( 'Termin with slug %s in taxonomy messia_object_category not found', 'messia' ), $last_term_slug ) );
		}
		$parents = self::get_category_ancestors( $term );
		$parents = array_column( $parents, 'slug' );

		reset( $terms_slugs );
		return $parents;
	}
}
