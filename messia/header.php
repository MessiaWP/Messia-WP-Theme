<?php
/**
 * The template for the header section.
 *
 * @package Messia
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
global $post;

$main_menu     = null;
$data_postid   = null;
$data_gmap_key = null;

$helpers  = MIA()->get_module( 'help' );
$settings = MIA()->get_module( 'settings' );

$current_post  = get_queried_object();
$blog_settings = $settings->get_blog_setting( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME );

$blog_info   = get_bloginfo( 'description' );
$custom_logo = get_custom_logo();

if ( ! is_null( $current_post ) ) {
	$data_postid = "data-postid='{$current_post->ID}'";
}

if ( ! empty( $blog_settings['google_maps_api_key'] ) ) {
	$data_gmap_key = "data-key='{$blog_settings['google_maps_api_key']}'";
}

if ( has_nav_menu( 'main' ) ) {

	add_filter( 'nav_menu_css_class', [ $helpers, 'navmenu_css_filter' ], 10, 4 );
	add_filter( 'wp_nav_menu_items', [ $helpers, 'navmenu_li_filter' ], 10, 2 );

	$main_menu = wp_nav_menu(
		[
			'menu_id'         => false,
			'menu_class'      => 'ms-auto navbar-nav align-items-center d-block d-md-flex',
			'theme_location'  => 'main',
			'container'       => 'div',
			'container_class' => 'messia-nav-menu ',
			'container_id'    => '',
			'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
			'echo'            => false,
		]
	);
}

$manifest = [
	'id'               => 'messia-worker',
	'short_name'       => $blog_settings['manifest_shortname'],
	'name'             => $blog_settings['manifest_name'],
	'description'      => $blog_settings['manifest_description'],
	'version'          => MESSIA_THEME_VERSION,
	'theme_color'      => $blog_settings['manifest_theme_color'],
	'background_color' => $blog_settings['manifest_background_color'],
	'display'          => 'standalone',
	'orientation'      => 'portrait',
	'icons'            => [
		[
			'src'     => MESSIA_THEME_URL . '/includes/assets/images/m-icon-72.png',
			'type'    => 'image/png',
			'sizes'   => '72x72',
			'purpose' => 'maskable',
		],
		[
			'src'     => MESSIA_THEME_URL . '/includes/assets/images/m-icon-96.png',
			'type'    => 'image/png',
			'sizes'   => '96x96',
			'purpose' => 'maskable',
		],
		[
			'src'     => MESSIA_THEME_URL . '/includes/assets/images/m-icon-128.png',
			'type'    => 'image/png',
			'sizes'   => '128x128',
			'purpose' => 'maskable',
		],
		[
			'src'     => MESSIA_THEME_URL . '/includes/assets/images/m-icon-144.png',
			'type'    => 'image/png',
			'sizes'   => '144x144',
			'purpose' => 'maskable',
		],
		[
			'src'     => MESSIA_THEME_URL . '/includes/assets/images/m-icon-152.png',
			'type'    => 'image/png',
			'sizes'   => '152x152',
			'purpose' => 'maskable',
		],
		[
			'src'     => MESSIA_THEME_URL . '/includes/assets/images/m-icon-192.png',
			'type'    => 'image/png',
			'sizes'   => '192x192',
			'purpose' => 'maskable',
		],
		[
			'src'     => MESSIA_THEME_URL . '/includes/assets/images/m-icon-384.png',
			'type'    => 'image/png',
			'sizes'   => '384x384',
			'purpose' => 'maskable',
		],
		[
			'src'     => MESSIA_THEME_URL . '/includes/assets/images/m-icon-512.png',
			'type'    => 'image/png',
			'sizes'   => '512x512',
			'purpose' => 'maskable',
		],
		[
			'src'     => MESSIA_THEME_URL . '/includes/assets/images/m-icon-512.png',
			'type'    => 'image/png',
			'sizes'   => '512x512',
			'purpose' => 'any',
		],
	],
	'start_url'        => $blog_settings['manifest_starturl'],
	'splash_pages'     => null,
];
?>

<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="initial-scale=1.0, width=device-width">
	<?php
	if ( 1 === $blog_settings['pwa_enable'] ) {
		?>
		<meta name="theme-color" content="<?php echo $blog_settings['manifest_theme_color']; ?>"/>
		<link rel="manifest" href='data:application/json,<?php echo rawurlencode( wp_json_encode( apply_filters( 'messia_pwa_manifest', $manifest ), JSON_UNESCAPED_SLASHES ) ); ?>' />
		<?php
	}
	?>
	<?php wp_head(); ?>
</head>
<body <?php body_class( [ MESSIA_NAMESPACE_FRONT, 'front' ] ); ?><?php echo $data_postid; ?><?php echo $data_gmap_key; ?>>
<?php wp_body_open(); ?>
<header class="header zi-10">
	<?php
	$header_top_col_1_active = is_active_sidebar( 'widget-area-header-top-col-1' );
	$header_top_col_2_active = is_active_sidebar( 'widget-area-header-top-col-2' );

	$nav_classes = [ 'header-menu', 'navbar-nav', 'ms-auto' ];

	if ( 1 === $blog_settings['header_top_navmenu_pills'] ) {
		$nav_classes[] = 'pills';
	}

	if ( 0 === $blog_settings['header_top_hide_itself'] ) {
		?>
		<div class="header-top pt-2 pb-2">
			<div class="container">
				<div class="row">
					<?php
					if ( $header_top_col_1_active && $header_top_col_2_active ) {
						?>
						<div class="col two-col col-auto"><?php dynamic_sidebar( 'widget-area-header-top-col-1' ); ?></div>
						<div class="col two-col col-auto ms-auto"><?php dynamic_sidebar( 'widget-area-header-top-col-2' ); ?></div>
						<?php
					} elseif ( $header_top_col_1_active ) {
						?>
						<div class="col"><?php dynamic_sidebar( 'widget-area-header-top-col-1' ); ?></div>
						<?php
					} elseif ( $header_top_col_2_active ) {
						?>
						<div class="col"><?php dynamic_sidebar( 'widget-area-header-top-col-2' ); ?></div>
						<?php
					}
					?>
				</div>
			</div>
		</div>
		<?php
	}
	?>
	<div class="header-bottom pt-3 pb-3">
		<div class="container">
			<div class="row align-items-center">
				<?php
				if ( $custom_logo ) {
					echo "<div class='col-6 col-lg-auto col-sm-auto col-md-auto logo'>{$custom_logo}</div>";
				}
				if ( $blog_info ) {
					echo "<div class='col col-lg-3 d-none d-md-block'>{$blog_info}</div>";
				}
				?>
				<div class="col-3 ms-auto d-md-none navbar-expand-md navbar">
					<button aria-label="menu" class="navbar-toggler collapsed ms-auto d-flex" type="button"
							data-bs-toggle="collapse" data-bs-target="#navbar-menu" aria-controls="navbar-menu"
							aria-expanded="false">
						<span class="menu-toggle">
							<span></span>
							<span></span>
							<span></span>
						</span>
					</button>
				</div>
				<div id="navbar-menu" class="col-md collapse navbar-expand d-md-flex flex-column">
					<nav class="<?php echo implode( ' ', $nav_classes ); ?>">
						<?php echo $main_menu; ?>
					</nav>
				</div>
			</div>
		</div>
	</div>
</header>
<?php

do_action( 'messia_after_header' );

if ( 0 === $blog_settings['page_title_hide_title'] && ! is_home() && ! is_front_page() ) {

	if ( is_archive() || is_home() ) {
		$post_title = get_the_archive_title();
	} elseif ( is_404() ) {
		$post_title = __( 'Error', 'messia' );
	} elseif ( is_search() ) {
		// translators: %s - search query.
		$post_title = '<h1 class="mb-3">' . sprintf( __( 'Search: %s', 'messia' ), '&ldquo;' . get_search_query() . '&rdquo;' ) . '</h1>';
	} else {
		$post_title = get_the_title();
	}

	$header_title_classes = 'header-title pt-3 pb-3 mb-4';
	$header_title_images  = json_decode( $blog_settings['page_title_background_image'] );

	if ( ! empty( $header_title_images ) ) {
		$header_title_classes .= ' bg-image';
	}
	?>
	<div class="<?php echo $header_title_classes; ?>">
		<div class="container">
			<?php
			if ( is_null( $current_post ) ) {
				?>
				<h1 class="mb-3"><?php echo $post_title; ?></h1>
				<?php

				if ( 0 === $blog_settings['page_title_hide_breadcrumbs'] ) {
					$breadcrumbs = $helpers::get_breadcrumbs();
					?>
					<nav aria-label="breadcrumb"><?php echo $breadcrumbs; ?></nav>
					<?php
				}
			} else {

				?>
				<h1  class="mb-3"><?php echo apply_filters( 'messia_post_title', $post_title, get_post() ); ?></h1>
				<?php

				/**
				 * Fire after page title ouputted.
				 *
				 * @hook messia_after_post_title
				 */
				do_action( 'messia_after_post_title' );

				if ( 0 === $blog_settings['page_title_hide_breadcrumbs'] ) {
					$breadcrumbs = $helpers::get_breadcrumbs();
					?>
					<nav aria-label="breadcrumb"><?php echo apply_filters( 'messia_breadcrumbs', $breadcrumbs, get_post() ); ?></nav>
					<?php
				}
			}
			?>
		</div>
	</div>
	<?php
}
?>
<main class="main-content">
<?php

/**
 * Fire right after render of content
 * started before anything outputted.
 *
 * @hook messia_start_main_content
 */
do_action( 'messia_started_main_content' );
