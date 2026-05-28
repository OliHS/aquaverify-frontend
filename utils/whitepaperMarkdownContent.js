import {
  WHITEPAPER_MARKDOWN_PAGE_IDS,
  WHITEPAPER_MARKDOWN_RAW
} from './whitepaperMarkdownRaw.js';

const WHITEPAPER_LANGUAGES = ['en', 'es', 'fr', 'it', 'ca'];

function stripQuotes(value) {
  const trimmed = String(value || '').trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

export function parseWhitepaperFrontmatter(raw) {
  const match = String(raw || '').match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (!match) {
    return { meta: {}, markdown: String(raw || '') };
  }

  const meta = {};
  match[1].split('\n').forEach((line) => {
    const field = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (!field) return;
    meta[field[1]] = stripQuotes(field[2]);
  });

  return {
    meta,
    markdown: String(raw || '').slice(match[0].length)
  };
}

function stripInlineMarkdown(value) {
  return String(value || '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s*\{#[a-zA-Z0-9_-]+\}\s*$/g, '')
    .replace(/\*\*\[([^\]]+)\]\([^)]+\)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .trim();
}

function sanitizeTrustedHtml(html) {
  return String(html || '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, '')
    .replace(/\son[a-z]+\s*=\s*'[^']*'/gi, '')
    .replace(/javascript:/gi, '');
}

function normalizeEnglishInternalLinks(markdown) {
  return String(markdown || '')
    .replace(/(href="|]\()\/en\/resources\/checklists\//g, '$1/resources/checklists/')
    .replace(/(href="|]\()\/en\/resources\b/g, '$1/resources')
    .replace(/(href="|]\()\/en\/products\/iso-epa-kits\b/g, '$1/products/standard-iso-epa-kits')
    .replace(/(href="|]\()\/en\/products\b/g, '$1/products')
    .replace(/(href="|]\()\/en\/platform\b/g, '$1/platform')
    .replace(/(href="|]\()\/en\/contact\b/g, '$1/contact')
    .replace(/(href="|]\()\/en\/distributors\b/g, '$1/distributors')
    .replace(/(href="|]\()\/en\/oem-water-testing-kits\b/g, '$1/oem-water-testing-kits')
    .replace(/(href="|]\()\/en\/industries\/water-analysis-laboratories\b/g, '$1/industries/water-testing-laboratories')
    .replace(/(href="|]\()\/en\/industries\/municipal-water-analysis\b/g, '$1/industries/municipal-water-testing')
    .replace(/(href="|]\()\/en\/industries\/water-quality-control\b/g, '$1/industries/water-quality-control')
    .replace(/(href="|]\()\/en\/industries\/food-beverage-water-quality\b/g, '$1/industries/food-beverage-water-quality')
    .replace(/(href="|]\()\/en\/industries\/industrial-process-water\b/g, '$1/industries/industrial-process-water')
    .replace(/(href="|]\()\/en\/industries\/agriculture-water-management\b/g, '$1/industries/agriculture-water-management')
    .replace(/(href="|]\()\/en\/industries\/water-risk-management-facilities\b/g, '$1/industries/facility-water-risk-management')
    .replace(/(href="|]\()\/en\/industries\/pharmaceutical-cosmetics-water-quality\b/g, '$1/industries/pharmaceutical-cosmetics-water-quality')
    .replace(/(href="|]\()\/en\/industries\/hospitality-tourism-leisure-water-quality\b/g, '$1/industries/hospitality-tourism-leisure-water-quality');
}

function normalizeLocalizedInternalLinks(markdown, lang = 'en') {
  let source = normalizeEnglishInternalLinks(markdown);

  if (lang === 'fr') {
    source = source
      .replace(/(href="|]\()\/fr\/kits-oem-analyse-eau\b/g, '$1/fr/oem-kits-analyse-eau')
      .replace(/(href="|]\()\/fr\/industries\/qualite-eau-alimentation-boissons\b/g, '$1/fr/industries/qualite-eau-agroalimentaire')
      .replace(/(href="|]\()\/fr\/industries\/gestion-risque-eau-installations\b/g, '$1/fr/industries/gestion-risque-eau-batiments');
  }

  if (lang === 'it') {
    source = source
      .replace(/(href="|]\()\/it\/kits-oem-analisi-acqua\b/g, '$1/it/oem-kit-analisi-acqua')
      .replace(/(href="|]\()\/it\/industrie\/laboratori-analisi-acqua\b/g, '$1/it/settori/laboratori-analisi-acqua')
      .replace(/(href="|]\()\/it\/industrie\/analisi-acqua-municipale\b/g, '$1/it/settori/analisi-acqua-municipale')
      .replace(/(href="|]\()\/it\/industrie\/controllo-qualita-acqua\b/g, '$1/it/settori/controllo-qualita-acqua')
      .replace(/(href="|]\()\/it\/industrie\/qualita-acqua-alimenti-bevande\b/g, '$1/it/settori/qualita-acqua-alimenti-bevande')
      .replace(/(href="|]\()\/it\/industrie\/acqua-di-processo-industriale\b/g, '$1/it/settori/acqua-processo-industriale')
      .replace(/(href="|]\()\/it\/industrie\/acqua-agricoltura\b/g, '$1/it/settori/acqua-agricoltura')
      .replace(/(href="|]\()\/it\/industrie\/gestione-rischio-acqua-strutture\b/g, '$1/it/settori/gestione-rischio-acqua-strutture')
      .replace(/(href="|]\()\/it\/industrie\/qualita-acqua-industria-farmaceutica-cosmetica\b/g, '$1/it/settori/qualita-acqua-industria-farmaceutica-cosmetica')
      .replace(/(href="|]\()\/it\/industrie\/acqua-ospitalita-turismo-tempo-libero\b/g, '$1/it/settori/acqua-ospitalita-turismo-tempo-libero');
  }

  if (lang === 'ca') {
    source = source
      .replace(/(href="|]\()\/ca\/kits-oem-analisi-aigua\b/g, '$1/ca/oem-kits-analisi-aigua')
      .replace(/(href="|]\()\/ca\/industries\/laboratoris-analisi-aigua\b/g, '$1/ca/sectors/laboratoris-analisi-aigua')
      .replace(/(href="|]\()\/ca\/industries\/analisi-aigua-municipal\b/g, '$1/ca/sectors/analisi-aigua-municipal')
      .replace(/(href="|]\()\/ca\/industries\/control-qualitat-aigua\b/g, '$1/ca/sectors/control-qualitat-aigua')
      .replace(/(href="|]\()\/ca\/industries\/qualitat-aigua-alimentacio-begudes\b/g, '$1/ca/sectors/qualitat-aigua-alimentacio-begudes')
      .replace(/(href="|]\()\/ca\/industries\/aigua-de-proces-industrial\b/g, '$1/ca/sectors/aigua-proces-industrial')
      .replace(/(href="|]\()\/ca\/industries\/aigua-agricultura\b/g, '$1/ca/sectors/aigua-agricultura')
      .replace(/(href="|]\()\/ca\/industries\/gestio-risc-aigua-instalacions\b/g, '$1/ca/sectors/gestio-risc-aigua-installacions')
      .replace(/(href="|]\()\/ca\/industries\/qualitat-aigua-industria-farmaceutica-cosmetica\b/g, '$1/ca/sectors/qualitat-aigua-industria-farmaceutica-cosmetica')
      .replace(/(href="|]\()\/ca\/industries\/aigua-hostaleria-turisme-oci\b/g, '$1/ca/sectors/aigua-hostaleria-turisme-oci');
  }

  return source;
}

function removeLeadingDivBlock(markdown, className) {
  const source = String(markdown || '').replace(/^\s+/, '');
  if (!source.startsWith(`<div class="${className}">`)) return String(markdown || '');

  const tagPattern = /<\/?div\b[^>]*>/gi;
  let depth = 0;
  let match;

  while ((match = tagPattern.exec(source)) !== null) {
    const closing = match[0].startsWith('</');
    depth += closing ? -1 : 1;
    if (depth === 0) {
      return source.slice(match.index + match[0].length).replace(/^\s+/, '');
    }
  }

  return source;
}

function normalizeWhitepaperMarkdown(markdown, lang = 'en') {
  let body = String(markdown || '').replace(/\r\n/g, '\n');
  body = removeLeadingDivBlock(body, 'aqv-hero');
  body = body
    .replace(/<div class="aqv-(toc|checklist|cta|ref)">\s*/g, '')
    .replace(/\*\*\s*(?:(?:CTA\s+)?(?:principal|principale|primaire|primari|secundario|secondaire|secondario|secundari)|(?:primary|secondary)\s+CTA)\s*:?\s*\*\*\s*/gi, '');

  return normalizeLocalizedInternalLinks(body, lang);
}

function countTagOccurrences(line, tagName) {
  const source = String(line || '');
  const open = [...source.matchAll(new RegExp(`<${tagName}\\b(?![^>]*\\/>)`, 'gi'))].length;
  const close = [...source.matchAll(new RegExp(`</${tagName}>`, 'gi'))].length;
  return open - close;
}

function collectHtmlBlock(lines, startIndex) {
  const first = lines[startIndex]?.trim() || '';
  const match = first.match(/^<([a-zA-Z][a-zA-Z0-9-]*)\b/);
  if (!match) return null;

  const tagName = match[1].toLowerCase();
  const blockLines = [];
  let index = startIndex;
  let depth = 0;

  while (index < lines.length) {
    const line = lines[index] || '';
    blockLines.push(line);
    depth += countTagOccurrences(line, tagName);
    index += 1;

    if (depth <= 0) break;
    if (index < lines.length && !lines[index].trim() && tagName === 'a') break;
  }

  return {
    html: sanitizeTrustedHtml(blockLines.join('\n').trim()),
    nextIndex: index
  };
}

function parseTableRow(line) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

function isTableDivider(cells) {
  return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell.trim()));
}

function isMetadataTable(headers) {
  const normalized = headers.join(' ').toLowerCase();
  const audience = /(audiencia|audience|audiència)/.test(normalized);
  const region = /(región|region|région|regione)/.test(normalized);
  const level = /(nivel|level|niveau|livello|nivell)/.test(normalized);
  const reading = /(lectura|reading|lecture|lettura)/.test(normalized);
  return audience && region && level && reading;
}

function isBlockBoundary(line) {
  const trimmed = line.trim();
  return (
    !trimmed ||
    /^<\/?([a-zA-Z][a-zA-Z0-9-]*)\b/.test(trimmed) ||
    /^#{2,3}\s+/.test(trimmed) ||
    /^\|/.test(trimmed) ||
    /^-\s+/.test(trimmed) ||
    /^\d+\.\s+/.test(trimmed)
  );
}

export function parseWhitepaperMarkdownBlocks(markdown, lang = 'en') {
  const lines = normalizeWhitepaperMarkdown(markdown, lang).split('\n');
  const blocks = [];
  let index = 0;

  while (index < lines.length && !lines[index].trim()) index += 1;
  if (/^#\s+/.test(lines[index]?.trim() || '')) index += 1;

  while (index < lines.length) {
    const line = lines[index] || '';
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (trimmed === '</div>') {
      index += 1;
      continue;
    }

    const heading = trimmed.match(/^(#{2,3})\s+(.+)$/);
    if (heading) {
      const idMatch = heading[2].match(/\s*\{#([a-zA-Z0-9_-]+)\}\s*$/);
      blocks.push({
        type: 'heading',
        level: heading[1].length,
        text: stripInlineMarkdown(heading[2]),
        id: idMatch?.[1]
      });
      index += 1;
      continue;
    }

    const htmlHeading = trimmed.match(/^<h([23])\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>$/i);
    if (htmlHeading) {
      blocks.push({
        type: 'heading',
        level: Number(htmlHeading[1]),
        id: htmlHeading[2],
        text: stripInlineMarkdown(htmlHeading[3])
      });
      index += 1;
      continue;
    }

    if (/^<(div|section|article|aside|figure|details|a|ul|ol)\b/i.test(trimmed)) {
      const htmlBlock = collectHtmlBlock(lines, index);
      if (htmlBlock?.html) {
        blocks.push({ type: 'html', html: htmlBlock.html });
        index = htmlBlock.nextIndex;
        continue;
      }
    }

    if (trimmed.startsWith('|')) {
      const tableLines = [];
      while (index < lines.length && lines[index].trim().startsWith('|')) {
        tableLines.push(lines[index]);
        index += 1;
      }

      const rows = tableLines.map(parseTableRow).filter((row) => row.some(Boolean));
      const headers = rows[0] || [];
      const bodyRows = rows.slice(isTableDivider(rows[1] || []) ? 2 : 1);

      if (headers.length && bodyRows.length && !isMetadataTable(headers)) {
        blocks.push({
          type: 'table',
          headers,
          rows: bodyRows
        });
      }
      continue;
    }

    if (/^-\s+/.test(trimmed) || /^\d+\.\s+/.test(trimmed)) {
      const ordered = /^\d+\.\s+/.test(trimmed);
      const items = [];

      while (index < lines.length) {
        const current = lines[index].trim();
        if (ordered && !/^\d+\.\s+/.test(current)) break;
        if (!ordered && !/^-\s+/.test(current)) break;

        const cleaned = ordered
          ? current.replace(/^\d+\.\s+/, '')
          : current.replace(/^-\s+/, '');
        const checked = /^\[[xX ]\]\s+/.test(cleaned);

        items.push({
          text: cleaned.replace(/^\[[xX ]\]\s+/, '').replace(/\s{2,}$/g, '').trim(),
          checked
        });
        index += 1;
      }

      blocks.push({
        type: ordered ? 'orderedList' : 'unorderedList',
        items
      });
      continue;
    }

    const paragraphLines = [];
    while (index < lines.length && !isBlockBoundary(lines[index])) {
      paragraphLines.push(lines[index].trim().replace(/\s{2,}$/g, ''));
      index += 1;
    }

    const text = paragraphLines.join(' ').replace(/\s+/g, ' ').trim();
    if (text) {
      blocks.push({ type: 'paragraph', text });
    } else {
      index += 1;
    }
  }

  return blocks;
}

function extractMarkdownLink(line) {
  const match = String(line || '').match(/\[([^\]]+)\]\(([^)]+)\)/);
  if (!match) return null;
  return { label: stripInlineMarkdown(match[1]), href: match[2].trim() };
}

function extractWhitepaperCtas(markdown) {
  const source = String(markdown || '');
  const lines = source.split('\n');
  const primaryLine = lines.find((line) => /CTA\s+(principal|primary|principale|primari|primaire)/i.test(line));
  const secondaryLine = lines.find((line) => /CTA\s+(secundario|secondary|secondaire|secondario|secundari)/i.test(line));
  const buttonLinks = [...source.matchAll(/<a[^>]+class="[^"]*\baqv-btn\b[^"]*"[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((match) => ({
      label: stripInlineMarkdown(match[2]),
      href: match[1].trim()
    }))
    .filter((item) => item.label && item.href);

  const recommendedStart = source.search(/^(##\s+.*(next step|siguiente paso|paso siguiente|prochaine étape|passo successivo|següent pas)|<h2[^>]*id="recommended-next-step")/im);
  const recommendedSource = recommendedStart >= 0 ? source.slice(recommendedStart) : source;
  const recommendedLinks = [...recommendedSource.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)]
    .map((match) => ({
      label: stripInlineMarkdown(match[1]),
      href: match[2].trim()
    }))
    .filter((item) => item.label && item.href);

  return {
    primaryCta: extractMarkdownLink(primaryLine) || buttonLinks[0] || recommendedLinks[0] || null,
    secondaryCta: extractMarkdownLink(secondaryLine) || buttonLinks[1] || recommendedLinks[1] || null
  };
}

function toTopicList(value) {
  return String(value || '')
    .split(',')
    .map((topic) => topic.trim())
    .filter(Boolean);
}

function stripHtml(value) {
  return String(value || '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractWhitepaperFaqs(markdown) {
  const detailsFaqs = [...String(markdown || '').matchAll(/<details>\s*<summary>([\s\S]*?)<\/summary>\s*<p>([\s\S]*?)<\/p>\s*<\/details>/gi)]
    .map((match) => ({
      question: stripHtml(match[1]),
      answer: stripHtml(match[2])
    }))
    .filter((faq) => faq.question && faq.answer);

  if (detailsFaqs.length) return detailsFaqs;

  const normalized = normalizeWhitepaperMarkdown(markdown);
  const faqStart = normalized.search(/^(##\s+(FAQ|FAQs|Preguntas frecuentes|Questions fréquentes|Domande frequenti|Preguntes freqüents)\b|<h2[^>]*>\s*(FAQ|FAQs|Preguntas frecuentes|Questions fréquentes|Domande frequenti|Preguntes freqüents)\s*<\/h2>)/im);
  if (faqStart < 0) return [];

  const faqSection = normalized.slice(faqStart);
  const nextSection = faqSection.slice(1).search(/^(##\s+|<h2\b)/m);
  const source = nextSection > 0 ? faqSection.slice(0, nextSection + 1) : faqSection;
  const matches = [...source.matchAll(/^###\s+(.+?)\s*\n([\s\S]*?)(?=\n###\s+|\n##\s+|$)/gm)];
  return matches.map((match) => ({
    question: stripInlineMarkdown(match[1]),
    answer: stripInlineMarkdown(match[2].replace(/\n+/g, ' '))
  })).filter((faq) => faq.question && faq.answer);
}

export function getWhitepaperMarkdownPage(pageId, lang) {
  const raw = WHITEPAPER_MARKDOWN_RAW?.[pageId]?.[lang] || WHITEPAPER_MARKDOWN_RAW?.[pageId]?.en;
  if (!raw) return null;

  const { meta, markdown } = parseWhitepaperFrontmatter(raw);
  const normalizedMarkdown = normalizeWhitepaperMarkdown(markdown, lang);
  const ctaMarkdown = normalizeLocalizedInternalLinks(markdown, lang);
  const { primaryCta, secondaryCta } = extractWhitepaperCtas(ctaMarkdown);

  return {
    pageId,
    lang,
    raw,
    markdown: normalizedMarkdown,
    meta,
    title: meta.title || stripInlineMarkdown(markdown.match(/^#\s+(.+)$/m)?.[1] || ''),
    metaTitle: meta.meta_title || meta.title,
    metaDescription: meta.meta_description || '',
    audience: meta.audience || '',
    region: meta.region || '',
    level: meta.level || '',
    readingTime: meta.reading_time || '',
    relatedTopics: toTopicList(meta.related_topics),
    blocks: parseWhitepaperMarkdownBlocks(markdown, lang),
    faqs: extractWhitepaperFaqs(markdown),
    primaryCta,
    secondaryCta
  };
}

export function getAllWhitepaperMarkdownPages() {
  return WHITEPAPER_MARKDOWN_PAGE_IDS.flatMap((pageId) => (
    WHITEPAPER_LANGUAGES
      .map((lang) => getWhitepaperMarkdownPage(pageId, lang))
      .filter(Boolean)
  ));
}

export { WHITEPAPER_MARKDOWN_PAGE_IDS };
