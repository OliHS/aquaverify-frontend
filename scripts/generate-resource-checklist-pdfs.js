import fs from 'node:fs/promises';
import path from 'node:path';
import {
  getChecklistHref,
  getResourcesHubContent
} from '../utils/resourcesHubContent.js';

const LANGUAGES = ['en', 'es', 'fr', 'it', 'ca'];
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

const LABELS = {
  en: {
    badge: 'AquaVerify technical checklist',
    prepared: 'Prepared for water microbiology, traceability and product selection conversations.',
    next: 'Suggested next step',
    nextBody: 'Use this checklist to prepare a product, platform, distributor or OEM discussion with AquaVerify.',
    disclaimer: 'This document is technical orientation material. Method validation, accreditation, competent authority requirements and the quality system of each organization remain decisive.',
    page: 'Page'
  },
  es: {
    badge: 'Checklist técnico AquaVerify',
    prepared: 'Preparado para conversaciones de microbiología del agua, trazabilidad y selección de producto.',
    next: 'Siguiente paso sugerido',
    nextBody: 'Usa este checklist para preparar una conversación de producto, plataforma, distribuidor u OEM con AquaVerify.',
    disclaimer: 'Este documento es material de orientación técnica. La validación de método, acreditación, autoridad competente y sistema de calidad de cada organización siguen siendo decisivos.',
    page: 'Página'
  },
  fr: {
    badge: 'Checklist technique AquaVerify',
    prepared: 'Préparé pour les échanges microbiologie de l’eau, traçabilité et sélection produit.',
    next: 'Étape suivante suggérée',
    nextBody: 'Utilisez cette checklist pour préparer un échange produit, plateforme, distributeur ou OEM avec AquaVerify.',
    disclaimer: 'Ce document est un support d’orientation technique. La validation méthode, l’accréditation, l’autorité compétente et le système qualité de chaque organisation restent déterminants.',
    page: 'Page'
  },
  it: {
    badge: 'Checklist tecnica AquaVerify',
    prepared: 'Preparata per conversazioni su microbiologia dell’acqua, tracciabilità e selezione prodotto.',
    next: 'Prossimo passo suggerito',
    nextBody: 'Usa questa checklist per preparare una conversazione su prodotto, piattaforma, distributore o OEM con AquaVerify.',
    disclaimer: 'Questo documento è materiale di orientamento tecnico. Validazione metodo, accreditamento, autorità competente e sistema qualità di ogni organizzazione restano decisivi.',
    page: 'Pagina'
  },
  ca: {
    badge: 'Checklist tècnic AquaVerify',
    prepared: 'Preparat per a converses de microbiologia de l’aigua, traçabilitat i selecció de producte.',
    next: 'Següent pas suggerit',
    nextBody: 'Fes servir aquest checklist per preparar una conversa de producte, plataforma, distribuïdor o OEM amb AquaVerify.',
    disclaimer: 'Aquest document és material d’orientació tècnica. La validació de mètode, acreditació, autoritat competent i sistema de qualitat de cada organització continuen sent decisius.',
    page: 'Pàgina'
  }
};

