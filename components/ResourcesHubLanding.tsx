import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle2,
  Cloud,
  Download,
  FileText,
  Filter,
  FlaskConical,
  Handshake,
  Layers,
  Search,
  ShieldCheck
} from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieConsent } from './CookieConsent';
import type { Language } from '../utils/translations';
import { getMarketingPagePath } from '../utils/marketingRoutes.js';
import { getPlatformSignupUrl } from '../utils/platformLinks';
import {
  getChecklistHref,
  getResourcesHubContent
} from '../utils/resourcesHubContent.js';

const SITE_URL = 'https://aquaverify.com';
const FILTER_KEYS = ['all', 'viral', 'compliance', 'methods', 'software', 'product', 'sector', 'partner'];

type ResourcesHubLandingProps = {
  content: {
    title: string;
    description: string;
    path: string;
  };
  pageLang: Language;
  showCookieConsent?: boolean;
};

function absolute(pathOrUrl: string) {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`;
}

function upsertJsonLd(id: string, payload: Record<string, unknown>) {
  let element = document.head.querySelector<HTMLScriptElement>(`script[type="application/ld+json"][data-id="${id}"]`);
  if (!element) {
    element = document.createElement('script');
    element.type = 'application/ld+json';
    element.dataset.id = id;
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(payload);
}

function removeJsonLd(id: string) {
  document.head.querySelector<HTMLScriptElement>(`script[type="application/ld+json"][data-id="${id}"]`)?.remove();
}

function GradientTitle({ text, accent }: { text: string; accent?: string }) {
  if (!accent || !text.includes(accent)) {
    return <>{text}</>;
  }

  const [before, after] = text.split(accent);
  return (
    <>
      {before}
      <span className="bg-gradient-to-r from-primary via-secondary to-emerald-500 bg-clip-text text-transparent">
        {accent}
      </span>
      {after}
    </>
  );
}

function categoryIcon(category: string) {
  const iconClass = 'h-5 w-5';
  if (category === 'viral') return <ShieldCheck className={iconClass} aria-hidden="true" />;
  if (category === 'compliance') return <FileText className={iconClass} aria-hidden="true" />;
  if (category === 'methods') return <FlaskConical className={iconClass} aria-hidden="true" />;
  if (category === 'software') return <Cloud className={iconClass} aria-hidden="true" />;
  if (category === 'partner') return <Handshake className={iconClass} aria-hidden="true" />;
  if (category === 'sector') return <Building2 className={iconClass} aria-hidden="true" />;
  return <Layers className={iconClass} aria-hidden="true" />;
}

export const ResourcesHubLanding: React.FC<ResourcesHubLandingProps> = ({
  content,
  pageLang,
  showCookieConsent = true
}) => {
  const copy = getResourcesHubContent(pageLang);
  const [activeFilter, setActiveFilter] = useState('all');
  const [query, setQuery] = useState('');
  const recommendationUrl = getPlatformSignupUrl({
    intent: 'product_recommendation',
    page: 'resources',
    category: 'resources'
  }, pageLang);

  const normalizedQuery = query.trim().toLowerCase();
  const checklists = useMemo(() => copy.checklists.map(([id, title, body, categories]) => ({
    id,
    title,
    body,
    categories,
    href: getChecklistHref(pageLang, id),
    search: `${title} ${body} ${String((categories || []).join(' '))}`.toLowerCase()
  })), [copy.checklists, pageLang]);

  const matches = (categories: string[] = [], haystack = '') => {
    const categoryMatch = activeFilter === 'all' || categories.includes(activeFilter);
    const queryMatch = !normalizedQuery || haystack.toLowerCase().includes(normalizedQuery);
    return categoryMatch && queryMatch;
  };

  const visibleWhitepapers = copy.whitepapers.filter((item: any) => {
    const haystack = [
      item.title,
      item.body,
      item.audience,
      item.region,
      item.level,
      item.reading,
      item.search,
      ...(item.tags || [])
    ].join(' ');
    return matches(item.categories, haystack);
  });

  const visibleChecklists = checklists.filter((item: any) => matches(item.categories, item.search));
  const hasResults = visibleWhitepapers.length > 0 || visibleChecklists.length > 0;

  useEffect(() => {
    const pagePath = getMarketingPagePath('resources', pageLang);
    const whitepaperItems = copy.whitepapers.map((item: any, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.title,
      url: absolute(getMarketingPagePath(item.id, pageLang))
    }));
    const checklistItems = checklists.map((item: any, index: number) => ({
      '@type': 'ListItem',
      position: copy.whitepapers.length + index + 1,
      name: item.title,
      url: absolute(item.href)
    }));

    upsertJsonLd('resources-itemlist', {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: copy.whitepapersTitle,
      url: absolute(pagePath),
      itemListElement: [...whitepaperItems, ...checklistItems]
    });

    upsertJsonLd('resources-techarticles', {
      '@context': 'https://schema.org',
      '@graph': copy.whitepapers.map((item: any) => ({
        '@type': 'TechArticle',
        headline: item.title,
        description: item.body,
        url: absolute(getMarketingPagePath(item.id, pageLang)),
        inLanguage: pageLang,
        keywords: (item.tags || []).join(', '),
        publisher: {
          '@type': 'Organization',
          name: 'AquaVerify',
          url: SITE_URL
        }
      }))
    });

    return () => {
      removeJsonLd('resources-itemlist');
      removeJsonLd('resources-techarticles');
    };
  }, [checklists, copy, pageLang]);

  const setCategoryAndScroll = (category: string) => {
    setActiveFilter(category);
    window.requestAnimationFrame(() => {
      document.getElementById('resources-library')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-900">
      <Header />
      <main className="flex-grow pt-20">
        <section className="aq-page-hero overflow-hidden">
          <div className="container mx-auto grid gap-10 px-6 py-20 md:py-24 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-center">
            <div className="max-w-5xl">
              <div className="aq-hero-eyebrow mb-5">{copy.eyebrow}</div>
              <h1 className="aq-gradient-title max-w-5xl font-heading text-4xl font-black leading-[1.02] md:text-6xl">
                <GradientTitle text={copy.title} accent={copy.titleAccent} />
              </h1>
              <p className="aq-hero-copy mt-6 max-w-4xl text-lg leading-8 md:text-xl">{copy.lead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#whitepapers" className="aq-cta-primary">
                  {copy.primaryCta}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
                <a href="#checklists" className="aq-cta-secondary">
                  {copy.secondaryCta}
                </a>
                <a href={recommendationUrl} className="aq-cta-secondary">
                  {copy.tertiaryCta}
                </a>
              </div>
            </div>

            <aside className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-xl">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-black uppercase tracking-[0.16em] text-cyan-700">{copy.panelLabel}</span>
                <BookOpen className="h-5 w-5 text-secondary" aria-hidden="true" />
              </div>
              <h2 className="mt-4 font-heading text-2xl font-black leading-tight text-primary">{copy.panelTitle}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{copy.panelBody}</p>
              <div className="mt-5 grid grid-cols-2 gap-2">
                {copy.panelChips.map((chip: string) => (
                  <span key={chip} className="rounded-2xl border border-slate-100 bg-slate-50 px-3 py-3 text-center text-[11px] font-black uppercase tracking-[0.12em] text-slate-600">
                    {chip}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="bg-white py-14 md:py-18">
          <div className="container mx-auto px-6">
            <div className="mb-8 max-w-4xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">{copy.intentEyebrow}</div>
              <h2 className="mt-3 font-heading text-3xl font-black leading-tight text-primary md:text-5xl">{copy.intentTitle}</h2>
              <p className="mt-4 text-base leading-8 text-slate-600">{copy.intentBody}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {copy.intents.map(([category, title, body]: any) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setCategoryAndScroll(category)}
                  className={`group rounded-2xl border p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
                    activeFilter === category ? 'border-secondary bg-cyan-50' : 'border-slate-200 bg-white hover:border-cyan-200'
                  }`}
                >
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-secondary/10 group-hover:text-secondary">
                    {categoryIcon(category)}
                  </span>
                  <h3 className="font-heading text-lg font-black text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="resources-library" className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-4xl">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">{copy.whitepapersEyebrow}</div>
                <h2 id="whitepapers" className="mt-3 font-heading text-3xl font-black leading-tight text-primary md:text-5xl">{copy.whitepapersTitle}</h2>
                <p className="mt-4 text-base leading-8 text-slate-600">{copy.whitepapersBody}</p>
              </div>
              <a href={recommendationUrl} className="aq-cta-primary shrink-0">
                {copy.recommendationCta}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm md:p-5">
              <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
                <label className="relative block">
                  <span className="sr-only">{copy.searchPlaceholder}</span>
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={copy.searchPlaceholder}
                    className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                    type="search"
                  />
                </label>
                <div className="flex flex-wrap gap-2">
                  {FILTER_KEYS.map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveFilter(filter)}
                      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-black transition ${
                        activeFilter === filter
                          ? 'border-secondary bg-secondary text-white shadow-lg shadow-cyan-500/20'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-cyan-200 hover:bg-cyan-50'
                      }`}
                    >
                      {filter === 'all' ? <Filter className="h-3.5 w-3.5" aria-hidden="true" /> : null}
                      {copy.filters[filter]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {!hasResults && (
              <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-5 text-sm font-semibold leading-6 text-amber-950">
                {copy.noResults}
              </div>
            )}

            {visibleWhitepapers.length > 0 && (
              <div className="mt-8 grid gap-5 lg:grid-cols-2">
                {visibleWhitepapers.map((item: any) => (
                  <article key={item.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-cyan-700">{item.label}</span>
                      {item.tags.map((tag: string) => (
                        <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-black text-slate-500">{tag}</span>
                      ))}
                    </div>
                    <h3 className="mt-5 font-heading text-2xl font-black leading-tight text-slate-950">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
                    <dl className="mt-5 grid gap-2 sm:grid-cols-2">
                      {[
                        [copy.metaLabels.audience, item.audience],
                        [copy.metaLabels.region, item.region],
                        [copy.metaLabels.level, item.level],
                        [copy.metaLabels.reading, item.reading]
                      ].map(([label, value]) => (
                        <div key={label} className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                          <dt className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">{label}</dt>
                          <dd className="mt-1 text-sm font-black text-primary">{value}</dd>
                        </div>
                      ))}
                    </dl>
                    <Link to={getMarketingPagePath(item.id, pageLang)} className="mt-6 inline-flex items-center text-sm font-black text-secondary transition hover:text-primary">
                      {copy.metaLabels.open}
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </article>
                ))}
              </div>
            )}

            <div id="checklists" className="mt-12">
              <div className="mb-6 max-w-4xl">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">{copy.checklistsEyebrow}</div>
                <h2 className="mt-3 font-heading text-3xl font-black leading-tight text-primary md:text-4xl">{copy.checklistsTitle}</h2>
                <p className="mt-4 text-base leading-8 text-slate-600">{copy.checklistsBody}</p>
              </div>
              {visibleChecklists.length > 0 && (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {visibleChecklists.map((item: any) => (
                    <a
                      key={item.id}
                      href={item.href}
                      download
                      data-no-spa="true"
                      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg"
                    >
                      <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-primary transition group-hover:bg-secondary/10 group-hover:text-secondary">
                        <Download className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="font-heading text-lg font-black leading-tight text-slate-950">{item.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{item.body}</p>
                      <span className="mt-5 inline-flex items-center text-sm font-black text-secondary">
                        {copy.metaLabels.download}
                        <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6">
            <h2 className="font-heading text-3xl font-black leading-tight text-primary md:text-5xl">{copy.nextTitle}</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {copy.routes.map(([id, title, body]: any) => (
                <Link key={id} to={getMarketingPagePath(id, pageLang)} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg">
                  <h3 className="font-heading text-lg font-black text-slate-950">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
                  <span className="mt-5 inline-flex items-center text-sm font-black text-secondary">
                    {copy.metaLabels.related}
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto grid gap-10 px-6 lg:grid-cols-2">
            <div>
              <h2 className="font-heading text-3xl font-black leading-tight text-primary">{copy.sectorTitle}</h2>
              <div className="mt-6 grid gap-3">
                {copy.sectors.map(([id, title, body]: any) => (
                  <Link key={id} to={getMarketingPagePath(id, pageLang)} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-cyan-200 hover:bg-cyan-50/40">
                    <h3 className="font-heading text-base font-black text-slate-950">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{body}</p>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-heading text-3xl font-black leading-tight text-primary">{copy.productTitle}</h2>
              <div className="mt-6 grid gap-3">
                {copy.products.map(([id, title, body]: any) => (
                  <Link key={id} to={getMarketingPagePath(id, pageLang)} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-cyan-200 hover:bg-cyan-50/40">
                    <h3 className="font-heading text-base font-black text-slate-950">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{body}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6">
            <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-cyan-50 to-emerald-50 p-8 shadow-xl md:p-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="max-w-3xl">
                  <h2 className="font-heading text-3xl font-black leading-tight text-primary md:text-5xl">{copy.finalTitle}</h2>
                  <p className="mt-4 text-base leading-8 text-slate-600">{copy.finalBody}</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <a href={recommendationUrl} className="aq-cta-primary">
                    {copy.finalPrimary}
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </a>
                  <Link to={getMarketingPagePath('distributors', pageLang)} className="aq-cta-secondary">{copy.finalSecondary}</Link>
                  <Link to={getMarketingPagePath('oem', pageLang)} className="aq-cta-secondary">{copy.finalTertiary}</Link>
                </div>
              </div>
            </div>

            <div className="mt-12 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="font-heading text-3xl font-black text-primary">FAQ</h2>
              <div className="mt-6 divide-y divide-slate-200">
                {copy.faqs.map(([question, answer]: any) => (
                  <details key={question} className="group py-5 first:pt-0 last:pb-0">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-lg font-black text-slate-950">
                      {question}
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-primary transition group-open:rotate-90">
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </summary>
                    <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600">{answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {showCookieConsent && <CookieConsent />}
    </div>
  );
};

export default ResourcesHubLanding;
