import { getWhitepaperMarkdownPage } from './whitepaperMarkdownContent.js';

export const RESOURCE_HUB_WHITEPAPER_IDS = [
  'coliphages-indicators',
  'eu-drinking-water-directive-coliphages',
  'water-compliance-software-guide',
  'us-drinking-water-compliance-coliform-rule',
  'aquaverify-product-selection-guide',
  'aquacoli-enumera-coli100-validation',
  'urban-wastewater-wbe-multiviral-valencian-region',
  'viral-pollution-wastewater-mediterranean-ecosystems',
  'sars-cov-2-surrogates-decay-aquatic-environments',
  'somatic-coliphage-method-comparison-water',
  'enteric-viruses-antibiotic-resistance-genes-mussels',
  'editorial-methodology',
  'rd-3-2023-somatic-coliphages-guide',
  'iso-17025-water-laboratories-guide',
  'water-safety-plans-traceable-control',
  'food-beverage-water-microbiology-guide',
  'legionella-facility-water-risk-guide',
  'iso-19458-water-microbiological-sampling',
  'excel-to-lims-water-analysis',
  'oem-white-label-water-testing-kits'
];

const CHECKLIST_BASE_PATHS = {
  en: '/resources/checklists',
  es: '/es/recursos/checklists',
  fr: '/fr/ressources/checklists',
  it: '/it/risorse/checklists',
  ca: '/ca/recursos/checklists'
};

const CHECKLIST_FILES = {
  coliphages: {
    en: 'coliphage-analytical-program-checklist.pdf',
    es: 'checklist-colifagos-programa-analitico.pdf',
    fr: 'checklist-coliphages-programme-analytique.pdf',
    it: 'checklist-colifagi-programma-analitico.pdf',
    ca: 'checklist-colifags-programa-analitic.pdf'
  },
  directive: {
    en: 'eu-drinking-water-directive-checklist.pdf',
    es: 'checklist-rd-3-2023-directiva-ue.pdf',
    fr: 'checklist-directive-eau-potable-ue.pdf',
    it: 'checklist-direttiva-acqua-potabile-ue.pdf',
    ca: 'checklist-directiva-aigua-potable-ue.pdf'
  },
  lims: {
    en: 'lims-audit-evidence-checklist.pdf',
    es: 'checklist-lims-evidencia-auditoria.pdf',
    fr: 'checklist-lims-preuve-audit.pdf',
    it: 'checklist-lims-evidenza-audit.pdf',
    ca: 'checklist-lims-evidencia-auditoria.pdf'
  },
  partner: {
    en: 'oem-distributor-readiness-checklist.pdf',
    es: 'checklist-oem-distribuidores.pdf',
    fr: 'checklist-oem-distributeurs.pdf',
    it: 'checklist-oem-distributori.pdf',
    ca: 'checklist-oem-distribuidors.pdf'
  },
  product_selection: {
    en: 'checklist-choose-aquaverify-product-water-microbiology.pdf',
    es: 'checklist-seleccion-producto-aquaverify.pdf',
    fr: 'checklist-choisir-produit-aquaverify-microbiologie-eau.pdf',
    it: 'checklist-scegliere-prodotto-aquaverify-microbiologia-acqua.pdf',
    ca: 'checklist-triar-producte-aquaverify-microbiologia-aigua.pdf'
  },
  rd_3_2023_coliphages: {
    en: 'checklist-rd-3-2023-somatic-coliphages-water-operators.pdf',
    es: 'checklist-rd-3-2023-colifagos-somaticos.pdf',
    fr: 'checklist-rd-3-2023-coliphages-somatiques-operateurs-eau.pdf',
    it: 'checklist-rd-3-2023-colifagi-somatici-operatori-acqua.pdf',
    ca: 'checklist-rd-3-2023-colifags-somatics-operadors-aigua.pdf'
  },
  iso_17025_labs: {
    en: 'checklist-iso-17025-water-laboratories-chain-of-custody-coa.pdf',
    es: 'checklist-iso-17025-laboratorios-agua.pdf',
    fr: 'checklist-iso-17025-laboratoires-eau-chaine-custodie-coa.pdf',
    it: 'checklist-iso-17025-laboratori-acqua-catena-custodia-coa.pdf',
    ca: 'checklist-iso-17025-laboratoris-aigua-cadena-custodia-coa.pdf'
  },
  water_safety_plans: {
    en: 'checklist-water-safety-plans-traceable-control-program.pdf',
    es: 'checklist-water-safety-plan-trazable.pdf',
    fr: 'checklist-water-safety-plans-programme-controle-tracable.pdf',
    it: 'checklist-water-safety-plans-programma-controllo-tracciabile.pdf',
    ca: 'checklist-water-safety-plans-programa-control-tracable.pdf'
  },
  food_beverage_water: {
    en: 'checklist-food-beverage-water-microbiological-control-cip-audit.pdf',
    es: 'checklist-agua-industria-alimentaria.pdf',
    fr: 'checklist-eau-alimentation-boissons-controle-microbiologique-cip-audit.pdf',
    it: 'checklist-acqua-alimenti-bevande-controllo-microbiologico-cip-audit.pdf',
    ca: 'checklist-aigua-alimentacio-begudes-control-microbiologic-cip-auditoria.pdf'
  },
  legionella_facilities: {
    en: 'checklist-legionella-water-risk-management-facilities.pdf',
    es: 'checklist-legionella-instalaciones.pdf',
    fr: 'checklist-legionella-gestion-risque-eau-installations.pdf',
    it: 'checklist-legionella-gestione-rischio-acqua-strutture.pdf',
    ca: 'checklist-legionella-gestio-risc-aigua-instalacions.pdf'
  },
  iso_19458_sampling: {
    en: 'checklist-iso-19458-water-microbiological-sampling.pdf',
    es: 'checklist-iso-19458-muestreo-microbiologico-agua.pdf',
    fr: 'checklist-iso-19458-echantillonnage-microbiologique-eau.pdf',
    it: 'checklist-iso-19458-campionamento-microbiologico-acqua.pdf',
    ca: 'checklist-iso-19458-mostreig-microbiologic-aigua.pdf'
  },
  excel_to_lims: {
    en: 'checklist-excel-to-lims-water-analysis.pdf',
    es: 'checklist-excel-a-lims-analisis-agua.pdf',
    fr: 'checklist-excel-vers-lims-analyse-eau.pdf',
    it: 'checklist-da-excel-a-lims-analisi-acqua.pdf',
    ca: 'checklist-excel-a-lims-analisi-aigua.pdf'
  },
  oem_white_label: {
    en: 'checklist-oem-white-label-water-testing-kits.pdf',
    es: 'checklist-oem-marca-blanca-kits-analisis-agua.pdf',
    fr: 'checklist-oem-marque-blanche-kits-analyse-eau.pdf',
    it: 'checklist-oem-white-label-kit-analisi-acqua.pdf',
    ca: 'checklist-oem-marca-blanca-kits-analisi-aigua.pdf'
  }
};

export function getChecklistHref(lang, id) {
  const base = CHECKLIST_BASE_PATHS[lang] || CHECKLIST_BASE_PATHS.en;
  const files = CHECKLIST_FILES[id] || CHECKLIST_FILES.coliphages;
  return `${base}/${files[lang] || files.en}`;
}

