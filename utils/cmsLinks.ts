export interface NormalizedCmsHref {
  ok: boolean;
  value: string;
  reason?: string;
}

export interface CmsLinkIssue {
  path: string;
  value: string;
  reason: string;
}

export interface SanitizedCmsContent<T> {
  content: T;
  invalidLinks: CmsLinkIssue[];
  clearedPlaceholders: CmsLinkIssue[];
}

const HASH_LINK_PATTERN = /^#[A-Za-z][A-Za-z0-9_-]*$/;
const SAFE_SCHEMES = new Set(['http:', 'https:', 'mailto:', 'tel:']);
const HOST_LIKE_PATTERN = /^(?:[a-z0-9-]+\.)+[a-z]{2,}(?:[/:?#].*)?$/i;
const EDITABLE_LINK_FIELDS = new Set([
  'link_solutions',
  'link_products',
  'link_platform',
  'link_distributors',
  'link_oem',
  'primaryBtnLink',
  'secondaryBtnLink',
  'partnerBtnLink',
  'quoteBtnLink_single',
  'quoteBtnLink_combined'
]);

export function isPlaceholderHref(value: string) {
  const trimmed = String(value || '').trim();
  return !trimmed || trimmed === '#';
}

export function isCmsHrefField(field: string) {
  if (!field) return false;
  if (field.startsWith('url_')) return true;
  if (field.startsWith('learnMore_link_')) return true;
  if (EDITABLE_LINK_FIELDS.has(field)) return true;
  return false;
}

export function normalizeEditableHref(rawValue: string): NormalizedCmsHref {
  const trimmed = String(rawValue || '').trim();

  if (isPlaceholderHref(trimmed)) {
    return { ok: true, value: '' };
  }

  if (/[\u0000-\u001F\u007F]/.test(trimmed) || /\s/.test(trimmed)) {
    return { ok: false, value: '', reason: 'No uses espacios ni caracteres de control en URLs.' };
  }

  if (HASH_LINK_PATTERN.test(trimmed)) {
    return { ok: true, value: trimmed };
  }

  if (trimmed.startsWith('/')) {
    if (trimmed.startsWith('//')) {
      return { ok: false, value: '', reason: 'Usa una URL completa con https:// en enlaces externos.' };
    }
    return { ok: true, value: trimmed };
  }

  const candidate = HOST_LIKE_PATTERN.test(trimmed) ? `https://${trimmed}` : trimmed;

  try {
    const url = new URL(candidate);
    if (!SAFE_SCHEMES.has(url.protocol)) {
      return { ok: false, value: '', reason: 'Solo se permiten http, https, mailto o tel.' };
    }
    return { ok: true, value: url.toString() };
  } catch {
    return { ok: false, value: '', reason: 'Introduce una URL valida, una ruta /interna o un ancla #seccion.' };
  }
}

export function sanitizeCmsContentLinks<T>(content: T): SanitizedCmsContent<T> {
  const invalidLinks: CmsLinkIssue[] = [];
  const clearedPlaceholders: CmsLinkIssue[] = [];

  function sanitizeNode(node: unknown, path: string[]): unknown {
    if (Array.isArray(node)) {
      return node.map((item, index) => sanitizeNode(item, [...path, String(index)]));
    }

    if (!node || typeof node !== 'object') return node;

    return Object.fromEntries(
      Object.entries(node as Record<string, unknown>).map(([key, value]) => {
        const nextPath = [...path, key];

        if (typeof value === 'string' && isCmsHrefField(key)) {
          const normalized = normalizeEditableHref(value);
          const issue = {
            path: nextPath.join('.'),
            value,
            reason: normalized.reason || 'Placeholder'
          };

          if (!normalized.ok) {
            invalidLinks.push(issue);
            return [key, value];
          }

          if (normalized.value === '') {
            clearedPlaceholders.push(issue);
          }

          return [key, normalized.value];
        }

        return [key, sanitizeNode(value, nextPath)];
      })
    );
  }

  return {
    content: sanitizeNode(content, []) as T,
    invalidLinks,
    clearedPlaceholders
  };
}
