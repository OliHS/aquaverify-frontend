import fs from 'node:fs/promises';
import fsSync from 'node:fs';
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
  getWhitepaperMarkdownPage
} from '../utils/whitepaperMarkdownContent.js';
import {
  EDITORIAL_TYPES,
  EDITORIAL_TYPE_LABELS,
  getEditorialTypeLabel,
  getResourceEditorialMeta
} from '../utils/resourceEditorialMetadata.js';

const SITE_URL = 'https://aquaverify.com';
const OUTPUT_DIR = 'docs/seo';
const CSV_FILE = path.join(OUTPUT_DIR, 'resource-url-matrix.csv');
const BASELINE_FILE = path.join(OUTPUT_DIR, 'resources-baseline.md');

const COLUMNS = [
  'resourceId',
  'tipo editorial',
  'idioma',
  'ruta',
  'slug',
  'canonical',
  'alternates/hreflang',
  'título SEO',
  'H1',
  'meta description',
  'estado de indexación previsto',
  'PDF asociado',
  'existencia del archivo',
  'idioma del PDF',
  'estado HTTP esperado',
  'autor',
  'revisor',
  'datePublished',
  'dateModified',
  'fuentes',
  'DOI',
  'estado de revisión editorial'
];

function absolute(routePath) {
  return `${SITE_URL}${routePath === '/' ? '/' : routePath}`;
}

