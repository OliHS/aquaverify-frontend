function card(title, body) {
  return { title, body };
}

function model(title, body, bullets, cta) {
  return { title, body, bullets, cta };
}

function answerSectionsFrom(content) {
  return [
    content.directAnswer
      ? {
          kind: 'directAnswer',
          title: content.directAnswer.title,
          body: content.directAnswer.body
        }
      : null,
    content.technicalTable
      ? {
          kind: 'technicalTable',
          title: content.technicalTable.title,
          table: content.technicalTable
        }
      : null
  ].filter(Boolean);
}

function withSections(content) {
  return {
    ...content,
    sections: [
      ...answerSectionsFrom(content),
      {
        title: content.modelsTitle,
        body: content.modelsBody,
        bullets: content.models.flatMap((item) => [item.title, ...item.bullets])
      },
      {
        title: content.architectureTitle,
        body: content.architectureBody,
        bullets: content.architectureCards.map((item) => `${item.title}: ${item.body}`)
      },
      {
        title: content.productsTitle,
        body: content.productsBody,
        bullets: content.products.map((item) => `${item.title}: ${item.body}`)
      },
      {
        title: content.launchTitle,
        body: content.launchBody,
        bullets: content.launchSteps.map((item) => `${item.title}: ${item.body}`)
      },
      {
        title: content.sectorsTitle,
        body: content.sectorsBody,
        bullets: content.sectors.map((item) => `${item.title}: ${item.body}`)
      },
      {
        title: content.technicalTitle,
        body: content.technicalBody,
        bullets: content.references.map((item) => `${item.title}: ${item.body}`)
      }
    ]
  };
}

const COMMON_PRODUCTS = {
  en: [
    card('ENUMERA Soma 100 mL', 'Enumeration of somatic coliphages in 100 mL using an MPN approach and color-change reading.'),
    card('PLAQUE Soma 1 mL', 'Somatic coliphage enumeration by double agar layer for samples where a 1 mL volume applies.'),
    card('PLAQUE Soma 100 mL', 'Single agar layer based format for samples where low counts are expected.'),
    card('INDICA Soma 100 mL', 'Qualitative detection of somatic coliphages in 100 mL for screening and control workflows.'),
    card('Ready-to-use MSA / MSB', 'Prepared media and consumables to reduce operational variability in the laboratory.'),
    card('AquaVerify Cloud, App and CoA', 'Digital traceability, sample registration, reading support, technical reports and structured analysis reports.')
  ],
  es: [
    card('ENUMERA Soma 100 mL', 'Enumeracion de colifagos somaticos en 100 mL mediante enfoque MPN y lectura por cambio de color.'),
    card('PLAQUE Soma 1 mL', 'Enumeracion de colifagos somaticos por doble capa de agar en muestras donde aplica el volumen de 1 mL.'),
    card('PLAQUE Soma 100 mL', 'Formato basado en procedimiento de capa unica para muestras donde se esperan recuentos bajos.'),
    card('INDICA Soma 100 mL', 'Deteccion cualitativa de colifagos somaticos en 100 mL para flujos de cribado y control.'),
    card('MSA / MSB listos para usar', 'Medios y consumibles preparados para reducir variabilidad operativa en el laboratorio.'),
    card('AquaVerify Cloud, App y CoA', 'Trazabilidad digital, registro de muestra, soporte de lectura, informes tecnicos y informes de analisis estructurados.')
  ],
  fr: [
    card('ENUMERA Soma 100 mL', 'Denombrement des coliphages somatiques en 100 mL avec approche MPN et lecture par changement de couleur.'),
    card('PLAQUE Soma 1 mL', 'Denombrement des coliphages somatiques par double couche d agar pour les echantillons ou un volume de 1 mL s applique.'),
    card('PLAQUE Soma 100 mL', 'Format base sur une couche unique pour les echantillons ou des faibles concentrations sont attendues.'),
    card('INDICA Soma 100 mL', 'Detection qualitative des coliphages somatiques en 100 mL pour les flux de screening et de controle.'),
    card('MSA / MSB prets a l emploi', 'Milieux et consommables prepares pour reduire la variabilite operationnelle en laboratoire.'),
    card('AquaVerify Cloud, App et CoA', 'Tracabilite digitale, enregistrement echantillon, aide a la lecture, rapports techniques et rapports d analyse structures.')
  ],
  it: [
    card('ENUMERA Soma 100 mL', 'Enumerazione dei colifagi somatici in 100 mL con approccio MPN e lettura tramite cambio colore.'),
    card('PLAQUE Soma 1 mL', 'Enumerazione dei colifagi somatici con doppio strato agar per campioni dove si applica il volume di 1 mL.'),
    card('PLAQUE Soma 100 mL', 'Formato basato su procedura a singolo strato per campioni in cui sono attesi bassi conteggi.'),
    card('INDICA Soma 100 mL', 'Rilevazione qualitativa dei colifagi somatici in 100 mL per workflow di screening e controllo.'),
    card('MSA / MSB pronti all uso', 'Terreni e consumabili preparati per ridurre la variabilita operativa in laboratorio.'),
    card('AquaVerify Cloud, App e CoA', 'Tracciabilita digitale, registrazione campione, supporto lettura, report tecnici e report di analisi strutturati.')
  ],
  ca: [
    card('ENUMERA Soma 100 mL', 'Enumeracio de colifags somatics en 100 mL mitjancant enfocament MPN i lectura per canvi de color.'),
    card('PLAQUE Soma 1 mL', 'Enumeracio de colifags somatics per doble capa d agar en mostres on aplica el volum d 1 mL.'),
    card('PLAQUE Soma 100 mL', 'Format basat en procediment de capa unica per a mostres on s esperen recomptes baixos.'),
    card('INDICA Soma 100 mL', 'Deteccio qualitativa de colifags somatics en 100 mL per a fluxos de cribratge i control.'),
    card('MSA / MSB llestos per usar', 'Medis i consumibles preparats per reduir variabilitat operativa al laboratori.'),
    card('AquaVerify Cloud, App i CoA', 'Tracabilitat digital, registre de mostra, suport de lectura, informes tecnics i informes d analisi estructurats.')
  ]
};

const SECTOR_ROUTE_IDS = [
  'water-testing-labs',
  'water-quality-control',
  'municipal-water-testing',
  'food-beverage-water-quality',
  'industrial-process-water',
  'facility-water-risk',
  'agriculture-water',
  'pharma-cosmetics-water',
  'hospitality-tourism-water'
];

const COMMON_COUNTRIES = {
  en: ['Spain', 'France', 'Italy', 'Portugal', 'Germany', 'United Kingdom', 'Ireland', 'Netherlands', 'Belgium', 'Switzerland', 'Mexico', 'United States', 'Canada', 'Brazil', 'Chile', 'Colombia', 'Peru', 'Argentina', 'Morocco', 'South Africa', 'United Arab Emirates', 'Saudi Arabia', 'India', 'Singapore', 'Australia', 'Other'],
  es: ['España', 'Francia', 'Italia', 'Portugal', 'Alemania', 'Reino Unido', 'Irlanda', 'Paises Bajos', 'Belgica', 'Suiza', 'Mexico', 'Estados Unidos', 'Canada', 'Brasil', 'Chile', 'Colombia', 'Peru', 'Argentina', 'Marruecos', 'Sudafrica', 'Emiratos Arabes Unidos', 'Arabia Saudi', 'India', 'Singapur', 'Australia', 'Otro'],
  fr: ['Espagne', 'France', 'Italie', 'Portugal', 'Allemagne', 'Royaume-Uni', 'Irlande', 'Pays-Bas', 'Belgique', 'Suisse', 'Mexique', 'Etats-Unis', 'Canada', 'Bresil', 'Chili', 'Colombie', 'Perou', 'Argentine', 'Maroc', 'Afrique du Sud', 'Emirats arabes unis', 'Arabie saoudite', 'Inde', 'Singapour', 'Australie', 'Autre'],
  it: ['Spagna', 'Francia', 'Italia', 'Portogallo', 'Germania', 'Regno Unito', 'Irlanda', 'Paesi Bassi', 'Belgio', 'Svizzera', 'Messico', 'Stati Uniti', 'Canada', 'Brasile', 'Cile', 'Colombia', 'Peru', 'Argentina', 'Marocco', 'Sudafrica', 'Emirati Arabi Uniti', 'Arabia Saudita', 'India', 'Singapore', 'Australia', 'Altro'],
  ca: ['Espanya', 'Franca', 'Italia', 'Portugal', 'Alemanya', 'Regne Unit', 'Irlanda', 'Paisos Baixos', 'Belgica', 'Suissa', 'Mexic', 'Estats Units', 'Canada', 'Brasil', 'Xile', 'Colombia', 'Peru', 'Argentina', 'Marroc', 'Sud-africa', 'Emirats Arabs Units', 'Arabia Saudita', 'India', 'Singapur', 'Australia', 'Altres']
};

