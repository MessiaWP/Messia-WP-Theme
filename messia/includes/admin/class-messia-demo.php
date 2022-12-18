<?php
/**
 * Site content migration.
 *
 * @package wpAdminMenuPage
 */

// phpcs:disable WordPress.DB.PreparedSQL.InterpolatedNotPrepared

declare(strict_types = 1);

namespace Smartbits\Messia\Includes\Admin;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Smartbits\Messia\Includes\Config\Messia_Config_Settings;
use Exception;
use RecursiveIteratorIterator;
use RecursiveDirectoryIterator;
use FilesystemIterator;
use ZipArchive;
use WP_Filesystem_Direct;
use wpdb;
use stdClass;

/**
 * Class that creat and restore DB dump and media files.
 *
 * @package wpAdminMenuPage
 */
class Messia_Demo {

	/**
	 * DB tables names to dump
	 *
	 * @var array<int, string>
	 */
	private array $tables_to_clone = [
		'commentmeta',
		'comments',
		'options',
		'postmeta',
		'posts',
		'termmeta',
		'terms',
		'term_relationships',
		'term_taxonomy',
	];

	/**
	 * The flag by which the code
	 * recognizes tables created by itю
	 *
	 * @var string
	 */
	private string $transport_comment = 'messia_transport_table';

	/**
	 * Prefix of DB tables.
	 * Will be replaced with real one on restore.
	 *
	 * @var string
	 */
	private string $transport_prefix = 'ms_tr_prfx_';

	/**
	 * Host name.
	 * Will be replaced with real one on restore.
	 *
	 * @var string
	 */
	private string $transport_host = 'transport_hostname';

