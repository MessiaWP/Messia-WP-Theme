<?php
/**
 * Micro framework for fast implementation custom menu in backend.
 *
 * @package wpAdminMenuPage
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Admin;

use Smartbits\Messia\Includes\Helpers\Messia_Help;
use WP_Screen;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Smartbits\Messia\Includes\Admin\{
	Messia_User_Settings,
	Messia_Demo,
};
use Smartbits\Messia\Includes\Config\Messia_Config_Styles;

use Throwable;
use Exception;
use ZipArchive;
use stdClass;

/**
 * Class framework for creating admin menu page.
 *
 * @package wpAdminMenuPage
 */
abstract class Messia_Menu_Engine {

	/**
	 * Menu placement type.
	 *
	 * @var string
	 */
	protected string $menu_type;

	/**
	 * Menu config.
	 *
	 * @var array
	 */
	protected array $menu_config;

	/**
	 * Menu page slug
	 *
	 * @var string
	 */
	protected ?string $menu_page_hook = null; // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

	/**
	 * Messia_Menu_Engine Constructor.
	 *
	 * @param string $menu_type   Network or regular.
	 * @param array  $menu_config Static menu configuration.
	 *
	 * @return void
	 */
	protected function __construct( string $menu_type, array $menu_config ) {

		$this->menu_type   = $menu_type;
		$this->menu_config = $menu_config;

		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_child' ], 10 );
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_parent' ], 10 );

		add_action( 'wp_ajax_messia_save_settings', [ $this, 'save_settings' ], 10 );
		add_action( 'wp_ajax_messia_reset_settings', [ $this, 'reset_settings' ], 10 );
		add_action( 'wp_ajax_messia_export_blog', [ $this, 'demo_export' ], 10 );
		add_action( 'wp_ajax_messia_demo_install', [ $this, 'demo_install' ], 10 );
		add_action( 'wp_ajax_messia_demo_get_list', [ $this, 'demo_get_list' ], 10 );
		add_action( 'wp_ajax_messia_demo_add', [ $this, 'demo_add' ], 10 );
		add_action( 'wp_ajax_messia_demo_remove', [ $this, 'demo_remove' ], 10 );
		add_filter( 'admin_body_class', [ $this, 'add_classes' ], 20 );

		add_action( 'admin_head', [ $this, 'admin_head' ], 10 );
		add_action( 'admin_footer', [ $this, 'admin_footer' ], 10 );
		add_action( 'admin_footer_text', [ $this, 'admin_footer_txt' ], 10 );

		if ( 'network' === $menu_type && is_multisite() ) {
			add_action( 'network_admin_menu', [ $this, 'add_theme_network_menu_page' ], 102 );
		} elseif ( 'standalone' === $menu_type ) {
			add_action( 'admin_menu', [ $this, 'add_theme_menu_page' ], 102 );
		}
	}

	/**
	 * Abstract method to let child enqueue it's own scripts
	 * and styles in right way at menu page screen
	 *
	 * @param string $page_hook The name of current screen.
	 *
	 * @return void
	 */
	abstract public function enqueue_child ( string $page_hook): void;

	/**
	 * Abstract method to let child add it's own admin body classes
	 *
	 * @param string $classes The name of current screen.
	 *
	 * @return string
	 */
	abstract public function add_classes( string $classes ): string;

	/**
	 * Abstract method to let child style warning content if required.
	 * If for some reasons admin menu can not be shown at all, then key
	 * 'warning' in menu config shown be setted to some string that will be
	 * passed to method implemetor.
	 *
	 * @param string $warning_msg Text to display.
	 *
	 * @return string
	 */
	abstract protected function page_warning_callback( string $warning_msg ): string;

	/**
	 * Abstract method to let child output help tabs content.
	 *
	 * @param string $page_hook The name of current screen.
	 *
	 * @return void
	 */
	abstract protected function page_content_helptab_callback( string $page_hook ): void;

	/**
	 * Abstract method to let child output help tabs sidebar content.
	 *
	 * @param string $page_hook The name of current screen.
	 *
	 * @return void
	 */
	abstract protected function page_content_helpsidebar_callback( string $page_hook ): void;

	/**
	 * Add WP admin menu item.
	 *
	 * @return void
	 */
	public function add_theme_menu_page(): void {

		if ( wp_doing_ajax() ) {
			return;
		}

		$this->menu_page_hook = add_menu_page(
			$this->menu_config['page_title'],
			$this->menu_config['menu_name'],
			$this->menu_config['capability'],
			$this->menu_config['page_slug'],
			[ $this, 'page_content_callback' ],
			$this->menu_config['dashicons'],
			$this->menu_config['priority']
		);

		/**
		 * Fire after admin menu registered in WP
		 *
		 * @param string $menu_page_hook Reference to page slug
		 * @hook messia_admin_menu_created
		 */
		do_action( 'messia_admin_menu_created', $this->menu_page_hook );
	}

	/**
	 * Add WP network admin menu item.
	 *
	 * @return void
	 */
	public function add_theme_network_menu_page(): void {

		if ( wp_doing_ajax() ) {
			return;
		}

		$this->menu_page_hook = add_menu_page(
			$this->menu_config['page_title'],
			$this->menu_config['menu_name'],
			$this->menu_config['capability'],
			$this->menu_config['page_slug'],
			[ $this, 'page_content_callback' ],
			$this->menu_config['dashicons'],
			$this->menu_config['priority']
		);

		/**
		 * Fire after admin menu registered in WP
		 *
		 * @param string $menu_page_hook Reference to page slug
		 * @hook messia_admin_menu_created
		 */
		do_action( 'messia_admin_menu_created', $this->menu_page_hook );
	}

