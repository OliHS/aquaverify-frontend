import {
  GLOSSARY_TERMS
} from './glossaryData.js';
import {
  GLOSSARY_HUB_PATHS,
  GLOSSARY_PRIORITY_IDS,
  GLOSSARY_TERM_ROUTE_PATHS
} from './glossaryRoutes.js';
import { getMarketingPagePath } from './marketingRoutes.js';

export const GLOSSARY_ROUTE_PATHS = {
  glossary: GLOSSARY_HUB_PATHS,
  ...GLOSSARY_TERM_ROUTE_PATHS
};

export { GLOSSARY_PRIORITY_IDS };

const SITE_URL = 'https://aquaverify.com';

const COPY = {
  en: {

    seoTitle: 'Water microbiology, LIMS and traceability glossary | AquaVerify',
    seoDescription: 'Technical glossary for water microbiology, viral and bacterial indicators, ISO/EPA methods, LIMS, traceability, OEM programs and AquaVerify products.',
    eyebrow: 'Knowledge glossary',
    title: 'Water microbiology, LIMS and traceability glossary',
    titleAccent: 'glossary',
    lead: 'A technical knowledge hub for buyers, laboratories, water operators, quality teams, distributors and OEM partners evaluating water microbiology workflows.',
    primaryCta: 'Explore priority terms',
    secondaryCta: 'Open resources',
    searchPlaceholder: 'Search by term, standard, product, sector or concept...',
    all: 'All categories',
    priority: 'Priority term',
    supporting: 'Brief definition',
    termCta: 'Open term page',
    relatedTitle: 'Related resources',
    relatedBody: 'Explore technical guides, AquaVerify products, sector applications and authorized support connected with this definition.',
    definition: 'Definition',
    application: 'Why it matters',
    product: 'Related AquaVerify product',
    sector: 'Related sector',
    relatedTerms: 'Related terms',
    noResults: 'No terms match the current search. Try a product, standard, method or sector.',
    termsCount: 'terms',
    priorityCount: 'technical term pages',
    back: 'Back to glossary',
    glossaryLabel: 'Glossary',
    contact: 'Request technical recommendation',
    distributors: 'Find authorized distributor'
  },
  es: {
    seoTitle: 'Glosario de microbiología del agua, LIMS y trazabilidad | AquaVerify',
    seoDescription: 'Glosario técnico sobre microbiología del agua, indicadores virales y bacterianos, métodos ISO/EPA, LIMS, trazabilidad, programas OEM y productos AquaVerify.',
    eyebrow: 'Glosario de conocimiento',
    title: 'Glosario de microbiología del agua, LIMS y trazabilidad',
    titleAccent: 'Glosario',
    lead: 'Un hub técnico para compradores, laboratorios, operadores de agua, equipos de calidad, distribuidores y partners OEM que evalúan flujos de microbiología del agua.',
    primaryCta: 'Explorar términos prioritarios',
    secondaryCta: 'Abrir recursos',
    searchPlaceholder: 'Buscar por término, norma, producto, sector o concepto...',
    all: 'Todas las categorías',
    priority: 'Término prioritario',
    supporting: 'Definición breve',
    termCta: 'Abrir ficha del término',
    relatedTitle: 'Recursos relacionados',
    relatedBody: 'Amplía esta definición con guías técnicas, productos AquaVerify, aplicaciones sectoriales y soporte autorizado.',
    definition: 'Definición',
    application: 'Por qué importa',
    product: 'Producto AquaVerify relacionado',
    sector: 'Sector relacionado',
    relatedTerms: 'Términos relacionados',
    noResults: 'No hay términos que coincidan con la búsqueda actual. Prueba con un producto, norma, método o sector.',
    termsCount: 'términos',
    priorityCount: 'fichas técnicas',
    back: 'Volver al glosario',
    glossaryLabel: 'Glosario',
    contact: 'Solicitar recomendación técnica',
    distributors: 'Encontrar distribuidor autorizado'
  },
  fr: {

    seoTitle: 'Glossaire microbiologie de l’eau, LIMS et traçabilité | AquaVerify',
    seoDescription: 'Glossaire technique sur microbiologie de l’eau, indicateurs viraux et bactériens, méthodes ISO/EPA, LIMS, traçabilité, OEM et produits AquaVerify.',
    eyebrow: 'Glossaire de connaissance',
    title: 'Glossaire microbiologie de l’eau, LIMS et traçabilité',
    titleAccent: 'Glossaire',
    lead: 'Un hub technique pour acheteurs, laboratoires, opérateurs d’eau, équipes qualité, distributeurs et partenaires OEM qui évaluent les flux de microbiologie de l’eau.',
    primaryCta: 'Explorer les termes prioritaires',
    secondaryCta: 'Ouvrir les ressources',
    searchPlaceholder: 'Rechercher par terme, norme, produit, secteur ou concept...',
    all: 'Toutes les catégories',
    priority: 'Terme prioritaire',
    supporting: 'Définition courte',
    termCta: 'Ouvrir la fiche',
    relatedTitle: 'Ressources associées',
    relatedBody: 'Approfondissez cette définition avec des guides techniques, des produits AquaVerify, des applications sectorielles et un support autorisé.',
    definition: 'Définition',
    application: 'Pourquoi c’est important',
    product: 'Produit AquaVerify associé',
    sector: 'Secteur associé',
    relatedTerms: 'Termes associés',
    noResults: 'Aucun terme ne correspond à la recherche. Essayez un produit, une norme, une méthode ou un secteur.',
    termsCount: 'termes',
    priorityCount: 'fiches techniques',
    back: 'Retour au glossaire',
    glossaryLabel: 'Glossaire',
    contact: 'Demander une recommandation technique',
    distributors: 'Trouver un distributeur autorisé'
  },
  it: {

    seoTitle: 'Glossario microbiologia dell’acqua, LIMS e tracciabilità | AquaVerify',
    seoDescription: 'Glossario tecnico su microbiologia dell’acqua, indicatori virali e batterici, metodi ISO/EPA, LIMS, tracciabilità, OEM e prodotti AquaVerify.',
    eyebrow: 'Glossario di conoscenza',
    title: 'Glossario microbiologia dell’acqua, LIMS e tracciabilità',
    titleAccent: 'Glossario',
    lead: 'Un hub tecnico per buyer, laboratori, operatori idrici, team qualità, distributori e partner OEM che valutano workflow di microbiologia dell’acqua.',
    primaryCta: 'Esplora termini prioritari',
    secondaryCta: 'Apri risorse',
    searchPlaceholder: 'Cerca per termine, norma, prodotto, settore o concetto...',
    all: 'Tutte le categorie',
    priority: 'Termine prioritario',
    supporting: 'Definizione breve',
    termCta: 'Apri scheda termine',
    relatedTitle: 'Risorse correlate',
    relatedBody: 'Approfondisci questa definizione con guide tecniche, prodotti AquaVerify, applicazioni settoriali e supporto autorizzato.',
    definition: 'Definizione',
    application: 'Perché è importante',
    product: 'Prodotto AquaVerify correlato',
    sector: 'Settore correlato',
    relatedTerms: 'Termini correlati',
    noResults: 'Nessun termine corrisponde alla ricerca. Prova con prodotto, norma, metodo o settore.',
    termsCount: 'termini',
    priorityCount: 'schede tecniche',
    back: 'Torna al glossario',
    glossaryLabel: 'Glossario',
    contact: 'Richiedi raccomandazione tecnica',
    distributors: 'Trova distributore autorizzato'
  },
  ca: {

    seoTitle: 'Glossari de microbiologia de l’aigua, LIMS i traçabilitat | AquaVerify',
    seoDescription: 'Glossari tècnic sobre microbiologia de l’aigua, indicadors virals i bacterians, mètodes ISO/EPA, LIMS, traçabilitat, OEM i productes AquaVerify.',
    eyebrow: 'Glossari de coneixement',
    title: 'Glossari de microbiologia de l’aigua, LIMS i traçabilitat',
    titleAccent: 'Glossari',
    lead: 'Un hub tècnic per a compradors, laboratoris, operadors d’aigua, equips de qualitat, distribuïdors i partners OEM que avaluen fluxos de microbiologia de l’aigua.',
    primaryCta: 'Explorar termes prioritaris',
    secondaryCta: 'Obrir recursos',
    searchPlaceholder: 'Cercar per terme, norma, producte, sector o concepte...',
    all: 'Totes les categories',
    priority: 'Terme prioritari',
    supporting: 'Definició breu',
    termCta: 'Obrir fitxa del terme',
    relatedTitle: 'Recursos relacionats',
    relatedBody: 'Amplia aquesta definició amb guies tècniques, productes AquaVerify, aplicacions sectorials i suport autoritzat.',
    definition: 'Definició',
    application: 'Per què importa',
    product: 'Producte AquaVerify relacionat',
    sector: 'Sector relacionat',
    relatedTerms: 'Termes relacionats',
    noResults: 'No hi ha termes que coincideixin amb la cerca. Prova amb producte, norma, mètode o sector.',
    termsCount: 'termes',
    priorityCount: 'fitxes tècniques',
    back: 'Tornar al glossari',
    glossaryLabel: 'Glossari',
    contact: 'Sol·licitar recomanació tècnica',
    distributors: 'Trobar distribuïdor autoritzat'
  }
};

const WHITEPAPER_BY_TERM = [
  [/coliph|colif|bacterioph|iso-10705|ufp|pfu|viral|virus/i, 'coliphages-indicators'],
  [/directiva|directive|2020\/2184|rd 3\/2023|real decreto|decret/i, 'eu-drinking-water-directive-coliphages'],
  [/lims|audit|coa|traz|traç|trace|portal|eln|excel|saas/i, 'excel-to-lims-water-analysis'],
  [/19458|muestreo|sampling|mostreig|campionamento|échantillonnage/i, 'iso-19458-water-microbiological-sampling'],
  [/oem|marca blanca|white label|marque blanche|private label/i, 'oem-white-label-water-testing-kits'],
  [/presencia|presence|assenza|absència|enumer/i, 'presence-vs-enumeration']
];

