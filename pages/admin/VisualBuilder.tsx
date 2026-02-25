import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabase';
import { Save, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { PublicSiteContent } from '../PublicSite';
import { PageContentContext } from '../../context/PageContentContext';

export const VisualBuilder: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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

    const handleBlockChange = (sectionId: string, field: string, value: any) => {
        setBlocks(prev => ({
            ...prev,
            [sectionId]: {
                ...prev[sectionId],
                [field]: value
            }
        }));
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
        for (const [sectionId, content] of Object.entries(blocks)) {
            const { data: existing } = await supabase
                .from('content_blocks')
                .select('id')
                .eq('page_id', id)
                .eq('section_id', sectionId)
                .single();

            if (existing) {
                await supabase.from('content_blocks').update({ content }).eq('id', existing.id);
            } else {
                await supabase.from('content_blocks').insert({
                    page_id: id,
                    section_id: sectionId,
                    content
                });
            }
        }

        setSaving(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
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
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
                    >
                        {saving ? <span className="animate-pulse">Saving...</span> : <><Save size={16} className="mr-2" /> Publish</>}
                    </button>
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
                                        value={blocks.hero?.title || ''}
                                        onChange={e => handleBlockChange('hero', 'title', e.target.value)}
                                        placeholder="Use <span class='text-secondary'> for blue text"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">Subtitle</label>
                                    <textarea
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        rows={2}
                                        value={blocks.hero?.subtitle || ''}
                                        onChange={e => handleBlockChange('hero', 'subtitle', e.target.value)}
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
                                        value={blocks.valueProps?.title || ''}
                                        onChange={e => handleBlockChange('valueProps', 'title', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">Subtitle</label>
                                    <textarea
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        rows={2}
                                        value={blocks.valueProps?.subtitle || ''}
                                        onChange={e => handleBlockChange('valueProps', 'subtitle', e.target.value)}
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
                                        value={blocks.products?.badge || ''}
                                        onChange={e => handleBlockChange('products', 'badge', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">Section Title</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        value={blocks.products?.title || ''}
                                        onChange={e => handleBlockChange('products', 'title', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">Section Subtitle</label>
                                    <textarea
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        rows={2}
                                        value={blocks.products?.subtitle || ''}
                                        onChange={e => handleBlockChange('products', 'subtitle', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">Flagship Title</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        value={blocks.products?.flagshipTitle || ''}
                                        onChange={e => handleBlockChange('products', 'flagshipTitle', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">Flagship Description</label>
                                    <textarea
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        rows={3}
                                        value={blocks.products?.flagshipDesc || ''}
                                        onChange={e => handleBlockChange('products', 'flagshipDesc', e.target.value)}
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
                                        value={blocks.saas?.badge || ''}
                                        onChange={e => handleBlockChange('saas', 'badge', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">Title</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        value={blocks.saas?.title || ''}
                                        onChange={e => handleBlockChange('saas', 'title', e.target.value)}
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
                                        value={blocks.distributors?.title || ''}
                                        onChange={e => handleBlockChange('distributors', 'title', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">OEM Title</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        value={blocks.oem?.title || ''}
                                        onChange={e => handleBlockChange('oem', 'title', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">OEM Description</label>
                                    <textarea
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        rows={3}
                                        value={blocks.oem?.desc || ''}
                                        onChange={e => handleBlockChange('oem', 'desc', e.target.value)}
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
