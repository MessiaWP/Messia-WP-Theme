<?php
/**
 * Template Name: Default
 *
 * @package Messia\Modules\Listing\Skins
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped

declare( strict_types=1 );

namespace Smartbits\Messia\Includes\Modules\Listing\Skins;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Smartbits\Messia\Includes\Modules\Listing\Skins\Messia_Listing_Tmpl_Base;
use Smartbits\Messia\Includes\Config\Messia_Config_Custom_Fields;
use Exception;

/**
 * Class template for List of objects render.
 *
 * @package Messia\Modules\Listing\Skins
 */
class Messia_Listing_Tmpl_Default extends Messia_Listing_Tmpl_Base {

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Listing_Tmpl_Default
	 */
	private static ?Messia_Listing_Tmpl_Default $instance = null;  // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

	/**
	 * Messia_Listing_Tmpl_Default Constructor.
	 */
	private function __construct() {
		parent::__construct();

		$this->set_assets();
		$this->init_hooks();
	}

	/**
	 * Required in class WP hooks actions.
	 *
	 * @return void
	 */
	private function init_hooks(): void {
		add_action( 'wp_ajax_get_listing', [ $this, 'ajax_get_listing' ] );
		add_action( 'wp_ajax_nopriv_get_listing', [ $this, 'ajax_get_listing' ] );
		add_action( 'messia_after_header', [ $this, 'filters_for_mobile' ] );
	}

	/**
	 * Set modules assets to register in WP and
	 * load it later on front.
	 *
	 * Shared key means that helper resolve_assets_path() will
	 * try to find a script/style in a child theme first.
	 *
	 * @return void
	 */
	private function set_assets(): void {

		$this->assets = [
			'styles'  => [
				[
					'handle' => 'messia-listing',
					'src'    => '/assets/css/listing-default.css',
					'deps'   => [ 'messia-frontend', 'messia-range' ],
					'shared' => true,
				],
			],
			'scripts' => [
				[
					'handle'    => 'messia-listing',
					'src'       => '/assets/js/listing-default.js',
					'deps'      => [ 'messia-frontend', 'messia-range' ],
					'in_footer' => true,
					'shared'    => true,
				],
			],
		];
	}

