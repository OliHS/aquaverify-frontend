import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase';
import { Plus, Edit2, Trash2, Check, X, Eye, EyeOff, GripVertical } from 'lucide-react';

interface DBProductFamily {
    id: string;
    family_id: string;
    title: string;
    description: string;
    use_cases: string[];
    is_hidden: boolean;
    sort_order: number;
}

interface DBProduct {
    id: string;
    family_id: string;
    name: string;
    detail: string;
    description: string;
    image: string;
    images: string[];
    specific_use_cases: string[];
    specs: Record<string, string>;
    is_hidden: boolean;
    sort_order: number;
}

export const ProductManager: React.FC = () => {
    const [families, setFamilies] = useState<DBProductFamily[]>([]);
    const [products, setProducts] = useState<DBProduct[]>([]);

    // UI State
    const [selectedFamilyId, setSelectedFamilyId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Modals & Form State
    const [isFamilyModalOpen, setIsFamilyModalOpen] = useState(false);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);

    const [familyFormData, setFamilyFormData] = useState<Partial<DBProductFamily>>({});
    const [productFormData, setProductFormData] = useState<Partial<DBProduct>>({});

    const [editingFamilyId, setEditingFamilyId] = useState<string | null>(null);
    const [editingProductId, setEditingProductId] = useState<string | null>(null);

    useEffect(() => {
        fetchFamilies();
    }, []);

    useEffect(() => {
        if (selectedFamilyId) {
            fetchProducts(selectedFamilyId);
        } else {
            setProducts([]);
        }
    }, [selectedFamilyId]);

    const fetchFamilies = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('product_families')
                .select('*')
                .order('sort_order', { ascending: true });

            if (error) throw error;
            setFamilies(data || []);
            if (data && data.length > 0 && !selectedFamilyId) {
                setSelectedFamilyId(data[0].id);
            }
        } catch (err: any) {
            setError(err.message || 'Error fetching families');
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async (familyId: string) => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('family_id', familyId)
                .order('sort_order', { ascending: true });

            if (error) throw error;
            setProducts(data || []);
        } catch (err: any) {
            setError(err.message || 'Error fetching products');
        } finally {
            setLoading(false);
        }
    };

    // --- Family Handlers ---
    const openNewFamilyModal = () => {
        setEditingFamilyId(null);
        setFamilyFormData({ title: '', family_id: '', description: '', use_cases: [], is_hidden: false, sort_order: families.length });
        setIsFamilyModalOpen(true);
    };

    const openEditFamilyModal = (family: DBProductFamily, e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingFamilyId(family.id);
        setFamilyFormData(family);
        setIsFamilyModalOpen(true);
    };

    const handleSaveFamily = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingFamilyId) {
                const { error } = await supabase.from('product_families').update(familyFormData).eq('id', editingFamilyId);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('product_families').insert([familyFormData]);
                if (error) throw error;
            }
            setIsFamilyModalOpen(false);
            fetchFamilies();
        } catch (err: any) {
            alert('Error saving family: ' + err.message);
        }
    };

    const handleDeleteFamily = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!window.confirm('Are you sure you want to delete this family? All products inside will be deleted too.')) return;
        try {
            const { error } = await supabase.from('product_families').delete().eq('id', id);
            if (error) throw error;
            if (selectedFamilyId === id) setSelectedFamilyId(null);
            fetchFamilies();
        } catch (err: any) {
            alert('Error deleting family: ' + err.message);
        }
    };

    const toggleFamilyVisibility = async (family: DBProductFamily, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            const { error } = await supabase.from('product_families').update({ is_hidden: !family.is_hidden }).eq('id', family.id);
            if (error) throw error;
            fetchFamilies();
        } catch (err: any) {
            alert('Error updating family: ' + err.message);
        }
    };

    // --- Product Handlers ---
    const openNewProductModal = () => {
        setEditingProductId(null);
        setProductFormData({ family_id: selectedFamilyId!, name: '', detail: '', description: '', image: '', images: [], specific_use_cases: [], specs: {}, is_hidden: false, sort_order: products.length });
        setIsProductModalOpen(true);
    };

    const openEditProductModal = (product: DBProduct) => {
        setEditingProductId(product.id);
        setProductFormData(product);
        setIsProductModalOpen(true);
    };

    const handleSaveProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingProductId) {
                const { error } = await supabase.from('products').update(productFormData).eq('id', editingProductId);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('products').insert([productFormData]);
                if (error) throw error;
            }
            setIsProductModalOpen(false);
            if (selectedFamilyId) fetchProducts(selectedFamilyId);
        } catch (err: any) {
            alert('Error saving product: ' + err.message);
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) throw error;
            if (selectedFamilyId) fetchProducts(selectedFamilyId);
        } catch (err: any) {
            alert('Error deleting product: ' + err.message);
        }
    };

    const toggleProductVisibility = async (product: DBProduct) => {
        try {
            const { error } = await supabase.from('products').update({ is_hidden: !product.is_hidden }).eq('id', product.id);
            if (error) throw error;
            if (selectedFamilyId) fetchProducts(selectedFamilyId);
        } catch (err: any) {
            alert('Error updating product: ' + err.message);
        }
    };

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden">
            {/* Left Sidebar: Families */}
            <div className="w-1/3 bg-white border-r border-slate-200 flex flex-col h-full bg-slate-50">
                <div className="p-4 border-b border-slate-200 bg-white flex justify-between items-center">
                    <h2 className="font-bold text-slate-800">Product Families</h2>
                    <button onClick={openNewFamilyModal} className="p-1.5 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors">
                        <Plus size={18} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                    {loading && families.length === 0 ? (
                        <p className="text-center text-slate-500 py-4">Loading families...</p>
                    ) : families.length === 0 ? (
                        <p className="text-center text-slate-500 py-4">No families found. Create one.</p>
                    ) : (
                        families.map(family => (
                            <div
                                key={family.id}
                                onClick={() => setSelectedFamilyId(family.id)}
                                className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedFamilyId === family.id
                                    ? 'bg-blue-50 border-blue-200 shadow-sm ring-1 ring-blue-500/20'
                                    : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-sm'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className={`font-semibold ${family.is_hidden ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{family.title}</h3>
                                    <div className="flex gap-1 text-slate-400">
                                        <button title={family.is_hidden ? "Show" : "Hide"} onClick={(e) => toggleFamilyVisibility(family, e)} className="hover:text-slate-700">
                                            {family.is_hidden ? <EyeOff size={14} /> : <Eye size={14} />}
                                        </button>
                                        <button onClick={(e) => openEditFamilyModal(family, e)} className="hover:text-blue-600"><Edit2 size={14} /></button>
                                        <button onClick={(e) => handleDeleteFamily(family.id, e)} className="hover:text-red-600"><Trash2 size={14} /></button>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 truncate">{family.description}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Right Side: Products for selected Family */}
            <div className="w-2/3 flex flex-col h-full bg-white">
                {!selectedFamilyId ? (
                    <div className="flex-1 flex items-center justify-center text-slate-400">
                        Select a family on the left to see its products
                    </div>
                ) : (
                    <>
                        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white shadow-sm z-10">
                            <div>
                                <h2 className="font-bold text-slate-800">Products</h2>
                                <p className="text-xs text-slate-500">
                                    in {families.find(f => f.id === selectedFamilyId)?.title}
                                </p>
                            </div>
                            <button onClick={openNewProductModal} className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                                <Plus size={16} /> Add Product
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
                            {error && <div className="bg-red-50 text-red-600 p-3 mb-4 rounded-lg text-sm">{error}</div>}

                            {loading && products.length === 0 ? (
                                <p className="text-center text-slate-500 py-4">Loading products...</p>
                            ) : products.length === 0 ? (
                                <div className="text-center bg-white border border-dashed border-slate-300 rounded-xl p-12 mt-6 max-w-lg mx-auto shadow-sm">
                                    <h3 className="text-lg font-medium text-slate-900 mb-2">No products yet</h3>
                                    <p className="text-slate-500 mb-6 text-sm">Create the first product for this family.</p>
                                    <button onClick={openNewProductModal} className="px-5 py-2.5 bg-blue-50 text-blue-700 font-semibold rounded-lg hover:bg-blue-100 transition-colors shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                                        Create Product
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {products.map(product => (
                                        <div key={product.id} className="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-4 hover:shadow-md transition-shadow group">
                                            <div className="text-slate-300 cursor-move hover:text-slate-500">
                                                <GripVertical size={20} />
                                            </div>

                                            <div className="w-16 h-16 bg-slate-100 rounded-lg shrink-0 overflow-hidden">
                                                {product.image ? (
                                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs text-center p-1">No Img</div>
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className={`font-semibold truncate ${product.is_hidden ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                                                        {product.name}
                                                    </h4>
                                                    {product.is_hidden && <span className="bg-slate-100 text-slate-500 text-[10px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">Hidden</span>}
                                                </div>
                                                <p className="text-sm text-slate-500 truncate">{product.detail}</p>
                                            </div>

                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => toggleProductVisibility(product)}
                                                    title={product.is_hidden ? "Show on website" : "Hide from website"}
                                                    className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                                                >
                                                    {product.is_hidden ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                                <button
                                                    onClick={() => openEditProductModal(product)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* Family Modal */}
            {isFamilyModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="font-bold text-gray-900 text-lg">
                                {editingFamilyId ? 'Edit Family' : 'Add New Family'}
                            </h3>
                            <button onClick={() => setIsFamilyModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto">
                            <form id="familyForm" onSubmit={handleSaveFamily} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={familyFormData.title || ''}
                                        onChange={(e) => setFamilyFormData({ ...familyFormData, title: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                                        placeholder="e.g. Environmental Equipment"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">String Identifier (for icon match)</label>
                                    <input
                                        type="text"
                                        required
                                        value={familyFormData.family_id || ''}
                                        onChange={(e) => setFamilyFormData({ ...familyFormData, family_id: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                                        placeholder="e.g. equipment"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Must be unique, lowercase, no spaces. Maps to a hardcoded icon.</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                                    <textarea
                                        value={familyFormData.description || ''}
                                        onChange={(e) => setFamilyFormData({ ...familyFormData, description: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                                        rows={3}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 mt-auto">
                            <button type="button" onClick={() => setIsFamilyModalOpen(false)} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-xl transition-colors text-sm">
                                Cancel
                            </button>
                            <button type="submit" form="familyForm" className="px-6 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm text-sm">
                                Save Family
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Product Modal */}
            {isProductModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="font-bold text-gray-900 text-lg">
                                {editingProductId ? 'Edit Product' : 'Add New Product'}
                            </h3>
                            <button onClick={() => setIsProductModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto">
                            <form id="productForm" onSubmit={handleSaveProduct} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Product Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={productFormData.name || ''}
                                            onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Short Detail Line</label>
                                        <input
                                            type="text"
                                            value={productFormData.detail || ''}
                                            onChange={(e) => setProductFormData({ ...productFormData, detail: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Full Description</label>
                                        <textarea
                                            value={productFormData.description || ''}
                                            onChange={(e) => setProductFormData({ ...productFormData, description: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                                            rows={4}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Hero Image URL</label>
                                        <input
                                            type="url"
                                            value={productFormData.image || ''}
                                            onChange={(e) => setProductFormData({ ...productFormData, image: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                                            placeholder="https://picsum.photos/..."
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 mt-auto">
                            <button type="button" onClick={() => setIsProductModalOpen(false)} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-xl transition-colors text-sm">
                                Cancel
                            </button>
                            <button type="submit" form="productForm" className="px-6 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm text-sm">
                                Save Product
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
