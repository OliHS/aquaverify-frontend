import React, { useMemo, useState } from 'react';
import { ExternalLink, FileText, Filter, Globe, Search } from 'lucide-react';
import {
  LANGUAGE_NAMES,
  MARKETING_LANGUAGES,
  MARKETING_PAGES
} from '../../utils/marketingPages.js';

type MarketingLanguage = 'en' | 'es' | 'fr' | 'it' | 'ca';

type MarketingContent = {
  path: string;
  title: string;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
  sections?: Array<unknown>;
  faqs?: Array<unknown>;
};

type MarketingPage = {
  id: string;
  category: string;
  primaryIntent: string;
  parentId?: string;
  schemaType?: string;
  productName?: string;
  translations: Record<MarketingLanguage, MarketingContent>;
};

type MarketingRow = {
  id: string;
  pageId: string;
  title: string;
  description: string;
  seoTitle: string;
  path: string;
  language: MarketingLanguage;
  languageName: string;
  category: string;
  intent: string;
  schemaType: string;
  productName: string;
  sectionsCount: number;
  faqsCount: number;
};

const rows = (MARKETING_PAGES as MarketingPage[]).flatMap((page) =>
  (MARKETING_LANGUAGES as MarketingLanguage[]).map((language) => {
    const content = page.translations[language];
    return {
      id: `${page.id}-${language}`,
      pageId: page.id,
      title: content.title,
      description: content.description,
      seoTitle: content.seoTitle || content.title,
      path: content.path,
      language,
      languageName: LANGUAGE_NAMES[language],
      category: page.category,
      intent: page.primaryIntent,
      schemaType: page.schemaType || 'WebPage',
      productName: page.productName || '',
      sectionsCount: content.sections?.length || 0,
      faqsCount: content.faqs?.length || 0
    };
  })
);

const categories = Array.from(new Set(rows.map((row) => row.category))).sort();
const languages = MARKETING_LANGUAGES as MarketingLanguage[];
const totalProducts = new Set(rows.filter((row) => row.productName).map((row) => row.pageId)).size;
const totalFaqs = rows.reduce((total, row) => total + row.faqsCount, 0);

export const MarketingPagesList: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [language, setLanguage] = useState<MarketingLanguage | 'all'>('all');

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return rows.filter((row) => {
      const matchesCategory = category === 'all' || row.category === category;
      const matchesLanguage = language === 'all' || row.language === language;
      const matchesQuery = !normalizedQuery || [
        row.pageId,
        row.title,
        row.description,
        row.seoTitle,
        row.path,
        row.productName,
        row.intent
      ].some((value) => value.toLowerCase().includes(normalizedQuery));

      return matchesCategory && matchesLanguage && matchesQuery;
    });
  }, [category, language, query]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Marketing URLs</h1>
          <p className="mt-2 text-slate-500">Code-managed multilingual SEO routes published on the corporate site.</p>
        </div>
        <a
          href="/sitemap.xml"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
        >
          <ExternalLink size={16} className="mr-2" />
          Open sitemap
        </a>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">URLs</p>
            <Globe className="h-4 w-4 text-slate-400" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">{rows.length}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">Pages</p>
            <FileText className="h-4 w-4 text-slate-400" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">{MARKETING_PAGES.length}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">Products</p>
            <Filter className="h-4 w-4 text-slate-400" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">{totalProducts}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">FAQ items</p>
            <FileText className="h-4 w-4 text-slate-400" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">{totalFaqs}</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search title, URL, product or intent"
              className="w-full rounded-md border border-slate-300 bg-white py-2 pl-10 pr-3 text-sm text-slate-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="all">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value as MarketingLanguage | 'all')}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="all">All languages</option>
            {languages.map((item) => (
              <option key={item} value={item}>{LANGUAGE_NAMES[item]}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4 text-sm text-slate-500">
          Showing {filteredRows.length} of {rows.length} URLs
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Page</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Language</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Category</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">SEO</th>
                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">Public</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {filteredRows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50">
                  <td className="max-w-xl px-5 py-4">
                    <p className="font-medium text-slate-900">{row.title}</p>
                    <p className="mt-1 truncate text-sm text-slate-500">{row.description}</p>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full bg-slate-100 px-2 py-1 font-medium text-slate-600">{row.pageId}</span>
                      <span className="rounded-full bg-blue-50 px-2 py-1 font-medium text-blue-700">{row.intent}</span>
                      {row.productName && (
                        <span className="rounded-full bg-emerald-50 px-2 py-1 font-medium text-emerald-700">{row.productName}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-700">
                    <span className="font-medium">{row.languageName}</span>
                    <span className="ml-2 text-slate-400">{row.language}</span>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-700">
                    <p className="font-medium">{row.category}</p>
                    <p className="mt-1 text-xs text-slate-500">{row.schemaType}</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-700">
                    <p className="max-w-xs truncate font-medium">{row.seoTitle}</p>
                    <p className="mt-1 text-xs text-slate-500">{row.sectionsCount} sections · {row.faqsCount} FAQ</p>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <a
                      href={row.path}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                    >
                      <ExternalLink size={15} className="mr-2" />
                      Open
                    </a>
                    <p className="mt-2 text-xs text-slate-500">{row.path}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredRows.length === 0 && (
          <div className="p-8 text-center text-sm text-slate-500">No marketing URLs match the current filters.</div>
        )}
      </div>
    </div>
  );
};
