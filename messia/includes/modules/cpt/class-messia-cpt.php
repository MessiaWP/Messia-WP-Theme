<?php
/**
 * Messia_Cpt
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
use stdClass;
use WP_Term;
use WP_Term_Query;
use WP_Rewrite;
use WP_Meta_Query;

/**
 * Responsible for all operations in backend
 * and frontend with custom taxonomies.
 *
 * @package Messia\Modules\CustomPostTypes
 */
class Messia_Cpt {

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Cpt
	 */
	private static ?Messia_Cpt $instance = null; // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

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
	 * Configuration of all Messia custom post types.
	 *
	 * @var array
	 */
	private array $cpt_config_posttype;

	/**
	 * The scope of the custom fileds.
	 *
	 * @var array
	 */
	private array $post_fields_caps;

	/**
	 * Configuration of all constructor areas.
	 *
	 * @var array
	 */
	private array $caps_scopes;

	/**
	 * Full class name.
	 *
	 * @var Messia_Help
	 */
	private string $helpers;

	/**
	 * Images.
	 *
	 * @var stdClass
	 */
	private stdClass $svgs;

	/**
	 * Messia_Cpt Constructor.
	 */
	private function __construct() {

		$this->cpt_config          = MIA()->get_module_cpt_config();
		$this->cpt_config_taxes    = $this->cpt_config->get_custom_taxonomies_config();
		$this->cpt_config_posttype = $this->cpt_config->get_custom_posttype_config();
		$this->caps_scopes         = $this->cpt_config->get_caps_scopes();
		$this->post_fields_caps    = $this->cpt_config->get_post_custom_fields_caps();
		$this->helpers             = MIA()->get_module_helpers();
		$this->svgs                = $this->helpers::get_theme_svg_icons();
		$this->init_hooks();
	}

	/**
	 * Messia_Cpt Instance.
	 * Ensures only one instance of Messia_Cpt is loaded or can be loaded.
	 *
	 * @return Messia_Cpt Instance.
	 */
	public static function instance(): Messia_Cpt {

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

		add_action( 'init', [ $this, 'cpt' ] );
		add_filter( 'query_vars', [ $this, 'on_query_vars' ] );
		add_action( 'generate_rewrite_rules', [ $this, 'on_rewrite_rules' ] );

		add_action( 'messia_standalone_save_settings_success', [ $this, 'on_save_settings' ], 10, 4 );

		foreach ( $this->cpt_config_taxes as $taxonomy_key => $taxonomy_data ) {

			add_action( "{$taxonomy_key}_edit_form_fields", [ $this, 'taxonomy_edit_meta_field' ], 10, 2 );
			add_action( "{$taxonomy_key}_add_form_fields", [ $this, 'taxonomy_add_meta_field' ], 10, 2 );

			add_action( "edited_{$taxonomy_key}", [ $this, 'on_edited_taxonomy' ], 10, 2 );
			add_action( "create_{$taxonomy_key}", [ $this, 'on_edited_taxonomy' ], 10, 2 );
		}

		add_filter( 'pre_get_terms', [ $this, 'set_terms_column_order' ], 10 );

		add_filter( 'manage_edit-messia_object_category_columns', [ $this, 'add_column_category' ], 10 );
		add_filter( 'manage_messia_object_category_custom_column', [ $this, 'add_column_category_data' ], 10, 3 );

		add_filter( 'manage_edit-messia_object_property_columns', [ $this, 'add_column_property' ], 10 );
		add_filter( 'manage_messia_object_property_custom_column', [ $this, 'add_column_property_data' ], 10, 3 );

		add_filter( 'manage_edit-messia_object_property_sortable_columns', [ $this, 'add_sortable_columns' ], 10 );

		add_action( 'quick_edit_custom_box', [ $this, 'messia_object_category_quick_edit' ], 10, 3 );
		add_action( 'quick_edit_custom_box', [ $this, 'messia_object_property_quick_edit' ], 10, 3 );

		add_filter( 'views_edit-messia_object_category', [ $this, 'views_edit' ], 10, 1 );
		add_filter( 'views_edit-messia_object_property', [ $this, 'views_edit' ], 10, 1 );

		add_action( 'wp_ajax_get_term_neighbors', [ $this, 'get_term_neighbors' ] );
	}

	/**
	 * Adds sorting by term order to the conditions of the get_terms function.
	 * Connected on this event, which occurs immediately before rendering
	 * the term table in admin, so to not to spoil other queries.
	 *
	 * The dynamic portion of the hook name, `$this->screen->id`, refers
	 * to the ID of the current screen.
	 *
	 * @param string[] $views An array of available list table views.
	 *
	 * @return array
	 */
	public function views_edit( array $views ): array {

		global $pagenow;
		global $taxnow;

		if (
			! is_admin()
			|| 'edit-tags.php' !== $pagenow
			&& ( 'messia_object_property' !== $taxnow || 'messia_object_category' !== $taxnow )
			|| isset( $_GET['orderby'] ) // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			) {
			return $views;
		}

		/**
		 * Filters the fields to select in the terms query.
		 *
		 * Field lists modified using this filter will only modify the term fields returned
		 * by the function when the `$fields` parameter set to 'count' or 'all'. In all other
		 * cases, the term fields in the results array will be determined by the `$fields`
		 * parameter alone.
		 *
		 * Use of this filter can result in unpredictable behavior, and is not recommended.
		 *
		 * @param string[] $selects    An array of fields to select for the terms query.
		 * @param array    $args       An array of term query arguments.
		 * @param string[] $taxonomies An array of taxonomy names.
		 */
		add_filter(
			'get_terms_fields',
			function( $selects, $args, $taxonomies ) {

				$selects[] = 'IF (t.term_order = 0, NULL, t.term_order) as term_order_order';

				remove_filter( 'views_edit-messia_object_category', [ $this, 'views_edit' ], 10 );
				remove_filter( 'views_edit-messia_object_property', [ $this, 'views_edit' ], 10 );

				return $selects;
			},
			10,
			3
		);

		/**
		 * Filters the ORDERBY clause of the terms query.
		 *
		 * @param string   $orderby    `ORDERBY` clause of the terms query.
		 * @param array    $args       An array of term query arguments.
		 * @param string[] $taxonomies An array of taxonomy names.
		 */
		add_filter(
			'get_terms_orderby',
			function ( $query_vars, $taxonomy ) {
				$query_vars = "-term_order_order DESC, {$query_vars}";
				return $query_vars;
			},
			10,
			2
		);

		return $views;
	}

