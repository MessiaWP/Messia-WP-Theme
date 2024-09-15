<?php
/**
 * Messia_Object Trait
 *
 * @package Messia\Traits
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
namespace Smartbits\Messia\Includes\Traits;

use Smartbits\Messia\Includes\Config\Messia_Config_Custom_Fields;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Methods for custom fields render.
 *
 * @package Messia\Traits
 */
trait Messia_Custom_Fields {

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Listing_Tmpl_Base
	 */
	private static $custom_fields_trait_helpers;

	/**
	 * Current blog settings.
	 *
	 * @var array
	 */
	private static $custom_fields_trait_blog_settings = [];


	/**
	 * Trait scripts and styles.
	 *
	 * @var array
	 */
	private static $trait_assets = [
		'style'  => [
			'handle' => 'widget-custom-fields',
			'file'   => 'block-custom-fields',
			'deps'   => [ 'messia-frontend' ],
			'shared' => true,
		],
		'script' => [
			'handle' => 'widget-custom-fields',
			'file'   => 'block-custom-fields',
			'deps'   => [ 'messia-frontend' ],
			'shared' => true,
		],
	];

	/**
	 * Return ready-to-use html of custom field
	 *
	 * @param string $field_type  Internal type of custom field.
	 * @param array  $constructor Meta value of constructed term.
	 * @param int    $segment_id  Segment term id that object belongs to.
	 * @param mixed  $field_value Current constructed value of field.
	 * @param array  $args        Additional attributes.
	 * @param bool   $block_mode  Whether called as block (turn off then scripts and styles).
	 *
	 * @return string HTML
	 */
	protected static function get_custom_field( string $field_type, array $constructor, int $segment_id, mixed $field_value, array $args, bool $block_mode = false ): ?string {

		if ( false === $block_mode ) {

			$scripts = MIA()->get_module_scripts();
			$scripts::register_widget_frontend_assets( self::$trait_assets );

			/* STYLES */
			wp_enqueue_style( 'messia-block-custom-fields' );

			/* SCRIPTS */
			wp_enqueue_script( 'messia-block-custom-fields' );
		}

		self::$custom_fields_trait_helpers       = MIA()->get_module_helpers();
		self::$custom_fields_trait_blog_settings = MIA()->get_module_settings()->get_blog_setting( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME );

		if ( ! is_callable( [ __CLASS__, "get_field_{$field_type}" ] ) ) {
			return "- Custom field callback 'get_field_{$field_type}'() for field type '{$field_type}' is not callable. Expected in trait Messia_Custom_Fields<br>";
		} else {

			$errors                  = [];
			$non_object_page_warning = __( 'Custom fields can be used only at object page, including shortcodes.', 'messia' );
			// translators: %1$s - custom field name.
			$empty_field_warning = sprintf( __( 'Custom field "%1$s" of type "%2$s" is empty.', 'messia' ), $constructor['slug'], $field_type );

			if ( ! is_singular( 'messia_object' ) ) {
				$errors[] = $non_object_page_warning;
			}

			if ( empty( $field_value ) || 'null' === $field_value || '-1' === $field_value ) {
				$errors[] = $empty_field_warning;
			} elseif ( 'input_link' === $field_type ) {

				$field_value = json_decode( $field_value, true );
				$link_title  = key( $field_value );
				$link_url    = $field_value[ $link_title ];

				if ( empty( $link_title ) && empty( $link_url ) ) {
					$errors[] = $empty_field_warning;
				}
			}

			if ( ! empty( $errors ) ) {
				return self::$custom_fields_trait_helpers::print_errors( __( 'Custom fileds:', 'messia' ), $errors );
			}

			switch ( $field_type ) {
				case 'input_text':
				case 'input_textarea':
				case 'input_address':
				case 'input_checkbox':
				case 'input_number':
				case 'input_link':
				case 'input_images':
				case 'input_external_media':
				case 'input_html':
				case 'select_post_single':
				case 'select_post_multi':
					return call_user_func( [ __CLASS__, "get_field_{$field_type}" ], $constructor, $segment_id, $field_value, $args );
				default:
					return "Unknown custom field type {$field_type} requested'";
			}
		}
	}

