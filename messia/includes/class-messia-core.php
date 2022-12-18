<?php
/**
 * Messia Core
 *
 * @package Messia
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped

declare(strict_types = 1);

namespace Smartbits\Messia\Includes;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Exception;
use stdClass;
use Smartbits\Messia\Includes\{
	Messia_Autoloader,
	Messia_Comments,
	Messia_Merging,
	Messia_Shortcodes,
	Messia_Requirements,
};

use Smartbits\Messia\Includes\Helpers\{
	Messia_Help,
	Messia_Object_Card,
};

use Smartbits\Messia\Includes\Config\{
	Messia_Settings,
	Messia_Scripts,
};

use Smartbits\Messia\Includes\Modules\{
	Hooks\Messia_Hooks,
	Theme\Messia_Template_Loader,
	Theme\Messia_Update,
	Theme\Messia_Access,
	Cpt\Messia_Cpt_Config,
	Cpt\Messia_Cpt,
	Cpt\Messia_Objects,
	Rest\Messia_Rest_API,
	Users\Messia_User_Roles,
	Listing\Messia_Listing,
	Listing\Skins\Messia_Listing_Tmpl_Base,
	Objects\Skins\Messia_Object_Tmpl_Base,
	Widgets\Messia_Widget,
	Blocks\Messia_Block_Blocks,
	Messia_Module_Base,
};

/**
 * Main Messia class - entry point.
 *
 * @package Messia
 */
final class Messia_Core {

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Requirements
	 */
	private Messia_Requirements $requirements;

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Merging
	 */
	private Messia_Merging $merging;

	/**
	 * The class itself.
	 *
	 * @var Messia_Object_Card
	 */
	private string $object_card;

	/**
	 * Full class name.
	 *
	 * @var Messia_Help
	 */
	private string $help;

	/**
	 * Full class name.
	 *
	 * @var Messia_Template_Loader
	 */
	private string $template_loader;

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_User_Roles
	 */
	private Messia_User_Roles $user_roles;

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Comments
	 */
	private Messia_Comments $comments;

	/**
	 * The instance of the class.
	 *
	 * @var Messia_Update
	 */
	private Messia_Update $messia_update;

	/**
	 * The instance of the class.
	 *
	 * @var Messia_Access
	 */
	private string $messia_access;

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Rest_API
	 */
	private Messia_Rest_API $rest;

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Settings
	 */
	private Messia_Settings $settings;

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Autoloader
	 */
	private Messia_Autoloader $autoloader;

	/**
	 * Full class name.
	 *
	 * @var Messia_Scripts
	 */
	private string $scripts;

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Hooks
	 */
	private Messia_Hooks $core_hooks;

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Widget
	 */
	private Messia_Widget $widgets;

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Cpt_Config
	 */
	private Messia_Cpt_Config $cpt_config;

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Cpt
	 */
	private Messia_Cpt $cpt;

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Objects
	 */
	private Messia_Objects $messia_objects;

	/**
	 * The single instance of the class
	 * of current template
	 *
	 * @var Messia_Listing_Tmpl_XXX
	 */
	private ?Messia_Listing_Tmpl_Base $listing = null; // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

	/**
	 * The single instance of the class
	 * of current template
	 *
	 * @var Messia_Object_Tmpl_XXX
	 */
	private ?Messia_Object_Tmpl_Base $object = null; // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

	/**
	 * The single instance of the class
	 * of regular page template
	 *
	 * @var mixed Depends on current post type.
	 */
	private ?Messia_Module_Base $page = null; // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

	/**
	 * Full class name.
	 *
	 * @var Messia_Shortcodes
	 */
	private string $shortcodes;

	/**
	 * The instance of the class.
	 *
	 * @var Messia_Block_Blocks
	 */
	private Messia_Block_Blocks $blocks;

	/**
	 * This values can not be used as
	 * slugs for property taxonomy terms.
	 *
	 * @var array
	 */
	private array $reserved_terms;

	/**
	 * Store user values of SEO string for listing and object pages.
	 *
	 * @var array
	 */
	private array $seo_templates;

	/**
	 * Store dynamic SEO variables with it's callbacks and default values.
	 *
	 * @var array
	 */
	private array $seo_placeholders;

