import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { CookieConsent } from '../../components/CookieConsent';
import { AquaToolPage } from '../../components/aquatools/AquaToolPage';
import { AquaToolsHubLanding } from '../../components/aquatools/AquaToolsHubLanding';
import { useLanguage } from '../../context/LanguageContext';
import type { Language } from '../../utils/translations';
import { applyMarketingSeo } from '../../utils/seo';
import { AQUATOOLS_MARKETING_PAGES } from '../../utils/aquatoolsContent.js';
import { findMarketingRouteByPath } from '../../utils/marketingRoutes.js';
import { MARKETING_LANGUAGES } from '../../utils/marketing-pages/shared.js';

type LightweightRoute = {
  pageId: string;
  lang: string;
  language?: string;
  family?: string;
};

function getPageContent(page: any, lang: Language) {
  return page?.translations?.[lang] || page?.translations?.en || null;
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

function buildBreadcrumbs(page: any, content: any, lang: Language) {
  const crumbs = [{ name: 'AquaVerify', path: getHomePath(lang) }];
  if (page.id !== 'aquatools') {
    const hub = AQUATOOLS_MARKETING_PAGES.find((item: any) => item.id === 'aquatools');
    const hubContent = getPageContent(hub, lang);
    if (hubContent) crumbs.push({ name: 'AquaTools Free', path: hubContent.path });
  }
  crumbs.push({ name: content.title, path: content.path });
  return crumbs;
}

export const AquaToolsMarketingRoute: React.FC<{ route?: LightweightRoute | null }> = ({ route }) => {
  const location = useLocation();
  const routeMatch = route || findMarketingRouteByPath(location.pathname);
  const pageLang = (routeMatch?.lang || routeMatch?.language || 'en') as Language;
  const page = routeMatch?.family === 'aquatools'
    ? AQUATOOLS_MARKETING_PAGES.find((item: any) => item.id === routeMatch.pageId)
    : null;
  const content = page ? getPageContent(page, pageLang) : null;
  const { lang, setLang } = useLanguage();

  useEffect(() => {
    if (routeMatch && pageLang !== lang) setLang(pageLang);
  }, [lang, pageLang, routeMatch, setLang]);

  useEffect(() => {
    if (!page || !content) return;
    applyMarketingSeo({
      lang: pageLang,
      title: content.seoTitle || content.title,
      description: content.seoDescription || content.description,
      canonicalPath: content.path,
      alternates: getAlternates(page),
      pageType: page.schemaType,
      imageUrl: content.ogImage,
      faqs: content.faqs,
      breadcrumbs: buildBreadcrumbs(page, content, pageLang),
      pageId: page.id
    });
  }, [content, page, pageLang]);

  if (!page || !content) return <Navigate to="/" replace />;

  return (
    <>
      <Header />
      {page.id === 'aquatools' ? (
        <AquaToolsHubLanding content={content} pageLang={pageLang} />
      ) : (
        <AquaToolPage page={page} content={content} pageLang={pageLang} />
      )}
      <Footer />
      <CookieConsent />
    </>
  );
};

export default AquaToolsMarketingRoute;
