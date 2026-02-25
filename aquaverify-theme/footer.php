<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #page div and all content after.
 *
 * @package AquaVerify
 */
?>

    </main><!-- #primary -->

    <!-- FOOTER NAV (Translated from components/Footer.tsx) -->
   <footer class="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800 mt-auto">
      <div class="container mx-auto px-6">
        <div class="grid md:grid-cols-4 gap-12 mb-12">
          
          <!-- Brand -->
          <div class="col-span-1 md:col-span-1">
            <div class="flex items-center space-x-2 mb-4">
               <div class="relative w-8 h-8 flex items-center justify-center bg-white rounded-full">
               	<!-- Inline SVG for Droplet -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-primary fill-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path></svg>
              </div>
              <span class="font-heading font-bold text-xl tracking-tight">AquaVerify</span>
            </div>
            <p class="text-gray-400 text-sm leading-relaxed mb-6">
              <?php esc_html_e( 'Empowering global water security through advanced biotechnology and immutable data traceability.', 'aquaverify' ); ?>
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
              	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
              	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
              	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>

          <!-- Links -->
          <div>
            <h4 class="font-bold text-lg mb-4"><?php esc_html_e( 'Solutions', 'aquaverify' ); ?></h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a href="#" class="hover:text-secondary"><?php esc_html_e( 'Testing Kits', 'aquaverify' ); ?></a></li>
              <li><a href="#" class="hover:text-secondary"><?php esc_html_e( 'LIMS Software', 'aquaverify' ); ?></a></li>
              <li><a href="#" class="hover:text-secondary"><?php esc_html_e( 'Mobile App', 'aquaverify' ); ?></a></li>
              <li><a href="#" class="hover:text-secondary"><?php esc_html_e( 'OEM Program', 'aquaverify' ); ?></a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold text-lg mb-4"><?php esc_html_e( 'Company', 'aquaverify' ); ?></h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a href="#" class="hover:text-secondary"><?php esc_html_e( 'About Us', 'aquaverify' ); ?></a></li>
              <li><a href="#products" class="hover:text-secondary"><?php esc_html_e( 'Scientific Validation', 'aquaverify' ); ?></a></li>
              <li><a href="#" class="hover:text-secondary"><?php esc_html_e( 'Careers', 'aquaverify' ); ?></a></li>
              <li><a href="#" class="hover:text-secondary"><?php esc_html_e( 'Contact', 'aquaverify' ); ?></a></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="font-bold text-lg mb-4"><?php esc_html_e( 'Contact', 'aquaverify' ); ?></h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><?php esc_html_e( '123 Science Park Drive', 'aquaverify' ); ?></li>
              <li><?php esc_html_e( 'Innovation District, CA 90210', 'aquaverify' ); ?></li>
              <li class="pt-2">hello@aquaverify.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; <?php echo date('Y'); ?> <?php esc_html_e( 'AquaVerify. All rights reserved.', 'aquaverify' ); ?></p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="#" class="hover:text-white"><?php esc_html_e( 'Privacy Policy', 'aquaverify' ); ?></a>
            <a href="#" class="hover:text-white"><?php esc_html_e( 'Terms of Service', 'aquaverify' ); ?></a>
            <a href="#" class="hover:text-white"><?php esc_html_e( 'Cookie Settings', 'aquaverify' ); ?></a>
          </div>
        </div>
      </div>
    </footer>

</div><!-- #page -->

<!-- Smooth Scroll Script for Anchor Links -->
<script>
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return;

            const element = document.getElementById(targetId);
            if (element) {
                const headerOffset = 85; 
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu-panel');
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
});
</script>

<!-- Lucide Icons -->
<script src="https://unpkg.com/lucide@latest"></script>
<script>
  lucide.createIcons();
</script>

<?php wp_footer(); ?>

</body>
</html>
