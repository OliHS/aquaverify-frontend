export const LEGAL_POLICY_VERSION = String(
  import.meta.env.VITE_LEGAL_POLICY_VERSION || '2026-04'
);

export const COOKIE_POLICY_VERSION = String(
  import.meta.env.VITE_COOKIE_POLICY_VERSION || LEGAL_POLICY_VERSION
);
