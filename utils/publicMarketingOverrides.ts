import {
  getMarketingOverrideSlug,
  MARKETING_OVERRIDE_SECTION_ID,
  normalizeMarketingOverride
} from './marketingOverrideNormalize.js';

type SupabasePage = {
  id: string;
  slug: string;
};

type SupabaseContentBlock = {
  content: Record<string, unknown>;
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, '');
}

function getRestUrl(table: string, params: Record<string, string>) {
  const url = new URL(`${trimTrailingSlash(supabaseUrl)}/rest/v1/${table}`);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  return url.toString();
}

function getHeaders() {
  return {
    Accept: 'application/json',
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`
  };
}

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  if (!supabaseUrl || !supabaseAnonKey) return [] as T;

  const response = await fetch(url, {
    headers: getHeaders(),
    signal
  });

  if (!response.ok) {
    throw new Error(`Marketing CMS request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchMarketingPageOverride(pageId: string, lang: string, signal?: AbortSignal) {
  if (!supabaseUrl || !supabaseAnonKey) return null;

  const slug = getMarketingOverrideSlug(pageId, lang);
  const pages = await fetchJson<SupabasePage[]>(
    getRestUrl('pages', {
      select: 'id,slug',
      slug: `eq.${slug}`
    }),
    signal
  );
  const page = pages[0];
  if (!page) return null;

  const blocks = await fetchJson<SupabaseContentBlock[]>(
    getRestUrl('content_blocks', {
      select: 'content',
      page_id: `eq.${page.id}`,
      section_id: `eq.${MARKETING_OVERRIDE_SECTION_ID}`
    }),
    signal
  );

  return normalizeMarketingOverride(blocks[0]?.content);
}