const SPECIFIC_DEFINITIONS = {
  en: {
    0: 'Adenovirus is an enteric virus that can persist under certain environmental conditions and is used in some contexts as a reference for evaluating viral persistence in water.',
    1: 'Viable bacteria are microorganisms capable of remaining alive and, depending on conditions, growing or forming colonies detectable by culture methods.',
    4: 'Microbial load is the level of microorganisms present in a sample or system. It can be expressed in different units depending on the method and organism evaluated.',
    7: 'F-RNA coliphages are a subgroup of F-specific coliphages with an RNA genome. They can be used in fecal contamination and viral behaviour studies depending on method, matrix and program objective.',
    14: 'Microbial Source Tracking groups approaches used to infer the likely source of microbial contamination, for example human, livestock, environmental or mixed sources.',
    16: 'Norovirus is an enteric virus of high public-health relevance associated with gastrointestinal outbreaks. In water it is usually addressed through specific surveillance or indicators, not as a universal routine test.',
    17: 'A pathogen is a microorganism capable of causing disease. In water, pathogen control is managed through barriers, indicators, specific surveillance and risk plans.',
    18: 'Pseudomonas aeruginosa is an opportunistic bacterium relevant in selected water controls, especially where biofilm, recreational water, installations or sensitive products may be involved.',
    22: 'EPA Method 1601 is an EPA method for F+ and somatic coliphages using a two-step enrichment procedure, according to the method scope.',
    23: 'EPA Method 1602 is an EPA method for F+ and somatic coliphages using a single agar layer procedure, according to the method scope.',
    24: 'HACCP is a preventive hazard analysis and critical control point system used in food safety. For process water, it helps define control points and evidence.',
    27: 'ISO 11731 is an international standard for enumerating Legionella in water. It is relevant for control programs in facilities, domestic hot water, towers, spas and aerosol-risk systems.',
    29: 'ISO 22000 is an international standard for food safety management systems. It can relate to control of water used as an ingredient, process aid or cleaning medium.',
    30: 'ISO 5667-1 is a general standard on designing water sampling programs and sampling techniques.',
    31: 'ISO 7899-2 is a standard for detecting and enumerating intestinal enterococci in water by membrane filtration, according to the standard scope.',
    37: 'Royal Decree 742/2013 is the Spanish technical-sanitary framework for swimming pools. It relates to quality control, operation, microbiological risks and documentation.',
    39: 'The Revised Total Coliform Rule is the US rule for total coliforms in drinking water. It should not be confused with coliphage methods, which answer a different technical question.',
    41: 'A method blank is a control that accompanies the analytical process without the target sample to detect contamination introduced during preparation, reagents or handling.',
    42: 'Cold chain is the controlled-temperature condition maintained during transport and storage of a sample or sensitive material.',
    43: 'A negative control is a material or condition that should not produce a signal and helps detect contamination, false positives or handling errors.',
    44: 'A positive control is a material or condition that should produce the expected response and confirms that the method can detect the target.',
    45: 'Double Agar Layer is a classic two-layer agar procedure used in bacteriophage assays, where an upper layer containing sample and host is poured over an agar base.',
    46: 'Enrichment is an analytical step that promotes growth or multiplication of a target microorganism before detection.',
    49: 'Incubation is maintaining a sample or culture under controlled temperature and time to allow microbiological growth, reaction or reading.',
    51: 'The limit of quantification is the lowest concentration that can be quantified with acceptable performance under defined method conditions.',
    54: 'A composite sample is formed by combining several subsamples taken at different points or times according to a defined plan.',
    55: 'A grab sample is taken at a specific time and location. It represents the conditions of that instant and place.',
    56: 'Most Probable Number is a statistical method used to estimate microorganism concentration from presence/absence patterns in tubes or wells.',
    59: 'Recovery is the percentage or proportion of the target microorganism that the method can recover compared with a known or expected amount.',
    60: 'Repeatability is the agreement between results obtained under similar conditions: same method, operator, equipment and laboratory over a short interval.',
    61: 'Reproducibility is the agreement between results obtained under changing conditions, such as different laboratories, operators or days.',
    62: 'Single Agar Layer is a procedure used in some coliphage methods to mix sample, host and medium before incubation.',
    64: '21 CFR Part 11 is the US framework for electronic records and electronic signatures in FDA-regulated contexts. Applicability depends on the environment and intended use.',
    65: 'ALCOA+ is a set of data integrity principles: attributable, legible, contemporaneous, original, accurate and expanded criteria such as complete, consistent, enduring and available.',
    71: 'A CRM manages customers, opportunities, contacts and commercial follow-up. In AquaVerify it can connect with products, samples, quotations and partner channels.',
    72: 'A LIMS dashboard is an operational panel summarizing samples, worksheets, statuses, workload, pending tasks and quick access for the laboratory.',
    74: 'An electronic signature is the digital confirmation of review, approval or closure of a record according to permissions and procedure.',
    75: 'GxP refers to good-practice frameworks applicable in regulated environments, such as GMP, GLP or GDP, depending on the activity.',
    80: 'Sample Hub is a centralized sample view where context, results, status, labels, reports and actions can be consulted.',
    81: 'An SLA is a time commitment or target for completing an action, report, review or service. In laboratories it may relate to TAT or TTR.',
    83: 'A tenant is the logical space of an organization inside a SaaS platform. It controls data, permissions, users and configuration.',
    85: 'A WMS is a warehouse management system coordinating stock, locations, movements and logistics preparation. In AquaVerify it can connect to products, lots and orders.',
    86: 'A workflow owner is the user or role responsible for the next operational step within a workflow.',
    113: 'Approval is the formal decision confirming that a record, result, worksheet, report or dossier meets criteria and can move forward.',
    114: 'CAPA means corrective and preventive action used to address a cause and prevent recurrence of a deviation or nonconformity.',
    115: 'Document control manages versions, validity, distribution and review of documents such as SOPs, protocols, reports and dossiers.',
    117: 'A dossier is a documentation package summarizing critical information for review, approval, audit or transfer.',
    119: 'A nonconformity is failure to meet a specified requirement, whether regulatory, procedural, contractual or quality-system related.',
    122: 'Tech Transfer is the structured transfer of knowledge, process, method or product from R&D or validation to production, quality or operations.',
    125: 'Co-branding is a model in which AquaVerify and a partner share brand presence in product, documentation, training or campaigns.',
    127: 'A private-label kit is a partner model where packaging, documentation or brand can be adapted according to agreement and intended use.',
    128: 'Lead routing is the process of assigning commercial opportunities to the appropriate internal team, distributor, territory or partner.',
    131: 'Technical onboarding is the initial training process so a distributor or customer understands product, method, use, limits, support and documentation.',
    132: 'A commercial playbook is an operational document that helps qualify opportunities, explain products, adapt messages by sector and define next steps.',
    133: 'A technical reseller is a partner combining sales with technical knowledge to recommend products, guide use and escalate complex cases.',
    134: 'A territory is the geographic area or market assigned or evaluated for commercial activity, support, inventory or distribution.',
    2: 'A bacteriophage is a virus that infects specific bacteria and replicates within them. In water quality, bacteriophages are used as viral models or indicators to study fecal contamination, treatment behaviour and microbiological barrier performance.',
    3: 'A biofilm is a microbial community attached to a surface and protected by an extracellular matrix. In water networks it can act as a reservoir of microorganisms and contribute to recontamination.',
    5: 'A host strain is the bacterium used as the host to detect or enumerate bacteriophages in culture methods. Its selection is critical for assay sensitivity and result interpretation.',
    6: 'Total coliforms are a broad group of indicator bacteria that may occur in soil, water or fecal environments. They are used to assess system integrity, treatment effectiveness and possible operational issues.',
    8: 'F-specific coliphages are bacteriophages that infect host bacteria through F pili. They are used in methodological and comparative contexts where viral behaviour, source or contamination pathways need to be assessed.',
    9: 'Somatic coliphages are bacteriophages that infect Escherichia coli and other enterobacteria through cell-wall receptors. They are used as operational viral indicators in water quality programs and treatment evaluation.',
    10: 'Fecal contamination is the presence or evidence of human or animal fecal material in a water matrix. It is assessed through indicators such as E. coli, enterococci, coliforms and, in selected programs, coliphages.',
    11: 'Intestinal enterococci are Gram-positive bacteria associated with the human and animal gastrointestinal tract. Their relative persistence makes them useful indicators in recreational waters, environmental waters and selected control plans.',
    12: 'Escherichia coli is a thermotolerant coliform bacterium used worldwide as an indicator of recent fecal contamination. Its presence in drinking water generally requires investigation and corrective action under the applicable framework.',
    13: 'Legionella is a bacterial genus associated with risks in water installations that generate aerosols, such as domestic hot water, showers, spas, cooling towers or HVAC systems. Its control requires planning, sampling, laboratory analysis and documented actions.',
    15: 'An indicator microorganism is a microorganism whose presence or concentration is used to infer contamination, treatment effectiveness or deterioration of a water system.',
    19: 'PFU means plaque-forming unit, a unit used to express infectious viral particles capable of producing lysis plaques in a plaque assay.',
    20: 'Enteric viruses are viruses associated with the intestinal tract that can be transmitted through contaminated water. They include health-relevant groups such as norovirus, adenovirus or enterovirus, depending on the surveillance context.',
    21: 'Directive (EU) 2020/2184 is the European framework for the quality of water intended for human consumption. It reinforces risk-based management and includes somatic coliphages in treatment evaluation when applicable.',
    25: 'ISO 10705-1 is part of the ISO 10705 series and focuses on methods for F-specific RNA coliphages, according to the applicable scope and version.',
    26: 'ISO 10705-2 specifies a method for detecting and enumerating somatic coliphages by incubating the sample with a suitable host strain.',
    28: 'ISO 19458 is a reference standard for microbiological water sampling planning, sampling procedures, transport, handling and storage before analysis begins.',
    32: 'ISO 9308 is a series of standards for detecting and enumerating Escherichia coli and coliform bacteria in water, using approaches such as membrane filtration or MPN depending on the applicable part.',
    33: 'ISO/IEC 17025 is the standard for the competence of testing and calibration laboratories. In water analysis it relates to valid results, traceability, document control, technical competence and the quality system.',
    34: 'A water safety plan is a documented plan that identifies risks, controls, sampling points, responsibilities, monitoring and corrective actions in a water system.',
    35: 'Royal Decree 3/2023 is the Spanish framework defining technical and sanitary criteria for drinking water quality, control and supply. It is key for operators, laboratories and water managers in Spain.',
    36: 'Royal Decree 487/2022 is the Spanish regulation on prevention and control of legionellosis in installations that can generate aerosol exposure.',
    38: 'Regulation (EU) 2020/741 establishes minimum requirements for water reuse in the European Union, especially for agricultural irrigation.',
    40: 'A Water Safety Plan is a preventive water-risk management approach covering the path from catchment to user, combining hazards, controls, monitoring and corrective actions.',
    47: 'A plaque assay is a culture method that quantifies bacteriophages through visible lysis plaques formed on a bacterial lawn.',
    48: 'Membrane filtration is a technique in which a volume of water is filtered and the membrane is incubated on a medium to recover and count microorganisms.',
    50: 'Cell lysis is the rupture of a bacterial cell, for example after bacteriophage replication, releasing new viral particles and producing a visible lysis zone.',
    52: 'The limit of detection is the lowest level of analyte or microorganism that a method can detect under defined conditions, without necessarily implying exact quantification.',
    53: 'A matrix is the type of sample or environment being analysed, such as drinking water, reclaimed water, pool water, wastewater, surface water, process water or irrigation water.',
    57: 'An out-of-specification result is a result outside a defined limit, criterion or range. It requires review, investigation or action according to procedure.',
    58: 'A sampling point is the physical location or source where a sample is taken. It should be linked to customer, matrix, analytical plan and traceability.',
    63: 'Time to result is the time elapsed from sampling or sample receipt to obtaining and communicating an actionable result.',
    66: 'AquaLab is the AquaVerify Cloud area focused on laboratory operation, LIMS, protocols, ELN, validations and R&D.',
    67: 'AquaVerify Cloud is AquaVerify’s digital platform connecting workflows such as CRM, LIMS, ELN, CoA, customer portal, inventory, logistics, finance, dashboards and AquaAI depending on configuration.',
    68: 'An audit trail is a traceable history of events, changes, users, dates, decisions and signatures associated with a record.',
    69: 'A digital chain of custody is the electronic record documenting who collected, received, handled, analysed, reviewed and approved a sample or result.',
    70: 'A certificate of analysis is a formal report summarizing the sample, context, results, units, method, review and delivery to the customer or auditor.',
    73: 'An ELN is an electronic laboratory notebook used to document experiments, runs, evidence, materials, reviews and signatures.',
    76: 'A worksheet groups samples or results assigned to an analyst for execution, capture and review by work batch.',
    77: 'A LIMS is a laboratory information management system that organizes samples, results, worksheets, reports, users, statuses and traceability.',
    78: 'A customer portal is an interface where customers or authorized users can view requests, samples, reports or published results.',
    79: 'SaaS is a cloud software model in which the application is hosted and updated centrally. In laboratories it supports secure access, scalability and deployment without local servers.',
    82: 'Turnaround time is the cycle time from sample receipt or entry to delivery of the final report or result.',
    84: 'Analytical traceability is the ability to reconstruct the complete history of a sample, method, lot, operator, result, review and report.',
    88: 'Internal quality control is the set of controls, reviews and records used by a laboratory to verify that a method or assay is working properly.',
    89: 'ENUMERA is the AquaVerify family oriented to quantitative results and microbiological enumeration of water according to the product, matrix and applicable workflow.',
    90: 'INDICA is the AquaVerify family oriented to presence/absence answers, screening and operational verification in water.',
    91: 'A rapid detection kit is a preformulated or simplified system designed to reduce handling, standardize steps and accelerate reading compared with traditional workflows, according to intended use.',
    92: 'ISO/EPA kits are AquaVerify kits and technical workflows oriented to ISO or EPA methods and references when the analytical plan requires them.',
    93: 'Lab Essentials are prepared materials, media, controls, reagents and consumables that support microbiological execution in the laboratory.',
    94: 'A kit lot is the manufacturing or supply identifier associated with a kit or component. It should be linked to results when it affects traceability, quality or validation.',
    95: 'A culture medium is a nutritive or selective preparation that enables growth, detection or differentiation of microorganisms under defined conditions.',
    98: 'Domestic hot water is a building or facility hot-water system. It can be relevant in Legionella prevention programs and aerosolization risk control.',
    99: 'Aerosolization is the formation or release of fine droplets that can carry microorganisms from water into air. It is relevant in showers, towers, spas and other installation-risk assessments.',
    100: 'Raw water is water captured before treatment. Monitoring it helps understand initial load, risk and the efficiency of downstream processes.',
    101: 'Drinking water is water intended for human consumption and subject to sanitary criteria, control and supply requirements under the applicable framework.',
    102: 'Process water is water used within an industrial or food operation as an ingredient, contact water, cleaning water, cooling water, recirculation water or process support.',
    103: 'Reclaimed water is treated wastewater reused for authorized applications such as agricultural irrigation or other uses defined by regulation.',
    104: 'Wastewater is water affected by domestic, industrial or process use before treatment or discharge. It can indicate microbial load, source pressure and treatment needs.',
    105: 'CIP is cleaning in place of industrial lines, equipment or circuits without full disassembly. Rinse or process water may require microbiological control.',
    106: 'Chlorination is a disinfection step that uses chlorine compounds to reduce microbial risk. Its effectiveness depends on dose, contact time, water quality and target organisms.',
    107: 'Hydroponics is crop production without soil, using nutrient solutions and recirculating water. Microbiological control helps protect crops, workers and process consistency.',
    108: 'A packhouse is a post-harvest facility where produce is received, washed, handled, packed or stored. Water used there can become a critical quality-control point.',
    109: 'A terminal point is the final outlet or point of use in a water system, such as a tap, shower, hose or process connection where exposure or sampling may occur.',
    110: 'Agricultural irrigation is the application of water to crops through drip, sprinkler, surface or other systems. Its risk profile depends on crop, contact and water quality.',
    111: 'Turbidity is the cloudiness of water caused by suspended particles. It can affect treatment performance, disinfection efficiency and interpretation of water-quality changes.',
    112: 'UV disinfection uses ultraviolet light to inactivate microorganisms. Performance depends on UV dose, water transmittance, lamp condition, hydraulics and target organism.',
    116: 'A deviation is an incident or nonconformity against a plan, procedure, criterion or expectation. It should be documented, assessed and closed according to procedure.',
    118: 'A validation dossier is a document package containing objective, method, plan, samples, results, deviations, approvals and validation conclusion.',
    120: 'Technical review is the evaluation of results, evidence, controls and consistency before approval or report issuance.',
    121: 'An SOP is a standard operating procedure that describes how to perform an activity in a controlled and repeatable way.',
    123: 'Method validation is the formal process used to demonstrate that a method is suitable for its intended use under defined conditions.',
    124: 'Method verification confirms that a laboratory can properly perform an established method in its own environment, scope and matrices.',
    126: 'An authorized distributor is an approved commercial partner that sells AquaVerify products, provides local support, facilitates inventory and channels opportunities in its territory.',
    129: 'White label is a commercial model in which a product or solution is presented under the partner’s brand, with defined scope, documentation and responsibilities.',
    130: 'OEM is a model in which a product, kit or solution is offered under adapted conditions for a partner, manufacturer, integrator or own-brand program.'
  },
  fr: {
    0: 'L’adénovirus est un virus entérique capable de persister dans certaines conditions environnementales et utilisé dans certains contextes comme référence pour évaluer la persistance virale dans l’eau.',
    1: 'Une bactérie viable est un micro-organisme capable de rester vivant et, selon les conditions, de croître ou de former des colonies détectables par des méthodes de culture.',
    4: 'La charge microbienne est le niveau de micro-organismes présents dans un échantillon ou un système. Elle peut s’exprimer dans différentes unités selon la méthode et l’organisme évalué.',
    7: 'Les coliphages F-ARN sont un sous-groupe de coliphages F-spécifiques à génome ARN. Ils peuvent être utilisés dans des études de contamination fécale et de comportement viral selon la méthode, la matrice et l’objectif du programme.',
    14: 'Le Microbial Source Tracking regroupe des approches permettant d’inférer l’origine probable d’une contamination microbienne, par exemple humaine, animale, environnementale ou mixte.',
    16: 'Le norovirus est un virus entérique majeur en santé publique, associé à des épidémies gastro-intestinales. Dans l’eau, il est généralement traité par surveillance spécifique ou indicateurs, plutôt que comme analyse routinière universelle.',
    17: 'Un pathogène est un micro-organisme capable de provoquer une maladie. Dans l’eau, son contrôle repose sur barrières, indicateurs, surveillance spécifique et plans de risque.',
    18: 'Pseudomonas aeruginosa est une bactérie opportuniste pertinente dans certains contrôles d’eau, notamment lorsque biofilm, eau récréative, installations ou produits sensibles peuvent être impliqués.',
    22: 'EPA Method 1601 est une méthode EPA pour coliphages F+ et somatiques utilisant un enrichissement en deux étapes, selon le champ de la méthode.',
    23: 'EPA Method 1602 est une méthode EPA pour coliphages F+ et somatiques utilisant une procédure de couche d’agar simple, selon le champ de la méthode.',
    24: 'HACCP est un système préventif d’analyse des dangers et points critiques de contrôle utilisé en sécurité alimentaire. Pour l’eau de process, il aide à définir points de contrôle et preuves.',
    27: 'ISO 11731 est une norme internationale pour le dénombrement de Legionella dans l’eau. Elle est pertinente pour les programmes de contrôle des installations, ECS, tours, spas et systèmes à risque d’aérosolisation.',
    29: 'ISO 22000 est une norme internationale de systèmes de management de la sécurité alimentaire. Elle peut concerner le contrôle de l’eau utilisée comme ingrédient, auxiliaire de process ou eau de nettoyage.',
    30: 'ISO 5667-1 est une norme générale sur la conception des programmes de prélèvement d’eau et les techniques de prélèvement.',
    31: 'ISO 7899-2 est une norme pour la détection et le dénombrement des entérocoques intestinaux dans l’eau par filtration sur membrane, selon le champ de la norme.',
    37: 'Le Décret royal 742/2013 est le cadre technico-sanitaire espagnol pour les piscines. Il concerne le contrôle qualité, l’exploitation, les risques microbiologiques et la documentation.',
    39: 'La Revised Total Coliform Rule est la règle américaine sur les coliformes totaux dans l’eau potable. Elle ne doit pas être confondue avec les méthodes coliphages, qui répondent à une autre question technique.',
    41: 'Un blanc de méthode est un contrôle qui accompagne le processus analytique sans échantillon cible afin de détecter une contamination introduite lors de la préparation, des réactifs ou de la manipulation.',
    42: 'La chaîne du froid correspond aux conditions de température contrôlée maintenues pendant le transport et le stockage d’un échantillon ou matériau sensible.',
    43: 'Un contrôle négatif est un matériau ou une condition qui ne doit pas produire de signal et aide à détecter contamination, faux positifs ou erreurs de manipulation.',
    44: 'Un contrôle positif est un matériau ou une condition qui doit produire la réponse attendue et confirme que la méthode peut détecter la cible.',
    45: 'Double Agar Layer est une procédure classique à double couche d’agar utilisée dans les essais de bactériophages, où une couche supérieure contenant échantillon et hôte est versée sur une base d’agar.',
    46: 'L’enrichissement est une étape analytique qui favorise la croissance ou multiplication d’un micro-organisme cible avant sa détection.',
    49: 'L’incubation consiste à maintenir un échantillon ou une culture sous température et durée contrôlées pour permettre croissance, réaction ou lecture microbiologique.',
    51: 'La limite de quantification est la plus faible concentration quantifiable avec une performance acceptable dans des conditions de méthode définies.',
    54: 'Un échantillon composite est formé par combinaison de plusieurs sous-échantillons prélevés à différents points ou moments selon un plan défini.',
    55: 'Un échantillon ponctuel est prélevé à un moment et un point précis. Il représente les conditions de cet instant et de ce lieu.',
    56: 'Le nombre le plus probable est une méthode statistique pour estimer la concentration de micro-organismes à partir de schémas présence/absence en tubes ou puits.',
    59: 'La récupération est le pourcentage ou la proportion du micro-organisme cible que la méthode parvient à récupérer par rapport à une quantité connue ou attendue.',
    60: 'La répétabilité est le degré d’accord entre résultats obtenus dans des conditions similaires : même méthode, opérateur, équipement et laboratoire sur un court intervalle.',
    61: 'La reproductibilité est le degré d’accord entre résultats obtenus dans des conditions variables, par exemple différents laboratoires, opérateurs ou jours.',
    62: 'Single Agar Layer est une procédure utilisée dans certaines méthodes coliphages pour mélanger échantillon, hôte et milieu avant incubation.',
    113: 'L’approbation est la décision formelle confirmant qu’un enregistrement, résultat, feuille de travail, rapport ou dossier respecte les critères et peut avancer.',
    114: 'CAPA désigne une action corrective et préventive visant à résoudre une cause et éviter la répétition d’une déviation ou non-conformité.',
    115: 'Le contrôle documentaire gère versions, validité, distribution et revue de documents comme SOP, protocoles, rapports et dossiers.',
    117: 'Un dossier est un paquet documentaire résumant les informations critiques pour revue, approbation, audit ou transfert.',
    119: 'Une non-conformité est le non-respect d’une exigence spécifiée, qu’elle soit réglementaire, procédurale, contractuelle ou liée au système qualité.',
    122: 'Le Tech Transfer est le transfert structuré de connaissance, procédé, méthode ou produit de la R&D ou validation vers production, qualité ou opérations.',
    125: 'Le co-branding est un modèle dans lequel AquaVerify et un partenaire partagent la présence de marque sur produit, documentation, formation ou campagnes.',
    127: 'Un kit sous marque propre est un modèle partenaire où packaging, documentation ou marque peuvent être adaptés selon l’accord et l’usage prévu.',
    128: 'Le lead routing est le processus d’affectation des opportunités commerciales à l’équipe interne, au distributeur, au territoire ou au partenaire approprié.',
    131: 'L’onboarding technique est la formation initiale permettant à un distributeur ou client de comprendre produit, méthode, usage, limites, support et documentation.',
    132: 'Un playbook commercial est un document opérationnel qui aide à qualifier les opportunités, expliquer les produits, adapter les messages par secteur et définir les étapes suivantes.',
    133: 'Un revendeur technique est un partenaire qui combine vente et connaissance technique pour recommander le produit, orienter l’usage et escalader les cas complexes.',
    134: 'Un territoire est une zone géographique ou un marché assigné ou évalué pour l’activité commerciale, le support, l’inventaire ou la distribution.',
    2: 'Un bactériophage est un virus qui infecte des bactéries spécifiques et s’y réplique. En qualité de l’eau, il sert de modèle ou d’indicateur viral pour étudier la contamination fécale, le comportement face aux traitements et l’efficacité des barrières microbiologiques.',
    3: 'Un biofilm est une communauté de micro-organismes fixée à une surface et protégée par une matrice extracellulaire. Dans les réseaux d’eau, il peut agir comme réservoir microbien et favoriser la recontamination.',
    5: 'Une souche hôte est la bactérie utilisée comme hôte pour détecter ou dénombrer les bactériophages dans les méthodes de culture. Son choix est critique pour la sensibilité de l’essai et l’interprétation.',
    6: 'Les coliformes totaux sont un groupe large de bactéries indicatrices pouvant provenir du sol, de l’eau ou d’environnements fécaux. Ils servent à évaluer l’intégrité des systèmes, l’efficacité du traitement et les dérives opérationnelles.',
    8: 'Les coliphages F-spécifiques infectent les bactéries hôtes via les pili F. Ils sont utilisés dans des contextes méthodologiques et comparatifs pour étudier le comportement viral, l’origine ou les voies de contamination.',
    9: 'Les coliphages somatiques infectent Escherichia coli et d’autres entérobactéries via des récepteurs de la paroi cellulaire. Ils sont utilisés comme indicateurs viraux opérationnels dans les programmes de qualité de l’eau et l’évaluation des traitements.',
    10: 'La contamination fécale désigne la présence ou l’indice de matière fécale humaine ou animale dans une matrice d’eau. Elle s’évalue avec des indicateurs comme E. coli, les entérocoques, les coliformes et, dans certains programmes, les coliphages.',
    11: 'Les entérocoques intestinaux sont des bactéries Gram positives associées au tractus gastro-intestinal humain et animal. Leur persistance relative en fait des indicateurs utiles pour les eaux récréatives, environnementales et certains plans de contrôle.',
    12: 'Escherichia coli est une bactérie coliforme thermotolérante utilisée mondialement comme indicateur de contamination fécale récente. Sa présence dans l’eau potable exige généralement une investigation et une action corrective selon le cadre applicable.',
    13: 'Legionella est un genre bactérien associé aux risques dans les installations d’eau générant des aérosols, comme l’ECS, les douches, spas, tours ou systèmes de climatisation. Son contrôle nécessite plan, prélèvement, laboratoire et actions documentées.',
    15: 'Un micro-organisme indicateur est un micro-organisme dont la présence ou la concentration sert à déduire une contamination, l’efficacité d’un traitement ou la dégradation d’un système d’eau.',
    19: 'UFP signifie unité formant plage, utilisée pour exprimer les particules virales infectieuses capables de générer des plages de lyse dans un essai en plaque.',
    20: 'Les virus entériques sont associés au tractus intestinal et peuvent être transmis par une eau contaminée. Ils incluent des familles d’intérêt sanitaire comme norovirus, adénovirus ou entérovirus selon le contexte de surveillance.',
    21: 'La Directive (UE) 2020/2184 encadre la qualité des eaux destinées à la consommation humaine. Elle renforce l’approche fondée sur le risque et prévoit les coliphages somatiques dans l’évaluation des traitements lorsque cela s’applique.',
    25: 'ISO 10705-1 fait partie de la série ISO 10705 et porte sur les méthodes relatives aux coliphages F-spécifiques ARN selon le champ et la version applicables.',
    26: 'ISO 10705-2 spécifie une méthode de détection et de dénombrement des coliphages somatiques par incubation de l’échantillon avec une souche hôte appropriée.',
    28: 'ISO 19458 est une norme de référence pour la planification du prélèvement microbiologique de l’eau, les procédures de prélèvement, le transport, la manipulation et le stockage avant analyse.',
    32: 'ISO 9308 est une série de normes pour la détection et le dénombrement d’Escherichia coli et des bactéries coliformes dans l’eau, avec des approches comme la filtration sur membrane ou le NPP selon la partie applicable.',
    33: 'ISO/IEC 17025 est la norme relative à la compétence des laboratoires d’essais et d’étalonnage. En analyse de l’eau, elle concerne la validité des résultats, la traçabilité, la maîtrise documentaire, la compétence technique et le système qualité.',
    34: 'Un plan de sécurité sanitaire de l’eau est un plan documenté qui identifie risques, contrôles, points de prélèvement, responsabilités, suivi et actions correctives dans un système d’eau.',
    35: 'Le Décret royal 3/2023 est le cadre espagnol définissant les critères technico-sanitaires de qualité, contrôle et fourniture de l’eau potable. Il est clé pour les opérateurs, laboratoires et responsables de l’eau en Espagne.',
    36: 'Le Décret royal 487/2022 est la réglementation espagnole sur la prévention et le contrôle de la légionellose dans les installations pouvant générer une exposition aux aérosols.',
    38: 'Le Règlement (UE) 2020/741 établit les exigences minimales pour la réutilisation de l’eau dans l’Union européenne, notamment pour l’irrigation agricole.',
    40: 'Un Water Safety Plan est une approche préventive de gestion du risque hydrique couvrant le parcours du captage à l’usager, en combinant dangers, contrôles, suivi et actions correctives.',
    47: 'Un essai en plaque est une méthode de culture qui quantifie les bactériophages par des plages de lyse visibles sur un tapis bactérien.',
    48: 'La filtration sur membrane consiste à filtrer un volume d’eau puis à incuber la membrane sur un milieu afin de récupérer et compter les micro-organismes.',
    50: 'La lyse cellulaire est la rupture d’une cellule bactérienne, par exemple après réplication d’un bactériophage, libérant de nouvelles particules virales et produisant une zone de lyse visible.',
    52: 'La limite de détection est le plus faible niveau d’analyte ou de micro-organisme qu’une méthode peut détecter dans des conditions définies, sans impliquer nécessairement une quantification exacte.',
    53: 'La matrice est le type d’échantillon ou d’environnement analysé, comme l’eau potable, l’eau régénérée, la piscine, l’eau résiduaire, l’eau de surface, l’eau de process ou l’eau d’irrigation.',
    57: 'Un résultat hors spécification est un résultat situé hors d’une limite, d’un critère ou d’une plage définis. Il exige une revue, une investigation ou une action selon la procédure.',
    58: 'Un point de prélèvement est l’emplacement physique ou la source où l’échantillon est prélevé. Il doit être relié au client, à la matrice, au plan analytique et à la traçabilité.',
    63: 'Le temps de réponse est le délai entre le prélèvement ou la réception d’un échantillon et l’obtention puis la communication d’un résultat exploitable.',
    64: '21 CFR Part 11 est le cadre américain relatif aux enregistrements électroniques et signatures électroniques dans certains contextes régulés par la FDA. Son applicabilité dépend de l’environnement et de l’usage prévu.',
    65: 'ALCOA+ regroupe des principes d’intégrité des données: attribuable, lisible, contemporain, original, exact, ainsi que des critères élargis comme complet, cohérent, durable et disponible.',
    66: 'AquaLab est l’espace d’AquaVerify Cloud dédié aux opérations de laboratoire, LIMS, protocoles, ELN, validations et R&D.',
    67: 'AquaVerify Cloud est la plateforme digitale d’AquaVerify qui connecte CRM, LIMS, ELN, CoA, portail client, inventaire, logistique, finances, tableaux de bord et AquaAI selon la configuration.',
    68: 'Un audit trail est l’historique traçable des événements, changements, utilisateurs, dates, décisions et signatures associés à un enregistrement.',
    69: 'La chaîne de custodie digitale est l’enregistrement électronique documentant qui a prélevé, reçu, manipulé, analysé, revu et approuvé un échantillon ou un résultat.',
    70: 'Un certificat d’analyse est un rapport formel résumant l’échantillon, le contexte, les résultats, les unités, la méthode, la revue et la livraison au client ou à l’audit.',
    71: 'Un CRM organise clients, opportunités, contacts et suivi commercial. Dans AquaVerify, il peut se connecter aux produits, échantillons, devis et canaux partenaires.',
    72: 'Un dashboard LIMS est un tableau opérationnel qui synthétise échantillons, feuilles de travail, statuts, charge, tâches en attente et accès rapides du laboratoire.',
    73: 'Un ELN est un cahier électronique de laboratoire utilisé pour documenter expériences, exécutions, preuves, matériaux, revues et signatures.',
    74: 'Une signature électronique confirme numériquement la revue, l’approbation ou la clôture d’un enregistrement selon les permissions et la procédure définies.',
    75: 'GxP désigne des cadres de bonnes pratiques applicables dans des environnements régulés, comme GMP, GLP ou GDP selon l’activité.',
    76: 'Une feuille de travail regroupe des échantillons ou résultats assignés à un analyste pour exécution, saisie et revue par lot de travail.',
    77: 'Un LIMS est un système de gestion de l’information de laboratoire qui organise échantillons, résultats, feuilles de travail, rapports, utilisateurs, statuts et traçabilité.',
    78: 'Un portail client est une interface permettant aux clients ou utilisateurs autorisés de consulter demandes, échantillons, rapports ou résultats publiés.',
    79: 'Le SaaS est un modèle logiciel cloud dans lequel l’application est hébergée et mise à jour centralement. En laboratoire, il facilite l’accès sécurisé, la scalabilité et le déploiement sans serveurs locaux.',
    80: 'Sample Hub est une vue centralisée des échantillons où consulter contexte, résultats, statuts, étiquettes, rapports et actions associées.',
    81: 'Un SLA est un engagement ou objectif de délai pour réaliser une action, un rapport, une revue ou un service. En laboratoire, il peut concerner le TAT ou le TTR.',
    82: 'Le turnaround time est le temps de cycle entre la réception ou l’entrée d’un échantillon et la livraison du rapport ou résultat final.',
    83: 'Un tenant est l’espace logique d’une organisation dans une plateforme SaaS. Il encadre données, permissions, utilisateurs et configuration.',
    84: 'La traçabilité analytique est la capacité à reconstruire l’historique complet d’un échantillon, d’une méthode, d’un lot, d’un opérateur, d’un résultat, d’une revue et d’un rapport.',
    85: 'Un WMS est un système de gestion d’entrepôt qui coordonne stocks, emplacements, mouvements et préparation logistique. Dans AquaVerify, il peut se relier aux produits, lots et commandes.',
    86: 'Le workflow owner est l’utilisateur ou le rôle responsable de la prochaine étape opérationnelle dans un flux de travail.',
    88: 'Le contrôle qualité interne regroupe les contrôles, revues et enregistrements utilisés par le laboratoire pour vérifier qu’une méthode ou un essai fonctionne correctement.',
    89: 'ENUMERA est la famille AquaVerify orientée vers les résultats quantitatifs et le dénombrement microbiologique de l’eau selon le produit, la matrice et le flux applicable.',
    90: 'INDICA est la famille AquaVerify orientée vers les réponses présence/absence, le screening et la vérification opérationnelle de l’eau.',
    91: 'Un kit de détection rapide est un système préformulé ou simplifié visant à réduire les manipulations, standardiser les étapes et accélérer la lecture par rapport aux flux traditionnels, selon l’usage prévu.',
    92: 'Les kits ISO/EPA sont des kits et flux techniques AquaVerify orientés vers des méthodes ou références ISO/EPA lorsque le plan analytique l’exige.',
    93: 'Lab Essentials désigne les matériaux, milieux, contrôles, réactifs et consommables préparés pour soutenir l’exécution microbiologique au laboratoire.',
    94: 'Un lot de kit est l’identifiant de fabrication ou de fourniture associé à un kit ou composant. Il doit être relié aux résultats lorsqu’il affecte traçabilité, qualité ou validation.',
    95: 'Un milieu de culture est une préparation nutritive ou sélective permettant la croissance, la détection ou la différenciation de micro-organismes dans des conditions définies.',
    98: 'L’eau chaude sanitaire est un système d’eau chaude dans les bâtiments et installations. Elle peut être pertinente dans les programmes de prévention de Legionella et de contrôle du risque par aérosolisation.',
    99: 'L’aérosolisation est la formation ou libération de fines gouttelettes pouvant transporter des micro-organismes de l’eau vers l’air. Elle est pertinente pour douches, tours, spas et installations à risque.',
    100: 'L’eau brute est l’eau captée avant traitement. Son contrôle aide à comprendre la charge initiale, le risque et l’efficacité des procédés ultérieurs.',
    101: 'L’eau potable est l’eau destinée à la consommation humaine, soumise à des critères sanitaires, de contrôle et de fourniture selon le cadre applicable.',
    102: 'L’eau de process est l’eau utilisée dans une opération industrielle ou alimentaire comme ingrédient, eau de contact, nettoyage, refroidissement, recirculation ou support de procédé.',
    103: 'L’eau régénérée est une eau usée traitée pour être réutilisée dans des usages autorisés, comme l’irrigation agricole ou d’autres usages définis par la réglementation.',
    104: 'L’eau usée est une eau affectée par un usage domestique, industriel ou de procédé avant traitement ou rejet. Elle renseigne sur charge microbienne, pression de source et besoins de traitement.',
    105: 'Le CIP est le nettoyage en place de lignes, équipements ou circuits industriels sans démontage complet. L’eau de rinçage ou de process peut nécessiter un contrôle microbiologique.',
    106: 'La chloration est une étape de désinfection utilisant des composés chlorés pour réduire le risque microbien. Son efficacité dépend de la dose, du temps de contact, de la qualité de l’eau et des organismes ciblés.',
    107: 'L’hydroponie est une production végétale sans sol utilisant des solutions nutritives et de l’eau recirculée. Le contrôle microbiologique aide à protéger cultures, opérateurs et régularité du procédé.',
    108: 'Un packhouse est une installation post-récolte où les produits sont reçus, lavés, manipulés, conditionnés ou stockés. L’eau utilisée peut devenir un point critique de contrôle qualité.',
    109: 'Un point terminal est la sortie finale ou le point d’usage d’un système d’eau, par exemple robinet, douche, tuyau ou raccord procédé où exposition ou prélèvement peuvent avoir lieu.',
    110: 'L’irrigation agricole est l’application d’eau aux cultures par goutte-à-goutte, aspersion, surface ou autres systèmes. Son profil de risque dépend de la culture, du contact et de la qualité de l’eau.',
    111: 'La turbidité est l’aspect trouble de l’eau causé par des particules en suspension. Elle peut affecter la performance de traitement, l’efficacité de désinfection et l’interprétation des changements de qualité.',
    112: 'La désinfection UV utilise la lumière ultraviolette pour inactiver des micro-organismes. La performance dépend de la dose UV, de la transmission de l’eau, de l’état des lampes, de l’hydraulique et de l’organisme ciblé.',
    116: 'Une déviation est une incidence ou non-conformité par rapport à un plan, une procédure, un critère ou une attente. Elle doit être documentée, évaluée et clôturée selon la procédure.',
    118: 'Un dossier de validation est un ensemble documentaire réunissant objectif, méthode, plan, échantillons, résultats, déviations, approbations et conclusion de validation.',
    120: 'La revue technique est l’évaluation des résultats, preuves, contrôles et cohérence avant approbation ou émission du rapport.',
    121: 'Un SOP est une procédure opératoire standard décrivant comment exécuter une activité de manière contrôlée et répétable.',
    123: 'La validation de méthode est le processus formel visant à démontrer qu’une méthode est adaptée à l’usage prévu dans des conditions définies.',
    124: 'La vérification de méthode confirme qu’un laboratoire peut exécuter correctement une méthode établie dans son environnement, son champ et ses matrices.',
    126: 'Un distributeur autorisé est un partenaire commercial approuvé pour vendre les produits AquaVerify, offrir un support local, faciliter l’inventaire et canaliser les opportunités sur son territoire.',
    129: 'La marque blanche est un modèle commercial dans lequel un produit ou une solution est présenté sous la marque du partenaire, avec périmètre, documentation et responsabilités définis.',
    130: 'L’OEM est un modèle dans lequel un produit, kit ou solution est proposé sous conditions adaptées pour un partenaire, fabricant, intégrateur ou programme de marque propre.'
  },
  it: {
    0: 'L’adenovirus è un virus enterico resistente in determinate condizioni ambientali e usato in alcuni contesti come riferimento per valutare la persistenza virale nell’acqua.',
    1: 'Un batterio vitale è un microrganismo capace di restare vivo e, secondo le condizioni, crescere o formare colonie rilevabili con metodi colturali.',
    4: 'La carica microbica è il livello di microrganismi presenti in un campione o sistema. Può essere espressa in unità diverse secondo metodo e organismo valutato.',
    7: 'I colifagi F-RNA sono un sottogruppo di colifagi F-specifici con genoma RNA. Possono essere usati in studi di contaminazione fecale e comportamento virale secondo metodo, matrice e obiettivo del programma.',
    14: 'Il Microbial Source Tracking comprende approcci per inferire la probabile origine di una contaminazione microbica, ad esempio umana, zootecnica, ambientale o mista.',
    16: 'Il norovirus è un virus enterico di grande rilevanza per la salute pubblica, associato a focolai gastrointestinali. Nell’acqua si affronta di norma con sorveglianza specifica o indicatori, non come test routinario universale.',
    17: 'Un patogeno è un microrganismo capace di causare malattia. Nell’acqua il controllo dei patogeni si gestisce tramite barriere, indicatori, sorveglianza specifica e piani di rischio.',
    18: 'Pseudomonas aeruginosa è un batterio opportunista rilevante in alcuni controlli dell’acqua, soprattutto dove possono esserci biofilm, acque ricreative, impianti o prodotti sensibili.',
    22: 'EPA Method 1601 è un metodo EPA per colifagi F+ e somatici tramite arricchimento in due fasi, secondo il campo del metodo.',
    23: 'EPA Method 1602 è un metodo EPA per colifagi F+ e somatici tramite procedura a singolo strato di agar, secondo il campo del metodo.',
    24: 'HACCP è un sistema preventivo di analisi dei pericoli e punti critici di controllo usato nella sicurezza alimentare. Per l’acqua di processo aiuta a definire punti di controllo ed evidenze.',
    27: 'ISO 11731 è una norma internazionale per enumerare Legionella in acqua. È rilevante per programmi di controllo di impianti, ACS, torri, spa e sistemi con rischio di aerosolizzazione.',
    29: 'ISO 22000 è una norma internazionale per sistemi di gestione della sicurezza alimentare. Può collegarsi al controllo dell’acqua usata come ingrediente, processo o pulizia.',
    30: 'ISO 5667-1 è una norma generale sulla progettazione dei programmi di campionamento e sulle tecniche di campionamento dell’acqua.',
    31: 'ISO 7899-2 è una norma per rilevare e contare enterococchi intestinali in acqua mediante filtrazione su membrana, secondo il campo della norma.',
    37: 'Il Regio Decreto 742/2013 è il quadro tecnico-sanitario spagnolo per piscine. Riguarda controllo qualità, gestione, rischi microbiologici e documentazione.',
    39: 'La Revised Total Coliform Rule è la regola statunitense sui coliformi totali nell’acqua potabile. Non va confusa con i metodi per colifagi, che rispondono a un’altra domanda tecnica.',
    41: 'Il bianco di metodo è un controllo che accompagna il processo analitico senza campione target per rilevare contaminazioni introdotte durante preparazione, reagenti o manipolazione.',
    42: 'La catena del freddo è l’insieme delle condizioni di temperatura controllata mantenute durante trasporto e conservazione di un campione o materiale sensibile.',
    43: 'Un controllo negativo è un materiale o condizione che non deve produrre segnale e aiuta a rilevare contaminazione, falsi positivi o errori di manipolazione.',
    44: 'Un controllo positivo è un materiale o condizione che deve produrre la risposta attesa e conferma che il metodo può rilevare il target.',
    45: 'Double Agar Layer è una procedura classica a doppio strato di agar usata nei saggi sui batteriofagi, dove uno strato superiore con campione e ospite viene versato su una base di agar.',
    46: 'L’arricchimento è una fase analitica che favorisce crescita o moltiplicazione del microrganismo target prima della rilevazione.',
    49: 'L’incubazione mantiene campione o coltura a temperatura e tempo controllati per permettere crescita, reazione o lettura microbiologica.',
    51: 'Il limite di quantificazione è la concentrazione minima quantificabile con prestazioni accettabili in condizioni definite del metodo.',
    54: 'Un campione composito è formato combinando più sottocampioni prelevati in punti o momenti diversi secondo un piano definito.',
    55: 'Un campione puntuale è prelevato in un momento e punto specifico. Rappresenta le condizioni di quell’istante e luogo.',
    56: 'Il numero più probabile è un metodo statistico per stimare la concentrazione di microrganismi da schemi presenza/assenza in tubi o pozzetti.',
    59: 'Il recupero è la percentuale o proporzione del microrganismo target che il metodo riesce a recuperare rispetto a una quantità nota o attesa.',
    60: 'La ripetibilità è il grado di concordanza tra risultati ottenuti in condizioni simili: stesso metodo, operatore, apparecchiatura e laboratorio in breve intervallo.',
    61: 'La riproducibilità è il grado di concordanza tra risultati ottenuti in condizioni variabili, come laboratori, operatori o giorni diversi.',
    62: 'Single Agar Layer è una procedura usata in alcuni metodi per colifagi per miscelare campione, ospite e terreno prima dell’incubazione.',
    113: 'L’approvazione è la decisione formale che conferma che un record, risultato, foglio, report o dossier soddisfa i criteri e può avanzare.',
    114: 'CAPA indica azione correttiva e preventiva per risolvere una causa ed evitare la ripetizione di una deviazione o non conformità.',
    115: 'Il controllo documentale gestisce versioni, validità, distribuzione e revisione di documenti come SOP, protocolli, report e dossier.',
    117: 'Un dossier è un pacchetto documentale che riassume informazioni critiche per revisione, approvazione, audit o trasferimento.',
    119: 'Una non conformità è il mancato rispetto di un requisito specificato, normativo, procedurale, contrattuale o del sistema qualità.',
    122: 'Il Tech Transfer è il trasferimento strutturato di conoscenza, processo, metodo o prodotto da R&S o validazione verso produzione, qualità o operazioni.',
    125: 'Il co-branding è un modello in cui AquaVerify e un partner condividono presenza di marca su prodotto, documentazione, formazione o campagne.',
    127: 'Un kit a marchio proprio è un modello partner in cui packaging, documentazione o marca possono essere adattati secondo accordo e uso previsto.',
    128: 'Il lead routing è il processo di assegnazione delle opportunità commerciali al team interno, distributore, territorio o partner adeguato.',
    131: 'L’onboarding tecnico è la formazione iniziale che consente a distributore o cliente di comprendere prodotto, metodo, uso, limiti, supporto e documentazione.',
    132: 'Un playbook commerciale è un documento operativo che aiuta a qualificare opportunità, spiegare prodotti, adattare messaggi per settore e definire passi successivi.',
    133: 'Un rivenditore tecnico è un partner che combina vendita e conoscenza tecnica per raccomandare prodotti, orientare l’uso e indirizzare casi complessi.',
    134: 'Il territorio è l’area geografica o mercato assegnato o valutato per attività commerciale, supporto, inventario o distribuzione.',
    2: 'Un batteriofago è un virus che infetta batteri specifici e si replica al loro interno. Nella qualità dell’acqua viene usato come modello o indicatore virale per studiare contaminazione fecale, comportamento ai trattamenti ed efficacia delle barriere microbiologiche.',
    3: 'Il biofilm è una comunità microbica aderente a una superficie e protetta da una matrice extracellulare. Nelle reti idriche può agire come serbatoio di microrganismi e favorire ricontaminazioni.',
    5: 'Il ceppo ospite è il batterio utilizzato come ospite per rilevare o enumerare batteriofagi nei metodi colturali. La sua scelta è critica per sensibilità del saggio e interpretazione.',
    6: 'I coliformi totali sono un ampio gruppo di batteri indicatori presenti in suolo, acqua o ambienti fecali. Servono a valutare integrità dei sistemi, efficacia del trattamento e possibili problemi operativi.',
    8: 'I colifagi F-specifici infettano batteri ospiti tramite pili F. Sono usati in contesti metodologici e comparativi per valutare comportamento virale, origine o vie di contaminazione.',
    9: 'I colifagi somatici infettano Escherichia coli e altre enterobatteriacee tramite recettori della parete cellulare. Sono usati come indicatori virali operativi nei programmi di qualità dell’acqua e nella valutazione dei trattamenti.',
    10: 'La contaminazione fecale è la presenza o evidenza di materiale fecale umano o animale in una matrice acquosa. Si valuta con indicatori come E. coli, enterococchi, coliformi e, in alcuni programmi, colifagi.',
    11: 'Gli enterococchi intestinali sono batteri Gram-positivi associati al tratto gastrointestinale umano e animale. La loro persistenza relativa li rende indicatori utili in acque ricreative, ambientali e piani di controllo selezionati.',
    12: 'Escherichia coli è un batterio coliforme termotollerante usato globalmente come indicatore di contaminazione fecale recente. La sua presenza in acqua potabile richiede in genere indagine e azione correttiva secondo il quadro applicabile.',
    13: 'Legionella è un genere batterico associato a rischi in impianti idrici che generano aerosol, come ACS, docce, spa, torri o climatizzazione. Il controllo richiede piano, campionamento, laboratorio e azioni documentate.',
    15: 'Un microrganismo indicatore è un microrganismo la cui presenza o concentrazione viene usata per dedurre contaminazione, efficacia di trattamento o deterioramento di un sistema idrico.',
    19: 'UFP/PFU indica unità formante placca, usata per esprimere particelle virali infettive capaci di generare placche di lisi in un saggio in placca.',
    20: 'I virus enterici sono virus associati al tratto intestinale che possono trasmettersi tramite acqua contaminata. Includono gruppi di interesse sanitario come norovirus, adenovirus o enterovirus secondo il contesto di sorveglianza.',
    21: 'La Direttiva (UE) 2020/2184 disciplina la qualità delle acque destinate al consumo umano. Rafforza l’approccio basato sul rischio e considera i colifagi somatici nella valutazione dei trattamenti quando applicabile.',
    25: 'ISO 10705-1 fa parte della serie ISO 10705 e riguarda metodi per colifagi F-specifici a RNA secondo campo di applicazione e versione applicabile.',
    26: 'ISO 10705-2 specifica un metodo per rilevare ed enumerare colifagi somatici incubando il campione con un ceppo ospite adeguato.',
    28: 'ISO 19458 è una norma di riferimento per pianificazione del campionamento microbiologico dell’acqua, procedure di prelievo, trasporto, manipolazione e conservazione prima dell’analisi.',
    32: 'ISO 9308 è una serie di norme per rilevare e contare Escherichia coli e batteri coliformi in acqua, con approcci come filtrazione su membrana o MPN secondo la parte applicabile.',
    33: 'ISO/IEC 17025 è la norma per la competenza dei laboratori di prova e taratura. Nell’analisi dell’acqua riguarda risultati validi, tracciabilità, controllo documentale, competenza tecnica e sistema qualità.',
    34: 'Un Water Safety Plan è un piano documentato che identifica rischi, controlli, punti di campionamento, responsabilità, monitoraggio e azioni correttive in un sistema idrico.',
    35: 'Il Regio Decreto 3/2023 è il quadro spagnolo che definisce criteri tecnico-sanitari per qualità, controllo e fornitura dell’acqua potabile.',
    36: 'Il Regio Decreto 487/2022 è la normativa spagnola per prevenzione e controllo della legionellosi in impianti che possono generare esposizione ad aerosol.',
    38: 'Il Regolamento (UE) 2020/741 stabilisce requisiti minimi per il riutilizzo dell’acqua nell’Unione europea, in particolare per l’irrigazione agricola.',
    40: 'Il Water Safety Plan è un approccio preventivo alla gestione del rischio idrico dal captaggio all’utente, combinando pericoli, controlli, monitoraggio e azioni correttive.',
    47: 'Il saggio in placca è un metodo colturale che quantifica batteriofagi tramite placche di lisi visibili su un tappeto batterico.',
    48: 'La filtrazione su membrana filtra un volume d’acqua e incuba la membrana su un terreno per recuperare e contare microrganismi.',
    50: 'La lisi cellulare è la rottura di una cellula batterica, ad esempio dopo replicazione fagica, con rilascio di particelle virali e zona di lisi visibile.',
    52: 'Il limite di rilevazione è il livello minimo di analita o microrganismo rilevabile da un metodo in condizioni definite, senza implicare necessariamente quantificazione esatta.',
    53: 'La matrice è il tipo di campione o ambiente analizzato, come acqua potabile, rigenerata, piscina, reflua, superficiale, di processo o irrigazione.',
    57: 'Un risultato fuori specifica è un risultato fuori da un limite, criterio o intervallo definito. Richiede revisione, indagine o azione secondo procedura.',
    58: 'Il punto di campionamento è il luogo fisico o la fonte da cui si preleva il campione. Deve collegarsi a cliente, matrice, piano analitico e tracciabilità.',
    63: 'Il tempo di risposta è il tempo tra prelievo o ricezione del campione e ottenimento e comunicazione di un risultato utilizzabile.',
    64: '21 CFR Part 11 è il quadro statunitense per record elettronici e firme elettroniche in determinati contesti regolati dalla FDA. L’applicabilità dipende da ambiente e uso previsto.',
    65: 'ALCOA+ raccoglie principi di integrità dei dati: attribuibile, leggibile, contemporaneo, originale, accurato, oltre a criteri estesi come completo, coerente, durevole e disponibile.',
    66: 'AquaLab è l’area di AquaVerify Cloud dedicata a operatività di laboratorio, LIMS, protocolli, ELN, validazioni e R&S.',
    67: 'AquaVerify Cloud è la piattaforma digitale AquaVerify che collega CRM, LIMS, ELN, CoA, portale cliente, inventario, logistica, finanza, dashboard e AquaAI secondo configurazione.',
    68: 'Un audit trail è lo storico tracciabile di eventi, modifiche, utenti, date, decisioni e firme associati a un record.',
    69: 'La catena di custodia digitale è il registro elettronico che documenta chi ha prelevato, ricevuto, manipolato, analizzato, revisionato e approvato un campione o risultato.',
    70: 'Il certificato di analisi è un report formale che riassume campione, contesto, risultati, unità, metodo, revisione e consegna al cliente o audit.',
    71: 'Un CRM organizza clienti, opportunità, contatti e follow-up commerciale. In AquaVerify può collegarsi a prodotti, campioni, preventivi e canali partner.',
    72: 'Un dashboard LIMS è un pannello operativo che riassume campioni, worksheet, stati, carico di lavoro, attività pendenti e accessi rapidi per il laboratorio.',
    73: 'Un ELN è un quaderno elettronico di laboratorio usato per documentare esperimenti, esecuzioni, evidenze, materiali, revisioni e firme.',
    74: 'La firma elettronica è la conferma digitale di revisione, approvazione o chiusura di un record secondo permessi e procedura.',
    75: 'GxP indica quadri di buone pratiche applicabili in ambienti regolati, come GMP, GLP o GDP secondo l’attività.',
    76: 'Il foglio di lavoro raggruppa campioni o risultati assegnati a un analista per esecuzione, acquisizione e revisione per lotto di lavoro.',
    77: 'Un LIMS è un sistema di gestione delle informazioni di laboratorio che organizza campioni, risultati, fogli di lavoro, report, utenti, stati e tracciabilità.',
    78: 'Il portale cliente è un’interfaccia dove clienti o utenti autorizzati consultano richieste, campioni, report o risultati pubblicati.',
    79: 'Il SaaS è un modello software cloud in cui l’applicazione è ospitata e aggiornata centralmente. Nei laboratori facilita accesso sicuro, scalabilità e distribuzione senza server locali.',
    80: 'Sample Hub è una vista centralizzata dei campioni dove consultare contesto, risultati, stati, etichette, report e azioni associate.',
    81: 'Uno SLA è un impegno o obiettivo temporale per completare un’azione, un report, una revisione o un servizio. Nei laboratori può riguardare TAT o TTR.',
    82: 'Il turnaround time è il tempo di ciclo dalla ricezione o registrazione del campione alla consegna del report o risultato finale.',
    83: 'Un tenant è lo spazio logico di un’organizzazione dentro una piattaforma SaaS. Governa dati, permessi, utenti e configurazione.',
    84: 'La tracciabilità analitica è la capacità di ricostruire la storia completa di campione, metodo, lotto, operatore, risultato, revisione e report.',
    85: 'Un WMS è un sistema di gestione del magazzino che coordina stock, ubicazioni, movimenti e preparazione logistica. In AquaVerify può collegarsi a prodotti, lotti e ordini.',
    86: 'Il workflow owner è l’utente o ruolo responsabile del prossimo passaggio operativo all’interno di un workflow.',
    88: 'Il controllo qualità interno comprende controlli, revisioni e registrazioni usati dal laboratorio per verificare che un metodo o saggio funzioni correttamente.',
    89: 'ENUMERA è la famiglia AquaVerify orientata a risultati quantitativi ed enumerazione microbiologica dell’acqua secondo prodotto, matrice e flusso applicabile.',
    90: 'INDICA è la famiglia AquaVerify orientata a risposte presenza/assenza, screening e verifica operativa dell’acqua.',
    91: 'Un kit di rilevazione rapida è un sistema preformulato o semplificato per ridurre manipolazione, standardizzare passaggi e accelerare la lettura rispetto ai flussi tradizionali.',
    92: 'I kits ISO/EPA sono kit e flussi tecnici AquaVerify orientati a metodi o riferimenti ISO/EPA quando il piano analitico lo richiede.',
    93: 'Lab Essentials include materiali, terreni, controlli, reagenti e consumabili preparati per supportare l’esecuzione microbiologica in laboratorio.',
    94: 'Il lotto kit è l’identificativo di produzione o fornitura associato a un kit o componente. Deve collegarsi ai risultati quando incide su tracciabilità, qualità o validazione.',
    95: 'Un terreno di coltura è una preparazione nutritiva o selettiva che consente crescita, rilevazione o differenziazione di microrganismi in condizioni definite.',
    98: 'L’acqua calda sanitaria è un sistema di acqua calda in edifici e impianti, rilevante per programmi di prevenzione Legionella e controllo del rischio da aerosol.',
    99: 'L’aerosolizzazione è la formazione o liberazione di goccioline fini che possono trasportare microrganismi dall’acqua all’aria. È rilevante per docce, torri, spa e valutazioni di impianti a rischio.',
    100: 'L’acqua grezza è acqua captata prima del trattamento. Il suo controllo aiuta a comprendere carico iniziale, rischio ed efficienza dei processi successivi.',
    101: 'L’acqua potabile è acqua destinata al consumo umano, soggetta a criteri sanitari, controllo e fornitura secondo il quadro applicabile.',
    102: 'L’acqua di processo è acqua usata in operazioni industriali o alimentari come ingrediente, contatto, pulizia, raffreddamento, ricircolo o supporto di processo.',
    103: 'L’acqua rigenerata è acqua reflua trattata per essere riutilizzata in usi autorizzati, come irrigazione agricola o altri usi definiti dalla normativa.',
    104: 'L’acqua reflua è acqua influenzata da uso domestico, industriale o di processo prima del trattamento o scarico. Può indicare carico microbico, pressione della fonte e necessità di trattamento.',
    105: 'Il CIP è la pulizia in situ di linee, apparecchiature o circuiti industriali senza smontaggio completo. L’acqua di risciacquo o processo può richiedere controllo microbiologico.',
    106: 'La clorazione è una fase di disinfezione che usa composti del cloro per ridurre il rischio microbico. L’efficacia dipende da dose, tempo di contatto, qualità dell’acqua e organismi target.',
    107: 'L’idroponica è produzione vegetale senza suolo mediante soluzioni nutritive e acqua ricircolata. Il controllo microbiologico aiuta a proteggere colture, operatori e continuità del processo.',
    108: 'Un packhouse è una struttura post-raccolta dove i prodotti sono ricevuti, lavati, manipolati, confezionati o stoccati. L’acqua usata può diventare un punto critico di controllo qualità.',
    109: 'Il punto terminale è l’uscita finale o punto d’uso di un sistema idrico, come rubinetto, doccia, tubo o connessione di processo dove possono avvenire esposizione o campionamento.',
    110: 'L’irrigazione agricola è l’applicazione di acqua alle colture tramite goccia, aspersione, superficie o altri sistemi. Il rischio dipende da coltura, contatto e qualità dell’acqua.',
    111: 'La torbidità è l’aspetto opaco dell’acqua causato da particelle sospese. Può influire su prestazioni del trattamento, efficacia della disinfezione e interpretazione dei cambiamenti di qualità.',
    112: 'La disinfezione UV usa luce ultravioletta per inattivare microrganismi. Le prestazioni dipendono da dose UV, trasmittanza dell’acqua, stato delle lampade, idraulica e organismo target.',
    116: 'Una deviazione è un’incidenza o non conformità rispetto a piano, procedura, criterio o aspettativa. Deve essere documentata, valutata e chiusa secondo procedura.',
    118: 'Un dossier di validazione raccoglie obiettivo, metodo, piano, campioni, risultati, deviazioni, approvazioni e conclusione della validazione.',
    120: 'La revisione tecnica valuta risultati, evidenze, controlli e coerenza prima dell’approvazione o emissione del report.',
    121: 'Una SOP è una procedura operativa standard che descrive come eseguire un’attività in modo controllato e ripetibile.',
    123: 'La validazione del metodo è il processo formale per dimostrare che un metodo è adatto all’uso previsto in condizioni definite.',
    124: 'La verifica del metodo conferma che un laboratorio può eseguire correttamente un metodo stabilito nel proprio ambiente, campo e matrici.',
    126: 'Un distributore autorizzato è un partner commerciale approvato per vendere prodotti AquaVerify, offrire supporto locale, facilitare inventario e canalizzare opportunità nel territorio.',
    129: 'White label è un modello commerciale in cui un prodotto o soluzione è presentato con il marchio del partner, con ambito, documentazione e responsabilità definiti.',
    130: 'OEM è un modello in cui un prodotto, kit o soluzione viene offerto con condizioni adattate per un partner, produttore, integratore o programma a marchio proprio.'
  },
  ca: {
    0: 'L’adenovirus és un virus entèric resistent en determinades condicions ambientals i utilitzat en alguns contextos com a referència per avaluar persistència viral en aigua.',
    1: 'Un bacteri viable és un microorganisme capaç de mantenir-se viu i, segons condicions, créixer o formar colònies detectables mitjançant mètodes de cultiu.',
    4: 'La càrrega microbiana és el nivell de microorganismes presents en una mostra o sistema. Pot expressar-se en diferents unitats segons el mètode i l’organisme avaluat.',
    7: 'Els colífags F-ARN són un subgrup de colífags F-específics amb genoma ARN. Poden utilitzar-se en estudis de contaminació fecal i comportament viral segons mètode, matriu i objectiu del programa.',
    14: 'El Microbial Source Tracking agrupa enfocaments per inferir l’origen probable d’una contaminació microbiana, per exemple humana, ramadera, ambiental o mixta.',
    16: 'El norovirus és un virus entèric de gran rellevància en salut pública, associat a brots gastrointestinals. En aigua se sol abordar amb vigilància específica o indicadors, no com a anàlisi rutinària universal.',
    17: 'Un patogen és un microorganisme capaç de causar malaltia. En aigua, el control de patògens es gestiona amb barreres, indicadors, vigilància específica i plans de risc.',
    18: 'Pseudomonas aeruginosa és un bacteri oportunista rellevant en alguns controls d’aigua, especialment quan pot existir biofilm, aigua recreativa, instal·lacions o productes sensibles.',
    22: 'EPA Method 1601 és un mètode EPA per a colífags F+ i somàtics mitjançant enriquiment en dues etapes, segons l’abast del mètode.',
    23: 'EPA Method 1602 és un mètode EPA per a colífags F+ i somàtics mitjançant procediment de capa d’agar simple, segons l’abast del mètode.',
    24: 'HACCP és un sistema preventiu d’anàlisi de perills i punts crítics de control utilitzat en seguretat alimentària. En aigua de procés ajuda a definir punts de control i evidències.',
    27: 'ISO 11731 és una norma internacional per enumerar Legionella en aigua. És rellevant en programes de control d’instal·lacions, ACS, torres, spas i sistemes amb risc d’aerosolització.',
    29: 'ISO 22000 és una norma internacional de sistemes de gestió de seguretat alimentària. Pot relacionar-se amb control d’aigua utilitzada com a ingredient, procés o neteja.',
    30: 'ISO 5667-1 és una norma general sobre disseny de programes de mostreig i tècniques de mostreig d’aigua.',
    31: 'ISO 7899-2 és una norma per detectar i comptar enterococs intestinals en aigua mitjançant filtració per membrana, segons l’abast de la norma.',
    37: 'El Reial decret 742/2013 és el marc tecnicosanitari espanyol per a piscines. Es relaciona amb control de qualitat, operació, riscos microbiològics i documentació.',
    39: 'La Revised Total Coliform Rule és la regla dels Estats Units sobre coliformes totals en aigua potable. No s’ha de confondre amb mètodes de colífags, que responen a una altra pregunta tècnica.',
    41: 'Un blanc de mètode és un control que acompanya el procés analític sense mostra objectiu per detectar contaminació introduïda durant preparació, reactius o manipulació.',
    42: 'La cadena de fred són les condicions de temperatura controlada mantingudes durant transport i emmagatzematge d’una mostra o material sensible.',
    43: 'Un control negatiu és un material o condició que no ha de produir senyal i ajuda a detectar contaminació, falsos positius o errors de manipulació.',
    44: 'Un control positiu és un material o condició que ha de produir una resposta esperada i confirma que el mètode pot detectar l’objectiu.',
    45: 'Double Agar Layer és un procediment clàssic de doble capa d’agar utilitzat en assajos de bacteriòfags, on una capa superior amb mostra i hoste s’aboca sobre una base d’agar.',
    46: 'L’enriquiment és un pas analític que afavoreix el creixement o multiplicació d’un microorganisme objectiu abans de la detecció.',
    49: 'La incubació manté una mostra o cultiu sota temperatura i temps controlats per permetre creixement, reacció o lectura microbiològica.',
    51: 'El límit de quantificació és la concentració mínima que pot quantificar-se amb rendiment acceptable sota condicions definides del mètode.',
    54: 'Una mostra composta es forma combinant diverses submostres preses en diferents punts o moments segons un pla definit.',
    55: 'Una mostra puntual es pren en un moment i punt específic. Representa les condicions d’aquell instant i lloc.',
    56: 'El nombre més probable és un mètode estadístic per estimar la concentració de microorganismes a partir de patrons presència/absència en tubs o pouets.',
    59: 'La recuperació és el percentatge o proporció del microorganisme objectiu que el mètode aconsegueix recuperar respecte d’una quantitat coneguda o esperada.',
    60: 'La repetibilitat és el grau de concordança entre resultats obtinguts en condicions similars: mateix mètode, operador, equip i laboratori en un interval curt.',
    61: 'La reproductibilitat és el grau de concordança entre resultats obtinguts en condicions canviants, com laboratoris, operadors o dies diferents.',
    62: 'Single Agar Layer és un procediment utilitzat en alguns mètodes de colífags per barrejar mostra, hoste i medi abans de la incubació.',
    113: 'L’aprovació és la decisió formal que confirma que un registre, resultat, full, informe o expedient compleix criteris i pot avançar.',
    114: 'CAPA és una acció correctiva i preventiva per resoldre una causa i evitar la repetició d’una desviació o no conformitat.',
    115: 'El control documental gestiona versions, vigència, distribució i revisió de documents com SOPs, protocols, informes i expedients.',
    117: 'Un dossier és un paquet documental que resumeix informació crítica per a revisió, aprovació, auditoria o transferència.',
    119: 'Una no conformitat és l’incompliment d’un requisit especificat, ja sigui normatiu, procedimental, contractual o del sistema de qualitat.',
    122: 'El Tech Transfer és la transferència estructurada de coneixement, procés, mètode o producte des d’R+D o validació cap a producció, qualitat o operació.',
    125: 'El co-branding és un model en què AquaVerify i un partner comparteixen presència de marca en producte, documentació, formació o campanyes.',
    127: 'Un kit sota marca pròpia és un model de partner on packaging, documentació o marca poden adaptar-se segons acord i ús previst.',
    128: 'El lead routing és el procés d’assignació d’oportunitats comercials a equip intern, distribuïdor, territori o partner adequat.',
    131: 'L’onboarding tècnic és el procés de formació inicial perquè un distribuïdor o client entengui producte, mètode, ús, límits, suport i documentació.',
    132: 'Un playbook comercial és un document operatiu que ajuda a qualificar oportunitats, explicar productes, adaptar missatges per sector i definir següents passos.',
    133: 'Un reseller tècnic és un partner que combina venda amb coneixement tècnic per recomanar producte, orientar ús i derivar casos complexos.',
    134: 'El territori és l’àrea geogràfica o mercat assignat o avaluat per a activitat comercial, suport, inventari o distribució.',
    2: 'Un bacteriòfag és un virus que infecta bacteris específics i s’hi replica. En qualitat de l’aigua s’utilitza com a model o indicador viral per estudiar contaminació fecal, comportament davant tractaments i eficàcia de barreres microbiològiques.',
    3: 'El biofilm és una comunitat microbiana adherida a una superfície i protegida per una matriu extracel·lular. En xarxes d’aigua pot actuar com a reservori de microorganismes i afavorir recontaminacions.',
    5: 'La soca hoste és el bacteri utilitzat com a hoste per detectar o enumerar bacteriòfags en mètodes de cultiu. La seva selecció és crítica per a la sensibilitat de l’assaig i la interpretació.',
    6: 'Els coliformes totals són un grup ampli de bacteris indicadors que poden aparèixer en sòl, aigua o entorns fecals. S’utilitzen per avaluar integritat de sistemes, eficàcia del tractament i possibles problemes operatius.',
    8: 'Els colífags F-específics infecten bacteris hoste mitjançant pili F. S’utilitzen en contextos metodològics i comparatius per estudiar comportament viral, origen o vies de contaminació.',
    9: 'Els colífags somàtics infecten Escherichia coli i altres enterobacteris a través de receptors de la paret cel·lular. S’empren com a indicadors virals operatius en programes de qualitat de l’aigua i avaluació de tractaments.',
    10: 'La contaminació fecal és la presència o indici de material fecal humà o animal en una matriu d’aigua. S’avalua amb indicadors com E. coli, enterococs, coliformes i, en alguns programes, colífags.',
    11: 'Els enterococs intestinals són bacteris grampositius associats al tracte gastrointestinal humà i animal. La seva persistència relativa els fa útils en aigües recreatives, ambientals i determinats plans de control.',
    12: 'Escherichia coli és un bacteri coliforme termotolerant utilitzat globalment com a indicador de contaminació fecal recent. La seva presència en aigua de consum acostuma a requerir investigació i acció correctiva segons el marc aplicable.',
    13: 'Legionella és un gènere bacterià associat a riscos en instal·lacions d’aigua que generen aerosols, com ACS, dutxes, spas, torres o climatització. El control requereix pla, mostreig, laboratori i accions documentades.',
    15: 'Un microorganisme indicador és un microorganisme la presència o concentració del qual s’utilitza per inferir contaminació, eficàcia del tractament o deteriorament d’un sistema d’aigua.',
    19: 'UFP/PFU significa unitat formadora de placa, utilitzada per expressar partícules virals infeccioses capaces de generar plaques de lisi en un assaig en placa.',
    20: 'Els virus entèrics són virus associats al tracte intestinal que poden transmetre’s per aigua contaminada. Inclouen grups d’interès sanitari com norovirus, adenovirus o enterovirus segons el context de vigilància.',
    21: 'La Directiva (UE) 2020/2184 regula la qualitat de les aigües destinades al consum humà. Reforça l’enfocament basat en risc i contempla colífags somàtics en l’avaluació de tractaments quan aplica.',
    25: 'ISO 10705-1 forma part de la sèrie ISO 10705 i se centra en mètodes per a colífags F-específics d’ARN segons l’abast i la versió aplicables.',
    26: 'ISO 10705-2 especifica un mètode per detectar i enumerar colífags somàtics incubant la mostra amb una soca hoste adequada.',
    28: 'ISO 19458 és una norma de referència per planificar el mostreig microbiològic d’aigua, procediments de presa, transport, manipulació i emmagatzematge abans de l’anàlisi.',
    32: 'ISO 9308 és una sèrie de normes per detectar i comptar Escherichia coli i bacteris coliformes en aigua, amb enfocaments com filtració per membrana o NMP segons la part aplicable.',
    33: 'ISO/IEC 17025 és la norma de competència dels laboratoris d’assaig i calibratge. En aigua es relaciona amb resultats vàlids, traçabilitat, control documental, competència tècnica i sistema de qualitat.',
    34: 'Un pla sanitari de l’aigua és un pla documentat que identifica riscos, controls, punts de mostreig, responsabilitats, seguiment i accions correctives en un sistema d’aigua.',
    35: 'El Reial decret 3/2023 és el marc espanyol que estableix criteris tecnicosanitaris de qualitat, control i subministrament de l’aigua de consum.',
    36: 'El Reial decret 487/2022 és la norma espanyola sobre prevenció i control de la legionel·losi en instal·lacions que poden generar exposició a aerosols.',
    38: 'El Reglament (UE) 2020/741 estableix requisits mínims per a la reutilització de l’aigua a la Unió Europea, especialment en reg agrícola.',
    40: 'El Water Safety Plan és un enfocament preventiu de gestió del risc de l’aigua des de la captació fins a l’usuari, combinant perills, controls, monitoratge i accions correctives.',
    47: 'L’assaig en placa és un mètode de cultiu que quantifica bacteriòfags mitjançant plaques de lisi visibles sobre una capa bacteriana.',
    48: 'La filtració per membrana filtra un volum d’aigua i incuba la membrana sobre un medi per recuperar i comptar microorganismes.',
    50: 'La lisi cel·lular és la ruptura d’una cèl·lula bacteriana, per exemple després de la replicació d’un bacteriòfag, alliberant noves partícules virals i generant una zona de lisi visible.',
    52: 'El límit de detecció és el nivell més baix d’analit o microorganisme que un mètode pot detectar en condicions definides, sense implicar necessàriament quantificació exacta.',
    53: 'La matriu és el tipus de mostra o entorn analitzat, com aigua de consum, regenerada, piscina, residual, superficial, de procés o de reg.',
    57: 'Un resultat fora d’especificació queda fora d’un límit, criteri o rang definit. Requereix revisió, investigació o acció segons procediment.',
    58: 'El punt de mostreig és la ubicació física o font d’on es pren una mostra. Ha d’estar associat a client, matriu, pla analític i traçabilitat.',
    63: 'El temps de resposta és el temps transcorregut des de la presa o recepció d’una mostra fins a l’obtenció i comunicació d’un resultat accionable.',
    64: '21 CFR Part 11 és el marc dels Estats Units per a registres electrònics i signatures electròniques en determinats contextos regulats per la FDA. L’aplicabilitat depèn de l’entorn i de l’ús previst.',
    65: 'ALCOA+ agrupa principis d’integritat de dades: atribuïble, llegible, contemporani, original, exacte, i criteris ampliats com complet, coherent, durable i disponible.',
    66: 'AquaLab és l’àrea d’AquaVerify Cloud orientada a operació de laboratori, LIMS, protocols, ELN, validacions i R+D.',
    67: 'AquaVerify Cloud és la plataforma digital d’AquaVerify que connecta CRM, LIMS, ELN, CoA, portal client, inventari, logística, finances, dashboards i AquaAI segons configuració.',
    68: 'Un audit trail és l’historial traçable d’esdeveniments, canvis, usuaris, dates, decisions i signatures associades a un registre.',
    69: 'La cadena de custòdia digital és el registre electrònic que documenta qui va prendre, rebre, manipular, analitzar, revisar i aprovar una mostra o resultat.',
    70: 'Un certificat d’anàlisi és un informe formal que resumeix mostra, context, resultats, unitats, mètode, revisió i lliurament al client o auditoria.',
    71: 'Un CRM organitza clients, oportunitats, contactes i seguiment comercial. A AquaVerify pot connectar-se amb productes, mostres, pressupostos i canals partner.',
    72: 'Un dashboard LIMS és un panell operatiu que resumeix mostres, fulls de treball, estats, càrrega, tasques pendents i accessos ràpids del laboratori.',
    73: 'Un ELN és un quadern electrònic de laboratori utilitzat per documentar experiments, execucions, evidències, materials, revisions i signatures.',
    74: 'La signatura electrònica és la confirmació digital de revisió, aprovació o tancament d’un registre segons permisos i procediment.',
    75: 'GxP fa referència a marcs de bones pràctiques aplicables en entorns regulats, com GMP, GLP o GDP segons l’activitat.',
    76: 'El full de treball agrupa mostres o resultats assignats a un analista per a execució, captura i revisió per lot de treball.',
    77: 'Un LIMS és un sistema de gestió d’informació de laboratori que organitza mostres, resultats, fulls de treball, informes, usuaris, estats i traçabilitat.',
    78: 'El portal client és una interfície on clients o usuaris autoritzats poden consultar sol·licituds, mostres, informes o resultats publicats.',
    79: 'El SaaS és un model de programari al núvol on l’aplicació s’allotja i s’actualitza centralment. En laboratoris facilita accés segur, escalabilitat i desplegament sense servidors locals.',
    80: 'Sample Hub és una vista centralitzada de mostres on consultar context, resultats, estats, etiquetes, informes i accions associades.',
    81: 'Un SLA és un compromís o objectiu de temps per completar una acció, informe, revisió o servei. En laboratoris pot relacionar-se amb TAT o TTR.',
    82: 'El turnaround time és el temps de cicle des de la recepció o entrada d’una mostra fins al lliurament de l’informe o resultat final.',
    83: 'Un tenant és l’espai lògic d’una organització dins d’una plataforma SaaS. Controla dades, permisos, usuaris i configuració.',
    84: 'La traçabilitat analítica és la capacitat de reconstruir l’historial complet d’una mostra, mètode, lot, operador, resultat, revisió i informe.',
    85: 'Un WMS és un sistema de gestió de magatzem que coordina estoc, ubicacions, moviments i preparació logística. A AquaVerify pot connectar-se amb productes, lots i comandes.',
    86: 'El workflow owner és l’usuari o rol responsable del següent pas operatiu dins d’un flux de treball.',
    88: 'El control de qualitat intern és el conjunt de controls, revisions i registres utilitzats pel laboratori per comprovar que un mètode o assaig funciona adequadament.',
    89: 'ENUMERA és la família AquaVerify orientada a resultats quantitatius i enumeració microbiològica de l’aigua segons producte, matriu i flux aplicable.',
    90: 'INDICA és la família AquaVerify orientada a respostes de presència/absència, screening i verificació operativa en aigua.',
    91: 'Un kit de detecció ràpida és un sistema preformulat o simplificat per reduir manipulació, estandarditzar passos i accelerar lectura davant fluxos tradicionals.',
    92: 'Els kits ISO/EPA són kits i fluxos tècnics AquaVerify orientats a mètodes o referències ISO/EPA quan el pla analític ho requereix.',
    93: 'Lab Essentials són materials, medis, controls, reactius i consumibles preparats per donar suport a l’execució microbiològica al laboratori.',
    94: 'El lot de kit és l’identificador de fabricació o subministrament associat a un kit o component. Ha de vincular-se als resultats quan afecta traçabilitat, qualitat o validació.',
    95: 'Un medi de cultiu és una preparació nutritiva o selectiva que permet creixement, detecció o diferenciació de microorganismes sota condicions definides.',
    98: 'L’aigua calenta sanitària és un sistema d’aigua calenta en edificis i instal·lacions, rellevant en programes de prevenció de Legionella i control del risc per aerosolització.',
    99: 'L’aerosolització és la formació o alliberament de gotes fines que poden transportar microorganismes de l’aigua a l’aire. És rellevant en dutxes, torres, spas i avaluacions d’instal·lacions de risc.',
    100: 'L’aigua bruta és l’aigua captada abans del tractament. El seu control ajuda a entendre càrrega inicial, risc i eficiència dels processos posteriors.',
    101: 'L’aigua de consum és l’aigua destinada al consum humà, subjecta a criteris sanitaris, control i subministrament segons el marc aplicable.',
    102: 'L’aigua de procés és l’aigua utilitzada dins d’una operació industrial o alimentària com a ingredient, contacte, neteja, refredament, recirculació o suport de procés.',
    103: 'L’aigua regenerada és aigua residual tractada per ser reutilitzada en usos autoritzats, com reg agrícola o altres usos segons normativa.',
    104: 'L’aigua residual és aigua afectada per ús domèstic, industrial o de procés abans del tractament o abocament. Pot indicar càrrega microbiana, pressió de font i necessitats de tractament.',
    105: 'El CIP és la neteja in situ de línies, equips o circuits industrials sense desmuntatge complet. L’aigua d’esbandida o procés pot requerir control microbiològic.',
    106: 'La cloració és una etapa de desinfecció que utilitza compostos de clor per reduir el risc microbià. L’eficàcia depèn de dosi, temps de contacte, qualitat de l’aigua i organismes objectiu.',
    107: 'La hidroponia és producció vegetal sense sòl mitjançant solucions nutritives i aigua recirculada. El control microbiològic ajuda a protegir cultius, operadors i consistència del procés.',
    108: 'Un packhouse és una instal·lació postcollita on els productes es reben, renten, manipulen, envasen o emmagatzemen. L’aigua utilitzada pot esdevenir un punt crític de control de qualitat.',
    109: 'El punt terminal és la sortida final o punt d’ús d’un sistema d’aigua, com aixeta, dutxa, mànega o connexió de procés on pot haver-hi exposició o mostreig.',
    110: 'El reg agrícola és l’aplicació d’aigua als cultius mitjançant degoteig, aspersió, superfície o altres sistemes. El perfil de risc depèn del cultiu, contacte i qualitat de l’aigua.',
    111: 'La terbolesa és l’aspecte tèrbol de l’aigua causat per partícules en suspensió. Pot afectar el rendiment del tractament, l’eficàcia de desinfecció i la interpretació de canvis de qualitat.',
    112: 'La desinfecció UV utilitza llum ultraviolada per inactivar microorganismes. El rendiment depèn de la dosi UV, transmissió de l’aigua, estat de les làmpades, hidràulica i organisme objectiu.',
    116: 'Una desviació és una incidència o incompliment respecte d’un pla, procediment, criteri o expectativa. S’ha de documentar, avaluar i tancar segons procediment.',
    118: 'Un dossier de validació reuneix objectiu, mètode, pla, mostres, resultats, desviacions, aprovacions i conclusió de la validació.',
    120: 'La revisió tècnica és l’avaluació de resultats, evidències, controls i coherència abans de l’aprovació o emissió de l’informe.',
    121: 'Un SOP és un procediment operatiu estàndard que descriu com executar una activitat de forma controlada i repetible.',
    123: 'La validació de mètode és el procés formal per demostrar que un mètode és adequat per a l’ús previst en condicions definides.',
    124: 'La verificació de mètode confirma que un laboratori pot executar adequadament un mètode establert en el seu entorn, abast i matrius.',
    126: 'Un distribuïdor autoritzat és un partner comercial aprovat per vendre productes AquaVerify, oferir suport local, facilitar inventari i canalitzar oportunitats al seu territori.',
    129: 'La marca blanca és un model comercial en què un producte o solució es presenta sota la marca del partner, amb abast, documentació i responsabilitats definides.',
    130: 'OEM és un model en què un producte, kit o solució s’ofereix sota condicions adaptades per a un partner, fabricant, integrador o programa de marca pròpia.'
  }
};