export const RESOURCE_HUB_CONTENT = {
  en: {
    seoTitle: 'Water Microbiology Resources, Whitepapers and Checklists | AquaVerify',
    seoDescription: 'Explore AquaVerify whitepapers, technical guides and checklists for water microbiology, coliphages, ISO/EPA workflows, LIMS evidence, products, industries, distributors and OEM programs.',
    eyebrow: 'AquaVerify knowledge center',
    title: 'Whitepapers, guides and technical resources for water microbiology',
    titleAccent: 'technical resources',
    lead: 'A practical library for laboratories, utilities, industries, distributors and quality teams that need to understand viral indicators, coliphages, ISO/EPA methods, digital traceability, compliance and AquaVerify product selection.',
    primaryCta: 'Explore whitepapers',
    secondaryCta: 'Download checklists',
    tertiaryCta: 'Request technical recommendation',
    panelLabel: 'Technical library',
    panelTitle: 'Resources for decisions with context',
    panelBody: 'Access guides on coliphages, ISO/EPA methods, regulations, LIMS, AquaVerify products and distribution or OEM programs.',
    panelChips: ['Whitepapers', 'Checklists', 'Products', 'Industries'],
    intentEyebrow: 'Choose by objective',
    intentTitle: 'Find the right resource for your technical or commercial decision',
    intentBody: 'Filter by regulation, methods, products, platform, sectors or channel to move from research to the next step.',
    whitepapersEyebrow: 'Featured whitepapers',
    whitepapersTitle: 'Technical resources for water quality decisions',
    whitepapersBody: 'Each whitepaper includes audience, region, reading time, next steps and direct links to products, platform, sectors or channel.',
    searchPlaceholder: 'Search by topic, method, sector or product...',
    noResults: 'No resources match the current filter. Try another category or search term.',
    recommendationCta: 'Request technical recommendation',
    checklistsEyebrow: 'Downloadable checklists',
    checklistsTitle: 'Practical templates for programs, audits and technical decisions',
    checklistsBody: 'Download templates to prepare analytical programs, audits, product selection, digital traceability and distributor or OEM conversations.',
    nextTitle: 'Continue from research to action',
    sectorTitle: 'Bring each guide into the right operating context',
    productTitle: 'From technical guide to product selection',
    finalTitle: 'Turn reading into a technical recommendation',
    finalBody: 'Share your sector, matrix, control objective and traceability requirements. AquaVerify can guide product, platform, distributor or OEM selection.',
    finalPrimary: 'Request recommendation',
    finalSecondary: 'Find distributor',
    finalTertiary: 'Explore OEM program',
    filters: {
      all: 'All',
      viral: 'Viral indicators',
      compliance: 'Regulation',
      methods: 'ISO/EPA',
      software: 'Software and LIMS',
      product: 'Products',
      sector: 'Industries',
      partner: 'Distributors/OEM'
    },
    metaLabels: {
      audience: 'Audience',
      region: 'Region',
      level: 'Level',
      reading: 'Read',
      open: 'Open whitepaper',
      download: 'Download checklist',
      related: 'Related'
    },
    intents: [
      ['viral', 'Viral indicators and coliphages', 'Understand when to add somatic or F-specific coliphages to a water program and how to document results with context.'],
      ['compliance', 'Regulation and audit', 'Prepare conversations about the EU Directive, RTCR, ISO/IEC 17025 and reviewable evidence.'],
      ['methods', 'ISO/EPA methods', 'Compare reference workflows, volumes, controls, host strains and traceability requirements.'],
      ['product', 'Product and technical buying', 'Choose between ENUMERA, INDICA, ISO/EPA Kits, Lab Essentials and AquaVerify Cloud by use case.'],
      ['software', 'LIMS and CoA digitalization', 'Connect sample, method, batch, operator, result, review, report and customer portal.'],
      ['partner', 'Distribution and OEM', 'Evaluate distribution, co-branding, white label, local support and programs with a digital platform.']
    ],
    whitepapers: [
      {
        id: 'coliphages-indicators',
        label: 'Viral indicators',
        title: 'Why coliphages are the ultimate viral indicator for water quality',
        body: 'Guide to why coliphages add a practical viral-indicator layer beyond E. coli and enterococci, and how labs can connect counts, host strains, controls and review within a traceable workflow.',
        audience: 'Labs, utilities, QC, distributors',
        region: 'Global',
        level: 'Technical',
        reading: '10 min',
        tags: ['Somatic coliphages', 'F-specific', 'ISO/EPA', 'Cloud'],
        categories: ['viral', 'methods', 'software', 'product'],
        search: 'coliphages somatic F-specific viral indicators ISO EPA cloud E coli enterococci labs utilities'
      },
      {
        id: 'eu-drinking-water-directive-coliphages',
        label: 'EU Directive',
        title: 'European Drinking Water Directive and somatic coliphages',
        body: 'Resource for laboratories, operators and distributors translating risk-based monitoring into sampling plans, method readiness, treatment evidence and technical reporting.',
        audience: 'Utilities, municipalities, labs',
        region: 'EU / Spain',
        level: 'Regulatory',
        reading: '8 min',
        tags: ['EU Directive', 'RD 3/2023', 'Raw water', 'EN ISO 10705'],
        categories: ['viral', 'compliance', 'methods', 'sector'],
        search: 'EU Drinking Water Directive RD 3/2023 somatic coliphages raw water EN ISO 10705 utilities municipalities'
      },
      {
        id: 'water-compliance-software-guide',
        label: 'Digital evidence',
        title: 'Software evidence layer for water quality compliance',
        body: 'Guide to when software helps organize samples, methods, batches, audit trails, technical review, CoA, customer portal and commercial follow-up without replacing validation or regulatory judgment.',
        audience: 'Labs, QA/QC, distributors, biotech',
        region: 'Global',
        level: 'Operational',
        reading: '9 min',
        tags: ['LIMS', 'CoA', 'Audit trail', 'AquaVerify Cloud'],
        categories: ['software', 'compliance', 'product'],
        search: 'LIMS CoA audit trail sample traceability customer portal AquaVerify Cloud compliance software'
      },
      {
        id: 'us-drinking-water-compliance-coliform-rule',
        label: 'US EPA / RTCR',
        title: 'US drinking water compliance: coliform rules and coliphage context',
        body: 'Whitepaper separating RTCR, total coliforms, E. coli and EPA coliphage method context for product, platform or distribution conversations in the US market.',
        audience: 'US utilities, labs, distributors',
        region: 'United States',
        level: 'Regulatory',
        reading: '8 min',
        tags: ['RTCR', 'EPA 1601/1602', 'Ground Water Rule', 'Coliphages'],
        categories: ['compliance', 'methods', 'viral', 'partner'],
        search: 'US EPA RTCR Total Coliform Rule Method 1601 1602 Ground Water Rule coliphages'
      },
      {
        id: 'aquaverify-product-selection-guide',
        label: 'Product selection',
        title: 'How to choose the right AquaVerify product for microbiological water analysis',
        body: 'Decision guide for choosing ENUMERA, INDICA, ISO/EPA Kits, Lab Essentials or AquaVerify Cloud by analytical objective, matrix, urgency and traceability needs.',
        audience: 'Labs, QC, utilities, distributors, OEM',
        region: 'Global',
        level: 'Technical',
        reading: '14 min',
        tags: ['ENUMERA', 'INDICA', 'ISO/EPA', 'Cloud'],
        categories: ['product', 'methods', 'software', 'partner'],
        search: 'choose AquaVerify product ENUMERA INDICA ISO EPA kits Lab Essentials Cloud matrix traceability'
      },
      {
        id: 'rd-3-2023-somatic-coliphages-guide',
        label: 'RD 3/2023',
        title: 'RD 3/2023 and somatic coliphages for laboratories and water operators',
        body: 'Practical guide for translating Spanish drinking-water context into sampling plans, treatment evidence, somatic coliphage workflows and traceable reporting.',
        audience: 'Utilities, laboratories, operators',
        region: 'Spain / EU',
        level: 'Regulatory',
        reading: '13 min',
        tags: ['RD 3/2023', 'Somatic coliphages', 'ISO 10705-2', 'Sampling'],
        categories: ['compliance', 'viral', 'methods', 'sector'],
        search: 'RD 3/2023 somatic coliphages Spanish drinking water laboratories operators sampling treatment evidence'
      },
      {
        id: 'iso-17025-water-laboratories-guide',
        label: 'ISO 17025',
        title: 'ISO/IEC 17025 in water laboratories: chain of custody, CoA and digital traceability',
        body: 'Guide for structuring sample reception, chain of custody, technical review, CoA, audit trail and AquaVerify Cloud evidence in water laboratories.',
        audience: 'Water laboratories, QA, technical managers',
        region: 'Global',
        level: 'Quality system',
        reading: '12 min',
        tags: ['ISO/IEC 17025', 'CoA', 'Chain of custody', 'LIMS'],
        categories: ['compliance', 'software', 'methods', 'sector'],
        search: 'ISO 17025 water laboratory chain custody CoA audit trail LIMS AquaVerify Cloud'
      },
      {
        id: 'water-safety-plans-traceable-control',
        label: 'Water Safety Plans',
        title: 'Water Safety Plans: from water risk to traceable control program',
        body: 'Framework for converting hazards, control points, monitoring, corrective actions and review into a traceable water-quality control program.',
        audience: 'Utilities, facilities, industry, QA',
        region: 'Global',
        level: 'Operational',
        reading: '12 min',
        tags: ['Water Safety Plans', 'Risk control', 'Monitoring', 'Traceability'],
        categories: ['compliance', 'software', 'sector', 'methods'],
        search: 'Water Safety Plans risk control monitoring corrective actions traceable water quality program'
      },
      {
        id: 'food-beverage-water-microbiology-guide',
        label: 'Food & beverage',
        title: 'Water in food and beverage: microbiological control, lot, CIP and audit evidence',
        body: 'Guide for connecting process water, ingredient water, rinsing, CIP, batch context, microbial results and audit evidence in food and beverage operations.',
        audience: 'Food QA, production, laboratories',
        region: 'Global',
        level: 'Operational',
        reading: '12 min',
        tags: ['Food & beverage', 'CIP', 'Batch', 'Audit evidence'],
        categories: ['sector', 'compliance', 'product', 'software'],
        search: 'food beverage water microbiology CIP batch lot audit evidence HACCP QA process water'
      },
      {
        id: 'legionella-facility-water-risk-guide',
        label: 'Legionella',
        title: 'Facility water risk management: Legionella, terminal points and traceability',
        body: 'Guide for facilities that need recurring water-risk control, point history, actions, supplier coordination and traceable evidence around Legionella-oriented programs.',
        audience: 'Facilities, hospitality, healthcare, QA',
        region: 'Global',
        level: 'Operational',
        reading: '12 min',
        tags: ['Legionella', 'Facilities', 'Terminal points', 'Actions'],
        categories: ['sector', 'compliance', 'product', 'software'],
        search: 'Legionella facility water risk terminal points buildings hotels healthcare traceability actions'
      },
      {
        id: 'iso-19458-water-microbiological-sampling',
        label: 'ISO 19458',
        title: 'ISO 19458 and microbiological water sampling: planning, collection and transport with traceability',
        body: 'Guide for controlling sampling objectives, points, containers, preservation, transport, chain of custody and digital evidence before microbiological analysis begins.',
        audience: 'Labs, utilities, sampling teams, QA/QC',
        region: 'Global / EU',
        level: 'Technical',
        reading: '13 min',
        tags: ['ISO 19458', 'Sampling', 'Chain of custody', 'Cloud'],
        categories: ['methods', 'compliance', 'software', 'sector'],
        search: 'ISO 19458 microbiological water sampling planning collection transport preservation chain custody digital traceability'
      },
      {
        id: 'excel-to-lims-water-analysis',
        label: 'Excel to LIMS',
        title: 'From Excel to LIMS: digitizing water samples, results and reports',
        body: 'Practical migration guide for moving from spreadsheets and email to a traceable LIMS, CoA, customer portal, inventory and operational workflow.',
        audience: 'Labs, QA/QC, distributors, utilities',
        region: 'Global',
        level: 'Operational',
        reading: '14 min',
        tags: ['LIMS', 'CoA', 'Migration', 'Portal'],
        categories: ['software', 'compliance', 'product', 'partner'],
        search: 'Excel to LIMS water analysis samples results reports CoA customer portal inventory migration AquaVerify Cloud'
      },
      {
        id: 'oem-white-label-water-testing-kits',
        label: 'OEM / white label',
        title: 'OEM and white label water testing kits: guide for distributors and partners',
        body: 'Commercial and technical guide to evaluate distribution, co-branding, white label, packaging, documentation, training, software and territory scaling.',
        audience: 'Distributors, integrators, manufacturers, labs',
        region: 'Global',
        level: 'Commercial',
        reading: '14 min',
        tags: ['OEM', 'White label', 'Co-branding', 'Distribution'],
        categories: ['partner', 'product', 'software'],
        search: 'OEM white label water testing kits distributors partners co-branding packaging documentation training software territory'
      },
      {
        id: 'aquacoli-enumera-coli100-validation',
        label: 'Technical paper',
        title: 'AquaColi / ENUMERA Coli100 validation against ISO 9308-2',
        body: 'Technical paper on a chromogenic MPN method for E. coli and total coliforms in 100 mL water samples, validated across drinking water, surface water, wastewater, reclaimed water and seawater.',
        audience: 'Water labs, utilities, QA/QC, distributors',
        region: 'Global / EU',
        level: 'Validation',
        reading: '12 min',
        tags: ['ENUMERA Coli100', 'AquaColi', 'ISO 9308-2', 'MPN'],
        categories: ['product', 'methods', 'compliance', 'sector'],
        search: 'AquaColi ENUMERA Coli100 E coli total coliforms ISO 9308-2 MPN chromogenic validation 100 mL water samples'
      },
      {
        id: 'urban-wastewater-wbe-multiviral-valencian-region',
        label: 'WBE surveillance',
        title: 'Urban wastewater-based epidemiology for multi-viral pathogen surveillance in the Valencian region',
        body: 'Water Research paper on SARS-CoV-2, RSV, influenza A, enteric viruses and viral faecal indicators in urban wastewater from the Valencian region, Spain.',
        audience: 'Utilities, public health teams, labs, researchers',
        region: 'Spain / EU',
        level: 'Scientific paper',
        reading: '13 min',
        tags: ['WBE', 'Respiratory viruses', 'Enteric viruses', 'Indicators'],
        categories: ['viral', 'methods', 'software', 'sector'],
        search: 'wastewater-based epidemiology WBE SARS-CoV-2 RSV influenza enteric viruses crAssphage PMMoV somatic coliphages Valencia'
      },
      {
        id: 'viral-pollution-wastewater-mediterranean-ecosystems',
        label: 'Water reuse',
        title: 'Evaluating viral pollution in wastewater and Mediterranean ecosystems',
        body: 'Food and Environmental Virology paper assessing human enteric and respiratory viruses, faecal indicators, reclaimed wastewater, biosolids, surface water and sediment in Mediterranean protected areas.',
        audience: 'Water reuse teams, environmental labs, utilities, researchers',
        region: 'Mediterranean / EU',
        level: 'Scientific paper',
        reading: '13 min',
        tags: ['Water reuse', 'Mediterranean ecosystems', 'Viral indicators', 'WWTP'],
        categories: ['viral', 'compliance', 'methods', 'sector'],
        search: 'viral pollution wastewater Mediterranean ecosystems reclaimed water biosolids surface water sediment WWTP enteric respiratory viruses'
      },
      {
        id: 'sars-cov-2-surrogates-decay-aquatic-environments',
        label: 'SARS-CoV-2 persistence',
        title: 'Decay of infectious SARS-CoV-2 and surrogates in aquatic environments',
        body: 'Water Research paper comparing infectious SARS-CoV-2 decay, SARS-CoV-2 RNA persistence and surrogate behaviour in river water and seawater at different temperatures.',
        audience: 'Environmental virology labs, water researchers, risk teams',
        region: 'Global',
        level: 'Scientific paper',
        reading: '10 min',
        tags: ['SARS-CoV-2', 'MS2', 'PMMoV', 'Seawater'],
        categories: ['viral', 'methods', 'sector'],
        search: 'SARS-CoV-2 decay infectious RNA surrogates MS2 PMMoV river water seawater persistence temperature'
      },
      {
        id: 'somatic-coliphage-method-comparison-water',
        label: 'Somatic coliphages',
        title: 'Comparative study of two methods for detecting and quantifying somatic coliphages in water',
        body: 'Conference paper comparing a standardized somatic coliphage method with the Bluephage Easy Kit, including recovery, precision, uncertainty and practical method tradeoffs.',
        audience: 'Water labs, operators, QA/QC, method leads',
        region: 'Spain / EU',
        level: 'Method comparison',
        reading: '10 min',
        tags: ['Somatic coliphages', 'Bluephage Easy Kit', 'ISO 10705-2', 'Recovery'],
        categories: ['viral', 'methods', 'compliance', 'product'],
        search: 'somatic coliphages detection quantification water standardized method Bluephage Easy Kit recovery precision uncertainty'
      },
      {
        id: 'enteric-viruses-antibiotic-resistance-genes-mussels',
        label: 'Food safety',
        title: 'Potentially infectious human enteric viruses and antibiotic resistance genes in mussels',
        body: 'Food and Environmental Virology paper on enteric viruses, viral indicators and antibiotic resistance genes in mussels from the Campania region, Italy.',
        audience: 'Food safety teams, shellfish labs, public health, researchers',
        region: 'Italy / EU',
        level: 'Scientific paper',
        reading: '12 min',
        tags: ['Mussels', 'Enteric viruses', 'ARGs', 'Food safety'],
        categories: ['viral', 'methods', 'sector', 'compliance'],
        search: 'mussels Campania Italy enteric viruses HuNoV rotavirus astrovirus antibiotic resistance genes somatic coliphages crAssphage food safety'
      },
      {
        id: 'editorial-methodology',
        label: 'Editorial method',
        title: 'AquaVerify editorial methodology',
        body: 'How AquaVerify prepares technical resources, verifies sources, separates scientific, regulatory and commercial claims, and manages review or correction needs.',
        audience: 'Readers, laboratories, distributors, reviewers',
        region: 'Global',
        level: 'Editorial policy',
        reading: '7 min',
        tags: ['Editorial policy', 'Sources', 'Corrections', 'Conflicts'],
        categories: ['compliance', 'methods'],
        search: 'AquaVerify editorial methodology sources review corrections conflicts scientific regulatory commercial claims'
      }
    ],
    checklists: [
      ['coliphages', 'Checklist for adding coliphages to an analytical program', 'Questions on monitoring objective, matrix, volume, host strain, controls, PFU results and reporting.', ['viral', 'methods']],
      ['directive', 'EU Directive / RD 3/2023 checklist', 'Preparation guide for sampling points, risk assessment, somatic coliphages, records and evidence.', ['compliance', 'sector']],
      ['lims', 'LIMS, CoA and audit trail checklist', 'Evaluate whether the current workflow captures sample, method, batch, operator, review, report and customer portal.', ['software', 'compliance']],
      ['partner', 'Distributor and OEM checklist', 'Assess territory, technical support, inventory, packaging, co-branding and white label readiness.', ['partner', 'product']],
      ['product_selection', 'Product selection checklist', 'Prepare a product recommendation conversation around matrix, decision type, volume and traceability.', ['product', 'methods']],
      ['rd_3_2023_coliphages', 'RD 3/2023 somatic coliphage checklist', 'Organize sampling points, raw-water context, method readiness and reporting evidence.', ['compliance', 'viral']],
      ['iso_17025_labs', 'ISO/IEC 17025 laboratory evidence checklist', 'Review chain of custody, CoA, audit trail, permissions and technical approval flow.', ['compliance', 'software']],
      ['water_safety_plans', 'Water Safety Plan traceability checklist', 'Turn hazards, control points, monitoring and corrective actions into reviewable evidence.', ['compliance', 'sector']],
      ['food_beverage_water', 'Food and beverage water checklist', 'Connect process water, CIP, batch context, microbiology results and audit evidence.', ['sector', 'product']],
      ['legionella_facilities', 'Facility water risk checklist', 'Prepare recurring control around Legionella-oriented risk, terminal points, actions and suppliers.', ['sector', 'compliance']],
      ['iso_19458_sampling', 'ISO 19458 microbiological sampling checklist', 'Prepare sampling objectives, points, containers, preservation, transport and chain-of-custody records.', ['methods', 'compliance']],
      ['excel_to_lims', 'Excel to LIMS migration checklist', 'Map samples, methods, results, reviews, CoA, portal and inventory before moving to a connected workflow.', ['software', 'compliance']],
      ['oem_white_label', 'OEM and white label readiness checklist', 'Evaluate territory, packaging, documentation, training, support, software and partner launch readiness.', ['partner', 'product']]
    ],
    routes: [
      ['products', 'AquaVerify products', 'Compare ENUMERA, INDICA, ISO/EPA Kits and Lab Essentials for each analytical need.'],
      ['platform', 'AquaVerify Cloud', 'Connect samples, batches, readings, CoA, CRM and customer portal.'],
      ['glossary', 'Technical glossary', 'Search definitions for water microbiology, LIMS, traceability, standards, products and sectors.'],
      ['industries-hub', 'Industry solutions', 'Translate each resource into labs, municipalities, food, process water, facilities and agriculture.'],
      ['distributors', 'Authorized distributors', 'Find local support, inventory, training and territory coverage.'],
      ['oem', 'OEM and white label', 'Evaluate private label, co-branding, packaging and technical program options.']
    ],
    sectors: [
      ['water-testing-labs', 'Water testing laboratories', 'High-volume sample reception, review, CoA and client delivery.'],
      ['municipal-water-testing', 'Municipal water', 'Source water, treatment verification, network monitoring and evidence.'],
      ['food-beverage-water-quality', 'Food and beverage', 'Process water, hygiene programs, HACCP and QA routines.'],
      ['industrial-process-water', 'Industrial process water', 'Operational control, deviations and traceable preventive action.'],
      ['facility-water-risk', 'Facility water risk', 'Buildings, hotels, healthcare and recurring control plans.'],
      ['agriculture-water', 'Agriculture', 'Irrigation, reclaimed water, plots and campaign monitoring.']
    ],
    products: [
      ['enumera', 'ENUMERA', 'Quantitative workflows when the decision needs a count, not only detection.'],
      ['indica', 'INDICA', 'Presence/absence screening for routine control and fast verification.'],
      ['standard-kits', 'ISO/EPA Kits', 'Technical workflows aligned with reference-oriented microbiology routes.'],
      ['lab-essentials', 'Lab Essentials', 'Media, reagents, controls and materials for daily water microbiology.'],
      ['platform', 'AquaVerify Cloud', 'LIMS, CoA, traceability, CRM and customer portal in one workflow.']
    ],
    faqs: [
      ['Who are these resources for?', 'They are for laboratories, utilities, distributors, water quality teams, regulated industries and companies evaluating water microbiology products or connected digital workflows.'],
      ['Do the whitepapers replace regulatory or accreditation requirements?', 'No. They are technical and commercial orientation resources. Method validation, accreditation, competent authority requirements and each quality system remain decisive.'],
      ['Can I use these resources to choose a product?', 'Yes. The hub connects each topic with ENUMERA, INDICA, ISO/EPA Kits, Lab Essentials and AquaVerify Cloud to make the technical conversation more specific.'],
      ['Are the checklists downloadable?', 'Yes. They can be offered as open PDFs or connected to a download form when technical follow-up is required.'],
      ['Can AquaVerify help after I read a guide?', 'Yes. AquaVerify can help map product, platform, distributor, OEM or next step according to sector, matrix and control objective.']
    ]
  },
  es: {
    seoTitle: 'Recursos de microbiología del agua, whitepapers y checklists | AquaVerify',
    seoDescription: 'Explora whitepapers, guías técnicas y checklists AquaVerify para microbiología del agua, colífagos, flujos ISO/EPA, evidencia LIMS, productos, sectores, distribuidores y programas OEM.',
    eyebrow: 'Centro de conocimiento AquaVerify',
    title: 'Whitepapers, guías y recursos técnicos para microbiología del agua',
    titleAccent: 'recursos técnicos',
    lead: 'Una biblioteca práctica para laboratorios, utilities, industrias, distribuidores y equipos de calidad que necesitan entender indicadores virales, colífagos, métodos ISO/EPA, trazabilidad digital, cumplimiento normativo y selección de productos AquaVerify.',
    primaryCta: 'Explorar whitepapers',
    secondaryCta: 'Descargar checklists',
    tertiaryCta: 'Solicitar recomendación técnica',
    panelLabel: 'Biblioteca técnica',
    panelTitle: 'Recursos para decidir con contexto',
    panelBody: 'Accede a guías sobre colífagos, métodos ISO/EPA, normativa, LIMS, productos AquaVerify y programas de distribución u OEM.',
    panelChips: ['Whitepapers', 'Checklists', 'Productos', 'Sectores'],
    intentEyebrow: 'Elige por objetivo',
    intentTitle: 'Encuentra el recurso correcto según tu decisión técnica o comercial',
    intentBody: 'Filtra por normativa, métodos, productos, plataforma, sectores o canal para pasar de la investigación al siguiente paso.',
    whitepapersEyebrow: 'Whitepapers destacados',
    whitepapersTitle: 'Recursos técnicos para decisiones de calidad del agua',
    whitepapersBody: 'Cada whitepaper incluye audiencia, región, tiempo de lectura, próximos pasos y enlaces directos hacia productos, plataforma, sectores o canal.',
    searchPlaceholder: 'Buscar por tema, método, sector o producto...',
    noResults: 'No hay recursos que coincidan con el filtro actual. Prueba otra categoría o término de búsqueda.',
    recommendationCta: 'Solicitar recomendación técnica',
    checklistsEyebrow: 'Checklists descargables',
    checklistsTitle: 'Plantillas prácticas para preparar programas, auditorías y decisiones técnicas',
    checklistsBody: 'Descarga plantillas para preparar programas analíticos, auditorías, selección de producto, trazabilidad digital y conversaciones con distribuidores u OEM.',
    nextTitle: 'Continúa desde la investigación hacia la acción',
    sectorTitle: 'Lleva cada guía al contexto operativo correcto',
    productTitle: 'De la guía técnica a la selección de producto',
    finalTitle: 'Convierte la lectura en una recomendación técnica',
    finalBody: 'Comparte tu sector, matriz, objetivo de control y nivel de trazabilidad requerido. AquaVerify puede orientar la selección de producto, plataforma, distribuidor u opción OEM más adecuada.',
    finalPrimary: 'Solicitar recomendación',
    finalSecondary: 'Encontrar distribuidor',
    finalTertiary: 'Explorar programa OEM',
    filters: {
      all: 'Todos',
      viral: 'Indicadores virales',
      compliance: 'Normativa',
      methods: 'ISO/EPA',
      software: 'Software y LIMS',
      product: 'Productos',
      sector: 'Sectores',
      partner: 'Distribuidores/OEM'
    },
    metaLabels: {
      audience: 'Audiencia',
      region: 'Región',
      level: 'Nivel',
      reading: 'Lectura',
      open: 'Abrir whitepaper',
      download: 'Descargar checklist',
      related: 'Relacionado'
    },
    intents: [
      ['viral', 'Indicadores virales y colífagos', 'Entiende cuándo añadir colífagos somáticos o F-específicos a un programa de agua y cómo documentar resultados con contexto.'],
      ['compliance', 'Normativa y auditoría', 'Prepara conversaciones sobre Directiva UE, RD 3/2023, RTCR, ISO/IEC 17025 y evidencia revisable.'],
      ['methods', 'Métodos ISO/EPA', 'Compara rutas de referencia, volúmenes, controles, cepas huésped y requisitos de trazabilidad.'],
      ['product', 'Producto y compra técnica', 'Elige entre ENUMERA, INDICA, Kits ISO/EPA, Lab Essentials y AquaVerify Cloud según el caso de uso.'],
      ['software', 'Digitalización LIMS y CoA', 'Conecta muestra, método, lote, operador, resultado, revisión, informe y portal cliente.'],
      ['partner', 'Distribución y OEM', 'Evalúa distribución, co-branding, marca blanca, soporte local y programas con plataforma digital.']
    ],
    whitepapers: [
      {
        id: 'coliphages-indicators',
        label: 'Indicadores virales',
        title: 'Por qué los colífagos son el indicador viral definitivo para calidad del agua',
        body: 'Guía para entender por qué los colífagos aportan una capa práctica de indicador viral más allá de E. coli y enterococos, y cómo conectar recuentos, cepas huésped, controles y revisión dentro de un flujo trazable.',
        audience: 'Laboratorios, utilities, QC, distribuidores',
        region: 'Global',
        level: 'Técnico',
        reading: '10 min',
        tags: ['Colífagos somáticos', 'F-específicos', 'ISO/EPA', 'Cloud'],
        categories: ['viral', 'methods', 'software', 'product'],
        search: 'colifagos somaticos especificos indicadores virales ISO EPA cloud E coli enterococos laboratorios utilities'
      },
      {
        id: 'eu-drinking-water-directive-coliphages',
        label: 'Directiva UE',
        title: 'Directiva europea de agua potable y colífagos somáticos',
        body: 'Recurso para laboratorios, operadores y distribuidores que necesitan traducir el enfoque basado en riesgo en planes de muestreo, preparación metodológica, evidencia de tratamiento y reporting técnico.',
        audience: 'Utilities, municipios, laboratorios',
        region: 'UE / España',
        level: 'Regulatorio',
        reading: '8 min',
        tags: ['Directiva UE', 'RD 3/2023', 'Agua bruta', 'EN ISO 10705'],
        categories: ['viral', 'compliance', 'methods', 'sector'],
        search: 'Directiva Europea agua potable RD 3/2023 colifagos somaticos agua bruta EN ISO 10705 municipios utilities'
      },
      {
        id: 'water-compliance-software-guide',
        label: 'Evidencia digital',
        title: 'Capa de evidencia software para cumplimiento en calidad del agua',
        body: 'Guía para evaluar cuándo una capa software ayuda a organizar muestras, métodos, lotes, audit trail, revisión técnica, CoA, portal cliente y seguimiento comercial sin sustituir validación ni criterio regulatorio.',
        audience: 'Labs, QA/QC, distribuidores, biotech',
        region: 'Global',
        level: 'Operativo',
        reading: '9 min',
        tags: ['LIMS', 'CoA', 'Audit trail', 'AquaVerify Cloud'],
        categories: ['software', 'compliance', 'product'],
        search: 'LIMS CoA audit trail trazabilidad muestras portal cliente AquaVerify Cloud software cumplimiento'
      },
      {
        id: 'us-drinking-water-compliance-coliform-rule',
        label: 'EPA / RTCR EEUU',
        title: 'Cumplimiento de agua potable en Estados Unidos: coliformes y contexto colífagos',
        body: 'Whitepaper para separar correctamente RTCR, coliformes totales, E. coli y métodos EPA de colífagos, ayudando a preparar conversaciones de producto, plataforma o distribución en el mercado estadounidense.',
        audience: 'US utilities, labs, distributors',
        region: 'Estados Unidos',
        level: 'Regulatorio',
        reading: '8 min',
        tags: ['RTCR', 'EPA 1601/1602', 'Ground Water Rule', 'Colífagos'],
        categories: ['compliance', 'methods', 'viral', 'partner'],
        search: 'Estados Unidos EPA RTCR Total Coliform Rule metodo 1601 1602 Ground Water Rule colifagos'
      },
      {
        id: 'aquaverify-product-selection-guide',
        label: 'Selección de producto',
        title: 'Cómo elegir el producto AquaVerify adecuado para análisis microbiológico del agua',
        body: 'Guía de decisión para elegir ENUMERA, INDICA, Kits ISO/EPA, Lab Essentials o AquaVerify Cloud según objetivo analítico, matriz, urgencia y trazabilidad.',
        audience: 'Laboratorios, QC, utilities, distribuidores, OEM',
        region: 'Global',
        level: 'Técnico',
        reading: '14 min',
        tags: ['ENUMERA', 'INDICA', 'ISO/EPA', 'Cloud'],
        categories: ['product', 'methods', 'software', 'partner'],
        search: 'elegir producto AquaVerify ENUMERA INDICA kits ISO EPA Lab Essentials Cloud matriz trazabilidad'
      },
      {
        id: 'rd-3-2023-somatic-coliphages-guide',
        label: 'RD 3/2023',
        title: 'RD 3/2023 y colífagos somáticos para laboratorios y operadores de agua',
        body: 'Guía práctica para traducir el contexto español de agua de consumo en planes de muestreo, evidencia de tratamiento, colífagos somáticos y reporting trazable.',
        audience: 'Utilities, laboratorios, operadores',
        region: 'España / UE',
        level: 'Regulatorio',
        reading: '13 min',
        tags: ['RD 3/2023', 'Colífagos somáticos', 'ISO 10705-2', 'Muestreo'],
        categories: ['compliance', 'viral', 'methods', 'sector'],
        search: 'RD 3/2023 colifagos somaticos agua consumo laboratorios operadores muestreo evidencia tratamiento'
      },
      {
        id: 'iso-17025-water-laboratories-guide',
        label: 'ISO 17025',
        title: 'ISO/IEC 17025 en laboratorios de agua: cadena de custodia, CoA y trazabilidad digital',
        body: 'Guía para estructurar recepción de muestras, cadena de custodia, revisión técnica, CoA, audit trail y evidencia AquaVerify Cloud en laboratorios de agua.',
        audience: 'Laboratorios de agua, QA, responsables técnicos',
        region: 'Global',
        level: 'Sistema de calidad',
        reading: '12 min',
        tags: ['ISO/IEC 17025', 'CoA', 'Cadena de custodia', 'LIMS'],
        categories: ['compliance', 'software', 'methods', 'sector'],
        search: 'ISO 17025 laboratorio agua cadena custodia CoA audit trail LIMS AquaVerify Cloud'
      },
      {
        id: 'water-safety-plans-traceable-control',
        label: 'Water Safety Plans',
        title: 'Water Safety Plans: del riesgo del agua a un programa de control trazable',
        body: 'Marco para convertir peligros, puntos de control, monitorización, acciones correctivas y revisión en un programa trazable de calidad del agua.',
        audience: 'Utilities, instalaciones, industria, QA',
        region: 'Global',
        level: 'Operativo',
        reading: '12 min',
        tags: ['Water Safety Plans', 'Riesgo', 'Monitorización', 'Trazabilidad'],
        categories: ['compliance', 'software', 'sector', 'methods'],
        search: 'Water Safety Plans riesgo agua control monitorizacion acciones correctivas programa trazable'
      },
      {
        id: 'food-beverage-water-microbiology-guide',
        label: 'Alimentación y bebidas',
        title: 'Agua en industria alimentaria: control microbiológico, lote, CIP y evidencia para auditoría',
        body: 'Guía para conectar agua de proceso, agua ingrediente, enjuagues, CIP, lote, resultados microbiológicos y evidencia de auditoría en operaciones alimentarias.',
        audience: 'QA alimentaria, producción, laboratorios',
        region: 'Global',
        level: 'Operativo',
        reading: '12 min',
        tags: ['Food & beverage', 'CIP', 'Lote', 'Auditoría'],
        categories: ['sector', 'compliance', 'product', 'software'],
        search: 'agua industria alimentaria microbiologia CIP lote auditoria APPCC QA proceso'
      },
      {
        id: 'legionella-facility-water-risk-guide',
        label: 'Legionella',
        title: 'Gestión del riesgo del agua en instalaciones: Legionella, puntos terminales y trazabilidad',
        body: 'Guía para instalaciones que necesitan control recurrente de riesgo hídrico, histórico de puntos, acciones, proveedores y evidencia trazable alrededor de programas orientados a Legionella.',
        audience: 'Instalaciones, hostelería, salud, QA',
        region: 'Global',
        level: 'Operativo',
        reading: '12 min',
        tags: ['Legionella', 'Instalaciones', 'Puntos terminales', 'Acciones'],
        categories: ['sector', 'compliance', 'product', 'software'],
        search: 'Legionella instalaciones riesgo agua puntos terminales edificios hoteles salud trazabilidad acciones'
      },
      {
        id: 'iso-19458-water-microbiological-sampling',
        label: 'ISO 19458',
        title: 'ISO 19458 y muestreo microbiológico del agua: cómo planificar, tomar y transportar muestras con trazabilidad',
        body: 'Guía para controlar objetivo de muestreo, puntos, recipientes, conservación, transporte, cadena de custodia y evidencia digital antes del análisis microbiológico.',
        audience: 'Laboratorios, utilities, muestreo, QA/QC',
        region: 'Global / UE',
        level: 'Técnico',
        reading: '13 min',
        tags: ['ISO 19458', 'Muestreo', 'Cadena de custodia', 'Cloud'],
        categories: ['methods', 'compliance', 'software', 'sector'],
        search: 'ISO 19458 muestreo microbiologico agua planificacion toma transporte conservacion cadena custodia trazabilidad digital'
      },
      {
        id: 'excel-to-lims-water-analysis',
        label: 'Excel a LIMS',
        title: 'De Excel a LIMS: cómo digitalizar muestras, resultados e informes de agua',
        body: 'Guía práctica de migración para pasar de hojas de cálculo y correo a un flujo trazable con LIMS, CoA, portal cliente, inventario y operación conectada.',
        audience: 'Laboratorios, QA/QC, distribuidores, utilities',
        region: 'Global',
        level: 'Operativo',
        reading: '14 min',
        tags: ['LIMS', 'CoA', 'Migración', 'Portal'],
        categories: ['software', 'compliance', 'product', 'partner'],
        search: 'Excel a LIMS analisis agua muestras resultados informes CoA portal cliente inventario migracion AquaVerify Cloud'
      },
      {
        id: 'oem-white-label-water-testing-kits',
        label: 'OEM / marca blanca',
        title: 'OEM y marca blanca en kits de análisis de agua: guía para distribuidores y partners',
        body: 'Guía comercial y técnica para evaluar distribución, co-branding, marca blanca, packaging, documentación, formación, software y escalado por territorio.',
        audience: 'Distribuidores, integradores, fabricantes, labs',
        region: 'Global',
        level: 'Comercial',
        reading: '14 min',
        tags: ['OEM', 'Marca blanca', 'Co-branding', 'Distribución'],
        categories: ['partner', 'product', 'software'],
        search: 'OEM marca blanca kits analisis agua distribuidores partners co-branding packaging documentacion formacion software territorio'
      },
      {
        id: 'aquacoli-enumera-coli100-validation',
        label: 'Paper técnico',
        title: 'Validación AquaColi / ENUMERA Coli100 frente a ISO 9308-2',
        body: 'Paper técnico sobre un método cromogénico MPN para E. coli y coliformes totales en 100 mL de agua, validado en agua potable, superficial, residual, regenerada y marina.',
        audience: 'Laboratorios de agua, utilities, QA/QC, distribuidores',
        region: 'Global / UE',
        level: 'Validación',
        reading: '12 min',
        tags: ['ENUMERA Coli100', 'AquaColi', 'ISO 9308-2', 'MPN'],
        categories: ['product', 'methods', 'compliance', 'sector'],
        search: 'AquaColi ENUMERA Coli100 E coli coliformes totales ISO 9308-2 MPN cromogenico validacion 100 mL muestras agua'
      },
      {
        id: 'urban-wastewater-wbe-multiviral-valencian-region',
        label: 'Vigilancia WBE',
        title: 'Epidemiología basada en aguas residuales urbanas para vigilancia multiviral en la región valenciana',
        body: 'Paper de Water Research sobre SARS-CoV-2, RSV, gripe A, virus entéricos e indicadores virales fecales en aguas residuales urbanas de la región valenciana.',
        audience: 'Utilities, salud pública, laboratorios, investigación',
        region: 'España / UE',
        level: 'Paper científico',
        reading: '13 min',
        tags: ['WBE', 'Virus respiratorios', 'Virus entéricos', 'Indicadores'],
        categories: ['viral', 'methods', 'software', 'sector'],
        search: 'epidemiologia aguas residuales WBE SARS-CoV-2 RSV gripe virus entericos crAssphage PMMoV colifagos somaticos Valencia'
      },
      {
        id: 'viral-pollution-wastewater-mediterranean-ecosystems',
        label: 'Reutilización',
        title: 'Evaluación de contaminación viral en aguas residuales y ecosistemas mediterráneos',
        body: 'Paper de Food and Environmental Virology sobre virus entéricos y respiratorios, indicadores fecales, agua regenerada, biosólidos, agua superficial y sedimentos en áreas mediterráneas protegidas.',
        audience: 'Reutilización de agua, laboratorios ambientales, utilities, investigación',
        region: 'Mediterráneo / UE',
        level: 'Paper científico',
        reading: '13 min',
        tags: ['Reutilización', 'Ecosistemas mediterráneos', 'Indicadores virales', 'EDAR'],
        categories: ['viral', 'compliance', 'methods', 'sector'],
        search: 'contaminacion viral aguas residuales ecosistemas mediterraneos agua regenerada biosolidos agua superficial sedimento EDAR virus entericos respiratorios'
      },
      {
        id: 'sars-cov-2-surrogates-decay-aquatic-environments',
        label: 'Persistencia SARS-CoV-2',
        title: 'Decaimiento de SARS-CoV-2 infeccioso y sustitutos en ambientes acuáticos',
        body: 'Paper de Water Research que compara el decaimiento de SARS-CoV-2 infeccioso, la persistencia de ARN de SARS-CoV-2 y el comportamiento de sustitutos en agua de río y agua marina.',
        audience: 'Virología ambiental, investigación de agua, equipos de riesgo',
        region: 'Global',
        level: 'Paper científico',
        reading: '10 min',
        tags: ['SARS-CoV-2', 'MS2', 'PMMoV', 'Agua marina'],
        categories: ['viral', 'methods', 'sector'],
        search: 'SARS-CoV-2 decaimiento infeccioso ARN sustitutos MS2 PMMoV agua rio agua marina persistencia temperatura'
      },
      {
        id: 'somatic-coliphage-method-comparison-water',
        label: 'Colífagos somáticos',
        title: 'Estudio comparativo de dos métodos de detección y cuantificación de colífagos somáticos en agua',
        body: 'Comunicación científica que compara un método estandarizado de colífagos somáticos con Bluephage Easy Kit, incluyendo recuperación, precisión, incertidumbre y aspectos prácticos de método.',
        audience: 'Laboratorios de agua, operadores, QA/QC, responsables de método',
        region: 'España / UE',
        level: 'Comparativa metodológica',
        reading: '10 min',
        tags: ['Colífagos somáticos', 'Bluephage Easy Kit', 'ISO 10705-2', 'Recuperación'],
        categories: ['viral', 'methods', 'compliance', 'product'],
        search: 'colifagos somaticos deteccion cuantificacion agua metodo estandarizado Bluephage Easy Kit recuperacion precision incertidumbre'
      },
      {
        id: 'enteric-viruses-antibiotic-resistance-genes-mussels',
        label: 'Seguridad alimentaria',
        title: 'Virus entéricos potencialmente infecciosos y genes de resistencia a antibióticos en mejillones',
        body: 'Paper de Food and Environmental Virology sobre virus entéricos, indicadores virales y genes de resistencia a antibióticos en mejillones de la región de Campania, Italia.',
        audience: 'Seguridad alimentaria, laboratorios de bivalvos, salud pública, investigación',
        region: 'Italia / UE',
        level: 'Paper científico',
        reading: '12 min',
        tags: ['Mejillones', 'Virus entéricos', 'ARGs', 'Seguridad alimentaria'],
        categories: ['viral', 'methods', 'sector', 'compliance'],
        search: 'mejillones Campania Italia virus entericos norovirus rotavirus astrovirus genes resistencia antibioticos colifagos somaticos crAssphage seguridad alimentaria'
      },
      {
        id: 'editorial-methodology',
        label: 'Método editorial',
        title: 'Metodología editorial de AquaVerify',
        body: 'Cómo AquaVerify prepara recursos técnicos, verifica fuentes, separa claims científicos, regulatorios y comerciales, y gestiona revisión o corrección.',
        audience: 'Lectores, laboratorios, distribuidores, revisores',
        region: 'Global',
        level: 'Política editorial',
        reading: '7 min',
        tags: ['Política editorial', 'Fuentes', 'Correcciones', 'Conflictos'],
        categories: ['compliance', 'methods'],
        search: 'metodologia editorial AquaVerify fuentes revision correcciones conflictos claims cientificos regulatorios comerciales'
      }
    ],
    checklists: [
      ['coliphages', 'Checklist para añadir colífagos a un programa analítico', 'Preguntas sobre objetivo de monitorización, matriz, volumen, cepa huésped, controles, resultados UFP y reporting.', ['viral', 'methods']],
      ['directive', 'Checklist Directiva UE / RD 3/2023', 'Guía de preparación para puntos de muestreo, evaluación de riesgo, colífagos somáticos, registros y evidencias.', ['compliance', 'sector']],
      ['lims', 'Checklist LIMS, CoA y audit trail', 'Lista para evaluar si el flujo actual captura muestra, método, lote, operador, revisión, informe y portal cliente.', ['software', 'compliance']],
      ['partner', 'Checklist distribuidor y OEM', 'Documento para evaluar territorio, soporte técnico, inventario, packaging, co-branding y marca blanca.', ['partner', 'product']],
      ['product_selection', 'Checklist de selección de producto', 'Prepara una recomendación de producto según matriz, tipo de decisión, volumen y trazabilidad.', ['product', 'methods']],
      ['rd_3_2023_coliphages', 'Checklist RD 3/2023 y colífagos somáticos', 'Ordena puntos de muestreo, contexto de agua bruta, preparación metodológica y evidencia de reporting.', ['compliance', 'viral']],
      ['iso_17025_labs', 'Checklist ISO/IEC 17025 para laboratorios', 'Revisa cadena de custodia, CoA, audit trail, permisos y flujo de aprobación técnica.', ['compliance', 'software']],
      ['water_safety_plans', 'Checklist Water Safety Plan trazable', 'Convierte peligros, puntos de control, monitorización y acciones correctivas en evidencia revisable.', ['compliance', 'sector']],
      ['food_beverage_water', 'Checklist de agua en alimentación y bebidas', 'Conecta agua de proceso, CIP, lote, resultados microbiológicos y evidencia de auditoría.', ['sector', 'product']],
      ['legionella_facilities', 'Checklist de riesgo hídrico en instalaciones', 'Prepara control recurrente alrededor de Legionella, puntos terminales, acciones y proveedores.', ['sector', 'compliance']],
      ['iso_19458_sampling', 'Checklist ISO 19458 de muestreo microbiológico', 'Prepara objetivos de muestreo, puntos, recipientes, conservación, transporte y cadena de custodia.', ['methods', 'compliance']],
      ['excel_to_lims', 'Checklist de migración de Excel a LIMS', 'Mapea muestras, métodos, resultados, revisiones, CoA, portal e inventario antes de digitalizar el flujo.', ['software', 'compliance']],
      ['oem_white_label', 'Checklist de preparación OEM y marca blanca', 'Evalúa territorio, packaging, documentación, formación, soporte, software y preparación de lanzamiento.', ['partner', 'product']]
    ],
    routes: [
      ['products', 'Productos AquaVerify', 'Compara ENUMERA, INDICA, Kits ISO/EPA y Lab Essentials para cada necesidad analítica.'],
      ['platform', 'AquaVerify Cloud', 'Conecta muestras, lotes, lecturas, CoA, CRM y portal cliente.'],
      ['glossary', 'Glosario técnico', 'Busca definiciones de microbiología del agua, LIMS, trazabilidad, normas, productos y sectores.'],
      ['industries-hub', 'Soluciones por industria', 'Traduce cada recurso a laboratorios, municipios, alimentación, proceso industrial, instalaciones y agricultura.'],
      ['distributors', 'Distribuidores autorizados', 'Encuentra soporte local, inventario, formación y cobertura por territorio.'],
      ['oem', 'OEM y marca blanca', 'Evalúa marca privada, co-branding, packaging y opciones de programa técnico.']
    ],
    sectors: [
      ['water-testing-labs', 'Laboratorios de análisis de agua', 'Recepción de muestras, revisión, CoA y entrega cliente con alto volumen.'],
      ['municipal-water-testing', 'Agua municipal', 'Captación, verificación de tratamiento, monitorización de red y evidencia.'],
      ['food-beverage-water-quality', 'Alimentación y bebidas', 'Agua de proceso, programas de higiene, APPCC y rutinas QA.'],
      ['industrial-process-water', 'Agua de proceso industrial', 'Control operativo, desviaciones y acción preventiva trazable.'],
      ['facility-water-risk', 'Riesgo hídrico en instalaciones', 'Edificios, hoteles, salud y planes de control recurrente.'],
      ['agriculture-water', 'Agricultura', 'Riego, agua regenerada, parcelas y campañas de monitorización.']
    ],
    products: [
      ['enumera', 'ENUMERA', 'Flujos cuantitativos cuando la decisión necesita recuento, no solo detección.'],
      ['indica', 'INDICA', 'Cribado presencia/ausencia para control rutinario y verificación rápida.'],
      ['standard-kits', 'Kits ISO/EPA', 'Flujos técnicos alineables con rutas de microbiología orientadas a referencia.'],
      ['lab-essentials', 'Lab Essentials', 'Medios, reactivos, controles y materiales para microbiología del agua diaria.'],
      ['platform', 'AquaVerify Cloud', 'LIMS, CoA, trazabilidad, CRM y portal cliente en un único flujo.']
    ],
    faqs: [
      ['¿Para quién son estos recursos?', 'Para laboratorios, utilities, distribuidores, equipos de calidad del agua, industrias reguladas y empresas que evalúan productos de microbiología del agua o flujos digitales conectados.'],
      ['¿Los whitepapers sustituyen requisitos normativos o de acreditación?', 'No. Son orientación técnica y comercial. La validación de método, acreditación, autoridad competente y sistema de calidad siguen siendo decisivos.'],
      ['¿Puedo usar estos recursos para elegir producto?', 'Sí. El hub conecta cada tema con ENUMERA, INDICA, Kits ISO/EPA, Lab Essentials y AquaVerify Cloud para facilitar una conversación técnica más concreta.'],
      ['¿Los checklists son descargables?', 'Sí. Pueden ofrecerse como PDF abiertos o mediante un formulario de descarga cuando se requiera seguimiento técnico posterior.'],
      ['¿AquaVerify puede ayudar después de leer una guía?', 'Sí. AquaVerify puede ayudar a mapear producto, plataforma, distribuidor, OEM o siguiente paso según sector, matriz y objetivo de control.']
    ]
  }
};

