import { GLOSSARY_HUB_PATHS, GLOSSARY_TERM_ROUTE_PATHS } from './glossaryRoutes.js';

export const MARKETING_ROUTE_LANGUAGES = ['en', 'es', 'fr', 'it', 'ca'];

const PRODUCT_LANGUAGE_BASE = {
  en: '/products',
  es: '/es/productos',
  fr: '/fr/produits',
  it: '/it/prodotti',
  ca: '/ca/productes'
};

const PRODUCT_DETAIL_SLUGS = [
  'enumera-soma100',
  'enumera-coli100',
  'enumera-entero100',
  'soma-bottle-100',
  'coli-bottle-100',
  'entero-bottle-100',
  'enumera-sealer',
  'enumera-mould',
  'enumera-comparator',
  'enumera-reader',
  'enumera-tray',
  'enumera-mat',
  'indica-soma',
  'indica-coli',
  'indica-entero',
  'indica-match',
  'plaque-soma-1ml',
  'plaque-soma-100ml',
  'epa-soma',
  'epa-f-plus',
  'msa-semi-solido',
  'msa-plate',
  'msb',
  'msa',
  'soma-control-1ml',
  'soma-control-100ml',
  'wr5-host-strain',
  'gr8f',
  'gr8f-ultra',
  'indica-control-100',
  'indica-control-1000'
];

function productPaths(slug) {
  return Object.fromEntries(
    MARKETING_ROUTE_LANGUAGES.map((lang) => [lang, `${PRODUCT_LANGUAGE_BASE[lang]}/${slug}`])
  );
}

