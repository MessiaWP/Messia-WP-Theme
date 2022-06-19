<?php
/**
 * Messia_Shortcodes
 *
 * @package Messia
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped

declare(strict_types = 1);

namespace Smartbits\Messia\Includes;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Exception;
use Smartbits\Messia\Includes\Helpers\Messia_Help;
use Smartbits\Messia\Includes\Modules\Cpt\Messia_Cpt_Config;
use Smartbits\Messia\Includes\Modules\Widgets\Messia_Widget_Object_Categories;
use Smartbits\Messia\Includes\Modules\Widgets\Messia_Widget_Object_Properties;

/**
 * Class responsible for all shortcodes operating
 *
 * @package Messia
 */
class Messia_Shortcodes {

	use \Smartbits\Messia\Includes\Traits\Messia_Custom_Fields;

	/**
	 * Full class name.
	 *
	 * @var Messia_Help
	 */
	private static string $helpers;

	/**
	 * Current blog settings.
	 *
	 * @var array
	 */
	private static array $blog_settings;

	/**
	 * The single instance of the class.
	 *
	 * @var Messia_Cpt_Config
	 */
	private static array $custom_taxonomies_config;

	/**
	 * Cache for all constructed fields per segment terms
	 *
	 * @var array
	 */
	private static array $all_constructors = [];

	/**
	 * Cache for term meta value of "constructor_cf"
	 *
	 * @var array
	 */
	private static array $terms_meta_constructor = [];

	/**
	 * Cache for post meta value of "segment-constructor-term-id-%id%"
	 *
	 * @var array
	 */
	private static array $posts_meta_constructor = [];

	/**
	 * Cache for post segments
	 *
	 * @var array
	 */
	private static array $post_segment_terms = [];

	/**
	 * Message.
	 *
	 * @var string
	 */
	private static string $non_object_page_warning;

	/**
	 * Front error message.
	 *
	 * @var string
	 */
	private static string $empty_field_warning;

	/**
	 * Default review shortcode atts
	 *
	 * @var array
	 */
	private static array $review_shortcode_atts = [
		'page'  => false,
		'reply' => true,
	];

	/**
	 * Whether initialisation done.
	 *
	 * @var bool
	 */
	private static bool $inited = false;

	/**
	 * Class entry point where all shortcode registers.
	 *
	 * @return string
	 */
	public static function init(): string {

		if ( true === self::$inited ) {
			return __CLASS__;
		}

		self::$helpers                  = MIA()->get_module( 'help' );
		self::$blog_settings            = MIA()->get_module( 'settings' )->get_blog_setting( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME );
		self::$custom_taxonomies_config = MIA()->get_module( 'cpt_config' )->get_custom_taxonomies_config();

		// translators: %s - custom field name.
		self::$empty_field_warning     = __( 'Custom field %s is empty.', 'messia' );
		self::$non_object_page_warning = __( 'Custom fields can be used only at object page, including shortcodes.', 'messia' );

		self::$inited = true;

		add_action( 'init', [ __CLASS__, 'register_shortcodes' ], 20 );

		return __CLASS__;
	}

	/**
	 * Mass register shortcodes in WP.
	 *
	 * @return void
	 */
	public static function register_shortcodes(): void {

		$shortcodes = [
			'content'           => [ __CLASS__, 'get_post_content' ],
			'add_review_form'   => [ __CLASS__, 'new_comment_form' ],
			'reviews'           => [ __CLASS__, 'review_list' ],
			'object_categories' => [ __CLASS__, 'object_categories' ],
			'object_properties' => [ __CLASS__, 'object_properties' ],
		];

		foreach ( $shortcodes as $shortcode => $function ) {
			add_shortcode( $shortcode, $function );
		}

		self::register_constructor_shortcode();
	}

