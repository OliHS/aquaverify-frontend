import React, { useEffect } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CookieConsent } from '../components/CookieConsent';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../utils/translations';
import { getPlatformSignupUrl } from '../utils/platformLinks';
import { applyMarketingSeo } from '../utils/seo';
import {
  findMarketingPageByPath,
  getMarketingAlternates,
  getMarketingPagePath,
  getRelatedMarketingPages
} from '../utils/marketingPages.js';

const secondaryTargetByCategory: Record<string, string> = {
  products: 'platform',
  platform: 'products',
  partners: 'products',
  industries: 'products',
  resources: 'products',
  company: 'products'
};

type MarketingPageMeta = {
  parentId?: string;
  schemaType?: string;
};

const UI_LABELS: Record<Language, {
  bridgeEyebrow: string;
  bridgeTitle: string;
  bridgeBody: string;
  products: string;
  platform: string;
  oem: string;
  distributors: string;
  relatedPages: string;
  nextStep: string;
  talkToAquaVerify: string;
}> = {
  en: {
    bridgeEyebrow: 'AquaVerify',
    bridgeTitle: 'Products + platform',
    bridgeBody: 'AquaVerify connects water microbiology products, OEM distribution and cloud workflows so each lead can move from public site to CRM with clear intent.',
    products: 'Products',
    platform: 'Platform',
    oem: 'OEM',
    distributors: 'Distributors',
    relatedPages: 'Related pages',
    nextStep: 'Next step',
    talkToAquaVerify: 'Talk to AquaVerify'
  },
  es: {
    bridgeEyebrow: 'AquaVerify',
    bridgeTitle: 'Productos + plataforma',
    bridgeBody: 'AquaVerify conecta productos de microbiología del agua, distribución OEM y flujos cloud para que cada lead llegue al CRM con intención clara.',
    products: 'Productos',
    platform: 'Plataforma',
    oem: 'OEM',
    distributors: 'Distribuidores',
    relatedPages: 'Páginas relacionadas',
    nextStep: 'Siguiente paso',
    talkToAquaVerify: 'Hablar con AquaVerify'
  },
  fr: {
    bridgeEyebrow: 'AquaVerify',
    bridgeTitle: 'Produits + plateforme',
    bridgeBody: 'AquaVerify connecte produits de microbiologie de l’eau, distribution OEM et flux cloud afin que chaque lead arrive dans le CRM avec une intention claire.',
    products: 'Produits',
    platform: 'Plateforme',
    oem: 'OEM',
    distributors: 'Distributeurs',
    relatedPages: 'Pages associées',
    nextStep: 'Étape suivante',
    talkToAquaVerify: 'Parler à AquaVerify'
  },
  it: {
    bridgeEyebrow: 'AquaVerify',
    bridgeTitle: 'Prodotti + piattaforma',
    bridgeBody: 'AquaVerify collega prodotti di microbiologia dell’acqua, distribuzione OEM e flussi cloud affinché ogni lead arrivi nel CRM con intento chiaro.',
    products: 'Prodotti',
    platform: 'Piattaforma',
    oem: 'OEM',
    distributors: 'Distributori',
    relatedPages: 'Pagine correlate',
    nextStep: 'Passo successivo',
    talkToAquaVerify: 'Parla con AquaVerify'
  },
  ca: {
    bridgeEyebrow: 'AquaVerify',
    bridgeTitle: 'Productes + plataforma',
    bridgeBody: 'AquaVerify connecta productes de microbiologia de l’aigua, distribució OEM i fluxos cloud perquè cada lead arribi al CRM amb intenció clara.',
    products: 'Productes',
    platform: 'Plataforma',
    oem: 'OEM',
    distributors: 'Distribuïdors',
    relatedPages: 'Pàgines relacionades',
    nextStep: 'Següent pas',
    talkToAquaVerify: 'Parlar amb AquaVerify'
  }
};

