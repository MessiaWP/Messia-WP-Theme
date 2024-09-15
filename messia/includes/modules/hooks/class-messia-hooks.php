<?php
/**
 * Messia_Hooks
 *
 * @package Messia\Modules\Hooks
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Modules\Hooks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Smartbits\Messia\Includes\Config\Messia_Config_Styles;
use WP_Customize_Code_Editor_Control;
use WP_Customize_Manager;
use WP_Theme;
use WP_Post;

/**
 * General hooks reaction regardless to the theme.
 *
 * @package Messia\Modules\Hooks
 */
class Messia_Hooks {

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Hooks
	 */
	private static ?Messia_Hooks $instance = null; // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

	/**
	 * Full class name.
	 *
	 * @var Messia_Help
	 */
	private string $helpers;

	/**
	 * Full class name.
	 *
	 * @var Messia_Template_Loader
	 */
	private string $template_loader;

	/**
	 * Current blog settings.
	 *
	 * @var array
	 */
	protected array $blog_settings = [];

	/**
	 * The cache of posts links.
	 *
	 * @var array
	 */
	private static array $posts_link_cache = [];

	/**
	 * Messia_Hooks Constructor.
	 */
	private function __construct() {

		$this->helpers         = MIA()->get_module_helpers();
		$this->template_loader = MIA()->get_module_template_loader();
		$this->blog_settings   = MIA()->get_module_settings()->get_blog_setting( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME );

		$this->init_hooks();
	}

	/**
	 * Messia_Hooks Instance.
	 * Ensures only one instance of Messia_Hooks is loaded or can be loaded.
	 *
	 * @return object Messia_Hooks Instance.
	 */
	public static function instance(): Messia_Hooks {

		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Enqueue required for this class WP hooks.
	 *
	 * @return void
	 */
	private function init_hooks(): void {

		add_filter( 'xmlrpc_enabled', [ $this, 'on_xmlrpc_status' ] );
		add_action( 'init', [ $this, 'on_init' ] );

		add_filter( 'pre_get_document_title', [ $this, 'document_title' ], 10 );
		add_action( 'wp_head', [ $this, 'meta_description' ] );
		add_action( 'wp_footer', [ $this, 'option_footer' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'messia_vars' ], 9 );
		add_action( 'wp_enqueue_scripts', [ $this, 'blocks_assets' ], 10 );
		add_action( 'wp_enqueue_scripts', [ $this, 'option_header' ], 10 );
		add_action( 'wp_enqueue_scripts', [ $this, 'js_customizer' ], 20 );
		add_action( 'wp_enqueue_scripts', [ $this, 'fonts_icons' ], 10 );
		add_action( 'wp_enqueue_scripts', [ $this, 'errors' ], 10 );
		add_action( 'wp_enqueue_scripts', [ $this, 'custom_styles' ], 100 );

		add_filter( 'post_type_link', [ $this, 'create_post_link' ], 10, 4 );

		add_action( 'switch_theme', [ $this, 'on_deactivation' ], 10, 3 );
		add_action( 'after_switch_theme', [ $this, 'on_activation' ], 10 );

		add_action( 'messia_standalone_save_settings_success', [ $this, 'on_standalone_saved' ], 10, 4 );
		add_filter( 'load_script_translation_file', [ $this, 'on_load_script_translation_file' ], 10, 3 );

		add_filter( 'previous_comments_link_attributes', [ $this, 'attrs_previous_comments_link' ], 10 );
		add_filter( 'next_comments_link_attributes', [ $this, 'attrs_next_comments_link' ], 10 );

		add_filter( 'wp_prepare_attachment_for_js', [ $this, 'get_attachment_svg_media_library' ], 10, 3 );
		add_filter( 'customize_register', [ $this, 'js_customize_register' ], 10, 1 );
		add_filter( 'widget_custom_html_content', 'do_shortcode' );

		add_filter( 'wp_get_attachment_image_attributes', [ $this, 'filter_image_attributes' ], 10, 3 );
		add_action( 'wp_ajax_get_material_icons', [ $this, 'get_material_icons' ], 10 );
		add_action( 'wp_enqueue_media', [ $this, 'wp_enqueue_media' ], 10 );
		add_action( 'print_media_templates', [ $this, 'print_media_templates' ], 10 );
	}

	/**
	 * Callback for WP wp_enqueue_media hook.
	 *
	 * @return void
	 */
	public function wp_enqueue_media(): void {
		wp_enqueue_style( 'messia-media' );
		wp_enqueue_script( 'messia-media' );
	}

	/**
	 * Callback for WP print_media_templates hook.
	 *
	 * @return void
	 */
	public function print_media_templates(): void {
		require_once MESSIA_THEME_DIR . MESSIA_WP_TEMPLATES_PREFIX . '/media-template.php';
	}

	/**
	 * Callback for WP xmlrpc_enabled filter.
	 * Disable RPC.
	 *
	 * @param bool $enabled RPC status.
	 *
	 * @return bool
	 */
	public function on_xmlrpc_status( bool $enabled ): bool {
		return false;
	}

	/**
	 * Callback for WP init action.
	 * Apply general WP hooks actions.
	 *
	 * @return void
	 */
	public function on_init(): void {

		remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
		remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
		remove_action( 'wp_print_styles', 'print_emoji_styles' );
		remove_action( 'admin_print_styles', 'print_emoji_styles' );
		remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
		remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
		remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );

		add_filter( 'tiny_mce_plugins', [ $this, 'on_tiny_mce_plugins' ] );
		add_filter( 'upload_mimes', [ $this, 'cc_mime_types' ] );
		add_filter( 'wp_check_filetype_and_ext', [ $this, 'cc_filetype_and_ext' ], 10, 5 );
		add_filter( 'theme_templates', [ $this, 'get_templates' ], 10, 4 );
		add_filter( 'comments_template', [ $this, 'get_comment_template' ] );
		add_action( 'template_include', [ $this, 'on_template_include' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'critical_css' ], 9 );

		if ( ! is_admin() ) {

			Messia_Config_Styles::update_styles( $this->blog_settings );

			if ( 1 === $this->blog_settings['scripts_load_async'] ) {
				add_filter( 'script_loader_tag', [ $this, 'filter_script_tags' ], 10, 3 );
			}
			if ( 1 === $this->blog_settings['styles_load_async'] ) {
				add_filter( 'style_loader_tag', [ $this, 'filter_style_tags' ], 10, 4 );
			}
		}

		$this->move_wp_templates();
	}

