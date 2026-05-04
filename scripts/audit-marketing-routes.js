import {
  MARKETING_LANGUAGES,
  MARKETING_PAGES
} from '../utils/marketingPages.js';
import { getMarketingPagePath } from '../utils/marketingRoutes.js';

const mismatches = [];

for (const page of MARKETING_PAGES) {
  for (const language of MARKETING_LANGUAGES) {
    const expected = page.translations[language]?.path || '';
    const actual = getMarketingPagePath(page.id, language);

    if (actual !== expected) {
      mismatches.push({
        pageId: page.id,
        language,
        expected,
        actual
      });
    }
  }
}

console.log(JSON.stringify({
  ok: mismatches.length === 0,
  checkedRoutes: MARKETING_PAGES.length * MARKETING_LANGUAGES.length,
  mismatches: mismatches.length,
  sampleMismatches: mismatches.slice(0, 20)
}, null, 2));

if (mismatches.length > 0) {
  process.exit(1);
}
