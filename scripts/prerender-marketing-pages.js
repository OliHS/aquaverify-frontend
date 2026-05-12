import fs from 'node:fs/promises';
import path from 'node:path';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import {
  MARKETING_LANGUAGES,
  MARKETING_PAGES,
  getMarketingAlternates,
  getMarketingPagePath,
  getMarketingPageSummary
} from '../utils/marketingPages.js';
import {
  getMarketingOverrideSlug,
  MARKETING_OVERRIDE_SECTION_ID,
  mergeMarketingContent,
  normalizeMarketingOverride
} from '../utils/marketingPageOverrides.js';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const DIST_DIR = 'dist';
const SITE_URL = 'https://aquaverify.com';
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const SEO_LOCALES = {
  en: 'en_US',
  es: 'es_ES',
  fr: 'fr_FR',
  it: 'it_IT',
  ca: 'ca_ES'
};

const HOME_META = {
  en: {
    path: '/en',
    title: 'AquaVerify | Water Testing, LIMS Traceability & Technical Reporting',
    description: 'AquaVerify combines water microbiology products, digital LIMS traceability, technical reporting, distributor support and OEM partnerships.'
  },
  es: {
    path: '/es',
    title: 'AquaVerify | Kits de Agua, Trazabilidad LIMS e Informes Técnicos',
    description: 'AquaVerify combina productos de microbiología del agua, trazabilidad digital LIMS, informes técnicos, distribuidores y programas OEM.'
  },
  fr: {
    path: '/fr',
    title: 'AquaVerify | Tests Eau, Traçabilité LIMS et Reporting Technique',
    description: 'AquaVerify réunit produits de microbiologie de l’eau, traçabilité numérique LIMS, rapports techniques, distributeurs et partenariats OEM.'
  },
  it: {
    path: '/it',
    title: 'AquaVerify | Test Acqua, Tracciabilità LIMS e Report Tecnici',
    description: 'AquaVerify unisce prodotti di microbiologia dell’acqua, tracciabilità digitale LIMS, report tecnici, distributori e partnership OEM.'
  },
  ca: {
    path: '/ca',
    title: 'AquaVerify | Kits d’Aigua, Traçabilitat LIMS i Informes Tècnics',
    description: 'AquaVerify combina productes de microbiologia de l’aigua, traçabilitat digital LIMS, informes tècnics, distribuïdors i programes OEM.'
  }
};

const HOME_ALTERNATES = {
  'x-default': '/',
  en: '/en',
  es: '/es',
  fr: '/fr',
  it: '/it',
  ca: '/ca'
};

const PRODUCT_LABELS = {
  en: 'Products',
  es: 'Productos',
  fr: 'Produits',
  it: 'Prodotti',
  ca: 'Productes'
};

const FEATURED_WHITEPAPER_IDS = [
  'coliphages-indicators',
  'eu-drinking-water-directive-coliphages',
  'water-compliance-software-guide',
  'us-drinking-water-compliance-coliform-rule'
];

