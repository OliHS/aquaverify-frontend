import React, { Suspense, useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { CookieConsent } from '../components/CookieConsent';
import { HomeEcosystemLanding } from '../components/HomeEcosystemLanding';
import { PageContentProvider, usePageContent } from '../context/PageContentContext';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../utils/translations';
import { applyPublicSeo, getRouteLanguage } from '../utils/seo';
import { useLocation } from 'react-router-dom';

const Footer = React.lazy(() => import('../components/Footer').then((module) => ({ default: module.Footer })));

const HOME_PAGE_SLUGS: Record<Language, string[]> = {
    en: ['home', 'home-en', 'home-english'],
    es: ['home-es', 'home-spanish', 'inicio', 'home'],
    fr: ['home-fr', 'home-french', 'accueil', 'home'],
    it: ['home-it', 'home-italian', 'home'],
    ca: ['home-ca', 'home-catalan', 'inici', 'home-es', 'home'],
};

function useIdleMount(delay = 1200) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (mounted) return;
        const win = window as typeof window & {
            requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
            cancelIdleCallback?: (handle: number) => void;
        };

        let timeoutId: number | undefined;
        let idleId: number | undefined;

        const mount = () => setMounted(true);
        if (typeof win.requestIdleCallback === 'function') {
            idleId = win.requestIdleCallback(mount, { timeout: delay });
        } else {
            timeoutId = window.setTimeout(mount, delay);
        }

        return () => {
            if (idleId && typeof win.cancelIdleCallback === 'function') win.cancelIdleCallback(idleId);
            if (timeoutId) window.clearTimeout(timeoutId);
        };
    }, [delay, mounted]);

    return mounted;
}

export const PublicSiteContent: React.FC = () => {
    const { pageMeta } = usePageContent();
    const { lang } = useLanguage();
    const location = useLocation();
    const mountDeferredChrome = useIdleMount();

    useEffect(() => {
        applyPublicSeo({ lang, pageMeta, pathname: location.pathname });
    }, [lang, location.pathname, pageMeta]);

    return (
        <div className="flex flex-col min-h-screen font-sans">
            <Header />
            <main className="flex-grow">
                <HomeEcosystemLanding />
            </main>
            {mountDeferredChrome && (
                <Suspense fallback={null}>
                    <Footer />
                </Suspense>
            )}
            <CookieConsent />
        </div>
    );
};

export const PublicSite: React.FC = () => {
    const { lang, setLang } = useLanguage();
    const location = useLocation();
    const routeLanguage = getRouteLanguage(location.pathname);
    const activeLanguage = routeLanguage || lang;
    const [slug, ...fallbackSlugs] = HOME_PAGE_SLUGS[activeLanguage] || HOME_PAGE_SLUGS.en;

    useEffect(() => {
        if (routeLanguage && routeLanguage !== lang) {
            setLang(routeLanguage);
        }
    }, [lang, routeLanguage, setLang]);

    return (
        <PageContentProvider slug={slug} fallbackSlugs={fallbackSlugs}>
            <PublicSiteContent />
        </PageContentProvider>
    );
};
