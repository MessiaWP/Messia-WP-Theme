<?php
/**
 * Authentication form.
 *
 * @package Messia\Templates\WP\TemplateParts
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
if ( is_user_logged_in() ) {
	return;
}

$svg = MIA()->get_module_helpers()::get_theme_svg_icons();

$vk       = MIA()->get_module_rest()->get_method( 'vk' )->button();
$ya       = MIA()->get_module_rest()->get_method( 'ya' )->button();
$google   = MIA()->get_module_rest()->get_method( 'google' )->button();
$facebook = MIA()->get_module_rest()->get_method( 'facebook' )->button();
?>

<div class="modal fade" id="login_form" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<button class="close_login" data-dismiss="modal" type="button"><?php echo $svg->close->icon; ?></button>
			<div class="modal-body">
				<div id="oauth" class="oauth oauth-auth-form">
					<div class="oauth-wrapper">
						<form class="oauth-form oauth-login-form">
							<div class="title_login_form"><?php esc_html_e( 'Login', 'messia' ); ?></div>
							<div class="no_acc">
								<span><?php esc_html_e( 'No account?', 'messia' ); ?></span>
								<a href="#" class="btn_reg_form_show"><?php esc_html_e( 'Register', 'messia' ); ?></a>
							</div>
							<?php
								$nonce = MIA()->get_module_rest()->get_method( 'oauth' )->get_nonce_data();
								wp_nonce_field( $nonce['action'], $nonce['field'], false );
							?>
							<input type="hidden" name="oauth_type" value="auth">
							<input placeholder="<?php esc_html_e( 'E-mail*', 'messia' ); ?>" class="type_text" type="text" name="login">
							<input placeholder="<?php esc_html_e( 'Password*', 'messia' ); ?>" class="type_text"  type="password" name="password">
							<div class="forgot">
								<span><?php esc_html_e( 'Forgot password?', 'messia' ); ?></span>
								<a href="#" class="btn_forgot_form_show"><?php esc_html_e( 'Recover', 'messia' ); ?></a>
							</div>
							<button type="submit" class="btn_blue"><?php esc_html_e( 'Login', 'messia' ); ?></button>
						</form>
						<form class="oauth-form oauth-register-form">
							<div class="title_login_form"><?php esc_html_e( 'Register', 'messia' ); ?></div>
							<div class="no_acc">
								<span><?php esc_html_e( 'Already have an account?', 'messia' ); ?></span>
								<a href="#" class="btn_login_form_show"><?php esc_html_e( 'Login', 'messia' ); ?></a>
							</div>
							<?php
								$nonce = MIA()->get_module_rest()->get_method( 'oauth' )->get_nonce_data();
								wp_nonce_field( $nonce['action'], $nonce['field'], false );

								$ppp = get_option( 'wp_page_for_privacy_policy' );
							?>
							<input type="hidden" name="oauth_type" value="register">
							<input placeholder="<?php esc_html_e( 'E-mail*', 'messia' ); ?>" type="text" class="type_text"  name="login">
							<input placeholder="<?php esc_html_e( 'Password*', 'messia' ); ?>" type="password" class="type_text"  name="password">
							<?php
							if ( $ppp ) {
								?>
									<label class="checkbox">
										<input type="checkbox">
										<?php // translators: %%1$s - page url, %2$s - page title. ?>
										<span class="checkbox__text"><?php echo sprintf( __( 'I have read and understood the user %1$s agreement %2$s', 'messia' ), '<a target="_blank" href="' . get_the_permalink( $ppp ) . '">', '</a>' ); ?></span>
									</label>
							<?php } ?>
							<button type="submit" class="btn_blue"><?php esc_html_e( 'Register', 'messia' ); ?></button>
						</form>
						<form class="oauth-form oauth-reset-form">
							<div class="title_login_form"><?php esc_html_e( 'Password<br>recovery', 'messia' ); ?></div>
							<div class="no_acc">
								<span><?php esc_html_e( 'Already have an account?', 'messia' ); ?></span>
								<a href="#" class="btn_login_form_show"><?php esc_html_e( 'Login', 'messia' ); ?></a>
							</div>
							<?php
								$nonce = MIA()->get_module_rest()->get_method( 'oauth' )->get_nonce_data();
								wp_nonce_field( $nonce['action'], $nonce['field'], false );
							?>
							<input type="hidden" name="oauth_type" value="reset">
							<input placeholder="<?php esc_html_e( 'E-mail*', 'messia' ); ?>" type="text"  class="type_text"  name="login">
							<br><br><br><br>
							<button type="submit" class="btn_blue"><?php esc_html_e( 'RECOVER', 'messia' ); ?></button>
						</form>
						<div class="oauth-social-buttons">
							<div class="title_soc_login_form"><?php esc_html_e( 'Login with:', 'messia' ); ?></div>
							<?php
							if ( $vk ) {
								?>
								<a target="_blank" class="oauth-social-button oauth-social-button-vk" href="<?php echo $vk; ?>"><?php echo $svg['vk_01']; ?></a>
								<?php
							}
							if ( $facebook ) {
								?>
								<a target="_blank" class="oauth-social-button oauth-social-button-facebook" href="<?php echo $facebook; ?>"><?php echo $svg['facebook_01']; ?></a>
								<?php
							}
							if ( $google ) {
								?>
								<a target="_blank" class="oauth-social-button oauth-social-button-google" href="<?php echo $google; ?>"><?php echo $svg['google_01']; ?></a>
								<?php
							}
							if ( $ya ) {
								?>
								<a target="_blank" class="oauth-social-button oauth-social-button-ya" href="<?php echo $ya; ?>"><?php echo $svg['yandex_01']; ?></a>
								<?php
							}
							?>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Out of stuff for now -->

<!--    <div class="oauth-popup">-->
<!--        <div class="oauth-popup-wrapper">-->
<!--            <iframe http-equiv="X-Frame-Options" content="sameorigin" class="oauth-popup-frame" name="social_oauth" frameborder="0"></iframe>-->
<!--        </div>-->
<!--    </div>-->

<!-- !Out of stuff for now -->
<script>
	jQuery(document).on('submit', '.oauth-form', function (e) {
		e.preventDefault();
		let data = {
			action: jQuery(this).find('[name="oauth_type"]').val(),
			login: jQuery(this).find('[name="login"]').val(),
			password: jQuery(this).find('[name="password"]').val(),
			oauth_token: jQuery(this).find('[name="oauth_token"]').val(),
			_wp_http_referer: jQuery(this).find('[name="_wp_http_referer"]').val()
		};
		jQuery.ajax({
			url: '/wp-json/messia/oauth/' + jQuery(this).find('[name="oauth_type"]').val(),
			type: 'POST',
			data: data,
			success: function (data) {
				if(data === 'true'){
					location.reload();
				}
			},
			error: function (data) {
				console.log(data)
			}
		})
	});
	jQuery(document).on('click', '.oauth-social-button', function(){
		let int = setInterval(function(){
			jQuery.ajax({
				url: '/wp-json/messia/oauth/is_auth',
				type: 'POST',
				success: function (data) {
					if(data === true){
						location.reload();
						clearInterval(int);
					}
				},
				error: function (data) {
					console.log(data);
					clearInterval(int);
				}
			})
		}, 1000);
	})
</script>