const FEATURED_WHITEPAPER_COPY = {
  en: {
    eyebrow: 'Featured whitepapers',
    title: 'Regulatory resources for water quality teams',
    body: 'Start with four practical guides for technical decisions: viral indicators, European drinking water compliance, software evidence for audits and US EPA-oriented monitoring.',
    cta: 'Open whitepaper',
    badges: {
      'coliphages-indicators': 'Viral indicators',
      'eu-drinking-water-directive-coliphages': 'EU directive',
      'water-compliance-software-guide': 'Software evidence',
      'us-drinking-water-compliance-coliform-rule': 'US EPA / RTCR'
    }
  },
  es: {
    eyebrow: 'Whitepapers destacados',
    title: 'Recursos normativos para compradores de calidad del agua',
    body: 'Empieza por cuatro guías prácticas para decisiones técnicas: indicadores virales, cumplimiento europeo, evidencia software para auditorías y monitorización orientada a EPA en Estados Unidos.',
    cta: 'Abrir whitepaper',
    badges: {
      'coliphages-indicators': 'Indicadores virales',
      'eu-drinking-water-directive-coliphages': 'Directiva UE',
      'water-compliance-software-guide': 'Evidencia software',
      'us-drinking-water-compliance-coliform-rule': 'EPA / RTCR EEUU'
    }
  },
  fr: {
    eyebrow: 'Whitepapers sélectionnés',
    title: 'Ressources réglementaires pour acheteurs qualité de l’eau',
    body: 'Commencez par quatre guides pratiques pour les décisions techniques: indicateurs viraux, conformité européenne, preuve logicielle pour audits et suivi orienté EPA aux États-Unis.',
    cta: 'Ouvrir le whitepaper',
    badges: {
      'coliphages-indicators': 'Indicateurs viraux',
      'eu-drinking-water-directive-coliphages': 'Directive UE',
      'water-compliance-software-guide': 'Preuve logicielle',
      'us-drinking-water-compliance-coliform-rule': 'EPA / RTCR USA'
    }
  },
  it: {
    eyebrow: 'Whitepaper in evidenza',
    title: 'Risorse normative per team qualità acqua',
    body: 'Parti da quattro guide pratiche per decisioni tecniche: indicatori virali, conformità europea, evidenza software per audit e monitoraggio orientato EPA negli Stati Uniti.',
    cta: 'Apri whitepaper',
    badges: {
      'coliphages-indicators': 'Indicatori virali',
      'eu-drinking-water-directive-coliphages': 'Direttiva UE',
      'water-compliance-software-guide': 'Evidenza software',
      'us-drinking-water-compliance-coliform-rule': 'EPA / RTCR USA'
    }
  },
  ca: {
    eyebrow: 'Whitepapers destacats',
    title: 'Recursos normatius per a compradors de qualitat de l’aigua',
    body: 'Comença per quatre guies pràctiques per a decisions tècniques: indicadors virals, compliment europeu, evidència software per a auditories i monitoratge orientat a EPA als Estats Units.',
    cta: 'Obrir whitepaper',
    badges: {
      'coliphages-indicators': 'Indicadors virals',
      'eu-drinking-water-directive-coliphages': 'Directiva UE',
      'water-compliance-software-guide': 'Evidència software',
      'us-drinking-water-compliance-coliform-rule': 'EPA / RTCR EUA'
    }
  }
};

function absolute(routePath) {
  return `${SITE_URL}${routePath === '/' ? '/' : routePath}`;
}

