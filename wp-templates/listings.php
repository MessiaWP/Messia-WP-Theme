<?php
/**
 * The template for displaying messia listing page.
 *
 * @package Messia\Templates\Theme
 */

/**
 * Listing page search query entry point
 * Request logic - all the required data is transmitted via a URL and expected in the following format:
 * - domain / segment / category-1 /.../ category-n /? property-1 & ... & property-n & list = X, sort = Y, search = Z
 * where category is the slug of the taxonomy term Categories, Property is the slug of the taxonomy term Properties,
 * X - integer, Y - 'rating' or 'price' or 'abc', Z - string
 */

use Smartbits\Messia\Includes\Modules\Listing\Messia_Listing;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

the_post();

$listing = Messia_Listing::instance();

MIA()->set_module( 'listing', $listing );

get_header();
$listing->generate_page();
get_footer();