	/**
	 * Messia_Listing_Tmpl_Default Instance.
	 * Ensures only one instance of Messia_Listing_Tmpl_Default is loaded or can be loaded.
	 *
	 * @return Messia_Listing_Tmpl_Default Instance.
	 */
	public static function instance(): Messia_Listing_Tmpl_Default {

		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * HTML code of filters for mobile devices.
	 *
	 * @return void
	 */
	public function filters_for_mobile(): void {
		$icon = MESSIA_THEME_URL . '/includes/assets/images/svg/filter.svg';
		?>
		<div class="object-filter-container">
			<button class="object-filter messia-btn"><?php esc_html_e( 'Filters', 'messia' ); ?>
				<img width="100%" height="100%" src="<?php echo $icon; ?>" alt="icon">
			</button>
		</div>
		<?php
	}

	/**
	 * Produce hole page HTML data.
	 *
	 * @return void
	 */
	public function generate_page(): void {

		if ( post_password_required() ) {
			return;
		}

		global $wp_query;

		$query    = $wp_query->query;
		$prefix   = ( is_multisite() ) ? (array) trim( get_blog_details()->path, '/' ) : [];
		$pagename = $query['pagename']; // like 'about-us/contact/rent' if page has parents or 'rent' if has no.
		$segment  = get_term_by( 'id', $this->listing_terms['segment_term_id'][0], 'messia_object_segment' );

		$page_prefix = array_diff( explode( '/', $pagename ), [ $segment->slug ] );

		/*
		 * Finally $prefix should contain multisite subpath if any + $pagename except segemtn term.
		 * Example 'estate/about-us/contact'.
		 */
		$prefix       = ( ! empty( $page_prefix ) ) ? array_merge( $prefix, $page_prefix ) : $prefix;
		$content_hero = $this->get_content_hero();
		$sidebar      = $this->get_sidebar();
		$content      = $this->get_content_general();
		$bottom       = $this->get_content_bottom();
		$edit         = $this->get_post_edit_link();

		$container_classes = [
			'row',
			'listing',
		];

		if ( false === is_null( $sidebar ) || false === is_null( $content ) ) {
			?>
			<section id="post-<?php the_ID(); ?>" <?php post_class( 'messia-section mt-4' ); ?>>
				<div class="container">
					<?php
					if ( ! empty( $content_hero ) ) {
						echo $content_hero;
					}
					?>
					<div
						class="<?php echo implode( ' ', $container_classes ); ?>"
						data-path-prefix="<?php echo ( empty( $prefix ) ) ? null : implode( '/', $prefix ); ?>"
						>
						<input type="hidden" name="segment" value="<?php echo $segment->slug; ?>">
						<?php if ( false === is_null( $sidebar ) ) { ?>
							<div class="col-xl-3 col-lg-3 mb-3 order-<?php echo ( 'left' === $this->blog_settings['sidebar_position'] ) ? 0 : 1; ?>">
								<?php echo $sidebar; ?>
							</div>
						<?php } ?>
						<?php if ( false === is_null( $content ) ) { ?>
							<div class="col content">
								<?php echo $content; ?>
							</div>
						<?php } ?>
					</div>
				</div>
			</section>
			<?php
		}

		if ( false === is_null( $bottom ) ) {
			?>
			<section class="messia-section">
				<div class="container">
					<div class="row">
						<?php echo $bottom; ?>
					</div>
				</div>
			</section>
			<?php
		}

		if ( false === is_null( $edit ) ) {
			?>
			<section class="messia-section">
				<div class="container">
					<div class="row">
						<?php echo $edit; ?>
					</div>
				</div>
			</section>
			<?php
		}
	}

	/**
	 * Component for $this->generate_page(),
	 * output very top content HTML.
	 *
	 * @return string
	 */
	private function get_content_hero(): ?string {

		if ( is_active_sidebar( 'widget-area-hero-listing' ) ) {

			ob_start();
			dynamic_sidebar( 'widget-area-hero-listing' );

			return ob_get_clean();
		}

		return null;
	}

	/**
	 * Component for $this->generate_page(),
	 * output main content HTML.
	 *
	 * @return string
	 */
	private function get_content_general(): ?string {

		if ( is_active_sidebar( 'widget-area-general-listing' ) ) {

			ob_start();
			dynamic_sidebar( 'widget-area-general-listing' );

			return ob_get_clean();
		}

		return null;
	}

	/**
	 * Component for $this->generate_page(),
	 * output main content HTML.
	 *
	 * @return string
	 */
	private function get_content_bottom(): ?string {

		if ( is_active_sidebar( 'widget-area-bottom-listing' ) ) {

			ob_start();
			dynamic_sidebar( 'widget-area-bottom-listing' );

			return ob_get_clean();
		}

		return null;
	}

	/**
	 * Component for $this->generate_page(),
	 * output sidebar HTML.
	 *
	 * @return string
	 */
	private function get_sidebar(): ?string {

		if ( is_active_sidebar( 'sidebar-search' ) ) {

			ob_start();
			dynamic_sidebar( 'sidebar-search' );

			return ob_get_clean();
		}

		return null;
	}

	/**
	 * Component for $this->generate_page(),
	 * return post edit URL.
	 *
	 * @return string|null
	 */
	private function get_post_edit_link(): ?string {

		$edit_url = get_edit_post_link();

		if ( ! $edit_url ) {
			return null;
		}

		$icons = $this->helpers::get_theme_svg_icons();

		ob_start();
		?>
		<div class="d-flex my-2">
			<?php echo $icons->edit->icon; ?>
			<span class="meta-data edit-post ml-2">
				<a href="<?php echo esc_url( $edit_url ); ?>">Edit</a>
			</span>
		</div>
		<?php

		return ob_get_clean();
	}

	/**
	 * This method invokes from Widget Listing,
	 * that called by get_content() and produces
	 * hole HTML code with listing.
	 *
	 * @param array $args     All widget data it was registered with.
	 * @param array $instance Current saved widget value.
	 *
	 * @return string
	 */
	public function get_listing( array $args, array $instance ): string {

		$view_mode   = $this->get_view_mode();
		$sort_search = $this->get_sorting();
		$listing     = $this->get_cards( $instance );
		$load_more   = $this->get_more_button();

		$listing_classes = [
			'row',
			"listing-col-{$instance['columns']}",
			( 'grid' === $this->cookie->listing_view_mode ) ? 'grid-container' : 'list-container',
		];

		ob_start();

		echo $args['before_widget'];

		if ( ! empty( $instance['blockTitle'] ) ) {
			echo "{$args['before_title']}<span>{$instance['blockTitle']}</span>{$args['after_title']}";
		}

		?>
		<div class="panel-top-content flex-wrap d-flex align-items-center mb-4">
			<?php echo $view_mode; ?>
			<?php echo $sort_search; ?>
		</div>
		<div class="tab-content">
			<div class="content-items collapse show tab-pane active"
				id="content-items" <?php echo ( 'map' === $this->cookie->listing_view_mode ) ? 'style="display: none;"' : null; ?>>
				<div
					id="objects"
					class="<?php echo implode( ' ', $listing_classes ); ?>"
					data-config='<?php echo wp_json_encode( [ 'columns' => $instance['columns'] ] ); ?>'
				>
					<?php echo $listing; ?>
				</div>
			</div>
			<?php
			if ( ! empty( $this->blog_settings['google_maps_api_key'] ) ) {
				?>
				<div class="content-map collapse items-map tab-pane" id="content-map" style="display: none">
					<div id="objects-map"></div>
				</div>
				<?php
			}
			?>
			<?php echo $load_more; ?>
		</div>
		<?php

		echo $args['after_widget'];

		return ob_get_clean();
	}

	/**
	 * This method invokes from Widget Filters,
	 * that called by get_sidebar() and produces
	 * hole HTML code with filters.
	 *
	 * @param array $args     All widget data it was registered with.
	 * @param array $instance Current saved widget value.
	 *
	 * @return string
	 */
	public function get_filters( array $args, array $instance ): string {

		$titles = [];

		foreach ( $instance['filtersOrder'] as $filter_data ) {
			if ( empty( $filter_data['title'] ) ) {
				$titles[ $filter_data['id'] ] = $filter_data['title'];
			} else {
				$titles[ $filter_data['id'] ] = "<h5 class='filter-group-heading line-throw-center mb-3'>{$filter_data['title']}</h5>";
			}
		}

		$reset_listing       = $this->get_filters_reset( $titles['messia_reset'], $args, $instance );
		$search_filters      = $this->get_filters_search( $titles['messia_search'], $args, $instance );
		$category_filters    = $this->get_filters_category( $titles['messia_object_category'], $args, $instance );
		$property_filters    = $this->get_filters_property( $titles['messia_object_property'], $args, $instance, $category_filters['active_category_terms'] );
		$constructor_filters = $this->get_filters_constructor( $titles['messia_constructor'], $args, $instance );
		$apply_filters       = $this->get_filters_apply_btn();

		ob_start();

		echo $args['before_widget'];

		if ( ! empty( $instance['blockTitle'] ) ) {
			echo "{$args['before_title']}<span>{$instance['blockTitle']}</span>{$args['after_title']}";
		}

		?>
		<div>
			<?php
			foreach ( $instance['filtersOrder'] as $filter_type ) {
				switch ( $filter_type['id'] ) {
					case 'messia_reset':
						?>
						<aside class="mb-4 reset"><?php echo $reset_listing; ?></aside>
						<?php
						break;
					case 'messia_search':
						?>
						<aside class="mb-4 search"><?php echo $search_filters; ?></aside>
						<?php
						break;
					case 'messia_constructor':
						?>
						<aside class="mb-4 custom-fields"><?php echo $constructor_filters['html']; ?></aside>
						<?php
						break;
					case 'messia_object_category':
						?>
						<aside class="mb-4 categories"><?php echo $category_filters['html']; ?></aside>
						<?php
						break;
					case 'messia_object_property':
						?>
						<aside class="mb-4 properties"><?php echo $property_filters['html']; ?></aside>
						<?php
						break;
				}
			}
			echo $apply_filters;
			?>
		</div>
		<?php
		echo $args['after_widget'];

		return ob_get_clean();
	}

	/**
	 * Component for $this->get_listing(),
	 * output sorting elements HTML.
	 *
	 * @return string
	 */
	private function get_sorting(): string {
		$default_sort = MESSIA_LIST_SORT_SEARCH['sort'];

		$data_rating_asc  = (object) [
			'selected' => selected( $this->properties['sort'], 'rating,asc', false ),
			'title'    => esc_html__( 'Rating [1-5]', 'messia' ),
		];
		$data_rating_desc = (object) [
			'selected' => selected( $this->properties['sort'], 'rating,desc', false ),
			'title'    => esc_html__( 'Rating [5-1]', 'messia' ),
		];
		$data_name_asc    = (object) [
			'selected' => selected( $this->properties['sort'], 'name,asc', false ),
			'title'    => esc_html__( 'Name [A-Z]', 'messia' ),
		];
		$data_name_desc   = (object) [
			'selected' => selected( $this->properties['sort'], 'name,desc', false ),
			'title'    => esc_html__( 'Name [Z-A]', 'messia' ),
		];

		$options = [
			"<option value='rating,asc' {$data_rating_asc->selected}>{$data_rating_asc->title}</option>",
			"<option value='rating,desc' {$data_rating_desc->selected}>{$data_rating_desc->title}</option>",
			"<option value='name,asc' {$data_name_asc->selected}>{$data_name_asc->title}</option>",
			"<option value='name,desc' {$data_name_desc->selected}>{$data_name_desc->title}</option>",
		];

		$constructor_terms = $this->messia_cpt_filter_terms['messia_object_constructor'];

		foreach ( $constructor_terms as $index => $constructor_terms ) {
			if ( ! array_key_exists( 'sortable', $constructor_terms ) || 0 === $constructor_terms['sortable'] ) {
				continue;
			}

			switch ( $constructor_terms['field_type'] ) {
				case 'input_number':
					$name  = $constructor_terms['slug'];
					$title = ( empty( $constructor_terms['title'] ) ) ? $constructor_terms['name'] : $constructor_terms['title'];

					$selected_a = selected( $this->properties['sort'], "cf_sort_{$name},asc", false );
					$selected_b = selected( $this->properties['sort'], "cf_sort_{$name},desc", false );

					$options[] = "<option value='cf_sort_{$name},asc' {$selected_a}>{$title} [123...]</option>";
					$options[] = "<option value='cf_sort_{$name},desc' {$selected_b}>{$title} [321...]</option>";
					break;
			}
		}

		ob_start();
		?>
		<div class="count-items-title d-inline-flex flex-grow-1">
			<span class="items-found"><?php echo $this->get_found_qtty(); ?></span>
		</div>
		<div class="sort d-flex align-items-center flex-grow-1 form-group mb-0">
			<label class="order-title flex-shrink-0" for="sorting"><?php esc_html_e( 'Sort by:', 'messia' ); ?></label>
			<select class="messia-filter-select" id="sorting" data-style='btn-primary' name="sort" data-url="query"
					data-keep-list="true"
					data-default="<?php echo $default_sort; ?>">
				<?php echo implode( '', $options ); ?>
			</select>
		</div>
		<?php

		return ob_get_clean();
	}

	/**
	 * Component for $this->get_filters(),
	 * output apply filters button.
	 *
	 * @return string
	 */
	private function get_filters_apply_btn(): string {
		ob_start();

		?>
		<button class="apply-filter messia-btn">
			<span><?php echo __( 'Show', 'messia' ); ?>&nbsp;</span>
			<span class="items-found"><?php echo $this->get_found_qtty(); ?></span>
		</button>
		<?php
		return ob_get_clean();
	}

	/**
	 * Component for $this->get_filters(),
	 * output reset filter.
	 *
	 * @param string $title    Content heading.
	 * @param array  $args     All widget data it was registered with.
	 * @param array  $instance Current saved widget value.
	 *
	 * @return string
	 */
	private function get_filters_reset( string $title, array $args, array $instance ): string {
		ob_start();
		echo $title;
		?>
		<button class="messia-btn messia-ripple-click w-100 reset_listing"><?php esc_html_e( 'Reset all filters', 'messia' ); ?></button>
		<?php
		return ob_get_clean();
	}

	/**
	 * Component for $this->get_filters(),
	 * output text filter.
	 *
	 * @param string $title    Content heading.
	 * @param array  $args     All widget data it was registered with.
	 * @param array  $instance Current saved widget value.
	 *
	 * @return string
	 */
	private function get_filters_search( string $title, array $args, array $instance ): string {

		$default_search = MESSIA_LIST_SORT_SEARCH['search'];

		ob_start();
		echo $title;
		?>
		<div class="d-flex align-items-center">
			<div class="messia-textfield flex-grow-1 <?php echo ( false === is_null( $this->properties['search'] ) ) ? 'is-focused' : ''; ?>">
				<input
						type="text"
						autocomplete="off"
						name="search"
						class="messia-filter-text"
						title="<?php _e( 'Search by object name', 'messia' ); // phpcs:ignore WordPress.Security.EscapeOutput.UnsafePrintingFunction ?>"
						id="search-object"
						data-default="<?php echo $default_search; ?>" data-keep-list="true" data-url="query"
						value="<?php echo $this->properties['search']; ?>">
				<div class="messia-label-container">
					<span class="messia-outline"></span>
					<label><span><?php esc_html_e( 'Search by object name', 'messia' ); ?></span></label>
				</div>
			</div>
			<button aria-label="close" class="close-filters ms-2 messia-btn flex-shrink-0"></button>
		</div>
		<?php

		return ob_get_clean();
	}

	/**
	 * Component for $this->get_filters(),
	 * output taxonomy category filters.
	 *
	 * @param string $title    Content heading.
	 * @param array  $args     All widget data it was registered with.
	 * @param array  $instance Current saved widget value.
	 *
	 * @throws Exception On getting undefined filter type.
	 *
	 * @return array
	 */
	private function get_filters_category( string $title, array $args, array $instance ): array {

		$category_terms       = $this->messia_cpt_filter_terms['messia_object_category']['flat'];
		$available_categories = $this->get_available_categories();

		$filters = [
			'html'                  => [],
			'active_category_terms' => [],
		];

		foreach ( $category_terms as $select_arr ) {

			$selects = [];

			foreach ( $select_arr as $parent_slug => $option_terms ) {

				$class   = null;
				$options = [];

				$label = null;
				$name  = null;
				$value = null;

				$selected_terms_id         = array_intersect( array_map( 'intval', array_column( $option_terms, 'term_id' ) ), $this->listing_terms['category_term_id'] );
				$selected_terms_last_index = array_key_last( $selected_terms_id );

				foreach ( $option_terms as $option_term ) {

					$selected_tag = null;
					$locked_tag   = null;
					$disabled     = null;

					switch ( $option_terms[0]['filter_type'] ) {
						case 'select-single':
							if (
								array_search( (int) $option_term['term_id'], $selected_terms_id, true ) === $selected_terms_last_index // last category term is in url.
								|| 0 === (int) $option_term['parent'] // or this is root term.
							) {
								$selected_tag = 'selected';

								$filters['active_category_terms'][] = $option_term['slug'];
							}
							break;

						case 'select-multi':
							if (
								in_array( (int) $option_term['term_id'], $selected_terms_id, true ) // term is in url.
								|| 0 === (int) $option_term['parent'] // or this is root term.
							) {
								$selected_tag = 'selected';

								$filters['active_category_terms'][] = $option_term['slug'];
							}
							break;
					}

					if ( 0 === (int) $option_term['parent'] || $parent_slug === $option_term['slug'] ) {

						// This option is the meaning of "Select All".
						$value = - 1;
						$name  = $option_term['select_all'];
						$label = $option_term['filter_label'];

						if ( 'select-multi' === $option_terms[0]['filter_type'] ) {
							// Add attr to remove 'x' button with CSS deselecting "Select All" for select multiple.
							$locked_tag = ( 'select-multi' === $option_terms[0]['filter_type'] ) ? 'locked="locked"' : null;

							// Unselect "Select All" for Select multiple if selected more then 1 options (except Select All).
							$multi_select_options = array_diff( $selected_terms_id, [ (int) $option_terms[0]['term_id'] ] );

							if ( ! empty( $multi_select_options ) ) {
								$selected_tag = null;
							}
						}
					} elseif ( isset( $option_term['inherited_branch_as_filter'] ) && 1 === (int) $option_term['inherited_branch_as_filter'] ) {

						// This option is the meaning of "Select All".
						$value = $option_term['slug'];
						$name  = $option_term['select_all'];
						$label = $option_term['filter_label'];
					} else {
						$value = $option_term['slug'];
						$name  = $option_term['name'];
					}

					if (
						'select-multi' === $option_terms[0]['filter_type'] && // is multiselect.
						! in_array( $option_term['slug'], $available_categories, true ) && // and outside of available categories.
						is_null( $selected_tag ) && // but not selected now.
						- 1 !== $value // and not select all.
					) {
						$disabled = 'disabled';
					}

					$options[] = "<option {$selected_tag} {$disabled} {$locked_tag} data-term='{$option_term['slug']}' data-order='{$option_term['order']}' value='{$value}'>{$name}</option>";
				}

				if ( is_null( $selected_tag ) && ! in_array( $parent_slug, $filters['active_category_terms'], true ) && 0 !== $parent_slug ) {
					$class = 'class="form-group filter mb-3 off hidden"';
				} else {
					$class = 'class="form-group filter mb-3"';
				}

				switch ( $option_terms[0]['filter_type'] ) {
					case 'select-single':
						$select_attr = [];
						break;
					case 'select-multi':
						$select_attr = [
							'multiple',
							'data-placeholder="' . $option_terms[0]['select_all'] . '"',
						];
						break;
					default:
						throw new Exception( "Unknown HTML filter type {$option_terms[0]['filter_type']}." );
				}

				$selects[] = "<div {$class}>";

				if ( ! empty( $label ) ) {
					$selects[] = "<div class='filter-heading mb-3'><label class='title' for='category-{$option_terms[0]['slug']}'>{$label}</label></div>";
				}
				$attributes = implode( ' ', $select_attr );
				$options    = implode( '', $options );
				$selects[]  = "<select {$attributes} id='category-{$option_terms[0]['slug']}' class='messia-filter-select' data-size='5' data-style='btn-primary' data-live-search='true' data-taxonomy='messia_object_category' data-url='path' data-keep-list='false' data-parent-term='{$parent_slug}'>{$options}</select>";
				$selects[]  = '</div>';

				$filters['html'][] = implode( '', $selects );
			}
		}

		if ( ! empty( $filters['html'] ) ) {
			array_unshift( $filters['html'], $title );
		}

		$filters['html']                  = implode( '', $filters['html'] );
		$filters['active_category_terms'] = array_unique( $filters['active_category_terms'] );

		return $filters;
	}

	/**
	 * Component for $this->get_filters(),
	 * output taxonomy property filters.
	 *
	 * @param string $title                 Content heading.
	 * @param array  $args                  All widget data it was registered with.
	 * @param array  $instance              Current saved widget value.
	 * @param array  $active_category_terms Terms of taxonomy category that are now active on search.
	 *
	 * @throws Exception On getting undefined filter type.
	 *
	 * @return array
	 */
	private function get_filters_property( string $title, array $args, array $instance, array $active_category_terms ): array {

		$property_terms       = $this->messia_cpt_filter_terms['messia_object_property']['flat'];
		$available_properties = $this->get_available_properties();

		$groups_collapsed      = $this->blog_settings['property_groups_initially_collapsed'];
		$property_groups       = json_decode( $this->blog_settings['property_groups'], true );
		$property_terms_groups = $this->regroup_properties( $property_groups, $property_terms );

		$checkbox_icon = MESSIA_THEME_URL . '/includes/assets/images/svg/checkbox.svg';

		$filters = [
			'html' => [],
		];
		$checked = [];

		?>
		<input type="hidden" data-keep-list="true" id="listing-resolver">
		<?php

		foreach ( $property_terms_groups as $group_key => $group_terms ) {

			foreach ( $group_terms as $key => $group_term ) {
				if ( '0' === $group_term['term_as_filter'] ) {
					unset( $group_terms[ $key ] );
				}
			}

			$visible       = 0;
			$checked_num   = 0;
			$group_filters = null;
			$wrapper_class = [ 'property-group' ];
			$group_class   = [ 'property-group-heading' ];

			( $groups_collapsed ) ? $wrapper_class[] = 'collapsed' : null;
			( $groups_collapsed ) ? $group_class[]   = 'collapsed' : null;

			foreach ( $group_terms as $group_term ) {

				$checked      = null;
				$disabled     = null;
				$filter_class = [ 'filter' ];

				( $groups_collapsed ) ? $filter_class[] = 'collapsed' : null;
				( $groups_collapsed ) ? $filter_class[] = 'off' : null;

				if ( in_array( (int) $group_term['term_id'], $this->listing_terms['property_term_id'], true ) ) {
					$checked = 'checked="checked"';
					++$checked_num;
				}
				if ( ! in_array( $group_term['slug'], $available_properties, true ) ) {
					$disabled = 'disabled';
				}
				if ( is_null( $group_term['category_parent'] ) ) {
					$category_parent_terms = 0;
				} else {

					$category_parent_terms = unserialize( $group_term['category_parent'] ); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.serialize_unserialize
					if ( count( $category_parent_terms ) === 0 ) {

						$category_parent_terms = 0;
						++$visible;
					} else {

						$r = array_intersect( $category_parent_terms, $active_category_terms );

						if ( count( $r ) > 0 ) {
							++$visible;
						} else {
							$filter_class[] = 'off';
							$filter_class[] = 'hidden';
						}
						$category_parent_terms = '<' . implode( '><', $category_parent_terms ) . '>';
					}
				}

				if ( $checked_num > 0 && $visible > 0 ) {
					$filter_class = array_diff( $filter_class, [ 'collapsed' ] );
					$filter_class = array_diff( $filter_class, [ 'off' ] );
				}

				ob_start();
				?>
				<div class="<?php echo implode( ' ', array_unique( $filter_class ) ); ?>">
					<label for="property-<?php echo $group_term['slug']; ?>" class="messia-checkbox">
						<input
								type="checkbox"
								class="messia-filter-checkbox invisible-filter"
								data-taxonomy="messia_object_property"
								class="messia-filter-checkbox"
								name="<?php echo $group_term['slug']; ?>"
								id="property-<?php echo $group_term['slug']; ?>"
								data-order="<?php echo $group_term['order']; ?>" <?php echo $checked; ?> <?php echo $disabled; ?>
								data-url="<?php echo $this->blog_settings['property_url_position']; ?>"
								data-var="prop"
								data-keep-list="false"
								data-category-parent-terms="<?php echo esc_html( $category_parent_terms ); ?>">
						<span class="messia-checkbox-label-container">
							<span class="messia-checkbox-svg">
								<span class="hover"></span>
								<i class="messia-icon"><svg><use
												href="<?php echo $checkbox_icon; ?>#filter"/></svg></i>
							</span>
							<span class="messia-checkbox-label">
								<span class="term-name"><?php echo $group_term['name']; ?></span>
							</span>
						</span>
					</label>
				</div>
				<?php
				$group_filters .= ob_get_clean();
			}

			( 0 === $visible ) ? $group_class[] = 'off' : null;
			( 0 === $visible ) ? $group_class[] = 'hidden' : null;

			if ( $checked_num > 0 && $visible > 0 ) {
				$wrapper_class = array_diff( $wrapper_class, [ 'collapsed' ] );
				$group_class   = array_diff( $group_class, [ 'collapsed' ] );
			}

			ob_start();

			if ( ! is_null( $group_filters ) && ! empty( $group_filters ) ) {
				if ( 'ungrouped' === $group_key ) {
					?>
					<div class="<?php echo implode( ' ', $wrapper_class ); ?>" id="<?php echo $group_key; ?>">
						<div class="<?php echo implode( ' ', $group_class ); ?>">
							<label class="title cursor-pointer"><?php esc_html_e( 'Others', 'messia' ); ?></label>
						</div>
						<?php echo $group_filters; ?>
					</div>
					<?php
				} else {
					?>
					<div class="<?php echo implode( ' ', $wrapper_class ); ?>" id="<?php echo $group_key; ?>">
						<div class="<?php echo implode( ' ', $group_class ); ?>">
							<label class="title cursor-pointer"><?php echo $property_groups[ $group_key ]['group_name']; ?></label>
						</div>
						<?php echo $group_filters; ?>
					</div>
					<?php
				}
			}
			$filters['html'][] = ob_get_clean();
		}

		if ( ! empty( $filters['html'] ) ) {
			array_unshift( $filters['html'], $title );
		}

		$filters['html'] = implode( '', $filters['html'] );

		return $filters;
	}

	/**
	 * Component for $this->get_filters(),
	 * output constructor filters.
	 *
	 * @param string $title    Content heading.
	 * @param array  $args     All widget data it was registered with.
	 * @param array  $instance Current saved widget value.
	 *
	 * @return array
	 */
	private function get_filters_constructor( string $title, array $args, array $instance ): array {

		$filters = [
			'html' => [],
		];

		$constructor_terms = $this->messia_cpt_filter_terms['messia_object_constructor'];
		$search_terms      = $this->listing_terms['constructor_term'];

		foreach ( $constructor_terms as $index => $constructor_terms ) {
			if ( ! array_key_exists( 'form_filter', $constructor_terms ) || 0 === $constructor_terms['form_filter'] ) {
				continue;
			}

			if ( array_key_exists( $constructor_terms['slug'], $search_terms ) ) {
				$user_data = $search_terms[ $constructor_terms['slug'] ];
			} else {
				$user_data = [];
			}

			switch ( $constructor_terms['field_type'] ) {
				case 'input_number':
					$filter_numeric = $this->get_filter_numeric( $constructor_terms, $index + 1, $user_data );
					if ( ! is_null( $filter_numeric ) ) {
						$filters['html'][] = $filter_numeric;
					}
					break;
			}
		}

		if ( ! empty( $filters['html'] ) ) {
			array_unshift( $filters['html'], $title );
		}

		$filters['html'] = implode( '', $filters['html'] );

		return $filters;
	}

	/**
	 * Component for $this->get_filters(),
	 * output numbers range filters.
	 *
	 * @param array $term  Constructor saved term.
	 * @param int   $order Order of term in constructor.
	 * @param array $data  User search conditions.
	 *
	 * @return string
	 */
	private function get_filter_numeric( array $term, int $order, array $data ): ?string {

		if ( -1 === $term['form_filter'] ) {
			return null;
		}

		global $wpdb;

		$name  = $term['slug'];
		$id    = "constructor-{$name}";
		$title = ( empty( $term['title'] ) ) ? (string) $term['name'] : (string) $term['title'];

		$meta_key = str_replace( '%Id%', (string) $this->segment_term_id, MESSIA_POSTMETA_CONSTRUCTED_NAME );

		$range = $wpdb->get_row(
			$wpdb->prepare(
				"SELECT
					MIN(value) as min,
					MAX(value) as max
				FROM
					(
						SELECT
							JSON_EXTRACT(meta_value, %s) * 1 AS value
						FROM
							$wpdb->postmeta
							INNER JOIN $wpdb->posts ON $wpdb->postmeta.post_id = $wpdb->posts.ID
						WHERE
							meta_key = %s
							AND JSON_EXTRACT(meta_value, '$.area') <> ''
							AND post_status = 'publish'
					) AS $wpdb->postmeta
				HAVING
					min IS NOT NULL
					AND max IS NOT NULL",
				"$.{$name}",
				$meta_key
			),
			OBJECT
		);

		if ( is_null( $range ) ) {
			return null;
		}

		switch ( $term['form_filter'] ) {
			case 'range':
				return $this->get_filter_numeric_range( $term, $order, $data, $title, $name, $id, $range );

			default:
				return $this->get_filter_numeric_toggle( $term, $order, $data, $title, $name, $id, $range );
		}
	}

	/**
	 * Creates html for range filter.
	 *
	 * @param array  $term  Constructed term.
	 * @param int    $order Term order.
	 * @param array  $data  User search conditions.
	 * @param string $title Filter title.
	 * @param string $name  Filter slug.
	 * @param string $id    Field ID.
	 * @param object $range DB min and max values.
	 *
	 * @return string
	 */
	private function get_filter_numeric_range( array $term, int $order, array $data, string $title, string $name, string $id, object $range ): string {

		$a = (float) ( array_key_exists( 'a', $data ) ) ? $data['a'] : $range->min;
		$b = (float) ( array_key_exists( 'b', $data ) ) ? $data['b'] : $range->max;

		$suffix = Messia_Config_Custom_Fields::get_units_label_for_field( $term );

		switch ( $term['unit_position'] ) {
			case 'left':
			case 'left_space':
				$suffix = "data-prefix='{$suffix}'";
				break;

			case 'right':
			case 'right_space':
				$suffix = "data-postfix='{$suffix}'";
				break;
		}

		ob_start();
		?>
		<div class="form-group filter mb-3">
			<div class="filter-heading mb-3">
				<label class="title" for="price-range"><?php echo $title; ?></label>
			</div>
			<input
				type="text"
				class="messia-filter-range slider invisible-filter"
				id="<?php echo $id; ?>"
				name="<?php echo $name; ?>"
				value="<?php echo $a; ?>;<?php echo $b; ?>"
				data-order="<?php echo $order; ?>"
				data-url="<?php echo $this->blog_settings['property_url_position']; ?>"
				data-taxonomy="messia_constructor"
				data-var="cf"
				data-keep-list="true"
				data-type="double"
				data-min="<?php echo $range->min; ?>"
				data-max="<?php echo $range->max; ?>"
				data-from="<?php echo $a; ?>"
				data-to="<?php echo $b; ?>"
				data-step="<?php echo ( empty( $term['step'] ) || is_null( $term['step'] ) ) ? 1 : $term['step']; ?>"
				<?php echo $suffix; ?>
				data-grid="false"
				data-prettify-enabled="true"
				data-prettify-separator="<?php echo $term['thousand_separatop']; ?>"
				data-precision="<?php echo ( (int) $term['number_precision'] > 0 ) ? (int) $term['number_precision'] : 0; ?>"
				data-decimal-separatop="<?php echo $term['decimal_separatop']; ?>"
			/>
		</div>
		<?php
		$filter = ob_get_clean();

		return $filter;
	}

	/**
	 * Creates html for range filter.
	 *
	 * @param array  $term  Constructed term.
	 * @param int    $order Term order.
	 * @param array  $data  User search conditions.
	 * @param string $title Filter title.
	 * @param string $name  Filter slug.
	 * @param string $id    Field ID.
	 * @param object $range DB min and max values.
	 *
	 * @return string
	 */
	private function get_filter_numeric_toggle( array $term, int $order, array $data, string $title, string $name, string $id, object $range ): string {

		$value  = $range->min;
		$filter = '';
		$suffix = Messia_Config_Custom_Fields::get_units_label_for_field( $term );

		$radio_set = [
			(object) [
				'id'         => "{$id}-{$value}-any",
				'value'      => 'any',
				'unit_value' => __( 'Any', 'messia' ),
			],
		];

		while ( $value <= $range->max ) {

			switch ( $term['unit_position'] ) {
				case 'left':
				case 'left_space':
					$unit_value = $suffix . $value;
					break;

				case 'right':
				case 'right_space':
					$unit_value = $value . $suffix;
					break;
			}

			$radio_set[] = (object) [
				'id'         => "{$id}-{$value}",
				'value'      => $value,
				'unit_value' => $unit_value,
			];

			$value = $value + $term['step'];
		}

		foreach ( $radio_set as $radio ) {

			ob_start();
			?>
			<div class="filter-toggle">
				<label class="messia-radio w-100">
					<input
						type="radio"
						class="messia-filter-radio invisible-filter"
						data-order="<?php echo $order; ?>"
						data-url="<?php echo $this->blog_settings['property_url_position']; ?>"
						data-taxonomy="messia_constructor"
						data-var="cf"
						data-keep-list="true"
						id="<?php echo $radio->id; ?>"
						name="<?php echo $name; ?>"
						value="<?php echo $radio->value; ?>"
						<?php ( empty( $data ) ) ? checked( $radio->value, 'any' ) : checked( $radio->value, $data['a'] ); ?>
					/>
					<span class="messia-radio-label-container">
						<span class="messia-radio-icon">
							<span class="hover"></span>
							<span class="messia-radio-icon-checked"></span>
						</span>
						<span class="messia-radio-label">
							<span class="term-name"><?php echo $radio->unit_value; ?></span>
						</span>
					</span>
				</label>
			</div>
			<?php
			$filter .= ob_get_clean();
		}

		return "<div class='form-group filter mb-3'>
					<div class='filter-heading mb-3'>
						<label class='title' for='{$name}'>{$title}</label>
					</div>
					<div class='toggle-filters-wrapper d-flex flex-wrap'>
						{$filter}
					</div>
				</div>";
	}

	/**
	 * Component for $this->get_listing(),
	 * output view mode buttons HTML.
	 *
	 * @return string
	 */
	private function get_view_mode(): string {

		$current_mode = $this->cookie->listing_view_mode;

		ob_start();
		?>
		<div
			class="list-map-button position-relative d-flex justify-content-end align-items-center"
			data-view="<?php echo $this->cookie->listing_view_mode; ?>">
			<label class="order-title flex-shrink-0" for="view-mode"><?php esc_html_e( 'Mode:', 'messia' ); ?></label>
			<div class="view-toggle-wrapper">
				<div
					class="view-toggle d-inline-block <?php echo ( 'grid' === $current_mode ) ? 'active' : null; ?>"
					data-view="grid">
					<label class="messia-radio w-100">
						<input type="radio" class="invisible-filter" name="view-mode" <?php checked( $current_mode, 'grid' ); ?>>
						<span class="messia-radio-label-container">
							<span class="messia-radio-icon"><span class="hover"></span><span class="messia-radio-icon-checked"></span></span>
							<span class="messia-radio-label">
								<span class="term-name"><?php esc_html_e( 'Grid', 'messia' ); ?></span>
							</span>
						</span>
					</label>
				</div>
				<div
					class="view-toggle d-inline-block <?php echo ( 'list' === $current_mode ) ? 'active' : null; ?>"
					data-view="list">
					<label class="messia-radio w-100">
						<input type="radio" class="invisible-filter" name="view-mode" <?php checked( $current_mode, 'list' ); ?>>
						<span class="messia-radio-label-container">
							<span class="messia-radio-icon"><span class="hover"></span><span class="messia-radio-icon-checked"></span></span>
							<span class="messia-radio-label">
								<span class="term-name"><?php esc_html_e( 'List', 'messia' ); ?></span>
							</span>
						</span>
					</label>
				</div>
				<?php
				// map API key holds body tag.
				if ( ! empty( $this->blog_settings['google_maps_api_key'] ) ) {
					?>
					<div
						class="view-toggle d-inline-block <?php echo ( 'map' === $current_mode ) ? 'active' : null; ?>"
						data-view="map" data-map-is-up-to-date="false">
						<label class="messia-radio w-100">
							<input type="radio" class="invisible-filter" name="view-mode" <?php checked( $current_mode, 'map' ); ?>>
							<span class="messia-radio-label-container">
								<span class="messia-radio-icon"><span class="hover"></span><span class="messia-radio-icon-checked"></span></span>
								<span class="messia-radio-label">
									<span class="term-name"><?php esc_html_e( 'Map', 'messia' ); ?></span>
								</span>
							</span>
						</label>
					</div>
					<?php
				}
				?>
			</div>
		</div>
		<?php

		return ob_get_clean();
	}

	/**
	 * Component for $this->get_listing(),
	 * output "Found X" HTML.
	 *
	 * @return string
	 */
	private function get_found_qtty(): string {
		$q    = count( $this->objects );
		$text = _n( 'object', 'objects', $q, 'messia' );

		return "<span>{$q} {$text}</span>";
	}

	/**
	 * Component for $this->get_listing(), output objects cards HTML.
	 *
	 * @param array $listing Arguments of container.
	 *
	 * @return string
	 */
	private function get_cards( array $listing ): ?string {
		if ( count( $this->objects_paged ) === 0 ) {
			return "<div class='listing not-found text-center'>" . MESSIA_MESSAGES['notFound'] . '</div>';
		}

		$html   = null;
		$helper = MIA()->get_module_object_card();

		$args = [
			'animated_appearance' => ( 1 === $this->blog_settings['animated_cards_appearance'] ) ? true : false,
			'ripple_hover'        => ( 1 === $this->blog_settings['object_card_bubble_hover'] ) ? true : false,
			'ripple_click'        => true,
			'image_size'          => ( (int) $listing['columns'] > 2 ) ? 'messia_card_thumb_s' : 'messia_card_thumb_b',
		];

		foreach ( $this->objects_paged as $object_id ) {
			$html .= $helper::get_object_card( $this->listing_terms['segment_term_id'][0], $object_id, $args );
		}

		return $html;
	}

	/**
	 * Component for $this->get_listing(),
	 * output Load More button HTML.
	 *
	 * @return string
	 */
	private function get_more_button(): ?string {

		if ( 0 === count( $this->objects ) ) {
			return null;
		}
		$default = MESSIA_LIST_SORT_SEARCH['list'];

		( empty( $this->category_terms ) ) ? $category_terms = null : $category_terms = implode( '/', $this->category_terms ) . '/';

		$style = null;
		$rel   = null;
		$href  = "href='/{$this->segment_term}/{$category_terms}?list={$this->properties['list']}'";
		$title = __( 'Load more', 'messia' );

		if ( $this->properties['list'] === $this->properties['lists'] ) {
			$rel   = 'rel="nofollow"';
			$style = 'style="display: none;"';
			$href  = null;
		}

		return "<div class='text-center'><a {$style} name='list' {$href} {$rel} class='mt-3 messia-btn messia-ripple-click ml-auto mr-auto load' data-default='{$default}' data-list='{$this->properties['list']}' data-lists='{$this->properties['lists']}' data-url='query'>{$title}</a></div>";
	}

	/**
	 * Get objects HTML on ajax listing request.
	 *
	 * @return void
	 */
	public function ajax_get_listing(): void {

		if ( check_ajax_referer( 'messiaFrontendAjax', 'messiaNonce', false ) ) {

			if ( ! $this->listing_terms ) {
				wp_send_json_success(
					[
						'code'  => 200,
						'cards' => "<div class='listing not-found text-center'>" . MESSIA_MESSAGES['invalidListingUrl'] . '</div>',
					]
				);
			}

			$listing_conf = $_POST['data']['config'];

			wp_send_json_success(
				[
					'code'        => 200,
					'categories'  => $this->get_available_categories(),
					'properties'  => $this->get_available_properties(),
					'found'       => $this->get_found_qtty(),
					'lists'       => $this->properties['lists'],
					'cards'       => $this->get_cards( $listing_conf ),
					'seo'         => $this->get_seo_container(),
					'breadcrumbs' => $this->helpers::get_breadcrumbs(),
				]
			);
		} else {

			wp_send_json_error(
				[
					'code'     => 403,
					'btn_text' => __( 'Permission error - please reload the page & try again', 'messia' ),
				]
			);
		}
	}
}
