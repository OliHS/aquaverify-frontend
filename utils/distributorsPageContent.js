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

const SECTOR_CODES = ['LAB', 'QA', 'MUN', 'F&B', 'IND', 'FAC', 'AGR', 'GMP', 'HOT'];

const COUNTRIES = {
  en: ['Spain', 'France', 'Italy', 'Portugal', 'Germany', 'United Kingdom', 'Ireland', 'Netherlands', 'Belgium', 'Switzerland', 'Mexico', 'United States', 'Canada', 'Brazil', 'Chile', 'Colombia', 'Peru', 'Argentina', 'Morocco', 'South Africa', 'United Arab Emirates', 'Saudi Arabia', 'India', 'Singapore', 'Australia'],
  es: ['España', 'Francia', 'Italia', 'Portugal', 'Alemania', 'Reino Unido', 'Irlanda', 'Países Bajos', 'Bélgica', 'Suiza', 'México', 'Estados Unidos', 'Canadá', 'Brasil', 'Chile', 'Colombia', 'Perú', 'Argentina', 'Marruecos', 'Sudáfrica', 'Emiratos Árabes Unidos', 'Arabia Saudí', 'India', 'Singapur', 'Australia'],
  fr: ['Espagne', 'France', 'Italie', 'Portugal', 'Allemagne', 'Royaume-Uni', 'Irlande', 'Pays-Bas', 'Belgique', 'Suisse', 'Mexique', 'États-Unis', 'Canada', 'Brésil', 'Chili', 'Colombie', 'Pérou', 'Argentine', 'Maroc', 'Afrique du Sud', 'Émirats arabes unis', 'Arabie saoudite', 'Inde', 'Singapour', 'Australie'],
  it: ['Spagna', 'Francia', 'Italia', 'Portogallo', 'Germania', 'Regno Unito', 'Irlanda', 'Paesi Bassi', 'Belgio', 'Svizzera', 'Messico', 'Stati Uniti', 'Canada', 'Brasile', 'Cile', 'Colombia', 'Perù', 'Argentina', 'Marocco', 'Sudafrica', 'Emirati Arabi Uniti', 'Arabia Saudita', 'India', 'Singapore', 'Australia'],
  ca: ['Espanya', 'França', 'Itàlia', 'Portugal', 'Alemanya', 'Regne Unit', 'Irlanda', 'Països Baixos', 'Bèlgica', 'Suïssa', 'Mèxic', 'Estats Units', 'Canadà', 'Brasil', 'Xile', 'Colòmbia', 'Perú', 'Argentina', 'Marroc', 'Sud-àfrica', 'Emirats Àrabs Units', 'Aràbia Saudita', 'Índia', 'Singapur', 'Austràlia']
};

function card(title, body) {
  return { title, body };
}

function addCommonFields(lang, page) {
  const sectors = page.sectors.map((sector, index) => ({
    ...sector,
    routeId: SECTOR_ROUTE_IDS[index],
    code: SECTOR_CODES[index]
  }));

  return {
    ...page,
    countries: COUNTRIES[lang] || COUNTRIES.en,
    sectorOptions: sectors.map((sector) => sector.title),
    sectors,
    sections: [
      {
        title: page.pathsTitle,
        body: page.pathsBody,
        bullets: [
          `${page.buyerPath.title}: ${page.buyerPath.body}`,
          `${page.partnerPath.title}: ${page.partnerPath.body}`
        ]
      },
      {
        title: page.authorizedTitle,
        body: page.authorizedBody,
        bullets: page.mapTags
      },
      {
        title: page.processTitle,
        body: page.processBody,
        bullets: page.processSteps.map((step) => `${step.title}: ${step.body}`)
      },
      {
        title: page.buyerTitle,
        body: page.buyerBody,
        bullets: page.buyerCards.map((item) => `${item.title}: ${item.body}`)
      },
      {
        title: page.partnerTitle,
        body: page.partnerBody,
        bullets: page.partnerModels.map((item) => `${item.title}: ${item.body}`)
      },
      {
        title: page.programTitle,
        body: page.programBody,
        bullets: page.programCards.map((item) => `${item.title}: ${item.body}`)
      },
      {
        title: page.sectorsTitle,
        body: page.sectorsBody,
        bullets: sectors.map((sector) => `${sector.title}: ${sector.body}`)
      },
      {
        title: page.formsTitle,
        body: page.formsBody,
        bullets: [page.forms.buyer.title, page.forms.partner.title]
      }
    ]
  };
}

