<?php
/**
 * Messia_Cpt_Config
 * Define available misurment units for custom fields.
 *
 * @package Messia\Config
 */

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Config;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Class setting up theme config.
 *
 * @package wpAdminMenuPage
 */
class Messia_Config_Custom_Fields {

	private static ?array $units = null;

	/**
	 * Units getter
	 *
	 * @return array
	 */
	public static function get_units(): array {

		if ( is_null( self::$units ) ) {

			self::$units = [
				'currency' => [
					'EUR' => __( '€', 'messia' ),
					'USD' => __( '$', 'messia' ),
				],
				'area'     => [
					'FTK' => __( 'sqft', 'messia' ),
					'MTK' => __( 'sqm', 'messia' ),
				],
				'datetime' => [
					'YEAR' => __( 'year', 'messia' ),
				],
			];
		}

		return apply_filters( 'messia_custom_fields_units', self::$units );
	}

	/**
	 * Get string value foramtted of constructor field.
	 *
	 * @param array $constructor Constructor term.
	 * @param mixed $value       Saved value.
	 *
	 * @return string
	 */
	public static function get_custom_field_formatted_value( array $constructor, $value ): string {

		$cf_units = self::get_units();
		$cf_units = array_merge( ...array_values( $cf_units ) );

		switch ( $constructor['field_type'] ) {
			case 'input_number':
				$dimension = $constructor['units'];
				$units     = ( array_key_exists( $dimension, $cf_units ) ) ? $cf_units[ $dimension ] : null;

				$num = number_format(
					(float) $value,
					$constructor['number_precision'],
					$constructor['decimal_separatop'],
					$constructor['thousand_separatop']
				);

				if ( ! is_null( $units ) ) {
					switch ( $constructor['unit_position'] ) {
						case 'left':
							$num = "{$units}{$num}";
							break;
						case 'left_space':
							$num = "{$units}&nbsp;{$num}";
							break;
						case 'right':
							$num = "{$num}{$units}";
							break;
						case 'right_space':
							$num = "{$num}&nbsp;{$units}";
							break;
						default:
							$num = "{$num}{$units}";
							break;
					}
				}

				return $num;

			default:
				return $value;
		}
	}

	/**
	 * Creates string representation of units.
	 *
	 * @param array $term Constructor term.
	 *
	 * @return string
	 */
	public static function get_units_label_for_field( array $term ): ?string {

		$cf_units = self::get_units();
		$cf_units = array_merge( ...array_values( $cf_units ) );

		if ( ! array_key_exists( $term['units'], $cf_units ) ) {
			return null;
		}

		$units = $cf_units[ $term['units'] ];

		switch ( $term['unit_position'] ) {
			case 'left':
				return $units;

			case 'right':
				return $units;

			case 'left_space':
				return "{$units}&nbsp;";

			case 'right_space':
				return "&nbsp;{$units}";

			default:
				return null;
		}
	}
}