	/**
	 * Callback for WP pre_get_terms filter.
	 * Add ability to sort taxonomy terms in admin by columns
	 *
	 * @param WP_Term_Query $query Current instance of WP_Term_Query.
	 *
	 * @return void
	 */
	public function set_terms_column_order( WP_Term_Query $query ): void {

		global $pagenow;

		if ( ! is_admin() || 'edit-tags.php' !== $pagenow ) {
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
		if ( ! in_array( 'messia_object_property', $query->query_vars['taxonomy'], true ) ) {
			return;
		}

		$orderby = $query->query_vars['orderby'];

		if ( 'term_as_filter' === $orderby || 'term_on_card' === $orderby ) {

			$conditions = [
				'key'     => $orderby,
				'compare' => 'EXISTS',
			];

			$query->meta_query = new WP_Meta_Query( $conditions );
		}
	}

	/**
	 * Callback for WP manage_edit-{messia_object_category}_columns filter.
	 * Add columns to category terms list.
	 *
	 * @param array $columns The column header labels keyed by column ID.
	 *
	 * @return array
	 */
	public function add_column_category( array $columns ): array {

		$columns['term_order'] = __( 'Order', 'messia' );
		$columns['icon']       = __( 'Icon', 'messia' );
		$columns['thumbnail']  = __( 'Image', 'messia' );

		return $columns;
	}

	/**
	 * Callback fr WP manage_edit-{messia_object_property}_columns filter.
	 * Add columns to property terms list.
	 *
	 * @param array $columns The column header labels keyed by column ID.
	 *
	 * @return array
	 */
	public function add_column_property( array $columns ): array {

		$columns['term_as_filter'] = __( 'Filter', 'messia' );
		$columns['term_on_card']   = __( 'Card', 'messia' );
		$columns['term_order']     = __( 'Order', 'messia' );
		$columns['icon']           = __( 'Icon', 'messia' );

		return $columns;
	}

	/**
	 * Callback for WP manage_{messia_object_category}_custom_column filter.
	 * Fill custom columns for property terms list with data.
	 *
	 * @param string $columns Blank string.
	 * @param string $column  Name of the column.
	 * @param int    $id      Term ID.
	 *
	 * @return string
	 */
	public function add_column_category_data( string $columns, string $column, int $id ): string {

		if ( 'icon' === $column || 'thumbnail' === $column ) {

			$defaults      = array_column( $this->cpt_config_taxes['messia_object_category']['meta_fields'], 'default_value', 'id' );
			$default_value = $defaults['term_icon'];

			$image = json_decode( $this->get_term_meta_value( $id, "term_{$column}", $default_value ), false );

			if ( ! empty( $image ) ) {
				$handlers = [
					'edit'   => false,
					'remove' => false,
					'link'   => false,
				];
				$columns  = $this->helpers::get_media_icon_admin( $image, false, $handlers );
			} else {
				$columns = '<div class="icon"><span class="placeholder-image"></span></div>';
			}
		}
		if ( 'term_order' === $column ) {

			global $wpdb;

			$order = (int) $wpdb->get_var(
				$wpdb->prepare(
					"SELECT
						term_order
					FROM
						$wpdb->terms
					WHERE
						term_id = %d;",
					$id
				)
			);
			if ( 0 === $order ) {
				$class = 'value';
				$order = "<svg class='messia-icon'><use href='{$this->svgs->_backend->url}#unavailable'/></svg> (-)";
			} else {
				$class = 'value ordered';
				$order = "<svg class='messia-icon'><use href='{$this->svgs->_backend->url}#pinned'/></svg> ({$order}) <sup></sup>";
			}
			$columns = "<div class='{$class}'>{$order}</div>";
		}
		return $columns;
	}

	/**
	 * Callback for WP manage_messia_object_property_custom_column filter.
	 * Fill custom columns for property terms list with data.
	 *
	 * @param string $columns Blank string.
	 * @param string $column  Name of the column.
	 * @param int    $id      Term ID.
	 *
	 * @return string
	 */
	public function add_column_property_data( string $columns, string $column, int $id ): string {

		$defaults = array_column( $this->cpt_config_taxes['messia_object_property']['meta_fields'], 'default_value', 'id' );

		if ( 'icon' === $column ) {

			$default_value = $defaults['term_icon'];

			$image = json_decode( $this->get_term_meta_value( $id, 'term_icon', $default_value ), false );

			if ( ! empty( $image ) ) {
				$handlers = [
					'edit'   => false,
					'remove' => false,
					'link'   => false,
				];
				$columns  = $this->helpers::get_media_icon_admin( $image, false, $handlers );
			} else {
				$columns = '<div class="icon"><span class="placeholder-image"></span></div>';
			}
		}
		if ( 'term_as_filter' === $column ) {

			$default_value = $defaults['term_as_filter'];
			$current_value = $this->get_term_meta_value( $id, 'term_as_filter', $default_value );

			if ( '1' === $current_value ) {
				$columns = "<div class='value' data-checked='true'><svg class='messia-icon'><use href='{$this->svgs->_backend->url}#checked-true'/></svg></div>";
			} else {
				$columns = "<div class='value' data-checked='false'><svg class='messia-icon'><use href='{$this->svgs->_backend->url}#checked-false'/></svg></div>";
			}
		}
		if ( 'term_on_card' === $column ) {

			$default_value = $defaults['term_on_card'];
			$current_value = $this->get_term_meta_value( $id, 'term_on_card', $default_value );

			if ( '1' === $current_value ) {
				$columns = "<div class='value' data-checked='true'><svg class='messia-icon'><use href='{$this->svgs->_backend->url}#checked-true'/></svg></div>";
			} else {
				$columns = "<div class='value' data-checked='false'><svg class='messia-icon'><use href='{$this->svgs->_backend->url}#checked-false'/></svg></div>";
			}
		}
		if ( 'term_order' === $column ) {

			global $wpdb;

			$order = (int) $wpdb->get_var(
				$wpdb->prepare(
					"SELECT
						term_order
					FROM
						$wpdb->terms
					WHERE
						term_id = %d;",
					$id
				)
			);
			if ( 0 === $order ) {
				$class = 'value';
				$order = "<svg class='messia-icon'><use href='{$this->svgs->_backend->url}#unavailable'/></svg> (-)";
			} else {
				$class = 'value ordered';
				$order = "<svg class='messia-icon'><use href='{$this->svgs->_backend->url}#pinned'/></svg> ({$order}) <sup></sup>";
			}
			$columns = "<div class='{$class}'>{$order}</div>";
		}
		return $columns;
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

		$columns['term_as_filter'] = 'term_as_filter';
		$columns['term_on_card']   = 'term_on_card';

		// To make a column 'un-sortable' remove it from the array.
		// unset($columns['date']);

		return $columns;
	}

	/**
	 * Callback for WP init action.
	 * Register taxonomies and post types.
	 *
	 * @return void
	 */
	public function cpt(): void {

		/*
		If you set 'rewrite' => false for post in registration parameters,
		then this is how you can create a permalink for it.

		$post_type = 'messia_object';
		add_rewrite_tag( "%messia_object%", '([^/]+)', "post_type=$post_type&name=" );

		$args = [
			'with_front'  => false,
			'paged'       => false,
			'ep_mask'     => EP_ALL,
			'feed'        => false,
			'forcomments' => false,
			'walk_dirs'   => true,
			'endpoints'   => true,
		];

		$permastruct = "{$posttype_key}/%messia_object%";
		add_permastruct( $post_type, $permastruct, $args );
		*/

		// Taxonomy registration.
		foreach ( $this->cpt_config_taxes as $taxonomy_key => $taxonomy_data ) {
			register_taxonomy( $taxonomy_key, $taxonomy_data['post_types'], $taxonomy_data['args'] );
		}

		// Posts registration.
		foreach ( $this->cpt_config_posttype as $posttype_key => $posttype_data ) {
			register_post_type( $posttype_key, $posttype_data );
		}
	}

	/**
	 * Callback for WP generate_rewrite_rules action.
	 * Add custom rewrite rules for segment terms.
	 *
	 * @param WP_Rewrite $wp_rewrite Current WP_Rewrite instance (passed by reference).
	 *
	 * @return void
	 */
	public function on_rewrite_rules( WP_Rewrite $wp_rewrite ): void {

		( is_null( $wp_rewrite->rules ) ) ? $wp_rewrite->rules = [] : '';

		$segment_terms = $this->helpers::get_terms_segment();

		if ( count( $segment_terms ) > 0 ) {

			foreach ( $segment_terms as $segment_term ) {

				$rules = $this->get_segment_rewrite_rule( $segment_term );
				if ( false !== $rules ) {
					$wp_rewrite->rules = array_merge(
						$this->get_segment_rewrite_rule( $segment_term ),
						$wp_rewrite->rules
					);
				}
			}
		}
	}

	/**
	 * Callback for WP query_vars filter.
	 * Add messia public query vars.
	 *
	 * @param array $query_vars The array of allowed query variable names.
	 *
	 * @return array
	 */
	public function on_query_vars( array $query_vars ): array {
		$query_vars[] = 'category_terms';
		$query_vars[] = 'messia_alias';

		return $query_vars;
	}

	/**
	 * Getter for all messia rewrite rules per segment term.
	 *
	 * @param stdClass $segment_term Valid segment term.
	 *
	 * @return array
	 */
	private function get_segment_rewrite_rule( stdClass $segment_term ): array {

		$return = [
			"(.*/?{$segment_term->slug})/(.*)$" => 'index.php?pagename=$matches[1]&category_terms=$matches[2]',
		];

		$post_segment_alias = $this->helpers::messia_get_term_meta( (int) $segment_term->term_id, 'alias' );

		if ( ! empty( $post_segment_alias ) ) {

			$return[ "(^{$post_segment_alias})/([^/]+)/?$" ]                            = 'index.php?messia_alias=$matches[1]&messia_object=$matches[2]';
			$return[ "(^{$post_segment_alias})/[^/]+/attachment/([^/]+)/?$" ]           = 'index.php?messia_alias=$matches[1]&attachment=$matches[2]';
			$return[ "(^{$post_segment_alias})/[^/]+/attachment/([^/]+)/trackback/?$" ] = 'index.php?messia_alias=$matches[1]&attachment=$matches[2]&tb=1';
			$return[ "(^{$post_segment_alias})/[^/]+/attachment/([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$" ] = 'index.php?messia_alias=$matches[1]&attachment=$matches[2]&feed=$matches[3]';
			$return[ "(^{$post_segment_alias})/[^/]+/attachment/([^/]+)/(feed|rdf|rss|rss2|atom)/?$" ]      = 'index.php?messia_alias=$matches[1]&attachment=$matches[2]&feed=$matches[3]';
			$return[ "(^{$post_segment_alias})/[^/]+/attachment/([^/]+)/comment-page-([0-9]{1,})/?$" ]      = 'index.php?messia_alias=$matches[1]&attachment=$matches[2]&cpage=$matches[3]';
			$return[ "(^{$post_segment_alias})/[^/]+/attachment/([^/]+)/embed/?$" ]                         = 'index.php?messia_alias=$matches[1]&attachment=$matches[2]&embed=true';
			$return[ "(^{$post_segment_alias})/([^/]+)/embed/?$" ]                               = 'index.php?messia_alias=$matches[1]&messia_object=$matches[2]&embed=true';
			$return[ "(^{$post_segment_alias})/([^/]+)/trackback/?$" ]                           = 'index.php?messia_alias=$matches[1]&messia_object=$matches[2]&tb=1';
			$return[ "(^{$post_segment_alias})/([^/]+)/page/?([0-9]{1,})/?$" ]                   = 'index.php?messia_alias=$matches[1]&messia_object=$matches[2]&paged=$matches[3]';
			$return[ "(^{$post_segment_alias})/([^/]+)/comment-page-([0-9]{1,})/?$" ]            = 'index.php?messia_alias=$matches[1]&messia_object=$matches[2]&cpage=$matches[3]';
			$return[ "(^{$post_segment_alias})/([^/]+)(?:/([0-9]+))?/?$" ]                       = 'index.php?messia_alias=$matches[1]&messia_object=$matches[2]&page=$matches[3]';
			$return[ "(^{$post_segment_alias})/[^/]+/([^/]+)/?$" ]                               = 'index.php?messia_alias=$matches[1]&attachment=$matches[2]';
			$return[ "(^{$post_segment_alias})/[^/]+/([^/]+)/trackback/?$" ]                     = 'index.php?messia_alias=$matches[1]&attachment=$matches[2]&tb=1';
			$return[ "(^{$post_segment_alias})/[^/]+/([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$" ] = 'index.php?messia_alias=$matches[1]&attachment=$matches[2]&feed=$matches[3]';
			$return[ "(^{$post_segment_alias})/[^/]+/([^/]+)/(feed|rdf|rss|rss2|atom)/?$" ]      = 'index.php?messia_alias=$matches[1]&attachment=$matches[2]&feed=$matches[3]';
			$return[ "(^{$post_segment_alias})/[^/]+/([^/]+)/comment-page-([0-9]{1,})/?$" ]      = 'index.php?messia_alias=$matches[1]&attachment=$matches[2]&cpage=$matches[3]';
			$return[ "(^{$post_segment_alias})/[^/]+/([^/]+)/embed/?$" ]                         = 'index.php?messia_alias=$matches[1]&attachment=$matches[2]&embed=true';
		}

		return $return;
	}

	/**
	 * Output custom fields on taxonomy term creating page.
	 *
	 * @param string $taxonomy Registered taxonomy name.
	 * @throws Exception If custom filed type was not found in config.
	 *
	 * @return void
	 */
	public function taxonomy_add_meta_field( string $taxonomy ): void {

		$for_saved_warn = ' ' . __( 'You can set the value of the option after creating the term.', 'messia' );

		foreach ( $this->cpt_config_taxes[ $taxonomy ]['meta_fields'] as $extra_field ) {

			?>
			<div class="form-field messia <?php echo $extra_field['id']; ?>">
			<?php

			switch ( $extra_field['type'] ) {

				case 'textarea':
					echo "<h2>{$extra_field['label']}</h2>";

					if ( true === $extra_field['for_saved'] ) {

						$extra_field['description'] .= $for_saved_warn;
						echo "<textarea id='{$extra_field['id']}' rows='3' cols='50' disabled='disabled'></textarea>";
						echo "<p class='description'>{$extra_field['description']}</p>";
					} else {

						echo "<textarea name='{$extra_field['id']}' id='{$extra_field['id']}' rows='3' cols='50'>{$extra_field['default_value']}</textarea>";
						echo "<p class='description'>{$extra_field['description']}</p>";
					}

					break;

				case 'text':
					echo "<h2>{$extra_field['label']}</h2>";

					if ( true === $extra_field['for_saved'] ) {

						$extra_field['description'] .= $for_saved_warn;
						echo "<input type='text' id='{$extra_field['id']}' disabled='disabled' />";
						echo "<p class='description'>{$extra_field['description']}</p>";
					} else {

						echo "<input type='text' name='{$extra_field['id']}' id='{$extra_field['id']}' value='{$extra_field['default_value']}' />";
						echo "<p class='description'>{$extra_field['description']}</p>";
					}

					break;

				case 'checkbox':
					echo "<h2>{$extra_field['label']}</h2>";

					if ( true === $extra_field['for_saved'] ) {

						$extra_field['description'] .= $for_saved_warn;
						echo "<input type='checkbox' id='{$extra_field['id']}' disabled='disabled' />";
						echo "<p class='description'>{$extra_field['description']}</p>";
					} else {

						$checked = checked( $extra_field['default_value'], 1, false );
						echo "<input type='hidden' name='{$extra_field['id']}' value=0 />";
						echo "<input type='checkbox' name='{$extra_field['id']}' id='{$extra_field['id']}' {$checked} value=1 />";
						echo "<p class='description'>{$extra_field['description']}</p>";
					}

					break;

				case 'radio':
					echo "<h2>{$extra_field['label']}</h2>";

					if ( true === $extra_field['for_saved'] ) {

						$extra_field['description'] .= $for_saved_warn;

						foreach ( $extra_field['radios'] as $radio ) {
							echo "<input type='radio' disabled='disabled' />";
						}
						echo "<p class='description'>{$extra_field['description']}</p>";
					} else {

						foreach ( $extra_field['radios'] as $index => $radio ) {

							( $index === $extra_field['default'] ) ? $checked = 'checked="checked"' : $checked = null;
							echo "<label>
										<input value='{$radio['value']}' type='radio' name='{$extra_field['id']}' {$checked}>
											{$radio['title']}
									  </label>";
						}
						echo "<p class='description'>{$extra_field['description']}</p>";
					}

					break;

				case 'select':
					echo "<h2>{$extra_field['label']}</h2>";

					if ( true === $extra_field['for_saved'] ) {
						$extra_field['description'] .= $for_saved_warn;
					}

					$options  = null;
					$disabled = disabled( $extra_field['for_saved'], true, false );

					if ( is_callable( $extra_field['options'][0] ) ) {
						$data = call_user_func( $extra_field['options'][0], $extra_field['options'][1] );
					} else {
						$data = $extra_field['options'];
					}

					foreach ( $data as $term_id => $term_name ) {
						if ( is_array( $term_name ) ) {
							$first     = array_key_first( $term_name );
							$term_name = $term_name[ $first ];
						}
						$options .= "<option value='{$term_id}'>{$term_name}</option>";
					}

					echo "<input type='hidden' name='{$extra_field['id']}'>";
					echo "<select {$disabled} style='width: 95%' name='{$extra_field['id']}' id='{$extra_field['id']}'>{$options}</select>";
					echo "<p class='description'>{$extra_field['description']}</p>";
					break;

				case 'selectmulti':
					echo "<h2>{$extra_field['label']}</h2>";

					if ( true === $extra_field['for_saved'] ) {
						$extra_field['description'] .= $for_saved_warn;
					}

					$options  = null;
					$disabled = disabled( $extra_field['for_saved'], true, false );

					if ( is_callable( $extra_field['options'][0] ) ) {
						$data = call_user_func( $extra_field['options'][0], $extra_field['options'][1] );
					} else {
						$data = $extra_field['options'];
					}

					foreach ( $data as $term_id => $term_name ) {
						if ( is_array( $term_name ) ) {
							$first     = array_key_first( $term_name );
							$term_name = $term_name[ $first ];
						}
						$options .= "<option value='{$term_id}'>{$term_name}</option>";
					}

					echo "<input type='hidden' name='{$extra_field['id']}'>";
					echo "<select {$disabled} multiple style='width: 95%' name='{$extra_field['id']}[]' id='{$extra_field['id']}'>{$options}</select>";
					echo "<p class='description'>{$extra_field['description']}</p>";
					break;

				case 'mediasingle':
					echo "<h2>{$extra_field['label']}</h2>";
					echo "<input type='hidden' name='{$extra_field['id']}'>";
					echo "<div class='icon-wrapper'>
							<div class='icon template'>
								<span class='edit-image'></span>
								<span class='placeholder-image'></span>
							</div>
						</div>";

					break;

				default:
					throw new Exception( "Unknown type '{$extra_field['type']}' meta field of taxonomy term." );
			}
			?>
			</div>
			<?php
		}
		wp_nonce_field( 'messia_taxonomy_term', 'messia_nonce', false );
	}

	/**
	 * Output custom fields on taxonomy term edit page.
	 *
	 * @param WP_Term $wp_term  Current taxonomy term object.
	 * @param string  $taxonomy Registered taxonomy name.
	 * @throws Exception If custom filed type was not found in config.
	 *
	 * @return void
	 */
	public function taxonomy_edit_meta_field( WP_Term $wp_term, string $taxonomy ): void {

		$wp_term->term_id += 0; // convert to number.

		foreach ( $this->cpt_config_taxes[ $taxonomy ]['meta_fields'] as $extra_field ) {
			?>
				<tr class="form-field messia <?php echo $extra_field['id']; ?>">
					<th scope="row" valign="top">
						<label for="<?php echo $extra_field['id']; ?>"><?php echo $extra_field['label']; ?></label>
					</th>
					<td>
						<?php
						switch ( $extra_field['type'] ) {

							case 'textarea':
								$meta_value = $this->get_term_meta_value( $wp_term->term_id, $extra_field['id'], $extra_field['default_value'] );

								echo "<textarea name='{$extra_field['id']}' id='{$extra_field['id']}' rows='3' cols='50'>{$meta_value}</textarea>";
								echo "<p class='description'>{$extra_field['description']}</p>";
								break;

							case 'text':
								$meta_value = $this->get_term_meta_value( $wp_term->term_id, $extra_field['id'], $extra_field['default_value'] );

								echo "<input type='text' name='{$extra_field['id']}' id='{$extra_field['id']}' value='{$meta_value}'/>";
								echo "<p class='description'>{$extra_field['description']}</p>";
								break;

							case 'checkbox':
								$meta_value = $this->get_term_meta_value( $wp_term->term_id, $extra_field['id'], $extra_field['default_value'] );

								$checked = checked( $meta_value, 1, false );
								echo "<input type='hidden' name='{$extra_field['id']}' value=0 />";
								echo "<input type='checkbox' name='{$extra_field['id']}' id='{$extra_field['id']}' {$checked} value=1 />";
								echo "<p class='description'>{$extra_field['description']}</p>";

								break;

							case 'radio':
								$meta_value = $this->get_term_meta_value( $wp_term->term_id, $extra_field['id'], $extra_field['radios'][ $extra_field['default'] ]['value'] );

								foreach ( $extra_field['radios'] as $radio ) {

									$checked = checked( $meta_value, $radio['value'], false );
									echo "<label>
											<input value='{$radio['value']}' type='radio' name='{$extra_field['id']}' {$checked}>
												{$radio['title']}
										  </label>";
								}
								echo "<p class='description'>{$extra_field['description']}</p>";
								break;

							case 'select':
								$options    = null;
								$meta_value = $this->get_term_meta_value( $wp_term->term_id, $extra_field['id'], $extra_field['default_value'] );

								if ( is_callable( $extra_field['options'][0] ) ) {
									$data = call_user_func( $extra_field['options'][0], $extra_field['options'][1] );
								} else {
									$data = $extra_field['options'];
								}

								foreach ( $data as $term_id => $term_name ) {
									if ( is_array( $term_name ) ) {
										$first     = array_key_first( $term_name );
										$term_name = $term_name[ $first ];
									}
									$selected = ( selected( $term_id, $meta_value, false ) ) ? 'selected="selected"' : null;
									$options .= "<option {$selected} value='{$term_id}'>{$term_name}</option>";
								}
								echo "<input type='hidden' name='{$extra_field['id']}'>";
								echo "<select style='width: 95%' name='{$extra_field['id']}' id='{$extra_field['id']}'>{$options}</select>";
								echo "<p class='description'>{$extra_field['description']}</p>";
								break;

							case 'selectmulti':
								$options    = null;
								$meta_value = $this->get_term_meta_value( $wp_term->term_id, $extra_field['id'], $extra_field['default_value'] );

								if ( is_callable( $extra_field['options'][0] ) ) {
									$data = call_user_func( $extra_field['options'][0], $extra_field['options'][1] );
								} else {
									$data = $extra_field['options'];
								}

								foreach ( $data as $term_id => $term_name ) {
									if ( is_array( $term_name ) ) {
										$first     = array_key_first( $term_name );
										$term_name = $term_name[ $first ];
									}
									$selected = ( in_array( $term_id, $meta_value, true ) ) ? 'selected="selected"' : null;
									$options .= "<option {$selected} value='{$term_id}'>{$term_name}</option>";
								}
								echo "<input type='hidden' name='{$extra_field['id']}'>";
								echo "<select multiple style='width: 95%' name='{$extra_field['id']}[]' id='{$extra_field['id']}'>{$options}</select>";
								echo "<p class='description'>{$extra_field['description']}</p>";
								break;

							case 'mediasingle':
								$meta_value = $this->get_term_meta_value( $wp_term->term_id, $extra_field['id'], $extra_field['default_value'] );
								$images     = json_decode( $meta_value, false );
								echo "<input type='hidden' name='{$extra_field['id']}' value='{$meta_value}'>";

								if ( empty( $images ) ) {

									echo "<div class='icon-wrapper'>
											<div class='icon template'>
												<span class='edit-image'></span>
												<span class='placeholder-image'></span>
											</div>
										</div>";

								} else {
									$handlers = [ 'link' => false ];
									$image    = $this->helpers::get_media_icon_admin( $images, false, $handlers );
									echo "<div class='icon-wrapper'>{$image}</div>";
								}
								break;

							default:
								throw new Exception( 'Unknown meta field type of taxonomy term.' );
						}
						?>
					</td>
				</tr>
			<?php
		}

		if ( 'messia_object_segment' === $taxonomy ) {
			$this->segment_edit_meta_field( $wp_term, $taxonomy );
		}

		wp_nonce_field( 'messia_taxonomy_term', 'messia_nonce', false );
	}

	/**
	 * Output custom fields on taxonomy term edit page.
	 *
	 * @param WP_Term $wp_term  Current taxonomy term object.
	 * @param string  $taxonomy Registered taxonomy name.
	 * @throws Exception If custom filed type was not found in config.
	 *
	 * @return void
	 */
	public function segment_edit_meta_field( WP_Term $wp_term, string $taxonomy ): void {

		$constructor_fields_html = null;
		$constructed_fields_html = null;

		foreach ( $this->cpt_config_taxes[ $taxonomy ]['post_custom_fields'] as $field_type => $field_data ) {
			$constructor_fields_html .= $this->build_field_html( $field_type, $field_data );
		}

		$constructed = get_term_meta( $wp_term->term_id, 'constructor_cf', true );
		$config      = $this->cpt_config_taxes[ $taxonomy ]['post_custom_fields'];

		if ( ! empty( $constructed ) ) {
			foreach ( $constructed as $field_type => $constructed_field ) {

				if ( isset( $config[ $constructed_field['field_type'] ] ) ) {
					$field_data               = $config[ $constructed_field['field_type'] ];
					$constructed_fields_html .= $this->build_field_html( $constructed_field['field_type'], $field_data, $constructed_field );
				}
			}
		}

		?>
			<tr class="form-field">
				<th scope="row" valign="top">
					<label><?php esc_html_e( 'Object field constructor', 'messia' ); ?></label>
				</th>
				<td>
					<div class="shortcode-warning">
						<?php
						echo sprintf(
							// translators: %1$s - shortcode.
							__( 'Please note - for each new field a shortcode is automatically registered. You can display the value of this field on the object page and object card in the search results using this shortcode. The shortcode has %1$s format where slug is the value in the Slug field of the constructor element.', 'messia' ),
							'<span class="wparam">[constructor field_slug="slug"]</span>'
						);
						?>
						<br>
						<?php
						esc_html_e( 'Some fields support their own arguments:', 'messia' );
						?>
						<ul>
							<?php // translators: %1$s - field type name. ?>
							<li><?php echo sprintf( __( 'Field type %1$s - with_map="true|false", default true - show map right after address, othewise show map in popup on address click.', 'messia' ), '<span class="wparam">Address</span>' ); ?></li>
							<?php // translators: %1$s - field type name. ?>
							<li><?php echo sprintf( __( 'Field type %1$s - card_mode="true|false", default true - show object as card, otherwise show as link. Applicable only for post type Objects. Other post types always shows as link.', 'messia' ), '<span class="wparam">Post multiple</span>' ); ?></li>
						</ul>
						<?php
						esc_html_e( 'In addition to auto-shortcodes, static shortcodes are available:', 'messia' );
						?>
						<ul>
							<?php // translators: %1$s - shortcode. ?>
							<li><?php echo sprintf( __( '%1$s - displays the content of the object', 'messia' ), '<span class="wparam">[content]</span>' ); ?></li>
							<?php // translators: %1$s - shortcode. ?>
							<li><?php echo sprintf( __( '%1$s - displays the form for adding comments', 'messia' ), '<span class="wparam">[add_review_form]</span>' ); ?></li>
							<?php // translators: %1$s - shortcode. ?>
							<li><?php echo sprintf( __( '%1$s - displays comments', 'messia' ), '<span class="wparam">[reviews page="number | optional" reply="bool | optional]</span>' ); ?></li>
							<?php // translators: %1$s - shortcode. ?>
							<li><?php echo sprintf( __( '%1$s - displays object\'s categories', 'messia' ), '<span class="wparam">[object_categories title="string" | optional"]</span>' ); ?></li>
							<?php // translators: %1$s - shortcode. ?>
							<li><?php echo sprintf( __( '%1$s - displays object\'s properties', 'messia' ), '<span class="wparam">[object_properties title="string" | optional"]</span>' ); ?></li>
						</ul>
					</div>
					<div class="placeholders-warning">
						<?php
						echo sprintf(
							// translators: %1$s - title name, %2$s - title name.
							__( 'In the content of constructor fields, including tile dynamic elements are supported, which, when output, are replaced with their values, : %1$s, %2$s', 'messia' ),
							'<span class="wparam">#object_title#</span>',
							'<span class="wparam">#object_url#</span>'
						)
						?>
					</div>
					<div class="areas-warning">
					<?php

						$caps  = $this->post_fields_caps;
						$areas = array_unique( array_column( $caps, 'area' ) );

						echo sprintf( '<p>%s</p>', __( 'Content areas layout:', 'messia' ) );

					foreach ( $areas as $area ) {

						if ( ! isset( $this->caps_scopes[ $area ]['schema'] ) ) {
							throw new Exception( 'The path to the schema file is not specified' );
						}

						echo sprintf( '<a class="schema popup">%s</a>%s', $this->caps_scopes[ $area ]['title'], $this->caps_scopes[ $area ]['schema'] );
					}
					?>
					</div>
					<div id="constructor-wrapper"><?php echo $constructor_fields_html; ?></div>
				</td>
			</tr>
			<tr class="form-field" style="border-bottom: 1px solid #dedede;">
				<th scope="row" valign="top"><?php esc_html_e( 'Drag and drop the fields below:', 'messia' ); ?></th>
				<td><div id="constructed-wrapper" data-title="<?php esc_html_e( 'Drop item here', 'messia' ); ?>"><?php echo $constructed_fields_html; ?></div></td>
				<input id="constructor_cf" type="hidden" name="constructor_cf">
			</tr>
		<?php
	}

	/**
	 * Get term meta value and set default if no meta exist.
	 *
	 * @param int    $term_id       Taxonomy term id data retrieving for.
	 * @param string $meta_key      Key DB name.
	 * @param mixed  $default_value Value to set if no meta exist yet.
	 *
	 * @return mixed
	 */
	private function get_term_meta_value( int $term_id, string $meta_key, mixed $default_value ): mixed {

		if ( metadata_exists( 'term', $term_id, $meta_key ) ) {
			return get_term_meta( $term_id, $meta_key, true );

		} else {
			update_term_meta( $term_id, $meta_key, $default_value );
			return $default_value;
		}
	}

	/**
	 * Outputting constructor fields to a taxonomy term page.
	 *
	 * @param string $field_type Internal type of custom field.
	 * @param array  $field_data Custom field configuration.
	 * @param mixed  $value      Current constructed value of field.
	 *
	 * @return string HTML code for filed card.
	 * @throws Exception If custom filed scope was not found in config.
	 */
	private function build_field_html( string $field_type, array $field_data, $value = false ) {

		$img       = null;
		$titles    = null;
		$atts      = null;
		$caps_html = null;

		$caps       = $this->post_fields_caps;
		$caps_pages = array_fill_keys( array_column( $caps, 'area' ), [] );

		$caps_checkboxed = [];
		$caps_radioboxed = [];

		$name = bin2hex( random_bytes( 5 ) );

		// Split object caps.
		foreach ( $field_data['caps'] as $cap ) {
			if ( ! array_key_exists( $cap, $caps ) ) {
				throw new Exception( "Cap {$cap} for field {$field_type} does not exist in post_custom_fields_caps" );
			}
			if ( true === $caps[ $cap ]['radio'] ) {
				$caps_radioboxed[] = $cap;
			} else {
				$caps_checkboxed[] = $cap;
			}
		}

		// Preparing zones for fields.
		foreach ( $caps_radioboxed as $index => $cap ) {

			$id = bin2hex( random_bytes( 5 ) );

			// Saved fileds.
			if ( $value ) {
				$checked = checked( in_array( $cap, $value['caps'], true ), true, false );
			} else {
				$checked = ( 0 === $index ) ? checked( true, true, false ) : null;
			}

			$html = str_replace( [ '%id%', '%type%', '%name%', '%checked%' ], [ $id, 'type="radio"', "name='{$name}' m-name='{$cap}'", $checked ], $caps[ $cap ]['html'] );

			$caps[ $cap ]['html'] = $html;

			$caps_pages[ $caps[ $cap ]['area'] ][] = "<div class='area-cap radioboxes'>{$caps[ $cap ]['html']}</div>";
		}

		// Preparing zones for fields.
		foreach ( $caps_checkboxed as $cap ) {

			$id = bin2hex( random_bytes( 5 ) );

			// Saved fileds.
			if ( $value ) {
				$checked = checked( in_array( $cap, $value['caps'], true ), true, false );
			} else {
				$checked = null;
			}

			$caps[ $cap ]['html'] = str_replace( [ '%id%', '%type%', '%name%', '%checked%' ], [ $id, 'type="checkbox"', "m-name='{$cap}'", $checked ], $caps[ $cap ]['html'] );

			$caps_pages[ $caps[ $cap ]['area'] ][] = "<div class='area-cap checkboxes'>{$caps[ $cap ]['html']}</div>";
		}

		foreach ( $caps_pages as $areas => $html ) {
			if ( count( $html ) === 0 ) {
				continue;
			}
			$elements   = implode( '', $html );
			$caps_html .= "<fieldset><legend>{$this->caps_scopes[ $areas ]['title']}</legend><div class='areas'>{$elements}</div></fieldset>";
		}

		// Field card.
		foreach ( $field_data['settings'] as $m_name => $setting ) {

			$value_html = null;
			$field_id   = bin2hex( random_bytes( 5 ) );

			// Base fields (Name, slug).
			if ( $value ) {

				if ( array_key_exists( $m_name, $value ) ) {
					$setting_value = $value[ $m_name ];
				} else {
					$setting_value = $setting['default'];
				}

				if ( 'icon' === $m_name ) {
					if ( empty( $value[ $m_name ] ) ) {
						$img = $this->helpers::get_media_icon_admin( json_decode( $setting['default'], false ), false );
					} else {
						$img = $this->helpers::get_media_icon_admin( json_decode( $setting_value, false ), false );
					}
				}

				if ( is_null( $setting['scope'] ) || 'instance' === $setting['scope'] ) {
					continue;
				}

				$value_html     = "value='{$setting_value}'";
				$settings_class = "class='settings saved'";

			} else {

				if ( 'icon' === $m_name ) {
					$img = '<div class="icon"><span class="edit-image"></span><span class="placeholder-image"></span></div>';
				}

				$setting_value  = $setting['default'];
				$settings_class = "class='settings'";
			}

			// Options and attributes.
			$option_html = null;
			if ( 'select' === $setting['tag'] ) {

				foreach ( $setting['options'] as $option => $title ) {

					$selected = null;

					if ( false !== $value ) {
						$selected = selected( $setting_value, $option, false );
					}
					$option_html .= "<option value='{$option}' {$selected}>{$title}</option>";
				}
			}

			if ( 'titles' === $setting['scope'] ) {

				$locked = null;

				( isset( $setting['placeholder'] ) ) ? $placeholder = "placeholder='{$setting['placeholder']}'" : $placeholder = null;
				( isset( $setting['type'] ) ) ? $type               = "type='{$setting['type']}'" : $type = null;
				( $setting['required'] ) ? $required                = "m-required='true'" : $required = null;

				if ( 'slug' === $m_name ) {
					$locked = "class='locked'";
				}

				$titles .= "<{$setting['tag']} {$locked} {$type} id='{$field_id}' m-name='{$m_name}' {$value_html} scope='{$setting['scope']}' {$placeholder} {$required}>{$option_html}</{$setting['tag']}>";

			} elseif ( 'atts' === $setting['scope'] ) {

				( isset( $setting['class'] ) ) ? $classes = "class='{$setting['class']}'" : $classes = null;
				( isset( $setting['type'] ) ) ? $type     = "type='{$setting['type']}'" : $type = null;
				( isset( $setting['label'] ) ) ? $label   = "<label for='{$field_id}'>{$setting['label']}</label>" : $label = null;

				$step    = null;
				$checked = null;

				if ( 'step' === $m_name ) {
					$step = "step='any'";
				}

				switch ( $setting['type'] ) {
					case 'checkbox':
						if ( false === $value ) {
							$checked = checked( true, $setting['default'], false );
						} else {
							$checked = checked( $setting_value, $setting['default'], false );
						}

						$atts .= "<div {$classes}>
									{$label}
									<{$setting['tag']} id='{$field_id}' m-name='{$m_name}' {$checked} scope='{$setting['scope']}' {$type} value=1 {$step}></{$setting['tag']}>
								</div>";
						break;

					case 'number':
						if ( false === $value ) {
							$val = $setting['default'];
						} else {
							$val = $setting_value;
						}

						$atts .= "<div {$classes}>
									{$label}
									<{$setting['tag']} id='{$field_id}' m-name='{$m_name}' {$value_html} scope='{$setting['scope']}' {$type} value='{$val}' {$step}></{$setting['tag']}>
								</div>";
						break;

					default:
						throw new Exception( "Undefined field type for scope {$setting['scope']}" );
				}
			} elseif ( 'params' === $setting['scope'] ) {

				( isset( $setting['class'] ) ) ? $classes = "class='{$setting['class']}'" : $classes = null;
				( isset( $setting['type'] ) ) ? $type     = "type='{$setting['type']}'" : $type = null;
				( isset( $setting['label'] ) ) ? $label   = "<label for='{$field_id}'>{$setting['label']}</label>" : $label = null;

				if ( 'input' === $setting['tag'] ) {

					$checked = null;

					switch ( $setting['type'] ) {
						case 'checkbox':
							if ( false === $value ) {
								$checked = checked( 1, $setting['default'], false );
							} else {
								$checked = checked( 1, $setting_value, false );
							}

							$atts .= "<div {$classes}>
										{$label}
										<{$setting['tag']} id='{$field_id}' m-name='{$m_name}' {$checked} scope='{$setting['scope']}' {$type} value=1></{$setting['tag']}>
									</div>";
							break;

						case 'radio':
							$items = [];
							$name  = bin2hex( random_bytes( 5 ) );

							foreach ( $setting['radios'] as $radio_item ) {

								if ( false === $value ) {
									$checked = checked( $radio_item['value'], $setting['default'], false );
								} else {
									$checked = checked( $radio_item['value'], $setting_value, false );
								}
								$radio_id = bin2hex( random_bytes( 5 ) );

								$items[] = "<{$setting['tag']} {$type} id='{$radio_id}' name='{$name}' m-name='{$m_name}' scope='{$setting['scope']}' {$checked} value='{$radio_item['value']}'>";
								$items[] = "<label for='{$radio_id}'>{$radio_item['title']}</label>";
							}

							$items = implode( '', $items );
							$atts .= "<div {$classes}>
										{$label}
										{$items}
									</div>";
							break;

						case 'number':
							if ( false === $value ) {
								$val = $setting['default'];
							} else {
								$val = $setting_value;
							}

							$atts .= "<div {$classes}>
										{$label}
										<{$setting['tag']} id='{$field_id}' m-name='{$m_name}' {$checked} scope='{$setting['scope']}' {$type} value='{$val}'></{$setting['tag']}>
									</div>";
							break;

						case 'text':
							if ( false === $value ) {
								$val = $setting['default'];
							} else {
								$val = $setting_value;
							}

							$atts .= "<div {$classes}>
										{$label}
										<{$setting['tag']} id='{$field_id}' m-name='{$m_name}' {$checked} scope='{$setting['scope']}' {$type} value='{$val}'></{$setting['tag']}>
									</div>";
							break;

						default:
							throw new Exception( "Undefined field type for scope {$setting['scope']}" );
					}
				} else {
					$atts .= "<div {$classes}>{$label}<{$setting['tag']} id='{$field_id}' m-name='{$m_name}' {$value_html} scope='{$setting['scope']}' {$type}>{$option_html}</{$setting['tag']}></div>";
				}
			} elseif ( 'options' === $setting['scope'] ) {

				( isset( $setting['class'] ) ) ? $classes = "class='{$setting['class']}'" : $classes = null;
				( isset( $setting['type'] ) ) ? $type     = "type='{$setting['type']}'" : $type = null;
				( isset( $setting['label'] ) ) ? $label   = "<label for='{$field_id}'>{$setting['label']}</label>" : $label = null;

				$atts .= "<div {$classes}>{$label}<{$setting['tag']} id='{$field_id}' m-name='{$m_name}' {$value_html} scope='{$setting['scope']}' {$type}>{$option_html}</{$setting['tag']}></div>";
			}
		}

		$remove = null;

		if ( $value ) {
			$remove = '<div class="remove"></div>';
		}

		$constructed_settings_html = "
			<div class='titles-wrapper'>
				<div class='titles'>{$titles}</div>
				{$img}
			</div>
			<div class='atts'>{$atts}</div>
			<div class='caps'>{$caps_html}</div>";

		$field_html = "<div type='{$field_type}' class='constructor-field'>
							<div class='field-title'>
								<div class='heading move'>{$field_data['title']}</div>
								{$remove}
							</div>
							<div {$settings_class} data-visible='true'>
								{$constructed_settings_html}
							</div>
						</div>";

		return $field_html;
	}

	/**
	 * Save term meta data
	 * Method invokes from @see $this->on_edited_taxonomy() in 3 cases:
	 * - direct term edit
	 * - gutenberg add term
	 * - classic editor add term
	 *
	 * In 2 and 3 there no meta data from client, so it will be setted to default
	 *
	 * @param int $term_id Currently saving term.
	 * @param int $tt_id   Currently saving term.
	 * @throws Exception If default data for custom filed type was not found in config.
	 *
	 * @return void
	 */
	public function on_edited_segment( int $term_id, int $tt_id ): void {

		// nonce verified in @see $this->on_edited_taxonomy() that invoke this method.
		if ( ! isset( $_POST['constructor_cf'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Missing
			return;
		}

		global $wpdb;
		$term_constructor = json_decode( sanitize_text_field( stripslashes( $_POST['constructor_cf'] ) ), true ); // phpcs:ignore WordPress.Security.NonceVerification.Missing

		foreach ( $term_constructor as &$field ) {
			if ( isset( $field['slug'] ) ) {
				$field['slug'] = mb_strtolower( $field['slug'] );
				$field['slug'] = preg_replace( '/\s+/', '_', $field['slug'] );
			}

			foreach ( $field as $key => $value ) {
				if ( is_numeric( $value ) ) {
					$field[ $key ] = $field[ $key ] * 1;
				}
			}

			$field_caps    = $this->cpt_config_taxes['messia_object_segment']['post_custom_fields'][ $field['field_type'] ]['caps'];
			$field['caps'] = array_intersect( $field['caps'], $field_caps );
		}

		$term_constructor_slugs_types = array_column( $term_constructor, 'field_type', 'slug' );

		// Before saving, you need to remove possible deleted fields from the meta objects in the constructor.
		$meta_key = str_replace( '%Id%', (string) $term_id, MESSIA_POSTMETA_CONSTRUCTED_NAME );

		// All posts with constructor meta data.
		$posts_meta = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT
					ID as post_id,
					meta_id,
					meta_key,
					meta_value
				FROM $wpdb->posts
				INNER JOIN $wpdb->postmeta ON $wpdb->posts.ID = $wpdb->postmeta.post_id
				WHERE meta_key = %s;",
				$meta_key
			),
			OBJECT_K
		);

		foreach ( $posts_meta as $post_id => $post_meta ) {

			$do_update = false;

			// Meta data of the constructor in the post.
			$post_meta_value = json_decode( $post_meta->meta_value, true ); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.serialize_unserialize

			// This must be added to the meta of constructor of the object (the field was added to the constructor of the term).
			$to_add = array_diff_key( $term_constructor_slugs_types, $post_meta_value );

			// This must be removed from the meta of constructor of the object (the field was removed from the constructor of the term).
			$to_del = array_diff_key( $post_meta_value, $term_constructor_slugs_types );

			foreach ( $to_add as $add_slug => $field_type ) {

				if ( ! isset( $this->cpt_config_taxes['messia_object_segment']['post_custom_fields'][ $field_type ]['default'] ) ) {
					throw new Exception( 'Default value for field type "' . $field_type . '" not found' );
				}

				$default_value = $this->cpt_config_taxes['messia_object_segment']['post_custom_fields'][ $field_type ]['default'];

				$post_meta_value[ $add_slug ] = $default_value;

				$do_update = true;
			}

			foreach ( $to_del as $del_slug => $del_value ) {
				unset( $post_meta_value[ $del_slug ] );
				$do_update = true;
			}

			if ( $do_update ) {
				// json_encode('[]') return array, not stdClss.
				if ( is_array( $post_meta_value ) && empty( $post_meta_value ) ) {
					$post_meta_value = (object) $post_meta_value;
				}

				$wpdb->update(
					$wpdb->postmeta,
					[ 'meta_value' => wp_json_encode( $post_meta_value ) ], // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.serialize_serialize
					[
						'post_id'  => $post_id,
						'meta_key' => $post_meta->meta_key,
					]
				);
			}
		}

		// Before saving, you need to remove from all instances of the "Custom fields" widget the fields removed in the constructor and add the added ones to the end.
		$term                       = get_term( $term_id );
		$widgets_instances          = get_option( 'widget_messia_widget_custom_fields' );
		$term_meta_for_widget_check = array_column( $term_constructor, 'slug' );

		foreach ( $widgets_instances as &$widgets_instance ) {

			// skip key "_multiwidget" and widgets for other segment terms.
			if ( ! is_array( $widgets_instance ) || ! isset( $widgets_instance['constructor_fields'][ $term->slug ] ) ) {
				continue;
			}

			$to_add = array_diff( $term_meta_for_widget_check, array_keys( $widgets_instance['constructor_fields'][ $term->slug ] ) );
			$to_del = array_diff( array_keys( $widgets_instance['constructor_fields'][ $term->slug ] ), $term_meta_for_widget_check );

			if ( count( $to_add ) > 0 ) {
				foreach ( $to_add as $add ) {
					$widgets_instance['constructor_fields'][ $term->slug ][ $add ] = [
						'active' => false,
					];
				}
			}

			if ( count( $to_del ) > 0 ) {
				foreach ( $to_del as $del ) {
					unset( $widgets_instance['constructor_fields'][ $term->slug ][ $del ] );
				}
			}
		}

		// Before saving, you need to remove from all instances of widget block "Custom fields" the fields removed in the constructor and add the added ones to the end.
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
			$this->clean_blocks_custom_fields( $blocks, $blocks_messia, $term->slug, $term_meta_for_widget_check );
			$widget_block['content'] = serialize_blocks( $blocks );
		}

		// locks data is now synchronized.
		update_option( 'widget_block', $widget_blocks );

		// Widgets data is now synchronized.
		update_option( 'widget_messia_widget_custom_fields', $widgets_instances );

		// Posts data is now synchronized.
		update_term_meta( $term_id, 'constructor_cf', $term_constructor );
	}

