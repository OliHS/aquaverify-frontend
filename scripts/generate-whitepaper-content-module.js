import fs from 'node:fs/promises';
import path from 'node:path';

const SOURCE_DIR = path.resolve('content/whitepapers');
const OUTPUT_FILE = path.resolve('utils/whitepaperMarkdownRaw.js');

const PAGE_IDS = [
  'coliphages-indicators',
  'eu-drinking-water-directive-coliphages',
  'water-compliance-software-guide',
  'us-drinking-water-compliance-coliform-rule',
  'aquaverify-product-selection-guide',
  'rd-3-2023-somatic-coliphages-guide',
  'iso-17025-water-laboratories-guide',
  'water-safety-plans-traceable-control',
  'food-beverage-water-microbiology-guide',
  'legionella-facility-water-risk-guide',
  'iso-19458-water-microbiological-sampling',
  'excel-to-lims-water-analysis',
  'oem-white-label-water-testing-kits',
  'aquacoli-enumera-coli100-validation',
  'urban-wastewater-wbe-multiviral-valencian-region',
  'viral-pollution-wastewater-mediterranean-ecosystems',
  'sars-cov-2-surrogates-decay-aquatic-environments',
  'somatic-coliphage-method-comparison-water',
  'enteric-viruses-antibiotic-resistance-genes-mussels',
  'editorial-methodology'
];

const NEW_WHITEPAPER_FILE_MAP = {
  'aquaverify-product-selection-guide': {
    en: 'choose-aquaverify-product-water-microbiology',
    es: 'guia-elegir-producto-aquaverify',
    fr: 'choisir-produit-aquaverify-microbiologie-eau',
    it: 'scegliere-prodotto-aquaverify-microbiologia-acqua',
    ca: 'triar-producte-aquaverify-microbiologia-aigua'
  },
  'rd-3-2023-somatic-coliphages-guide': {
    en: 'rd-3-2023-somatic-coliphages-water-operators',
    es: 'rd-3-2023-colifagos-somaticos',
    fr: 'rd-3-2023-coliphages-somatiques-operateurs-eau',
    it: 'rd-3-2023-colifagi-somatici-operatori-acqua',
    ca: 'rd-3-2023-colifags-somatics-operadors-aigua'
  },
  'iso-17025-water-laboratories-guide': {
    en: 'iso-17025-water-laboratories-chain-of-custody-coa',
    es: 'iso-17025-laboratorios-analisis-agua',
    fr: 'iso-17025-laboratoires-eau-chaine-custodie-coa',
    it: 'iso-17025-laboratori-acqua-catena-custodia-coa',
    ca: 'iso-17025-laboratoris-aigua-cadena-custodia-coa'
  },
  'water-safety-plans-traceable-control': {
    en: 'water-safety-plans-traceable-control-program',
    es: 'water-safety-plans-calidad-agua',
    fr: 'water-safety-plans-programme-controle-tracable',
    it: 'water-safety-plans-programma-controllo-tracciabile',
    ca: 'water-safety-plans-programa-control-tracable'
  },
  'food-beverage-water-microbiology-guide': {
    en: 'food-beverage-water-microbiological-control-cip-audit',
    es: 'agua-industria-alimentaria-rd-3-2023',
    fr: 'eau-alimentation-boissons-controle-microbiologique-cip-audit',
    it: 'acqua-alimenti-bevande-controllo-microbiologico-cip-audit',
    ca: 'aigua-alimentacio-begudes-control-microbiologic-cip-auditoria'
  },
  'legionella-facility-water-risk-guide': {
    en: 'legionella-water-risk-management-facilities',
    es: 'legionella-gestion-riesgo-instalaciones',
    fr: 'legionella-gestion-risque-eau-installations',
    it: 'legionella-gestione-rischio-acqua-strutture',
    ca: 'legionella-gestio-risc-aigua-instalacions'
  },
  'iso-19458-water-microbiological-sampling': {
    en: 'iso-19458-water-microbiological-sampling',
    es: 'iso-19458-muestreo-microbiologico-agua',
    fr: 'iso-19458-echantillonnage-microbiologique-eau',
    it: 'iso-19458-campionamento-microbiologico-acqua',
    ca: 'iso-19458-mostreig-microbiologic-aigua'
  },
  'excel-to-lims-water-analysis': {
    en: 'excel-to-lims-water-analysis',
    es: 'excel-a-lims-analisis-agua',
    fr: 'excel-vers-lims-analyse-eau',
    it: 'da-excel-a-lims-analisi-acqua',
    ca: 'excel-a-lims-analisi-aigua'
  },
  'oem-white-label-water-testing-kits': {
    en: 'oem-white-label-water-testing-kits',
    es: 'oem-marca-blanca-kits-analisis-agua',
    fr: 'oem-marque-blanche-kits-analyse-eau',
    it: 'oem-white-label-kit-analisi-acqua',
    ca: 'oem-marca-blanca-kits-analisi-aigua'
  },
  'aquacoli-enumera-coli100-validation': {
    en: 'aquacoli-enumera-coli100-iso-9308-2-validation',
    es: 'validacion-aquacoli-enumera-coli100-iso-9308-2',
    fr: 'validation-aquacoli-enumera-coli100-iso-9308-2',
    it: 'validazione-aquacoli-enumera-coli100-iso-9308-2',
    ca: 'validacio-aquacoli-enumera-coli100-iso-9308-2'
  },
  'urban-wastewater-wbe-multiviral-valencian-region': {
    en: 'urban-wastewater-wbe-multiviral-valencian-region',
    es: 'epidemiologia-aguas-residuales-vigilancia-multiviral-valencia',
    fr: 'epidemiologie-eaux-usees-surveillance-multivirale-valence',
    it: 'epidemiologia-acque-reflue-sorveglianza-multivirale-valencia',
    ca: 'epidemiologia-aigues-residuals-vigilancia-multiviral-valencia'
  },
  'viral-pollution-wastewater-mediterranean-ecosystems': {
    en: 'viral-pollution-wastewater-mediterranean-ecosystems',
    es: 'contaminacion-viral-aguas-residuales-ecosistemas-mediterraneos',
    fr: 'pollution-virale-eaux-usees-ecosystemes-mediterraneens',
    it: 'inquinamento-virale-acque-reflue-ecosistemi-mediterranei',
    ca: 'contaminacio-viral-aigues-residuals-ecosistemes-mediterranis'
  },
  'sars-cov-2-surrogates-decay-aquatic-environments': {
    en: 'sars-cov-2-surrogates-decay-aquatic-environments',
    es: 'decaimiento-sars-cov-2-sustitutos-ambientes-acuaticos',
    fr: 'decroissance-sars-cov-2-substituts-milieux-aquatiques',
    it: 'decadimento-sars-cov-2-surrogati-ambienti-acquatici',
    ca: 'decaiment-sars-cov-2-substituts-ambients-aquatics'
  },
  'somatic-coliphage-method-comparison-water': {
    en: 'somatic-coliphage-method-comparison-water',
    es: 'comparativa-metodos-colifagos-somaticos-agua',
    fr: 'comparaison-methodes-coliphages-somatiques-eau',
    it: 'confronto-metodi-colifagi-somatici-acqua',
    ca: 'comparativa-metodes-colifags-somatics-aigua'
  },
  'enteric-viruses-antibiotic-resistance-genes-mussels': {
    en: 'enteric-viruses-antibiotic-resistance-genes-mussels',
    es: 'virus-entericos-genes-resistencia-antibioticos-mejillones',
    fr: 'virus-enteriques-genes-resistance-antibiotiques-moules',
    it: 'virus-enterici-geni-resistenza-antibiotici-cozze',
    ca: 'virus-enterics-gens-resistencia-antibiotics-musclos'
  },
  'editorial-methodology': {
    en: 'editorial-methodology',
    es: 'metodologia-editorial',
    fr: 'methodologie-editoriale',
    it: 'metodologia-editoriale',
    ca: 'metodologia-editorial-ca'
  }
};

