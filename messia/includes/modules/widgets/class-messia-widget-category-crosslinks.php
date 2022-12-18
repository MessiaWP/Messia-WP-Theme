<?php
/**
 * Messia_Widget_Category_Crosslinks
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
 * Class for category links visualisation.
 *
 * @package Messia\Modules\Widgets
 */
class Messia_Widget_Category_Crosslinks extends WP_Widget {

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
	 * Whether or not widget available in blocks editor.
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

		$this->helpers       = MIA()->get_module( 'help' );
		$this->blog_settings = MIA()->get_module( 'settings' )->get_blog_setting( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME );

		$this->widget_assets = [
			'style'  => [
				'handle' => 'widget-category-crosslinks',
				'file'   => 'block-category-crosslinks',
				'deps'   => [ 'messia-frontend' ],
				'shared' => true,
			],
			'script' => [
				'handle' => 'widget-category-crosslinks',
				'file'   => 'block-category-crosslinks',
				'deps'   => [ 'messia-frontend' ],
				'shared' => true,
			],
		];

		parent::__construct(
			// Base ID.
			'messia_widget_category_crosslinks',
			// Name.
			'&#10070; ' . esc_html__( 'Messia', 'messia' ) . ' &raquo; ' . esc_html__( 'Category crosslinks', 'messia' ),
			// Args.
			[
				'description'           => __( 'Shows category links cloud.', 'messia' ),
				'classname'             => 'messia-widget-category-crosslinks',
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

		global $wpdb;
		$errors               = [];
		$home                 = home_url();
		$init_visible         = $instance['initVisibleInGroup'];
		$groups_html          = null;
		$null_terms_condition = null;
		$with_count           = $instance['withCount'];
		$hide_empty           = $this->blog_settings['messia_object_category_empty_terms_to_filter'];
		$segment_terms        = $instance['segmentTerms'];

		$listing = MIA()->get_module( 'listing' );

		if ( false === $block_mode ) {

			$scripts = MIA()->get_module( 'scripts' );
			$scripts::register_widget_frontend_assets( $this->widget_assets );

			// STYLES.
			wp_enqueue_style( 'messia-widget-category-crosslinks' );

			// SCRIPTS.
			wp_enqueue_script( 'messia-widget-category-crosslinks' ); // - not required for now.
		}

		if ( empty( $segment_terms ) ) {
			$errors = [
				__( 'Nothing to show. Change conditions.', 'messia' ),
			];
			$errors = $this->helpers::print_errors( $this->name, $errors );

			echo $errors;
			return;
		}

		if ( 1 !== $hide_empty ) {
			// Terms should be included into parent terms too.
			$null_terms_condition = ' OR ( tr.object_id IS NULL )';
		}

		foreach ( $instance['segmentTerms'] as $segment_slug ) {

			$segment_term_id = (int) $wpdb->get_var(
				$wpdb->prepare(
					"SELECT term_id
					FROM $wpdb->terms
					WHERE slug = %s",
					$segment_slug
				)
			);

			if ( 0 === $segment_term_id ) {

				// translators: %s - taxonomy slug.
				$errors[] = sprintf( __( 'Segement term with slug %s does not exist.', 'messia' ), $segment_slug );
				continue;
			}

			$sql = "SELECT
						tt.term_id,
						t.slug,
						t.name,
						tt.taxonomy,
						tt.count,
						tt.term_taxonomy_id,
						tt.parent,
						crosslinking_exclude.meta_value AS crosslinking_exclude,
						term_icon.meta_value AS term_icon
					FROM
					# SELECT FROM root terms and their direct children only
					(
						# root terms
						(
							SELECT t.name, t.slug, tt.taxonomy, tt.count, tt.term_id, tt.term_taxonomy_id, tt.parent
							FROM $wpdb->terms AS t INNER JOIN $wpdb->term_taxonomy AS tt ON t.term_id = tt.term_id WHERE parent = 0 AND tt.taxonomy IN('messia_object_category')
						)
						UNION
						# first level children
						(
							SELECT t.name, t.slug, tt.taxonomy, tt.count, tt.term_id, tt.term_taxonomy_id, tt.parent
							FROM $wpdb->terms AS t INNER JOIN $wpdb->term_taxonomy AS tt ON t.term_id = tt.term_id WHERE tt.parent
								IN(
									SELECT t.term_id FROM $wpdb->terms AS t INNER JOIN $wpdb->term_taxonomy AS tt ON t.term_id = tt.term_id WHERE parent = 0 AND tt.taxonomy IN('messia_object_category')
								)
								AND tt.taxonomy IN('messia_object_category')
						)
					) as t
					INNER JOIN $wpdb->term_taxonomy AS tt ON t.term_id = tt.term_id
					LEFT JOIN $wpdb->term_relationships AS tr ON tr.term_taxonomy_id = tt.term_taxonomy_id
					LEFT JOIN( SELECT term_id, meta_value FROM $wpdb->termmeta WHERE meta_key = 'crosslinking_exclude' ) AS crosslinking_exclude ON t.term_id = crosslinking_exclude.term_id
					LEFT JOIN( SELECT term_id, meta_value FROM $wpdb->termmeta WHERE meta_key = 'term_icon' ) AS term_icon ON t.term_id = term_icon.term_id
					WHERE
						tt.taxonomy IN ('messia_object_category')
						AND (
							tr.object_id IN (
							SELECT posts.ID FROM $wpdb->posts AS posts
							INNER JOIN $wpdb->term_relationships ON posts.ID = $wpdb->term_relationships.object_id AND $wpdb->term_relationships.term_taxonomy_id IN($segment_term_id) AND posts.post_type = 'messia_object'
							GROUP BY posts.ID
							) $null_terms_condition
						)
						AND ( crosslinking_exclude.meta_value = 0 OR crosslinking_exclude.meta_value IS NULL )
					GROUP BY t.slug ORDER BY t.name ASC;";

			$terms = $wpdb->get_results( $sql, OBJECT_K ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

			// Empty terms should be returned if their descendants are not empty.
			if ( $hide_empty && is_array( $terms ) ) {
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
						unset( $terms[ $k ] );
					}
				}
			}

			$crosslinked_hierarhy = [];

			foreach ( $terms as $term ) {
				if ( '0' === $term->parent ) {
					if ( ! isset( $crosslinked_hierarhy[ $term->term_id ] ) ) {
						$crosslinked_hierarhy[ $term->term_id ] = [ 'children' => [] ];
					}
					$crosslinked_hierarhy[ $term->term_id ] = array_merge( (array) $term, $crosslinked_hierarhy[ $term->term_id ] );
				} else {
					$crosslinked_hierarhy[ $term->parent ]['children'][] = (array) $term;
				}
			}

			// HTML structure.
			if ( empty( $crosslinked_hierarhy ) ) {
				$term = get_term_by( 'id', $segment_term_id, 'messia_object_segment' );
				// translators: %s - term name.
				$errors[] = sprintf( __( 'No objects in segment %s. Nothing to link to.', 'messia' ), $term->name );
			} else {
				$term         = get_term_by( 'slug', $segment_slug, 'messia_object_segment' );
				$groups_html .= "<h5 class='mb-3 line-throw-right'>{$term->name}</h5>";
			}

			foreach ( $crosslinked_hierarhy as $term_id => $parent ) {

				$image_parent = null;

				if ( ! isset( $parent['term_id'] ) ) {
					/*
					 * This a case when object included in some non-root term by not to it's parent
					 * so we need to retrieve parent term data.
					 */
					$parent = array_merge( $parent, (array) get_term_by( 'id', $term_id, 'messia_object_category' ) );
				}

				if ( ! empty( $parent['term_icon'] ) ) {

					$image = json_decode( $parent['term_icon'], false );
					if ( ! empty( $parent['term_icon'] ) ) {
						$image_parent = '<i class="messia-icon mt-2 me-3">' . $this->helpers::get_media_icon_front( $image, [ 50, 50 ] ) . '</i>';
					}
				}

				$i = 0;

				$group_inner_html = null;

				foreach ( $parent['children'] as $child ) {

					( $with_count ) ? $count = " [{$child['count']}]" : $count = null;

					( $i >= $init_visible && $init_visible > 0 ) ? $class = "class='d-none mb-2 hidden {$child['slug']}'" : $class = "class='{$child['slug']} mb-2'";
					( $i >= $init_visible && $init_visible > 0 ) ? $more  = "<a href='#' class='toggle' data-shown='{$init_visible}' data-prev-text=" . __( 'Collapse', 'messia' ) . '>' . __( 'Show more...', 'messia' ) . '</a>' : $more = null;

					$group_inner_html .= "<li {$class}>
											<a href='{$home}/{$segment_slug}/{$child['slug']}/'>
												<span>{$child['name']}{$count}</span>
											</a>
										</li>";
					++$i;
				}

				( $with_count ) ? $count = " [{$parent['count']}]" : $count = null;

				$groups_html .= "<div class='group-holder d-flex align-items-start col-12 col-sm-6 col-md-3 mb-3' >
									{$image_parent}
									<div class='group-holder-inner'>
										<h4 class='group-title mb-3 {$parent['slug']}'>
											<a href='{$home}/{$segment_slug}/{$parent['slug']}/' class='text-decoration-none'>
												
												<span>{$parent['name']}{$count}</span>
											</a>
										</h4>
										<ul class='group-content list-none p-0'>{$group_inner_html}</ul>
										{$more}
									</div>
								</div>";
			}
		}

		// translators: %s - widget or block name.
		$trick  = sprintf( __( 'To fix errors you may try to resave the %s.', 'messia' ), $this->name );
		$errors = $this->helpers::print_errors( $this->name, $errors, $trick );

		echo $args['before_widget'];

		if ( ! empty( $instance['title'] ) ) {
			echo "{$args['before_title']}<span>{$instance['title']}</span>{$args['after_title']}";
		}
		echo "<div class='groups-crosslinks-wrapper row'>{$groups_html}{$errors}</div>";
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

		if ( 0 === count( $segment_terms ) ) {
			echo '<p>' . __( 'No segments found.', 'messia' ) . '</p>';
			return;
		}

		$instance = wp_parse_args(
			(array) $instance,
			[
				// Keys should be the same as in corresponding block.
				'segmentTerms'       => [],
				'initVisibleInGroup' => 4,
				'withCount'          => true,
			]
		);

		ob_start();

		foreach ( $segment_terms as $segment_term ) {
			?>
			<p>
				<label for="<?php echo $this->get_field_id( 'segmentTerms' ); ?>"><?php echo $segment_term->name; ?></label>
				<input
					class="widefat"
					type="checkbox"
					<?php checked( in_array( $segment_term->slug, $instance['segmentTerms'], true ), true ); ?>
					id="<?php echo $this->get_field_id( 'segmentTerms' ); ?>"
					name="<?php echo $this->get_field_name( 'segmentTerms[]' ); ?>"
					value="<?php echo $segment_term->slug; ?>"
				/>
			</p>
			<?php
		}

		$segemnt_html = ob_get_clean();
		?>

		<div class="messia-widget-category-crosslinks">
			<p><strong><?php esc_html_e( 'Setup options:', 'messia' ); ?></strong></p>
			<div class="options">
				<?php echo $segemnt_html; ?>
				<p>
					<label for="<?php echo $this->get_field_id( 'withCount' ); ?>"><?php esc_html_e( 'Show count:', 'messia' ); ?></label>
					<input
						class="widefat"
						type="checkbox"
						<?php checked( $instance['withCount'], true ); ?>
						id="<?php echo $this->get_field_id( 'withCount' ); ?>"
						name="<?php echo $this->get_field_name( 'withCount' ); ?>"
						value="true"
					/>
				</p>
				<p>
					<label for="<?php echo $this->get_field_id( 'initVisibleInGroup' ); ?>"><?php esc_html_e( 'Visible:', 'messia' ); ?></label>
					<input
						type="number"
						min="0"
						step="1"
						id="<?php echo $this->get_field_id( 'initVisibleInGroup' ); ?>"
						name="<?php echo $this->get_field_name( 'initVisibleInGroup' ); ?>"
						value="<?php echo $instance['initVisibleInGroup']; ?>"
					/>
				</p>
			</div>
		</div>
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

		$instance['segmentTerms']       = array_key_exists( 'segmentTerms', $new_instance ) ? $new_instance['segmentTerms'] : [];
		$instance['initVisibleInGroup'] = (int) wp_strip_all_tags( $new_instance['initVisibleInGroup'] );
		$instance['withCount']          = (bool) $new_instance['withCount'];

		return $instance;
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
