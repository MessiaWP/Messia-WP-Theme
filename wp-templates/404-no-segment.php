<?php
/**
 * The template for displaying error page.
 *
 * @package Messia\Templates
 */

get_header();
?>
<div class="container warn">
	<div class="entry-content" id="entry-content-anchor">
		<div class="error-page pb-3 text-center">
			<h2 class="error-title"><?php esc_html_e( '404', 'messia' ); ?></h2>
			<h4 class="error-sub-title"><?php esc_html_e( 'Oops! This page is not found.', 'messia' ); ?></h4>
			<p class="error-description"><?php esc_html_e( 'This object does not belongs to any segment and therefore cannot be shown.', 'messia' ); ?></p>
		</div>
	</div>
</div>
<?php
get_footer();
