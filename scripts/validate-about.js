import fs from 'node:fs';
import path from 'node:path';
import {
  ABOUT_KEY_CONCEPT_IDS,
  ABOUT_PAGE_TRANSLATIONS,
  ABOUT_REQUIRED_ROUTE_IDS,
  ABOUT_REVIEW_DATE
} from '../utils/aboutContent.js';
import { getGlossaryTermById } from '../utils/glossaryContent.js';
import { MARKETING_ROUTE_LANGUAGES, getMarketingPagePath } from '../utils/marketingRoutes.js';

const LANGUAGES = ['en', 'es', 'fr', 'it', 'ca'];
const SITE_URL = 'https://aquaverify.com';
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

function readIfExists(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
}

function routeHtmlPath(routePath) {
  return path.join('dist', routePath === '/' ? 'index.html' : routePath.replace(/^\/+/, ''), 'index.html');
}

function publicPath(href) {
  return path.join('public', href.replace(/^\/+/, ''));
}

function walkStrings(value, strings = []) {
  if (typeof value === 'string') {
    strings.push(value);
    return strings;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => walkStrings(item, strings));
    return strings;
  }
  if (value && typeof value === 'object') {
    Object.values(value).forEach((item) => walkStrings(item, strings));
  }
  return strings;
}

function countMatches(source, pattern) {
  return (String(source || '').match(pattern) || []).length;
}

function forbiddenPhrase(...parts) {
  return new RegExp(parts.join('\\s+'), 'i');
}

function forbiddenPhonePattern() {
  const exchange = ['5', '5', '5'].join('');
  return new RegExp(`\\+1\\s*\\(${exchange}\\)`, 'i');
}

function validateSource() {
  assert(ABOUT_REVIEW_DATE === '2026-06-22', `About review date must be 2026-06-22, found ${ABOUT_REVIEW_DATE}`);
  assert(LANGUAGES.every((lang) => MARKETING_ROUTE_LANGUAGES.includes(lang)), 'About languages must match marketing route languages.');

  const socialImage = publicPath('/images/social/about-aquaverify-1200x630.png');
  assert(fs.existsSync(socialImage), `Missing About social image: ${socialImage}`);
  if (fs.existsSync(socialImage)) {
    const size = fs.statSync(socialImage).size;
    assert(size > 10_000, `About social image is unexpectedly small: ${size} bytes`);
  }

  for (const routeId of ABOUT_REQUIRED_ROUTE_IDS) {
    for (const lang of LANGUAGES) {
      const routePath = getMarketingPagePath(routeId, lang);
      assert(routePath && routePath !== '/', `Required About route id ${routeId}:${lang} does not resolve to a localized path.`);
    }
  }

  for (const conceptId of ABOUT_KEY_CONCEPT_IDS) {
    for (const lang of LANGUAGES) {
      assert(Boolean(getGlossaryTermById(conceptId, lang)), `About glossary concept ${conceptId}:${lang} does not resolve.`);
    }
  }

  for (const lang of LANGUAGES) {
    const content = ABOUT_PAGE_TRANSLATIONS[lang];
    assert(Boolean(content), `Missing About content for ${lang}.`);
    if (!content) continue;

    assert(content.path === getMarketingPagePath('about', lang), `About path mismatch for ${lang}.`);
    assert(Boolean(content.seoTitle), `Missing About seoTitle for ${lang}.`);
    assert(Boolean(content.seoDescription), `Missing About seoDescription for ${lang}.`);
    assert(Boolean(content.title), `Missing About title for ${lang}.`);
    assert(Boolean(content.description), `Missing About description for ${lang}.`);
    assert(Boolean(content.directAnswer?.title && content.directAnswer?.body), `Missing About directAnswer for ${lang}.`);
    assert((content.pillars || []).length === 3, `About ${lang} must have 3 pillars.`);
    assert((content.sections || []).length >= 8, `About ${lang} must have at least 8 sections.`);
    assert((content.faqs || []).length >= 7, `About ${lang} must have at least 7 FAQs.`);
    assert((content.ecosystemTable?.columns || []).length >= 4, `About ${lang} ecosystem table needs columns.`);
    assert((content.ecosystemTable?.rows || []).length >= 5, `About ${lang} ecosystem table needs rows.`);
    assert((content.ecosystemLinks || []).length >= 8, `About ${lang} must link the ecosystem.`);
    assert((content.evidenceLinks || []).length >= 3, `About ${lang} must link evidence resources.`);
    assert((content.commercialLinks || []).length >= 3, `About ${lang} must link commercial paths.`);
    assert((content.schemaKnowsAbout || []).length >= 6, `About ${lang} schema knowsAbout needs concepts.`);

    const source = walkStrings(content).join('\n');
    const forbiddenPatterns = [
      forbiddenPhrase('123', 'Science', 'Park'),
      forbiddenPhrase('Innovation', 'District'),
      forbiddenPhrase('CA', '90210'),
      forbiddenPhonePattern(),
      forbiddenPhrase('AquaTech', 'Solutions', 'NY'),
      forbiddenPhrase('Certified', 'water', 'testing', 'kits'),
      forbiddenPhrase('cumplimiento', 'automático'),
      forbiddenPhrase('automatic', 'compliance'),
      forbiddenPhrase('guaranteed', 'compliance'),
      forbiddenPhrase('cumplimiento', 'garantizado'),
      forbiddenPhrase('sustituto', 'universal'),
      forbiddenPhrase('universal', 'LIMS', 'replacement'),
      forbiddenPhrase('all', 'markets'),
      forbiddenPhrase('all', 'countries'),
      forbiddenPhrase('todos', 'los', 'países'),
      forbiddenPhrase('leader', 'worldwide'),
      forbiddenPhrase('líder', 'mundial')
    ];
    for (const pattern of forbiddenPatterns) {
      assert(!pattern.test(source), `About ${lang} contains forbidden literal ${pattern}.`);
    }

    for (const group of ['ecosystemLinks', 'evidenceLinks', 'commercialLinks']) {
      for (const item of content[group] || []) {
        assert(item.routeId && getMarketingPagePath(item.routeId, lang) !== '/', `About ${lang}.${group} has unresolved route ${item.routeId}.`);
      }
    }
  }

  const titles = new Set(LANGUAGES.map((lang) => ABOUT_PAGE_TRANSLATIONS[lang]?.title).filter(Boolean));
  assert(titles.size === LANGUAGES.length, 'About titles must be localized, not copied from one language.');
}

