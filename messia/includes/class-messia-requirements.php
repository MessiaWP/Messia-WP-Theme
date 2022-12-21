<?php
/**
 * Messia_Requirements
 *
 * @package Messia
 */

// Should be as simple as possible.
// phpcs:disable

declare(strict_types = 1);

namespace Smartbits\Messia\Includes;

use WP_Screen;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class validates base theme requirements.
 * !!!!!!! Keep syntax as simple as possible !!!!!
 * To let validation be passed at minimum possible PHP version.
 *
 * @package Messia
 */
class Messia_Requirements {

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Requirements
	 */
	private static $instance = null;

	/**
	 * The list of errors considered violated requirements.
	 *
	 * @var array
	 */
	private $errors = array(
		'fatal'         => array(),
		'block_edit'    => array(),
		'block_widgets' => array(),
		'theme_licence' => array(),
	);

	/**
	 * Messia_Requirements Constructor.
	 */
	private function __construct() {
		$this->validate_enviroment();
		add_action( 'current_screen', array( $this, 'validate_block_widgets' ), 10, 1 );
		add_action( 'current_screen', array( $this, 'validate_block_editor' ), 10, 1 );
		add_action( 'current_screen', array( $this, 'validate_theme_licence' ), 10, 1 );

		$this->notify();
	}

