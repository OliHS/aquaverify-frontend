import React from 'react';
import { Linkedin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { EditableText } from './admin/EditableText';
import { EditableLinkWrapper } from './admin/EditableLinkWrapper';
import { LEGACY_PLATFORM_LOGIN_URLS, LEGACY_PLATFORM_SIGNUP_URLS, getPlatformLegalUrl, getPlatformLoginUrl, getPlatformSignupUrl } from '../utils/platformLinks';
import { OPEN_COOKIE_PREFERENCES_EVENT } from './CookieConsent';
import { getMarketingPagePath } from '../utils/marketingRoutes.js';
import type { Language } from '../utils/translations';

const FOOTER_COPY: Record<Language, {
  tagline: string;
  productsTitle: string;
  allProducts: string;
  enumera: string;
  indica: string;
  standardKits: string;
  labEssentials: string;
  cloud: string;
  industriesTitle: string;
  industriesHub: string;
  labs: string;
  municipal: string;
  foodBeverage: string;
  industrial: string;
  partnersTitle: string;
  distributors: string;
  oem: string;
  signIn: string;
  signUp: string;
  actionTitle: string;
  quote: string;
  recommendation: string;
  advisor: string;
  findDistributor: string;
  about: string;
  contact: string;
  resources: string;
  glossary: string;
  tools: string;
  linkedinLabel: string;
  blueskyLabel: string;
}> = {
  en: {
    tagline: 'Innovative products for detecting viruses and bacteria in water, connected with AquaVerify Cloud, authorized distributors and OEM programs.',
    productsTitle: 'Products',
    allProducts: 'All products',
    enumera: 'ENUMERA',
    indica: 'INDICA',
    standardKits: 'ISO/EPA kits',
    labEssentials: 'Lab Essentials',
    cloud: 'AquaVerify Cloud',
    industriesTitle: 'Industries',
    industriesHub: 'View industries',
    labs: 'Laboratories',
    municipal: 'Municipal',
    foodBeverage: 'Food & beverage',
    industrial: 'Industrial process',
    partnersTitle: 'Partners',
    distributors: 'Distributors',
    oem: 'OEM and private label',
    signIn: 'Sign in',
    signUp: 'Sign up',
    actionTitle: 'Action',
    quote: 'Request quote',
    recommendation: 'Request technical recommendation',
    advisor: 'Assess workflow',
    findDistributor: 'Find a distributor',
    about: 'About AquaVerify',
    contact: 'Contact',
    resources: 'Resources',
    glossary: 'Technical glossary',
    tools: 'Free tools',
    linkedinLabel: 'Follow AquaVerify on LinkedIn',
    blueskyLabel: 'Follow AquaVerify on Bluesky'
  },
  es: {
    tagline: 'Productos innovadores para la detección de virus y bacterias en el agua, conectados con AquaVerify Cloud, distribuidores autorizados y programas OEM.',
    productsTitle: 'Productos',
    allProducts: 'Todos los productos',
    enumera: 'ENUMERA',
    indica: 'INDICA',
    standardKits: 'Kits ISO/EPA',
    labEssentials: 'Lab Essentials',
    cloud: 'AquaVerify Cloud',
    industriesTitle: 'Industrias',
    industriesHub: 'Ver industrias',
    labs: 'Laboratorios',
    municipal: 'Municipal',
    foodBeverage: 'Alimentación y bebidas',
    industrial: 'Proceso industrial',
    partnersTitle: 'Partners',
    distributors: 'Distribuidores',
    oem: 'OEM y marca blanca',
    signIn: 'Sign in',
    signUp: 'Sign up',
    actionTitle: 'Acción',
    quote: 'Solicitar cotización',
    recommendation: 'Solicitar recomendación técnica',
    advisor: 'Diagnosticar flujo',
    findDistributor: 'Encontrar distribuidor',
    about: 'Sobre AquaVerify',
    contact: 'Contacto',
    resources: 'Recursos',
    glossary: 'Glosario técnico',
    tools: 'Herramientas gratuitas',
    linkedinLabel: 'Seguir a AquaVerify en LinkedIn',
    blueskyLabel: 'Seguir a AquaVerify en Bluesky'
  },
  fr: {
    tagline: 'Produits innovants pour la détection de virus et bactéries dans l’eau, connectés à AquaVerify Cloud, distributeurs autorisés et programmes OEM.',
    productsTitle: 'Produits',
    allProducts: 'Tous les produits',
    enumera: 'ENUMERA',
    indica: 'INDICA',
    standardKits: 'Kits ISO/EPA',
    labEssentials: 'Lab Essentials',
    cloud: 'AquaVerify Cloud',
    industriesTitle: 'Industries',
    industriesHub: 'Voir les industries',
    labs: 'Laboratoires',
    municipal: 'Municipal',
    foodBeverage: 'Agroalimentaire',
    industrial: 'Process industriel',
    partnersTitle: 'Partenaires',
    distributors: 'Distributeurs',
    oem: 'OEM et marque blanche',
    signIn: 'Sign in',
    signUp: 'Sign up',
    actionTitle: 'Action',
    quote: 'Demander un devis',
    recommendation: 'Demander une recommandation technique',
    advisor: 'Diagnostiquer le flux',
    findDistributor: 'Trouver un distributeur',
    about: 'À propos d’AquaVerify',
    contact: 'Contact',
    resources: 'Ressources',
    glossary: 'Glossaire technique',
    tools: 'Outils gratuits',
    linkedinLabel: 'Suivre AquaVerify sur LinkedIn',
    blueskyLabel: 'Suivre AquaVerify sur Bluesky'
  },
  it: {
    tagline: 'Prodotti innovativi per la rilevazione di virus e batteri nell’acqua, connessi ad AquaVerify Cloud, distributori autorizzati e programmi OEM.',
    productsTitle: 'Prodotti',
    allProducts: 'Tutti i prodotti',
    enumera: 'ENUMERA',
    indica: 'INDICA',
    standardKits: 'Kit ISO/EPA',
    labEssentials: 'Lab Essentials',
    cloud: 'AquaVerify Cloud',
    industriesTitle: 'Settori',
    industriesHub: 'Vedi settori',
    labs: 'Laboratori',
    municipal: 'Municipale',
    foodBeverage: 'Food & beverage',
    industrial: 'Processo industriale',
    partnersTitle: 'Partner',
    distributors: 'Distributori',
    oem: 'OEM e private label',
    signIn: 'Sign in',
    signUp: 'Sign up',
    actionTitle: 'Azione',
    quote: 'Richiedi preventivo',
    recommendation: 'Richiedi raccomandazione tecnica',
    advisor: 'Valuta workflow',
    findDistributor: 'Trova distributore',
    about: 'Chi siamo',
    contact: 'Contatto',
    resources: 'Risorse',
    glossary: 'Glossario tecnico',
    tools: 'Strumenti gratuiti',
    linkedinLabel: 'Segui AquaVerify su LinkedIn',
    blueskyLabel: 'Segui AquaVerify su Bluesky'
  },
  ca: {
    tagline: 'Productes innovadors per a la detecció de virus i bacteris a l’aigua, connectats amb AquaVerify Cloud, distribuïdors autoritzats i programes OEM.',
    productsTitle: 'Productes',
    allProducts: 'Tots els productes',
    enumera: 'ENUMERA',
    indica: 'INDICA',
    standardKits: 'Kits ISO/EPA',
    labEssentials: 'Lab Essentials',
    cloud: 'AquaVerify Cloud',
    industriesTitle: 'Sectors',
    industriesHub: 'Veure sectors',
    labs: 'Laboratoris',
    municipal: 'Municipal',
    foodBeverage: 'Alimentació i begudes',
    industrial: 'Procés industrial',
    partnersTitle: 'Partners',
    distributors: 'Distribuïdors',
    oem: 'OEM i marca blanca',
    signIn: 'Sign in',
    signUp: 'Sign up',
    actionTitle: 'Acció',
    quote: 'Sol·licitar pressupost',
    recommendation: 'Sol·licitar recomanació tècnica',
    advisor: 'Diagnosticar flux',
    findDistributor: 'Trobar distribuïdor',
    about: 'Sobre AquaVerify',
    contact: 'Contacte',
    resources: 'Recursos',
    glossary: 'Glossari tècnic',
    tools: 'Eines gratuïtes',
    linkedinLabel: 'Segueix AquaVerify a LinkedIn',
    blueskyLabel: 'Segueix AquaVerify a Bluesky'
  }
};

const LINKEDIN_PROFILE_URL = 'https://www.linkedin.com/company/aquaverify';
const BLUESKY_PROFILE_URL = 'https://bsky.app/profile/aquaverify.com';

const BlueskyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    aria-hidden="true"
    className={className}
    focusable="false"
    viewBox="0 0 568 501"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M123.121 33.6637C188.241 82.5526 258.281 181.681 284 234.873C309.719 181.681 379.759 82.5526 444.879 33.6637C491.866 -1.61183 568 -28.9064 568 57.9464C568 75.2916 558.055 203.659 552.222 224.501C531.947 296.954 458.067 315.434 392.347 304.249C507.222 323.8 536.444 388.56 473.333 453.32C353.473 576.312 301.061 422.461 287.631 383.039C285.169 375.812 284.017 372.431 284 375.306C283.983 372.431 282.831 375.812 280.369 383.039C266.939 422.461 214.527 576.312 94.6667 453.32C31.5556 388.56 60.7778 323.8 175.653 304.249C109.933 315.434 36.0535 296.954 15.7778 224.501C9.94525 203.659 0 75.2916 0 57.9464C0 -28.9064 76.1345 -1.61183 123.121 33.6637Z"
      fill="currentColor"
    />
  </svg>
);

