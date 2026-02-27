import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { PublicSite } from './pages/PublicSite';
import { AdminLayout } from './pages/admin/AdminLayout';
import { Login } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';
import { PagesList } from './pages/admin/PagesList';
import { PageEditor } from './pages/admin/PageEditor';
import { VisualBuilder } from './pages/admin/VisualBuilder';
import { DistributorsManager } from './pages/admin/DistributorsManager';
import { ProductManager } from './pages/admin/ProductManager';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicSite />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />

          {/* Visual Builder (Standalone Layout) */}
          <Route path="/admin/pages/:id/builder" element={<VisualBuilder />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="pages" element={<PagesList />} />
            <Route path="pages/:id" element={<PageEditor />} />
            <Route path="products" element={<ProductManager />} />
            <Route path="distributors" element={<DistributorsManager />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;