	/**
	 * Register shortcode for custom fields constructor.
	 *
	 * @return void
	 */
	public static function register_constructor_shortcode(): void {

		global $wpdb;

		$sql =
			"SELECT
				t.term_id,
				t.slug,
				t.name,
				tt.count,
				tt.taxonomy
			FROM $wpdb->terms AS t
			INNER JOIN $wpdb->term_taxonomy AS tt ON t.term_id = tt.term_id
			WHERE tt.taxonomy IN ('messia_object_segment')
			ORDER BY t.term_id ASC;";

		$segment_terms = $wpdb->get_results( $sql ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

		if ( 0 === count( $segment_terms ) ) {
			return;
		}

		// The handler for each field will be taken from the CPT configuration.
		add_shortcode( 'constructor', [ __CLASS__, 'constructor_shortcode' ] );

		/*
		 * Create an array of existing constructed
		 * fields for each segment term and compare
		 * meta of posts with it later.
		 */
		foreach ( $segment_terms as $segment_term ) {

			$term_custom_fields = self::$helpers::messia_get_term_meta( (int) $segment_term->term_id, 'constructor_cf' );

			if ( ! $term_custom_fields ) {
				continue;
			}

			foreach ( $term_custom_fields as $term_custom_fields ) {

				// slugs of constructor fields by segment terms.
				self::$all_constructors[ $segment_term->term_id ][] = $term_custom_fields['slug'];
			}
		}
	}

	/**
	 * Callback for registered shortcode "constructor".
	 *
	 * @param mixed $atts Shortcode arguments.
	 *
	 * @return string
	 * @throws Exception If shortcode callback is invalid.
	 */
	public static function constructor_shortcode( $atts ): ?string {

		$html                  = null;
		$errors                = [];
		$atts_optional_default = [];

		if ( ! is_singular( 'messia_object' ) ) {
			// translators: %s - custom field slug.
			$errors[] = sprintf( __( 'Custom fields %s can be displayed via shortcode only at the object page.', 'messia' ), $atts['field_slug'] );
			// translators: %s - custom field slug.
			$errors = self::$helpers::print_errors( sprintf( __( 'Custom field %s', 'messia' ), $atts['field_slug'] ), $errors );

			return $errors;
		}

		$atts_required = shortcode_atts(
			[
				'field_slug'      => false,
				'segment_term_id' => 0,
			],
			$atts
		);

		$postid = get_the_ID();

		$atts_required['segment_term_id'] = self::get_post_segment_terms_id( $postid, (int) $atts_required['segment_term_id'] );

		if ( isset( $atts['segment_term_id'] ) ) {
			if ( false === in_array( (int) $atts['segment_term_id'], $atts_required['segment_term_id'], true ) ) {

				$html .= self::$helpers::print_errors(
					// translators: %s - custom field slug.
					sprintf( __( 'Custom field %s', 'messia' ), $atts_required['field_slug'] ),
					[
						// translators: %s - segment term id.
						sprintf( __( 'Object does not belongs to segment term ID -> %s', 'messia' ), $atts['segment_term_id'] ),
					]
				);
			}
		}

		// Get metadata of constructors corresponding to the object's terms in segments.
		$terms_meta = self::get_term_constructor_meta( $postid, $atts_required['segment_term_id'] );

		// Get the metadata of the constructed fields in the post.
		$post_metas = self::get_post_constructor_meta( $postid, $atts_required['segment_term_id'] );

		foreach ( $terms_meta as $term_id => $term_meta ) {

			if ( empty( $term_meta ) ) {
				// translators: %s - custom field slug.
				$errors[] = sprintf( __( 'Constructor for segment term ID -> %s is empty.', 'messia' ), $term_id );
				continue;
			}

			if ( ! isset( $post_metas[ $term_id ][ $atts_required['field_slug'] ] ) ) {
				// translators: %s - custom field slug.
				$errors[] = sprintf( __( 'Custom field %s does not exist.', 'messia' ), $atts_required['field_slug'] );
				continue;
			}

			$post_field_meta = $post_metas[ $term_id ][ $atts_required['field_slug'] ];

			$constructor_slugs      = array_column( $term_meta, 'slug' );
			$field_index            = array_search( $atts_required['field_slug'], $constructor_slugs, true );
			$constructor_field_meta = $term_meta[ $field_index ];

			// This is the specific field ordered for output in the shortcode.
			$field_config = self::$custom_taxonomies_config['messia_object_segment']['post_custom_fields'][ $constructor_field_meta['field_type'] ];

			// It must exist in the constructor of the corresponding segment term, if not - synchronization error when adding / removing a term.
			if ( ! isset( self::$all_constructors[ $term_id ] ) || false === array_search( $constructor_field_meta['slug'], self::$all_constructors[ $term_id ], true ) ) {
				// translators: %s - custom field slug, %s - term id.
				$errors[] = sprintf( __( 'Constructed field %1$s that is found for this post does not exist in segment term id=%2$s constructor.', 'messia' ), $constructor_field_meta['slug'], $term_id );
				continue;
			}
			if ( ! isset( $field_config['shortcode'] ) ) {
				throw new Exception( 'Valid shortcode callback not found for field type "' . $constructor_field_meta['field_type'] . '"' );
			}
			if ( ! is_callable( $field_config['shortcode'] ) ) {
				throw new Exception( 'Shortcode callback ' . implode( ':', $field_config['shortcode'] ) . '() for field type "' . $constructor_field_meta['field_type'] . '" is not callable.' );
			}

			$post_field_meta = $post_metas[ $term_id ][ $atts_required['field_slug'] ];

			// Set fields options.
			foreach ( $field_config['settings'] as $setting_name => $setting_data ) {
				if ( 'instance' !== $setting_data['scope'] ) {
					continue;
				}
				$atts_optional_default[ $setting_name ] = $setting_data['default'];
			}

			$rules = [
				'card_mode' => FILTER_VALIDATE_BOOLEAN,
				'with_map'  => FILTER_VALIDATE_BOOLEAN,
			];

			$atts_optional_actual = shortcode_atts( $atts_optional_default, $atts );
			$atts_optional_actual = filter_var_array( $atts_optional_actual, $rules, false );

			$html .= call_user_func( $field_config['shortcode'], $constructor_field_meta['field_type'], $constructor_field_meta, $term_id, $post_field_meta, $atts_optional_actual );
		}

		// translators: %s - custom field slug.
		$html .= self::$helpers::print_errors( sprintf( __( 'Custom field %s', 'messia' ), $atts_required['field_slug'] ), $errors );
		return $html;
	}

	/**
	 * Get all segment terms id that object belongs to.
	 *
	 * @param int $postid Target object id.
	 * @param int $atts_segment_term_id If setted to 0 will return all post segemnt terms, otherwise only this one or [].
	 *
	 * @return array
	 */
	private static function get_post_segment_terms_id( int $postid, int $atts_segment_term_id ): array {

		if ( in_array( $postid, self::$post_segment_terms ) ) { //phpcs:ignore WordPress.PHP.StrictInArray.MissingTrueStrict

			// this is a cache.
			return self::$post_segment_terms[ $postid ];
		}

		$post_segments    = self::$helpers::get_post_terms( [ $postid ], [ 'messia_object_segment' ] );
		$post_segments_id = array_map( 'intval', array_column( $post_segments, 'term_id' ) );

		if ( 0 === $atts_segment_term_id ) {

			// If the term is not specified, set to all segement terms post belongs to.
			self::$post_segment_terms[ $postid ] = $post_segments_id;

		} else {

			// If the segment is specified, set to this term if post belongs to it or to [].
			self::$post_segment_terms[ $postid ] = array_intersect( $post_segments_id, [ $atts_segment_term_id ] );
		}

		return self::$post_segment_terms[ $postid ];
	}

	/**
	 * Get custom fields metadata of post in segment terms.
	 *
	 * @param int   $postid Messia object id.
	 * @param array $post_segment_terms_ids Taxonomy segment terms id that object belongs to.
	 *
	 * @return array
	 */
	private static function get_post_constructor_meta( int $postid, array $post_segment_terms_ids ): array {

		foreach ( $post_segment_terms_ids as $post_segment_terms_id ) {

			if (
					array_key_exists( $postid, self::$posts_meta_constructor ) &&
					array_key_exists( $post_segment_terms_id, self::$posts_meta_constructor[ $postid ] )
				) {
				// This is a cache.
				continue;
			}

			$meta_key               = str_replace( '%Id%', (string) $post_segment_terms_id, MESSIA_POSTMETA_CONSTRUCTED_NAME );
			$posts_meta_constructor = json_decode( get_post_meta( $postid, $meta_key, true ), true );
			self::$posts_meta_constructor[ $postid ][ $post_segment_terms_id ] = $posts_meta_constructor;
		}

		return array_intersect_key( self::$posts_meta_constructor[ $postid ], array_flip( $post_segment_terms_ids ) );
	}

	/**
	 * Get constructor term metadata of post in segment terms.
	 *
	 * @param int   $postid Messia object id.
	 * @param array $post_segment_terms_ids Taxonomy segment terms id that object belongs to.
	 *
	 * @return array
	 */
	private static function get_term_constructor_meta( int $postid, array $post_segment_terms_ids ): array {

		foreach ( $post_segment_terms_ids as $post_segment_terms_id ) {

			if (
					array_key_exists( $postid, self::$terms_meta_constructor ) &&
					array_key_exists( $post_segment_terms_id, self::$terms_meta_constructor[ $postid ] )
				) {
				// This is a cache.
				continue;
			}

			$term_constructed = self::$helpers::messia_get_term_meta( $post_segment_terms_id, 'constructor_cf' );
			self::$terms_meta_constructor[ $postid ][ $post_segment_terms_id ] = $term_constructed;
		}

		return array_intersect_key( self::$terms_meta_constructor[ $postid ], array_flip( $post_segment_terms_ids ) );
	}

	/**
	 * Wrapper for get_custom_field().
	 *
	 * @param string $field_type Inner type of custom field.
	 * @param array  $constructor_field_meta Metadata of segment term constructor field.
	 * @param int    $segment_id Segment taxonomy term id.
	 * @param mixid  $post_field_meta Metadata of object constructed field.
	 * @param array  $args Extra data.
	 *
	 * @return string
	 */
	public static function custom_field( string $field_type, array $constructor_field_meta, int $segment_id, $post_field_meta, array $args ): ?string {
		return self::get_custom_field( $field_type, $constructor_field_meta, $segment_id, $post_field_meta, $args );
	}

	/**
	 * Return current post content. Wrapper for WP the_content().
	 *
	 * @return string
	 */
	public static function get_post_content(): ?string {

		ob_start();
		the_content();
		return ob_get_clean();
	}

	/**
	 * Detect if current queried object is of type singular.
	 *
	 * @return bool
	 */
	public static function validate_comments_target(): bool {
		return is_singular();
	}

	/**
	 * Whether current queried object allow commenting.
	 *
	 * @return bool
	 */
	public static function validate_commentable(): bool {

		if ( comments_open() || pings_open() ) {
			return true;
		}
		return false;
	}

	/**
	 * Render form for new comment.
	 *
	 * @return string
	 */
	public static function new_comment_form(): ?string {

		$errors = [];

		$valid       = self::validate_comments_target();
		$commentable = self::validate_commentable();

		if ( ! $valid ) {
			$errors[] = __( 'New reply form can be placed only at the object page.', 'messia' );
			// translators: %s - custom field slug.
			$errors = self::$helpers::print_errors( __( 'Shortcode "add_review_form"', 'messia' ), $errors );

			return $errors;
		}

		if ( ! $commentable ) {
			return '<h4 class="text-center mt-4">' . __( 'Comments are closed.', 'messia' ) . '</h4>';
		}

		$post_id         = get_the_ID();
		$captcha_v3_data = self::$helpers::captcha_v3_data();
		$nonce           = wp_nonce_field( 'messia_comment_form', 'messia_comment_form_nonce', false, false );
		$commenter       = wp_get_current_commenter();
		$req             = get_option( 'require_name_email' );
		$html_req        = ( $req ? " required='required'" : '' );
		$rating_snippet  = self::$helpers::get_object_rating_snippet(
			$post_id,
			[
				'stars'       => true,
				'date'        => false,
				'av_point'    => false,
				'av_point_of' => true,
				'reviews'     => false,
			],
			true
		);

		// translators: %s - * symbol.
		$required_text = sprintf( ' ' . __( 'Required fields are marked %s', 'messia' ), '<span class="required">*</span>' );
		$captcha_field = null;

		// Should be before messia-comment-form.
		if ( $captcha_v3_data ) {
			wp_enqueue_script( 'gcaptcha-v3' );
		}

		/* STYLES */
		wp_enqueue_style( 'messia-comment-form' );

		/* SCRIPTS */
		wp_enqueue_script( 'messia-comment-form' );

		if ( $captcha_v3_data ) {
			$captcha_field = '<input type="hidden" name="recaptchaResponse" id="recaptchaResponse"><input type="hidden" name="captchaAction" id="recaptchaAction" value="comment">';
		}

		$args = [
			'fields'               => [
				'author' => '<label for="author"  class="w-100 d-block mb-2">' . __( 'Name', 'messia' ) . ' <span class="required">*</span></label><div class=" mb-3 messia-textfield me-2 flex-grow-1">
								<input id="author" name="author" type="text" value="' . esc_attr( $commenter['comment_author'] ) . '" size="30" required="required" />
								<div class="messia-label-container">
									<span class="messia-outline"></span>
									<label>
										<span>' . __( 'Name', 'messia' ) . '</span>
									</label>
								</div>
							</div>',
				'email'  => false,
			],
			'comment_notes_before' => '',
			'comment_notes_before' => '<p class="comment-notes"><span id="email-notes">' . __( 'Your email will not be published.', 'messia' ) . '</span>' . $required_text . '</p>',
			'comment_notes_after'  => '',
			'comment_field'        => '<div class="eval d-flex mb-2"><div class="title me-3">' . __( 'Your rating (optional)', 'messia' ) . '</div>' . $rating_snippet . '</div><div class="textarea mb-3"><div class="w-100 messia-textfield">
										<textarea id="comment" name="comment" cols="45" rows="8"  required="required"></textarea>
										<div class="messia-label-container">
											<span class="messia-outline"></span>
											<label>
												<span>' . __( 'Your review', 'messia' ) . '</span>
											</label>
										</div>
									</div></div>',
			'id_form'              => 'commentform',
			'id_submit'            => 'submit',
			'class_form'           => 'messia-comment-form add_rev',
			'class_submit'         => 'submit',
			'name_submit'          => 'submit',
			// Works if JS disabled.
			'title_reply'          => __( 'Leave a new reply', 'messia' ),
			// Works if JS disabled.
			// translators: %s - post title.
			'title_reply_to'       => __( 'Leave a new reply to %s', 'messia' ),
			'title_reply_before'   => '<div class="my-3"><h4 id="reply-title" class="comment-reply-title d-flex justify-content-between align-items-center">',
			'title_reply_after'    => '</h4></div>',
			'label_submit'         => __( 'Leave review', 'messia' ),
			'submit_button'        => '<input name="%1$s" type="submit" id="%2$s" class="messia-btn %3$s" value="%4$s">',
			'submit_field'         => '<p class="form-submit">%1$s %2$s ' . $captcha_field . $nonce . '<input type="hidden" name="comment_rating" id="comment_rating" value=0></p>',
		];

		if ( $req ) {

			$args['fields']['author'] = '<div class="author-credendials">' . $args['fields']['author'];
			$args['fields']['email']  = '<label for="email">' . __( 'Email', 'messia' ) . ( $req ? ' <span class="required">*</span>' : '' ) . '</label> ' .
			'<div class="messia-textfield mb-3">
			<input id="email" name="email" type="email" value="' . esc_attr( $commenter['comment_author_email'] ) .
										'" size="30" maxlength="100" aria-describedby="email-notes"' . $html_req . ' />
			<div class="messia-label-container">
				<span class="messia-outline"></span>
				<label>
					<span>' . __( 'Email', 'messia' ) . '</span>
				</label>
			</div>
		</div></div>';
		} else {
			$args['fields']['author'] = '<div class="author-credendials">' . $args['fields']['author'] . '</div>';
		}

		ob_start();
		comment_form( $args, $post_id );
		return ob_get_clean();
	}

	/**
	 * Render comments list.
	 *
	 * @param array $atts Shortcode args.
	 *
	 * @return string
	 */
	public static function review_list( $atts ): ?string {

		$errors = [];
		$valid  = self::validate_comments_target();

		if ( ! $valid ) {
			$errors[] = __( 'New reply form can be placed only at the object page.', 'messia' );
			// translators: %s - custom field slug.
			$errors = self::$helpers::print_errors( __( 'Shortcode "add_review_form"', 'messia' ), $errors );

			return $errors;
		}

		self::$review_shortcode_atts = shortcode_atts( self::$review_shortcode_atts, $atts );

		self::$review_shortcode_atts['page']  = (bool) self::$review_shortcode_atts['page'];
		self::$review_shortcode_atts['reply'] = (bool) self::$review_shortcode_atts['reply'];

		ob_start();
		comments_template( 'comments.php' );
		return ob_get_clean();
	}

	/**
	 * Just fire the widget Smartbits\Messia\Includes\Modules\Widgets\Messia_Widget_Object_Categories.
	 *
	 * @param array $atts Shortcode arguments.
	 *
	 * @return string
	 */
	public static function object_categories( array $atts ): string {

		$factory = MIA()->get_module( 'widgets' );
		$widget  = new Messia_Widget_Object_Categories();
		$args    = $factory->get_shared_args();

		$atts = shortcode_atts(
			[
				'title' => null,
			],
			$atts
		);

		ob_start();
		$widget->widget( $args, $atts );
		return ob_get_clean();
	}

	/**
	 * Just fire the widget Smartbits\Messia\Includes\Modules\Widgets\Messia_Widget_Object_Properties.
	 *
	 * @param array $atts Shortcode arguments.
	 *
	 * @return string
	 */
	public static function object_properties( array $atts ): string {

		$factory = MIA()->get_module( 'widgets' );
		$widget  = new Messia_Widget_Object_Properties();
		$args    = $factory->get_shared_args();

		$atts = shortcode_atts(
			[
				'title' => null,
			],
			$atts
		);

		ob_start();
		$widget->widget( $args, $atts );
		return ob_get_clean();
	}

	/**
	 * Get last known args passed to self::review_list().
	 * Requires in comment template.
	 *
	 * @return array
	 */
	public static function get_review_shortcode_atts(): array {
		return self::$review_shortcode_atts;
	}
}
