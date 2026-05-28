import type { Language } from './translations';
import { HOME_FAQS, getHomeIndustryItems, getHomeProductItems } from './homeContent';
import { getMarketingPagePath } from './marketingRoutes';

export const CORPORATE_SITE_URL = 'https://aquaverify.com';
export const SUPPORTED_SEO_LANGUAGES: Language[] = ['en', 'es', 'fr', 'it', 'ca'];

const SEO_LOCALES: Record<Language, string> = {
  en: 'en_US',
  es: 'es_ES',
  fr: 'fr_FR',
  it: 'it_IT',
  ca: 'ca_ES'
};

const DEFAULT_SEO: Record<Language, { title: string; description: string }> = {
  en: {
    title: 'AquaVerify | Innovative Detection of Viruses and Bacteria in Water',
    description: 'AquaVerify develops, manufactures and distributes innovative products for detecting viruses and bacteria in water, connected with AquaVerify Cloud, technical reporting, distributors and OEM programs.'
  },
  es: {
    title: 'AquaVerify | Detección innovadora de virus y bacterias en el agua',
    description: 'AquaVerify desarrolla, fabrica y distribuye productos innovadores para la detección de virus y bacterias en el agua, conectados con AquaVerify Cloud, reporting técnico, distribuidores y programas OEM.'
  },
  fr: {
    title: 'AquaVerify | Détection innovante des virus et bactéries dans l’eau',
    description: 'AquaVerify développe, fabrique et distribue des produits innovants pour détecter virus et bactéries dans l’eau, connectés à AquaVerify Cloud, reporting technique, distributeurs et programmes OEM.'
  },
  it: {
    title: 'AquaVerify | Rilevazione innovativa di virus e batteri nell’acqua',
    description: 'AquaVerify sviluppa, produce e distribuisce prodotti innovativi per rilevare virus e batteri nell’acqua, collegati ad AquaVerify Cloud, reporting tecnico, distributori e programmi OEM.'
  },
  ca: {
    title: 'AquaVerify | Detecció innovadora de virus i bacteris a l’aigua',
    description: 'AquaVerify desenvolupa, fabrica i distribueix productes innovadors per detectar virus i bacteris a l’aigua, connectats amb AquaVerify Cloud, reporting tècnic, distribuïdors i programes OEM.'
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

function isHomePath(pathname: string) {
  const normalized = pathname.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
  return normalized === '/' || SUPPORTED_SEO_LANGUAGES.some((language) => normalized === getLanguagePath(language));
}

function itemListElement(items: Array<{ name: string; path: string }>) {
  return items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    url: getAbsoluteUrl(item.path)
  }));
}

function removeHomeJsonLd() {
  removeJsonLd('home-graph');
}

function homeFaqEntities(lang: Language) {
  return (HOME_FAQS[lang] || HOME_FAQS.en).map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }));
}

function homeJsonLdGraph(lang: Language, canonicalUrl: string, title: string, description: string) {
  const organizationId = `${CORPORATE_SITE_URL}/#organization`;
  const websiteId = `${CORPORATE_SITE_URL}/#website`;
  const webpageId = `${canonicalUrl}#webpage`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: 'AquaVerify',
        url: CORPORATE_SITE_URL,
        logo: `${CORPORATE_SITE_URL}/images/logo-mark-160.png`,
        description
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: 'AquaVerify',
        url: CORPORATE_SITE_URL,
        inLanguage: lang,
        description,
        publisher: { '@id': organizationId },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${getAbsoluteUrl(getMarketingPagePath('resources', lang))}?search={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'WebPage',
        '@id': webpageId,
        name: title,
        description,
        url: canonicalUrl,
        inLanguage: lang,
        isPartOf: { '@id': websiteId },
        about: { '@id': organizationId },
        publisher: { '@id': organizationId }
      },
      {
        '@type': 'ItemList',
        '@id': `${canonicalUrl}#products`,
        name: `${title} - products`,
        itemListElement: itemListElement(getHomeProductItems(lang))
      },
      {
        '@type': 'ItemList',
        '@id': `${canonicalUrl}#industries`,
        name: `${title} - industries`,
        itemListElement: itemListElement(getHomeIndustryItems(lang))
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        mainEntity: homeFaqEntities(lang)
      }
    ]
  };
}

function upsertHomeJsonLd(lang: Language, canonicalUrl: string, title: string, description: string) {
  upsertJsonLd('home-graph', homeJsonLdGraph(lang, canonicalUrl, title, description));
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

  if (isHomePath(pathname)) {
    upsertHomeJsonLd(lang, canonicalUrl, title, description);
  } else {
    removeHomeJsonLd();
  }
}

