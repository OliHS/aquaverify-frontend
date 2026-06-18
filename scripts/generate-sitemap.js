import fs from 'node:fs/promises';
import { MARKETING_LANGUAGES, MARKETING_PAGES } from '../utils/marketingPages.js';
import { getResourceEditorialMeta } from '../utils/resourceEditorialMetadata.js';

const SITE_URL = 'https://aquaverify.com';
const DEFAULT_LASTMOD = '2026-05-20';
const RESOURCE_LASTMOD = '2026-06-18';
const CURRENT_DATE = '2026-06-18';

const homePaths = {
  'x-default': '/',
  en: '/en',
  es: '/es',
  fr: '/fr',
  it: '/it',
  ca: '/ca'
};

function absolute(path) {
  return `${SITE_URL}${path === '/' ? '/' : path}`;
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function assertDate(value, context) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`Invalid sitemap lastmod for ${context}: ${value}`);
  }
  if (value > CURRENT_DATE) {
    throw new Error(`Future sitemap lastmod for ${context}: ${value}`);
  }
  return value;
}

function pageLastmod(page) {
  if (!page) return DEFAULT_LASTMOD;
  if (page.dateModified) return assertDate(page.dateModified, page.id);
  if (page.category === 'resources') {
    const editorialDate = getResourceEditorialMeta(page.id).dateModified;
    return assertDate(editorialDate || RESOURCE_LASTMOD, page.id);
  }
  return DEFAULT_LASTMOD;
}

function alternatesBlock(alternates) {
  if (!alternates?.length) return '';
  return alternates
    .map((alternate) => `    <xhtml:link rel="alternate" hreflang="${escapeXml(alternate.lang)}" href="${escapeXml(absolute(alternate.path))}" />`)
    .join('\n');
}

function urlBlock(entry) {
  return [
    '  <url>',
    `    <loc>${escapeXml(absolute(entry.path))}</loc>`,
    `    <lastmod>${entry.lastmod}</lastmod>`,
    '    <changefreq>weekly</changefreq>',
    `    <priority>${entry.priority}</priority>`,
    alternatesBlock(entry.alternates),
    '  </url>'
  ].filter(Boolean).join('\n');
}

function sitemapXml(entries) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.map(urlBlock).join('\n')}
</urlset>
`;
}

function maxLastmod(entries) {
  return entries.reduce((max, entry) => entry.lastmod > max ? entry.lastmod : max, DEFAULT_LASTMOD);
}

function sitemapIndexXml(groups) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${groups
  .map(
    (group) => `  <sitemap>
    <loc>${escapeXml(`${SITE_URL}/sitemaps/${group.file}`)}</loc>
    <lastmod>${maxLastmod(group.entries)}</lastmod>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>
`;
}

function homeEntries() {
  const alternates = [
    { lang: 'x-default', path: homePaths['x-default'] },
    ...MARKETING_LANGUAGES.map((lang) => ({ lang, path: homePaths[lang] }))
  ];
  return [
    { path: '/', priority: '1.0', lastmod: DEFAULT_LASTMOD, alternates },
    ...MARKETING_LANGUAGES.map((lang) => ({
      path: homePaths[lang],
      priority: '0.9',
      lastmod: DEFAULT_LASTMOD,
      alternates
    }))
  ];
}

function pageEntries(pages, priority) {
  const entries = [];

  for (const page of pages) {
    const alternates = [
      page.translations.en?.path ? { lang: 'x-default', path: page.translations.en.path } : null,
      ...MARKETING_LANGUAGES.map((lang) => (
        page.translations[lang]?.path ? { lang, path: page.translations[lang].path } : null
      ))
    ].filter(Boolean);
    const lastmod = pageLastmod(page);

    for (const lang of MARKETING_LANGUAGES) {
      const path = page.translations[lang]?.path;
      if (path) entries.push({ path, priority, lastmod, alternates });
    }
  }

  return entries;
}

const groups = [
  {
    file: 'sitemap-home.xml',
    entries: homeEntries()
  },
  {
    file: 'sitemap-products.xml',
    entries: pageEntries(
      MARKETING_PAGES.filter((page) => page.category === 'products'),
      '0.8'
    )
  },
  {
    file: 'sitemap-industries.xml',
    entries: pageEntries(
      MARKETING_PAGES.filter((page) => page.category === 'industries'),
      '0.8'
    )
  },
  {
    file: 'sitemap-resources.xml',
    entries: pageEntries(
      MARKETING_PAGES.filter((page) => page.category === 'resources'),
      '0.7'
    )
  },
  {
    file: 'sitemap-platform-partners.xml',
    entries: pageEntries(
      MARKETING_PAGES.filter((page) => ['platform', 'partners', 'company'].includes(page.category)),
      '0.8'
    )
  }
];

await fs.mkdir('public/sitemaps', { recursive: true });
await Promise.all(groups.map((group) => fs.writeFile(`public/sitemaps/${group.file}`, sitemapXml(group.entries))));
await fs.writeFile('public/sitemap.xml', sitemapIndexXml(groups));
