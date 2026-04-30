import type { Language } from './translations';

export const CORPORATE_SITE_URL = 'https://aquaverify.com';
export const SUPPORTED_SEO_LANGUAGES: Language[] = ['en', 'es', 'fr', 'it'];

const SEO_LOCALES: Record<Language, string> = {
  en: 'en_US',
  es: 'es_ES',
  fr: 'fr_FR',
  it: 'it_IT'
};

const DEFAULT_SEO: Record<Language, { title: string; description: string }> = {
  en: {
    title: 'AquaVerify | Water Testing, LIMS Traceability & Compliance',
    description: 'AquaVerify combines certified water testing kits, digital LIMS traceability, compliance reporting, distributor support and OEM partnerships.'
  },
  es: {
    title: 'AquaVerify | Kits de Agua, Trazabilidad LIMS y Cumplimiento',
    description: 'AquaVerify combina kits certificados de análisis de agua, trazabilidad digital LIMS, informes de cumplimiento, distribuidores y programas OEM.'
  },
  fr: {
    title: 'AquaVerify | Tests Eau, Traçabilité LIMS et Conformité',
    description: 'AquaVerify réunit kits certifiés de test de l’eau, traçabilité numérique LIMS, rapports de conformité, distributeurs et partenariats OEM.'
  },
  it: {
    title: 'AquaVerify | Test Acqua, Tracciabilità LIMS e Conformità',
    description: 'AquaVerify unisce kit certificati per l’analisi dell’acqua, tracciabilità digitale LIMS, report di conformità, distributori e partnership OEM.'
  }
};

export function isSupportedSeoLanguage(value: string | undefined): value is Language {
  return SUPPORTED_SEO_LANGUAGES.includes(value as Language);
}

export function getRouteLanguage(pathname: string): Language | null {
  const firstSegment = pathname.split('/').filter(Boolean)[0];
  return isSupportedSeoLanguage(firstSegment) ? firstSegment : null;
}

export function getLanguagePath(lang: Language): string {
  return `/${lang}`;
}

function getCanonicalUrl(lang: Language, pathname: string): string {
  const routeLang = getRouteLanguage(pathname);
  const path = routeLang ? getLanguagePath(lang) : '/';
  return `${CORPORATE_SITE_URL}${path === '/' ? '/' : path}`;
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function upsertLink(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
}

export function applyPublicSeo({
  lang,
  pageMeta,
  pathname
}: {
  lang: Language;
  pageMeta?: { title?: string; seo_title?: string; seo_description?: string } | null;
  pathname: string;
}) {
  const defaults = DEFAULT_SEO[lang] || DEFAULT_SEO.en;
  const title = pageMeta?.seo_title || pageMeta?.title || defaults.title;
  const description = pageMeta?.seo_description || defaults.description;
  const canonicalUrl = getCanonicalUrl(lang, pathname);
  const imageUrl = `${CORPORATE_SITE_URL}/android-chrome-512x512.png`;

  document.documentElement.lang = lang;
  document.title = title;

  upsertMeta('name', 'description', description);
  upsertMeta('name', 'robots', 'index, follow, max-image-preview:large');
  upsertMeta('property', 'og:type', 'website');
  upsertMeta('property', 'og:site_name', 'AquaVerify');
  upsertMeta('property', 'og:title', title);
  upsertMeta('property', 'og:description', description);
  upsertMeta('property', 'og:url', canonicalUrl);
  upsertMeta('property', 'og:image', imageUrl);
  upsertMeta('property', 'og:locale', SEO_LOCALES[lang] || SEO_LOCALES.en);
  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', title);
  upsertMeta('name', 'twitter:description', description);
  upsertMeta('name', 'twitter:image', imageUrl);

  upsertLink('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });
  upsertLink('link[rel="alternate"][hreflang="x-default"]', {
    rel: 'alternate',
    hreflang: 'x-default',
    href: `${CORPORATE_SITE_URL}/`
  });
  SUPPORTED_SEO_LANGUAGES.forEach((language) => {
    upsertLink(`link[rel="alternate"][hreflang="${language}"]`, {
      rel: 'alternate',
      hreflang: language,
      href: `${CORPORATE_SITE_URL}${getLanguagePath(language)}`
    });
  });
}
