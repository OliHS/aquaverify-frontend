import React from 'react';
import { Linkedin, Twitter, Facebook } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePageContent } from '../context/PageContentContext';
import { EditableText } from './admin/EditableText';
import { EditableLinkWrapper } from './admin/EditableLinkWrapper';
import { LEGACY_PLATFORM_SIGNUP_URLS, getPlatformLegalUrl, getPlatformSignupUrl } from '../utils/platformLinks';
import { OPEN_COOKIE_PREFERENCES_EVENT } from './CookieConsent';
import { getMarketingPagePath } from '../utils/marketingRoutes.js';
import type { Language } from '../utils/translations';

const logoSrc = '/images/logo-mark-160.png';
const LEGACY_CONTACT_FORM_HELPER = 'Use the contact form for the fastest response';

const FOOTER_COPY: Record<Language, {
  enumera: string;
  indica: string;
  standardKits: string;
  labEssentials: string;
  privateLabel: string;
  labs: string;
  quality: string;
  municipal: string;
  foodBeverage: string;
  industrial: string;
  facilities: string;
  resources: string;
  presenceEnumeration: string;
  traceabilityGuide: string;
  distributorChecklist: string;
  epa: string;
  indicators: string;
}> = {
  en: {
    enumera: 'ENUMERA kits',
    indica: 'INDICA kits',
    standardKits: 'ISO/EPA kits',
    labEssentials: 'Lab Essentials',
    privateLabel: 'Private-label kits',
    labs: 'Water testing labs',
    quality: 'Quality teams',
    municipal: 'Municipal water',
    foodBeverage: 'Food & beverage',
    industrial: 'Industrial process water',
    facilities: 'Facilities',
    resources: 'Resources',
    presenceEnumeration: 'Presence vs enumeration',
    traceabilityGuide: 'Sample traceability',
    distributorChecklist: 'Distributor checklist',
    epa: 'EPA workflows',
    indicators: 'Coliphage indicators'
  },
  es: {
    enumera: 'Kits ENUMERA',
    indica: 'Kits INDICA',
    standardKits: 'Kits ISO/EPA',
    labEssentials: 'Lab Essentials',
    privateLabel: 'Kits marca blanca',
    labs: 'Laboratorios de agua',
    quality: 'Equipos de calidad',
    municipal: 'Agua municipal',
    foodBeverage: 'Alimentación y bebidas',
    industrial: 'Agua de proceso industrial',
    facilities: 'Instalaciones',
    resources: 'Recursos',
    presenceEnumeration: 'Presencia vs enumeración',
    traceabilityGuide: 'Trazabilidad de muestras',
    distributorChecklist: 'Checklist distribuidores',
    epa: 'Flujos EPA',
    indicators: 'Indicadores colífagos'
  },
  fr: {
    enumera: 'Kits ENUMERA',
    indica: 'Kits INDICA',
    standardKits: 'Kits ISO/EPA',
    labEssentials: 'Lab Essentials',
    privateLabel: 'Kits marque blanche',
    labs: 'Laboratoires eau',
    quality: 'Équipes qualité',
    municipal: 'Eau municipale',
    foodBeverage: 'Agroalimentaire',
    industrial: 'Eau de process',
    facilities: 'Bâtiments',
    resources: 'Ressources',
    presenceEnumeration: 'Présence vs dénombrement',
    traceabilityGuide: 'Traçabilité échantillons',
    distributorChecklist: 'Checklist distributeurs',
    epa: 'Flux EPA',
    indicators: 'Indicateurs coliphages'
  },
  it: {
    enumera: 'Kit ENUMERA',
    indica: 'Kit INDICA',
    standardKits: 'Kit ISO/EPA',
    labEssentials: 'Lab Essentials',
    privateLabel: 'Kit private label',
    labs: 'Laboratori acqua',
    quality: 'Team qualità',
    municipal: 'Acqua municipale',
    foodBeverage: 'Food & beverage',
    industrial: 'Acqua di processo',
    facilities: 'Strutture',
    resources: 'Risorse',
    presenceEnumeration: 'Presenza vs enumerazione',
    traceabilityGuide: 'Tracciabilità campioni',
    distributorChecklist: 'Checklist distributori',
    epa: 'Flussi EPA',
    indicators: 'Indicatori colifagi'
  },
  ca: {
    enumera: 'Kits ENUMERA',
    indica: 'Kits INDICA',
    standardKits: 'Kits ISO/EPA',
    labEssentials: 'Lab Essentials',
    privateLabel: 'Kits marca blanca',
    labs: 'Laboratoris d’aigua',
    quality: 'Equips de qualitat',
    municipal: 'Aigua municipal',
    foodBeverage: 'Alimentació i begudes',
    industrial: 'Aigua de procés',
    facilities: 'Instal·lacions',
    resources: 'Recursos',
    presenceEnumeration: 'Presència vs enumeració',
    traceabilityGuide: 'Traçabilitat de mostres',
    distributorChecklist: 'Checklist distribuïdors',
    epa: 'Fluxos EPA',
    indicators: 'Indicadors colífags'
  }
};

