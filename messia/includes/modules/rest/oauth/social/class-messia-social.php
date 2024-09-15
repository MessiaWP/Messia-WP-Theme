<?php
/**
 * Messia_Rest_API
 *
 * @package Messia\Modules\REST\Authentication\Social
 */

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Modules\Rest\OAuth\Social;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use WP_REST_Request;

/**
 * Class Messia_Social provide user
 * logging in with external services.
 *
 * @package Messia\Modules\REST\Authentication\Social
 */
abstract class Messia_Social {

	/**
	 * Force child to have this method to return
	 * instance of class.
	 *
	 * @return object One of service to execute authentication with.
	 */
	abstract public static function instance(): object;

	/**
	 * Force child to have this method to
	 * render buttons for social networks.
	 *
	 * @return string
	 */
	abstract public function button(): string;

	/**
	 * Force child to have this method to
	 * register rest methods.
	 *
	 * @return void
	 */
	abstract public function rest(): void;

	/**
	 * Force child to have this method to
	 * make request to the social network server.
	 *
	 * @param WP_REST_Request $request HTTP(S) valid request.
	 *
	 * @return void
	 */
	abstract public function request( WP_REST_Request $request ): void;

	/**
	 * Blog settings.
	 *
	 * @var array
	 */
	protected array $blog_settings;

	/**
	 * Messia_Social constructor.
	 *
	 * @return void
	 */
	protected function __construct() {
		$this->blog_settings = MIA()->get_module_settings()->get_blog_setting( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME );
	}

	/**
	 * Log in or registers a user.
	 * Works on the basis of data received from servers of social networks.
	 *
	 * @param array $user_data User info.
	 *
	 * @return void
	 */
	protected function set_user_data( array $user_data ): void {
		$user_email = $user_data['user_email'];
		$user       = get_user_by( 'email', $user_email );
		if ( ! $user ) {
			$new_user = register_new_user( $user_email, $user_email );
			if ( ! is_wp_error( $new_user ) ) {
				wp_update_user(
					[
						'ID'         => $new_user,
						'role'       => MIA()->get_module_user_roles()->get_role_name(),
						'first_name' => $user_data['first_name'],
						'last_name'  => $user_data['last_name'],
					]
				);
				update_user_meta( $new_user, 'wp_user_avatar', $user_data['user_pic'] ); // It will be needed in a task with a account dashboard.
				wp_set_auth_cookie( $new_user );
				header( 'Content-Type: text/html; charset=utf-8' );
				echo '<script>window.close();</script>'; // TODO Replace with AJAX callback.
				exit;
			} else {
				exit( esc_html( $new_user->get_error_message() ) );
			}
		} else {
			wp_set_auth_cookie( $user->ID );
			header( 'Content-Type: text/html; charset=utf-8' );
			echo '<script>window.close();</script>'; // TODO Replace with AJAX callback.
			exit;
		}
	}

	/**
	 * Universal cURL method to retrieve data from authorization servers.
	 *
	 * @param string $url    Requested URL.
	 * @param array  $params URL query data.
	 * @param string $type   Type json|str.
	 *
	 * @return string
	 *
	 * phpcs:disable WordPress.WP.AlternativeFunctions
	 */
	protected function doing_curl( string $url, array $params, string $type = 'json' ): string {
		$curl = curl_init();
		curl_setopt( $curl, CURLOPT_URL, $url );
		curl_setopt( $curl, CURLOPT_POST, 1 );
		curl_setopt( $curl, CURLOPT_POSTFIELDS, urldecode( http_build_query( $params ) ) );
		curl_setopt( $curl, CURLOPT_RETURNTRANSFER, true );
		curl_setopt( $curl, CURLOPT_SSL_VERIFYPEER, false );
		$response = curl_exec( $curl );
		curl_close( $curl );
		if ( 'json' === $type ) {
			return json_decode( $response, true );
		} elseif ( 'str' === $type ) {
			parse_str( $response, $result );
			return $result;
		} else {
			exit; // Just in case.
		}
	}
}
