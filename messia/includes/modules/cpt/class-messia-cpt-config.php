<?php
/**
 * Messia_Cpt_Config
 * Define all messia taxonomies and their property
 *
 * @package Messia\Modules\CustomPostTypes
 */

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Modules\Cpt;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Smartbits\Messia\Includes\Config\Messia_Config_Custom_Fields;
use Exception;

/**
 * Configuration of all custom pot types,
 * custom taxonomies and it`s meta fields.
 *
 * @package Messia\Modules\CustomPostTypes
 */
class Messia_Cpt_Config {

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Cpt_Config
	 */
	private static ?Messia_Cpt_Config $instance = null; // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

	/**
	 * The configuration of custom taxonomies.
	 *
	 * @var array
	 */
	protected array $custom_taxonomies_config;

	/**
	 * The configuration of CPTs
	 *
	 * @var array
	 */
	protected array $custom_posttype_config;

	/**
	 * The configuration of copes of the custom fileds.
	 *
	 * @var array
	 */
	protected array $caps_scopes = [];

	/**
	 * The scope of the custom fileds.
	 *
	 * @var array
	 */
	protected array $post_custom_fields_caps = [];

	/**
	 * Messia_Cpt_Config сonstructor.
	 */
	private function __construct() {

		$this->setup_fileds_caps();
		$this->setup_taxonomy();
		$this->setup_posttype();
	}