const CHECKLIST_DETAIL = {
  en: {
    coliphages: [
      ['Monitoring objective', ['Define if the program is screening, routine verification, treatment performance, incident investigation or regulatory preparation.', 'Identify whether the target is somatic coliphages, F-specific coliphages or both.', 'Document how results will trigger review, resampling, escalation or operational action.']],
      ['Matrix and sampling design', ['List water matrices, sampling points, expected range and seasonality.', 'Confirm sample volume, holding time, transport conditions and acceptance criteria.', 'Define how raw water, treated water, process water or reused water are separated in records.']],
      ['Method readiness', ['Confirm host strain, culture conditions, positive and negative controls, blanks and replicate strategy.', 'Record batch, media, operator, incubation and reading evidence.', 'Prepare reporting fields for PFU, interpretation, uncertainty notes and technical review.']]
    ],
    directive: [
      ['Risk-based monitoring', ['Map catchment, source water, treatment barriers and network points where evidence is needed.', 'Identify when somatic coliphage monitoring supports risk assessment conversations.', 'Separate legal requirement, internal surveillance and technical verification objectives.']],
      ['Records and review', ['Prepare sample point history, method reference, result units and action thresholds.', 'Capture raw data, batch, operator and review status in the same evidence chain.', 'Keep notes on treatment changes, incidents, seasonality and follow-up sampling.']],
      ['Reporting package', ['Define who receives the report, which format is needed and how corrective actions are documented.', 'Link laboratory result, customer account, location and deliverable.', 'Prepare a concise summary for technical, quality and management stakeholders.']]
    ],
    lims: [
      ['Sample-to-report traceability', ['Check that each sample has customer, site, matrix, date, operator and status.', 'Link method, product, batch, instrument or bench evidence to the result.', 'Require technical review before CoA or customer portal release.']],
      ['Audit trail and permissions', ['Define who can create, edit, review, approve and publish records.', 'Keep timestamps for key changes and report generation.', 'Separate draft data, reviewed data and released reports.']],
      ['Commercial and customer workflow', ['Connect CRM account, request, quote, work order, sample and report.', 'Prepare customer portal access, report downloads and communication history.', 'Track repeat requests, sectors, products and support context.']]
    ],
    partner: [
      ['Territory and buyer fit', ['Define target countries, sectors, customer types and expected sample workflows.', 'Map current portfolio gaps and how AquaVerify products complement existing lines.', 'Identify local support, training and demo requirements.']],
      ['Operational readiness', ['Check storage, inventory, batch traceability, shipping and customer documentation needs.', 'Prepare technical support escalation and product training responsibilities.', 'Define commercial terms, minimum volumes and launch timeline.']],
      ['OEM and brand options', ['Clarify private label, co-branding, packaging language and documentation scope.', 'Define what remains AquaVerify branded and what is adapted for the partner.', 'Evaluate whether AquaVerify Cloud, CRM or portal workflows are included.']]
    ]
  },
  es: {
    coliphages: [
      ['Objetivo de monitorización', ['Define si el programa es screening, verificación rutinaria, eficacia de tratamiento, investigación de incidente o preparación regulatoria.', 'Identifica si el objetivo son colífagos somáticos, F-específicos o ambos.', 'Documenta cómo el resultado activa revisión, remuestreo, escalado o acción operativa.']],
      ['Matriz y diseño de muestreo', ['Lista matrices de agua, puntos de muestreo, rango esperado y estacionalidad.', 'Confirma volumen de muestra, tiempo de conservación, transporte y criterios de aceptación.', 'Separa en registros agua bruta, tratada, de proceso o regenerada.']],
      ['Preparación metodológica', ['Confirma cepa huésped, condiciones de cultivo, controles positivos y negativos, blancos y estrategia de réplicas.', 'Registra lote, medios, operador, incubación y evidencia de lectura.', 'Prepara campos de reporting para UFP, interpretación, notas de incertidumbre y revisión técnica.']]
    ],
    directive: [
      ['Monitorización basada en riesgo', ['Mapea captación, agua de origen, barreras de tratamiento y puntos de red donde se necesita evidencia.', 'Identifica cuándo la monitorización de colífagos somáticos ayuda en conversaciones de evaluación de riesgo.', 'Separa requisito legal, vigilancia interna y objetivo de verificación técnica.']],
      ['Registros y revisión', ['Prepara histórico de punto, referencia metodológica, unidades de resultado y umbrales de acción.', 'Captura dato bruto, lote, operador y estado de revisión en la misma cadena de evidencia.', 'Conserva notas sobre cambios de tratamiento, incidentes, estacionalidad y muestreos de seguimiento.']],
      ['Paquete de reporting', ['Define quién recibe el informe, qué formato necesita y cómo se documentan acciones correctivas.', 'Conecta resultado de laboratorio, cuenta cliente, ubicación y entregable.', 'Prepara un resumen claro para equipos técnicos, calidad y dirección.']]
    ],
    lims: [
      ['Trazabilidad muestra-informe', ['Verifica que cada muestra tenga cliente, instalación, matriz, fecha, operador y estado.', 'Conecta método, producto, lote, instrumento o evidencia de banco con el resultado.', 'Exige revisión técnica antes de emitir CoA o liberar en portal cliente.']],
      ['Audit trail y permisos', ['Define quién puede crear, editar, revisar, aprobar y publicar registros.', 'Mantén marcas temporales de cambios clave y generación de informes.', 'Separa dato en borrador, dato revisado e informe liberado.']],
      ['Flujo comercial y cliente', ['Conecta cuenta CRM, solicitud, cotización, orden de trabajo, muestra e informe.', 'Prepara acceso a portal cliente, descargas de informes e histórico de comunicación.', 'Sigue solicitudes recurrentes, sectores, productos y contexto de soporte.']]
    ],
    partner: [
      ['Territorio y encaje comprador', ['Define países objetivo, sectores, tipos de cliente y flujos de muestra esperados.', 'Mapea huecos del portfolio actual y cómo AquaVerify complementa líneas existentes.', 'Identifica necesidades de soporte local, formación y demostración.']],
      ['Preparación operativa', ['Revisa almacenamiento, inventario, trazabilidad de lote, expedición y documentación cliente.', 'Prepara escalado de soporte técnico y responsabilidades de formación producto.', 'Define condiciones comerciales, volúmenes mínimos y calendario de lanzamiento.']],
      ['Opciones OEM y marca', ['Aclara marca blanca, co-branding, idioma de packaging y alcance documental.', 'Define qué permanece con marca AquaVerify y qué se adapta al partner.', 'Evalúa si se incluye AquaVerify Cloud, CRM o portal.']]
    ]
  }
};

