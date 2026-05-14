import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Download, Loader2, Upload } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CookieConsent } from '../components/CookieConsent';
import { WaterQualityControlLanding } from '../components/WaterQualityControlLanding';
import { WaterTestingLabsLanding } from '../components/WaterTestingLabsLanding';
import { MunicipalWaterLanding } from '../components/MunicipalWaterLanding';
import { FoodBeverageWaterLanding } from '../components/FoodBeverageWaterLanding';
import { IndustrialProcessWaterLanding } from '../components/IndustrialProcessWaterLanding';
import { FacilityWaterRiskLanding } from '../components/FacilityWaterRiskLanding';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../utils/translations';
import { getPlatformSignupUrl } from '../utils/platformLinks';
import { trackCorporateEvent } from '../utils/corporateAnalytics';
import { applyMarketingSeo } from '../utils/seo';
import { fetchMarketingPageOverride } from '../utils/publicMarketingOverrides';
import { mergeMarketingContent } from '../utils/marketingPageOverrides.js';
import {
  findMarketingPageByPath,
  getMarketingAlternates,
  getMarketingPagePath,
  getMarketingPageSummary,
  getRelatedMarketingPages,
  MARKETING_PAGES
} from '../utils/marketingPages.js';

const secondaryTargetByCategory: Record<string, string> = {
  products: 'platform',
  platform: 'products',
  partners: 'products',
  industries: 'products',
  resources: 'products',
  company: 'products'
};

type MarketingPageMeta = {
  parentId?: string;
  schemaType?: string;
  productName?: string;
};

