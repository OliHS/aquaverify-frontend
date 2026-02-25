import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabase';
import { Save, ArrowLeft, CheckCircle2, Plus, Trash2 } from 'lucide-react';

export const PageEditor: React.FC = () => {
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

    const handleSave = async () => {
        setSaving(true);

        // Update SEO
        await supabase.from('pages').update({
            seo_title: seoTitle,
            seo_description: seoDescription
        }).eq('id', id);

        // Upsert all blocks
        for (const [sectionId, content] of Object.entries(blocks)) {
            // Check if exists
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
        <div className="space-y-8 max-w-5xl mx-auto pb-24">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate('/admin/pages')} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Editing: {page.title}</h1>
                    <span className="text-sm text-slate-500 font-mono">/{page.slug === 'home' ? '' : page.slug}</span>
                </div>
            </div>

            {saveSuccess && (
                <div className="bg-green-50 text-green-700 p-4 rounded-lg flex items-center shadow-sm border border-green-200">
                    <CheckCircle2 size={20} className="mr-2" />
                    Site content saved and published successfully!
                </div>
            )}

            {/* SEO Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-semibold mb-4 text-slate-800">SEO Settings (Meta Tags)</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Page Title</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            value={seoTitle}
                            onChange={e => setSeoTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Meta Description</label>
                        <textarea
                            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            rows={3}
                            value={seoDescription}
                            onChange={e => setSeoDescription(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Home Page Content Sections */}
            {page.slug === 'home' && (
                <div className="space-y-8">

                    {/* Hero Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 border-l-4 border-l-blue-500">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-slate-800">Hero Section</h2>
                            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded">Supports HTML</span>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Main Heading</label>
                                <textarea
                                    rows={3}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 font-mono text-sm leading-relaxed"
                                    value={blocks.hero?.title || ''}
                                    onChange={(e) => handleBlockChange('hero', 'title', e.target.value)}
                                    placeholder="e.g. Next-Generation <span class='text-secondary'>Water Analysis</span>."
                                />
                                <p className="text-xs text-slate-500 mt-1">Use <code>&lt;span class="text-secondary"&gt;</code> to highlight text.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Subheading</label>
                                <textarea
                                    rows={4}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 font-mono text-sm leading-relaxed"
                                    value={blocks.hero?.subtitle || ''}
                                    onChange={(e) => handleBlockChange('hero', 'subtitle', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Value Props Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 border-l-4 border-l-purple-500">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-slate-800">Solutions Section</h2>
                            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded">Plain Text</span>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Section Title</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    value={blocks.valueProps?.title || ''}
                                    onChange={(e) => handleBlockChange('valueProps', 'title', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Section Subtitle</label>
                                <textarea
                                    rows={3}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    value={blocks.valueProps?.subtitle || ''}
                                    onChange={(e) => handleBlockChange('valueProps', 'subtitle', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Products Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 border-l-4 border-l-teal-500">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-slate-800">Products Section</h2>
                            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded">Plain Text</span>
                        </div>
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Badge Text</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        value={blocks.products?.badge || ''}
                                        onChange={(e) => handleBlockChange('products', 'badge', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Section Title</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        value={blocks.products?.title || ''}
                                        onChange={(e) => handleBlockChange('products', 'title', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Section Subtitle</label>
                                <textarea
                                    rows={2}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    value={blocks.products?.subtitle || ''}
                                    onChange={(e) => handleBlockChange('products', 'subtitle', e.target.value)}
                                />
                            </div>

                            <div className="pt-4 border-t border-slate-100">
                                <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">Flagship Callout</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Flagship Title</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            value={blocks.products?.flagshipTitle || ''}
                                            onChange={(e) => handleBlockChange('products', 'flagshipTitle', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Flagship Description</label>
                                        <textarea
                                            rows={3}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            value={blocks.products?.flagshipDesc || ''}
                                            onChange={(e) => handleBlockChange('products', 'flagshipDesc', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SaaS Platform Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 border-l-4 border-l-indigo-500">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-slate-800">SaaS Platform Section</h2>
                            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded">Plain Text</span>
                        </div>
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Badge Text</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        value={blocks.saas?.badge || ''}
                                        onChange={(e) => handleBlockChange('saas', 'badge', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Section Title</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        value={blocks.saas?.title || ''}
                                        onChange={(e) => handleBlockChange('saas', 'title', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Distributors Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 border-l-4 border-l-yellow-500">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-slate-800">Distributors Section</h2>
                            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded">Plain Text</span>
                        </div>
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Badge Text</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        value={blocks.distributors?.badge || ''}
                                        onChange={(e) => handleBlockChange('distributors', 'badge', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Section Title</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        value={blocks.distributors?.title || ''}
                                        onChange={(e) => handleBlockChange('distributors', 'title', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Section Subtitle</label>
                                <textarea
                                    rows={2}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    value={blocks.distributors?.subtitle || ''}
                                    onChange={(e) => handleBlockChange('distributors', 'subtitle', e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">CTA Button Text</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        value={blocks.distributors?.cta || ''}
                                        onChange={(e) => handleBlockChange('distributors', 'cta', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Map Modal Title</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        value={blocks.distributors?.modalTitle || ''}
                                        onChange={(e) => handleBlockChange('distributors', 'modalTitle', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* OEM Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 border-l-4 border-l-red-500">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-slate-800">OEM Section</h2>
                            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded">Plain Text</span>
                        </div>
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Badge Text</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        value={blocks.oem?.badge || ''}
                                        onChange={(e) => handleBlockChange('oem', 'badge', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Section Title</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        value={blocks.oem?.title || ''}
                                        onChange={(e) => handleBlockChange('oem', 'title', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Section Description</label>
                                <textarea
                                    rows={2}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    value={blocks.oem?.desc || ''}
                                    onChange={(e) => handleBlockChange('oem', 'desc', e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Calculator Title</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        value={blocks.oem?.calculatorTitle || ''}
                                        onChange={(e) => handleBlockChange('oem', 'calculatorTitle', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Partner Button Text</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        value={blocks.oem?.partnerBtn || ''}
                                        onChange={(e) => handleBlockChange('oem', 'partnerBtn', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sectors Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 border-l-4 border-l-green-500">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-slate-800">Sectors Section</h2>
                            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded">Plain Text</span>
                        </div>
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Badge Text</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        value={blocks.sectors?.badge || ''}
                                        onChange={(e) => handleBlockChange('sectors', 'badge', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Section Title</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        value={blocks.sectors?.title || ''}
                                        onChange={(e) => handleBlockChange('sectors', 'title', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )}

            {/* Save Button Floating */}
            <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-slate-200 p-4 flex justify-end px-8 z-50 shadow-[0_-4px_30px_rgba(0,0,0,0.05)]">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
                >
                    <Save size={20} className="mr-2" />
                    {saving ? 'Publish Changes' : 'Publish Changes'}
                </button>
            </div>
        </div>
    );
};