function copy(lang) {
  return COPY[lang] || COPY.en;
}

export function getGlossaryTerms(lang = 'en') {
  const terms = GLOSSARY_TERMS[lang] || GLOSSARY_TERMS.en;
  const definitions = SPECIFIC_DEFINITIONS[lang] || {};
  return terms.map((term) => definitions[term.id] ? { ...term, definition: definitions[term.id] } : term);
}

export function getPriorityGlossaryTerms(lang = 'en') {
  const terms = getGlossaryTerms(lang);
  return GLOSSARY_PRIORITY_IDS.map((id) => terms[id]).filter(Boolean);
}

export function getGlossaryTermById(id, lang = 'en') {
  return getGlossaryTerms(lang)[id] || getGlossaryTerms('en')[id] || null;
}

export function getGlossaryTermPageId(id) {
  return `glossary-term-${id}`;
}

export function isPriorityGlossaryTerm(id) {
  return GLOSSARY_PRIORITY_IDS.includes(Number(id));
}

export function getGlossaryCategories(lang = 'en') {
  const seen = new Map();
  getGlossaryTerms(lang).forEach((term) => {
    if (!seen.has(term.category)) seen.set(term.category, term.categoryLabel);
  });
  return [...seen.entries()].map(([id, label]) => ({ id, label }));
}

