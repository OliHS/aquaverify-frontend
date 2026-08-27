import React from 'react';
import { Link } from 'react-router-dom';
import type { Language } from '../../utils/translations';
import { getMarketingPagePath } from '../../utils/marketingRoutes.js';
import { getGlossaryTermById, getGlossaryTermHref } from '../../utils/glossaryContent.js';
import { getPlatformSignupUrl } from '../../utils/platformLinks';
import { AquaToolFormShell } from './AquaToolFormShell';

export const AquaToolPage: React.FC<{ page: any; content: any; pageLang: Language }> = ({ page, content, pageLang }) => {
  const tool = content.aquatools;
  const labels = tool.labels;
  const cloudUrl = getPlatformSignupUrl({
    intent: 'aquatools',
    origin: 'aquatools-free',
    tool_id: tool.coreToolId
  }, pageLang);

  const relatedTools = (tool.relatedToolIds || []).map((id: string) => ({
    id,
    title: id,
    path: getMarketingPagePath(id, pageLang)
  }));

  return (
    <main className="bg-white pt-28">
      <section className="border-b border-cyan-100 bg-cyan-50/60 px-6 py-12">
        <div className="container mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="text-sm font-bold text-slate-600">
            <Link to={getMarketingPagePath('aquatools', pageLang)} className="text-primary hover:text-secondary">AquaTools Free</Link>
            <span className="mx-2">/</span>
            <span>{content.title}</span>
          </nav>
          <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-primary">AquaTools Free · {tool.labels.categories[tool.categoryId]}</p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-black leading-tight text-primary md:text-5xl">{content.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">{tool.directAnswer}</p>
          <p className="mt-5 max-w-3xl rounded-lg border border-cyan-100 bg-white p-4 text-sm font-bold text-slate-700">{tool.privacy}</p>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="container mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-8">
            <AquaToolFormShell tool={tool} labels={labels} lang={pageLang} canonicalPath={content.path} />
            <InfoBlock title={labels.formula} body={tool.formula} />
            <InfoBlock title={labels.variables} body={tool.units.join(', ')} />
            <InfoBlock title={labels.example} body={tool.exampleText} bullets={[tool.expectedResult]} />
            <InfoBlock title={labels.interpretation} body={tool.directAnswer} />
            <InfoBlock title={labels.validations} body={labels.validationBody} />
            <InfoBlock title={labels.warnings} body={tool.disclaimer} />
            <InfoBlock title={labels.limitations} body={labels.cloudBody} />
            <InfoBlock title={labels.sources} body={labels.sourcesBody} />
          </div>

          <aside className="space-y-5">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-heading text-lg font-black text-primary">{labels.cloudTitle}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{labels.cloudCta}</p>
              <a href={cloudUrl} className="mt-4 inline-flex rounded-full bg-secondary px-5 py-3 text-sm font-black text-white shadow-lg shadow-cyan-500/20 hover:bg-primary">{labels.primaryCta}</a>
            </div>
            <SideList title={labels.relatedTools} items={relatedTools} />
            <SideList title={labels.glossary} items={(tool.glossaryTermIds || []).map((id: string) => {
              const term = getGlossaryTermById(id, pageLang);
              return { id, title: term?.term || id, path: getGlossaryTermHref(id, pageLang) };
            })} />
            <SideList title={labels.industries} items={(tool.industryIds || []).map((id: string) => ({ id, title: id, path: getMarketingPagePath(id, pageLang) }))} />
            <SideList title={labels.resources} items={(tool.resourceIds || []).map((id: string) => ({ id, title: id, path: getMarketingPagePath(id, pageLang) }))} />
            <SideList title={labels.products} items={(tool.productIds || []).map((id: string) => ({ id, title: id, path: getMarketingPagePath(id, pageLang) }))} />
          </aside>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 px-6 py-10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-heading text-2xl font-black text-primary">{labels.faq}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {(content.faqs || []).map((faq: any) => (
              <article key={faq.question} className="rounded-lg border border-slate-200 bg-white p-5">
                <h3 className="font-bold text-slate-950">{faq.question}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

const InfoBlock: React.FC<{ title: string; body: string; bullets?: string[] }> = ({ title, body, bullets = [] }) => (
  <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
    <h2 className="font-heading text-xl font-black text-primary">{title}</h2>
    <p className="mt-3 text-sm leading-7 text-slate-700">{body}</p>
    {bullets.length > 0 && (
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
        {bullets.map((item) => <li key={item}>{item}</li>)}
      </ul>
    )}
  </section>
);

const SideList: React.FC<{ title: string; items: Array<{ id: string; title: string; path: string }> }> = ({ title, items }) => (
  <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
    <h2 className="font-heading text-lg font-black text-primary">{title}</h2>
    <ul className="mt-3 space-y-2 text-sm">
      {items.map((item) => (
        <li key={item.id}>
          <Link to={item.path} className="font-bold text-slate-700 hover:text-secondary">{item.title}</Link>
        </li>
      ))}
    </ul>
  </div>
);
