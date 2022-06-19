<?php
/**
 * The template for displaying permalinks error page.
 *
 * @package Messia\Templates\Theme
 */

$url = get_site_url();
get_header();
?>
<div class="container warn">
	<div class="entry-content" id="entry-content-anchor">
		<div class="error-page pb-3 text-center">
			<h2 class="error-title"><?php esc_html_e( '404', 'messia' ); ?></h2>
			<h4 class="error-sub-title"><?php esc_html_e( 'Oops! This page is not found.', 'messia' ); ?></h4>
			<?php // translators: %1$s, %2$s - current site url. ?>
			<p><?php echo esc_html( sprintf( __( 'Messia theme does not support a simple permalink system like %1$s/?p=123. Turn on symbolic permalinks, for example, "Post Title" (%2$s/sample-post/) to use the theme.', 'messia' ), $url, $url ) ); ?></p>
		</div>
	</div>
</div>
<?php
get_footer();
