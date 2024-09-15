<?php
/**
 * Messia_Widget_Tabs_Panel
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
 * Class for Tabs on object page implementation.
 *
 * @package Messia\Modules\Widgets
 */
class Messia_Widget_Tabs_Panel extends WP_Widget {

	/**
	 * Full class name.
	 *
	 * @var Messia_Help
	 */
	private string $helpers;

	/**
	 * Current blog settings.
	 *
	 * @var array
	 */
	private array $blog_settings;

	/**
	 * Whether or not widget available in blocks editor..
	 *
	 * @var bool
	 */
	private bool $as_block = false;

	/**
	 * Widget scripts and styles.
	 *
	 * @var string
	 */
	private readonly string $widget_id;

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

		$this->widget_id     = 'messia_widget_tabs_panel';
		$this->helpers       = MIA()->get_module_helpers();
		$this->blog_settings = MIA()->get_module_settings()->get_blog_setting( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME );

		$this->widget_assets = [
			'style'  => [
				'handle' => 'widget-tabs-panel',
				'file'   => 'block-tabs-panel',
				'deps'   => [ 'messia-frontend' ],
				'shared' => true,
			],
			'script' => [
				'handle' => 'widget-tabs-panel',
				'file'   => 'block-tabs-panel',
				'deps'   => [ 'messia-frontend' ],
				'shared' => true,
			],
		];