	/**
	 * Messia_Requirements Instance.
	 * Ensures only one instance of Messia_Requirements is loaded or can be loaded.
	 *
	 * @return Messia_Requirements Instance.
	 */
	public static function instance(): Messia_Requirements {

		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Notify owner on found problems.
	 *
	 * @return void
	 */
	public function notify(): void {

		if ( false !== strpos( $_SERVER['REQUEST_URI'], '/wp-json/' ) ) {
			return;
		}

		if ( wp_doing_ajax() ) {
			return;
		}

		$this->show_notification();
	}

	/**
	 * Validate environment against required
	 *
	 * @return void
	 */
	private function validate_enviroment() {

		global $wpdb;

		$php_version = PHP_VERSION;
		$wp_version  = get_bloginfo( 'version' );
		$db_version  = $wpdb->db_version();
		$server_info = $wpdb->get_var( 'SELECT VERSION();' );

		$min_md_version     = '10.2.0';
		$min_my_sql_version = '8.0.0';
		$min_php_version    = '8.0.0';
		$min_wp_version     = '6.0.0';

		if ( strpos( $server_info, 'MariaDB' ) ) { // MariaDB.

			$version = preg_match( '/\s*((?:[0-9]+\.?)+)/i', $server_info, $matches );

			if ( version_compare( $matches[1], $min_md_version, '<' ) ) {
				// translators: %1$s - minimum MariaDB version, %2$s - minimum MySQL version, %3$s - current DB version.
				$this->errors['fatal'][] = sprintf( __( 'Messia requires at least MariaDB %1$s and above or MySQL %2$s and above, you have MariaDB %3$s', 'messia' ), $min_md_version, $min_my_sql_version, $db_version );
			}
		} else { // MySQL.

			if ( version_compare( $db_version, $min_my_sql_version, '<' ) ) {
				// translators: %1$s - minimum MariaDB version, %2$s - minimum MySQL version, %3$s - current DB version.
				$this->errors['fatal'][] = sprintf( __( 'Messia requires at least MariaDB %1$s and above or MySQL %2$s and above, you have MySQL %3$s', 'messia' ), $min_md_version, $min_my_sql_version, $db_version );
			}
		}

		if ( version_compare( $php_version, $min_php_version, '<' ) ) {
			// translators: %1$s - minimum PHP version, %2$s - current PHP version.
			$this->errors['fatal'][] = sprintf( __( 'Messia requires at least PHP %1$s version or higher, you have PHP %2$s', 'messia' ), $min_php_version, $php_version );
		}

		if ( version_compare( $wp_version, $min_wp_version, '<' ) ) {
			// translators: %1$s - minimum WP version, %2$s - current WP version.
			$this->errors['fatal'][] = sprintf( __( 'Messia requires at least WordPress %1$s version or higher, you have WordPress %2$s', 'messia' ), $min_wp_version, $wp_version );
		}
	}

	/**
	 * Validate environment against Gutenberg widgets editor.
	 *
	 * @param WP_Screen $current_screen Current WP_Screen object.
	 *
	 * @return void
	 */
	public function validate_block_widgets( WP_Screen $current_screen ): void {

		$widget_block_editor = get_theme_support( 'widgets-block-editor' );

		if ( $widget_block_editor && wp_use_widgets_block_editor() ) {
			return;
		}

		$this->errors['block_widgets'][] = sprintf( __( 'Gutenberg Widgets Editor is turned off. Messia still works, but some of its capabilities are not available.', 'messia' ) );
	}

	/**
	 * Validate THeme licence status.
	 *
	 * @param WP_Screen $current_screen Current WP_Screen object.
	 *
	 * @return void
	 */
	public function validate_theme_licence( WP_Screen $current_screen ): void {

		$this->settings = MIA()->get_module( 'settings' );
		$settings       = $this->settings->get_shared_settings( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME, MESSIA_THEME_SITE_SETTINGS_PRESET_NAME );

		$theme_licence  = json_decode( $settings['theme_licence_data'], true );
		$activate_theme = null;

		if ( 'active' === $theme_licence['licence_status'] ) {
			return;
		}

		if ( is_network_admin() ) {
			$menu_page_url = network_admin_url( add_query_arg( 'page', MESSIA_THEME_MENU_PAGE_SLUG, null ) );

		} else {
			if ( is_multisite() ) {
				$menu_page_url = network_admin_url( add_query_arg( 'page', MESSIA_THEME_MENU_PAGE_SLUG, null ) );
				$main_site_id  = get_main_site_id();

				switch_to_blog( $main_site_id );
				$template = wp_get_theme()->template;
				restore_current_blog();
			} else {
				$menu_page_url = admin_url( add_query_arg( 'page', MESSIA_THEME_MENU_PAGE_SLUG, null ) );
				$template      = wp_get_theme()->template;
			}

			if ( 'messia' !== $template ) {
				$activate_theme = __( 'Before setting key be sure to activate Messia theme on the main site, otherwise link would not work.', 'messia' );
			}
		}

		// translators: %s - html tag a.
		$get_key = sprintf( '<a href="' . MESSIA_SHOP_MY_ACCOUNT_URL . '">%s</a>', __( 'My Account', 'messia' ) );
		$set_key = sprintf( '<a href="' . $menu_page_url . '">%s</a>', __( 'Messia settings', 'messia' ) );

		// translators: %1$s & %2$s - html tags a.
		$this->errors['theme_licence'][] = sprintf( __( 'Please enter your Messia theme license key to unlock full functionality, access support and automatic updates. To get key visit %1$s, to set - open %2$s. %3$s', 'messia' ), $get_key, $set_key, $activate_theme );
	}

	/**
	 * Validate environment against Gutenberg editor on page.
	 *
	 * @param WP_Screen $current_screen Current WP_Screen object.
	 *
	 * @return void
	 */
	public function validate_block_editor( WP_Screen $current_screen ): void {

		if ( use_block_editor_for_post_type( 'page' ) ) {
			return;
		}

		$this->errors['block_edit'][] = __( 'Gutenberg Block Editor is turned off. Messia still works, but some of its capabilities are not available.', 'messia' );
	}

	/**
	 * If requirements violated shows warning in front and die.
	 *
	 * @return void
	 */
	public function show_notification() {

		if ( ! empty( $this->errors['fatal'] ) ) {

			$err_html  = '<h3>' . esc_html__( 'Messia can\'t be launched due to its requirements violation:', 'messia' ) . '</h2>';
			$err_html .= '<li>' . implode( '</li><li>', $this->errors['fatal'] ) . '</li>';
			wp_die(
				$err_html,
				__( 'Messia requirement missed', 'messia' ),
				array(
					'response'  => 400,
					'exit'      => true,
					'back_link' => true,
				)
			);
		}

		add_action( 'admin_notices', array( $this, 'show_admin_notification' ) );
		add_action( 'network_admin_notices', array( $this, 'show_admin_notification' ) );
	}

	/**
	 * Render admin notice.
	 *
	 * @return void
	 */
	public function show_admin_notification() {

		global $current_screen;

		$e = false;

		switch ( $current_screen->id ) {
			case 'widgets':
				if ( empty( $this->errors['block_widgets'] ) ) {
					break;
				}
				$e = $this->errors['block_widgets'];
				break;

			case 'page':
				if ( empty( $this->errors['block_edit'] ) ) {
					break;
				}
				$e = $this->errors['block_edit'];
				break;

			default:
				if ( empty( $this->errors['theme_licence'] ) ) {
					break;
				}
				$e = $this->errors['theme_licence'];
		}

		if ( ! $e ) {
			return;
		}

		$err_html = '<li>' . implode( '</li><li>', $e ) . '</li>';
		?>
		<div class="notice notice-error">
			<p><strong><?php esc_html_e( 'Messia requirements violation:', 'messia' ); ?></strong></p>
			<ul><?php echo $err_html; ?></ul>
		</div>
		<?php
	}

	/**
	 * Returns all found violations.
	 *
	 * @return array
	 */
	public function get_errors() {

		if ( did_action( 'current_screen' ) < 1 ) {
			trigger_error( 'Method ' . __METHOD__ . ' called too earlier. Wait until WP init hook triggered at least once.', E_USER_WARNING ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error
			return;
		}
		return $this->errors;
	}
}
// phpcs:enable
