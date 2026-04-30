interface SupabasePage {
  id: string;
  slug: string;
  [key: string]: unknown;
}

interface SupabaseContentBlock {
  section_id: string;
  content: Record<string, unknown>;
}

export interface PublicCmsPageContent {
  pageMeta: SupabasePage | null;
  blocks: Record<string, Record<string, unknown>>;
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, '');
}

function assertPublicCmsConfig() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase public CMS environment variables');
  }
}

function getRestUrl(table: string, params: Record<string, string>) {
  const url = new URL(`${trimTrailingSlash(supabaseUrl)}/rest/v1/${table}`);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  return url.toString();
}

function getHeaders() {
  assertPublicCmsConfig();
  return {
    Accept: 'application/json',
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`
  };
}

function quotePostgrestString(value: string) {
  return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, {
    headers: getHeaders(),
    signal
  });

  if (!response.ok) {
    throw new Error(`Public CMS request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchPublicPageContent(
  slug: string,
  fallbackSlugs: string[] = [],
  signal?: AbortSignal
): Promise<PublicCmsPageContent> {
  const slugCandidates = Array.from(new Set([slug, ...fallbackSlugs].filter(Boolean)));

  if (slugCandidates.length === 0) {
    return { pageMeta: null, blocks: {} };
  }

  const pages = await fetchJson<SupabasePage[]>(
    getRestUrl('pages', {
      select: '*',
      slug: `in.(${slugCandidates.map(quotePostgrestString).join(',')})`
    }),
    signal
  );

  const pageMeta = slugCandidates
    .map(candidate => pages.find(page => page.slug === candidate))
    .find(Boolean) || null;

  if (!pageMeta) {
    return { pageMeta: null, blocks: {} };
  }

  const contentBlocks = await fetchJson<SupabaseContentBlock[]>(
    getRestUrl('content_blocks', {
      select: '*',
      page_id: `eq.${pageMeta.id}`
    }),
    signal
  );

  const blocks = contentBlocks.reduce<Record<string, Record<string, unknown>>>((acc, block) => {
    acc[block.section_id] = block.content || {};
    return acc;
  }, {});

  return { pageMeta, blocks };
}
