import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabase';
import { LayoutDashboard, LogOut, FileText, Settings } from 'lucide-react';

export const AdminLayout: React.FC = () => {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!session) {
        return <Navigate to="/admin/login" replace />;
    }

    return (
        <div className="min-h-screen flex bg-slate-50 font-sans text-slate-900">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col">
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                        AquaVerify CMS
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link to="/admin/dashboard" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors">
                        <LayoutDashboard size={20} className="text-blue-400" />
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/admin/pages" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors">
                        <FileText size={20} className="text-blue-400" />
                        <span>Pages</span>
                    </Link>
                    <Link to="/admin/settings" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors">
                        <Settings size={20} className="text-blue-400" />
                        <span>Settings</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors text-red-400"
                    >
                        <LogOut size={20} />
                        <span>Log out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center">
                    <h2 className="text-lg font-medium text-slate-800">Admin Panel</h2>
                    <div className="text-sm text-slate-500">
                        {session.user.email}
                    </div>
                </header>
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
