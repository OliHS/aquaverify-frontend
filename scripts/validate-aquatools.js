import fs from 'node:fs';
import path from 'node:path';
import {
  AQUATOOLS_APPROVED_TOOL_IDS,
  AQUATOOLS_CALCULATION_VERSION,
  AQUATOOLS_COPY,
  AQUATOOLS_MARKETING_PAGES,
  AQUATOOLS_TOOL_DEFINITIONS
} from '../utils/aquatoolsContent.js';
import { AQUATOOLS_ROUTE_PATHS } from '../utils/aquatoolsRoutes.js';
import { MARKETING_LANGUAGES } from '../utils/marketing-pages/shared.js';
import { calculateAquaTool } from '../vendor/aquatools-core/index.js';

const SITE_URL = 'https://aquaverify.com';
const vectors = JSON.parse(fs.readFileSync('vendor/aquatools-core/test-vectors/aquatools-free-v1.json', 'utf8'));
const mode = process.argv.includes('--dist') ? 'dist'
  : process.argv.includes('--prod') ? 'prod'
    : 'source';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function valueAtPath(source, propertyPath) {
  return String(propertyPath || '').split('.').reduce((current, part) => current?.[part], source);
}

function htmlPath(routePath) {
  const normalized = routePath === '/' ? '' : routePath.replace(/^\/+|\/+$/g, '');
  return normalized ? path.join('dist', normalized, 'index.html') : path.join('dist', 'index.html');
}

function validateSource() {
  assert(AQUATOOLS_TOOL_DEFINITIONS.length === 8, 'Expected eight AquaTools Free tools');
  assert(AQUATOOLS_MARKETING_PAGES.length === 9, 'Expected hub plus eight tool pages');
  assert(vectors.calculationVersion === AQUATOOLS_CALCULATION_VERSION, 'Vector calculation version mismatch');

  const routeSet = new Set();
  for (const page of AQUATOOLS_MARKETING_PAGES) {
    for (const lang of MARKETING_LANGUAGES) {
      const content = page.translations[lang];
      assert(content?.path, `Missing AquaTools path for ${page.id} ${lang}`);
      assert(content.title && content.description, `Missing title/description for ${page.id} ${lang}`);
      assert(content.faqs?.length >= 3, `Missing FAQ for ${page.id} ${lang}`);
      assert(content.seoTitle && content.seoDescription, `Missing SEO metadata for ${page.id} ${lang}`);
      assert(content.description.includes('AquaTools') || content.aquatools, `Unexpected fallback copy for ${page.id} ${lang}`);
      routeSet.add(content.path);
    }
  }

  assert(routeSet.size === 45, `Expected 45 unique AquaTools routes, found ${routeSet.size}`);
  assert(Object.keys(AQUATOOLS_ROUTE_PATHS).length === 9, 'Expected nine AquaTools route IDs');
  assert(AQUATOOLS_APPROVED_TOOL_IDS.every((id) => AQUATOOLS_ROUTE_PATHS[id]), 'Missing approved tool route');

  const forbidden = ['próximamente', 'coming soon', 'resultado validado', 'cumple ISO', 'resultado oficial', 'aceptado por la autoridad'];
  const serialized = JSON.stringify(AQUATOOLS_MARKETING_PAGES).toLowerCase();
  for (const item of forbidden) assert(!serialized.includes(item), `Forbidden claim or placeholder found: ${item}`);

  for (const vector of vectors.vectors) {
    const calculation = calculateAquaTool(vector.toolId, vector.inputs);
    assert(calculation.errors.length === 0, `${vector.id} returned errors`);
    assert(calculation.formulaId === vector.formulaId, `${vector.id} formulaId mismatch`);
    const actual = valueAtPath(calculation, vector.expected.path);
    assert(Number.isFinite(actual), `${vector.id} expected numeric value`);
    assert(Math.abs(actual - vector.expected.value) <= vector.tolerance, `${vector.id} expected ${vector.expected.value}, got ${actual}`);
  }

  for (const lang of MARKETING_LANGUAGES) {
    assert(AQUATOOLS_COPY[lang].privacy, `Missing privacy copy for ${lang}`);
    assert(AQUATOOLS_COPY[lang].disclaimer, `Missing disclaimer for ${lang}`);
  }

  console.log('OK validate:aquatools:source');
}

function validateDist() {
  for (const page of AQUATOOLS_MARKETING_PAGES) {
    for (const lang of MARKETING_LANGUAGES) {
      const content = page.translations[lang];
      const file = htmlPath(content.path);
      assert(fs.existsSync(file), `Missing prerendered route ${content.path}`);
      const html = fs.readFileSync(file, 'utf8');
      assert((html.match(/<h1\b/g) || []).length === 1, `Expected one H1 in ${content.path}`);
      assert(html.includes(`<link rel="canonical" href="${SITE_URL}${content.path}"`), `Missing canonical in ${content.path}`);
      assert(html.includes('hreflang="x-default"'), `Missing x-default hreflang in ${content.path}`);
      assert(html.includes('name="robots" content="index, follow'), `Missing robots in ${content.path}`);
      assert(html.includes(content.title), `Missing title content in ${content.path}`);
      assert(html.includes(AQUATOOLS_COPY[lang].privacy), `Missing privacy copy in ${content.path}`);
      assert(html.includes(AQUATOOLS_COPY[lang].disclaimer), `Missing disclaimer in ${content.path}`);
      assert(html.includes('FAQPage'), `Missing FAQPage JSON-LD in ${content.path}`);
      assert(page.id === 'aquatools' ? html.includes('ItemList') : html.includes('WebApplication'), `Missing AquaTools schema in ${content.path}`);
      if (page.id !== 'aquatools') {
        assert(html.includes(content.aquatools.formula), `Missing formula in ${content.path}`);
        assert(html.includes(content.aquatools.expectedResult), `Missing example result in ${content.path}`);
      }
    }
  }

  const sitemap = fs.readFileSync('public/sitemaps/sitemap-tools.xml', 'utf8');
  const locCount = (sitemap.match(/<loc>/g) || []).length;
  assert(locCount === 45, `Expected 45 tool sitemap URLs, found ${locCount}`);
  console.log('OK validate:aquatools:dist');
}

async function validateProd() {
  const response = await fetch(`${SITE_URL}/tools`);
  assert(response.ok, `Production /tools returned ${response.status}`);
  const html = await response.text();
  assert(html.includes('AquaTools Free'), 'Production /tools missing AquaTools Free');
  console.log('OK validate:aquatools:prod');
}

if (mode === 'dist') validateDist();
else if (mode === 'prod') await validateProd();
else validateSource();
