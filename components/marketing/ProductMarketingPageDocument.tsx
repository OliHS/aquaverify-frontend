import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronRight, Download } from 'lucide-react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { CookieConsent } from '../CookieConsent';
import { ProductHubLanding } from '../ProductHubLanding';
import type { Language } from '../../utils/translations';
import { getPlatformSignupUrl } from '../../utils/platformLinks';
import { trackCorporateEvent } from '../../utils/corporateAnalytics';
import { getMarketingPagePath } from '../../utils/marketingRoutes.js';
import { PRODUCT_MARKETING_PAGES } from '../../utils/marketing-pages/productPages.js';

export type MarketingPageMeta = {
  parentId?: string;
  schemaType?: string;
  productName?: string;
};

export type MarketingContentMeta = {
  faqs?: Array<{ question: string; answer: string }>;
  gallery?: Array<{ src: string; alt: string; title?: string; body?: string; fit?: 'cover' | 'contain' }>;
  heroImage?: string;
  heroImageAlt?: string;
  heroImageFit?: 'cover' | 'contain';
  heroVideo?: string;
  ogImage?: string;
  datasheetUrl?: string;
  datasheetLabel?: string;
  whitepaper?: WhitepaperDeepDiveContent;
  path: string;
  title: string;
};

type WhitepaperTone = 'cyan' | 'emerald' | 'indigo' | 'rose' | 'slate';

type WhitepaperDeepDiveContent = {
  eyebrow?: string;
  title: string;
  intro: string;
  metrics?: Array<{ label: string; value: string; body: string; tone?: WhitepaperTone }>;
  comparisonTitle?: string;
  comparison?: Array<{ label: string; title: string; body: string; valuePercent?: number; tone?: WhitepaperTone }>;
  flowTitle?: string;
  flow?: Array<{ title: string; body: string }>;
  timelineTitle?: string;
  timeline?: Array<{ year: string; region: string; sector: string; body: string }>;
  sourceLabel?: string;
  note?: string;
};

type ProductMarketingPageDocumentProps = {
  page: any;
  content: any;
  pageLang: Language;
  showCookieConsent?: boolean;
};

export const UI_LABELS: Record<Language, {
  products: string;
  relatedPages: string;
  nextStep: string;
  talkToAquaVerify: string;
  faqTitle: string;
  screenshotsTitle: string;
}> = {
  en: {
    products: 'Products',
    relatedPages: 'Related pages',
    nextStep: 'Next step',
    talkToAquaVerify: 'Talk to AquaVerify',
    faqTitle: 'Frequently asked questions',
    screenshotsTitle: 'Product screens'
  },
  es: {
    products: 'Productos',
    relatedPages: 'Páginas relacionadas',
    nextStep: 'Siguiente paso',
    talkToAquaVerify: 'Hablar con AquaVerify',
    faqTitle: 'Preguntas frecuentes',
    screenshotsTitle: 'Pantallas reales'
  },
  fr: {
    products: 'Produits',
    relatedPages: 'Pages associées',
    nextStep: 'Étape suivante',
    talkToAquaVerify: 'Parler à AquaVerify',
    faqTitle: 'Questions fréquentes',
    screenshotsTitle: 'Écrans produit'
  },
  it: {
    products: 'Prodotti',
    relatedPages: 'Pagine correlate',
    nextStep: 'Passo successivo',
    talkToAquaVerify: 'Parla con AquaVerify',
    faqTitle: 'Domande frequenti',
    screenshotsTitle: 'Schermate prodotto'
  },
  ca: {
    products: 'Productes',
    relatedPages: 'Pàgines relacionades',
    nextStep: 'Següent pas',
    talkToAquaVerify: 'Parlar amb AquaVerify',
    faqTitle: 'Preguntes freqüents',
    screenshotsTitle: 'Pantalles reals'
  }
};

