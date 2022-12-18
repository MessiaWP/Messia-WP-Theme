<?php
/**
 * The template for displaying single post.
 *
 * @package Messia\Templates
 */

use Smartbits\Messia\Includes\Modules\Single\Messia_Single;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$single = Messia_Single::instance();

MIA()->set_module( 'page', $single );

get_header();
$single->generate_page();
get_footer();
