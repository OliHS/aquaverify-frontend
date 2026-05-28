import { normalizeMarketingOverride } from './marketingOverrideNormalize.js';

const PENDING_PARAMETER_VALIDATION_PATHS = [
  'enumera-entero100'
];

const LEGACY_COLIPHAGE_INDICATOR_TITLES = new Set([
  'Coliphages as viral indicators for water quality',
  'Colífagos como indicadores virales de calidad del agua',
  'Coliphages comme indicateurs viraux de qualité de l’eau',
  'Colifagi come indicatori virali di qualità dell’acqua',
  'Colífags com a indicadors virals de qualitat de l’aigua'
]);

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

export function mergeMarketingContent(baseContent, overrideContent) {
  const override = normalizeMarketingOverride(overrideContent);
  if (!override) return baseContent;

  if (baseContent?.markdownWhitepaper) {
    return {
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
    };
  }

  if (isLegacyColiphageIndicatorOverride(baseContent, override)) {
    return {
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
    };
  }

  if (isLegacyOemOverride(baseContent, override)) {
    return {
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
    };
  }

  if (PENDING_PARAMETER_VALIDATION_PATHS.some((path) => baseContent.path?.includes(path))) {
    return {
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
    };
  }

  return {
    ...baseContent,
    ...override,
    path: baseContent.path,
    sections: override.sections || baseContent.sections,
    faqs: override.faqs || baseContent.faqs || [],
    gallery: override.gallery || baseContent.gallery || [],
    visuals: override.visuals || baseContent.visuals
  };
}
