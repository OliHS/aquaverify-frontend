import fs from 'node:fs/promises';
import path from 'node:path';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import {
  MARKETING_LANGUAGES,
  MARKETING_PAGES,
  getMarketingAlternates,
  getMarketingPagePath,
  getMarketingPageSummary
} from '../utils/marketingPages.js';
import {
  getMarketingOverrideSlug,
  MARKETING_OVERRIDE_SECTION_ID,
  mergeMarketingContent,
  normalizeMarketingOverride
} from '../utils/marketingPageOverrides.js';
import {
  getChecklistHref,
  getResourcesHubContent,
  getResourcesHubSeo
} from '../utils/resourcesHubContent.js';
import {
  getGlossaryHubContent,
  getGlossaryRelatedLinks,
  getGlossaryTermById,
  isPriorityGlossaryTerm
} from '../utils/glossaryContent.js';
import { getResourceEditorialMeta } from '../utils/resourceEditorialMetadata.js';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const DIST_DIR = 'dist';
const SITE_URL = 'https://aquaverify.com';
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const SEO_LOCALES = {
  en: 'en_US',
  es: 'es_ES',
  fr: 'fr_FR',
  it: 'it_IT',
  ca: 'ca_ES'
};

const HOME_META = {
  en: {
    path: '/en',
    title: 'AquaVerify | Innovative Detection of Viruses and Bacteria in Water',
    description: 'AquaVerify develops, manufactures and distributes innovative products for detecting viruses and bacteria in water, connected with AquaVerify Cloud, technical reporting, distributors and OEM programs.'
  },
  es: {
    path: '/es',
    title: 'AquaVerify | Detección innovadora de virus y bacterias en el agua',
    description: 'AquaVerify desarrolla, fabrica y distribuye productos innovadores para la detección de virus y bacterias en el agua, conectados con AquaVerify Cloud, reporting técnico, distribuidores y programas OEM.'
  },
  fr: {
    path: '/fr',
    title: 'AquaVerify | Détection innovante des virus et bactéries dans l’eau',
    description: 'AquaVerify développe, fabrique et distribue des produits innovants pour détecter virus et bactéries dans l’eau, connectés à AquaVerify Cloud, reporting technique, distributeurs et programmes OEM.'
  },
  it: {
    path: '/it',
    title: 'AquaVerify | Rilevazione innovativa di virus e batteri nell’acqua',
    description: 'AquaVerify sviluppa, produce e distribuisce prodotti innovativi per rilevare virus e batteri nell’acqua, collegati ad AquaVerify Cloud, reporting tecnico, distributori e programmi OEM.'
  },
  ca: {
    path: '/ca',
    title: 'AquaVerify | Detecció innovadora de virus i bacteris a l’aigua',
    description: 'AquaVerify desenvolupa, fabrica i distribueix productes innovadors per detectar virus i bacteris a l’aigua, connectats amb AquaVerify Cloud, reporting tècnic, distribuïdors i programes OEM.'
  }
};

const HOME_ALTERNATES = {
  'x-default': '/',
  en: '/en',
  es: '/es',
  fr: '/fr',
  it: '/it',
  ca: '/ca'
};

const PRODUCT_LABELS = {
  en: 'Products',
  es: 'Productos',
  fr: 'Produits',
  it: 'Prodotti',
  ca: 'Productes'
};

const HOME_FAQS = {
  en: [
    ['Does AquaVerify sell kits, software or both?', 'AquaVerify offers water microbiology products and AquaVerify Cloud. Teams can start with product workflows and connect sample, batch, reading, review and report data when they need digital traceability.'],
    ['What does develop, manufacture and distribute mean?', 'It means AquaVerify works across product design, technical supply, channel support and digital workflow. Customers can access products, platform and partner routes from the same ecosystem.'],
    ['Can I buy AquaVerify products through a distributor?', 'Yes. AquaVerify supports authorized distributors so laboratories, utilities and industrial teams can work with local stock, training and commercial support where available.'],
    ['Which product family should I choose for enumeration?', 'ENUMERA is the recommended route when the workflow needs quantitative microbiological enumeration and a documented result that can move into reporting.'],
    ['Which product family is better for presence or absence decisions?', 'INDICA is designed for presence/absence screening, routine verification and fast operational decisions before a team needs deeper enumeration or confirmatory workflows.'],
    ['Can results be connected to AquaVerify Cloud?', 'Yes. AquaVerify Cloud can connect samples, products, operators, readings, reviews, technical reports, CRM context and customer portal delivery in one workflow.'],
    ['Can AquaVerify support OEM or private-label programs?', 'Yes. AquaVerify can support distributors and scientific partners with OEM, co-branding or private-label routes, depending on product scope, territory and technical requirements.']
  ],
  es: [
    ['¿AquaVerify vende kits, software o ambos?', 'AquaVerify ofrece productos de microbiología del agua y AquaVerify Cloud. Un equipo puede empezar con flujos de producto y conectar muestra, lote, lectura, revisión e informe cuando necesita trazabilidad digital.'],
    ['¿Qué significa que AquaVerify desarrolla, fabrica y distribuye?', 'Significa que AquaVerify trabaja sobre diseño de producto, suministro técnico, soporte de canal y flujo digital. El cliente puede acceder a productos, plataforma y rutas partner desde un mismo ecosistema.'],
    ['¿Puedo comprar productos AquaVerify a través de un distribuidor?', 'Sí. AquaVerify trabaja con distribuidores autorizados para que laboratorios, utilities e industrias puedan acceder a stock local, formación y soporte comercial cuando esté disponible.'],
    ['¿Qué familia necesito si busco enumeración?', 'ENUMERA es la ruta recomendada cuando el flujo necesita enumeración microbiológica cuantitativa y un resultado documentado que pueda pasar a reporting.'],
    ['¿Qué familia encaja mejor para presencia o ausencia?', 'INDICA está diseñada para cribado presencia/ausencia, verificaciones rutinarias y decisiones operativas rápidas antes de necesitar enumeración o flujos confirmatorios.'],
    ['¿Los resultados pueden conectarse con AquaVerify Cloud?', 'Sí. AquaVerify Cloud puede conectar muestras, productos, operadores, lecturas, revisión, informes técnicos, contexto CRM y entrega en portal cliente.'],
    ['¿AquaVerify puede ayudar con programas OEM o marca blanca?', 'Sí. AquaVerify puede apoyar a distribuidores y partners científicos con programas OEM, co-branding o marca blanca según alcance de producto, territorio y requisitos técnicos.']
  ],
  fr: [
    ['AquaVerify vend-il des kits, du logiciel ou les deux ?', 'AquaVerify propose des produits de microbiologie de l’eau et AquaVerify Cloud. Les équipes peuvent commencer par les produits puis connecter échantillon, lot, lecture, revue et rapport quand la traçabilité numérique devient nécessaire.'],
    ['Que signifie développer, fabriquer et distribuer ?', 'Cela signifie qu’AquaVerify travaille sur le design produit, la fourniture technique, le support canal et le flux numérique. Le client peut accéder aux produits, à la plateforme et aux parcours partenaires dans un même écosystème.'],
    ['Puis-je acheter les produits AquaVerify via un distributeur ?', 'Oui. AquaVerify s’appuie sur des distributeurs autorisés afin que laboratoires, utilities et industriels puissent accéder à stock local, formation et support commercial lorsque disponible.'],
    ['Quelle famille choisir pour le dénombrement ?', 'ENUMERA est la voie recommandée lorsqu’un flux nécessite un dénombrement microbiologique quantitatif et un résultat documenté exploitable en reporting.'],
    ['Quelle famille convient aux décisions présence/absence ?', 'INDICA est conçue pour le screening présence/absence, les vérifications de routine et les décisions opérationnelles rapides avant un éventuel dénombrement.'],
    ['Les résultats peuvent-ils être connectés à AquaVerify Cloud ?', 'Oui. AquaVerify Cloud peut relier échantillons, produits, opérateurs, lectures, revue, rapports techniques, contexte CRM et livraison via portail client.'],
    ['AquaVerify peut-il accompagner un programme OEM ou marque blanche ?', 'Oui. AquaVerify peut accompagner distributeurs et partenaires scientifiques avec des parcours OEM, co-branding ou marque blanche selon le périmètre produit, le territoire et les exigences techniques.']
  ],
  it: [
    ['AquaVerify vende kit, software o entrambi?', 'AquaVerify offre prodotti di microbiologia dell’acqua e AquaVerify Cloud. I team possono partire dai prodotti e collegare campione, lotto, lettura, revisione e report quando serve tracciabilità digitale.'],
    ['Che cosa significa sviluppare, produrre e distribuire?', 'Significa che AquaVerify lavora su design del prodotto, fornitura tecnica, supporto di canale e workflow digitale. Il cliente può accedere a prodotti, piattaforma e percorsi partner nello stesso ecosistema.'],
    ['Posso acquistare prodotti AquaVerify tramite un distributore?', 'Sì. AquaVerify supporta distributori autorizzati affinché laboratori, utility e industrie possano accedere a stock locale, formazione e supporto commerciale dove disponibili.'],
    ['Quale famiglia scegliere per l’enumerazione?', 'ENUMERA è il percorso consigliato quando il workflow richiede enumerazione microbiologica quantitativa e un risultato documentato da portare nel reporting.'],
    ['Quale famiglia è adatta a decisioni presenza/assenza?', 'INDICA è pensata per screening presenza/assenza, verifiche di routine e decisioni operative rapide prima di eventuali flussi di enumerazione.'],
    ['I risultati possono collegarsi ad AquaVerify Cloud?', 'Sì. AquaVerify Cloud può collegare campioni, prodotti, operatori, letture, revisione, report tecnici, contesto CRM e consegna tramite portale cliente.'],
    ['AquaVerify può supportare programmi OEM o private label?', 'Sì. AquaVerify può supportare distributori e partner scientifici con percorsi OEM, co-branding o private label in base ad ambito prodotto, territorio e requisiti tecnici.']
  ],
  ca: [
    ['AquaVerify ven kits, software o totes dues coses?', 'AquaVerify ofereix productes de microbiologia de l’aigua i AquaVerify Cloud. Els equips poden començar amb productes i connectar mostra, lot, lectura, revisió i informe quan necessiten traçabilitat digital.'],
    ['Què significa que AquaVerify desenvolupa, fabrica i distribueix?', 'Significa que AquaVerify treballa sobre disseny de producte, subministrament tècnic, suport de canal i flux digital. El client pot accedir a productes, plataforma i rutes partner des del mateix ecosistema.'],
    ['Puc comprar productes AquaVerify a través d’un distribuïdor?', 'Sí. AquaVerify treballa amb distribuïdors autoritzats perquè laboratoris, utilities i indústries puguin accedir a estoc local, formació i suport comercial quan estigui disponible.'],
    ['Quina família necessito si busco enumeració?', 'ENUMERA és la ruta recomanada quan el flux necessita enumeració microbiològica quantitativa i un resultat documentat que pugui passar a reporting.'],
    ['Quina família encaixa millor per presència o absència?', 'INDICA està dissenyada per a cribratge presència/absència, verificacions rutinàries i decisions operatives ràpides abans de necessitar enumeració.'],
    ['Els resultats poden connectar-se amb AquaVerify Cloud?', 'Sí. AquaVerify Cloud pot connectar mostres, productes, operadors, lectures, revisió, informes tècnics, context CRM i lliurament al portal client.'],
    ['AquaVerify pot ajudar amb programes OEM o marca blanca?', 'Sí. AquaVerify pot donar suport a distribuïdors i partners científics amb programes OEM, co-branding o marca blanca segons abast de producte, territori i requisits tècnics.']
  ]
};

