<?php
/**
 * Messia_Object
 *
 * @package Messia\Helpers
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Helpers;

use Smartbits\Messia\Includes\Config\Messia_Config_Custom_Fields;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Base methods for all objects.
 *
 * @package Messia\Helpers
 */
class Messia_Object_Card {

	/**
	 * Full class name.
	 *
	 * @var Messia_Help
	 */
	private static ?string $helpers = null;

	/**
	 * Available output zones
	 *
	 * @var array
	 */
	private static array $areas = [];

	/**
	 * Get namespaced class name.
	 *
	 * @return Messia_Object_Card
	 */
	public static function init() {
		add_filter( 'max_srcset_image_width', [ __CLASS__, 'max_srcset_image_width' ], 10, 2 );
		return __CLASS__;
	}

	/**
	 * Filters the maximum image width to be included in a 'srcset' attribute.
	 *
	 * @param int   $max_width  The maximum image width to be included in the 'srcset'. Default '2048'.
	 * @param array $size_array An array of requested width and height values for image.
	 *
	 * @return int
	 */
	public static function max_srcset_image_width( int $max_width, array $size_array ): int {
		return 450;
	}

	/**
	 * Build crad object HTML.
	 *
	 * @param int   $segment_term_id Segment of object.
	 * @param int   $object_id       ID of object.
	 * @param array $args            Extra arguments.
	 *
	 * @return string
	 */
	public static function get_object_card( int $segment_term_id, int $object_id, array $args = [] ): ?string {

		self::set_helpers();

		if ( empty( self::$areas ) ) {
			self::setup_areas();
		}

		$errors          = [];
		$object          = get_post( $object_id );
		$object_title    = get_the_title( $object_id );
		$object_page_url = get_the_permalink( $object_id );
		$featured_key    = str_replace( [ '%name%', '%Id%' ], [ 'is_featured', $segment_term_id ], MESSIA_POSTMETA_STUFF_NAME );
		$featured_val    = (int) get_post_meta( $object_id, $featured_key, true );
		$object_props    = self::$helpers::get_object_terms( [ $object_id ], [ 'messia_object_property' ], [ 'term_icon', 'term_on_card' ] );
		$object_rating   = self::$helpers::get_object_rating_snippet(
			$object,
			[
				'stars'       => true,
				'date'        => false,
				'av_point'    => false,
				'av_point_of' => true,
				'reviews'     => true,
			],
			false
		);

		$args = wp_parse_args(
			$args,
			[
				'animated_appearance' => false,
				'ripple_hover'        => false,
				'ripple_click'        => false,
				'image_size'          => 'messia_card_thumb_s',
			]
		);

		$badges       = null;
		$geo_data     = [];
		$thumbnail_id = get_post_thumbnail_id( $object_id );
		$image_size   = $args['image_size'];

		if ( $thumbnail_id ) {
			$thumbnail = wp_get_attachment_image( $thumbnail_id, $image_size );
		} else {
			$thumbnail = '<img width="310" height="210" src="/wp-content/themes/messia/includes/assets/images/logo-placeholder.png">';
		}

		$wrapper_classes_arr = [ 'item-card col-12 col-lg-4 col-md-6 mb-4' ];
		$card_classes_arr    = [ 'object-card h-100 position-relative flex-column d-flex overflow-hidden' ];

		( true === $args['animated_appearance'] ) ? $wrapper_classes_arr[] = 'wow' : null;
		( true === $args['ripple_hover'] ) ? $card_classes_arr[]           = 'messia-ripple-hover' : null;
		( true === $args['ripple_click'] ) ? $card_classes_arr[]           = 'messia-ripple-click' : null;

		$wrapper_classes = 'class="' . implode( ' ', $wrapper_classes_arr ) . '"';
		$card_classes    = 'class="' . implode( ' ', $card_classes_arr ) . '"';

		$meta_raw_output = [
			'card_feature_block'  => [],
			'card_feature_inline' => [],
			'card_excerpt'        => [],
			'card_cta'            => [],
			'op_hero'             => [],
		];

		$meta_key = str_replace( '%Id%', (string) $segment_term_id, MESSIA_POSTMETA_CONSTRUCTED_NAME );

		$object_constructed = json_decode( get_post_meta( $object_id, $meta_key, true ), true );
		$term_constructed   = self::$helpers::messia_get_term_meta( $segment_term_id, 'constructor_cf' );

		if ( ! is_array( $object_constructed ) || empty( $object_constructed ) ) {
			// translators: %s - segment ID.
			$errors[] = sprintf( __( 'Object has no meta data for segment ID %s.', 'messia' ), $segment_term_id );
			// translators: %s - object title.
			$errors = self::$helpers::print_errors( sprintf( __( 'Object %s', 'messia' ), $object_title ), $errors, null, false, $card_classes_arr );

			return "<div {$wrapper_classes}>{$errors}</div>";
		}

		foreach ( $term_constructed as $constructor_field ) {

			// If custom field of type Address is Off geo coords should be still appended to object card.
			if ( 'input_address' === $constructor_field['field_type'] ) {
				if ( isset( $object_constructed[ $constructor_field['slug'] ] ) ) {

					$address = $object_constructed[ $constructor_field['slug'] ];

					$lat  = $address['latitude'];
					$lng  = $address['longitude'];
					$info = $address['user_address'];

					if ( ! empty( $lat ) && ! empty( $lng ) ) {
						$geo_data[] = [
							'lat'  => $lat,
							'lng'  => $lng,
							'info' => ( empty( $info ) ) ? null : $info,
						];
					}
				}
			}

			$field_value = self::validate_field( $constructor_field, (array) $object_constructed );

			if ( false === $field_value ) {
				continue;
			}

			foreach ( $constructor_field['caps'] as $field_area ) {

				$title = self::get_object_title( $constructor_field );

				if ( ! is_null( $title['title'] ) ) {
					if ( 'input_checkbox' === $constructor_field['field_type'] ) {
						$title['title'] = "<span class='item-title'>{$title['title']}</span>";
					} else {
						$title['title'] = "<span class='item-title'>{$title['title']}:&nbsp;</span>";
					}
				}

				if ( ! is_null( $title['icon'] ) ) {
					$title['icon'] = "<span class='item-icon me-2 flex-shrink-0'>{$title['icon']}</span>";
				}

				switch ( $constructor_field['field_type'] ) {

					case 'input_text':
					case 'input_textarea':
						if ( (int) $constructor_field['maxlength'] > 0 ) {

							$maxlength = (int) $constructor_field['maxlength'];

							if ( strlen( (string) $field_value ) > $maxlength ) {
								$field_value = substr( $field_value, 0, (int) $constructor_field['maxlength'] ) . '[…]';
							}
						}
						$field_value                      = "<span class='item-value'>{$field_value}</span>";
						$meta_raw_output[ $field_area ][] = "<span class='item {$constructor_field['field_type']}'>{$title['icon']}{$title['title']}{$field_value}</span>";
						break;

					case 'input_html':
						$field_value                      = "<span class='item-value'>{$field_value}</span>";
						$meta_raw_output[ $field_area ][] = "<span class='item {$constructor_field['field_type']}'>{$title['icon']}{$title['title']}{$field_value}</span>";
						break;

					case 'input_address':
						$value = $field_value['user_address'];

						if ( empty( $value ) ) {
							continue 2;
						}

						$meta_raw_output[ $field_area ][] = "<span class='item d-flex align-items-center {$constructor_field['field_type']}'>{$title['icon']}<span class=' item-value'>{$title['title']}{$value}</span></span>";
						break;

					case 'input_number':
						$number    = Messia_Config_Custom_Fields::get_custom_field_formatted_value( $constructor_field, $field_value );
						$dimension = $constructor_field['units'];

						$meta_raw_output[ $field_area ][] = "<span class='item {$constructor_field['field_type']}'>{$title['icon']}{$title['title']}<span class='item-value {$dimension}'>{$number}</span></span>";
						break;

					case 'input_checkbox':
						$value = (int) $object_constructed[ $constructor_field['slug'] ];

						if ( 0 === $value ) {
							continue 2;
						}

						$meta_raw_output[ $field_area ][] = "<div class='item {$constructor_field['field_type']}'>{$title['icon']}{$title['title']}</div>";
						break;

					case 'input_link':
						if ( empty( $field_value ) || empty( $field_value['url'] ) ) {
							break;
						}

						$link_title = $field_value['title'];
						$link_url   = $field_value['url'];

						if ( empty( $link_title ) ) {
							$link_title = $link_url;
						}
						if ( 1 === $constructor_field['use_object_title'] ) {
							$link_title = $title['title'];
						}

						$target                           = ( 1 === $constructor_field['blank'] ? "target='_blank'" : null );
						$meta_raw_output[ $field_area ][] = "<div class='item {$constructor_field['field_type']}'><a class='item-value messia-btn messia-btn-outline messia-ripple-click mr-2' {$target} href='{$link_url}'>{$title['icon']}{$link_title}</a></div>";
						break;

					case 'select_post_single':
						$post = get_post( (int) $field_value );
						$href = get_the_permalink( $post->ID );

						$field_value                      = "<a class='item-value post' href='{$href}'>{$post->post_title}</a>";
						$meta_raw_output[ $field_area ][] = "<div class='item {$constructor_field['field_type']}'>{$title['icon']}{$title['title']}{$field_value}</div>";
						break;

					case 'select_post_multi':
						$field_value = null;

						$posts = get_posts(
							[
								'post_type' => $constructor_field['select'],
								'include'   => $field_value,
							]
						);

						foreach ( $posts as $post ) {
							$href         = get_the_permalink( $post->ID );
							$field_value .= "<a class='post' href='{$href}'>{$post->post_title}</a>";
						}

						$meta_raw_output[ $field_area ][] = "<div class='item {$constructor_field['field_type']}'>{$title['icon']}{$title['title']}<span class='item-value'>{$field_value}</span></div>";
						break;

					default:
						// translators: %s - custom field type.
						$title = sprintf( __( 'Object card does not serve field of type "%s"', 'messia' ), $constructor_field['field_type'] );

						$meta_raw_output[ $field_area ][] = "<div class='item {$constructor_field['field_type']}'>{$title}</div>";
						break;
				}
			}
		}

		foreach ( $object_props as $object_property ) {

			if ( 1 === (int) $object_property->term_on_card ) {
				if ( empty( $object_property->term_icon ) ) {

					$badges .= "<li class='term-name'>{$object_property->name}</li>";

				} else {

					$image   = self::$helpers::get_media_icon_front( json_decode( $object_property->term_icon, false ) );
					$badges .= "<li class='term-thumb'>{$image}<span>{$object_property->name}</span></li>";
				}
			}
		}

		ob_start();
		?>
		<div <?php echo $wrapper_classes; ?>>
			<div <?php echo $card_classes; ?>data-geo-data='<?php echo wp_json_encode( $geo_data ); ?>' data-id="<?php echo $object_id; ?>">
				<a class="link-all-card position-absolute h-100 w-100 start-0 top-0 zi-10" href="<?php echo $object_page_url; ?>"></a>
				<?php
				$feature_content = apply_filters( 'messia_listing_card_featured_area', null, $object_id, $object_constructed );

				if ( ! is_null( $feature_content ) ) {
					?>
					<div class="item-featured"><?php echo $feature_content; ?></div>
					<?php
				} elseif ( 1 === $featured_val ) {
					?>
					<div class="item-featured"><?php esc_html_e( 'Featured', 'messia' ); ?></div>
					<?php
				}
				?>
				<div class="card-img-top d-flex align-items-center justify-content-center">
						<?php echo $thumbnail; ?>
				</div>
				<div class="card-content pt-2 px-2 flex-grow-1">
					<p class="card-title mb-1 mt-1" >
						<a class="td-none fs-6 position-relative zi-10 overflow-hidden fw-semibold" title="<?php echo $object_title; ?>" href="<?php echo $object_page_url; ?>"><?php echo $object_title; ?></a>
					</p>
					<?php
					if ( ! empty( $meta_raw_output['card_feature_block'] ) ) {
						?>
						<div class="item-features item-features-block mb-2">
							<?php
							foreach ( $meta_raw_output['card_feature_block'] as $item ) {
								echo "{$item}";
							}
							?>
						</div>
						<?php
					}
					if ( ! empty( $meta_raw_output['card_feature_inline'] ) ) {
						?>
						<div class="item-features item-features-inline mb-2">
							<?php
							foreach ( $meta_raw_output['card_feature_inline'] as $item ) {
								echo "{$item}";
							}
							?>
						</div>
						<?php
					}
					if ( ! is_null( $badges ) ) {
						?>
						<div class="item-properties">
							<ul class="item-properties__lists">
								<?php echo $badges; ?>
							</ul>
						</div>
						<?php
					}

					if ( ! empty( $meta_raw_output['card_excerpt'] ) ) {
						?>
						<div class="item-description">
							<?php
							foreach ( $meta_raw_output['card_excerpt'] as $item ) {
								?>
								<p itemprop="description"><?php echo $item; ?></p>
								<?php
							}
							?>
						</div>
						<?php
					}
					?>

				</div>
				<div class="card-footer py-2 px-2">
						<?php echo $object_rating; ?>
				</div>
				<?php
				if ( ! empty( $meta_raw_output['card_cta'] ) ) {
					?>
					<div class="tags py-2 px-2">
						<?php
						foreach ( $meta_raw_output['card_cta'] as $item ) {
							echo "{$item}";
						}
						?>
					</div>
				<?php } ?>
			</div>
		</div>
		<?php

		return self::$helpers::parse_placeholders( ob_get_clean() );
	}