	/**
	 * Render content for WP admin menu item.
	 *
	 * @return void
	 * @throws Exception If control type to render was not recognized.
	 */
	public function page_content_callback(): void {

		if ( false !== $this->menu_config['warning'] ) {
			?>
				<div class="wrap warning">
					<?php
						echo $this->page_warning_callback( $this->menu_config['warning'] );
					?>
				</div>
			<?php

			return;
		}

		$settings = MIA()->get_module( 'settings' );

		/**
		 * Filters admin menu options array.
		 *
		 * @param string $param Menu config
		 * @hook before_messia_menu_render
		 */
		$this->menu_config = apply_filters( 'before_messia_menu_render', $this->menu_config );

		if ( 'network' === $this->menu_type ) {
			$options = get_site_option( $this->menu_config['setting_preset'], false );
		} elseif ( 'standalone' === $this->menu_type ) {
			$options = get_option( $this->menu_config['setting_preset'], false );
		}

		$shared_options = $settings->get_shared_settings( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME, MESSIA_THEME_SITE_SETTINGS_PRESET_NAME );

		$theme_licence_data   = json_decode( $shared_options['theme_licence_data'], true );
		$theme_licence_status = $theme_licence_data['licence_status'];

		$tabs_data = [
			'active'                => $this->menu_config['active_tab'],
			'actionSave'            => 'messia_save_settings',
			'actionExport'          => 'messia_export_blog',
			'actionDemoInstall'     => 'messia_demo_install',
			'actionDemoGetList'     => 'messia_demo_get_list',
			'actionDemoAdd'         => 'messia_demo_add',
			'actionDemoRemove'      => 'messia_demo_remove',
			'actionReset'           => 'messia_reset_settings',
			'ajaxUrl'               => admin_url( 'admin-ajax.php', 'relative' ),
			'isNetworkAdmin'        => is_network_admin(),
			'menuType'              => $this->menu_type,
			'settingPreset'         => $this->menu_config['setting_preset'],
			'onchangeBtnText'       => __( 'Save changes', 'messia' ),
			'settingFormNonce'      => wp_create_nonce( 'messiaCoreSettingsNonce' ),
			'ajaxError'             => __( 'External error. Please reload page & try again.', 'messia' ),
			'unexpectedErr'         => __( 'Unexpected server response.', 'messia' ),
			'statusBetweenRequests' => __( 'Please wait...', 'messia' ),
			'postMaxSize'           => min(
				$this->return_bytes( ini_get( 'post_max_size' ) ),
				$this->return_bytes( ini_get( 'upload_max_filesize' ) )
			),
			'formDataErr'           => __( 'Your browser does not support `FormData` method, using uploader impossible. Put demo file on server and install it from here later.', 'messia' ),
			'demo'                  => [
				'demoManageDialogTitle' => __( 'Demo packages managment', 'messia' ),
				'confirmDemoInstall'    => __( 'Installation will delete all existing website content and replace it with demo content. In multisite environment, it affects only current website. You will become author and owner of any post and author of non-anonymous comments. All users, their passwords and data will remain unchanged. Continue?', 'messia' ),
				'confirmDemoExport'     => __( 'The result will contain all the website data and can be imported to any Messia website.', 'messia' ),
				'confirmDemoAdd'        => __( 'Selected demo will be uploaded on server. Once done it will be available for installation. Continue?', 'messia' ),
				'confirmDemoRemove'     => __( 'Selected demo will be removed from server. Operation can not be undone. Continue?', 'messia' ),
				'confirmResetSettings'  => __( 'This action will set theme settings to initial (default) values. Do you want to continue?', 'messia' ),
				// Used in JS front.
				'allowedMimeTypes'      => [
					'mimes'   => [
						'application/zip',
						'application/x-zip-compressed',
					],
					// translators: %s placeholder for real file type.
					'warning' => sprintf( __( 'Incorrect file type `%s`.', 'messia' ), '%fileType%' ),
				],
			],
		];

		$html = null;
		?>
			<div class="settings-loader"></div>
			<div class="wrap settings-loading">
				<h2><?php echo $this->menu_config['page_h2']; ?></h2>
				<div
					id="tabs"
					data-general='<?php echo wp_json_encode( $tabs_data ); ?>'
					data-theme-licence-status='<?php echo $theme_licence_status; ?>'
					>
					<ul>
					<?php
					foreach ( $this->menu_config['tabs'] as $content ) {
						?>
						<li><a href="#<?php echo $content['id']; ?>"><?php echo $content['title']; ?></a></li>
						<?php

						$html .= '<div id="' . $content['id'] . '">';
						$html .= $this->render_menu_controls( $content['controls'], $options, $theme_licence_status );
						$html .= '</div>';
					}
					?>
					</ul>
					<?php echo $html; ?>
				</div>
				<div id="actions" class="sticky">
					<input type="submit" id="save" disabled data-init="<?php esc_html_e( 'All saved', 'messia' ); ?>" value="<?php esc_html_e( 'All saved', 'messia' ); ?>"/>
					<?php
					if ( ! is_network_admin() ) {
						?>
						<input type="submit" id="reset-settings" class="active" value="<?php esc_html_e( 'Reset settings', 'messia' ); ?>"/>
						<?php
					}
					if ( defined( 'MESSIA_CREATE_DEMO' ) && true === MESSIA_CREATE_DEMO && ! is_network_admin() ) {
						?>
						<input type="submit" id="create-demo" class="active" value="<?php esc_html_e( 'Export Demo', 'messia' ); ?>"/>
						<?php
					}
					if ( ! is_network_admin() ) {
						?>
						<input type="submit" id="install-demo" class="active" value="<?php esc_html_e( 'Import Demo', 'messia' ); ?>"/>
						<?php
					}
					?>
				</div>
			</div>
		<?php
	}

