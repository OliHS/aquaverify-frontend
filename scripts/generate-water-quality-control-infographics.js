import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const outputDir = path.join(repoRoot, 'public/images/industries/water-quality-control');

async function renderPng(name, width, height, svg) {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'aq-wqc-'));
  const htmlPath = path.join(tmpDir, `${name}.html`);
  const outputPath = path.join(outputDir, `${name}.png`);
  const profilePath = path.join(tmpDir, 'chrome-profile');
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;width:${width}px;height:${height}px;background:#fff;overflow:hidden}svg{display:block}</style></head><body>${svg}</body></html>`;
  await fs.writeFile(htmlPath, html, 'utf8');
  const result = spawnSync(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--disable-extensions',
    '--hide-scrollbars',
    '--no-first-run',
    '--force-device-scale-factor=1',
    '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=1000',
    `--user-data-dir=${profilePath}`,
    `--window-size=${width},${height}`,
    `--screenshot=${outputPath}`,
    `file://${htmlPath}`
  ], { stdio: 'inherit', timeout: 15000, killSignal: 'SIGKILL' });
  const imageReady = await fs.stat(outputPath).then((stat) => stat.size > 10_000).catch(() => false);
  if (!imageReady || (result.status !== 0 && result.signal !== 'SIGKILL')) {
    throw new Error(`Chrome screenshot failed for ${name}`);
  }
}

function sampleToReportSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <linearGradient id="header" x1="0" x2="1" y1="0" y2="1">
      <stop stop-color="#073b4c"/>
      <stop offset="1" stop-color="#0f766e"/>
    </linearGradient>
    <linearGradient id="card" x1="0" x2="1" y1="0" y2="1">
      <stop stop-color="#ffffff"/>
      <stop offset="1" stop-color="#ecfeff"/>
    </linearGradient>
    <filter id="shadow" x="-12%" y="-18%" width="124%" height="136%">
      <feDropShadow dx="0" dy="14" stdDeviation="14" flood-color="#0f172a" flood-opacity=".12"/>
    </filter>
    <marker id="arrow" markerWidth="18" markerHeight="18" refX="12" refY="6" orient="auto">
      <path d="M0,0 L12,6 L0,12 Z" fill="#0e7490"/>
    </marker>
  </defs>
  <rect width="1600" height="900" fill="#f8fdfd"/>
  <rect width="1600" height="130" fill="url(#header)"/>
  <text x="70" y="70" font-family="Inter,Arial,sans-serif" font-size="42" font-weight="800" fill="#ffffff">Del plan de muestreo al informe audit-ready</text>
  <text x="70" y="108" font-family="Inter,Arial,sans-serif" font-size="22" font-weight="600" fill="#cffafe">AquaVerify conecta producto, laboratorio, trazabilidad y decisión operativa en un mismo flujo.</text>
  <g font-family="Inter,Arial,sans-serif">
    <g filter="url(#shadow)">
      <rect x="70" y="205" width="265" height="330" rx="26" fill="url(#card)" stroke="#bae6fd" stroke-width="2"/>
      <circle cx="120" cy="260" r="32" fill="#0891b2"/>
      <text x="120" y="271" text-anchor="middle" font-size="28" font-weight="800" fill="#fff">1</text>
      <text x="100" y="330" font-size="26" font-weight="800" fill="#0f172a">Plan</text>
      <text x="100" y="374" font-size="18" font-weight="600" fill="#475569">Puntos de control,</text>
      <text x="100" y="402" font-size="18" font-weight="600" fill="#475569">frecuencia, matriz y</text>
      <text x="100" y="430" font-size="18" font-weight="600" fill="#475569">riesgo microbiológico.</text>
    </g>
    <g filter="url(#shadow)">
      <rect x="380" y="205" width="265" height="330" rx="26" fill="url(#card)" stroke="#bae6fd" stroke-width="2"/>
      <circle cx="430" cy="260" r="32" fill="#0891b2"/>
      <text x="430" y="271" text-anchor="middle" font-size="28" font-weight="800" fill="#fff">2</text>
      <text x="410" y="330" font-size="26" font-weight="800" fill="#0f172a">Muestra</text>
      <text x="410" y="374" font-size="18" font-weight="600" fill="#475569">Operador, fecha,</text>
      <text x="410" y="402" font-size="18" font-weight="600" fill="#475569">ubicación, lote y</text>
      <text x="410" y="430" font-size="18" font-weight="600" fill="#475569">cadena de custodia.</text>
    </g>
    <g filter="url(#shadow)">
      <rect x="690" y="205" width="265" height="330" rx="26" fill="url(#card)" stroke="#bae6fd" stroke-width="2"/>
      <circle cx="740" cy="260" r="32" fill="#0891b2"/>
      <text x="740" y="271" text-anchor="middle" font-size="28" font-weight="800" fill="#fff">3</text>
      <text x="720" y="330" font-size="26" font-weight="800" fill="#0f172a">Análisis</text>
      <text x="720" y="374" font-size="18" font-weight="600" fill="#475569">Kit, laboratorio o</text>
      <text x="720" y="402" font-size="18" font-weight="600" fill="#475569">flujo híbrido con</text>
      <text x="720" y="430" font-size="18" font-weight="600" fill="#475569">método registrado.</text>
    </g>
    <g filter="url(#shadow)">
      <rect x="1000" y="205" width="265" height="330" rx="26" fill="url(#card)" stroke="#bae6fd" stroke-width="2"/>
      <circle cx="1050" cy="260" r="32" fill="#0891b2"/>
      <text x="1050" y="271" text-anchor="middle" font-size="28" font-weight="800" fill="#fff">4</text>
      <text x="1030" y="330" font-size="26" font-weight="800" fill="#0f172a">Validación</text>
      <text x="1030" y="374" font-size="18" font-weight="600" fill="#475569">Lectura, revision,</text>
      <text x="1030" y="402" font-size="18" font-weight="600" fill="#475569">estado y evidencia</text>
      <text x="1030" y="430" font-size="18" font-weight="600" fill="#475569">lista para auditoría.</text>
    </g>
    <g filter="url(#shadow)">
      <rect x="1310" y="205" width="220" height="330" rx="26" fill="#ecfdf5" stroke="#99f6e4" stroke-width="2"/>
      <circle cx="1360" cy="260" r="32" fill="#0f766e"/>
      <text x="1360" y="271" text-anchor="middle" font-size="28" font-weight="800" fill="#fff">5</text>
      <text x="1340" y="330" font-size="26" font-weight="800" fill="#0f172a">Acción</text>
      <text x="1340" y="374" font-size="18" font-weight="600" fill="#475569">Informe, alerta,</text>
      <text x="1340" y="402" font-size="18" font-weight="600" fill="#475569">decisión y plan de</text>
      <text x="1340" y="430" font-size="18" font-weight="600" fill="#475569">seguimiento.</text>
    </g>
    <line x1="342" y1="370" x2="365" y2="370" stroke="#0e7490" stroke-width="7" marker-end="url(#arrow)"/>
    <line x1="652" y1="370" x2="675" y2="370" stroke="#0e7490" stroke-width="7" marker-end="url(#arrow)"/>
    <line x1="962" y1="370" x2="985" y2="370" stroke="#0e7490" stroke-width="7" marker-end="url(#arrow)"/>
    <line x1="1272" y1="370" x2="1295" y2="370" stroke="#0e7490" stroke-width="7" marker-end="url(#arrow)"/>
    <rect x="170" y="642" width="1260" height="156" rx="28" fill="#fff7ed" stroke="#fed7aa" stroke-width="2"/>
    <circle cx="230" cy="720" r="30" fill="#f59e0b"/>
    <path d="M219 721l8 8 17-20" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="285" y="704" font-size="28" font-weight="800" fill="#78350f">Evidencia conectada</text>
    <text x="285" y="744" font-size="24" font-weight="600" fill="#92400e">No gestionas solo resultados: gestionas trazabilidad, decisiones y evidencia para auditorías.</text>
  </g>