function absoluteAsset(pathOrUrl) {
  const value = String(pathOrUrl || '').trim();
  if (!value) return `${SITE_URL}/android-chrome-512x512.png`;
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith('/') ? value : `/${value}`}`;
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);
}

function externalOrAbsolute(pathOrUrl) {
  const value = String(pathOrUrl || '').trim();
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;
  return absolute(value.startsWith('/') ? value : `/${value}`);
}

function renderSectionList(sections = []) {
  return sections.map((section) => {
    const bullets = Array.isArray(section.bullets) ? section.bullets : [];
    return [
      '      <section>',
      `        <h2>${escapeHtml(section.title)}</h2>`,
      `        <p>${escapeHtml(section.body)}</p>`,
      bullets.length ? [
        '        <ul>',
        ...bullets.map((bullet) => `          <li>${escapeHtml(bullet)}</li>`),
        '        </ul>'
      ].join('\n') : '',
      '      </section>'
    ].filter(Boolean).join('\n');
  }).join('\n');
}

function renderFeaturedWhitepapers(page, lang) {
  if (page?.id !== 'resources') return '';
  const copy = FEATURED_WHITEPAPER_COPY[lang] || FEATURED_WHITEPAPER_COPY.en;
  const items = FEATURED_WHITEPAPER_IDS
    .map((id) => getMarketingPageSummary(id, lang))
    .filter(Boolean);

  if (!items.length) return '';

  return [
    '      <section>',
    `        <p>${escapeHtml(copy.eyebrow)}</p>`,
    `        <h2>${escapeHtml(copy.title)}</h2>`,
    `        <p>${escapeHtml(copy.body)}</p>`,
    '        <ul>',
    ...items.map((item) => [
      '          <li>',
      `            <p><strong>${escapeHtml(copy.badges[item.id] || copy.eyebrow)}</strong></p>`,
      `            <h3>${escapeHtml(item.title)}</h3>`,
      `            <p>${escapeHtml(item.description)}</p>`,
      `            <a href="${escapeHtml(absolute(item.path))}">${escapeHtml(copy.cta)}</a>`,
      '          </li>'
    ].join('\n')),
    '        </ul>',
    '      </section>'
  ].join('\n');
}

function renderFaqs(faqs = []) {
  if (!faqs.length) return '';

  return [
    '      <section>',
    '        <h2>FAQ</h2>',
    ...faqs.map((faq) => [
      '        <article>',
      `          <h3>${escapeHtml(faq.question)}</h3>`,
      `          <p>${escapeHtml(faq.answer)}</p>`,
      '        </article>'
    ].join('\n')),
    '      </section>'
  ].join('\n');
}

function renderWhitepaperDeepDive(whitepaper) {
  if (!whitepaper?.title || !whitepaper?.intro) return '';
  const metrics = Array.isArray(whitepaper.metrics) ? whitepaper.metrics : [];
  const comparison = Array.isArray(whitepaper.comparison) ? whitepaper.comparison : [];
  const flow = Array.isArray(whitepaper.flow) ? whitepaper.flow : [];
  const timeline = Array.isArray(whitepaper.timeline) ? whitepaper.timeline : [];

  return [
    '      <section>',
    `        <h2>${escapeHtml(whitepaper.title)}</h2>`,
    `        <p>${escapeHtml(whitepaper.intro)}</p>`,
    metrics.length ? [
      '        <ul>',
      ...metrics.map((metric) => `          <li><strong>${escapeHtml(metric.label || '')}: ${escapeHtml(metric.value || '')}</strong> ${escapeHtml(metric.body || '')}</li>`),
      '        </ul>'
    ].join('\n') : '',
    whitepaper.comparisonTitle ? `        <h3>${escapeHtml(whitepaper.comparisonTitle)}</h3>` : '',
    comparison.length ? [
      '        <ul>',
      ...comparison.map((item) => `          <li><strong>${escapeHtml(item.label || '')}: ${escapeHtml(item.title || '')}</strong> ${escapeHtml(item.body || '')}</li>`),
      '        </ul>'
    ].join('\n') : '',
    whitepaper.flowTitle ? `        <h3>${escapeHtml(whitepaper.flowTitle)}</h3>` : '',
    flow.length ? [
      '        <ol>',
      ...flow.map((step) => `          <li><strong>${escapeHtml(step.title || '')}</strong> ${escapeHtml(step.body || '')}</li>`),
      '        </ol>'
    ].join('\n') : '',
    whitepaper.timelineTitle ? `        <h3>${escapeHtml(whitepaper.timelineTitle)}</h3>` : '',
    timeline.length ? [
      '        <ol>',
      ...timeline.map((item) => `          <li><strong>${escapeHtml(item.year || '')} · ${escapeHtml(item.region || '')} · ${escapeHtml(item.sector || '')}</strong> ${escapeHtml(item.body || '')}</li>`),
      '        </ol>'
    ].join('\n') : '',
    whitepaper.sourceLabel ? `        <p><strong>${escapeHtml(whitepaper.sourceLabel)}</strong></p>` : '',
    whitepaper.note ? `        <p>${escapeHtml(whitepaper.note)}</p>` : '',
    '      </section>'
  ].filter(Boolean).join('\n');
}

function renderHeroVisual(meta, content, title) {
  const heroImage = content?.heroImage ? absoluteAsset(content.heroImage) : '';
  const heroVideo = content?.heroVideo ? absoluteAsset(content.heroVideo) : '';
  const platformGallery = meta?.page?.id === 'platform' && Array.isArray(content?.gallery)
    ? content.gallery
      .filter((item) => item?.src && item?.alt)
      .slice(0, 5)
      .map((item) => ({
        ...item,
        src: absoluteAsset(item.src)
      }))
    : [];

  if (platformGallery.length > 1) {
    const [featured, ...thumbs] = platformGallery;
    return [
      '      <div data-prerender-platform-carousel style="margin-top: 28px; max-width: 620px; border: 1px solid rgba(255,255,255,.18); border-radius: 22px; background: rgba(255,255,255,.1); padding: 10px;">',
      '        <div style="position: relative; aspect-ratio: 16 / 10; overflow: hidden; border-radius: 16px; background: #ffffff;">',
      `          <img src="${escapeHtml(featured.src)}" alt="${escapeHtml(featured.alt || title)}" style="display: block; width: 100%; height: 100%; object-fit: contain; object-position: top center;" />`,
      '          <div style="position: absolute; inset: auto 0 0 0; padding: 44px 18px 16px; background: linear-gradient(to top, rgba(10,79,125,.92), rgba(10,79,125,.52), rgba(10,79,125,0));">',
      featured.title ? `            <p style="margin: 0; font-weight: 800; color: #ffffff;">${escapeHtml(featured.title)}</p>` : '',
      featured.body ? `            <p style="margin: 4px 0 0; font-size: 13px; line-height: 1.5; color: rgba(236,254,255,.88);">${escapeHtml(featured.body)}</p>` : '',
      '          </div>',
      '        </div>',
      thumbs.length ? [
        '        <div style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; margin-top: 8px;">',
        ...thumbs.map((item) => `          <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt || title)}" style="display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; object-position: top center; border-radius: 10px; background: #ffffff;" />`),
        '        </div>'
      ].join('\n') : '',
      '      </div>'
    ].filter(Boolean).join('\n');
  }

  if (heroVideo) {
    return `      <video src="${escapeHtml(heroVideo)}"${heroImage ? ` poster="${escapeHtml(heroImage)}"` : ''} aria-label="${escapeHtml(content?.heroImageAlt || title)}" autoplay muted loop playsinline preload="auto" style="display: block; max-width: 560px; width: 100%; max-height: 460px; object-fit: contain; margin-top: 28px;"></video>`;
  }

  return heroImage
    ? `      <img src="${escapeHtml(heroImage)}" alt="${escapeHtml(content?.heroImageAlt || title)}" style="display: block; max-width: 560px; width: 100%; max-height: 460px; object-fit: contain; margin-top: 28px;" />`
    : '';
}

