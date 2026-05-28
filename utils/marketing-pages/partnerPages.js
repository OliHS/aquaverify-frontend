import { DISTRIBUTORS_PAGE } from '../distributorsPageContent.js';
import { OEM_KITS_PAGE } from '../oemKitsContent.js';
import { MARKETING_LANGUAGES, page } from './shared.js';

export const PARTNER_MARKETING_PAGES = [
  page('oem', 'partners', 'oem', OEM_KITS_PAGE),
  page('distributors', 'partners', 'distributor', Object.fromEntries(MARKETING_LANGUAGES.map((lang) => [
    lang,
    DISTRIBUTORS_PAGE[lang]
  ])))
];