</svg>`;
}

function maturitySvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="820" viewBox="0 0 1600 820">
  <defs>
    <linearGradient id="header" x1="0" x2="1" y1="0" y2="1">
      <stop stop-color="#073b4c"/>
      <stop offset="1" stop-color="#0f766e"/>
    </linearGradient>
    <filter id="shadow" x="-12%" y="-18%" width="124%" height="136%">
      <feDropShadow dx="0" dy="14" stdDeviation="14" flood-color="#0f172a" flood-opacity=".12"/>
    </filter>
    <marker id="arrow" markerWidth="18" markerHeight="18" refX="12" refY="6" orient="auto">
      <path d="M0,0 L12,6 L0,12 Z" fill="#0e7490"/>
    </marker>
  </defs>
  <rect width="1600" height="820" fill="#f8fdfd"/>
  <rect width="1600" height="130" fill="url(#header)"/>
  <text x="70" y="72" font-family="Inter,Arial,sans-serif" font-size="42" font-weight="800" fill="#ffffff">Madurez del control hídrico</text>
  <text x="70" y="110" font-family="Inter,Arial,sans-serif" font-size="22" font-weight="600" fill="#cffafe">De controles reactivos a programas trazables, comparables y predictivos.</text>
  <g font-family="Inter,Arial,sans-serif">
    <line x1="165" y1="640" x2="1435" y2="640" stroke="#0e7490" stroke-width="8" stroke-linecap="round" marker-end="url(#arrow)"/>
    <g filter="url(#shadow)">
      <rect x="120" y="220" width="300" height="340" rx="28" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
      <circle cx="350" cy="275" r="30" fill="#94a3b8"/>
      <text x="350" y="286" text-anchor="middle" font-size="26" font-weight="800" fill="#fff">1</text>
      <text x="150" y="292" font-size="28" font-weight="800" fill="#0f172a">Reactivo</text>
      <text x="150" y="348" font-size="18" font-weight="600" fill="#475569">Se actúa cuando</text>
      <text x="150" y="376" font-size="18" font-weight="600" fill="#475569">aparece una desviación</text>
      <text x="150" y="404" font-size="18" font-weight="600" fill="#475569">o una auditoría.</text>
      <rect x="150" y="462" width="220" height="52" rx="16" fill="#f1f5f9"/>
      <text x="260" y="495" text-anchor="middle" font-size="16" font-weight="800" fill="#64748b">Evidencia dispersa</text>
    </g>
    <g filter="url(#shadow)">
      <rect x="460" y="220" width="300" height="340" rx="28" fill="#ffffff" stroke="#bae6fd" stroke-width="2"/>
      <circle cx="690" cy="275" r="30" fill="#0891b2"/>
      <text x="690" y="286" text-anchor="middle" font-size="26" font-weight="800" fill="#fff">2</text>
      <text x="490" y="292" font-size="28" font-weight="800" fill="#0f172a">Controlado</text>
      <text x="490" y="348" font-size="18" font-weight="600" fill="#475569">Frecuencia, puntos y</text>
      <text x="490" y="376" font-size="18" font-weight="600" fill="#475569">métodos definidos para</text>
      <text x="490" y="404" font-size="18" font-weight="600" fill="#475569">cada tipo de agua.</text>
      <rect x="490" y="462" width="220" height="52" rx="16" fill="#ecfeff"/>
      <text x="600" y="495" text-anchor="middle" font-size="16" font-weight="800" fill="#0e7490">Programa definido</text>
    </g>
    <g filter="url(#shadow)">
      <rect x="800" y="220" width="300" height="340" rx="28" fill="#ffffff" stroke="#99f6e4" stroke-width="2"/>
      <circle cx="1030" cy="275" r="30" fill="#0f766e"/>
      <text x="1030" y="286" text-anchor="middle" font-size="26" font-weight="800" fill="#fff">3</text>
      <text x="830" y="292" font-size="28" font-weight="800" fill="#0f172a">Trazable</text>
      <text x="830" y="348" font-size="18" font-weight="600" fill="#475569">Muestra, lote, usuario,</text>
      <text x="830" y="376" font-size="18" font-weight="600" fill="#475569">lectura e informe quedan</text>
      <text x="830" y="404" font-size="18" font-weight="600" fill="#475569">conectados.</text>
      <rect x="830" y="462" width="220" height="52" rx="16" fill="#ecfdf5"/>
      <text x="940" y="495" text-anchor="middle" font-size="16" font-weight="800" fill="#047857">Histórico auditable</text>
    </g>
    <g filter="url(#shadow)">
      <rect x="1140" y="220" width="340" height="340" rx="28" fill="#ecfdf5" stroke="#5eead4" stroke-width="2"/>
      <circle cx="1410" cy="275" r="30" fill="#059669"/>
      <text x="1410" y="286" text-anchor="middle" font-size="26" font-weight="800" fill="#fff">4</text>
      <text x="1175" y="292" font-size="28" font-weight="800" fill="#0f172a">Predictivo</text>
      <text x="1175" y="348" font-size="18" font-weight="600" fill="#475569">Tendencias, alertas y</text>
      <text x="1175" y="376" font-size="18" font-weight="600" fill="#475569">decisiones antes de que</text>
      <text x="1175" y="404" font-size="18" font-weight="600" fill="#475569">el riesgo escale.</text>
      <rect x="1175" y="462" width="250" height="52" rx="16" fill="#d1fae5"/>
      <text x="1300" y="495" text-anchor="middle" font-size="16" font-weight="800" fill="#047857">Alertas y tendencias</text>
    </g>
    <rect x="210" y="700" width="1180" height="66" rx="33" fill="#ffffff" stroke="#bae6fd" stroke-width="2"/>
    <text x="800" y="743" text-anchor="middle" font-size="25" font-weight="800" fill="#0e7490">Evalúa tu nivel de madurez del control hídrico en 15 minutos</text>
  </g>
</svg>`;
}

await fs.mkdir(outputDir, { recursive: true });
await renderPng('sample-to-report-clean', 1600, 900, sampleToReportSvg());
await renderPng('water-control-maturity-clean', 1600, 820, maturitySvg());
