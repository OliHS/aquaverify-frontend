export const GLOSSARY_REVIEW_DATE = '2026-06-18';

export const PROMOTED_GLOSSARY_TERM_IDS = [
  'haccp',
  'iso-11731',
  'iso-22000',
  'iso-5667-1',
  'royal-decree-742-2013',
  '21-cfr-part-11',
  'alcoa-plus',
  'gxp',
  'aerosolization',
  'hydroponics',
  'packhouse',
  'turbidity',
  'uv-disinfection',
  'capa',
  'document-control'
];

export const GLOSSARY_STABLE_ID_OVERRIDES_BY_LEGACY_ID = {
  21: 'directive-eu-2020-2184',
  65: 'alcoa-plus',
  98: 'domestic-hot-water',
  112: 'uv-disinfection'
};

export const GLOSSARY_RETIRED_LEGACY_TERM_CANONICAL_IDS = {
  40: 'water-safety-plan'
};

export const GLOSSARY_TERM_ID_ALIASES = {
  'directiva-ue-2020-2184': 'directive-eu-2020-2184',
  'dhw-domestic-hot-water': 'domestic-hot-water',
  'uv-ultraviolet-disinfection': 'uv-disinfection',
  alcoa: 'alcoa-plus',
  'alcoa+': 'alcoa-plus',
  'water-safety-plan-2': 'water-safety-plan',
  'client-portal': 'customer-portal',
  'ufp-pfu': 'pfu-plaque-forming-units'
};

export const INDUSTRY_IDS = [
  'industries-hub',
  'water-testing-labs',
  'water-quality-control',
  'municipal-water-testing',
  'food-beverage-water-quality',
  'industrial-process-water',
  'facility-water-risk',
  'agriculture-water',
  'pharma-cosmetics-water',
  'hospitality-tourism-water'
];

export const GLOSSARY_INDUSTRY_TERM_IDS = {
  'industries-hub': [
    'indicator-microorganism',
    'matrix',
    'sampling-point',
    'analytical-traceability',
    'coa-certificate-of-analysis',
    'deviation',
    'water-safety-plan',
    'aquaverify-cloud'
  ],
  'water-testing-labs': [
    'iso-iec-17025',
    'iso-19458',
    'lims',
    'audit-trail',
    'digital-chain-of-custody',
    'coa-certificate-of-analysis',
    'method-validation',
    'method-verification',
    'internal-quality-control',
    'limit-of-detection-lod',
    'pfu-plaque-forming-units'
  ],
  'water-quality-control': [
    'indicator-microorganism',
    'fecal-contamination',
    'somatic-coliphages',
    'escherichia-coli-e-coli',
    'intestinal-enterococci',
    'matrix',
    'sampling-point',
    'deviation',
    'water-safety-plan',
    'analytical-traceability'
  ],
  'municipal-water-testing': [
    'drinking-water',
    'raw-water',
    'royal-decree-3-2023',
    'directive-eu-2020-2184',
    'water-safety-plan',
    'somatic-coliphages',
    'escherichia-coli-e-coli',
    'total-coliforms',
    'iso-19458',
    'iso-9308'
  ],
  'food-beverage-water-quality': [
    'process-water',
    'cip',
    'haccp',
    'iso-22000',
    'escherichia-coli-e-coli',
    'total-coliforms',
    'sampling-point',
    'coa-certificate-of-analysis',
    'kit-lot',
    'deviation'
  ],
  'industrial-process-water': [
    'process-water',
    'biofilm',
    'cip',
    'reclaimed-water',
    'wastewater',
    'chlorination',
    'uv-disinfection',
    'turbidity',
    'terminal-point',
    'iso-5667-1',
    'deviation'
  ],
  'facility-water-risk': [
    'legionella',
    'domestic-hot-water',
    'aerosolization',
    'terminal-point',
    'biofilm',
    'royal-decree-487-2022',
    'iso-11731',
    'iso-19458',
    'water-safety-plan',
    'deviation'
  ],
  'agriculture-water': [
    'agricultural-irrigation',
    'reclaimed-water',
    'hydroponics',
    'packhouse',
    'regulation-eu-2020-741',
    'iso-5667-1',
    'fecal-contamination',
    'escherichia-coli-e-coli',
    'sampling-point',
    'microbial-source-tracking-mst'
  ],
  'pharma-cosmetics-water': [
    'purified-water',
    'water-for-injection-wfi',
    'gxp',
    'alcoa-plus',
    '21-cfr-part-11',
    'audit-trail',
    'electronic-signature',
    'capa',
    'deviation',
    'coa-certificate-of-analysis',
    'document-control',
    'method-validation'
  ],
  'hospitality-tourism-water': [
    'legionella',
    'domestic-hot-water',
    'aerosolization',
    'royal-decree-487-2022',
    'royal-decree-742-2013',
    'iso-11731',
    'iso-19458',
    'terminal-point',
    'biofilm',
    'escherichia-coli-e-coli',
    'intestinal-enterococci'
  ]
};