	/**
	 * Unset segments in existing blocks attrs.
	 *
	 * @param array  $blocks             Parsed blocks.
	 * @param array  $blocks_messia      Messia registered block names.
	 * @param string $segment_slug       Segment being removed.
	 * @param array  $term_custom_fields Current set of custom fields in segment.
	 *
	 * @return void
	 */
	private function clean_blocks_custom_fields( array &$blocks, array $blocks_messia, string $segment_slug, array $term_custom_fields ): void {

		foreach ( $blocks as &$block ) {

			if ( ! empty( $block['innerBlocks'] ) ) {
				$this->clean_blocks_custom_fields( $block['innerBlocks'], $blocks_messia, $segment_slug, $term_custom_fields );
			}

			if ( ! in_array( $block['blockName'], $blocks_messia, true ) ) {
				continue;
			}

			switch ( $block['blockName'] ) {
				case 'messia/block-custom-fields':
					$segment_fields = array_filter(
						$block['attrs']['constructedFields'],
						function( $value ) use ( $segment_slug ) {
							return $value['segmentSlug'] === $segment_slug;
						}
					);
					$segment_fields = array_unique( array_column( $segment_fields, 'fieldSlug' ) );

					$to_add = array_diff( $term_custom_fields, $segment_fields );
					$to_del = array_diff( $segment_fields, $term_custom_fields );

					if ( count( $to_add ) > 0 ) {
						foreach ( $to_add as $add ) {
							$block['attrs']['constructedFields'][] = [
								'segmentSlug' => $segment_slug,
								'fieldSlug'   => $add,
								'fieldOpts'   => [
									'active' => false,
								],
							];
						}
					}

					if ( count( $to_del ) > 0 ) {
						$block['attrs']['constructedFields'] = array_filter(
							$block['attrs']['constructedFields'],
							function( $value ) use ( $segment_slug, $to_del ) {
								if ( $value['segmentSlug'] === $segment_slug && in_array( $value['fieldSlug'], $to_del, true ) ) {
									return false;
								}
								return true;
							}
						);
					}
					break;
			}
		}
	}