export const MARKETING_ROUTE_PATHS = {
  products: { en: '/products', es: '/es/productos', fr: '/fr/produits', it: '/it/prodotti', ca: '/ca/productes' },
  enumera: { en: '/products/enumera', es: '/es/productos/enumera', fr: '/fr/produits/enumera', it: '/it/prodotti/enumera', ca: '/ca/productes/enumera' },
  indica: { en: '/products/indica', es: '/es/productos/indica', fr: '/fr/produits/indica', it: '/it/prodotti/indica', ca: '/ca/productes/indica' },
  'standard-kits': { en: '/products/standard-iso-epa-kits', es: '/es/productos/kits-iso-epa', fr: '/fr/produits/kits-iso-epa', it: '/it/prodotti/kit-iso-epa', ca: '/ca/productes/kits-iso-epa' },
  'lab-essentials': { en: '/products/lab-essentials', es: '/es/productos/lab-essentials', fr: '/fr/produits/lab-essentials', it: '/it/prodotti/lab-essentials', ca: '/ca/productes/lab-essentials' },
  platform: { en: '/platform', es: '/es/plataforma', fr: '/fr/plateforme', it: '/it/piattaforma', ca: '/ca/plataforma' },
  'saas-biotech': { en: '/saas/biotech-lims-platform', es: '/es/saas/plataforma-lims-biotech', fr: '/fr/saas/plateforme-lims-biotech', it: '/it/saas/piattaforma-lims-biotech', ca: '/ca/saas/plataforma-lims-biotech' },
  oem: { en: '/oem-water-testing-kits', es: '/es/oem-kits-analisis-agua', fr: '/fr/oem-kits-analyse-eau', it: '/it/oem-kit-analisi-acqua', ca: '/ca/oem-kits-analisi-aigua' },
  distributors: { en: '/distributors', es: '/es/distribuidores', fr: '/fr/distributeurs', it: '/it/distributori', ca: '/ca/distribuidors' },
  'industries-hub': { en: '/industries', es: '/es/industrias', fr: '/fr/industries', it: '/it/settori', ca: '/ca/sectors' },
  'water-testing-labs': { en: '/industries/water-testing-laboratories', es: '/es/industrias/laboratorios-analisis-agua', fr: '/fr/industries/laboratoires-analyse-eau', it: '/it/settori/laboratori-analisi-acqua', ca: '/ca/sectors/laboratoris-analisi-aigua' },
  'water-quality-control': { en: '/industries/water-quality-control', es: '/es/industrias/control-calidad-agua', fr: '/fr/industries/controle-qualite-eau', it: '/it/settori/controllo-qualita-acqua', ca: '/ca/sectors/control-qualitat-aigua' },
  resources: { en: '/resources', es: '/es/recursos', fr: '/fr/ressources', it: '/it/risorse', ca: '/ca/recursos' },
  'iso-10705-2': { en: '/resources/iso-10705-2-somatic-coliphages', es: '/es/recursos/iso-10705-2-colifagos-somaticos', fr: '/fr/ressources/iso-10705-2-coliphages-somatiques', it: '/it/risorse/iso-10705-2-colifagi-somatici', ca: '/ca/recursos/iso-10705-2-colifags-somatics' },
  'epa-1602': { en: '/resources/epa-1602-coliphage-testing', es: '/es/recursos/epa-1602-colifagos', fr: '/fr/ressources/epa-1602-coliphages', it: '/it/risorse/epa-1602-colifagi', ca: '/ca/recursos/epa-1602-colifags' },
  'coliphages-indicators': { en: '/resources/coliphages-water-quality-indicators', es: '/es/recursos/colifagos-indicadores-calidad-agua', fr: '/fr/ressources/coliphages-indicateurs-qualite-eau', it: '/it/risorse/colifagi-indicatori-qualita-acqua', ca: '/ca/recursos/colifags-indicadors-qualitat-aigua' },
  'presence-vs-enumeration': { en: '/resources/presence-absence-vs-enumeration', es: '/es/recursos/presencia-ausencia-vs-enumeracion', fr: '/fr/ressources/presence-absence-vs-denombrement', it: '/it/risorse/presenza-assenza-vs-enumerazione', ca: '/ca/recursos/presencia-absencia-vs-enumeracio' },
  'sample-traceability': { en: '/resources/water-sample-digital-traceability', es: '/es/recursos/trazabilidad-digital-muestras-agua', fr: '/fr/ressources/tracabilite-numerique-echantillons-eau', it: '/it/risorse/tracciabilita-digitale-campioni-acqua', ca: '/ca/recursos/tracabilitat-digital-mostres-aigua' },
  'distributor-checklist': { en: '/resources/water-testing-kit-distributor-checklist', es: '/es/recursos/checklist-distribuidores-kits-analisis-agua', fr: '/fr/ressources/checklist-distributeurs-kits-analyse-eau', it: '/it/risorse/checklist-distributori-kit-analisi-acqua', ca: '/ca/recursos/checklist-distribuidors-kits-analisi-aigua' },
  'eu-drinking-water-directive-coliphages': { en: '/resources/eu-drinking-water-directive-coliphages', es: '/es/recursos/directiva-europea-agua-potable-colifagos', fr: '/fr/ressources/directive-europeenne-eau-potable-coliphages', it: '/it/risorse/direttiva-europea-acqua-potabile-colifagi', ca: '/ca/recursos/directiva-europea-aigua-potable-colifags' },
  'water-compliance-software-guide': { en: '/resources/water-compliance-software-guide', es: '/es/recursos/software-cumplimiento-calidad-agua', fr: '/fr/ressources/logiciel-conformite-qualite-eau', it: '/it/risorse/software-conformita-qualita-acqua', ca: '/ca/recursos/software-compliment-qualitat-aigua' },
  'us-drinking-water-compliance-coliform-rule': { en: '/resources/us-drinking-water-compliance-coliform-rule', es: '/es/recursos/eeuu-cumplimiento-agua-potable-regla-coliformes', fr: '/fr/ressources/etats-unis-conformite-eau-potable-coliformes', it: '/it/risorse/stati-uniti-conformita-acqua-potabile-coliformi', ca: '/ca/recursos/estats-units-compliment-aigua-potable-coliformes' },
  'aquaverify-product-selection-guide': { en: '/resources/choose-aquaverify-product-water-microbiology', es: '/es/recursos/guia-elegir-producto-aquaverify', fr: '/fr/ressources/choisir-produit-aquaverify-microbiologie-eau', it: '/it/risorse/scegliere-prodotto-aquaverify-microbiologia-acqua', ca: '/ca/recursos/triar-producte-aquaverify-microbiologia-aigua' },
  'rd-3-2023-somatic-coliphages-guide': { en: '/resources/rd-3-2023-somatic-coliphages-water-operators', es: '/es/recursos/rd-3-2023-colifagos-somaticos', fr: '/fr/ressources/rd-3-2023-coliphages-somatiques-operateurs-eau', it: '/it/risorse/rd-3-2023-colifagi-somatici-operatori-acqua', ca: '/ca/recursos/rd-3-2023-colifags-somatics-operadors-aigua' },
  'iso-17025-water-laboratories-guide': { en: '/resources/iso-17025-water-laboratories-chain-of-custody-coa', es: '/es/recursos/iso-17025-laboratorios-analisis-agua', fr: '/fr/ressources/iso-17025-laboratoires-eau-chaine-custodie-coa', it: '/it/risorse/iso-17025-laboratori-acqua-catena-custodia-coa', ca: '/ca/recursos/iso-17025-laboratoris-aigua-cadena-custodia-coa' },
  'water-safety-plans-traceable-control': { en: '/resources/water-safety-plans-traceable-control-program', es: '/es/recursos/water-safety-plans-calidad-agua', fr: '/fr/ressources/water-safety-plans-programme-controle-tracable', it: '/it/risorse/water-safety-plans-programma-controllo-tracciabile', ca: '/ca/recursos/water-safety-plans-programa-control-tracable' },
  'food-beverage-water-microbiology-guide': { en: '/resources/food-beverage-water-microbiological-control-cip-audit', es: '/es/recursos/agua-industria-alimentaria-rd-3-2023', fr: '/fr/ressources/eau-alimentation-boissons-controle-microbiologique-cip-audit', it: '/it/risorse/acqua-alimenti-bevande-controllo-microbiologico-cip-audit', ca: '/ca/recursos/aigua-alimentacio-begudes-control-microbiologic-cip-auditoria' },
  'legionella-facility-water-risk-guide': { en: '/resources/legionella-water-risk-management-facilities', es: '/es/recursos/legionella-gestion-riesgo-instalaciones', fr: '/fr/ressources/legionella-gestion-risque-eau-installations', it: '/it/risorse/legionella-gestione-rischio-acqua-strutture', ca: '/ca/recursos/legionella-gestio-risc-aigua-instalacions' },
  'iso-19458-water-microbiological-sampling': { en: '/resources/iso-19458-water-microbiological-sampling', es: '/es/recursos/iso-19458-muestreo-microbiologico-agua', fr: '/fr/ressources/iso-19458-echantillonnage-microbiologique-eau', it: '/it/risorse/iso-19458-campionamento-microbiologico-acqua', ca: '/ca/recursos/iso-19458-mostreig-microbiologic-aigua' },
  'excel-to-lims-water-analysis': { en: '/resources/excel-to-lims-water-analysis', es: '/es/recursos/excel-a-lims-analisis-agua', fr: '/fr/ressources/excel-vers-lims-analyse-eau', it: '/it/risorse/da-excel-a-lims-analisi-acqua', ca: '/ca/recursos/excel-a-lims-analisi-aigua' },
  'oem-white-label-water-testing-kits': { en: '/resources/oem-white-label-water-testing-kits', es: '/es/recursos/oem-kits-analisis-agua-marca-blanca', fr: '/fr/ressources/oem-marque-blanche-kits-analyse-eau', it: '/it/risorse/oem-white-label-kit-analisi-acqua', ca: '/ca/recursos/oem-marca-blanca-kits-analisi-aigua' },
  about: { en: '/about', es: '/es/sobre-nosotros', fr: '/fr/a-propos', it: '/it/chi-siamo', ca: '/ca/sobre-nosaltres' },
  contact: { en: '/contact', es: '/es/contacto', fr: '/fr/contact', it: '/it/contatto', ca: '/ca/contacte' },
  'municipal-water-testing': { en: '/industries/municipal-water-testing', es: '/es/industrias/analisis-agua-municipal', fr: '/fr/industries/analyse-eau-municipale', it: '/it/settori/analisi-acqua-municipale', ca: '/ca/sectors/analisi-aigua-municipal' },
  'food-beverage-water-quality': { en: '/industries/food-beverage-water-quality', es: '/es/industrias/calidad-agua-alimentacion-bebidas', fr: '/fr/industries/qualite-eau-agroalimentaire', it: '/it/settori/qualita-acqua-alimenti-bevande', ca: '/ca/sectors/qualitat-aigua-alimentacio-begudes' },
  'industrial-process-water': { en: '/industries/industrial-process-water', es: '/es/industrias/agua-proceso-industrial', fr: '/fr/industries/eau-process-industriel', it: '/it/settori/acqua-processo-industriale', ca: '/ca/sectors/aigua-proces-industrial' },
  'agriculture-water': { en: '/industries/agriculture-water-management', es: '/es/industrias/agricultura', fr: '/fr/industries/eau-agriculture', it: '/it/settori/acqua-agricoltura', ca: '/ca/sectors/aigua-agricultura' },
  'pharma-cosmetics-water': { en: '/industries/pharmaceutical-cosmetics-water-quality', es: '/es/industrias/industria-farmaceutica-cosmetica', fr: '/fr/industries/qualite-eau-industrie-pharmaceutique-cosmetique', it: '/it/settori/qualita-acqua-industria-farmaceutica-cosmetica', ca: '/ca/sectors/qualitat-aigua-industria-farmaceutica-cosmetica' },
  'hospitality-tourism-water': { en: '/industries/hospitality-tourism-leisure-water-quality', es: '/es/industrias/hosteleria-turismo-ocio', fr: '/fr/industries/eau-hotellerie-tourisme-loisirs', it: '/it/settori/acqua-ospitalita-turismo-tempo-libero', ca: '/ca/sectors/aigua-hostaleria-turisme-oci' },
  'facility-water-risk': { en: '/industries/facility-water-risk-management', es: '/es/industrias/gestion-riesgo-agua-instalaciones', fr: '/fr/industries/gestion-risque-eau-batiments', it: '/it/settori/gestione-rischio-acqua-strutture', ca: '/ca/sectors/gestio-risc-aigua-installacions' },
  glossary: GLOSSARY_HUB_PATHS,
  ...GLOSSARY_TERM_ROUTE_PATHS,
  ...Object.fromEntries(PRODUCT_DETAIL_SLUGS.map((slug) => [slug, productPaths(slug)]))
};

