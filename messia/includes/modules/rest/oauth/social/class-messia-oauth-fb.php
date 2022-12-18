<?php
/**
 * Messia_Rest_API
 *
 * @package Messia\Modules\REST\Authentication\Facebook
 */

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Modules\Rest\OAuth\Social;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use WP_REST_Request;

require_once 'class-messia-social.php';

/**
 * Class Messia_Oauth_Fb.
 *
 * @package Messia\Modules\REST\Authentication\Facebook
 */
class Messia_Oauth_Fb extends Messia_Social {

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Oauth_Fb
	 */
	private static ?Messia_Oauth_Fb $instance = null; // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

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
	 * Messia_Oauth_Fb Constructor
	 *
	 * @return void
	 */
	protected function __construct() {
		parent::__construct();

		$this->client_id     = $this->blog_settings['facebook_app_id'];
		$this->client_secret = $this->blog_settings['facebook_app_secret_key'];

		if ( $this->client_id && $this->client_secret ) {
			$this->redirect_uri = get_site_url() . '/wp-json/messia/facebook';
			add_action( 'rest_api_init', [ $this, 'rest' ] );
		}
	}

	/**
	 * Messia_Oauth_Fb Instance.
	 * Ensures only one instance of Messia_Oauth_Fb is loaded or can be loaded.
	 *
	 * @return Messia_Oauth_Fb Instance
	 */
	public static function instance(): Messia_Oauth_Fb {

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
			'/facebook',
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

		$url    = 'https://www.facebook.com/dialog/oauth';
		$params = [
			'client_id'     => $this->client_id,
			'redirect_uri'  => $this->redirect_uri,
			'response_type' => 'code',
			'scope'         => 'email',
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
				'redirect_uri'  => $this->redirect_uri,
				'client_secret' => $this->client_secret,
				'code'          => $request['code'],
			];

			$url   = 'https://graph.facebook.com/oauth/access_token';
			$token = $this->doing_curl( $url, $params );

			if ( count( $token ) > 0 && isset( $token['access_token'] ) ) {
				$params = [
					'access_token' => $token['access_token'],
					'fields'       => 'id,email,first_name,last_name,picture',
				];

				$user_data = json_decode( wp_remote_get( 'https://graph.facebook.com/me?' . urldecode( http_build_query( $params ) ) ), true );
			} else {
				exit;
			}
			$user_email = $user_data['email'];
			if ( ! $user_email ) {
				$user_email = $user_data['id'] . '@gde-saas.ru';
			}
			$data = [
				'user_email' => $user_email,
				'first_name' => $user_data['first_name'],
				'last_name'  => $user_data['last_name'],
				'user_pic'   => 'http://graph.facebook.com/' . $user_data['id'] . '/picture?type=large"',
			];
			$this->set_user_data( $data );
		}
	}
}
