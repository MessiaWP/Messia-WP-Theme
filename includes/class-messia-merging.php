<?php
/**
 * Messia_Merging
 *
 * @package Messia
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
// phpcs:disable WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
// phpcs:disable WordPress.WP.AlternativeFunctions.file_system_read_file_put_contents

declare(strict_types = 1);

namespace Smartbits\Messia\Includes;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class that join css and js files into one
 * and output it as single files.
 *
 * @package Messia
 */
class Messia_Merging {

	/**
	 * Current blog settings.
	 *
	 * @var array
	 */
	private array $blog_settings = [];

	/**
	 * Args for file_get_contents()
	 *
	 * @var array
	 */
	private $context;

	/**
	 * Full path to file.
	 *
	 * @var string
	 */
	private string $merged_js_file;

	/**
	 * Full path to file.
	 *
	 * @var string
	 */
	private string $merged_css_file;

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Merging
	 */
	private static ?Messia_Merging $instance = null; // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

	/**
	 * Messia_Merging Constructor.
	 */
	private function __construct() {

		$this->blog_settings = MIA()->get_module( 'settings' )->get_blog_setting( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME );

		$filename = hash( 'crc32', $_SERVER['REQUEST_URI'], false );

		$this->merged_js_file  = MESSIA_THEME_ABSPATH . "/includes/assets/js/__m{$filename}M.js";
		$this->merged_css_file = MESSIA_THEME_ABSPATH . "/includes/assets/css/__m{$filename}M.css";

		$this->context = stream_context_create(
			[
				'http' => [
					'header' => "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36\r\n",
				],
			]
		);

		add_action( 'wp_enqueue_scripts', [ $this, 'remove_scripts' ] );

		if ( 1 === $this->blog_settings['merge_js'] ) {

			@unlink( $this->merged_js_file ); // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged

			add_action( 'wp_head', [ $this, 'merge_all_scripts_header' ], 5 );
			add_action( 'wp_footer', [ $this, 'merge_all_scripts_footer' ], 5 );

		} else {
			array_map( 'unlink', glob( dirname( $this->merged_js_file ) . '/__m*M.js' ) );
		}

		if ( 1 === $this->blog_settings['merge_css'] ) {

			@unlink( $this->merged_css_file ); // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged

			add_action( 'wp_head', [ $this, 'merge_all_styles_header' ], 10 );
			add_action( 'wp_footer', [ $this, 'merge_all_styles_footer' ], 10 );

		} else {
			array_map( 'unlink', glob( dirname( $this->merged_css_file ) . '/__m*M.css' ) );
		}
	}

