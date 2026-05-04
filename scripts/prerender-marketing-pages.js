import fs from 'node:fs/promises';
import path from 'node:path';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import {
  MARKETING_LANGUAGES,
  MARKETING_PAGES,
  getMarketingAlternates,
  getMarketingPagePath,
  getMarketingPageSummary
} from '../utils/marketingPages.js';
import {
  getMarketingOverrideSlug,
  MARKETING_OVERRIDE_SECTION_ID,
  mergeMarketingContent,
  normalizeMarketingOverride
} from '../utils/marketingPageOverrides.js';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const DIST_DIR = 'dist';
const SITE_URL = 'https://aquaverify.com';
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const SEO_LOCALES = {
  en: 'en_US',
  es: 'es_ES',
  fr: 'fr_FR',
  it: 'it_IT',
  ca: 'ca_ES'
};

const HOME_META = {
  en: {
    path: '/en',
    title: 'AquaVerify | Water Testing, LIMS Traceability & Technical Reporting',
    description: 'AquaVerify combines water microbiology products, digital LIMS traceability, technical reporting, distributor support and OEM partnerships.'
  },
  es: {
    path: '/es',
    title: 'AquaVerify | Kits de Agua, Trazabilidad LIMS e Informes Técnicos',
    description: 'AquaVerify combina productos de microbiología del agua, trazabilidad digital LIMS, informes técnicos, distribuidores y programas OEM.'
  },
  fr: {
    path: '/fr',
    title: 'AquaVerify | Tests Eau, Traçabilité LIMS et Reporting Technique',
    description: 'AquaVerify réunit produits de microbiologie de l’eau, traçabilité numérique LIMS, rapports techniques, distributeurs et partenariats OEM.'
  },
  it: {
    path: '/it',
    title: 'AquaVerify | Test Acqua, Tracciabilità LIMS e Report Tecnici',
    description: 'AquaVerify unisce prodotti di microbiologia dell’acqua, tracciabilità digitale LIMS, report tecnici, distributori e partnership OEM.'
  },
  ca: {
    path: '/ca',
    title: 'AquaVerify | Kits d’Aigua, Traçabilitat LIMS i Informes Tècnics',
    description: 'AquaVerify combina productes de microbiologia de l’aigua, traçabilitat digital LIMS, informes tècnics, distribuïdors i programes OEM.'
  }
};

const HOME_ALTERNATES = {
  'x-default': '/',
  en: '/en',
  es: '/es',
  fr: '/fr',
  it: '/it',
  ca: '/ca'
};

const PRODUCT_LABELS = {
  en: 'Products',
  es: 'Productos',
  fr: 'Produits',
  it: 'Prodotti',
  ca: 'Productes'
};

function absolute(routePath) {
  return `${SITE_URL}${routePath === '/' ? '/' : routePath}`;
}

function absoluteAsset(pathOrUrl) {
  const value = String(pathOrUrl || '').trim();
  if (!value) return `${SITE_URL}/android-chrome-512x512.png`;
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith('/') ? value : `/${value}`}`;
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);
}

function jsonLdScript(id, payload) {
  return `  <script type="application/ld+json" data-id="${id}">\n${JSON.stringify(payload, null, 2)}\n  </script>`;
}

function getHomePath(lang) {
  return lang === 'en' ? '/' : `/${lang}`;
}

function buildBreadcrumbs(page, content, lang) {
  const crumbs = [{ name: 'AquaVerify', path: getHomePath(lang) }];

  if (page.category === 'products' && page.id !== 'products') {
    crumbs.push({ name: PRODUCT_LABELS[lang] || PRODUCT_LABELS.en, path: getMarketingPagePath('products', lang) });
  }

  if (page.parentId) {
    const parent = getMarketingPageSummary(page.parentId, lang);
    if (parent && parent.path !== content.path) {
      crumbs.push({ name: parent.title, path: parent.path });
    }
  }

  crumbs.push({ name: content.title, path: content.path });
  return crumbs.filter((crumb, index, all) => all.findIndex((item) => item.path === crumb.path) === index);
}

function buildStructuredData({ page, content, lang, canonicalUrl, title, description, imageUrl }) {
  const pageType = page?.schemaType || page?.category;
  const payloads = [{
    id: 'marketing-page',
    data: {
      '@context': 'https://schema.org',
      '@type': pageType === 'Product' ? 'Product' : pageType === 'resources' ? 'Article' : 'WebPage',
      name: title,
      description,
      url: canonicalUrl,
      image: imageUrl,
      ...(pageType === 'Product' ? {
        brand: {
          '@type': 'Brand',
          name: 'AquaVerify'
        }
      } : {}),
      isPartOf: {
        '@type': 'WebSite',
        name: 'AquaVerify',
        url: SITE_URL
      },
      publisher: {
        '@type': 'Organization',
        name: 'AquaVerify',
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo-mark-160.png`
      }
    }
  }];

  if (page && content) {
    payloads.push({
      id: 'marketing-breadcrumbs',
      data: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: buildBreadcrumbs(page, content, lang).map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: absolute(item.path)
        }))
      }
    });
  }

  if (content?.faqs?.length) {
    payloads.push({
      id: 'marketing-faq',
      data: {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: content.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      }
    });
  }

  return payloads.map((item) => jsonLdScript(item.id, item.data)).join('\n');
}