const RELATED_TRANSLATIONS = {
  fr: {
    seoTitle: 'Ressources microbiologie de l’eau, whitepapers et checklists | AquaVerify',
    seoDescription: 'Explorez les whitepapers, guides techniques et checklists AquaVerify pour microbiologie de l’eau, coliphages, flux ISO/EPA, preuve LIMS, produits, secteurs, distributeurs et OEM.',
    eyebrow: 'Centre de connaissance AquaVerify',
    title: 'Whitepapers, guides et ressources techniques pour la microbiologie de l’eau',
    titleAccent: 'ressources techniques',
    lead: 'Une bibliothèque pratique pour laboratoires, utilities, industries, distributeurs et équipes qualité qui doivent comprendre indicateurs viraux, coliphages, méthodes ISO/EPA, traçabilité numérique, conformité et sélection des produits AquaVerify.',
    primaryCta: 'Explorer les whitepapers',
    secondaryCta: 'Télécharger les checklists',
    tertiaryCta: 'Demander une recommandation technique',
    panelLabel: 'Bibliothèque technique',
    panelTitle: 'Ressources pour décider avec contexte',
    panelBody: 'Accédez à des guides sur coliphages, méthodes ISO/EPA, réglementation, LIMS, produits AquaVerify et programmes de distribution ou OEM.',
    panelChips: ['Whitepapers', 'Checklists', 'Produits', 'Secteurs'],
    intentEyebrow: 'Choisir par objectif',
    intentTitle: 'Trouvez la bonne ressource selon votre décision technique ou commerciale',
    intentBody: 'Filtrez par réglementation, méthodes, produits, plateforme, secteurs ou canal pour passer de la recherche à l’étape suivante.',
    whitepapersEyebrow: 'Whitepapers sélectionnés',
    whitepapersTitle: 'Ressources techniques pour décider en qualité de l’eau',
    whitepapersBody: 'Chaque whitepaper inclut audience, région, temps de lecture, étapes suivantes et liens directs vers produits, plateforme, secteurs ou canal.',
    searchPlaceholder: 'Rechercher par thème, méthode, secteur ou produit...',
    noResults: 'Aucune ressource ne correspond au filtre actuel. Essayez une autre catégorie ou recherche.',
    recommendationCta: 'Demander une recommandation technique',
    checklistsEyebrow: 'Checklists téléchargeables',
    checklistsTitle: 'Modèles pratiques pour programmes, audits et décisions techniques',
    checklistsBody: 'Téléchargez des modèles pour préparer programmes analytiques, audits, sélection produit, traçabilité numérique et échanges distributeur ou OEM.',
    nextTitle: 'Passer de la recherche à l’action',
    sectorTitle: 'Relier chaque guide au bon contexte opérationnel',
    productTitle: 'Du guide technique à la sélection produit',
    finalTitle: 'Transformer la lecture en recommandation technique',
    finalBody: 'Partagez votre secteur, matrice, objectif de contrôle et niveau de traçabilité requis. AquaVerify peut orienter la sélection produit, plateforme, distributeur ou OEM.',
    finalPrimary: 'Demander une recommandation',
    finalSecondary: 'Trouver un distributeur',
    finalTertiary: 'Explorer le programme OEM',
    filters: { all: 'Tous', viral: 'Indicateurs viraux', compliance: 'Réglementation', methods: 'ISO/EPA', software: 'Software et LIMS', product: 'Produits', sector: 'Secteurs', partner: 'Distributeurs/OEM' },
    metaLabels: { audience: 'Audience', region: 'Région', level: 'Niveau', reading: 'Lecture', open: 'Ouvrir le whitepaper', download: 'Télécharger la checklist', related: 'Associé' }
  },
  it: {
    seoTitle: 'Risorse microbiologia dell’acqua, whitepaper e checklist | AquaVerify',
    seoDescription: 'Esplora whitepaper, guide tecniche e checklist AquaVerify per microbiologia dell’acqua, colifagi, workflow ISO/EPA, evidenza LIMS, prodotti, settori, distributori e OEM.',
    eyebrow: 'Centro conoscenza AquaVerify',
    title: 'Whitepaper, guide e risorse tecniche per la microbiologia dell’acqua',
    titleAccent: 'risorse tecniche',
    lead: 'Una biblioteca pratica per laboratori, utility, industrie, distributori e team qualità che devono comprendere indicatori virali, colifagi, metodi ISO/EPA, tracciabilità digitale, conformità e selezione prodotti AquaVerify.',
    primaryCta: 'Esplora whitepaper',
    secondaryCta: 'Scarica checklist',
    tertiaryCta: 'Richiedi raccomandazione tecnica',
    panelLabel: 'Biblioteca tecnica',
    panelTitle: 'Risorse per decidere con contesto',
    panelBody: 'Accedi a guide su colifagi, metodi ISO/EPA, normativa, LIMS, prodotti AquaVerify e programmi distributivi o OEM.',
    panelChips: ['Whitepaper', 'Checklist', 'Prodotti', 'Settori'],
    intentEyebrow: 'Scegli per obiettivo',
    intentTitle: 'Trova la risorsa giusta per la tua decisione tecnica o commerciale',
    intentBody: 'Filtra per normativa, metodi, prodotti, piattaforma, settori o canale per passare dalla ricerca allo step successivo.',
    whitepapersEyebrow: 'Whitepaper in evidenza',
    whitepapersTitle: 'Risorse tecniche per decisioni sulla qualità dell’acqua',
    whitepapersBody: 'Ogni whitepaper include audience, regione, tempo di lettura, prossimi passi e link diretti verso prodotti, piattaforma, settori o canale.',
    searchPlaceholder: 'Cerca per tema, metodo, settore o prodotto...',
    noResults: 'Nessuna risorsa corrisponde al filtro attuale. Prova un’altra categoria o ricerca.',
    recommendationCta: 'Richiedi raccomandazione tecnica',
    checklistsEyebrow: 'Checklist scaricabili',
    checklistsTitle: 'Template pratici per programmi, audit e decisioni tecniche',
    checklistsBody: 'Scarica template per preparare programmi analitici, audit, scelta prodotto, tracciabilità digitale e conversazioni con distributori o OEM.',
    nextTitle: 'Continua dalla ricerca all’azione',
    sectorTitle: 'Porta ogni guida nel giusto contesto operativo',
    productTitle: 'Dalla guida tecnica alla selezione prodotto',
    finalTitle: 'Trasforma la lettura in una raccomandazione tecnica',
    finalBody: 'Condividi settore, matrice, obiettivo di controllo e livello di tracciabilità richiesto. AquaVerify può orientare prodotto, piattaforma, distributore o opzione OEM.',
    finalPrimary: 'Richiedi raccomandazione',
    finalSecondary: 'Trova distributore',
    finalTertiary: 'Esplora programma OEM',
    filters: { all: 'Tutti', viral: 'Indicatori virali', compliance: 'Normativa', methods: 'ISO/EPA', software: 'Software e LIMS', product: 'Prodotti', sector: 'Settori', partner: 'Distributori/OEM' },
    metaLabels: { audience: 'Audience', region: 'Regione', level: 'Livello', reading: 'Lettura', open: 'Apri whitepaper', download: 'Scarica checklist', related: 'Correlato' }
  },
  ca: {
    seoTitle: 'Recursos de microbiologia de l’aigua, whitepapers i checklists | AquaVerify',
    seoDescription: 'Explora whitepapers, guies tècniques i checklists AquaVerify per a microbiologia de l’aigua, colífags, fluxos ISO/EPA, evidència LIMS, productes, sectors, distribuïdors i OEM.',
    eyebrow: 'Centre de coneixement AquaVerify',
    title: 'Whitepapers, guies i recursos tècnics per a microbiologia de l’aigua',
    titleAccent: 'recursos tècnics',
    lead: 'Una biblioteca pràctica per a laboratoris, utilities, indústries, distribuïdors i equips de qualitat que necessiten entendre indicadors virals, colífags, mètodes ISO/EPA, traçabilitat digital, compliment i selecció de productes AquaVerify.',
    primaryCta: 'Explorar whitepapers',
    secondaryCta: 'Descarregar checklists',
    tertiaryCta: 'Sol·licitar recomanació tècnica',
    panelLabel: 'Biblioteca tècnica',
    panelTitle: 'Recursos per decidir amb context',
    panelBody: 'Accedeix a guies sobre colífags, mètodes ISO/EPA, normativa, LIMS, productes AquaVerify i programes de distribució o OEM.',
    panelChips: ['Whitepapers', 'Checklists', 'Productes', 'Sectors'],
    intentEyebrow: 'Tria per objectiu',
    intentTitle: 'Troba el recurs correcte segons la teva decisió tècnica o comercial',
    intentBody: 'Filtra per normativa, mètodes, productes, plataforma, sectors o canal per passar de la investigació al següent pas.',
    whitepapersEyebrow: 'Whitepapers destacats',
    whitepapersTitle: 'Recursos tècnics per decidir en qualitat de l’aigua',
    whitepapersBody: 'Cada whitepaper inclou audiència, regió, temps de lectura, pròxims passos i enllaços directes cap a productes, plataforma, sectors o canal.',
    searchPlaceholder: 'Buscar per tema, mètode, sector o producte...',
    noResults: 'No hi ha recursos que coincideixin amb el filtre actual. Prova una altra categoria o terme de cerca.',
    recommendationCta: 'Sol·licitar recomanació tècnica',
    checklistsEyebrow: 'Checklists descarregables',
    checklistsTitle: 'Plantilles pràctiques per preparar programes, auditories i decisions tècniques',
    checklistsBody: 'Descarrega plantilles per preparar programes analítics, auditories, selecció de producte, traçabilitat digital i converses amb distribuïdors o OEM.',
    nextTitle: 'Continua de la investigació a l’acció',
    sectorTitle: 'Porta cada guia al context operatiu correcte',
    productTitle: 'De la guia tècnica a la selecció de producte',
    finalTitle: 'Converteix la lectura en una recomanació tècnica',
    finalBody: 'Comparteix el teu sector, matriu, objectiu de control i nivell de traçabilitat requerit. AquaVerify pot orientar producte, plataforma, distribuïdor o opció OEM.',
    finalPrimary: 'Sol·licitar recomanació',
    finalSecondary: 'Trobar distribuïdor',
    finalTertiary: 'Explorar programa OEM',
    filters: { all: 'Tots', viral: 'Indicadors virals', compliance: 'Normativa', methods: 'ISO/EPA', software: 'Software i LIMS', product: 'Productes', sector: 'Sectors', partner: 'Distribuïdors/OEM' },
    metaLabels: { audience: 'Audiència', region: 'Regió', level: 'Nivell', reading: 'Lectura', open: 'Obrir whitepaper', download: 'Descarregar checklist', related: 'Relacionat' }
  }
};

