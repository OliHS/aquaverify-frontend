import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { MARKETING_LANGUAGES, MARKETING_PAGES, LANGUAGE_NAMES } from '../utils/marketingPages.js';
import {
  getProductDatasheetPath,
  getProductHeroImagePath
} from '../utils/productAssets.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const imageDir = path.join(repoRoot, 'public', 'images', 'products', 'marketing');
const datasheetDir = path.join(repoRoot, 'public', 'datasheets', 'products');

const FAMILY_STYLES = {
  products: { name: 'Product Ecosystem', primary: '#075985', secondary: '#0f766e', soft: '#ecfeff' },
  enumera: { name: 'ENUMERA', primary: '#075985', secondary: '#0891b2', soft: '#ecfeff' },
  indica: { name: 'INDICA', primary: '#0f766e', secondary: '#16a34a', soft: '#ecfdf5' },
  'standard-kits': { name: 'Standard Kits', primary: '#1d4ed8', secondary: '#7c3aed', soft: '#eef2ff' },
  'lab-essentials': { name: 'Lab Essentials', primary: '#334155', secondary: '#0e7490', soft: '#f8fafc' }
};

const UI = {
  en: {
    language: 'Language',
    overview: 'Overview',
    sections: 'Technical context',
    productPage: 'Product page',
    contact: 'Request quote',
    noticeTitle: 'Technical note',
    notice: 'This public datasheet is a commercial and technical orientation document generated from AquaVerify public product content. Method references are workflow-alignment references unless a final market-specific claim is approved.',
    print: 'Print / save as PDF'
  },
  es: {
    language: 'Idioma',
    overview: 'Resumen',
    sections: 'Contexto tecnico',
    productPage: 'Pagina de producto',
    contact: 'Solicitar cotizacion',
    noticeTitle: 'Nota tecnica',
    notice: 'Esta ficha publica es un documento de orientacion comercial y tecnica generado desde el contenido publico de producto AquaVerify. Las referencias a metodos son referencias de alineacion de flujo salvo aprobacion final especifica de mercado.',
    print: 'Imprimir / guardar como PDF'
  },
  fr: {
    language: 'Langue',
    overview: 'Resume',
    sections: 'Contexte technique',
    productPage: 'Page produit',
    contact: 'Demander un devis',
    noticeTitle: 'Note technique',
    notice: 'Cette fiche publique est un document d orientation commerciale et technique genere depuis le contenu produit public AquaVerify. Les references aux methodes sont des references d alignement de flux sauf approbation finale specifique au marche.',
    print: 'Imprimer / enregistrer en PDF'
  },
  it: {
    language: 'Lingua',
    overview: 'Sintesi',
    sections: 'Contesto tecnico',
    productPage: 'Pagina prodotto',
    contact: 'Richiedi preventivo',
    noticeTitle: 'Nota tecnica',
    notice: 'Questa scheda pubblica e un documento di orientamento commerciale e tecnico generato dal contenuto pubblico prodotto AquaVerify. I riferimenti ai metodi sono riferimenti di allineamento workflow salvo approvazione finale specifica per mercato.',
    print: 'Stampa / salva come PDF'
  },
  ca: {
    language: 'Idioma',
    overview: 'Resum',
    sections: 'Context tecnic',
    productPage: 'Pagina de producte',
    contact: 'Sol.licitar pressupost',
    noticeTitle: 'Nota tecnica',
    notice: 'Aquesta fitxa publica es un document d orientacio comercial i tecnica generat des del contingut public de producte AquaVerify. Les referencies a metodes son referencies d alineacio de flux tret d aprovacio final especifica de mercat.',
    print: 'Imprimir / desar com a PDF'
  }
};

