<?php
/**
 * Messia_Rest_API
 *
 * @package Messia\Modules\REST\Authentication\Yandex
 */

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Modules\Rest\OAuth\Social;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use WP_REST_Request;

require_once 'class-messia-social.php';

/**
 * Class Messia_Oauth_YA.
 *
 * @package Messia\Modules\REST\Authentication\Yandex
 */
class Messia_Oauth_YA extends Messia_Social {

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Oauth_YA
	 */
	private static ?Messia_Oauth_YA $instance = null; // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

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
	 * URL to redirect to.
	 *
	 * @var string
	 */
	private string $redirect_uri;

	/**
	 * Messia_Oauth_YA Constructor
	 *
	 * @return void
	 */
	protected function __construct() {
		parent::__construct();

		$this->client_id     = $this->blog_settings['yandex_app_id'];
		$this->client_secret = $this->blog_settings['yandex_app_secret_key'];

		$this->redirect_uri = get_site_url() . '/wp-json/messia/ya';
		add_action( 'rest_api_init', [ $this, 'rest' ] );
	}

	/**
	 * Messia_Oauth_YA Instance.
	 * Ensures only one instance of Messia_Oauth_YA is loaded or can be loaded.
	 *
	 * @return Messia_Oauth_YA Instance
	 */
	public static function instance(): Messia_Oauth_YA {

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
			'/ya',
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

		$url    = 'https://oauth.yandex.ru/authorize';
		$params = [
			'redirect_uri'  => $this->redirect_uri,
			'response_type' => 'code',
			'client_id'     => $this->client_id,
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
		if ( MIA()->get_module_rest()->get_method( 'oauth' )->is_logged_in( true ) ) {
			exit( esc_html__( 'You are already logged in.', 'messia' ) );
		}
		if ( isset( $request['code'] ) ) {
			$params = [
				'grant_type'    => 'authorization_code',
				'code'          => $request['code'],
				'client_id'     => $this->client_id,
				'client_secret' => $this->client_secret,
			];
			$url    = 'https://oauth.yandex.ru/token';
			$token  = $this->doing_curl( $url, $params );
			if ( isset( $token['access_token'] ) ) {
				$params = [
					'format'      => 'json',
					'oauth_token' => $token['access_token'],
				];

				$user_data = json_decode( wp_remote_get( 'https://login.yandex.ru/info?' . urldecode( http_build_query( $params ) ) ), true );
				$data      = [
					'user_email' => $user_data['default_email'],
					'first_name' => ( isset( $user_data['first_name'] ) ) ? $user_data['first_name'] : '',
					'last_name'  => ( isset( $user_data['last_name'] ) ) ? $user_data['last_name'] : '',
					'user_pic'   => 'https://avatars.yandex.net/get-yapic/' . $user_data['default_avatar_id'] . '/islands-200',
				];
				$this->set_user_data( $data );
			}
		}
	}
}
