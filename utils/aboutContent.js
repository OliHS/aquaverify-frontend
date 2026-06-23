export const ABOUT_REVIEW_DATE = '2026-06-22';

export const ABOUT_KEY_CONCEPT_IDS = [
  'indicator-microorganism',
  'somatic-coliphages',
  'escherichia-coli-e-coli',
  'indica',
  'enumera',
  'lims',
  'digital-chain-of-custody',
  'analytical-traceability',
  'coa-certificate-of-analysis',
  'audit-trail',
  'oem'
];

const SOCIAL_IMAGE = '/images/social/about-aquaverify-1200x630.png';

function faq(question, answer) {
  return { question, answer };
}

function section(title, body, bullets = []) {
  return { title, body, bullets };
}

function link(routeId, label, body) {
  return { routeId, label, body };
}

function withShared(content) {
  return {
    ...content,
    ogImage: SOCIAL_IMAGE,
    heroImage: SOCIAL_IMAGE,
    heroImageAlt: content.socialImageAlt,
    heroImageFit: 'contain',
    keyConceptIds: ABOUT_KEY_CONCEPT_IDS
  };
}

export const ABOUT_PAGE_TRANSLATIONS = {
  en: withShared({
    path: '/about',
    title: 'AquaVerify: water microbiology and digital traceability for B2B decisions',
    description: 'AquaVerify develops, manufactures and distributes water microbiology products for detection, presence/absence and enumeration workflows, and connects them with digital traceability, technical reporting, distributors and OEM programmes.',
    seoTitle: 'About AquaVerify | Water microbiology and traceability',
    seoDescription: 'Discover AquaVerify: water microbiology products, detection and enumeration workflows, AquaVerify Cloud, technical resources, distributors and OEM programmes.',
    eyebrow: 'Water microbiology and B2B technology company',
    primaryCta: 'Request technical recommendation',
    secondaryCta: 'Explore the AquaVerify ecosystem',
    socialImageAlt: 'AquaVerify water microbiology and digital traceability',
    directAnswer: {
      title: 'What is AquaVerify?',
      body: 'AquaVerify is a B2B water microbiology and operational software company. It brings together product families for detection and enumeration, ISO/EPA reference-oriented kits, laboratory consumables and AquaVerify Cloud to connect sample, batch, method, operator, result, review, certificate of analysis and customer delivery. Final fit depends on the target organism, matrix, method, validation, country and laboratory scope.'
    },
    pillars: [
      { title: 'Water microbiology products', body: 'Solutions for presence/absence, enumeration and reference-oriented workflows, according to the product and intended use.' },
      { title: 'Digital traceability', body: 'AquaVerify Cloud can connect sample, batch, method, operator, reading, review, CoA, incidents and history.' },
      { title: 'B2B commercial routes', body: 'Access through direct conversation, authorized distributors, OEM programmes, private label and platform-connected solutions.' }
    ],
    ecosystemTable: {
      title: 'What the AquaVerify ecosystem connects',
      columns: ['Need', 'AquaVerify layer', 'Evidence that can be organized', 'Consideration'],
      rows: [
        ['Presence/absence detection', 'INDICA', 'Sample, batch, result and action', 'Depends on product, matrix, method and procedure'],
        ['Microbiological enumeration', 'ENUMERA', 'Reading, result, review and CoA', 'Should be evaluated by organism, intended use and validation'],
        ['Reference-oriented workflow', 'ISO/EPA kits and Lab Essentials', 'Method, controls, materials and record', 'Does not imply regulatory acceptance by itself'],
        ['Digital traceability', 'AquaVerify Cloud', 'Chain of custody, audit trail, CoA, history and portal', 'Must be configured within the quality system'],
        ['Distribution and scale-up', 'Distributors and OEM', 'Territory, support, documentation and supply', 'Requires local commercial and regulatory review']
      ]
    },
    sections: [
      section('Why AquaVerify exists', 'Water analysis does not end when a result appears. A useful decision also requires knowing where the sample came from, which method was used, which batch and operator were involved, who reviewed the evidence and how the result was communicated. AquaVerify exists to connect these elements in a clearer, traceable workflow.', [
        'An analytical route suited to organism, matrix and objective.',
        'Products and consumables designed to reduce operational friction.',
        'Connected evidence from sample to report.',
        'Information that laboratory, quality, operations and customers can understand.',
        'The ability to start with one product and expand into a digital workflow.'
      ]),
      section('One ecosystem for products, data and support', 'AquaVerify is not limited to a single kit or application. The offer combines product families, consumables, software, technical knowledge and commercial routes that can be adopted separately or as a connected workflow.', [
        'ENUMERA: quantitative workflows when the decision requires enumeration.',
        'INDICA: presence/absence and operational screening according to product and procedure.',
        'ISO/EPA kits: reference-oriented workflows when required by the analytical plan.',
        'Lab Essentials: media, controls, reagents and consumables for microbiology operations.',
        'AquaVerify Cloud: samples, LIMS, records, CoA, customer portal, inventory and follow-up according to configuration.'
      ]),
      section('Who we support', 'AquaVerify is designed for organisations that need to combine water microbiology, operational control, documentation and B2B decisions.', [
        'Public, private, environmental and quality-control laboratories.',
        'Water operators, municipalities, utilities and environmental-health teams.',
        'Food and beverage, process water and regulated industries.',
        'Buildings, hospitals, hotels, pools, spas and multi-site operations.',
        'Agriculture, reclaimed water, irrigation, hydroponics and postharvest operations.',
        'Pharmaceutical, cosmetics and QA/QC teams.',
        'Scientific distributors, integrators, manufacturers and OEM partners.'
      ]),
      section('How we turn a need into a traceable workflow', 'The starting point is not selling the same product to every organisation. It is understanding which decision must be made and which evidence must be retained.', [
        'Context: organism, water type, matrix, volume, frequency and intended use.',
        'Technical route: product, method, controls, laboratory and procedure.',
        'Execution: sample, point, batch, operator, reading and observations.',
        'Review: criterion, result, deviation, decision and report.',
        'Scale: portal, history, inventory, multiple sites, distributor or OEM.'
      ]),
      section('Principles that guide our work', 'Technical trust is not built with general promises. It depends on clear boundaries, useful documentation and decisions that can be reviewed.', [
        'Technical clarity before ambiguous claims.',
        'Traceability from water point to report.',
        'Clear distinction between detection, enumeration, screening and regulatory use.',
        'Primary sources and method context where relevant.',
        'Modular adoption alongside existing laboratories, LIMS and procedures.',
        'Review by country, matrix, intended use and competent authority.'
      ]),
      section('Accessible technical knowledge and evidence', 'AquaVerify publishes content to help teams interpret methods, indicators, regulation, sampling, traceability and product selection. The aim is to support a better-informed technical conversation, not to replace validation or professional judgement.', [
        'Resources and whitepapers for technical and commercial decisions.',
        'Multilingual glossary covering microbiology, LIMS, quality and regulation.',
        'Checklists for laboratories, sampling, industries, LIMS and OEM.',
        'External research summaries linked to their original sources.',
        'AquaVerify validation reports clearly separated from external papers.',
        'Visible editorial methodology and limitations.'
      ]),
      section('Ways to work with AquaVerify', 'The right route depends on organisation type, territory, product, volume, support level and digital requirements.', [
        'Direct technical recommendation for product or workflow selection.',
        'Purchase and support through authorised distributors where available.',
        'Distribution, co-branding, private-label and OEM programmes.',
        'AquaVerify Cloud as an independent or product-connected layer.',
        'Collaboration with internal, external or hybrid laboratory models.',
        'Technical resources for evaluation, purchase, implementation and audit preparation.'
      ]),
      section('Boundaries and responsibilities', 'AquaVerify provides products, traceability, documentation and operational support. Final decisions must remain within the applicable quality system and technical framework of each organisation.', [
        'It does not replace an accredited laboratory when one is required.',
        'It does not extend a laboratory’s accredited scope by itself.',
        'It does not replace method validation or verification.',
        'It does not imply universal regulatory acceptance.',
        'It does not replace the competent authority or technical owner.',
        'It does not turn commercial guidance into legal or health advice.'
      ])
    ],
    keyConceptRelations: {
      'indicator-microorganism': 'Connects AquaVerify product selection with the technical reason for monitoring a microorganism.',
      'somatic-coliphages': 'Relevant to water programmes where viral indicators are part of the decision framework.',
      'escherichia-coli-e-coli': 'A frequent bacterial indicator considered in water quality workflows.',
      'indica': 'Describes qualitative decisions supported by INDICA workflows.',
      enumera: 'Describes quantitative decisions supported by ENUMERA workflows.',
      lims: 'Connects laboratory operations with AquaVerify Cloud and traceable records.',
      'digital-chain-of-custody': 'Explains the digital link between sample, operator, method and evidence.',
      'analytical-traceability': 'Frames the sample-to-report evidence AquaVerify aims to organize.',
      'coa-certificate-of-analysis': 'Connects technical review and customer delivery.',
      'audit-trail': 'Supports reviewable records in digital workflows.',
      oem: 'Explains partner routes such as co-branding and private-label programmes.'
    },
    schemaKnowsAbout: ['Water microbiology', 'Microbial indicators', 'Presence/absence testing', 'Microbiological enumeration', 'LIMS', 'Digital chain of custody', 'Certificate of analysis', 'OEM water testing kits'],
    ecosystemLinksTitle: 'Explore the ecosystem',
    ecosystemLinks: [
      link('products', 'Products', 'Compare AquaVerify product families for water microbiology.'),
      link('enumera', 'ENUMERA', 'Explore enumeration workflows when a quantitative result is needed.'),
      link('indica', 'INDICA', 'Explore presence/absence and screening workflows.'),
      link('standard-kits', 'ISO/EPA kits', 'Review reference-oriented kit workflows.'),
      link('lab-essentials', 'Lab Essentials', 'See consumables, media and controls.'),
      link('platform', 'AquaVerify Cloud', 'Connect sample, method, result, CoA and customer delivery.'),
      link('industries-hub', 'Industries', 'Map the ecosystem to laboratories, utilities and sectors.'),
      link('resources', 'Resources', 'Read technical guides and whitepapers.'),
      link('glossary', 'Technical glossary', 'Clarify microbiology, LIMS, quality and channel terms.')
    ],
    evidenceLinksTitle: 'Evidence and transparency',
    evidenceLinks: [
      link('editorial-methodology', 'Editorial methodology', 'How AquaVerify separates sources, limitations and technical context.'),
      link('aquacoli-enumera-coli100-validation', 'AquaColi / ENUMERA Coli100 validation', 'A validation resource linked to its technical scope.'),
      link('resources', 'Resource library', 'Guides, checklists and technical summaries.'),
      link('glossary', 'Technical glossary', 'Definitions and related pages for key terms.')
    ],
    commercialLinksTitle: 'Work with AquaVerify',
    commercialLinks: [
      link('contact', 'Technical recommendation', 'Share organism, matrix, method and reporting need.'),
      link('distributors', 'Distributors', 'Find the right channel where available.'),
      link('oem', 'OEM and private label', 'Evaluate distribution, co-branding or private-label routes.')
    ],
    faqs: [
      faq('What is AquaVerify?', 'AquaVerify is a B2B company that combines water microbiology products, digital traceability, technical resources, distribution and OEM programmes.'),
      faq('Does AquaVerify offer products, software or both?', 'Both. An organisation can start with a product family and add AquaVerify Cloud when it needs to connect samples, batches, methods, results, reports, inventory or customer portal workflows.'),
      faq('Which product families does AquaVerify offer?', 'The offer includes ENUMERA for quantitative workflows, INDICA for presence/absence, ISO/EPA kits oriented to technical references and Lab Essentials for media, controls, reagents and consumables. Fit should be reviewed by product, organism, matrix and method.'),
      faq('Which organisations is AquaVerify designed for?', 'It is designed for laboratories, utilities, municipalities, quality teams, industries, facilities, agriculture, pharma, cosmetics, distributors and partners that need to control water with traceable evidence.'),
      faq('Does AquaVerify replace an accredited laboratory?', 'No. It can provide products, digital workflows, traceability, CoA and coordination, but official testing must remain within the applicable method, validation, procedure and scope.'),
      faq('Does using an AquaVerify product ensure regulatory compliance?', 'It should not be assumed by default. Acceptance depends on product, method, matrix, country, intended use, laboratory, validation, competent authority and quality system.'),
      faq('Does AquaVerify work with distributors and OEM programmes?', 'Yes. AquaVerify can evaluate authorized distribution, co-branding, private label and OEM according to territory, products, volume, documentation, support and local requirements.'),
      faq('What is the best starting point?', 'Start with a technical recommendation that defines organism, matrix, objective, volume, method, traceability level and purchase channel.')
    ],
    cta: {
      title: 'Turn a water-control need into a clear technical workflow',
      body: 'Share the target organism, water type, matrix, volume, current method and reporting need. AquaVerify can help identify the right combination of product, platform, resource or partner.',
      button: 'Request technical recommendation',
      routeId: 'contact'
    }
  }),
  es: withShared({
    path: '/es/sobre-nosotros',
    title: 'AquaVerify: microbiología del agua y trazabilidad digital para decisiones B2B',
    description: 'AquaVerify desarrolla, fabrica y distribuye productos de microbiología del agua para flujos de detección, presencia/ausencia y enumeración, y los conecta con trazabilidad digital, informes técnicos, distribuidores y programas OEM.',
    seoTitle: 'Sobre AquaVerify | Microbiología del agua y trazabilidad',
    seoDescription: 'Conoce AquaVerify: productos de microbiología del agua, detección y enumeración, AquaVerify Cloud, recursos técnicos, distribuidores y programas OEM.',
    eyebrow: 'Empresa de microbiología del agua y tecnología B2B',
    primaryCta: 'Solicitar recomendación técnica',
    secondaryCta: 'Explorar el ecosistema AquaVerify',
    socialImageAlt: 'AquaVerify microbiología del agua y trazabilidad digital',
    directAnswer: {
      title: '¿Qué es AquaVerify?',
      body: 'AquaVerify es una empresa B2B de microbiología del agua y software operativo. Integra familias de producto para detección y enumeración, kits orientados a referencias ISO/EPA, consumibles de laboratorio y AquaVerify Cloud para conectar muestra, lote, método, operador, resultado, revisión, certificado de análisis y entrega al cliente. El encaje final depende del microorganismo, la matriz, el método, la validación, el país y el alcance del laboratorio.'
    },
    pillars: [
      { title: 'Productos de microbiología del agua', body: 'Soluciones para presencia/ausencia, enumeración y flujos orientados a referencias técnicas, según el producto y el uso previsto.' },
      { title: 'Trazabilidad digital', body: 'AquaVerify Cloud puede conectar muestra, lote, método, operador, lectura, revisión, CoA, incidencias e histórico.' },
      { title: 'Rutas comerciales B2B', body: 'Acceso mediante conversación directa, distribuidores autorizados, programas OEM, marca blanca y soluciones conectadas con plataforma.' }
    ],
    ecosystemTable: {
      title: 'Qué conecta el ecosistema AquaVerify',
      columns: ['Necesidad', 'Capa AquaVerify', 'Evidencia que puede organizarse', 'Consideración'],
      rows: [
        ['Detección presencia/ausencia', 'INDICA', 'Muestra, lote, resultado y acción', 'Depende del producto, matriz, método y procedimiento'],
        ['Enumeración microbiológica', 'ENUMERA', 'Lectura, resultado, revisión y CoA', 'Debe evaluarse según organismo, uso y validación'],
        ['Flujo orientado a referencia', 'Kits ISO/EPA y Lab Essentials', 'Método, controles, materiales y registro', 'No implica aceptación regulatoria por sí mismo'],
        ['Trazabilidad digital', 'AquaVerify Cloud', 'Cadena de custodia, audit trail, CoA, histórico y portal', 'Debe configurarse dentro del sistema de calidad'],
        ['Distribución y escalado', 'Distribuidores y OEM', 'Territorio, soporte, documentación y suministro', 'Requiere revisión comercial y regulatoria local']
      ]
    },
    sections: [
      section('Por qué existe AquaVerify', 'El análisis del agua no termina cuando aparece un resultado. Para tomar una decisión útil también hay que saber de qué muestra procede, qué método se utilizó, qué lote y operador participaron, quién revisó la evidencia y cómo se comunicó el resultado. AquaVerify existe para conectar esas piezas en un flujo más claro y trazable.', [
        'Una ruta analítica adecuada al organismo, matriz y objetivo.',
        'Productos y consumibles preparados para reducir fricción operativa.',
        'Evidencia conectada desde la muestra hasta el informe.',
        'Información comprensible para laboratorio, calidad, operaciones y cliente.',
        'Capacidad de empezar por un producto y ampliar hacia un flujo digital.'
      ]),
      section('Un ecosistema de producto, datos y soporte', 'AquaVerify no se limita a un único kit ni a una única aplicación. La propuesta combina familias de producto, consumibles, software, recursos técnicos y rutas comerciales que pueden activarse por separado o como un flujo conectado.', [
        'ENUMERA: flujos cuantitativos cuando la decisión requiere enumeración.',
        'INDICA: presencia/ausencia y cribado operativo según producto y procedimiento.',
        'Kits ISO/EPA: flujos orientados a referencias metodológicas cuando el plan analítico lo requiere.',
        'Lab Essentials: medios, controles, reactivos y consumibles para la operación microbiológica.',
        'AquaVerify Cloud: muestras, LIMS, registros, CoA, portal cliente, inventario y seguimiento según configuración.'
      ]),
      section('A quién ayudamos', 'La arquitectura de AquaVerify está pensada para organizaciones que necesitan combinar microbiología del agua, control operativo, documentación y decisiones B2B.', [
        'Laboratorios públicos, privados, ambientales y de control de calidad.',
        'Operadores de agua, municipios, utilities y equipos de salud ambiental.',
        'Alimentación y bebidas, agua de proceso e industria regulada.',
        'Edificios, hospitales, hoteles, piscinas, spas y operaciones multisede.',
        'Agricultura, agua regenerada, riego, hidroponía y postcosecha.',
        'Industria farmacéutica, cosmética y equipos QA/QC.',
        'Distribuidores científicos, integradores, fabricantes y partners OEM.'
      ]),
      section('Cómo convertimos una necesidad en un flujo trazable', 'El punto de partida no es vender el mismo producto a todas las organizaciones. Primero hay que entender qué decisión debe tomarse y qué evidencia necesita conservarse.', [
        'Contexto: organismo, tipo de agua, matriz, volumen, frecuencia y uso previsto.',
        'Ruta técnica: producto, método, controles, laboratorio y procedimiento.',
        'Ejecución: muestra, punto, lote, operador, lectura y observaciones.',
        'Revisión: criterio, resultado, desviación, decisión e informe.',
        'Escalado: portal, histórico, inventario, múltiples sedes, distribuidor u OEM.'
      ]),
      section('Principios que guían nuestro trabajo', 'La confianza técnica no se construye con promesas generales, sino con límites claros, documentación útil y decisiones que puedan revisarse.', [
        'Claridad técnica antes que claims ambiguos.',
        'Trazabilidad desde el punto de agua hasta el informe.',
        'Distinción entre detección, enumeración, cribado y uso regulatorio.',
        'Uso de fuentes primarias y contexto de método cuando corresponde.',
        'Adopción modular para convivir con laboratorios, LIMS y procedimientos existentes.',
        'Revisión por país, matriz, uso previsto y autoridad competente.'
      ]),
      section('Conocimiento técnico y evidencia accesible', 'AquaVerify publica contenido para ayudar a interpretar métodos, indicadores, normativa, muestreo, trazabilidad y selección de producto. El objetivo es facilitar una conversación técnica mejor informada, no sustituir la validación ni el criterio profesional.', [
        'Recursos y whitepapers para decisiones técnicas y comerciales.',
        'Glosario multilingüe de microbiología, LIMS, calidad y normativa.',
        'Checklists para laboratorio, muestreo, sectores, LIMS y OEM.',
        'Resúmenes de investigaciones externas con enlace a la fuente original.',
        'Informes de validación propios diferenciados de artículos externos.',
        'Metodología editorial y limitaciones visibles.'
      ]),
      section('Formas de trabajar con AquaVerify', 'La ruta adecuada depende del tipo de organización, el territorio, el producto, el volumen, el nivel de soporte y la necesidad de digitalización.', [
        'Recomendación técnica directa para seleccionar producto o flujo.',
        'Compra y soporte mediante distribuidores autorizados donde estén disponibles.',
        'Programas de distribución, co-branding, marca blanca u OEM.',
        'AquaVerify Cloud como capa independiente o conectada con productos.',
        'Colaboración con laboratorios internos, externos o modelos mixtos.',
        'Recursos técnicos para preparar evaluación, compra, implantación y auditoría.'
      ]),
      section('Límites y responsabilidades', 'AquaVerify aporta productos, trazabilidad, documentación y soporte operativo. La decisión final debe mantenerse dentro del sistema de calidad y del marco técnico aplicable a cada organización.', [
        'No sustituye a un laboratorio acreditado cuando este sea obligatorio.',
        'No amplía automáticamente el alcance acreditado de un laboratorio.',
        'No reemplaza la validación o verificación del método.',
        'No implica aceptación regulatoria universal.',
        'No sustituye a la autoridad competente ni al responsable técnico.',
        'No convierte una guía comercial en asesoramiento legal o sanitario.'
      ])
    ],
    keyConceptRelations: {
      'indicator-microorganism': 'Conecta la selección de producto AquaVerify con la razón técnica para monitorizar un microorganismo.',
      'somatic-coliphages': 'Relevante en programas de agua donde los indicadores virales forman parte del marco de decisión.',
      'escherichia-coli-e-coli': 'Indicador bacteriano frecuente en flujos de calidad del agua.',
      'indica': 'Describe decisiones cualitativas apoyadas por flujos INDICA.',
      enumera: 'Describe decisiones cuantitativas apoyadas por flujos ENUMERA.',
      lims: 'Conecta operaciones de laboratorio con AquaVerify Cloud y registros trazables.',
      'digital-chain-of-custody': 'Explica el vínculo digital entre muestra, operador, método y evidencia.',
      'analytical-traceability': 'Enmarca la evidencia de muestra a informe que AquaVerify busca organizar.',
      'coa-certificate-of-analysis': 'Conecta revisión técnica y entrega al cliente.',
      'audit-trail': 'Apoya registros revisables en flujos digitales.',
      oem: 'Explica rutas partner como co-branding y marca blanca.'
    },
    schemaKnowsAbout: ['Microbiología del agua', 'Indicadores microbiológicos', 'Presencia/ausencia', 'Enumeración microbiológica', 'LIMS', 'Cadena de custodia digital', 'Certificado de análisis', 'Kits de análisis de agua OEM'],
    ecosystemLinksTitle: 'Explora el ecosistema',
    ecosystemLinks: [
      link('products', 'Productos', 'Compara familias AquaVerify para microbiología del agua.'),
      link('enumera', 'ENUMERA', 'Explora flujos de enumeración cuando se necesita resultado cuantitativo.'),
      link('indica', 'INDICA', 'Explora presencia/ausencia y cribado operativo.'),
      link('standard-kits', 'Kits ISO/EPA', 'Revisa flujos de kits orientados a referencias técnicas.'),
      link('lab-essentials', 'Lab Essentials', 'Consulta consumibles, medios y controles.'),
      link('platform', 'AquaVerify Cloud', 'Conecta muestra, método, resultado, CoA y entrega al cliente.'),
      link('industries-hub', 'Industrias', 'Mapea el ecosistema a laboratorios, utilities y sectores.'),
      link('resources', 'Recursos', 'Lee guías técnicas y whitepapers.'),
      link('glossary', 'Glosario técnico', 'Aclara términos de microbiología, LIMS, calidad y canal.')
    ],
    evidenceLinksTitle: 'Evidencia y transparencia',
    evidenceLinks: [
      link('editorial-methodology', 'Metodología editorial', 'Cómo AquaVerify separa fuentes, límites y contexto técnico.'),
      link('aquacoli-enumera-coli100-validation', 'Validación AquaColi / ENUMERA Coli100', 'Un recurso de validación vinculado a su alcance técnico.'),
      link('resources', 'Biblioteca de recursos', 'Guías, checklists y resúmenes técnicos.'),
      link('glossary', 'Glosario técnico', 'Definiciones y páginas relacionadas para conceptos clave.')
    ],
    commercialLinksTitle: 'Trabaja con AquaVerify',
    commercialLinks: [
      link('contact', 'Recomendación técnica', 'Comparte organismo, matriz, método y necesidad de reporting.'),
      link('distributors', 'Distribuidores', 'Encuentra el canal adecuado donde esté disponible.'),
      link('oem', 'OEM y marca blanca', 'Evalúa distribución, co-branding o marca blanca.')
    ],
    faqs: [
      faq('¿Qué es AquaVerify?', 'AquaVerify es una empresa B2B que combina productos de microbiología del agua, trazabilidad digital, recursos técnicos, distribución y programas OEM.'),
      faq('¿AquaVerify ofrece productos, software o ambos?', 'Ambos. La organización puede comenzar con una familia de producto y añadir AquaVerify Cloud cuando necesite conectar muestras, lotes, métodos, resultados, informes, inventario o portal cliente.'),
      faq('¿Qué familias de producto ofrece AquaVerify?', 'La oferta incluye ENUMERA para flujos cuantitativos, INDICA para presencia/ausencia, Kits ISO/EPA orientados a referencias técnicas y Lab Essentials para medios, controles, reactivos y consumibles. El encaje debe revisarse según producto, organismo, matriz y método.'),
      faq('¿Para qué organizaciones está pensado?', 'Para laboratorios, utilities, municipios, equipos de calidad, industrias, instalaciones, agricultura, pharma, cosmética, distribuidores y partners que necesitan controlar agua con evidencia trazable.'),
      faq('¿AquaVerify sustituye a un laboratorio acreditado?', 'No. Puede aportar productos, flujos digitales, trazabilidad, CoA y coordinación, pero los ensayos oficiales deben permanecer dentro del método, validación, procedimiento y alcance aplicables.'),
      faq('¿Qué implica usar un producto AquaVerify en contexto regulatorio?', 'No debe darse por hecho. La aceptación depende del producto, método, matriz, país, uso previsto, laboratorio, validación, autoridad competente y sistema de calidad.'),
      faq('¿AquaVerify trabaja con distribuidores y programas OEM?', 'Sí. Puede evaluar distribución autorizada, co-branding, marca blanca y OEM según territorio, productos, volumen, documentación, soporte y requisitos locales.'),
      faq('¿Cuál es el mejor punto de partida?', 'Empezar por una recomendación técnica que defina organismo, matriz, objetivo, volumen, método, nivel de trazabilidad y canal de compra.')
    ],
    cta: {
      title: 'Convierte una necesidad de control del agua en un flujo técnico claro',
      body: 'Comparte tu organismo objetivo, tipo de agua, matriz, volumen, método actual y necesidad de reporting. AquaVerify puede ayudarte a identificar la combinación adecuada de producto, plataforma, recurso o partner.',
      button: 'Solicitar recomendación técnica',
      routeId: 'contact'
    }
  }),
  fr: withShared({
    path: '/fr/a-propos',
    title: 'AquaVerify : microbiologie de l’eau et traçabilité numérique pour les décisions B2B',
    description: 'AquaVerify développe, fabrique et distribue des produits de microbiologie de l’eau destinés aux flux de détection, présence/absence et dénombrement, et les relie à la traçabilité numérique, aux rapports techniques, aux distributeurs et aux programmes OEM.',
    seoTitle: 'À propos d’AquaVerify | Microbiologie et traçabilité de l’eau',
    seoDescription: 'Découvrez AquaVerify : produits de microbiologie de l’eau, détection et dénombrement, AquaVerify Cloud, ressources techniques, distributeurs et programmes OEM.',
    eyebrow: 'Entreprise de microbiologie de l’eau et de technologie B2B',
    primaryCta: 'Demander une recommandation technique',
    secondaryCta: 'Explorer l’écosystème AquaVerify',
    socialImageAlt: 'AquaVerify microbiologie de l’eau et traçabilité numérique',
    directAnswer: {
      title: 'Qu’est-ce qu’AquaVerify ?',
      body: 'AquaVerify est une entreprise B2B de microbiologie de l’eau et de logiciels opérationnels. Elle réunit des familles de produits pour la détection et le dénombrement, des kits orientés vers les références ISO/EPA, des consommables de laboratoire et AquaVerify Cloud afin de relier échantillon, lot, méthode, opérateur, résultat, revue, certificat d’analyse et livraison au client. L’adéquation finale dépend de l’organisme cible, de la matrice, de la méthode, de la validation, du pays et du périmètre du laboratoire.'
    },
    pillars: [
      { title: 'Produits de microbiologie de l’eau', body: 'Solutions pour présence/absence, dénombrement et flux orientés références techniques, selon le produit et l’usage prévu.' },
      { title: 'Traçabilité numérique', body: 'AquaVerify Cloud peut relier échantillon, lot, méthode, opérateur, lecture, revue, CoA, incidents et historique.' },
      { title: 'Parcours commerciaux B2B', body: 'Accès via discussion directe, distributeurs autorisés, programmes OEM, marque blanche et solutions connectées à la plateforme.' }
    ],
    ecosystemTable: {
      title: 'Ce que relie l’écosystème AquaVerify',
      columns: ['Besoin', 'Couche AquaVerify', 'Preuve pouvant être organisée', 'Considération'],
      rows: [
        ['Détection présence/absence', 'INDICA', 'Échantillon, lot, résultat et action', 'Dépend du produit, de la matrice, de la méthode et de la procédure'],
        ['Dénombrement microbiologique', 'ENUMERA', 'Lecture, résultat, revue et CoA', 'À évaluer selon organisme, usage et validation'],
        ['Flux orienté référence', 'Kits ISO/EPA et Lab Essentials', 'Méthode, contrôles, matériaux et enregistrement', 'N’implique pas d’acceptation réglementaire par lui-même'],
        ['Traçabilité numérique', 'AquaVerify Cloud', 'Chaîne de traçabilité, audit trail, CoA, historique et portail', 'À configurer dans le système qualité'],
        ['Distribution et déploiement', 'Distributeurs et OEM', 'Territoire, support, documentation et fourniture', 'Nécessite une revue commerciale et réglementaire locale']
      ]
    },
    sections: [
      section('Pourquoi AquaVerify existe', 'L’analyse de l’eau ne se termine pas lorsqu’un résultat apparaît. Une décision utile exige également de connaître l’origine de l’échantillon, la méthode utilisée, le lot et l’opérateur concernés, la personne ayant revu les preuves et la manière dont le résultat a été communiqué. AquaVerify relie ces éléments dans un flux plus clair et traçable.', [
        'Une route analytique adaptée à l’organisme, à la matrice et à l’objectif.',
        'Des produits et consommables conçus pour réduire les frictions opérationnelles.',
        'Des preuves reliées de l’échantillon au rapport.',
        'Une information compréhensible pour laboratoire, qualité, opérations et client.',
        'La possibilité de commencer par un produit puis d’étendre le flux au numérique.'
      ]),
      section('Un écosystème de produits, données et support', 'AquaVerify ne se limite pas à un kit ou à une application. L’offre associe familles de produits, consommables, logiciel, connaissances techniques et parcours commerciaux pouvant être activés séparément ou dans un flux connecté.', [
        'ENUMERA : flux quantitatifs lorsque la décision nécessite un dénombrement.',
        'INDICA : présence/absence et dépistage opérationnel selon le produit et la procédure.',
        'Kits ISO/EPA : flux orientés vers des références méthodologiques lorsque le plan analytique l’exige.',
        'Lab Essentials : milieux, contrôles, réactifs et consommables.',
        'AquaVerify Cloud : échantillons, LIMS, enregistrements, CoA, portail client, inventaire et suivi selon configuration.'
      ]),
      section('À qui nous nous adressons', 'AquaVerify est conçu pour les organisations qui doivent combiner microbiologie de l’eau, contrôle opérationnel, documentation et décisions B2B.', [
        'Laboratoires publics, privés, environnementaux et de contrôle qualité.',
        'Opérateurs d’eau, collectivités, services publics et équipes de santé environnementale.',
        'Agroalimentaire, eau de process et industries réglementées.',
        'Bâtiments, hôpitaux, hôtels, piscines, spas et opérations multisites.',
        'Agriculture, eau réutilisée, irrigation, hydroponie et post-récolte.',
        'Industrie pharmaceutique, cosmétique et équipes QA/QC.',
        'Distributeurs scientifiques, intégrateurs, fabricants et partenaires OEM.'
      ]),
      section('Comment nous transformons un besoin en flux traçable', 'Le point de départ n’est pas de vendre le même produit à toutes les organisations. Il consiste à comprendre la décision à prendre et les preuves à conserver.', [
        'Contexte : organisme, type d’eau, matrice, volume, fréquence et usage.',
        'Route technique : produit, méthode, contrôles, laboratoire et procédure.',
        'Exécution : échantillon, point, lot, opérateur, lecture et observations.',
        'Revue : critère, résultat, déviation, décision et rapport.',
        'Déploiement : portail, historique, inventaire, multisites, distributeur ou OEM.'
      ]),
      section('Les principes qui guident notre travail', 'La confiance technique ne repose pas sur des promesses générales, mais sur des limites claires, une documentation utile et des décisions révisables.', [
        'Clarté technique avant les affirmations ambiguës.',
        'Traçabilité du point d’eau au rapport.',
        'Distinction entre détection, dénombrement, dépistage et usage réglementaire.',
        'Sources primaires et contexte méthodologique lorsque nécessaire.',
        'Adoption modulaire avec laboratoires, LIMS et procédures existants.',
        'Revue selon pays, matrice, usage prévu et autorité compétente.'
      ]),
      section('Connaissances techniques et preuves accessibles', 'AquaVerify publie des contenus pour faciliter l’interprétation des méthodes, indicateurs, réglementations, prélèvements, flux de traçabilité et choix de produits. Ces contenus ne remplacent ni la validation ni le jugement professionnel.', [
        'Ressources et livres blancs pour les décisions techniques et commerciales.',
        'Glossaire multilingue de microbiologie, LIMS, qualité et réglementation.',
        'Listes de contrôle pour laboratoire, prélèvement, secteurs, LIMS et OEM.',
        'Résumés de recherches externes reliés aux sources originales.',
        'Rapports de validation AquaVerify séparés des articles externes.',
        'Méthodologie éditoriale et limites visibles.'
      ]),
      section('Comment travailler avec AquaVerify', 'Le parcours approprié dépend de l’organisation, du territoire, du produit, du volume, du niveau de support et des besoins numériques.', [
        'Recommandation technique directe.',
        'Achat et support via distributeurs autorisés lorsqu’ils sont disponibles.',
        'Distribution, co-branding, marque blanche et programmes OEM.',
        'AquaVerify Cloud comme couche indépendante ou reliée aux produits.',
        'Collaboration avec laboratoires internes, externes ou hybrides.',
        'Ressources techniques pour évaluation, achat, mise en œuvre et audit.'
      ]),
      section('Limites et responsabilités', 'AquaVerify fournit produits, traçabilité, documentation et support opérationnel. La décision finale reste intégrée au système qualité et au cadre technique applicable à chaque organisation.', [
        'Ne remplace pas un laboratoire accrédité lorsqu’il est requis.',
        'N’étend pas automatiquement le périmètre accrédité.',
        'Ne remplace pas la validation ou la vérification de méthode.',
        'Ne garantit pas une acceptation réglementaire universelle.',
        'Ne remplace pas l’autorité compétente ni le responsable technique.',
        'Ne transforme pas une orientation commerciale en conseil juridique ou sanitaire.'
      ])
    ],
    keyConceptRelations: {
      'indicator-microorganism': 'Relie le choix produit AquaVerify à la raison technique de suivre un microorganisme.',
      'somatic-coliphages': 'Pertinent lorsque des indicateurs viraux font partie du cadre de décision.',
      'escherichia-coli-e-coli': 'Indicateur bactérien fréquent dans les flux qualité de l’eau.',
      'indica': 'Décrit les décisions qualitatives accompagnées par INDICA.',
      enumera: 'Décrit les décisions quantitatives accompagnées par ENUMERA.',
      lims: 'Relie les opérations de laboratoire à AquaVerify Cloud et aux enregistrements traçables.',
      'digital-chain-of-custody': 'Explique le lien numérique entre échantillon, opérateur, méthode et preuve.',
      'analytical-traceability': 'Cadre la preuve de l’échantillon au rapport qu’AquaVerify aide à organiser.',
      'coa-certificate-of-analysis': 'Relie revue technique et livraison client.',
      'audit-trail': 'Soutient des enregistrements révisables dans les flux numériques.',
      oem: 'Explique les routes partenaires comme co-branding et marque blanche.'
    },
    schemaKnowsAbout: ['Microbiologie de l’eau', 'Indicateurs microbiologiques', 'Présence/absence', 'Dénombrement microbiologique', 'LIMS', 'Chaîne de traçabilité numérique', 'Certificat d’analyse', 'Kits d’analyse de l’eau OEM'],
    ecosystemLinksTitle: 'Explorer l’écosystème',
    ecosystemLinks: [
      link('products', 'Produits', 'Comparez les familles AquaVerify pour la microbiologie de l’eau.'),
      link('enumera', 'ENUMERA', 'Explorez les flux de dénombrement lorsqu’un résultat quantitatif est nécessaire.'),
      link('indica', 'INDICA', 'Explorez présence/absence et dépistage opérationnel.'),
      link('standard-kits', 'Kits ISO/EPA', 'Consultez les flux de kits orientés références techniques.'),
      link('lab-essentials', 'Lab Essentials', 'Voir consommables, milieux et contrôles.'),
      link('platform', 'AquaVerify Cloud', 'Reliez échantillon, méthode, résultat, CoA et livraison client.'),
      link('industries-hub', 'Industries', 'Reliez l’écosystème aux laboratoires, utilities et secteurs.'),
      link('resources', 'Ressources', 'Lire guides techniques et livres blancs.'),
      link('glossary', 'Glossaire technique', 'Clarifier microbiologie, LIMS, qualité et canal.')
    ],
    evidenceLinksTitle: 'Preuves et transparence',
    evidenceLinks: [
      link('editorial-methodology', 'Méthodologie éditoriale', 'Comment AquaVerify distingue sources, limites et contexte technique.'),
      link('aquacoli-enumera-coli100-validation', 'Validation AquaColi / ENUMERA Coli100', 'Une ressource de validation reliée à son périmètre technique.'),
      link('resources', 'Bibliothèque de ressources', 'Guides, checklists et synthèses techniques.'),
      link('glossary', 'Glossaire technique', 'Définitions et pages associées pour concepts clés.')
    ],
    commercialLinksTitle: 'Travailler avec AquaVerify',
    commercialLinks: [
      link('contact', 'Recommandation technique', 'Partagez organisme, matrice, méthode et besoin de reporting.'),
      link('distributors', 'Distributeurs', 'Trouvez le bon canal lorsqu’il est disponible.'),
      link('oem', 'OEM et marque blanche', 'Évaluez distribution, co-branding ou marque blanche.')
    ],
    faqs: [
      faq('Qu’est-ce qu’AquaVerify ?', 'AquaVerify est une entreprise B2B qui associe produits de microbiologie de l’eau, traçabilité numérique, ressources techniques, distribution et programmes OEM.'),
      faq('AquaVerify propose-t-il des produits, du logiciel ou les deux ?', 'Les deux. Une organisation peut commencer par une famille de produits et ajouter AquaVerify Cloud lorsqu’elle doit relier échantillons, lots, méthodes, résultats, rapports, inventaire ou portail client.'),
      faq('Quelles familles de produits AquaVerify propose-t-il ?', 'L’offre inclut ENUMERA pour les flux quantitatifs, INDICA pour présence/absence, des kits ISO/EPA orientés références techniques et Lab Essentials pour milieux, contrôles, réactifs et consommables. L’adéquation doit être revue selon produit, organisme, matrice et méthode.'),
      faq('Pour quelles organisations AquaVerify est-il conçu ?', 'Pour laboratoires, utilities, collectivités, équipes qualité, industries, installations, agriculture, pharma, cosmétique, distributeurs et partenaires qui doivent contrôler l’eau avec des preuves traçables.'),
      faq('AquaVerify remplace-t-il un laboratoire accrédité ?', 'Non. Il peut apporter produits, flux numériques, traçabilité, CoA et coordination, mais les essais officiels doivent rester dans la méthode, la validation, la procédure et le périmètre applicables.'),
      faq('Utiliser un produit AquaVerify assure-t-il la conformité réglementaire ?', 'Il ne faut pas le présumer par défaut. L’acceptation dépend du produit, de la méthode, de la matrice, du pays, de l’usage prévu, du laboratoire, de la validation, de l’autorité compétente et du système qualité.'),
      faq('AquaVerify travaille-t-il avec distributeurs et programmes OEM ?', 'Oui. AquaVerify peut évaluer distribution autorisée, co-branding, marque blanche et OEM selon territoire, produits, volume, documentation, support et exigences locales.'),
      faq('Quel est le meilleur point de départ ?', 'Commencer par une recommandation technique qui définit organisme, matrice, objectif, volume, méthode, niveau de traçabilité et canal d’achat.')
    ],
    cta: {
      title: 'Transformez un besoin de contrôle de l’eau en flux technique clair',
      body: 'Partagez l’organisme cible, le type d’eau, la matrice, le volume, la méthode actuelle et le besoin de reporting. AquaVerify peut aider à identifier la combinaison adaptée de produit, plateforme, ressource ou partenaire.',
      button: 'Demander une recommandation technique',
      routeId: 'contact'
    }
  }),
  it: withShared({
    path: '/it/chi-siamo',
    title: 'AquaVerify: microbiologia dell’acqua e tracciabilità digitale per decisioni B2B',
    description: 'AquaVerify sviluppa, produce e distribuisce prodotti di microbiologia dell’acqua per flussi di rilevazione, presenza/assenza ed enumerazione, collegandoli a tracciabilità digitale, report tecnici, distributori e programmi OEM.',
    seoTitle: 'Chi è AquaVerify | Microbiologia e tracciabilità dell’acqua',
    seoDescription: 'Scopri AquaVerify: prodotti di microbiologia dell’acqua, rilevazione e enumerazione, AquaVerify Cloud, risorse tecniche, distributori e programmi OEM.',
    eyebrow: 'Azienda di microbiologia dell’acqua e tecnologia B2B',
    primaryCta: 'Richiedi una raccomandazione tecnica',
    secondaryCta: 'Esplora l’ecosistema AquaVerify',
    socialImageAlt: 'AquaVerify microbiologia dell’acqua e tracciabilità digitale',
    directAnswer: {
      title: 'Che cos’è AquaVerify?',
      body: 'AquaVerify è un’azienda B2B di microbiologia dell’acqua e software operativo. Integra famiglie di prodotti per rilevazione ed enumerazione, kit orientati a riferimenti ISO/EPA, consumabili di laboratorio e AquaVerify Cloud per collegare campione, lotto, metodo, operatore, risultato, revisione, certificato di analisi e consegna al cliente. L’idoneità finale dipende dall’organismo target, dalla matrice, dal metodo, dalla validazione, dal paese e dall’ambito del laboratorio.'
    },
    pillars: [
      { title: 'Prodotti di microbiologia dell’acqua', body: 'Soluzioni per presenza/assenza, enumerazione e flussi orientati a riferimenti tecnici, secondo prodotto e uso previsto.' },
      { title: 'Tracciabilità digitale', body: 'AquaVerify Cloud può collegare campione, lotto, metodo, operatore, lettura, revisione, CoA, incidenti e storico.' },
      { title: 'Percorsi commerciali B2B', body: 'Accesso tramite conversazione diretta, distributori autorizzati, programmi OEM, private label e soluzioni connesse alla piattaforma.' }
    ],
    ecosystemTable: {
      title: 'Che cosa collega l’ecosistema AquaVerify',
      columns: ['Esigenza', 'Strato AquaVerify', 'Evidenza organizzabile', 'Considerazione'],
      rows: [
        ['Rilevazione presenza/assenza', 'INDICA', 'Campione, lotto, risultato e azione', 'Dipende da prodotto, matrice, metodo e procedura'],
        ['Enumerazione microbiologica', 'ENUMERA', 'Lettura, risultato, revisione e CoA', 'Da valutare secondo organismo, uso e validazione'],
        ['Flusso orientato a riferimento', 'Kit ISO/EPA e Lab Essentials', 'Metodo, controlli, materiali e registrazione', 'Non implica accettazione regolatoria di per sé'],
        ['Tracciabilità digitale', 'AquaVerify Cloud', 'Catena di custodia, audit trail, CoA, storico e portale', 'Da configurare nel sistema qualità'],
        ['Distribuzione e scalabilità', 'Distributori e OEM', 'Territorio, supporto, documentazione e fornitura', 'Richiede revisione commerciale e regolatoria locale']
      ]
    },
    sections: [
      section('Perché esiste AquaVerify', 'L’analisi dell’acqua non termina quando appare un risultato. Una decisione utile richiede anche di sapere da quale campione proviene, quale metodo è stato utilizzato, quali lotto e operatore sono coinvolti, chi ha revisionato l’evidenza e come il risultato è stato comunicato. AquaVerify collega questi elementi in un flusso più chiaro e tracciabile.', [
        'Percorso analitico adatto a organismo, matrice e obiettivo.',
        'Prodotti e consumabili per ridurre l’attrito operativo.',
        'Evidenza collegata dal campione al report.',
        'Informazioni comprensibili per laboratorio, qualità, operazioni e cliente.',
        'Possibilità di iniziare con un prodotto ed estendere il flusso al digitale.'
      ]),
      section('Un ecosistema di prodotti, dati e supporto', 'AquaVerify non è limitata a un singolo kit o applicativo. L’offerta combina famiglie di prodotti, consumabili, software, conoscenze tecniche e percorsi commerciali utilizzabili separatamente o in modo connesso.', [
        'ENUMERA: flussi quantitativi quando serve un’enumerazione.',
        'INDICA: presenza/assenza e screening operativo secondo prodotto e procedura.',
        'Kit ISO/EPA: flussi orientati a riferimenti metodologici quando richiesti dal piano analitico.',
        'Lab Essentials: terreni, controlli, reagenti e consumabili.',
        'AquaVerify Cloud: campioni, LIMS, registrazioni, CoA, portale cliente, inventario e follow-up secondo configurazione.'
      ]),
      section('A chi ci rivolgiamo', 'AquaVerify è pensata per organizzazioni che devono combinare microbiologia dell’acqua, controllo operativo, documentazione e decisioni B2B.', [
        'Laboratori pubblici, privati, ambientali e di controllo qualità.',
        'Operatori idrici, comuni, utilities e team di salute ambientale.',
        'Food & beverage, acqua di processo e industrie regolamentate.',
        'Edifici, ospedali, hotel, piscine, spa e operazioni multisito.',
        'Agricoltura, acqua riutilizzata, irrigazione, idroponica e post-raccolta.',
        'Industria farmaceutica, cosmetica e team QA/QC.',
        'Distributori scientifici, integratori, produttori e partner OEM.'
      ]),
      section('Come trasformiamo un’esigenza in un flusso tracciabile', 'Il punto di partenza non è vendere lo stesso prodotto a ogni organizzazione, ma comprendere quale decisione deve essere presa e quale evidenza deve essere conservata.', [
        'Contesto: organismo, tipo d’acqua, matrice, volume, frequenza e uso.',
        'Percorso tecnico: prodotto, metodo, controlli, laboratorio e procedura.',
        'Esecuzione: campione, punto, lotto, operatore, lettura e osservazioni.',
        'Revisione: criterio, risultato, deviazione, decisione e report.',
        'Scala: portale, storico, inventario, più siti, distributore o OEM.'
      ]),
      section('Principi che guidano il nostro lavoro', 'La fiducia tecnica non nasce da promesse generiche, ma da limiti chiari, documentazione utile e decisioni revisionabili.', [
        'Chiarezza tecnica prima di claim ambigui.',
        'Tracciabilità dal punto acqua al report.',
        'Distinzione tra rilevazione, enumerazione, screening e uso regolatorio.',
        'Fonti primarie e contesto del metodo quando necessario.',
        'Adozione modulare con laboratori, LIMS e procedure esistenti.',
        'Revisione per paese, matrice, uso previsto e autorità competente.'
      ]),
      section('Conoscenza tecnica ed evidenze accessibili', 'AquaVerify pubblica contenuti per interpretare metodi, indicatori, normativa, campionamento, tracciabilità e selezione dei prodotti. L’obiettivo è favorire conversazioni tecniche informate, non sostituire validazione o giudizio professionale.', [
        'Risorse e whitepaper per decisioni tecniche e commerciali.',
        'Glossario multilingue su microbiologia, LIMS, qualità e normativa.',
        'Checklist per laboratori, campionamento, settori, LIMS e OEM.',
        'Sintesi di ricerca esterna collegate alle fonti originali.',
        'Rapporti di validazione AquaVerify distinti dagli articoli esterni.',
        'Metodologia editoriale e limitazioni visibili.'
      ]),
      section('Come lavorare con AquaVerify', 'Il percorso più adatto dipende da tipo di organizzazione, territorio, prodotto, volume, livello di supporto ed esigenze digitali.', [
        'Raccomandazione tecnica diretta.',
        'Acquisto e supporto attraverso distributori autorizzati dove disponibili.',
        'Distribuzione, co-branding, private label e programmi OEM.',
        'AquaVerify Cloud come livello indipendente o collegato ai prodotti.',
        'Collaborazione con laboratori interni, esterni o ibridi.',
        'Risorse tecniche per valutazione, acquisto, implementazione e audit.'
      ]),
      section('Limiti e responsabilità', 'AquaVerify offre prodotti, tracciabilità, documentazione e supporto operativo. La decisione finale deve rimanere nel sistema qualità e nel quadro tecnico applicabile a ogni organizzazione.', [
        'Non sostituisce un laboratorio accreditato quando richiesto.',
        'Non estende da solo l’ambito accreditato.',
        'Non sostituisce validazione o verifica del metodo.',
        'Non implica accettazione regolatoria universale.',
        'Non sostituisce autorità competente o responsabile tecnico.',
        'Non trasforma orientamento commerciale in consulenza legale o sanitaria.'
      ])
    ],
    keyConceptRelations: {
      'indicator-microorganism': 'Collega la scelta del prodotto AquaVerify alla ragione tecnica per monitorare un microorganismo.',
      'somatic-coliphages': 'Rilevante dove indicatori virali fanno parte del quadro decisionale.',
      'escherichia-coli-e-coli': 'Indicatore batterico frequente nei flussi di qualità dell’acqua.',
      'indica': 'Descrive decisioni qualitative supportate da INDICA.',
      enumera: 'Descrive decisioni quantitative supportate da ENUMERA.',
      lims: 'Collega operazioni di laboratorio, AquaVerify Cloud e registri tracciabili.',
      'digital-chain-of-custody': 'Spiega il collegamento digitale tra campione, operatore, metodo ed evidenza.',
      'analytical-traceability': 'Inquadra l’evidenza da campione a report che AquaVerify aiuta a organizzare.',
      'coa-certificate-of-analysis': 'Collega revisione tecnica e consegna al cliente.',
      'audit-trail': 'Supporta registri revisionabili nei flussi digitali.',
      oem: 'Spiega percorsi partner come co-branding e private label.'
    },
    schemaKnowsAbout: ['Microbiologia dell’acqua', 'Indicatori microbiologici', 'Presenza/assenza', 'Enumerazione microbiologica', 'LIMS', 'Catena di custodia digitale', 'Certificato di analisi', 'Kit OEM per analisi dell’acqua'],
    ecosystemLinksTitle: 'Esplora l’ecosistema',
    ecosystemLinks: [
      link('products', 'Prodotti', 'Confronta le famiglie AquaVerify per microbiologia dell’acqua.'),
      link('enumera', 'ENUMERA', 'Esplora flussi di enumerazione quando serve un risultato quantitativo.'),
      link('indica', 'INDICA', 'Esplora presenza/assenza e screening operativo.'),
      link('standard-kits', 'Kit ISO/EPA', 'Rivedi flussi di kit orientati a riferimenti tecnici.'),
      link('lab-essentials', 'Lab Essentials', 'Vedi consumabili, terreni e controlli.'),
      link('platform', 'AquaVerify Cloud', 'Collega campione, metodo, risultato, CoA e consegna al cliente.'),
      link('industries-hub', 'Settori', 'Mappa l’ecosistema su laboratori, utilities e settori.'),
      link('resources', 'Risorse', 'Leggi guide tecniche e whitepaper.'),
      link('glossary', 'Glossario tecnico', 'Chiarisci termini di microbiologia, LIMS, qualità e canale.')
    ],
    evidenceLinksTitle: 'Evidenza e trasparenza',
    evidenceLinks: [
      link('editorial-methodology', 'Metodologia editoriale', 'Come AquaVerify separa fonti, limiti e contesto tecnico.'),
      link('aquacoli-enumera-coli100-validation', 'Validazione AquaColi / ENUMERA Coli100', 'Una risorsa di validazione collegata al suo ambito tecnico.'),
      link('resources', 'Biblioteca risorse', 'Guide, checklist e sintesi tecniche.'),
      link('glossary', 'Glossario tecnico', 'Definizioni e pagine correlate per concetti chiave.')
    ],
    commercialLinksTitle: 'Lavora con AquaVerify',
    commercialLinks: [
      link('contact', 'Raccomandazione tecnica', 'Condividi organismo, matrice, metodo ed esigenza di reporting.'),
      link('distributors', 'Distributori', 'Trova il canale adatto dove disponibile.'),
      link('oem', 'OEM e private label', 'Valuta distribuzione, co-branding o private label.')
    ],
    faqs: [
      faq('Che cos’è AquaVerify?', 'AquaVerify è un’azienda B2B che combina prodotti di microbiologia dell’acqua, tracciabilità digitale, risorse tecniche, distribuzione e programmi OEM.'),
      faq('AquaVerify offre prodotti, software o entrambi?', 'Entrambi. L’organizzazione può iniziare con una famiglia di prodotto e aggiungere AquaVerify Cloud quando deve collegare campioni, lotti, metodi, risultati, report, inventario o portale cliente.'),
      faq('Quali famiglie di prodotto offre AquaVerify?', 'L’offerta include ENUMERA per flussi quantitativi, INDICA per presenza/assenza, kit ISO/EPA orientati a riferimenti tecnici e Lab Essentials per terreni, controlli, reagenti e consumabili. L’idoneità va rivista secondo prodotto, organismo, matrice e metodo.'),
      faq('Per quali organizzazioni è pensata?', 'Per laboratori, utilities, comuni, team qualità, industrie, strutture, agricoltura, pharma, cosmetica, distributori e partner che devono controllare acqua con evidenza tracciabile.'),
      faq('AquaVerify sostituisce un laboratorio accreditato?', 'No. Può apportare prodotti, flussi digitali, tracciabilità, CoA e coordinamento, ma le prove ufficiali devono restare entro metodo, validazione, procedura e ambito applicabili.'),
      faq('Usare un prodotto AquaVerify assicura conformità regolatoria?', 'Non va presunto per impostazione predefinita. L’accettazione dipende da prodotto, metodo, matrice, paese, uso previsto, laboratorio, validazione, autorità competente e sistema qualità.'),
      faq('AquaVerify lavora con distributori e programmi OEM?', 'Sì. Può valutare distribuzione autorizzata, co-branding, private label e OEM secondo territorio, prodotti, volume, documentazione, supporto e requisiti locali.'),
      faq('Qual è il miglior punto di partenza?', 'Iniziare da una raccomandazione tecnica che definisca organismo, matrice, obiettivo, volume, metodo, livello di tracciabilità e canale d’acquisto.')
    ],
    cta: {
      title: 'Trasforma un’esigenza di controllo dell’acqua in un flusso tecnico chiaro',
      body: 'Condividi organismo target, tipo d’acqua, matrice, volume, metodo attuale ed esigenze di reporting. AquaVerify può aiutare a identificare la combinazione adatta di prodotto, piattaforma, risorsa o partner.',
      button: 'Richiedi una raccomandazione tecnica',
      routeId: 'contact'
    }
  }),
  ca: withShared({
    path: '/ca/sobre-nosaltres',
    title: 'AquaVerify: microbiologia de l’aigua i traçabilitat digital per a decisions B2B',
    description: 'AquaVerify desenvolupa, fabrica i distribueix productes de microbiologia de l’aigua per a fluxos de detecció, presència/absència i recompte, i els connecta amb traçabilitat digital, informes tècnics, distribuïdors i programes OEM.',
    seoTitle: 'Sobre AquaVerify | Microbiologia i traçabilitat de l’aigua',
    seoDescription: 'Coneix AquaVerify: productes de microbiologia de l’aigua, detecció i recompte, AquaVerify Cloud, recursos tècnics, distribuïdors i programes OEM.',
    eyebrow: 'Empresa de microbiologia de l’aigua i tecnologia B2B',
    primaryCta: 'Sol·licitar recomanació tècnica',
    secondaryCta: 'Explorar l’ecosistema AquaVerify',
    socialImageAlt: 'AquaVerify microbiologia de l’aigua i traçabilitat digital',
    directAnswer: {
      title: 'Què és AquaVerify?',
      body: 'AquaVerify és una empresa B2B de microbiologia de l’aigua i programari operatiu. Integra famílies de producte per a detecció i recompte, kits orientats a referències ISO/EPA, consumibles de laboratori i AquaVerify Cloud per connectar mostra, lot, mètode, operador, resultat, revisió, certificat d’anàlisi i lliurament al client. L’encaix final depèn de l’organisme objectiu, la matriu, el mètode, la validació, el país i l’abast del laboratori.'
    },
    pillars: [
      { title: 'Productes de microbiologia de l’aigua', body: 'Solucions per a presència/absència, recompte i fluxos orientats a referències tècniques, segons el producte i l’ús previst.' },
      { title: 'Traçabilitat digital', body: 'AquaVerify Cloud pot connectar mostra, lot, mètode, operador, lectura, revisió, CoA, incidències i històric.' },
      { title: 'Rutes comercials B2B', body: 'Accés mitjançant conversa directa, distribuïdors autoritzats, programes OEM, marca blanca i solucions connectades amb plataforma.' }
    ],
    ecosystemTable: {
      title: 'Què connecta l’ecosistema AquaVerify',
      columns: ['Necessitat', 'Capa AquaVerify', 'Evidència que es pot organitzar', 'Consideració'],
      rows: [
        ['Detecció presència/absència', 'INDICA', 'Mostra, lot, resultat i acció', 'Depèn del producte, matriu, mètode i procediment'],
        ['Recompte microbiològic', 'ENUMERA', 'Lectura, resultat, revisió i CoA', 'S’ha d’avaluar segons organisme, ús i validació'],
        ['Flux orientat a referència', 'Kits ISO/EPA i Lab Essentials', 'Mètode, controls, materials i registre', 'No implica acceptació reguladora per si mateix'],
        ['Traçabilitat digital', 'AquaVerify Cloud', 'Cadena de custòdia, audit trail, CoA, històric i portal', 'S’ha de configurar dins del sistema de qualitat'],
        ['Distribució i escalat', 'Distribuïdors i OEM', 'Territori, suport, documentació i subministrament', 'Requereix revisió comercial i reguladora local']
      ]
    },
    sections: [
      section('Per què existeix AquaVerify', 'L’anàlisi de l’aigua no acaba quan apareix un resultat. Una decisió útil també requereix saber de quina mostra procedeix, quin mètode s’ha utilitzat, quin lot i operador hi han participat, qui ha revisat l’evidència i com s’ha comunicat el resultat. AquaVerify connecta aquestes peces en un flux més clar i traçable.', [
        'Ruta analítica adequada a l’organisme, la matriu i l’objectiu.',
        'Productes i consumibles per reduir fricció operativa.',
        'Evidència connectada des de la mostra fins a l’informe.',
        'Informació comprensible per a laboratori, qualitat, operacions i client.',
        'Possibilitat de començar per un producte i ampliar cap a un flux digital.'
      ]),
      section('Un ecosistema de producte, dades i suport', 'AquaVerify no es limita a un únic kit o aplicació. L’oferta combina famílies de producte, consumibles, programari, coneixement tècnic i rutes comercials que es poden activar per separat o com un flux connectat.', [
        'ENUMERA: fluxos quantitatius quan la decisió necessita recompte.',
        'INDICA: presència/absència i cribratge operatiu segons producte i procediment.',
        'Kits ISO/EPA: fluxos orientats a referències metodològiques quan el pla analític ho requereix.',
        'Lab Essentials: medis, controls, reactius i consumibles.',
        'AquaVerify Cloud: mostres, LIMS, registres, CoA, portal client, inventari i seguiment segons configuració.'
      ]),
      section('A qui ajudem', 'AquaVerify està pensada per a organitzacions que necessiten combinar microbiologia de l’aigua, control operatiu, documentació i decisions B2B.', [
        'Laboratoris públics, privats, ambientals i de control de qualitat.',
        'Operadors d’aigua, municipis, utilities i equips de salut ambiental.',
        'Alimentació i begudes, aigua de procés i indústries regulades.',
        'Edificis, hospitals, hotels, piscines, spas i operacions multisede.',
        'Agricultura, aigua regenerada, reg, hidroponia i postcollita.',
        'Indústria farmacèutica, cosmètica i equips QA/QC.',
        'Distribuïdors científics, integradors, fabricants i partners OEM.'
      ]),
      section('Com convertim una necessitat en un flux traçable', 'El punt de partida no és vendre el mateix producte a totes les organitzacions. Primer cal entendre quina decisió s’ha de prendre i quina evidència s’ha de conservar.', [
        'Context: organisme, tipus d’aigua, matriu, volum, freqüència i ús.',
        'Ruta tècnica: producte, mètode, controls, laboratori i procediment.',
        'Execució: mostra, punt, lot, operador, lectura i observacions.',
        'Revisió: criteri, resultat, desviació, decisió i informe.',
        'Escalat: portal, històric, inventari, múltiples seus, distribuïdor o OEM.'
      ]),
      section('Principis que guien la nostra feina', 'La confiança tècnica no es construeix amb promeses generals, sinó amb límits clars, documentació útil i decisions revisables.', [
        'Claredat tècnica abans que claims ambigus.',
        'Traçabilitat des del punt d’aigua fins a l’informe.',
        'Distinció entre detecció, recompte, cribratge i ús regulador.',
        'Fonts primàries i context de mètode quan correspongui.',
        'Adopció modular amb laboratoris, LIMS i procediments existents.',
        'Revisió per país, matriu, ús previst i autoritat competent.'
      ]),
      section('Coneixement tècnic i evidència accessible', 'AquaVerify publica contingut per interpretar mètodes, indicadors, normativa, mostreig, traçabilitat i selecció de producte. L’objectiu és facilitar una conversa tècnica més informada, no substituir la validació ni el criteri professional.', [
        'Recursos i whitepapers per a decisions tècniques i comercials.',
        'Glossari multilingüe de microbiologia, LIMS, qualitat i normativa.',
        'Checklists per a laboratori, mostreig, sectors, LIMS i OEM.',
        'Resums de recerca externa enllaçats a les fonts originals.',
        'Informes de validació AquaVerify diferenciats dels articles externs.',
        'Metodologia editorial i limitacions visibles.'
      ]),
      section('Formes de treballar amb AquaVerify', 'La ruta adequada depèn del tipus d’organització, el territori, el producte, el volum, el nivell de suport i les necessitats digitals.', [
        'Recomanació tècnica directa.',
        'Compra i suport mitjançant distribuïdors autoritzats on estiguin disponibles.',
        'Distribució, co-branding, marca blanca i programes OEM.',
        'AquaVerify Cloud com a capa independent o connectada amb productes.',
        'Col·laboració amb laboratoris interns, externs o models mixtos.',
        'Recursos tècnics per avaluació, compra, implantació i auditoria.'
      ]),
      section('Límits i responsabilitats', 'AquaVerify aporta productes, traçabilitat, documentació i suport operatiu. La decisió final s’ha de mantenir dins del sistema de qualitat i del marc tècnic aplicable a cada organització.', [
        'No substitueix un laboratori acreditat quan sigui obligatori.',
        'No amplia automàticament l’abast acreditat.',
        'No substitueix la validació o verificació del mètode.',
        'No garanteix acceptació reguladora universal.',
        'No substitueix l’autoritat competent ni el responsable tècnic.',
        'No converteix una orientació comercial en assessorament legal o sanitari.'
      ])
    ],
    keyConceptRelations: {
      'indicator-microorganism': 'Connecta la selecció de producte AquaVerify amb la raó tècnica per monitoritzar un microorganisme.',
      'somatic-coliphages': 'Rellevant quan els indicadors virals formen part del marc de decisió.',
      'escherichia-coli-e-coli': 'Indicador bacterià freqüent en fluxos de qualitat de l’aigua.',
      'indica': 'Descriu decisions qualitatives suportades per INDICA.',
      enumera: 'Descriu decisions quantitatives suportades per ENUMERA.',
      lims: 'Connecta operacions de laboratori amb AquaVerify Cloud i registres traçables.',
      'digital-chain-of-custody': 'Explica el vincle digital entre mostra, operador, mètode i evidència.',
      'analytical-traceability': 'Emmarca l’evidència de mostra a informe que AquaVerify ajuda a organitzar.',
      'coa-certificate-of-analysis': 'Connecta revisió tècnica i lliurament al client.',
      'audit-trail': 'Dona suport a registres revisables en fluxos digitals.',
      oem: 'Explica rutes partner com co-branding i marca blanca.'
    },
    schemaKnowsAbout: ['Microbiologia de l’aigua', 'Indicadors microbiològics', 'Presència/absència', 'Recompte microbiològic', 'LIMS', 'Cadena de custòdia digital', 'Certificat d’anàlisi', 'Kits OEM d’anàlisi d’aigua'],
    ecosystemLinksTitle: 'Explorar l’ecosistema',
    ecosystemLinks: [
      link('products', 'Productes', 'Compara famílies AquaVerify per a microbiologia de l’aigua.'),
      link('enumera', 'ENUMERA', 'Explora fluxos de recompte quan cal resultat quantitatiu.'),
      link('indica', 'INDICA', 'Explora presència/absència i cribratge operatiu.'),
      link('standard-kits', 'Kits ISO/EPA', 'Revisa fluxos de kits orientats a referències tècniques.'),
      link('lab-essentials', 'Lab Essentials', 'Consulta consumibles, medis i controls.'),
      link('platform', 'AquaVerify Cloud', 'Connecta mostra, mètode, resultat, CoA i lliurament al client.'),
      link('industries-hub', 'Sectors', 'Mapeja l’ecosistema a laboratoris, utilities i sectors.'),
      link('resources', 'Recursos', 'Llegeix guies tècniques i whitepapers.'),
      link('glossary', 'Glossari tècnic', 'Aclareix termes de microbiologia, LIMS, qualitat i canal.')
    ],
    evidenceLinksTitle: 'Evidència i transparència',
    evidenceLinks: [
      link('editorial-methodology', 'Metodologia editorial', 'Com AquaVerify separa fonts, límits i context tècnic.'),
      link('aquacoli-enumera-coli100-validation', 'Validació AquaColi / ENUMERA Coli100', 'Un recurs de validació vinculat al seu abast tècnic.'),
      link('resources', 'Biblioteca de recursos', 'Guies, checklists i resums tècnics.'),
      link('glossary', 'Glossari tècnic', 'Definicions i pàgines relacionades per a conceptes clau.')
    ],
    commercialLinksTitle: 'Treballar amb AquaVerify',
    commercialLinks: [
      link('contact', 'Recomanació tècnica', 'Comparteix organisme, matriu, mètode i necessitat de reporting.'),
      link('distributors', 'Distribuïdors', 'Troba el canal adequat quan estigui disponible.'),
      link('oem', 'OEM i marca blanca', 'Avalua distribució, co-branding o marca blanca.')
    ],
    faqs: [
      faq('Què és AquaVerify?', 'AquaVerify és una empresa B2B que combina productes de microbiologia de l’aigua, traçabilitat digital, recursos tècnics, distribució i programes OEM.'),
      faq('AquaVerify ofereix productes, programari o totes dues coses?', 'Totes dues. L’organització pot començar amb una família de producte i afegir AquaVerify Cloud quan necessiti connectar mostres, lots, mètodes, resultats, informes, inventari o portal client.'),
      faq('Quines famílies de producte ofereix AquaVerify?', 'L’oferta inclou ENUMERA per a fluxos quantitatius, INDICA per a presència/absència, kits ISO/EPA orientats a referències tècniques i Lab Essentials per a medis, controls, reactius i consumibles. L’encaix s’ha de revisar segons producte, organisme, matriu i mètode.'),
      faq('Per a quines organitzacions està pensat?', 'Per a laboratoris, utilities, municipis, equips de qualitat, indústries, instal·lacions, agricultura, pharma, cosmètica, distribuïdors i partners que necessiten controlar aigua amb evidència traçable.'),
      faq('AquaVerify substitueix un laboratori acreditat?', 'No. Pot aportar productes, fluxos digitals, traçabilitat, CoA i coordinació, però els assajos oficials han de romandre dins del mètode, validació, procediment i abast aplicables.'),
      faq('Utilitzar un producte AquaVerify assegura compliment regulador?', 'No s’ha de pressuposar per defecte. L’acceptació depèn del producte, mètode, matriu, país, ús previst, laboratori, validació, autoritat competent i sistema de qualitat.'),
      faq('AquaVerify treballa amb distribuïdors i programes OEM?', 'Sí. Pot avaluar distribució autoritzada, co-branding, marca blanca i OEM segons territori, productes, volum, documentació, suport i requisits locals.'),
      faq('Quin és el millor punt de partida?', 'Començar per una recomanació tècnica que defineixi organisme, matriu, objectiu, volum, mètode, nivell de traçabilitat i canal de compra.')
    ],
    cta: {
      title: 'Converteix una necessitat de control de l’aigua en un flux tècnic clar',
      body: 'Comparteix l’organisme objectiu, el tipus d’aigua, la matriu, el volum, el mètode actual i la necessitat d’informes. AquaVerify pot ajudar a identificar la combinació adequada de producte, plataforma, recurs o partner.',
      button: 'Sol·licitar recomanació tècnica',
      routeId: 'contact'
    }
  })
};

export const ABOUT_REQUIRED_ROUTE_IDS = [
  'products',
  'enumera',
  'indica',
  'standard-kits',
  'lab-essentials',
  'platform',
  'industries-hub',
  'resources',
  'glossary',
  'distributors',
  'oem',
  'contact',
  'editorial-methodology',
  'aquacoli-enumera-coli100-validation'
];
