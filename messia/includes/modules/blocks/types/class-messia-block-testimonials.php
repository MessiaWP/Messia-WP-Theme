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
use WP_Comment;
use ReflectionClass;
use Exception;

/**
 * Messia_Block_Testimonials class.
 *
 * @package Messia\Modules\Gutenberg\Blocks
 */
class Messia_Block_Testimonials extends Messia_Block_Abstract_Dynamic {

	/**
	 * Comment length.
	 *
	 * @var int
	 */
	protected int $comment_length;

	/**
	 * Messia_Block_Testimonials Constructor
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
				'deps'    => [
					'jquery',
					'messia-select2',
				],
			],
			'editor_style'  => [
				'enqueue' => true,
				'deps'    => [
					'messia-select2',
				],
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
				'isExample'       => [
					'type'    => 'boolean',
					'default' => false,
				],
				'forPostType'     => [
					'type'    => 'array',
					'default' => [],
				],
				'inResponseTo'    => [
					'type'    => 'array',
					'default' => [],
				],
				'ratingMin'       => [
					'type'    => 'integer',
					'default' => 0,
				],
				'ratingMax'       => [
					'type'    => 'integer',
					'default' => 5,
				],
				'excludeNoRating' => [
					'type'    => 'boolean',
					'default' => true,
				],
				'limit'           => [
					'type'    => 'integer',
					'default' => 5,
				],
				'shrinkTo'        => [
					'type'    => 'integer',
					'default' => 200,
				],
				'slider'          => [
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
				'orderBy'         => [
					'type'    => 'string',
					'default' => 'comment_date',
					'enum'    => [ 'comment_date', 'rating' ],
				],
				'orderDir'        => [
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
	 * Render the Testimonials block inner content.
	 *
	 * @param array $attributes Current attributes.
	 *
	 * @return string
	 */
	public function render_block( array $attributes ): string {

		global $wpdb;

		$this->comment_length = $attributes['shrinkTo'];

		$attributes['ratingMin'] = (int) $attributes['ratingMin'];
		$attributes['ratingMax'] = (int) $attributes['ratingMax'];
		$attributes['limit']     = (int) $attributes['limit'];

		$render = '';
		$errors = [];
		$limit  = ( $attributes['limit'] > 0 ) ? " LIMIT {$attributes['limit']}" : null;
		// translators: %s - block name.
		$trick = sprintf( __( 'To fix errors you may try to resave the %s.', 'messia' ), $this->block_name );
		$where = [
			"comment_type = 'comment'",
			'comment_approved = 1',
			"cm.meta_key = 'messia_rating'",
			"cm.meta_value >= {$attributes['ratingMin']}",
			"cm.meta_value <= {$attributes['ratingMax']}",
		];
		$join  = [
			"INNER JOIN $wpdb->commentmeta AS cm ON cm.comment_id = c.comment_ID",
		];

		if ( ! empty( $attributes['forPostType'] ) || ! empty( $attributes['inResponseTo'] ) ) {
			$join[] = "INNER JOIN $wpdb->posts AS posts ON posts.ID = c.comment_post_ID";
		}

		if ( ! empty( $attributes['forPostType'] ) ) {
			$where[] = "post_type IN ('" . implode( "','", esc_sql( $attributes['forPostType'] ) ) . "')";
		}

		if ( ! empty( $attributes['inResponseTo'] ) ) {
			$where[] = "post_name IN ('" . implode( "','", esc_sql( $attributes['inResponseTo'] ) ) . "')";
		}

		if ( true === $attributes['excludeNoRating'] ) {
			$where[] = "(cm.meta_value >= {$attributes['ratingMin']} AND cm.meta_value <= {$attributes['ratingMax']})";
		} else {
			$where[] = "( (cm.meta_value >= {$attributes['ratingMin']} AND cm.meta_value <= {$attributes['ratingMax']}) OR cm.meta_value IS NULL )";
		}

		$where = implode( ' AND ', $where );
		$join  = implode( ' ', $join );

		$sql = "SELECT
					c.*,
					cm.meta_value AS rating
				FROM $wpdb->comments as c
				$join
				WHERE $where
				##ORDER BY {$attributes['orderBy']}## $limit";

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

		$comments = $wpdb->get_results( $sql, OBJECT_K ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

		if ( 0 === count( $comments ) && 1 === $this->blog_settings['debugger'] ) {
			$errors[] = __( 'No comments found. Change parameters.', 'messia' );
		} else {

			/* STYLES */
			wp_enqueue_style( 'messia-comment-list' );

			$wrapper_classes = [ 'comment-items' ];

			if ( true === $attributes['slider']['active'] ) {
				$wrapper_classes[] = 'messia-slider';
				$wrapper_classes[] = 'slider-items';
				$wrapper_classes[] = $this->enqueue_slick_carousel();
			}

			add_action( 'messia_before_comment_details', [ $this, 'add_comment_target_data' ] );
			add_filter( 'comment_text', [ $this, 'comment_text' ], 10, 3 );

			ob_start();
			?>

			<div class="<?php echo implode( ' ', $wrapper_classes ); ?>">
			<?php
			wp_list_comments(
				[
					'style'      => 'div',
					'per_page'   => -1,
					'modules'    => [
						'stars'       => true,
						'date'        => true,
						'av_point'    => false,
						'av_point_of' => true,
						'reviews'     => false,
					],
					'type'       => 'all',
					'short_ping' => true,
					'callback'   => [ 'Smartbits\Messia\Includes\Helpers\Messia_Help', 'shape_comment' ],
				],
				$comments
			);
			?>
			</div>
			<?php

			$render .= ob_get_clean();
		}

		$errors = $this->helpers::print_errors( $this->block_name, $errors, $trick );
		$render = "{$errors}{$render}";

		return $render;
	}

	/**
	 * Build data for HTML elements on backend.
	 *
	 * @return array.
	 */
	/**
	 * Route for getting testimonials by block attributes.
	 * Used to build data for HTML elements on backend.
	 *
	 * @return void
	 */
	public function rest(): void {
		register_rest_route(
			'messia/v1',
			'/testimonials',
			[
				'methods'             => 'POST',
				'permission_callback' => function ( WP_REST_Request $request ) {
					return current_user_can( 'edit_others_posts' );
				},
				'callback'            => function ( WP_REST_Request $request ) {

					$params = $request->get_params();

					if ( isset( $params['search'] ) ) {
						return $this->search_posts( $params['search'] );
					} elseif ( isset( $params['currentAttrs'] ) ) {
						return $this->get_posts( $params['currentAttrs']['inResponseTo'] );
					}
				},
			]
		);
	}

	/**
	 * Get posts in DB by slugs.
	 *
	 * @param array $post_slugs As it said.
	 *
	 * @return array
	 */
	private function get_posts( array $post_slugs ): array {

		$return = [];

		global $wpdb;
		$post_slugs = "('" . implode( "','", esc_sql( $post_slugs ) ) . "')";
		$sql_posts  =
			"SELECT
				post_name as value,
				post_title as label
			FROM $wpdb->posts
			WHERE
				post_status = 'publish'
				AND ( 
					post_type = 'post' OR post_type = 'messia_object'
				)
				AND post_name IN $post_slugs
			ORDER BY post_name ASC";

		$posts = $wpdb->get_results( $sql_posts ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

		foreach ( $posts as $post ) {
			$return[] = [
				'label' => $post->label,
				'value' => $post->value,
			];
		}

		return $return;
	}

	/**
	 * Search posts in DB by substring in post title.
	 *
	 * @param string $post_name String to search accross post names.
	 *
	 * @return array
	 */
	private function search_posts( string $post_name ): array {

		$return = [
			'results' => [],
		];

		global $wpdb;

		$post_name = '%' . esc_sql( $wpdb->esc_like( $post_name ) ) . '%';

		$sql_posts =
			"SELECT
				post_name as id,
				post_title as text
			FROM $wpdb->posts
			WHERE
				post_type = 'post'
				AND post_status = 'publish'
				AND post_title LIKE '$post_name'
			ORDER BY post_name ASC";

		$sql_objects =
			"SELECT
				post_name as id,
				post_title as text
			FROM $wpdb->posts
			WHERE
				post_type = 'messia_object'
				AND post_status = 'publish'
				AND post_title LIKE '$post_name'
			ORDER BY post_name ASC";

		$posts   = $wpdb->get_results( $sql_posts ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
		$objects = $wpdb->get_results( $sql_objects ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

		if ( ! empty( $posts ) ) {
			$return['results'][] = [
				'text'     => __( 'Posts', 'messia' ),
				'children' => $posts,
			];
		}

		if ( ! empty( $objects ) ) {
			$return['results'][] = [
				'text'     => __( 'Objects', 'messia' ),
				'children' => $objects,
			];
		}

		return $return;
	}

	/**
	 * Add link to commented object.
	 *
	 * @param object $comment Comment itself.
	 *
	 * @return void
	 */
	public function add_comment_target_data( object $comment ): void {
		$object_page_url = get_the_permalink( $comment->comment_post_ID );
		$object_title    = get_the_title( $comment->comment_post_ID );

		// translators: %s - word On.
		echo sprintf( "<span>%s</span><a href='{$object_page_url}'>{$object_title}</a>", __( 'On', 'messia' ) );
	}


	/**
	 * Filters the text of a comment to be displayed.
	 *
	 * @param string          $comment_text Text of the current comment.
	 * @param WP_Comment|null $comment      The comment object. Null if not found.
	 * @param array           $args         An array of arguments.
	 *
	 * @return string
	 */
	public function comment_text( string $comment_text, WP_Comment $comment, array $args ): string {
		if ( 0 === $this->comment_length ) {
			return $comment_text;
		}
		if ( strlen( $comment_text ) <= $this->comment_length ) {
			return $comment_text;
		}

		return substr( $comment_text, 0, $this->comment_length ) . '[…]';
	}

	/**
	 * Show content in slider.
	 *
	 * @return string Slider selector class.
	 */
	public function enqueue_slick_carousel(): string {

		$rnd = bin2hex( random_bytes( 5 ) );

		wp_enqueue_style( 'messia-slick-style' );
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
							slidesToShow: 3,
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