	/**
	 * Get render for input_text type field
	 *
	 * @param array   $constructor Meta value of constructed term.
	 * @param integer $segment_id  Segment term id that object belongs to.
	 * @param string  $field_value Current constructed value of field.
	 * @param array   $args        Additional attributes.
	 *
	 * @return string HTML
	 */
	private static function get_field_input_text( array $constructor, int $segment_id, string $field_value, array $args ): string {

		$title       = self::get_custom_field_title( $constructor );
		$field_value = "<div class='custom-field-value'>{$field_value}</div>";

		return "<div class='custom_type-container input_text'>
					{$title}{$field_value}
				</div>";
	}

	/**
	 * Get render for input_textarea type field
	 *
	 * @param array   $constructor Meta value of constructed term.
	 * @param integer $segment_id  Segment term id that object belongs to.
	 * @param string  $field_value Current constructed value of field.
	 * @param array   $args        Additional attributes.
	 *
	 * @return string HTML
	 */
	private static function get_field_input_textarea( array $constructor, int $segment_id, string $field_value, array $args ): string {

		$title       = self::get_custom_field_title( $constructor );
		$field_value = "<div class='custom-field-value'>{$field_value}</div>";

		return "<div class='custom_type-container input_textarea'>
					{$title}{$field_value}
				</div>";
	}

	/**
	 * Get render for input_link type field
	 *
	 * @param array   $constructor Meta value of constructed term.
	 * @param integer $segment_id  Segment term id that object belongs to.
	 * @param array   $field_value Current constructed value of field.
	 * @param array   $args        Additional attributes.
	 *
	 * @return string HTML
	 */
	private static function get_field_input_link( array $constructor, int $segment_id, array $field_value, array $args ): string {

		$title      = self::get_custom_field_title( $constructor );
		$link_title = array_keys( $field_value );
		$link_url   = array_values( $field_value );

		if ( empty( $link_title[0] ) ) {
			$link_title[0] = $link_url[0];
		}
		if ( 1 === $constructor['use_object_title'] ) {
			$link_title[0] = $title['title'];
		}

		$target = ( 1 === $constructor['blank'] ? "target='_blank'" : null );

		return "<div class='custom_type-container input_link'>
			{$title}
			<a class='custom-field-value messia-btn messia-btn-outline messia-ripple-click mr-2' {$target} href='{$link_url[0]}'>{$link_title[0]}</a>
		</div>";
	}

	/**
	 * Get render for input_address type field
	 *
	 * @param array   $constructor Meta value of constructed term.
	 * @param integer $segment_id  Segment term id that object belongs to.
	 * @param array   $field_value Current constructed value of field.
	 * @param array   $args        Additional attributes.
	 *
	 * @return string HTML
	 */
	private static function get_field_input_address( array $constructor, int $segment_id, array $field_value, array $args ): string {

		$blog_settings = self::$custom_fields_trait_blog_settings;
		$address       = $field_value['user_address'];
		$title         = self::get_custom_field_title( $constructor, $address );

		if ( empty( $blog_settings['google_maps_api_key'] ) || empty( $field_value['latitude'] ) || empty( $field_value['longitude'] ) ) {
			return "<div class='custom_type-container input_address'>{$title}{$address}</div>";

		} elseif ( true === $args['with_map'] ) {

				return "<div class='custom_type-container input_address'>
							{$title}
							<div class='messia-map'>
								<div class='map' data-lat='{$field_value['latitude']}' data-lng='{$field_value['longitude']}' data-address='{$address}'></div>
							</div>
						</div>";
		} else {

			/* STYLES */
			wp_enqueue_style( 'messia-fancybox' );

			/* SCRIPTS */
			wp_enqueue_script( 'messia-fancybox' );

			$rnd   = bin2hex( random_bytes( 5 ) );
			$attrs = [
				'data-src' => "#field-{$rnd}",
			];
			$title = self::get_custom_field_title( $constructor, $address, [ 'map-popup-trigger cursor-pointer' ], $attrs );
			return "<div class='custom_type-container input_address'>
							{$title}
							<div class='custom-field-value messia-map popup' id='field-{$rnd}'>
								<div class='map' data-lat='{$field_value['latitude']}' data-lng='{$field_value['longitude']}' data-address='{$address}'></div>
							</div>
						</div>";
		}
	}

	/**
	 * Get render for input_checkbox type field
	 *
	 * @param array   $constructor Meta value of constructed term.
	 * @param integer $segment_id  Segment term id that object belongs to.
	 * @param string  $field_value Current constructed value of field.
	 * @param array   $args        Additional attributes.
	 *
	 * @return string HTML
	 */
	private static function get_field_input_checkbox( array $constructor, int $segment_id, string $field_value, array $args ): ?string {

		if ( '0' === $field_value ) {
			return null;
		}

		$title = self::get_custom_field_title( $constructor );

		return "<div class='custom_type-container input_checkbox'>
					{$title}
				</div>";
	}

