import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const shouldFix = process.argv.includes('--fix');
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const hashLinkPattern = /^#[A-Za-z][A-Za-z0-9_-]*$/;
const safeSchemes = new Set(['http:', 'https:', 'mailto:', 'tel:']);
const hostLikePattern = /^(?:[a-z0-9-]+\.)+[a-z]{2,}(?:[/:?#].*)?$/i;
const editableLinkFields = new Set([
  'link_solutions',
  'link_products',
  'link_platform',
  'link_resources',
  'link_distributors',
  'link_oem',
  'primaryBtnLink',
  'secondaryBtnLink',
  'partnerBtnLink',
  'quoteBtnLink_single',
  'quoteBtnLink_combined'
]);

const legacyManagedLinks = [
  {
    section: 'nav',
    field: 'url_demo',
    values: ['https://app.aquaverify.com/signup']
  },
  {
    section: 'nav',
    field: 'url_login',
    values: ['https://app.aquaverify.com/login']
  },
  {
    section: 'footer',
    field: 'url_contact',
    values: ['https://app.aquaverify.com/signup']
  },
  {
    section: 'products',
    field: 'quoteBtnLink_single',
    values: ['https://app.aquaverify.com/signup']
  },
  {
    section: 'products',
    field: 'quoteBtnLink_combined',
    values: ['https://app.aquaverify.com/signup']
  },
  {
    section: 'saas',
    fieldPrefix: 'learnMore_link_',
    values: ['https://app.aquaverify.com/signup']
  },
  {
    section: 'oem',
    field: 'partnerBtnLink',
    values: ['https://app.aquaverify.com/signup']
  }
];

function ensureEnv() {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env.local/.env');
  }
}

function collectLinkFields(content = {}, path = []) {
  if (!content || typeof content !== 'object') return [];

  return Object.entries(content).flatMap(([key, value]) => {
    const nextPath = [...path, key];

    if (typeof value === 'string' && isCmsHrefField(key)) {
      return [{ field: nextPath.join('.'), path: nextPath, key, value: value.trim() }];
    }

    if (value && typeof value === 'object') {
      return collectLinkFields(value, nextPath);
    }

    return [];
  });
}

function isCmsHrefField(field) {
  if (!field) return false;
  if (field.startsWith('url_')) return true;
  if (field.startsWith('learnMore_link_')) return true;
  if (editableLinkFields.has(field)) return true;
  return false;
}

function isPlaceholderHref(value) {
  const trimmed = String(value || '').trim();
  return !trimmed || trimmed === '#';
}

function normalizeEditableHref(rawValue) {
  const trimmed = String(rawValue || '').trim();

  if (isPlaceholderHref(trimmed)) {
    return { ok: true, value: '' };
  }

  if (/[\u0000-\u001F\u007F]/.test(trimmed) || /\s/.test(trimmed)) {
    return { ok: false, value: '', reason: 'Spaces or control characters are not allowed' };
  }

  if (hashLinkPattern.test(trimmed)) {
    return { ok: true, value: trimmed };
  }

  if (trimmed.startsWith('/')) {
    if (trimmed.startsWith('//')) {
      return { ok: false, value: '', reason: 'Protocol-relative URLs are not allowed' };
    }
    return { ok: true, value: trimmed };
  }

  const candidate = hostLikePattern.test(trimmed) ? `https://${trimmed}` : trimmed;

  try {
    const url = new URL(candidate);
    if (!safeSchemes.has(url.protocol)) {
      return { ok: false, value: '', reason: 'Only http, https, mailto and tel links are allowed' };
    }
    return { ok: true, value: url.toString() };
  } catch {
    return { ok: false, value: '', reason: 'Invalid URL' };
  }
}

function setContentPath(content, path, value) {
  let cursor = content;
  for (let index = 0; index < path.length - 1; index += 1) {
    const key = path[index];
    if (!cursor[key] || typeof cursor[key] !== 'object') cursor[key] = {};
    cursor = cursor[key];
  }
  cursor[path[path.length - 1]] = value;
}

function matchesLegacyManagedLink(section, field, value) {
  return legacyManagedLinks.some((rule) => {
    if (rule.section !== section) return false;
    if (rule.field && rule.field !== field) return false;
    if (rule.fieldPrefix && !field.startsWith(rule.fieldPrefix)) return false;
    return rule.values.includes(value);
  });
}

async function run() {
  ensureEnv();
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase
    .from('content_blocks')
    .select('id,section_id,content')
    .order('section_id');

  if (error) throw error;

  const allLinks = [];
  const staleLinks = [];
  const invalidLinks = [];
  const fixes = [];

  for (const block of data || []) {
    const content = { ...(block.content || {}) };
    const links = collectLinkFields(content);

    for (const link of links) {
      const item = {
        section: block.section_id,
        field: link.field,
        key: link.key,
        value: link.value
      };
      allLinks.push(item);

      const normalized = normalizeEditableHref(link.value);
      const isLegacy = matchesLegacyManagedLink(block.section_id, link.key, link.value);
      const isPlaceholder = isPlaceholderHref(link.value);

      if (!normalized.ok) {
        invalidLinks.push({ ...item, reason: normalized.reason });
        continue;
      }

      if (isLegacy || isPlaceholder || normalized.value !== link.value) {
        const fix = {
          ...item,
          reason: isLegacy ? 'legacy managed platform link' : (isPlaceholder ? 'placeholder link' : 'normalized link'),
          nextValue: isLegacy || isPlaceholder ? '' : normalized.value
        };
        staleLinks.push(fix);
        if (shouldFix) {
          setContentPath(content, link.path, fix.nextValue);
          fixes.push(fix);
        }
      }
    }

    if (shouldFix && fixes.some((fix) => fix.section === block.section_id)) {
      const { error: updateError } = await supabase
        .from('content_blocks')
        .update({ content })
        .eq('id', block.id);

      if (updateError) throw updateError;
    }
  }

  console.log(JSON.stringify({
    ok: invalidLinks.length === 0 && (staleLinks.length === 0 || shouldFix),
    mode: shouldFix ? 'fix' : 'audit',
    allLinks,
    staleLinks,
    invalidLinks,
    fixes
  }, null, 2));

  if (invalidLinks.length > 0 || (!shouldFix && staleLinks.length > 0)) {
    process.exitCode = 1;
  }
}

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
