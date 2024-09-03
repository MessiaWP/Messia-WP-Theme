<?php
/**
 * Block Types Widget
 *
 * @package Messia\Modules\Gutenberg\Blocks
 */

declare(strict_types = 1);

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
namespace Smartbits\Messia\Includes\Modules\Blocks\Types;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Smartbits\Messia\Includes\Modules\Blocks\Messia_Block_Abstract_Dynamic;
use ReflectionClass;
use Exception;

/**
 * Messia_Block_Object_Properties class.
 *
 * @package Messia\Modules\Gutenberg\Blocks
 */
class Messia_Block_Object_Properties extends Messia_Block_Abstract_Dynamic {

	/**
	 * Messia_Block_Object_Properties Constructor
	 *
	 * @return void
	 */
	public function __construct() {

		$this->scope        = [ 'widgets' ];
		$this->refer_widget = 'messia_widget_object_properties';
		$this->block_assets = [
			'editor_script' => [
				'enqueue' => true,
				'deps'    => [],
			],
			'editor_style'  => [
				'enqueue' => true,
				'deps'    => [],
			],
			'style'         => [
				'enqueue' => true,
				'deps'    => [ 'messia-frontend' ],
			],
			'script'        => [
				'enqueue' => false,
				'deps'    => [],
			],
		];

		$class_shortname  = ( new ReflectionClass( $this ) )->getShortName();
		$this->block_name = strtolower( str_replace( [ 'Messia_', '_' ], [ '', '-' ], $class_shortname ) );

		$this->register_block_type();
	}

	/**
	 * Get block attributes.
	 *
	 * @return array
	 */
	protected function get_attributes(): array {
		return $this->join_shared_attributes(
			[
				'isExample' => [
					'type'    => 'boolean',
					'default' => false,
				],
				'title'     => [
					'type'    => 'string',
					'default' => null,
				],
			]
		);
	}

	/**
	 * Render the Categories links block.
	 * It is top level category term and their direct children.
	 *
	 * @param array  $attributes Current attributes.
	 * @param string $content    Block content (always null due to block is dynamic).
	 *
	 * @throws Exception On unexpected $this->refer_widget value.
	 *
	 * @return string
	 */
	public function render( array $attributes, string $content = null ): string {

		switch ( true ) {
			case false !== $this->refer_widget:
				$this->register_block_frontend_assets();
				$render = $this->render_widget( $this->refer_widget, $attributes );
				return $this->output( $attributes, $render, $this->refer_widget );

			default:
				$rf = wp_json_encode( $this->refer_widget );
				throw new Exception( "Undefined logic for '{$rf}' value in " . __CLASS__ );
		}
	}
}
