<?php
/**
 * Implement custom menu tems in backend.
 *
 * @package wpAdminMenuPage
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Admin;

use Smartbits\Messia\Includes\Helpers\Messia_Help;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Smartbits\Messia\Includes\Admin\Messia_User_Settings;

/**
 * Class creates admin menu page.
 *
 * @package wpAdminMenuPage
 */
final class Messia_Menu extends Messia_Menu_Engine {

	/**
	 * Admin menu section config.
	 *
	 * @var array
	 */
	private array $settings = [];

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Menu
	 */
	private static ?Messia_Menu $instance = null; // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

	/**
	 * Messia_Menu Constructor.
	 *
	 * @param array $settings Static menu configuration.
	 *
	 * @return void
	 */
	protected function __construct( array $settings ) {

		if ( ! is_admin() ) {
			return;
		}

		$this->settings = $settings;

		Messia_User_Settings::init();

		if ( Messia_Help::messia_doing_ajax( 'messia_save_settings' ) ) {
			if ( check_ajax_referer( 'messiaCoreSettingsNonce', 'messiaNonce', false ) ) {

				$preset = $_POST['data']['preset'];

				if ( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME === $preset ) {
					parent::__construct( 'standalone', $this->settings['standalone'] );
				} elseif ( MESSIA_THEME_SITE_SETTINGS_PRESET_NAME === $preset ) {
					parent::__construct( 'network', $this->settings['network'] );
				}
			}
		} elseif ( is_network_admin() ) {
			if ( true === is_array( $settings['network'] ) && false === empty( $settings['network'] ) ) {
				parent::__construct( 'network', $this->settings['network'] );
			}
		} elseif ( true === is_array( $settings['standalone'] ) && false === empty( $settings['standalone'] ) ) {
			parent::__construct( 'standalone', $this->settings['standalone'] );
		}

		add_filter( 'messia_standalone_save_message_extra_data', [ $this, 'save_settings_actions' ], 5 );
		add_filter( 'messia_network_save_message_extra_data', [ $this, 'save_settings_actions' ], 5 );
		add_action( 'wp_ajax_search_objects', [ $this, 'search_objects' ] );
		add_action( 'print_media_templates', [ $this, 'print_demo_manage_templates' ], 10 );
		// add_action( 'admin_init', [ $this, 'messia_wp_settings' ], 10 );
	}

	/**
	 * Messia_Menu Instance.
	 * Ensures only one instance of Messia_Menu is loaded or can be loaded.
	 *
	 * @param array $settings Static menu configuration.
	 *
	 * @return Messia_Menu Instance.
	 */
	public static function instance( array $settings ): Messia_Menu {

		if ( is_null( self::$instance ) ) {
			self::$instance = new self( $settings );
		}
		return self::$instance;
	}

	/**
	 * If for some reasons admin menu can not be shown at all, then this
	 * method output exlanation on why instead of menu content.
	 *
	 * @param string $warning_msg Text to display.
	 *
	 * @return string
	 */
	protected function page_warning_callback( string $warning_msg ): string {
		ob_start();
		?>
			<h2><?php esc_html_e( 'Messia warning!!', 'messia' ); ?></h2>
			<div id="tabs">
				<div class="info"><?php echo $warning_msg; ?></div>
			</div>
		<?php
		return ob_get_clean();
	}

	/**
	 * Output help tabs content on menu page.
	 *
	 * @param string $page_hook The name of current screen.
	 *
	 * @return void
	 */
	protected function page_content_helptab_callback( string $page_hook ): void {

		if ( wp_doing_ajax() ) {
			return;
		}

		if ( $page_hook === $this->menu_page_hook ) {
			if ( 'standalone' === $this->menu_type ) {

				if ( is_array( $this->settings['standalone'] ) && isset( $this->settings['standalone']['tabs'] ) ) {
					foreach ( $this->settings['standalone']['tabs'] as $tab ) {

						if ( isset( $tab['help'] ) ) {

							get_current_screen()->add_help_tab(
								[
									'id'       => $tab['help']['id'],
									'title'    => $tab['help']['title'],
									'content'  => $tab['help']['content'],
									'callback' => $tab['help']['callback'],
									'priority' => $tab['help']['priority'],
								]
							);
						}
					}
				}
			}
			if ( 'network' === $this->menu_type ) {
				if ( is_array( $this->settings['network'] ) && isset( $this->settings['network']['tabs'] ) ) {
					foreach ( $this->settings['network']['tabs'] as $tab ) {

						if ( isset( $tab['help'] ) ) {

							get_current_screen()->add_help_tab(
								[
									'id'       => $tab['help']['id'],
									'title'    => $tab['help']['title'],
									'content'  => $tab['help']['content'],
									'callback' => $tab['help']['callback'],
									'priority' => $tab['help']['priority'],
								]
							);
						}
					}
				}
			}
		}

		$this->page_content_helpsidebar_callback( $page_hook );
	}

