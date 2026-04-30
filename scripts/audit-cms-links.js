import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const shouldFix = process.argv.includes('--fix');
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

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

    if (typeof value === 'string' && /url|link/i.test(key)) {
      return [{ field: nextPath.join('.'), value: value.trim() }];
    }

    if (value && typeof value === 'object') {
      return collectLinkFields(value, nextPath);
    }

    return [];
  });
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
  const fixes = [];

  for (const block of data || []) {
    const content = { ...(block.content || {}) };
    const links = collectLinkFields(content);

    for (const link of links) {
      const item = {
        section: block.section_id,
        field: link.field,
        value: link.value
      };
      allLinks.push(item);

      if (matchesLegacyManagedLink(block.section_id, link.field, link.value)) {
        staleLinks.push(item);
        if (shouldFix && Object.prototype.hasOwnProperty.call(content, link.field)) {
          delete content[link.field];
          fixes.push(item);
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
    ok: staleLinks.length === 0 || shouldFix,
    mode: shouldFix ? 'fix' : 'audit',
    allLinks,
    staleLinks,
    fixes
  }, null, 2));

  if (!shouldFix && staleLinks.length > 0) {
    process.exitCode = 1;
  }
}

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
