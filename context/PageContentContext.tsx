import React, { createContext, useContext, useState, useEffect } from 'react';

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
        let isMounted = true;

        const fetchContent = async () => {
            try {
                const { supabase } = await import('../utils/supabase');

                // 1. Fetch Page Metadata by slug
                const { data: pageData } = await supabase
                    .from('pages')
                    .select('*')
                    .eq('slug', slug)
                    .single();

                if (!isMounted) return;

                if (pageData) {
                    setPageMeta(pageData);

                    // 2. Fetch all content blocks for this page
                    const { data: blocksData } = await supabase
                        .from('content_blocks')
                        .select('*')
                        .eq('page_id', pageData.id);

                    if (!isMounted) return;

                    if (blocksData) {
                        const mappedBlocks: Record<string, any> = {};
                        blocksData.forEach(block => {
                            mappedBlocks[block.section_id] = block.content;
                        });
                        setBlocks(mappedBlocks);
                    }
                }
            } catch (error) {
                console.warn('Failed to load CMS page content', error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchContent();

        return () => {
            isMounted = false;
        };
    }, [slug]);

    return (
        <PageContentContext.Provider value={{ pageMeta, blocks, loading }}>
            {children}
        </PageContentContext.Provider>
    );
};
