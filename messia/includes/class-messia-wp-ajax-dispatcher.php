<?php
/**
 * Messia_Wp_Ajax_Dispatcher
 *
 * Plugin Name: Messia WP Ajax Dispatcher
 * Author: Outcomer
 *
 * Author URI: 4341922.com
 * Author mail: 4341922@gmail.com
 * Description: Increases perfomance on AJAX requests, disabling other unnecessary plugins on runtime.
 * Requires at least: 5.4.0
 * Tested up to: 5.9.0
 * Version: 1.0.0
 *
 * @package Messia
 */

/*
 * phpcs:disable WordPress.PHP.DevelopmentFunctions.error_log_print_r
 * phpcs:disable WordPress.PHP.DevelopmentFunctions.error_log_error_log
 * phpcs:disable WordPress.Security.NonceVerification.Recommended
 */

declare(strict_types = 1);

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * ATTENTION!! This file will be copied to WP MU Plugin directory once module activated and will be executed from there!
 * USAGE: the main logic is that every ajax request should meet it's execution rule and only plugins defined in this rule(s) will be left
 * as active plugins during this AJAX request. If admin option "ajax_dispatcher_log" is true - next info will be available after request ended:
 * 1. Site root/ajax-requests.log - will be filled with current AJAX request data if NO ONE rules matched.
 * 2. Response - will contain custom HEADER "Messia-Ajax-Dispatcher-APs: DATA", where DATA is activated plugin during request. It can be:
 * - "none" - means that all plugin was deactivated
 * - comma separated plugins names - means that this plugins was active within current request
 * - "default - no one rule matched" - no one rule was TRUE, so plugins was active accordind to WP behavior.
 *
 * If no one rule matched - no filtration will be applied !!!
 * Thus, you need to create a set of logical rules for processing requests, when the log file will always remain empty
 * This will mean that maximum productivity has been reached.
 */
final class Messia_Wp_Ajax_Dispatcher {

	/**
	 * Max size of log file in bytes
	 *
	 * @var integer
	 */
	private int $log_max_size = 2097152;

	/**
	 * Conditions that will be checked for each Ajax request.
	 * All conditions will be checked according to the "OR" logic.
	 *
	 * @var array
	 */

	private array $pattern;

	/* Service variables - stop edit here */

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Wp_Ajax_Dispatcher
	 */
	private static ?Messia_Wp_Ajax_Dispatcher $instance = null; // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

	/**
	 * Plugins that passed filter
	 *
	 * @var array
	 */
	private array $let = [];

	/**
	 * Current blog settings.
	 *
	 * @var array
	 */
	private array $blog_settings = [];

	/**
	 * Filtered plugins
	 *
	 * @var array
	 */
	private array $filtered = [];

	/**
	 * Matches per rule
	 *
	 * @var bool
	 */
	private bool $matched = false;

