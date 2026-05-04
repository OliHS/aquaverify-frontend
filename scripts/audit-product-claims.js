import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SCAN_DIRS = ['components', 'pages', 'utils', 'src'];
const EXTRA_FILES = ['App.tsx', 'index.tsx', 'scripts/prerender-marketing-pages.js'];

const BLOCKED_PATTERNS = [
  {
    name: 'certification_claim',
    pattern: /\b(certified|certificado|certificada|certificados|certificadas|certifi[eé]|certifi[eé]e|certifi[eé]s|certifi[eé]es|certificato|certificata|certificati|certified-compatible)\b/i,
    guidance: 'Avoid certification claims until a product/market evidence pack is approved.'
  },
  {
    name: 'iso_epa_compliance_claim',
    pattern: /\b(iso|epa)[/\w\s-]{0,28}\b(compliant|compatible|conforme|conformes|conformi|compatibles?)\b|\b(compliant|conforme|conformes|conformi)[/\w\s-]{0,28}\b(iso|epa)\b/i,
    guidance: 'Use workflow-alignment language instead of ISO/EPA compliance wording.'
  },
  {
    name: 'patent_claim',
    pattern: /\b(patented|patentada|patentado|brevet[eé]e|brevettata|brevetado)\b/i,
    guidance: 'Avoid patent claims unless the patent reference is approved for the market.'
  },
  {
    name: 'guarantee_claim',
    pattern: /\b(guarantee|guaranteed|garantice|garantiza|garantizado|garantissant|garantisce|garantito)\b/i,
    guidance: 'Avoid absolute guarantee language in public product copy.'
  },
  {
    name: 'according_to_method_claim',
    pattern: /\baccording to\s+(iso|epa)\b/i,
    guidance: 'Prefer "oriented to", "supports", or "for workflows using" until regulatory wording is approved.'
  }
];

const REVIEW_PATTERNS = [
  {
    name: 'enumera_coli100_mapping_review',
    pattern: /ENUMERA\s*Coli100[\s\S]{0,160}(E\.?\s*coli|enterococc|enterocci)/i,
    guidance: 'Review Coli100 parameter mapping against the approved product master.'
  },
  {
    name: 'enumera_entero100_mapping_review',
    pattern: /ENUMERA\s*Entero100[\s\S]{0,160}(E\.?\s*coli|coliform|enterococc|enterocci)/i,
    guidance: 'Review Entero100 parameter mapping against the approved product master.'
  }
];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return [fullPath];
  });
}

function shouldScan(file) {
  return /\.(tsx?|jsx?|html)$/.test(file)
    && !file.includes(`${path.sep}dist${path.sep}`)
    && !file.includes(`${path.sep}node_modules${path.sep}`);
}

function lineFor(content, index) {
  return content.slice(0, index).split(/\r?\n/).length;
}

function scanFile(file) {
  const content = fs.readFileSync(file, 'utf8');
  const findings = [];
  const reviews = [];

  BLOCKED_PATTERNS.forEach((rule) => {
    const match = rule.pattern.exec(content);
    if (match) {
      findings.push({
        file,
        line: lineFor(content, match.index),
        rule
      });
    }
  });

  REVIEW_PATTERNS.forEach((rule) => {
    const match = rule.pattern.exec(content);
    if (match) {
      reviews.push({
        file,
        line: lineFor(content, match.index),
        rule
      });
    }
  });

  return { findings, reviews };
}

const files = [
  ...SCAN_DIRS.flatMap((dir) => walk(path.join(ROOT, dir))),
  ...EXTRA_FILES.map((file) => path.join(ROOT, file))
].filter((file, index, all) => all.indexOf(file) === index && fs.existsSync(file) && shouldScan(file));

const result = files.reduce((acc, file) => {
  const scanned = scanFile(file);
  acc.findings.push(...scanned.findings);
  acc.reviews.push(...scanned.reviews);
  return acc;
}, { findings: [], reviews: [] });

if (result.reviews.length) {
  console.warn('Product naming review warnings:');
  result.reviews.forEach((item) => {
    console.warn(`- ${path.relative(ROOT, item.file)}:${item.line} [${item.rule.name}] ${item.rule.guidance}`);
  });
}

if (result.findings.length) {
  console.error('Blocked public product/marketing claims found:');
  result.findings.forEach((item) => {
    console.error(`- ${path.relative(ROOT, item.file)}:${item.line} [${item.rule.name}] ${item.rule.guidance}`);
  });
  process.exit(1);
}

console.log(`OK product claim audit (${files.length} files scanned)`);