function renderPrerenderShell() {
  return [
    '<div data-prerender-shell aria-hidden="true" style="min-height: 100vh; background: #ffffff; color: #0f172a; font-family: Inter, Arial, sans-serif;">',
    '  <header style="position: fixed; inset: 0 0 auto 0; z-index: 50; background: #ffffff; border-bottom: 1px solid #e2e8f0;">',
    '    <div style="max-width: 1180px; margin: 0 auto; height: 80px; padding: 0 24px; display: flex; align-items: center; justify-content: space-between;">',
    '      <div style="display: flex; align-items: center; gap: 12px;">',
    '        <img src="/images/logo-mark-160.png" alt="" width="32" height="40" style="display: block; width: 32px; height: 40px; object-fit: contain;" />',
    '        <div style="font-size: 20px; font-weight: 800; letter-spacing: -0.01em; color: #0A4F7D;">Aqua<span style="color: #00AEEF;">Verify</span></div>',
    '      </div>',
    '      <div style="display: flex; gap: 14px;">',
    '        <span style="display: block; width: 72px; height: 8px; border-radius: 999px; background: #f1f5f9;"></span>',
    '        <span style="display: block; width: 56px; height: 8px; border-radius: 999px; background: #f1f5f9;"></span>',
    '        <span style="display: block; width: 88px; height: 8px; border-radius: 999px; background: #f1f5f9;"></span>',
    '      </div>',
    '    </div>',
    '  </header>',
    '  <main style="padding-top: 80px;">',
    '    <section style="min-height: calc(90vh - 80px); display: flex; flex-wrap: wrap; overflow: hidden;">',
    '      <div style="flex: 1 1 420px; min-height: 560px; background: #0A4F7D; padding: 72px min(8vw, 80px); display: flex; align-items: center;">',
    '        <div style="width: min(100%, 520px);">',
    '          <div style="width: 138px; height: 28px; border-radius: 999px; background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.16);"></div>',
    '          <div style="margin-top: 32px; width: 100%; height: 58px; border-radius: 8px; background: rgba(255,255,255,.18);"></div>',
    '          <div style="margin-top: 14px; width: 82%; height: 58px; border-radius: 8px; background: rgba(255,255,255,.16);"></div>',
    '          <div style="margin-top: 28px; width: 92%; height: 14px; border-radius: 999px; background: rgba(255,255,255,.15);"></div>',
    '          <div style="margin-top: 12px; width: 74%; height: 14px; border-radius: 999px; background: rgba(255,255,255,.12);"></div>',
    '          <div style="margin-top: 34px; display: flex; gap: 12px; flex-wrap: wrap;">',
    '            <span style="display: block; width: 150px; height: 44px; border-radius: 6px; background: #00AEEF;"></span>',
    '            <span style="display: block; width: 138px; height: 44px; border-radius: 6px; border: 1px solid rgba(255,255,255,.24);"></span>',
    '          </div>',
    '        </div>',
    '      </div>',
    '      <div style="flex: 1 1 420px; min-height: 560px; background: #F8FAFC; padding: 72px min(8vw, 80px); display: flex; align-items: center; justify-content: center;">',
    '        <div style="width: min(100%, 520px);">',
    '          <div style="aspect-ratio: 4 / 3; border-radius: 18px; background: linear-gradient(135deg, #e2e8f0, #f8fafc); border: 1px solid #e2e8f0; box-shadow: inset 0 0 0 1px rgba(255,255,255,.75);"></div>',
    '          <div style="margin-top: 30px; width: 55%; height: 24px; border-radius: 8px; background: #dbeafe;"></div>',
    '          <div style="margin-top: 12px; width: 78%; height: 12px; border-radius: 999px; background: #e2e8f0;"></div>',
    '          <div style="margin-top: 10px; width: 58%; height: 12px; border-radius: 999px; background: #e2e8f0;"></div>',
    '        </div>',
    '      </div>',
    '    </section>',
    '  </main>',
    '</div>'
  ].filter(Boolean).join('\n');
}

