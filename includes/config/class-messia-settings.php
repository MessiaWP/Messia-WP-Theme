<?php
/**
 * Messia Settings
 *
 * @package Messia\Config
 */

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Config;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Smartbits\Messia\Includes\Config\Messia_Config_Settings;
use Smartbits\Messia\Includes\Config\Messia_Config_Styles;
use Smartbits\Messia\Includes\Admin\{
	Messia_User_Settings,
	Messia_Menu
};
use Throwable;
use Exception;

/**
 * All theme settings are here.
 *
 * @package Messia\Config
 */
class Messia_Settings {

	/**
	 * Menu settings config.
	 *
	 * @var array
	 */
	private array $settings_args;

	/**
	 * Blog settings.
	 *
	 * @var array
	 */
	private array $setting_blog;

	/**
	 * Site settings.
	 *
	 * @var array
	 */
	private array $setting_site;

	/**
	 * Blog settings by default.
	 *
	 * @var array
	 */
	private array $blog_service_setting;

	/**
	 * Site settings by default.
	 *
	 * @var array
	 */
	private array $site_service_setting;

	/**
	 * Single instance of the class.
	 *
	 * @var Messia_Menu
	 */
	public Messia_Menu $admin_menu;

	/**
	 * Single instance of the class.
	 *
	 * @var Messia_Settings
	 */
	private static ?Messia_Settings $instance = null; // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

	/**
	 * Messia_Settings Constructor.
	 */
	private function __construct() {
		$this->settings();
	}