	/**
	 * Prepare hole menu HTML content.
	 *
	 * @param array  $controls             Elements to render.
	 * @param array  $options              Current value.
	 * @param string $theme_licence_status Current status.
	 *
	 * @return string HTML
	 * @throws Exception If menu element in config has invalid type.
	 */
	private function render_menu_controls( array $controls, array $options, string $theme_licence_status ): string {

		$html           = null;
		$section_opened = false;

		foreach ( $controls as $key => $control ) {

			if ( isset( $control['id'] ) ) {
				if ( ! empty( $control['id'] ) ) {
					$id = "id='{$control['id']}'";
				} else {
					$id = null;
				}
			} else {
				$id = null;
			}

			$control_icon = ( isset( $control['control_svg'] ) && 'section' !== $control['type'] ) ? "<span class='control-icon'>{$control['control_svg']}</span>" : null;
			$title_class  = $this->extract_notices( [ 'title' ], $control );

			if ( isset( $control['class'] ) ) {

				$class = 'class="' . implode( ' ', $control['class'] ) . '"';
			} else {
				$class = '';
			}

			if ( isset( $control['data'] ) && is_array( $control['data'] ) ) {
				$data_html = [];
				foreach ( $control['data'] as $data_name => $data_value ) {
					$data_value  = is_bool( $data_value ) ? wp_json_encode( $data_value ) : $data_value; // bool to "bool".
					$data_html[] = 'data-' . $data_name . '="' . $data_value . '"';
				}
				$data_html = implode( ' ', $data_html );
			} else {
				$data_html = '';
			}

			$tip = null;

			if ( isset( $control['tip'] ) ) {
				( is_callable( $control['tip'] ) ) ? $tip = call_user_func( $control['tip'] ) : $tip = $control['tip'];
			}

			switch ( $control['type'] ) {

				case 'section':
					$section_opened = true;

					$html .= "<div class='section'>{$control_icon}<span class='{$title_class}'>{$control['title']}</span></div>
								<div class='section-content-wrapper collapsed'><div class='section-content-holder'><div class='section-content'>";
								// will be closed below.
					break;

				case 'checkbox':
					$disabled = disabled( $control['disable'] || ( isset( $control['licence'] ) && true === $control['licence'] && 'inactive' === $theme_licence_status ), true, false );
					$value    = $this->get_value( 'checkbox', $options, $control['name'] );

					$element = "<div class='label'>
									<input {$id} {$data_html} {$class} name='{$control['name']}' type='checkbox' {$disabled} {$value} />
									{$control['descr']}
									<p class='tip'>{$tip}</p>
								</div>";

					$html .= "<div class='control'>{$control_icon}
								<span class='{$title_class}'>{$control['title']}</span>
								{$element}
							</div>";
					break;

				case 'button':
					$disabled = disabled( $control['disable'], true, false );
					$value    = $control['value'];

					$element = "<div>
									<button {$id} {$data_html} {$class} name='{$control['name']} {$disabled}>{$value}</button>
									<p class='tip'>{$tip}</p>
								</div>";

					$html .= "<div class='control'>{$control_icon}
								<span class='{$title_class}'>{$control['title']}</span>
								{$element}
							</div>";
					break;

				case 'text':
					$disabled = disabled( $control['disable'], true, false );
					$value    = $this->get_value( 'text', $options, $control['name'] );

					$element = "<div class='label'>
									<input {$id} {$data_html} {$class} name='{$control['name']}' {$disabled} type='text' spellcheck='false' placeholder='{$control['placeholder']}' {$value} />
									<p class='tip'>{$tip}</p>
								</div>";

					$html .= "<div class='control'>{$control_icon}
								<span class='{$title_class}'>{$control['title']}</span>
								{$element}
							</div>";
					break;

				case 'number':
					$disabled = disabled( $control['disable'], true, false );
					$value    = $this->get_value( 'text', $options, $control['name'] );

					$element = "<div class='label'>
									<input {$id} {$data_html} {$class} name='{$control['name']} {$disabled} min='{$control['min']} max='{$control['max']} step='{$control['step']} type='number' placeholder='{$control['placeholder']}' {$value}/>
									<p class='tip'>{$tip}</p>
								</div>";

					$html .= "<div class='control'>{$control_icon}
								<span class='{$title_class}'>{$control['title']}</span>
								{$element}
							</div>";
					break;

				case 'hidden':
					$value = $this->get_value( 'hidden', $options, $control['name'] );

					$element = "<input {$id} {$data_html} {$class} name='{$control['name']} type='hidden' {$value}/>";

					$html .= "<div class='control hidden'>
								{$element}
							</div>";
					break;

				case 'textarea':
					$disabled = disabled( $control['disable'], true, false );
					$value    = $this->get_value( 'textarea', $options, $control['name'] );

					$element = "<div class='label'>
									<textarea {$id} {$data_html} {$class} name='{$control['name']}' {$disabled} type='textarea' spellcheck='false' placeholder='{$control['placeholder']}'>{$value}</textarea>
									<p class='tip'>{$tip}</p>
								</div>";

					$html .= "<div class='control'>{$control_icon}
								<span class='{$title_class}'>{$control['title']}</span>
								{$element}
							</div>";
					break;

				case 'select':
					if ( true === $control['select_multi'] ) {
						$disabled = disabled( $control['disable'], true, false );
						$value    = $this->get_multi_select_value( $options, $control['name'], $control['options'], $control['default'] );

						$element = "<div class='label'>
										'<select {$id} {$data_html} {$class} multiple data-placeholder='{$control['placeholder']}'name='{$control['name']}'>{$value}</select>
										<p class='tip'>{$tip}</p>
									</div>";

						$html .= "<div class='control'>{$control_icon}
									<span class='{$title_class}'>{$control['title']}</span>
									{$element}
								</div>";
					} else {
						$disabled = disabled( $control['disable'], true, false );
						$value    = $this->get_select_value( $options, $control['name'], $control['options'], $control['default'] );

						$element = "<div class='label'>
										<select {$id} {$data_html} {$class} name='{$control['name']}'>{$value}</select>
										<p class='tip'>{$tip}</p>
									</div>";

						$html .= "<div class='control'>{$control_icon}
									<span class='title'>{$control['title']}</span>
									{$element}
								</div>";
					}
					break;

				case 'radio':
					$i        = 1;
					$radios   = null;
					$disabled = disabled( $control['disable'], true, false );

					foreach ( $control['radios'] as $index => $radio ) {
						( ! empty( $control['id'] ) ) ? $rid = "{$control['id']}-{$i}" : null;

						$value   = $this->get_radio_value( $options, $control['name'], $radio['value'] );
						$radios .= "<input id={$rid} {$data_html} {$class} name='{$control['name']}' type='radio' {$disabled} {$value} value='{$radio['value']}'/>
									{$control['descr']}
									<label for='{$rid}'>{$radio['title']}</label>";
						++$i;
					}

					$element = "<div class='label'>
									{$radios}
									<p class='tip'>{$tip}</p>
								</div>";

					$html .= "<div class='control'>
								{$control_icon}
								<span class='{$title_class}'>{$control['title']}</span>
								{$element}
							</div>";
					break;

				case 'callback':
					ob_start();
					if ( isset( $control['name'] ) ) {
						?>
						<div class="callback-inner">
							<?php echo call_user_func( $control['callable'], $control['args'], $control['name'], $this->get_value( 'callback', $options, $control['name'] ) ); ?>
						</div>
						<p class="tip"><?php echo $tip; ?></p>
						<?php
					} else {
						?>
						<div class="callback-inner">
							<?php echo call_user_func( $control['callable'], $control['args'] ); ?>
						</div>
						<p class="tip"><?php echo $tip; ?></p>
						<?php
					}

					$callback_html = ob_get_clean();
					$title         = null;

					$element = "<div class='label callback'>
									{$callback_html}
								</div>";

					if ( isset( $control['title'] ) ) {
						$title = '<span class="title">' . $control['title'] . '</span>';
					}

					$html .= "<div class='control'>{$control_icon}
								{$title}
								{$element}
							</div>";
					break;

				default:
					throw new Exception( "Unknown field type '{$control['type']}' of the menu settings." );
			}

			if ( isset( $controls[ $key + 1 ] ) && 'section' === $controls[ $key + 1 ]['type'] ) {
				$html .= '</div></div></div>'; // Close section.
			}
			if ( ! isset( $controls[ $key + 1 ] ) && $section_opened ) {
				$html .= '</div></div></div>'; // Close section.
			}
		}

		return $html;
	}

