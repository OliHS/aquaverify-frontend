import React, { Suspense, useEffect } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { ValueProps } from '../components/ValueProps';
import { Footer } from '../components/Footer';
import { CookieConsent } from '../components/CookieConsent';
import { DeferredSection } from '../components/DeferredSection';
import { PageContentProvider, usePageContent } from '../context/PageContentContext';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../utils/translations';

const ProductSection = React.lazy(() => import('../components/ProductSection').then(module => ({ default: module.ProductSection })));
const SaaSPlatform = React.lazy(() => import('../components/SaaSPlatform').then(module => ({ default: module.SaaSPlatform })));
const DistributorsSection = React.lazy(() => import('../components/DistributorsSection').then(module => ({ default: module.DistributorsSection })));
const OEMSection = React.lazy(() => import('../components/OEMSection').then(module => ({ default: module.OEMSection })));
const Sectors = React.lazy(() => import('../components/Sectors').then(module => ({ default: module.Sectors })));

const SectionFallback: React.FC<{ className?: string }> = ({ className = 'min-h-[560px] bg-white' }) => (
    <section className={className} aria-hidden="true" />
);

const HOME_PAGE_SLUGS: Record<Language, string[]> = {
    en: ['home', 'home-en', 'home-english'],
    es: ['home-es', 'home-spanish', 'inicio', 'home'],
    fr: ['home-fr', 'home-french', 'accueil', 'home'],
    it: ['home-it', 'home-italian', 'home'],
};

export const PublicSiteContent: React.FC = () => {
    const { pageMeta } = usePageContent();

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
                <Suspense fallback={<SectionFallback className="min-h-[720px] bg-surface" />}>
                    <DeferredSection id="products" minHeightClassName="min-h-[720px] bg-surface">
                        <ProductSection />
                    </DeferredSection>
                </Suspense>
                <Suspense fallback={<SectionFallback className="min-h-[620px] bg-white" />}>
                    <DeferredSection id="platform" minHeightClassName="min-h-[620px] bg-white">
                        <SaaSPlatform />
                    </DeferredSection>
                </Suspense>
                <Suspense fallback={<SectionFallback className="min-h-[820px] bg-white" />}>
                    <DeferredSection id="distributors" minHeightClassName="min-h-[820px] bg-white">
                        <DistributorsSection />
                    </DeferredSection>
                </Suspense>
                <Suspense fallback={<SectionFallback className="min-h-[620px] bg-surface" />}>
                    <DeferredSection id="oem" minHeightClassName="min-h-[620px] bg-surface">
                        <OEMSection />
                    </DeferredSection>
                </Suspense>
                <Suspense fallback={<SectionFallback className="min-h-[620px] bg-white" />}>
                    <DeferredSection id="sectors" minHeightClassName="min-h-[620px] bg-white">
                        <Sectors />
                    </DeferredSection>
                </Suspense>
            </main>
            <Footer />
            <CookieConsent />
        </div>
    );
};

export const PublicSite: React.FC = () => {
    const { lang } = useLanguage();
    const [slug, ...fallbackSlugs] = HOME_PAGE_SLUGS[lang] || HOME_PAGE_SLUGS.en;

    return (
        <PageContentProvider slug={slug} fallbackSlugs={fallbackSlugs}>
            <PublicSiteContent />
        </PageContentProvider>
    );
};
