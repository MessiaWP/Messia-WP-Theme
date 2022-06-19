<?php
/**
 * Messia_User_Roles
 *
 * @package Messia\Modules\Users
 */

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Modules\Users;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Custom role creation class.
 *
 * @package Messia\Modules\Users
 */
class Messia_User_Roles {

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_User_Roles
	 */
	private static ?Messia_User_Roles $instance = null; // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

	/**
	 * User role slug.
	 *
	 * @var string
	 */
	private $role_name = 'basic_user';

	/**
	 * Messia_User_Roles Constructor.
	 */
	private function __construct() {
		$this->init_hooks();
	}

	/**
	 * Messia_User_Roles Instance.
	 * Ensures only one instance of Messia_User_Roles is loaded or can be loaded.
	 *
	 * @return Messia_User_Roles Instance
	 */
	public static function instance(): Messia_User_Roles {

		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Required in class WP hooks actions.
	 *
	 * @return void
	 */
	private function init_hooks(): void {
		add_action( 'switch_theme', [ $this, 'deregister_user_roles' ] );
		add_action( 'after_switch_theme', [ $this, 'register_user_roles' ] );
		add_action( 'init', [ $this, 'is_user_can' ] );
	}

	/**
	 * Callback for WP after_switch_theme hook that register user roles.
	 *
	 * @return void
	 */
	public function register_user_roles(): void {

		add_role(
			$this->role_name,
			'Regular user',
			[
				'read'         => false,
				'edit_posts'   => false,
				'upload_files' => false,
			]
		);
	}


	/**
	 * Callback for WP switch_theme action.
	 * Unregister user roles.
	 *
	 * @return void
	 */
	public function deregister_user_roles(): void {
		remove_role( $this->role_name );
	}

	/**
	 * Callback for WP init action.
	 * Check the user's permissions before granting access to the admin panel.
	 * If the user has a custom role, we redirect to the custom personal dashboard.
	 *
	 * @return void
	 */
	public function is_user_can(): void {

		$user  = wp_get_current_user();
		$roles = (array) $user->roles;

		foreach ( $roles as $role ) {
			if ( $role === $this->role_name ) {
				show_admin_bar( false );
				break;
				// wp_redirect(home_url()); // TODO: Make a redirect to custom personal dashboard when it is ready.
			}
		}
	}

	/**
	 * Getter for $this->role_name.
	 *
	 * @return string
	 */
	public function get_role_name(): string {
		return $this->role_name;
	}
}