const NEW_WHITEPAPER_FILE_TO_PAGE = Object.fromEntries(
  Object.entries(NEW_WHITEPAPER_FILE_MAP).flatMap(([pageId, byLang]) => (
    Object.entries(byLang).map(([lang, filename]) => [filename, { pageId, lang }])
  ))
);

function resolvePageId(filename) {
  const basename = filename.replace(/\.md$/, '');
  if (NEW_WHITEPAPER_FILE_TO_PAGE[basename]) {
    return NEW_WHITEPAPER_FILE_TO_PAGE[basename].pageId;
  }

  if (/^(coliphages-water-quality-indicators|colifagos-indicadores|coliphages-indicateurs|colifagi-indicatori|colifags-indicadors)/.test(filename)) {
    return 'coliphages-indicators';
  }
  if (/^(european-drinking-water-directive|directiva-europea|directive-europeenne|direttiva-europea)/.test(filename)) {
    return 'eu-drinking-water-directive-coliphages';
  }
  if (/^(water-quality-compliance-software|software-cumplimiento|logiciel-conformite|software-conformita|software-compliment)/.test(filename)) {
    return 'water-compliance-software-guide';
  }
  if (/^(us-drinking-water-compliance|eeuu-cumplimiento|etats-unis-conformite|stati-uniti-conformita|estats-units-compliment)/.test(filename)) {
    return 'us-drinking-water-compliance-coliform-rule';
  }
  return null;
}

function parseLanguage(filename, markdown) {
  const match = markdown.match(/^---\s*\n[\s\S]*?\nlanguage:\s*([a-z]{2})\s*[\s\S]*?\n---/);
  if (match?.[1]) return match[1];

  const basename = filename.replace(/\.md$/, '');
  return NEW_WHITEPAPER_FILE_TO_PAGE[basename]?.lang || null;
}

const entries = await fs.readdir(SOURCE_DIR);
const markdownFiles = entries.filter((entry) => entry.endsWith('.md') && !entry.startsWith('README_'));
const rawByPage = Object.fromEntries(PAGE_IDS.map((id) => [id, {}]));

for (const filename of markdownFiles) {
  const pageId = resolvePageId(filename);
  if (!pageId) continue;

  const markdown = await fs.readFile(path.join(SOURCE_DIR, filename), 'utf8');
  const language = parseLanguage(filename, markdown);
  if (!language) {
    throw new Error(`Missing language frontmatter in ${filename}`);
  }

  rawByPage[pageId][language] = markdown;
}

const missing = [];
for (const pageId of PAGE_IDS) {
  for (const language of ['en', 'es', 'fr', 'it', 'ca']) {
    if (!rawByPage[pageId][language]) missing.push(`${pageId}:${language}`);
  }
}

if (missing.length) {
  throw new Error(`Missing whitepaper markdown entries: ${missing.join(', ')}`);
}

const moduleBody = [
  '// Generated by scripts/generate-whitepaper-content-module.js. Do not edit by hand.',
  '',
  `export const WHITEPAPER_MARKDOWN_PAGE_IDS = Object.freeze(${JSON.stringify(PAGE_IDS, null, 2)});`,
  '',
  `export const WHITEPAPER_MARKDOWN_RAW = ${JSON.stringify(rawByPage, null, 2)};`,
  ''
].join('\n');

await fs.writeFile(OUTPUT_FILE, moduleBody);
console.log(`Generated ${path.relative(process.cwd(), OUTPUT_FILE)} from ${markdownFiles.length} markdown files.`);
