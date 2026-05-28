import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import type { Language } from '../../utils/translations';
import { trackCorporateEvent } from '../../utils/corporateAnalytics';
import { applyMarketingSeo } from '../../utils/seo';
import { fetchMarketingPageOverride } from '../../utils/publicMarketingOverrides';
import { mergeMarketingContent } from '../../utils/marketingContentMerge.js';
import { findMarketingRouteByPath } from '../../utils/marketingRoutes.js';
import { PRODUCT_MARKETING_PAGES } from '../../utils/marketing-pages/productPages.js';
import { MARKETING_LANGUAGES } from '../../utils/marketing-pages/shared.js';
import {
  ProductMarketingPageDocument,
  UI_LABELS,
  buildProductMarketingBreadcrumbs,
  toPublicAssetUrl,
  type MarketingContentMeta,
  type MarketingPageMeta
} from '../../components/marketing/ProductMarketingPageDocument';

type LightweightRoute = {
  pageId: string;
  lang: string;
  language?: string;
  family?: string;
  path?: string;
};

type ProductsMarketingRouteProps = {
  route?: LightweightRoute | null;
};

function getProductContent(page: any, lang: Language) {
  return page?.content?.[lang] || page?.content?.en || null;
}

function getProductAlternates(page: any) {
  return Object.fromEntries(
    MARKETING_LANGUAGES
      .map((lang) => [lang, getProductContent(page, lang as Language)?.path])
      .filter(([, path]) => Boolean(path))
  ) as Partial<Record<Language, string>>;
}

export const ProductsMarketingRoute: React.FC<ProductsMarketingRouteProps> = ({ route }) => {
  const location = useLocation();
  const routeMatch = route || findMarketingRouteByPath(location.pathname);
  const page = routeMatch?.family === 'products'
    ? PRODUCT_MARKETING_PAGES.find((item: any) => item.id === routeMatch.pageId)
    : null;
  const pageLang = (routeMatch?.lang || routeMatch?.language || 'en') as Language;
  const baseContent = page ? getProductContent(page, pageLang) : null;
  const { lang, setLang } = useLanguage();
  const [contentOverride, setContentOverride] = useState<Record<string, unknown> | null>(null);
  const trackedProductViewRef = useRef('');
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
    const labels = UI_LABELS[pageLang] || UI_LABELS.en;
    const contentMeta = mergedContent as MarketingContentMeta;

    applyMarketingSeo({
      lang: pageLang,
      title: mergedContent.seoTitle || mergedContent.title,
      description: mergedContent.seoDescription || mergedContent.description,
      canonicalPath: mergedContent.path,
      alternates: getProductAlternates(page),
      pageType: (page as MarketingPageMeta).schemaType || page.category,
      imageUrl: toPublicAssetUrl(contentMeta.ogImage || contentMeta.heroImage),
      faqs: contentMeta.faqs,
      breadcrumbs: buildProductMarketingBreadcrumbs(page, contentMeta, pageLang, labels)
    });
  }, [page, pageLang, mergedContent]);

  useEffect(() => {
    if (!page || !mergedContent) return;

    const pageMeta = page as MarketingPageMeta;
    const trackingKey = `${page.id}:${pageLang}:${mergedContent.path}`;
    if (trackedProductViewRef.current === trackingKey) return;

    const tracked = trackCorporateEvent('product_view', {
      lang: pageLang,
      page: page.id,
      category: page.category,
      product: pageMeta.productName || mergedContent.title,
      label: mergedContent.title,
      path: mergedContent.path
    });

    if (tracked) {
      trackedProductViewRef.current = trackingKey;
    }
  }, [page, pageLang, mergedContent]);

  if (!page || !mergedContent) {
    return <Navigate to="/" replace />;
  }

  return (
    <ProductMarketingPageDocument
      page={page}
      content={mergedContent}
      pageLang={pageLang}
    />
  );
};

export default ProductsMarketingRoute;
