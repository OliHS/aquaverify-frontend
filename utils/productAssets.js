const PRODUCT_IMAGE_BASE = '/images/products/marketing';
const PRODUCT_DATASHEET_BASE = '/datasheets/products';

const DATASHEET_LABELS = {
  en: 'Technical datasheet',
  es: 'Ficha tecnica',
  fr: 'Fiche technique',
  it: 'Scheda tecnica',
  ca: 'Fitxa tecnica'
};

export function getProductHeroImagePath(pageId) {
  return `${PRODUCT_IMAGE_BASE}/${pageId}.svg`;
}

export function getProductDatasheetPath(pageId, lang) {
  return `${PRODUCT_DATASHEET_BASE}/${pageId}-${lang}.html`;
}

export function getProductAssetOptions(pageId, lang, altText) {
  const heroImage = getProductHeroImagePath(pageId);

  return {
    heroImage,
    heroImageAlt: altText || `AquaVerify ${pageId} product visual`,
    ogImage: heroImage,
    datasheetUrl: getProductDatasheetPath(pageId, lang),
    datasheetLabel: DATASHEET_LABELS[lang] || DATASHEET_LABELS.en
  };
}
