import {
  MARKETING_LANGUAGES,
  MARKETING_PAGES
} from '../utils/marketingPages.js';

const rows = MARKETING_PAGES.flatMap((page) =>
  MARKETING_LANGUAGES.map((language) => ({
    pageId: page.id,
    category: page.category,
    language,
    path: page.translations[language]?.path || '',
    faqs: page.translations[language]?.faqs || []
  }))
);

const missing = rows.filter((row) => row.faqs.length === 0);

console.log(JSON.stringify({
  ok: missing.length === 0,
  expectedUrls: rows.length,
  urlsWithFaqs: rows.length - missing.length,
  missingFaqs: missing.length,
  sampleMissingFaqs: missing.slice(0, 20)
}, null, 2));

if (missing.length > 0) {
  process.exit(1);
}
