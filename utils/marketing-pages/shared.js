export const MARKETING_LANGUAGES = ['en', 'es', 'fr', 'it', 'ca'];

export const LANGUAGE_NAMES = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  it: 'Italiano',
  ca: 'Català'
};

export const productLinks = {
  enumera: 'enumera',
  indica: 'indica',
  standards: 'standard-kits',
  lab: 'lab-essentials',
  oem: 'oem'
};

export function locale(path, title, description, sections, options = {}) {
  return {
    path,
    title,
    description,
    sections,
    eyebrow: options.eyebrow,
    primaryCta: options.primaryCta,
    secondaryCta: options.secondaryCta,
    heroImage: options.heroImage,
    heroImageAlt: options.heroImageAlt,
    heroImageFit: options.heroImageFit,
    heroVideo: options.heroVideo,
    ogImage: options.ogImage,
    datasheetUrl: options.datasheetUrl,
    datasheetLabel: options.datasheetLabel,
    gallery: options.gallery || [],
    whitepaper: options.whitepaper,
    markdownWhitepaper: options.markdownWhitepaper,
    seoTitle: options.seoTitle || title,
    seoDescription: options.seoDescription || description,
    faqs: options.faqs || []
  };
}

export function section(title, body, bullets = []) {
  return { title, body, bullets };
}