function validateDist() {
  if (!fs.existsSync('dist')) {
    fail('dist directory is missing. Run npm run build before dist validation.');
    return;
  }

  for (const lang of LANGUAGES) {
    const content = ABOUT_PAGE_TRANSLATIONS[lang];
    const htmlPath = routeHtmlPath(content.path);
    const html = readIfExists(htmlPath);
    assert(Boolean(html), `Missing prerendered About HTML: ${htmlPath}`);
    if (!html) continue;

    assert(countMatches(html, /<h1\b/gi) === 1, `${content.path} must have exactly one H1.`);
    assert(html.includes(content.seoTitle), `${content.path} missing localized SEO title.`);
    assert(html.includes(content.seoDescription), `${content.path} missing localized SEO description.`);
    assert(html.includes(content.directAnswer.title), `${content.path} missing direct answer heading.`);
    assert(html.includes(content.ecosystemTable.title), `${content.path} missing ecosystem table title.`);
    assert(html.includes(content.sections[0].title), `${content.path} missing first About section.`);
    assert(html.includes(content.sections.at(-1).title), `${content.path} missing boundaries section.`);
    assert(html.includes('"@type":"AboutPage"') || html.includes('"@type": "AboutPage"'), `${content.path} missing AboutPage JSON-LD.`);
    assert(html.includes('"@type":"Organization"') || html.includes('"@type": "Organization"'), `${content.path} missing Organization JSON-LD.`);
    assert(html.includes('"@type":"BreadcrumbList"') || html.includes('"@type": "BreadcrumbList"'), `${content.path} missing BreadcrumbList JSON-LD.`);
    assert(html.includes('"@type":"FAQPage"') || html.includes('"@type": "FAQPage"'), `${content.path} missing FAQPage JSON-LD.`);
    assert(html.includes('<caption'), `${content.path} missing semantic table caption.`);

    for (const faq of content.faqs.slice(0, 3)) {
      assert(html.includes(faq.question), `${content.path} missing FAQ question: ${faq.question}`);
      assert(countMatches(html, new RegExp(faq.question.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) >= 1, `${content.path} FAQ question not visible: ${faq.question}`);
    }

    for (const routeId of ['products', 'platform', 'resources', 'glossary', 'contact']) {
      const routePath = getMarketingPagePath(routeId, lang);
      const absolutePath = `${SITE_URL}${routePath}`;
      assert(
        html.includes(`href="${routePath}"`)
        || html.includes(`href='${routePath}'`)
        || html.includes(`href="${absolutePath}"`)
        || html.includes(`href='${absolutePath}'`),
        `${content.path} missing internal link to ${routeId}:${routePath}`
      );
    }

    for (const conceptId of ABOUT_KEY_CONCEPT_IDS.slice(0, 5)) {
      const term = getGlossaryTermById(conceptId, lang);
      assert(term?.term && html.includes(term.term), `${content.path} missing glossary concept ${conceptId}.`);
    }

    if (lang !== 'es') {
      for (const spanishLiteral of ['¿Qué es AquaVerify?', 'microbiología del agua', 'Solicitar recomendación técnica']) {
        assert(!html.includes(spanishLiteral), `${content.path} contains Spanish literal: ${spanishLiteral}`);
      }
    }
  }
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
