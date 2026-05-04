import fs from 'node:fs';
import path from 'node:path';
import { scanProductClaimText } from '../utils/productClaims.js';

const ROOT = process.cwd();
const SCAN_DIRS = ['components', 'pages', 'utils', 'src'];
const EXTRA_FILES = ['App.tsx', 'index.tsx', 'scripts/prerender-marketing-pages.js'];
const EXCLUDED_FILES = new Set(['utils/productClaims.js']);

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return [fullPath];
  });
}

function shouldScan(file) {
  return !EXCLUDED_FILES.has(path.relative(ROOT, file))
    && /\.(tsx?|jsx?|html)$/.test(file)
    && !file.includes(`${path.sep}dist${path.sep}`)
    && !file.includes(`${path.sep}node_modules${path.sep}`);
}

function lineFor(content, index) {
  return content.slice(0, index).split(/\r?\n/).length;
}

function scanFile(file) {
  const content = fs.readFileSync(file, 'utf8');
  const scanned = scanProductClaimText(content);
  const findings = scanned.findings.map((item) => ({
    file,
    line: lineFor(content, item.index),
    rule: item.rule
  }));
  const reviews = scanned.reviews.map((item) => ({
    file,
    line: lineFor(content, item.index),
    rule: item.rule
  }));

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