	/**
	 * Cookie is a cookie. Now stores view mode for listing page.
	 *
	 * @var stdClass
	 */
	private stdClass $cookie;

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Core
	 */
	private static ?Messia_Core $instance = null; // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

	/**
	 * Messia_Core Constructor.
	 */
	private function init() {

		// TODO - move "load_theme_textdomain" to the event "after_setup_theme".
		load_theme_textdomain( 'messia', MESSIA_THEME_DIR . '/includes/assets/langs' );

		$this->setup_reserved_terms();
		$this->define_constants();
		$this->set_cookie();
		$this->includes();
		$this->instantiate();
		$this->init_hooks();
		$this->ajax_hooks();
	}

	/**
	 * Main Messia_Core Instance.
	 * Ensures only one instance of Messia_Core is loaded or can be loaded.
	 *
	 * @return Messia_Core Main instance.
	 */
	public static function instance(): Messia_Core {

		if ( is_null( self::$instance ) ) {

			self::$instance = new self();
			self::$instance->init();

			/**
			 * Fire after messia core instantiated.
			 *
			 * @hook messia_core_init
			 */
			do_action( 'messia_core_init' );
		}
		return self::$instance;
	}

	/**
	 * Set terms slugs in each taxonomy that can not be used by content.
	 *
	 * @return void
	 */
	private function setup_reserved_terms(): void {

		$this->reserved_terms = [
			'messia_object_segment'       => [],
			'messia_object_category'      => [],
			'messia_object_property'      => [
				'sort'   => 'name,asc',
				'search' => null,
				'list'   => 1,
			], // slug => value.
			'messia_object_nomenclature'  => [],
			'messia_object_specification' => [],
		];
	}

	/**
	 * Get reserved terms in $this->setup_reserved_terms().
	 *
	 * @return array
	 */
	public function get_reserved_terms(): array {

		$r = $this->reserved_terms;
		foreach ( $r as &$reserved_terms ) {
			$reserved_terms = array_keys( $reserved_terms );
		}
		return $r;
	}

