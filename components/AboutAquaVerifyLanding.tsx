import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieConsent } from './CookieConsent';
import type { Language } from '../utils/translations';
import { getMarketingPagePath } from '../utils/marketingRoutes.js';
import { getGlossaryTermById, getGlossaryTermHref } from '../utils/glossaryContent.js';

type AboutAquaVerifyLandingProps = {
  content: any;
  pageLang: Language;
  breadcrumbs?: Array<{ name: string; path: string }>;
  showCookieConsent?: boolean;
};

function routePath(routeId: string | undefined, lang: Language) {
  if (!routeId) return getMarketingPagePath('contact', lang);
  return getMarketingPagePath(routeId, lang);
}

function resolveConcepts(content: any, lang: Language) {
  return (content.keyConceptIds || [])
    .map((id: string) => {
      try {
        const term = getGlossaryTermById(id, lang);
        if (!term) return null;
        return {
          id,
          term,
          href: getGlossaryTermHref(id, lang),
          relation: content.keyConceptRelations?.[id] || ''
        };
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

const AboutLinkGrid: React.FC<{
  id?: string;
  title: string;
  links: Array<{ routeId: string; label: string; body: string }>;
  lang: Language;
}> = ({ id, title, links, lang }) => {
  if (!links?.length) return null;

  return (
    <section id={id} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <h2 className="font-heading text-2xl font-black text-primary">{title}</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {links.map((item) => (
          <Link
            key={`${item.routeId}-${item.label}`}
            to={routePath(item.routeId, lang)}
            className="group rounded-xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-cyan-200 hover:bg-cyan-50"
          >
            <h3 className="flex items-center justify-between gap-3 font-heading text-base font-black text-slate-900">
              <span>{item.label}</span>
              <ArrowRight className="h-4 w-4 shrink-0 text-secondary transition group-hover:translate-x-1" aria-hidden="true" />
            </h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.body}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export const AboutAquaVerifyLanding: React.FC<AboutAquaVerifyLandingProps> = ({
  content,
  pageLang,
  breadcrumbs = [],
  showCookieConsent = true
}) => {
  const primaryUrl = routePath(content.cta?.routeId || 'contact', pageLang);
  const concepts = resolveConcepts(content, pageLang) as Array<{
    id: string;
    term: { term: string; definition: string };
    href: string;
    relation: string;
  }>;

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-900">
      <Header />
      <main className="flex-grow pt-20">
        <section className="aq-page-hero">
          <div className="container mx-auto grid gap-10 px-6 py-20 md:py-24 lg:grid-cols-[1fr_0.72fr] lg:items-center">
            <div className="max-w-4xl">
              {breadcrumbs.length > 1 && (
                <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1 text-xs font-bold text-slate-500">
                  {breadcrumbs.map((crumb, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    return (
                      <React.Fragment key={crumb.path}>
                        {isLast ? (
                          <span className="max-w-[18rem] truncate text-primary" aria-current="page">{crumb.name}</span>
                        ) : (
                          <Link to={crumb.path} className="max-w-[12rem] truncate transition hover:text-primary">{crumb.name}</Link>
                        )}
                        {!isLast && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-300" aria-hidden="true" />}
                      </React.Fragment>
                    );
                  })}
                </nav>
              )}
              <div className="aq-hero-eyebrow mb-5">{content.eyebrow}</div>
              <h1 className="aq-gradient-title max-w-4xl font-heading text-4xl font-black leading-tight md:text-6xl">{content.title}</h1>
              <p className="aq-hero-copy mt-6 max-w-3xl text-lg leading-8">{content.description}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link to={primaryUrl} className="aq-cta-primary">
                  {content.primaryCta}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
                <a href="#ecosystem" className="aq-cta-secondary">
                  {content.secondaryCta}
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-2 shadow-2xl">
              <div className="rounded-xl border border-cyan-100 bg-white p-6">
                <div className="flex items-center gap-3">
                  <img src="/images/logo-mark-160.png" alt="" width={40} height={50} className="h-12 w-auto object-contain" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">AquaVerify</p>
                    <p className="mt-1 font-heading text-xl font-black text-primary">{content.ecosystemTable?.title || content.title}</p>
                  </div>
                </div>
                <div className="mt-6 grid gap-3">
                  {(content.pillars || []).map((pillar: any) => (
                    <article key={pillar.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <h2 className="font-heading text-base font-black text-slate-900">{pillar.title}</h2>
                      <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">{pillar.body}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="space-y-8">
              {content.directAnswer && (
                <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                  <h2 className="font-heading text-2xl font-black text-primary">{content.directAnswer.title}</h2>
                  <p className="mt-3 text-base leading-8 text-slate-600">{content.directAnswer.body}</p>
                </section>
              )}

              {content.ecosystemTable && (
                <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                  <h2 className="font-heading text-2xl font-black text-primary">{content.ecosystemTable.title}</h2>
                  <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200">
                    <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                      <caption className="sr-only">{content.ecosystemTable.title}</caption>
                      <thead className="bg-slate-50">
                        <tr>
                          {content.ecosystemTable.columns.map((column: string) => (
                            <th key={column} scope="col" className="px-4 py-3 font-black text-primary">{column}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {content.ecosystemTable.rows.map((row: string[], rowIndex: number) => (
                          <tr key={`${row[0]}-${rowIndex}`}>
                            {content.ecosystemTable.columns.map((column: string, columnIndex: number) => (
                              <td key={`${column}-${columnIndex}`} className="px-4 py-4 font-semibold leading-6 text-slate-600">
                                {row[columnIndex] || ''}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              <AboutLinkGrid id="ecosystem" title={content.ecosystemLinksTitle} links={content.ecosystemLinks || []} lang={pageLang} />

              <div className="grid gap-5 md:grid-cols-3">
                {(content.pillars || []).map((pillar: any) => (
                  <article key={pillar.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="font-heading text-xl font-black text-primary">{pillar.title}</h2>
                    <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{pillar.body}</p>
                  </article>
                ))}
              </div>

              {(content.sections || []).map((section: any, index: number) => (
                <article key={`${section.title}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                  <h2 className="font-heading text-2xl font-black text-primary">{section.title}</h2>
                  <p className="mt-3 text-base leading-8 text-slate-600">{section.body}</p>
                  {section.bullets?.length > 0 && (
                    <ul className="mt-6 grid gap-3 md:grid-cols-2">
                      {section.bullets.map((bullet: string, bulletIndex: number) => (
                        <li key={`${bullet}-${bulletIndex}`} className="flex gap-3 text-sm font-semibold text-slate-700">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}

              {concepts.length > 0 && (
                <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                  <h2 className="font-heading text-2xl font-black text-primary">
                    {pageLang === 'es' ? 'Conceptos clave del glosario' : pageLang === 'fr' ? 'Concepts clés du glossaire' : pageLang === 'it' ? 'Concetti chiave del glossario' : pageLang === 'ca' ? 'Conceptes clau del glossari' : 'Key glossary concepts'}
                  </h2>
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {concepts.map((concept) => (
                      <article key={concept.id} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                        <h3 className="font-heading text-lg font-black text-slate-900">
                          <Link to={concept.href} className="transition hover:text-secondary">{concept.term.term}</Link>
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{concept.term.definition}</p>
                        {concept.relation && (
                          <p className="mt-3 text-sm font-semibold leading-6 text-primary">{concept.relation}</p>
                        )}
                      </article>
                    ))}
                  </div>
                </section>
              )}

              <AboutLinkGrid title={content.evidenceLinksTitle} links={content.evidenceLinks || []} lang={pageLang} />
              <AboutLinkGrid title={content.commercialLinksTitle} links={content.commercialLinks || []} lang={pageLang} />

              {content.faqs?.length > 0 && (
                <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                  <h2 className="font-heading text-2xl font-black text-primary">
                    {pageLang === 'es' ? 'Preguntas frecuentes' : pageLang === 'fr' ? 'Questions fréquentes' : pageLang === 'it' ? 'Domande frequenti' : pageLang === 'ca' ? 'Preguntes freqüents' : 'Frequently asked questions'}
                  </h2>
                  <div className="mt-6 divide-y divide-slate-200">
                    {content.faqs.map((item: any, index: number) => (
                      <article key={`${item.question}-${index}`} className="py-5 first:pt-0 last:pb-0">
                        <h3 className="font-heading text-lg font-black text-slate-900">{item.question}</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{item.answer}</p>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </section>

        {content.cta && (
          <section className="bg-primary py-14 text-white">
            <div className="container mx-auto flex flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center">
              <div className="max-w-3xl">
                <h2 className="font-heading text-3xl font-black">{content.cta.title}</h2>
                <p className="mt-3 text-base leading-8 text-cyan-50/85">{content.cta.body}</p>
              </div>
              <Link to={primaryUrl} className="inline-flex items-center rounded bg-white px-6 py-3 text-sm font-black text-primary transition hover:bg-secondary hover:text-white">
                {content.cta.button}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </section>
        )}
      </main>
      <Footer />
      {showCookieConsent && <CookieConsent />}
    </div>
  );
};

export default AboutAquaVerifyLanding;