export function normalizeMarketingPath(pathname) {
  const normalized = String(pathname || '').split('?')[0].split('#')[0].replace(/\/+$/, '');
  return normalized || '/';
}

function pathMatchesAny(translations, patterns) {
  return MARKETING_ROUTE_LANGUAGES.some((lang) => {
    const path = translations?.[lang] || '';
    return patterns.some((pattern) => pattern.test(path));
  });
}

function getMarketingRouteFamily(id, translations) {
  if (id === 'glossary' || Object.prototype.hasOwnProperty.call(GLOSSARY_TERM_ROUTE_PATHS, id)) {
    return 'glossary';
  }

  if (
    pathMatchesAny(translations, [
      /^\/products(?:\/|$)/,
      /^\/es\/productos(?:\/|$)/,
      /^\/fr\/produits(?:\/|$)/,
      /^\/it\/prodotti(?:\/|$)/,
      /^\/ca\/productes(?:\/|$)/
    ])
  ) {
    return 'products';
  }

  if (
    pathMatchesAny(translations, [
      /^\/resources(?:\/|$)/,
      /^\/es\/recursos(?:\/|$)/,
      /^\/fr\/ressources(?:\/|$)/,
      /^\/it\/risorse(?:\/|$)/,
      /^\/ca\/recursos(?:\/|$)/
    ])
  ) {
    return 'resources';
  }

  if (
    pathMatchesAny(translations, [
      /^\/industries(?:\/|$)/,
      /^\/es\/industrias(?:\/|$)/,
      /^\/fr\/industries(?:\/|$)/,
      /^\/it\/settori(?:\/|$)/,
      /^\/ca\/sectors(?:\/|$)/
    ])
  ) {
    return 'industries';
  }

  if (id === 'platform' || id === 'saas-biotech') {
    return 'platform';
  }

  if (id === 'distributors' || id === 'oem') {
    return 'partners';
  }

  if (id === 'about' || id === 'contact') {
    return 'company';
  }

  return 'marketing';
}

