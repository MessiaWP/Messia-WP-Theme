<?php
/**
 * Messia_Single
 *
 * @package Messia\Modules\Single
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Modules\Single;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Smartbits\Messia\Includes\Modules\Single\Skins\Messia_Single_Tmpl_Base;

/**
 * Class dispatcher that select current template class.
 *
 * @package Messia\Modules\Single
 */
final class Messia_Single {

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Single_Tmpl_Base
	 */
	private static ?Messia_Single_Tmpl_Base $template = null; // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

	/**
	 * Get current user selected template for content render.
	 *
	 * @return Messia_Single_Tmpl_Base
	 * @throws Exception On fail to load template or fallback to default one.
	 */
	private static function get_template(): Messia_Single_Tmpl_Base {

		$blog_settings   = MIA()->get_module_settings()->get_blog_setting( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME );
		$template_loader = MIA()->get_module_template_loader();
		$tmpl_class      = $blog_settings['single_template_file'];

		return $template_loader::load_messia_themplate( $tmpl_class, 'single' );
	}

	/**
	 * Messia_Single Instance.
	 * Ensures only one instance of Messia_Single is loaded or can be loaded.
	 *
	 * @return Messia_Single Instance.
	 */
	public static function instance(): Messia_Single_Tmpl_Base {

		if ( is_null( self::$template ) ) {
			self::$template = self::get_template();
		}
		return self::$template;
	}
}
