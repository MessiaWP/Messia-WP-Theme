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

use WP_REST_Request;

/**
 * Authenticate user.
 *
 * @package Messia\Modules\REST\Authentication
 */
class Messia_OAuth {
	/**
	 * The single instance of the class.
	 *
	 * @var Messia_OAuth
	 */
	private static ?Messia_OAuth $instance = null; // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

	/**
	 * Contains the type of authorization.
	 *
	 * @var string
	 */
	private $oauth_method;

	/**
	 * Token for wp_nonce.
	 *
	 * @var string
	 */
	private string $nonce_field_name = 'oauth_token';

	/**
	 * Name for wp_nonce.
	 *
	 * @var string
	 */
	private string $nonce_action_name = 'check_oauth_token';

	/**
	 * Messia_OAuth Constructor
	 */
	private function __construct() {
		add_action( 'rest_api_init', [ $this, 'is_user_auth' ] );
		add_action( 'rest_api_init', [ $this, 'set_login_address' ] );
	}

	/**
	 * Messia_OAuth Instance.
	 * Ensures only one instance of Messia_OAuth is loaded or can be loaded.
	 *
	 * @return Messia_OAuth Instance
	 */
	public static function instance(): Messia_OAuth {

		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Installing authorization methods.
	 *
	 * @param WP_REST_Request $request Incoming request.
	 *
	 * @return void
	 */
	public function set_methods( WP_REST_Request $request ): void {
		if ( is_user_logged_in() ) {
			exit( esc_html__( 'Sorry, you are already logged in.', 'messia' ) );
		}
		if ( ! wp_verify_nonce( $request[ $this->nonce_field_name ], $this->nonce_action_name ) ) {
			exit( esc_html__( 'Sorry, the verification data is incorrect', 'messia' ) );
		}
		$auth = new Messia_OAuth_Methods();
		switch ( $request['oauth_type'] ) {
			case 'auth':
				$auth->auth( $request );
				break;
			case 'register':
				$auth->register( $request );
				break;
			case 'reset':
				$auth->reset( $request );
				break;
			default:
				exit( esc_html__( 'Invalid data type.', 'messia' ) );
		}
	}

	/**
	 * Returning data to generate wp_nonce.
	 * Made for ease of use at the front.
	 *
	 * @return array
	 */
	public function get_nonce_data(): array {
		return [
			'field'  => $this->nonce_field_name,
			'action' => $this->nonce_action_name,
		];
	}

	/**
	 * Register RestAPI route.
	 *
	 * @return void
	 */
	public function set_login_address(): void {
		register_rest_route(
			'messia',
			'/oauth/(?P<oauth_type>.+)',
			[
				'methods'             => 'POST',
				'callback'            => [ $this, 'set_methods' ],
				'permission_callback' => null,
				'args'                => [
					'oauth_type' => [
						'default'  => null,
						'required' => true,
					],
				],
			]
		);
		// TODO: Add data validation.
	}

	/**
	 * Register RestAPI route to check if the user is logged in.
	 *
	 * @return void
	 */
	public function is_user_auth(): void {
		register_rest_route(
			'messia',
			'/oauth/is_auth',
			[
				'methods'             => 'POST',
				'callback'            => [ $this, 'is_logged_in' ],
				'permission_callback' => null,
			]
		);
	}

	/**
	 * We return to the front whether the user is logged in or not.
	 *
	 * @param bool $return Logged or not.
	 *
	 * @return bool
	 */
	public function is_logged_in( bool $return = false ): bool {
		$c  = [];
		$re = '/wordpress_logged_in/m';
		foreach ( $_COOKIE as $key => $cookie ) {
			if ( preg_match( $re, $key ) ) {
				if ( false !== $return ) {
					return true;
				}
				die( 'true' );
			}
		}
		if ( false !== $return ) {
			return false;
		}
		die( 'false' );
	}
}
