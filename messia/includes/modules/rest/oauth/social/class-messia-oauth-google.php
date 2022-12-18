<?php
/**
 * Messia_Rest_API
 *
 * @package Messia\Modules\REST\Authentication\Google
 */

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Modules\Rest\OAuth\Social;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use WP_REST_Request;

require_once 'class-messia-social.php';

/**
 * Class Messia_Oauth_Google.
 *
 * @package Messia\Modules\REST\Authentication\Google
 */
class Messia_Oauth_Google extends Messia_Social {

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Oauth_Google
	 */
	private static ?Messia_Oauth_Google $instance = null; // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

	/**
	 * Client ID
	 *
	 * @var string
	 */
	private string $client_id;

	/**
	 * Secret key
	 *
	 * @var string
	 */
	private string $client_secret;

	/**
	 * URL to redirect to on successful authentication.
	 *
	 * @var string
	 */
	private string $redirect_uri;

	/**
	 * Messia_Oauth_Google Constructor
	 *
	 * @return void
	 */
	protected function __construct() {
		parent::__construct();

		$this->client_id     = $this->blog_settings['google_app_id'];
		$this->client_secret = $this->blog_settings['google_app_secret_key'];

		$this->redirect_uri = get_site_url() . '/wp-json/messia/google';
		add_action( 'rest_api_init', [ $this, 'rest' ] );
	}

	/**
	 * Messia_Oauth_Google Instance.
	 * Ensures only one instance of Messia_Oauth_Google is loaded or can be loaded.
	 *
	 * @return Messia_Oauth_Google Instance
	 */
	public static function instance(): Messia_Oauth_Google {

		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * REST method registrator.
	 *
	 * @return void
	 */
	public function rest(): void {
		register_rest_route(
			'messia',
			'/google',
			[
				'methods'             => 'GET',
				'callback'            => [ $this, 'request' ],
				'permission_callback' => null,
				'args'                => [
					'code' => [
						'default'  => null,
						'required' => true,
					],
				],
			]
		);
	}

	/**
	 * Render button for social networks.
	 *
	 * @return string
	 */
	public function button(): string {
		if ( ! $this->client_id && ! $this->client_secret ) {
			return false;
		}

		$url    = 'https://accounts.google.com/o/oauth2/auth';
		$params = [
			'redirect_uri'  => $this->redirect_uri,
			'response_type' => 'code',
			'client_id'     => $this->client_id,
			'scope'         => 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
		];
		return $url . '?' . urldecode( http_build_query( $params ) );
	}

	/**
	 * Request to the social network server.
	 *
	 * @param WP_REST_Request $request Params for requested data.
	 *
	 * @return void
	 */
	public function request( WP_REST_Request $request ): void {
		if ( MIA()->get_module( 'rest' )->get_method( 'oauth' )->is_logged_in( true ) ) {
			exit( esc_html__( 'You are already logged in.', 'messia' ) );
		}
		if ( isset( $request['code'] ) ) {
			$params = [
				'client_id'     => $this->client_id,
				'client_secret' => $this->client_secret,
				'redirect_uri'  => $this->redirect_uri,
				'grant_type'    => 'authorization_code',
				'code'          => $_GET['code'],
			];

			$url   = 'https://accounts.google.com/o/oauth2/token';
			$token = $this->doing_curl( $url, $params );
			if ( isset( $token['access_token'] ) ) {
				$params['access_token'] = $token['access_token'];
				$user_data              = json_decode( wp_remote_get( 'https://www.googleapis.com/oauth2/v1/userinfo?' . urldecode( http_build_query( $params ) ) ), true );

				$data = [
					'user_email' => $user_data['email'],
					'first_name' => $user_data['first_name'] ? $user_data['first_name'] : '',
					'last_name'  => $user_data['last_name'] ? $user_data['last_name'] : '',
					'user_pic'   => $user_data['picture'] ? $user_data['picture'] : '',
				];
				$this->set_user_data( $data );
			}
		}
	}
}
