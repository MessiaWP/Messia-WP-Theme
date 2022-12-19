<?php
/**
 * Messia_Update
 *
 * @package Messia\Modules\Theme
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Modules\Theme;

use Smartbits\Messia\Includes\Config\Messia_Settings;
use Throwable;
use Exception;
use WP_Theme;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class for licence key and updates handling.
 */
final class Messia_Update {

	/**
	 * Iformation for API.
	 *
	 * @var object
	 */
	private object $credentials;

	/**
	 * Reference set.
	 *
	 * @var array
	 */
	private array $dictionary;

	/**
	 * Theme settings.
	 *
	 * @var Messia_Settings
	 */
	private Messia_Settings $settings;

	/**
	 * Messia_Update Constructor.
	 *
	 * @param array $credentials Information for API.
	 *
	 * @return void
	 */
	public function __construct( array $credentials = [] ) {

		$this->settings = MIA()->get_module( 'settings' );
		$settings       = $this->settings->get_shared_settings( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME, MESSIA_THEME_SITE_SETTINGS_PRESET_NAME );

		if ( ! array_key_exists( 'theme_licence_data', $settings ) ) {
			return;
		}

		$this->set_response_dictionary();

		$this->credentials = (object) wp_parse_args(
			$credentials,
			[
				'shop_api_url'    => MESSIA_SHOP_URL,
				'theme_url'       => get_site_url(),
				'wp_theme'        => wp_get_theme(),
				'shop_product_id' => MESSIA_SHOP_PRODUCT_ID,
				'theme_licence'   => json_decode( $settings['theme_licence_data'], true ),
			]
		);

		// only for debbug.
		// set_site_transient( 'update_themes', null );

		$this->init_hooks();
	}

	/**
	 * Enqueue required for this class WP hooks.
	 *
	 * @return void
	 */
	private function init_hooks(): void {
		add_action( 'wp_ajax_messia_licence_action', [ $this, 'licence_action' ], 10 );
		add_filter( 'pre_set_site_transient_update_themes', [ $this, 'check_for_update' ], 10, 2 );
		add_filter( 'themes_api', [ $this, 'theme_api_call' ], 10, 3 );
		add_action( "after_theme_row_{$this->credentials->wp_theme->template}", [ $this, 'after_theme_row' ], 10, 3 );
	}

	/**
	 * Callback for WP "after_theme_row_{$stylesheet}" action.
	 * Fires after each specific row in the Multisite themes list table.
	 *
	 * @param string   $stylesheet Directory name of the theme.
	 * @param WP_Theme $theme      Current WP_Theme object.
	 * @param string   $status     Status of the theme.
	 *
	 * @return void
	 */
	public function after_theme_row( string $stylesheet, WP_Theme $theme, string $status ): void {

		if ( 'active' === $this->credentials->theme_licence['licence_status'] ) {
			return;
		}

		$table = _get_list_table( 'WP_Plugins_List_Table' );
		?>
		<tr class="plugin-update-tr active" id="<?php echo $this->credentials->wp_theme->template; ?>-update" data-slug="<?php echo $this->credentials->wp_theme->template; ?>">
			<td colspan="<?php echo $table->get_column_count(); ?>" class="plugin-update colspanchange">
				<div class="update-message notice inline notice-warning notice-alt">
					<p>
						<?php esc_html_e( 'A valid license is required to receive automatic updates and access to support.', 'messia' ); ?>
						<?php printf( '<a href="' . MESSIA_SHOP_URL . '">%s</a>', __( 'Buy licence', 'messia' ) ); ?> |
						<?php printf( '<a href="' . admin_url( add_query_arg( 'page', MESSIA_THEME_MENU_PAGE_SLUG, null ) ) . '">%s</a>', __( 'Activate licence', 'messia' ) ); ?>
					</p>
				</div>
			</td>
		</tr>
		<?php
	}

	/**
	 * Callback for WP pre_set_site_transient_update_themes &
	 * pre_set_transient_update_themes filters.
	 *
	 * Filters the value of a specific site transient before it is set.
	 *
	 * @param mixed  $value     New value of site transient.
	 * @param string $transient Transient name.
	 *
	 * @return mixed
	 */
	public function check_for_update( mixed $value, string $transient ) {

		if ( 'active' !== $this->credentials->theme_licence['licence_status'] ) {
			return $value;
		}

		if ( ! is_object( $value ) ) {
			return $value;
		}

		if ( ! isset( $value->response ) ) {
			return $value;
		}

		if ( ! isset( $value->checked ) ) {
			return $value;
		}

		try {
			$request_string = $this->prepare_request( 'theme_update' );
			$api            = $this->execute_request( $request_string );

			if ( is_array( $api ) && ! empty( $api ) ) {
				$value->response[ $this->credentials->wp_theme->template ] = (array) $api['message'];
			}
		} catch ( Throwable $e ) {
			error_log( print_r( $e, true ) );
		} finally {
			return $value;
		}
	}

