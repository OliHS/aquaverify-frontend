import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../utils/translations';
import { trackCorporateEvent } from '../utils/corporateAnalytics';
import { applyMarketingSeo } from '../utils/seo';
import { fetchMarketingPageOverride } from '../utils/publicMarketingOverrides';
import { mergeMarketingContent } from '../utils/marketingPageOverrides.js';
import {
  findMarketingPageByPath,
  getMarketingAlternates
} from '../utils/marketingPages.js';
import {
  MarketingPageDocument,
  UI_LABELS,
  buildMarketingBreadcrumbs,
  toPublicAssetUrl,
  type MarketingContentMeta,
  type MarketingPageMeta
} from '../components/marketing/MarketingPageDocument';

export const MarketingRoutePage: React.FC = () => {
  const location = useLocation();
  const match = findMarketingPageByPath(location.pathname);
  const { lang, setLang } = useLanguage();
  const [contentOverride, setContentOverride] = useState<Record<string, unknown> | null>(null);
  const trackedProductViewRef = useRef('');
  const matchPageId = match?.page?.id;
  const matchLang = match?.lang;

  useEffect(() => {
    if (match && match.lang !== lang) {
      setLang(match.lang as Language);
    }
  }, [lang, match, setLang]);

  useEffect(() => {
    setContentOverride(null);
    if (!matchPageId || !matchLang) return;

    const controller = new AbortController();
    fetchMarketingPageOverride(matchPageId, matchLang, controller.signal)
      .then(setContentOverride)
      .catch((error) => {
        if (error?.name !== 'AbortError') {
          console.warn('Unable to load marketing CMS override', error);
        }
      });

    return () => controller.abort();
  }, [matchLang, matchPageId]);

  const mergedContent = match ? mergeMarketingContent(match.content, contentOverride) : null;

  useEffect(() => {
    if (!match || !mergedContent) return;
    const pageLang = match.lang as Language;
    const labels = UI_LABELS[pageLang] || UI_LABELS.en;
    const contentMeta = mergedContent as MarketingContentMeta;

    applyMarketingSeo({
      lang: pageLang,
      title: mergedContent.seoTitle || mergedContent.title,
      description: mergedContent.seoDescription || mergedContent.description,
      canonicalPath: mergedContent.path,
      alternates: getMarketingAlternates(match.page),
      pageType: (match.page as MarketingPageMeta).schemaType || match.page.category,
      imageUrl: toPublicAssetUrl(contentMeta.ogImage || contentMeta.heroImage),
      faqs: contentMeta.faqs,
      breadcrumbs: buildMarketingBreadcrumbs(match.page, contentMeta, pageLang, labels)
    });
  }, [match, mergedContent]);

  useEffect(() => {
    if (!match || !mergedContent || match.page.category !== 'products') return;

    const pageLang = match.lang as Language;
    const pageMeta = match.page as MarketingPageMeta;
    const trackingKey = `${match.page.id}:${pageLang}:${mergedContent.path}`;
    if (trackedProductViewRef.current === trackingKey) return;

    const tracked = trackCorporateEvent('product_view', {
      lang: pageLang,
      page: match.page.id,
      category: match.page.category,
      product: pageMeta.productName || mergedContent.title,
      label: mergedContent.title,
      path: mergedContent.path
    });

    if (tracked) {
      trackedProductViewRef.current = trackingKey;
    }
  }, [match, mergedContent]);

  if (!match || !mergedContent) {
    return <Navigate to="/" replace />;
  }

  return (
    <MarketingPageDocument
      page={match.page}
      content={mergedContent}
      pageLang={match.lang as Language}
    />
  );
};

export default MarketingRoutePage;
