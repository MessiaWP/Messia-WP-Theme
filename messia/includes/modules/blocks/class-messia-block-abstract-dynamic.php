<?php
/**
 * Block Abstract
 *
 * @package Messia\Modules\Gutenberg\Blocks
 */

declare(strict_types = 1);

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
namespace Smartbits\Messia\Includes\Modules\Blocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Messia_Block_Abstract_Dynamic class.
 * Prototype of any block.
 *
 * @package Messia\Modules\Gutenberg\Blocks
 */
abstract class Messia_Block_Abstract_Dynamic {

	/**
	 * Block namespace.
	 *
	 * @var string
	 */
	protected string $namespace = 'messia';

	/**
	 * Current blog settings.
	 *
	 * @var array
	 */
	protected array $blog_settings = [];

	/**
	 * Full class name.
	 *
	 * @var Messia_Help
	 */
	protected string $helpers;

	/**
	 * If we are in block preview mode in admin or customizer.
	 *
	 * @var bool
	 */
	protected bool $preview_mode = false;

	/**
	 * In what sidebar id preview mode triggered.
	 *
	 * @var string
	 */
	protected ?string $preview_area_id = null;

	/**
	 * Force child to have method for render block itself.
	 *
	 * @param array  $attributes Current block attributes.
	 * @param string $content    Block content (always null for dynamic blocks).
	 *
	 * @return string
	 */
	abstract public function render( array $attributes, string $content = null ): ?string;

	/**
	 * Force child to have method for getting block attributes.
	 *
	 * @return array
	 */
	abstract protected function get_attributes(): array;

	/**
	 * Join block attributes with shared attributes, used in all blocks.
	 *
	 * @param array $block_attributes Single block attributes.
	 *
	 * @return array
	 */
	protected function join_shared_attributes( array $block_attributes ): array {
		return array_merge(
			$block_attributes,
			[
				'className' => [
					'type'    => 'string',
					'default' => null,
				],
			]
		);
	}

	/**
	 * Register block in WP.
	 *
	 * @return void
	 */
	public function register_block_type(): void {

		$assets = [];

		$widgets             = MIA()->get_module( 'widgets' );
		$this->helpers       = MIA()->get_module( 'help' );
		$this->blog_settings = MIA()->get_module( 'settings' )->get_blog_setting( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME );
		$this->sidebar_args  = $widgets->get_shared_args();

		( true === $this->block_assets['editor_script']['enqueue'] ) ? $assets['editor_script'] = "messia-{$this->block_name}-editor" : '';
		( true === $this->block_assets['editor_style']['enqueue'] ) ? $assets['editor_style']   = "messia-{$this->block_name}-editor" : '';

		// Front styles does not required in admin area - preview render will load it himself.
		( true === $this->block_assets['style']['enqueue'] && ! is_admin() ) ? $assets['style']   = "messia-{$this->block_name}" : '';
		( true === $this->block_assets['script']['enqueue'] && ! is_admin() ) ? $assets['script'] = "messia-{$this->block_name}" : '';

		register_block_type(
			$this->namespace . '/' . $this->block_name,
			array_merge(
				[
					'render_callback' => [ $this, 'render' ],
					'attributes'      => $this->get_attributes(),
				],
				$assets
			)
		);

		/**
		 * Reasone for ignore:
		 * This is WP Rest request and nonce validated in rest_cookie_check_errors() fn.
		 */
		$context    = ( isset( $_GET['context'] ) ) ? $_GET['context'] : false; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$is_preview = ( isset( $_GET['isPreview'] ) ) ? ! is_null( $_GET['isPreview'] ) && ! empty( $_GET['isPreview'] ) : false; // phpcs:ignore WordPress.Security.NonceVerification.Recommended

		if ( true === $is_preview && 'edit' === $context ) {
			$this->preview_mode    = true;
			$this->preview_area_id = $_GET['isPreview']; // phpcs:ignore WordPress.Security.NonceVerification.Recommended

			// Used for triggering scripts registration.
			do_action( 'messia_block_preview_requested' );
		}

		add_filter( 'widget_block_dynamic_classname', [ $this, 'widget_block_dynamic_classname' ], 10, 2 );

		// Backend assets always required, but front - each block should register itself.
		$this->register_block_backend_assets();
	}

	/**
	 * Callback for WP "widget_block_dynamic_classname" hook.
	 * Set messia class name corresponding to widget name.
	 *
	 * @param string $classname  The classname to be used in the block widget's container HTML.
	 * @param string $block_name The name of the block contained by the block widget.
	 *
	 * @return string
	 */
	public function widget_block_dynamic_classname( ?string $classname, ?string $block_name ): string {
		if ( $block_name === $this->get_full_name() ) {

			$is_widget = $this->refer_widget;

			switch ( gettype( $is_widget ) ) {
				// it is block - but actually it never should be processed here. Widgets only.
				case 'boolean':
					break;

				// it is widget.
				case 'string':
					$classname .= ' ' . str_replace( '_', '-', $is_widget );
					break;
			}
		}
		return $classname;
	}

