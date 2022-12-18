<?php
/**
 * Messia_Widget_Object_Categories
 *
 * @package Messia\Modules\Widgets
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Modules\Widgets;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use WP_Widget;

/**
 * Class for object categories implementation.
 *
 * @package Messia\Modules\Widgets
 */
class Messia_Widget_Object_Categories extends WP_Widget {

	/**
	 * Full class name.
	 *
	 * @var Messia_Help
	 */
	private string $helpers;

	/**
	 * Whether or not widget available in blocks editor..
	 *
	 * @var bool
	 */
	private bool $as_block = false;

	/**
	 * Widget scripts and styles.
	 *
	 * @var array
	 */
	protected array $widget_assets = [];

	/**
	 * Widget constructor.
	 *
	 * @return void
	 */
	public function __construct() {

		$this->helpers = MIA()->get_module( 'help' );

		$this->widget_assets = [
			'style'  => [
				'handle' => 'widget-object-categories',
				'file'   => 'block-object-categories',
				'deps'   => [ 'messia-frontend' ],
				'shared' => true,
			],
			'script' => [],
		];

		parent::__construct(
			// Base ID.
			'messia_widget_object_categories',
			// Name.
			'&#10070; ' . esc_html__( 'Messia', 'messia' ) . ' &raquo; ' . esc_html__( 'Object categories', 'messia' ),
			// Args.
			[
				'description'           => __( 'List of categories that the object belongs to.', 'messia' ),
				'classname'             => 'messia-widget-object-categories',
				'show_instance_in_rest' => false,
			]
		);
	}

	/**
	 * Render widget content in frontend.
	 *
	 * @param array $args       All widget data it was registered with.
	 * @param array $instance   Current saved value.
	 * @param bool  $block_mode Whether called as block (turn off then scripts and styles).
	 *
	 * @return void
	 */
	public function widget( $args, $instance, $block_mode = false ): void {

		if ( false === $block_mode ) {

			$scripts = MIA()->get_module( 'scripts' );
			$scripts::register_widget_frontend_assets( $this->widget_assets );

			// STYLES.
			wp_enqueue_style( 'messia-widget-object-categories' );

			// SCRIPTS.
			// wp_enqueue_script( 'messia-widget-object-categories' ); - not required for now.
		}

		$errors = [];

		if ( ! is_singular( 'messia_object' ) ) {
			// translators: %s - widget or block name.
			$errors[] = sprintf( __( '%s can be used only at valid object page.', 'messia' ), $this->name );
			$errors   = $this->helpers::print_errors( $this->name, $errors );

			echo $errors;
			return;
		}

		$postid = get_the_ID();

		$post_segments   = $this->helpers::get_post_terms( [ $postid ], [ 'messia_object_segment' ] );
		$post_categories = $this->helpers::get_post_terms( [ $postid ], [ 'messia_object_category' ], [ 'term_icon' ] );

		$post_categories_tree = $this->helpers::get_terms_tree( $post_categories );

		if ( count( $post_segments ) === 0 || count( $post_categories_tree ) === 0 ) {

			// translators: %s - widget or block name.
			$errors[] = sprintf( __( '%s can not show anything if object does not belong to at least one segment and one category.', 'messia' ), $this->name );
			$errors   = $this->helpers::print_errors( $this->name, $errors );
			echo $errors;

			return;
		}

		$path                    = ( is_multisite() ) ? get_blog_details()->path : '/';
		$post_categories_flatten = $this->flatten_crosslinked_terms_hierarhy( $post_categories_tree );

		echo $args['before_widget'];

		if ( ! empty( $instance['title'] ) ) {
			echo "{$args['before_title']}<span>{$instance['title']}</span>{$args['after_title']}";
		}
		foreach ( $post_segments as $post_segment ) {

			$path_to_segment = "{$path}{$post_segment->slug}";
			$chain_html      = implode( '', array_column( $post_categories_flatten, 'html' ) );
			$chain_html      = str_replace( '%path_to_segment%', $path_to_segment, $chain_html );

			echo '<div class="segment d-flex flex-wrap justify-content-between gap-2">';
			if ( count( $post_segments ) > 1 ) {
				echo "<h4>{$post_segment->name}</h4>";
			}
			echo $chain_html;
			echo '</div>';
		}
		echo $args['after_widget'];
	}