function localizeRows(baseRows, translations = {}) {
  return baseRows.map((row) => {
    const [id] = row;
    return translations[id] || row;
  });
}

const ROW_TRANSLATIONS = {
  fr: {
    intents: {
      viral: ['viral', 'Indicateurs viraux et coliphages', 'Comprenez quand ajouter des coliphages somatiques ou F-spécifiques à un programme eau et comment documenter les résultats avec contexte.'],
      compliance: ['compliance', 'Réglementation et audit', 'Préparez les échanges sur Directive UE, RTCR, ISO/IEC 17025 et preuve révisable.'],
      methods: ['methods', 'Méthodes ISO/EPA', 'Comparez flux de référence, volumes, contrôles, souches hôtes et exigences de traçabilité.'],
      product: ['product', 'Produit et achat technique', 'Choisissez entre ENUMERA, INDICA, Kits ISO/EPA, Lab Essentials et AquaVerify Cloud selon le cas d’usage.'],
      software: ['software', 'Digitalisation LIMS et CoA', 'Connectez échantillon, méthode, lot, opérateur, résultat, revue, rapport et portail client.'],
      partner: ['partner', 'Distribution et OEM', 'Évaluez distribution, co-branding, marque blanche, support local et programmes avec plateforme numérique.']
    },
    checklist: {
      coliphages: ['coliphages', 'Checklist pour ajouter les coliphages à un programme analytique', 'Questions sur objectif de monitoring, matrice, volume, souche hôte, contrôles, résultats UFP et reporting.', ['viral', 'methods']],
      directive: ['directive', 'Checklist Directive UE / eau potable', 'Guide de préparation pour points de prélèvement, évaluation du risque, coliphages somatiques, registres et preuves.', ['compliance', 'sector']],
      lims: ['lims', 'Checklist LIMS, CoA et audit trail', 'Évaluez si le flux actuel capture échantillon, méthode, lot, opérateur, revue, rapport et portail client.', ['software', 'compliance']],
      partner: ['partner', 'Checklist distributeur et OEM', 'Document pour évaluer territoire, support technique, stock, packaging, co-branding et marque blanche.', ['partner', 'product']],
      product_selection: ['product_selection', 'Checklist de sélection produit', 'Préparez une recommandation produit selon matrice, décision, volume et traçabilité.', ['product', 'methods']],
      rd_3_2023_coliphages: ['rd_3_2023_coliphages', 'Checklist RD 3/2023 et coliphages somatiques', 'Organisez points de prélèvement, contexte eau brute, préparation méthode et preuve de reporting.', ['compliance', 'viral']],
      iso_17025_labs: ['iso_17025_labs', 'Checklist ISO/IEC 17025 laboratoire', 'Revoyez chaîne de traçabilité, CoA, audit trail, permissions et approbation technique.', ['compliance', 'software']],
      water_safety_plans: ['water_safety_plans', 'Checklist Water Safety Plan traçable', 'Transformez dangers, points de contrôle, monitoring et actions correctives en preuve révisable.', ['compliance', 'sector']],
      food_beverage_water: ['food_beverage_water', 'Checklist eau agroalimentaire', 'Reliez eau de process, CIP, lot, résultats microbiologiques et preuve d’audit.', ['sector', 'product']],
      legionella_facilities: ['legionella_facilities', 'Checklist risque eau installations', 'Préparez le contrôle récurrent autour de Legionella, points terminaux, actions et fournisseurs.', ['sector', 'compliance']],
      iso_19458_sampling: ['iso_19458_sampling', 'Checklist ISO 19458 prélèvement microbiologique', 'Préparez objectifs, points, contenants, conservation, transport et chaîne de traçabilité.', ['methods', 'compliance']],
      excel_to_lims: ['excel_to_lims', 'Checklist migration Excel vers LIMS', 'Cartographiez échantillons, méthodes, résultats, revues, CoA, portail et inventaire avant la digitalisation.', ['software', 'compliance']],
      oem_white_label: ['oem_white_label', 'Checklist préparation OEM et marque blanche', 'Évaluez territoire, packaging, documentation, formation, support, logiciel et lancement partenaire.', ['partner', 'product']]
    }
  },
  it: {
    intents: {
      viral: ['viral', 'Indicatori virali e colifagi', 'Comprendi quando aggiungere colifagi somatici o F-specifici a un programma acqua e come documentare i risultati con contesto.'],
      compliance: ['compliance', 'Normativa e audit', 'Prepara conversazioni su Direttiva UE, RTCR, ISO/IEC 17025 ed evidenza revisionabile.'],
      methods: ['methods', 'Metodi ISO/EPA', 'Confronta workflow di riferimento, volumi, controlli, ceppi ospite e requisiti di tracciabilità.'],
      product: ['product', 'Prodotto e acquisto tecnico', 'Scegli tra ENUMERA, INDICA, Kit ISO/EPA, Lab Essentials e AquaVerify Cloud secondo il caso d’uso.'],
      software: ['software', 'Digitalizzazione LIMS e CoA', 'Connetti campione, metodo, lotto, operatore, risultato, revisione, report e portale cliente.'],
      partner: ['partner', 'Distribuzione e OEM', 'Valuta distribuzione, co-branding, marca bianca, supporto locale e programmi con piattaforma digitale.']
    },
    checklist: {
      coliphages: ['coliphages', 'Checklist per aggiungere colifagi a un programma analitico', 'Domande su obiettivo di monitoraggio, matrice, volume, ceppo ospite, controlli, risultati UFP e reporting.', ['viral', 'methods']],
      directive: ['directive', 'Checklist Direttiva UE / acqua potabile', 'Guida per punti di campionamento, valutazione rischio, colifagi somatici, registri ed evidenze.', ['compliance', 'sector']],
      lims: ['lims', 'Checklist LIMS, CoA e audit trail', 'Valuta se il flusso attuale cattura campione, metodo, lotto, operatore, revisione, report e portale cliente.', ['software', 'compliance']],
      partner: ['partner', 'Checklist distributore e OEM', 'Documento per valutare territorio, supporto tecnico, inventario, packaging, co-branding e marca bianca.', ['partner', 'product']],
      product_selection: ['product_selection', 'Checklist selezione prodotto', 'Prepara una raccomandazione prodotto secondo matrice, decisione, volume e tracciabilità.', ['product', 'methods']],
      rd_3_2023_coliphages: ['rd_3_2023_coliphages', 'Checklist RD 3/2023 e colifagi somatici', 'Organizza punti di campionamento, acqua grezza, preparazione metodo ed evidenza report.', ['compliance', 'viral']],
      iso_17025_labs: ['iso_17025_labs', 'Checklist ISO/IEC 17025 laboratorio', 'Rivedi catena di custodia, CoA, audit trail, permessi e approvazione tecnica.', ['compliance', 'software']],
      water_safety_plans: ['water_safety_plans', 'Checklist Water Safety Plan tracciabile', 'Trasforma pericoli, punti di controllo, monitoraggio e azioni correttive in evidenza revisionabile.', ['compliance', 'sector']],
      food_beverage_water: ['food_beverage_water', 'Checklist acqua alimenti e bevande', 'Collega acqua di processo, CIP, lotto, risultati microbiologici ed evidenza audit.', ['sector', 'product']],
      legionella_facilities: ['legionella_facilities', 'Checklist rischio acqua strutture', 'Prepara controllo ricorrente su Legionella, punti terminali, azioni e fornitori.', ['sector', 'compliance']],
      iso_19458_sampling: ['iso_19458_sampling', 'Checklist ISO 19458 campionamento microbiologico', 'Prepara obiettivi, punti, contenitori, conservazione, trasporto e catena di custodia.', ['methods', 'compliance']],
      excel_to_lims: ['excel_to_lims', 'Checklist migrazione da Excel a LIMS', 'Mappa campioni, metodi, risultati, revisioni, CoA, portale e inventario prima della digitalizzazione.', ['software', 'compliance']],
      oem_white_label: ['oem_white_label', 'Checklist preparazione OEM e white label', 'Valuta territorio, packaging, documentazione, formazione, supporto, software e lancio partner.', ['partner', 'product']]
    }
  },
  ca: {
    intents: {
      viral: ['viral', 'Indicadors virals i colífags', 'Entén quan afegir colífags somàtics o F-específics a un programa d’aigua i com documentar resultats amb context.'],
      compliance: ['compliance', 'Normativa i auditoria', 'Prepara converses sobre Directiva UE, RTCR, ISO/IEC 17025 i evidència revisable.'],
      methods: ['methods', 'Mètodes ISO/EPA', 'Compara rutes de referència, volums, controls, soques hoste i requisits de traçabilitat.'],
      product: ['product', 'Producte i compra tècnica', 'Tria entre ENUMERA, INDICA, Kits ISO/EPA, Lab Essentials i AquaVerify Cloud segons el cas d’ús.'],
      software: ['software', 'Digitalització LIMS i CoA', 'Connecta mostra, mètode, lot, operador, resultat, revisió, informe i portal client.'],
      partner: ['partner', 'Distribució i OEM', 'Avalua distribució, co-branding, marca blanca, suport local i programes amb plataforma digital.']
    },
    checklist: {
      coliphages: ['coliphages', 'Checklist per afegir colífags a un programa analític', 'Preguntes sobre objectiu de monitoratge, matriu, volum, soca hoste, controls, resultats UFP i reporting.', ['viral', 'methods']],
      directive: ['directive', 'Checklist Directiva UE / aigua potable', 'Guia de preparació per punts de mostreig, avaluació de risc, colífags somàtics, registres i evidències.', ['compliance', 'sector']],
      lims: ['lims', 'Checklist LIMS, CoA i audit trail', 'Avalua si el flux actual captura mostra, mètode, lot, operador, revisió, informe i portal client.', ['software', 'compliance']],
      partner: ['partner', 'Checklist distribuïdor i OEM', 'Document per avaluar territori, suport tècnic, inventari, packaging, co-branding i marca blanca.', ['partner', 'product']],
      product_selection: ['product_selection', 'Checklist de selecció de producte', 'Prepara una recomanació segons matriu, decisió, volum i traçabilitat.', ['product', 'methods']],
      rd_3_2023_coliphages: ['rd_3_2023_coliphages', 'Checklist RD 3/2023 i colífags somàtics', 'Ordena punts de mostreig, aigua bruta, preparació de mètode i evidència de reporting.', ['compliance', 'viral']],
      iso_17025_labs: ['iso_17025_labs', 'Checklist ISO/IEC 17025 laboratori', 'Revisa cadena de custòdia, CoA, audit trail, permisos i aprovació tècnica.', ['compliance', 'software']],
      water_safety_plans: ['water_safety_plans', 'Checklist Water Safety Plan traçable', 'Converteix perills, punts de control, monitoratge i accions correctives en evidència revisable.', ['compliance', 'sector']],
      food_beverage_water: ['food_beverage_water', 'Checklist aigua alimentació i begudes', 'Connecta aigua de procés, CIP, lot, resultats microbiològics i evidència d’auditoria.', ['sector', 'product']],
      legionella_facilities: ['legionella_facilities', 'Checklist risc hídric instal·lacions', 'Prepara control recurrent sobre Legionella, punts terminals, accions i proveïdors.', ['sector', 'compliance']],
      iso_19458_sampling: ['iso_19458_sampling', 'Checklist ISO 19458 de mostreig microbiològic', 'Prepara objectius, punts, recipients, conservació, transport i cadena de custòdia.', ['methods', 'compliance']],
      excel_to_lims: ['excel_to_lims', 'Checklist de migració d’Excel a LIMS', 'Mapa mostres, mètodes, resultats, revisions, CoA, portal i inventari abans de digitalitzar.', ['software', 'compliance']],
      oem_white_label: ['oem_white_label', 'Checklist de preparació OEM i marca blanca', 'Avalua territori, packaging, documentació, formació, suport, software i llançament partner.', ['partner', 'product']]
    }
  }
};