	/**
	 * Create a copy of mySQL DB.
	 *
	 * @param string $backup_path Path to resulting zip file without trailing slash.
	 *
	 * @throws Exception On any unexpected scenario.
	 *
	 * @return void
	 */
	public function dump_db( string $backup_path ): void {

		require_once ABSPATH . 'wp-admin/includes/file.php';

		global $wpdb, $wp_filesystem;

		WP_Filesystem();

		$i         = 1;
		$site_url  = wp_parse_url( get_site_url() );
		$host      = $site_url['host'];
		$sql_dump  = tempnam( sys_get_temp_dir(), 'msd' );
		$tables_wp = array_merge( $wpdb->tables, $wpdb->global_tables, $wpdb->ms_global_tables );

		$tables = (object) array_map(
			function( $table_clone ) use ( $wpdb, $tables_wp ) {
				if ( in_array( $table_clone, $tables_wp, true ) ) {
					return (object) [
						'messia' => $this->transport_prefix . $table_clone,
						'wp'     => $wpdb->prefix . $tables_wp[ array_search( $table_clone, $tables_wp, true ) ],
					];
				}
			},
			$this->tables_to_clone
		);

		$dump_prepend = "SET SQL_MODE = \"NO_AUTO_VALUE_ON_ZERO\";\r\nSET time_zone = \"+00:00\";\r\n\r\n\r\n/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;\r\n/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;\r\n/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;\r\n/*!40101 SET NAMES utf8 */;\r\n--\r\n-- Database: `" . DB_NAME . "`\r\n--\r\n\r\n\r\n";
		$dump_append  = "\r\n\r\n/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;\r\n/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;\r\n/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;";

		// phpcs:disable WordPress.WP.AlternativeFunctions.file_system_read_fopen
		// phpcs:disable WordPress.WP.AlternativeFunctions.file_system_read_fwrite
		// phpcs:disable WordPress.WP.AlternativeFunctions.file_system_read_fclose
		try {

			if ( $wp_filesystem->is_file( $sql_dump ) && $wp_filesystem->is_writable( $sql_dump ) ) {

				$sql_dump_handle = fopen( $sql_dump, 'a' );

				if ( ! $sql_dump_handle ) {
					throw new Exception( __( 'Can not open temporary dump file.', 'messia' ) );
				}
			} else {
				throw new Exception( __( 'Can not write into temporary dump file.', 'messia' ) );
			}

			foreach ( $tables as $table ) {

				$table_status = $this->get_table_status( $this->transport_prefix . $table->messia );

				if ( ! is_null( $table_status ) && ! $table_status->is_transport_table ) {
					// translators: %s - MySQL table name.
					throw new Exception( sprintf( __( 'Can not create table "%s" - table already exist.', 'messia' ), $table->messia ) );
				}

				$wpdb->query( "DROP TABLE IF EXISTS {$table->messia};" );
				$wpdb->query( "CREATE TABLE {$table->messia} LIKE {$table->wp}" );
				$wpdb->query( "ALTER TABLE {$table->messia} COMMENT = '{$this->transport_comment}';" );
				$wpdb->query( "INSERT INTO {$table->messia} SELECT * FROM {$table->wp}" );

				switch ( $table->messia ) {
					case "{$this->transport_prefix}options":
						$wpdb->query(
							"DELETE
								FROM {$table->messia}
							WHERE
								'option_name' LIKE '%_transient%'"
						);
						// EXCEPTIONS.
						// Users.
						$wpdb->query(
							"UPDATE
								{$table->messia}
							SET
								option_name = replace(option_name, '{$wpdb->prefix}user_roles', '{$this->transport_prefix}user_roles')"
						);

						// Drop some settings.
						$changes_opt   = false;
						$option_name   = MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME;
						$blog_settings = $wpdb->get_row(
							"SELECT
								option_id,
								option_value
							FROM
								{$table->messia}
							WHERE
								option_name = '{$option_name}'"
						);

						$blog_settings->option_value = unserialize( $blog_settings->option_value );

						// PWA.
						if ( isset( $blog_settings->option_value['pwa_enable'] ) ) {
							unset( $blog_settings->option_value['pwa_enable'] );
							$changes_opt = true;
						}

						// PWA scope.
						if ( isset( $blog_settings->option_value['manifest_starturl'] ) ) {
							unset( $blog_settings->option_value['manifest_starturl'] );
							$changes_opt = true;
						}

						// Licence.
						if ( isset( $blog_settings->option_value['theme_licence_data'] ) ) {
							unset( $blog_settings->option_value['theme_licence_data'] );
							$changes_opt = true;
						}

						// Support access.
						if ( isset( $blog_settings->option_value['theme_support_access'] ) ) {
							unset( $blog_settings->option_value['theme_support_access'] );
							$changes_opt = true;
						}

						// Inline CSS rules home page.
						if ( isset( $blog_settings->option_value['css_critical_home'] ) ) {
							unset( $blog_settings->option_value['css_critical_home'] );
							$changes_opt = true;
						}

						// Inline CSS rules object page.
						if ( isset( $blog_settings->option_value['css_critical_object'] ) ) {
							unset( $blog_settings->option_value['css_critical_object'] );
							$changes_opt = true;
						}

						// Inline CSS rules search page.
						if ( isset( $blog_settings->option_value['css_critical_search'] ) ) {
							unset( $blog_settings->option_value['css_critical_search'] );
							$changes_opt = true;
						}

						if ( $changes_opt ) {

							$update_args = [
								'option_value' => serialize( $blog_settings->option_value ),
							];

							$wpdb->update(
								$table->messia,
								$update_args,
								[
									'option_id' => $blog_settings->option_id,
								]
							);
						}
						break;

					case "{$this->transport_prefix}posts":
						// Exception - replace GUIDs.
						$wpdb->query(
							"UPDATE
								{$table->messia}
							SET
								guid = REPLACE (guid, '{$host}', '{$this->transport_host}')
							WHERE
								post_type = 'attachment'
								OR post_type = 'customize_changeset'
								OR post_type = 'messia_object'
								OR post_type = 'nav_menu_item'
								OR post_type = 'post'
								OR post_type = 'wp_global_styles'"
						);

						// Exception - delete all kinds of revisions.
						$wpdb->query(
							"DELETE FROM {$table->messia}
							WHERE post_type = 'revision'"
						);
						break;

					case "{$this->transport_prefix}comments":
						// Anonymize all commenters data.
						$wpdb->query(
							"UPDATE
								{$table->messia}
							SET
								comment_author_IP = '127.0.0.1'"
						);

						// Anonymize non-anonymous commenters data (will be fullfilled with user data who run import).
						$wpdb->query(
							"UPDATE
								{$table->messia}
							SET
								comment_author = 'messia',
								comment_author_email = 'support@messiawp.com',
								comment_author_url = NULL
							WHERE
								user_id <> 0"
						);
						break;
				}

				if ( 1 === $i ) {
					$written = fwrite( $sql_dump_handle, $dump_prepend );

					if ( false === $written ) {
						fclose( $sql_dump_handle );
						throw new Exception( __( 'Error writing into temporary dump file.', 'messia' ) );
					}
				}

				$written = fwrite( $sql_dump_handle, $this->get_dump_text( $table->messia ) );

				if ( false === $written ) {
					fclose( $sql_dump_handle );
					throw new Exception( __( 'Error writing into temporary dump file.', 'messia' ) );
				}

				++$i;
			}

			$written = fwrite( $sql_dump_handle, $dump_append );

			if ( false === $written ) {
				fclose( $sql_dump_handle );
				throw new Exception( __( 'Error writing into temporary dump file.', 'messia' ) );
			}

			fclose( $sql_dump_handle );

			// ZIP Dump.
			$backup_name = str_replace( ' ', '-', get_bloginfo( 'name' ) ) . '-' . DB_NAME . '_db_[' . gmdate( 'd-m-Y H-i-s' ) . ']';

			$wp_filesystem->mkdir( $backup_path );
			$wp_filesystem->delete( "{$backup_path}/{$backup_name}.zip", true, 'f' );

			$zip = new ZipArchive();
			$zip->open( "{$backup_path}/{$backup_name}.zip", ZipArchive::CREATE | ZIPARCHIVE::OVERWRITE );
			$zip->addFile( $sql_dump, 'db.sql' );

			$this->add_zip_comment( $zip );

			// $this->add_uploads_data_files( $zip );
			$this->add_uploads_data_db( $zip );

			$zip->close();

			$this->drop_transport_tables( array_column( (array) $tables, 'messia' ) );
			$wp_filesystem->rmdir( $sql_dump, true );

		} catch ( Exception $e ) {
			// Rollback tables.
			$this->drop_transport_tables( array_column( (array) $tables, 'messia' ) );
			$wp_filesystem->rmdir( $sql_dump, true );
			throw new Exception( $e->getMessage() );
		}

		// phpcs:enable WordPress.WP.AlternativeFunctions.file_system_read_fopen
		// phpcs:enable WordPress.WP.AlternativeFunctions.file_system_read_fwrite
		// phpcs:enable WordPress.WP.AlternativeFunctions.file_system_read_fclose
	}

