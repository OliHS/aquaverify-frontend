import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { guardCmsEndpoint } from './lib/remote-cms-audit-guard.js';
import {
  MARKETING_LANGUAGES,
  MARKETING_PAGES
} from '../utils/marketingPages.js';
import {
  getMarketingOverrideSlug,
  MARKETING_OVERRIDE_SECTION_ID
} from '../utils/marketingPageOverrides.js';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const shouldSync = process.argv.includes('--sync');
const strictMode = process.argv.includes('--strict');
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
const supabaseKey = serviceKey || process.env.VITE_SUPABASE_ANON_KEY;

function ensureEnv() {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing VITE_SUPABASE_URL and Supabase key in .env.local/.env');
  }
  if (shouldSync && !serviceKey) {
    throw new Error('cms:marketing:sync requires SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SERVICE_KEY. Use cms:marketing:audit for read-only checks.');
  }
}

function chunk(items, size) {
  const result = [];
  for (let index = 0; index < items.length; index += size) {
    result.push(items.slice(index, index + size));
  }
  return result;
}

function expectedRows() {
  return MARKETING_PAGES.flatMap((page) =>
    MARKETING_LANGUAGES.map((language) => {
      const content = page.translations[language];
      return {
        pageId: page.id,
        language,
        slug: getMarketingOverrideSlug(page.id, language),
        title: content.title,
        seoTitle: content.seoTitle || content.title,
        seoDescription: content.seoDescription || content.description,
        content
      };
    })
  );
}

async function fetchExistingPages(supabase, slugs) {
  const pages = [];
  for (const slugChunk of chunk(slugs, 80)) {
    const { data, error } = await supabase
      .from('pages')
      .select('id,slug')
      .in('slug', slugChunk);
    if (error) throw error;
    pages.push(...(data || []));
  }
  return pages;
}

async function fetchExistingBlocks(supabase, pageIds) {
  const blocks = [];
  for (const idChunk of chunk(pageIds, 80)) {
    const { data, error } = await supabase
      .from('content_blocks')
      .select('page_id')
      .eq('section_id', MARKETING_OVERRIDE_SECTION_ID)
      .in('page_id', idChunk);
    if (error) throw error;
    blocks.push(...(data || []));
  }
  return blocks;
}

async function insertPages(supabase, missingPages) {
  const inserted = [];
  for (const pageChunk of chunk(missingPages, 80)) {
    if (!pageChunk.length) continue;
    const { data, error } = await supabase
      .from('pages')
      .insert(pageChunk)
      .select('id,slug');
    if (error) throw error;
    inserted.push(...(data || []));
  }
  return inserted;
}

async function insertBlocks(supabase, missingBlocks) {
  let inserted = 0;
  for (const blockChunk of chunk(missingBlocks, 80)) {
    if (!blockChunk.length) continue;
    const { error } = await supabase
      .from('content_blocks')
      .insert(blockChunk);
    if (error) throw error;
    inserted += blockChunk.length;
  }
  return inserted;
}

async function run() {
  ensureEnv();
  guardCmsEndpoint({ url: supabaseUrl, mutationRequested: shouldSync, purpose: shouldSync ? 'cms-marketing-sync' : 'cms-marketing-audit' });
  const supabase = createClient(supabaseUrl, supabaseKey);
  const expected = expectedRows();
  const expectedSlugs = expected.map((row) => row.slug);
  const existingPages = await fetchExistingPages(supabase, expectedSlugs);
  const existingSlugSet = new Set(existingPages.map((page) => page.slug));
  const missingPageRows = expected.filter((row) => !existingSlugSet.has(row.slug));

  const missingPages = missingPageRows.map((row) => ({
    slug: row.slug,
    title: row.title,
    seo_title: row.seoTitle,
    seo_description: row.seoDescription
  }));

  let insertedPages = [];
  if (shouldSync && missingPages.length) {
    insertedPages = await insertPages(supabase, missingPages);
  }

  const allPages = [...existingPages, ...insertedPages];
  const pageIdBySlug = new Map(allPages.map((page) => [page.slug, page.id]));
  const existingBlocks = await fetchExistingBlocks(supabase, allPages.map((page) => page.id));
  const existingBlockPageIds = new Set(existingBlocks.map((block) => block.page_id));

  const missingBlocks = expected
    .map((row) => ({
      pageId: pageIdBySlug.get(row.slug),
      content: row.content,
      slug: row.slug
    }))
    .filter((row) => row.pageId && !existingBlockPageIds.has(row.pageId))
    .map((row) => ({
      page_id: row.pageId,
      section_id: MARKETING_OVERRIDE_SECTION_ID,
      content: row.content
    }));

  let insertedBlocks = 0;
  if (shouldSync && missingBlocks.length) {
    insertedBlocks = await insertBlocks(supabase, missingBlocks);
  }

  const finalMissingPages = shouldSync ? Math.max(0, missingPages.length - insertedPages.length) : missingPages.length;
  const finalLinkedPageCount = shouldSync ? existingPages.length + insertedPages.length : existingPages.length;
  const finalLinkedBlockCount = shouldSync
    ? existingBlocks.length + insertedBlocks
    : existingBlocks.length;
  const finalMissingBlocks = shouldSync
    ? Math.max(0, expected.length - finalLinkedBlockCount)
    : expected.length - existingBlocks.length;
  const isComplete = finalMissingPages === 0 && finalMissingBlocks === 0;

  console.log(JSON.stringify({
    ok: isComplete,
    mode: shouldSync ? 'sync' : 'audit',
    expectedUrls: expected.length,
    linkedPages: finalLinkedPageCount,
    linkedContentBlocks: finalLinkedBlockCount,
    completeCmsRecords: Math.min(finalLinkedPageCount, finalLinkedBlockCount),
    missingPages: finalMissingPages,
    missingBlocks: finalMissingBlocks,
    insertedPages: insertedPages.length,
    insertedBlocks,
    sampleMissingSlugs: shouldSync ? [] : missingPageRows.slice(0, 20).map((row) => row.slug)
  }, null, 2));

  if (strictMode && !isComplete) {
    process.exitCode = 1;
  }
}

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
