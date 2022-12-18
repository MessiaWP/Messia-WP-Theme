<?php
/**
 * The template for displaying archive pages.
 *
 * @package Messia\Templates
 */

use Smartbits\Messia\Includes\Modules\Archive\Messia_Archive;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$archive_object = Messia_Archive::instance();

MIA()->set_module( 'page', $archive_object );

get_header();
$archive_object->generate_page();
get_footer();
