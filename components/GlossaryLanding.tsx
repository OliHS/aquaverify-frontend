import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle2, Filter, Layers, Search } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieConsent } from './CookieConsent';
import type { Language } from '../utils/translations';
import {
  getGlossaryHubContent,
  getGlossaryIndustryExplorer,
  getGlossaryRelatedLinks,
  getGlossaryRelatedTerms,
  getGlossaryTermById,
  getGlossaryTermHref,
  getGlossaryTermPageId,
  getGlossaryTermSectorApplications,
  glossaryAbsolute,
  isPriorityGlossaryTerm
} from '../utils/glossaryContent.js';
import { getMarketingPagePath } from '../utils/marketingRoutes.js';
import { getPlatformSignupUrl } from '../utils/platformLinks';

type GlossaryLandingProps = {
  content: {
    title: string;
    description: string;
    path: string;
  };
  pageLang: Language;
  termId?: string | number;
  showCookieConsent?: boolean;
};

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
  if (!accent || !text.includes(accent)) return <>{text}</>;
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

function TermBadge({ priority, labels }: { priority: boolean; labels: ReturnType<typeof getGlossaryHubContent> }) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] ${
      priority
        ? 'border-cyan-100 bg-cyan-50 text-cyan-800'
        : 'border-slate-200 bg-white text-slate-500'
    }`}>
      {priority ? labels.priority : labels.supporting}
    </span>
  );
}

function TermCard({ term, labels }: { term: any; labels: ReturnType<typeof getGlossaryHubContent> }) {
  const priority = isPriorityGlossaryTerm(term.id);
  const href = getGlossaryTermHref(term.id, labels.lang);
  return (
    <article id={`termino-${term.id}`} itemScope itemType="https://schema.org/DefinedTerm" className="group flex h-full scroll-mt-28 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl">
      <meta itemProp="termCode" content={term.id} />
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full bg-slate-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-slate-500">
          {term.categoryLabel}
        </span>
        <TermBadge priority={priority} labels={labels} />
      </div>
      <h3 itemProp="name" className="mt-4 font-heading text-xl font-black leading-tight text-primary">{term.term}</h3>
      <p itemProp="description" className="mt-3 text-sm leading-6 text-slate-600">{term.definition}</p>
      <div className="mt-4 grid gap-2 text-xs font-bold text-slate-500">
        <span>{labels.product}: <b className="text-slate-800">{term.product}</b></span>
        <span>{labels.sector}: <b className="text-slate-800">{term.sector}</b></span>
      </div>
      <div className="mt-auto pt-5">
        <Link to={href} className={`inline-flex items-center text-sm font-black transition group-hover:text-primary ${priority ? 'text-secondary' : 'text-slate-500'}`}>
          {priority ? labels.termCta : labels.supporting}
          <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

const EXTRA_LABELS: Record<string, any> = {
  en: {
    sectorExplorerTitle: 'Explore concepts by sector',
    sectorExplorerBody: 'Jump from each industry to the terms that explain its water-control workflow.',
    sectorLink: 'Open sector',
    sectorApplications: 'Sector applications',
    whySector: 'Why it matters',
    sources: 'Editorial sources',
    reviewed: 'Reviewed'
  },
  es: {
    sectorExplorerTitle: 'Explorar conceptos por sector',
    sectorExplorerBody: 'Salta de cada industria a los conceptos que explican su flujo de control del agua.',
    sectorLink: 'Ver sector',
    sectorApplications: 'Aplicaciones por sector',
    whySector: 'Por qué importa',
    sources: 'Fuentes editoriales',
    reviewed: 'Revisado'
  },
  fr: {
    sectorExplorerTitle: 'Explorer les concepts par secteur',
    sectorExplorerBody: 'Passez de chaque industrie aux concepts qui expliquent son flux de contrôle de l’eau.',
    sectorLink: 'Voir le secteur',
    sectorApplications: 'Applications par secteur',
    whySector: 'Pourquoi c’est important',
    sources: 'Sources éditoriales',
    reviewed: 'Révisé'
  },
  it: {
    sectorExplorerTitle: 'Esplora i concetti per settore',
    sectorExplorerBody: 'Passa da ogni settore ai concetti che spiegano il workflow di controllo dell’acqua.',
    sectorLink: 'Apri settore',
    sectorApplications: 'Applicazioni per settore',
    whySector: 'Perché conta',
    sources: 'Fonti editoriali',
    reviewed: 'Revisionato'
  },
  ca: {
    sectorExplorerTitle: 'Explorar conceptes per sector',
    sectorExplorerBody: 'Ves de cada sector als conceptes que expliquen el seu flux de control de l’aigua.',
    sectorLink: 'Veure sector',
    sectorApplications: 'Aplicacions per sector',
    whySector: 'Per què importa',
    sources: 'Fonts editorials',
    reviewed: 'Revisat'
  }
};

export const GlossaryLanding: React.FC<GlossaryLandingProps> = ({
  content,
  pageLang,
  termId,
  showCookieConsent = true
}) => {
  const labels = getGlossaryHubContent(pageLang);
  const extra = EXTRA_LABELS[pageLang] || EXTRA_LABELS.en;
  const term = termId !== undefined && termId !== null ? getGlossaryTermById(termId, pageLang) : null;
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();
  const resourcesUrl = getMarketingPagePath('resources', pageLang);
  const recommendationUrl = getPlatformSignupUrl({
    intent: 'product_recommendation',
    page: term ? getGlossaryTermPageId(term.id) : 'glossary',
    category: 'glossary'
  }, pageLang);

  const visibleTerms = useMemo(() => {
    return labels.terms.filter((item: any) => {
      const categoryMatch = activeCategory === 'all' || item.category === activeCategory;
      const haystack = [
        item.term,
        item.slug,
        item.categoryLabel,
        item.definition,
        item.application,
        item.product,
        item.sector,
        ...(item.keywords || [])
      ].join(' ').toLowerCase();
      return categoryMatch && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [activeCategory, labels.terms, normalizedQuery]);

  useEffect(() => {
    if (term) {
      upsertJsonLd('glossary-defined-term', {
        '@context': 'https://schema.org',
        '@type': 'DefinedTerm',
        '@id': `${glossaryAbsolute(getGlossaryTermHref(term.id, pageLang))}#defined-term`,
        name: term.term,
        description: term.definition,
        url: glossaryAbsolute(getGlossaryTermHref(term.id, pageLang)),
        termCode: term.id,
        ...(term.aliases?.length ? { alternateName: term.aliases } : {}),
        inDefinedTermSet: {
          '@type': 'DefinedTermSet',
          '@id': `${glossaryAbsolute(labels.path)}#defined-term-set`,
          name: labels.title,
          url: glossaryAbsolute(labels.path)
        }
      });
      removeJsonLd('glossary-defined-term-set');
      return () => removeJsonLd('glossary-defined-term');
    }

    upsertJsonLd('glossary-defined-term-set', {
      '@context': 'https://schema.org',
      '@type': 'DefinedTermSet',
      '@id': `${glossaryAbsolute(labels.path)}#defined-term-set`,
      name: labels.title,
      description: labels.lead,
      url: glossaryAbsolute(labels.path),
        hasDefinedTerm: labels.terms.map((item: any) => ({
          '@type': 'DefinedTerm',
          name: item.term,
          description: item.definition,
          termCode: item.id,
          url: glossaryAbsolute(getGlossaryTermHref(item.id, pageLang)),
          inDefinedTermSet: glossaryAbsolute(labels.path)
        }))
      });
    removeJsonLd('glossary-defined-term');
    return () => removeJsonLd('glossary-defined-term-set');
  }, [labels, term]);

  if (term) {
    const relatedLinks = getGlossaryRelatedLinks(term, pageLang);
    const relatedTerms = getGlossaryRelatedTerms(term, pageLang, 6);
    const sectorApplications = getGlossaryTermSectorApplications(term.id, pageLang);

    return (
      <div className="flex min-h-screen flex-col bg-white font-sans text-slate-900">
        <Header />
        <main className="flex-grow pt-20">
          <section className="aq-page-hero">
            <div className="container mx-auto grid gap-10 px-6 py-20 md:py-24 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center">
              <div className="max-w-5xl">
                <Link to={labels.path} className="mb-5 inline-flex text-sm font-black text-cyan-700 transition hover:text-primary">
                  {labels.back}
                </Link>
                <div className="aq-hero-eyebrow mb-5">{term.categoryLabel}</div>
                <h1 className="aq-gradient-title max-w-5xl font-heading text-4xl font-black leading-[1.02] md:text-6xl">
                  {term.term}
                </h1>
                <p className="aq-hero-copy mt-6 max-w-4xl text-lg leading-8 md:text-xl">{term.definition}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={recommendationUrl} className="aq-cta-primary">
                    {labels.contact}
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </a>
                  <Link to={resourcesUrl} className="aq-cta-secondary">{labels.secondaryCta}</Link>
                </div>
              </div>
              <aside className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-xl">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-black uppercase tracking-[0.16em] text-cyan-700">{labels.glossaryLabel}</span>
                  <BookOpen className="h-5 w-5 text-secondary" aria-hidden="true" />
                </div>
                <div className="mt-5 grid gap-3">
                  {[
                    [labels.product, term.product],
                    [labels.sector, term.sector],
                    [labels.application, term.application]
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                      <div className="text-[11px] font-black uppercase tracking-[0.12em] text-slate-500">{label}</div>
                      <p className="mt-2 text-sm font-bold leading-6 text-primary">{value}</p>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </section>

          <section className="bg-white py-16 md:py-20">
            <div className="container mx-auto px-6">
              <div className="mb-8 max-w-4xl">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">{labels.relatedTitle}</div>
                <h2 className="mt-3 font-heading text-3xl font-black leading-tight text-primary md:text-5xl">{labels.relatedTitle}</h2>
                <p className="mt-4 text-base leading-8 text-slate-600">{labels.relatedBody}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                {relatedLinks.map((link) => (
                  <a key={link.id} href={link.href} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg">
                    <span className="text-[11px] font-black uppercase tracking-[0.14em] text-cyan-700">{link.kind}</span>
                    <h3 className="mt-3 font-heading text-lg font-black leading-tight text-primary">{link.label}</h3>
                    <span className="mt-4 inline-flex items-center text-sm font-black text-secondary">
                      {labels.termCta}
                      <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {sectorApplications.length > 0 && (
            <section className="bg-slate-50 py-16 md:py-20">
              <div className="container mx-auto px-6">
                <div className="mb-8 max-w-4xl">
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">{labels.sector}</div>
                  <h2 className="mt-3 font-heading text-3xl font-black leading-tight text-primary md:text-5xl">{extra.sectorApplications}</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {sectorApplications.map((item: any) => (
                    <article key={item.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                      <h3 className="font-heading text-xl font-black leading-tight text-primary">
                        <Link to={item.href}>{item.title}</Link>
                      </h3>
                      <p className="mt-3 text-sm font-semibold uppercase tracking-[0.12em] text-cyan-700">{extra.whySector}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.relevance}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}

          <section className="bg-white py-16 md:py-20">
            <div className="container mx-auto px-6">
              <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">{term.categoryLabel}</div>
                  <h2 className="mt-3 font-heading text-3xl font-black leading-tight text-primary md:text-5xl">{labels.relatedTerms}</h2>
                </div>
                <Link to={labels.path} className="aq-cta-secondary w-fit">{labels.back}</Link>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {relatedTerms.map((item: any) => (
                  <TermCard key={item.id} term={item} labels={labels} />
                ))}
              </div>
            </div>
          </section>

          {term.sourceRefs?.length > 0 && (
            <section className="bg-slate-50 py-12">
              <div className="container mx-auto px-6">
                <h2 className="font-heading text-2xl font-black text-primary">{extra.sources}</h2>
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {term.sourceRefs.map((source: any) => (
                    <a key={`${source.title}-${source.url}`} href={source.url} className="rounded-lg border border-slate-200 bg-white p-4 text-sm font-semibold leading-6 text-slate-600 shadow-sm">
                      <strong className="block text-primary">{source.title}</strong>
                      <span>{source.organization} · {source.year} · {extra.reviewed}: {source.reviewed}</span>
                    </a>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
        <Footer />
        {showCookieConsent && <CookieConsent />}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-900">
      <Header />
      <main className="flex-grow pt-20">
        <section className="aq-page-hero overflow-hidden">
          <div className="container mx-auto grid gap-10 px-6 py-20 md:py-24 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-center">
            <div className="max-w-5xl">
              <div className="aq-hero-eyebrow mb-5">{labels.eyebrow}</div>
              <h1 className="aq-gradient-title max-w-5xl font-heading text-4xl font-black leading-[1.02] md:text-6xl">
                <GradientTitle text={labels.title} accent={labels.titleAccent} />
              </h1>
              <p className="aq-hero-copy mt-6 max-w-4xl text-lg leading-8 md:text-xl">{labels.lead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#priority-terms" className="aq-cta-primary">
                  {labels.primaryCta}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
                <Link to={resourcesUrl} className="aq-cta-secondary">{labels.secondaryCta}</Link>
              </div>
            </div>

            <aside className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-xl">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-black uppercase tracking-[0.16em] text-cyan-700">AquaVerify</span>
                <Layers className="h-5 w-5 text-secondary" aria-hidden="true" />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <strong className="block text-3xl font-black text-primary">{labels.termsCount}</strong>
                  <span className="mt-2 block text-[11px] font-black uppercase tracking-[0.12em] text-slate-500">{labels.termsLabel}</span>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <strong className="block text-3xl font-black text-primary">{labels.priorityPagesCount}</strong>
                  <span className="mt-2 block text-[11px] font-black uppercase tracking-[0.12em] text-slate-500">{labels.priorityPagesLabel}</span>
                </div>
              </div>
              <p className="mt-5 text-sm font-semibold leading-6 text-slate-600">{content.description}</p>
            </aside>
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6">
            <div className="mb-8 max-w-4xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">{labels.sector}</div>
              <h2 className="mt-3 font-heading text-3xl font-black leading-tight text-primary md:text-5xl">{extra.sectorExplorerTitle}</h2>
              <p className="mt-4 text-base leading-8 text-slate-600">{extra.sectorExplorerBody}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {getGlossaryIndustryExplorer(pageLang).map((industry: any) => (
                <article key={industry.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="font-heading text-xl font-black leading-tight text-primary">
                    <Link to={industry.href}>{industry.title}</Link>
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{industry.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {industry.terms.slice(0, 5).map((item: any) => (
                      <Link key={item.id} to={item.href} className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-black text-cyan-800">
                        {item.term}
                      </Link>
                    ))}
                  </div>
                  <Link to={industry.href} className="mt-5 inline-flex items-center text-sm font-black text-secondary">
                    {extra.sectorLink}
                    <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="priority-terms" className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <div className="sticky top-24 z-20 rounded-[1.75rem] border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={labels.searchPlaceholder}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm font-semibold text-slate-800 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveCategory('all')}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-black transition ${
                    activeCategory === 'all' ? 'border-primary bg-primary text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-cyan-200 hover:bg-cyan-50'
                  }`}
                >
                  <Filter className="h-3.5 w-3.5" aria-hidden="true" />
                  {labels.all}
                </button>
                {labels.categories.map((category: any) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategory(category.id)}
                    className={`rounded-full border px-3 py-2 text-xs font-black transition ${
                      activeCategory === category.id ? 'border-primary bg-primary text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-cyan-200 hover:bg-cyan-50'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {visibleTerms.map((item: any) => (
                <TermCard key={item.id} term={item} labels={labels} />
              ))}
            </div>
            {!visibleTerms.length && (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm font-bold text-slate-500">
                {labels.noResults}
              </div>
            )}
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6">
            <div className="rounded-[2rem] bg-primary p-8 text-white shadow-2xl md:p-10">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">{labels.relatedTitle}</div>
                  <h2 className="mt-3 font-heading text-3xl font-black leading-tight md:text-5xl">{labels.relatedTitle}</h2>
                  <p className="mt-4 max-w-3xl text-base leading-8 text-cyan-50/85">{labels.relatedBody}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href={recommendationUrl} className="inline-flex items-center justify-center rounded-full bg-secondary px-5 py-3 text-sm font-black text-white shadow-lg transition hover:bg-white hover:text-primary">
                    {labels.contact}
                  </a>
                  <Link to={getMarketingPagePath('distributors', pageLang)} className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10">
                    {labels.distributors}
                  </Link>
                </div>
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

export default GlossaryLanding;
