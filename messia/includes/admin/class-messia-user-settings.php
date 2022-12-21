<?php
/**
 * Backend menu configuration.
 *
 * @package wpAdminMenuPage
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Admin;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Smartbits\Messia\Includes\Config\Messia_Config_Settings;
use Smartbits\Messia\Includes\Helpers\Messia_Help;
use Smartbits\Messia\Includes\Config\Messia_Config_Styles;
use WP_Screen;
use Exception;
use DOMDocument;
use DOMXPath;

/**
 * Class provides operations with custom user's setting
 * like fonts, colors, styles, etc..
 *
 * @package wpAdminMenuPage
 */
class Messia_User_Settings {

	/**
	 * Google fonts.
	 *
	 * @var array
	 */
	private static array $google_fonts = [];

	/**
	 * Menu page name.
	 *
	 * @var string
	 */
	private static ?string $menu_page_hook = null; // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

	/**
	 * Triggers to listen for initial required hooks.
	 *
	 * @return void
	 */
	public static function init(): void {

		add_filter( 'before_messia_menu_render', [ __CLASS__, 'inject_args' ] );
		add_filter( 'messia_before_standalone_save_settings', [ __CLASS__, 'validate_standalone_settings' ], 10, 1 );
		add_action( 'messia_standalone_save_settings_success', [ __CLASS__, 'google_fonts_changed' ], 20, 4 );
		add_action( 'messia_standalone_save_settings_success', [ __CLASS__, 'apply_dynamic_styles' ], 30, 4 );
		add_action( 'messia_standalone_save_settings_success', [ __CLASS__, 'root_htaccess_content' ], 40, 4 );

		add_action( 'messia_admin_menu_created', [ __CLASS__, 'on_menu_created' ] );
		add_action( 'current_screen', [ __CLASS__, 'setup_google_fonts' ] );
	}

	/**
	 * Callback for Messia messia_before_standalone_save_settings action.
	 * Validate new values.
	 *
	 * @param array $to_save Incoming settings.
	 *
	 * @return array
	 */
	public static function validate_standalone_settings( array $to_save ): array {

		// Add into header option.
		$add_in_header_allowed_html = [
			'meta',
			'link',
			'title',
			'style',
			'script',
			'noscript',
			'base',
		];

		$to_save['add_in_header'] = strip_tags( $to_save['add_in_header'], $add_in_header_allowed_html );

		$html = $to_save['add_in_header'];
		$doc  = new DOMDocument();

		$doc->loadHTML( "<div>{$html}</div>", LIBXML_HTML_NODEFDTD | LIBXML_HTML_NOIMPLIED | LIBXML_NOBLANKS | LIBXML_NOWARNING | LIBXML_NOERROR );

		$xpath = new DOMXPath( $doc );

		foreach ( $xpath->query( '/div/text()' ) as $node ) {
			if ( empty( $node->nodeValue ) || is_null( $node->nodeValue ) ) { // phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
				continue;
			}
			$to_save['add_in_header'] = str_replace( $node->nodeValue, '', $to_save['add_in_header'] ); // phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
		}

		// PWA option.
		$settings_module = MIA()->get_module( 'settings' );
		$settings        = $settings_module->get_shared_settings( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME, MESSIA_THEME_SITE_SETTINGS_PRESET_NAME );

		$theme_licence = json_decode( $settings['theme_licence_data'], true );

		if ( 'active' !== $theme_licence['licence_status'] ) {
			$licenced_options = Messia_Config_Settings::find_controls_by( [ 'licence' => true ] );

			foreach ( $licenced_options as $licenced_option ) {
				$to_save[ $licenced_option['name'] ] = $licenced_option['init'];
			}
		}

		return $to_save;
	}

	/**
	 * Define whether page reload requires after saving setting.
	 *
	 * @param string $setting_preset The name of preset.
	 * @param array  $to_save        Incoming settings.
	 * @param array  $old_settings   Old data.
	 * @param array  $new_settings   New saved settings.
	 *
	 * @return void
	 */
	public static function google_fonts_changed( string $setting_preset, array $to_save, array $old_settings, array $new_settings ): void {

		if ( $old_settings['google_fonts_api_key'] !== $new_settings['google_fonts_api_key'] && ! is_null( $new_settings['google_fonts_api_key'] ) ) {
			add_filter( 'messia_reload_menu_page', [ __CLASS__, 'reload_action' ], 10 );
			add_filter( 'messia_standalone_save_message_extra_data', [ __CLASS__, 'applying_message' ], 10 );
		}
	}

