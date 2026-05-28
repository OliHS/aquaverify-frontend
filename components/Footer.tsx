import React from 'react';
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
  findDistributor: string;
  glossary: string;
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
    findDistributor: 'Find a distributor',
    glossary: 'Technical glossary'
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
    findDistributor: 'Encontrar distribuidor',
    glossary: 'Glosario técnico'
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
    findDistributor: 'Trouver un distributeur',
    glossary: 'Glossaire technique'
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
    findDistributor: 'Trova distributore',
    glossary: 'Glossario tecnico'
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
    findDistributor: 'Trobar distribuïdor',
    glossary: 'Glossari tècnic'
  }
};

export const Footer: React.FC = () => {
  const { t, lang } = useLanguage();
  const copy = FOOTER_COPY[lang] || FOOTER_COPY.en;
  const privacyUrl = getPlatformLegalUrl('privacy', lang);
  const termsUrl = getPlatformLegalUrl('terms', lang);
  const loginUrl = getPlatformLoginUrl(lang);
  const signupUrl = getPlatformSignupUrl({ intent: 'signup', page: 'footer' }, lang);
  const quoteUrl = getPlatformSignupUrl({ intent: 'quote', page: 'footer' }, lang);
  const recommendationUrl = getPlatformSignupUrl({ intent: 'product_recommendation', page: 'footer' }, lang);
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
              <li><a href={distributorsUrl} className={linkClass}>{copy.findDistributor}</a></li>
              <li><a href={glossaryUrl} className={linkClass}>{copy.glossary}</a></li>
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