export const Footer: React.FC = () => {
  const { t, lang } = useLanguage();
  const { blocks, isEditing } = usePageContent();
  const copy = FOOTER_COPY[lang] || FOOTER_COPY.en;
  const privacyUrl = getPlatformLegalUrl('privacy', lang);
  const termsUrl = getPlatformLegalUrl('terms', lang);
  const contactUrl = getPlatformSignupUrl({ intent: 'contact' }, lang);
  const careersUrl = getPlatformSignupUrl({ intent: 'careers' }, lang);
  const productsUrl = getMarketingPagePath('products', lang);
  const enumeraUrl = getMarketingPagePath('enumera', lang);
  const indicaUrl = getMarketingPagePath('indica', lang);
  const standardKitsUrl = getMarketingPagePath('standard-kits', lang);
  const labEssentialsUrl = getMarketingPagePath('lab-essentials', lang);
  const platformUrl = getMarketingPagePath('platform', lang);
  const oemUrl = getMarketingPagePath('oem', lang);
  const privateLabelUrl = getMarketingPagePath('private-label-kits', lang);
  const distributorsUrl = getMarketingPagePath('distributors', lang);
  const labsUrl = getMarketingPagePath('water-testing-labs', lang);
  const qualityUrl = getMarketingPagePath('water-quality-control', lang);
  const municipalUrl = getMarketingPagePath('municipal-water-testing', lang);
  const foodBeverageUrl = getMarketingPagePath('food-beverage-water-quality', lang);
  const industrialUrl = getMarketingPagePath('industrial-process-water', lang);
  const facilitiesUrl = getMarketingPagePath('facility-water-risk', lang);
  const aboutUrl = getMarketingPagePath('about', lang);
  const resourcesUrl = getMarketingPagePath('resources', lang);
  const isoResourceUrl = getMarketingPagePath('iso-10705-2', lang);
  const epaResourceUrl = getMarketingPagePath('epa-1602', lang);
  const indicatorResourceUrl = getMarketingPagePath('coliphages-indicators', lang);
  const presenceEnumerationUrl = getMarketingPagePath('presence-vs-enumeration', lang);
  const traceabilityGuideUrl = getMarketingPagePath('sample-traceability', lang);
  const distributorChecklistUrl = getMarketingPagePath('distributor-checklist', lang);
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

  const openCookiePreferences = () => {
    window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES_EVENT));
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
              <li><EditableLinkWrapper sectionId="footer" field="url_testingKits" fallback={productsUrl} legacyFallbacks={['#']}><a href={productsUrl} onClick={(e) => handleSmoothScroll(e, 'products')} className="hover:text-secondary"><EditableText as="span" sectionId="footer" field="link_testingKits" fallback="Testing Kits" /></a></EditableLinkWrapper></li>
              <li><a href={enumeraUrl} className="hover:text-secondary">{copy.enumera}</a></li>
              <li><a href={indicaUrl} className="hover:text-secondary">{copy.indica}</a></li>
              <li><a href={standardKitsUrl} className="hover:text-secondary">{copy.standardKits}</a></li>
              <li><a href={labEssentialsUrl} className="hover:text-secondary">{copy.labEssentials}</a></li>
              <li><EditableLinkWrapper sectionId="footer" field="url_lims" fallback={platformUrl} legacyFallbacks={['#']}><a href={platformUrl} onClick={(e) => handleSmoothScroll(e, 'platform')} className="hover:text-secondary"><EditableText as="span" sectionId="footer" field="link_lims" fallback="LIMS Software" /></a></EditableLinkWrapper></li>
              <li><EditableLinkWrapper sectionId="footer" field="url_oemProgram" fallback={oemUrl} legacyFallbacks={['#']}><a href={oemUrl} onClick={(e) => handleSmoothScroll(e, 'oem')} className="hover:text-secondary"><EditableText as="span" sectionId="footer" field="link_oemProgram" fallback="OEM Program" /></a></EditableLinkWrapper></li>
              <li><a href={privateLabelUrl} className="hover:text-secondary">{copy.privateLabel}</a></li>
            </ul>
          </div>

          <div>
            <EditableText as="h4" sectionId="footer" field="companyTitle" fallback={t.footer.company} className="font-bold text-lg mb-4 block" />
            <ul className="space-y-2 text-sm text-gray-400">
              <li><EditableLinkWrapper sectionId="footer" field="url_aboutUs" fallback={aboutUrl} legacyFallbacks={['#']}><a href={aboutUrl} onClick={(e) => handleSmoothScroll(e, 'solutions')} className="hover:text-secondary"><EditableText as="span" sectionId="footer" field="link_aboutUs" fallback="About Us" /></a></EditableLinkWrapper></li>
              <li><a href={labsUrl} className="hover:text-secondary">{copy.labs}</a></li>
              <li><a href={qualityUrl} className="hover:text-secondary">{copy.quality}</a></li>
              <li><a href={municipalUrl} className="hover:text-secondary">{copy.municipal}</a></li>
              <li><a href={foodBeverageUrl} className="hover:text-secondary">{copy.foodBeverage}</a></li>
              <li><a href={industrialUrl} className="hover:text-secondary">{copy.industrial}</a></li>
              <li><a href={facilitiesUrl} className="hover:text-secondary">{copy.facilities}</a></li>
              <li><a href={distributorsUrl} className="hover:text-secondary">{t.nav.distributors}</a></li>
              <li><a href={resourcesUrl} className="hover:text-secondary">{copy.resources}</a></li>
              <li>
                <EditableLinkWrapper sectionId="footer" field="url_scientificValidation" fallback={isoResourceUrl} legacyFallbacks={['#']}>
                  <a
                    href={isoResourceUrl}
                    onClick={(e) => handleSmoothScroll(e, 'products')}
                    className="hover:text-secondary"
                  >
                    <EditableText as="span" sectionId="footer" field="link_scientificValidation" fallback="Scientific Validation" />
                  </a>
                </EditableLinkWrapper>
              </li>
              <li><a href={epaResourceUrl} className="hover:text-secondary">{copy.epa}</a></li>
              <li><a href={indicatorResourceUrl} className="hover:text-secondary">{copy.indicators}</a></li>
              <li><a href={presenceEnumerationUrl} className="hover:text-secondary">{copy.presenceEnumeration}</a></li>
              <li><a href={traceabilityGuideUrl} className="hover:text-secondary">{copy.traceabilityGuide}</a></li>
              <li><a href={distributorChecklistUrl} className="hover:text-secondary">{copy.distributorChecklist}</a></li>
              <li><EditableLinkWrapper sectionId="footer" field="url_careers" fallback={careersUrl} legacyFallbacks={['#', ...LEGACY_PLATFORM_SIGNUP_URLS]}><a href={careersUrl} className="hover:text-secondary"><EditableText as="span" sectionId="footer" field="link_careers" fallback="Careers" /></a></EditableLinkWrapper></li>
              <li><EditableLinkWrapper sectionId="footer" field="url_contact" fallback={contactUrl} legacyFallbacks={['#', ...LEGACY_PLATFORM_SIGNUP_URLS]}><a href={contactUrl} className="hover:text-secondary"><EditableText as="span" sectionId="footer" field="link_contact" fallback={t.footer.contact} /></a></EditableLinkWrapper></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <EditableText as="h4" sectionId="footer" field="contactHeader" fallback={t.footer.contact} className="font-bold text-lg mb-4 block" />
            <ul className="space-y-2 text-sm text-gray-400">
              <li><EditableText as="span" sectionId="footer" field="address1" fallback="Corporate enquiries" className="block" /></li>
              <li><EditableText as="span" sectionId="footer" field="address2" fallback="Sales, distributors and OEM partnerships" className="block" /></li>
              <li className="pt-2"><EditableText as="span" sectionId="footer" field="email" fallback="info@aquaverify.com" className="block" /></li>
              <li>
                <EditableText
                  as="span"
                  sectionId="footer"
                  field="phone"
                  fallback={t.footer.contactHelper}
                  legacyFallbacks={[LEGACY_CONTACT_FORM_HELPER]}
                  className="block"
                />
              </li>
              <li className="pt-1">
                <EditableLinkWrapper
                  sectionId="footer"
                  field="url_contact"
                  fallback={contactUrl}
                  legacyFallbacks={['#', ...LEGACY_PLATFORM_SIGNUP_URLS]}
                >
                  <a href={contactUrl} className="font-bold text-secondary transition-colors hover:text-white">
                    <EditableText as="span" sectionId="footer" field="link_contactRequest" fallback={t.footer.contactRequest} />
                  </a>
                </EditableLinkWrapper>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} <EditableText as="span" sectionId="footer" field="rights" fallback={t.footer.rights} /></p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <EditableLinkWrapper sectionId="footer" field="url_privacy" fallback={privacyUrl} legacyFallbacks={['#']}><a href={privacyUrl} className="hover:text-white"><EditableText as="span" sectionId="footer" field="privacy" fallback={t.footer.privacy} /></a></EditableLinkWrapper>
            <EditableLinkWrapper sectionId="footer" field="url_terms" fallback={termsUrl} legacyFallbacks={['#']}><a href={termsUrl} className="hover:text-white"><EditableText as="span" sectionId="footer" field="terms" fallback={t.footer.terms} /></a></EditableLinkWrapper>
            <button type="button" onClick={openCookiePreferences} className="hover:text-white">
              <EditableText as="span" sectionId="footer" field="cookie" fallback={t.footer.cookie} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