	/**
	 * Define Messia_Core Constants.
	 */
	private function define_constants(): void {

		$messages = [
			'constructorSlugEdit'   => __( 'You are about to edit the value of the identifier field. Please note that after saving these changes, all object metadata and widget data that refer to the changed field name will be permanently deleted. Continue editing?', 'messia' ),
			'dependantPageDelWarn'  => __( 'The page to be deleted is dependent on the term Taxonomy Segments. You cannot delete it directly; to do this, delete the corresponding term - the page will be deleted automatically.', 'messia' ),
			'dependantPageUpdWarn'  => __( 'This page is dependent on the term Taxonomy Segments. You cannot directly change its slug or name, for this change the corresponding value at the term itself - the page will be synchronized automatically. Also take into account that the title of this page is not displayed on the website. Instead, the value of the meta fields "Tag H1" and "Query result" is displayed. You can edit these fields, however you need to use dynamic variables.', 'messia' ),
			'fillRequiredFields'    => __( 'Please fill in all required fields!', 'messia' ),
			'gFontsFetchErr'        => __( 'Failed to get list of fonts from Google server. Check your API key as well as limit settings for requests.', 'messia' ),
			'invalidListingUrl'     => __( 'Invalid URL', 'messia' ),
			'mediaFrame'            => [
				'errorFontsLoad' => __( 'Fail to load icon fonts.', 'messia' ),
				'errorSetLoad'   => __( 'Fail to load icon set.', 'messia' ),
				'imagesTitle'    => __( 'Select images', 'messia' ),
				'iconsTitle'     => __( 'Select Icons', 'messia' ),
				'materialTab'    => __( 'Material Icons', 'messia' ),
				'imagesButton'   => [
					'text' => __( 'Select image', 'messia' ),
				],
				'iconsButton'    => [
					'text' => __( 'Select icon', 'messia' ),
				],
			],
			'notFound'              => __( 'No results were found for this request.', 'messia' ),
			'postReloadPending'     => __( 'Post will be saved and reloaded to update metaboxes.', 'messia' ),
			// translators: %s - terms slugs.
			'propertySlugReserved'  => sprintf( __( 'For taxonomy Property, reserved values cannot be used in term names - %s', 'messia' ), implode( ',', array_keys( $this->reserved_terms['messia_object_property'] ) ) ),
			'removeDuplicatedSlugs' => __( 'Please rename duplicated slugs!', 'messia' ),
			'requireName'           => __( 'Comment author must specify only name', 'messia' ),
			'segmentAliasSlug'      => __( 'The term alias cannot duplicate its slug. Alias is set to the previous value.', 'messia' ),
			'segmentIsEmpty'        => __( 'Object can be saved only if included in Segment.', 'messia' ),
			'segmentPageAdded'      => __( 'Dependent page is being created, fields of dependent widgets are updated.', 'messia' ),
			// translators: %1$s, %2$s - html tags.
			'segmentPageDeleted'    => sprintf( __( 'Segment page and all its custom fields are deleted, dependent widgets updated. %1$sPay attention!!! You need to assign all objects from deleted segment to another segment to make them visible from outside.%2$s', 'messia' ), '<strong>', '</strong>' ),
			'segmentPageUpdated'    => __( 'Name and slug of dependent page, fields of dependent widgets are updated.', 'messia' ),
			'segmentTermIsReadOnly' => __( 'This term is marked as primary in Messia settings and can not be deleted. You can rename it and use it as a regular term or set another primary term in the theme menu. All objects that are not assigned any segment will be attached to this term.', 'messia' ),
			'selectOptions'         => __( 'Select options', 'messia' ),
			'termsReordered'        => __( 'The order of terms has been updated, please reload the page to see updated results.', 'messia' ),
			'workerUpdate'          => __( 'We have just updated the version of the application! Apply new version now?', 'messia' ),
			'reloadConfirm'         => __( 'You should reload the page to apply the changes. Reload now?', 'messia' ),

		];

		define( 'MESSIA_NAMESPACE_FRONT', 'mccs' );
		define( 'MESSIA_NAMESPACE_ADMIN', 'macs' );
		define( 'MESSIA_LIST_SORT_SEARCH', $this->reserved_terms['messia_object_property'] );
		define( 'MESSIA_MESSAGES', $messages );
		define( 'MESSIA_WP_TEMPLATES_PREFIX', '/wp-templates' );
		define( 'MESSIA_CODEPATH_PREFIX', '/includes' );
		define( 'MESSIA_CODEPATH_PREFIX_CHILD', '/includes' );
		define( 'MESSIA_CORE_ABSPATH', MESSIA_THEME_DIR . MESSIA_CODEPATH_PREFIX ); // e.g.: /wp-content/themes/messia/includes.
		define( 'MESSIA_CORE_ABSPATH_CHILD', MESSIA_THEME_DIR_CHILD . MESSIA_CODEPATH_PREFIX_CHILD ); // e.g.: /wp-content/themes/messia-child/includes.
		define( 'MESSIA_THEME_ABSPATH', dirname( MESSIA_FUNCTIONS_FILE ) . '/' );
		define( 'MESSIA_THEME_VERSION', wp_get_theme()->version );
		define( 'MESSIA_THEME_URL', get_template_directory_uri() );
		define( 'MESSIA_THEME_URL_CHILD', get_stylesheet_directory_uri() );
		define( 'MESSIA_THEME_MENU_PAGE_SLUG', 'messia-blog-settings' );
		define( 'MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME', 'messia_blog_settings_preset' );
		define( 'MESSIA_THEME_SITE_SETTINGS_PRESET_NAME', 'messia_site_settings_preset' );
		define( 'MESSIA_POSTMETA_CONSTRUCTED_PREFIX', '_segment_constructor_term_id_' );
		define( 'MESSIA_POSTMETA_CONSTRUCTED_NAME', MESSIA_POSTMETA_CONSTRUCTED_PREFIX . '%Id%' );
		define( 'MESSIA_POSTMETA_STUFF_NAME', '_stuff_meta_%name%_segment_term_id_%Id%' );
		define( 'MESSIA_SITERATING_NAME', '_messia_site_rating_term_id_%Id%' );
		define( 'MESSIA_THEME_NAMESPACE_BASE', 'Smartbits\Messia' );
		define( 'MESSIA_THEME_NAMESPACE_BASE_CHILD', 'Smartbits\MessiaChild' );
		define( 'MESSIA_DEMO_PACKAGE_COMMENT', 'Messia Demo Package' );
		define( 'MESSIA_SHOP_URL', 'https://messiawp.com' );
		define( 'MESSIA_SHOP_MY_ACCOUNT_URL', MESSIA_SHOP_URL . '/my-account' );
		define( 'MESSIA_SHOP_PRODUCT_ID', 'Messia-Listing-WP-Theme' );
	}