export function getGlossaryHubContent(lang = 'en') {
  const labels = copy(lang);
  const terms = getGlossaryTerms(lang);
  const priorityTerms = getPriorityGlossaryTerms(lang);
  return {
    ...labels,
    lang,
    path: GLOSSARY_HUB_PATHS[lang] || GLOSSARY_HUB_PATHS.en,
    categories: getGlossaryCategories(lang),
    terms,
    priorityTerms,
    termsCount: terms.length,
    termsLabel: labels.termsCount,
    priorityPagesCount: priorityTerms.length,
    priorityPagesLabel: labels.priorityCount
  };
}

export function getGlossaryHubSeo(lang = 'en') {
  const hub = getGlossaryHubContent(lang);
  return {
    title: hub.title,
    description: hub.lead,
    seoTitle: hub.seoTitle,
    seoDescription: hub.seoDescription,
    path: hub.path,
    faqs: getGlossaryFaqs(lang)
  };
}

export function getGlossaryTermSeo(id, lang = 'en') {
  const term = getGlossaryTermById(id, lang);
  const labels = copy(lang);
  if (!term) return null;
  return {
    title: term.term,
    description: term.definition,
    seoTitle: `${term.term} | ${labels.glossaryLabel} AquaVerify`,
    seoDescription: term.definition,
    path: term.url,
    faqs: [
      {
        question: `${labels.definition}: ${term.term}`,
        answer: term.definition
      },
      {
        question: `${labels.application}: ${term.term}`,
        answer: term.application
      }
    ]
  };
}