const UI_LABELS: Record<Language, {
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

const FEATURED_WHITEPAPER_IDS = [
  'coliphages-indicators',
  'eu-drinking-water-directive-coliphages',
  'water-compliance-software-guide',
  'us-drinking-water-compliance-coliform-rule'
];

const FEATURED_WHITEPAPER_COPY: Record<Language, {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  badges: Record<string, string>;
}> = {
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

type MarketingContentMeta = {
  faqs?: Array<{ question: string; answer: string }>;
  gallery?: Array<{ src: string; alt: string; title?: string; body?: string; fit?: 'cover' | 'contain' }>;
  visuals?: Record<string, unknown>;
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

type WhitepaperMetric = {
  label: string;
  value: string;
  body: string;
  tone?: WhitepaperTone;
};

type WhitepaperComparison = {
  label: string;
  title: string;
  body: string;
  valuePercent?: number;
  tone?: WhitepaperTone;
};

type WhitepaperFlowStep = {
  title: string;
  body: string;
};

type WhitepaperTimelineItem = {
  year: string;
  region: string;
  sector: string;
  body: string;
};

type WhitepaperDeepDiveContent = {
  eyebrow?: string;
  title: string;
  intro: string;
  metrics?: WhitepaperMetric[];
  comparisonTitle?: string;
  comparison?: WhitepaperComparison[];
  flowTitle?: string;
  flow?: WhitepaperFlowStep[];
  timelineTitle?: string;
  timeline?: WhitepaperTimelineItem[];
  sourceLabel?: string;
  note?: string;
};

function toPublicAssetUrl(value: string | undefined) {
  const trimmed = value?.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

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

const FeaturedWhitepapersBlock: React.FC<{
  lang: Language;
  items: Array<{ id: string; title: string; description: string; path: string }>;
}> = ({ lang, items }) => {
  const copy = FEATURED_WHITEPAPER_COPY[lang] || FEATURED_WHITEPAPER_COPY.en;
  if (!items.length) return null;

  return (
    <section className="pb-2">
      <div className="max-w-3xl">
        <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">{copy.eyebrow}</div>
        <h2 className="mt-3 font-heading text-3xl font-black text-primary">{copy.title}</h2>
        <p className="mt-3 text-base leading-7 text-slate-600">{copy.body}</p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className="group flex h-full flex-col rounded-2xl border border-cyan-100 bg-cyan-50/60 p-5 shadow-sm transition hover:-translate-y-1 hover:border-primary/30 hover:bg-white hover:shadow-lg"
          >
            <span className="w-fit rounded-full border border-cyan-100 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-cyan-800">
              {copy.badges[item.id] || copy.eyebrow}
            </span>
            <h3 className="mt-4 font-heading text-lg font-black leading-snug text-slate-900">{item.title}</h3>
            <p className="mt-3 flex-grow text-sm leading-6 text-slate-600">{item.description}</p>
            <span className="mt-5 inline-flex items-center text-sm font-black text-primary group-hover:text-secondary">
              {copy.cta}
              <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

function getHomePath(lang: Language) {
  return lang === 'en' ? '/' : `/${lang}`;
}

function buildMarketingBreadcrumbs(page: any, content: MarketingContentMeta, lang: Language, labels: typeof UI_LABELS.en) {
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
    const parent = getMarketingPageSummary(pageMeta.parentId, lang);
    if (parent && parent.path !== content.path) {
      crumbs.push({ name: parent.title, path: parent.path });
    }
  }

  crumbs.push({ name: content.title, path: content.path });
  return crumbs.filter((crumb, index, all) => all.findIndex((item) => item.path === crumb.path) === index);
}

type MarketingPageDocumentProps = {
  page: any;
  content: any;
  pageLang: Language;
  showCookieConsent?: boolean;
  isEditing?: boolean;
  onTextChange?: (path: string, value: string) => void;
  onImageChange?: (path: string, value: string) => void;
  uploadImage?: (file: File) => Promise<string | null>;
};

export const MarketingPagePreview: React.FC<{
  pageId: string;
  pageLang: Language;
  contentOverride?: Record<string, unknown> | null;
  showCookieConsent?: boolean;
  isEditing?: boolean;
  onTextChange?: (path: string, value: string) => void;
  onImageChange?: (path: string, value: string) => void;
  uploadImage?: (file: File) => Promise<string | null>;
}> = ({
  pageId,
  pageLang,
  contentOverride = null,
  showCookieConsent = false,
  isEditing = false,
  onTextChange,
  onImageChange,
  uploadImage
}) => {
  const page = (MARKETING_PAGES as any[]).find((item) => item.id === pageId);
  const baseContent = page?.translations?.[pageLang];

  if (!page || !baseContent) {
    return <div className="p-8 text-sm font-semibold text-slate-500">Preview not available.</div>;
  }

  const content = mergeMarketingContent(baseContent, contentOverride);
  return (
    <MarketingPageDocument
      page={page}
      content={content}
      pageLang={pageLang}
      showCookieConsent={showCookieConsent}
      isEditing={isEditing}
      onTextChange={onTextChange}
      onImageChange={onImageChange}
      uploadImage={uploadImage}
    />
  );
};

type EditableMarketingTextProps = {
  path: string;
  value?: string;
  fallback?: string;
  as?: React.ElementType;
  className?: string;
  isEditing?: boolean;
  onTextChange?: (path: string, value: string) => void;
};

const EditableMarketingText: React.FC<EditableMarketingTextProps> = ({
  path,
  value,
  fallback = '',
  as: Component = 'span',
  className = '',
  isEditing = false,
  onTextChange
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const editRef = useRef<HTMLElement>(null);
  const currentValue = value !== undefined && value !== null ? String(value) : fallback;

  if (!isEditing || !onTextChange) {
    return <Component className={className}>{currentValue}</Component>;
  }

  return (
    <Component
      ref={editRef as any}
      className={`${className} cursor-text transition-all duration-150 ${
        isHovered && !isFocused ? 'rounded-sm ring-2 ring-blue-400/50 ring-offset-2 ring-offset-white/20' : ''
      } ${
        isFocused ? 'relative z-10 rounded-sm bg-white px-1 text-slate-900 outline-none ring-2 ring-blue-500' : ''
      }`}
      contentEditable
      suppressContentEditableWarning
      onClick={(event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        event.stopPropagation();
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={(event: React.FocusEvent<HTMLElement>) => {
        setIsFocused(false);
        const nextValue = event.currentTarget.textContent || '';
        if (nextValue !== currentValue) onTextChange(path, nextValue);
      }}
      style={{ minWidth: '2ch', minHeight: '1.25em', display: 'inline-block' }}
    >
      {currentValue}
    </Component>
  );
};

type EditableMarketingImageProps = {
  path: string;
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  decoding?: 'async' | 'auto' | 'sync';
  isEditing?: boolean;
  onImageChange?: (path: string, value: string) => void;
  uploadImage?: (file: File) => Promise<string | null>;
};

const EditableMarketingImage: React.FC<EditableMarketingImageProps> = ({
  path,
  src,
  alt,
  className = '',
  loading,
  decoding,
  isEditing = false,
  onImageChange,
  uploadImage
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const openPicker = (event: React.MouseEvent) => {
    if (!isEditing || isUploading) return;
    event.preventDefault();
    event.stopPropagation();
    inputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !uploadImage || !onImageChange) return;

    setIsUploading(true);
    try {
      const publicUrl = await uploadImage(file);
      if (publicUrl) {
        onImageChange(path, publicUrl);
      } else {
        window.alert('Upload failed. Check that the Supabase "images" bucket is public and available.');
      }
    } catch (error) {
      console.error('Failed to upload marketing image:', error);
      window.alert('Upload failed. Check that the Supabase "images" bucket is public and available.');
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  if (!isEditing || !onImageChange || !uploadImage) {
    return <img src={src} alt={alt} className={className} loading={loading} decoding={decoding} />;
  }

  return (
    <div
      className="group relative h-full w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-200 ${isHovered || isUploading ? 'opacity-50' : 'opacity-100'}`}
        loading={loading}
        decoding={decoding}
      />
      <button
        type="button"
        onClick={openPicker}
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
          isHovered || isUploading ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="inline-flex items-center gap-2 rounded-lg bg-slate-900/85 px-4 py-2 text-sm font-bold text-white shadow-xl backdrop-blur">
          {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {isUploading ? 'Uploading...' : 'Change image'}
        </span>
      </button>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
    </div>
  );
};

type HeroCarouselItem = {
  src: string;
  alt: string;
  title?: string;
  body?: string;
  fit?: 'cover' | 'contain';
  sourceIndex: number;
};

const HeroScreenshotCarousel: React.FC<{
  items: HeroCarouselItem[];
  isEditing?: boolean;
  onImageChange?: (path: string, value: string) => void;
  uploadImage?: (file: File) => Promise<string | null>;
}> = ({
  items,
  isEditing = false,
  onImageChange,
  uploadImage
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const safeItems = items.filter((item) => item.src && item.alt);
  const activeItem = safeItems[activeIndex] || safeItems[0];

  useEffect(() => {
    if (activeIndex >= safeItems.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, safeItems.length]);

  useEffect(() => {
    if (isEditing || safeItems.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % safeItems.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [isEditing, safeItems.length]);

  if (!activeItem) return null;

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + safeItems.length) % safeItems.length);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % safeItems.length);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-2 shadow-2xl">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-950/20">
        {safeItems.map((item, index) => (
          <div
            key={`${item.src}-${item.sourceIndex}`}
            className={`absolute inset-0 transition-opacity duration-700 ${index === activeIndex ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
            aria-hidden={index !== activeIndex}
          >
            <EditableMarketingImage
              path={`gallery.${item.sourceIndex}.src`}
              src={item.src}
              alt={item.alt}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className="h-full w-full bg-white object-contain object-top"
              isEditing={isEditing}
              onImageChange={onImageChange}
              uploadImage={uploadImage}
            />
          </div>
        ))}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/90 via-primary/55 to-transparent px-5 pb-4 pt-14">
          <div className="min-h-[3rem]">
            {activeItem.title && (
              <p className="text-sm font-black text-white">{activeItem.title}</p>
            )}
            {activeItem.body && (
              <p className="mt-1 line-clamp-2 text-xs font-semibold leading-5 text-cyan-50/85">{activeItem.body}</p>
            )}
          </div>
        </div>

        {safeItems.length > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              className="absolute left-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-primary/75 text-white shadow-lg backdrop-blur transition hover:bg-secondary"
              aria-label="Previous platform screen"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-primary/75 text-white shadow-lg backdrop-blur transition hover:bg-secondary"
              aria-label="Next platform screen"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <div className="absolute right-4 top-4 flex gap-1.5">
              {safeItems.map((item, index) => (
                <button
                  key={`${item.src}-dot`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${index === activeIndex ? 'w-7 bg-secondary' : 'w-2.5 bg-white/70 hover:bg-white'}`}
                  aria-label={`Go to platform screen ${index + 1}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const MarketingPageDocument: React.FC<MarketingPageDocumentProps> = ({
  page,
  content,
  pageLang,
  showCookieConsent = true,
  isEditing = false,
  onTextChange,
  onImageChange,
  uploadImage
}) => {
  const contentMeta = content as MarketingContentMeta;
  const pageMeta = page as MarketingPageMeta;
  const primaryUrl = getPlatformSignupUrl({
    intent: page.primaryIntent,
    page: page.id,
    category: page.category,
    ...(pageMeta.productName ? { product: pageMeta.productName } : {})
  }, pageLang);
  const secondaryId = pageMeta.parentId || secondaryTargetByCategory[page.category] || 'products';
  const secondaryUrl = getMarketingPagePath(secondaryId, pageLang);
  const relatedPages = getRelatedMarketingPages(page.id, pageLang);
  const labels = UI_LABELS[pageLang] || UI_LABELS.en;
  const featuredWhitepapers = page.id === 'resources'
    ? FEATURED_WHITEPAPER_IDS
      .map((id) => getMarketingPageSummary(id, pageLang))
      .filter(Boolean) as Array<{ id: string; title: string; description: string; path: string }>
    : [];
  const breadcrumbs = buildMarketingBreadcrumbs(page, contentMeta, pageLang, labels);
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
  const shouldUseHeroCarousel = page.id === 'platform' && galleryItems.length > 1;
  const galleryTitle = page.id === 'water-quality-control'
    ? ({
      en: 'Infographics and workflows',
      es: 'Infografías y flujos',
      fr: 'Infographies et flux',
      it: 'Infografiche e workflow',
      ca: 'Infografies i fluxos'
    } as Record<Language, string>)[pageLang] || labels.screenshotsTitle
    : labels.screenshotsTitle;
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

  if (page.id === 'water-quality-control') {
    return (
      <WaterQualityControlLanding
        content={content}
        pageLang={pageLang}
        showCookieConsent={showCookieConsent}
      />
    );
  }

  if (page.id === 'water-testing-labs') {
    return (
      <WaterTestingLabsLanding
        content={content}
        pageLang={pageLang}
        showCookieConsent={showCookieConsent}
      />
    );
  }

  if (page.id === 'municipal-water-testing') {
    return (
      <MunicipalWaterLanding
        content={content}
        pageLang={pageLang}
        showCookieConsent={showCookieConsent}
      />
    );
  }

  if (page.id === 'food-beverage-water-quality') {
    return (
      <FoodBeverageWaterLanding
        content={content}
        pageLang={pageLang}
        showCookieConsent={showCookieConsent}
      />
    );
  }

  if (page.id === 'industrial-process-water') {
    return (
      <IndustrialProcessWaterLanding
        content={content}
        pageLang={pageLang}
        showCookieConsent={showCookieConsent}
      />
    );
  }

  if (page.id === 'facility-water-risk') {
    return (
      <FacilityWaterRiskLanding
        content={content}
        pageLang={pageLang}
        showCookieConsent={showCookieConsent}
      />
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-900">
      <Header />
      <main className="flex-grow pt-20">
        <section className="bg-primary text-white">
          <div className={`container mx-auto grid gap-10 px-6 py-20 md:py-24 ${hasHeroMedia ? 'lg:grid-cols-[1fr_0.82fr] lg:items-center' : ''}`}>
            <div className="max-w-4xl">
              {breadcrumbs.length > 1 && (
                <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1 text-xs font-bold text-cyan-100/80">
                  {breadcrumbs.map((crumb, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    return (
                      <React.Fragment key={crumb.path}>
                        {isLast ? (
                          <span className="max-w-[18rem] truncate text-white" aria-current="page">{crumb.name}</span>
                        ) : (
                          <Link to={crumb.path} className="max-w-[12rem] truncate transition hover:text-white">{crumb.name}</Link>
                        )}
                        {!isLast && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-cyan-100/45" aria-hidden="true" />}
                      </React.Fragment>
                    );
                  })}
                </nav>
              )}
              <div className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
                <EditableMarketingText
                  path="eyebrow"
                  value={content.eyebrow}
                  fallback={page.category}
                  isEditing={isEditing}
                  onTextChange={onTextChange}
                />
              </div>
              <EditableMarketingText
                as="h1"
                path="title"
                value={content.title}
                className="max-w-4xl font-heading text-4xl font-black leading-tight md:text-6xl"
                isEditing={isEditing}
                onTextChange={onTextChange}
              />
              <EditableMarketingText
                as="p"
                path="description"
                value={content.description}
                className="mt-6 max-w-3xl text-lg leading-8 text-cyan-50/85"
                isEditing={isEditing}
                onTextChange={onTextChange}
              />
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={primaryUrl}
                  className="inline-flex items-center justify-center rounded bg-secondary px-6 py-3 text-sm font-black text-white shadow-lg transition hover:bg-white hover:text-primary"
                >
                  <EditableMarketingText
                    path="primaryCta"
                    value={content.primaryCta}
                    fallback="Contact AquaVerify"
                    isEditing={isEditing}
                    onTextChange={onTextChange}
                  />
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <Link
                  to={secondaryUrl}
                  className="inline-flex items-center justify-center rounded border border-white/25 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10"
                >
                  <EditableMarketingText
                    path="secondaryCta"
                    value={content.secondaryCta}
                    fallback="Explore AquaVerify"
                    isEditing={isEditing}
                    onTextChange={onTextChange}
                  />
                </Link>
                {datasheetUrl && (
                  <a
                    href={datasheetUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={handleDatasheetClick}
                    className="inline-flex items-center justify-center rounded border border-white/25 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    <EditableMarketingText
                      path="datasheetLabel"
                      value={contentMeta.datasheetLabel}
                      fallback="Datasheet"
                      isEditing={isEditing}
                      onTextChange={onTextChange}
                    />
                  </a>
                )}
              </div>
            </div>
            {shouldUseHeroCarousel ? (
              <HeroScreenshotCarousel
                items={galleryItems}
                isEditing={isEditing}
                onImageChange={onImageChange}
                uploadImage={uploadImage}
              />
            ) : heroVideoUrl ? (
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
                <EditableMarketingImage
                  path="heroImage"
                  src={heroImageUrl}
                  alt={ogFallbackAlt}
                  className={heroImageClass}
                  loading="eager"
                  isEditing={isEditing}
                  onImageChange={onImageChange}
                  uploadImage={uploadImage}
                />
              </div>
            )}
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto max-w-5xl px-6">
            <div className="space-y-8">
              <FeaturedWhitepapersBlock lang={pageLang} items={featuredWhitepapers} />
              {content.sections.map((section: any, index: number) => (
                <article key={`${section.title}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                  <EditableMarketingText
                    as="h2"
                    path={`sections.${index}.title`}
                    value={section.title}
                    className="font-heading text-2xl font-black text-primary"
                    isEditing={isEditing}
                    onTextChange={onTextChange}
                  />
                  <EditableMarketingText
                    as="p"
                    path={`sections.${index}.body`}
                    value={section.body}
                    className="mt-3 text-base leading-8 text-slate-600"
                    isEditing={isEditing}
                    onTextChange={onTextChange}
                  />
                  {section.bullets?.length > 0 && (
                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                      {section.bullets.map((bullet: string, bulletIndex: number) => (
                        <li key={`${bullet}-${bulletIndex}`} className="flex gap-3 text-sm font-semibold text-slate-700">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                          <EditableMarketingText
                            path={`sections.${index}.bullets.${bulletIndex}`}
                            value={bullet}
                            isEditing={isEditing}
                            onTextChange={onTextChange}
                          />
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
                  <h2 className="font-heading text-2xl font-black text-primary">{galleryTitle}</h2>
                  <div className="mt-6 grid gap-5 md:grid-cols-2">
                    {galleryItems.map((item) => (
                      <figure key={item.src} className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                        <div className="aspect-[16/10] bg-white">
                          <EditableMarketingImage
                            path={`gallery.${item.sourceIndex}.src`}
                            src={item.src}
                            alt={item.alt}
                            loading="lazy"
                            decoding="async"
                            className={`h-full w-full ${item.fit === 'contain' ? 'object-contain' : 'object-cover object-top'}`}
                            isEditing={isEditing}
                            onImageChange={onImageChange}
                            uploadImage={uploadImage}
                          />
                        </div>
                        {(item.title || item.body) && (
                          <figcaption className="p-4">
                            {item.title && (
                              <EditableMarketingText
                                as="h3"
                                path={`gallery.${item.sourceIndex}.title`}
                                value={item.title}
                                className="font-heading text-base font-black text-slate-900"
                                isEditing={isEditing}
                                onTextChange={onTextChange}
                              />
                            )}
                            {item.body && (
                              <EditableMarketingText
                                as="p"
                                path={`gallery.${item.sourceIndex}.body`}
                                value={item.body}
                                className="mt-1 text-sm leading-6 text-slate-600"
                                isEditing={isEditing}
                                onTextChange={onTextChange}
                              />
                            )}
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
                        <EditableMarketingText
                          as="h3"
                          path={`faqs.${index}.question`}
                          value={faq.question}
                          className="font-heading text-lg font-black text-slate-900"
                          isEditing={isEditing}
                          onTextChange={onTextChange}
                        />
                        <EditableMarketingText
                          as="p"
                          path={`faqs.${index}.answer`}
                          value={faq.answer}
                          className="mt-2 text-sm leading-7 text-slate-600"
                          isEditing={isEditing}
                          onTextChange={onTextChange}
                        />
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
              <EditableMarketingText
                path="primaryCta"
                value={content.primaryCta}
                fallback="Contact AquaVerify"
                isEditing={isEditing}
                onTextChange={onTextChange}
              />
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

export const MarketingRoutePage: React.FC = () => {
  const location = useLocation();
  const match = findMarketingPageByPath(location.pathname);
  const { lang, setLang } = useLanguage();
  const [contentOverride, setContentOverride] = useState<Record<string, unknown> | null>(null);
  const trackedProductViewRef = useRef('');
  const matchPageId = match?.page?.id;
  const matchLang = match?.lang;

  useEffect(() => {
    if (match && match.lang !== lang) {
      setLang(match.lang as Language);
    }
  }, [lang, match, setLang]);

  useEffect(() => {
    setContentOverride(null);
    if (!matchPageId || !matchLang) return;

    const controller = new AbortController();
    fetchMarketingPageOverride(matchPageId, matchLang, controller.signal)
      .then(setContentOverride)
      .catch((error) => {
        if (error?.name !== 'AbortError') {
          console.warn('Unable to load marketing CMS override', error);
        }
      });

    return () => controller.abort();
  }, [matchLang, matchPageId]);

  const mergedContent = match ? mergeMarketingContent(match.content, contentOverride) : null;

  useEffect(() => {
    if (!match || !mergedContent) return;
    const pageLang = match.lang as Language;
    const labels = UI_LABELS[pageLang] || UI_LABELS.en;
    const contentMeta = mergedContent as MarketingContentMeta;

    applyMarketingSeo({
      lang: pageLang,
      title: mergedContent.seoTitle || mergedContent.title,
      description: mergedContent.seoDescription || mergedContent.description,
      canonicalPath: mergedContent.path,
      alternates: getMarketingAlternates(match.page),
      pageType: (match.page as MarketingPageMeta).schemaType || match.page.category,
      imageUrl: toPublicAssetUrl(contentMeta.ogImage || contentMeta.heroImage),
      faqs: contentMeta.faqs,
      breadcrumbs: buildMarketingBreadcrumbs(match.page, contentMeta, pageLang, labels)
    });
  }, [match, mergedContent]);

  useEffect(() => {
    if (!match || !mergedContent || match.page.category !== 'products') return;

    const pageLang = match.lang as Language;
    const pageMeta = match.page as MarketingPageMeta;
    const trackingKey = `${match.page.id}:${pageLang}:${mergedContent.path}`;
    if (trackedProductViewRef.current === trackingKey) return;

    const tracked = trackCorporateEvent('product_view', {
      lang: pageLang,
      page: match.page.id,
      category: match.page.category,
      product: pageMeta.productName || mergedContent.title,
      label: mergedContent.title,
      path: mergedContent.path
    });

    if (tracked) {
      trackedProductViewRef.current = trackingKey;
    }
  }, [match, mergedContent]);

  if (!match || !mergedContent) {
    return <Navigate to="/" replace />;
  }

  return (
    <MarketingPageDocument
      page={match.page}
      content={mergedContent}
      pageLang={match.lang as Language}
    />
  );
};

export default MarketingRoutePage;
