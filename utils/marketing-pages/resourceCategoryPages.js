import { getChecklistHref, getResourcesHubContent } from '../resourcesHubContent.js';
import { getMarketingPagePath } from '../marketingRoutes.js';
import { RESOURCE_CATEGORY_PATHS } from '../resourceCategoryPaths.js';
import { getResourceUiLabels } from '../resourceUiLabels.js';
import { MARKETING_LANGUAGES, locale, page, section } from './shared.js';

const CATEGORY_RESOURCE_IDS = {
  'resources-regulation-compliance': [
    'eu-drinking-water-directive-coliphages',
    'us-drinking-water-compliance-coliform-rule',
    'rd-3-2023-somatic-coliphages-guide',
    'iso-17025-water-laboratories-guide',
    'editorial-methodology'
  ],
  'resources-coliphages-viral-indicators': [
    'coliphages-indicators',
    'eu-drinking-water-directive-coliphages',
    'rd-3-2023-somatic-coliphages-guide',
    'somatic-coliphage-method-comparison-water',
    'sars-cov-2-surrogates-decay-aquatic-environments'
  ],
  'resources-laboratory-sampling-methods': [
    'aquaverify-product-selection-guide',
    'iso-17025-water-laboratories-guide',
    'iso-19458-water-microbiological-sampling',
    'aquacoli-enumera-coli100-validation',
    'rd-3-2023-somatic-coliphages-guide'
  ],
  'resources-lims-digital-traceability': [
    'water-compliance-software-guide',
    'excel-to-lims-water-analysis',
    'iso-17025-water-laboratories-guide',
    'aquaverify-product-selection-guide'
  ],
  'resources-applications-industries': [
    'water-safety-plans-traceable-control',
    'food-beverage-water-microbiology-guide',
    'legionella-facility-water-risk-guide',
    'oem-white-label-water-testing-kits'
  ],
  'resources-scientific-research': [
    'aquacoli-enumera-coli100-validation',
    'urban-wastewater-wbe-multiviral-valencian-region',
    'viral-pollution-wastewater-mediterranean-ecosystems',
    'sars-cov-2-surrogates-decay-aquatic-environments',
    'somatic-coliphage-method-comparison-water',
    'enteric-viruses-antibiotic-resistance-genes-mussels',
    'editorial-methodology'
  ],
  'resources-guides-checklists': [
    'aquaverify-product-selection-guide',
    'rd-3-2023-somatic-coliphages-guide',
    'iso-17025-water-laboratories-guide',
    'water-safety-plans-traceable-control',
    'food-beverage-water-microbiology-guide',
    'legionella-facility-water-risk-guide',
    'iso-19458-water-microbiological-sampling',
    'excel-to-lims-water-analysis',
    'oem-white-label-water-testing-kits'
  ]
};

const CATEGORY_CHECKLIST_IDS = {
  'resources-regulation-compliance': ['directive', 'rd_3_2023_coliphages', 'iso_17025_labs'],
  'resources-coliphages-viral-indicators': ['coliphages', 'directive', 'rd_3_2023_coliphages'],
  'resources-laboratory-sampling-methods': ['product_selection', 'iso_19458_sampling', 'iso_17025_labs'],
  'resources-lims-digital-traceability': ['lims', 'excel_to_lims', 'iso_17025_labs'],
  'resources-applications-industries': ['water_safety_plans', 'food_beverage_water', 'legionella_facilities', 'partner'],
  'resources-scientific-research': [],
  'resources-guides-checklists': [
    'coliphages',
    'directive',
    'lims',
    'partner',
    'product_selection',
    'rd_3_2023_coliphages',
    'iso_17025_labs',
    'water_safety_plans',
    'food_beverage_water',
    'legionella_facilities',
    'iso_19458_sampling',
    'excel_to_lims',
    'oem_white_label'
  ]
};

const LANGUAGE_COPY = {
  en: {
    directAnswer: 'Direct answer',
    workflowTitle: 'How to use this collection',
    selectedTitle: 'Selected resources',
    checklistTitle: 'Downloadable checklists',
    questionsTitle: 'Questions this category answers',
    primaryCta: 'Request technical recommendation',
    secondaryCta: 'Back to resources',
    resourceKind: 'Resource',
    checklistKind: 'Checklist'
  },
  es: {
    directAnswer: 'Respuesta directa',
    workflowTitle: 'Cómo usar esta colección',
    selectedTitle: 'Recursos seleccionados',
    checklistTitle: 'Checklists descargables',
    questionsTitle: 'Preguntas que responde esta categoría',
    primaryCta: 'Solicitar recomendación técnica',
    secondaryCta: 'Volver a recursos',
    resourceKind: 'Recurso',
    checklistKind: 'Checklist'
  },
  fr: {
    directAnswer: 'Réponse directe',
    workflowTitle: 'Comment utiliser cette collection',
    selectedTitle: 'Ressources sélectionnées',
    checklistTitle: 'Checklists téléchargeables',
    questionsTitle: 'Questions traitées par cette catégorie',
    primaryCta: 'Demander une recommandation technique',
    secondaryCta: 'Retour aux ressources',
    resourceKind: 'Ressource',
    checklistKind: 'Checklist'
  },
  it: {
    directAnswer: 'Risposta diretta',
    workflowTitle: 'Come usare questa raccolta',
    selectedTitle: 'Risorse selezionate',
    checklistTitle: 'Checklist scaricabili',
    questionsTitle: 'Domande coperte da questa categoria',
    primaryCta: 'Richiedi raccomandazione tecnica',
    secondaryCta: 'Torna alle risorse',
    resourceKind: 'Risorsa',
    checklistKind: 'Checklist'
  },
  ca: {
    directAnswer: 'Resposta directa',
    workflowTitle: 'Com utilitzar aquesta col·lecció',
    selectedTitle: 'Recursos seleccionats',
    checklistTitle: 'Checklists descarregables',
    questionsTitle: 'Preguntes que respon aquesta categoria',
    primaryCta: 'Sol·licitar recomanació tècnica',
    secondaryCta: 'Tornar a recursos',
    resourceKind: 'Recurs',
    checklistKind: 'Checklist'
  }
};

