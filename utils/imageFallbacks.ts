const PUBLIC_IMAGES_BASE = 'https://tmttuszlxgrpzovmntoa.supabase.co/storage/v1/object/public/images';

export const IMAGE_FALLBACKS = {
  heroLimsDashboard: `${PUBLIC_IMAGES_BASE}/koysa1xep3m_1772472595932.png`,
  flagshipProduct: `${PUBLIC_IMAGES_BASE}/tb6yjv4bxcb_1772449206599.png`,
  productItem: `${PUBLIC_IMAGES_BASE}/jdcbhz045rp_1772119325794.png`,
  sector: `${PUBLIC_IMAGES_BASE}/3esyi3jz9zb_1772117230391.png`,
  saasMobile: `${PUBLIC_IMAGES_BASE}/lqgjiq6mbtm_1772273434579.png`,
  saasCompliance: `${PUBLIC_IMAGES_BASE}/pyuchu8n55_1772353597384.png`,
  saasCrm: '/images/platform/saas/aquaverify-crm-customer-360.jpg',
  saasLims: '/images/platform/saas/aquaverify-lims-dashboard.jpg',
  saasDashboard: '/images/platform/saas/aquaverify-cloud-dashboard.jpg',
} as const;
