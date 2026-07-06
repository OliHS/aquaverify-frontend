import React, { Suspense, lazy } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { findMarketingRouteByPath } from '../utils/marketingRoutes.js';
import type { Language } from '../utils/translations';

const ProductsMarketingRoute = lazy(() => import('./marketing-routes/ProductsMarketingRoute'));
const PlatformMarketingRoute = lazy(() => import('./marketing-routes/PlatformMarketingRoute'));
const PartnersMarketingRoute = lazy(() => import('./marketing-routes/PartnersMarketingRoute'));
const CompanyMarketingRoute = lazy(() => import('./marketing-routes/CompanyMarketingRoute'));
const IndustriesMarketingRoute = lazy(() => import('./marketing-routes/IndustriesMarketingRoute'));
const ResourcesMarketingRoute = lazy(() => import('./marketing-routes/ResourcesMarketingRoute'));
const GlossaryMarketingRoute = lazy(() => import('./marketing-routes/GlossaryMarketingRoute'));
const AquaToolsMarketingRoute = lazy(() => import('./marketing-routes/AquaToolsMarketingRoute'));
const WorkflowAdvisorMarketingRoute = lazy(() => import('./marketing-routes/WorkflowAdvisorMarketingRoute'));
const LegacyMarketingRoute = lazy(() => import('./marketing-routes/LegacyMarketingRoute'));

const PREPARING_COPY: Record<Language, string> = {
  en: 'Preparing the assessment…',
  es: 'Preparando el diagnóstico…',
  fr: 'Préparation du diagnostic…',
  it: 'Preparazione della valutazione…',
  ca: 'Preparant el diagnòstic…'
};

const MarketingRouteFallback: React.FC<{ lang: Language }> = ({ lang }) => (
  <main className="min-h-screen bg-slate-50 pt-24 text-slate-900" aria-busy="true" aria-live="polite">
    <section className="border-b border-cyan-100 bg-[radial-gradient(circle_at_88%_12%,rgba(34,211,238,0.18),transparent_28%),#ffffff] px-6 py-16">
      <div className="container mx-auto max-w-4xl">
        <div className="h-3 w-32 rounded-full bg-cyan-100" />
        <div className="mt-6 h-12 max-w-2xl rounded bg-slate-100 md:h-16" />
        <div className="mt-4 h-4 max-w-xl rounded bg-slate-100" />
        <div className="mt-3 h-4 max-w-lg rounded bg-slate-100" />
        <div className="mt-8 inline-flex items-center rounded-full border border-cyan-100 bg-white px-4 py-2 text-sm font-black text-primary shadow-sm">
          <span className="mr-3 h-2 w-2 animate-pulse rounded-full bg-secondary" />
          {PREPARING_COPY[lang] || PREPARING_COPY.en}
        </div>
      </div>
    </section>
  </main>
);

export const MarketingRoutePage: React.FC = () => {
  const location = useLocation();
  const route = findMarketingRouteByPath(location.pathname);

  if (!route) {
    return <Navigate to="/" replace />;
  }

  return (
    <Suspense fallback={<MarketingRouteFallback lang={(route.lang || route.language || 'en') as Language} />}>
      {route.family === 'products' ? (
        <ProductsMarketingRoute route={route} />
      ) : route.family === 'platform' ? (
        <PlatformMarketingRoute route={route} />
      ) : route.family === 'partners' ? (
        <PartnersMarketingRoute route={route} />
      ) : route.family === 'company' ? (
        <CompanyMarketingRoute route={route} />
      ) : route.family === 'industries' ? (
        <IndustriesMarketingRoute route={route} />
      ) : route.family === 'resources' ? (
        <ResourcesMarketingRoute route={route} />
      ) : route.family === 'glossary' ? (
        <GlossaryMarketingRoute route={route} />
      ) : route.family === 'aquatools' ? (
        <AquaToolsMarketingRoute route={route} />
      ) : route.family === 'workflow-advisor' ? (
        <WorkflowAdvisorMarketingRoute route={route} />
      ) : (
        <LegacyMarketingRoute route={route} />
      )}
    </Suspense>
  );
};

export default MarketingRoutePage;
