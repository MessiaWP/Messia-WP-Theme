<?php
/**
 * Messia_Home
 *
 * @package Messia\Modules\Home
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Modules\Home;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Smartbits\Messia\Includes\Modules\Home\Skins\Messia_Home_Tmpl_Base;

/**
 * Class dispatcher that select current template class.
 *
 * @package Messia\Modules\Home
 */
final class Messia_Home {

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Home_Tmpl_Base
	 */
	private static ?Messia_Home_Tmpl_Base $template = null; // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

	/**
	 * Get current user selected template for content render.
	 *
	 * @return Messia_Home_Tmpl_Base
	 * @throws Exception On fail to load template or fallback to default one.
	 */
	private static function get_template(): Messia_Home_Tmpl_Base {

		$blog_settings   = MIA()->get_module_settings()->get_blog_setting( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME );
		$template_loader = MIA()->get_module_template_loader();
		$tmpl_class      = $blog_settings['homepage_template_file'];

		return $template_loader::load_messia_themplate( $tmpl_class, 'home' );
	}

	/**
	 * Messia_Home Instance.
	 * Ensures only one instance of Messia_Home is loaded or can be loaded.
	 *
	 * @return Messia_Home Instance.
	 */
	public static function instance(): Messia_Home_Tmpl_Base {

		if ( is_null( self::$template ) ) {
			self::$template = self::get_template();
		}
		return self::$template;
	}
}
