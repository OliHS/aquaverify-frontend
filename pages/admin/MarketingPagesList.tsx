import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle2, ExternalLink, FileEdit, FileText, Filter, Globe, Link2, RotateCw, Search } from 'lucide-react';
import { supabase } from '../../utils/supabase';
import {
  LANGUAGE_NAMES,
  MARKETING_LANGUAGES,
  MARKETING_PAGES
} from '../../utils/marketingPages.js';
import {
  getMarketingOverrideSlug,
  MARKETING_OVERRIDE_SECTION_ID
} from '../../utils/marketingPageOverrides.js';

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
  cmsSlug: string;
};

type CmsLinkStatus = 'linked' | 'page-only';

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
      faqsCount: content.faqs?.length || 0,
      cmsSlug: getMarketingOverrideSlug(page.id, language)
    };
  })
);

const categories = Array.from(new Set(rows.map((row) => row.category))).sort();
const languages = MARKETING_LANGUAGES as MarketingLanguage[];
const totalProducts = new Set(rows.filter((row) => row.productName).map((row) => row.pageId)).size;
const totalFaqs = rows.reduce((total, row) => total + row.faqsCount, 0);

function getDefaultContent(pageId: string, language: MarketingLanguage) {
  const page = (MARKETING_PAGES as MarketingPage[]).find((item) => item.id === pageId);
  return page?.translations[language] || null;
}

function chunk<T>(items: T[], size: number) {
  const result: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    result.push(items.slice(index, index + size));
  }
  return result;
}