	/**
	 * Trigger on saving setting.
	 *
	 * @param string $setting_preset The name of preset.
	 * @param array  $to_save        Incoming settings.
	 * @param array  $old_settings   Old data.
	 * @param array  $new_settings   New saved settings.
	 *
	 * @return void
	 */
	public static function apply_dynamic_styles( string $setting_preset, array $to_save, array $old_settings, array $new_settings ): void {
		Messia_Config_Styles::save_styles( $new_settings );
	}

	/**
	 * Trigger on saving setting handle with .htaccess content in root of site.
	 *
	 * @param string $setting_preset The name of preset.
	 * @param array  $to_save        Incoming settings.
	 * @param array  $old_settings   Old data.
	 * @param array  $new_settings   New saved settings.
	 *
	 * @return void
	 */
	public static function root_htaccess_content( string $setting_preset, array $to_save, array $old_settings, array $new_settings ): void {

		$home_path     = get_home_path();
		$htaccess_file = $home_path . '.htaccess';

		/*
		* If the file doesn't already exist check for write access to the directory
		* and whether we have some rules. Else check for write access to the file.
		*/
		if ( ( ! file_exists( $htaccess_file ) && is_writable( $home_path ) ) || is_writable( $htaccess_file ) ) {
			$user_rules = $to_save['custom_root_htaccess_content'];
			$user_rules = array_filter( explode( "\n", $user_rules ) );
			$user_done  = insert_with_markers( $htaccess_file, 'Messia User Rules', $user_rules );

			/**
			 * If demo source was compiled on Multisite env then 'pwa_enable' will be storred
			 * in site meta and may not exist in $to_save.
			 */
			if ( isset( $to_save['pwa_enable'] ) && 1 === $to_save['pwa_enable'] ) {
				$pwa_rules = "<IfModule mod_headers.c>\n\t<FilesMatch 'messia-worker.js|messia-worker.min.js'>\n\t\tHeader set Cache-Control 'max-age=0, no-cache, no-store, must-revalidate'\n\t\tHeader set Pragma 'no-cache'\n\t\tHeader set Service-Worker-Allowed /\n\t</FilesMatch>\n</IfModule>";
				$pwa_done  = insert_with_markers( $htaccess_file, 'Messia PWA Rules', $pwa_rules );
			} else {
				$pwa_done = insert_with_markers( $htaccess_file, 'Messia PWA Rules', null );
			}
		} else {
			add_filter(
				'messia_standalone_save_message_extra_data',
				function( $extra_data ) {
					$extra_data[0]['messia_core'] .= '<br>' . __( 'Fail to save .htaccess custom content. File unwritable.', 'messia' );
					return $extra_data;
				}
			);
		}
	}

	/**
	 * After WP admin page registered
	 *
	 * @param string $menu_page_hook Admin menu page name.
	 *
	 * @return void
	 */
	public static function on_menu_created( string $menu_page_hook ): void {
		self::$menu_page_hook = $menu_page_hook;
	}

	/**
	 * Callback for menu control when control type is callback.
	 * This one just render some HTML data.
	 *
	 * @param array $tab_number Number of tab.
	 *
	 * @return void
	 */
	public static function tab_colontitles( array $tab_number ): void {

		switch ( $tab_number[0] ) {

			case 1:
				?>
					<div class="hb-legenda">
						<label class="fr-error"></label>
						<span><?php esc_html_e( 'Module is deactivated forcibly;', 'messia' ); ?></span>
						<span><?php esc_html_e( '* - Required plugin;', 'messia' ); ?></span>
						<span><?php esc_html_e( '** - Required theme;', 'messia' ); ?></span>
					</div>
				<?php
				break;
		}
	}

	/**
	 * Callback for menu control when control type is callback.
	 * This one just render some HTML data.
	 *
	 * @param array $args Nothing for now.
	 *
	 * @return void
	 */
	public static function menu_item_seo_placeholders( array $args ): void {

		$html         = null;
		$placeholders = MIA()->get_seo_placeholders();

		foreach ( $placeholders as $placeholder => $description ) {
			$html .= "{$placeholder} - {$description['title']}<br>";
		}

		echo "<div style='border-left: 2px solid #d5d5d5; padding-left: 5px;'>{$html}</div>";
	}