	/**
	 * Include required core files used in admin and on the frontend.
	 */
	private function includes(): void {
		include_once MESSIA_THEME_ABSPATH . 'includes/class-messia-autoloader.php';
	}

	/**
	 * Trigger required for this class actions if current request is AJAX.
	 *
	 * @return void
	 */
	private function ajax_hooks(): void {

		if ( $this->help::messia_doing_ajax() ) {
			$this->setup_seo_templates();
			$this->setup_seo_placeholders();

			$listing = Messia_Listing::instance();
			$this->set_module( 'listing', $listing );
		}
	}

	/**
	 * Enqueue required for this class WP hooks.
	 *
	 * @return void
	 */
	private function init_hooks(): void {

		add_action( 'wp', [ $this, 'setup_seo_templates' ] );
		add_action( 'wp', [ $this, 'setup_seo_placeholders' ] );
		add_action( 'after_setup_theme', [ $this, 'setup_seo_placeholders' ] );
		add_action( 'init', [ $this, 'add_image_sizes' ] );
		add_action( 'after_switch_theme', [ $this, 'setup_default_segment' ] );
		add_action( 'after_setup_theme', [ $this, 'setup_theme' ] );
		add_action( 'admin_notices', [ $this, 'admin_notices' ] );
		add_filter( 'wp_redirect', [ $this, 'on_redirect' ] );
	}

	/**
	 * Callback for WP after_switch_theme action.
	 * Setup single base undeletable term for segement taxonomy if no terms exists yet.
	 *
	 * @return void
	 */
	public function setup_default_segment(): void {
		$segments = $this->help::get_terms_segment();
		if ( empty( $segments ) ) {

			// Messia_Cpt::on_edited_taxonomy() expect it to be setted.
			$_REQUEST['taxonomy'] = 'messia_object_segment';

			$id = wp_insert_term(
				__( 'Default Segment', 'messia' ),
				'messia_object_segment',
				[
					'description' => MESSIA_MESSAGES['segmentTermIsReadOnly'],
					'parent'      => 0,
					'slug'        => 'default-segment',
				]
			);

			MIA()->get_module( 'settings' )->set_blog_setting( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME, [ 'default_segment' => $id['term_id'] ] );
		}
	}

	/**
	 * Getter for base undeletable segment taxonomy term.
	 *
	 * @return WP_Term|array|false
	 */
	public function get_default_segment_term() {

		$blog_settings = $this->settings->get_blog_setting( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME );
		return get_term_by( 'id', $blog_settings['default_segment'], 'messia_object_segment' );
	}

