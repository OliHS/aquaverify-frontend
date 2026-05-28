import { COMPANY_MARKETING_PAGES } from '../../utils/marketing-pages/companyPages.js';
import { createCommercialMarketingRoute } from './createCommercialMarketingRoute';

export const CompanyMarketingRoute = createCommercialMarketingRoute('company', COMPANY_MARKETING_PAGES);

export default CompanyMarketingRoute;