function cloneEnglishRows(lang, base) {
  if (lang === 'en' || lang === 'es') return base;
  const rowTranslations = ROW_TRANSLATIONS[lang] || {};
  return {
    ...base,
    intents: localizeRows(base.intents, rowTranslations.intents),
    checklists: localizeRows(base.checklists, rowTranslations.checklist)
  };
}

function translatedWhitepapers(lang, baseRows) {
  if (lang === 'en' || lang === 'es') return baseRows;
  const overrides = {
    fr: [
      {
        label: 'Indicateurs viraux',
        title: 'Pourquoi les coliphages sont l’indicateur viral de référence pour la qualité de l’eau',
        body: 'Guide pour comprendre pourquoi les coliphages ajoutent une couche pratique d’indicateur viral au-delà d’E. coli et des entérocoques, et comment relier dénombrements, souches hôtes, contrôles et revue dans un flux traçable.',
        audience: 'Laboratoires, utilities, QC, distributeurs',
        region: 'Global',
        level: 'Technique',
        tags: ['Coliphages somatiques', 'F-spécifiques', 'ISO/EPA', 'Cloud']
      },
      {
        label: 'Directive UE',
        title: 'Directive européenne eau potable et coliphages somatiques',
        body: 'Ressource pour laboratoires, opérateurs et distributeurs qui traduisent l’approche basée sur le risque en plans de prélèvement, préparation méthodologique, preuve de traitement et reporting technique.',
        audience: 'Utilities, municipalités, laboratoires',
        region: 'UE / Espagne',
        level: 'Réglementaire',
        tags: ['Directive UE', 'RD 3/2023', 'Eau brute', 'EN ISO 10705']
      },
      {
        label: 'Preuve numérique',
        title: 'Couche de preuve logicielle pour la conformité qualité de l’eau',
        body: 'Guide pour évaluer quand une couche logicielle aide à organiser échantillons, méthodes, lots, audit trail, revue technique, CoA, portail client et suivi commercial sans remplacer validation ni jugement réglementaire.',
        audience: 'Labs, QA/QC, distributeurs, biotech',
        region: 'Global',
        level: 'Opérationnel',
        tags: ['LIMS', 'CoA', 'Audit trail', 'AquaVerify Cloud']
      },
      {
        label: 'US EPA / RTCR',
        title: 'Conformité eau potable aux États-Unis: coliformes et contexte coliphages',
        body: 'Whitepaper pour séparer correctement RTCR, coliformes totaux, E. coli et méthodes EPA de coliphages, afin de préparer des échanges produit, plateforme ou distribution sur le marché américain.',
        audience: 'US utilities, labs, distributeurs',
        region: 'États-Unis',
        level: 'Réglementaire',
        tags: ['RTCR', 'EPA 1601/1602', 'Ground Water Rule', 'Coliphages']
      }
    ],
    it: [
      {
        label: 'Indicatori virali',
        title: 'Perché i colifagi sono l’indicatore virale di riferimento per la qualità dell’acqua',
        body: 'Guida per capire perché i colifagi aggiungono uno strato pratico di indicatore virale oltre E. coli ed enterococchi, e come collegare conteggi, ceppi ospite, controlli e revisione in un flusso tracciabile.',
        audience: 'Laboratori, utility, QC, distributori',
        region: 'Globale',
        level: 'Tecnico',
        tags: ['Colifagi somatici', 'F-specifici', 'ISO/EPA', 'Cloud']
      },
      {
        label: 'Direttiva UE',
        title: 'Direttiva europea acqua potabile e colifagi somatici',
        body: 'Risorsa per laboratori, operatori e distributori che traducono l’approccio basato sul rischio in piani di campionamento, preparazione metodologica, evidenza di trattamento e reporting tecnico.',
        audience: 'Utility, municipalità, laboratori',
        region: 'UE / Spagna',
        level: 'Regolatorio',
        tags: ['Direttiva UE', 'RD 3/2023', 'Acqua grezza', 'EN ISO 10705']
      },
      {
        label: 'Evidenza digitale',
        title: 'Livello software di evidenza per la conformità nella qualità dell’acqua',
        body: 'Guida per valutare quando uno strato software aiuta a organizzare campioni, metodi, lotti, audit trail, revisione tecnica, CoA, portale clienti e follow-up commerciale senza sostituire validazione o criterio regolatorio.',
        audience: 'Labs, QA/QC, distributori, biotech',
        region: 'Globale',
        level: 'Operativo',
        tags: ['LIMS', 'CoA', 'Audit trail', 'AquaVerify Cloud']
      },
      {
        label: 'US EPA / RTCR',
        title: 'Conformità acqua potabile negli Stati Uniti: coliformi e contesto colifagi',
        body: 'Whitepaper per separare correttamente RTCR, coliformi totali, E. coli e metodi EPA per colifagi, preparando conversazioni su prodotto, piattaforma o distribuzione nel mercato statunitense.',
        audience: 'US utilities, labs, distributori',
        region: 'Stati Uniti',
        level: 'Regolatorio',
        tags: ['RTCR', 'EPA 1601/1602', 'Ground Water Rule', 'Colifagi']
      }
    ],
    ca: [
      {
        label: 'Indicadors virals',
        title: 'Per què els colífags són l’indicador viral de referència per a la qualitat de l’aigua',
        body: 'Guia per entendre per què els colífags aporten una capa pràctica d’indicador viral més enllà d’E. coli i enterococs, i com connectar recomptes, soques hoste, controls i revisió dins un flux traçable.',
        audience: 'Laboratoris, utilities, QC, distribuïdors',
        region: 'Global',
        level: 'Tècnic',
        tags: ['Colífags somàtics', 'F-específics', 'ISO/EPA', 'Cloud']
      },
      {
        label: 'Directiva UE',
        title: 'Directiva europea d’aigua potable i colífags somàtics',
        body: 'Recurs per a laboratoris, operadors i distribuïdors que necessiten traduir l’enfocament basat en risc en plans de mostreig, preparació metodològica, evidència de tractament i reporting tècnic.',
        audience: 'Utilities, municipis, laboratoris',
        region: 'UE / Espanya',
        level: 'Regulatori',
        tags: ['Directiva UE', 'RD 3/2023', 'Aigua bruta', 'EN ISO 10705']
      },
      {
        label: 'Evidència digital',
        title: 'Capa d’evidència software per al compliment en qualitat de l’aigua',
        body: 'Guia per avaluar quan una capa software ajuda a organitzar mostres, mètodes, lots, audit trail, revisió tècnica, CoA, portal client i seguiment comercial sense substituir validació ni criteri regulatori.',
        audience: 'Labs, QA/QC, distribuïdors, biotech',
        region: 'Global',
        level: 'Operatiu',
        tags: ['LIMS', 'CoA', 'Audit trail', 'AquaVerify Cloud']
      },
      {
        label: 'EPA / RTCR EUA',
        title: 'Compliment d’aigua potable als Estats Units: coliformes i context colífags',
        body: 'Whitepaper per separar correctament RTCR, coliformes totals, E. coli i mètodes EPA de colífags, ajudant a preparar converses de producte, plataforma o distribució al mercat estatunidenc.',
        audience: 'US utilities, labs, distribuïdors',
        region: 'Estats Units',
        level: 'Regulatori',
        tags: ['RTCR', 'EPA 1601/1602', 'Ground Water Rule', 'Colífags']
      }
    ]
  }[lang] || [];
  return baseRows.map((item, index) => ({
    ...item,
    ...(overrides[index] || {})
  }));
}