	/**
	 * Messia_Cpt_Config Instance.
	 * Ensures only one instance of Messia_Cpt_Config is loaded or can be loaded.
	 *
	 * @return Messia_Cpt_Config Instance.
	 */
	public static function instance(): Messia_Cpt_Config {

		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Setup custom fields capability accross listng and object zones.
	 *
	 * @throws Exception On caps area does not exist in caps_scopes.
	 *
	 * @return void
	 */
	private function setup_fileds_caps(): void {

		// can have as much keys as needed.
		// these keys should be used as area key value in post_custom_fields_caps.
		$this->caps_scopes = [
			'listing' => [
				'title'  => __( 'Card layout', 'messia' ),
				'schema' => '<div class="modal-content-listing modal-content">
								<div class="image">Image</div>
								<div class="modal-content-body">
									<div class="title">' . __( 'Title', 'messia' ) . '</div>
									<div class="modal-content-item">' . __( 'Properties', 'messia' ) . '</div>
									<div class="modal-content-item modal-content-items"><div class="modal-content-item-inner">' . __( 'Features block', 'messia' ) . '</div><div class="modal-content-item-inner">' . __( 'Features inline', 'messia' ) . '</div></div>
									<div class="modal-content-item">' . __( 'Excerpt', 'messia' ) . '</div>
									<div class="modal-content-item modal-content-item-rating">' . __( 'Rating', 'messia' ) . '</div>
									<div class="modal-content-item">' . __( 'CTA', 'messia' ) . '</div>
								</div>
							</div>',
			],
			'object'  => [
				'title'  => __( 'Object layout', 'messia' ),
				'schema' => '<div class="modal-content-object modal-content">
								<div class="modal-content-body">
									<div class="modal-content-header">
										<div class="modal-content-logo">' . __( 'LOGO', 'messia' ) . '</div>
										<div class="modal-content-menu">' . __( 'MENU', 'messia' ) . '</div>
									</div>
									
									<div class="modal-content-zones">
									<div class="modal-content-item modal-content-hero">' . __( 'Object Page Hero', 'messia' ) . '</div>
										<div class="modal-content-flex">
										<div class="modal-content-left">
											<div class="modal-content-item modal-content-top">' . __( 'Object Page Top', 'messia' ) . '</div>
											<div class="modal-content-item modal-content-content">' . __( 'Object Page Content', 'messia' ) . '</div>
										</div>
										<div class="modal-content-item modal-content-sidebar">' . __( 'Object Page Sidebar', 'messia' ) . '</div>
										</div>
										<div class="modal-content-item modal-content-top">' . __( 'Object Page Bottom', 'messia' ) . '</div>
									</div>
								</div>
							</div>',
			],
		];

		$this->post_custom_fields_caps = [
			'card_off'            => [
				'title' => __( 'Do not show on card.', 'messia' ),
				'label' => __( 'Off', 'messia' ),
				'html'  => '<input id="%id%" %type% %name% title="%title%" %checked%><label for="%id%">%label%</label>',
				'area'  => 'listing',
				'radio' => true,
			],
			'card_excerpt'        => [
				'title' => __( 'The option determines whether the value of this field is displayed in the corresponding area of the object on the list of objects.', 'messia' ),
				'label' => __( 'Excerpt', 'messia' ),
				'html'  => '<input id="%id%" %type% %name% title="%title%" %checked%><label for="%id%">%label%</label>',
				'area'  => 'listing',
				'radio' => false,
			],
			'card_cta'            => [
				'title' => __( 'The option determines whether the value of this field is displayed in the corresponding area of the object on the list of objects.', 'messia' ),
				'label' => __( 'CTA', 'messia' ),
				'html'  => '<input id="%id%" %type% %name% title="%title%" %checked%><label for="%id%">%label%</label>',
				'area'  => 'listing',
				'radio' => false,
			],
			'card_feature_block'  => [
				'title' => __( 'The option determines whether the value of this field is displayed in the corresponding area of the object on the list of objects.', 'messia' ),
				'label' => __( 'Features Block', 'messia' ),
				'html'  => '<input id="%id%" %type% %name% title="%title%" %checked%><label for="%id%">%label%</label>',
				'area'  => 'listing',
				'radio' => true,
			],
			'card_feature_inline' => [
				'title' => __( 'The option determines whether the value of this field is displayed in the corresponding area of the object on the list of objects.', 'messia' ),
				'label' => __( 'Features Inline', 'messia' ),
				'html'  => '<input id="%id%" %type% %name% title="%title%" %checked%><label for="%id%">%label%</label>',
				'area'  => 'listing',
				'radio' => true,
			],
			'op_hero'             => [
				'title' => __( 'The option determines whether the value of this field is displayed in the corresponding area at the object page.', 'messia' ),
				'label' => __( 'Hero', 'messia' ),
				'html'  => '<input id="%id%" type="checkbox" %name% title="%title%" %checked%><label for="%id%">%label%</label>',
				'area'  => 'object',
				'radio' => false,
			],
		];

		foreach ( $this->post_custom_fields_caps as $cap_name => $cap_info ) {
			if ( ! array_key_exists( $cap_info['area'], $this->caps_scopes ) ) {
				throw new Exception( "Caps area {$cap_info['area']} does not exist in caps_scopes" );
			}
			$this->post_custom_fields_caps[ $cap_name ]['html'] = str_replace( [ '%label%', '%title%' ], [ $cap_info['label'], $cap_info['title'] ], $cap_info['html'] );
		}
	}

	/**
	 * Setup custom taxonomies, all it configuration, meta data etc.
	 * Everything here.
	 *
	 * @return void
	 */
	private function setup_taxonomy(): void {

		$cf_units = Messia_Config_Custom_Fields::get_units();
		$cf_units = array_merge(
			[
				'-1' => __( 'No units', 'messia' ),
			],
			...array_values( $cf_units )
		);

		$this->custom_taxonomies_config = [
			'messia_object_segment'       => [
				'post_types'         => [ 'messia_object' ],
				'args'               => [
					'hierarchical'       => false,
					'label'              => __( 'Segments', 'messia' ),
					'labels'             => array_merge(
						$this->get_taxonomy_labels( __( 'Segment', 'messia' ), __( 'Segments', 'messia' ) ),
						[
							'parent_item'           => __( 'Parent Segment', 'messia' ),
							'parent_item_colon'     => __( 'Parent Segment:', 'messia' ),
							'choose_from_most_used' => __( 'Choose from frequently used Segments', 'messia' ),
							'view_item'             => __( 'Browse segment', 'messia' ),
							'new_item_name'         => __( 'New segment name', 'messia' ),
							'back_to_items'         => __( 'Back to segments', 'messia' ),
							'no_terms'              => __( 'No segments', 'messia' ),
							'items_list'            => __( 'Segment List', 'messia' ),
							'items_list_navigation' => __( 'Segment List Navigation', 'messia' ),
							'most_used'             => __( 'Frequently used', 'messia' ),
						]
					),
					'show_ui'            => true,
					'show_in_quick_edit' => false,
					'show_in_nav_menus'  => true,
					'meta_box_cb'        => 'post_categories_meta_box', // OR 'post_tags_meta_box'.
					'show_in_menu'       => true,
					'show_tagcloud'      => true,
					'public'             => true,
					'rewrite'            => [
						'slug'         => 'messia_object_segment',
						'with_front'   => false,
						'hierarchical' => false,
					],
					'show_in_rest'       => true,
					'show_admin_column'  => true,
					'publicly_queryable' => true,
					'query_var'          => true,
					'rest_base'          => 'messia_object_segment',
				],
				'post_stuff_fields'  => [
					[
						'id'            => 'is_featured',
						'type'          => 'checkbox',
						'default_value' => 0,
						'label'         => '<span>' . __( 'Is Featured', 'messia' ) . '</span>',
						'tooltip'       => __( 'Turning this option on will let you filter objects by this parameter in some blocks.', 'messia' ),
					],
				],
				'post_custom_fields' => [
					'input_text'           => [
						'title'     => sprintf( '<strong>%s</strong>', __( 'Text', 'messia' ) ),
						'html'      => '<div class="field">
											<label>%name%:%tooltip%</label>
											<input type="text" name="%slug%" %value% %atts%/>
										</div>',
						'html_type' => 'input',
						'default'   => '',
						'settings'  => [
							'title'     => $this->get_constructor_title_field(),
							'name'      => $this->get_constructor_name_field(),
							'slug'      => $this->get_constructor_slug_field(),
							'icon'      => $this->get_constructor_icon_field(),
							'active'    => $this->get_constructor_active_field(),
							'maxlength' => [
								'tag'     => 'input',
								'type'    => 'number',
								'label'   => __( 'Max-length', 'messia' ),
								'scope'   => 'params',
								'default' => 160,
							],
						],
						'shortcode' => [ 'Smartbits\Messia\Includes\Messia_Shortcodes', 'custom_field' ],
						'tooltip'   => __( 'Any text and HTML.', 'messia' ),
						'caps'      => [ 'card_off', 'card_feature_block', 'card_feature_inline' ],
					],
					'input_textarea'       => [
						'title'     => sprintf( '<strong>%s</strong>', __( 'Textarea', 'messia' ) ),
						'html'      => '<div class="field">
											<label for="%slug%">%name%:%tooltip%</label>
											<textarea class="messia" name="%slug%" id="%slug%" %atts%>%value%</textarea>
										</div>',
						'html_type' => 'textarea',
						'default'   => '',
						'settings'  => [
							'title'     => $this->get_constructor_title_field(),
							'name'      => $this->get_constructor_name_field(),
							'slug'      => $this->get_constructor_slug_field(),
							'icon'      => $this->get_constructor_icon_field(),
							'active'    => $this->get_constructor_active_field(),
							'maxlength' => [
								'tag'     => 'input',
								'type'    => 'number',
								'label'   => __( 'Max-length', 'messia' ),
								'scope'   => 'params',
								'default' => 160,
							],
						],
						'shortcode' => [ 'Smartbits\Messia\Includes\Messia_Shortcodes', 'custom_field' ],
						'tooltip'   => __( 'Any text and HTML.', 'messia' ),
						'caps'      => [ 'card_excerpt' ],
					],
					'input_address'        => [
						'title'     => sprintf( '<strong>%s</strong>', __( 'Address', 'messia' ) ),
						'html'      => '<div class="field address-field" data-geocoded="%geocoded%">
											<label for="%slug%">%name%:%tooltip%</label>
											<textarea class="messia" name="%slug%[user_address]" id="%slug%" %atts%>%value-user-address%</textarea>
											<div class="geo-data">
												<div class="lat">
													<label>' . __( 'Latitude', 'messia' ) . ':</label>
													<input class="messia" type="text" name="%slug%[latitude]" %value-lat%>
												</div>
												<div class="long">
													<label>' . __( 'Longitude', 'messia' ) . ':</label>
													<input class="messia" type="text" name="%slug%[longitude]" %value-long%>
												</div>
											</div>
											<input type="hidden" name="%slug%[geocoded]" %value-geocoded%>
										</div>',
						'html_type' => 'address',
						'default'   => (object) [
							'user_address' => '',
							'latitude'     => '',
							'longitude'    => '',
							'geocoded'     => 0,
						],
						'settings'  => [
							'title'    => $this->get_constructor_title_field(),
							'name'     => $this->get_constructor_name_field(),
							'slug'     => $this->get_constructor_slug_field(),
							'icon'     => $this->get_constructor_icon_field(),
							'active'   => $this->get_constructor_active_field(),
							'with_map' => [
								'tag'     => 'input',
								'type'    => 'checkbox',
								'label'   => __( 'With map', 'messia' ),
								'title'   => __( 'Show map below address instead of popup', 'messia' ),
								'default' => false,
								'scope'   => 'instance',
							],
						],
						'shortcode' => [ 'Smartbits\Messia\Includes\Messia_Shortcodes', 'custom_field' ],
						'tooltip'   => __( 'This type of field is used to calculate the geo-coordinates at the entered address. It uses Google geocoding service. This service requires a paid account and imposes other restrictions. Without geocoordinates, it is not possible to display the label of an object on the map. If you don\'t want to use geocoding, but you need to display objects on the map, delete the address completely and enter the coordinates manually.', 'messia' ),
						'caps'      => [ 'card_cta' ],
					],
					'input_checkbox'       => [
						'title'     => sprintf( '<strong>%s</strong>', __( 'Checkbox', 'messia' ) ),
						'html'      => '<div class="field">
											<label for="%slug%">%name%:%tooltip%</label>
											<input type="checkbox" name="%slug%" id="%slug%" %checked% value="1"/>
										</div>',
						'html_type' => 'input',
						'default'   => '0',
						'settings'  => [
							'title'  => $this->get_constructor_title_field(),
							'name'   => $this->get_constructor_name_field(),
							'slug'   => $this->get_constructor_slug_field(),
							'icon'   => $this->get_constructor_icon_field(),
							'active' => $this->get_constructor_active_field(),
						],
						'shortcode' => [ 'Smartbits\Messia\Includes\Messia_Shortcodes', 'custom_field' ],
						'tooltip'   => __( 'Yes/No', 'messia' ),
						'caps'      => [ 'card_off', 'card_feature_block', 'card_feature_inline' ],
					],
					'input_number'         => [
						'title'     => sprintf( '<strong>%s</strong>', __( 'Number', 'messia' ) ),
						'html'      => '<div class="field">
											<label for="%slug%">%name%:%tooltip%</label>
											<input type="number" name="%slug%" id="%slug%" %value% %atts%/>
										</div>',
						'html_type' => 'input',
						'default'   => '',
						'settings'  => [
							'title'              => $this->get_constructor_title_field(),
							'name'               => $this->get_constructor_name_field(),
							'slug'               => $this->get_constructor_slug_field(),
							'icon'               => $this->get_constructor_icon_field(),
							'active'             => $this->get_constructor_active_field(),
							'min'                => [
								'tag'     => 'input',
								'type'    => 'number',
								'label'   => __( 'Min', 'messia' ),
								'scope'   => 'atts',
								'default' => null,
							],
							'max'                => [
								'tag'     => 'input',
								'type'    => 'number',
								'label'   => __( 'Max', 'messia' ),
								'scope'   => 'atts',
								'default' => null,
							],
							'step'               => [
								'tag'     => 'input',
								'type'    => 'number',
								'label'   => __( 'Step', 'messia' ),
								'scope'   => 'atts',
								'default' => null,
							],
							'units'              => [
								'tag'     => 'select',
								'label'   => __( 'Units', 'messia' ),
								'scope'   => 'options',
								'default' => '',
								'options' => $cf_units,
							],
							'unit_position'      => [
								'tag'     => 'select',
								'label'   => __( 'R/L', 'messia' ),
								'scope'   => 'options',
								'default' => 'left',
								'options' => [
									'left'        => __( 'Left', 'messia' ),
									'left_space'  => __( 'Left+', 'messia' ),
									'right'       => __( 'Right', 'messia' ),
									'right_space' => __( 'Right+', 'messia' ),
								],
							],
							'thousand_separatop' => [
								'tag'     => 'input',
								'type'    => 'text',
								'label'   => __( 'Split 1000', 'messia' ),
								'scope'   => 'params',
								'default' => '.',
							],
							'decimal_separatop'  => [
								'tag'     => 'input',
								'type'    => 'text',
								'label'   => __( 'Split decimal', 'messia' ),
								'scope'   => 'params',
								'default' => ',',
							],
							'number_precision'   => [
								'tag'     => 'input',
								'type'    => 'number',
								'label'   => __( 'Precision', 'messia' ),
								'scope'   => 'params',
								'default' => 2,
							],
							'form_filter'        => [
								'tag'     => 'input',
								'type'    => 'radio',
								'label'   => __( 'Form filter:', 'messia' ),
								'scope'   => 'params',
								'default' => '-1',
								'class'   => 'filtering',
								'radios'  => [
									[
										'title' => __( 'No', 'messia' ),
										'value' => '-1',
									],
									[
										'title' => __( 'Range', 'messia' ),
										'value' => 'range',
									],
									[
										'title' => __( 'Toggle', 'messia' ),
										'value' => 'toggle',
									],
								],
							],
							'sortable'           => [
								'tag'     => 'input',
								'type'    => 'checkbox',
								'label'   => __( 'Make sortable', 'messia' ),
								'scope'   => 'params',
								'default' => 0,
							],
						],
						'shortcode' => [ 'Smartbits\Messia\Includes\Messia_Shortcodes', 'custom_field' ],
						'tooltip'   => __( 'Number according to the rules specified in the constructor.', 'messia' ),
						'caps'      => [ 'card_off', 'card_feature_block', 'card_feature_inline' ],
					],
					'input_link'           => [
						'title'       => sprintf( '<strong>%s</strong>', __( 'Link', 'messia' ) ),
						'html'        => '<div class="field">
											<label for="%slug%">%name%:%tooltip%</label>
											<div class="input-link">
												<input placeholder="%placeholder%" name="%slug%[title]" id="%slug%" type="url" %atts% %value-title%/>
												<span class="edit-link %linked%"></span>
											</div>
											<div class="link-wrapper" style="display: none;">
												<input name="%slug%[url]" placeholder="' . __( 'Any valid URL', 'messia' ) . '" type="url" class="data" %value-url%/>
												<span class="dashicons dashicons-editor-break" id="commit-url-link"></span>
											</div>
										</div>',
						'html_type'   => 'input',
						'placeholder' => __( 'Link URL', 'messia' ),
						'default'     => (object) [],
						'settings'    => [
							'title'            => $this->get_constructor_title_field(),
							'name'             => $this->get_constructor_name_field(),
							'slug'             => $this->get_constructor_slug_field(),
							'icon'             => $this->get_constructor_icon_field(),
							'active'           => $this->get_constructor_active_field(),
							'blank'            => [
								'tag'     => 'input',
								'type'    => 'checkbox',
								'label'   => __( 'Open in a new tab', 'messia' ),
								'scope'   => 'params',
								'default' => 1,
							],
							'use_object_title' => [
								'tag'     => 'input',
								'type'    => 'checkbox',
								'label'   => __( 'Use field title as URL title', 'messia' ),
								'scope'   => 'params',
								'default' => 0,
							],
						],
						'shortcode'   => [ 'Smartbits\Messia\Includes\Messia_Shortcodes', 'custom_field' ],
						'tooltip'     => __( 'Any text and HTML.', 'messia' ),
						'caps'        => [ 'card_cta' ],
					],
					'input_images'         => [
						'title'     => sprintf( '<strong>%s</strong>', __( 'Media', 'messia' ) ),
						'html'      => '<div class="field">
											<label>%name%:%tooltip%</label>
											<div class="storage" data-name="%slug%">
												%inputs-hidden%
											</div>
											<div class="icon-wrapper">
												%saved-images%
												<div class="icon multiple template">
													<span class="edit-image"></span>
													<span class="placeholder-image"></span>
												</div>
											</div>
											<div class="link-wrapper" style="display: none;">
												<input type="text" placeholder="' . __( 'Any valid URL', 'messia' ) . '" class="data"/>
												<span class="dashicons dashicons-editor-break" id="commit-image-link"></span>
											</div>
										</div>',
						'html_type' => 'input',
						'default'   => [],
						'settings'  => [
							'title'  => $this->get_constructor_title_field(),
							'name'   => $this->get_constructor_name_field(),
							'slug'   => $this->get_constructor_slug_field(),
							'icon'   => $this->get_constructor_icon_field(),
							'active' => $this->get_constructor_active_field(),
						],
						'shortcode' => [ 'Smartbits\Messia\Includes\Messia_Shortcodes', 'custom_field' ],
						'tooltip'   => __( 'Media from the gallery. Clicking on the image will open it in a pop-up window, however, if a link is specified for the image, it will open in a new tab.', 'messia' ),
						'caps'      => [],
					],
					'input_external_media' => [
						'title'     => sprintf( '<strong>%s</strong>', __( 'Embedded media', 'messia' ) ),
						'html'      => '<div class="field">
											<label>%name%:%tooltip%</label>
											<textarea class="messia messia-codemirror" name="%slug%" %atts%>%value%</textarea>
										</div>',
						'html_type' => 'textarea',
						'default'   => '',
						'settings'  => [
							'title'  => $this->get_constructor_title_field(),
							'name'   => $this->get_constructor_name_field(),
							'slug'   => $this->get_constructor_slug_field(),
							'icon'   => $this->get_constructor_icon_field(),
							'active' => $this->get_constructor_active_field(),
						],
						'shortcode' => [ 'Smartbits\Messia\Includes\Messia_Shortcodes', 'custom_field' ],
						'tooltip'   => __( 'HTML code. A structure is expected in which all top-level nodes will contain links to external media. Each node will be displayed on the page as a separate block. Clicking on a block will open its contents in a popup window.', 'messia' ),
						'caps'      => [],
					],
					'input_html'           => [
						'title'     => sprintf( '<strong>%s</strong>', __( 'HTML', 'messia' ) ),
						'html'      => '<div class="field">
											<label>%name%:%tooltip%</label>
											<textarea class="messia messia-codemirror" name="%slug%" %atts%>%value%</textarea>
										</div>',
						'html_type' => 'textarea',
						'default'   => '',
						'settings'  => [
							'title'  => $this->get_constructor_title_field(),
							'name'   => $this->get_constructor_name_field(),
							'slug'   => $this->get_constructor_slug_field(),
							'icon'   => $this->get_constructor_icon_field(),
							'active' => $this->get_constructor_active_field(),
						],
						'shortcode' => [ 'Smartbits\Messia\Includes\Messia_Shortcodes', 'custom_field' ],
						'tooltip'   => __( 'Any valid HTML code. The value will be displayed without changes..', 'messia' ),
						'caps'      => [ 'card_off', 'card_feature_block', 'card_feature_inline' ],
					],
					'select_post_single'   => [
						'title'     => sprintf( '<strong>%s</strong>', __( 'Post single', 'messia' ) ),
						'html'      => '<div class="field">
											<label>%name%:%tooltip%</label>
											<select name="%slug%">%options%</select>
										</div>',
						'html_type' => 'select_single',
						'default'   => '-1',
						'settings'  => [
							'title'  => $this->get_constructor_title_field(),
							'name'   => $this->get_constructor_name_field(),
							'slug'   => $this->get_constructor_slug_field(),
							'icon'   => $this->get_constructor_icon_field(),
							'active' => $this->get_constructor_active_field(),
							'select' => [
								'tag'     => 'select',
								'label'   => __( 'Options', 'messia' ),
								'scope'   => 'options',
								'default' => 'messia_object',
								'options' => [
									'page'          => __( 'Pages', 'messia' ),
									'post'          => __( 'Posts', 'messia' ),
									'messia_object' => __( 'Objects', 'messia' ),
								],
							],
						],
						'shortcode' => [ 'Smartbits\Messia\Includes\Messia_Shortcodes', 'custom_field' ],
						'tooltip'   => __( 'One of website records according to the field settings in the constructor.', 'messia' ),
						'caps'      => [],
					],
					'select_post_multi'    => [
						'title'     => sprintf( '<strong>%s</strong>', __( 'Post multiple', 'messia' ) ),
						'html'      => '<div class="field">
											<label>%name%:%tooltip%</label>
											<select multiple="multiple" name="%slug%">%options%</select>
										</div>',
						'html_type' => 'select_multi',
						'default'   => 'null',
						'settings'  => [
							'title'     => $this->get_constructor_title_field(),
							'name'      => $this->get_constructor_name_field(),
							'slug'      => $this->get_constructor_slug_field(),
							'icon'      => $this->get_constructor_icon_field(),
							'active'    => $this->get_constructor_active_field(),
							'select'    => [
								'tag'     => 'select',
								'label'   => __( 'Options', 'messia' ),
								'scope'   => 'options',
								'default' => 'messia_object',
								'options' => [
									'page'          => __( 'Pages', 'messia' ),
									'post'          => __( 'Posts', 'messia' ),
									'messia_object' => __( 'Objects', 'messia' ),
								],
							],
							'card_mode' => [
								'tag'     => 'input',
								'type'    => 'checkbox',
								'label'   => __( 'As card', 'messia' ),
								'title'   => __( 'Use object card design instead of regular link to object.', 'messia' ),
								'default' => 1,
								'scope'   => 'instance',
							],
						],
						'shortcode' => [ 'Smartbits\Messia\Includes\Messia_Shortcodes', 'custom_field' ],
						'tooltip'   => __( 'One or more website records according to the field settings in the constructor.', 'messia' ),
						'caps'      => [],
					],
				],
				'meta_fields'        => [
					[
						'id'            => 'alias',
						'type'          => 'text',
						'default_value' => '',
						'label'         => '<span>' . __( 'Alias', 'messia' ) . '</span>',
						'description'   => __( 'Alias will allow you to open the object page by the url of the form: domain / alias / slug-object /. Leave blank to use the default value "messia_object_segment".', 'messia' ),
						'for_saved'     => false,
					],
					[
						'id'            => 'seo_01',
						'type'          => 'textarea',
						'default_value' => '',
						'label'         => '<span>' . __( 'SEO#1', 'messia' ) . '</span>',
						'description'   => __( 'This field sets the first variable that participates in SEO templates.', 'messia' ),
						'for_saved'     => false,
					],
					[
						'id'            => 'seo_02',
						'type'          => 'textarea',
						'default_value' => '',
						'label'         => '<span>' . __( 'SEO#2', 'messia' ) . '</span>',
						'description'   => __( 'This field sets the second variable that participates in SEO templates.', 'messia' ),
						'for_saved'     => false,
					],
				],
			],
			'messia_object_category'      => [
				'post_types'         => [ 'messia_object' ],
				'args'               => [
					'hierarchical'       => true,
					'label'              => __( 'Category', 'messia' ),
					'labels'             => array_merge(
						$this->get_taxonomy_labels( __( 'Category', 'messia' ), __( 'Categories', 'messia' ) ),
						[
							'parent_item'           => __( 'Parent Category', 'messia' ),
							'parent_item_colon'     => __( 'Parent Category:', 'messia' ),
							'choose_from_most_used' => __( 'Choose from frequently used Categories', 'messia' ),
							'view_item'             => __( 'Browse category', 'messia' ),
							'new_item_name'         => __( 'New Category Name', 'messia' ),
							'back_to_items'         => __( 'Back to category', 'messia' ),
							'no_terms'              => __( 'No categories', 'messia' ),
							'items_list'            => __( 'Category List', 'messia' ),
							'items_list_navigation' => __( 'Category List Navigation', 'messia' ),
							'most_used'             => __( 'Frequently used', 'messia' ),
						]
					),
					'show_ui'            => true,
					'show_in_quick_edit' => false,
					'show_in_nav_menus'  => true,
					'meta_box_cb'        => 'post_categories_meta_box', // OR 'post_tags_meta_box'.
					'show_in_menu'       => true,
					'show_tagcloud'      => true,
					'public'             => true,
					'rewrite'            => [
						'slug'         => 'messia_object_category',
						'with_front'   => false,
						'hierarchical' => false,
					],
					'show_in_rest'       => true,
					'show_admin_column'  => true,
					'publicly_queryable' => false,
					'query_var'          => false,
					'rest_base'          => 'messia_object_category',
				],
				'post_custom_fields' => [],
				'meta_fields'        => [
					[
						'id'            => 'filter_label',
						'type'          => 'text',
						'default_value' => null,
						'label'         => '<span>' . __( 'Filter header', 'messia' ) . '</span>',
						'description'   => __( 'The value will be used as the text of the header displayed before the filter, if the given term forms it (the term must have descendants). Leave blank if no title is needed..', 'messia' ),
						'for_saved'     => false,
					],
					[
						'id'            => 'select_all',
						'type'          => 'text',
						'default_value' => __( 'Any value', 'messia' ),
						'label'         => '<span>' . __( 'Option Select All', 'messia' ) . '</span>',
						'description'   => __( 'The visual value of the option in the filter, which determines the display of all objects in this term (applies if the term has children.)', 'messia' ),
						'for_saved'     => false,
					],
					[
						'id'            => 'filter_type',
						'type'          => 'radio',
						'default_value' => 'select-single',
						'label'         => '<span>' . __( 'Filter type', 'messia' ) . '</span>',
						'default'       => 0, // it is not a value but a radios index whose value will be the default.
						'radios'        => [
							[
								'title' => '<span>' . __( 'Single select', 'messia' ) . '</span>',
								'value' => 'select-single',
							],
							[
								'title' => '<span>' . __( 'Multiple select', 'messia' ) . '</span>',
								'value' => 'select-multi',
							],
						],
						'description'   => __( 'The value of the option determines with which HTML tag the term filter will be displayed on the search page.', 'messia' ),
						'for_saved'     => false,
					],
					[
						'id'            => 'branch_as_filter',
						'type'          => 'checkbox',
						'default_value' => '0',
						'label'         => '<span>' . __( 'Branch as filters', 'messia' ) . '</span>',
						'description'   => __( 'Create separate filters in the frontend from the node and all its direct descendants. In the active state, the option "Select all" will be ignored, because it is replaced by the very meaning of this node.', 'messia' ),
						'for_saved'     => false,
					],
					[
						'id'            => 'crosslinking_exclude',
						'type'          => 'checkbox',
						'default_value' => '0',
						'label'         => '<span>' . __( 'Crosslinks', 'messia' ) . '</span>',
						'description'   => __( 'Exclude the term and its descendants from linking cloud.', 'messia' ),
						'for_saved'     => true,
					],
					[
						'id'            => 'term_icon',
						'type'          => 'mediasingle',
						'default_value' => '',
						'label'         => '<span>' . __( 'Icon', 'messia' ) . '</span>',
						'description'   => __( 'This image will be used to display along with the name of the term.', 'messia' ),
					],
					[
						'id'            => 'term_thumbnail',
						'type'          => 'mediasingle',
						'default_value' => '',
						'label'         => '<span>' . __( 'Thumbnail', 'messia' ) . '</span>',
						'description'   => __( 'This image will be used to display along with the name of the term.', 'messia' ),
					],
					[
						'id'            => 'seo_01',
						'type'          => 'textarea',
						'default_value' => '',
						'label'         => '<span>' . __( 'SEO#1', 'messia' ) . '</span>',
						'description'   => __( 'This field sets the first variable that participates in SEO templates.', 'messia' ),
						'for_saved'     => false,
					],
					[
						'id'            => 'seo_02',
						'type'          => 'textarea',
						'default_value' => '',
						'label'         => '<span>' . __( 'SEO#2', 'messia' ) . '</span>',
						'description'   => __( 'This field sets the second variable that participates in SEO templates.', 'messia' ),
						'for_saved'     => false,
					],
				],
			],
			'messia_object_property'      => [
				'post_types'         => [ 'messia_object' ],
				'args'               => [
					'hierarchical'       => false,
					'label'              => __( 'Property', 'messia' ),
					'labels'             => array_merge(
						$this->get_taxonomy_labels( __( 'Property', 'messia' ), __( 'Properties', 'messia' ) ),
						[
							'parent_item'           => __( 'Parent Property', 'messia' ),
							'parent_item_colon'     => __( 'Parent Property:', 'messia' ),
							'choose_from_most_used' => __( 'Choose from frequently used Properties', 'messia' ),
							'view_item'             => __( 'View Property', 'messia' ),
							'new_item_name'         => __( 'New Property Name', 'messia' ),
							'back_to_items'         => __( 'Back to property', 'messia' ),
							'no_terms'              => __( 'No properties', 'messia' ),
							'items_list'            => __( 'Property list', 'messia' ),
							'items_list_navigation' => __( 'Property List Navigation', 'messia' ),
							'most_used'             => __( 'Frequently used', 'messia' ),
						]
					),
					'show_ui'            => true,
					'show_in_quick_edit' => false,
					'show_in_nav_menus'  => true,
					'meta_box_cb'        => 'post_categories_meta_box', // OR 'post_tags_meta_box'.
					'show_in_menu'       => true,
					'show_tagcloud'      => true,
					'public'             => true,
					'rewrite'            => [
						'slug'         => 'messia_object_property',
						'with_front'   => false,
						'hierarchical' => false,
					],
					'show_in_rest'       => true,
					'show_admin_column'  => true,
					'publicly_queryable' => false,
					'query_var'          => false,
					'rest_base'          => 'messia_object_property',
				],
				'post_custom_fields' => [],
				'meta_fields'        => [
					[
						'id'            => 'property_group',
						'type'          => 'select',
						'default_value' => -1,
						'options'       => [ [ 'Smartbits\Messia\Includes\Helpers\Messia_Help', 'get_property_groups' ], [] ],
						'label'         => '<span>' . __( 'Group', 'messia' ) . '</span>',
						'description'   => __( 'Properties can be grouped for better visual perception. Groups can be created and sorted in the "Search" tab of Messia settings .', 'messia' ),
						'for_saved'     => false,
					],
					[
						'id'            => 'category_parent',
						'type'          => 'selectmulti',
						'default_value' => [],
						'options'       => [
							[
								'Smartbits\Messia\Includes\Helpers\Messia_Help',
								'get_terms_dropdown_options',
							],
							[
								'taxonomy' => [ 'messia_object_category' ],
								'value'    => 'slug',
							],
						],
						'label'         => '<span>' . __( 'Parent categories', 'messia' ) . '</span>',
						'description'   => __( 'This setting is needed to create hierarchical filters. Child filters appear only when Parent filter value is chosen.', 'messia' ),
						'for_saved'     => false,
					],
					[
						'id'            => 'term_as_filter',
						'type'          => 'checkbox',
						'default_value' => '1',
						'label'         => '<span>' . __( 'Show as filter', 'messia' ) . '</span>',
						'description'   => __( 'If checked, this term will be shown as a checkbox in the filter area.', 'messia' ),
						'for_saved'     => false,
					],
					[
						'id'            => 'term_on_card',
						'type'          => 'checkbox',
						'default_value' => '1',
						'label'         => '<span>' . __( 'Show on card', 'messia' ) . '</span>',
						'description'   => __( 'If checked, this term will be shown on object card as an icon if you set it, or as a term name if icon is not set.', 'messia' ),
						'for_saved'     => false,
					],
					[
						'id'            => 'term_icon',
						'type'          => 'mediasingle',
						'default_value' => null,
						'label'         => '<span>' . __( 'Icon', 'messia' ) . '</span>',
						'description'   => __( 'This image will be used in addition to the name of the term.', 'messia' ),
					],
				],
			],
			'messia_object_nomenclature'  => [
				'post_types'         => [ 'messia_object' ],
				'args'               => [
					'hierarchical'       => false,
					'label'              => __( 'Products/Services', 'messia' ),
					'labels'             => array_merge(
						$this->get_taxonomy_labels( __( 'Product/Service', 'messia' ), __( 'Products/Services', 'messia' ) ),
						[
							'parent_item'           => __( 'Parent Product/Service', 'messia' ),
							'parent_item_colon'     => __( 'Parent Product/Service:', 'messia' ),
							'choose_from_most_used' => __( 'Choose from frequently used Products/Services', 'messia' ),
							'view_item'             => __( 'View product/service', 'messia' ),
							'new_item_name'         => __( 'Name of new product/service', 'messia' ),
							'back_to_items'         => __( 'Back to products/services', 'messia' ),
							'no_terms'              => __( 'No Products/Services', 'messia' ),
							'items_list'            => __( 'List of Products/Services', 'messia' ),
							'items_list_navigation' => __( 'Product/Service List Navigation', 'messia' ),
							'most_used'             => __( 'Frequently used', 'messia' ),
						]
					),
					'show_ui'            => true,
					'show_in_quick_edit' => false,
					'show_in_nav_menus'  => false,
					'meta_box_cb'        => false,
					'show_in_menu'       => true,
					'show_tagcloud'      => false,
					'public'             => true,
					'rewrite'            => [
						'slug'         => 'messia_object_nomenclature',
						'with_front'   => false,
						'hierarchical' => false,
					],
					'show_in_rest'       => true,
					'show_admin_column'  => true,
					'publicly_queryable' => false,
					'query_var'          => false,
					'rest_base'          => 'messia_object_nomenclature',
				],
				'post_custom_fields' => [],
				'meta_fields'        => [],
			],
			'messia_object_specification' => [
				'post_types'         => [ 'messia_object' ],
				'args'               => [
					'hierarchical'       => false,
					'label'              => __( 'Specifications', 'messia' ),
					'labels'             => array_merge(
						$this->get_taxonomy_labels( __( 'Specification', 'messia' ), __( 'Specifications', 'messia' ) ),
						[
							'parent_item'           => __( 'Parent Specification', 'messia' ),
							'parent_item_colon'     => __( 'Parent Specification:', 'messia' ),
							'choose_from_most_used' => __( 'Choose from commonly used Specifications', 'messia' ),
							'view_item'             => __( 'View specifications', 'messia' ),
							'new_item_name'         => __( 'Name of new specification', 'messia' ),
							'back_to_items'         => __( 'Back to specifications', 'messia' ),
							'no_terms'              => __( 'No specifications', 'messia' ),
							'items_list'            => __( 'Specifications List', 'messia' ),
							'items_list_navigation' => __( 'Specification List Navigation', 'messia' ),
							'most_used'             => __( 'Frequently used', 'messia' ),
						]
					),
					'show_ui'            => true,
					'show_in_quick_edit' => false,
					'show_in_nav_menus'  => false,
					'meta_box_cb'        => false,
					'show_in_menu'       => true,
					'show_tagcloud'      => false,
					'public'             => true,
					'rewrite'            => [
						'slug'         => 'messia_object_specification',
						'with_front'   => false,
						'hierarchical' => false,
					],
					'show_in_rest'       => true,
					'show_admin_column'  => false,
					'publicly_queryable' => false,
					'query_var'          => false,
					'rest_base'          => 'messia_object_specification',
				],
				'post_custom_fields' => [],
				'meta_fields'        => [],
			],
		];

		// TODO - develop logic.
		unset( $this->custom_taxonomies_config['messia_object_nomenclature'] );
		unset( $this->custom_taxonomies_config['messia_object_specification'] );
	}

	/**
	 * Setup custom post types.
	 *
	 * @return void
	 */
	private function setup_posttype(): void {

		$singular = __( 'Object', 'messia' );
		$plural   = __( 'Objects', 'messia' );

		$this->custom_posttype_config = [
			'messia_object' => [
				'labels'                => [
					'name'                  => $plural,
					'singular_name'         => $singular,
					'menu_name'             => __( 'Objects', 'messia' ),
					// translators: %s post type plural name.
					'all_items'             => sprintf( __( 'All %s', 'messia' ), $plural ),
					'add_new'               => __( 'Add new', 'messia' ),
					// translators: %s post type singular name.
					'add_new_item'          => sprintf( __( 'Add %s', 'messia' ), $singular ),
					'edit'                  => __( 'Edit', 'messia' ),
					// translators: %s post type singular name.
					'edit_item'             => sprintf( __( 'Edit %s', 'messia' ), $singular ),
					// translators: %s post type singular name.
					'new_item'              => sprintf( __( 'Add %s', 'messia' ), $singular ),
					// translators: %s post type singular name.
					'view'                  => sprintf( __( 'View %s', 'messia' ), $singular ),
					// translators: %s post type singular name.
					'view_item'             => sprintf( __( 'View %s', 'messia' ), $singular ),
					// translators: %s post type plural name.
					'search_items'          => sprintf( __( 'Search %s', 'messia' ), $plural ),
					// translators: %s post type plural name.
					'not_found'             => sprintf( __( '%s not found', 'messia' ), $plural ),
					// translators: %s post type plural name.
					'not_found_in_trash'    => sprintf( __( '%s not found in trash', 'messia' ), $plural ),
					// translators: %s post type plural name.
					'parent'                => sprintf( __( 'Parent %s', 'messia' ), $singular ),
					'featured_image'        => __( 'Object Image', 'messia' ),
					'set_featured_image'    => __( 'Set image', 'messia' ),
					'remove_featured_image' => __( 'Remove image', 'messia' ),
					'use_featured_image'    => __( 'Use as Object Image', 'messia' ),
				],
				// translators: %s post type singular name.
				'description'           => sprintf( __( 'Here you can create and edit %s.', 'messia' ), $plural ),
				'public'                => true,
				'show_ui'               => true,
				'map_meta_cap'          => true,
				'publicly_queryable'    => true,
				'exclude_from_search'   => false,
				'hierarchical'          => false,
				// 'rewrite'            => false,

				/*
				 * If you register permalinks here, then in
				 * class-messia-cpt.php: activate the "generate_rewrite_rules" hook
				 * and remove the "add_permastruct" handling from the cpt method
				 */
				'rewrite'               => [
					'slug'       => 'messia_object',
					'with_front' => false,
					'feeds'      => false,
					'pages'      => false,
				],
				'query_var'             => true,
				'supports'              => [ 'title', 'editor', 'author', 'thumbnail', 'comments', 'revisions' /* 'page-attributes', */ /* 'custom-fields' */ ],
				'has_archive'           => false,
				'show_in_nav_menus'     => false,
				'delete_with_user'      => false,
				'show_in_rest'          => true, // Also force Gutenberg On.
				'rest_base'             => 'messia_object',
				'rest_controller_class' => 'WP_REST_Posts_Controller',
				'template'              => [ [ 'core/freeform' ] ],
				// 'template_lock'      => 'all', // all | insert.
				'menu_position'         => 20,
				'menu_icon'             => 'dashicons-buddicons-groups',
				'taxonomies'            => [ 'messia_object_segment', 'messia_category' ],
			],
		];
	}

	/**
	 * Helper for taxonomy registartion.
	 * Return unified structure for taxonomy label values.
	 *
	 * @param string $singular Singular form value for label.
	 * @param string $plural   Plural form value for label.
	 *
	 * @return array
	 */
	private function get_taxonomy_labels( string $singular, string $plural ): array {

		return [
			'name'                       => $plural,
			'singular_name'              => $singular,
			'menu_name'                  => ucwords( $plural ),
			// translators: %s taxonomy plural name.
			'search_items'               => sprintf( __( 'Search %s', 'messia' ), $plural ),
			// translators: %s taxonomy plural name.
			'all_items'                  => sprintf( __( 'All %s', 'messia' ), $plural ),
			// translators: %s taxonomy singular name.
			'edit_item'                  => sprintf( __( 'Edit %s', 'messia' ), $singular ),
			// translators: %s taxonomy plural name.
			'update_item'                => sprintf( __( 'Refresh %s', 'messia' ), $singular ),
			// translators: %s taxonomy plural name.
			'add_new_item'               => sprintf( __( 'Add New %s', 'messia' ), $singular ),
			// translators: %s taxonomy plural name.
			'popular_items'              => sprintf( __( 'Popular %s', 'messia' ), $plural ),
			'not_found'                  => __( 'No items found', 'messia' ),
			// translators: %s taxonomy plural name.
			'separate_items_with_commas' => sprintf( __( '%s separates by commas', 'messia' ), $plural ),
			// translators: %s taxonomy plural name.
			'add_or_remove_items'        => sprintf( __( 'Add or Remove %s', 'messia' ), $plural ),
		];
	}

	/**
	 * Helper for constructor fields.
	 * Return unified structure for constructor visble title.
	 *
	 * @return array
	 */
	private function get_constructor_title_field(): array {
		return [
			'tag'         => 'input',
			'type'        => 'text',
			'required'    => false,
			'placeholder' => __( 'Visible name (optional)', 'messia' ),
			'default'     => null,
			'scope'       => 'titles',
		];
	}

	/**
	 * Helper for constructor fields.
	 * Return unified structure for constructor internal title.
	 *
	 * @return array
	 */
	private function get_constructor_name_field(): array {
		return [
			'tag'         => 'input',
			'type'        => 'text',
			'required'    => true,
			'placeholder' => __( 'Service name (required)', 'messia' ),
			'default'     => null,
			'scope'       => 'titles',
		];
	}

	/**
	 * Helper for constructor fields.
	 * Return unified structure for constructor unique slug field.
	 *
	 * @return array
	 */
	private function get_constructor_slug_field(): array {
		return [
			'tag'         => 'input',
			'type'        => 'text',
			'required'    => true,
			'placeholder' => __( 'Slug (required unique)', 'messia' ),
			'default'     => null,
			'scope'       => 'titles',
		];
	}

	/**
	 * Helper for constructor fields.
	 * Return unified structure for constructor icon field.
	 *
	 * @return array
	 */
	private function get_constructor_icon_field(): array {
		return [
			'tag'      => 'input',
			'type'     => 'hidden',
			'required' => false,
			'default'  => wp_json_encode( [ [ 'type' => 'placeholder-image' ] ] ),
			'scope'    => 'titles',
		];
	}

	/**
	 * Helper for constructor fields.
	 * Return unified structure for constructor activity slug field.
	 *
	 * @return array
	 */
	private function get_constructor_active_field(): array {
		return [
			'tag'     => 'input',
			'type'    => 'checkbox',
			'label'   => __( 'Active', 'messia' ),
			'title'   => __( 'The field is active and its value will be displayed?', 'messia' ),
			'default' => 0,
			'scope'   => 'instance',
		];
	}

	/**
	 * Getter for scopes configuration.
	 *
	 * @return array
	 */
	public function get_caps_scopes(): array {
		return $this->caps_scopes;
	}

	/**
	 * Getter for scope of the custom fileds.
	 *
	 * @return array
	 */
	public function get_post_custom_fields_caps(): array {
		return $this->post_custom_fields_caps;
	}

	/**
	 * Getter for custom taxonomies config.
	 *
	 * @return array
	 */
	public function get_custom_taxonomies_config(): array {
		return $this->custom_taxonomies_config;
	}

	/**
	 * Getter for custom post types config.
	 *
	 * @return array
	 */
	public function get_custom_posttype_config(): array {
		return $this->custom_posttype_config;
	}
}