	/**
	 * Callback for WP themes_api filters.
	 *
	 * Filters whether to override the WordPress.org Themes API.
	 *
	 * Passing a non-false value will effectively short-circuit the WordPress.org API request.
	 *
	 * If `$action` is 'query_themes', 'theme_information', or 'feature_list', an object MUST
	 * be passed. If `$action` is 'hot_tags', an array should be passed.
	 *
	 * @since 2.8.0
	 *
	 * @param false|object|array $override Whether to override the WordPress.org Themes API. Default false.
	 * @param string             $action   Requested action. Likely values are 'theme_information',
	 *                                    'feature_list', or 'query_themes'.
	 * @param object             $args     Arguments used to query for installer pages from the Themes API.
	 *
	 * @return mixed
	 */
	public function theme_api_call( $override, string $action, object $args ): mixed {
		return $override;
	}

	/**
	 * Render interface for licence operations in admin.
	 *
	 * @param array  $args        Injected args from config.
	 * @param string $option_name As it storred in DB.
	 * @param string $value       Current option value.
	 *
	 * @return void
	 */
	public static function admin_interface( array $args, string $option_name, string $value ): void {

		$value  = json_decode( $value, true );
		$status = $value['licence_status'];
		?>
		<div class="messia-theme-licence-form-wrapper">
			<div class="messia-theme-licence-form-holder" data-status="<?php echo $status; ?>">
				<span class="status-title">
					<?php esc_html_e( 'Automatic Updates Setting (licence status)', 'messia' ); ?> - <span class="status-value"><?php echo $status; ?></span>
				</span>
				<div class="form-data">
					<div class="data">
						<div class="data-item">
							<input
								type="text"
								id="licence_key"
								<?php wp_readonly( $status, 'active' ); ?>
								placeholder="<?php esc_html_e( 'licence Key *', 'messia' ); ?>"
								value="<?php echo $value['licence_key']; ?>"
							/>
						</div>
						<input
							type="hidden"
							id="licence_status"
							value="<?php echo $value['licence_status']; ?>"
						/>
						<input
							type="hidden"
							name="<?php echo $option_name; ?>"
							value='<?php echo wp_json_encode( $value ); ?>'
						/>
					</div>
					<div class="actions">
						<?php
						submit_button( self::get_action_name_by_status( $value['licence_status'] ), 'primary', '', false, [ 'id' => 'messia-licence-status-togle' ] );
						?>
						<div id="loader_holder"></div>
					</div>
				</div>
			</div>
		</div>
		<?php
	}

	/**
	 * Handler for actions with licence from admin.
	 *
	 * @throws Exception On fail.
	 *
	 * @return void
	 */
	public function licence_action(): void {

		if ( check_ajax_referer( 'messiaCoreSettingsNonce', 'messiaNonce', false ) ) {

			try {
				$payload = json_decode( wp_unslash( $_POST['data'] ) );

				if ( ! isset( $payload->licence_key ) || ! isset( $payload->licence_status ) || ! isset( $payload->licence_action ) ) {
					throw new Exception( __( 'Incoming Data are corrupted', 'messia' ) );
				}

				$this->credentials->theme_licence['licence_key'] = $payload->licence_key;
				$current_licence_status                          = $this->credentials->theme_licence['licence_status'];

				switch ( $payload->licence_action ) {
					case 'toggleStatus':
						$action = ( 'active' === $this->credentials->theme_licence['licence_status'] ) ? 'deactivate' : 'activate';
						break;

					case 'updateStatus':
						$action = 'status-check';
						break;

					default:
						throw new Exception( __( 'Invalid licence action.', 'messia' ) );
				}

				$request_string = $this->prepare_request( $action );
				$response_body  = $this->execute_request( $request_string );

				// If there are no status Active assume that licence inactive otherwise.
				if ( ! array_key_exists( 'licence_status', $response_body ) ) {
					$response_body['licence_status'] = 'inactive';
				}

				// Lock action button if license is active.
				if ( 'active' === $response_body['licence_status'] ) {
					$response_body['readonly'] = true;
				}

				$this->localize_response( $response_body );
				$this->credentials->theme_licence['licence_status'] = $response_body['licence_status'];
				$licence_data                                       = $this->persist_licence_data();

				$btn_text = $this->get_action_name_by_status( $licence_data['licence_status'] );

				// For users who still does not use licence at all - override message.
				if ( 'updateStatus' === $payload->licence_action && empty( $payload->licence_key ) ) {
					$response_body['message'] = __( 'Would you like to receive automatic updates and unlock premium support? Please activate your copy of Messia Theme.', 'messia' );
				}

				wp_send_json_success(
					[
						'status'      => 'success',
						'status_code' => 'm200',
						'response'    => $response_body,
						'key_val'     => $licence_data['licence_key'],
						'btn_text'    => $btn_text,
						'readonly'    => 'active' === $response_body['licence_status'],
						'reload'      => $current_licence_status !== $this->credentials->theme_licence['licence_status'] && 'updateStatus' !== $payload->licence_action,
					]
				);
			} catch ( Throwable $e ) {
				wp_send_json_success(
					[
						'status'      => 'error',
						'status_code' => 'm400',
						'response'    => [
							// translators: %1$s, %2$s - html tags, %1$s - exception message.
							'message' => sprintf( __( '%1$sLicence error%2$s: %3$s', 'messia' ), '<strong>', '</strong>', $e->getMessage() ),
						],
						'btn_text'    => __( 'Retry', 'messia' ),
					]
				);
			}
		} else {

			wp_send_json_error(
				[
					'status'      => 'error',
					'status_code' => 'm403',
					'message'     => __( 'Access violation - reload the page and try again', 'messia' ),
					'btn_text'    => __( 'Repeat', 'messia' ),
				]
			);
		}
	}