	/**
	 * Callback for WP edited_{taxonomy_name} and create_{taxonomy_name} actions.
	 * Save term meta data
	 * Method invokes in 3 cases:
	 * - direct term edit
	 * - gutenberg add term
	 * - classic editor add term
	 *
	 * In 2 and 3 there no meta data from client, so it will be setted to default
	 *
	 * @param int $term_id Currently saving term.
	 * @param int $tt_id   Currently saving term.
	 *
	 * @return void
	 */
	public function on_edited_taxonomy( int $term_id, int $tt_id ): void {

		if (
				( ! isset( $_POST['messia_nonce'] ) || ! wp_verify_nonce( $_POST['messia_nonce'], 'messia_taxonomy_term' ) ) // direct saving from term page.
				&& ( ! isset( $_GET['activated'] ) || 'true' !== $_GET['activated'] ) // added default terms on theme activation.
				&& false === $this->helpers::wp_doing_rest() // added term with gutenberg.
				&& false === wp_doing_ajax() // added term with classic editor.
			) {
			return;
		}

		$term     = get_term( $term_id );
		$taxonomy = $term->taxonomy;

		if ( 'messia_object_segment' === $taxonomy ) {
			$this->on_edited_segment( $term_id, $tt_id );
		}

		foreach ( $this->cpt_config_taxes[ $taxonomy ]['meta_fields'] as $extra_field ) {

			if ( isset( $_POST[ $extra_field['id'] ] ) ) {

				$value         = $_POST[ $extra_field['id'] ];
				$current_value = get_term_meta( $term_id, $extra_field['id'], true );

				if ( 'category_parent' === $extra_field['id'] && empty( $_POST[ $extra_field['id'] ] ) ) {
					$value = [];
				}

				if ( 'select_all' === $extra_field['id'] && empty( $_POST[ $extra_field['id'] ] ) ) {
					// translators: %s - term name.
					$value = sprintf( __( 'Any in %s', 'messia' ), $term->name );
				}

				if ( empty( $current_value ) ) {
					$updated = update_term_meta( $term_id, $extra_field['id'], $value );
				} else {
					$updated = update_term_meta( $term_id, $extra_field['id'], $value, $current_value );
				}
			} elseif ( ! metadata_exists( 'term', $term_id, $extra_field['id'] ) ) {

					$updated = update_term_meta( $term_id, $extra_field['id'], $extra_field['default_value'] );
			}
		}

		if ( isset( $_POST['term_order_position_type'] ) && isset( $_POST['term_order_target_id'] ) ) {

			$position_type  = sanitize_text_field( $_POST['term_order_position_type'] );
			$term_target_id = (int) $_POST['term_order_target_id'];

			$this->helpers::reorder_terms( $position_type, $term_target_id, $term_id, $taxonomy );
		}
	}

