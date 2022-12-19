<?php
/**
 * Messia_Css_Beautifier
 *
 * @package Messia\Helpers
 */

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Helpers;

/**
 * Class for formatting CSS content.
 *
 * @package Messia\Helpers
 */
class Messia_Css_Beautifier {

	const TAB = '	';

	/**
	 * Add semicolons to rule or not.
	 *
	 * @var bool
	 */
	private static bool $repair = false;

	/**
	 * The run function will beautify your string, which include a CSS structure.
	 *
	 * @param string $string CSS content.
	 * @param bool   $repair Switch the mode that will add semicolons if there has to be one.
	 *
	 * @return string
	 */
	public static function run( string $string, bool $repair = true ): string {
		self::$repair = $repair;

		$taps = 0;

		$beautified_array = [];

		foreach ( self::string_to_array( $string ) as $key => $line ) {
			$line = trim( $line );

			switch ( true ) {
				case preg_match( '/{/', $line ):
					$line = self::check_healthy_white_spaces( self::create_taps( $line, $taps ), preg_match( '/@/', $line ) );
					++$taps;
					break;
				case preg_match( '/}/', $line ):
					--$taps;
					$line = self::create_taps( $line, $taps );
					break;
				default:
					$line = self::check_healthy_white_spaces( self::create_taps( $line, $taps ) );
			}

			$key_value = self::$repair ? self::check_healthy_attribute( $line ) : $line;
			// Remove empty rules - works wrong.
			// $key_value = preg_replace( '/(?:[^\r\n,{}]+)(?:,(?=[^}]*{)|\s*{[\s]*})/', '', $key_value );.

			$beautified_array[ $key ] = $key_value;
		}

		return self::array_to_string( $beautified_array );
	}

	/**
	 * Convert a string to an array.
	 * Each line will be an item in the array.
	 *
	 * @param string $string CSS content.
	 *
	 * @return array
	 */
	private static function string_to_array( string $string ): array {
		return explode( 'NEW_LINE', self::new_lines( $string ) );
	}

	/**
	 * Convert an array to a string.
	 * Each item in the array is a new line in the string.
	 *
	 * @param array $array CSS rules.
	 *
	 * @return string
	 */
	private static function array_to_string( array $array ): string {
		$string = '';
		foreach ( $array as $key => $line ) {
			if ( strlen( preg_replace( '/ /', '', $line ) ) !== 0 ) {
				if ( 0 !== $key ) {
					$string .= "\n";
				}
				$string .= $line;
			}
		}
		return $string;
	}

	/**
	 * Add line break after every "{;}".
	 *
	 * @param string $string CSS content.
	 *
	 * @return string
	 */
	private static function new_lines( string $string ): string {

		$string = preg_replace( '/\t+(?=})/', '', $string ); // remove all tabs before every "}".
		$string = preg_replace( '/[{;}]/', '$0NEW_LINE', $string ); // put new line after each ";".
		$string = preg_replace( '/^\t+/m', '', $string ); // remove all tabs if new line starts with it.
		return $string;
	}

	/**
	 * Check the ';' in the end of a line and will add one if needed.
	 * Wrap url option contents in double quotes.
	 *
	 * @param string $string CSS content.
	 *
	 * @return string
	 */
	private static function check_healthy_attribute( string $string ): string {
		// Add semicolon at the end of every option.
		if ( false === preg_match( '/[{;}]/', $string ) && true === preg_match( '/:/', $string ) ) {
			$string .= ';';
		}

		// Wrap url contents in double quotes.
		$string = preg_replace( '/(?:url\()((?!\"|\').+(?<!\"|\'))(?:\))/mi', 'url("$1")', $string );

		return $string;
	}

	/**
	 * Check the line for a healthy structure.
	 *
	 * @param string $string              CSS rule.
	 * @param int    $check_double_points Sequence of ".".
	 *
	 * @return string
	 */
	private static function check_healthy_white_spaces( string $string, int $check_double_points = 0 ): string {
		if ( preg_match( '/:/', $string ) && ! preg_match( '/: /', $string ) && $check_double_points ) {
			$string = preg_replace( '/:/', ': ', $string, 1 );
			if ( preg_match( '/(url\()/', $string ) ) {
				preg_match( '~(url\()(.*?)\)~', $string, $result );
				if ( isset( $result[0] ) ) {
					$string = str_replace( $result[0], preg_replace( '/ /', '', $result[0] ), $string );
				}
			}
		}
		if ( ! preg_match( '/ {/', $string ) ) {
			$string = preg_replace( '/{/', ' {', $string );
		}
		return $string;
	}

	/**
	 * Create the needed taps.
	 *
	 * @param string $string CSS rule.
	 * @param int    $taps   Number of taps to insert.
	 *
	 * @return string
	 */
	private static function create_taps( string $string, int $taps ): string {
		if ( ! preg_match( '/, /', $string ) ) {
			$string = str_replace( ',', ', ', $string );
		}
		for ( $i = 0; $i < $taps; $i++ ) {
			$string = self::TAB . $string;
		}
		return $string;
	}
}
