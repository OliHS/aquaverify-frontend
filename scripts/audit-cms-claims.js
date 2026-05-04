import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { sanitizeProductClaimFields, scanProductClaimFields } from '../utils/productClaims.js';
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

function addScan(result, root, value, options = {}) {
  const scanned = scanProductClaimFields(value, { root, ...options });
  result.findings.push(...scanned.findings);
  result.reviews.push(...scanned.reviews);
}

function addSanitizedPublicCatalogScan(result, root, value) {
  const raw = scanProductClaimFields(value, { root, includeReviews: true });
  const sanitized = sanitizeProductClaimFields(value);
  const projected = scanProductClaimFields(sanitized, { root, includeReviews: true });

  result.publicCatalogSanitizations.push(...raw.findings.map((item) => ({
    path: item.path,
    rule: item.rule
  })));
  result.findings.push(...projected.findings);
  result.reviews.push(...projected.reviews);
}

function getMarketingDefaultsBySlug() {
  const entries = [];
  for (const page of MARKETING_PAGES) {
    for (const lang of MARKETING_LANGUAGES) {
      entries.push([
        getMarketingOverrideSlug(page.id, lang),
        page.translations[lang]
      ]);
    }
  }
  return new Map(entries);
}

async function run() {
  ensureEnv();
  const supabase = createClient(supabaseUrl, supabaseKey);
  const result = { findings: [], reviews: [], publicCatalogSanitizations: [] };

  const { data: pages, error: pagesError } = await supabase
    .from('pages')
    .select('id,slug,title,seo_title,seo_description');
  if (pagesError) throw pagesError;

  const pageSlugById = new Map((pages || []).map((page) => [page.id, page.slug]));
  const marketingDefaultsBySlug = getMarketingDefaultsBySlug();
  for (const page of pages || []) {
    addScan(result, `pages.${page.slug}`, {
      title: page.title,
      seo_title: page.seo_title,
      seo_description: page.seo_description
    }, { includeReviews: false });
  }

  const { data: blocks, error: blocksError } = await supabase
    .from('content_blocks')
    .select('id,page_id,section_id,content');
  if (blocksError) throw blocksError;

  for (const block of blocks || []) {
    const slug = pageSlugById.get(block.page_id) || block.page_id || 'unknown-page';
    const marketingDefault = block.section_id === MARKETING_OVERRIDE_SECTION_ID
      ? marketingDefaultsBySlug.get(slug)
      : null;
    const publicContent = marketingDefault
      ? mergeMarketingContent(marketingDefault, block.content)
      : block.content;
    addScan(result, `content_blocks.${slug}.${block.section_id}`, publicContent);
  }

  const { data: families, error: familiesError } = await supabase
    .from('product_families')
    .select('family_id,title,description,use_cases,is_hidden');
  if (familiesError) throw familiesError;

  for (const family of families || []) {
    addSanitizedPublicCatalogScan(result, `product_families.${family.family_id || family.title}`, family);
  }

  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('name,detail,description,specific_use_cases,specs,is_hidden');
  if (productsError) throw productsError;

  for (const product of products || []) {
    addSanitizedPublicCatalogScan(result, `products.${product.name || 'unnamed-product'}`, product);
  }

  if (result.publicCatalogSanitizations.length) {
    console.warn('CMS product catalog wording sanitized in public projection:');
    result.publicCatalogSanitizations.forEach((item) => {
      console.warn(`- ${item.path} [${item.rule.name}] ${item.rule.guidance}`);
    });
  }

  if (result.reviews.length) {
    console.warn('CMS product naming review warnings:');
    result.reviews.forEach((item) => {
      console.warn(`- ${item.path} [${item.rule.name}] ${item.rule.guidance}`);
    });
  }

  if (result.findings.length) {
    console.error('Blocked CMS product/marketing claims found:');
    result.findings.forEach((item) => {
      console.error(`- ${item.path} [${item.rule.name}] ${item.rule.guidance}`);
    });
    process.exit(1);
  }

  console.log(JSON.stringify({
    ok: true,
    scanned: {
      pages: pages?.length || 0,
      contentBlocks: blocks?.length || 0,
      productFamilies: families?.length || 0,
      products: products?.length || 0
    },
    reviews: result.reviews.length,
    publicCatalogSanitizations: result.publicCatalogSanitizations.length
  }, null, 2));
}

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
