<?php
/**
 * Messia_Rest_API
 *
 * @package Messia\Modules\REST\Authentication\VKontakte
 */

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Modules\Rest\OAuth\Social;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use WP_REST_Request;

require_once 'class-messia-social.php';

/**
 * Class Messia_Oauth_VK.
 *
 * @package Messia\Modules\REST\Authentication\VKontakte
 */
class Messia_Oauth_VK extends Messia_Social {

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Oauth_VK
	 */
	private static ?Messia_Oauth_VK $instance = null; // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

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
	 * Messia_Oauth_VK Constructor
	 *
	 * @return void
	 */
	protected function __construct() {
		parent::__construct();

		$this->client_id     = $this->blog_settings['vkontakte_app_id'];
		$this->client_secret = $this->blog_settings['vkontakte_app_secret_key'];

		$this->redirect_uri = get_site_url() . '/wp-json/messia/vk';
		add_action( 'rest_api_init', [ $this, 'rest' ] );
	}

	/**
	 * Messia_Oauth_VK Instance.
	 * Ensures only one instance of Messia_Oauth_VK is loaded or can be loaded.
	 *
	 * @return Messia_Oauth_VK Instance
	 */
	public static function instance(): Messia_Oauth_VK {

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
			'/vk',
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

		$url    = 'http://oauth.vk.com/authorize';
		$params = [
			'client_id'     => $this->client_id,
			'scope'         => 'email',
			'redirect_uri'  => $this->redirect_uri,
			'response_type' => 'code',
			'v'             => '5.52',
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
				'code'          => $request['code'],
				'redirect_uri'  => $this->redirect_uri,
			];
		} else {
			exit;
		}
		$token = json_decode( wp_remote_get( 'https://oauth.vk.com/access_token?' . urldecode( http_build_query( $params ) ) ), true );
		if ( ! $token ) {
			exit( esc_html__( 'An error has occurred', 'messia' ) );
		}
		$user_email = $token['email'];
		if ( isset( $token['access_token'] ) ) {
			$params = [
				'uids'         => $token['user_id'],
				'v'            => '5.52',
				'fields'       => 'first_name,last_name,photo_big',
				'access_token' => $token['access_token'],
			];
		} else {
			exit( esc_html__( 'Missing access token', 'messia' ) );
		}
		$url       = 'https://api.vk.com/method/users.get';
		$user_info = $this->doing_curl( $url, $params );
		if ( ! $user_email ) {
			$user_email = $user_info['uids'] . '@gdesaas.ru';
		}
		$user_data = $user_info['response'][0];
		$data      = [
			'user_email' => $user_email,
			'first_name' => $user_data['first_name'],
			'last_name'  => $user_data['last_name'],
			'user_pic'   => $user_data['photo_big'] ? $user_data['photo_big'] : '',
		];
		$this->set_user_data( $data );
	}
}