const FEATURED_WHITEPAPER_IDS = [
  'coliphages-indicators',
  'eu-drinking-water-directive-coliphages',
  'water-compliance-software-guide',
  'us-drinking-water-compliance-coliform-rule'
];

const FEATURED_WHITEPAPER_COPY = {
  en: {
    eyebrow: 'Featured whitepapers',
    title: 'Regulatory resources for water quality teams',
    body: 'Start with four practical guides for technical decisions: viral indicators, European drinking water compliance, software evidence for audits and US EPA-oriented monitoring.',
    cta: 'Open whitepaper',
    badges: {
      'coliphages-indicators': 'Viral indicators',
      'eu-drinking-water-directive-coliphages': 'EU directive',
      'water-compliance-software-guide': 'Software evidence',
      'us-drinking-water-compliance-coliform-rule': 'US EPA / RTCR'
    }
  },
  es: {
    eyebrow: 'Whitepapers destacados',
    title: 'Recursos normativos para compradores de calidad del agua',
    body: 'Empieza por cuatro guías prácticas para decisiones técnicas: indicadores virales, cumplimiento europeo, evidencia software para auditorías y monitorización orientada a EPA en Estados Unidos.',
    cta: 'Abrir whitepaper',
    badges: {
      'coliphages-indicators': 'Indicadores virales',
      'eu-drinking-water-directive-coliphages': 'Directiva UE',
      'water-compliance-software-guide': 'Evidencia software',
      'us-drinking-water-compliance-coliform-rule': 'EPA / RTCR EEUU'
    }
  },
  fr: {
    eyebrow: 'Whitepapers sélectionnés',
    title: 'Ressources réglementaires pour acheteurs qualité de l’eau',
    body: 'Commencez par quatre guides pratiques pour les décisions techniques: indicateurs viraux, conformité européenne, preuve logicielle pour audits et suivi orienté EPA aux États-Unis.',
    cta: 'Ouvrir le whitepaper',
    badges: {
      'coliphages-indicators': 'Indicateurs viraux',
      'eu-drinking-water-directive-coliphages': 'Directive UE',
      'water-compliance-software-guide': 'Preuve logicielle',
      'us-drinking-water-compliance-coliform-rule': 'EPA / RTCR USA'
    }
  },
  it: {
    eyebrow: 'Whitepaper in evidenza',
    title: 'Risorse normative per team qualità acqua',
    body: 'Parti da quattro guide pratiche per decisioni tecniche: indicatori virali, conformità europea, evidenza software per audit e monitoraggio orientato EPA negli Stati Uniti.',
    cta: 'Apri whitepaper',
    badges: {
      'coliphages-indicators': 'Indicatori virali',
      'eu-drinking-water-directive-coliphages': 'Direttiva UE',
      'water-compliance-software-guide': 'Evidenza software',
      'us-drinking-water-compliance-coliform-rule': 'EPA / RTCR USA'
    }
  },
  ca: {
    eyebrow: 'Whitepapers destacats',
    title: 'Recursos normatius per a compradors de qualitat de l’aigua',
    body: 'Comença per quatre guies pràctiques per a decisions tècniques: indicadors virals, compliment europeu, evidència software per a auditories i monitoratge orientat a EPA als Estats Units.',
    cta: 'Obrir whitepaper',
    badges: {
      'coliphages-indicators': 'Indicadors virals',
      'eu-drinking-water-directive-coliphages': 'Directiva UE',
      'water-compliance-software-guide': 'Evidència software',
      'us-drinking-water-compliance-coliform-rule': 'EPA / RTCR EUA'
    }
  }
};

function absolute(routePath) {
  return `${SITE_URL}${routePath === '/' ? '/' : routePath}`;
}

