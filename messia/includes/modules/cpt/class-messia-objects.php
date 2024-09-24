<?php
/**
 * Messia_Objects
 *
 * @package Messia\Modules\CustomPostTypes
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Modules\Cpt;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Exception;
use Smartbits\Messia\Includes\Helpers\Messia_Help;
use Smartbits\Messia\Includes\Helpers\Messia_Help_Database;
use WP_Query;
use WP_Post;
use WP_Term;
use WP_REST_Request;
use WP_HTTP_Response;
use WP_REST_Response;
use WP_REST_Server;

/**
 * Responsible for all operations in backend
 * and frontend with listing pages and taxonomies terms.
 *
 * @package Messia\Modules\CustomPostTypes
 */
class Messia_Objects {

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Objects
	 */
	private static ?Messia_Objects $instance = null; // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

	/**
	 * Instance of class for taxonomy manipulations.
	 *
	 * @var Messia_Cpt_Config
	 */
	private Messia_Cpt_Config $cpt_config;

	/**
	 * Configuration of all Messia custom taxonomies.
	 *
	 * @var array
	 */
	private array $cpt_config_taxes;

	/**
	 * Full class name.
	 *
	 * @var Messia_Help
	 */
	private string $helpers;

	/**
	 * Full class name.
	 *
	 * @var Messia_Help_Database
	 */
	private string $helpers_database;

	/**
	 * The blog settings.
	 *
	 * @var array
	 */
	private array $blog_settings;

	/**
	 * Google geocoder response.
	 *
	 * @var string
	 */
	private string $google_geocoder_errors;

	/**
	 * Messia_Objects Constructor.
	 */
	private function __construct() {

		$this->cpt_config       = MIA()->get_module_cpt_config();
		$this->cpt_config_taxes = $this->cpt_config->get_custom_taxonomies_config();
		$this->helpers          = MIA()->get_module_helpers();
		$this->helpers_database = MIA()->get_module_helpers();
		$this->blog_settings    = MIA()->get_module_settings()->get_blog_setting( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME );
		$this->init_hooks();
	}