const RAW_PAGES = {
  en: {
    path: '/distributors',
    title: 'Buy AquaVerify with local support or become an authorized distributor',
    description: 'AquaVerify connects water microbiology products, digital traceability, technical reporting and OEM programs with partners able to support laboratories, industries, municipalities, facilities and quality teams in their market.',
    eyebrow: 'AquaVerify network',
    primaryCta: 'Request local contact',
    secondaryCta: 'Request partner review',
    seoTitle: 'AquaVerify Distributors | Global network, local support and authorized partners',
    seoDescription: 'Find an authorized AquaVerify distributor or apply to become a partner for water microbiology products, digital traceability, technical reporting and OEM opportunities.',
    heroPanelTitle: 'Two journeys, one network',
    metrics: ['Local supply route', 'Technical partner review', 'Product + platform portfolio'],
    cycle: [
      card('Country', 'Market, language, availability and support context.'),
      card('Need', 'Product, platform, OEM or distributor opportunity.'),
      card('Routing', 'AquaVerify assigns the right partner or internal team.'),
      card('Activation', 'Training, documentation, quote and follow-up.')
    ],
    trustCards: [
      card('Local access', 'A clearer route to supply, onboarding and technical response.'),
      card('Global standard', 'One AquaVerify framework for products, platform and documentation.'),
      card('Partner-ready', 'A structured channel for distributors, resellers and OEM models.'),
      card('Sector guidance', 'Pages and resources to support vertical sales conversations.')
    ],
    pathsTitle: 'One page for two different needs',
    pathsBody: 'Start with the journey that best describes your objective. Both routes connect you to the right AquaVerify team.',
    buyerPath: {
      title: 'I need to buy or implement AquaVerify',
      body: 'Find the right local route to purchase products, coordinate training, check availability and receive technical support in your country.',
      bullets: ['Select country and industry', 'Share product, volume or use case', 'Receive a response from the partner or AquaVerify'],
      cta: 'Request local contact'
    },
    partnerPath: {
      title: 'I want to distribute AquaVerify',
      body: 'Apply for review as a distributor, technical reseller, regional partner, integrator or OEM/private-label option.',
      bullets: ['Share territory and coverage', 'Describe portfolio, customers and technical capabilities', 'AquaVerify reviews fit, exclusivity and activation plan'],
      cta: 'Request partner review'
    },
    authorizedEyebrow: 'Authorized distributors',
    authorizedTitle: 'Authorized distributors',
    authorizedBody: 'Find an authorized AquaVerify partner near you for local support, inventory, training and technical continuity.',
    mapTitle: 'Interactive distributor map',
    mapBody: 'Search by country or region and send a structured request to the correct AquaVerify route.',
    mapNetworkTitle: 'Global partner network',
    mapTags: ['Distributor', 'Reseller', 'OEM', 'Support'],
    searchTitle: 'Search by country',
    searchBody: 'If there is no active distributor, AquaVerify can evaluate direct supply, regional support or a new partner opportunity.',
    searchPlaceholder: 'Country or territory',
    searchEmptyTitle: 'Select a country',
    searchEmptyBody: 'Choose a market to start the routing process.',
    searchResultTitle: 'Route available for review',
    searchResultBody: 'Send the request and AquaVerify will route it to the right partner, reseller or internal team.',
    processEyebrow: 'How it works',
    processTitle: 'From enquiry to local support',
    processBody: 'The flow is designed to avoid scattered searches and route each request to the right channel.',
    processSteps: [
      card('Share country and need', 'The form identifies territory, industry, volume, products and urgency.'),
      card('Route assignment', 'AquaVerify validates whether the case fits a local partner, direct support, regional reseller or new distributor opportunity.'),
      card('Contact and proposal', 'The customer or candidate receives a response aligned with use case, availability, training and documentation.'),
      card('Activation and follow-up', 'Implementation can include onboarding, technical material, reporting, laboratory coordination and after-sales support.')
    ],
    buyerEyebrow: 'For customers',
    buyerTitle: 'Buy with local support without losing the global standard',
    buyerBody: 'Buyers need availability, technical response and documentary confidence. The distributor network enables local access while preserving the AquaVerify framework.',
    buyerCards: [
      card('Supply and availability', 'Commercial coordination, local inventory when applicable, lead times and supply alternatives.'),
      card('Technical support', 'Guidance for product selection, sample workflow, consumables, platform and reports.'),
      card('Training and onboarding', 'Sessions for laboratory, quality, operations, technical sales or external support teams.'),
      card('AquaVerify escalation', 'When a case requires specialist input, the partner can escalate it to AquaVerify.'),
      card('Documentation', 'Technical material, usage guides, evidence, reporting and support for audits or end customers.'),
      card('Industry coverage', 'Application in laboratories, utilities, food and beverage, industry, facilities, agriculture, pharma and hospitality.')
    ],
    partnerEyebrow: 'For distributors',
    partnerTitle: 'A differentiated portfolio for selling critical water solutions with technical support',
    partnerBody: 'AquaVerify looks for partners with commercial presence, technical capability and access to customers that depend on traceable water controls.',
    partnerModels: [
      card('Authorized distributor', 'Commercial channel to sell AquaVerify products and coordinate local support.'),
      card('Technical reseller', 'A scientific, laboratory, water treatment or instrumentation company adding AquaVerify to its offering.'),
      card('Regional partner', 'Multi-country coverage, consolidated sales network and training capability.'),
      card('OEM or private label', 'A reviewable model for companies with their own portfolio, end customers and integration needs.')
    ],
    candidateTitle: 'What AquaVerify evaluates in a candidate',
    candidateBullets: ['Compatible territorial coverage and customer portfolio.', 'Capability for technical support, training and follow-up.', 'Experience in water, laboratory, quality, treatment, industry or scientific channels.', 'Commitment to traceability, documentation and transparent communication.', 'Realistic commercial plan to activate opportunities by industry.', 'Ability to coordinate complex enquiries with AquaVerify.'],
    programEyebrow: 'Partner program',
    programTitle: 'What AquaVerify can bring to the channel',
    programBody: 'The program can adapt to territory, partner type, volume, industry and technical maturity.',
    programCards: [
      card('Product portfolio', 'Water microbiology solutions, digital modules, technical reports and industry workflows.'),
      card('Commercial material', 'Sales arguments, use cases, industry messaging and resources to explain value to customers.'),
      card('Technical training', 'Onboarding for sales, technical and support teams according to products and use cases.'),
      card('Lead routing', 'Opportunity routing when territory, language or local support requires a partner.'),
      card('OEM and private label', 'Assessment of integration, private-label distribution or co-branding models.'),
      card('Expert escalation', 'Access to AquaVerify for technical questions, implementation and documentation.')
    ],
    sectorsEyebrow: 'Connected industries',
    sectorsTitle: 'One network for markets that depend on water',
    sectorsBody: 'Each industry has a dedicated page with challenges, workflows and tailored solutions. Distributors can use these pages as vertical sales guidance.',
    sectorCta: 'Open industry page',
    sectors: [
      card('Water analysis laboratories', 'TAT, CoA, chain of custody and customer portal.'),
      card('Water quality control', 'Control programs, samples, traceability and reports.'),
      card('Municipal water analysis', 'Networks, tanks, sampling points and public health.'),
      card('Food and beverage', 'Water as ingredient, process, CIP, batch and audit.'),
      card('Industrial process water', 'Intake, treatment, recirculation, effluent and control.'),
      card('Water risk management in facilities', 'DHW, tanks, terminal points, aerosolization and multi-site.'),
      card('Agriculture', 'Irrigation, reclaimed water, fertigation and packhouse.'),
      card('Pharmaceutical and cosmetics industry', 'Critical water, WFI when applicable, QC, QA, batches, deviations and CAPA.'),
      card('Hospitality, tourism and leisure', 'Hotels, spas, pools, campsites, kitchens and seasonal reopening.')
    ],
    formsTitle: 'Send the request to the right AquaVerify route',
    formsBody: 'Both forms continue in AquaVerify Cloud so the team receives country, industry and context from the corporate site.',
    forms: {
      buyer: {
        title: 'Request contact with a distributor',
        body: 'Share country, industry and need so AquaVerify can route the request to the authorized partner or internal team.',
        submit: 'Send distributor request',
        fields: { name: 'Name and company', email: 'Professional email', country: 'Country or territory', sector: 'Main industry', message: 'Need or estimated volume' }
      },
      partner: {
        title: 'Request review as a distributor',
        body: 'Describe territory, company type, portfolio and capabilities to start the fit review.',
        submit: 'Send partner application',
        fields: { name: 'Name and company', email: 'Professional email', country: 'Country or territory', companyType: 'Company type', portfolio: 'Current portfolio or specialization' }
      }
    },
    faqEyebrow: 'FAQ',
    faqTitle: 'Common questions about AquaVerify distributors',
    cta: {
      title: 'Find local support or open a new distribution opportunity',
      body: 'AquaVerify can route customer requests, evaluate new partners and connect product, platform and OEM conversations from one place.',
      primary: 'Request local contact',
      secondary: 'Request partner review'
    },
    faqs: [
      { question: 'How do I find an authorized AquaVerify distributor?', answer: 'Select your country or submit a request with country, industry and need. AquaVerify will route the enquiry to the authorized distributor, regional reseller or internal team best suited to the case.' },
      { question: 'What if there is no active distributor in my country?', answer: 'AquaVerify can evaluate direct supply, regional support or a new distribution opportunity in that territory.' },
      { question: 'What types of companies can become distributors?', answer: 'Laboratories, water treatment companies, scientific distributors, integrators, technical consultants, quality providers, utility partners and companies with a specialized B2B channel.' },
      { question: 'Can distributors work with OEM or private-label models?', answer: 'Yes. AquaVerify can assess OEM, private label or co-branding models based on territory, volume, customer portfolio, technical support and market restrictions.' },
      { question: 'Does the partner offer include the digital platform?', answer: 'Partner programs may include platform workflows for traceability, reporting, customer communication and commercial follow-up depending on the agreed scope.' },
      { question: 'How is technical quality maintained across the network?', answer: 'AquaVerify prioritizes partners with training, documentation, support and technical communication capability. Complex cases can be escalated to AquaVerify.' }
    ]
  },
  es: {
    path: '/es/distribuidores',
    title: 'Compra AquaVerify con soporte local o conviértete en distribuidor autorizado',
    description: 'AquaVerify conecta productos de microbiología del agua, trazabilidad digital, informes técnicos y programas OEM con partners capaces de atender laboratorios, industrias, municipios, instalaciones y equipos de calidad en su mercado.',
    eyebrow: 'Red AquaVerify',
    primaryCta: 'Solicitar contacto local',
    secondaryCta: 'Solicitar evaluación de partner',
    seoTitle: 'Distribuidores AquaVerify | Red global, soporte local y partners autorizados',
    seoDescription: 'Encuentre un distribuidor autorizado AquaVerify o solicite convertirse en partner para productos de microbiología del agua, trazabilidad digital, informes técnicos y oportunidades OEM.',
    heroPanelTitle: 'Dos recorridos, una misma red',
    metrics: ['Ruta de suministro local', 'Evaluación técnica de partner', 'Portfolio producto + plataforma'],
    cycle: [
      card('País', 'Mercado, idioma, disponibilidad y contexto de soporte.'),
      card('Necesidad', 'Producto, plataforma, OEM u oportunidad de distribución.'),
      card('Routing', 'AquaVerify asigna el partner o equipo interno adecuado.'),
      card('Activación', 'Formación, documentación, cotización y seguimiento.')
    ],
    trustCards: [
      card('Acceso local', 'Una ruta más clara hacia suministro, onboarding y respuesta técnica.'),
      card('Estándar global', 'Un mismo criterio AquaVerify para productos, plataforma y documentación.'),
      card('Canal partner', 'Un programa estructurado para distribuidores, resellers y modelos OEM.'),
      card('Guía sectorial', 'Páginas y recursos para apoyar conversaciones comerciales por vertical.')
    ],
    pathsTitle: 'La página está diseñada para dos necesidades distintas',
    pathsBody: 'Empieza por el recorrido que mejor describe tu objetivo. Ambos flujos llegan al equipo adecuado para acelerar la respuesta.',
    buyerPath: {
      title: 'Necesito comprar o implementar AquaVerify',
      body: 'Encuentre la ruta local más adecuada para adquirir productos, coordinar formación, validar disponibilidad y recibir soporte técnico en su país.',
      bullets: ['Seleccione país y sector', 'Indique producto, volumen o caso de uso', 'Reciba respuesta del partner o de AquaVerify'],
      cta: 'Solicitar contacto local'
    },
    partnerPath: {
      title: 'Quiero distribuir AquaVerify',
      body: 'Solicite evaluación como distribuidor, reseller técnico, partner regional, integrador u opción OEM/marca blanca.',
      bullets: ['Indique territorio y cobertura', 'Explique cartera, clientes y capacidades técnicas', 'AquaVerify evalúa encaje, exclusividad y plan de activación'],
      cta: 'Solicitar evaluación de partner'
    },
    authorizedEyebrow: 'Distribuidores autorizados',
    authorizedTitle: 'Distribuidores autorizados',
    authorizedBody: 'Encuentre un partner autorizado de AquaVerify cerca de usted para soporte local, inventario, capacitación y continuidad técnica.',
    mapTitle: 'Mapa interactivo de distribuidores',
    mapBody: 'Busque por país o región y envíe una solicitud estructurada a la ruta AquaVerify correcta.',
    mapNetworkTitle: 'Red global de socios',
    mapTags: ['Distribuidor', 'Reseller', 'OEM', 'Soporte'],
    searchTitle: 'Buscar por país',
    searchBody: 'Si no hay distribuidor activo, AquaVerify puede evaluar suministro directo, soporte regional o una nueva oportunidad de partner.',
    searchPlaceholder: 'País o territorio',
    searchEmptyTitle: 'Seleccione un país',
    searchEmptyBody: 'Elija un mercado para iniciar la ruta de asignación.',
    searchResultTitle: 'Ruta disponible para revisión',
    searchResultBody: 'Envíe la solicitud y AquaVerify la dirigirá al partner, reseller o equipo interno adecuado.',
    processEyebrow: 'Cómo funciona',
    processTitle: 'De la consulta al soporte local',
    processBody: 'El flujo está pensado para evitar búsquedas dispersas y dirigir cada solicitud al canal adecuado.',
    processSteps: [
      card('Indique país y necesidad', 'El formulario identifica territorio, sector, volumen, productos y urgencia.'),
      card('Asignación de ruta', 'AquaVerify valida si corresponde partner local, soporte directo, reseller regional u oportunidad de nuevo distribuidor.'),
      card('Contacto y propuesta', 'El cliente o candidato recibe una respuesta orientada al caso de uso, disponibilidad, formación y documentación.'),
      card('Activación y seguimiento', 'La implementación puede incluir onboarding, material técnico, reporting, coordinación con laboratorio y soporte postventa.')
    ],
    buyerEyebrow: 'Para clientes',
    buyerTitle: 'Compre con soporte local sin perder estándar global',
    buyerBody: 'Los compradores necesitan disponibilidad, respuesta técnica y confianza documental. La red de distribuidores facilita el acceso local manteniendo el criterio AquaVerify.',
    buyerCards: [
      card('Suministro y disponibilidad', 'Coordinación comercial, inventario local cuando aplique, plazos y alternativas de suministro.'),
      card('Soporte técnico', 'Acompañamiento para selección de producto, flujo de muestras, consumibles, plataforma e informes.'),
      card('Formación y onboarding', 'Sesiones para equipos de laboratorio, calidad, operaciones, ventas técnicas o soporte externo.'),
      card('Escalación AquaVerify', 'Cuando el caso requiere criterio especializado, el partner puede escalarlo al equipo AquaVerify.'),
      card('Documentación', 'Material técnico, guías de uso, evidencias, reporting y soporte para auditoría o cliente final.'),
      card('Cobertura sectorial', 'Aplicación en laboratorios, utilities, alimentación, industria, instalaciones, agricultura, pharma y hospitality.')
    ],
    partnerEyebrow: 'Para distribuidores',
    partnerTitle: 'Un portfolio diferencial para vender agua crítica con soporte técnico',
    partnerBody: 'AquaVerify busca partners con presencia comercial, capacidad técnica y acceso a clientes que dependen de controles de agua trazables.',
    partnerModels: [
      card('Distribuidor autorizado', 'Canal comercial para vender productos AquaVerify y coordinar soporte local.'),
      card('Reseller técnico', 'Empresa con cartera científica, laboratorio, tratamiento de agua o instrumentación que añade AquaVerify a su oferta.'),
      card('Partner regional', 'Cobertura de varios países, red comercial consolidada y capacidad de formación.'),
      card('OEM o marca blanca', 'Modelo evaluable para empresas con cartera propia, clientes finales y necesidades de integración.')
    ],
    candidateTitle: 'Qué evalúa AquaVerify en un candidato',
    candidateBullets: ['Cobertura territorial y cartera de clientes compatible.', 'Capacidad para soporte técnico, formación y seguimiento.', 'Experiencia en agua, laboratorio, calidad, tratamiento, industria o canal científico.', 'Compromiso con trazabilidad, documentación y comunicación transparente.', 'Plan comercial realista para activar oportunidades por sector.', 'Capacidad para coordinar consultas complejas con AquaVerify.'],
    programEyebrow: 'Programa partner',
    programTitle: 'Qué puede aportar AquaVerify al canal',
    programBody: 'El programa puede adaptarse según territorio, tipo de partner, volumen, sector y madurez técnica.',
    programCards: [
      card('Portfolio de productos', 'Soluciones de microbiología del agua, módulos digitales, informes técnicos y flujos sectoriales.'),
      card('Material comercial', 'Argumentarios, casos de uso, mensajes por sector y recursos para explicar valor a clientes.'),
      card('Formación técnica', 'Onboarding para equipos comerciales, técnicos y de soporte según productos y casos de uso.'),
      card('Lead routing', 'Derivación de oportunidades cuando el territorio, idioma o soporte local requieren partner.'),
      card('OEM y marca blanca', 'Evaluación de modelos de integración, distribución con marca propia o co-branding.'),
      card('Escalado experto', 'Acceso al equipo AquaVerify para consultas técnicas, implementación y documentación.')
    ],
    sectorsEyebrow: 'Sectores conectados',
    sectorsTitle: 'Una red para mercados que dependen del agua',
    sectorsBody: 'Cada sector tiene una página específica con retos, flujos y soluciones adaptadas. Los distribuidores pueden usar estas páginas como guía comercial por vertical.',
    sectorCta: 'Abrir página sectorial',
    sectors: [
      card('Laboratorios de análisis de agua', 'TAT, CoA, cadena de custodia y portal cliente.'),
      card('Control de calidad del agua', 'Programas de control, muestras, trazabilidad e informes.'),
      card('Análisis de agua municipal', 'Redes, depósitos, puntos de muestreo y salud pública.'),
      card('Alimentación y bebidas', 'Agua como ingrediente, proceso, CIP, lote y auditoría.'),
      card('Agua de proceso industrial', 'Captación, tratamiento, recirculación, efluente y control.'),
      card('Gestión de riesgo en instalaciones', 'ACS, depósitos, puntos terminales, aerosolización y multi-sede.'),
      card('Agricultura', 'Riego, agua regenerada, fertirrigación y packhouse.'),
      card('Farmacéutica y cosmética', 'Agua crítica, WFI cuando aplique, QC, QA, lotes, desviaciones y CAPA.'),
      card('Hostelería, turismo y ocio', 'Hoteles, spas, piscinas, campings, cocinas y reaperturas.')
    ],
    formsTitle: 'Envíe la solicitud a la ruta AquaVerify adecuada',
    formsBody: 'Ambos formularios continúan en AquaVerify Cloud para que el equipo reciba país, sector y contexto desde la web corporativa.',
    forms: {
      buyer: {
        title: 'Solicitar contacto con un distribuidor',
        body: 'Indique país, sector y necesidad para dirigir la solicitud al partner autorizado o al equipo AquaVerify correspondiente.',
        submit: 'Enviar solicitud de distribuidor',
        fields: { name: 'Nombre y empresa', email: 'Email profesional', country: 'País o territorio', sector: 'Sector principal', message: 'Necesidad o volumen estimado' }
      },
      partner: {
        title: 'Solicitar evaluación como distribuidor',
        body: 'Explique territorio, tipo de empresa, cartera y capacidades para iniciar la revisión de encaje.',
        submit: 'Enviar candidatura de partner',
        fields: { name: 'Nombre y empresa', email: 'Email profesional', country: 'País o territorio', companyType: 'Tipo de empresa', portfolio: 'Cartera actual o especialización' }
      }
    },
    faqEyebrow: 'FAQ',
    faqTitle: 'Dudas comunes sobre distribuidores AquaVerify',
    cta: {
      title: 'Encuentre soporte local o abra una nueva oportunidad de distribución',
      body: 'AquaVerify puede dirigir solicitudes de clientes, evaluar nuevos partners y conectar conversaciones de producto, plataforma y OEM desde una misma ruta.',
      primary: 'Solicitar contacto local',
      secondary: 'Solicitar evaluación de partner'
    },
    faqs: [
      { question: '¿Cómo encuentro un distribuidor autorizado AquaVerify?', answer: 'Seleccione su país o envíe una solicitud con país, sector y necesidad. AquaVerify dirigirá la consulta al distribuidor autorizado, reseller regional o equipo interno más adecuado.' },
      { question: '¿Qué ocurre si no hay distribuidor activo en mi país?', answer: 'AquaVerify puede evaluar suministro directo, soporte regional o una nueva oportunidad de distribución en ese territorio.' },
      { question: '¿Qué empresas pueden convertirse en distribuidoras?', answer: 'Laboratorios, empresas de tratamiento de agua, distribuidores científicos, integradores, consultoras técnicas, proveedores de calidad, utilities partners y compañías con canal B2B especializado.' },
      { question: '¿Los distribuidores pueden trabajar con OEM o marca blanca?', answer: 'Sí, AquaVerify puede evaluar modelos OEM, marca blanca o co-branding según territorio, volumen, cartera de clientes, soporte técnico y restricciones de mercado.' },
      { question: '¿La oferta para partners incluye la plataforma digital?', answer: 'Los programas de partner pueden incluir flujos de plataforma para trazabilidad, reporting, comunicación con cliente y seguimiento comercial según el alcance acordado.' },
      { question: '¿Cómo se mantiene la calidad técnica en la red?', answer: 'AquaVerify prioriza partners con capacidad de formación, documentación, soporte y comunicación técnica. Los casos complejos pueden escalarse al equipo AquaVerify.' }
    ]
  },
  fr: {
    path: '/fr/distributeurs',
    title: 'Achetez AquaVerify avec support local ou devenez distributeur autorisé',
    description: 'AquaVerify relie les produits de microbiologie de l’eau, la traçabilité digitale, les rapports techniques et les programmes OEM à des partenaires capables d’accompagner laboratoires, industries, collectivités, installations et équipes qualité sur leur marché.',
    eyebrow: 'Réseau AquaVerify',
    primaryCta: 'Demander un contact local',
    secondaryCta: 'Demander une évaluation partenaire',
    seoTitle: 'Distributeurs AquaVerify | Réseau mondial, support local et partenaires autorisés',
    seoDescription: 'Trouvez un distributeur autorisé AquaVerify ou demandez à devenir partenaire pour les produits de microbiologie de l’eau, la traçabilité digitale, les rapports techniques et les opportunités OEM.',
    heroPanelTitle: 'Deux parcours, un même réseau',
    metrics: ['Route d’approvisionnement locale', 'Évaluation technique partenaire', 'Portfolio produit + plateforme'],
    cycle: [
      card('Pays', 'Marché, langue, disponibilité et contexte support.'),
      card('Besoin', 'Produit, plateforme, OEM ou opportunité de distribution.'),
      card('Routage', 'AquaVerify affecte le bon partenaire ou la bonne équipe interne.'),
      card('Activation', 'Formation, documentation, devis et suivi.')
    ],
    trustCards: [
      card('Accès local', 'Une route plus claire vers approvisionnement, onboarding et réponse technique.'),
      card('Standard global', 'Un même cadre AquaVerify pour produits, plateforme et documentation.'),
      card('Canal partenaire', 'Un programme structuré pour distributeurs, resellers et modèles OEM.'),
      card('Guide sectoriel', 'Pages et ressources pour soutenir les conversations commerciales par vertical.')
    ],
    pathsTitle: 'Une page pour deux besoins distincts',
    pathsBody: 'Commencez par le parcours qui correspond le mieux à votre objectif. Les deux voies vous orientent vers la bonne équipe AquaVerify.',
    buyerPath: {
      title: 'Je dois acheter ou déployer AquaVerify',
      body: 'Trouvez la bonne route locale pour acheter les produits, coordonner la formation, vérifier la disponibilité et recevoir un support technique dans votre pays.',
      bullets: ['Sélectionner pays et secteur', 'Indiquer produit, volume ou cas d’usage', 'Recevoir une réponse du partenaire ou d’AquaVerify'],
      cta: 'Demander un contact local'
    },
    partnerPath: {
      title: 'Je veux distribuer AquaVerify',
      body: 'Demandez une évaluation comme distributeur, reseller technique, partenaire régional, intégrateur ou option OEM/marque blanche.',
      bullets: ['Indiquer territoire et couverture', 'Décrire portefeuille, clients et capacités techniques', 'AquaVerify évalue l’adéquation, l’exclusivité et le plan d’activation'],
      cta: 'Demander une évaluation partenaire'
    },
    authorizedEyebrow: 'Distributeurs autorisés',
    authorizedTitle: 'Distributeurs autorisés',
    authorizedBody: 'Trouvez un partenaire AquaVerify autorisé près de vous pour support local, stock, formation et continuité technique.',
    mapTitle: 'Carte interactive des distributeurs',
    mapBody: 'Recherchez par pays ou région et envoyez une demande structurée vers la bonne route AquaVerify.',
    mapNetworkTitle: 'Réseau mondial de partenaires',
    mapTags: ['Distributeur', 'Reseller', 'OEM', 'Support'],
    searchTitle: 'Rechercher par pays',
    searchBody: 'S’il n’y a pas de distributeur actif, AquaVerify peut évaluer approvisionnement direct, support régional ou nouvelle opportunité partenaire.',
    searchPlaceholder: 'Pays ou territoire',
    searchEmptyTitle: 'Sélectionnez un pays',
    searchEmptyBody: 'Choisissez un marché pour lancer le routage.',
    searchResultTitle: 'Route disponible pour examen',
    searchResultBody: 'Envoyez la demande et AquaVerify l’orientera vers le partenaire, reseller ou équipe interne adaptée.',
    processEyebrow: 'Fonctionnement',
    processTitle: 'De la demande au support local',
    processBody: 'Le flux évite les recherches dispersées et oriente chaque demande vers le bon canal.',
    processSteps: [
      card('Indiquer pays et besoin', 'Le formulaire identifie territoire, secteur, volume, produits et urgence.'),
      card('Affectation de la route', 'AquaVerify valide si le cas relève d’un partenaire local, support direct, reseller régional ou nouvelle opportunité distributeur.'),
      card('Contact et proposition', 'Le client ou candidat reçoit une réponse orientée cas d’usage, disponibilité, formation et documentation.'),
      card('Activation et suivi', 'La mise en œuvre peut inclure onboarding, matériel technique, reporting, coordination laboratoire et support après-vente.')
    ],
    buyerEyebrow: 'Pour clients',
    buyerTitle: 'Acheter avec support local sans perdre le standard global',
    buyerBody: 'Les acheteurs ont besoin de disponibilité, de réponse technique et de confiance documentaire. Le réseau de distributeurs facilite l’accès local tout en conservant le cadre AquaVerify.',
    buyerCards: [
      card('Approvisionnement et disponibilité', 'Coordination commerciale, stock local lorsque pertinent, délais et alternatives d’approvisionnement.'),
      card('Support technique', 'Accompagnement pour sélection produit, flux d’échantillons, consommables, plateforme et rapports.'),
      card('Formation et onboarding', 'Sessions pour équipes laboratoire, qualité, opérations, ventes techniques ou support externe.'),
      card('Escalade AquaVerify', 'Lorsque le cas exige un avis spécialisé, le partenaire peut l’escalader à AquaVerify.'),
      card('Documentation', 'Matériel technique, guides d’utilisation, preuves, reporting et support pour audit ou client final.'),
      card('Couverture sectorielle', 'Application en laboratoires, utilities, agroalimentaire, industrie, installations, agriculture, pharma et hospitality.')
    ],
    partnerEyebrow: 'Pour distributeurs',
    partnerTitle: 'Un portefeuille différenciant pour vendre des solutions d’eau critique avec support technique',
    partnerBody: 'AquaVerify recherche des partenaires avec présence commerciale, capacité technique et accès à des clients dépendant de contrôles d’eau traçables.',
    partnerModels: [
      card('Distributeur autorisé', 'Canal commercial pour vendre les produits AquaVerify et coordonner le support local.'),
      card('Reseller technique', 'Entreprise scientifique, laboratoire, traitement de l’eau ou instrumentation ajoutant AquaVerify à son offre.'),
      card('Partenaire régional', 'Couverture de plusieurs pays, réseau commercial établi et capacité de formation.'),
      card('OEM ou marque blanche', 'Modèle évaluable pour entreprises avec portefeuille propre, clients finaux et besoins d’intégration.')
    ],
    candidateTitle: 'Ce qu’AquaVerify évalue chez un candidat',
    candidateBullets: ['Couverture territoriale et portefeuille clients compatibles.', 'Capacité de support technique, formation et suivi.', 'Expérience en eau, laboratoire, qualité, traitement, industrie ou canal scientifique.', 'Engagement sur traçabilité, documentation et communication transparente.', 'Plan commercial réaliste pour activer les opportunités par secteur.', 'Capacité à coordonner les demandes complexes avec AquaVerify.'],
    programEyebrow: 'Programme partenaire',
    programTitle: 'Ce qu’AquaVerify peut apporter au canal',
    programBody: 'Le programme peut s’adapter au territoire, type de partenaire, volume, secteur et maturité technique.',
    programCards: [
      card('Portefeuille produits', 'Solutions de microbiologie de l’eau, modules digitaux, rapports techniques et flux sectoriels.'),
      card('Matériel commercial', 'Argumentaires, cas d’usage, messages par secteur et ressources pour expliquer la valeur aux clients.'),
      card('Formation technique', 'Onboarding pour équipes commerciales, techniques et support selon produits et cas d’usage.'),
      card('Routage des leads', 'Orientation d’opportunités lorsque territoire, langue ou support local requièrent un partenaire.'),
      card('OEM et marque blanche', 'Évaluation de modèles d’intégration, distribution en marque propre ou co-branding.'),
      card('Escalade experte', 'Accès à AquaVerify pour questions techniques, mise en œuvre et documentation.')
    ],
    sectorsEyebrow: 'Secteurs connectés',
    sectorsTitle: 'Un réseau pour les marchés qui dépendent de l’eau',
    sectorsBody: 'Chaque secteur dispose d’une page dédiée avec défis, flux et solutions adaptées. Les distributeurs peuvent utiliser ces pages comme guide commercial par vertical.',
    sectorCta: 'Ouvrir la page secteur',
    sectors: [
      card('Laboratoires d’analyse de l’eau', 'TAT, CoA, chaîne de garde et portail client.'),
      card('Contrôle qualité de l’eau', 'Programmes de contrôle, échantillons, traçabilité et rapports.'),
      card('Analyse de l’eau municipale', 'Réseaux, réservoirs, points d’échantillonnage et santé publique.'),
      card('Agroalimentaire et boissons', 'Eau ingrédient, process, CIP, lot et audit.'),
      card('Eau de process industriel', 'Captage, traitement, recirculation, effluent et contrôle.'),
      card('Gestion du risque eau en installations', 'ECS, réservoirs, points terminaux, aérosolisation et multi-sites.'),
      card('Agriculture', 'Irrigation, eau réutilisée, fertigation et station de conditionnement.'),
      card('Industrie pharmaceutique et cosmétique', 'Eau critique, WFI lorsque pertinent, QC, QA, lots, déviations et CAPA.'),
      card('Hôtellerie, tourisme et loisirs', 'Hôtels, spas, piscines, campings, cuisines et réouvertures.')
    ],
    formsTitle: 'Envoyer la demande vers la bonne route AquaVerify',
    formsBody: 'Les deux formulaires continuent dans AquaVerify Cloud afin que l’équipe reçoive pays, secteur et contexte depuis le site corporate.',
    forms: {
      buyer: {
        title: 'Demander un contact avec un distributeur',
        body: 'Indiquez pays, secteur et besoin pour orienter la demande vers le partenaire autorisé ou l’équipe AquaVerify correspondante.',
        submit: 'Envoyer la demande distributeur',
        fields: { name: 'Nom et entreprise', email: 'Email professionnel', country: 'Pays ou territoire', sector: 'Secteur principal', message: 'Besoin ou volume estimé' }
      },
      partner: {
        title: 'Demander une évaluation comme distributeur',
        body: 'Expliquez territoire, type d’entreprise, portefeuille et capacités pour lancer l’examen d’adéquation.',
        submit: 'Envoyer la candidature partenaire',
        fields: { name: 'Nom et entreprise', email: 'Email professionnel', country: 'Pays ou territoire', companyType: 'Type d’entreprise', portfolio: 'Portefeuille actuel ou spécialisation' }
      }
    },
    faqEyebrow: 'FAQ',
    faqTitle: 'Questions fréquentes sur les distributeurs AquaVerify',
    cta: {
      title: 'Trouvez un support local ou ouvrez une nouvelle opportunité de distribution',
      body: 'AquaVerify peut orienter les demandes clients, évaluer de nouveaux partenaires et connecter conversations produit, plateforme et OEM depuis une même route.',
      primary: 'Demander un contact local',
      secondary: 'Demander une évaluation partenaire'
    },
    faqs: [
      { question: 'Comment trouver un distributeur autorisé AquaVerify ?', answer: 'Sélectionnez votre pays ou envoyez une demande avec pays, secteur et besoin. AquaVerify orientera la demande vers le distributeur autorisé, reseller régional ou équipe interne le plus adapté.' },
      { question: 'Que se passe-t-il s’il n’y a pas de distributeur actif dans mon pays ?', answer: 'AquaVerify peut évaluer un approvisionnement direct, un support régional ou une nouvelle opportunité de distribution dans ce territoire.' },
      { question: 'Quelles entreprises peuvent devenir distributrices ?', answer: 'Laboratoires, sociétés de traitement de l’eau, distributeurs scientifiques, intégrateurs, consultants techniques, fournisseurs qualité, partenaires utilities et entreprises avec canal B2B spécialisé.' },
      { question: 'Les distributeurs peuvent-ils travailler en OEM ou marque blanche ?', answer: 'Oui. AquaVerify peut évaluer des modèles OEM, marque blanche ou co-branding selon territoire, volume, portefeuille clients, support technique et contraintes marché.' },
      { question: 'L’offre partenaire inclut-elle la plateforme digitale ?', answer: 'Les programmes partenaires peuvent inclure des flux de plateforme pour traçabilité, reporting, communication client et suivi commercial selon le périmètre convenu.' },
      { question: 'Comment la qualité technique est-elle maintenue dans le réseau ?', answer: 'AquaVerify privilégie les partenaires avec capacités de formation, documentation, support et communication technique. Les cas complexes peuvent être escaladés à AquaVerify.' }
    ]
  },
  it: {
    path: '/it/distributori',
    title: 'Acquista AquaVerify con supporto locale o diventa distributore autorizzato',
    description: 'AquaVerify collega prodotti di microbiologia dell’acqua, tracciabilità digitale, report tecnici e programmi OEM con partner in grado di supportare laboratori, industrie, municipalità, strutture e team qualità nel loro mercato.',
    eyebrow: 'Rete AquaVerify',
    primaryCta: 'Richiedi contatto locale',
    secondaryCta: 'Richiedi valutazione partner',
    seoTitle: 'Distributori AquaVerify | Rete globale, supporto locale e partner autorizzati',
    seoDescription: 'Trova un distributore autorizzato AquaVerify o richiedi di diventare partner per prodotti di microbiologia dell’acqua, tracciabilità digitale, report tecnici e opportunità OEM.',
    heroPanelTitle: 'Due percorsi, una rete',
    metrics: ['Rotta di fornitura locale', 'Valutazione tecnica partner', 'Portfolio prodotto + piattaforma'],
    cycle: [
      card('Paese', 'Mercato, lingua, disponibilità e contesto di supporto.'),
      card('Esigenza', 'Prodotto, piattaforma, OEM o opportunità di distribuzione.'),
      card('Routing', 'AquaVerify assegna il partner o team interno corretto.'),
      card('Attivazione', 'Formazione, documentazione, preventivo e follow-up.')
    ],
    trustCards: [
      card('Accesso locale', 'Una rotta più chiara verso fornitura, onboarding e risposta tecnica.'),
      card('Standard globale', 'Un unico framework AquaVerify per prodotti, piattaforma e documentazione.'),
      card('Canale partner', 'Un programma strutturato per distributori, reseller e modelli OEM.'),
      card('Guida settoriale', 'Pagine e risorse per supportare conversazioni commerciali verticali.')
    ],
    pathsTitle: 'Una pagina per due esigenze diverse',
    pathsBody: 'Inizia dal percorso che descrive meglio il tuo obiettivo. Entrambe le vie ti collegano al team AquaVerify corretto.',
    buyerPath: {
      title: 'Devo acquistare o implementare AquaVerify',
      body: 'Trova la rotta locale più adatta per acquistare prodotti, coordinare formazione, verificare disponibilità e ricevere supporto tecnico nel tuo paese.',
      bullets: ['Seleziona paese e settore', 'Indica prodotto, volume o caso d’uso', 'Ricevi risposta dal partner o da AquaVerify'],
      cta: 'Richiedi contatto locale'
    },
    partnerPath: {
      title: 'Voglio distribuire AquaVerify',
      body: 'Richiedi valutazione come distributore, reseller tecnico, partner regionale, integratore o opzione OEM/private label.',
      bullets: ['Indica territorio e copertura', 'Descrivi portafoglio, clienti e capacità tecniche', 'AquaVerify valuta fit, esclusività e piano di attivazione'],
      cta: 'Richiedi valutazione partner'
    },
    authorizedEyebrow: 'Distributori autorizzati',
    authorizedTitle: 'Distributori autorizzati',
    authorizedBody: 'Trova un partner autorizzato AquaVerify vicino a te per supporto locale, inventario, formazione e continuità tecnica.',
    mapTitle: 'Mappa interattiva dei distributori',
    mapBody: 'Cerca per paese o regione e invia una richiesta strutturata alla rotta AquaVerify corretta.',
    mapNetworkTitle: 'Rete globale di partner',
    mapTags: ['Distributore', 'Reseller', 'OEM', 'Supporto'],
    searchTitle: 'Cerca per paese',
    searchBody: 'Se non c’è distributore attivo, AquaVerify può valutare fornitura diretta, supporto regionale o nuova opportunità partner.',
    searchPlaceholder: 'Paese o territorio',
    searchEmptyTitle: 'Seleziona un paese',
    searchEmptyBody: 'Scegli un mercato per avviare il routing.',
    searchResultTitle: 'Rotta disponibile per revisione',
    searchResultBody: 'Invia la richiesta e AquaVerify la indirizzerà al partner, reseller o team interno più adatto.',
    processEyebrow: 'Come funziona',
    processTitle: 'Dalla richiesta al supporto locale',
    processBody: 'Il flusso evita ricerche disperse e indirizza ogni richiesta al canale corretto.',
    processSteps: [
      card('Indica paese ed esigenza', 'Il modulo identifica territorio, settore, volume, prodotti e urgenza.'),
      card('Assegnazione percorso', 'AquaVerify valida se il caso richiede partner locale, supporto diretto, reseller regionale o nuova opportunità distributore.'),
      card('Contatto e proposta', 'Cliente o candidato riceve una risposta orientata a caso d’uso, disponibilità, formazione e documentazione.'),
      card('Attivazione e follow-up', 'L’implementazione può includere onboarding, materiale tecnico, reporting, coordinamento con laboratorio e supporto post-vendita.')
    ],
    buyerEyebrow: 'Per clienti',
    buyerTitle: 'Acquista con supporto locale senza perdere lo standard globale',
    buyerBody: 'Gli acquirenti hanno bisogno di disponibilità, risposta tecnica e fiducia documentale. La rete di distributori facilita l’accesso locale mantenendo il framework AquaVerify.',
    buyerCards: [
      card('Fornitura e disponibilità', 'Coordinamento commerciale, stock locale quando applicabile, tempi e alternative di fornitura.'),
      card('Supporto tecnico', 'Guida per selezione prodotto, flusso campioni, consumabili, piattaforma e report.'),
      card('Formazione e onboarding', 'Sessioni per team laboratorio, qualità, operation, vendite tecniche o supporto esterno.'),
      card('Escalation AquaVerify', 'Quando il caso richiede criterio specialistico, il partner può escalarlo ad AquaVerify.'),
      card('Documentazione', 'Materiale tecnico, guide d’uso, evidenze, reporting e supporto per audit o cliente finale.'),
      card('Copertura settoriale', 'Applicazione in laboratori, utilities, alimentare e bevande, industria, strutture, agricoltura, pharma e hospitality.')
    ],
    partnerEyebrow: 'Per distributori',
    partnerTitle: 'Un portafoglio differenziante per vendere acqua critica con supporto tecnico',
    partnerBody: 'AquaVerify cerca partner con presenza commerciale, capacità tecnica e accesso a clienti che dipendono da controlli acqua tracciabili.',
    partnerModels: [
      card('Distributore autorizzato', 'Canale commerciale per vendere prodotti AquaVerify e coordinare supporto locale.'),
      card('Reseller tecnico', 'Azienda scientifica, laboratorio, trattamento acqua o strumentazione che aggiunge AquaVerify alla propria offerta.'),
      card('Partner regionale', 'Copertura multi-paese, rete commerciale consolidata e capacità formativa.'),
      card('OEM o private label', 'Modello valutabile per aziende con portafoglio proprio, clienti finali e necessità di integrazione.')
    ],
    candidateTitle: 'Cosa valuta AquaVerify in un candidato',
    candidateBullets: ['Copertura territoriale e portafoglio clienti compatibili.', 'Capacità di supporto tecnico, formazione e follow-up.', 'Esperienza in acqua, laboratorio, qualità, trattamento, industria o canale scientifico.', 'Impegno verso tracciabilità, documentazione e comunicazione trasparente.', 'Piano commerciale realistico per attivare opportunità per settore.', 'Capacità di coordinare richieste complesse con AquaVerify.'],
    programEyebrow: 'Programma partner',
    programTitle: 'Cosa può portare AquaVerify al canale',
    programBody: 'Il programma può adattarsi a territorio, tipo di partner, volume, settore e maturità tecnica.',
    programCards: [
      card('Portfolio prodotti', 'Soluzioni di microbiologia dell’acqua, moduli digitali, report tecnici e workflow settoriali.'),
      card('Materiale commerciale', 'Argomentari, casi d’uso, messaggi per settore e risorse per spiegare valore ai clienti.'),
      card('Formazione tecnica', 'Onboarding per team commerciali, tecnici e supporto secondo prodotti e casi d’uso.'),
      card('Lead routing', 'Derivazione opportunità quando territorio, lingua o supporto locale richiedono partner.'),
      card('OEM e private label', 'Valutazione di modelli di integrazione, distribuzione con marca propria o co-branding.'),
      card('Escalation esperta', 'Accesso ad AquaVerify per domande tecniche, implementazione e documentazione.')
    ],
    sectorsEyebrow: 'Settori collegati',
    sectorsTitle: 'Una rete per mercati che dipendono dall’acqua',
    sectorsBody: 'Ogni settore ha una pagina dedicata con sfide, flussi e soluzioni adattate. I distributori possono usare queste pagine come guida commerciale verticale.',
    sectorCta: 'Apri pagina settore',
    sectors: [
      card('Laboratori di analisi dell’acqua', 'TAT, CoA, catena di custodia e portale cliente.'),
      card('Controllo qualità dell’acqua', 'Programmi di controllo, campioni, tracciabilità e report.'),
      card('Analisi acqua municipale', 'Reti, serbatoi, punti di campionamento e salute pubblica.'),
      card('Alimentare e bevande', 'Acqua come ingrediente, processo, CIP, lotto e audit.'),
      card('Acqua di processo industriale', 'Captazione, trattamento, ricircolo, effluente e controllo.'),
      card('Gestione rischio acqua in strutture', 'ACS, serbatoi, punti terminali, aerosolizzazione e multi-sede.'),
      card('Agricoltura', 'Irrigazione, acqua rigenerata, fertirrigazione e packhouse.'),
      card('Industria farmaceutica e cosmetica', 'Acqua critica, WFI quando applicabile, QC, QA, lotti, deviazioni e CAPA.'),
      card('Hospitality, turismo e tempo libero', 'Hotel, spa, piscine, campeggi, cucine e riaperture.')
    ],
    formsTitle: 'Invia la richiesta alla rotta AquaVerify corretta',
    formsBody: 'Entrambi i moduli continuano in AquaVerify Cloud affinché il team riceva paese, settore e contesto dal sito corporate.',
    forms: {
      buyer: {
        title: 'Richiedi contatto con un distributore',
        body: 'Indica paese, settore ed esigenza per indirizzare la richiesta al partner autorizzato o al team AquaVerify corretto.',
        submit: 'Invia richiesta distributore',
        fields: { name: 'Nome e azienda', email: 'Email professionale', country: 'Paese o territorio', sector: 'Settore principale', message: 'Esigenza o volume stimato' }
      },
      partner: {
        title: 'Richiedi valutazione come distributore',
        body: 'Spiega territorio, tipo di azienda, portafoglio e capacità per avviare la revisione del fit.',
        submit: 'Invia candidatura partner',
        fields: { name: 'Nome e azienda', email: 'Email professionale', country: 'Paese o territorio', companyType: 'Tipo di azienda', portfolio: 'Portafoglio attuale o specializzazione' }
      }
    },
    faqEyebrow: 'FAQ',
    faqTitle: 'Domande frequenti sui distributori AquaVerify',
    cta: {
      title: 'Trova supporto locale o apri una nuova opportunità di distribuzione',
      body: 'AquaVerify può indirizzare richieste cliente, valutare nuovi partner e collegare conversazioni prodotto, piattaforma e OEM da una sola rotta.',
      primary: 'Richiedi contatto locale',
      secondary: 'Richiedi valutazione partner'
    },
    faqs: [
      { question: 'Come trovo un distributore autorizzato AquaVerify?', answer: 'Seleziona il tuo paese o invia una richiesta con paese, settore ed esigenza. AquaVerify indirizzerà la richiesta al distributore autorizzato, reseller regionale o team interno più adatto.' },
      { question: 'Cosa succede se non c’è un distributore attivo nel mio paese?', answer: 'AquaVerify può valutare fornitura diretta, supporto regionale o una nuova opportunità di distribuzione in quel territorio.' },
      { question: 'Quali aziende possono diventare distributori?', answer: 'Laboratori, aziende di trattamento acqua, distributori scientifici, integratori, consulenti tecnici, fornitori qualità, partner utilities e aziende con canale B2B specializzato.' },
      { question: 'I distributori possono lavorare con OEM o private label?', answer: 'Sì. AquaVerify può valutare modelli OEM, private label o co-branding secondo territorio, volume, portafoglio clienti, supporto tecnico e vincoli di mercato.' },
      { question: 'L’offerta partner include la piattaforma digitale?', answer: 'I programmi partner possono includere workflow di piattaforma per tracciabilità, reporting, comunicazione cliente e follow-up commerciale secondo l’ambito concordato.' },
      { question: 'Come si mantiene la qualità tecnica nella rete?', answer: 'AquaVerify privilegia partner con capacità di formazione, documentazione, supporto e comunicazione tecnica. I casi complessi possono essere escalati ad AquaVerify.' }
    ]
  },
  ca: {
    path: '/ca/distribuidors',
    title: 'Compreu AquaVerify amb suport local o convertiu-vos en distribuïdor autoritzat',
    description: 'AquaVerify connecta productes de microbiologia de l’aigua, traçabilitat digital, informes tècnics i programes OEM amb partners capaços d’atendre laboratoris, indústries, municipis, instal·lacions i equips de qualitat al seu mercat.',
    eyebrow: 'Xarxa AquaVerify',
    primaryCta: 'Sol·licitar contacte local',
    secondaryCta: 'Sol·licitar avaluació de partner',
    seoTitle: 'Distribuïdors AquaVerify | Xarxa global, suport local i partners autoritzats',
    seoDescription: 'Trobeu un distribuïdor autoritzat AquaVerify o sol·liciteu convertir-vos en partner per a productes de microbiologia de l’aigua, traçabilitat digital, informes tècnics i oportunitats OEM.',
    heroPanelTitle: 'Dos recorreguts, una mateixa xarxa',
    metrics: ['Ruta de subministrament local', 'Avaluació tècnica de partner', 'Portfolio producte + plataforma'],
    cycle: [
      card('País', 'Mercat, idioma, disponibilitat i context de suport.'),
      card('Necessitat', 'Producte, plataforma, OEM o oportunitat de distribució.'),
      card('Routing', 'AquaVerify assigna el partner o equip intern adequat.'),
      card('Activació', 'Formació, documentació, cotització i seguiment.')
    ],
    trustCards: [
      card('Accés local', 'Una ruta més clara cap a subministrament, onboarding i resposta tècnica.'),
      card('Estàndard global', 'Un mateix criteri AquaVerify per a productes, plataforma i documentació.'),
      card('Canal partner', 'Un programa estructurat per a distribuïdors, resellers i models OEM.'),
      card('Guia sectorial', 'Pàgines i recursos per donar suport a converses comercials per vertical.')
    ],
    pathsTitle: 'Una pàgina per a dues necessitats diferents',
    pathsBody: 'Comenceu pel recorregut que millor descriu el vostre objectiu. Ambdues vies connecten amb l’equip AquaVerify adequat.',
    buyerPath: {
      title: 'Necessito comprar o implementar AquaVerify',
      body: 'Trobeu la ruta local més adequada per adquirir productes, coordinar formació, validar disponibilitat i rebre suport tècnic al vostre país.',
      bullets: ['Seleccioneu país i sector', 'Indiqueu producte, volum o cas d’ús', 'Rebeu resposta del partner o d’AquaVerify'],
      cta: 'Sol·licitar contacte local'
    },
    partnerPath: {
      title: 'Vull distribuir AquaVerify',
      body: 'Sol·liciteu avaluació com a distribuïdor, reseller tècnic, partner regional, integrador o opció OEM/marca blanca.',
      bullets: ['Indiqueu territori i cobertura', 'Expliqueu cartera, clients i capacitats tècniques', 'AquaVerify avalua encaix, exclusivitat i pla d’activació'],
      cta: 'Sol·licitar avaluació de partner'
    },
    authorizedEyebrow: 'Distribuïdors autoritzats',
    authorizedTitle: 'Distribuïdors autoritzats',
    authorizedBody: 'Trobeu un partner autoritzat d’AquaVerify a prop vostre per a suport local, inventari, capacitació i continuïtat tècnica.',
    mapTitle: 'Mapa interactiu de distribuïdors',
    mapBody: 'Busqueu per país o regió i envieu una sol·licitud estructurada a la ruta AquaVerify correcta.',
    mapNetworkTitle: 'Xarxa global de socis',
    mapTags: ['Distribuïdor', 'Reseller', 'OEM', 'Suport'],
    searchTitle: 'Buscar per país',
    searchBody: 'Si no hi ha distribuïdor actiu, AquaVerify pot avaluar subministrament directe, suport regional o una nova oportunitat de partner.',
    searchPlaceholder: 'País o territori',
    searchEmptyTitle: 'Seleccioneu un país',
    searchEmptyBody: 'Trieu un mercat per iniciar la ruta d’assignació.',
    searchResultTitle: 'Ruta disponible per a revisió',
    searchResultBody: 'Envieu la sol·licitud i AquaVerify la dirigirà al partner, reseller o equip intern adequat.',
    processEyebrow: 'Com funciona',
    processTitle: 'De la consulta al suport local',
    processBody: 'El flux està pensat per evitar cerques disperses i dirigir cada sol·licitud al canal adequat.',
    processSteps: [
      card('Indiqueu país i necessitat', 'El formulari identifica territori, sector, volum, productes i urgència.'),
      card('Assignació de ruta', 'AquaVerify valida si correspon partner local, suport directe, reseller regional o oportunitat de nou distribuïdor.'),
      card('Contacte i proposta', 'El client o candidat rep una resposta orientada al cas d’ús, disponibilitat, formació i documentació.'),
      card('Activació i seguiment', 'La implementació pot incloure onboarding, material tècnic, reporting, coordinació amb laboratori i suport postvenda.')
    ],
    buyerEyebrow: 'Per a clients',
    buyerTitle: 'Compreu amb suport local sense perdre l’estàndard global',
    buyerBody: 'Els compradors necessiten disponibilitat, resposta tècnica i confiança documental. La xarxa de distribuïdors facilita l’accés local mantenint el criteri AquaVerify.',
    buyerCards: [
      card('Subministrament i disponibilitat', 'Coordinació comercial, inventari local quan pertoqui, terminis i alternatives de subministrament.'),
      card('Suport tècnic', 'Acompanyament per a selecció de producte, flux de mostres, consumibles, plataforma i informes.'),
      card('Formació i onboarding', 'Sessions per a equips de laboratori, qualitat, operacions, vendes tècniques o suport extern.'),
      card('Escalació AquaVerify', 'Quan el cas requereix criteri especialitzat, el partner pot escalar-lo a AquaVerify.'),
      card('Documentació', 'Material tècnic, guies d’ús, evidències, reporting i suport per a auditoria o client final.'),
      card('Cobertura sectorial', 'Aplicació en laboratoris, utilities, alimentació, indústria, instal·lacions, agricultura, pharma i hospitality.')
    ],
    partnerEyebrow: 'Per a distribuïdors',
    partnerTitle: 'Un portfolio diferencial per vendre aigua crítica amb suport tècnic',
    partnerBody: 'AquaVerify busca partners amb presència comercial, capacitat tècnica i accés a clients que depenen de controls d’aigua traçables.',
    partnerModels: [
      card('Distribuïdor autoritzat', 'Canal comercial per vendre productes AquaVerify i coordinar suport local.'),
      card('Reseller tècnic', 'Empresa científica, laboratori, tractament d’aigua o instrumentació que afegeix AquaVerify a la seva oferta.'),
      card('Partner regional', 'Cobertura de diversos països, xarxa comercial consolidada i capacitat de formació.'),
      card('OEM o marca blanca', 'Model avaluable per a empreses amb cartera pròpia, clients finals i necessitats d’integració.')
    ],
    candidateTitle: 'Què avalua AquaVerify en un candidat',
    candidateBullets: ['Cobertura territorial i cartera de clients compatible.', 'Capacitat per a suport tècnic, formació i seguiment.', 'Experiència en aigua, laboratori, qualitat, tractament, indústria o canal científic.', 'Compromís amb traçabilitat, documentació i comunicació transparent.', 'Pla comercial realista per activar oportunitats per sector.', 'Capacitat per coordinar consultes complexes amb AquaVerify.'],
    programEyebrow: 'Programa partner',
    programTitle: 'Què pot aportar AquaVerify al canal',
    programBody: 'El programa pot adaptar-se segons territori, tipus de partner, volum, sector i maduresa tècnica.',
    programCards: [
      card('Portfolio de productes', 'Solucions de microbiologia de l’aigua, mòduls digitals, informes tècnics i fluxos sectorials.'),
      card('Material comercial', 'Argumentaris, casos d’ús, missatges per sector i recursos per explicar valor a clients.'),
      card('Formació tècnica', 'Onboarding per a equips comercials, tècnics i de suport segons productes i casos d’ús.'),
      card('Lead routing', 'Derivació d’oportunitats quan territori, idioma o suport local requereixen partner.'),
      card('OEM i marca blanca', 'Avaluació de models d’integració, distribució amb marca pròpia o co-branding.'),
      card('Escalat expert', 'Accés a l’equip AquaVerify per a consultes tècniques, implementació i documentació.')
    ],
    sectorsEyebrow: 'Sectors connectats',
    sectorsTitle: 'Una xarxa per a mercats que depenen de l’aigua',
    sectorsBody: 'Cada sector té una pàgina específica amb reptes, fluxos i solucions adaptades. Els distribuïdors poden usar aquestes pàgines com a guia comercial per vertical.',
    sectorCta: 'Obrir pàgina sectorial',
    sectors: [
      card('Laboratoris d’anàlisi d’aigua', 'TAT, CoA, cadena de custòdia i portal client.'),
      card('Control de qualitat de l’aigua', 'Programes de control, mostres, traçabilitat i informes.'),
      card('Anàlisi d’aigua municipal', 'Xarxes, dipòsits, punts de mostreig i salut pública.'),
      card('Alimentació i begudes', 'Aigua com a ingredient, procés, CIP, lot i auditoria.'),
      card('Aigua de procés industrial', 'Captació, tractament, recirculació, efluent i control.'),
      card('Gestió del risc de l’aigua en instal·lacions', 'ACS, dipòsits, punts terminals, aerosolització i multi-sede.'),
      card('Agricultura', 'Reg, aigua regenerada, fertirrigació i packhouse.'),
      card('Indústria farmacèutica i cosmètica', 'Aigua crítica, WFI quan pertoqui, QC, QA, lots, desviacions i CAPA.'),
      card('Hostaleria, turisme i oci', 'Hotels, spas, piscines, càmpings, cuines i reobertures.')
    ],
    formsTitle: 'Envieu la sol·licitud a la ruta AquaVerify adequada',
    formsBody: 'Ambdós formularis continuen a AquaVerify Cloud perquè l’equip rebi país, sector i context des de la web corporativa.',
    forms: {
      buyer: {
        title: 'Sol·licitar contacte amb un distribuïdor',
        body: 'Indiqueu país, sector i necessitat per dirigir la sol·licitud al partner autoritzat o a l’equip AquaVerify corresponent.',
        submit: 'Enviar sol·licitud de distribuïdor',
        fields: { name: 'Nom i empresa', email: 'Email professional', country: 'País o territori', sector: 'Sector principal', message: 'Necessitat o volum estimat' }
      },
      partner: {
        title: 'Sol·licitar avaluació com a distribuïdor',
        body: 'Expliqueu territori, tipus d’empresa, cartera i capacitats per iniciar la revisió d’encaix.',
        submit: 'Enviar candidatura de partner',
        fields: { name: 'Nom i empresa', email: 'Email professional', country: 'País o territori', companyType: 'Tipus d’empresa', portfolio: 'Cartera actual o especialització' }
      }
    },
    faqEyebrow: 'FAQ',
    faqTitle: 'Dubtes comuns sobre distribuïdors AquaVerify',
    cta: {
      title: 'Trobeu suport local o obriu una nova oportunitat de distribució',
      body: 'AquaVerify pot dirigir sol·licituds de clients, avaluar nous partners i connectar converses de producte, plataforma i OEM des d’una mateixa ruta.',
      primary: 'Sol·licitar contacte local',
      secondary: 'Sol·licitar avaluació de partner'
    },
    faqs: [
      { question: 'Com trobo un distribuïdor autoritzat AquaVerify?', answer: 'Seleccioneu el vostre país o envieu una sol·licitud amb país, sector i necessitat. AquaVerify dirigirà la consulta al distribuïdor autoritzat, reseller regional o equip intern més adequat.' },
      { question: 'Què passa si no hi ha distribuïdor actiu al meu país?', answer: 'AquaVerify pot avaluar subministrament directe, suport regional o una nova oportunitat de distribució en aquest territori.' },
      { question: 'Quines empreses poden convertir-se en distribuïdores?', answer: 'Laboratoris, empreses de tractament d’aigua, distribuïdors científics, integradors, consultores tècniques, proveïdors de qualitat, partners utilities i companyies amb canal B2B especialitzat.' },
      { question: 'Els distribuïdors poden treballar amb OEM o marca blanca?', answer: 'Sí. AquaVerify pot avaluar models OEM, marca blanca o co-branding segons territori, volum, cartera de clients, suport tècnic i restriccions de mercat.' },
      { question: 'L’oferta per a partners inclou la plataforma digital?', answer: 'Els programes partner poden incloure fluxos de plataforma per a traçabilitat, reporting, comunicació amb client i seguiment comercial segons l’abast acordat.' },
      { question: 'Com es manté la qualitat tècnica a la xarxa?', answer: 'AquaVerify prioritza partners amb capacitat de formació, documentació, suport i comunicació tècnica. Els casos complexos poden escalar-se a AquaVerify.' }
    ]
  }
};

export const DISTRIBUTORS_PAGE = Object.fromEntries(
  Object.entries(RAW_PAGES).map(([lang, page]) => [lang, addCommonFields(lang, page)])
);