export function getGlossaryFaqs(lang = 'en') {
  const labels = copy(lang);
  return [
    {
      question: labels.searchPlaceholder.replace('...', ''),
      answer: labels.lead
    },
    {
      question: labels.priority,
      answer: labels.relatedBody
    }
  ];
}

function productRouteFor(term) {
  const value = `${term.product} ${term.term}`.toLowerCase();
  if (value.includes('enumera')) return 'enumera';
  if (value.includes('indica')) return 'indica';
  if (value.includes('lab essentials')) return 'lab-essentials';
  if (value.includes('iso') || value.includes('epa')) return 'standard-kits';
  if (value.includes('cloud') || value.includes('lims') || value.includes('saas') || value.includes('portal')) return 'platform';
  return 'products';
}

function sectorRouteFor(term) {
  const value = `${term.sector} ${term.term} ${term.application}`.toLowerCase();
  if (value.includes('municip')) return 'municipal-water-testing';
  if (value.includes('laborator')) return 'water-testing-labs';
  if (value.includes('aliment') || value.includes('food') || value.includes('beverage')) return 'food-beverage-water-quality';
  if (value.includes('agric') || value.includes('riego') || value.includes('irrig')) return 'agriculture-water';
  if (value.includes('instal') || value.includes('facility') || value.includes('acs') || value.includes('legionella')) return 'facility-water-risk';
  if (value.includes('hotel') || value.includes('ocio') || value.includes('tourism') || value.includes('loisir')) return 'hospitality-tourism-water';
  if (value.includes('pharma') || value.includes('cosmet')) return 'pharma-cosmetics-water';
  if (value.includes('industr') || value.includes('process')) return 'industrial-process-water';
  return 'industries-hub';
}