	/**
	 * Define existing cards zones
	 *
	 * @return void
	 */
	private static function setup_areas(): void {

		$caps = MIA()->get_module_cpt_config()->get_post_custom_fields_caps();

		foreach ( $caps as $zone => $cap ) {
			if ( 'listing' === $cap['area'] ) {
				self::$areas[] = $zone;
			}
		}
	}

	/**
	 * Get current meta data of constructor field
	 * from term constructor and validate it against it's value and card zone.
	 *
	 * @param array $term_meta   Term meta constructor.
	 * @param array $object_meta Object meta data constructor.
	 *
	 * @return mixed
	 */
	private static function validate_field( array $term_meta, array $object_meta ) {

		$filed_value = $object_meta[ $term_meta['slug'] ];

		if ( ! isset( $object_meta[ $term_meta['slug'] ] ) || 0 === count( array_intersect( self::$areas, $term_meta['caps'] ) ) ) {
			return false;
		}

		if (
			( 'input_checkbox' === $term_meta['field_type'] && -1 === (int) $filed_value ) ||
			( 'select_post_single' === $term_meta['field_type'] && -1 === (int) $filed_value ) ||
			( 'select_post_multi' === $term_meta['field_type'] && ! is_array( $filed_value ) ) ||
			( 'input_link' === $term_meta['field_type'] && empty( $filed_value ) )
			) {
			return false;
		}

		return $filed_value;
	}

	/**
	 * Get title for custom field.
	 *
	 * @param array $constructor Term constructor meta.
	 *
	 * @return array
	 */
	private static function get_object_title( array $constructor ): array {

		return [
			'title' => ( empty( $constructor['title'] ) ) ? null : "{$constructor['title']}",
			'icon'  => ( empty( $constructor['icon'] ) ) ? null : self::get_object_icon( $constructor['icon'] ),
		];
	}

	/**
	 * Get icon for custom field
	 *
	 * @param string $constructor_icon Term constructor meta data with icon.
	 *
	 * @return string|null
	 */
	private static function get_object_icon( string $constructor_icon ): ?string {
		self::set_helpers();
		return self::$helpers::get_media_icon_front( json_decode( $constructor_icon, false ) );
	}

	/**
	 * Setup helper class.
	 *
	 * @return void
	 */
	private static function set_helpers(): void {

		if ( is_null( self::$helpers ) ) {
			self::$helpers = MIA()->get_module_helpers();
		}
	}
}