	/**
	 * Callback for WP wp action.
	 * Define all available theme SEO placeholders.
	 *
	 * @return void
	 */
	public function setup_seo_placeholders(): void {
		/*
		 * seo_placeholders are needed twice - for the list in admin menu and for front pages. The front requires the post ID value,
		 * available only after the 'wp' event, so as not to duplicate an array with different values, check the event.
		 */
		$segment_seo    = false;
		$category_seo   = false;
		$current_action = current_action();

		// 'after_setup_theme' happens in front and admin both. We need admin only.
		if ( 'after_setup_theme' === $current_action && ! is_admin() ) {
			return;
		}

		if ( is_singular( 'messia_object' ) || $this->help::is_listing_page() ) {
			$segment_seo  = $this->help::get_segment_seo_for_request();
			$category_seo = $this->help::get_category_seo_for_request();
		}

		$this->seo_placeholders = [
			'{{segment_seo_1}}'  => [
				'title' => __( 'Value of the meta field "SEO 1" Taxonomy Segments relevant to the object in the request.', 'messia' ),
				'clb'   => ( $segment_seo ) ? [ [ $this->help, 'build_seo' ], [ $segment_seo['segment_seo_1'] ] ] : false,
			],
			'{{segment_seo_2}}'  => [
				'title' => __( 'Value of the meta field "SEO 2" Taxonomy Segments relevant to the object in the request.', 'messia' ),
				'clb'   => ( $segment_seo ) ? [ [ $this->help, 'build_seo' ], [ $segment_seo['segment_seo_2'] ] ] : false,
			],
			'{{category_seo_1}}' => [
				'title' => __( 'The value of the meta field "SEO 1" Category taxonomy relevant to the object in the request.', 'messia' ),
				'clb'   => ( $category_seo ) ? [ [ $this->help, 'build_seo' ], [ $category_seo['category_seo_1'] ] ] : false,
			],
			'{{category_seo_2}}' => [
				'title' => __( 'The value of the meta field "SEO 2" Category taxonomy relevant to the object in the request.', 'messia' ),
				'clb'   => ( $category_seo ) ? [ [ $this->help, 'build_seo' ], [ $category_seo['category_seo_2'] ] ] : false,
			],
			'{{object_title}}'   => [
				'title' => __( 'Object Title', 'messia' ),
				'clb'   => [ 'get_the_title', [] ],
			],
			'{{time}}'           => [
				'title' => __( 'Current Time', 'messia' ),
				'clb'   => [ 'date', [ 'H:i:s' ] ],
			],
			'{{date}}'           => [
				'title' => __( 'Current Date', 'messia' ),
				'clb'   => [ 'date', [ 'd-m-Y' ] ],
			],
			'{{domain}}'         => [
				'title' => __( 'Site URL', 'messia' ),
				'clb'   => [ 'get_site_url', [] ],
			],
		];
	}

	/**
	 * Callback for WP wp hook.
	 * Setup current user SEO templates.
	 *
	 * @return void
	 */
	public function setup_seo_templates(): void {

		$blog_settings = $this->settings->get_blog_setting( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME );

		if ( $this->help::messia_doing_ajax( 'get_listing' ) ) {
			// messia_doing_ajax also validate nonce.
			$post_id = (int) sanitize_text_field( $_POST['data']['postid'] ); // phpcs:ignore WordPress.Security.NonceVerification.Missing
		} else {
			$post_id = get_queried_object_id();
		}

		$post_meta = get_post_meta( $post_id, '_page_seo_template', true );

		$this->seo_templates['page_regular'] = $post_meta;
		$this->seo_templates['page_object']  = [
			'seo_title'   => $blog_settings['object_page_h1'],
			'title'       => $blog_settings['object_page_title'],
			'description' => $blog_settings['object_page_description'],
		];
	}

	/**
	 * Instantiate theme modules.
	 *
	 * @return void
	 */
	public function instantiate(): void {

		$heartbeat = ( isset( $_POST['action'] ) && 'heartbeat' === $_POST['action'] && wp_verify_nonce( $_POST['_nonce'], 'heartbeat-nonce' ) ) ? true : false;

		$this->autoloader      = new Messia_Autoloader();
		$this->requirements    = Messia_Requirements::instance();
		$this->settings        = Messia_Settings::instance();
		$this->help            = Messia_Help::init();
		$this->template_loader = Messia_Template_Loader::init();
		$this->scripts         = Messia_Scripts::init();
		$this->cpt_config      = Messia_Cpt_Config::instance();
		$this->cpt             = Messia_Cpt::instance();

		if ( $heartbeat ) {
			return;
		}

		$this->user_roles    = Messia_User_Roles::instance(); // In develop.
		$this->object_card   = Messia_Object_Card::init();
		$this->blocks        = Messia_Block_Blocks::instance();
		$this->cpt_config    = Messia_Cpt_Config::instance();
		$this->cpt           = Messia_Cpt::instance();
		$this->widgets       = Messia_Widget::instance();
		$this->core_hooks    = Messia_Hooks::instance();
		$this->comments      = Messia_Comments::instance();
		$this->messia_access = Messia_Access::init();

		if ( is_admin() || $this->help::wp_doing_rest() ) {
			$this->messia_objects = Messia_Objects::instance();
			$this->messia_update  = new Messia_Update();
		} else {
			// $this->rest    = Messia_Rest_API::instance(); // @indev. Once ready - also uncomment corresponding controls in Messia_Config_Settings class (fields for holding API keys).
			$this->shortcodes = Messia_Shortcodes::init();
			$this->merging    = Messia_Merging::instance();
		}
	}

