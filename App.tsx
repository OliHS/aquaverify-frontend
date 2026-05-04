import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { PublicSite } from './pages/PublicSite';

const AdminLayout = React.lazy(() => import('./pages/admin/AdminLayout').then(module => ({ default: module.AdminLayout })));
const Login = React.lazy(() => import('./pages/admin/Login').then(module => ({ default: module.Login })));
const Dashboard = React.lazy(() => import('./pages/admin/Dashboard').then(module => ({ default: module.Dashboard })));
const PagesList = React.lazy(() => import('./pages/admin/PagesList').then(module => ({ default: module.PagesList })));
const PageEditor = React.lazy(() => import('./pages/admin/PageEditor').then(module => ({ default: module.PageEditor })));
const VisualBuilder = React.lazy(() => import('./pages/admin/VisualBuilder').then(module => ({ default: module.VisualBuilder })));
const DistributorsManager = React.lazy(() => import('./pages/admin/DistributorsManager').then(module => ({ default: module.DistributorsManager })));
const ProductManager = React.lazy(() => import('./pages/admin/ProductManager').then(module => ({ default: module.ProductManager })));
const MarketingPagesList = React.lazy(() => import('./pages/admin/MarketingPagesList').then(module => ({ default: module.MarketingPagesList })));
const MarketingRoutePage = React.lazy(() => import('./pages/MarketingRoutePage').then(module => ({ default: module.MarketingRoutePage })));

const RouteFallback: React.FC = () => (
  <div className="min-h-screen bg-white" aria-hidden="true" />
);

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <BrowserRouter>
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