	/**
	 * Force to keep and search templates in MESSIA_WP_TEMPLATES_PREFIX directory.
	 *
	 * @return void
	 */
	public function move_wp_templates(): void {

		$template_types = [
			'404',
			'archive',
			'author',
			'category',
			'tag',
			'taxonomy',
			'date',
			'embed',
			'home',
			'frontpage',
			'privacypolicy',
			'page',
			'paged',
			'search',
			'single',
			'singular',
			'attachment',
		];

		foreach ( $template_types as $type ) {

			add_filter(
				$type . '_template_hierarchy',
				function( $templates ) use ( $type ) {

					// Pages can be in folders.
					if ( 'page' === $type ) {
						global $post;
						array_unshift( $templates, trim( MESSIA_WP_TEMPLATES_PREFIX, '\\/' ) . "/page-{$post->post_name}/main.php" );
					}

					// Add a templates_prefix for all.
					foreach ( $templates as &$relpath ) {
						if ( 0 !== strpos( $relpath, trim( MESSIA_WP_TEMPLATES_PREFIX, '\\/' ) . '/' ) ) {
							$relpath = trim( MESSIA_WP_TEMPLATES_PREFIX, '\\/' ) . "/{$relpath}";
						}
					}

					return $templates;
				},
				20
			);
		}
	}

	/**
	 * Callback for WP theme_templates action.
	 * Return available templates set for page/post
	 * to choose in admin.
	 * Force to search templates in subfolder
	 * while loading it in backend.
	 *
	 * @param array    $post_templates Currently found templates in /messia/templates.
	 * @param WP_Theme $theme          Current theme instance.
	 * @param WP_Post  $post           Current viewed post object.
	 * @param string   $post_type      Current viewed post type.
	 *
	 * @return array
	 */
	public function get_templates( array $post_templates, WP_Theme $theme, ?WP_Post $post, string $post_type ): array {

		foreach ( $post_templates as $templates_path => $template_name ) {

			// prevent keeping templates for page template options in a root of theme folder.
			if ( 0 !== strpos( $templates_path, trim( MESSIA_WP_TEMPLATES_PREFIX, '\\/' ) . '/' ) ) {
				unset( $post_templates[ $templates_path ] );
			}
		}

		return $post_templates;
	}

	/**
	 * Callback for WP comments_template filter.
	 *
	 * @param string $comment_template Full path to the template file.
	 *
	 * @return string
	 */
	public function get_comment_template( string $comment_template ): string {
		return $this->template_loader::locate_custom_template( 'comments.php' );
	}

