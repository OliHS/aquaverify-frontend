const ATTRIBUTION_KEYS = new Set([
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id'
]);

const PII_QUERY_KEYS = new Set(['email', 'e-mail', 'phone', 'telefono', 'name', 'nombre', 'company', 'empresa']);

const clean = (value: unknown, limit: number) => String(value || '')
  .replace(/[\r\n\t<>]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()
  .slice(0, limit);

export function sanitizeAttribution(input: Record<string, unknown> = {}) {
  return Object.fromEntries(Object.entries(input)
    .filter(([key]) => ATTRIBUTION_KEYS.has(key))
    .map(([key, value]) => [key, clean(value, key === 'utm_campaign' ? 160 : 120)])
    .filter(([, value]) => Boolean(value)));
}

export function assertNoPiiInUrl(rawUrl: string) {
  const url = new URL(rawUrl, window.location.origin);
  for (const key of url.searchParams.keys()) {
    if (PII_QUERY_KEYS.has(key.toLowerCase())) throw new Error('PII must not be sent in URL parameters.');
  }
  return url;
}

export function buildOpaqueLeadRequest(endpoint: string, input: {
  name: string;
  email: string;
  company: string;
  phone?: string;
  contactConsent: boolean;
  marketingConsent?: boolean;
  attribution?: Record<string, unknown>;
}) {
  const url = assertNoPiiInUrl(endpoint);
  if (url.search) throw new Error('Lead endpoint must be opaque and contain no query string.');
  if (input.contactConsent !== true) throw new Error('Contact consent is required.');
  return {
    url: url.toString(),
    init: {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: clean(input.name, 160),
        email: clean(input.email, 254).toLowerCase(),
        company: clean(input.company, 180),
        phone: clean(input.phone, 60),
        contactConsent: true,
        marketingConsent: input.marketingConsent === true,
        attribution: sanitizeAttribution(input.attribution)
      })
    }
  };
}