	/**
	 * Register block styles and script for backend.
	 * WP will enqueue them in WP Block render fn.
	 * In $block_assest key 'enqueue' should be true to enqueue files.
	 *
	 * Naming standard:
	 * js backend   - block_name-editor.js
	 * css backend  - block_name-editor.css
	 *
	 * Also see: hook Messia_Hooks->on_load_script_translation_file(), Messia_Hooks->blocks_assets()
	 *
	 * @return void
	 */
	protected function register_block_backend_assets(): void {

		$min = '.min';

		if ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) {
			$min = null;
		}

		if ( true === $this->block_assets['editor_script']['enqueue'] ) {

			$script_name_editor      = "messia-{$this->block_name}-editor";
			$script_name_editor_file = str_replace( 'messia-', '', $script_name_editor );

			wp_register_script(
				$script_name_editor, // the name is the same as in $this->register_block_type().
				MESSIA_THEME_URL . "/includes/assets/js/blocks/{$script_name_editor_file}{$min}.js",
				array_merge( $this->block_assets['editor_script']['deps'], [ 'messia-block-blocks-editor', 'wp-blocks', 'wp-element', 'wp-components', 'wp-i18n', 'wp-data' ] ),
				MESSIA_THEME_VERSION,
				true
			);
			// The name is the same as in $this->register_block_type().
			// See hook Messia_Hooks->on_load_script_translation_file().
			wp_set_script_translations( $script_name_editor, 'messia', MESSIA_THEME_DIR . '/includes/assets/langs/blocks' );
		}