const CATEGORY_COPY = {
  'resources-regulation-compliance': {
    en: {
      title: 'Regulation and compliance resources for water microbiology',
      description: 'A curated route through AquaVerify resources for EU, US, ISO/IEC 17025 and audit-oriented water quality decisions.',
      answer: 'Use this collection when the decision depends on regulatory context, competent-authority expectations, audit evidence or a documented quality-system workflow.',
      bullets: ['Separate legal requirement, internal surveillance and technical verification.', 'Connect sample, method, reviewer and report evidence before an audit.', 'Use source-linked summaries when an external article or rule is involved.'],
      workflow: ['Start with the applicable jurisdiction and matrix.', 'Select the technical guide that matches the monitoring objective.', 'Keep the checklist output with the final method and review record.'],
      questions: ['Which resource supports EU drinking-water conversations?', 'What evidence should a laboratory keep for audit review?', 'Where should external research be cited instead of re-hosted?'],
      faqs: [
        ['Do these pages replace legal or accreditation advice?', 'No. They organize technical orientation and source context; the competent authority, laboratory scope and quality system remain decisive.'],
        ['Why are some external papers linked instead of downloaded?', 'AquaVerify links DOI or official sources when public PDF distribution rights are not documented.']
      ]
    },
    es: {
      title: 'Recursos de regulación y cumplimiento para microbiología del agua',
      description: 'Ruta curada por recursos AquaVerify para decisiones de calidad del agua en UE, EEUU, ISO/IEC 17025 y auditorías.',
      answer: 'Usa esta colección cuando la decisión dependa de contexto normativo, expectativas de autoridad competente, evidencia de auditoría o un flujo documentado de calidad.',
      bullets: ['Separa requisito legal, vigilancia interna y verificación técnica.', 'Conecta muestra, método, revisión e informe antes de una auditoría.', 'Usa resúmenes con fuente enlazada cuando intervenga un paper externo o una norma.'],
      workflow: ['Empieza por jurisdicción y matriz aplicables.', 'Elige la guía técnica que encaja con el objetivo de monitorización.', 'Conserva el checklist con método final y registro de revisión.'],
      questions: ['¿Qué recurso ayuda en conversaciones de agua potable UE?', '¿Qué evidencia debe conservar un laboratorio para auditoría?', '¿Cuándo conviene enlazar una fuente externa en vez de alojarla?'],
      faqs: [
        ['¿Estas páginas sustituyen asesoramiento legal o de acreditación?', 'No. Organizan orientación técnica y contexto de fuentes; autoridad competente, alcance del laboratorio y sistema de calidad siguen siendo decisivos.'],
        ['¿Por qué algunos papers externos se enlazan y no se descargan?', 'AquaVerify enlaza DOI o fuentes oficiales cuando no hay derechos documentados para distribuir el PDF públicamente.']
      ]
    },
    fr: {
      title: 'Ressources réglementation et conformité pour microbiologie de l’eau',
      description: 'Parcours AquaVerify pour décisions qualité eau liées à l’UE, aux États-Unis, à l’ISO/IEC 17025 et aux audits.',
      answer: 'Utilisez cette collection lorsque la décision dépend du contexte réglementaire, de l’autorité compétente, de la preuve audit ou d’un flux qualité documenté.',
      bullets: ['Distinguer exigence légale, surveillance interne et vérification technique.', 'Relier échantillon, méthode, revue et rapport avant l’audit.', 'Utiliser des résumés sourcés lorsqu’un article externe ou une règle intervient.'],
      workflow: ['Commencer par la juridiction et la matrice applicables.', 'Choisir le guide technique aligné avec l’objectif de surveillance.', 'Conserver la checklist avec méthode finale et enregistrement de revue.'],
      questions: ['Quelle ressource soutient les échanges eau potable UE?', 'Quelle preuve garder pour une revue audit?', 'Quand lier une source externe au lieu de l’héberger?'],
      faqs: [
        ['Ces pages remplacent-elles un avis juridique ou accréditation?', 'Non. Elles organisent l’orientation technique et les sources; l’autorité compétente, le périmètre laboratoire et le système qualité restent décisifs.'],
        ['Pourquoi certains articles externes sont-ils seulement liés?', 'AquaVerify lie DOI ou sources officielles lorsque les droits de distribution PDF publique ne sont pas documentés.']
      ]
    },
    it: {
      title: 'Risorse su normativa e conformità per microbiologia dell’acqua',
      description: 'Percorso AquaVerify per decisioni qualità acqua legate a UE, Stati Uniti, ISO/IEC 17025 e audit.',
      answer: 'Usa questa raccolta quando la decisione dipende da contesto normativo, autorità competente, evidenza audit o workflow qualità documentato.',
      bullets: ['Separare requisito legale, sorveglianza interna e verifica tecnica.', 'Collegare campione, metodo, revisione e report prima dell’audit.', 'Usare sintesi con fonte quando sono coinvolti articoli esterni o regole.'],
      workflow: ['Partire da giurisdizione e matrice applicabili.', 'Scegliere la guida tecnica coerente con l’obiettivo di monitoraggio.', 'Conservare la checklist con metodo finale e record di revisione.'],
      questions: ['Quale risorsa supporta discussioni UE sull’acqua potabile?', 'Quale evidenza tenere per audit?', 'Quando collegare una fonte esterna invece di ospitarla?'],
      faqs: [
        ['Queste pagine sostituiscono consulenza legale o accreditamento?', 'No. Organizzano orientamento tecnico e fonti; autorità competente, ambito laboratorio e sistema qualità restano decisivi.'],
        ['Perché alcuni articoli esterni sono solo collegati?', 'AquaVerify collega DOI o fonti ufficiali quando i diritti di distribuzione PDF pubblica non sono documentati.']
      ]
    },
    ca: {
      title: 'Recursos de regulació i compliment per a microbiologia de l’aigua',
      description: 'Ruta AquaVerify per a decisions de qualitat de l’aigua vinculades a UE, EUA, ISO/IEC 17025 i auditories.',
      answer: 'Fes servir aquesta col·lecció quan la decisió depengui de context normatiu, autoritat competent, evidència d’auditoria o flux de qualitat documentat.',
      bullets: ['Separa requisit legal, vigilància interna i verificació tècnica.', 'Connecta mostra, mètode, revisió i informe abans d’una auditoria.', 'Utilitza resums amb font quan hi intervingui un article extern o una norma.'],
      workflow: ['Comença per jurisdicció i matriu aplicables.', 'Tria la guia tècnica alineada amb l’objectiu de monitoratge.', 'Conserva el checklist amb mètode final i registre de revisió.'],
      questions: ['Quin recurs ajuda en converses UE d’aigua potable?', 'Quina evidència ha de conservar un laboratori per auditoria?', 'Quan cal enllaçar una font externa en lloc d’allotjar-la?'],
      faqs: [
        ['Aquestes pàgines substitueixen assessorament legal o d’acreditació?', 'No. Organitzen orientació tècnica i fonts; autoritat competent, abast del laboratori i sistema de qualitat continuen sent decisius.'],
        ['Per què alguns articles externs només s’enllacen?', 'AquaVerify enllaça DOI o fonts oficials quan no hi ha drets documentats per distribuir el PDF públicament.']
      ]
    }
  },
  'resources-coliphages-viral-indicators': {
    en: {
      title: 'Coliphages and viral indicator resources',
      description: 'Guides, research summaries and checklists for somatic coliphages, viral indicators, water treatment evidence and monitoring design.',
      answer: 'Use this collection to understand when coliphages add a viral-indicator layer beyond bacterial indicators and how to document the workflow.',
      bullets: ['Compare bacterial indicators with somatic or F-specific coliphages.', 'Connect matrix, host strain, controls, incubation and PFU reporting.', 'Keep source context separate from AquaVerify product orientation.'],
      workflow: ['Define the monitoring question first.', 'Select the coliphage route and evidence needs.', 'Use checklists to prepare sampling, method and report fields.'],
      questions: ['When are somatic coliphages useful?', 'How should PFU evidence be documented?', 'Which scientific summaries discuss viral persistence?'],
      faqs: [
        ['Do coliphages replace E. coli monitoring?', 'No. They add viral-indicator context; bacterial indicators remain important in their own methods and regulations.'],
        ['Can AquaVerify help choose a coliphage workflow?', 'Yes. AquaVerify can map objective, matrix, method, products and traceability needs before a recommendation.']
      ]
    },
    es: {
      title: 'Recursos sobre colífagos e indicadores virales',
      description: 'Guías, resúmenes científicos y checklists para colífagos somáticos, indicadores virales, evidencia de tratamiento y diseño de monitorización.',
      answer: 'Usa esta colección para entender cuándo los colífagos añaden una capa de indicador viral más allá de indicadores bacterianos y cómo documentar el flujo.',
      bullets: ['Compara indicadores bacterianos con colífagos somáticos o F-específicos.', 'Conecta matriz, cepa huésped, controles, incubación y reporting UFP.', 'Separa contexto de fuente y orientación de producto AquaVerify.'],
      workflow: ['Define primero la pregunta de monitorización.', 'Selecciona ruta de colífagos y evidencia necesaria.', 'Usa checklists para preparar muestreo, método e informe.'],
      questions: ['¿Cuándo son útiles los colífagos somáticos?', '¿Cómo documentar evidencia UFP?', '¿Qué resúmenes científicos tratan persistencia viral?'],
      faqs: [
        ['¿Los colífagos sustituyen a E. coli?', 'No. Añaden contexto de indicador viral; los indicadores bacterianos siguen siendo importantes en sus métodos y normas.'],
        ['¿AquaVerify puede ayudar a elegir un flujo de colífagos?', 'Sí. Puede mapear objetivo, matriz, método, productos y trazabilidad antes de recomendar.']
      ]
    },
    fr: {
      title: 'Ressources coliphages et indicateurs viraux',
      description: 'Guides, résumés scientifiques et checklists pour coliphages somatiques, indicateurs viraux, preuve traitement et design de surveillance.',
      answer: 'Utilisez cette collection pour comprendre quand les coliphages ajoutent une couche indicateur viral et comment documenter le flux.',
      bullets: ['Comparer indicateurs bactériens et coliphages somatiques ou F-spécifiques.', 'Relier matrice, souche hôte, contrôles, incubation et reporting UFP.', 'Séparer contexte source et orientation produit AquaVerify.'],
      workflow: ['Définir d’abord la question de surveillance.', 'Choisir la route coliphages et la preuve attendue.', 'Utiliser les checklists pour préparer prélèvement, méthode et rapport.'],
      questions: ['Quand les coliphages somatiques sont-ils utiles?', 'Comment documenter la preuve UFP?', 'Quels résumés traitent la persistance virale?'],
      faqs: [
        ['Les coliphages remplacent-ils E. coli?', 'Non. Ils ajoutent un contexte indicateur viral; les indicateurs bactériens restent importants dans leurs méthodes et règles.'],
        ['AquaVerify peut-il aider à choisir un flux coliphages?', 'Oui. AquaVerify peut cartographier objectif, matrice, méthode, produits et traçabilité avant recommandation.']
      ]
    },
    it: {
      title: 'Risorse su colifagi e indicatori virali',
      description: 'Guide, sintesi scientifiche e checklist per colifagi somatici, indicatori virali, evidenza di trattamento e disegno del monitoraggio.',
      answer: 'Usa questa raccolta per capire quando i colifagi aggiungono un livello di indicatore virale e come documentare il workflow.',
      bullets: ['Confrontare indicatori batterici e colifagi somatici o F-specifici.', 'Collegare matrice, ceppo ospite, controlli, incubazione e report PFU.', 'Separare contesto fonte e orientamento prodotto AquaVerify.'],
      workflow: ['Definire prima la domanda di monitoraggio.', 'Scegliere la rotta colifagi e l’evidenza richiesta.', 'Usare checklist per preparare campionamento, metodo e report.'],
      questions: ['Quando sono utili i colifagi somatici?', 'Come documentare evidenza PFU?', 'Quali sintesi parlano di persistenza virale?'],
      faqs: [
        ['I colifagi sostituiscono E. coli?', 'No. Aggiungono contesto di indicatore virale; gli indicatori batterici restano importanti nei loro metodi e regole.'],
        ['AquaVerify può aiutare a scegliere un workflow colifagi?', 'Sì. Può mappare obiettivo, matrice, metodo, prodotti e tracciabilità prima della raccomandazione.']
      ]
    },
    ca: {
      title: 'Recursos sobre colífags i indicadors virals',
      description: 'Guies, resums científics i checklists per a colífags somàtics, indicadors virals, evidència de tractament i disseny de monitoratge.',
      answer: 'Fes servir aquesta col·lecció per entendre quan els colífags afegeixen una capa d’indicador viral i com documentar el flux.',
      bullets: ['Compara indicadors bacterians amb colífags somàtics o F-específics.', 'Connecta matriu, soca hoste, controls, incubació i reporting UFP.', 'Separa context de font i orientació de producte AquaVerify.'],
      workflow: ['Defineix primer la pregunta de monitoratge.', 'Selecciona ruta de colífags i evidència necessària.', 'Usa checklists per preparar mostreig, mètode i informe.'],
      questions: ['Quan són útils els colífags somàtics?', 'Com documentar evidència UFP?', 'Quins resums tracten persistència viral?'],
      faqs: [
        ['Els colífags substitueixen E. coli?', 'No. Afegeixen context d’indicador viral; els indicadors bacterians continuen sent importants en els seus mètodes i normes.'],
        ['AquaVerify pot ajudar a triar un flux de colífags?', 'Sí. Pot mapar objectiu, matriu, mètode, productes i traçabilitat abans de recomanar.']
      ]
    }
  },
  'resources-laboratory-sampling-methods': {
    en: {
      title: 'Laboratory, sampling and method resources',
      description: 'Practical resources for sampling design, ISO/IEC 17025 evidence, method selection and water microbiology laboratory workflows.',
      answer: 'Use this collection when the work starts at sample design, method readiness, chain of custody or laboratory evidence before the report.',
      bullets: ['Prepare sample point, matrix, volume and holding-time evidence.', 'Connect method selection with controls, batches and reviewer history.', 'Use ISO/IEC 17025 and ISO 19458 guides to frame traceability.'],
      workflow: ['Define sample acceptance criteria.', 'Select the method or product route.', 'Document review before customer or portal release.'],
      questions: ['How should sampling context be captured?', 'What does ISO/IEC 17025 change in the record?', 'Which checklist prepares method selection?'],
      faqs: [
        ['Is a checklist enough for accreditation?', 'No. It supports preparation; accreditation scope, validation and laboratory procedures remain decisive.'],
        ['Can product selection start before the method is final?', 'Yes, but it should remain tied to matrix, method, controls and reporting needs.']
      ]
    },
    es: {
      title: 'Recursos de laboratorio, muestreo y métodos',
      description: 'Recursos prácticos para diseño de muestreo, evidencia ISO/IEC 17025, selección de método y flujos de laboratorio de microbiología del agua.',
      answer: 'Usa esta colección cuando el trabajo empieza en diseño de muestra, preparación de método, cadena de custodia o evidencia de laboratorio antes del informe.',
      bullets: ['Prepara punto de muestreo, matriz, volumen y conservación.', 'Conecta selección de método con controles, lotes e historial de revisión.', 'Usa ISO/IEC 17025 e ISO 19458 para enmarcar trazabilidad.'],
      workflow: ['Define criterios de aceptación de muestra.', 'Selecciona ruta de método o producto.', 'Documenta revisión antes de liberar al cliente o portal.'],
      questions: ['¿Cómo capturar contexto de muestreo?', '¿Qué cambia ISO/IEC 17025 en el registro?', '¿Qué checklist prepara selección de método?'],
      faqs: [
        ['¿Un checklist basta para acreditación?', 'No. Ayuda a preparar; alcance, validación y procedimientos del laboratorio siguen siendo decisivos.'],
        ['¿Puede empezar la selección de producto antes del método final?', 'Sí, pero debe ligarse a matriz, método, controles y reporting.']
      ]
    },
    fr: {
      title: 'Ressources laboratoire, prélèvement et méthodes',
      description: 'Ressources pratiques pour plan de prélèvement, preuve ISO/IEC 17025, choix méthode et flux laboratoire microbiologie de l’eau.',
      answer: 'Utilisez cette collection lorsque le travail commence par design échantillon, préparation méthode, chaîne de traçabilité ou preuve laboratoire.',
      bullets: ['Préparer point de prélèvement, matrice, volume et conservation.', 'Relier choix méthode, contrôles, lots et historique de revue.', 'Utiliser ISO/IEC 17025 et ISO 19458 pour cadrer la traçabilité.'],
      workflow: ['Définir les critères d’acceptation échantillon.', 'Choisir la route méthode ou produit.', 'Documenter la revue avant diffusion client ou portail.'],
      questions: ['Comment capturer le contexte de prélèvement?', 'Que change ISO/IEC 17025 dans le dossier?', 'Quelle checklist prépare le choix méthode?'],
      faqs: [
        ['Une checklist suffit-elle pour accréditation?', 'Non. Elle aide à préparer; portée, validation et procédures laboratoire restent décisives.'],
        ['La sélection produit peut-elle commencer avant méthode finale?', 'Oui, si elle reste liée à matrice, méthode, contrôles et reporting.']
      ]
    },
    it: {
      title: 'Risorse laboratorio, campionamento e metodi',
      description: 'Risorse pratiche per piano di campionamento, evidenza ISO/IEC 17025, scelta metodo e workflow di laboratorio acqua.',
      answer: 'Usa questa raccolta quando il lavoro parte da design campione, preparazione metodo, catena di custodia o evidenza laboratorio.',
      bullets: ['Preparare punto di campionamento, matrice, volume e conservazione.', 'Collegare scelta metodo con controlli, lotti e storico revisione.', 'Usare ISO/IEC 17025 e ISO 19458 per inquadrare la tracciabilità.'],
      workflow: ['Definire criteri di accettazione campione.', 'Scegliere rotta metodo o prodotto.', 'Documentare revisione prima del rilascio cliente o portale.'],
      questions: ['Come catturare il contesto di campionamento?', 'Cosa cambia ISO/IEC 17025 nel record?', 'Quale checklist prepara la scelta metodo?'],
      faqs: [
        ['Una checklist basta per accreditamento?', 'No. Supporta la preparazione; ambito, validazione e procedure laboratorio restano decisivi.'],
        ['La scelta prodotto può iniziare prima del metodo finale?', 'Sì, se resta legata a matrice, metodo, controlli e reporting.']
      ]
    },
    ca: {
      title: 'Recursos de laboratori, mostreig i mètodes',
      description: 'Recursos pràctics per a disseny de mostreig, evidència ISO/IEC 17025, selecció de mètode i fluxos de laboratori d’aigua.',
      answer: 'Fes servir aquesta col·lecció quan el treball comença amb disseny de mostra, preparació de mètode, cadena de custòdia o evidència de laboratori.',
      bullets: ['Prepara punt de mostreig, matriu, volum i conservació.', 'Connecta selecció de mètode amb controls, lots i historial de revisió.', 'Usa ISO/IEC 17025 i ISO 19458 per emmarcar traçabilitat.'],
      workflow: ['Defineix criteris d’acceptació de mostra.', 'Selecciona ruta de mètode o producte.', 'Documenta revisió abans de lliurar al client o portal.'],
      questions: ['Com capturar context de mostreig?', 'Què canvia ISO/IEC 17025 al registre?', 'Quin checklist prepara selecció de mètode?'],
      faqs: [
        ['Un checklist és suficient per acreditació?', 'No. Ajuda a preparar; abast, validació i procediments del laboratori continuen sent decisius.'],
        ['Pot començar la selecció de producte abans del mètode final?', 'Sí, si queda lligada a matriu, mètode, controls i reporting.']
      ]
    }
  },
  'resources-lims-digital-traceability': {
    en: {
      title: 'LIMS and digital traceability resources',
      description: 'Resources for moving water analysis from spreadsheets to connected evidence, review, reporting and customer portal workflows.',
      answer: 'Use this collection when sample, batch, method, operator, result, review and report data need to stay connected instead of scattered across files.',
      bullets: ['Map sample-to-report evidence before choosing software.', 'Separate draft data, reviewed data and released reports.', 'Use Excel-to-LIMS guidance to prioritize migration.'],
      workflow: ['Inventory current spreadsheets and handoffs.', 'Define required audit trail and permissions.', 'Connect reports with customer and CRM context.'],
      questions: ['When is Excel no longer enough?', 'Which fields belong in a LIMS-style flow?', 'How does software support audit evidence?'],
      faqs: [
        ['Does software replace method validation?', 'No. It organizes evidence and review; method validation remains a quality responsibility.'],
        ['Can AquaVerify Cloud connect with product workflows?', 'Yes. Product, sample, review and reporting context can be connected in one workflow.']
      ]
    },
    es: {
      title: 'Recursos LIMS y trazabilidad digital',
      description: 'Recursos para pasar análisis de agua desde Excel a evidencia conectada, revisión, informes y portal cliente.',
      answer: 'Usa esta colección cuando muestra, lote, método, operador, resultado, revisión e informe deben quedar conectados en lugar de dispersos en archivos.',
      bullets: ['Mapea evidencia muestra-informe antes de elegir software.', 'Separa dato borrador, revisado e informe liberado.', 'Usa la guía Excel-a-LIMS para priorizar migración.'],
      workflow: ['Inventaría hojas de cálculo y traspasos actuales.', 'Define audit trail y permisos requeridos.', 'Conecta informes con cliente y contexto CRM.'],
      questions: ['¿Cuándo Excel deja de ser suficiente?', '¿Qué campos pertenecen a un flujo tipo LIMS?', '¿Cómo apoya el software la evidencia de auditoría?'],
      faqs: [
        ['¿El software sustituye la validación de método?', 'No. Organiza evidencia y revisión; la validación sigue siendo responsabilidad de calidad.'],
        ['¿AquaVerify Cloud conecta con flujos de producto?', 'Sí. Producto, muestra, revisión y reporting pueden conectarse en un flujo.']
      ]
    },
    fr: {
      title: 'Ressources LIMS et traçabilité numérique',
      description: 'Ressources pour passer des tableurs à une preuve connectée, revue, reporting et portail client en analyse de l’eau.',
      answer: 'Utilisez cette collection lorsque échantillon, lot, méthode, opérateur, résultat, revue et rapport doivent rester connectés.',
      bullets: ['Cartographier preuve échantillon-rapport avant logiciel.', 'Séparer données brouillon, revues et rapports diffusés.', 'Utiliser le guide Excel-vers-LIMS pour prioriser migration.'],
      workflow: ['Inventorier tableurs et transferts actuels.', 'Définir audit trail et permissions requises.', 'Relier rapports, client et contexte CRM.'],
      questions: ['Quand Excel ne suffit-il plus?', 'Quels champs appartiennent à un flux type LIMS?', 'Comment le logiciel soutient-il la preuve audit?'],
      faqs: [
        ['Le logiciel remplace-t-il validation méthode?', 'Non. Il organise preuve et revue; la validation reste responsabilité qualité.'],
        ['AquaVerify Cloud se connecte-t-il aux flux produit?', 'Oui. Produit, échantillon, revue et reporting peuvent être connectés.']
      ]
    },
    it: {
      title: 'Risorse LIMS e tracciabilità digitale',
      description: 'Risorse per passare da fogli Excel a evidenza collegata, revisione, report e portale cliente nell’analisi acqua.',
      answer: 'Usa questa raccolta quando campione, lotto, metodo, operatore, risultato, revisione e report devono restare collegati.',
      bullets: ['Mappare evidenza campione-report prima del software.', 'Separare dati bozza, revisionati e report rilasciati.', 'Usare la guida Excel-a-LIMS per priorità di migrazione.'],
      workflow: ['Inventariare fogli e passaggi attuali.', 'Definire audit trail e permessi richiesti.', 'Collegare report con cliente e contesto CRM.'],
      questions: ['Quando Excel non basta più?', 'Quali campi servono in un flusso tipo LIMS?', 'Come il software supporta evidenza audit?'],
      faqs: [
        ['Il software sostituisce validazione metodo?', 'No. Organizza evidenza e revisione; la validazione resta responsabilità qualità.'],
        ['AquaVerify Cloud si collega ai workflow prodotto?', 'Sì. Prodotto, campione, revisione e reporting possono essere collegati.']
      ]
    },
    ca: {
      title: 'Recursos LIMS i traçabilitat digital',
      description: 'Recursos per passar d’Excel a evidència connectada, revisió, informes i portal client en anàlisi d’aigua.',
      answer: 'Fes servir aquesta col·lecció quan mostra, lot, mètode, operador, resultat, revisió i informe han de quedar connectats.',
      bullets: ['Mapa evidència mostra-informe abans de triar software.', 'Separa dada esborrany, revisada i informe alliberat.', 'Usa la guia Excel-a-LIMS per prioritzar migració.'],
      workflow: ['Inventaria fulls de càlcul i traspassos actuals.', 'Defineix audit trail i permisos requerits.', 'Connecta informes amb client i context CRM.'],
      questions: ['Quan Excel deixa de ser suficient?', 'Quins camps pertanyen a un flux tipus LIMS?', 'Com ajuda el software a l’evidència d’auditoria?'],
      faqs: [
        ['El software substitueix la validació de mètode?', 'No. Organitza evidència i revisió; la validació continua sent responsabilitat de qualitat.'],
        ['AquaVerify Cloud connecta amb fluxos de producte?', 'Sí. Producte, mostra, revisió i reporting poden quedar connectats.']
      ]
    }
  },
  'resources-applications-industries': {
    en: {
      title: 'Applications and industries resources',
      description: 'Resources for applying water microbiology workflows to utilities, food and beverage, facilities, Legionella risk and partner programs.',
      answer: 'Use this collection when the same microbiology decision must be adapted to sector, matrix, operational risk and commercial route.',
      bullets: ['Translate guides into sector-specific sample flows.', 'Separate routine quality control, incident review and customer reporting.', 'Prepare distributor, OEM or facility conversations with context.'],
      workflow: ['Choose the operating context.', 'Match matrix and risk objective to a resource.', 'Use the checklist to prepare the next technical conversation.'],
      questions: ['Which resources fit food and beverage water?', 'How should facilities frame Legionella-related water risk?', 'Where do OEM and distributor routes connect?'],
      faqs: [
        ['Are sector pages product claims?', 'No. They help route technical conversations; final suitability depends on method, matrix and quality review.'],
        ['Can one checklist cover several sectors?', 'It can prepare the conversation, but each sector still needs its own risk and reporting context.']
      ]
    },
    es: {
      title: 'Recursos de aplicaciones e industrias',
      description: 'Recursos para aplicar microbiología del agua en utilities, alimentación y bebidas, instalaciones, riesgo Legionella y programas partner.',
      answer: 'Usa esta colección cuando la misma decisión microbiológica debe adaptarse a sector, matriz, riesgo operativo y ruta comercial.',
      bullets: ['Traduce guías a flujos de muestra por sector.', 'Separa control rutinario, revisión de incidente y reporting cliente.', 'Prepara conversaciones con distribuidor, OEM o facility con contexto.'],
      workflow: ['Elige el contexto operativo.', 'Cruza matriz y objetivo de riesgo con un recurso.', 'Usa el checklist para preparar la siguiente conversación técnica.'],
      questions: ['¿Qué recursos encajan en alimentación y bebidas?', '¿Cómo enfocar riesgo de agua en instalaciones y Legionella?', '¿Dónde conectan rutas OEM y distribuidor?'],
      faqs: [
        ['¿Las páginas sectoriales son claims de producto?', 'No. Ayudan a orientar conversaciones técnicas; la idoneidad final depende de método, matriz y revisión de calidad.'],
        ['¿Un checklist cubre varios sectores?', 'Puede preparar la conversación, pero cada sector necesita su propio contexto de riesgo y reporting.']
      ]
    },
    fr: {
      title: 'Ressources applications et industries',
      description: 'Ressources pour appliquer la microbiologie de l’eau aux utilities, agroalimentaire, bâtiments, risque Legionella et programmes partenaires.',
      answer: 'Utilisez cette collection lorsque la même décision microbiologique doit être adaptée au secteur, à la matrice, au risque opérationnel et à la route commerciale.',
      bullets: ['Traduire les guides en flux échantillons sectoriels.', 'Distinguer contrôle courant, revue incident et reporting client.', 'Préparer échanges distributeur, OEM ou bâtiment avec contexte.'],
      workflow: ['Choisir le contexte opérationnel.', 'Relier matrice et objectif risque à une ressource.', 'Utiliser la checklist pour préparer l’échange technique suivant.'],
      questions: ['Quelles ressources pour eau agroalimentaire?', 'Comment cadrer le risque eau et Legionella en bâtiments?', 'Où se connectent routes OEM et distribution?'],
      faqs: [
        ['Les pages secteur sont-elles des claims produit?', 'Non. Elles orientent les échanges; l’adéquation finale dépend méthode, matrice et revue qualité.'],
        ['Une checklist couvre-t-elle plusieurs secteurs?', 'Elle prépare l’échange, mais chaque secteur garde son contexte risque et reporting.']
      ]
    },
    it: {
      title: 'Risorse per applicazioni e industrie',
      description: 'Risorse per applicare microbiologia dell’acqua a utility, alimenti e bevande, strutture, rischio Legionella e programmi partner.',
      answer: 'Usa questa raccolta quando la stessa decisione microbiologica deve adattarsi a settore, matrice, rischio operativo e rotta commerciale.',
      bullets: ['Tradurre guide in flussi campione per settore.', 'Separare controllo routinario, revisione incidente e reporting cliente.', 'Preparare conversazioni distributore, OEM o facility con contesto.'],
      workflow: ['Scegliere il contesto operativo.', 'Abbinare matrice e obiettivo di rischio a una risorsa.', 'Usare la checklist per preparare la conversazione tecnica successiva.'],
      questions: ['Quali risorse per alimenti e bevande?', 'Come inquadrare rischio acqua e Legionella nelle strutture?', 'Dove si collegano OEM e distribuzione?'],
      faqs: [
        ['Le pagine settore sono claim prodotto?', 'No. Orientano conversazioni tecniche; idoneità finale dipende da metodo, matrice e revisione qualità.'],
        ['Una checklist copre più settori?', 'Può preparare la conversazione, ma ogni settore richiede contesto rischio e reporting propri.']
      ]
    },
    ca: {
      title: 'Recursos d’aplicacions i indústries',
      description: 'Recursos per aplicar microbiologia de l’aigua a utilities, alimentació i begudes, instal·lacions, risc Legionella i programes partner.',
      answer: 'Fes servir aquesta col·lecció quan la mateixa decisió microbiològica s’ha d’adaptar a sector, matriu, risc operatiu i ruta comercial.',
      bullets: ['Tradueix guies a fluxos de mostra per sector.', 'Separa control rutinari, revisió d’incident i reporting client.', 'Prepara converses amb distribuïdor, OEM o facility amb context.'],
      workflow: ['Tria el context operatiu.', 'Creua matriu i objectiu de risc amb un recurs.', 'Usa el checklist per preparar la conversa tècnica següent.'],
      questions: ['Quins recursos encaixen en alimentació i begudes?', 'Com enfocar risc d’aigua i Legionella en instal·lacions?', 'On connecten rutes OEM i distribuïdor?'],
      faqs: [
        ['Les pàgines sectorials són claims de producte?', 'No. Orienten converses tècniques; la idoneïtat final depèn de mètode, matriu i revisió de qualitat.'],
        ['Un checklist cobreix diversos sectors?', 'Pot preparar la conversa, però cada sector necessita context propi de risc i reporting.']
      ]
    }
  },
  'resources-scientific-research': {
    en: {
      title: 'Scientific research and editorial source resources',
      description: 'AquaVerify validation material, external research summaries, DOI-linked papers and editorial methodology for water microbiology readers.',
      answer: 'Use this collection when you need to distinguish AquaVerify-owned validation content from external peer-reviewed studies or conference communications.',
      bullets: ['Check whether a page is validation, external research summary or conference communication.', 'Follow DOI or official source links when rights evidence is not present.', 'Use editorial methodology to understand source and claim limits.'],
      workflow: ['Identify document type first.', 'Read the editorial information block.', 'Use the primary source for methodological or citation decisions.'],
      questions: ['Which resources summarize peer-reviewed studies?', 'Which page explains editorial methodology?', 'Where is AquaVerify-owned validation content located?'],
      faqs: [
        ['Are AquaVerify summaries the original papers?', 'No. They are navigation summaries and should not replace the journal record or official source.'],
        ['Can external PDFs be hosted without evidence?', 'No. The repository should keep DOI or official source links unless rights are documented.']
      ]
    },
    es: {
      title: 'Recursos de investigación científica y fuentes editoriales',
      description: 'Material de validación AquaVerify, resúmenes de investigación externa, papers con DOI y metodología editorial para microbiología del agua.',
      answer: 'Usa esta colección cuando necesites distinguir contenido de validación propio de AquaVerify de estudios externos revisados por pares o comunicaciones a congreso.',
      bullets: ['Comprueba si una página es validación, resumen externo o comunicación a congreso.', 'Sigue DOI o fuente oficial si no hay evidencia de derechos.', 'Usa metodología editorial para entender límites de fuente y claims.'],
      workflow: ['Identifica primero el tipo documental.', 'Lee el bloque de información editorial.', 'Usa la fuente primaria para decisiones metodológicas o citas.'],
      questions: ['¿Qué recursos resumen estudios revisados por pares?', '¿Qué página explica la metodología editorial?', '¿Dónde está la validación propia AquaVerify?'],
      faqs: [
        ['¿Los resúmenes AquaVerify son los papers originales?', 'No. Son resúmenes de navegación y no sustituyen el registro de revista ni la fuente oficial.'],
        ['¿Se pueden alojar PDFs externos sin evidencia?', 'No. El repositorio debe mantener DOI o fuente oficial salvo que los derechos estén documentados.']
      ]
    },
    fr: {
      title: 'Ressources recherche scientifique et sources éditoriales',
      description: 'Validation AquaVerify, résumés de recherche externe, articles avec DOI et méthodologie éditoriale pour microbiologie de l’eau.',
      answer: 'Utilisez cette collection pour distinguer contenu de validation AquaVerify, études externes évaluées par les pairs et communications de congrès.',
      bullets: ['Vérifier si la page est validation, résumé externe ou communication congrès.', 'Suivre DOI ou source officielle si les droits ne sont pas documentés.', 'Utiliser la méthodologie éditoriale pour comprendre limites sources et claims.'],
      workflow: ['Identifier d’abord le type de document.', 'Lire le bloc d’information éditoriale.', 'Utiliser la source primaire pour méthode ou citation.'],
      questions: ['Quelles ressources résument des études peer-reviewed?', 'Quelle page explique la méthodologie éditoriale?', 'Où trouver la validation AquaVerify?'],
      faqs: [
        ['Les résumés AquaVerify sont-ils les articles originaux?', 'Non. Ce sont des résumés de navigation qui ne remplacent pas le registre journal ou la source officielle.'],
        ['Peut-on héberger des PDF externes sans preuve?', 'Non. Le repository doit garder DOI ou source officielle sauf droits documentés.']
      ]
    },
    it: {
      title: 'Risorse di ricerca scientifica e fonti editoriali',
      description: 'Validazione AquaVerify, sintesi di ricerca esterna, articoli con DOI e metodologia editoriale per microbiologia dell’acqua.',
      answer: 'Usa questa raccolta per distinguere contenuto di validazione AquaVerify, studi esterni peer-reviewed e comunicazioni a congresso.',
      bullets: ['Verificare se la pagina è validazione, sintesi esterna o comunicazione congresso.', 'Seguire DOI o fonte ufficiale se i diritti non sono documentati.', 'Usare la metodologia editoriale per capire limiti di fonti e claim.'],
      workflow: ['Identificare prima il tipo documento.', 'Leggere il blocco di informazioni editoriali.', 'Usare la fonte primaria per metodo o citazione.'],
      questions: ['Quali risorse sintetizzano studi peer-reviewed?', 'Quale pagina spiega la metodologia editoriale?', 'Dove si trova la validazione AquaVerify?'],
      faqs: [
        ['Le sintesi AquaVerify sono gli articoli originali?', 'No. Sono sintesi di navigazione e non sostituiscono record journal o fonte ufficiale.'],
        ['Si possono ospitare PDF esterni senza evidenza?', 'No. Il repository deve mantenere DOI o fonte ufficiale salvo diritti documentati.']
      ]
    },
    ca: {
      title: 'Recursos de recerca científica i fonts editorials',
      description: 'Material de validació AquaVerify, resums de recerca externa, articles amb DOI i metodologia editorial per a microbiologia de l’aigua.',
      answer: 'Fes servir aquesta col·lecció per distingir contingut de validació AquaVerify, estudis externs revisats per parells i comunicacions a congrés.',
      bullets: ['Comprova si la pàgina és validació, resum extern o comunicació a congrés.', 'Segueix DOI o font oficial si no hi ha drets documentats.', 'Usa metodologia editorial per entendre límits de fonts i claims.'],
      workflow: ['Identifica primer el tipus documental.', 'Llegeix el bloc d’informació editorial.', 'Usa la font primària per decisions metodològiques o cites.'],
      questions: ['Quins recursos resumeixen estudis revisats per parells?', 'Quina pàgina explica la metodologia editorial?', 'On és la validació pròpia AquaVerify?'],
      faqs: [
        ['Els resums AquaVerify són els articles originals?', 'No. Són resums de navegació i no substitueixen el registre de revista ni la font oficial.'],
        ['Es poden allotjar PDF externs sense evidència?', 'No. El repositori ha de mantenir DOI o font oficial llevat que els drets estiguin documentats.']
      ]
    }
  },
  'resources-guides-checklists': {
    en: {
      title: 'Guides and checklists for water microbiology decisions',
      description: 'Operational AquaVerify guides and PDF checklists for product selection, sampling, compliance, LIMS migration and partner conversations.',
      answer: 'Use this collection when you need a practical next step: a guide to read, a checklist to complete and evidence to bring into a technical conversation.',
      bullets: ['Pair each guide with its checklist when available.', 'Use PDFs as preparation tools, not as validation records by themselves.', 'Keep completed checklists with method, reviewer and report context.'],
      workflow: ['Choose the decision area.', 'Open the guide for context.', 'Download the checklist and complete it before contacting AquaVerify.'],
      questions: ['Which checklists are available?', 'How should completed checklists be stored?', 'Which guide helps choose an AquaVerify product?'],
      faqs: [
        ['Are checklist PDFs controlled quality records?', 'No. They are preparation tools until adopted inside the organization quality system.'],
        ['Can a distributor use these guides?', 'Yes. They help prepare buyer, support, product and OEM conversations.']
      ]
    },
    es: {
      title: 'Guías y checklists para decisiones de microbiología del agua',
      description: 'Guías operativas AquaVerify y checklists PDF para selección de producto, muestreo, cumplimiento, migración LIMS y conversaciones partner.',
      answer: 'Usa esta colección cuando necesites un siguiente paso práctico: una guía para leer, un checklist para completar y evidencia para una conversación técnica.',
      bullets: ['Combina cada guía con su checklist cuando exista.', 'Usa PDFs como preparación, no como registros de validación por sí solos.', 'Conserva checklists completados con método, revisor e informe.'],
      workflow: ['Elige el área de decisión.', 'Abre la guía para contexto.', 'Descarga el checklist y complétalo antes de contactar con AquaVerify.'],
      questions: ['¿Qué checklists están disponibles?', '¿Cómo guardar checklists completados?', '¿Qué guía ayuda a elegir producto AquaVerify?'],
      faqs: [
        ['¿Los PDFs son registros controlados de calidad?', 'No. Son herramientas de preparación hasta que la organización los adopte en su sistema de calidad.'],
        ['¿Puede usarlos un distribuidor?', 'Sí. Ayudan a preparar conversaciones de comprador, soporte, producto y OEM.']
      ]
    },
    fr: {
      title: 'Guides et checklists pour décisions microbiologie de l’eau',
      description: 'Guides opérationnels AquaVerify et checklists PDF pour choix produit, prélèvement, conformité, migration LIMS et échanges partenaires.',
      answer: 'Utilisez cette collection lorsqu’il faut une étape pratique: guide à lire, checklist à compléter et preuve pour l’échange technique.',
      bullets: ['Associer chaque guide à sa checklist si disponible.', 'Utiliser les PDF comme préparation, pas comme enregistrements de validation seuls.', 'Conserver les checklists complétées avec méthode, revue et rapport.'],
      workflow: ['Choisir la zone de décision.', 'Ouvrir le guide pour contexte.', 'Télécharger la checklist et la compléter avant de contacter AquaVerify.'],
      questions: ['Quelles checklists sont disponibles?', 'Comment conserver les checklists complétées?', 'Quel guide aide au choix produit AquaVerify?'],
      faqs: [
        ['Les PDF sont-ils des enregistrements qualité contrôlés?', 'Non. Ce sont des outils de préparation tant qu’ils ne sont pas adoptés dans le système qualité.'],
        ['Un distributeur peut-il les utiliser?', 'Oui. Ils préparent échanges acheteur, support, produit et OEM.']
      ]
    },
    it: {
      title: 'Guide e checklist per decisioni di microbiologia dell’acqua',
      description: 'Guide operative AquaVerify e checklist PDF per scelta prodotto, campionamento, conformità, migrazione LIMS e conversazioni partner.',
      answer: 'Usa questa raccolta quando serve un passo pratico: guida da leggere, checklist da completare ed evidenza per la conversazione tecnica.',
      bullets: ['Abbinare ogni guida alla checklist se disponibile.', 'Usare i PDF come preparazione, non come record di validazione autonomi.', 'Conservare checklist completate con metodo, revisore e report.'],
      workflow: ['Scegliere l’area decisionale.', 'Aprire la guida per contesto.', 'Scaricare la checklist e completarla prima di contattare AquaVerify.'],
      questions: ['Quali checklist sono disponibili?', 'Come conservare checklist completate?', 'Quale guida aiuta a scegliere prodotto AquaVerify?'],
      faqs: [
        ['I PDF sono record qualità controllati?', 'No. Sono strumenti di preparazione finché non adottati nel sistema qualità.'],
        ['Un distributore può usarli?', 'Sì. Preparano conversazioni buyer, supporto, prodotto e OEM.']
      ]
    },
    ca: {
      title: 'Guies i checklists per a decisions de microbiologia de l’aigua',
      description: 'Guies operatives AquaVerify i checklists PDF per a selecció de producte, mostreig, compliment, migració LIMS i converses partner.',
      answer: 'Fes servir aquesta col·lecció quan necessitis un pas pràctic: una guia per llegir, un checklist per completar i evidència per a una conversa tècnica.',
      bullets: ['Combina cada guia amb el seu checklist quan existeixi.', 'Usa PDFs com a preparació, no com a registres de validació per si sols.', 'Conserva checklists completats amb mètode, revisor i informe.'],
      workflow: ['Tria l’àrea de decisió.', 'Obre la guia per context.', 'Descarrega el checklist i completa’l abans de contactar amb AquaVerify.'],
      questions: ['Quins checklists estan disponibles?', 'Com guardar checklists completats?', 'Quina guia ajuda a triar producte AquaVerify?'],
      faqs: [
        ['Els PDF són registres controlats de qualitat?', 'No. Són eines de preparació fins que l’organització els adopti al sistema de qualitat.'],
        ['Els pot usar un distribuïdor?', 'Sí. Ajuden a preparar converses de comprador, suport, producte i OEM.']
      ]
    }
  }
};