function renderStaticRoot(meta) {
  const content = meta.content;
  const title = content?.title || meta.title;
  const description = content?.description || meta.description;
  const canonicalUrl = absolute(meta.canonicalPath || content?.path || '/');
  const datasheetUrl = content?.datasheetUrl ? externalOrAbsolute(content.datasheetUrl) : '';

  return [
    renderPrerenderShell(),
    '<main data-prerender="marketing-seo" style="font-family: Inter, Arial, sans-serif; color: #0f172a; background: #ffffff;">',
    '  <section style="padding: 48px 24px; background: #0A4F7D; color: #ffffff;">',
    '    <div style="max-width: 1040px; margin: 0 auto;">',
    '      <p style="margin: 0 0 12px; font-size: 12px; font-weight: 800; letter-spacing: .18em; text-transform: uppercase;">AquaVerify</p>',
    `      <h1 style="margin: 0; max-width: 860px; font-size: 42px; line-height: 1.08;">${escapeHtml(title)}</h1>`,
    `      <p style="margin: 20px 0 0; max-width: 760px; font-size: 18px; line-height: 1.7;">${escapeHtml(description)}</p>`,
    renderHeroVisual(meta, content, title),
    '      <p style="margin: 28px 0 0;">',
    `        <a href="${escapeHtml(canonicalUrl)}" style="color: #ffffff; font-weight: 800;">${escapeHtml(title)}</a>`,
    datasheetUrl ? `        <a href="${escapeHtml(datasheetUrl)}" style="color: #ffffff; font-weight: 800; margin-left: 18px;">${escapeHtml(content?.datasheetLabel || 'Datasheet')}</a>` : '',
    '      </p>',
    '    </div>',
    '  </section>',
    content ? [
      '  <section style="padding: 42px 24px;">',
      '    <div style="max-width: 1040px; margin: 0 auto;">',
      renderFeaturedWhitepapers(meta.page, meta.lang),
      renderSectionList(content.sections || []),
      renderWhitepaperDeepDive(content.whitepaper),
      renderFaqs(content.faqs || []),
      '    </div>',
      '  </section>'
    ].join('\n') : '',
    '</main>'
  ].filter(Boolean).join('\n');
}

function jsonLdScript(id, payload) {
  return `  <script type="application/ld+json" data-id="${id}">\n${JSON.stringify(payload, null, 2)}\n  </script>`;
}

function getHomePath(lang) {
  return lang === 'en' ? '/' : `/${lang}`;
}