	/**
	 * Messia_Settings Instance.
	 * Ensures only one instance of Messia_Settings is loaded or can be loaded.
	 *
	 * @return Messia_Settings Instance.
	 */
	public static function instance(): Messia_Settings {

		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Initialize settings.
	 *
	 * @return void
	 */
	private function settings(): void {

		$this->settings_args = Messia_Config_Settings::get_config();

		try {
			$this->initialize_blog_setting();
			$this->initialize_site_setting();
		} catch ( Throwable $e ) {
			trigger_error( 'Fail on theme settings initialisation. This can be if you change content directly in DB and line breaks symbols does not recognized by PHP unserialize fn. Settings reverted to defaults.', E_USER_WARNING ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error
		}

		/**
		 * Fire once admin menu config inited
		 *
		 * @hook messia_settings_init
		 */
		do_action( 'messia_settings_init' );

		$this->admin_menu = Messia_Menu::instance( $this->settings_args );
		$this->invalidate_settings();
	}

	/**
	 * Default blog settings setter.
	 *
	 * @return void
	 */
	private function initialize_blog_setting(): void {

		// BLOG DATA.
		$current_blog_setting = get_option( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME, [] );

		$this->blog_service_setting = $this->settings_args['standalone']['stuff_settings'];

		if ( is_array( $current_blog_setting ) && count( $current_blog_setting ) > 0 ) {
			if ( version_compare( (string) $current_blog_setting['ajax_dispatcher_version'], (string) $this->blog_service_setting['ajax_dispatcher_version'], '<' ) ) {
				// UPGRADE SETTING's PRESET CAN BE DONE HERE.
				$current_blog_setting['ajax_dispatcher_version'] = $this->blog_service_setting['ajax_dispatcher_version'];
			}
			if ( version_compare( (string) $current_blog_setting['version'], (string) $this->blog_service_setting['version'], '<' ) ) {
				// UPGRADE SETTING's PRESET CAN BE DONE HERE.
				$current_blog_setting['version'] = $this->blog_service_setting['version'];

				// UNSET NON-EXISTING OPTIONS.
				// Create default setting array.
				foreach ( $this->settings_args['standalone']['controls'] as $tab ) {
					foreach ( $tab['controls'] as $control ) {
						if ( ! isset( $control['name'] ) ) {
							continue;
						}
						$default_settings[ $control['name'] ] = $control['init'];
					}
				}

				// drop non-used keys.
				$outdated_settings = array_diff_key( $current_blog_setting, $default_settings ); // inculding service settings.
				$outdated_settings = array_diff_key( $outdated_settings, $this->blog_service_setting ); // excluding service settings.

				$current_blog_setting = array_diff_key( $current_blog_setting, $outdated_settings ); // actual keys.
			}
		}

		foreach ( $this->settings_args['standalone']['init_settings'] as $init_name => $init_value ) {
			if ( array_key_exists( $init_name, $current_blog_setting ) ) {
				continue;
			}

			$current_blog_setting[ $init_name ] = $init_value;
		}

		$actual_setting    = wp_parse_args( $current_blog_setting, $this->blog_service_setting );
		$validated_setting = $this->validate_dependences( $actual_setting, 'standalone' );

		$this->setting_blog = $validated_setting['valid'];
		update_option( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME, $this->setting_blog );

		if ( count( $validated_setting['invalid_firstly'] ) > 0 && isset( $actual_setting['slack_module_alert'] ) && ! is_null( $actual_setting['slack_module_alert'] ) ) {
			$this->slack_module_alert_send( $actual_setting['slack_module_alert'], $validated_setting['invalid_firstly'] );
		}
	}

	/**
	 * Default site settings setter.
	 *
	 * @return void
	 */
	private function initialize_site_setting(): void {

		if (
			! is_multisite()
			|| false === is_array( $this->settings_args['network'] )
			|| true === empty( $this->settings_args['network'] )
		) {
			return;
		}

		// SITE DATA.
		$current_site_setting = get_site_option( MESSIA_THEME_SITE_SETTINGS_PRESET_NAME, [] );

		$this->site_service_setting = $this->settings_args['network']['stuff_settings'];

		if ( is_array( $current_site_setting ) && count( $current_site_setting ) > 0 ) {
			if ( version_compare( (string) $current_site_setting['version'], (string) $this->site_service_setting['version'], '<' ) ) {
				// UPGRADE SETTING's PRESET CAN BE DONE HERE.
				$current_site_setting['version'] = $this->site_service_setting['version'];

				// UNSET NON-EXISTING OPTIONS.
				// Create default setting array.
				foreach ( $this->settings_args['network']['controls'] as $tab ) {
					foreach ( $tab['controls'] as $control ) {
						if ( ! isset( $control['name'] ) ) {
							continue;
						}
						$default_settings[ $control['name'] ] = $control['init'];
					}
				}

				// drop non-used keys.
				$outdated_settings = array_diff_key( $current_site_setting, $default_settings ); // inculding service settings.
				$outdated_settings = array_diff_key( $outdated_settings, $this->site_service_setting ); // excluding service settings.

				$current_site_setting = array_diff_key( $current_site_setting, $outdated_settings ); // actual keys.
			}
		}

		foreach ( $this->settings_args['network']['init_settings'] as $init_name => $init_value ) {
			if ( array_key_exists( $init_name, $current_site_setting ) ) {
				continue;
			}

			$current_site_setting[ $init_name ] = $init_value;
		}

		$actual_setting    = wp_parse_args( $current_site_setting, $this->site_service_setting );
		$validated_setting = $this->validate_dependences( $actual_setting, 'network' );

		$this->setting_site = $validated_setting['valid'];
		update_site_option( MESSIA_THEME_SITE_SETTINGS_PRESET_NAME, $this->setting_site );

		if ( 0 === count( $validated_setting['invalid_firstly'] ) && isset( $actual_setting['slack_module_alert'] ) && ! is_null( $actual_setting['slack_module_alert'] ) ) {
			$this->slack_module_alert_send( $actual_setting['slack_module_alert'], $validated_setting['invalid_firstly'] );
		}
	}

	/**
	 * Dynamic getter for options that
	 * are shared between blog and site settings,
	 * depending on running mode (MS/Regular).
	 *
	 * @param string $preset_standalone One of predefined presets name.
	 * @param string $preset_network    One of predefined presets name.
	 *
	 * @return array
	 */
	public function get_shared_settings( string $preset_standalone, string $preset_network ): array {

		if ( is_multisite() ) {
			return $this->get_site_setting( $preset_network );
		}
		return $this->get_blog_setting( $preset_standalone );
	}

	/**
	 * Blog settings getter.
	 *
	 * @param string $preset One of predefined presets name.
	 *
	 * @return array
	 * @throws Exception If preset name unrecognized.
	 */
	public function get_blog_setting( string $preset ): array {

		switch ( $preset ) {

			case MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME:
				return $this->setting_blog;

			default:
				throw new Exception( 'Undefined preset name' );
		}
	}

	/**
	 * Site settings getter.
	 *
	 * @param string $preset One of predefined presets name.
	 *
	 * @return array
	 * @throws Exception If preset name unrecognized.
	 */
	public function get_site_setting( string $preset ): array {

		if ( false === isset( $this->setting_site ) && ! is_multisite() ) {
			throw new Exception( 'Trying to access "setting_site" property forbidden in non-multisite mode.' );
		}

		switch ( $preset ) {

			case MESSIA_THEME_SITE_SETTINGS_PRESET_NAME:
				return $this->setting_site;

			default:
				throw new Exception( 'Undefined preset name' );
		}
	}

	/**
	 * Dynamic setter for options that
	 * are shared between blog and site settings,
	 * depending on running mode (MS/Regular).
	 *
	 * @param string $preset_standalone One of predefined presets name.
	 * @param string $preset_network    One of predefined presets name.
	 * @param array  $new_setting       New settings key=>values.
	 *
	 * @return array
	 */
	public function set_shared_settings( string $preset_standalone, string $preset_network, array $new_setting ): array {

		if ( is_multisite() ) {
			return $this->set_site_setting( $preset_network, $new_setting );
		}
		return $this->set_blog_setting( $preset_standalone, $new_setting );
	}

	/**
	 * Blog settings setter.
	 *
	 * @param string $preset      One of predefined presets name.
	 * @param array  $new_setting Data to update.
	 *
	 * @return array|false New settings or false on fail to update.
	 * @throws Exception If preset name unrecognized.
	 */
	public function set_blog_setting( string $preset, array $new_setting ) {

		/**
		 * Fire before saving blog settings.
		 *
		 * @param array $new_setting Settings to save.
		 *
		 * @hook messia_before_single_settings_preset_save
		 */
		$new_setting = apply_filters( 'messia_before_single_settings_preset_save', $new_setting );

		switch ( $preset ) {
			case MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME:
				$old_setting     = $this->get_blog_setting( $preset );
				$new_setting     = wp_parse_args( $new_setting, $old_setting );
				$actual_settings = $this->blog_service_setting;

				foreach ( $this->settings_args['standalone']['tabs'] as $tab ) {
					foreach ( $tab['controls'] as $control ) {
						if ( ! isset( $control['name'] ) ) {
							continue;
						}
						$actual_settings[ $control['name'] ] = $control['init'];
					}
				}

				// make order in saving settings the same as in config array.
				$new_setting = array_replace( $actual_settings, $new_setting );
				// find non-used keys.
				$outdated_settings = array_diff_key( $new_setting, $actual_settings );
				// drop non-used keys.
				$new_setting = array_diff_key( $new_setting, $outdated_settings );

				try {
					$new_setting = $this->validate_dependences( $new_setting, 'standalone' );
					update_option( $preset, $new_setting['valid'] );
					$this->setting_blog = $new_setting['valid'];

					return $this->setting_blog;
				} catch ( Exception $e ) {
					return false;
				}

				break;

			default:
				throw new Exception( 'Undefined preset name' );
		}
	}

	/**
	 * Site settings setter.
	 *
	 * @param string $preset      One of predefined presets name.
	 * @param array  $new_setting Data to update.
	 *
	 * @return array|false New settings or false on fail to update.
	 * @throws Exception If preset name unrecognized.
	 */
	public function set_site_setting( string $preset, array $new_setting ) {

		/**
		 * Fire before saving site settings.
		 *
		 * @param array $new_setting Settings to save.
		 *
		 * @hook messia_before_network_settings_preset_save
		 */
		$new_setting = apply_filters( 'messia_before_network_settings_preset_save', $new_setting );

		switch ( $preset ) {
			case MESSIA_THEME_SITE_SETTINGS_PRESET_NAME:
				$old_setting     = $this->get_site_setting( $preset );
				$new_setting     = wp_parse_args( $new_setting, $old_setting );
				$actual_settings = $this->site_service_setting;

				foreach ( $this->settings_args['network']['tabs'] as $tab ) {
					foreach ( $tab['controls'] as $control ) {
						if ( ! isset( $control['name'] ) ) {
							continue;
						}
						$actual_settings[ $control['name'] ] = $control['init'];
					}
				}

				// make order in saving settings the same as in config array.
				$new_setting = array_replace( $actual_settings, $new_setting );
				// find non-used keys.
				$outdated_settings = array_diff_key( $new_setting, $actual_settings );
				// drop non-used keys.
				$new_setting = array_diff_key( $new_setting, $outdated_settings );

				try {
					$new_setting = $this->validate_dependences( $new_setting, 'network' );
					update_site_option( $preset, $new_setting['valid'] );
					$this->setting_site = $new_setting['valid'];

					return $this->setting_site;
				} catch ( Exception $e ) {
					return false;
				}
				break;

			default:
				throw new Exception( 'Undefined preset name' );
		}
	}

	/**
	 * Blog settings re-read from DB.
	 *
	 * @param string $preset One of predefined presets name.
	 *
	 * @return void
	 * @throws Exception If preset name unrecognized.
	 */
	public function refresh_blog_setting( string $preset ): void {

		switch ( $preset ) {

			case MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME:
				$this->initialize_blog_setting();

				Messia_Config_Styles::save_styles( $this->get_blog_setting( $preset ) );
				return;

			default:
				throw new Exception( 'Undefined preset name' );
		}
	}

	/**
	 * Site settings re-read from DB.
	 *
	 * @param string $preset One of predefined presets name.
	 *
	 * @return void
	 * @throws Exception If preset name unrecognized.
	 */
	public function refresh_site_setting( $preset ): void {

		switch ( $preset ) {

			case MESSIA_THEME_SITE_SETTINGS_PRESET_NAME:
				$this->initialize_site_setting();

				return;

			default:
				throw new Exception( 'Undefined preset name' );
		}
	}

	/**
	 * Blog settings resetter to default.
	 *
	 * @param string $preset One of predefined presets name.
	 *
	 * @return void
	 * @throws Exception If preset name unrecognized.
	 */
	public function reset_blog_setting( string $preset ): void {

		switch ( $preset ) {

			case MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME:
				delete_option( $preset );
				$this->initialize_blog_setting();

				Messia_Config_Styles::save_styles( $this->get_blog_setting( $preset ) );
				return;

			default:
				throw new Exception( 'Undefined preset name' );
		}
	}

	/**
	 * Site settings resetter to default.
	 *
	 * @param string $preset One of predefined presets name.
	 *
	 * @return void
	 * @throws Exception If preset name unrecognized.
	 */
	public function reset_site_setting( $preset ): void {

		switch ( $preset ) {

			case MESSIA_THEME_SITE_SETTINGS_PRESET_NAME:
				delete_network_option( null, $preset );
				$this->initialize_site_setting();

				return;

			default:
				throw new Exception( 'Undefined preset name' );
		}
	}

	/**
	 * Settings config getter.
	 *
	 * @return array
	 * @throws Exception If preset name unrecognized.
	 */
	public function get_setting_args(): array {

		if ( did_action( 'messia_settings_init' ) ) {
			return $this->settings_args;
		} else {
			throw new Exception( 'The get_setting_args() function is called too early. The function must be called at the time of the "messia_settings_init" event or later' );
		}
	}

	/**
	 * Validate modules dependences and set init values.
	 *
	 * @param array  $current_settings Existing data.
	 * @param string $scope            Data type for (standalone, multisite).
	 *
	 * @return array
	 * @throws Exception If provided unrecognized scope.
	 */
	private function validate_dependences( array $current_settings, string $scope ): array {

		$restricted_firstly = [];
		$restricted_modules = [];

		if ( ! isset( $this->settings_args[ $scope ] ) ) {
			throw new Exception( "There is no such key in the configuration array of settings - {$scope}" );
		}

		foreach ( $this->settings_args[ $scope ]['tabs'] as $tab_title => $tab_content ) {
			foreach ( $tab_content['controls'] as $key => $option ) {

				if ( isset( $option['name'] ) && ! array_key_exists( $option['name'], $current_settings ) ) {
					$current_settings[ $option['name'] ] = $option['init'];
				}

				if ( $this->validate_setting_as_module( $current_settings, $option ) ) {

					if ( ! $this->validate_option( 'plugins', $option ) || ! $this->validate_option( 'theme', $option ) ) {

						$restricted_modules[] = $option['name'];

						if ( 1 === $current_settings[ $option['name'] ] || ! array_key_exists( $option['name'], $current_settings ) ) {
							$restricted_firstly[ $option['name'] ] = $option['title'];

						}

						$this->settings_args[ $scope ]['controls'][ $tab_title ]['controls'][ $key ]['notice']  = [ 'fr-error' ];
						$this->settings_args[ $scope ]['controls'][ $tab_title ]['controls'][ $key ]['disable'] = true;
					}
				}
			}
		}

		foreach ( $restricted_modules as $option_name ) {
			$current_settings[ $option_name ] = 0;
		}
		if ( count( $restricted_firstly ) > 0 ) {
			add_filter( 'messia_standalone_save_message_extra_data', [ $this, 'save_settings_actions' ] );
		}

		return [
			'valid'           => $current_settings,
			'invalid'         => $restricted_modules,
			'invalid_firstly' => $restricted_firstly,
		];
	}

	/**
	 * Check if setting option is module (module depends on theme or(and) pluging).
	 *
	 * @param array $current_settings Existing data.
	 * @param array $option_item      Single option of data.
	 *
	 * @return bool
	 */
	private function validate_setting_as_module( array $current_settings, array $option_item ): bool {

		if (
			'checkbox' === $option_item['type']
			&& (
				( isset( $option_item['theme'] ) && count( $option_item['theme'] ) > 0 )
				||
				( isset( $option_item['plugins'] ) && count( $option_item['plugins'] ) > 0 )
			)
		) {
			return true;
		}
		return false;
	}

	/**
	 * Validate single option dependences.
	 *
	 * @param string $by     Keyword - 'plugins' or 'theme'.
	 * @param array  $option Single option data.
	 *
	 * @return bool
	 */
	private function validate_option( string $by, array $option ): bool {

		switch ( $by ) {

			case 'plugins':
				if ( isset( $option['plugins'] ) ) {

					$plugins_required = $option['plugins'];
					$plugins_active   = get_option( 'active_plugins', [] );

					foreach ( $plugins_required as $index => $plugin_required ) {
						if ( ! is_array( $plugin_required ) ) {
							continue;
						}

						$found_plugins = array_intersect( $plugins_active, $plugin_required );

						if ( count( $found_plugins ) === 0 ) {
							return false;
						}

						unset( $plugins_required[ $index ] );
						$plugins_required = array_merge( $plugins_required, array_values( $found_plugins ) );
					}
					$found_plugins = array_intersect( $plugins_active, $plugins_required );

					if ( count( $found_plugins ) !== count( $plugins_required ) ) {
						return false;
					}
				}
				return true;

			case 'theme':
				if ( isset( $option['theme'] ) ) {

					$theme_required = $option['theme'];
					$theme_active   = wp_get_theme()->Name;

					if ( ! in_array( $theme_active, $theme_required, true ) ) {
						return false;
					}
				}
				return true;

			default:
				return true;
		}
	}

	/**
	 * Post message to slack webhook.
	 *
	 * @param string $url                 Full valid URL for request.
	 * @param array  $deactivated_modules Module names will be inserted into body.
	 *
	 * @return void
	 */
	public function slack_module_alert_send( string $url, array $deactivated_modules ): void {

		$list          = null;
		$site_url      = site_url();
		$menu_page_url = admin_url( add_query_arg( 'page', MESSIA_THEME_MENU_PAGE_SLUG, null ) );

		foreach ( $deactivated_modules as $title ) {
			$list .= "- *{$title}*\n";
		}

		$text = "@here ATTENTION!!! \nSite on {$site_url} reports that next modules were automatically deactivated due to violation of the rules of their dependencies. Reverse activation of modules is possible only manually. Go to the plugin settings page {$menu_page_url}, find out which modules were forcibly disabled, make sure that the plugins and theme necessary for their work are installed and active, and then activate the modules: \n{$list}";

		wp_remote_post(
			$url,
			[
				'timeout'     => 30,
				'redirection' => 5,
				'httpversion' => '2.0',
				'blocking'    => false,
				'headers'     => [
					'Accept: */*',
					'Accept-Encoding: gzip, deflate',
					'Cache-Control: no-cache',
					'Connection: keep-alive',
					'Content-Type: application/json,text/plain',
					'cache-control: no-cache',
				],
				'body'        => wp_json_encode(
					[
						'text'       => $text,
						'link_names' => 1,
					]
				),
				'cookies'     => [],
				'sslverify'   => true,
				'compress'    => true,
				'decompress'  => true,
			]
		);
	}

	/**
	 * Callback on event messia_standalone_save_message_extra_data.
	 *
	 * @param array $extra_data Response for front.
	 *
	 * @return array
	 */
	public function save_settings_actions( array $extra_data ): array {

		if ( count( $extra_data ) > 0 ) {
			$extra_data[0]['statusCode']   = 300;
			$extra_data[0]['messia_core'] .= '<br>' . __( 'Some modules cannot be activated due to violation of dependency rules', 'messia' );
		} else {
			$extra_data[] = [
				'statusCode'  => 300,
				'messia_core' => __( 'Your changes have been saved.', 'messia' ),
			];
		}

		return $extra_data;
	}

	/**
	 * Detect codemirror using and enqueue codemirror script.
	 *
	 * @return void
	 * @throws Exception In case of violations.
	 */
	private function invalidate_settings(): void {
		$flag       = true;
		$codemirror = false;

		foreach ( $this->settings_args as $settings ) {
			if ( ! is_array( $settings ) || ! isset( $settings['tabs'] ) ) {
				continue;
			}

			foreach ( $settings['tabs'] as $tab ) {
				foreach ( $tab['controls'] as $control ) {
					if ( isset( $control['name'] ) ) {
						if ( $flag && isset( $control['class'] ) && in_array( 'messia-codemirror-sticky', $control['class'], true ) ) {
							$codemirror = true;
							$flag       = false;
						}
					}
				}
			}
		}

		if ( $codemirror ) {
			add_action( 'admin_enqueue_scripts', [ $this, 'enable_codemirror' ] );
		}
	}

	/**
	 * Enqueue codemirror script.
	 *
	 * @return void
	 */
	public function enable_codemirror(): void {

		// Enqueue editor.
		$settings = wp_enqueue_code_editor(
			[
				'type'       => 'text/html',
				'codemirror' => [
					'theme'      => 'default messia-sticky',
					'indentUnit' => 2,
					'tabSize'    => 2,
				],
			]
		);

		// Do nothing if CodeMirror is off.
		if ( false === $settings ) {
			return;
		}

		// Initialize.
		wp_add_inline_script(
			'messia-backend', // could be 'code-editor' but we need to depend on 'messia-backend'.
			sprintf(
				'(function ($) {
					$(function () {
					
						messiaVars.codeMirrorSticky = [];
						var t = $(".messia-codemirror-sticky");
						for (var i=0; i < t.length; i++) {
							
							var args = %s;
							args.codemirror.mode = $(t[i]).data("codeLanguage");
							WpCodeMirror = wp.codeEditor.initialize( $(t[i]), args );
							
							WpCodeMirror.codemirror.on( "changes", function( editor, event ){
								editor.getTextArea().value = editor.getValue();
								$(editor.getTextArea()).trigger("change");
							});

							$(t[i]).on("updated", {"codeMirror" : WpCodeMirror.codemirror}, function(e){
								var codeMirror = e.data.codeMirror;
								codeMirror.setValue( $(e.target).val() );
							})
							
							messiaVars.codeMirrorSticky.push(WpCodeMirror.codemirror);
						}
						$.fn.messiaStickyCodeMirror( messiaVars.codeMirrorSticky );
					});
				})(jQuery);',
				wp_json_encode( $settings )
			)
		);
	}
}
