<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 *
 * @package AquaVerify
 */

get_header();
?>

	<div id="primary" class="content-area container mx-auto px-4 md:px-6 py-12">
		<main id="main" class="site-main prose prose-lg max-w-none">

		<?php
		if ( have_posts() ) :

			if ( is_home() && ! is_front_page() ) :
				?>
				<header>
					<h1 class="page-title font-heading font-bold text-4xl text-primary mb-8"><?php single_post_title(); ?></h1>
				</header>
				<?php
			endif;

			/* Start the Loop */
			while ( have_posts() ) :
				the_post();

				/*
				 * Include the Post-Type-specific template for the content.
				 * If you want to override this in a child theme, then include a file
				 * called content-___.php (where ___ is the Post Type name) and that will be used instead.
				 */
				?>
                <article id="post-<?php the_ID(); ?>" <?php post_class( 'mb-12' ); ?>>
                    <header class="entry-header mb-6">
                        <?php
                        if ( is_singular() ) :
                            the_title( '<h1 class="entry-title font-heading font-bold text-4xl text-primary mb-4">', '</h1>' );
                        else :
                            the_title( '<h2 class="entry-title font-heading font-bold text-3xl text-primary mb-4"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );
                        endif;

                        if ( 'post' === get_post_type() ) :
                            ?>
                            <div class="entry-meta text-sm text-gray-500">
                                <?php
                                echo esc_html( get_the_date() );
                                ?>
                            </div><!-- .entry-meta -->
                        <?php endif; ?>
                    </header><!-- .entry-header -->

                    <?php if ( has_post_thumbnail() ) : ?>
                        <div class="post-thumbnail mb-6 rounded-2xl overflow-hidden shadow-lg">
                            <?php the_post_thumbnail( 'large', array( 'class' => 'w-full h-auto object-cover' ) ); ?>
                        </div>
                    <?php endif; ?>

                    <div class="entry-content">
                        <?php
                        // This allows Elementor to inject its page builder content directly.
                        the_content(
                            sprintf(
                                wp_kses(
                                    /* translators: %s: Name of current post. Only visible to screen readers */
                                    __( 'Continue reading<span class="screen-reader-text"> "%s"</span>', 'aquaverify' ),
                                    array(
                                        'span' => array(
                                            'class' => array(),
                                        ),
                                    )
                                ),
                                wp_kses_post( get_the_title() )
                            )
                        );

                        wp_link_pages(
                            array(
                                'before' => '<div class="page-links mt-8">' . esc_html__( 'Pages:', 'aquaverify' ),
                                'after'  => '</div>',
                            )
                        );
                        ?>
                    </div><!-- .entry-content -->
                </article><!-- #post-<?php the_ID(); ?> -->
                <?php

			endwhile;

			the_posts_navigation( array(
                'prev_text' => __( 'Older posts', 'aquaverify' ),
                'next_text' => __( 'Newer posts', 'aquaverify' ),
                'class'     => 'mt-12 flex justify-between text-primary font-medium'
            ) );

		else :

			// If no content, include the "No posts found" template.
			?>
            <section class="no-results not-found text-center py-20">
                <header class="page-header mb-6">
                    <h1 class="page-title font-heading font-bold text-4xl text-primary"><?php esc_html_e( 'Nothing Found', 'aquaverify' ); ?></h1>
                </header><!-- .page-header -->

                <div class="page-content text-gray-600">
                    <?php
                    if ( is_search() ) :
                        ?>
                        <p class="mb-6"><?php esc_html_e( 'Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'aquaverify' ); ?></p>
                        <?php
                        get_search_form();

                    else :
                        ?>
                        <p class="mb-6"><?php esc_html_e( 'It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.', 'aquaverify' ); ?></p>
                        <?php
                        get_search_form();

                    endif;
                    ?>
                </div><!-- .page-content -->
            </section><!-- .no-results -->
            <?php

		endif;
		?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_footer();
