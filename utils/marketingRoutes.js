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
  'private-label-kits': { en: '/oem/private-label-water-testing-kits', es: '/es/oem/kits-analisis-agua-marca-blanca', fr: '/fr/oem/kits-analyse-eau-marque-blanche', it: '/it/oem/kit-analisi-acqua-marca-privata', ca: '/ca/oem/kits-analisi-aigua-marca-blanca' },
  distributors: { en: '/distributors', es: '/es/distribuidores', fr: '/fr/distributeurs', it: '/it/distributori', ca: '/ca/distribuidors' },
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
  about: { en: '/about', es: '/es/sobre-nosotros', fr: '/fr/a-propos', it: '/it/chi-siamo', ca: '/ca/sobre-nosaltres' },
  contact: { en: '/contact', es: '/es/contacto', fr: '/fr/contact', it: '/it/contatto', ca: '/ca/contacte' },
  'municipal-water-testing': { en: '/industries/municipal-water-testing', es: '/es/industrias/analisis-agua-municipal', fr: '/fr/industries/analyse-eau-municipale', it: '/it/settori/analisi-acqua-municipale', ca: '/ca/sectors/analisi-aigua-municipal' },
  'food-beverage-water-quality': { en: '/industries/food-beverage-water-quality', es: '/es/industrias/calidad-agua-alimentacion-bebidas', fr: '/fr/industries/qualite-eau-agroalimentaire', it: '/it/settori/qualita-acqua-alimenti-bevande', ca: '/ca/sectors/qualitat-aigua-alimentacio-begudes' },
  'industrial-process-water': { en: '/industries/industrial-process-water', es: '/es/industrias/agua-proceso-industrial', fr: '/fr/industries/eau-process-industriel', it: '/it/settori/acqua-processo-industriale', ca: '/ca/sectors/aigua-proces-industrial' },
  'agriculture-water': { en: '/industries/agriculture-water-management', es: '/es/industrias/agricultura', fr: '/fr/industries/eau-agriculture', it: '/it/settori/acqua-agricoltura', ca: '/ca/sectors/aigua-agricultura' },
  'pharma-cosmetics-water': { en: '/industries/pharmaceutical-cosmetics-water-quality', es: '/es/industrias/industria-farmaceutica-cosmetica', fr: '/fr/industries/qualite-eau-industrie-pharmaceutique-cosmetique', it: '/it/settori/qualita-acqua-industria-farmaceutica-cosmetica', ca: '/ca/sectors/qualitat-aigua-industria-farmaceutica-cosmetica' },
  'facility-water-risk': { en: '/industries/facility-water-risk-management', es: '/es/industrias/gestion-riesgo-agua-instalaciones', fr: '/fr/industries/gestion-risque-eau-batiments', it: '/it/settori/gestione-rischio-acqua-strutture', ca: '/ca/sectors/gestio-risc-aigua-installacions' },
  ...Object.fromEntries(PRODUCT_DETAIL_SLUGS.map((slug) => [slug, productPaths(slug)]))
};

export function normalizeMarketingPath(pathname) {
  const normalized = String(pathname || '').split('?')[0].split('#')[0].replace(/\/+$/, '');
  return normalized || '/';
}

export function getMarketingPagePath(id, lang = 'en') {
  const paths = MARKETING_ROUTE_PATHS[id];
  return paths?.[lang] || paths?.en || '/';
}

export function findMarketingRouteByPath(pathname) {
  const path = normalizeMarketingPath(pathname);

  for (const [id, translations] of Object.entries(MARKETING_ROUTE_PATHS)) {
    for (const lang of MARKETING_ROUTE_LANGUAGES) {
      if (normalizeMarketingPath(translations[lang]) === path) {
        return { id, lang, translations };
      }
    }
  }

  return null;
}
