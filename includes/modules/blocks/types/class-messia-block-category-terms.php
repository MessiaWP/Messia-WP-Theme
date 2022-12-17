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
 * Messia_Objects_Reviews class.
 *
 * @package Messia\Modules\Gutenberg\Blocks
 */
class Messia_Block_Category_Terms extends Messia_Block_Abstract_Dynamic {

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
	 * Messia_Block_Category_Terms Constructor
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
	}

	/**
	 * Get block attributes.
	 *
	 * @return array
	 */
	protected function get_attributes(): array {
		return $this->join_shared_attributes(
			[
				'isExample'             => [
					'type'    => 'boolean',
					'default' => false,
				],
				'withCount'             => [
					'type'    => 'boolean',
					'default' => true,
				],
				'categoriesConstructed' => [
					'type'    => 'array',
					'default' => [],
					'items'   => [
						'type'       => 'object',
						'properties' => [
							'id'           => [
								'type' => 'string',
							],
							'segmentSlug'  => [
								'type' => 'string',
							],
							'categorySlug' => [
								'type' => 'string',
							],
						],
					],
				],
				'slider'                => [
					'type'       => 'object',
					'properties' => [
						'active' => [
							'type' => 'boolean',
						],
					],
					'default'    => [
						'active' => true,
					],
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
	 * Render the Object Categories List block inner content.
	 *
	 * @param array $attributes Current attributes.
	 *
	 * @return string
	 */
	private function render_block( array $attributes ): string {

		$errors     = [];
		$render     = '';
		$with_count = $attributes['withCount'];
		$categories = $attributes['categoriesConstructed'];

		if ( empty( $categories ) ) {
			$errors = [
				__( 'Nothing to show. Change conditions.', 'messia' ),
			];

			return $this->helpers::print_errors( $this->block_name, $errors );
		}

		$category_segmented = [];

		// Categories by segments.
		foreach ( $categories as $category ) {
			$category_segmented[ $category['segmentSlug'] ][] = $category;
		}

		// Exclude unexisting segment terms.
		foreach ( $category_segmented as $segment_slug => $categories_in_segment ) {

			$segment_term = get_term_by( 'slug', $segment_slug, 'messia_object_segment' );

			if ( false === $segment_term ) {

				// translators: %s - taxonomy slug.
				$errors[] = sprintf( __( 'Segement term with slug %s does not exist.', 'messia' ), $segment_slug );
				unset( $category_segmented[ $segment_slug ] );
				continue;
			}

			foreach ( $categories_in_segment as $index => $category ) {

				$url = home_url() . "/{$segment_slug}/";

				ob_start();

				$category_term = get_term_by( 'slug', $category['categorySlug'], 'messia_object_category' );

				// Category term valid.
				if ( false === $category_term ) {

					// translators: %s - taxonomy slug.
					$errors[] = sprintf( __( 'Category with slug %s does not exist.', 'messia' ), $category['categorySlug'] );
					unset( $category_segmented[ $segment_slug ][ $index ] );
					continue;
				}

				$setted_terms = $this->setup_empty_terms( [ $category_term ] );

				if ( ! empty( $setted_terms['empty'] ) ) {
					// translators: %s - taxonomy slug.
					$errors[] = sprintf( __( 'Category term "%s" is empty and was excluded due to current theme setting.', 'messia' ), implode( ',', array_column( $setted_terms['empty'], 'name' ) ) );
					unset( $category_segmented[ $segment_slug ][ $index ] );
					continue;
				}

				$parents = $this->helpers::get_path_to_deepest_term( [ $category['categorySlug'] ] );

				// Category term's parents valid.
				if ( is_wp_error( $parents ) ) {

					// translators: %s - taxonomy slug.
					$errors[] = sprintf( __( 'Error getting parents for category term with slug %s.', 'messia' ), $category['categorySlug'] );
					unset( $category_segmented[ $segment_slug ][ $index ] );
					continue;
				}

				array_shift( $parents ); // front does not send root terms.
				array_push( $parents, $category['categorySlug'] );
				$url .= implode( '/', $parents ) . '/';

				$thumbnail = $this->helpers::messia_get_term_meta( $category_term->term_id, 'term_thumbnail' );

				if ( $thumbnail ) {

					$thumbnail = json_decode( $thumbnail, false );
					$thumbnail = $this->helpers::get_media_icon_front( $thumbnail, 'messia_term_thumb' );

				} else {
					$thumbnail = $this->get_thumbnail_placeholder( 300, 300 );
				}

				$count = null;

				if ( $with_count ) {
					$count = " [{$category_term->count}]";
				}

				$title = "{$category_term->name}{$count}";
				?>
				<div class="category messia-ripple-click <?php echo $category_term->slug; ?>">
					<div class="position-relative category-inner overflow-hidden messia-ripple-click">
						<a class="position-absolute top-0 w-100 h-100 zi-30 start-0" href="<?php echo $url; ?>"></a>
						<div class="thumbnail">
							<?php echo $thumbnail; ?>
						</div>

						<h4 class="term-title position-absolute bottom-0 start-0 py-2 px-3 zi-20"><?php echo $title; ?></h4>
					</div>
				</div>
				<?php

				$category_segmented[ $segment_slug ][ $index ] = ob_get_clean();
			}
		}

		$wrapper_classes = [ 'categories-terms-items' ];
		// translators: %s - block name
		$trick = sprintf( __( 'To fix errors you may try to resave the %s.', 'messia' ), $this->block_name );

		if ( true === $attributes['slider']['active'] && count( $category_segmented ) > 0 ) {
			$wrapper_classes[] = 'messia-slider';
			$wrapper_classes[] = 'slider-items';
			$wrapper_classes[] = $this->enqueue_slick_carousel();
		}

		$wrapper_classes = implode( ' ', $wrapper_classes );

		if ( 0 === count( $category_segmented ) ) {

			$render = $this->helpers::print_errors( $this->block_name, $errors, $trick );

		} elseif ( 1 === count( $category_segmented ) ) {

			reset( $category_segmented );

			$errors = $this->helpers::print_errors( $this->block_name, $errors, $trick );
			$first  = key( $category_segmented );

			$render = implode( '', $category_segmented[ $first ] );
			$render = "<div class='tab-content'><div class='tab-pane active'><div class='{$wrapper_classes}'>{$render}</div></div></div>{$errors}";

		} else {
			$i = 1;

			$tabs    = null;
			$content = null;
			$errors  = $this->helpers::print_errors( $this->block_name, $errors, $trick );

			foreach ( $category_segmented as $segment_term_slug => $categories ) {

				$uniqid       = uniqid();
				$class_name   = ( 1 === $i ) ? 'show active' : '';
				$segment_term = get_term_by( 'slug', $segment_term_slug, 'messia_object_segment' );

				$inner    = implode( '', $categories );
				$tabs    .= "<a class='nav-link {$class_name}' data-bs-toggle='tab' href='#segment-{$uniqid}' role='tab' aria-controls='segment-{$uniqid}' aria-selected='true'>{$segment_term->name}</a>";
				$content .= "<div class='tab-pane fade {$class_name}' id='segment-{$uniqid}' role='tabpanel'>
								<div class='{$wrapper_classes}'>{$inner}</div>
							</div>";

				++$i;
			}

			$render = "<nav class='nav nav-pills mb-3' role='tablist'>{$tabs}</nav>
						<div class='tab-content'>{$content}</div>
						{$errors}";
		}

		return $render;
	}

	/**
	 * Route for getting segment terms and property terms.
	 * Used to build data for HTML elements on backend.
	 *
	 * @return void
	 */
	public function rest(): void {
		register_rest_route(
			'messia/v1',
			'/block-category-terms',
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

					$segments = $wpdb->get_results( $sql_segment ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
					$category = $wpdb->get_results( $sql_category ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

					$setted   = $this->setup_empty_terms( $category );
					$category = $setted['valid'];

					$return['terms'] = [
						'segment'  => [],
						'category' => [],
					];

					$return['terms']['category'] = $this->build_category( $category );

					foreach ( $segments as $segment ) {
						$return['terms']['segment'][] = [
							'label' => "{$segment->name} [{$segment->count}]",
							'value' => $segment->slug,
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

		$filters = $attributes['categoriesConstructed'];

		if ( empty( $filters ) ) {
			return $attributes;
		}

		$valid_filters = [];

		$segments   = array_column( $db_terms['segment'], 'value' );
		$categories = array_column( $db_terms['category'], 'value' );

		foreach ( $filters as $filter ) {

			$filter_valid   = false;
			$filter_segment = $filter['segmentSlug'];

			if ( in_array( $filter_segment, $segments, true ) ) {
				$filter_valid = true;
			}

			if ( ! in_array( $filter['categorySlug'], $categories, true ) ) {
				$filter['categorySlug'] = $categories[0];
			}

			if ( true === $filter_valid ) {
				$valid_filters[] = $filter;
			}
		}

		$attributes['categoriesConstructed'] = $valid_filters;

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
	private function build_category_flat( array $terms, $flat = [], $level = 0 ) {

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

	/**
	 * Get dummy thumbnail for term.
	 *
	 * @param int $width  Any width.
	 * @param int $height Any height.
	 *
	 * @return string
	 */
	private function get_thumbnail_placeholder( int $width, int $height ): string {
		return "<img width='{$width}' height='{$height}' src='/wp-content/themes/messia/includes/assets/images/logo-placeholder.png'>";
	}

	/**
	 * Show content in slider.
	 *
	 * @return string Slider selector class.
	 */
	public function enqueue_slick_carousel(): string {

		$rnd = bin2hex( random_bytes( 5 ) );

		wp_enqueue_style( 'messia-slick' );
		wp_enqueue_script( 'messia-slick' );

		$selector = "slick-slider-{$rnd}";

		ob_start();
		?>
		<script>
			(function () {
				const init = () => {

					const $ = jQuery;

					$(function () {
						$('.<?php echo $selector; ?>').on('init', () => {
							window.dispatchEvent(new Event('sliderReady'));
						});
						$('.<?php echo $selector; ?>').slick({
							infinite: true,
							arrows: true,
							focusOnSelect: false,
							dots: true,
							slidesToShow: 5,
							slidesToScroll: 1,
							/* rows: 0, */
							/* slidesPerRow: 2, */
							nextArrow: `<button class="arrow-right button-arrow"></button>`,
							prevArrow: `<button class="arrow-left button-arrow"></button>`,
							responsive: [
								{
									breakpoint: 991,
									settings: {
										infinite: true,
										arrows: true,
										focusOnSelect: false,
										dots: true,
										slidesToShow: 2,
										slidesToScroll: 1,
									}
								},
								{
									breakpoint: 767,
									settings: {
										infinite: true,
										arrows: true,
										focusOnSelect: false,
										dots: true,
										slidesToShow: 1,
										slidesToScroll: 1,
									}
								},
							]
						});
					});
				};

				const deps = [
					new Promise((resolve, reject) => {
						if (typeof jQuery === 'function' && typeof jQuery.fn.slick === 'function') {
							resolve('ready');
						} else {
							document.querySelector('#messia-slick-js').addEventListener('load', () => resolve('ready'));
						}
					}),
				];

				Promise
					.all(deps)
					.then(
						resolve => {
							let fail = resolve.some(a => a.value === false || a.status === 'rejected');
							if (!fail) {
								init();
							}
						},
						reject => {
							console.log(new Error(reject));
						}
					);
			})();
		</script>
		<?php

		$s = ob_get_clean();

		wp_add_inline_script(
			'messia-slick',
			strip_tags( $s, [ 'button', 'svg', 'path' ] ), // phpcs:ignore WordPress.WP.AlternativeFunctions.strip_tags_strip_tags
			'after'
		);
		return $selector;
	}
}
