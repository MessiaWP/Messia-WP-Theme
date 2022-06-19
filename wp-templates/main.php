<?php
/**
 * The template for displaying regular pages.
 * Template Name: Blog page
 * @package Messia\Templates
 */

use Smartbits\Messia\Includes\Modules\{
	Page\Messia_Page_Tmpl_Default,
	Home\Messia_Home,
};

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

the_post();

if ( is_front_page() ) {

	$page_object = Messia_Home::instance();
	MIA()->set_module( 'page', $page_object );

} else {

	$page_object = Messia_Page_Tmpl_Default::instance();
	MIA()->set_module( 'page', $page_object );

}

get_header();
$page_object->generate_page();
get_footer();
