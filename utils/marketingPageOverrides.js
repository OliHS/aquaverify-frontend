export const MARKETING_OVERRIDE_SECTION_ID = 'marketing_page';
const PENDING_PARAMETER_VALIDATION_PATHS = [
  'enumera-coli100',
  'enumera-entero100'
];

export function getMarketingOverrideSlug(pageId, lang) {
  return `marketing-${pageId}-${lang}`;
}

function cleanText(value) {
  return typeof value === 'string' ? sanitizePendingParameterCopy(value) : '';
}

function sanitizePendingParameterCopy(value) {
  return value
    .replace(/\bENUMERA\s+Coli100\s+for\s+enterococci\s+workflows\b/gi, 'ENUMERA Coli100 for bacterial indicator workflows')
    .replace(/\bENUMERA\s+Entero100\s+for\s+enterococci\s+workflows\b/gi, 'ENUMERA Entero100 for bacterial indicator workflows')
    .replace(/\bENUMERA\s+Coli100\s+para\s+enterococos\b/gi, 'ENUMERA Coli100 para indicadores bacterianos')
    .replace(/\bENUMERA\s+Entero100\s+para\s+enterococos\b/gi, 'ENUMERA Entero100 para indicadores bacterianos')
    .replace(/\bENUMERA\s+Coli100\s+pour\s+les\s+entérocoques\b/gi, 'ENUMERA Coli100 pour les indicateurs bactériens')
    .replace(/\bENUMERA\s+Entero100\s+pour\s+les\s+entérocoques\b/gi, 'ENUMERA Entero100 pour les indicateurs bactériens')
    .replace(/\bENUMERA\s+Coli100\s+per\s+enterococchi\b/gi, 'ENUMERA Coli100 per indicatori batterici')
    .replace(/\bENUMERA\s+Entero100\s+per\s+enterococchi\b/gi, 'ENUMERA Entero100 per indicatori batterici')
    .replace(/\bENUMERA\s+Coli100\s+per\s+a\s+enterococs\b/gi, 'ENUMERA Coli100 per a indicadors bacterians')
    .replace(/\bENUMERA\s+Entero100\s+per\s+a\s+enterococs\b/gi, 'ENUMERA Entero100 per a indicadors bacterians');
}

function normalizeBullets(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => cleanText(item).trim())
    .filter(Boolean);
}

function normalizeSections(value) {
  if (!Array.isArray(value)) return null;
  const sections = value
    .map((item) => ({
      title: cleanText(item?.title),
      body: cleanText(item?.body),
      bullets: normalizeBullets(item?.bullets)
    }))
    .filter((item) => item.title || item.body || item.bullets.length > 0);
  return sections.length > 0 ? sections : null;
}

function normalizeFaqs(value) {
  if (!Array.isArray(value)) return null;
  const faqs = value
    .map((item) => ({
      question: cleanText(item?.question),
      answer: cleanText(item?.answer)
    }))
    .filter((item) => item.question && item.answer);
  return faqs.length > 0 ? faqs : null;
}

function normalizeGallery(value) {
  if (!Array.isArray(value)) return null;
  const gallery = value
    .map((item) => ({
      src: cleanText(item?.src),
      alt: cleanText(item?.alt),
      title: cleanText(item?.title),
      body: cleanText(item?.body)
    }))
    .filter((item) => item.src && item.alt);
  return gallery.length > 0 ? gallery : null;
}

export function normalizeMarketingOverride(value) {
  if (!value || typeof value !== 'object') return null;

  const override = {
    path: cleanText(value.path),
    title: cleanText(value.title),
    description: cleanText(value.description),
    eyebrow: cleanText(value.eyebrow),
    primaryCta: cleanText(value.primaryCta),
    secondaryCta: cleanText(value.secondaryCta),
    heroImage: cleanText(value.heroImage),
    heroImageAlt: cleanText(value.heroImageAlt),
    ogImage: cleanText(value.ogImage),
    datasheetUrl: cleanText(value.datasheetUrl),
    datasheetLabel: cleanText(value.datasheetLabel),
    seoTitle: cleanText(value.seoTitle),
    seoDescription: cleanText(value.seoDescription),
    sections: normalizeSections(value.sections),
    faqs: normalizeFaqs(value.faqs),
    gallery: normalizeGallery(value.gallery)
  };

  return Object.fromEntries(
    Object.entries(override).filter(([, item]) => {
      if (Array.isArray(item)) return item.length > 0;
      return item !== null && item !== '';
    })
  );
}

export function mergeMarketingContent(baseContent, overrideContent) {
  const override = normalizeMarketingOverride(overrideContent);
  if (!override) return baseContent;

  if (PENDING_PARAMETER_VALIDATION_PATHS.some((path) => baseContent.path?.includes(path))) {
    return {
      ...baseContent,
      heroImage: override.heroImage || baseContent.heroImage,
      heroImageAlt: override.heroImageAlt || baseContent.heroImageAlt,
      ogImage: override.ogImage || baseContent.ogImage,
      datasheetUrl: override.datasheetUrl || baseContent.datasheetUrl,
      datasheetLabel: override.datasheetLabel || baseContent.datasheetLabel,
      primaryCta: override.primaryCta || baseContent.primaryCta,
      secondaryCta: override.secondaryCta || baseContent.secondaryCta,
      gallery: override.gallery || baseContent.gallery || [],
      path: baseContent.path
    };
  }

  return {
    ...baseContent,
    ...override,
    path: baseContent.path,
    sections: override.sections || baseContent.sections,
    faqs: override.faqs || baseContent.faqs || [],
    gallery: override.gallery || baseContent.gallery || []
  };
}