	/**
	 * Callback for WP template_include action.
	 * Deals with page type and return valid template path for
	 * custom theme templates that is outside of WP template
	 * hierarchy logic.
	 *
	 * @param string $template Full path to the template file.
	 *
	 * @return string
	 */
	public function on_template_include( string $template ): string {

		$permastructure = get_option( 'permalink_structure' );

		if ( empty( $permastructure ) ) {

			add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_errors_css' ] );

			global $wp_query;

			$wp_query->set_404();
			status_header( 404 );

			return $this->template_loader::locate_custom_template( 'permalinks-error.php' );

		} elseif ( $this->helpers::is_listing_page() ) {

			if ( have_posts() ) {
				return $this->template_loader::locate_custom_template( 'listings.php' );
			}
		}

		return $template;
	}


	/**
	 * Conditionally enqueue styles
	 *
	 * @see Smartbits\Messia\Includes\Modules\Hooks\on_template_include()
	 *
	 * @return void
	 */
	public static function enqueue_errors_css(): void {
		wp_enqueue_style( 'messia-errors' );
	}

	/**
	 * Callback for WP pre_get_document_title filter.
	 *
	 * @param string $title Current document title.
	 *
	 * @return string
	 */
	public function document_title( string $title ): ?string {

		if ( is_404() || ! is_singular() ) {
			return $title;
		}

		$seo_templates    = MIA()->get_seo_templates();
		$seo_placeholders = MIA()->get_seo_placeholders();

		$title_template = false;

		if ( is_singular( 'messia_object' ) && ! empty( $seo_templates['page_object']['title'] ) ) {
			$title_template = $seo_templates['page_object']['title'];

		} elseif ( ! empty( $seo_templates['page_regular']['title'] ) ) {
			$title_template = $seo_templates['page_regular']['title'];
		}

		if ( false !== $title_template ) {
			$title = $this->helpers::parse_seo_template( $seo_placeholders, $title_template );
			return $title;
		}
		return $title;
	}

	/**
	 * Callback for WP wp_head action.
	 * Adds meta tag "description" with SEO data.
	 *
	 * @return void
	 */
	public function meta_description(): void {

		if ( is_404() || ! is_singular() ) {
			return;
		}

		$seo_templates    = MIA()->get_seo_templates();
		$seo_placeholders = MIA()->get_seo_placeholders();

		$description_template = false;

		if ( is_singular( 'messia_object' ) && ! empty( $seo_templates['page_object']['description'] ) ) {

			$description_template = $seo_templates['page_object']['description'];
		} elseif ( ! empty( $seo_templates['page_regular']['description'] ) ) {

			$description_template = $seo_templates['page_regular']['description'];
		}

		if ( false !== $description_template ) {

			$description_template = $this->helpers::parse_seo_template( $seo_placeholders, $description_template );
			echo "<meta name='description' content='{$description_template}'>";
		}
	}

	/**
	 * Callback for WP wp_enqueue_scripts action.
	 * Outputs user custom JS into site footer.
	 * User add it via customize_register action.
	 *
	 * @return void
	 */
	public function js_customizer(): void {

		$js = get_option( 'custom_js', false );

		if ( false === $js || empty( $js ) ) {
			return;
		}
		?>
		<script type="text/javascript">
			<?php echo $js . "\n"; ?>
		</script>
		<?php
	}

	/**
	 * Callback for WP wp_enqueue_scripts action.
	 * Adds inline css rules.
	 *
	 * @return void
	 */
	public function critical_css(): void {

		switch ( true ) {
			case $this->helpers::is_listing_page():
				if ( ! empty( $this->blog_settings['css_critical_search'] ) ) {
					$css = $this->blog_settings['css_critical_search'];
					echo "<style type='text/css' media='screen' id='messia-critical-search-css'>{$css}</style>";
				}
				break;

			case is_archive():
			case is_home():
				if ( ! empty( $this->blog_settings['css_critical_home'] ) ) {
					$css = $this->blog_settings['css_critical_home'];
					echo "<style type='text/css' media='screen' id='messia-critical-home-css'>{$css}</style>";
				}
				break;

			case is_singular( 'messia_object' ):
				if ( ! empty( $this->blog_settings['css_critical_object'] ) ) {
					$css = $this->blog_settings['css_critical_object'];
					echo "<style type='text/css' media='screen' id='messia-critical-home-css'>{$css}</style>";
				}
				break;
		}
	}

	/**
	 * Callback for WP wp_enqueue_scripts action.
	 * Output users custom data for header.
	 *
	 * @return void
	 */
	public function option_header(): void {

		if ( ! empty( $this->blog_settings['add_in_header'] ) ) {
			echo $this->blog_settings['add_in_header'];
		}
		if ( ! empty( $this->blog_settings['google_analytics_id'] ) ) {
			?>
			<script>
				(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
				ga('create', '<?php echo $this->blog_settings['google_analytics_id']; ?>', 'auto');
				ga('send', 'pageview');
			</script>
			<?php
		}
	}

	/**
	 * Searchs messia blocks inside post content
	 * and deactivate not used assets. No block to render - no assets to enqueue.
	 *
	 * @return void
	 */
	public function blocks_assets(): void {

		global $wpdb;

		$post_id = get_the_ID();

		if ( ! $post_id ) {
			return;
		}

		$content = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT post_content
				FROM $wpdb->posts
				WHERE ID = %d",
				$post_id
			)
		);

