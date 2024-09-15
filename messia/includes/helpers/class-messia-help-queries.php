<?php
/**
 * Messia_Help_Queries
 *
 * @package Messia\Helpers
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Helpers;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Smartbits\Messia\Includes\Helpers\Messia_Help_Database;
use Smartbits\Messia\Includes\Modules\Listing\Skins\Messia_Listing_Tmpl_Base;
use stdClass;

/**
 * This class contains static specific
 * simple methods for request parsing.
 *
 * @package Messia\Helpers
 */
class Messia_Help_Queries extends Messia_Help_Database {

	/**
	 * Detect that current request comes from listing page.
	 *
	 * @return bool
	 */
	public static function is_listing_page(): bool {

		if ( self::messia_doing_ajax( 'get_listing' ) ) {
			return true;
		} else {

			$object = get_queried_object();

			if ( isset( $object->post_name ) ) {
				$pagename      = $object->post_name;
				$terms_segment = self::get_terms_segment();

				if ( array_key_exists( $pagename, $terms_segment ) ) {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * Validate if WP processing REST request.
	 *
	 * @return bool
	 */
	public static function wp_doing_rest(): bool {
		if ( false !== strpos( $_SERVER['REQUEST_URI'], '/wp-json/' ) ) {
			return true;
		}
		return false;
	}

	/**
	 * Ckeck whether current request is of type AJAX and produced by Messia.
	 *
	 * @param string $action Name of action in request.
	 *
	 * @return bool
	 */
	public static function messia_doing_ajax( ?string $action = null ): bool {

		if ( false === check_ajax_referer( 'messiaFrontendAjax', 'messiaNonce', false ) ) {
			if ( false === check_ajax_referer( 'messiaBackendAjax', 'messiaNonce', false ) ) {
				if ( false === check_ajax_referer( 'messiaCoreSettingsNonce', 'messiaNonce', false ) ) {
					return false;
				}
			}
		}

		if ( is_null( $action ) ) {
			if ( wp_doing_ajax() && isset( $_POST['data']['AJAX_Marker'] ) && 'MessiaAjax' === $_POST['data']['AJAX_Marker'] ) {
				return true;
			}
		} elseif ( wp_doing_ajax() && isset( $_POST['data']['AJAX_Marker'] ) && 'MessiaAjax' === $_POST['data']['AJAX_Marker'] ) {
			if ( isset( $_POST['action'] ) && $action === $_POST['action'] ) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Invokes showing Error page with 404 header.
	 *
	 * @param array $templates An optional list of template candidates.
	 *
	 * @return void
	 */
	public static function page404( array $templates = [] ) {

		global $wp_query;

		$wp_query->set_404();
		status_header( 404 );
		include get_query_template( '404', $templates );
		exit;
	}

	/**
	 * Wrapper for WP get_query_var where var are always 'messia_alias'.
	 *
	 * @param mixed $if_none What to return if no 'messia_alias' found in query.
	 *
	 * @return mixed
	 */
	public static function get_alias_query( mixed $if_none ) {

		return get_query_var( 'messia_alias', $if_none );
	}

	/**
	 * Parse listing search URL.
	 *
	 * @return object
	 */
	public static function parse_listing_query(): stdClass {

		static $result = [];

		if ( ! empty( $result ) ) {
			return $result;
		}

		if ( self::messia_doing_ajax( 'get_listing' ) ) {
			$result = (object) self::get_listing_query_ajax();
		} else {
			$result = (object) [
				'listing_query'  => ( isset( $_SERVER['HTTPS'] ) ? 'https' : 'http' ) . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]",
				'segment_term'   => self::get_segment_query(),
				'category_terms' => self::get_category_query(),
				'properties'     => self::get_property_query(),
			];
		}
		return $result;
	}

	/**
	 * Get requested segment term in regular mode.
	 *
	 * @return mixed string|bool Segement slug or false is none found.
	 */
	private static function get_segment_query() {

		$if_none = [];
		$object  = get_queried_object();

		if ( is_null( $object ) ) {
			return $if_none;
		}

		$segment_terms = self::get_terms_segment();
		$queried_post  = $object->post_name;
		$listing_page  = array_key_exists( $queried_post, $segment_terms );
		$post_segments = self::get_post_terms( [ $object->ID ], [ 'messia_object_segment' ] );

		if ( true === $listing_page ) { // regular page.
			$segment = $queried_post;
		} elseif ( ! empty( $post_segments ) ) { // object page.
			$segment = $post_segments[0]->slug;
		} else {
			$segment = $if_none;
		}

		return $segment;
	}

	/**
	 * Get requested category terms in regular mode.
	 *
	 * @return array Category slugs found.
	 */
	private static function get_category_query(): array {

		$if_none = [];
		$object  = get_queried_object();

		if ( is_null( $object ) ) {
			return $if_none;
		}

		$segment_terms   = self::get_terms_segment();
		$queried_post    = $object->post_name;
		$listing_page    = array_key_exists( $queried_post, $segment_terms );
		$post_categories = self::get_post_terms( [ $object->ID ], [ 'messia_object_category' ] );
		$category_terms  = get_query_var( 'category_terms', false );

		if ( true === $listing_page ) { // regular page.
			if ( $category_terms ) {
				$category_terms = explode( '/', $category_terms );
			} else {
				$category_terms = $if_none;
			}
		} elseif ( ! empty( $post_categories ) ) { // object page.
			$category_terms = array_column( $post_categories, 'slug' );
		} else {
			$category_terms = $if_none;
		}

		return $category_terms;
	}

	/**
	 * Get requested property terms in regular mode.
	 *
	 * @return array Property found, including list, sort, search,
	 *               Property taxonomy slugs and Constructor terms sequence.
	 */
	private static function get_property_query() {

		$if_none = [];

		$property_terms    = [];
		$constructor_terms = [];

		$list   = MESSIA_LIST_SORT_SEARCH['list'];
		$sort   = MESSIA_LIST_SORT_SEARCH['sort'];
		$search = MESSIA_LIST_SORT_SEARCH['search'];

		if ( $_GET ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended

			$query_arr = $_GET; // phpcs:ignore WordPress.Security.NonceVerification.Recommended

			if ( isset( $query_arr['prop'] ) ) {
				$property_terms = explode( ',', $query_arr['prop'] );
			}

			if ( isset( $query_arr['cf'] ) ) {
				$constructor_terms = self::parse_constructor_query( $query_arr['cf'] );
			}

			if ( isset( $query_arr['list'] ) ) {
				$list = (int) $query_arr['list'];
			}

			if ( isset( $query_arr['sort'] ) ) {
				$sort = $query_arr['sort'];
			}

			if ( isset( $query_arr['search'] ) ) {
				$search = $query_arr['search'];
			}
		} else {
			$property_terms    = $if_none;
			$constructor_terms = $if_none;
		}

		$property = [
			'prop'   => $property_terms,
			'cf'     => $constructor_terms,
			'list'   => $list,
			'lists'  => null, // will be defined in setup_objects().
			'sort'   => $sort,
			'search' => $search,
		];

		return $property;
	}

	/**
	 * Get requested segment, category, property terms in AJAX mode.
	 * Parse URL passed with ajax getting listing and return structured data for search by.
	 *
	 * @return array
	 */
	private static function get_listing_query_ajax(): array {

		global $wpdb;

		check_ajax_referer( 'messiaFrontendAjax', 'messiaNonce', true );

		static $query = [];
		$query_arr    = [];
		$fragment_arr = [];

		$property_terms    = [];
		$constructor_terms = [];

		if ( ! empty( $query ) ) {
			return $query;
		}

		$blog_settings = MIA()->get_module_settings()->get_blog_setting( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME );

		$list   = MESSIA_LIST_SORT_SEARCH['list'];
		$sort   = MESSIA_LIST_SORT_SEARCH['sort'];
		$search = MESSIA_LIST_SORT_SEARCH['search'];

		$segment_post = $wpdb->get_row(
			$wpdb->prepare(
				"SELECT
					ID,
					post_name
				FROM $wpdb->posts AS posts
				WHERE posts.ID = %d;",
				(int) sanitize_text_field( urldecode( $_POST['data']['postid'] ) )
			)
		);

		$pup  = $blog_settings['property_url_position'];
		$url  = wp_parse_url( sanitize_text_field( urldecode( $_POST['data']['query'] ) ) );
		$path = explode( '/', trim( $url['path'], '/' ) );

		if ( is_multisite() ) {
			if ( defined( 'SUBDOMAIN_INSTALL' ) && false === SUBDOMAIN_INSTALL ) {

				$subdomain = trim( get_blog_details()->path, '/' );

				if ( '' !== $subdomain ) {
					unset( $path[0] );
					$path = array_values( $path );
				}
			}
		}

		// segment page can have parent pages like this 'about-us/contact/rent' or has no at all.
		$segment_in_path = array_search( $segment_post->post_name, $path, true );

		// parent pages removed from path.
		$path = array_slice( $path, $segment_in_path );

		if ( isset( $url['query'] ) ) {
			$query = trim( $url['query'], '/' );
			parse_str( $query, $query_arr );
		}

		if ( isset( $url['fragment'] ) ) {
			$query = trim( $url['fragment'], '/' );
			parse_str( $query, $fragment_arr );
		}

		if ( isset( $query_arr['prop'] ) && 'query' === $pup ) {
			$property_terms = explode( ',', $query_arr['prop'] );
		} elseif ( isset( $fragment_arr['prop'] ) && 'hash' === $pup ) {
			$property_terms = explode( ',', $fragment_arr['prop'] );
		}

		if ( isset( $query_arr['cf'] ) && 'query' === $pup ) {
			$constructor_terms = self::parse_constructor_query( $query_arr['cf'] );
		} elseif ( isset( $fragment_arr['cf'] ) && 'hash' === $pup ) {
			$constructor_terms = self::parse_constructor_query( $fragment_arr['cf'] );
		}

		if ( isset( $query_arr['prop'] ) ) {
			$property_terms = explode( ',', $query_arr['prop'] );
		}

		if ( isset( $query_arr['cf'] ) ) {
			$constructor_terms = self::parse_constructor_query( $query_arr['cf'] );
		}

		if ( isset( $query_arr['list'] ) ) {
			$list = (int) $query_arr['list'];
		}

		if ( isset( $query_arr['sort'] ) ) {
			$sort = $query_arr['sort'];
		}

		if ( isset( $query_arr['search'] ) ) {
			$search = $query_arr['search'];
		}

		$path  = array_map( 'sanitize_title', $path );
		$query = [
			'listing_query'  => $_POST['data']['query'],
			'segment_term'   => $path[0],
			'category_terms' => array_slice( $path, 1 ),
			'properties'     => [
				'prop'   => array_map( 'sanitize_title', $property_terms ),
				'cf'     => $constructor_terms,
				'list'   => $list,
				'sort'   => $sort,
				'search' => $search,
			],
		];

		return $query;
	}

	/**
	 * Decode base64 json encoded string into array.
	 *
	 * @param string $query Encoded string.
	 *
	 * @return mixed Result of false on error.
	 */
	private static function parse_constructor_query( string $query ) {

		$constructor_terms = [];

		$encoded = wp_unslash( base64_decode( $query, true ) ); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_decode
		if ( false !== $encoded ) {
			$try = json_decode( $encoded, true );

			if ( json_last_error() === JSON_ERROR_NONE && $try !== $encoded ) {

				foreach ( $try as $field_value ) {
					$constructor_terms = array_merge( $constructor_terms, $field_value );
				}
			}
		}

		return $constructor_terms;
	}

	/**
	 * Generates breadcrumbs HTML.
	 *
	 * @return string
	 */
	public static function get_breadcrumbs(): string {

		global $wpdb;
		$front_type = get_option( 'show_on_front' );

		if ( 'page' === $front_type ) {

			$home_page_id = get_option( 'page_on_front' );

			$sql =
				"SELECT post_title
				FROM $wpdb->posts
				WHERE ID = $home_page_id";

			$home_page_title = $wpdb->get_var( $sql ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

		} else {
			$home_page_title = __( 'Home', 'messia' );
		}

		/* === OPTIONS === */
		$text['home']     = $home_page_title; // link text "Home".
		$text['category'] = '%s'; // text for category page.
		// translators: %s - search query string.
		$text['search'] = __( 'Search results for "%s"', 'messia' ); // text for the search results page.
		// translators: %s - tag name.
		$text['tag'] = __( 'Posts tagged "%s"', 'messia' ); // text for tag page.
		// translators: %s - author name.
		$text['author'] = __( 'Articles by author %s', 'messia' ); // text for author page.
		$text['404']    = __( 'Error 404', 'messia' ); // text for 404 page.
		// translators: %s - page title.
		$text['page'] = __( 'Page %s', 'messia' ); // text 'Page N'.
		// translators: %s - comment page number.
		$text['cpage'] = __( 'Comments page № %s', 'messia' ); // text 'Comment page N'.

		$wrap_before = '<ul class="breadcrumb py-1 px-3 d-inline-flex" itemscope itemtype="http://schema.org/BreadcrumbList">'; // opening wrapper tag.
		$wrap_after  = '</ul>'; // closing wrapper tag.
		$sep         = ''; // breadcrumbs delimiter.
		$before      = '<li class="breadcrumb-item active">'; // tag before breadcrumb unit.
		$after       = '</span>'; // tag after breadcrumb unit.

		$show_on_home   = 0; // 1 - show breadcrumbs on the main page, 0 - do not show.
		$show_home_link = 1; // 1 - show "Home" link, 0 - do not show.
		$show_current   = 1; // 1 - show the title of the current page, 0 - do not show.
		$show_last_sep  = 1; // 1 - show the last delimiter when the title of the current page is not displayed, 0 - do not show.
		/* === OPTIONS === */

		global $post;
		$home_url  = home_url( '/' );
		$link      = '<li itemprop="itemListElement" class="breadcrumb-item" itemscope itemtype="http://schema.org/ListItem">';
		$link     .= '<a class="breadcrumbs__link" href="%1$s" itemprop="item">%2$s</a>';
		$link     .= '<meta itemprop="position" content="%3$s" />';
		$link     .= '</li>';
		$parent_id = ( $post ) ? $post->post_parent : '';
		$home_link = sprintf( $link, $home_url, $text['home'], 1 );

		ob_start();

		if ( is_home() || is_front_page() ) {

			if ( $show_on_home ) {
				echo $wrap_before . $home_link . $wrap_after;
			}
		} else {

			$position = 0;

			echo $wrap_before;

			if ( $show_home_link ) {
				++$position;
				echo $home_link;
			}

			if ( is_category() ) {

				$parents = get_ancestors( get_query_var( 'cat' ), 'category' );

				foreach ( array_reverse( $parents ) as $cat ) {

					++$position;
					if ( $position > 1 ) {
						echo $sep;
					}
					echo sprintf( $link, get_category_link( $cat ), get_cat_name( $cat ), $position );
				}

				if ( get_query_var( 'paged' ) ) {

					++$position;
					$cat = get_query_var( 'cat' );
					echo $sep . sprintf( $link, get_category_link( $cat ), get_cat_name( $cat ), $position );
					echo $sep . $before . sprintf( $text['page'], get_query_var( 'paged' ) ) . $after;
				} elseif ( $show_current ) {

					if ( $position >= 1 ) {
						echo $sep;
					}
						echo $before . sprintf( $text['category'], single_cat_title( '', false ) ) . $after;
				} elseif ( $show_last_sep ) {
					echo $sep;
				}
			} elseif ( is_search() ) {

				if ( get_query_var( 'paged' ) ) {

					++$position;

					if ( $show_home_link ) {
						echo $sep;
					}
					echo sprintf( $link, $home_url . '?s=' . get_search_query(), sprintf( $text['search'], get_search_query() ), $position );
					echo $sep . $before . sprintf( $text['page'], get_query_var( 'paged' ) ) . $after;
				} elseif ( $show_current ) {

					if ( $position >= 1 ) {
						echo $sep;
					}
						echo $before . sprintf( $text['search'], get_search_query() ) . $after;
				} elseif ( $show_last_sep ) {
					echo $sep;
				}
			} elseif ( is_year() ) {

				if ( $show_home_link && $show_current ) {
					echo $sep;
				}
				if ( $show_current ) {
					echo $before . get_the_time( 'Y' ) . $after;
				} elseif ( $show_home_link && $show_last_sep ) {
					echo $sep;
				}
			} elseif ( is_month() ) {

				if ( $show_home_link ) {
					echo $sep;
				}
				++$position;
				echo sprintf( $link, get_year_link( get_the_time( 'Y' ) ), get_the_time( 'Y' ), $position );

				if ( $show_current ) {
					echo $sep . $before . get_the_time( 'F' ) . $after;
				} elseif ( $show_last_sep ) {
					echo $sep;
				}
			} elseif ( is_day() ) {

				if ( $show_home_link ) {
					echo $sep;
				}

				++$position;
				echo sprintf( $link, get_year_link( get_the_time( 'Y' ) ), get_the_time( 'Y' ), $position ) . $sep;
				++$position;
				echo sprintf( $link, get_month_link( get_the_time( 'Y' ), get_the_time( 'm' ) ), get_the_time( 'F' ), $position );

				if ( $show_current ) {
					echo $sep . $before . get_the_time( 'd' ) . $after;
				} elseif ( $show_last_sep ) {
					echo $sep;
				}
			} elseif ( is_single() && ! is_attachment() ) {

				if ( 'messia_object' === get_post_type() ) {

					++$position;

					if ( $position > 1 ) {
						echo $sep;
					}

					$object_segments = self::get_post_terms( [ $post->ID ], [ 'messia_object_segment' ] );

					if ( $object_segments ) {

						$url = $home_url . $object_segments[0]->slug . '/';

						echo sprintf( $link, $url, $object_segments[0]->name, $position );

						if ( $show_current ) {
							echo $sep . $before . get_the_title() . $after;
						} elseif ( $show_last_sep ) {
							echo $sep;
						}
					}
				} elseif ( get_post_type() !== 'post' ) {

						++$position;
						$post_type = get_post_type_object( get_post_type() );

					if ( $position > 1 ) {
						echo $sep;
					}

					echo sprintf( $link, get_post_type_archive_link( $post_type->name ), $post_type->labels->name, $position );

					if ( $show_current ) {
						echo $sep . $before . get_the_title() . $after;
					} elseif ( $show_last_sep ) {
						echo $sep;
					}
				} else {

					$cat       = get_the_category();
					$cat_id    = $cat[0]->cat_ID;
					$parents   = get_ancestors( $cat_id, 'category' );
					$parents   = array_reverse( $parents );
					$parents[] = $cat_id;

					foreach ( $parents as $cat ) {
						++$position;
						if ( $position > 1 ) {
							echo $sep;
						}
						echo sprintf( $link, get_category_link( $cat ), get_cat_name( $cat ), $position );
					}

					if ( get_query_var( 'cpage' ) ) {
						++$position;
						echo $sep . sprintf( $link, get_permalink(), get_the_title(), $position );
						echo $sep . $before . sprintf( $text['cpage'], get_query_var( 'cpage' ) ) . $after;
					} elseif ( $show_current ) {
							echo $sep . $before . get_the_title() . $after;
					} elseif ( $show_last_sep ) {
						echo $sep;
					}
				}
			} elseif ( is_post_type_archive() ) {

				$post_type = get_post_type_object( get_post_type() );

				if ( get_query_var( 'paged' ) ) {

					++$position;

					if ( $position > 1 ) {
						echo $sep;
					}
					echo sprintf( $link, get_post_type_archive_link( $post_type->name ), $post_type->label, $position );
					echo $sep . $before . sprintf( $text['page'], get_query_var( 'paged' ) ) . $after;
				} else {

					if ( $show_home_link && $show_current ) {
						echo $sep;
					}
					if ( $show_current ) {
						echo $before . $post_type->label . $after;
					} elseif ( $show_home_link && $show_last_sep ) {
						echo $sep;
					}
				}
			} elseif ( is_attachment() ) {

				$parent = get_post( $parent_id );
				$cat    = get_the_category( $parent->ID );

				// If the media is attached to the post.
				if ( ! empty( $cat ) ) {
					$cat_id    = $cat[0]->cat_ID;
					$parents   = get_ancestors( $cat_id, 'category' );
					$parents   = array_reverse( $parents );
					$parents[] = $cat_id;

					foreach ( $parents as $cat ) {
						++$position;
						if ( $position > 1 ) {
							echo $sep;
						}
						echo sprintf( $link, get_category_link( $cat ), get_cat_name( $cat ), $position );
					}

					++$position;

					echo $sep . sprintf( $link, get_permalink( $parent ), $parent->post_title, $position );
				}
				if ( $show_current ) {
					echo $sep . $before . get_the_title() . $after;
				} elseif ( $show_last_sep ) {
					echo $sep;
				}
			} elseif ( self::is_listing_page() && MIA()->get_module_listing() instanceof Messia_Listing_Tmpl_Base ) {

				$listing = MIA()->get_module_listing();

				$current_segment    = $listing->get_current_segment_term();
				$current_categories = $listing->get_current_category_terms();

				$segment_post = $wpdb->get_row(
					$wpdb->prepare(
						"SELECT
							ID,
							post_title,
							post_parent
						FROM $wpdb->posts AS posts
						WHERE posts.post_name = %s;",
						$current_segment
					)
				);

				$categories = self::get_terms_category();

				$current_categories = array_map(
					function( $n ) use ( $categories ) {
						return (array) $categories[ $n ];
					},
					$current_categories
				);

				if ( (int) $segment_post->post_parent > 0 ) {

					$parents = get_post_ancestors( (int) $segment_post->ID );

					foreach ( array_reverse( $parents ) as $page_id ) {
						++$position;

						if ( $position > 1 ) {
							echo $sep;
						}
						echo sprintf( $link, get_page_link( $page_id ), get_the_title( $page_id ), $position );
					}
				}

				if ( empty( $current_categories ) ) {

					if ( $show_home_link && $show_current ) {
						echo $sep;
					}
					if ( $show_current ) {
						echo $before . $segment_post->post_title . $after;
					} elseif ( $show_home_link && $show_last_sep ) {
						echo $sep;
					}
				} else {

					++$position;
					$length = count( $current_categories );

					echo sprintf( $link, get_page_link( $segment_post->ID ), $segment_post->post_title, $position );

					for ( $i = 0; $i < $length; $i++ ) {
						++$position;

						if ( $position > 1 ) {
							echo $sep;
						}
						$listing_url_suffix = implode( '/', array_column( array_slice( $current_categories, 0, $i + 1 ), 'slug' ) ) . '/';
						$category_name      = $current_categories[ $i ]['name'];

						if ( $i < $length - 1 ) {
							echo sprintf( $link, get_page_link( $segment_post->ID ) . $listing_url_suffix, $category_name, $position );
						} else {
							echo $before . $category_name . $after;
						}
					}
				}
			} elseif ( is_page() && ! $parent_id ) {

				if ( $show_home_link && $show_current ) {
					echo $sep;
				}
				if ( $show_current ) {
					echo $before . get_the_title() . $after;
				} elseif ( $show_home_link && $show_last_sep ) {
					echo $sep;
				}
			} elseif ( is_page() && $parent_id ) {

				$parents = get_post_ancestors( get_the_ID() );

				foreach ( array_reverse( $parents ) as $page_id ) {
					++$position;

					if ( $position > 1 ) {
						echo $sep;
					}
					echo sprintf( $link, get_page_link( $page_id ), get_the_title( $page_id ), $position );
				}
				if ( $show_current ) {
					echo $sep . $before . get_the_title() . $after;
				} elseif ( $show_last_sep ) {
					echo $sep;
				}
			} elseif ( is_tag() ) {

				if ( get_query_var( 'paged' ) ) {
					++$position;
					$tag_id = get_query_var( 'tag_id' );
					echo $sep . sprintf( $link, get_tag_link( $tag_id ), single_tag_title( '', false ), $position );
					echo $sep . $before . sprintf( $text['page'], get_query_var( 'paged' ) ) . $after;
				} else {

					if ( $show_home_link && $show_current ) {
						echo $sep;
					}
					if ( $show_current ) {
						echo $before . sprintf( $text['tag'], single_tag_title( '', false ) ) . $after;
					} elseif ( $show_home_link && $show_last_sep ) {
						echo $sep;
					}
				}
			} elseif ( is_author() ) {

				$author = get_userdata( get_query_var( 'author' ) );

				if ( get_query_var( 'paged' ) ) {

					++$position;
					echo $sep . sprintf( $link, get_author_posts_url( $author->ID ), sprintf( $text['author'], $author->display_name ), $position );
					echo $sep . $before . sprintf( $text['page'], get_query_var( 'paged' ) ) . $after;
				} else {

					if ( $show_home_link && $show_current ) {
						echo $sep;
					}
					if ( $show_current ) {
						echo $before . sprintf( $text['author'], $author->display_name ) . $after;
					} elseif ( $show_home_link && $show_last_sep ) {
						echo $sep;
					}
				}
			} elseif ( is_404() ) {

				if ( $show_home_link && $show_current ) {
					echo $sep;
				}
				if ( $show_current ) {
					echo $before . $text['404'] . $after;
				} elseif ( $show_last_sep ) {
					echo $sep;
				}
			} elseif ( has_post_format() && ! is_singular() ) {

				if ( $show_home_link && $show_current ) {
					echo $sep;
				}
				echo get_post_format_string( get_post_format() );
			}

			echo $wrap_after;
		}

		return ob_get_clean();
	}

	/**
	 * Move one term before or after another.
	 *
	 * @param string $position_type  Where to move term relative to target term - before or after.
	 *                               Can be reset to clear ordering.
	 * @param int    $term_target_id Term for positioning relative to.
	 * @param int    $term_moved_id  Term that being moved.
	 * @param string $taxonomy       Taxonomy name.
	 *
	 * @return void
	 */
	public static function reorder_terms( string $position_type, int $term_target_id, int $term_moved_id, string $taxonomy ): void {

		global $wpdb;

		if ( 'reset' === $position_type ) {
			/*
			 * FIND terms.term_order for a term being reseted.
			 */
			$reset_term_order = (int) $wpdb->get_var(
				$wpdb->prepare(
					"SELECT
						term_order
					FROM
						$wpdb->terms as t
					INNER JOIN $wpdb->term_taxonomy AS tt ON tt.term_id = t.term_id
					WHERE
						tt.taxonomy = %s
						AND t.term_id = %d;",
					$taxonomy,
					$term_moved_id
				)
			);

			/*
			 * Inner SELECT will return `term_order_new` with required order.
			 * In this example term_id=145 being reseted:
			 * --------+----------------+------------+----------------+
			 * term_id |           name | term_order | term_order_new |
			 * --------+----------------+------------+----------------+
			 *     125 |        Georgia |          1 |              1 |
			 *      42 |     California |          2 |              2 |
			 *     145 |       Michigan |          3 |              0 |
			 *     124 |        Alabama |          4 |              3 |
			 *     145 |       Michigan |          0 |              3 |
			 *     142 |      Minnesota |          0 |              0 |
			 *      75 | New York State |          0 |              0 |
			 *
			 * Outer UPDATE will rewrite `term_order` with `term_order_new`.
			 */
			$wpdb->query(
				$wpdb->prepare(
					"UPDATE $wpdb->terms
						INNER JOIN (
							SELECT
								t.term_id,
								t.name,
								t.term_order,
								CASE
									WHEN t.term_order = %d THEN 0
									WHEN t.term_order > %d THEN t.term_order - 1
									ELSE t.term_order
								END AS term_order_new
							FROM $wpdb->terms as t
							INNER JOIN $wpdb->term_taxonomy AS tt ON tt.term_id = t.term_id
							WHERE
								tt.taxonomy = %s
								AND parent = (SELECT parent FROM $wpdb->term_taxonomy WHERE term_id = %d)
							ORDER BY
								CASE t.term_order
									WHEN t.term_order = 0 OR t.term_order IS NULL THEN t.name
									ELSE -t.term_order
								END ASC,
								t.name ASC
						) AS term_ordered
					ON $wpdb->terms.term_id = term_ordered.term_id
					SET
						$wpdb->terms.term_order = term_ordered.term_order_new;",
					$reset_term_order,
					$reset_term_order,
					$taxonomy,
					$term_moved_id
				)
			);

		} elseif ( -1 === $term_target_id ) {
			return;
		} else {
			/*
			 * FIND MAX(terms.term_order) for a terms level where moved term lie and
			 * where term_order <> 0 and is not null and term_id is not one of: moved term and target term.
			 *
			 * --------+------+------------+
			 * term_id | name | term_order |
			 * --------+------+------------+
			 *     125 |  A   |          1 |
			 *      42 |  -a1 |          1 |
			 *      43 |  -a2 |          2 |
			 *     124 |  B   |          2 |
			 *     112 |  -b1 |          0 |
			 *     113 |  -b2 |          0 |
			 *     145 |  C   |          3 |
			 *     142 |  -c1 |          0 |
			 *     143 |  -c2 |          0 |
			 *      75 |  D   |          4 |
			 *      76 |  -d1 |          0 |
			 *      77 |  -d2 |          0 |
			 * --------+------+------------+
			 * This sample will find 4 (as for D)
			 */
			$max_term_order_for_level = (int) $wpdb->get_var(
				$wpdb->prepare(
					"SELECT
						IF( MAX(term_order) IS NULL, 0, MAX(term_order) ) as max_term_order
					FROM $wpdb->terms as t
					INNER JOIN $wpdb->term_taxonomy AS tt ON tt.term_id = t.term_id
					WHERE
						tt.taxonomy = %s
						AND parent = (SELECT parent FROM $wpdb->term_taxonomy WHERE term_id = %d)
						AND (t.term_order <> 0 OR t.term_order IS NOT NULL);",
					$taxonomy,
					$term_moved_id
				)
			);

			/*
			 * Current order of target term.
			 */
			$order_term_target = (int) $wpdb->get_var(
				$wpdb->prepare(
					"SELECT
						term_order
					FROM
						$wpdb->terms AS t
					INNER JOIN $wpdb->term_taxonomy AS tt ON tt.term_id = t.term_id
					WHERE
						tt.taxonomy = %s
						AND t.term_id = %d;",
					$taxonomy,
					$term_target_id
				)
			);

			/*
			 * Prepare shift values.
			 * Let's say we have this case and we move D before B:
			 *
			 * --------+------+------------+----------------+
			 * term_id | name | term_order | term_order_new |
			 * --------+------+------------+----------------+
			 *     125 |  A   |          1 |              1 |
			 *      42 |  -a1 |          1 |              1 |
			 *      43 |  -a2 |          2 |              2 |
			 *     124 |  B   |          2 |              3 | -> new position.
			 *     112 |  -b1 |          0 |              0 |
			 *     113 |  -b2 |          0 |              0 |
			 *     145 |  C   |          3 |              3 | -> will be renumbered later.
			 *     142 |  -c1 |          0 |              0 |
			 *     143 |  -c2 |          0 |              0 |
			 *      75 |  D   |          4 |              2 | -> new position.
			 *      76 |  -d1 |          0 |              0 |
			 *      77 |  -d2 |          0 |              0 |
			 * --------+------+------------+----------------+
			 */
			if ( 0 === $max_term_order_for_level || 1 === $max_term_order_for_level ) {
				switch ( $position_type ) {
					case 'before':
						$order_term_target_new = 2;
						$order_term_moved_new  = 1;
						break;

					case 'after':
						$order_term_target_new = 1;
						$order_term_moved_new  = 2;
						break;
				}
			} else {
				switch ( $position_type ) {
					case 'before':
						$order_term_target_new = ( 0 === $order_term_target ) ? $max_term_order_for_level + 1 : $order_term_target + 1;
						$order_term_moved_new  = $order_term_target_new - 1;
						break;

					case 'after':
						$order_term_target_new = ( 0 === $order_term_target ) ? $max_term_order_for_level + 1 : $order_term_target;
						$order_term_moved_new  = $order_term_target_new + 1;
						break;
				}
			}

			/*
			 * Reorder target and moved terms by calculated positions.
			 * Prepare shift values.
			 * Let's say we have this case and we move D before B:
			 *
			 * --------+------+------------+----------------+
			 * term_id | name | term_order | term_order_new |
			 * --------+------+------------+----------------+
			 *     125 |  A   |          1 |              1 |
			 *      42 |  -a1 |          1 |              1 |
			 *      43 |  -a2 |          2 |              2 |
			 *     124 |  B   |          2 |              3 | -> update to this position.
			 *     112 |  -b1 |          0 |              0 |
			 *     113 |  -b2 |          0 |              0 |
			 *     145 |  C   |          3 |              3 | -> will be renumbered later.
			 *     142 |  -c1 |          0 |              0 |
			 *     143 |  -c2 |          0 |              0 |
			 *      75 |  D   |          4 |              2 | -> update to this position.
			 *      76 |  -d1 |          0 |              0 |
			 *      77 |  -d2 |          0 |              0 |
			 * --------+------+------------+----------------+
			 */
			$wpdb->query(
				$wpdb->prepare(
					"UPDATE
						$wpdb->terms
					SET term_order =
						CASE
							WHEN term_id = %d THEN %d #moved_term
							WHEN term_id = %d THEN %d #target_term
						END
					WHERE
						term_id IN (%d,%d)",
					$term_moved_id,
					$order_term_moved_new,
					$term_target_id,
					$order_term_target_new,
					$term_moved_id,
					$term_target_id
				)
			);

			$sequence_start = ( $order_term_target_new > $order_term_moved_new ) ? $order_term_target_new : $order_term_moved_new;

			/*
			 * Renumber all terms, except target and moved.
			 * Inner SELECT will return `term_order_new` with required order.
			 *
			 * --------+------+------------+
			 * term_id | name | term_order |
			 * --------+------+------------+
			 *     125 |  A   |          1 |
			 *      42 |  -a1 |          1 |
			 *      43 |  -a2 |          2 |
			 *      75 |  D   |      now 2 |
			 *      76 |  -d1 |          0 |
			 *      77 |  -d2 |          0 |
			 *     124 |  B   |      now 3 |
			 *     112 |  -b1 |          0 |
			 *     113 |  -b2 |          0 |
			 *     145 |  C   |   still  3 | - starting from here terms will get incremented position +1
			 *     142 |  -c1 |          0 |
			 *     143 |  -c2 |          0 |
			 * --------+------+------------+
			 *
			 * Outer UPDATE will rewrite `term_order` with `term_order_new`.
			 */
			$wpdb->query(
				$wpdb->prepare(
					"UPDATE
						$wpdb->terms
					JOIN (
						SELECT @RANK := %d
					) AS r
					INNER JOIN (
						SELECT
							t.term_id,
							t.name,
							t.term_order
						FROM $wpdb->terms as t
						INNER JOIN $wpdb->term_taxonomy AS tt ON tt.term_id = t.term_id
						WHERE
							tt.taxonomy = %s
							AND parent = ( SELECT parent FROM $wpdb->term_taxonomy WHERE term_id = %d )
							AND t.term_order >= %d
							AND t.term_id NOT IN (%d,%d)
						ORDER BY
							t.term_order ASC
					) AS term_ordered ON wp_terms.term_id = term_ordered.term_id
					SET
						wp_terms.term_order=@RANK:=@RANK+1;",
					$sequence_start,
					$taxonomy,
					$term_moved_id,
					$sequence_start,
					$term_target_id,
					$term_moved_id
				)
			);
		}
	}
}
