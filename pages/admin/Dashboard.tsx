import React, { useEffect, useState } from 'react';
import { Activity, Users, Settings2, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../utils/supabase';

export const Dashboard: React.FC = () => {
    const [session, setSession] = useState<any>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });
    }, []);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
                <p className="text-slate-500 mt-2">Welcome to your content management system.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* We will build proper UI components for this later, for now we will inline simple cards */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium text-slate-500">Total Pages</h3>
                        <FileText className="h-4 w-4 text-slate-400" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900">1</div>
                    <p className="text-xs text-slate-500 mt-1">Managed through Supabase</p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium text-slate-500">Active Sessions</h3>
                        <Users className="h-4 w-4 text-slate-400" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900">+3</div>
                    <p className="text-xs text-slate-500 mt-1 text-green-600">Looking good</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
                    <div className="space-y-4">
                        <Link to="/admin/pages" className="flex items-center p-3 w-full bg-slate-50 rounded-lg hover:bg-blue-50 transition-colors group">
                            <div className="bg-white p-2 rounded-md shadow-sm mr-4 group-hover:text-blue-600">
                                <Settings2 size={20} />
                            </div>
                            <div>
                                <p className="font-medium text-slate-900">Manage Pages Content</p>
                                <p className="text-sm text-slate-500">Modify the hero section and content blocks.</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