	/**
	 * Callback for WP quick_edit_custom_box action.
	 * Output some of constructor fields to the quick edit panel of term.
	 *
	 * @param string $column_name Name of the column to edit.
	 * @param string $post_type   The post type slug, or current screen name if this is a taxonomy list table.
	 * @param string $taxonomy    The taxonomy name, if any.
	 *
	 * @return void
	 */
	public function messia_object_category_quick_edit( string $column_name, string $post_type, string $taxonomy ): void {

		if ( 'edit-tags' === $post_type && 'messia_object_category' === $taxonomy ) {

			$valid_columns = [
				'term_order',
			];

			if ( in_array( $column_name, $valid_columns, true ) ) {

				static $i = 1;
				$html     = null;

				switch ( $column_name ) {
					case 'term_order':
						$reset  = __( 'Reset order', 'messia' );
						$before = __( 'Before', 'messia' );
						$after  = __( 'After', 'messia' );
						$target = __( 'Target', 'messia' );

						$placeholder = __( 'Search for target term...', 'messia' );

						$html = "<label>
									<span class='title'>{$reset}</span>
									<span class='input-text-wrap'>
										<input type='radio' name='{$column_name}_position_type' value='reset'>
									</span>
								</label>
								<label>
									<span class='title'>{$before}</span>
									<span class='input-text-wrap'>
										<input type='radio' name='{$column_name}_position_type' value='before'>
									</span>
								</label>
								<label>
									<span class='title'>{$after}</span>
									<span class='input-text-wrap'>
										<input type='radio' name='{$column_name}_position_type' value='after' checked='checked'>
									</span>
								</label>
								<label>
									<span class='title'>{$target}</span>
									<span class='input-text-wrap'>
										<input name='{$column_name}_target_id' type='hidden' value='-1' />
										<select class='async' name='{$column_name}_target_id' data-placeholder='{$placeholder}'>
											<option value='-1' selected='selected'>{$placeholder}</option>
										</select>
									</span>
								</label>";
						break;
				}
				?>
				<fieldset>
					<div id="messia-inline-content" class="inline-edit-col"><?php echo $html; ?></div>
				</fieldset>
				<?php
				if ( 1 === $i ) {
					wp_nonce_field( 'messia_taxonomy_term', 'messia_nonce', false );
				}
				++$i;
			}
		}
	}