	/**
	 * Save licence data into DB.
	 *
	 * @return array Updated state.
	 */
	private function persist_licence_data(): array {

		$settings          = $this->settings->get_shared_settings( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME, MESSIA_THEME_SITE_SETTINGS_PRESET_NAME );
		$licence_data_curr = json_decode( $settings['theme_licence_data'], true );

		$licence_data_new = wp_parse_args(
			[
				'licence_key'    => trim( $this->credentials->theme_licence['licence_key'] ),
				'licence_status' => $this->credentials->theme_licence['licence_status'],
			],
			$licence_data_curr
		);

		$updated_settings = $this->settings->set_shared_settings(
			MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME,
			MESSIA_THEME_SITE_SETTINGS_PRESET_NAME,
			[
				'theme_licence_data' => wp_json_encode( $licence_data_new ),
			],
		);

		$this->credentials->theme_licence = json_decode( $updated_settings['theme_licence_data'], true );

		return $this->credentials->theme_licence;
	}

	/**
	 * Creates structured request params.
	 *
	 * @param string $action Can be one of:
	 *                       - activate
	 *                       - deactivate
	 *                       - status-check
	 *                       - plugin_update
	 *                       - theme_update
	 *                       - plugin_information
	 *                       - code_version
	 *                       - key_delete.
	 *
	 * @return array
	 */
	private function prepare_request( string $action ): array {

		global $wp_version;

		return [
			'woo_sl_action'     => $action,
			'version'           => $this->credentials->wp_theme->version,
			'product_unique_id' => $this->credentials->shop_product_id,
			'licence_key'       => $this->credentials->theme_licence['licence_key'],
			'domain'            => $this->credentials->theme_url,
			'wp-version'        => $wp_version,

		];
	}

	/**
	 * Sends and processes a request.
	 *
	 * @param array $query URL query part.
	 *
	 * @throws Exception On fail.
	 * 
	 * @return array
	 */
	private function execute_request( array $query ): array {

		$request_uri = $this->credentials->shop_api_url . '?' . http_build_query( $query, '', '&' );
		$response    = wp_remote_get( $request_uri );

		if ( is_wp_error( $response ) || 200 !== (int) $response['response']['code'] ) {
			throw new Exception( $response->get_error_message() );
		}

		$response_block = json_decode( $response['body'] );

		if ( ! is_array( $response_block ) || count( $response_block ) < 1 ) {
			throw new Exception( __( 'Response body corrupted', 'messia' ) );
		}

		$last_in_array = end( $response_block );

		if ( isset( $last_in_array->license_status ) ) {
			$last_in_array->licence_status = $last_in_array->license_status;
			unset( $last_in_array->license_status );
		}

		return (array) $last_in_array;
	}

	/**
	 * Transform API response into handy one.
	 *
	 * @param array $response Body.
	 *
	 * @return void
	 */
	private function localize_response( array &$response ): void {

		$status_code = $response['status_code'];

		if ( ! array_key_exists( $status_code, $this->dictionary ) ) {
			return;
		}

		$preset = $this->dictionary[ $status_code ];

		if ( false === $preset['local'] ) {
			return;
		}

		// translators: %1$s - licence key status, %2$s - licence status.
		$response['message'] = sprintf( __( '%1$s License status - %2$s.', 'messia' ), $preset['local'], $response['licence_status'] );
	}

