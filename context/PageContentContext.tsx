import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchPublicPageContent } from '../utils/publicCms';

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
        const controller = new AbortController();

        const fetchContent = async () => {
            try {
                setLoading(true);
                const { pageMeta: nextPageMeta, blocks: nextBlocks } = await fetchPublicPageContent(
                    slug,
                    fallbackSlugs,
                    controller.signal
                );

                if (!isMounted) return;

                setPageMeta(nextPageMeta);
                setBlocks(nextBlocks);
            } catch (error) {
                if ((error as Error).name === 'AbortError') return;
                console.warn('Failed to load CMS page content', error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchContent();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [slug, fallbackSlugKey]);

    return (
        <PageContentContext.Provider value={{ pageMeta, blocks, loading }}>
            {children}
        </PageContentContext.Provider>
    );
};
