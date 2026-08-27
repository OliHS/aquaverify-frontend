import { supabase } from './supabase';

export type CmsWorkflowState = 'draft' | 'review' | 'published' | 'rejected' | 'archived';
export type CmsRole = 'editor' | 'reviewer' | 'publisher' | 'admin' | 'service';

const TRANSITIONS: Record<CmsWorkflowState, Partial<Record<CmsWorkflowState, CmsRole[]>>> = {
  draft: { review: ['editor', 'reviewer', 'publisher', 'admin'] },
  review: { draft: ['reviewer', 'publisher', 'admin'], published: ['publisher', 'admin'], rejected: ['reviewer', 'publisher', 'admin'] },
  published: { archived: ['publisher', 'admin'] },
  rejected: { draft: ['editor', 'reviewer', 'publisher', 'admin'] },
  archived: { draft: ['publisher', 'admin'] }
};

export function canTransitionCmsRevision(role: CmsRole, from: CmsWorkflowState, to: CmsWorkflowState) {
  return Boolean(TRANSITIONS[from]?.[to]?.includes(role));
}

export async function saveCmsDraft(input: {
  entityType: 'page' | 'marketing_page' | 'visual_page' | 'product' | 'product_family';
  entityKey: string;
  locale?: string;
  payload: unknown;
}) {
  const { data, error } = await supabase.rpc('cms_save_draft', {
    p_entity_type: input.entityType,
    p_entity_key: input.entityKey,
    p_locale: input.locale || 'en',
    p_payload: input.payload
  });
  if (error) throw error;
  return data;
}

export async function transitionCmsRevision(revisionId: string, nextState: CmsWorkflowState, reason: string) {
  if (!reason.trim()) throw new Error('A review/publish reason is required.');
  const { data, error } = await supabase.rpc('cms_transition_revision', {
    p_revision_id: revisionId,
    p_next_state: nextState,
    p_reason: reason.trim()
  });
  if (error) throw error;
  return data;
}
