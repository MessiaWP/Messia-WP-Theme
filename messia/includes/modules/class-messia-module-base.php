<?php
/**
 * Messia_Module_Base
 *
 * @package Messia\Modules
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Modules;

use Smartbits\Messia\Includes\Helpers\Messia_Help;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use WP_Post;

/**
 * Base class for all modules.
 *
 * @package Messia\Modules
 */
class Messia_Module_Base {

	/**
	 * Full class name
	 *
	 * @var Messia_Help
	 */
	protected string $helpers;

	/**
	 * Module's dependences (JS and CSS).
	 * Expected that path to source files will be
	 * relative to MESSIA_CORE_ABSPATH path.
	 *
	 * @var array
	 */
	protected array $assets = [
		'styles'  => [],
		'scripts' => [],
	];

	/**
	 * Messia_Listing_Tmpl_Base Constructor.
	 */
	protected function __construct() {
		$this->helpers = MIA()->get_module( 'help' );
	}

	/**
	 * Callback for messia_post_title filter.
	 * Modify page title container content taking into account post
	 * publish status.
	 *
	 * @param string  $title Current title.
	 * @param WP_Post $post  Post in progress.
	 *
	 * @return string
	 */
	public function seo_title( string $title, WP_Post $post ): ?string {

		global $post;

		$data      = $this->get_seo_container();
		$seo_title = $data['seo_title'];

		if ( is_null( $seo_title ) ) {
			return $title;
		}

		$title = $seo_title;

		if ( ! empty( $post->post_password ) ) {

			// translators: placeholder is post title.
			$prepend = __( 'Protected: %s', 'messia' );
			$title   = sprintf( $prepend, $title );

		} elseif ( isset( $post->post_status ) && 'private' === $post->post_status ) {

			// translators: placeholder is post title.
			$prepend = __( 'Private: %s', 'messia' );
			$title   = sprintf( $prepend, $title );
		}

		return $title;
	}

	/**
	 * Callback for messia_after_post_title action.
	 * Adds seo content after page title container.
	 *
	 * @return string
	 */
	public function seo_description(): void {

		$data = $this->get_seo_container();
		$desc = $data['seo_description'];

		if ( is_null( $desc ) ) {
			return;
		}

		echo "<p class='seo-description'>{$desc}</p>";
	}

	/**
	 * Help to understand on what type of page user are
	 * and what seo templates to use for it. Parse dynamic data inside it
	 * and return.
	 *
	 * @return array
	 */
	protected function get_seo_container(): array {

		$seo = [
			'title'           => null,
			'description'     => null,
			'seo_title'       => null,
			'seo_description' => null,
		];

		$seo_templates    = MIA()->get_seo_templates();
		$seo_placeholders = MIA()->get_seo_placeholders();

		if ( is_page() || $this->helpers::messia_doing_ajax( 'get_listing' ) ) {

			// Page.
			if ( ! empty( $seo_templates['page_regular']['title'] ) ) {
				$seo['title'] = $this->helpers::parse_seo_template( $seo_placeholders, $seo_templates['page_regular']['title'] );
			}

			if ( ! empty( $seo_templates['page_regular']['description'] ) ) {
				$seo['description'] = $this->helpers::parse_seo_template( $seo_placeholders, $seo_templates['page_regular']['description'] );
			}

			if ( ! empty( $seo_templates['page_regular']['seo_title'] ) ) {
				$seo['seo_title'] = $this->helpers::parse_seo_template( $seo_placeholders, $seo_templates['page_regular']['seo_title'] );
			}

			if ( ! empty( $seo_templates['page_regular']['seo_description'] ) ) {
				$seo['seo_description'] = $this->helpers::parse_seo_template( $seo_placeholders, $seo_templates['page_regular']['seo_description'] );
			}
		} elseif ( is_singular( 'messia_object' ) ) {

			// Object.
			if ( ! empty( $seo_templates['page_object']['title'] ) ) {
				$seo['title'] = $this->helpers::parse_seo_template( $seo_placeholders, $seo_templates['page_object']['title'] );
			}

			if ( ! empty( $seo_templates['page_object']['description'] ) ) {
				$seo['description'] = $this->helpers::parse_seo_template( $seo_placeholders, $seo_templates['page_object']['description'] );
			}

			if ( ! empty( $seo_templates['page_object']['seo_title'] ) ) {
				$seo['seo_title'] = $this->helpers::parse_seo_template( $seo_placeholders, $seo_templates['page_object']['seo_title'] );
			}
		}

		return $seo;
	}

	/**
	 * Getter for module assets.
	 *
	 * @return array
	 */
	public function get_assets(): array {
		return $this->assets;
	}
}