	/**
	 * Get render for input_number type field
	 *
	 * @param array   $constructor Meta value of constructed term.
	 * @param integer $segment_id  Segment term id that object belongs to.
	 * @param float   $field_value Current constructed value of field.
	 * @param array   $args        Additional attributes.
	 *
	 * @return string HTML
	 */
	private static function get_field_input_number( array $constructor, int $segment_id, float $field_value, array $args ): string {

		$number    = Messia_Config_Custom_Fields::get_custom_field_formatted_value( $constructor, $field_value );
		$dimension = $constructor['units'];

		$title       = self::get_custom_field_title( $constructor );
		$field_value = "<div class='custom-field-value {$dimension}'>{$number}</div>";

		return "<div class='custom_type-container input_number'>
					{$title}{$field_value}
				</div>";
	}

	/**
	 * Get render for input_images type field
	 *
	 * @param array   $constructor Meta value of constructed term.
	 * @param integer $segment_id  Segment term id that object belongs to.
	 * @param array   $field_value Current constructed value of field.
	 * @param array   $args        Additional attributes.
	 *
	 * @return string HTML
	 */
	private static function get_field_input_images( array $constructor, int $segment_id, array $field_value, array $args ): ?string {

		$rnd       = bin2hex( random_bytes( 5 ) );
		$img_thumb = null;
		$img_full  = null;
		$images    = $field_value;

		if ( is_null( $images ) || count( $images ) === 0 ) {
			return null;
		}

		/* STYLES */
		wp_enqueue_style( 'messia-fancybox' );

		/* SCRIPTS */
		wp_enqueue_script( 'messia-fancybox' );

		$i     = 1;
		$size  = 'full';
		$title = self::get_custom_field_title( $constructor );

		foreach ( $images as $image ) {

			if ( $i > 1 ) {
				$size = 'messia_gallery_thumb';
			}
			$img_url = wp_get_attachment_url( (int) $image['id'] );
			$img_tag = wp_get_attachment_image( (int) $image['id'], $size, false, false, false );

			if ( isset( $image['url'] ) ) {
				$img_thumb .= "<div class='gallery-item'>
								<a href='{$image['url']}' target='_blank'>{$img_tag}</a>
							</div>";
			} elseif ( $i > 1 ) {
					$img_thumb .= "<div class='gallery-item'>
										<a href='{$img_url}' data-fancybox='gallery-{$rnd}'>{$img_tag}</a>
									</div>";
			} else {
				$img_full = "<div class='gallery-item'>
									<a href='{$img_url}' data-fancybox='gallery-{$rnd}'>{$img_tag}</a>
								</div>";
			}
			++$i;
		}

		return "<div class='custom_type-container gallery mb-4'>
					{$title}
					<div class='custom-field-value'>
						<div class='full-container'>{$img_full}</div>
						<div class='thumb-container'>{$img_thumb}</div>
					</div>
				</div>";
	}

	/**
	 * Get render for input_external_media type field
	 *
	 * @param array   $constructor Meta value of constructed term.
	 * @param integer $segment_id  Segment term id that object belongs to.
	 * @param string  $field_value Current constructed value of field.
	 * @param array   $args        Additional attributes.
	 *
	 * @return string HTML
	 */
	private static function get_field_input_external_media( array $constructor, int $segment_id, string $field_value, array $args ): string {

		$title = self::get_custom_field_title( $constructor );

		return "<div class='custom_type-container external_media'>
					{$title}{$field_value}
				</div>";
	}

	/**
	 * Get render for input_html type field
	 *
	 * @param array   $constructor Meta value of constructed term.
	 * @param integer $segment_id  Segment term id that object belongs to.
	 * @param string  $field_value Current constructed value of field.
	 * @param array   $args        Additional attributes.
	 *
	 * @return string HTML
	 */
	private static function get_field_input_html( array $constructor, int $segment_id, string $field_value, array $args ): string {

		$title       = self::get_custom_field_title( $constructor );
		$field_value = "<div class='custom-field-value'>{$field_value}</div>";

		return "<div class='custom_type-container input_html'>
					{$title}{$field_value}
				</div>";
	}