function localizeDetails(lang) {
  if (CHECKLIST_DETAIL[lang]) return CHECKLIST_DETAIL[lang];
  const source = CHECKLIST_DETAIL.en;
  const translations = {
    fr: {
      coliphages: ['Objectif de monitoring', 'Matrice et plan de prélèvement', 'Préparation méthodologique'],
      directive: ['Monitoring basé sur le risque', 'Registres et revue', 'Package de reporting'],
      lims: ['Traçabilité échantillon-rapport', 'Audit trail et permissions', 'Flux commercial et client'],
      partner: ['Territoire et adéquation acheteur', 'Préparation opérationnelle', 'Options OEM et marque']
    },
    it: {
      coliphages: ['Obiettivo di monitoraggio', 'Matrice e piano di campionamento', 'Preparazione metodologica'],
      directive: ['Monitoraggio basato sul rischio', 'Record e revisione', 'Pacchetto di reporting'],
      lims: ['Tracciabilità campione-report', 'Audit trail e permessi', 'Flusso commerciale e cliente'],
      partner: ['Territorio e buyer fit', 'Preparazione operativa', 'Opzioni OEM e brand']
    },
    ca: {
      coliphages: ['Objectiu de monitoratge', 'Matriu i disseny de mostreig', 'Preparació metodològica'],
      directive: ['Monitoratge basat en risc', 'Registres i revisió', 'Paquet de reporting'],
      lims: ['Traçabilitat mostra-informe', 'Audit trail i permisos', 'Flux comercial i client'],
      partner: ['Territori i encaix comprador', 'Preparació operativa', 'Opcions OEM i marca']
    }
  }[lang] || {};

  return Object.fromEntries(Object.entries(source).map(([id, sections]) => [
    id,
    sections.map(([title, items], index) => [translations[id]?.[index] || title, items])
  ]));
}

function encodeWinAnsi(value) {
  const map = new Map([
    [0x2018, 0x91], [0x2019, 0x92], [0x201C, 0x93], [0x201D, 0x94],
    [0x2013, 0x96], [0x2014, 0x97], [0x2026, 0x85], [0x20AC, 0x80]
  ]);
  const bytes = [];
  for (const char of String(value || '')) {
    const code = char.codePointAt(0);
    bytes.push(code <= 255 ? code : (map.get(code) || 0x3f));
  }
  return `<${bytes.map((byte) => byte.toString(16).padStart(2, '0')).join('')}>`;
}

function textCommand(text, x, y, size = 10, font = 'F1', color = '0 0 0') {
  return `BT /${font} ${size} Tf ${color} rg 1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm ${encodeWinAnsi(text)} Tj ET`;
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
  words.forEach((word) => {
    if (!current) {
      current = word;
    } else if (`${current} ${word}`.length <= maxChars) {
      current = `${current} ${word}`;
    } else {
      lines.push(current);
      current = word;
    }
  });
  if (current) lines.push(current);
  return lines;
}