export const MarketingRoutePage: React.FC = () => {
  const location = useLocation();
  const match = findMarketingPageByPath(location.pathname);
  const { lang, setLang } = useLanguage();

  useEffect(() => {
    if (match && match.lang !== lang) {
      setLang(match.lang as Language);
    }
  }, [lang, match, setLang]);

  useEffect(() => {
    if (!match) return;

    applyMarketingSeo({
      lang: match.lang as Language,
      title: match.content.seoTitle || match.content.title,
      description: match.content.seoDescription || match.content.description,
      canonicalPath: match.content.path,
      alternates: getMarketingAlternates(match.page),
      pageType: (match.page as MarketingPageMeta).schemaType || match.page.category
    });
  }, [match]);

  if (!match) {
    return <Navigate to="/" replace />;
  }

  const page = match.page;
  const content = match.content;
  const pageLang = match.lang as Language;
  const pageMeta = page as MarketingPageMeta;
  const primaryUrl = getPlatformSignupUrl({
    intent: page.primaryIntent,
    page: page.id,
    category: page.category
  }, pageLang);
  const secondaryId = pageMeta.parentId || secondaryTargetByCategory[page.category] || 'products';
  const secondaryUrl = getMarketingPagePath(secondaryId, pageLang);
  const relatedPages = getRelatedMarketingPages(page.id, pageLang);
  const labels = UI_LABELS[pageLang] || UI_LABELS.en;

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-900">
      <Header />
      <main className="flex-grow pt-20">
        <section className="bg-primary text-white">
          <div className="container mx-auto px-6 py-20 md:py-24">
            <div className="max-w-4xl">
              <div className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
                {content.eyebrow || page.category}
              </div>
              <h1 className="max-w-4xl font-heading text-4xl font-black leading-tight md:text-6xl">
                {content.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-cyan-50/85">
                {content.description}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={primaryUrl}
                  className="inline-flex items-center justify-center rounded bg-secondary px-6 py-3 text-sm font-black text-white shadow-lg transition hover:bg-white hover:text-primary"
                >
                  {content.primaryCta || 'Contact AquaVerify'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <Link
                  to={secondaryUrl}
                  className="inline-flex items-center justify-center rounded border border-white/25 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10"
                >
                  {content.secondaryCta || 'Explore AquaVerify'}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto grid gap-8 px-6 lg:grid-cols-[0.8fr_1.2fr]">
            <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">{labels.bridgeEyebrow}</div>
              <h2 className="mt-3 font-heading text-2xl font-black text-primary">
                {labels.bridgeTitle}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {labels.bridgeBody}
              </p>
              <div className="mt-6 grid gap-2 text-sm font-bold text-slate-700">
                <Link className="hover:text-primary" to={getMarketingPagePath('products', pageLang)}>{labels.products}</Link>
                <Link className="hover:text-primary" to={getMarketingPagePath('platform', pageLang)}>{labels.platform}</Link>
                <Link className="hover:text-primary" to={getMarketingPagePath('oem', pageLang)}>{labels.oem}</Link>
                <Link className="hover:text-primary" to={getMarketingPagePath('distributors', pageLang)}>{labels.distributors}</Link>
              </div>
            </aside>

            <div className="space-y-8">
              {content.sections.map((section: any, index: number) => (
                <article key={`${section.title}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                  <h2 className="font-heading text-2xl font-black text-primary">{section.title}</h2>
                  <p className="mt-3 text-base leading-8 text-slate-600">{section.body}</p>
                  {section.bullets?.length > 0 && (
                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                      {section.bullets.map((bullet: string) => (
                        <li key={bullet} className="flex gap-3 text-sm font-semibold text-slate-700">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {relatedPages.length > 0 && (
          <section className="bg-surface py-16">
            <div className="container mx-auto px-6">
              <h2 className="font-heading text-3xl font-black text-primary">{labels.relatedPages}</h2>
              <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {relatedPages.map((related: any) => (
                  <Link
                    key={related.id}
                    to={related.path}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <h3 className="font-heading text-lg font-black text-slate-900">{related.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{related.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-primary py-14 text-white">
          <div className="container mx-auto flex flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">{labels.nextStep}</div>
              <h2 className="mt-2 font-heading text-3xl font-black">{labels.talkToAquaVerify}</h2>
            </div>
            <a
              href={primaryUrl}
              className="inline-flex items-center rounded bg-white px-6 py-3 text-sm font-black text-primary transition hover:bg-secondary hover:text-white"
            >
              {content.primaryCta || 'Contact AquaVerify'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default MarketingRoutePage;
