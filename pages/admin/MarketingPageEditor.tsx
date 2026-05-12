import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, CheckCircle2, Image as ImageIcon, Loader2, Plus, Save, Trash2, Upload } from 'lucide-react';
import { supabase } from '../../utils/supabase';
import {
  LANGUAGE_NAMES,
  MARKETING_LANGUAGES,
  MARKETING_PAGES
} from '../../utils/marketingPages.js';
import {
  getMarketingOverrideSlug,
  MARKETING_OVERRIDE_SECTION_ID,
  mergeMarketingContent
} from '../../utils/marketingPageOverrides.js';
import { scanProductClaimFields } from '../../utils/productClaims.js';
import { useLanguage } from '../../context/LanguageContext';
import { MarketingPagePreview } from '../MarketingRoutePage';

type MarketingLanguage = 'en' | 'es' | 'fr' | 'it' | 'ca';

type SectionDraft = {
  title: string;
  body: string;
  bullets: string;
};

type FaqDraft = {
  question: string;
  answer: string;
};

type GalleryDraft = {
  src: string;
  alt: string;
  title: string;
  body: string;
};

type MarketingContent = {
  path: string;
  title: string;
  description: string;
  eyebrow?: string;
  primaryCta?: string;
  secondaryCta?: string;
  heroImage?: string;
  heroImageAlt?: string;
  ogImage?: string;
  datasheetUrl?: string;
  datasheetLabel?: string;
  seoTitle?: string;
  seoDescription?: string;
  sections?: Array<{ title: string; body: string; bullets?: string[] }>;
  faqs?: Array<{ question: string; answer: string }>;
  gallery?: Array<{ src: string; alt: string; title?: string; body?: string }>;
};

type MarketingPage = {
  id: string;
  category: string;
  primaryIntent: string;
  translations: Record<MarketingLanguage, MarketingContent>;
};

type EditorForm = {
  title: string;
  description: string;
  eyebrow: string;
  primaryCta: string;
  secondaryCta: string;
  heroImage: string;
  heroImageAlt: string;
  ogImage: string;
  datasheetUrl: string;
  datasheetLabel: string;
  seoTitle: string;
  seoDescription: string;
  sections: SectionDraft[];
  faqs: FaqDraft[];
  gallery: GalleryDraft[];
};

type EditorStringField =
  | 'title'
  | 'description'
  | 'eyebrow'
  | 'primaryCta'
  | 'secondaryCta'
  | 'heroImage'
  | 'heroImageAlt'
  | 'ogImage'
  | 'datasheetUrl'
  | 'datasheetLabel'
  | 'seoTitle'
  | 'seoDescription';

const EDITOR_STRING_FIELDS = new Set<string>([
  'title',
  'description',
  'eyebrow',
  'primaryCta',
  'secondaryCta',
  'heroImage',
  'heroImageAlt',
  'ogImage',
  'datasheetUrl',
  'datasheetLabel',
  'seoTitle',
  'seoDescription'
]);

function isMarketingLanguage(value: string | undefined): value is MarketingLanguage {
  return (MARKETING_LANGUAGES as string[]).includes(value || '');
}

function isEditorStringField(value: string): value is EditorStringField {
  return EDITOR_STRING_FIELDS.has(value);
}

function contentToForm(content: MarketingContent): EditorForm {
  return {
    title: content.title || '',
    description: content.description || '',
    eyebrow: content.eyebrow || '',
    primaryCta: content.primaryCta || '',
    secondaryCta: content.secondaryCta || '',
    heroImage: content.heroImage || '',
    heroImageAlt: content.heroImageAlt || '',
    ogImage: content.ogImage || '',
    datasheetUrl: content.datasheetUrl || '',
    datasheetLabel: content.datasheetLabel || '',
    seoTitle: content.seoTitle || content.title || '',
    seoDescription: content.seoDescription || content.description || '',
    sections: (content.sections || []).map((section) => ({
      title: section.title || '',
      body: section.body || '',
      bullets: (section.bullets || []).join('\n')
    })),
    faqs: (content.faqs || []).map((faq) => ({
      question: faq.question || '',
      answer: faq.answer || ''
    })),
    gallery: (content.gallery || []).map((item) => ({
      src: item.src || '',
      alt: item.alt || '',
      title: item.title || '',
      body: item.body || ''
    }))
  };
}