function absoluteAsset(pathOrUrl) {
  const value = String(pathOrUrl || '').trim();
  if (!value) return `${SITE_URL}/android-chrome-512x512.png`;
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith('/') ? value : `/${value}`}`;
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);
}

function renderMarkdownInlineHtml(value) {
  const text = String(value || '');
  const pattern = /(\*\*\[([^\]]+)\]\(([^)]+)\)\*\*|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g;
  let cursor = 0;
  let output = '';
  let match;

  while ((match = pattern.exec(text)) !== null) {
    output += escapeHtml(text.slice(cursor, match.index));

    if (match[2] && match[3]) {
      output += `<a href="${escapeHtml(externalOrAbsolute(match[3]))}"><strong>${escapeHtml(match[2])}</strong></a>`;
    } else if (match[4] && match[5]) {
      output += `<a href="${escapeHtml(externalOrAbsolute(match[5]))}">${escapeHtml(match[4])}</a>`;
    } else if (match[6]) {
      output += `<strong>${escapeHtml(match[6])}</strong>`;
    } else if (match[7]) {
      output += `<em>${escapeHtml(match[7])}</em>`;
    } else if (match[8]) {
      output += `<code>${escapeHtml(match[8])}</code>`;
    }

    cursor = pattern.lastIndex;
  }

  output += escapeHtml(text.slice(cursor));
  return output;
}

function extractStandaloneMarkdownLinks(value) {
  const source = String(value || '').trim();
  const pattern = /(\*\*)?\[([^\]]+)\]\(([^)]+)\)(\*\*)?/g;
  const links = [];
  const remainder = source.replace(pattern, (_match, _openBold, label, href) => {
    links.push({ label, href: String(href || '').trim() });
    return ' ';
  }).trim();
  return links.length >= 2 && !remainder ? links : [];
}

function renderMarkdownActionLinksHtml(value) {
  const links = extractStandaloneMarkdownLinks(value);
  if (!links.length) return '';
  return [
    '        <div class="aqv-action-links">',
    ...links.map((link, index) => `          <a class="${index === 0 ? 'aqv-action-primary' : 'aqv-action-secondary'}" href="${escapeHtml(externalOrAbsolute(link.href))}">${escapeHtml(link.label)}</a>`),
    '        </div>'
  ].join('\n');
}

const MARKDOWN_WHITEPAPER_HTML_STYLES = `
.aqv-action-links{display:flex;flex-wrap:wrap;gap:12px;border:1px solid #cffafe;background:rgba(236,254,255,.75);border-radius:18px;padding:16px}.aqv-action-links a{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;padding:12px 18px;font-size:14px;font-weight:900;text-decoration:none}.aqv-action-primary{background:#00AEEF;color:#fff!important;box-shadow:0 12px 26px rgba(0,174,239,.18)}.aqv-action-secondary{border:1px solid #e2e8f0;background:#fff;color:#0A4F7D!important}.aqv-rich-html{color:#475569}.aqv-rich-html h3{font-size:1.1rem;font-weight:900;color:#0A4F7D;margin:0 0 .75rem}.aqv-rich-html p{font-size:.95rem;line-height:1.65;color:#475569}.aqv-rich-html a{font-weight:900;color:#0A4F7D;text-decoration:none}.aqv-rich-html .aqv-diagram{border:1px solid #dbeafe;background:#ecfeff;border-radius:24px;padding:18px}.aqv-rich-html .aqv-flow,.aqv-rich-html .aqv-matrix,.aqv-rich-html .aqv-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px}.aqv-rich-html .step,.aqv-rich-html .cell,.aqv-rich-html .aqv-card{border:1px solid #e2e8f0;background:#fff;border-radius:16px;padding:14px}.aqv-rich-html .step .n{display:inline-flex;width:24px;height:24px;align-items:center;justify-content:center;border-radius:999px;background:#00AEEF;color:#fff;font-weight:900}.aqv-rich-html .aqv-actions{display:flex;flex-wrap:wrap;gap:10px}.aqv-rich-html .aqv-btn{display:inline-flex;border-radius:999px;padding:11px 14px;font-size:13px;font-weight:900;text-decoration:none;border:1px solid #e2e8f0}.aqv-rich-html .aqv-btn-primary{background:#00AEEF;color:#fff;border-color:#00AEEF}.aqv-rich-html .aqv-faq details{border:1px solid #e2e8f0;border-radius:16px;background:#fff;padding:14px;margin-top:10px}.aqv-rich-html .aqv-faq summary{cursor:pointer;font-weight:900;color:#0f172a}
`;

function renderTechnicalTable(table) {
  const columns = Array.isArray(table?.columns) ? table.columns : [];
  const rows = Array.isArray(table?.rows) ? table.rows : [];
  if (!columns.length || !rows.length) return '';

  return [
    '        <table>',
    '          <thead>',
    '            <tr>',
    ...columns.map((column) => `              <th>${escapeHtml(column)}</th>`),
    '            </tr>',
    '          </thead>',
    '          <tbody>',
    ...rows.map((row) => [
      '            <tr>',
      ...columns.map((_column, index) => `              <td>${escapeHtml(row?.[index] || '')}</td>`),
      '            </tr>'
    ].join('\n')),
    '          </tbody>',
    '        </table>'
  ].join('\n');
}

function externalOrAbsolute(pathOrUrl) {
  const value = String(pathOrUrl || '').trim();
  if (!value) return '';
  if (value.startsWith('#')) return value;
  if (/^https?:\/\//i.test(value)) return value;
  return absolute(value.startsWith('/') ? value : `/${value}`);
}

function renderSectionList(sections = []) {
  return sections.map((section) => {
    const bullets = Array.isArray(section.bullets) ? section.bullets : [];
    return [
      '      <section>',
      `        <h2>${escapeHtml(section.title)}</h2>`,
      section.body ? `        <p>${escapeHtml(section.body)}</p>` : '',
      bullets.length ? [
        '        <ul>',
        ...bullets.map((bullet) => `          <li>${escapeHtml(bullet)}</li>`),
        '        </ul>'
      ].join('\n') : '',
      section.table ? renderTechnicalTable(section.table) : '',
      '      </section>'
    ].filter(Boolean).join('\n');
  }).join('\n');
}

function renderAnswerLayer(page, content) {
  if (!content || page?.id === 'distributors') return '';
  const sections = Array.isArray(content.sections) ? content.sections : [];
  const hasAnswerSections = sections.some((section) => (
    section?.kind === 'directAnswer' || section?.kind === 'technicalTable'
  ));
  if (hasAnswerSections || (!content.directAnswer && !content.technicalTable)) return '';

  return [
    content.directAnswer ? [
      '      <section>',
      `        <h2>${escapeHtml(content.directAnswer.title)}</h2>`,
      content.directAnswer.body ? `        <p>${escapeHtml(content.directAnswer.body)}</p>` : '',
      '      </section>'
    ].join('\n') : '',
    content.technicalTable ? [
      '      <section>',
      `        <h2>${escapeHtml(content.technicalTable.title || '')}</h2>`,
      renderTechnicalTable(content.technicalTable),
      '      </section>'
    ].join('\n') : ''
  ].filter(Boolean).join('\n');
}

function withBaseAnswerLayer(page, lang, content) {
  const baseContent = page?.translations?.[lang];
  const baseSections = Array.isArray(baseContent?.sections) ? baseContent.sections : [];
  const answerSections = baseSections.filter((section) => section?.kind === 'directAnswer' || section?.kind === 'technicalTable');
  const hasTopLevelAnswerLayer = Boolean(baseContent?.directAnswer || baseContent?.technicalTable);
  if (!answerSections.length && !hasTopLevelAnswerLayer) return content;

  const currentSections = Array.isArray(content?.sections) ? content.sections : [];
  const nonAnswerSections = currentSections.filter((section) => section?.kind !== 'directAnswer' && section?.kind !== 'technicalTable');

  return {
    ...content,
    directAnswer: baseContent?.directAnswer || content.directAnswer,
    technicalTable: baseContent?.technicalTable || content.technicalTable,
    sections: answerSections.length ? [...answerSections, ...nonAnswerSections] : content.sections,
    faqs: Array.isArray(baseContent?.faqs) && baseContent.faqs.length > 0 ? baseContent.faqs : content.faqs
  };
}

function renderFeaturedWhitepapers(page, lang) {
  if (page?.id !== 'resources') return '';
  const copy = FEATURED_WHITEPAPER_COPY[lang] || FEATURED_WHITEPAPER_COPY.en;
  const items = FEATURED_WHITEPAPER_IDS
    .map((id) => getMarketingPageSummary(id, lang))
    .filter(Boolean);

  if (!items.length) return '';

  return [
    '      <section>',
    `        <p>${escapeHtml(copy.eyebrow)}</p>`,
    `        <h2>${escapeHtml(copy.title)}</h2>`,
    `        <p>${escapeHtml(copy.body)}</p>`,
    '        <ul>',
    ...items.map((item) => [
      '          <li>',
      `            <p><strong>${escapeHtml(copy.badges[item.id] || copy.eyebrow)}</strong></p>`,
      `            <h3>${escapeHtml(item.title)}</h3>`,
      `            <p>${escapeHtml(item.description)}</p>`,
      `            <a href="${escapeHtml(absolute(item.path))}">${escapeHtml(copy.cta)}</a>`,
      '          </li>'
    ].join('\n')),
    '        </ul>',
    '      </section>'
  ].join('\n');
}

function renderResourcesHubDetails(page, lang) {
  if (page?.id !== 'resources') return '';
  const content = getResourcesHubContent(lang);
  const whitepapers = content.whitepapers || [];
  const checklists = content.checklists || [];
  const routes = content.routes || [];
  const sectors = content.sectors || [];
  const products = content.products || [];

  return [
    '      <section>',
    `        <p>${escapeHtml(content.intentEyebrow)}</p>`,
    `        <h2>${escapeHtml(content.intentTitle)}</h2>`,
    `        <p>${escapeHtml(content.intentBody)}</p>`,
    '        <ul>',
    ...content.intents.map(([category, title, body]) => `          <li><strong>${escapeHtml(title)}</strong> ${escapeHtml(body)} <span>${escapeHtml(content.filters[category] || category)}</span></li>`),
    '        </ul>',
    '      </section>',
    '      <section>',
    `        <p>${escapeHtml(content.whitepapersEyebrow)}</p>`,
    `        <h2>${escapeHtml(content.whitepapersTitle)}</h2>`,
    `        <p>${escapeHtml(content.whitepapersBody)}</p>`,
    '        <ul>',
    ...whitepapers.map((item) => [
      '          <li>',
      `            <p><strong>${escapeHtml(item.label)}</strong></p>`,
      `            <h3><a href="${escapeHtml(absolute(getMarketingPagePath(item.id, lang)))}">${escapeHtml(item.title)}</a></h3>`,
      `            <p>${escapeHtml(item.body)}</p>`,
      `            <p>${escapeHtml(content.metaLabels.audience)}: ${escapeHtml(item.audience)} · ${escapeHtml(content.metaLabels.region)}: ${escapeHtml(item.region)} · ${escapeHtml(content.metaLabels.level)}: ${escapeHtml(item.level)} · ${escapeHtml(content.metaLabels.reading)}: ${escapeHtml(item.reading)}</p>`,
      '          </li>'
    ].join('\n')),
    '        </ul>',
    '      </section>',
    '      <section>',
    `        <p>${escapeHtml(content.checklistsEyebrow)}</p>`,
    `        <h2>${escapeHtml(content.checklistsTitle)}</h2>`,
    `        <p>${escapeHtml(content.checklistsBody)}</p>`,
    '        <ul>',
    ...checklists.map(([id, title, body]) => [
      '          <li>',
      `            <h3><a href="${escapeHtml(absolute(getChecklistHref(lang, id)))}">${escapeHtml(title)}</a></h3>`,
      `            <p>${escapeHtml(body)}</p>`,
      '          </li>'
    ].join('\n')),
    '        </ul>',
    '      </section>',
    '      <section>',
    `        <h2>${escapeHtml(content.nextTitle)}</h2>`,
    '        <ul>',
    ...routes.map(([id, title, body]) => `          <li><strong><a href="${escapeHtml(absolute(getMarketingPagePath(id, lang)))}">${escapeHtml(title)}</a></strong> ${escapeHtml(body)}</li>`),
    '        </ul>',
    '      </section>',
    '      <section>',
    `        <h2>${escapeHtml(content.sectorTitle)}</h2>`,
    '        <ul>',
    ...sectors.map(([id, title, body]) => `          <li><strong><a href="${escapeHtml(absolute(getMarketingPagePath(id, lang)))}">${escapeHtml(title)}</a></strong> ${escapeHtml(body)}</li>`),
    '        </ul>',
    '      </section>',
    '      <section>',
    `        <h2>${escapeHtml(content.productTitle)}</h2>`,
    '        <ul>',
    ...products.map(([id, title, body]) => `          <li><strong><a href="${escapeHtml(absolute(getMarketingPagePath(id, lang)))}">${escapeHtml(title)}</a></strong> ${escapeHtml(body)}</li>`),
    '        </ul>',
    '      </section>'
  ].join('\n');
}

function renderGlossaryDetails(page, lang) {
  const glossary = getGlossaryHubContent(lang);
  const termId = page?.glossaryTermId;
  const term = typeof termId === 'number' ? getGlossaryTermById(termId, lang) : null;

  if (term) {
    const relatedLinks = getGlossaryRelatedLinks(term, lang);
    const relatedTerms = glossary.terms
      .filter((item) => item.id !== term.id && item.category === term.category)
      .slice(0, 8);

    return [
      '      <section>',
      `        <p>${escapeHtml(term.categoryLabel)}</p>`,
      `        <h2>${escapeHtml(glossary.definition)}</h2>`,
      `        <p>${escapeHtml(term.definition)}</p>`,
      `        <h2>${escapeHtml(glossary.application)}</h2>`,
      `        <p>${escapeHtml(term.application)}</p>`,
      '        <ul>',
      `          <li><strong>${escapeHtml(glossary.product)}:</strong> ${escapeHtml(term.product)}</li>`,
      `          <li><strong>${escapeHtml(glossary.sector)}:</strong> ${escapeHtml(term.sector)}</li>`,
      '        </ul>',
      '      </section>',
      '      <section>',
      `        <h2>${escapeHtml(glossary.relatedTitle)}</h2>`,
      `        <p>${escapeHtml(glossary.relatedBody)}</p>`,
      '        <ul>',
      ...relatedLinks.map((link) => `          <li><strong><a href="${escapeHtml(absolute(link.href))}">${escapeHtml(link.label)}</a></strong> ${escapeHtml(link.kind)}</li>`),
      '        </ul>',
      '      </section>',
      '      <section>',
      `        <h2>${escapeHtml(glossary.relatedTerms)}</h2>`,
      '        <ul>',
      ...relatedTerms.map((item) => `          <li><strong>${isPriorityGlossaryTerm(item.id) ? `<a href="${escapeHtml(absolute(item.url))}">${escapeHtml(item.term)}</a>` : escapeHtml(item.term)}</strong> ${escapeHtml(item.definition)}</li>`),
      '        </ul>',
      '      </section>'
    ].join('\n');
  }

  return [
    '      <section>',
    `        <p>${escapeHtml(glossary.eyebrow)}</p>`,
    `        <h2>${escapeHtml(glossary.title)}</h2>`,
    `        <p>${escapeHtml(glossary.lead)}</p>`,
    `        <p><strong>${glossary.termsCount} ${escapeHtml(glossary.termsLabel)}</strong> · <strong>${glossary.priorityPagesCount} ${escapeHtml(glossary.priorityPagesLabel)}</strong></p>`,
    '      </section>',
    '      <section>',
    `        <h2>${escapeHtml(glossary.primaryCta)}</h2>`,
    '        <ul>',
    ...glossary.priorityTerms.map((item) => [
      '          <li>',
      `            <h3><a href="${escapeHtml(absolute(item.url))}">${escapeHtml(item.term)}</a></h3>`,
      `            <p>${escapeHtml(item.definition)}</p>`,
      `            <p>${escapeHtml(glossary.product)}: ${escapeHtml(item.product)} · ${escapeHtml(glossary.sector)}: ${escapeHtml(item.sector)}</p>`,
      '          </li>'
    ].join('\n')),
    '        </ul>',
    '      </section>',
    '      <section>',
    `        <h2>${escapeHtml(glossary.all)}</h2>`,
    '        <ul>',
    ...glossary.terms.map((item) => `          <li><strong>${escapeHtml(item.term)}</strong> ${escapeHtml(item.definition)}</li>`),
    '        </ul>',
    '      </section>'
  ].join('\n');
}

function renderIndustriesHubSectors(page, content, lang) {
  if (page?.id !== 'industries-hub' || !Array.isArray(content?.sectors) || !content.sectors.length) return '';

  return [
    '      <section>',
    `        <h2>${escapeHtml(content.sections?.[1]?.title || content.title)}</h2>`,
    content.sections?.[1]?.body ? `        <p>${escapeHtml(content.sections[1].body)}</p>` : '',
    '        <ul>',
    ...content.sectors.map((sector) => {
      const href = absolute(getMarketingPagePath(sector.routeId, lang));
      return [
        '          <li>',
        `            <h3><a href="${escapeHtml(href)}">${escapeHtml(sector.title)}</a></h3>`,
        `            <p>${escapeHtml(sector.body)}</p>`,
        sector.focus ? `            <p><strong>${escapeHtml(content.focusLabel || 'Focus')}:</strong> ${escapeHtml(sector.focus)}</p>` : '',
        '          </li>'
      ].filter(Boolean).join('\n');
    }),
    '        </ul>',
    '      </section>'
  ].join('\n');
}

function renderDistributorsDetails(page, content, lang) {
  if (page?.id !== 'distributors') return '';
  const paths = [content?.buyerPath, content?.partnerPath].filter(Boolean);
  const buyerCards = Array.isArray(content?.buyerCards) ? content.buyerCards : [];
  const partnerModels = Array.isArray(content?.partnerModels) ? content.partnerModels : [];
  const sectors = Array.isArray(content?.sectors) ? content.sectors : [];
  const programCards = Array.isArray(content?.programCards) ? content.programCards : [];
  const pageUrl = absolute(content?.path || getMarketingPagePath('distributors', lang));

  return [
    content.directAnswer ? [
      '      <section>',
      `        <h2>${escapeHtml(content.directAnswer.title)}</h2>`,
      content.directAnswer.body ? `        <p>${escapeHtml(content.directAnswer.body)}</p>` : '',
      '      </section>'
    ].join('\n') : '',
    content.technicalTable ? [
      '      <section>',
      `        <h2>${escapeHtml(content.technicalTable.title || '')}</h2>`,
      renderTechnicalTable(content.technicalTable),
      '      </section>'
    ].join('\n') : '',
    '      <section>',
    `        <h2>${escapeHtml(content.pathsTitle || content.title)}</h2>`,
    content.pathsBody ? `        <p>${escapeHtml(content.pathsBody)}</p>` : '',
    paths.length ? [
      '        <ul>',
      ...paths.map((item) => [
        '          <li>',
        `            <h3>${escapeHtml(item.title)}</h3>`,
        `            <p>${escapeHtml(item.body)}</p>`,
        Array.isArray(item.bullets) && item.bullets.length ? [
          '            <ul>',
          ...item.bullets.map((bullet) => `              <li>${escapeHtml(bullet)}</li>`),
          '            </ul>'
        ].join('\n') : '',
        item.cta ? `            <p><a href="${escapeHtml(`${pageUrl}#${item === content.buyerPath ? 'buscar-distribuidor' : 'ser-distribuidor'}`)}">${escapeHtml(item.cta)}</a></p>` : '',
        '          </li>'
      ].filter(Boolean).join('\n')),
      '        </ul>'
    ].join('\n') : '',
    '      </section>',
    '      <section>',
    `        <h2>${escapeHtml(content.authorizedTitle || '')}</h2>`,
    content.authorizedBody ? `        <p>${escapeHtml(content.authorizedBody)}</p>` : '',
    content.searchBody ? `        <p>${escapeHtml(content.searchBody)}</p>` : '',
    '      </section>',
    buyerCards.length ? [
      '      <section>',
      `        <h2>${escapeHtml(content.buyerTitle || '')}</h2>`,
      content.buyerBody ? `        <p>${escapeHtml(content.buyerBody)}</p>` : '',
      '        <ul>',
      ...buyerCards.map((item) => `          <li><strong>${escapeHtml(item.title)}:</strong> ${escapeHtml(item.body)}</li>`),
      '        </ul>',
      '      </section>'
    ].join('\n') : '',
    partnerModels.length ? [
      '      <section>',
      `        <h2>${escapeHtml(content.partnerTitle || '')}</h2>`,
      content.partnerBody ? `        <p>${escapeHtml(content.partnerBody)}</p>` : '',
      '        <ul>',
      ...partnerModels.map((item) => `          <li><strong>${escapeHtml(item.title)}:</strong> ${escapeHtml(item.body)}</li>`),
      '        </ul>',
      '      </section>'
    ].join('\n') : '',
    programCards.length ? [
      '      <section>',
      `        <h2>${escapeHtml(content.programTitle || '')}</h2>`,
      content.programBody ? `        <p>${escapeHtml(content.programBody)}</p>` : '',
      '        <ul>',
      ...programCards.map((item) => `          <li><strong>${escapeHtml(item.title)}:</strong> ${escapeHtml(item.body)}</li>`),
      '        </ul>',
      '      </section>'
    ].join('\n') : '',
    sectors.length ? [
      '      <section>',
      `        <h2>${escapeHtml(content.sectorsTitle || '')}</h2>`,
      content.sectorsBody ? `        <p>${escapeHtml(content.sectorsBody)}</p>` : '',
      '        <ul>',
      ...sectors.map((sector) => [
        '          <li>',
        `            <h3><a href="${escapeHtml(absolute(getMarketingPagePath(sector.routeId, lang)))}">${escapeHtml(sector.title)}</a></h3>`,
        `            <p>${escapeHtml(sector.body)}</p>`,
        '          </li>'
      ].join('\n')),
      '        </ul>',
      '      </section>'
    ].join('\n') : '',
    '      <section>',
    `        <h2>${escapeHtml(content.formsTitle || '')}</h2>`,
    content.formsBody ? `        <p>${escapeHtml(content.formsBody)}</p>` : '',
    `        <p><a href="${escapeHtml(`${pageUrl}#buscar-distribuidor`)}">${escapeHtml(content.forms?.buyer?.title || content.primaryCta || '')}</a></p>`,
    `        <p><a href="${escapeHtml(`${pageUrl}#ser-distribuidor`)}">${escapeHtml(content.forms?.partner?.title || content.secondaryCta || '')}</a></p>`,
    '      </section>'
  ].filter(Boolean).join('\n');
}

function renderFaqs(faqs = []) {
  if (!faqs.length) return '';

  return [
    '      <section>',
    '        <h2>FAQ</h2>',
    ...faqs.map((faq) => [
      '        <article>',
      `          <h3>${escapeHtml(faq.question)}</h3>`,
      `          <p>${escapeHtml(faq.answer)}</p>`,
      '        </article>'
    ].join('\n')),
    '      </section>'
  ].join('\n');
}

function renderWhitepaperDeepDive(whitepaper) {
  if (!whitepaper?.title || !whitepaper?.intro) return '';
  const metrics = Array.isArray(whitepaper.metrics) ? whitepaper.metrics : [];
  const comparison = Array.isArray(whitepaper.comparison) ? whitepaper.comparison : [];
  const flow = Array.isArray(whitepaper.flow) ? whitepaper.flow : [];
  const timeline = Array.isArray(whitepaper.timeline) ? whitepaper.timeline : [];

  return [
    '      <section>',
    `        <h2>${escapeHtml(whitepaper.title)}</h2>`,
    `        <p>${escapeHtml(whitepaper.intro)}</p>`,
    metrics.length ? [
      '        <ul>',
      ...metrics.map((metric) => `          <li><strong>${escapeHtml(metric.label || '')}: ${escapeHtml(metric.value || '')}</strong> ${escapeHtml(metric.body || '')}</li>`),
      '        </ul>'
    ].join('\n') : '',
    whitepaper.comparisonTitle ? `        <h3>${escapeHtml(whitepaper.comparisonTitle)}</h3>` : '',
    comparison.length ? [
      '        <ul>',
      ...comparison.map((item) => `          <li><strong>${escapeHtml(item.label || '')}: ${escapeHtml(item.title || '')}</strong> ${escapeHtml(item.body || '')}</li>`),
      '        </ul>'
    ].join('\n') : '',
    whitepaper.flowTitle ? `        <h3>${escapeHtml(whitepaper.flowTitle)}</h3>` : '',
    flow.length ? [
      '        <ol>',
      ...flow.map((step) => `          <li><strong>${escapeHtml(step.title || '')}</strong> ${escapeHtml(step.body || '')}</li>`),
      '        </ol>'
    ].join('\n') : '',
    whitepaper.timelineTitle ? `        <h3>${escapeHtml(whitepaper.timelineTitle)}</h3>` : '',
    timeline.length ? [
      '        <ol>',
      ...timeline.map((item) => `          <li><strong>${escapeHtml(item.year || '')} · ${escapeHtml(item.region || '')} · ${escapeHtml(item.sector || '')}</strong> ${escapeHtml(item.body || '')}</li>`),
      '        </ol>'
    ].join('\n') : '',
    whitepaper.sourceLabel ? `        <p><strong>${escapeHtml(whitepaper.sourceLabel)}</strong></p>` : '',
    whitepaper.note ? `        <p>${escapeHtml(whitepaper.note)}</p>` : '',
    '      </section>'
  ].filter(Boolean).join('\n');
}

function renderMarkdownWhitepaper(whitepaper) {
  if (!whitepaper?.blocks?.length) return '';

  const metaCards = [
    ['Audience', whitepaper.audience],
    ['Region', whitepaper.region],
    ['Level', whitepaper.level],
    ['Reading time', whitepaper.readingTime]
  ].filter(([, value]) => Boolean(value));

  const renderBlock = (block) => {
    if (block.type === 'heading') {
      return block.level >= 3
        ? `        <h3${block.id ? ` id="${escapeHtml(block.id)}"` : ''}>${escapeHtml(block.text)}</h3>`
        : `        <h2${block.id ? ` id="${escapeHtml(block.id)}"` : ''}>${escapeHtml(block.text)}</h2>`;
    }

    if (block.type === 'paragraph') {
      const actionLinksHtml = renderMarkdownActionLinksHtml(block.text);
      if (actionLinksHtml) return actionLinksHtml;
      return `        <p>${renderMarkdownInlineHtml(block.text)}</p>`;
    }

    if (block.type === 'unorderedList') {
      return [
        '        <ul>',
        ...block.items.map((item) => `          <li>${item.checked ? '✓ ' : ''}${renderMarkdownInlineHtml(item.text)}</li>`),
        '        </ul>'
      ].join('\n');
    }

    if (block.type === 'orderedList') {
      return [
        '        <ol>',
        ...block.items.map((item) => `          <li>${renderMarkdownInlineHtml(item.text)}</li>`),
        '        </ol>'
      ].join('\n');
    }

    if (block.type === 'table') {
      return [
        '        <table>',
        '          <thead>',
        '            <tr>',
        ...block.headers.map((header) => `              <th>${renderMarkdownInlineHtml(header)}</th>`),
        '            </tr>',
        '          </thead>',
        '          <tbody>',
        ...block.rows.map((row) => [
          '            <tr>',
          ...row.map((cell) => `              <td>${renderMarkdownInlineHtml(cell)}</td>`),
          '            </tr>'
        ].join('\n')),
        '          </tbody>',
        '        </table>'
      ].join('\n');
    }

    if (block.type === 'html') {
      return `        <div class="aqv-rich-html">${block.html}</div>`;
    }

    return '';
  };

  return [
    '      <article>',
    `        <style>${MARKDOWN_WHITEPAPER_HTML_STYLES}</style>`,
    metaCards.length ? [
      '        <dl>',
      ...metaCards.map(([label, value]) => `          <div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`),
      '        </dl>'
    ].join('\n') : '',
    Array.isArray(whitepaper.relatedTopics) && whitepaper.relatedTopics.length ? [
      '        <p><strong>Related topics:</strong> ',
      whitepaper.relatedTopics.map((topic) => escapeHtml(topic)).join(', '),
      '</p>'
    ].join('') : '',
    ...whitepaper.blocks.map(renderBlock),
    '      </article>'
  ].filter(Boolean).join('\n');
}

function renderHeroVisual(meta, content, title) {
  if (meta?.page?.id === 'water-quality-control') return '';
  const heroImage = content?.heroImage ? absoluteAsset(content.heroImage) : '';
  const heroVideo = content?.heroVideo ? absoluteAsset(content.heroVideo) : '';
  const platformGallery = meta?.page?.id === 'platform' && Array.isArray(content?.gallery)
    ? content.gallery
      .filter((item) => item?.src && item?.alt)
      .slice(0, 5)
      .map((item) => ({
        ...item,
        src: absoluteAsset(item.src)
      }))
    : [];

  if (platformGallery.length > 1) {
    const [featured, ...thumbs] = platformGallery;
    return [
      '      <div data-prerender-platform-carousel style="margin-top: 28px; max-width: 620px; border: 1px solid #e2e8f0; border-radius: 28px; background: rgba(255,255,255,.92); padding: 10px; box-shadow: 0 22px 55px rgba(15,23,42,.14);">',
      '        <div style="position: relative; aspect-ratio: 16 / 10; overflow: hidden; border-radius: 16px; background: #ffffff;">',
      `          <img src="${escapeHtml(featured.src)}" alt="${escapeHtml(featured.alt || title)}" style="display: block; width: 100%; height: 100%; object-fit: contain; object-position: top center;" />`,
      '          <div style="position: absolute; inset: auto 0 0 0; padding: 44px 18px 16px; background: linear-gradient(to top, rgba(10,79,125,.92), rgba(10,79,125,.52), rgba(10,79,125,0));">',
      featured.title ? `            <p style="margin: 0; font-weight: 800; color: #ffffff;">${escapeHtml(featured.title)}</p>` : '',
      featured.body ? `            <p style="margin: 4px 0 0; font-size: 13px; line-height: 1.5; color: rgba(236,254,255,.88);">${escapeHtml(featured.body)}</p>` : '',
      '          </div>',
      '        </div>',
      thumbs.length ? [
        '        <div style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; margin-top: 8px;">',
        ...thumbs.map((item) => `          <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt || title)}" style="display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; object-position: top center; border-radius: 10px; background: #ffffff;" />`),
        '        </div>'
      ].join('\n') : '',
      '      </div>'
    ].filter(Boolean).join('\n');
  }

  if (heroVideo) {
    return `      <video src="${escapeHtml(heroVideo)}"${heroImage ? ` poster="${escapeHtml(heroImage)}"` : ''} aria-label="${escapeHtml(content?.heroImageAlt || title)}" autoplay muted loop playsinline preload="auto" style="display: block; max-width: 560px; width: 100%; max-height: 460px; object-fit: contain; margin-top: 28px;"></video>`;
  }

  return heroImage
    ? `      <img src="${escapeHtml(heroImage)}" alt="${escapeHtml(content?.heroImageAlt || title)}" style="display: block; max-width: 560px; width: 100%; max-height: 460px; object-fit: contain; margin-top: 28px;" />`
    : '';
}