		$blocks_messia     = [];
		$blocks_enqueued   = parse_blocks( (string) $content );
		$blocks_registered = MIA()->get_module_blocks()->get_registry();

		foreach ( $blocks_registered as $type => $block_registered ) {
			$block_full_name                   = $block_registered->get_full_name();
			$blocks_messia[ $block_full_name ] = $block_registered;
		}

		$found_blocks = $this->helpers::find_blocks( $blocks_enqueued, $blocks_messia );
		$orphans      = array_diff_key( $blocks_messia, $found_blocks );

		foreach ( $orphans as $orphan ) {

			$block_name = $orphan->get_name();

			wp_dequeue_script( $block_name );
			wp_dequeue_style( $block_name );
		}
	}

	/**
	 * Callback for WP wp_footer action.
	 * Output users custom data for footer.
	 *
	 * @return void
	 */
	public function option_footer(): void {

		if ( empty( $this->blog_settings['add_in_footer'] ) ) {
			return;
		}
		echo $this->blog_settings['add_in_footer'];
	}

	/**
	 * Callback for WP wp_enqueue_scripts action.
	 * Enqueue user generated file of custom styles.
	 *
	 * @return void
	 */
	public function custom_styles() {

		// File with styles deleted by Messia if no styles defined by user.
		if ( ! file_exists( MESSIA_CORE_ABSPATH . '/assets/css/_custom_blog_id_' . get_current_blog_id() . '.css' ) ) {
			return;
		}

		$fonts   = [];
		$subsets = [];

		$updated   = $this->blog_settings['last_modified'];
		$font_body = json_decode( $this->blog_settings['font_body'], true );

		$font_h1 = json_decode( $this->blog_settings['font_h1'], true );
		$font_h2 = json_decode( $this->blog_settings['font_h2'], true );
		$font_h3 = json_decode( $this->blog_settings['font_h3'], true );
		$font_h4 = json_decode( $this->blog_settings['font_h4'], true );
		$font_h5 = json_decode( $this->blog_settings['font_h5'], true );
		$font_h6 = json_decode( $this->blog_settings['font_h6'], true );

		if ( 'google' === $font_body['collection'] && -1 !== $font_body['family'] ) {

			$font_data = $this->build_font_request( $font_body );
			$fonts[]   = $font_data['family'];
			$subsets[] = $font_data['subset'];
		}
		if ( 'google' === $font_h1['collection'] && -1 !== $font_h1['family'] ) {

			$font_data = $this->build_font_request( $font_h1 );
			$fonts[]   = $font_data['family'];
			$subsets[] = $font_data['subset'];
		}
		if ( 'google' === $font_h2['collection'] && -1 !== $font_h2['family'] ) {

			$font_data = $this->build_font_request( $font_h2 );
			$fonts[]   = $font_data['family'];
			$subsets[] = $font_data['subset'];
		}
		if ( 'google' === $font_h3['collection'] && -1 !== $font_h3['family'] ) {

			$font_data = $this->build_font_request( $font_h3 );
			$fonts[]   = $font_data['family'];
			$subsets[] = $font_data['subset'];
		}
		if ( 'google' === $font_h4['collection'] && -1 !== $font_h4['family'] ) {

			$font_data = $this->build_font_request( $font_h4 );
			$fonts[]   = $font_data['family'];
			$subsets[] = $font_data['subset'];
		}
		if ( 'google' === $font_h5['collection'] && -1 !== $font_h5['family'] ) {

			$font_data = $this->build_font_request( $font_h5 );
			$fonts[]   = $font_data['family'];
			$subsets[] = $font_data['subset'];
		}
		if ( 'google' === $font_h6['collection'] && -1 !== $font_h6['family'] ) {

			$font_data = $this->build_font_request( $font_h6 );
			$fonts[]   = $font_data['family'];
			$subsets[] = $font_data['subset'];
		}

		if ( ! empty( $fonts ) ) {

			$fonts   = [
				'family' => implode( '|', array_unique( $fonts ) ),
			];
			$subsets = [
				'subset' => implode( ',', array_unique( $subsets ) ),
			];
			$attrs   = [
				'display' => 'swap',
			];

			$url = 'https://fonts.googleapis.com/css?' . http_build_query( $fonts, '', '&amp;' ) . '&amp;' . http_build_query( $subsets, '', '&amp;' ) . '&amp;' . http_build_query( $attrs, '', '&amp;' );
			wp_enqueue_style( 'messia-google-fonts', $url, [], $updated, null );
		}

		wp_enqueue_style( 'messia-custom' );
	}

	/**
	 * Callback for WP wp_enqueue_scripts action.
	 * Enqueue 3rd party libraries.
	 *
	 * @return void
	 */
	public function fonts_icons(): void {
		wp_enqueue_style( 'google-material-icons' );
		wp_enqueue_script( 'fontawesome' );
	}

	/**
	 * Callback for WP wp_enqueue_scripts action.
	 * Enqueue assets for 404 page.
	 *
	 * @return void
	 */
	public function errors(): void {

		if ( is_404() ) {
			wp_enqueue_style( 'messia-errors' );
		}
	}

	/**
	 * Prepare query string for Google font request.
	 *
	 * @param array $font_data Requried fonts.
	 *
	 * @return array
	 */
	private function build_font_request( array $font_data ): array {

		$font    = wp_strip_all_tags( $font_data['family'] );
		$variant = wp_strip_all_tags( $font_data['variant'] );
		$subset  = wp_strip_all_tags( $font_data['subset'] );

		return [
			'family' => $font . ':' . $variant,
			'subset' => $subset,
		];
	}

	/**
	 * Callback for WP wp_prepare_attachment_for_js filter.
	 * Filters the attachment data prepared for JavaScript to make visible SVG images
	 * in media library.
	 *
	 * @param array       $response   Array of prepared attachment data.
	 * @param WP_Post     $attachment Attachment object.
	 * @param array|false $meta       Array of attachment meta data, or false if there is none.
	 *
	 * @return array
	 */
	public function get_attachment_svg_media_library( array $response, WP_Post $attachment, $meta ): array {

		if ( ! isset( $_POST['action'] ) || ( 'query-attachments' !== $_POST['action'] && 'get-attachment' !== $_POST['action'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Missing
			return $response;
		}
		if ( false === strpos( $response['subtype'], 'svg' ) ) {
			return $response;
		}

		$response['sizes'] = array_fill_keys(
			[ 'thumbnail', 'medium', 'large', 'full' ],
			[
				'url'         => $response['url'],
				'height'      => 300,
				'width'       => 300,
				'orientation' => 'portrait',
			]
		);

		return $response;
	}

	/**
	 * Callback for WP tiny_mce_plugins filter.
	 * Removes "wpemoji" one.
	 *
	 * @param array $plugins Included plugins.
	 *
	 * @return array
	 */
	public function on_tiny_mce_plugins( array $plugins ): array {
		if ( is_array( $plugins ) ) {
			return array_diff( $plugins, [ 'wpemoji' ] );
		} else {
			return [];
		}
	}

	/**
	 * Callback for WP upload_mimes filter.
	 * Extend types with svg to allow uploading.
	 *
	 * @param array $mimes Current valid mimes.
	 *
	 * @return array
	 */
	public function cc_mime_types( array $mimes ): array {
		$mimes['svg'] = 'image/svg';
		return $mimes;
	}

	/**
	 * Callback for WP wp_check_filetype_and_ext filter.
	 *
	 * @param array        $file_info Full path to the file.
	 * @param string       $file      Full path to the file.
	 * @param string       $filename  The name of the file (may differ from $file due to $file being in a tmp directory).
	 * @param string[]     $mimes     Array of mime types keyed by their file extension regex.
	 * @param string|false $real_mime The actual mime type or false if the type cannot be determined.
	 *
	 * @return array
	 */
	public function cc_filetype_and_ext( array $file_info, string $file, string $filename, array $mimes, $real_mime ): array {
		$wp_filetype = wp_check_filetype( $filename, $mimes );
		if ( 'svg' === $wp_filetype['ext'] ) {
			$file_info['ext']  = 'svg';
			$file_info['type'] = $wp_filetype['type'];
		}
		return $file_info;
	}

	/**
	 * Callback for WP wp_enqueue_scripts action.
	 * Output all messia frontend variables.
	 *
	 * @return void
	 */
	public function messia_vars(): void {

		global $wp_scripts;

		$captcha_v3_data = $this->helpers::captcha_v3_data();

		$object_data = [
			'namespaceFront' => MESSIA_NAMESPACE_FRONT,
			'namespaceAdmin' => MESSIA_NAMESPACE_ADMIN,
			'AJAX_Marker'    => 'MessiaAjax',
			'ajaxUrl'        => admin_url( 'admin-ajax.php', 'relative' ),
			'messiaNonce'    => wp_create_nonce( 'messiaFrontendAjax' ),
			'queryOrder'     => $this->blog_settings['query_order'],
			'messages'       => [
				'itemsSelected' => [
					'singular' => __( 'Selected 1 item', 'messia' ),
					'plural'   => __( 'Selected %n items', 'messia' ),
				],
				'workerUpdate'  => __( 'We have just updated the version of the application! Apply new version now?', 'messia' ),
			],
			'scriptDebug'    => SCRIPT_DEBUG,
			'themeUrl'       => MESSIA_THEME_URL,
			'pwaEnable'      => $this->blog_settings['pwa_enable'],
			'workerUrl'      => $wp_scripts->registered['messia-worker']->src,
		];

		if ( $captcha_v3_data ) {
			$object_data['gCaptchaV3'] = $captcha_v3_data['gkey_html'];
		}

		$script = 'const messiaVars = ' . wp_json_encode( $object_data ) . ';';

		echo sprintf( "<script %s>\n%s\n</script>\n", 'type="text/javascript"', $script );
	}

	/**
	 * Callback for WP script_loader_tag action.
	 * Removes attr "type='text/javascript'" from source tag vale.
	 *
	 * @param string $tag    HTML tag "script".
	 * @param string $handle WP registered script name.
	 * @param string $src    Script source path.
	 *
	 * @return string
	 */
	public static function filter_script_tags( string $tag, string $handle, string $src ): string {

		if ( 'fontawesome' === $handle ) {
			$tag = preg_replace( '/<src/m', 'crossorigin="anonymous" $0', $tag );
		}

		$tag = preg_replace( [ "/type=['\"]text\/(javascript|css)['\"]/" ], [ 'defer' ], $tag );
		$tag = preg_replace( '/\s{2,}/m', ' ', $tag );

		return $tag;
	}

	/**
	 * Callback for WP style_loader_tag action.
	 *
	 * @param string $tag    HTML tag "style".
	 * @param string $handle WP registered style name.
	 * @param string $src    Style source path.
	 * @param string $media  The stylesheet's media attribute.
	 *
	 * @return string
	 */
	public static function filter_style_tags( string $tag, string $handle, string $src, string $media ): string {

		if ( false === $src || empty( $src ) || is_null( $src ) ) {
			return $tag;
		}

		$tag = "<link id='{$handle}-css' class='messia-async-css' rel='preload' href='{$src}' as='style' onload='this.onload=null;this.rel=\"stylesheet\";document.dispatchEvent(new Event(\"messiaCSSLoaded\"));this.removeAttribute(\"onload\");' media='{$media}'>";
		return $tag;
	}

	/**
	 * Callback for WP post_type_link action.
	 * Replace post type fragment with segment alias if setted.
	 *
	 * @param string  $post_link The post's permalink.
	 * @param WP_Post $post      The post in question.
	 * @param bool    $leavename Whether to keep the post name.
	 * @param bool    $sample    Is it a sample permalink.
	 *
	 * @return string
	 */
	public function create_post_link( string $post_link, WP_Post $post, bool $leavename, bool $sample ): string {

		if ( 'messia_object' !== $post->post_type ) {
			return $post_link;
		}

		$link_hash = crc32( $post_link );

		if ( ! array_key_exists( $link_hash, self::$posts_link_cache ) || $leavename ) {

			$post_segments = $this->helpers::get_post_terms( [ $post->ID ], [ 'messia_object_segment' ] );

			if ( empty( $post_segments ) ) {

				self::$posts_link_cache[ $link_hash ] = $post_link;

			} else {
				$post_segment_alias = $this->helpers::messia_get_term_meta( (int) $post_segments[0]->term_id, 'alias' );

				if ( empty( $post_segment_alias ) ) {
					self::$posts_link_cache[ $link_hash ] = $post_link;
				} else {
					self::$posts_link_cache[ $link_hash ] = preg_replace( '/messia_object/', $post_segment_alias, $post_link, 1 );
				}
			}
		}

		return self::$posts_link_cache[ $link_hash ];
	}

	/**
	 * Callback for WP after_switch_theme action.
	 * Provide required actions on theme activation - install ajax dispatcher.
	 * and generates user custom CSS file.
	 *
	 * @return void
	 */
	public function on_activation(): void {
		$widgets_state = $this->blog_settings['widgets_state'];
		$this->setup_ajax_dispatcher( $this->blog_settings );

		if ( false !== $widgets_state ) {
			update_option( 'sidebars_widgets', $widgets_state, false );
		}

		$this->helpers::preserve_demo_folder();
	}

	/**
	 * Callback for WP switch_theme action.
	 * Provide required actions on theme deactivation - uninstall ajax dispathcer.
	 *
	 * @param string   $new_name  Name of the new theme.
	 * @param WP_Theme $new_theme WP_Theme instance of the new theme.
	 * @param WP_Theme $old_theme WP_Theme instance of the old theme.
	 *
	 * @return void
	 */
	public function on_deactivation( string $new_name, WP_Theme $new_theme, WP_Theme $old_theme ): void {

		@unlink( WPMU_PLUGIN_DIR . '/class-messia-wp-ajax-dispatcher.php' ); // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged
		MIA()->get_module_settings()->set_blog_setting(
			MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME,
			[
				'widgets_state' => get_option( 'sidebars_widgets', false ),
			]
		);
	}

	/**
	 * Callback for Messia messia_standalone_save_settings_success action.
	 * Install ajax dispatcher if user switched it on.
	 *
	 * @param string $setting_preset Option messia_blog_settings_preset or messia_site_settings_preset.
	 * @param array  $to_save        Incoming settings.
	 * @param array  $old_settings   Previous settings.
	 * @param array  $new_settings   New settings.
	 *
	 * @return void
	 */
	public function on_standalone_saved( string $setting_preset, array $to_save, array $old_settings, array $new_settings ): void {
		$this->setup_ajax_dispatcher( $new_settings );
	}

	/**
	 * Return propper translation filename
	 * The problem that "wp i18n make-json [source path]" create file with name that contains
	 * md5 of reference to original js file taken from PO file
	 *
	 * #: assets/blocks/asistour-search-editor.js:162
	 * msgid "Split cards to columns in grid view mode by:"
	 * msgstr ""
	 *
	 * In given example: hash will me md5( 'assets/blocks/asistour-search-editor.js' )
	 *
	 * But while loading translations WP will search file that has hash made from relative to theme
	 * path given in wp_set_script_translations() as argument $path.
	 *
	 * For wp_set_script_translations( 'block-asistour-search-editor', 'messia-travel', MESSIA_THEME_DIR . '/languages/blocks' )
	 * hash will be md5( 'includes/assets/blocks/asistour-search-editor.js' )
	 *
	 * @param string $file   Path .../wp-content/plugins/messia-travel/includes/assets/langs/blocks/messia-ru_RU-search-snippet.json.
	 * @param string $handle Block registration name, ex: search-snippet.
	 * @param string $domain Messia.
	 *
	 * @return string
	 */
	public function on_load_script_translation_file( string $file, string $handle, string $domain ): string {

		if ( 'messia' !== $domain ) {
			return $file;
		}

		$wp_scripts = wp_scripts();

		$src  = $wp_scripts->registered[ $handle ]->src;
		$name = basename( str_replace( [ '.min' ], [ null ], $src ) );
		$file = str_replace( $handle, md5( $name ), $file );

		return $file;
	}

	/**
	 * Checks an existing Ajax Dispatcher module in MU plugins folder for,
	 * checks the version of the module and copies the fresh file if necessary.
	 *
	 * @param array $current_blog_settings Current saved user setting.
	 *
	 * @return void
	 */
	public function setup_ajax_dispatcher( array $current_blog_settings ): void {

		if ( file_exists( WPMU_PLUGIN_DIR . '/class-messia-wp-ajax-dispatcher.php' ) ) {
			if ( 1 !== $current_blog_settings['ajax_dispatcher'] || ( 1 !== $current_blog_settings['ajax_dispatcher'] && 1 !== $current_blog_settings['ajax_dispatcher_log'] ) ) {
				unlink( WPMU_PLUGIN_DIR . '/class-messia-wp-ajax-dispatcher.php' );
				return;
			}
		}

		$to_update = true;

		if ( file_exists( WPMU_PLUGIN_DIR . '/class-messia-wp-ajax-dispatcher.php' ) ) {

			$ajax_module_info_mu = get_file_data( WPMU_PLUGIN_DIR . '/class-messia-wp-ajax-dispatcher.php', [ 'ver' => 'Version' ] );
			$ajax_module_info_so = get_file_data( MESSIA_CORE_ABSPATH . '/class-messia-wp-ajax-dispatcher.php', [ 'ver' => 'Version' ] );

			if ( version_compare( $ajax_module_info_mu['ver'], $ajax_module_info_so['ver'], '<' ) ) {

				$to_update = false;
			}
		} else {
			$to_update = false;
		}

		if ( false === $to_update ) {

			$dir = true;

			if ( ! is_dir( WPMU_PLUGIN_DIR ) ) {
				$dir = mkdir( WPMU_PLUGIN_DIR );
			}

			if ( $dir ) {
				copy( MESSIA_CORE_ABSPATH . '/class-messia-wp-ajax-dispatcher.php', WPMU_PLUGIN_DIR . '/class-messia-wp-ajax-dispatcher.php' );
			}
		}
	}

	/**
	 * Callback for WP previous_comments_link_attributes filter.
	 * Adds HTML attributes for Prev button.
	 *
	 * @param string $attributes Attributes for the anchor tag.
	 *
	 * @return string
	 */
	public function attrs_previous_comments_link( string $attributes ): string {
		$attributes .= 'class="messia-btn messia-ripple-click"';
		return $attributes;
	}

	/**
	 * Callback for WP next_comments_link_attributes filter.
	 * Adds HTML attributes for Prev button.
	 *
	 * @param string $attributes Attributes for the anchor tag.
	 *
	 * @return string
	 */
	public function attrs_next_comments_link( string $attributes ): string {
		$attributes .= 'class="messia-btn messia-ripple-click"';
		return $attributes;
	}

	/**
	 * Callback for WP customize_register filter.
	 * Add new section for storring user custom JS.
	 *
	 * @param WP_Customize_Manager $wp_customize Current Customize class instance.
	 *
	 * @return void
	 */
	public function js_customize_register( WP_Customize_Manager $wp_customize ): void {
		$wp_customize->add_section(
			'custom_js',
			[
				'title'    => __( 'Additional JS', 'messia' ),
				'priority' => 190,
			]
		);

		$wp_customize->add_setting(
			'custom_js',
			[
				'type' => 'option',
			]
		);

		$wp_customize->add_control(
			new WP_Customize_Code_Editor_Control(
				$wp_customize,
				'custom_html',
				[
					'label'       => 'Additional JS',
					'code_type'   => 'javascript',
					'settings'    => 'custom_js',
					'section'     => 'custom_js',
					'description' => esc_html__( 'Code typed here will be displayed inside html tag <head>, being wrapped into <script> tag.', 'messia' ),
				]
			)
		);
	}

	/**
	 * Filters the list of attachment image attributes.
	 *
	 * @param string[]     $attr       Array of attribute values for the image markup, keyed by attribute name.
	 * @param WP_Post      $attachment Image attachment post.
	 * @param string|int[] $size       Requested image size. Can be any registered image size name, or
	 *                                       an array of width and height values in pixels (in that order).
	 *
	 * @return int
	 */
	public static function filter_image_attributes( array $attr, ?WP_Post $attachment, $size ): array {

		if ( is_null( $attachment ) ) {
			return $attr;
		}

		if ( 'image/svg' === $attachment->post_mime_type ) {
			$attr['width']  = '100%';
			$attr['height'] = '100%';
		}
		return $attr;
	}

	/**
	 * Get Google icon fonts from API.
	 *
	 * @return void
	 */
	public function get_material_icons(): void {

		if ( check_ajax_referer( 'messiaBackendAjax', 'messiaNonce', false ) ) {

			$icons          = [];
			$categories_map = [
				'action'        => 'action',
				'alert'         => 'alert',
				'av'            => 'audio & video',
				'communication' => 'communication',
				'content'       => 'content',
				'device'        => 'device',
				'editor'        => 'editor',
				'file'          => 'file',
				'hardware'      => 'hardware',
				'home'          => 'home',
				'image'         => 'image',
				'maps'          => 'maps',
				'navigation'    => 'navigation',
				'notification'  => 'notification',
				'places'        => 'places',
				'search'        => 'search',
				'social'        => 'social',
				'toggle'        => 'toggle',
			];

			$response      = wp_remote_get( 'https://fonts.google.com/metadata/icons' );
			$response_code = wp_remote_retrieve_response_code( $response );

			if ( 200 !== $response_code ) {
				wp_send_json_success(
					[
						'code'    => 300,
						'message' => __( 'Error loading icons from remote host.', 'messia' ),
					]
				);
			}

			preg_match( '/{.*}/s', $response['body'], $matches );
			$icons_meta = json_decode( $matches[0] );

			foreach ( $icons_meta->icons as $icon ) {
				foreach ( $icon->categories as $category ) {
					if ( array_key_exists( $category, $categories_map ) ) {
						$category = $categories_map[ $category ];
					}

					if ( ! array_key_exists( $category, $icons ) ) {
						$icons[ $category ] = [];
					}
					$icon->id             = $icon->name;
					$icon->title          = implode( ' ', array_map( 'ucfirst', explode( '_', $icon->name ) ) );
					$icons[ $category ][] = $icon;
				}
			}

			wp_send_json_success(
				[
					'code'    => 200,
					'message' => __( 'Icons loaded', 'messia' ),
					'icons'   => $icons,
				]
			);

		} else {

			wp_send_json_success(
				[
					'code'    => 400,
					'message' => __( 'Access violation - reload the page and try again', 'messia' ),
				]
			);
		}
	}
}
