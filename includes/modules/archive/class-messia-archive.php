<?php
/**
 * Messia_Archive
 *
 * @package Messia\Modules\Archive
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Modules\Archive;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Smartbits\Messia\Includes\Modules\Archive\Skins\Messia_Archive_Tmpl_Base;

/**
 * Class dispatcher that select current template class.
 *
 * @package Messia\Modules\Home
 */
final class Messia_Archive {

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Archive_Tmpl_Base
	 */
	private static ?Messia_Archive_Tmpl_Base $template = null; // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

	/**
	 * Get current user selected template for content render.
	 *
	 * @return Messia_Archive_Tmpl_Base
	 * @throws Exception On fail to load template or fallback to default one.
	 */
	private static function get_template(): Messia_Archive_Tmpl_Base {

		$blog_settings   = MIA()->get_module( 'settings' )->get_blog_setting( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME );
		$template_loader = MIA()->get_module( 'template_loader' );
		$tmpl_class      = $blog_settings['archive_template_file'];

		return $template_loader::load_messia_themplate( $tmpl_class, 'archive' );
	}

	/**
	 * Messia_Archive Instance.
	 * Ensures only one instance of Messia_Archive is loaded or can be loaded.
	 *
	 * @return Messia_Archive Instance.
	 */
	public static function instance(): Messia_Archive_Tmpl_Base {

		if ( is_null( self::$template ) ) {
			self::$template = self::get_template();
		}
		return self::$template;
	}
}