const whitepaperToneClasses: Record<WhitepaperTone, {
  card: string;
  eyebrow: string;
  value: string;
  bar: string;
  step: string;
}> = {
  cyan: {
    card: 'border-cyan-100 bg-cyan-50/70',
    eyebrow: 'text-cyan-700',
    value: 'text-cyan-900',
    bar: 'bg-cyan-500',
    step: 'bg-cyan-600 text-white'
  },
  emerald: {
    card: 'border-emerald-100 bg-emerald-50/70',
    eyebrow: 'text-emerald-700',
    value: 'text-emerald-900',
    bar: 'bg-emerald-500',
    step: 'bg-emerald-600 text-white'
  },
  indigo: {
    card: 'border-indigo-100 bg-indigo-50/70',
    eyebrow: 'text-indigo-700',
    value: 'text-indigo-900',
    bar: 'bg-indigo-500',
    step: 'bg-indigo-600 text-white'
  },
  rose: {
    card: 'border-rose-100 bg-rose-50/70',
    eyebrow: 'text-rose-700',
    value: 'text-rose-900',
    bar: 'bg-rose-500',
    step: 'bg-rose-600 text-white'
  },
  slate: {
    card: 'border-slate-200 bg-slate-50',
    eyebrow: 'text-slate-500',
    value: 'text-slate-900',
    bar: 'bg-slate-400',
    step: 'bg-slate-800 text-white'
  }
};

export function toPublicAssetUrl(value: string | undefined) {
  const trimmed = value?.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

function getHomePath(lang: Language) {
  return lang === 'en' ? '/' : `/${lang}`;
}

function getProductPageContent(page: any, lang: Language) {
  return page?.content?.[lang] || page?.content?.en || null;
}

function getProductPageSummary(pageId: string | undefined, lang: Language) {
  if (!pageId) return null;
  const page = PRODUCT_MARKETING_PAGES.find((item: any) => item.id === pageId);
  const content = getProductPageContent(page, lang);
  if (!page || !content) return null;
  return {
    id: page.id,
    title: content.title,
    description: content.description,
    path: content.path
  };
}

function getProductRelatedPages(page: any, lang: Language) {
  const pageMeta = page as MarketingPageMeta;
  const relatedIds = new Set<string>();

  if (pageMeta.parentId) {
    relatedIds.add(pageMeta.parentId);
    PRODUCT_MARKETING_PAGES
      .filter((item: any) => item.id !== page.id && item.parentId === pageMeta.parentId)
      .slice(0, 3)
      .forEach((item: any) => relatedIds.add(item.id));
  } else {
    PRODUCT_MARKETING_PAGES
      .filter((item: any) => item.id !== page.id && item.parentId === page.id)
      .slice(0, 4)
      .forEach((item: any) => relatedIds.add(item.id));
  }

  if (relatedIds.size < 4) {
    PRODUCT_MARKETING_PAGES
      .filter((item: any) => item.id !== page.id && item.category === 'products' && !relatedIds.has(item.id))
      .slice(0, 4 - relatedIds.size)
      .forEach((item: any) => relatedIds.add(item.id));
  }

  return [...relatedIds]
    .map((id) => getProductPageSummary(id, lang))
    .filter(Boolean)
    .slice(0, 4);
}

export function buildProductMarketingBreadcrumbs(page: any, content: MarketingContentMeta, lang: Language, labels: typeof UI_LABELS.en) {
  const pageMeta = page as MarketingPageMeta;
  const crumbs = [
    { name: 'AquaVerify', path: getHomePath(lang) }
  ];

  if (page.category === 'products' && page.id !== 'products') {
    crumbs.push({
      name: labels.products,
      path: getMarketingPagePath('products', lang)
    });
  }

  if (pageMeta.parentId) {
    const parent = getProductPageSummary(pageMeta.parentId, lang);
    if (parent && parent.path !== content.path) {
      crumbs.push({ name: parent.title, path: parent.path });
    }
  }

  crumbs.push({ name: content.title, path: content.path });
  return crumbs.filter((crumb, index, all) => all.findIndex((item) => item.path === crumb.path) === index);
}

function clampPercent(value: number | undefined) {
  if (!Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, Number(value)));
}