	/**
	 * Dictionary setter.
	 *
	 * @return void
	 */
	private function set_response_dictionary(): void {

		$html_s = '<strong>' . __( 'Licence info:', 'messia' ) . '</strong>';
		$html_e = '<strong>' . __( 'Licence error:', 'messia' ) . '</strong>';

		$this->dictionary = [
			// SUCCESS.
			's100' => [
				'original' => 'Licence Key Successfully activated for `domain`',
				// translators: %s - Heading text.
				'local'    => sprintf( __( '%s key successfully activated for this domain.', 'messia' ), $html_s ),
			],
			's101' => [
				'original' => 'Licence Key Successfully activated for `domain` – *first pass',
				// translators: %s - Heading text.
				'local'    => sprintf( __( '%s key successfully activated for this domain.', 'messia' ), $html_s ),
			],
			's201' => [
				'original' => 'Licence Key Successfully Unassigned',
				// translators: %s - Heading text.
				'local'    => sprintf( __( '%s  key successfully unassigned from domain.', 'messia' ), $html_s ),
			],
			's203' => [
				'original' => 'Licence Key Is not assigned to domain',
				// translators: %s - Heading text.
				'local'    => sprintf( __( '%s key is valid, but not assigned to any domain.', 'messia' ), $html_s ),
			],
			's205' => [
				'original' => 'Licence key Is Active and Valid for Domain',
				// translators: %s - Heading text.
				'local'    => sprintf( __( '%s key is active and valid for this domain.', 'messia' ), $html_s ),
			],
			's401' => [
				'original' => '*a full response with code metadata on calling plugin_update or theme_update methods',
				'local'    => false,
			],
			's402' => [
				'original' => '*a full response with code metadata on calling plugin_information method',
				'local'    => false,
			],
			's403' => [
				'original' => '*a full response with code metadata on calling code_information method',
				'local'    => false,
			],
			's610' => [
				'original' => '*Licence Key Successfully Deleted',
				// translators: %s - Heading text.
				'local'    => sprintf( __( '%s key successfully deleted.', 'messia' ), $html_s ),
			],
			// ERRORS.
			'e001' => [
				'original' => 'Invalid provided data',
				// translators: %s - Heading text.
				'local'    => sprintf( __( '%s invalid provided data.', 'messia' ), $html_e ),
			],
			'e002' => [
				'original' => 'Invalid licence key',
				// translators: %s - Heading text.
				'local'    => sprintf( __( '%s invalid licence key.', 'messia' ), $html_e ),
			],
			'e003' => [
				'original' => 'Order does not exists anymore',
				// translators: %s - Heading text.
				'local'    => sprintf( __( '%s order does not exists anymore.', 'messia' ), $html_e ),
			],
			'e004' => [
				'original' => 'Order status not allowed',
				// translators: %s - Heading text.
				'local'    => sprintf( __( '%s order status not allowed.', 'messia' ), $html_e ),
			],
			'e110' => [
				'original' => 'Invalid licence key or licence not active for domain',
				// translators: %s - Heading text.
				'local'    => sprintf( __( '%s invalid key or licence not active for domain.', 'messia' ), $html_e ),
			],
			'e111' => [
				'original' => 'Invalid Data',
				// translators: %s - Heading text.
				'local'    => sprintf( __( '%s invalid licence data.', 'messia' ), $html_e ),
			],
			'e112' => [
				'original' => 'You had reached the maximum number of domains for this key',
				// translators: %s - Heading text.
				'local'    => sprintf( __( '%s you had reached the maximum number of domains for this theme licence key.', 'messia' ), $html_e ),
			],
			'e204' => [
				'original' => 'Licence key not active for current domain',
				// translators: %s - Heading text.
				'local'    => sprintf( __( '%s key not active for current domain.', 'messia' ), $html_e ),
			],
			'e301' => [
				'original' => 'Licence Key does not match this product',
				// translators: %s - Heading text.
				'local'    => sprintf( __( '%s key does not match this product.', 'messia' ), $html_e ),
			],
			'e312' => [
				'original' => 'Licence is not Active, current status is `STATUS`',
				'local'    => false,
			],
			'e419' => [
				'original' => 'Invalid Product Unique ID',
				// translators: %s - Heading text.
				'local'    => sprintf( __( '%s invalid product unique ID.', 'messia' ), $html_e ),
			],
		];
	}

	/**
	 * Define action title by status value.
	 *
	 * @param string $status Licence status.
	 *
	 * @return string
	 */
	private static function get_action_name_by_status( ?string $status ): string {

		switch ( $status ) {
			case 'active':
				$title = __( 'Deactivate', 'messia' );
				break;

			default:
				$title = __( 'Activate', 'messia' );
				break;
		}

		return $title;
	}
}
