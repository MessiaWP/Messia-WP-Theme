<?php
/**
 * Messia_Help
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
use WP_Post;
use WP_Comment;
use Exception;
use Smartbits\Messia\Includes\Helpers\Messia_Help_Queries;

/**
 * This class contains static specific methods.
 *
 * @package Messia\Helpers
 */
class Messia_Help extends Messia_Help_Queries {

	/**
	 * The cache of terms by taxonomy and meta fields.
	 *
	 * @var array
	 */
	private static array $get_terms_cache = [];

	/**
	 * The cache of build_tree.
	 *
	 * @var array
	 */
	private static array $build_tree_cache = [];

	/**
	 * The cache of icons.
	 *
	 * @var array
	 */
	private static array $icon_cache = [ 'wp-images', 'icons' ];

	/**
	 * The cache of svg icons.
	 *
	 * @var array
	 */
	private static array $svg_images = [];

	/**
	 * Current settings.
	 *
	 * @var array
	 */
	private static array $blog_settings = [];

	/**
	 * Get namespaced class name.
	 *
	 * @return Messia_Help
	 */
	public static function init(): string {
		self::$blog_settings = MIA()->get_module_settings()->get_blog_setting( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME );
		return __CLASS__;
	}

	/**
	 * Parse string and replace seo nominants with real data.
	 *
	 * @param array  $seo_placeholders Valid theme placeholders.
	 * @param string $seo_template     User string containing some placeholders.
	 *
	 * @return string
	 */
	public static function parse_seo_template( array $seo_placeholders, string $seo_template ): string {

		foreach ( $seo_placeholders as $pattern => $seo_placeholder ) {

			if ( is_array( $seo_placeholder['clb'] ) && is_callable( $seo_placeholder['clb'][0] ) ) {

				$replace_with = call_user_func_array( $seo_placeholder['clb'][0], $seo_placeholder['clb'][1] );
				$seo_template = str_replace( $pattern, $replace_with, $seo_template );
				$seo_template = self::normalise_string( $seo_template );
			}
		}

		return $seo_template;
	}