	/**
	 * Messia_Objects Instance.
	 * Ensures only one instance of Messia_Objects is loaded or can be loaded.
	 *
	 * @return Messia_Objects Instance.
	 */
	public static function instance(): Messia_Objects {

		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * All required WP action handlers.
	 *
	 * @return void
	 */
	private function init_hooks(): void {

		add_action( 'init', [ $this, 'admin_headers' ] );

		add_action( 'add_meta_boxes_messia_object', [ $this, 'add_object_metaboxes_stuff' ] );
		add_action( 'add_meta_boxes_messia_object', [ $this, 'add_object_metaboxes_constructor' ] );

		add_action( 'save_post_messia_object', [ $this, 'save_object' ], 10, 3 );
		add_action( 'wp_insert_post', [ $this, 'saved_object' ], 10, 3 );
		add_action( 'rest_insert_messia_object', [ $this, 'on_update_object_rest' ], 10, 3 );

		add_action( 'restrict_manage_posts', [ $this, 'add_list_filtering' ], 10, 2 );

		add_filter( 'manage_messia_object_posts_columns', [ $this, 'add_column_object' ], 10 );
		add_filter( 'manage_messia_object_posts_custom_column', [ $this, 'add_column_object_data' ], 10, 2 );

		add_filter( 'post_row_actions', [ $this, 'site_rating_quick_edit' ], 10, 2 );
		add_filter( 'messia_object_property_row_actions', [ $this, 'site_rating_quick_edit' ], 10, 2 );

		add_filter( 'manage_edit-messia_object_sortable_columns', [ $this, 'add_sortable_columns' ], 10 );
		add_filter( 'pre_get_posts', [ $this, 'set_object_column_order' ], 10 );
		add_filter( 'posts_orderby', [ $this, 'set_objects_column_orderby' ], 10, 2 );

		add_action( 'wp_ajax_object_site_rating_get', [ $this, 'site_rating_get' ] );
		add_action( 'wp_ajax_object_site_rating_set', [ $this, 'site_rating_set' ] );

		add_action( 'wp_update_term_data', [ $this, 'on_edit_term' ], 10, 4 );
		add_action( 'wp_insert_term_data', [ $this, 'on_insert_term' ], 10, 3 );
		add_action( 'created_messia_object_segment', [ $this, 'on_created_segment' ], 10, 2 );
		add_action( 'delete_messia_object_segment', [ $this, 'on_deleted_segment' ], 10, 4 );
		add_action( 'delete_messia_object_category', [ $this, 'on_deleted_category' ], 10, 4 );

		add_action( 'add_meta_boxes_page', [ $this, 'add_page_metaboxes' ] );
		add_action( 'save_post_page', [ $this, 'save_page' ], 10, 3 );
		add_filter( 'wp_insert_post_data', [ $this, 'on_update_post' ], 10, 3 );

		add_filter( 'map_meta_cap', [ $this, 'messia_segment_cap' ], 10, 4 );

		add_filter( 'post_edit_category_parent_dropdown_args', [ $this, 'admin_metabox_parent_dropdown' ], 10 );

		$this->toggle_delete_post_hooks( 'add' );
	}

	/**
	 * Callback for WP add_meta_boxes_messia_object action.
	 * Output metabox with stuff fields.
	 *
	 * @param WP_Post $post Current post.
	 *
	 * @return void
	 */
	public function add_object_metaboxes_stuff( WP_Post $post ): void {

		$fields = $this->cpt_config_taxes['messia_object_segment']['post_stuff_fields'];

		if ( empty( $fields ) || count( $fields ) === 0 ) {
			return;
		}

		// Metabox of service fields.
		$actual_meta        = [];
		$post_segment_terms = $this->helpers_database::get_post_terms( [ (int) $post->ID ], [ 'messia_object_segment' ] );

		foreach ( $post_segment_terms as $post_segment_term ) {

			add_meta_box(
				"segment-stuff-term-id-{$post_segment_term->term_id}",
				__( 'Messia Stuff', 'messia' ),
				function( $post ) use ( $fields, $post_segment_term ) {

					$html = null;

					foreach ( $fields as $field ) {

						$field_html    = null;
						$meta_key      = str_replace( [ '%name%', '%Id%' ], [ $field['id'], $post_segment_term->term_id ], MESSIA_POSTMETA_STUFF_NAME );
						$actual_meta[] = $meta_key;

						$meta_value                     = get_post_meta( $post->ID, $meta_key, true );
						( ! $meta_value ) ? $meta_value = $field['default_value'] : null;

						$id = "_stuff_meta[{$post_segment_term->term_id}][{$field['id']}]";
						switch ( $field['type'] ) {

							case 'textarea':
								$field_html = "<textarea name='{$id}' id='{$id}' rows='3' cols='50'>{$meta_value}</textarea>";
								break;

							case 'text':
								$field_html = "<input type='text' name='{$id}' id='{$id}' value='{$meta_value}'/>";
								break;

							case 'checkbox':
								$checked    = checked( $meta_value, 1, false );
								$field_html = "<input type='hidden' name='{$id}' id='{$id}' value=0 />
											   <input type='checkbox' name='{$id}' id='{$id}' {$checked} value=1 />";
								break;

							default:
								throw new Exception( 'Unknown meta field type of taxonomy term.' );
						}

						$html .= "<div class='field'><label>{$field_html}{$field['label']}<span class='messia-help-tip' title='{$field['tooltip']}'></span></label></div>";
					}

					$this->helpers::clean_stuff_meta( $actual_meta );

					echo "<div class='metabox-stuff-fields'>{$html}</div>";
					wp_nonce_field( 'messia_metabox', 'messia_nonce', false );
				},
				'messia_object',
				'side',
				'high'
			);
		}
	}

	/**
	 * Callback for WP add_meta_boxes_{messia_object} action.
	 * Output metabox with constructor fields.
	 *
	 * @param WP_Post $post Current post.
	 *
	 * @return void
	 */
	public function add_object_metaboxes_constructor( WP_Post $post ): void {

		$post_segment_terms = [];

		if ( isset( $_GET['fetch-metabox-for-term'] ) && ! wp_verify_nonce( $_GET['messia_nonce'], 'messia_metabox' ) ) {
			return;
		}

		if ( isset( $_GET['fetch-metabox-for-term'] ) ) {
			$post_segment_terms[] = (object) get_term_by( 'id', (int) $_GET['fetch-metabox-for-term'], 'messia_object_segment' );
		} else {
			add_action( 'admin_enqueue_scripts', [ $this, 'code_mirror' ] );
			$post_segment_terms = $this->helpers_database::get_post_terms( [ $post->ID ], [ 'messia_object_segment' ] );
		}

		/*
		 * If segment term was deleted, then all existing objects
		 * that belongs to it lost their only one segment and user
		 * should assign it himself. So we show empty metabox with
		 * ID = 0 (same in radio_term_selector when no prev state exists)
		 */
		if ( empty( $post_segment_terms ) ) {

			add_meta_box(
				'segment-constructor-term-id-0',
				__( 'Messia Custom Fields', 'messia' ),
				function( WP_Post $post ) {
					esc_html_e( 'Attach an object to a segment to allow custom fields.', 'messia' );
					wp_nonce_field( 'messia_metabox', 'messia_nonce', false );
				},
				'messia_object',
				'normal',
				'high'
			);
		}

		// Metabox of constructor fields.
		foreach ( $post_segment_terms as $post_segment_term ) {

			$meta_value = (object) [];
			$meta_key   = str_replace( '%Id%', (string) $post_segment_term->term_id, MESSIA_POSTMETA_CONSTRUCTED_NAME );
			$fields     = $this->helpers::messia_get_term_meta( (int) $post_segment_term->term_id, 'constructor_cf' );

			if ( metadata_exists( 'post', $post->ID, $meta_key ) ) {
				$meta_value = get_post_meta( $post->ID, $meta_key, true );

				// TODO - remove it.
				if ( is_string( $meta_value ) ) {
					$meta_value = json_decode( $meta_value );
				} else {
					$meta_value = (object) $meta_value;
				}

				// json_decode('[]') return array, not stdClss.
				if ( is_array( $meta_value ) ) {
					$meta_value = (object) $meta_value;
				}
			}

			add_meta_box(
				"segment-constructor-term-id-{$post_segment_term->term_id}",
				__( 'Messia Custom Fields', 'messia' ),
				function( WP_Post $post ) use ( $fields, $post_segment_term, $meta_value ) {

					$element_html = null;
					$segment_link = get_admin_url( null, "term.php?taxonomy=messia_object_segment&tag_ID={$post_segment_term->term_id}&post_type=messia_object" );

					if ( empty( $fields ) || count( $fields ) === 0 ) {
						printf(
							// translators: %1$s - open html tag, %2$s - term html tag, %3$s - close html tag.
							__( '%1$sThe constructor for this term is empty. You can create fields set on the segment page %2$s.%3$s', 'messia' ),
							'<p>',
							"<a href='{$segment_link}'>{$post_segment_term->name}</a>",
							'</p>'
						);
						wp_nonce_field( 'messia_metabox', 'messia_nonce', false );
						return;
					}

					printf(
						// translators: %1$s - open html tag, %2$s - term html tag, %3$s - close html tag.
						__( '%1$sYou can modify the field set on the segment page %2$s.%3$s', 'messia' ),
						'<p>',
						"<a href='{$segment_link}'>{$post_segment_term->name}</a>",
						'</p>'
					);
					foreach ( $fields as $field ) {

						switch ( $field['field_type'] ) {

							case 'input_text':
							case 'input_link':
							case 'input_textarea':
							case 'input_address':
							case 'input_images':
							case 'input_checkbox':
							case 'input_number':
							case 'input_external_media':
							case 'input_html':
							case 'select_post_single':
							case 'select_post_multi':
								$pattern       = $this->cpt_config_taxes['messia_object_segment']['post_custom_fields'][ $field['field_type'] ];
								$element_html .= $this->prepare_constructor_metabox_field( $pattern, $field, $post_segment_term, $meta_value );
								break;

							default:
								$element_html .= '<div class="field"><label>There is no description of the logic for the field <i>' . $field['field_type'] . '</i></label></div>';
								break;
						}
					}

					echo "<div class='metabox-constructor-fields'>{$element_html}</div>";
					wp_nonce_field( 'messia_metabox', 'messia_nonce', false );
				},
				'messia_object',
				'normal',
				'high'
			);
		}
	}

	/**
	 * Prepare HTML code for constructed constructor fields to the admin page of the object.
	 *
	 * @see Smartbits\Messia\Includes\Modules\Cpt\add_object_metaboxes_constructor()
	 *
	 * @param array  $pattern           Custom field HTML configuration.
	 * @param array  $field             Current constructed value of field in post.
	 * @param object $post_segment_term Segment taxonomy term.
	 * @param object $meta_value        Current constructed value of field in term.
	 *
	 * @return string HTML code for filed in post.
	 */
	private function prepare_constructor_metabox_field( array $pattern, array $field, object $post_segment_term, object $meta_value ): string {

		$atts              = [];
		$options           = [];
		$images_html       = null;
		$element_html      = $pattern['html'];
		$element_html_type = $pattern['html_type'];

		foreach ( $pattern['settings'] as $setting => $value ) {
			if ( 'titles' === $value['scope'] ) {
				if ( 'name' === $setting ) {

					$element_html = str_replace( '%name%', $field['name'], $element_html );

				} elseif ( 'slug' === $setting ) {

					// NAMES.
					$name = str_replace( '%Id%', (string) $post_segment_term->term_id, MESSIA_POSTMETA_CONSTRUCTED_NAME );

					if ( 'select_multi' === $element_html_type ) {

						$element_html = str_replace( '%slug-hidden%', "{$name}[{$field['slug']}]", $element_html );
						$element_html = str_replace( '%slug%', "{$name}[{$field['slug']}][]", $element_html );

					} else {

						$element_html = str_replace( '%slug%', "{$name}[{$field['slug']}]", $element_html );
					}

					// VALUES.
					if ( empty( (array) $meta_value ) ) {
						// new post.
						$value = $pattern['default'];
					} else {
						// existing post.
						$value = $meta_value->{$field['slug']};
					}

					if ( 'input_checkbox' === $field['field_type'] ) {

						( 1 === (int) $value ) ? $checked = 'checked="true"' : $checked = null;
						$element_html                     = str_replace( '%checked%', $checked, $element_html );

					} elseif ( 'input_textarea' === $field['field_type'] || 'input_external_media' === $field['field_type'] || 'input_html' === $field['field_type'] ) {

						$element_html = str_replace( '%value%', $value, $element_html );

					} elseif ( 'input_images' === $field['field_type'] ) {
						// TODO - remove it.
						if ( is_string( $value ) ) {
							$value = json_decode( $value );
						}

						$inputs_html = [];

						if ( ! empty( $value ) ) {
							$images_html = $this->helpers::get_media_icon_admin( $value, true );
							foreach ( $value as $index => $images_data ) {
								foreach ( $images_data as $image_key => $key_value ) {
									$inputs_html[] = "<input type='hidden' name='{$name}[{$field['slug']}][{$index}][{$image_key}]' value='{$key_value}'>";
								}
							}
						}

						$element_html = str_replace( '%inputs-hidden%', implode( "\n", $inputs_html ), $element_html );
						$element_html = str_replace( '%saved-images%', (string) $images_html, $element_html );

					} elseif ( 'input_link' === $field['field_type'] ) {

						$linked     = null;
						$link_title = null;
						$link_url   = null;

						if ( ! empty( $value ) ) {
							$link_title = $value->title;
							$link_url   = $value->url;
							$linked     = 'linked';
						}
						$element_html = str_replace( '%value-title%', "value='{$link_title}'", $element_html );
						$element_html = str_replace( '%value-url%', "value='{$link_url}'", $element_html );
						$element_html = str_replace( '%linked%', $linked, $element_html );

					} elseif ( 'input_address' === $field['field_type'] ) {

						// TODO - remove it.
						if ( is_array( $value ) ) {
							$value = (object) $value;
						}

						$element_html = str_replace( '%geocoded%', (string) $value->geocoded, $element_html );
						$element_html = str_replace( '%value-user-address%', $value->user_address, $element_html );
						$element_html = str_replace( '%value-lat%', "value='{$value->latitude}'", $element_html );
						$element_html = str_replace( '%value-long%', "value='{$value->longitude}'", $element_html );
						$element_html = str_replace( '%value-geocoded%', "value='{$value->geocoded}'", $element_html );

					} elseif ( 'select_multi' !== $element_html_type && 'select_single' !== $element_html_type ) {
						$element_html = str_replace( '%value%', "value='{$value}'", $element_html );
					}
				}
			} elseif ( 'atts' === $value['scope'] ) {

				$atts[] = "{$setting}='{$field[ $setting ]}'";

			} elseif ( 'options' === $value['scope'] ) {

				global $wpdb;

				switch ( $field[ $setting ] ) {
					case 'page':
					case 'post':
						$posts = $wpdb->get_results(
							$wpdb->prepare(
								"SELECT
									ID,
									post_title
								FROM $wpdb->posts
								WHERE
									post_type = %s
									AND post_status = 'publish'
								ORDER BY post_title ASC;",
								$field[ $setting ]
							),
							OBJECT
						);
						break;

					case 'messia_object':
						$posts = $wpdb->get_results(
							$wpdb->prepare(
								"SELECT
									ID,
									post_title
								FROM $wpdb->posts
								LEFT JOIN $wpdb->term_relationships ON $wpdb->posts.ID = $wpdb->term_relationships.object_id
								WHERE
									$wpdb->term_relationships.term_taxonomy_id IN (%d)
									AND $wpdb->posts.post_type = 'messia_object'
									AND post_status = 'publish'
								GROUP BY $wpdb->posts.ID
								ORDER BY $wpdb->posts.post_date DESC;",
								$post_segment_term->term_id
							),
							OBJECT
						);
						break;
				}

				// VALUES.
				if ( 'select_post_single' === $field['field_type'] ) {

					$options[] = "<option value='-1'>" . __( 'Choose an option', 'messia' ) . '</option>';

					foreach ( $posts as $post ) {
						( isset( $meta_value->{$field['slug']} ) && $meta_value->{$field['slug']} === $post->ID ) ? $selected = 'selected' : $selected = null;
						$options[] = '<option ' . $selected . " value='{$post->ID}'>{$post->post_title}</option>";
					}
				} elseif ( 'select_post_multi' === $field['field_type'] ) {

					foreach ( $posts as $post ) {
						if ( isset( $meta_value->{$field['slug']} ) && 'null' !== $meta_value->{$field['slug']} ) {

							( in_array( $post->ID, $meta_value->{$field['slug']}, true ) ) ? $selected = 'selected' : $selected = null;
							$options[] = '<option ' . $selected . " value='{$post->ID}'>{$post->post_title}</option>";
						} else {
							$options[] = "<option value='{$post->ID}'>{$post->post_title}</option>";
						}
					}
				}
			}
		}

		if ( isset( $pattern['placeholder'] ) ) {
			$element_html = str_replace( '%placeholder%', $pattern['placeholder'], $element_html );
		}

		$element_html = str_replace( '%atts%', implode( ' ', $atts ), $element_html );
		$element_html = str_replace( '%options%', implode( '', $options ), $element_html );
		$element_html = str_replace( '%tooltip%', "<span class='messia-help-tip' title='{$pattern['tooltip']}'></span>", $element_html );
		$element_html = preg_replace( '/(?<=>)\s+(?=<)/m', '', $element_html );

		return $element_html;
	}

	/**
	 * Callback for WP save_post_{messia_object} action.
	 * Triggers for existing posts.
	 * Save all object metadata.
	 *
	 * @param int     $post_id Post ID.
	 * @param WP_Post $post    Post object.
	 * @param bool    $update  Whether this is an existing post being updated.
	 *
	 * @return void
	 */
	public function save_object( int $post_id, WP_Post $post, bool $update ): void {

		if ( ! $this->if_to_save_post( $post_id, $post ) || 'messia_object' !== $post->post_type ) {
			return;
		}

		$this->complete_category_chain( $post->ID );

		$post_segment_terms = $this->helpers::get_post_terms( [ (int) $post_id ], [ 'messia_object_segment' ] );

		foreach ( $post_segment_terms as $post_segment_term ) {

			$meta_key_constructor = str_replace( '%Id%', (string) $post_segment_term->term_id, MESSIA_POSTMETA_CONSTRUCTED_NAME );
			$term_constructed     = get_term_meta( $post_segment_term->term_id, 'constructor_cf', true );

			// nonce verified in $this->if_to_save_post.
			// phpcs:disable WordPress.Security.NonceVerification.Missing
			if ( isset( $_POST[ $meta_key_constructor ] ) ) {

				$object_constructed = $_POST[ $meta_key_constructor ];
				$fields_in_term     = array_column( $term_constructed, 'slug' );
				$fields_in_object   = array_keys( $object_constructed );
				$fields_orphans     = array_diff( $fields_in_term, $fields_in_object );

				foreach ( $fields_orphans as $field_orphan_slug ) {
					$index      = array_search( $field_orphan_slug, array_column( $term_constructed, 'slug' ), true );
					$field_type = $term_constructed[ $index ]['field_type'];
					$default    = $this->cpt_config_taxes['messia_object_segment']['post_custom_fields'][ $field_type ]['default'];

					$object_constructed[ $field_orphan_slug ] = $default;
				}

				foreach ( $object_constructed as &$value ) {
					if ( is_numeric( $value ) ) {

						$f = (float) $value;
						$i = (int) $value;

						$value = ( $f === $i ) ? $i : $f;
					}
				}

				foreach ( $term_constructed as $constructor_field ) {

					switch ( $constructor_field['field_type'] ) {
						case 'input_address':
							$geo_data = $object_constructed[ $constructor_field['slug'] ];

							$object_constructed[ $constructor_field['slug'] ] = $this->geocode( $geo_data );
							break;
					}
				}

				update_post_meta( $post_id, $meta_key_constructor, wp_slash( wp_json_encode( wp_unslash( $object_constructed ) ) ) );
			}

			if ( isset( $_POST['_stuff_meta'] ) ) {

				$stuff_constructed = $_POST['_stuff_meta'];
				// phpcs:enable WordPress.Security.NonceVerification.Missing

				foreach ( $stuff_constructed as $term_id => $stuff_meta_data ) {
					foreach ( $stuff_meta_data as $meta_key_stuff => $meta_value_stuff ) {

						$meta_key = str_replace( [ '%name%', '%Id%' ], [ $meta_key_stuff, (string) $term_id ], MESSIA_POSTMETA_STUFF_NAME );
						update_post_meta( $post_id, $meta_key, $meta_value_stuff );
					}
				}
			}
		}
	}

	/**
	 * Callback for WP wp_insert_post action.
	 * Set default meta values and segment for new inserted object.
	 * Set default category and (or) property for any object if non provided.
	 * Removes site rating meta for segemnts terms that
	 * post does not belongs to.
	 *
	 * @param int     $post_id Post ID.
	 * @param WP_Post $post    Post object.
	 * @param bool    $update  Whether this is an existing post being updated.
	 *
	 * @return void
	 * @throws Exception If no default value for meta field provided.
	 */
	public function saved_object( int $post_id, WP_Post $post, bool $update ): void {

		if ( 'messia_object' !== $post->post_type ) {
			return;
		}

		global $pagenow;

		$object_messia_category = wp_get_post_terms( $post_id, 'messia_object_category', [ 'fields' => 'ids' ] );
		$object_messia_property = wp_get_post_terms( $post_id, 'messia_object_property', [ 'fields' => 'ids' ] );

		if ( 'post-new.php' === $pagenow ) {
			if ( false === $update && 'auto-draft' === $post->post_status ) {
				wp_set_post_terms( $post_id, [ $this->blog_settings['default_segment'] ], 'messia_object_segment' );
			}
			if ( 'auto-draft' !== $post->post_status ) {
				if ( empty( $object_messia_category ) ) {
					wp_set_post_terms( $post_id, [ $this->blog_settings['default_category'] ], 'messia_object_category' );
				}

				if ( empty( $object_messia_property ) ) {
					wp_set_post_terms( $post_id, [ $this->blog_settings['default_property'] ], 'messia_object_property' );
				}
			}
		}

		$notin = [];

		// Create a metadata of constructor with default data.
		$post_segment_terms = $this->helpers::get_post_terms( [ $post_id ], [ 'messia_object_segment' ] );

		foreach ( $post_segment_terms as $post_segment_term ) {

			$notin[]  = str_replace( '%Id%', (string) $post_segment_term->term_id, MESSIA_SITERATING_NAME );
			$meta_key = str_replace( '%Id%', (string) $post_segment_term->term_id, MESSIA_POSTMETA_CONSTRUCTED_NAME );

			$meta_value = get_post_meta( $post_id, $meta_key, true );
			$fields     = get_term_meta( $post_segment_term->term_id, 'constructor_cf', true );

			if ( ! empty( $meta_value ) || ! is_array( $fields ) ) {
				continue;
			}

			$default_meta_value = [];

			foreach ( $fields as $field ) {

				if ( ! isset( $this->cpt_config_taxes['messia_object_segment']['post_custom_fields'][ $field['field_type'] ]['default'] ) ) {
					throw new Exception( 'Default value for field type "' . $field['field_type'] . '" not found' );
				}

				$default_meta_value[ $field['slug'] ] = $this->cpt_config_taxes['messia_object_segment']['post_custom_fields'][ $field['field_type'] ]['default'];
			}

			update_post_meta( $post_id, $meta_key, $default_meta_value );
		}

		/*
		 * Remove site ratings and criteria values
		 * for terms that object does not belongs to.
		 */
		global $wpdb;

		$notin      = "'" . implode( "','", esc_sql( $notin ) ) . "'";
		$rating_key = str_replace( '%Id%', '%', MESSIA_SITERATING_NAME );

		$sql =
			"SELECT *
			FROM $wpdb->postmeta
			WHERE
				post_id = $post_id
				AND meta_key LIKE '$rating_key'
				AND meta_key NOT IN ($notin);";

		$metas = $wpdb->get_results( $sql ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

		if ( count( $metas ) > 0 ) {

			$meta_ids = $this->helpers::adjust_object_site_criteria( $metas );
			$meta_ids = implode( ',', array_map( 'intval', $meta_ids ) );

			$sql =
				"DELETE
				FROM $wpdb->postmeta
				WHERE meta_id in ($meta_ids);";

			$wpdb->query( $sql ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
		}
	}

	/**
	 * Callback for WP rest_insert_{messia_object} action.
	 * Set default segment, category and property for object.
	 *
	 * @param WP_Post         $post     Inserted or updated post object.
	 * @param WP_REST_Request $request  Request object.
	 * @param bool            $creating True when creating a post, false when updating.
	 *
	 * @return void
	 */
	public function on_update_object_rest( WP_Post $post, WP_REST_Request $request, bool $creating ): void {

		$send_reload_command = false;

		if (
			'trash' === $post->post_status ||
			'auto-draft' === $post->post_status ||
			! current_user_can( 'edit_page', $post->ID )
		) {
			return;
		}

		$post_segment_terms_before = $this->helpers::get_post_terms( [ $post->ID ], [ 'messia_object_segment' ] );

		add_action(
			'rest_after_insert_messia_object',
			function( WP_Post $post, WP_REST_Request $request ) use ( $post_segment_terms_before, $send_reload_command ) {

				/**
				 * This was actual when new post by default did not belongs to any segment term.
				 * Now front update metaboxes dynamically.
				 *
				 * @reload
				 */
				if ( true === $send_reload_command ) {

					$post_segment_terms_after = $this->helpers::get_post_terms( [ $post->ID ], [ 'messia_object_segment' ] );

					$b = count( $post_segment_terms_before );
					$a = count( $post_segment_terms_after );

					if ( ( 0 === $b && $a > 0 ) || ( $b > 0 && 0 === $a ) ) {
						add_action( 'rest_post_dispatch', [ $this, 'object_update_rest' ], 10, 3 );
					}
				}

				$this->complete_category_chain( $post->ID );
			},
			10,
			3
		);
	}

	/**
	 * Callback for WP rest_post_dispatch filter.
	 * Add custom param to response to inform client
	 * that page reload requires.
	 *
	 * @param WP_HTTP_Response $result  Result to send to the client. Usually a WP_REST_Response.
	 * @param WP_REST_Server   $server  Server instance.
	 * @param WP_REST_Request  $request Request used to generate the response.
	 *
	 * @return WP_REST_Response
	 */
	public function object_update_rest( WP_HTTP_Response $result, WP_REST_Server $server, WP_REST_Request $request ): WP_REST_Response {

		$result->data['messiaData'] = [
			'reload' => true,
		];
		return $result;
	}

	/**
	 * Callback for WP restrict_manage_posts filters.
	 * Adds dropdown to filter objects by segment in admin
	 *
	 * @param string $post_type Registered post type name.
	 * @param string $which     Top | bottom The location of the extra table nav markup.
	 *
	 * @return void
	 */
	public function add_list_filtering( string $post_type, string $which ): void {

		if ( 'messia_object' !== $post_type ) {
			return;
		}

		$all_segment_terms = $this->helpers::get_terms_segment();

		if ( ! $all_segment_terms ) {
			return;
		}

		$selected = null;
		$options  = '<option value="">' . __( 'All segments', 'messia' ) . '</option>';

		foreach ( $all_segment_terms as $segment_term ) {

			// phpcs:disable WordPress.Security.NonceVerification.Recommended
			if ( isset( $_GET['messia_object_segment'] ) ) {
				$selected = selected( $_GET['messia_object_segment'], $segment_term->slug, false );
				// phpcs:enable WordPress.Security.NonceVerification.Recommended
			}
			$options .= "<option value='{$segment_term->slug}' {$selected}>{$segment_term->name}</option>";
		}

		echo "<select name='messia_object_segment' id='dropdown_messia_object_segment'>{$options}</select>";
	}

	/**
	 * Callback for WP manage_{messia_object}_posts_columns filter.
	 * Adds column with site rating to object's list in admin.
	 *
	 * @param array $columns The column header labels keyed by column ID.
	 *
	 * @return array
	 */
	public function add_column_object( array $columns ): array {

		$new_columns = [
			'messia_site_rating' => __( 'Rating', 'messia' ),
		];

		return array_slice( $columns, 0, 2 ) + $new_columns + $columns;
	}

	/**
	 * Callback for WP manage_{messia_object}_posts_custom_column filter.
	 * Fill site rating column for object's list with data.
	 *
	 * @param string $column_name The name of the column to display.
	 * @param int    $post_id     The current post ID.
	 *
	 * @return void
	 */
	public function add_column_object_data( string $column_name, int $post_id ): void {

		global $post;

		if ( 'messia_site_rating' !== $column_name ) {
			return;
		}

		$html = '—';
		$val  = [];

		$post_segment_terms = $this->helpers::get_post_terms( [ (int) $post->ID ], [ 'messia_object_segment' ] );

		foreach ( $post_segment_terms as $post_segment_term ) {

			$rating_key       = str_replace( '%Id%', (string) $post_segment_term->term_id, MESSIA_SITERATING_NAME );
			$avg_rating_value = get_post_meta( $post->ID, $rating_key, true );

			if ( $avg_rating_value ) {
				$val[] = $avg_rating_value;
			}
		}
		if ( count( $val ) > 0 ) {
			$html = implode( '<br>', $val );
		}
		echo sprintf( '<span data-id=' . $post->ID . ' class="set_site_rating">%s</span>', $html );
	}

	/**
	 * Callback for WP post_row_actions and {messia_object}_property_row_actions filters.
	 * Adds data to post quick edit.
	 *
	 * @param array  $actions An array of row action links.
	 * @param object $post    The post object.
	 *
	 * @return array @actions
	 */
	public function site_rating_quick_edit( array $actions, object $post ): array {

		if ( 'messia_object' !== $post->post_type ) {
			return $actions;
		}
		// Adding links to the "quick edit" panel of an object.
		// $actions['messia_site_rating'] = sprintf( '<a class="set_site_rating" href="">%s</a>', __( 'Rating', 'messia' ) );

		return $actions;
	}

	/**
	 * Callback for WP manage_edit-{messia_object_property}_sortable_columns filter.
	 * Add sortable columns for property terms list.
	 *
	 * @param array $columns An array of sortable columns.
	 *
	 * @return array
	 */
	public function add_sortable_columns( array $columns ): array {

		$columns['messia_site_rating'] = 'messia_site_rating';

		// To make a column 'un-sortable' remove it from the array.
		// unset($columns['date']);

		return $columns;
	}

	/**
	 * Callback for WP pre_get_posts filter.
	 * Add ability to sort objects in admin by column rating
	 *
	 * @param WP_Query $query The WP_Query instance (passed by reference).
	 *
	 * @return void
	 */
	public function set_object_column_order( WP_Query $query ): void {

		global $pagenow;

		if ( ! is_admin() || 'edit.php' !== $pagenow ) {
			return;
		}
		// phpcs:disable WordPress.Security.NonceVerification.Recommended
		if ( ! isset( $_GET['post_type'] ) ) {
			return;
		}
		if ( isset( $_GET['post_type'] ) && 'messia_object' !== $_GET['post_type'] ) {
			return;
		}
		// phpcs:enable WordPress.Security.NonceVerification.Recommended

		$orderby = $query->get( 'orderby' );

		if ( 'messia_site_rating' === $orderby ) {

			$conditions = [ 'relation' => 'OR' ];
			$segments   = $this->helpers::get_terms_segment();

			if ( ! $segments ) {
				return;
			}

			foreach ( $segments as $segment ) {
				$conditions[] = [
					'key'     => str_replace( '%Id%', (string) $segment->term_id, MESSIA_SITERATING_NAME ),
					'compare' => 'EXISTS',
				];
				$conditions[] = [
					'key'     => str_replace( '%Id%', (string) $segment->term_id, MESSIA_SITERATING_NAME ),
					'compare' => 'NOT EXISTS',
				];
			}

			$query->set( 'meta_query', $conditions );
		}
	}

	/**
	 * Callback for WP posts_orderby filter.
	 * Add ability to sort objects in admin by column rating
	 *
	 * @param string   $orderby The ORDER BY clause of the query.
	 * @param WP_Query $query   The WP_Query instance (passed by reference).
	 *
	 * @return string
	 */
	public function set_objects_column_orderby( string $orderby, WP_Query $query ): string {

		global $pagenow;

		if ( ! is_admin() || 'edit.php' !== $pagenow ) {
			return $orderby;
		}
		// phpcs:disable WordPress.Security.NonceVerification.Recommended
		if ( ! isset( $_GET['post_type'] ) ) {
			return $orderby;
		}
		if ( isset( $_GET['post_type'] ) && 'messia_object' !== $_GET['post_type'] ) {
			return $orderby;
		}
		// phpcs:enable WordPress.Security.NonceVerification.Recommended

		$query_orderby = $query->get( 'orderby' );

		if ( 'messia_site_rating' === $query_orderby ) {

			// TODO - fields for sorting 'mt1.meta_value' add in a loop as much times as number of terms in segments.
			// Each segment will have a sequence number in mt - mt1, mt2 ... mtN.
			$orderby = "mt1.meta_value {$query->get( 'order')}";
		}

		return $orderby;
	}

	/**
	 * Handler for AJAX wp_ajax_object_site_rating_get event.
	 * Return site rating HTML block for post in request to show in admin.
	 *
	 * @return void
	 */
	public function site_rating_get(): void {

		$dialog_title = __( 'Assessment of the site by site criteria', 'messia' );

		if ( check_ajax_referer( 'messiaBackendAjax', 'messiaNonce', false ) ) {

			$code    = 200;
			$post_id = $_POST['data']['data']['post_id'];

			$post_segment_terms  = $this->helpers::get_post_terms( [ (int) $post_id ], [ 'messia_object_segment' ] );
			$post_segment_number = count( $post_segment_terms );
			$rating_criterias    = json_decode( $this->blog_settings['site_rating_terms'], true );

			if ( empty( $rating_criterias ) ) {

				$code        = 400;
				$dialog_html = '<div>' . __( 'Rating criteria guide is empty.', 'messia' ) . '</div>';

			} elseif ( empty( $post_segment_number ) ) {

				$code        = 400;
				$dialog_html = '<div>' . __( 'Object does not belong to any segment.', 'messia' ) . '</div>';

			} else {

				$i = 0;
				ob_start();

				?>
				<div id="description"><?php esc_html_e( 'Set rating values for existing criteria on a scale of 1 to 5 at any interval. If the object should not be evaluated by any criterion at all, delete the rating value for this criterion. Deleting rating values for all criteria within a segment will result in the evaluation of the object.', 'messia' ); ?></div>
				<table id="site-rating-setting">
					<tbody>
						<tr class="criteria">
							<th><?php esc_html_e( 'Evaluation criterion', 'messia' ); ?></th>
							<?php
							foreach ( $post_segment_terms as $post_segment_term ) {
								?>
								<th><?php echo $post_segment_term->name; ?></th>
								<?php
							}
							?>
						</tr>
						<?php

						$criteria_value = get_post_meta( $post_id, '_messia_site_rating_criteria', true );
						foreach ( $rating_criterias as $criteria_id => $criteria_name ) {
							?>
							<tr class="criteria data">
								<td><?php echo $criteria_name; ?></td>
								<?php
								foreach ( $post_segment_terms as $post_segment_term ) {

									$val = null;
									if ( $criteria_value && isset( $criteria_value[ $post_segment_term->term_id ] ) ) {
										$val = $criteria_value[ $post_segment_term->term_id ][ $criteria_id ];
									}
									?>
									<td>
										<input class="value" min="0" max="5" step="0.1" data-term-id="<?php echo $post_segment_term->term_id; ?>" name="<?php echo $criteria_id; ?>" type="number" placeholder="x" value="<?php echo $val; ?>">
									</td>
									<?php
								}
								?>
							</tr>
							<?php
						}

						?>
						<tr class="criteria average-values">
							<td><?php esc_html_e( 'Estimated value:', 'messia' ); ?></td>
							<?php
							foreach ( $post_segment_terms as $post_segment_term ) {

								$val = 'X';

								$rating_key       = str_replace( '%Id%', (string) $post_segment_term->term_id, MESSIA_SITERATING_NAME );
								$avg_rating_value = get_post_meta( $post_id, $rating_key, true );

								if ( $avg_rating_value ) {
									$val = $avg_rating_value;
								}
								?>
								<td data-term-id="<?php echo $post_segment_term->term_id; ?>"><?php echo $val; ?></td>
								<?php
							}
							?>
						</tr>
					</tbody>
				</table>
				<?php
				$dialog_html = ob_get_clean();
			}

			wp_send_json_success(
				[
					'code'        => $code,
					'dialogTitle' => $dialog_title,
					'dialogHtml'  => $dialog_html,
				]
			);
		} else {
			$dialog_html = '<div>' . __( 'Access violation - please reload the page and try again', 'messia' ) . '</div>';
			wp_send_json_error(
				[
					'code'        => 500,
					'dialogTitle' => $dialog_title,
					'dialogHtml'  => $dialog_html,
				]
			);
		}
	}

	/**
	 * Handler for AJAX wp_ajax_object_site_rating_set event.
	 * Saves user site criteria with values.
	 *
	 * @return void
	 */
	public function site_rating_set(): void {

		if ( check_ajax_referer( 'messiaBackendAjax', 'messiaNonce', false ) ) {

			$to_save_db = [
				'criterias' => [],
				'avg'       => [],
			];

			$post_id        = (int) $_POST['data']['data']['to_save']['post_id'];
			$to_save_client = $_POST['data']['data']['to_save'];

			/*
			 * There may be no criterion assessment at all.
			 * But it can be that they are not there for all the criteria of the segment.
			 * In this case, the meta data for the criteria and the average rating will be deleted.
			 */
			foreach ( $to_save_client['avg'] as $term_id => $average_value ) {

				$valid = preg_match( '/^(\d+(\.\d+)?)$/', $average_value );

				if ( ! $valid ) {
					$to_save_db['avg'][ (int) $term_id ] = false;
					unset( $to_save_client['criterias'][ $term_id ] );
				} else {
					$to_save_db['avg'][ $term_id ] = number_format( round( (float) $average_value, 2 ), 2, '.', '' );
				}
			}

			foreach ( $to_save_client['criterias'] as $term_id => $criterias ) {
				foreach ( $criterias as $criteria_id => $criteria_value ) {
					if ( empty( $criteria_value ) ) {

						$to_save_db['criterias'][ (int) $term_id ][ $criteria_id ] = null;
					} else {
						$to_save_db['criterias'][ (int) $term_id ][ $criteria_id ] = round( (float) $criteria_value, 2 );
					}
				}
			}

			// Saving.
			if ( 0 === count( $to_save_db['criterias'] ) ) {
				delete_post_meta( $post_id, '_messia_site_rating_criteria' );
			} else {
				update_post_meta( $post_id, '_messia_site_rating_criteria', $to_save_db['criterias'] );
			}

			foreach ( $to_save_db['avg'] as $term_id => $average_value ) {

				$rating_key = str_replace( '%Id%', (string) $term_id, MESSIA_SITERATING_NAME );

				if ( false === $average_value ) {
					delete_post_meta( $post_id, $rating_key );
					unset( $to_save_db['avg'][ $term_id ] );
				} else {
					update_post_meta( $post_id, $rating_key, $average_value );
				}
			}

			if ( 0 === count( $to_save_db['avg'] ) ) {
				$to_save_db['avg'][] = '—';
			}

			wp_send_json_success(
				[
					'code'        => 200,
					'site_rating' => implode( '<br>', $to_save_db['avg'] ),
				]
			);
		} else {

			wp_send_json_error(
				[
					'code'        => 500,
					'site_rating' => 'Err',
				]
			);
		}
	}

	/**
	 * Bulk adding or removing delete post handlers.
	 *
	 * @param string $action Add or Remove.
	 *
	 * @return void
	 * @throws Exception If $action has invalid value.
	 */
	private function toggle_delete_post_hooks( string $action ): void {

		if ( 'add' !== $action && 'remove' !== $action ) {
			throw new Exception( "Method expect 'action' argument value exactly one of 'add' or 'remove'. {$action} given" );
		}

		$fn = "{$action}_action";

		// Needed if Trash bin turned off.
		$fn( 'delete_post', [ $this, 'on_delete_post' ], 10 );
		$fn( 'wp_trash_post', [ $this, 'on_trash_post' ], 10 );
		// Prevent some terms move to trash.
		$fn( 'pre_trash_post', [ $this, 'on_pre_trash_post' ], 10, 2 );
		$fn( 'pre_delete_post', [ $this, 'on_pre_delete_post' ], 10, 3 );
		$fn( 'trashed_post', [ $this, 'on_deleted_post' ], 10 );
		$fn( 'deleted_post', [ $this, 'on_deleted_post' ], 10 );
	}

	/**
	 * Callback for WP add_meta_boxes_{page} action.
	 * Output metabox with constructor fields.
	 *
	 * @param WP_Post $post Current post.
	 *
	 * @return void
	 */
	public function add_page_metaboxes( WP_Post $post ): void {

		$title = __( 'SEO templates', 'messia' );

		add_meta_box(
			'page-seo-templates',
			$title,
			function( $post ) {

				$segment_terms = $this->helpers::get_terms_segment();
				$listing_page  = array_key_exists( $post->post_name, $segment_terms );
				$post_meta     = get_post_meta( $post->ID, '_page_seo_template', true );
				$placeholder   = __( 'Plain text and/or SEO placeholders', 'messia' );

				$meta_exists = metadata_exists( 'post', $post->ID, '_page_seo_template' );

				if ( false === $meta_exists ) {
					$post_meta = [
						'title'           => null,
						'description'     => null,
						'seo_title'       => null,
						'seo_description' => null,
					];
				}

				wp_nonce_field( 'messia_metabox', 'messia_nonce', false );

				if ( $listing_page ) {

					$help_text = '<p>' . __( 'Set the SEO template for this page. Templates differ by usage elements (title, description, h1 and query result). Content SEO fields support dynamic variables. View Help section in the Messia settings menu for more details.', 'messia' ) . '</p>';
				} else {

					$help_text = '<p>' . __( 'Set the SEO template for this page. Templates differ by usage elements (title, description, h1). This is a regular page, so no listing specific dynamic variables supports. Use only general dynamic variables and/or plain text!', 'messia' ) . '</p>';
				}
				echo $help_text;
				?>
			<div>
				<?php
					echo '<div>' . __( 'Tag Title:', 'messia' ) . '</div>';
					echo "<textarea class='messia' spellcheck='false' name='_page_seo_template[title]' placeholder='{$placeholder}'>{$post_meta['title']}</textarea>";
				?>
			</div>
			<div>
				<?php
					echo '<div>' . __( 'Tag Description:', 'messia' ) . '</div>';
					echo "<textarea class='messia' spellcheck='false' name='_page_seo_template[description]' placeholder='{$placeholder}'>{$post_meta['description']}</textarea>";
				?>
			</div>
			<div>
				<?php
					echo '<div>' . __( 'Tag H1:', 'messia' ) . '</div>';
					echo "<textarea class='messia' spellcheck='false' name='_page_seo_template[seo_title]' placeholder='{$placeholder}'>{$post_meta['seo_title']}</textarea>";
				?>
			</div>
			<div>
				<?php
				if ( $listing_page ) {

					echo '<div>' . __( 'Query result:', 'messia' ) . '</div>';
					echo "<textarea class='messia' spellcheck='false' name='_page_seo_template[seo_description]' placeholder='{$placeholder}'>{$post_meta['seo_description']}</textarea>";
				}
				?>
			</div>
				<?php
			}
		);
	}

	/**
	 * Callback for WP save_post_{page} action.
	 * Triggers for existing posts.
	 * Save all page metadata.
	 *
	 * @param int     $post_id Post ID.
	 * @param WP_Post $post    Post object.
	 * @param bool    $update  Whether this is an existing post being updated.
	 *
	 * @return void
	 */
	public function save_page( int $post_id, WP_Post $post, bool $update ): void {

		if ( ! $this->if_to_save_post( $post_id, $post ) || 'page' !== $post->post_type ) {
			return;
		}

		// Nonce verified in $this->if_to_save_post.
		// phpcs:disable WordPress.Security.NonceVerification.Missing
		if ( ! empty( $_POST['_page_seo_template'] ) ) {
			update_post_meta( $post_id, '_page_seo_template', $_POST['_page_seo_template'] );
		}
		// phpcs:enable WordPress.Security.NonceVerification.Missing
	}

	/**
	 * Callback for WP wp_update_term_data action.
	 * Do pre-save validation on update term.
	 *
	 * @param array  $new_term Term data to be updated.
	 * @param int    $term_id  Term ID.
	 * @param string $taxonomy Registered taxonomy name.
	 * @param array  $args     Arguments passed to wp_update_term().
	 *
	 * @return array
	 */
	public function on_edit_term( array $new_term, int $term_id, string $taxonomy, array $args ): array {

		if ( 'messia_object_segment' === $taxonomy ) {
			return $this->on_edit_segment_term( $new_term, $term_id, $taxonomy, $args );
		} elseif ( 'messia_object_property' === $taxonomy ) {
			return $this->on_edit_property_term( $new_term, $term_id, $taxonomy, $args );
		}

		return $new_term;
	}

	/**
	 * Callback for WP wp_update_term_data action if saving
	 * term of messia_object_segment taxonomy.
	 * Do pre-save validation on update term.
	 *
	 * @param array  $new_term Term data to be updated.
	 * @param int    $term_id  Term ID.
	 * @param string $taxonomy Registered taxonomy name.
	 * @param array  $args     Arguments passed to wp_update_term().
	 *
	 * @return array
	 */
	public function on_edit_segment_term( array $new_term, int $term_id, string $taxonomy, array $args ): array {

		$old_term         = get_term( $term_id, 'messia_object_segment' );
		$old_segment_page = $this->get_segment_page( $old_term->slug );

		remove_filter( 'wp_insert_post_data', [ $this, 'on_update_post' ], 10 );

		if ( $old_segment_page ) {
			if ( $old_term->slug !== $new_term['slug'] || $old_term->name !== $new_term['name'] || 'trash' === $old_segment_page->post_status ) {
				wp_update_post(
					wp_slash(
						[
							'ID'          => $old_segment_page->ID,
							'post_status' => 'publish',
							'post_title'  => $new_term['name'],
							'post_name'   => $new_term['slug'],
							'ping_status' => get_option( 'default_ping_status' ),
						]
					)
				);
			}
		} else {
			wp_insert_post(
				wp_slash(
					[
						'post_status' => 'publish',
						'post_type'   => 'page',
						'post_title'  => $new_term['name'],
						'post_name'   => $new_term['slug'],
						'ping_status' => get_option( 'default_ping_status' ),
					]
				)
			);
		}

		// Alias can not be the same as term slug.
		// phpcs:disable WordPress.Security.NonceVerification.Missing
		if ( isset( $_POST['alias'] ) && $_POST['alias'] === $new_term['slug'] ) {
			unset( $_POST['alias'] );
			// phpcs:enable WordPress.Security.NonceVerification.Missing
			add_filter( 'wp_redirect', [ $this, 'segment_alias_warning' ] );
		} else {
			add_filter( 'wp_redirect', [ $this, 'segment_alias_success' ] );
		}

		add_filter( 'wp_redirect', [ $this, 'segment_term_data_update_notice' ] );
		add_filter( 'wp_insert_post_data', [ $this, 'on_update_post' ], 10, 3 );

		flush_rewrite_rules();
		return $new_term;
	}

	/**
	 * Callback for WP wp_update_term_data action if saving
	 * term of messia_object_property taxonomy.
	 * Do pre-save validation on update term.
	 *
	 * @param array  $new_term Term data to be updated.
	 * @param int    $term_id  Term ID.
	 * @param string $taxonomy Registered taxonomy name.
	 * @param array  $args     Arguments passed to wp_update_term().
	 *
	 * @return array
	 */
	public function on_edit_property_term( array $new_term, int $term_id, string $taxonomy, array $args ): array {

		$old_term = get_term( $term_id, 'messia_object_property' );
		$reserved = MIA()->get_reserved_terms();

		if ( in_array( $new_term['slug'], $reserved['messia_object_property'], true ) ) {

			add_filter( 'wp_redirect', [ $this, 'property_term_data_update_notice' ] );
			return (array) $old_term;
		}
		return $new_term;
	}

	/**
	 * Callback for WP wp_insert_term_data action if saving
	 * term of messia_object_segment taxonomy.
	 * Do pre-save validation on insert term.
	 *
	 * @param array  $data     Term data to be inserted.
	 * @param string $taxonomy Taxonomy slug.
	 * @param array  $args     Arguments passed to wp_insert_term().
	 *
	 * @return array
	 */
	public function on_insert_term( array $data, string $taxonomy, array $args ): array {

		if ( 'messia_object_segment' === $taxonomy ) {

			// Alias can not be the same as term slug.
			// Warning will show backend.js.
			// phpcs:disable WordPress.Security.NonceVerification.Missing
			if ( isset( $_POST['alias'] ) && $_POST['alias'] === $data['slug'] ) {
				unset( $_POST['alias'] );
			}
			// phpcs:enable WordPress.Security.NonceVerification.Missing
		}

		if ( 'messia_object_property' === $taxonomy ) {

			$reserved = MIA()->get_reserved_terms();

			if ( in_array( $data['slug'], $reserved['messia_object_property'], true ) ) {
				/*
				 * This will lead to throw error on WP insert term
				 * and front will show warning.
				 */
				$data = [];
			}
		}

		return $data;
	}

	/**
	 * Callback for WP map_meta_cap filter.
	 * Restrict delete segment term that is default.
	 *
	 * @param array  $caps    Array of the user's capabilities.
	 * @param string $cap     Capability name.
	 * @param int    $user_id The user ID.
	 * @param array  $args    Adds the context to the cap. Typically the object ID.
	 *
	 * @return array
	 */
	public function messia_segment_cap( array $caps, string $cap, int $user_id, array $args ): array {

		if ( 'delete_term' === $cap ) {

			$id = array_shift( $args );
			if ( $id === $this->blog_settings['default_segment'] ) {
				$caps[] = 'do_not_allow';
			}
		}
		return $caps;
	}

	/**
	 * Callback for WP created_{messia_object_segment} action.
	 * Creates corresponding static page per each segment term.
	 *
	 * @param int $term_id Term ID.
	 * @param int $tt_id   Term taxonomy ID.
	 *
	 * @return void
	 */
	public function on_created_segment( int $term_id, int $tt_id ): void {

		$term         = get_term( $term_id, 'messia_object_segment' );
		$segment_page = $this->get_segment_page( $term->slug );

		remove_filter( 'wp_insert_post_data', [ $this, 'on_update_post' ], 10 );

		if ( $segment_page ) {
			wp_update_post(
				wp_slash(
					[
						'ID'          => $segment_page->ID,
						'post_title'  => $term->name,
						'post_name'   => $term->slug,
						'ping_status' => get_option( 'default_ping_status' ),
					]
				)
			);

		} else {
			wp_insert_post(
				wp_slash(
					[
						'post_status' => 'publish',
						'post_type'   => 'page',
						'post_title'  => $term->name,
						'post_name'   => $term->slug,
						'ping_status' => get_option( 'default_ping_status' ),
					]
				)
			);
		}

		add_filter( 'wp_insert_post_data', [ $this, 'on_update_post' ], 10, 3 );
		flush_rewrite_rules();
	}

	/**
	 * Callback for WP delete_{messia_object_segment} action.
	 * Delete corresponding static page per each segment term and updates
	 * widget instances and object custom fields, depending on segemnts.
	 *
	 * @param int     $term_id      Term ID.
	 * @param int     $tt_id        Term taxonomy ID.
	 * @param WP_Term $deleted_term Copy of the already-deleted term.
	 * @param array   $object_ids   List of term object IDs.
	 *
	 * @return void
	 */
	public function on_deleted_segment( int $term_id, int $tt_id, WP_Term $deleted_term, array $object_ids ): void {

		global $wpdb;

		$segment_page = $this->get_segment_page( $deleted_term->slug );

		if ( $segment_page ) {

			$this->toggle_delete_post_hooks( 'remove' );

			wp_delete_post( $segment_page->ID, true );
			add_filter( 'wp_redirect', [ $this, 'segment_term_data_delete_notice' ] );

			$this->toggle_delete_post_hooks( 'add' );
		}

		$widget_ids = [
			'widget_messia_widget_tabs_panel',
			'widget_messia_widget_custom_fields',
		];

		/**
		 * Before deleting, all constructor fields of the term
		 * to be deleted must be removed from all instances of widgets.
		 */
		foreach ( $widget_ids as $widget_id ) {

			$widgets_instances = get_option( $widget_id, [] );

			foreach ( $widgets_instances as &$widgets_instance ) {

				// skip key "_multiwidget" and widgets for other segment terms.
				if ( ! is_array( $widgets_instance ) || ! isset( $widgets_instance[ $deleted_term->slug ] ) ) {
					continue;
				}

				if ( array_key_exists( $deleted_term->slug, $widgets_instance ) ) {
					unset( $widgets_instance[ $deleted_term->slug ] );
				}
			}

			update_option( $widget_id, $widgets_instances );
		}

		/**
		 * Before deleting, all constructor fields of the term
		 * to be deleted must be removed from all instances of widget blocks.
		 */
		$blocks_messia     = [];
		$widget_blocks     = get_option( 'widget_block', [] );
		$blocks_registered = MIA()->get_module_blocks()->get_registry();

		foreach ( $blocks_registered as $type => $block_type ) {
			$block_full_name = $block_type->get_full_name();
			$blocks_messia[] = $block_full_name;
		}

		foreach ( $widget_blocks as &$widget_block ) {

			// skip key "_multiwidget".
			if ( ! is_array( $widget_block ) ) {
				continue;
			}
			$blocks = parse_blocks( $widget_block['content'] );
			$this->clean_blocks_segments( $blocks, $blocks_messia, $deleted_term->slug );
			$widget_block['content'] = serialize_blocks( $blocks );
		}

		update_option( 'widget_block', $widget_blocks );

		/*
		 * Before deleting, you need to remove the meta field from all objects
		 * constructor of the deleted term.
		 */
		$meta_key = str_replace( '%Id%', (string) $term_id, MESSIA_POSTMETA_CONSTRUCTED_NAME );
		$wpdb->delete( "$wpdb->postmeta", [ 'meta_key' => $meta_key ] );

		// Remove site ratings and criteria values for the deleted term.
		$rating_key = str_replace( '%Id%', (string) $term_id, MESSIA_SITERATING_NAME );

		$metas = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT *
				FROM $wpdb->postmeta
				WHERE meta_key = %s;",
				$rating_key
			)
		);

		if ( count( $metas ) > 0 ) {

			$meta_ids = $this->helpers::adjust_object_site_criteria( $metas );
			$meta_ids = implode( ',', array_map( 'intval', $meta_ids ) );

			$sql =
				"DELETE
				FROM $wpdb->postmeta
				WHERE meta_id in ($meta_ids);";

			$wpdb->query( $sql ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
		}

		flush_rewrite_rules();
	}

	/**
	 * Unset segments in existing blocks attrs.
	 *
	 * @param array  $blocks        Parsed blocks.
	 * @param array  $blocks_messia Messia registered block names.
	 * @param string $segment_slug  Segment being removed.
	 *
	 * @return void
	 */
	private function clean_blocks_segments( array &$blocks, array $blocks_messia, string $segment_slug ): void {

		foreach ( $blocks as &$block ) {

			if ( ! empty( $block['innerBlocks'] ) ) {
				$this->clean_blocks_segments( $block['innerBlocks'], $blocks_messia, $segment_slug );
			}

			if ( ! in_array( $block['blockName'], $blocks_messia, true ) ) {
				continue;
			}

			switch ( $block['blockName'] ) {
				case 'messia/block-tabs-panel':
					$block['attrs']['tabsConstructed'] = array_filter(
						$block['attrs']['tabsConstructed'],
						function( $value ) use ( $segment_slug ) {
							return $value['segmentSlug'] !== $segment_slug;
						}
					);
					break;
			}
		}
	}

	/**
	 * Callback for WP delete_{delete_messia_object_category} action.
	 * Removes deleted category term refference from property terms category_parent mate data.
	 *
	 * @param int     $term_id      Term ID.
	 * @param int     $tt_id        Term taxonomy ID.
	 * @param WP_Term $deleted_term Copy of the already-deleted term.
	 * @param array   $object_ids   List of term object IDs.
	 *
	 * @return void
	 */
	public function on_deleted_category( int $term_id, int $tt_id, WP_Term $deleted_term, array $object_ids ): void {

		global $wpdb;

		$sql =
			"SELECT
				term_id,
				meta_value
			FROM $wpdb->termmeta
			WHERE meta_key = 'category_parent'";

		$term_meta = $wpdb->get_results( $sql, OBJECT_K ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

		foreach ( $term_meta as $term_id => $term_meta ) {

			if ( ! strpos( $term_meta->meta_value, $deleted_term->slug ) ) {
				continue;
			}
			$term_meta_value = unserialize( $term_meta->meta_value ); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.serialize_unserialize
			$term_meta_value = array_diff( $term_meta_value, [ $deleted_term->slug ] );

			$wpdb->update(
				$wpdb->termmeta,
				[ 'meta_value' => serialize( $term_meta_value ) ], // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.serialize_serialize
				[
					'term_id'  => $term_id,
					'meta_key' => 'category_parent',
				]
			);
		}
	}

	/**
	 * Callback for WP wp_insert_post_data filter.
	 * Invokes $this->init_hooks().
	 * Uses for synchronizing segment term corresponding
	 * page data (name, title) with segment term values.
	 *
	 * @param array $data                Slashed, sanitized, and processed post data.
	 * @param array $postarr             Sanitized (and slashed) but otherwise unmodified post data.
	 * @param array $unsanitized_postarr Post data as originally passed to wp_insert_post().
	 *
	 * @return array
	 */
	public function on_update_post( array $data, array $postarr, array $unsanitized_postarr ): array {

		if ( ! isset( $postarr['post_type'] ) ||
			'page' !== $postarr['post_type'] ||
			! current_user_can( 'edit_page', $postarr['ID'] )
		) {
			return $data;
		}

		$post_old_data = get_post( $postarr['ID'] );
		$segment_terms = $this->helpers::get_terms_segment();

		if ( array_key_exists( $post_old_data->post_name, $segment_terms ) ) {

			if ( $data['post_name'] !== $post_old_data->post_name || $data['post_title'] !== $post_old_data->post_title ) {

				$data['post_name']  = $post_old_data->post_name;
				$data['post_title'] = $post_old_data->post_title;

				add_filter( 'wp_redirect', [ $this, 'post_data_revert_update_notice' ] );
				add_filter( 'rest_post_dispatch', [ $this, 'post_data_revert_update_notice_rest' ], 10, 3 );
				// for inline save action.
				header( 'Messia-Page-Edit-Forbidden: true' );
			}
		}

		return $data;
	}

	/**
	 * Callback for WP wp_trash_post action.
	 * If page is segment term page - prevent trashing.
	 *
	 * @param int $postid Trashed post ID.
	 *
	 * @return void
	 */
	public function on_trash_post( int $postid ): void {

		$post = get_post( $postid );

		if ( 'page' !== $post->post_type ) {
			return;
		}

		$segment_terms = $this->helpers::get_terms_segment();

		if ( array_key_exists( $post->post_name, $segment_terms ) ) {

			add_filter( 'wp_redirect', [ $this, 'post_data_revert_delete' ] );
			$location = $_SERVER['HTTP_REFERER'];
			wp_safe_redirect( $location );
			exit();
		}
	}

	/**
	 * Callback for WP delete_post action.
	 * If page is segment term page - prevent deletion.
	 *
	 * @param int $postid Deleted post ID.
	 *
	 * @return void
	 */
	public function on_delete_post( int $postid ): void {

		$post = get_post( $postid );

		if ( 'page' !== $post->post_type ) {
			return;
		}

		$segment_terms = $this->helpers::get_terms_segment();

		if ( array_key_exists( str_replace( '__trashed', '', $post->post_name ), $segment_terms ) ) {

			// only original post will be preserved, revisions will be deleted.
			add_filter( 'wp_redirect', [ $this, 'post_data_revert_delete' ] );
			$location = $_SERVER['HTTP_REFERER'];
			wp_safe_redirect( $location );
			exit();
		}
	}

	/**
	 * Callback for WP pre_trash_post filter.
	 * If page is segment term page - prevent trashing.
	 *
	 * @param bool|null $trash Whether to go forward with trashing.
	 * @param WP_Post   $post  Post object.
	 *
	 * @return mixed bool|null
	 */
	public function on_pre_trash_post( $trash, WP_Post $post ) {

		if ( 'page' !== $post->post_type ) {
			return $trash;
		}

		$is_doing_rest = $this->helpers::wp_doing_rest();
		$segment_terms = $this->helpers::get_terms_segment();

		if ( array_key_exists( $post->post_name, $segment_terms ) ) {
			if ( $is_doing_rest ) {
				add_filter( 'rest_post_dispatch', [ $this, 'post_data_revert_delete_rest' ], 10, 3 );
				return false;
			}
			add_filter( 'wp_redirect', [ $this, 'post_data_revert_delete' ] );
			$location = $_SERVER['HTTP_REFERER'];
			wp_safe_redirect( $location );
			exit();
		}
		return $trash;
	}

	/**
	 * Callback for WP pre_delete_post filter.
	 * If page is segment term page - prevent deletion.
	 *
	 * @param bool|null $delete       Whether to go forward with deletion.
	 * @param WP_Post   $post         Post object.
	 * @param bool      $force_delete Whether to bypass the Trash.
	 *
	 * @return mixed bool|null
	 */
	public function on_pre_delete_post( $delete, WP_Post $post, bool $force_delete ) {

		if ( 'page' !== $post->post_type ) {
			return $delete;
		}

		$is_doing_rest = $this->helpers::wp_doing_rest();
		$segment_terms = $this->helpers::get_terms_segment();

		if ( array_key_exists( str_replace( '__trashed', '', $post->post_name ), $segment_terms ) ) {
			if ( $is_doing_rest ) {
				add_filter( 'rest_post_dispatch', [ $this, 'post_data_revert_delete_rest' ], 10, 3 );
				return false;
			}
			add_filter( 'wp_redirect', [ $this, 'post_data_revert_delete' ] );
			$location = $_SERVER['HTTP_REFERER'];
			wp_safe_redirect( $location );
			exit();
		}
		return $delete;
	}

	/**
	 * Callback for WP deleted_post, trashed_post actions.
	 * Search and remove links to deleted post in metadata of posts, pages and objects.
	 *
	 * @param int $postid ID of deleted post.
	 *
	 * @return void
	 */
	public function on_deleted_post( int $postid ): void {

		global $wpdb;

		$prefix        = '%' . esc_sql( $wpdb->esc_like( MESSIA_POSTMETA_CONSTRUCTED_PREFIX ) ) . '%';
		$post_segments = wp_get_post_terms( $postid, 'messia_object_segment', [ 'fields' => 'ids' ] );

		if ( empty( $post_segments ) ) {
			return;
		}

		$post_segments = implode( ',', $post_segments );

		// All posts with constructor meta data in segments deleted post belongs to.
		$sql =
			"SELECT
				ID as post_id,
				meta_id,
				meta_key,
				meta_value
			FROM $wpdb->posts
			LEFT JOIN $wpdb->term_relationships ON $wpdb->posts.ID = $wpdb->term_relationships.object_id
			INNER JOIN $wpdb->postmeta ON $wpdb->posts.ID = $wpdb->postmeta.post_id
			WHERE
				$wpdb->posts.ID <> {$postid}
				AND $wpdb->term_relationships.term_taxonomy_id IN ({$post_segments})
				AND $wpdb->postmeta.meta_key LIKE '{$prefix}'
				AND $wpdb->posts.post_type = 'messia_object'
			GROUP BY $wpdb->posts.ID
			ORDER BY $wpdb->posts.post_date DESC;";

		$posts_meta = $wpdb->get_results( $sql, OBJECT_K ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

		foreach ( $posts_meta as $post_id => $post_meta ) {

			$do_update   = false;
			$term_id     = (int) str_replace( MESSIA_POSTMETA_CONSTRUCTED_PREFIX, (string) null, $post_meta->meta_key );
			$term_exists = term_exists( $term_id );

			// The term was deleted earlier, before the object was deleted.
			if ( is_null( $term_exists ) ) {
				continue;
			}

			$term_meta = $this->helpers::messia_get_term_meta( $term_id, 'constructor_cf' );

			// Meta data of the constructor in the post.
			$post_meta_value = json_decode( $post_meta->meta_value, true ); //phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.serialize_unserialize

			// Finding a constructed post field in the constructor matching a post by segment term.
			foreach ( $post_meta_value as $slug => &$meta_value ) {
				foreach ( $term_meta as $constructor_field ) {

					// The field was found by the slug of the field - it is unique in each constructor.
					if ( $constructor_field['slug'] === $slug ) {

						switch ( $constructor_field['field_type'] ) {

							// Simple "select" with a deleted post in its data.
							case 'select_post_single':
								// Setting the value for "Nothing selected".
								if ( (int) $meta_value === $postid ) {
									$meta_value = '-1';
									$do_update  = true;
								}
								break;

							// Multi select, in the data of which there was a deleted post.
							case 'select_post_multi':
								if ( is_array( $meta_value ) ) {
									$found_post_index = array_search( (string) $postid, $meta_value, true );

									// Deleting a deleted post ID.
									if ( false !== $found_post_index ) {
										unset( $meta_value[ $found_post_index ] );
										$meta_value = array_values( $meta_value );
										$do_update  = true;
									}
								}
								break;

						}
					}
				}
			}

			if ( $do_update ) {
				$wpdb->update(
					$wpdb->postmeta,
					[ 'meta_value' => wp_json_encode( $post_meta_value ) ], //phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.serialize_serialize
					[
						'post_id'  => $post_id,
						'meta_key' => $post_meta->meta_key,
					]
				);
			}
		}

		// Delete currently deleting post from the "Object order" option.
		$objects_order = $this->blog_settings['objects_search_order'];
		$objects_order = json_decode( $objects_order, true );

		$posts_id_order = array_column( $objects_order, 'postid' );
		$target_index   = array_search( $postid, $posts_id_order, true );

		if ( false !== $target_index ) {
			unset( $objects_order[ $target_index ] );
			$objects_order = array_values( $objects_order );

			MIA()->get_module_settings()->set_blog_setting(
				MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME,
				[
					'objects_search_order' => wp_json_encode( $objects_order ),
				]
			);
		}
	}

	/**
	 * Single entry point to validate saving post possibility.
	 *
	 * @param int     $post_id Saving post ID.
	 * @param WP_Post $post    Saving post instance.
	 *
	 * @return bool
	 */
	private function if_to_save_post( int $post_id, WP_Post $post ): bool {

		if ( empty( $post_id ) || empty( $post ) || empty( $_POST ) ) {
			return false;
		}
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return false;
		}
		if ( is_int( wp_is_post_revision( $post ) ) ) {
			return false;
		}
		if ( is_int( wp_is_post_autosave( $post ) ) ) {
			return false;
		}
		if ( empty( $_POST['messia_nonce'] ) || ! wp_verify_nonce( $_POST['messia_nonce'], 'messia_metabox' ) ) {
			return false;
		}
		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return false;
		}
		return true;
	}

	/**
	 * Get page corresponding with segment term.
	 *
	 * @param string $term_slug Segment term slug.
	 *
	 * @return mixed WP_Post|null
	 */
	private function get_segment_page( string $term_slug ) {

		global $wpdb;

		$term_slug = esc_sql( $term_slug );

		$sql =
			"SELECT *
			FROM $wpdb->posts
			WHERE
				post_type = 'page'
				AND (
						post_name = '$term_slug'
						OR post_name LIKE '{$term_slug}__trashed'
					);";

		$segment_page = $wpdb->get_row( $sql ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

		return ( is_null( $segment_page ) ) ? false : get_post( $segment_page );
	}

	/**
	 * Callback for WP wp_redirect filter.
	 * Fire in $this->on_update_post() on preventing post slug changing.
	 * Adds query argument to use it in Messia_Core->admin_notices() to pass notification to user.
	 *
	 * @param string $location URL to redirect to.
	 *
	 * @return string
	 */
	public function post_data_revert_update_notice( string $location ): string {

		MIA()->set_messia_admin_notice_transient( 5 );
		remove_filter( 'wp_redirect', [ $this, 'post_data_revert_update_notice' ] );
		return add_query_arg( [ 'post_update_revert' => true ], $location );
	}

	/**
	 * Callback for WP wp_redirect filter.
	 * Fire in $this->on_pre_delete_post(), $this->on_pre_trash_post() on preventing direct post deletion.
	 * Adds query argument to use it in Messia_Core->admin_notices() to pass notification to user.
	 *
	 * @param string $location URL to redirect to.
	 *
	 * @return string
	 */
	public function post_data_revert_delete( string $location ): string {

		MIA()->set_messia_admin_notice_transient( 5 );
		remove_filter( 'wp_redirect', [ $this, 'post_data_revert_delete' ] );
		return add_query_arg( [ 'post_delete_revert' => true ], $location );
	}

	/**
	 * Callback for WP rest_post_dispatch filter.
	 * Fire in $this->on_update_post() on preventing post slug changing.
	 * Adds extra data to rest response to show notification to user.
	 *
	 * @param WP_HTTP_Response $result  Result to send to the client. Usually a `WP_REST_Response`.
	 * @param WP_REST_Server   $object  Server instance.
	 * @param WP_REST_Request  $request Request used to generate the response.
	 *
	 * @return WP_REST_Response
	 */
	public function post_data_revert_update_notice_rest( WP_HTTP_Response $result, WP_REST_Server $object, WP_REST_Request $request ): WP_REST_Response {

		$result->data['messiaData'] = [
			'saved'   => false,
			'comment' => MESSIA_MESSAGES['dependantPageUpdWarn'],
		];
		return $result;
	}

	/**
	 * Callback for WP rest_post_dispatch filter.
	 * Fire in $this->on_pre_delete_post(), $this->on_pre_trash_post() on preventing direct post deletion.
	 * Adds extra data to rest response to show notification to user.
	 *
	 * @param WP_HTTP_Response $result  Result to send to the client. Usually a `WP_REST_Response`.
	 * @param WP_REST_Server   $object  Server instance.
	 * @param WP_REST_Request  $request Request used to generate the response.
	 *
	 * @return WP_REST_Response
	 */
	public function post_data_revert_delete_rest( WP_HTTP_Response $result, WP_REST_Server $object, WP_REST_Request $request ): WP_REST_Response {

		$result->data['messiaData'] = [
			'saved'   => false,
			'comment' => MESSIA_MESSAGES['dependantPageDelWarn'],
		];
		return $result;
	}

	/**
	 * Callback for WP wp_redirect filter.
	 * Fire in $this->on_edit_segment_term() always.
	 * Adds query argument to use it in Messia_Core->admin_notices() to pass notification to user.
	 *
	 * @param string $location URL to redirect to.
	 *
	 * @return string
	 */
	public function segment_term_data_update_notice( string $location ): string {

		MIA()->set_messia_admin_notice_transient( 5 );
		remove_filter( 'wp_redirect', [ $this, 'segment_term_data_update_notice' ] );
		return add_query_arg( [ 'segment_term_data_update' => true ], $location );
	}

	/**
	 * Callback for WP wp_redirect filter.
	 * Fire in $this->on_edit_segment_term() if term slug is same as it's alias.
	 * Adds query argument to use it in Messia_Core->admin_notices() to pass notification to user.
	 *
	 * @param string $location URL to redirect to.
	 *
	 * @return string
	 */
	public function segment_alias_warning( string $location ): string {

		MIA()->set_messia_admin_notice_transient( 5 );
		remove_filter( 'wp_redirect', [ $this, 'segment_alias_warning' ] );
		return add_query_arg( [ 'segment_alias_warning' => true ], $location );
	}

	/**
	 * Callback for WP wp_redirect filter.
	 * Fire in $this->on_edit_segment_term() if no warning requires.
	 *
	 * @param string $location URL to redirect to.
	 *
	 * @return string
	 */
	public function segment_alias_success( string $location ): string {

		MIA()->set_messia_admin_notice_transient( 5 );
		remove_filter( 'wp_redirect', [ $this, 'segment_alias_warning' ] );
		return remove_query_arg( [ 'segment_alias_warning' ], $location );
	}

	/**
	 * Callback for WP wp_redirect filter.
	 * Fire in $this->on_edit_property_term() is property term slug is in reserved names.
	 * Adds query argument to use it in Messia_Core->admin_notices() to pass notification to user.
	 *
	 * @param string $location URL to redirect to.
	 *
	 * @return string
	 */
	public function property_term_data_update_notice( string $location ): string {

		MIA()->set_messia_admin_notice_transient( 5 );
		remove_filter( 'wp_redirect', [ $this, 'property_term_data_update_notice' ] );
		return add_query_arg( [ 'property_term_data_update' => true ], $location );
	}

	/**
	 * Callback for WP wp_redirect filter.
	 * Fire in $this->on_deleted_segment if deleted segemnt term also delete corresponding page.
	 * Adds query argument to use it in Messia_Core->admin_notices() to pass notification to user.
	 *
	 * @param string $location URL to redirect to.
	 *
	 * @return string
	 */
	public function segment_term_data_delete_notice( string $location ): string {

		MIA()->set_messia_admin_notice_transient( 5 );
		remove_filter( 'wp_redirect', [ $this, 'segment_term_data_delete_notice' ] );
		return add_query_arg( [ 'segment_term_data_delete' => true ], $location );
	}

	/**
	 * Callback for WP admin_enqueue_scripts action.
	 * Invokes when rendering metabox with constructor filed
	 * if at least one field has type HTML.
	 *
	 * @return void
	 */
	public function code_mirror(): void {

		if ( 'messia_object' !== get_current_screen()->id ) {
			return;
		}

		// enqueue code editor for HTML.
		$settings = wp_enqueue_code_editor(
			[
				'type'       => 'text/html',
				'codemirror' => [
					'indentUnit'  => 2,
					'tabSize'     => 2,
					'autoRefresh' => true,
				],
			]
		);

		// do nothing if CodeMirror is disabled.
		if ( false === $settings ) {
			return;
		}

		// initialization.
		wp_add_inline_script(
			'code-editor',
			sprintf(
				'jQuery(document).ready(function($) {
				
					initCodeMirror = function(selectors){

						for (var i=0; i < selectors.length; i++) {
							WpCodeMirror = wp.codeEditor.initialize( $(selectors[i]), %s );
							WpCodeMirror.codemirror.on( "changes", function( editor, event ){
								editor.getTextArea().value = editor.getValue();
								editor.getTextArea().dispatchEvent(new Event("codeMirrorChange", { bubbles: true }));
								
							});
						}
					}

					reinitFragments = function(e){			
						initCodeMirror( $(e.target).find(".messia-codemirror") );
					}
					
					initCodeMirror(	$(".messia-codemirror") );

					$("body").on("objectMetaboxUpdated", reinitFragments);

				});',
				wp_json_encode( $settings )
			)
		);
	}

	/**
	 * Completes the chain of categories post terms
	 * from the current one up the tree to the root.
	 *
	 * @param int $post_id Target post ID.
	 *
	 * @return void
	 */
	private function complete_category_chain( int $post_id ): void {

		if ( 0 === $this->blog_settings['complete_category_terms_chain'] ) {
			return;
		}

		$post_tree_categories = [];
		$post_categories      = $this->helpers::get_post_terms( [ $post_id ], [ 'messia_object_category' ] );

		foreach ( $post_categories as $post_category ) {
			$category_ancestors   = array_keys( $this->helpers::get_category_ancestors( $post_category ) );
			$post_tree_categories = array_merge( $post_tree_categories, $category_ancestors, (array) $post_category->term_id );
		}

		wp_set_post_terms( $post_id, array_unique( $post_tree_categories ), 'messia_object_category' );
	}

	/**
	 * Execute geocoding.
	 * Uses in saving object to get human readable address.
	 *
	 * @param array $data Expected latitude, longitude and user_address.
	 *
	 * @return array
	 */
	private function geocode( array $data ): array {

		( ! empty( $data['latitude'] ) ) ? $data['latitude']   = (float) $data['latitude'] : '';
		( ! empty( $data['longitude'] ) ) ? $data['longitude'] = (float) $data['longitude'] : '';

		if ( empty( $data['user_address'] ) ) {
			$data['geocoded'] = 0;
			return $data;
		}

		$gmaps_api_key = $this->blog_settings['google_maps_api_key'];

		if ( empty( $gmaps_api_key ) ) {
			$data['geocoded'] = 0;
			return $data;
		}

		$request_parameters = [
			'address'  => $data['user_address'],
			'language' => substr( get_locale(), 0, 2 ),
			'key'      => $gmaps_api_key,
		];

		$request_parameters = http_build_query( $request_parameters, '', '&', PHP_QUERY_RFC3986 );

		$url   = "https://maps.googleapis.com/maps/api/geocode/json?{$request_parameters}";
		$coder = wp_remote_get( $url );

		if ( is_wp_error( $coder ) ) {

			$data['geocoded'] = 0;

			$err = $coder->get_error_message();

			// translators: %s - google geocoder response.
			$this->google_geocoder_errors = sprintf( __( 'Message from Google geocoder: %s', 'messia' ), $err );

			add_filter( 'wp_redirect', [ $this, 'google_geocode_notice' ] );

		} else {

			$body = json_decode( wp_remote_retrieve_body( $coder ), true );

			if ( 'OK' === $body['status'] ) {

				if ( empty( $body['results'] ) ) {
					$data['geocoded'] = 0;
				} else {

					$result = $body['results'][0];

					$data['user_address'] = $result['formatted_address'];
					$data['latitude']     = $result['geometry']['location']['lat'];
					$data['longitude']    = $result['geometry']['location']['lng'];
					$data['geocoded']     = 1;

					$this->google_geocoder_errors = 'OK';

					add_filter( 'wp_redirect', [ $this, 'google_geocode_notice' ] );
				}
			} else {

				$data['geocoded'] = 0;

				$err = $body['status'];

				if ( isset( $body['error_message'] ) ) {
					$err .= ' -> ' . $body['error_message'];
				}

				// translators: %s - google geocoder response.
				$this->google_geocoder_errors = sprintf( __( 'Message from Google geocoder: %s', 'messia' ), $err );

				add_filter( 'wp_redirect', [ $this, 'google_geocode_notice' ] );
			}
		}
		return $data;
	}

	/**
	 * Callback for WP wp_redirect filter.
	 * Uses in $this->geocode to forward geocoder notification.
	 *
	 * @param string $location URL to redirect to.
	 *
	 * @return string
	 */
	public function google_geocode_notice( string $location ): string {

		MIA()->set_messia_admin_notice_transient( 5 );
		remove_filter( 'wp_redirect', [ $this, 'google_geocode_notice' ] );
		return add_query_arg( [ 'google_geocode_notice' => $this->google_geocoder_errors ], $location );
	}

	/**
	 * Callback for WP init action.
	 * The only one way send info to front on metaboxes update with Gutenberg active.
	 *
	 * @return void
	 */
	public function admin_headers(): void {

		// phpcs:disable WordPress.Security.NonceVerification.Recommended
		if ( isset( $_GET['google_geocode_notice'] ) && is_admin() ) {
			header( "Google-Geo-Coder: {$_GET['google_geocode_notice']}", false );
		}
		// phpcs:enable WordPress.Security.NonceVerification.Recommended
	}

	/**
	 * Callback for WP post_edit_category_parent_dropdown_args filter.
	 * An error was found in WP - if the taxonomy is flat, then when trying to create a new term through the metabox
	 * a dropbox will be displayed in the post with a proposal to choose a parent term. And the relation will be saved,
	 * but not displayed. Dropbox is displayed in wp-admin\includes\meta-boxes.php - post_categories_meta_box() its arguments are pre-filtered.
	 * Switching echo to false will cause it to be "lost".
	 *
	 * @param array $args Array of arguments to generate parent dropdown.
	 *
	 * @return array
	 */
	public function admin_metabox_parent_dropdown( array $args ): array {

		global $post;

		if ( 'messia_object' !== $post->post_type ) {
			return $args;
		}

		if ( false === $this->cpt_config_taxes[ $args['taxonomy'] ]['args']['hierarchical'] ) {
			$args['echo'] = false;
		}

		return $args;
	}
}
