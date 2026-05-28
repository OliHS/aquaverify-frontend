import type { Language } from './translations';
import { getMarketingPagePath } from './marketingRoutes.js';

export type HomeFaq = {
  question: string;
  answer: string;
};

export const HOME_FAQS: Record<Language, HomeFaq[]> = {
  en: [
    {
      question: 'Does AquaVerify sell kits, software or both?',
      answer: 'AquaVerify offers water microbiology products and AquaVerify Cloud. Teams can start with product workflows and connect sample, batch, reading, review and report data when they need digital traceability.'
    },
    {
      question: 'What does develop, manufacture and distribute mean?',
      answer: 'It means AquaVerify works across product design, technical supply, channel support and digital workflow. Customers can access products, platform and partner routes from the same ecosystem.'
    },
    {
      question: 'Can I buy AquaVerify products through a distributor?',
      answer: 'Yes. AquaVerify supports authorized distributors so laboratories, utilities and industrial teams can work with local stock, training and commercial support where available.'
    },
    {
      question: 'Which product family should I choose for enumeration?',
      answer: 'ENUMERA is the recommended route when the workflow needs quantitative microbiological enumeration and a documented result that can move into reporting.'
    },
    {
      question: 'Which product family is better for presence or absence decisions?',
      answer: 'INDICA is designed for presence/absence screening, routine verification and fast operational decisions before a team needs deeper enumeration or confirmatory workflows.'
    },
    {
      question: 'Can results be connected to AquaVerify Cloud?',
      answer: 'Yes. AquaVerify Cloud can connect samples, products, operators, readings, reviews, technical reports, CRM context and customer portal delivery in one workflow.'
    },
    {
      question: 'Can AquaVerify support OEM or private-label programs?',
      answer: 'Yes. AquaVerify can support distributors and scientific partners with OEM, co-branding or private-label routes, depending on product scope, territory and technical requirements.'
    }
  ],
  es: [
    {
      question: '¿AquaVerify vende kits, software o ambos?',
      answer: 'AquaVerify ofrece productos de microbiología del agua y AquaVerify Cloud. Un equipo puede empezar con flujos de producto y conectar muestra, lote, lectura, revisión e informe cuando necesita trazabilidad digital.'
    },
    {
      question: '¿Qué significa que AquaVerify desarrolla, fabrica y distribuye?',
      answer: 'Significa que AquaVerify trabaja sobre diseño de producto, suministro técnico, soporte de canal y flujo digital. El cliente puede acceder a productos, plataforma y rutas partner desde un mismo ecosistema.'
    },
    {
      question: '¿Puedo comprar productos AquaVerify a través de un distribuidor?',
      answer: 'Sí. AquaVerify trabaja con distribuidores autorizados para que laboratorios, utilities e industrias puedan acceder a stock local, formación y soporte comercial cuando esté disponible.'
    },
    {
      question: '¿Qué familia necesito si busco enumeración?',
      answer: 'ENUMERA es la ruta recomendada cuando el flujo necesita enumeración microbiológica cuantitativa y un resultado documentado que pueda pasar a reporting.'
    },
    {
      question: '¿Qué familia encaja mejor para presencia o ausencia?',
      answer: 'INDICA está diseñada para cribado presencia/ausencia, verificaciones rutinarias y decisiones operativas rápidas antes de necesitar enumeración o flujos confirmatorios.'
    },
    {
      question: '¿Los resultados pueden conectarse con AquaVerify Cloud?',
      answer: 'Sí. AquaVerify Cloud puede conectar muestras, productos, operadores, lecturas, revisión, informes técnicos, contexto CRM y entrega en portal cliente.'
    },
    {
      question: '¿AquaVerify puede ayudar con programas OEM o marca blanca?',
      answer: 'Sí. AquaVerify puede apoyar a distribuidores y partners científicos con programas OEM, co-branding o marca blanca según alcance de producto, territorio y requisitos técnicos.'
    }
  ],
  fr: [
    {
      question: 'AquaVerify vend-il des kits, du logiciel ou les deux ?',
      answer: 'AquaVerify propose des produits de microbiologie de l’eau et AquaVerify Cloud. Les équipes peuvent commencer par les produits puis connecter échantillon, lot, lecture, revue et rapport quand la traçabilité numérique devient nécessaire.'
    },
    {
      question: 'Que signifie développer, fabriquer et distribuer ?',
      answer: 'Cela signifie qu’AquaVerify travaille sur le design produit, la fourniture technique, le support canal et le flux numérique. Le client peut accéder aux produits, à la plateforme et aux parcours partenaires dans un même écosystème.'
    },
    {
      question: 'Puis-je acheter les produits AquaVerify via un distributeur ?',
      answer: 'Oui. AquaVerify s’appuie sur des distributeurs autorisés afin que laboratoires, utilities et industriels puissent accéder à stock local, formation et support commercial lorsque disponible.'
    },
    {
      question: 'Quelle famille choisir pour le dénombrement ?',
      answer: 'ENUMERA est la voie recommandée lorsqu’un flux nécessite un dénombrement microbiologique quantitatif et un résultat documenté exploitable en reporting.'
    },
    {
      question: 'Quelle famille convient aux décisions présence/absence ?',
      answer: 'INDICA est conçue pour le screening présence/absence, les vérifications de routine et les décisions opérationnelles rapides avant un éventuel dénombrement.'
    },
    {
      question: 'Les résultats peuvent-ils être connectés à AquaVerify Cloud ?',
      answer: 'Oui. AquaVerify Cloud peut relier échantillons, produits, opérateurs, lectures, revue, rapports techniques, contexte CRM et livraison via portail client.'
    },
    {
      question: 'AquaVerify peut-il accompagner un programme OEM ou marque blanche ?',
      answer: 'Oui. AquaVerify peut accompagner distributeurs et partenaires scientifiques avec des parcours OEM, co-branding ou marque blanche selon le périmètre produit, le territoire et les exigences techniques.'
    }
  ],
  it: [
    {
      question: 'AquaVerify vende kit, software o entrambi?',
      answer: 'AquaVerify offre prodotti di microbiologia dell’acqua e AquaVerify Cloud. I team possono partire dai prodotti e collegare campione, lotto, lettura, revisione e report quando serve tracciabilità digitale.'
    },
    {
      question: 'Che cosa significa sviluppare, produrre e distribuire?',
      answer: 'Significa che AquaVerify lavora su design del prodotto, fornitura tecnica, supporto di canale e workflow digitale. Il cliente può accedere a prodotti, piattaforma e percorsi partner nello stesso ecosistema.'
    },
    {
      question: 'Posso acquistare prodotti AquaVerify tramite un distributore?',
      answer: 'Sì. AquaVerify supporta distributori autorizzati affinché laboratori, utility e industrie possano accedere a stock locale, formazione e supporto commerciale dove disponibili.'
    },
    {
      question: 'Quale famiglia scegliere per l’enumerazione?',
      answer: 'ENUMERA è il percorso consigliato quando il workflow richiede enumerazione microbiologica quantitativa e un risultato documentato da portare nel reporting.'
    },
    {
      question: 'Quale famiglia è adatta a decisioni presenza/assenza?',
      answer: 'INDICA è pensata per screening presenza/assenza, verifiche di routine e decisioni operative rapide prima di eventuali flussi di enumerazione.'
    },
    {
      question: 'I risultati possono collegarsi ad AquaVerify Cloud?',
      answer: 'Sì. AquaVerify Cloud può collegare campioni, prodotti, operatori, letture, revisione, report tecnici, contesto CRM e consegna tramite portale cliente.'
    },
    {
      question: 'AquaVerify può supportare programmi OEM o private label?',
      answer: 'Sì. AquaVerify può supportare distributori e partner scientifici con percorsi OEM, co-branding o private label in base ad ambito prodotto, territorio e requisiti tecnici.'
    }
  ],
  ca: [
    {
      question: 'AquaVerify ven kits, software o totes dues coses?',
      answer: 'AquaVerify ofereix productes de microbiologia de l’aigua i AquaVerify Cloud. Els equips poden començar amb productes i connectar mostra, lot, lectura, revisió i informe quan necessiten traçabilitat digital.'
    },
    {
      question: 'Què significa que AquaVerify desenvolupa, fabrica i distribueix?',
      answer: 'Significa que AquaVerify treballa sobre disseny de producte, subministrament tècnic, suport de canal i flux digital. El client pot accedir a productes, plataforma i rutes partner des del mateix ecosistema.'
    },
    {
      question: 'Puc comprar productes AquaVerify a través d’un distribuïdor?',
      answer: 'Sí. AquaVerify treballa amb distribuïdors autoritzats perquè laboratoris, utilities i indústries puguin accedir a estoc local, formació i suport comercial quan estigui disponible.'
    },
    {
      question: 'Quina família necessito si busco enumeració?',
      answer: 'ENUMERA és la ruta recomanada quan el flux necessita enumeració microbiològica quantitativa i un resultat documentat que pugui passar a reporting.'
    },
    {
      question: 'Quina família encaixa millor per presència o absència?',
      answer: 'INDICA està dissenyada per a cribratge presència/absència, verificacions rutinàries i decisions operatives ràpides abans de necessitar enumeració.'
    },
    {
      question: 'Els resultats poden connectar-se amb AquaVerify Cloud?',
      answer: 'Sí. AquaVerify Cloud pot connectar mostres, productes, operadors, lectures, revisió, informes tècnics, context CRM i lliurament al portal client.'
    },
    {
      question: 'AquaVerify pot ajudar amb programes OEM o marca blanca?',
      answer: 'Sí. AquaVerify pot donar suport a distribuïdors i partners científics amb programes OEM, co-branding o marca blanca segons abast de producte, territori i requisits tècnics.'
    }
  ]
};

export function getHomeProductItems(lang: Language) {
  return [
    { name: 'AquaVerify products', path: getMarketingPagePath('products', lang) },
    { name: 'ENUMERA', path: getMarketingPagePath('enumera', lang) },
    { name: 'INDICA', path: getMarketingPagePath('indica', lang) },
    { name: 'ISO/EPA kits', path: getMarketingPagePath('standard-kits', lang) },
    { name: 'Lab Essentials', path: getMarketingPagePath('lab-essentials', lang) },
    { name: 'AquaVerify Cloud', path: getMarketingPagePath('platform', lang) }
  ];
}

export function getHomeIndustryItems(lang: Language) {
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