	/**
	 * Get render for select_post_single type field
	 *
	 * @param array   $constructor Meta value of constructed term.
	 * @param integer $segment_id  Segment term id that object belongs to.
	 * @param string  $field_value Current constructed value of field.
	 * @param array   $args        Additional attributes.
	 *
	 * @return string HTML
	 */
	private static function get_field_select_post_single( array $constructor, int $segment_id, string $field_value, array $args ): ?string {

		if ( '-1' === $field_value ) {
			return null;
		}

		$title = self::get_custom_field_title( $constructor );

		$post_title = get_the_title( $field_value );
		$post_url   = get_the_permalink( $field_value );
		$thumbnail  = get_the_post_thumbnail(
			$field_value,
			[ 36, 36 ],
			[
				'itemprop' => 'image',
			]
		);

		$post = "<a href='{$post_url}'>{$thumbnail}<span>{$post_title}</span></a>";
		return "<div class='custom_type-container select_post_single'>
					{$title}
					<div class='custom-field-value posts'>{$post}</div>
				</div>";
	}

	/**
	 * Get render for select_post_multi type field
	 *
	 * @param array   $constructor Meta value of constructed term.
	 * @param integer $segment_id  Segment term id that object belongs to.
	 * @param mixed   $field_value Current constructed value of field.
	 * @param array   $args        Additional attributes.
	 *
	 * @return string HTML
	 */
	private static function get_field_select_post_multi( array $constructor, int $segment_id, mixed $field_value, array $args ): ?string {

		if ( ! is_array( $field_value ) ) {
			return null;
		}

		$blog_settings = self::$custom_fields_trait_blog_settings;
		$card_args     = [
			'animated_appearance' => false,
			'ripple_hover'        => ( 1 === $blog_settings['object_card_bubble_hover'] ) ? true : false,
			'ripple_click'        => true,
			'image_size'          => ( count( $field_value ) < 4 ) ? 'messia_card_thumb_m' : 'messia_card_thumb_s',
		];

		$html  = null;
		$title = self::get_custom_field_title( $constructor );
		$args  = shortcode_atts(
			[
				'card_mode' => false,
			],
			$args
		);

		if ( true === $args['card_mode'] ) {

			$helper = MIA()->get_module_object_card();

			foreach ( $field_value as $id ) {
				$html .= $helper::get_object_card( $segment_id, $id, $card_args );
			}
			$columns = ( count( $field_value ) > 3 ) ? 4 : 3;
			return "<div class='custom_type-container select_post_multi'>
						{$title}
						<div class='custom-field-value row listing-col-{$columns} grid-container'>
							{$html}
						</div>
					</div>";
		} else {
			foreach ( $field_value as $id ) {
				$post_title = get_the_title( $id );
				$post_url   = get_the_permalink( $id );

				$html .= "<a href='{$post_url}'><span>{$post_title}</span></a>";
			}

			return "<div class='custom_type-container select_post_multi'>
						{$title}
						<div class='custom-field-value posts'>{$html}</div>
					</div>";
		}
	}

	/**
	 * Get title for custom field.
	 *
	 * @param string|array $constructor Meta value of constructed term.
	 * @param string|null  $extra_data  Extra data to add to title.
	 * @param array        $classes     CSS classes to add to title.
	 * @param array        $attributes  CSS attributes to add to title.
	 *
	 * @return string|null
	 */
	private static function get_custom_field_title( string|array $constructor, ?string $extra_data = null, array $classes = [], array $attributes = [] ): ?string {

		$icon  = self::get_custom_field_icon( $constructor['icon'] );
		$title = ( empty( $constructor['title'] ) ) ? $constructor['name'] : $constructor['title'];

		$title .= ':&nbsp;';

		if ( is_null( $icon ) && is_null( $title ) ) {
			return null;
		}
		array_unshift( $classes, 'custom-field-title' );
		array_walk(
			$attributes,
			function( &$value, $key ) {
				$value = "{$key}='{$value}'";
			}
		);

		$attributes = implode( ' ', $attributes );
		$classes    = implode( ' ', $classes );
		return "<h4 class='{$classes} d-flex w-100 align-items-center' {$attributes}>{$icon}{$title}{$extra_data}</h4>";
	}

	/**
	 * Get icon for custom field.
	 *
	 * @param string $constructor_icon Array of attached to constructed term media files.
	 *
	 * @return string|null
	 */
	private static function get_custom_field_icon( string $constructor_icon ): ?string {

		if ( empty( $constructor_icon ) ) {
			return null;
		}

		$helpers = MIA()->get_module_helpers();
		return $helpers::get_media_icon_front( json_decode( $constructor_icon, false ) );
	}
}
