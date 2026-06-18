import fs from 'node:fs';
import path from 'node:path';
import {
  MARKETING_LANGUAGES,
  MARKETING_PAGES,
  getMarketingAlternates
} from '../utils/marketingPages.js';
import { RESOURCE_CATEGORY_PATHS } from '../utils/resourceCategoryPaths.js';
import {
  getChecklistHref,
  getResourcesHubContent
} from '../utils/resourcesHubContent.js';
import {
  WHITEPAPER_MARKDOWN_PAGE_IDS,
  getWhitepaperMarkdownPage
} from '../utils/whitepaperMarkdownContent.js';
import { WHITEPAPER_MARKDOWN_RAW } from '../utils/whitepaperMarkdownRaw.js';
import { getResourceEditorialMeta } from '../utils/resourceEditorialMetadata.js';
import {
  RESOURCE_UI_LANGUAGES,
  assertCompleteResourceUiLabels,
  getResourceUiLabels
} from '../utils/resourceUiLabels.js';

const SITE_URL = 'https://aquaverify.com';
const RESOURCE_LASTMOD = '2026-06-18';
const errors = [];
const warnings = [];

const PRIORITY_TWO_PAGE_CHECKLISTS = new Set([
  'product_selection',
  'rd_3_2023_coliphages',
  'iso_17025_labs',
  'excel_to_lims',
  'oem_white_label'
]);

const PDF_LANG = {
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR',
  it: 'it-IT',
  ca: 'ca-ES'
};

function exists(filePath) {
  return fs.existsSync(filePath);
}

function publicPath(href) {
  return path.join('public', href.replace(/^\/+/, ''));
}

