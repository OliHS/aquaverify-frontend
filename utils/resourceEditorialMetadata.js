export const EDITORIAL_TYPES = Object.freeze({
  PEER_REVIEWED_RESEARCH: 'peer-reviewed-research',
  EXTERNAL_RESEARCH_SUMMARY: 'external-research-summary',
  AQUAVERIFY_VALIDATION_REPORT: 'aquaverify-validation-report',
  CONFERENCE_COMMUNICATION: 'conference-communication',
  TECHNICAL_GUIDE: 'technical-guide',
  OPERATIONAL_CHECKLIST: 'operational-checklist',
  REGULATORY_NOTE: 'regulatory-note'
});

export const EDITORIAL_TYPE_LABELS = Object.freeze({
  en: {
    [EDITORIAL_TYPES.PEER_REVIEWED_RESEARCH]: 'Peer-reviewed research',
    [EDITORIAL_TYPES.EXTERNAL_RESEARCH_SUMMARY]: 'External research summary',
    [EDITORIAL_TYPES.AQUAVERIFY_VALIDATION_REPORT]: 'AquaVerify validation report',
    [EDITORIAL_TYPES.CONFERENCE_COMMUNICATION]: 'Conference communication',
    [EDITORIAL_TYPES.TECHNICAL_GUIDE]: 'Technical guide',
    [EDITORIAL_TYPES.OPERATIONAL_CHECKLIST]: 'Operational checklist',
    [EDITORIAL_TYPES.REGULATORY_NOTE]: 'Regulatory note'
  },
  es: {
    [EDITORIAL_TYPES.PEER_REVIEWED_RESEARCH]: 'Investigación revisada por pares',
    [EDITORIAL_TYPES.EXTERNAL_RESEARCH_SUMMARY]: 'Resumen de investigación externa',
    [EDITORIAL_TYPES.AQUAVERIFY_VALIDATION_REPORT]: 'Informe de validación AquaVerify',
    [EDITORIAL_TYPES.CONFERENCE_COMMUNICATION]: 'Comunicación a congreso',
    [EDITORIAL_TYPES.TECHNICAL_GUIDE]: 'Guía técnica',
    [EDITORIAL_TYPES.OPERATIONAL_CHECKLIST]: 'Checklist operativo',
    [EDITORIAL_TYPES.REGULATORY_NOTE]: 'Nota regulatoria'
  },
  fr: {
    [EDITORIAL_TYPES.PEER_REVIEWED_RESEARCH]: 'Recherche évaluée par les pairs',
    [EDITORIAL_TYPES.EXTERNAL_RESEARCH_SUMMARY]: 'Résumé de recherche externe',
    [EDITORIAL_TYPES.AQUAVERIFY_VALIDATION_REPORT]: 'Rapport de validation AquaVerify',
    [EDITORIAL_TYPES.CONFERENCE_COMMUNICATION]: 'Communication de congrès',
    [EDITORIAL_TYPES.TECHNICAL_GUIDE]: 'Guide technique',
    [EDITORIAL_TYPES.OPERATIONAL_CHECKLIST]: 'Checklist opérationnelle',
    [EDITORIAL_TYPES.REGULATORY_NOTE]: 'Note réglementaire'
  },
  it: {
    [EDITORIAL_TYPES.PEER_REVIEWED_RESEARCH]: 'Ricerca peer-reviewed',
    [EDITORIAL_TYPES.EXTERNAL_RESEARCH_SUMMARY]: 'Sintesi di ricerca esterna',
    [EDITORIAL_TYPES.AQUAVERIFY_VALIDATION_REPORT]: 'Report di validazione AquaVerify',
    [EDITORIAL_TYPES.CONFERENCE_COMMUNICATION]: 'Comunicazione a congresso',
    [EDITORIAL_TYPES.TECHNICAL_GUIDE]: 'Guida tecnica',
    [EDITORIAL_TYPES.OPERATIONAL_CHECKLIST]: 'Checklist operativa',
    [EDITORIAL_TYPES.REGULATORY_NOTE]: 'Nota regolatoria'
  },
  ca: {
    [EDITORIAL_TYPES.PEER_REVIEWED_RESEARCH]: 'Recerca revisada per parells',
    [EDITORIAL_TYPES.EXTERNAL_RESEARCH_SUMMARY]: 'Resum de recerca externa',
    [EDITORIAL_TYPES.AQUAVERIFY_VALIDATION_REPORT]: 'Informe de validació AquaVerify',
    [EDITORIAL_TYPES.CONFERENCE_COMMUNICATION]: 'Comunicació a congrés',
    [EDITORIAL_TYPES.TECHNICAL_GUIDE]: 'Guia tècnica',
    [EDITORIAL_TYPES.OPERATIONAL_CHECKLIST]: 'Checklist operatiu',
    [EDITORIAL_TYPES.REGULATORY_NOTE]: 'Nota regulatòria'
  }
});