	/**
	 * Enqueue scripts and styles in right way at menu page screen.
	 *
	 * @param string $page_hook The name of current screen.
	 *
	 * @return void
	 */
	public function enqueue_parent( string $page_hook ): void {

		global $wp_scripts;

		$current_screen = get_current_screen();

		$blog_settings = MIA()->get_module( 'settings' )->get_blog_setting( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME );

		$object_data = [
			'namespaceFront'       => MESSIA_NAMESPACE_FRONT,
			'namespaceAdmin'       => MESSIA_NAMESPACE_ADMIN,
			'AJAX_Marker'          => 'MessiaAjax',
			'ajaxUrl'              => admin_url( 'admin-ajax.php', 'relative' ),
			'messiaNonce'          => wp_create_nonce( 'messiaBackendAjax' ),
			'reservedTerms'        => MIA()->get_reserved_terms(),
			'defaultSegmentTermId' => MIA()->get_default_segment_term()->term_id,
			'mediaFrame'           => [
				'model'     => false,
				'iconFonts' => $this->resolve_media_icon_fonts_mode( $page_hook, $current_screen ),
				'wowEffect' => false,
			],
			'messages'             => MESSIA_MESSAGES,
			'themeUrl'             => MESSIA_THEME_URL,
			'pwaEnable'            => $blog_settings['pwa_enable'],
			'workerUrl'            => $wp_scripts->registered['messia-worker']->src,
		];

		wp_add_inline_script( 'messia-backend', 'const messiaVars = ' . wp_json_encode( $object_data ) . ';', 'before' );
		wp_enqueue_script( 'messia-backend' );

		/* STYLES */
		wp_enqueue_style( 'messia-backend' );

		add_action(
			'admin_print_styles-' . $this->menu_page_hook,
			function () {
				wp_enqueue_style( 'messia-menu-page' );
			},
			10,
			1
		);

		/* SCRIPTS */
		add_action(
			'admin_print_scripts-' . $this->menu_page_hook,
			function () {
				wp_enqueue_script( 'messia-menu-page' );
			},
			10,
			1
		);

		switch ( $page_hook ) {

			case 'widgets.php':
				wp_enqueue_script( 'messia-widgets-constructor-fields' );
				wp_enqueue_script( 'messia-widget-tabs-panel' );
				wp_enqueue_script( 'messia-widgets-filters' );
				wp_enqueue_style( 'messia-widgets' );
				break;

			case 'term.php':
			case 'edit-tags.php':
				if ( 'messia_object' === $current_screen->post_type ) {
					wp_enqueue_media();

					wp_enqueue_script( 'messia-term-edit' );
					wp_enqueue_style( 'messia-term-edit' );
				}
				break;

			case 'comment.php':
				wp_enqueue_script( 'messia-post-edit' );
				wp_enqueue_style( 'messia-post-edit' );
				break;

			case 'post.php':
			case 'post-new.php':
				if ( 'messia_object' === $current_screen->post_type || 'page' === $current_screen->post_type ) {
					wp_enqueue_media();

					wp_enqueue_script( 'messia-post-edit' );
					wp_enqueue_style( 'messia-post-edit' );
				}
				break;

			case 'edit.php':
				if ( 'messia_object' === $current_screen->post_type || 'page' === $current_screen->post_type ) {
					wp_enqueue_script( 'messia-post-list' );
					wp_enqueue_style( 'messia-post-list' );
				}
				break;
		}
	}

	/**
	 * Detect curent page type and set "iconFonts" var for JS to show
	 * or hide icon fonts selector in WP media frame.
	 *
	 * @param string    $page_hook      WP page hook.
	 * @param WP_Screen $current_screen WP current screen.
	 *
	 * @return bool
	 */
	private function resolve_media_icon_fonts_mode( string $page_hook, WP_Screen $current_screen ): bool {

		$icon_fonts      = false;
		$settings_module = MIA()->get_module( 'settings' );
		$blog_settings   = $settings_module->get_blog_setting( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME );

		if ( 0 === $blog_settings['use_google_meterial_icons'] ) {
			return $icon_fonts;
		}

		switch ( $page_hook ) {

			case 'term.php':
			case 'edit-tags.php':
				if ( 'messia_object' === $current_screen->post_type ) {
					$icon_fonts = true;
				}
				break;

			case 'post.php':
			case 'post-new.php':
				if ( 'messia_object' === $current_screen->post_type || 'page' === $current_screen->post_type ) {
					$icon_fonts = false;
				}
				break;
		}
		return $icon_fonts;
	}

	/**
	 * Get HTML data for current value for control element.
	 *
	 * @param string $control_type Valid control type from config array.
	 * @param array  $options      Current saved set of options to search in.
	 * @param string $name         Menu option name to search.
	 *
	 * @return null|string
	 */
	private function get_value( string $control_type, array $options, string $name ) {

		switch ( $control_type ) {

			case 'text':
				if ( array_key_exists( $name, $options ) ) {
					return 'value="' . $options[ $name ] . '"';
				}
				break;

			case 'textarea':
				if ( array_key_exists( $name, $options ) ) {
					return wp_unslash( $options[ $name ] );
				}
				break;

			case 'checkbox':
				if ( array_key_exists( $name, $options ) && 1 === $options[ $name ] ) {
					return 'checked="checked"';
				}
				break;

			case 'hidden':
				if ( array_key_exists( $name, $options ) ) {
					return 'value="' . $options[ $name ] . '"';
				}
				break;

			case 'callback':
				if ( array_key_exists( $name, $options ) ) {
					return $options[ $name ];
				}
				break;
		}
	}

	/**
	 * Get HTML data for current value for radio element.
	 *
	 * @param array  $options Current saved set of options to search in.
	 * @param string $name    Menu option name to search.
	 * @param string $radios  Radio item option value.
	 *
	 * @return null|string
	 */
	private function get_radio_value( array $options, string $name, string $radios ) {

		if ( array_key_exists( $name, $options ) && $options[ $name ] === $radios ) {
			return 'checked="checked"';
		}
	}

	/**
	 * Get HTML data for current value for select element.
	 *
	 * @param array  $options        Current saved set of options to search in.
	 * @param string $name           Menu option name to search.
	 * @param array  $select_options Select tag Options.
	 * @param array  $select_default Preselected tag option if no selected value yet exists.
	 *
	 * @return string
	 */
	private function get_select_value( array $options, string $name, array $select_options, array $select_default ): string {

		$html = null;

		if ( ! empty( $select_default ) ) {
			$html = '<option value="' . key( $select_default ) . '">' . $select_default[ key( $select_default ) ] . '</option>';
		}

		if ( $options ) {

			if ( array_key_exists( $name, $options ) ) {

				foreach ( $select_options as $key => $value ) {

					$html .= '<option value="' . esc_attr( $key ) . '" ' . selected( $options[ $name ], $key, false ) . '>' . esc_html( $value ) . '</option>';
				}
			} else {

				foreach ( $select_options as $key => $value ) {

					$html .= '<option value="' . esc_attr( $key ) . '">' . esc_html( $value ) . '</option>';
				}
			}
		} else {

			foreach ( $select_options as $key => $value ) {

				$html .= '<option value="' . esc_attr( $key ) . '">' . esc_html( $value ) . '</option>';
			}
		}

		return $html;
	}

