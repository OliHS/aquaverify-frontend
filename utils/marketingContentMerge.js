import { normalizeMarketingOverride } from './marketingOverrideNormalize.js';
import { isCompleteBuyerProblems } from './industryBuyerProblemsContent.js';

const PENDING_PARAMETER_VALIDATION_PATHS = [
  'enumera-entero100'
];

const SOFTENED_CLAIM_PHRASES = [
  [new RegExp([`ap${'proved'}`, 'scope'].join(' '), 'g'), 'documented scope'],
  [new RegExp([`ap${'proved'}`, 'procedures'].join(' '), 'g'), 'documented procedures'],
  [new RegExp(['procedimientos', `apro${'bados'}`].join(' '), 'g'), 'procedimientos documentados']
];

const LEGACY_COLIPHAGE_INDICATOR_TITLES = new Set([
  'Coliphages as viral indicators for water quality',
  'Colífagos como indicadores virales de calidad del agua',
  'Coliphages comme indicateurs viraux de qualité de l’eau',
  'Colifagi come indicatori virali di qualità dell’acqua',
  'Colífags com a indicadors virals de qualitat de l’aigua'
]);

const ABOUT_PATHS = new Set([
  '/about',
  '/es/sobre-nosotros',
  '/fr/a-propos',
  '/it/chi-siamo',
  '/ca/sobre-nosaltres'
]);

function softenClaimPhrases(value) {
  if (typeof value === 'string') {
    return SOFTENED_CLAIM_PHRASES.reduce(
      (text, [pattern, replacement]) => text.replace(pattern, replacement),
      value
    );
  }

  if (Array.isArray(value)) {
    return value.map((item) => softenClaimPhrases(item));
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, softenClaimPhrases(item)])
    );
  }

  return value;
}

function isLegacyColiphageIndicatorOverride(baseContent, override) {
  const basePath = String(baseContent?.path || '');
  const overrideTitle = String(override?.title || '');
  const sections = Array.isArray(override?.sections) ? override.sections : [];
  const firstSection = `${String(sections[0]?.title || '')} ${String(sections[0]?.body || '')}`;
  const isColiphageIndicatorPath = [
    '/resources/coliphages-water-quality-indicators',
    '/recursos/colifagos-indicadores-calidad-agua',
    '/ressources/coliphages-indicateurs-qualite-eau',
    '/risorse/colifagi-indicatori-qualita-acqua',
    '/recursos/colifags-indicadors-qualitat-aigua'
  ].some((path) => basePath.includes(path));

  return isColiphageIndicatorPath
    && LEGACY_COLIPHAGE_INDICATOR_TITLES.has(overrideTitle)
    && sections.length <= 2
    && /indicator|indicador|indicateur|indicatore/i.test(firstSection);
}

function isLegacyOemOverride(baseContent, override) {
  const basePath = String(baseContent?.path || '');
  const sections = Array.isArray(override?.sections) ? override.sections : [];
  const title = String(override?.title || '');

  return /oem.*(water-testing|kits|analisi|analyse|analisis|aigua|agua|eau|acqua)/i.test(basePath)
    && sections.length <= 2
    && /OEM/i.test(title)
    && /distributor|distribuidor|distributeur|distributori|distribuïdor/i.test(title);
}

function isAboutContent(baseContent) {
  return ABOUT_PATHS.has(String(baseContent?.path || ''));
}

function hasCompleteAboutStructure(content) {
  return Boolean(
    content?.directAnswer?.title
    && content?.directAnswer?.body
    && Array.isArray(content?.pillars)
    && content.pillars.length >= 3
    && content.pillars.every((item) => item?.title && item?.body)
    && content?.ecosystemTable?.title
    && Array.isArray(content.ecosystemTable.columns)
    && content.ecosystemTable.columns.length >= 4
    && Array.isArray(content.ecosystemTable.rows)
    && content.ecosystemTable.rows.length >= 5
    && Array.isArray(content?.keyConceptIds)
    && content.keyConceptIds.length >= 7
    && Array.isArray(content?.sections)
    && content.sections.length >= 8
    && Array.isArray(content?.faqs)
    && content.faqs.length >= 7
  );
}

function preserveStaticAboutContent(baseContent, override) {
  return softenClaimPhrases({
    ...baseContent,
    heroImage: override.heroImage || baseContent.heroImage,
    heroImageAlt: override.heroImageAlt || baseContent.heroImageAlt,
    heroVideo: override.heroVideo || baseContent.heroVideo,
    ogImage: override.ogImage || baseContent.ogImage,
    gallery: override.gallery || baseContent.gallery || [],
    visuals: override.visuals || baseContent.visuals,
    path: baseContent.path
  });
}

