import fs from 'node:fs';
import path from 'node:path';
import {
  GLOSSARY_PRIORITY_IDS,
  getGlossaryHubContent,
  getGlossaryTermById,
  getGlossaryTermHref,
  getGlossaryTerms,
  getIndustryGlossaryTerms
} from '../utils/glossaryContent.js';
import {
  GLOSSARY_INDUSTRY_TERM_IDS,
  GLOSSARY_RETIRED_LEGACY_TERM_CANONICAL_IDS,
  INDUSTRY_IDS
} from '../utils/glossaryRelations.js';
import { GLOSSARY_TERM_ROUTE_PATHS } from '../utils/glossaryRoutes.js';
import { INDUSTRY_MARKETING_PAGES } from '../utils/marketing-pages/industryPages.js';

const LANGUAGES = ['en', 'es', 'fr', 'it', 'ca'];
const errors = [];
const warnings = [];
const mode = process.argv.includes('--source')
  ? 'source'
  : process.argv.includes('--dist')
    ? 'dist'
    : 'all';

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function routeHtmlPath(routePath) {
  return path.join('dist', routePath === '/' ? 'index.html' : routePath.replace(/^\/+/, ''), 'index.html');
}

function readIfExists(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
}

function validateSource() {
  const generator = fs.readFileSync('scripts/generate-glossary-data.js', 'utf8');
  assert(!generator.includes('/Users/') && !generator.includes('/Downloads/'), 'Glossary generator must not depend on a personal absolute path.');
  assert(!fs.readFileSync('utils/glossaryContent.js', 'utf8').includes('function productRouteFor'), 'productRouteFor heuristic must not be public relation source.');
  assert(!fs.readFileSync('utils/glossaryContent.js', 'utf8').includes('function whitepaperRouteFor'), 'whitepaperRouteFor heuristic must not be public relation source.');

  for (const lang of LANGUAGES) {
    const terms = getGlossaryTerms(lang);
    assert(terms.length >= 130, `${lang} glossary has too few terms: ${terms.length}`);
    const ids = new Set();
    for (const term of terms) {
      assert(typeof term.id === 'string' && !/^\d+$/.test(term.id), `${lang} term has non-stable id: ${term.term}`);
      assert(term.term && term.slug && term.definition && term.application, `${lang} term ${term.id} is missing localized content.`);
      assert(!ids.has(term.id), `${lang} duplicate glossary id: ${term.id}`);
      ids.add(term.id);
      assert(getGlossaryTermHref(term.id, lang).startsWith('/'), `${lang} term ${term.id} has invalid href.`);
    }
    assert(getGlossaryHubContent(lang).terms.some((term) => term.id === 'haccp'), `${lang} glossary must expose supporting term haccp.`);
  }

  assert(!GLOSSARY_PRIORITY_IDS.includes('water-safety-plan-2'), 'Retired Water Safety Plan duplicate must not be a priority route.');
  assert(getGlossaryTermById(40, 'en')?.id === GLOSSARY_RETIRED_LEGACY_TERM_CANONICAL_IDS[40], 'Legacy numeric ID 40 must resolve to canonical Water Safety Plan.');

  for (const [routeId, paths] of Object.entries(GLOSSARY_TERM_ROUTE_PATHS)) {
    assert(!/^glossary-term-\d+$/.test(routeId), `Glossary route still uses numeric id: ${routeId}`);
    for (const lang of LANGUAGES) {
      assert(paths[lang], `Glossary route ${routeId} is missing ${lang} path.`);
    }
  }

  for (const industryId of INDUSTRY_IDS) {
    const termIds = GLOSSARY_INDUSTRY_TERM_IDS[industryId] || [];
    assert(termIds.length >= 6 && termIds.length <= 12, `${industryId} must have 6-12 glossary terms.`);
    const terms = getIndustryGlossaryTerms(industryId, 'en', 20);
    assert(terms.length === termIds.length, `${industryId} has unresolved glossary term relations.`);
  }

  for (const page of INDUSTRY_MARKETING_PAGES) {
    assert(page.dateModified === '2026-06-18', `${page.id} must have real dateModified.`);
    if (page.id === 'industries-hub') {
      assert(page.schemaType === 'industries', 'Industries hub must remain CollectionPage metadata.');
    } else {
      assert(page.parentId === 'industries-hub', `${page.id} must use industries-hub as parentId.`);
      assert(page.schemaType === 'IndustryService', `${page.id} must use IndustryService metadata.`);
    }
  }
}

function validateDist() {
  if (!fs.existsSync('dist')) {
    fail('dist directory is missing. Run npm run build before dist validation.');
    return;
  }

  for (const page of INDUSTRY_MARKETING_PAGES) {
    for (const lang of LANGUAGES) {
      const routePath = page.translations[lang]?.path;
      if (!routePath) continue;
      const filePath = routeHtmlPath(routePath);
      const html = readIfExists(filePath);
      assert(html, `Missing prerendered industry HTML: ${filePath}`);
      assert(html.includes('conceptos-glosario'), `${routePath} is missing prerendered glossary concepts block.`);
      if (page.id === 'industries-hub') {
        assert(html.includes('"@type": "CollectionPage"'), `${routePath} must include CollectionPage schema.`);
        assert(html.includes('industries-itemlist'), `${routePath} must include industries ItemList schema.`);
      } else {
        assert(html.includes('"@type": "Service"'), `${routePath} must include Service schema.`);
        assert(html.includes('"@type": "WebPage"'), `${routePath} must include WebPage schema.`);
      }
    }
  }

  for (const lang of LANGUAGES) {
    const glossary = getGlossaryHubContent(lang);
    const hubHtml = readIfExists(routeHtmlPath(glossary.path));
    assert(hubHtml.includes('termino-haccp'), `${glossary.path} must expose haccp anchor.`);
    assert(hubHtml.includes('DefinedTermSet'), `${glossary.path} must include DefinedTermSet schema.`);
    assert(hubHtml.includes('Explore concepts by sector') || hubHtml.includes('Explorar conceptos por sector') || hubHtml.includes('Explorer les concepts par secteur') || hubHtml.includes('Esplora i concetti per settore') || hubHtml.includes('Explorar conceptes per sector'), `${glossary.path} must include sector explorer.`);
  }

  const sitemap = readIfExists('public/sitemaps/sitemap-industries.xml');
  assert(sitemap.includes('<lastmod>2026-06-18</lastmod>'), 'sitemap-industries.xml must use real industry lastmod.');
}

if (mode === 'source' || mode === 'all') validateSource();
if (mode === 'dist' || mode === 'all') {
  if (mode === 'all' && !fs.existsSync('dist')) {
    warn('dist is missing; skipped dist validation in default mode.');
  } else {
    validateDist();
  }
}

const result = {
  ok: errors.length === 0,
  mode,
  errors,
  warnings
};

console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exit(1);
