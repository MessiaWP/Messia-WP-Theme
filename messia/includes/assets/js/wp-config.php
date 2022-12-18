<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'vh511966_demo_messiawp');

/** MySQL database username */
define('DB_USER', 'vh511966_4341922z');

/** MySQL database password */
define('DB_PASSWORD', 'R4DLbPGS');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         ')HK)oGc!k(TaOaxTuv(f77CpuAdoDqZD^qaf@F*3ZjHKDMRx^9W4Xal@VozpD7Up');
define('SECURE_AUTH_KEY',  'Oy0^131BZM)O6#J0Iz6sq&&bZn#@W6x%Qlj@QWW^YAoRHE4*i9u9993d3SlRC#aL');
define('LOGGED_IN_KEY',    '4a497gGMJ4KPGEa&2za4!f9u(UXMMX*QvKgQ9HPlkbuM1cHbmDe2x!#ANEyvNB7v');
define('NONCE_KEY',        'XLh8tVQD6D1MLopnNfH8(Hz2uuQxijj#zPurLZ2RcBBX0R)Oy4*zUcKjPs2cqHhP');
define('AUTH_SALT',        'wj&A7Zf&^0a^O%G7na11gg1GVo2Rk5xHvrCKFmVN3!(63d0fI8!KGTSK9)CkDUwH');
define('SECURE_AUTH_SALT', '6!oK)kh&k&6OZbVSon%sa!Bux%fxQcD41XjTNgdCOL6a)8kRJ#i06ro@bjiR!O#v');
define('LOGGED_IN_SALT',   '72z#IVtkI0mEkU3Sx46Yesb%X*u&(yzoh&myKl@1j5mP7Z(C9USwYBfApH^8ao3@');
define('NONCE_SALT',       '44i50eKh!U!10(ZAd)7NZ7gc!a%p#z*aqVbZOl#lCiPlOPy8*)9YbQS@Fgvyq(Is');
/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', true );
define( 'WP_POST_REVISIONS', 10 );

define( 'SCRIPT_DEBUG', false );
define( 'MESSIA_CREATE_DEMO', true );

/** Сеть */
define( 'WP_ALLOW_MULTISITE', true);

define( 'MULTISITE', true );
define( 'SUBDOMAIN_INSTALL', false );
define( 'DOMAIN_CURRENT_SITE', 'demo.messiawp.com' );
define( 'PATH_CURRENT_SITE', '/' );
define( 'SITE_ID_CURRENT_SITE', 1 );
define( 'BLOG_ID_CURRENT_SITE', 1 );

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