const TYPOGRAPHY_REPLACEMENTS = {
  es: [
    ['analisis', 'análisis'], ['Analisis', 'Análisis'], ['microbiologia', 'microbiología'], ['microbiologica', 'microbiológica'], ['microbiologicos', 'microbiológicos'], ['Microbiologia', 'Microbiología'],
    ['colifagos', 'colífagos'], ['somaticos', 'somáticos'], ['Enumeracion', 'Enumeración'], ['enumeracion', 'enumeración'], ['Deteccion', 'Detección'], ['deteccion', 'detección'],
    ['distribucion', 'distribución'], ['Distribucion', 'Distribución'], ['documentacion', 'documentación'], ['Documentacion', 'Documentación'], ['formacion', 'formación'], ['Formacion', 'Formación'],
    ['tecnica', 'técnica'], ['tecnico', 'técnico'], ['tecnicos', 'técnicos'], ['tecnicas', 'técnicas'], ['Técnica', 'Técnica'], ['Técnico', 'Técnico'],
    ['Segun', 'Según'], ['segun', 'según'], ['implementacion', 'implementación'], ['Implementacion', 'Implementación'], ['adaptacion', 'adaptación'], ['Adaptacion', 'Adaptación'],
    ['capacitacion', 'capacitación'], ['Capacitacion', 'Capacitación'], ['gestion', 'gestión'], ['reposicion', 'reposición'], ['reposicion', 'reposición'],
    ['evaluacion', 'evaluación'], ['Evaluacion', 'Evaluación'], ['Seleccion', 'Selección'], ['seleccion', 'selección'], ['ampliacion', 'ampliación'],
    ['aplicacion', 'aplicación'], ['aplicaciones', 'aplicaciones'], ['relacion', 'relación'], ['solucion', 'solución'], ['Solucion', 'Solución'],
    ['autonomia', 'autonomía'], ['companias', 'compañías'], ['catalogo', 'catálogo'], ['Catalogo', 'Catálogo'], ['cientificos', 'científicos'],
    ['campanas', 'campañas'], ['publica', 'pública'], ['Alimentacion', 'Alimentación'], ['alimentacion', 'alimentación'], ['Captacion', 'Captación'], ['captacion', 'captación'],
    ['recirculacion', 'recirculación'], ['reutilizacion', 'reutilización'], ['fertirrigacion', 'fertirrigación'], ['exportacion', 'exportación'],
    ['Farmaceutica', 'Farmacéutica'], ['farmaceutica', 'farmacéutica'], ['cosmetica', 'cosmética'], ['critica', 'crítica'], ['auditorias', 'auditorías'],
    ['Hosteleria', 'Hostelería'], ['Pais', 'País'], ['pais', 'país'], ['Paises', 'Países'], ['Belgica', 'Bélgica'], ['Mexico', 'México'], ['Canada', 'Canadá'],
    ['Peru', 'Perú'], ['Sudafrica', 'Sudáfrica'], ['Arabes', 'Árabes'], ['Saudi', 'Saudí'], ['Si.', 'Sí.'], ['Como ', 'Cómo '], ['Que ', 'Qué '],
    ['automaticamente', 'automáticamente'], ['automatico', 'automático'], ['informacion', 'información'], ['integracion', 'integración'], ['importacion', 'importación'],
    ['validacion', 'validación'], ['inversion', 'inversión'], ['util ', 'útil '], ['multiples', 'múltiples'], ['Modulos', 'Módulos'], ['modulos', 'módulos']
  ],
  fr: [
    ['d analyse', 'd’analyse'], ['l eau', 'l’eau'], ['de l eau', 'de l’eau'], ['d AquaVerify', 'd’AquaVerify'], ['s adapte', 's’adapte'],
    ['qu une', 'qu’une'], ['l association', 'l’association'], ['d adaptation', 'd’adaptation'], ['d entreprise', 'd’entreprise'], ['d interet', 'd’intérêt'],
    ['d usage', 'd’usage'], ['l evaluation', 'l’évaluation'], ['l echelle', 'l’échelle'], ['l adoption', 'l’adoption'], ['l emploi', 'l’emploi'],
    ['a commercialiser', 'à commercialiser'], ['integrateurs', 'intégrateurs'], ['integrer', 'intégrer'], ['credibilite', 'crédibilité'], ['specialise', 'spécialisé'],
    ['specialisee', 'spécialisée'], ['specialises', 'spécialisés'], ['specialisee', 'spécialisée'], ['marche', 'marché'], ['marches', 'marchés'], ['croitre', 'croître'],
    ['modele', 'modèle'], ['modeles', 'modèles'], ['perimetre', 'périmètre'], ['prepare', 'préparé'], ['prets', 'prêts'], ['a l', 'à l'],
    ['a la', 'à la'], ['a votre', 'à votre'], ['a leurs', 'à leurs'], ['a ma', 'à ma'], ['a chaque', 'à chaque'], ['a passer', 'à passer'],
    ['materiel', 'matériel'], ['materiels', 'matériels'], ['donnees', 'données'], ['operationnelle', 'opérationnelle'], ['operationnels', 'opérationnels'],
    ['operationnel', 'opérationnel'], ['reduire', 'réduire'], ['variabilite', 'variabilité'], ['echantillon', 'échantillon'], ['echantillons', 'échantillons'],
    ['Tracabilite', 'Traçabilité'], ['tracabilite', 'traçabilité'], ['qualite', 'qualité'], ['conformite', 'conformité'], ['reglementaire', 'réglementaire'], ['reglementaires', 'réglementaires'],
    ['recurrente', 'récurrente'], ['recurrents', 'récurrents'], ['recurrent', 'récurrent'], ['criteres', 'critères'], ['reapprovisionnement', 'réapprovisionnement'],
    ['Selection', 'Sélection'], ['selection', 'sélection'], ['capacite', 'capacité'], ['verifiera', 'vérifiera'], ['evalues', 'évalués'], ['evaluer', 'évaluer'],
    ['prevu', 'prévu'], ['deja', 'déjà'], ['reseaux', 'réseaux'], ['sante', 'santé'], ['rincage', 'rinçage'], ['reutilisation', 'réutilisation'], ['avance', 'avancé'],
    ['structures', 'structurés'], ['aide à là', 'aide à la'],
    ['Hotellerie', 'Hôtellerie'], ['hotellerie', 'hôtellerie'], ['Bresil', 'Brésil'], ['Perou', 'Pérou'], ['Emirats', 'Émirats'], ['Etats-Unis', 'États-Unis']
  ],
  it: [
    ['dell acqua', 'dell’acqua'], ['un architettura', 'un’architettura'], ['dall unione', 'dall’unione'], ['un offerta', 'un’offerta'], ['lancio in un', 'lancio in un'],
    ['qualita', 'qualità'], ['Qualita', 'Qualità'], ['capacita', 'capacità'], ['scalabilita', 'scalabilità'], ['disponibilita', 'disponibilità'],
    ['tracciabilita', 'tracciabilità'], ['Tracciabilita', 'Tracciabilità'], ['credibilita', 'credibilità'], ['autorita', 'autorità'], ['identita', 'identità'],
    ['conformita', 'conformità'], ['Responsabilita', 'Responsabilità'], ['Responsabilita', 'Responsabilità'], ['possibilita', 'possibilità'],
    ['variabilita', 'variabilità'], ['opportunita', 'opportunità'], ['piu', 'più'], ['Piu', 'Più'], ['puo', 'può'], ['Puo', 'Può'],
    ['gia', 'già'], ['Si.', 'Sì.'], ['Qual e', 'Qual è'], ['e condividere', 'è condividere'], ['e la differenza', 'è la differenza'],
    ['e territoriale', 'è territoriale'], ['perimetro', 'perimetro'], ['documentazione', 'documentazione'], ['tecnico', 'tecnico'],
    ['condivisa', 'condivisa'], ['adattabilita', 'adattabilità'], ['validazione', 'validazione'], ['regolatoria', 'regolatoria'], ['paese', 'paese'],
    ['Peru', 'Perù'], ['unita', 'unità'], ['l OEM', 'l’OEM']
  ],
  ca: [
    ['d analisi', 'd’anàlisi'], ['d aigua', 'd’aigua'], ['l aigua', 'l’aigua'], ['de l aigua', 'de l’aigua'], ['d empresa', 'd’empresa'],
    ['d implementacio', 'd’implementació'], ['d incidencies', 'd’incidències'], ['d us', 'd’ús'], ['d interes', 'd’interès'], ['d assumir', 'd’assumir'],
    ['s adapten', 's’adapten'], ['s avalua', 's’avalua'], ['l abast', 'l’abast'], ['l oportunitat', 'l’oportunitat'], ['l adopcio', 'l’adopció'],
    ['analisi', 'anàlisi'], ['Analisi', 'Anàlisi'], ['ciencia', 'ciència'], ['propia', 'pròpia'], ['microbiologics', 'microbiològics'],
    ['microbiologia', 'microbiologia'], ['Tracabilitat', 'Traçabilitat'], ['tracabilitat', 'traçabilitat'], ['tecnica', 'tècnica'], ['tecnic', 'tècnic'], ['tecnics', 'tècnics'],
    ['tecnica', 'tècnica'], ['documentacio', 'documentació'], ['formacio', 'formació'], ['Distribucio', 'Distribució'], ['distribucio', 'distribució'],
    ['adaptacio', 'adaptació'], ['implementacio', 'implementació'], ['seleccio', 'selecció'], ['gestio', 'gestió'], ['reposicio', 'reposició'],
    ['ampliacio', 'ampliació'], ['informacio', 'informació'], ['integracio', 'integració'], ['importacio', 'importació'], ['validacio', 'validació'],
    ['relacio', 'relació'], ['solucio', 'solució'], ['Solucio', 'Solució'], ['opcio', 'opció'], ['Multiples', 'Múltiples'], ['multiples', 'múltiples'],
    ['acces', 'accés'], ['cataleg', 'catàleg'], ['Cataleg', 'Catàleg'], ['cientifics', 'científics'], ['pais', 'país'], ['Paisos', 'Països'],
    ['Belgica', 'Bèlgica'], ['Suissa', 'Suïssa'], ['Mexic', 'Mèxic'], ['Canada', 'Canadà'], ['Peru', 'Perú'], ['Sud-africa', 'Sud-àfrica'],
    ['Arabs', 'Àrabs'], ['Arabia', 'Aràbia'], [' mes ', ' més '], ['Mes ', 'Més '], ['rapid', 'ràpid'], ['critica', 'crítica'],
    ['auditories', 'auditories'], ['automaticament', 'automàticament'], ['automatic', 'automàtic'], ['Si.', 'Sí.'], ['Com ', 'Com '],
    ['installacions', 'instal·lacions'], ['installacio', 'instal·lació'], ['Sollicitar', 'Sol·licitar'], ['sollicitud', 'sol·licitud'], ['Solicitud', 'Sol·licitud'],
    ['informés', 'informes'], ['mante', 'manté'], ['diferencia', 'diferència'], ['avaluacio', 'avaluació'], ['microbiologica', 'microbiològica'], ['avancada', 'avançada'],
    ['comunicacio', 'comunicació'], ['El primer pas es', 'El primer pas és'], ['El valor del programa es', 'El valor del programa és'],
    ['d avaluació', 'd’avaluació'], ['l avaluació', 'l’avaluació'], ['l escalat', 'l’escalat'], ['l OEM', 'l’OEM']
  ]
};

function applyTextReplacements(lang, value) {
  return (TYPOGRAPHY_REPLACEMENTS[lang] || []).reduce(
    (text, [from, to]) => text.split(from).join(to),
    value
  );
}

function applyLocalizedTypography(lang, value, key) {
  if (typeof value === 'string') return key === 'path' ? value : applyTextReplacements(lang, value);
  if (Array.isArray(value)) return value.map((item) => applyLocalizedTypography(lang, item, key));
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(
    Object.entries(value).map(([childKey, childValue]) => [
      childKey,
      applyLocalizedTypography(lang, childValue, childKey)
    ])
  );
}