	/**
	 * Class constructor
	 *
	 * @return void
	 */
	private function __construct() {

		$blog_settings = get_option( 'messia_blog_settings_preset', [] );

		if ( ! is_array( $blog_settings ) ) {
			trigger_error( 'Can not start Ajax Dispatcher. If WP is installing now - skip this warning.', E_USER_WARNING ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error
			return;
		}

		$this->blog_settings = $blog_settings;

		if ( $this->check_environment() ) {

			$this->set_pattern();
			$this->empty_log();
			$this->fire_dispatch();
		}
	}

	/**
	 * Messia_Wp_Ajax_Dispatcher Instance.
	 * Ensures only one instance of Messia_Wp_Ajax_Dispatcher is loaded or can be loaded.
	 *
	 * @return Messia_Wp_Ajax_Dispatcher Instance.
	 */
	public static function instance(): ?Messia_Wp_Ajax_Dispatcher {
		if ( isset( $_POST['action'] ) && 'heartbeat' === $_POST['action'] ) { // phpcs:ignore WordPress.Security.NonceVerification.Missing
			return null;
		}

		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Set dispatcher rules
	 *
	 * $pattern[key] - valid php expression to be checked through IF statement with non-strict comparison next way - "if( $pattern[key] == true)"
	 *
	 * $pattern[value] - array of pluging file names(or string - ':DO_NOT_FILTER:'), that should be left as active if "$pattern[key]" is true
	 *
	 * Assumes 'OR' between indexes
	 *
	 * @example:
	 * - ['regenerate-thumbnails/regenerate-thumbnails.php']
	 * - ['regenerate-thumbnails.php']
	 * @return void
	 */
	private function set_pattern(): void {

		$p = [
			// Any request from backend.
			'strpos($_SERVER["HTTP_REFERER"], "wp-admin")' => ':DO_NOT_FILTER:',

			// Any request from frontend.
			'isset($_REQUEST["data"]["AJAX_Marker"]) && $_REQUEST["data"]["AJAX_Marker"] == "MessiaAjax"' => [ 'messia-travel/messia-travel.php' ],
		];

		$this->pattern = apply_filters( 'messia_ajax_dispatcher_rules', $p );
	}

	/**
	 * Detect whether request should be dispatched.
	 *
	 * @return bool
	 */
	private function check_environment(): bool {

		if ( ! empty( $_SERVER['HTTP_X_REQUESTED_WITH'] ) && 'xmlhttprequest' === strtolower( $_SERVER['HTTP_X_REQUESTED_WITH'] ) ) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Delete log file if dispatcher version outdated.
	 *
	 * @return void
	 */
	private function empty_log(): void {

		$db_data_ver     = '0';
		$current_version = get_file_data( __FILE__, [ 'ver' => 'Version' ] );

		if ( isset( $this->blog_settings['ajax_dispatcher_version'] ) ) {
			$db_data_ver = $this->blog_settings['ajax_dispatcher_version'];
		}

		if ( version_compare( $db_data_ver, $current_version['ver'], '<' ) ) {

			@unlink( get_parent_theme_file_path() . '/logs/ajax-requests.log' ); // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged

			$new_setting = wp_parse_args( [ 'ajax_dispatcher_version' => $current_version['ver'] ], $this->blog_settings );
			update_option( 'messia_blog_settings_preset', $new_setting );
			$this->blog_settings = $new_setting;
		}
	}

	/**
	 * Dispatching itself.
	 *
	 * @return void
	 */
	private function fire_dispatch(): void {

		if ( isset( $_GET['madh'] ) ) {

			// forwarding headers after redirect.
			@header( 'Messia-Ajax-Dispatcher-APs: ' . $_GET['madh'] ); // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged
			return;
		}

		foreach ( $this->pattern as $true_expression => $active_plugins ) {

			$value = eval( 'return ' . $true_expression . ';' ); // phpcs:ignore Squiz.PHP.Eval.Discouraged
			if ( true === (bool) $value ) {

				if ( ':DO_NOT_FILTER:' === $active_plugins ) {

					$db_active_plugins = get_option( 'active_plugins' );

					foreach ( $db_active_plugins as $db_active_plugin ) {
						$this->let[] = basename( $db_active_plugin );
					}
				} else {

					foreach ( $active_plugins as $active_plugin ) {
						$this->let[] = $active_plugin;
					}
				}
				$this->matched = true;
			}
		}

		$this->let = array_unique( $this->let );

		// if no one rule was matched do nothing - just log.
		if ( ! $this->matched ) {
			$this->log_request( $this->log_max_size );
		} else {
			add_filter( 'option_active_plugins', [ $this, 'filter_plugins' ] );
			add_filter( 'wp_redirect', [ $this, 'headers_info_query_var_add' ] );
		}
	}

	/**
	 * Filter the array of active plugins by matched rules.
	 *
	 * @param array $plugins Plugins that are currently active on site.
	 *
	 * @return array
	 */
	public function filter_plugins( array $plugins ): array {

		$return = $plugins;
		remove_filter( 'option_active_plugins', [ $this, 'filter_plugins' ] );

		if ( $this->matched ) {

			$this->filtered = array_merge( $this->filtered, $plugins );

			$return = $this->filtered;
		}

		$this->debugger();
		$this->send_debug_headers();

		return $return;
	}


	/**
	 * Add marker to url to recognise redirected request later.
	 *
	 * @param string $location Target URL that now redirecting to.
	 *
	 * @return string
	 */
	public function headers_info_query_var_add( string $location ): string {

		MIA()->set_messia_admin_notice_transient( 5 );
		remove_filter( 'wp_redirect', [ $this, 'headers_info_query_var_add' ] );
		return add_query_arg( [ 'madh' => $this->send_debug_headers( false ) ], $location );
	}

	/**
	 * For debug actions.
	 *
	 * @return void
	 */
	private function debugger(): void {

		if ( 1 === $this->blog_settings['ajax_dispatcher_log'] ) {
			$r = null; // add any debug info here.
		}
	}

	/**
	 * Write logfile of request.
	 *
	 * @param bool|integer $limit_file Log file size at which it will be re-created.
	 *
	 * @return void
	 */
	private function log_request( $limit_file = false ): void {

		if ( 0 === $this->blog_settings['ajax_dispatcher_log'] ) {
			return;
		}

		$path = get_parent_theme_file_path() . '/logs/';
		if ( ! is_dir( $path ) ) {
			mkdir( $path );
		}

		$logfile = $path . 'ajax-requests.log';

		if ( ! file_exists( $logfile ) || filesize( $logfile ) < $limit_file ) {

			$post = print_r( $_POST, true ); // phpcs:ignore WordPress.Security.NonceVerification.Missing
			$get  = print_r( $_GET, true );
			$body = file_get_contents( 'php://input' );

			error_log(
				'REQUEST_URI: ' . $_SERVER['REQUEST_URI'] . "\n" .
						'HTTP_REFERER: ' . $_SERVER['HTTP_REFERER'] . "\n" .
						'POST: ' . $post .
						'GET: ' . $get .
						'BODY: ' . $body . "\n" .
				str_repeat( '-', 50 ) . "\n\n\n",
				3,
				$logfile
			);
		}
	}

	/**
	 * Send headers with dispatched data.
	 *
	 * @param bool $echo Output or return result.
	 *
	 * @return string|null
	 */
	public function send_debug_headers( bool $echo = true ): ?string {

		if ( ! $this->matched ) {

			$header_data = 'default - no one rule matched';
		} else {

			( count( $this->filtered ) > 0 ) ? $header_data = implode( ', ', $this->filtered ) : $header_data = 'none';
		}

		if ( $echo ) {
			@header( 'Messia-Ajax-Dispatcher-APs: ' . $header_data ); // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged
			return null;
		} else {
			return $header_data;
		}
	}
}

Messia_Wp_Ajax_Dispatcher::instance();
