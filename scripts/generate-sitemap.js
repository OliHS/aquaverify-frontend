import fs from 'node:fs/promises';
import { MARKETING_LANGUAGES, MARKETING_PAGES } from '../utils/marketingPages.js';

const SITE_URL = 'https://aquaverify.com';
const LASTMOD = '2026-05-20';

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

function urlBlock(path, priority = '0.7') {
  return [
    '  <url>',
    `    <loc>${escapeXml(absolute(path))}</loc>`,
    `    <lastmod>${LASTMOD}</lastmod>`,
    '    <changefreq>weekly</changefreq>',
    `    <priority>${priority}</priority>`,
    '  </url>'
  ].join('\n');
}

function sitemapXml(blocks) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${blocks.join('\n')}
</urlset>
`;
}

function sitemapIndexXml(files) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${files
  .map(
    (file) => `  <sitemap>
    <loc>${escapeXml(`${SITE_URL}/sitemaps/${file}`)}</loc>
    <lastmod>${LASTMOD}</lastmod>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>
`;
}

function pageBlocks(pages, priority) {
  const blocks = [];

  for (const page of pages) {
    for (const lang of MARKETING_LANGUAGES) {
      const path = page.translations[lang]?.path;
      if (path) blocks.push(urlBlock(path, priority));
    }
  }

  return blocks;
}

const groups = [
  {
    file: 'sitemap-home.xml',
    blocks: [urlBlock('/', '1.0'), ...MARKETING_LANGUAGES.map((lang) => urlBlock(homePaths[lang], '0.9'))]
  },
  {
    file: 'sitemap-products.xml',
    blocks: pageBlocks(
      MARKETING_PAGES.filter((page) => page.category === 'products'),
      '0.8'
    )
  },
  {
    file: 'sitemap-industries.xml',
    blocks: pageBlocks(
      MARKETING_PAGES.filter((page) => page.category === 'industries'),
      '0.8'
    )
  },
  {
    file: 'sitemap-resources.xml',
    blocks: pageBlocks(
      MARKETING_PAGES.filter((page) => page.category === 'resources'),
      '0.7'
    )
  },
  {
    file: 'sitemap-platform-partners.xml',
    blocks: pageBlocks(
      MARKETING_PAGES.filter((page) => ['platform', 'partners', 'company'].includes(page.category)),
      '0.8'
    )
  }
];

await fs.mkdir('public/sitemaps', { recursive: true });
await Promise.all(groups.map((group) => fs.writeFile(`public/sitemaps/${group.file}`, sitemapXml(group.blocks))));
await fs.writeFile('public/sitemap.xml', sitemapIndexXml(groups.map((group) => group.file)));
