<?php
/**
 * AquaVerify Theme Functions
 *
 * @package AquaVerify
 */

if ( ! defined( 'AQUAVERIFY_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( 'AQUAVERIFY_VERSION', '1.0.0' );
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 */
function aquaverify_setup() {
	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	// Let WordPress manage the document title.
	add_theme_support( 'title-tag' );

	// Enable support for Post Thumbnails on posts and pages.
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location (header).
	register_nav_menus(
		array(
			'primary' => esc_html__( 'Primary Menu', 'aquaverify' ),
			'footer'  => esc_html__( 'Footer Menu', 'aquaverify' ),
		)
	);

	// Add theme support for HTML5 markup.
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);
	
	// Add support for Elementor
    add_theme_support( 'elementor' );
}
add_action( 'after_setup_theme', 'aquaverify_setup' );


/**
 * Enqueue scripts and styles.
 */
function aquaverify_scripts() {
	// Enqueue the compiled Tailwind CSS file
	wp_enqueue_style( 'aquaverify-tailwind', get_template_directory_uri() . '/assets/css/style.css', array(), AQUAVERIFY_VERSION );

	// Enqueue the main style.css (required by WordPress, though it may just hold metadata)
	wp_enqueue_style( 'aquaverify-style', get_stylesheet_uri(), array(), AQUAVERIFY_VERSION );

    // Optional: Add custom JS if needed later
	// wp_enqueue_script( 'aquaverify-navigation', get_template_directory_uri() . '/assets/js/navigation.js', array(), AQUAVERIFY_VERSION, true );
}
add_action( 'wp_enqueue_scripts', 'aquaverify_scripts' );

/**
 * Register Widget Areas for the Footer
 */
function aquaverify_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Footer Column 1', 'aquaverify' ),
			'id'            => 'footer-1',
			'description'   => esc_html__( 'Add widgets here.', 'aquaverify' ),
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h3 class="widget-title text-sm font-semibold text-aqua-dark uppercase tracking-wider mb-4">',
			'after_title'   => '</h3>',
		)
	);
	// Repeat for footer-2, footer-3, etc. if needed
}
add_action( 'widgets_init', 'aquaverify_widgets_init' );