export const GLOSSARY_RELATED_TERM_IDS = {
  legionella: [
    'domestic-hot-water',
    'aerosolization',
    'biofilm',
    'terminal-point',
    'iso-11731',
    'iso-19458',
    'royal-decree-487-2022'
  ],
  lims: [
    'audit-trail',
    'digital-chain-of-custody',
    'coa-certificate-of-analysis',
    'electronic-signature',
    'worksheet',
    'analytical-traceability',
    'customer-portal'
  ],
  cip: [
    'process-water',
    'final-rinse-water',
    'biofilm',
    'deviation',
    'sampling-point',
    'coa-certificate-of-analysis'
  ],
  'escherichia-coli-e-coli': [
    'fecal-contamination',
    'total-coliforms',
    'intestinal-enterococci',
    'iso-9308',
    'sampling-point',
    'drinking-water'
  ],
  'somatic-coliphages': [
    'bacteriophage',
    'indicator-microorganism',
    'pfu-plaque-forming-units',
    'iso-10705-2',
    'directive-eu-2020-2184',
    'water-safety-plan'
  ],
  'water-safety-plan': [
    'indicator-microorganism',
    'sampling-point',
    'matrix',
    'deviation',
    'analytical-traceability',
    'drinking-water'
  ],
  'coa-certificate-of-analysis': [
    'technical-review',
    'audit-trail',
    'analytical-traceability',
    'digital-chain-of-custody',
    'lims',
    'customer-portal'
  ],
  'aquaverify-cloud': [
    'lims',
    'audit-trail',
    'digital-chain-of-custody',
    'coa-certificate-of-analysis',
    'worksheet',
    'customer-portal'
  ]
};

