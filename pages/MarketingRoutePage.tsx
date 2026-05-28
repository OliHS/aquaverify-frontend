import React, { Suspense, lazy } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { findMarketingRouteByPath } from '../utils/marketingRoutes.js';

const ProductsMarketingRoute = lazy(() => import('./marketing-routes/ProductsMarketingRoute'));
const PlatformMarketingRoute = lazy(() => import('./marketing-routes/PlatformMarketingRoute'));
const PartnersMarketingRoute = lazy(() => import('./marketing-routes/PartnersMarketingRoute'));
const CompanyMarketingRoute = lazy(() => import('./marketing-routes/CompanyMarketingRoute'));
const IndustriesMarketingRoute = lazy(() => import('./marketing-routes/IndustriesMarketingRoute'));
const ResourcesMarketingRoute = lazy(() => import('./marketing-routes/ResourcesMarketingRoute'));
const LegacyMarketingRoute = lazy(() => import('./marketing-routes/LegacyMarketingRoute'));

const MarketingRouteFallback: React.FC = () => (
  <div className="min-h-screen bg-white" aria-busy="true" aria-live="polite" />
);

export const MarketingRoutePage: React.FC = () => {
  const location = useLocation();
  const route = findMarketingRouteByPath(location.pathname);

  if (!route) {
    return <Navigate to="/" replace />;
  }

  return (
    <Suspense fallback={<MarketingRouteFallback />}>
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
      ) : (
        <LegacyMarketingRoute route={route} />
      )}
    </Suspense>
  );
};

export default MarketingRoutePage;
