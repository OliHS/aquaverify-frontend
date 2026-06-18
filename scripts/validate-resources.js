import fs from 'node:fs';
import path from 'node:path';
import {
  MARKETING_LANGUAGES,
  MARKETING_PAGES,
  getMarketingAlternates
} from '../utils/marketingPages.js';
import {
  getChecklistHref,
  getResourcesHubContent
} from '../utils/resourcesHubContent.js';
import {
  WHITEPAPER_MARKDOWN_PAGE_IDS,
  getWhitepaperMarkdownPage
} from '../utils/whitepaperMarkdownContent.js';

const SITE_URL = 'https://aquaverify.com';
const errors = [];
const warnings = [];

function exists(filePath) {
  return fs.existsSync(filePath);
}

function publicPath(href) {
  return path.join('public', href.replace(/^\/+/, ''));
}

function assert(condition, message) {
  if (!condition) errors.push(message);
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

function validateWhitepapers() {
  for (const pageId of WHITEPAPER_MARKDOWN_PAGE_IDS) {
    for (const lang of MARKETING_LANGUAGES) {
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

function validateChecklists() {
  const priority = new Set([
    'lims',
    'rd_3_2023_coliphages',
    'food_beverage_water',
    'legionella_facilities',
    'iso_19458_sampling'
  ]);
  for (const lang of MARKETING_LANGUAGES) {
    const hub = getResourcesHubContent(lang);
    const ids = new Set(hub.checklists.map(([id]) => id));
    for (const id of priority) {
      assert(ids.has(id), `Priority checklist ${id}:${lang} is not listed in resources hub.`);
    }
    for (const [id] of hub.checklists) {
      const href = getChecklistHref(lang, id);
      const file = publicPath(href);
      assert(exists(file), `Missing checklist PDF ${href}`);
      if (exists(file)) {
        const buffer = fs.readFileSync(file);
        assert(buffer.subarray(0, 5).toString() === '%PDF-', `Checklist is not a PDF: ${href}`);
        assert(buffer.length > 500, `Checklist PDF is unexpectedly small: ${href}`);
      }
    }
  }
}

function validateSitemapIfPresent() {
  const sitemapFile = 'public/sitemaps/sitemap-resources.xml';
  if (!exists(sitemapFile)) {
    warnings.push('public/sitemaps/sitemap-resources.xml is not present; run npm run seo:sitemap before release.');
    return;
  }
  const sitemap = fs.readFileSync(sitemapFile, 'utf8');
  const resources = MARKETING_PAGES.filter((page) => page.category === 'resources');
  for (const page of resources) {
    for (const lang of MARKETING_LANGUAGES) {
      const routePath = page.translations[lang]?.path;
      if (routePath) assert(sitemap.includes(`${SITE_URL}${routePath}`), `Sitemap missing ${routePath}`);
    }
  }
}

scanForScientificPdfReferences();
validateResourceRoutes();
validateWhitepapers();
validateOemFaq();
validateChecklists();
validateSitemapIfPresent();

console.log(JSON.stringify({
  ok: errors.length === 0,
  checkedLanguages: MARKETING_LANGUAGES,
  checkedWhitepaperPages: WHITEPAPER_MARKDOWN_PAGE_IDS.length,
  errors,
  warnings
}, null, 2));

if (errors.length) process.exit(1);