export const GLOSSARY_TERM_RELATIONS = {
  'somatic-coliphages': {
    relatedProductIds: ['enumera', 'indica', 'standard-kits'],
    relatedResourceIds: ['coliphages-indicators', 'eu-drinking-water-directive-coliphages', 'iso-10705-2']
  },
  'escherichia-coli-e-coli': {
    relatedProductIds: ['enumera-coli100', 'coli-bottle-100', 'indica-coli'],
    relatedResourceIds: ['us-drinking-water-compliance-coliform-rule', 'food-beverage-water-microbiology-guide']
  },
  'total-coliforms': {
    relatedProductIds: ['enumera-coli100', 'coli-bottle-100', 'indica-coli'],
    relatedResourceIds: ['us-drinking-water-compliance-coliform-rule']
  },
  'intestinal-enterococci': {
    relatedProductIds: ['enumera-entero100', 'entero-bottle-100', 'indica-entero']
  },
  legionella: {
    relatedProductIds: ['standard-kits', 'lab-essentials'],
    relatedResourceIds: ['legionella-facility-water-risk-guide']
  },
  lims: {
    relatedProductIds: ['platform'],
    relatedResourceIds: ['excel-to-lims-water-analysis', 'water-compliance-software-guide']
  },
  'aquaverify-cloud': {
    relatedProductIds: ['platform'],
    relatedResourceIds: ['water-compliance-software-guide', 'sample-traceability']
  },
  'audit-trail': {
    relatedProductIds: ['platform'],
    relatedResourceIds: ['water-compliance-software-guide', 'sample-traceability']
  },
  'digital-chain-of-custody': {
    relatedProductIds: ['platform'],
    relatedResourceIds: ['sample-traceability', 'iso-17025-water-laboratories-guide']
  },
  'coa-certificate-of-analysis': {
    relatedProductIds: ['platform'],
    relatedResourceIds: ['iso-17025-water-laboratories-guide', 'water-compliance-software-guide']
  },
  cip: {
    relatedProductIds: ['platform', 'enumera', 'indica'],
    relatedResourceIds: ['food-beverage-water-microbiology-guide']
  },
  'water-safety-plan': {
    relatedProductIds: ['platform', 'standard-kits'],
    relatedResourceIds: ['water-safety-plans-traceable-control', 'eu-drinking-water-directive-coliphages']
  },
  'iso-iec-17025': {
    relatedProductIds: ['platform', 'standard-kits', 'lab-essentials'],
    relatedResourceIds: ['iso-17025-water-laboratories-guide']
  },
  'iso-19458': {
    relatedProductIds: ['platform', 'lab-essentials'],
    relatedResourceIds: ['iso-19458-water-microbiological-sampling']
  },
  'method-validation': {
    relatedProductIds: ['platform', 'standard-kits'],
    relatedResourceIds: ['aquacoli-enumera-coli100-validation']
  },
  'method-verification': {
    relatedProductIds: ['platform', 'lab-essentials'],
    relatedResourceIds: ['iso-17025-water-laboratories-guide']
  },
  enumera: {
    relatedProductIds: ['enumera', 'enumera-soma100', 'enumera-coli100'],
    relatedResourceIds: ['aquaverify-product-selection-guide', 'presence-vs-enumeration']
  },
  indica: {
    relatedProductIds: ['indica', 'indica-soma', 'indica-coli'],
    relatedResourceIds: ['aquaverify-product-selection-guide', 'presence-vs-enumeration']
  },
  'kits-iso-epa': {
    relatedProductIds: ['standard-kits', 'plaque-soma-100ml', 'epa-soma'],
    relatedResourceIds: ['iso-10705-2', 'epa-1602']
  },
  'lab-essentials': {
    relatedProductIds: ['lab-essentials', 'msa', 'msb', 'wr5-host-strain']
  },
  'authorized-distributor': {
    relatedProductIds: ['distributors'],
    relatedResourceIds: ['distributor-checklist']
  },
  oem: {
    relatedProductIds: ['oem'],
    relatedResourceIds: ['oem-white-label-water-testing-kits']
  },
  'white-label': {
    relatedProductIds: ['oem'],
    relatedResourceIds: ['oem-white-label-water-testing-kits']
  }
};

