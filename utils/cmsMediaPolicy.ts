export const CMS_MEDIA_MAX_BYTES = 10 * 1024 * 1024;
export const CMS_MEDIA_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'application/pdf']);
export const CMS_MEDIA_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp', 'avif', 'pdf']);

export function inspectCmsMedia(file: Pick<File, 'name' | 'size' | 'type'>) {
  const extension = String(file.name || '').split('.').pop()?.toLowerCase() || '';
  if (!CMS_MEDIA_TYPES.has(file.type) || !CMS_MEDIA_EXTENSIONS.has(extension)) return { allowed: false, reason: 'media_type_not_allowed' };
  if (!Number.isFinite(file.size) || file.size <= 0 || file.size > CMS_MEDIA_MAX_BYTES) return { allowed: false, reason: 'media_size_not_allowed' };
  return { allowed: true, reason: 'quarantine_private', visibility: 'private', requiresReencode: file.type.startsWith('image/'), requiresPublishApproval: true };
}
