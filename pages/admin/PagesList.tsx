import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase';
import { Link } from 'react-router-dom';
import { FileEdit, Globe } from 'lucide-react';

export const PagesList: React.FC = () => {
    const [pages, setPages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        const { data, error } = await supabase.from('pages').select('*').order('created_at', { ascending: false });
        if (!error && data) {
            setPages(data);
        }
        setLoading(false);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Pages</h1>
                    <p className="text-slate-500 mt-2">Manage your website's pages and SEO tags.</p>
                </div>
            </div>

            {loading ? (
                <div className="animate-pulse space-y-4">
                    {[1, 2, 3].map((n) => (
                        <div key={n} className="bg-white h-24 rounded-xl border border-slate-200"></div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <ul className="divide-y divide-slate-200">
                        {pages.map((page) => (
                            <li key={page.id} className="hover:bg-slate-50 transition-colors">
                                <div className="flex items-center justify-between p-6">
                                    <div>
                                        <h3 className="text-lg font-medium text-slate-900">{page.title}</h3>
                                        <div className="mt-1 flex items-center space-x-4 text-sm text-slate-500">
                                            <span className="flex items-center">
                                                <Globe size={14} className="mr-1" /> /{page.slug === 'home' ? '' : page.slug}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex space-x-3">
                                        <Link
                                            to={`/admin/pages/${page.id}/builder`}
                                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                                        >
                                            <Globe size={16} className="mr-2" />
                                            Visual Builder
                                        </Link>
                                        <Link
                                            to={`/admin/pages/${page.id}`}
                                            className="inline-flex items-center px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50"
                                        >
                                            <FileEdit size={16} className="mr-2" />
                                            Advanced Edit
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {pages.length === 0 && (
                        <div className="p-8 text-center text-slate-500">
                            No pages found. The initial migration might have failed.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