	/**
	 * Callback for WP quick_edit_custom_box action.
	 * Output some of constructor fields to the quick edit panel of term.
	 *
	 * @param string $column_name Name of the column to edit.
	 * @param string $post_type   The post type slug, or current screen name if this is a taxonomy list table.
	 * @param string $taxonomy    The taxonomy name, if any.
	 *
	 * @return void
	 */
	public function messia_object_property_quick_edit( string $column_name, string $post_type, string $taxonomy ): void {

		if ( 'edit-tags' === $post_type && 'messia_object_property' === $taxonomy ) {

			$valid_columns = [
				'term_as_filter',
				'term_on_card',
				'term_order',
			];

			if ( in_array( $column_name, $valid_columns, true ) ) {

				static $i = 1;
				$html     = null;

				switch ( $column_name ) {
					case 'term_as_filter':
						$title = __( 'As filter', 'messia' );
						$html  = "<label>
									<span class='title'>{$title}</span>
									<span class='input-text-wrap'>
										<input type='hidden' name='{$column_name}' value='0'>
										<input type='checkbox' name='{$column_name}' value='1'>
									</span>
								</label>";
						break;

					case 'term_on_card':
						$title = __( 'On card', 'messia' );
						$html  = "<label>
									<span class='title'>{$title}</span>
									<span class='input-text-wrap'>
										<input type='hidden' name='{$column_name}' value='0'>
										<input type='checkbox' name='{$column_name}' value='1'>
									</span>
								</label>
								<hr/>";
						break;

					case 'term_order':
						$reset  = __( 'Reset order', 'messia' );
						$before = __( 'Before', 'messia' );
						$after  = __( 'After', 'messia' );
						$target = __( 'Target', 'messia' );

						$placeholder = __( 'Search for target term...', 'messia' );

						$html = "<label>
									<span class='title'>{$reset}</span>
									<span class='input-text-wrap'>
										<input type='radio' name='{$column_name}_position_type' value='reset'>
									</span>
								</label>
								<label>
									<span class='title'>{$before}</span>
									<span class='input-text-wrap'>
										<input type='radio' name='{$column_name}_position_type' value='before'>
									</span>
								</label>
								<label>
									<span class='title'>{$after}</span>
									<span class='input-text-wrap'>
										<input type='radio' name='{$column_name}_position_type' value='after' checked='checked'>
									</span>
								</label>
								<label>
									<span class='title'>{$target}</span>
									<span class='input-text-wrap'>
										<input name='{$column_name}_target_id' type='hidden' value='-1' />
										<select name='{$column_name}_target_id' data-placeholder='{$placeholder}'>
											<option value='-1' selected='selected'>{$placeholder}</option>
										</select>
									</span>
								</label>";
						break;
				}
				?>
				<fieldset>
					<div id="messia-inline-content" class="inline-edit-col"><?php echo $html; ?></div>
				</fieldset>
				<?php
				if ( 1 === $i ) {
					wp_nonce_field( 'messia_taxonomy_term', 'messia_nonce', false );
				}
				++$i;
			}
		}
	}

