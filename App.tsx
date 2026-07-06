import React, { Suspense, useEffect, useLayoutEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { PublicSite } from './pages/PublicSite';
import { CorporateAnalytics } from './components/CorporateAnalytics';
import type { Language } from './utils/translations';

const AdminLayout = React.lazy(() => import('./pages/admin/AdminLayout').then(module => ({ default: module.AdminLayout })));
const Login = React.lazy(() => import('./pages/admin/Login').then(module => ({ default: module.Login })));
const Dashboard = React.lazy(() => import('./pages/admin/Dashboard').then(module => ({ default: module.Dashboard })));
const PagesList = React.lazy(() => import('./pages/admin/PagesList').then(module => ({ default: module.PagesList })));
const PageEditor = React.lazy(() => import('./pages/admin/PageEditor').then(module => ({ default: module.PageEditor })));
const VisualBuilder = React.lazy(() => import('./pages/admin/VisualBuilder').then(module => ({ default: module.VisualBuilder })));
const DistributorsManager = React.lazy(() => import('./pages/admin/DistributorsManager').then(module => ({ default: module.DistributorsManager })));
const ProductManager = React.lazy(() => import('./pages/admin/ProductManager').then(module => ({ default: module.ProductManager })));
const MarketingPagesList = React.lazy(() => import('./pages/admin/MarketingPagesList').then(module => ({ default: module.MarketingPagesList })));
const MarketingPageEditor = React.lazy(() => import('./pages/admin/MarketingPageEditor').then(module => ({ default: module.MarketingPageEditor })));
const loadMarketingRoutePage = () => import('./pages/MarketingRoutePage').then(module => ({ default: module.MarketingRoutePage }));
const MarketingRoutePage = React.lazy(loadMarketingRoutePage);

const PREPARING_COPY: Record<Language, string> = {
  en: 'Preparing the assessment…',
  es: 'Preparando el diagnóstico…',
  fr: 'Préparation du diagnostic…',
  it: 'Preparazione della valutazione…',
  ca: 'Preparant el diagnòstic…'
};

function getFallbackLanguage(pathname: string): Language {
  const segment = pathname.split('/').filter(Boolean)[0];
  return segment === 'es' || segment === 'fr' || segment === 'it' || segment === 'ca' ? segment : 'en';
}

const RouteFallback: React.FC = () => {
  const location = useLocation();
  const lang = getFallbackLanguage(location.pathname);
  const message = PREPARING_COPY[lang] || PREPARING_COPY.en;

  return (
  <div className="min-h-screen bg-slate-50 text-slate-900" aria-busy="true" aria-live="polite">
    <header className="fixed top-0 z-50 w-full bg-white py-5 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-6">
        <div className="flex items-center space-x-3">
          <img
            src="/images/logo-mark-160.png"
            alt=""
            width={32}
            height={40}
            className="h-10 w-auto object-contain"
          />
          <span className="font-heading text-xl font-bold tracking-tight text-primary">
            Aqua<span className="text-secondary">Verify</span>
          </span>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <span className="h-2 w-20 rounded-full bg-slate-100" />
          <span className="h-2 w-16 rounded-full bg-slate-100" />
          <span className="h-2 w-24 rounded-full bg-slate-100" />
        </div>
      </div>
    </header>
    <main className="pt-20">
      <section className="border-b border-cyan-100 bg-[radial-gradient(circle_at_90%_8%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_10%_16%,rgba(10,45,77,0.08),transparent_30%),#ffffff] px-6 py-20 md:py-24">
        <div className="container mx-auto max-w-4xl">
          <div className="h-3 w-32 rounded-full bg-cyan-100" />
          <div className="mt-6 h-12 max-w-2xl rounded bg-slate-100 md:h-16" />
          <div className="mt-4 h-4 max-w-xl rounded bg-slate-100" />
          <div className="mt-3 h-4 max-w-lg rounded bg-slate-100" />
          <div className="mt-8 inline-flex items-center rounded-full border border-cyan-100 bg-white px-4 py-2 text-sm font-black text-primary shadow-sm">
            <span className="mr-3 h-2 w-2 animate-pulse rounded-full bg-secondary" />
            {message}
          </div>
        </div>
      </section>
    </main>
  </div>
  );
};

const ScrollToTopOnRouteChange: React.FC = () => {
  const { pathname, hash } = useLocation();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    if (hash) return;

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [hash, pathname]);

  return null;
};

const AdminRobotsMeta: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!pathname.startsWith('/admin')) return;

    const selector = 'meta[name="robots"]';
    let meta = document.head.querySelector<HTMLMetaElement>(selector);

    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      document.head.appendChild(meta);
    }

    meta.setAttribute('content', 'noindex, nofollow');
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTopOnRouteChange />
        <AdminRobotsMeta />
        <CorporateAnalytics />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<PublicSite />} />
            <Route path="/en" element={<PublicSite />} />
            <Route path="/es" element={<PublicSite />} />
            <Route path="/fr" element={<PublicSite />} />
            <Route path="/it" element={<PublicSite />} />
            <Route path="/ca" element={<PublicSite />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />

            {/* Visual Builder (Standalone Layout) */}
            <Route path="/admin/pages/:id/builder" element={<VisualBuilder />} />

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="pages" element={<PagesList />} />
              <Route path="pages/:id" element={<PageEditor />} />
              <Route path="marketing-pages" element={<MarketingPagesList />} />
              <Route path="marketing-pages/:pageId/:language" element={<MarketingPageEditor />} />
              <Route path="products" element={<ProductManager />} />
              <Route path="distributors" element={<DistributorsManager />} />
            </Route>

            {/* Public marketing routes and fallback */}
            <Route path="*" element={<MarketingRoutePage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;