	/**
	 * Callback for menu control when control type is callback.
	 * This one render element to define order of object in search rsults.
	 *
	 * @param array  $args          Nothing for now.
	 * @param string $option_name   Menu option name.
	 * @param string $current_value Menu option value.
	 *
	 * @return void
	 */
	public static function objects_search_order( array $args, string $option_name, string $current_value ): void {

		$object_fields = null;
		$placeholder   = __( 'Name of object or slug', 'messia' );

		if ( $current_value ) {
			$current_value_arr = json_decode( $current_value );

			foreach ( $current_value_arr as $object ) {
				$object_fields .= "<div class='object_order'>
										<input type='text' spellcheck='false' placeholder='{$placeholder}' postid='{$object->postid}' value='{$object->title}'>
										<div class='handler remove'></div>
										<div class='handler move'></div>
									  </div>";
			}
		}

		echo "<div class='objects_search_order_fileds'>
				<div class='object_order template'>
					<input type='text' spellcheck='false' placeholder='{$placeholder}'>
					<div class='handler remove'></div>
					<div class='handler move'></div>
				</div>
				{$object_fields}
				<input id='{$option_name}' name='{$option_name}' type='hidden' value='{$current_value}'/>
			</div>";
	}

	/**
	 * Callback for menu control when control type is callback.
	 * This one render element to define site rating criteria.
	 *
	 * @param array  $args          Nothing for now.
	 * @param string $option_name   Menu option name.
	 * @param string $current_value Menu option value.
	 *
	 * @return void
	 */
	public static function site_rating_terms( array $args, string $option_name, string $current_value ): void {

		$criterial_fields = null;
		$placeholder      = __( 'Criteria name', 'messia' );

		if ( $current_value ) {
			$current_value_arr = json_decode( $current_value );

			foreach ( $current_value_arr as $id => $criteria ) {
				$criterial_fields .= "<div class='rating_criteria'>
										<input type='text' spellcheck='false' placeholder='{$placeholder}' id='{$id}' value='{$criteria}'>
										<div class='handler remove'></div>
										<div class='handler move'></div>
									  </div>";
			}
		}

		echo "<div class='rating_fileds'>
				<div class='rating_criteria template'>
					<input type='text' spellcheck='false' placeholder='{$placeholder}'>
					<div class='handler remove'></div>
					<div class='handler move'></div>
				</div>
				{$criterial_fields}
				<input id='{$option_name}' name='{$option_name}' type='hidden' value='{$current_value}'/>
			</div>";
	}

	/**
	 * Callback for menu control when control type is callback.
	 * This one render element to define property groups for filters.
	 *
	 * @param array  $args          Nothing for now.
	 * @param string $option_name   Menu option name.
	 * @param string $current_value Menu option value.
	 *
	 * @return void
	 */
	public static function property_groups( array $args, string $option_name, string $current_value ): void {

		$property_groups  = null;
		$placeholder_name = __( 'Group name', 'messia' );

		if ( $current_value ) {
			$current_value_arr = json_decode( $current_value );

			foreach ( $current_value_arr as $id => $criteria ) {
				$property_groups .= "<div class='property_group'>
										<input data-name='group_name' type='text' spellcheck='false' placeholder='{$placeholder_name}' id='{$id}' value='{$criteria->group_name}'>
										<div class='handler remove'></div>
										<div class='handler move'></div>
									  </div>";
			}
		}

		echo "<div class='groups_fields'>
				<div class='property_group template'>
					<input data-name='group_name' type='text' spellcheck='false' placeholder='{$placeholder_name}'>
					<div class='handler remove'></div>
					<div class='handler move'></div>
				</div>
				{$property_groups}
				<input id='{$option_name}' name='{$option_name}' type='hidden' value='{$current_value}'/>
			</div>";
	}

