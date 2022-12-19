<?php
/**
 * Messia_Comments
 *
 * @package Messia
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped

declare(strict_types = 1);

namespace Smartbits\Messia\Includes;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use WP_Comment;

/**
 * Class responsible for comment operating.
 *
 * @package Messia
 */
class Messia_Comments {

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Comments
	 */
	private static ?Messia_Comments $instance = null; // phpcs:ignore Squiz.PHP.DisallowMultipleAssignments.Found

	/**
	 * The settings.
	 *
	 * @var array
	 */
	private array $blog_settings;

	/**
	 * Messia_Comments Constructor.
	 *
	 * @return void
	 */
	private function __construct() {

		$this->blog_settings = MIA()->get_module( 'settings' )->get_blog_setting( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME );

		add_filter( 'preprocess_comment', [ $this, 'on_preprocess_comment' ] );
		add_action( 'comment_post', [ $this, 'on_inserted_comment' ], 10, 3 );
		add_filter( 'edit_comment', [ $this, 'on_edit_comment' ], 10, 2 );
		add_filter( 'add_meta_boxes_comment', [ $this, 'on_add_metabox' ], 10, 2 );
	}

	/**
	 * Messia Comments Instance.
	 * Ensures only one instance of Messia_Comments is loaded or can be loaded.
	 *
	 * @return Messia_Comments Instance.
	 */
	public static function instance(): Messia_Comments {

		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Callback for WP preprocess_comment action.
	 * Validate Google captcha.
	 *
	 * @param array $fields Comment data.
	 *
	 * @return array
	 */
	public function on_preprocess_comment( array $fields ): array {

		if ( empty( $_POST['messia_comment_form_nonce'] ) || ! wp_verify_nonce( $_POST['messia_comment_form_nonce'], 'messia_comment_form' ) ) {
			wp_die(
				sprintf( '<p><strong>%s</strong>: %s</p>', __( 'Error', 'messia' ), __( 'invalid verification data', 'messia' ) ),
				__( 'Comment Submission Failure', 'messia' ),
				[
					'response'  => 200,
					'back_link' => true,
				]
			);
		}

		if ( isset( $_POST['recaptchaResponse'] ) && isset( $_POST['captchaAction'] ) ) {

			// Build POST request.
			$recaptcha_url      = 'https://www.google.com/recaptcha/api/siteverify';
			$recaptcha_secret   = $this->blog_settings['google_captcha_v3_secret_key'];
			$recaptcha_response = $_POST['recaptchaResponse'];

			// Make and decode POST request.
			$recaptcha = wp_remote_get( $recaptcha_url . '?secret=' . $recaptcha_secret . '&response=' . $recaptcha_response );
			$recaptcha = json_decode( $recaptcha['body'] );

			// Take action based on the score returned.
			if ( true === $recaptcha->success ) {
				if ( $recaptcha->action !== $_POST['captchaAction'] || $recaptcha->score < 0.5 ) {
					wp_die(
						sprintf( '<p><strong>%s</strong>: %s</p>', __( 'Error', 'messia' ), __( 'suspicious activity detected, comment cannot be posted.', 'messia' ) ),
						__( 'Comment Submission Failure', 'messia' ),
						[
							'response'  => 200,
							'back_link' => true,
						]
					);
				}
			} elseif ( false === $recaptcha->success ) {
					$r = (array) $recaptcha;
				if ( isset( $r['error-codes'] ) ) {
					wp_die(
						sprintf( '<p><strong>%s</strong>: %s</p>', __( 'Error', 'messia' ), __( 'gCaptha V3 validation error.', 'messia' ) ),
						__( 'Comment Submission Failure', 'messia' ),
						[
							'response'  => 200,
							'back_link' => true,
						]
					);
				}
			}
		}

		if ( '' === $fields['comment_author'] || is_null( $fields['comment_author'] ) || empty( $fields['comment_author'] ) ) {

			wp_die(
				sprintf( '<p><strong>%s</strong>: %s</p>', __( 'Error', 'messia' ), __( 'please fill in required fields (name).', 'messia' ) ),
				__( 'Comment Submission Failure', 'messia' ),
				[
					'response'  => 200,
					'back_link' => true,
				]
			);
		}

		return $fields;
	}

	/**
	 * Callback for WP comment_post action.
	 * Adds comment meta data (rating).
	 *
	 * @param int        $id               The comment ID.
	 * @param int|string $comment_approved One (1) if the comment is approved, zero (0) if not, 'spam' if spam.
	 * @param array      $comment          Comment data.
	 *
	 * @return void
	 */
	public function on_inserted_comment( int $id, $comment_approved, array $comment ): void {

		if ( empty( $_POST['messia_comment_form_nonce'] ) || ! wp_verify_nonce( $_POST['messia_comment_form_nonce'], 'messia_comment_form' ) ) {
			wp_die(
				sprintf( '<p><strong>%s</strong>: %s</p>', __( 'Error', 'messia' ), __( 'invalid verification data', 'messia' ) ),
				__( 'Comment Submission Failure', 'messia' ),
				[
					'response'  => 200,
					'back_link' => true,
				]
			);
		}

		if ( isset( $_POST['comment_rating'] ) && 0 === (int) $comment['comment_parent'] ) {

			$rating = null;

			if ( ! empty( $_POST['comment_rating'] ) ) {
				$rating = esc_sql( number_format( round( (float) $_POST['comment_rating'], 2 ), 2, '.', '' ) );
			}
			if ( ( (float) $rating >= 0 && (float) $rating <= 5 ) || is_null( $rating ) ) {
				update_comment_meta( $id, 'messia_rating', $rating );
			}
		}
	}

	/**
	 * Callback for WP add_meta_boxes_comment action.
	 * Adds metabox with comment rating into comment page in admin area.
	 *
	 * @param WP_Comment $post Comment post object.
	 *
	 * @return void
	 */
	public function on_add_metabox( WP_Comment $post ): void {

		$title = __( 'Rating', 'messia' );

		add_meta_box(
			'messia-rating',
			$title,
			function ( $post ) {

				$comment_meta = get_comment_meta( $post->comment_ID, 'messia_rating', true );
				?>
					<div class="metabox-comment-fields">
						<div class="field">
							<label><?php esc_html_e( 'Assessment', 'messia' ); ?><span class="messia-help-tip" title="<?php esc_html_e( 'A number between 0 and 5 inclusive.', 'messia' ); ?>"></span></label>
							<input type="number" min=0 max=5 step=0.1 name="messia_rating" value="<?php echo $comment_meta; ?>">
						</div>
					</div>
				<?php
				wp_nonce_field( 'messia_edit_comment', 'messia_edit_comment_nonce', false );
			},
			'comment',
			'normal'
		);
	}

	/**
	 * Callback for WP edit_comment action.
	 * Saves comment rating value.
	 *
	 * @param int   $comment_id ID of comment.
	 * @param array $data       Comment data.
	 *
	 * @return void
	 */
	public function on_edit_comment( int $comment_id, array $data ): void {

		if ( empty( $_POST['messia_edit_comment_nonce'] ) || ! wp_verify_nonce( $_POST['messia_edit_comment_nonce'], 'messia_edit_comment' ) ) {
			return;
		}

		update_comment_meta(
			$comment_id,
			'messia_rating',
			esc_sql( number_format( round( (float) $_POST['messia_rating'], 2 ), 2, '.', '' ) )
		);
	}
}
