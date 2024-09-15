<?php
/**
 * Messia_Access
 *
 * @package Messia\Modules\Theme
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Modules\Theme;

use Smartbits\Messia\Includes\Config\Messia_Settings;
use WP_User;
use DateTime;
use DateTimeZone;
use Throwable;
use Exception;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class for support handling.
 */
final class Messia_Access {

	/**
	 * Access details.
	 *
	 * @var object
	 */
	private static object $access_data;

	/**
	 * Theme settings.
	 *
	 * @var Messia_Settings
	 */
	private static Messia_Settings $settings;

	/**
	 * User info.
	 *
	 * @var string
	 */
	private const THEME_USER_CREDENTIALS = [
		'login' => 'messiawp',
		'email' => 'support@messiawp.com',
		'role'  => 'administrator',
	];

	/**
	 * Whether initialisation done.
	 *
	 * @var bool
	 */
	private static bool $inited = false;

	/**
	 * Messia_Access Constructor.
	 *
	 * @param array $access_data Access details.
	 *
	 * @return string
	 */
	public static function init( array $access_data = [] ): ?string {

		if ( true === self::$inited ) {
			return __CLASS__;
		}

		self::$settings = MIA()->get_module_settings();
		$settings       = self::$settings->get_shared_settings( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME, MESSIA_THEME_SITE_SETTINGS_PRESET_NAME );

		if ( ! array_key_exists( 'theme_support_access', $settings ) ) {
			return null;
		}

		self::$access_data = (object) wp_parse_args(
			$access_data,
			json_decode( $settings['theme_support_access'], true ),
		);

		self::access_lifetime_check();
		self::init_hooks();

		return __CLASS__;
	}

	/**
	 * Enqueue required for this class WP hooks.
	 *
	 * @return void
	 */
	private static function init_hooks(): void {
		add_action( 'wp_ajax_messia_access_action', [ __CLASS__, 'access_action' ], 10 );
	}

	/**
	 * Convert datetime to user format and server timezone.
	 *
	 * @param string $datetime Valid date time string.
	 *
	 * @return string
	 */
	private static function convert_date( string $datetime ): string {

		$date_format = get_option( 'date_format' );
		$time_format = get_option( 'time_format' );

		$datetime_format = "{$date_format} {$time_format}";

		return wp_date( $datetime_format, strtotime( $datetime ) );
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

		$value        = json_decode( $value, true );
		$status_title = self::get_status_title( $value['access_valid_until'] );
		$theme_user   = self::get_theme_user();
		$range_map    = self::get_range_map();

		$access_btn_attr = [
			'id'             => 'messia-support-status-togle',
			'data-operation' => 'messia_grant_access_action',
			'disabled'       => 'disabled',
		];

		$revoke_btn_attr = [
			'id'             => 'messia-support-status-revoke',
			'data-operation' => 'messia_revoke_access_action',
			'disabled'       => 'disabled',
		];

		// An unlikely case where access was given in a multisite environment and then switched to normal mode, or vice versa.
		if ( false === $value['access_valid_until'] && ! is_null( $theme_user ) ) {
			self::access_revoke( true );
		} else {
			unset( $revoke_btn_attr['disabled'] );
		}
		?>
		<div class="messia-theme-access-form-wrapper">
			<div class="messia-theme-access-form-holder" data-access-granted="<?php echo wp_json_encode( false !== $value['access_valid_until'] ); ?>">
				<span class="status-title">
					<?php esc_html_e( 'Support team members access status', 'messia' ); ?> - <span class="status-value"><?php echo $status_title; ?></span>
				</span>
				<div class="form-data">
					<div class="data">
						<div class="data-item">
							<label><?php esc_html_e( 'Access will expire in:', 'messia' ); ?></label>
							<input
								class="isolated"
								type="number"
								id="access_duration"
								min="<?php echo $range_map['days']['min']; ?>"
								max="<?php echo $range_map['days']['max']; ?>"
								step="1"
								data-map='<?php echo wp_json_encode( $range_map ); ?>'
							/>
							<select
								id="access_duration_units"
								class="isolated"
								style="width:auto">
								<?php
								foreach ( $range_map as $key => $range ) {
									?>
									<option <?php selected( $key, 'days' ); ?> value="<?php echo $key; ?>"><?php echo $range['name']; ?></option>
									<?php
								}
								?>
							</select>
							<?php // translators: %1$s - days range string, %2$s - hours range string. ?>
							<p><?php echo sprintf( __( 'Days range %1$s, Hours range %2$s, inclusive.', 'messia' ), "{$range_map['days']['min']}-{$range_map['days']['max']}", "{$range_map['hours']['min']}-{$range_map['hours']['max']}" ); ?></p>
						</div>
						<input
							type="hidden"
							name="<?php echo $option_name; ?>"
							value='<?php echo wp_json_encode( $value ); ?>'
						/>
						<div class="actions">
							<?php
							submit_button( self::get_action_title( $value['access_valid_until'] ), 'primary', '', false, $access_btn_attr );
							submit_button( __( 'Revoke', 'messia' ), 'primary', '', false, $revoke_btn_attr );
							?>
							<div id="loader_holder"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<?php
	}

