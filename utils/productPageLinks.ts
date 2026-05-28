import type { Language } from './translations';
import { getMarketingPagePath } from './marketingRoutes.js';

type ProductLike = {
  id?: string;
  name?: string;
};

const PRODUCT_ALIASES: Array<{ pageId: string; aliases: string[] }> = [
  { pageId: 'enumera-soma100', aliases: ['enumera soma100', 'enumera soma 100', 'soma100'] },
  { pageId: 'enumera-coli100', aliases: ['enumera coli100', 'enumera coli 100', 'coli100'] },
  { pageId: 'enumera-entero100', aliases: ['enumera entero100', 'enumera entero 100', 'entero100'] },
  { pageId: 'soma-bottle-100', aliases: ['soma bottle 100', 'soma bottle'] },
  { pageId: 'coli-bottle-100', aliases: ['coli bottle 100', 'coli bottle'] },
  { pageId: 'entero-bottle-100', aliases: ['entero bottle 100', 'entero bottle'] },
  { pageId: 'enumera-sealer', aliases: ['enumera sealer', 'sealer'] },
  { pageId: 'enumera-mould', aliases: ['enumera mould', 'enumera mold', 'mould', 'mold'] },
  { pageId: 'enumera-comparator', aliases: ['enumera comparator', 'comparator'] },
  { pageId: 'enumera-reader', aliases: ['enumera reader', 'reader'] },
  { pageId: 'enumera-tray', aliases: ['enumera tray', 'tray'] },
  { pageId: 'enumera-mat', aliases: ['enumera mat', 'mat'] },
  { pageId: 'indica-soma', aliases: ['indica soma'] },
  { pageId: 'indica-coli', aliases: ['indica coli'] },
  { pageId: 'indica-entero', aliases: ['indica entero'] },
  { pageId: 'indica-match', aliases: ['indica match', 'match'] },
  { pageId: 'plaque-soma-1ml', aliases: ['plaque soma 1ml', 'plaque soma 1 ml'] },
  { pageId: 'plaque-soma-100ml', aliases: ['plaque soma 100ml', 'plaque soma 100 ml'] },
  { pageId: 'epa-soma', aliases: ['epa soma'] },
  { pageId: 'epa-f-plus', aliases: ['epa f plus', 'epa f+', 'f plus'] },
  { pageId: 'msa-semi-solido', aliases: ['msa semi solido', 'msa semi solid', 'msa semi-solido', 'msa semi-solid'] },
  { pageId: 'msa-plate', aliases: ['msa plate'] },
  { pageId: 'msb', aliases: ['msb'] },
  { pageId: 'msa', aliases: ['msa'] },
  { pageId: 'soma-control-1ml', aliases: ['soma control 1ml', 'soma control 1 ml'] },
  { pageId: 'soma-control-100ml', aliases: ['soma control 100ml', 'soma control 100 ml'] },
  { pageId: 'wr5-host-strain', aliases: ['wr5 host strain', 'wr5'] },
  { pageId: 'gr8f-ultra', aliases: ['gr8f ultra'] },
  { pageId: 'gr8f', aliases: ['gr8f'] },
  { pageId: 'indica-control-1000', aliases: ['indica control 1000'] },
  { pageId: 'indica-control-100', aliases: ['indica control 100'] }
];

function normalize(value: string | undefined) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[®™]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .toLowerCase();
}

export function getProductPageId(product: ProductLike) {
  const raw = normalize(`${product.id || ''} ${product.name || ''}`);
  if (!raw) return '';

  const direct = PRODUCT_ALIASES.find((item) => raw.includes(normalize(item.pageId)));
  if (direct) return direct.pageId;

  const byAlias = PRODUCT_ALIASES.find((item) => item.aliases.some((alias) => raw.includes(normalize(alias))));
  return byAlias?.pageId || '';
}

export function getProductPagePath(product: ProductLike, lang: Language) {
  const pageId = getProductPageId(product);
  return pageId ? getMarketingPagePath(pageId, lang) : '';
}

export function getProductFamilyPagePath(familyId: string | undefined, familyTitle: string | undefined, lang: Language) {
  const raw = normalize(`${familyId || ''} ${familyTitle || ''}`);

  if (raw.includes('enumera')) return getMarketingPagePath('enumera', lang);
  if (raw.includes('indica')) return getMarketingPagePath('indica', lang);
  if (raw.includes('iso') || raw.includes('epa') || raw.includes('plaque')) return getMarketingPagePath('standard-kits', lang);
  if (raw.includes('lab') || raw.includes('media') || raw.includes('essential') || raw.includes('control') || raw.includes('strain')) {
    return getMarketingPagePath('lab-essentials', lang);
  }

  return getMarketingPagePath('products', lang);
}
