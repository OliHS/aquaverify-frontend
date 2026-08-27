import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import type { Language } from '../../utils/translations';
import { applyMarketingSeo } from '../../utils/seo';
import { fetchMarketingPageOverride } from '../../utils/publicMarketingOverrides';
import { mergeMarketingContent } from '../../utils/marketingContentMerge.js';
import { findMarketingRouteByPath, getMarketingPagePath } from '../../utils/marketingRoutes.js';
import { MARKETING_LANGUAGES } from '../../utils/marketing-pages/shared.js';
import {
  CommercialMarketingPageDocument,
  toPublicAssetUrl,
  type MarketingContentMeta,
  type MarketingPageMeta
} from '../../components/marketing/CommercialMarketingPageDocument';

type LightweightRoute = {
  pageId: string;
  lang: string;
  language?: string;
  family?: string;
  path?: string;
};

type CommercialRouteProps = {
  route?: LightweightRoute | null;
};

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

function getPageSummary(familyPages: any[], pageId: string | undefined, lang: Language) {
  if (!pageId) return null;
  const page = familyPages.find((item: any) => item.id === pageId);
  const content = getPageContent(page, lang);
  if (!page || !content) return null;
  return {
    id: page.id,
    title: content.title,
    description: content.description,
    path: content.path
  };
}

function getRelatedPages(familyPages: any[], page: any, lang: Language) {
  const pageMeta = page as MarketingPageMeta;
  const relatedIds = new Set<string>();

  if (pageMeta.parentId) {
    relatedIds.add(pageMeta.parentId);
    familyPages
      .filter((item: any) => item.id !== page.id && item.parentId === pageMeta.parentId)
      .slice(0, 3)
      .forEach((item: any) => relatedIds.add(item.id));
  }

  if (relatedIds.size < 4) {
    familyPages
      .filter((item: any) => item.id !== page.id && item.category === page.category && !relatedIds.has(item.id))
      .slice(0, 4 - relatedIds.size)
      .forEach((item: any) => relatedIds.add(item.id));
  }

  return [...relatedIds]
    .map((id) => getPageSummary(familyPages, id, lang))
    .filter(Boolean)
    .slice(0, 4) as Array<{ id: string; title: string; description: string; path: string }>;
}

function buildBreadcrumbs(familyPages: any[], page: any, content: MarketingContentMeta, lang: Language) {
  const pageMeta = page as MarketingPageMeta;
  const crumbs = [
    { name: 'AquaVerify', path: getHomePath(lang) }
  ];

  if (pageMeta.parentId) {
    const parent = getPageSummary(familyPages, pageMeta.parentId, lang);
    if (parent && parent.path !== content.path) {
      crumbs.push({ name: parent.title, path: parent.path });
    }
  }

  crumbs.push({ name: content.title, path: content.path });
  return crumbs.filter((crumb, index, all) => all.findIndex((item) => item.path === crumb.path) === index);
}

function buildAboutPageSchema(content: MarketingContentMeta, lang: Language) {
  const links = [
    ...((content as any).ecosystemLinks || []),
    ...((content as any).evidenceLinks || []),
    ...((content as any).commercialLinks || [])
  ];
  const seen = new Set<string>();
  const itemList = links
    .map((item: any) => ({
      name: item.label,
      path: getMarketingPagePath(item.routeId, lang)
    }))
    .filter((item: any) => {
      if (!item.name || !item.path || item.path === '/' || seen.has(item.path)) return false;
      seen.add(item.path);
      return true;
    });

  return {
    knowsAbout: content.schemaKnowsAbout || [],
    itemListName: (content as any).ecosystemLinksTitle || content.title,
    itemList
  };
}

export function createCommercialMarketingRoute(family: 'platform' | 'partners' | 'company', familyPages: any[]) {
  const CommercialFamilyRoute: React.FC<CommercialRouteProps> = ({ route }) => {
    const location = useLocation();
    const routeMatch = route || findMarketingRouteByPath(location.pathname);
    const pageLang = (routeMatch?.lang || routeMatch?.language || 'en') as Language;
    const page = routeMatch?.family === family
      ? familyPages.find((item: any) => item.id === routeMatch.pageId)
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
      const breadcrumbs = buildBreadcrumbs(familyPages, page, contentMeta, pageLang);

      applyMarketingSeo({
        lang: pageLang,
        title: mergedContent.seoTitle || mergedContent.title,
        description: mergedContent.seoDescription || mergedContent.description,
        canonicalPath: mergedContent.path,
        alternates: getAlternates(page),
        pageType: (page as MarketingPageMeta).schemaType || page.category,
        imageUrl: toPublicAssetUrl(contentMeta.ogImage || contentMeta.heroImage),
        faqs: contentMeta.faqs,
        breadcrumbs,
        pageId: page.id,
        aboutPage: page.id === 'about' ? buildAboutPageSchema(contentMeta, pageLang) : undefined
      });
    }, [page, pageLang, mergedContent]);

    if (!page || !mergedContent) {
      return <Navigate to="/" replace />;
    }

    const contentMeta = mergedContent as MarketingContentMeta;
    const breadcrumbs = buildBreadcrumbs(familyPages, page, contentMeta, pageLang);
    const relatedPages = getRelatedPages(familyPages, page, pageLang);

    return (
      <CommercialMarketingPageDocument
        page={page}
        content={mergedContent}
        pageLang={pageLang}
        breadcrumbs={breadcrumbs}
        relatedPages={relatedPages}
      />
    );
  };

  return CommercialFamilyRoute;
}
