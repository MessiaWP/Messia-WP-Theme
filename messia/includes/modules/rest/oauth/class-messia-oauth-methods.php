<?php
/**
 * Messia_Rest_API
 *
 * @package Messia\Modules\REST\Authentication
 */

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Modules\Rest\OAuth;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use WP_Error;
use WP_REST_Request;

/**
 * Class Messia_Rest_API
 *
 * @package Messia\Modules\REST\Authentication
 */
class Messia_OAuth_Methods {

	/**
	 * User authorization.
	 *
	 * @param WP_REST_Request $request Incoming request.
	 *
	 * @return void
	 */
	public function auth( WP_REST_Request $request ): void {
		$user = wp_signon(
			[
				'user_login'    => $request['login'],
				'user_password' => $request['password'],
				'remember'      => true,
			],
			true
		);
		if ( is_wp_error( $user ) ) {
			exit( esc_html( $user->get_error_message() ) );
		} else {
			exit( 'true' );
		}
	}

	/**
	 * User registration.
	 *
	 * @param WP_REST_Request $request Incoming request.
	 *
	 * @return void
	 */
	public function register( WP_REST_Request $request ): void {
		$new_user = register_new_user( $request['login'], $request['login'] );

		if ( ! is_wp_error( $new_user ) ) {
			wp_update_user(
				[
					'ID'        => $new_user,
					'role'      => MIA()->get_module_user_roles()->get_role_name(),
					'user_pass' => $request['password'],
				]
			);
			$this->auth( $request );
			exit( 'true' );
		} else {
			exit( esc_html( $new_user->get_error_message() ) );
		}
	}

	/**
	 * Password reset.
	 *
	 * @param WP_REST_Request $request Incoming request.
	 *
	 * @return void
	 */
	public function reset( WP_REST_Request $request ): void {
		if ( ! get_user_by( 'email', $request['login'] ) ) {
			exit( esc_html__( 'User with this email does not exist.', 'messia' ) );
		}
		$this->retrieve_password( $request );
		exit;
	}


	/**
	 * Overwrite the function.
	 * For some reason, the original function does not work
	 * this way we can modify it.
	 *
	 * @param WP_REST_Request $request Incoming request.
	 * @return bool|string|WP_Error
	 */
	private function retrieve_password( WP_REST_Request $request ) {
		$errors = new WP_Error();
		if ( empty( $request['login'] ) || ! is_string( $request['login'] ) ) {
			$errors->add( 'empty_username', __( '<strong>ERROR</strong>: Enter a username or email address.', 'messia' ) );
		} elseif ( strpos( $request['login'], '@' ) ) {
			$user_data = get_user_by( 'email', trim( wp_unslash( $request['login'] ) ) );
			if ( empty( $user_data ) ) {
				$errors->add( 'invalid_email', __( '<strong>ERROR</strong>: There is no account associated with this username or email address.', 'messia' ) );
			}
		} else {
			$login     = trim( $request['login'] );
			$user_data = get_user_by( 'login', $login );
		}
		do_action( 'lostpassword_post', $errors );
		if ( $errors->has_errors() ) {
			return $errors;
		}
		if ( ! $user_data ) {
			$errors->add( 'invalidcombo', __( '<strong>ERROR</strong>: There is no account associated with this username or email address.', 'messia' ) );
			return $errors;
		}
		$user_login = $user_data->user_login;
		$user_email = $user_data->user_email;

		$key = get_password_reset_key( $user_data );

		if ( is_wp_error( $key ) ) {
			return $key;
		}
		if ( is_multisite() ) {
			$site_name = get_network()->site_name;
		} else {
			$site_name = wp_specialchars_decode( get_option( 'blogname' ), ENT_QUOTES );
		}

		$message = esc_html_e( 'Someone has requested a password reset for the following account:', 'messia' ) . "\r\n\r\n";
		// translators: %s - site name.
		$message .= sprintf( esc_html__( 'Site Name: %s', 'messia' ), $site_name ) . "\r\n\r\n";
		// translators: %s - user name.
		$message .= sprintf( esc_html__( 'Username: %s', 'messia' ), $user_login ) . "\r\n\r\n";
		$message .= esc_html_e( 'If this was a mistake, just ignore this email and nothing will happen.', 'messia' ) . "\r\n\r\n";
		$message .= esc_html_e( 'To reset your password, follow this link:', 'messia' ) . "\r\n\r\n";
		$message .= '<' . network_site_url( "wp-login.php?action=rp&key=$key&login=" . rawurlencode( $user_login ), 'login' ) . ">\r\n";

		// translators: %s - site name.
		$title = sprintf( esc_html__( '[%s] Password Reset', 'messia' ), $site_name );
		$title = apply_filters( 'retrieve_password_title', $title, $user_login, $user_data );

		$message = apply_filters( 'retrieve_password_message', $message, $key, $user_login, $user_data );

		if ( $message && ! wp_mail( $user_email, wp_specialchars_decode( $title ), $message ) ) {

			$errors->add(
				'retrieve_password_email_failure',
				sprintf(
					// translators: %s - url.
					esc_html__( '<strong>ERROR</strong>: The email could not be sent. Your site may not be correctly configured to send emails. <a href="%s">Get support for resetting your password</a>.', 'messia' ),
					esc_url( esc_html( 'https://wordpress.org/support/article/resetting-your-password/' ) )
				)
			);
			return $errors;
		}
		return true;
	}
}