	/**
	 * Adds specific data as comment to ZIP.
	 *
	 * @param ZipArchive $zip Zip object.
	 *
	 * @return void
	 */
	public function add_zip_comment( ZipArchive $zip ): void {

		global $wp_version;

		$theme_version = ( wp_get_theme()->parent() ) ? wp_get_theme()->parent()->get( 'Version' ) : wp_get_theme()->get( 'Version' );

		$zip->setArchiveComment(
			implode(
				"\n",
				[
					'Package: ' . MESSIA_DEMO_PACKAGE_COMMENT,
					'Demo Name: Estate',
					'Author: Outcomer',
					'Author URI: 4341922.com',
					'Author mail: 4341922@gmail.com',
					'Description: Universal listing engine',
					"Messia version: {$theme_version}",
					"WP version: {$wp_version}",
					'Version: 1.0.0',
					'',
					'License: GNU General Public License v3.0',
					'License URI: http://www.gnu.org/licenses/gpl-3.0.html',
					'',
					'Tags: listing, directory',
				]
			)
		);
	}

	/**
	 * Executes SQL script that expected to make import DB.
	 *
	 * @param string $sql_file Absolute path to restorring zip file with data.
	 *
	 * @throws Exception On any unexpected scenario.
	 *
	 * @return void
	 */
	public function restore_db( string $sql_file ): void {

		global $wpdb;
		global $wp_filesystem;

		$site_url = wp_parse_url( get_site_url() );
		$host     = $site_url['host'];
		$temp_dir = tempnam( sys_get_temp_dir(), 'msr' );

		WP_Filesystem();

		$wp_filesystem->rmdir( $temp_dir, true ); // will delete temp file too.
		$wp_filesystem->mkdir( $temp_dir );

		unzip_file( $sql_file, $temp_dir );

		$sql_content      = $wp_filesystem->get_contents( "{$temp_dir}/db.sql" );
		$transport_tables = [];

		// Save user data state for future using.
		$site_data = $this->get_site_data();

		// Start restoration.
		try {

			if ( false === $sql_content ) {
				throw new Exception( __( 'Can\'t find demo data on the server.', 'messia' ) );
			}

			preg_match_all( '/CREATE.*?TABLE.*?\`(.*?)\`/', "\n" . $sql_content, $transport_tables );
			$sql_content = preg_replace( "/{$this->transport_host}/m", $host, $sql_content );

			foreach ( $transport_tables[1] as $transport_table ) {
				$table_status = $this->get_table_status( $transport_table );

				if ( ! is_null( $table_status ) && ! $table_status->is_transport_table ) {
					// translators: %s - MySQL table name.
					throw new Exception( sprintf( __( 'Can not create table "%s" - table already exist.', 'messia' ), $transport_table ) );
				}
				$wpdb->query( "DROP TABLE IF EXISTS `$transport_table`" );
			}

			$wpdb->query( 'SET foreign_key_checks = 1' );
			$wpdb->query( "SET NAMES 'utf8'" );

			$templine  = '';
			$all_lines = explode( "\n", $sql_content );

			$wpdb->query( 'SET autocommit = OFF' );
			$wpdb->query( 'START TRANSACTION' );

			foreach ( $all_lines as $line ) {

				if ( '--' !== substr( $line, 0, 2 ) && '' !== $line ) {
					$templine .= $line; // if it is not a comment.. Add this line to the current segment.

					if ( ';' === substr( trim( $line ), -1, 1 ) ) { // If it has a semicolon at the end, it's the end of the query.

						if ( false === $wpdb->query( trim( $templine ) ) ) { // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
							$errs[] = $wpdb->last_error;
						}
						$templine = ''; // set variable to empty, to start picking up the lines after ";".
					}
				}
			}
			$wpdb->query( 'COMMIT' );
			$wpdb->query( 'SET autocommit = ON' );

			// At this moment new data are in new transport tables.
			// Corresponding tables should be deleted and transport renamed to corresponding.
			$this->replace_tables( $transport_tables[1] );

			// Clean ourself.
			$this->drop_transport_tables( $transport_tables[1] );

			// Exceptions.
			$wpdb->query( "UPDATE {$wpdb->options} SET option_name = replace(option_name, '{$this->transport_prefix}user_roles', '{$wpdb->prefix}user_roles')" );

			// UPLOADS.
			$this->restore_uploads( $wp_filesystem, "{$temp_dir}/uploads" );

			// Final.
			$wp_filesystem->rmdir( $temp_dir, true );

			// Restore site data.
			$this->set_site_data( $site_data );

			// Assign posts and comments to the current user.
			$this->update_user_data( $wpdb, $site_data );

			// Set initial values for some options.
			$this->update_blog_settings();

			// Validate plugins.
			$this->set_plugins();

			// Update permalinks.
			flush_rewrite_rules();

		} catch ( Exception $e ) {

			$wpdb->query( 'ROLLBACK' );
			$wpdb->query( 'SET autocommit = ON' );
			$this->drop_transport_tables( $transport_tables[1] );

			$wp_filesystem->rmdir( $temp_dir, true );
			throw new Exception( $e->getMessage() );
		}
	}

