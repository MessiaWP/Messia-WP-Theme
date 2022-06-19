<?php
/**
 * Messia_Rest_API
 *
 * @package Messia\Modules\REST
 */

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Modules\Rest;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Smartbits\Messia\Includes\Modules\Rest\OAuth\Messia_OAuth;
use Smartbits\Messia\Includes\Modules\Rest\OAuth\Social\{
	Messia_Oauth_Fb,
	Messia_Oauth_Google,
	Messia_Oauth_VK,
	Messia_Oauth_YA,
};

/**
 * Manupulates all API request for user dashboard.
 *
 * @package Messia\Modules\REST
 */
class Messia_Rest_API {

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Rest_API
	 */
	private static ?Messia_Rest_API $instance = null; // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

	/**
	 * Instance of Messia_OAuth
	 *
	 * @var Messia_OAuth
	 */
	private Messia_OAuth $oauth;

	/**
	 * Instance of Messia_Oauth_VK
	 *
	 * @var Messia_Oauth_VK
	 */
	private Messia_Oauth_VK $vk;

	/**
	 * Instance of Messia_Oauth_YA
	 *
	 * @var Messia_Oauth_YA
	 */
	private Messia_Oauth_YA $ya;

	/**
	 * Instance of Messia_Oauth_Google
	 *
	 * @var Messia_Oauth_Google
	 */
	private Messia_Oauth_Google $google;

	/**
	 * Instance of Messia_Oauth_Fb
	 *
	 * @var Messia_Oauth_Fb
	 */
	private Messia_Oauth_Fb $facebook;

	/**
	 * Messia_Rest_API Constructor
	 */
	private function __construct() {

		$this->oauth    = Messia_OAuth::instance();
		$this->vk       = Messia_Oauth_VK::instance();
		$this->ya       = Messia_Oauth_YA::instance();
		$this->google   = Messia_Oauth_Google::instance();
		$this->facebook = Messia_Oauth_Fb::instance();
	}

	/**
	 * Messia_Rest_API Instance.
	 * Ensures only one instance of Messia_Rest_API is loaded or can be loaded.
	 *
	 * @return Messia_Rest_API Instance
	 */
	public static function instance(): Messia_Rest_API {

		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Get an instance of the required class.
	 * Used to simplify the display of social media buttons.
	 *
	 * @param string $method Valid theme property.
	 *
	 * @return object
	 */
	public function get_method( string $method ): object {
		return $this->{$method};
	}
}
