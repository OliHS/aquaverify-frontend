<?php
/**
 * The template for displaying all single pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @package AquaVerify
 */

get_header();
?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">

		<?php
		while ( have_posts() ) :
			the_post();

            // Check if Elementor is building this page
            if ( \Elementor\Plugin::$instance->db->is_built_with_elementor( get_the_ID() ) ) {
                // Let Elementor handle the spacing and container entirely
                the_content();
            } else {
                // Standard page loop for Gutenberg or Classic Editor
                ?>
                <div class="container mx-auto px-4 md:px-6 py-12 lg:py-20 max-w-4xl">
                    <article id="post-<?php the_ID(); ?>" <?php post_class( 'prose prose-lg prose-blue' ); ?>>
                        <header class="entry-header mb-10 text-center">
                            <?php the_title( '<h1 class="entry-title font-heading font-extrabold text-4xl lg:text-5xl text-primary mb-6">', '</h1>' ); ?>
                        </header><!-- .entry-header -->

                        <?php if ( has_post_thumbnail() ) : ?>
                            <div class="post-thumbnail mb-12 rounded-2xl overflow-hidden shadow-xl">
                                <?php the_post_thumbnail( 'large', array( 'class' => 'w-full h-auto object-cover' ) ); ?>
                            </div>
                        <?php endif; ?>

                        <div class="entry-content text-gray-700 leading-relaxed font-sans">
                            <?php
                            the_content();

                            wp_link_pages(
                                array(
                                    'before' => '<div class="page-links mt-10 pt-6 border-t font-semibold">' . esc_html__( 'Pages:', 'aquaverify' ),
                                    'after'  => '</div>',
                                )
                            );
                            ?>
                        </div><!-- .entry-content -->
                    </article><!-- #post-<?php the_ID(); ?> -->
                </div>
                <?php
            }

			// If comments are open or we have at least one comment, load up the comment template.
			if ( comments_open() || get_comments_number() ) :
                ?>
                <div class="container mx-auto px-4 md:px-6 py-8 max-w-4xl border-t border-gray-100">
                    <?php comments_template(); ?>
                </div>
                <?php
			endif;

		endwhile; // End of the loop.
		?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_footer();
