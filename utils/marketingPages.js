import { getProductAssetOptions } from './productAssets.js';
import { WATER_QUALITY_CONTROL_PAGE } from './waterQualityControlContent.js';

export const MARKETING_LANGUAGES = ['en', 'es', 'fr', 'it', 'ca'];

export const LANGUAGE_NAMES = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  it: 'Italiano',
  ca: 'Català'
};

const productLinks = {
  enumera: 'enumera',
  indica: 'indica',
  standards: 'standard-kits',
  lab: 'lab-essentials',
  oem: 'oem'
};

function locale(path, title, description, sections, options = {}) {
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
    seoTitle: options.seoTitle || title,
    seoDescription: options.seoDescription || description,
    faqs: options.faqs || []
  };
}

function section(title, body, bullets = []) {
  return { title, body, bullets };
}

const ENUMERA_GALLERY_ITEMS = {
  en: [
    { src: '/images/products/marketing/enumera.svg', alt: 'AquaVerify ENUMERA quantitative water microbiology kit family', title: 'ENUMERA family', body: 'A quantitative product family for water microbiology enumeration workflows.' },
    { src: '/images/products/marketing/enumera-coli100.png', alt: 'ENUMERA Coli 100 tray with yellow and green wells', title: 'ENUMERA Coli 100', body: 'Chromogenic visual reading for E. coli and total coliform workflows.' },
    { src: '/images/products/marketing/enumera-soma100.svg', alt: 'ENUMERA Soma100 somatic coliphage kit visual', title: 'ENUMERA Soma100', body: 'Quantitative workflow for somatic coliphage analysis.' },
    { src: '/images/products/marketing/enumera-entero100.svg', alt: 'ENUMERA Entero100 bacterial indicator kit visual', title: 'ENUMERA Entero100', body: 'Quantitative workflow for bacterial indicator routines.' },
    { src: '/images/products/marketing/enumera-tray.svg', alt: 'ENUMERA multipwell tray product visual', title: 'Multipwell tray', body: 'Tray format designed for repeatable enumeration and result interpretation.' },
    { src: '/images/products/marketing/enumera-reader.svg', alt: 'ENUMERA reader and workflow tools visual', title: 'Workflow tools', body: 'Accessories and workflow tools that support consistent laboratory operation.' }
  ],
  es: [
    { src: '/images/products/marketing/enumera.svg', alt: 'Familia de kits cuantitativos AquaVerify ENUMERA para microbiología del agua', title: 'Familia ENUMERA', body: 'Familia cuantitativa para flujos de enumeración en microbiología del agua.' },
    { src: '/images/products/marketing/enumera-coli100.png', alt: 'Tray ENUMERA Coli 100 con pocillos amarillos y verdes', title: 'ENUMERA Coli 100', body: 'Lectura cromogénica visual para flujos de E. coli y coliformes totales.' },
    { src: '/images/products/marketing/enumera-soma100.svg', alt: 'Visual del kit ENUMERA Soma100 para colífagos somáticos', title: 'ENUMERA Soma100', body: 'Flujo cuantitativo para análisis de colífagos somáticos.' },
    { src: '/images/products/marketing/enumera-entero100.svg', alt: 'Visual del kit ENUMERA Entero100 para indicadores bacterianos', title: 'ENUMERA Entero100', body: 'Flujo cuantitativo para rutinas de indicadores bacterianos.' },
    { src: '/images/products/marketing/enumera-tray.svg', alt: 'Visual del tray multipocillo ENUMERA', title: 'Tray multipocillo', body: 'Formato de tray pensado para enumeración repetible e interpretación de resultados.' },
    { src: '/images/products/marketing/enumera-reader.svg', alt: 'Visual de herramientas de lectura y flujo ENUMERA', title: 'Herramientas de flujo', body: 'Accesorios y herramientas que ayudan a estandarizar la operación del laboratorio.' }
  ],
  fr: [
    { src: '/images/products/marketing/enumera.svg', alt: 'Famille de kits quantitatifs AquaVerify ENUMERA pour microbiologie de l’eau', title: 'Famille ENUMERA', body: 'Famille quantitative pour les flux de dénombrement en microbiologie de l’eau.' },
    { src: '/images/products/marketing/enumera-coli100.png', alt: 'Tray ENUMERA Coli 100 avec puits jaunes et verts', title: 'ENUMERA Coli 100', body: 'Lecture chromogénique visuelle pour E. coli et coliformes totaux.' },
    { src: '/images/products/marketing/enumera-soma100.svg', alt: 'Visuel kit ENUMERA Soma100 pour coliphages somatiques', title: 'ENUMERA Soma100', body: 'Flux quantitatif pour l’analyse des coliphages somatiques.' },
    { src: '/images/products/marketing/enumera-entero100.svg', alt: 'Visuel kit ENUMERA Entero100 pour indicateurs bactériens', title: 'ENUMERA Entero100', body: 'Flux quantitatif pour routines d’indicateurs bactériens.' },
    { src: '/images/products/marketing/enumera-tray.svg', alt: 'Visuel tray multipuits ENUMERA', title: 'Tray multipuits', body: 'Format tray pensé pour un dénombrement répétable et l’interprétation des résultats.' },
    { src: '/images/products/marketing/enumera-reader.svg', alt: 'Visuel outils de lecture et workflow ENUMERA', title: 'Outils workflow', body: 'Accessoires et outils pour standardiser l’opération laboratoire.' }
  ],
  it: [
    { src: '/images/products/marketing/enumera.svg', alt: 'Famiglia kit quantitativi AquaVerify ENUMERA per microbiologia dell’acqua', title: 'Famiglia ENUMERA', body: 'Famiglia quantitativa per workflow di enumerazione nella microbiologia dell’acqua.' },
    { src: '/images/products/marketing/enumera-coli100.png', alt: 'Tray ENUMERA Coli 100 con pozzetti gialli e verdi', title: 'ENUMERA Coli 100', body: 'Lettura cromogenica visiva per flussi E. coli e coliformi totali.' },
    { src: '/images/products/marketing/enumera-soma100.svg', alt: 'Visual kit ENUMERA Soma100 per colifagi somatici', title: 'ENUMERA Soma100', body: 'Workflow quantitativo per analisi dei colifagi somatici.' },
    { src: '/images/products/marketing/enumera-entero100.svg', alt: 'Visual kit ENUMERA Entero100 per indicatori batterici', title: 'ENUMERA Entero100', body: 'Workflow quantitativo per routine di indicatori batterici.' },
    { src: '/images/products/marketing/enumera-tray.svg', alt: 'Visual tray multip pozzetto ENUMERA', title: 'Tray multiwell', body: 'Formato tray pensato per enumerazione ripetibile e interpretazione risultati.' },
    { src: '/images/products/marketing/enumera-reader.svg', alt: 'Visual strumenti lettura e workflow ENUMERA', title: 'Strumenti workflow', body: 'Accessori e strumenti per supportare operazioni di laboratorio coerenti.' }
  ],
  ca: [
    { src: '/images/products/marketing/enumera.svg', alt: 'Familia de kits quantitatius AquaVerify ENUMERA per a microbiologia de l’aigua', title: 'Familia ENUMERA', body: 'Familia quantitativa per a fluxos d’enumeració en microbiologia de l’aigua.' },
    { src: '/images/products/marketing/enumera-coli100.png', alt: 'Tray ENUMERA Coli 100 amb pous grocs i verds', title: 'ENUMERA Coli 100', body: 'Lectura cromogènica visual per a fluxos d’E. coli i coliformes totals.' },
    { src: '/images/products/marketing/enumera-soma100.svg', alt: 'Visual del kit ENUMERA Soma100 per a colífags somàtics', title: 'ENUMERA Soma100', body: 'Flux quantitatiu per a anàlisi de colífags somàtics.' },
    { src: '/images/products/marketing/enumera-entero100.svg', alt: 'Visual del kit ENUMERA Entero100 per a indicadors bacterians', title: 'ENUMERA Entero100', body: 'Flux quantitatiu per a rutines d’indicadors bacterians.' },
    { src: '/images/products/marketing/enumera-tray.svg', alt: 'Visual del tray multipou ENUMERA', title: 'Tray multipou', body: 'Format de tray pensat per a enumeració repetible i interpretació de resultats.' },
    { src: '/images/products/marketing/enumera-reader.svg', alt: 'Visual d’eines de lectura i flux ENUMERA', title: 'Eines de flux', body: 'Accessoris i eines que ajuden a estandarditzar l’operació del laboratori.' }
  ]
};

function enumeraGallery(lang) {
  return ENUMERA_GALLERY_ITEMS[lang] || ENUMERA_GALLERY_ITEMS.en;
}

const ENUMERA_HERO_VIDEO = '/videos/enumera-tray-video.mp4';

const PLATFORM_SCREENSHOT_ASSETS = {
  dashboard: '/images/platform/saas/aquaverify-cloud-dashboard.jpg',
  crm: '/images/platform/saas/aquaverify-crm-customer-360.jpg',
  lims: '/images/platform/saas/aquaverify-lims-dashboard.jpg',
  work: '/images/platform/saas/aquaverify-work-board.jpg',
  wms: '/images/platform/saas/aquaverify-wms-dashboard.jpg',
  finance: '/images/platform/saas/aquaverify-finance-treasury.jpg',
  portal: '/images/platform/saas/aquaverify-customer-portal.jpg'
};

const PLATFORM_SCREENSHOT_COPY = {
  en: [
    { id: 'dashboard', title: 'Executive dashboard', body: 'Operational KPIs, revenue, margin and live workload in one cockpit.', alt: 'AquaVerify Cloud executive performance dashboard' },
    { id: 'crm', title: 'Customer accounts', body: 'Customer, partner and laboratory accounts connected to commercial and support activity.', alt: 'AquaVerify CRM company portfolio screen' },
    { id: 'lims', title: 'LIMS workstation', body: 'Sample reception, work distribution, validation and reports in the same workflow.', alt: 'AquaVerify LIMS workstation dashboard' },
    { id: 'portal', title: 'Customer portal', body: 'Customers can request work, follow samples, download reports and keep support context in one place.', alt: 'AquaVerify customer portal screen' },
    { id: 'work', title: 'Work management', body: 'Projects, boards, documents and tasks for scientific and operational teams.', alt: 'AquaVerify work board and task management screen' },
    { id: 'wms', title: 'Inventory and WMS', body: 'Warehouse, stock movement, traceability and fulfilment controls.', alt: 'AquaVerify WMS warehouse dashboard' },
    { id: 'finance', title: 'Finance and treasury', body: 'Billing, cash, expenses and reporting tied to the operational record.', alt: 'AquaVerify finance and treasury dashboard' }
  ],
  es: [
    { id: 'dashboard', title: 'Dashboard ejecutivo', body: 'KPIs operativos, ingresos, margen y carga viva en un solo cockpit.', alt: 'Dashboard ejecutivo de rendimiento en AquaVerify Cloud' },
    { id: 'crm', title: 'Cartera de clientes', body: 'Cuentas de clientes, partners y laboratorios conectadas con actividad comercial y soporte.', alt: 'Pantalla de cartera de empresas CRM en AquaVerify' },
    { id: 'lims', title: 'Estación LIMS', body: 'Recepción de muestras, distribución de trabajo, validación e informes en el mismo flujo.', alt: 'Dashboard de estación LIMS en AquaVerify' },
    { id: 'portal', title: 'Portal cliente', body: 'Los clientes pueden solicitar trabajo, seguir muestras, descargar informes y conservar el contexto de soporte en un solo lugar.', alt: 'Pantalla del portal cliente AquaVerify' },
    { id: 'work', title: 'Gestión del trabajo', body: 'Proyectos, tableros, documentos y tareas para equipos científicos y operativos.', alt: 'Tablero de trabajo y tareas en AquaVerify' },
    { id: 'wms', title: 'Inventario y WMS', body: 'Almacén, movimientos de stock, trazabilidad y controles de expedición.', alt: 'Dashboard de almacén WMS en AquaVerify' },
    { id: 'finance', title: 'Finanzas y tesorería', body: 'Facturación, caja, gastos y reporting conectados al registro operativo.', alt: 'Dashboard de finanzas y tesorería en AquaVerify' }
  ],
  fr: [
    { id: 'dashboard', title: 'Dashboard exécutif', body: 'KPIs opérationnels, revenus, marge et charge active dans un seul cockpit.', alt: 'Dashboard exécutif AquaVerify Cloud' },
    { id: 'crm', title: 'Portefeuille clients', body: 'Comptes clients, partenaires et laboratoires reliés à l’activité commerciale et au support.', alt: 'Écran portefeuille CRM AquaVerify' },
    { id: 'lims', title: 'Station LIMS', body: 'Réception échantillons, répartition du travail, validation et rapports dans un même flux.', alt: 'Dashboard station LIMS AquaVerify' },
    { id: 'portal', title: 'Portail client', body: 'Les clients peuvent demander du travail, suivre les échantillons, télécharger les rapports et conserver le contexte support au même endroit.', alt: 'Écran portail client AquaVerify' },
    { id: 'work', title: 'Gestion du travail', body: 'Projets, tableaux, documents et tâches pour équipes scientifiques et opérationnelles.', alt: 'Tableau de travail AquaVerify' },
    { id: 'wms', title: 'Inventaire et WMS', body: 'Entrepôt, mouvements de stock, traçabilité et contrôles d’expédition.', alt: 'Dashboard WMS AquaVerify' },
    { id: 'finance', title: 'Finance et trésorerie', body: 'Facturation, trésorerie, dépenses et reporting liés au registre opérationnel.', alt: 'Dashboard finance AquaVerify' }
  ],
  it: [
    { id: 'dashboard', title: 'Dashboard executive', body: 'KPI operativi, ricavi, margine e carico attivo in un unico cockpit.', alt: 'Dashboard executive AquaVerify Cloud' },
    { id: 'crm', title: 'Portafoglio clienti', body: 'Account clienti, partner e laboratori collegati ad attività commerciale e supporto.', alt: 'Schermata portfolio CRM AquaVerify' },
    { id: 'lims', title: 'Workstation LIMS', body: 'Ricezione campioni, distribuzione lavoro, validazione e report nello stesso flusso.', alt: 'Dashboard workstation LIMS AquaVerify' },
    { id: 'portal', title: 'Portale clienti', body: 'I clienti possono richiedere lavoro, seguire i campioni, scaricare report e mantenere il contesto supporto in un unico luogo.', alt: 'Schermata portale clienti AquaVerify' },
    { id: 'work', title: 'Gestione lavoro', body: 'Progetti, board, documenti e task per team scientifici e operativi.', alt: 'Board di lavoro AquaVerify' },
    { id: 'wms', title: 'Inventario e WMS', body: 'Magazzino, movimenti stock, tracciabilità e controlli di spedizione.', alt: 'Dashboard WMS AquaVerify' },
    { id: 'finance', title: 'Finanza e tesoreria', body: 'Fatturazione, cassa, spese e reporting collegati al record operativo.', alt: 'Dashboard finanza AquaVerify' }
  ],
  ca: [
    { id: 'dashboard', title: 'Dashboard executiu', body: 'KPIs operatius, ingressos, marge i càrrega activa en un sol cockpit.', alt: 'Dashboard executiu AquaVerify Cloud' },
    { id: 'crm', title: 'Cartera de clients', body: 'Comptes de clients, partners i laboratoris connectats amb activitat comercial i suport.', alt: 'Pantalla de cartera CRM AquaVerify' },
    { id: 'lims', title: 'Estació LIMS', body: 'Recepció de mostres, distribució de treball, validació i informes en el mateix flux.', alt: 'Dashboard estació LIMS AquaVerify' },
    { id: 'portal', title: 'Portal client', body: 'Els clients poden sol·licitar treball, seguir mostres, descarregar informes i conservar el context de suport en un sol lloc.', alt: 'Pantalla del portal client AquaVerify' },
    { id: 'work', title: 'Gestió del treball', body: 'Projectes, taulers, documents i tasques per a equips científics i operatius.', alt: 'Tauler de treball AquaVerify' },
    { id: 'wms', title: 'Inventari i WMS', body: 'Magatzem, moviments d’estoc, traçabilitat i controls d’expedició.', alt: 'Dashboard WMS AquaVerify' },
    { id: 'finance', title: 'Finances i tresoreria', body: 'Facturació, caixa, despeses i reporting connectats al registre operatiu.', alt: 'Dashboard finances AquaVerify' }
  ]
};

function platformScreenshotGallery(lang, ids = ['dashboard', 'crm', 'lims', 'work', 'wms', 'finance']) {
  return (PLATFORM_SCREENSHOT_COPY[lang] || PLATFORM_SCREENSHOT_COPY.en)
    .filter((item) => ids.includes(item.id))
    .map((item) => ({
      ...item,
      src: PLATFORM_SCREENSHOT_ASSETS[item.id]
    }));
}

function platformVisualOptions(lang, {
  hero = 'dashboard',
  galleryIds
} = {}) {
  const copy = PLATFORM_SCREENSHOT_COPY[lang] || PLATFORM_SCREENSHOT_COPY.en;
  const heroCopy = copy.find((item) => item.id === hero) || copy[0];
  return {
    heroImage: PLATFORM_SCREENSHOT_ASSETS[hero],
    heroImageAlt: heroCopy?.alt || 'AquaVerify Cloud platform screenshot',
    ogImage: PLATFORM_SCREENSHOT_ASSETS[hero],
    gallery: platformScreenshotGallery(lang, galleryIds)
  };
}

const PLATFORM_DEEP_DIVES = {
  en: {
    eyebrow: 'Platform visual brief',
    title: 'One connected operating system for water quality work',
    intro: 'AquaVerify Cloud is designed as a complete business and laboratory platform: CRM, LIMS, ELN, Work, AquaMail, AquaChat, inventory, WMS, logistics, finance, customer portal, dashboards and AquaAI share the same operational record instead of living in separate tools.',
    metrics: [
      { label: 'Validated flows', value: '11 E2E', body: 'Signup, onboarding, CRM, portal, LIMS, support, sales, logistics, finance, WMS and executive surfaces were validated as connected flows.', tone: 'cyan' },
      { label: 'Functional surface', value: '126 screens', body: 'Authenticated legacy surface audit covered visible screens, forms, links, buttons and critical routes across the platform.', tone: 'indigo' },
      { label: 'Operating languages', value: '5 languages', body: 'Spanish, English, French, Italian and Catalan are part of the platform experience for internal teams, partners and customers.', tone: 'emerald' }
    ],
    comparisonTitle: 'Fragmented tools versus AquaVerify Cloud',
    comparison: [
      { label: 'Fragmented stack', title: 'CRM, spreadsheets, email, lab records and finance separated', body: 'Teams lose context between quotation, sample reception, work execution, report delivery, stock, invoicing and customer follow-up.', valuePercent: 38, tone: 'slate' },
      { label: 'AquaVerify Cloud', title: 'One traceable operational backbone', body: 'Every customer, sample, task, result, shipment, invoice, support ticket and report can stay linked to the same business record.', valuePercent: 92, tone: 'cyan' }
    ],
    flowTitle: 'From request to report, stock, invoice and customer portal',
    flow: [
      { title: 'Capture the opportunity', body: 'Corporate website, signup, CRM account, contact, consent, source URL and commercial intent enter the platform with context.' },
      { title: 'Qualify and quote', body: 'CRM and Sales turn the opportunity into a quote, product order, SaaS demo or partner conversation.' },
      { title: 'Run laboratory work', body: 'LIMS receives samples, controls sampling points, work sheets, result capture, validation, ELN protocols and COA/report outputs.' },
      { title: 'Coordinate operations', body: 'Work boards, tasks, AquaChat, AquaMail, support tickets and alerts keep teams aligned around the customer and sample record.' },
      { title: 'Execute supply chain', body: 'Inventory, WMS, production, procurement and logistics connect stock availability, picking, shipments and delivery evidence.' },
      { title: 'Close the loop', body: 'Finance, treasury, dashboards, customer portal and AquaAI turn execution into billing, evidence, reporting and next-best actions.' }
    ],
    sourceLabel: 'Based on AquaVerify Cloud manuals and production E2E validation',
    note: 'The platform can support AquaVerify product workflows and can also be positioned as SaaS for biotech, laboratory and operational teams that need an integrated system.'
  },
  es: {
    eyebrow: 'Brief visual de plataforma',
    title: 'Un sistema operativo conectado para la calidad del agua',
    intro: 'AquaVerify Cloud está diseñada como una plataforma completa de negocio y laboratorio: CRM, LIMS, ELN, Work, AquaMail, AquaChat, inventario, WMS, logística, finanzas, portal cliente, dashboards y AquaAI comparten el mismo registro operativo en lugar de vivir en herramientas separadas.',
    metrics: [
      { label: 'Flujos validados', value: '11 E2E', body: 'Signup, onboarding, CRM, portal, LIMS, soporte, ventas, logística, finanzas, WMS y superficies ejecutivas validadas como flujos conectados.', tone: 'cyan' },
      { label: 'Superficie funcional', value: '126 pantallas', body: 'Auditoría autenticada de pantallas, formularios, enlaces, botones y rutas críticas visibles en la plataforma.', tone: 'indigo' },
      { label: 'Idiomas operativos', value: '5 idiomas', body: 'Español, inglés, francés, italiano y catalán forman parte de la experiencia para equipos internos, partners y clientes.', tone: 'emerald' }
    ],
    comparisonTitle: 'Herramientas fragmentadas frente a AquaVerify Cloud',
    comparison: [
      { label: 'Stack fragmentado', title: 'CRM, hojas de cálculo, email, laboratorio y finanzas separados', body: 'El contexto se pierde entre cotización, recepción de muestra, ejecución, informe, stock, facturación y seguimiento del cliente.', valuePercent: 38, tone: 'slate' },
      { label: 'AquaVerify Cloud', title: 'Una columna vertebral operativa trazable', body: 'Cada cliente, muestra, tarea, resultado, envío, factura, ticket e informe puede quedar vinculado al mismo registro de negocio.', valuePercent: 92, tone: 'cyan' }
    ],
    flowTitle: 'De la solicitud al informe, stock, factura y portal cliente',
    flow: [
      { title: 'Captar la oportunidad', body: 'Web corporativa, signup, empresa CRM, contacto, consentimiento, URL de origen e intención comercial entran con contexto.' },
      { title: 'Cualificar y cotizar', body: 'CRM y Sales transforman la oportunidad en presupuesto, pedido de producto, demo SaaS o conversación con partner.' },
      { title: 'Ejecutar el trabajo de laboratorio', body: 'LIMS gestiona muestras, puntos de muestreo, hojas de trabajo, captura de resultados, validación, protocolos ELN y COA/informes.' },
      { title: 'Coordinar operaciones', body: 'Work, tareas, AquaChat, AquaMail, soporte y alertas mantienen a los equipos alineados alrededor del cliente y la muestra.' },
      { title: 'Ejecutar la cadena supply', body: 'Inventario, WMS, producción, compras y logística conectan disponibilidad, picking, expediciones y evidencia de entrega.' },
      { title: 'Cerrar el ciclo', body: 'Finanzas, tesorería, dashboards, portal cliente y AquaAI convierten la ejecución en facturación, evidencia, reporting y siguientes acciones.' }
    ],
    sourceLabel: 'Basado en manuales AquaVerify Cloud y validación E2E en producción',
    note: 'La plataforma soporta flujos con productos AquaVerify y también puede ofrecerse como SaaS para biotech, laboratorios y equipos operativos que necesitan un sistema integrado.'
  },
  fr: {
    eyebrow: 'Brief visuel plateforme',
    title: 'Un système opérationnel connecté pour la qualité de l’eau',
    intro: 'AquaVerify Cloud est pensée comme une plateforme complète métier et laboratoire: CRM, LIMS, ELN, Work, AquaMail, AquaChat, inventaire, WMS, logistique, finance, portail client, dashboards et AquaAI partagent le même registre opérationnel au lieu de vivre dans des outils séparés.',
    metrics: [
      { label: 'Flux validés', value: '11 E2E', body: 'Signup, onboarding, CRM, portail, LIMS, support, ventes, logistique, finance, WMS et surfaces exécutives validés comme flux connectés.', tone: 'cyan' },
      { label: 'Surface fonctionnelle', value: '126 écrans', body: 'Audit authentifié des écrans visibles, formulaires, liens, boutons et routes critiques de la plateforme.', tone: 'indigo' },
      { label: 'Langues opérationnelles', value: '5 langues', body: 'Espagnol, anglais, français, italien et catalan font partie de l’expérience pour équipes internes, partenaires et clients.', tone: 'emerald' }
    ],
    comparisonTitle: 'Outils fragmentés versus AquaVerify Cloud',
    comparison: [
      { label: 'Stack fragmentée', title: 'CRM, tableurs, email, laboratoire et finance séparés', body: 'Le contexte se perd entre devis, réception échantillon, exécution, rapport, stock, facturation et suivi client.', valuePercent: 38, tone: 'slate' },
      { label: 'AquaVerify Cloud', title: 'Une colonne vertébrale opérationnelle traçable', body: 'Chaque client, échantillon, tâche, résultat, expédition, facture, ticket et rapport peut rester lié au même registre métier.', valuePercent: 92, tone: 'cyan' }
    ],
    flowTitle: 'De la demande au rapport, stock, facture et portail client',
    flow: [
      { title: 'Capturer l’opportunité', body: 'Site corporate, signup, compte CRM, contact, consentement, URL source et intention commerciale arrivent avec contexte.' },
      { title: 'Qualifier et chiffrer', body: 'CRM et Sales transforment l’opportunité en devis, commande produit, démo SaaS ou échange partenaire.' },
      { title: 'Exécuter le travail laboratoire', body: 'LIMS gère échantillons, points de prélèvement, feuilles de travail, résultats, validation, protocoles ELN et COA/rapports.' },
      { title: 'Coordonner les opérations', body: 'Work, tâches, AquaChat, AquaMail, support et alertes alignent les équipes autour du client et de l’échantillon.' },
      { title: 'Exécuter la supply chain', body: 'Inventaire, WMS, production, achats et logistique relient disponibilité, picking, expéditions et preuve de livraison.' },
      { title: 'Boucler le cycle', body: 'Finance, trésorerie, dashboards, portail client et AquaAI transforment l’exécution en facturation, preuve, reporting et actions suivantes.' }
    ],
    sourceLabel: 'Basé sur les manuels AquaVerify Cloud et la validation E2E en production',
    note: 'La plateforme supporte les flux produits AquaVerify et peut aussi être proposée en SaaS pour biotech, laboratoires et équipes opérationnelles ayant besoin d’un système intégré.'
  },
  it: {
    eyebrow: 'Brief visuale piattaforma',
    title: 'Un sistema operativo connesso per la qualità dell’acqua',
    intro: 'AquaVerify Cloud è progettata come piattaforma completa business e laboratorio: CRM, LIMS, ELN, Work, AquaMail, AquaChat, inventario, WMS, logistica, finanza, portale clienti, dashboard e AquaAI condividono lo stesso record operativo invece di vivere in strumenti separati.',
    metrics: [
      { label: 'Flussi validati', value: '11 E2E', body: 'Signup, onboarding, CRM, portale, LIMS, supporto, vendite, logistica, finanza, WMS e superfici executive validate come flussi connessi.', tone: 'cyan' },
      { label: 'Superficie funzionale', value: '126 schermate', body: 'Audit autenticato di schermate visibili, form, link, pulsanti e rotte critiche della piattaforma.', tone: 'indigo' },
      { label: 'Lingue operative', value: '5 lingue', body: 'Spagnolo, inglese, francese, italiano e catalano fanno parte dell’esperienza per team interni, partner e clienti.', tone: 'emerald' }
    ],
    comparisonTitle: 'Strumenti frammentati rispetto ad AquaVerify Cloud',
    comparison: [
      { label: 'Stack frammentato', title: 'CRM, fogli, email, laboratorio e finanza separati', body: 'Il contesto si perde tra preventivo, ricezione campione, esecuzione, report, stock, fatturazione e follow-up cliente.', valuePercent: 38, tone: 'slate' },
      { label: 'AquaVerify Cloud', title: 'Una dorsale operativa tracciabile', body: 'Ogni cliente, campione, task, risultato, spedizione, fattura, ticket e report può restare collegato allo stesso record business.', valuePercent: 92, tone: 'cyan' }
    ],
    flowTitle: 'Dalla richiesta al report, stock, fattura e portale clienti',
    flow: [
      { title: 'Catturare l’opportunità', body: 'Sito corporate, signup, account CRM, contatto, consenso, URL sorgente e intento commerciale entrano con contesto.' },
      { title: 'Qualificare e quotare', body: 'CRM e Sales trasformano l’opportunità in preventivo, ordine prodotto, demo SaaS o conversazione partner.' },
      { title: 'Eseguire il lavoro di laboratorio', body: 'LIMS gestisce campioni, punti di campionamento, worksheet, risultati, validazione, protocolli ELN e COA/report.' },
      { title: 'Coordinare le operations', body: 'Work, task, AquaChat, AquaMail, supporto e alert tengono i team allineati intorno a cliente e campione.' },
      { title: 'Eseguire la supply chain', body: 'Inventario, WMS, produzione, acquisti e logistica collegano disponibilità, picking, spedizioni ed evidenza di consegna.' },
      { title: 'Chiudere il ciclo', body: 'Finanza, tesoreria, dashboard, portale clienti e AquaAI trasformano l’esecuzione in fatturazione, evidenza, reporting e prossime azioni.' }
    ],
    sourceLabel: 'Basato sui manuali AquaVerify Cloud e sulla validazione E2E in produzione',
    note: 'La piattaforma supporta workflow con prodotti AquaVerify e può anche essere proposta come SaaS per biotech, laboratori e team operativi che richiedono un sistema integrato.'
  },
  ca: {
    eyebrow: 'Brief visual de plataforma',
    title: 'Un sistema operatiu connectat per a la qualitat de l’aigua',
    intro: 'AquaVerify Cloud està dissenyada com una plataforma completa de negoci i laboratori: CRM, LIMS, ELN, Work, AquaMail, AquaChat, inventari, WMS, logística, finances, portal client, dashboards i AquaAI comparteixen el mateix registre operatiu en lloc de viure en eines separades.',
    metrics: [
      { label: 'Fluxos validats', value: '11 E2E', body: 'Signup, onboarding, CRM, portal, LIMS, suport, vendes, logística, finances, WMS i superfícies executives validades com a fluxos connectats.', tone: 'cyan' },
      { label: 'Superfície funcional', value: '126 pantalles', body: 'Auditoria autenticada de pantalles visibles, formularis, enllaços, botons i rutes crítiques de la plataforma.', tone: 'indigo' },
      { label: 'Idiomes operatius', value: '5 idiomes', body: 'Castellà, anglès, francès, italià i català formen part de l’experiència per a equips interns, partners i clients.', tone: 'emerald' }
    ],
    comparisonTitle: 'Eines fragmentades davant AquaVerify Cloud',
    comparison: [
      { label: 'Stack fragmentat', title: 'CRM, fulls de càlcul, email, laboratori i finances separats', body: 'El context es perd entre pressupost, recepció de mostra, execució, informe, estoc, facturació i seguiment del client.', valuePercent: 38, tone: 'slate' },
      { label: 'AquaVerify Cloud', title: 'Una columna vertebral operativa traçable', body: 'Cada client, mostra, tasca, resultat, enviament, factura, tiquet i informe pot quedar vinculat al mateix registre de negoci.', valuePercent: 92, tone: 'cyan' }
    ],
    flowTitle: 'De la sol·licitud a l’informe, estoc, factura i portal client',
    flow: [
      { title: 'Captar l’oportunitat', body: 'Web corporativa, signup, empresa CRM, contacte, consentiment, URL d’origen i intenció comercial entren amb context.' },
      { title: 'Qualificar i pressupostar', body: 'CRM i Sales transformen l’oportunitat en pressupost, comanda de producte, demo SaaS o conversa amb partner.' },
      { title: 'Executar el treball de laboratori', body: 'LIMS gestiona mostres, punts de mostreig, fulls de treball, resultats, validació, protocols ELN i COA/informes.' },
      { title: 'Coordinar operacions', body: 'Work, tasques, AquaChat, AquaMail, suport i alertes mantenen els equips alineats al voltant del client i la mostra.' },
      { title: 'Executar la cadena supply', body: 'Inventari, WMS, producció, compres i logística connecten disponibilitat, picking, expedicions i evidència de lliurament.' },
      { title: 'Tancar el cicle', body: 'Finances, tresoreria, dashboards, portal client i AquaAI converteixen l’execució en facturació, evidència, reporting i següents accions.' }
    ],
    sourceLabel: 'Basat en manuals AquaVerify Cloud i validació E2E en producció',
    note: 'La plataforma suporta fluxos amb productes AquaVerify i també es pot oferir com a SaaS per a biotech, laboratoris i equips operatius que necessiten un sistema integrat.'
  }
};

function platformDeepDive(lang) {
  return PLATFORM_DEEP_DIVES[lang] || PLATFORM_DEEP_DIVES.en;
}

const WHITEPAPER_DEEP_DIVES = {
  eu: {
    en: {
      title: 'Regulatory deep dive: viral indicator readiness in Europe',
      intro: 'The recast EU Drinking Water Directive shifts the conversation from isolated microbiological checks toward risk assessment, operational monitoring and evidence that can be reviewed from catchment to final report. Somatic coliphages are especially relevant when the risk assessment indicates viral indicator monitoring is appropriate for raw water or treatment performance.',
      metrics: [
        { label: 'Directive trigger', value: '50 PFU/100 ml', body: 'Threshold for somatic coliphages in raw water when measurement is indicated by risk assessment.', tone: 'rose' },
        { label: 'Method context', value: 'EN ISO 10705', body: 'Parts 2 and 3 are referenced for operational monitoring of somatic coliphages.', tone: 'cyan' },
        { label: 'Evidence layer', value: 'Sample to report', body: 'Sampling point, method route, controls, reviewer history and customer communication should stay connected.', tone: 'indigo' }
      ],
      comparisonTitle: 'Why viral indicators change the workflow',
      comparison: [
        { label: 'Traditional bacterial indicators', title: 'Useful but incomplete for viral risk', body: 'E. coli and enterococci remain important, but they do not always reflect the persistence or treatment resistance profile of enteric viruses.', valuePercent: 42, tone: 'slate' },
        { label: 'Somatic coliphages', title: 'Operational proxy for viral indicator monitoring', body: 'Coliphage monitoring helps teams discuss viral risk, treatment efficacy and raw water evidence with a stronger microbiological basis.', valuePercent: 86, tone: 'cyan' }
      ],
      flowTitle: 'A practical implementation flow',
      flow: [
        { title: 'Risk assessment', body: 'Map catchment, source water and treatment context before selecting the monitoring route.' },
        { title: 'Method readiness', body: 'Prepare sample volume, controls, host strain, kit family and reviewer responsibilities.' },
        { title: 'Digital evidence', body: 'Connect every sample, result, exception and report inside AquaVerify Cloud.' }
      ],
      sourceLabel: 'Directive (EU) 2020/2184 and EN ISO 10705 context',
      note: 'This resource is orientation material. Competent authority, accreditation and quality-system requirements remain decisive.'
    },
    es: {
      title: 'Análisis normativo: preparación para indicadores virales en Europa',
      intro: 'La Directiva europea de agua potable pasa de controles microbiológicos aislados a evaluación de riesgos, monitorización operativa y evidencia revisable desde la captación hasta el informe final. Los colífagos somáticos son especialmente relevantes cuando la evaluación de riesgos indica que conviene medir indicadores virales en agua bruta o eficacia de tratamiento.',
      metrics: [
        { label: 'Umbral directiva', value: '50 UFP/100 ml', body: 'Umbral para colífagos somáticos en agua bruta cuando la evaluación de riesgos indica que debe medirse.', tone: 'rose' },
        { label: 'Contexto método', value: 'EN ISO 10705', body: 'Las partes 2 y 3 se referencian para monitorización operativa de colífagos somáticos.', tone: 'cyan' },
        { label: 'Capa de evidencia', value: 'Muestra a informe', body: 'Punto de muestreo, ruta metodológica, controles, revisión y comunicación cliente deben quedar conectados.', tone: 'indigo' }
      ],
      comparisonTitle: 'Por qué los indicadores virales cambian el flujo',
      comparison: [
        { label: 'Indicadores bacterianos tradicionales', title: 'Útiles, pero incompletos para riesgo viral', body: 'E. coli y enterococos siguen siendo importantes, pero no siempre reflejan la persistencia o resistencia de virus entéricos frente al tratamiento.', valuePercent: 42, tone: 'slate' },
        { label: 'Colífagos somáticos', title: 'Proxy operativo para monitorización viral', body: 'El seguimiento de colífagos ayuda a discutir riesgo viral, eficacia de tratamiento y evidencia de agua bruta con una base microbiológica más fuerte.', valuePercent: 86, tone: 'cyan' }
      ],
      flowTitle: 'Flujo práctico de implantación',
      flow: [
        { title: 'Evaluación de riesgos', body: 'Mapear captación, agua de origen y tratamiento antes de seleccionar la ruta de monitorización.' },
        { title: 'Preparación metodológica', body: 'Preparar volumen, controles, cepa huésped, familia de kit y responsabilidades de revisión.' },
        { title: 'Evidencia digital', body: 'Conectar cada muestra, resultado, excepción e informe dentro de AquaVerify Cloud.' }
      ],
      sourceLabel: 'Directiva (UE) 2020/2184 y contexto EN ISO 10705',
      note: 'Este recurso es material de orientación. Los requisitos de autoridad competente, acreditación y sistema de calidad siguen siendo decisivos.'
    },
    fr: {
      title: 'Analyse réglementaire: préparation aux indicateurs viraux en Europe',
      intro: 'La directive européenne eau potable déplace le sujet des contrôles microbiologiques isolés vers l’évaluation des risques, la surveillance opérationnelle et une preuve vérifiable du captage au rapport final. Les coliphages somatiques deviennent pertinents lorsque l’évaluation des risques indique une surveillance d’indicateurs viraux en eau brute ou efficacité de traitement.',
      metrics: [
        { label: 'Seuil directive', value: '50 UFP/100 ml', body: 'Seuil pour coliphages somatiques dans l’eau brute lorsque la mesure est indiquée par l’évaluation des risques.', tone: 'rose' },
        { label: 'Contexte méthode', value: 'EN ISO 10705', body: 'Les parties 2 et 3 sont référencées pour la surveillance opérationnelle des coliphages somatiques.', tone: 'cyan' },
        { label: 'Couche de preuve', value: 'Échantillon à rapport', body: 'Point de prélèvement, méthode, contrôles, revue et communication client doivent rester reliés.', tone: 'indigo' }
      ],
      comparisonTitle: 'Pourquoi les indicateurs viraux changent le flux',
      comparison: [
        { label: 'Indicateurs bactériens traditionnels', title: 'Utiles mais incomplets pour le risque viral', body: 'E. coli et entérocoques restent importants, mais ne reflètent pas toujours la persistance ou la résistance des virus entériques au traitement.', valuePercent: 42, tone: 'slate' },
        { label: 'Coliphages somatiques', title: 'Proxy opérationnel pour la surveillance virale', body: 'Le suivi des coliphages aide à discuter risque viral, efficacité de traitement et preuve eau brute avec une base microbiologique plus forte.', valuePercent: 86, tone: 'cyan' }
      ],
      flowTitle: 'Flux pratique d’implémentation',
      flow: [
        { title: 'Évaluation des risques', body: 'Cartographier captage, eau source et traitement avant de choisir la route de surveillance.' },
        { title: 'Préparation méthode', body: 'Préparer volume, contrôles, souche hôte, famille kit et responsabilités de revue.' },
        { title: 'Preuve numérique', body: 'Relier chaque échantillon, résultat, exception et rapport dans AquaVerify Cloud.' }
      ],
      sourceLabel: 'Directive (UE) 2020/2184 et contexte EN ISO 10705',
      note: 'Cette ressource est une orientation. Les exigences d’autorité compétente, d’accréditation et de système qualité restent décisives.'
    },
    it: {
      title: 'Approfondimento normativo: preparazione agli indicatori virali in Europa',
      intro: 'La Direttiva europea acqua potabile sposta il tema da controlli microbiologici isolati a valutazione del rischio, monitoraggio operativo ed evidenza verificabile dal punto di captazione al report finale. I colifagi somatici sono rilevanti quando la valutazione del rischio indica il monitoraggio di indicatori virali in acqua grezza o performance di trattamento.',
      metrics: [
        { label: 'Soglia direttiva', value: '50 PFU/100 ml', body: 'Soglia per colifagi somatici in acqua grezza quando la misura è indicata dalla valutazione del rischio.', tone: 'rose' },
        { label: 'Contesto metodo', value: 'EN ISO 10705', body: 'Le parti 2 e 3 sono richiamate per il monitoraggio operativo dei colifagi somatici.', tone: 'cyan' },
        { label: 'Livello evidenza', value: 'Campione a report', body: 'Punto di campionamento, metodo, controlli, revisione e comunicazione cliente devono restare collegati.', tone: 'indigo' }
      ],
      comparisonTitle: 'Perché gli indicatori virali cambiano il flusso',
      comparison: [
        { label: 'Indicatori batterici tradizionali', title: 'Utili ma incompleti per il rischio virale', body: 'E. coli ed enterococchi restano importanti, ma non sempre riflettono persistenza o resistenza dei virus enterici al trattamento.', valuePercent: 42, tone: 'slate' },
        { label: 'Colifagi somatici', title: 'Proxy operativo per monitoraggio virale', body: 'Il monitoraggio dei colifagi aiuta a discutere rischio virale, efficacia del trattamento ed evidenza acqua grezza con base microbiologica più forte.', valuePercent: 86, tone: 'cyan' }
      ],
      flowTitle: 'Flusso pratico di implementazione',
      flow: [
        { title: 'Valutazione rischio', body: 'Mappare captazione, acqua sorgente e trattamento prima di scegliere la rotta di monitoraggio.' },
        { title: 'Preparazione metodo', body: 'Preparare volume, controlli, ceppo ospite, famiglia kit e responsabilità di revisione.' },
        { title: 'Evidenza digitale', body: 'Collegare ogni campione, risultato, eccezione e report in AquaVerify Cloud.' }
      ],
      sourceLabel: 'Direttiva (UE) 2020/2184 e contesto EN ISO 10705',
      note: 'Questa risorsa è orientativa. Requisiti di autorità competente, accreditamento e sistema qualità restano decisivi.'
    },
    ca: {
      title: 'Anàlisi normativa: preparació per a indicadors virals a Europa',
      intro: 'La Directiva europea d’aigua potable passa de controls microbiològics aïllats a avaluació de riscos, monitoratge operatiu i evidència revisable des de la captació fins a l’informe final. Els colífags somàtics són especialment rellevants quan l’avaluació de riscos indica que convé mesurar indicadors virals en aigua bruta o eficàcia de tractament.',
      metrics: [
        { label: 'Llindar directiva', value: '50 UFP/100 ml', body: 'Llindar per a colífags somàtics en aigua bruta quan l’avaluació de riscos indica que cal mesurar.', tone: 'rose' },
        { label: 'Context mètode', value: 'EN ISO 10705', body: 'Les parts 2 i 3 es referencien per al monitoratge operatiu de colífags somàtics.', tone: 'cyan' },
        { label: 'Capa d’evidència', value: 'Mostra a informe', body: 'Punt de mostreig, ruta metodològica, controls, revisió i comunicació client han de quedar connectats.', tone: 'indigo' }
      ],
      comparisonTitle: 'Per què els indicadors virals canvien el flux',
      comparison: [
        { label: 'Indicadors bacterians tradicionals', title: 'Útils, però incomplets per a risc viral', body: 'E. coli i enterococs continuen sent importants, però no sempre reflecteixen persistència o resistència de virus entèrics davant el tractament.', valuePercent: 42, tone: 'slate' },
        { label: 'Colífags somàtics', title: 'Proxy operatiu per a monitoratge viral', body: 'El seguiment de colífags ajuda a discutir risc viral, eficàcia de tractament i evidència d’aigua bruta amb una base microbiològica més forta.', valuePercent: 86, tone: 'cyan' }
      ],
      flowTitle: 'Flux pràctic d’implantació',
      flow: [
        { title: 'Avaluació de riscos', body: 'Mapar captació, aigua d’origen i tractament abans de seleccionar la ruta de monitoratge.' },
        { title: 'Preparació metodològica', body: 'Preparar volum, controls, soca hoste, família de kit i responsabilitats de revisió.' },
        { title: 'Evidència digital', body: 'Connectar cada mostra, resultat, excepció i informe dins AquaVerify Cloud.' }
      ],
      sourceLabel: 'Directiva (UE) 2020/2184 i context EN ISO 10705',
      note: 'Aquest recurs és material d’orientació. Els requisits d’autoritat competent, acreditació i sistema de qualitat continuen sent decisius.'
    }
  },
  viralIndicator: {
    en: {
      title: 'Infographic: why coliphages are a stronger viral indicator',
      intro: 'Traditional bacterial indicators remain useful, but they do not fully model enteric virus persistence, size, treatment behaviour or resistance. Coliphages give laboratories a more operational proxy for viral-risk conversations while keeping the workflow measurable with established microbiology methods.',
      metrics: [
        { label: 'Viral proxy', value: '20-100 nm', body: 'Coliphages are similar in scale to many enteric viruses and behave more like viruses than bacterial cells during treatment.', tone: 'cyan' },
        { label: 'Decision gap', value: 'E. coli absence', body: 'A negative bacterial indicator result does not automatically prove that infectious viruses are absent.', tone: 'rose' },
        { label: 'Workflow need', value: 'PFU + chain of custody', body: 'Plaque counts, host strains, incubation windows and reviewer history need controlled traceability.', tone: 'indigo' }
      ],
      comparisonTitle: 'Bacterial indicators versus coliphage indicators',
      comparison: [
        { label: 'E. coli / enterococci', title: 'Excellent fecal signal, weaker viral model', body: 'Useful for routine bacterial contamination control, but less representative of enteric virus resistance to disinfection and environmental persistence.', valuePercent: 45, tone: 'slate' },
        { label: 'Somatic and F-specific coliphages', title: 'Closer operational model for viral behaviour', body: 'Non-enveloped bacteriophages provide a practical way to discuss viral indicators, treatment performance and source-water risk.', valuePercent: 88, tone: 'cyan' }
      ],
      flowTitle: 'From scientific rationale to operational workflow',
      flow: [
        { title: 'Define the monitoring question', body: 'Separate fecal-indicator screening, viral-indicator evidence, treatment validation and customer reporting needs.' },
        { title: 'Select the coliphage route', body: 'Map somatic or F-specific coliphage workflows, sample volume, host strain, controls and acceptance language.' },
        { title: 'Connect products and data', body: 'Link kits, controls, plaque counts, reviewer history and reports inside AquaVerify Cloud.' },
        { title: 'Turn interest into action', body: 'Guide readers toward the right product quote, distributor, OEM or SaaS demo path with clear context for the next conversation.' }
      ],
      timelineTitle: 'Regulatory signal timeline',
      timeline: [
        { year: '1989', region: 'USA', sector: 'Treatment performance', body: 'US drinking-water filtration and disinfection rules helped frame virus removal as an operational treatment question.' },
        { year: '2000', region: 'ISO', sector: 'Somatic coliphage enumeration', body: 'ISO 10705-2 provides a standardized context for detecting and enumerating somatic coliphages.' },
        { year: '2001', region: 'EPA', sector: 'Methods 1601 / 1602', body: 'EPA methods formalized enrichment and single agar layer routes for male-specific and somatic coliphages.' },
        { year: '2020', region: 'EU', sector: 'Drinking water risk assessment', body: 'Directive (EU) 2020/2184 includes somatic coliphages in raw-water operational monitoring when risk assessment indicates it is appropriate.' }
      ],
      sourceLabel: 'Directive (EU) 2020/2184, ISO 10705-2 and EPA Methods 1601/1602 context',
      note: 'This whitepaper is technical orientation for B2B buyers. It does not replace accredited method validation, legal advice or competent-authority requirements.'
    },
    es: {
      title: 'Infografía: por qué los colífagos son un indicador viral más sólido',
      intro: 'Los indicadores bacterianos tradicionales siguen siendo útiles, pero no modelan por completo la persistencia, tamaño, comportamiento frente al tratamiento ni resistencia de los virus entéricos. Los colífagos ofrecen a los laboratorios un proxy más operativo para hablar de riesgo viral con métodos microbiológicos medibles.',
      metrics: [
        { label: 'Proxy viral', value: '20-100 nm', body: 'Los colífagos tienen una escala comparable a muchos virus entéricos y se comportan más como virus que como células bacterianas durante el tratamiento.', tone: 'cyan' },
        { label: 'Brecha de decisión', value: 'Ausencia de E. coli', body: 'Un resultado negativo en indicador bacteriano no demuestra automáticamente ausencia de virus infecciosos.', tone: 'rose' },
        { label: 'Necesidad operativa', value: 'UFP + custodia', body: 'Recuentos de placa, cepas huésped, ventanas de incubación e historial de revisión necesitan trazabilidad controlada.', tone: 'indigo' }
      ],
      comparisonTitle: 'Indicadores bacterianos frente a indicadores colífagos',
      comparison: [
        { label: 'E. coli / enterococos', title: 'Excelente señal fecal, modelo viral más débil', body: 'Útiles para control rutinario de contaminación bacteriana, pero menos representativos de resistencia viral a desinfección y persistencia ambiental.', valuePercent: 45, tone: 'slate' },
        { label: 'Colífagos somáticos y F-específicos', title: 'Modelo operativo más cercano al comportamiento viral', body: 'Bacteriófagos sin envoltura que ayudan a discutir indicadores virales, eficacia de tratamiento y riesgo de agua de origen.', valuePercent: 88, tone: 'cyan' }
      ],
      flowTitle: 'De la base científica al flujo operativo',
      flow: [
        { title: 'Definir la pregunta de monitorización', body: 'Separar cribado fecal, evidencia de indicador viral, validación de tratamiento y reporting a cliente.' },
        { title: 'Seleccionar la ruta colífagos', body: 'Mapear flujos somáticos o F-específicos, volumen, cepa huésped, controles y lenguaje de aceptación.' },
        { title: 'Conectar productos y datos', body: 'Vincular kits, controles, recuentos, revisión e informes dentro de AquaVerify Cloud.' },
        { title: 'Convertir interés en acción', body: 'Guiar a los lectores hacia la cotización, distribuidor, OEM o demo SaaS adecuados con contexto claro para la siguiente conversación.' }
      ],
      timelineTitle: 'Línea temporal de señal normativa',
      timeline: [
        { year: '1989', region: 'EEUU', sector: 'Eficacia de tratamiento', body: 'Las reglas de filtración y desinfección de agua potable ayudaron a enmarcar la eliminación de virus como cuestión operativa de tratamiento.' },
        { year: '2000', region: 'ISO', sector: 'Enumeración de colífagos somáticos', body: 'ISO 10705-2 aporta contexto estandarizado para detección y enumeración de colífagos somáticos.' },
        { year: '2001', region: 'EPA', sector: 'Métodos 1601 / 1602', body: 'Los métodos EPA formalizan rutas de enriquecimiento y single agar layer para colífagos F+ y somáticos.' },
        { year: '2020', region: 'UE', sector: 'Evaluación de riesgo en agua potable', body: 'La Directiva (UE) 2020/2184 incluye colífagos somáticos en monitorización operativa de agua bruta cuando la evaluación de riesgos lo indique.' }
      ],
      sourceLabel: 'Contexto Directiva (UE) 2020/2184, ISO 10705-2 y EPA Methods 1601/1602',
      note: 'Este whitepaper es orientación técnica para compradores B2B. No sustituye validación de método, asesoramiento legal ni requisitos de autoridad competente.'
    },
    fr: {
      title: 'Infographie: pourquoi les coliphages sont un indicateur viral plus solide',
      intro: 'Les indicateurs bactériens restent utiles, mais ne modélisent pas totalement la persistance, la taille, le comportement au traitement ni la résistance des virus entériques. Les coliphages donnent aux laboratoires un proxy plus opérationnel pour discuter le risque viral avec des méthodes mesurables.',
      metrics: [
        { label: 'Proxy viral', value: '20-100 nm', body: 'Les coliphages ont une échelle comparable à de nombreux virus entériques et se comportent davantage comme des virus que comme des cellules bactériennes.', tone: 'cyan' },
        { label: 'Écart décisionnel', value: 'Absence d’E. coli', body: 'Un résultat négatif d’indicateur bactérien ne prouve pas automatiquement l’absence de virus infectieux.', tone: 'rose' },
        { label: 'Besoin opérationnel', value: 'UFP + traçabilité', body: 'Dénombrements, souches hôtes, fenêtres d’incubation et historique de revue exigent une traçabilité contrôlée.', tone: 'indigo' }
      ],
      comparisonTitle: 'Indicateurs bactériens versus indicateurs coliphages',
      comparison: [
        { label: 'E. coli / entérocoques', title: 'Très bon signal fécal, modèle viral plus faible', body: 'Utiles pour le contrôle bactérien courant, mais moins représentatifs de la résistance virale à la désinfection et de la persistance environnementale.', valuePercent: 45, tone: 'slate' },
        { label: 'Coliphages somatiques et F-spécifiques', title: 'Modèle opérationnel plus proche du comportement viral', body: 'Des bactériophages non enveloppés aident à discuter indicateurs viraux, performance de traitement et risque eau source.', valuePercent: 88, tone: 'cyan' }
      ],
      flowTitle: 'De la base scientifique au flux opérationnel',
      flow: [
        { title: 'Définir la question de surveillance', body: 'Distinguer dépistage fécal, preuve d’indicateur viral, validation traitement et reporting client.' },
        { title: 'Choisir la route coliphages', body: 'Cartographier flux somatiques ou F-spécifiques, volume, souche hôte, contrôles et langage d’acceptation.' },
        { title: 'Connecter produits et données', body: 'Relier kits, contrôles, dénombrements, revue et rapports dans AquaVerify Cloud.' },
        { title: 'Transformer l’intérêt en action', body: 'Orienter les lecteurs vers le bon devis produit, distributeur, OEM ou parcours démo SaaS avec un contexte clair pour l’échange suivant.' }
      ],
      timelineTitle: 'Chronologie du signal réglementaire',
      timeline: [
        { year: '1989', region: 'USA', sector: 'Performance de traitement', body: 'Les règles filtration et désinfection eau potable ont aidé à cadrer l’élimination des virus comme question opérationnelle.' },
        { year: '2000', region: 'ISO', sector: 'Dénombrement coliphages somatiques', body: 'ISO 10705-2 fournit un contexte standardisé pour détecter et dénombrer les coliphages somatiques.' },
        { year: '2001', region: 'EPA', sector: 'Méthodes 1601 / 1602', body: 'Les méthodes EPA formalisent les routes enrichissement et single agar layer pour coliphages F+ et somatiques.' },
        { year: '2020', region: 'UE', sector: 'Évaluation du risque eau potable', body: 'La directive (UE) 2020/2184 inclut les coliphages somatiques en surveillance opérationnelle de l’eau brute lorsque l’évaluation des risques l’indique.' }
      ],
      sourceLabel: 'Contexte directive (UE) 2020/2184, ISO 10705-2 et EPA Methods 1601/1602',
      note: 'Ce whitepaper est une orientation technique pour acheteurs B2B. Il ne remplace pas validation méthode, conseil juridique ou exigences d’autorité compétente.'
    },
    it: {
      title: 'Infografica: perché i colifagi sono un indicatore virale più solido',
      intro: 'Gli indicatori batterici tradizionali restano utili, ma non modellano pienamente persistenza, dimensione, comportamento al trattamento e resistenza dei virus enterici. I colifagi offrono ai laboratori un proxy più operativo per discutere rischio virale con metodi microbiologici misurabili.',
      metrics: [
        { label: 'Proxy virale', value: '20-100 nm', body: 'I colifagi hanno scala comparabile a molti virus enterici e si comportano più come virus che come cellule batteriche durante il trattamento.', tone: 'cyan' },
        { label: 'Gap decisionale', value: 'Assenza di E. coli', body: 'Un risultato negativo per indicatore batterico non prova automaticamente l’assenza di virus infettivi.', tone: 'rose' },
        { label: 'Bisogno operativo', value: 'PFU + custodia', body: 'Conteggi di placca, ceppi ospiti, finestre di incubazione e storico revisione richiedono tracciabilità controllata.', tone: 'indigo' }
      ],
      comparisonTitle: 'Indicatori batterici versus indicatori colifagi',
      comparison: [
        { label: 'E. coli / enterococchi', title: 'Ottimo segnale fecale, modello virale più debole', body: 'Utili per controllo batterico routinario, ma meno rappresentativi di resistenza virale a disinfezione e persistenza ambientale.', valuePercent: 45, tone: 'slate' },
        { label: 'Colifagi somatici e F-specifici', title: 'Modello operativo più vicino al comportamento virale', body: 'Batteriofagi non avvolti aiutano a discutere indicatori virali, performance del trattamento e rischio acqua sorgente.', valuePercent: 88, tone: 'cyan' }
      ],
      flowTitle: 'Dalla base scientifica al flusso operativo',
      flow: [
        { title: 'Definire la domanda di monitoraggio', body: 'Separare screening fecale, evidenza indicatore virale, validazione trattamento e reporting cliente.' },
        { title: 'Selezionare la rotta colifagi', body: 'Mappare flussi somatici o F-specifici, volume, ceppo ospite, controlli e linguaggio di accettazione.' },
        { title: 'Collegare prodotti e dati', body: 'Collegare kit, controlli, conteggi, revisione e report in AquaVerify Cloud.' },
        { title: 'Trasformare interesse in azione', body: 'Guidare i lettori verso il percorso giusto: preventivo, distributore, OEM o demo SaaS, con contesto chiaro per la conversazione successiva.' }
      ],
      timelineTitle: 'Timeline del segnale normativo',
      timeline: [
        { year: '1989', region: 'USA', sector: 'Performance trattamento', body: 'Le regole su filtrazione e disinfezione acqua potabile hanno inquadrato la rimozione dei virus come tema operativo.' },
        { year: '2000', region: 'ISO', sector: 'Enumerazione colifagi somatici', body: 'ISO 10705-2 offre contesto standardizzato per rilevare ed enumerare colifagi somatici.' },
        { year: '2001', region: 'EPA', sector: 'Metodi 1601 / 1602', body: 'I metodi EPA formalizzano rotte enrichment e single agar layer per colifagi F+ e somatici.' },
        { year: '2020', region: 'UE', sector: 'Valutazione rischio acqua potabile', body: 'La Direttiva (UE) 2020/2184 include colifagi somatici nel monitoraggio operativo dell’acqua grezza quando indicato dalla valutazione del rischio.' }
      ],
      sourceLabel: 'Contesto Direttiva (UE) 2020/2184, ISO 10705-2 ed EPA Methods 1601/1602',
      note: 'Questo whitepaper è orientamento tecnico per buyer B2B. Non sostituisce validazione metodo, consulenza legale o requisiti dell’autorità competente.'
    },
    ca: {
      title: 'Infografia: per què els colífags són un indicador viral més sòlid',
      intro: 'Els indicadors bacterians tradicionals continuen sent útils, però no modelen del tot persistència, mida, comportament davant el tractament ni resistència dels virus entèrics. Els colífags ofereixen als laboratoris un proxy més operatiu per parlar de risc viral amb mètodes mesurables.',
      metrics: [
        { label: 'Proxy viral', value: '20-100 nm', body: 'Els colífags tenen una escala comparable a molts virus entèrics i es comporten més com virus que com cèl·lules bacterianes durant el tractament.', tone: 'cyan' },
        { label: 'Bretxa de decisió', value: 'Absència d’E. coli', body: 'Un resultat negatiu en indicador bacterià no prova automàticament absència de virus infecciosos.', tone: 'rose' },
        { label: 'Necessitat operativa', value: 'UFP + custòdia', body: 'Recomptes de plaques, soques hoste, finestres d’incubació i historial de revisió necessiten traçabilitat controlada.', tone: 'indigo' }
      ],
      comparisonTitle: 'Indicadors bacterians davant indicadors colífags',
      comparison: [
        { label: 'E. coli / enterococs', title: 'Excel·lent senyal fecal, model viral més feble', body: 'Útils per al control bacterià rutinari, però menys representatius de resistència viral a desinfecció i persistència ambiental.', valuePercent: 45, tone: 'slate' },
        { label: 'Colífags somàtics i F-específics', title: 'Model operatiu més proper al comportament viral', body: 'Bacteriòfags sense embolcall que ajuden a discutir indicadors virals, eficàcia de tractament i risc d’aigua d’origen.', valuePercent: 88, tone: 'cyan' }
      ],
      flowTitle: 'De la base científica al flux operatiu',
      flow: [
        { title: 'Definir la pregunta de monitoratge', body: 'Separar cribratge fecal, evidència d’indicador viral, validació de tractament i reporting a client.' },
        { title: 'Seleccionar la ruta colífags', body: 'Mapar fluxos somàtics o F-específics, volum, soca hoste, controls i llenguatge d’acceptació.' },
        { title: 'Connectar productes i dades', body: 'Vincular kits, controls, recomptes, revisió i informes dins AquaVerify Cloud.' },
        { title: 'Convertir interès en acció', body: 'Guiar els lectors cap al pressupost, distribuïdor, OEM o demo SaaS adequats amb context clar per a la conversa següent.' }
      ],
      timelineTitle: 'Línia temporal de senyal normativa',
      timeline: [
        { year: '1989', region: 'EUA', sector: 'Eficàcia de tractament', body: 'Les regles de filtració i desinfecció d’aigua potable van ajudar a emmarcar eliminació de virus com a qüestió operativa.' },
        { year: '2000', region: 'ISO', sector: 'Enumeració de colífags somàtics', body: 'ISO 10705-2 aporta context estandarditzat per detectar i enumerar colífags somàtics.' },
        { year: '2001', region: 'EPA', sector: 'Mètodes 1601 / 1602', body: 'Els mètodes EPA formalitzen rutes d’enriquiment i single agar layer per a colífags F+ i somàtics.' },
        { year: '2020', region: 'UE', sector: 'Avaluació de risc en aigua potable', body: 'La Directiva (UE) 2020/2184 inclou colífags somàtics en monitoratge operatiu d’aigua bruta quan l’avaluació de riscos ho indica.' }
      ],
      sourceLabel: 'Context Directiva (UE) 2020/2184, ISO 10705-2 i EPA Methods 1601/1602',
      note: 'Aquest whitepaper és orientació tècnica per a compradors B2B. No substitueix validació de mètode, assessorament legal ni requisits d’autoritat competent.'
    }
  },
  software: {
    en: {
      title: 'Infographic: from manual records to automated compliance evidence',
      intro: 'Spreadsheets and fragmented databases make audits harder because sample identity, chain of custody, method context, review history and customer communication are separated. A connected software layer supports ISO/IEC 17025-style data integrity expectations and helps teams prepare electronic reporting workflows such as CROMERR in the United States or equivalent EU reporting mechanisms.',
      metrics: [
        { label: 'Core record', value: 'Chain of custody', body: 'Sampling point, operator, time, method route and reviewer history are captured together.', tone: 'cyan' },
        { label: 'Audit readiness', value: 'Traceable changes', body: 'Role-based access, version history and status changes reduce ambiguity during review.', tone: 'indigo' },
        { label: 'Operational response', value: 'Alerts', body: 'Out-of-spec events can trigger internal review before a customer or regulatory report is issued.', tone: 'rose' }
      ],
      comparisonTitle: 'Manual process versus connected workflow',
      comparison: [
        { label: 'Spreadsheet workflow', title: 'Fragmented evidence', body: 'Manual entry, disconnected files and unclear version history increase operational risk.', valuePercent: 38, tone: 'slate' },
        { label: 'AquaVerify Cloud workflow', title: 'Structured evidence layer', body: 'Samples, products, reports, CRM and customer portal activity share a single operational record.', valuePercent: 88, tone: 'emerald' }
      ],
      flowTitle: 'Digital chain of custody',
      flow: [
        { title: 'Field or lab sample intake', body: 'Capture sample metadata, source, account, requested parameter and responsible operator.' },
        { title: 'LIMS-style execution', body: 'Connect product, method context, controls, reviewer and result state.' },
        { title: 'Automated review signals', body: 'Flag out-of-spec or incomplete records for internal action.' },
        { title: 'Report and customer follow-up', body: 'Turn verified results into customer communication, recurring demand signals and better operational decisions.' }
      ],
      sourceLabel: 'ISO/IEC 17025 data integrity context and EPA CROMERR electronic reporting context',
      note: 'Software supports evidence discipline; it does not replace method validation, accreditation review or regulatory approval.'
    },
    es: {
      title: 'Infografía: de registros manuales a evidencia de cumplimiento automatizada',
      intro: 'Las hojas de cálculo y bases fragmentadas complican las auditorías porque identidad de muestra, cadena de custodia, método, historial de revisión y comunicación cliente quedan separados. Una capa software conectada ayuda a sostener expectativas de integridad de datos tipo ISO/IEC 17025 y prepara flujos de reporte electrónico como CROMERR en Estados Unidos o mecanismos equivalentes en la UE.',
      metrics: [
        { label: 'Registro central', value: 'Cadena de custodia', body: 'Punto de muestreo, operador, hora, ruta metodológica e historial de revisión se capturan juntos.', tone: 'cyan' },
        { label: 'Preparación auditoría', value: 'Cambios trazables', body: 'Acceso por roles, versiones y cambios de estado reducen ambigüedad durante la revisión.', tone: 'indigo' },
        { label: 'Respuesta operativa', value: 'Alertas', body: 'Eventos fuera de especificación pueden activar revisión interna antes del informe final.', tone: 'rose' }
      ],
      comparisonTitle: 'Proceso manual frente a flujo conectado',
      comparison: [
        { label: 'Flujo con hoja de cálculo', title: 'Evidencia fragmentada', body: 'Entrada manual, archivos desconectados e historial de versión poco claro aumentan el riesgo operativo.', valuePercent: 38, tone: 'slate' },
        { label: 'Flujo AquaVerify Cloud', title: 'Capa de evidencia estructurada', body: 'Muestras, productos, informes, CRM y portal cliente comparten un mismo registro operativo.', valuePercent: 88, tone: 'emerald' }
      ],
      flowTitle: 'Cadena de custodia digital',
      flow: [
        { title: 'Entrada de muestra campo/lab', body: 'Capturar metadatos, origen, cuenta, parámetro solicitado y operador responsable.' },
        { title: 'Ejecución tipo LIMS', body: 'Conectar producto, contexto de método, controles, revisor y estado del resultado.' },
        { title: 'Señales automáticas', body: 'Marcar registros incompletos o fuera de especificación para acción interna.' },
        { title: 'Informe y seguimiento de cliente', body: 'Convertir resultados verificados en comunicación cliente, señales de demanda recurrente y mejores decisiones operativas.' }
      ],
      sourceLabel: 'Contexto ISO/IEC 17025 de integridad de datos y contexto EPA CROMERR de reporte electrónico',
      note: 'El software apoya la disciplina de evidencia; no sustituye validación de método, revisión de acreditación ni aprobación regulatoria.'
    },
    fr: {
      title: 'Infographie: des registres manuels à la preuve de conformité automatisée',
      intro: 'Tableurs et bases fragmentées compliquent les audits car identité échantillon, chaîne de possession, méthode, historique de revue et communication client sont séparés. Une couche logicielle connectée soutient les attentes d’intégrité des données de type ISO/IEC 17025 et prépare les flux de reporting électronique comme CROMERR aux États-Unis ou mécanismes équivalents en Europe.',
      metrics: [
        { label: 'Registre central', value: 'Chaîne de possession', body: 'Point de prélèvement, opérateur, heure, route méthode et historique de revue sont capturés ensemble.', tone: 'cyan' },
        { label: 'Audit ready', value: 'Changements traçables', body: 'Accès par rôles, versions et changements de statut réduisent l’ambiguïté en revue.', tone: 'indigo' },
        { label: 'Réponse opérationnelle', value: 'Alertes', body: 'Les événements hors spécification peuvent déclencher une revue interne avant le rapport final.', tone: 'rose' }
      ],
      comparisonTitle: 'Processus manuel versus flux connecté',
      comparison: [
        { label: 'Flux tableur', title: 'Preuve fragmentée', body: 'Saisie manuelle, fichiers déconnectés et historique de version flou augmentent le risque opérationnel.', valuePercent: 38, tone: 'slate' },
        { label: 'Flux AquaVerify Cloud', title: 'Couche de preuve structurée', body: 'Échantillons, produits, rapports, CRM et portail client partagent un même registre opérationnel.', valuePercent: 88, tone: 'emerald' }
      ],
      flowTitle: 'Chaîne de possession numérique',
      flow: [
        { title: 'Entrée échantillon terrain/lab', body: 'Capturer métadonnées, origine, compte, paramètre demandé et opérateur responsable.' },
        { title: 'Exécution type LIMS', body: 'Relier produit, contexte méthode, contrôles, relecteur et état du résultat.' },
        { title: 'Signaux automatiques', body: 'Signaler les registres incomplets ou hors spécification pour action interne.' },
        { title: 'Rapport et suivi client', body: 'Transformer les résultats vérifiés en communication client, signaux de demande récurrente et meilleures décisions opérationnelles.' }
      ],
      sourceLabel: 'Contexte ISO/IEC 17025 intégrité des données et contexte EPA CROMERR reporting électronique',
      note: 'Le logiciel soutient la discipline de preuve; il ne remplace pas validation méthode, revue d’accréditation ou approbation réglementaire.'
    },
    it: {
      title: 'Infografica: dai registri manuali all’evidenza di conformità automatizzata',
      intro: 'Fogli di calcolo e database frammentati complicano gli audit perché identità campione, catena di custodia, metodo, storico revisione e comunicazione cliente sono separati. Un livello software collegato supporta aspettative di integrità dati tipo ISO/IEC 17025 e prepara flussi di reporting elettronico come CROMERR negli Stati Uniti o meccanismi equivalenti UE.',
      metrics: [
        { label: 'Record centrale', value: 'Catena di custodia', body: 'Punto di campionamento, operatore, ora, percorso metodo e storico revisione sono acquisiti insieme.', tone: 'cyan' },
        { label: 'Audit readiness', value: 'Cambi tracciabili', body: 'Accesso per ruoli, versioni e cambi stato riducono ambiguità in revisione.', tone: 'indigo' },
        { label: 'Risposta operativa', value: 'Alert', body: 'Eventi fuori specifica possono attivare revisione interna prima del report finale.', tone: 'rose' }
      ],
      comparisonTitle: 'Processo manuale versus flusso collegato',
      comparison: [
        { label: 'Flusso spreadsheet', title: 'Evidenza frammentata', body: 'Inserimento manuale, file scollegati e storico versione poco chiaro aumentano il rischio operativo.', valuePercent: 38, tone: 'slate' },
        { label: 'Flusso AquaVerify Cloud', title: 'Livello di evidenza strutturato', body: 'Campioni, prodotti, report, CRM e portale cliente condividono un unico record operativo.', valuePercent: 88, tone: 'emerald' }
      ],
      flowTitle: 'Catena di custodia digitale',
      flow: [
        { title: 'Ingresso campione campo/lab', body: 'Acquisire metadati, origine, account, parametro richiesto e operatore responsabile.' },
        { title: 'Esecuzione tipo LIMS', body: 'Collegare prodotto, contesto metodo, controlli, revisore e stato risultato.' },
        { title: 'Segnali automatici', body: 'Segnalare record incompleti o fuori specifica per azione interna.' },
        { title: 'Report e follow-up cliente', body: 'Trasformare risultati verificati in comunicazione cliente, segnali di domanda ricorrente e migliori decisioni operative.' }
      ],
      sourceLabel: 'Contesto ISO/IEC 17025 integrità dati e contesto EPA CROMERR reporting elettronico',
      note: 'Il software supporta la disciplina dell’evidenza; non sostituisce validazione metodo, revisione accreditamento o approvazione normativa.'
    },
    ca: {
      title: 'Infografia: de registres manuals a evidència de compliment automatitzada',
      intro: 'Els fulls de càlcul i bases fragmentades compliquen auditories perquè identitat de mostra, cadena de custòdia, mètode, historial de revisió i comunicació client queden separats. Una capa software connectada ajuda a sostenir expectatives d’integritat de dades tipus ISO/IEC 17025 i prepara fluxos de report electrònic com CROMERR als Estats Units o mecanismes equivalents a la UE.',
      metrics: [
        { label: 'Registre central', value: 'Cadena de custòdia', body: 'Punt de mostreig, operador, hora, ruta metodològica i historial de revisió es capturen junts.', tone: 'cyan' },
        { label: 'Preparació auditoria', value: 'Canvis traçables', body: 'Accés per rols, versions i canvis d’estat redueixen ambigüitat durant la revisió.', tone: 'indigo' },
        { label: 'Resposta operativa', value: 'Alertes', body: 'Esdeveniments fora d’especificació poden activar revisió interna abans de l’informe final.', tone: 'rose' }
      ],
      comparisonTitle: 'Procés manual davant flux connectat',
      comparison: [
        { label: 'Flux amb full de càlcul', title: 'Evidència fragmentada', body: 'Entrada manual, arxius desconnectats i historial de versió poc clar augmenten el risc operatiu.', valuePercent: 38, tone: 'slate' },
        { label: 'Flux AquaVerify Cloud', title: 'Capa d’evidència estructurada', body: 'Mostres, productes, informes, CRM i portal client comparteixen un mateix registre operatiu.', valuePercent: 88, tone: 'emerald' }
      ],
      flowTitle: 'Cadena de custòdia digital',
      flow: [
        { title: 'Entrada de mostra camp/lab', body: 'Capturar metadades, origen, compte, paràmetre sol·licitat i operador responsable.' },
        { title: 'Execució tipus LIMS', body: 'Connectar producte, context de mètode, controls, revisor i estat del resultat.' },
        { title: 'Senyals automàtics', body: 'Marcar registres incomplets o fora d’especificació per a acció interna.' },
        { title: 'Informe i seguiment de client', body: 'Convertir resultats verificats en comunicació client, senyals de demanda recurrent i millors decisions operatives.' }
      ],
      sourceLabel: 'Context ISO/IEC 17025 d’integritat de dades i context EPA CROMERR de report electrònic',
      note: 'El software dona suport a la disciplina d’evidència; no substitueix validació de mètode, revisió d’acreditació ni aprovació regulatòria.'
    }
  },
  us: {
    en: {
      title: 'Infographic: RTCR compliance and the coliphage monitoring layer',
      intro: 'The Revised Total Coliform Rule remains the core US drinking water framework for total coliform and E. coli monitoring. Coliphage methods sit in a related but separate microbiology layer that can help teams evaluate viral indicator questions, especially in ground-water and under-treated source contexts.',
      metrics: [
        { label: 'RTCR focus', value: 'Total coliform + E. coli', body: 'Public water systems monitor according to a sample siting plan and schedule.', tone: 'slate' },
        { label: 'EPA methods', value: '1601 / 1602', body: 'Method context for male-specific and somatic coliphage monitoring and enumeration.', tone: 'cyan' },
        { label: 'Buyer need', value: 'Guidance', body: 'Visitors researching RTCR and EPA methods often need product, SaaS or distributor guidance.', tone: 'indigo' }
      ],
      comparisonTitle: 'Bacterial compliance versus viral indicator context',
      comparison: [
        { label: 'RTCR bacterial indicators', title: 'Compliance backbone', body: 'Total coliform and E. coli monitoring support assessment of distribution integrity and fecal contamination signals.', valuePercent: 68, tone: 'slate' },
        { label: 'Coliphage indicator methods', title: 'Additional viral-risk context', body: 'Somatic and F-specific coliphages can support discussion of viral contamination risk and treatment resilience.', valuePercent: 82, tone: 'cyan' }
      ],
      flowTitle: 'How to structure a US-oriented decision path',
      flow: [
        { title: 'Educate', body: 'Clarify RTCR obligations separately from coliphage method opportunities.' },
        { title: 'Match the need', body: 'Understand whether the visitor is a utility, laboratory, distributor or quality team.' },
        { title: 'Move to next step', body: 'Guide the visitor to products, datasheets, SaaS demo or customer follow-up.' }
      ],
      sourceLabel: 'EPA RTCR, Ground Water Rule and Methods 1601/1602 context',
      note: 'This page does not state that coliphage testing replaces RTCR obligations; it positions coliphages as a related monitoring and method-readiness topic.'
    },
    es: {
      title: 'Infografía: cumplimiento RTCR y capa de monitorización de colífagos',
      intro: 'La Revised Total Coliform Rule sigue siendo el marco central de agua potable en Estados Unidos para monitorizar coliformes totales y E. coli. Los métodos de colífagos pertenecen a una capa microbiológica relacionada pero separada, útil para evaluar indicadores virales, especialmente en agua subterránea o fuentes con tratamiento insuficiente.',
      metrics: [
        { label: 'Foco RTCR', value: 'Coliformes + E. coli', body: 'Los sistemas públicos monitorizan según plan y calendario de puntos de muestreo.', tone: 'slate' },
        { label: 'Métodos EPA', value: '1601 / 1602', body: 'Contexto metodológico para monitorización y enumeración de colífagos F+ y somáticos.', tone: 'cyan' },
        { label: 'Necesidad del comprador', value: 'Orientación', body: 'Quien investiga RTCR y métodos EPA suele necesitar orientación de producto, SaaS o distribución.', tone: 'indigo' }
      ],
      comparisonTitle: 'Cumplimiento bacteriano frente a contexto de indicador viral',
      comparison: [
        { label: 'Indicadores bacterianos RTCR', title: 'Base de cumplimiento', body: 'Coliformes totales y E. coli apoyan la evaluación de integridad de distribución y señales de contaminación fecal.', valuePercent: 68, tone: 'slate' },
        { label: 'Métodos indicadores colífagos', title: 'Contexto adicional de riesgo viral', body: 'Colífagos somáticos y F+ ayudan a discutir riesgo de contaminación viral y resiliencia del tratamiento.', valuePercent: 82, tone: 'cyan' }
      ],
      flowTitle: 'Cómo estructurar una ruta de decisión orientada a EEUU',
      flow: [
        { title: 'Educar', body: 'Separar claramente obligaciones RTCR de oportunidades metodológicas con colífagos.' },
        { title: 'Entender la necesidad', body: 'Identificar si el visitante es una utility, laboratorio, distribuidor o equipo de calidad.' },
        { title: 'Pasar al siguiente paso', body: 'Guiar al visitante hacia productos, datasheets, demo SaaS o seguimiento de clientes.' }
      ],
      sourceLabel: 'Contexto EPA RTCR, Ground Water Rule y Methods 1601/1602',
      note: 'Esta página no afirma que los colífagos sustituyan obligaciones RTCR; los posiciona como tema relacionado de monitorización y preparación metodológica.'
    },
    fr: {
      title: 'Infographie: conformité RTCR et couche de surveillance coliphages',
      intro: 'La Revised Total Coliform Rule reste le cadre central de l’eau potable aux États-Unis pour surveiller coliformes totaux et E. coli. Les méthodes coliphages appartiennent à une couche microbiologique liée mais séparée, utile pour évaluer les indicateurs viraux, surtout en eau souterraine ou sources insuffisamment traitées.',
      metrics: [
        { label: 'Focus RTCR', value: 'Coliformes + E. coli', body: 'Les systèmes publics surveillent selon plan et calendrier de points de prélèvement.', tone: 'slate' },
        { label: 'Méthodes EPA', value: '1601 / 1602', body: 'Contexte méthode pour surveillance et dénombrement des coliphages F+ et somatiques.', tone: 'cyan' },
        { label: 'Besoin acheteur', value: 'Orientation', body: 'Les visiteurs recherchant RTCR et méthodes EPA ont souvent besoin d’orientation produit, SaaS ou distribution.', tone: 'indigo' }
      ],
      comparisonTitle: 'Conformité bactérienne versus contexte indicateur viral',
      comparison: [
        { label: 'Indicateurs bactériens RTCR', title: 'Base de conformité', body: 'Coliformes totaux et E. coli soutiennent l’évaluation de l’intégrité distribution et des signaux de contamination fécale.', valuePercent: 68, tone: 'slate' },
        { label: 'Méthodes indicateurs coliphages', title: 'Contexte additionnel de risque viral', body: 'Coliphages somatiques et F+ aident à discuter risque viral et résilience du traitement.', valuePercent: 82, tone: 'cyan' }
      ],
      flowTitle: 'Structurer un parcours de décision orienté États-Unis',
      flow: [
        { title: 'Éduquer', body: 'Distinguer obligations RTCR et opportunités méthode coliphages.' },
        { title: 'Comprendre le besoin', body: 'Identifier si le visiteur est une utility, un laboratoire, un distributeur ou une équipe qualité.' },
        { title: 'Passer à l’étape suivante', body: 'Orienter le visiteur vers produits, datasheets, démo SaaS ou suivi client.' }
      ],
      sourceLabel: 'Contexte EPA RTCR, Ground Water Rule et Methods 1601/1602',
      note: 'Cette page ne dit pas que les coliphages remplacent la RTCR; elle les positionne comme sujet lié de surveillance et préparation méthode.'
    },
    it: {
      title: 'Infografica: conformità RTCR e livello di monitoraggio colifagi',
      intro: 'La Revised Total Coliform Rule resta il quadro centrale per acqua potabile negli Stati Uniti per monitorare coliformi totali ed E. coli. I metodi colifagi appartengono a un livello microbiologico correlato ma separato, utile per valutare indicatori virali, soprattutto in acque sotterranee o fonti sotto-trattate.',
      metrics: [
        { label: 'Focus RTCR', value: 'Coliformi + E. coli', body: 'I sistemi pubblici monitorano secondo piano e calendario dei punti di campionamento.', tone: 'slate' },
        { label: 'Metodi EPA', value: '1601 / 1602', body: 'Contesto metodo per monitoraggio ed enumerazione di colifagi F+ e somatici.', tone: 'cyan' },
        { label: 'Esigenza buyer', value: 'Orientamento', body: 'Chi ricerca RTCR e metodi EPA spesso richiede orientamento su prodotto, SaaS o distribuzione.', tone: 'indigo' }
      ],
      comparisonTitle: 'Conformità batterica versus contesto indicatore virale',
      comparison: [
        { label: 'Indicatori batterici RTCR', title: 'Base di conformità', body: 'Coliformi totali ed E. coli supportano valutazione integrità distribuzione e segnali di contaminazione fecale.', valuePercent: 68, tone: 'slate' },
        { label: 'Metodi indicatori colifagi', title: 'Contesto aggiuntivo di rischio virale', body: 'Colifagi somatici e F+ aiutano a discutere rischio virale e resilienza del trattamento.', valuePercent: 82, tone: 'cyan' }
      ],
      flowTitle: 'Come strutturare un percorso decisionale orientato USA',
      flow: [
        { title: 'Educare', body: 'Separare obblighi RTCR da opportunità metodologiche con colifagi.' },
        { title: 'Capire l’esigenza', body: 'Identificare se il visitatore è utility, laboratorio, distributore o team qualità.' },
        { title: 'Passare al prossimo passo', body: 'Guidare il visitatore verso prodotti, datasheet, demo SaaS o follow-up cliente.' }
      ],
      sourceLabel: 'Contesto EPA RTCR, Ground Water Rule e Methods 1601/1602',
      note: 'Questa pagina non afferma che i colifagi sostituiscano obblighi RTCR; li posiziona come tema collegato di monitoraggio e preparazione metodo.'
    },
    ca: {
      title: 'Infografia: compliment RTCR i capa de monitoratge de colífags',
      intro: 'La Revised Total Coliform Rule continua sent el marc central d’aigua potable als Estats Units per monitorar coliformes totals i E. coli. Els mètodes de colífags formen una capa microbiològica relacionada però separada, útil per avaluar indicadors virals, especialment en aigua subterrània o fonts amb tractament insuficient.',
      metrics: [
        { label: 'Focus RTCR', value: 'Coliformes + E. coli', body: 'Els sistemes públics monitoren segons pla i calendari de punts de mostreig.', tone: 'slate' },
        { label: 'Mètodes EPA', value: '1601 / 1602', body: 'Context metodològic per a monitoratge i enumeració de colífags F+ i somàtics.', tone: 'cyan' },
        { label: 'Necessitat del comprador', value: 'Orientació', body: 'Els visitants que investiguen RTCR i mètodes EPA sovint necessiten orientació de producte, SaaS o distribució.', tone: 'indigo' }
      ],
      comparisonTitle: 'Compliment bacterià davant context d’indicador viral',
      comparison: [
        { label: 'Indicadors bacterians RTCR', title: 'Base de compliment', body: 'Coliformes totals i E. coli donen suport a l’avaluació d’integritat de distribució i senyals de contaminació fecal.', valuePercent: 68, tone: 'slate' },
        { label: 'Mètodes indicadors colífags', title: 'Context addicional de risc viral', body: 'Colífags somàtics i F+ ajuden a discutir risc viral i resiliència del tractament.', valuePercent: 82, tone: 'cyan' }
      ],
      flowTitle: 'Com estructurar una ruta de decisió orientada als EUA',
      flow: [
        { title: 'Educar', body: 'Separar obligacions RTCR d’oportunitats metodològiques amb colífags.' },
        { title: 'Entendre la necessitat', body: 'Identificar si el visitant és una utility, laboratori, distribuïdor o equip de qualitat.' },
        { title: 'Passar al següent pas', body: 'Guiar el visitant cap a productes, datasheets, demo SaaS o seguiment de clients.' }
      ],
      sourceLabel: 'Context EPA RTCR, Ground Water Rule i Methods 1601/1602',
      note: 'Aquesta pàgina no afirma que els colífags substitueixin obligacions RTCR; els posiciona com a tema relacionat de monitoratge i preparació metodològica.'
    }
  }
};

function whitepaperDeepDive(key, lang) {
  return WHITEPAPER_DEEP_DIVES[key]?.[lang] || WHITEPAPER_DEEP_DIVES[key]?.en;
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

function page(id, category, primaryIntent, translations, meta = {}) {
  return { id, category, primaryIntent, translations: withDefaultFaqs(translations, category), ...meta };
}

export const MARKETING_PAGES = [
  page('products', 'products', 'quote', {
    en: locale('/products', 'Water microbiology products connected to digital traceability', 'Explore AquaVerify kits, lab essentials and connected workflows for water quality analysis.', [
      section('A portfolio built for technical buyers', 'AquaVerify combines quantitative kits, presence/absence tests, ISO/EPA-oriented workflows and laboratory essentials in one product ecosystem.', ['ENUMERA for enumeration workflows', 'INDICA for rapid presence/absence screening', 'Standard kits for ISO and EPA workflows', 'Lab Essentials for daily microbiology operations']),
      section('Products that open the digital workflow', 'Product use can be connected to AquaVerify Cloud for sample traceability, reporting, CRM and customer portal workflows.')
    ], { eyebrow: 'Products', primaryCta: 'Request product quote', secondaryCta: 'Explore platform', seoTitle: 'Water Testing Products | AquaVerify ENUMERA, INDICA and Lab Essentials', ...getProductAssetOptions('products', 'en', 'AquaVerify water microbiology product ecosystem') }),
    es: locale('/es/productos', 'Productos de microbiología del agua conectados a trazabilidad digital', 'Descubre kits AquaVerify, material esencial de laboratorio y flujos conectados para análisis de calidad del agua.', [
      section('Una gama creada para compradores técnicos', 'AquaVerify combina kits cuantitativos, pruebas de presencia/ausencia, flujos orientados a ISO/EPA y productos esenciales de laboratorio en un mismo ecosistema.', ['ENUMERA para flujos de enumeración', 'INDICA para cribado rápido presencia/ausencia', 'Kits estándar para flujos ISO y EPA', 'Lab Essentials para la operación diaria de microbiología']),
      section('Productos que abren el flujo digital', 'El uso de productos puede conectarse a AquaVerify Cloud para trazabilidad de muestras, reporting, CRM y portal cliente.')
    ], { eyebrow: 'Productos', primaryCta: 'Solicitar cotización', secondaryCta: 'Ver plataforma', seoTitle: 'Productos de análisis de agua | AquaVerify ENUMERA, INDICA y Lab Essentials', ...getProductAssetOptions('products', 'es', 'Ecosistema de productos AquaVerify para microbiologia del agua') }),
    fr: locale('/fr/produits', 'Produits de microbiologie de l’eau connectés à la traçabilité numérique', 'Découvrez les kits AquaVerify, les essentiels de laboratoire et les flux connectés pour l’analyse de la qualité de l’eau.', [
      section('Une gamme pensée pour les acheteurs techniques', 'AquaVerify réunit kits quantitatifs, tests présence/absence, flux orientés ISO/EPA et essentiels de laboratoire dans un même écosystème.', ['ENUMERA pour les flux de dénombrement', 'INDICA pour le dépistage présence/absence', 'Kits standard pour les flux ISO et EPA', 'Lab Essentials pour la microbiologie quotidienne']),
      section('Des produits qui ouvrent le flux numérique', 'L’utilisation des produits peut être connectée à AquaVerify Cloud pour la traçabilité des échantillons, les rapports, le CRM et le portail client.')
    ], { eyebrow: 'Produits', primaryCta: 'Demander un devis', secondaryCta: 'Voir la plateforme', seoTitle: 'Produits d’analyse de l’eau | AquaVerify ENUMERA, INDICA et Lab Essentials', ...getProductAssetOptions('products', 'fr', 'Ecosysteme de produits AquaVerify pour microbiologie de l eau') }),
    it: locale('/it/prodotti', 'Prodotti di microbiologia dell’acqua con tracciabilità digitale', 'Esplora kit AquaVerify, materiali essenziali di laboratorio e flussi collegati per l’analisi della qualità dell’acqua.', [
      section('Una gamma pensata per acquirenti tecnici', 'AquaVerify combina kit quantitativi, test presenza/assenza, flussi orientati a ISO/EPA e materiali essenziali di laboratorio in un unico ecosistema.', ['ENUMERA per flussi di enumerazione', 'INDICA per screening presenza/assenza', 'Kit standard per flussi ISO ed EPA', 'Lab Essentials per la microbiologia quotidiana']),
      section('Prodotti che aprono il flusso digitale', 'L’uso dei prodotti può collegarsi ad AquaVerify Cloud per tracciabilità campioni, reporting, CRM e portale clienti.')
    ], { eyebrow: 'Prodotti', primaryCta: 'Richiedi preventivo', secondaryCta: 'Vedi piattaforma', seoTitle: 'Prodotti per analisi dell’acqua | AquaVerify ENUMERA, INDICA e Lab Essentials', ...getProductAssetOptions('products', 'it', 'Ecosistema prodotti AquaVerify per microbiologia dell acqua') }),
    ca: locale('/ca/productes', 'Productes de microbiologia de l’aigua connectats a traçabilitat digital', 'Descobreix kits AquaVerify, material essencial de laboratori i fluxos connectats per a l’anàlisi de qualitat de l’aigua.', [
      section('Una gamma creada per a compradors tècnics', 'AquaVerify combina kits quantitatius, proves de presència/absència, fluxos orientats a ISO/EPA i productes essencials de laboratori en un mateix ecosistema.', ['ENUMERA per a fluxos d’enumeració', 'INDICA per a cribratge ràpid presència/absència', 'Kits estàndard per a fluxos ISO i EPA', 'Lab Essentials per a l’operació diària de microbiologia']),
      section('Productes que obren el flux digital', 'L’ús dels productes es pot connectar a AquaVerify Cloud per a traçabilitat de mostres, reporting, CRM i portal client.')
    ], { eyebrow: 'Productes', primaryCta: 'Sol·licitar pressupost', secondaryCta: 'Veure plataforma', seoTitle: 'Productes d’anàlisi d’aigua | AquaVerify ENUMERA, INDICA i Lab Essentials', ...getProductAssetOptions('products', 'ca', 'Ecosistema de productes AquaVerify per microbiologia de l aigua') })
  }),
  page('enumera', 'products', 'quote', {
    en: locale('/products/enumera', 'ENUMERA quantitative water microbiology kits', 'ENUMERA is the AquaVerify family for enumeration workflows in water microbiology.', [
      section('Built for counting, not guessing', 'ENUMERA is designed for quantitative workflows where laboratories need clear, repeatable and traceable results.', ['ENUMERA Soma100 for somatic coliphage workflows', 'ENUMERA Coli100 for bacterial indicator workflows', 'ENUMERA Entero100 for bacterial indicator workflows', 'Refills and tools for repeatable operation']),
      section('Connected to AquaVerify Cloud', 'Results, operators, sample context and reporting can be linked to the digital platform.')
    ], { eyebrow: 'ENUMERA', primaryCta: 'Request ENUMERA quote', secondaryCta: 'View all products', ...getProductAssetOptions('enumera', 'en', 'AquaVerify ENUMERA quantitative kit family'), heroVideo: ENUMERA_HERO_VIDEO, gallery: enumeraGallery('en') }),
    es: locale('/es/productos/enumera', 'Kits cuantitativos ENUMERA para microbiología del agua', 'ENUMERA es la familia AquaVerify para flujos de enumeración en microbiología del agua.', [
      section('Diseñada para contar, no para adivinar', 'ENUMERA está pensada para flujos cuantitativos donde el laboratorio necesita resultados claros, repetibles y trazables.', ['ENUMERA Soma100 para flujos de colífagos somáticos', 'ENUMERA Coli100 para indicadores bacterianos', 'ENUMERA Entero100 para indicadores bacterianos', 'Refills y herramientas para operación repetible']),
      section('Conectada a AquaVerify Cloud', 'Resultados, operadores, contexto de muestra e informes pueden vincularse a la plataforma digital.')
    ], { eyebrow: 'ENUMERA', primaryCta: 'Solicitar cotización ENUMERA', secondaryCta: 'Ver productos', ...getProductAssetOptions('enumera', 'es', 'Familia de kits cuantitativos AquaVerify ENUMERA'), heroVideo: ENUMERA_HERO_VIDEO, gallery: enumeraGallery('es') }),
    fr: locale('/fr/produits/enumera', 'Kits quantitatifs ENUMERA pour la microbiologie de l’eau', 'ENUMERA est la famille AquaVerify dédiée aux flux de dénombrement en microbiologie de l’eau.', [
      section('Conçu pour compter, pas pour deviner', 'ENUMERA répond aux flux quantitatifs où le laboratoire a besoin de résultats clairs, reproductibles et traçables.', ['ENUMERA Soma100 pour les coliphages somatiques', 'ENUMERA Coli100 pour les indicateurs bactériens', 'ENUMERA Entero100 pour les indicateurs bactériens', 'Recharges et outils pour une opération répétable']),
      section('Connecté à AquaVerify Cloud', 'Résultats, opérateurs, contexte d’échantillon et rapports peuvent être reliés à la plateforme numérique.')
    ], { eyebrow: 'ENUMERA', primaryCta: 'Demander un devis ENUMERA', secondaryCta: 'Voir les produits', ...getProductAssetOptions('enumera', 'fr', 'Famille de kits quantitatifs AquaVerify ENUMERA'), heroVideo: ENUMERA_HERO_VIDEO, gallery: enumeraGallery('fr') }),
    it: locale('/it/prodotti/enumera', 'Kit quantitativi ENUMERA per microbiologia dell’acqua', 'ENUMERA è la famiglia AquaVerify per flussi di enumerazione nella microbiologia dell’acqua.', [
      section('Creato per contare, non per indovinare', 'ENUMERA è pensato per flussi quantitativi in cui il laboratorio richiede risultati chiari, ripetibili e tracciabili.', ['ENUMERA Soma100 per colifagi somatici', 'ENUMERA Coli100 per indicatori batterici', 'ENUMERA Entero100 per indicatori batterici', 'Refill e strumenti per operazioni ripetibili']),
      section('Collegato ad AquaVerify Cloud', 'Risultati, operatori, contesto del campione e report possono essere collegati alla piattaforma digitale.')
    ], { eyebrow: 'ENUMERA', primaryCta: 'Richiedi preventivo ENUMERA', secondaryCta: 'Vedi prodotti', ...getProductAssetOptions('enumera', 'it', 'Famiglia kit quantitativi AquaVerify ENUMERA'), heroVideo: ENUMERA_HERO_VIDEO, gallery: enumeraGallery('it') }),
    ca: locale('/ca/productes/enumera', 'Kits quantitatius ENUMERA per a microbiologia de l’aigua', 'ENUMERA és la família AquaVerify per a fluxos d’enumeració en microbiologia de l’aigua.', [
      section('Dissenyada per comptar, no per endevinar', 'ENUMERA està pensada per a fluxos quantitatius on el laboratori necessita resultats clars, repetibles i traçables.', ['ENUMERA Soma100 per a colífags somàtics', 'ENUMERA Coli100 per a indicadors bacterians', 'ENUMERA Entero100 per a indicadors bacterians', 'Refills i eines per a operació repetible']),
      section('Connectada a AquaVerify Cloud', 'Resultats, operadors, context de mostra i informes es poden vincular a la plataforma digital.')
    ], { eyebrow: 'ENUMERA', primaryCta: 'Sol·licitar pressupost ENUMERA', secondaryCta: 'Veure productes', ...getProductAssetOptions('enumera', 'ca', 'Familia de kits quantitatius AquaVerify ENUMERA'), heroVideo: ENUMERA_HERO_VIDEO, gallery: enumeraGallery('ca') })
  }),
  page('indica', 'products', 'quote', {
    en: locale('/products/indica', 'INDICA presence/absence water testing kits', 'INDICA is designed for fast qualitative water microbiology workflows where the answer must be clear: present or absent.', [
      section('Clear screening workflows', 'INDICA supports rapid decision making for laboratories, field teams and quality control teams.', ['Somatic coliphage presence/absence', 'E. coli presence/absence', 'Enterococci presence/absence', 'Colorimetric matching tools']),
      section('From test to traceable record', 'INDICA workflows can feed AquaVerify Cloud so each result is linked to sample, site, operator and report.')
    ], { eyebrow: 'INDICA', primaryCta: 'Request INDICA quote', secondaryCta: 'Explore platform', ...getProductAssetOptions('indica', 'en', 'AquaVerify INDICA presence absence kit family') }),
    es: locale('/es/productos/indica', 'Kits INDICA de presencia/ausencia para análisis de agua', 'INDICA está diseñada para flujos cualitativos rápidos en microbiología del agua donde la respuesta debe ser clara: presente o ausente.', [
      section('Cribado claro y operativo', 'INDICA ayuda a tomar decisiones rápidas en laboratorios, equipos de campo y control de calidad.', ['Presencia/ausencia de colífagos somáticos', 'Presencia/ausencia de E. coli', 'Presencia/ausencia de enterococos', 'Herramientas de comparación colorimétrica']),
      section('Del test al registro trazable', 'Los flujos INDICA pueden alimentar AquaVerify Cloud para vincular resultado, muestra, punto, operador e informe.')
    ], { eyebrow: 'INDICA', primaryCta: 'Solicitar cotización INDICA', secondaryCta: 'Explorar plataforma', ...getProductAssetOptions('indica', 'es', 'Familia de kits presencia ausencia AquaVerify INDICA') }),
    fr: locale('/fr/produits/indica', 'Kits INDICA présence/absence pour l’analyse de l’eau', 'INDICA est conçu pour les flux qualitatifs rapides en microbiologie de l’eau où la réponse doit être claire: présent ou absent.', [
      section('Des flux de dépistage clairs', 'INDICA aide les laboratoires, équipes terrain et équipes qualité à décider rapidement.', ['Présence/absence de coliphages somatiques', 'Présence/absence d’E. coli', 'Présence/absence d’entérocoques', 'Outils de comparaison colorimétrique']),
      section('Du test au registre traçable', 'Les flux INDICA peuvent alimenter AquaVerify Cloud afin de relier résultat, échantillon, site, opérateur et rapport.')
    ], { eyebrow: 'INDICA', primaryCta: 'Demander un devis INDICA', secondaryCta: 'Explorer la plateforme', ...getProductAssetOptions('indica', 'fr', 'Famille de kits presence absence AquaVerify INDICA') }),
    it: locale('/it/prodotti/indica', 'Kit INDICA presenza/assenza per analisi dell’acqua', 'INDICA è progettata per flussi qualitativi rapidi in microbiologia dell’acqua, dove la risposta deve essere chiara: presente o assente.', [
      section('Workflow di screening chiari', 'INDICA supporta decisioni rapide per laboratori, squadre sul campo e controllo qualità.', ['Presenza/assenza di colifagi somatici', 'Presenza/assenza di E. coli', 'Presenza/assenza di enterococchi', 'Strumenti di confronto colorimetrico']),
      section('Dal test al record tracciabile', 'I flussi INDICA possono alimentare AquaVerify Cloud collegando risultato, campione, sito, operatore e report.')
    ], { eyebrow: 'INDICA', primaryCta: 'Richiedi preventivo INDICA', secondaryCta: 'Esplora piattaforma', ...getProductAssetOptions('indica', 'it', 'Famiglia kit presenza assenza AquaVerify INDICA') }),
    ca: locale('/ca/productes/indica', 'Kits INDICA de presència/absència per a anàlisi d’aigua', 'INDICA està dissenyada per a fluxos qualitatius ràpids en microbiologia de l’aigua on la resposta ha de ser clara: present o absent.', [
      section('Cribratge clar i operatiu', 'INDICA ajuda a prendre decisions ràpides en laboratoris, equips de camp i control de qualitat.', ['Presència/absència de colífags somàtics', 'Presència/absència d’E. coli', 'Presència/absència d’enterococs', 'Eines de comparació colorimètrica']),
      section('Del test al registre traçable', 'Els fluxos INDICA poden alimentar AquaVerify Cloud per vincular resultat, mostra, punt, operador i informe.')
    ], { eyebrow: 'INDICA', primaryCta: 'Sol·licitar pressupost INDICA', secondaryCta: 'Explorar plataforma', ...getProductAssetOptions('indica', 'ca', 'Familia de kits presencia absencia AquaVerify INDICA') })
  }),
  page('standard-kits', 'products', 'quote', {
    en: locale('/products/standard-iso-epa-kits', 'Standard ISO and EPA coliphage testing kits', 'AquaVerify standard kits support laboratories working with ISO 10705-2 and EPA coliphage testing workflows.', [
      section('For regulated microbiology workflows', 'The standard kit range is built for teams that need method alignment, repeatability and technical confidence.', ['Somatic coliphage kits for ISO 10705-2 workflows', 'EPA-oriented somatic coliphage workflows', 'F-specific coliphage workflows', 'Support for method validation and training']),
      section('Keep the method, improve the workflow', 'AquaVerify helps laboratories connect technical methods with digital sample and report traceability.')
    ], { eyebrow: 'Standard Kits', primaryCta: 'Request standard kit quote', secondaryCta: 'Read ISO guide', ...getProductAssetOptions('standard-kits', 'en', 'AquaVerify standard ISO and EPA kit family') }),
    es: locale('/es/productos/kits-iso-epa', 'Kits estándar ISO y EPA para análisis de colífagos', 'Los kits estándar AquaVerify apoyan a laboratorios que trabajan con flujos ISO 10705-2 y EPA para colífagos.', [
      section('Para flujos de microbiología regulada', 'La gama estándar está pensada para equipos que necesitan alineación metodológica, repetibilidad y confianza técnica.', ['Kits de colífagos somáticos para flujos ISO 10705-2', 'Flujos de colífagos somáticos orientados a EPA', 'Flujos de colífagos F-específicos', 'Soporte para validación y formación']),
      section('Mantener el método, mejorar el flujo', 'AquaVerify ayuda a conectar métodos técnicos con trazabilidad digital de muestra e informe.')
    ], { eyebrow: 'Kits estándar', primaryCta: 'Solicitar cotización', secondaryCta: 'Leer guía ISO', ...getProductAssetOptions('standard-kits', 'es', 'Familia de kits estandar ISO y EPA AquaVerify') }),
    fr: locale('/fr/produits/kits-iso-epa', 'Kits standard ISO et EPA pour l’analyse des coliphages', 'Les kits standard AquaVerify accompagnent les laboratoires travaillant avec les flux ISO 10705-2 et EPA pour les coliphages.', [
      section('Pour les flux de microbiologie réglementée', 'La gamme standard est pensée pour les équipes qui recherchent alignement méthodologique, répétabilité et confiance technique.', ['Kits coliphages somatiques pour flux ISO 10705-2', 'Flux coliphages somatiques orientés EPA', 'Flux coliphages F-spécifiques', 'Support de validation et formation']),
      section('Garder la méthode, améliorer le flux', 'AquaVerify aide à connecter les méthodes techniques avec la traçabilité numérique des échantillons et rapports.')
    ], { eyebrow: 'Kits standard', primaryCta: 'Demander un devis', secondaryCta: 'Lire le guide ISO', ...getProductAssetOptions('standard-kits', 'fr', 'Famille de kits standard ISO et EPA AquaVerify') }),
    it: locale('/it/prodotti/kit-iso-epa', 'Kit standard ISO ed EPA per analisi dei colifagi', 'I kit standard AquaVerify supportano i laboratori che lavorano con flussi ISO 10705-2 ed EPA per colifagi.', [
      section('Per flussi di microbiologia regolata', 'La gamma standard è pensata per team che richiedono allineamento metodologico, ripetibilità e fiducia tecnica.', ['Kit colifagi somatici per flussi ISO 10705-2', 'Flussi colifagi somatici orientati EPA', 'Flussi colifagi F-specifici', 'Supporto per validazione e formazione']),
      section('Mantenere il metodo, migliorare il flusso', 'AquaVerify aiuta a collegare metodi tecnici con tracciabilità digitale di campioni e report.')
    ], { eyebrow: 'Kit standard', primaryCta: 'Richiedi preventivo', secondaryCta: 'Leggi guida ISO', ...getProductAssetOptions('standard-kits', 'it', 'Famiglia kit standard ISO ed EPA AquaVerify') }),
    ca: locale('/ca/productes/kits-iso-epa', 'Kits estàndard ISO i EPA per a anàlisi de colífags', 'Els kits estàndard AquaVerify donen suport a laboratoris que treballen amb fluxos ISO 10705-2 i EPA per a colífags.', [
      section('Per a fluxos de microbiologia regulada', 'La gamma estàndard està pensada per a equips que necessiten alineació metodològica, repetibilitat i confiança tècnica.', ['Kits de colífags somàtics per a fluxos ISO 10705-2', 'Fluxos de colífags somàtics orientats a EPA', 'Fluxos de colífags F-específics', 'Suport per a validació i formació']),
      section('Mantenir el mètode, millorar el flux', 'AquaVerify ajuda a connectar mètodes tècnics amb traçabilitat digital de mostra i informe.')
    ], { eyebrow: 'Kits estàndard', primaryCta: 'Sol·licitar pressupost', secondaryCta: 'Llegir guia ISO', ...getProductAssetOptions('standard-kits', 'ca', 'Familia de kits estandard ISO i EPA AquaVerify') })
  }),
  page('lab-essentials', 'products', 'quote', {
    en: locale('/products/lab-essentials', 'Lab Essentials for water microbiology laboratories', 'Culture media, reagents, controls and biological materials for daily water microbiology operations.', [
      section('The operational core of the laboratory', 'Lab Essentials supports the daily work behind reliable water microbiology results.', ['Culture media and reagents', 'Positive controls', 'Host strains', 'Prepared and frozen biological materials']),
      section('Designed for repeatability', 'Pair essentials with kits and the digital platform to standardize purchasing, execution and reporting.')
    ], { eyebrow: 'Lab Essentials', primaryCta: 'Request lab essentials quote', secondaryCta: 'View products', ...getProductAssetOptions('lab-essentials', 'en', 'AquaVerify Lab Essentials product family') }),
    es: locale('/es/productos/lab-essentials', 'Lab Essentials para laboratorios de microbiología del agua', 'Medios de cultivo, reactivos, controles y materiales biológicos para la operación diaria de microbiología del agua.', [
      section('El corazón operativo del laboratorio', 'Lab Essentials da soporte al trabajo diario que hay detrás de resultados fiables en microbiología del agua.', ['Medios de cultivo y reactivos', 'Controles positivos', 'Cepas huésped', 'Materiales biológicos preparados y congelados']),
      section('Pensado para la repetibilidad', 'Combina essentials con kits y plataforma digital para estandarizar compra, ejecución e informes.')
    ], { eyebrow: 'Lab Essentials', primaryCta: 'Solicitar cotización', secondaryCta: 'Ver productos', ...getProductAssetOptions('lab-essentials', 'es', 'Familia de productos AquaVerify Lab Essentials') }),
    fr: locale('/fr/produits/lab-essentials', 'Lab Essentials pour laboratoires de microbiologie de l’eau', 'Milieux de culture, réactifs, contrôles et matériaux biologiques pour les opérations quotidiennes de microbiologie de l’eau.', [
      section('Le cœur opérationnel du laboratoire', 'Lab Essentials soutient le travail quotidien nécessaire à des résultats fiables en microbiologie de l’eau.', ['Milieux de culture et réactifs', 'Contrôles positifs', 'Souches hôtes', 'Matériaux biologiques préparés et congelés']),
      section('Pensé pour la répétabilité', 'Associez essentiels, kits et plateforme numérique pour standardiser achat, exécution et rapports.')
    ], { eyebrow: 'Lab Essentials', primaryCta: 'Demander un devis', secondaryCta: 'Voir les produits', ...getProductAssetOptions('lab-essentials', 'fr', 'Famille de produits AquaVerify Lab Essentials') }),
    it: locale('/it/prodotti/lab-essentials', 'Lab Essentials per laboratori di microbiologia dell’acqua', 'Terreni di coltura, reagenti, controlli e materiali biologici per le operazioni quotidiane di microbiologia dell’acqua.', [
      section('Il cuore operativo del laboratorio', 'Lab Essentials supporta il lavoro quotidiano dietro risultati affidabili in microbiologia dell’acqua.', ['Terreni di coltura e reagenti', 'Controlli positivi', 'Ceppi ospiti', 'Materiali biologici preparati e congelati']),
      section('Pensato per la ripetibilità', 'Abbina essentials, kit e piattaforma digitale per standardizzare acquisti, esecuzione e report.')
    ], { eyebrow: 'Lab Essentials', primaryCta: 'Richiedi preventivo', secondaryCta: 'Vedi prodotti', ...getProductAssetOptions('lab-essentials', 'it', 'Famiglia prodotti AquaVerify Lab Essentials') }),
    ca: locale('/ca/productes/lab-essentials', 'Lab Essentials per a laboratoris de microbiologia de l’aigua', 'Medis de cultiu, reactius, controls i materials biològics per a l’operació diària de microbiologia de l’aigua.', [
      section('El cor operatiu del laboratori', 'Lab Essentials dona suport al treball diari que hi ha darrere de resultats fiables en microbiologia de l’aigua.', ['Medis de cultiu i reactius', 'Controls positius', 'Soques hoste', 'Materials biològics preparats i congelats']),
      section('Pensat per a la repetibilitat', 'Combina essentials amb kits i plataforma digital per estandarditzar compra, execució i informes.')
    ], { eyebrow: 'Lab Essentials', primaryCta: 'Sol·licitar pressupost', secondaryCta: 'Veure productes', ...getProductAssetOptions('lab-essentials', 'ca', 'Familia de productes AquaVerify Lab Essentials') })
  }),
  page('platform', 'platform', 'demo', {
    en: locale('/platform', 'AquaVerify Cloud: complete platform for laboratory, commercial and operational workflows', 'AquaVerify Cloud connects CRM, LIMS, ELN, Work, AquaMail, AquaChat, inventory, WMS, logistics, finance, customer portal, dashboards and AquaAI in one traceable platform.', [
      section('A complete platform, not another isolated module', 'AquaVerify Cloud is built for organizations where water analysis, product supply, customer communication and business execution must move together. The same platform can support AquaVerify product workflows, laboratory operations, distributor activity and SaaS deployments for biotech or quality teams.', ['CRM, Sales and customer 360 records', 'LIMS, ELN, validation studies and reports', 'Work boards, tasks, AquaMail, AquaChat and meetings', 'Inventory, WMS, logistics, finance and executive dashboards']),
      section('LIMS and ELN: from sample reception to validated report', 'The laboratory layer manages sampling points, sample reception, work sheets, result capture, technical review, COA/report generation, protocols, ELN notebooks and validation studies. It is designed so each analytical result keeps its context: client, site, operator, method, worksheet, reviewer and report output.', ['Sampling points and sample hub', 'Worksheet execution and technical validation', 'ELN protocols, experiments and QA approvals', 'Customer portal publication and report history']),
      section('CRM, Sales and Portal: the commercial cycle stays connected', 'The platform connects the buyer journey from signup and CRM qualification to quotations, product orders, support tickets, portal requests and customer follow-up. Teams can see who the customer is, what they requested, which products or analyses matter, and what operational work is already in motion.', ['Corporate web source and intent context', 'Company 360 with contacts, activity and documents', 'Quotations, orders and customer portal visibility', 'Support tickets and account history']),
      section('Work, communication and AquaAI: execution without losing context', 'Projects, boards, tasks, calendar, documents, AquaMail, AquaChat and meetings are part of the same operational environment. Messages can become tasks, emails can become tickets, documents stay attached to the right customer or project, and AquaAI helps users understand flows, modules and next actions.', ['Task boards and personal workdesk', 'Shared mailboxes and customer threads', 'Chat, meetings and document editor', 'AquaAI guidance connected to platform manuals']),
      section('Inventory, WMS, logistics and finance: operational truth reaches the back office', 'When a quotation becomes a confirmed order, the platform can connect demand, stock availability, picking, shipment, invoicing, treasury and accounting. The goal is to avoid a gap between commercial promise, laboratory execution, physical product movement and financial reality.', ['Demand, reservations and stock pressure', 'Warehouse movements, picking and delivery evidence', 'Invoices, expenses, cash and accounting records', 'Executive dashboard for margin, workload and risk']),
      section('Governance, roles and multi-tenant control', 'AquaVerify Cloud is prepared for internal teams, distributors, laboratories, customers and SaaS tenants with role-based access, language preferences, onboarding, legal consent, document templates and audit-oriented status history. Each user sees the modules and actions that match their role.', ['Multi-tenant model for HQ, distributors, labs and customers', 'Role-aware navigation and permissions', 'Spanish, English, French, Italian and Catalan interfaces', 'Audit trail, legal consent and status visibility'])
    ], { eyebrow: 'Platform', primaryCta: 'Request platform demo', secondaryCta: 'See SaaS option', seoTitle: 'AquaVerify Cloud Platform | LIMS, CRM, Work, WMS, Finance and AquaAI', seoDescription: 'Explore AquaVerify Cloud: a complete platform for water analysis workflows, CRM, LIMS, ELN, Work, inventory, WMS, finance, customer portal and AquaAI.', whitepaper: platformDeepDive('en'), faqs: [
      { question: 'Is AquaVerify Cloud only a LIMS?', answer: 'No. LIMS and ELN are core parts of the platform, but AquaVerify Cloud also connects CRM, Sales, Work, AquaMail, AquaChat, inventory, WMS, logistics, finance, customer portal, dashboards and AquaAI.' },
      { question: 'Who is the platform for?', answer: 'It is designed for laboratories, distributors, AquaVerify product operations, water quality teams and biotech companies that need a complete SaaS-style operating platform.' },
      { question: 'Can customers use a portal?', answer: 'Yes. The customer portal can expose requests, samples, reports, support conversations and commercial documents depending on the tenant configuration and permissions.' },
      { question: 'How does AquaAI fit into the platform?', answer: 'AquaAI uses platform manuals and operational context to explain modules, guide users through workflows and suggest the next action inside AquaVerify Cloud.' }
    ], ...platformVisualOptions('en', { hero: 'dashboard', galleryIds: ['dashboard', 'lims', 'crm', 'portal', 'work', 'wms', 'finance'] }) }),
    es: locale('/es/plataforma', 'AquaVerify Cloud: plataforma completa para laboratorio, negocio y operaciones', 'AquaVerify Cloud conecta CRM, LIMS, ELN, Work, AquaMail, AquaChat, inventario, WMS, logística, finanzas, portal cliente, dashboards y AquaAI en una sola plataforma trazable.', [
      section('Una plataforma completa, no otro módulo aislado', 'AquaVerify Cloud está construida para organizaciones donde análisis de agua, suministro de producto, comunicación con clientes y ejecución del negocio deben avanzar juntos. La misma plataforma puede soportar flujos con productos AquaVerify, operación de laboratorio, actividad de distribuidores y despliegues SaaS para biotech o equipos de calidad.', ['CRM, Sales y ficha 360 de cliente', 'LIMS, ELN, estudios de validación e informes', 'Work, tareas, AquaMail, AquaChat y reuniones', 'Inventario, WMS, logística, finanzas y dashboards ejecutivos']),
      section('LIMS y ELN: de la recepción de muestra al informe validado', 'La capa de laboratorio gestiona puntos de muestreo, recepción de muestras, hojas de trabajo, captura de resultados, revisión técnica, generación de COA/informes, protocolos, cuadernos ELN y estudios de validación. Está pensada para que cada resultado mantenga su contexto: cliente, ubicación, operador, método, hoja, revisor e informe.', ['Puntos de muestreo y ficha de muestra', 'Ejecución de hojas y validación técnica', 'Protocolos ELN, experimentos y aprobaciones QA', 'Publicación en portal cliente e historial de informes']),
      section('CRM, Sales y Portal: el ciclo comercial queda conectado', 'La plataforma conecta el recorrido comprador desde signup y cualificación CRM hasta presupuestos, pedidos de producto, tickets de soporte, solicitudes de portal y seguimiento del cliente. El equipo puede ver quién es el cliente, qué pidió, qué productos o análisis importan y qué trabajo operativo está en marcha.', ['Origen web e intención comercial', 'Empresa 360 con contactos, actividad y documentos', 'Presupuestos, pedidos y visibilidad en portal', 'Soporte e historial de cuenta']),
      section('Work, comunicación y AquaAI: ejecución sin perder contexto', 'Proyectos, tableros, tareas, calendario, documentos, AquaMail, AquaChat y reuniones viven en el mismo entorno operativo. Los mensajes pueden convertirse en tareas, los emails en tickets, los documentos quedan asociados al cliente o proyecto correcto y AquaAI ayuda a entender flujos, módulos y siguientes acciones.', ['Tableros y bandeja personal de tareas', 'Buzones compartidos e hilos de cliente', 'Chat, reuniones y editor documental', 'AquaAI conectado a manuales de plataforma']),
      section('Inventario, WMS, logística y finanzas: la verdad operativa llega al back office', 'Cuando un presupuesto se convierte en pedido confirmado, la plataforma puede conectar demanda, disponibilidad de stock, picking, envío, facturación, tesorería y contabilidad. El objetivo es evitar el hueco entre promesa comercial, ejecución de laboratorio, movimiento físico de producto y realidad financiera.', ['Demanda, reservas y presión de stock', 'Movimientos de almacén, picking y evidencia de entrega', 'Facturas, gastos, caja y asientos contables', 'Dashboard ejecutivo de margen, carga y riesgo']),
      section('Gobernanza, roles y control multi-tenant', 'AquaVerify Cloud está preparada para equipos internos, distribuidores, laboratorios, clientes y tenants SaaS con accesos por rol, preferencias de idioma, onboarding, consentimiento legal, plantillas documentales e historial de estados orientado a auditoría. Cada usuario ve los módulos y acciones que le corresponden.', ['Modelo multi-tenant para HQ, distribuidores, labs y clientes', 'Navegación y permisos según rol', 'Interfaces en español, inglés, francés, italiano y catalán', 'Audit trail, consentimiento legal y visibilidad de estados'])
    ], { eyebrow: 'Plataforma', primaryCta: 'Solicitar demo plataforma', secondaryCta: 'Ver opción SaaS', seoTitle: 'AquaVerify Cloud Platform | LIMS, CRM, Work, WMS, Finanzas y AquaAI', seoDescription: 'Explora AquaVerify Cloud: plataforma completa para análisis de agua, CRM, LIMS, ELN, Work, inventario, WMS, finanzas, portal cliente y AquaAI.', whitepaper: platformDeepDive('es'), faqs: [
      { question: '¿AquaVerify Cloud es solo un LIMS?', answer: 'No. LIMS y ELN son partes centrales, pero AquaVerify Cloud también conecta CRM, Sales, Work, AquaMail, AquaChat, inventario, WMS, logística, finanzas, portal cliente, dashboards y AquaAI.' },
      { question: '¿Para quién está pensada la plataforma?', answer: 'Para laboratorios, distribuidores, operaciones de producto AquaVerify, equipos de calidad del agua y empresas biotech que necesitan una plataforma operativa completa tipo SaaS.' },
      { question: '¿Los clientes pueden usar un portal?', answer: 'Sí. El portal cliente puede mostrar solicitudes, muestras, informes, conversaciones de soporte y documentos comerciales según la configuración del tenant y permisos.' },
      { question: '¿Cómo encaja AquaAI en la plataforma?', answer: 'AquaAI utiliza manuales de plataforma y contexto operativo para explicar módulos, guiar al usuario por los flujos y sugerir la siguiente acción dentro de AquaVerify Cloud.' }
    ], ...platformVisualOptions('es', { hero: 'dashboard', galleryIds: ['dashboard', 'lims', 'crm', 'portal', 'work', 'wms', 'finance'] }) }),
    fr: locale('/fr/plateforme', 'AquaVerify Cloud: plateforme complète pour laboratoire, business et opérations', 'AquaVerify Cloud connecte CRM, LIMS, ELN, Work, AquaMail, AquaChat, inventaire, WMS, logistique, finance, portail client, dashboards et AquaAI dans une seule plateforme traçable.', [
      section('Une plateforme complète, pas un module isolé de plus', 'AquaVerify Cloud est construite pour les organisations où analyse de l’eau, fourniture produit, communication client et exécution métier doivent avancer ensemble. La même plateforme peut supporter les flux produits AquaVerify, l’opération laboratoire, l’activité distributeur et les déploiements SaaS pour biotech ou équipes qualité.', ['CRM, Sales et fiche client 360', 'LIMS, ELN, études de validation et rapports', 'Work, tâches, AquaMail, AquaChat et réunions', 'Inventaire, WMS, logistique, finance et dashboards exécutifs']),
      section('LIMS et ELN: de la réception échantillon au rapport validé', 'La couche laboratoire gère points de prélèvement, réception échantillons, feuilles de travail, capture résultats, revue technique, génération COA/rapports, protocoles, cahiers ELN et études de validation. Chaque résultat garde son contexte: client, site, opérateur, méthode, feuille, réviseur et sortie rapport.', ['Points de prélèvement et fiche échantillon', 'Exécution feuilles et validation technique', 'Protocoles ELN, expériences et approbations QA', 'Publication portail client et historique rapports']),
      section('CRM, Sales et Portail: le cycle commercial reste connecté', 'La plateforme relie le parcours acheteur depuis signup et qualification CRM jusqu’aux devis, commandes produit, tickets support, demandes portail et suivi client. Les équipes voient qui est le client, ce qu’il demande, quels produits ou analyses comptent et quel travail opérationnel est en cours.', ['Source web et intention commerciale', 'Entreprise 360 avec contacts, activité et documents', 'Devis, commandes et visibilité portail', 'Support et historique de compte']),
      section('Work, communication et AquaAI: exécuter sans perdre le contexte', 'Projets, tableaux, tâches, calendrier, documents, AquaMail, AquaChat et réunions font partie du même environnement opérationnel. Les messages peuvent devenir tâches, les emails tickets, les documents restent attachés au bon client ou projet et AquaAI aide à comprendre flux, modules et actions suivantes.', ['Tableaux de tâches et workdesk personnel', 'Boîtes partagées et fils client', 'Chat, réunions et éditeur documentaire', 'AquaAI connecté aux manuels plateforme']),
      section('Inventaire, WMS, logistique et finance: la vérité opérationnelle arrive au back office', 'Lorsqu’un devis devient commande confirmée, la plateforme peut relier demande, disponibilité stock, picking, expédition, facturation, trésorerie et comptabilité. L’objectif est d’éviter l’écart entre promesse commerciale, exécution laboratoire, mouvement physique produit et réalité financière.', ['Demande, réservations et pression stock', 'Mouvements entrepôt, picking et preuve livraison', 'Factures, dépenses, cash et écritures comptables', 'Dashboard exécutif marge, charge et risque']),
      section('Gouvernance, rôles et contrôle multi-tenant', 'AquaVerify Cloud est prête pour équipes internes, distributeurs, laboratoires, clients et tenants SaaS avec accès par rôle, préférences de langue, onboarding, consentement légal, modèles documentaires et historique de statuts orienté audit. Chaque utilisateur voit les modules et actions adaptés à son rôle.', ['Modèle multi-tenant pour HQ, distributeurs, labs et clients', 'Navigation et permissions selon rôle', 'Interfaces en espagnol, anglais, français, italien et catalan', 'Audit trail, consentement légal et visibilité statuts'])
    ], { eyebrow: 'Plateforme', primaryCta: 'Demander une démo', secondaryCta: 'Voir l’option SaaS', seoTitle: 'AquaVerify Cloud Platform | LIMS, CRM, Work, WMS, Finance et AquaAI', seoDescription: 'Découvrez AquaVerify Cloud: plateforme complète pour analyse de l’eau, CRM, LIMS, ELN, Work, inventaire, WMS, finance, portail client et AquaAI.', whitepaper: platformDeepDive('fr'), faqs: [
      { question: 'AquaVerify Cloud est-il seulement un LIMS?', answer: 'Non. LIMS et ELN sont centraux, mais AquaVerify Cloud connecte aussi CRM, Sales, Work, AquaMail, AquaChat, inventaire, WMS, logistique, finance, portail client, dashboards et AquaAI.' },
      { question: 'À qui s’adresse la plateforme?', answer: 'Aux laboratoires, distributeurs, opérations produit AquaVerify, équipes qualité eau et entreprises biotech ayant besoin d’une plateforme opérationnelle complète de type SaaS.' },
      { question: 'Les clients peuvent-ils utiliser un portail?', answer: 'Oui. Le portail client peut exposer demandes, échantillons, rapports, conversations support et documents commerciaux selon la configuration du tenant et les permissions.' },
      { question: 'Comment AquaAI s’intègre-t-il?', answer: 'AquaAI utilise les manuels plateforme et le contexte opérationnel pour expliquer les modules, guider les utilisateurs dans les flux et suggérer la prochaine action.' }
    ], ...platformVisualOptions('fr', { hero: 'dashboard', galleryIds: ['dashboard', 'lims', 'crm', 'portal', 'work', 'wms', 'finance'] }) }),
    it: locale('/it/piattaforma', 'AquaVerify Cloud: piattaforma completa per laboratorio, business e operations', 'AquaVerify Cloud collega CRM, LIMS, ELN, Work, AquaMail, AquaChat, inventario, WMS, logistica, finanza, portale clienti, dashboard e AquaAI in un’unica piattaforma tracciabile.', [
      section('Una piattaforma completa, non un altro modulo isolato', 'AquaVerify Cloud è costruita per organizzazioni in cui analisi dell’acqua, fornitura prodotto, comunicazione cliente ed esecuzione business devono avanzare insieme. La stessa piattaforma può supportare workflow con prodotti AquaVerify, operazioni di laboratorio, attività distributori e deployment SaaS per biotech o team qualità.', ['CRM, Sales e scheda cliente 360', 'LIMS, ELN, studi di validazione e report', 'Work, task, AquaMail, AquaChat e meeting', 'Inventario, WMS, logistica, finanza e dashboard executive']),
      section('LIMS ed ELN: dalla ricezione campione al report validato', 'Il layer laboratorio gestisce punti di campionamento, ricezione campioni, worksheet, acquisizione risultati, review tecnica, generazione COA/report, protocolli, notebook ELN e studi di validazione. Ogni risultato mantiene contesto: cliente, sito, operatore, metodo, worksheet, reviewer e output report.', ['Punti di campionamento e sample hub', 'Esecuzione worksheet e validazione tecnica', 'Protocolli ELN, esperimenti e approvazioni QA', 'Pubblicazione portale clienti e storico report']),
      section('CRM, Sales e Portale: il ciclo commerciale resta connesso', 'La piattaforma collega il buyer journey da signup e qualificazione CRM a preventivi, ordini prodotto, ticket supporto, richieste portale e follow-up cliente. I team vedono chi è il cliente, cosa ha richiesto, quali prodotti o analisi contano e quale lavoro operativo è in corso.', ['Sorgente web e intento commerciale', 'Azienda 360 con contatti, attività e documenti', 'Preventivi, ordini e visibilità portale', 'Supporto e storico account']),
      section('Work, comunicazione e AquaAI: esecuzione senza perdere contesto', 'Progetti, board, task, calendario, documenti, AquaMail, AquaChat e meeting vivono nello stesso ambiente operativo. I messaggi possono diventare task, le email ticket, i documenti restano collegati al cliente o progetto corretto e AquaAI aiuta a capire flussi, moduli e prossime azioni.', ['Board task e workdesk personale', 'Mailbox condivise e thread cliente', 'Chat, meeting ed editor documentale', 'AquaAI collegato ai manuali piattaforma']),
      section('Inventario, WMS, logistica e finanza: la verità operativa arriva al back office', 'Quando un preventivo diventa ordine confermato, la piattaforma può collegare domanda, disponibilità stock, picking, spedizione, fatturazione, tesoreria e contabilità. L’obiettivo è evitare il gap tra promessa commerciale, esecuzione laboratorio, movimento fisico prodotto e realtà finanziaria.', ['Domanda, riserve e pressione stock', 'Movimenti magazzino, picking ed evidenza consegna', 'Fatture, spese, cassa e scritture contabili', 'Dashboard executive per margine, carico e rischio']),
      section('Governance, ruoli e controllo multi-tenant', 'AquaVerify Cloud è pronta per team interni, distributori, laboratori, clienti e tenant SaaS con accessi per ruolo, preferenze lingua, onboarding, consenso legale, template documentali e storico stati orientato audit. Ogni utente vede moduli e azioni coerenti con il proprio ruolo.', ['Modello multi-tenant per HQ, distributori, lab e clienti', 'Navigazione e permessi per ruolo', 'Interfacce in spagnolo, inglese, francese, italiano e catalano', 'Audit trail, consenso legale e visibilità stati'])
    ], { eyebrow: 'Piattaforma', primaryCta: 'Richiedi demo piattaforma', secondaryCta: 'Vedi opzione SaaS', seoTitle: 'AquaVerify Cloud Platform | LIMS, CRM, Work, WMS, Finanza e AquaAI', seoDescription: 'Scopri AquaVerify Cloud: piattaforma completa per analisi acqua, CRM, LIMS, ELN, Work, inventario, WMS, finanza, portale clienti e AquaAI.', whitepaper: platformDeepDive('it'), faqs: [
      { question: 'AquaVerify Cloud è solo un LIMS?', answer: 'No. LIMS ed ELN sono parti centrali, ma AquaVerify Cloud collega anche CRM, Sales, Work, AquaMail, AquaChat, inventario, WMS, logistica, finanza, portale clienti, dashboard e AquaAI.' },
      { question: 'Per chi è pensata la piattaforma?', answer: 'Per laboratori, distributori, operations prodotto AquaVerify, team qualità acqua e aziende biotech che richiedono una piattaforma operativa completa in stile SaaS.' },
      { question: 'I clienti possono usare un portale?', answer: 'Sì. Il portale clienti può mostrare richieste, campioni, report, conversazioni supporto e documenti commerciali in base a configurazione tenant e permessi.' },
      { question: 'Come si inserisce AquaAI?', answer: 'AquaAI usa manuali piattaforma e contesto operativo per spiegare moduli, guidare gli utenti nei workflow e suggerire l’azione successiva.' }
    ], ...platformVisualOptions('it', { hero: 'dashboard', galleryIds: ['dashboard', 'lims', 'crm', 'portal', 'work', 'wms', 'finance'] }) }),
    ca: locale('/ca/plataforma', 'AquaVerify Cloud: plataforma completa per a laboratori, negoci i operacions', 'AquaVerify Cloud connecta CRM, LIMS, ELN, Work, AquaMail, AquaChat, inventari, WMS, logística, finances, portal client, dashboards i AquaAI en una sola plataforma traçable.', [
      section('Una plataforma completa, no un altre mòdul aïllat', 'AquaVerify Cloud està construïda per a organitzacions on anàlisi d’aigua, subministrament de producte, comunicació amb clients i execució del negoci han d’avançar junts. La mateixa plataforma pot suportar fluxos amb productes AquaVerify, operació de laboratori, activitat de distribuïdors i desplegaments SaaS per a biotech o equips de qualitat.', ['CRM, Sales i fitxa 360 de client', 'LIMS, ELN, estudis de validació i informes', 'Work, tasques, AquaMail, AquaChat i reunions', 'Inventari, WMS, logística, finances i dashboards executius']),
      section('LIMS i ELN: de la recepció de mostra a l’informe validat', 'La capa de laboratori gestiona punts de mostreig, recepció de mostres, fulls de treball, captura de resultats, revisió tècnica, generació de COA/informes, protocols, quaderns ELN i estudis de validació. Està pensada perquè cada resultat mantingui el seu context: client, ubicació, operador, mètode, full, revisor i informe.', ['Punts de mostreig i fitxa de mostra', 'Execució de fulls i validació tècnica', 'Protocols ELN, experiments i aprovacions QA', 'Publicació en portal client i historial d’informes']),
      section('CRM, Sales i Portal: el cicle comercial queda connectat', 'La plataforma connecta el recorregut comprador des de signup i qualificació CRM fins a pressupostos, comandes de producte, tiquets de suport, sol·licituds de portal i seguiment del client. L’equip pot veure qui és el client, què ha demanat, quins productes o anàlisis importen i quin treball operatiu està en marxa.', ['Origen web i intenció comercial', 'Empresa 360 amb contactes, activitat i documents', 'Pressupostos, comandes i visibilitat al portal', 'Suport i historial de compte']),
      section('Work, comunicació i AquaAI: execució sense perdre context', 'Projectes, taulers, tasques, calendari, documents, AquaMail, AquaChat i reunions viuen en el mateix entorn operatiu. Els missatges poden convertir-se en tasques, els emails en tiquets, els documents queden associats al client o projecte correcte i AquaAI ajuda a entendre fluxos, mòduls i següents accions.', ['Taulers i safata personal de tasques', 'Bústies compartides i fils de client', 'Chat, reunions i editor documental', 'AquaAI connectat a manuals de plataforma']),
      section('Inventari, WMS, logística i finances: la veritat operativa arriba al back office', 'Quan un pressupost es converteix en comanda confirmada, la plataforma pot connectar demanda, disponibilitat d’estoc, picking, enviament, facturació, tresoreria i comptabilitat. L’objectiu és evitar el buit entre promesa comercial, execució de laboratori, moviment físic de producte i realitat financera.', ['Demanda, reserves i pressió d’estoc', 'Moviments de magatzem, picking i evidència de lliurament', 'Factures, despeses, caixa i assentaments comptables', 'Dashboard executiu de marge, càrrega i risc']),
      section('Governança, rols i control multi-tenant', 'AquaVerify Cloud està preparada per a equips interns, distribuïdors, laboratoris, clients i tenants SaaS amb accessos per rol, preferències d’idioma, onboarding, consentiment legal, plantilles documentals i historial d’estats orientat a auditoria. Cada usuari veu els mòduls i accions que li corresponen.', ['Model multi-tenant per a HQ, distribuïdors, labs i clients', 'Navegació i permisos segons rol', 'Interfícies en castellà, anglès, francès, italià i català', 'Audit trail, consentiment legal i visibilitat d’estats'])
    ], { eyebrow: 'Plataforma', primaryCta: 'Sol·licitar demo plataforma', secondaryCta: 'Veure opció SaaS', seoTitle: 'AquaVerify Cloud Platform | LIMS, CRM, Work, WMS, Finances i AquaAI', seoDescription: 'Explora AquaVerify Cloud: plataforma completa per a anàlisi d’aigua, CRM, LIMS, ELN, Work, inventari, WMS, finances, portal client i AquaAI.', whitepaper: platformDeepDive('ca'), faqs: [
      { question: 'AquaVerify Cloud és només un LIMS?', answer: 'No. LIMS i ELN són parts centrals, però AquaVerify Cloud també connecta CRM, Sales, Work, AquaMail, AquaChat, inventari, WMS, logística, finances, portal client, dashboards i AquaAI.' },
      { question: 'Per a qui està pensada la plataforma?', answer: 'Per a laboratoris, distribuïdors, operacions de producte AquaVerify, equips de qualitat de l’aigua i empreses biotech que necessiten una plataforma operativa completa tipus SaaS.' },
      { question: 'Els clients poden usar un portal?', answer: 'Sí. El portal client pot mostrar sol·licituds, mostres, informes, converses de suport i documents comercials segons la configuració del tenant i permisos.' },
      { question: 'Com encaixa AquaAI?', answer: 'AquaAI utilitza manuals de plataforma i context operatiu per explicar mòduls, guiar l’usuari pels fluxos i suggerir la següent acció dins AquaVerify Cloud.' }
    ], ...platformVisualOptions('ca', { hero: 'dashboard', galleryIds: ['dashboard', 'lims', 'crm', 'portal', 'work', 'wms', 'finance'] }) })
  }),
  page('saas-biotech', 'platform', 'saas', {
    en: locale('/saas/biotech-lims-platform', 'All-in-one SaaS platform for biotech and laboratory operations', 'AquaVerify Cloud is also available as SaaS for biotech companies that need CRM, LIMS, work, inventory, reporting and customer portals.', [
      section('One operational backbone', 'Replace fragmented tools with one platform for scientific and operational work.', ['CRM and sales workflows', 'LIMS and sample traceability', 'Work management and documents', 'Inventory, WMS, finance and reporting']),
      section('For teams that need control', 'Designed for growing biotech and laboratory organizations that need execution, traceability and commercial visibility.')
    ], { eyebrow: 'SaaS', primaryCta: 'Request SaaS demo', secondaryCta: 'Explore platform', ...platformVisualOptions('en', { hero: 'dashboard', galleryIds: ['dashboard', 'crm', 'lims', 'work', 'wms', 'finance'] }) }),
    es: locale('/es/saas/plataforma-lims-biotech', 'Plataforma SaaS todo en uno para biotech y laboratorios', 'AquaVerify Cloud también está disponible como SaaS para empresas biotech que necesitan CRM, LIMS, work, inventario, reporting y portal cliente.', [
      section('Una columna vertebral operativa', 'Sustituye herramientas fragmentadas por una plataforma para trabajo científico y operativo.', ['CRM y flujos comerciales', 'LIMS y trazabilidad de muestras', 'Gestión del trabajo y documentos', 'Inventario, WMS, finanzas y reporting']),
      section('Para equipos que necesitan control', 'Diseñada para organizaciones biotech y laboratorios en crecimiento que necesitan ejecución, trazabilidad y visibilidad comercial.')
    ], { eyebrow: 'SaaS', primaryCta: 'Solicitar demo SaaS', secondaryCta: 'Explorar plataforma', ...platformVisualOptions('es', { hero: 'dashboard', galleryIds: ['dashboard', 'crm', 'lims', 'work', 'wms', 'finance'] }) }),
    fr: locale('/fr/saas/plateforme-lims-biotech', 'Plateforme SaaS tout-en-un pour biotech et laboratoires', 'AquaVerify Cloud est aussi disponible en SaaS pour les entreprises biotech ayant besoin de CRM, LIMS, work, inventaire, reporting et portail client.', [
      section('Une colonne vertébrale opérationnelle', 'Remplacez les outils fragmentés par une plateforme pour le travail scientifique et opérationnel.', ['CRM et flux commerciaux', 'LIMS et traçabilité des échantillons', 'Gestion du travail et documents', 'Inventaire, WMS, finance et reporting']),
      section('Pour les équipes qui veulent le contrôle', 'Conçue pour les organisations biotech et laboratoires en croissance qui ont besoin d’exécution, traçabilité et visibilité commerciale.')
    ], { eyebrow: 'SaaS', primaryCta: 'Demander une démo SaaS', secondaryCta: 'Explorer la plateforme', ...platformVisualOptions('fr', { hero: 'dashboard', galleryIds: ['dashboard', 'crm', 'lims', 'work', 'wms', 'finance'] }) }),
    it: locale('/it/saas/piattaforma-lims-biotech', 'Piattaforma SaaS all-in-one per biotech e laboratori', 'AquaVerify Cloud è disponibile anche come SaaS per aziende biotech che richiedono CRM, LIMS, work, inventario, reporting e portale clienti.', [
      section('Una dorsale operativa', 'Sostituisci strumenti frammentati con una piattaforma per lavoro scientifico e operativo.', ['CRM e flussi commerciali', 'LIMS e tracciabilità campioni', 'Gestione lavoro e documenti', 'Inventario, WMS, finanza e reporting']),
      section('Per team che vogliono controllo', 'Pensata per organizzazioni biotech e laboratori in crescita che richiedono esecuzione, tracciabilità e visibilità commerciale.')
    ], { eyebrow: 'SaaS', primaryCta: 'Richiedi demo SaaS', secondaryCta: 'Esplora piattaforma', ...platformVisualOptions('it', { hero: 'dashboard', galleryIds: ['dashboard', 'crm', 'lims', 'work', 'wms', 'finance'] }) }),
    ca: locale('/ca/saas/plataforma-lims-biotech', 'Plataforma SaaS tot en un per a biotech i laboratoris', 'AquaVerify Cloud també està disponible com a SaaS per a empreses biotech que necessiten CRM, LIMS, work, inventari, reporting i portal client.', [
      section('Una columna vertebral operativa', 'Substitueix eines fragmentades per una plataforma per al treball científic i operatiu.', ['CRM i fluxos comercials', 'LIMS i traçabilitat de mostres', 'Gestió del treball i documents', 'Inventari, WMS, finances i reporting']),
      section('Per a equips que necessiten control', 'Dissenyada per a organitzacions biotech i laboratoris en creixement que necessiten execució, traçabilitat i visibilitat comercial.')
    ], { eyebrow: 'SaaS', primaryCta: 'Sol·licitar demo SaaS', secondaryCta: 'Explorar plataforma', ...platformVisualOptions('ca', { hero: 'dashboard', galleryIds: ['dashboard', 'crm', 'lims', 'work', 'wms', 'finance'] }) })
  }),
  page('oem', 'partners', 'oem', {
    en: locale('/oem-water-testing-kits', 'OEM and distributor program for water testing kits', 'Bring AquaVerify water microbiology products and digital workflows to your market under AquaVerify or white-label models.', [
      section('Two commercial models', 'Distributors can sell AquaVerify-branded products or develop OEM/private-label programs with platform support.', ['AquaVerify branded distribution', 'OEM and white-label packaging', 'Digital platform for customer workflows', 'Technical onboarding and training']),
      section('Recurring value beyond the box', 'Consumables, support and software access create a stronger relationship than a one-off product sale.')
    ], { eyebrow: 'OEM & Distributors', primaryCta: 'Become a partner', secondaryCta: 'Request OEM call' }),
    es: locale('/es/oem-kits-analisis-agua', 'Programa OEM y distribuidores para kits de análisis de agua', 'Lleva productos AquaVerify de microbiología del agua y flujos digitales a tu mercado bajo marca AquaVerify o marca blanca.', [
      section('Dos modelos comerciales', 'Los distribuidores pueden vender productos AquaVerify o desarrollar programas OEM/marca blanca con soporte de plataforma.', ['Distribución bajo marca AquaVerify', 'Packaging OEM y marca blanca', 'Plataforma digital para flujos de cliente', 'Onboarding técnico y formación']),
      section('Valor recurrente más allá de la caja', 'Consumibles, soporte y acceso software crean una relación más fuerte que una venta puntual.')
    ], { eyebrow: 'OEM y distribuidores', primaryCta: 'Convertirse en partner', secondaryCta: 'Solicitar llamada OEM' }),
    fr: locale('/fr/oem-kits-analyse-eau', 'Programme OEM et distributeurs pour kits d’analyse de l’eau', 'Apportez les produits AquaVerify de microbiologie de l’eau et les flux numériques à votre marché sous marque AquaVerify ou marque blanche.', [
      section('Deux modèles commerciaux', 'Les distributeurs peuvent vendre des produits AquaVerify ou développer des programmes OEM/marque blanche avec support plateforme.', ['Distribution sous marque AquaVerify', 'Packaging OEM et marque blanche', 'Plateforme numérique pour les flux client', 'Onboarding technique et formation']),
      section('Valeur récurrente au-delà de la boîte', 'Consommables, support et accès logiciel créent une relation plus forte qu’une vente ponctuelle.')
    ], { eyebrow: 'OEM et distributeurs', primaryCta: 'Devenir partenaire', secondaryCta: 'Demander un appel OEM' }),
    it: locale('/it/oem-kit-analisi-acqua', 'Programma OEM e distributori per kit di analisi dell’acqua', 'Porta i prodotti AquaVerify di microbiologia dell’acqua e i flussi digitali nel tuo mercato con brand AquaVerify o private label.', [
      section('Due modelli commerciali', 'I distributori possono vendere prodotti AquaVerify o sviluppare programmi OEM/private label con supporto piattaforma.', ['Distribuzione con brand AquaVerify', 'Packaging OEM e private label', 'Piattaforma digitale per flussi cliente', 'Onboarding tecnico e formazione']),
      section('Valore ricorrente oltre la scatola', 'Consumabili, supporto e accesso software creano una relazione più forte di una vendita singola.')
    ], { eyebrow: 'OEM e distributori', primaryCta: 'Diventa partner', secondaryCta: 'Richiedi call OEM' }),
    ca: locale('/ca/oem-kits-analisi-aigua', 'Programa OEM i distribuïdors per a kits d’anàlisi d’aigua', 'Porta productes AquaVerify de microbiologia de l’aigua i fluxos digitals al teu mercat sota marca AquaVerify o marca blanca.', [
      section('Dos models comercials', 'Els distribuïdors poden vendre productes AquaVerify o desenvolupar programes OEM/marca blanca amb suport de plataforma.', ['Distribució sota marca AquaVerify', 'Packaging OEM i marca blanca', 'Plataforma digital per a fluxos de client', 'Onboarding tècnic i formació']),
      section('Valor recurrent més enllà de la caixa', 'Consumibles, suport i accés software creen una relació més forta que una venda puntual.')
    ], { eyebrow: 'OEM i distribuïdors', primaryCta: 'Convertir-se en partner', secondaryCta: 'Sol·licitar trucada OEM' })
  }),
  page('private-label-kits', 'partners', 'oem', {
    en: locale('/oem/private-label-water-testing-kits', 'Private-label water testing kits for distributors', 'Build a differentiated water microbiology catalog with AquaVerify products, OEM packaging options and connected platform workflows.', [
      section('For distributors that need a defensible catalog', 'AquaVerify helps scientific distributors move beyond generic consumables with kits, controls and platform-enabled workflows.', ['Private-label or AquaVerify-branded supply', 'Water microbiology kits and lab essentials', 'Platform access for traceability and customer reporting', 'Technical onboarding for sales and support teams']),
      section('A practical OEM path', 'Start with a focused product range, validate demand with target customers and scale packaging, training and digital workflow when volume is clear.', ['Portfolio selection by market need', 'Commercial qualification and pricing model', 'Packaging and documentation alignment', 'Qualified web enquiries connected to partner conversations'])
    ], { eyebrow: 'OEM', primaryCta: 'Discuss private-label supply', secondaryCta: 'View distributor program', seoTitle: 'Private Label Water Testing Kits | AquaVerify OEM for Distributors', faqs: [
      { question: 'Can AquaVerify supply private-label water testing kits?', answer: 'AquaVerify can evaluate private-label or AquaVerify-branded supply depending on market, volume, support needs and regulatory constraints.' },
      { question: 'Do OEM products connect to AquaVerify Cloud?', answer: 'OEM and distributor programs can include platform workflows for sample traceability, reporting, CRM and customer portal operations.' },
      { question: 'Who is this program designed for?', answer: 'It is designed for scientific distributors, laboratory suppliers and B2B partners that want a differentiated water microbiology portfolio.' }
    ] }),
    es: locale('/es/oem/kits-analisis-agua-marca-blanca', 'Kits de análisis de agua de marca blanca para distribuidores', 'Crea un catálogo diferenciado de microbiología del agua con productos AquaVerify, opciones OEM de packaging y flujos conectados a plataforma.', [
      section('Para distribuidores que necesitan un catálogo defendible', 'AquaVerify ayuda a distribuidores científicos a ir más allá del consumible genérico con kits, controles y flujos habilitados por plataforma.', ['Suministro de marca blanca o bajo marca AquaVerify', 'Kits de microbiología del agua y lab essentials', 'Acceso a plataforma para trazabilidad y reporting cliente', 'Onboarding técnico para equipos comerciales y soporte']),
      section('Un camino OEM práctico', 'Empieza con una gama enfocada, valida demanda con clientes objetivo y escala packaging, formación y flujo digital cuando el volumen esté claro.', ['Selección de portfolio por necesidad de mercado', 'Cualificación comercial y modelo de precio', 'Alineación de packaging y documentación', 'Solicitudes web cualificadas conectadas con conversaciones partner'])
    ], { eyebrow: 'OEM', primaryCta: 'Hablar de suministro marca blanca', secondaryCta: 'Ver programa distribuidor', seoTitle: 'Kits de análisis de agua marca blanca | OEM AquaVerify', faqs: [
      { question: '¿Puede AquaVerify suministrar kits de agua de marca blanca?', answer: 'AquaVerify puede evaluar suministro de marca blanca o bajo marca AquaVerify según mercado, volumen, soporte necesario y restricciones regulatorias.' },
      { question: '¿Los productos OEM se conectan a AquaVerify Cloud?', answer: 'Los programas OEM y de distribución pueden incluir flujos de plataforma para trazabilidad de muestras, reporting, CRM y portal cliente.' },
      { question: '¿Para quién está diseñado este programa?', answer: 'Está diseñado para distribuidores científicos, proveedores de laboratorio y partners B2B que quieren un portfolio diferenciado de microbiología del agua.' }
    ] }),
    fr: locale('/fr/oem/kits-analyse-eau-marque-blanche', 'Kits d’analyse de l’eau en marque blanche pour distributeurs', 'Créez un catalogue différencié de microbiologie de l’eau avec produits AquaVerify, options packaging OEM et flux connectés à la plateforme.', [
      section('Pour distributeurs qui veulent un catalogue défendable', 'AquaVerify aide les distributeurs scientifiques à dépasser les consommables génériques avec kits, contrôles et flux activés par plateforme.', ['Fourniture marque blanche ou sous marque AquaVerify', 'Kits de microbiologie de l’eau et lab essentials', 'Accès plateforme pour traçabilité et reporting client', 'Onboarding technique pour équipes commerciales et support']),
      section('Un parcours OEM pragmatique', 'Commencez par une gamme ciblée, validez la demande avec clients cibles et faites évoluer packaging, formation et flux numérique lorsque le volume est clair.', ['Sélection de portfolio par besoin marché', 'Qualification commerciale et modèle de prix', 'Alignement packaging et documentation', 'Demandes web qualifiées reliées aux conversations partenaires'])
    ], { eyebrow: 'OEM', primaryCta: 'Discuter marque blanche', secondaryCta: 'Voir programme distributeur', seoTitle: 'Kits analyse eau marque blanche | OEM AquaVerify', faqs: [
      { question: 'AquaVerify peut-il fournir des kits eau en marque blanche?', answer: 'AquaVerify peut évaluer une fourniture en marque blanche ou sous marque AquaVerify selon marché, volume, support requis et contraintes réglementaires.' },
      { question: 'Les produits OEM se connectent-ils à AquaVerify Cloud?', answer: 'Les programmes OEM et distribution peuvent inclure des flux plateforme pour traçabilité échantillon, reporting, CRM et portail client.' },
      { question: 'À qui s’adresse ce programme?', answer: 'Il s’adresse aux distributeurs scientifiques, fournisseurs de laboratoire et partenaires B2B qui veulent un portfolio différencié en microbiologie de l’eau.' }
    ] }),
    it: locale('/it/oem/kit-analisi-acqua-marca-privata', 'Kit di analisi dell’acqua private label per distributori', 'Crea un catalogo differenziato di microbiologia dell’acqua con prodotti AquaVerify, opzioni packaging OEM e flussi collegati alla piattaforma.', [
      section('Per distributori che cercano un catalogo difendibile', 'AquaVerify aiuta i distributori scientifici ad andare oltre consumabili generici con kit, controlli e flussi abilitati dalla piattaforma.', ['Fornitura private label o a marchio AquaVerify', 'Kit microbiologia dell’acqua e lab essentials', 'Accesso piattaforma per tracciabilità e reporting cliente', 'Onboarding tecnico per team commerciali e supporto']),
      section('Un percorso OEM pratico', 'Parti da una gamma focalizzata, valida la domanda con clienti target e scala packaging, formazione e flusso digitale quando il volume è chiaro.', ['Selezione portfolio per bisogno di mercato', 'Qualifica commerciale e modello prezzo', 'Allineamento packaging e documentazione', 'Richieste web qualificate collegate a conversazioni partner'])
    ], { eyebrow: 'OEM', primaryCta: 'Discuti fornitura private label', secondaryCta: 'Vedi programma distributori', seoTitle: 'Kit analisi acqua private label | OEM AquaVerify', faqs: [
      { question: 'AquaVerify può fornire kit acqua private label?', answer: 'AquaVerify può valutare fornitura private label o a marchio AquaVerify in base a mercato, volume, supporto richiesto e vincoli regolatori.' },
      { question: 'I prodotti OEM si collegano ad AquaVerify Cloud?', answer: 'I programmi OEM e distributori possono includere flussi piattaforma per tracciabilità campioni, reporting, CRM e portale clienti.' },
      { question: 'Per chi è pensato questo programma?', answer: 'È pensato per distributori scientifici, fornitori di laboratorio e partner B2B che vogliono un portfolio differenziato di microbiologia dell’acqua.' }
    ] }),
    ca: locale('/ca/oem/kits-analisi-aigua-marca-blanca', 'Kits d’anàlisi d’aigua de marca blanca per a distribuïdors', 'Crea un catàleg diferenciat de microbiologia de l’aigua amb productes AquaVerify, opcions OEM de packaging i fluxos connectats a plataforma.', [
      section('Per a distribuïdors que necessiten un catàleg defensable', 'AquaVerify ajuda distribuïdors científics a anar més enllà del consumible genèric amb kits, controls i fluxos habilitats per plataforma.', ['Subministrament de marca blanca o sota marca AquaVerify', 'Kits de microbiologia de l’aigua i lab essentials', 'Accés a plataforma per a traçabilitat i reporting client', 'Onboarding tècnic per a equips comercials i suport']),
      section('Un camí OEM pràctic', 'Comença amb una gamma enfocada, valida demanda amb clients objectiu i escala packaging, formació i flux digital quan el volum estigui clar.', ['Selecció de portfolio per necessitat de mercat', 'Qualificació comercial i model de preu', 'Alineació de packaging i documentació', 'Sol·licituds web qualificades connectades amb converses partner'])
    ], { eyebrow: 'OEM', primaryCta: 'Parlar de subministrament marca blanca', secondaryCta: 'Veure programa distribuïdor', seoTitle: 'Kits anàlisi aigua marca blanca | OEM AquaVerify', faqs: [
      { question: 'AquaVerify pot subministrar kits d’aigua de marca blanca?', answer: 'AquaVerify pot valorar subministrament de marca blanca o sota marca AquaVerify segons mercat, volum, suport necessari i restriccions regulatòries.' },
      { question: 'Els productes OEM es connecten a AquaVerify Cloud?', answer: 'Els programes OEM i de distribució poden incloure fluxos de plataforma per a traçabilitat de mostres, reporting, CRM i portal client.' },
      { question: 'Per a qui està dissenyat aquest programa?', answer: 'Està dissenyat per a distribuïdors científics, proveïdors de laboratori i partners B2B que volen un portfolio diferenciat de microbiologia de l’aigua.' }
    ] })
  }, { parentId: 'oem' }),
  page('distributors', 'partners', 'distributor', {
    en: locale('/distributors', 'AquaVerify distributors and local partners', 'Find or become an AquaVerify partner for local supply, support, training and OEM opportunities.', [
      section('Local access, global standard', 'AquaVerify works with partners who can support laboratories and water quality teams locally.', ['Distribution opportunities', 'Local technical support', 'Training and onboarding', 'OEM and white-label options']),
      section('No partner in your country?', 'AquaVerify can evaluate direct supply, new distributor opportunities or OEM collaboration.')
    ], { eyebrow: 'Distributors', primaryCta: 'Become a distributor', secondaryCta: 'Request local contact' }),
    es: locale('/es/distribuidores', 'Distribuidores y partners locales AquaVerify', 'Encuentra o conviértete en partner AquaVerify para suministro local, soporte, formación y oportunidades OEM.', [
      section('Acceso local, estándar global', 'AquaVerify trabaja con partners capaces de dar soporte local a laboratorios y equipos de calidad del agua.', ['Oportunidades de distribución', 'Soporte técnico local', 'Formación y onboarding', 'Opciones OEM y marca blanca']),
      section('¿No hay partner en tu país?', 'AquaVerify puede evaluar suministro directo, nuevos distribuidores u oportunidades OEM.')
    ], { eyebrow: 'Distribuidores', primaryCta: 'Ser distribuidor', secondaryCta: 'Pedir contacto local' }),
    fr: locale('/fr/distributeurs', 'Distributeurs et partenaires locaux AquaVerify', 'Trouvez ou devenez partenaire AquaVerify pour l’approvisionnement local, le support, la formation et les opportunités OEM.', [
      section('Accès local, standard global', 'AquaVerify travaille avec des partenaires capables de soutenir localement laboratoires et équipes qualité eau.', ['Opportunités de distribution', 'Support technique local', 'Formation et onboarding', 'Options OEM et marque blanche']),
      section('Pas de partenaire dans votre pays?', 'AquaVerify peut évaluer l’approvisionnement direct, de nouveaux distributeurs ou une collaboration OEM.')
    ], { eyebrow: 'Distributeurs', primaryCta: 'Devenir distributeur', secondaryCta: 'Demander un contact local' }),
    it: locale('/it/distributori', 'Distributori e partner locali AquaVerify', 'Trova o diventa partner AquaVerify per fornitura locale, supporto, formazione e opportunità OEM.', [
      section('Accesso locale, standard globale', 'AquaVerify lavora con partner capaci di supportare localmente laboratori e team qualità acqua.', ['Opportunità di distribuzione', 'Supporto tecnico locale', 'Formazione e onboarding', 'Opzioni OEM e private label']),
      section('Nessun partner nel tuo paese?', 'AquaVerify può valutare fornitura diretta, nuovi distributori o collaborazione OEM.')
    ], { eyebrow: 'Distributori', primaryCta: 'Diventa distributore', secondaryCta: 'Richiedi contatto locale' }),
    ca: locale('/ca/distribuidors', 'Distribuïdors i partners locals AquaVerify', 'Troba o converteix-te en partner AquaVerify per a subministrament local, suport, formació i oportunitats OEM.', [
      section('Accés local, estàndard global', 'AquaVerify treballa amb partners capaços de donar suport local a laboratoris i equips de qualitat de l’aigua.', ['Oportunitats de distribució', 'Suport tècnic local', 'Formació i onboarding', 'Opcions OEM i marca blanca']),
      section('No hi ha partner al teu país?', 'AquaVerify pot avaluar subministrament directe, nous distribuïdors o oportunitats OEM.')
    ], { eyebrow: 'Distribuïdors', primaryCta: 'Ser distribuïdor', secondaryCta: 'Demanar contacte local' })
  }),
  page('water-testing-labs', 'industries', 'quote', {
    en: locale('/industries/water-testing-laboratories', 'Water testing laboratories: more capacity, traceability and confidence in every report', 'AquaVerify connects water microbiology kits, somatic coliphage control, sample-to-report digital workflows, CoA reporting and customer portal for laboratories that need reliable results without extra administrative load.', [
      section('The challenge for water testing laboratories', 'Water testing laboratories are receiving more samples, more matrices and more documentation requirements. Pressure appears when volume grows, TAT becomes tighter and every result must be defendable for customers, audits and technical managers.', ['More sample volume with the same team: organize intake, bench work, review and delivery without adding manual coordination.', 'Evidence spread across bench, quality and report: keep sample, method, batch, user, reading and validation connected.', 'Customers ask for more visibility: provide clear status, history and deliverables without endless operational emails.', 'Chain of custody and CoA reporting: make each result easier to review, explain and retrieve.']),
      section('A connected workflow for water microbiology', 'AquaVerify links product, execution, data and customer delivery in a practical system for laboratories that want to standardize operations, expand services and reduce friction when issuing results.', ['Laboratory management: capacity, turnaround time and new service lines.', 'Quality teams: records by user, batch, method, sample and technical review.', 'Microbiology teams: kits, ready-to-use media and guided execution steps.', 'B2B customers: status, reports, history and clearer communication.']),
      section('From sample to CoA report', 'Each stage of the analysis can be connected to the next one so the laboratory works with less friction and with evidence ready for technical review.', ['Request and registration: customer, site, matrix, method and expected deliverable.', 'Reception and custody: sample status, conditions, labels and chain of custody.', 'Preparation and testing: kit, medium, batch, operator and guided bench workflow.', 'Reading and evidence: result, interpretation, traceability and supporting information.', 'Technical review: controlled validation before customer delivery.', 'Report and portal: CoA, history, customer access and communication.']),
      section('What to activate according to matrix, volume and customer type', 'The laboratory can combine kits, media, digital traceability and reporting according to method, sample volume and service level promised to the customer.', ['Presence/absence workflows: INDICA Soma 100 mL for simple screening paths.', 'Enumeration workflows: ENUMERA Soma 100 mL for agile quantitative routines.', 'Plaque workflows: PLAQUE Soma 1 mL and 100 mL for plate-based methods.', 'Digital delivery: AquaVerify Cloud, App, CoA and portal for B2B reporting.']),
      section('Roadmap for a more scalable laboratory service', 'AquaVerify can be adopted in stages: first organize the workflow, then digitize evidence, then differentiate customer delivery.', ['Workflow diagnosis: map matrices, volumes, methods, bottlenecks and customer needs.', 'Technical standardization: align products, media, batches and operating steps.', 'Digital records: connect sample, execution, reading, review and report.', 'Customer portal: give B2B customers structured history and deliverables.', 'Service scaling: add new microbiology services without multiplying administration.']),
      section('Products and modules for water laboratories', 'Modules can be adopted progressively: from kits and media to digital traceability, reporting and customer portal.', ['ENUMERA Soma 100 mL: quantitative workflow for somatic coliphages.', 'PLAQUE Soma 1 mL: plate workflow for concentrated contexts.', 'PLAQUE Soma 100 mL: plate workflow for larger-volume scenarios.', 'INDICA Soma 100 mL: presence/absence screening path.', 'Ready-to-use MSA and MSB: prepared media for routine execution.', 'AquaVerify Cloud, App and CoA: digital sample, report and customer workflow.']),
      section('Customers with demanding water-control requirements', 'The solution helps laboratories respond more clearly to customers that need traceable, repeatable and easy-to-interpret results.', ['Utilities and public administration: routine monitoring, evidence and reporting.', 'Food and beverage: process water, hygiene plans and quality programs.', 'Treatment and reuse: operational checks, deviations and follow-up.', 'Agriculture, aquaculture and seafood: preventive monitoring and water-risk control.']),
      section('Shared traceability across sample, test and report', 'When sample, test and report share traceability, the laboratory reduces ambiguity, organizes technical review and delivers more consistent information to customers.', ['Digital chain of custody: sample status, site, location and handling.', 'Execution evidence: method, kit, batch, operator, reading and comments.', 'CoA reporting: structured deliverables for customer and audit review.', 'Customer portal: history, reports and communication in one place.', 'Modular adoption: start with one workflow and expand when useful.'])
    ], { eyebrow: 'Public and private water testing laboratories', primaryCta: 'Request technical diagnosis', secondaryCta: 'View sample-to-report flow', seoTitle: 'Water Testing Laboratories | AquaVerify', seoDescription: 'Solutions for water testing laboratories: microbiology kits, somatic coliphages, digital traceability, CoA reporting and customer portal.', faqs: [
      { question: 'Does AquaVerify replace an accredited laboratory?', answer: 'No. AquaVerify acts as a product, traceability, digital workflow, reporting and customer-portal layer. Accredited testing must remain within the laboratory’s approved scope, methods, validations and procedures.' },
      { question: 'What kind of laboratories is it designed for?', answer: 'It is designed for environmental laboratories, public laboratories, utility laboratories, laboratories serving food and beverage companies, internal water-control teams and organizations that want to expand microbiology services with better traceability.' },
      { question: 'What does it add compared with a generic LIMS?', answer: 'It adds a water-microbiology focus: matrices, sampling points, somatic coliphages, kits, batches, reading evidence, CoA reports, customer history and B2B communication from the same workflow.' },
      { question: 'Can it help reduce turnaround time?', answer: 'Yes, by standardizing steps, reducing manual transcription, organizing technical review and making report delivery easier. The real impact depends on sample volume, applied methods, available team and the laboratory’s current workflow.' },
      { question: 'Which products fit somatic coliphage workflows?', answer: 'ENUMERA Soma 100 mL, PLAQUE Soma 1 mL, PLAQUE Soma 100 mL, INDICA Soma 100 mL, MSA/MSB media and AquaVerify Cloud & App cover presence/absence, enumeration, plaque, reporting and digital-traceability scenarios according to matrix and protocol.' },
      { question: 'Does it support B2B customers with multiple locations?', answer: 'Yes. The customer portal can organize samples, locations, histories, deliverables and communication by account, site or sampling point to reduce operational emails and accelerate information delivery.' },
      { question: 'Can it integrate with existing processes?', answer: 'Yes. Adoption can start as an internal sample-to-report workflow and evolve toward integration with LIMS, CRM, reporting, customer portal or multi-site processes when the laboratory needs it.' },
      { question: 'How does a project start?', answer: 'The first step is a technical workflow diagnosis: matrices, monthly volume, methods, accreditation requirements, target TAT, existing software, friction points and customer-reporting needs.' }
    ] }),
    es: locale('/es/industrias/laboratorios-analisis-agua', 'Laboratorios de análisis de agua: más capacidad, trazabilidad y confianza en cada informe', 'AquaVerify conecta kits de microbiología, control de colífagos somáticos, flujos digitales de muestra a informe, reporting CoA y portal cliente para laboratorios que necesitan entregar resultados fiables sin añadir carga administrativa.', [
      section('El reto del laboratorio de agua', 'Los laboratorios de análisis de agua reciben más muestras, más matrices y más exigencias documentales. La presión aparece cuando el volumen crece, el TAT se estrecha y cada dato debe ser defendible ante clientes, auditorías y responsables técnicos.', ['Más volumen con el mismo equipo', 'Evidencia dispersa entre banco, calidad e informe', 'Clientes que piden más visibilidad', 'Cadena de custodia y reporting CoA']),
      section('Un flujo conectado para microbiología del agua', 'AquaVerify une producto, ejecución, datos y entrega al cliente en un sistema práctico para laboratorios que quieren estandarizar operaciones, ampliar servicios y reducir fricción en la emisión de resultados.', ['Dirección de laboratorio: capacidad, TAT y nuevas líneas de servicio', 'Calidad: registros por usuario, lote, método, muestra y revisión', 'Microbiología: kits, medios listos para usar y pasos guiados', 'Cliente B2B: estado, informes, histórico y comunicación clara']),
      section('De la muestra al informe CoA', 'Cada etapa del análisis puede quedar conectada con la siguiente para que el laboratorio trabaje con menos fricción y con evidencias listas para revisión técnica.', ['Solicitud y alta', 'Recepción y custodia', 'Preparación y ensayo', 'Lectura y evidencia', 'Revisión técnica', 'Informe y portal']),
      section('Qué activar según matriz, volumen y tipo de cliente', 'El laboratorio puede combinar kits, medios, trazabilidad digital y reporting según el método, el volumen de muestra y el nivel de servicio prometido al cliente.', ['INDICA Soma 100 mL para presencia/ausencia', 'ENUMERA Soma 100 mL para enumeración ágil', 'PLAQUE Soma 1 mL y 100 mL para flujos de placa', 'AquaVerify Cloud, App, CoA y portal para entrega B2B']),
      section('Roadmap para un servicio más escalable', 'AquaVerify permite avanzar por etapas: primero ordenar el flujo, después digitalizar evidencias, y finalmente diferenciar la entrega al cliente.', ['Diagnóstico del flujo', 'Estandarización técnica', 'Registro digital', 'Portal cliente', 'Escalado del servicio']),
      section('Productos y módulos para laboratorios de agua', 'Los módulos se pueden adoptar de forma progresiva: desde kits y medios hasta trazabilidad digital, reporting y portal cliente.', ['ENUMERA Soma 100 mL', 'PLAQUE Soma 1 mL', 'PLAQUE Soma 100 mL', 'INDICA Soma 100 mL', 'MSA y MSB listos para usar', 'AquaVerify Cloud, App y CoA']),
      section('Clientes con alta exigencia de control hídrico', 'La solución permite al laboratorio responder con más claridad a clientes que necesitan resultados trazables, repetibles y fáciles de interpretar.', ['Utilities y administración', 'Industria alimentaria y bebidas', 'Tratamiento y reutilización', 'Agricultura, acuicultura y seafood']),
      section('Trazabilidad compartida entre muestra, ensayo e informe', 'Cuando muestra, ensayo e informe comparten trazabilidad, el laboratorio reduce ambigüedad, organiza mejor la revisión técnica y entrega información más consistente a sus clientes.', ['Cadena de custodia digital', 'Evidencias de ejecución', 'Reporting CoA', 'Portal cliente', 'Adopción modular'])
    ], { eyebrow: 'Laboratorios públicos y privados de análisis de agua', primaryCta: 'Solicitar diagnóstico técnico', secondaryCta: 'Ver flujo muestra a informe', seoTitle: 'Laboratorios de análisis de agua | AquaVerify', seoDescription: 'Soluciones para laboratorios de análisis de agua: kits microbiológicos, colífagos somáticos, trazabilidad digital, reporting CoA y portal cliente.', faqs: [
      { question: '¿AquaVerify sustituye a un laboratorio acreditado?', answer: 'No. AquaVerify actúa como capa de producto, trazabilidad, flujo digital, reporting y portal cliente. Cuando un ensayo se emite bajo acreditación, debe integrarse en el alcance, los métodos, las validaciones y los procedimientos aprobados por el propio laboratorio.' },
      { question: '¿Para qué tipo de laboratorios está pensado?', answer: 'Está pensado para laboratorios ambientales, laboratorios públicos, laboratorios de utilities, laboratorios que sirven a industria alimentaria, equipos internos de control de agua y organizaciones que quieren ampliar servicios microbiológicos con mayor trazabilidad.' },
      { question: '¿Qué aporta frente a un LIMS genérico?', answer: 'Aporta un enfoque específico en microbiología del agua: matrices, puntos de muestreo, colífagos somáticos, kits, lotes, evidencias de lectura, informes CoA, histórico por cliente y comunicación B2B desde el mismo flujo de trabajo.' },
      { question: '¿Puede ayudar a reducir el TAT o tiempo de respuesta?', answer: 'Sí, al estandarizar pasos, reducir transcripción manual, ordenar la revisión técnica y facilitar la emisión del informe. El impacto real depende del volumen de muestras, los métodos aplicados, el equipo disponible y el flujo actual del laboratorio.' },
      { question: '¿Qué productos encajan con colífagos somáticos?', answer: 'ENUMERA Soma 100 mL, PLAQUE Soma 1 mL, PLAQUE Soma 100 mL, INDICA Soma 100 mL, medios MSA/MSB y AquaVerify Cloud & App cubren escenarios de presencia/ausencia, enumeración, placa, reporting y trazabilidad digital según la matriz y el protocolo del laboratorio.' },
      { question: '¿Sirve para clientes B2B con varias ubicaciones?', answer: 'Sí. El portal cliente permite organizar muestras, ubicaciones, históricos, entregables y comunicación por cuenta, instalación o punto de muestreo para reducir correos operativos y acelerar la entrega de información.' },
      { question: '¿Se puede integrar con procesos existentes?', answer: 'Sí. La adopción puede empezar como flujo interno de muestra a informe y evolucionar hacia integración con LIMS, CRM, reporting, portal cliente o procesos multi-sede cuando el laboratorio lo necesite.' },
      { question: '¿Cómo se inicia un proyecto?', answer: 'El primer paso es un diagnóstico técnico del flujo actual: matrices, volumen mensual, métodos, requisitos de acreditación, TAT objetivo, software existente, puntos de fricción y necesidades de reporting para clientes.' }
    ] }),
    fr: locale('/fr/industries/laboratoires-analyse-eau', 'Laboratoires d’analyse de l’eau : plus de capacité, de traçabilité et de confiance dans chaque rapport', 'AquaVerify relie kits de microbiologie de l’eau, contrôle des coliphages somatiques, flux numériques échantillon-rapport, reporting CoA et portail client pour les laboratoires qui doivent livrer des résultats fiables sans charge administrative supplémentaire.', [
      section('Le défi des laboratoires d’analyse de l’eau', 'Les laboratoires d’analyse de l’eau reçoivent davantage d’échantillons, de matrices et d’exigences documentaires. La pression augmente lorsque le volume progresse, que les délais se resserrent et que chaque résultat doit être défendable auprès des clients, auditeurs et responsables techniques.', ['Plus de volume avec la même équipe : organiser réception, paillasse, revue et livraison sans coordination manuelle supplémentaire.', 'Des preuves dispersées entre paillasse, qualité et rapport : relier échantillon, méthode, lot, utilisateur, lecture et validation.', 'Des clients qui demandent plus de visibilité : offrir statut, historique et livrables clairs sans multiplier les emails opérationnels.', 'Chaîne de traçabilité et reporting CoA : rendre chaque résultat plus facile à revoir, expliquer et retrouver.']),
      section('Un flux connecté pour la microbiologie de l’eau', 'AquaVerify relie produit, exécution, données et livraison client dans un système pratique pour les laboratoires qui veulent standardiser les opérations, développer leurs services et réduire les frictions lors de l’émission des résultats.', ['Direction de laboratoire : capacité, délai de rendu et nouvelles lignes de service.', 'Qualité : enregistrements par utilisateur, lot, méthode, échantillon et revue technique.', 'Microbiologie : kits, milieux prêts à l’emploi et étapes guidées.', 'Client B2B : statut, rapports, historique et communication plus claire.']),
      section('De l’échantillon au rapport CoA', 'Chaque étape de l’analyse peut être reliée à la suivante afin que le laboratoire travaille avec moins de friction et des preuves prêtes pour la revue technique.', ['Demande et enregistrement : client, site, matrice, méthode et livrable attendu.', 'Réception et traçabilité : statut échantillon, conditions, étiquettes et chaîne de traçabilité.', 'Préparation et essai : kit, milieu, lot, opérateur et flux de paillasse guidé.', 'Lecture et preuves : résultat, interprétation, traçabilité et informations associées.', 'Revue technique : validation contrôlée avant livraison client.', 'Rapport et portail : CoA, historique, accès client et communication.']),
      section('Quoi activer selon matrice, volume et type de client', 'Le laboratoire peut combiner kits, milieux, traçabilité numérique et reporting selon la méthode, le volume d’échantillon et le niveau de service promis au client.', ['Présence/absence : INDICA Soma 100 mL pour les flux de screening simples.', 'Dénombrement : ENUMERA Soma 100 mL pour les routines quantitatives agiles.', 'Plaque : PLAQUE Soma 1 mL et 100 mL pour les méthodes sur plaque.', 'Livraison numérique : AquaVerify Cloud, App, CoA et portail pour le reporting B2B.']),
      section('Roadmap pour un service laboratoire plus scalable', 'AquaVerify peut être adopté par étapes : d’abord organiser le flux, puis numériser les preuves, puis différencier la livraison client.', ['Diagnostic du flux : cartographier matrices, volumes, méthodes, goulets et besoins clients.', 'Standardisation technique : aligner produits, milieux, lots et étapes opératoires.', 'Enregistrements numériques : relier échantillon, exécution, lecture, revue et rapport.', 'Portail client : fournir aux clients B2B historique et livrables structurés.', 'Montée en charge du service : ajouter de nouveaux services microbiologiques sans multiplier l’administration.']),
      section('Produits et modules pour laboratoires d’eau', 'Les modules peuvent être adoptés progressivement : depuis les kits et milieux jusqu’à la traçabilité numérique, au reporting et au portail client.', ['ENUMERA Soma 100 mL : flux quantitatif pour coliphages somatiques.', 'PLAQUE Soma 1 mL : flux plaque pour contextes concentrés.', 'PLAQUE Soma 100 mL : flux plaque pour scénarios de volume plus élevé.', 'INDICA Soma 100 mL : parcours présence/absence.', 'MSA et MSB prêts à l’emploi : milieux préparés pour routine.', 'AquaVerify Cloud, App et CoA : flux numérique échantillon, rapport et client.']),
      section('Clients avec exigences élevées de contrôle de l’eau', 'La solution aide le laboratoire à répondre plus clairement aux clients qui ont besoin de résultats traçables, répétables et faciles à interpréter.', ['Utilities et administration publique : monitoring routinier, preuves et reporting.', 'Food & beverage : eau de process, plans d’hygiène et programmes qualité.', 'Traitement et réutilisation : contrôles opérationnels, écarts et suivi.', 'Agriculture, aquaculture et seafood : monitoring préventif et gestion du risque hydrique.']),
      section('Traçabilité partagée entre échantillon, essai et rapport', 'Lorsque l’échantillon, l’essai et le rapport partagent la même traçabilité, le laboratoire réduit l’ambiguïté, organise mieux la revue technique et livre une information plus cohérente aux clients.', ['Chaîne de traçabilité numérique : statut, site, emplacement et manipulation.', 'Preuves d’exécution : méthode, kit, lot, opérateur, lecture et commentaires.', 'Reporting CoA : livrables structurés pour client et audit.', 'Portail client : historique, rapports et communication au même endroit.', 'Adoption modulaire : commencer par un flux et étendre lorsque c’est utile.'])
    ], { eyebrow: 'Laboratoires publics et privés d’analyse de l’eau', primaryCta: 'Demander un diagnostic technique', secondaryCta: 'Voir le flux échantillon-rapport', seoTitle: 'Laboratoires d’analyse de l’eau | AquaVerify', seoDescription: 'Solutions pour laboratoires d’analyse de l’eau : kits microbiologiques, coliphages somatiques, traçabilité numérique, reporting CoA et portail client.', faqs: [
      { question: 'AquaVerify remplace-t-il un laboratoire accrédité?', answer: 'Non. AquaVerify agit comme couche produit, traçabilité, flux numérique, reporting et portail client. Les essais accrédités doivent rester dans le périmètre, les méthodes, les validations et les procédures approuvés du laboratoire.' },
      { question: 'À quels laboratoires cette solution s’adresse-t-elle?', answer: 'Elle s’adresse aux laboratoires environnementaux, publics, utilities, aux laboratoires servant l’industrie agroalimentaire, aux équipes internes de contrôle de l’eau et aux organisations qui veulent développer des services microbiologiques avec plus de traçabilité.' },
      { question: 'Qu’apporte-t-elle par rapport à un LIMS générique?', answer: 'Elle apporte un focus microbiologie de l’eau : matrices, points de prélèvement, coliphages somatiques, kits, lots, preuves de lecture, rapports CoA, historique client et communication B2B depuis le même flux.' },
      { question: 'Peut-elle aider à réduire le délai de rendu?', answer: 'Oui, en standardisant les étapes, en réduisant la transcription manuelle, en organisant la revue technique et en facilitant l’émission du rapport. L’impact réel dépend du volume, des méthodes, de l’équipe et du flux existant.' },
      { question: 'Quels produits conviennent aux flux coliphages somatiques?', answer: 'ENUMERA Soma 100 mL, PLAQUE Soma 1 mL, PLAQUE Soma 100 mL, INDICA Soma 100 mL, les milieux MSA/MSB et AquaVerify Cloud & App couvrent présence/absence, dénombrement, plaque, reporting et traçabilité numérique selon matrice et protocole.' },
      { question: 'Est-ce utile pour des clients B2B multi-sites?', answer: 'Oui. Le portail client permet d’organiser échantillons, sites, historiques, livrables et communication par compte, installation ou point de prélèvement.' },
      { question: 'Peut-elle s’intégrer à des processus existants?', answer: 'Oui. L’adoption peut commencer comme flux interne échantillon-rapport puis évoluer vers LIMS, CRM, reporting, portail client ou processus multi-sites.' },
      { question: 'Comment démarrer un projet?', answer: 'Le premier pas est un diagnostic technique : matrices, volume mensuel, méthodes, exigences d’accréditation, TAT cible, logiciel existant, points de friction et besoins de reporting client.' }
    ] }),
    it: locale('/it/settori/laboratori-analisi-acqua', 'Laboratori di analisi dell’acqua: più capacità, tracciabilità e fiducia in ogni report', 'AquaVerify collega kit di microbiologia dell’acqua, controllo dei colifagi somatici, flussi digitali campione-report, reporting CoA e portale cliente per laboratori che devono consegnare risultati affidabili senza aggiungere carico amministrativo.', [
      section('La sfida dei laboratori di analisi dell’acqua', 'I laboratori di analisi dell’acqua ricevono più campioni, più matrici e più requisiti documentali. La pressione cresce quando aumenta il volume, il TAT si restringe e ogni risultato deve essere difendibile per clienti, audit e responsabili tecnici.', ['Più volume con lo stesso team: organizzare accettazione, banco, revisione e consegna senza ulteriore coordinamento manuale.', 'Evidenze disperse tra banco, qualità e report: collegare campione, metodo, lotto, utente, lettura e validazione.', 'Clienti che chiedono più visibilità: offrire stato, storico e deliverable chiari senza infinite email operative.', 'Catena di custodia e reporting CoA: rendere ogni risultato più facile da revisionare, spiegare e recuperare.']),
      section('Un workflow connesso per la microbiologia dell’acqua', 'AquaVerify collega prodotto, esecuzione, dati e consegna cliente in un sistema pratico per laboratori che vogliono standardizzare le operazioni, ampliare i servizi e ridurre attriti nell’emissione dei risultati.', ['Direzione laboratorio: capacità, tempo di risposta e nuove linee di servizio.', 'Qualità: registri per utente, lotto, metodo, campione e revisione tecnica.', 'Microbiologia: kit, terreni pronti all’uso e passaggi guidati.', 'Cliente B2B: stato, report, storico e comunicazione più chiara.']),
      section('Dal campione al report CoA', 'Ogni fase dell’analisi può essere collegata alla successiva, così il laboratorio lavora con meno attrito e con evidenze pronte per la revisione tecnica.', ['Richiesta e registrazione: cliente, sito, matrice, metodo e deliverable previsto.', 'Accettazione e custodia: stato del campione, condizioni, etichette e catena di custodia.', 'Preparazione e test: kit, terreno, lotto, operatore e workflow di banco guidato.', 'Lettura ed evidenze: risultato, interpretazione, tracciabilità e informazioni di supporto.', 'Revisione tecnica: validazione controllata prima della consegna al cliente.', 'Report e portale: CoA, storico, accesso cliente e comunicazione.']),
      section('Cosa attivare secondo matrice, volume e cliente', 'Il laboratorio può combinare kit, terreni, tracciabilità digitale e reporting secondo metodo, volume del campione e livello di servizio promesso al cliente.', ['Presenza/assenza: INDICA Soma 100 mL per percorsi di screening semplici.', 'Enumerazione: ENUMERA Soma 100 mL per routine quantitative agili.', 'Piastra: PLAQUE Soma 1 mL e 100 mL per metodi su piastra.', 'Consegna digitale: AquaVerify Cloud, App, CoA e portale per reporting B2B.']),
      section('Roadmap per un servizio di laboratorio più scalabile', 'AquaVerify può essere adottato per fasi: prima organizzare il flusso, poi digitalizzare le evidenze, infine differenziare la consegna al cliente.', ['Diagnosi del workflow: mappare matrici, volumi, metodi, colli di bottiglia e bisogni cliente.', 'Standardizzazione tecnica: allineare prodotti, terreni, lotti e passaggi operativi.', 'Registri digitali: collegare campione, esecuzione, lettura, revisione e report.', 'Portale cliente: offrire ai clienti B2B storico e deliverable strutturati.', 'Scalabilità del servizio: aggiungere nuovi servizi microbiologici senza moltiplicare l’amministrazione.']),
      section('Prodotti e moduli per laboratori dell’acqua', 'I moduli possono essere adottati progressivamente: dai kit e terreni alla tracciabilità digitale, al reporting e al portale cliente.', ['ENUMERA Soma 100 mL: workflow quantitativo per colifagi somatici.', 'PLAQUE Soma 1 mL: workflow su piastra per contesti concentrati.', 'PLAQUE Soma 100 mL: workflow su piastra per scenari a volume maggiore.', 'INDICA Soma 100 mL: percorso presenza/assenza.', 'MSA e MSB pronti all’uso: terreni preparati per routine.', 'AquaVerify Cloud, App e CoA: workflow digitale per campione, report e cliente.']),
      section('Clienti con requisiti elevati di controllo idrico', 'La soluzione aiuta il laboratorio a rispondere con maggiore chiarezza a clienti che necessitano risultati tracciabili, ripetibili e facili da interpretare.', ['Utilities e pubblica amministrazione: monitoraggio routinario, evidenze e reporting.', 'Food & beverage: acqua di processo, piani igienici e programmi qualità.', 'Trattamento e riutilizzo: controlli operativi, deviazioni e follow-up.', 'Agricoltura, acquacoltura e seafood: monitoraggio preventivo e controllo del rischio idrico.']),
      section('Tracciabilità condivisa tra campione, test e report', 'Quando campione, test e report condividono la stessa tracciabilità, il laboratorio riduce ambiguità, organizza meglio la revisione tecnica e consegna informazioni più coerenti ai clienti.', ['Catena di custodia digitale: stato, sito, ubicazione e gestione del campione.', 'Evidenze di esecuzione: metodo, kit, lotto, operatore, lettura e commenti.', 'Reporting CoA: deliverable strutturati per cliente e audit.', 'Portale cliente: storico, report e comunicazione in un unico punto.', 'Adozione modulare: iniziare da un workflow ed espandere quando serve.'])
    ], { eyebrow: 'Laboratori pubblici e privati di analisi dell’acqua', primaryCta: 'Richiedi diagnosi tecnica', secondaryCta: 'Vedi flusso campione-report', seoTitle: 'Laboratori di analisi dell’acqua | AquaVerify', seoDescription: 'Soluzioni per laboratori di analisi dell’acqua: kit microbiologici, colifagi somatici, tracciabilità digitale, reporting CoA e portale cliente.', faqs: [
      { question: 'AquaVerify sostituisce un laboratorio accreditato?', answer: 'No. AquaVerify agisce come livello di prodotto, tracciabilità, workflow digitale, reporting e portale cliente. I test accreditati devono restare nell’ambito, metodi, validazioni e procedure approvati dal laboratorio.' },
      { question: 'Per quali laboratori è pensato?', answer: 'È pensato per laboratori ambientali, pubblici, utility, laboratori che servono food & beverage, team interni di controllo acqua e organizzazioni che vogliono ampliare servizi microbiologici con più tracciabilità.' },
      { question: 'Cosa aggiunge rispetto a un LIMS generico?', answer: 'Aggiunge un focus sulla microbiologia dell’acqua: matrici, punti di campionamento, colifagi somatici, kit, lotti, evidenze di lettura, report CoA, storico cliente e comunicazione B2B nello stesso workflow.' },
      { question: 'Può aiutare a ridurre il tempo di risposta?', answer: 'Sì, standardizzando passaggi, riducendo trascrizione manuale, organizzando la revisione tecnica e facilitando l’emissione del report. L’impatto reale dipende da volume, metodi, team e workflow attuale.' },
      { question: 'Quali prodotti si adattano ai workflow dei colifagi somatici?', answer: 'ENUMERA Soma 100 mL, PLAQUE Soma 1 mL, PLAQUE Soma 100 mL, INDICA Soma 100 mL, terreni MSA/MSB e AquaVerify Cloud & App coprono presenza/assenza, enumerazione, piastra, reporting e tracciabilità digitale secondo matrice e protocollo.' },
      { question: 'Supporta clienti B2B con più sedi?', answer: 'Sì. Il portale cliente organizza campioni, sedi, storici, deliverable e comunicazioni per account, sito o punto di campionamento.' },
      { question: 'Può integrarsi con processi esistenti?', answer: 'Sì. L’adozione può iniziare come workflow interno campione-report ed evolvere verso LIMS, CRM, reporting, portale cliente o processi multi-sede.' },
      { question: 'Come inizia un progetto?', answer: 'Il primo passo è una diagnosi tecnica del workflow: matrici, volume mensile, metodi, requisiti di accreditamento, TAT obiettivo, software esistente, punti di frizione e bisogni di reporting cliente.' }
    ] }),
    ca: locale('/ca/sectors/laboratoris-analisi-aigua', 'Laboratoris d’anàlisi d’aigua: més capacitat, traçabilitat i confiança en cada informe', 'AquaVerify connecta kits de microbiologia de l’aigua, control de colífags somàtics, fluxos digitals de mostra a informe, reporting CoA i portal client per a laboratoris que necessiten entregar resultats fiables sense afegir càrrega administrativa.', [
      section('El repte del laboratori d’anàlisi d’aigua', 'Els laboratoris d’anàlisi d’aigua reben més mostres, més matrius i més exigències documentals. La pressió apareix quan el volum creix, el TAT s’estreny i cada resultat ha de ser defensable davant clients, auditories i responsables tècnics.', ['Més volum amb el mateix equip: organitzar recepció, banc, revisió i entrega sense afegir coordinació manual.', 'Evidència dispersa entre banc, qualitat i informe: connectar mostra, mètode, lot, usuari, lectura i validació.', 'Clients que demanen més visibilitat: oferir estat, històric i entregables clars sense multiplicar correus operatius.', 'Cadena de custòdia i reporting CoA: fer cada resultat més fàcil de revisar, explicar i recuperar.']),
      section('Un flux connectat per a microbiologia de l’aigua', 'AquaVerify uneix producte, execució, dades i entrega al client en un sistema pràctic per a laboratoris que volen estandarditzar operacions, ampliar serveis i reduir fricció en l’emissió de resultats.', ['Direcció de laboratori: capacitat, temps de resposta i noves línies de servei.', 'Qualitat: registres per usuari, lot, mètode, mostra i revisió tècnica.', 'Microbiologia: kits, medis preparats i passos guiats.', 'Client B2B: estat, informes, històric i comunicació més clara.']),
      section('De la mostra a l’informe CoA', 'Cada etapa de l’anàlisi pot quedar connectada amb la següent perquè el laboratori treballi amb menys fricció i amb evidències preparades per a revisió tècnica.', ['Sol·licitud i alta: client, instal·lació, matriu, mètode i entregable previst.', 'Recepció i custòdia: estat de mostra, condicions, etiquetes i cadena de custòdia.', 'Preparació i assaig: kit, medi, lot, operador i flux de banc guiat.', 'Lectura i evidència: resultat, interpretació, traçabilitat i informació de suport.', 'Revisió tècnica: validació controlada abans de l’entrega al client.', 'Informe i portal: CoA, històric, accés client i comunicació.']),
      section('Què activar segons matriu, volum i tipus de client', 'El laboratori pot combinar kits, medis, traçabilitat digital i reporting segons el mètode, el volum de mostra i el nivell de servei promès al client.', ['Presència/absència: INDICA Soma 100 mL per a cribratge senzill.', 'Enumeració: ENUMERA Soma 100 mL per a rutines quantitatives àgils.', 'Placa: PLAQUE Soma 1 mL i 100 mL per a mètodes en placa.', 'Entrega digital: AquaVerify Cloud, App, CoA i portal per a reporting B2B.']),
      section('Roadmap per a un servei de laboratori més escalable', 'AquaVerify es pot adoptar per etapes: primer ordenar el flux, després digitalitzar evidències i finalment diferenciar l’entrega al client.', ['Diagnòstic del flux: mapar matrius, volums, mètodes, colls d’ampolla i necessitats del client.', 'Estandardització tècnica: alinear productes, medis, lots i passos operatius.', 'Registres digitals: connectar mostra, execució, lectura, revisió i informe.', 'Portal client: donar als clients B2B històric i entregables estructurats.', 'Escalat del servei: afegir nous serveis microbiològics sense multiplicar administració.']),
      section('Productes i mòduls per a laboratoris d’aigua', 'Els mòduls es poden adoptar progressivament: des de kits i medis fins a traçabilitat digital, reporting i portal client.', ['ENUMERA Soma 100 mL: flux quantitatiu per a colífags somàtics.', 'PLAQUE Soma 1 mL: flux en placa per a contextos concentrats.', 'PLAQUE Soma 100 mL: flux en placa per a escenaris de més volum.', 'INDICA Soma 100 mL: ruta de presència/absència.', 'MSA i MSB llestos per utilitzar: medis preparats per a rutina.', 'AquaVerify Cloud, App i CoA: flux digital de mostra, informe i client.']),
      section('Clients amb alta exigència de control hídric', 'La solució permet al laboratori respondre amb més claredat a clients que necessiten resultats traçables, repetibles i fàcils d’interpretar.', ['Utilities i administració pública: monitoratge rutinari, evidències i reporting.', 'Food & beverage: aigua de procés, plans d’higiene i programes de qualitat.', 'Tractament i reutilització: controls operatius, desviacions i seguiment.', 'Agricultura, aqüicultura i seafood: monitoratge preventiu i control del risc hídric.']),
      section('Traçabilitat compartida entre mostra, assaig i informe', 'Quan mostra, assaig i informe comparteixen traçabilitat, el laboratori redueix ambigüitat, organitza millor la revisió tècnica i entrega informació més consistent als clients.', ['Cadena de custòdia digital: estat, instal·lació, ubicació i manipulació.', 'Evidències d’execució: mètode, kit, lot, operador, lectura i comentaris.', 'Reporting CoA: entregables estructurats per a client i auditoria.', 'Portal client: històric, informes i comunicació en un sol lloc.', 'Adopció modular: començar amb un flux i ampliar quan sigui útil.'])
    ], { eyebrow: 'Laboratoris públics i privats d’anàlisi d’aigua', primaryCta: 'Sol·licitar diagnòstic tècnic', secondaryCta: 'Veure flux mostra-informe', seoTitle: 'Laboratoris d’anàlisi d’aigua | AquaVerify', seoDescription: 'Solucions per a laboratoris d’anàlisi d’aigua: kits microbiològics, colífags somàtics, traçabilitat digital, reporting CoA i portal client.', faqs: [
      { question: 'AquaVerify substitueix un laboratori acreditat?', answer: 'No. AquaVerify actua com a capa de producte, traçabilitat, flux digital, reporting i portal client. Els assaigs acreditats s’han d’integrar en l’abast, mètodes, validacions i procediments aprovats pel laboratori.' },
      { question: 'Per a quin tipus de laboratoris està pensat?', answer: 'Està pensat per a laboratoris ambientals, públics, utilities, laboratoris que serveixen indústria alimentària, equips interns de control d’aigua i organitzacions que volen ampliar serveis microbiològics amb més traçabilitat.' },
      { question: 'Què aporta davant un LIMS genèric?', answer: 'Aporta un enfocament específic en microbiologia de l’aigua: matrius, punts de mostreig, colífags somàtics, kits, lots, evidències de lectura, informes CoA, històric client i comunicació B2B des del mateix flux.' },
      { question: 'Pot ajudar a reduir el temps de resposta?', answer: 'Sí, estandarditzant passos, reduint transcripció manual, ordenant la revisió tècnica i facilitant l’emissió de l’informe. L’impacte real depèn del volum, mètodes, equip i flux actual.' },
      { question: 'Quins productes encaixen amb fluxos de colífags somàtics?', answer: 'ENUMERA Soma 100 mL, PLAQUE Soma 1 mL, PLAQUE Soma 100 mL, INDICA Soma 100 mL, medis MSA/MSB i AquaVerify Cloud & App cobreixen presència/absència, enumeració, placa, reporting i traçabilitat digital segons matriu i protocol.' },
      { question: 'Serveix per a clients B2B amb diverses ubicacions?', answer: 'Sí. El portal client permet organitzar mostres, ubicacions, històrics, entregables i comunicació per compte, instal·lació o punt de mostreig.' },
      { question: 'Es pot integrar amb processos existents?', answer: 'Sí. L’adopció pot començar com a flux intern mostra-informe i evolucionar cap a LIMS, CRM, reporting, portal client o processos multi-seu.' },
      { question: 'Com s’inicia un projecte?', answer: 'El primer pas és un diagnòstic tècnic del flux actual: matrius, volum mensual, mètodes, requisits d’acreditació, TAT objectiu, software existent, punts de fricció i necessitats de reporting client.' }
    ] })
  }),
  page('water-quality-control', 'industries', 'contact', {
    ...WATER_QUALITY_CONTROL_PAGE
  }),
  page('resources', 'resources', 'quote', {
    en: locale('/resources', 'Water microbiology resources and buyer guides', 'Technical and commercial guides for water microbiology products, digital traceability, OEM distribution and quality workflows.', [
      section('Resources for technical buyers', 'Use this hub to compare qualitative and quantitative workflows, understand coliphage indicators, and prepare product or OEM discussions with a clearer buying brief.', ['Whitepapers on EU and US water rules', 'ISO and EPA-oriented water microbiology workflows', 'Presence/absence and enumeration decision guides', 'Digital traceability for samples, reports and customers']),
      section('Regulatory whitepapers for technical decisions', 'The resource library now includes practical whitepapers on the EU Drinking Water Directive, EPA-oriented drinking water compliance and the software evidence layer behind sample traceability.', ['EU Directive 2020/2184 and somatic coliphages', 'US Total Coliform Rule and EPA method context', 'Software records for audits, reports and customer follow-up', 'Product, OEM and SaaS routes connected to each guide']),
      section('From reading to action', 'Each guide connects scientific context with AquaVerify products, platform workflows and the next commercial step for laboratories, distributors and quality teams.')
    ], { eyebrow: 'Resources', primaryCta: 'Talk to AquaVerify', secondaryCta: 'View products', seoTitle: 'Water Microbiology Resources | AquaVerify Guides', faqs: [
      { question: 'Who are these resources for?', answer: 'They are written for laboratories, distributors, water quality teams and biotech companies evaluating water microbiology products or connected software workflows.' },
      { question: 'Can AquaVerify help after reading a guide?', answer: 'Yes. AquaVerify can help map the relevant product family, OEM option or platform workflow for the use case.' }
    ] }),
    es: locale('/es/recursos', 'Recursos de microbiología del agua y guías para compradores', 'Guías técnicas y comerciales sobre productos de microbiología del agua, trazabilidad digital, distribución OEM y flujos de calidad.', [
      section('Recursos para compradores técnicos', 'Usa este hub para comparar flujos cualitativos y cuantitativos, entender indicadores colífagos y preparar conversaciones de producto u OEM con un brief de compra más claro.', ['Whitepapers sobre normativa europea y estadounidense', 'Flujos de microbiología del agua orientados a ISO y EPA', 'Guías de decisión presencia/ausencia y enumeración', 'Trazabilidad digital de muestras, informes y clientes']),
      section('Whitepapers normativos para decisiones técnicas', 'La biblioteca de recursos incorpora whitepapers prácticos sobre la Directiva europea de agua potable, cumplimiento orientado a EPA y la capa de evidencia software que sostiene la trazabilidad de muestras.', ['Directiva (UE) 2020/2184 y colífagos somáticos', 'Total Coliform Rule de Estados Unidos y contexto de métodos EPA', 'Registros software para auditorías, informes y seguimiento de clientes', 'Rutas de producto, OEM y SaaS conectadas a cada guía']),
      section('De la lectura a la acción', 'Cada guía conecta contexto científico con productos AquaVerify, flujos de plataforma y el siguiente paso comercial para laboratorios, distribuidores y equipos de calidad.')
    ], { eyebrow: 'Recursos', primaryCta: 'Hablar con AquaVerify', secondaryCta: 'Ver productos', seoTitle: 'Recursos de microbiología del agua | Guías AquaVerify', faqs: [
      { question: '¿Para quién son estos recursos?', answer: 'Están escritos para laboratorios, distribuidores, equipos de calidad del agua y empresas biotech que evalúan productos de microbiología del agua o flujos digitales conectados.' },
      { question: '¿AquaVerify puede ayudar después de leer una guía?', answer: 'Sí. AquaVerify puede ayudar a mapear la familia de producto, opción OEM o flujo de plataforma más adecuado para el caso de uso.' }
    ] }),
    fr: locale('/fr/ressources', 'Ressources microbiologie de l’eau et guides acheteurs', 'Guides techniques et commerciaux sur les produits de microbiologie de l’eau, la traçabilité numérique, la distribution OEM et les flux qualité.', [
      section('Ressources pour acheteurs techniques', 'Utilisez ce hub pour comparer les flux qualitatifs et quantitatifs, comprendre les indicateurs coliphages et préparer des échanges produit ou OEM avec un brief d’achat plus clair.', ['Whitepapers sur les règles européennes et américaines', 'Flux de microbiologie de l’eau orientés ISO et EPA', 'Guides de décision présence/absence et dénombrement', 'Traçabilité numérique des échantillons, rapports et clients']),
      section('Whitepapers réglementaires pour décisions techniques', 'La bibliothèque ajoute des whitepapers pratiques sur la directive européenne eau potable, la conformité orientée EPA et la couche de preuve logicielle derrière la traçabilité des échantillons.', ['Directive (UE) 2020/2184 et coliphages somatiques', 'Total Coliform Rule américaine et contexte des méthodes EPA', 'Enregistrements logiciel pour audits, rapports et suivi client', 'Routes produit, OEM et SaaS reliées à chaque guide']),
      section('De la lecture à l’action', 'Chaque guide relie le contexte scientifique aux produits AquaVerify, aux flux plateforme et à l’étape commerciale suivante pour laboratoires, distributeurs et équipes qualité.')
    ], { eyebrow: 'Ressources', primaryCta: 'Parler à AquaVerify', secondaryCta: 'Voir les produits', seoTitle: 'Ressources microbiologie de l’eau | Guides AquaVerify', faqs: [
      { question: 'À qui s’adressent ces ressources?', answer: 'Elles s’adressent aux laboratoires, distributeurs, équipes qualité eau et entreprises biotech qui évaluent des produits de microbiologie de l’eau ou des flux logiciels connectés.' },
      { question: 'AquaVerify peut-il aider après la lecture?', answer: 'Oui. AquaVerify peut aider à cartographier la famille produit, l’option OEM ou le flux plateforme adapté au cas d’usage.' }
    ] }),
    it: locale('/it/risorse', 'Risorse di microbiologia dell’acqua e guide per buyer', 'Guide tecniche e commerciali su prodotti di microbiologia dell’acqua, tracciabilità digitale, distribuzione OEM e flussi qualità.', [
      section('Risorse per buyer tecnici', 'Usa questo hub per confrontare flussi qualitativi e quantitativi, comprendere gli indicatori colifagi e preparare conversazioni prodotto o OEM con un brief d’acquisto più chiaro.', ['Whitepaper su norme europee e statunitensi', 'Flussi di microbiologia dell’acqua orientati a ISO ed EPA', 'Guide decisionali presenza/assenza ed enumerazione', 'Tracciabilità digitale di campioni, report e clienti']),
      section('Whitepaper normativi per decisioni tecniche', 'La libreria aggiunge whitepaper pratici sulla Direttiva europea acqua potabile, sulla conformità orientata EPA e sul livello software di evidenza dietro la tracciabilità dei campioni.', ['Direttiva (UE) 2020/2184 e colifagi somatici', 'Total Coliform Rule statunitense e contesto dei metodi EPA', 'Record software per audit, report e follow-up cliente', 'Percorsi prodotto, OEM e SaaS collegati a ogni guida']),
      section('Dalla lettura all’azione', 'Ogni guida collega il contesto scientifico ai prodotti AquaVerify, ai flussi piattaforma e al passo commerciale successivo per laboratori, distributori e team qualità.')
    ], { eyebrow: 'Risorse', primaryCta: 'Parla con AquaVerify', secondaryCta: 'Vedi prodotti', seoTitle: 'Risorse di microbiologia dell’acqua | Guide AquaVerify', faqs: [
      { question: 'A chi sono rivolte queste risorse?', answer: 'Sono scritte per laboratori, distributori, team qualità acqua e aziende biotech che valutano prodotti di microbiologia dell’acqua o flussi software collegati.' },
      { question: 'AquaVerify può aiutare dopo la lettura?', answer: 'Sì. AquaVerify può aiutare a mappare la famiglia prodotto, l’opzione OEM o il flusso piattaforma adatto al caso d’uso.' }
    ] }),
    ca: locale('/ca/recursos', 'Recursos de microbiologia de l’aigua i guies per a compradors', 'Guies tècniques i comercials sobre productes de microbiologia de l’aigua, traçabilitat digital, distribució OEM i fluxos de qualitat.', [
      section('Recursos per a compradors tècnics', 'Fes servir aquest hub per comparar fluxos qualitatius i quantitatius, entendre indicadors colífags i preparar converses de producte o OEM amb un brief de compra més clar.', ['Whitepapers sobre normativa europea i estatunidenca', 'Fluxos de microbiologia de l’aigua orientats a ISO i EPA', 'Guies de decisió presència/absència i enumeració', 'Traçabilitat digital de mostres, informes i clients']),
      section('Whitepapers normatius per a decisions tècniques', 'La biblioteca incorpora whitepapers pràctics sobre la Directiva europea d’aigua potable, compliment orientat a EPA i la capa d’evidència software que sosté la traçabilitat de mostres.', ['Directiva (UE) 2020/2184 i colífags somàtics', 'Total Coliform Rule dels Estats Units i context de mètodes EPA', 'Registres software per a auditories, informes i seguiment de clients', 'Rutes de producte, OEM i SaaS connectades a cada guia']),
      section('De la lectura a l’acció', 'Cada guia connecta context científic amb productes AquaVerify, fluxos de plataforma i el següent pas comercial per a laboratoris, distribuïdors i equips de qualitat.')
    ], { eyebrow: 'Recursos', primaryCta: 'Parlar amb AquaVerify', secondaryCta: 'Veure productes', seoTitle: 'Recursos de microbiologia de l’aigua | Guies AquaVerify', faqs: [
      { question: 'Per a qui són aquests recursos?', answer: 'Estan escrits per a laboratoris, distribuïdors, equips de qualitat de l’aigua i empreses biotech que avaluen productes de microbiologia de l’aigua o fluxos digitals connectats.' },
      { question: 'AquaVerify pot ajudar després de llegir una guia?', answer: 'Sí. AquaVerify pot ajudar a mapar la família de producte, opció OEM o flux de plataforma més adequat per al cas d’ús.' }
    ] })
  }),
  page('iso-10705-2', 'resources', 'quote', {
    en: locale('/resources/iso-10705-2-somatic-coliphages', 'ISO 10705-2 and somatic coliphage testing', 'A practical resource for teams evaluating somatic coliphage workflows in water microbiology.', [
      section('Why it matters', 'Somatic coliphages are important viral indicators for water quality because they can be more resistant to disinfection than common bacterial indicators.'),
      section('How AquaVerify fits', 'AquaVerify supports laboratories with kits, controls, essentials and digital traceability around coliphage workflows.')
    ], { eyebrow: 'Resource', primaryCta: 'Discuss ISO workflow', secondaryCta: 'View standard kits' }),
    es: locale('/es/recursos/iso-10705-2-colifagos-somaticos', 'ISO 10705-2 y análisis de colífagos somáticos', 'Recurso práctico para equipos que evalúan flujos de colífagos somáticos en microbiología del agua.', [
      section('Por qué importa', 'Los colífagos somáticos son indicadores virales importantes en calidad del agua porque pueden resistir desinfección mejor que indicadores bacterianos habituales.'),
      section('Cómo encaja AquaVerify', 'AquaVerify apoya a laboratorios con kits, controles, essentials y trazabilidad digital alrededor de flujos de colífagos.')
    ], { eyebrow: 'Recurso', primaryCta: 'Hablar de flujo ISO', secondaryCta: 'Ver kits estándar' }),
    fr: locale('/fr/ressources/iso-10705-2-coliphages-somatiques', 'ISO 10705-2 et analyse des coliphages somatiques', 'Ressource pratique pour les équipes évaluant les flux coliphages somatiques en microbiologie de l’eau.', [
      section('Pourquoi c’est important', 'Les coliphages somatiques sont des indicateurs viraux importants de qualité de l’eau car ils peuvent résister à la désinfection plus que des indicateurs bactériens courants.'),
      section('Comment AquaVerify s’intègre', 'AquaVerify accompagne les laboratoires avec kits, contrôles, essentials et traçabilité numérique autour des flux coliphages.')
    ], { eyebrow: 'Ressource', primaryCta: 'Discuter du flux ISO', secondaryCta: 'Voir les kits standard' }),
    it: locale('/it/risorse/iso-10705-2-colifagi-somatici', 'ISO 10705-2 e analisi dei colifagi somatici', 'Risorsa pratica per team che valutano flussi di colifagi somatici nella microbiologia dell’acqua.', [
      section('Perché conta', 'I colifagi somatici sono indicatori virali importanti per la qualità dell’acqua perché possono resistere alla disinfezione più di comuni indicatori batterici.'),
      section('Come si inserisce AquaVerify', 'AquaVerify supporta i laboratori con kit, controlli, essentials e tracciabilità digitale intorno ai flussi colifagi.')
    ], { eyebrow: 'Risorsa', primaryCta: 'Discuti flusso ISO', secondaryCta: 'Vedi kit standard' }),
    ca: locale('/ca/recursos/iso-10705-2-colifags-somatics', 'ISO 10705-2 i anàlisi de colífags somàtics', 'Recurs pràctic per a equips que avaluen fluxos de colífags somàtics en microbiologia de l’aigua.', [
      section('Per què importa', 'Els colífags somàtics són indicadors virals importants en qualitat de l’aigua perquè poden resistir la desinfecció millor que indicadors bacterians habituals.'),
      section('Com encaixa AquaVerify', 'AquaVerify dona suport a laboratoris amb kits, controls, essentials i traçabilitat digital al voltant de fluxos de colífags.')
    ], { eyebrow: 'Recurs', primaryCta: 'Parlar de flux ISO', secondaryCta: 'Veure kits estàndard' })
  }, { parentId: 'resources' }),
  page('epa-1602', 'resources', 'quote', {
    en: locale('/resources/epa-1602-coliphage-testing', 'EPA 1602 coliphage testing workflows', 'Understand how EPA-oriented coliphage workflows can be supported with products, controls and traceability.', [
      section('For laboratories working with EPA methods', 'AquaVerify helps organize products, consumables and data around EPA-oriented coliphage testing.')
    ], { eyebrow: 'Resource', primaryCta: 'Discuss EPA workflow', secondaryCta: 'View products' }),
    es: locale('/es/recursos/epa-1602-colifagos', 'Flujos EPA 1602 para análisis de colífagos', 'Entiende cómo los flujos orientados a EPA pueden apoyarse con productos, controles y trazabilidad.', [
      section('Para laboratorios que trabajan con métodos EPA', 'AquaVerify ayuda a organizar productos, consumibles y datos alrededor del análisis de colífagos orientado a EPA.')
    ], { eyebrow: 'Recurso', primaryCta: 'Hablar de flujo EPA', secondaryCta: 'Ver productos' }),
    fr: locale('/fr/ressources/epa-1602-coliphages', 'Flux EPA 1602 pour l’analyse des coliphages', 'Comprendre comment les flux orientés EPA peuvent être soutenus par produits, contrôles et traçabilité.', [
      section('Pour les laboratoires travaillant avec méthodes EPA', 'AquaVerify aide à organiser produits, consommables et données autour de l’analyse des coliphages orientée EPA.')
    ], { eyebrow: 'Ressource', primaryCta: 'Discuter du flux EPA', secondaryCta: 'Voir les produits' }),
    it: locale('/it/risorse/epa-1602-colifagi', 'Flussi EPA 1602 per analisi dei colifagi', 'Comprendi come flussi orientati EPA possono essere supportati da prodotti, controlli e tracciabilità.', [
      section('Per laboratori che lavorano con metodi EPA', 'AquaVerify aiuta a organizzare prodotti, consumabili e dati intorno all’analisi dei colifagi orientata EPA.')
    ], { eyebrow: 'Risorsa', primaryCta: 'Discuti flusso EPA', secondaryCta: 'Vedi prodotti' }),
    ca: locale('/ca/recursos/epa-1602-colifags', 'Fluxos EPA 1602 per a anàlisi de colífags', 'Entén com els fluxos orientats a EPA poden recolzar-se amb productes, controls i traçabilitat.', [
      section('Per a laboratoris que treballen amb mètodes EPA', 'AquaVerify ajuda a organitzar productes, consumibles i dades al voltant de l’anàlisi de colífags orientada a EPA.')
    ], { eyebrow: 'Recurs', primaryCta: 'Parlar de flux EPA', secondaryCta: 'Veure productes' })
  }, { parentId: 'resources' }),
  page('coliphages-indicators', 'resources', 'quote', {
    en: locale('/resources/coliphages-water-quality-indicators', 'Why coliphages are the ultimate viral indicator for water quality', 'Whitepaper on why coliphages overcome the limits of traditional bacterial indicators and how labs can connect coliphage workflows to digital traceability.', [
      section('Executive summary', 'For more than a century, water teams have relied on bacterial indicators such as E. coli and enterococci to evaluate fecal contamination. Those indicators remain essential, but viral waterborne risk exposes a critical blind spot: bacteria are not always adequate predictive models for human enteric viruses.', ['Enteric viruses can persist longer in water environments', 'Standard disinfection behaviour is not identical for bacteria and viruses', 'Absence of E. coli does not automatically prove absence of infectious viruses', 'Coliphages give a practical viral-indicator layer for modern monitoring']),
      section('Why coliphages are the right proxy', 'Coliphages are bacteriophages that infect E. coli. From an environmental and analytical perspective, they share operational characteristics with enteric viruses: similar size range, no lipid envelope, no multiplication without a specific host and comparable resistance patterns.', ['Structural and size similarity with many enteric viruses', 'No environmental multiplication outside the host cell', 'Resistance profile closer to viral pathogens than bacterial indicators', 'Useful bridge between scientific risk and routine laboratory workflow']),
      section('Somatic versus F-specific coliphages', 'Somatic coliphages infect bacteria through receptors on the cell wall and are abundant in raw wastewater, making them useful for general fecal-contamination and treatment-performance contexts. F-specific coliphages infect through sex pili and are especially relevant when teams discuss recent fecal contamination or UV-disinfection efficiency.', ['Somatic coliphages for broad fecal contamination and barrier performance', 'F-specific coliphages for viral-like behaviour and UV-disinfection discussions', 'Host strain, controls and incubation windows must be managed carefully', 'PFU results need audit-ready sample and review context']),
      section('How AquaVerify turns the science into a workflow', 'AquaVerify connects coliphage-focused products with AquaVerify Cloud so laboratories, distributors and quality teams can manage sample context, host strains, plaque counts, review history and customer reports in one traceable workflow.')
    ], { eyebrow: 'Whitepaper', primaryCta: 'Ask about coliphage products', secondaryCta: 'Explore resources', seoTitle: 'Why Coliphages Are the Ultimate Viral Indicator | AquaVerify Whitepaper', seoDescription: 'Whitepaper on coliphages as viral indicators, E. coli limitations, somatic versus F-specific coliphages, ISO 10705, EPA methods and LIMS traceability.', whitepaper: whitepaperDeepDive('viralIndicator', 'en'), faqs: [
      { question: 'Do coliphages replace E. coli or enterococci monitoring?', answer: 'No. Coliphages add a viral-indicator layer. Traditional bacterial indicators remain important and must be interpreted within the applicable method, regulation and quality system.' },
      { question: 'Why do coliphages attract qualified technical enquiries?', answer: 'Visitors searching for coliphages, viral indicators, ISO 10705 or EPA coliphage methods are usually closer to a technical buying, laboratory, OEM or SaaS workflow conversation.' }
    ] }),
    es: locale('/es/recursos/colifagos-indicadores-calidad-agua', 'Por qué los colífagos son el indicador viral definitivo para calidad del agua', 'Whitepaper sobre por qué los colífagos superan límites de los indicadores bacterianos tradicionales y cómo conectar estos flujos con trazabilidad digital.', [
      section('Resumen ejecutivo', 'Durante más de un siglo, los equipos de agua han confiado en indicadores bacterianos como E. coli y enterococos para evaluar contaminación fecal. Siguen siendo esenciales, pero el riesgo viral transmitido por el agua muestra una vulnerabilidad crítica: las bacterias no siempre son modelos predictivos adecuados para virus entéricos humanos.', ['Los virus entéricos pueden persistir más tiempo en ambientes acuáticos', 'El comportamiento frente a desinfección no es idéntico en bacterias y virus', 'La ausencia de E. coli no demuestra automáticamente ausencia de virus infecciosos', 'Los colífagos aportan una capa práctica de indicador viral para monitorización moderna']),
      section('Por qué los colífagos son el proxy adecuado', 'Los colífagos son bacteriófagos que infectan E. coli. Desde una perspectiva ambiental y analítica comparten características operativas con virus entéricos: rango de tamaño similar, ausencia de envoltura lipídica, no multiplicación sin huésped específico y patrones de resistencia comparables.', ['Similitud estructural y de tamaño con muchos virus entéricos', 'Sin multiplicación ambiental fuera de la célula huésped', 'Perfil de resistencia más cercano a patógenos virales que a indicadores bacterianos', 'Puente útil entre riesgo científico y flujo rutinario de laboratorio']),
      section('Colífagos somáticos frente a F-específicos', 'Los colífagos somáticos infectan a través de receptores de pared celular y son abundantes en aguas residuales brutas, por lo que ayudan en contextos de contaminación fecal general y eficacia de barreras. Los F-específicos infectan mediante pili sexuales y son relevantes al discutir contaminación fecal reciente o eficiencia de desinfección UV.', ['Somáticos para contaminación fecal amplia y rendimiento de barreras', 'F-específicos para comportamiento tipo viral y discusiones de desinfección UV', 'Cepa huésped, controles y ventanas de incubación requieren gestión cuidadosa', 'Resultados UFP necesitan contexto de muestra y revisión listo para auditoría']),
      section('Cómo AquaVerify convierte la ciencia en flujo operativo', 'AquaVerify conecta productos centrados en colífagos con AquaVerify Cloud para que laboratorios, distribuidores y equipos de calidad gestionen contexto de muestra, cepas huésped, recuentos de placa, revisión e informes en un único flujo trazable.')
    ], { eyebrow: 'Whitepaper', primaryCta: 'Preguntar por productos colífagos', secondaryCta: 'Explorar recursos', seoTitle: 'Por qué los colífagos son el indicador viral definitivo | Whitepaper AquaVerify', seoDescription: 'Whitepaper sobre colífagos como indicadores virales, límites de E. coli, colífagos somáticos frente a F-específicos, ISO 10705, métodos EPA y trazabilidad LIMS.', whitepaper: whitepaperDeepDive('viralIndicator', 'es'), faqs: [
      { question: '¿Los colífagos sustituyen la monitorización de E. coli o enterococos?', answer: 'No. Añaden una capa de indicador viral. Los indicadores bacterianos siguen siendo importantes y deben interpretarse según método, regulación y sistema de calidad aplicables.' },
      { question: '¿Por qué este tema atrae consultas técnicas cualificadas?', answer: 'Quien busca colífagos, indicadores virales, ISO 10705 o métodos EPA de colífagos suele estar cerca de una conversación técnica de compra, laboratorio, OEM o SaaS.' }
    ] }),
    fr: locale('/fr/ressources/coliphages-indicateurs-qualite-eau', 'Pourquoi les coliphages sont l’indicateur viral ultime pour la qualité de l’eau', 'Whitepaper sur les coliphages comme indicateurs viraux, les limites des indicateurs bactériens et la traçabilité numérique des flux laboratoire.', [
      section('Résumé exécutif', 'Depuis plus d’un siècle, les équipes eau utilisent E. coli et entérocoques pour évaluer la contamination fécale. Ces indicateurs restent essentiels, mais le risque viral hydrique révèle une limite: les bactéries ne sont pas toujours des modèles prédictifs adaptés aux virus entériques humains.', ['Les virus entériques peuvent persister plus longtemps dans l’eau', 'Le comportement face à la désinfection diffère entre bactéries et virus', 'L’absence d’E. coli ne prouve pas automatiquement l’absence de virus infectieux', 'Les coliphages ajoutent une couche pratique d’indicateur viral']),
      section('Pourquoi les coliphages sont le bon proxy', 'Les coliphages sont des bactériophages infectant E. coli. Ils partagent des caractéristiques opérationnelles avec les virus entériques: taille comparable, absence d’enveloppe lipidique, pas de multiplication sans hôte spécifique et profils de résistance proches.', ['Similarité structurelle et de taille avec de nombreux virus entériques', 'Pas de multiplication environnementale hors cellule hôte', 'Profil de résistance plus proche des pathogènes viraux que des indicateurs bactériens', 'Pont utile entre risque scientifique et routine laboratoire']),
      section('Coliphages somatiques versus F-spécifiques', 'Les coliphages somatiques infectent via la paroi cellulaire et sont abondants dans les eaux usées brutes. Les coliphages F-spécifiques infectent via les pili sexuels et sont pertinents pour discuter contamination récente ou efficacité UV.', ['Somatiques pour contamination fécale large et performance des barrières', 'F-spécifiques pour comportement viral-like et discussions UV', 'Souches hôtes, contrôles et incubation doivent être maîtrisés', 'Les résultats UFP exigent un contexte échantillon et revue audit-ready']),
      section('Comment AquaVerify transforme la science en flux', 'AquaVerify connecte produits axés coliphages et AquaVerify Cloud afin de gérer contexte échantillon, souches hôtes, dénombrements, revue et rapports dans un flux traçable.')
    ], { eyebrow: 'Whitepaper', primaryCta: 'Demander produits coliphages', secondaryCta: 'Explorer les ressources', seoTitle: 'Pourquoi les coliphages sont l’indicateur viral ultime | Whitepaper AquaVerify', seoDescription: 'Whitepaper sur coliphages indicateurs viraux, limites E. coli, coliphages somatiques et F-spécifiques, ISO 10705, méthodes EPA et traçabilité LIMS.', whitepaper: whitepaperDeepDive('viralIndicator', 'fr'), faqs: [
      { question: 'Les coliphages remplacent-ils E. coli ou les entérocoques?', answer: 'Non. Ils ajoutent une couche d’indicateur viral. Les indicateurs bactériens restent importants selon la méthode, la réglementation et le système qualité applicables.' },
      { question: 'Pourquoi ce sujet attire-t-il des demandes techniques qualifiées?', answer: 'Les recherches sur coliphages, indicateurs viraux, ISO 10705 ou méthodes EPA signalent souvent une intention technique proche d’un achat, laboratoire, OEM ou SaaS.' }
    ] }),
    it: locale('/it/risorse/colifagi-indicatori-qualita-acqua', 'Perché i colifagi sono l’indicatore virale definitivo per la qualità dell’acqua', 'Whitepaper sui colifagi come indicatori virali, i limiti degli indicatori batterici e la tracciabilità digitale dei flussi laboratorio.', [
      section('Sintesi esecutiva', 'Per oltre un secolo i team acqua hanno usato E. coli ed enterococchi per valutare contaminazione fecale. Restano essenziali, ma il rischio virale idrico evidenzia un limite: i batteri non sono sempre modelli predittivi adeguati per virus enterici umani.', ['I virus enterici possono persistere più a lungo in acqua', 'Il comportamento alla disinfezione non è identico per batteri e virus', 'L’assenza di E. coli non prova automaticamente l’assenza di virus infettivi', 'I colifagi aggiungono un livello pratico di indicatore virale']),
      section('Perché i colifagi sono il proxy corretto', 'I colifagi sono batteriofagi che infettano E. coli. Condividono caratteristiche operative con virus enterici: intervallo dimensionale simile, assenza di involucro lipidico, nessuna moltiplicazione senza ospite specifico e resistenza comparabile.', ['Somiglianza strutturale e dimensionale con molti virus enterici', 'Nessuna moltiplicazione ambientale fuori dalla cellula ospite', 'Profilo di resistenza più vicino a patogeni virali che a indicatori batterici', 'Ponte utile tra rischio scientifico e routine di laboratorio']),
      section('Colifagi somatici versus F-specifici', 'I colifagi somatici infettano tramite recettori della parete cellulare e sono abbondanti in acque reflue grezze. I F-specifici infettano tramite pili sessuali e sono rilevanti per contaminazione recente o efficienza UV.', ['Somatici per contaminazione fecale ampia e performance barriere', 'F-specifici per comportamento viral-like e discussioni UV', 'Ceppi ospiti, controlli e incubazione richiedono gestione accurata', 'Risultati PFU richiedono contesto campione e revisione audit-ready']),
      section('Come AquaVerify trasforma la scienza in workflow', 'AquaVerify collega prodotti focalizzati sui colifagi con AquaVerify Cloud per gestire contesto campione, ceppi ospiti, conteggi, revisione e report in un unico flusso tracciabile.')
    ], { eyebrow: 'Whitepaper', primaryCta: 'Chiedi prodotti colifagi', secondaryCta: 'Esplora risorse', seoTitle: 'Perché i colifagi sono l’indicatore virale definitivo | Whitepaper AquaVerify', seoDescription: 'Whitepaper su colifagi indicatori virali, limiti di E. coli, colifagi somatici e F-specifici, ISO 10705, metodi EPA e tracciabilità LIMS.', whitepaper: whitepaperDeepDive('viralIndicator', 'it'), faqs: [
      { question: 'I colifagi sostituiscono E. coli o enterococchi?', answer: 'No. Aggiungono un livello di indicatore virale. Gli indicatori batterici restano importanti secondo metodo, normativa e sistema qualità applicabili.' },
      { question: 'Perché questo tema attira richieste tecniche qualificate?', answer: 'Ricerche su colifagi, indicatori virali, ISO 10705 o metodi EPA indicano spesso un intento tecnico vicino a acquisto, laboratorio, OEM o SaaS.' }
    ] }),
    ca: locale('/ca/recursos/colifags-indicadors-qualitat-aigua', 'Per què els colífags són l’indicador viral definitiu per a qualitat de l’aigua', 'Whitepaper sobre colífags com a indicadors virals, límits dels indicadors bacterians i traçabilitat digital dels fluxos de laboratori.', [
      section('Resum executiu', 'Durant més d’un segle, els equips d’aigua han usat E. coli i enterococs per avaluar contaminació fecal. Continuen sent essencials, però el risc viral transmès per l’aigua mostra un límit: els bacteris no sempre són models predictius adequats per a virus entèrics humans.', ['Els virus entèrics poden persistir més temps en aigua', 'El comportament davant desinfecció no és idèntic en bacteris i virus', 'L’absència d’E. coli no prova automàticament absència de virus infecciosos', 'Els colífags afegeixen una capa pràctica d’indicador viral']),
      section('Per què els colífags són el proxy adequat', 'Els colífags són bacteriòfags que infecten E. coli. Comparteixen característiques operatives amb virus entèrics: rang de mida similar, absència d’embolcall lipídic, no multiplicació sense hoste específic i patrons de resistència comparables.', ['Similitud estructural i de mida amb molts virus entèrics', 'Sense multiplicació ambiental fora de la cèl·lula hoste', 'Perfil de resistència més proper a patògens virals que a indicadors bacterians', 'Pont útil entre risc científic i rutina de laboratori']),
      section('Colífags somàtics davant F-específics', 'Els colífags somàtics infecten via receptors de paret cel·lular i són abundants en aigües residuals brutes. Els F-específics infecten via pili sexuals i són rellevants per contaminació recent o eficiència UV.', ['Somàtics per contaminació fecal àmplia i rendiment de barreres', 'F-específics per comportament viral-like i discussions UV', 'Soques hoste, controls i incubació requereixen gestió acurada', 'Resultats UFP necessiten context de mostra i revisió audit-ready']),
      section('Com AquaVerify transforma la ciència en flux operatiu', 'AquaVerify connecta productes centrats en colífags amb AquaVerify Cloud perquè laboratoris, distribuïdors i equips de qualitat gestionin context de mostra, soques hoste, recomptes, revisió i informes en un únic flux traçable.')
    ], { eyebrow: 'Whitepaper', primaryCta: 'Preguntar per productes colífags', secondaryCta: 'Explorar recursos', seoTitle: 'Per què els colífags són l’indicador viral definitiu | Whitepaper AquaVerify', seoDescription: 'Whitepaper sobre colífags com a indicadors virals, límits d’E. coli, colífags somàtics i F-específics, ISO 10705, mètodes EPA i traçabilitat LIMS.', whitepaper: whitepaperDeepDive('viralIndicator', 'ca'), faqs: [
      { question: 'Els colífags substitueixen E. coli o enterococs?', answer: 'No. Afegeixen una capa d’indicador viral. Els indicadors bacterians continuen sent importants segons mètode, regulació i sistema de qualitat aplicables.' },
      { question: 'Per què aquest tema atrau consultes tècniques qualificades?', answer: 'Cerques sobre colífags, indicadors virals, ISO 10705 o mètodes EPA solen indicar intenció tècnica propera a compra, laboratori, OEM o SaaS.' }
    ] })
  }, { parentId: 'resources' }),
  page('presence-vs-enumeration', 'resources', 'quote', {
    en: locale('/resources/presence-absence-vs-enumeration', 'Presence/absence vs enumeration in water microbiology', 'Understand when qualitative screening and quantitative enumeration workflows fit water microbiology decisions.', [
      section('When presence/absence fits', 'Presence/absence workflows are useful when a team needs a clear qualitative answer for screening, release decisions or escalation.', ['Fast yes/no decision points', 'Operational monitoring where a qualitative answer is enough', 'Field, quality or routine laboratory workflows', 'Clear link to INDICA product families']),
      section('When enumeration fits', 'Enumeration workflows are stronger when decisions depend on concentration, trend, limit comparison or quantitative reporting.', ['Quantitative result records', 'Trend monitoring across sites or batches', 'Laboratory and customer reporting', 'Clear link to ENUMERA and standard kits']),
      section('Why the platform matters', 'AquaVerify Cloud can connect either workflow to sample context, operators, customer communication and follow-up history.')
    ], { eyebrow: 'Guide', primaryCta: 'Discuss the right workflow', secondaryCta: 'View INDICA and ENUMERA', seoTitle: 'Presence/Absence vs Enumeration | Water Microbiology Guide', faqs: [
      { question: 'Is presence/absence less useful than enumeration?', answer: 'No. It answers a different operational question. Presence/absence is useful for screening, while enumeration is useful when the concentration or trend matters.' },
      { question: 'Can one organization use both workflows?', answer: 'Yes. Many teams combine qualitative screening with quantitative confirmation or periodic enumeration depending on the sample type and decision.' }
    ] }),
    es: locale('/es/recursos/presencia-ausencia-vs-enumeracion', 'Presencia/ausencia vs enumeración en microbiología del agua', 'Entiende cuándo encajan los flujos cualitativos y cuantitativos en decisiones de microbiología del agua.', [
      section('Cuándo encaja presencia/ausencia', 'Los flujos de presencia/ausencia son útiles cuando el equipo necesita una respuesta cualitativa clara para cribado, liberación o escalado.', ['Decisiones rápidas sí/no', 'Monitorización operativa donde una respuesta cualitativa es suficiente', 'Flujos de campo, calidad o laboratorio rutinario', 'Conexión clara con la familia INDICA']),
      section('Cuándo encaja enumeración', 'Los flujos de enumeración son más fuertes cuando la decisión depende de concentración, tendencia, comparación con límites o informe cuantitativo.', ['Registros de resultado cuantitativo', 'Seguimiento de tendencias por punto o lote', 'Informes de laboratorio y cliente', 'Conexión clara con ENUMERA y kits estándar']),
      section('Por qué importa la plataforma', 'AquaVerify Cloud puede conectar ambos flujos con contexto de muestra, operadores, comunicación cliente e historial de seguimiento.')
    ], { eyebrow: 'Guía', primaryCta: 'Hablar del flujo adecuado', secondaryCta: 'Ver INDICA y ENUMERA', seoTitle: 'Presencia/Ausencia vs Enumeración | Guía microbiología del agua', faqs: [
      { question: '¿Presencia/ausencia es menos útil que enumeración?', answer: 'No. Responde a una pregunta operativa diferente. Presencia/ausencia sirve para cribado, mientras que enumeración sirve cuando importan la concentración o la tendencia.' },
      { question: '¿Una organización puede usar ambos flujos?', answer: 'Sí. Muchos equipos combinan cribado cualitativo con confirmación cuantitativa o enumeración periódica según el tipo de muestra y la decisión.' }
    ] }),
    fr: locale('/fr/ressources/presence-absence-vs-denombrement', 'Présence/absence vs dénombrement en microbiologie de l’eau', 'Comprendre quand les flux qualitatifs et quantitatifs conviennent aux décisions de microbiologie de l’eau.', [
      section('Quand la présence/absence convient', 'Les flux présence/absence sont utiles lorsqu’une équipe a besoin d’une réponse qualitative claire pour le dépistage, la libération ou l’escalade.', ['Décisions rapides oui/non', 'Surveillance opérationnelle quand une réponse qualitative suffit', 'Flux terrain, qualité ou laboratoire de routine', 'Lien clair avec la famille INDICA']),
      section('Quand le dénombrement convient', 'Les flux de dénombrement sont plus adaptés quand la décision dépend d’une concentration, d’une tendance, d’une comparaison de limite ou d’un rapport quantitatif.', ['Enregistrements de résultat quantitatif', 'Suivi des tendances par site ou lot', 'Rapports laboratoire et client', 'Lien clair avec ENUMERA et kits standard']),
      section('Pourquoi la plateforme compte', 'AquaVerify Cloud peut connecter les deux flux au contexte échantillon, aux opérateurs, à la communication client et à l’historique de suivi.')
    ], { eyebrow: 'Guide', primaryCta: 'Discuter du bon flux', secondaryCta: 'Voir INDICA et ENUMERA', seoTitle: 'Présence/absence vs dénombrement | Guide microbiologie eau', faqs: [
      { question: 'La présence/absence est-elle moins utile que le dénombrement?', answer: 'Non. Elle répond à une question opérationnelle différente. La présence/absence sert au dépistage, tandis que le dénombrement sert lorsque la concentration ou la tendance compte.' },
      { question: 'Une organisation peut-elle utiliser les deux flux?', answer: 'Oui. De nombreuses équipes combinent dépistage qualitatif et confirmation quantitative ou dénombrement périodique selon l’échantillon et la décision.' }
    ] }),
    it: locale('/it/risorse/presenza-assenza-vs-enumerazione', 'Presenza/assenza vs enumerazione nella microbiologia dell’acqua', 'Comprendi quando flussi qualitativi e quantitativi sono adatti alle decisioni di microbiologia dell’acqua.', [
      section('Quando serve presenza/assenza', 'I flussi presenza/assenza sono utili quando un team richiede una risposta qualitativa chiara per screening, rilascio o escalation.', ['Decisioni rapide sì/no', 'Monitoraggio operativo quando una risposta qualitativa è sufficiente', 'Flussi sul campo, qualità o laboratorio di routine', 'Collegamento chiaro con la famiglia INDICA']),
      section('Quando serve enumerazione', 'I flussi di enumerazione sono più forti quando la decisione dipende da concentrazione, trend, confronto con limiti o reporting quantitativo.', ['Registri di risultato quantitativo', 'Monitoraggio trend per sito o lotto', 'Report laboratorio e cliente', 'Collegamento chiaro con ENUMERA e kit standard']),
      section('Perché conta la piattaforma', 'AquaVerify Cloud può collegare entrambi i flussi a contesto campione, operatori, comunicazione cliente e storico follow-up.')
    ], { eyebrow: 'Guida', primaryCta: 'Discuti il flusso giusto', secondaryCta: 'Vedi INDICA ed ENUMERA', seoTitle: 'Presenza/assenza vs enumerazione | Guida microbiologia acqua', faqs: [
      { question: 'La presenza/assenza è meno utile dell’enumerazione?', answer: 'No. Risponde a una domanda operativa diversa. La presenza/assenza è utile per lo screening, mentre l’enumerazione serve quando contano concentrazione o trend.' },
      { question: 'Un’organizzazione può usare entrambi i flussi?', answer: 'Sì. Molti team combinano screening qualitativo con conferma quantitativa o enumerazione periodica in base al campione e alla decisione.' }
    ] }),
    ca: locale('/ca/recursos/presencia-absencia-vs-enumeracio', 'Presència/absència vs enumeració en microbiologia de l’aigua', 'Entén quan encaixen els fluxos qualitatius i quantitatius en decisions de microbiologia de l’aigua.', [
      section('Quan encaixa presència/absència', 'Els fluxos de presència/absència són útils quan l’equip necessita una resposta qualitativa clara per a cribratge, alliberament o escalat.', ['Decisions ràpides sí/no', 'Monitoratge operatiu on una resposta qualitativa és suficient', 'Fluxos de camp, qualitat o laboratori rutinari', 'Connexió clara amb la família INDICA']),
      section('Quan encaixa enumeració', 'Els fluxos d’enumeració són més forts quan la decisió depèn de concentració, tendència, comparació amb límits o informe quantitatiu.', ['Registres de resultat quantitatiu', 'Seguiment de tendències per punt o lot', 'Informes de laboratori i client', 'Connexió clara amb ENUMERA i kits estàndard']),
      section('Per què importa la plataforma', 'AquaVerify Cloud pot connectar tots dos fluxos amb context de mostra, operadors, comunicació client i historial de seguiment.')
    ], { eyebrow: 'Guia', primaryCta: 'Parlar del flux adequat', secondaryCta: 'Veure INDICA i ENUMERA', seoTitle: 'Presència/absència vs enumeració | Guia microbiologia aigua', faqs: [
      { question: 'Presència/absència és menys útil que enumeració?', answer: 'No. Respon a una pregunta operativa diferent. Presència/absència serveix per a cribratge, mentre que enumeració serveix quan importen la concentració o la tendència.' },
      { question: 'Una organització pot usar tots dos fluxos?', answer: 'Sí. Molts equips combinen cribratge qualitatiu amb confirmació quantitativa o enumeració periòdica segons el tipus de mostra i la decisió.' }
    ] })
  }, { parentId: 'resources' }),
  page('sample-traceability', 'resources', 'quote', {
    en: locale('/resources/water-sample-digital-traceability', 'How to digitalize water sample traceability', 'A practical guide to linking samples, operators, products, reports and customer context in water quality workflows.', [
      section('Start with sample context', 'Digital traceability begins before the analysis: customer, site, sampling point, date, operator and requested workflow should be captured consistently.', ['Customer and site record', 'Sampling point and sample metadata', 'Requested parameter and product family', 'Chain of responsibility']),
      section('Connect execution and evidence', 'A useful system links the test workflow to products, operators, results, images, calculations and review steps.', ['Product or kit used', 'Operator and reviewer history', 'Result and report status', 'Evidence attached to the sample']),
      section('Turn results into better follow-up', 'When product interest, reports and customer conversations stay connected, teams can understand demand and respond with the right next step.')
    ], { eyebrow: 'Guide', primaryCta: 'Map your traceability workflow', secondaryCta: 'Explore platform', seoTitle: 'Water Sample Digital Traceability Guide | AquaVerify', faqs: [
      { question: 'Is digital traceability only for large laboratories?', answer: 'No. Smaller laboratories and quality teams can also benefit when samples, products, reports and customer communication are connected from the start.' },
      { question: 'Does traceability replace laboratory validation?', answer: 'No. Digital traceability organizes records and workflows; technical method validation remains a separate scientific and quality process.' }
    ] }),
    es: locale('/es/recursos/trazabilidad-digital-muestras-agua', 'Cómo digitalizar la trazabilidad de muestras de agua', 'Guía práctica para conectar muestras, operadores, productos, informes y contexto cliente en flujos de calidad del agua.', [
      section('Empezar por el contexto de muestra', 'La trazabilidad digital empieza antes del análisis: cliente, instalación, punto de muestreo, fecha, operador y flujo solicitado deben capturarse de forma consistente.', ['Registro de cliente e instalación', 'Punto de muestreo y metadatos de muestra', 'Parámetro solicitado y familia de producto', 'Cadena de responsabilidad']),
      section('Conectar ejecución y evidencia', 'Un sistema útil vincula el flujo de análisis con productos, operadores, resultados, imágenes, cálculos y pasos de revisión.', ['Producto o kit utilizado', 'Historial de operador y revisor', 'Estado de resultado e informe', 'Evidencia asociada a la muestra']),
      section('Convertir resultados en mejor seguimiento', 'Cuando el interés de producto, los informes y las conversaciones con cliente quedan conectados, el equipo entiende la demanda y responde con el siguiente paso adecuado.')
    ], { eyebrow: 'Guía', primaryCta: 'Mapear trazabilidad', secondaryCta: 'Explorar plataforma', seoTitle: 'Guía de trazabilidad digital de muestras de agua | AquaVerify', faqs: [
      { question: '¿La trazabilidad digital es solo para laboratorios grandes?', answer: 'No. Laboratorios pequeños y equipos de calidad también ganan cuando muestras, productos, informes y comunicación cliente están conectados desde el inicio.' },
      { question: '¿La trazabilidad sustituye la validación de laboratorio?', answer: 'No. La trazabilidad digital organiza registros y flujos; la validación técnica del método sigue siendo un proceso científico y de calidad separado.' }
    ] }),
    fr: locale('/fr/ressources/tracabilite-numerique-echantillons-eau', 'Comment numériser la traçabilité des échantillons d’eau', 'Guide pratique pour relier échantillons, opérateurs, produits, rapports et contexte client dans les flux qualité eau.', [
      section('Commencer par le contexte échantillon', 'La traçabilité numérique commence avant l’analyse: client, site, point de prélèvement, date, opérateur et flux demandé doivent être capturés de manière cohérente.', ['Fiche client et site', 'Point de prélèvement et métadonnées échantillon', 'Paramètre demandé et famille produit', 'Chaîne de responsabilité']),
      section('Connecter exécution et preuve', 'Un système utile relie le flux d’analyse aux produits, opérateurs, résultats, images, calculs et étapes de revue.', ['Produit ou kit utilisé', 'Historique opérateur et relecteur', 'Statut du résultat et du rapport', 'Preuve associée à l’échantillon']),
      section('Transformer les résultats en meilleur suivi', 'Lorsque l’intérêt produit, les rapports et les échanges client restent connectés, les équipes comprennent la demande et répondent avec la bonne étape suivante.')
    ], { eyebrow: 'Guide', primaryCta: 'Cartographier votre traçabilité', secondaryCta: 'Explorer la plateforme', seoTitle: 'Guide traçabilité numérique échantillons eau | AquaVerify', faqs: [
      { question: 'La traçabilité numérique est-elle réservée aux grands laboratoires?', answer: 'Non. Les petits laboratoires et équipes qualité en bénéficient aussi lorsque échantillons, produits, rapports et communication client sont connectés dès le départ.' },
      { question: 'La traçabilité remplace-t-elle la validation laboratoire?', answer: 'Non. La traçabilité numérique organise les enregistrements et flux; la validation technique de méthode reste un processus scientifique et qualité séparé.' }
    ] }),
    it: locale('/it/risorse/tracciabilita-digitale-campioni-acqua', 'Come digitalizzare la tracciabilità dei campioni d’acqua', 'Guida pratica per collegare campioni, operatori, prodotti, report e contesto cliente nei flussi qualità acqua.', [
      section('Partire dal contesto campione', 'La tracciabilità digitale inizia prima dell’analisi: cliente, sito, punto di campionamento, data, operatore e flusso richiesto devono essere acquisiti in modo coerente.', ['Record cliente e sito', 'Punto di campionamento e metadati campione', 'Parametro richiesto e famiglia prodotto', 'Catena di responsabilità']),
      section('Collegare esecuzione ed evidenza', 'Un sistema utile collega il flusso analitico a prodotti, operatori, risultati, immagini, calcoli e passaggi di revisione.', ['Prodotto o kit utilizzato', 'Storico operatore e revisore', 'Stato di risultato e report', 'Evidenza associata al campione']),
      section('Trasformare i risultati in follow-up migliore', 'Quando interesse prodotto, report e conversazioni cliente restano collegati, i team comprendono la domanda e rispondono con il passo successivo corretto.')
    ], { eyebrow: 'Guida', primaryCta: 'Mappa la tracciabilità', secondaryCta: 'Esplora piattaforma', seoTitle: 'Guida tracciabilità digitale campioni acqua | AquaVerify', faqs: [
      { question: 'La tracciabilità digitale serve solo ai grandi laboratori?', answer: 'No. Anche piccoli laboratori e team qualità beneficiano quando campioni, prodotti, report e comunicazione cliente sono collegati dall’inizio.' },
      { question: 'La tracciabilità sostituisce la validazione di laboratorio?', answer: 'No. La tracciabilità digitale organizza registri e flussi; la validazione tecnica del metodo resta un processo scientifico e qualità separato.' }
    ] }),
    ca: locale('/ca/recursos/tracabilitat-digital-mostres-aigua', 'Com digitalitzar la traçabilitat de mostres d’aigua', 'Guia pràctica per connectar mostres, operadors, productes, informes i context client en fluxos de qualitat de l’aigua.', [
      section('Començar pel context de mostra', 'La traçabilitat digital comença abans de l’anàlisi: client, instal·lació, punt de mostreig, data, operador i flux sol·licitat s’han de capturar de manera consistent.', ['Registre de client i instal·lació', 'Punt de mostreig i metadades de mostra', 'Paràmetre sol·licitat i família de producte', 'Cadena de responsabilitat']),
      section('Connectar execució i evidència', 'Un sistema útil vincula el flux d’anàlisi amb productes, operadors, resultats, imatges, càlculs i passos de revisió.', ['Producte o kit utilitzat', 'Historial d’operador i revisor', 'Estat de resultat i informe', 'Evidència associada a la mostra']),
      section('Convertir resultats en millor seguiment', 'Quan l’interès de producte, els informes i les converses amb client queden connectats, l’equip entén la demanda i respon amb el següent pas adequat.')
    ], { eyebrow: 'Guia', primaryCta: 'Mapar traçabilitat', secondaryCta: 'Explorar plataforma', seoTitle: 'Guia de traçabilitat digital de mostres d’aigua | AquaVerify', faqs: [
      { question: 'La traçabilitat digital és només per a laboratoris grans?', answer: 'No. Laboratoris petits i equips de qualitat també guanyen quan mostres, productes, informes i comunicació client estan connectats des de l’inici.' },
      { question: 'La traçabilitat substitueix la validació de laboratori?', answer: 'No. La traçabilitat digital organitza registres i fluxos; la validació tècnica del mètode continua sent un procés científic i de qualitat separat.' }
    ] })
  }, { parentId: 'resources' }),
  page('distributor-checklist', 'resources', 'quote', {
    en: locale('/resources/water-testing-kit-distributor-checklist', 'Checklist for distributors of water testing kits', 'A practical checklist for scientific distributors evaluating water microbiology kits, OEM options and connected software workflows.', [
      section('Portfolio fit', 'A distributor should first validate whether the product range adds a clear water microbiology story to its existing catalogue.', ['Quantitative and qualitative product families', 'Standard ISO/EPA-oriented kits and essentials', 'Clear customer segments and use cases', 'Repeatable consumable demand']),
      section('Technical and commercial support', 'The strongest distribution programs make it easier to sell, train and support customers without increasing operational friction.', ['Technical onboarding and product training', 'Sales material and multilingual content', 'Quote, demo and support handover', 'Optional OEM or private-label route']),
      section('Digital differentiation', 'A connected platform can make the offer stronger by linking product use with traceability, reporting, CRM and customer communication.')
    ], { eyebrow: 'Distributor guide', primaryCta: 'Discuss distribution', secondaryCta: 'View OEM program', seoTitle: 'Water Testing Kit Distributor Checklist | AquaVerify OEM', faqs: [
      { question: 'Can distributors sell AquaVerify under their own brand?', answer: 'AquaVerify can evaluate OEM or private-label supply depending on product scope, territory, volumes and technical requirements.' },
      { question: 'Why does software matter for distributors?', answer: 'Software can help distributors move beyond a product-only catalogue by offering customers traceability, reporting and connected service workflows.' }
    ] }),
    es: locale('/es/recursos/checklist-distribuidores-kits-analisis-agua', 'Checklist para distribuidores de kits de análisis de agua', 'Checklist práctica para distribuidores científicos que evalúan kits de microbiología del agua, opciones OEM y flujos digitales conectados.', [
      section('Encaje de portfolio', 'El distribuidor debe validar primero si la gama añade una historia clara de microbiología del agua a su catálogo actual.', ['Familias de producto cuantitativas y cualitativas', 'Kits orientados a ISO/EPA y essentials', 'Segmentos cliente y casos de uso claros', 'Demanda recurrente de consumibles']),
      section('Soporte técnico y comercial', 'Los programas de distribución más fuertes facilitan vender, formar y dar soporte a clientes sin aumentar fricción operativa.', ['Onboarding técnico y formación de producto', 'Material comercial y contenido multilingüe', 'Traspaso de cotización, demo y soporte', 'Ruta opcional OEM o marca blanca']),
      section('Diferenciación digital', 'Una plataforma conectada puede hacer la oferta más fuerte al vincular uso de producto con trazabilidad, reporting, CRM y comunicación cliente.')
    ], { eyebrow: 'Guía distribuidor', primaryCta: 'Hablar de distribución', secondaryCta: 'Ver programa OEM', seoTitle: 'Checklist distribuidores kits análisis de agua | AquaVerify OEM', faqs: [
      { question: '¿Los distribuidores pueden vender AquaVerify bajo su propia marca?', answer: 'AquaVerify puede evaluar suministro OEM o marca blanca según alcance de producto, territorio, volúmenes y requisitos técnicos.' },
      { question: '¿Por qué importa el software para distribuidores?', answer: 'El software ayuda a pasar de un catálogo solo de productos a una oferta con trazabilidad, reporting y flujos de servicio conectados.' }
    ] }),
    fr: locale('/fr/ressources/checklist-distributeurs-kits-analyse-eau', 'Checklist pour distributeurs de kits d’analyse de l’eau', 'Checklist pratique pour distributeurs scientifiques évaluant kits de microbiologie de l’eau, options OEM et flux logiciels connectés.', [
      section('Adéquation portefeuille', 'Le distributeur doit d’abord valider si la gamme ajoute une histoire claire de microbiologie de l’eau à son catalogue existant.', ['Familles produit quantitatives et qualitatives', 'Kits orientés ISO/EPA et essentiels', 'Segments clients et cas d’usage clairs', 'Demande récurrente de consommables']),
      section('Support technique et commercial', 'Les meilleurs programmes de distribution facilitent la vente, la formation et le support client sans augmenter la friction opérationnelle.', ['Onboarding technique et formation produit', 'Supports commerciaux et contenu multilingue', 'Passage de devis, démo et support', 'Route optionnelle OEM ou marque blanche']),
      section('Différenciation numérique', 'Une plateforme connectée peut renforcer l’offre en reliant utilisation produit, traçabilité, reporting, CRM et communication client.')
    ], { eyebrow: 'Guide distributeur', primaryCta: 'Discuter distribution', secondaryCta: 'Voir programme OEM', seoTitle: 'Checklist distributeurs kits analyse eau | AquaVerify OEM', faqs: [
      { question: 'Les distributeurs peuvent-ils vendre AquaVerify sous leur propre marque?', answer: 'AquaVerify peut évaluer un approvisionnement OEM ou marque blanche selon périmètre produit, territoire, volumes et exigences techniques.' },
      { question: 'Pourquoi le logiciel compte-t-il pour les distributeurs?', answer: 'Le logiciel peut aider à dépasser un catalogue uniquement produit en offrant traçabilité, reporting et flux de service connectés.' }
    ] }),
    it: locale('/it/risorse/checklist-distributori-kit-analisi-acqua', 'Checklist per distributori di kit analisi acqua', 'Checklist pratica per distributori scientifici che valutano kit di microbiologia dell’acqua, opzioni OEM e flussi software collegati.', [
      section('Coerenza di portfolio', 'Il distributore dovrebbe prima validare se la gamma aggiunge una storia chiara di microbiologia dell’acqua al catalogo esistente.', ['Famiglie prodotto quantitative e qualitative', 'Kit orientati a ISO/EPA ed essentials', 'Segmenti cliente e casi d’uso chiari', 'Domanda ricorrente di consumabili']),
      section('Supporto tecnico e commerciale', 'I programmi di distribuzione più forti facilitano vendita, formazione e supporto clienti senza aumentare la frizione operativa.', ['Onboarding tecnico e formazione prodotto', 'Materiale commerciale e contenuti multilingue', 'Passaggio di preventivo, demo e supporto', 'Percorso opzionale OEM o private label']),
      section('Differenziazione digitale', 'Una piattaforma collegata può rendere l’offerta più forte collegando uso del prodotto, tracciabilità, reporting, CRM e comunicazione cliente.')
    ], { eyebrow: 'Guida distributori', primaryCta: 'Discuti distribuzione', secondaryCta: 'Vedi programma OEM', seoTitle: 'Checklist distributori kit analisi acqua | AquaVerify OEM', faqs: [
      { question: 'I distributori possono vendere AquaVerify con il proprio brand?', answer: 'AquaVerify può valutare fornitura OEM o private label in base a perimetro prodotto, territorio, volumi e requisiti tecnici.' },
      { question: 'Perché il software conta per i distributori?', answer: 'Il software può aiutare a superare un catalogo solo prodotto offrendo tracciabilità, reporting e flussi di servizio collegati.' }
    ] }),
    ca: locale('/ca/recursos/checklist-distribuidors-kits-analisi-aigua', 'Checklist per a distribuïdors de kits d’anàlisi d’aigua', 'Checklist pràctica per a distribuïdors científics que avaluen kits de microbiologia de l’aigua, opcions OEM i fluxos digitals connectats.', [
      section('Encaix de portfolio', 'El distribuïdor ha de validar primer si la gamma afegeix una història clara de microbiologia de l’aigua al seu catàleg actual.', ['Famílies de producte quantitatives i qualitatives', 'Kits orientats a ISO/EPA i essentials', 'Segments client i casos d’ús clars', 'Demanda recurrent de consumibles']),
      section('Suport tècnic i comercial', 'Els programes de distribució més forts faciliten vendre, formar i donar suport a clients sense augmentar fricció operativa.', ['Onboarding tècnic i formació de producte', 'Material comercial i contingut multilingüe', 'Traspàs de pressupost, demo i suport', 'Ruta opcional OEM o marca blanca']),
      section('Diferenciació digital', 'Una plataforma connectada pot fer l’oferta més forta vinculant ús de producte amb traçabilitat, reporting, CRM i comunicació client.')
    ], { eyebrow: 'Guia distribuïdor', primaryCta: 'Parlar de distribució', secondaryCta: 'Veure programa OEM', seoTitle: 'Checklist distribuïdors kits anàlisi aigua | AquaVerify OEM', faqs: [
      { question: 'Els distribuïdors poden vendre AquaVerify sota la seva pròpia marca?', answer: 'AquaVerify pot avaluar subministrament OEM o marca blanca segons abast de producte, territori, volums i requisits tècnics.' },
      { question: 'Per què importa el software per a distribuïdors?', answer: 'El software pot ajudar a passar d’un catàleg només de productes a una oferta amb traçabilitat, reporting i fluxos de servei connectats.' }
    ] })
  }, { parentId: 'resources' }),
  page('eu-drinking-water-directive-coliphages', 'resources', 'quote', {
    en: locale('/resources/eu-drinking-water-directive-coliphages', 'EU Drinking Water Directive and somatic coliphages', 'Whitepaper for laboratories, utilities and distributors preparing risk-based water quality workflows under the recast EU Drinking Water Directive.', [
      section('What changed in Europe', 'Directive (EU) 2020/2184 reinforces a risk-based approach to drinking water quality and extends the microbiological conversation to include somatic coliphages in treatment performance and raw water monitoring contexts. For laboratories and suppliers, the opportunity is to translate regulatory language into sample plans, method readiness and clear evidence records.', ['Risk-based monitoring instead of isolated results', 'Somatic coliphages as viral indicator context', 'Treatment efficacy and raw water evidence', 'Traceability from sampling point to report']),
      section('What technical buyers should prepare', 'A strong implementation brief should connect the regulatory driver with the real operational workflow: sampling locations, sample volumes, method route, controls, acceptance criteria, reporting language and escalation process.', ['Sampling plan and responsible roles', 'ISO 10705-2 oriented method discussion', 'Controls, batch records and reviewer history', 'Digital report and customer communication']),
      section('How AquaVerify supports the workflow', 'AquaVerify connects coliphage-focused products, laboratory essentials and AquaVerify Cloud so a buyer can move from whitepaper research to product selection, SaaS workflow design or distributor/OEM conversation without losing context.')
    ], { eyebrow: 'Whitepaper', primaryCta: 'Map EU compliance workflow', secondaryCta: 'Explore resources', seoTitle: 'EU Drinking Water Directive and Somatic Coliphages | AquaVerify Whitepaper', seoDescription: 'Whitepaper on Directive (EU) 2020/2184, somatic coliphages, ISO-oriented workflows and digital traceability for water quality teams.', whitepaper: whitepaperDeepDive('eu', 'en'), faqs: [
      { question: 'Does this whitepaper replace legal or accreditation advice?', answer: 'No. It is practical marketing and technical orientation. Laboratories, water suppliers and distributors should confirm requirements with their competent authority, accreditation body and quality system.' },
      { question: 'Why are somatic coliphages relevant for EU water quality teams?', answer: 'They strengthen the viral indicator discussion around treatment performance and microbiological risk, especially when a programme needs evidence beyond traditional bacterial indicators.' }
    ] }),
    es: locale('/es/recursos/directiva-europea-agua-potable-colifagos', 'Directiva europea de agua potable y colífagos somáticos', 'Whitepaper para laboratorios, operadores y distribuidores que preparan flujos de calidad del agua basados en riesgo bajo la Directiva europea de agua potable.', [
      section('Qué ha cambiado en Europa', 'La Directiva (UE) 2020/2184 refuerza el enfoque basado en riesgo para la calidad del agua de consumo y amplía la conversación microbiológica para incluir colífagos somáticos en contextos de eficacia de tratamiento y monitorización de agua bruta. Para laboratorios y proveedores, la oportunidad está en traducir la norma en planes de muestreo, preparación metodológica y registros de evidencia claros.', ['Monitorización basada en riesgo, no solo resultados aislados', 'Colífagos somáticos como contexto de indicador viral', 'Evidencia de eficacia de tratamiento y agua bruta', 'Trazabilidad desde punto de muestreo hasta informe']),
      section('Qué debe preparar un comprador técnico', 'Un buen brief de implantación conecta el driver regulatorio con el flujo operativo real: puntos de muestreo, volúmenes, ruta metodológica, controles, criterios de aceptación, lenguaje de informe y proceso de escalado.', ['Plan de muestreo y roles responsables', 'Discusión metodológica orientada a ISO 10705-2', 'Controles, registros de lote e historial de revisión', 'Informe digital y comunicación con cliente']),
      section('Cómo ayuda AquaVerify', 'AquaVerify conecta productos centrados en colífagos, essentials de laboratorio y AquaVerify Cloud para que el comprador pase de la investigación del whitepaper a selección de producto, diseño SaaS o conversación distribuidor/OEM sin perder contexto.')
    ], { eyebrow: 'Whitepaper', primaryCta: 'Mapear flujo de cumplimiento UE', secondaryCta: 'Explorar recursos', seoTitle: 'Directiva europea de agua potable y colífagos somáticos | Whitepaper AquaVerify', seoDescription: 'Whitepaper sobre Directiva (UE) 2020/2184, colífagos somáticos, flujos orientados a ISO y trazabilidad digital para equipos de calidad del agua.', whitepaper: whitepaperDeepDive('eu', 'es'), faqs: [
      { question: '¿Este whitepaper sustituye asesoramiento legal o de acreditación?', answer: 'No. Es orientación práctica comercial y técnica. Laboratorios, operadores y distribuidores deben confirmar requisitos con su autoridad competente, entidad de acreditación y sistema de calidad.' },
      { question: '¿Por qué son relevantes los colífagos somáticos para equipos europeos?', answer: 'Refuerzan la conversación de indicador viral alrededor de eficacia de tratamiento y riesgo microbiológico, especialmente cuando un programa necesita evidencia más allá de indicadores bacterianos tradicionales.' }
    ] }),
    fr: locale('/fr/ressources/directive-europeenne-eau-potable-coliphages', 'Directive européenne eau potable et coliphages somatiques', 'Whitepaper pour laboratoires, opérateurs et distributeurs préparant des flux qualité eau fondés sur le risque avec la directive européenne eau potable.', [
      section('Ce qui change en Europe', 'La directive (UE) 2020/2184 renforce l’approche fondée sur le risque pour l’eau destinée à la consommation humaine et élargit la discussion microbiologique aux coliphages somatiques dans des contextes d’efficacité du traitement et de surveillance de l’eau brute. Pour les laboratoires et fournisseurs, l’enjeu consiste à transformer le texte réglementaire en plans de prélèvement, préparation méthodologique et preuves exploitables.', ['Surveillance fondée sur le risque, pas seulement résultats isolés', 'Coliphages somatiques comme contexte d’indicateur viral', 'Preuve d’efficacité du traitement et d’eau brute', 'Traçabilité du point de prélèvement au rapport']),
      section('Ce qu’un acheteur technique doit préparer', 'Un bon brief d’implémentation relie le moteur réglementaire au flux opérationnel réel: points de prélèvement, volumes, méthode, contrôles, critères d’acceptation, langage du rapport et processus d’escalade.', ['Plan de prélèvement et rôles responsables', 'Discussion méthode orientée ISO 10705-2', 'Contrôles, registres de lot et historique de revue', 'Rapport numérique et communication client']),
      section('Comment AquaVerify accompagne le flux', 'AquaVerify connecte produits axés coliphages, essentiels laboratoire et AquaVerify Cloud afin de passer de la lecture du whitepaper au choix produit, au design SaaS ou à l’échange distributeur/OEM sans perdre le contexte.')
    ], { eyebrow: 'Whitepaper', primaryCta: 'Cartographier le flux UE', secondaryCta: 'Explorer les ressources', seoTitle: 'Directive européenne eau potable et coliphages somatiques | Whitepaper AquaVerify', seoDescription: 'Whitepaper sur la directive (UE) 2020/2184, les coliphages somatiques, les flux orientés ISO et la traçabilité numérique pour équipes qualité eau.', whitepaper: whitepaperDeepDive('eu', 'fr'), faqs: [
      { question: 'Ce whitepaper remplace-t-il un conseil juridique ou d’accréditation?', answer: 'Non. Il s’agit d’une orientation pratique commerciale et technique. Laboratoires, opérateurs et distributeurs doivent confirmer les exigences avec leur autorité compétente, organisme d’accréditation et système qualité.' },
      { question: 'Pourquoi les coliphages somatiques sont-ils pertinents en Europe?', answer: 'Ils renforcent la discussion d’indicateur viral autour de l’efficacité du traitement et du risque microbiologique, surtout lorsqu’un programme demande des preuves au-delà des indicateurs bactériens classiques.' }
    ] }),
    it: locale('/it/risorse/direttiva-europea-acqua-potabile-colifagi', 'Direttiva europea acqua potabile e colifagi somatici', 'Whitepaper per laboratori, operatori e distributori che preparano flussi qualità acqua basati sul rischio secondo la Direttiva europea acqua potabile.', [
      section('Cosa cambia in Europa', 'La Direttiva (UE) 2020/2184 rafforza l’approccio basato sul rischio per l’acqua destinata al consumo umano e amplia la conversazione microbiologica includendo i colifagi somatici in contesti di efficacia del trattamento e monitoraggio dell’acqua grezza. Per laboratori e fornitori, l’opportunità è trasformare il testo normativo in piani di campionamento, preparazione metodologica e registri di evidenza chiari.', ['Monitoraggio basato sul rischio, non solo risultati isolati', 'Colifagi somatici come contesto di indicatore virale', 'Evidenza di efficacia trattamento e acqua grezza', 'Tracciabilità dal punto di campionamento al report']),
      section('Cosa deve preparare un buyer tecnico', 'Un buon brief di implementazione collega il driver normativo al flusso operativo reale: punti di campionamento, volumi, percorso metodologico, controlli, criteri di accettazione, linguaggio del report e processo di escalation.', ['Piano di campionamento e ruoli responsabili', 'Discussione metodo orientata a ISO 10705-2', 'Controlli, registri lotto e storico revisione', 'Report digitale e comunicazione cliente']),
      section('Come AquaVerify supporta il flusso', 'AquaVerify collega prodotti focalizzati sui colifagi, essentials di laboratorio e AquaVerify Cloud affinché il buyer passi dalla ricerca nel whitepaper alla scelta prodotto, al design SaaS o alla conversazione distributore/OEM senza perdere contesto.')
    ], { eyebrow: 'Whitepaper', primaryCta: 'Mappa flusso conformità UE', secondaryCta: 'Esplora risorse', seoTitle: 'Direttiva europea acqua potabile e colifagi somatici | Whitepaper AquaVerify', seoDescription: 'Whitepaper su Direttiva (UE) 2020/2184, colifagi somatici, flussi orientati ISO e tracciabilità digitale per team qualità acqua.', whitepaper: whitepaperDeepDive('eu', 'it'), faqs: [
      { question: 'Questo whitepaper sostituisce consulenza legale o di accreditamento?', answer: 'No. È orientamento pratico commerciale e tecnico. Laboratori, operatori e distributori devono confermare i requisiti con autorità competente, ente di accreditamento e sistema qualità.' },
      { question: 'Perché i colifagi somatici sono rilevanti per i team europei?', answer: 'Rafforzano la discussione di indicatore virale intorno a efficacia del trattamento e rischio microbiologico, soprattutto quando un programma richiede evidenza oltre agli indicatori batterici tradizionali.' }
    ] }),
    ca: locale('/ca/recursos/directiva-europea-aigua-potable-colifags', 'Directiva europea d’aigua potable i colífags somàtics', 'Whitepaper per a laboratoris, operadors i distribuïdors que preparen fluxos de qualitat de l’aigua basats en risc sota la Directiva europea d’aigua potable.', [
      section('Què ha canviat a Europa', 'La Directiva (UE) 2020/2184 reforça l’enfocament basat en risc per a la qualitat de l’aigua de consum i amplia la conversa microbiològica per incloure colífags somàtics en contextos d’eficàcia de tractament i monitoratge d’aigua bruta. Per a laboratoris i proveïdors, l’oportunitat és traduir la norma en plans de mostreig, preparació metodològica i registres d’evidència clars.', ['Monitoratge basat en risc, no només resultats aïllats', 'Colífags somàtics com a context d’indicador viral', 'Evidència d’eficàcia de tractament i aigua bruta', 'Traçabilitat des del punt de mostreig fins a l’informe']),
      section('Què ha de preparar un comprador tècnic', 'Un bon brief d’implantació connecta el driver regulatori amb el flux operatiu real: punts de mostreig, volums, ruta metodològica, controls, criteris d’acceptació, llenguatge d’informe i procés d’escalat.', ['Pla de mostreig i rols responsables', 'Discussió metodològica orientada a ISO 10705-2', 'Controls, registres de lot i historial de revisió', 'Informe digital i comunicació amb client']),
      section('Com ajuda AquaVerify', 'AquaVerify connecta productes centrats en colífags, essentials de laboratori i AquaVerify Cloud perquè el comprador passi de la investigació del whitepaper a selecció de producte, disseny SaaS o conversa distribuïdor/OEM sense perdre context.')
    ], { eyebrow: 'Whitepaper', primaryCta: 'Mapar flux de compliment UE', secondaryCta: 'Explorar recursos', seoTitle: 'Directiva europea d’aigua potable i colífags somàtics | Whitepaper AquaVerify', seoDescription: 'Whitepaper sobre Directiva (UE) 2020/2184, colífags somàtics, fluxos orientats a ISO i traçabilitat digital per a equips de qualitat de l’aigua.', whitepaper: whitepaperDeepDive('eu', 'ca'), faqs: [
      { question: 'Aquest whitepaper substitueix assessorament legal o d’acreditació?', answer: 'No. És orientació pràctica comercial i tècnica. Laboratoris, operadors i distribuïdors han de confirmar requisits amb la seva autoritat competent, entitat d’acreditació i sistema de qualitat.' },
      { question: 'Per què són rellevants els colífags somàtics per a equips europeus?', answer: 'Reforcen la conversa d’indicador viral al voltant d’eficàcia de tractament i risc microbiològic, especialment quan un programa necessita evidència més enllà d’indicadors bacterians tradicionals.' }
    ] })
  }, { parentId: 'resources' }),
  page('water-compliance-software-guide', 'resources', 'saas', {
    en: locale('/resources/water-compliance-software-guide', 'Software evidence layer for water quality compliance', 'Whitepaper on using connected software to organize samples, methods, audit trails, reports and customer follow-up for water quality teams.', [
      section('Compliance is not only a result', 'For laboratories and water quality teams, compliance work depends on evidence: who requested the test, where the sample came from, which method route was used, which product or kit was consumed, who reviewed the result and what was communicated to the customer.', ['Sample metadata and chain of responsibility', 'Method, product and batch context', 'Review, approval and report status', 'Customer communication and follow-up history']),
      section('What software should capture', 'A practical water quality platform should make the operational record useful for audits and commercial follow-up without pretending to replace laboratory validation or regulatory judgement.', ['Role-based access and audit trail', 'Structured sampling and result records', 'Report templates and version history', 'Dashboards for product interest, workload and recurring demand']),
      section('Why it attracts serious B2B conversations', 'A whitepaper about software evidence helps teams that already feel operational friction: growing labs, distributors selling technical products, quality teams managing suppliers and biotech companies looking for an all-in-one SaaS platform.')
    ], { eyebrow: 'Whitepaper', primaryCta: 'Request SaaS demo', secondaryCta: 'Explore resources', seoTitle: 'Water Compliance Software Guide | AquaVerify Cloud Whitepaper', seoDescription: 'Whitepaper on software evidence, audit trails, sample traceability and customer follow-up for water quality compliance workflows.', whitepaper: whitepaperDeepDive('software', 'en'), faqs: [
      { question: 'Can software make a laboratory compliant by itself?', answer: 'No. Software organizes evidence and workflow discipline; laboratories still need validated methods, trained staff, quality procedures and applicable regulatory review.' },
      { question: 'Who is the best audience for this whitepaper?', answer: 'Laboratories, water quality teams, distributors and biotech companies that need one workflow across samples, products, reports, CRM and customer communication.' }
    ] }),
    es: locale('/es/recursos/software-cumplimiento-calidad-agua', 'Capa de evidencia software para cumplimiento en calidad del agua', 'Whitepaper sobre cómo usar software conectado para organizar muestras, métodos, auditoría, informes y seguimiento de clientes en equipos de calidad del agua.', [
      section('El cumplimiento no es solo un resultado', 'Para laboratorios y equipos de calidad del agua, el cumplimiento depende de la evidencia: quién pidió el análisis, de dónde viene la muestra, qué ruta metodológica se siguió, qué producto o kit se consumió, quién revisó el resultado y qué se comunicó al cliente.', ['Metadatos de muestra y cadena de responsabilidad', 'Contexto de método, producto y lote', 'Estado de revisión, aprobación e informe', 'Comunicación cliente e historial de seguimiento']),
      section('Qué debe capturar el software', 'Una plataforma práctica de calidad del agua debe hacer que el registro operativo sea útil para auditorías y seguimiento comercial sin pretender sustituir la validación de laboratorio ni el criterio regulatorio.', ['Acceso por roles y audit trail', 'Registros estructurados de muestra y resultado', 'Plantillas de informe e historial de versión', 'Paneles de interés de producto, carga de trabajo y demanda recurrente']),
      section('Por qué atrae conversaciones B2B serias', 'Un whitepaper sobre evidencia software ayuda a equipos que ya sienten fricción operativa: laboratorios en crecimiento, distribuidores de productos técnicos, equipos de calidad que coordinan proveedores y empresas biotech que buscan una plataforma SaaS todo en uno.')
    ], { eyebrow: 'Whitepaper', primaryCta: 'Solicitar demo SaaS', secondaryCta: 'Explorar recursos', seoTitle: 'Software de cumplimiento en calidad del agua | Whitepaper AquaVerify Cloud', seoDescription: 'Whitepaper sobre evidencia software, audit trail, trazabilidad de muestras y seguimiento de clientes para flujos de cumplimiento en calidad del agua.', whitepaper: whitepaperDeepDive('software', 'es'), faqs: [
      { question: '¿El software puede hacer que un laboratorio sea compliant por sí solo?', answer: 'No. El software organiza evidencia y disciplina de flujo; el laboratorio sigue necesitando métodos validados, personal formado, procedimientos de calidad y revisión regulatoria aplicable.' },
      { question: '¿Para quién es este whitepaper?', answer: 'Laboratorios, equipos de calidad del agua, distribuidores y empresas biotech que necesitan un flujo común entre muestras, productos, informes, CRM y comunicación cliente.' }
    ] }),
    fr: locale('/fr/ressources/logiciel-conformite-qualite-eau', 'Couche de preuve logicielle pour conformité qualité eau', 'Whitepaper sur l’utilisation d’un logiciel connecté pour organiser échantillons, méthodes, piste d’audit, rapports et suivi client en qualité eau.', [
      section('La conformité n’est pas seulement un résultat', 'Pour laboratoires et équipes qualité eau, la conformité dépend de la preuve: qui a demandé l’analyse, d’où vient l’échantillon, quelle route méthodologique a été suivie, quel produit ou kit a été consommé, qui a revu le résultat et ce qui a été communiqué au client.', ['Métadonnées échantillon et chaîne de responsabilité', 'Contexte méthode, produit et lot', 'Statut de revue, approbation et rapport', 'Communication client et historique de suivi']),
      section('Ce que le logiciel doit capturer', 'Une plateforme qualité eau pratique doit rendre le registre opérationnel utile aux audits et au suivi commercial sans remplacer la validation laboratoire ni le jugement réglementaire.', ['Accès par rôles et piste d’audit', 'Enregistrements structurés échantillon et résultat', 'Modèles de rapport et historique de version', 'Tableaux de bord pour intérêt produit, charge de travail et demande récurrente']),
      section('Pourquoi cela attire des échanges B2B sérieux', 'Un whitepaper sur la preuve logicielle aide les équipes qui ressentent déjà une friction opérationnelle: laboratoires en croissance, distributeurs de produits techniques, équipes qualité coordonnant fournisseurs et biotech cherchant une plateforme SaaS tout-en-un.')
    ], { eyebrow: 'Whitepaper', primaryCta: 'Demander une démo SaaS', secondaryCta: 'Explorer les ressources', seoTitle: 'Logiciel conformité qualité eau | Whitepaper AquaVerify Cloud', seoDescription: 'Whitepaper sur preuve logicielle, piste d’audit, traçabilité échantillons et suivi client pour flux conformité qualité eau.', whitepaper: whitepaperDeepDive('software', 'fr'), faqs: [
      { question: 'Le logiciel peut-il rendre un laboratoire conforme à lui seul?', answer: 'Non. Le logiciel organise la preuve et la discipline de flux; le laboratoire a toujours besoin de méthodes validées, personnel formé, procédures qualité et revue réglementaire applicable.' },
      { question: 'À qui s’adresse ce whitepaper?', answer: 'Aux laboratoires, équipes qualité eau, distributeurs et biotech qui ont besoin d’un flux commun entre échantillons, produits, rapports, CRM et communication client.' }
    ] }),
    it: locale('/it/risorse/software-conformita-qualita-acqua', 'Livello software di evidenza per conformità qualità acqua', 'Whitepaper sull’uso di software collegato per organizzare campioni, metodi, audit trail, report e follow-up cliente nei team qualità acqua.', [
      section('La conformità non è solo un risultato', 'Per laboratori e team qualità acqua, la conformità dipende dall’evidenza: chi ha richiesto l’analisi, da dove proviene il campione, quale percorso metodologico è stato seguito, quale prodotto o kit è stato consumato, chi ha revisionato il risultato e cosa è stato comunicato al cliente.', ['Metadati campione e catena di responsabilità', 'Contesto metodo, prodotto e lotto', 'Stato di revisione, approvazione e report', 'Comunicazione cliente e storico follow-up']),
      section('Cosa deve catturare il software', 'Una piattaforma pratica per qualità acqua deve rendere il record operativo utile per audit e follow-up commerciale senza sostituire validazione di laboratorio o giudizio normativo.', ['Accesso per ruoli e audit trail', 'Record strutturati di campione e risultato', 'Template report e storico versioni', 'Dashboard per interesse prodotto, carico di lavoro e domanda ricorrente']),
      section('Perché attira conversazioni B2B serie', 'Un whitepaper sull’evidenza software aiuta team che già sentono frizione operativa: laboratori in crescita, distributori di prodotti tecnici, team qualità che coordinano fornitori e biotech alla ricerca di una piattaforma SaaS all-in-one.')
    ], { eyebrow: 'Whitepaper', primaryCta: 'Richiedi demo SaaS', secondaryCta: 'Esplora risorse', seoTitle: 'Software conformità qualità acqua | Whitepaper AquaVerify Cloud', seoDescription: 'Whitepaper su evidenza software, audit trail, tracciabilità campioni e follow-up cliente per flussi conformità qualità acqua.', whitepaper: whitepaperDeepDive('software', 'it'), faqs: [
      { question: 'Il software può rendere conforme un laboratorio da solo?', answer: 'No. Il software organizza evidenza e disciplina di flusso; il laboratorio ha comunque bisogno di metodi validati, personale formato, procedure qualità e revisione normativa applicabile.' },
      { question: 'Per chi è questo whitepaper?', answer: 'Laboratori, team qualità acqua, distributori e biotech che richiedono un flusso comune tra campioni, prodotti, report, CRM e comunicazione cliente.' }
    ] }),
    ca: locale('/ca/recursos/software-compliment-qualitat-aigua', 'Capa d’evidència software per a compliment en qualitat de l’aigua', 'Whitepaper sobre com usar software connectat per organitzar mostres, mètodes, auditoria, informes i seguiment de clients en equips de qualitat de l’aigua.', [
      section('El compliment no és només un resultat', 'Per a laboratoris i equips de qualitat de l’aigua, el compliment depèn de l’evidència: qui va demanar l’anàlisi, d’on ve la mostra, quina ruta metodològica es va seguir, quin producte o kit es va consumir, qui va revisar el resultat i què es va comunicar al client.', ['Metadades de mostra i cadena de responsabilitat', 'Context de mètode, producte i lot', 'Estat de revisió, aprovació i informe', 'Comunicació client i historial de seguiment']),
      section('Què ha de capturar el software', 'Una plataforma pràctica de qualitat de l’aigua ha de fer que el registre operatiu sigui útil per a auditories i seguiment comercial sense pretendre substituir la validació de laboratori ni el criteri regulatori.', ['Accés per rols i audit trail', 'Registres estructurats de mostra i resultat', 'Plantilles d’informe i historial de versió', 'Panells d’interès de producte, càrrega de treball i demanda recurrent']),
      section('Per què atrau converses B2B serioses', 'Un whitepaper sobre evidència software ajuda equips que ja senten fricció operativa: laboratoris en creixement, distribuïdors de productes tècnics, equips de qualitat que coordinen proveïdors i empreses biotech que busquen una plataforma SaaS tot en un.')
    ], { eyebrow: 'Whitepaper', primaryCta: 'Sol·licitar demo SaaS', secondaryCta: 'Explorar recursos', seoTitle: 'Software de compliment en qualitat de l’aigua | Whitepaper AquaVerify Cloud', seoDescription: 'Whitepaper sobre evidència software, audit trail, traçabilitat de mostres i seguiment de clients per a fluxos de compliment en qualitat de l’aigua.', whitepaper: whitepaperDeepDive('software', 'ca'), faqs: [
      { question: 'El software pot fer que un laboratori sigui compliant per si sol?', answer: 'No. El software organitza evidència i disciplina de flux; el laboratori continua necessitant mètodes validats, personal format, procediments de qualitat i revisió regulatòria aplicable.' },
      { question: 'Per a qui és aquest whitepaper?', answer: 'Laboratoris, equips de qualitat de l’aigua, distribuïdors i empreses biotech que necessiten un flux comú entre mostres, productes, informes, CRM i comunicació client.' }
    ] })
  }, { parentId: 'resources' }),
  page('us-drinking-water-compliance-coliform-rule', 'resources', 'quote', {
    en: locale('/resources/us-drinking-water-compliance-coliform-rule', 'US drinking water compliance: coliform rules and coliphage context', 'Whitepaper for teams mapping US drinking water monitoring, the Revised Total Coliform Rule and EPA-oriented microbiology workflows.', [
      section('The US compliance starting point', 'The EPA Revised Total Coliform Rule uses total coliforms and E. coli to help public water systems evaluate treatment adequacy and distribution-system integrity. For a B2B buyer, the practical question is how to keep monitoring plans, results, assessments, corrective actions and customer communication organized.', ['Sample siting plan and schedule context', 'Total coliform and E. coli monitoring records', 'Assessment and corrective-action evidence', 'Public or customer reporting workflow']),
      section('Where coliphage methods fit', 'Coliphage testing is a related microbiology context, especially for teams evaluating viral indicators or ground-water contamination questions. EPA Method 1602 provides a single agar layer route for male-specific and somatic coliphage enumeration, but it should be positioned separately from RTCR bacterial monitoring obligations.', ['Clear distinction between coliform rule and coliphage method', 'Method readiness and quality-control records', 'Product, host strain and consumable planning', 'Result traceability by sample and batch']),
      section('How AquaVerify turns interest into a clear next step', 'AquaVerify connects US-oriented educational content with product pages, datasheets and demo requests so visitors can move from research to a structured product, platform or distributor conversation.')
    ], { eyebrow: 'Whitepaper', primaryCta: 'Discuss US workflow', secondaryCta: 'Explore resources', seoTitle: 'US Drinking Water Compliance, Coliform Rule and Coliphage Context | AquaVerify', seoDescription: 'Whitepaper on the EPA Revised Total Coliform Rule, EPA Method 1602 context and digital traceability for US water quality teams.', whitepaper: whitepaperDeepDive('us', 'en'), faqs: [
      { question: 'Is EPA Method 1602 the same as the Revised Total Coliform Rule?', answer: 'No. The RTCR focuses on total coliform and E. coli monitoring for public water systems; Method 1602 is a coliphage method context that may be relevant for different monitoring questions.' },
      { question: 'How should US teams use this resource?', answer: 'Use it to prepare a conversation about monitoring workflow, products, method readiness, evidence records and whether AquaVerify Cloud should support reporting and customer follow-up.' }
    ] }),
    es: locale('/es/recursos/eeuu-cumplimiento-agua-potable-regla-coliformes', 'Cumplimiento de agua potable en Estados Unidos: coliformes y contexto colífagos', 'Whitepaper para equipos que mapean monitorización de agua potable en Estados Unidos, Revised Total Coliform Rule y flujos microbiológicos orientados a EPA.', [
      section('El punto de partida en Estados Unidos', 'La Revised Total Coliform Rule de EPA usa coliformes totales y E. coli para ayudar a sistemas públicos de agua a evaluar adecuación de tratamiento e integridad de la red de distribución. Para un comprador B2B, la pregunta práctica es cómo organizar planes de muestreo, resultados, evaluaciones, acciones correctivas y comunicación.', ['Contexto de plan y calendario de puntos de muestreo', 'Registros de coliformes totales y E. coli', 'Evidencia de evaluación y acción correctiva', 'Flujo de informe público o comunicación cliente']),
      section('Dónde encajan los métodos de colífagos', 'El análisis de colífagos es un contexto microbiológico relacionado, especialmente para equipos que evalúan indicadores virales o preguntas de contaminación en agua subterránea. EPA Method 1602 proporciona una ruta de single agar layer para enumeración de colífagos F+ y somáticos, pero debe posicionarse separada de las obligaciones bacterianas de la RTCR.', ['Diferenciar regla de coliformes y método colífagos', 'Preparación metodológica y registros de control de calidad', 'Planificación de producto, cepa huésped y consumibles', 'Trazabilidad de resultado por muestra y lote']),
      section('Cómo AquaVerify convierte interés en un siguiente paso claro', 'AquaVerify conecta contenido educativo orientado a Estados Unidos con páginas de producto, datasheets y solicitudes de demo para que el visitante pase de la investigación a una conversación estructurada de producto, plataforma o distribución.')
    ], { eyebrow: 'Whitepaper', primaryCta: 'Hablar de flujo EEUU', secondaryCta: 'Explorar recursos', seoTitle: 'Cumplimiento agua potable EEUU, coliformes y colífagos | AquaVerify', seoDescription: 'Whitepaper sobre EPA Revised Total Coliform Rule, contexto EPA Method 1602 y trazabilidad digital para equipos de calidad del agua en Estados Unidos.', whitepaper: whitepaperDeepDive('us', 'es'), faqs: [
      { question: '¿EPA Method 1602 es lo mismo que la Revised Total Coliform Rule?', answer: 'No. La RTCR se centra en monitorización de coliformes totales y E. coli para sistemas públicos de agua; Method 1602 es un contexto metodológico para colífagos que puede ser relevante para otras preguntas de monitorización.' },
      { question: '¿Cómo debería usar este recurso un equipo de Estados Unidos?', answer: 'Para preparar una conversación sobre flujo de monitorización, productos, preparación metodológica, registros de evidencia y si AquaVerify Cloud debe apoyar reporting y seguimiento de clientes.' }
    ] }),
    fr: locale('/fr/ressources/etats-unis-conformite-eau-potable-coliformes', 'Conformité eau potable États-Unis: coliformes et contexte coliphages', 'Whitepaper pour équipes cartographiant la surveillance eau potable aux États-Unis, la Revised Total Coliform Rule et les flux microbiologiques orientés EPA.', [
      section('Le point de départ américain', 'La Revised Total Coliform Rule de l’EPA utilise coliformes totaux et E. coli pour aider les systèmes publics d’eau à évaluer l’adéquation du traitement et l’intégrité du réseau de distribution. Pour un acheteur B2B, la question pratique est d’organiser plans de prélèvement, résultats, évaluations, actions correctives et communication.', ['Contexte du plan et calendrier de points de prélèvement', 'Registres coliformes totaux et E. coli', 'Preuve d’évaluation et action corrective', 'Flux de rapport public ou communication client']),
      section('Où s’insèrent les méthodes coliphages', 'L’analyse des coliphages est un contexte microbiologique lié, notamment pour les équipes évaluant des indicateurs viraux ou des questions de contamination d’eau souterraine. EPA Method 1602 fournit une route single agar layer pour le dénombrement des coliphages F+ et somatiques, mais doit être positionnée séparément des obligations bactériennes RTCR.', ['Distinguer règle coliformes et méthode coliphages', 'Préparation méthode et registres qualité', 'Planification produit, souche hôte et consommables', 'Traçabilité du résultat par échantillon et lot']),
      section('Comment AquaVerify transforme l’intérêt en prochaine étape claire', 'AquaVerify relie le contenu éducatif orienté États-Unis aux pages produit, datasheets et demandes de démo afin que le visiteur passe de la recherche à une discussion structurée produit, plateforme ou distribution.')
    ], { eyebrow: 'Whitepaper', primaryCta: 'Discuter flux États-Unis', secondaryCta: 'Explorer les ressources', seoTitle: 'Conformité eau potable États-Unis, coliformes et coliphages | AquaVerify', seoDescription: 'Whitepaper sur EPA Revised Total Coliform Rule, contexte EPA Method 1602 et traçabilité numérique pour équipes qualité eau aux États-Unis.', whitepaper: whitepaperDeepDive('us', 'fr'), faqs: [
      { question: 'EPA Method 1602 est-elle la même chose que la Revised Total Coliform Rule?', answer: 'Non. La RTCR porte sur la surveillance coliformes totaux et E. coli des systèmes publics d’eau; Method 1602 est un contexte méthodologique coliphages utile pour d’autres questions de surveillance.' },
      { question: 'Comment une équipe américaine doit-elle utiliser cette ressource?', answer: 'Pour préparer une discussion sur flux de surveillance, produits, préparation méthode, preuves et éventuel support AquaVerify Cloud pour reporting et suivi client.' }
    ] }),
    it: locale('/it/risorse/stati-uniti-conformita-acqua-potabile-coliformi', 'Conformità acqua potabile Stati Uniti: coliformi e contesto colifagi', 'Whitepaper per team che mappano monitoraggio acqua potabile negli Stati Uniti, Revised Total Coliform Rule e flussi microbiologici orientati EPA.', [
      section('Il punto di partenza negli Stati Uniti', 'La Revised Total Coliform Rule dell’EPA usa coliformi totali ed E. coli per aiutare i sistemi idrici pubblici a valutare adeguatezza del trattamento e integrità della rete di distribuzione. Per un buyer B2B, la domanda pratica è come organizzare piani di campionamento, risultati, valutazioni, azioni correttive e comunicazione.', ['Contesto del piano e calendario punti di campionamento', 'Record di coliformi totali ed E. coli', 'Evidenza di valutazione e azione correttiva', 'Flusso di report pubblico o comunicazione cliente']),
      section('Dove si inseriscono i metodi colifagi', 'L’analisi dei colifagi è un contesto microbiologico correlato, soprattutto per team che valutano indicatori virali o domande di contaminazione in acque sotterranee. EPA Method 1602 fornisce un percorso single agar layer per enumerazione di colifagi F+ e somatici, ma va posizionato separatamente dagli obblighi batterici RTCR.', ['Distinzione tra regola coliformi e metodo colifagi', 'Preparazione metodo e record di controllo qualità', 'Pianificazione prodotto, ceppo ospite e consumabili', 'Tracciabilità risultato per campione e lotto']),
      section('Come AquaVerify trasforma interesse in un prossimo passo chiaro', 'AquaVerify collega contenuto educativo orientato Stati Uniti con pagine prodotto, datasheet e richieste demo affinché il visitatore passi dalla ricerca a una conversazione strutturata su prodotto, piattaforma o distribuzione.')
    ], { eyebrow: 'Whitepaper', primaryCta: 'Discuti flusso USA', secondaryCta: 'Esplora risorse', seoTitle: 'Conformità acqua potabile USA, coliformi e colifagi | AquaVerify', seoDescription: 'Whitepaper su EPA Revised Total Coliform Rule, contesto EPA Method 1602 e tracciabilità digitale per team qualità acqua negli Stati Uniti.', whitepaper: whitepaperDeepDive('us', 'it'), faqs: [
      { question: 'EPA Method 1602 è la stessa cosa della Revised Total Coliform Rule?', answer: 'No. La RTCR riguarda il monitoraggio di coliformi totali ed E. coli per sistemi idrici pubblici; Method 1602 è un contesto metodologico per colifagi che può essere rilevante per altre domande di monitoraggio.' },
      { question: 'Come dovrebbe usare questa risorsa un team statunitense?', answer: 'Per preparare una conversazione su flusso di monitoraggio, prodotti, preparazione metodo, registri di evidenza e se AquaVerify Cloud debba supportare reporting e follow-up cliente.' }
    ] }),
    ca: locale('/ca/recursos/estats-units-compliment-aigua-potable-coliformes', 'Compliment d’aigua potable als Estats Units: coliformes i context colífags', 'Whitepaper per a equips que mapen monitoratge d’aigua potable als Estats Units, Revised Total Coliform Rule i fluxos microbiològics orientats a EPA.', [
      section('El punt de partida als Estats Units', 'La Revised Total Coliform Rule de l’EPA usa coliformes totals i E. coli per ajudar sistemes públics d’aigua a avaluar adequació de tractament i integritat de la xarxa de distribució. Per a un comprador B2B, la pregunta pràctica és com organitzar plans de mostreig, resultats, avaluacions, accions correctives i comunicació.', ['Context de pla i calendari de punts de mostreig', 'Registres de coliformes totals i E. coli', 'Evidència d’avaluació i acció correctiva', 'Flux d’informe públic o comunicació client']),
      section('On encaixen els mètodes de colífags', 'L’anàlisi de colífags és un context microbiològic relacionat, especialment per a equips que avaluen indicadors virals o preguntes de contaminació en aigua subterrània. EPA Method 1602 proporciona una ruta single agar layer per a enumeració de colífags F+ i somàtics, però s’ha de posicionar separada de les obligacions bacterianes de la RTCR.', ['Diferenciar regla de coliformes i mètode colífags', 'Preparació metodològica i registres de control de qualitat', 'Planificació de producte, soca hoste i consumibles', 'Traçabilitat de resultat per mostra i lot']),
      section('Com AquaVerify converteix interès en un següent pas clar', 'AquaVerify connecta contingut educatiu orientat als Estats Units amb pàgines de producte, datasheets i sol·licituds de demo perquè el visitant passi de la recerca a una conversa estructurada de producte, plataforma o distribució.')
    ], { eyebrow: 'Whitepaper', primaryCta: 'Parlar de flux EUA', secondaryCta: 'Explorar recursos', seoTitle: 'Compliment aigua potable EUA, coliformes i colífags | AquaVerify', seoDescription: 'Whitepaper sobre EPA Revised Total Coliform Rule, context EPA Method 1602 i traçabilitat digital per a equips de qualitat de l’aigua als Estats Units.', whitepaper: whitepaperDeepDive('us', 'ca'), faqs: [
      { question: 'EPA Method 1602 és el mateix que la Revised Total Coliform Rule?', answer: 'No. La RTCR se centra en monitoratge de coliformes totals i E. coli per a sistemes públics d’aigua; Method 1602 és un context metodològic per a colífags que pot ser rellevant per a altres preguntes de monitoratge.' },
      { question: 'Com hauria d’usar aquest recurs un equip dels Estats Units?', answer: 'Per preparar una conversa sobre flux de monitoratge, productes, preparació metodològica, registres d’evidència i si AquaVerify Cloud ha de donar suport a reporting i seguiment de clients.' }
    ] })
  }, { parentId: 'resources' }),
  page('about', 'company', 'contact', {
    en: locale('/about', 'About AquaVerify', 'AquaVerify develops water microbiology products and digital workflows to make water quality verifiable and traceable.', [
      section('Who we are', 'AquaVerify combines biotechnology, laboratory operations and cloud software in one B2B water quality ecosystem.'),
      section('What we believe', 'Water quality decisions should be supported by reliable products, clear methods and data that can be traced from sample to report.')
    ], { eyebrow: 'Company', primaryCta: 'Contact AquaVerify', secondaryCta: 'Become a partner' }),
    es: locale('/es/sobre-nosotros', 'Sobre AquaVerify', 'AquaVerify desarrolla productos de microbiología del agua y flujos digitales para hacer la calidad del agua verificable y trazable.', [
      section('Quiénes somos', 'AquaVerify combina biotecnología, operación de laboratorio y software cloud en un ecosistema B2B de calidad del agua.'),
      section('En qué creemos', 'Las decisiones sobre calidad del agua deben apoyarse en productos fiables, métodos claros y datos trazables desde la muestra hasta el informe.')
    ], { eyebrow: 'Empresa', primaryCta: 'Contactar con AquaVerify', secondaryCta: 'Ser partner' }),
    fr: locale('/fr/a-propos', 'À propos d’AquaVerify', 'AquaVerify développe des produits de microbiologie de l’eau et des flux numériques pour rendre la qualité de l’eau vérifiable et traçable.', [
      section('Qui nous sommes', 'AquaVerify combine biotechnologie, opérations de laboratoire et logiciel cloud dans un écosystème B2B de qualité de l’eau.'),
      section('Notre conviction', 'Les décisions sur la qualité de l’eau doivent s’appuyer sur des produits fiables, des méthodes claires et des données traçables de l’échantillon au rapport.')
    ], { eyebrow: 'Entreprise', primaryCta: 'Contacter AquaVerify', secondaryCta: 'Devenir partenaire' }),
    it: locale('/it/chi-siamo', 'Chi è AquaVerify', 'AquaVerify sviluppa prodotti di microbiologia dell’acqua e flussi digitali per rendere la qualità dell’acqua verificabile e tracciabile.', [
      section('Chi siamo', 'AquaVerify combina biotecnologia, operazioni di laboratorio e software cloud in un ecosistema B2B per la qualità dell’acqua.'),
      section('In cosa crediamo', 'Le decisioni sulla qualità dell’acqua devono basarsi su prodotti affidabili, metodi chiari e dati tracciabili dal campione al report.')
    ], { eyebrow: 'Azienda', primaryCta: 'Contatta AquaVerify', secondaryCta: 'Diventa partner' }),
    ca: locale('/ca/sobre-nosaltres', 'Sobre AquaVerify', 'AquaVerify desenvolupa productes de microbiologia de l’aigua i fluxos digitals per fer la qualitat de l’aigua verificable i traçable.', [
      section('Qui som', 'AquaVerify combina biotecnologia, operació de laboratori i software cloud en un ecosistema B2B de qualitat de l’aigua.'),
      section('En què creiem', 'Les decisions sobre qualitat de l’aigua s’han de recolzar en productes fiables, mètodes clars i dades traçables des de la mostra fins a l’informe.')
    ], { eyebrow: 'Empresa', primaryCta: 'Contactar amb AquaVerify', secondaryCta: 'Ser partner' })
  }),
  page('contact', 'company', 'contact', {
    en: locale('/contact', 'Contact AquaVerify', 'Talk to AquaVerify about products, OEM, distribution, SaaS or water quality workflows.', [
      section('Route your request to the right team', 'Use the contact flow so the commercial team can understand your need and respond with the right product, OEM, distributor or SaaS path.', ['Product quote', 'OEM or distributor opportunity', 'SaaS demo', 'Technical discussion'])
    ], { eyebrow: 'Contact', primaryCta: 'Start contact request', secondaryCta: 'Request demo' }),
    es: locale('/es/contacto', 'Contactar con AquaVerify', 'Habla con AquaVerify sobre productos, OEM, distribución, SaaS o flujos de calidad del agua.', [
      section('Dirige tu solicitud al equipo correcto', 'Usa el flujo de contacto para que el equipo comercial entienda la necesidad y responda con la ruta adecuada: producto, OEM, distribución o SaaS.', ['Cotización de producto', 'Oportunidad OEM o distribuidor', 'Demo SaaS', 'Conversación técnica'])
    ], { eyebrow: 'Contacto', primaryCta: 'Iniciar contacto', secondaryCta: 'Solicitar demo' }),
    fr: locale('/fr/contact', 'Contacter AquaVerify', 'Échangez avec AquaVerify sur les produits, l’OEM, la distribution, le SaaS ou les flux qualité eau.', [
      section('Diriger la demande vers la bonne équipe', 'Utilisez le flux de contact afin que l’équipe commerciale comprenne le besoin et réponde avec le bon parcours: produit, OEM, distribution ou SaaS.', ['Devis produit', 'Opportunité OEM ou distributeur', 'Démo SaaS', 'Discussion technique'])
    ], { eyebrow: 'Contact', primaryCta: 'Démarrer la demande', secondaryCta: 'Demander une démo' }),
    it: locale('/it/contatto', 'Contatta AquaVerify', 'Parla con AquaVerify di prodotti, OEM, distribuzione, SaaS o flussi qualità acqua.', [
      section('Indirizza la richiesta al team giusto', 'Usa il flusso di contatto affinché il team commerciale comprenda l’esigenza e risponda con il percorso corretto: prodotto, OEM, distribuzione o SaaS.', ['Preventivo prodotto', 'Opportunità OEM o distributore', 'Demo SaaS', 'Discussione tecnica'])
    ], { eyebrow: 'Contatto', primaryCta: 'Avvia richiesta', secondaryCta: 'Richiedi demo' }),
    ca: locale('/ca/contacte', 'Contactar amb AquaVerify', 'Parla amb AquaVerify sobre productes, OEM, distribució, SaaS o fluxos de qualitat de l’aigua.', [
      section('Dirigeix la sol·licitud a l’equip correcte', 'Fes servir el flux de contacte perquè l’equip comercial entengui la necessitat i respongui amb la ruta adequada: producte, OEM, distribució o SaaS.', ['Pressupost de producte', 'Oportunitat OEM o distribuïdor', 'Demo SaaS', 'Conversa tècnica'])
    ], { eyebrow: 'Contacte', primaryCta: 'Iniciar contacte', secondaryCta: 'Sol·licitar demo' })
  })
];

const INDUSTRY_PAGE_DATA = [
  {
    id: 'municipal-water-testing',
    paths: {
      en: '/industries/municipal-water-testing',
      es: '/es/industrias/analisis-agua-municipal',
      fr: '/fr/industries/analyse-eau-municipale',
      it: '/it/settori/analisi-acqua-municipale',
      ca: '/ca/sectors/analisi-aigua-municipal'
    },
    titles: {
      en: 'Municipal water analysis with traceability from sample to decision',
      es: 'Análisis de agua municipal con trazabilidad de la muestra a la decisión',
      fr: "Analyse de l’eau municipale avec traçabilité de l’échantillon à la décision",
      it: "Analisi dell’acqua municipale con tracciabilità dal campione alla decisione",
      ca: "Anàlisi d’aigua municipal amb traçabilitat de la mostra a la decisió"
    },
    descriptions: {
      en: 'Solutions for municipal water analysis: somatic coliphages, microbiology kits, digital traceability, reporting and coordination between field teams, laboratories and water operators.',
      es: 'Soluciones para análisis de agua municipal: colífagos somáticos, kits microbiológicos, trazabilidad digital, reporting y coordinación entre campo, laboratorio y operador.',
      fr: "Solutions pour l’analyse de l’eau municipale : coliphages somatiques, kits de microbiologie, traçabilité numérique, rapports et coordination entre terrain, laboratoire et opérateur.",
      it: "Soluzioni per l’analisi dell’acqua municipale: colifagi somatici, kit microbiologici, tracciabilità digitale, reporting e coordinamento tra campo, laboratorio e operatore.",
      ca: "Solucions per a l’anàlisi d’aigua municipal: colífags somàtics, kits microbiològics, traçabilitat digital, informes i coordinació entre camp, laboratori i operador."
    },
    eyebrows: {
      en: 'Municipal water · Microbiological control · Traceable reporting',
      es: 'Agua municipal · Control microbiológico · Reporting trazable',
      fr: 'Eau municipale · Contrôle microbiologique · Reporting traçable',
      it: 'Acqua municipale · Controllo microbiologico · Reporting tracciabile',
      ca: 'Aigua municipal · Control microbiològic · Reporting traçable'
    },
    sections: {
      en: [
        section('Municipal water needs more than isolated results', 'When information lives in spreadsheets, emails, paper forms and disconnected systems, every incident takes longer to investigate. AquaVerify turns the control programme into a traceable chain from sampling point to action.', ['Variable source risk: Heavy rainfall, flow changes, agricultural pressure, discharges or climate events can alter microbiological load before water reaches treatment.', 'Field-lab coordination: One programme may involve sampling crews, public laboratories, external operators, municipal leadership and health authorities.', 'Evidence during deviations: Response requires history, batch, operator, date, time, location, method and documented corrective actions.', 'Institutional transparency: Public stakeholders need clear data, consistent reports and defensible traceability.']),
        section('An operational layer for municipal water analysis programmes', 'AquaVerify combines water microbiology products, digital workflows and technical reporting so every municipal sample can be planned, executed, reviewed and documented easily.', ['Sampling planning: Define points, matrices, frequency, owner, criticality, analysis type and reporting requirements by supply zone.', 'Digital chain of custody: Record location, date, time, operator, sample conditions, kit batch, status and evidence from field or laboratory.', 'Water microbiology: Integrate workflows for somatic coliphages, presence/absence, enumeration, ready-to-use media and technical reading.', 'Reports and follow-up: Generate technical reports, point history, sample traceability, internal alerts and documentation for review or audit.']),
        section('From sampling point to operational decision', 'The goal is not just to obtain a result. The goal is for every result to arrive with enough context to decide, communicate and act.', ['01. Control plan: Sources, treatment plant, tanks, network, sensitive points and sampling frequency.', '02. Registered sample: Location, owner, matrix, time, batch, conditions and transport status.', '03. Microbiological analysis: Kits, media and laboratory workflows connected to the unique sample identifier.', '04. Technical review: Reading, evidence, validation, technical note and comparison with historical data.', '05. Traceable report: Result, operational interpretation, attachments, history and stakeholder deliverable.', '06. Action and follow-up: Re-sampling, investigation, treatment adjustment, communication and documented closure.']),
        section('Built for the teams that keep public water services running', 'Municipal water control is a shared workflow between public service, field operations, laboratory, treatment engineering and compliance.', ['Municipality or public utility: Service continuity, decision traceability and clear documentation for citizens, boards and authorities.', 'Water quality manager: Turn data from source, treatment, network and laboratory into coherent evidence for control and improvement.', 'Treatment engineering: Verify barriers, adjust operational decisions and understand microbiological trends before incidents.', 'Public or partner laboratory: Receive samples with context, reduce manual transcription and deliver consistent reports.', 'Public health and compliance: Access verifiable information, action traceability and documentation for investigation and communication.']),
        section('Products and modules that can be combined by programme', 'Every municipality is different: network size, source water, available laboratory, regulatory pressure, technical resources and sampling frequency. AquaVerify lets you start with the most critical workflow and scale from there.', ['ENUMERA Soma 100 mL: Quantification of somatic coliphages in 100 mL samples within water microbiology programmes. Ideal: Treated water, networks, sources and scenarios requiring agile operational response.', 'PLAQUE Soma 100 mL: Plate workflow for enumeration in 100 mL, alignable with technical laboratory references. Ideal: Treatment verification, drinking water and low-count matrices.', 'PLAQUE Soma 1 mL: Double-layer workflow for 1 mL samples or dilutions. Ideal: Surface water, wastewater, process controls or higher-load matrices.', 'INDICA Soma 100 mL: Presence/absence of somatic coliphages in 100 mL. Ideal: Critical-point screening, verification campaigns and fast decisions.', 'MSA / MSB: Ready-to-use media for coliphage microbiology workflows. Ideal: Laboratories standardising preparation, reducing variability and organising consumables.', 'AquaVerify App & Cloud: Registration of samples, locations, operators, batches, readings, reviews and reports. Ideal: Multi-point municipalities, operators and laboratories.', 'Technical reporting and portal: Reports, point history, action documentation and deliverables. Ideal: Coordination between municipality, operator, laboratory, consultant and authority.', 'GIS, alerts and trends: Point map, location trends, deviations, priorities and follow-up status. Ideal: Distributed networks, recurring campaigns, incident investigation and committees.']),
        section('Municipal microbiological control matrix', 'One system can organise very different needs: routine control, treatment verification, incident investigation or institutional communication.', ['Source and raw water: Variable microbiological inputs, rainfall events, fecal contamination or catchment pressure. → Source-by-source programme, seasonal history, somatic coliphages and deviation alerts.', 'Treatment plant and barriers: Uncertainty about treatment performance, load changes or need for operational evidence. → Before/after samples, barrier comparison, technical report and action follow-up.', 'Tanks and distribution network: Loss of visibility between treatment and end user, sensitive points or local incidents. → Distributed sampling, point map, zone traceability and historical evolution.', 'Municipal or partner laboratory: Samples with incomplete context, manual reports and difficulty linking field data with results. → Chain of custody, technical review, CoA/report and query portal.', 'Incident or deviation: Time pressure, need for re-sampling, corrective actions and communication. → Investigation workflow, tasks, evidence, new results and documented closure.']),
        section('Maturity roadmap for municipal water control', 'AquaVerify lets you start with basic traceability and move towards a connected, measurable programme focused on preventive risk management.', ['1. Map: Inventory points, matrices, owners and actual sampling frequency.', '2. Digitise: Remove scattered records and connect sample, operator, location and method.', '3. Standardise: Unify kits, media, reading criteria, technical review and reports.', '4. Visualise: Analyse trends by source, treatment, tank, network and critical point.', '5. Prevent: Prioritise actions, investigate deviations and document continuous improvement.']),
        section('Aligned with risk-based control, traceability and continuous improvement', 'AquaVerify is designed to support drinking-water control programmes, water safety plans and laboratory workflows that require clear evidence. Requirements should be reviewed with the laboratory, operator and competent authority in each jurisdiction.'),
        section('Common use cases', 'Municipal teams can start with the most urgent control flow and extend it as sampling points, laboratories or reporting needs grow.', ['Recurring drinking-water programme: Plan, register and report periodic controls for defined points in a supply zone.', 'Treatment verification: Compare points before and after barriers to document performance and support operational decisions.', 'Network and sensitive-point control: Prioritise tanks, network ends, critical buildings or zones with deviation history.', 'Incident response: Record investigation, re-sampling, corrective actions, internal communication and closure.', 'Laboratory coordination: Connect sample, method, reading, validation and report without losing field context.', 'Committee and audit reporting: Turn scattered results into consistent reports with history and traceability.'])
      ],
      es: [
        section('El agua municipal exige más que resultados aislados', 'Cuando la información vive en hojas de cálculo, correos, formularios en papel y sistemas desconectados, cada incidencia tarda más en investigarse. AquaVerify convierte el programa de control en una cadena trazable desde punto de muestreo hasta acción.', ['Riesgo variable en captaciones: Lluvias intensas, cambios de caudal, presión agrícola, vertidos o eventos climáticos pueden alterar la carga microbiológica antes de que llegue a tratamiento.', 'Coordinación campo-laboratorio: Un mismo programa puede implicar brigadas de muestreo, laboratorio público, operador externo, responsable municipal y autoridad sanitaria.', 'Evidencia ante desviaciones: La respuesta necesita histórico, lote, operador, fecha, hora, ubicación, método aplicado y acciones correctoras documentadas.', 'Transparencia institucional: Los responsables públicos necesitan comunicar decisiones con datos claros, informes consistentes y trazabilidad defendible.']),
        section('Una capa operativa para programas municipales de análisis de agua', 'AquaVerify combina productos de microbiología del agua, flujos digitales y reporting técnico para que cada muestra municipal sea fácil de planificar, ejecutar, revisar y documentar.', ['Planificación de muestreo: Define puntos, matrices, frecuencia, responsable, criticidad, tipo de análisis y requisitos de reporting por zona de abastecimiento.', 'Cadena de custodia digital: Registra ubicación, fecha, hora, operador, condiciones de muestra, lote de kit, estado y evidencias desde campo o laboratorio.', 'Microbiología del agua: Integra flujos para colífagos somáticos, presencia/ausencia, enumeración, medios listos para usar y lectura técnica.', 'Informes y seguimiento: Genera informes técnicos, histórico por punto, trazabilidad por muestra, alertas internas y documentación para revisión o auditoría.']),
        section('De punto de muestreo a decisión operativa', 'El objetivo no es solo obtener un resultado. El objetivo es que cada resultado llegue con contexto suficiente para decidir, comunicar y actuar.', ['01. Plan de control: Puntos de captación, ETAP, depósitos, red, puntos sensibles y frecuencia de muestreo.', '02. Muestra registrada: Ubicación, responsable, matriz, hora, lote, condiciones y estado de transporte.', '03. Análisis microbiológico: Kits, medios y flujos de laboratorio conectados al identificador único de muestra.', '04. Revisión técnica: Lectura, evidencias, validación, comentario técnico y comparación con histórico.', '05. Informe trazable: Resultado, interpretación operativa, adjuntos, historial y entregable para stakeholders.', '06. Acción y seguimiento: Re-muestreo, investigación, ajuste de tratamiento, comunicación y cierre documentado.']),
        section('Diseñado para los equipos que sostienen el servicio público de agua', 'El control municipal del agua es un flujo compartido entre servicio público, campo, laboratorio, ingeniería de tratamiento y compliance.', ['Municipio o empresa pública: Continuidad del servicio, trazabilidad de decisiones y documentación clara para ciudadanos, juntas de gobierno y autoridades.', 'Responsable de calidad del agua: Convertir datos de captación, tratamiento, red y laboratorio en evidencia coherente para control y mejora.', 'Ingeniería de tratamiento: Verificar barreras, ajustar decisiones operativas y entender tendencias microbiológicas antes de incidencias.', 'Laboratorio público o partner: Recibir muestras con contexto, reducir transcripción manual y entregar informes consistentes.', 'Salud pública y compliance: Acceso a información verificable, trazabilidad de acciones y documentación para investigación y comunicación.']),
        section('Productos y módulos que pueden combinarse según el programa', 'Cada municipio tiene una realidad distinta: tamaño de red, fuente de agua, laboratorio disponible, presión regulatoria, recursos técnicos y frecuencia de muestreo. AquaVerify permite empezar por el flujo más crítico y escalar después.', ['ENUMERA Soma 100 mL: Cuantificación de colífagos somáticos en muestras de 100 mL dentro de programas microbiológicos de agua. Ideal: Agua tratada, red, captaciones y escenarios con necesidad de respuesta operativa ágil.', 'PLAQUE Soma 100 mL: Flujo de placa para enumeración en 100 mL, alineable con referencias técnicas de laboratorio. Ideal: Verificación de tratamiento, agua de consumo y matrices con bajo recuento esperado.', 'PLAQUE Soma 1 mL: Doble capa para muestras o diluciones de 1 mL. Ideal: Aguas superficiales, residuales, controles de proceso o matrices con carga esperada superior.', 'INDICA Soma 100 mL: Presencia/ausencia de colífagos somáticos en 100 mL. Ideal: Screening de puntos críticos, campañas de verificación y apoyo a decisiones rápidas.', 'MSA / MSB: Medios listos para flujos microbiológicos de colífagos. Ideal: Laboratorios que quieren estandarizar preparación, reducir variabilidad y ordenar consumibles.', 'AquaVerify App & Cloud: Registro de muestras, ubicaciones, operadores, lotes, lecturas, revisiones e informes. Ideal: Municipios, operadores y laboratorios con múltiples puntos de muestreo o equipos distribuidos.', 'Reporting técnico y portal: Informes, histórico por punto, documentación de acciones y entregables para responsables internos o externos. Ideal: Coordinación entre ayuntamiento, operador, laboratorio, consultor y autoridad competente.', 'GIS, alertas y tendencias: Mapa de puntos, evolución por ubicación, desviaciones, prioridades y estado del seguimiento. Ideal: Redes distribuidas, campañas recurrentes, investigación de incidencias y comités de seguimiento.']),
        section('Matriz municipal de control microbiológico', 'Un mismo sistema puede organizar necesidades muy diferentes: control rutinario, verificación de tratamiento, investigación de incidencia o comunicación institucional.', ['Captación y agua bruta: Entradas microbiológicas variables, eventos de lluvia, contaminación fecal o presión de cuenca. → Programa por fuente, histórico por temporada, colífagos somáticos y alertas por desviación.', 'ETAP y barreras de tratamiento: Dudas sobre eficacia de tratamiento, cambios de carga o necesidad de evidencia operativa. → Muestras antes/después, comparación por barrera, informe técnico y seguimiento de acciones.', 'Depósitos y red de distribución: Pérdida de visibilidad entre tratamiento y usuario final, puntos sensibles o incidencias locales. → Muestreo distribuido, mapa de puntos, trazabilidad por zona y evolución histórica.', 'Laboratorio municipal o partner: Muestras con contexto incompleto, informes manuales y dificultad para unir campo con resultado. → Cadena de custodia, revisión técnica, CoA/informe y portal de consulta.', 'Incidencia o desviación: Presión de tiempo, necesidad de re-muestreo, acciones correctoras y comunicación. → Flujo de investigación, tareas, evidencias, nuevos resultados y cierre documentado.']),
        section('Roadmap de madurez para el control hídrico municipal', 'AquaVerify permite empezar con trazabilidad básica y avanzar hacia un programa conectado, medible y orientado a gestión preventiva del riesgo.', ['1. Mapear: Inventariar puntos, matrices, responsables y frecuencia real de muestreo.', '2. Digitalizar: Eliminar registros dispersos y conectar muestra, operador, ubicación y método.', '3. Estandarizar: Unificar kits, medios, criterios de lectura, revisión técnica e informes.', '4. Visualizar: Analizar tendencias por fuente, tratamiento, depósito, red y punto crítico.', '5. Prevenir: Priorizar acciones, investigar desviaciones y documentar mejoras continuas.']),
        section('Alineado con un enfoque de riesgo, trazabilidad y mejora continua', 'AquaVerify está pensado para apoyar programas de control del agua de consumo, planes sanitarios del agua y flujos de laboratorio que necesitan evidencia clara. La aplicación concreta de requisitos debe revisarse con el laboratorio, el operador y la autoridad competente de cada jurisdicción.'),
        section('Casos de uso frecuentes', 'Los equipos municipales pueden empezar por el flujo de control más urgente y ampliarlo cuando crezcan puntos, laboratorios o necesidades de reporting.', ['Programa recurrente de agua de consumo: Planificar, registrar y reportar controles periódicos de puntos definidos en una zona de abastecimiento.', 'Verificación de tratamiento: Comparar puntos antes y después de barreras para documentar eficacia y apoyar decisiones operativas.', 'Control de red y puntos sensibles: Priorizar depósitos, finales de red, edificios críticos o zonas con historial de desviaciones.', 'Respuesta ante incidencia: Registrar investigación, re-muestreo, acciones correctoras, comunicación interna y cierre.', 'Coordinación con laboratorio: Conectar muestra, método, lectura, validación e informe sin perder contexto de campo.', 'Reporting para comités y auditorías: Transformar resultados dispersos en informes consistentes con histórico y trazabilidad.'])
      ],
      fr: [
        section("L’eau municipale exige plus que des résultats isolés", "Quand l’information vit dans des tableurs, emails, formulaires papier et systèmes déconnectés, chaque incident prend plus de temps à investiguer. AquaVerify transforme le programme de contrôle en chaîne traçable du point de prélèvement à l’action.", ['Risque variable au captage : Pluies intenses, variations de débit, pression agricole, rejets ou événements climatiques peuvent modifier la charge microbiologique avant le traitement.', 'Coordination terrain-laboratoire : Un même programme peut impliquer équipes de prélèvement, laboratoire public, opérateur externe, responsable municipal et autorité sanitaire.', 'Preuves en cas d’écart : La réponse exige historique, lot, opérateur, date, heure, lieu, méthode appliquée et actions correctives documentées.', 'Transparence institutionnelle : Les responsables publics doivent communiquer les décisions avec des données claires, des rapports cohérents et une traçabilité défendable.']),
        section("Une couche opérationnelle pour les programmes municipaux d’analyse de l’eau", "AquaVerify associe produits de microbiologie de l’eau, flux numériques et reporting technique afin que chaque échantillon municipal puisse être planifié, exécuté, revu et documenté facilement.", ['Planification des prélèvements : Définir points, matrices, fréquence, responsable, criticité, type d’analyse et exigences de reporting par zone de distribution.', 'Chaîne de traçabilité numérique : Enregistrer lieu, date, heure, opérateur, conditions de l’échantillon, lot de kit, statut et preuves depuis le terrain ou le laboratoire.', 'Microbiologie de l’eau : Intégrer les flux pour coliphages somatiques, présence/absence, dénombrement, milieux prêts à l’emploi et lecture technique.', 'Rapports et suivi : Générer rapports techniques, historique par point, traçabilité par échantillon, alertes internes et documentation pour revue ou audit.']),
        section('Du point de prélèvement à la décision opérationnelle', 'L’objectif n’est pas seulement d’obtenir un résultat. L’objectif est que chaque résultat arrive avec le contexte nécessaire pour décider, communiquer et agir.', ['01. Plan de contrôle : Captages, usine de traitement, réservoirs, réseau, points sensibles et fréquence de prélèvement.', '02. Échantillon enregistré : Lieu, responsable, matrice, heure, lot, conditions et état du transport.', '03. Analyse microbiologique : Kits, milieux et flux de laboratoire reliés à l’identifiant unique de l’échantillon.', '04. Revue technique : Lecture, preuves, validation, commentaire technique et comparaison avec l’historique.', '05. Rapport traçable : Résultat, interprétation opérationnelle, pièces jointes, historique et livrable pour parties prenantes.', '06. Action et suivi : Nouveau prélèvement, investigation, ajustement du traitement, communication et clôture documentée.']),
        section("Conçu pour les équipes qui assurent le service public de l’eau", "Le contrôle municipal de l’eau est un flux partagé entre service public, terrain, laboratoire, ingénierie de traitement et conformité.", ['Collectivité ou entreprise publique : Continuité du service, traçabilité des décisions et documentation claire pour citoyens, instances et autorités.', 'Responsable qualité de l’eau : Transformer les données de captage, traitement, réseau et laboratoire en preuves cohérentes.', 'Ingénierie de traitement : Vérifier les barrières, ajuster les décisions opérationnelles et comprendre les tendances microbiologiques.', 'Laboratoire public ou partenaire : Recevoir des échantillons contextualisés, réduire la saisie manuelle et livrer des rapports cohérents.', 'Santé publique et conformité : Accès à des informations vérifiables, traçabilité des actions et documentation pour investigation et communication.']),
        section('Produits et modules combinables selon le programme', 'Chaque collectivité a une réalité différente : taille du réseau, source d’eau, laboratoire disponible, pression réglementaire, ressources techniques et fréquence de prélèvement. AquaVerify permet de commencer par le flux le plus critique puis d’évoluer.', ['ENUMERA Soma 100 mL : Quantification des coliphages somatiques dans des échantillons de 100 mL dans les programmes de microbiologie de l’eau. Idéal : Eau traitée, réseau, captages et réponse opérationnelle agile.', 'PLAQUE Soma 100 mL : Flux de plaque pour dénombrement en 100 mL, alignable avec des références techniques de laboratoire. Idéal : Vérification du traitement, eau de consommation et faibles dénombrements attendus.', 'PLAQUE Soma 1 mL : Double couche pour échantillons ou dilutions de 1 mL. Idéal : Eaux de surface, eaux usées, contrôles de procédé ou matrices à charge plus élevée.', 'INDICA Soma 100 mL : Présence/absence de coliphages somatiques dans 100 mL. Idéal : Screening de points critiques, campagnes de vérification et décision rapide.', 'MSA / MSB : Milieux prêts à l’emploi pour les flux microbiologiques de coliphages. Idéal : Laboratoires souhaitant standardiser la préparation et réduire la variabilité.', 'AquaVerify App & Cloud : Enregistrement des échantillons, lieux, opérateurs, lots, lectures, revues et rapports. Idéal : Collectivités, opérateurs et laboratoires multi-points.', 'Reporting technique et portail : Rapports, historique par point, documentation des actions et livrables. Idéal : Coordination collectivité, opérateur, laboratoire, consultant et autorité.', 'SIG, alertes et tendances : Carte des points, évolution par lieu, écarts, priorités et état du suivi. Idéal : Réseaux distribués, campagnes récurrentes et investigation d’incidents.']),
        section('Matrice municipale de contrôle microbiologique', 'Un même système peut organiser des besoins très différents : contrôle de routine, vérification du traitement, investigation d’incident ou communication institutionnelle.', ['Captage et eau brute : Entrées microbiologiques variables, épisodes pluvieux, contamination fécale ou pression du bassin versant. → Programme par source, historique saisonnier, coliphages somatiques et alertes d’écart.', 'Usine de traitement et barrières : Doute sur l’efficacité du traitement, variations de charge ou besoin de preuves opérationnelles. → Échantillons avant/après, comparaison par barrière, rapport technique et suivi des actions.', 'Réservoirs et réseau de distribution : Perte de visibilité entre traitement et usager final, points sensibles ou incidents locaux. → Prélèvements distribués, carte des points, traçabilité par zone et évolution historique.', 'Laboratoire municipal ou partenaire : Échantillons avec contexte incomplet, rapports manuels et difficulté à relier terrain et résultat. → Chaîne de traçabilité, revue technique, CoA/rapport et portail de consultation.', 'Incident ou écart : Pression temporelle, besoin de nouveau prélèvement, actions correctives et communication. → Flux d’investigation, tâches, preuves, nouveaux résultats et clôture documentée.']),
        section('Feuille de route de maturité pour le contrôle hydrique municipal', 'AquaVerify permet de commencer par une traçabilité de base et d’évoluer vers un programme connecté, mesurable et orienté vers la gestion préventive des risques.', ['1. Cartographier : Inventorier points, matrices, responsables et fréquence réelle de prélèvement.', '2. Numériser : Supprimer les registres dispersés et relier échantillon, opérateur, lieu et méthode.', '3. Standardiser : Unifier kits, milieux, critères de lecture, revue technique et rapports.', '4. Visualiser : Analyser les tendances par source, traitement, réservoir, réseau et point critique.', '5. Prévenir : Prioriser les actions, investiguer les écarts et documenter l’amélioration continue.']),
        section('Aligné sur une approche par les risques, la traçabilité et l’amélioration continue', 'AquaVerify est conçu pour soutenir les programmes de contrôle de l’eau de consommation, les plans de sécurité de l’eau et les flux de laboratoire nécessitant des preuves claires.'),
        section('Cas d’usage fréquents', 'Les équipes municipales peuvent commencer par le flux le plus urgent et l’étendre quand les points, laboratoires ou besoins de reporting augmentent.', ['Programme récurrent d’eau de consommation : Planifier, enregistrer et reporter les contrôles périodiques des points définis.', 'Vérification du traitement : Comparer les points avant et après barrières pour documenter la performance.', 'Contrôle du réseau et des points sensibles : Prioriser réservoirs, fins de réseau, bâtiments critiques ou zones avec historique.', 'Réponse à incident : Enregistrer investigation, nouveau prélèvement, actions correctives, communication interne et clôture.', 'Coordination laboratoire : Relier échantillon, méthode, lecture, validation et rapport sans perdre le contexte terrain.', 'Reporting pour comités et audits : Transformer des résultats dispersés en rapports cohérents avec historique et traçabilité.'])
      ],
      it: [
        section("L’acqua municipale richiede più di risultati isolati", "Quando le informazioni vivono in fogli di calcolo, email, moduli cartacei e sistemi disconnessi, ogni incidente richiede più tempo per essere investigato. AquaVerify trasforma il programma di controllo in una catena tracciabile dal punto di campionamento all’azione.", ['Rischio variabile in captazione: Piogge intense, variazioni di portata, pressione agricola, scarichi o eventi climatici possono modificare il carico microbiologico prima del trattamento.', 'Coordinamento campo-laboratorio: Un programma può coinvolgere squadre di campionamento, laboratorio pubblico, operatore esterno, referente comunale e autorità sanitaria.', 'Evidenze in caso di deviazione: La risposta richiede storico, lotto, operatore, data, ora, luogo, metodo applicato e azioni correttive documentate.', 'Trasparenza istituzionale: I responsabili pubblici devono comunicare decisioni con dati chiari, rapporti coerenti e tracciabilità difendibile.']),
        section("Uno strato operativo per i programmi municipali di analisi dell’acqua", "AquaVerify combina prodotti di microbiologia dell’acqua, flussi digitali e reporting tecnico affinché ogni campione municipale sia facile da pianificare, eseguire, rivedere e documentare.", ['Pianificazione del campionamento: Definire punti, matrici, frequenza, responsabile, criticità, tipo di analisi e requisiti di reporting per zona di approvvigionamento.', 'Catena di custodia digitale: Registrare luogo, data, ora, operatore, condizioni del campione, lotto del kit, stato ed evidenze dal campo o dal laboratorio.', 'Microbiologia dell’acqua: Integrare flussi per colifagi somatici, presenza/assenza, enumerazione, terreni pronti all’uso e lettura tecnica.', 'Rapporti e follow-up: Generare rapporti tecnici, storico per punto, tracciabilità per campione, alert interni e documentazione per revisione o audit.']),
        section('Dal punto di campionamento alla decisione operativa', 'L’obiettivo non è solo ottenere un risultato. L’obiettivo è che ogni risultato arrivi con il contesto sufficiente per decidere, comunicare e agire.', ['01. Piano di controllo: Captazioni, impianto di trattamento, serbatoi, rete, punti sensibili e frequenza di campionamento.', '02. Campione registrato: Luogo, responsabile, matrice, ora, lotto, condizioni e stato del trasporto.', '03. Analisi microbiologica: Kit, terreni e flussi di laboratorio collegati all’identificativo univoco del campione.', '04. Revisione tecnica: Lettura, evidenze, validazione, nota tecnica e confronto con lo storico.', '05. Rapporto tracciabile: Risultato, interpretazione operativa, allegati, storico e deliverable per gli stakeholder.', '06. Azione e follow-up: Nuovo campionamento, investigazione, adeguamento del trattamento, comunicazione e chiusura documentata.']),
        section("Pensato per i team che garantiscono il servizio pubblico dell’acqua", "Il controllo municipale dell’acqua è un flusso condiviso tra servizio pubblico, campo, laboratorio, ingegneria di trattamento e compliance.", ['Comune o azienda pubblica: Continuità del servizio, tracciabilità delle decisioni e documentazione chiara per cittadini, organi decisionali e autorità.', 'Responsabile qualità dell’acqua: Trasformare dati da captazione, trattamento, rete e laboratorio in evidenze coerenti.', 'Ingegneria di trattamento: Verificare barriere, regolare decisioni operative e comprendere tendenze microbiologiche.', 'Laboratorio pubblico o partner: Ricevere campioni con contesto, ridurre trascrizione manuale e consegnare rapporti coerenti.', 'Sanità pubblica e compliance: Informazioni verificabili, tracciabilità delle azioni e documentazione per investigazione e comunicazione.']),
        section('Prodotti e moduli combinabili in base al programma', 'Ogni comune ha una realtà diversa: dimensione della rete, fonte d’acqua, laboratorio disponibile, pressione normativa, risorse tecniche e frequenza di campionamento. AquaVerify consente di iniziare dal flusso più critico e poi scalare.', ['ENUMERA Soma 100 mL: Quantificazione dei colifagi somatici in campioni da 100 mL nei programmi di microbiologia dell’acqua. Ideale: Acqua trattata, rete, captazioni e risposta operativa agile.', 'PLAQUE Soma 100 mL: Flusso su piastra per enumerazione in 100 mL, allineabile a riferimenti tecnici di laboratorio. Ideale: Verifica del trattamento, acqua potabile e conteggi attesi bassi.', 'PLAQUE Soma 1 mL: Doppio strato per campioni o diluizioni da 1 mL. Ideale: Acque superficiali, reflue, controlli di processo o matrici con carico superiore.', 'INDICA Soma 100 mL: Presenza/assenza di colifagi somatici in 100 mL. Ideale: Screening di punti critici, campagne di verifica e decisioni rapide.', 'MSA / MSB: Terreni pronti all’uso per flussi microbiologici di colifagi. Ideale: Laboratori che vogliono standardizzare preparazione e ridurre variabilità.', 'AquaVerify App & Cloud: Registrazione di campioni, luoghi, operatori, lotti, letture, revisioni e rapporti. Ideale: Comuni, gestori e laboratori multi-punto.', 'Reporting tecnico e portale: Rapporti, storico per punto, documentazione delle azioni e deliverable. Ideale: Coordinamento tra comune, gestore, laboratorio, consulente e autorità.', 'GIS, alert e trend: Mappa dei punti, evoluzione per luogo, deviazioni, priorità e stato del follow-up. Ideale: Reti distribuite, campagne ricorrenti e investigazione di incidenti.']),
        section('Matrice municipale di controllo microbiologico', 'Un unico sistema può organizzare esigenze molto diverse: controllo di routine, verifica del trattamento, investigazione di incidenti o comunicazione istituzionale.', ['Captazione e acqua grezza: Ingressi microbiologici variabili, eventi di pioggia, contaminazione fecale o pressione del bacino. → Programma per fonte, storico stagionale, colifagi somatici e alert di deviazione.', 'Impianto e barriere di trattamento: Dubbi sull’efficacia del trattamento, variazioni di carico o necessità di evidenze operative. → Campioni prima/dopo, confronto per barriera, rapporto tecnico e follow-up delle azioni.', 'Serbatoi e rete di distribuzione: Perdita di visibilità tra trattamento e utente finale, punti sensibili o incidenti locali. → Campionamento distribuito, mappa dei punti, tracciabilità per zona ed evoluzione storica.', 'Laboratorio municipale o partner: Campioni con contesto incompleto, rapporti manuali e difficoltà a collegare campo e risultato. → Catena di custodia, revisione tecnica, CoA/rapporto e portale di consultazione.', 'Incidente o deviazione: Pressione sui tempi, necessità di nuovo campionamento, azioni correttive e comunicazione. → Flusso di investigazione, attività, evidenze, nuovi risultati e chiusura documentata.']),
        section('Roadmap di maturità per il controllo idrico municipale', 'AquaVerify permette di iniziare con la tracciabilità di base e avanzare verso un programma connesso, misurabile e orientato alla gestione preventiva del rischio.', ['1. Mappare: Inventariare punti, matrici, responsabili e frequenza reale di campionamento.', '2. Digitalizzare: Eliminare registri dispersi e collegare campione, operatore, luogo e metodo.', '3. Standardizzare: Unificare kit, terreni, criteri di lettura, revisione tecnica e rapporti.', '4. Visualizzare: Analizzare trend per fonte, trattamento, serbatoio, rete e punto critico.', '5. Prevenire: Prioritizzare azioni, investigare deviazioni e documentare il miglioramento continuo.']),
        section('Allineato a un approccio basato sul rischio, sulla tracciabilità e sul miglioramento continuo', 'AquaVerify è pensato per supportare programmi di controllo dell’acqua potabile, piani di sicurezza dell’acqua e flussi di laboratorio che richiedono evidenze chiare.'),
        section('Casi d’uso frequenti', 'I team municipali possono iniziare dal flusso più urgente e ampliarlo quando crescono punti, laboratori o necessità di reporting.', ['Programma ricorrente di acqua potabile: Pianificare, registrare e riportare controlli periodici dei punti definiti.', 'Verifica del trattamento: Confrontare punti prima e dopo le barriere per documentare le prestazioni.', 'Controllo rete e punti sensibili: Prioritizzare serbatoi, estremità di rete, edifici critici o zone con storico.', 'Risposta a incidente: Registrare investigazione, nuovo campionamento, azioni correttive, comunicazione interna e chiusura.', 'Coordinamento laboratorio: Collegare campione, metodo, lettura, validazione e rapporto senza perdere contesto di campo.', 'Reporting per comitati e audit: Trasformare risultati dispersi in rapporti coerenti con storico e tracciabilità.'])
      ],
      ca: [
        section("L’aigua municipal exigeix més que resultats aïllats", "Quan la informació viu en fulls de càlcul, correus, formularis en paper i sistemes desconnectats, cada incidència triga més a investigar-se. AquaVerify converteix el programa de control en una cadena traçable des del punt de mostreig fins a l’acció.", ['Risc variable a les captacions: Pluges intenses, canvis de cabal, pressió agrícola, abocaments o episodis climàtics poden alterar la càrrega microbiològica abans del tractament.', 'Coordinació camp-laboratori: Un mateix programa pot implicar equips de mostreig, laboratori públic, operador extern, responsable municipal i autoritat sanitària.', 'Evidència davant desviacions: La resposta necessita històric, lot, operador, data, hora, ubicació, mètode aplicat i accions correctores documentades.', 'Transparència institucional: Els responsables públics han de comunicar decisions amb dades clares, informes consistents i traçabilitat defensable.']),
        section("Una capa operativa per a programes municipals d’anàlisi d’aigua", "AquaVerify combina productes de microbiologia de l’aigua, fluxos digitals i informes tècnics perquè cada mostra municipal sigui fàcil de planificar, executar, revisar i documentar.", ['Planificació del mostreig: Defineix punts, matrius, freqüència, responsable, criticitat, tipus d’anàlisi i requisits d’informe per zona d’abastament.', 'Cadena de custòdia digital: Registra ubicació, data, hora, operador, condicions de la mostra, lot del kit, estat i evidències des del camp o laboratori.', 'Microbiologia de l’aigua: Integra fluxos per a colífags somàtics, presència/absència, enumeració, medis llestos per usar i lectura tècnica.', 'Informes i seguiment: Genera informes tècnics, històric per punt, traçabilitat per mostra, alertes internes i documentació per a revisió o auditoria.']),
        section('Del punt de mostreig a la decisió operativa', 'L’objectiu no és només obtenir un resultat. L’objectiu és que cada resultat arribi amb prou context per decidir, comunicar i actuar.', ['01. Pla de control: Captacions, ETAP, dipòsits, xarxa, punts sensibles i freqüència de mostreig.', '02. Mostra registrada: Ubicació, responsable, matriu, hora, lot, condicions i estat del transport.', '03. Anàlisi microbiològica: Kits, medis i fluxos de laboratori connectats a l’identificador únic de mostra.', '04. Revisió tècnica: Lectura, evidències, validació, comentari tècnic i comparació amb l’històric.', '05. Informe traçable: Resultat, interpretació operativa, adjunts, històric i lliurable per a stakeholders.', '06. Acció i seguiment: Nou mostreig, investigació, ajust del tractament, comunicació i tancament documentat.']),
        section("Dissenyat per als equips que sostenen el servei públic d’aigua", "El control municipal de l’aigua és un flux compartit entre servei públic, camp, laboratori, enginyeria de tractament i compliance.", ['Ajuntament o empresa pública: Continuïtat del servei, traçabilitat de decisions i documentació clara per a ciutadania, òrgans de govern i autoritats.', 'Responsable de qualitat de l’aigua: Convertir dades de captació, tractament, xarxa i laboratori en evidència coherent.', 'Enginyeria de tractament: Verificar barreres, ajustar decisions operatives i entendre tendències microbiològiques.', 'Laboratori públic o partner: Rebre mostres amb context, reduir transcripció manual i entregar informes consistents.', 'Salut pública i compliance: Informació verificable, traçabilitat d’accions i documentació per a investigació i comunicació.']),
        section('Productes i mòduls combinables segons el programa', 'Cada municipi té una realitat diferent: mida de xarxa, font d’aigua, laboratori disponible, pressió reguladora, recursos tècnics i freqüència de mostreig. AquaVerify permet començar pel flux més crític i escalar després.', ['ENUMERA Soma 100 mL: Quantificació de colífags somàtics en mostres de 100 mL dins de programes microbiològics d’aigua. Ideal per a: Aigua tractada, xarxa, captacions i resposta operativa àgil.', 'PLAQUE Soma 100 mL: Flux de placa per a enumeració en 100 mL, alineable amb referències tècniques de laboratori. Ideal per a: Verificació de tractament, aigua de consum i recomptes baixos esperats.', 'PLAQUE Soma 1 mL: Doble capa per a mostres o dilucions d’1 mL. Ideal per a: Aigües superficials, residuals, controls de procés o matrius amb càrrega superior.', 'INDICA Soma 100 mL: Presència/absència de colífags somàtics en 100 mL. Ideal per a: Cribratge de punts crítics, campanyes de verificació i decisions ràpides.', 'MSA / MSB: Medis llestos per a fluxos microbiològics de colífags. Ideal per a: Laboratoris que volen estandarditzar preparació i reduir variabilitat.', 'AquaVerify App & Cloud: Registre de mostres, ubicacions, operadors, lots, lectures, revisions i informes. Ideal per a: Municipis, operadors i laboratoris multi-punt.', 'Reporting tècnic i portal: Informes, històric per punt, documentació d’accions i lliurables. Ideal per a: Coordinació entre ajuntament, operador, laboratori, consultor i autoritat.', 'GIS, alertes i tendències: Mapa de punts, evolució per ubicació, desviacions, prioritats i estat del seguiment. Ideal per a: Xarxes distribuïdes, campanyes recurrents i investigació d’incidències.']),
        section('Matriu municipal de control microbiològic', 'Un mateix sistema pot organitzar necessitats molt diferents: control rutinari, verificació de tractament, investigació d’incidència o comunicació institucional.', ['Captació i aigua bruta: Entrades microbiològiques variables, episodis de pluja, contaminació fecal o pressió de conca. → Programa per font, històric per temporada, colífags somàtics i alertes per desviació.', 'ETAP i barreres de tractament: Dubtes sobre eficàcia del tractament, canvis de càrrega o necessitat d’evidència operativa. → Mostres abans/després, comparació per barrera, informe tècnic i seguiment d’accions.', 'Dipòsits i xarxa de distribució: Pèrdua de visibilitat entre tractament i usuari final, punts sensibles o incidències locals. → Mostreig distribuït, mapa de punts, traçabilitat per zona i evolució històrica.', 'Laboratori municipal o partner: Mostres amb context incomplet, informes manuals i dificultat per unir camp amb resultat. → Cadena de custòdia, revisió tècnica, CoA/informe i portal de consulta.', 'Incidència o desviació: Pressió de temps, necessitat de nou mostreig, accions correctores i comunicació. → Flux d’investigació, tasques, evidències, nous resultats i tancament documentat.']),
        section('Full de ruta de maduresa per al control hídric municipal', 'AquaVerify permet començar amb traçabilitat bàsica i avançar cap a un programa connectat, mesurable i orientat a la gestió preventiva del risc.', ['1. Mapar: Inventariar punts, matrius, responsables i freqüència real de mostreig.', '2. Digitalitzar: Eliminar registres dispersos i connectar mostra, operador, ubicació i mètode.', '3. Estandarditzar: Unificar kits, medis, criteris de lectura, revisió tècnica i informes.', '4. Visualitzar: Analitzar tendències per font, tractament, dipòsit, xarxa i punt crític.', '5. Prevenir: Prioritzar accions, investigar desviacions i documentar millora contínua.']),
        section('Alineat amb un enfocament de risc, traçabilitat i millora contínua', 'AquaVerify està pensat per donar suport a programes de control de l’aigua de consum, plans sanitaris de l’aigua i fluxos de laboratori que necessiten evidència clara.'),
        section('Casos d’ús freqüents', 'Els equips municipals poden començar pel flux més urgent i ampliar-lo quan creixin punts, laboratoris o necessitats de reporting.', ['Programa recurrent d’aigua de consum: Planificar, registrar i informar controls periòdics de punts definits.', 'Verificació de tractament: Comparar punts abans i després de barreres per documentar eficàcia.', 'Control de xarxa i punts sensibles: Prioritzar dipòsits, finals de xarxa, edificis crítics o zones amb historial.', 'Resposta davant incidència: Registrar investigació, nou mostreig, accions correctores, comunicació interna i tancament.', 'Coordinació amb laboratori: Connectar mostra, mètode, lectura, validació i informe sense perdre context de camp.', 'Reporting per a comitès i auditories: Transformar resultats dispersos en informes consistents amb històric i traçabilitat.'])
      ]
    },
    ctas: {
      en: ['Request municipal diagnosis', 'See how it works'],
      es: ['Solicitar diagnóstico municipal', 'Ver cómo funciona'],
      fr: ['Demander diagnostic municipal', 'Voir le fonctionnement'],
      it: ['Richiedi diagnosi municipale', 'Vedi come funziona'],
      ca: ['Sol·licitar diagnòstic municipal', 'Veure com funciona']
    },
    faqs: {
      en: [
        { question: 'Does AquaVerify replace the laboratory or health authority?', answer: 'No. AquaVerify acts as a product, digital workflow, traceability and reporting layer. Tests, validations, accreditations and regulatory decisions must be managed according to the laboratory, operator and competent authority.' },
        { question: 'Is it suitable for small municipalities?', answer: 'Yes. A small municipality can start with a simple workflow for points, samples, results and reports, then scale to more points, laboratories, users or analytics modules.' },
        { question: 'Can it work with a public or external laboratory?', answer: 'Yes. The workflow can be configured for an in-house laboratory, public laboratory, external partner or mixed model while maintaining the link between sample, sampling point, result and report.' },
        { question: 'What does it add for somatic coliphages?', answer: 'It provides products, media and digital traceability to organise programmes where somatic coliphages are part of the microbiological control or verification approach.' },
        { question: 'Does it include maps or point-level tracking?', answer: 'Yes. Sampling points can be organised by location, zone, matrix type, criticality and status, enabling historical follow-up and deviation prioritisation.' },
        { question: 'Does it support regulatory compliance?', answer: 'It helps document processes, results and actions, but compliance depends on the programme, method, laboratory, operator and applicable regulation.' },
        { question: 'How does a project start?', answer: 'The first step is to review the network, sources, critical points, sample volume, laboratory involved, current method, reporting needs and main incidents or operational frictions.' },
        { question: 'Can it integrate with existing systems?', answer: 'Yes. It can start as a standalone workflow and evolve towards integration with LIMS, internal reporting, CRM, GIS or stakeholder portals depending on the operator’s digital infrastructure.' }
      ],
      es: [
        { question: '¿AquaVerify sustituye al laboratorio o a la autoridad sanitaria?', answer: 'No. AquaVerify actúa como capa de producto, flujo digital, trazabilidad y reporting. Los ensayos, validaciones, acreditaciones y decisiones regulatorias deben gestionarse según el laboratorio, el operador y la autoridad competente.' },
        { question: '¿Sirve para municipios pequeños?', answer: 'Sí. Un municipio pequeño puede empezar con un flujo simple de puntos, muestras, resultados e informes. El sistema puede escalar después a más puntos, laboratorios, usuarios o módulos de análisis.' },
        { question: '¿Puede trabajar con un laboratorio público o externo?', answer: 'Sí. El flujo puede configurarse para laboratorio propio, laboratorio público, partner externo o esquema mixto, manteniendo el vínculo entre muestra, punto de muestreo, resultado e informe.' },
        { question: '¿Qué aporta en colífagos somáticos?', answer: 'Aporta productos, medios y trazabilidad digital para organizar programas donde los colífagos somáticos forman parte del enfoque microbiológico de control o verificación.' },
        { question: '¿Incluye mapas o seguimiento por punto?', answer: 'Sí. Puede organizar puntos de muestreo por ubicación, zona, tipo de matriz, criticidad y estado, facilitando seguimiento histórico y priorización de desviaciones.' },
        { question: '¿Ayuda con el cumplimiento normativo?', answer: 'Ayuda a documentar procesos, resultados y acciones, pero el cumplimiento depende del programa, el método, el laboratorio, el operador y la normativa aplicable.' },
        { question: '¿Cómo se inicia el proyecto?', answer: 'El primer paso es revisar la red, las fuentes, los puntos críticos, el volumen de muestras, el laboratorio implicado, el método actual, el reporting requerido y las principales incidencias o fricciones.' },
        { question: '¿Se puede integrar con sistemas existentes?', answer: 'Sí. Puede arrancar como flujo independiente y evolucionar hacia integración con LIMS, reporting interno, CRM, GIS o portal de stakeholders según la infraestructura digital del operador.' }
      ],
      fr: [
        { question: 'AquaVerify remplace-t-il le laboratoire ou l’autorité sanitaire ?', answer: 'Non. AquaVerify agit comme couche de produit, flux numérique, traçabilité et reporting. Les essais, validations, accréditations et décisions réglementaires doivent être gérés selon le laboratoire, l’opérateur et l’autorité compétente.' },
        { question: 'Convient-il aux petites communes ?', answer: 'Oui. Une petite commune peut commencer avec un flux simple de points, échantillons, résultats et rapports, puis évoluer vers davantage de points, laboratoires, utilisateurs ou modules analytiques.' },
        { question: 'Peut-il fonctionner avec un laboratoire public ou externe ?', answer: 'Oui. Le flux peut être configuré pour un laboratoire interne, public, partenaire externe ou modèle mixte, en conservant le lien entre échantillon, point de prélèvement, résultat et rapport.' },
        { question: 'Qu’apporte-t-il pour les coliphages somatiques ?', answer: 'Il apporte produits, milieux et traçabilité numérique pour organiser les programmes où les coliphages somatiques font partie de l’approche microbiologique de contrôle ou de vérification.' },
        { question: 'Inclut-il des cartes ou un suivi par point ?', answer: 'Oui. Les points de prélèvement peuvent être organisés par lieu, zone, type de matrice, criticité et statut, ce qui facilite le suivi historique et la priorisation des écarts.' },
        { question: 'Soutient-il la conformité réglementaire ?', answer: 'Il aide à documenter les processus, les résultats et les actions, mais la conformité dépend du programme, de la méthode, du laboratoire, de l’opérateur et de la réglementation applicable.' },
        { question: 'Comment démarre un projet ?', answer: 'La première étape consiste à revoir le réseau, les sources, les points critiques, le volume d’échantillons, le laboratoire impliqué, la méthode actuelle, les besoins de reporting et les principales frictions opérationnelles.' },
        { question: 'Peut-il s’intégrer aux systèmes existants ?', answer: 'Oui. Il peut démarrer comme flux indépendant et évoluer vers une intégration avec LIMS, reporting interne, CRM, SIG ou portail de parties prenantes selon l’infrastructure numérique de l’opérateur.' }
      ],
      it: [
        { question: 'AquaVerify sostituisce il laboratorio o l’autorità sanitaria?', answer: 'No. AquaVerify agisce come strato di prodotto, flusso digitale, tracciabilità e reporting. Prove, validazioni, accreditamenti e decisioni regolatorie devono essere gestiti secondo laboratorio, operatore e autorità competente.' },
        { question: 'È adatto ai piccoli comuni?', answer: 'Sì. Un piccolo comune può iniziare con un flusso semplice di punti, campioni, risultati e rapporti, poi scalare verso più punti, laboratori, utenti o moduli analitici.' },
        { question: 'Può lavorare con un laboratorio pubblico o esterno?', answer: 'Sì. Il flusso può essere configurato per laboratorio interno, pubblico, partner esterno o modello misto, mantenendo il collegamento tra campione, punto di campionamento, risultato e rapporto.' },
        { question: 'Che cosa apporta per i colifagi somatici?', answer: 'Apporta prodotti, terreni e tracciabilità digitale per organizzare programmi in cui i colifagi somatici fanno parte dell’approccio microbiologico di controllo o verifica.' },
        { question: 'Include mappe o monitoraggio per punto?', answer: 'Sì. I punti di campionamento possono essere organizzati per luogo, zona, tipo di matrice, criticità e stato, facilitando follow-up storico e prioritizzazione delle deviazioni.' },
        { question: 'Supporta la conformità normativa?', answer: 'Aiuta a documentare processi, risultati e azioni, ma la conformità dipende da programma, metodo, laboratorio, operatore e normativa applicabile.' },
        { question: 'Come inizia un progetto?', answer: 'Il primo passo è rivedere rete, fonti, punti critici, volume di campioni, laboratorio coinvolto, metodo attuale, esigenze di reporting e principali frizioni operative.' },
        { question: 'Si può integrare con sistemi esistenti?', answer: 'Sì. Può partire come flusso indipendente ed evolvere verso integrazione con LIMS, reporting interno, CRM, GIS o portali stakeholder in base all’infrastruttura digitale del gestore.' }
      ],
      ca: [
        { question: 'AquaVerify substitueix el laboratori o l’autoritat sanitària?', answer: 'No. AquaVerify actua com a capa de producte, flux digital, traçabilitat i reporting. Els assajos, validacions, acreditacions i decisions reguladores s’han de gestionar segons el laboratori, l’operador i l’autoritat competent.' },
        { question: 'Serveix per a municipis petits?', answer: 'Sí. Un municipi petit pot començar amb un flux simple de punts, mostres, resultats i informes. El sistema pot escalar després a més punts, laboratoris, usuaris o mòduls d’anàlisi.' },
        { question: 'Pot treballar amb un laboratori públic o extern?', answer: 'Sí. El flux es pot configurar per a laboratori propi, laboratori públic, partner extern o esquema mixt, mantenint el vincle entre mostra, punt de mostreig, resultat i informe.' },
        { question: 'Què aporta en colífags somàtics?', answer: 'Aporta productes, medis i traçabilitat digital per organitzar programes on els colífags somàtics formen part de l’enfocament microbiològic de control o verificació.' },
        { question: 'Inclou mapes o seguiment per punt?', answer: 'Sí. Els punts de mostreig es poden organitzar per ubicació, zona, tipus de matriu, criticitat i estat, facilitant seguiment històric i priorització de desviacions.' },
        { question: 'Ajuda amb el compliment normatiu?', answer: 'Ajuda a documentar processos, resultats i accions, però el compliment depèn del programa, el mètode, el laboratori, l’operador i la normativa aplicable.' },
        { question: 'Com s’inicia el projecte?', answer: 'El primer pas és revisar la xarxa, les fonts, els punts crítics, el volum de mostres, el laboratori implicat, el mètode actual, el reporting requerit i les principals incidències o friccions.' },
        { question: 'Es pot integrar amb sistemes existents?', answer: 'Sí. Pot arrencar com a flux independent i evolucionar cap a integració amb LIMS, reporting intern, CRM, GIS o portal de stakeholders segons la infraestructura digital de l’operador.' }
      ]
    }
  },
  {
    id: 'food-beverage-water-quality',
    paths: {
      en: '/industries/food-beverage-water-quality',
      es: '/es/industrias/calidad-agua-alimentacion-bebidas',
      fr: '/fr/industries/qualite-eau-agroalimentaire',
      it: '/it/settori/qualita-acqua-alimenti-bevande',
      ca: '/ca/sectors/qualitat-aigua-alimentacio-begudes'
    },
    titles: {
      en: 'Water quality control for food and beverage operations',
      es: 'Control de calidad del agua para alimentación y bebidas',
      fr: 'Contrôle qualité de l’eau pour l’agroalimentaire',
      it: 'Controllo qualità dell’acqua per food & beverage',
      ca: 'Control de qualitat de l’aigua per a alimentació i begudes'
    },
    descriptions: {
      en: 'Connect water quality requests, laboratory partners, microbiology products and digital reports for food and beverage quality teams.',
      es: 'Conecta solicitudes de calidad del agua, partners de laboratorio, productos de microbiología e informes digitales para equipos de alimentación y bebidas.',
      fr: 'Connectez demandes qualité eau, partenaires laboratoire, produits de microbiologie et rapports numériques pour équipes agroalimentaires.',
      it: 'Collega richieste qualità acqua, partner di laboratorio, prodotti di microbiologia e report digitali per team food & beverage.',
      ca: 'Connecta sol·licituds de qualitat de l’aigua, partners de laboratori, productes de microbiologia i informes digitals per a equips d’alimentació i begudes.'
    },
    sections: {
      en: [
        section('For operational quality teams', 'Food and beverage teams need water quality workflows that are repeatable, documented and easy to coordinate with internal or external laboratories.', ['Process water checks', 'Supplier and laboratory coordination', 'Recurring monitoring schedules', 'Digital report history']),
        section('From request to report', 'AquaVerify helps structure each request, link it to products or laboratory work and keep outcomes visible in the platform.')
      ],
      es: [
        section('Para equipos de calidad operativa', 'Los equipos de alimentación y bebidas necesitan flujos de calidad del agua repetibles, documentados y fáciles de coordinar con laboratorios internos o externos.', ['Controles de agua de proceso', 'Coordinación con proveedores y laboratorios', 'Calendarios de monitorización recurrente', 'Historial digital de informes']),
        section('De la solicitud al informe', 'AquaVerify ayuda a estructurar cada solicitud, vincularla a productos o trabajo de laboratorio y mantener los resultados visibles en la plataforma.')
      ],
      fr: [
        section('Pour équipes qualité opérationnelle', 'Les équipes agroalimentaires ont besoin de flux qualité eau répétables, documentés et faciles à coordonner avec laboratoires internes ou externes.', ['Contrôles eau de process', 'Coordination fournisseurs et laboratoires', 'Calendriers de surveillance récurrente', 'Historique numérique des rapports']),
        section('De la demande au rapport', 'AquaVerify aide à structurer chaque demande, la relier aux produits ou au travail laboratoire et garder les résultats visibles dans la plateforme.')
      ],
      it: [
        section('Per team qualità operativa', 'I team food & beverage richiedono flussi qualità acqua ripetibili, documentati e facili da coordinare con laboratori interni o esterni.', ['Controlli acqua di processo', 'Coordinamento fornitori e laboratori', 'Calendari di monitoraggio ricorrente', 'Storico digitale dei report']),
        section('Dalla richiesta al report', 'AquaVerify aiuta a strutturare ogni richiesta, collegarla a prodotti o lavoro di laboratorio e mantenere gli esiti visibili in piattaforma.')
      ],
      ca: [
        section('Per a equips de qualitat operativa', 'Els equips d’alimentació i begudes necessiten fluxos de qualitat de l’aigua repetibles, documentats i fàcils de coordinar amb laboratoris interns o externs.', ['Controls d’aigua de procés', 'Coordinació amb proveïdors i laboratoris', 'Calendaris de monitoratge recurrent', 'Historial digital d’informes']),
        section('De la sol·licitud a l’informe', 'AquaVerify ajuda a estructurar cada sol·licitud, vincular-la a productes o treball de laboratori i mantenir els resultats visibles a la plataforma.')
      ]
    },
    ctas: {
      en: ['Ask for quality workflow fit', 'View platform'],
      es: ['Pedir encaje de flujo calidad', 'Ver plataforma'],
      fr: ['Demander un cadrage qualité', 'Voir plateforme'],
      it: ['Chiedi inquadramento qualità', 'Vedi piattaforma'],
      ca: ['Demanar encaix de flux qualitat', 'Veure plataforma']
    }
  },
  {
    id: 'industrial-process-water',
    paths: {
      en: '/industries/industrial-process-water',
      es: '/es/industrias/agua-proceso-industrial',
      fr: '/fr/industries/eau-process-industriel',
      it: '/it/settori/acqua-processo-industriale',
      ca: '/ca/sectors/aigua-proces-industrial'
    },
    titles: {
      en: 'Industrial process water monitoring with digital traceability',
      es: 'Monitorización de agua de proceso industrial con trazabilidad digital',
      fr: 'Surveillance eau de process industriel avec traçabilité numérique',
      it: 'Monitoraggio acqua di processo industriale con tracciabilità digitale',
      ca: 'Monitoratge d’aigua de procés industrial amb traçabilitat digital'
    },
    descriptions: {
      en: 'AquaVerify helps industrial teams coordinate water quality checks, laboratory work, reports and recurring monitoring in one connected workflow.',
      es: 'AquaVerify ayuda a equipos industriales a coordinar controles de calidad del agua, trabajo de laboratorio, informes y monitorización recurrente.',
      fr: 'AquaVerify aide les équipes industrielles à coordonner contrôles qualité eau, travail laboratoire, rapports et surveillance récurrente.',
      it: 'AquaVerify aiuta i team industriali a coordinare controlli qualità acqua, lavoro di laboratorio, report e monitoraggio ricorrente.',
      ca: 'AquaVerify ajuda equips industrials a coordinar controls de qualitat de l’aigua, treball de laboratori, informes i monitoratge recurrent.'
    },
    sections: {
      en: [
        section('For plants and technical operations', 'Industrial teams need a practical way to request tests, manage suppliers, follow reports and keep a traceable history of water quality work.', ['Process water checkpoints', 'Supplier and lab coordination', 'Recurring task planning', 'Centralized report access']),
        section('A platform-backed workflow', 'AquaVerify Cloud keeps context around sites, samples, operators, documents and customer-facing reports.')
      ],
      es: [
        section('Para plantas y operaciones técnicas', 'Los equipos industriales necesitan una forma práctica de solicitar análisis, gestionar proveedores, seguir informes y mantener historial trazable.', ['Puntos de control de agua de proceso', 'Coordinación con proveedores y laboratorio', 'Planificación de tareas recurrentes', 'Acceso centralizado a informes']),
        section('Un flujo apoyado por plataforma', 'AquaVerify Cloud mantiene contexto sobre puntos, muestras, operadores, documentos e informes para cliente.')
      ],
      fr: [
        section('Pour sites et opérations techniques', 'Les équipes industrielles ont besoin d’un moyen pratique pour demander analyses, gérer fournisseurs, suivre rapports et garder un historique traçable.', ['Points de contrôle eau de process', 'Coordination fournisseurs et laboratoire', 'Planification de tâches récurrentes', 'Accès centralisé aux rapports']),
        section('Un flux appuyé par plateforme', 'AquaVerify Cloud conserve le contexte sites, échantillons, opérateurs, documents et rapports client.')
      ],
      it: [
        section('Per impianti e operazioni tecniche', 'I team industriali richiedono un modo pratico per richiedere analisi, gestire fornitori, seguire report e mantenere storico tracciabile.', ['Punti controllo acqua di processo', 'Coordinamento fornitori e laboratorio', 'Pianificazione attività ricorrenti', 'Accesso centralizzato ai report']),
        section('Un flusso supportato dalla piattaforma', 'AquaVerify Cloud mantiene contesto su siti, campioni, operatori, documenti e report per cliente.')
      ],
      ca: [
        section('Per a plantes i operacions tècniques', 'Els equips industrials necessiten una forma pràctica de sol·licitar anàlisis, gestionar proveïdors, seguir informes i mantenir historial traçable.', ['Punts de control d’aigua de procés', 'Coordinació amb proveïdors i laboratori', 'Planificació de tasques recurrents', 'Accés centralitzat a informes']),
        section('Un flux recolzat per plataforma', 'AquaVerify Cloud manté context sobre punts, mostres, operadors, documents i informes per a client.')
      ]
    },
    ctas: {
      en: ['Discuss process water workflow', 'Explore SaaS'],
      es: ['Hablar de flujo industrial', 'Explorar SaaS'],
      fr: ['Discuter flux industriel', 'Explorer SaaS'],
      it: ['Discuti flusso industriale', 'Esplora SaaS'],
      ca: ['Parlar de flux industrial', 'Explorar SaaS']
    }
  },
  {
    id: 'facility-water-risk',
    paths: {
      en: '/industries/facility-water-risk-management',
      es: '/es/industrias/gestion-riesgo-agua-instalaciones',
      fr: '/fr/industries/gestion-risque-eau-batiments',
      it: '/it/settori/gestione-rischio-acqua-strutture',
      ca: '/ca/sectors/gestio-risc-aigua-installacions'
    },
    titles: {
      en: 'Facility water risk workflows for buildings and sites',
      es: 'Flujos de riesgo del agua para edificios e instalaciones',
      fr: 'Flux de risque eau pour bâtiments et sites',
      it: 'Workflow rischio acqua per edifici e strutture',
      ca: 'Fluxos de risc de l’aigua per a edificis i instal·lacions'
    },
    descriptions: {
      en: 'Coordinate water quality requests, laboratory reports and recurring monitoring for buildings, facilities and managed sites.',
      es: 'Coordina solicitudes de calidad del agua, informes de laboratorio y monitorización recurrente para edificios, instalaciones y activos gestionados.',
      fr: 'Coordonnez demandes qualité eau, rapports laboratoire et surveillance récurrente pour bâtiments, installations et sites gérés.',
      it: 'Coordina richieste qualità acqua, report di laboratorio e monitoraggio ricorrente per edifici, strutture e siti gestiti.',
      ca: 'Coordina sol·licituds de qualitat de l’aigua, informes de laboratori i monitoratge recurrent per a edificis, instal·lacions i actius gestionats.'
    },
    sections: {
      en: [
        section('For recurring site control', 'Facility teams need visibility over what has been sampled, who performed the work, where reports are stored and what needs follow-up.', ['Managed site records', 'Recurring monitoring tasks', 'Supplier and laboratory coordination', 'Report history by asset or site']),
        section('Keep evidence organized', 'AquaVerify connects products, laboratories and platform workflows so water quality activity is easier to review and share.')
      ],
      es: [
        section('Para control recurrente de instalaciones', 'Los equipos de facility necesitan visibilidad sobre qué se ha muestreado, quién realizó el trabajo, dónde están los informes y qué requiere seguimiento.', ['Registros por instalación', 'Tareas recurrentes de monitorización', 'Coordinación con proveedores y laboratorio', 'Historial de informes por activo o punto']),
        section('Mantener la evidencia organizada', 'AquaVerify conecta productos, laboratorios y flujos de plataforma para que la actividad de calidad del agua sea más fácil de revisar y compartir.')
      ],
      fr: [
        section('Pour contrôle récurrent de sites', 'Les équipes facility ont besoin de visibilité sur ce qui a été échantillonné, qui a réalisé le travail, où sont les rapports et ce qui demande suivi.', ['Registres par site', 'Tâches de surveillance récurrentes', 'Coordination fournisseurs et laboratoire', 'Historique rapports par actif ou site']),
        section('Garder les preuves organisées', 'AquaVerify connecte produits, laboratoires et flux plateforme afin que l’activité qualité eau soit plus facile à revoir et partager.')
      ],
      it: [
        section('Per controllo ricorrente dei siti', 'I team facility richiedono visibilità su cosa è stato campionato, chi ha eseguito il lavoro, dove sono i report e cosa richiede follow-up.', ['Record per sito', 'Attività ricorrenti di monitoraggio', 'Coordinamento fornitori e laboratorio', 'Storico report per asset o sito']),
        section('Tenere le evidenze organizzate', 'AquaVerify collega prodotti, laboratori e flussi piattaforma affinché l’attività qualità acqua sia più semplice da rivedere e condividere.')
      ],
      ca: [
        section('Per a control recurrent d’instal·lacions', 'Els equips de facility necessiten visibilitat sobre què s’ha mostrejat, qui ha fet el treball, on són els informes i què requereix seguiment.', ['Registres per instal·lació', 'Tasques recurrents de monitoratge', 'Coordinació amb proveïdors i laboratori', 'Historial d’informes per actiu o punt']),
        section('Mantenir l’evidència organitzada', 'AquaVerify connecta productes, laboratoris i fluxos de plataforma perquè l’activitat de qualitat de l’aigua sigui més fàcil de revisar i compartir.')
      ]
    },
    ctas: {
      en: ['Ask for facility workflow fit', 'Contact AquaVerify'],
      es: ['Pedir encaje para instalaciones', 'Contactar con AquaVerify'],
      fr: ['Demander cadrage installations', 'Contacter AquaVerify'],
      it: ['Chiedi inquadramento strutture', 'Contatta AquaVerify'],
      ca: ['Demanar encaix per instal·lacions', 'Contactar amb AquaVerify']
    }
  }
];

function buildIndustryFaqs(item, lang) {
  const common = {
    en: [
      { question: `Can AquaVerify support ${item.titles.en.toLowerCase()}?`, answer: item.descriptions.en },
      { question: 'Does the workflow include digital traceability?', answer: 'Yes. AquaVerify Cloud can connect samples, operators, reports, customer context and follow-up history in one operational workflow.' }
    ],
    es: [
      { question: `¿Puede AquaVerify apoyar ${item.titles.es.toLowerCase()}?`, answer: item.descriptions.es },
      { question: '¿El flujo incluye trazabilidad digital?', answer: 'Sí. AquaVerify Cloud puede conectar muestras, operadores, informes, contexto de cliente e historial de seguimiento en un mismo flujo operativo.' }
    ],
    fr: [
      { question: `AquaVerify peut-il accompagner ${item.titles.fr.toLowerCase()} ?`, answer: item.descriptions.fr },
      { question: 'Le flux inclut-il la traçabilité numérique ?', answer: 'Oui. AquaVerify Cloud peut connecter échantillons, opérateurs, rapports, contexte client et historique de suivi dans un même flux opérationnel.' }
    ],
    it: [
      { question: `AquaVerify può supportare ${item.titles.it.toLowerCase()}?`, answer: item.descriptions.it },
      { question: 'Il flusso include tracciabilità digitale?', answer: 'Sì. AquaVerify Cloud può collegare campioni, operatori, report, contesto cliente e storico follow-up in un unico flusso operativo.' }
    ],
    ca: [
      { question: `AquaVerify pot donar suport a ${item.titles.ca.toLowerCase()}?`, answer: item.descriptions.ca },
      { question: 'El flux inclou traçabilitat digital?', answer: 'Sí. AquaVerify Cloud pot connectar mostres, operadors, informes, context de client i historial de seguiment en un mateix flux operatiu.' }
    ]
  };
  return common[lang] || common.en;
}

function buildIndustryPages() {
  return INDUSTRY_PAGE_DATA.map((item) => page(
    item.id,
    'industries',
    'contact',
    Object.fromEntries(MARKETING_LANGUAGES.map((lang) => [lang, locale(
      item.paths[lang],
      item.titles[lang],
      item.descriptions[lang],
      item.sections[lang],
      {
        eyebrow: item.eyebrows?.[lang] || 'Industry',
        primaryCta: item.ctas[lang][0],
        secondaryCta: item.ctas[lang][1],
        seoTitle: `${item.titles[lang]} | AquaVerify`,
        seoDescription: item.descriptions[lang],
        faqs: item.faqs?.[lang] || buildIndustryFaqs(item, lang)
      }
    )])),
    { parentId: 'water-quality-control' }
  ));
}

MARKETING_PAGES.push(...buildIndustryPages());

const PRODUCT_LANGUAGE_BASE = {
  en: '/products',
  es: '/es/productos',
  fr: '/fr/produits',
  it: '/it/prodotti',
  ca: '/ca/productes'
};

const PRODUCT_UI = {
  en: {
    productRole: 'Product role',
    technicalFit: 'Technical fit',
    connectedWorkflow: 'Connected workflow',
    format: 'Format',
    family: 'Family',
    subFamily: 'Sub-family',
    parameter: 'Target parameter',
    method: 'Method / workflow',
    volume: 'Sample volume',
    cta: 'Request quote',
    secondary: 'View family',
    workflowBullets: ['Sample context', 'Operator traceability', 'Result capture', 'Digital reporting'],
    bridge: 'Connect this product to AquaVerify Cloud to keep sample context, operator, result and report traceable from the first interaction.',
    disclaimer: 'Method references should be read as workflow alignment unless a final regulatory claim is approved for the specific market.'
  },
  es: {
    productRole: 'Función del producto',
    technicalFit: 'Encaje técnico',
    connectedWorkflow: 'Flujo conectado',
    format: 'Formato',
    family: 'Familia',
    subFamily: 'Subfamilia',
    parameter: 'Parámetro objetivo',
    method: 'Método / flujo',
    volume: 'Volumen de muestra',
    cta: 'Solicitar cotización',
    secondary: 'Ver familia',
    workflowBullets: ['Contexto de muestra', 'Trazabilidad del operador', 'Captura de resultado', 'Informe digital'],
    bridge: 'Conecta este producto a AquaVerify Cloud para mantener trazables contexto de muestra, operador, resultado e informe desde la primera interacción.',
    disclaimer: 'Las referencias a métodos deben leerse como alineación de flujo salvo que exista una claim regulatoria final aprobada para el mercado concreto.'
  },
  fr: {
    productRole: 'Rôle du produit',
    technicalFit: 'Adéquation technique',
    connectedWorkflow: 'Flux connecté',
    format: 'Format',
    family: 'Famille',
    subFamily: 'Sous-famille',
    parameter: 'Paramètre cible',
    method: 'Méthode / flux',
    volume: 'Volume d’échantillon',
    cta: 'Demander un devis',
    secondary: 'Voir la famille',
    workflowBullets: ['Contexte d’échantillon', 'Traçabilité opérateur', 'Capture du résultat', 'Rapport numérique'],
    bridge: 'Connectez ce produit à AquaVerify Cloud pour garder traçables le contexte d’échantillon, l’opérateur, le résultat et le rapport.',
    disclaimer: 'Les références aux méthodes doivent être lues comme un alignement de flux sauf claim réglementaire finale approuvée pour le marché concerné.'
  },
  it: {
    productRole: 'Ruolo del prodotto',
    technicalFit: 'Inquadramento tecnico',
    connectedWorkflow: 'Flusso collegato',
    format: 'Formato',
    family: 'Famiglia',
    subFamily: 'Sottofamiglia',
    parameter: 'Parametro target',
    method: 'Metodo / flusso',
    volume: 'Volume campione',
    cta: 'Richiedi preventivo',
    secondary: 'Vedi famiglia',
    workflowBullets: ['Contesto del campione', 'Tracciabilità operatore', 'Acquisizione risultato', 'Report digitale'],
    bridge: 'Collega questo prodotto ad AquaVerify Cloud per mantenere tracciabili contesto del campione, operatore, risultato e report.',
    disclaimer: 'I riferimenti ai metodi vanno letti come allineamento del flusso salvo claim regolatoria finale approvata per il mercato specifico.'
  },
  ca: {
    productRole: 'Funció del producte',
    technicalFit: 'Encaix tècnic',
    connectedWorkflow: 'Flux connectat',
    format: 'Format',
    family: 'Família',
    subFamily: 'Subfamília',
    parameter: 'Paràmetre objectiu',
    method: 'Mètode / flux',
    volume: 'Volum de mostra',
    cta: 'Sol·licitar pressupost',
    secondary: 'Veure família',
    workflowBullets: ['Context de mostra', 'Traçabilitat de l’operador', 'Captura de resultat', 'Informe digital'],
    bridge: 'Connecta aquest producte a AquaVerify Cloud per mantenir traçables context de mostra, operador, resultat i informe des de la primera interacció.',
    disclaimer: 'Les referències a mètodes s’han de llegir com alineació de flux tret que hi hagi una claim regulatòria final aprovada per al mercat concret.'
  }
};

const COMMON = {
  somaticColiphages: {
    en: 'somatic coliphages',
    es: 'colífagos somáticos',
    fr: 'coliphages somatiques',
    it: 'colifagi somatici',
    ca: 'colífags somàtics'
  },
  fSpecificColiphages: {
    en: 'F-specific coliphages',
    es: 'colífagos F-específicos',
    fr: 'coliphages F-spécifiques',
    it: 'colifagi F-specifici',
    ca: 'colífags F-específics'
  },
  ecoliColiforms: {
    en: 'Escherichia coli and total coliforms',
    es: 'Escherichia coli y coliformes totales',
    fr: 'Escherichia coli et coliformes totaux',
    it: 'Escherichia coli e coliformi totali',
    ca: 'Escherichia coli i coliformes totals'
  },
  enterococci: {
    en: 'enterococci',
    es: 'enterococos',
    fr: 'entérocoques',
    it: 'enterococchi',
    ca: 'enterococs'
  },
  bacterialIndicators: {
    en: 'bacterial indicator workflows pending final parameter validation',
    es: 'flujos de indicadores bacterianos pendientes de validación final de parámetro',
    fr: 'flux d’indicateurs bactériens en attente de validation finale du paramètre',
    it: 'flussi di indicatori batterici in attesa di validazione finale del parametro',
    ca: 'fluxos d’indicadors bacterians pendents de validació final del paràmetre'
  },
  colorimetricReading: {
    en: 'colorimetric reading',
    es: 'lectura colorimétrica',
    fr: 'lecture colorimétrique',
    it: 'lettura colorimetrica',
    ca: 'lectura colorimètrica'
  },
  labOperations: {
    en: 'daily water microbiology laboratory operations',
    es: 'operaciones diarias de laboratorio de microbiología del agua',
    fr: 'opérations quotidiennes de laboratoire de microbiologie de l’eau',
    it: 'operazioni quotidiane di laboratorio di microbiologia dell’acqua',
    ca: 'operacions diàries de laboratori de microbiologia de l’aigua'
  },
  controls: {
    en: 'positive controls and biological materials',
    es: 'controles positivos y materiales biológicos',
    fr: 'contrôles positifs et matériaux biologiques',
    it: 'controlli positivi e materiali biologici',
    ca: 'controls positius i materials biològics'
  }
};

const PRODUCT_TYPE = {
  quantitativeKit: {
    en: 'quantitative kit',
    es: 'kit cuantitativo',
    fr: 'kit quantitatif',
    it: 'kit quantitativo',
    ca: 'kit quantitatiu'
  },
  presenceAbsenceKit: {
    en: 'presence/absence kit',
    es: 'kit de presencia/ausencia',
    fr: 'kit présence/absence',
    it: 'kit presenza/assenza',
    ca: 'kit de presència/absència'
  },
  refill: {
    en: 'refill',
    es: 'refill',
    fr: 'recharge',
    it: 'refill',
    ca: 'refill'
  },
  tool: {
    en: 'tool',
    es: 'herramienta',
    fr: 'outil',
    it: 'strumento',
    ca: 'eina'
  },
  standardKit: {
    en: 'standard kit',
    es: 'kit estándar',
    fr: 'kit standard',
    it: 'kit standard',
    ca: 'kit estàndard'
  },
  labEssential: {
    en: 'lab essential',
    es: 'lab essential',
    fr: 'lab essential',
    it: 'lab essential',
    ca: 'lab essential'
  }
};

const FAMILY_LABELS = {
  enumera: {
    en: 'ENUMERA',
    es: 'ENUMERA',
    fr: 'ENUMERA',
    it: 'ENUMERA',
    ca: 'ENUMERA'
  },
  indica: {
    en: 'INDICA',
    es: 'INDICA',
    fr: 'INDICA',
    it: 'INDICA',
    ca: 'INDICA'
  },
  'standard-kits': {
    en: 'Standard ISO/EPA Kits',
    es: 'Kits estándar ISO/EPA',
    fr: 'Kits standard ISO/EPA',
    it: 'Kit standard ISO/EPA',
    ca: 'Kits estàndard ISO/EPA'
  },
  'lab-essentials': {
    en: 'Lab Essentials',
    es: 'Lab Essentials',
    fr: 'Lab Essentials',
    it: 'Lab Essentials',
    ca: 'Lab Essentials'
  }
};

function i18n(value, lang) {
  if (typeof value === 'string') return value;
  return value?.[lang] || value?.en || '';
}

export const PRODUCT_DETAIL_DATA = [
  { id: 'enumera-soma100', parentId: 'enumera', slug: 'enumera-soma100', name: 'ENUMERA Soma100', type: PRODUCT_TYPE.quantitativeKit, subFamily: 'ENUMERA Kits', parameter: COMMON.somaticColiphages, method: 'ENUMERA quantitative workflow', volume: '100 mL', format: 'Kit' },
  { id: 'enumera-coli100', parentId: 'enumera', slug: 'enumera-coli100', name: 'ENUMERA Coli100', type: PRODUCT_TYPE.quantitativeKit, subFamily: 'ENUMERA Kits', parameter: COMMON.ecoliColiforms, method: 'UV-free chromogenic MPN tray workflow', volume: '100 mL', format: 'Kit' },
  { id: 'enumera-entero100', parentId: 'enumera', slug: 'enumera-entero100', name: 'ENUMERA Entero100', type: PRODUCT_TYPE.quantitativeKit, subFamily: 'ENUMERA Kits', parameter: COMMON.bacterialIndicators, method: 'ENUMERA quantitative workflow', volume: '100 mL', format: 'Kit' },
  { id: 'soma-bottle-100', parentId: 'enumera', slug: 'soma-bottle-100', name: 'Soma Bottle 100', type: PRODUCT_TYPE.refill, subFamily: 'ENUMERA Refill', parameter: COMMON.somaticColiphages, method: 'MCB10 medium refill workflow', volume: '100 mL', format: 'Bottle' },
  { id: 'coli-bottle-100', parentId: 'enumera', slug: 'coli-bottle-100', name: 'Coli Bottle 100', type: PRODUCT_TYPE.refill, subFamily: 'ENUMERA Refill', parameter: COMMON.ecoliColiforms, method: 'Coli medium refill workflow', volume: '100 mL', format: 'Bottle' },
  { id: 'entero-bottle-100', parentId: 'enumera', slug: 'entero-bottle-100', name: 'Entero Bottle 100', type: PRODUCT_TYPE.refill, subFamily: 'ENUMERA Refill', parameter: COMMON.enterococci, method: 'Entero medium refill workflow', volume: '100 mL', format: 'Bottle' },
  { id: 'enumera-sealer', parentId: 'enumera', slug: 'enumera-sealer', name: 'ENUMERA Sealer', type: PRODUCT_TYPE.tool, subFamily: 'ENUMERA Tools', parameter: COMMON.colorimetricReading, method: 'ENUMERA tray sealing workflow', volume: 'N/A', format: 'Electronic device' },
  { id: 'enumera-mould', parentId: 'enumera', slug: 'enumera-mould', name: 'ENUMERA Mould', type: PRODUCT_TYPE.tool, subFamily: 'ENUMERA Tools', parameter: COMMON.colorimetricReading, method: 'ENUMERA tray sealing workflow', volume: 'N/A', format: 'Silicone mould' },
  { id: 'enumera-comparator', parentId: 'enumera', slug: 'enumera-comparator', name: 'ENUMERA Comparator', type: PRODUCT_TYPE.tool, subFamily: 'ENUMERA Tools', parameter: COMMON.colorimetricReading, method: 'Threshold color comparison', volume: 'N/A', format: 'Comparator' },
  { id: 'enumera-reader', parentId: 'enumera', slug: 'enumera-reader', name: 'ENUMERA Reader', type: PRODUCT_TYPE.tool, subFamily: 'ENUMERA Tools', parameter: COMMON.colorimetricReading, method: 'Image capture support', volume: 'N/A', format: 'Reader box' },
  { id: 'enumera-tray', parentId: 'enumera', slug: 'enumera-tray', name: 'ENUMERA Tray', type: PRODUCT_TYPE.tool, subFamily: 'ENUMERA Tools', parameter: COMMON.colorimetricReading, method: 'ENUMERA testing tray workflow', volume: 'N/A', format: 'Testing tray' },
  { id: 'enumera-mat', parentId: 'enumera', slug: 'enumera-mat', name: 'ENUMERA MAT', type: PRODUCT_TYPE.tool, subFamily: 'ENUMERA Tools', parameter: COMMON.colorimetricReading, method: 'Image capture support', volume: 'N/A', format: 'Dark mat' },
  { id: 'indica-soma', parentId: 'indica', slug: 'indica-soma', name: 'INDICA Soma', type: PRODUCT_TYPE.presenceAbsenceKit, subFamily: 'INDICA Kits', parameter: COMMON.somaticColiphages, method: 'Presence/absence workflow', volume: '100 mL', format: 'Kit' },
  { id: 'indica-coli', parentId: 'indica', slug: 'indica-coli', name: 'INDICA Coli', type: PRODUCT_TYPE.presenceAbsenceKit, subFamily: 'INDICA Kits', parameter: COMMON.ecoliColiforms, method: 'Presence/absence workflow', volume: '100 mL', format: 'Kit' },
  { id: 'indica-entero', parentId: 'indica', slug: 'indica-entero', name: 'INDICA Entero', type: PRODUCT_TYPE.presenceAbsenceKit, subFamily: 'INDICA Kits', parameter: COMMON.enterococci, method: 'Presence/absence workflow', volume: '100 mL', format: 'Kit' },
  { id: 'indica-match', parentId: 'indica', slug: 'indica-match', name: 'INDICA Match', type: PRODUCT_TYPE.tool, subFamily: 'INDICA Tools', parameter: COMMON.colorimetricReading, method: 'Presence/absence color matching', volume: 'N/A', format: 'Comparator' },
  { id: 'plaque-soma-1ml', parentId: 'standard-kits', slug: 'plaque-soma-1ml', name: 'Plaque Soma 1ml', type: PRODUCT_TYPE.standardKit, subFamily: 'ISO Kits', parameter: COMMON.somaticColiphages, method: 'ISO 10705-2 Double Agar Layer (DAL) workflow', volume: '1 mL', format: 'Kit' },
  { id: 'plaque-soma-100ml', parentId: 'standard-kits', slug: 'plaque-soma-100ml', name: 'Plaque Soma 100 ml', type: PRODUCT_TYPE.standardKit, subFamily: 'ISO Kits', parameter: COMMON.somaticColiphages, method: 'ISO 10705-2 Single Agar Layer (SAL) workflow', volume: '100 mL', format: 'Kit' },
  { id: 'epa-soma', parentId: 'standard-kits', slug: 'epa-soma', name: 'EPA Soma', type: PRODUCT_TYPE.standardKit, subFamily: 'EPA Kits', parameter: COMMON.somaticColiphages, method: 'US-EPA 1602, 1642 and 1643 oriented workflow', volume: 'Method-dependent', format: 'Kit' },
  { id: 'epa-f-plus', parentId: 'standard-kits', slug: 'epa-f-plus', name: 'EPA F-Plus', type: PRODUCT_TYPE.standardKit, subFamily: 'EPA Kits', parameter: COMMON.fSpecificColiphages, method: 'US-EPA 1602, 1642 and 1643 oriented workflow', volume: 'Method-dependent', format: 'Kit' },
  { id: 'msa-semi-solido', parentId: 'lab-essentials', slug: 'msa-semi-solido', name: 'MSA Semi solido', type: PRODUCT_TYPE.labEssential, subFamily: 'Culture Media & Reagents', parameter: COMMON.labOperations, method: 'ssMSA prepared workflow', volume: '100 mL', format: 'Prepared medium' },
  { id: 'msa-plate', parentId: 'lab-essentials', slug: 'msa-plate', name: 'MSA Plate', type: PRODUCT_TYPE.labEssential, subFamily: 'Culture Media & Reagents', parameter: COMMON.labOperations, method: 'MSA plate workflow', volume: '90 mm', format: 'Prepared plate' },
  { id: 'msb', parentId: 'lab-essentials', slug: 'msb', name: 'MSB', type: PRODUCT_TYPE.labEssential, subFamily: 'Culture Media & Reagents', parameter: COMMON.labOperations, method: 'Modified Scholten’s Broth (MSB)', volume: 'N/A', format: 'Broth' },
  { id: 'msa', parentId: 'lab-essentials', slug: 'msa', name: 'MSA', type: PRODUCT_TYPE.labEssential, subFamily: 'Culture Media & Reagents', parameter: COMMON.labOperations, method: 'Modified Scholten’s Agar (MSA)', volume: 'N/A', format: 'Agar' },
  { id: 'soma-control-1ml', parentId: 'lab-essentials', slug: 'soma-control-1ml', name: 'Soma Control 1ml', type: PRODUCT_TYPE.labEssential, subFamily: 'Biological Materials', parameter: COMMON.controls, method: 'Positive control for ISO 10705-2 oriented workflows', volume: '1 mL', format: 'Positive control' },
  { id: 'soma-control-100ml', parentId: 'lab-essentials', slug: 'soma-control-100ml', name: 'Soma Control 100ml', type: PRODUCT_TYPE.labEssential, subFamily: 'Biological Materials', parameter: COMMON.controls, method: 'Positive control for ISO 10705-2 oriented workflows', volume: '100 mL', format: 'Positive control' },
  { id: 'wr5-host-strain', parentId: 'lab-essentials', slug: 'wr5-host-strain', name: 'WR5', type: PRODUCT_TYPE.labEssential, subFamily: 'Biological Materials', parameter: COMMON.somaticColiphages, method: 'Host strain for somatic coliphage enumeration', volume: 'N/A', format: 'Host strain' },
  { id: 'gr8f', parentId: 'lab-essentials', slug: 'gr8f', name: 'GR8F', type: PRODUCT_TYPE.labEssential, subFamily: 'Biological Materials', parameter: COMMON.controls, method: 'GR8 somatic coliphage filterable format', volume: 'N/A', format: '-20ºC format' },
  { id: 'gr8f-ultra', parentId: 'lab-essentials', slug: 'gr8f-ultra', name: 'GR8F-Ultra', type: PRODUCT_TYPE.labEssential, subFamily: 'Biological Materials', parameter: COMMON.controls, method: 'GR8 somatic coliphage filterable format', volume: 'N/A', format: '-70ºC format' },
  { id: 'indica-control-100', parentId: 'lab-essentials', slug: 'indica-control-100', name: 'INDICA Control 100', type: PRODUCT_TYPE.labEssential, subFamily: 'Biological Materials', parameter: COMMON.controls, method: 'PHIX174 somatic coliphage filterable control', volume: '100 pfu/vial', format: '-70ºC vial' },
  { id: 'indica-control-1000', parentId: 'lab-essentials', slug: 'indica-control-1000', name: 'INDICA Control 1000', type: PRODUCT_TYPE.labEssential, subFamily: 'Biological Materials', parameter: COMMON.controls, method: 'PHIX174 somatic coliphage filterable control', volume: '1000 pfu/vial', format: '-70ºC vial' }
];

function getProductPagePath(product, lang) {
  return `${PRODUCT_LANGUAGE_BASE[lang]}/${product.slug}`;
}

function buildProductDescription(product, lang) {
  const labels = PRODUCT_UI[lang];
  const productType = i18n(product.type, lang);
  const parameter = i18n(product.parameter, lang);

  switch (lang) {
    case 'es':
      return `${product.name} es un ${productType} AquaVerify para ${parameter} en flujos de microbiología del agua.`;
    case 'fr':
      return `${product.name} est un ${productType} AquaVerify pour ${parameter} dans les flux de microbiologie de l’eau.`;
    case 'it':
      return `${product.name} è un ${productType} AquaVerify per ${parameter} nei flussi di microbiologia dell’acqua.`;
    case 'ca':
      return `${product.name} és un ${productType} AquaVerify per a ${parameter} en fluxos de microbiologia de l’aigua.`;
    default:
      return `${product.name} is an AquaVerify ${productType} for ${parameter} in water microbiology workflows.`;
  }
}

function buildProductFaqs(product, lang) {
  const labels = PRODUCT_UI[lang];
  const productType = i18n(product.type, lang);
  const parameter = i18n(product.parameter, lang);

  switch (lang) {
    case 'es':
      return [
        {
          question: `¿Para qué se utiliza ${product.name}?`,
          answer: `${product.name} es un ${productType} para ${parameter} en flujos de microbiología del agua, con formato ${product.format} y volumen de referencia ${product.volume}.`
        },
        {
          question: `¿Puede ${product.name} conectarse a AquaVerify Cloud?`,
          answer: labels.bridge
        },
        {
          question: `¿Está ${product.name} disponible para distribuidores u OEM?`,
          answer: 'AquaVerify puede valorar suministro bajo marca AquaVerify, distribución técnica u opciones OEM según mercado, volumen, soporte requerido y restricciones regulatorias.'
        }
      ];
    case 'fr':
      return [
        {
          question: `À quoi sert ${product.name} ?`,
          answer: `${product.name} est un ${productType} pour ${parameter} dans les flux de microbiologie de l’eau, avec format ${product.format} et volume de référence ${product.volume}.`
        },
        {
          question: `${product.name} peut-il être connecté à AquaVerify Cloud ?`,
          answer: labels.bridge
        },
        {
          question: `${product.name} est-il disponible pour distributeurs ou OEM ?`,
          answer: 'AquaVerify peut étudier une fourniture sous marque AquaVerify, distribution technique ou options OEM selon marché, volume, support requis et contraintes réglementaires.'
        }
      ];
    case 'it':
      return [
        {
          question: `A cosa serve ${product.name}?`,
          answer: `${product.name} è un ${productType} per ${parameter} nei flussi di microbiologia dell’acqua, con formato ${product.format} e volume di riferimento ${product.volume}.`
        },
        {
          question: `${product.name} può collegarsi ad AquaVerify Cloud?`,
          answer: labels.bridge
        },
        {
          question: `${product.name} è disponibile per distributori o OEM?`,
          answer: 'AquaVerify può valutare fornitura a marchio AquaVerify, distribuzione tecnica o opzioni OEM in base a mercato, volume, supporto richiesto e vincoli regolatori.'
        }
      ];
    case 'ca':
      return [
        {
          question: `Per a què s’utilitza ${product.name}?`,
          answer: `${product.name} és un ${productType} per a ${parameter} en fluxos de microbiologia de l’aigua, amb format ${product.format} i volum de referència ${product.volume}.`
        },
        {
          question: `${product.name} es pot connectar a AquaVerify Cloud?`,
          answer: labels.bridge
        },
        {
          question: `${product.name} està disponible per a distribuïdors o OEM?`,
          answer: 'AquaVerify pot valorar subministrament sota marca AquaVerify, distribució tècnica o opcions OEM segons mercat, volum, suport requerit i restriccions regulatòries.'
        }
      ];
    default:
      return [
        {
          question: `What is ${product.name} used for?`,
          answer: `${product.name} is an AquaVerify ${productType} for ${parameter} in water microbiology workflows, with ${product.format} format and ${product.volume} reference volume.`
        },
        {
          question: `Can ${product.name} connect to AquaVerify Cloud?`,
          answer: labels.bridge
        },
        {
          question: `Is ${product.name} available for distributors or OEM?`,
          answer: 'AquaVerify can evaluate AquaVerify-branded supply, technical distribution or OEM options depending on market, volume, required support and regulatory constraints.'
        }
      ];
  }
}

const ENUMERA_COLI100_PRODUCT_IMAGE = '/images/products/marketing/enumera-coli100.png';

function enumeraColi100Assets(lang) {
  return {
    ...getProductAssetOptions('enumera-coli100', lang, 'ENUMERA Coli 100 chromogenic tray with yellow and green wells'),
    heroImage: ENUMERA_COLI100_PRODUCT_IMAGE,
    heroImageAlt: 'ENUMERA Coli 100 tray showing yellow total coliform wells and green E. coli wells',
    heroImageFit: 'contain',
    ogImage: ENUMERA_COLI100_PRODUCT_IMAGE,
    gallery: [
      {
        src: ENUMERA_COLI100_PRODUCT_IMAGE,
        alt: 'ENUMERA Coli 100 multiwell tray with visible chromogenic results',
        title: {
          en: 'Visible chromogenic readout',
          es: 'Lectura cromogénica visible',
          fr: 'Lecture chromogène visible',
          it: 'Lettura cromogenica visibile',
          ca: 'Lectura cromogènica visible'
        }[lang],
        body: {
          en: 'Yellow wells indicate total coliforms. Green or blue-green wells indicate E. coli and are also counted as total coliforms.',
          es: 'Los pocillos amarillos indican coliformes totales. Los pocillos verdes o azul verdoso indican E. coli y también se cuentan como coliformes totales.',
          fr: 'Les puits jaunes indiquent les coliformes totaux. Les puits verts ou bleu-vert indiquent E. coli et sont également comptés comme coliformes totaux.',
          it: 'I pozzetti gialli indicano coliformi totali. I pozzetti verdi o verde-blu indicano E. coli e si contano anche come coliformi totali.',
          ca: 'Els pous grocs indiquen coliformes totals. Els pous verds o verd blavós indiquen E. coli i també es compten com a coliformes totals.'
        }[lang]
      }
    ]
  };
}

function enumeraColi100Whitepaper(lang) {
  const contentByLang = {
    en: {
      eyebrow: 'Product workflow brief',
      title: 'UV-free E. coli and total coliform workflow',
      intro: 'ENUMERA Coli 100 combines Smart Cap reagent release, a 100 mL sample workflow, multiwell MPN enumeration and visible chromogenic reading so laboratories can remove UV interpretation from routine E. coli and total coliform analysis.',
      metrics: [
        ['Sample', '100 mL', 'Designed around the standard 100 mL water sample routine used by many water microbiology laboratories.', 'cyan'],
        ['Incubation', '18 h / 35 °C', 'The expected product protocol uses incubation at 35 °C for 18 hours before visual reading.', 'indigo'],
        ['Readout', 'No UV', 'Results are interpreted under normal laboratory lighting: yellow for total coliforms, green for E. coli.', 'emerald']
      ],
      comparisonTitle: 'From fluorescence to visible colour',
      comparison: [
        ['Traditional fluorogenic workflow', 'Yellow plus UV fluorescence', 'Requires a UV lamp or cabinet, controlled reading conditions and periodic attention to lamp output.', 58, 'slate'],
        ['ENUMERA Coli 100 workflow', 'Yellow plus green visible colour', 'Uses a chromogenic reaction that makes E. coli visible as green or blue-green wells under normal light.', 92, 'emerald']
      ],
      flowTitle: 'Sample-to-result workflow',
      flow: [
        ['Add the sample', 'Introduce the water sample into the analysis bottle following the kit protocol and target volume.'],
        ['Close the Smart Cap bottle', 'The integrated reagent contacts the sample when the bottle is closed, reducing manual reagent handling.'],
        ['Mix and fill the tray', 'Distribute the prepared sample across the multiwell tray for MPN enumeration.'],
        ['Incubate', 'Incubate at 35 °C for 18 hours following the current product datasheet.'],
        ['Read and count', 'Count yellow plus green wells for total coliforms, and green wells for E. coli, then consult the MPN table.']
      ],
      timelineTitle: 'Where it fits',
      timeline: [
        ['1', 'Municipal', 'Water utilities', 'Routine E. coli and total coliform control without UV reading hardware.'],
        ['2', 'Laboratory', 'Environmental labs', 'High-volume sample batches with fewer repetitive reagent-handling steps.'],
        ['3', 'Industrial', 'Food and beverage', 'Water used as process water, ingredient water, ice, rinsing or hygiene control.'],
        ['4', 'Operations', 'Treatment plants', 'Clear visual checks to support treatment verification and deviation follow-up.']
      ],
      sourceLabel: 'Technical note',
      note: 'Use the product within the matrices, protocols and validation requirements accepted by each laboratory quality system and jurisdiction.'
    },
    es: {
      eyebrow: 'Resumen visual del producto',
      title: 'Flujo sin UV para E. coli y coliformes totales',
      intro: 'ENUMERA Coli 100 combina liberación de reactivo Smart Cap, flujo de muestra de 100 mL, enumeración NMP en tray multipocillo y lectura cromogénica visible para eliminar la interpretación UV de la rutina de E. coli y coliformes totales.',
      metrics: [
        ['Muestra', '100 mL', 'Pensado para la rutina de muestra de 100 mL habitual en muchos laboratorios de microbiología del agua.', 'cyan'],
        ['Incubación', '18 h / 35 °C', 'El protocolo previsto del producto utiliza incubación a 35 °C durante 18 horas antes de la lectura visual.', 'indigo'],
        ['Lectura', 'Sin UV', 'Los resultados se interpretan bajo luz normal: amarillo para coliformes totales y verde para E. coli.', 'emerald']
      ],
      comparisonTitle: 'De fluorescencia a color visible',
      comparison: [
        ['Flujo fluorogénico tradicional', 'Amarillo más fluorescencia UV', 'Requiere lámpara o cabina UV, condiciones de lectura controladas y atención periódica al estado de la fuente UV.', 58, 'slate'],
        ['Flujo ENUMERA Coli 100', 'Amarillo más verde visible', 'Utiliza una reacción cromogénica que hace visible E. coli como pocillos verdes o azul verdoso bajo luz normal.', 92, 'emerald']
      ],
      flowTitle: 'Flujo de muestra a resultado',
      flow: [
        ['Añadir la muestra', 'Introduce la muestra de agua en el bote de análisis siguiendo el protocolo y el volumen objetivo del kit.'],
        ['Cerrar el bote Smart Cap', 'El reactivo integrado entra en contacto con la muestra al cerrar el bote, reduciendo la manipulación manual de reactivos.'],
        ['Mezclar y llenar el tray', 'Distribuye la muestra preparada en el tray multipocillo para la enumeración mediante NMP.'],
        ['Incubar', 'Incuba a 35 °C durante 18 horas siguiendo la ficha técnica vigente del producto.'],
        ['Leer y contar', 'Cuenta pocillos amarillos más verdes para coliformes totales, y pocillos verdes para E. coli; después consulta la tabla NMP.']
      ],
      timelineTitle: 'Dónde encaja',
      timeline: [
        ['1', 'Municipal', 'Empresas de agua', 'Control rutinario de E. coli y coliformes totales sin hardware de lectura UV.'],
        ['2', 'Laboratorio', 'Laboratorios ambientales', 'Lotes con alto volumen de muestras y menos pasos repetitivos de manipulación de reactivo.'],
        ['3', 'Industrial', 'Alimentación y bebidas', 'Agua de proceso, agua ingrediente, hielo, enjuagues o control higiénico.'],
        ['4', 'Operaciones', 'Plantas de tratamiento', 'Comprobaciones visuales claras para verificar tratamiento y seguir desviaciones.']
      ],
      sourceLabel: 'Nota técnica',
      note: 'Utiliza el producto dentro de las matrices, protocolos y requisitos de validación aceptados por el sistema de calidad y la jurisdicción de cada laboratorio.'
    },
    fr: {
      eyebrow: 'Résumé visuel produit',
      title: 'Flux sans UV pour E. coli et coliformes totaux',
      intro: 'ENUMERA Coli 100 associe libération de réactif Smart Cap, flux échantillon 100 mL, énumération NPP en plateau multipuits et lecture chromogène visible afin de retirer l’interprétation UV de la routine E. coli et coliformes totaux.',
      metrics: [
        ['Échantillon', '100 mL', 'Conçu autour de la routine 100 mL utilisée par de nombreux laboratoires de microbiologie de l’eau.', 'cyan'],
        ['Incubation', '18 h / 35 °C', 'Le protocole produit prévu utilise une incubation à 35 °C pendant 18 heures avant lecture visuelle.', 'indigo'],
        ['Lecture', 'Sans UV', 'Les résultats se lisent sous lumière normale: jaune pour coliformes totaux, vert pour E. coli.', 'emerald']
      ],
      comparisonTitle: 'De la fluorescence à la couleur visible',
      comparison: [
        ['Flux fluorogène traditionnel', 'Jaune plus fluorescence UV', 'Nécessite lampe ou cabine UV, conditions de lecture contrôlées et suivi périodique de la source UV.', 58, 'slate'],
        ['Flux ENUMERA Coli 100', 'Jaune plus vert visible', 'Utilise une réaction chromogène qui rend E. coli visible en puits verts ou bleu-vert sous lumière normale.', 92, 'emerald']
      ],
      flowTitle: 'Flux de l’échantillon au résultat',
      flow: [
        ['Ajouter l’échantillon', 'Introduisez l’échantillon d’eau dans le flacon d’analyse selon le protocole et le volume cible du kit.'],
        ['Fermer le flacon Smart Cap', 'Le réactif intégré entre en contact avec l’échantillon à la fermeture, réduisant la manipulation manuelle de réactifs.'],
        ['Mélanger et remplir le plateau', 'Répartissez l’échantillon préparé dans le plateau multipuits pour l’énumération NPP.'],
        ['Incuber', 'Incubez à 35 °C pendant 18 heures selon la fiche technique en vigueur.'],
        ['Lire et compter', 'Comptez les puits jaunes plus verts pour les coliformes totaux, et les puits verts pour E. coli; consultez ensuite la table NPP.']
      ],
      timelineTitle: 'Où il s’intègre',
      timeline: [
        ['1', 'Municipal', 'Services d’eau', 'Contrôle routinier E. coli et coliformes totaux sans matériel de lecture UV.'],
        ['2', 'Laboratoire', 'Laboratoires environnementaux', 'Lots à volume élevé avec moins d’étapes répétitives de manipulation du réactif.'],
        ['3', 'Industriel', 'Agroalimentaire', 'Eau de procédé, eau ingrédient, glace, rinçages ou contrôle hygiène.'],
        ['4', 'Opérations', 'Stations de traitement', 'Contrôles visuels clairs pour vérifier le traitement et suivre les écarts.']
      ],
      sourceLabel: 'Note technique',
      note: 'Utilisez le produit dans les matrices, protocoles et exigences de validation acceptés par le système qualité et la juridiction du laboratoire.'
    },
    it: {
      eyebrow: 'Sintesi visiva prodotto',
      title: 'Workflow senza UV per E. coli e coliformi totali',
      intro: 'ENUMERA Coli 100 combina rilascio reagente Smart Cap, workflow campione da 100 mL, enumerazione MPN in tray multipietto e lettura cromogenica visibile per eliminare l’interpretazione UV dalla routine E. coli e coliformi totali.',
      metrics: [
        ['Campione', '100 mL', 'Pensato per la routine da 100 mL usata in molti laboratori di microbiologia dell’acqua.', 'cyan'],
        ['Incubazione', '18 h / 35 °C', 'Il protocollo previsto usa incubazione a 35 °C per 18 ore prima della lettura visiva.', 'indigo'],
        ['Lettura', 'Senza UV', 'I risultati si interpretano con luce normale: giallo per coliformi totali, verde per E. coli.', 'emerald']
      ],
      comparisonTitle: 'Dalla fluorescenza al colore visibile',
      comparison: [
        ['Workflow fluorogenico tradizionale', 'Giallo più fluorescenza UV', 'Richiede lampada o cabina UV, condizioni di lettura controllate e attenzione periodica alla sorgente UV.', 58, 'slate'],
        ['Workflow ENUMERA Coli 100', 'Giallo più verde visibile', 'Usa una reazione cromogenica che rende E. coli visibile come pozzetti verdi o verde-blu con luce normale.', 92, 'emerald']
      ],
      flowTitle: 'Workflow dal campione al risultato',
      flow: [
        ['Aggiungi il campione', 'Inserisci il campione d’acqua nel flacone di analisi seguendo protocollo e volume target del kit.'],
        ['Chiudi il flacone Smart Cap', 'Il reagente integrato entra in contatto con il campione alla chiusura, riducendo la manipolazione manuale dei reagenti.'],
        ['Miscela e riempi il tray', 'Distribuisci il campione preparato nel tray multipietto per l’enumerazione MPN.'],
        ['Incuba', 'Incuba a 35 °C per 18 ore seguendo la scheda tecnica vigente.'],
        ['Leggi e conta', 'Conta i pozzetti gialli più verdi per i coliformi totali, e i verdi per E. coli; poi consulta la tabella MPN.']
      ],
      timelineTitle: 'Dove si inserisce',
      timeline: [
        ['1', 'Municipale', 'Utility idriche', 'Controllo routinario di E. coli e coliformi totali senza hardware di lettura UV.'],
        ['2', 'Laboratorio', 'Laboratori ambientali', 'Lotti ad alto volume con meno passaggi ripetitivi di manipolazione reagente.'],
        ['3', 'Industriale', 'Food & beverage', 'Acqua di processo, acqua ingrediente, ghiaccio, risciacqui o controllo igienico.'],
        ['4', 'Operazioni', 'Impianti di trattamento', 'Controlli visivi chiari per verificare il trattamento e seguire deviazioni.']
      ],
      sourceLabel: 'Nota tecnica',
      note: 'Usare il prodotto entro matrici, protocolli e requisiti di validazione accettati dal sistema qualità e dalla giurisdizione del laboratorio.'
    },
    ca: {
      eyebrow: 'Resum visual del producte',
      title: 'Flux sense UV per a E. coli i coliformes totals',
      intro: 'ENUMERA Coli 100 combina alliberament de reactiu Smart Cap, flux de mostra de 100 mL, enumeració NMP en tray multipou i lectura cromogènica visible per eliminar la interpretació UV de la rutina d’E. coli i coliformes totals.',
      metrics: [
        ['Mostra', '100 mL', 'Pensat per a la rutina de mostra de 100 mL habitual en molts laboratoris de microbiologia de l’aigua.', 'cyan'],
        ['Incubació', '18 h / 35 °C', 'El protocol previst utilitza incubació a 35 °C durant 18 hores abans de la lectura visual.', 'indigo'],
        ['Lectura', 'Sense UV', 'Els resultats s’interpreten amb llum normal: groc per a coliformes totals i verd per a E. coli.', 'emerald']
      ],
      comparisonTitle: 'De fluorescència a color visible',
      comparison: [
        ['Flux fluorogènic tradicional', 'Groc més fluorescència UV', 'Requereix làmpada o cabina UV, condicions de lectura controlades i atenció periòdica a la font UV.', 58, 'slate'],
        ['Flux ENUMERA Coli 100', 'Groc més verd visible', 'Utilitza una reacció cromogènica que fa visible E. coli com a pous verds o verd blavós amb llum normal.', 92, 'emerald']
      ],
      flowTitle: 'Flux de mostra a resultat',
      flow: [
        ['Afegir la mostra', 'Introdueix la mostra d’aigua al pot d’anàlisi seguint el protocol i el volum objectiu del kit.'],
        ['Tancar el pot Smart Cap', 'El reactiu integrat entra en contacte amb la mostra en tancar el pot, reduint la manipulació manual de reactius.'],
        ['Homogeneïtzar i omplir el tray', 'Distribueix la mostra preparada al tray multipou per a l’enumeració mitjançant NMP.'],
        ['Incubar', 'Incuba a 35 °C durant 18 hores seguint la fitxa tècnica vigent.'],
        ['Llegir i comptar', 'Compta pous grocs més verds per a coliformes totals, i pous verds per a E. coli; després consulta la taula NMP.']
      ],
      timelineTitle: 'On encaixa',
      timeline: [
        ['1', 'Municipal', 'Empreses d’aigua', 'Control rutinari d’E. coli i coliformes totals sense maquinari de lectura UV.'],
        ['2', 'Laboratori', 'Laboratoris ambientals', 'Lots amb alt volum de mostres i menys passos repetitius de manipulació de reactiu.'],
        ['3', 'Industrial', 'Alimentació i begudes', 'Aigua de procés, aigua ingredient, gel, esbandides o control higiènic.'],
        ['4', 'Operacions', 'Plantes de tractament', 'Comprovacions visuals clares per verificar tractament i seguir desviacions.']
      ],
      sourceLabel: 'Nota tècnica',
      note: 'Utilitza el producte dins de les matrius, protocols i requisits de validació acceptats pel sistema de qualitat i la jurisdicció de cada laboratori.'
    }
  };
  const content = contentByLang[lang] || contentByLang.en;

  return {
    eyebrow: content.eyebrow,
    title: content.title,
    intro: content.intro,
    metrics: content.metrics.map(([label, value, body, tone]) => ({ label, value, body, tone })),
    comparisonTitle: content.comparisonTitle,
    comparison: content.comparison.map(([label, title, body, valuePercent, tone]) => ({ label, title, body, valuePercent, tone })),
    flowTitle: content.flowTitle,
    flow: content.flow.map(([title, body]) => ({ title, body })),
    timelineTitle: content.timelineTitle,
    timeline: content.timeline.map(([year, region, sector, body]) => ({ year, region, sector, body })),
    sourceLabel: content.sourceLabel,
    note: content.note
  };
}

function buildEnumeraColi100Locale(lang) {
  const assets = enumeraColi100Assets(lang);
  const copyByLang = {
    en: {
      path: '/products/enumera-coli100',
      title: 'ENUMERA® Coli 100: E. coli and total coliform counts without UV',
      description: 'ENUMERA® Coli 100 simplifies water microbiology with Smart Cap reagent release, chromogenic colour reading and multiwell MPN enumeration for Escherichia coli and total coliforms.',
      cta: 'Request a demonstration',
      secondary: 'View ENUMERA range',
      datasheet: 'Request technical datasheet',
      seoTitle: 'ENUMERA Coli 100 | E. coli and total coliform water testing without UV',
      seoDescription: 'ENUMERA Coli 100 is an AquaVerify chromogenic kit for E. coli and total coliform enumeration in 100 mL water samples, with visual reading and Smart Cap reagent delivery.',
      sections: [
        ['What is ENUMERA® Coli 100?', 'ENUMERA® Coli 100 is a water analysis system for detecting and enumerating E. coli and total coliforms in 100 mL samples. It is designed for laboratories, water operators, food and beverage companies and quality teams that need a practical routine with clear visual interpretation.', ['Chromogenic colour change instead of UV fluorescence', 'Multiwell tray format for MPN enumeration', 'Smart Cap reagent delivery integrated into the bottle closure', 'Built to connect sample context, operator and result in AquaVerify Cloud']],
        ['How it works', 'The workflow is intentionally simple: add sample, close the Smart Cap bottle, mix, fill the multiwell tray, incubate and read the colours under normal laboratory lighting.', ['Add the water sample to the analysis bottle', 'Close the Smart Cap so the integrated reagent contacts the sample', 'Homogenise and distribute into the multiwell tray', 'Incubate at 35 °C for 18 hours following the current product datasheet', 'Read visible colours and use the MPN table for enumeration']],
        ['Visible interpretation', 'ENUMERA® Coli 100 replaces weak fluorescence searches with direct colour interpretation. The technician reads the tray under normal lab light and counts the wells according to colour.', ['Clear or no colour change: negative well', 'Yellow well: total coliform positive', 'Green or blue-green well: E. coli positive and also total coliform positive', 'Total coliforms = yellow + green wells; E. coli = green wells']],
        ['Smart Cap reagent delivery', 'The Smart Cap incorporates the reagent in the bottle closure. The technician no longer needs to open sachets, pour powder manually or manage separate reagent waste for each sample.', ['Fewer repetitive preparation steps', 'Less exposure to loose powder or reagent spills', 'More consistent activation step across technicians', 'Simpler stock and routine handling for high-volume laboratories']],
        ['Use cases by industry', 'The product is suited to teams that need routine bacterial indicator monitoring with clear results and a workflow that can scale across repeated sample batches.', ['Municipal water utilities: routine E. coli and total coliform control', 'Environmental laboratories: productivity in high-volume sample batches', 'Treatment plants: verification and deviation follow-up', 'Food and beverage: process water, ingredient water, rinsing, ice and hygiene programmes', 'Agricultural, reclaimed and aquaculture water: preventive microbiological monitoring within validated matrices']],
        ['Quality and regulatory use', 'ENUMERA® Coli 100 should be used within the matrices, protocols and acceptance criteria defined by each laboratory quality system. For regulatory reporting, confirm method acceptance in the applicable jurisdiction and accreditation scope.', ['Designed for 100 mL water microbiology workflows', 'Validation evidence can support matrix, inclusivity, exclusivity, LOD and correlation discussions', 'Use the current product datasheet as the operational reference', 'Somatic coliphages require specific methods and are not detected by this kit']]
      ],
      faqs: [
        ['Does ENUMERA® Coli 100 require UV light?', 'No. Results are read by visible colour under normal laboratory lighting.'],
        ['What does a green well mean?', 'A green or blue-green well indicates E. coli. For counting purposes, it is also counted as a total coliform positive well.'],
        ['How are total coliforms counted?', 'Count all yellow and green wells, then consult the corresponding MPN table. E. coli is counted from the green wells.'],
        ['What incubation time does the workflow use?', 'The expected product protocol is 18 hours at 35 °C. Always follow the current product datasheet.'],
        ['What does Smart Cap add?', 'The reagent is integrated into the bottle closure and contacts the sample when the bottle is closed, reducing manual reagent addition steps.'],
        ['Does it detect somatic coliphages?', 'No. ENUMERA® Coli 100 is designed for E. coli and total coliforms. Somatic coliphages require specific methods.'],
        ['Can it replace another regulatory method?', 'Use depends on the matrices, protocols and validation requirements accepted by each laboratory and jurisdiction. Confirm acceptance before regulatory reporting.']
      ]
    },
    es: {
      path: '/es/productos/enumera-coli100',
      title: 'ENUMERA® Coli 100: recuento de E. coli y coliformes totales sin UV',
      description: 'ENUMERA® Coli 100 simplifica la microbiología del agua con liberación de reactivo Smart Cap, lectura cromogénica por colores y enumeración NMP en tray multipocillo para Escherichia coli y coliformes totales.',
      cta: 'Pedir una demostración',
      secondary: 'Ver gama ENUMERA',
      datasheet: 'Solicitar ficha técnica',
      seoTitle: 'ENUMERA Coli 100 | E. coli y coliformes totales en agua sin UV',
      seoDescription: 'ENUMERA Coli 100 es un kit cromogénico AquaVerify para enumerar E. coli y coliformes totales en muestras de agua de 100 mL, con lectura visual y Smart Cap.',
      sections: [
        ['¿Qué es ENUMERA® Coli 100?', 'ENUMERA® Coli 100 es un sistema de análisis para detectar y enumerar E. coli y coliformes totales en muestras de agua de 100 mL. Está diseñado para laboratorios, operadores de agua, industrias alimentarias y equipos de calidad que necesitan una rutina práctica con interpretación visual clara.', ['Cambio de color cromogénico en lugar de fluorescencia UV', 'Formato multipocillo para enumeración mediante NMP', 'Dosificación Smart Cap integrada en el cierre del bote', 'Preparado para conectar contexto de muestra, operador y resultado en AquaVerify Cloud']],
        ['Cómo funciona', 'El flujo es deliberadamente simple: añadir muestra, cerrar el bote Smart Cap, mezclar, llenar el tray multipocillo, incubar y leer los colores bajo luz normal de laboratorio.', ['Añadir la muestra de agua al bote de análisis', 'Cerrar el Smart Cap para que el reactivo integrado contacte con la muestra', 'Homogeneizar y distribuir en el tray multipocillo', 'Incubar a 35 °C durante 18 horas siguiendo la ficha técnica vigente', 'Leer colores visibles y usar la tabla NMP para la enumeración']],
        ['Interpretación visible', 'ENUMERA® Coli 100 sustituye la búsqueda de fluorescencias débiles por una interpretación directa por color. El técnico lee el tray bajo luz normal y cuenta los pocillos según el color.', ['Transparente o sin cambio de color: pocillo negativo', 'Pocillo amarillo: coliformes totales positivos', 'Pocillo verde o azul verdoso: E. coli positivo y también coliforme total positivo', 'Coliformes totales = pocillos amarillos + verdes; E. coli = pocillos verdes']],
        ['Smart Cap: reactivo integrado', 'El Smart Cap incorpora el reactivo en el propio cierre del bote. El técnico ya no necesita abrir sobres, verter polvo manualmente ni gestionar residuos de reactivo separados por cada muestra.', ['Menos pasos repetitivos de preparación', 'Menor exposición a polvo suelto o derrames de reactivo', 'Activación más consistente entre técnicos', 'Stock y rutina más simples para laboratorios con alto volumen']],
        ['Casos de uso por industria', 'El producto encaja en equipos que necesitan control rutinario de indicadores bacterianos con resultados claros y un flujo escalable a lotes repetidos de muestras.', ['Empresas municipales de agua: control rutinario de E. coli y coliformes totales', 'Laboratorios ambientales: productividad en lotes con alto volumen de muestras', 'Plantas de tratamiento: verificación y seguimiento de desviaciones', 'Alimentación y bebidas: agua de proceso, agua ingrediente, enjuagues, hielo y programas higiénicos', 'Agua agrícola, regenerada y acuicultura: seguimiento microbiológico preventivo dentro de matrices validadas']],
        ['Calidad y uso regulatorio', 'ENUMERA® Coli 100 debe utilizarse dentro de las matrices, protocolos y criterios de aceptación definidos por el sistema de calidad de cada laboratorio. Para reporting regulatorio, confirma la aceptación del método en la jurisdicción y alcance de acreditación aplicables.', ['Diseñado para flujos de microbiología del agua con muestra de 100 mL', 'La evidencia de validación puede apoyar conversaciones sobre matrices, inclusividad, exclusividad, LOD y correlación', 'La ficha técnica vigente debe ser la referencia operativa', 'Los colífagos somáticos requieren métodos específicos y no son detectados por este kit']]
      ],
      faqs: [
        ['¿ENUMERA® Coli 100 necesita luz ultravioleta?', 'No. La lectura se realiza por color visible bajo luz normal de laboratorio.'],
        ['¿Qué significa un pocillo verde?', 'Un pocillo verde o azul verdoso indica presencia de E. coli. A efectos de recuento, también se contabiliza como coliforme total positivo.'],
        ['¿Cómo se cuentan los coliformes totales?', 'Se suman todos los pocillos amarillos y verdes. Después se consulta la tabla NMP correspondiente. E. coli se cuenta a partir de los pocillos verdes.'],
        ['¿Cuál es el tiempo de incubación?', 'El protocolo previsto es 18 horas a 35 °C. Debe seguirse siempre la ficha técnica vigente del producto.'],
        ['¿Qué aporta el tapón Smart Cap?', 'El reactivo está integrado en el tapón del bote y entra en contacto con la muestra al cerrar, reduciendo pasos de adición manual de reactivo.'],
        ['¿Detecta colífagos somáticos?', 'No. ENUMERA® Coli 100 está diseñado para E. coli y coliformes totales. Los colífagos somáticos requieren métodos específicos.'],
        ['¿Sustituye a otros métodos regulatorios?', 'Depende de las matrices, protocolos y requisitos de validación aceptados por cada laboratorio y jurisdicción. Confirma la aceptación antes de reporting regulatorio.']
      ]
    },
    fr: {
      path: '/fr/produits/enumera-coli100',
      title: 'ENUMERA® Coli 100: énumération E. coli et coliformes totaux sans UV',
      description: 'ENUMERA® Coli 100 simplifie la microbiologie de l’eau avec libération de réactif Smart Cap, lecture chromogène par couleurs et énumération NPP en plateau multipuits pour Escherichia coli et coliformes totaux.',
      cta: 'Demander une démonstration',
      secondary: 'Voir la gamme ENUMERA',
      datasheet: 'Demander la fiche technique',
      seoTitle: 'ENUMERA Coli 100 | E. coli et coliformes totaux dans l’eau sans UV',
      seoDescription: 'ENUMERA Coli 100 est un kit chromogène AquaVerify pour énumérer E. coli et coliformes totaux dans des échantillons d’eau de 100 mL, avec lecture visible et Smart Cap.',
      sections: [
        ['Qu’est-ce qu’ENUMERA® Coli 100 ?', 'ENUMERA® Coli 100 est un système d’analyse pour détecter et énumérer E. coli et les coliformes totaux dans des échantillons d’eau de 100 mL. Il s’adresse aux laboratoires, opérateurs d’eau, industries agroalimentaires et équipes qualité qui recherchent une routine pratique avec lecture visuelle claire.', ['Changement de couleur chromogène au lieu de fluorescence UV', 'Format multipuits pour énumération NPP', 'Dosage Smart Cap intégré dans la fermeture du flacon', 'Prêt à relier contexte échantillon, opérateur et résultat dans AquaVerify Cloud']],
        ['Fonctionnement', 'Le flux est volontairement simple: ajouter l’échantillon, fermer le flacon Smart Cap, mélanger, remplir le plateau multipuits, incuber et lire les couleurs sous lumière normale de laboratoire.', ['Ajouter l’échantillon d’eau au flacon d’analyse', 'Fermer le Smart Cap pour mettre le réactif intégré en contact avec l’échantillon', 'Homogénéiser et répartir dans le plateau multipuits', 'Incuber à 35 °C pendant 18 heures selon la fiche technique en vigueur', 'Lire les couleurs visibles et utiliser la table NPP pour l’énumération']],
        ['Interprétation visible', 'ENUMERA® Coli 100 remplace la recherche de fluorescences faibles par une interprétation directe par couleur. Le technicien lit le plateau sous lumière normale et compte les puits selon leur couleur.', ['Transparent ou sans changement de couleur: puits négatif', 'Puits jaune: coliformes totaux positifs', 'Puits vert ou bleu-vert: E. coli positif et également coliforme total positif', 'Coliformes totaux = puits jaunes + verts; E. coli = puits verts']],
        ['Smart Cap: réactif intégré', 'Le Smart Cap incorpore le réactif dans la fermeture du flacon. Le technicien n’a plus besoin d’ouvrir des sachets, de verser de la poudre manuellement ou de gérer des déchets de réactif séparés pour chaque échantillon.', ['Moins d’étapes répétitives de préparation', 'Moins d’exposition aux poudres libres ou déversements de réactif', 'Activation plus cohérente entre techniciens', 'Stock et routine simplifiés pour laboratoires à haut volume']],
        ['Cas d’usage par secteur', 'Le produit convient aux équipes qui doivent réaliser un contrôle routinier d’indicateurs bactériens avec résultats clairs et flux extensible à des lots répétés.', ['Services d’eau municipaux: contrôle routinier E. coli et coliformes totaux', 'Laboratoires environnementaux: productivité sur lots à volume élevé', 'Stations de traitement: vérification et suivi des écarts', 'Agroalimentaire: eau de procédé, eau ingrédient, rinçages, glace et programmes hygiène', 'Eaux agricoles, réutilisées et aquaculture: suivi microbiologique préventif dans matrices validées']],
        ['Qualité et usage réglementaire', 'ENUMERA® Coli 100 doit être utilisé dans les matrices, protocoles et critères d’acceptation définis par le système qualité du laboratoire. Pour reporting réglementaire, confirmez l’acceptation de la méthode dans la juridiction et le périmètre d’accréditation applicables.', ['Conçu pour flux de microbiologie de l’eau avec échantillon 100 mL', 'Les preuves de validation peuvent soutenir les discussions sur matrices, inclusivité, exclusivité, LOD et corrélation', 'La fiche technique en vigueur reste la référence opérationnelle', 'Les coliphages somatiques exigent des méthodes spécifiques et ne sont pas détectés par ce kit']]
      ],
      faqs: [
        ['ENUMERA® Coli 100 nécessite-t-il une lumière UV ?', 'Non. La lecture se fait par couleur visible sous lumière normale de laboratoire.'],
        ['Que signifie un puits vert ?', 'Un puits vert ou bleu-vert indique E. coli. Pour le comptage, il est aussi compté comme coliforme total positif.'],
        ['Comment compter les coliformes totaux ?', 'Additionnez tous les puits jaunes et verts, puis consultez la table NPP correspondante. E. coli est compté à partir des puits verts.'],
        ['Quel est le temps d’incubation ?', 'Le protocole prévu est de 18 heures à 35 °C. Suivez toujours la fiche technique en vigueur.'],
        ['Qu’apporte le Smart Cap ?', 'Le réactif est intégré dans le bouchon du flacon et entre en contact avec l’échantillon à la fermeture, réduisant les étapes d’ajout manuel.'],
        ['Détecte-t-il les coliphages somatiques ?', 'Non. ENUMERA® Coli 100 est conçu pour E. coli et coliformes totaux. Les coliphages somatiques nécessitent des méthodes spécifiques.'],
        ['Remplace-t-il d’autres méthodes réglementaires ?', 'Cela dépend des matrices, protocoles et exigences de validation acceptés par chaque laboratoire et juridiction. Confirmez l’acceptation avant reporting réglementaire.']
      ]
    },
    it: {
      path: '/it/prodotti/enumera-coli100',
      title: 'ENUMERA® Coli 100: conteggio E. coli e coliformi totali senza UV',
      description: 'ENUMERA® Coli 100 semplifica la microbiologia dell’acqua con rilascio reagente Smart Cap, lettura cromogenica a colori ed enumerazione MPN in tray multipietto per Escherichia coli e coliformi totali.',
      cta: 'Richiedi una demo',
      secondary: 'Vedi gamma ENUMERA',
      datasheet: 'Richiedi scheda tecnica',
      seoTitle: 'ENUMERA Coli 100 | E. coli e coliformi totali in acqua senza UV',
      seoDescription: 'ENUMERA Coli 100 è un kit cromogenico AquaVerify per enumerare E. coli e coliformi totali in campioni d’acqua da 100 mL, con lettura visiva e Smart Cap.',
      sections: [
        ['Che cos’è ENUMERA® Coli 100?', 'ENUMERA® Coli 100 è un sistema di analisi per rilevare ed enumerare E. coli e coliformi totali in campioni d’acqua da 100 mL. È progettato per laboratori, operatori idrici, industrie alimentari e team qualità che necessitano di una routine pratica con interpretazione visiva chiara.', ['Cambio colore cromogenico invece di fluorescenza UV', 'Formato multipietto per enumerazione MPN', 'Dosaggio Smart Cap integrato nella chiusura del flacone', 'Pronto a collegare contesto campione, operatore e risultato in AquaVerify Cloud']],
        ['Come funziona', 'Il workflow è volutamente semplice: aggiungere il campione, chiudere il flacone Smart Cap, miscelare, riempire il tray multipietto, incubare e leggere i colori con luce normale di laboratorio.', ['Aggiungi il campione d’acqua al flacone di analisi', 'Chiudi lo Smart Cap affinché il reagente integrato contatti il campione', 'Omogeneizza e distribuisci nel tray multipietto', 'Incuba a 35 °C per 18 ore seguendo la scheda tecnica vigente', 'Leggi i colori visibili e usa la tabella MPN per l’enumerazione']],
        ['Interpretazione visibile', 'ENUMERA® Coli 100 sostituisce la ricerca di fluorescenze deboli con un’interpretazione diretta per colore. Il tecnico legge il tray con luce normale e conta i pozzetti in base al colore.', ['Trasparente o senza cambio colore: pozzetto negativo', 'Pozzetto giallo: coliformi totali positivi', 'Pozzetto verde o verde-blu: E. coli positivo e anche coliforme totale positivo', 'Coliformi totali = pozzetti gialli + verdi; E. coli = pozzetti verdi']],
        ['Smart Cap: reagente integrato', 'Lo Smart Cap integra il reagente nella chiusura del flacone. Il tecnico non deve più aprire bustine, versare polvere manualmente o gestire rifiuti di reagente separati per ogni campione.', ['Meno passaggi ripetitivi di preparazione', 'Minore esposizione a polveri libere o versamenti di reagente', 'Attivazione più coerente tra tecnici', 'Stock e routine più semplici per laboratori ad alto volume']],
        ['Casi d’uso per settore', 'Il prodotto si adatta a team che richiedono monitoraggio routinario di indicatori batterici con risultati chiari e workflow scalabile su lotti ripetuti.', ['Utility idriche municipali: controllo routinario E. coli e coliformi totali', 'Laboratori ambientali: produttività in lotti ad alto volume', 'Impianti di trattamento: verifica e follow-up delle deviazioni', 'Food & beverage: acqua di processo, acqua ingrediente, risciacqui, ghiaccio e programmi igienici', 'Acque agricole, rigenerate e acquacoltura: monitoraggio microbiologico preventivo in matrici validate']],
        ['Qualità e uso regolatorio', 'ENUMERA® Coli 100 deve essere usato entro matrici, protocolli e criteri di accettazione definiti dal sistema qualità di ciascun laboratorio. Per reporting regolatorio, confermare l’accettazione del metodo nella giurisdizione e nello scopo di accreditamento applicabili.', ['Progettato per workflow di microbiologia dell’acqua con campione da 100 mL', 'Le evidenze di validazione possono supportare discussioni su matrici, inclusività, esclusività, LOD e correlazione', 'La scheda tecnica vigente resta il riferimento operativo', 'I colifagi somatici richiedono metodi specifici e non sono rilevati da questo kit']]
      ],
      faqs: [
        ['ENUMERA® Coli 100 richiede luce ultravioletta?', 'No. La lettura avviene per colore visibile con luce normale di laboratorio.'],
        ['Cosa significa un pozzetto verde?', 'Un pozzetto verde o verde-blu indica E. coli. Ai fini del conteggio, va contato anche come coliforme totale positivo.'],
        ['Come si contano i coliformi totali?', 'Si sommano tutti i pozzetti gialli e verdi, poi si consulta la tabella MPN corrispondente. E. coli si conta dai pozzetti verdi.'],
        ['Qual è il tempo di incubazione?', 'Il protocollo previsto è 18 ore a 35 °C. Seguire sempre la scheda tecnica vigente.'],
        ['Cosa aggiunge lo Smart Cap?', 'Il reagente è integrato nel tappo del flacone ed entra in contatto con il campione alla chiusura, riducendo i passaggi di aggiunta manuale.'],
        ['Rileva colifagi somatici?', 'No. ENUMERA® Coli 100 è progettato per E. coli e coliformi totali. I colifagi somatici richiedono metodi specifici.'],
        ['Sostituisce altri metodi regolatori?', 'Dipende da matrici, protocolli e requisiti di validazione accettati da ciascun laboratorio e giurisdizione. Confermare l’accettazione prima del reporting regolatorio.']
      ]
    },
    ca: {
      path: '/ca/productes/enumera-coli100',
      title: 'ENUMERA® Coli 100: recompte d’E. coli i coliformes totals sense UV',
      description: 'ENUMERA® Coli 100 simplifica la microbiologia de l’aigua amb alliberament de reactiu Smart Cap, lectura cromogènica per colors i enumeració NMP en tray multipou per a Escherichia coli i coliformes totals.',
      cta: 'Demanar una demostració',
      secondary: 'Veure gamma ENUMERA',
      datasheet: 'Sol·licitar fitxa tècnica',
      seoTitle: 'ENUMERA Coli 100 | E. coli i coliformes totals en aigua sense UV',
      seoDescription: 'ENUMERA Coli 100 és un kit cromogènic AquaVerify per enumerar E. coli i coliformes totals en mostres d’aigua de 100 mL, amb lectura visual i Smart Cap.',
      sections: [
        ['Què és ENUMERA® Coli 100?', 'ENUMERA® Coli 100 és un sistema d’anàlisi per detectar i enumerar E. coli i coliformes totals en mostres d’aigua de 100 mL. Està dissenyat per a laboratoris, operadors d’aigua, indústries alimentàries i equips de qualitat que necessiten una rutina pràctica amb interpretació visual clara.', ['Canvi de color cromogènic en lloc de fluorescència UV', 'Format multipou per a enumeració mitjançant NMP', 'Dosificació Smart Cap integrada al tancament del pot', 'Preparat per connectar context de mostra, operador i resultat a AquaVerify Cloud']],
        ['Com funciona', 'El flux és deliberadament simple: afegir mostra, tancar el pot Smart Cap, barrejar, omplir el tray multipou, incubar i llegir els colors amb llum normal de laboratori.', ['Afegir la mostra d’aigua al pot d’anàlisi', 'Tancar l’Smart Cap perquè el reactiu integrat contacti amb la mostra', 'Homogeneïtzar i distribuir al tray multipou', 'Incubar a 35 °C durant 18 hores seguint la fitxa tècnica vigent', 'Llegir colors visibles i usar la taula NMP per a l’enumeració']],
        ['Interpretació visible', 'ENUMERA® Coli 100 substitueix la recerca de fluorescències febles per una interpretació directa per color. El tècnic llegeix el tray amb llum normal i compta els pous segons el color.', ['Transparent o sense canvi de color: pou negatiu', 'Pou groc: coliformes totals positius', 'Pou verd o verd blavós: E. coli positiu i també coliforme total positiu', 'Coliformes totals = pous grocs + verds; E. coli = pous verds']],
        ['Smart Cap: reactiu integrat', 'L’Smart Cap incorpora el reactiu al tancament del pot. El tècnic ja no necessita obrir sobres, abocar pols manualment ni gestionar residus de reactiu separats per cada mostra.', ['Menys passos repetitius de preparació', 'Menor exposició a pols solta o vessaments de reactiu', 'Activació més consistent entre tècnics', 'Estoc i rutina més simples per a laboratoris amb alt volum']],
        ['Casos d’ús per indústria', 'El producte encaixa en equips que necessiten control rutinari d’indicadors bacterians amb resultats clars i un flux escalable a lots repetits de mostres.', ['Empreses municipals d’aigua: control rutinari d’E. coli i coliformes totals', 'Laboratoris ambientals: productivitat en lots amb alt volum de mostres', 'Plantes de tractament: verificació i seguiment de desviacions', 'Alimentació i begudes: aigua de procés, aigua ingredient, esbandides, gel i programes higiènics', 'Aigua agrícola, regenerada i aqüicultura: seguiment microbiològic preventiu dins de matrius validades']],
        ['Qualitat i ús regulatori', 'ENUMERA® Coli 100 s’ha d’utilitzar dins de les matrius, protocols i criteris d’acceptació definits pel sistema de qualitat de cada laboratori. Per a reporting regulatori, confirma l’acceptació del mètode a la jurisdicció i abast d’acreditació aplicables.', ['Dissenyat per a fluxos de microbiologia de l’aigua amb mostra de 100 mL', 'L’evidència de validació pot donar suport a converses sobre matrius, inclusivitat, exclusivitat, LOD i correlació', 'La fitxa tècnica vigent ha de ser la referència operativa', 'Els colífags somàtics requereixen mètodes específics i no són detectats per aquest kit']]
      ],
      faqs: [
        ['ENUMERA® Coli 100 necessita llum ultraviolada?', 'No. La lectura es fa per color visible amb llum normal de laboratori.'],
        ['Què significa un pou verd?', 'Un pou verd o verd blavós indica presència d’E. coli. A efectes de recompte, també es comptabilitza com a coliforme total positiu.'],
        ['Com es compten els coliformes totals?', 'Se sumen tots els pous grocs i verds. Després es consulta la taula NMP corresponent. E. coli es compta a partir dels pous verds.'],
        ['Quin és el temps d’incubació?', 'El protocol previst és 18 hores a 35 °C. Cal seguir sempre la fitxa tècnica vigent del producte.'],
        ['Què aporta el tap Smart Cap?', 'El reactiu està integrat al tap del pot i entra en contacte amb la mostra en tancar, reduint passos d’addició manual de reactiu.'],
        ['Detecta colífags somàtics?', 'No. ENUMERA® Coli 100 està dissenyat per a E. coli i coliformes totals. Els colífags somàtics requereixen mètodes específics.'],
        ['Substitueix altres mètodes regulatoris?', 'Depèn de les matrius, protocols i requisits de validació acceptats per cada laboratori i jurisdicció. Confirma l’acceptació abans del reporting regulatori.']
      ]
    }
  };
  const copy = copyByLang[lang] || copyByLang.en;

  return locale(
    copy.path,
    copy.title,
    copy.description,
    copy.sections.map(([title, body, bullets]) => section(title, body, bullets)),
    {
      eyebrow: 'ENUMERA',
      primaryCta: copy.cta,
      secondaryCta: copy.secondary,
      datasheetLabel: copy.datasheet,
      seoTitle: copy.seoTitle,
      seoDescription: copy.seoDescription,
      faqs: copy.faqs.map(([question, answer]) => ({ question, answer })),
      whitepaper: enumeraColi100Whitepaper(lang),
      ...assets
    }
  );
}

function buildProductLocale(product, lang) {
  if (product.id === 'enumera-coli100') {
    return buildEnumeraColi100Locale(lang);
  }

  const labels = PRODUCT_UI[lang];
  const family = i18n(FAMILY_LABELS[product.parentId], lang);
  const productType = i18n(product.type, lang);
  const parameter = i18n(product.parameter, lang);
  const description = buildProductDescription(product, lang);

  return locale(
    getProductPagePath(product, lang),
    `${product.name}: ${parameter}`,
    description,
    [
      section(labels.productRole, description, [
        `${labels.family}: ${family}`,
        `${labels.subFamily}: ${product.subFamily}`,
        `${labels.format}: ${product.format}`,
        `${labels.parameter}: ${parameter}`
      ]),
      section(labels.technicalFit, labels.disclaimer, [
        `${labels.method}: ${product.method}`,
        `${labels.volume}: ${product.volume}`,
        `${labels.format}: ${product.format}`
      ]),
      section(labels.connectedWorkflow, labels.bridge, [
        ...labels.workflowBullets
      ])
    ],
    {
      eyebrow: family,
      primaryCta: labels.cta,
      secondaryCta: labels.secondary,
      seoTitle: `${product.name} | AquaVerify ${family}`,
      seoDescription: description,
      faqs: buildProductFaqs(product, lang),
      ...getProductAssetOptions(product.id, lang, `${product.name} AquaVerify product visual`)
    }
  );
}

function buildProductDetailPages() {
  return PRODUCT_DETAIL_DATA.map((product) => page(
    product.id,
    'products',
    'quote',
    Object.fromEntries(MARKETING_LANGUAGES.map((lang) => [lang, buildProductLocale(product, lang)])),
    {
      parentId: product.parentId,
      schemaType: 'Product',
      productName: product.name
    }
  ));
}

MARKETING_PAGES.push(...buildProductDetailPages());

export function normalizePath(pathname) {
  const normalized = pathname.split('?')[0].split('#')[0].replace(/\/+$/, '');
  return normalized || '/';
}

export function findMarketingPageByPath(pathname) {
  const path = normalizePath(pathname);
  for (const page of MARKETING_PAGES) {
    for (const lang of MARKETING_LANGUAGES) {
      if (normalizePath(page.translations[lang]?.path || '') === path) {
        return { page, lang, content: page.translations[lang] };
      }
    }
  }
  return null;
}

export function getMarketingPagePath(id, lang = 'en') {
  const page = MARKETING_PAGES.find((item) => item.id === id);
  return page?.translations[lang]?.path || page?.translations.en?.path || '/';
}

export function getMarketingPageSummary(id, lang = 'en') {
  const page = MARKETING_PAGES.find((item) => item.id === id);
  if (!page) return null;
  const content = page.translations[lang] || page.translations.en;
  return {
    id: page.id,
    title: content.title,
    description: content.description,
    path: content.path
  };
}

export function getMarketingAlternates(page) {
  return Object.fromEntries(
    MARKETING_LANGUAGES.map((lang) => [lang, page.translations[lang]?.path]).filter(([, path]) => Boolean(path))
  );
}

export function getRelatedMarketingPages(currentId, lang = 'en') {
  const current = MARKETING_PAGES.find((page) => page.id === currentId);
  if (!current) return [];

  const children = MARKETING_PAGES.filter((page) => page.parentId === currentId);
  const candidates = children.length > 0
    ? children
    : current.parentId
      ? [
          MARKETING_PAGES.find((page) => page.id === current.parentId),
          ...MARKETING_PAGES.filter((page) => page.parentId === current.parentId && page.id !== currentId)
        ].filter(Boolean)
      : MARKETING_PAGES.filter((page) => page.id !== currentId && page.category === current.category);

  const limit = current.id === 'resources' ? 12 : 4;

  return candidates.slice(0, limit)
    .map((page) => ({
      id: page.id,
      title: page.translations[lang]?.title || page.translations.en.title,
      description: page.translations[lang]?.description || page.translations.en.description,
      path: page.translations[lang]?.path || page.translations.en.path
    }));
}

export { productLinks };