function renderVisualBlocks(content) {
  const visuals = content?.visuals || {};
  const blocks = [visuals.sampleFlow, visuals.maturity].filter(Boolean);
  if (!blocks.length) return '';

  return blocks.map((block) => {
    const items = Array.isArray(block.items) ? block.items : [];
    return [
      '        <section>',
      block.eyebrow ? `          <p><strong>${escapeHtml(block.eyebrow)}</strong></p>` : '',
      block.title ? `          <h2>${escapeHtml(block.title)}</h2>` : '',
      block.body ? `          <p>${escapeHtml(block.body)}</p>` : '',
      items.length ? [
        '          <ol>',
        ...items.map((item) => `            <li><strong>${escapeHtml(item.title || '')}</strong>${item.body ? ` ${escapeHtml(item.body)}` : ''}${item.label ? ` · ${escapeHtml(item.label)}` : ''}</li>`),
        '          </ol>'
      ].join('\n') : '',
      block.calloutTitle || block.calloutBody ? `          <p><strong>${escapeHtml(block.calloutTitle || '')}</strong>${block.calloutBody ? ` ${escapeHtml(block.calloutBody)}` : ''}</p>` : '',
      block.cta ? `          <p><strong>${escapeHtml(block.cta)}</strong></p>` : '',
      '        </section>'
    ].filter(Boolean).join('\n');
  }).join('\n');
}

