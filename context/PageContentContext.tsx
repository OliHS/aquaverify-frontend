import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

interface PageContentContextType {
    pageMeta: any;
    blocks: Record<string, any>;
    loading: boolean;
    isEditing?: boolean;
    updateBlock?: (sectionId: string, field: string, value: any, lang?: string) => void;
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
            // 1. Fetch Page Metadata by slug
            const { data: pageData } = await supabase
                .from('pages')
                .select('*')
                .eq('slug', slug)
                .single();

            if (pageData) {
                setPageMeta(pageData);

                // 2. Fetch all content blocks for this page
                const { data: blocksData } = await supabase
                    .from('content_blocks')
                    .select('*')
                    .eq('page_id', pageData.id);

                if (blocksData) {
                    const mappedBlocks: Record<string, any> = {};
                    blocksData.forEach(block => {
                        mappedBlocks[block.section_id] = block.content;
                    });
                    setBlocks(mappedBlocks);
                }
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