export const GLOSSARY_SOURCE_REFS = {
  'directive-eu-2020-2184': [
    {
      title: 'Directive (EU) 2020/2184 on the quality of water intended for human consumption',
      organization: 'European Union',
      year: '2020',
      url: 'https://eur-lex.europa.eu/eli/dir/2020/2184/oj',
      jurisdiction: 'EU',
      type: 'regulation',
      reviewed: GLOSSARY_REVIEW_DATE
    }
  ],
  'regulation-eu-2020-741': [
    {
      title: 'Regulation (EU) 2020/741 on minimum requirements for water reuse',
      organization: 'European Union',
      year: '2020',
      url: 'https://eur-lex.europa.eu/eli/reg/2020/741/oj',
      jurisdiction: 'EU',
      type: 'regulation',
      reviewed: GLOSSARY_REVIEW_DATE
    }
  ],
  'royal-decree-3-2023': [
    {
      title: 'Real Decreto 3/2023',
      organization: 'BOE',
      year: '2023',
      url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2023-628',
      jurisdiction: 'ES',
      type: 'regulation',
      reviewed: GLOSSARY_REVIEW_DATE
    }
  ],
  'royal-decree-487-2022': [
    {
      title: 'Real Decreto 487/2022',
      organization: 'BOE',
      year: '2022',
      url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2022-10297',
      jurisdiction: 'ES',
      type: 'regulation',
      reviewed: GLOSSARY_REVIEW_DATE
    }
  ],
  'royal-decree-742-2013': [
    {
      title: 'Real Decreto 742/2013',
      organization: 'BOE',
      year: '2013',
      url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2013-10580',
      jurisdiction: 'ES',
      type: 'regulation',
      reviewed: GLOSSARY_REVIEW_DATE
    }
  ],
  'iso-11731': [
    {
      title: 'ISO 11731:2017 Water quality - Enumeration of Legionella',
      organization: 'ISO',
      year: '2017',
      url: 'https://www.iso.org/standard/61782.html',
      jurisdiction: 'International',
      type: 'standard',
      reviewed: GLOSSARY_REVIEW_DATE
    }
  ],
  'iso-19458': [
    {
      title: 'ISO 19458:2006 Water quality - Sampling for microbiological analysis',
      organization: 'ISO',
      year: '2006',
      url: 'https://www.iso.org/standard/33845.html',
      jurisdiction: 'International',
      type: 'standard',
      reviewed: GLOSSARY_REVIEW_DATE
    }
  ],
  'iso-5667-1': [
    {
      title: 'ISO 5667-1 Water quality - Sampling - Part 1',
      organization: 'ISO',
      year: '2023',
      url: 'https://www.iso.org/standard/72369.html',
      jurisdiction: 'International',
      type: 'standard',
      reviewed: GLOSSARY_REVIEW_DATE
    }
  ],
  'iso-22000': [
    {
      title: 'ISO 22000 Food safety management',
      organization: 'ISO',
      year: '2018',
      url: 'https://www.iso.org/standard/65464.html',
      jurisdiction: 'International',
      type: 'standard',
      reviewed: GLOSSARY_REVIEW_DATE
    }
  ],
  haccp: [
    {
      title: 'General Principles of Food Hygiene CXC 1-1969',
      organization: 'Codex Alimentarius',
      year: '2022',
      url: 'https://openknowledge.fao.org/server/api/core/bitstreams/6866dc55-d2c0-48dd-a528-a4d634f1b0b4/content',
      jurisdiction: 'International',
      type: 'guidance',
      reviewed: GLOSSARY_REVIEW_DATE
    }
  ],
  '21-cfr-part-11': [
    {
      title: '21 CFR Part 11 Electronic Records; Electronic Signatures',
      organization: 'FDA',
      year: 'current',
      url: 'https://www.ecfr.gov/current/title-21/chapter-I/subchapter-A/part-11',
      jurisdiction: 'US',
      type: 'regulation',
      reviewed: GLOSSARY_REVIEW_DATE
    }
  ],
  'water-for-injection-wfi': [
    {
      title: 'Water for pharmaceutical use',
      organization: 'European Medicines Agency',
      year: 'current',
      url: 'https://www.ema.europa.eu/en/human-regulatory-overview/research-development/scientific-guidelines/quality-guidelines/quality-water-pharmaceutical-use',
      jurisdiction: 'EU',
      type: 'guidance',
      reviewed: GLOSSARY_REVIEW_DATE
    }
  ]
};

