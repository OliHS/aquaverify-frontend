import {
  GLOSSARY_PRIORITY_IDS,
  getGlossaryHubContent,
  getGlossaryHubSeo,
  getGlossaryTermById,
  getGlossaryTermPageId,
  getGlossaryTermSeo
} from '../glossaryContent.js';
import { GLOSSARY_REVIEW_DATE } from '../glossaryRelations.js';
import { MARKETING_LANGUAGES, locale, page, section } from './shared.js';

function buildGlossaryPages() {
  const hub = page(
    'glossary',
    'resources',
    'quote',
    Object.fromEntries(MARKETING_LANGUAGES.map((lang) => {
      const hubSeo = getGlossaryHubSeo(lang);
      const hubContent = getGlossaryHubContent(lang);
      return [lang, locale(
        hubSeo.path,
        hubSeo.title,
        hubSeo.description,
        [
          section(hubContent.eyebrow, hubContent.lead, [
            `${hubContent.termsCount} ${hubContent.termsLabel}`,
            `${hubContent.priorityPagesCount} ${hubContent.priorityPagesLabel}`
          ])
        ],
        {
          eyebrow: hubContent.eyebrow,
          primaryCta: hubContent.primaryCta,
          secondaryCta: hubContent.secondaryCta,
          seoTitle: hubSeo.seoTitle,
          seoDescription: hubSeo.seoDescription,
          faqs: hubSeo.faqs
        }
      )];
    })),
    {
      parentId: 'resources',
      schemaType: 'DefinedTermSet',
      dateModified: GLOSSARY_REVIEW_DATE
    }
  );

  const terms = GLOSSARY_PRIORITY_IDS.map((termId) => page(
    getGlossaryTermPageId(termId),
    'resources',
    'quote',
    Object.fromEntries(MARKETING_LANGUAGES.map((lang) => {
      const term = getGlossaryTermById(termId, lang);
      const termSeo = getGlossaryTermSeo(termId, lang);
      const hubContent = getGlossaryHubContent(lang);
      return [lang, locale(
        termSeo.path,
        termSeo.title,
        termSeo.description,
        [
          section(hubContent.definition, term.definition, [
            `${hubContent.application}: ${term.application}`,
            `${hubContent.product}: ${term.product}`,
            `${hubContent.sector}: ${term.sector}`
          ])
        ],
        {
          eyebrow: term.categoryLabel,
          primaryCta: hubContent.contact,
          secondaryCta: hubContent.secondaryCta,
          seoTitle: termSeo.seoTitle,
          seoDescription: termSeo.seoDescription,
          faqs: termSeo.faqs
        }
      )];
    })),
    {
      parentId: 'glossary',
      schemaType: 'DefinedTerm',
      glossaryTermId: termId,
      dateModified: GLOSSARY_REVIEW_DATE
    }
  ));

  return [hub, ...terms];
}

export const GLOSSARY_MARKETING_PAGES = buildGlossaryPages();