	/**
	 * Get HTML data for current value for multi select element.
	 *
	 * @param array  $options         Current saved set of options to search in.
	 * @param string $name            Menu option name to search.
	 * @param array  $select_options  Select tag options.
	 * @param array  $select_defaults Preselected tag options if no selected value yet exists.
	 *
	 * @return string
	 */
	private function get_multi_select_value( array $options, string $name, array $select_options, array $select_defaults ): string {

		$html = null;

		if ( ! empty( $select_defaults ) ) {
			$select_options = array_merge( $select_defaults, $select_options );
		}

		if ( $options ) {

			if ( array_key_exists( $name, $options ) ) {

				foreach ( $select_options as $key => $value ) {

					/* multiselect */
					if ( is_array( $options[ $name ] ) ) {

						if ( 'optgroup' === $value ) {
							$html .= '<optgroup label="' . $key . '">';
							continue;
						}

						$selected = '';

						foreach ( $options[ $name ] as $multi_value ) {

							if ( $multi_value === $key ) {
								$selected = selected( $multi_value, $key, false );
								break;
							}
						}

						$html .= '<option value="' . esc_attr( $key ) . '" ' . $selected . disabled( preg_match( '/\*/', esc_attr( $value ), $matches, 0, 0 ), 1, false ) . '>' . esc_html( $value ) . '</option>';
					} /* select */ else {

						$html .= '<option value="' . esc_attr( $key ) . '" ' . selected( $options[ $name ], $key, false ) . '>' . esc_html( $value ) . '</option>';
					}
				}
			} else {

				foreach ( $select_options as $key => $value ) {

					$html .= '<option value="' . esc_attr( $key ) . '">' . esc_html( $value ) . '</option>';
				}
			}
		} else {

			foreach ( $select_options as $key => $value ) {

				$html .= '<option value="' . esc_attr( $key ) . '">' . esc_html( $value ) . '</option>';
			}
		}

		return $html;
	}

	/**
	 * Hook to WP Admin head.
	 *
	 * @return void
	 */
	public function admin_head(): void {
		?>
		<script type="text/javascript">
			document.addEventListener('load', (event) => {
				document.querySelector('#wpbody-content .settings-loader').remove();
				document.querySelector('.wrap.settings-loading').classList.remove('settings-loading');
			});
		</script>
		<?php
	}

	/**
	 * Hook to WP Admin footer.
	 *
	 * @return void
	 */
	public function admin_footer(): void {
		$this->modal_warning();

		if ( $GLOBALS['hook_suffix'] === $this->menu_page_hook ) {

			echo '<audio preload="auto" class="menu-beep" id="sound-01">
					<source src="' . MESSIA_THEME_URL . '/includes/assets/audio/sound-01.mp3">
					<source src="' . MESSIA_THEME_URL . '/includes/assets/audio/sound-01.wav">
				 </audio>';
		}
	}

	/**
	 * Hook to WP Admin footer text, adds Messia title.
	 *
	 * @return void
	 */
	public function admin_footer_txt(): void {
		$text = ( __( 'Messia', 'messia' ) );
		echo "<span id='footer-thankyou'>{$text}</span>";
	}

	/**
	 * Render universal HTML container for modal popup.
	 *
	 * @return void
	 */
	public function modal_warning(): void {

		$title    = __( 'Messia reports', 'messia' );
		$settings = wp_json_encode(
			[
				'button_Text' => __( 'Close', 'messia' ),
			]
		);

		echo "<div id='messia_modal_warning' title='{$title}' style='display: none;' data-settings='{$settings}'></div>";
	}

	/**
	 * Save all settings values to DB.
	 *
	 * @return void
	 */
	public function save_settings(): void {

		if ( check_ajax_referer( 'messiaCoreSettingsNonce', 'messiaNonce', false ) ) {

			if ( isset( $_POST['data']['menu_type'] ) && isset( $_POST['data']['preset'] ) && is_array( $_POST['data']['settings'] ) ) {

				$_POST['data']['settings']                  = apply_filters( "messia_before_{$_POST['data']['menu_type']}_save_settings", $_POST['data']['settings'] );
				$_POST['data']['settings']['last_modified'] = time();

				$settings_module = MIA()->get_module( 'settings' );

				foreach ( $_POST['data']['settings'] as &$setting ) {
					$setting = $this->normalize_types( $setting );
				}

				if ( 'network' === $_POST['data']['menu_type'] ) {

					$existed = $settings_module->get_site_setting( $this->menu_config['setting_preset'] );
					$updated = $settings_module->set_site_setting( $this->menu_config['setting_preset'], $_POST['data']['settings'] );

				} elseif ( 'standalone' === $_POST['data']['menu_type'] ) {

					$existed = $settings_module->get_blog_setting( $this->menu_config['setting_preset'] );
					$updated = $settings_module->set_blog_setting( $this->menu_config['setting_preset'], $_POST['data']['settings'] );
				}

				if ( false === $updated ) {

					/**
					 * Fire on fail to save menu data.
					 *
					 * @param string $setting_preset messia_blog_settings_preset or messia_site_settings_preset.
					 * @param array  $_POST['data']['settings'] Incoming settings.
					 *
					 * @hook messia_{preset_name}_save_settings_error - standalone or network.
					 */
					do_action( "messia_{$_POST['data']['menu_type']}_save_settings_error", $this->menu_config['setting_preset'], $_POST['data']['settings'] );
					wp_send_json_success(
						[
							'code'     => 400,
							'btn_text' => __( 'Save error. Please try again', 'messia' ),
						]
					);
				} else {

					/**
					 * Fire after successfull save menu data.
					 *
					 * @param string $setting_preset messia_blog_settings_preset or messia_site_settings_preset.
					 * @param array  $_POST['data']['settings'] Incoming settings.
					 * @param array  $existed Previous settings.
					 * @param array  $updated New settings.
					 *
					 * @hook messia_{preset_name}_save_settings_error - standalone or network.
					 */
					do_action( "messia_{$_POST['data']['menu_type']}_save_settings_success", $this->menu_config['setting_preset'], $_POST['data']['settings'], $existed, $updated );
					wp_send_json_success(
						[
							'code'       => 200,
							'btn_text'   => __( 'Changes saved', 'messia' ),
							'new_preset' => $updated,

							/**
							 * Fire after successfull save menu data.
							 *
							 * @hook messia_reload_menu_page - reload or no page after saved settings.
							 */
							'reload'     => apply_filters( 'messia_reload_menu_page', false ),

							/**
							 * Fire after successfull save menu data.
							 *
							 * @param array $extra_data Data to add to response.
							 * @hook messia_{preset_name}_save_message_extra_data - standalone or network.
							 */
							'extra_data' => apply_filters( "messia_{$_POST['data']['menu_type']}_save_message_extra_data", [] ),
						]
					);
				}
			} else {

				wp_send_json_success(
					[
						'code'     => 400,
						'btn_text' => __( 'Data is corrupted', 'messia' ),
					]
				);
			}
		} else {

			wp_send_json_error(
				[
					'code'     => 403,
					'btn_text' => __( 'Access violation - reload the page and try again', 'messia' ),
				]
			);
		}
	}

