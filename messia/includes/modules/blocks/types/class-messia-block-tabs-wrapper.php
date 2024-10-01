<?php
/**
 * Block Types Editor
 *
 * @package Messia\Modules\Gutenberg\Blocks
 */

declare( strict_types=1 );

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
namespace Smartbits\Messia\Includes\Modules\Blocks\Types;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Smartbits\Messia\Includes\Modules\Blocks\Messia_Block_Abstract_Dynamic;
use ReflectionClass;
use Exception;

/**
 * Messia_Block_Search_Snippet class.
 *
 * @package Messia\Modules\Gutenberg\Blocks
 */
class Messia_Block_Tabs_Wrapper extends Messia_Block_Abstract_Dynamic {

	/**
	 * Messia_Block_Search_Snippet Constructor
	 *
	 * @return void
	 */
	public function __construct() {

		$this->scope        = [ 'page' ];
		$this->refer_widget = false;
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
				'attributes' => [
					'content' => [
						'type'     => 'string',
						'source'   => 'html',
						'selector' => 'div',
					],
					'tabs'    => [
						'type'     => 'array',
						'selector' => 'div',
					],
					'style'   => [
						'type'    => 'string',
						'default' => 'none',
					],
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
			case false === $this->refer_widget:
				$this->register_block_frontend_assets();
				$render = $this->render_block( $attributes );
				return $this->output( $attributes, $render, $this->refer_widget );

			default:
				$rf = wp_json_encode( $this->refer_widget );
				throw new Exception( "Undefined logic for '{$rf}' value in " . __CLASS__ );
		}
	}

	/**
	 * Render the Search Snippet block inner content.
	 *
	 * @param array $attributes Current attributes.
	 *
	 * @return string
	 */
	public function render_block( array $attributes ): ?string {
		return 'render';
	}
}
