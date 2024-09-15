<?php
/**
 * Messia_Object_Tmpl_Base
 *
 * @package Messia\Modules\Objects\Skins
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Modules\Objects\Skins;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Smartbits\Messia\Includes\Modules\Messia_Module_Base;
use Smartbits\Messia\Includes\Modules\Cpt\Messia_Cpt;
use WP_Post;

/**
 * Base class for all template for object page render.
 *
 * @package Messia\Modules\Objects\Skins
 */
abstract class Messia_Object_Tmpl_Base extends Messia_Module_Base {

	/**
	 * Current blog settings.
	 *
	 * @var array
	 */
	protected array $blog_settings = [];

	/**
	 * Custom post type config
	 *
	 * @var Messia_Cpt
	 */
	protected Messia_Cpt $cpt;

	/**
	 * The terms id of segment terms that object belong to.
	 *
	 * @var array
	 */
	protected array $object_segment_terms;

	/**
	 * The post id.
	 *
	 * @var WP_Post
	 */
	protected WP_Post $object;

	/**
	 * Messia_Object_Tmpl_Base Constructor.
	 */
	protected function __construct() {
		parent::__construct();

		$this->blog_settings = MIA()->get_module_settings()->get_blog_setting( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME );
		$this->object        = get_post();

		$this->object_segment_terms = $this->validate_object_request();

		if ( empty( $this->object_segment_terms ) ) {
			$this->helpers::page404( [ '404-no-segment.php' ] );
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
	 * Required in class WP hooks actions.
	 *
	 * @return void
	 */
	public function init_hooks(): void {
		add_filter( 'messia_post_title', [ $this, 'seo_title' ], 10, 2 );
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue' ] );
	}

	/**
	 * Enqueue page scripts & styles for this page type.
	 *
	 * @return void
	 */
	public function enqueue(): void {
		wp_enqueue_script( 'messia-object' );
		wp_enqueue_style( 'messia-object' );
	}

	/**
	 * Get all terms in taxonomy that object belongs to.
	 *
	 * @param array $objects    WP posts IDs.
	 * @param array $taxonomies Registered taxonomy names.
	 *
	 * @return array
	 */
	protected function get_object_terms( array $objects, array $taxonomies ): array {

		global $wpdb;
		$objects_in = null;

		if ( count( $objects ) > 0 ) {
			$objects    = implode( ',', $objects );
			$objects_in = "IN ({$objects})";
		}

		$taxonomies = "'" . implode( "','", esc_sql( $taxonomies ) ) . "'";

		$sql =
			"SELECT
				t.term_id,
				t.slug,
				t.name,
				tt.term_taxonomy_id,
				tt.taxonomy,
				tt.parent,
				tt.count
			FROM $wpdb->terms AS t
			INNER JOIN $wpdb->term_taxonomy AS tt ON t.term_id = tt.term_id
			INNER JOIN $wpdb->term_relationships AS tr ON tr.term_taxonomy_id = tt.term_taxonomy_id 
			WHERE
				tt.taxonomy IN ($taxonomies)
				AND tr.object_id $objects_in
			ORDER BY t.name ASC;";

		$objects = $wpdb->get_results( $sql ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
		return $objects;
	}

	/**
	 * The object should be shown only if the URL contains correct
	 * segment alias or the alias is not set at all.
	 *
	 * @return array
	 */
	public function validate_object_request(): array {

		$object_segment_terms = $this->get_object_terms( [ $this->object->ID ], [ 'messia_object_segment' ] );

		// The object must belong to at least one taxonomy term Segments.
		if ( count( $object_segment_terms ) === 0 ) {
			return [];
		} else {

			$object_segment_aliases = [];

			$alias = $this->helpers::get_alias_query( false );

			// Visiting by direct URL (without alias) is PERMITTED !!!!!
			if ( false === $alias ) {
				return $object_segment_terms;
			}

			foreach ( $object_segment_terms as $object_segment_term ) {

				$term_alias = $this->helpers::messia_get_term_meta( (int) $object_segment_term->term_id, 'alias' );

				if ( ! empty( $term_alias ) ) {
					$object_segment_aliases[] = $term_alias;
				}
			}
			// If the Segment terms do not have aliases, or do have and the alias in the request is found among them, this is a valid request.
			if ( count( $object_segment_aliases ) === 0 || ( count( $object_segment_aliases ) > 0 && in_array( $alias, $object_segment_aliases, true ) ) ) {
				return $object_segment_terms;
			}

			return false;
		}
		return [];
	}
}