	/**
	 * Output help tabs sidebar content.
	 *
	 * @param string $page_hook The name of current screen.
	 *
	 * @return void
	 */
	protected function page_content_helpsidebar_callback( string $page_hook ): void {

		$sidebar_content = null;

		if ( $page_hook === $this->menu_page_hook ) {

			ob_start();
			?>
				<script type="text/javascript">
					(function($){
						$(document).ready(function () {
							$().fancybox({
								selector: '.fancybox-trigger',
								type: 'inline', // Content type: image|inline|ajax|iframe|html (optional)
								baseClass: 'modal',
								clickOutside: 'close',
								toolbar: false,
								smallBtn: true, // close btn
								parentEl: 'body',
								opts: {
									buttons: [
										'zoom',
										'share',
										'slideShow',
										'fullScreen',
										'download',
										'thumbs',
										'close',
									],
								},
							});
						});
					})(jQuery);</script>
				<!-- <p><strong><?php /* esc_html_e( 'References:', 'messia' ); */ ?></strong></p> -->
				<!--<p><a target="_blank" href="https://api.slack.com/apps?new_app=1" title="<?php /* esc_html_e( 'Creating a Slack application', 'messia' ); */ ?>"><?php /* esc_html_e( 'Creating a Slack application', 'messia' ); */ ?></a></p> -->
				<!--<p><a href="https://api.slack.com/apps?new_app=1&iframe=true&width=100%&height=100%" title="<?php /* esc_html_e( 'Creating a Slack application', 'messia' ); */ ?>"><?php /* esc_html_e( 'Creating a Slack application', 'messia' ); */ ?></a></p> -->
			<?php
			$sidebar_content = ob_get_clean();
		}

		// Nothing to show now.
		// get_current_screen()->set_help_sidebar( $sidebar_content );
	}

	/**
	 * Enqueue scripts and styles in right way at menu page screen.
	 *
	 * @param string $page_hook The name of current screen.
	 *
	 * @return void
	 */
	public function enqueue_child( string $page_hook ): void {

		if ( 0 === did_action( 'messia_admin_menu_created' ) ) {
			return;
		}

		$this->page_content_helptab_callback( $page_hook );

		add_action(
			'admin_print_styles-' . $this->menu_page_hook,
			function () {
				wp_enqueue_style( [ 'messia-settings' ] );
			},
			10,
			1
		);

		add_action(
			'admin_print_scripts-' . $this->menu_page_hook,
			function () {
				wp_enqueue_script( [ 'messia-settings' ] );
			},
			10,
			1
		);

		if ( $page_hook === $this->menu_page_hook ) {

			$object_data = [];
			wp_enqueue_media();
			wp_localize_script( 'messia-settings', 'messiaSettingsVars', $object_data );
		}
	}

	/**
	 * Add custom classes to body in admin.
	 *
	 * @param string $classes The name of current screen.
	 *
	 * @return string
	 */
	public function add_classes( string $classes ): string {

		$classes = "{$classes} " . MESSIA_NAMESPACE_ADMIN;

		return $classes;
	}

	/**
	 * Add custom information to response on succesfull saving setting.
	 *
	 * @param array $extra_data Data for frontend to show.
	 *
	 * @return array
	 */
	public function save_settings_actions( array $extra_data ): array {

		$extra_data[] = [
			'statusCode'  => 200,
			'messia_core' => __( 'Your changes have been saved.', 'messia' ),
		];

		return $extra_data;
	}

	/**
	 * Provide searching of objects by substring from Messia admin page
	 *
	 * @return void
	 */
	public function search_objects(): void {

		if ( check_ajax_referer( 'messiaBackendAjax', 'messiaNonce', false ) ) {

			global $wpdb;

			$response = [];
			$try      = '%' . esc_sql( $wpdb->esc_like( trim( sanitize_text_field( $_POST['data']['try_name'] ) ) ) ) . '%';
			$exc      = implode( ',', array_map( 'intval', $_POST['data']['exclude_ids'] ) );
			$sql      =
				"SELECT
					ID,
					post_title
				FROM $wpdb->posts
				WHERE
					post_type='messia_object'
					AND (post_title LIKE '$try' OR post_name LIKE '$try')
					AND ID NOT IN ($exc)
				ORDER BY post_title ASC;";

			$objects = $wpdb->get_results( $sql ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

			foreach ( $objects as $object ) {
				$response[] = [
					'label'  => $object->post_title,
					'value'  => $object->post_title,
					'postid' => $object->ID,
				];
			}

			wp_send_json_success(
				[
					'code'    => 200,
					'objects' => $response,
				]
			);
		} else {

			wp_send_json_error(
				[
					'code' => 500,
				]
			);
		}
	}

	/**
	 * Callback for WP print_media_templates hook.
	 *
	 * @return void
	 */
	public function print_demo_manage_templates(): void {
		require_once MESSIA_THEME_DIR . MESSIA_WP_TEMPLATES_PREFIX . '/demo-manage-template.php';
	}

	/**
	 * Add options into WP General section.
	 *
	 * @return void
	 */
	public function messia_wp_settings(): void {

		$options = [
			(object) [
				'id'    => 'messia_unit_position',
				'title' => __( 'Currency position', 'messia' ),
				'clb'   => [ $this, 'messia_unit_position_clb' ],
			],
		];

		foreach ( $options as $option ) {

			register_setting( 'general', $option->id );

			add_settings_field(
				$option->id,
				$option->title,
				$option->clb,
				'general',
				'default',
				[
					'id'          => $option->id,
					'option_name' => $option->title,
				]
			);
		}
	}

	/**
	 * Render option Currency position.
	 *
	 * @param array $args Option data.
	 *
	 * @return void
	 */
	public function messia_unit_position_clb( array $args ): void {
		$id          = $args['id'];
		$option_name = $args['option_name'];
		$value       = get_option( $option_name, 'left' );
		?>
		<select name="<?php echo $option_name; ?>" id="<?php echo $id; ?>">
			<option value="left" <?php selected( $value, 'left' ); ?>><?php esc_html_e( 'Left', 'messia' ); ?></option>
			<option value="right" <?php selected( $value, 'right' ); ?>><?php esc_html_e( 'Right', 'messia' ); ?></option>
			<option value="left_space" <?php selected( $value, 'left_space' ); ?>><?php esc_html_e( 'Left with space', 'messia' ); ?></option>
			<option value="right_space" <?php selected( $value, 'right_space' ); ?>><?php esc_html_e( 'Right with space', 'messia' ); ?></option>
		</select>
		<?php
	}
}