	/**
	 * Callback for menu control when control type is callback.
	 * This one render element select and save image(s) from media library.
	 *
	 * @param array  $args          Nothing for now.
	 * @param string $option_name   Menu option name.
	 * @param string $current_value Menu option value.
	 *
	 * @return void
	 * @throws Exception If section type is not one of: standalone|network.
	 */
	public static function setting_image( array $args, string $option_name, string $current_value ): void {

		if ( ! isset( $args['type'] ) || ! in_array( $args['type'], [ 'single', 'multiple' ], true ) ) {
			throw new Exception( 'Did not set correct type (or not setted at all) of snippet Images (single or multiple allowed)' );
		}

		$current_value_arr = json_decode( $current_value, false );

		if ( 'single' === $args['type'] ) {

			if ( 0 === count( $current_value_arr ) ) {

				echo "<div class='images'>
						<div class='images-slot'>
							<div class='icon template'>
								<span class='edit-image'></span>
								<span class='placeholder-image'></span>
							</div>
						</div>
						<input id='{$option_name}' name='{$option_name}' type='hidden' value='{$current_value}'/>
					</div>";
			} else {
				$images_html = Messia_Help::get_media_icon_admin( $current_value_arr, false );

				echo "<div class='images'>
						<div class='images-slot'>
							{$images_html}
						</div>
						<input id='{$option_name}' name='{$option_name}' type='hidden' value='{$current_value}'/>
					</div>";
			}
		} elseif ( 'multiple' === $args['type'] ) {

			$images_html = Messia_Help::get_media_icon_admin( $current_value_arr, true );

			echo "<div class='images'>
					<div class='images-slot'>
						{$images_html}
						<div class='icon multiple template'>
							<span class='edit-image'></span>
							<span class='placeholder-image'></span>
						</div>
					</div>
					<input id='{$option_name}' name='{$option_name}' type='hidden' value='{$current_value}'/>
				</div>";
		}
	}

	/**
	 * Communicats with Google fonts api, request fonts and store it into self::$google_fonts.
	 *
	 * @param WP_Screen $current_screen Admin menu page object.
	 *
	 * @return void
	 */
	public static function setup_google_fonts( WP_Screen $current_screen ): void {

		if ( $current_screen->base !== self::$menu_page_hook ) {
			return;
		}

		$blog_settings = MIA()->get_module( 'settings' )->get_blog_setting( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME );

		if ( ! is_null( $blog_settings['google_fonts_api_key'] ) && empty( self::$google_fonts ) ) {

			$response = self::fetch_google_fonts( $blog_settings['google_fonts_api_key'] );

			if ( is_wp_error( $response ) ) {

				$err = $response->get_error_message();

				add_action(
					'admin_notices',
					function() use ( $err ) {

						$err = __( 'Can\'t connect to Google Fonts service -> ', 'messia' ) . '<i>' . $err . '</i>';
						echo "<div class='notice notice-error'><p>{$err}</p></div>";
					}
				);
			} else {

				$code     = wp_remote_retrieve_response_code( $response );
				$response = json_decode( wp_remote_retrieve_body( $response ), true );

				if ( 200 === $code ) {

					self::$google_fonts = $response['items'];
				} else {

					$err = $response['error']['errors'][0]['message'];

					add_action(
						'admin_notices',
						function() use ( $err ) {
							echo '<div class="notice notice-error"><p>' . MESSIA_MESSAGES['gFontsFetchErr'] . ' ' . __( 'Message from Google Fonts service: ', 'messia' ) . '<i>' . $err . '. </i>' . __( 'Only last used font is available. ', 'messia' ) . '</p></div>';
						}
					);
				}
			}
		}
	}

	/**
	 * Add Google fonts parsed from Google API in self::setup_google_fonts() as
	 * args to proper option in menu config to let them later be rendered as select
	 * tags options in self::font_option().
	 *
	 * @param array $menu_args Menu config.
	 *
	 * @return array
	 */
	public static function inject_args( array $menu_args ): array {

		if ( get_current_screen()->base === self::$menu_page_hook ) {

			$font_options_names = [ 'font_body', 'font_h1', 'font_h2', 'font_h3', 'font_h4', 'font_h5', 'font_h6', 'font_nav_menu_main' ];

			foreach ( $menu_args['tabs'] as $index => $tab ) {
				foreach ( $tab['controls'] as $key => $control ) {
					if ( ! isset( $control['name'] ) ) {
						continue;
					}
					if ( in_array( $control['name'], $font_options_names, true ) ) {
						$menu_args['tabs'][ $index ]['controls'][ $key ]['args'][] = self::$google_fonts;
					}
				}
			}
		}
		return $menu_args;
	}

