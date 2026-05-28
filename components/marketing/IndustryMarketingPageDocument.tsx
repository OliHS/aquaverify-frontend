import React from 'react';
import { IndustriesHubLanding } from '../IndustriesHubLanding';
import { WaterTestingLabsLanding } from '../WaterTestingLabsLanding';
import { WaterQualityControlLanding } from '../WaterQualityControlLanding';
import { MunicipalWaterLanding } from '../MunicipalWaterLanding';
import { FoodBeverageWaterLanding } from '../FoodBeverageWaterLanding';
import { IndustrialProcessWaterLanding } from '../IndustrialProcessWaterLanding';
import { FacilityWaterRiskLanding } from '../FacilityWaterRiskLanding';
import { AgricultureWaterLanding } from '../AgricultureWaterLanding';
import { PharmaCosmeticsWaterLanding } from '../PharmaCosmeticsWaterLanding';
import { HospitalityTourismWaterLanding } from '../HospitalityTourismWaterLanding';
import type { Language } from '../../utils/translations';

type IndustryMarketingPageDocumentProps = {
  page: {
    id: string;
  };
  content: any;
  pageLang: Language;
  showCookieConsent?: boolean;
};

export const IndustryMarketingPageDocument: React.FC<IndustryMarketingPageDocumentProps> = ({
  page,
  content,
  pageLang,
  showCookieConsent = true
}) => {
  switch (page.id) {
    case 'industries-hub':
      return <IndustriesHubLanding content={content} pageLang={pageLang} showCookieConsent={showCookieConsent} />;
    case 'water-testing-labs':
      return <WaterTestingLabsLanding content={content} pageLang={pageLang} showCookieConsent={showCookieConsent} />;
    case 'water-quality-control':
      return <WaterQualityControlLanding content={content} pageLang={pageLang} showCookieConsent={showCookieConsent} />;
    case 'municipal-water-testing':
      return <MunicipalWaterLanding content={content} pageLang={pageLang} showCookieConsent={showCookieConsent} />;
    case 'food-beverage-water-quality':
      return <FoodBeverageWaterLanding content={content} pageLang={pageLang} showCookieConsent={showCookieConsent} />;
    case 'industrial-process-water':
      return <IndustrialProcessWaterLanding content={content} pageLang={pageLang} showCookieConsent={showCookieConsent} />;
    case 'facility-water-risk':
      return <FacilityWaterRiskLanding content={content} pageLang={pageLang} showCookieConsent={showCookieConsent} />;
    case 'agriculture-water':
      return <AgricultureWaterLanding content={content} pageLang={pageLang} showCookieConsent={showCookieConsent} />;
    case 'pharma-cosmetics-water':
      return <PharmaCosmeticsWaterLanding content={content} pageLang={pageLang} showCookieConsent={showCookieConsent} />;
    case 'hospitality-tourism-water':
      return <HospitalityTourismWaterLanding content={content} pageLang={pageLang} showCookieConsent={showCookieConsent} />;
    default:
      return <IndustriesHubLanding content={content} pageLang={pageLang} showCookieConsent={showCookieConsent} />;
  }
};

export default IndustryMarketingPageDocument;