export const MarketingPagesList: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [language, setLanguage] = useState<MarketingLanguage | 'all'>('all');
  const [cmsStatusBySlug, setCmsStatusBySlug] = useState<Map<string, CmsLinkStatus>>(new Map());
  const [loadingLinks, setLoadingLinks] = useState(true);
  const [syncingLinks, setSyncingLinks] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');
  const [syncError, setSyncError] = useState('');

  const fetchLinkedSlugs = async () => {
    setLoadingLinks(true);
    setSyncError('');
    const { data, error } = await supabase
      .from('pages')
      .select('id,slug')
      .like('slug', 'marketing-%');

    if (error) {
      setSyncError(error.message || 'Unable to read CMS marketing URL status.');
      setLoadingLinks(false);
      return;
    }

    if (!error && data) {
      const pageRows = data || [];
      const pageIds = pageRows.map((item) => item.id);
      const blockPageIds = new Set<string>();

      for (const pageIdChunk of chunk(pageIds, 100)) {
        if (pageIdChunk.length === 0) continue;
        const { data: blockRows, error: blockError } = await supabase
          .from('content_blocks')
          .select('page_id')
          .eq('section_id', MARKETING_OVERRIDE_SECTION_ID)
          .in('page_id', pageIdChunk);

        if (blockError) {
          setSyncError(blockError.message || 'Unable to read CMS marketing content status.');
          setLoadingLinks(false);
          return;
        }

        (blockRows || []).forEach((item) => blockPageIds.add(item.page_id));
      }

      setCmsStatusBySlug(new Map<string, CmsLinkStatus>(pageRows.map((item) => [
        item.slug,
        blockPageIds.has(item.id) ? 'linked' : 'page-only'
      ])));
    }
    setLoadingLinks(false);
  };

  useEffect(() => {
    fetchLinkedSlugs();
  }, []);

  const syncMarketingCmsLinks = async () => {
    setSyncingLinks(true);
    setSyncError('');
    setSyncMessage('');

    try {
      const expectedRows = rows.map((row) => ({
        row,
        content: getDefaultContent(row.pageId, row.language)
      })).filter((item) => item.content);
      const expectedSlugs = expectedRows.map((item) => item.row.cmsSlug);

      let existingPages: Array<{ id: string; slug: string }> = [];
      for (const slugChunk of chunk(expectedSlugs, 80)) {
        const { data, error } = await supabase
          .from('pages')
          .select('id,slug')
          .in('slug', slugChunk);
        if (error) throw error;
        existingPages = [...existingPages, ...(data || [])];
      }

      const existingSlugSet = new Set(existingPages.map((item) => item.slug));
      const missingPages = expectedRows
        .filter((item) => !existingSlugSet.has(item.row.cmsSlug))
        .map(({ row, content }) => ({
          slug: row.cmsSlug,
          title: content!.title,
          seo_title: content!.seoTitle || content!.title,
          seo_description: content!.seoDescription || content!.description
        }));

      let insertedPages: Array<{ id: string; slug: string }> = [];
      for (const pageChunk of chunk(missingPages, 100)) {
        if (pageChunk.length === 0) continue;
        const { data, error } = await supabase
          .from('pages')
          .insert(pageChunk)
          .select('id,slug');
        if (error) throw error;
        insertedPages = [...insertedPages, ...(data || [])];
      }

      const allPages = [...existingPages, ...insertedPages];
      const pageIdBySlug = new Map(allPages.map((item) => [item.slug, item.id]));
      const pageIds = allPages.map((item) => item.id);
      let existingBlocks: Array<{ page_id: string }> = [];

      for (const pageIdChunk of chunk(pageIds, 100)) {
        if (pageIdChunk.length === 0) continue;
        const { data, error } = await supabase
          .from('content_blocks')
          .select('page_id')
          .eq('section_id', MARKETING_OVERRIDE_SECTION_ID)
          .in('page_id', pageIdChunk);
        if (error) throw error;
        existingBlocks = [...existingBlocks, ...(data || [])];
      }

      const existingBlockPageIds = new Set(existingBlocks.map((item) => item.page_id));
      const missingBlocks = expectedRows
        .map(({ row, content }) => ({
          pageId: pageIdBySlug.get(row.cmsSlug),
          content
        }))
        .filter((item) => item.pageId && !existingBlockPageIds.has(item.pageId))
        .map((item) => ({
          page_id: item.pageId,
          section_id: MARKETING_OVERRIDE_SECTION_ID,
          content: item.content
        }));

      for (const blockChunk of chunk(missingBlocks, 100)) {
        if (blockChunk.length === 0) continue;
        const { error } = await supabase.from('content_blocks').insert(blockChunk);
        if (error) throw error;
      }

      setCmsStatusBySlug(new Map<string, CmsLinkStatus>(expectedSlugs.map((slug) => [slug, 'linked'])));
      setSyncMessage(`CMS linked ${insertedPages.length} pages and ${missingBlocks.length} content records. Existing edits were preserved.`);
      await fetchLinkedSlugs();
    } catch (err: any) {
      setSyncError(`${err.message || 'Unable to link marketing URLs in CMS.'} Make sure you are logged in with an admin account that can write pages and content_blocks.`);
    } finally {
      setSyncingLinks(false);
    }
  };

  const linkedCount = rows.filter((row) => cmsStatusBySlug.get(row.cmsSlug) === 'linked').length;
  const pageOnlyCount = rows.filter((row) => cmsStatusBySlug.get(row.cmsSlug) === 'page-only').length;
  const missingLinkedCount = Math.max(0, rows.length - linkedCount);

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
          <p className="mt-2 text-slate-500">Multilingual SEO routes linked to CMS records so each public URL can be edited.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={syncMarketingCmsLinks}
            disabled={syncingLinks || loadingLinks}
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-60"
          >
            <Link2 size={16} className="mr-2" />
            {syncingLinks ? 'Linking...' : 'Link all URLs in CMS'}
          </button>
          <button
            type="button"
            onClick={fetchLinkedSlugs}
            disabled={syncingLinks || loadingLinks}
            className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-60"
          >
            <RotateCw size={16} className={`mr-2 ${loadingLinks ? 'animate-spin' : ''}`} />
            Refresh status
          </button>
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
      </div>

      {syncMessage && (
        <div className="flex items-center rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700 shadow-sm">
          <CheckCircle2 size={18} className="mr-2" />
          {syncMessage}
        </div>
      )}

      {syncError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 shadow-sm">{syncError}</div>
      )}

      {!loadingLinks && missingLinkedCount > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-amber-900 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
              <div>
                <h2 className="font-semibold">{missingLinkedCount} marketing URLs are not fully CMS-linked</h2>
                <p className="mt-1 text-sm text-amber-800">
                  Link them once so every product, industry, resource and language URL has a CMS page plus editable content before editors start changing content.
                  {pageOnlyCount > 0 ? ` ${pageOnlyCount} already have a page record but still need the content block.` : ''}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={syncMarketingCmsLinks}
              disabled={syncingLinks}
              className="inline-flex items-center justify-center rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-700 disabled:opacity-60"
            >
              <Link2 size={16} className="mr-2" />
              Link missing URLs
            </button>
          </div>
        </div>
      )}

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
            <p className="text-sm font-medium text-slate-500">CMS linked</p>
            <Link2 className="h-4 w-4 text-slate-400" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">{loadingLinks ? '...' : `${linkedCount}/${rows.length}`}</p>
          <p className="mt-1 text-xs text-slate-500">{pageOnlyCount > 0 ? `${pageOnlyCount} page-only records` : `${totalFaqs} FAQ items`}</p>
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
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">CMS</th>
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
                  <td className="px-5 py-4 text-sm">
                    {cmsStatusBySlug.get(row.cmsSlug) === 'linked' ? (
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                        <CheckCircle2 size={13} className="mr-1" />
                        Linked
                      </span>
                    ) : cmsStatusBySlug.get(row.cmsSlug) === 'page-only' ? (
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                        Page only
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                        Default
                      </span>
                    )}
                    <p className="mt-2 text-xs text-slate-500">{row.cmsSlug}</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-700">
                    <p className="max-w-xs truncate font-medium">{row.seoTitle}</p>
                    <p className="mt-1 text-xs text-slate-500">{row.sectionsCount} sections · {row.faqsCount} FAQ</p>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/admin/marketing-pages/${row.pageId}/${row.language}`}
                        className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                      >
                        <FileEdit size={15} className="mr-2" />
                        Edit
                      </Link>
                      <a
                        href={row.path}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                      >
                        <ExternalLink size={15} className="mr-2" />
                        Open
                      </a>
                    </div>
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
