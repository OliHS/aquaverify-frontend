import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import type { Language } from '../../utils/translations';
import { applyMarketingSeo } from '../../utils/seo';
import { fetchMarketingPageOverride } from '../../utils/publicMarketingOverrides';
import { mergeMarketingContent } from '../../utils/marketingContentMerge.js';
import { findMarketingRouteByPath } from '../../utils/marketingRoutes.js';
import { INDUSTRY_MARKETING_PAGES } from '../../utils/marketing-pages/industryPages.js';
import { MARKETING_LANGUAGES } from '../../utils/marketing-pages/shared.js';
import { IndustryMarketingPageDocument } from '../../components/marketing/IndustryMarketingPageDocument';

type LightweightRoute = {
  pageId: string;
  lang: string;
  language?: string;
  family?: string;
  path?: string;
};

type IndustriesMarketingRouteProps = {
  route?: LightweightRoute | null;
};

type MarketingContentMeta = {
  faqs?: Array<{ question: string; answer: string }>;
  heroImage?: string;
  ogImage?: string;
  path: string;
  title: string;
  seoTitle?: string;
  description: string;
  seoDescription?: string;
};

type MarketingPageMeta = {
  id: string;
  category?: string;
  parentId?: string;
  schemaType?: string;
};

function toPublicAssetUrl(value: string | undefined) {
  const trimmed = value?.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

function getPageContent(page: any, lang: Language) {
  return page?.translations?.[lang] || page?.content?.[lang] || page?.translations?.en || page?.content?.en || null;
}

function getAlternates(page: any) {
  return Object.fromEntries(
    MARKETING_LANGUAGES
      .map((lang) => [lang, getPageContent(page, lang as Language)?.path])
      .filter(([, path]) => Boolean(path))
  ) as Partial<Record<Language, string>>;
}

function getHomePath(lang: Language) {
  return lang === 'en' ? '/' : `/${lang}`;
}

function getPageSummary(pageId: string | undefined, lang: Language) {
  if (!pageId) return null;
  const page = INDUSTRY_MARKETING_PAGES.find((item: any) => item.id === pageId);
  const content = getPageContent(page, lang);
  if (!page || !content) return null;
  return {
    id: page.id,
    title: content.title,
    description: content.description,
    path: content.path
  };
}

function getRelatedPages(page: any, lang: Language) {
  const pageMeta = page as MarketingPageMeta;
  const relatedIds = new Set<string>();

  if (pageMeta.parentId) {
    relatedIds.add(pageMeta.parentId);
    INDUSTRY_MARKETING_PAGES
      .filter((item: any) => item.id !== page.id && item.parentId === pageMeta.parentId)
      .slice(0, 3)
      .forEach((item: any) => relatedIds.add(item.id));
  }

  if (relatedIds.size < 4) {
    INDUSTRY_MARKETING_PAGES
      .filter((item: any) => item.id !== page.id && item.category === page.category && !relatedIds.has(item.id))
      .slice(0, 4 - relatedIds.size)
      .forEach((item: any) => relatedIds.add(item.id));
  }

  return [...relatedIds]
    .map((id) => getPageSummary(id, lang))
    .filter(Boolean)
    .slice(0, 4) as Array<{ id: string; title: string; description: string; path: string }>;
}

function buildBreadcrumbs(page: any, content: MarketingContentMeta, lang: Language) {
  const pageMeta = page as MarketingPageMeta;
  const crumbs = [
    { name: 'AquaVerify', path: getHomePath(lang) }
  ];

  if (pageMeta.parentId) {
    const parent = getPageSummary(pageMeta.parentId, lang);
    if (parent && parent.path !== content.path) {
      crumbs.push({ name: parent.title, path: parent.path });
    }
  }

  crumbs.push({ name: content.title, path: content.path });
  return crumbs.filter((crumb, index, all) => all.findIndex((item) => item.path === crumb.path) === index);
}

export const IndustriesMarketingRoute: React.FC<IndustriesMarketingRouteProps> = ({ route }) => {
  const location = useLocation();
  const routeMatch = route || findMarketingRouteByPath(location.pathname);
  const pageLang = (routeMatch?.lang || routeMatch?.language || 'en') as Language;
  const page = routeMatch?.family === 'industries'
    ? INDUSTRY_MARKETING_PAGES.find((item: any) => item.id === routeMatch.pageId)
    : null;
  const baseContent = page ? getPageContent(page, pageLang) : null;
  const { lang, setLang } = useLanguage();
  const [contentOverride, setContentOverride] = useState<Record<string, unknown> | null>(null);
  const pageId = page?.id;

  useEffect(() => {
    if (routeMatch && pageLang !== lang) {
      setLang(pageLang);
    }
  }, [lang, pageLang, routeMatch, setLang]);

  useEffect(() => {
    setContentOverride(null);
    if (!pageId || !pageLang) return;

    const controller = new AbortController();
    fetchMarketingPageOverride(pageId, pageLang, controller.signal)
      .then(setContentOverride)
      .catch((error) => {
        if (error?.name !== 'AbortError') {
          console.warn('Unable to load marketing CMS override', error);
        }
      });

    return () => controller.abort();
  }, [pageId, pageLang]);

  const mergedContent = baseContent ? mergeMarketingContent(baseContent, contentOverride) : null;

  useEffect(() => {
    if (!page || !mergedContent) return;
    const contentMeta = mergedContent as MarketingContentMeta;

    applyMarketingSeo({
      lang: pageLang,
      title: mergedContent.seoTitle || mergedContent.title,
      description: mergedContent.seoDescription || mergedContent.description,
      canonicalPath: mergedContent.path,
      alternates: getAlternates(page),
      pageType: (page as MarketingPageMeta).schemaType || page.category,
      imageUrl: toPublicAssetUrl(contentMeta.ogImage || contentMeta.heroImage),
      faqs: contentMeta.faqs,
      breadcrumbs: buildBreadcrumbs(page, contentMeta, pageLang)
    });
  }, [page, pageLang, mergedContent]);

  if (!page || !mergedContent) {
    return <Navigate to="/" replace />;
  }

  return (
    <IndustryMarketingPageDocument
      page={page}
      content={mergedContent}
      pageLang={pageLang}
    />
  );
};

export default IndustriesMarketingRoute;
