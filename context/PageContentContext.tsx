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

interface PageContentProviderProps {
    slug: string;
    fallbackSlugs?: string[];
    children: React.ReactNode;
}

export const PageContentProvider: React.FC<PageContentProviderProps> = ({ slug, fallbackSlugs = [], children }) => {
    const [pageMeta, setPageMeta] = useState<any>(null);
    const [blocks, setBlocks] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);
    const fallbackSlugKey = fallbackSlugs.join('|');

    useEffect(() => {
        let isMounted = true;
        const slugCandidates = Array.from(new Set([slug, ...fallbackSlugs].filter(Boolean)));

        const fetchContent = async () => {
            try {
                setLoading(true);
                const { supabase } = await import('../utils/supabase');

                const { data: pagesData, error: pagesError } = await supabase
                    .from('pages')
                    .select('*')
                    .in('slug', slugCandidates);

                if (pagesError) throw pagesError;

                if (!isMounted) return;

                const pageData = slugCandidates
                    .map(candidate => pagesData?.find(page => page.slug === candidate))
                    .find(Boolean);

                if (pageData) {
                    setPageMeta(pageData);

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
                } else {
                    setPageMeta(null);
                    setBlocks({});
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
    }, [slug, fallbackSlugKey]);

    return (
        <PageContentContext.Provider value={{ pageMeta, blocks, loading }}>
            {children}
        </PageContentContext.Provider>
    );
};
