export const BLOCKED_PRODUCT_CLAIM_RULES = [
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

export const REVIEW_PRODUCT_CLAIM_RULES = [
  {
    name: 'enumera_coli100_mapping_review',
    pattern: /ENUMERA\s*Coli\s*100[\s\S]{0,160}(enterococc|enterocci)/i,
    guidance: 'Review Coli100 copy if it is mapped to enterococci instead of E. coli and total coliforms.'
  },
  {
    name: 'enumera_entero100_mapping_review',
    pattern: /ENUMERA\s*Entero100[\s\S]{0,160}(E\.?\s*coli|coliform|enterococc|enterocci)/i,
    guidance: 'Review Entero100 parameter mapping against the approved product master.'
  }
];

export const ALLOWED_PRODUCT_CLAIM_CONTEXTS = [
  {
    name: 'coa_certificate_of_analysis',
    pattern: /\b(?:CoA\s*\/\s*)?(?:Certificate of Analysis|Certificado de an[aá]lisis|Certificat d[’']analyse|Certificato di analisi|Certificat d[’']an[aà]lisi)\b|\bcoa-(?:certificate-of-analysis|certificado-de-analisis|certificat-danalyse|certificato-di-analisi|certificat-danalisi)\b/i,
    reason: 'CoA names a Certificate of Analysis document or its glossary slug, not a regulatory certification claim for a product or method.'
  }
];

const NON_COPY_KEYS = /(?:^|_|\b)(id|url|link|href|image|images|icon|path|slug|src|email|phone|lat|lng)(?:$|_|\b)/i;

const SAFE_TEXT_REPLACEMENTS = [
  [/\bCertified Standards\b/g, 'Reference Standards'],
  [/\bcertified user training programs\b/gi, 'structured user training programs'],
  [/\bcertified training\b/gi, 'structured technical training'],
  [/\bcertified\b/gi, 'technical'],
  [/\bcertificado\b/gi, 'técnico'],
  [/\bcertificada\b/gi, 'técnica'],
  [/\bcertificados\b/gi, 'técnicos'],
  [/\bcertificadas\b/gi, 'técnicas'],
  [/\bcertifi[eé]\b/gi, 'technique'],
  [/\bcertifi[eé]e\b/gi, 'technique'],
  [/\bcertifi[eé]s\b/gi, 'techniques'],
  [/\bcertifi[eé]es\b/gi, 'techniques'],
  [/\bcertificato\b/gi, 'tecnico'],
  [/\bcertificata\b/gi, 'tecnica'],
  [/\bcertificati\b/gi, 'tecnici']
];

function isAllowedProductClaimMatch(content, index) {
  const start = Math.max(0, index - 40);
  const end = Math.min(content.length, index + 120);
  const context = content.slice(start, end);
  return ALLOWED_PRODUCT_CLAIM_CONTEXTS.some((allowed) => allowed.pattern.test(context));
}

function findRuleMatches(content, rule) {
  const flags = rule.pattern.flags.includes('g') ? rule.pattern.flags : `${rule.pattern.flags}g`;
  const pattern = new RegExp(rule.pattern.source, flags);
  const matches = [];
  let match;

  while ((match = pattern.exec(content)) !== null) {
    if (!isAllowedProductClaimMatch(content, match.index)) {
      matches.push({ rule, index: match.index, match: match[0] });
    }

    if (pattern.lastIndex === match.index) pattern.lastIndex += 1;
  }

  return matches;
}

export function scanProductClaimText(text, { includeReviews = true } = {}) {
  const content = String(text || '');
  const findings = BLOCKED_PRODUCT_CLAIM_RULES.flatMap((rule) => findRuleMatches(content, rule));

  const reviews = includeReviews ? REVIEW_PRODUCT_CLAIM_RULES.flatMap((rule) => {
    const match = rule.pattern.exec(content);
    return match ? [{ rule, index: match.index, match: match[0] }] : [];
  }) : [];

  return { findings, reviews };
}

export function collectProductClaimTextFields(value, path = []) {
  if (typeof value === 'string') {
    const key = path[path.length - 1] || '';
    if (!value.trim() || NON_COPY_KEYS.test(key)) return [];
    return [{ path: path.join('.'), value }];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectProductClaimTextFields(item, [...path, String(index)]));
  }

  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) => collectProductClaimTextFields(item, [...path, key]));
  }

  return [];
}

export function scanProductClaimFields(value, { root = '', includeReviews = true } = {}) {
  return collectProductClaimTextFields(value).reduce((acc, field) => {
    const scanned = scanProductClaimText(field.value, { includeReviews });
    const path = root ? `${root}.${field.path}` : field.path;

    acc.findings.push(...scanned.findings.map((finding) => ({ ...finding, path })));
    acc.reviews.push(...scanned.reviews.map((review) => ({ ...review, path })));
    return acc;
  }, { findings: [], reviews: [] });
}

export function sanitizeProductClaimText(value) {
  return SAFE_TEXT_REPLACEMENTS.reduce(
    (text, [pattern, replacement]) => text.replace(pattern, replacement),
    String(value || '')
  );
}

export function sanitizeProductClaimFields(value) {
  if (typeof value === 'string') return sanitizeProductClaimText(value);
  if (Array.isArray(value)) return value.map((item) => sanitizeProductClaimFields(item));
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, sanitizeProductClaimFields(item)])
    );
  }
  return value;
}