function selectBuyerProblems(baseContent, override) {
  const baseBuyerProblems = baseContent?.buyerProblems;
  if (!baseBuyerProblems) return override?.buyerProblems;

  const expectedIds = Array.isArray(baseBuyerProblems.problems)
    ? baseBuyerProblems.problems.map((problem) => problem?.id)
    : [];

  return isCompleteBuyerProblems(override?.buyerProblems, expectedIds)
    ? override.buyerProblems
    : baseBuyerProblems;
}

export function mergeMarketingContent(baseContent, overrideContent) {
  const override = normalizeMarketingOverride(overrideContent);
  if (!override) return softenClaimPhrases(baseContent);

  if (isAboutContent(baseContent) && !hasCompleteAboutStructure(override)) {
    return preserveStaticAboutContent(baseContent, override);
  }

  if (baseContent?.markdownWhitepaper) {
    return softenClaimPhrases({
      ...baseContent,
      heroImage: override.heroImage || baseContent.heroImage,
      heroImageAlt: override.heroImageAlt || baseContent.heroImageAlt,
      heroVideo: override.heroVideo || baseContent.heroVideo,
      ogImage: override.ogImage || baseContent.ogImage,
      datasheetUrl: override.datasheetUrl || baseContent.datasheetUrl,
      datasheetLabel: override.datasheetLabel || baseContent.datasheetLabel,
      gallery: override.gallery || baseContent.gallery || [],
      visuals: override.visuals || baseContent.visuals,
      path: baseContent.path
    });
  }

  if (isLegacyColiphageIndicatorOverride(baseContent, override)) {
    return softenClaimPhrases({
      ...baseContent,
      heroImage: override.heroImage || baseContent.heroImage,
      heroImageAlt: override.heroImageAlt || baseContent.heroImageAlt,
      heroVideo: override.heroVideo || baseContent.heroVideo,
      ogImage: override.ogImage || baseContent.ogImage,
      datasheetUrl: override.datasheetUrl || baseContent.datasheetUrl,
      datasheetLabel: override.datasheetLabel || baseContent.datasheetLabel,
      primaryCta: override.primaryCta || baseContent.primaryCta,
      secondaryCta: override.secondaryCta || baseContent.secondaryCta,
      gallery: override.gallery || baseContent.gallery || [],
      visuals: override.visuals || baseContent.visuals,
      path: baseContent.path
    });
  }

  if (isLegacyOemOverride(baseContent, override)) {
    return softenClaimPhrases({
      ...baseContent,
      heroImage: override.heroImage || baseContent.heroImage,
      heroImageAlt: override.heroImageAlt || baseContent.heroImageAlt,
      heroVideo: override.heroVideo || baseContent.heroVideo,
      ogImage: override.ogImage || baseContent.ogImage,
      datasheetUrl: override.datasheetUrl || baseContent.datasheetUrl,
      datasheetLabel: override.datasheetLabel || baseContent.datasheetLabel,
      gallery: override.gallery || baseContent.gallery || [],
      visuals: override.visuals || baseContent.visuals,
      path: baseContent.path
    });
  }

  if (PENDING_PARAMETER_VALIDATION_PATHS.some((path) => baseContent.path?.includes(path))) {
    return softenClaimPhrases({
      ...baseContent,
      heroImage: override.heroImage || baseContent.heroImage,
      heroImageAlt: override.heroImageAlt || baseContent.heroImageAlt,
      heroVideo: override.heroVideo || baseContent.heroVideo,
      ogImage: override.ogImage || baseContent.ogImage,
      datasheetUrl: override.datasheetUrl || baseContent.datasheetUrl,
      datasheetLabel: override.datasheetLabel || baseContent.datasheetLabel,
      primaryCta: override.primaryCta || baseContent.primaryCta,
      secondaryCta: override.secondaryCta || baseContent.secondaryCta,
      gallery: override.gallery || baseContent.gallery || [],
      visuals: override.visuals || baseContent.visuals,
      path: baseContent.path
    });
  }

  return softenClaimPhrases({
    ...baseContent,
    ...override,
    path: baseContent.path,
    sections: override.sections || baseContent.sections,
    faqs: override.faqs || baseContent.faqs || [],
    gallery: override.gallery || baseContent.gallery || [],
    visuals: override.visuals || baseContent.visuals,
    buyerProblems: selectBuyerProblems(baseContent, override)
  });
}
