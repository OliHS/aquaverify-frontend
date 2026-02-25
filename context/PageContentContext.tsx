import React, { createContext, useContext, useState, useEffect } from 'react';
import { getPageData, WPPage, getAcfField } from '../src/lib/wp-api';

interface PageContentContextType {
    pageMeta: any;
    blocks: Record<string, any>;
    loading: boolean;
    isEditing?: boolean;
    updateBlock?: (sectionId: string, field: string, value: any) => void;
    uploadImage?: (file: File) => Promise<string | null>;
}

export const PageContentContext = createContext<PageContentContextType>({
    pageMeta: null,
    blocks: {},
    loading: true,
});

export const usePageContent = () => useContext(PageContentContext);

export const PageContentProvider: React.FC<{ slug: string; children: React.ReactNode }> = ({ slug, children }) => {
    const [pageMeta, setPageMeta] = useState<any>(null);
    const [blocks, setBlocks] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            const wpPage = await getPageData(slug, 'en'); // Hardcoded to 'en' for now, could grab from useLanguage
            if (wpPage) {
                setPageMeta({
                    title: wpPage.title.rendered,
                    seo_title: getAcfField(wpPage, 'seo_title'),
                    seo_description: getAcfField(wpPage, 'seo_description')
                });

                // The "blocks" concept from Supabase maps nicely to our specific ACF fields.
                // We'll bundle them into sections to minimize refactoring downstream components.
                setBlocks({
                    hero: {
                        title: getAcfField(wpPage, 'hero_title'),
                        subtitle: getAcfField(wpPage, 'hero_subtitle'),
                        desc: getAcfField(wpPage, 'hero_desc'),
                        btn_text: getAcfField(wpPage, 'hero_btn_text'),
                    },
                    valueProps: {
                        title: getAcfField(wpPage, 'vp_title'),
                        subtitle: getAcfField(wpPage, 'vp_subtitle'),
                        cards: {
                            bio: {
                                title: getAcfField(wpPage, 'vp_card_1_title'),
                                desc: getAcfField(wpPage, 'vp_card_1_desc')
                            },
                            cloud: {
                                title: getAcfField(wpPage, 'vp_card_2_title'),
                                desc: getAcfField(wpPage, 'vp_card_2_desc')
                            },
                            oem: {
                                title: getAcfField(wpPage, 'vp_card_3_title'),
                                desc: getAcfField(wpPage, 'vp_card_3_desc')
                            }
                        }
                    },
                    products: {
                        badge: getAcfField(wpPage, 'prod_badge'),
                        title: getAcfField(wpPage, 'prod_title'),
                        subtitle: getAcfField(wpPage, 'prod_subtitle'),
                    },
                    saas: {
                        badge: getAcfField(wpPage, 'saas_badge'),
                        title: getAcfField(wpPage, 'saas_title'),
                    },
                    distributors: {
                        badge: getAcfField(wpPage, 'dist_badge'),
                        title: getAcfField(wpPage, 'dist_title'),
                        subtitle: getAcfField(wpPage, 'dist_subtitle'),
                    },
                    oem: {
                        badge: getAcfField(wpPage, 'oem_badge'),
                        title: getAcfField(wpPage, 'oem_title'),
                        desc: getAcfField(wpPage, 'oem_desc'),
                        calculatorTitle: getAcfField(wpPage, 'oem_calc_title'),
                    },
                    sectors: {
                        badge: getAcfField(wpPage, 'sec_badge'),
                        title: getAcfField(wpPage, 'sec_title'),
                        subtitle: getAcfField(wpPage, 'sec_subtitle'),
                    }
                });
            }
            setLoading(false);
        };
        fetchContent();
    }, [slug]);

    return (
        <PageContentContext.Provider value={{ pageMeta, blocks, loading }}>
            {children}
        </PageContentContext.Provider>
    );
};
