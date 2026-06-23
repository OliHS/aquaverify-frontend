import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { CookieConsent } from '../../components/CookieConsent';
import { WorkflowAdvisorLanding } from '../../components/workflow/WorkflowAdvisorLanding';
import { useLanguage } from '../../context/LanguageContext';
import type { Language } from '../../utils/translations';
import { applyMarketingSeo } from '../../utils/seo';
import { WORKFLOW_ADVISOR_MARKETING_PAGES } from '../../utils/workflowAdvisorContent.js';
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

export const WorkflowAdvisorMarketingRoute: React.FC<{ route?: LightweightRoute | null }> = ({ route }) => {
  const location = useLocation();
  const routeMatch = route || findMarketingRouteByPath(location.pathname);
  const pageLang = (routeMatch?.lang || routeMatch?.language || 'en') as Language;
  const page = routeMatch?.family === 'workflow-advisor'
    ? WORKFLOW_ADVISOR_MARKETING_PAGES.find((item: any) => item.id === routeMatch.pageId)
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
      breadcrumbs: [
        { name: 'AquaVerify', path: getHomePath(pageLang) },
        { name: content.title, path: content.path }
      ],
      pageId: page.id
    });
  }, [content, page, pageLang]);

  if (!page || !content) return <Navigate to="/" replace />;

  return (
    <>
      <Header />
      <WorkflowAdvisorLanding content={content} pageLang={pageLang} />
      <Footer />
      <CookieConsent />
    </>
  );
};

export default WorkflowAdvisorMarketingRoute;
