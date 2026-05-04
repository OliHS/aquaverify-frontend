import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  MARKETING_LANGUAGES,
  MARKETING_PAGES
} from '../utils/marketingPages.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

function hasValue(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function localAssetExists(value) {
  if (!hasValue(value)) return false;
  if (/^https?:\/\//i.test(value)) return true;
  if (!value.startsWith('/')) return false;
  return fs.existsSync(path.join(repoRoot, 'public', value));
}

const platformRows = MARKETING_PAGES
  .filter((page) => page.category === 'platform')
  .flatMap((page) =>
    MARKETING_LANGUAGES.map((language) => {
      const content = page.translations[language];
      const gallery = Array.isArray(content.gallery) ? content.gallery : [];
      return {
        pageId: page.id,
        language,
        path: content.path,
        heroImage: content.heroImage || '',
        galleryCount: gallery.length,
        missingFiles: [
          !localAssetExists(content.heroImage) ? content.heroImage : '',
          ...gallery.map((item) => (!localAssetExists(item.src) ? item.src : ''))
        ].filter(Boolean)
      };
    })
  );

const incomplete = platformRows.filter((row) =>
  !hasValue(row.heroImage) ||
  row.galleryCount < 4 ||
  row.missingFiles.length > 0
);

console.log(JSON.stringify({
  ok: incomplete.length === 0,
  platformUrls: platformRows.length,
  urlsWithHero: platformRows.filter((row) => hasValue(row.heroImage)).length,
  minGalleryCount: Math.min(...platformRows.map((row) => row.galleryCount)),
  incomplete: incomplete.length,
  sampleIncomplete: incomplete.slice(0, 20)
}, null, 2));

if (incomplete.length > 0) {
  process.exit(1);
}
