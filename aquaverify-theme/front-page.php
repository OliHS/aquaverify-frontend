<?php
/**
 * The template for displaying the front page
 *
 * @package AquaVerify
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">

            <?php
            while ( have_posts() ) :
                the_post();
                the_content();
            endwhile;
            ?>

            <!-- Hero Section (Translated from components/Hero.tsx) -->
            <section class="relative pt-24 min-h-[90vh] flex flex-col lg:flex-row overflow-hidden">
                
                <!-- Left: Biotech / Physical World -->
                <div class="lg:w-1/2 bg-primary text-white px-8 lg:px-20 py-20 flex flex-col justify-center relative">
                    <div class="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="absolute -left-20 top-20 w-96 h-96">
                            <path fill="#FFFFFF" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,70.6,32.2C59,42.9,47.1,51.4,34.8,58.8C22.5,66.2,9.8,72.5,-3.6,78.7C-17,84.9,-31.1,91,-44.5,84.8C-57.9,78.6,-70.6,60.1,-77.8,41.2C-85,22.3,-86.7,3,-81.7,-13.6C-76.7,-30.2,-65,-44.1,-52.1,-51.7C-39.2,-59.3,-25.1,-60.6,-11.5,-60.8C2.1,-61,15.7,-60.1,30.5,-83.6" transform="translate(100 100)" />
                        </svg>
                    </div>

                    <div class="relative z-10 max-w-xl">
                        <div class="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full mb-6 backdrop-blur-sm border border-white/20">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-secondary"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                            <span class="text-sm font-medium tracking-wide"><?php esc_html_e( 'The Dual Standard', 'aquaverify' ); ?></span>
                        </div>

                        <h1 class="font-heading font-extrabold text-4xl lg:text-6xl leading-tight mb-6 [&_span]:text-secondary [&_p]:m-0">
                            <?php 
                            // Translators can include HTML tags like <span class="text-secondary"> in Polylang 
                            echo wp_kses_post( __( 'Science you can trust.<br><span class="text-secondary">Water you can verify</span>.', 'aquaverify' ) ); 
                            ?>
                        </h1>

                        <div class="text-lg text-gray-200 mb-10 leading-relaxed font-light [&_p]:mb-4 last:[&_p]:mb-0">
                            <?php 
                            echo wp_kses_post( __( 'AquaVerify bridges the gap between physical water analysis and digital truth. From our advanced biotech consumable kits to our immutable cloud platform, we deliver the world\'s most reliable decentralized water quality data.', 'aquaverify' ) ); 
                            ?>
                        </div>

                        <div class="flex flex-col sm:flex-row gap-4">
                            <button class="bg-secondary text-white px-8 py-3 rounded hover:bg-white hover:text-primary transition-all font-semibold shadow-lg flex items-center justify-center group">
                                <?php esc_html_e( 'Explore Solutions', 'aquaverify' ); ?>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </button>
                            <button class="px-8 py-3 rounded border border-white/30 hover:bg-white/10 transition-all font-semibold text-white">
                                <?php esc_html_e( 'See The Data', 'aquaverify' ); ?>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Right: Digital / SaaS World -->
                <div class="lg:w-1/2 bg-surface px-8 lg:px-20 py-20 flex flex-col justify-center relative">
                    <div class="absolute top-10 right-10 opacity-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
                    </div>

                    <div class="relative z-10 w-full max-w-xl mx-auto">
                        <div class="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                            <div class="bg-gray-50 border-b border-gray-100 p-4 flex items-center space-x-2">
                                <div class="w-3 h-3 rounded-full bg-red-400"></div>
                                <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div class="w-3 h-3 rounded-full bg-green-400"></div>
                                <div class="ml-4 text-xs text-gray-400 font-mono">dashboard.aquaverify.cloud</div>
                            </div>
                            <div class="p-0">
                                <img src="https://picsum.photos/800/600?random=1" alt="AquaVerify LIMS dashboard" class="w-full h-auto object-cover block" />
                            </div>
                        </div>

                        <div class="mt-8 text-right lg:text-left">
                            <h2 class="text-2xl font-heading font-bold text-primary mb-2">
                                <?php esc_html_e( 'Immutable LIMS Platform', 'aquaverify' ); ?>
                            </h2>
                            <p class="text-gray-600">
                                <?php esc_html_e( 'Instant synchronization of test properties via Web3 technology ensuring zero manipulation.', 'aquaverify' ); ?>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Value Props Section (Translated from components/ValueProps.tsx) -->
            <section id="solutions" class="py-24 bg-white">
                <div class="container mx-auto px-6">
                    <div class="text-center max-w-3xl mx-auto mb-16">
                        <h2 class="font-heading font-bold text-3xl md:text-4xl text-primary mb-4">
                            <?php esc_html_e( 'End-to-End Water Quality Architecture', 'aquaverify' ); ?>
                        </h2>
                        <p class="text-gray-600 text-lg">
                            <?php esc_html_e( 'We provide the complete stack: from advanced microbiological testing kits to the secure cloud infrastructure that analyzes and stores your data.', 'aquaverify' ); ?>
                        </p>
                    </div>

                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="bg-surface p-8 rounded-xl border border-gray-100 hover:shadow-xl transition-all group">
                            <div class="text-secondary mb-6 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.31"></path><path d="M14 9.3V1.99"></path><path d="M8.5 2h7"></path><path d="M14 9.3a6.5 6.5 0 1 1-4 0"></path><path d="M5.52 16h12.96"></path></svg>
                            </div>
                            <h3 class="font-heading font-bold text-xl mb-3 text-primary"><?php esc_html_e( 'Biotech Testing Kits', 'aquaverify' ); ?></h3>
                            <p class="text-gray-600"><?php esc_html_e( 'Proprietary chromogenic media and hardware for rapid, highly precise microbial field testing.', 'aquaverify' ); ?></p>
                        </div>
                        <div class="bg-surface p-8 rounded-xl border border-gray-100 hover:shadow-xl transition-all group">
                            <div class="text-secondary mb-6 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path><polyline points="13 11 9 17 15 17 11 23"></polyline></svg>
                            </div>
                            <h3 class="font-heading font-bold text-xl mb-3 text-primary"><?php esc_html_e( 'Cloud LIMS Software', 'aquaverify' ); ?></h3>
                            <p class="text-gray-600"><?php esc_html_e( 'A powerful digital dashboard that ingests field data directly, ensuring rapid analysis and compliance tracking.', 'aquaverify' ); ?></p>
                        </div>
                        <div class="bg-surface p-8 rounded-xl border border-gray-100 hover:shadow-xl transition-all group">
                            <div class="text-secondary mb-6 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3"></path><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"></path><path d="m21 3 1 11h-2"></path><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"></path><path d="M3 4h8"></path></svg>
                            </div>
                            <h3 class="font-heading font-bold text-xl mb-3 text-primary"><?php esc_html_e( 'OEM & Integration', 'aquaverify' ); ?></h3>
                            <p class="text-gray-600"><?php esc_html_e( 'Seamlessly integrate our testing reagents and LIMS APIs into your company\'s existing product portfolio.', 'aquaverify' ); ?></p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Product Section (Missing from previous iteration) -->
            <section id="products" class="py-24 bg-surface relative overflow-hidden">
                <div class="container mx-auto px-6 relative z-10">
                    <div class="text-center max-w-3xl mx-auto mb-20">
                        <span class="text-secondary font-bold tracking-wider uppercase text-sm mb-2 block">
                            <?php esc_html_e( 'Product Catalog', 'aquaverify' ); ?>
                        </span>
                        <h2 class="font-heading font-bold text-4xl lg:text-5xl text-primary mb-6">
                            <?php esc_html_e( 'Scientific Solutions', 'aquaverify' ); ?>
                        </h2>
                        <p class="text-gray-600 text-lg leading-relaxed">
                            <?php esc_html_e( 'Explore our comprehensive range of high-precision water testing instruments and materials.', 'aquaverify' ); ?>
                        </p>
                    </div>

                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <!-- Equipment Family -->
                        <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-gray-100 cursor-pointer product-family-card" data-family="equipment">
                            <div class="w-14 h-14 bg-blue-50 text-secondary rounded-xl flex items-center justify-center mb-6">
                                <i data-lucide="settings-2" class="w-8 h-8"></i>
                            </div>
                            <h3 class="font-heading font-bold text-2xl text-gray-900 mb-3"><?php esc_html_e('Lab Equipment & Hardware', 'aquaverify'); ?></h3>
                            <p class="text-gray-600 text-sm mb-6"><?php esc_html_e('Hardware designed to automate workflows and minimize contamination risks.', 'aquaverify'); ?></p>
                            <span class="text-secondary font-bold flex items-center gap-2 text-sm">
                                <?php esc_html_e('View 6 Products', 'aquaverify'); ?> <i data-lucide="arrow-right" class="w-4 h-4"></i>
                            </span>
                        </div>
                        
                        <!-- Microbiology Family -->
                        <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-gray-100 cursor-pointer product-family-card" data-family="micro">
                            <div class="w-14 h-14 bg-blue-50 text-secondary rounded-xl flex items-center justify-center mb-6">
                                <i data-lucide="microscope" class="w-8 h-8"></i>
                            </div>
                            <h3 class="font-heading font-bold text-2xl text-gray-900 mb-3"><?php esc_html_e('Microbiology Kits', 'aquaverify'); ?></h3>
                            <p class="text-gray-600 text-sm mb-6"><?php esc_html_e('Rapid Chromogenic solutions for the detection of pathogens and indicator organisms.', 'aquaverify'); ?></p>
                            <span class="text-secondary font-bold flex items-center gap-2 text-sm">
                                <?php esc_html_e('View 8 Products', 'aquaverify'); ?> <i data-lucide="arrow-right" class="w-4 h-4"></i>
                            </span>
                        </div>

                         <!-- Media Family -->
                         <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-gray-100 cursor-pointer product-family-card" data-family="media">
                            <div class="w-14 h-14 bg-blue-50 text-secondary rounded-xl flex items-center justify-center mb-6">
                                <i data-lucide="flask-conical" class="w-8 h-8"></i>
                            </div>
                            <h3 class="font-heading font-bold text-2xl text-gray-900 mb-3"><?php esc_html_e('Culture Media & Reagents', 'aquaverify'); ?></h3>
                            <p class="text-gray-600 text-sm mb-6"><?php esc_html_e('Dehydrated and Ready-to-Use media formulations for diverse assays.', 'aquaverify'); ?></p>
                            <span class="text-secondary font-bold flex items-center gap-2 text-sm">
                                <?php esc_html_e('View 6 Products', 'aquaverify'); ?> <i data-lucide="arrow-right" class="w-4 h-4"></i>
                            </span>
                        </div>

                        <!-- Molecular Family -->
                        <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-gray-100 cursor-pointer product-family-card" data-family="molecular">
                            <div class="w-14 h-14 bg-blue-50 text-secondary rounded-xl flex items-center justify-center mb-6">
                                <i data-lucide="dna" class="w-8 h-8"></i>
                            </div>
                            <h3 class="font-heading font-bold text-2xl text-gray-900 mb-3"><?php esc_html_e('Molecular Biology', 'aquaverify'); ?></h3>
                            <p class="text-gray-600 text-sm mb-6"><?php esc_html_e('qPCR assays for high precision source tracking and immediate detection.', 'aquaverify'); ?></p>
                            <span class="text-secondary font-bold flex items-center gap-2 text-sm">
                                <?php esc_html_e('View 3 Products', 'aquaverify'); ?> <i data-lucide="arrow-right" class="w-4 h-4"></i>
                            </span>
                        </div>

                        <!-- Physchem Family -->
                        <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-gray-100 cursor-pointer product-family-card" data-family="physchem">
                            <div class="w-14 h-14 bg-blue-50 text-secondary rounded-xl flex items-center justify-center mb-6">
                                <i data-lucide="test-tube-2" class="w-8 h-8"></i>
                            </div>
                            <h3 class="font-heading font-bold text-2xl text-gray-900 mb-3"><?php esc_html_e('Physicochemical Analysis', 'aquaverify'); ?></h3>
                            <p class="text-gray-600 text-sm mb-6"><?php esc_html_e('Rapid chemical strips and sensory probes for field water quality data.', 'aquaverify'); ?></p>
                            <span class="text-secondary font-bold flex items-center gap-2 text-sm">
                                <?php esc_html_e('View 4 Products', 'aquaverify'); ?> <i data-lucide="arrow-right" class="w-4 h-4"></i>
                            </span>
                        </div>

                        <!-- Services Family -->
                        <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-gray-100 cursor-pointer product-family-card" data-family="services">
                            <div class="w-14 h-14 bg-blue-50 text-secondary rounded-xl flex items-center justify-center mb-6">
                                <i data-lucide="graduation-cap" class="w-8 h-8"></i>
                            </div>
                            <h3 class="font-heading font-bold text-2xl text-gray-900 mb-3"><?php esc_html_e('Services & Academy', 'aquaverify'); ?></h3>
                            <p class="text-gray-600 text-sm mb-6"><?php esc_html_e('Consulting, method validation, and technical certifications.', 'aquaverify'); ?></p>
                            <span class="text-secondary font-bold flex items-center gap-2 text-sm">
                                <?php esc_html_e('View 4 Services', 'aquaverify'); ?> <i data-lucide="arrow-right" class="w-4 h-4"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- SaaS Platform Section (Translated from components/SaaSPlatform.tsx) -->
            <section id="platform" class="py-24 bg-white relative overflow-hidden">
                <div class="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 skew-x-12 transform origin-top-right z-0"></div>
                <div class="container mx-auto px-6 relative z-10">
                    <div class="text-center mb-16">
                        <span class="text-secondary font-bold tracking-wider uppercase text-sm block">
                            <?php esc_html_e( 'Software', 'aquaverify' ); ?>
                        </span>
                        <h2 class="font-heading font-bold text-3xl md:text-4xl text-primary mt-2">
                            <?php esc_html_e( 'One Platform. Total Visibility.', 'aquaverify' ); ?>
                        </h2>
                    </div>

                    <div class="max-w-5xl mx-auto">
                        <!-- Pure CSS/JS Tabs -->
                        <div class="flex flex-wrap justify-center gap-4 mb-12" id="saas-tabs">
                            <button class="saas-tab-btn active flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 border bg-primary text-white border-primary shadow-lg scale-105" data-target="tab-lims">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
                                <span class="font-medium"><?php esc_html_e( 'Web Dashboard', 'aquaverify' ); ?></span>
                            </button>
                            <button class="saas-tab-btn flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 border bg-white text-gray-500 border-gray-200 hover:border-primary hover:text-primary" data-target="tab-mobile">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                                <span class="font-medium"><?php esc_html_e( 'Field App', 'aquaverify' ); ?></span>
                            </button>
                            <button class="saas-tab-btn flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 border bg-white text-gray-500 border-gray-200 hover:border-primary hover:text-primary" data-target="tab-compliance">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
                                <span class="font-medium"><?php esc_html_e( 'Compliance', 'aquaverify' ); ?></span>
                            </button>
                        </div>

                        <div class="bg-white rounded-2xl shadow-soft border border-gray-100 p-8 md:p-12 relative min-h-[400px]">
                            
                            <!-- Panel 1: LIMS -->
                            <div id="tab-lims" class="saas-tab-panel flex flex-col md:flex-row gap-12 items-center transition-opacity duration-300">
                                <div class="md:w-1/2 space-y-6">
                                    <h3 class="text-2xl font-heading font-bold text-gray-800"><?php esc_html_e( 'AquaVerify Cloud LIMS', 'aquaverify' ); ?></h3>
                                    <p class="text-gray-600 leading-relaxed"><?php esc_html_e( 'Your central command for water quality. Manage multiple testing sites, track lot numbers, and visualize contaminant spreads with our intuitive mapping tools.', 'aquaverify' ); ?></p>
                                    <ul class="space-y-3">
                                        <li class="flex items-center text-gray-700 font-medium">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-secondary mr-3"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                                            Real-time Analytics
                                        </li>
                                        <li class="flex items-center text-gray-700 font-medium">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-secondary mr-3"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                                            Multi-site Management
                                        </li>
                                    </ul>
                                </div>
                                <div class="md:w-1/2 w-full">
                                    <img src="https://picsum.photos/600/400?random=11" alt="LIMS Dashboard" class="w-full h-full object-cover rounded-lg shadow-inner border border-gray-200" />
                                </div>
                            </div>
                            
                            <!-- Panel 2: Mobile -->
                            <div id="tab-mobile" class="saas-tab-panel hidden flex-col md:flex-row gap-12 items-center absolute top-8 left-8 right-8 transition-opacity duration-300 opacity-0">
                                <div class="md:w-1/2 space-y-6">
                                    <h3 class="text-2xl font-heading font-bold text-gray-800"><?php esc_html_e( 'Technician Mobile App', 'aquaverify' ); ?></h3>
                                    <p class="text-gray-600 leading-relaxed"><?php esc_html_e( 'Empower field technicians to log samples with zero paperwork. Scan barcodes, attach GPS coordinates, and upload results instantly from the site.', 'aquaverify' ); ?></p>
                                    <ul class="space-y-3">
                                        <li class="flex items-center text-gray-700 font-medium">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-secondary mr-3"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                                            Offline capability
                                        </li>
                                        <li class="flex items-center text-gray-700 font-medium">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-secondary mr-3"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                                            GPS Geo-tagging
                                        </li>
                                    </ul>
                                </div>
                                <div class="md:w-1/2 w-full">
                                    <img src="https://picsum.photos/600/400?random=10" alt="Mobile App" class="w-full h-full object-cover rounded-lg shadow-inner border border-gray-200" />
                                </div>
                            </div>

                            <!-- Panel 3: Compliance -->
                            <div id="tab-compliance" class="saas-tab-panel hidden flex-col md:flex-row gap-12 items-center absolute top-8 left-8 right-8 transition-opacity duration-300 opacity-0">
                                <div class="md:w-1/2 space-y-6">
                                    <h3 class="text-2xl font-heading font-bold text-gray-800"><?php esc_html_e( 'Automated Compliance', 'aquaverify' ); ?></h3>
                                    <p class="text-gray-600 leading-relaxed"><?php esc_html_e( 'Generate auditor-ready PDFs in a single click. Every data point is cryptographically sealed, proving to regulatory bodies that information has not been falsified.', 'aquaverify' ); ?></p>
                                    <ul class="space-y-3">
                                        <li class="flex items-center text-gray-700 font-medium">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-secondary mr-3"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                                            1-Click Export
                                        </li>
                                        <li class="flex items-center text-gray-700 font-medium">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-secondary mr-3"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                                            Audit Logs
                                        </li>
                                    </ul>
                                </div>
                                <div class="md:w-1/2 w-full">
                                    <img src="https://picsum.photos/600/400?random=12" alt="Compliance Reports" class="w-full h-full object-cover rounded-lg shadow-inner border border-gray-200" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <!-- Vanilla JS for SaaS Tabs -->
            <script>
            document.addEventListener('DOMContentLoaded', () => {
                const buttons = document.querySelectorAll('.saas-tab-btn');
                const panels = document.querySelectorAll('.saas-tab-panel');

                buttons.forEach(button => {
                    button.addEventListener('click', () => {
                        // Reset all buttons
                        buttons.forEach(b => {
                            b.className = 'saas-tab-btn flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 border bg-white text-gray-500 border-gray-200 hover:border-primary hover:text-primary';
                        });
                        
                        // Set active button
                        button.className = 'saas-tab-btn active flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 border bg-primary text-white border-primary shadow-lg scale-105';

                        const targetId = button.getAttribute('data-target');

                        // Hide all panels
                        panels.forEach(p => {
                            p.style.opacity = '0';
                            setTimeout(() => {
                                p.classList.add('hidden');
                                p.classList.add('absolute');
                            }, 300);
                        });

                        // Show target panel
                        const targetPanel = document.getElementById(targetId);
                        setTimeout(() => {
                            targetPanel.classList.remove('hidden');
                            targetPanel.classList.remove('absolute');
                            
                            // Trigger reflow
                            void targetPanel.offsetWidth;
                            targetPanel.style.opacity = '1';
                        }, 300);
                    });
                });
            });
            </script>

            <!-- Distributors Section (Translated from components/DistributorsSection.tsx) -->
            <section id="distributors" class="py-24 bg-surface border-t border-gray-100 overflow-hidden relative">
                <div class="container mx-auto px-6 relative z-10">
                    <div class="flex flex-col md:flex-row justify-between items-end mb-16">
                        <div class="max-w-2xl">
                            <span class="text-secondary font-bold tracking-wider uppercase text-sm mb-2 block">
                                <?php esc_html_e( 'Global Network', 'aquaverify' ); ?>
                            </span>
                            <h2 class="font-heading font-bold text-3xl md:text-4xl text-primary mb-4">
                                <?php esc_html_e( 'Authorized Partners', 'aquaverify' ); ?>
                            </h2>
                            <p class="text-gray-600 text-lg">
                                <?php esc_html_e( 'Our technologies are distributed and supported by certified partners worldwide, ensuring rapid deployment and local technical assistance.', 'aquaverify' ); ?>
                            </p>
                        </div>
                        <div class="mt-6 md:mt-0">
                            <button class="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-md flex items-center gap-2 group">
                                <?php esc_html_e( 'Become a Distributor', 'aquaverify' ); ?>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </button>
                        </div>
                    </div>

                    <!-- New Interactive Map CTA -->
                    <div class="relative bg-white rounded-3xl shadow-xl border border-gray-100 p-8 h-[500px] flex items-center justify-center">
                       <img src="https://picsum.photos/1200/500?random=15" alt="Global Distribution Map" class="absolute inset-0 w-full h-full object-cover opacity-20 rounded-3xl pointer-events-none" />
                       <div class="relative z-10 text-center">
                           <h3 class="text-3xl font-bold text-primary mb-4"><?php esc_html_e( 'Explore our Global Reach', 'aquaverify' ); ?></h3>
                           <button id="open-globe-btn" class="inline-flex items-center gap-2 bg-secondary text-white px-8 py-3 rounded-full font-bold shadow-lg hover:-translate-y-1 transition-transform">
                                <i data-lucide="globe" class="w-5 h-5"></i>
                                <?php esc_html_e( 'Open Interactive Map', 'aquaverify' ); ?>
                           </button>
                       </div>
                    </div>
                </div>
            </section>

            <!-- OEM Section (Fixing the blank page bug in PHP) -->
            <section id="oem" class="py-24 bg-primary text-white relative overflow-hidden">
                <div class="absolute inset-0 bg-[url('https://picsum.photos/1920/1080?random=20')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
                <div class="container mx-auto px-6 relative z-10">
                    <div class="flex flex-col lg:flex-row items-center gap-16">
                        <div class="lg:w-1/2">
                            <span class="text-secondary font-bold tracking-wider uppercase text-sm mb-4 block">
                                <?php esc_html_e( 'OEM Integration', 'aquaverify' ); ?>
                            </span>
                            <h2 class="font-heading font-extrabold text-4xl lg:text-5xl mb-6">
                                <?php esc_html_e( 'Powering your brand with our science.', 'aquaverify' ); ?>
                            </h2>
                            <p class="text-lg text-gray-300 mb-8 leading-relaxed">
                                <?php esc_html_e( 'AquaVerify offers white-label manufacturing of our patented chromogenic media, customized magnetic manifolds, and API access to our LIMS platform. Accelerate your time-to-market without the R&D overhead.', 'aquaverify' ); ?>
                            </p>
                            <button class="bg-secondary text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-secondary/30 hover:-translate-y-1 transition-all font-bold">
                                <?php esc_html_e( 'Request OEM Specifications', 'aquaverify' ); ?>
                            </button>
                        </div>
                        <div class="lg:w-1/2">
                             <img src="https://picsum.photos/800/600?random=21" alt="OEM Manufacturing" class="rounded-2xl shadow-2xl border-4 border-white/10" />
                        </div>
                    </div>
                </div>
            </section>

            <!-- Modals Container (Hidden by default) -->
            <div id="interactive-modals" class="fixed inset-0 z-[100] hidden items-center justify-center p-4">
                <!-- Backdrop -->
                <div class="absolute inset-0 bg-black/80 backdrop-blur-sm modal-backdrop"></div>
                
                <!-- Globe Modal -->
                <div id="globe-modal" class="hidden bg-gray-900 w-full max-w-6xl rounded-2xl shadow-2xl relative z-10 overflow-hidden flex-col md:flex-row h-[85vh] md:h-[700px] animate-fade-in-up">
                    <button class="close-modal-btn absolute top-4 right-4 z-50 bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full shadow-lg transition-transform hover:scale-105">
                        <i data-lucide="x" class="w-5 h-5"></i>
                    </button>
                    <!-- Globe Canvas Container -->
                    <div id="globe-container" class="relative w-full h-1/2 md:h-full md:w-2/3 bg-[#050B14] overflow-hidden flex items-center justify-center cursor-move"></div>
                    <!-- Right Sidebar -->
                    <div class="w-full h-1/2 md:h-full md:w-1/3 bg-white flex flex-col relative z-20">
                        <div class="p-6 md:p-8 flex-shrink-0 border-b border-gray-100">
                            <h3 class="font-heading font-bold text-2xl text-gray-900 mb-2">Global Network</h3>
                            <p class="text-gray-500 text-sm mb-4">Select or search for a local partner</p>
                            <div class="relative">
                                <i data-lucide="search" class="absolute left-3 top-3 w-5 h-5 text-gray-400"></i>
                                <input type="text" placeholder="Search by name, country, or keyword..." id="globe-search" class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary transition-all" />
                            </div>
                        </div>
                        <div class="flex-grow overflow-y-auto p-6 md:p-8" id="globe-sidebar-content">
                            <!-- Sidebar content injected by JS -->
                            <div id="globe-partner-list" class="space-y-4"></div>
                        </div>
                    </div>
                </div>

                <!-- Product Family Modal -->
                <div id="product-modal" class="hidden bg-white w-full max-w-6xl rounded-2xl shadow-2xl relative z-10 flex-col max-h-[90vh] animate-fade-in-up">
                    <div class="bg-primary text-white p-6 md:p-8 flex justify-between items-start flex-shrink-0 rounded-t-2xl">
                        <div>
                            <span class="text-blue-200 text-sm font-bold uppercase tracking-wider">Product Catalog</span>
                            <h3 id="product-modal-title" class="font-heading font-bold text-xl md:text-3xl mt-1">Family Title</h3>
                        </div>
                        <button class="close-modal-btn bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                            <i data-lucide="x" class="w-6 h-6"></i>
                        </button>
                    </div>
                    
                    <div class="flex-grow overflow-y-auto p-6 md:p-8 flex flex-col md:flex-row gap-8 min-h-[500px]">
                        <!-- Left: List -->
                        <div class="w-full md:w-5/12 lg:w-4/12 flex-shrink-0">
                            <p id="product-modal-desc" class="text-gray-600 mb-6 border-l-4 border-secondary pl-4 text-sm"></p>
                            
                            <div class="relative mb-6">
                                <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"></i>
                                <input type="text" id="product-search" placeholder="Search products..." class="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary text-sm" />
                            </div>

                            <div id="product-list" class="flex flex-col gap-3">
                                <!-- Products injected here -->
                            </div>
                        </div>

                        <!-- Right: Detail View -->
                        <div class="w-full md:w-7/12 lg:w-8/12 bg-surface rounded-2xl p-6 md:p-8 border border-gray-100 flex flex-col justify-center items-center text-center" id="product-detail-view">
                            <!-- Product Details injected here -->
                            <div class="text-gray-400 flex flex-col items-center justify-center">
                                <i data-lucide="mouse-pointer-click" class="w-12 h-12 mb-4 text-gray-200"></i>
                                <p>Select a product to view details.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

		</main><!-- #main -->
	</div><!-- #primary -->

            <!-- Modals Logic (Vanilla JS) -->
            <script>
            document.addEventListener('DOMContentLoaded', () => {
                // ----------------------------------------------------------------------
                // Modal Infrastructure
                // ----------------------------------------------------------------------
                const modalsContainer = document.getElementById('interactive-modals');
                const globeModal = document.getElementById('globe-modal');
                const productModal = document.getElementById('product-modal');
                const closeBtns = document.querySelectorAll('.close-modal-btn');
                const backdrop = document.querySelector('.modal-backdrop');

                function openModal(modalEl) {
                    modalsContainer.classList.remove('hidden');
                    modalsContainer.classList.add('flex');
                    
                    // Hide all modals first
                    globeModal.classList.add('hidden');
                    globeModal.classList.remove('flex');
                    productModal.classList.add('hidden');
                    productModal.classList.remove('flex');

                    // Show specific modal
                    modalEl.classList.remove('hidden');
                    modalEl.classList.add('flex');
                    document.body.style.overflow = 'hidden';
                    
                    // Render globe if needed
                    if(modalEl === globeModal && !window.globeInstance) {
                        initGlobe();
                    }
                }

                function closeAllModals() {
                    modalsContainer.classList.add('hidden');
                    modalsContainer.classList.remove('flex');
                    globeModal.classList.add('hidden');
                    productModal.classList.add('hidden');
                    document.body.style.overflow = 'auto';
                }

                closeBtns.forEach(btn => btn.addEventListener('click', closeAllModals));
                backdrop.addEventListener('click', closeAllModals);
                window.addEventListener('keydown', (e) => {
                    if(e.key === 'Escape') closeAllModals();
                });

                // ----------------------------------------------------------------------
                // Globe.gl Implementation
                // ----------------------------------------------------------------------
                const openGlobeBtn = document.getElementById('open-globe-btn');
                if(openGlobeBtn) {
                    openGlobeBtn.addEventListener('click', () => openModal(globeModal));
                }

                const partners = [
                    { id: '1', name: "AquaTech Solutions NY", location: "New York, USA", country: "United States", type: 'exclusive', address: "1200 Broadway, NY 10001", email: "sales.ny@aquatech.com", phone: "+1 212 555 0199", lat: 40.71, lng: -74.00, size: 1 },
                    { id: '2', name: "EuroLab Supplies", location: "London, UK", country: "United Kingdom", type: 'exclusive', address: "15 Baker Street, London W1U 8AE", email: "info@eurolab.co.uk", phone: "+44 20 7946 0958", lat: 51.50, lng: -0.12, size: 1 },
                    { id: '3', name: "Nippon Biotech", location: "Tokyo, Japan", country: "Japan", type: 'reseller', address: "Shinjuku City, Tokyo 160-0022", email: "contact@nipponbio.jp", phone: "+81 3 1234 5678", lat: 35.68, lng: 139.65, size: 0.5 },
                    { id: '4', name: "BioSur Ltda", location: "Sao Paulo, Brazil", country: "Brazil", type: 'service', address: "Av. Paulista, 1578, Sao Paulo", email: "suporte@biosur.com.br", phone: "+55 11 98765 4321", lat: -23.55, lng: -46.63, size: 0.5 },
                    { id: '5', name: "Oceanic Science", location: "Sydney, Australia", country: "Australia", type: 'reseller', address: "200 George St, Sydney NSW 2000", email: "sales@oceanic.com.au", phone: "+61 2 9876 5432", lat: -33.86, lng: 151.20, size: 0.5 },
                    { id: '6', name: "Berlin Diagnostics", location: "Berlin, Germany", country: "Germany", type: 'service', address: "Alexanderplatz 1, 10178 Berlin", email: "service@berlindm.de", phone: "+49 30 1234567", lat: 52.52, lng: 13.40, size: 0.5 },
                ];

                function renderPartnerList(filteredPartners) {
                    const listContainer = document.getElementById('globe-partner-list');
                    if (!listContainer) return;
                    
                    if (filteredPartners.length === 0) {
                        listContainer.innerHTML = `<div class="text-center text-gray-500 py-8">No partners found.</div>`;
                        return;
                    }

                    listContainer.innerHTML = filteredPartners.map(p => `
                        <div class="partner-item cursor-pointer group bg-white border border-gray-100 rounded-xl p-4 hover:border-secondary hover:shadow-md transition-all" data-id="${p.id}">
                            <div class="flex justify-between items-start mb-2">
                                <h4 class="font-bold text-gray-900 group-hover:text-secondary transition-colors">${p.name}</h4>
                                <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${p.type === 'exclusive' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}">${p.type}</span>
                            </div>
                            <p class="text-sm text-gray-500 flex items-center gap-1"><i data-lucide="map-pin" class="w-3 h-3"></i> ${p.country}</p>
                        </div>
                    `).join('');

                    if(window.lucide) lucide.createIcons();

                    document.querySelectorAll('.partner-item').forEach(el => {
                        el.addEventListener('click', (e) => {
                            const pId = e.currentTarget.getAttribute('data-id');
                            const partner = partners.find(p => p.id === pId);
                            if(partner) {
                                selectPartner(partner);
                                if(window.globeInstance) {
                                    window.globeInstance.pointOfView({ lat: partner.lat, lng: partner.lng, altitude: 1.5 }, 1000);
                                }
                            }
                        });
                    });
                }

                function initGlobe() {
                    const container = document.getElementById('globe-container');
                    if(!container) return;

                    // Init default list
                    renderPartnerList(partners);

                    window.globeInstance = Globe()(container)
                        .backgroundColor('rgba(0,0,0,0)')
                        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
                        .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
                        .htmlElementsData(partners)
                        .htmlElement(d => {
                            const el = document.createElement('div');
                            el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="white" stroke-width="1.5" class="drop-shadow-xl cursor-pointer hover:scale-125 transition-transform duration-300 origin-bottom"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;
                            el.style.color = d.type === 'exclusive' ? '#a855f7' : '#3b82f6';
                            el.style.pointerEvents = 'auto';
                            el.onclick = () => {
                                selectPartner(d);
                                window.globeInstance.pointOfView({ lat: d.lat, lng: d.lng, altitude: 1.5 }, 1000);
                            };
                            return el;
                        });

                    // Auto rotate
                    window.globeInstance.controls().autoRotate = true;
                    window.globeInstance.controls().autoRotateSpeed = 0.5;
                    window.globeInstance.controls().enableZoom = true;
                }

                function selectPartner(p) {
                    const sidebar = document.getElementById('globe-sidebar-content');
                    if(!p) return;

                    const typeColor = p.type === 'exclusive' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700';

                    sidebar.innerHTML = `
                        <div class="animate-fade-in-up h-full flex flex-col">
                            <button id="back-to-list-btn" class="w-max text-sm text-gray-500 hover:text-secondary mb-4 flex items-center gap-1 transition-colors">
                                <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to list
                            </button>
                            <span class="inline-block w-max px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3 ${typeColor}">
                                ${p.type} Partner
                            </span>
                            <h4 class="text-2xl font-bold text-primary mb-1">${p.name}</h4>
                            <div class="flex items-center text-gray-500 text-sm mb-6">
                                <i data-lucide="map-pin" class="w-4 h-4 mr-1"></i> ${p.location}
                            </div>
                            
                            <div class="space-y-4 mb-8 bg-gray-50 p-5 rounded-xl border border-gray-100 shadow-inner">
                                <div class="flex items-start">
                                    <i data-lucide="map-pin" class="w-5 h-5 text-gray-400 mr-3 mt-1 flex-shrink-0"></i>
                                    <p class="text-gray-700 text-sm font-medium">${p.address}</p>
                                </div>
                                <div class="flex items-center">
                                    <i data-lucide="mail" class="w-5 h-5 text-gray-400 mr-3 flex-shrink-0"></i>
                                    <a href="mailto:${p.email}" class="text-secondary text-sm hover:underline">${p.email}</a>
                                </div>
                                <div class="flex items-center">
                                    <i data-lucide="phone" class="w-5 h-5 text-gray-400 mr-3 flex-shrink-0"></i>
                                    <p class="text-gray-700 text-sm">${p.phone}</p>
                                </div>
                            </div>

                            <div class="mt-auto pt-4 border-t border-gray-100">
                                <button class="w-full bg-primary hover:bg-secondary text-white py-4 rounded-xl font-bold shadow-lg transition-colors flex items-center justify-center gap-2">
                                    <i data-lucide="mail" class="w-5 h-5"></i> Contact via Platform
                                </button>
                            </div>
                        </div>
                    `;
                    if(window.lucide) lucide.createIcons();

                    document.getElementById('back-to-list-btn').addEventListener('click', () => {
                        sidebar.innerHTML = '<div id="globe-partner-list" class="space-y-4"></div>';
                        renderPartnerList(partners);
                        if(window.globeInstance) {
                            window.globeInstance.pointOfView({ lat: 0, lng: 0, altitude: 2.5 }, 1000);
                        }
                    });
                }

                const globeSearch = document.getElementById('globe-search');
                if(globeSearch) {
                    globeSearch.addEventListener('input', (e) => {
                        const query = e.target.value.toLowerCase();
                        const filtered = partners.filter(p => p.country.toLowerCase().includes(query) || p.name.toLowerCase().includes(query));
                        
                        const sidebar = document.getElementById('globe-sidebar-content');
                        if(!sidebar.querySelector('#globe-partner-list')) {
                            sidebar.innerHTML = '<div id="globe-partner-list" class="space-y-4"></div>';
                        }
                        
                        renderPartnerList(filtered);
                        
                        if (filtered.length === 1 && window.globeInstance && query.length > 2) {
                            window.globeInstance.pointOfView({ lat: filtered[0].lat, lng: filtered[0].lng, altitude: 1.5 }, 1000);
                        }
                    });
                }

                // ----------------------------------------------------------------------
                // Products Logic
                // ----------------------------------------------------------------------
                const productFamilies = {
                    equipment: {
                        title: "Lab Equipment & Hardware",
                        desc: "Hardware designed to automate workflows and minimize contamination risks.",
                        items: [
                            { name: "Magnetic Filtration Ramps", detail: "Disposable, low-cost rails, magnetically adjusted", img: "https://picsum.photos/600/400?random=101", useCases: ["High-throughput water filtration", "Field laboratories"], specs: { "Material": "Stainless Steel 316L", "Funnel Capacity": "300ml / 500ml" } },
                            { name: "Automatic Filter Dispensers", detail: "Hands-free sterile dispensing", img: "https://picsum.photos/600/400?random=102", useCases: ["Sterile technique maintenance", "Reducing cross-contamination"] },
                            { name: "Digital Turbidimeters", detail: "Easy-to-use, high precision", img: "https://picsum.photos/600/400?random=103" }
                        ]
                    },
                    micro: {
                        title: "Microbiology Kits",
                        desc: "Rapid Chromogenic solutions for the detection of pathogens.",
                        items: [
                            { name: "E. coli & Enterococci", detail: "Rapid enumeration kits", img: "https://picsum.photos/600/400?random=104", useCases: ["Drinking water compliance", "Well water testing"], specs: { "Incubation": "24 hours @ 37°C", "LOD": "1 CFU/100mL" } },
                            { name: "Pseudomonas Control", detail: "For recreational waters", img: "https://picsum.photos/600/400?random=105" }
                        ]
                    },
                    media: {
                        title: "Culture Media & Reagents",
                        desc: "Dehydrated and Ready-to-Use media formulations.",
                        items: [
                            { name: "Dehydrated Media", detail: "MSA, MSB, R2A formulations", img: "https://picsum.photos/600/400?random=106" },
                            { name: "RTU Culture Media", detail: "Pre-mixed, sterile solutions", img: "https://picsum.photos/600/400?random=107" }
                        ]
                    },
                    molecular: {
                        title: "Molecular Biology",
                        desc: "qPCR assays for high precision source tracking and immediate detection.",
                        items: [
                            { name: "MST Tracking", detail: "qPCR kits for Human, Swine, Bovine", img: "https://picsum.photos/600/400?random=108" },
                            { name: "ARG Determination", detail: "Antibiotic Resistant Gene detection", img: "https://picsum.photos/600/400?random=109" }
                        ]
                    },
                    physchem: {
                        title: "Physicochemical Analysis",
                        desc: "Rapid chemical strips and sensory probes for field water quality data.",
                        items: [
                            { name: "Chemical Detection Kits", detail: "Anxiolytes, narcotics, trace residues", img: "https://picsum.photos/600/400?random=110" },
                            { name: "Physicochemical Sensors", detail: "pH, Dissolved Oxygen, Nitrates", img: "https://picsum.photos/600/400?random=111" }
                        ]
                    },
                    services: {
                        title: "Services & Academy",
                        desc: "Consulting, method validation, and technical certifications.",
                        items: [
                            { name: "AquaVerify Academy™", detail: "Certified user training programs", img: "https://picsum.photos/600/400?random=112" },
                            { name: "Method Validation", detail: "Consulting for ISO/EPA accreditation", img: "https://picsum.photos/600/400?random=113" }
                        ]
                    }
                };

                let currentFamilyData = null;
                let comparedProducts = [];

                const familyCards = document.querySelectorAll('.product-family-card');
                familyCards.forEach(card => {
                    card.addEventListener('click', () => {
                        const familyKey = card.getAttribute('data-family');
                        openProductFamily(familyKey);
                    });
                });

                function openProductFamily(key) {
                    currentFamilyData = productFamilies[key];
                    if(!currentFamilyData) return;

                    // reset comparisons
                    comparedProducts = [];

                    document.getElementById('product-modal-title').textContent = currentFamilyData.title;
                    document.getElementById('product-modal-desc').textContent = currentFamilyData.desc;
                    
                    renderProductList(currentFamilyData.items);
                    document.getElementById('product-detail-view').innerHTML = `
                        <div class="text-gray-400 flex flex-col items-center justify-center h-full w-full">
                            <i data-lucide="mouse-pointer-click" class="w-12 h-12 mb-4 text-gray-200"></i>
                            <p>Select a product from the list to view details.</p>
                        </div>
                    `;
                    if(window.lucide) lucide.createIcons();
                    
                    if(document.getElementById('product-search')) {
                        document.getElementById('product-search').value = '';
                    }

                    openModal(productModal);
                }

                function renderProductList(items) {
                    const listContainer = document.getElementById('product-list');
                    if(items.length === 0) {
                        listContainer.innerHTML = `<div class="text-sm text-gray-500 py-4">No products found.</div>`;
                        return;
                    }

                    listContainer.innerHTML = items.map((item, idx) => {
                        const originalIndex = currentFamilyData.items.findIndex(i => i.name === item.name);
                        const isCompared = comparedProducts.some(p => p.name === item.name);
                        return `
                        <div class="product-item group relative p-4 rounded-lg border border-gray-100 hover:border-gray-300 hover:bg-gray-50 bg-white transition-all cursor-pointer flex flex-col gap-2" data-index="${originalIndex}">
                            <h5 class="font-bold text-sm text-gray-800 group-hover:text-secondary">${item.name}</h5>
                            <p class="text-xs text-gray-500">${item.detail}</p>
                            <div class="mt-2 flex items-center justify-between border-t border-gray-100 pt-2" onclick="event.stopPropagation()">
                                <label class="flex items-center gap-2 cursor-pointer z-10 w-full hover:bg-gray-100 p-1 -ml-1 rounded">
                                    <input type="checkbox" class="compare-checkbox w-4 h-4 text-secondary rounded border-gray-300 focus:ring-secondary" data-index="${originalIndex}" ${isCompared ? 'checked' : ''}>
                                    <span class="text-xs text-secondary font-medium">Compare</span>
                                </label>
                            </div>
                        </div>
                    `}).join('');

                    // Bind item clicks
                    document.querySelectorAll('.product-item').forEach(el => {
                        el.addEventListener('click', (e) => {
                            // Don't trigger selection if clicking the checkbox wrapper
                            if(e.target.closest('label')) return;

                            document.querySelectorAll('.product-item').forEach(node => {
                                node.classList.remove('bg-blue-50', 'border-secondary', 'ring-1', 'ring-secondary');
                                node.classList.add('bg-white', 'border-gray-100');
                            });
                            
                            const target = e.currentTarget;
                            target.classList.remove('bg-white', 'border-gray-100');
                            target.classList.add('bg-blue-50', 'border-secondary', 'ring-1', 'ring-secondary');

                            const idx = target.getAttribute('data-index');
                            selectProduct(currentFamilyData.items[idx]);
                        });
                    });

                    // Bind checkbox compare
                    document.querySelectorAll('.compare-checkbox').forEach(chk => {
                        chk.addEventListener('change', (e) => {
                            const idx = e.target.getAttribute('data-index');
                            const product = currentFamilyData.items[idx];
                            if(e.target.checked) {
                                if(comparedProducts.length >= 3) {
                                    alert("You can compare up to 3 products at a time.");
                                    e.target.checked = false;
                                    return;
                                }
                                comparedProducts.push(product);
                            } else {
                                comparedProducts = comparedProducts.filter(p => p.name !== product.name);
                            }
                            
                            if(comparedProducts.length > 0) {
                                renderComparison();
                            } else {
                                document.getElementById('product-detail-view').innerHTML = `
                                    <div class="text-gray-400 flex flex-col items-center justify-center h-full w-full">
                                        <i data-lucide="layout-grid" class="w-12 h-12 mb-4 text-gray-200"></i>
                                        <p>Select a product to view or compare multiple products.</p>
                                    </div>
                                `;
                                if(window.lucide) lucide.createIcons();
                            }
                        });
                    });
                }

                function renderComparison() {
                    if(comparedProducts.length === 0) return;

                    // Deselect main highlight
                    document.querySelectorAll('.product-item').forEach(node => {
                        node.classList.remove('bg-blue-50', 'border-secondary', 'ring-1', 'ring-secondary');
                    });

                    const allSpecs = new Set();
                    comparedProducts.forEach(p => {
                        if(p.specs) Object.keys(p.specs).forEach(k => allSpecs.add(k));
                    });

                    document.getElementById('product-detail-view').innerHTML = `
                        <div class="animate-fade-in-up w-full h-full flex flex-col text-left overflow-y-auto">
                            <h3 class="font-heading font-bold text-2xl text-gray-900 mb-6 sticky top-0 bg-surface z-10 py-2 border-b border-gray-100">
                                <i data-lucide="scale" class="inline w-6 h-6 mr-2 text-primary"></i>
                                Product Comparison
                            </h3>
                            
                            <div class="grid grid-cols-${comparedProducts.length} gap-4 mb-8">
                                ${comparedProducts.map(p => `
                                    <div class="bg-white p-4 rounded-xl border border-gray-200 text-center shadow-sm relative">
                                        <button class="absolute top-2 right-2 text-gray-400 hover:text-red-500 remove-compare-btn" data-name="${p.name}">
                                            <i data-lucide="x-circle" class="w-5 h-5"></i>
                                        </button>
                                        <div class="aspect-video w-full rounded-lg mix-blend-multiply relative bg-gray-50 mb-4 overflow-hidden">
                                            <img src="${p.img}" alt="${p.name}" class="w-full h-full object-cover">
                                        </div>
                                        <h4 class="font-bold text-gray-900 text-sm mb-2">${p.name}</h4>
                                        <p class="text-xs text-gray-500 line-clamp-2">${p.detail}</p>
                                    </div>
                                `).join('')}
                            </div>

                            ${allSpecs.size > 0 ? `
                            <div class="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
                                <table class="w-full text-sm text-left">
                                    <thead class="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
                                        <tr>
                                            <th class="px-6 py-3 border-b border-gray-200">Specification</th>
                                            ${comparedProducts.map(p => `<th class="px-6 py-3 border-b border-gray-200">${p.name}</th>`).join('')}
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-100">
                                        ${Array.from(allSpecs).map(spec => `
                                            <tr class="hover:bg-gray-50">
                                                <td class="px-6 py-4 font-medium text-gray-900 bg-gray-50/50">${spec}</td>
                                                ${comparedProducts.map(p => `
                                                    <td class="px-6 py-4 text-gray-600">${p.specs && p.specs[spec] ? p.specs[spec] : '-'}</td>
                                                `).join('')}
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                            ` : '<p class="text-sm text-gray-500 italic pb-6">No technical specifications available for comparison.</p>'}
                        </div>
                    `;
                    if(window.lucide) lucide.createIcons();

                    document.querySelectorAll('.remove-compare-btn').forEach(btn => {
                        btn.addEventListener('click', (e) => {
                            const name = e.currentTarget.getAttribute('data-name');
                            comparedProducts = comparedProducts.filter(p => p.name !== name);
                            
                            // uncheck the box
                            const itemIdx = currentFamilyData.items.findIndex(i => i.name === name);
                            const chk = document.querySelector(`.compare-checkbox[data-index="${itemIdx}"]`);
                            if(chk) chk.checked = false;

                            if(comparedProducts.length > 0) {
                                renderComparison();
                            } else {
                                document.getElementById('product-detail-view').innerHTML = `
                                    <div class="text-gray-400 flex flex-col items-center justify-center h-full w-full">
                                        <i data-lucide="layout-grid" class="w-12 h-12 mb-4 text-gray-200"></i>
                                        <p>Select a product to view or compare multiple products.</p>
                                    </div>
                                `;
                                if(window.lucide) lucide.createIcons();
                            }
                        });
                    });
                }

                function selectProduct(product) {
                    let specsHtml = '';
                    if(product.specs) {
                        specsHtml = `
                        <div class="mb-6">
                            <h4 class="font-bold text-gray-900 mb-2 flex items-center text-sm">
                                <i data-lucide="zap" class="w-4 h-4 mr-2 text-primary"></i> Tech Specs
                            </h4>
                            <div class="bg-white rounded p-3 border border-gray-100 text-left">
                                <table class="w-full text-xs">
                                    <tbody>
                                        ${Object.entries(product.specs).map(([k,v]) => `<tr><td class="text-gray-500 py-1">${k}</td><td class="text-gray-900 font-semibold text-right">${v}</td></tr>`).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>`;
                    }

                    let useCasesHtml = '';
                    if(product.useCases) {
                        useCasesHtml = `
                        <div class="mb-8">
                            <h4 class="font-bold text-gray-900 mb-2 flex items-center text-sm">
                                <i data-lucide="book-open" class="w-4 h-4 mr-2 text-primary"></i> Applications
                            </h4>
                            <ul class="text-left space-y-2">
                                ${product.useCases.map(uc => `<li class="flex items-start text-xs text-gray-700"><i data-lucide="check-circle-2" class="w-3 h-3 text-secondary mr-2 mt-0.5 flex-shrink-0"></i> ${uc}</li>`).join('')}
                            </ul>
                        </div>`;
                    }

                    document.getElementById('product-detail-view').innerHTML = `
                        <div class="animate-fade-in-up w-full h-full flex flex-col text-left overflow-y-auto">
                            <div class="aspect-video w-full bg-white rounded-lg shadow-sm border border-gray-100 mb-6 overflow-hidden relative flex-shrink-0">
                                <img src="${product.img}" alt="${product.name}" class="w-full h-full object-cover" />
                            </div>
                            
                            <h3 class="font-heading font-bold text-2xl text-gray-900 mb-2">${product.name}</h3>
                            <p class="text-sm text-gray-600 mb-6 leading-relaxed">${product.detail} - The industry standard solution designed for accuracy and high-throughput reliability.</p>

                            ${specsHtml}
                            ${useCasesHtml}

                            <div class="flex gap-3 mt-auto pt-6 border-t border-gray-100">
                                <button class="flex-1 bg-primary text-white py-3 px-4 rounded-lg font-bold shadow hover:bg-opacity-90 transition-all text-sm">
                                    Request Quote
                                </button>
                                <button class="flex-1 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-bold hover:bg-gray-50 transition-all text-sm">
                                    Download Brochure
                                </button>
                            </div>
                        </div>
                    `;
                    if(window.lucide) lucide.createIcons();
                }

                const prodSearch = document.getElementById('product-search');
                if(prodSearch) {
                    prodSearch.addEventListener('input', (e) => {
                        if(!currentFamilyData) return;
                        const query = e.target.value.toLowerCase();
                        const filtered = currentFamilyData.items.filter(i => i.name.toLowerCase().includes(query) || i.detail.toLowerCase().includes(query));
                        renderProductList(filtered);
                    });
                }
            });
            </script>

<?php
get_footer();
?>