const WhitepaperDeepDive: React.FC<{ content: WhitepaperDeepDiveContent }> = ({ content }) => {
  const metrics = content.metrics || [];
  const comparison = content.comparison || [];
  const flow = content.flow || [];
  const timeline = content.timeline || [];

  return (
    <article className="overflow-hidden rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-slate-50 shadow-sm">
      <div className="border-b border-cyan-100/70 p-7">
        <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">{content.eyebrow || 'Whitepaper visual brief'}</div>
        <h2 className="mt-3 font-heading text-2xl font-black text-primary md:text-3xl">{content.title}</h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">{content.intro}</p>
      </div>

      {metrics.length > 0 && (
        <div className="grid gap-4 p-7 md:grid-cols-3">
          {metrics.map((metric) => {
            const tone = whitepaperToneClasses[metric.tone || 'cyan'];
            return (
              <div key={`${metric.label}-${metric.value}`} className={`rounded-xl border p-5 ${tone.card}`}>
                <div className={`text-[10px] font-black uppercase tracking-[0.16em] ${tone.eyebrow}`}>{metric.label}</div>
                <div className={`mt-3 font-heading text-2xl font-black leading-tight ${tone.value}`}>{metric.value}</div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{metric.body}</p>
              </div>
            );
          })}
        </div>
      )}

      {comparison.length > 0 && (
        <div className="border-t border-cyan-100/70 p-7">
          {content.comparisonTitle && (
            <h3 className="font-heading text-xl font-black text-primary">{content.comparisonTitle}</h3>
          )}
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {comparison.map((item) => {
              const tone = whitepaperToneClasses[item.tone || 'cyan'];
              const percent = clampPercent(item.valuePercent);
              return (
                <div key={`${item.label}-${item.title}`} className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className={`text-[10px] font-black uppercase tracking-[0.16em] ${tone.eyebrow}`}>{item.label}</div>
                  <h4 className="mt-2 font-heading text-lg font-black text-slate-900">{item.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
                  {percent > 0 && (
                    <div className="mt-5">
                      <div className="h-2 rounded-full bg-slate-100">
                        <div className={`h-2 rounded-full ${tone.bar}`} style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {flow.length > 0 && (
        <div className="border-t border-cyan-100/70 p-7">
          {content.flowTitle && (
            <h3 className="font-heading text-xl font-black text-primary">{content.flowTitle}</h3>
          )}
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {flow.map((step, index) => {
              const tone = whitepaperToneClasses[index % 2 === 0 ? 'cyan' : 'indigo'];
              return (
                <div key={`${step.title}-${index}`} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black ${tone.step}`}>
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-heading text-base font-black text-slate-900">{step.title}</h4>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{step.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {timeline.length > 0 && (
        <div className="border-t border-cyan-100/70 p-7">
          {content.timelineTitle && (
            <h3 className="font-heading text-xl font-black text-primary">{content.timelineTitle}</h3>
          )}
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {timeline.map((item) => (
              <div key={`${item.year}-${item.region}-${item.sector}`} className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-black text-white">{item.year}</span>
                  <span className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-cyan-800">{item.region}</span>
                </div>
                <h4 className="mt-3 font-heading text-base font-black text-slate-900">{item.sector}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {(content.sourceLabel || content.note) && (
        <div className="border-t border-cyan-100/70 bg-white/70 p-7">
          {content.sourceLabel && (
            <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">{content.sourceLabel}</p>
          )}
          {content.note && (
            <p className="mt-2 text-sm leading-6 text-slate-500">{content.note}</p>
          )}
        </div>
      )}
    </article>
  );
};

export const ProductMarketingPageDocument: React.FC<ProductMarketingPageDocumentProps> = ({
  page,
  content,
  pageLang,
  showCookieConsent = true
}) => {
  if (page.id === 'products') {
    return (
      <ProductHubLanding
        content={content}
        pageLang={pageLang}
        showCookieConsent={showCookieConsent}
      />
    );
  }

  const contentMeta = content as MarketingContentMeta;
  const pageMeta = page as MarketingPageMeta;
  const labels = UI_LABELS[pageLang] || UI_LABELS.en;
  const primaryUrl = getPlatformSignupUrl({
    intent: page.primaryIntent,
    page: page.id,
    category: page.category,
    ...(pageMeta.productName ? { product: pageMeta.productName } : {})
  }, pageLang);
  const secondaryId = pageMeta.parentId || 'platform';
  const secondaryUrl = getMarketingPagePath(secondaryId, pageLang);
  const relatedPages = getProductRelatedPages(page, pageLang);
  const breadcrumbs = buildProductMarketingBreadcrumbs(page, contentMeta, pageLang, labels);
  const heroImageUrl = toPublicAssetUrl(contentMeta.heroImage);
  const heroVideoUrl = toPublicAssetUrl(contentMeta.heroVideo);
  const heroImageClass = contentMeta.heroImageFit === 'contain'
    ? 'h-full max-h-[420px] w-full object-contain'
    : 'h-full max-h-[420px] w-full object-cover';
  const heroVideoClass = 'h-full max-h-[420px] w-full object-contain';
  const heroImageFrameClass = contentMeta.heroImageFit === 'contain'
    ? 'overflow-visible'
    : 'overflow-hidden rounded-md border border-white/15 bg-white/5';
  const hasHeroMedia = Boolean(heroVideoUrl || heroImageUrl);
  const ogFallbackAlt = contentMeta.heroImageAlt || content.title;
  const datasheetUrl = toPublicAssetUrl(contentMeta.datasheetUrl);
  const galleryItems = (contentMeta.gallery || [])
    .map((item, sourceIndex) => ({
      ...item,
      sourceIndex,
      src: toPublicAssetUrl(item.src)
    }))
    .filter((item) => item.src && item.alt);

  const handleDatasheetClick = () => {
    trackCorporateEvent('datasheet_click', {
      lang: pageLang,
      page: page.id,
      category: page.category,
      product: pageMeta.productName || content.title,
      label: contentMeta.datasheetLabel || 'Datasheet',
      target_url: datasheetUrl,
      path: content.path
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-900">
      <Header />
      <main className="flex-grow pt-20">
        <section className="aq-page-hero">
          <div className={`container mx-auto grid gap-10 px-6 py-20 md:py-24 ${hasHeroMedia ? 'lg:grid-cols-[1fr_0.82fr] lg:items-center' : ''}`}>
            <div className="max-w-4xl">
              {breadcrumbs.length > 1 && (
                <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1 text-xs font-bold text-slate-500">
                  {breadcrumbs.map((crumb, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    return (
                      <React.Fragment key={crumb.path}>
                        {isLast ? (
                          <span className="max-w-[18rem] truncate text-primary" aria-current="page">{crumb.name}</span>
                        ) : (
                          <Link to={crumb.path} className="max-w-[12rem] truncate transition hover:text-primary">{crumb.name}</Link>
                        )}
                        {!isLast && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-300" aria-hidden="true" />}
                      </React.Fragment>
                    );
                  })}
                </nav>
              )}
              <div className="aq-hero-eyebrow mb-5">{content.eyebrow || page.category}</div>
              <h1 className="aq-gradient-title max-w-4xl font-heading text-4xl font-black leading-tight md:text-6xl">{content.title}</h1>
              <p className="aq-hero-copy mt-6 max-w-3xl text-lg leading-8">{content.description}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={primaryUrl} className="aq-cta-primary">
                  {content.primaryCta || 'Contact AquaVerify'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <Link to={secondaryUrl} className="aq-cta-secondary">
                  {content.secondaryCta || 'Explore AquaVerify'}
                </Link>
                {datasheetUrl && (
                  <a
                    href={datasheetUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={handleDatasheetClick}
                    className="aq-cta-secondary"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {contentMeta.datasheetLabel || 'Datasheet'}
                  </a>
                )}
              </div>
            </div>
            {heroVideoUrl ? (
              <div className="overflow-visible">
                <video
                  className={heroVideoClass}
                  src={heroVideoUrl}
                  poster={heroImageUrl || undefined}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-label={ogFallbackAlt}
                />
              </div>
            ) : heroImageUrl && (
              <div className={heroImageFrameClass}>
                <img
                  src={heroImageUrl}
                  alt={ogFallbackAlt}
                  className={heroImageClass}
                  loading="eager"
                  decoding="async"
                />
              </div>
            )}
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto max-w-5xl px-6">
            <div className="space-y-8">
              {(content.sections || []).map((section: any, index: number) => (
                <article key={`${section.title}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                  <h2 className="font-heading text-2xl font-black text-primary">{section.title}</h2>
                  <p className="mt-3 text-base leading-8 text-slate-600">{section.body}</p>
                  {section.bullets?.length > 0 && (
                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                      {section.bullets.map((bullet: string, bulletIndex: number) => (
                        <li key={`${bullet}-${bulletIndex}`} className="flex gap-3 text-sm font-semibold text-slate-700">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}

              {contentMeta.whitepaper && (
                <WhitepaperDeepDive content={contentMeta.whitepaper} />
              )}

              {galleryItems.length > 0 && (
                <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                  <h2 className="font-heading text-2xl font-black text-primary">{labels.screenshotsTitle}</h2>
                  <div className="mt-6 grid gap-5 md:grid-cols-2">
                    {galleryItems.map((item) => (
                      <figure key={item.src} className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                        <div className="aspect-[16/10] bg-white">
                          <img
                            src={item.src}
                            alt={item.alt}
                            loading="lazy"
                            decoding="async"
                            className={`h-full w-full ${item.fit === 'contain' ? 'object-contain' : 'object-cover object-top'}`}
                          />
                        </div>
                        {(item.title || item.body) && (
                          <figcaption className="p-4">
                            {item.title && <h3 className="font-heading text-base font-black text-slate-900">{item.title}</h3>}
                            {item.body && <p className="mt-1 text-sm leading-6 text-slate-600">{item.body}</p>}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                </article>
              )}

              {contentMeta.faqs && contentMeta.faqs.length > 0 && (
                <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                  <h2 className="font-heading text-2xl font-black text-primary">{labels.faqTitle}</h2>
                  <div className="mt-6 divide-y divide-slate-200">
                    {contentMeta.faqs.map((faq, index) => (
                      <div key={`${faq.question}-${index}`} className="py-5 first:pt-0 last:pb-0">
                        <h3 className="font-heading text-lg font-black text-slate-900">{faq.question}</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </article>
              )}
            </div>
          </div>
        </section>

        {relatedPages.length > 0 && (
          <section className="bg-surface py-16">
            <div className="container mx-auto px-6">
              <h2 className="font-heading text-3xl font-black text-primary">{labels.relatedPages}</h2>
              <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {relatedPages.map((related: any) => (
                  <Link
                    key={related.id}
                    to={related.path}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <h3 className="font-heading text-lg font-black text-slate-900">{related.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{related.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-primary py-14 text-white">
          <div className="container mx-auto flex flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">{labels.nextStep}</div>
              <h2 className="mt-2 font-heading text-3xl font-black">{labels.talkToAquaVerify}</h2>
            </div>
            <a
              href={primaryUrl}
              className="inline-flex items-center rounded bg-white px-6 py-3 text-sm font-black text-primary transition hover:bg-secondary hover:text-white"
            >
              {content.primaryCta || 'Contact AquaVerify'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
      {showCookieConsent && <CookieConsent />}
    </div>
  );
};

export default ProductMarketingPageDocument;
