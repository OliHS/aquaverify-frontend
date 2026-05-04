import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import {
  MARKETING_LANGUAGES,
  MARKETING_PAGES
} from '../utils/marketingPages.js';
import {
  getMarketingOverrideSlug,
  MARKETING_OVERRIDE_SECTION_ID,
  mergeMarketingContent
} from '../utils/marketingPageOverrides.js';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

function ensureEnv() {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env.local/.env');
  }
}

function hasValue(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function expectedRows() {
  return MARKETING_PAGES.flatMap((page) =>
    MARKETING_LANGUAGES.map((language) => ({
      page,
      language,
      slug: getMarketingOverrideSlug(page.id, language),
      defaultContent: page.translations[language]
    }))
  );
}

async function run() {
  ensureEnv();
  const supabase = createClient(supabaseUrl, supabaseKey);
  const expected = expectedRows();

  const { data: pages, error: pagesError } = await supabase
    .from('pages')
    .select('id,slug')
    .like('slug', 'marketing-%');
  if (pagesError) throw pagesError;

  const pageBySlug = new Map((pages || []).map((page) => [page.slug, page]));
  const pageIds = (pages || []).map((page) => page.id);
  const { data: blocks, error: blocksError } = pageIds.length
    ? await supabase
        .from('content_blocks')
        .select('page_id,content')
        .eq('section_id', MARKETING_OVERRIDE_SECTION_ID)
        .in('page_id', pageIds)
    : { data: [], error: null };
  if (blocksError) throw blocksError;

  const contentByPageId = new Map((blocks || []).map((block) => [block.page_id, block.content]));
  const rows = expected.map((row) => {
    const page = pageBySlug.get(row.slug);
    const content = mergeMarketingContent(
      row.defaultContent,
      page ? contentByPageId.get(page.id) : null
    );
    return {
      slug: row.slug,
      pageId: row.page.id,
      category: row.page.category,
      productName: row.page.productName || '',
      language: row.language,
      path: row.defaultContent.path,
      hasHeroImage: hasValue(content.heroImage),
      hasOgImage: hasValue(content.ogImage),
      hasDatasheet: hasValue(content.datasheetUrl)
    };
  });

  const productRows = rows.filter((row) => row.category === 'products');
  const productAssetReadyRows = productRows.filter((row) => row.hasHeroImage && row.hasDatasheet);

  console.log(JSON.stringify({
    ok: true,
    expectedUrls: rows.length,
    productUrls: productRows.length,
    heroImages: rows.filter((row) => row.hasHeroImage).length,
    ogImages: rows.filter((row) => row.hasOgImage).length,
    productDatasheets: productRows.filter((row) => row.hasDatasheet).length,
    productAssetReady: productAssetReadyRows.length,
    missingProductAssets: productRows.length - productAssetReadyRows.length,
    sampleMissingProductAssets: productRows
      .filter((row) => !row.hasHeroImage || !row.hasDatasheet)
      .slice(0, 20)
      .map((row) => ({
        slug: row.slug,
        path: row.path,
        missing: [
          !row.hasHeroImage ? 'heroImage' : '',
          !row.hasDatasheet ? 'datasheetUrl' : ''
        ].filter(Boolean)
      }))
  }, null, 2));
}

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
