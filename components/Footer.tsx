import React from 'react';
import { Droplet, Linkedin, Twitter, Facebook } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { EditableText } from './admin/EditableText';
import { EditableLinkWrapper } from './admin/EditableLinkWrapper';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const href = e.currentTarget.getAttribute('href');
    if (href && !href.startsWith('#')) return;

    e.preventDefault();
    const element = document.getElementById(id);

    if (element) {
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative w-8 h-8 flex items-center justify-center bg-white rounded-full">
                <Droplet className="w-5 h-5 text-primary fill-current" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight">AquaVerify</span>
            </div>
            <EditableText
              as="p"
              sectionId="footer"
              field="tagline"
              fallback={t.footer.tagline}
              className="text-gray-400 text-sm leading-relaxed mb-6 block"
            />
            <div className="flex space-x-4">
              <EditableLinkWrapper sectionId="footer" field="url_linkedin" fallback="#"><a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a></EditableLinkWrapper>
              <EditableLinkWrapper sectionId="footer" field="url_twitter" fallback="#"><a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a></EditableLinkWrapper>
              <EditableLinkWrapper sectionId="footer" field="url_facebook" fallback="#"><a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a></EditableLinkWrapper>
            </div>
          </div>

          {/* Links */}
          <div>
            <EditableText as="h4" sectionId="footer" field="solutionsTitle" fallback={t.footer.solutions} className="font-bold text-lg mb-4 block" />
            <ul className="space-y-2 text-sm text-gray-400">
              <li><EditableLinkWrapper sectionId="footer" field="url_testingKits" fallback="#"><a href="#" className="hover:text-secondary"><EditableText as="span" sectionId="footer" field="link_testingKits" fallback="Testing Kits" /></a></EditableLinkWrapper></li>
              <li><EditableLinkWrapper sectionId="footer" field="url_lims" fallback="#"><a href="#" className="hover:text-secondary"><EditableText as="span" sectionId="footer" field="link_lims" fallback="LIMS Software" /></a></EditableLinkWrapper></li>
              <li><EditableLinkWrapper sectionId="footer" field="url_mobileApp" fallback="#"><a href="#" className="hover:text-secondary"><EditableText as="span" sectionId="footer" field="link_mobileApp" fallback="Mobile App" /></a></EditableLinkWrapper></li>
              <li><EditableLinkWrapper sectionId="footer" field="url_oemProgram" fallback="#"><a href="#" className="hover:text-secondary"><EditableText as="span" sectionId="footer" field="link_oemProgram" fallback="OEM Program" /></a></EditableLinkWrapper></li>
            </ul>
          </div>

          <div>
            <EditableText as="h4" sectionId="footer" field="companyTitle" fallback={t.footer.company} className="font-bold text-lg mb-4 block" />
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-secondary"><EditableText as="span" sectionId="footer" field="link_aboutUs" fallback="About Us" /></a></li>
              <li>
                <a
                  href="#products"
                  onClick={(e) => handleSmoothScroll(e, 'products')}
                  className="hover:text-secondary"
                >
                  <EditableText as="span" sectionId="footer" field="link_scientificValidation" fallback="Scientific Validation" />
                </a>
              </li>
              <li><a href="#" className="hover:text-secondary"><EditableText as="span" sectionId="footer" field="link_careers" fallback="Careers" /></a></li>
              <li><a href="#" className="hover:text-secondary"><EditableText as="span" sectionId="footer" field="link_contact" fallback={t.footer.contact} /></a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <EditableText as="h4" sectionId="footer" field="contactHeader" fallback={t.footer.contact} className="font-bold text-lg mb-4 block" />
            <ul className="space-y-2 text-sm text-gray-400">
              <li><EditableText as="span" sectionId="footer" field="address1" fallback="123 Science Park Drive" className="block" /></li>
              <li><EditableText as="span" sectionId="footer" field="address2" fallback="Innovation District, CA 90210" className="block" /></li>
              <li className="pt-2"><EditableText as="span" sectionId="footer" field="email" fallback="hello@aquaverify.com" className="block" /></li>
              <li><EditableText as="span" sectionId="footer" field="phone" fallback="+1 (555) 123-4567" className="block" /></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} <EditableText as="span" sectionId="footer" field="rights" fallback={t.footer.rights} /></p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <EditableLinkWrapper sectionId="footer" field="url_privacy" fallback="#"><a href="#" className="hover:text-white"><EditableText as="span" sectionId="footer" field="privacy" fallback={t.footer.privacy} /></a></EditableLinkWrapper>
            <EditableLinkWrapper sectionId="footer" field="url_terms" fallback="#"><a href="#" className="hover:text-white"><EditableText as="span" sectionId="footer" field="terms" fallback={t.footer.terms} /></a></EditableLinkWrapper>
            <EditableLinkWrapper sectionId="footer" field="url_cookie" fallback="#"><a href="#" className="hover:text-white"><EditableText as="span" sectionId="footer" field="cookie" fallback="Cookie Settings" /></a></EditableLinkWrapper>
          </div>
        </div>
      </div>
    </footer>
  );
};