export const SUPPLEMENTAL_GLOSSARY_TERMS = [
  {
    id: 'purified-water',
    category: 'operacion-agua',
    categoryLabel: {
      en: 'Water operations',
      es: 'Operación del agua',
      fr: 'Opérations eau',
      it: 'Operazione acqua',
      ca: 'Operació de l’aigua'
    },
    level: 'supporting',
    aliases: ['PW', 'Agua purificada'],
    relatedIndustryIds: ['pharma-cosmetics-water'],
    relatedProductIds: ['platform', 'lab-essentials'],
    relatedResourceIds: ['water-compliance-software-guide'],
    relatedTermIds: ['water-for-injection-wfi', 'method-validation', 'deviation', 'audit-trail'],
    translations: {
      en: {
        term: 'Purified water',
        slug: 'purified-water',
        definition: 'Purified water is a controlled water quality used in regulated manufacturing contexts. Its control depends on the process, specification, sampling plan and quality system.',
        application: 'Relevant for pharma and cosmetics teams that need traceable points, methods, results, deviations and release evidence.'
      },
      es: {
        term: 'Agua purificada',
        slug: 'agua-purificada',
        definition: 'El agua purificada es una calidad de agua controlada usada en contextos de fabricación regulada. Su control depende del proceso, especificación, plan de muestreo y sistema de calidad.',
        application: 'Relevante para equipos pharma y cosmética que necesitan puntos, métodos, resultados, desviaciones y evidencia de liberación trazables.'
      },
      fr: {
        term: 'Eau purifiée',
        slug: 'eau-purifiee',
        definition: 'L’eau purifiée est une qualité d’eau contrôlée utilisée en fabrication réglementée. Son contrôle dépend du procédé, de la spécification, du plan de prélèvement et du système qualité.',
        application: 'Utile pour les équipes pharma et cosmétique qui doivent relier points, méthodes, résultats, écarts et preuves de libération.'
      },
      it: {
        term: 'Acqua purificata',
        slug: 'acqua-purificata',
        definition: 'L’acqua purificata è una qualità d’acqua controllata usata in contesti produttivi regolati. Il controllo dipende da processo, specifica, piano di campionamento e sistema qualità.',
        application: 'Rilevante per team pharma e cosmetici che devono tracciare punti, metodi, risultati, deviazioni ed evidenze di rilascio.'
      },
      ca: {
        term: 'Aigua purificada',
        slug: 'aigua-purificada',
        definition: 'L’aigua purificada és una qualitat d’aigua controlada usada en contextos de fabricació regulada. El control depèn del procés, especificació, pla de mostreig i sistema de qualitat.',
        application: 'Rellevant per a equips pharma i cosmètica que necessiten punts, mètodes, resultats, desviacions i evidència d’alliberament traçables.'
      }
    }
  },
  {
    id: 'water-for-injection-wfi',
    category: 'operacion-agua',
    categoryLabel: {
      en: 'Water operations',
      es: 'Operación del agua',
      fr: 'Opérations eau',
      it: 'Operazione acqua',
      ca: 'Operació de l’aigua'
    },
    level: 'supporting',
    aliases: ['WFI', 'Water for Injection'],
    relatedIndustryIds: ['pharma-cosmetics-water'],
    relatedProductIds: ['platform'],
    relatedResourceIds: ['water-compliance-software-guide'],
    relatedTermIds: ['purified-water', 'gxp', 'alcoa-plus', 'audit-trail'],
    translations: {
      en: {
        term: 'Water for Injection (WFI)',
        slug: 'water-for-injection-wfi',
        definition: 'Water for Injection is a high-control pharmaceutical water category. Public AquaVerify content should treat WFI as a quality-system context, not as a standalone product claim.',
        application: 'Relevant when batch, method, deviation, audit-trail and quality-review evidence must remain connected.'
      },
      es: {
        term: 'Agua para inyectables (WFI)',
        slug: 'agua-para-inyectables-wfi',
        definition: 'El agua para inyectables es una categoría de agua farmacéutica de alto control. El contenido público debe tratar WFI como contexto de sistema de calidad, no como claim de producto independiente.',
        application: 'Relevante cuando lote, método, desviación, audit trail y revisión de calidad deben quedar conectados.'
      },
      fr: {
        term: 'Eau pour préparations injectables (WFI)',
        slug: 'eau-pour-preparations-injectables-wfi',
        definition: 'L’eau pour préparations injectables est une catégorie d’eau pharmaceutique très contrôlée. Le contenu public doit la traiter comme contexte qualité, non comme revendication produit autonome.',
        application: 'Pertinente lorsque lot, méthode, écart, audit trail et revue qualité doivent rester connectés.'
      },
      it: {
        term: 'Acqua per preparazioni iniettabili (WFI)',
        slug: 'acqua-per-preparazioni-iniettabili-wfi',
        definition: 'L’acqua per preparazioni iniettabili è una categoria di acqua farmaceutica ad alto controllo. Il contenuto pubblico deve trattarla come contesto qualità, non come claim prodotto autonomo.',
        application: 'Rilevante quando lotto, metodo, deviazione, audit trail e revisione qualità devono restare collegati.'
      },
      ca: {
        term: 'Aigua per a injectables (WFI)',
        slug: 'aigua-per-a-injectables-wfi',
        definition: 'L’aigua per a injectables és una categoria d’aigua farmacèutica d’alt control. El contingut públic l’ha de tractar com a context de sistema de qualitat, no com a reclam de producte autònom.',
        application: 'Rellevant quan lot, mètode, desviació, audit trail i revisió de qualitat han de quedar connectats.'
      }
    }
  },
  {
    id: 'final-rinse-water',
    category: 'operacion-agua',
    categoryLabel: {
      en: 'Water operations',
      es: 'Operación del agua',
      fr: 'Opérations eau',
      it: 'Operazione acqua',
      ca: 'Operació de l’aigua'
    },
    level: 'supporting',
    aliases: ['Final rinse'],
    relatedIndustryIds: ['food-beverage-water-quality', 'pharma-cosmetics-water'],
    relatedProductIds: ['platform', 'enumera', 'indica'],
    relatedResourceIds: ['food-beverage-water-microbiology-guide'],
    relatedTermIds: ['cip', 'process-water', 'deviation', 'sampling-point'],
    translations: {
      en: {
        term: 'Final rinse water',
        slug: 'final-rinse-water',
        definition: 'Final rinse water is water used in the last rinse step after cleaning or process contact. Its relevance depends on product contact, equipment, specification and release criteria.',
        application: 'Useful in CIP, food, beverage, pharma and cosmetics workflows where rinse evidence links cleaning, sampling and release.'
      },
      es: {
        term: 'Agua de enjuague final',
        slug: 'agua-de-enjuague-final',
        definition: 'El agua de enjuague final es el agua usada en la última etapa de aclarado tras limpieza o contacto de proceso. Su relevancia depende de contacto con producto, equipo, especificación y criterio de liberación.',
        application: 'Útil en flujos CIP, alimentación, bebidas, pharma y cosmética donde la evidencia conecta limpieza, muestreo y liberación.'
      },
      fr: {
        term: 'Eau de rinçage final',
        slug: 'eau-de-rincage-final',
        definition: 'L’eau de rinçage final est l’eau utilisée lors de la dernière étape après nettoyage ou contact procédé. Sa pertinence dépend du contact produit, de l’équipement, de la spécification et des critères de libération.',
        application: 'Utile dans les flux CIP, agroalimentaires, pharma et cosmétiques reliant nettoyage, prélèvement et libération.'
      },
      it: {
        term: 'Acqua di risciacquo finale',
        slug: 'acqua-di-risciacquo-finale',
        definition: 'L’acqua di risciacquo finale è usata nell’ultimo risciacquo dopo pulizia o contatto di processo. La rilevanza dipende da contatto prodotto, attrezzatura, specifica e criteri di rilascio.',
        application: 'Utile in flussi CIP, food, beverage, pharma e cosmetici dove l’evidenza collega pulizia, campionamento e rilascio.'
      },
      ca: {
        term: 'Aigua d’esbandida final',
        slug: 'aigua-esbandida-final',
        definition: 'L’aigua d’esbandida final és l’aigua usada en l’última etapa després de neteja o contacte de procés. La rellevància depèn del contacte amb producte, equip, especificació i criteri d’alliberament.',
        application: 'Útil en fluxos CIP, alimentació, begudes, pharma i cosmètica on l’evidència connecta neteja, mostreig i alliberament.'
      }
    }
  }
];