		parent::__construct(
			// Base ID.
			$this->widget_id,
			// Name.
			'&#10070; ' . esc_html__( 'Messia', 'messia' ) . ' &raquo; ' . esc_html__( 'Tabs', 'messia' ),
			// Args.
			[
				'description'           => __( 'Creates and displays tabs with content.', 'messia' ),
				'classname'             => 'messia-widget-tabs-panel',
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
	public function widget( $args, $instance, $block_mode = false ): void { // phpcs:ignore Squiz.Commenting.FunctionComment.TypeHintMissing, Squiz.Commenting.FunctionComment.ScalarTypeHintMissing

		$active = apply_filters( "{$this->widget_id}_active", true );

		if ( ! $active ) {
			return;
		}

		if ( false === $block_mode ) {

			$scripts = MIA()->get_module_scripts();
			$scripts::register_widget_frontend_assets( $this->widget_assets );

			// STYLES.
			wp_enqueue_style( 'messia-widget-tabs-panel' );

			// SCRIPTS.
			wp_enqueue_script( 'messia-widget-tabs-panel' );
		}

		$errors        = [];
		$widget_html   = null;
		$postid        = get_the_ID();
		$post_segments = $this->helpers::get_post_terms( [ $postid ], [ 'messia_object_segment' ] );

		if ( 0 === count( $post_segments ) ) {

			// translators: %s - widget or block name.
			$errors[] = sprintf( __( '%s can be used only on post that belongs to segement term.', 'messia' ), $this->name );
			echo $this->helpers::print_errors( $this->name, $errors );

			return;
		}

		$url_alias              = get_query_var( 'messia_alias', false );
		$messia_object_page_now = is_singular( 'messia_object' );

		foreach ( $post_segments as $post_segment ) {

			$post_segment->term_id = (int) $post_segment->term_id;

			// The constructor for this term is empty.
			if ( ! isset( $instance[ $post_segment->slug ] ) ) {
				// translators: %s - taxonomy term slug.
				$errors[] = sprintf( __( 'No custom fields found for segement term with slug %s.', 'messia' ), $post_segment->slug );
				continue;
			}

			// The query has an alias for the segment term, which means you need to show the object data only in this term.
			$term_alias = $this->helpers::messia_get_term_meta( $post_segment->term_id, 'alias' );
			if ( false !== $messia_object_page_now && $url_alias && ! empty( $url_alias ) && $url_alias !== $term_alias ) {
				continue;
			}

			static $i     = 1;
			$tabs_titles  = null;
			$tabs_content = null;
			$user_tabs    = $instance[ $post_segment->slug ];

			foreach ( $user_tabs as $user_tab ) {

				$tabs_titles_class  = [ 'tab-item', 'messia-ripple-click' ];
				$tabs_content_class = [ 'tab-content' ];

				if ( ! $user_tab['active'] ) {
					continue;
				}

				if ( 1 === $i ) {
					$tabs_titles_class[]  = 'active';
					$tabs_content_class[] = 'active';
				}

				$content = "<p class='tab-title'><strong>{$user_tab['title']}</strong></p>{$user_tab['content']}";

				$tabs_titles_class  = implode( ' ', $tabs_titles_class );
				$tabs_content_class = implode( ' ', $tabs_content_class );

				$tab_id = sanitize_title( $user_tab['title'] );

				$tabs_titles  .= "<a class='{$tabs_titles_class}' href='#tab-{$tab_id}-{$i}'>{$user_tab['title']}</a>";
				$tabs_content .= "<div class='{$tabs_content_class}' id='tab-{$tab_id}-{$i}'>{$content}</div>";
			}

			if ( ! is_null( $tabs_titles ) ) {

				$widget_html .= "<div class='tabs-object dynamic-tabs'>
									<div class='tab-list'>
										{$tabs_titles}
									</div>
									{$tabs_content}
								</div>";
			}

			++$i;
		}

		if ( 1 === $this->blog_settings['debugger'] && empty( $widget_html ) ) {
			$errors[] = __( 'No one tab is active - nothing to show.', 'messia' );
		}

		$widget_html = $this->helpers::parse_placeholders( do_shortcode( (string) $widget_html ) );
		$errors      = $this->helpers::print_errors( $this->name, $errors );

		echo "{$args['before_widget']}{$widget_html}{$errors}{$args['after_widget']}";
	}

	/**
	 * Render widget form in backend.
	 *
	 * @param mixed $instance Saved value.
	 *
	 * @return void
	 */
	public function form( mixed $instance ): void {

		global $wpdb;

		$segment_terms = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT
					t.term_id,
					t.slug,
					t.name,
					tt.count,
					tt.taxonomy
				FROM $wpdb->terms AS t
				INNER JOIN $wpdb->term_taxonomy AS tt ON t.term_id = tt.term_id
				WHERE tt.taxonomy IN (%s)
				ORDER BY t.term_id ASC;",
				'messia_object_segment'
			)
		);

		if ( count( $segment_terms ) === 0 ) {
			echo '<p>' . __( 'No segments found.', 'messia' ) . '</p>';
			return;
		}

		$title         = __( 'The tab is active and will be displayed.', 'messia' );
		$placeholder   = __( 'Tab name', 'messia' );
		$new_tab_tip   = __( 'Click to create a new tab.', 'messia' );
		$sort_mode_tip = __( 'Click to enable bookmark sorting mode.', 'messia' );

		echo '<p>' . __( 'Create and customize tabs and display rules.', 'messia' ) . '</p>';

		foreach ( $segment_terms as $segment_term ) {

			$value     = [];
			$tabs_html = null;

			if ( isset( $instance[ $segment_term->slug ] ) ) {
				foreach ( $instance[ $segment_term->slug ] as $segment_tab ) {

					( $segment_tab['active'] ) ? $status = 'active' : $status = 'inactive';

					$checked = checked( $segment_tab['active'], true, false );

					$tabs_html .= "
						<div class='tab collapsed {$status}'>
							<div class='header'>
								<div contentEditable='true' class='title'>{$segment_tab['title']}</div>
								<span class='toggle-tab'></span>
								<input type='checkbox' title='{$title}' {$checked}>
								<span class='remove-tab'></span>
							</div>
							<div class='content' style='display: none;'>
								<textarea class='tab-content'>{$segment_tab['content']}</textarea>
							</div>
						</div>";

					$value[] = [
						'title'   => $title,
						'content' => $segment_tab['content'],
						'active'  => $segment_tab['active'],
					];
				}
			}

			$value = esc_html( wp_json_encode( $value ) );

			// translators: %s - taxonomy term name.
			$h4 = sprintf( __( 'Segment %s', 'messia' ), $segment_term->name );
			echo "<div class='messia-widget-tabs-panel'>
					<h4>{$h4}:</h4>
					<span id='new-tab' class='dashicons dashicons-images-alt' title='{$new_tab_tip}'></span>
					<span id='sort-mode' class='dashicons dashicons-admin-settings' title='{$sort_mode_tip}'></span>
					<div id='tab-template' class='collapsed'>
							<div class='header'>
								<div contentEditable='true' class='title'>{$placeholder}</div>
								<span class='toggle-tab'></span>
								<input type='checkbox' title='{$title}'>
								<span class='remove-tab'></span>
							</div>
							<div class='content' style='display: none;'>
								<textarea class='tab-content'></textarea>
							</div>
						</div>
					<div class='tab-fields'>{$tabs_html}</div>
					<input class='data' type='hidden' name='" . $this->get_field_name( "tabs[$segment_term->slug]" ) . "' value='{$value}'>
				 </div>";
		}
	}

	/**
	 * Save widget data into DB.
	 *
	 * @param mixed $new_instance New value.
	 * @param mixed $old_instance Previous value.
	 *
	 * @return array
	 */
	public function update( mixed $new_instance, mixed $old_instance ): array {

		foreach ( $new_instance['tabs'] as $segment_term_id => $tabs ) {
			$new_instance['tabs'][ $segment_term_id ] = json_decode( $tabs, true );
		}
		return $new_instance['tabs'];
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
