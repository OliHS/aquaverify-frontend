import fs from 'node:fs';
import path from 'node:path';
import {
  BUYER_PROBLEM_LABELS,
  BUYER_PROBLEM_LANGUAGES,
  INDUSTRY_BUYER_PROBLEM_IDS,
  INDUSTRY_BUYER_PROBLEMS,
  getIndustryBuyerProblemIds,
  isCompleteBuyerProblems
} from '../utils/industryBuyerProblemsContent.js';
import { resolveIndustryBuyerProblemLinks } from '../utils/industryBuyerProblemLinks.js';
import { INDUSTRY_MARKETING_PAGES } from '../utils/marketing-pages/industryPages.js';

const DIST_DIR = 'dist';
const SITE_URL = 'https://aquaverify.com';
const mode = process.argv.includes('--source')
  ? 'source'
  : process.argv.includes('--dist')
    ? 'dist'
    : process.argv.includes('--prod')
      ? 'prod'
      : 'all';

const errors = [];
const warnings = [];

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function assert(condition, message) {
  if (!condition) fail(message);
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

function routeHtmlPath(routePath) {
  return path.join(DIST_DIR, routePath === '/' ? 'index.html' : routePath.replace(/^\/+/, ''), 'index.html');
}

function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function extractSection(html) {
  const start = html.indexOf('id="problema"');
  if (start < 0) return '';
  const sectionStart = html.lastIndexOf('<section', start);
  const sectionEnd = html.indexOf('</section>', start);
  if (sectionStart < 0 || sectionEnd < 0) return '';
  return html.slice(sectionStart, sectionEnd + '</section>'.length);
}

function countMatches(value, pattern) {
  return (String(value || '').match(pattern) || []).length;
}

function getIndustryPages() {
  return INDUSTRY_MARKETING_PAGES
    .filter((page) => INDUSTRY_BUYER_PROBLEM_IDS.includes(page.id));
}

function hasPlaceholder(value) {
  const text = String(value || '');
  return /\b(TODO|TBD|PLACEHOLDER|XXX)\b/.test(text)
    || /\b(lorem|ipsum)\b/i.test(text)
    || /\bpendiente de\b/i.test(text);
}

function hasGuaranteedClaim(value) {
  return /\b(guarantee|guaranteed|always|ensures compliance|cost reduction guaranteed|garantiza|garantizado|assure la conformité|garantit|garantito|garantisce|assegura compliment)\b/i.test(String(value || ''));
}

function hasSpanishLeak(value, lang) {
  const text = String(value || '');
  if (lang === 'es') return false;
  if (text.includes('¿') || text.includes('¡')) return true;
  if (lang === 'en') {
    return /\b(como|que|agua|muestras|laboratorio|comprador|desviacion|trazabilidad)\b/i.test(normalizeText(text));
  }
  if (lang === 'fr' || lang === 'it') {
    return /\b(muestras|compradores|responsables tecnicos|sin perder|como gestionar)\b/i.test(normalizeText(text));
  }
  return false;
}

function startsWithClearIntent(question, lang) {
  const patterns = {
    en: /^(How|Which)(\s|$)/,
    es: /^¿(Cómo|Qué)(\s|$)/,
    fr: /^(Comment|Quels|Quelle|Quelles)(\s|$)/,
    it: /^(Come|Quali)(\s|$)/,
    ca: /^(Com|Quins|Quines)(\s|$)/
  };
  return patterns[lang]?.test(question) || false;
}

function validateSource() {
  assert(INDUSTRY_BUYER_PROBLEM_IDS.length === 9, `Expected 9 industries, found ${INDUSTRY_BUYER_PROBLEM_IDS.length}.`);
  const pageIds = new Set(getIndustryPages().map((page) => page.id));

  for (const industryId of INDUSTRY_BUYER_PROBLEM_IDS) {
    assert(pageIds.has(industryId), `${industryId} is missing from industry marketing pages.`);
    const source = INDUSTRY_BUYER_PROBLEMS[industryId];
    assert(source, `${industryId} is missing buyer problem source.`);
    assert(source?.problemIds?.length === 5, `${industryId} must declare five stable problem IDs.`);

    for (const lang of BUYER_PROBLEM_LANGUAGES) {
      const page = getIndustryPages().find((item) => item.id === industryId);
      const content = page?.translations?.[lang];
      const buyerProblems = content?.buyerProblems;
      const expectedIds = getIndustryBuyerProblemIds(industryId);

      assert(content?.path, `${industryId} ${lang} is missing route content.`);
      assert(isCompleteBuyerProblems(buyerProblems, expectedIds), `${industryId} ${lang} buyerProblems must contain labels and five valid problems.`);
      if (!buyerProblems) continue;

      const labels = BUYER_PROBLEM_LABELS[lang];
      assert(buyerProblems.eyebrow === labels.eyebrow, `${industryId} ${lang} has unexpected buyerProblems eyebrow.`);
      assert(buyerProblems.title === labels.title, `${industryId} ${lang} has unexpected buyerProblems title.`);
      assert(buyerProblems.cta === labels.cta, `${industryId} ${lang} has unexpected buyerProblems CTA.`);

      const ids = buyerProblems.problems.map((problem) => problem.id);
      assert(ids.join('|') === expectedIds.join('|'), `${industryId} ${lang} problem IDs are not stable across languages.`);

      const questions = new Set();
      for (const problem of buyerProblems.problems) {
        const questionKey = normalizeText(problem.question);
        assert(!questions.has(questionKey), `${industryId} ${lang} has duplicate question: ${problem.question}`);
        questions.add(questionKey);
        assert(startsWithClearIntent(problem.question, lang), `${industryId} ${lang} question does not start with a clear intent: ${problem.question}`);
        assert(problem.answer.length >= 80, `${industryId} ${lang} answer is too short for ${problem.id}.`);
        assert(!hasPlaceholder(`${problem.question} ${problem.answer}`), `${industryId} ${lang} contains placeholder text in ${problem.id}.`);
        assert(!hasGuaranteedClaim(`${problem.question} ${problem.answer}`), `${industryId} ${lang} contains a guaranteed claim in ${problem.id}.`);
        assert(!hasSpanishLeak(`${problem.question} ${problem.answer}`, lang), `${industryId} ${lang} appears to contain Spanish fallback in ${problem.id}.`);
      }

      const faqQuestions = new Set((content.faqs || []).map((faq) => normalizeText(faq.question)));
      for (const problem of buyerProblems.problems) {
        assert(!faqQuestions.has(normalizeText(problem.question)), `${industryId} ${lang} repeats an existing FAQ question: ${problem.question}`);
      }

      const links = resolveIndustryBuyerProblemLinks(buyerProblems, lang);
      assert(links.length <= 3, `${industryId} ${lang} exposes more than three contextual links.`);
      links.forEach((link) => {
        assert(link.href && link.href !== '/', `${industryId} ${lang} has unresolved contextual link ${link.kind}:${link.id}.`);
      });
    }
  }
}

function validateHtml(routePath, html, page, lang, sourceLabel) {
  const buyerProblems = page.translations[lang]?.buyerProblems;
  const section = extractSection(html);

  assert(html, `${sourceLabel} ${routePath} returned empty HTML.`);
  assert(countMatches(html, /<h1\b/g) === 1, `${sourceLabel} ${routePath} must contain exactly one H1.`);
  assert(countMatches(html, /id="problema"/g) === 1, `${sourceLabel} ${routePath} must contain exactly one id="problema".`);
  assert(section, `${sourceLabel} ${routePath} is missing #problema section.`);
  assert(section.includes(escapeHtml(buyerProblems.title)), `${sourceLabel} ${routePath} is missing localized buyer problem H2.`);
  assert(countMatches(section, /<h3\b/g) === 5, `${sourceLabel} ${routePath} must contain five H3 in #problema.`);
  assert(countMatches(section, /data-problem-id=/g) === 5, `${sourceLabel} ${routePath} must contain five visible problem items.`);

  for (const problem of buyerProblems.problems) {
    assert(section.includes(escapeHtml(problem.question)), `${sourceLabel} ${routePath} is missing question ${problem.id}.`);
    assert(section.includes(escapeHtml(problem.answer)), `${sourceLabel} ${routePath} is missing answer ${problem.id}.`);
  }

  assert(/<link rel="canonical" href="https:\/\/aquaverify\.com[^"]+"/.test(html), `${sourceLabel} ${routePath} is missing canonical.`);
  assert(countMatches(html, /hreflang="/g) >= 5, `${sourceLabel} ${routePath} is missing hreflang alternates.`);

  const faqSchemas = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .map((match) => match[1])
    .filter((json) => json.includes('"FAQPage"'));
  for (const problem of buyerProblems.problems) {
    assert(!faqSchemas.some((json) => json.includes(problem.question)), `${sourceLabel} ${routePath} leaks buyer problem ${problem.id} into FAQPage schema.`);
  }

  const hrefs = [...section.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
  for (const href of hrefs) {
    if (href.startsWith('#')) continue;
    const url = href.startsWith('http') ? new URL(href) : new URL(href, SITE_URL);
    if (url.origin !== SITE_URL) continue;
    const localPath = routeHtmlPath(url.pathname);
    assert(fs.existsSync(localPath), `${sourceLabel} ${routePath} has broken contextual link: ${href}`);
  }
}

function validateDist() {
  if (!fs.existsSync(DIST_DIR)) {
    fail('dist directory is missing. Run npm run build before dist validation.');
    return;
  }

  for (const page of getIndustryPages()) {
    for (const lang of BUYER_PROBLEM_LANGUAGES) {
      const routePath = page.translations[lang]?.path;
      const filePath = routeHtmlPath(routePath);
      const html = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
      validateHtml(routePath, html, page, lang, 'dist');
    }
  }
}

async function validateProd() {
  for (const page of getIndustryPages()) {
    for (const lang of BUYER_PROBLEM_LANGUAGES) {
      const routePath = page.translations[lang]?.path;
      const response = await fetch(`${SITE_URL}${routePath}`, { redirect: 'follow' });
      const html = response.ok ? await response.text() : '';
      assert(response.ok, `prod ${routePath} returned HTTP ${response.status}.`);
      validateHtml(routePath, html, page, lang, 'prod');
    }
  }
}

if (mode === 'source' || mode === 'all') validateSource();
if (mode === 'dist' || mode === 'all') validateDist();
if (mode === 'prod') await validateProd();

if (mode === 'all') {
  warn('React hydration parity is covered by shared source rendering plus dist HTML checks; run a browser pass for visual hash-scroll acceptance.');
}

const result = {
  ok: errors.length === 0,
  mode,
  checkedIndustries: INDUSTRY_BUYER_PROBLEM_IDS.length,
  checkedLanguages: BUYER_PROBLEM_LANGUAGES.length,
  checkedRoutes: mode === 'source' ? 0 : INDUSTRY_BUYER_PROBLEM_IDS.length * BUYER_PROBLEM_LANGUAGES.length,
  errors,
  warnings
};

console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exit(1);