	/**
	 * Callback for WP init hook.
	 * Define all Messia thumbnail sizes.
	 *
	 * @return void
	 */
	public function add_image_sizes(): void {
		add_image_size( 'messia_term_thumb', 250, 250, true );
		add_image_size( 'messia_card_thumb_s', 310, 210, true );
		add_image_size( 'messia_card_thumb_m', 430, 290, true );
		add_image_size( 'messia_card_thumb_b', 480, 320, true );
		add_image_size( 'messia_gallery_thumb', 84, 84, true );
	}

	/**
	 * Set theme cookie.
	 *
	 * @return void
	 */
	private function set_cookie(): void {

		$default_cookie = (object) [
			'listing_view_mode' => 'grid',
		];

		$view_modes = [
			'grid',
			'list',
			'map',
		];

		if ( isset( $_COOKIE['messia'] ) ) {

			$cookie = json_decode( stripslashes( $_COOKIE['messia'] ) );

			if ( ! in_array( $cookie->listing_view_mode, $view_modes, true ) ) {
				$cookie->listing_view_mode = $default_cookie->listing_view_mode;
			}

			$cookie = wp_parse_args( $cookie, $default_cookie );

			$this->cookie = (object) $cookie;
			return;
		}

		$this->cookie   = $default_cookie;
		$cookie_options = [
			'expires'  => time() + YEAR_IN_SECONDS,
			'path'     => '/',
			'secure'   => false,
			'httponly' => false,
			'samesite' => 'Strict', // None || Lax  || Strict.
		];
		setcookie( 'messia', wp_json_encode( $default_cookie ), $cookie_options );
	}

	/**
	 * Callback for WP after_setup_theme hook.
	 * Define base theme functionality.
	 *
	 * @return void
	 */
	public function setup_theme(): void {

		register_nav_menus(
			[
				'main' => __( 'Main Menu', 'messia' ),
			]
		);

		// remove_theme_support( 'widgets-block-editor' ); // For debug only.
		add_theme_support( 'post-thumbnails', [ 'messia_object', 'post' ] );
		add_theme_support( 'post-formats', [] );
		add_theme_support( 'title-tag' );
		add_theme_support( 'wp-block-styles' );
		add_theme_support( 'automatic-feed-links' );

		$html5_args = [
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		];
		add_theme_support( 'html5', $html5_args );

		$custom_logo_args = [
			'flex-width'      => true,
			'width'           => 125,
			'flex-height'     => true,
			'height'          => 34,
			'header-selector' => '.site-title a',
			'header-text'     => false,
		];
		add_theme_support( 'custom-logo', $custom_logo_args );

		$custom_header_args = [
			'default-image' => '',
			'header-text'   => false,
			'width'         => 0,
			'height'        => 0,
			'flex-width'    => true,
			'flex-height'   => true,
		];
		add_theme_support( 'custom-header', $custom_header_args );

		$custom_background_args = [
			'default-color' => 'ffffff',
			'default-image' => '',
		];
		add_theme_support( 'custom-background', $custom_background_args );

		add_theme_support( 'admin-bar', [ 'callback' => [ $this, 'change_toolbar' ] ] );
		add_theme_support( 'editor-styles' );
		add_theme_support( 'responsive-embeds' );
		add_theme_support( 'align-wide' );
		// add_theme_support( 'wp-block-styles' );

		add_editor_style( 'style-editor.css' );
	}