	/**
	 * Drop tables created on dump or restore DB.
	 *
	 * @param array $tables Tables to drop.
	 *
	 * @return void
	 */
	private function drop_transport_tables( array $tables ): void {
		global $wpdb;

		foreach ( $tables as $table ) {
			$table_status = $this->get_table_status( $table );
			if ( is_null( $table_status ) ) {
				continue;
			}
			if ( $table_status->is_transport_table ) {
				$wpdb->query( "DROP TABLE {$table}" );
			}
		}
	}

	/**
	 * Build SQL dump.
	 *
	 * @param array<int, string> $table Table to dump.
	 *
	 * @return string
	 */
	private function get_dump_text( $table ): string {

		global $wpdb;

		$content       = null;
		$result        = $wpdb->get_results( "SELECT * FROM {$table}", ARRAY_A );
		$fields_amount = $wpdb->dbh->field_count;
		$rows_num      = $wpdb->dbh->affected_rows;
		$create_table  = $wpdb->get_var( "SHOW CREATE TABLE {$table}", 1 );
		$content      .= "\n\n" . $create_table . ";\n\n";

		for ( $i = 0, $st_counter = 0; $i < $fields_amount; $i++, $st_counter = 0 ) {

			foreach ( $result as $row ) {

				$row = array_values( $row );

				if ( 0 === $st_counter % 100 || 0 === $st_counter ) {
					$content .= "\nINSERT INTO " . $table . ' VALUES';
				}
				$content .= "\n(";

				for ( $j = 0; $j < $fields_amount; $j++ ) {

					$row_value = ( is_null( $row[ $j ] ) ) ? $row[ $j ] : addslashes( $row[ $j ] );
					$row[ $j ] = str_replace( "\n", "\\n", (string) $row_value );

					if ( isset( $row[ $j ] ) ) {
						$content .= '"' . $row[ $j ] . '"';
					} else {
						$content .= '""';
					}

					if ( $j < ( $fields_amount - 1 ) ) {
						$content .= ',';
					}
				}

				$content .= ')';

				// every after 100 command cycle [or at last line] ....p.s. but should be inserted 1 cycle eariler.
				if ( ( 0 === ( $st_counter + 1 ) % 100 && 0 !== $st_counter ) || $rows_num === $st_counter + 1 ) {
					$content .= ';';
				} else {
					$content .= ',';
				}

				++$st_counter;
				array_shift( $result );
			}
		}
		$content .= "\n\n\n";

		return $content;
	}

