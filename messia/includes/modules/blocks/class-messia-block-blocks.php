<?php
/**
 * Messia_Block_Blocks
 *
 * @package Messia\Modules\Gutenberg
 */

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Modules\Blocks;

use Exception;
use WP_Block_Type_Registry;
use ReflectionClass;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Entry point for all messia blocks.
 *
 * @package Messia\Modules\Gutenberg
 */
class Messia_Block_Blocks {

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Block_Blocks
	 */
	private static ?Messia_Block_Blocks $instance = null; // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

	/**
	 * Full class name.
	 *
	 * @var Messia_Help
	 */
	private string $helpers;

	/**
	 * Registered blocks.
	 *
	 * @var array
	 */
	private array $registry = [];

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected string $block_name;

	/**
	 * Messia_Block_Blocks Constructor.
	 *
	 * @return void
	 */
	private function __construct() {

		$this->helpers = MIA()->get_module( 'help' );

		$class_shortname  = ( new ReflectionClass( $this ) )->getShortName();
		$this->block_name = strtolower( str_replace( [ 'Messia_', '_' ], [ '', '-' ], $class_shortname ) );

		add_action( 'init', [ $this, 'register_blocks' ] );
		add_action( 'block_categories_all', [ $this, 'register_blocks_category' ], 10, 2 );
		add_filter( 'allowed_block_types_all', [ $this, 'filter_blocks' ], 10, 2 );
	}

	/**
	 * Messia_Block_Blocks Instance.
	 * Ensures only one instance of Messia_Block_Blocks is loaded or can be loaded.
	 *
	 * @return Messia_Block_Blocks Instance.
	 */
	public static function instance(): Messia_Block_Blocks {

		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Register all messia blocks in WP.
	 *
	 * @throws Exception On unexpected 'i_am' class value.
	 *
	 * @return void
	 */
	public function register_blocks(): void {

		$this->register_base_script();
		$this->register_base_style();

		$blocks = glob( MESSIA_CORE_ABSPATH . '/modules/blocks/types/class-messia-block-*.php' );

		foreach ( $blocks as $block_file ) {

			$src = file_get_contents( $block_file ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
			preg_match( '/^namespace\s+(.+?);$/ms', $src, $namespace );
			preg_match( '/class\s+(\w+)(.*)?\{/', $src, $classname );

			$full_class = $namespace[1] . '\\' . $classname[1];
			$instance   = new $full_class();

			$this->registry[] = $instance;
		}
	}

	/**
	 * Getter for registered blocks.
	 *
	 * @return array
	 */
	public function get_registry(): array {
		return $this->registry;
	}

	/**
	 * Register one base script supported all blocks.
	 *
	 * @return void
	 */
	private function register_base_script(): void {

		$min = '.min';

		if ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) {
			$min = null;
		}

		$script_name_editor = "{$this->block_name}-editor";
		$script_name_front  = $this->block_name;

		wp_register_script(
			"messia-{$script_name_front}",
			MESSIA_THEME_URL . "/includes/assets/js/blocks/{$script_name_front}{$min}.js",
			[],
			MESSIA_THEME_VERSION,
			true
		);

		wp_register_script(
			"messia-{$script_name_editor}",
			MESSIA_THEME_URL . "/includes/assets/js/blocks/{$script_name_editor}{$min}.js",
			[],
			MESSIA_THEME_VERSION,
			true
		);
	}

	/**
	 * Register one base style supported all blocks.
	 *
	 * @return void
	 */
	private function register_base_style(): void {

		$min = '.min';

		if ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) {
			$min = null;
		}

		$style_name_editor = "{$this->block_name}-editor";
		$style_name_front  = $this->block_name;

		wp_register_style(
			"messia-{$style_name_front}",
			MESSIA_THEME_URL . "/includes/assets/css/blocks/{$style_name_front}{$min}.css",
			[],
			MESSIA_THEME_VERSION,
			'all'
		);

		wp_register_style(
			"messia-{$style_name_editor}",
			MESSIA_THEME_URL . "/includes/assets/css/blocks/{$style_name_editor}{$min}.css",
			[],
			MESSIA_THEME_VERSION,
			'all'
		);
	}

	/**
	 * Register messia block category.
	 *
	 * @param array $categories Array of block categories.
	 * @param mixed $context    Post being loaded.
	 *
	 * @return array
	 */
	public function register_blocks_category( array $categories, mixed $context ): array {

		return array_merge(
			[
				[
					'slug'  => 'messia',
					'title' => __( 'Messia', 'messia' ),
				],
			],
			$categories
		);
	}

	/**
	 * Filter blocks to let certain blocks be available at certain pages.
	 *
	 * @param bool|array $allowed_block_types Array of block type slugs.
	 * @param mixed      $context             The post resource data.
	 *
	 * @throws Exception On invalid scope value.
	 *
	 * @return bool|array
	 */
	public function filter_blocks( bool|array $allowed_block_types, mixed $context ): bool|array {

		$screen = get_current_screen();

		if ( ! is_null( $screen ) ) {

			$valid_scope = [
				'widgets',
				'page',
			];

			foreach ( $this->registry as $i => $block_instance ) {

				$block_scope = $block_instance->get_scope();

				if ( count( array_intersect( $block_scope, $valid_scope ) ) !== count( $block_scope ) ) {
					$rf         = implode( "','", $block_scope );
					$class_name = ( new ReflectionClass( $this ) )->getShortName();
					throw new Exception( "Unknown block scope value. Expected any of: [page, widgets] but got '{$rf}' in {$class_name}" );
				}

				if ( in_array( $screen->id, $block_scope, true ) ) {
					continue;
				}

				unregister_block_type( $block_instance->get_full_name() );
				unset( $this->registry[ $i ] );
			}

			switch ( $screen->id ) {
				case 'page':
					$segment_terms = $this->helpers::get_terms_segment();

					if ( array_key_exists( $context->post->post_name, $segment_terms ) ) {
						break;
					}
					unregister_block_type( 'messia/block-listing-data' );

					$classes = array_map( 'get_class', $this->registry );
					$indexes = preg_grep( '/Messia_Block_Listing_Data/', $classes );

					foreach ( $indexes as $i ) {
						unset( $this->registry['widgets'][ $i ] );
					}

					break;
			}
		}

		$allowed_block_types = array_keys( WP_Block_Type_Registry::get_instance()->get_all_registered() );
		return $allowed_block_types;
	}
}