function getMarketingRouteCategory(id, translations) {
  const family = getMarketingRouteFamily(id, translations);

  if (family === 'products' && PRODUCT_DETAIL_SLUGS.includes(id)) {
    return 'product-detail';
  }

  if (family === 'resources' && id !== 'resources') {
    return 'resource-detail';
  }

  if (family === 'glossary' && id !== 'glossary') {
    return 'glossary-term';
  }

  if (family === 'industries' && id !== 'industries-hub') {
    return 'industry-detail';
  }

  return family;
}

function getProductDetailParentId(id) {
  if (!PRODUCT_DETAIL_SLUGS.includes(id)) {
    return null;
  }

  if (id.startsWith('enumera-') || ['soma-bottle-100', 'coli-bottle-100', 'entero-bottle-100'].includes(id)) {
    return 'enumera';
  }

  if (id.startsWith('indica-')) {
    return 'indica';
  }

  if (id.startsWith('plaque-') || id.startsWith('epa-')) {
    return 'standard-kits';
  }

  return 'lab-essentials';
}

function getMarketingRouteParentId(id, family, category) {
  if (category === 'product-detail') {
    return getProductDetailParentId(id);
  }

  if (id === 'enumera' || id === 'indica' || id === 'standard-kits' || id === 'lab-essentials') {
    return 'products';
  }

  if (category === 'resource-detail') {
    return 'resources';
  }

  if (category === 'glossary-term') {
    return 'glossary';
  }

  if (category === 'industry-detail') {
    return 'industries-hub';
  }

  if (id === 'saas-biotech') {
    return 'platform';
  }

  if (family === 'partners') {
    return null;
  }

  return null;
}