	/**
	 * Render widget form in backend.
	 *
	 * @param mixed $instance Saved value.
	 *
	 * @return void
	 */
	public function form( $instance ): void {

		$instance = wp_parse_args(
			(array) $instance,
			[
				'title' => null,
			]
		);

		$title = esc_attr( $instance['title'] );

		?>
		<p><?php esc_html_e( 'Widget works only at object page.', 'messia' ); ?></p>
		<p>
			<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php esc_html_e( 'Title', 'messia' ); ?></label>
			<input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo $title; ?>" />
		</p>
		<?php
	}

	/**
	 * Save widget data into DB.
	 *
	 * @param mixed $new_instance New value.
	 * @param mixed $old_instance Previous value.
	 *
	 * @return array
	 */
	public function update( $new_instance, $old_instance ): array {

		$instance = [];

		$instance['title'] = wp_strip_all_tags( $new_instance['title'] );

		return $instance;
	}

	/**
	 * Get term icon.
	 *
	 * @param array $term Taxonomy term data.
	 *
	 * @return string
	 */
	private function get_image( array $term ): ?string {

		$image = null;

		if ( ! empty( $term['term_icon'] ) ) {
			$image = $this->helpers::get_media_icon_front( json_decode( $term['term_icon'], false ) );
		}
		return $image;
	}

	/**
	 * Build HTML tree-like structure of terms form hierarchical array of these terms.
	 * Result will be added into each root term of passed here $taxonomy_terms_tree to the
	 * new key "html".
	 *
	 * @param array  $taxonomy_terms_tree Hierarchical array of terms.
	 * @param int    $root_term_id        Stuff data, do not pass here anything.
	 * @param string $relative_path       Stuff data, do not pass here anything.
	 * @param array  $parent_term         Stuff data, do not pass here anything.
	 * @param array  $level               Stuff data, do not pass here anything.
	 * @param int    $indent              Stuff data, do not pass here anything.
	 *
	 * @return array
	 */
	private function flatten_crosslinked_terms_hierarhy( array $taxonomy_terms_tree, ?int $root_term_id = null, ?string $relative_path = null, ?array $parent_term = null, array $level = [], int $indent = 0 ): array {

		foreach ( $taxonomy_terms_tree as $term ) {

			$_term = $term;

			$_term['relative_path'] = null;

			if ( isset( $_term['children'] ) ) {
				unset( $_term['children'] );
			}
			if ( is_null( $root_term_id ) || is_null( $parent_term ) ) {
				$relative_path = null;
				$root_term_id  = (int) $term['term_id'];
			} else {
				$relative_path          .= $_term['slug'] . '/';
				$_term['relative_path'] .= $relative_path;
			}

			if ( $parent_term ) {
				$level[ $root_term_id ]['children'][] = $_term;
			} else {
				$level[ $term['term_id'] ] = $_term;
			}

			$image = $this->get_image( $_term );
			// translators: %s - taxonomy term name.
			$title = sprintf( __( 'Objects within category %s', 'messia' ), $_term['name'] );

			if ( $parent_term ) {

				$html = "<ul class='cross-categories ps-3'>
							<li class='node'>
								<span class='bullet'></span>
								{$image}
								<a title='{$title}' href='%path_to_segment%/{$_term['relative_path']}'>{$_term['name']}</a>
							</li>";

				$level[ $root_term_id ]['html'] .= $html;
			} else {

				$classes = [ 'cross-categories', 'p-0', 'mb-0' ];

				if ( ! array_key_exists( 'children', $term ) || empty( array_column( $term['children'], 'children' ) ) ) {
					$classes[] = 'd-inline-flex flex-wrap';
				} else {
					$classes[] = 'hierarchical';
				}

				$classes = implode( ' ', $classes );

				$html = "<ul class='{$classes}'>
							<li class='root d-flex'>
								{$image}
								<a class='ms-2 d-block' title='{$title}' href='%path_to_segment%/'>{$_term['name']}</a>
							</li>";

				$level[ $root_term_id ]['html'] = $html;
			}

			if ( isset( $term['children'] ) ) {
				++$indent;
				foreach ( $term['children'] as $child_term ) {
					$level = $this->flatten_crosslinked_terms_hierarhy( [ $term['term_id'] => $child_term ], $root_term_id, $relative_path, $term, $level, $indent );
				}
				--$indent;
			}

			$level[ $root_term_id ]['html'] .= '</ul>';
		}

		return $level;
	}