	/**
	 * Callback for menu control when control type is callback.
	 * This one render select tags with google fonts.
	 *
	 * @param array  $args               All Google fonts.
	 * @param string $option_name        Menu option name.
	 * @param string $current_value_json Menu option value with google fonts list in JSON format.
	 *
	 * @return void
	 */
	public static function font_option( array $args, string $option_name, string $current_value_json ) {

		$dictionary = [
			'weights' => [
				100       => __( 'Thin', 'messia' ),
				200       => __( '200', 'messia' ),
				300       => __( 'Light', 'messia' ),
				'regular' => __( 'Regular', 'messia' ),
				500       => __( 'Medium', 'messia' ),
				600       => __( 'Semi-bold', 'messia' ),
				700       => __( 'Bold', 'messia' ),
				800       => __( '800', 'messia' ),
				900       => __( 'Black', 'messia' ),
			],
			'styles'  => [
				'italic' => __( 'Italic', 'messia' ),
			],
		];

		$current_value = json_decode( $current_value_json, true );

		$google  = $args[0];
		$generic = [
			[
				'family'   => 'Arial',
				'category' => 'serif',
				'variants' => [
					'normal' => __( 'Regular', 'messia' ),
					'bold'   => __( 'Bold', 'messia' ),
				],
				'subsets'  => [ 'default' => __( 'Default', 'messia' ) ],
			],
			[
				'family'   => 'Comic Sans MS',
				'category' => 'serif',
				'variants' => [
					'normal' => __( 'Regular', 'messia' ),
					'bold'   => __( 'Bold', 'messia' ),
				],
				'subsets'  => [ 'default' => __( 'Default', 'messia' ) ],
			],
			[
				'family'   => 'Georgia',
				'category' => 'serif',
				'variants' => [
					'normal' => __( 'Regular', 'messia' ),
					'bold'   => __( 'Bold', 'messia' ),
				],
				'subsets'  => [ 'default' => __( 'Default', 'messia' ) ],
			],
			[
				'family'   => 'Lucida Sans Unicode',
				'category' => 'serif',
				'variants' => [
					'normal' => __( 'Regular', 'messia' ),
					'bold'   => __( 'Bold', 'messia' ),
				],
				'subsets'  => [ 'default' => __( 'Default', 'messia' ) ],
			],
			[
				'family'   => 'Symbol',
				'category' => 'serif',
				'variants' => [
					'normal' => __( 'Regular', 'messia' ),
					'bold'   => __( 'Bold', 'messia' ),
				],
				'subsets'  => [ 'default' => __( 'Default', 'messia' ) ],
			],
			[
				'family'   => 'Tahoma',
				'category' => 'serif',
				'variants' => [
					'normal' => __( 'Regular', 'messia' ),
					'bold'   => __( 'Bold', 'messia' ),
				],
				'subsets'  => [ 'default' => __( 'Default', 'messia' ) ],
			],
			[
				'family'   => 'Times New Roman',
				'category' => 'serif',
				'variants' => [
					'normal' => __( 'Regular', 'messia' ),
					'bold'   => __( 'Bold', 'messia' ),
				],
				'subsets'  => [ 'default' => __( 'Default', 'messia' ) ],
			],
			[
				'family'   => 'Trebuchet MS',
				'category' => 'serif',
				'variants' => [
					'normal' => __( 'Regular', 'messia' ),
					'bold'   => __( 'Bold', 'messia' ),
				],
				'subsets'  => [ 'default' => __( 'Default', 'messia' ) ],
			],
			[
				'family'   => 'Verdana',
				'category' => 'serif',
				'variants' => [
					'normal' => __( 'Regular', 'messia' ),
					'bold'   => __( 'Bold', 'messia' ),
				],
				'subsets'  => [ 'default' => __( 'Default', 'messia' ) ],
			],
		];

		$selected_generic = false;
		$selected_google  = false;

		// Font API is wrong, but last saved font was Google font.
		if ( 'google' === $current_value['collection'] && empty( $google ) ) {

			$google = [
				[
					'kind'     => 'webfonts#webfont',
					'family'   => $current_value['family'],
					'category' => $current_value['category'],
					'variants' => [
						$current_value['variant'],
					],
					'subsets'  => [
						$current_value['subset'],
					],
				],
			];
		}

		?>
		<div class="font-option-wrapper" data-data-holder-id="<?php echo $option_name; ?>">
			<div class="font-family-container">
				<span class="font-option-title"><?php esc_html_e( 'Font:', 'messia' ); ?></span>
				<select class="font-option font-family" data-key="family">
					<optgroup label="<?php esc_html_e( 'Generic Fonts:', 'messia' ); ?>" class="generic-fonts" data-collection="websafe">
						<?php
						foreach ( $generic as $key => $generic_font ) {

							$variants = [];
							$category = $generic_font['category'];
							foreach ( $generic_font['variants'] as $value => $name ) {
								$variants[] = [
									'id'   => $value,
									'text' => $name,
								];
							}
							$subsets = [];
							foreach ( $generic_font['subsets'] as $value => $name ) {
								$subsets[] = [
									'id'   => $value,
									'text' => $name,
								];
							}
							?>
							<option value="<?php echo esc_html( $generic_font['family'] ); ?>"<?php echo selected( $generic_font['family'], $current_value['family'] ); ?> data-category='<?php echo $category; ?>' data-variants='<?php echo wp_json_encode( $variants ); ?>' data-subsets='<?php echo wp_json_encode( $subsets ); ?>'><?php echo esc_html( $generic_font['family'] ); ?></option>
							<?php
							if ( 'websafe' === $current_value['collection'] && $generic_font['family'] === $current_value['family'] ) {
								$selected_generic = $generic[ $key ];
							}
						}
						?>
					</optgroup>
					<?php if ( ! empty( $google ) ) { ?>
					<optgroup label="<?php esc_html_e( 'Google Fonts:', 'messia' ); ?>" class="google-fonts" data-collection="google">
						<?php
						foreach ( $google as $key => $google_font ) {

							$variants = [];
							$category = $google_font['category'];
							foreach ( $google_font['variants'] as $value ) {

								$variants[] = [
									'id'   => $value,
									'text' => self::get_font_weight_alias( $dictionary, $value ),
								];
							}
							$subsets = [];
							foreach ( $google_font['subsets'] as $value ) {
								$subsets[] = [
									'id'   => $value,
									'text' => ucfirst( $value ),
								];
							}
							?>
							<option value="<?php echo $google_font['family']; ?>" <?php echo selected( $google_font['family'], $current_value['family'] ); ?> data-category='<?php echo $category; ?>' data-variants='<?php echo wp_json_encode( $variants ); ?>' data-subsets='<?php echo wp_json_encode( $subsets ); ?>'><?php echo $google_font['family']; ?></option>
							<?php
							if ( 'google' === $current_value['collection'] && $google_font['family'] === $current_value['family'] ) {
								$selected_google = $google[ $key ];
							}
						}
						?>
					</optgroup>
					<?php } ?>
				</select>
			</div>
			<div class="font-category-container" style="display: none;">
				<input class="font-option font-category" type="hidden" data-key="category" value="<?php echo $current_value['category']; ?>" />
			</div>
			<div class="font-variant-container">
				<span class="font-option-title"><?php esc_html_e( 'Variant:', 'messia' ); ?></span>
				<select class="font-option font-variant" data-key="variant">
					<?php
					if ( 'websafe' === $current_value['collection'] ) {

						$subsets = [];

						foreach ( $generic_font['subsets'] as $value => $name ) {
							$subsets[] = [
								'id'   => $value,
								'text' => $name,
							];
						}
						foreach ( $selected_generic['variants'] as $variant_value => $variant_name ) {
							?>
							<option value="<?php echo $variant_value; ?>" <?php echo selected( $variant_value, $current_value['variant'] ); ?> data-subsets='<?php echo wp_json_encode( $subsets ); ?>'><?php echo $variant_name; ?></option>
							<?php
						}
					} elseif ( 'google' === $current_value['collection'] && $selected_google ) {

						$subsets = [];

						foreach ( $selected_google['subsets'] as $value ) {
							$subsets[] = [
								'id'   => $value,
								'text' => ucfirst( $value ),
							];
						}
						foreach ( $selected_google['variants'] as $variant ) {
							?>
							<option value="<?php echo $variant; ?>" <?php echo selected( $variant, $current_value['variant'] ); ?> data-subsets='<?php echo wp_json_encode( $subsets ); ?>'><?php echo self::get_font_weight_alias( $dictionary, $variant ); ?></option>
							<?php
						}
					}
					?>
				</select>
			</div>
			<div class="font-subset-container">
				<span class="font-option-title"><?php esc_html_e( 'Subset:', 'messia' ); ?></span>
				<select class="font-option font-subset" data-key="subset">
					<?php
					if ( 'websafe' === $current_value['collection'] ) {
						foreach ( $selected_generic['subsets'] as $subset_value => $subset_name ) {
							?>
							<option value="<?php echo $subset_value; ?>" <?php echo selected( $subset_value, $current_value['subset'] ); ?>><?php echo $subset_name; ?></option>
							<?php
						}
					} elseif ( 'google' === $current_value['collection'] && $selected_google ) {
						foreach ( $selected_google['subsets'] as $subset ) {
							?>
							<option value="<?php echo esc_html( $subset ); ?>" <?php echo selected( $subset, $current_value['subset'] ); ?>><?php echo esc_html( ucfirst( $subset ) ); ?></option>
							<?php
						}
					}
					?>
				</select>
			</div>
			<div class="font-size-container">
				<?php
					$size_val = $current_value['size'];
				?>
				<span class="font-option-title"><?php esc_html_e( 'Size, px:', 'messia' ); ?></span>
				<input class="font-option font-size" type="number" min="0" step="1" value="<?php echo esc_html( $size_val ); ?>" data-key="size">
			</div>
			<div class="font-lineheight-container">
				<?php
					$line_height_val = $current_value['line_height'];
				?>
				<span class="font-option-title"><?php esc_html_e( 'LH*, rate:', 'messia' ); ?></span>
				<input class="font-option line-height" type="number" min="0" step="0.1" value="<?php echo esc_html( $line_height_val ); ?>" data-key="line_height">
			</div>
			<div class="font-color-container">
				<?php
					$color_val = $current_value['color'];
				?>
				<span class="font-option-title"><?php esc_html_e( 'Color:', 'messia' ); ?></span>
				<input type="text" class="font-option color color-picker" value="<?php echo esc_html( $color_val ); ?>" data-key="color">
			</div>
			<input id="<?php echo esc_html( $option_name ); ?>" name="<?php echo esc_html( $option_name ); ?>" class="font-setting-holder" type="hidden" value='<?php echo esc_html( $current_value_json ); ?>'/>
		</div>
		<?php
	}

