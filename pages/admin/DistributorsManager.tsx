import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { Plus, Edit2, Trash2, MapPin, X, Save } from 'lucide-react';

interface Distributor {
    id: string;
    name: string;
    location: string;
    country: string;
    type: 'exclusive' | 'reseller' | 'service';
    address: string;
    email: string;
    phone: string;
    lat: number;
    lng: number;
}

export const DistributorsManager: React.FC = () => {
    const [distributors, setDistributors] = useState<Distributor[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState<Partial<Distributor>>({
        name: '',
        location: '',
        country: '',
        type: 'exclusive',
        address: '',
        email: '',
        phone: '',
        lat: 0,
        lng: 0,
    });

    useEffect(() => {
        fetchDistributors();
    }, []);

    const fetchDistributors = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('distributors')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                if (error.code === '42P01') {
                    console.warn('Distributors table does not exist yet. Please run the provided SQL.');
                } else {
                    throw error;
                }
            } else {
                setDistributors(data || []);
            }
        } catch (err) {
            console.error('Error fetching distributors:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (dist?: Distributor) => {
        if (dist) {
            setFormData(dist);
            setEditingId(dist.id);
        } else {
            setFormData({
                name: '',
                location: '',
                country: '',
                type: 'exclusive',
                address: '',
                email: '',
                phone: '',
                lat: 0,
                lng: 0,
            });
            setEditingId(null);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                // Update
                const { error } = await supabase
                    .from('distributors')
                    .update(formData)
                    .eq('id', editingId);
                if (error) throw error;
            } else {
                // Insert
                const { error } = await supabase
                    .from('distributors')
                    .insert([formData]);
                if (error) throw error;
            }
            handleCloseModal();
            fetchDistributors();
        } catch (err) {
            console.error('Error saving distributor:', err);
            alert('Error saving data. Make sure the table exists and RLS allows inserts.');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to remove this distributor?')) return;
        try {
            const { error } = await supabase
                .from('distributors')
                .delete()
                .eq('id', id);
            if (error) throw error;
            fetchDistributors();
        } catch (err) {
            console.error('Error deleting distributor:', err);
        }
    };

    if (loading && distributors.length === 0) {
        return (
            <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center">
                        <MapPin className="mr-2 text-primary" /> Global Distributors
                    </h1>
                    <p className="text-sm text-slate-500">Manage partners displayed on the 3D rotating globe.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-primary hover:bg-[#0d6ba0] text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors shadow-sm"
                >
                    <Plus size={18} className="mr-2" /> Add Partner
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-slate-800 font-semibold border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Company Name</th>
                                <th className="px-6 py-4">Country & Location</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4">Coordinates</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {distributors.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                        No distributors found. Click "Add Partner" to create your first map coordinate.
                                    </td>
                                </tr>
                            ) : (
                                distributors.map((dist) => (
                                    <tr key={dist.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">{dist.name}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-slate-800">{dist.country}</span>
                                                <span className="text-xs text-slate-500">{dist.location}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider
                        ${dist.type === 'exclusive' ? 'bg-blue-100 text-blue-800' :
                                                    dist.type === 'reseller' ? 'bg-green-100 text-green-800' :
                                                        'bg-purple-100 text-purple-800'}`}>
                                                {dist.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs">
                                            <div className="text-slate-700">{dist.email}</div>
                                            <div className="text-slate-500">{dist.phone}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded inline-block">
                                                {dist.lat}, {dist.lng}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end space-x-2">
                                                <button
                                                    onClick={() => handleOpenModal(dist)}
                                                    className="p-1.5 text-slate-400 hover:text-primary hover:bg-blue-50 rounded transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(dist.id)}
                                                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit/Add Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                        <div className="flex justify-between items-center p-6 border-b border-slate-100">
                            <h2 className="text-xl font-bold text-slate-800">
                                {editingId ? 'Edit Distributor' : 'Add New Distributor'}
                            </h2>
                            <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-6 overflow-y-auto flex-1 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Company Name *</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name || ''}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Country *</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.country || ''}
                                        onChange={e => setFormData({ ...formData, country: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Location (City, State)</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.location || ''}
                                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    />
                                </div>

                                <div className="col-span-2 border-t border-slate-100 pt-4 mt-2">
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Map Coordinates</h3>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Latitude (Lat) *</label>
                                    <input
                                        required
                                        type="number"
                                        step="any"
                                        value={formData.lat || 0}
                                        onChange={e => setFormData({ ...formData, lat: parseFloat(e.target.value) })}
                                        className="w-full px-3 py-2 border border-slate-300 font-mono text-sm rounded focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Longitude (Lng) *</label>
                                    <input
                                        required
                                        type="number"
                                        step="any"
                                        value={formData.lng || 0}
                                        onChange={e => setFormData({ ...formData, lng: parseFloat(e.target.value) })}
                                        className="w-full px-3 py-2 border border-slate-300 font-mono text-sm rounded focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    />
                                </div>

                                <div className="col-span-2 border-t border-slate-100 pt-4 mt-2">
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Contact Information</h3>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Partner Type</label>
                                    <select
                                        value={formData.type || 'exclusive'}
                                        onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white"
                                    >
                                        <option value="exclusive">Exclusive Partner</option>
                                        <option value="reseller">Reseller</option>
                                        <option value="service">Service Center</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        value={formData.email || ''}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.phone || ''}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Physical Address</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.address || ''}
                                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    />
                                </div>
                            </div>

                            <div className="pt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-[#0d6ba0] transition-colors font-medium flex items-center shadow-sm"
                                >
                                    <Save size={18} className="mr-2" /> Save Partner
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
