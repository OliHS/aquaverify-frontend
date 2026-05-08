import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PRODUCT_DETAIL_DATA } from '../utils/marketingPages.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const outputPath = path.join(repoRoot, 'docs', 'product_claims_validation_matrix_2026-05-04.md');

const FAMILY_LABELS = {
  enumera: 'ENUMERA',
  indica: 'INDICA',
  'standard-kits': 'Standard ISO/EPA Kits',
  'lab-essentials': 'Lab Essentials'
};

const AMBIGUOUS_PRODUCT_IDS = new Set(['enumera-entero100']);

function text(value) {
  if (typeof value === 'string') return value;
  return value?.en || '';
}

function cell(value) {
  return String(value || '')
    .replace(/\|/g, '\\|')
    .replace(/\n/g, ' ')
    .trim();
}

function statusFor(product) {
  if (AMBIGUOUS_PRODUCT_IDS.has(product.id)) return 'Naming/parameter approval required';
  if (/\b(ISO|EPA|US-EPA)\b/i.test(product.method)) return 'Method wording approval required';
  if (product.subFamily === 'Biological Materials') return 'Handling/storage evidence required';
  if (product.subFamily.includes('Tools')) return 'Asset/specification review required';
  if (product.parentId === 'lab-essentials') return 'Technical datasheet evidence required';
  return 'Evidence review required';
}

function nextActionFor(product) {
  if (AMBIGUOUS_PRODUCT_IDS.has(product.id)) {
    return 'Confirm whether name and source description are inverted before publishing specific microorganism claims.';
  }
  if (/\b(ISO|EPA|US-EPA)\b/i.test(product.method)) {
    return 'Approve exact ISO/EPA wording by market: oriented workflow, supports workflow, or stronger claim with evidence.';
  }
  if (product.subFamily === 'Biological Materials') {
    return 'Approve storage, handling, concentration and shipping statements before adding operational claims.';
  }
  if (product.subFamily.includes('Tools')) {
    return 'Approve product photo/render, dimensions and operational description.';
  }
  return 'Attach evidence pack or approved datasheet before strengthening public wording.';
}

function safePositioning(product) {
  return `${product.name} is presented publicly as an AquaVerify ${text(product.type)} for ${text(product.parameter)} in water microbiology workflows.`;
}

const rows = PRODUCT_DETAIL_DATA.map((product) => ({
  id: product.id,
  family: FAMILY_LABELS[product.parentId] || product.parentId,
  subFamily: product.subFamily,
  product: product.name,
  parameter: text(product.parameter),
  method: product.method,
  volume: product.volume,
  format: product.format,
  status: statusFor(product),
  nextAction: nextActionFor(product),
  safePositioning: safePositioning(product)
}));

const summary = rows.reduce((acc, row) => {
  acc[row.status] = (acc[row.status] || 0) + 1;
  return acc;
}, {});

const output = [
  '# Product Claims Validation Matrix',
  '',
  'Fecha: 2026-05-04',
  '',
  'Objetivo: convertir la tabla maestra provisional en una cola de aprobacion tecnico/legal producto por producto. Esta matriz no aprueba claims; identifica que falta validar antes de endurecer el wording publico.',
  '',
  '## Resumen',
  '',
  ...Object.entries(summary)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([status, count]) => `- ${status}: ${count}`),
  '',
  '## Matriz',
  '',
  '| ID | Familia | Subfamilia | Producto | Parametro publico | Metodo / flujo | Volumen | Formato | Estado | Siguiente accion | Wording publico seguro |',
  '| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |',
  ...rows.map((row) => `| ${cell(row.id)} | ${cell(row.family)} | ${cell(row.subFamily)} | ${cell(row.product)} | ${cell(row.parameter)} | ${cell(row.method)} | ${cell(row.volume)} | ${cell(row.format)} | ${cell(row.status)} | ${cell(row.nextAction)} | ${cell(row.safePositioning)} |`),
  '',
  '## Uso Operativo',
  '',
  '- Mantener wording publico seguro hasta que cada fila tenga evidencia aprobada.',
  '- Actualizar esta matriz cuando se apruebe naming, metodo, parametro, ficha tecnica o asset real.',
  '- Despues de cada cambio de wording, ejecutar `npm run claims:audit` y `npm run cms:claims:audit`.',
  ''
].join('\n');

fs.writeFileSync(outputPath, output, 'utf8');

console.log(JSON.stringify({
  ok: true,
  output: path.relative(repoRoot, outputPath),
  products: rows.length,
  summary
}, null, 2));