	/**
	 * Reset all settings to default value setted in config.
	 *
	 * @return void
	 */
	public function reset_settings(): void {

		if ( check_ajax_referer( 'messiaCoreSettingsNonce', 'messiaNonce', false ) ) {

			if ( ! current_user_can( 'manage_options' ) ) {
				wp_send_json_error(
					[
						'code'     => 400,
						'btn_text' => __( 'Forbidden', 'messia' ),
						'msg'      => __( 'Sorry, only Administrator can reset settings.', 'messia' ),
					]
				);
			}

			if ( 'network' === $_POST['data']['menu_type'] ) {
				MIA()->get_module( 'settings' )->reset_site_setting( $this->menu_config['setting_preset'] );

			} elseif ( 'standalone' === $_POST['data']['menu_type'] ) {
				MIA()->get_module( 'settings' )->reset_blog_setting( $this->menu_config['setting_preset'] );
			}

			wp_send_json_success(
				[
					'code'     => 200,
					'btn_text' => __( 'Reloading...', 'messia' ),
					'msg'      => __( 'Settings dropped to defaults. Applying...', 'messia' ),
					'reload'   => true,
				]
			);

		} else {

			wp_send_json_error(
				[
					'code'     => 403,
					'btn_text' => __( 'Access violation - reload the page and try again', 'messia' ),
				]
			);
		}
	}

	/**
	 * Make full DB dump with media files to separate file.
	 *
	 * @return void
	 */
	public function demo_export(): void {

		if ( check_ajax_referer( 'messiaCoreSettingsNonce', 'messiaNonce', false ) ) {

			if ( ! current_user_can( 'manage_options' ) ) {
				wp_send_json_error(
					[
						'code' => 400,
						'msg'  => __( 'Sorry, only Administrator can export demo.', 'messia' ),
					]
				);
			}

			$demo = new Messia_Demo();

			try {

				$demo->dump_db( MESSIA_THEME_ABSPATH . 'data/templates' );

				wp_send_json_success(
					[
						'code'     => 200,
						'btn_text' => __( 'Export again', 'messia' ),
						'msg'      => __( 'Website database is successfully exported.', 'messia' ),
					]
				);

			} catch ( Throwable $e ) {

				wp_send_json_success(
					[
						'code'     => 400,
						'btn_text' => __( 'Try export again', 'messia' ),
						// translators: %s - php error message text.
						'msg'      => sprintf( esc_html__( 'Export failed with error(s): %s', 'messia' ), $e->getMessage() ),
					]
				);

			}
		} else {

			wp_send_json_error(
				[
					'code'     => 403,
					'btn_text' => __( 'Access violation - reload the page and try again.', 'messia' ),
				]
			);
		}
	}

	/**
	 * Reset site content to data from dump (also with media files).
	 *
	 * @return void
	 */
	public function demo_install(): void {

		if ( check_ajax_referer( 'messiaCoreSettingsNonce', 'messiaNonce', false ) ) {

			if ( ! current_user_can( 'manage_options' ) ) {
				wp_send_json_error(
					[
						'code' => 500,
						'msg'  => __( 'Sorry, only Administrator can install demo.', 'messia' ),
					]
				);
			}

			$demo = new Messia_Demo();

			try {

				if ( ! isset( $_POST['templateFile'] ) || is_null( $_POST['templateFile'] ) ) {
					throw new Exception( __( 'Nothing selected to install.', 'messia' ) );
				}

				$template = $_POST['templateFile'];
				$demo->restore_db( MESSIA_THEME_ABSPATH . "data/templates/{$template}" );

				$blog_settings = get_option( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME, [] );
				$site_settings = get_site_option( MESSIA_THEME_SITE_SETTINGS_PRESET_NAME, [] );

				MIA()->get_module( 'core_hooks' )->setup_ajax_dispatcher( $blog_settings );

				Messia_Config_Styles::save_styles( $blog_settings );
				Messia_User_Settings::root_htaccess_content( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME, $blog_settings, [], [] );

				wp_send_json_success(
					[
						'code'   => 200,
						'msg'    => __( 'Demo content installed. Applying...', 'messia' ),
						'reload' => true,
					]
				);

			} catch ( Throwable $e ) {

				$err = $e->getMessage();

				wp_send_json_success(
					[
						'code' => 400,
						// translators: %s - PHP error text.
						'msg'  => sprintf( __( 'Installation failed with error(s): %s', 'messia' ), $err ),
					]
				);

			}
		} else {

			wp_send_json_error(
				[
					'code' => 500,
					'msg'  => __( 'Access violation - reload the page and try again.', 'messia' ),
				]
			);
		}
	}

	/**
	 * Get list of available demo zips.
	 *
	 * @return void
	 */
	public function demo_get_list(): void {

		if ( check_ajax_referer( 'messiaCoreSettingsNonce', 'messiaNonce', false ) ) {

			$settings_module = MIA()->get_module( 'settings' );

			if ( is_multisite() ) {
				$settings = $settings_module->get_site_setting( MESSIA_THEME_SITE_SETTINGS_PRESET_NAME );
			} else {
				$settings = $settings_module->get_blog_setting( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME );
			}

			$theme_licence_active = json_decode( $settings['theme_licence_data'] )->licence_status === 'active';

			$zip       = new ZipArchive();
			$templates = glob( MESSIA_THEME_ABSPATH . 'data/templates/*.zip' );
			$errors    = null;
			$valid     = [];

			// translators: %s the list of errors with zip operations.
			$message = __( 'You can see the list of available demo package on your server. Select one to install, also you can add/remove packages.%s', 'messia' );

			if ( false === $theme_licence_active ) {
				$templates = [];
				$message   = __( 'Please activate your copy of Messia theme to enable demo operations.', 'messia' );
			}

			// Validate Messia original package.
			foreach ( $templates as $key => $template ) {

				$result = $zip->open( $template, ZipArchive::CHECKCONS );

				if ( true !== $result ) {
					$valid[] = 'Error reading file' . basename( $template );
				}

				$valid = $this->validate_demo( $template, $zip->comment );

				if ( ! empty( $valid ) ) {
					unset( $templates[ $key ] );
				} else {
					$zip->close();
				}
			}

			Messia_Help::preserve_demo_folder();

			if ( ! empty( $valid ) ) {
				$errors = ' ' . implode( ' ', $valid );
			}

			wp_send_json_success(
				[
					'code'               => 200,
					'msg'                => sprintf( $message, $errors ),
					'demoData'           => array_map( 'basename', array_unique( array_values( $templates ) ) ),
					'themeLicenceActive' => $theme_licence_active,
				]
			);

		} else {

			wp_send_json_error(
				[
					'code' => 500,
					'msg'  => __( 'Access violation - reload the page and try again.', 'messia' ),
				]
			);
		}
	}

