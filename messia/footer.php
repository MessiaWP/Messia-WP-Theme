<?php
/**
 * The template for the footer section.
 *
 * @package Messia
 */

$settings = MIA()->get_module_settings();

$blog_settings = $settings->get_blog_setting( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME );

$footer_top_col_1_active = is_active_sidebar( 'widget-area-footer-top-col-1' );
$footer_top_col_2_active = is_active_sidebar( 'widget-area-footer-top-col-2' );
$footer_top_col_3_active = is_active_sidebar( 'widget-area-footer-top-col-3' );
$footer_top_col_4_active = is_active_sidebar( 'widget-area-footer-top-col-4' );

$footer_bottom_col_1_active = is_active_sidebar( 'widget-area-footer-bottom-col-1' );
$footer_bottom_col_2_active = is_active_sidebar( 'widget-area-footer-bottom-col-2' );

?>

</main>
<footer>
	<div class="footer-top pt-4 pb-4 mt-4">
		<div class="container">
			<div class="row">
				<?php
				if ( $footer_top_col_1_active ) {
					?>
					<div class="col footer-top-item mb-4">
						<div class="widget-item">
							<?php dynamic_sidebar( 'widget-area-footer-top-col-1' ); ?>
						</div>
					</div>
					<?php
				}
				if ( $footer_top_col_2_active ) {
					?>
					<div class="col footer-top-item mb-4">
						<div class="widget-item">
							<?php dynamic_sidebar( 'widget-area-footer-top-col-2' ); ?>
						</div>
					</div>
					<?php
				}
				if ( $footer_top_col_3_active ) {
					?>
					<div class="col footer-top-item mb-4">
						<div class="widget-item">
							<?php dynamic_sidebar( 'widget-area-footer-top-col-3' ); ?>
						</div>
					</div>
					<?php
				}
				if ( $footer_top_col_4_active ) {
					?>
					<div class="col footer-top-item mb-4">
						<div class="widget-item">
							<?php dynamic_sidebar( 'widget-area-footer-top-col-4' ); ?>
						</div>
					</div>
					<?php
				}
				?>
			</div>
		</div>
	</div>
	<?php
	if ( 0 === $blog_settings['footer_bottom_hide_itself'] ) {
		?>
		<div class="footer-bottom pb-3 pt-3">
			<div class="container">
				<div class="row align-items-center">
					<?php
					if ( $footer_bottom_col_1_active && $footer_bottom_col_2_active ) {
						?>
						<div class="col two-col col-auto"><?php dynamic_sidebar( 'widget-area-footer-bottom-col-1' ); ?></div>
						<div class="col two-col col-auto ms-auto "><?php dynamic_sidebar( 'widget-area-footer-bottom-col-2' ); ?></div>
						<?php
					} elseif ( $footer_bottom_col_1_active ) {
						?>
						<div class="col col-auto m-auto"><?php dynamic_sidebar( 'widget-area-footer-bottom-col-1' ); ?></div>
						<?php
					} elseif ( $footer_bottom_col_2_active ) {
						?>
						<div class="col col-auto m-auto"><?php dynamic_sidebar( 'widget-area-footer-bottom-col-2' ); ?></div>
						<?php
					}
					?>
				</div>
			</div>
		<?php
	}
	?>
	</div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