function createDrawingContext(labels) {
  const pages = [];
  let commands = [];
  let pageNumber = 1;
  let y = PAGE.height - MARGIN;

  function footer() {
    commands.push(strokeRectCommand(MARGIN, 36, PAGE.width - (MARGIN * 2), 0.1, '0.86 0.91 0.95'));
    commands.push(textCommand(`AquaVerify · ${labels.page} ${pageNumber}`, MARGIN, 20, 8, 'F1', '0.39 0.45 0.55'));
  }

  function newPage() {
    if (commands.length) {
      footer();
      pages.push(commands.join('\n'));
    }
    commands = [];
    pageNumber += pages.length ? 1 : 0;
    y = PAGE.height - MARGIN;
  }

  function ensure(space) {
    if (y - space < 70) newPage();
  }

  function text(text, options = {}) {
    const size = options.size || 10;
    const font = options.font || 'F1';
    const color = options.color || '0.09 0.16 0.28';
    const x = options.x || MARGIN;
    const maxWidth = options.maxWidth || (PAGE.width - (MARGIN * 2));
    const lineHeight = options.lineHeight || size * 1.35;
    const maxChars = Math.max(24, Math.floor(maxWidth / (size * 0.52)));
    const lines = wrapText(text, maxChars);
    ensure((lines.length * lineHeight) + 8);
    lines.forEach((line) => {
      commands.push(textCommand(line, x, y, size, font, color));
      y -= lineHeight;
    });
    y -= options.after || 4;
  }

  function heading(textValue) {
    ensure(44);
    commands.push(rectCommand(MARGIN, y - 7, 34, 4, '0.00 0.68 0.94'));
    y -= 22;
    text(textValue, { size: 15, font: 'F2', color: '0.04 0.31 0.49', after: 8 });
  }

  function checkbox(item) {
    ensure(34);
    commands.push(strokeRectCommand(MARGIN, y - 8, 10, 10, '0.00 0.68 0.94'));
    const savedY = y;
    y += 1;
    text(item, { x: MARGIN + 18, maxWidth: PAGE.width - (MARGIN * 2) - 18, size: 9.5, lineHeight: 13, after: 3 });
    y = Math.min(y, savedY - 18);
  }

  function finalPage() {
    footer();
    pages.push(commands.join('\n'));
    return pages;
  }

  return { commands, text, heading, checkbox, ensure, finalPage, setY(value) { y = value; }, getY() { return y; } };
}

function buildPdf(title, subtitle, sections, labels) {
  const ctx = createDrawingContext(labels);

  ctx.commands.push(rectCommand(0, PAGE.height - 132, PAGE.width, 132, '0.96 0.99 1.00'));
  ctx.commands.push(rectCommand(0, PAGE.height - 132, 8, 132, '0.00 0.68 0.94'));
  ctx.commands.push(textCommand('AquaVerify', MARGIN, PAGE.height - 58, 20, 'F2', '0.04 0.31 0.49'));
  ctx.commands.push(textCommand(labels.badge, MARGIN, PAGE.height - 78, 9, 'F2', '0.00 0.68 0.94'));
  ctx.setY(PAGE.height - 122);
  ctx.text(title, { size: 20, font: 'F2', color: '0.04 0.31 0.49', lineHeight: 25, after: 8 });
  ctx.text(subtitle, { size: 10.5, color: '0.30 0.36 0.45', lineHeight: 15, after: 16 });
  ctx.text(labels.prepared, { size: 9, color: '0.39 0.45 0.55', after: 14 });

  sections.forEach(([sectionTitle, items]) => {
    ctx.heading(sectionTitle);
    items.forEach((item) => ctx.checkbox(item));
    ctx.setY(ctx.getY() - 6);
  });

  ctx.heading(labels.next);
  ctx.text(labels.nextBody, { size: 10, color: '0.30 0.36 0.45', after: 4 });
  ctx.text(labels.disclaimer, { size: 8.5, color: '0.39 0.45 0.55', lineHeight: 12, after: 0 });

  return serializePdf(ctx.finalPage());
}