export const OEM_KITS_PAGE = {
  en: withSections({
    path: '/oem-water-testing-kits',
    title: 'OEM water testing kits for partners who want to scale with science, brand and software',
    description: 'AquaVerify helps distributors, manufacturers, laboratories and integrators bring water microbiology solutions to market under the AquaVerify brand, co-branding or their own brand.',
    eyebrow: 'OEM and private label program',
    primaryCta: 'Request OEM program',
    secondaryCta: 'View commercial models',
    seoTitle: 'OEM water testing kits | Private label, co-branding and distribution | AquaVerify',
    seoDescription: 'AquaVerify OEM program for microbiological water testing kits, private label, co-branding, distribution, consumables, digital traceability and technical support.',
    heroPanelTitle: 'From product to partner program',
    heroNodes: [card('Kits', 'Water microbiology'), card('Brand', 'AquaVerify, co-branding or OEM'), card('Software', 'Traceability, reports and CoA'), card('Support', 'Onboarding and scale-up')],
    heroMetrics: [card('3 routes', 'Distribution, co-branding and OEM'), card('9 sectors', 'Priority B2B applications'), card('140+', 'Potential markets supported')],
    trustCards: [card('Product + platform', 'Microbiology kits, consumables and connected digital workflows.'), card('Commercial support', 'Launch material, technical messaging and partner enablement.'), card('Technical transfer', 'Documentation, training and protocols according to agreed scope.'), card('Scalable model', 'Repeat value through consumables, reporting, support and sector portfolio.')],
    modelsEyebrow: 'Commercial models',
    modelsTitle: 'Three ways to bring AquaVerify to your market',
    modelsBody: 'The program adapts to the desired level of brand, commercial autonomy, technical support and local requirements.',
    models: [
      model('AquaVerify distribution', 'Sell AquaVerify products with local support, inventory, training and a specialized portfolio for water microbiology.', ['AquaVerify catalog and commercial materials.', 'Technical support for presales, implementation and scale-up.', 'Best fit for scientific distributors, laboratories and water treatment companies.'], 'I want to distribute AquaVerify'),
      model('Technical co-branding', 'Combine AquaVerify credibility with your local, vertical or institutional presence for customers who value a global brand and close support.', ['Shared brand in proposals, documentation and training programs.', 'Commercial workflows adapted to territory, sector and key accounts.', 'Useful for partners with their own portfolio and recurring customers.'], 'Explore co-branding'),
      model('Private label / OEM', 'Integrate kits, consumables and AquaVerify workflows under your own brand, with packaging, documentation and launch process defined by scope.', ['Packaging and documentation adaptation options.', 'Technical transfer and training for commercial or laboratory teams.', 'Designed for manufacturers, integrators, regional distributors and multi-country groups.'], 'Request private label')
    ],
    architectureEyebrow: 'OEM system',
    architectureTitle: 'More than a box: a full architecture to sell, operate and retain customers',
    architectureBody: 'The value of the program is the combination of product, traceability, documentation, training and data. Partners can sell a recurring solution, not only a one-off purchase.',
    coreTitle: 'From product to partner program',
    coreBody: 'AquaVerify connects kits, brand, documentation, Cloud workflows and launch support into one partner-ready offer.',
    architectureCards: [card('Microbiology kits', 'ENUMERA, PLAQUE, INDICA and related consumables depending on availability and scope.'), card('Packaging and brand', 'AquaVerify brand, co-branding or private label with visual and documentary adaptation.'), card('Technical documentation', 'Datasheets, protocols, training material and implementation support.'), card('AquaVerify Cloud/App/CoA', 'Sample workflows, traceability, reading support, reports and customer communication.'), card('Launch support', 'Onboarding, messaging, sector focus and commercial scale-up.'), card('Recurring scale', 'Consumables, portfolio expansion, support and data for long-term customer relationships.')],
    productsEyebrow: 'Possible portfolio',
    productsTitle: 'Products and modules that can be part of the program',
    productsBody: 'The exact scope is defined by territory, application, matrix, volume, language, brand model and local requirements.',
    products: COMMON_PRODUCTS.en,
    launchEyebrow: 'Implementation',
    launchTitle: 'OEM launch route from evaluation to scale-up',
    launchBody: 'A practical route to qualify the opportunity, define the scope, prepare launch assets and scale with repeatable operations.',
    launchSteps: [card('Fit', 'Territory, channel, customer type, technical competence and commercial goal.'), card('Scope', 'Product selection, brand model, documentation, languages and support.'), card('Adaptation', 'Packaging, materials, digital workflows, forms, training and order process.'), card('Transfer', 'Commercial and technical training, SOPs, escalation criteria and issue handling.'), card('Launch', 'First accounts, sector campaigns, proposals, tracking and replenishment.'), card('Scale-up', 'New sectors, recurring consumables, reporting and portfolio expansion.')],
    selectorEyebrow: 'Choose your route',
    selectorTitle: 'What type of partner do you want to become?',
    selectorBody: 'Select a profile to see which program usually fits best. AquaVerify will review territory, volume, market and capabilities before confirming any scope.',
    selectorCta: 'Request OEM program',
    partnersCta: 'Partners',
    routes: {
      distributor: card('Specialized distributor', 'For companies already selling to laboratories, utilities, treatment plants, food industry, agriculture or facility management.'),
      manufacturer: card('Manufacturer or technical brand', 'For companies that want to expand their portfolio with microbiology kits and their own commercial identity.'),
      lab: card('Laboratory with B2B portfolio', 'For laboratories that want to offer analysis, kits, training or control programs to recurring customers.'),
      integrator: card('Integrator, engineering firm or consultancy', 'For teams implementing water, quality, compliance or digital transformation solutions for end customers.')
    },
    routeNotes: {
      distributor: 'Recommended model: AquaVerify distribution or co-branding with local support and sector portfolio.',
      manufacturer: 'Recommended model: OEM/private label with packaging, documentation, training and quality support defined by scope.',
      lab: 'Recommended model: technical co-branding, traceability platform and sector material to accelerate adoption.',
      integrator: 'Recommended model: partner program with kits, platform, reporting and deployment support.'
    },
    routeLabels: { distributor: 'Distributor', manufacturer: 'Manufacturer / brand', lab: 'Laboratory', integrator: 'Integrator / consultancy' },
    sectorsEyebrow: 'Sector applications',
    sectorsTitle: 'One OEM program, multiple B2B markets',
    sectorsBody: 'AquaVerify helps partners focus their proposition by sector, with messages, use cases and sales routes adapted to each buyer.',
    sectorCta: 'View sector',
    sectors: [
      card('Water analysis laboratories', 'TAT, CoA, traceability and advanced microbiology portfolio.'),
      card('Water quality control', 'Control plans, auditable evidence and technical reporting.'),
      card('Municipal water analysis', 'Networks, intakes, treatment, coliphages and public health.'),
      card('Food and beverage', 'Ingredient water, CIP, rinse water, batches and audits.'),
      card('Industrial process water', 'Intake, process, recirculation, reuse and discharge.'),
      card('Facility water risk', 'Internal networks, hot water systems, terminals and multi-site assets.'),
      card('Agriculture', 'Irrigation, reclaimed water, fertigation, packhouse and exports.'),
      card('Pharmaceutical and cosmetics', 'Critical water, QC microbiology, deviations, CAPA and audits.'),
      card('Hospitality, tourism and leisure', 'Hotels, spas, pools, seasonal reopening, suppliers and inspections.')
    ],
    comparisonEyebrow: 'Comparison',
    comparisonTitle: 'Choose the brand and support level you need',
    comparisonCards: [card('AquaVerify brand', 'Fastest route to sell with a recognizable technical brand. Catalog, local support, training and AquaVerify materials.'), card('Co-branding', 'Combine technical authority and local presence. Shared material, sector focus and adapted support.'), card('Private label / OEM', 'Integrate the solution under your own identity. Packaging, documentation, workflows and training according to project scope.')],
    requirementsEyebrow: 'Partner fit',
    requirementsTitle: 'What AquaVerify provides and what the partner provides',
    aquaverifyProvidesTitle: 'AquaVerify provides',
    partnerProvidesTitle: 'The partner provides',
    aquaverifyProvides: ['Kits, consumables and digital modules according to agreed scope.', 'Technical documentation, training materials and implementation support.', 'Sector experience for laboratories, utilities, industry, agriculture and facilities.', 'Support for proposals, technical escalation and value communication.'],
    partnerProvides: ['Market access, customer portfolio or regional commercial capability.', 'Responsibility for local requirements, claims, language and channel.', 'Storage, logistics, support or training capability according to model.', 'Quality commitment, commercial follow-up and technical communication.'],
    technicalEyebrow: 'Technical framework',
    technicalTitle: 'Technical compatibility and prudent documentation',
    technicalBody: 'Scopes are defined case by case. Documentation can align with recognized references for water microbiology and somatic coliphages when product, matrix and analytical plan require it.',
    references: [card('ISO 10705-2', 'Detection and enumeration of bacteriophages, part 2: somatic coliphages.'), card('EPA Method 1602', 'SAL procedure for somatic and F+ coliphages in water.'), card('Partner programs', 'Brand, packaging, support and documentation adapt to territory, regulation and commercial scope.')],
    formsEyebrow: 'Request',
    formsTitle: 'Start an OEM or private-label conversation',
    formsBody: 'Send country, company type, portfolio, target sectors and estimated volume. AquaVerify will review the most appropriate OEM route.',
    forms: {
      oem: { title: 'Request OEM / private label program', body: 'For manufacturers, brands, laboratories or distributors that want to integrate AquaVerify solutions under their own brand or co-branding.', submit: 'Send OEM request' }
    },
    formLabels: { name: 'Name and company', email: 'Professional email', country: 'Country or territory', companyType: 'Company type', model: 'Model of interest', volume: 'Estimated volume or current portfolio', sector: 'Main sector', message: 'Message' },
    modelOptions: ['AquaVerify distribution', 'Co-branding', 'Private label / OEM', 'OEM + digital platform', 'Not sure yet'],
    sectorOptions: ['Water analysis laboratories', 'Water quality control', 'Municipal water analysis', 'Food and beverage', 'Industrial process water', 'Facility water risk', 'Agriculture', 'Pharmaceutical and cosmetics', 'Hospitality, tourism and leisure'],
    countries: COMMON_COUNTRIES.en,
    faqEyebrow: 'Frequently asked questions',
    faqTitle: 'Common questions about OEM and private label',
    faqs: [
      { question: 'What is the difference between distribution, co-branding and OEM?', answer: 'Distribution keeps the AquaVerify brand, co-branding combines AquaVerify with the partner brand, and OEM allows evaluation of integration under the partner own brand with adapted packaging and documentation.' },
      { question: 'Can the program include software and reporting?', answer: 'Yes. Depending on the agreed scope, the program can include AquaVerify Cloud, App, sample traceability, reading support, technical reports and structured analysis reports.' },
      { question: 'Can packaging be adapted to my brand?', answer: 'Yes. Packaging, documentation and language adaptation are evaluated according to volume, territory, local requirements and brand model.' },
      { question: 'Which sectors can be addressed with an OEM program?', answer: 'The program can focus on laboratories, utilities, food and beverage, industry, facilities, agriculture, pharmaceuticals, cosmetics, hospitality, tourism and leisure.' },
      { question: 'Does AquaVerify automatically cover regulatory compliance in each country?', answer: 'No automatic compliance should be assumed. Regulatory requirements, claims, validation, labeling and import conditions must be reviewed by territory, matrix and intended use.' },
      { question: 'How does the process start?', answer: 'The first step is to share country, portfolio, target customers, technical capability, desired model and estimated volume. That information defines the evaluation route.' }
    ],
    cta: { title: 'Turn your channel into a recurring water microbiology solution', body: 'AquaVerify helps you move from selling individual products to offering a complete proposition: kits, consumables, traceability, reporting, technical support and sector portfolio.', primary: 'Request OEM program', secondary: 'View commercial models' }
  }),
  es: withSections({
    path: '/es/oem-kits-analisis-agua',
    title: 'Kits OEM de analisis de agua para partners que quieren escalar con ciencia, marca y software',
    description: 'AquaVerify permite a distribuidores, fabricantes, laboratorios e integradores llevar al mercado soluciones de microbiologia del agua bajo marca AquaVerify, co-branding o marca propia.',
    eyebrow: 'Programa OEM y marca blanca',
    primaryCta: 'Solicitar programa OEM',
    secondaryCta: 'Ver modelos comerciales',
    seoTitle: 'Kits OEM de analisis de agua | Marca blanca, co-branding y distribucion | AquaVerify',
    seoDescription: 'Programa OEM AquaVerify para kits microbiologicos de analisis de agua, marca blanca, co-branding, distribucion, consumibles, plataforma digital, trazabilidad y soporte tecnico.',
    directAnswer: {
      title: '¿Qué ofrece el programa OEM y marca blanca de AquaVerify?',
      body: 'El programa OEM de AquaVerify permite a partners especializados explorar modelos de distribución, co-branding o marca blanca para kits de análisis de agua, con soporte en producto, packaging, documentación y, cuando aplica, capa digital con AquaVerify Cloud. El alcance depende del país, cartera, volumen, requisitos técnicos, responsabilidades regulatorias y acuerdo comercial definido entre las partes.'
    },
    heroPanelTitle: 'De producto a programa de partner',
    heroNodes: [card('Kits', 'Microbiologia del agua'), card('Marca', 'AquaVerify, co-branding u OEM'), card('Software', 'Trazabilidad, informes y CoA'), card('Soporte', 'Onboarding y escalado')],
    heroMetrics: [card('3 rutas', 'Distribucion, co-branding y OEM'), card('9 sectores', 'Aplicaciones B2B prioritarias'), card('140+', 'Mercados potenciales atendidos')],
    trustCards: [card('Producto + plataforma', 'Kits microbiologicos, consumibles y flujos digitales conectados.'), card('Soporte comercial', 'Material de lanzamiento, argumentarios tecnicos y acompanamiento.'), card('Transferencia tecnica', 'Documentacion, formacion y protocolos segun alcance acordado.'), card('Modelo escalable', 'Repeticion por consumibles, reporting, soporte y cartera sectorial.')],
    modelsEyebrow: 'Modelos comerciales',
    modelsTitle: 'Tres formas de llevar AquaVerify a su mercado',
    modelsBody: 'El programa puede adaptarse al nivel de marca, autonomia comercial, soporte tecnico y requisitos locales de cada partner.',
    models: [
      model('Distribucion AquaVerify', 'Venda productos AquaVerify con soporte local, inventario, formacion y acceso a una cartera especializada para microbiologia del agua.', ['Catalogo AquaVerify y materiales comerciales.', 'Soporte tecnico para preventa, instalacion y escalado.', 'Ruta ideal para distribuidores cientificos, laboratorios y empresas de tratamiento.'], 'Quiero distribuir AquaVerify'),
      model('Co-branding tecnico', 'Combine la credibilidad de AquaVerify con su presencia local, vertical o institucional para clientes que valoran marca global y soporte cercano.', ['Marca compartida en propuestas, documentacion y programas de formacion.', 'Flujos comerciales adaptados a territorio, sector y cuenta clave.', 'Modelo util para partners con cartera propia y clientes recurrentes.'], 'Explorar co-branding'),
      model('Marca blanca / OEM', 'Integre kits, consumibles y flujos AquaVerify bajo su propia marca, con packaging, documentacion y proceso de lanzamiento definidos por alcance.', ['Opciones de packaging y documentacion adaptada.', 'Transferencia tecnica y formacion a equipos comerciales o de laboratorio.', 'Modelo para fabricantes, integradores, distribuidores regionales y grupos multi-pais.'], 'Solicitar marca blanca')
    ],
    architectureEyebrow: 'Sistema OEM',
    architectureTitle: 'Mas que una caja: una arquitectura completa para vender, operar y retener clientes',
    architectureBody: 'El valor del programa esta en unir producto, trazabilidad, documentacion, formacion y datos. Asi el partner puede vender una solucion recurrente, no solo una compra puntual.',
    coreTitle: 'De producto a programa de partner',
    coreBody: 'AquaVerify conecta kits, marca, documentacion, flujos Cloud y soporte de lanzamiento en una oferta preparada para partners.',
    architectureCards: [card('Kits microbiologicos', 'ENUMERA, PLAQUE, INDICA y consumibles asociados segun disponibilidad y alcance.'), card('Packaging y marca', 'Marca AquaVerify, co-branding o marca blanca con adaptacion visual y documental.'), card('Documentacion tecnica', 'Fichas, protocolos, material de formacion y soporte para implementacion.'), card('AquaVerify Cloud/App/CoA', 'Flujos de muestra, trazabilidad, lectura, informes y comunicacion con clientes.'), card('Soporte de lanzamiento', 'Onboarding, argumentarios, sectorizacion y escalado comercial.'), card('Escalado recurrente', 'Consumibles, cartera ampliada, soporte y datos para relacion continuada.')],
    productsEyebrow: 'Cartera posible',
    productsTitle: 'Productos y modulos que pueden formar parte del programa',
    productsBody: 'El alcance exacto se define por territorio, aplicacion, matriz, volumen, idioma, modelo de marca y requisitos locales.',
    products: COMMON_PRODUCTS.es,
    launchEyebrow: 'Implementacion',
    launchTitle: 'Ruta de lanzamiento OEM de evaluacion a escalado',
    launchBody: 'Una ruta practica para cualificar la oportunidad, definir el alcance, preparar activos de lanzamiento y escalar con operaciones repetibles.',
    launchSteps: [card('Encaje', 'Territorio, canal, tipo de cliente, competencia tecnica y objetivo comercial.'), card('Alcance', 'Seleccion de productos, modelo de marca, documentacion, idiomas y soporte.'), card('Adaptacion', 'Packaging, materiales, flujos digitales, formularios, formacion y proceso de pedido.'), card('Transferencia', 'Capacitacion comercial y tecnica, SOPs, criterios de escalado y gestion de incidencias.'), card('Lanzamiento', 'Primeras cuentas, campanas sectoriales, propuestas, seguimiento y reposicion.'), card('Escalado', 'Nuevos sectores, consumibles recurrentes, reporting y ampliacion de cartera.')],
    selectorEyebrow: 'Elija su ruta',
    selectorTitle: 'Que tipo de partner quiere ser?',
    selectorBody: 'Seleccione un perfil para ver que programa suele encajar mejor. AquaVerify revisara territorio, volumen, mercado y capacidades antes de confirmar cualquier alcance.',
    selectorCta: 'Solicitar programa OEM',
    partnersCta: 'Partners',
    routes: {
      distributor: card('Distribuidor especializado', 'Para empresas que ya venden a laboratorios, utilities, plantas de tratamiento, industria alimentaria, agricultura o facility management.'),
      manufacturer: card('Fabricante o marca tecnica', 'Para companias que quieren ampliar su catalogo con kits microbiologicos y una identidad comercial propia.'),
      lab: card('Laboratorio con cartera B2B', 'Para laboratorios que quieren ofrecer analisis, kits, formacion o programas de control a sus clientes recurrentes.'),
      integrator: card('Integrador, ingenieria o consultora', 'Para equipos que implementan soluciones de agua, calidad, cumplimiento o transformacion digital en clientes finales.')
    },
    routeNotes: {
      distributor: 'Modelo recomendado: distribucion AquaVerify o co-branding con soporte local y cartera por sectores.',
      manufacturer: 'Modelo recomendado: OEM/marca blanca con packaging, documentacion, formacion y soporte de calidad definidos por alcance.',
      lab: 'Modelo recomendado: co-branding tecnico, plataforma de trazabilidad y materiales sectoriales para acelerar adopcion.',
      integrator: 'Modelo recomendado: programa de partner con kits, plataforma, reporting y soporte de despliegue.'
    },
    routeLabels: { distributor: 'Distribuidor', manufacturer: 'Fabricante / marca', lab: 'Laboratorio', integrator: 'Integrador / consultora' },
    sectorsEyebrow: 'Aplicaciones sectoriales',
    sectorsTitle: 'Un mismo programa OEM, multiples mercados B2B',
    sectorsBody: 'AquaVerify permite al partner enfocar su propuesta por sector, con mensajes, casos de uso y rutas de venta adaptadas a cada comprador.',
    sectorCta: 'Ver sector',
    sectors: [
      card('Laboratorios de analisis de agua', 'TAT, CoA, trazabilidad y cartera microbiologica avanzada.'),
      card('Control de calidad del agua', 'Planes de control, evidencias auditables y reporting tecnico.'),
      card('Analisis de agua municipal', 'Redes, captaciones, tratamiento, colifagos y salud publica.'),
      card('Alimentacion y bebidas', 'Agua ingrediente, CIP, enjuague, lotes y auditorias.'),
      card('Agua de proceso industrial', 'Captacion, proceso, recirculacion, reutilizacion y descarga.'),
      card('Riesgo de agua en instalaciones', 'Redes interiores, ACS, puntos terminales y activos multi-sede.'),
      card('Agricultura', 'Riego, agua regenerada, fertirrigacion, packhouse y exportacion.'),
      card('Farmaceutica y cosmetica', 'Agua critica, QC microbiologia, desviaciones, CAPA y auditorias.'),
      card('Hosteleria, turismo y ocio', 'Hoteles, spas, piscinas, reaperturas, proveedores e inspecciones.')
    ],
    comparisonEyebrow: 'Comparativa',
    comparisonTitle: 'Elija el nivel de marca y soporte que necesita',
    comparisonCards: [card('Marca AquaVerify', 'Para vender rapido con una marca tecnica reconocible. Catalogo, soporte local, formacion y materiales AquaVerify.'), card('Co-branding', 'Para unir autoridad tecnica y presencia local. Material compartido, foco sectorial y soporte adaptado.'), card('Marca blanca / OEM', 'Para integrar la solucion bajo su propia identidad. Packaging, documentacion, flujos y formacion segun proyecto.')],
    requirementsEyebrow: 'Encaje de partner',
    requirementsTitle: 'Que aporta AquaVerify y que aporta el partner',
    aquaverifyProvidesTitle: 'AquaVerify aporta',
    partnerProvidesTitle: 'El partner aporta',
    aquaverifyProvides: ['Kits, consumibles y modulos digitales segun alcance acordado.', 'Documentacion tecnica, materiales de formacion y soporte de implementacion.', 'Experiencia sectorial para laboratorios, utilities, industria, agricultura y facilities.', 'Soporte para propuestas, escalado tecnico y comunicacion de valor.'],
    partnerProvides: ['Acceso al mercado, cartera de clientes o capacidad comercial regional.', 'Responsabilidad sobre requisitos locales, claims, idioma y canal.', 'Capacidad de almacenamiento, logistica, soporte o formacion segun modelo.', 'Compromiso de calidad, seguimiento comercial y comunicacion tecnica.'],
    technicalEyebrow: 'Marco tecnico',
    technicalTitle: 'Compatibilidad tecnica y documentacion prudente',
    technicalBody: 'Los alcances se definen caso por caso. La documentacion puede alinearse con referencias reconocidas para microbiologia del agua y colifagos somaticos cuando el producto, matriz y plan analitico lo requieran.',
    references: [card('ISO 10705-2', 'Deteccion y enumeracion de bacteriofagos, parte 2: colifagos somaticos.'), card('EPA Method 1602', 'Procedimiento SAL para colifagos somaticos y F+ en agua.'), card('Programas de partner', 'Marca, packaging, soporte y documentacion se adaptan a territorio, normativa y alcance comercial.')],
    formsEyebrow: 'Solicitud',
    formsTitle: 'Inicie una conversación OEM o de marca blanca',
    formsBody: 'Envíe país, tipo de empresa, cartera, sectores objetivo y volumen estimado. AquaVerify revisará la ruta OEM más adecuada.',
    forms: {
      oem: { title: 'Solicitar programa OEM / marca blanca', body: 'Para fabricantes, marcas, laboratorios o distribuidores que quieren integrar soluciones AquaVerify bajo marca propia o co-branding.', submit: 'Enviar solicitud OEM' }
    },
    formLabels: { name: 'Nombre y empresa', email: 'Email profesional', country: 'Pais o territorio', companyType: 'Tipo de empresa', model: 'Modelo de interes', volume: 'Volumen estimado o cartera actual', sector: 'Sector principal', message: 'Mensaje' },
    modelOptions: ['Distribucion AquaVerify', 'Co-branding', 'Marca blanca / OEM', 'OEM + plataforma digital', 'No estoy seguro'],
    sectorOptions: ['Laboratorios de analisis de agua', 'Control de calidad del agua', 'Analisis de agua municipal', 'Alimentacion y bebidas', 'Agua de proceso industrial', 'Riesgo de agua en instalaciones', 'Agricultura', 'Farmaceutica y cosmetica', 'Hosteleria, turismo y ocio'],
    countries: COMMON_COUNTRIES.es,
    technicalTable: {
      title: 'Modelos comerciales y alcance prudente',
      columns: ['Modelo', 'Marca visible', 'Para quién encaja', 'Soporte posible', 'Nota prudente'],
      rows: [
        ['Distribución', 'AquaVerify', 'Distribuidores científicos, laboratorios, tratamiento de agua y canales B2B con capacidad técnica.', 'Catálogo, materiales comerciales, formación y coordinación técnica según acuerdo.', 'No implica OEM ni marca blanca por defecto; el alcance depende del territorio y acuerdo comercial.'],
        ['Co-branding', 'AquaVerify + partner', 'Partners con marca local, cartera propia o presencia sectorial que buscan una propuesta compartida.', 'Mensajes, documentación, packaging o campañas compartidas según configuración.', 'Debe definirse qué marca aparece, qué responsabilidades asume cada parte y qué claims se pueden usar.'],
        ['OEM/marca blanca', 'Marca del partner', 'Fabricantes, integradores o distribuidores con cartera propia, volumen y soporte operativo.', 'Producto, packaging, documentación, formación y capa digital cuando aplica.', 'No incluye por sí mismo autorizaciones regulatorias; país, matriz, método y responsabilidades deben revisarse caso por caso.']
      ]
    },
    faqEyebrow: 'Preguntas frecuentes',
    faqTitle: 'Dudas comunes sobre OEM y marca blanca',
    faqs: [
      { question: '¿Qué diferencia hay entre distribución, co-branding y OEM?', answer: 'La distribución mantiene la marca AquaVerify, el co-branding combina AquaVerify con la marca del partner y OEM/marca blanca permite explorar una integración bajo identidad del partner. Cada modelo exige definir responsabilidades, documentación, soporte, territorio y alcance comercial.' },
      { question: '¿Un partner puede vender kits bajo su propia marca?', answer: 'Puede evaluarse dentro de un modelo OEM o marca blanca, según país, cartera, volumen, capacidad técnica, packaging, documentación y acuerdo comercial. No debe asumirse disponibilidad en cualquier mercado ni para cualquier configuración.' },
      { question: '¿AquaVerify Cloud puede formar parte de una propuesta OEM?', answer: 'Sí, puede formar parte de la propuesta cuando el flujo necesita trazabilidad documental, reporting, CoA, portal cliente o seguimiento comercial. El alcance digital depende de módulos, usuarios, integraciones y acuerdo entre las partes.' },
      { question: '¿El programa OEM incluye aprobación regulatoria?', answer: 'No. El programa puede aportar producto, documentación, formación, packaging y soporte técnico según acuerdo, pero requisitos regulatorios, etiquetado, claims, importación y uso previsto deben revisarse por país, matriz, método y autoridad competente.' },
      { question: '¿Qué tipo de partner encaja mejor con OEM?', answer: 'Suelen encajar distribuidores científicos, fabricantes, integradores, laboratorios o empresas de tratamiento con cartera B2B, capacidad técnica, soporte operativo y una propuesta clara para microbiología del agua.' }
    ],
    cta: { title: 'Convierta su canal en una solucion recurrente de microbiologia del agua', body: 'AquaVerify le ayuda a pasar de vender productos sueltos a ofrecer una propuesta completa: kits, consumibles, trazabilidad, reporting, soporte tecnico y cartera sectorial.', primary: 'Solicitar programa OEM', secondary: 'Ver modelos comerciales' }
  }),
  fr: withSections({
    path: '/fr/oem-kits-analyse-eau',
    title: 'Kits OEM d analyse de l eau pour partenaires qui veulent croitre avec science, marque et logiciel',
    description: 'AquaVerify aide les distributeurs, fabricants, laboratoires et integrateurs a commercialiser des solutions de microbiologie de l eau sous marque AquaVerify, en co-branding ou sous leur propre marque.',
    eyebrow: 'Programme OEM et marque blanche',
    primaryCta: 'Demander le programme OEM',
    secondaryCta: 'Voir les modeles commerciaux',
    seoTitle: 'Kits OEM d analyse de l eau | Marque blanche, co-branding et distribution | AquaVerify',
    seoDescription: 'Programme OEM AquaVerify pour kits microbiologiques d analyse de l eau, marque blanche, co-branding, distribution, consommables, tracabilite digitale et support technique.',
    heroPanelTitle: 'Du produit au programme partenaire',
    heroNodes: [card('Kits', 'Microbiologie de l eau'), card('Marque', 'AquaVerify, co-branding ou OEM'), card('Logiciel', 'Tracabilite, rapports et CoA'), card('Support', 'Onboarding et montee en charge')],
    heroMetrics: [card('3 routes', 'Distribution, co-branding et OEM'), card('9 secteurs', 'Applications B2B prioritaires'), card('140+', 'Marches potentiels accompagnes')],
    trustCards: [card('Produit + plateforme', 'Kits microbiologiques, consommables et flux digitaux connectes.'), card('Support commercial', 'Materiel de lancement, argumentaires techniques et accompagnement.'), card('Transfert technique', 'Documentation, formation et protocoles selon perimetre convenu.'), card('Modele scalable', 'Repetition par consommables, reporting, support et portefeuille sectoriel.')],
    modelsEyebrow: 'Modeles commerciaux',
    modelsTitle: 'Trois facons de proposer AquaVerify sur votre marche',
    modelsBody: 'Le programme s adapte au niveau de marque, autonomie commerciale, support technique et exigences locales de chaque partenaire.',
    models: [
      model('Distribution AquaVerify', 'Vendez les produits AquaVerify avec support local, stock, formation et portefeuille specialise pour la microbiologie de l eau.', ['Catalogue AquaVerify et supports commerciaux.', 'Support technique pour avant-vente, mise en oeuvre et montee en charge.', 'Adapte aux distributeurs scientifiques, laboratoires et entreprises de traitement de l eau.'], 'Distribuer AquaVerify'),
      model('Co-branding technique', 'Associez la credibilite d AquaVerify a votre presence locale, verticale ou institutionnelle.', ['Marque partagee dans propositions, documentation et programmes de formation.', 'Flux commerciaux adaptes au territoire, secteur et comptes cles.', 'Utile pour partenaires avec portefeuille propre et clients recurrents.'], 'Explorer le co-branding'),
      model('Marque blanche / OEM', 'Integrez kits, consommables et flux AquaVerify sous votre propre marque.', ['Options d adaptation de packaging et documentation.', 'Transfert technique et formation des equipes commerciales ou laboratoire.', 'Concu pour fabricants, integrateurs, distributeurs regionaux et groupes multi-pays.'], 'Demander marque blanche')
    ],
    architectureEyebrow: 'Systeme OEM',
    architectureTitle: 'Plus qu une boite : une architecture complete pour vendre, operer et fideliser',
    architectureBody: 'La valeur du programme vient de l association produit, tracabilite, documentation, formation et donnees.',
    coreTitle: 'Du produit au programme partenaire',
    coreBody: 'AquaVerify connecte kits, marque, documentation, flux Cloud et support de lancement en une offre prete pour les partenaires.',
    architectureCards: [card('Kits microbiologiques', 'ENUMERA, PLAQUE, INDICA et consommables associes selon disponibilite et perimetre.'), card('Packaging et marque', 'Marque AquaVerify, co-branding ou marque blanche avec adaptation visuelle et documentaire.'), card('Documentation technique', 'Fiches, protocoles, materiel de formation et support de mise en oeuvre.'), card('AquaVerify Cloud/App/CoA', 'Flux echantillon, tracabilite, lecture, rapports et communication client.'), card('Support de lancement', 'Onboarding, argumentaires, sectorisation et montee en charge commerciale.'), card('Echelle recurrente', 'Consommables, portefeuille elargi, support et donnees pour relation continue.')],
    productsEyebrow: 'Portefeuille possible',
    productsTitle: 'Produits et modules pouvant integrer le programme',
    productsBody: 'Le perimetre exact se definit par territoire, application, matrice, volume, langue, modele de marque et exigences locales.',
    products: COMMON_PRODUCTS.fr,
    launchEyebrow: 'Mise en oeuvre',
    launchTitle: 'Parcours de lancement OEM de l evaluation a l echelle',
    launchBody: 'Une route pratique pour qualifier l opportunite, definir le perimetre, preparer les actifs de lancement et passer a l echelle.',
    launchSteps: [card('Adequation', 'Territoire, canal, type de client, competence technique et objectif commercial.'), card('Perimetre', 'Selection produits, modele de marque, documentation, langues et support.'), card('Adaptation', 'Packaging, materiels, flux digitaux, formulaires, formation et processus de commande.'), card('Transfert', 'Formation commerciale et technique, SOP, criteres d escalade et gestion incidents.'), card('Lancement', 'Premiers comptes, campagnes sectorielles, propositions, suivi et reapprovisionnement.'), card('Echelle', 'Nouveaux secteurs, consommables recurrents, reporting et extension portefeuille.')],
    selectorEyebrow: 'Choisir la route',
    selectorTitle: 'Quel type de partenaire voulez-vous devenir ?',
    selectorBody: 'Selectionnez un profil pour voir quel programme correspond le plus souvent. AquaVerify verifiera territoire, volume, marche et capacites avant confirmation.',
    selectorCta: 'Demander le programme OEM',
    partnersCta: 'Partenaires',
    routes: {
      distributor: card('Distributeur specialise', 'Pour entreprises vendant deja a laboratoires, utilities, traitement, industrie alimentaire, agriculture ou facility management.'),
      manufacturer: card('Fabricant ou marque technique', 'Pour societes qui veulent elargir leur catalogue avec kits microbiologiques et identite commerciale propre.'),
      lab: card('Laboratoire avec portefeuille B2B', 'Pour laboratoires qui veulent proposer analyses, kits, formation ou programmes de controle a leurs clients recurrents.'),
      integrator: card('Integrateur, ingenierie ou conseil', 'Pour equipes deployant des solutions eau, qualite, conformite ou transformation digitale chez les clients finaux.')
    },
    routeNotes: {
      distributor: 'Modele recommande : distribution AquaVerify ou co-branding avec support local et portefeuille sectoriel.',
      manufacturer: 'Modele recommande : OEM/marque blanche avec packaging, documentation, formation et support qualite definis par perimetre.',
      lab: 'Modele recommande : co-branding technique, plateforme de tracabilite et materiels sectoriels pour accelerer l adoption.',
      integrator: 'Modele recommande : programme partenaire avec kits, plateforme, reporting et support de deploiement.'
    },
    routeLabels: { distributor: 'Distributeur', manufacturer: 'Fabricant / marque', lab: 'Laboratoire', integrator: 'Integrateur / conseil' },
    sectorsEyebrow: 'Applications sectorielles',
    sectorsTitle: 'Un programme OEM, plusieurs marches B2B',
    sectorsBody: 'AquaVerify aide le partenaire a cibler sa proposition par secteur, avec messages, cas d usage et routes de vente adaptees.',
    sectorCta: 'Voir le secteur',
    sectors: [card('Laboratoires d analyse de l eau', 'TAT, CoA, tracabilite et portefeuille microbiologique avance.'), card('Controle qualite de l eau', 'Plans de controle, preuves auditables et reporting technique.'), card('Analyse de l eau municipale', 'Reseaux, captages, traitement, coliphages et sante publique.'), card('Food & beverage', 'Eau ingredient, CIP, rincage, lots et audits.'), card('Eau de process industriel', 'Captage, process, recirculation, reutilisation et rejet.'), card('Risque eau dans les installations', 'Reseaux internes, ECS, points terminaux et actifs multi-sites.'), card('Agriculture', 'Irrigation, eau reusee, fertigation, packhouse et export.'), card('Pharmaceutique et cosmetique', 'Eau critique, QC microbiologie, deviations, CAPA et audits.'), card('Hotellerie, tourisme et loisirs', 'Hotels, spas, piscines, reouvertures, fournisseurs et inspections.')],
    comparisonEyebrow: 'Comparatif',
    comparisonTitle: 'Choisissez le niveau de marque et de support necessaire',
    comparisonCards: [card('Marque AquaVerify', 'Pour vendre rapidement avec une marque technique identifiable. Catalogue, support local, formation et supports AquaVerify.'), card('Co-branding', 'Pour unir autorite technique et presence locale. Materiel partage, focus sectoriel et support adapte.'), card('Marque blanche / OEM', 'Pour integrer la solution sous votre propre identite. Packaging, documentation, flux et formation selon projet.')],
    requirementsEyebrow: 'Adequation partenaire',
    requirementsTitle: 'Ce qu apporte AquaVerify et ce qu apporte le partenaire',
    aquaverifyProvidesTitle: 'AquaVerify apporte',
    partnerProvidesTitle: 'Le partenaire apporte',
    aquaverifyProvides: ['Kits, consommables et modules digitaux selon perimetre convenu.', 'Documentation technique, supports de formation et support de mise en oeuvre.', 'Experience sectorielle pour laboratoires, utilities, industrie, agriculture et facilities.', 'Support pour propositions, escalade technique et communication de valeur.'],
    partnerProvides: ['Acces au marche, portefeuille clients ou capacite commerciale regionale.', 'Responsabilite sur exigences locales, claims, langue et canal.', 'Capacite de stockage, logistique, support ou formation selon modele.', 'Engagement qualite, suivi commercial et communication technique.'],
    technicalEyebrow: 'Cadre technique',
    technicalTitle: 'Compatibilite technique et documentation prudente',
    technicalBody: 'Les perimetres sont definis au cas par cas. La documentation peut s aligner sur des references reconnues pour la microbiologie de l eau et les coliphages somatiques.',
    references: [card('ISO 10705-2', 'Detection et denombrement des bacteriophages, partie 2 : coliphages somatiques.'), card('EPA Method 1602', 'Procedure SAL pour coliphages somatiques et F+ dans l eau.'), card('Programmes partenaires', 'Marque, packaging, support et documentation s adaptent au territoire, a la reglementation et au perimetre commercial.')],
    formsEyebrow: 'Demande',
    formsTitle: 'Démarrer une conversation OEM ou marque blanche',
    formsBody: 'Envoyez pays, type d’entreprise, portefeuille, secteurs cibles et volume estimé. AquaVerify vérifiera la route OEM la plus adaptée.',
    forms: { oem: { title: 'Demander programme OEM / marque blanche', body: 'Pour fabricants, marques, laboratoires ou distributeurs qui veulent integrer AquaVerify sous marque propre ou co-branding.', submit: 'Envoyer demande OEM' } },
    formLabels: { name: 'Nom et entreprise', email: 'Email professionnel', country: 'Pays ou territoire', companyType: 'Type d entreprise', model: 'Modele d interet', volume: 'Volume estime ou portefeuille actuel', sector: 'Secteur principal', message: 'Message' },
    modelOptions: ['Distribution AquaVerify', 'Co-branding', 'Marque blanche / OEM', 'OEM + plateforme digitale', 'Pas encore sur'],
    sectorOptions: ['Laboratoires d analyse de l eau', 'Controle qualite de l eau', 'Analyse de l eau municipale', 'Food & beverage', 'Eau de process industriel', 'Risque eau dans les installations', 'Agriculture', 'Pharmaceutique et cosmetique', 'Hotellerie, tourisme et loisirs'],
    countries: COMMON_COUNTRIES.fr,
    faqEyebrow: 'Questions frequentes',
    faqTitle: 'Questions frequentes sur OEM et marque blanche',
    faqs: [
      { question: 'Quelle difference entre distribution, co-branding et OEM ?', answer: 'La distribution garde la marque AquaVerify, le co-branding associe AquaVerify a la marque partenaire et l OEM permet d evaluer une integration sous marque propre avec packaging et documentation adaptes.' },
      { question: 'Le programme peut-il inclure logiciel et reporting ?', answer: 'Oui. Selon le perimetre convenu, le programme peut inclure AquaVerify Cloud, App, tracabilite echantillon, aide a la lecture, rapports techniques et rapports d analyse structures.' },
      { question: 'Le packaging peut-il etre adapte a ma marque ?', answer: 'Oui. Packaging, documentation et adaptation linguistique sont evalues selon volume, territoire, exigences locales et modele de marque.' },
      { question: 'Quels secteurs peuvent etre travailles avec un programme OEM ?', answer: 'Le programme peut viser laboratoires, utilities, food & beverage, industrie, installations, agriculture, pharmaceutique, cosmetique, hotellerie, tourisme et loisirs.' },
      { question: 'AquaVerify couvre-t-il automatiquement la conformite reglementaire dans chaque pays ?', answer: 'Aucune conformite automatique ne doit etre supposee. Exigences reglementaires, claims, validation, etiquetage et import doivent etre verifies par territoire, matrice et usage prevu.' },
      { question: 'Comment demarre le processus ?', answer: 'La premiere etape consiste a partager pays, portefeuille, clients cibles, capacite technique, modele souhaite et volume estime. Ces informations definissent la route d evaluation.' }
    ],
    cta: { title: 'Transformez votre canal en solution recurrente de microbiologie de l eau', body: 'AquaVerify vous aide a passer de produits isoles a une proposition complete : kits, consommables, tracabilite, reporting, support technique et portefeuille sectoriel.', primary: 'Demander le programme OEM', secondary: 'Voir les modeles commerciaux' }
  }),
  it: withSections({
    path: '/it/oem-kit-analisi-acqua',
    title: 'Kit OEM per analisi dell acqua per partner che vogliono scalare con scienza, brand e software',
    description: 'AquaVerify aiuta distributori, produttori, laboratori e integratori a portare sul mercato soluzioni di microbiologia dell acqua con brand AquaVerify, co-branding o marchio proprio.',
    eyebrow: 'Programma OEM e private label',
    primaryCta: 'Richiedi programma OEM',
    secondaryCta: 'Vedi modelli commerciali',
    seoTitle: 'Kit OEM per analisi dell acqua | Private label, co-branding e distribuzione | AquaVerify',
    seoDescription: 'Programma OEM AquaVerify per kit microbiologici di analisi dell acqua, private label, co-branding, distribuzione, consumabili, tracciabilita digitale e supporto tecnico.',
    heroPanelTitle: 'Dal prodotto al programma partner',
    heroNodes: [card('Kit', 'Microbiologia dell acqua'), card('Brand', 'AquaVerify, co-branding o OEM'), card('Software', 'Tracciabilita, report e CoA'), card('Supporto', 'Onboarding e scalabilita')],
    heroMetrics: [card('3 percorsi', 'Distribuzione, co-branding e OEM'), card('9 settori', 'Applicazioni B2B prioritarie'), card('140+', 'Mercati potenziali supportati')],
    trustCards: [card('Prodotto + piattaforma', 'Kit microbiologici, consumabili e workflow digitali collegati.'), card('Supporto commerciale', 'Materiale lancio, argomentari tecnici e accompagnamento.'), card('Trasferimento tecnico', 'Documentazione, formazione e protocolli secondo perimetro concordato.'), card('Modello scalabile', 'Ripetizione tramite consumabili, reporting, supporto e portfolio settoriale.')],
    modelsEyebrow: 'Modelli commerciali',
    modelsTitle: 'Tre modi per portare AquaVerify nel vostro mercato',
    modelsBody: 'Il programma si adatta a livello di brand, autonomia commerciale, supporto tecnico e requisiti locali.',
    models: [
      model('Distribuzione AquaVerify', 'Vendete prodotti AquaVerify con supporto locale, inventario, formazione e portfolio specializzato per microbiologia dell acqua.', ['Catalogo AquaVerify e materiali commerciali.', 'Supporto tecnico per presales, implementazione e scalabilita.', 'Adatto a distributori scientifici, laboratori e aziende trattamento acqua.'], 'Voglio distribuire AquaVerify'),
      model('Co-branding tecnico', 'Combinate la credibilita AquaVerify con presenza locale, verticale o istituzionale.', ['Brand condiviso in proposte, documentazione e programmi formativi.', 'Workflow commerciali adattati a territorio, settore e account chiave.', 'Utile per partner con portfolio proprio e clienti ricorrenti.'], 'Esplora co-branding'),
      model('Private label / OEM', 'Integrate kit, consumabili e flussi AquaVerify sotto il vostro brand.', ['Opzioni di packaging e documentazione adattata.', 'Trasferimento tecnico e formazione a team commerciali o di laboratorio.', 'Modello per produttori, integratori, distributori regionali e gruppi multi-paese.'], 'Richiedi private label')
    ],
    architectureEyebrow: 'Sistema OEM',
    architectureTitle: 'Piu di una scatola: un architettura completa per vendere, operare e fidelizzare',
    architectureBody: 'Il valore del programma nasce dall unione di prodotto, tracciabilita, documentazione, formazione e dati.',
    coreTitle: 'Dal prodotto al programma partner',
    coreBody: 'AquaVerify collega kit, brand, documentazione, workflow Cloud e supporto lancio in un offerta pronta per partner.',
    architectureCards: [card('Kit microbiologici', 'ENUMERA, PLAQUE, INDICA e consumabili associati secondo disponibilita e perimetro.'), card('Packaging e brand', 'Brand AquaVerify, co-branding o private label con adattamento visivo e documentale.'), card('Documentazione tecnica', 'Schede, protocolli, materiale formativo e supporto implementazione.'), card('AquaVerify Cloud/App/CoA', 'Workflow campione, tracciabilita, lettura, report e comunicazione clienti.'), card('Supporto lancio', 'Onboarding, messaggi, focus settoriale e scalabilita commerciale.'), card('Scala ricorrente', 'Consumabili, ampliamento portfolio, supporto e dati per relazione continuativa.')],
    productsEyebrow: 'Portfolio possibile',
    productsTitle: 'Prodotti e moduli che possono far parte del programma',
    productsBody: 'Il perimetro esatto si definisce per territorio, applicazione, matrice, volume, lingua, modello brand e requisiti locali.',
    products: COMMON_PRODUCTS.it,
    launchEyebrow: 'Implementazione',
    launchTitle: 'Percorso di lancio OEM dalla valutazione alla scalabilita',
    launchBody: 'Un percorso pratico per qualificare opportunita, definire perimetro, preparare asset lancio e scalare con operazioni ripetibili.',
    launchSteps: [card('Fit', 'Territorio, canale, tipo cliente, competenza tecnica e obiettivo commerciale.'), card('Perimetro', 'Selezione prodotti, modello brand, documentazione, lingue e supporto.'), card('Adattamento', 'Packaging, materiali, workflow digitali, form, formazione e processo ordine.'), card('Trasferimento', 'Formazione commerciale e tecnica, SOP, criteri escalation e gestione problemi.'), card('Lancio', 'Primi account, campagne settoriali, proposte, tracking e replenishment.'), card('Scala', 'Nuovi settori, consumabili ricorrenti, reporting e ampliamento portfolio.')],
    selectorEyebrow: 'Scegli il percorso',
    selectorTitle: 'Che tipo di partner volete diventare?',
    selectorBody: 'Selezionate un profilo per vedere quale programma di solito si adatta meglio. AquaVerify rivedra territorio, volume, mercato e capacita.',
    selectorCta: 'Richiedi programma OEM',
    partnersCta: 'Partner',
    routes: {
      distributor: card('Distributore specializzato', 'Per aziende che gia vendono a laboratori, utility, trattamento, food industry, agricoltura o facility management.'),
      manufacturer: card('Produttore o brand tecnico', 'Per aziende che vogliono ampliare il catalogo con kit microbiologici e identita commerciale propria.'),
      lab: card('Laboratorio con portfolio B2B', 'Per laboratori che vogliono offrire analisi, kit, formazione o programmi di controllo a clienti ricorrenti.'),
      integrator: card('Integratore, ingegneria o consulenza', 'Per team che implementano soluzioni acqua, qualita, compliance o trasformazione digitale.')
    },
    routeNotes: {
      distributor: 'Modello consigliato: distribuzione AquaVerify o co-branding con supporto locale e portfolio settoriale.',
      manufacturer: 'Modello consigliato: OEM/private label con packaging, documentazione, formazione e supporto qualita definiti dal perimetro.',
      lab: 'Modello consigliato: co-branding tecnico, piattaforma tracciabilita e materiali settoriali per accelerare adozione.',
      integrator: 'Modello consigliato: programma partner con kit, piattaforma, reporting e supporto deployment.'
    },
    routeLabels: { distributor: 'Distributore', manufacturer: 'Produttore / brand', lab: 'Laboratorio', integrator: 'Integratore / consulenza' },
    sectorsEyebrow: 'Applicazioni settoriali',
    sectorsTitle: 'Un programma OEM, molti mercati B2B',
    sectorsBody: 'AquaVerify aiuta il partner a focalizzare la proposta per settore, con messaggi, use case e percorsi vendita adattati.',
    sectorCta: 'Vedi settore',
    sectors: [card('Laboratori analisi acqua', 'TAT, CoA, tracciabilita e portfolio microbiologico avanzato.'), card('Controllo qualita acqua', 'Piani controllo, evidenze auditabili e reporting tecnico.'), card('Analisi acqua municipale', 'Reti, captazioni, trattamento, colifagi e salute pubblica.'), card('Food & beverage', 'Acqua ingrediente, CIP, risciacquo, lotti e audit.'), card('Acqua di processo industriale', 'Captazione, processo, ricircolo, riuso e scarico.'), card('Rischio acqua in strutture', 'Reti interne, acqua calda, terminali e asset multi-sito.'), card('Agricoltura', 'Irrigazione, acqua rigenerata, fertirrigazione, packhouse ed export.'), card('Farmaceutica e cosmetica', 'Acqua critica, QC microbiologia, deviazioni, CAPA e audit.'), card('Hospitality, turismo e leisure', 'Hotel, spa, piscine, riaperture, fornitori e ispezioni.')],
    comparisonEyebrow: 'Confronto',
    comparisonTitle: 'Scegliete livello di brand e supporto necessario',
    comparisonCards: [card('Brand AquaVerify', 'Per vendere rapidamente con un brand tecnico riconoscibile. Catalogo, supporto locale, formazione e materiali AquaVerify.'), card('Co-branding', 'Per unire autorita tecnica e presenza locale. Materiale condiviso, focus settoriale e supporto adattato.'), card('Private label / OEM', 'Per integrare la soluzione sotto la vostra identita. Packaging, documentazione, workflow e formazione secondo progetto.')],
    requirementsEyebrow: 'Fit partner',
    requirementsTitle: 'Cosa porta AquaVerify e cosa porta il partner',
    aquaverifyProvidesTitle: 'AquaVerify fornisce',
    partnerProvidesTitle: 'Il partner fornisce',
    aquaverifyProvides: ['Kit, consumabili e moduli digitali secondo perimetro concordato.', 'Documentazione tecnica, materiali formativi e supporto implementazione.', 'Esperienza settoriale per laboratori, utility, industria, agricoltura e facility.', 'Supporto per proposte, escalation tecnica e comunicazione valore.'],
    partnerProvides: ['Accesso al mercato, portfolio clienti o capacita commerciale regionale.', 'Responsabilita su requisiti locali, claim, lingua e canale.', 'Capacita di stoccaggio, logistica, supporto o formazione secondo modello.', 'Impegno qualita, follow-up commerciale e comunicazione tecnica.'],
    technicalEyebrow: 'Quadro tecnico',
    technicalTitle: 'Compatibilita tecnica e documentazione prudente',
    technicalBody: 'I perimetri sono definiti caso per caso. La documentazione puo allinearsi a riferimenti riconosciuti per microbiologia acqua e colifagi somatici.',
    references: [card('ISO 10705-2', 'Rilevazione ed enumerazione dei batteriofagi, parte 2: colifagi somatici.'), card('EPA Method 1602', 'Procedura SAL per colifagi somatici e F+ in acqua.'), card('Programmi partner', 'Brand, packaging, supporto e documentazione si adattano a territorio, normativa e perimetro commerciale.')],
    formsEyebrow: 'Richiesta',
    formsTitle: 'Avvia una conversazione OEM o private label',
    formsBody: 'Invia paese, tipo azienda, portfolio, settori target e volume stimato. AquaVerify rivedrà il percorso OEM più adatto.',
    forms: { oem: { title: 'Richiedi programma OEM / private label', body: 'Per produttori, brand, laboratori o distributori che vogliono integrare AquaVerify sotto marchio proprio o co-branding.', submit: 'Invia richiesta OEM' } },
    formLabels: { name: 'Nome e azienda', email: 'Email professionale', country: 'Paese o territorio', companyType: 'Tipo azienda', model: 'Modello di interesse', volume: 'Volume stimato o portfolio attuale', sector: 'Settore principale', message: 'Messaggio' },
    modelOptions: ['Distribuzione AquaVerify', 'Co-branding', 'Private label / OEM', 'OEM + piattaforma digitale', 'Non sono sicuro'],
    sectorOptions: ['Laboratori analisi acqua', 'Controllo qualita acqua', 'Analisi acqua municipale', 'Food & beverage', 'Acqua di processo industriale', 'Rischio acqua in strutture', 'Agricoltura', 'Farmaceutica e cosmetica', 'Hospitality, turismo e leisure'],
    countries: COMMON_COUNTRIES.it,
    faqEyebrow: 'Domande frequenti',
    faqTitle: 'Domande frequenti su OEM e private label',
    faqs: [
      { question: 'Qual e la differenza tra distribuzione, co-branding e OEM?', answer: 'La distribuzione mantiene il brand AquaVerify, il co-branding combina AquaVerify con il brand partner e l OEM permette di valutare integrazione sotto marchio proprio con packaging e documentazione adattati.' },
      { question: 'Il programma puo includere software e reporting?', answer: 'Si. Secondo perimetro concordato, il programma puo includere AquaVerify Cloud, App, tracciabilita campione, supporto lettura, report tecnici e report di analisi strutturati.' },
      { question: 'Il packaging puo essere adattato al mio brand?', answer: 'Si. Packaging, documentazione e lingue sono valutati secondo volume, territorio, requisiti locali e modello brand.' },
      { question: 'Quali settori si possono lavorare con un programma OEM?', answer: 'Il programma puo focalizzarsi su laboratori, utility, food & beverage, industria, facility, agricoltura, farmaceutica, cosmetica, hospitality, turismo e leisure.' },
      { question: 'AquaVerify copre automaticamente la conformita regolatoria in ogni paese?', answer: 'Non si deve assumere conformita automatica. Requisiti regolatori, claim, validazione, etichettatura e import devono essere verificati per territorio, matrice e uso previsto.' },
      { question: 'Come inizia il processo?', answer: 'Il primo passo e condividere paese, portfolio, clienti target, capacita tecnica, modello desiderato e volume stimato. Queste informazioni definiscono il percorso di valutazione.' }
    ],
    cta: { title: 'Trasformate il vostro canale in una soluzione ricorrente di microbiologia dell acqua', body: 'AquaVerify aiuta a passare da prodotti singoli a una proposta completa: kit, consumabili, tracciabilita, reporting, supporto tecnico e portfolio settoriale.', primary: 'Richiedi programma OEM', secondary: 'Vedi modelli commerciali' }
  }),
  ca: withSections({
    path: '/ca/oem-kits-analisi-aigua',
    title: 'Kits OEM d analisi d aigua per a partners que volen escalar amb ciencia, marca i software',
    description: 'AquaVerify ajuda distribuidors, fabricants, laboratoris i integradors a portar al mercat solucions de microbiologia de l aigua sota marca AquaVerify, co-branding o marca propia.',
    eyebrow: 'Programa OEM i marca blanca',
    primaryCta: 'Sollicitar programa OEM',
    secondaryCta: 'Veure models comercials',
    seoTitle: 'Kits OEM d analisi d aigua | Marca blanca, co-branding i distribucio | AquaVerify',
    seoDescription: 'Programa OEM AquaVerify per a kits microbiologics d analisi d aigua, marca blanca, co-branding, distribucio, consumibles, tracabilitat digital i suport tecnic.',
    heroPanelTitle: 'De producte a programa de partner',
    heroNodes: [card('Kits', 'Microbiologia de l aigua'), card('Marca', 'AquaVerify, co-branding o OEM'), card('Software', 'Tracabilitat, informes i CoA'), card('Suport', 'Onboarding i escalat')],
    heroMetrics: [card('3 rutes', 'Distribucio, co-branding i OEM'), card('9 sectors', 'Aplicacions B2B prioritaries'), card('140+', 'Mercats potencials atesos')],
    trustCards: [card('Producte + plataforma', 'Kits microbiologics, consumibles i fluxos digitals connectats.'), card('Suport comercial', 'Material de llançament, argumentaris tecnics i acompanyament.'), card('Transferencia tecnica', 'Documentacio, formacio i protocols segons abast acordat.'), card('Model escalable', 'Repeticio per consumibles, reporting, suport i cartera sectorial.')],
    modelsEyebrow: 'Models comercials',
    modelsTitle: 'Tres formes de portar AquaVerify al vostre mercat',
    modelsBody: 'El programa es pot adaptar al nivell de marca, autonomia comercial, suport tecnic i requisits locals de cada partner.',
    models: [
      model('Distribucio AquaVerify', 'Veneu productes AquaVerify amb suport local, inventari, formacio i acces a una cartera especialitzada per a microbiologia de l aigua.', ['Cataleg AquaVerify i materials comercials.', 'Suport tecnic per prevenda, implementacio i escalat.', 'Ruta ideal per distribuidors cientifics, laboratoris i empreses de tractament.'], 'Vull distribuir AquaVerify'),
      model('Co-branding tecnic', 'Combineu la credibilitat AquaVerify amb la vostra presencia local, vertical o institucional.', ['Marca compartida en propostes, documentacio i programes de formacio.', 'Fluxos comercials adaptats a territori, sector i compte clau.', 'Model util per partners amb cartera propia i clients recurrents.'], 'Explorar co-branding'),
      model('Marca blanca / OEM', 'Integreu kits, consumibles i fluxos AquaVerify sota la vostra marca.', ['Opcions de packaging i documentacio adaptada.', 'Transferencia tecnica i formacio a equips comercials o de laboratori.', 'Model per fabricants, integradors, distribuidors regionals i grups multi-pais.'], 'Sollicitar marca blanca')
    ],
    architectureEyebrow: 'Sistema OEM',
    architectureTitle: 'Mes que una caixa: una arquitectura completa per vendre, operar i fidelitzar clients',
    architectureBody: 'El valor del programa es unir producte, tracabilitat, documentacio, formacio i dades.',
    coreTitle: 'De producte a programa de partner',
    coreBody: 'AquaVerify connecta kits, marca, documentacio, fluxos Cloud i suport de llançament en una oferta preparada per a partners.',
    architectureCards: [card('Kits microbiologics', 'ENUMERA, PLAQUE, INDICA i consumibles associats segons disponibilitat i abast.'), card('Packaging i marca', 'Marca AquaVerify, co-branding o marca blanca amb adaptacio visual i documental.'), card('Documentacio tecnica', 'Fitxes, protocols, material de formacio i suport per a implementacio.'), card('AquaVerify Cloud/App/CoA', 'Fluxos de mostra, tracabilitat, lectura, informes i comunicacio amb clients.'), card('Suport de llançament', 'Onboarding, argumentaris, sectoritzacio i escalat comercial.'), card('Escalat recurrent', 'Consumibles, cartera ampliada, suport i dades per a relacio continuada.')],
    productsEyebrow: 'Cartera possible',
    productsTitle: 'Productes i moduls que poden formar part del programa',
    productsBody: 'L abast exacte es defineix per territori, aplicacio, matriu, volum, idioma, model de marca i requisits locals.',
    products: COMMON_PRODUCTS.ca,
    launchEyebrow: 'Implementacio',
    launchTitle: 'Ruta de llançament OEM de l avaluacio a l escalat',
    launchBody: 'Una ruta practica per qualificar l oportunitat, definir abast, preparar actius de llançament i escalar amb operacions repetibles.',
    launchSteps: [card('Encaix', 'Territori, canal, tipus de client, competencia tecnica i objectiu comercial.'), card('Abast', 'Seleccio de productes, model de marca, documentacio, idiomes i suport.'), card('Adaptacio', 'Packaging, materials, fluxos digitals, formularis, formacio i proces de comanda.'), card('Transferencia', 'Capacitacio comercial i tecnica, SOPs, criteris d escalat i gestio d incidencies.'), card('Llançament', 'Primeres comptes, campanyes sectorials, propostes, seguiment i reposicio.'), card('Escalat', 'Nous sectors, consumibles recurrents, reporting i ampliacio de cartera.')],
    selectorEyebrow: 'Trieu la ruta',
    selectorTitle: 'Quin tipus de partner voleu ser?',
    selectorBody: 'Seleccioneu un perfil per veure quin programa sol encaixar millor. AquaVerify revisara territori, volum, mercat i capacitats abans de confirmar cap abast.',
    selectorCta: 'Sollicitar programa OEM',
    partnersCta: 'Partners',
    routes: {
      distributor: card('Distribuidor especialitzat', 'Per empreses que ja venen a laboratoris, utilities, tractament, industria alimentaria, agricultura o facility management.'),
      manufacturer: card('Fabricant o marca tecnica', 'Per companyies que volen ampliar cataleg amb kits microbiologics i identitat comercial propia.'),
      lab: card('Laboratori amb cartera B2B', 'Per laboratoris que volen oferir analisis, kits, formacio o programes de control a clients recurrents.'),
      integrator: card('Integrador, enginyeria o consultora', 'Per equips que implementen solucions d aigua, qualitat, compliment o transformacio digital.')
    },
    routeNotes: {
      distributor: 'Model recomanat: distribucio AquaVerify o co-branding amb suport local i cartera per sectors.',
      manufacturer: 'Model recomanat: OEM/marca blanca amb packaging, documentacio, formacio i suport de qualitat definits per abast.',
      lab: 'Model recomanat: co-branding tecnic, plataforma de tracabilitat i materials sectorials per accelerar adopcio.',
      integrator: 'Model recomanat: programa de partner amb kits, plataforma, reporting i suport de desplegament.'
    },
    routeLabels: { distributor: 'Distribuidor', manufacturer: 'Fabricant / marca', lab: 'Laboratori', integrator: 'Integrador / consultora' },
    sectorsEyebrow: 'Aplicacions sectorials',
    sectorsTitle: 'Un mateix programa OEM, multiples mercats B2B',
    sectorsBody: 'AquaVerify permet al partner enfocar la proposta per sector, amb missatges, casos d us i rutes de venda adaptades.',
    sectorCta: 'Veure sector',
    sectors: [card('Laboratoris d analisi d aigua', 'TAT, CoA, tracabilitat i cartera microbiologica avancada.'), card('Control de qualitat de l aigua', 'Plans de control, evidencies auditables i reporting tecnic.'), card('Analisi d aigua municipal', 'Xarxes, captacions, tractament, colifags i salut publica.'), card('Alimentacio i begudes', 'Aigua ingredient, CIP, esbandida, lots i auditories.'), card('Aigua de proces industrial', 'Captacio, proces, recirculacio, reutilitzacio i abocament.'), card('Risc d aigua en installacions', 'Xarxes interiors, ACS, punts terminals i actius multi-seu.'), card('Agricultura', 'Reg, aigua regenerada, fertirrigacio, packhouse i exportacio.'), card('Farmaceutica i cosmetica', 'Aigua critica, QC microbiologia, desviacions, CAPA i auditories.'), card('Hostaleria, turisme i oci', 'Hotels, spas, piscines, reobertures, proveidors i inspeccions.')],
    comparisonEyebrow: 'Comparativa',
    comparisonTitle: 'Trieu el nivell de marca i suport que necessiteu',
    comparisonCards: [card('Marca AquaVerify', 'Per vendre rapid amb una marca tecnica reconeixible. Cataleg, suport local, formacio i materials AquaVerify.'), card('Co-branding', 'Per unir autoritat tecnica i presencia local. Material compartit, focus sectorial i suport adaptat.'), card('Marca blanca / OEM', 'Per integrar la solucio sota identitat propia. Packaging, documentacio, fluxos i formacio segons projecte.')],
    requirementsEyebrow: 'Encaix de partner',
    requirementsTitle: 'Que aporta AquaVerify i que aporta el partner',
    aquaverifyProvidesTitle: 'AquaVerify aporta',
    partnerProvidesTitle: 'El partner aporta',
    aquaverifyProvides: ['Kits, consumibles i moduls digitals segons abast acordat.', 'Documentacio tecnica, materials de formacio i suport d implementacio.', 'Experiencia sectorial per a laboratoris, utilities, industria, agricultura i facilities.', 'Suport per propostes, escalat tecnic i comunicacio de valor.'],
    partnerProvides: ['Acces al mercat, cartera de clients o capacitat comercial regional.', 'Responsabilitat sobre requisits locals, claims, idioma i canal.', 'Capacitat d emmagatzematge, logistica, suport o formacio segons model.', 'Compromis de qualitat, seguiment comercial i comunicacio tecnica.'],
    technicalEyebrow: 'Marc tecnic',
    technicalTitle: 'Compatibilitat tecnica i documentacio prudent',
    technicalBody: 'Els abasts es defineixen cas per cas. La documentacio pot alinear-se amb referencies reconegudes per microbiologia de l aigua i colifags somatics.',
    references: [card('ISO 10705-2', 'Deteccio i enumeracio de bacteriofags, part 2: colifags somatics.'), card('EPA Method 1602', 'Procediment SAL per a colifags somatics i F+ en aigua.'), card('Programes de partner', 'Marca, packaging, suport i documentacio s adapten a territori, normativa i abast comercial.')],
    formsEyebrow: 'Solicitud',
    formsTitle: 'Inicieu una conversa OEM o de marca blanca',
    formsBody: 'Envieu país, tipus d’empresa, cartera, sectors objectiu i volum estimat. AquaVerify revisarà la ruta OEM més adequada.',
    forms: { oem: { title: 'Sollicitar programa OEM / marca blanca', body: 'Per fabricants, marques, laboratoris o distribuidors que volen integrar AquaVerify sota marca propia o co-branding.', submit: 'Enviar solicitud OEM' } },
    formLabels: { name: 'Nom i empresa', email: 'Email professional', country: 'Pais o territori', companyType: 'Tipus d empresa', model: 'Model d interes', volume: 'Volum estimat o cartera actual', sector: 'Sector principal', message: 'Missatge' },
    modelOptions: ['Distribucio AquaVerify', 'Co-branding', 'Marca blanca / OEM', 'OEM + plataforma digital', 'No ho tinc clar'],
    sectorOptions: ['Laboratoris d analisi d aigua', 'Control de qualitat de l aigua', 'Analisi d aigua municipal', 'Alimentacio i begudes', 'Aigua de proces industrial', 'Risc d aigua en installacions', 'Agricultura', 'Farmaceutica i cosmetica', 'Hostaleria, turisme i oci'],
    countries: COMMON_COUNTRIES.ca,
    faqEyebrow: 'Preguntes frequents',
    faqTitle: 'Dubtes comuns sobre OEM i marca blanca',
    faqs: [
      { question: 'Quina diferencia hi ha entre distribucio, co-branding i OEM?', answer: 'La distribucio mante la marca AquaVerify, el co-branding combina AquaVerify amb la marca del partner i l OEM permet avaluar una integracio sota marca propia amb packaging i documentacio adaptats.' },
      { question: 'El programa pot incloure software i reporting?', answer: 'Si. Segons l abast acordat, el programa pot incloure AquaVerify Cloud, App, tracabilitat de mostra, suport de lectura, informes tecnics i informes d analisi estructurats.' },
      { question: 'Es pot adaptar el packaging a la meva marca?', answer: 'Si. L adaptacio de packaging, documentacio i idiomes s avalua segons volum, territori, requisits locals i model de marca.' },
      { question: 'Quins sectors es poden treballar amb un programa OEM?', answer: 'El programa pot enfocar-se a laboratoris, utilities, alimentacio i begudes, industria, installacions, agricultura, farmaceutica, cosmetica, hostaleria, turisme i oci.' },
      { question: 'AquaVerify cobreix automaticament el compliment regulador a cada pais?', answer: 'No s ha d assumir compliment automatic. Requisits normatius, claims, validacions, etiquetatge i importacio s han de revisar per territori, matriu i us previst.' },
      { question: 'Com comenca el proces?', answer: 'El primer pas es compartir pais, cartera, clients objectiu, capacitat tecnica, model desitjat i volum estimat. Amb aquesta informacio es defineix una ruta d avaluacio.' }
    ],
    cta: { title: 'Convertiu el vostre canal en una solucio recurrent de microbiologia de l aigua', body: 'AquaVerify ajuda a passar de vendre productes solts a oferir una proposta completa: kits, consumibles, tracabilitat, reporting, suport tecnic i cartera sectorial.', primary: 'Sollicitar programa OEM', secondary: 'Veure models comercials' }
  })
};

Object.entries(OEM_KITS_PAGE).forEach(([lang, content]) => {
  Object.assign(content, applyLocalizedTypography(lang, content));
  content.sectors = content.sectors.map((item, index) => ({
    ...item,
    routeId: SECTOR_ROUTE_IDS[index]
  }));
});