function getAbsoluteUrl(path: string) {
  return `${CORPORATE_SITE_URL}${path === '/' ? '/' : path}`;
}

function getAbsoluteAssetUrl(pathOrUrl?: string) {
  const value = pathOrUrl?.trim();
  if (!value) return `${CORPORATE_SITE_URL}/android-chrome-512x512.png`;
  if (/^https?:\/\//i.test(value)) return value;
  return `${CORPORATE_SITE_URL}${value.startsWith('/') ? value : `/${value}`}`;
}

function upsertJsonLd(id: string, payload: Record<string, unknown>) {
  let element = document.head.querySelector<HTMLScriptElement>(`script[type="application/ld+json"][data-id="${id}"]`);
  if (!element) {
    element = document.createElement('script');
    element.type = 'application/ld+json';
    element.dataset.id = id;
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(payload);
}

function removeJsonLd(id: string) {
  document.head.querySelector<HTMLScriptElement>(`script[type="application/ld+json"][data-id="${id}"]`)?.remove();
}

function getMarketingSchemaType(pageType?: string) {
  if (pageType === 'Product') return 'Product';
  if (pageType === 'TechArticle') return 'TechArticle';
  if (pageType === 'DefinedTerm') return 'DefinedTerm';
  if (pageType === 'DefinedTermSet') return 'DefinedTermSet';
  if (pageType === 'resourcesHub') return 'CollectionPage';
  if (pageType === 'products' || pageType === 'industries') return 'CollectionPage';
  if (pageType === 'platform') return 'SoftwareApplication';
  if (pageType === 'partners') return 'Service';
  if (pageType === 'resources') return 'Article';
  return 'WebPage';
}

export function applyMarketingSeo({
  lang,
  title,
  description,
  canonicalPath,
  alternates,
  pageType,
  imageUrl,
  faqs,
  breadcrumbs
}: {
  lang: Language;
  title: string;
  description: string;
  canonicalPath: string;
  alternates: Partial<Record<Language, string>>;
  pageType?: string;
  imageUrl?: string;
  faqs?: Array<{ question: string; answer: string }>;
  breadcrumbs?: Array<{ name: string; path: string }>;
}) {
  const canonicalUrl = getAbsoluteUrl(canonicalPath);
  const socialImageUrl = getAbsoluteAssetUrl(imageUrl);
  const schemaType = getMarketingSchemaType(pageType);

  document.documentElement.lang = lang;
  document.title = title;

  upsertMeta('name', 'description', description);
  upsertMeta('name', 'robots', 'index, follow, max-image-preview:large');
  upsertMeta('property', 'og:type', 'website');
  upsertMeta('property', 'og:site_name', 'AquaVerify');
  upsertMeta('property', 'og:title', title);
  upsertMeta('property', 'og:description', description);
  upsertMeta('property', 'og:url', canonicalUrl);
  upsertMeta('property', 'og:image', socialImageUrl);
  upsertMeta('property', 'og:locale', SEO_LOCALES[lang] || SEO_LOCALES.en);
  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', title);
  upsertMeta('name', 'twitter:description', description);
  upsertMeta('name', 'twitter:image', socialImageUrl);

  upsertLink('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });
  upsertLink('link[rel="alternate"][hreflang="x-default"]', {
    rel: 'alternate',
    hreflang: 'x-default',
    href: getAbsoluteUrl(alternates.en || canonicalPath)
  });
  SUPPORTED_SEO_LANGUAGES.forEach((language) => {
    const path = alternates[language];
    if (!path) return;
    upsertLink(`link[rel="alternate"][hreflang="${language}"]`, {
      rel: 'alternate',
      hreflang: language,
      href: getAbsoluteUrl(path)
    });
  });

  upsertJsonLd('marketing-page', {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: title,
    description,
    url: canonicalUrl,
    image: socialImageUrl,
    ...(schemaType === 'Product' ? {
      brand: {
        '@type': 'Brand',
        name: 'AquaVerify'
      }
    } : {}),
    isPartOf: {
      '@type': 'WebSite',
      name: 'AquaVerify',
      url: CORPORATE_SITE_URL
    },
    publisher: {
      '@type': 'Organization',
      name: 'AquaVerify',
      url: CORPORATE_SITE_URL,
      logo: `${CORPORATE_SITE_URL}/images/logo-mark-160.png`
    }
  });

  if (breadcrumbs?.length) {
    upsertJsonLd('marketing-breadcrumbs', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: getAbsoluteUrl(item.path)
      }))
    });
  } else {
    removeJsonLd('marketing-breadcrumbs');
  }

  if (faqs?.length) {
    upsertJsonLd('marketing-faq', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    });
  } else {
    removeJsonLd('marketing-faq');
  }
}