function formToContent(form: EditorForm, path: string) {
  return {
    path,
    title: form.title.trim(),
    description: form.description.trim(),
    eyebrow: form.eyebrow.trim(),
    primaryCta: form.primaryCta.trim(),
    secondaryCta: form.secondaryCta.trim(),
    heroImage: form.heroImage.trim(),
    heroImageAlt: form.heroImageAlt.trim(),
    ogImage: form.ogImage.trim(),
    datasheetUrl: form.datasheetUrl.trim(),
    datasheetLabel: form.datasheetLabel.trim(),
    seoTitle: form.seoTitle.trim(),
    seoDescription: form.seoDescription.trim(),
    sections: form.sections
      .map((section) => ({
        title: section.title.trim(),
        body: section.body.trim(),
        bullets: section.bullets
          .split('\n')
          .map((bullet) => bullet.trim())
          .filter(Boolean)
      }))
      .filter((section) => section.title || section.body || section.bullets.length > 0),
    faqs: form.faqs
      .map((faq) => ({
        question: faq.question.trim(),
        answer: faq.answer.trim()
      }))
      .filter((faq) => faq.question && faq.answer),
    gallery: form.gallery
      .map((item) => ({
        src: item.src.trim(),
        alt: item.alt.trim(),
        title: item.title.trim(),
        body: item.body.trim()
      }))
      .filter((item) => item.src && item.alt)
  };
}

function claimMessage(findings: Array<{ path: string; rule: { name: string; guidance: string } }>) {
  return findings.map((item) => `${item.path}: ${item.rule.guidance}`).join('\n');
}

function isSafePublicUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return true;
  if (/[\u0000-\u001F\u007F\s]/.test(trimmed)) return false;
  if (trimmed.startsWith('/')) return !trimmed.startsWith('//');
  try {
    const url = new URL(trimmed);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

export const MarketingPageEditor: React.FC = () => {
  const { pageId, language } = useParams();
  const navigate = useNavigate();
  const lang = isMarketingLanguage(language) ? language : 'en';
  const { setLang } = useLanguage();
  const page = useMemo(
    () => (MARKETING_PAGES as MarketingPage[]).find((item) => item.id === pageId),
    [pageId]
  );
  const defaultContent = page?.translations[lang];
  const [form, setForm] = useState<EditorForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState('');
  const [uploadingAsset, setUploadingAsset] = useState<string | null>(null);

  useEffect(() => {
    setLang(lang);
  }, [lang, setLang]);

  useEffect(() => {
    if (!page || !defaultContent || !pageId) {
      setLoading(false);
      return;
    }

    let active = true;
    const slug = getMarketingOverrideSlug(pageId, lang);

    async function fetchSavedContent() {
      setLoading(true);
      setError('');
      setSaveSuccess(false);

      try {
        const { data: pageRow, error: pageError } = await supabase
          .from('pages')
          .select('id')
          .eq('slug', slug)
          .maybeSingle();

        if (pageError) throw pageError;

        let savedContent = null;
        if (pageRow?.id) {
          const { data: blockRow, error: blockError } = await supabase
            .from('content_blocks')
            .select('content')
            .eq('page_id', pageRow.id)
            .eq('section_id', MARKETING_OVERRIDE_SECTION_ID)
            .maybeSingle();

          if (blockError) throw blockError;
          savedContent = blockRow?.content || null;
        }

        if (active) {
          setForm(contentToForm(mergeMarketingContent(defaultContent, savedContent)));
        }
      } catch (err: any) {
        if (active) {
          setError(err.message || 'Unable to load marketing page.');
          setForm(contentToForm(defaultContent));
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchSavedContent();
    return () => {
      active = false;
    };
  }, [defaultContent, lang, page, pageId]);

  const updateField = (field: keyof EditorForm, value: string) => {
    setForm((current) => current ? { ...current, [field]: value } : current);
  };

  const updateSection = (index: number, field: keyof SectionDraft, value: string) => {
    setForm((current) => {
      if (!current) return current;
      const sections = current.sections.map((section, itemIndex) =>
        itemIndex === index ? { ...section, [field]: value } : section
      );
      return { ...current, sections };
    });
  };

  const updateFaq = (index: number, field: keyof FaqDraft, value: string) => {
    setForm((current) => {
      if (!current) return current;
      const faqs = current.faqs.map((faq, itemIndex) =>
        itemIndex === index ? { ...faq, [field]: value } : faq
      );
      return { ...current, faqs };
    });
  };

  const updateGallery = (index: number, field: keyof GalleryDraft, value: string) => {
    setForm((current) => {
      if (!current) return current;
      const gallery = current.gallery.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      );
      return { ...current, gallery };
    });
  };

  const handleInlineTextChange = (path: string, value: string) => {
    if (isEditorStringField(path)) {
      updateField(path, value);
      return;
    }

    const [group, indexRaw, field, childIndexRaw] = path.split('.');
    const index = Number(indexRaw);
    if (!Number.isInteger(index) || index < 0) return;

    if (group === 'sections' && (field === 'title' || field === 'body')) {
      updateSection(index, field, value);
      return;
    }

    if (group === 'sections' && field === 'bullets') {
      const bulletIndex = Number(childIndexRaw);
      if (!Number.isInteger(bulletIndex) || bulletIndex < 0) return;
      setForm((current) => {
        if (!current?.sections[index]) return current;
        const bullets = current.sections[index].bullets.split('\n');
        bullets[bulletIndex] = value;
        const sections = current.sections.map((section, itemIndex) =>
          itemIndex === index ? { ...section, bullets: bullets.join('\n') } : section
        );
        return { ...current, sections };
      });
      return;
    }

    if (group === 'faqs' && (field === 'question' || field === 'answer')) {
      updateFaq(index, field, value);
      return;
    }

    if (group === 'gallery' && (field === 'title' || field === 'body' || field === 'alt')) {
      updateGallery(index, field, value);
    }
  };

  const handleInlineImageChange = (path: string, value: string) => {
    if (path === 'heroImage' || path === 'ogImage') {
      updateField(path, value);
      return;
    }

    const [group, indexRaw, field] = path.split('.');
    const index = Number(indexRaw);
    if (group === 'gallery' && field === 'src' && Number.isInteger(index) && index >= 0) {
      updateGallery(index, 'src', value);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading marketing image:', error);
      return null;
    }
  };

  const uploadAssetUrl = async (
    assetKey: string,
    file: File | undefined,
    onUploaded: (publicUrl: string) => void
  ) => {
    if (!file) return;

    setUploadingAsset(assetKey);
    setError('');

    try {
      const publicUrl = await uploadImage(file);
      if (!publicUrl) {
        setError('Image upload failed. Check that the Supabase "images" bucket is public and available.');
        return;
      }
      onUploaded(publicUrl);
    } catch (err: any) {
      setError(err.message || 'Image upload failed.');
    } finally {
      setUploadingAsset(null);
    }
  };

  const renderAssetUrlField = ({
    label,
    value,
    placeholder,
    assetKey,
    previewAlt,
    onChange,
    onUploaded
  }: {
    label: string;
    value: string;
    placeholder?: string;
    assetKey: string;
    previewAlt: string;
    onChange: (value: string) => void;
    onUploaded: (value: string) => void;
  }) => {
    const isUploading = uploadingAsset === assetKey;
    const trimmedValue = value.trim();
    const previewSrc = trimmedValue && isSafePublicUrl(trimmedValue) ? trimmedValue : '';

    return (
      <div className="block md:col-span-2">
        <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            className="w-full rounded-md border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
          />
          <label className={`inline-flex cursor-pointer items-center justify-center rounded-md border px-4 py-2 text-sm font-bold shadow-sm transition ${
            isUploading
              ? 'border-blue-200 bg-blue-50 text-blue-700'
              : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
          }`}>
            {isUploading ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Upload size={16} className="mr-2" />}
            {isUploading ? 'Uploading...' : 'Upload image'}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={isUploading}
              onChange={(event) => {
                const input = event.currentTarget;
                void uploadAssetUrl(assetKey, input.files?.[0], onUploaded).finally(() => {
                  input.value = '';
                });
              }}
            />
          </label>
        </div>
        {previewSrc && (
          <div className="mt-3 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
            <div className="flex items-center gap-3 p-3">
              <div className="flex h-20 w-28 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white">
                <img src={previewSrc} alt={previewAlt} className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center text-xs font-black uppercase tracking-[0.12em] text-slate-400">
                  <ImageIcon size={14} className="mr-1.5" />
                  Current image
                </div>
                <div className="mt-1 truncate text-xs font-semibold text-slate-500" title={previewSrc}>{previewSrc}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const addSection = () => {
    setForm((current) => current ? {
      ...current,
      sections: [...current.sections, { title: '', body: '', bullets: '' }]
    } : current);
  };

  const removeSection = (index: number) => {
    setForm((current) => current ? {
      ...current,
      sections: current.sections.filter((_, itemIndex) => itemIndex !== index)
    } : current);
  };

  const addFaq = () => {
    setForm((current) => current ? {
      ...current,
      faqs: [...current.faqs, { question: '', answer: '' }]
    } : current);
  };

  const removeFaq = (index: number) => {
    setForm((current) => current ? {
      ...current,
      faqs: current.faqs.filter((_, itemIndex) => itemIndex !== index)
    } : current);
  };

  const addGalleryItem = () => {
    setForm((current) => current ? {
      ...current,
      gallery: [...current.gallery, { src: '', alt: '', title: '', body: '' }]
    } : current);
  };

  const removeGalleryItem = (index: number) => {
    setForm((current) => current ? {
      ...current,
      gallery: current.gallery.filter((_, itemIndex) => itemIndex !== index)
    } : current);
  };

  const claimFindings = useMemo(() => (
    form ? scanProductClaimFields(form, { root: 'marketing_page', includeReviews: false }).findings : []
  ), [form]);

  const handleSave = async () => {
    if (!form || !defaultContent || !pageId) return;

    setSaving(true);
    setError('');
    const slug = getMarketingOverrideSlug(pageId, lang);
    const content = formToContent(form, defaultContent.path);
    const blockedClaims = scanProductClaimFields(content, { root: 'marketing_page', includeReviews: false }).findings;
    const urlFields: Array<[string, string | undefined]> = [
      ['heroImage', content.heroImage],
      ['ogImage', content.ogImage],
      ['datasheetUrl', content.datasheetUrl],
      ...content.gallery.map((item, index) => [`gallery.${index}.src`, item.src] as [string, string | undefined])
    ];
    const invalidUrlFields = urlFields
      .filter(([, value]) => !isSafePublicUrl(value || ''))
      .map(([field]) => field);

    if (blockedClaims.length > 0) {
      setSaving(false);
      setError(`Blocked product/marketing claim. Adjust wording before publishing.\n${claimMessage(blockedClaims)}`);
      return;
    }

    if (invalidUrlFields.length > 0) {
      setSaving(false);
      setError(`Invalid public asset URL: ${invalidUrlFields.join(', ')}. Use https:// or a site-relative path starting with /.`);
      return;
    }

    try {
      const { data: pageRow, error: pageError } = await supabase
        .from('pages')
        .upsert({
          slug,
          title: content.title || defaultContent.title,
          seo_title: content.seoTitle || content.title || defaultContent.seoTitle || defaultContent.title,
          seo_description: content.seoDescription || content.description || defaultContent.seoDescription || defaultContent.description
        }, { onConflict: 'slug' })
        .select('id')
        .single();

      if (pageError) throw pageError;

      const { error: blockError } = await supabase
        .from('content_blocks')
        .upsert({
          page_id: pageRow.id,
          section_id: MARKETING_OVERRIDE_SECTION_ID,
          content
        }, { onConflict: 'page_id,section_id' });

      if (blockError) throw blockError;

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Unable to save marketing page.');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!defaultContent || !pageId || !window.confirm('Reset this marketing page to code defaults?')) return;

    setSaving(true);
    setError('');

    try {
      const slug = getMarketingOverrideSlug(pageId, lang);
      const { error: deleteError } = await supabase
        .from('pages')
        .delete()
        .eq('slug', slug);

      if (deleteError) throw deleteError;

      setForm(contentToForm(defaultContent));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Unable to reset marketing page.');
    } finally {
      setSaving(false);
    }
  };

  if (!page || !defaultContent) {
    return <div className="p-12 text-center text-red-500">Marketing page not found.</div>;
  }

  if (loading || !form) {
    return <div className="p-12 text-center text-slate-500">Loading marketing editor...</div>;
  }

  const draftContent = formToContent(form, defaultContent.path);
  const previewContent = mergeMarketingContent(defaultContent, draftContent);

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(420px,0.92fr)_minmax(0,1.08fr)]">
      <div className="min-w-0 space-y-8 pb-24">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <button onClick={() => navigate('/admin/marketing-pages')} className="rounded-full p-2 transition-colors hover:bg-slate-200">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">{form.title}</h1>
            <div className="mt-2 flex flex-wrap gap-2 text-sm text-slate-500">
              <span>{LANGUAGE_NAMES[lang]}</span>
              <span>{defaultContent.path}</span>
              <span>{page.category}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            disabled={saving}
            className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-60"
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-60"
          >
            <Save size={16} className="mr-2" />
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="flex items-center rounded-lg border border-green-200 bg-green-50 p-4 text-green-700 shadow-sm">
          <CheckCircle2 size={20} className="mr-2" />
          Marketing content saved.
        </div>
      )}

      {error && (
        <div className="whitespace-pre-line rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
      )}

      {claimFindings.length > 0 && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 shadow-sm">
          <div className="mb-2 flex items-center font-semibold">
            <AlertTriangle size={18} className="mr-2" />
            Blocked claim wording
          </div>
          <div className="whitespace-pre-line">{claimMessage(claimFindings)}</div>
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-slate-800">Hero and SEO</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Eyebrow</span>
            <input value={form.eyebrow} onChange={(event) => updateField('eyebrow', event.target.value)} className="w-full rounded-md border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">SEO title</span>
            <input value={form.seoTitle} onChange={(event) => updateField('seoTitle', event.target.value)} className="w-full rounded-md border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500" />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-1 block text-sm font-medium text-slate-700">Title</span>
            <textarea rows={2} value={form.title} onChange={(event) => updateField('title', event.target.value)} className="w-full rounded-md border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500" />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-1 block text-sm font-medium text-slate-700">Description</span>
            <textarea rows={3} value={form.description} onChange={(event) => updateField('description', event.target.value)} className="w-full rounded-md border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500" />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-1 block text-sm font-medium text-slate-700">SEO description</span>
            <textarea rows={3} value={form.seoDescription} onChange={(event) => updateField('seoDescription', event.target.value)} className="w-full rounded-md border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Primary CTA</span>
            <input value={form.primaryCta} onChange={(event) => updateField('primaryCta', event.target.value)} className="w-full rounded-md border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Secondary CTA</span>
            <input value={form.secondaryCta} onChange={(event) => updateField('secondaryCta', event.target.value)} className="w-full rounded-md border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500" />
          </label>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-slate-800">Assets and datasheet</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {renderAssetUrlField({
            label: 'Hero image URL',
            value: form.heroImage,
            placeholder: '/images/product-photo.webp',
            assetKey: 'heroImage',
            previewAlt: form.heroImageAlt || form.title || 'Hero image',
            onChange: (value) => updateField('heroImage', value),
            onUploaded: (value) => updateField('heroImage', value)
          })}
          <label className="block md:col-span-2">
            <span className="mb-1 block text-sm font-medium text-slate-700">Hero image alt text</span>
            <input value={form.heroImageAlt} onChange={(event) => updateField('heroImageAlt', event.target.value)} className="w-full rounded-md border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500" />
          </label>
          {renderAssetUrlField({
            label: 'OpenGraph image URL',
            value: form.ogImage,
            placeholder: '/images/og-product.webp',
            assetKey: 'ogImage',
            previewAlt: form.title || 'OpenGraph image',
            onChange: (value) => updateField('ogImage', value),
            onUploaded: (value) => updateField('ogImage', value)
          })}
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Datasheet URL</span>
            <input value={form.datasheetUrl} onChange={(event) => updateField('datasheetUrl', event.target.value)} placeholder="/datasheets/enumera.pdf" className="w-full rounded-md border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Datasheet label</span>
            <input value={form.datasheetLabel} onChange={(event) => updateField('datasheetLabel', event.target.value)} placeholder="Download datasheet" className="w-full rounded-md border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500" />
          </label>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800">Screenshot gallery</h2>
          <button onClick={addGalleryItem} className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
            <Plus size={16} className="mr-2" />
            Add screenshot
          </button>
        </div>
        <div className="space-y-5">
          {form.gallery.map((item, index) => (
            <div key={index} className="rounded-lg border border-slate-200 p-4">
              <div className="mb-3 flex justify-end">
                <button onClick={() => removeGalleryItem(index)} className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
                  <Trash2 size={16} className="mr-2" />
                  Remove
                </button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {renderAssetUrlField({
                  label: 'Image URL',
                  value: item.src,
                  placeholder: '/images/platform/saas/dashboard.jpg',
                  assetKey: `gallery.${index}.src`,
                  previewAlt: item.alt || item.title || `Gallery image ${index + 1}`,
                  onChange: (value) => updateGallery(index, 'src', value),
                  onUploaded: (value) => updateGallery(index, 'src', value)
                })}
                <label className="block md:col-span-2">
                  <span className="mb-1 block text-sm font-medium text-slate-700">Alt text</span>
                  <input value={item.alt} onChange={(event) => updateGallery(index, 'alt', event.target.value)} className="w-full rounded-md border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500" />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">Title</span>
                  <input value={item.title} onChange={(event) => updateGallery(index, 'title', event.target.value)} className="w-full rounded-md border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500" />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">Caption</span>
                  <textarea rows={2} value={item.body} onChange={(event) => updateGallery(index, 'body', event.target.value)} className="w-full rounded-md border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500" />
                </label>
              </div>
            </div>
          ))}
          {form.gallery.length === 0 && (
            <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">No screenshots.</div>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800">Sections</h2>
          <button onClick={addSection} className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
            <Plus size={16} className="mr-2" />
            Add section
          </button>
        </div>
        <div className="space-y-5">
          {form.sections.map((section, index) => (
            <div key={index} className="rounded-lg border border-slate-200 p-4">
              <div className="mb-3 flex justify-end">
                <button onClick={() => removeSection(index)} className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
                  <Trash2 size={16} className="mr-2" />
                  Remove
                </button>
              </div>
              <div className="grid gap-4">
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">Section title</span>
                  <input value={section.title} onChange={(event) => updateSection(index, 'title', event.target.value)} className="w-full rounded-md border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500" />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">Body</span>
                  <textarea rows={3} value={section.body} onChange={(event) => updateSection(index, 'body', event.target.value)} className="w-full rounded-md border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500" />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">Bullets</span>
                  <textarea rows={4} value={section.bullets} onChange={(event) => updateSection(index, 'bullets', event.target.value)} className="w-full rounded-md border border-slate-300 px-4 py-2 font-mono text-sm focus:border-blue-500 focus:ring-blue-500" />
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800">FAQ</h2>
          <button onClick={addFaq} className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
            <Plus size={16} className="mr-2" />
            Add FAQ
          </button>
        </div>
        <div className="space-y-5">
          {form.faqs.map((faq, index) => (
            <div key={index} className="rounded-lg border border-slate-200 p-4">
              <div className="mb-3 flex justify-end">
                <button onClick={() => removeFaq(index)} className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
                  <Trash2 size={16} className="mr-2" />
                  Remove
                </button>
              </div>
              <div className="grid gap-4">
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">Question</span>
                  <input value={faq.question} onChange={(event) => updateFaq(index, 'question', event.target.value)} className="w-full rounded-md border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500" />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">Answer</span>
                  <textarea rows={3} value={faq.answer} onChange={(event) => updateFaq(index, 'answer', event.target.value)} className="w-full rounded-md border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500" />
                </label>
              </div>
            </div>
          ))}
          {form.faqs.length === 0 && (
            <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">No FAQ items.</div>
          )}
        </div>
      </div>
      </div>

      <aside className="min-w-0 xl:sticky xl:top-6 xl:h-[calc(100vh-9rem)]">
        <div className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-slate-500">Live preview</h2>
              <p className="mt-1 max-w-lg truncate text-xs font-medium text-slate-400">
                Click text to edit. Hover images to replace. {defaultContent.path}
              </p>
            </div>
            <a
              href={defaultContent.path}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              Open public
            </a>
          </div>
          <div className="flex-1 overflow-y-auto bg-white">
            <MarketingPagePreview
              pageId={pageId!}
              pageLang={lang}
              contentOverride={previewContent}
              showCookieConsent={false}
              isEditing
              onTextChange={handleInlineTextChange}
              onImageChange={handleInlineImageChange}
              uploadImage={uploadImage}
            />
          </div>
        </div>
      </aside>
    </div>
  );
};