function renderPrerenderShell() {
  return [
    '<div data-prerender-shell aria-hidden="true" style="min-height: 100vh; background: #ffffff; color: #0f172a; font-family: Inter, Arial, sans-serif;">',
    '  <header style="position: fixed; inset: 0 0 auto 0; z-index: 50; background: #ffffff; border-bottom: 1px solid #e2e8f0;">',
    '    <div style="max-width: 1180px; margin: 0 auto; height: 80px; padding: 0 24px; display: flex; align-items: center; justify-content: space-between;">',
    '      <div style="display: flex; align-items: center; gap: 12px;">',
    '        <img src="/images/logo-mark-160.png" alt="" width="32" height="40" style="display: block; width: 32px; height: 40px; object-fit: contain;" />',
    '        <div style="font-size: 20px; font-weight: 800; letter-spacing: -0.01em; color: #0A4F7D;">Aqua<span style="color: #00AEEF;">Verify</span></div>',
    '      </div>',
    '      <div style="display: flex; gap: 14px;">',
    '        <span style="display: block; width: 72px; height: 8px; border-radius: 999px; background: #f1f5f9;"></span>',
    '        <span style="display: block; width: 56px; height: 8px; border-radius: 999px; background: #f1f5f9;"></span>',
    '        <span style="display: block; width: 88px; height: 8px; border-radius: 999px; background: #f1f5f9;"></span>',
    '      </div>',
    '    </div>',
    '  </header>',
    '  <main style="padding-top: 80px;">',
    '    <section style="min-height: calc(90vh - 80px); display: flex; flex-wrap: wrap; overflow: hidden; background: radial-gradient(circle at 90% 8%, rgba(34,211,238,.24), transparent 26%), radial-gradient(circle at 10% 16%, rgba(10,45,77,.10), transparent 30%), #ffffff;">',
    '      <div style="flex: 1 1 420px; min-height: 560px; padding: 72px min(8vw, 80px); display: flex; align-items: center;">',
    '        <div style="width: min(100%, 520px);">',
    '          <div style="width: 168px; height: 32px; border-radius: 999px; background: #ecfeff; border: 1px solid #cffafe;"></div>',
    '          <div style="margin-top: 32px; width: 100%; height: 58px; border-radius: 12px; background: linear-gradient(90deg,#0A4F7D,#00AEEF,#10b981); opacity: .88;"></div>',
    '          <div style="margin-top: 14px; width: 82%; height: 58px; border-radius: 12px; background: linear-gradient(90deg,#0A4F7D,#00AEEF,#10b981); opacity: .72;"></div>',
    '          <div style="margin-top: 28px; width: 92%; height: 14px; border-radius: 999px; background: #cbd5e1;"></div>',
    '          <div style="margin-top: 12px; width: 74%; height: 14px; border-radius: 999px; background: #e2e8f0;"></div>',
    '          <div style="margin-top: 34px; display: flex; gap: 12px; flex-wrap: wrap;">',
    '            <span style="display: block; width: 150px; height: 44px; border-radius: 999px; background: #00AEEF; box-shadow: 0 12px 28px rgba(0,174,239,.22);"></span>',
    '            <span style="display: block; width: 138px; height: 44px; border-radius: 999px; background: #ffffff; border: 1px solid #e2e8f0;"></span>',
    '          </div>',
    '        </div>',
    '      </div>',
    '      <div style="flex: 1 1 420px; min-height: 560px; padding: 72px min(8vw, 80px); display: flex; align-items: center; justify-content: center;">',
    '        <div style="width: min(100%, 520px); border-radius: 28px; border: 1px solid #e2e8f0; background: rgba(255,255,255,.9); padding: 12px; box-shadow: 0 22px 55px rgba(15,23,42,.14);">',
    '          <div style="aspect-ratio: 4 / 3; border-radius: 20px; background: #071521; border: 1px solid rgba(255,255,255,.14); box-shadow: inset 0 0 0 1px rgba(255,255,255,.08);"></div>',
    '          <div style="margin-top: 30px; width: 55%; height: 24px; border-radius: 8px; background: #dbeafe;"></div>',
    '          <div style="margin-top: 12px; width: 78%; height: 12px; border-radius: 999px; background: #e2e8f0;"></div>',
    '          <div style="margin-top: 10px; width: 58%; height: 12px; border-radius: 999px; background: #e2e8f0;"></div>',
    '        </div>',
    '      </div>',
    '    </section>',
    '  </main>',
    '</div>'
  ].filter(Boolean).join('\n');
}