	/**
	 * Callback for WP admin notices hook.
	 * Show different admin notifications.
	 *
	 * @return void
	 */
	public function admin_notices(): void {

		$echo = '';

		if ( ! empty( $echo ) ) {
			echo $echo;
		}

		if ( get_transient( 'messia_admin_notice_panel' ) ) {

			// phpcs:disable WordPress.Security.NonceVerification.Recommended
			if ( isset( $_GET['post_update_revert'] ) ) {
				echo '<div class="notice notice-error is-dismissible"><p>' . MESSIA_MESSAGES['dependantPageUpdWarn'] . '</p></div>';
			}
			if ( isset( $_GET['post_delete_revert'] ) ) {
				echo '<div class="notice notice-error is-dismissible"><p>' . MESSIA_MESSAGES['dependantPageDelWarn'] . '</p></div>';
			}
			if ( isset( $_GET['segment_term_data_update'] ) ) {
				echo '<div class="notice notice-success is-dismissible"><p>' . MESSIA_MESSAGES['segmentPageUpdated'] . '</p></div>';
			}
			if ( isset( $_GET['property_term_data_update'] ) ) {
				echo '<div class="notice notice-error is-dismissible"><p>' . MESSIA_MESSAGES['propertySlugReserved'] . '</p></div>';
			}
			if ( isset( $_GET['segment_term_data_delete'] ) ) {
				echo '<div class="notice notice-success is-dismissible"><p>' . MESSIA_MESSAGES['segmentPageDeleted'] . '</p></div>';
			}
			if ( isset( $_GET['segment_alias_warning'] ) ) {
				echo '<div class="notice notice-error is-dismissible"><p>' . MESSIA_MESSAGES['segmentAliasSlug'] . '</p></div>';
			}
			if ( isset( $_GET['google_geocode_notice'] ) && 'OK' !== $_GET['google_geocode_notice'] ) {
				echo '<div class="notice notice-error is-dismissible"><p>' . $_GET['google_geocode_notice'] . '</p></div>';
			}

			delete_transient( 'messia_admin_notice_panel' );
		}
	}

	/**
	 * Callback for WP wp_redirect hook.
	 * When deleting a term, two redirects occurs in a row:
	 * - to the page of the term that was deleted
	 * - from there to the list of terms page
	 * You have to pass the variable through this redirects.
	 *
	 * @param string $location URL to redirect to.
	 *
	 * @return string
	 */
	public function on_redirect( string $location ): string {

		if ( isset( $_GET['segment_term_data_delete'] ) ) {
			// phpcs:enable WordPress.Security.NonceVerification.Recommended
			$this->set_messia_admin_notice_transient( 5 );
			remove_filter( 'wp_redirect', [ $this, 'on_redirect' ] );
			return add_query_arg( [ 'segment_term_data_delete' => true ], $location );
		}
		return $location;
	}

	/**
	 * Getter for class module.
	 *
	 * @param string $module_name Valid theme module.
	 *
	 * @throws Exception On getting unexisting module.
	 *
	 * @return mixed
	 */
	public function get_module( string $module_name ) {
		try {
			return $this->{$module_name};
		} catch ( Exception $e ) {
			throw new Exception( "Retrievied unexisting module {$module_name}" );
		}
	}

	/**
	 * Setter for class module.
	 *
	 * @param string $module_name  Valid theme module.
	 * @param mixed  $module_value Module itself.
	 *
	 * @return void
	 */
	public function set_module( string $module_name, $module_value ): void {
		$this->{$module_name} = $module_value;
	}

	/**
	 * Getter for $this->cookie.
	 *
	 * @return stdClass
	 */
	public function get_cookie(): stdClass {
		return $this->cookie;
	}

	/**
	 * Getter for $this->seo_templates.
	 *
	 * @return array
	 */
	public function get_seo_templates(): array {
		return $this->seo_templates;
	}

	/**
	 * Getter for $this->seo_placeholders.
	 *
	 * @return array
	 */
	public function get_seo_placeholders(): array {
		return $this->seo_placeholders;
	}

	/**
	 * Set temporary value in DB to show admin notice only once.
	 *
	 * @param int $time TTL of value.
	 *
	 * @return void
	 */
	public function set_messia_admin_notice_transient( int $time ): void {
		set_transient( 'messia_admin_notice_panel', true, $time );
	}

	/**
	 * Changes admin var styles, needed in front.
	 *
	 * @return void
	 */
	public function change_toolbar() {

		if ( is_admin_bar_showing() ) {

			$type_attr = current_theme_supports( 'html5', 'style' ) ? '' : ' type="text/css"';
			?>
			<style <?php echo $type_attr; ?> media="screen">
				:root{--admin-bar-height: 32px;}
				html { padding-top: var(--admin-bar-height) !important; }
				* html body { padding-top: var(--admin-bar-height) !important; }
				@media screen and ( max-width: 782px ) {
					:root{--admin-bar-height: 46px;}
					html { padding-top: var(--admin-bar-height ) !important; }
					* html body { padding-top: var(--admin-bar-height) !important; }
				}
			</style>
			<?php
		}
	}
}