function translatedRoutes(lang, rows) {
  const byLang = {
    fr: [
      ['products', 'Produits AquaVerify', 'Comparez ENUMERA, INDICA, Kits ISO/EPA et Lab Essentials pour chaque besoin analytique.'],
      ['platform', 'AquaVerify Cloud', 'Connectez échantillons, lots, lectures, CoA, CRM et portail client.'],
      ['glossary', 'Glossaire technique', 'Recherchez des définitions sur microbiologie de l’eau, LIMS, traçabilité, normes, produits et secteurs.'],
      ['industries-hub', 'Solutions par secteur', 'Reliez chaque ressource aux laboratoires, municipalités, agroalimentaire, process, bâtiments et agriculture.'],
      ['distributors', 'Distributeurs autorisés', 'Trouvez support local, stock, formation et couverture territoriale.'],
      ['oem', 'OEM et marque blanche', 'Évaluez marque privée, co-branding, packaging et options de programme technique.']
    ],
    it: [
      ['products', 'Prodotti AquaVerify', 'Confronta ENUMERA, INDICA, Kit ISO/EPA e Lab Essentials per ogni esigenza analitica.'],
      ['platform', 'AquaVerify Cloud', 'Connetti campioni, lotti, letture, CoA, CRM e portale clienti.'],
      ['glossary', 'Glossario tecnico', 'Cerca definizioni su microbiologia dell’acqua, LIMS, tracciabilità, norme, prodotti e settori.'],
      ['industries-hub', 'Soluzioni per settore', 'Traduci ogni risorsa in laboratori, municipalità, alimentare, processo, strutture e agricoltura.'],
      ['distributors', 'Distributori autorizzati', 'Trova supporto locale, inventario, formazione e copertura territoriale.'],
      ['oem', 'OEM e marca bianca', 'Valuta private label, co-branding, packaging e opzioni di programma tecnico.']
    ],
    ca: [
      ['products', 'Productes AquaVerify', 'Compara ENUMERA, INDICA, Kits ISO/EPA i Lab Essentials per a cada necessitat analítica.'],
      ['platform', 'AquaVerify Cloud', 'Connecta mostres, lots, lectures, CoA, CRM i portal client.'],
      ['glossary', 'Glossari tècnic', 'Cerca definicions de microbiologia de l’aigua, LIMS, traçabilitat, normes, productes i sectors.'],
      ['industries-hub', 'Solucions per sector', 'Tradueix cada recurs a laboratoris, municipis, alimentació, procés, instal·lacions i agricultura.'],
      ['distributors', 'Distribuïdors autoritzats', 'Troba suport local, inventari, formació i cobertura territorial.'],
      ['oem', 'OEM i marca blanca', 'Avalua marca privada, co-branding, packaging i opcions de programa tècnic.']
    ]
  };
  return byLang[lang] || rows;
}