function renderStaticRoot(meta) {
  const content = meta.content;
  const title = content?.title || meta.title;
  const description = content?.description || meta.description;
  const canonicalUrl = absolute(meta.canonicalPath || content?.path || '/');
  const datasheetUrl = content?.datasheetUrl ? externalOrAbsolute(content.datasheetUrl) : '';

  return [
    renderPrerenderShell(),
    '<main data-prerender="marketing-seo" style="font-family: Inter, Arial, sans-serif; color: #0f172a; background: #ffffff;">',
    '  <section style="padding: 56px 24px; background: radial-gradient(circle at 90% 8%, rgba(34,211,238,.24), transparent 26%), radial-gradient(circle at 10% 16%, rgba(10,45,77,.10), transparent 30%), #ffffff; color: #0f172a;">',
    '    <div style="max-width: 1040px; margin: 0 auto;">',
    '      <p style="display: inline-flex; margin: 0 0 18px; padding: 8px 16px; border-radius: 999px; border: 1px solid #cffafe; background: #ecfeff; color: #0A4F7D; font-size: 12px; font-weight: 900; letter-spacing: .18em; text-transform: uppercase;">AquaVerify</p>',
    `      <h1 style="margin: 0; max-width: 900px; font-size: 46px; line-height: 1.04; letter-spacing: -.03em; font-weight: 900; background: linear-gradient(90deg,#0A4F7D,#00AEEF,#10b981); -webkit-background-clip: text; background-clip: text; color: transparent;">${escapeHtml(title)}</h1>`,
    `      <p style="margin: 22px 0 0; max-width: 820px; color: #475569; font-size: 18px; line-height: 1.7;">${escapeHtml(description)}</p>`,
    renderHeroVisual(meta, content, title),
    '      <p style="margin: 28px 0 0;">',
    `        <a href="${escapeHtml(canonicalUrl)}" style="display: inline-flex; align-items: center; border-radius: 999px; background: #00AEEF; color: #ffffff; padding: 12px 18px; text-decoration: none; font-weight: 900;">${escapeHtml(title)}</a>`,
    datasheetUrl ? `        <a href="${escapeHtml(datasheetUrl)}" style="display: inline-flex; align-items: center; border-radius: 999px; border: 1px solid #e2e8f0; color: #0A4F7D; padding: 12px 18px; text-decoration: none; font-weight: 900; margin-left: 10px;">${escapeHtml(content?.datasheetLabel || 'Datasheet')}</a>` : '',
    '      </p>',
    '    </div>',
    '  </section>',
    content ? [
      '  <section style="padding: 42px 24px;">',
      '    <div style="max-width: 1040px; margin: 0 auto;">',
      meta.page?.id === 'resources'
        ? renderResourcesHubDetails(meta.page, meta.lang)
        : (meta.page?.id === 'glossary' || typeof meta.page?.glossaryTermId === 'number')
          ? renderGlossaryDetails(meta.page, meta.lang)
        : content.markdownWhitepaper
          ? renderMarkdownWhitepaper(content.markdownWhitepaper)
        : [
          renderFeaturedWhitepapers(meta.page, meta.lang),
          renderIndustriesHubSectors(meta.page, content, meta.lang),
          renderAnswerLayer(meta.page, content),
          renderDistributorsDetails(meta.page, content, meta.lang),
          meta.page?.id === 'distributors' ? '' : renderSectionList(content.sections || []),
          renderVisualBlocks(content),
          renderWhitepaperDeepDive(content.whitepaper)
        ].join('\n'),
      content.markdownWhitepaper ? '' : renderFaqs(content.faqs || []),
      '    </div>',
      '  </section>'
    ].join('\n') : '',
    '</main>'
  ].filter(Boolean).join('\n');
}

