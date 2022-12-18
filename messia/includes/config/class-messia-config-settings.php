<?php
/**
 * Settings config
 *
 * @package Messia\Config
 */

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Config;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

use Smartbits\Messia\Includes\Modules\Theme\Messia_Template_Loader;
use Smartbits\Messia\Includes\Helpers\Messia_Help;
use Exception;

/**
 * Class setting up theme config.
 *
 * @package wpAdminMenuPage
 */
final class Messia_Config_Settings {

	/**
	 * The hole compiled configuration.
	 *
	 * @var array
	 */
	private static ?array $config = null;

	/**
	 * Key value pairs of terms in Segment taxonomy.
	 *
	 * @var array
	 */
	private static array $segment_terms_options;

	/**
	 * Key value pairs of Listing page templates.
	 *
	 * @var array
	 */
	private static array $template_files_listing;

	/**
	 * Key value pairs of Object page templates.
	 *
	 * @var array
	 */
	private static array $template_files_object;

	/**
	 * Key value pairs of Home page templates.
	 *
	 * @var array
	 */
	private static array $template_files_homepage;

	/**
	 * Key value pairs of Archive page templates.
	 *
	 * @var array
	 */
	private static array $template_files_archive;

	/**
	 * Key value pairs of Page templates.
	 *
	 * @var array
	 */
	private static array $template_files_page;

	/**
	 * Key value pairs of WP Single templates.
	 *
	 * @var array
	 */
	private static array $template_files_single;

	/**
	 * HTML markup for help section.
	 *
	 * @var array
	 */
	private static string $help_html;

	/**
	 * User interface tabs.
	 *
	 * @var object
	 */
	private static object $tabs;

	/**
	 * User interface sections.
	 *
	 * @var object
	 */
	private static object $sections;

	/**
	 * User interface controls.
	 *
	 * @var object
	 */
	private static object $controls;

	/**
	 * Initiate controls, sections, tabs with data.
	 *
	 * @return void
	 */
	private static function init(): void {

		self::$segment_terms_options = Messia_Help::get_terms_dropdown_options(
			[
				'taxonomy' => [ 'messia_object_segment' ],
				'value'    => 'term_id',
			]
		);

		self::$template_files_listing  = Messia_Template_Loader::search_messia_template( 'listing' );
		self::$template_files_object   = Messia_Template_Loader::search_messia_template( 'object' );
		self::$template_files_homepage = Messia_Template_Loader::search_messia_template( 'home' );
		self::$template_files_archive  = Messia_Template_Loader::search_messia_template( 'archive' );
		self::$template_files_page     = Messia_Template_Loader::search_messia_template( 'page' );
		self::$template_files_single   = Messia_Template_Loader::search_messia_template( 'single' );

		self::$help_html = '<a data-section-id="%s%" class="messia-wp-help">' . __( 'Help', 'messia' ) . '</a>';

		self::init_tabs();
		self::init_sections();
		self::init_controls();
	}