function seoHeadBlock({ lang, title, description, canonicalPath, alternates, page, content }) {
  const canonicalUrl = absolute(canonicalPath);
  const imageUrl = absoluteAsset(content?.ogImage || content?.heroImage);
  const alternateTags = Object.entries(alternates)
    .filter(([, routePath]) => Boolean(routePath))
    .map(([alternateLang, routePath]) => `  <link rel="alternate" hreflang="${alternateLang}" href="${absolute(routePath)}" />`)
    .join('\n');

  return [
    `  <title>${escapeHtml(title)}</title>`,
    `  <meta name="description" content="${escapeHtml(description)}" />`,
    '  <meta name="robots" content="index, follow, max-image-preview:large" />',
    `  <link rel="canonical" href="${canonicalUrl}" />`,
    alternateTags,
    '  <meta property="og:type" content="website" />',
    '  <meta property="og:site_name" content="AquaVerify" />',
    `  <meta property="og:title" content="${escapeHtml(title)}" />`,
    `  <meta property="og:description" content="${escapeHtml(description)}" />`,
    `  <meta property="og:url" content="${canonicalUrl}" />`,
    `  <meta property="og:image" content="${imageUrl}" />`,
    `  <meta property="og:locale" content="${SEO_LOCALES[lang] || SEO_LOCALES.en}" />`,
    '  <meta name="twitter:card" content="summary_large_image" />',
    `  <meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `  <meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `  <meta name="twitter:image" content="${imageUrl}" />`,
    buildStructuredData({ page, content, lang, canonicalUrl, title, description, imageUrl })
  ].join('\n');
}

function renderHtml(template, meta) {
  const identityMarker = '  <!-- AquaVerify platform identity -->';
  const titleIndex = template.indexOf('  <title>');
  const markerIndex = template.indexOf(identityMarker);

  if (titleIndex === -1 || markerIndex === -1) {
    throw new Error('Unable to find SEO head markers in dist/index.html');
  }

  return template
    .replace(/<html lang="[^"]+"/, `<html lang="${meta.lang}"`)
    .slice(0, titleIndex)
    .concat(seoHeadBlock(meta), '\n', template.slice(markerIndex));
}

async function writeRouteHtml(routePath, html) {
  const normalized = routePath === '/' ? '' : routePath.replace(/^\/+|\/+$/g, '');
  const filePath = normalized
    ? path.join(DIST_DIR, normalized, 'index.html')
    : path.join(DIST_DIR, 'index.html');

  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, html);
}

async function fetchMarketingOverrides() {
  if (!supabaseUrl || !supabaseKey) {
    console.warn('Skipping marketing CMS overrides: missing Supabase env.');
    return new Map();
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: pages, error: pagesError } = await supabase
    .from('pages')
    .select('id,slug')
    .like('slug', 'marketing-%');

  if (pagesError || !pages?.length) {
    if (pagesError) console.warn(`Skipping marketing CMS overrides: ${pagesError.message}`);
    return new Map();
  }

  const pageIds = pages.map((page) => page.id);
  const { data: blocks, error: blocksError } = await supabase
    .from('content_blocks')
    .select('page_id,content')
    .eq('section_id', MARKETING_OVERRIDE_SECTION_ID)
    .in('page_id', pageIds);

  if (blocksError || !blocks?.length) {
    if (blocksError) console.warn(`Skipping marketing CMS overrides: ${blocksError.message}`);
    return new Map();
  }

  const slugByPageId = new Map(pages.map((page) => [page.id, page.slug]));
  return blocks.reduce((acc, block) => {
    const slug = slugByPageId.get(block.page_id);
    const content = normalizeMarketingOverride(block.content);
    if (slug && content) acc.set(slug, content);
    return acc;
  }, new Map());
}

const template = await fs.readFile(path.join(DIST_DIR, 'index.html'), 'utf8');
const marketingOverrides = await fetchMarketingOverrides();
let written = 0;

await writeRouteHtml('/', renderHtml(template, {
  lang: 'en',
  title: HOME_META.en.title,
  description: HOME_META.en.description,
  canonicalPath: '/',
  alternates: HOME_ALTERNATES
}));
written += 1;

for (const lang of MARKETING_LANGUAGES) {
  const meta = HOME_META[lang];
  await writeRouteHtml(meta.path, renderHtml(template, {
    lang,
    title: meta.title,
    description: meta.description,
    canonicalPath: meta.path,
    alternates: HOME_ALTERNATES
  }));
  written += 1;
}

for (const page of MARKETING_PAGES) {
  const alternates = {
    'x-default': page.translations.en.path,
    ...getMarketingAlternates(page)
  };

  for (const lang of MARKETING_LANGUAGES) {
    const content = mergeMarketingContent(
      page.translations[lang],
      marketingOverrides.get(getMarketingOverrideSlug(page.id, lang))
    );
    if (!content?.path) continue;

    await writeRouteHtml(content.path, renderHtml(template, {
      lang,
      title: content.seoTitle || content.title,
      description: content.seoDescription || content.description,
      canonicalPath: content.path,
      alternates,
      page,
      content
    }));
    written += 1;
  }
}

console.log(`Prerendered ${written} SEO HTML routes.`);
