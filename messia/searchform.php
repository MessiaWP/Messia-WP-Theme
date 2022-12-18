<?php
/**
 * The template for displaying search form.
 *
 * @package Messia
 */

$helpers = MIA()->get_module( 'help' );
$svgs    = $helpers::get_theme_svg_icons();
?>
<form role="search" method="get" class="searchform d-flex" action="<?php echo esc_html( home_url( '/' ) ); ?>" >
	<label for="searchform">

		<div class="messia-textfield me-2 flex-grow-1">
			<input type="search" id="searchform" class="search-field" name="s" value="<?php echo get_search_query(); ?>">
			<div class="messia-label-container">
				<span class="messia-outline"></span>
				<label>
					<span><?php esc_html_e( 'Search …', 'messia' ); ?></span>
				</label>
			</div>
		</div>


	</label>
	<button aria-label="search" type="submit" id="searchsubmit"><?php echo $svgs->search->icon; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></button>
</form>