	/**
	 * Initiate tabs with data.
	 *
	 * @return void
	 */
	private static function init_tabs(): void {

		self::$tabs = (object) [
			'tab_site'        => [
				'title'    => __( 'Site Settings', 'messia' ),
				'help'     => [
					'id'       => 'messia_site_help',
					'title'    => __( 'Site Settings', 'messia' ),
					// phpcs:disable WordPress.WP.EnqueuedResources.NonEnqueuedScript
					'content'  => '<h2>' . __( 'Site settings', 'messia' ) . '</h2><p>' . __( 'This section contains general settings that affect entire website. The most important of these settings:', 'messia' ) . '</p>
									<ul>
										<li><span class="wparam">' . __( 'Google Fonts', 'messia' ) . '</span> - ' . __( 'Radically change the appearance and perception of the website. You need to get Google Fonts API key in order to use Google Fonts.', 'messia' ) . '</li>
										<li><span class="wparam">' . __( 'Font Awesome Icons', 'messia' ) . '</span> - ' . esc_html__( 'Once you have generated Font Awesome Kit you will see its service name and connection string like this <script src="https://kit.fontawesome.com/52dfe25b5b.js" crossorigin="anonymous"></script>. So the JavaScript file name here is 52dfe25b5b. This is what you need to type in option value.', 'messia' ) . '</li>
									</ul>',
					// phpcs:enable WordPress.WP.EnqueuedResources.NonEnqueuedScript
					'callback' => '',
					'priority' => 10,
				],
				'controls' => [],
			],
			'tab_homepage'    => [
				'title'    => __( 'Home Page', 'messia' ),
				'controls' => [],
			],
			'tab_searchpage'  => [
				'title'    => __( 'Search', 'messia' ),
				'help'     => [
					'id'       => 'messia_search_page_help',
					'title'    => __( 'Search', 'messia' ),
					'content'  => '<h2>' . __( 'Using search', 'messia' ) . '</h2><p>' . __( 'Settings for the object search page:', 'messia' ) . '</p>
											<ul>
												<li><span class="wparam">' . __( 'Primary segment', 'messia' ) . '</span> - ' . __( 'In some cases, when it is necessary to form a link to the search page, and the site contains more than one segment, it becomes impossible to determine the search by which segment should be performed and as a result, the formation of such a link becomes impossible. To eliminate this uncertainty, use this option. In the event of such situations, a link will be formed for the segment indicated here as a primary.', 'messia' ) . '</li>
												<li><span class="wparam">' . __( 'Objects per page', 'messia' ) . '</span> - ' . __( 'This parameter is a direct analogue of the MySQL LIMIT operator and limits the number of rows in a search query.', 'messia' ) . '</li>
												<li><span class="wparam">' . __( 'Hide Empty Categories', 'messia' ) . '</span> - ' . __( 'This parameter determines whether category terms that has no one object will be included in the drop-down options.', 'messia' ) . '</li>
												<li><span class="wparam">' . __( 'Hide Empty Properties', 'messia' ) . '</span> - ' . __( 'This parameter determines whether property terms that has no one object will form checkbox filters.', 'messia' ) . '</li>
												<li><span class="wparam">' . __( 'Use Canonical URLs', 'messia' ) . '</span> - ' . __( 'For complex listing queries, a URL can be generated containing categories, properties and values of custom fields. From a search point of view, it doesn\'t matter in which order they are listed. For example "domain/segment/?prop=bar,breakfast" and "domain/segment/?prop=breakfast,bar" will successfully return the same set of objects. But from the point of view of search engines, site will contain two pages with the same content, but different URLs. This can lead to penalties and lower search rankings. Enabling this option will redirect all non-canonical listing URLs to their canonical version with status 301. The URL is considered canonical if the order of terms in which corresponds to their order of storage in the database.', 'messia' ) . '</li>
												<li><span class="wparam">' . __( 'Property URL format', 'messia' ) . '</span> - ' . __( 'Properties in URL parameters will let search engines to index each search parameters combination separately. This will create bugger number of indexed URLs on your website, but it might cause penalties, since these pages content will not be unique. If you choose to store search terms in URI fragment, search engines will not consider each URL with different property values as a separate webpage.', 'messia' ) . '</li>
											</ul>',
					'callback' => '',
					'priority' => 30,
				],
				'controls' => [],
			],
			'tab_objectpage'  => [
				'title'    => __( 'Object Page', 'messia' ),
				'help'     => [
					'id'       => 'messia_object_page_help',
					'title'    => __( 'Object Page', 'messia' ),
					'content'  => '<h2>' . __( 'Object settings', 'messia' ) . '</h2><p>' . __( 'Settings for the object page:', 'messia' ) . '</p>
											<ul>
												<li><span class="wparam">' . __( 'Object page template', 'messia' ) . '</span> - ' . __( 'The option sets the server template that will be used when displaying the page. This makes it possible to write code to display the same content in different functions, so when you need to change the server logic to get different data for the frontend, instead of rewriting the existing code and, as a result, losing it, you can create a new template and place modified code into it. A template cannot affect or change the data architecture; it should be taken as a “skin”. The data included in the template is always the same. But he can operate on the available data completely autonomously and independently. For example, interchange the order of data output, change labels and signatures, show or not text and other data. So, for example, you can create different types of cards in terms of content, remove and swap the main blocks - sidebar, content, SEO blocks, map, etc.', 'messia' ) . '</li>
												<li><span class="wparam">' . __( 'Tag Title', 'messia' ) . '</span> - ' . __( 'The value specified in the field will be inserted into the html title tag, which in turn will be displayed in the head section of the object’s page. This field does not allow html markup. You can use plain text and theme-supported seo-plesholders in any combination. Leave the field blank to get the unchanged native WordPress title tag.', 'messia' ) . '</li>
												<li><span class="wparam">' . __( 'Tag Description', 'messia' ) . '</span> - ' . __( 'The value specified in the field will be inserted into the content attribute of the html of the description tag, which in turn will be displayed in the head section of the object’s page. This field does not allow html markup. You can use plain text and theme-supported seo-plesholders in any combination. Leave the field blank to not display this tag at all.', 'messia' ) . '</li>
												<li><span class="wparam">' . __( 'Tag H1', 'messia' ) . '</span> - ' . __( 'The value specified in the field will be inserted into the html tag h1, which in turn will be displayed in the body section of the object’s page. This field does not allow html markup. You can use plain text and theme-supported seo-plesholders in any combination. Leave the field blank to not display this tag at all.', 'messia' ) . '</li>
											</ul>',
					'callback' => '',
					'priority' => 40,
				],
				'controls' => [],
			],
			'tab_services'    => [
				'title'    => __( 'Services', 'messia' ),
				'help'     => [
					'id'       => 'messia_service_help',
					'title'    => __( 'Services', 'messia' ),
					'content'  => '<h2>' . __( 'Use of services', 'messia' ) . '</h2><p>' . __( 'The following service types are supported:', 'messia' ) . '</p>
											<ul>
												<li><span class="wparam">' . __( 'Module Activation Events', 'messia' ) . '</span> - ' . __( 'You can receive notifications about events on your website directly to the Slack app channel. To do this, you need to create an application in your Slack account, install this application in Slack Workspace and create a web hook in your application - "Post to - you preffered channel". You can get more detailed information by the link in the help sidebar.', 'messia' ) . '</li>
											</ul>',
					'callback' => '',
					'priority' => 50,
				],
				'controls' => [],
			],
			'tab_comments'    => [
				'title'    => __( 'Rating Management', 'messia' ),
				'help'     => [
					'id'       => 'messia_comments_page_help',
					'title'    => __( 'Rating Management', 'messia' ),
					'content'  => '<h2>' . __( 'Rating Management Settings', 'messia' ) . '</h2><p>' . __( 'Object Rating Settings:', 'messia' ) . '</p>
											<ul>
												<li><span class="wparam">' . __( 'Override visitor ratings', 'messia' ) . '</span> - ' . __( 'You can use the information left by users as a base for building a rating of objects, or you can evaluate objects yourself and assign a rating to them at your discretion through the admin panel.', 'messia' ) . '</li>
												<li><span class="wparam">' . __( 'Object rating criteria', 'messia' ) . '</span> - ' . __( 'If you are using site rankings, you can create as many scoring criteria as you like and rate the object for each of them. The overall rating will be calculated as an average value based on each criteria value.', 'messia' ) . '</li>
											</ul>',
					'callback' => '',
					'priority' => 60,
				],
				'controls' => [],
			],
			'tab_seo'         => [
				'title'    => __( 'SEO', 'messia' ),
				'help'     => [
					'id'       => 'messia_seo_page_help',
					'title'    => __( 'SEO', 'messia' ),
					'content'  => '<h2>' . __( 'SEO Settings', 'messia' ) . '</h2><p>' . __( 'Search engine optimization settings:', 'messia' ) . '</p>
											<ul>
												<li><span class="wparam">' . __( 'SEO placeholders', 'messia' ) . '</span> - ' . __( 'SEO placeholder before being displayed on the page is replaced with its logical value. The logic of such a replacement requires using the capabilities of the programming language, so it is impossible to define or redefine it using the theme settings. Thus, in the topic settings, the list of placeholders is presented in read-only mode, if necessary, change the list or the behavior of the placeholder this should be done through the source code.', 'messia' ) . '</li>
												<li><span class="wparam">' . __( 'Merging CSS', 'messia' ) . '</span> - ' . __( 'Merging CSS files into a single file improves site performance in terms of search engines. When this option is enabled, at the time of loading any page of the web interface, the following happens: all CSS files planned for output are combined into one file that is output in the footer, regardless of where the source style files should be displayed - in the footer or header . Use this option with caution because a lot depends on how the code is written and how sensitive it is to the order in which styles are loaded.', 'messia' ) . '</li>
												<li><span class="wparam">' . __( 'Merging JS', 'messia' ) . '</span> - ' . __( 'Merging JS files into a single file improves site performance in terms of search engines. When this option is enabled, at the time of loading any page of the web interface, the following happens: all CSS files planned for output are combined into one file that is output in the footer, regardless of where the source style files should be displayed - in the footer or header . Use this option with caution because a lot depends on how the code is written and how sensitive it is to the order in which styles are loaded.', 'messia' ) . '</li>
												<li><span class="wparam">' . __( 'Critical CSS', 'messia' ) . '</span> - ' . esc_html__( 'Embedding critical CSS into a <head> tag of page can help you improve your SEO page performance. Do not try to write it yourself, but use any specialized online service for this. Generate the code in it and then add it into propper option.', 'messia' ) . '</li>
											</ul>',
					'callback' => '',
					'priority' => 70,
				],
				'controls' => [],
			],
			'tab_development' => [
				'title'    => __( 'Development', 'messia' ),
				'help'     => [
					'id'       => 'messia_optimization_help',
					'title'    => __( 'Development', 'messia' ),
					'content'  => '<h2>' . __( 'Site optimization', 'messia' ) . '</h2><p>' . __( 'This option allows you to speed up your website. Read this to understand how it works:', 'messia' ) . '</p>
											<ul>
											<li><span class="wparam">' . __( 'Page templates', 'messia' ) . '</span> - ' . __( 'The option sets the server template that will be used when displaying the page. This makes it possible to write code to display the same content in different functions, so when you need to change the server logic to get different data for the frontend, instead of rewriting the existing code and, as a result, losing it, you can create a new template and place modified code into it. A template cannot affect or change the data architecture; it should be taken as a “skin”. The data included in the template is always the same. But he can operate on the available data completely autonomously and independently. For example, interchange the order of data output, change labels and signatures, show or not text and other data. So, for example, you can create different types of cards in terms of content, remove and swap the main blocks - sidebar, content, SEO blocks, map, etc.', 'messia' ) . '</li>
											<li><span class="wparam">' . __( 'Ajax Dispatcher', 'messia' ) . '</span> - ' . __( 'Ajax dispatcher works on the basis of the rules contained inside its configuration file, which contains a list of plugins that are allowed to be launched during Ajax calls to the site. Thus, the more precisely these rules are configured, the less unnecessary plugins will be executed during the request and the faster the request will be processed. Dispatcher is completely disabled for any requests from the backend.', 'messia' ) . '</li>
											<li><span class="wparam">' . __( 'Dispatcher Log', 'messia' ) . '</span> - ' . __( 'Ajax dispatcher can keep its own log, the request data will be written if the rule for such a request did not work in the dispatcher settings. Enabling logging can help you configure dispatcher filtering rules. The log file size is limited to 2 MB, when this size is reached, the log will be cleared and will start filling up again.', 'messia' ) . '</li>
											</ul>',
					'callback' => '',
					'priority' => 80,
				],
				'controls' => [],
			],
			'tab_pwa'         => [
				'title'    => __( 'PWA', 'messia' ),
				'help'     => [
					'id'       => 'pwa_help',
					'title'    => __( 'PWA', 'messia' ),
					// translators: %s - url.
					'content'  => '<h2>' . __( 'PWA', 'messia' ) . '</h2><p>' . sprintf( __( 'PWA - progressive web application is a technology in web development that visually and functionally transforms a website into an application (mobile application in a browser). Read more on it %s.', 'messia' ), '<a target="_blank" href="https://web.dev/progressive-web-apps/">' . __( 'Here', 'messia' ) . '</a>' ) . '</p>
											<ul>
												<li><span class="wparam">' . __( 'PWA mode', 'messia' ) . '</span> - ' . __( 'PWA mode will allow your site to behave like a native application on mobile clients. Also, in this mode, the client cache will be involved, which will significantly increase the speed of page loading. A valid SSL certificate is required for this mode to work!', 'messia' ) . '</li>
											</ul>',
					'callback' => '',
					'priority' => 90,
				],
				'controls' => [],
			],
			'tab_support'     => [
				'title'    => __( 'Support', 'messia' ),
				'help'     => [
					'id'       => 'messia_access_help',
					'title'    => __( 'Support', 'messia' ),
					// translators: %s - url.
					'content'  => '<h2>' . __( 'Support', 'messia' ) . '</h2>
								<ul>
									<li><span class="wparam">' . __( 'Theme licence', 'messia' ) . '</span> - ' . __( 'To recieve automatic updates, be intouch with latest news and also be able to have 24/7 support, please, enter Licence Key that was generated for You after checkout.', 'messia' ) . '</li>
									<li><span class="wparam">' . __( 'Support access', 'messia' ) . '</span> - ' . __( 'When contacting support, in some cases our engineers may need to access the site\'s control panel. You can grant it for a limited period and revoke it at any time before the expiration date.', 'messia' ) . '</li>
								</ul>',
					'callback' => '',
					'priority' => 100,
				],
				'controls' => [],
			],
		];
	}

	/**
	 * Initiate sections with data.
	 *
	 * @return void
	 */
	private static function init_sections(): void {

		self::$sections = (object) [
			'section_fonts'   => [
				'title' => __( 'Fonts', 'messia' ),
				'type'  => 'section',
			],
			'section_colors'  => [
				'title' => __( 'Colors', 'messia' ),
				'type'  => 'section',
			],
			'section_header'  => [
				'title' => __( 'Header', 'messia' ),
				'type'  => 'section',
			],
			'section_page'    => [
				'title' => __( 'Page', 'messia' ),
				'type'  => 'section',
			],
			'section_content' => [
				'title' => __( 'Content', 'messia' ),
				'type'  => 'section',
			],
			'section_footer'  => [
				'title' => __( 'Footer', 'messia' ),
				'type'  => 'section',
			],
		];
	}

	/**
	 * Initiate controls with data.
	 *
	 * @return void
	 */
	private static function init_controls(): void {

		self::$controls = (object) [
			'control_use_google_meterial_icons'           => [
				'id'      => 'use_google_meterial_icons',
				'name'    => 'use_google_meterial_icons',
				'title'   => __( 'Google Icons', 'messia' ),
				// translators: %s html tag a.
				'tip'     => sprintf( __( 'This is a special icon font. Select this option if you want to use icons. The list of available icons and instructions for use can be found %s.', 'messia' ), '<a target="_blank" href="https://material.io/resources/icons/">' . __( 'Here', 'messia' ) . '</a>', '<a target="_blank" href="http://www.google.com/fonts/">Google Fonts directory</a>' ),
				'disable' => false,
				'class'   => [ 'messia-core-toggle' ],
				'descr'   => __( 'Use', 'messia' ),
				'type'    => 'checkbox',
				'init'    => 1,
			],
			'control_fontawesome_kit_name'                => [
				'id'          => 'fontawesome_kit_name',
				'name'        => 'fontawesome_kit_name',
				'placeholder' => __( 'Font Awesome valid kit name', 'messia' ),
				'title'       => __( 'Font Awesome Icons', 'messia' ),
				// translators: %1$s html tag a, %2$s html tag a.
				'tip'         => sprintf( __( 'To use Font Awesome icons you need to register at %1$s, create your own kit and type here generated JavaScript file name. See section %2$s reference. Leave it blank if not required.', 'messia' ), '<a target="_blank" href="https://fontawesome.com/">Fontawesome</a>', str_replace( '%s%', 'messia_site_help', self::$help_html ) ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => null,
			],
			'control_google_fonts_api_key'                => [
				'id'          => 'google_fonts_api_key',
				'name'        => 'google_fonts_api_key',
				// translators: %s - URL.
				'placeholder' => sprintf( __( 'Get the Google Fonts API key here: %s', 'messia' ), 'https://console.cloud.google.com/apis/credentials/' ),
				'title'       => __( 'Google Fonts', 'messia' ),
				// translators: %1$s html tag a, %2$s html tag a.
				'tip'         => sprintf( __( 'To use Google fonts you need to get API key. Leave it blank if not required. Get the Google Fonts API key %1$s and be sure you have enabled Google service Web Fonts Developer API. You may preview all available Google fonts at %2$s.', 'messia' ), '<a target="_blank" href="https://console.developers.google.com/apis/credentials/">' . __( 'Here', 'messia' ) . '</a>', '<a target="_blank" href="http://www.google.com/fonts/">Google Fonts directory</a>' ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => '',
			],
			'control_font_body'                           => [
				'id'       => 'font_body',
				'name'     => 'font_body',
				// translators: %1$s opening html tag span, %2$s closing html tag span.
				'title'    => sprintf( esc_html__( 'Font for %1$s<body>%2$s', 'messia' ), '<span class="code">', '</span>' ),
				'tip'      => __( '* LH - line-height(rate).', 'messia' ),
				'type'     => 'callback',
				'callable' => [ 'Smartbits\Messia\Includes\Admin\Messia_User_Settings', 'font_option' ],
				'args'     => [], // will be injected in Smartbits\Messia\Includes\Admin\Messia_User_Settings::inject_args() by control name.
				'init'     => wp_json_encode(
					[
						'collection'  => 'websafe',
						'family'      => 'Tahoma',
						'category'    => 'display',
						'variant'     => 'regular',
						'subset'      => 'cyrillic',
						'size'        => 16,
						'line_height' => 1.5,
						'color'       => '#585858',
					]
				),
			],
			'control_font_h1'                             => [
				'id'       => 'font_h1',
				'name'     => 'font_h1',
				// translators: %1$s opening html tag span, %2$s closing html tag span.
				'title'    => sprintf( esc_html__( 'Font for %1$s<h1>%2$s', 'messia' ), '<span class="code">', '</span>' ),
				'tip'      => __( '* LH - line-height(rate).', 'messia' ),
				'type'     => 'callback',
				'callable' => [ 'Smartbits\Messia\Includes\Admin\Messia_User_Settings', 'font_option' ],
				'args'     => [], // will be injected in Smartbits\Messia\Includes\Admin\Messia_User_Settings::inject_args() by control name.
				'init'     => wp_json_encode(
					[
						'collection'  => 'websafe',
						'family'      => 'Tahoma',
						'category'    => 'display',
						'variant'     => 'normal',
						'subset'      => 'cyrillic',
						'size'        => 34,
						'line_height' => 1.26,
						'color'       => '#585858',
					]
				),
			],
			'control_font_h2'                             => [
				'id'       => 'font_h2',
				'name'     => 'font_h2',
				// translators: %1$s opening html tag span, %2$s closing html tag span.
				'title'    => sprintf( esc_html__( 'Font for %1$s<h2>%2$s', 'messia' ), '<span class="code">', '</span>' ),
				'tip'      => __( '* LH - line-height(rate).', 'messia' ),
				'type'     => 'callback',
				'callable' => [ 'Smartbits\Messia\Includes\Admin\Messia_User_Settings', 'font_option' ],
				'args'     => [], // will be injected in Smartbits\Messia\Includes\Admin\Messia_User_Settings::inject_args() by control name.
				'init'     => wp_json_encode(
					[
						'collection'  => 'websafe',
						'family'      => 'Tahoma',
						'category'    => 'display',
						'variant'     => 'normal',
						'subset'      => 'default',
						'size'        => 28,
						'line_height' => 1.37,
						'color'       => '#585858',
					]
				),
			],
			'control_font_h3'                             => [
				'id'       => 'font_h3',
				'name'     => 'font_h3',
				// translators: %1$s opening html tag span, %2$s closing html tag span.
				'title'    => sprintf( esc_html__( 'Font for %1$s<h3>%2$s', 'messia' ), '<span class="code">', '</span>' ),
				'tip'      => __( '* LH - line-height(rate).', 'messia' ),
				'type'     => 'callback',
				'callable' => [ 'Smartbits\Messia\Includes\Admin\Messia_User_Settings', 'font_option' ],
				'args'     => [], // will be injected in Smartbits\Messia\Includes\Admin\Messia_User_Settings::inject_args() by control name.
				'init'     => wp_json_encode(
					[
						'collection'  => 'websafe',
						'family'      => 'Tahoma',
						'category'    => 'display',
						'variant'     => 'bold',
						'subset'      => 'default',
						'size'        => 23,
						'line_height' => 1.26,
						'color'       => '#585858',
					]
				),
			],
			'control_font_h4'                             => [
				'id'       => 'font_h4',
				'name'     => 'font_h4',
				// translators: %1$s opening html tag span, %2$s closing html tag span.
				'title'    => sprintf( esc_html__( 'Font for %1$s<h4>%2$s', 'messia' ), '<span class="code">', '</span>' ),
				'tip'      => __( '* LH - line-height(rate).', 'messia' ),
				'type'     => 'callback',
				'callable' => [ 'Smartbits\Messia\Includes\Admin\Messia_User_Settings', 'font_option' ],
				'args'     => [], // will be injected in Smartbits\Messia\Includes\Admin\Messia_User_Settings::inject_args() by control name.
				'init'     => wp_json_encode(
					[
						'collection'  => 'websafe',
						'family'      => 'Tahoma',
						'category'    => 'display',
						'variant'     => 'bold',
						'subset'      => 'default',
						'size'        => 19,
						'line_height' => 1.53,
						'color'       => '#585858',
					]
				),
			],
			'control_font_h5'                             => [
				'id'       => 'font_h5',
				'name'     => 'font_h5',
				// translators: %1$s opening html tag span, %2$s closing html tag span.
				'title'    => sprintf( esc_html__( 'Font for %1$s<h5>%2$s', 'messia' ), '<span class="code">', '</span>' ),
				'tip'      => __( '* LH - line-height(rate).', 'messia' ),
				'type'     => 'callback',
				'callable' => [ 'Smartbits\Messia\Includes\Admin\Messia_User_Settings', 'font_option' ],
				'args'     => [], // will be injected in Smartbits\Messia\Includes\Admin\Messia_User_Settings::inject_args() by control name.
				'init'     => wp_json_encode(
					[
						'collection'  => 'websafe',
						'family'      => 'Tahoma',
						'category'    => 'display',
						'variant'     => 'bold',
						'subset'      => 'default',
						'size'        => 18,
						'line_height' => 1.57,
						'color'       => '#585858',
					]
				),
			],
			'control_font_h6'                             => [
				'id'       => 'font_h6',
				'name'     => 'font_h6',
				// translators: %1$s opening html tag span, %2$s closing html tag span.
				'title'    => sprintf( esc_html__( 'Font for %1$s<h6>%2$s', 'messia' ), '<span class="code">', '</span>' ),
				'tip'      => __( '* LH - line-height(rate).', 'messia' ),
				'type'     => 'callback',
				'callable' => [ 'Smartbits\Messia\Includes\Admin\Messia_User_Settings', 'font_option' ],
				'args'     => [], // will be injected in Smartbits\Messia\Includes\Admin\Messia_User_Settings::inject_args() by control name.
				'init'     => wp_json_encode(
					[
						'collection'  => 'websafe',
						'family'      => 'Tahoma',
						'category'    => 'display',
						'variant'     => 'bold',
						'subset'      => 'default',
						'size'        => 17,
						'line_height' => 1.61,
						'color'       => '#585858',
					]
				),
			],
			'control_font_nav_menu_main'                  => [
				'id'       => 'font_nav_menu_main',
				'name'     => 'font_nav_menu_main',
				'title'    => esc_html__( 'Font for Main menu', 'messia' ),
				'tip'      => __( '* LH - line-height(rate).', 'messia' ),
				'type'     => 'callback',
				'callable' => [ 'Smartbits\Messia\Includes\Admin\Messia_User_Settings', 'font_option' ],
				'args'     => [], // will be injected in Smartbits\Messia\Includes\Admin\Messia_User_Settings::inject_args() by control name.
				'init'     => wp_json_encode(
					[
						'collection'  => 'websafe',
						'family'      => 'Tahoma',
						'category'    => 'display',
						'variant'     => 'bold',
						'subset'      => 'default',
						'size'        => 14,
						'line_height' => 1.2,
						'color'       => '#585858',
					]
				),
			],
			'control_nav_items_color'                     => [
				'id'          => 'nav_items_color',
				'name'        => 'nav_items_color',
				'placeholder' => false,
				'title'       => __( 'Navigation', 'messia' ),
				'class'       => [ 'color-picker' ],
				'tip'         => __( 'Color of a links within the text of a given web page, linking to anywhere.', 'messia' ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => '#77adfa',
			],
			'control_nav_items_color_interaction'         => [
				'id'          => 'nav_items_color_interaction',
				'name'        => 'nav_items_color_interaction',
				'placeholder' => false,
				'title'       => __( 'Navigation on interaction', 'messia' ),
				'class'       => [ 'color-picker' ],
				'tip'         => __( 'Color of a links within the text of a given web page, linking to anywhere while user use it, such as hovering over or clicking.', 'messia' ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => '#000000',
			],
			'control_controls_color_initial'              => [
				'id'          => 'controls_color_initial',
				'name'        => 'controls_color_initial',
				'placeholder' => false,
				'title'       => __( 'Controls initial', 'messia' ),
				'class'       => [ 'color-picker' ],
				'tip'         => __( 'The color of interactive elements - buttons, checkboxes, dropboxes, etc.', 'messia' ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => '#77adfa',
			],
			'control_controls_color_initial_inner'        => [
				'id'          => 'controls_color_initial_inner',
				'name'        => 'controls_color_initial_inner',
				'placeholder' => false,
				'title'       => __( 'Controls initial inner', 'messia' ),
				'class'       => [ 'color-picker' ],
				'tip'         => __( 'Internal content color of controls, such as color of the text on a button, color of flag in checkbox.', 'messia' ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => '#ffffff',
			],
			'control_controls_color_interaction'          => [
				'id'          => 'controls_color_interaction',
				'name'        => 'controls_color_interaction',
				'placeholder' => false,
				'title'       => __( 'Controls on interaction', 'messia' ),
				'class'       => [ 'color-picker' ],
				'tip'         => __( 'The color of controls while user use it, such as hovering over a button, clicking checkbox.', 'messia' ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => '#77adfa',
			],
			'control_controls_color_interaction_inner'    => [
				'id'          => 'controls_color_interaction_inner',
				'name'        => 'controls_color_interaction_inner',
				'placeholder' => false,
				'title'       => __( 'Controls on interaction inner', 'messia' ),
				'class'       => [ 'color-picker' ],
				'tip'         => __( 'The color of internal content of controls while user use it, such as hovering over a button, clicking checkbox.', 'messia' ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => '#ffffff',
			],
			'control_header_top_text_color'               => [
				'id'          => 'header_top_text_color',
				'name'        => 'header_top_text_color',
				'placeholder' => false,
				'title'       => __( 'Top Area text color', 'messia' ),
				'class'       => [ 'color-picker' ],
				'tip'         => __( 'Color of any text inside Top Area', 'messia' ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => '#fff',
			],
			'control_header_top_background_color'         => [
				'id'          => 'header_top_background_color',
				'name'        => 'header_top_background_color',
				'placeholder' => false,
				'title'       => __( 'Top Area background color', 'messia' ),
				'class'       => [ 'color-picker' ],
				'tip'         => __( 'Background color of the area above main menu', 'messia' ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => '#333',
			],
			'control_header_top_navmenu_pills'            => [
				'id'      => 'header_top_navmenu_pills',
				'name'    => 'header_top_navmenu_pills',
				'title'   => __( 'Nav Menu mode', 'messia' ),
				'tip'     => __( 'If enabled - show navigation menu items as pills.', 'messia' ),
				'disable' => false,
				'class'   => [ 'messia-core-toggle' ],
				'descr'   => __( 'Pills', 'messia' ),
				'type'    => 'checkbox',
				'init'    => 0,
			],
			'control_header_top_hide_itself'              => [
				'id'      => 'header_top_hide_itself',
				'name'    => 'header_top_hide_itself',
				'title'   => __( 'Hide Top Area', 'messia' ),
				'tip'     => __( 'Don\'t show area above main menu.', 'messia' ),
				'disable' => false,
				'class'   => [ 'messia-core-toggle' ],
				'descr'   => __( 'Hide', 'messia' ),
				'type'    => 'checkbox',
				'init'    => 0,
			],
			'control_add_in_header'                       => [
				'id'          => 'add_in_header',
				'name'        => 'add_in_header',
				'title'       => esc_html__( 'Add into <head> tag', 'messia' ),
				'placeholder' => __( 'Type any valid HTML or JS code', 'messia' ),
				'class'       => [ 'messia-codemirror-sticky' ],
				// translators: %1$s and %2$s - html code.
				'tip'         => sprintf( esc_html__( 'This code will be injected inside <head></head> section. Allowed only HTML tags: %1$smeta%2$s %1$slink%2$s %1$stitle%2$s %1$sstyle%2$s %1$sscript%2$s %1$snoscript%2$s and %1$sbase%2$s.', 'messia' ), '<span class="wparam">', '</span>' ),
				'disable'     => false,
				'type'        => 'textarea',
				'data'        => [
					'code-language' => 'htmlmixed',
				],
				'init'        => null,
			],
			'control_page_title_title_color'              => [
				'id'          => 'page_title_title_color',
				'name'        => 'page_title_title_color',
				'placeholder' => false,
				'title'       => __( 'Title color', 'messia' ),
				'class'       => [ 'color-picker' ],
				'tip'         => __( 'Color of H1 text inside title area.', 'messia' ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => 'black',
			],
			'control_page_title_subtitle_color'           => [
				'id'          => 'page_title_subtitle_color',
				'name'        => 'page_title_subtitle_color',
				'placeholder' => false,
				'title'       => __( 'Subtitle color', 'messia' ),
				'class'       => [ 'color-picker' ],
				'tip'         => __( 'Color of any other text inside title area.', 'messia' ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => '#696a6b',
			],
			'control_page_title_background_color'         => [
				'id'          => 'page_title_background_color',
				'name'        => 'page_title_background_color',
				'placeholder' => false,
				'title'       => __( 'Title background color', 'messia' ),
				'class'       => [ 'color-picker' ],
				'tip'         => __( 'Background color of the title area.', 'messia' ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => '#ececec',
			],
			'control_page_title_background_image'         => [
				'id'       => 'page_title_background_image',
				'name'     => 'page_title_background_image',
				'title'    => __( 'Title background image', 'messia' ),
				'tip'      => __( 'Background image for title area. Overrides page title background color.', 'messia' ),
				'type'     => 'callback',
				'callable' => [ 'Smartbits\Messia\Includes\Admin\Messia_User_Settings', 'setting_image' ],
				'args'     => [ 'type' => 'single' ],
				'init'     => wp_json_encode( [] ),
			],
			'control_page_title_breadcrumbs_background_color' => [
				'id'          => 'page_title_breadcrumbs_background_color',
				'name'        => 'page_title_breadcrumbs_background_color',
				'placeholder' => false,
				'title'       => __( 'Breadcrumbs background color', 'messia' ),
				'class'       => [ 'color-picker' ],
				'tip'         => __( 'Background color of breadcrumbs box.', 'messia' ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => 'white',
			],
			'control_page_title_hide_title'               => [
				'id'      => 'page_title_hide_title',
				'name'    => 'page_title_hide_title',
				'title'   => __( 'Hide Title', 'messia' ),
				'tip'     => __( 'Don\'t show page title and breadcrumbs area.', 'messia' ),
				'disable' => false,
				'class'   => [ 'messia-core-toggle' ],
				'descr'   => __( 'Hide', 'messia' ),
				'type'    => 'checkbox',
				'init'    => 0,
			],
			'control_page_title_hide_breadcrumbs'         => [
				'id'      => 'page_title_hide_breadcrumbs',
				'name'    => 'page_title_hide_breadcrumbs',
				'title'   => __( 'Hide Breadcrumbs', 'messia' ),
				'tip'     => __( 'This setting works only if Title is visible.', 'messia' ),
				'disable' => false,
				'class'   => [ 'messia-core-toggle' ],
				'descr'   => __( 'Hide', 'messia' ),
				'type'    => 'checkbox',
				'init'    => 0,
			],
			'control_sidebar_position'                    => [
				'id'      => 'sidebar_position',
				'name'    => 'sidebar_position',
				'title'   => __( 'Sidebar', 'messia' ),
				'tip'     => __( 'Position of sidebar on bigger screens. On mobile devices sidebar is always on top, before main content.', 'messia' ),
				'disable' => false,
				'descr'   => false,
				'type'    => 'radio',
				'radios'  => [
					[
						'title' => __( 'Left', 'messia' ),
						'value' => 'left',
					],
					[
						'title' => __( 'Right', 'messia' ),
						'value' => 'right',
					],
				],
				'init'    => 'left',
			],
			'control_wp_post_smooth_update'               => [
				'id'      => 'wp_post_smooth_update',
				'name'    => 'wp_post_smooth_update',
				'title'   => __( 'WP Post async load', 'messia' ),
				'tip'     => __( 'On the posts page, when using pagination and navigating to the next (previous) post, update the content without reloading the page.', 'messia' ),
				'disable' => false,
				'class'   => [ 'messia-core-toggle' ],
				'descr'   => __( 'On', 'messia' ),
				'type'    => 'checkbox',
				'init'    => 0,
			],
			'control_animated_cards_appearance'           => [
				'id'      => 'animated_cards_appearance',
				'name'    => 'animated_cards_appearance',
				'title'   => __( 'Cards animation', 'messia' ),
				'tip'     => __( 'Animate the appearance of cards on the search page. May not work with some browsers.', 'messia' ),
				'disable' => false,
				'class'   => [ 'messia-core-toggle' ],
				'descr'   => __( 'On', 'messia' ),
				'type'    => 'checkbox',
				'init'    => 0,
			],
			'control_object_card_bubble_hover'            => [
				'id'      => 'object_card_bubble_hover',
				'name'    => 'object_card_bubble_hover',
				'title'   => __( 'Card bubble hover effect', 'messia' ),
				'tip'     => __( 'Activate effect on object card while user hover it.', 'messia' ),
				'disable' => false,
				'class'   => [ 'messia-core-toggle' ],
				'descr'   => __( 'On', 'messia' ),
				'type'    => 'checkbox',
				'init'    => 0,
			],
			'control_object_card_background_color'        => [
				'id'          => 'object_card_background_color',
				'name'        => 'object_card_background_color',
				'placeholder' => false,
				'title'       => __( 'Card color', 'messia' ),
				'class'       => [ 'color-picker' ],
				'tip'         => __( 'Background color of object card.', 'messia' ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => 'white',
			],
			'control_object_card_bubble_hover_color'      => [
				'id'          => 'object_card_bubble_hover_color',
				'name'        => 'object_card_bubble_hover_color',
				'placeholder' => false,
				'title'       => __( 'Card hover color', 'messia' ),
				'class'       => [ 'color-picker' ],
				'tip'         => __( 'Color of object card while bubble hover effect is active and user hover mouse over card.', 'messia' ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => 'rgba(0, 0, 0, 0.1)',
			],
			'control_footer_top_text_color'               => [
				'id'          => 'footer_top_text_color',
				'name'        => 'footer_top_text_color',
				'placeholder' => false,
				'title'       => __( 'Top Area text color', 'messia' ),
				'class'       => [ 'color-picker' ],
				'tip'         => __( 'Color of any text inside Top Area', 'messia' ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => '#fff',
			],
			'control_footer_top_background_color'         => [
				'id'          => 'footer_top_background_color',
				'name'        => 'footer_top_background_color',
				'placeholder' => false,
				'title'       => __( 'Top Area background color', 'messia' ),
				'class'       => [ 'color-picker' ],
				'tip'         => __( 'Background color of the footer top area.', 'messia' ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => '#333',
			],
			'control_footer_bottom_text_color'            => [
				'id'          => 'footer_bottom_text_color',
				'name'        => 'footer_bottom_text_color',
				'placeholder' => false,
				'title'       => __( 'Bottom Area text color', 'messia' ),
				'class'       => [ 'color-picker' ],
				'tip'         => __( 'Color of any text inside Bottom Area', 'messia' ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => '#797979',
			],
			'control_footer_bottom_background_color'      => [
				'id'          => 'footer_bottom_background_color',
				'name'        => 'footer_bottom_background_color',
				'placeholder' => false,
				'title'       => __( 'Bottom Area background color', 'messia' ),
				'class'       => [ 'color-picker' ],
				'tip'         => __( 'Background color of the footer bottom area.', 'messia' ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => '#333',
			],
			'control_footer_bottom_hide_itself'           => [
				'id'      => 'footer_bottom_hide_itself',
				'name'    => 'footer_bottom_hide_itself',
				'title'   => __( 'Hide Bottom Area', 'messia' ),
				'tip'     => __( 'Don\'t show footer bottom area.', 'messia' ),
				'disable' => false,
				'class'   => [ 'messia-core-toggle' ],
				'descr'   => __( 'Hide', 'messia' ),
				'type'    => 'checkbox',
				'init'    => 0,
			],
			'control_add_in_footer'                       => [
				'id'          => 'add_in_footer',
				'name'        => 'add_in_footer',
				'title'       => __( 'Text below footer', 'messia' ),
				'placeholder' => __( 'Type any valid HTML or JS code', 'messia' ),
				'class'       => [ 'messia-codemirror-sticky' ],
				'tip'         => __( 'This text is shown on the very bottom of your website.', 'messia' ),
				'disable'     => false,
				'type'        => 'textarea',
				'data'        => [
					'code-language' => 'htmlmixed',
				],
				'init'        => null,
			],
			'control_homepage_hero_image'                 => [
				'id'       => 'homepage_hero_image',
				'name'     => 'homepage_hero_image',
				'title'    => __( 'Home page Hero Area Background Image', 'messia' ),
				'tip'      => __( 'This image will be shown on the Home page just below the header. You can leave both Hero image and Hero content empty to hide hero area completely.', 'messia' ),
				'type'     => 'callback',
				'callable' => [ 'Smartbits\Messia\Includes\Admin\Messia_User_Settings', 'setting_image' ],
				'args'     => [ 'type' => 'single' ],
				'init'     => wp_json_encode( [] ),
			],
			'control_homepage_hero_content'               => [
				'id'          => 'homepage_hero_content',
				'name'        => 'homepage_hero_content',
				'title'       => __( 'Home page Hero Area Content', 'messia' ),
				'placeholder' => __( 'Type any valid HTML or JS code', 'messia' ),
				'class'       => [ 'messia-codemirror-sticky' ],
				'tip'         => __( 'This text will be shown in the Hero Area. Use it to display the main message of your website.', 'messia' ),
				'disable'     => false,
				'type'        => 'textarea',
				'data'        => [
					'code-language' => 'htmlmixed',
				],
				'init'        => null,
			],
			'control_default_segment'                     => [
				'id'           => 'default_segment',
				'name'         => 'default_segment',
				'title'        => __( 'Primary segment', 'messia' ),
				'default'      => [],
				'tip'          => __( 'By default, new objects will be created in this segment.', 'messia' ),
				'disable'      => false,
				'type'         => 'select',
				'select_multi' => false,
				'options'      => self::$segment_terms_options,
				'init'         => key( self::$segment_terms_options ),
			],
			'control_complete_category_terms_chain'       => [
				'id'      => 'complete_category_terms_chain',
				'name'    => 'complete_category_terms_chain',
				'title'   => __( 'Add Objects to Parent Categories', 'messia' ),
				'tip'     => __( 'When assigning a category to an object, add this object automatically to all parent cagtegories. It is not recommended to disable the option, otherwise search engine may not work properly.', 'messia' ),
				'disable' => false,
				'class'   => [ 'messia-core-toggle' ],
				'descr'   => false,
				'type'    => 'checkbox',
				'init'    => 1,
			],
			'control_root_category_terms_required'        => [
				'id'      => 'root_category_terms_required',
				'name'    => 'root_category_terms_required',
				'title'   => __( 'Root category terms', 'messia' ),
				'tip'     => __( 'For an object to be found, it must also be included in all root terms of the Category taxonomy. For example, if in the Category taxonomy there are two root terms "communication_types" and "payment_types", then when processing the search query of the type "domain/segment/{other-terms}/" it will be converted to "domain/segment/communication_types/payment_types/{other-terms}/".', 'messia' ),
				'disable' => false,
				'class'   => [ 'messia-core-toggle' ],
				'descr'   => false,
				'type'    => 'checkbox',
				'init'    => 0,
			],
			'control_messia_object_category_empty_terms_to_filter' => [
				'id'      => 'messia_object_category_empty_terms_to_filter',
				'name'    => 'messia_object_category_empty_terms_to_filter',
				'title'   => __( 'Hide Empty Categories', 'messia' ),
				'tip'     => __( 'Don\'t show empty categories in filters. If a term is empty, but it has non-empty descendants, it will still be used.', 'messia' ),
				'disable' => false,
				'class'   => [ 'messia-core-toggle' ],
				'descr'   => false,
				'type'    => 'checkbox',
				'init'    => 0,
			],
			'control_messia_object_property_empty_terms_to_filter' => [
				'id'      => 'messia_object_property_empty_terms_to_filter',
				'name'    => 'messia_object_property_empty_terms_to_filter',
				'title'   => __( 'Hide Empty Properties', 'messia' ),
				'tip'     => __( 'Don\'t show empty properties in filters.', 'messia' ),
				'disable' => false,
				'class'   => [ 'messia-core-toggle' ],
				'descr'   => false,
				'type'    => 'checkbox',
				'init'    => 0,
			],
			'control_listing_use_canonical_url'           => [
				'id'      => 'listing_use_canonical_url',
				'name'    => 'listing_use_canonical_url',
				'title'   => __( 'Use Canonical URLs', 'messia' ),
				// translators: %s html tag <a>.
				'tip'     => sprintf( __( 'Enabe this option to force 301 redirect all non-canonical listing URLs to their canonical version. More info in %s.', 'messia' ), str_replace( '%s%', 'messia_search_page_help', self::$help_html ) ),
				'disable' => false,
				'class'   => [ 'messia-core-toggle' ],
				'descr'   => false,
				'type'    => 'checkbox',
				'init'    => 1,
			],
			'control_property_url_position'               => [
				'id'      => 'property_url_position',
				'name'    => 'property_url_position',
				'title'   => __( 'Property URL format', 'messia' ),
				// translators: %s html tag a.
				'tip'     => sprintf( __( 'Read %s to make a decision.', 'messia' ), str_replace( '%s%', 'messia_search_page_help', self::$help_html ) ),
				'disable' => false,
				'descr'   => false,
				'type'    => 'radio',
				'radios'  => [
					[
						'title' => __( 'URL parameters (after "?" symbol)', 'messia' ),
						'value' => 'query',
					],
					[
						'title' => __( 'URI fragment (after "#" symbol)', 'messia' ),
						'value' => 'hash',
					],
				],
				'init'    => 'query',
			],
			'control_objects_per_pocket'                  => [
				'id'          => 'objects_per_pocket',
				'name'        => 'objects_per_pocket',
				'min'         => 1,
				'max'         => false,
				'step'        => 1,
				'placeholder' => __( 'Integer', 'messia' ),
				'title'       => __( 'Number of objects per page', 'messia' ),
				'tip'         => __( 'The number of objects displayed in search results per page.', 'messia' ),
				'disable'     => false,
				'type'        => 'number',
				'init'        => 6,
			],
			'control_objects_search_order'                => [
				'id'       => 'objects_search_order',
				'name'     => 'objects_search_order',
				'title'    => __( 'Manual order', 'messia' ),
				'tip'      => __( 'You can put certain objects on top of search results. Objects will be displayed only if they match a search criteria.', 'messia' ),
				'type'     => 'callback',
				'callable' => [ 'Smartbits\Messia\Includes\Admin\Messia_User_Settings', 'objects_search_order' ],
				'args'     => [],
				'init'     => wp_json_encode( [] ),
			],
			'control_property_groups'                     => [
				'id'       => 'property_groups',
				'name'     => 'property_groups',
				'title'    => __( 'Property groups', 'messia' ),
				'tip'      => __( 'If you have too many properties, you can create and order property groups. Then you can bind each property to the group.', 'messia' ),
				'type'     => 'callback',
				'callable' => [ 'Smartbits\Messia\Includes\Admin\Messia_User_Settings', 'property_groups' ],
				'args'     => [],
				'init'     => wp_json_encode( [] ),
			],
			'control_property_groups_initially_collapsed' => [
				'id'      => 'property_groups_initially_collapsed',
				'name'    => 'property_groups_initially_collapsed',
				'title'   => __( 'Property groups collapsed', 'messia' ),
				'tip'     => __( 'With settled to On all groups will be collapsed once page loaded, except ones having checked filters.', 'messia' ),
				'disable' => false,
				'class'   => [ 'messia-core-toggle' ],
				'descr'   => false,
				'type'    => 'checkbox',
				'init'    => 1,
			],
			'control_object_page_title'                   => [
				'id'          => 'object_page_title',
				'name'        => 'object_page_title',
				'title'       => __( 'Title Tag', 'messia' ),
				'placeholder' => __( 'Plain text and/or SEO placeholders', 'messia' ),
				'tip'         => esc_html__( 'This text will be used as the content of the title tag as follows - <title> [text] </title>.', 'messia' ),
				'disable'     => false,
				'type'        => 'textarea',
				'init'        => null,
			],
			'control_object_page_description'             => [
				'id'          => 'object_page_description',
				'name'        => 'object_page_description',
				'title'       => __( 'Description Tag', 'messia' ),
				'placeholder' => __( 'Plain text and/or SEO placeholders', 'messia' ),
				'tip'         => esc_html__( 'This text will be used as the content of the meta tag as follows - <meta name="description" content="[text]">.', 'messia' ),
				'disable'     => false,
				'type'        => 'textarea',
				'init'        => null,
			],
			'control_object_page_h1'                      => [
				'id'          => 'object_page_h1',
				'name'        => 'object_page_h1',
				'title'       => __( 'H1 Tag', 'messia' ),
				'placeholder' => __( 'Plain text and/or SEO placeholders', 'messia' ),
				'tip'         => esc_html__( 'This text will be used as the content of the H1 tag as follows - <h1>[text]</h1>.', 'messia' ),
				'disable'     => false,
				'type'        => 'textarea',
				'init'        => null,
			],
			'control_slack_module_alert'                  => [
				'id'          => 'slack_module_alert',
				'name'        => 'slack_module_alert',
				'placeholder' => __( 'Any valid URL, ex: https://hooks.slack.com/services/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', 'messia' ),
				'title'       => __( 'Module Activation Events', 'messia' ),
				// translators: %s - html tag a.
				'tip'         => sprintf( __( 'At the time of automatic shutdown of any of the modules, you can send information about this event to the Webhook indicated here. Read %s section of Messia documentation on how to create Slack App.', 'messia' ), str_replace( '%s%', 'messia_service_help', self::$help_html ) ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => null,
			],
			'control_google_analytics_id'                 => [
				'id'          => 'google_analytics_id',
				'name'        => 'google_analytics_id',
				'placeholder' => 'UA-12345678-0',
				'title'       => __( 'Google Analytics ID', 'messia' ),
				'tip'         => __( 'Insert the correct service identifier to connect to Google Analytics tracker. Leave the field blank if you do not need it.', 'messia' ),
				'disable'     => false,
				'control_svg' => file_get_contents( MESSIA_CORE_ABSPATH . '/assets/images/svg/google.svg' ), // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
				'type'        => 'text',
				'init'        => null,
			],
			'control_google_maps_api_key'                 => [
				'id'          => 'google_maps_api_key',
				'name'        => 'google_maps_api_key',
				'placeholder' => '6LcuczoUAAAAAA_uwQ8DxTQtHqpLpEz9C9k5fiCc',
				'title'       => __( 'Google maps API key', 'messia' ),
				// translators: %s - html tag a.
				'tip'         => sprintf( __( 'Google Maps API allows to use Google Maps on your website to show objects in a map view. Leave the field blank if you do not need it. Get Google Maps API key %s.', 'messia' ), '<a target="_blank" href="https://developers.google.com/identity/sign-in/web/sign-in/">' . __( 'Here', 'messia' ) . '</a>' ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => 'AIzaSyDgzTAo1oZpUb9WSMYPCe2L8bQ30zAGIe4',
			],
			'control_google_captcha_v3_public_key'        => [
				'id'          => 'google_captcha_v3_public_key',
				'name'        => 'google_captcha_v3_public_key',
				'placeholder' => '6LcuczoUAAAAAA_uwQ8DxTQtHqpLpEz9C9k5fiCc',
				'title'       => __( 'gCaptha V3 public key', 'messia' ),
				'tip'         => null,
				'disable'     => false,
				'type'        => 'text',
				'init'        => null,
			],
			'control_google_captcha_v3_secret_key'        => [
				'id'          => 'google_captcha_v3_secret_key',
				'name'        => 'google_captcha_v3_secret_key',
				'placeholder' => '6KcuetoUAAAAAMozOaI9rtpqaVF5kG67cZmdx5vz',
				'title'       => __( 'gCaptha V3 secret key', 'messia' ),
				// translators: %s - html tag a.
				'tip'         => sprintf( __( 'gCaptha service protects your website against spam comments. Leave both keys(public and secret) blank if not required. Get gCaptha keys %s.', 'messia' ), '<a target="_blank" href="https://www.google.com/recaptcha/admin/">' . __( 'Here', 'messia' ) . '</a>' ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => null,
			],
			'control_google_app_id'                       => [
				'id'          => 'google_app_id',
				'name'        => 'google_app_id',
				'placeholder' => '81156926044-fcv91dij5p9sl3ghah3fv55jqjn21eor.apps.googleusercontent.com',
				'title'       => __( 'Google App ID', 'messia' ),
				// translators: %s html tag a.
				'tip'         => sprintf( __( 'Google App allows visitors to login to your website using their Google account. Leave ID and secret blank if not required. Get the app\'s data %s.', 'messia' ), '<a target="_blank" href="https://developers.google.com/identity/sign-in/web/sign-in/">' . __( 'Here', 'messia' ) . '</a>' ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => null,
			],
			'control_google_app_secret_key'               => [
				'id'          => 'google_app_secret_key',
				'name'        => 'google_app_secret_key',
				'placeholder' => 'mH5rvhSjeg_RQPIP5qjinG3Y',
				'title'       => __( 'Google App Secret Key', 'messia' ),
				// translators: %s - html tag a.
				'tip'         => sprintf( __( 'Google App allows visitors to login to your website using Google account. Leave ID and secret blank if not required. Get the app\'s data %s.', 'messia' ), '<a target="_blank" href="https://developers.google.com/identity/sign-in/web/sign-in/">' . __( 'Here', 'messia' ) . '</a>' ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => null,
			],
			'control_facebook_app_id'                     => [
				'id'          => 'facebook_app_id',
				'name'        => 'facebook_app_id',
				'placeholder' => '244211844392417',
				'title'       => __( 'Facebook App ID', 'messia' ),
				'tip'         => null,
				'disable'     => false,
				'control_svg' => file_get_contents( MESSIA_CORE_ABSPATH . '/assets/images/svg/facebook.svg' ), // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
				'type'        => 'text',
				'init'        => null,
			],
			'control_facebook_app_secret_key'             => [
				'id'          => 'facebook_app_secret_key',
				'name'        => 'facebook_app_secret_key',
				'placeholder' => '104456bf1c77879b0ea5357b7534f933',
				'title'       => __( 'Facebook App Secret Key', 'messia' ),
				// translators: %s - html tag a.
				'tip'         => sprintf( __( 'Facebook App allows visitors to login to your website using Facebook account. Leave ID and secret blank if not required. Get the app\'s data %s.', 'messia' ), '<a target="_blank" href="https://developers.facebook.com/apps/">' . __( 'Here', 'messia' ) . '</a>' ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => null,
			],
			'control_yandex_app_id'                       => [
				'id'          => 'yandex_app_id',
				'name'        => 'yandex_app_id',
				'placeholder' => 'f968499349673ffd88cd35843b604a12',
				'title'       => __( 'Yandex App ID', 'messia' ),
				// translators: %s html tag a.
				'tip'         => sprintf( __( 'Yandex App allows visitors to login to your website using Yandex account. Leave ID and secret blank if not required. Get the app\'s data %s.', 'messia' ), '<a target="_blank" href="https://oauth.yandex.ru/client/new/">' . __( 'Here', 'messia' ) . '</a>' ),
				'disable'     => false,
				'control_svg' => file_get_contents( MESSIA_CORE_ABSPATH . '/assets/images/svg/yandex.svg' ), // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
				'type'        => 'text',
				'init'        => null,
			],
			'control_yandex_app_secret_key'               => [
				'id'          => 'yandex_app_secret_key',
				'name'        => 'yandex_app_secret_key',
				'placeholder' => '56d9d5cadf732a4c843c4c89fc87093c',
				'title'       => __( 'Yandex app secret key', 'messia' ),
				// translators: %s - html tag a.
				'tip'         => sprintf( __( 'Yandex App allows visitors to login to your website using Yandex account. Leave ID and secret blank if not required. Get the app\'s data %s.', 'messia' ), '<a target="_blank" href="https://oauth.yandex.ru/client/new/">' . __( 'Here', 'messia' ) . '</a>' ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => null,
			],
			'control_vkontakte_app_id'                    => [
				'id'          => 'vkontakte_app_id',
				'name'        => 'vkontakte_app_id',
				'placeholder' => null,
				'title'       => __( 'VK App ID', 'messia' ),
				'tip'         => null,
				'disable'     => false,
				'control_svg' => file_get_contents( MESSIA_CORE_ABSPATH . '/assets/images/svg/vkontakte.svg' ), // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
				'type'        => 'text',
				'init'        => null,
			],
			'control_vkontakte_app_secret_key'            => [
				'id'          => 'vkontakte_app_secret_key',
				'name'        => 'vkontakte_app_secret_key',
				'placeholder' => null,
				'title'       => __( 'VK App Secret Key', 'messia' ),
				// translators: %s - html tag a.
				'tip'         => sprintf( __( 'VK app allows visitors to login to your web site using VK account. Leave ID and secret blank if not required. Get the app\'s data %s.', 'messia' ), '<a target="_blank" href="https://oauth.yandex.ru/client/new/">' . __( 'Here', 'messia' ) . '</a>' ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => null,
			],
			'control_substitute_rating_by_site_rating'    => [
				'id'      => 'substitute_rating_by_site_rating',
				'name'    => 'substitute_rating_by_site_rating',
				'title'   => __( 'Override visitor ratings', 'messia' ),
				'tip'     => __( 'Override average visitor rating with the rating set by website adinistrator.', 'messia' ),
				'disable' => false,
				'class'   => [ 'messia-core-toggle' ],
				'descr'   => false,
				'type'    => 'checkbox',
				'init'    => 0,
				'licence' => true,
			],
			'control_site_rating_terms'                   => [
				'id'       => 'site_rating_terms',
				'name'     => 'site_rating_terms',
				'title'    => __( 'Object rating criteria', 'messia' ),
				'tip'      => __( 'You can set rating of any object based on these criteria. The rating of each object will be calculated automatically as the arithmetic average of the criteria values.', 'messia' ),
				'type'     => 'callback',
				'callable' => [ 'Smartbits\Messia\Includes\Admin\Messia_User_Settings', 'site_rating_terms' ],
				'args'     => [],
				'init'     => wp_json_encode( [] ),
			],
			'control_comment_current_year_date_format'    => [
				'id'          => 'comment_current_year_date_format',
				'name'        => 'comment_current_year_date_format',
				'placeholder' => __( 'Valid PHP format characters', 'messia' ),
				'title'       => __( 'Current year date format', 'messia' ),
				// translators: %s - URL.
				'tip'         => sprintf( __( 'Will be used to show comment date if it belongs to current year. You can use the table of Date and Time format characters %s.', 'messia' ), '<a target="_blank" href="http://php.net/date">' . __( 'directly from the PHP website', 'messia' ) . '</a>' ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => 'M j',
			],
			'control_seo_placeholders'                    => [
				'title'    => __( 'SEO placeholders', 'messia' ),
				'tip'      => __( 'List of placeholders supported by Messia theme. Not editable.', 'messia' ),
				'type'     => 'callback',
				'callable' => [ 'Smartbits\Messia\Includes\Admin\Messia_User_Settings', 'menu_item_seo_placeholders' ],
				'args'     => [],
				'init'     => null,
			],
			'control_custom_root_htaccess_content'        => [
				'id'          => 'custom_root_htaccess_content',
				'name'        => 'custom_root_htaccess_content',
				'title'       => __( 'Custom .htaccess Content', 'messia' ),
				'placeholder' => __( 'Type any valid Apache/Nginx code', 'messia' ),
				'class'       => [ 'messia-codemirror-sticky' ],
				'tip'         => __( 'The field value will be appended to .htacces file in root of the site folder, if it does not exist it will be created.', 'messia' ),
				'disable'     => false,
				'type'        => 'textarea',
				'data'        => [
					'code-language' => 'nginx',
				],
				'init'        => "<IfModule mod_headers.c>\n\t<FilesMatch '.(png|jpe?g|js|css|svg|webp)$'>\n\t\tHeader set Cache-Control 'max-age=31536000, public'\n\t</FilesMatch>\n\t<FilesMatch 'messia-worker.js'>\n\t\tHeader set Cache-Control 'max-age=0, no-cache, no-store, must-revalidate'\n\t\tHeader set Pragma 'no-cache'\n\t\tHeader set Service-Worker-Allowed /\n\t</FilesMatch>\n</IfModule>",
			],
			'control_css_critical_home'                   => [
				'id'          => 'css_critical_home',
				'name'        => 'css_critical_home',
				'title'       => esc_html__( 'Critical CSS for home page', 'messia' ),
				'placeholder' => __( 'Type any valid CSS code', 'messia' ),
				'class'       => [ 'messia-codemirror-sticky' ],
				// translators: %1$s and %2$s - html code.
				'tip'         => sprintf( __( 'This code will be rendered inline at the very beginning of the head tag. More info in %s.', 'messia' ), str_replace( '%s%', 'messia_seo_page_help', self::$help_html ) ),
				'disable'     => false,
				'type'        => 'textarea',
				'data'        => [
					'code-language' => 'css',
				],
				'init'        => null,
			],
			'control_css_critical_object'                 => [
				'id'          => 'css_critical_object',
				'name'        => 'css_critical_object',
				'title'       => esc_html__( 'Critical CSS for object page', 'messia' ),
				'placeholder' => __( 'Type any valid CSS code', 'messia' ),
				'class'       => [ 'messia-codemirror-sticky' ],
				// translators: %1$s and %2$s - html code.
				'tip'         => sprintf( __( 'This code will be rendered inline at the very beginning of the head tag. More info in %s.', 'messia' ), str_replace( '%s%', 'messia_seo_page_help', self::$help_html ) ),
				'disable'     => false,
				'type'        => 'textarea',
				'data'        => [
					'code-language' => 'css',
				],
				'init'        => null,
			],
			'control_css_critical_search'                 => [
				'id'          => 'css_critical_search',
				'name'        => 'css_critical_search',
				'title'       => esc_html__( 'Critical CSS for search page', 'messia' ),
				'placeholder' => __( 'Type any valid CSS code', 'messia' ),
				'class'       => [ 'messia-codemirror-sticky' ],
				// translators: %1$s and %2$s - html code.
				'tip'         => sprintf( __( 'This code will be rendered inline at the very beginning of the head tag. More info in %s.', 'messia' ), str_replace( '%s%', 'messia_seo_page_help', self::$help_html ) ),
				'disable'     => false,
				'type'        => 'textarea',
				'data'        => [
					'code-language' => 'css',
				],
				'init'        => null,
			],
			'control_scripts_load_async'                  => [
				'id'      => 'scripts_load_async',
				'name'    => 'scripts_load_async',
				'title'   => __( 'Async load JS Scripts', 'messia' ),
				// translators: %1$s, %2$s - html tags.
				'tip'     => sprintf( __( 'Add attribute %1$sdefer%2$s to all JS scripts with non-empty attribute src. Speed up page load but may cause errors.', 'messia' ), '<span class="wparam">', '</span>' ),
				'disable' => false,
				'class'   => [ 'messia-core-toggle' ],
				'descr'   => false,
				'type'    => 'checkbox',
				'init'    => 1,
			],
			'control_styles_load_async'                   => [
				'id'      => 'styles_load_async',
				'name'    => 'styles_load_async',
				'title'   => __( 'Async load CSS Styles', 'messia' ),
				// translators: %1$s, %2$s - html tags.
				'tip'     => sprintf( esc_html__( 'Add attribute %1$srel=\'preload\'%2$s and %1$sas=\'style\'%2$s to all CSS styles with non-empty attribute src. Speed up page load but may cause blinking content.', 'messia' ), '<span class="wparam">', '</span>' ),
				'disable' => false,
				'class'   => [ 'messia-core-toggle' ],
				'descr'   => false,
				'type'    => 'checkbox',
				'init'    => 1,
			],
			'control_merge_css'                           => [
				'id'      => 'merge_css',
				'name'    => 'merge_css',
				'title'   => __( 'Merge CSS files', 'messia' ),
				'tip'     => __( 'All CSS files that are needed to display your website will be combined on the fly into one file and moved to footer. Use with caution.', 'messia' ),
				'disable' => false,
				'class'   => [ 'messia-core-toggle' ],
				'descr'   => false,
				'type'    => 'checkbox',
				'init'    => 0,
			],
			'control_merge_js'                            => [
				'id'      => 'merge_js',
				'name'    => 'merge_js',
				'title'   => __( 'Merge JS files', 'messia' ),
				'tip'     => __( 'All Javascript files that are needed to display your website will be combined on the fly into one file and moved to footer. Use with caution.', 'messia' ),
				'disable' => false,
				'class'   => [ 'messia-core-toggle' ],
				'descr'   => false,
				'type'    => 'checkbox',
				'init'    => 0,
			],
			'control_homepage_template_file'              => [
				'id'           => 'homepage_template_file',
				'name'         => 'homepage_template_file',
				'title'        => __( 'Template for Home page', 'messia' ),
				'default'      => [ self::$template_files_homepage['default_value'] => self::$template_files_homepage['default'] ],
				'tip'          => null,
				'disable'      => false,
				'type'         => 'select',
				'select_multi' => false,
				'options'      => self::$template_files_homepage['options'],
				'init'         => self::$template_files_homepage['default_value'],
			],
			'control_object_template_file'                => [
				'id'           => 'object_template_file',
				'name'         => 'object_template_file',
				'title'        => __( 'Template for Object page', 'messia' ),
				'default'      => [ self::$template_files_object['default_value'] => self::$template_files_object['default'] ],
				'tip'          => null,
				'disable'      => false,
				'type'         => 'select',
				'select_multi' => false,
				'options'      => self::$template_files_object['options'],
				'init'         => self::$template_files_object['default_value'],
			],
			'control_listing_template_file'               => [
				'id'           => 'listing_template_file',
				'name'         => 'listing_template_file',
				'title'        => __( 'Template for Search Page', 'messia' ),
				'default'      => [ self::$template_files_listing['default_value'] => self::$template_files_listing['default'] ],
				'tip'          => null,
				'disable'      => false,
				'type'         => 'select',
				'select_multi' => false,
				'options'      => self::$template_files_listing['options'],
				'init'         => self::$template_files_listing['default_value'],
			],
			'control_archive_template_file'               => [
				'id'           => 'archive_template_file',
				'name'         => 'archive_template_file',
				'title'        => __( 'Template for Archive page', 'messia' ),
				'default'      => [ self::$template_files_archive['default_value'] => self::$template_files_archive['default'] ],
				'tip'          => null,
				'disable'      => false,
				'type'         => 'select',
				'select_multi' => false,
				'options'      => self::$template_files_archive['options'],
				'init'         => self::$template_files_archive['default_value'],
			],
			'control_page_template_file'                  => [
				'id'           => 'page_template_file',
				'name'         => 'page_template_file',
				'title'        => __( 'Template for Regular page', 'messia' ),
				'default'      => [ self::$template_files_page['default_value'] => self::$template_files_page['default'] ],
				'tip'          => null,
				'disable'      => false,
				'type'         => 'select',
				'select_multi' => false,
				'options'      => self::$template_files_page['options'],
				'init'         => self::$template_files_page['default_value'],
			],
			'control_single_template_file'                => [
				'id'           => 'single_template_file',
				'name'         => 'single_template_file',
				'title'        => __( 'Template for Single page', 'messia' ),
				'default'      => [ self::$template_files_single['default_value'] => self::$template_files_single['default'] ],
				'tip'          => null,
				'disable'      => false,
				'type'         => 'select',
				'select_multi' => false,
				'options'      => self::$template_files_single['options'],
				'init'         => self::$template_files_single['default_value'],
			],
			'control_debugger'                            => [
				'id'      => 'debugger',
				'name'    => 'debugger',
				'title'   => __( 'Debugger', 'messia' ),
				'tip'     => __( 'Enabling this option will let you see notifications and error messages on your website. Will be shown only to logged in administarators.', 'messia' ),
				'disable' => false,
				'class'   => [ 'messia-core-toggle' ],
				'descr'   => false,
				'type'    => 'checkbox',
				'init'    => 0,
			],
			'control_ajax_dispatcher'                     => [
				'id'      => 'ajax_dispatcher',
				'name'    => 'ajax_dispatcher',
				'title'   => __( 'Ajax Dispatcher', 'messia' ),
				'tip'     => __( 'Enabling this option will deactivate plugins during query execution accordancing to internal settings and reduce server response time.', 'messia' ),
				'disable' => false,
				'class'   => [ 'messia-core-toggle' ],
				'descr'   => false,
				'type'    => 'checkbox',
				'init'    => 0,
			],
			'control_ajax_dispatcher_log'                 => [
				'id'      => 'ajax_dispatcher_log',
				'name'    => 'ajax_dispatcher_log',
				'title'   => __( 'Dispatcher Log', 'messia' ),
				'tip'     => __( 'To check the settings of the dispatcher, you can enable logging of his work. This option is taken into account only when Ajax Dispatcher is enabled.', 'messia' ),
				'disable' => false,
				'class'   => [ 'messia-core-toggle' ],
				'descr'   => false,
				'type'    => 'checkbox',
				'init'    => 0,
			],
			/*
			'control_callback_tab_colontitles' => [
				'type'     => 'callback',
				'callable' => [ 'Smartbits\Messia\Includes\Admin\Messia_User_Settings', 'tab_colontitles' ],
				'args'     => [ 1 ],
			],
			*/
			'control_pwa_enable'                          => [
				'id'      => 'pwa_enable',
				'name'    => 'pwa_enable',
				'title'   => __( 'Enable PWA', 'messia' ),
				// translators: %s - html code.
				'tip'     => sprintf( __( 'Be sure your site uses HTTPS protocol, otherwise PWA will not work. More info in %s.', 'messia' ), str_replace( '%s%', 'pwa_help', self::$help_html ) ),
				'disable' => false,
				'class'   => [ 'messia-core-toggle' ],
				'descr'   => false,
				'type'    => 'checkbox',
				'init'    => 0,
				'licence' => true,
			],
			'control_manifest_starturl'                   => [
				'id'          => 'manifest_starturl',
				'name'        => 'manifest_starturl',
				'placeholder' => __( 'URL path relative to current domain', 'messia' ),
				'title'       => __( 'Start URL', 'messia' ),
				'tip'         => __( 'The page on which the application will start. Should be inside current site domain.', 'messia' ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => get_home_url(),
			],
			'control_manifest_shortname'                  => [
				'id'          => 'manifest_shortname',
				'name'        => 'manifest_shortname',
				'placeholder' => __( '(maximum of 12 characters)', 'messia' ),
				'title'       => __( 'App short name', 'messia' ),
				'tip'         => __( 'The short_name (maximum of 12 characters recommended) is a short version of the App`s name. It is an optional field and if not specified, the name will be used, though it will likely be truncated. The short name is typically used where there is insufficient space to display the full name, such as App launcher.', 'messia' ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => 'Messia',
			],
			'control_manifest_name'                       => [
				'id'          => 'manifest_name',
				'name'        => 'manifest_name',
				'placeholder' => __( '(maximum of 45 characters)', 'messia' ),
				'title'       => __( 'App name', 'messia' ),
				'tip'         => __( 'The name (maximum of 45 characters) is the primary identifier of the application and is a required field. It is displayed in Install dialog.', 'messia' ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => 'Listing & Directory',
			],
			'control_manifest_description'                => [
				'id'          => 'manifest_description',
				'name'        => 'manifest_description',
				'placeholder' => __( 'Any text', 'messia' ),
				'title'       => __( 'App description', 'messia' ),
				'tip'         => __( 'This text should explain what this app do and was created for.', 'messia' ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => 'WP Theme for creating fast and optimazed Listing & Directory sites',
			],
			'control_manifest_theme_color'                => [
				'id'          => 'manifest_theme_color',
				'name'        => 'manifest_theme_color',
				'placeholder' => false,
				'title'       => __( 'Theme color', 'messia' ),
				'class'       => [ 'color-picker' ],
				'tip'         => __( 'Theme color defines the default theme color for the application. This sometimes affects how the OS displays the site (e.g., on Android`s task switcher, the theme color surrounds the site).', 'messia' ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => '#286dae',
			],
			'control_manifest_background_color'           => [
				'id'          => 'manifest_background_color',
				'name'        => 'manifest_background_color',
				'placeholder' => false,
				'title'       => __( 'Background color', 'messia' ),
				'class'       => [ 'color-picker' ],
				'tip'         => __( 'Therefore background_color should match the background-color CSS property in the site`s stylesheet for a smooth transition between launching the web application and loading the site`s content.', 'messia' ),
				'disable'     => false,
				'type'        => 'text',
				'init'        => '#fff',
			],
			'control_theme_licence_data'                  => [
				'id'       => 'theme_licence_data',
				'name'     => 'theme_licence_data',
				'title'    => __( 'Theme licence', 'messia' ),
				// translators: %1$s - html tag a, %2$s - html tag a.
				'tip'      => sprintf( __( 'Enter the key you received when purchasing the theme. Save canges and activate the key. Key can be found in %1$s. More info in %2$s.', 'messia' ), '<a target="_blank" href="' . MESSIA_SHOP_MY_ACCOUNT_URL . '">' . __( 'My account', 'messia' ) . '</a>', str_replace( '%s%', 'messia_licence_help', self::$help_html ) ),
				'type'     => 'callback',
				'callable' => [ 'Smartbits\Messia\Includes\Modules\Theme\Messia_Update', 'admin_interface' ],
				'args'     => [],
				'init'     => wp_json_encode(
					[
						'licence_key'    => null,
						'licence_status' => 'inactive',
					]
				),
			],
			'control_theme_support_access'                => [
				'id'       => 'theme_support_access',
				'name'     => 'theme_support_access',
				'title'    => __( 'Support access', 'messia' ),
				'tip'      => sprintf(
					// translators: %1$s - time string.
					__( 'You can grant temporary access to the site to members of the support team here. Access duration is calculated relative to server time, that now has: %1$s', 'messia' ),
					wp_date( get_option( 'date_format' ) . ' ' . get_option( 'time_format' ) )
				),
				'type'     => 'callback',
				'callable' => [ 'Smartbits\Messia\Includes\Modules\Theme\Messia_Access', 'admin_interface' ],
				'args'     => [],
				'init'     => wp_json_encode(
					[
						'access_valid_until' => false,
					]
				),
			],
		];
	}

	/**
	 * Fill tabs controls and create final config.
	 *
	 * @return array
	 */
	private static function get_tabs_standalone(): array {

		$tabs = [
			'site'        => self::$tabs->tab_site,
			'homepage'    => self::$tabs->tab_homepage,
			'searchpage'  => self::$tabs->tab_searchpage,
			'objectpage'  => self::$tabs->tab_objectpage,
			'services'    => self::$tabs->tab_services,
			'comments'    => self::$tabs->tab_comments,
			'seo'         => self::$tabs->tab_seo,
			'development' => self::$tabs->tab_development,
			'pwa'         => self::$tabs->tab_pwa,
			'site'        => self::$tabs->tab_site,
		];

		$tabs['site']['controls'] = [
			self::$sections->section_fonts,
			self::$controls->control_use_google_meterial_icons,
			self::$controls->control_fontawesome_kit_name,
			self::$controls->control_google_fonts_api_key,
			self::$controls->control_font_body,
			self::$controls->control_font_h1,
			self::$controls->control_font_h2,
			self::$controls->control_font_h3,
			self::$controls->control_font_h4,
			self::$controls->control_font_h5,
			self::$controls->control_font_h6,
			self::$controls->control_font_nav_menu_main,
			self::$sections->section_colors,
			self::$controls->control_nav_items_color,
			self::$controls->control_nav_items_color_interaction,
			self::$controls->control_controls_color_initial,
			self::$controls->control_controls_color_initial_inner,
			self::$controls->control_controls_color_interaction,
			self::$controls->control_controls_color_interaction_inner,
			self::$sections->section_header,
			self::$controls->control_header_top_text_color,
			self::$controls->control_header_top_background_color,
			self::$controls->control_header_top_navmenu_pills,
			self::$controls->control_header_top_hide_itself,
			self::$controls->control_add_in_header,
			self::$sections->section_page,
			self::$controls->control_page_title_title_color,
			self::$controls->control_page_title_subtitle_color,
			self::$controls->control_page_title_background_color,
			self::$controls->control_page_title_background_image,
			self::$controls->control_page_title_breadcrumbs_background_color,
			self::$controls->control_page_title_hide_title,
			self::$controls->control_page_title_hide_breadcrumbs,
			self::$sections->section_content,
			self::$controls->control_sidebar_position,
			self::$controls->control_wp_post_smooth_update,
			self::$controls->control_animated_cards_appearance,
			self::$controls->control_object_card_bubble_hover,
			self::$controls->control_object_card_background_color,
			self::$controls->control_object_card_bubble_hover_color,
			self::$sections->section_footer,
			self::$controls->control_footer_top_text_color,
			self::$controls->control_footer_top_background_color,
			self::$controls->control_footer_bottom_text_color,
			self::$controls->control_footer_bottom_background_color,
			self::$controls->control_footer_bottom_hide_itself,
			self::$controls->control_add_in_footer,
		];

		$tabs['homepage']['controls'] = [
			self::$controls->control_homepage_hero_image,
			self::$controls->control_homepage_hero_content,
		];

		$tabs['searchpage']['controls'] = [
			self::$controls->control_default_segment,
			self::$controls->control_complete_category_terms_chain,
			self::$controls->control_root_category_terms_required,
			self::$controls->control_messia_object_category_empty_terms_to_filter,
			self::$controls->control_messia_object_property_empty_terms_to_filter,
			self::$controls->control_listing_use_canonical_url,
			self::$controls->control_property_url_position,
			self::$controls->control_objects_per_pocket,
			self::$controls->control_objects_search_order,
			self::$controls->control_property_groups,
			self::$controls->control_property_groups_initially_collapsed,
		];

		$tabs['objectpage']['controls'] = [
			self::$controls->control_object_page_title,
			self::$controls->control_object_page_description,
			self::$controls->control_object_page_h1,
		];

		$tabs['services']['controls'] = [
			self::$controls->control_slack_module_alert,
			self::$controls->control_google_analytics_id,
			self::$controls->control_google_maps_api_key,
			self::$controls->control_google_captcha_v3_public_key,
			self::$controls->control_google_captcha_v3_secret_key,
			// @indev. Once ready - also uncomment responsible class instantiation in Messia_Core class (class that operats with these keys).
			// self::$controls->control_google_app_id,
			// self::$controls->control_google_app_secret_key,
			// self::$controls->control_facebook_app_id,
			// self::$controls->control_facebook_app_secret_key,
			// self::$controls->control_yandex_app_id,
			// self::$controls->control_yandex_app_secret_key,
			// self::$controls->control_vkontakte_app_id,
			// self::$controls->control_vkontakte_app_secret_key,
		];

		$tabs['comments']['controls'] = [
			self::$controls->control_substitute_rating_by_site_rating,
			self::$controls->control_site_rating_terms,
			self::$controls->control_comment_current_year_date_format,
		];

		$tabs['seo']['controls'] = [
			self::$controls->control_seo_placeholders,
			self::$controls->control_custom_root_htaccess_content,
			self::$controls->control_css_critical_home,
			self::$controls->control_css_critical_object,
			self::$controls->control_css_critical_search,
			self::$controls->control_scripts_load_async,
			self::$controls->control_styles_load_async,
			self::$controls->control_merge_css,
			self::$controls->control_merge_js,
		];

		$tabs['development']['controls'] = [
			self::$controls->control_homepage_template_file,
			self::$controls->control_object_template_file,
			self::$controls->control_listing_template_file,
			self::$controls->control_archive_template_file,
			self::$controls->control_page_template_file,
			self::$controls->control_single_template_file,
			self::$controls->control_debugger,
			self::$controls->control_ajax_dispatcher,
			self::$controls->control_ajax_dispatcher_log,
			// self::$controls->control_callback_tab_colontitles,
		];

		$tabs['pwa']['controls'] = [
			self::$controls->control_pwa_enable,
			self::$controls->control_manifest_starturl,
			self::$controls->control_manifest_shortname,
			self::$controls->control_manifest_name,
			self::$controls->control_manifest_description,
			self::$controls->control_manifest_theme_color,
			self::$controls->control_manifest_background_color,
		];

		if ( ! is_multisite() ) {
			$tabs['support'] = self::$tabs->tab_support;

			$tabs['support']['controls'] = [
				self::$controls->control_theme_licence_data,
				self::$controls->control_theme_support_access,
			];
		}

		foreach ( $tabs as $key => $value ) {
			$tabs[ $key ]['id'] = $key;
		}

		return $tabs;
	}

	/**
	 * Fill tabs controls and create final config.
	 *
	 * @return array
	 */
	private static function get_tabs_network(): array {

		$tabs = [];

		if ( is_multisite() ) {
			$tabs = [
				'support' => self::$tabs->tab_support,
			];

			$tabs['support']['controls'] = [
				self::$controls->control_theme_licence_data,
				self::$controls->control_theme_support_access,
			];
		}

		foreach ( $tabs as $key => $value ) {
			$tabs[ $key ]['id'] = $key;
		}

		return $tabs;
	}

	/**
	 * Config compiler.
	 *
	 * @return void
	 */
	private static function init_config(): void {
		if ( is_null( self::$config ) ) {
			self::init();
			self::build_config();
		}
	}

	/**
	 * Fill tabs controls and create final config.
	 *
	 * @return void
	 */
	private static function build_config(): void {

		self::$config = [
			'standalone' => [
				'page_title'     => __( 'Messia Settings', 'messia' ),
				'warning'        => false, // set to string that will be shown instead of hole menu.
				'menu_name'      => __( 'Messia', 'messia' ),
				'page_slug'      => MESSIA_THEME_MENU_PAGE_SLUG,
				'page_h2'        => __( 'Messia settings management', 'messia' ),
				'capability'     => 'manage_options',
				'setting_preset' => MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME,
				'dashicons'      => 'dashicons-screenoptions',
				'priority'       => 110,
				'active_tab'     => 0, // The zero-based index of the panel that is active (open).
				// Being updated on each save directly.
				'stuff_settings' => [
					'version'                 => '1.0.0',
					'ajax_dispatcher_version' => '1.0.0', // Only initial value, will be updated with annotation Version value in Messia_Wp_Ajax_Dispatcher::CLASS.
					'last_modified'           => false,
				],
				// Being updated once only if key does not exists.
				'init_settings'  => [
					'widgets_state' => false,
					'query_order'   => [ 'search', 'sort', 'list', 'prop', 'cf' ],
				],
				'tabs'           => self::get_tabs_standalone(),
			],
			'network'    => [
				'page_title'     => __( 'Messia Network Settings', 'messia' ),
				'warning'        => false, // set to string that will be shown instead of hole menu.
				'menu_name'      => __( 'Messia', 'messia' ),
				'page_slug'      => MESSIA_THEME_MENU_PAGE_SLUG,
				'page_h2'        => __( 'Messia network settings management', 'messia' ),
				'capability'     => 'manage_options',
				'setting_preset' => MESSIA_THEME_SITE_SETTINGS_PRESET_NAME,
				'dashicons'      => 'dashicons-screenoptions',
				'priority'       => 110,
				'active_tab'     => 0, // The zero-based index of the panel that is active (open).
				// Being updated on each save directly.
				'stuff_settings' => [
					'version'       => '1.0.0',
					'last_modified' => false,
				],
				// Being updated once only if key does not exists.
				'init_settings'  => [],
				'tabs'           => self::get_tabs_network(),
			],
		];

		self::validate_duplicates();
	}

	/**
	 * Final configuration getter.
	 *
	 * @return array
	 */
	public static function get_config(): array {

		self::init_config();
		return apply_filters( 'messia_settings', self::$config );
	}

	/**
	 * Simple search like sql 'select where' in array of controls
	 * by controls key's value.
	 *
	 * @param array $conditions Key-value pairs to search for.
	 *
	 * @return array
	 */
	public static function find_controls_by( $conditions ): array {
		$found = [];

		self::init_config();

		foreach ( self::$controls as $control ) {
			$intersected_keys   = array_intersect_key( $control, $conditions );
			$intersected_values = array_intersect( $intersected_keys, $conditions );

			if ( count( $intersected_keys ) < count( $conditions ) ) {
				continue;
			}
			if ( count( $intersected_values ) < count( $conditions ) ) {
				continue;
			}

			$found[] = $control;
		}

		return $found;
	}

	/**
	 * Checks the configuration settings for
	 * duplicate keys and duplicate service keys.
	 *
	 * @return void
	 * @throws Exception In case of violations.
	 */
	private static function validate_duplicates(): void {

		$duplicates = [];
		foreach ( self::$config as $type => $type_config ) {

			$names = array_keys( $type_config['stuff_settings'] );
			foreach ( $type_config['tabs'] as $tab_id => $tab_value ) {
				foreach ( $tab_value['controls'] as $control ) {
					if ( isset( $control['name'] ) ) {
						$names[] = $control['name'];
					}
				}
			}

			$duplicates[ $type ] = array_filter(
				array_count_values( $names ),
				function( $n ) {
					return $n > 1;
				}
			);
		}

		if ( empty( $duplicates ) ) {
			return;
		}

		$msg = [];
		foreach ( $duplicates as $type => $controls ) {
			if ( empty( $controls ) ) {
				continue;
			}

			$msg[] = "Config of type \"{$type}\" contains duplicated field name key(s): " . '"' . implode( '", "', array_keys( $controls ) ) . '"';
		}

		if ( empty( $msg ) ) {
			return;
		}

		throw new Exception( 'Duplicated keys! ' . implode( '; ', $msg ) );
	}
}