function hubWhitepaperMap(lang) {
  return new Map(getResourcesHubContent(lang).whitepapers.map((item) => [item.id, item]));
}

function checklistMap(lang) {
  return new Map(getResourcesHubContent(lang).checklists.map(([id, title, body]) => [id, { id, title, body }]));
}

function selectedResourceLinks(categoryId, lang) {
  const labels = LANGUAGE_COPY[lang];
  const whitepapers = hubWhitepaperMap(lang);
  return (CATEGORY_RESOURCE_IDS[categoryId] || [])
    .map((id) => {
      const item = whitepapers.get(id);
      if (!item) return null;
      return {
        kind: labels.resourceKind,
        title: item.title,
        description: item.body,
        path: getMarketingPagePath(id, lang)
      };
    })
    .filter(Boolean);
}

function selectedChecklistLinks(categoryId, lang) {
  const labels = LANGUAGE_COPY[lang];
  const checklists = checklistMap(lang);
  return (CATEGORY_CHECKLIST_IDS[categoryId] || [])
    .map((id) => {
      const item = checklists.get(id);
      if (!item) return null;
      return {
        kind: labels.checklistKind,
        title: item.title,
        description: item.body,
        path: getChecklistHref(lang, id)
      };
    })
    .filter(Boolean);
}

