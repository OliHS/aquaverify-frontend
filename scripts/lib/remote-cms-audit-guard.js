import crypto from 'node:crypto';

function classify(urlValue) {
  if (!urlValue) return { kind: 'UNCONFIGURED', hostClass: 'none', fingerprint: null };
  let url;
  try { url = new URL(urlValue); } catch { return { kind: 'INVALID', hostClass: 'invalid', fingerprint: null }; }
  const local = ['localhost', '127.0.0.1', '::1'].includes(url.hostname);
  const hosted = url.hostname.endsWith('.supabase.co');
  return {
    kind: local ? 'LOCAL' : 'REMOTE',
    hostClass: local ? 'local' : (hosted ? 'supabase-hosted-remote' : 'custom-remote'),
    fingerprint: crypto.createHash('sha256').update(url.origin).digest('hex').slice(0, 12)
  };
}

export function guardCmsEndpoint({ url, mutationRequested = false, purpose = 'cms-audit' }) {
  const endpoint = classify(url);
  if (endpoint.kind === 'INVALID' || endpoint.kind === 'UNCONFIGURED') throw new Error(`CMS_ENDPOINT_${endpoint.kind}`);
  if (endpoint.kind === 'REMOTE' && mutationRequested) throw new Error(`REMOTE_CMS_MUTATION_FORBIDDEN:${purpose}:${endpoint.hostClass}`);
  if (endpoint.kind === 'REMOTE' && process.env.ALLOW_REMOTE_CMS_AUDIT !== '1') {
    throw new Error(`REMOTE_CMS_AUDIT_BLOCKED:${purpose}:${endpoint.hostClass}`);
  }
  console.log(JSON.stringify({ cmsEndpoint: endpoint.hostClass, remoteAccessAttempted: endpoint.kind === 'REMOTE', mutationRequested: false, valuesPrinted: false }));
  return endpoint;
}

export function shouldUseRemoteCms(url, purpose = 'cms-build-overrides') {
  const endpoint = classify(url);
  if (endpoint.kind !== 'REMOTE') return endpoint.kind === 'LOCAL';
  if (process.env.ALLOW_REMOTE_CMS_AUDIT !== '1') {
    console.warn(JSON.stringify({ cmsEndpoint: endpoint.hostClass, remoteAccessAttempted: false, skipped: purpose, valuesPrinted: false }));
    return false;
  }
  guardCmsEndpoint({ url, mutationRequested: false, purpose });
  return true;
}

export { classify as classifyCmsEndpoint };