function publicPathFromHref(href) {
  if (!href || /^https?:\/\//i.test(href)) return '';
  return path.join('public', href.replace(/^\/+/, ''));
}

function fileStatus(href) {
  if (!href) return 'not-applicable';
  if (/^https?:\/\//i.test(href)) return 'external-link';
  const filePath = publicPathFromHref(href);
  return fsSync.existsSync(filePath) ? 'exists' : 'missing';
}

function csvCell(value) {
  const normalized = Array.isArray(value) ? value.join('; ') : String(value ?? '');
  return `"${normalized.replaceAll('"', '""')}"`;
}

function csv(rows) {
  return [
    COLUMNS.map(csvCell).join(','),
    ...rows.map((row) => COLUMNS.map((column) => csvCell(row[column])).join(','))
  ].join('\n');
}

function slugFromPath(routePath) {
  return String(routePath || '').split('/').filter(Boolean).at(-1) || '';
}

function pdfLinksFromRaw(raw) {
  return [...String(raw || '').matchAll(/\]\(([^)]+\.pdf)\)|href="([^"]+\.pdf)"/g)]
    .map((match) => match[1] || match[2])
    .map((href) => href.replace(/^\/en\/resources\//, '/resources/'))
    .filter(Boolean)
    .filter((href, index, all) => all.indexOf(href) === index);
}

function reviewStatus(meta) {
  if (meta?.pdfPolicy === 'no-public-pdf-without-rights-evidence') return 'needs-editorial-review';
  if (meta?.sourceUrl || meta?.doi || meta?.pdfPolicy === 'own-resource') return 'source-documented';
  return 'standard-resource-review';
}

function alternatesForPage(page) {
  const alternates = {
    'x-default': page.translations.en?.path,
    ...getMarketingAlternates(page)
  };
  return Object.entries(alternates)
    .filter(([, routePath]) => routePath)
    .map(([lang, routePath]) => `${lang}=${absolute(routePath)}`)
    .join('; ');
}

const rows = [];
const resourcePages = MARKETING_PAGES.filter((page) => page.category === 'resources');

for (const page of resourcePages) {
  const meta = getResourceEditorialMeta(page.id);
  const editorialType = meta.editorialType || 'technical-guide';
  for (const lang of MARKETING_LANGUAGES) {
    const content = page.translations[lang];
    if (!content?.path) continue;
    const whitepaper = getWhitepaperMarkdownPage(page.id, lang);
    const pdfs = pdfLinksFromRaw(whitepaper?.raw || '').join('; ');
    rows.push({
      resourceId: page.id,
      'tipo editorial': getEditorialTypeLabel(page.id, lang) || editorialType,
      idioma: lang,
      ruta: content.path,
      slug: slugFromPath(content.path),
      canonical: absolute(content.path),
      'alternates/hreflang': alternatesForPage(page),
      'título SEO': whitepaper?.metaTitle || content.seoTitle || content.title,
      H1: whitepaper?.title || content.title,
      'meta description': whitepaper?.metaDescription || content.seoDescription || content.description,
      'estado de indexación previsto': 'index, follow',
      'PDF asociado': pdfs,
      'existencia del archivo': pdfs ? pdfs.split('; ').map(fileStatus).join('; ') : 'not-applicable',
      'idioma del PDF': pdfs ? lang : '',
      'estado HTTP esperado': '200',
      autor: meta.pageAuthor || 'AquaVerify',
      revisor: meta.reviewer || '',
      datePublished: meta.datePublished || '',
      dateModified: meta.dateModified || '',
      fuentes: meta.sourceUrl || meta.journal || meta.conference || '',
      DOI: meta.doi || '',
      'estado de revisión editorial': reviewStatus(meta)
    });
  }
}

for (const lang of MARKETING_LANGUAGES) {
  const hub = getResourcesHubContent(lang);
  for (const [id, title, description] of hub.checklists) {
    const href = getChecklistHref(lang, id);
    rows.push({
      resourceId: `checklist:${id}`,
      'tipo editorial': EDITORIAL_TYPE_LABELS[lang]?.[EDITORIAL_TYPES.OPERATIONAL_CHECKLIST] || 'Operational checklist',
      idioma: lang,
      ruta: href,
      slug: slugFromPath(href),
      canonical: absolute(href),
      'alternates/hreflang': '',
      'título SEO': `${title} | AquaVerify`,
      H1: title,
      'meta description': description,
      'estado de indexación previsto': 'file, linked from resources hub',
      'PDF asociado': href,
      'existencia del archivo': fileStatus(href),
      'idioma del PDF': lang,
      'estado HTTP esperado': fileStatus(href) === 'exists' ? '200' : 'missing',
      autor: 'AquaVerify',
      revisor: '',
      datePublished: '',
      dateModified: '',
      fuentes: 'Generated from AquaVerify checklist content',
      DOI: '',
      'estado de revisión editorial': 'generated-operational-checklist'
    });
  }
}

await fs.mkdir(OUTPUT_DIR, { recursive: true });
await fs.writeFile(CSV_FILE, `${csv(rows)}\n`);

const pagesByLanguage = Object.fromEntries(
  MARKETING_LANGUAGES.map((lang) => [lang, resourcePages.filter((page) => page.translations[lang]?.path).length])
);
const checklistRows = rows.filter((row) => row.resourceId.startsWith('checklist:'));
const missingFiles = rows.filter((row) => row['existencia del archivo'].includes('missing'));
const externalSummaries = rows.filter((row) => row['tipo editorial'].toLowerCase().includes('external') || row['tipo editorial'].toLowerCase().includes('resumen'));

await fs.writeFile(BASELINE_FILE, `# AquaVerify Resources Baseline

Generated: 2026-06-18

## Repository context

- Stack: Vite, React, TypeScript/JavaScript modules, static prerender scripts and public assets.
- Resource route source: \`utils/marketing-pages/resourcePages.js\`, \`utils/marketingRoutes.js\`, \`utils/marketingPages.js\`.
- Resource hub source: \`utils/resourcesHubContent.js\`.
- Markdown source: \`content/whitepapers/*.md\`, packed into \`utils/whitepaperMarkdownRaw.js\`.
- Checklist PDFs: generated by \`scripts/generate-resource-checklist-pdfs.js\`.
- Sitemap: generated by \`scripts/generate-sitemap.js\`.
- Robots: \`public/robots.txt\`; no bot-specific policy changes were made.

## Baseline checks observed before implementation

- \`npm run cms:links:audit\`: passed.
- \`npm run marketing:routes:audit\`: passed, 730 checked routes, 0 mismatches.
- \`npm run cms:marketing:strict\`: failed from known CMS sync gap, 375 missing CMS linked pages/blocks.
- \`npm run build\`: passed, 736 prerendered SEO HTML routes; Vite chunk-size warnings only.

## Current inventory

- Resource marketing page rows: ${resourcePages.length * MARKETING_LANGUAGES.length}.
- Checklist PDF rows: ${checklistRows.length}.
- Total matrix rows: ${rows.length}.
- Resource pages by language: ${Object.entries(pagesByLanguage).map(([lang, count]) => `${lang}=${count}`).join(', ')}.
- External-research summary rows: ${externalSummaries.length}.
- Rows with missing associated files: ${missingFiles.length}.

See \`${CSV_FILE}\` for the canonical URL matrix.
`);

console.log(JSON.stringify({
  ok: true,
  csv: CSV_FILE,
  baseline: BASELINE_FILE,
  rows: rows.length,
  missingAssociatedFiles: missingFiles.length
}, null, 2));
