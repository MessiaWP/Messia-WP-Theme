<?php
/**
 * Messia_Widget_Post_Content
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
 * Class for showing content of any post via widget.
 *
 * @package Messia\Modules\Widgets
 */
class Messia_Widget_Post_Content extends WP_Widget {

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

		parent::__construct(
			// Base ID.
			'messia_widget_post_content',
			// Name.
			'&#10070; ' . esc_html__( 'Messia', 'messia' ) . ' &raquo; ' . esc_html__( 'WP Post content ', 'messia' ),
			// Args.
			[
				'description'           => __( 'Output the content of any current WP object (page/post)', 'messia' ),
				'classname'             => 'messia-widget-post-content',
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

		echo $args['before_widget'];
		echo $this->helpers::parse_placeholders( apply_filters( 'the_content', get_the_content() ) );
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
		?>
		<p><?php esc_html_e( 'Widget do not support any settings.', 'messia' ); ?></p>
		<?php
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