	/**
	 * Build HTML tree-like structure of terms form hierarchical array of these terms.
	 * Result will be added into each root term of passed here $taxonomy_terms_tree to the
	 * new key "html".
	 *
	 * @param array  $taxonomy_terms_tree Hierarchical array of terms.
	 * @param int    $root_term_id        Stuff data, do not pass here anything.
	 * @param string $relative_path       Stuff data, do not pass here anything.
	 * @param array  $parent_term         Stuff data, do not pass here anything.
	 * @param array  $level               Stuff data, do not pass here anything.
	 * @param int    $indent              Stuff data, do not pass here anything.
	 *
	 * @return array
	 */
	private function flatten_crosslinked_terms_hierarhy_old( array $taxonomy_terms_tree, ?int $root_term_id = null, ?string $relative_path = null, ?array $parent_term = null, array $level = [], int $indent = 0 ): array {

		foreach ( $taxonomy_terms_tree as $term ) {

			$_term = $term;

			$_term['relative_path'] = null;

			if ( isset( $_term['children'] ) ) {
				unset( $_term['children'] );
			}
			if ( is_null( $root_term_id ) || is_null( $parent_term ) ) {
				$relative_path = null;
				$root_term_id  = (int) $term['term_id'];
			} else {
				$relative_path          .= $_term['slug'] . '/';
				$_term['relative_path'] .= $relative_path;
			}

			if ( $parent_term ) {
				$level[ $root_term_id ]['children'][] = $_term;
			} else {
				$level[ $term['term_id'] ] = $_term;
			}

			$image = $this->get_image( $_term );
			// translators: %s - taxonomy term name.
			$title = sprintf( __( 'Objects within category %s', 'messia' ), $_term['name'] );

			if ( $parent_term ) {

				$html = "<ul class='cross-categories ps-3'><li><span class='bullet'>&rtrif;</span>&nbsp;{$image}<a title='{$title}' href='%path_to_segment%/{$_term['relative_path']}'>{$_term['name']}</a></li>";

				$level[ $root_term_id ]['html'] .= $html;
			} else {

				$classes = 'cross-categories p-0 root mb-3';
				if ( ! empty( array_column( $term['children'], 'children' ) ) ) {
					$classes .= ' hierarchical';
				}

				$html = "<ul class='{$classes}'><li class='d-flex mb-1 align-items-center'>{$image}<a class='ms-2 d-block' title='{$title}' href='%path_to_segment%/'>{$_term['name']}</a></li>";

				$level[ $root_term_id ]['html'] = $html;
			}

			if ( isset( $term['children'] ) ) {
				++$indent;
				foreach ( $term['children'] as $child_term ) {
					$level = $this->flatten_crosslinked_terms_hierarhy( [ $term['term_id'] => $child_term ], $root_term_id, $relative_path, $term, $level, $indent );
				}
				--$indent;
			}

			$level[ $root_term_id ]['html'] .= '</ul>';
		}

		return $level;
	}

	/**
	 * Getter of widget property "as_block".
	 *
	 * @return bool
	 */
	public function get_as_block(): bool {
		return $this->as_block;
	}
}
