<?php // phpcs:ignore WordPress.Files.FileName.NotHyphenatedLowercase
/**
 * Description: the template for displaying messia object pages.
 *
 * @package Messia\Templates
 */

use Smartbits\Messia\Includes\Modules\Objects\Messia_Object;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

the_post();

$object = Messia_Object::instance();

MIA()->set_module( 'object', $object );

get_header();
$object->generate_page();
get_footer();
