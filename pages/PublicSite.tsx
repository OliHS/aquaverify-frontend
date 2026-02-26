import React, { useEffect } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { ValueProps } from '../components/ValueProps';
import { ProductSection } from '../components/ProductSection';
import { SaaSPlatform } from '../components/SaaSPlatform';
import { DistributorsSection } from '../components/DistributorsSection';
import { OEMSection } from '../components/OEMSection';
import { Sectors } from '../components/Sectors';
import { Footer } from '../components/Footer';
import { PageContentProvider, usePageContent } from '../context/PageContentContext';
import { useLanguage } from '../context/LanguageContext';

export const PublicSiteContent: React.FC = () => {
    const { pageMeta, loading } = usePageContent();

    useEffect(() => {
        if (pageMeta) {
            document.title = pageMeta.seo_title || pageMeta.title || 'AquaVerify';
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription && pageMeta.seo_description) {
                metaDescription.setAttribute('content', pageMeta.seo_description);
            }
        }
    }, [pageMeta]);

    return (
        <div className="flex flex-col min-h-screen font-sans">
            <Header />
            <main className="flex-grow">
                <Hero />
                <ValueProps />
                <ProductSection />
                <SaaSPlatform />
                <DistributorsSection />
                <OEMSection />
                <Sectors />
            </main>
            <Footer />
        </div>
    );
};

export const PublicSite: React.FC = () => {
    // TEMPORARY FIX: Force all visitors to load the base "home" page from the database.
    // This bypasses the language slugMap which was incorrectly looking for "home-english"
    // when the user is editing the "home" page in the dashboard.
    const slug = 'home';

    return (
        <PageContentProvider slug={slug}>
            <PublicSiteContent />
        </PageContentProvider>
    );
};