function whitepaperRouteFor(term) {
  const haystack = `${term.term} ${term.definition} ${term.application} ${term.product} ${term.sector} ${(term.keywords || []).join(' ')}`;
  const match = WHITEPAPER_BY_TERM.find(([pattern]) => pattern.test(haystack));
  return match?.[1] || 'water-compliance-software-guide';
}

export function getGlossaryRelatedLinks(term, lang = 'en') {
  const labels = copy(lang);
  const links = [
    { id: productRouteFor(term), label: term.product || labels.product, kind: labels.product },
    { id: 'platform', label: 'AquaVerify Cloud', kind: 'Cloud' },
    { id: sectorRouteFor(term), label: term.sector || labels.sector, kind: labels.sector },
    { id: whitepaperRouteFor(term), label: labels.secondaryCta, kind: 'Whitepaper' },
    { id: 'distributors', label: labels.distributors, kind: 'Partner' }
  ];

  const unique = [];
  const seen = new Set();
  links.forEach((link) => {
    if (seen.has(link.id)) return;
    seen.add(link.id);
    unique.push({
      ...link,
      href: getMarketingPagePath(link.id, lang)
    });
  });
  return unique;
}

export function getGlossaryTermAlternates(id) {
  return Object.fromEntries(
    Object.entries(GLOSSARY_TERM_ROUTE_PATHS[getGlossaryTermPageId(id)] || {})
  );
}

export function glossaryAbsolute(path) {
  return `${SITE_URL}${path === '/' ? '/' : path}`;
}