	/**
	 * Callback for messia messia_{standalone}_save_settings_success action.
	 * Cleanup non-used site rating keys and property groups keys.
	 *
	 * @param string $setting_preset Saved preset name.
	 * @param array  $to_save        Incoming settings.
	 * @param array  $old_settings   Old settings.
	 * @param array  $new_settings   New settings.
	 *
	 * @return void
	 */
	public function on_save_settings( string $setting_preset, array $to_save, array $old_settings, array $new_settings ): void {

		$old_rating_terms = json_decode( $old_settings['site_rating_terms'], true );
		$new_rating_terms = json_decode( $new_settings['site_rating_terms'], true );

		$this->adjust_rating_criteria( $old_rating_terms, $new_rating_terms );

		$old_property_groups = json_decode( $old_settings['property_groups'], true );
		$new_property_groups = json_decode( $new_settings['property_groups'], true );

		$this->adjust_property_groups( $old_property_groups, $new_property_groups );
	}

	/**
	 * Removes non-used site rating keys from DB.
	 *
	 * @param array $old_rating_terms Existing site rating keys.
	 * @param array $new_rating_terms New site rating keys.
	 *
	 * @return void
	 */
	private function adjust_rating_criteria( array $old_rating_terms, array $new_rating_terms ): void {

		$deleted_criterias = array_keys( array_diff_key( $old_rating_terms, $new_rating_terms ) );

		if ( 0 === count( $deleted_criterias ) ) {
			return;
		}

		global $wpdb;

		$like = wp_unslash( implode( '|', esc_sql( $deleted_criterias ) ) );

		$sql =
			"SELECT
				*
			FROM
				$wpdb->postmeta
			WHERE
				meta_value REGEXP '{$like}'
				AND meta_key <> 'site_rating_criteria'";

		$metas = $wpdb->get_results( $sql ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

		if ( 0 === count( $metas ) ) {
			return;
		}

		foreach ( $metas as $meta ) {

			$post_criterias = unserialize( $meta->meta_value ); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.serialize_unserialize

			foreach ( $post_criterias as $segment_term_id => &$post_segment_criterias ) {

				$rating_key      = str_replace( '%Id%', (string) $segment_term_id, MESSIA_SITERATING_NAME );
				$valid_criterias = array_diff_key( $post_segment_criterias, array_flip( $deleted_criterias ) );

				if ( count( $valid_criterias ) > 0 ) {

					$avg_in_term = array_sum( $valid_criterias ) / count( $valid_criterias );
					$avg_in_term = number_format( round( (float) $avg_in_term, 2 ), 2, '.', '' );

					$post_criterias[ $segment_term_id ] = $valid_criterias;
					update_post_meta( $meta->post_id, $rating_key, $avg_in_term );
				} else {
					unset( $post_criterias[ $segment_term_id ] );
					delete_post_meta( $meta->post_id, $rating_key );
				}
			}

			if ( count( $post_criterias ) > 0 ) {
				update_post_meta( $meta->post_id, '_messia_site_rating_criteria', $post_criterias );
			} else {
				delete_post_meta( $meta->post_id, '_messia_site_rating_criteria' );
			}
		}
	}

	/**
	 * Removes non-used groups keys from DB.
	 *
	 * @param array $old_property_groups Existing groups keys.
	 * @param array $new_property_groups New groups keys.
	 *
	 * @return void
	 */
	private function adjust_property_groups( array $old_property_groups, array $new_property_groups ): void {

		$deleted_groups = array_keys( array_diff_key( $old_property_groups, $new_property_groups ) );

		if ( count( $deleted_groups ) === 0 ) {
			return;
		}

		global $wpdb;

		$in  = "'" . implode( "','", esc_sql( $deleted_groups ) ) . "'";
		$sql =
			"UPDATE
				$wpdb->termmeta
			SET meta_value = -1
			WHERE
				meta_key = 'property_group'
				AND meta_value IN({$in})";

		$wpdb->query( $sql ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
	}

	/**
	 * Handler for AJAX wp_ajax_get_term_neighbors event.
	 * Search for all terms waith same parent id as given.
	 *
	 * @return void
	 */
	public function get_term_neighbors(): void {

		if ( check_ajax_referer( 'messiaBackendAjax', 'messiaNonce', false ) ) {

			global $wpdb;

			$neighbor = (int) $_POST['neighbor'];
			$taxonomy = sanitize_text_field( $_POST['taxonomy'] );

			$search = sanitize_text_field( $_POST['search'] );
			$search = ( empty( $search ) ) ? null : $search;
			$search = '%' . esc_sql( $wpdb->esc_like( $search ) ) . '%';

			$sql =
				"SELECT
					t.term_id as id,
					t.name as text
				FROM $wpdb->term_taxonomy as tt
				INNER JOIN $wpdb->terms AS t ON tt.term_id = t.term_id
				WHERE
					tt.taxonomy = '$taxonomy'
					AND tt.parent = (SELECT parent FROM $wpdb->term_taxonomy WHERE term_id = $neighbor)
					AND tt.term_id <> $neighbor
					AND t.name LIKE '$search'
				ORDER BY t.name;";

			$terms = $wpdb->get_results( $sql, ARRAY_A ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

			wp_send_json_success(
				[
					'code'  => 200,
					'terms' => $terms,
				]
			);
		}
	}
}
