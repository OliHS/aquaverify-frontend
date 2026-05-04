import fs from 'node:fs/promises';
import { MARKETING_LANGUAGES, MARKETING_PAGES } from '../utils/marketingPages.js';

const SITE_URL = 'https://aquaverify.com';
const LASTMOD = '2026-05-04';

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

function alternateLinks(alternates) {
  return Object.entries(alternates)
    .map(([lang, path]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${absolute(path)}" />`)
    .join('\n');
}

function urlBlock(path, priority, alternates) {
  return [
    '  <url>',
    `    <loc>${absolute(path)}</loc>`,
    `    <lastmod>${LASTMOD}</lastmod>`,
    '    <changefreq>weekly</changefreq>',
    `    <priority>${priority}</priority>`,
    alternateLinks(alternates),
    '  </url>'
  ].join('\n');
}

const blocks = [
  urlBlock('/', '1.0', homePaths),
  ...MARKETING_LANGUAGES.map((lang) => urlBlock(homePaths[lang], '0.9', homePaths))
];

for (const page of MARKETING_PAGES) {
  const alternates = {
    'x-default': page.translations.en.path,
    ...Object.fromEntries(
      MARKETING_LANGUAGES.map((lang) => [lang, page.translations[lang]?.path]).filter(([, path]) => Boolean(path))
    )
  };

  for (const lang of MARKETING_LANGUAGES) {
    const path = page.translations[lang]?.path;
    if (path) blocks.push(urlBlock(path, page.category === 'resources' ? '0.7' : '0.8', alternates));
  }
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${blocks.join('\n')}
</urlset>
`;

await fs.writeFile('public/sitemap.xml', sitemap);
