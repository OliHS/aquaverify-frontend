import fs from 'node:fs/promises';
import path from 'node:path';
import {
  getChecklistHref,
  getResourcesHubContent
} from '../utils/resourcesHubContent.js';
import { getMarketingPagePath } from '../utils/marketingRoutes.js';
import { getResourceUiLabels } from '../utils/resourceUiLabels.js';
import {
  getWhitepaperMarkdownPage
} from '../utils/whitepaperMarkdownContent.js';
import { WHITEPAPER_MARKDOWN_RAW } from '../utils/whitepaperMarkdownRaw.js';

const LANGUAGES = ['en', 'es', 'fr', 'it', 'ca'];
const SITE_URL = 'https://aquaverify.com';
const PAGE = { width: 595.28, height: 841.89 };
const MARGIN = 46;
const MARKDOWN_CHECKLIST_SOURCE_DIR = 'content/whitepaper-checklists';
const MARKDOWN_CHECKLIST_TARGET_DIRS = {
  en: 'public/resources/checklists',
  es: 'public/es/recursos/checklists',
  fr: 'public/fr/ressources/checklists',
  it: 'public/it/risorse/checklists',
  ca: 'public/ca/recursos/checklists'
};

const RESOURCE_HUB_PATHS = {
  en: '/resources',
  es: '/es/recursos',
  fr: '/fr/ressources',
  it: '/it/risorse',
  ca: '/ca/recursos'
};

const PDF_LANG = {
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR',
  it: 'it-IT',
  ca: 'ca-ES'
};

const CHECKLIST_TO_WHITEPAPER = {
  coliphages: 'coliphages-indicators',
  directive: 'eu-drinking-water-directive-coliphages',
  lims: 'water-compliance-software-guide',
  partner: 'oem-white-label-water-testing-kits',
  product_selection: 'aquaverify-product-selection-guide',
  rd_3_2023_coliphages: 'rd-3-2023-somatic-coliphages-guide',
  iso_17025_labs: 'iso-17025-water-laboratories-guide',
  water_safety_plans: 'water-safety-plans-traceable-control',
  food_beverage_water: 'food-beverage-water-microbiology-guide',
  legionella_facilities: 'legionella-facility-water-risk-guide',
  iso_19458_sampling: 'iso-19458-water-microbiological-sampling',
  excel_to_lims: 'excel-to-lims-water-analysis',
  oem_white_label: 'oem-white-label-water-testing-kits'
};

const PRIORITY_TWO_PAGE_CHECKLISTS = new Set([
  'product_selection',
  'rd_3_2023_coliphages',
  'iso_17025_labs',
  'excel_to_lims',
  'oem_white_label'
]);

const HOW_TO_USE = {
  en: [
    'Use the checklist before selecting a product, defining a sampling plan, preparing an audit file or opening a platform discussion.',
    'Keep one completed copy with the sample plan, product decision, reviewer notes and report evidence.',
    'Confirm final method, accreditation and competent-authority requirements inside the organization quality system.'
  ],
  es: [
    'Usa el checklist antes de seleccionar producto, definir un plan de muestreo, preparar un expediente de auditoría o abrir una conversación de plataforma.',
    'Conserva una copia completada junto al plan de muestras, decisión de producto, notas de revisión y evidencia de informe.',
    'Confirma método final, acreditación y requisitos de autoridad competente dentro del sistema de calidad de la organización.'
  ],
  fr: [
    'Utilisez la checklist avant de choisir un produit, définir un plan de prélèvement, préparer un dossier audit ou ouvrir une discussion plateforme.',
    'Conservez une copie complétée avec le plan d’échantillonnage, la décision produit, les notes de revue et la preuve du rapport.',
    'Confirmez méthode finale, accréditation et exigences de l’autorité compétente dans le système qualité de l’organisation.'
  ],
  it: [
    'Usa la checklist prima di scegliere un prodotto, definire un piano di campionamento, preparare un dossier audit o aprire una discussione piattaforma.',
    'Conserva una copia completata insieme a piano campioni, decisione prodotto, note di revisione ed evidenza del report.',
    'Conferma metodo finale, accreditamento e requisiti dell’autorità competente nel sistema qualità dell’organizzazione.'
  ],
  ca: [
    'Fes servir el checklist abans de seleccionar producte, definir un pla de mostreig, preparar un expedient d’auditoria o obrir una conversa de plataforma.',
    'Conserva una còpia completada amb el pla de mostres, decisió de producte, notes de revisió i evidència d’informe.',
    'Confirma mètode final, acreditació i requisits d’autoritat competent dins el sistema de qualitat de l’organització.'
  ]
};

