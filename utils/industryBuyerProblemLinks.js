import { AQUATOOLS_TOOL_DEFINITIONS } from './aquatoolsContent.js';
import { getGlossaryTermById, getGlossaryTermHref } from './glossaryContent.js';
import { getMarketingPagePath } from './marketingRoutes.js';
import { getResourcesHubContent } from './resourcesHubContent.js';
import { BUYER_PROBLEM_LINK_KIND_LABELS } from './industryBuyerProblemsContent.js';

function uniqueLinks(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = `${item.kind}:${item.id}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function getResourceLabel(resourceId, lang) {
  const resource = getResourcesHubContent(lang).whitepapers?.find((item) => item.id === resourceId);
  return resource?.title || resourceId;
}

function getToolLabel(toolId, lang) {
  const tool = AQUATOOLS_TOOL_DEFINITIONS.find((item) => item.id === toolId);
  return tool?.copy?.[lang]?.[0] || tool?.copy?.en?.[0] || toolId;
}

export function resolveIndustryBuyerProblemLinks(buyerProblems, lang) {
  if (!buyerProblems) return [];
  const labels = BUYER_PROBLEM_LINK_KIND_LABELS[lang] || BUYER_PROBLEM_LINK_KIND_LABELS.en;
  const links = [];

  (buyerProblems.relatedResourceIds || []).forEach((id) => {
    const href = getMarketingPagePath(id, lang);
    if (href && href !== '/') {
      links.push({ id, kind: 'resource', kindLabel: labels.resource, label: getResourceLabel(id, lang), href });
    }
  });

  (buyerProblems.relatedGlossaryTermIds || []).forEach((id) => {
    const term = getGlossaryTermById(id, lang);
    if (term) {
      links.push({ id, kind: 'glossary', kindLabel: labels.glossary, label: term.term, href: getGlossaryTermHref(id, lang) });
    }
  });

  (buyerProblems.relatedToolIds || []).forEach((id) => {
    const href = getMarketingPagePath(id, lang);
    if (href && href !== '/') {
      links.push({ id, kind: 'tool', kindLabel: labels.tool, label: getToolLabel(id, lang), href });
    }
  });

  return uniqueLinks(links).slice(0, 3);
}
