const WP_URL = import.meta.env.VITE_WORDPRESS_URL || 'https://aquaverify.com';
const API_BASE = `${WP_URL}/wp-json/wp/v2`;

export interface WPPage {
    id: number;
    slug: string;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    acf: any; // Advanced Custom Fields data
}

/**
 * Fetches data for a specific page by slug.
 * Supports Polylang language filtering (e.g., lang=en, lang=es) if configured in WP REST API.
 */
export async function getPageData(slug: string, lang: string = 'en'): Promise<WPPage | null> {
    try {
        // Note: To filter by slug AND lang, WordPress needs Polylang REST API support enabled,
        // or a custom endpoint. Standard WP REST queries by slug like this:
        const response = await fetch(`${API_BASE}/pages?slug=${slug}&lang=${lang}&_fields=id,slug,title,content,acf`);

        if (!response.ok) {
            throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
        }

        const data: WPPage[] = await response.json();
        return data.length > 0 ? data[0] : null;

    } catch (error) {
        console.error(`Failed to fetch WP page (${slug}):`, error);
        return null;
    }
}

/**
 * Helper to get a specific ACF string field, with a fallback.
 */
export function getAcfField(pageData: WPPage | null, fieldName: string, fallback: string = ''): string {
    if (!pageData || !pageData.acf || pageData.acf[fieldName] === undefined) {
        return fallback;
    }
    return pageData.acf[fieldName];
}