	/**
	 * Uploads demo zips.
	 *
	 * @return void
	 */
	public function demo_add(): void {

		if ( check_ajax_referer( 'messiaCoreSettingsNonce', 'messiaNonce', false ) ) {

			if ( ! current_user_can( 'manage_options' ) ) {
				wp_send_json_error(
					[
						'code' => 500,
						'msg'  => __( 'Sorry, only Administrator can add demo.', 'messia' ),
					]
				);
			}

			global $wp_filesystem;

			WP_Filesystem();

			$demo_files_parts  = [];
			$demo_files_merged = [];

			$demo_data   = json_decode( stripslashes( $_POST['demoData'] ), true );
			$errors      = [];
			$tmpl_folder = MESSIA_THEME_ABSPATH . 'data/templates/';

			// Restriction for front setted in $this::page_content_callback().
			$allowed_mime_types = [
				'application/zip',
				'application/x-zip-compressed',
			];

			/**
			 * Rebuild $_FILES into handy array,
			 * where each index contain full info
			 * about file being uploaded.
			 */
			foreach ( $_FILES['demo'] as $key => $value_arr ) {
				foreach ( $value_arr as $index => $value ) {
					if ( ! isset( $demo_files_parts[ $index ] ) ) {
						$demo_files_parts[ $index ] = [];
					}
					$demo_files_parts[ $index ][ $key ] = $value;
				}
			}

			// Make sure hole path exists.
			$done = $this->create_demo_folder();

			if ( false === $done ) {
				wp_send_json_success(
					[
						'code'     => 400,
						// translators: %s - folder path.
						'msg'      => sprintf( __( 'Target directory %s can not be created or is write protected.', 'messia' ), "<strong>{$tmpl_folder}</strong>" ),
						'demoData' => [],
					]
				);
			}

			/**
			 * Get file and append it to output file,
			 * on last part add output file to array
			 * for validation and permanent saving.
			 */
			foreach ( $demo_files_parts as $demo_file_part ) {

				// Corrupted part.
				if ( 0 !== $demo_file_part['error'] ) {
					// translators: %s file name.
					$errors[] = sprintf( __( "Error uploading '%s'.", 'messia' ), $demo_file_part );
					break;
				}

				$demo_data_index = array_search( $demo_file_part['name'], array_column( $demo_data, 'name' ), true );
				$demo_info       = $demo_data[ $demo_data_index ];

				$demo_part_file_info = pathinfo( $demo_file_part['name'] );
				$demo_file_temp      = "{$tmpl_folder}{$demo_part_file_info['filename']}.part";

				if ( true === $demo_info['start'] ) {
					$wp_filesystem->delete( $demo_file_temp, true, 'f' );
				}

				try {
					file_put_contents( // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_read_file_put_contents
						$demo_file_temp,
						$wp_filesystem->get_contents( $demo_file_part['tmp_name'] ),
						FILE_APPEND | LOCK_EX
					);
				} catch ( Throwable $e ) {
					// translators: %s exception error message.
					$errors[] = sprintf( __( 'Error appending part file content: %s', 'messia' ), $e->getMessage() );
				}

				// Last part?
				if ( true === $demo_info['finish'] ) {
					if ( $wp_filesystem->size( $demo_file_temp ) === $demo_info['size'] ) {
						$demo_files_merged[] = [
							'original_ext' => pathinfo( $demo_file_part['name'], PATHINFO_EXTENSION ),
							'output_file'  => $demo_file_temp,
						];
					} else {
						$wp_filesystem->delete( $demo_file_temp, true, 'f' );
						$errors[] = __( 'Error part file checksize against incoming file.', 'messia' );
					}

					// Clean ourself.
					$wp_filesystem->rmdir( $demo_file_part['tmp_name'], false );
				} else {

					$name      = pathinfo( $demo_file_temp, PATHINFO_BASENAME );
					$templates = glob( "{$tmpl_folder}/*.zip" );

					wp_send_json_success(
						[
							'code'     => 200,
							// translators: %s - file name.
							'msg'      => sprintf( __( 'Demo %s partially uploaded.', 'messia' ), "<strong>{$name}</strong>" ),
							'demoData' => array_map( 'basename', $templates ),
						]
					);
				}
			}

			/**
			 * Validate output file, rename it and
			 * try to save in template folder.
			 */
			foreach ( $demo_files_merged as $index => $demo_file ) {

				$delete         = false;
				$tmpl_free      = disk_free_space( $tmpl_folder );
				$demo_file_info = pathinfo( $demo_file['output_file'] );

				// Too big.
				if ( ( $tmpl_free - $wp_filesystem->size( $demo_file['output_file'] ) ) <= 0 ) {
					$errors[] = __( 'Not enough free disk space.', 'messia' );
					$delete   = true;
				}

				// Not a ZIP.
				$mime = mime_content_type( $demo_file['output_file'] );
				if ( ! in_array( $mime, $allowed_mime_types, true ) ) {
					// translators: %1$s file name, %2$s file mime type.
					$errors[] = sprintf( __( 'File `%1$s` has incorrect type `%2$s`.', 'messia' ), $demo_file_info['basename'], $mime );
					$delete   = true;
				}

				$zip = new ZipArchive();

				try {
					$open = $zip->open( $demo_file['output_file'], ZipArchive::CHECKCONS );

					// ZIP corrupted.
					if ( true !== $open ) {
						// translators: %1$s file name, %2$s ZipArchive error code.
						$errors[] = sprintf( __( 'Output archive `%1$s` corrupted, error code: `%2$s`.', 'messia' ), $demo_file_info['basename'], $open );
						$delete   = true;
					}
				} catch ( Throwable $e ) {
					// translators: %1$s file name, %2$s exception message.
					$errors[] = sprintf( __( 'Unexpected error on opening output archive `%1$s`, exception: `%2$s`.', 'messia' ), $demo_file_info['basename'], $e->getMessage() );
					$delete   = true;
				}

				try {
					$valid = $this->validate_demo( $demo_file['output_file'], $zip->comment, $demo_file['original_ext'] );

					// Is not Messia valid demo.
					if ( ! empty( $valid ) ) {
						$errors = array_merge( $errors, $valid );
						$delete = true;
					}
				} catch ( Throwable $e ) {
					// translators: %1$s file name, %2$s exception message.
					$errors[] = sprintf( __( 'Unexpected error on demo validation archive `%1$s`, exception: `%2$s`.', 'messia' ), $demo_file_info['basename'], $e->getMessage() );
					$delete   = true;
				}

				$zip->close();

				// Drop file.
				if ( true === $delete ) {
					$wp_filesystem->rmdir( $demo_file['output_file'], false );
					unset( $demo_files_merged[ $index ] );
					continue;
				}

				// Correct ZIP.
				$name = "{$demo_file_info['filename']}.{$demo_file['original_ext']}";
				$from = $demo_file['output_file'];
				$to   = $tmpl_folder . $name;

				// Rename if zip exists.
				if ( $wp_filesystem->exists( $to ) ) {
					$finfo      = pathinfo( $to );
					$copies_num = count( glob( $finfo['dirname'] . "/{$finfo['filename']}(*).{$finfo['extension']}" ) ) + 1;

					$name = "{$finfo['filename']}({$copies_num}).{$finfo['extension']}";
					$to   = $tmpl_folder . $name;
				}

				// Finalize and rename .part to original extension.
				try {
					$wp_filesystem->move( $from, $to );
				} catch ( Throwable $e ) {
					// translators: %1$s file name, %2$s exception error message.
					$errors[] = sprintf( __( 'Error moving file `%1$s` into templates folder: 2%2$s', 'messia' ), $demo_file['name'], $e->getMessage() );
					$wp_filesystem->rmdir( $demo_file['tmp_name'], false );
				}
			}

			$templates = glob( "{$tmpl_folder}/*.zip" );

			if ( empty( $errors ) ) {
				wp_send_json_success(
					[
						'code'     => 200,
						// translators: %s - file name.
						'msg'      => sprintf( __( 'Demo %s uploaded and ready for installation.', 'messia' ), "<strong>{$name}</strong>" ),
						'demoData' => array_map( 'basename', $templates ),
					]
				);
			}

			wp_send_json_success(
				[
					'code'     => 400,
					'msg'      => '<div><strong>' . __( 'File processing error:', 'messia' ) . '</div></strong><ul><li>' . implode( '</li><li>- ', $errors ) . '</li></ul>',
					'demoData' => array_map( 'basename', $templates ),
				]
			);

		} else {

			wp_send_json_error(
				[
					'code' => 500,
					'msg'  => __( 'Access violation - reload the page and try again.', 'messia' ),
				]
			);
		}
	}

