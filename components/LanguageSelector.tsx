import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageSelector: React.FC = () => {
    const { lang, setLang } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const languages: ('en' | 'es' | 'fr' | 'it')[] = ['en', 'es', 'fr', 'it'];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 text-slate-700 hover:text-blue-600 transition-colors font-medium text-sm px-3 py-2 bg-white rounded-lg border border-slate-200 shadow-sm"
            >
                <Globe size={16} />
                <span className="uppercase">{lang}</span>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-24 bg-white rounded-lg shadow-xl border border-slate-100 py-1 z-50">
                        {languages.map((l) => (
                            <button
                                key={l}
                                onClick={() => {
                                    setLang(l);
                                    setIsOpen(false);
                                }}
                                className={`block w-full text-left px-4 py-2 text-xs font-bold uppercase hover:bg-slate-50 transition-colors ${lang === l ? 'text-blue-600 bg-blue-50/50' : 'text-slate-600'}`}
                            >
                                {l}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