export const RESOURCE_EDITORIAL_METADATA = Object.freeze({
  'aquacoli-enumera-coli100-validation': {
    editorialType: EDITORIAL_TYPES.AQUAVERIFY_VALIDATION_REPORT,
    pageAuthor: 'AquaVerify',
    publisher: 'AquaVerify',
    dateModified: '2026-06-18',
    documentStatus: 'Internal validation manuscript and supplementary material',
    pdfPolicy: 'own-resource',
    interests: 'AquaVerify is the publisher and product owner for this validation resource.',
    studyDesign: 'Method-comparison validation manuscript for a chromogenic MPN workflow.',
    matrices: 'Drinking water, surface water, wastewater, reclaimed water and seawater',
    comparatorMethod: 'ISO 9308-2 reference workflow',
    limitations: 'Laboratory verification, accreditation scope and competent-authority requirements remain decisive before routine implementation.'
  },
  'urban-wastewater-wbe-multiviral-valencian-region': {
    editorialType: EDITORIAL_TYPES.EXTERNAL_RESEARCH_SUMMARY,
    pageAuthor: 'AquaVerify',
    publisher: 'AquaVerify',
    dateModified: '2026-06-18',
    originalTitle: 'Urban wastewater-based epidemiology for multi-viral pathogen surveillance in the Valencian region, Spain',
    originalAuthors: 'Inés Girón-Guzmán, Enric Cuevas-Ferrando, Regino Barranquero, Azahara Díaz-Reolid, Pablo Puchades-Colera, Irene Falcó, Alba Pérez-Cataluña and Gloria Sánchez',
    journal: 'Water Research',
    year: '2024',
    doi: '10.1016/j.watres.2024.121463',
    sourceUrl: 'https://doi.org/10.1016/j.watres.2024.121463',
    peerReviewStatus: 'Original study published in a peer-reviewed journal',
    relationToAquaVerify: 'AquaVerify summarizes the published study for educational resource navigation.',
    pdfPolicy: 'link-official-source',
    limitations: 'The AquaVerify page is a summary and does not replace the original article, journal record or full methodological review.'
  },
  'viral-pollution-wastewater-mediterranean-ecosystems': {
    editorialType: EDITORIAL_TYPES.EXTERNAL_RESEARCH_SUMMARY,
    pageAuthor: 'AquaVerify',
    publisher: 'AquaVerify',
    dateModified: '2026-06-18',
    originalTitle: 'Evaluating Viral Pollution in Wastewater and Mediterranean Ecosystems',
    originalAuthors: 'Pablo Puchades-Colera, Inés Girón-Guzmán, Enric Cuevas-Ferrando, Azahara Díaz-Reolid, Irene Falcó and collaborators',
    journal: 'Food and Environmental Virology',
    year: '2026',
    doi: '10.1007/s12560-026-09693-3',
    sourceUrl: 'https://doi.org/10.1007/s12560-026-09693-3',
    peerReviewStatus: 'Original study published in a peer-reviewed journal',
    relationToAquaVerify: 'AquaVerify summarizes the published study for educational resource navigation.',
    pdfPolicy: 'link-official-source',
    limitations: 'The AquaVerify page is a summary and does not replace the original article, journal record or full methodological review.'
  },
  'sars-cov-2-surrogates-decay-aquatic-environments': {
    editorialType: EDITORIAL_TYPES.EXTERNAL_RESEARCH_SUMMARY,
    pageAuthor: 'AquaVerify',
    publisher: 'AquaVerify',
    dateModified: '2026-06-18',
    originalTitle: 'Decay of infectious SARS-CoV-2 and surrogates in aquatic environments',
    originalAuthors: 'Laura Sala-Comorera, Liam J. Reynolds, Niamh A. Martin, John J. O’Sullivan, Wim G. Meijer and Nicola F. Fletcher',
    journal: 'Water Research',
    year: '2021',
    doi: '10.1016/j.watres.2021.117090',
    sourceUrl: 'https://doi.org/10.1016/j.watres.2021.117090',
    peerReviewStatus: 'Original study published in a peer-reviewed journal',
    relationToAquaVerify: 'AquaVerify summarizes the published study for educational resource navigation.',
    pdfPolicy: 'link-official-source',
    limitations: 'The AquaVerify page is a summary and does not replace the original article, journal record or full methodological review.'
  },
  'somatic-coliphage-method-comparison-water': {
    editorialType: EDITORIAL_TYPES.CONFERENCE_COMMUNICATION,
    pageAuthor: 'AquaVerify',
    publisher: 'AquaVerify',
    dateModified: '2026-06-18',
    originalTitle: 'Estudio comparativo de dos métodos de detección y cuantificación de colifagos somáticos en agua',
    originalAuthors: 'Yaiza Santonja Martínez, Ángela Igual López, Carlos Valor Herencia, Elena Soria Soria, José Gallardo Armengot and David Ribes',
    conference: 'VI Congreso Nacional del Agua',
    year: '2024',
    peerReviewStatus: 'Conference communication; peer-review status not identified in repository evidence',
    relationToAquaVerify: 'AquaVerify summarizes the conference communication for educational resource navigation.',
    pdfPolicy: 'no-public-pdf-without-rights-evidence',
    limitations: 'Official source URL and distribution rights evidence are not present in the repository.'
  },
  'enteric-viruses-antibiotic-resistance-genes-mussels': {
    editorialType: EDITORIAL_TYPES.EXTERNAL_RESEARCH_SUMMARY,
    pageAuthor: 'AquaVerify',
    publisher: 'AquaVerify',
    dateModified: '2026-06-18',
    originalTitle: 'Presence of Potentially Infectious Human Enteric Viruses and Antibiotic Resistance Genes in Mussels from the Campania Region, Italy: Implications for Consumer’s Safety',
    originalAuthors: 'Iolanda Venuti, Enric Cuevas-Ferrando, Irene Falcó, Inés Girón-Guzmán, Marina Ceruso, Tiziana Pepe and Gloria Sánchez',
    journal: 'Food and Environmental Virology',
    year: '2025',
    doi: '10.1007/s12560-025-09635-5',
    sourceUrl: 'https://doi.org/10.1007/s12560-025-09635-5',
    peerReviewStatus: 'Original study published in a peer-reviewed journal',
    relationToAquaVerify: 'AquaVerify summarizes the published study for educational resource navigation.',
    pdfPolicy: 'link-official-source',
    limitations: 'The AquaVerify page is a summary and does not replace the original article, journal record or full methodological review.'
  },
  'editorial-methodology': {
    editorialType: EDITORIAL_TYPES.TECHNICAL_GUIDE,
    pageAuthor: 'AquaVerify',
    publisher: 'AquaVerify',
    dateModified: '2026-06-18',
    documentStatus: 'Editorial methodology page',
    pdfPolicy: 'html-only'
  }
});

export function getResourceEditorialMeta(resourceId) {
  return RESOURCE_EDITORIAL_METADATA[resourceId] || {
    editorialType: EDITORIAL_TYPES.TECHNICAL_GUIDE,
    pdfPolicy: 'html-only'
  };
}

export function getEditorialTypeLabel(resourceId, lang = 'en') {
  const type = getResourceEditorialMeta(resourceId).editorialType;
  return EDITORIAL_TYPE_LABELS[lang]?.[type] || EDITORIAL_TYPE_LABELS.en[type] || type;
}

export function getResourceSourceUrl(resourceId) {
  return getResourceEditorialMeta(resourceId).sourceUrl || '';
}