function buildBreadcrumbs(page, content, lang) {
  const crumbs = [{ name: 'AquaVerify', path: getHomePath(lang) }];

  if (page.category === 'products' && page.id !== 'products') {
    crumbs.push({ name: PRODUCT_LABELS[lang] || PRODUCT_LABELS.en, path: getMarketingPagePath('products', lang) });
  }

  if (page.parentId) {
    const parent = getMarketingPageSummary(page.parentId, lang);
    if (parent && parent.path !== content.path) {
      crumbs.push({ name: parent.title, path: parent.path });
    }
  }

  crumbs.push({ name: content.title, path: content.path });
  return crumbs.filter((crumb, index, all) => all.findIndex((item) => item.path === crumb.path) === index);
}

function buildStructuredData({ page, content, lang, canonicalUrl, title, description, imageUrl }) {
  const pageType = page?.schemaType || page?.category;
  const payloads = [{
    id: 'marketing-page',
    data: {
      '@context': 'https://schema.org',
      '@type': pageType === 'Product' ? 'Product' : pageType === 'resources' ? 'Article' : 'WebPage',
      name: title,
      description,
      url: canonicalUrl,
      image: imageUrl,
      ...(pageType === 'Product' ? {
        brand: {
          '@type': 'Brand',
          name: 'AquaVerify'
        }
      } : {}),
      isPartOf: {
        '@type': 'WebSite',
        name: 'AquaVerify',
        url: SITE_URL
      },
      publisher: {
        '@type': 'Organization',
        name: 'AquaVerify',
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo-mark-160.png`
      }
    }
  }];

  if (page && content) {
    payloads.push({
      id: 'marketing-breadcrumbs',
      data: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: buildBreadcrumbs(page, content, lang).map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: absolute(item.path)
        }))
      }
    });
  }

  if (content?.faqs?.length) {
    payloads.push({
      id: 'marketing-faq',
      data: {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: content.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      }
    });
  }

  return payloads.map((item) => jsonLdScript(item.id, item.data)).join('\n');
}

function seoHeadBlock({ lang, title, description, canonicalPath, alternates, page, content }) {
  const canonicalUrl = absolute(canonicalPath);
  const imageUrl = absoluteAsset(content?.ogImage || content?.heroImage);
  const alternateTags = Object.entries(alternates)
    .filter(([, routePath]) => Boolean(routePath))
    .map(([alternateLang, routePath]) => `  <link rel="alternate" hreflang="${alternateLang}" href="${absolute(routePath)}" />`)
    .join('\n');

  return [
    `  <title>${escapeHtml(title)}</title>`,
    `  <meta name="description" content="${escapeHtml(description)}" />`,
    '  <meta name="robots" content="index, follow, max-image-preview:large" />',
    `  <link rel="canonical" href="${canonicalUrl}" />`,
    alternateTags,
    '  <meta property="og:type" content="website" />',
    '  <meta property="og:site_name" content="AquaVerify" />',
    `  <meta property="og:title" content="${escapeHtml(title)}" />`,
    `  <meta property="og:description" content="${escapeHtml(description)}" />`,
    `  <meta property="og:url" content="${canonicalUrl}" />`,
    `  <meta property="og:image" content="${imageUrl}" />`,
    `  <meta property="og:locale" content="${SEO_LOCALES[lang] || SEO_LOCALES.en}" />`,
    '  <meta name="twitter:card" content="summary_large_image" />',
    `  <meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `  <meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `  <meta name="twitter:image" content="${imageUrl}" />`,
    buildStructuredData({ page, content, lang, canonicalUrl, title, description, imageUrl })
  ].join('\n');
}

function removeDefaultShareMetadata(suffix) {
  const startMarker = '  <!-- AquaVerify default share metadata -->';
  const endMarker = '  <!-- Google Fonts: Montserrat (Headers) & Inter (Body) -->';
  const startIndex = suffix.indexOf(startMarker);
  const endIndex = suffix.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    return suffix;
  }

  return `${suffix.slice(0, startIndex)}${suffix.slice(endIndex)}`;
}

function moveStylesBeforeModuleScripts(html) {
  const headEndIndex = html.indexOf('</head>');
  if (headEndIndex === -1) return html;

  const head = html.slice(0, headEndIndex);
  const rest = html.slice(headEndIndex);
  const stylesheetPattern = /^  <link rel="stylesheet"[^>]*>\n/gm;
  const stylesheets = head.match(stylesheetPattern) || [];
  if (!stylesheets.length) return html;

  const headWithoutStyles = head.replace(stylesheetPattern, '');
  const scriptIndex = headWithoutStyles.search(/^  <script type="module"/m);
  if (scriptIndex === -1) return html;

  const updatedHead = [
    headWithoutStyles.slice(0, scriptIndex),
    stylesheets.join(''),
    headWithoutStyles.slice(scriptIndex)
  ].join('');

  return `${updatedHead}${rest}`;
}

function renderHtml(template, meta) {
  const identityMarker = '  <!-- AquaVerify platform identity -->';
  const rootMarker = '  <div id="root"></div>';
  const titleIndex = template.indexOf('  <title>');
  const markerIndex = template.indexOf(identityMarker);

  if (titleIndex === -1 || markerIndex === -1) {
    throw new Error('Unable to find SEO head markers in dist/index.html');
  }

  const html = template
    .replace(/<html lang="[^"]+"/, `<html lang="${meta.lang}"`)
    .slice(0, titleIndex)
    .concat(seoHeadBlock(meta), '\n', removeDefaultShareMetadata(template.slice(markerIndex)));

  if (!html.includes(rootMarker)) {
    throw new Error('Unable to find root marker in dist/index.html');
  }

  return moveStylesBeforeModuleScripts(
    html.replace(rootMarker, `  <div id="root">\n${renderStaticRoot(meta)}\n  </div>`)
  );
}

async function writeRouteHtml(routePath, html) {
  const normalized = routePath === '/' ? '' : routePath.replace(/^\/+|\/+$/g, '');
  const filePath = normalized
    ? path.join(DIST_DIR, normalized, 'index.html')
    : path.join(DIST_DIR, 'index.html');

  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, html);
}

async function fetchMarketingOverrides() {
  if (!supabaseUrl || !supabaseKey) {
    console.warn('Skipping marketing CMS overrides: missing Supabase env.');
    return new Map();
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: pages, error: pagesError } = await supabase
    .from('pages')
    .select('id,slug')
    .like('slug', 'marketing-%');

  if (pagesError || !pages?.length) {
    if (pagesError) console.warn(`Skipping marketing CMS overrides: ${pagesError.message}`);
    return new Map();
  }

  const pageIds = pages.map((page) => page.id);
  const { data: blocks, error: blocksError } = await supabase
    .from('content_blocks')
    .select('page_id,content')
    .eq('section_id', MARKETING_OVERRIDE_SECTION_ID)
    .in('page_id', pageIds);

  if (blocksError || !blocks?.length) {
    if (blocksError) console.warn(`Skipping marketing CMS overrides: ${blocksError.message}`);
    return new Map();
  }

  const slugByPageId = new Map(pages.map((page) => [page.id, page.slug]));
  return blocks.reduce((acc, block) => {
    const slug = slugByPageId.get(block.page_id);
    const content = normalizeMarketingOverride(block.content);
    if (slug && content) acc.set(slug, content);
    return acc;
  }, new Map());
}

const template = await fs.readFile(path.join(DIST_DIR, 'index.html'), 'utf8');
const marketingOverrides = await fetchMarketingOverrides();
let written = 0;

await writeRouteHtml('/', renderHtml(template, {
  lang: 'en',
  title: HOME_META.en.title,
  description: HOME_META.en.description,
  canonicalPath: '/',
  alternates: HOME_ALTERNATES
}));
written += 1;

for (const lang of MARKETING_LANGUAGES) {
  const meta = HOME_META[lang];
  await writeRouteHtml(meta.path, renderHtml(template, {
    lang,
    title: meta.title,
    description: meta.description,
    canonicalPath: meta.path,
    alternates: HOME_ALTERNATES
  }));
  written += 1;
}

for (const page of MARKETING_PAGES) {
  const alternates = {
    'x-default': page.translations.en.path,
    ...getMarketingAlternates(page)
  };

  for (const lang of MARKETING_LANGUAGES) {
    const content = mergeMarketingContent(
      page.translations[lang],
      marketingOverrides.get(getMarketingOverrideSlug(page.id, lang))
    );
    if (!content?.path) continue;

    await writeRouteHtml(content.path, renderHtml(template, {
      lang,
      title: content.seoTitle || content.title,
      description: content.seoDescription || content.description,
      canonicalPath: content.path,
      alternates,
      page,
      content
    }));
    written += 1;
  }
}

console.log(`Prerendered ${written} SEO HTML routes.`);