	/**
	 * Replace google font weight with human readable value from dictionary,
	 * 400 - Regular, 600 -Bold, etc...
	 *
	 * @param array  $dictionary   Search->Replace array.
	 * @param string $google_value Google font weight.
	 *
	 * @return string
	 */
	private static function get_font_weight_alias( array $dictionary, string $google_value ): string {

		$return = null;

		$font_variant = preg_split( '/(?<=\d)(?=[a-z])/i', $google_value );

		if ( isset( $font_variant[0] ) && isset( $dictionary['weights'][ $font_variant[0] ] ) ) {

			$return .= $dictionary['weights'][ $font_variant[0] ];
		}

		if ( isset( $font_variant[1] ) && isset( $dictionary['styles'][ $font_variant[1] ] ) ) {
			$return .= ' ' . $dictionary['styles'][ $font_variant[1] ];
		}
		if ( ! is_null( $return ) ) {
			return $return;
		}
		return ucfirst( $google_value );
	}

	/**
	 * Fetch google fonts remotely.
	 *
	 * @param string $api_key User API key.
	 *
	 * @return array|WP_Error Fonts or error description.
	 */
	private static function fetch_google_fonts( string $api_key ) {

		$url = "https://www.googleapis.com/webfonts/v1/webfonts?prettyPrint=false&sort=alpha&fields=items&key={$api_key}";

		$response = wp_remote_get(
			$url,
			[
				'timeout'     => 30,
				'redirection' => 5,
				'httpversion' => '1.0',
				'user-agent'  => 'Messia/; ' . get_bloginfo( 'url' ),
				'blocking'    => true,
				'headers'     => [
					'Accept'          => '*/*',
					'Accept-Encoding' => 'gzip, deflate',
					'Cache-Control'   => 'no-cache',
					'Connection'      => 'keep-alive',
					'Content-Type'    => 'application/json,text/plain',
					'cache-control'   => 'no-cache',
					'referer'         => get_bloginfo( 'url' ),
				],
			]
		);

		return $response;
	}

	/**
	 * Return true that leads to settings page reload after saving
	 * to make parse google fonts with new API key.
	 *
	 * @param bool $reload True - reload, false - no.
	 *
	 * @return bool
	 */
	public static function reload_action( bool $reload ): bool {
		return true;
	}

	/**
	 * Add notificationto response on succesfull saving setting that page will be reloaded.
	 *
	 * @param array $extra_data Data for frontend to show.
	 *
	 * @return array
	 */
	public static function applying_message( array $extra_data ): array {

		$extra_data[0]['messia_core'] .= ' ' . __( 'Applying...', 'messia' );
		return $extra_data;
	}
}
