import React from 'react';
import { Linkedin, Twitter, Facebook } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePageContent } from '../context/PageContentContext';
import { EditableText } from './admin/EditableText';
import { EditableLinkWrapper } from './admin/EditableLinkWrapper';
import { getPlatformLegalUrl, getPlatformSignupUrl } from '../utils/platformLinks';

const logoSrc = '/images/logo-mark-160.png';

export const Footer: React.FC = () => {
  const { t, lang } = useLanguage();
  const { blocks, isEditing } = usePageContent();
  const privacyUrl = getPlatformLegalUrl('privacy', lang);
  const termsUrl = getPlatformLegalUrl(undefined, lang);
  const cookiesUrl = getPlatformLegalUrl('cookies', lang);
  const contactUrl = getPlatformSignupUrl({ intent: 'contact' }, lang);
  const careersUrl = getPlatformSignupUrl({ intent: 'careers' }, lang);
  const footerBlock = blocks.footer || {};
  const hasConfiguredHref = (field: string) => {
    const value = footerBlock[field];
    return typeof value === 'string' && value.trim() !== '' && value.trim() !== '#';
  };
  const showLinkedin = isEditing || hasConfiguredHref('url_linkedin');
  const showTwitter = isEditing || hasConfiguredHref('url_twitter');
  const showFacebook = isEditing || hasConfiguredHref('url_facebook');
  const showSocialLinks = showLinkedin || showTwitter || showFacebook;

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
                <img
                  src={logoSrc}
                  alt=""
                  width={25}
                  height={32}
                  className="h-7 w-auto object-contain"
                />
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
            {showSocialLinks && (
              <div className="flex space-x-4">
                {showLinkedin && <EditableLinkWrapper sectionId="footer" field="url_linkedin" fallback="#"><a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a></EditableLinkWrapper>}
                {showTwitter && <EditableLinkWrapper sectionId="footer" field="url_twitter" fallback="#"><a href="#" target="_blank" rel="noopener noreferrer" aria-label="X" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a></EditableLinkWrapper>}
                {showFacebook && <EditableLinkWrapper sectionId="footer" field="url_facebook" fallback="#"><a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a></EditableLinkWrapper>}
              </div>
            )}
          </div>

          {/* Links */}
          <div>
            <EditableText as="h4" sectionId="footer" field="solutionsTitle" fallback={t.footer.solutions} className="font-bold text-lg mb-4 block" />
            <ul className="space-y-2 text-sm text-gray-400">
              <li><EditableLinkWrapper sectionId="footer" field="url_testingKits" fallback="#products" legacyFallbacks={['#']}><a href="#products" onClick={(e) => handleSmoothScroll(e, 'products')} className="hover:text-secondary"><EditableText as="span" sectionId="footer" field="link_testingKits" fallback="Testing Kits" /></a></EditableLinkWrapper></li>
              <li><EditableLinkWrapper sectionId="footer" field="url_lims" fallback="#platform" legacyFallbacks={['#']}><a href="#platform" onClick={(e) => handleSmoothScroll(e, 'platform')} className="hover:text-secondary"><EditableText as="span" sectionId="footer" field="link_lims" fallback="LIMS Software" /></a></EditableLinkWrapper></li>
              <li><EditableLinkWrapper sectionId="footer" field="url_mobileApp" fallback="#platform" legacyFallbacks={['#']}><a href="#platform" onClick={(e) => handleSmoothScroll(e, 'platform')} className="hover:text-secondary"><EditableText as="span" sectionId="footer" field="link_mobileApp" fallback="Mobile App" /></a></EditableLinkWrapper></li>
              <li><EditableLinkWrapper sectionId="footer" field="url_oemProgram" fallback="#oem" legacyFallbacks={['#']}><a href="#oem" onClick={(e) => handleSmoothScroll(e, 'oem')} className="hover:text-secondary"><EditableText as="span" sectionId="footer" field="link_oemProgram" fallback="OEM Program" /></a></EditableLinkWrapper></li>
            </ul>
          </div>

          <div>
            <EditableText as="h4" sectionId="footer" field="companyTitle" fallback={t.footer.company} className="font-bold text-lg mb-4 block" />
            <ul className="space-y-2 text-sm text-gray-400">
              <li><EditableLinkWrapper sectionId="footer" field="url_aboutUs" fallback="#solutions" legacyFallbacks={['#']}><a href="#solutions" onClick={(e) => handleSmoothScroll(e, 'solutions')} className="hover:text-secondary"><EditableText as="span" sectionId="footer" field="link_aboutUs" fallback="About Us" /></a></EditableLinkWrapper></li>
              <li>
                <EditableLinkWrapper sectionId="footer" field="url_scientificValidation" fallback="#products" legacyFallbacks={['#']}>
                  <a
                    href="#products"
                    onClick={(e) => handleSmoothScroll(e, 'products')}
                    className="hover:text-secondary"
                  >
                    <EditableText as="span" sectionId="footer" field="link_scientificValidation" fallback="Scientific Validation" />
                  </a>
                </EditableLinkWrapper>
              </li>
              <li><EditableLinkWrapper sectionId="footer" field="url_careers" fallback={careersUrl} legacyFallbacks={['#']}><a href={careersUrl} className="hover:text-secondary"><EditableText as="span" sectionId="footer" field="link_careers" fallback="Careers" /></a></EditableLinkWrapper></li>
              <li><EditableLinkWrapper sectionId="footer" field="url_contact" fallback={contactUrl} legacyFallbacks={['#', '#contact']}><a href={contactUrl} className="hover:text-secondary"><EditableText as="span" sectionId="footer" field="link_contact" fallback={t.footer.contact} /></a></EditableLinkWrapper></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <EditableText as="h4" sectionId="footer" field="contactHeader" fallback={t.footer.contact} className="font-bold text-lg mb-4 block" />
            <ul className="space-y-2 text-sm text-gray-400">
              <li><EditableText as="span" sectionId="footer" field="address1" fallback="Corporate enquiries" className="block" /></li>
              <li><EditableText as="span" sectionId="footer" field="address2" fallback="Sales, distributors and OEM partnerships" className="block" /></li>
              <li className="pt-2"><EditableText as="span" sectionId="footer" field="email" fallback="hello@aquaverify.com" className="block" /></li>
              <li><EditableText as="span" sectionId="footer" field="phone" fallback="Use the contact form for the fastest response" className="block" /></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} <EditableText as="span" sectionId="footer" field="rights" fallback={t.footer.rights} /></p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <EditableLinkWrapper sectionId="footer" field="url_privacy" fallback={privacyUrl} legacyFallbacks={['#']}><a href={privacyUrl} className="hover:text-white"><EditableText as="span" sectionId="footer" field="privacy" fallback={t.footer.privacy} /></a></EditableLinkWrapper>
            <EditableLinkWrapper sectionId="footer" field="url_terms" fallback={termsUrl} legacyFallbacks={['#']}><a href={termsUrl} className="hover:text-white"><EditableText as="span" sectionId="footer" field="terms" fallback={t.footer.terms} /></a></EditableLinkWrapper>
            <EditableLinkWrapper sectionId="footer" field="url_cookie" fallback={cookiesUrl} legacyFallbacks={['#']}><a href={cookiesUrl} className="hover:text-white"><EditableText as="span" sectionId="footer" field="cookie" fallback="Cookie Settings" /></a></EditableLinkWrapper>
          </div>
        </div>
      </div>
    </footer>
  );
};