const DEFAULT_FAQS = {
  products: {
    en: [
      { question: 'How do AquaVerify products connect to the digital platform?', answer: 'Product workflows can be connected to AquaVerify Cloud so samples, operators, results, reports and customer communication remain traceable from the first contact.' },
      { question: 'Can AquaVerify help us choose the right product family?', answer: 'Yes. AquaVerify can map the intended workflow, sample type, reporting needs and commercial route before preparing a quote.' }
    ],
    es: [
      { question: '¿Cómo se conectan los productos AquaVerify con la plataforma digital?', answer: 'Los flujos de producto pueden conectarse a AquaVerify Cloud para que muestras, operadores, resultados, informes y comunicación cliente queden trazables desde el primer contacto.' },
      { question: '¿AquaVerify puede ayudarnos a elegir la familia de producto adecuada?', answer: 'Sí. AquaVerify puede mapear el flujo previsto, tipo de muestra, necesidades de reporting y ruta comercial antes de preparar una cotización.' }
    ],
    fr: [
      { question: 'Comment les produits AquaVerify se connectent-ils à la plateforme numérique?', answer: 'Les flux produit peuvent être reliés à AquaVerify Cloud afin que les échantillons, opérateurs, résultats, rapports et échanges client restent traçables dès le premier contact.' },
      { question: 'AquaVerify peut-il nous aider à choisir la bonne famille produit?', answer: 'Oui. AquaVerify peut cartographier le flux prévu, le type d’échantillon, les besoins de reporting et la route commerciale avant de préparer un devis.' }
    ],
    it: [
      { question: 'Come si collegano i prodotti AquaVerify alla piattaforma digitale?', answer: 'I flussi prodotto possono essere collegati ad AquaVerify Cloud affinché campioni, operatori, risultati, report e comunicazione cliente restino tracciabili dal primo contatto.' },
      { question: 'AquaVerify può aiutarci a scegliere la famiglia prodotto giusta?', answer: 'Sì. AquaVerify può mappare flusso previsto, tipo di campione, esigenze di reporting e percorso commerciale prima di preparare un preventivo.' }
    ],
    ca: [
      { question: 'Com es connecten els productes AquaVerify amb la plataforma digital?', answer: 'Els fluxos de producte es poden connectar a AquaVerify Cloud perquè mostres, operadors, resultats, informes i comunicació client quedin traçables des del primer contacte.' },
      { question: 'AquaVerify ens pot ajudar a triar la família de producte adequada?', answer: 'Sí. AquaVerify pot mapar el flux previst, tipus de mostra, necessitats de reporting i ruta comercial abans de preparar un pressupost.' }
    ]
  },
  platform: {
    en: [
      { question: 'Is AquaVerify Cloud only for AquaVerify product workflows?', answer: 'No. It supports connected AquaVerify product workflows and can also be positioned as a SaaS platform for biotech, laboratory and quality teams.' },
      { question: 'Which modules can be covered by the platform?', answer: 'The platform can connect CRM, LIMS-style sample work, operations, inventory, finance, customer portal and reporting workflows.' }
    ],
    es: [
      { question: '¿AquaVerify Cloud sirve solo para flujos con productos AquaVerify?', answer: 'No. Soporta flujos conectados con productos AquaVerify y también puede posicionarse como plataforma SaaS para equipos biotech, laboratorios y calidad.' },
      { question: '¿Qué módulos puede cubrir la plataforma?', answer: 'La plataforma puede conectar CRM, flujos de muestras tipo LIMS, operaciones, inventario, finanzas, portal cliente y reporting.' }
    ],
    fr: [
      { question: 'AquaVerify Cloud est-il uniquement destiné aux produits AquaVerify?', answer: 'Non. Il prend en charge les flux connectés aux produits AquaVerify et peut aussi être proposé comme plateforme SaaS pour biotech, laboratoires et équipes qualité.' },
      { question: 'Quels modules la plateforme peut-elle couvrir?', answer: 'La plateforme peut connecter CRM, flux échantillons de type LIMS, opérations, inventaire, finance, portail client et reporting.' }
    ],
    it: [
      { question: 'AquaVerify Cloud serve solo per i flussi con prodotti AquaVerify?', answer: 'No. Supporta flussi collegati ai prodotti AquaVerify e può anche essere proposto come piattaforma SaaS per biotech, laboratori e team qualità.' },
      { question: 'Quali moduli può coprire la piattaforma?', answer: 'La piattaforma può collegare CRM, flussi campioni di tipo LIMS, operazioni, inventario, finanza, portale clienti e reporting.' }
    ],
    ca: [
      { question: 'AquaVerify Cloud serveix només per a fluxos amb productes AquaVerify?', answer: 'No. Dona suport a fluxos connectats amb productes AquaVerify i també es pot posicionar com a plataforma SaaS per a equips biotech, laboratoris i qualitat.' },
      { question: 'Quins mòduls pot cobrir la plataforma?', answer: 'La plataforma pot connectar CRM, fluxos de mostres tipus LIMS, operacions, inventari, finances, portal client i reporting.' }
    ]
  },
  partners: {
    en: [
      { question: 'Can distributors work with AquaVerify-branded and OEM supply?', answer: 'AquaVerify can evaluate both routes depending on territory, product scope, volume, support needs and market constraints.' },
      { question: 'Does the partner offer include the digital platform?', answer: 'Partner programs can include platform workflows for traceability, reporting, customer communication and commercial follow-up.' }
    ],
    es: [
      { question: '¿Los distribuidores pueden trabajar con marca AquaVerify y suministro OEM?', answer: 'AquaVerify puede evaluar ambas rutas según territorio, alcance de producto, volumen, soporte necesario y restricciones de mercado.' },
      { question: '¿La oferta para partners incluye la plataforma digital?', answer: 'Los programas de partner pueden incluir flujos de plataforma para trazabilidad, reporting, comunicación cliente y seguimiento comercial.' }
    ],
    fr: [
      { question: 'Les distributeurs peuvent-ils travailler avec marque AquaVerify et OEM?', answer: 'AquaVerify peut évaluer les deux routes selon territoire, périmètre produit, volume, support requis et contraintes de marché.' },
      { question: 'L’offre partenaire inclut-elle la plateforme numérique?', answer: 'Les programmes partenaires peuvent inclure des flux plateforme pour traçabilité, reporting, communication client et suivi commercial.' }
    ],
    it: [
      { question: 'I distributori possono lavorare con marchio AquaVerify e fornitura OEM?', answer: 'AquaVerify può valutare entrambi i percorsi in base a territorio, perimetro prodotto, volume, supporto richiesto e vincoli di mercato.' },
      { question: 'L’offerta partner include la piattaforma digitale?', answer: 'I programmi partner possono includere flussi piattaforma per tracciabilità, reporting, comunicazione cliente e follow-up commerciale.' }
    ],
    ca: [
      { question: 'Els distribuïdors poden treballar amb marca AquaVerify i subministrament OEM?', answer: 'AquaVerify pot valorar totes dues rutes segons territori, abast de producte, volum, suport necessari i restriccions de mercat.' },
      { question: 'L’oferta per a partners inclou la plataforma digital?', answer: 'Els programes de partner poden incloure fluxos de plataforma per a traçabilitat, reporting, comunicació client i seguiment comercial.' }
    ]
  },
  industries: {
    en: [
      { question: 'Can AquaVerify support both laboratories and water quality teams?', answer: 'Yes. The offer is designed for laboratories, distributors and organizations that need product workflows plus digital traceability around water quality work.' },
      { question: 'Can the solution be adapted by sector?', answer: 'AquaVerify can map sector-specific sample flow, reporting requirements and the right route to products, partners or SaaS.' }
    ],
    es: [
      { question: '¿AquaVerify puede dar soporte a laboratorios y equipos de calidad del agua?', answer: 'Sí. La oferta está pensada para laboratorios, distribuidores y organizaciones que necesitan flujos de producto con trazabilidad digital en calidad del agua.' },
      { question: '¿La solución se puede adaptar por sector?', answer: 'AquaVerify puede mapear flujo de muestras, necesidades de reporting y la ruta adecuada hacia productos, partners o SaaS.' }
    ],
    fr: [
      { question: 'AquaVerify peut-il accompagner laboratoires et équipes qualité eau?', answer: 'Oui. L’offre s’adresse aux laboratoires, distributeurs et organisations qui ont besoin de flux produit avec traçabilité numérique autour de la qualité de l’eau.' },
      { question: 'La solution peut-elle être adaptée par secteur?', answer: 'AquaVerify peut cartographier flux échantillons, besoins de reporting et route adaptée vers produits, partenaires ou SaaS.' }
    ],
    it: [
      { question: 'AquaVerify può supportare laboratori e team qualità dell’acqua?', answer: 'Sì. L’offerta è pensata per laboratori, distributori e organizzazioni che richiedono flussi prodotto con tracciabilità digitale per la qualità dell’acqua.' },
      { question: 'La soluzione può essere adattata per settore?', answer: 'AquaVerify può mappare flusso campioni, esigenze di reporting e percorso adatto verso prodotti, partner o SaaS.' }
    ],
    ca: [
      { question: 'AquaVerify pot donar suport a laboratoris i equips de qualitat de l’aigua?', answer: 'Sí. L’oferta està pensada per a laboratoris, distribuïdors i organitzacions que necessiten fluxos de producte amb traçabilitat digital en qualitat de l’aigua.' },
      { question: 'La solució es pot adaptar per sector?', answer: 'AquaVerify pot mapar flux de mostres, necessitats de reporting i ruta adequada cap a productes, partners o SaaS.' }
    ]
  },
  resources: {
    en: [
      { question: 'Are AquaVerify resources a replacement for laboratory method validation?', answer: 'No. The resources are commercial and technical orientation material; each laboratory remains responsible for its own scientific, quality and regulatory process.' },
      { question: 'Can AquaVerify help apply a guide to a real workflow?', answer: 'Yes. AquaVerify can help connect the guide to a product family, traceability flow, distributor route or SaaS evaluation.' }
    ],
    es: [
      { question: '¿Los recursos AquaVerify sustituyen la validación metodológica del laboratorio?', answer: 'No. Los recursos son material de orientación comercial y técnica; cada laboratorio mantiene su propio proceso científico, de calidad y regulatorio.' },
      { question: '¿AquaVerify puede ayudar a aplicar una guía a un flujo real?', answer: 'Sí. AquaVerify puede conectar la guía con una familia de producto, flujo de trazabilidad, ruta de distribución o evaluación SaaS.' }
    ],
    fr: [
      { question: 'Les ressources AquaVerify remplacent-elles la validation méthode du laboratoire?', answer: 'Non. Les ressources sont du contenu d’orientation commerciale et technique; chaque laboratoire reste responsable de son processus scientifique, qualité et réglementaire.' },
      { question: 'AquaVerify peut-il aider à appliquer un guide à un flux réel?', answer: 'Oui. AquaVerify peut relier le guide à une famille produit, un flux de traçabilité, une route distribution ou une évaluation SaaS.' }
    ],
    it: [
      { question: 'Le risorse AquaVerify sostituiscono la validazione metodologica del laboratorio?', answer: 'No. Le risorse sono materiale di orientamento commerciale e tecnico; ogni laboratorio resta responsabile del proprio processo scientifico, qualità e regolatorio.' },
      { question: 'AquaVerify può aiutare ad applicare una guida a un flusso reale?', answer: 'Sì. AquaVerify può collegare la guida a una famiglia prodotto, un flusso di tracciabilità, una route distributiva o una valutazione SaaS.' }
    ],
    ca: [
      { question: 'Els recursos AquaVerify substitueixen la validació metodològica del laboratori?', answer: 'No. Els recursos són material d’orientació comercial i tècnica; cada laboratori manté el seu propi procés científic, de qualitat i regulatori.' },
      { question: 'AquaVerify pot ajudar a aplicar una guia a un flux real?', answer: 'Sí. AquaVerify pot connectar la guia amb una família de producte, flux de traçabilitat, ruta de distribució o avaluació SaaS.' }
    ]
  },
  company: {
    en: [
      { question: 'What does AquaVerify do?', answer: 'AquaVerify develops water microbiology products, OEM/distributor routes and a connected cloud platform for traceability, commercial follow-up and operational workflows.' },
      { question: 'Who should contact AquaVerify?', answer: 'Laboratories, distributors, industrial quality teams and biotech companies can contact AquaVerify to discuss products, OEM supply, distribution or SaaS.' }
    ],
    es: [
      { question: '¿Qué hace AquaVerify?', answer: 'AquaVerify desarrolla productos de microbiología del agua, rutas OEM/distribuidor y una plataforma cloud conectada para trazabilidad, seguimiento comercial y flujos operativos.' },
      { question: '¿Quién debería contactar con AquaVerify?', answer: 'Laboratorios, distribuidores, equipos de calidad industrial y empresas biotech pueden contactar con AquaVerify para hablar de productos, OEM, distribución o SaaS.' }
    ],
    fr: [
      { question: 'Que fait AquaVerify?', answer: 'AquaVerify développe des produits de microbiologie de l’eau, des routes OEM/distribution et une plateforme cloud connectée pour traçabilité, suivi commercial et flux opérationnels.' },
      { question: 'Qui devrait contacter AquaVerify?', answer: 'Laboratoires, distributeurs, équipes qualité industrielles et entreprises biotech peuvent contacter AquaVerify pour produits, OEM, distribution ou SaaS.' }
    ],
    it: [
      { question: 'Cosa fa AquaVerify?', answer: 'AquaVerify sviluppa prodotti di microbiologia dell’acqua, percorsi OEM/distributori e una piattaforma cloud collegata per tracciabilità, follow-up commerciale e flussi operativi.' },
      { question: 'Chi dovrebbe contattare AquaVerify?', answer: 'Laboratori, distributori, team qualità industriali e aziende biotech possono contattare AquaVerify per prodotti, OEM, distribuzione o SaaS.' }
    ],
    ca: [
      { question: 'Què fa AquaVerify?', answer: 'AquaVerify desenvolupa productes de microbiologia de l’aigua, rutes OEM/distribuïdor i una plataforma cloud connectada per a traçabilitat, seguiment comercial i fluxos operatius.' },
      { question: 'Qui hauria de contactar amb AquaVerify?', answer: 'Laboratoris, distribuïdors, equips de qualitat industrial i empreses biotech poden contactar amb AquaVerify per parlar de productes, OEM, distribució o SaaS.' }
    ]
  }
};

function withDefaultFaqs(translations, category) {
  return Object.fromEntries(Object.entries(translations).map(([lang, content]) => [
    lang,
    content.faqs?.length > 0
      ? content
      : { ...content, faqs: DEFAULT_FAQS[category]?.[lang] || DEFAULT_FAQS[category]?.en || [] }
  ]));
}

export function page(id, category, primaryIntent, translations, meta = {}) {
  return { id, category, primaryIntent, translations: withDefaultFaqs(translations, category), ...meta };
}