function distPath(routePath) {
  const normalized = routePath === '/' ? 'index.html' : path.join(routePath.replace(/^\/+/, ''), 'index.html');
  return path.join('dist', normalized);
}

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function readIfExists(filePath) {
  return exists(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
}

function scanForScientificPdfReferences() {
  const roots = ['content', 'utils/whitepaperMarkdownRaw.js'];
  for (const root of roots) {
    if (!exists(root)) continue;
    const files = fs.statSync(root).isDirectory()
      ? fs.readdirSync(root, { recursive: true }).map((entry) => path.join(root, entry)).filter((entry) => fs.statSync(entry).isFile())
      : [root];
    for (const file of files) {
      if (!/\.(md|js|jsx|ts|tsx|html)$/.test(file)) continue;
      const source = fs.readFileSync(file, 'utf8');
      if (source.includes('/resources/scientific-papers/')) {
        errors.push(`External scientific PDF reference remains in ${file}`);
      }
    }
  }
  assert(!exists('public/resources/scientific-papers'), 'public/resources/scientific-papers must not exist without distribution-rights evidence.');
}

function validateResourceLabels() {
  try {
    assertCompleteResourceUiLabels();
  } catch (error) {
    errors.push(error.message);
  }

  for (const lang of RESOURCE_UI_LANGUAGES) {
    const labels = getResourceUiLabels(lang);
    for (const key of ['audience', 'region', 'level', 'readingTime', 'relatedTopics', 'download', 'backToResources']) {
      assert(Boolean(labels[key]), `Missing shared resource UI label ${lang}.${key}`);
    }
  }
}

function validateResourceRoutes() {
  const resources = MARKETING_PAGES.filter((page) => page.category === 'resources');
  for (const page of resources) {
    const alternates = getMarketingAlternates(page);
    for (const lang of MARKETING_LANGUAGES) {
      const content = page.translations[lang];
      assert(Boolean(content?.path), `Missing ${lang} path for resource page ${page.id}`);
      assert(Boolean(alternates[lang]), `Missing ${lang} hreflang alternate for resource page ${page.id}`);
      if (content?.path && page.schemaType === 'TechArticle') {
        const whitepaper = getWhitepaperMarkdownPage(page.id, lang);
        assert(Boolean(whitepaper), `Missing whitepaper markdown for ${page.id}:${lang}`);
        assert(Boolean(WHITEPAPER_MARKDOWN_RAW?.[page.id]?.[lang]), `Whitepaper ${page.id}:${lang} must not rely on English fallback`);
        if (whitepaper?.meta?.canonical) {
          assert(
            whitepaper.meta.canonical === `${SITE_URL}${content.path}`,
            `Canonical mismatch for ${page.id}:${lang}: ${whitepaper.meta.canonical} !== ${SITE_URL}${content.path}`
          );
        }
      }
    }
  }
}

function validateResourceCategories() {
  const categoryIds = Object.keys(RESOURCE_CATEGORY_PATHS);
  assert(categoryIds.length === 7, `Expected 7 resource category pages, found ${categoryIds.length}`);
  for (const categoryId of categoryIds) {
    const page = MARKETING_PAGES.find((item) => item.id === categoryId);
    assert(Boolean(page), `Missing resource category page ${categoryId}`);
    assert(page?.schemaType === 'resourcesHub', `Resource category ${categoryId} must use CollectionPage schema`);
    assert(page?.dateModified === RESOURCE_LASTMOD, `Resource category ${categoryId} must use ${RESOURCE_LASTMOD} dateModified`);
    for (const lang of MARKETING_LANGUAGES) {
      const content = page?.translations?.[lang];
      assert(content?.path === RESOURCE_CATEGORY_PATHS[categoryId][lang], `Path mismatch for ${categoryId}:${lang}`);
      assert((content?.sections || []).length >= 3, `Resource category ${categoryId}:${lang} needs at least three content sections`);
      assert((content?.faqs || []).length >= 2, `Resource category ${categoryId}:${lang} needs FAQ content`);
      assert((content?.resourceLinks || []).length >= 4 || (content?.checklistLinks || []).length >= 4, `Resource category ${categoryId}:${lang} needs selected resources or checklists`);
    }
  }
}

function validateWhitepapers() {
  for (const pageId of WHITEPAPER_MARKDOWN_PAGE_IDS) {
    for (const lang of MARKETING_LANGUAGES) {
      assert(Boolean(WHITEPAPER_MARKDOWN_RAW?.[pageId]?.[lang]), `Missing raw localized whitepaper markdown for ${pageId}:${lang}`);
      assert(Boolean(getWhitepaperMarkdownPage(pageId, lang)), `Missing generated whitepaper markdown for ${pageId}:${lang}`);
    }
  }
}

function validateOemFaq() {
  const expected = {
    'oem-white-label-water-testing-kits.md': 'Yes. Claims, labeling, validations, importation and local requirements must be reviewed by country, matrix and intended use.',
    'oem-marca-blanca-kits-analisis-agua.md': 'Sí. Los claims, etiquetado, validaciones, importación y requisitos locales deben revisarse por país, matriz y uso previsto.',
    'oem-marque-blanche-kits-analyse-eau.md': 'Oui. Les claims, l’étiquetage, les validations, l’importation et les exigences locales doivent être revus par pays, matrice et usage prévu.',
    'oem-white-label-kit-analisi-acqua.md': 'Sì. Claim, etichettatura, validazioni, importazione e requisiti locali devono essere rivisti per paese, matrice e uso previsto.',
    'oem-marca-blanca-kits-analisi-aigua.md': 'Sí. Claims, etiquetatge, validacions, importació i requisits locals s’han de revisar per país, matriu i ús previst.'
  };
  for (const [filename, answer] of Object.entries(expected)) {
    const file = path.join('content/whitepapers', filename);
    const source = fs.readFileSync(file, 'utf8');
    assert(source.includes(answer), `OEM regulatory FAQ answer is not affirmative in ${filename}`);
  }
}

function extractTableBlocks(source) {
  const lines = String(source || '').replace(/\r\n/g, '\n').split('\n');
  const tables = [];
  let index = 0;
  while (index < lines.length) {
    if (!lines[index].trim().startsWith('|')) {
      index += 1;
      continue;
    }
    const block = [];
    while (index < lines.length && lines[index].trim().startsWith('|')) {
      block.push(lines[index].trim());
      index += 1;
    }
    if (block.length >= 3) tables.push(block.join('\n').replace(/\s+/g, ' ').toLowerCase());
  }
  return tables;
}

function validateNoDuplicateTables() {
  const files = fs.readdirSync('content/whitepapers')
    .filter((file) => /^(excel|da-excel|oem)/.test(file) && file.endsWith('.md'));
  for (const file of files) {
    const tables = extractTableBlocks(fs.readFileSync(path.join('content/whitepapers', file), 'utf8'));
    const seen = new Set();
    for (const table of tables) {
      assert(!seen.has(table), `Duplicate markdown table remains in ${file}`);
      seen.add(table);
    }
  }
}

function pdfPageCount(buffer) {
  const source = buffer.toString('latin1');
  return (source.match(/\/Type \/Page\b/g) || []).length;
}

function validatePdfMetadata(buffer, href, lang) {
  const source = buffer.toString('latin1');
  assert(source.includes(`/Lang (${PDF_LANG[lang]})`), `Checklist PDF missing /Lang ${PDF_LANG[lang]}: ${href}`);
  for (const token of ['/Title', '/Author', '/Subject', '/Keywords', '/Creator', '/Producer', '/CreationDate', '/ModDate']) {
    assert(source.includes(token), `Checklist PDF missing metadata ${token}: ${href}`);
  }
  assert(source.includes('/Annots') || !href.includes('/checklists/'), `Checklist PDF should include clickable link annotation: ${href}`);
}

function validateChecklists() {
  for (const lang of MARKETING_LANGUAGES) {
    const hub = getResourcesHubContent(lang);
    const ids = new Set(hub.checklists.map(([id]) => id));
    for (const id of PRIORITY_TWO_PAGE_CHECKLISTS) {
      assert(ids.has(id), `Priority checklist ${id}:${lang} is not listed in resources hub.`);
    }
    assert(ids.size === 13, `Expected 13 hub checklists for ${lang}, found ${ids.size}`);
    for (const [id] of hub.checklists) {
      const href = getChecklistHref(lang, id);
      const file = publicPath(href);
      assert(exists(file), `Missing checklist PDF ${href}`);
      if (exists(file)) {
        const buffer = fs.readFileSync(file);
        assert(buffer.subarray(0, 5).toString() === '%PDF-', `Checklist is not a PDF: ${href}`);
        assert(buffer.length > 1200, `Checklist PDF is unexpectedly small: ${href}`);
        validatePdfMetadata(buffer, href, lang);
        if (PRIORITY_TWO_PAGE_CHECKLISTS.has(id)) {
          assert(pdfPageCount(buffer) >= 2, `Priority checklist PDF should have at least two pages: ${href}`);
        }
      }
    }
  }
}

function validateSitemapIfPresent() {
  const sitemapFile = 'public/sitemaps/sitemap-resources.xml';
  const indexFile = 'public/sitemap.xml';
  if (!exists(sitemapFile) || !exists(indexFile)) {
    warnings.push('Resource sitemap is not present; run npm run seo:sitemap before release.');
    return;
  }
  const sitemap = fs.readFileSync(sitemapFile, 'utf8');
  const sitemapIndex = fs.readFileSync(indexFile, 'utf8');
  assert(sitemap.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"'), 'Resource sitemap missing xhtml namespace for hreflang links');
  const resources = MARKETING_PAGES.filter((page) => page.category === 'resources');
  for (const page of resources) {
    const lastmod = page.dateModified || getResourceEditorialMeta(page.id).dateModified || RESOURCE_LASTMOD;
    for (const lang of MARKETING_LANGUAGES) {
      const routePath = page.translations[lang]?.path;
      if (!routePath) continue;
      assert(sitemap.includes(`${SITE_URL}${routePath}`), `Sitemap missing ${routePath}`);
      if (page.id.startsWith('resources-') || getResourceEditorialMeta(page.id).dateModified === RESOURCE_LASTMOD) {
        const routeIndex = sitemap.indexOf(`<loc>${SITE_URL}${routePath}</loc>`);
        const blockStart = sitemap.lastIndexOf('<url>', routeIndex);
        const blockEnd = sitemap.indexOf('</url>', routeIndex);
        const block = sitemap.slice(blockStart, blockEnd + 6);
        assert(block.includes(`<lastmod>${RESOURCE_LASTMOD}</lastmod>`), `Sitemap lastmod for ${routePath} must be ${RESOURCE_LASTMOD}`);
      }
    }
    assert(/^\d{4}-\d{2}-\d{2}$/.test(lastmod), `Invalid lastmod candidate for ${page.id}: ${lastmod}`);
  }
  assert(sitemapIndex.includes(`<lastmod>${RESOURCE_LASTMOD}</lastmod>`), 'Sitemap index should reflect max child resource lastmod');
}

function validateDistHtmlIfPresent() {
  if (!exists('dist')) {
    warnings.push('dist is not present; static HTML checks will run after build.');
    return;
  }

  const missingCategoryDist = Object.values(RESOURCE_CATEGORY_PATHS).some((paths) => (
    MARKETING_LANGUAGES.some((lang) => !exists(distPath(paths[lang])))
  ));
  if (missingCategoryDist) {
    warnings.push('dist appears stale or predates resource categories; run npm run build and rerun validate:resources for static HTML checks.');
    return;
  }

  const editorialPages = MARKETING_PAGES.filter((page) => page.category === 'resources' && getResourceEditorialMeta(page.id).dateModified);
  for (const page of editorialPages) {
    for (const lang of MARKETING_LANGUAGES) {
      const file = distPath(page.translations[lang]?.path || '');
      const html = readIfExists(file);
      assert(Boolean(html), `Missing dist HTML for ${page.id}:${lang}`);
      assert(html.includes('<aside aria-labelledby="editorial-info-title">'), `Dist HTML missing editorial trust block for ${page.id}:${lang}`);
      assert(html.includes('<dl>') && html.includes('<dt>') && html.includes('<dd>'), `Editorial trust block must use dl/dt/dd for ${page.id}:${lang}`);
    }
  }

  for (const [categoryId, paths] of Object.entries(RESOURCE_CATEGORY_PATHS)) {
    for (const lang of MARKETING_LANGUAGES) {
      const html = readIfExists(distPath(paths[lang]));
      assert(Boolean(html), `Missing dist HTML for resource category ${categoryId}:${lang}`);
      assert(html.includes('resource-category-itemlist'), `Dist HTML missing category ItemList schema for ${categoryId}:${lang}`);
    }
  }

  const forbiddenLocalizedLabels = {
    es: ['>Audience<', '>Region<', '>Reading time<', '>Related topics<'],
    fr: ['>Audience<', '>Region<', '>Reading time<', '>Related topics<'],
    it: ['>Audience<', '>Region<', '>Reading time<', '>Related topics<'],
    ca: ['>Audience<', '>Region<', '>Reading time<', '>Related topics<']
  };
  for (const [lang, labels] of Object.entries(forbiddenLocalizedLabels)) {
    for (const page of MARKETING_PAGES.filter((item) => item.category === 'resources')) {
      const html = readIfExists(distPath(page.translations[lang]?.path || ''));
      for (const label of labels) {
        assert(!html.includes(label), `Dist HTML contains English structural label ${label} in ${page.id}:${lang}`);
      }
    }
  }
}

function validateNoPlaceholders() {
  const files = [
    'utils/resourceUiLabels.js',
    'utils/marketing-pages/resourceCategoryPages.js',
    'utils/resourcesHubContent.js'
  ];
  for (const file of files) {
    const source = fs.readFileSync(file, 'utf8');
    assert(!/\b(TBD|lorem ipsum)\b/i.test(source), `Placeholder text remains in ${file}`);
  }
}

scanForScientificPdfReferences();
validateResourceLabels();
validateResourceRoutes();
validateResourceCategories();
validateWhitepapers();
validateOemFaq();
validateNoDuplicateTables();
validateChecklists();
validateSitemapIfPresent();
validateDistHtmlIfPresent();
validateNoPlaceholders();

console.log(JSON.stringify({
  ok: errors.length === 0,
  checkedLanguages: MARKETING_LANGUAGES,
  checkedResourceCategories: Object.keys(RESOURCE_CATEGORY_PATHS).length,
  checkedWhitepaperPages: WHITEPAPER_MARKDOWN_PAGE_IDS.length,
  errors,
  warnings
}, null, 2));

if (errors.length) process.exit(1);