function translatedSectors(lang, rows) {
  const byLang = {
    fr: [
      ['water-testing-labs', 'Laboratoires d’analyse d’eau', 'Réception échantillons, revue, CoA et livraison client à haut volume.'],
      ['municipal-water-testing', 'Eau municipale', 'Captage, vérification traitement, suivi réseau et preuve.'],
      ['food-beverage-water-quality', 'Agroalimentaire', 'Eau de process, plans d’hygiène, HACCP et routines QA.'],
      ['industrial-process-water', 'Eau de process industriel', 'Contrôle opérationnel, écarts et action préventive traçable.'],
      ['facility-water-risk', 'Risque hydrique bâtiments', 'Bâtiments, hôtels, santé et plans de contrôle récurrents.'],
      ['agriculture-water', 'Agriculture', 'Irrigation, eau réutilisée, parcelles et campagnes de monitoring.']
    ],
    it: [
      ['water-testing-labs', 'Laboratori analisi acqua', 'Ricezione campioni, revisione, CoA e consegna clienti ad alto volume.'],
      ['municipal-water-testing', 'Acqua municipale', 'Captazione, verifica trattamento, monitoraggio rete ed evidenze.'],
      ['food-beverage-water-quality', 'Alimenti e bevande', 'Acqua di processo, programmi igiene, HACCP e routine QA.'],
      ['industrial-process-water', 'Acqua di processo industriale', 'Controllo operativo, deviazioni e azione preventiva tracciabile.'],
      ['facility-water-risk', 'Rischio idrico nelle strutture', 'Edifici, hotel, sanità e piani di controllo ricorrenti.'],
      ['agriculture-water', 'Agricoltura', 'Irrigazione, acqua rigenerata, appezzamenti e campagne di monitoraggio.']
    ],
    ca: [
      ['water-testing-labs', 'Laboratoris d’anàlisi d’aigua', 'Recepció de mostres, revisió, CoA i entrega client amb alt volum.'],
      ['municipal-water-testing', 'Aigua municipal', 'Captació, verificació de tractament, monitoratge de xarxa i evidència.'],
      ['food-beverage-water-quality', 'Alimentació i begudes', 'Aigua de procés, programes d’higiene, APPCC i rutines QA.'],
      ['industrial-process-water', 'Aigua de procés industrial', 'Control operatiu, desviacions i acció preventiva traçable.'],
      ['facility-water-risk', 'Risc hídric en instal·lacions', 'Edificis, hotels, salut i plans de control recurrent.'],
      ['agriculture-water', 'Agricultura', 'Reg, aigua regenerada, parcel·les i campanyes de monitoratge.']
    ]
  };
  return byLang[lang] || rows;
}