function buildCategoryLocale(categoryId, lang) {
  const copy = CATEGORY_COPY[categoryId][lang];
  const labels = LANGUAGE_COPY[lang];
  const uiLabels = getResourceUiLabels(lang);
  const resources = selectedResourceLinks(categoryId, lang);
  const checklists = selectedChecklistLinks(categoryId, lang);
  const sections = [
    section(labels.directAnswer, copy.answer, copy.bullets),
    section(labels.workflowTitle, copy.description, copy.workflow),
    section(labels.questionsTitle, copy.answer, copy.questions)
  ];

  return {
    ...locale(
      RESOURCE_CATEGORY_PATHS[categoryId][lang],
      copy.title,
      copy.description,
      sections,
      {
        eyebrow: uiLabels.resource,
        primaryCta: labels.primaryCta,
        secondaryCta: labels.secondaryCta,
        seoTitle: `${copy.title} | AquaVerify`,
        seoDescription: copy.description,
        faqs: copy.faqs.map(([question, answer]) => ({ question, answer }))
      }
    ),
    resourceLinksTitle: labels.selectedTitle,
    resourceLinksIntro: copy.description,
    resourceLinks: resources,
    checklistLinksTitle: labels.checklistTitle,
    checklistLinks: checklists
  };
}

export const RESOURCE_CATEGORY_MARKETING_PAGES = Object.keys(RESOURCE_CATEGORY_PATHS).map((categoryId) => page(
  categoryId,
  'resources',
  'quote',
  Object.fromEntries(MARKETING_LANGUAGES.map((lang) => [lang, buildCategoryLocale(categoryId, lang)])),
  {
    parentId: 'resources',
    schemaType: 'resourcesHub',
    dateModified: '2026-06-18'
  }
));
