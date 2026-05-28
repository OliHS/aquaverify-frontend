import {
  MARKETING_LANGUAGES,
  LANGUAGE_NAMES,
  productLinks
} from './marketing-pages/shared.js';
import {
  INDUSTRY_ENTRY_MARKETING_PAGES,
  INDUSTRY_DETAIL_MARKETING_PAGES,
  INDUSTRY_MARKETING_PAGES
} from './marketing-pages/industryPages.js';
import {
  PRODUCT_FAMILY_MARKETING_PAGES,
  PRODUCT_DETAIL_MARKETING_PAGES,
  PRODUCT_MARKETING_PAGES,
  PRODUCT_DETAIL_DATA
} from './marketing-pages/productPages.js';
import { PLATFORM_MARKETING_PAGES } from './marketing-pages/platformPages.js';
import { PARTNER_MARKETING_PAGES } from './marketing-pages/partnerPages.js';
import { COMPANY_MARKETING_PAGES } from './marketing-pages/companyPages.js';
import {
  RESOURCE_CORE_MARKETING_PAGES,
  RESOURCE_PRIORITY_MARKETING_PAGES,
  RESOURCE_MARKETING_PAGES
} from './marketing-pages/resourcePages.js';
import { GLOSSARY_MARKETING_PAGES } from './marketing-pages/glossaryPages.js';

export { MARKETING_LANGUAGES, LANGUAGE_NAMES, PRODUCT_DETAIL_DATA };

export const MARKETING_PAGES_BY_FAMILY = {
  products: PRODUCT_MARKETING_PAGES,
  industries: INDUSTRY_MARKETING_PAGES,
  platform: PLATFORM_MARKETING_PAGES,
  partners: PARTNER_MARKETING_PAGES,
  company: COMPANY_MARKETING_PAGES,
  resources: RESOURCE_MARKETING_PAGES,
  glossary: GLOSSARY_MARKETING_PAGES
};

export function getMarketingPagesByFamily(family) {
  return MARKETING_PAGES_BY_FAMILY[family] || [];
}

export const MARKETING_PAGES = [
  INDUSTRY_ENTRY_MARKETING_PAGES[0],
  ...PRODUCT_FAMILY_MARKETING_PAGES,
  ...PLATFORM_MARKETING_PAGES,
  ...PARTNER_MARKETING_PAGES,
  ...INDUSTRY_ENTRY_MARKETING_PAGES.slice(1),
  ...RESOURCE_CORE_MARKETING_PAGES,
  ...COMPANY_MARKETING_PAGES,
  ...INDUSTRY_DETAIL_MARKETING_PAGES,
  ...PRODUCT_DETAIL_MARKETING_PAGES,
  ...RESOURCE_PRIORITY_MARKETING_PAGES,
  ...GLOSSARY_MARKETING_PAGES
];

export function normalizePath(pathname) {
  const normalized = pathname.split('?')[0].split('#')[0].replace(/\/+$/, '');
  return normalized || '/';
}

function findMarketingPageByPathInPages(pathname, pages) {
  const path = normalizePath(pathname);
  for (const page of pages) {
    for (const lang of MARKETING_LANGUAGES) {
      if (normalizePath(page.translations[lang]?.path || '') === path) {
        return { page, lang, content: page.translations[lang] };
      }
    }
  }
  return null;
}

export function findMarketingPageByPath(pathname) {
  return findMarketingPageByPathInPages(pathname, MARKETING_PAGES);
}

export function findMarketingPageByPathInFamily(pathname, family) {
  return findMarketingPageByPathInPages(pathname, getMarketingPagesByFamily(family));
}

export function getMarketingPagePath(id, lang = 'en') {
  const page = MARKETING_PAGES.find((item) => item.id === id);
  return page?.translations[lang]?.path || page?.translations.en?.path || '/';
}

export function getMarketingPageSummary(id, lang = 'en') {
  const page = MARKETING_PAGES.find((item) => item.id === id);
  if (!page) return null;
  const content = page.translations[lang] || page.translations.en;
  return {
    id: page.id,
    title: content.title,
    description: content.description,
    path: content.path
  };
}

export function getMarketingAlternates(page) {
  return Object.fromEntries(
    MARKETING_LANGUAGES.map((lang) => [lang, page.translations[lang]?.path]).filter(([, path]) => Boolean(path))
  );
}

export function getRelatedMarketingPages(currentId, lang = 'en') {
  const current = MARKETING_PAGES.find((page) => page.id === currentId);
  if (!current) return [];

  const children = MARKETING_PAGES.filter((page) => page.parentId === currentId);
  const candidates = children.length > 0
    ? children
    : current.parentId
      ? [
          MARKETING_PAGES.find((page) => page.id === current.parentId),
          ...MARKETING_PAGES.filter((page) => page.parentId === current.parentId && page.id !== currentId)
        ].filter(Boolean)
      : MARKETING_PAGES.filter((page) => page.id !== currentId && page.category === current.category);

  const limit = current.id === 'resources' ? 12 : 4;

  return candidates.slice(0, limit)
    .map((page) => ({
      id: page.id,
      title: page.translations[lang]?.title || page.translations.en.title,
      description: page.translations[lang]?.description || page.translations.en.description,
      path: page.translations[lang]?.path || page.translations.en.path
    }));
}

export { productLinks };