function jsonLdScript(id, payload) {
  return `  <script type="application/ld+json" data-id="${id}">\n${JSON.stringify(payload, null, 2)}\n  </script>`;
}

function getHomePath(lang) {
  return lang === 'en' ? '/' : `/${lang}`;
}

function getHomeProductItems(lang) {
  return [
    { name: 'AquaVerify products', path: getMarketingPagePath('products', lang) },
    { name: 'ENUMERA', path: getMarketingPagePath('enumera', lang) },
    { name: 'INDICA', path: getMarketingPagePath('indica', lang) },
    { name: 'ISO/EPA kits', path: getMarketingPagePath('standard-kits', lang) },
    { name: 'Lab Essentials', path: getMarketingPagePath('lab-essentials', lang) },
    { name: 'AquaVerify Cloud', path: getMarketingPagePath('platform', lang) }
  ];
}

function getHomeIndustryItems(lang) {
  return [
    { name: 'Water testing laboratories', path: getMarketingPagePath('water-testing-labs', lang) },
    { name: 'Water quality control', path: getMarketingPagePath('water-quality-control', lang) },
    { name: 'Municipal water testing', path: getMarketingPagePath('municipal-water-testing', lang) },
    { name: 'Food and beverage water quality', path: getMarketingPagePath('food-beverage-water-quality', lang) },
    { name: 'Industrial process water', path: getMarketingPagePath('industrial-process-water', lang) },
    { name: 'Facility water risk', path: getMarketingPagePath('facility-water-risk', lang) },
    { name: 'Agriculture water', path: getMarketingPagePath('agriculture-water', lang) },
    { name: 'Pharmaceutical and cosmetics water', path: getMarketingPagePath('pharma-cosmetics-water', lang) },
    { name: 'Hospitality and tourism water', path: getMarketingPagePath('hospitality-tourism-water', lang) }
  ];
}

function itemListElement(items) {
  return items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    url: absolute(item.path)
  }));
}

function homeFaqEntities(lang) {
  return (HOME_FAQS[lang] || HOME_FAQS.en).map(([question, answer]) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer
    }
  }));
}

function buildHomeStructuredData({ lang, canonicalUrl, title, description }) {
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const webpageId = `${canonicalUrl}#webpage`;
  const resourcesPath = getMarketingPagePath('resources', lang);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: 'AquaVerify',
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo-mark-160.png`,
        description
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: 'AquaVerify',
        url: SITE_URL,
        inLanguage: lang,
        description,
        publisher: { '@id': organizationId },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${absolute(resourcesPath)}?search={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'WebPage',
        '@id': webpageId,
        name: title,
        description,
        url: canonicalUrl,
        inLanguage: lang,
        isPartOf: { '@id': websiteId },
        about: { '@id': organizationId },
        publisher: { '@id': organizationId }
      },
      {
        '@type': 'ItemList',
        '@id': `${canonicalUrl}#products`,
        name: `${title} - products`,
        itemListElement: itemListElement(getHomeProductItems(lang))
      },
      {
        '@type': 'ItemList',
        '@id': `${canonicalUrl}#industries`,
        name: `${title} - industries`,
        itemListElement: itemListElement(getHomeIndustryItems(lang))
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        mainEntity: homeFaqEntities(lang)
      }
    ]
  };
}

function buildBreadcrumbs(page, content, lang) {
  const crumbs = [{ name: 'AquaVerify', path: getHomePath(lang) }];

  if (page.category === 'products' && page.id !== 'products') {
    crumbs.push({ name: PRODUCT_LABELS[lang] || PRODUCT_LABELS.en, path: getMarketingPagePath('products', lang) });
  }

  if (page.parentId) {
    const parent = getMarketingPageSummary(page.parentId, lang);
    if (parent && parent.path !== content.path) {
      crumbs.push({ name: parent.title, path: parent.path });
    }
  }

  crumbs.push({ name: content.title, path: content.path });
  return crumbs.filter((crumb, index, all) => all.findIndex((item) => item.path === crumb.path) === index);
}

function buildStructuredData({ page, content, lang, canonicalUrl, title, description, imageUrl }) {
  if (!page) {
    return jsonLdScript('home-graph', buildHomeStructuredData({ lang, canonicalUrl, title, description }));
  }

  const pageType = page?.schemaType || page?.category;
  const schemaType = pageType === 'Product'
    ? 'Product'
    : pageType === 'TechArticle'
      ? 'TechArticle'
    : pageType === 'DefinedTerm'
      ? 'DefinedTerm'
    : pageType === 'DefinedTermSet'
      ? 'DefinedTermSet'
    : pageType === 'resourcesHub' || pageType === 'products' || pageType === 'industries'
      ? 'CollectionPage'
      : pageType === 'platform'
        ? 'SoftwareApplication'
        : pageType === 'partners'
          ? 'Service'
          : pageType === 'resources'
            ? 'Article'
            : 'WebPage';
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const webpageId = `${canonicalUrl}#webpage`;
  const editorialMeta = page?.id ? getResourceEditorialMeta(page.id) : null;
  const isArticle = ['Article', 'TechArticle'].includes(schemaType);
  const articleSource = editorialMeta?.doi || editorialMeta?.sourceUrl
    ? {
      '@type': 'CreativeWork',
      name: editorialMeta.originalTitle || title,
      ...(editorialMeta.originalAuthors ? { author: editorialMeta.originalAuthors } : {}),
      ...(editorialMeta.journal ? { isPartOf: editorialMeta.journal } : {}),
      ...(editorialMeta.conference ? { isPartOf: editorialMeta.conference } : {}),
      ...(editorialMeta.year ? { datePublished: editorialMeta.year } : {}),
      ...(editorialMeta.doi ? { identifier: `doi:${editorialMeta.doi}` } : {}),
      ...(editorialMeta.sourceUrl ? { url: editorialMeta.sourceUrl } : {})
    }
    : null;
  const payloads = [{
    id: 'marketing-page',
    data: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': organizationId,
          name: 'AquaVerify',
          url: SITE_URL,
          logo: `${SITE_URL}/images/logo-mark-160.png`
        },
        {
          '@type': 'WebSite',
          '@id': websiteId,
          name: 'AquaVerify',
          url: SITE_URL,
          inLanguage: lang,
          publisher: { '@id': organizationId }
        },
        {
          '@type': schemaType,
          '@id': webpageId,
          name: title,
          headline: title,
          description,
          url: canonicalUrl,
          image: imageUrl,
          inLanguage: lang,
          mainEntityOfPage: canonicalUrl,
          isPartOf: { '@id': websiteId },
          publisher: { '@id': organizationId },
          ...(schemaType === 'Product' ? {
            brand: {
              '@type': 'Brand',
              name: 'AquaVerify'
            }
          } : {}),
          ...(schemaType === 'TechArticle' ? {
            keywords: content?.markdownWhitepaper?.relatedTopics?.join(', ') || undefined
          } : {}),
          ...(isArticle ? {
            author: {
              '@type': 'Organization',
              name: editorialMeta?.pageAuthor || 'AquaVerify',
              url: SITE_URL
            },
            ...(editorialMeta?.datePublished ? { datePublished: editorialMeta.datePublished } : {}),
            ...(editorialMeta?.dateModified ? { dateModified: editorialMeta.dateModified } : {}),
            ...(articleSource ? {
              citation: articleSource,
              isBasedOn: {
                '@type': 'CreativeWork',
                name: editorialMeta.originalTitle || title,
                ...(editorialMeta.sourceUrl ? { url: editorialMeta.sourceUrl } : {}),
                ...(editorialMeta.doi ? { identifier: `doi:${editorialMeta.doi}` } : {})
              }
            } : {})
          } : {})
        }
      ]
    }
  }];

  if (page && content) {
    payloads.push({
      id: 'marketing-breadcrumbs',
      data: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: buildBreadcrumbs(page, content, lang).map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: absolute(item.path)
        }))
      }
    });
  }

  if (content?.faqs?.length) {
    payloads.push({
      id: 'marketing-faq',
      data: {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: content.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      }
    });
  }

  if (page?.id === 'resources') {
    const resources = getResourcesHubContent(lang);
    const checklistItems = resources.checklists.map(([id, title]) => ({
      id,
      title,
      url: absolute(getChecklistHref(lang, id))
    }));

    payloads.push({
      id: 'resources-itemlist',
      data: {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: resources.whitepapersTitle,
        url: canonicalUrl,
        itemListElement: [
          ...resources.whitepapers.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.title,
            url: absolute(getMarketingPagePath(item.id, lang))
          })),
          ...checklistItems.map((item, index) => ({
            '@type': 'ListItem',
            position: resources.whitepapers.length + index + 1,
            name: item.title,
            url: item.url
          }))
        ]
      }
    });

    payloads.push({
      id: 'resources-techarticles',
      data: {
        '@context': 'https://schema.org',
        '@graph': resources.whitepapers.map((item) => ({
          '@type': 'TechArticle',
          headline: item.title,
          description: item.body,
          url: absolute(getMarketingPagePath(item.id, lang)),
          inLanguage: lang,
          keywords: item.tags.join(', '),
          publisher: {
            '@type': 'Organization',
            name: 'AquaVerify',
            url: SITE_URL
          }
        }))
      }
    });
  }

  if (page?.id === 'glossary') {
    const glossary = getGlossaryHubContent(lang);
    payloads.push({
      id: 'glossary-defined-term-set',
      data: {
        '@context': 'https://schema.org',
        '@type': 'DefinedTermSet',
        name: glossary.title,
        description: glossary.lead,
        url: canonicalUrl,
        hasDefinedTerm: glossary.terms.map((item) => ({
          '@type': 'DefinedTerm',
          name: item.term,
          description: item.definition,
          url: isPriorityGlossaryTerm(item.id) ? absolute(item.url) : canonicalUrl
        }))
      }
    });
  }

  if (typeof page?.glossaryTermId === 'number') {
    const glossary = getGlossaryHubContent(lang);
    const term = getGlossaryTermById(page.glossaryTermId, lang);
    if (term) {
      payloads.push({
        id: 'glossary-defined-term',
        data: {
          '@context': 'https://schema.org',
          '@type': 'DefinedTerm',
          name: term.term,
          description: term.definition,
          url: canonicalUrl,
          termCode: term.slug,
          inDefinedTermSet: {
            '@type': 'DefinedTermSet',
            name: glossary.title,
            url: absolute(glossary.path)
          }
        }
      });
    }
  }

  return payloads.map((item) => jsonLdScript(item.id, item.data)).join('\n');
}