	/**
	 * Get media file or font icon html for frontend.
	 *
	 * @param array $icons       Json encoded icons data.
	 * @param mixed $size        Args for wp_get_attachment_image() size.
	 * @param bool  $flush_cache Whether to bypass cache.
	 *
	 * @throws Exception On incorrect icon set id or image type.
	 *
	 * @return string
	 */
	public static function get_media_icon_front( array $icons, mixed $size = 'full', bool $flush_cache = false ): string {

		$icons_html = null;

		static $material_css_enqueued = false;

		foreach ( $icons as $icon_data_front ) {

			$hash = md5( wp_json_encode( $icon_data_front ) );

			switch ( $icon_data_front->type ) {
				case 'wp-image':
					if ( empty( self::$icon_cache['wp-images'][ $hash ] ) || ! array_key_exists( $hash, self::$icon_cache['wp-images'] ) || $flush_cache ) {
						self::$icon_cache['wp-images'][ $hash ] = wp_get_attachment_image( $icon_data_front->id, $size, true, [ 'class' => 'icon' ] );
					}
					$icons_html .= self::$icon_cache['wp-images'][ $hash ];
					break;

				case 'icon':
					switch ( $icon_data_front->iconSetId ) {
						case 'google-material':
							if ( empty( self::$icon_cache['icons'][ $hash ] ) || ! array_key_exists( $hash, self::$icon_cache['icons'] ) || $flush_cache ) {
								$font_classes                       = implode( ' ', array_merge( [ 'image' ], $icon_data_front->variant->cssClass ) );
								self::$icon_cache['icons'][ $hash ] = "<span class='{$font_classes}'>{$icon_data_front->icon}</span>";

								if ( false === $material_css_enqueued ) {
									wp_enqueue_style( $icon_data_front->variant->fontId );
									$material_css_enqueued = true;
								}
							}
							$icons_html .= self::$icon_cache['icons'][ $hash ];
							break;

						default:
							trigger_error( "Unknown icon set id: {$icon_data_front->iconSetId}", E_USER_WARNING ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error

					}
					break;

				default:
					trigger_error( "Unknown image type: {$icon_data_front->type}", E_USER_WARNING ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error
			}
		}

		return self::wrap_icon( (string) $icons_html );
	}

	/**
	 * Get media file or font icon html for backend.
	 *
	 * @param array $icons    Array of icons with data.
	 * @param bool  $multiple Allow multiple selection.
	 * @param array $handlers Render Edit, Remove, Link HTML elments.
	 *
	 * @return string
	 */
	public static function get_media_icon_admin( array $icons, bool $multiple, array $handlers = [] ): ?string {

		$images_html  = null;
		$icon_classes = ( $multiple ) ? [ 'icon', 'multiple' ] : [ 'icon' ];

		static $material_css_enqueued = false;

		$handlers = wp_parse_args(
			$handlers,
			[
				'edit'   => '<span class="edit-image"></span>',
				'remove' => '<span class="remove-image"></span>',
				'link'   => '<span class="edit-link"></span>',
			]
		);

		foreach ( $icons as $icon_data_admin ) {

			switch ( $icon_data_admin->type ) {
				case 'wp-image':
					ob_start();
					?>
					<div
						class="<?php echo implode( ' ', $icon_classes ); ?>"
						data-imageinfo='<?php echo wp_json_encode( $icon_data_admin ); ?>'>
						<?php echo ( $handlers['edit'] ) ? $handlers['edit'] : null; ?>
						<?php echo ( $handlers['remove'] ) ? $handlers['remove'] : null; ?>
						<?php echo ( $handlers['link'] ) ? ( ( empty( $icon_data_admin->userLink ) ) ? $handlers['link'] : str_replace( 'edit-link', 'edit-link linked', $handlers['link'] ) ) : null; ?>
						<img
							class='image'
							src="<?php echo wp_get_attachment_url( $icon_data_admin->id ); ?>">
					</div>
					<?php
					$images_html .= ob_get_clean();
					break;

				case 'icon':
					switch ( $icon_data_admin->iconSetId ) {
						case 'google-material':
							$font_classes = implode( ' ', array_merge( [ 'image' ], $icon_data_admin->variant->cssClass ) );

							ob_start();
							?>
							<div
								class="<?php echo implode( ' ', $icon_classes ); ?>"
								data-imageinfo='<?php echo wp_json_encode( $icon_data_admin ); ?>'>
								<?php echo ( $handlers['edit'] ) ? $handlers['edit'] : null; ?>
								<?php echo ( $handlers['remove'] ) ? $handlers['remove'] : null; ?>
								<?php echo ( $handlers['link'] ) ? ( ( empty( $icon_data_admin->userLink ) ) ? $handlers['link'] : str_replace( 'edit-link', 'edit-link linked', $handlers['link'] ) ) : null; ?>
								<span class="<?php echo $font_classes; ?>"><?php echo $icon_data_admin->icon; ?></span>
							</div>
							<?php
							$images_html .= ob_get_clean();

							if ( false === $material_css_enqueued ) {
								wp_enqueue_style( $icon_data_admin->variant->fontId );
								$material_css_enqueued = true;
							}
							break;

						default:
							trigger_error( "Unknown icon set id: {$icon_data_admin->iconSetId}", E_USER_WARNING ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error
					}
					break;

				case 'placeholder-image':
					$images_html = '<div class="icon"><span class="edit-image"></span><span class="placeholder-image"></span></div>';
					break;

				default:
					trigger_error( "Unknown image type: {$icon_data_admin->type}", E_USER_WARNING ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error
			}
		}

		return $images_html;
	}

	/**
	 * Get theme internal svg images.
	 *
	 * @param bool $flush_cache Whether to bypass cache.
	 *
	 * @return stdClass
	 */
	public static function get_theme_svg_icons( bool $flush_cache = false ): stdClass {

		if ( empty( self::$svg_images ) || $flush_cache ) {

			$directory = MESSIA_CORE_ABSPATH . '/assets/images/svg';
			$images    = glob( "{$directory}/*.svg" );

			foreach ( $images as $image ) {

				$info = pathinfo( $image );
				$name = str_replace( '-', '_', $info['filename'] );

				self::$svg_images[ $name ] = (object) [
					'icon' => self::wrap_icon( file_get_contents( $image ) ), // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
					'url'  => MESSIA_THEME_URL . "/includes/assets/images/svg/{$info['basename']}",
				];
			}
		}
		return (object) self::$svg_images;
	}

	/**
	 * Wrap content into icon HTML structure.
	 *
	 * @param string $content Any content.
	 *
	 * @return string
	 */
	private static function wrap_icon( string $content ): string {
		return "<i class='messia-icon'>{$content}</i>";
	}

	/**
	 * Get non-empty taxonomy terms (reffering to 1 and more objects) for other taxonomy.
	 *
	 * @param string $taxonomy          Registered taxonomy name.
	 * @param string $segment_term_slug Slug of segment taxonomy term.
	 * @param array  $meta_keys         Meta key which value should be included in result.
	 *
	 * @return array
	 */
	public static function get_terms_for_segment( string $taxonomy, string $segment_term_slug, array $meta_keys = [] ): array {

		if ( ! isset( self::$get_terms_cache[ $taxonomy ] ) ) {

			self::$get_terms_cache[ $taxonomy ] = [
				'meta_keys' => [],
				'terms'     => [],
			];
		} else {

			$cached_meta_keys = self::$get_terms_cache[ $taxonomy ]['meta_keys'];
			if ( count( array_intersect( $cached_meta_keys, $meta_keys ) ) >= count( $meta_keys ) ) {
				return self::$get_terms_cache[ $taxonomy ]['terms'];
			}
		}

		global $wpdb;

		$custom_taxonomies_config = MIA()->get_module_cpt_config()->get_custom_taxonomies_config();

		$args = [
			'hierarchical' => $custom_taxonomies_config[ $taxonomy ]['args']['hierarchical'],
			'hide_empty'   => self::$blog_settings[ "{$taxonomy}_empty_terms_to_filter" ],
		];

		$meta_keys_from   = null;
		$meta_keys_select = null;

		$segment_term_id = (int) $wpdb->get_var(
			$wpdb->prepare(
				"SELECT term_id
				FROM $wpdb->terms
				WHERE slug = %s",
				$segment_term_slug
			)
		);

		$sql =
			"SELECT
				t.name,
				t.slug,
				tt.taxonomy,
				tt.count,
				tt.term_id,
				tt.term_taxonomy_id,
				tt.parent,
				t.term_order
			%meta_keys_select%
			FROM $wpdb->terms AS t
				INNER JOIN $wpdb->term_taxonomy AS tt ON t.term_id = tt.term_id
				LEFT JOIN $wpdb->term_relationships AS tr ON tr.term_taxonomy_id = tt.term_taxonomy_id
				%meta_keys_from%
			WHERE
				tt.taxonomy IN ('$taxonomy')
				AND (
						tr.object_id IN (
							SELECT
								posts.ID
							FROM
								$wpdb->posts as posts
							INNER JOIN $wpdb->term_relationships ON posts.ID = $wpdb->term_relationships.object_id
								AND $wpdb->term_relationships.term_taxonomy_id IN ( $segment_term_id )
								AND posts.post_type = 'messia_object'
							GROUP BY posts.ID
						)
						%null_terms_condition%
					)
			GROUP BY t.slug
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
		if ( 1 === $args['hide_empty'] && false === $args['hierarchical'] ) {
			$null_terms_condition = null;
		} else {
			// Terms should be included into parent terms too.
			$null_terms_condition = ' OR ( tr.object_id IS NULL )';
		}

		$sql = str_replace( '%null_terms_condition%', (string) $null_terms_condition, $sql );
		$sql = str_replace( '%meta_keys_select%', (string) $meta_keys_select, $sql );
		$sql = str_replace( '%meta_keys_from%', (string) $meta_keys_from, $sql );

		$terms = $wpdb->get_results( $sql, ARRAY_A ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

		// Empty terms should be returned if their descendants are not empty.
		if ( $args['hierarchical'] && $args['hide_empty'] && is_array( $terms ) ) {
			foreach ( $terms as $k => $term ) {
				if ( ! $term['count'] ) {
					$children = get_term_children( $term['term_id'], $term['taxonomy'] );
					if ( is_array( $children ) ) {
						foreach ( $children as $child_id ) {
							$child = get_term( $child_id, $term['taxonomy'] );
							if ( $child->count ) {
								continue 2;
							}
						}
					}

					// Definetely empty.
					unset( $terms[ $k ] );
				}
			}
		}
		self::$get_terms_cache[ $taxonomy ]['meta_keys'] = array_merge( self::$get_terms_cache[ $taxonomy ]['meta_keys'], $meta_keys );
		self::$get_terms_cache[ $taxonomy ]['terms']     = $terms;

		return self::$get_terms_cache[ $taxonomy ]['terms'];
	}

	/**
	 * Get group that property term belongs to.
	 *
	 * @return array
	 */
	public static function get_property_groups(): array {

		$return = [
			-1 => __( 'Outside a group', 'messia' ),
		];

		$property_groups = json_decode( self::$blog_settings['property_groups'], true );

		if ( empty( $property_groups ) ) {
			return $return;
		}

		return $return + $property_groups;
	}

	/**
	 * Wrapper for self::build_terms_tree. Uses cache.
	 * Build a structured tree array based on the result of WP get_term()
	 * The result is a tree of taxonomy terms, taking into account their hierarchy, where each element
	 * at any level [term_id => term data]
	 *
	 * @param array $elements WP Term.
	 *
	 * @return array
	 */
	public static function get_terms_tree( array $elements ): array {

		$hash = crc32( wp_json_encode( $elements ) );

		if ( isset( self::$build_tree_cache[ $hash ] ) ) {
			return self::$build_tree_cache[ $hash ];
		}

		self::$build_tree_cache[ $hash ] = self::build_terms_tree( $elements );
		return self::$build_tree_cache[ $hash ];
	}

	/**
	 * Build a structured tree array based on the result of WP get_term()
	 * The result is a tree of taxonomy terms, taking into account their hierarchy, where each element
	 * at any level [term_id => term data]
	 *
	 * @param array  $elements  WP Term.
	 * @param string $parent_id ID of parent term.
	 *
	 * @return array
	 */
	private static function build_terms_tree( array $elements, string $parent_id = '0' ) {

		$tree = [];

		foreach ( $elements as $element ) {

			$element = (array) $element;

			if ( $parent_id === $element['parent'] ) {

				$children = self::build_terms_tree( $elements, $element['term_id'] );

				if ( $children ) {
					$element['children'] = $children;
				}
				$tree[ $element['term_id'] ] = $element;
			}
		}
		return $tree;
	}

	/**
	 * Rebuilds a tree-like array of terms to flat so that the parent is in the first place in each index followed by descendants.
	 * Steps over the node. Not used now. Works with $ wpdb->get_results($sql) - an array of objects;
	 * Has NO cache.
	 *
	 * @param array    $taxonomy_terms_tree Hierarchical by term ID array of terms.
	 * @param stdClass $parent_term         ID of parent term.
	 * @param array    $level               Stuff data, do not pass here anything.
	 *
	 * @return array
	 * @nonused
	 */
	public static function walk_terms_tree_for_filters_multitree( array $taxonomy_terms_tree, ?stdClass $parent_term = null, array $level = [] ): array {

		foreach ( $taxonomy_terms_tree as $term ) {

			$level_data = [];
			$_term      = clone $term;

			if ( isset( $_term->children ) ) {
				unset( $_term->children );
			}

			( $parent_term ) ? $level_data[ $parent_term->slug ][] = $_term : $level_data[ $term->parent ][] = $_term;

			if ( isset( $term->children ) ) {

				foreach ( $term->children as $child_term ) {

					$_child_term = clone $child_term;

					if ( isset( $_child_term->children ) ) {
						unset( $_child_term->children );
					}

					( $parent_term ) ? $level_data[ $parent_term->slug ][] = $_child_term : $level_data[ $term->parent ][] = $_child_term;
				}
			}

			// Build level.
			$level[] = $level_data;

			// Step into level.
			if ( isset( $term->children ) ) {

				foreach ( $term->children as $child_term ) {

					if ( isset( $child_term->children ) ) {
						$level = self::walk_terms_tree_for_filters_multitree( $child_term->children, $child_term, $level );
					}
				}
			}
		}

		return $level;
	}

	/**
	 * Rebuilds a tree-like array of terms to flat so that the parent
	 * is in the first place in each index followed by descendants.
	 *
	 * @param array $taxonomy_terms_tree Hierarchical by term ID array of terms.
	 * @param array $global_terms_order  Order of terms as they stored in DB.
	 * @param array $parent_term         ID of parent term.
	 * @param array $level               Stuff data, do not pass here anything.
	 *
	 * @return array
	 */
	public static function walk_terms_tree_for_filters( array $taxonomy_terms_tree, array &$global_terms_order, ?array $parent_term = null, array $level = [] ): array {

		foreach ( $taxonomy_terms_tree as $term ) {

			$level_data = [];
			$_term      = $term;

			$_term['order'] = count( $global_terms_order ) + 1;

			if ( isset( $_term['children'] ) ) {
				unset( $_term['children'] );
			}
			if ( $parent_term && 1 === (int) $parent_term['branch_as_filter'] ) {
				$_term['inherited_branch_as_filter'] = '1';
			}

			$global_terms_order[ $_term['term_id'] ] = $_term['slug'];

			( $parent_term ) ? $level_data[ $parent_term['slug'] ][] = $_term : $level_data[ $term['parent'] ][] = $_term;

			if ( isset( $term['children'] ) ) {

				foreach ( $term['children'] as $child_term ) {

					$_child_term          = $child_term;
					$_child_term['order'] = count( $global_terms_order ) + 1;

					if ( isset( $_child_term['children'] ) ) {
						unset( $_child_term['children'] );
					}

					$global_terms_order[ $_child_term['term_id'] ]           = $_child_term['slug'];
					( $parent_term ) ? $level_data[ $parent_term['slug'] ][] = $_child_term : $level_data[ $term['parent'] ][] = $_child_term;
				}
			}

			// Build level.
			$level[] = $level_data;

			// Step into level.
			if ( isset( $term['children'] ) ) {

				foreach ( $term['children'] as $child_term ) {

					if ( isset( $child_term['children'] ) ) {

						if ( 1 === (int) $child_term['branch_as_filter'] ) {
							$level = self::walk_terms_tree_for_filters( $child_term['children'], $global_terms_order, $child_term, $level );
						} else {
							$level = self::walk_terms_tree_for_filters( [ $child_term['term_id'] => $child_term ], $global_terms_order, $child_term, $level );
						}
					}
				}
			}
		}

		return $level;
	}

	/**
	 * Try to find any registering script in child
	 * theme first if it is beeing active and asset has key "shared" - true.
	 * Then Resolves relative path to assets.
	 * Otherwise assums that script exists in parent theme
	 * and return URL to it.
	 *
	 * @param array $asset Asset unit data.
	 *
	 * @return void
	 */
	public static function resolve_assets_path( array &$asset ): void {

		$errors = [];

		$parent_shared_path = MESSIA_CORE_ABSPATH . $asset['src'];
		$child_shared_path  = MESSIA_CORE_ABSPATH_CHILD . $asset['src'];

		if ( is_child_theme() && true === $asset['shared'] ) {

			if ( file_exists( $child_shared_path ) ) {
				$actual_shared_url = MESSIA_THEME_URL_CHILD . MESSIA_CODEPATH_PREFIX_CHILD . $asset['src'];
			} else {

				$actual_shared_url = MESSIA_THEME_URL . MESSIA_CODEPATH_PREFIX_CHILD . $asset['src'];

				if ( ! file_exists( $parent_shared_path ) && ! file_exists( $child_shared_path ) ) {
					// translators: %s - URL to file.
					$errors[] = sprintf( __( 'Asset %s does not exists in both parent and child themes assets.', 'messia' ), $asset['src'] );
				}
			}
		} else {

			$actual_shared_url = MESSIA_THEME_URL . MESSIA_CODEPATH_PREFIX . $asset['src'];

			if ( ! file_exists( $parent_shared_path ) ) {
				// translators: %s - URL to file.
				$errors[] = sprintf( __( 'Asset %s does not exists in parent theme assets.', 'messia' ), $asset['src'] );
			}
		}

		echo self::print_errors( 'Assets loading error', $errors ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

		$asset['src'] = $actual_shared_url;
	}

	/**
	 * Build Seo string from array of parsed data.
	 *
	 * @param array $patterns Parsed SEO parts.
	 *
	 * @return string
	 */
	public static function build_seo( array $patterns ): string {
		$string = implode( ' ', $patterns );
		$string = trim( $string, " \t." );

		return $string;
	}

	/**
	 * Detect deepest segment term in request and return seo meta data for it.
	 *
	 * @return array
	 */
	public static function get_segment_seo_for_request(): array {

		global $wpdb;

		$seo = [
			'segment_seo_1' => [],
			'segment_seo_2' => [],
		];

		$parsed_url          = self::parse_listing_query();
		$segment_terms_query = $parsed_url->segment_term;

		if ( $segment_terms_query ) {

			$segment_slugs = "'" . esc_sql( $segment_terms_query ) . "'";

			// ID of terms by slugs.
			$sql =
				"SELECT $wpdb->terms.term_id
				FROM $wpdb->terms INNER JOIN $wpdb->term_taxonomy ON $wpdb->terms.term_id = $wpdb->term_taxonomy.term_id
				WHERE
					taxonomy = 'messia_object_segment'
					AND slug IN($segment_slugs);";

			$segment_ids = $wpdb->get_results( $sql, OBJECT_K ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

			if ( $segment_ids ) {

				$segment_ids = implode( ',', array_keys( $segment_ids ) );

				$sql =
					"SELECT t.slug, tt.term_id, tt.parent, meta_key, meta_value
					FROM $wpdb->term_taxonomy as tt
						INNER JOIN $wpdb->termmeta as tm ON tt.term_id = tm.term_id
						INNER JOIN $wpdb->terms as t ON tt.term_id = t.term_id
					WHERE
						tt.term_id IN($segment_ids)
						AND tm.meta_key IN('seo_01', 'seo_02')
						AND tm.meta_value IS NOT NULL
						AND tm.meta_value <> ''
					ORDER BY term_id DESC;";

				$segment_terms = $wpdb->get_results( $sql ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

				foreach ( $segment_terms as $segment_term ) {
					if ( 'seo_01' === $segment_term->meta_key ) {
						$seo['segment_seo_1'][] = $segment_term->meta_value;
					}
					if ( 'seo_02' === $segment_term->meta_key ) {
						$seo['segment_seo_2'][] = $segment_term->meta_value;
					}
				}
			}
		}
		return $seo;
	}

	/**
	 * Detect deepest category term in request and return seo meta data for it.
	 *
	 * @return array
	 */
	public static function get_category_seo_for_request(): array {

		global $wpdb;

		$seo = [
			'category_seo_1' => [],
			'category_seo_2' => [],
		];

		$parsed_url           = self::parse_listing_query();
		$category_terms_query = $parsed_url->category_terms;

		$root_ids     = self::get_root_terms( 'messia_object_category' );
		$category_ids = $root_ids;

		// Get terms by it's slugs.
		if ( $category_terms_query ) {
			$category_slugs = "'" . implode( "','", esc_sql( $category_terms_query ) ) . "'";

			// ID of terms by slugs.
			$sql =
				"SELECT $wpdb->terms.term_id
				FROM $wpdb->terms INNER JOIN $wpdb->term_taxonomy ON $wpdb->terms.term_id = $wpdb->term_taxonomy.term_id
				WHERE
					taxonomy = 'messia_object_category'
					AND slug IN($category_slugs)
				ORDER BY term_id DESC;";

			$category_ids = $wpdb->get_results( $sql, OBJECT_K ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
			$category_ids = $root_ids + $category_ids;
		}

		// Get terms SEO meta.
		if ( $category_ids ) {

			$hierarchy = get_option( 'messia_object_category_children' );

			if ( ! is_array( $hierarchy ) ) {

				$hierarchy = [];
				$terms     = get_terms(
					[
						'taxonomy'               => 'messia_object_category',
						'get'                    => 'all',
						'orderby'                => 'id',
						'fields'                 => 'id=>parent',
						'update_term_meta_cache' => false,
					]
				);
				foreach ( $terms as $term_id => $parent ) {
					if ( $parent > 0 ) {
						$hierarchy[ $parent ][] = $term_id;
					}
				}
				update_option( 'messia_object_category_children', $hierarchy );
			}

			$category_ids = implode( ',', array_keys( $category_ids ) );

			// Find SEO terms.
			$sql =
				"SELECT t.slug, tt.term_id, tt.parent, meta_key, meta_value
				FROM $wpdb->term_taxonomy as tt
					INNER JOIN $wpdb->termmeta as tm ON tt.term_id = tm.term_id
					INNER JOIN $wpdb->terms as t ON tt.term_id = t.term_id
				WHERE
					tt.term_id IN($category_ids)
					AND tm.meta_key IN('seo_01', 'seo_02')
					AND tm.meta_value IS NOT NULL
					AND tm.meta_value <> ''
				ORDER BY term_id DESC;";

			$category_terms = $wpdb->get_results( $sql, OBJECT_K ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

			// Found terms must be sorted in the same order as admin shows.
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
				ORDER BY t.name ASC;"; // order by name!!!!.

			$all_terms       = $wpdb->get_results( $sql, OBJECT_K ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
			$hierarchy_terms = self::get_hierarchy( $all_terms, $hierarchy );
			$ordered_terms   = array_intersect_key( $hierarchy_terms, $category_terms );
			$category_terms  = array_merge( $ordered_terms, $category_terms );

			foreach ( $category_terms as $category_term ) {
				if ( 'seo_01' === $category_term->meta_key ) {
					$seo['category_seo_1'][] = $category_term->meta_value;
				}
				if ( 'seo_02' === $category_term->meta_key ) {
					$seo['category_seo_2'][] = $category_term->meta_value;
				}
			}
		}

		return $seo;
	}

	/**
	 * Reorder terms as htem shows in WP Admin.
	 *
	 * @param array $terms     All DB terms ordered by name.
	 * @param array $children  Storred in DB terms hierarchy.
	 * @param array $hierarchy Reordering result.
	 * @param int   $parent    Parent terms.
	 *
	 * @return array
	 */
	private static function get_hierarchy( array $terms, array $children, array &$hierarchy = [], int $parent = 0 ) {

		foreach ( $terms as $key => $term ) {

			if ( (int) $term->parent !== $parent ) {
				continue;
			}

			$hierarchy[ $term->slug ] = $term;

			if ( isset( $children[ $term->term_id ] ) ) {
				self::get_hierarchy( $terms, $children, $hierarchy, (int) $term->term_id );
			}
		}
		return $hierarchy;
	}

	/**
	 * Normalise string. Replace two and more spaces with one.
	 *
	 * @param string $string Any string to operate with.
	 *
	 * @return string
	 */
	public static function normalise_string( string $string ): string {

		$string = preg_replace( '/,\s+,/im', ',', $string );  // "Word.     , word" -> "Word, word".
		$string = preg_replace( '/,\s+\./im', '.', $string ); // "Word.     ." -> "Word.".
		return $string;
	}

	/**
	 * Get user google captcha credentials.
	 *
	 * @return mixed
	 */
	public static function captcha_v3_data() {

		$gkey_html = self::$blog_settings['google_captcha_v3_public_key'];
		$gkey_secr = self::$blog_settings['google_captcha_v3_secret_key'];

		if ( $gkey_html && $gkey_secr ) {
			return [
				'gkey_html' => $gkey_html,
				'gkey_secr' => $gkey_secr,
			];
		}

		return false;
	}

	/**
	 * Calculate messia object rating data.
	 *
	 * @param int $object_id ID of messia post object.
	 *
	 * @return float|bool
	 */
	private static function get_object_rating_data( int $object_id ) {

		$post_type = get_post_type( $object_id );

		if ( 1 === self::$blog_settings['substitute_rating_by_site_rating'] && 'messia_object' === $post_type ) {

			$rating        = [];
			$post_segments = self::get_post_terms( [ $object_id ], [ 'messia_object_segment' ] );

			foreach ( $post_segments as $post_segment ) {

				$rating[ $post_segment->term_id ] = false;

				$rating_key         = str_replace( '%Id%', $post_segment->term_id, MESSIA_SITERATING_NAME );
				$rating_in_sergment = get_post_meta( $object_id, $rating_key, true );

				if ( ! empty( $rating_in_sergment ) ) {
					$rating[ $post_segment->term_id ] = (float) $rating_in_sergment;
				}
			}

			/*
			 * TODO - the object can be in several segments, now returns the rating of the first segment in the array.
			 * You can pass the current segment to the rating snippet output function, but this function is also called from the callback
			 * for the form of comments and their list on the object page.
			 */
			return $rating[ key( $rating ) ];

		} else {

			global $wpdb;

			$sql =
				"SELECT SUM($wpdb->commentmeta.meta_value) as object_rating_summ, COUNT($wpdb->comments.comment_ID) as object_comments_count
				FROM $wpdb->comments
				INNER JOIN $wpdb->commentmeta ON ( $wpdb->comments.comment_ID = $wpdb->commentmeta.comment_id )
				WHERE
					comment_type = 'comment'
					AND comment_approved = 1
					AND comment_post_ID = $object_id
					AND $wpdb->commentmeta.meta_key = 'messia_rating'
					AND $wpdb->commentmeta.meta_value IS NOT NULL
				ORDER BY $wpdb->comments.comment_date_gmt DESC;";

			$r = $wpdb->get_results( $sql ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

			if ( 0 === (int) $r[0]->object_comments_count ) {
				return false;
			} else {
				return $r[0]->object_rating_summ / $r[0]->object_comments_count;
			}
		}
	}

	/**
	 * Get rating value.
	 *
	 * @param int $object_id ID of post.
	 *
	 * @return float|bool
	 */
	private static function get_comment_rating_data( int $object_id ) {

		$r = get_comment_meta( $object_id, 'messia_rating', true );

		if ( '' === $r ) {
			return false;
		} else {
			return (float) $r;
		}
	}

	/**
	 * Parse dynamic placeholders and convr it to actual value.
	 *
	 * @param string $text Any string to parse.
	 *
	 * @return string
	 */
	public static function parse_placeholders( string $text ): string {
		$rules = [
			'#object_title#' => get_the_title(),
			'#object_url#'   => get_the_permalink(),
		];

		$search  = array_keys( $rules );
		$replace = array_values( $rules );

		return str_replace( $search, $replace, $text );
	}

	/**
	 * Delete all meta entries for stuff metabox, except defined.
	 *
	 * @param array $keep_meta Meta keys to not to delete.
	 *
	 * @return void
	 */
	public static function clean_stuff_meta( array $keep_meta ) {
		/*
		 * Removes meta fields that are no longer in
		 * configuration array stuff of object fields
		 */
		global $wpdb;

		$delete_key = str_replace( [ '%name%', '%Id%' ], [ '%', '%' ], MESSIA_POSTMETA_STUFF_NAME );
		$keep_meta  = implode( ',', array_map( 'intval', $keep_meta ) );

		$sql =
			"DELETE
			FROM $wpdb->postmeta
			WHERE
				meta_key LIKE '$delete_key'
				AND meta_key NOT IN ($keep_meta);";

		$wpdb->query( $sql ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
	}

	/**
	 * Recalcucate site rating value per object.
	 *
	 * @param array $metas Rating meta data.
	 *
	 * @return array
	 */
	public static function adjust_object_site_criteria( array $metas ): array {

		$meta_ids    = [];
		$rating_base = str_replace( '%Id%', '', MESSIA_SITERATING_NAME );

		foreach ( $metas as $meta ) {

			$meta_ids[]     = $meta->meta_id;
			$criteria_value = get_post_meta( $meta->post_id, '_messia_site_rating_criteria', true );

			$segment_term = (int) str_replace( $rating_base, '', $meta->meta_key );
			unset( $criteria_value[ $segment_term ] );

			update_post_meta( $meta->post_id, '_messia_site_rating_criteria', $criteria_value );
		}

		return $meta_ids;
	}

	/**
	 * Comment snippet in comment list. Wrapper for self::get_rating_snippet().
	 *
	 * @param int|object $comment Comment data.
	 * @param array      $args    Function wp_list_comments() args.
	 * @param bool       $new     For new comment or existing one.
	 * @param bool       $echo    Return or output result.
	 *
	 * @return string HTML code.
	 */
	public static function get_comment_rating_snippet( $comment, array $args, bool $new, bool $echo = false ): ?string {

		if ( is_int( $comment ) ) {
			$comment = get_comment( $comment );
		}

		$rating = self::get_comment_rating_data( (int) $comment->comment_ID );

		if ( $args['modules']['date'] ) {

			add_filter( 'get_comment_date', [ __CLASS__, 'get_comment_date' ], 10, 3 );
			add_filter( 'get_comment_time', [ __CLASS__, 'get_comment_time' ], 10, 5 );

			$args['modules']['date'] = [
				'date' => get_comment_date( get_option( 'date_format' ) ),
				'time' => get_comment_time( get_option( 'time_format' ) ),
			];
		}

		if ( $echo ) {
			echo self::get_rating_snippet( (int) $comment->comment_ID, $rating, $args['modules'], $new );
			return null;
		} else {
			return self::get_rating_snippet( (int) $comment->comment_ID, $rating, $args['modules'], $new );
		}
	}

	/**
	 * Callback for WP get_comment_time hook.
	 *
	 * @param string|int $date    Formatted date string or Unix timestamp.
	 * @param string     $format  PHP date format.
	 * @param WP_Comment $comment The comment object.
	 *
	 * @return string Date
	 */
	public static function get_comment_date( $date, string $format, WP_Comment $comment ): ?string {

		$comment_date      = $comment->comment_date;
		$comment_date_time = date_create( $comment_date, wp_timezone() );
		$current_date_time = date_create( 'now', wp_timezone() );

		$interval = $current_date_time->diff( $comment_date_time );

		if ( 0 === $interval->d ) {
			$date = null;
		} elseif ( 0 === $interval->y ) {
			$date = $comment_date_time->format( self::$blog_settings['comment_current_year_date_format'] );
		}

		return $date;
	}

	/**
	 * Callback for WP get_comment_time hook.
	 *
	 * @param string|int $time      The comment time, formatted as a date string or Unix timestamp.
	 * @param string     $format    PHP date format.
	 * @param bool       $gmt       Whether the GMT date is in use.
	 * @param bool       $translate Whether the time is translated.
	 * @param WP_Comment $comment   The comment object.
	 *
	 * @return string Time
	 */
	public static function get_comment_time( $time, string $format, bool $gmt, bool $translate, WP_Comment $comment ): ?string {

		$comment_date      = $gmt ? $comment->comment_date_gmt : $comment->comment_date;
		$comment_date_time = date_create( $comment_date, wp_timezone() );
		$current_date_time = date_create( 'now', wp_timezone() );

		$interval = $current_date_time->diff( $comment_date_time );

		if ( $interval->d > 0 ) {
			$time = null;
		}

		return $time;
	}

	/**
	 * Comment snippet in object card. Wrapper for self::get_rating_snippet().
	 *
	 * @param int|WP_Post $object  Object.
	 * @param array       $modules What to include: stars, date etc..
	 * @param bool        $new     For new comment or existing one.
	 * @param mixed       $echo    Return or output result.
	 *
	 * @return string HTML code.
	 */
	public static function get_object_rating_snippet( $object, array $modules, bool $new, $echo = false ) {

		if ( is_int( $object ) ) {
			$object = get_post( $object );
		}

		$rating = self::get_object_rating_data( $object->ID );

		if ( $echo ) {
			echo self::get_rating_snippet( $object->ID, $rating, $modules, $new );
		} else {
			return self::get_rating_snippet( $object->ID, $rating, $modules, $new );
		}
	}

	/**
	 * Generate HTML content of comment.
	 *
	 * @param int        $object_id ID of post.
	 * @param float|bool $rating    Value of rating.
	 * @param array      $modules   What to include: stars, date etc..
	 * @param bool       $new       For new comment or existing one.
	 *
	 * @return string
	 */
	private static function get_rating_snippet( int $object_id, $rating, array $modules, bool $new = false ): string {

		if ( ! in_array( true, $modules, true ) ) {
			return __( 'Reviews snippet cannot be displayed indicating to disable all its modules.', 'messia' );
		}

		$stars_html       = null;
		$date_html        = null;
		$av_point_html    = null;
		$av_point_of_html = null;
		$reviews_html     = null;
		$stars_classes    = 'stars position-relative d-inline-block';
		$svgs             = self::get_theme_svg_icons();

		if ( false === $rating && false === $new ) {

			ob_start();
			?>
			<div class="not-rated ">
				<span class="text"><?php esc_html_e( 'Unrated', 'messia' ); ?></span>
			</div>
			<?php

			return ob_get_clean();
		}

		if ( $new ) {

			$rating        = (float) 0.00;
			$stars_classes = 'stars editable position-relative d-inline-block me-2';
		}

		if ( $modules['stars'] ) {
			$width      = $rating * 20;
			$stars_html = "<div class='{$stars_classes}'>
							<svg width='100' height='20'>
								<use href='{$svgs->stars->url}#star-outline'/>
							</svg>
							<span class='bg-active overflow-hidden d-block position-absolute top-0 start-0' style='width: {$width}%;'>
								<svg width='100'  height='20'>
								<use href='{$svgs->stars->url}#star-solid'/></svg>
							</span>
						</div>";

		}
		if ( $modules['date'] ) {
			$time = '';
			$date = '';
			if ( $modules['date']['time'] ) {
				$time = "<span class='time'>{$modules['date']['time']}</span>";
			}
			if ( $modules['date']['date'] ) {
				$date = "<span class='date'>{$modules['date']['date']}</span>";
			}
			$date_html = "{$time}{$date}";
		}
		if ( $modules['av_point'] ) {
			$points        = number_format( $rating, 1 );
			$av_point_html = "<span class='rating-value d-inline-block me-2'><span class='points'>{$points}</span></span>";
		}
		if ( $modules['av_point_of'] ) {

			$points           = number_format( $rating, 1 );
			$av_point_of_html = "<span class='rating-value'><span class='points'>{$points}</span> of <span class='of'>5</span></span>";

		}
		if ( $modules['reviews'] ) {

			$num             = get_comments_number( $object_id );
			$text            = _n( 'review', 'reviews', $num, 'messia' );
			$object_page_url = get_the_permalink( $object_id );
			$reviews_html    = "<span class='rating-count'><a href='{$object_page_url}' itemprop='ratingCount' class='td-none'>({$num} {$text})</a></span>";
		}

		ob_start();
		?>
		<div class="rating d-flex align-items-center flex-wrap" itemprop="aggregateRating" itemscope="" itemtype="http://schema.org/AggregateRating">
			<meta itemprop="bestRating" content="5">
			<meta itemprop="ratingValue" content="<?php echo number_format( $rating, 2 ); ?>">
			<?php echo $stars_html; ?>
			<?php echo $date_html; ?>
			<?php echo $av_point_html; ?>
			<?php echo $av_point_of_html; ?>
			<?php echo $reviews_html; ?>
		</div>
		<?php

		return ob_get_clean();
	}

	/**
	 * Callback for WP wp_list_comments().
	 *
	 * @param WP_Comment|stdClass $comment Comment itself.
	 * @param array               $args    Function wp_list_comments() args.
	 * @param int                 $depth   Comment depth.
	 *
	 * @return void
	 */
	public static function shape_comment( object $comment, array $args, int $depth ): void {
		/*
		 * Closing tag <.div> should not be putted here - WP will add it
		 * on it's own according to parameter 'style' of wp_list_comments().
		 */
		switch ( $comment->comment_type ) {
			case 'pingback':
			case 'trackback':
				?>
				<div class="item comment post pingback">
					<p>
					<?php
						esc_html_e( 'Pingback:', 'messia' );
						comment_author( $comment->comment_ID );
						edit_comment_link( __( '(Edit)', 'messia' ) );
					?>
					</p>
					<?php
				break;
			default:
				?>
				<div class="comment" id="comment-<?php echo $comment->comment_ID; ?>">
					<div class="comment-inner d-flex flex-column py-3">
						<div class="text flex-grow-1">
							<?php comment_text( $comment->comment_ID ); ?>
						</div>
						<div class="name d-flex mb-2">
							<div class="avatar me-3 overflow-hidden flex-shrink-0">
								<?php echo get_avatar( $comment, 75 ); ?>
							</div>
							<div class="name-right ">
								<b class="me-3"><?php comment_author( $comment->comment_ID ); ?></b>
								<div class="sub-name fs-6">
									<?php do_action( 'messia_before_comment_details', $comment ); ?>
								</div>
								<?php
								if ( 0 === (int) $comment->comment_approved ) {
									?>
									<p><?php esc_html_e( 'Your comment is awaiting moderation.', 'messia' ); ?></p>
									<?php
								}
								self::get_comment_rating_snippet( $comment, $args, false, true )
								?>
							</div>
						</div>

						<div class="links-container">
						<?php
							comment_reply_link(
								array_merge(
									$args,
									[
										'depth'     => $depth,
										'max_depth' => $args['max_depth'],
									]
								)
							);
						?>
						<?php edit_comment_link( __( '(Edit)', 'messia' ) ); ?>
						</div>
				</div>
				<?php
		}
	}

	/**
	 * Filters the CSS classes applied to a menu item's list item element.
	 *
	 * @param string[] $classes Array of the CSS classes that are applied to the menu item's `<li>` element.
	 * @param WP_Post  $item    The current menu item.
	 * @param stdClass $args    An object of wp_nav_menu() arguments.
	 * @param int      $depth   Depth of menu item. Used for padding.
	 *
	 * @return array
	 */
	public static function navmenu_css_filter( array $classes, WP_Post $item, stdClass $args, int $depth ): array {

		if ( in_array( 'menu-item-has-children', $classes, true ) ) {
			add_filter( 'walker_nav_menu_start_el', [ __CLASS__, 'navmenu_el_filter' ], 10, 4 );
		} else {
			remove_filter( 'walker_nav_menu_start_el', [ __CLASS__, 'navmenu_el_filter' ], 10 );
		}
		return $classes;
	}

	/**
	 * Filters the content of nav menu.
	 *
	 * @param string   $items The HTML list content for the menu items.
	 * @param stdClass $args  An object containing wp_nav_menu() arguments.
	 *
	 * @return string
	 */
	public static function navmenu_li_filter( string $items, stdClass $args ): string {

		$header_right_active = is_active_sidebar( 'widget-area-header-right' );

		if ( ! $header_right_active ) {
			return $items;
		}

		ob_start();
		?>
		<li class="ps-2"><div class="d-md-block d-none"><?php dynamic_sidebar( 'widget-area-header-right' ); ?></div></li>
		<?php
		$items .= ob_get_clean();

		return $items;
	}

	/**
	 * Filters a menu item's starting output.
	 *
	 * The menu item's starting output only includes `$args->before`, the opening `<a>`,
	 * the menu item's title, the closing `</a>`, and `$args->after`. Currently, there is
	 * no filter for modifying the opening and closing `<li>` for a menu item.
	 *
	 * @param string   $item_output The menu item's starting HTML output.
	 * @param WP_Post  $item        Menu item data object.
	 * @param int      $depth       Depth of menu item. Used for padding.
	 * @param stdClass $args        An object of wp_nav_menu() arguments.
	 *
	 * @return string
	 */
	public static function navmenu_el_filter( string $item_output, WP_Post $item, int $depth, stdClass $args ): string {

		$item_output .= '<span class="menu-item-expand-collapse"></span>';
		return $item_output;
	}

	/**
	 * Create structured HTML content of errors.
	 *
	 * @param string $title       Error block title.
	 * @param array  $errors      Messages to show.
	 * @param string $comments    Text to show below messages.
	 * @param bool   $echo        Return or output result.
	 * @param array  $css_classes List of values.
	 * @param bool   $force       Force print.
	 *
	 * @return string
	 */
	public static function print_errors( string $title, array $errors, ?string $comments = null, bool $echo = false, array $css_classes = [], bool $force = false ): ?string {

		if ( empty( $errors ) ) {
			return null;
		}

		if ( false === $force && 0 === self::$blog_settings['debugger'] ) {
			return null;
		}

		if ( false === $force && ! current_user_can( 'manage_options' ) ) {
			return null;
		}

		$errors = '<ul class="errors"><li><pre>' . implode( '</pre></li><li><pre>', array_map( 'urldecode', $errors ) ) . '</pre></li></ul>';

		if ( false === is_null( $comments ) ) {
			$note     = __( 'Note', 'messia' );
			$comments = "<div class='comments mt-3'>{$note}: {$comments}</div>";
		}

		$content = "<p class='title'><strong>Debug log: {$title}</strong></p>{$errors}{$comments}";

		if ( empty( $css_classes ) ) {
			$css_classes[] = 'messia-debugger mb-4 mt-2';
			$content       = "<blockquote class='" . implode( ' ', $css_classes ) . "'>{$content}</blockquote>";
		} else {
			$css_classes[] = 'messia-debugger';
			$content       = "<blockquote class='" . implode( ' ', $css_classes ) . "'>{$content}</blockquote>";
		}

		if ( true === $echo ) {
			echo $content;
			return null;
		} else {
			return $content;
		}
	}

	/**
	 * Find blocks in blocks array
	 *
	 * @param array $blocks_scope   Gutenberg blocks.
	 * @param array $blocks_to_find What block to search.
	 * @param array $found          Stuff data, do not pass anything here.
	 *
	 * @return array
	 */
	public static function find_blocks( array $blocks_scope, array $blocks_to_find, array $found = [] ): array {

		foreach ( $blocks_scope as $block_scope ) {

			if ( isset( $blocks_to_find[ $block_scope['blockName'] ] ) ) {
				$found[ $block_scope['blockName'] ] = $blocks_to_find[ $block_scope['blockName'] ];
			}

			if ( ! empty( $block_scope['innerBlocks'] ) ) {
				$found = self::find_blocks( $block_scope['innerBlocks'], $blocks_to_find, $found );
			}
		}
		return $found;
	}

	/**
	 * Get array for select tag options.
	 *
	 * @param array $args Must have key 'taxonomy' with registered
	 * taxonomy name and key 'value' for using as array key in response (term_id|slug).
	 *
	 * @return array
	 */
	public static function get_terms_dropdown_options( array $args ): array {

		global $wpdb;
		$taxonomy = "'" . implode( "','", $args['taxonomy'] ) . "'";

		$sql =
			"SELECT *
			FROM $wpdb->terms as t
			INNER JOIN $wpdb->term_taxonomy AS tt ON t.term_id = tt.term_id
			WHERE tt.taxonomy IN ($taxonomy)
			ORDER BY name ASC";

		$terms = $wpdb->get_results( $sql ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

		$terms_tree = self::get_terms_tree( $terms );
		$terms_flat = self::build_terms_flat( $terms_tree, $args['value'] );

		$options = array_combine(
			array_column( $terms_flat, 'value' ),
			array_column( $terms_flat, 'label' )
		);

		return $options;
	}

	/**
	 * Make tree of terms flat.
	 *
	 * @param array   $terms Array of terms.
	 * @param string  $key   Array of terms.
	 * @param array   $flat  Flatten terms.
	 * @param integer $level How deep term are, stuff data, do not pass anything here.
	 *
	 * @return array Same terms but flat.
	 */
	private static function build_terms_flat( array $terms, string $key, array $flat = [], int $level = 0 ): array {

		foreach ( $terms as $term ) {

			if ( 0 === (int) $term['parent'] ) {
				$level = 0;
			}

			$flat[] = [
				'value' => $term[ $key ],
				'label' => str_repeat( '-', $level ) . " {$term['name']} [{$term['count']}]",
			];

			if ( isset( $term['children'] ) ) {
				++$level;
				$flat = self::build_terms_flat( $term['children'], $key, $flat, $level );
				--$level;
			}
		}
		return $flat;
	}

	/**
	 * Creats ordered search url.
	 *
	 * @param array  $global_terms_order Order of category and property terms relative to which to build url.
	 * @param string $segment_term       Target segment slug.
	 * @param array  $category_terms     Array of slugs of taxonomy Category .
	 * @param array  $property           Compound array of 'sort', 'list', 'search'. 'prop' and 'cf' keys.
	 *
	 * @throws Exception If $property is not empty and not assoc array or $global_terms_order does not
	 *                   contain both keys 'messia_object_category' and 'messia_object_property'.
	 *
	 * @return mixed string|WP_Error
	 */
	public static function create_listing_url( array $global_terms_order, string $segment_term, array $category_terms, array $property ) {

		$is_indexed = array_values( $property ) === $property && ! empty( $property );

		if ( $is_indexed ) {
			throw new Exception( '$property variable should be an associative array.' );
		}

		$position    = self::$blog_settings['property_url_position'];
		$query_order = self::$blog_settings['query_order'];

		$def_list   = MESSIA_LIST_SORT_SEARCH['list'];
		$def_sort   = MESSIA_LIST_SORT_SEARCH['sort'];
		$def_search = MESSIA_LIST_SORT_SEARCH['search'];

		// Prepare defaults.
		$parts = [
			'host'     => home_url() . '/',
			'path'     => [ $segment_term ],
			'query'    => [],
			'fragment' => [],
		];

		// Only whitelisted parts.
		$parts['query'] = shortcode_atts(
			array_combine( $query_order, array_fill( 0, count( $query_order ), [] ) ),
			$property
		);

		if ( $parts['query']['list'] === $def_list ) {
			unset( $parts['query']['list'] );
		}

		if ( $parts['query']['sort'] === $def_sort ) {
			unset( $parts['query']['sort'] );
		}

		if ( $parts['query']['search'] === $def_search ) {
			unset( $parts['query']['search'] );
		}

		if ( ! empty( $category_terms ) ) {

			if ( ! array_key_exists( 'messia_object_category', $global_terms_order ) ) {
				throw new Exception( '$global_terms_order should have key "messia_object_category" with terms order.' );
			}

			$parents = self::get_path_to_deepest_term( $category_terms );

			if ( is_wp_error( $parents ) ) {
				// translators: %s - category term slug.
				return new WP_Error( 'term_not_exist', sprintf( __( 'Fail to build path to a deepest category term. %s', 'messia' ), $parents->get_error_message() ) );
			}

			array_shift( $parents ); // front does not send root terms.
			$parents = array_merge( $parents, $category_terms );

			$query_category_terms_ordered = array_intersect( $global_terms_order['messia_object_category'], $parents );
			$parts['path']                = array_values( array_merge( $parts['path'], $query_category_terms_ordered ) );
		}

		if ( ! empty( $property['prop'] ) ) {

			if ( ! array_key_exists( 'messia_object_property', $global_terms_order ) ) {
				throw new Exception( '$global_terms_order should have key "messia_object_property" with terms order.' );
			}

			$query_property_terms         = $property['prop'];
			$query_property_terms_ordered = array_intersect( $global_terms_order['messia_object_property'], $query_property_terms );
			$parts['query']['prop']       = array_values( $query_property_terms_ordered );
		}

		// Build parts into url.
		if ( ! empty( $parts['path'] ) ) {
			$parts['path'] = implode( '/', $parts['path'] ) . '/';
		}

		if ( ! empty( $parts['query']['prop'] ) ) {
			$parts['query']['prop'] = implode( ',', $parts['query']['prop'] );
		}

		if ( ! empty( $parts['query']['cf'] ) ) {

			if ( ! array_key_exists( 'messia_object_constructor', $global_terms_order ) ) {
				throw new Exception( '$global_terms_order should have keys "messia_object_constructor" with terms order.' );
			}

			$cf = [];

			foreach ( $parts['query']['cf'] as $field_name => $field_value ) {
				$cf[] = [ $field_name => $field_value ];
			}

			$parts['query']['cf'] = base64_encode( wp_json_encode( $cf ) ); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode
		}

		if ( 'hash' === $position ) {
			$fragment = array_intersect_key(
				$parts['query'],
				[
					'prop' => null,
					'cf'   => null,
				]
			);

			$parts['fragment'] = array_merge( $parts['fragment'], $fragment );

			unset( $parts['query']['prop'] );
			unset( $parts['query']['cf'] );
		}

		$separator = ini_get( 'arg_separator.output' );

		$q = http_build_query( $parts['query'], '', $separator, PHP_QUERY_RFC3986 );
		$f = http_build_query( $parts['fragment'], '', $separator, PHP_QUERY_RFC3986 );

		if ( empty( $q ) ) {
			unset( $parts['query'] );
		} else {
			$parts['query'] = "?{$q}";
		}

		if ( empty( $f ) ) {
			unset( $parts['fragment'] );
		} else {
			$parts['fragment'] = "#{$f}";
		}

		return implode( '', $parts );
	}

	/**
	 * Preserve template folder from direct access.
	 *
	 * @return void
	 */
	public static function preserve_demo_folder(): void {

		/** WordPress Misc Administration API */
		require_once ABSPATH . 'wp-admin/includes/misc.php';

		$tmpl_folder   = MESSIA_THEME_ABSPATH . 'data/templates/';
		$htaccess_file = $tmpl_folder . '.htaccess';

		if ( ( ! file_exists( $htaccess_file ) && is_writable( $tmpl_folder ) ) || is_writable( $htaccess_file ) ) {
			$rules = "deny from all\n";
			$done  = insert_with_markers( $htaccess_file, 'Messia User Rules', $rules );
		}
	}
}
