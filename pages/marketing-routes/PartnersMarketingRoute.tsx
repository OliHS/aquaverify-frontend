import { PARTNER_MARKETING_PAGES } from '../../utils/marketing-pages/partnerPages.js';
import { createCommercialMarketingRoute } from './createCommercialMarketingRoute';

export const PartnersMarketingRoute = createCommercialMarketingRoute('partners', PARTNER_MARKETING_PAGES);

export default PartnersMarketingRoute;