function seoHeadBlock({ lang, title, description, canonicalPath, alternates, page, content }) {
  const canonicalUrl = absolute(canonicalPath);
  const imageUrl = absoluteAsset(content?.ogImage || content?.heroImage);
  const alternateTags = Object.entries(alternates)
    .filter(([, routePath]) => Boolean(routePath))
    .map(([alternateLang, routePath]) => `  <link rel="alternate" hreflang="${alternateLang}" href="${absolute(routePath)}" />`)
    .join('\n');

  return [
    `  <title>${escapeHtml(title)}</title>`,
    `  <meta name="description" content="${escapeHtml(description)}" />`,
    '  <meta name="robots" content="index, follow, max-image-preview:large" />',
    `  <link rel="canonical" href="${canonicalUrl}" />`,
    alternateTags,
    '  <meta property="og:type" content="website" />',
    '  <meta property="og:site_name" content="AquaVerify" />',
    `  <meta property="og:title" content="${escapeHtml(title)}" />`,
    `  <meta property="og:description" content="${escapeHtml(description)}" />`,
    `  <meta property="og:url" content="${canonicalUrl}" />`,
    `  <meta property="og:image" content="${imageUrl}" />`,
    `  <meta property="og:locale" content="${SEO_LOCALES[lang] || SEO_LOCALES.en}" />`,
    '  <meta name="twitter:card" content="summary_large_image" />',
    `  <meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `  <meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `  <meta name="twitter:image" content="${imageUrl}" />`,
    buildStructuredData({ page, content, lang, canonicalUrl, title, description, imageUrl })
  ].join('\n');
}

function removeDefaultShareMetadata(suffix) {
  const startMarker = '  <!-- AquaVerify default share metadata -->';
  const endMarker = '  <!-- Google Fonts: Montserrat (Headers) & Inter (Body) -->';
  const startIndex = suffix.indexOf(startMarker);
  const endIndex = suffix.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    return suffix;
  }

  return `${suffix.slice(0, startIndex)}${suffix.slice(endIndex)}`;
}

function moveStylesBeforeModuleScripts(html) {
  const headEndIndex = html.indexOf('</head>');
  if (headEndIndex === -1) return html;

  const head = html.slice(0, headEndIndex);
  const rest = html.slice(headEndIndex);
  const stylesheetPattern = /^  <link rel="stylesheet"[^>]*>\n/gm;
  const stylesheets = head.match(stylesheetPattern) || [];
  if (!stylesheets.length) return html;

  const headWithoutStyles = head.replace(stylesheetPattern, '');
  const scriptIndex = headWithoutStyles.search(/^  <script type="module"/m);
  if (scriptIndex === -1) return html;

  const updatedHead = [
    headWithoutStyles.slice(0, scriptIndex),
    stylesheets.join(''),
    headWithoutStyles.slice(scriptIndex)
  ].join('');

  return `${updatedHead}${rest}`;
}

function renderHtml(template, meta) {
  const identityMarker = '  <!-- AquaVerify platform identity -->';
  const rootMarker = '  <div id="root"></div>';
  const titleIndex = template.indexOf('  <title>');
  const markerIndex = template.indexOf(identityMarker);

  if (titleIndex === -1 || markerIndex === -1) {
    throw new Error('Unable to find SEO head markers in dist/index.html');
  }

  const html = template
    .replace(/<html lang="[^"]+"/, `<html lang="${meta.lang}"`)
    .slice(0, titleIndex)
    .concat(seoHeadBlock(meta), '\n', removeDefaultShareMetadata(template.slice(markerIndex)));

  if (!html.includes(rootMarker)) {
    throw new Error('Unable to find root marker in dist/index.html');
  }

  return moveStylesBeforeModuleScripts(
    html.replace(rootMarker, `  <div id="root">\n${renderStaticRoot(meta)}\n  </div>`)
  );
}

async function writeRouteHtml(routePath, html) {
  const normalized = routePath === '/' ? '' : routePath.replace(/^\/+|\/+$/g, '');
  const filePath = normalized
    ? path.join(DIST_DIR, normalized, 'index.html')
    : path.join(DIST_DIR, 'index.html');

  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, html);
}

async function fetchMarketingOverrides() {
  if (!supabaseUrl || !supabaseKey) {
    console.warn('Skipping marketing CMS overrides: missing Supabase env.');
    return new Map();
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: pages, error: pagesError } = await supabase
    .from('pages')
    .select('id,slug')
    .like('slug', 'marketing-%');

  if (pagesError || !pages?.length) {
    if (pagesError) console.warn(`Skipping marketing CMS overrides: ${pagesError.message}`);
    return new Map();
  }

  const pageIds = pages.map((page) => page.id);
  const { data: blocks, error: blocksError } = await supabase
    .from('content_blocks')
    .select('page_id,content')
    .eq('section_id', MARKETING_OVERRIDE_SECTION_ID)
    .in('page_id', pageIds);

  if (blocksError || !blocks?.length) {
    if (blocksError) console.warn(`Skipping marketing CMS overrides: ${blocksError.message}`);
    return new Map();
  }

  const slugByPageId = new Map(pages.map((page) => [page.id, page.slug]));
  return blocks.reduce((acc, block) => {
    const slug = slugByPageId.get(block.page_id);
    const content = normalizeMarketingOverride(block.content);
    if (slug && content) acc.set(slug, content);
    return acc;
  }, new Map());
}

const template = await fs.readFile(path.join(DIST_DIR, 'index.html'), 'utf8');
const marketingOverrides = await fetchMarketingOverrides();
let written = 0;

await writeRouteHtml('/', renderHtml(template, {
  lang: 'en',
  title: HOME_META.en.title,
  description: HOME_META.en.description,
  canonicalPath: '/',
  alternates: HOME_ALTERNATES
}));
written += 1;

for (const lang of MARKETING_LANGUAGES) {
  const meta = HOME_META[lang];
  await writeRouteHtml(meta.path, renderHtml(template, {
    lang,
    title: meta.title,
    description: meta.description,
    canonicalPath: meta.path,
    alternates: HOME_ALTERNATES
  }));
  written += 1;
}

for (const page of MARKETING_PAGES) {
  const alternates = {
    'x-default': page.translations.en.path,
    ...getMarketingAlternates(page)
  };

  for (const lang of MARKETING_LANGUAGES) {
    const content = withBaseAnswerLayer(
      page,
      lang,
      mergeMarketingContent(
        page.translations[lang],
        marketingOverrides.get(getMarketingOverrideSlug(page.id, lang))
      )
    );
    if (!content?.path) continue;
    const resourcesSeo = page.id === 'resources' ? getResourcesHubSeo(lang) : null;
    const renderContent = resourcesSeo
      ? {
        ...content,
        title: resourcesSeo.title,
        description: resourcesSeo.description,
        seoTitle: resourcesSeo.seoTitle,
        seoDescription: resourcesSeo.seoDescription,
        faqs: resourcesSeo.faqs,
        path: page.translations[lang]?.path || content.path
      }
      : content;

    await writeRouteHtml(renderContent.path, renderHtml(template, {
      lang,
      title: renderContent.seoTitle || renderContent.title,
      description: renderContent.seoDescription || renderContent.description,
      canonicalPath: renderContent.path,
      alternates,
      page,
      content: renderContent
    }));
    written += 1;
  }
}

console.log(`Prerendered ${written} SEO HTML routes.`);