	/**
	 * Return MySQL table information
	 *
	 * @param string $table_name Table name.
	 *
	 * @return stdClass
	 */
	private function get_table_status( string $table_name ): ?stdClass {

		global $wpdb;

		$table = $wpdb->get_row( "SHOW TABLE STATUS WHERE Name='{$table_name}';" );

		if ( is_null( $table ) ) {
			return $table;
		}

		$table->is_transport_table = false;

		if ( $this->transport_comment === $table->Comment ) {
			$table->is_transport_table = true;
		}
		return $table;
	}

	/**
	 * Replace target tables with transort ones
	 * after them filled with imported content.
	 *
	 * @param array $transport_tables Array of tables to replace original by.
	 *              Example: drop wp_posts, rename wpprfx->posts -> wp_posts.
	 *
	 * @throws Exception On renaming tables if source table was not found.
	 *
	 * @return void
	 */
	private function replace_tables( array $transport_tables ): void {

		global $wpdb;

		// Drop target tables and rename transport ones to target names.
		foreach ( $transport_tables as $table ) {

			$exists = $wpdb->get_var( $wpdb->prepare( 'SHOW TABLES LIKE %s', $table ) ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

			if ( is_null( $exists ) ) {
				// translators: %s - MySQL table name.
				throw new Exception( sprintf( __( 'Table "%s" for renaming does not exist.', 'messia' ), $table ) );
			}

			$drop_name = preg_replace( "/^{$this->transport_prefix}/m", "$1{$wpdb->prefix}", $table );
			$wpdb->query( "DROP TABLE IF EXISTS `$drop_name`" );
			$wpdb->query( "RENAME TABLE `$table` TO `$drop_name`" );
			$wpdb->query( "ALTER TABLE {$drop_name} COMMENT = '';" );
		}
	}

	/**
	 * Get current user data to restore it
	 * after dump and log user back
	 *
	 * @return array user sensitive options
	 */
	private function get_site_data(): array {

		$return = [
			'options'        => [
				'siteurl'                       => get_option( 'siteurl' ),
				'home'                          => get_option( 'home' ),
				'blogname'                      => get_option( 'blogname' ),
				'blogdescription'               => get_option( 'blogdescription' ),
				'blog_public'                   => get_option( 'blog_public' ),
				'plugins'                       => get_option( 'active_plugins' ),
				'stylesheet'                    => get_option( 'stylesheet' ),
				'db_version'                    => get_option( 'db_version' ),
				'initial_db_version'            => get_option( 'initial_db_version' ),
				'recovery_keys'                 => get_option( 'recovery_keys' ),
				'recovery_mode_email_last_sent' => get_option( 'recovery_mode_email_last_sent' ),
				'wpmtst_db_version'             => get_option( 'wpmtst_db_version' ),
				'duplicate_post_version'        => get_option( 'duplicate_post_version' ),
				'cron'                          => get_option( 'cron' ),
			],
			'options_site'   => [
				'auth_key'       => get_site_option( 'auth_key' ),
				'logged_in_key'  => get_site_option( 'logged_in_key' ),
				'nonce_key'      => get_site_option( 'nonce_key' ),
				'auth_salt'      => get_site_option( 'auth_salt' ),
				'logged_in_salt' => get_site_option( 'logged_in_salt' ),
				'nonce_salt'     => get_site_option( 'nonce_salt' ),
			],
			'transient'      => [
				'update_core' => get_transient( 'update_core' ),
			],
			'transient_site' => [],
			'params'         => [
				'user'         => wp_get_current_user(),
				'curr_s_token' => wp_get_session_token(),
				'user_meta'    => get_user_meta( wp_get_current_user()->ID, 'session_tokens', true ),
			],
		];
		return $return;
	}

	/**
	 * Set user data grabbed before dump restore
	 *
	 * @param array $data User data grabbed with $this->get_site_data().
	 *
	 * @return void
	 */
	private function set_site_data( array $data ): void {

		wp_cache_flush();

		foreach ( $data['options_site'] as $option_name => $option_value ) {
			update_site_option( $option_name, $option_value );
		}

		foreach ( $data['options'] as $option_name => $option_value ) {
			update_option( $option_name, $option_value );
		}

		foreach ( $data['transient'] as $option_name => $option_value ) {
			set_transient( $option_name, $option_value );
		}

		foreach ( $data['options']['plugins'] as $plugin ) {
			activate_plugin( WP_PLUGIN_DIR . '/' . $plugin, '', false, false );
		}

		update_user_meta( $data['params']['user']->ID, 'session_tokens', $data['params']['user_meta'] );

		wp_clear_auth_cookie();
		wp_set_auth_cookie( $data['params']['user']->ID, false, is_ssl(), $data['params']['curr_s_token'] );
		wp_signon(
			[
				'user_login'    => $data['params']['user']->data->user_login,
				'user_password' => $data['params']['user']->data->user_pass,
			]
		);
	}

	/**
	 * Update some private sensitive infomation.
	 *
	 * @param wpdb  $db_connection DB connection provider instance class.
	 * @param array $data          User data grabbed with $this->get_site_data() before DB restorred.
	 *
	 * @return void
	 */
	private function update_user_data( wpdb $db_connection, array $data ): void {

		// Set posts author to the current user for every post.
		$db_connection->query( "UPDATE {$db_connection->posts} SET post_author = {$data['params']['user']->ID}" );

		// Set comments data to the current user for every non-anonymous comment.
		$db_connection->query(
			"UPDATE
				{$db_connection->comments}
			SET
				user_id = {$data['params']['user']->ID},
				comment_author = '{$data['params']['user']->data->display_name}',
				comment_author_email = '{$data['params']['user']->data->user_email}',
				comment_author_url = '{$data['params']['user']->data->user_url}',
				comment_author_IP = '{$_SERVER['REMOTE_ADDR']}'
			WHERE
				user_id <> 0"
		);
	}

	/**
	 * Revert some settings to init state.
	 *
	 * @return void
	 */
	private function update_blog_settings(): void {

		$settings = MIA()->get_module( 'settings' );
		$settings->set_shared_settings( MESSIA_THEME_BLOG_SETTINGS_PRESET_NAME, MESSIA_THEME_SITE_SETTINGS_PRESET_NAME, [ 'pwa_enable' => 0 ] );
	}

	/**
	 * Deactivate plugins that does not exists on target site.
	 * Donor site may have some but target - no
	 *
	 * @return void
	 */
	private function set_plugins() {
		$update  = false;
		$plugins = get_option( 'active_plugins' );

		foreach ( $plugins as $index => $plugin_path ) {
			if ( file_exists( WP_PLUGIN_DIR . "/{$plugin_path}" ) ) {
				continue;
			}
			unset( $plugins[ $index ] );
			$update = true;
		}

		if ( true === $update ) {
			$plugins = array_values( $plugins );
			update_option( 'active_plugins', $plugins );
		}
	}

	/**
	 * Add to ZIP site uploads based on info from Uploads dir content
	 *
	 * @param ZipArchive $zip zipping dump.
	 *
	 * @return void
	 */
	private function add_uploads_data_files( ZipArchive &$zip ): void {

		$uploads = wp_upload_dir();
		$source  = $uploads['basedir'];
		$source  = str_replace( [ '\\' ], '/', $uploads['basedir'] );

		$uploads_name = basename( $source );

		if ( is_dir( $source ) ) {

			$iterator = new RecursiveDirectoryIterator( $source, FilesystemIterator::SKIP_DOTS | FilesystemIterator::UNIX_PATHS );
			$files    = new RecursiveIteratorIterator( $iterator, RecursiveIteratorIterator::SELF_FIRST );

			foreach ( $files as $file ) {

				if ( is_dir( $file ) && strpos( $file, $uploads_name ) ) {

					$dir = str_replace( $source, '', $file );
					$dir = str_replace( [ '\\' ], '/', $dir );
					$zip->addEmptyDir( 'uploads' . $dir );

				} elseif ( is_file( $file ) ) {

					$path = 'uploads' . str_replace( $source, '', $file );
					$path = str_replace( [ '\\' ], '/', $path );
					$zip->addFile( $file, $path );
				}
			}
		} elseif ( is_file( $source ) ) {

			$zip->addFile( $source );
		}
	}

	/**
	 * Add to ZIP site uploads based on info from DB
	 *
	 * @param ZipArchive $zip zipping dump.
	 *
	 * @return  void
	 */
	private function add_uploads_data_db( ZipArchive &$zip ): void {

		global $wpdb;

		$files_disk = [];
		$files_db   = $wpdb->get_col( "SELECT ID from {$this->transport_prefix}posts WHERE post_type = 'attachment'" );

		foreach ( $files_db as $file_db ) {

			$paths = [];
			$main  = get_post_meta( (int) $file_db, '_wp_attached_file', true );
			$meta  = wp_get_attachment_metadata( (int) $file_db );

			if ( ! $main ) {
				continue;
			}
			$base = trim( dirname( $main ), '.' );
			$path = $this->get_attached_file( $main );

			if ( false === $path ) {
				continue;
			}

			$paths[] = $path;

			if ( ! empty( $meta ) && ! is_null( $meta ) && false !== $meta ) {

				if ( isset( $meta['sizes'] ) ) {
					foreach ( $meta['sizes'] as $size ) {
						$name = basename( $size['file'] );
						$path = "{$base}/{$name}";
						$path = $this->get_attached_file( $path );

						if ( false === $path ) {
							continue;
						}

						$paths[] = $path;
					}
				}
			}

			foreach ( $paths as $path ) {
				if ( file_exists( $path ) ) {

					$disk_path    = str_replace( [ '\\' ], '/', $path );
					$files_disk[] = $disk_path;
				}
			}
		}

		$uploads = wp_upload_dir();
		$source  = $uploads['basedir'];
		$source  = str_replace( [ '\\' ], '/', $uploads['basedir'] );
		$zip->addEmptyDir( 'uploads' );

		$uploads_name = basename( $source );

		if ( is_dir( $source ) ) {

			foreach ( $files_disk as $file ) {

				if ( is_dir( $file ) && strpos( $file, $uploads_name ) ) {

					$dir = str_replace( $source, '', $file );
					$zip->addEmptyDir( 'uploads' . $dir );

				} elseif ( is_file( $file ) ) {

					$path = 'uploads' . str_replace( $source, '', $file );
					$zip->addFile( $file, $path );
				}
			}
		} elseif ( is_file( $source ) ) {

			$zip->addFile( $source );
		}
	}

	/**
	 * Restore uploads from zip to file system
	 *
	 * @param WP_Filesystem_Direct $wp_filesystem instance of WP filesystem.
	 * @param string               $source        where to search for files to restore.
	 *
	 * @throws Exception On source folder not found or does not exist.
	 *
	 * @return void
	 */
	private function restore_uploads( WP_Filesystem_Direct $wp_filesystem, string $source ): void {

		$uploads = wp_upload_dir();
		$dest    = $uploads['basedir'];

		$preserved_folders = [
			'sites',
		];

		$preserved_files = [];

		if ( ! is_dir( $source ) ) {
			// translators: %s - path to folder.
			throw new Exception( sprintf( __( 'Source directory "%s" to restore uploads from does not exists.', 'messia' ), $source ) );
		}

		/*
		Off now
		if ( defined( 'MESSIA_CREATE_DEMO' ) && true === MESSIA_CREATE_DEMO ) {
			$dest .= '_restored';
		}
		*/

		if ( is_multisite() ) {
			$dest_content = scandir( $dest );
			$dest_content = array_values( array_diff( $dest_content, [ '..', '.' ] ) );

			foreach ( $dest_content as $item ) {
				$item_path = "{$dest}/{$item}";

				if ( is_dir( $item_path ) && in_array( $item, $preserved_folders, true ) ) {
					continue;
				}

				if ( is_file( $item_path ) && in_array( $item, $preserved_files, true ) ) {
					continue;
				}

				if ( is_dir( $item_path ) ) {
					$wp_filesystem->delete( $item_path, true, 'd' );
				}

				if ( is_file( $item_path ) ) {
					$wp_filesystem->delete( $item_path, true, 'f' );
				}
			}
		} else {
			$wp_filesystem->delete( $dest, true, 'd' );
			$wp_filesystem->mkdir( $dest );
		}

		$iterator = new RecursiveIteratorIterator( new RecursiveDirectoryIterator( $source, RecursiveDirectoryIterator::SKIP_DOTS ), RecursiveIteratorIterator::SELF_FIRST );

		foreach ( $iterator as $item ) {

			if ( $item->isDir() ) {

				$wp_filesystem->mkdir( $dest . '/' . $iterator->getSubPathName() );

			} else {

				$wp_filesystem->copy( $item, $dest . '/' . $iterator->getSubPathName() );
			}
		}
	}

	/**
	 * Retrieve attached file path based on attachment path relative to uploads dir.
	 *
	 * @param string $file Attachment path.
	 *
	 * @return string|bool The file path to where the attached file should be, false otherwise.
	 */
	private function get_attached_file( string $file ) {

		$path = false;
		// If the file is relative, prepend upload dir.
		if ( $file && 0 !== strpos( $file, '/' ) && ! preg_match( '|^.:\\\|', $file ) ) {
			$uploads = wp_get_upload_dir();
			if ( false === $uploads['error'] ) {
				$path = $uploads['basedir'] . "/$file";
			}
		}

		return $path;
	}
}
