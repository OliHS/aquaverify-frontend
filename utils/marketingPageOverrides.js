export const MARKETING_OVERRIDE_SECTION_ID = 'marketing_page';

export function getMarketingOverrideSlug(pageId, lang) {
  return `marketing-${pageId}-${lang}`;
}

function cleanText(value) {
  return typeof value === 'string' ? value : '';
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

export function normalizeMarketingOverride(value) {
  if (!value || typeof value !== 'object') return null;

  const override = {
    path: cleanText(value.path),
    title: cleanText(value.title),
    description: cleanText(value.description),
    eyebrow: cleanText(value.eyebrow),
    primaryCta: cleanText(value.primaryCta),
    secondaryCta: cleanText(value.secondaryCta),
    seoTitle: cleanText(value.seoTitle),
    seoDescription: cleanText(value.seoDescription),
    sections: normalizeSections(value.sections),
    faqs: normalizeFaqs(value.faqs)
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

  return {
    ...baseContent,
    ...override,
    path: baseContent.path,
    sections: override.sections || baseContent.sections,
    faqs: override.faqs || baseContent.faqs || []
  };
}
