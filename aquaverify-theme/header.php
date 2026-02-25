<!DOCTYPE html>
<html <?php language_attributes(); ?> class="scroll-smooth scroll-pt-28">
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">

    <!-- Embedded SVG Favicon (Fallback if WP Site Icon isn't set) -->
    <?php if ( ! has_site_icon() ) : ?>
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%230A4F7D'/%3E%3Cstop offset='1' stop-color='%2300AEEF'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M100 20c0 0-60 60-60 100 0 33.14 26.86 60 60 60s60-26.86 60-60c0-40-60-100-60-100z' fill='url(%23a)'/%3E%3Cpath d='M70 115l20 20 40-40' fill='none' stroke='%23fff' stroke-width='12' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E" />
    <?php endif; ?>

    <!-- Google Fonts: Montserrat (Headers) & Inter (Body) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Montserrat:wght@500;600;700;800&display=swap" rel="stylesheet">

    <!-- Tailwind Play CDN (For Development/Fallback) -->
    <!-- The theme enqueues a compiled style.css, but this ensures JS-driven classes or Elementor overrides work -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              primary: '#0A4F7D', // Deep Blue
              secondary: '#00AEEF', // Tech Cyan
              surface: '#F4F7F9', // Tech Gray
              text: '#333333',
            },
            fontFamily: {
              sans: ['Inter', 'sans-serif'],
              heading: ['Montserrat', 'sans-serif'],
            },
            boxShadow: {
              'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
            }
          }
        }
      }
    </script>
    
    <!-- 3D Globe Dependencies -->
    <script src="//unpkg.com/three"></script>
    <script src="//unpkg.com/globe.gl"></script>

    <?php wp_head(); ?>
</head>

<body <?php body_class( 'bg-white text-text antialiased' ); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site bg-white min-h-screen flex flex-col font-sans">
    
    <!-- HEADER NAV (Translated from components/Header.tsx) -->
    <header class="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-surface shadow-sm transition-all duration-300">
        <div class="container mx-auto px-4 md:px-6">
            <div class="flex items-center justify-between h-20">
                <!-- Logo -->
                <div class="flex-shrink-0 flex items-center gap-2">
                    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="flex items-center gap-2 group">
                        <div class="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                        </div>
                        <span class="font-heading font-bold text-xl text-primary tracking-tight">AquaVerify</span>
                    </a>
                </div>

                <!-- Desktop Menu -->
                <nav class="hidden md:flex space-x-8 items-center">
                    <?php
                    // Primary Navigation
                    wp_nav_menu(
                        array(
                            'theme_location'  => 'primary',
                            'menu_class'      => 'flex space-x-8 items-center m-0 p-0 list-none',
                            'container'       => false,
                            'fallback_cb'     => false,
                            'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
                            'link_before'     => '<span class="text-text hover:text-primary font-medium transition-colors">',
                            'link_after'      => '</span>',
                        )
                    );
                    ?>

                    <!-- Call to Action -->
                    <a href="#demo" class="ml-4 bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                        <?php esc_html_e( 'Request Demo', 'aquaverify' ); ?>
                    </a>
                </nav>

                <!-- Mobile menu button (Simplified for WP structure, requires custom JS to toggle) -->
                <div class="md:hidden flex items-center">
                    <button id="mobile-menu-btn" class="text-text hover:text-primary p-2 focus:outline-none">
                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Menu Panel (Hidden by default) -->
        <div id="mobile-menu-panel" class="md:hidden hidden bg-white border-t border-surface absolute w-full shadow-lg">
            <div class="px-4 py-6 space-y-4">
                <?php
                wp_nav_menu(
                    array(
                        'theme_location'  => 'primary',
                        'menu_class'      => 'space-y-4 m-0 p-0 list-none',
                        'container'       => false,
                        'fallback_cb'     => false,
                        'link_before'     => '<span class="block px-3 py-2 text-text hover:text-primary hover:bg-surface rounded-md font-medium">',
                        'link_after'      => '</span>',
                    )
                );
                ?>
                <div class="pt-4 border-t border-surface">
                    <a href="#demo" class="block w-full text-center bg-primary text-white px-6 py-3 rounded-xl font-medium shadow-md">
                        <?php esc_html_e( 'Request Demo', 'aquaverify' ); ?>
                    </a>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content Area begins -->
    <main id="primary" class="site-main flex-grow pt-20">