		if ( true === $this->block_assets['editor_style']['enqueue'] ) {

			$style_name_editor      = "messia-{$this->block_name}-editor";
			$style_name_editor_file = str_replace( 'messia-', '', $style_name_editor );

			wp_register_style(
				$style_name_editor, // the name is the same as in $this->register_block_type().
				MESSIA_THEME_URL . "/includes/assets/css/blocks/{$style_name_editor_file}{$min}.css",
				array_merge( $this->block_assets['editor_style']['deps'], [ 'messia-block-blocks-editor' ] ),
				MESSIA_THEME_VERSION,
				'all'
			);
		}
	}

	/**
	 * Register block styles and script for front.
	 * WP will enqueue them in WP Block render fn.
	 * In $block_assest key 'enqueue' should be true to enqueue files.
	 *
	 * Naming standard:
	 * js frontend  - block_name.js
	 * css frontend - block_name.css
	 *
	 * Also see: hook Messia_Hooks->on_load_script_translation_file(), Messia_Hooks->blocks_assets()
	 *
	 * @return void
	 */
	protected function register_block_frontend_assets(): void {

		$min = '.min';

		if ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) {
			$min = null;
		}

		$script_name_editor = "messia-{$this->block_name}-editor";

		if ( true === $this->block_assets['script']['enqueue'] ) {

			$script_name_front      = "messia-{$this->block_name}";
			$script_name_front_file = str_replace( 'messia-', '', $script_name_front );

			wp_register_script(
				$script_name_front, // the name is the same as in $this->register_block_type().
				MESSIA_THEME_URL . "/includes/assets/js/blocks/{$script_name_front_file}{$min}.js",
				array_merge( $this->block_assets['script']['deps'], [ 'messia-block-blocks' ] ),
				MESSIA_THEME_VERSION,
				true
			);
			// The name is the same as in $this->register_block_type().
			// See hook Messia_Hooks->on_load_script_translation_file().
			wp_set_script_translations( $script_name_editor, 'messia', MESSIA_THEME_DIR . '/includes/assets/langs/blocks' );
		}

		if ( true === $this->block_assets['style']['enqueue'] ) {

			$style_name_front      = "messia-{$this->block_name}";
			$style_name_front_file = str_replace( 'messia-', '', $style_name_front );

			wp_register_style(
				$style_name_front, // the name is the same as in $this->register_block_type().
				MESSIA_THEME_URL . "/includes/assets/css/blocks/{$style_name_front_file}{$min}.css",
				array_merge( $this->block_assets['style']['deps'], [ 'messia-block-blocks' ] ),
				MESSIA_THEME_VERSION,
				'all'
			);
		}
	}

	/**
	 * Render native widget as block content.
	 *
	 * @param string $widget_id  Widget base id it was registered with.
	 * @param array  $attributes Block attributes.
	 *
	 * @return string
	 */
	protected function render_widget( $widget_id, $attributes ): string {

		global $wp_widget_factory;

		$block_classes = [ 'block' ];
		$render        = '';
		$widget        = $wp_widget_factory->get_widget_object( $widget_id );
		$args          = $this->sidebar_args;

		( isset( $attributes['className'] ) ) ? $block_classes[] = $attributes['className'] : null;
		$block_classes = implode( ' ', $block_classes );

		$args['before_widget'] = sprintf(
			$args['before_widget'],
			$widget->id_base,
			"{$widget->widget_options['classname']} {$block_classes}"
		);

		// Prevent duplication of hierarchy and CSS classes in front.
		if ( false === $this->preview_mode ) {
			$args['before_widget'] = null;
			$args['after_widget']  = null;
		}

		ob_start();
		$widget->widget( $args, $attributes, true );
		$render = ob_get_clean();

		return $render;
	}

	/**
	 * This method wrap render result of block into HTML <iframe>
	 * for preview in backend with required styles and script to avoid
	 * CSS and JS conflicts.
	 *
	 * @param array  $attributes Block attributes being rendered.
	 * @param string $render     Render result.
	 *
	 * @return string
	 */
	protected function output( array $attributes, string $render ): ?string {

		global $wp_styles, $wp_scripts;

		$body_classes = [
			'messia-preview-block',
			MESSIA_NAMESPACE_FRONT,
		];

		$is_widget = $this->refer_widget;

		switch ( gettype( $is_widget ) ) {
			// it is block. CSS classes logic for blocks here.
			case 'boolean':
				$block_classes = [
					'messia-block',
					$this->block_name,
				];

				( isset( $attributes['className'] ) ) ? $block_classes[] = $attributes['className'] : null;
				$block_classes = implode( ' ', $block_classes );

				$render = "<div class='{$block_classes}'>{$render}</div>";
				break;

			// it is widget. CSS classes logic for blocks see this->render_widget().
			case 'string':
				break;
		}

		if ( false === $this->preview_mode ) {
			return $render;
		}

		$critical_css = null;

		$hooks = MIA()->get_module( 'core_hooks' );

		wp_enqueue_style( "messia-{$this->block_name}" );
		wp_enqueue_script( "messia-{$this->block_name}" );

		$hooks->custom_styles();

		// All styles.
		ob_start();
		$wp_styles->do_items( false, 0 );
		$wp_styles->do_items( false, 1 );
		$styles = htmlspecialchars( ob_get_clean() );

		if ( 1 === $this->blog_settings['styles_load_async'] ) {
			ob_start();
			$hooks->critical_css();
			$critical_css = htmlspecialchars( ob_get_clean() );
		}

		// All scripts.
		ob_start();
		$wp_scripts->do_items( false, 0 );
		$wp_scripts->do_items( false, 1 );

		?>
		<script>
			(function(){
				const height = () => {
					let iframe = window.frameElement;
					iframe.style.height = `${iframe.contentDocument.body.scrollHeight}px`;
				};
				window.addEventListener('load', height);
				window.addEventListener('sliderReady', height);
				document.fonts.ready.then(function(fontFaceSet) {
					height();
				});
			})();
		</script>
		<?php
		$scripts = htmlspecialchars( ob_get_clean() );

		ob_start();
		?>
		<iframe
			class="messia-preview-frame"
			sandbox="allow-scripts allow-same-origin"
			srcdoc=
				"<!DOCTYPE html>
				<html>
					<head><?php echo $critical_css; ?><?php echo $styles; ?></head>
					<body class='<?php echo implode( ' ', $body_classes ); ?>'>
						<div class='container py-3'>
							<?php echo htmlspecialchars( $render ); ?>
						</div>
					<?php echo $scripts; ?>
					</body>
				</html>">
		</iframe>

		<?php
		$buffer = ob_get_clean();
		return $buffer;
	}

	/**
	 * Get $refer_widget value of block.
	 *
	 * @return mixed bool|string
	 */
	public function get_refer_widget() {
		return $this->refer_widget;
	}

	/**
	 * Get $scope value of block.
	 *
	 * @return mixed bool|string
	 */
	public function get_scope() {
		return $this->scope;
	}

	/**
	 * Get blocks namespace.
	 *
	 * @return string
	 */
	public function get_namespace(): string {
		return $this->namespace;
	}

	/**
	 * Get block name.
	 *
	 * @return string
	 */
	public function get_name(): string {
		return $this->block_name;
	}

	/**
	 * Get full name of block with namespace.
	 *
	 * @return string
	 */
	public function get_full_name(): string {
		return "{$this->namespace}/{$this->block_name}";
	}
}