function stripMarkdown(value) {
  return String(value || '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseMarkdownChecklist(source) {
  const lines = String(source || '').replace(/\r\n/g, '\n').split('\n');
  const title = stripMarkdown(lines.find((line) => /^#\s+/.test(line))?.replace(/^#\s+/, '') || 'AquaVerify checklist');
  const audience = stripMarkdown(lines.find((line) => /^\*\*Audience:/.test(line) || /^\*\*Audiencia:/.test(line) || /^\*\*Audience\s*:/.test(line)) || '');
  const region = stripMarkdown(lines.find((line) => /^\*\*Region:/.test(line) || /^\*\*Región:/.test(line) || /^\*\*Région:/.test(line) || /^\*\*Regione:/.test(line) || /^\*\*Regió:/.test(line)) || '');
  const subtitle = [audience, region].filter(Boolean).join(' · ');
  const items = lines
    .filter((line) => /^-\s+\[[ xX]\]\s+/.test(line))
    .map((line) => stripMarkdown(line.replace(/^-\s+\[[ xX]\]\s+/, '')))
    .filter(Boolean);

  const links = lines
    .filter((line) => /^-\s+\[[^\]]+\]\([^)]+\)/.test(line))
    .map((line) => stripMarkdown(line.replace(/^-\s+/, '')))
    .filter(Boolean);

  return {
    title,
    subtitle: subtitle || 'AquaVerify technical checklist',
    sections: [
      ['Checklist', items.length ? items : lines.filter((line) => /^-\s+/.test(line)).map((line) => stripMarkdown(line.replace(/^-\s+/, ''))).filter(Boolean)],
      ...(links.length ? [['Recommended links', links]] : [])
    ].filter(([, sectionItems]) => sectionItems.length)
  };
}

async function generateMarkdownChecklistPdfs() {
  let written = 0;

  for (const lang of LANGUAGES) {
    const sourceDir = path.join(MARKDOWN_CHECKLIST_SOURCE_DIR, lang);
    const targetDir = MARKDOWN_CHECKLIST_TARGET_DIRS[lang] || MARKDOWN_CHECKLIST_TARGET_DIRS.en;
    let entries = [];
    try {
      entries = await fs.readdir(sourceDir);
    } catch {
      continue;
    }

    for (const entry of entries.filter((file) => file.endsWith('.md'))) {
      const source = await fs.readFile(path.join(sourceDir, entry), 'utf8');
      const checklist = parseMarkdownChecklist(source);
      const targetPath = path.join(targetDir, entry.replace(/\.md$/, '.pdf'));
      const pdf = buildPdf(
        checklist.title,
        checklist.subtitle,
        checklist.sections,
        LABELS[lang] || LABELS.en
      );
      await fs.mkdir(path.dirname(targetPath), { recursive: true });
      await fs.writeFile(targetPath, pdf);
      written += 1;
    }
  }

  return written;
}

function serializePdf(pageContents) {
  const objects = [];
  const add = (body) => {
    objects.push(body);
    return objects.length;
  };

  const catalogId = add('<< /Type /Catalog /Pages 2 0 R >>');
  const pagesId = add('');
  const regularFontId = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
  const boldFontId = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
  const pageIds = [];
  const contentIds = [];

  pageContents.forEach((content) => {
    const stream = `<< /Length ${Buffer.byteLength(content, 'latin1')} >>\nstream\n${content}\nendstream`;
    const contentId = add(stream);
    const pageId = add(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${PAGE.width} ${PAGE.height}] /Resources << /Font << /F1 ${regularFontId} 0 R /F2 ${boldFontId} 0 R >> >> /Contents ${contentId} 0 R >>`);
    contentIds.push(contentId);
    pageIds.push(pageId);
  });

  objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`;

  let pdf = '%PDF-1.4\n';
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
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return Buffer.from(pdf, 'latin1');
}

async function main() {
  let written = 0;
  for (const lang of LANGUAGES) {
    const content = getResourcesHubContent(lang);
    const labels = LABELS[lang] || LABELS.en;
    const details = localizeDetails(lang);
    for (const [id, title, body] of content.checklists) {
      const publicHref = getChecklistHref(lang, id);
      const targetPath = path.join('public', publicHref.replace(/^\/+/, ''));
      const pdf = buildPdf(title, body, details[id] || details.coliphages, labels);
      await fs.mkdir(path.dirname(targetPath), { recursive: true });
      await fs.writeFile(targetPath, pdf);
      written += 1;
    }
  }
  written += await generateMarkdownChecklistPdfs();
  console.log(`Generated ${written} AquaVerify checklist PDFs.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