	/**
	 * Messia_Merging Instance.
	 * Ensures only one instance of Messia_Merging is loaded or can be loaded.
	 *
	 * @return Messia_Merging Instance.
	 */
	public static function instance(): Messia_Merging {

		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Dequeue WP default scripts.
	 *
	 * @return void
	 */
	public function remove_scripts(): void {

		if ( 1 === $this->blog_settings['merge_js'] ) {

			remove_action( 'wp_head', 'wp_print_head_scripts', 9 );
			remove_action( 'wp_footer', 'wp_print_footer_scripts', 20 );

			add_action( 'wp_footer', 'wp_print_head_scripts', 5 );
			add_action( 'wp_footer', 'wp_print_footer_scripts', 5 );
		}

		if ( 1 === $this->blog_settings['merge_css'] ) {

			remove_action( 'wp_head', 'wp_print_styles', 8 );
			add_action( 'wp_footer', 'wp_print_styles', 10 );
		}
	}

	/**
	 * Join all scripts, enqueued for header into one file.
	 *
	 * @return void
	 */
	public function merge_all_scripts_header(): void {

		global $wp_scripts;

		$wp_scripts->all_deps( $wp_scripts->queue );

		$merged_script = "/// HEADER /// \n";

		foreach ( $wp_scripts->to_do as $handle ) {
			if ( 'jquery' === $handle || 'jquery-core' === $handle || 'jquery-migrate' === $handle ) {
				continue;
			}

			$src = $wp_scripts->registered[ $handle ]->src;
			if ( strpos( $src, 'http' ) !== false ) {

				$site_url = site_url();

				if ( strpos( $src, $site_url ) !== false ) {
					$js_file_path = str_replace( $site_url, '', $src );
				} else {
					$js_file_path = $src;
				}

				$js_file_path = ltrim( $js_file_path, '/' );
			} else {
				$js_file_path = ltrim( $src, '/' );
			}

			$file_content = file_get_contents( $js_file_path, false, $this->context );

			if ( false !== $file_content ) {

				$localize = '';
				$after    = '';

				if ( @key_exists( 'data', $wp_scripts->registered[ $handle ]->extra ) ) { // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged
					$localize .= $wp_scripts->registered[ $handle ]->extra['data'] . ';' . "\n";
				}
				if ( @key_exists( 'before', $wp_scripts->registered[ $handle ]->extra ) ) { // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged
					$localize .= $wp_scripts->registered[ $handle ]->extra['before'][1] . ';' . "\n";
				}

				if ( @key_exists( 'after', $wp_scripts->registered[ $handle ]->extra ) ) { // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged
					$after = $wp_scripts->registered[ $handle ]->extra['after'][1] . ';' . "\n";
				}
				$merged_script .= '/// ' . $handle . ' ///' . "\n" . $localize . "\n" . $file_content . "\n" . $after . ';' . "\n";

				wp_dequeue_script( $handle );
				$wp_scripts->done[] = $handle;
			}
		}

		file_put_contents( $this->merged_js_file, $merged_script );
	}

	/**
	 * Join all scripts, enqueued for footer into one file.
	 *
	 * @return void
	 */
	public function merge_all_scripts_footer(): void {

		global $wp_scripts;

		$wp_scripts->all_deps( $wp_scripts->queue );

		$merged_script = "/// FOOTER /// \n";

		foreach ( $wp_scripts->to_do as $handle ) {

			if ( in_array( $handle, $wp_scripts->done, true ) ) {
				continue;
			}

			$src = $wp_scripts->registered[ $handle ]->src;
			if ( false !== strpos( $src, 'http' ) ) {

				$site_url = site_url();

				if ( false !== strpos( $src, $site_url ) ) {
					$js_file_path = str_replace( $site_url, '', $src );
				} else {
					$js_file_path = $src;
				}

				$js_file_path = ltrim( $js_file_path, '/' );
			} else {
				$js_file_path = ltrim( $src, '/' );
			}

			$file_content = file_get_contents( $js_file_path, false, $this->context );

			if ( false !== $file_content ) {

				$localize = '';
				$after    = '';

				if ( @key_exists( 'data', $wp_scripts->registered[ $handle ]->extra ) ) { // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged
					$localize .= $wp_scripts->registered[ $handle ]->extra['data'] . ';' . "\n";
				}
				if ( @key_exists( 'before', $wp_scripts->registered[ $handle ]->extra ) ) { // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged
					$localize .= $wp_scripts->registered[ $handle ]->extra['before'][1] . ';' . "\n";
				}

				if ( @key_exists( 'after', $wp_scripts->registered[ $handle ]->extra ) ) { // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged
					$after = $wp_scripts->registered[ $handle ]->extra['after'][1] . ';' . "\n";
				}
				$merged_script .= '/// ' . $handle . ' ///' . "\n" . $localize . "\n" . $file_content . "\n" . $after . ';' . "\n";

				wp_dequeue_script( $handle );
				wp_deregister_script( $handle );
			}
		}

		file_put_contents( $this->merged_js_file, file_get_contents( $this->merged_js_file ) . $merged_script );
		$filename = basename( $this->merged_js_file );
		wp_enqueue_script( 'merged-script', MESSIA_THEME_URL . '/includes/assets/js/' . $filename, [], false, true ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.NoExplicitVersion
	}

	/**
	 * Join all styles, enqueued for header into one file.
	 *
	 * @return void
	 */
	public function merge_all_styles_header(): void {

		global $wp_styles;

		$wp_styles->all_deps( $wp_styles->queue );

		$merged_style = "/// HEADER /// \n";

		foreach ( $wp_styles->to_do as $handle ) {

			$src = $wp_styles->registered[ $handle ]->src;
			if ( false !== strpos( $src, 'http' ) ) {

				$site_url = site_url();

				if ( strpos( $src, $site_url ) !== false ) {
					$css_file_path = str_replace( $site_url, '', $src );
				} else {
					$css_file_path = $src;
				}

				$css_file_path = ltrim( $css_file_path, '/' );
			} else {
				$css_file_path = ltrim( $src, '/' );
			}

			$file_content  = file_get_contents( $css_file_path, false, $this->context );
			$merged_style .= $file_content . "\n";

			wp_dequeue_style( $handle );
			$wp_styles->done[] = $handle;
		}

		file_put_contents( $this->merged_css_file, $merged_style );
	}

	/**
	 * Join all styles, enqueued for footer into one file.
	 *
	 * @return void
	 */
	public function merge_all_styles_footer(): void {

		global $wp_styles;

		$wp_styles->all_deps( $wp_styles->queue );

		$merged_style = "/// HEADER /// \n";

		foreach ( $wp_styles->to_do as $handle ) {

			if ( in_array( $handle, $wp_styles->done, true ) ) {
				continue;
			}

			$src = $wp_styles->registered[ $handle ]->src;
			if ( false !== strpos( $src, 'http' ) ) {

				$site_url = site_url();

				if ( false !== strpos( $src, $site_url ) ) {
					$css_file_path = str_replace( $site_url, '', $src );
				} else {
					$css_file_path = $src;
				}

				$css_file_path = ltrim( $css_file_path, '/' );
			} else {
				$css_file_path = ltrim( $src, '/' );
			}

			$file_content  = file_get_contents( $css_file_path, false, $this->context );
			$merged_style .= $file_content . "\n";

			wp_dequeue_style( $handle );
			wp_deregister_style( $handle );
		}

		file_put_contents( $this->merged_css_file, file_get_contents( $this->merged_css_file ) . $merged_style );
		$filename = basename( $this->merged_css_file );
		wp_enqueue_style( 'merged-style', MESSIA_THEME_URL . '/includes/assets/css/' . $filename, [], false, 'all' ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.NoExplicitVersion

	}
}