function buildMarketingRouteMeta(id, translations) {
  const family = getMarketingRouteFamily(id, translations);
  const category = getMarketingRouteCategory(id, translations);

  return {
    id,
    pageId: id,
    category,
    family,
    parentId: getMarketingRouteParentId(id, family, category)
  };
}

export const MARKETING_ROUTE_INDEX = Object.entries(MARKETING_ROUTE_PATHS).flatMap(([id, translations]) => {
  const meta = buildMarketingRouteMeta(id, translations);

  return MARKETING_ROUTE_LANGUAGES.map((language) => ({
    ...meta,
    language,
    lang: language,
    path: translations[language]
  })).filter((route) => Boolean(route.path));
});

export function getMarketingPagePath(id, lang = 'en') {
  const paths = MARKETING_ROUTE_PATHS[id];
  return paths?.[lang] || paths?.en || '/';
}

export function findMarketingRouteByPath(pathname) {
  const path = normalizeMarketingPath(pathname);
  const route = MARKETING_ROUTE_INDEX.find((item) => normalizeMarketingPath(item.path) === path);

  if (route) {
    return {
      id: route.id,
      pageId: route.pageId,
      lang: route.lang,
      language: route.language,
      path: route.path,
      translations: MARKETING_ROUTE_PATHS[route.id],
      category: route.category,
      family: route.family,
      parentId: route.parentId
    };
  }

  return null;
}