export const Footer: React.FC = () => {
  const { t, lang } = useLanguage();
  const copy = FOOTER_COPY[lang] || FOOTER_COPY.en;
  const privacyUrl = getPlatformLegalUrl('privacy', lang);
  const termsUrl = getPlatformLegalUrl('terms', lang);
  const loginUrl = getPlatformLoginUrl(lang);
  const signupUrl = getPlatformSignupUrl({ intent: 'signup', page: 'footer' }, lang);
  const quoteUrl = getPlatformSignupUrl({ intent: 'quote', page: 'footer' }, lang);
  const recommendationUrl = getPlatformSignupUrl({ intent: 'product_recommendation', page: 'footer' }, lang);
  const advisorUrl = getMarketingPagePath('workflow-advisor', lang);
  const productsUrl = getMarketingPagePath('products', lang);
  const enumeraUrl = getMarketingPagePath('enumera', lang);
  const indicaUrl = getMarketingPagePath('indica', lang);
  const standardKitsUrl = getMarketingPagePath('standard-kits', lang);
  const labEssentialsUrl = getMarketingPagePath('lab-essentials', lang);
  const platformUrl = getMarketingPagePath('platform', lang);
  const oemUrl = getMarketingPagePath('oem', lang);
  const distributorsUrl = getMarketingPagePath('distributors', lang);
  const industriesUrl = getMarketingPagePath('industries-hub', lang);
  const labsUrl = getMarketingPagePath('water-testing-labs', lang);
  const municipalUrl = getMarketingPagePath('municipal-water-testing', lang);
  const foodBeverageUrl = getMarketingPagePath('food-beverage-water-quality', lang);
  const industrialUrl = getMarketingPagePath('industrial-process-water', lang);
  const glossaryUrl = getMarketingPagePath('glossary', lang);
  const aboutUrl = getMarketingPagePath('about', lang);
  const contactUrl = getMarketingPagePath('contact', lang);
  const resourcesUrl = getMarketingPagePath('resources', lang);
  const toolsUrl = getMarketingPagePath('aquatools', lang);

  const openCookiePreferences = () => {
    window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES_EVENT));
  };

  const linkClass = 'transition-colors hover:text-secondary';

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.25fr_repeat(4,minmax(0,1fr))] mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="font-heading font-bold text-xl tracking-tight">
                Aqua<span className="text-secondary">Verify</span>
              </span>
            </div>
            <p className="max-w-sm text-sm leading-6 text-gray-400">{copy.tagline}</p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">{copy.productsTitle}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href={productsUrl} className={linkClass}>{copy.allProducts}</a></li>
              <li><a href={enumeraUrl} className={linkClass}>{copy.enumera}</a></li>
              <li><a href={indicaUrl} className={linkClass}>{copy.indica}</a></li>
              <li><a href={standardKitsUrl} className={linkClass}>{copy.standardKits}</a></li>
              <li><a href={labEssentialsUrl} className={linkClass}>{copy.labEssentials}</a></li>
              <li><a href={platformUrl} className={linkClass}>{copy.cloud}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">{copy.industriesTitle}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href={industriesUrl} className={linkClass}>{copy.industriesHub}</a></li>
              <li><a href={labsUrl} className={linkClass}>{copy.labs}</a></li>
              <li><a href={municipalUrl} className={linkClass}>{copy.municipal}</a></li>
              <li><a href={foodBeverageUrl} className={linkClass}>{copy.foodBeverage}</a></li>
              <li><a href={industrialUrl} className={linkClass}>{copy.industrial}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">{copy.partnersTitle}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href={distributorsUrl} className={linkClass}>{copy.distributors}</a></li>
              <li><a href={oemUrl} className={linkClass}>{copy.oem}</a></li>
              <li><EditableLinkWrapper sectionId="footer" field="url_login" fallback={loginUrl} legacyFallbacks={LEGACY_PLATFORM_LOGIN_URLS}><a href={loginUrl} className={linkClass}>{copy.signIn}</a></EditableLinkWrapper></li>
              <li><EditableLinkWrapper sectionId="footer" field="url_signup" fallback={signupUrl} legacyFallbacks={LEGACY_PLATFORM_SIGNUP_URLS}><a href={signupUrl} className={linkClass}>{copy.signUp}</a></EditableLinkWrapper></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">{copy.actionTitle}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <EditableLinkWrapper
                  sectionId="footer"
                  field="url_quote"
                  fallback={quoteUrl}
                  legacyFallbacks={['#', ...LEGACY_PLATFORM_SIGNUP_URLS]}
                >
                  <a href={quoteUrl} className="font-bold text-secondary transition-colors hover:text-white">{copy.quote}</a>
                </EditableLinkWrapper>
              </li>
              <li>
                <EditableLinkWrapper
                  sectionId="footer"
                  field="url_recommendation"
                  fallback={recommendationUrl}
                  legacyFallbacks={['#', ...LEGACY_PLATFORM_SIGNUP_URLS]}
                >
                  <a href={recommendationUrl} className={linkClass}>{copy.recommendation}</a>
                </EditableLinkWrapper>
              </li>
              <li><a href={advisorUrl} className={linkClass}>{copy.advisor}</a></li>
              <li><a href={distributorsUrl} className={linkClass}>{copy.findDistributor}</a></li>
              <li><a href={aboutUrl} className={linkClass}>{copy.about}</a></li>
              <li><a href={contactUrl} className={linkClass}>{copy.contact}</a></li>
              <li><a href={resourcesUrl} className={linkClass}>{copy.resources}</a></li>
              <li><a href={toolsUrl} className={linkClass}>{copy.tools}</a></li>
              <li><a href={glossaryUrl} className={linkClass}>{copy.glossary}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col gap-4 md:flex-row md:justify-between md:items-center text-xs text-gray-500">
          <p className="text-center md:text-left">&copy; {new Date().getFullYear()} <EditableText as="span" sectionId="footer" field="rights" fallback={t.footer.rights} /></p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:justify-end">
            <div className="flex items-center gap-2">
              <EditableLinkWrapper sectionId="footer" field="url_linkedin" fallback={LINKEDIN_PROFILE_URL} legacyFallbacks={['#']}>
                <a
                  href={LINKEDIN_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={copy.linkedinLabel}
                  title={copy.linkedinLabel}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-colors hover:border-gray-500 hover:bg-gray-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                >
                  <Linkedin aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2.25} />
                </a>
              </EditableLinkWrapper>
              <EditableLinkWrapper sectionId="footer" field="url_bluesky" fallback={BLUESKY_PROFILE_URL} legacyFallbacks={['#']}>
                <a
                  href={BLUESKY_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={copy.blueskyLabel}
                  title={copy.blueskyLabel}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-colors hover:border-gray-500 hover:bg-gray-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                >
                  <BlueskyIcon className="h-[18px] w-5" />
                </a>
              </EditableLinkWrapper>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <EditableLinkWrapper sectionId="footer" field="url_privacy" fallback={privacyUrl} legacyFallbacks={['#']}><a href={privacyUrl} className="transition-colors hover:text-white"><EditableText as="span" sectionId="footer" field="privacy" fallback={t.footer.privacy} /></a></EditableLinkWrapper>
              <EditableLinkWrapper sectionId="footer" field="url_terms" fallback={termsUrl} legacyFallbacks={['#']}><a href={termsUrl} className="transition-colors hover:text-white"><EditableText as="span" sectionId="footer" field="terms" fallback={t.footer.terms} /></a></EditableLinkWrapper>
              <button type="button" onClick={openCookiePreferences} className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900">
                <EditableText as="span" sectionId="footer" field="cookie" fallback={t.footer.cookie} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