	/**
	 * Handler for actions with access from admin.
	 *
	 * @throws Exception On fail.
	 *
	 * @return void
	 */
	public function access_action(): void {

		if ( check_ajax_referer( 'messiaCoreSettingsNonce', 'messiaNonce', false ) ) {

			try {
				$payload = json_decode( wp_unslash( $_POST['data'] ) );

				if ( ! isset( $payload->operation ) || ! isset( $payload->access_data ) ) {
					throw new Exception( __( 'Incoming Data are corrupted', 'messia' ) );
				}

				switch ( $payload->operation ) {
					case 'messia_grant_access_action':
						self::validate_payload( $payload );

						$user = self::access_grant( $payload->access_valid_until );
						break;

					case 'messia_revoke_access_action':
						$user = self::access_revoke();
						break;

					default:
						// translators: %1$s - operation name.
						throw new Exception( sprintf( __( 'Invalid operation type: %1$s', 'messia' ), $payload->operation ) );
				}

				self::persist_access_data();

				wp_send_json_success(
					[
						'status'             => 'success',
						'status_code'        => 'm200',
						'user'               => $user,
						'access_valid_until' => self::$access_data->access_valid_until,
						'status_title'       => self::get_status_title( self::$access_data->access_valid_until ),
						'access_granted'     => wp_json_encode( false !== self::$access_data->access_valid_until ),
						'btn_text'           => self::get_action_title( self::$access_data->access_valid_until ),
					]
				);

			} catch ( Throwable $e ) {
				wp_send_json_success(
					[
						'status'      => 'error',
						'status_code' => 'm400',
						// translators: %1$s - exception message.
						'message'     => sprintf( __( 'Error: %1$s', 'messia' ), $e->getMessage() ),
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
	 * Create theme user with admin role and set a date
	 * when it will be deleted.
	 *
	 * @param string $valid_until Valid UTC formatted date.
	 *
	 * @return object
	 */
	private static function access_grant( string $valid_until ): object {

		$user_response = (object) [
			'id'      => false,
			'message' => null,
		];

		$theme_user = self::get_theme_user();

		// Required in user_notification clb.
		self::$access_data->access_valid_until = $valid_until;

		if ( is_null( $theme_user ) ) {
			add_filter( 'wp_new_user_notification_email_admin', [ __CLASS__, 'user_notification' ], 10, 3 );
			add_filter( 'wp_new_user_notification_email', [ __CLASS__, 'user_notification' ], 10, 3 );

			$user_id = register_new_user( self::THEME_USER_CREDENTIALS['login'], self::THEME_USER_CREDENTIALS['email'] );

			if ( is_wp_error( $user_id ) ) {
				// translators: %1$s - WP error message.
				$user_response->message = sprintf( __( 'Fail to create Messia user -> %1$s.', 'messia' ), $user_id->get_error_message() );

				self::$access_data->access_valid_until = false;
				return $user_response;
			}

			remove_filter( 'wp_new_user_notification_email_admin', [ __CLASS__, 'user_notification' ], 10 );
			remove_filter( 'wp_new_user_notification_email', [ __CLASS__, 'user_notification' ], 10 );

			$wp_user = new WP_User( $user_id );
			$wp_user->set_role( self::THEME_USER_CREDENTIALS['role'] );

			grant_super_admin( $user_id );

			$user_response->id = (int) $user_id;
		} else {
			$user_id = (int) $theme_user->ID;
		}

		self::$access_data->access_valid_until = $valid_until;

		$user_response->id = $user_id;

		if ( is_null( $theme_user ) ) {
			// translators: %1$d - user ID, %2$s - full date.
			$user_response->message = sprintf( __( 'Messia user created. User ID - %1$d. User will be deleted automatically at: %2$s.', 'messia' ), $user_id, self::convert_date( $valid_until ) );
		} else {
			// translators: %1$d - user ID, %2$s - full date.
			$user_response->message = sprintf( __( 'Validity date for Messia user ID %1$d changed. User will be deleted automatically at: %2$s.', 'messia' ), $user_id, self::convert_date( $valid_until ) );
		}

		return $user_response;
	}

	/**
	 * Delete theme user.
	 *
	 * @param bool $silent Whether to send mail notification.
	 *
	 * @return object
	 */
	private static function access_revoke( bool $silent = false ): object {

		$theme_user = self::get_theme_user();

		$user_response = (object) [
			'id'      => ( is_null( $theme_user ) ) ? false : (int) $theme_user->ID,
			'message' => null,
		];

		if ( is_null( $theme_user ) ) {
			$user_response->message = __( 'Messia user already deleted and has no access therefore.', 'messia' );
		} else {

			$current_user = wp_get_current_user();

			revoke_super_admin( $user_response->id );

			if ( is_multisite() ) {
				require_once ABSPATH . 'wp-admin/includes/ms.php';

				$deleted = wpmu_delete_user( $user_response->id );
			} else {
				$deleted = wp_delete_user( $user_response->id );
			}

			if ( $deleted ) {
				self::$access_data->access_valid_until = false;

				$user_response->id      = false;
				$user_response->message = __( 'Messia user successfully deleted and has no access anymore.', 'messia' );

				add_action( 'admin_notice', [ __CLASS__, 'user_notice' ] );
				add_action( 'network_admin_notices', [ __CLASS__, 'user_notice' ] );

				// translators: %1$s - email, %2$s -url.
				$message = sprintf( __( 'Messia user %1$s was deleted from site %2$s.', 'messia' ), self::THEME_USER_CREDENTIALS['email'], ( is_multisite() ) ? network_site_url() : site_url() );
				wp_mail(
					self::THEME_USER_CREDENTIALS['email'],
					'Access revoke',
					$message
				);

				self::persist_access_data();

				if ( self::THEME_USER_CREDENTIALS['email'] === $current_user->user_email ) {
					wp_logout();
				}
			} else {
				$user_response->message = __( 'Fail to delete Messia user. You can delete it manualy from site users section.', 'messia' );
			}
		}

		return $user_response;
	}

	/**
	 * Checks if access has expired and if it is - delete theme user.
	 *
	 * @return void
	 */
	private static function access_lifetime_check(): void {
		$settings         = self::$settings->get_shared_settings( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME, MESSIA_THEME_SITE_SETTINGS_PRESET_NAME );
		$access_data_curr = json_decode( $settings['theme_support_access'], true );

		if ( false === $access_data_curr['access_valid_until'] ) {
			return;
		}

		$now           = ( new DateTime( 'now' ) );
		$granted_until = ( new DateTime( $access_data_curr['access_valid_until'] ) );

		$diff = $granted_until->getTimestamp() - $now->getTimestamp();

		if ( $diff > 0 ) {
			return;
		}

		self::access_revoke();
	}

	/**
	 * User getter
	 *
	 * @return object User.
	 */
	private static function get_theme_user(): ?object {

		global $wpdb;

		return $wpdb->get_row(
			$wpdb->prepare(
				"SELECT * FROM $wpdb->users WHERE user_email = %s LIMIT 1",
				self::THEME_USER_CREDENTIALS['email']
			)
		);
	}

	/**
	 * Save access data into DB.
	 *
	 * @return object Updated state.
	 */
	private static function persist_access_data(): object {

		$settings         = self::$settings->get_shared_settings( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME, MESSIA_THEME_SITE_SETTINGS_PRESET_NAME );
		$access_data_curr = json_decode( $settings['theme_support_access'], true );

		$access_data_new = wp_parse_args(
			[
				'access_valid_until' => self::$access_data->access_valid_until,
			],
			$access_data_curr
		);

		$updated_settings = self::$settings->set_shared_settings(
			MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME,
			MESSIA_THEME_SITE_SETTINGS_PRESET_NAME,
			[
				'theme_support_access' => wp_json_encode( $access_data_new ),
			],
		);

		self::$access_data = json_decode( $updated_settings['theme_support_access'] );

		return self::$access_data;
	}

	/**
	 * Define action title by status value.
	 *
	 * @param mixed $access_valid_until Granted date or false.
	 *
	 * @return string
	 */
	private static function get_action_title( mixed $access_valid_until ): string {

		if ( false === $access_valid_until ) {
			$title = __( 'Grant access', 'messia' );
		} else {
			$title = __( 'Change expiration', 'messia' );
		}

		return $title;
	}

	/**
	 * Define action title by status value.
	 *
	 * @param mixed $access_valid_until Granted date or false.
	 *
	 * @return string
	 */
	private static function get_status_title( mixed $access_valid_until ): string {

		if ( false === $access_valid_until ) {
			$title = __( 'No access', 'messia' );
		} else {
			// translators: %1$s - date.
			$title = sprintf( __( 'Granted until %1$s', 'messia' ), self::convert_date( $access_valid_until ) );
		}

		return $title;
	}

	/**
	 * Makes a set of check.
	 *
	 * @param object $payload Request data.
	 *
	 * @throws Exception On incorrect or missed params.
	 *
	 * @return void
	 */
	private static function validate_payload( object &$payload ): void {
		if ( ! isset( $payload->access_data->duration ) ) {
			throw new Exception( __( 'Incoming Data are corrupted - duration does not provided.', 'messia' ) );
		}

		if ( ! isset( $payload->access_data->units ) ) {
			throw new Exception( __( 'Incoming Data are corrupted - units does not provided', 'messia' ) );
		}

		$duration  = (float) $payload->access_data->duration;
		$units     = $payload->access_data->units;
		$range_map = self::get_range_map();

		if ( ! in_array( $units, array_keys( $range_map ), true ) ) {
			// translators: %1$s - units string.
			throw new Exception( sprintf( __( 'Illegal access units provided - %1$s', 'messia' ), $units ) );
		}

		$r = $range_map[ $units ]['sec'] * $duration;

		$origin = new DateTime();
		$target = new DateTime();

		$target->modify( "+{$r} seconds" );

		$diff_s = $target->getTimestamp() - $origin->getTimestamp();

		if ( $diff_s < ( $range_map[ $units ]['sec'] * $range_map[ $units ]['min'] ) ) {
			throw new Exception( sprintf( __( 'Min level access range violation', 'messia' ), $units ) );
		}

		if ( $diff_s > ( $range_map[ $units ]['sec'] * $range_map[ $units ]['max'] ) ) {
			throw new Exception( sprintf( __( 'Max level access range violation', 'messia' ), $units ) );
		}

		$payload->access_valid_until = $target->format( 'Y-m-d H:i' );
	}

	/**
	 * Getter
	 *
	 * @return array
	 */
	private static function get_range_map(): array {

		return [
			'days'  => [
				'min'  => 1,
				'max'  => 7,
				'name' => esc_html__( 'Days', 'messia' ),
				'sec'  => 1 * 24 * 60 * 60,
			],
			'hours' => [
				'min'  => 24,
				'max'  => 7 * 24,
				'name' => esc_html__( 'Hours', 'messia' ),
				'sec'  => 1 * 60 * 60,
			],
		];
	}

	/**
	 * Filters the contents of the new user notification email sent to the new user and site admin.
	 *
	 * @param array   $notification_email Consists of:
	 *         string $to The intended recipient - New user email address or site admin address.
	 *         string $subject The subject of the email.
	 *         string $message The body of the email.
	 *         string $headers The headers of the email.
	 * @param WP_User $user               User object for new user.
	 * @param string  $blogname           The site title.
	 *
	 * @return array
	 */
	public static function user_notification( array $notification_email, WP_User $user, string $blogname ): array {

		if ( self::THEME_USER_CREDENTIALS['email'] !== $user->data->user_email ) {
			return $notification_email;
		}

		$at = new DateTime( self::$access_data->access_valid_until, wp_timezone() );
		$at->setTimezone( new DateTimeZone( 'UTC' ) );

		$message = $notification_email['message'];
		// translators: %1$s - datetime string.
		$message .= "\n" . sprintf( __( 'This is temporary account. It will be deleted automatically at %1$s', 'messia' ), $at->format( 'r' ) );

		$notification_email['message'] = $message;

		return $notification_email;
	}

	/**
	 * Throw notice into Admin panel.
	 *
	 * @return void
	 */
	public static function user_notice(): void {
		?>
		<div id="message" class="notice notice-info is-dismissible">
			<p><?php esc_html_e( 'Messia support account was deleted from site, due to time came.', 'messia' ); ?></p>
		</div>
		<?php
	}
}
