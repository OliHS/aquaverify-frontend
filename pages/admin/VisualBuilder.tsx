import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabase';
import { Save, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { PublicSiteContent } from '../PublicSite';
import { PageContentContext } from '../../context/PageContentContext';
import { LanguageProvider, useLanguage } from '../../context/LanguageContext';
import { LanguageSelector } from '../../components/LanguageSelector';

export const VisualBuilder: React.FC = () => {
    return (
        <LanguageProvider>
            <VisualBuilderInner />
        </LanguageProvider>
    );
};

const VisualBuilderInner: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { lang, t } = useLanguage();

    const [page, setPage] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Form states
    const [seoTitle, setSeoTitle] = useState('');
    const [seoDescription, setSeoDescription] = useState('');

    // Dynamic Content Blocks State
    const [blocks, setBlocks] = useState<Record<string, any>>({
        hero: { title: '', subtitle: '' },
        valueProps: { title: '', subtitle: '' },
        products: { badge: '', title: '', subtitle: '', flagshipTitle: '', flagshipDesc: '' },
        saas: { badge: '', title: '' },
        distributors: { badge: '', title: '', subtitle: '', cta: '', modalTitle: '' },
        oem: { badge: '', title: '', desc: '', calculatorTitle: '', partnerBtn: '' },
        sectors: { badge: '', title: '' }
    });

    useEffect(() => {
        if (id) fetchPageData();
    }, [id]);

    const fetchPageData = async () => {
        const { data: pageData } = await supabase.from('pages').select('*').eq('id', id).single();
        if (pageData) {
            setPage(pageData);
            setSeoTitle(pageData.seo_title || '');
            setSeoDescription(pageData.seo_description || '');

            const { data: blocksData } = await supabase.from('content_blocks').select('*').eq('page_id', id);
            if (blocksData) {
                const newBlocks = { ...blocks };
                blocksData.forEach(b => {
                    newBlocks[b.section_id] = { ...newBlocks[b.section_id], ...b.content };
                });
                setBlocks(newBlocks);
            }
        }
        setLoading(false);
    };

    // Helper to get correct localized value for the sidebar input fields
    const getLocalizedValue = (sectionId: string, field: string) => {
        const val = blocks[sectionId]?.[field];
        if (val) {
            if (typeof val === 'string') return val;
            if (val[lang] !== undefined) return val[lang];
            if (val['en'] !== undefined) return val['en'];
        }

        // Fallback mappings so sidebar inputs don't appear empty
        const fallbacks: any = {
            hero: {
                title: `${t.hero.titleStart} <span class="text-secondary">${t.hero.titleEnd}</span>.`,
                desc: 'AquaVerify bridges the gap between physical water analysis and digital truth. From our advanced biotech consumable kits to our immutable cloud platform, we deliver the world\'s most reliable decentralized water quality data.'
            },
            valueProps: {
                title: t.valueProps.title,
                subtitle: t.valueProps.subtitle
            },
            products: {
                badge: t.products.badge,
                title: t.products.title,
                subtitle: t.products.subtitle,
                flagshipTitle: t.products.flagship,
                flagshipDesc: t.products.flagshipDesc
            },
            saas: {
                badge: t.saas.badge,
                title: t.saas.title
            },
            distributors: {
                title: t.distributors.title
            },
            oem: {
                title: t.oem.title,
                desc: t.oem.desc
            }
        };

        return fallbacks[sectionId]?.[field] || '';
    };

    const handleBlockChange = (sectionId: string, field: string, value: any, lang?: string) => {
        setBlocks(prev => {
            const currentFieldData = prev[sectionId]?.[field];

            // If we are editing localized content (lang provided)
            if (lang) {
                // If existing data is a generic string (legacy), convert it to an object with english default before spreading
                const isLegacyString = typeof currentFieldData === 'string';
                const baseObj = isLegacyString ? { en: currentFieldData } : (currentFieldData || {});

                return {
                    ...prev,
                    [sectionId]: {
                        ...prev[sectionId],
                        [field]: {
                            ...baseObj,
                            [lang]: value
                        }
                    }
                };
            }

            // Normal generic field update (like SEO tags or components that don't pass lang)
            return {
                ...prev,
                [sectionId]: {
                    ...prev[sectionId],
                    [field]: value
                }
            };
        });
    };

    const uploadImage = async (file: File): Promise<string | null> => {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);

            return data.publicUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
    };

    const handleSave = async () => {
        setSaving(true);

        // Update SEO
        await supabase.from('pages').update({
            seo_title: seoTitle,
            seo_description: seoDescription
        }).eq('id', id);

        // Upsert all blocks
        let hasError = false;
        let errorMessage = 'Error saving to database! Check browser console.';

        for (const [sectionId, content] of Object.entries(blocks)) {
            const { data: existing, error: selectError } = await supabase
                .from('content_blocks')
                .select('id')
                .eq('page_id', id)
                .eq('section_id', sectionId)
                .single();

            if (selectError && selectError.code !== 'PGRST116') {
                console.error('Select error:', selectError);
                hasError = true;
                errorMessage = `Database Read Failed: ${selectError.message}. Are your Vercel Supabase API Keys valid?`;
                break; // Stop processing further blocks
            }

            if (existing) {
                const { error } = await supabase.from('content_blocks').update({ content }).eq('id', existing.id);
                if (error) {
                    console.error('Update error:', error);
                    hasError = true;
                }
            } else {
                const { error } = await supabase.from('content_blocks').insert({
                    page_id: id,
                    section_id: sectionId,
                    content
                });
                if (error) {
                    console.error('Insert error:', error);
                    hasError = true;
                }
            }
        }

        setSaving(false);
        if (hasError) {
            alert(errorMessage);
        } else {
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        }
    };

    if (loading) return <div className="p-12 text-center text-slate-500">Loading editor environment...</div>;
    if (!page) return <div className="p-12 text-center text-red-500">Fatal error: Page not found.</div>;

    return (
        <div className="flex h-screen overflow-hidden bg-slate-100">
            {/* Left Sidebar: Controls & Edit Forms */}
            <div className="w-96 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col z-20 shadow-xl overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <button onClick={() => navigate('/admin/pages')} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="font-bold text-slate-900 leading-tight">Visual Builder</h1>
                            <span className="text-xs text-slate-500">/{page.slug === 'home' ? '' : page.slug}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <LanguageSelector />
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
                        >
                            {saving ? <span className="animate-pulse">Saving...</span> : <><Save size={16} className="mr-2" /> Publish</>}
                        </button>
                    </div>
                </div>

                {saveSuccess && (
                    <div className="bg-green-50 text-green-700 p-3 text-sm flex items-center border-b border-green-100 font-medium">
                        <CheckCircle2 size={16} className="mr-2" />
                        Changes published successfully!
                    </div>
                )}

                {/* Form Sections (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-5 space-y-8 pb-32">

                    {/* SEO */}
                    <div className="space-y-4">
                        <h2 className="text-sm border-b pb-2 font-bold mb-4 text-slate-800 uppercase tracking-wider">SEO Metadata</h2>
                        <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1">Page Title</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                value={seoTitle}
                                onChange={e => setSeoTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1">Meta Description</label>
                            <textarea
                                className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                rows={3}
                                value={seoDescription}
                                onChange={e => setSeoDescription(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Home Page Content Blocks */}
                    {page.slug === 'home' && (
                        <>
                            <div className="space-y-4 pt-4 border-t border-slate-200">
                                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Hero Section</h2>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">Title</label>
                                    <textarea
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        rows={3}
                                        value={getLocalizedValue('hero', 'title')}
                                        onChange={e => handleBlockChange('hero', 'title', e.target.value, lang)}
                                        placeholder="Use <span class='text-secondary'> for blue text"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">Description</label>
                                    <textarea
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        rows={3}
                                        value={getLocalizedValue('hero', 'desc')}
                                        onChange={e => handleBlockChange('hero', 'desc', e.target.value, lang)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-slate-200">
                                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Solutions (Value Props)</h2>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">Title</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        value={getLocalizedValue('valueProps', 'title')}
                                        onChange={e => handleBlockChange('valueProps', 'title', e.target.value, lang)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">Subtitle</label>
                                    <textarea
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        rows={2}
                                        value={getLocalizedValue('valueProps', 'subtitle')}
                                        onChange={e => handleBlockChange('valueProps', 'subtitle', e.target.value, lang)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-slate-200">
                                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Products Section</h2>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">Badge</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        value={getLocalizedValue('products', 'badge')}
                                        onChange={e => handleBlockChange('products', 'badge', e.target.value, lang)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">Section Title</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        value={getLocalizedValue('products', 'title')}
                                        onChange={e => handleBlockChange('products', 'title', e.target.value, lang)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">Section Subtitle</label>
                                    <textarea
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        rows={2}
                                        value={getLocalizedValue('products', 'subtitle')}
                                        onChange={e => handleBlockChange('products', 'subtitle', e.target.value, lang)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">Flagship Title</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        value={getLocalizedValue('products', 'flagshipTitle')}
                                        onChange={e => handleBlockChange('products', 'flagshipTitle', e.target.value, lang)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">Flagship Description</label>
                                    <textarea
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        rows={3}
                                        value={getLocalizedValue('products', 'flagshipDesc')}
                                        onChange={e => handleBlockChange('products', 'flagshipDesc', e.target.value, lang)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-slate-200">
                                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">SaaS Platform</h2>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">Badge</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        value={getLocalizedValue('saas', 'badge')}
                                        onChange={e => handleBlockChange('saas', 'badge', e.target.value, lang)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">Title</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        value={getLocalizedValue('saas', 'title')}
                                        onChange={e => handleBlockChange('saas', 'title', e.target.value, lang)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-slate-200">
                                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Distributors & OEM</h2>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">Distributor Section Title</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        value={getLocalizedValue('distributors', 'title')}
                                        onChange={e => handleBlockChange('distributors', 'title', e.target.value, lang)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">OEM Title</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        value={getLocalizedValue('oem', 'title')}
                                        onChange={e => handleBlockChange('oem', 'title', e.target.value, lang)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">OEM Description</label>
                                    <textarea
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        rows={3}
                                        value={getLocalizedValue('oem', 'desc')}
                                        onChange={e => handleBlockChange('oem', 'desc', e.target.value, lang)}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Right Canvas: Live Preivew */}
            <div className="flex-1 relative overflow-y-auto bg-white border-l border-slate-300 shadow-2xl">
                {/* We override the content context with the LIVE local component state */}
                <PageContentContext.Provider value={{ pageMeta: page, blocks, loading: false, isEditing: true, updateBlock: handleBlockChange, uploadImage }}>
                    {/* Render the whole actual public site, but scale it slightly ? */}
                    <div className="w-full h-full">
                        <PublicSiteContent />
                    </div>
                </PageContentContext.Provider>
            </div>
        </div>
    );
};
