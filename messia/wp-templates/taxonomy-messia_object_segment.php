<?php // phpcs:ignore WordPress.Files.FileName.NotHyphenatedLowercase
/**
 * The template for displaying archive pages.
 *
 * @package Messia\Templates
 */

$segment_slug  = get_query_var( 'messia_object_segment' );
$redirect_path = ( is_multisite() ) ? trim( get_blog_details()->path, '/' ) : null;
wp_safe_redirect( "/{$redirect_path}/{$segment_slug}/", 301 );
exit;