function translatedProducts(lang, rows) {
  const byLang = {
    fr: [
      ['enumera', 'ENUMERA', 'Flux quantitatifs quand la décision nécessite un dénombrement, pas seulement une détection.'],
      ['indica', 'INDICA', 'Criblage présence/absence pour contrôle routinier et vérification rapide.'],
      ['standard-kits', 'Kits ISO/EPA', 'Flux techniques alignables avec des routes microbiologiques de référence.'],
      ['lab-essentials', 'Lab Essentials', 'Milieux, réactifs, contrôles et matériaux pour microbiologie de l’eau quotidienne.'],
      ['platform', 'AquaVerify Cloud', 'LIMS, CoA, traçabilité, CRM et portail client dans un seul flux.']
    ],
    it: [
      ['enumera', 'ENUMERA', 'Workflow quantitativi quando la decisione richiede un conteggio, non solo rilevazione.'],
      ['indica', 'INDICA', 'Screening presenza/assenza per controllo routinario e verifica rapida.'],
      ['standard-kits', 'Kit ISO/EPA', 'Workflow tecnici allineabili a percorsi di microbiologia di riferimento.'],
      ['lab-essentials', 'Lab Essentials', 'Terreni, reagenti, controlli e materiali per la microbiologia dell’acqua quotidiana.'],
      ['platform', 'AquaVerify Cloud', 'LIMS, CoA, tracciabilità, CRM e portale clienti in un unico flusso.']
    ],
    ca: [
      ['enumera', 'ENUMERA', 'Fluxos quantitatius quan la decisió necessita recompte, no només detecció.'],
      ['indica', 'INDICA', 'Cribratge presència/absència per a control rutinari i verificació ràpida.'],
      ['standard-kits', 'Kits ISO/EPA', 'Fluxos tècnics alineables amb rutes de microbiologia orientades a referència.'],
      ['lab-essentials', 'Lab Essentials', 'Medis, reactius, controls i materials per a microbiologia de l’aigua diària.'],
      ['platform', 'AquaVerify Cloud', 'LIMS, CoA, traçabilitat, CRM i portal client en un únic flux.']
    ]
  };
  return byLang[lang] || rows;
}

function translatedFaqs(lang, rows) {
  const byLang = {
    fr: [
      ['À qui s’adressent ces ressources?', 'Aux laboratoires, utilities, distributeurs, équipes qualité de l’eau, industries réglementées et entreprises qui évaluent des produits de microbiologie de l’eau ou des flux numériques connectés.'],
      ['Les whitepapers remplacent-ils les exigences réglementaires ou d’accréditation?', 'Non. Ce sont des ressources d’orientation technique et commerciale. La validation méthode, l’accréditation, l’autorité compétente et chaque système qualité restent déterminants.'],
      ['Puis-je utiliser ces ressources pour choisir un produit?', 'Oui. Le hub relie chaque thème à ENUMERA, INDICA, Kits ISO/EPA, Lab Essentials et AquaVerify Cloud pour rendre la conversation technique plus concrète.'],
      ['Les checklists sont-elles téléchargeables?', 'Oui. Elles peuvent être proposées comme PDFs ouverts ou connectées à un formulaire de téléchargement lorsqu’un suivi technique est nécessaire.'],
      ['AquaVerify peut-il aider après la lecture d’un guide?', 'Oui. AquaVerify peut aider à cartographier produit, plateforme, distributeur, OEM ou prochaine étape selon secteur, matrice et objectif de contrôle.']
    ],
    it: [
      ['A chi sono rivolte queste risorse?', 'A laboratori, utility, distributori, team qualità acqua, industrie regolamentate e aziende che valutano prodotti di microbiologia dell’acqua o flussi digitali collegati.'],
      ['I whitepaper sostituiscono requisiti normativi o di accreditamento?', 'No. Sono risorse di orientamento tecnico e commerciale. Validazione metodo, accreditamento, autorità competente e sistema qualità restano decisivi.'],
      ['Posso usare queste risorse per scegliere un prodotto?', 'Sì. L’hub collega ogni tema a ENUMERA, INDICA, Kit ISO/EPA, Lab Essentials e AquaVerify Cloud per rendere più concreta la conversazione tecnica.'],
      ['Le checklist sono scaricabili?', 'Sì. Possono essere offerte come PDF aperti o collegate a un modulo di download quando serve follow-up tecnico.'],
      ['AquaVerify può aiutare dopo la lettura di una guida?', 'Sì. AquaVerify può aiutare a mappare prodotto, piattaforma, distributore, OEM o passo successivo secondo settore, matrice e obiettivo di controllo.']
    ],
    ca: [
      ['Per a qui són aquests recursos?', 'Per a laboratoris, utilities, distribuïdors, equips de qualitat de l’aigua, indústries regulades i empreses que avaluen productes de microbiologia de l’aigua o fluxos digitals connectats.'],
      ['Els whitepapers substitueixen requisits normatius o d’acreditació?', 'No. Són recursos d’orientació tècnica i comercial. La validació de mètode, acreditació, autoritat competent i sistema de qualitat segueixen sent decisius.'],
      ['Puc usar aquests recursos per triar producte?', 'Sí. El hub connecta cada tema amb ENUMERA, INDICA, Kits ISO/EPA, Lab Essentials i AquaVerify Cloud per facilitar una conversa tècnica més concreta.'],
      ['Els checklists són descarregables?', 'Sí. Poden oferir-se com PDF oberts o mitjançant un formulari de descàrrega quan cal seguiment tècnic posterior.'],
      ['AquaVerify pot ajudar després de llegir una guia?', 'Sí. AquaVerify pot ajudar a mapar producte, plataforma, distribuïdor, OEM o següent pas segons sector, matriu i objectiu de control.']
    ]
  };
  return byLang[lang] || rows;
}

const WHITEPAPER_CARD_LABELS = {
  fr: {
    'coliphages-indicators': 'Indicateurs viraux',
    'eu-drinking-water-directive-coliphages': 'Directive UE',
    'water-compliance-software-guide': 'Preuve numérique',
    'us-drinking-water-compliance-coliform-rule': 'US EPA / RTCR',
    'aquaverify-product-selection-guide': 'Sélection produit',
    'rd-3-2023-somatic-coliphages-guide': 'RD 3/2023',
    'iso-17025-water-laboratories-guide': 'ISO 17025',
    'water-safety-plans-traceable-control': 'Water Safety Plans',
    'food-beverage-water-microbiology-guide': 'Agroalimentaire',
    'legionella-facility-water-risk-guide': 'Legionella',
    'iso-19458-water-microbiological-sampling': 'ISO 19458',
    'excel-to-lims-water-analysis': 'Excel vers LIMS',
    'oem-white-label-water-testing-kits': 'OEM / marque blanche',
    'aquacoli-enumera-coli100-validation': 'Paper technique',
    'urban-wastewater-wbe-multiviral-valencian-region': 'Surveillance WBE',
    'viral-pollution-wastewater-mediterranean-ecosystems': 'Réutilisation eau',
    'sars-cov-2-surrogates-decay-aquatic-environments': 'Persistance SARS-CoV-2',
    'somatic-coliphage-method-comparison-water': 'Coliphages somatiques',
    'enteric-viruses-antibiotic-resistance-genes-mussels': 'Sécurité alimentaire',
    'editorial-methodology': 'Méthode éditoriale'
  },
  it: {
    'coliphages-indicators': 'Indicatori virali',
    'eu-drinking-water-directive-coliphages': 'Direttiva UE',
    'water-compliance-software-guide': 'Evidenza digitale',
    'us-drinking-water-compliance-coliform-rule': 'US EPA / RTCR',
    'aquaverify-product-selection-guide': 'Selezione prodotto',
    'rd-3-2023-somatic-coliphages-guide': 'RD 3/2023',
    'iso-17025-water-laboratories-guide': 'ISO 17025',
    'water-safety-plans-traceable-control': 'Water Safety Plans',
    'food-beverage-water-microbiology-guide': 'Alimenti e bevande',
    'legionella-facility-water-risk-guide': 'Legionella',
    'iso-19458-water-microbiological-sampling': 'ISO 19458',
    'excel-to-lims-water-analysis': 'Da Excel a LIMS',
    'oem-white-label-water-testing-kits': 'OEM / white label',
    'aquacoli-enumera-coli100-validation': 'Paper tecnico',
    'urban-wastewater-wbe-multiviral-valencian-region': 'Sorveglianza WBE',
    'viral-pollution-wastewater-mediterranean-ecosystems': 'Riuso acqua',
    'sars-cov-2-surrogates-decay-aquatic-environments': 'Persistenza SARS-CoV-2',
    'somatic-coliphage-method-comparison-water': 'Colifagi somatici',
    'enteric-viruses-antibiotic-resistance-genes-mussels': 'Sicurezza alimentare',
    'editorial-methodology': 'Metodo editoriale'
  },
  ca: {
    'coliphages-indicators': 'Indicadors virals',
    'eu-drinking-water-directive-coliphages': 'Directiva UE',
    'water-compliance-software-guide': 'Evidència digital',
    'us-drinking-water-compliance-coliform-rule': 'EPA / RTCR EUA',
    'aquaverify-product-selection-guide': 'Selecció de producte',
    'rd-3-2023-somatic-coliphages-guide': 'RD 3/2023',
    'iso-17025-water-laboratories-guide': 'ISO 17025',
    'water-safety-plans-traceable-control': 'Water Safety Plans',
    'food-beverage-water-microbiology-guide': 'Alimentació i begudes',
    'legionella-facility-water-risk-guide': 'Legionella',
    'iso-19458-water-microbiological-sampling': 'ISO 19458',
    'excel-to-lims-water-analysis': 'Excel a LIMS',
    'oem-white-label-water-testing-kits': 'OEM / marca blanca',
    'aquacoli-enumera-coli100-validation': 'Paper tècnic',
    'urban-wastewater-wbe-multiviral-valencian-region': 'Vigilància WBE',
    'viral-pollution-wastewater-mediterranean-ecosystems': 'Reutilització',
    'sars-cov-2-surrogates-decay-aquatic-environments': 'Persistència SARS-CoV-2',
    'somatic-coliphage-method-comparison-water': 'Colífags somàtics',
    'enteric-viruses-antibiotic-resistance-genes-mussels': 'Seguretat alimentària',
    'editorial-methodology': 'Mètode editorial'
  }
};

const FEATURED_WHITEPAPER_ORDER = [
  'aquacoli-enumera-coli100-validation',
  'urban-wastewater-wbe-multiviral-valencian-region',
  'viral-pollution-wastewater-mediterranean-ecosystems',
  'sars-cov-2-surrogates-decay-aquatic-environments',
  'somatic-coliphage-method-comparison-water',
  'enteric-viruses-antibiotic-resistance-genes-mussels',
  'editorial-methodology',
  'aquaverify-product-selection-guide',
  'rd-3-2023-somatic-coliphages-guide',
  'iso-17025-water-laboratories-guide',
  'iso-19458-water-microbiological-sampling',
  'excel-to-lims-water-analysis',
  'water-safety-plans-traceable-control',
  'food-beverage-water-microbiology-guide',
  'legionella-facility-water-risk-guide',
  'oem-white-label-water-testing-kits',
  'coliphages-indicators',
  'eu-drinking-water-directive-coliphages',
  'water-compliance-software-guide',
  'us-drinking-water-compliance-coliform-rule'
];

function orderWhitepapers(content) {
  if (!Array.isArray(content.whitepapers)) return content;
  const orderById = new Map(FEATURED_WHITEPAPER_ORDER.map((id, index) => [id, index]));
  return {
    ...content,
    whitepapers: [...content.whitepapers].sort((a, b) => {
      const aIndex = orderById.has(a.id) ? orderById.get(a.id) : Number.MAX_SAFE_INTEGER;
      const bIndex = orderById.has(b.id) ? orderById.get(b.id) : Number.MAX_SAFE_INTEGER;
      return aIndex - bIndex;
    })
  };
}

function withMarkdownWhitepaperSummaries(content, lang) {
  if (!Array.isArray(content.whitepapers)) return content;

  return {
    ...content,
    whitepapers: content.whitepapers.map((item) => {
      const markdown = getWhitepaperMarkdownPage(item.id, lang);
      if (!markdown) return item;

      return {
        ...item,
        label: WHITEPAPER_CARD_LABELS[lang]?.[item.id] || item.label,
        title: markdown.title || item.title,
        body: markdown.metaDescription || item.body,
        audience: markdown.audience || item.audience,
        region: markdown.region || item.region,
        level: markdown.level || item.level,
        reading: markdown.readingTime || item.reading,
        tags: markdown.relatedTopics?.length ? markdown.relatedTopics.slice(0, 4) : item.tags
      };
    })
  };
}

export function getResourcesHubContent(lang = 'en') {
  const base = RESOURCE_HUB_CONTENT[lang] || cloneEnglishRows(lang, {
    ...RESOURCE_HUB_CONTENT.en,
    ...(RELATED_TRANSLATIONS[lang] || {})
  });

  if (lang === 'en' || lang === 'es') return orderWhitepapers(withMarkdownWhitepaperSummaries(base, lang));

  const fallback = RESOURCE_HUB_CONTENT.en;
  const translated = RELATED_TRANSLATIONS[lang] || {};
  return orderWhitepapers(withMarkdownWhitepaperSummaries({
    ...fallback,
    ...translated,
    intents: cloneEnglishRows(lang, fallback).intents,
    whitepapers: translatedWhitepapers(lang, fallback.whitepapers),
    checklists: cloneEnglishRows(lang, fallback).checklists,
    routes: translatedRoutes(lang, fallback.routes),
    sectors: translatedSectors(lang, fallback.sectors),
    products: translatedProducts(lang, fallback.products),
    faqs: translatedFaqs(lang, fallback.faqs)
  }, lang));
}

export function getResourcesHubFaqs(lang = 'en') {
  return getResourcesHubContent(lang).faqs.map(([question, answer]) => ({ question, answer }));
}

export function getResourcesHubSeo(lang = 'en') {
  const content = getResourcesHubContent(lang);
  return {
    title: content.title,
    description: content.lead,
    seoTitle: content.seoTitle,
    seoDescription: content.seoDescription,
    eyebrow: content.eyebrow,
    primaryCta: content.tertiaryCta,
    secondaryCta: content.primaryCta,
    faqs: getResourcesHubFaqs(lang)
  };
}