function ensureDirs() {
  fs.mkdirSync(imageDir, { recursive: true });
  fs.mkdirSync(datasheetDir, { recursive: true });
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function stripAccents(value = '') {
  return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function escapeXml(value = '') {
  return escapeHtml(stripAccents(value)).replace(/'/g, '&apos;');
}

function wrapWords(value, maxChars, maxLines = 4) {
  const words = stripAccents(value).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = word;
      if (lines.length >= maxLines) break;
    } else {
      line = candidate;
    }
  }

  if (line && lines.length < maxLines) lines.push(line);
  return lines;
}

function familyId(page) {
  if (page.parentId) return page.parentId;
  if (FAMILY_STYLES[page.id]) return page.id;
  return 'products';
}

function familyStyle(page) {
  return FAMILY_STYLES[familyId(page)] || FAMILY_STYLES.products;
}

function visualKind(page) {
  const family = familyId(page);
  if (page.id === 'products') return 'ecosystem';
  if (family === 'enumera') return page.productName ? 'enumera-product' : 'enumera-family';
  if (family === 'indica') return page.productName ? 'indica-product' : 'indica-family';
  if (family === 'standard-kits') return 'standard';
  if (family === 'lab-essentials') return 'lab';
  return 'ecosystem';
}

function productIllustration(kind, style) {
  const plate = `<circle cx="1110" cy="685" r="125" fill="rgba(255,255,255,0.78)" stroke="${style.primary}" stroke-width="8"/><circle cx="1110" cy="685" r="82" fill="${style.soft}" stroke="${style.secondary}" stroke-width="4"/><circle cx="1080" cy="660" r="10" fill="${style.secondary}"/><circle cx="1148" cy="704" r="8" fill="${style.primary}"/><circle cx="1105" cy="735" r="6" fill="${style.secondary}"/>`;
  const bottle = `<rect x="1210" y="390" width="140" height="330" rx="42" fill="rgba(255,255,255,0.82)" stroke="${style.primary}" stroke-width="8"/><rect x="1242" y="330" width="76" height="74" rx="18" fill="${style.primary}"/><rect x="1238" y="510" width="84" height="132" rx="20" fill="${style.soft}" stroke="${style.secondary}" stroke-width="4"/>`;
  const tray = `<g transform="translate(990 390)"><rect width="305" height="210" rx="30" fill="rgba(255,255,255,0.78)" stroke="${style.primary}" stroke-width="8"/>${Array.from({ length: 18 }, (_, index) => {
    const x = 36 + (index % 6) * 44;
    const y = 38 + Math.floor(index / 6) * 55;
    return `<circle cx="${x}" cy="${y}" r="15" fill="${index % 3 === 0 ? style.secondary : style.soft}" stroke="${style.primary}" stroke-width="2"/>`;
  }).join('')}</g>`;
  const device = `<g transform="translate(1025 385)"><rect width="280" height="260" rx="36" fill="rgba(255,255,255,0.84)" stroke="${style.primary}" stroke-width="8"/><rect x="40" y="42" width="200" height="118" rx="18" fill="${style.soft}" stroke="${style.secondary}" stroke-width="4"/><circle cx="102" cy="210" r="18" fill="${style.secondary}"/><circle cx="160" cy="210" r="18" fill="${style.primary}"/></g>`;
  const report = `<g transform="translate(1010 350)"><rect width="310" height="390" rx="26" fill="rgba(255,255,255,0.86)" stroke="${style.primary}" stroke-width="8"/><rect x="44" y="54" width="150" height="18" rx="9" fill="${style.primary}"/><rect x="44" y="106" width="220" height="14" rx="7" fill="${style.secondary}"/><rect x="44" y="150" width="190" height="14" rx="7" fill="#94a3b8"/><polyline points="48,278 105,225 162,250 225,185 270,205" fill="none" stroke="${style.secondary}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  const flask = `<g transform="translate(1030 350)"><path d="M115 18h120v52l120 255c22 48-13 103-66 103H62c-53 0-88-55-66-103L115 70V18Z" fill="rgba(255,255,255,0.84)" stroke="${style.primary}" stroke-width="8"/><path d="M78 286h232" stroke="${style.secondary}" stroke-width="10" stroke-linecap="round"/><circle cx="126" cy="328" r="12" fill="${style.secondary}"/><circle cx="205" cy="352" r="9" fill="${style.primary}"/></g>`;

  if (kind === 'ecosystem') return `${plate}${bottle}${report}`;
  if (kind === 'enumera-family' || kind === 'enumera-product') return `${tray}${bottle}`;
  if (kind === 'indica-family' || kind === 'indica-product') return `${bottle}${plate}`;
  if (kind === 'standard') return `${report}${plate}`;
  if (kind === 'lab') return `${flask}${plate}`;
  return `${plate}${bottle}`;
}

function svgTextLines(lines, x, y, size, color, weight = 700, lineHeight = 1.22) {
  return lines.map((line, index) =>
    `<text x="${x}" y="${y + index * size * lineHeight}" fill="${color}" font-size="${size}" font-weight="${weight}" font-family="Inter, Arial, sans-serif">${escapeXml(line)}</text>`
  ).join('');
}

function generateHeroSvg(page) {
  const content = page.translations.en;
  const style = familyStyle(page);
  const kind = visualKind(page);
  const title = page.productName || content.title;
  const subtitle = content.description;
  const titleLines = wrapWords(title, 22, 3);
  const subtitleLines = wrapWords(subtitle, 58, 3);
  const bullets = (content.sections?.[0]?.bullets || []).slice(0, 3);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(title)} AquaVerify visual</title>
  <desc id="desc">${escapeXml(subtitle)}</desc>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${style.soft}"/>
      <stop offset="55%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#dbeafe"/>
    </linearGradient>
    <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="22" stdDeviation="28" flood-color="#0f172a" flood-opacity="0.18"/>
    </filter>
  </defs>
  <rect width="1600" height="1000" fill="url(#bg)"/>
  <circle cx="1320" cy="180" r="260" fill="${style.secondary}" opacity="0.09"/>
  <circle cx="1300" cy="780" r="320" fill="${style.primary}" opacity="0.08"/>
  <g transform="translate(100 100)">
    <rect width="1400" height="800" rx="46" fill="rgba(255,255,255,0.76)" stroke="rgba(15,23,42,0.08)" filter="url(#shadow)"/>
    <rect x="0" y="0" width="1400" height="18" rx="9" fill="${style.primary}"/>
    <text x="70" y="105" fill="${style.secondary}" font-size="26" font-weight="800" letter-spacing="5" font-family="Inter, Arial, sans-serif">AQUAVERIFY</text>
    <text x="70" y="160" fill="${style.primary}" font-size="30" font-weight="900" font-family="Inter, Arial, sans-serif">${escapeXml(style.name)}</text>
    ${svgTextLines(titleLines, 70, 250, 76, '#0f172a', 900, 1.08)}
    ${svgTextLines(subtitleLines, 72, 510, 28, '#475569', 600, 1.35)}
    <g transform="translate(70 650)">
      ${bullets.map((bullet, index) => `<g transform="translate(0 ${index * 52})"><rect width="520" height="36" rx="18" fill="${style.soft}" stroke="${style.secondary}" stroke-opacity="0.28"/><circle cx="22" cy="18" r="7" fill="${style.secondary}"/><text x="46" y="24" fill="#334155" font-size="20" font-weight="700" font-family="Inter, Arial, sans-serif">${escapeXml(stripAccents(bullet).slice(0, 58))}</text></g>`).join('')}
    </g>
    <g>
      ${productIllustration(kind, style)}
    </g>
  </g>
</svg>
`;
}

function absoluteProductPath(content) {
  return `https://aquaverify.com${content.path}`;
}

function datasheetHtml(page, lang) {
  const labels = UI[lang] || UI.en;
  const content = page.translations[lang] || page.translations.en;
  const style = familyStyle(page);
  const title = content.seoTitle || content.title;
  const sections = content.sections || [];
  const heroImage = content.heroImage || getProductHeroImagePath(page.id);
  const productPageUrl = absoluteProductPath(content);
  const quoteUrl = `https://app.aquaverify.com/signup?source=corporate&intent=quote&page=${encodeURIComponent(page.id)}&lang=${encodeURIComponent(lang)}`;

  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)} | AquaVerify</title>
  <style>
    :root { --primary: ${style.primary}; --secondary: ${style.secondary}; --soft: ${style.soft}; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: Arial, Helvetica, sans-serif; color: #0f172a; background: #f8fafc; }
    main { max-width: 1040px; margin: 0 auto; padding: 36px 22px 52px; }
    .sheet { background: white; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; box-shadow: 0 18px 50px rgba(15,23,42,.08); }
    .hero { display: grid; grid-template-columns: 1.05fr .95fr; gap: 28px; padding: 42px; background: linear-gradient(135deg, var(--soft), #fff); border-top: 12px solid var(--primary); }
    .brand { color: var(--secondary); font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: .24em; }
    h1 { margin: 14px 0 14px; font-size: 38px; line-height: 1.05; color: var(--primary); }
    .desc { color: #475569; font-size: 17px; line-height: 1.62; }
    .visual { align-self: center; border: 1px solid #dbeafe; border-radius: 10px; overflow: hidden; background: white; }
    .visual img { display: block; width: 100%; height: auto; }
    .content { padding: 34px 42px 42px; }
    .meta { display: flex; flex-wrap: wrap; gap: 10px; margin: 22px 0 0; }
    .pill { border: 1px solid #cbd5e1; border-radius: 999px; padding: 8px 12px; color: #334155; font-size: 12px; font-weight: 800; background: white; }
    h2 { margin: 30px 0 10px; color: #0f172a; font-size: 22px; }
    p, li { color: #475569; line-height: 1.65; font-size: 15px; }
    ul { padding-left: 20px; margin-top: 10px; }
    .notice { margin-top: 34px; padding: 18px 20px; border-left: 5px solid var(--secondary); background: #f8fafc; border-radius: 8px; }
    .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
    a, button { border: 0; border-radius: 6px; padding: 12px 16px; font-weight: 900; text-decoration: none; cursor: pointer; }
    a.primary { background: var(--primary); color: white; }
    a.secondary, button { background: white; color: var(--primary); border: 1px solid #cbd5e1; }
    footer { padding: 18px 42px 34px; color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0; }
    @media (max-width: 780px) { .hero { grid-template-columns: 1fr; padding: 28px; } .content { padding: 26px 28px 34px; } h1 { font-size: 30px; } footer { padding: 18px 28px 30px; } }
    @media print { body { background: white; } main { max-width: none; padding: 0; } .sheet { border: 0; box-shadow: none; border-radius: 0; } .actions { display: none; } }
  </style>
</head>
<body>
  <main>
    <article class="sheet">
      <section class="hero">
        <div>
          <div class="brand">AquaVerify</div>
          <h1>${escapeHtml(title)}</h1>
          <p class="desc">${escapeHtml(content.description)}</p>
          <div class="meta">
            <span class="pill">${escapeHtml(content.eyebrow || 'AquaVerify')}</span>
            <span class="pill">${escapeHtml(labels.language)}: ${escapeHtml(LANGUAGE_NAMES[lang] || lang)}</span>
          </div>
        </div>
        <div class="visual"><img src="${escapeHtml(heroImage)}" alt="${escapeHtml(content.heroImageAlt || title)}" /></div>
      </section>
      <section class="content">
        <h2>${escapeHtml(labels.overview)}</h2>
        <p>${escapeHtml(content.description)}</p>
        <h2>${escapeHtml(labels.sections)}</h2>
        ${sections.map((section) => `<section><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.body)}</p>${section.bullets?.length ? `<ul>${section.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}</ul>` : ''}</section>`).join('')}
        <div class="notice">
          <strong>${escapeHtml(labels.noticeTitle)}</strong>
          <p>${escapeHtml(labels.notice)}</p>
        </div>
        <div class="actions">
          <a class="primary" href="${escapeHtml(productPageUrl)}">${escapeHtml(labels.productPage)}</a>
          <a class="secondary" href="${escapeHtml(quoteUrl)}">${escapeHtml(labels.contact)}</a>
          <button onclick="window.print()">${escapeHtml(labels.print)}</button>
        </div>
      </section>
      <footer>AquaVerify | ${escapeHtml(new Date().getUTCFullYear())}</footer>
    </article>
  </main>
</body>
</html>
`;
}

function run() {
  ensureDirs();
  const products = MARKETING_PAGES.filter((page) => page.category === 'products');
  const written = [];

  for (const page of products) {
    const imagePath = path.join(repoRoot, 'public', getProductHeroImagePath(page.id));
    fs.writeFileSync(imagePath, generateHeroSvg(page), 'utf8');
    written.push(path.relative(repoRoot, imagePath));

    for (const lang of MARKETING_LANGUAGES) {
      const datasheetPath = path.join(repoRoot, 'public', getProductDatasheetPath(page.id, lang));
      fs.writeFileSync(datasheetPath, datasheetHtml(page, lang), 'utf8');
      written.push(path.relative(repoRoot, datasheetPath));
    }
  }

  console.log(JSON.stringify({
    ok: true,
    productPages: products.length,
    heroImages: products.length,
    datasheets: products.length * MARKETING_LANGUAGES.length,
    outputFiles: written.length,
    sample: written.slice(0, 12)
  }, null, 2));
}

run();
