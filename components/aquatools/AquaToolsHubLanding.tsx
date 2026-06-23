import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import type { Language } from '../../utils/translations';
import { AQUATOOLS_COPY, AQUATOOLS_TOOL_DEFINITIONS } from '../../utils/aquatoolsContent.js';
import { getMarketingPagePath } from '../../utils/marketingRoutes.js';

export const AquaToolsHubLanding: React.FC<{ content: any; pageLang: Language }> = ({ content, pageLang }) => {
  const labels = AQUATOOLS_COPY[pageLang] || AQUATOOLS_COPY.en;
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const tools = useMemo(() => AQUATOOLS_TOOL_DEFINITIONS.filter((tool) => {
    const title = tool.copy[pageLang][0].toLowerCase();
    const description = tool.copy[pageLang][1].toLowerCase();
    const matchesQuery = !query || `${title} ${description} ${tool.formula}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === 'all' || tool.categoryId === category;
    return matchesQuery && matchesCategory;
  }), [category, pageLang, query]);

  return (
    <main className="bg-white pt-28">
      <section className="border-b border-cyan-100 bg-cyan-50/60 px-6 py-14">
        <div className="container mx-auto max-w-6xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">AquaTools Free</p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-black leading-tight text-primary md:text-6xl">{content.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">{content.description}</p>
          <p className="mt-5 max-w-3xl rounded-lg border border-cyan-100 bg-white p-4 text-sm font-bold text-slate-700">{labels.privacy}</p>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col gap-3 md:flex-row">
            <label className="relative flex-1">
              <span className="sr-only">{labels.search}</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={labels.search} className="w-full rounded-lg border border-slate-300 py-3 pl-12 pr-4 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100" />
            </label>
            <label>
              <span className="sr-only">{labels.allCategories}</span>
              <select value={category} onChange={(event) => setCategory(event.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 md:w-72">
                <option value="all">{labels.allCategories}</option>
                {Object.entries(labels.categories).map(([id, title]) => <option key={id} value={id}>{String(title)}</option>)}
              </select>
            </label>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {tools.map((tool) => (
              <Link key={tool.id} to={getMarketingPagePath(tool.id, pageLang)} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg">
                <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-lg bg-primary px-2 text-sm font-black text-white">{tool.icon}</span>
                <h2 className="mt-4 font-heading text-lg font-black text-slate-950">{tool.copy[pageLang][0]}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{tool.copy[pageLang][1]}</p>
                <p className="mt-4 rounded-md bg-slate-50 px-3 py-2 font-mono text-xs font-bold text-primary">{tool.formula}</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">{labels.categories[tool.categoryId]} · {tool.time}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 px-6 py-12">
        <div className="container mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          <article>
            <h2 className="font-heading text-xl font-black text-primary">{labels.howTitle}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{content.description}</p>
          </article>
          <article>
            <h2 className="font-heading text-xl font-black text-primary">{labels.privacyTitle}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{labels.privacy}</p>
          </article>
          <article>
            <h2 className="font-heading text-xl font-black text-primary">{labels.cloudTitle}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{labels.cloudBody}</p>
          </article>
        </div>
      </section>
    </main>
  );
};
