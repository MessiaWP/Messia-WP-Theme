<?php
/**
 * Custom styles config
 *
 * @package Messia\Config
 */

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Config;

use Smartbits\Messia\Includes\Helpers\Messia_Css_Beautifier;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Class setting up theme config.
 *
 * @package wpAdminMenuPage
 */
final class Messia_Config_Styles {

	/**
	 * Custom user's styles.
	 *
	 * @var object
	 */
	private static object $styles;

	/**
	 * Generates CSS rules from user settings save to file.
	 *
	 * @param array $settings Current user settings for current blog.
	 *
	 * @return void
	 */
	public static function save_styles( array $settings ): void {

		$path_to_styles  = MESSIA_CORE_ABSPATH . '/assets/css';
		$styles          = self::get_styles( $settings );
		$current_blog_id = get_current_blog_id();

		if ( strpos( $styles, '{' ) ) {
			$domain = wp_parse_url( get_home_url(), PHP_URL_HOST );

			$styles =
				"/**\n" .
				" * This file is generated automatically,\n" .
				" * it makes no sense to edit it.\n" .
				" *\n" .
				" * Style domain: {$domain}\n" .
				" */\n\n" . $styles;
			file_put_contents( "{$path_to_styles}/_custom_blog_id_{$current_blog_id}.css", $styles ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_read_file_put_contents
		} else {
			@unlink( "{$path_to_styles}/_custom_blog_id_{$current_blog_id}.css" ); // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged
		}
	}

	/**
	 * Clean up CSS custom styles files, and generate
	 * custom styles for current blog if needed.
	 *
	 * @param array $settings Current user settings for current blog.
	 *
	 * @return void
	 */
	public static function update_styles( array $settings ): void {

		global $wpdb;

		$this_blog_id   = get_current_blog_id();
		$path_to_styles = MESSIA_CORE_ABSPATH . '/assets/css';

		// Build blogs.
		if ( is_multisite() ) {
			$blogs = $wpdb->get_results( "SELECT blog_id, domain, path, TRIM(TRAILING '/' FROM CONCAT(domain, path)) as full_path FROM $wpdb->blogs ORDER BY blog_id", ARRAY_A );
		} else {
			$blogs = [
				[
					'blog_id'   => $this_blog_id,
					'domain'    => get_home_url(),
					'path'      => '/',
					'full_path' => get_home_url() . '/',
				],
			];
		}

		$blog_ids     = array_map( 'intval', array_column( $blogs, 'blog_id' ) );
		$blog_domains = array_column( $blogs, 'full_path' );

		// Find all custom css files.
		$style_files = glob( "{$path_to_styles}/_custom_blog_id_*.css" );

		/**
		 * Loop each file and if it is reffer
		 * to unexisting blog id, or unexisting style domain - delete it.
		 */
		foreach ( $style_files as $style_file ) {
			$file_name = pathinfo( $style_file, PATHINFO_FILENAME );
			preg_match( '/(?<=^_custom_blog_id_)\d+(?=\.min$|$){1}/', $file_name, $matches ); // get number from _custom_blog_id_1 or _custom_blog_id_1.min.

			if ( ! isset( $matches[0] ) ) {
				continue;
			}

			if ( in_array( (int) $matches[0], $blog_ids, true ) ) {
				$headers = get_file_data( $style_file, [ 'StyleDomain' => 'Style domain' ] );

				if ( in_array( $headers['StyleDomain'], $blog_domains, true ) ) {
					continue;
				}
			}

			@unlink( $style_file ); // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged
		}

		if ( ! file_exists( "{$path_to_styles}/_custom_blog_id_{$this_blog_id}.css" ) ) {
			self::save_styles( $settings );
		}
	}

	/**
	 * Generates CSS rules from user settings and return it.
	 *
	 * @param array $settings Current user settings.
	 *
	 * @return string
	 */
	public static function get_styles( array $settings ): string {

		$styles = self::compile_rules( $settings );
		$styles = preg_replace( '/(?<={|;|})\s+/mi', (string) null, $styles );
		$styles = self::remove_empty_css_rules( $styles );
		$styles = Messia_Css_Beautifier::run( $styles );
		$styles = trim( $styles );

		return $styles;
	}

	/**
	 * Removes CSS selectors that has no any rules.
	 *
	 * @param array $settings Current user settings.
	 *
	 * @return string
	 */
	private static function compile_rules( array $settings ): string {

		$ns = MESSIA_NAMESPACE_FRONT;
		self::init_rules( $settings );

		// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
		ob_start();

		// RULES.
		?>
		/* FONTS */
		<?php echo ".{$ns}"; ?>{
		<?php
		echo self::$styles->fonts->body['font-family'];
		echo self::$styles->fonts->body['font-weight'];
		echo self::$styles->fonts->body['font-style'];
		echo self::$styles->fonts->body['font-size'];
		echo self::$styles->fonts->body['line-height'];
		echo self::$styles->fonts->body['color'];
		?>
		}

		<?php echo ".{$ns} "; ?>h1{
		<?php
		echo self::$styles->fonts->h1['font-family'];
		echo self::$styles->fonts->h1['font-weight'];
		echo self::$styles->fonts->h1['font-style'];
		echo self::$styles->fonts->h1['font-size'];
		echo self::$styles->fonts->h1['line-height'];
		echo self::$styles->fonts->h1['color'];
		?>
		}

		<?php echo ".{$ns} "; ?>h2{
		<?php
		echo self::$styles->fonts->h2['font-family'];
		echo self::$styles->fonts->h2['font-weight'];
		echo self::$styles->fonts->h2['font-style'];
		echo self::$styles->fonts->h2['font-size'];
		echo self::$styles->fonts->h2['line-height'];
		echo self::$styles->fonts->h2['color'];
		?>
		}

		<?php echo ".{$ns} "; ?>h3{
		<?php
		echo self::$styles->fonts->h3['font-family'];
		echo self::$styles->fonts->h3['font-weight'];
		echo self::$styles->fonts->h3['font-style'];
		echo self::$styles->fonts->h3['font-size'];
		echo self::$styles->fonts->h3['line-height'];
		echo self::$styles->fonts->h3['color'];
		?>
		}

		<?php echo ".{$ns} "; ?>h4{
		<?php
		echo self::$styles->fonts->h4['font-family'];
		echo self::$styles->fonts->h4['font-weight'];
		echo self::$styles->fonts->h4['font-style'];
		echo self::$styles->fonts->h4['font-size'];
		echo self::$styles->fonts->h4['line-height'];
		echo self::$styles->fonts->h4['color'];
		?>
		}

		<?php echo ".{$ns} "; ?>h5{
		<?php
		echo self::$styles->fonts->h5['font-family'];
		echo self::$styles->fonts->h5['font-weight'];
		echo self::$styles->fonts->h5['font-style'];
		echo self::$styles->fonts->h5['font-size'];
		echo self::$styles->fonts->h5['line-height'];
		echo self::$styles->fonts->h5['color'];
		?>
		}

		<?php echo ".{$ns} "; ?>h6{
		<?php
		echo self::$styles->fonts->h6['font-family'];
		echo self::$styles->fonts->h6['font-weight'];
		echo self::$styles->fonts->h6['font-style'];
		echo self::$styles->fonts->h6['font-size'];
		echo self::$styles->fonts->h6['line-height'];
		echo self::$styles->fonts->h6['color'];
		?>
		}

		<?php echo ".{$ns} "; ?>.header-bottom .header-menu{
		<?php
		echo self::$styles->fonts->nav_menu_main['font-family'];
		echo self::$styles->fonts->nav_menu_main['font-weight'];
		echo self::$styles->fonts->nav_menu_main['font-style'];
		echo self::$styles->fonts->nav_menu_main['font-size'];
		echo self::$styles->fonts->nav_menu_main['line-height'];
		echo self::$styles->fonts->nav_menu_main['color'];
		?>
		}

		/* HEADER */
		<?php echo ".{$ns} "; ?>.header-top{
		<?php
		// Header top (background color, color).
		echo "color: {$settings['header_top_text_color']};";
		echo "background-color: {$settings['header_top_background_color']};";
		?>
		}

		<?php echo ".{$ns} "; ?>.header-title{
		<?php
		// Title (background picture\color, inherited color).
		echo "color: {$settings['page_title_subtitle_color']};";
		echo "background-color: {$settings['page_title_background_color']};";
		echo self::$styles->header->page_title_background_image;
		echo self::$styles->header->page_title_background_image_size;
		?>
		}

		<?php echo ".{$ns} "; ?>.header-title h1{
		<?php
		// Heading h1, in header-title.
		echo "color: {$settings['page_title_title_color']};";
		?>
		}

		<?php echo ".{$ns} "; ?>.breadcrumb{
		<?php
		// Breadcrumbs background.
		echo "background-color: {$settings['page_title_breadcrumbs_background_color']};";
		?>
		}

		/* FOOTER */
		<?php echo ".{$ns} "; ?>.footer-top{
		<?php
		// Background footer top + inherited text color.
		echo "color: {$settings['footer_top_text_color']};";
		echo "background-color: {$settings['footer_top_background_color']};";
		?>
		}

		<?php echo ".{$ns} "; ?>.footer-bottom{
		<?php
		// Background footer bottom + inherited text color.
		echo "color: {$settings['footer_bottom_text_color']};";
		echo "background-color: {$settings['footer_bottom_background_color']};"
		?>
		}

		/* CONTENT */
		<?php echo ".{$ns} "; ?>.object-card{
		<?php
		// Card background.
		echo "background-color: {$settings['object_card_background_color']};";
		?>
		}

		<?php echo ".{$ns} "; ?>.object-card .ripple-effect-hover-out,
		<?php echo ".{$ns} "; ?>.object-card .ripple-effect-hover-in{
		<?php
		// Card bubble hover background.
		echo "background-color: {$settings['object_card_bubble_hover_color']};";
		?>
		}

		<?php echo ".{$ns} "; ?>.header-menu a[href]:hover,
		<?php echo ".{$ns} "; ?>.header-menu .current-menu-item > a,
		<?php echo ".{$ns} "; ?>.header-menu .current_page_item > a{
		<?php
		echo "color: {$settings['nav_items_color']};";
		?>
		}

		<?php echo ".{$ns} "; ?>a[href],
		<?php echo ".{$ns} "; ?>main .nav a.nav-link{
		<?php
		echo "color: {$settings['nav_items_color']};";
		?>
		}

		<?php echo ".{$ns} "; ?>a:not(.messia-btn):hover,
		<?php echo ".{$ns} "; ?>.footer-top a:hover{
		<?php
		echo "color: {$settings['nav_items_color_interaction']};";
		?>
		}

		<?php echo ".{$ns} "; ?>.irs--round .irs-handle,
		<?php echo ".{$ns} "; ?>.irs--round .irs-handle.state_hover,
		<?php echo ".{$ns} "; ?>.irs--round .irs-handle:hover,
		<?php echo ".{$ns} "; ?>.irs--round .irs-bar,
		<?php echo ".{$ns} "; ?>.irs--round .irs-from,
		<?php echo ".{$ns} "; ?>.irs--round .irs-to,
		<?php echo ".{$ns} "; ?>.irs--round .irs-single,
		<?php echo ".{$ns} "; ?>.irs--round .irs-line,
		<?php echo ".{$ns} "; ?>.messia-btn,
		<?php echo ".{$ns} "; ?>button:not([class]),
		<?php echo ".{$ns} "; ?>input[type=submit],
		<?php echo ".{$ns} "; ?>.item-card .item-featured,
		<?php echo ".{$ns} "; ?>.nav-pills .nav-link.active,
		<?php echo ".{$ns} "; ?>.nav-pills .show > .nav-link{
			<?php echo "background: {$settings['controls_color_initial']};"; ?>
		}

		<?php echo ".{$ns} "; ?>.irs--round .irs-handle{
			<?php echo "border-color: {$settings['controls_color_initial']};"; ?>
		}

		<?php echo ".{$ns} "; ?>.checkbox-select2.checked,
		<?php echo ".{$ns} "; ?>.checkbox-select2.checked-semi,
		<?php echo ".{$ns} "; ?>.messia-checkbox .messia-checkbox-svg:after,
		<?php echo ".{$ns} "; ?>.messia-checkbox .messia-checkbox-label-container .hover:after,
		<?php echo ".{$ns} "; ?>.messia-checkbox .messia-checkbox-label-container .hover:before,
		<?php echo ".{$ns} "; ?>.messia-radio .messia-radio-icon:after,
		<?php echo ".{$ns} "; ?>.messia-radio .messia-radio-icon span.hover:after,
		<?php echo ".{$ns} "; ?>.messia-radio .messia-radio-icon span.hover:before,
		<?php echo ".{$ns} "; ?>.irs--round .irs-handle:before,
		<?php echo ".{$ns} "; ?>.irs--round .irs-handle:after,
		<?php echo ".{$ns} "; ?>.messia-checkbox input:checked + .messia-checkbox-label-container .messia-checkbox-svg:before{
		<?php
		echo "background: {$settings['controls_color_interaction']};";
		?>
		}

		<?php echo ".{$ns} "; ?>.messia-checkbox input:checked + .messia-checkbox-label-container .messia-checkbox-svg:before,
		<?php echo ".{$ns} "; ?>.messia-radio .messia-radio-icon .messia-radio-icon-checked,
		<?php echo ".{$ns} "; ?>.messia-checkbox .messia-checkbox-label-container .hover:after,
		<?php echo ".{$ns} "; ?>.messia-checkbox .messia-checkbox-label-container .hover:before{
		<?php
		echo "background: {$settings['controls_color_initial']};";
		?>
		}

		<?php echo ".{$ns} "; ?>.messia-checkbox:hover .messia-checkbox-label-container .hover:after,
		<?php echo ".{$ns} "; ?>.messia-checkbox:hover .messia-checkbox-label-container .hover:before{
		<?php
		echo "background: {$settings['controls_color_interaction']};";
		?>
		}

		<?php echo ".{$ns} "; ?>.messia-checkbox input:checked + .messia-checkbox-label-container .messia-checkbox-svg svg{
		<?php
		echo "fill: {$settings['controls_color_interaction']};";
		?>
		}

		<?php echo ".{$ns} "; ?>.messia-btn[href],
		<?php echo ".{$ns} "; ?>.messia-btn,
		<?php echo ".{$ns} "; ?>button:not([class]),
		<?php echo ".{$ns} "; ?>input[type=submit],
		<?php echo ".{$ns} "; ?>.item-card .item-featured{
		<?php
		echo "color: {$settings['controls_color_initial_inner']};";
		?>
		}

		<?php echo ".{$ns} "; ?>.messia-btn[href] svg,
		<?php echo ".{$ns} "; ?>.messia-btn svg,
		<?php echo ".{$ns} "; ?>button:not([class]) svg,
		<?php echo ".{$ns} "; ?>.messia-btn[href] path,
		<?php echo ".{$ns} "; ?>.messia-btn path,
		<?php echo ".{$ns} "; ?>button:not([class]) path{
		<?php
		echo "fill: {$settings['controls_color_initial_inner']};";
		?>
		}

		<?php echo ".{$ns} "; ?>.messia-btn:hover,
		<?php echo ".{$ns} "; ?>button:not([class]):hover,
		<?php echo ".{$ns} "; ?>.header-menu.pills .current-menu-item > a,
		<?php echo ".{$ns} "; ?>.header-menu.pills .current_page_item > a,
		<?php echo ".{$ns} "; ?>.header-menu.pills a:hover,
		<?php echo ".{$ns} "; ?>input[type=submit]:hover,
		<?php echo ".{$ns} "; ?>.nav-links .page-numbers.current{
		<?php
		echo "background: {$settings['controls_color_interaction']};";
		echo "color: {$settings['controls_color_interaction_inner']};";
		?>
		}

		<?php echo ".{$ns} "; ?>.messia-btn:hover svg,
		<?php echo ".{$ns} "; ?>button:not([class]):hover svg,
		<?php echo ".{$ns} "; ?>.messia-btn:hover path,
		<?php echo ".{$ns} "; ?>button:not([class]):hover path{
		<?php
		echo "fill: {$settings['controls_color_interaction_inner']};";
		?>
		}

		<?php echo ".{$ns} "; ?>.messia-checkbox input:checked + .messia-checkbox-label-container .messia-checkbox-svg svg polyline,
		<?php echo ".{$ns} "; ?>.checkbox-select2.checked:after,
		<?php echo ".{$ns} "; ?>.checkbox-select2.checked:before{
		<?php
		echo "color: {$settings['controls_color_initial']};";
		?>
		}

		<?php echo ".{$ns} "; ?>.sidebar .filter-heading .title,
		<?php echo ".{$ns} "; ?>.messia-radio input:checked + .messia-radio-label-container .messia-radio-icon,
		<?php echo ".{$ns} "; ?>.sidebar .property-group-heading .title,
		<?php echo ".{$ns} "; ?>.sidebar .widget-title,
		<?php echo ".{$ns} "; ?>.sidebar .widget .custom-field-title,
		<?php echo ".{$ns} "; ?>.button-arrow.arrow-left:after{
		<?php
		echo "border-color: {$settings['controls_color_initial']};";
		?>
		}

		<?php echo ".{$ns} "; ?>.checkbox-select2.checked, .mccs .checkbox-select2.checked-semi{
		<?php
		echo "border-color: {$settings['controls_color_interaction']};";
		?>
		}

		<?php echo ".{$ns} "; ?>.irs--round .irs-from:before,
		<?php echo ".{$ns} "; ?>.irs--round .irs-to:before,
		<?php echo ".{$ns} "; ?>.irs--round .irs-single:before{
		<?php
		echo "border-top-color: {$settings['controls_color_initial']};";
		?>
		}

		<?php echo ".{$ns} "; ?>.stars svg{
		<?php
		echo "fill: {$settings['controls_color_initial']};";
		echo "stroke: {$settings['controls_color_initial']};";
		?>
		}

		<?php echo ".{$ns} "; ?>.not-rated .text{
		<?php
		echo "background: {$settings['controls_color_initial']};";
		?>
		}
		<?php
		$styles = ob_get_clean();

		return $styles;
	}

	/**
	 * Removes CSS selectors that has no any rules.
	 *
	 * @param array $settings Current user settings.
	 *
	 * @return void
	 */
	private static function init_rules( array $settings ): void {

		self::$styles = (object) [
			'fonts'  => (object) [
				'body'          => [],
				'h1'            => [],
				'h2'            => [],
				'h3'            => [],
				'h4'            => [],
				'h5'            => [],
				'h6'            => [],
				'nav_menu_main' => [],
			],
			'header' => (object) [
				'page_title_background_image'      => false,
				'page_title_background_image_size' => false,
			],
		];

		$font_body           = json_decode( $settings['font_body'] );
		$font_h1             = json_decode( $settings['font_h1'] );
		$font_h2             = json_decode( $settings['font_h2'] );
		$font_h3             = json_decode( $settings['font_h3'] );
		$font_h4             = json_decode( $settings['font_h4'] );
		$font_h5             = json_decode( $settings['font_h5'] );
		$font_h6             = json_decode( $settings['font_h6'] );
		$font_nav_menu_main  = json_decode( $settings['font_nav_menu_main'] );
		$header_title_images = json_decode( $settings['page_title_background_image'] );

		// FONTS.
		if ( isset( $font_body->family ) ) {

			$font_variant = preg_split( '/(?<=\d)(?=[a-z])/i', $font_body->variant );

			$weight = ( isset( $font_variant[0] ) ) ? $font_variant[0] : false;
			$style  = ( isset( $font_variant[1] ) ) ? $font_variant[1] : 'normal';

			self::$styles->fonts->body['font-family'] = self::generate_style_rule( 'font-family', "'{$font_body->family}', {$font_body->category}" );
			self::$styles->fonts->body['font-weight'] = self::generate_style_rule( 'font-weight', $weight );
			self::$styles->fonts->body['font-style']  = self::generate_style_rule( 'font-style', $style );
			self::$styles->fonts->body['font-size']   = self::generate_style_rule( 'font-size', (string) $font_body->size, 'px' );
			self::$styles->fonts->body['line-height'] = self::generate_style_rule( 'line-height', (string) $font_body->line_height );
			self::$styles->fonts->body['color']       = self::generate_style_rule( 'color', $font_body->color );
		}

		if ( isset( $font_h1->family ) ) {

			$font_variant = preg_split( '/(?<=\d)(?=[a-z])/i', $font_h1->variant );

			$weight = ( isset( $font_variant[0] ) ) ? $font_variant[0] : false;
			$style  = ( isset( $font_variant[1] ) ) ? $font_variant[1] : 'normal';

			self::$styles->fonts->h1['font-family'] = self::generate_style_rule( 'font-family', "'{$font_h1->family}', {$font_h1->category}" );
			self::$styles->fonts->h1['font-weight'] = self::generate_style_rule( 'font-weight', $weight );
			self::$styles->fonts->h1['font-style']  = self::generate_style_rule( 'font-style', $style );
			self::$styles->fonts->h1['font-size']   = self::generate_style_rule( 'font-size', (string) $font_h1->size, 'px' );
			self::$styles->fonts->h1['line-height'] = self::generate_style_rule( 'line-height', (string) $font_h1->line_height );
			self::$styles->fonts->h1['color']       = self::generate_style_rule( 'color', $font_h1->color );
		}

		if ( isset( $font_h2->family ) ) {

			$font_variant = preg_split( '/(?<=\d)(?=[a-z])/i', $font_h2->variant );

			$weight = ( isset( $font_variant[0] ) ) ? $font_variant[0] : false;
			$style  = ( isset( $font_variant[1] ) ) ? $font_variant[1] : 'normal';

			self::$styles->fonts->h2['font-family'] = self::generate_style_rule( 'font-family', "'{$font_h2->family}', {$font_h2->category}" );
			self::$styles->fonts->h2['font-weight'] = self::generate_style_rule( 'font-weight', $weight );
			self::$styles->fonts->h2['font-style']  = self::generate_style_rule( 'font-style', $style );
			self::$styles->fonts->h2['font-size']   = self::generate_style_rule( 'font-size', (string) $font_h2->size, 'px' );
			self::$styles->fonts->h2['line-height'] = self::generate_style_rule( 'line-height', (string) $font_h2->line_height );
			self::$styles->fonts->h2['color']       = self::generate_style_rule( 'color', $font_h2->color );
		}

		if ( isset( $font_h3->family ) ) {

			$font_variant = preg_split( '/(?<=\d)(?=[a-z])/i', $font_h3->variant );

			$weight = ( isset( $font_variant[0] ) ) ? $font_variant[0] : false;
			$style  = ( isset( $font_variant[1] ) ) ? $font_variant[1] : 'normal';

			self::$styles->fonts->h3['font-family'] = self::generate_style_rule( 'font-family', "'{$font_h3->family}', {$font_h3->category}" );
			self::$styles->fonts->h3['font-weight'] = self::generate_style_rule( 'font-weight', $weight );
			self::$styles->fonts->h3['font-style']  = self::generate_style_rule( 'font-style', $style );
			self::$styles->fonts->h3['font-size']   = self::generate_style_rule( 'font-size', (string) $font_h3->size, 'px' );
			self::$styles->fonts->h3['line-height'] = self::generate_style_rule( 'line-height', (string) $font_h3->line_height );
			self::$styles->fonts->h3['color']       = self::generate_style_rule( 'color', $font_h3->color );
		}

		if ( isset( $font_h4->family ) ) {

			$font_variant = preg_split( '/(?<=\d)(?=[a-z])/i', $font_h4->variant );

			$weight = ( isset( $font_variant[0] ) ) ? $font_variant[0] : false;
			$style  = ( isset( $font_variant[1] ) ) ? $font_variant[1] : 'normal';

			self::$styles->fonts->h4['font-family'] = self::generate_style_rule( 'font-family', "'{$font_h4->family}', {$font_h4->category}" );
			self::$styles->fonts->h4['font-weight'] = self::generate_style_rule( 'font-weight', $weight );
			self::$styles->fonts->h4['font-style']  = self::generate_style_rule( 'font-style', $style );
			self::$styles->fonts->h4['font-size']   = self::generate_style_rule( 'font-size', (string) $font_h4->size, 'px' );
			self::$styles->fonts->h4['line-height'] = self::generate_style_rule( 'line-height', (string) $font_h4->line_height );
			self::$styles->fonts->h4['color']       = self::generate_style_rule( 'color', $font_h4->color );
		}

		if ( isset( $font_h5->family ) ) {

			$font_variant = preg_split( '/(?<=\d)(?=[a-z])/i', $font_h5->variant );

			$weight = ( isset( $font_variant[0] ) ) ? $font_variant[0] : false;
			$style  = ( isset( $font_variant[1] ) ) ? $font_variant[1] : 'normal';

			self::$styles->fonts->h5['font-family'] = self::generate_style_rule( 'font-family', "'{$font_h5->family}', {$font_h5->category}" );
			self::$styles->fonts->h5['font-weight'] = self::generate_style_rule( 'font-weight', $weight );
			self::$styles->fonts->h5['font-style']  = self::generate_style_rule( 'font-style', $style );
			self::$styles->fonts->h5['font-size']   = self::generate_style_rule( 'font-size', (string) $font_h5->size, 'px' );
			self::$styles->fonts->h5['line-height'] = self::generate_style_rule( 'line-height', (string) $font_h5->line_height );
			self::$styles->fonts->h5['color']       = self::generate_style_rule( 'color', $font_h5->color );
		}

		if ( isset( $font_h6->family ) ) {

			$font_variant = preg_split( '/(?<=\d)(?=[a-z])/i', $font_h6->variant );

			$weight = ( isset( $font_variant[0] ) ) ? $font_variant[0] : false;
			$style  = ( isset( $font_variant[1] ) ) ? $font_variant[1] : 'normal';

			self::$styles->fonts->h6['font-family'] = self::generate_style_rule( 'font-family', "'{$font_h6->family}', {$font_h6->category}" );
			self::$styles->fonts->h6['font-weight'] = self::generate_style_rule( 'font-weight', $weight );
			self::$styles->fonts->h6['font-style']  = self::generate_style_rule( 'font-style', $style );
			self::$styles->fonts->h6['font-size']   = self::generate_style_rule( 'font-size', (string) $font_h6->size, 'px' );
			self::$styles->fonts->h6['line-height'] = self::generate_style_rule( 'line-height', (string) $font_h6->line_height );
			self::$styles->fonts->h6['color']       = self::generate_style_rule( 'color', $font_h6->color );
		}

		if ( isset( $font_nav_menu_main->family ) ) {

			$font_variant = preg_split( '/(?<=\d)(?=[a-z])/i', $font_nav_menu_main->variant );

			$weight = ( isset( $font_variant[0] ) ) ? $font_variant[0] : false;
			$style  = ( isset( $font_variant[1] ) ) ? $font_variant[1] : 'normal';

			self::$styles->fonts->nav_menu_main['font-family'] = self::generate_style_rule( 'font-family', "'{$font_nav_menu_main->family}', {$font_nav_menu_main->category}" );
			self::$styles->fonts->nav_menu_main['font-weight'] = self::generate_style_rule( 'font-weight', $weight );
			self::$styles->fonts->nav_menu_main['font-style']  = self::generate_style_rule( 'font-style', $style );
			self::$styles->fonts->nav_menu_main['font-size']   = self::generate_style_rule( 'font-size', (string) $font_nav_menu_main->size, 'px' );
			self::$styles->fonts->nav_menu_main['line-height'] = self::generate_style_rule( 'line-height', (string) $font_nav_menu_main->line_height );
			self::$styles->fonts->nav_menu_main['color']       = self::generate_style_rule( 'color', $font_nav_menu_main->color );
		}

		// HEADER.
		if ( ! empty( $header_title_images ) ) {
			$header_title_image = wp_get_attachment_url( $header_title_images[0]->id );

			self::$styles->header->page_title_background_image      = self::generate_style_rule( 'background', "url('{$header_title_image}') no-repeat center" );
			self::$styles->header->page_title_background_image_size = self::generate_style_rule( 'background-size', 'cover' );
		}
	}

	/**
	 * Generates CSS rule.
	 *
	 * @param string      $rule CSS rule name.
	 * @param string      $value CSS rule value.
	 * @param string|null $dim reule value dimention - px, %, em, etc...
	 *
	 * @return string
	 */
	private static function generate_style_rule( string $rule, ?string $value, ?string $dim = null ): ?string {

		if ( false === $value || is_null( $value ) || empty( $value ) ) {
			return null;
		} else {
			if ( 'font-weight' === $rule && 'regular' === $value ) {
				$value = 'normal';
			}
			return wp_strip_all_tags( "{$rule}: {$value}{$dim};" ) . "\n";
		}
	}

	/**
	 * Removes CSS selectors that has no any rules.
	 *
	 * @param string $css Valid CSS rules.
	 *
	 * @return string
	 */
	private static function remove_empty_css_rules( string $css ): string {

		$result = '';
		$css    = preg_split( '/\s*\}(?!})/i', $css );

		foreach ( $css as $item ) {

			if ( '' !== $item && '{' !== substr( $item, -1 ) ) {

				$result .= $item . '}';
			}
		}

		return $result;
	}
}