	/**
	 * Remove list of demos zips.
	 *
	 * @return void
	 */
	public function demo_remove(): void {

		if ( check_ajax_referer( 'messiaCoreSettingsNonce', 'messiaNonce', false ) ) {

			if ( ! current_user_can( 'manage_options' ) ) {
				wp_send_json_error(
					[
						'code' => 500,
						'msg'  => __( 'Sorry, only Administrator can remove demo.', 'messia' ),
					]
				);
			}

			global $wp_filesystem;

			WP_Filesystem();

			$demos = $_POST['demos'];

			foreach ( $demos as $demo ) {

				$demo_path = MESSIA_THEME_ABSPATH . "data/templates/{$demo}";

				if ( $wp_filesystem->exists( $demo_path ) ) {
					$wp_filesystem->rmdir( $demo_path, false );
				}
			}

			$templates = glob( MESSIA_THEME_ABSPATH . 'data/templates/*.zip' );

			wp_send_json_success(
				[
					'code'     => 200,
					'msg'      => __( 'Demo packages removed.', 'messia' ),
					'demoData' => array_map( 'basename', array_unique( array_values( $templates ) ) ),
				]
			);

		} else {

			wp_send_json_error(
				[
					'code' => 500,
					'msg'  => __( 'Access violation - reload the page and try again.', 'messia' ),
				]
			);
		}
	}

	/**
	 * Try to create demo path.
	 *
	 * @return bool
	 */
	private function create_demo_folder(): bool {

		global $wp_filesystem;

		$tmpl_folder = MESSIA_THEME_ABSPATH . 'data/templates/';

		// Make sure hole path exists.
		$wp_filesystem->mkdir( dirname( $tmpl_folder ) );
		$wp_filesystem->mkdir( $tmpl_folder );

		return is_writable( $tmpl_folder );
	}

	/**
	 * Turn 'number' to number, strip slashes.
	 *
	 * @param mixed $value This value will be normalized.
	 *
	 * @return mixed
	 */
	private function normalize_types( $value ) {

		if ( is_numeric( $value ) ) {

			if ( $value == (int) $value ) { // phpcs:ignore WordPress.PHP.StrictComparisons.LooseComparison
				return (int) $value;
			} else {
				return (float) $value;
			}
		}

		$value = stripslashes_deep( $value );

		return $value;
	}

	/**
	 * Adds classes to option if there are notice exists for it.
	 *
	 * @param array $title_class HTML classes.
	 * @param array $control     Current saved option.
	 *
	 * @return string
	 */
	private function extract_notices( array $title_class, array $control ): string {

		if ( isset( $control['notice'] ) ) {
			$title_class = array_merge( $title_class, $control['notice'] );
		}
		if ( isset( $control['licence'] ) && true === $control['licence'] ) {
			$title_class = array_merge( $title_class, [ 'licence' ] );
		}

		return implode( ' ', $title_class );
	}

	/**
	 * Parse PHP ini parameters with dimensions G, M, K.
	 * Example: "post_max_size = 5G" -> 5368709120 bytes.
	 *
	 * @param string $val Options from php_ini..
	 *
	 * @return string
	 */
	private function return_bytes( string $val ) {

		$dim = strtolower( $val[ strlen( $val ) - 1 ] );
		$val = floatval( trim( $val ) );

		switch ( $dim ) {
			case 'g':
				$val *= 1024; // Gigabyes.
			case 'm':
				$val *= 1024; // Megabytes.
			case 'k':
				$val *= 1024; // Kylobytes.
		}

		return $val;
	}

	/**
	 * Validate demo against requirments.
	 *
	 * @param string $demo_file    Full path to demo file.
	 * @param string $original_ext If not provided will be taken from $demo_file.
	 * @param string $comment      Demo archive comment.
	 *
	 * @return array
	 */
	private function validate_demo( string $demo_file, string $comment, ?string $original_ext = null ): array {

		$errors = [];

		$comment_info   = $this->get_demo_info( $comment );
		$demo_file_info = pathinfo( $demo_file );
		$theme_version  = ( wp_get_theme()->parent() ) ? wp_get_theme()->parent()->get( 'Version' ) : wp_get_theme()->get( 'Version' );

		if ( is_null( $original_ext ) ) {
			$original_ext = $demo_file_info['filename'];
		}

		$demo_file_name = "{$demo_file_info['filename']}.{$original_ext}";

		// phpcs:disable WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
		if ( ! isset( $comment_info->Package ) ) {
			// translators: %1$s file name.
			$errors[] = sprintf( __( 'File `%1$s` has no Messia signature.', 'messia' ), $demo_file_name );
		} elseif ( ! isset( $comment_info->Version ) ) {
			// translators: %1$s file name.
			$errors[] = sprintf( __( 'File `%1$s` does not provide demo version.', 'messia' ), $demo_file_name );
		} elseif ( MESSIA_DEMO_PACKAGE_COMMENT !== $comment_info->Package ) {
			// translators: %1$s file name.
			$errors[] = sprintf( __( 'File `%1$s` has invalid Messia signature.', 'messia' ), $demo_file_name );
		} elseif ( ! isset( $comment_info->Version ) || version_compare( (string) $comment_info->Version, $theme_version, '<' ) ) {
			// translators: %1$s file name.
			$errors[] = sprintf( __( 'Demo `%1$s` requires at least Messia %2$s version, you have %3$s.', 'messia' ), $demo_file_name, $comment_info->Version, $theme_version );
		}
		// phpcs:enable WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase

		return $errors;
	}


	/**
	 * Parse demo zip comment into array.
	 *    keys:   Uppercase the first character of each word in a strings, then remove all spaces.
	 *    values: Trim spaces only.
	 *
	 * @param string $comment Demo archive comment.
	 *
	 * @return stdClass
	 */
	private function get_demo_info( string $comment ): stdClass {

		preg_match_all( '/^(.*):(?!\/\/)(.*)$/mi', $comment, $matches, PREG_SET_ORDER, 0 );

		return (object) array_combine(
			array_map(
				function( $value ) {
					return str_replace( ' ', '', ucwords( $value ) );
				},
				array_column( $matches, 1 )
			),
			array_map( 'trim', array_column( $matches, 2 ) )
		);
	}
}