const NEXT_BODY = {
  en: 'Use the completed checklist to prepare a product, platform, distributor or OEM discussion with AquaVerify.',
  es: 'Usa el checklist completado para preparar una conversación de producto, plataforma, distribuidor u OEM con AquaVerify.',
  fr: 'Utilisez la checklist complétée pour préparer un échange produit, plateforme, distributeur ou OEM avec AquaVerify.',
  it: 'Usa la checklist completata per preparare una conversazione su prodotto, piattaforma, distributore o OEM con AquaVerify.',
  ca: 'Fes servir el checklist completat per preparar una conversa de producte, plataforma, distribuïdor o OEM amb AquaVerify.'
};

function absolute(pathOrUrl) {
  const value = String(pathOrUrl || '').trim();
  if (!value) return SITE_URL;
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith('/') ? value : `/${value}`}`;
}

function stripMarkdown(value) {
  return String(value || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\*\*\[([^\]]+)\]\([^)]+\)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function uniqueItems(items) {
  const seen = new Set();
  return items
    .map(stripMarkdown)
    .filter(Boolean)
    .filter((item) => {
      const key = item.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function getStrictWhitepaperPage(pageId, lang) {
  if (!WHITEPAPER_MARKDOWN_RAW?.[pageId]?.[lang]) {
    throw new Error(`Missing localized whitepaper markdown for ${pageId} (${lang})`);
  }
  const page = getWhitepaperMarkdownPage(pageId, lang);
  if (!page) throw new Error(`Unable to parse localized whitepaper markdown for ${pageId} (${lang})`);
  return page;
}

function extractWhitepaperChecklistItems(pageId, lang) {
  const page = getStrictWhitepaperPage(pageId, lang);
  const listItems = [];

  for (const block of page.blocks || []) {
    if (block.type !== 'unorderedList' && block.type !== 'orderedList') continue;
    for (const item of block.items || []) {
      const text = stripMarkdown(item.text);
      if (!text || /^https?:\/\//i.test(text)) continue;
      if (/^(cta|primary cta|secondary cta|cta principal|cta secundario|cta secondaire|cta secondario|cta secundari)\b/i.test(text)) continue;
      listItems.push(text);
    }
  }

  return {
    page,
    items: uniqueItems(listItems)
  };
}

function parseMarkdownChecklist(source, lang) {
  const labels = getResourceUiLabels(lang);
  const lines = String(source || '').replace(/\r\n/g, '\n').split('\n');
  const title = stripMarkdown(lines.find((line) => /^#\s+/.test(line))?.replace(/^#\s+/, '') || labels.checklist);
  const itemLines = lines
    .filter((line) => /^-\s+\[[ xX]\]\s+/.test(line))
    .map((line) => stripMarkdown(line.replace(/^-\s+\[[ xX]\]\s+/, '')));
  const linkLines = lines
    .filter((line) => /^-\s+\[[^\]]+\]\([^)]+\)/.test(line))
    .map((line) => stripMarkdown(line.replace(/^-\s+/, '')));
  const linkEntries = lines
    .map((line) => line.match(/^-\s+\[([^\]]+)\]\(([^)]+)\)/))
    .filter(Boolean)
    .map((match) => ({
      label: stripMarkdown(match[1]),
      url: absolute(match[2])
    }));
  const metadataLines = lines
    .filter((line) => /^\*\*[^:]+:/.test(line))
    .map(stripMarkdown);

  return {
    title,
    subtitle: metadataLines.slice(0, 2).join(' · ') || labels.prepared,
    sections: [
      { title: labels.scope, items: metadataLines },
      { title: labels.controls, items: uniqueItems(itemLines), kind: 'controls' },
      { title: labels.recommendedLinks, items: uniqueItems(linkLines), links: linkEntries }
    ].filter((section) => section.items.length || section.links?.length),
    sourceUrl: linkEntries[0]?.url || ''
  };
}

function buildHubChecklistSections({ id, title, body, lang }) {
  const labels = getResourceUiLabels(lang);
  const pageId = CHECKLIST_TO_WHITEPAPER[id];
  if (!pageId) throw new Error(`Checklist ${id} is not mapped to a localized whitepaper`);

  const { page, items } = extractWhitepaperChecklistItems(pageId, lang);
  const pageUrl = absolute(getMarketingPagePath(pageId, lang));
  const scopeItems = [
    page.audience ? `${labels.audience}: ${page.audience}` : '',
    page.region ? `${labels.region}: ${page.region}` : '',
    page.level ? `${labels.level}: ${page.level}` : '',
    page.readingTime ? `${labels.readingTime}: ${page.readingTime}` : '',
    page.relatedTopics?.length ? `${labels.relatedTopics}: ${page.relatedTopics.join(', ')}` : ''
  ].filter(Boolean);

  const controlItems = items.length >= 7 ? items : [
    body,
    ...items
  ];

  return {
    pageId,
    sourceUrl: pageUrl,
    title,
    subtitle: body,
    sections: [
      { title: labels.objective, items: [body] },
      { title: labels.scope, items: scopeItems },
      { title: labels.howToUse, items: HOW_TO_USE[lang] },
      { title: labels.controls, items: uniqueItems(controlItems), kind: 'controls' },
      {
        title: labels.evidenceToRetain,
        items: [
          `${labels.status}: ${labels.statusCompliant} / ${labels.statusPartial} / ${labels.statusNonCompliant} / ${labels.statusNotApplicable}`,
          `${labels.responsiblePerson}:`,
          `${labels.notes}:`
        ]
      },
      { title: labels.sources, items: [`${labels.associatedHtmlResource}: ${pageUrl}`], links: [{ label: pageUrl, url: pageUrl }] }
    ]
  };
}

function winAnsiBytes(value) {
  const replacements = new Map([
    ['\u2018', "'"], ['\u2019', "'"], ['\u201C', '"'], ['\u201D', '"'],
    ['\u2013', '-'], ['\u2014', '-'], ['\u2026', '...'], ['\u2022', '-'],
    ['\u2265', '>='], ['\u2264', '<='], ['\u00D7', 'x'], ['\u2212', '-'],
    ['\u0153', 'oe'], ['\u0152', 'OE'], ['\u0103', 'a'], ['\u0102', 'A']
  ]);
  const bytes = [];
  for (const char of String(value || '')) {
    const replacement = replacements.get(char);
    const source = replacement || char;
    for (const item of source) {
      const code = item.codePointAt(0);
      if (code <= 255) {
        bytes.push(code);
        continue;
      }
      const normalized = item.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      let wrote = false;
      for (const normalizedChar of normalized) {
        const normalizedCode = normalizedChar.codePointAt(0);
        if (normalizedCode <= 255) {
          bytes.push(normalizedCode);
          wrote = true;
        }
      }
      if (!wrote) bytes.push(0x20);
    }
  }
  return bytes;
}

function encodeWinAnsi(value) {
  const bytes = winAnsiBytes(value);
  return `<${bytes.map((byte) => byte.toString(16).padStart(2, '0')).join('')}>`;
}

function pdfLiteral(value) {
  return `(${String(value || '').replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')})`;
}

function pdfUtf16String(value) {
  const source = String(value || '');
  const bytes = [0xfe, 0xff];
  for (let index = 0; index < source.length; index += 1) {
    const code = source.charCodeAt(index);
    bytes.push((code >> 8) & 0xff, code & 0xff);
  }
  return `<${bytes.map((byte) => byte.toString(16).padStart(2, '0')).join('')}>`;
}

function textCommand(text, x, y, size = 10, font = 'F1', color = '0 0 0') {
  return `BT /${font} ${size} Tf ${color} rg 1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm ${encodeWinAnsi(text)} Tj ET`;
}

function lineCommand(x1, y1, x2, y2, color = '0.00 0.68 0.94') {
  return `${color} RG ${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S`;
}

function rectCommand(x, y, width, height, color) {
  return `${color} rg ${x.toFixed(2)} ${y.toFixed(2)} ${width.toFixed(2)} ${height.toFixed(2)} re f`;
}

function strokeRectCommand(x, y, width, height, color = '0.82 0.88 0.94') {
  return `${color} RG ${x.toFixed(2)} ${y.toFixed(2)} ${width.toFixed(2)} ${height.toFixed(2)} re S`;
}

function wrapText(text, maxChars) {
  const words = String(text || '').split(/\s+/).filter(Boolean);
  const lines = [];
  let current = '';
  for (const word of words) {
    if (!current) {
      current = word;
    } else if (`${current} ${word}`.length <= maxChars) {
      current = `${current} ${word}`;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function createDrawingContext(labels) {
  const pages = [];
  let commands = [];
  let annotations = [];
  let pageNumber = 1;
  let y = PAGE.height - MARGIN;

  function footer() {
    commands.push(strokeRectCommand(MARGIN, 36, PAGE.width - (MARGIN * 2), 0.1, '0.86 0.91 0.95'));
    commands.push(textCommand(`AquaVerify · ${labels.page} ${pageNumber}`, MARGIN, 20, 8, 'F1', '0.39 0.45 0.55'));
  }

  function pushPage() {
    footer();
    pages.push({ content: commands.join('\n'), annotations });
  }

  function newPage() {
    if (commands.length) pushPage();
    commands = [];
    annotations = [];
    pageNumber += 1;
    y = PAGE.height - MARGIN;
  }

  function ensure(space) {
    if (y - space < 70) newPage();
  }

  function text(textValue, options = {}) {
    const size = options.size || 10;
    const font = options.font || 'F1';
    const color = options.color || '0.09 0.16 0.28';
    const x = options.x || MARGIN;
    const maxWidth = options.maxWidth || (PAGE.width - (MARGIN * 2));
    const lineHeight = options.lineHeight || size * 1.35;
    const maxChars = Math.max(24, Math.floor(maxWidth / (size * 0.52)));
    const lines = wrapText(textValue, maxChars);
    ensure((lines.length * lineHeight) + 8);
    for (const line of lines) {
      commands.push(textCommand(line, x, y, size, font, color));
      y -= lineHeight;
    }
    y -= options.after || 4;
  }

  function link(textValue, url, options = {}) {
    const size = options.size || 9;
    const x = options.x || MARGIN;
    const maxWidth = options.maxWidth || (PAGE.width - (MARGIN * 2));
    const lineHeight = options.lineHeight || size * 1.35;
    const maxChars = Math.max(24, Math.floor(maxWidth / (size * 0.52)));
    const lines = wrapText(textValue, maxChars);
    ensure((lines.length * lineHeight) + 10);
    for (const line of lines) {
      const width = Math.min(maxWidth, Math.max(24, line.length * size * 0.5));
      commands.push(textCommand(line, x, y, size, 'F1', '0.04 0.31 0.49'));
      commands.push(lineCommand(x, y - 2, x + width, y - 2, '0.04 0.31 0.49'));
      annotations.push({ x, y: y - 3, width, height: size + 6, url });
      y -= lineHeight;
    }
    y -= options.after || 4;
  }

  function heading(textValue) {
    ensure(44);
    commands.push(rectCommand(MARGIN, y - 7, 34, 4, '0.00 0.68 0.94'));
    y -= 22;
    text(textValue, { size: 15, font: 'F2', color: '0.04 0.31 0.49', after: 8 });
  }

  function bullet(item) {
    ensure(28);
    commands.push(textCommand('-', MARGIN, y, 10, 'F2', '0.00 0.68 0.94'));
    text(item, { x: MARGIN + 18, maxWidth: PAGE.width - (MARGIN * 2) - 18, size: 9.5, lineHeight: 13, after: 3 });
  }

  function checkbox(item) {
    ensure(54);
    commands.push(strokeRectCommand(MARGIN, y - 8, 10, 10, '0.00 0.68 0.94'));
    const savedY = y;
    y += 1;
    text(item, { x: MARGIN + 18, maxWidth: PAGE.width - (MARGIN * 2) - 18, size: 9.4, lineHeight: 13, after: 3 });
    const afterItemY = Math.min(y, savedY - 18);
    y = afterItemY;
    commands.push(textCommand(`${labels.status}:`, MARGIN + 18, y, 7.7, 'F2', '0.39 0.45 0.55'));
    commands.push(textCommand(`${labels.responsiblePerson}:`, MARGIN + 114, y, 7.7, 'F2', '0.39 0.45 0.55'));
    commands.push(textCommand(`${labels.notes}:`, MARGIN + 260, y, 7.7, 'F2', '0.39 0.45 0.55'));
    y -= 14;
  }

  function finalPage() {
    pushPage();
    return pages;
  }

  return {
    commands,
    text,
    link,
    heading,
    bullet,
    checkbox,
    ensure,
    newPage,
    finalPage,
    pageCount() { return pages.length + (commands.length ? 1 : 0); },
    setY(value) { y = value; },
    getY() { return y; }
  };
}

function renderSections(ctx, sections) {
  for (const section of sections) {
    ctx.heading(section.title);
    for (const item of section.items || []) {
      if (section.kind === 'controls') ctx.checkbox(item);
      else ctx.bullet(item);
    }
    for (const item of section.links || []) {
      ctx.link(item.label, item.url);
    }
    ctx.setY(ctx.getY() - 6);
  }
}

function buildPdf({ title, subtitle, sections, labels, lang, sourceUrl, forceSecondPage = false }) {
  const ctx = createDrawingContext(labels);

  ctx.commands.push(rectCommand(0, PAGE.height - 132, PAGE.width, 132, '0.96 0.99 1.00'));
  ctx.commands.push(rectCommand(0, PAGE.height - 132, 8, 132, '0.00 0.68 0.94'));
  ctx.commands.push(textCommand('AquaVerify', MARGIN, PAGE.height - 58, 20, 'F2', '0.04 0.31 0.49'));
  ctx.commands.push(textCommand(`${labels.checklist} · ${labels.version} 2026-06-18`, MARGIN, PAGE.height - 78, 9, 'F2', '0.00 0.68 0.94'));
  ctx.setY(PAGE.height - 122);
  ctx.text(title, { size: 20, font: 'F2', color: '0.04 0.31 0.49', lineHeight: 25, after: 8 });
  ctx.text(subtitle, { size: 10.5, color: '0.30 0.36 0.45', lineHeight: 15, after: 12 });
  ctx.text(labels.prepared, { size: 9, color: '0.39 0.45 0.55', after: 14 });

  const [firstSection, ...remainingSections] = sections;
  renderSections(ctx, [firstSection].filter(Boolean));
  if (forceSecondPage && ctx.pageCount() < 2) ctx.newPage();
  renderSections(ctx, remainingSections);

  ctx.heading(labels.next);
  ctx.text(NEXT_BODY[lang], { size: 10, color: '0.30 0.36 0.45', after: 4 });
  if (sourceUrl) {
    ctx.text(`${labels.htmlResourceUrl}:`, { size: 8.5, font: 'F2', color: '0.39 0.45 0.55', after: 2 });
    ctx.link(sourceUrl, sourceUrl, { size: 8.5 });
  }
  ctx.text(labels.disclaimer, { size: 8.5, color: '0.39 0.45 0.55', lineHeight: 12, after: 0 });

  return serializePdf(ctx.finalPage(), {
    title,
    author: labels.pdfAuthor,
    subject: labels.pdfSubject,
    keywords: labels.pdfKeywords,
    creator: labels.pdfCreator,
    producer: 'AquaVerify',
    lang: PDF_LANG[lang] || 'en-US',
    date: 'D:20260618000000+02\'00\''
  });
}

function serializePdf(pages, metadata) {
  const objects = [];
  const add = (body) => {
    objects.push(body);
    return objects.length;
  };

  const catalogId = add('');
  const pagesId = add('');
  const infoId = add([
    '<<',
    `/Title ${pdfUtf16String(metadata.title)}`,
    `/Author ${pdfUtf16String(metadata.author)}`,
    `/Subject ${pdfUtf16String(metadata.subject)}`,
    `/Keywords ${pdfUtf16String(metadata.keywords)}`,
    `/Creator ${pdfUtf16String(metadata.creator)}`,
    `/Producer ${pdfUtf16String(metadata.producer)}`,
    `/CreationDate ${pdfLiteral(metadata.date)}`,
    `/ModDate ${pdfLiteral(metadata.date)}`,
    '>>'
  ].join('\n'));
  const regularFontId = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
  const boldFontId = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
  const pageIds = [];

  pages.forEach((page) => {
    const stream = `<< /Length ${Buffer.byteLength(page.content, 'latin1')} >>\nstream\n${page.content}\nendstream`;
    const contentId = add(stream);
    const annotationIds = (page.annotations || []).map((annotation) => add([
      '<< /Type /Annot /Subtype /Link',
      `/Rect [${annotation.x.toFixed(2)} ${annotation.y.toFixed(2)} ${(annotation.x + annotation.width).toFixed(2)} ${(annotation.y + annotation.height).toFixed(2)}]`,
      '/Border [0 0 0]',
      `/A << /S /URI /URI ${pdfLiteral(annotation.url)} >>`,
      '>>'
    ].join(' ')));
    const pageId = add([
      '<< /Type /Page',
      `/Parent ${pagesId} 0 R`,
      `/MediaBox [0 0 ${PAGE.width} ${PAGE.height}]`,
      `/Resources << /Font << /F1 ${regularFontId} 0 R /F2 ${boldFontId} 0 R >> >>`,
      `/Contents ${contentId} 0 R`,
      annotationIds.length ? `/Annots [${annotationIds.map((id) => `${id} 0 R`).join(' ')}]` : '',
      '>>'
    ].filter(Boolean).join(' '));
    pageIds.push(pageId);
  });

  objects[catalogId - 1] = `<< /Type /Catalog /Pages ${pagesId} 0 R /Lang ${pdfLiteral(metadata.lang)} >>`;
  objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`;

  let pdf = '%PDF-1.7\n';
  const offsets = [0];
  objects.forEach((body, index) => {
    offsets.push(Buffer.byteLength(pdf, 'latin1'));
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xrefOffset = Buffer.byteLength(pdf, 'latin1');
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R /Info ${infoId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return Buffer.from(pdf, 'latin1');
}

async function generateMarkdownChecklistPdfs() {
  let written = 0;

  for (const lang of LANGUAGES) {
    const sourceDir = path.join(MARKDOWN_CHECKLIST_SOURCE_DIR, lang);
    const targetDir = MARKDOWN_CHECKLIST_TARGET_DIRS[lang];
    const labels = getResourceUiLabels(lang);
    const entries = await fs.readdir(sourceDir);

    for (const entry of entries.filter((file) => file.endsWith('.md'))) {
      const source = await fs.readFile(path.join(sourceDir, entry), 'utf8');
      const checklist = parseMarkdownChecklist(source, lang);
      const targetPath = path.join(targetDir, entry.replace(/\.md$/, '.pdf'));
      const pdf = buildPdf({
        title: checklist.title,
        subtitle: checklist.subtitle,
        sections: checklist.sections,
        labels,
        lang,
        sourceUrl: checklist.sourceUrl || absolute(RESOURCE_HUB_PATHS[lang]),
        forceSecondPage: true
      });
      await fs.mkdir(path.dirname(targetPath), { recursive: true });
      await fs.writeFile(targetPath, pdf);
      written += 1;
    }
  }

  return written;
}

async function generateHubChecklistPdfs() {
  let written = 0;

  for (const lang of LANGUAGES) {
    const labels = getResourceUiLabels(lang);
    const content = getResourcesHubContent(lang);
    for (const [id, title, body] of content.checklists) {
      const checklist = buildHubChecklistSections({ id, title, body, lang });
      const publicHref = getChecklistHref(lang, id);
      const targetPath = path.join('public', publicHref.replace(/^\/+/, ''));
      const pdf = buildPdf({
        title: checklist.title,
        subtitle: checklist.subtitle,
        sections: checklist.sections,
        labels,
        lang,
        sourceUrl: checklist.sourceUrl,
        forceSecondPage: PRIORITY_TWO_PAGE_CHECKLISTS.has(id)
      });
      await fs.mkdir(path.dirname(targetPath), { recursive: true });
      await fs.writeFile(targetPath, pdf);
      written += 1;
    }
  }

  return written;
}

async function main() {
  const hub = await generateHubChecklistPdfs();
  const markdown = await generateMarkdownChecklistPdfs();
  console.log(`Generated ${hub + markdown} AquaVerify checklist PDFs (${hub} hub, ${markdown} markdown).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
