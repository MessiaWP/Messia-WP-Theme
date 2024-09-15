<?php
/**
 * The template for displaying comments.
 *
 * This is the template that displays the area of the page that contains both the current comments
 * and the comment form.
 *
 * @package Messia\Templates
 */

if ( post_password_required() ) {
	return;
}
$atts = MIA()->get_module_shortcodes()::get_review_shortcode_atts();
wp_enqueue_style( 'messia-comment-list' );
?>

<div class="comment-items">

	<?php if ( have_comments() ) { ?>
		<div class="comments" id="comments">
		<?php
			$comments_number = absint( get_comments_number() );
		?>
			<div class="comments-header">
				<div class="mb-2"><h2 class="comment-reply-title d-flex justify-content-between align-items-center"></div>
				<?php
				if ( '1' === $comments_number ) {
					// translators: %s: post title.
					printf( _x( 'One reply on &ldquo;%s&rdquo;', 'comments title', 'messia' ), esc_html( get_the_title() ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				} else {
					echo sprintf(
						// translators: 1: number of comments, 2: post title.
						_nx( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
							'%1$s reply on &ldquo;%2$s&rdquo;',
							'%1$s replies on &ldquo;%2$s&rdquo;',
							$comments_number,
							'comments title',
							'messia'
						),
						esc_html( number_format_i18n( $comments_number ) ),
						esc_html( get_the_title() )
					);
				}
				?>
				</h2>
			</div>
		</div>

		<?php
		$args = [
			'style'             => 'div',
			'page'              => $atts['page'],
			'reply'             => $atts['page'],
			'reverse_top_level' => true,
			'type'              => 'comment',
			'reply_text'        => __( 'Reply', 'messia' ),
			'login_text'        => __( 'Log in, to reply.', 'messia' ),
			'short_ping'        => true,
			'modules'           => [
				'stars'       => true,
				'date'        => true,
				'av_point'    => true,
				'av_point_of' => false,
				'reviews'     => false,
			],
			'callback'          => [ 'Smartbits\Messia\Includes\Helpers\Messia_Help', 'shape_comment' ],
		];
		if ( false !== $atts['page'] ) {
			$args['page'] = $atts['page'];
		}
		if ( false === $atts['reply'] ) {
			add_filter( 'comment_reply_link', '__return_false' );
		}

		wp_list_comments( $args );
		?>

		<div class="comments-nav-links d-flex align-items-center justify-content-between">
			<div class="comments-previous"><?php previous_comments_link( esc_html__( 'Previous comments', 'messia' ) ); ?></div>
			<div class="comments-next"><?php next_comments_link( esc_html__( 'Next comments', 'messia' ) ); ?></div>
		</div>

	<?php } ?>
</div>
