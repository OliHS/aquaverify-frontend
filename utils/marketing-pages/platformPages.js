import { locale, page, section } from './shared.js';

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

const PLATFORM_ES_DIRECT_ANSWER = {
  title: '¿AquaVerify Cloud es un LIMS, un CRM o una plataforma completa?',
  body: 'AquaVerify Cloud es una plataforma digital para operaciones de calidad del agua que puede combinar funciones de CRM, LIMS, ELN, CoA, portal cliente, inventario, lotes, trazabilidad documental y reporting. Puede complementar o sustituir partes de un flujo existente según configuración, alcance y madurez digital del laboratorio o empresa. Su objetivo es conectar muestra, método, resultado, evidencia y acción.'
};

const PLATFORM_ES_TECHNICAL_TABLE = {
  title: 'Módulos y evidencia operativa',
  columns: ['Módulo', 'Para qué sirve', 'Usuario principal', 'Evidencia que ayuda a documentar'],
  rows: [
    ['CRM', 'Organizar cuentas, contactos, oportunidades y contexto comercial.', 'Ventas, soporte y dirección comercial.', 'Origen de solicitud, empresa, contacto, intención y seguimiento.'],
    ['LIMS', 'Gestionar muestra, recepción, hoja de trabajo, resultado y revisión.', 'Laboratorio y calidad.', 'Muestra, método, operador, lote, lectura, estado e informe.'],
    ['ELN', 'Documentar protocolos, observaciones, ejecución técnica y revisión.', 'Equipos técnicos y QA.', 'Procedimiento, versión, evidencias, comentarios y revisión.'],
    ['Portal cliente', 'Centralizar solicitudes, estados, informes y comunicación externa.', 'Cliente final y soporte.', 'Solicitud, descarga, historial, mensajes y acceso documental.'],
    ['Inventario/lotes', 'Relacionar producto, stock, lote, caducidad y uso operativo.', 'Operaciones, almacén y laboratorio.', 'Lote, movimiento, disponibilidad, uso y trazabilidad de material.'],
    ['Dashboards', 'Visualizar carga, estados, indicadores y riesgos operativos.', 'Dirección, operaciones y calidad.', 'KPIs, tendencias, incidencias y seguimiento de acciones.']
  ]
};

const PLATFORM_DIRECT_ANSWERS = {
  en: {
    title: 'Is AquaVerify Cloud a LIMS, a CRM or a complete platform?',
    body: 'AquaVerify Cloud is a digital platform for water quality operations that can combine CRM, LIMS, ELN, CoA, customer portal, inventory, lots, documentary traceability and reporting. It can complement parts of an existing workflow depending on configuration, scope and digital maturity. Its goal is to connect sample, method, result, evidence and action.'
  },
  fr: {
    title: 'AquaVerify Cloud est-il un LIMS, un CRM ou une plateforme complète ?',
    body: 'AquaVerify Cloud est une plateforme digitale pour les opérations de qualité de l’eau qui peut combiner CRM, LIMS, ELN, CoA, portail client, inventaire, lots, traçabilité documentaire et reporting. Elle peut compléter certaines parties d’un flux existant selon la configuration, le périmètre et la maturité digitale. Son objectif est de relier échantillon, méthode, résultat, preuve et action.'
  },
  it: {
    title: 'AquaVerify Cloud è un LIMS, un CRM o una piattaforma completa?',
    body: 'AquaVerify Cloud è una piattaforma digitale per le operazioni di qualità dell’acqua che può combinare CRM, LIMS, ELN, CoA, portale clienti, inventario, lotti, tracciabilità documentale e reporting. Può integrare parti di un flusso esistente secondo configurazione, ambito e maturità digitale. Il suo obiettivo è collegare campione, metodo, risultato, evidenza e azione.'
  },
  ca: {
    title: 'AquaVerify Cloud és un LIMS, un CRM o una plataforma completa?',
    body: 'AquaVerify Cloud és una plataforma digital per a operacions de qualitat de l’aigua que pot combinar CRM, LIMS, ELN, CoA, portal client, inventari, lots, traçabilitat documental i reporting. Pot complementar parts d’un flux existent segons configuració, abast i maduresa digital. El seu objectiu és connectar mostra, mètode, resultat, evidència i acció.'
  }
};

const PLATFORM_TECHNICAL_TABLES = {
  en: {
    title: 'Modules and operational evidence',
    columns: ['Module', 'What it supports', 'Main user', 'Evidence it can help document'],
    rows: [
      ['CRM', 'Organize accounts, contacts, opportunities and commercial context.', 'Sales, support and commercial leadership.', 'Request source, company, contact, intent and follow-up.'],
      ['LIMS', 'Manage sample, reception, worksheet, result and review.', 'Laboratory and quality teams.', 'Sample, method, operator, lot, reading, status and report.'],
      ['ELN', 'Document protocols, observations, technical execution and review.', 'Technical teams and QA.', 'Procedure, version, evidence, comments and review.'],
      ['Customer portal', 'Centralize requests, status, reports and external communication.', 'End customer and support.', 'Request, download, history, messages and document access.'],
      ['Inventory/lots', 'Connect product, stock, lot, expiry and operational use.', 'Operations, warehouse and laboratory.', 'Lot, movement, availability, use and material traceability.'],
      ['Dashboards', 'Visualize workload, status, indicators and operational risks.', 'Management, operations and quality.', 'KPIs, trends, incidents and action tracking.']
    ]
  },
  fr: {
    title: 'Modules et preuves opérationnelles',
    columns: ['Module', 'Rôle', 'Utilisateur principal', 'Preuve qu’il peut aider à documenter'],
    rows: [
      ['CRM', 'Organiser comptes, contacts, opportunités et contexte commercial.', 'Ventes, support et direction commerciale.', 'Origine de demande, entreprise, contact, intention et suivi.'],
      ['LIMS', 'Gérer échantillon, réception, feuille de travail, résultat et revue.', 'Laboratoire et qualité.', 'Échantillon, méthode, opérateur, lot, lecture, statut et rapport.'],
      ['ELN', 'Documenter protocoles, observations, exécution technique et revue.', 'Équipes techniques et QA.', 'Procédure, version, preuves, commentaires et revue.'],
      ['Portail client', 'Centraliser demandes, statuts, rapports et communication externe.', 'Client final et support.', 'Demande, téléchargement, historique, messages et accès documentaire.'],
      ['Inventaire/lots', 'Relier produit, stock, lot, péremption et usage opérationnel.', 'Opérations, entrepôt et laboratoire.', 'Lot, mouvement, disponibilité, usage et traçabilité matériel.'],
      ['Dashboards', 'Visualiser charge, statuts, indicateurs et risques opérationnels.', 'Direction, opérations et qualité.', 'KPIs, tendances, incidents et suivi des actions.']
    ]
  },
  it: {
    title: 'Moduli ed evidenza operativa',
    columns: ['Modulo', 'A cosa serve', 'Utente principale', 'Evidenza che può aiutare a documentare'],
    rows: [
      ['CRM', 'Organizzare account, contatti, opportunità e contesto commerciale.', 'Vendite, supporto e direzione commerciale.', 'Origine richiesta, azienda, contatto, intento e follow-up.'],
      ['LIMS', 'Gestire campione, ricezione, worksheet, risultato e revisione.', 'Laboratorio e qualità.', 'Campione, metodo, operatore, lotto, lettura, stato e report.'],
      ['ELN', 'Documentare protocolli, osservazioni, esecuzione tecnica e revisione.', 'Team tecnici e QA.', 'Procedura, versione, evidenze, commenti e revisione.'],
      ['Portale clienti', 'Centralizzare richieste, stati, report e comunicazione esterna.', 'Cliente finale e supporto.', 'Richiesta, download, storico, messaggi e accesso documentale.'],
      ['Inventario/lotti', 'Collegare prodotto, stock, lotto, scadenza e uso operativo.', 'Operations, magazzino e laboratorio.', 'Lotto, movimento, disponibilità, uso e tracciabilità materiali.'],
      ['Dashboard', 'Visualizzare carico, stati, indicatori e rischi operativi.', 'Direzione, operations e qualità.', 'KPI, trend, incidenti e monitoraggio azioni.']
    ]
  },
  ca: {
    title: 'Mòduls i evidència operativa',
    columns: ['Mòdul', 'Per a què serveix', 'Usuari principal', 'Evidència que pot ajudar a documentar'],
    rows: [
      ['CRM', 'Organitzar comptes, contactes, oportunitats i context comercial.', 'Vendes, suport i direcció comercial.', 'Origen de sol·licitud, empresa, contacte, intenció i seguiment.'],
      ['LIMS', 'Gestionar mostra, recepció, full de treball, resultat i revisió.', 'Laboratori i qualitat.', 'Mostra, mètode, operador, lot, lectura, estat i informe.'],
      ['ELN', 'Documentar protocols, observacions, execució tècnica i revisió.', 'Equips tècnics i QA.', 'Procediment, versió, evidències, comentaris i revisió.'],
      ['Portal client', 'Centralitzar sol·licituds, estats, informes i comunicació externa.', 'Client final i suport.', 'Sol·licitud, descàrrega, historial, missatges i accés documental.'],
      ['Inventari/lots', 'Relacionar producte, estoc, lot, caducitat i ús operatiu.', 'Operacions, magatzem i laboratori.', 'Lot, moviment, disponibilitat, ús i traçabilitat de material.'],
      ['Dashboards', 'Visualitzar càrrega, estats, indicadors i riscos operatius.', 'Direcció, operacions i qualitat.', 'KPIs, tendències, incidències i seguiment d’accions.']
    ]
  }
};

function answerSectionsFrom({ directAnswer, technicalTable }) {
  return [
    directAnswer
      ? {
          kind: 'directAnswer',
          title: directAnswer.title,
          body: directAnswer.body
        }
      : null,
    technicalTable
      ? {
          kind: 'technicalTable',
          title: technicalTable.title,
          table: technicalTable
        }
      : null
  ].filter(Boolean);
}

function platformLocaleWithAnswer(lang, path, title, description, sections, options) {
  const directAnswer = PLATFORM_DIRECT_ANSWERS[lang];
  const technicalTable = PLATFORM_TECHNICAL_TABLES[lang];
  return {
    ...locale(path, title, description, [
      ...answerSectionsFrom({ directAnswer, technicalTable }),
      ...sections
    ], options),
    directAnswer,
    technicalTable
  };
}

export const PLATFORM_MARKETING_PAGES = [
  page('platform', 'platform', 'demo', {
    en: platformLocaleWithAnswer('en', '/platform', 'AquaVerify Cloud: complete platform for laboratory, commercial and operational workflows', 'AquaVerify Cloud connects CRM, LIMS, ELN, Work, AquaMail, AquaChat, inventory, WMS, logistics, finance, customer portal, dashboards and AquaAI in one traceable platform.', [
      section('A complete platform, not another isolated module', 'AquaVerify Cloud is built for organizations where water analysis, product supply, customer communication and business execution must move together. The same platform can support AquaVerify product workflows, laboratory operations, distributor activity and SaaS deployments for biotech or quality teams.', ['CRM, Sales and customer 360 records', 'LIMS, ELN, validation studies and reports', 'Work boards, tasks, AquaMail, AquaChat and meetings', 'Inventory, WMS, logistics, finance and executive dashboards']),
      section('LIMS and ELN: from sample reception to validated report', 'The laboratory layer manages sampling points, sample reception, work sheets, result capture, technical review, COA/report generation, protocols, ELN notebooks and validation studies. It is designed so each analytical result keeps its context: client, site, operator, method, worksheet, reviewer and report output.', ['Sampling points and sample hub', 'Worksheet execution and technical validation', 'ELN protocols, experiments and QA approvals', 'Customer portal publication and report history']),
      section('CRM, Sales and Portal: the commercial cycle stays connected', 'The platform connects the buyer journey from signup and CRM qualification to quotations, product orders, support tickets, portal requests and customer follow-up. Teams can see who the customer is, what they requested, which products or analyses matter, and what operational work is already in motion.', ['Corporate web source and intent context', 'Company 360 with contacts, activity and documents', 'Quotations, orders and customer portal visibility', 'Support tickets and account history']),
      section('Work, communication and AquaAI: execution without losing context', 'Projects, boards, tasks, calendar, documents, AquaMail, AquaChat and meetings are part of the same operational environment. Messages can become tasks, emails can become tickets, documents stay attached to the right customer or project, and AquaAI helps users understand flows, modules and next actions.', ['Task boards and personal workdesk', 'Shared mailboxes and customer threads', 'Chat, meetings and document editor', 'AquaAI guidance connected to platform manuals']),
      section('Inventory, WMS, logistics and finance: operational truth reaches the back office', 'When a quotation becomes a confirmed order, the platform can connect demand, stock availability, picking, shipment, invoicing, treasury and accounting. The goal is to avoid a gap between commercial promise, laboratory execution, physical product movement and financial reality.', ['Demand, reservations and stock pressure', 'Warehouse movements, picking and delivery evidence', 'Invoices, expenses, cash and accounting records', 'Executive dashboard for margin, workload and risk']),
      section('Governance, roles and multi-tenant control', 'AquaVerify Cloud is prepared for internal teams, distributors, laboratories, customers and SaaS tenants with role-based access, language preferences, onboarding, legal consent, document templates and audit-oriented status history. Each user sees the modules and actions that match their role.', ['Multi-tenant model for HQ, distributors, labs and customers', 'Role-aware navigation and permissions', 'Spanish, English, French, Italian and Catalan interfaces', 'Audit trail, legal consent and status visibility'])
    ], { eyebrow: 'Platform', primaryCta: 'Request platform demo', secondaryCta: 'See SaaS option', seoTitle: 'AquaVerify Cloud Platform | LIMS, CRM, Work, WMS, Finance and AquaAI', seoDescription: 'Explore AquaVerify Cloud: a complete platform for water analysis workflows, CRM, LIMS, ELN, Work, inventory, WMS, finance, customer portal and AquaAI.', whitepaper: platformDeepDive('en'), faqs: [
      { question: 'Does AquaVerify Cloud replace a LIMS?', answer: 'AquaVerify Cloud can cover LIMS-style workflows and complement existing systems, but the decision should be evaluated case by case according to requirements, integrations, users, historical data, laboratory scope and operational configuration.' },
      { question: 'How does AquaVerify Cloud document lot, operator, method and result?', answer: 'The platform can help record sample, lot, operator, method, reading, review, status and report in a traceable workflow. The exact setup depends on process, permissions, templates and documentary needs.' },
      { question: 'Can AquaVerify Cloud generate CoA documents?', answer: 'AquaVerify Cloud can support the generation and document management of CoA files and analysis reports depending on configuration, available data, templates and internal process. Issued content should be reviewed within the applicable quality system and laboratory scope.' },
      { question: 'Can AquaVerify Cloud be used without AquaVerify kits?', answer: 'Yes. It can be evaluated as a digital layer for water quality operations, laboratory workflows, reporting or customer portal use. Scope depends on the existing workflow, required modules, integrations and team maturity.' },
      { question: 'What if the laboratory currently works with Excel?', answer: 'AquaVerify Cloud can help teams move gradually from spreadsheets to structured records, documentary traceability, templates, roles and customer portal workflows. The first step is usually mapping current samples, methods, results, CoA documents and responsibilities.' }
    ], ...platformVisualOptions('en', { hero: 'dashboard', galleryIds: ['dashboard', 'lims', 'crm', 'portal', 'work', 'wms', 'finance'] }) }),
    es: {
      ...locale('/es/plataforma', 'AquaVerify Cloud: plataforma completa para laboratorio, negocio y operaciones', 'AquaVerify Cloud conecta CRM, LIMS, ELN, Work, AquaMail, AquaChat, inventario, WMS, logística, finanzas, portal cliente, dashboards y AquaAI en una sola plataforma trazable.', [
      ...answerSectionsFrom({
        directAnswer: PLATFORM_ES_DIRECT_ANSWER,
        technicalTable: PLATFORM_ES_TECHNICAL_TABLE
      }),
      section('Una plataforma completa, no otro módulo aislado', 'AquaVerify Cloud está construida para organizaciones donde análisis de agua, suministro de producto, comunicación con clientes y ejecución del negocio deben avanzar juntos. La misma plataforma puede soportar flujos con productos AquaVerify, operación de laboratorio, actividad de distribuidores y despliegues SaaS para biotech o equipos de calidad.', ['CRM, Sales y ficha 360 de cliente', 'LIMS, ELN, estudios de validación e informes', 'Work, tareas, AquaMail, AquaChat y reuniones', 'Inventario, WMS, logística, finanzas y dashboards ejecutivos']),
      section('LIMS y ELN: de la recepción de muestra al informe validado', 'La capa de laboratorio gestiona puntos de muestreo, recepción de muestras, hojas de trabajo, captura de resultados, revisión técnica, generación de COA/informes, protocolos, cuadernos ELN y estudios de validación. Está pensada para que cada resultado mantenga su contexto: cliente, ubicación, operador, método, hoja, revisor e informe.', ['Puntos de muestreo y ficha de muestra', 'Ejecución de hojas y validación técnica', 'Protocolos ELN, experimentos y aprobaciones QA', 'Publicación en portal cliente e historial de informes']),
      section('CRM, Sales y Portal: el ciclo comercial queda conectado', 'La plataforma conecta el recorrido comprador desde signup y cualificación CRM hasta presupuestos, pedidos de producto, tickets de soporte, solicitudes de portal y seguimiento del cliente. El equipo puede ver quién es el cliente, qué pidió, qué productos o análisis importan y qué trabajo operativo está en marcha.', ['Origen web e intención comercial', 'Empresa 360 con contactos, actividad y documentos', 'Presupuestos, pedidos y visibilidad en portal', 'Soporte e historial de cuenta']),
      section('Work, comunicación y AquaAI: ejecución sin perder contexto', 'Proyectos, tableros, tareas, calendario, documentos, AquaMail, AquaChat y reuniones viven en el mismo entorno operativo. Los mensajes pueden convertirse en tareas, los emails en tickets, los documentos quedan asociados al cliente o proyecto correcto y AquaAI ayuda a entender flujos, módulos y siguientes acciones.', ['Tableros y bandeja personal de tareas', 'Buzones compartidos e hilos de cliente', 'Chat, reuniones y editor documental', 'AquaAI conectado a manuales de plataforma']),
      section('Inventario, WMS, logística y finanzas: la verdad operativa llega al back office', 'Cuando un presupuesto se convierte en pedido confirmado, la plataforma puede conectar demanda, disponibilidad de stock, picking, envío, facturación, tesorería y contabilidad. El objetivo es evitar el hueco entre promesa comercial, ejecución de laboratorio, movimiento físico de producto y realidad financiera.', ['Demanda, reservas y presión de stock', 'Movimientos de almacén, picking y evidencia de entrega', 'Facturas, gastos, caja y asientos contables', 'Dashboard ejecutivo de margen, carga y riesgo']),
      section('Gobernanza, roles y control multi-tenant', 'AquaVerify Cloud está preparada para equipos internos, distribuidores, laboratorios, clientes y tenants SaaS con accesos por rol, preferencias de idioma, onboarding, consentimiento legal, plantillas documentales e historial de estados orientado a auditoría. Cada usuario ve los módulos y acciones que le corresponden.', ['Modelo multi-tenant para HQ, distribuidores, labs y clientes', 'Navegación y permisos según rol', 'Interfaces en español, inglés, francés, italiano y catalán', 'Audit trail, consentimiento legal y visibilidad de estados'])
    ], { eyebrow: 'Plataforma', primaryCta: 'Solicitar demo plataforma', secondaryCta: 'Ver opción SaaS', seoTitle: 'AquaVerify Cloud Platform | LIMS, CRM, Work, WMS, Finanzas y AquaAI', seoDescription: 'Explora AquaVerify Cloud: plataforma completa para análisis de agua, CRM, LIMS, ELN, Work, inventario, WMS, finanzas, portal cliente y AquaAI.', whitepaper: platformDeepDive('es'), faqs: [
      { question: '¿AquaVerify Cloud sustituye a un LIMS?', answer: 'AquaVerify Cloud puede cubrir flujos tipo LIMS y complementar sistemas existentes, pero debe evaluarse caso por caso según requisitos, integraciones, usuarios, datos históricos, alcance del laboratorio y configuración operativa.' },
      { question: '¿Cómo documenta AquaVerify Cloud lote, operador, método y resultado?', answer: 'La plataforma puede ayudar a registrar muestra, lote, operador, método, lectura, revisión, estado e informe en un mismo flujo trazable. La configuración concreta depende del proceso, permisos, plantillas y necesidades documentales de cada organización.' },
      { question: '¿AquaVerify Cloud genera CoA o informes de análisis?', answer: 'AquaVerify Cloud puede apoyar la generación y gestión documental de CoA e informes de análisis según configuración, datos disponibles, plantillas y proceso interno. El contenido emitido debe revisarse dentro del sistema de calidad y alcance aplicable de cada laboratorio.' },
      { question: '¿Se puede usar AquaVerify Cloud sin comprar kits AquaVerify?', answer: 'Sí, puede evaluarse como capa digital para operaciones de calidad del agua, laboratorio, reporting o portal cliente. El alcance se define según el flujo existente, módulos necesarios, integraciones y madurez digital del equipo.' },
      { question: '¿Qué pasa si el laboratorio trabaja hoy con Excel?', answer: 'AquaVerify Cloud puede ayudar a migrar progresivamente desde hojas de cálculo hacia registros estructurados, trazabilidad documental, plantillas, roles y portal cliente. El primer paso suele ser mapear muestras, métodos, resultados, CoA y responsabilidades actuales.' }
    ], ...platformVisualOptions('es', { hero: 'dashboard', galleryIds: ['dashboard', 'lims', 'crm', 'portal', 'work', 'wms', 'finance'] }) }),
      directAnswer: PLATFORM_ES_DIRECT_ANSWER,
      technicalTable: PLATFORM_ES_TECHNICAL_TABLE
    },
    fr: platformLocaleWithAnswer('fr', '/fr/plateforme', 'AquaVerify Cloud: plateforme complète pour laboratoire, business et opérations', 'AquaVerify Cloud connecte CRM, LIMS, ELN, Work, AquaMail, AquaChat, inventaire, WMS, logistique, finance, portail client, dashboards et AquaAI dans une seule plateforme traçable.', [
      section('Une plateforme complète, pas un module isolé de plus', 'AquaVerify Cloud est construite pour les organisations où analyse de l’eau, fourniture produit, communication client et exécution métier doivent avancer ensemble. La même plateforme peut supporter les flux produits AquaVerify, l’opération laboratoire, l’activité distributeur et les déploiements SaaS pour biotech ou équipes qualité.', ['CRM, Sales et fiche client 360', 'LIMS, ELN, études de validation et rapports', 'Work, tâches, AquaMail, AquaChat et réunions', 'Inventaire, WMS, logistique, finance et dashboards exécutifs']),
      section('LIMS et ELN: de la réception échantillon au rapport validé', 'La couche laboratoire gère points de prélèvement, réception échantillons, feuilles de travail, capture résultats, revue technique, génération COA/rapports, protocoles, cahiers ELN et études de validation. Chaque résultat garde son contexte: client, site, opérateur, méthode, feuille, réviseur et sortie rapport.', ['Points de prélèvement et fiche échantillon', 'Exécution feuilles et validation technique', 'Protocoles ELN, expériences et approbations QA', 'Publication portail client et historique rapports']),
      section('CRM, Sales et Portail: le cycle commercial reste connecté', 'La plateforme relie le parcours acheteur depuis signup et qualification CRM jusqu’aux devis, commandes produit, tickets support, demandes portail et suivi client. Les équipes voient qui est le client, ce qu’il demande, quels produits ou analyses comptent et quel travail opérationnel est en cours.', ['Source web et intention commerciale', 'Entreprise 360 avec contacts, activité et documents', 'Devis, commandes et visibilité portail', 'Support et historique de compte']),
      section('Work, communication et AquaAI: exécuter sans perdre le contexte', 'Projets, tableaux, tâches, calendrier, documents, AquaMail, AquaChat et réunions font partie du même environnement opérationnel. Les messages peuvent devenir tâches, les emails tickets, les documents restent attachés au bon client ou projet et AquaAI aide à comprendre flux, modules et actions suivantes.', ['Tableaux de tâches et workdesk personnel', 'Boîtes partagées et fils client', 'Chat, réunions et éditeur documentaire', 'AquaAI connecté aux manuels plateforme']),
      section('Inventaire, WMS, logistique et finance: la vérité opérationnelle arrive au back office', 'Lorsqu’un devis devient commande confirmée, la plateforme peut relier demande, disponibilité stock, picking, expédition, facturation, trésorerie et comptabilité. L’objectif est d’éviter l’écart entre promesse commerciale, exécution laboratoire, mouvement physique produit et réalité financière.', ['Demande, réservations et pression stock', 'Mouvements entrepôt, picking et preuve livraison', 'Factures, dépenses, cash et écritures comptables', 'Dashboard exécutif marge, charge et risque']),
      section('Gouvernance, rôles et contrôle multi-tenant', 'AquaVerify Cloud est prête pour équipes internes, distributeurs, laboratoires, clients et tenants SaaS avec accès par rôle, préférences de langue, onboarding, consentement légal, modèles documentaires et historique de statuts orienté audit. Chaque utilisateur voit les modules et actions adaptés à son rôle.', ['Modèle multi-tenant pour HQ, distributeurs, labs et clients', 'Navigation et permissions selon rôle', 'Interfaces en espagnol, anglais, français, italien et catalan', 'Audit trail, consentement légal et visibilité statuts'])
    ], { eyebrow: 'Plateforme', primaryCta: 'Demander une démo', secondaryCta: 'Voir l’option SaaS', seoTitle: 'AquaVerify Cloud Platform | LIMS, CRM, Work, WMS, Finance et AquaAI', seoDescription: 'Découvrez AquaVerify Cloud: plateforme complète pour analyse de l’eau, CRM, LIMS, ELN, Work, inventaire, WMS, finance, portail client et AquaAI.', whitepaper: platformDeepDive('fr'), faqs: [
      { question: 'AquaVerify Cloud remplace-t-il un LIMS ?', answer: 'AquaVerify Cloud peut couvrir des flux de type LIMS et compléter des systèmes existants, mais la décision doit être évaluée au cas par cas selon exigences, intégrations, utilisateurs, données historiques, périmètre laboratoire et configuration opérationnelle.' },
      { question: 'Comment AquaVerify Cloud documente-t-il lot, opérateur, méthode et résultat ?', answer: 'La plateforme peut aider à enregistrer échantillon, lot, opérateur, méthode, lecture, revue, statut et rapport dans un même flux traçable. La configuration précise dépend du processus, des permissions, des modèles et des besoins documentaires.' },
      { question: 'AquaVerify Cloud peut-il générer des documents CoA ?', answer: 'AquaVerify Cloud peut soutenir la génération et la gestion documentaire de CoA et de rapports d’analyse selon configuration, données disponibles, modèles et processus interne. Le contenu émis doit être revu dans le système qualité et le périmètre applicable.' },
      { question: 'AquaVerify Cloud peut-il être utilisé sans kits AquaVerify ?', answer: 'Oui, il peut être évalué comme couche digitale pour les opérations de qualité de l’eau, les flux laboratoire, le reporting ou le portail client. Le périmètre dépend du flux existant, des modules nécessaires, des intégrations et de la maturité de l’équipe.' },
      { question: 'Que faire si le laboratoire travaille aujourd’hui avec Excel ?', answer: 'AquaVerify Cloud peut aider à migrer progressivement de feuilles de calcul vers des enregistrements structurés, traçabilité documentaire, modèles, rôles et portail client. La première étape consiste souvent à cartographier échantillons, méthodes, résultats, CoA et responsabilités.' }
    ], ...platformVisualOptions('fr', { hero: 'dashboard', galleryIds: ['dashboard', 'lims', 'crm', 'portal', 'work', 'wms', 'finance'] }) }),
    it: platformLocaleWithAnswer('it', '/it/piattaforma', 'AquaVerify Cloud: piattaforma completa per laboratorio, business e operations', 'AquaVerify Cloud collega CRM, LIMS, ELN, Work, AquaMail, AquaChat, inventario, WMS, logistica, finanza, portale clienti, dashboard e AquaAI in un’unica piattaforma tracciabile.', [
      section('Una piattaforma completa, non un altro modulo isolato', 'AquaVerify Cloud è costruita per organizzazioni in cui analisi dell’acqua, fornitura prodotto, comunicazione cliente ed esecuzione business devono avanzare insieme. La stessa piattaforma può supportare workflow con prodotti AquaVerify, operazioni di laboratorio, attività distributori e deployment SaaS per biotech o team qualità.', ['CRM, Sales e scheda cliente 360', 'LIMS, ELN, studi di validazione e report', 'Work, task, AquaMail, AquaChat e meeting', 'Inventario, WMS, logistica, finanza e dashboard executive']),
      section('LIMS ed ELN: dalla ricezione campione al report validato', 'Il layer laboratorio gestisce punti di campionamento, ricezione campioni, worksheet, acquisizione risultati, review tecnica, generazione COA/report, protocolli, notebook ELN e studi di validazione. Ogni risultato mantiene contesto: cliente, sito, operatore, metodo, worksheet, reviewer e output report.', ['Punti di campionamento e sample hub', 'Esecuzione worksheet e validazione tecnica', 'Protocolli ELN, esperimenti e approvazioni QA', 'Pubblicazione portale clienti e storico report']),
      section('CRM, Sales e Portale: il ciclo commerciale resta connesso', 'La piattaforma collega il buyer journey da signup e qualificazione CRM a preventivi, ordini prodotto, ticket supporto, richieste portale e follow-up cliente. I team vedono chi è il cliente, cosa ha richiesto, quali prodotti o analisi contano e quale lavoro operativo è in corso.', ['Sorgente web e intento commerciale', 'Azienda 360 con contatti, attività e documenti', 'Preventivi, ordini e visibilità portale', 'Supporto e storico account']),
      section('Work, comunicazione e AquaAI: esecuzione senza perdere contesto', 'Progetti, board, task, calendario, documenti, AquaMail, AquaChat e meeting vivono nello stesso ambiente operativo. I messaggi possono diventare task, le email ticket, i documenti restano collegati al cliente o progetto corretto e AquaAI aiuta a capire flussi, moduli e prossime azioni.', ['Board task e workdesk personale', 'Mailbox condivise e thread cliente', 'Chat, meeting ed editor documentale', 'AquaAI collegato ai manuali piattaforma']),
      section('Inventario, WMS, logistica e finanza: la verità operativa arriva al back office', 'Quando un preventivo diventa ordine confermato, la piattaforma può collegare domanda, disponibilità stock, picking, spedizione, fatturazione, tesoreria e contabilità. L’obiettivo è evitare il gap tra promessa commerciale, esecuzione laboratorio, movimento fisico prodotto e realtà finanziaria.', ['Domanda, riserve e pressione stock', 'Movimenti magazzino, picking ed evidenza consegna', 'Fatture, spese, cassa e scritture contabili', 'Dashboard executive per margine, carico e rischio']),
      section('Governance, ruoli e controllo multi-tenant', 'AquaVerify Cloud è pronta per team interni, distributori, laboratori, clienti e tenant SaaS con accessi per ruolo, preferenze lingua, onboarding, consenso legale, template documentali e storico stati orientato audit. Ogni utente vede moduli e azioni coerenti con il proprio ruolo.', ['Modello multi-tenant per HQ, distributori, lab e clienti', 'Navigazione e permessi per ruolo', 'Interfacce in spagnolo, inglese, francese, italiano e catalano', 'Audit trail, consenso legale e visibilità stati'])
    ], { eyebrow: 'Piattaforma', primaryCta: 'Richiedi demo piattaforma', secondaryCta: 'Vedi opzione SaaS', seoTitle: 'AquaVerify Cloud Platform | LIMS, CRM, Work, WMS, Finanza e AquaAI', seoDescription: 'Scopri AquaVerify Cloud: piattaforma completa per analisi acqua, CRM, LIMS, ELN, Work, inventario, WMS, finanza, portale clienti e AquaAI.', whitepaper: platformDeepDive('it'), faqs: [
      { question: 'AquaVerify Cloud sostituisce un LIMS?', answer: 'AquaVerify Cloud può coprire flussi di tipo LIMS e integrare sistemi esistenti, ma la decisione va valutata caso per caso secondo requisiti, integrazioni, utenti, dati storici, ambito del laboratorio e configurazione operativa.' },
      { question: 'Come documenta AquaVerify Cloud lotto, operatore, metodo e risultato?', answer: 'La piattaforma può aiutare a registrare campione, lotto, operatore, metodo, lettura, revisione, stato e report in un flusso tracciabile. La configurazione concreta dipende da processo, permessi, template e necessità documentali.' },
      { question: 'AquaVerify Cloud può generare documenti CoA?', answer: 'AquaVerify Cloud può supportare generazione e gestione documentale di CoA e report di analisi secondo configurazione, dati disponibili, template e processo interno. Il contenuto emesso va rivisto nel sistema qualità e nell’ambito applicabile.' },
      { question: 'AquaVerify Cloud può essere usato senza kit AquaVerify?', answer: 'Sì, può essere valutato come layer digitale per operazioni di qualità dell’acqua, workflow laboratorio, reporting o portale clienti. L’ambito dipende dal flusso esistente, dai moduli necessari, dalle integrazioni e dalla maturità del team.' },
      { question: 'Cosa succede se il laboratorio lavora oggi con Excel?', answer: 'AquaVerify Cloud può aiutare a migrare progressivamente da fogli di calcolo a registri strutturati, tracciabilità documentale, template, ruoli e portale clienti. Il primo passo di solito è mappare campioni, metodi, risultati, CoA e responsabilità attuali.' }
    ], ...platformVisualOptions('it', { hero: 'dashboard', galleryIds: ['dashboard', 'lims', 'crm', 'portal', 'work', 'wms', 'finance'] }) }),
    ca: platformLocaleWithAnswer('ca', '/ca/plataforma', 'AquaVerify Cloud: plataforma completa per a laboratoris, negoci i operacions', 'AquaVerify Cloud connecta CRM, LIMS, ELN, Work, AquaMail, AquaChat, inventari, WMS, logística, finances, portal client, dashboards i AquaAI en una sola plataforma traçable.', [
      section('Una plataforma completa, no un altre mòdul aïllat', 'AquaVerify Cloud està construïda per a organitzacions on anàlisi d’aigua, subministrament de producte, comunicació amb clients i execució del negoci han d’avançar junts. La mateixa plataforma pot suportar fluxos amb productes AquaVerify, operació de laboratori, activitat de distribuïdors i desplegaments SaaS per a biotech o equips de qualitat.', ['CRM, Sales i fitxa 360 de client', 'LIMS, ELN, estudis de validació i informes', 'Work, tasques, AquaMail, AquaChat i reunions', 'Inventari, WMS, logística, finances i dashboards executius']),
      section('LIMS i ELN: de la recepció de mostra a l’informe validat', 'La capa de laboratori gestiona punts de mostreig, recepció de mostres, fulls de treball, captura de resultats, revisió tècnica, generació de COA/informes, protocols, quaderns ELN i estudis de validació. Està pensada perquè cada resultat mantingui el seu context: client, ubicació, operador, mètode, full, revisor i informe.', ['Punts de mostreig i fitxa de mostra', 'Execució de fulls i validació tècnica', 'Protocols ELN, experiments i aprovacions QA', 'Publicació en portal client i historial d’informes']),
      section('CRM, Sales i Portal: el cicle comercial queda connectat', 'La plataforma connecta el recorregut comprador des de signup i qualificació CRM fins a pressupostos, comandes de producte, tiquets de suport, sol·licituds de portal i seguiment del client. L’equip pot veure qui és el client, què ha demanat, quins productes o anàlisis importen i quin treball operatiu està en marxa.', ['Origen web i intenció comercial', 'Empresa 360 amb contactes, activitat i documents', 'Pressupostos, comandes i visibilitat al portal', 'Suport i historial de compte']),
      section('Work, comunicació i AquaAI: execució sense perdre context', 'Projectes, taulers, tasques, calendari, documents, AquaMail, AquaChat i reunions viuen en el mateix entorn operatiu. Els missatges poden convertir-se en tasques, els emails en tiquets, els documents queden associats al client o projecte correcte i AquaAI ajuda a entendre fluxos, mòduls i següents accions.', ['Taulers i safata personal de tasques', 'Bústies compartides i fils de client', 'Chat, reunions i editor documental', 'AquaAI connectat a manuals de plataforma']),
      section('Inventari, WMS, logística i finances: la veritat operativa arriba al back office', 'Quan un pressupost es converteix en comanda confirmada, la plataforma pot connectar demanda, disponibilitat d’estoc, picking, enviament, facturació, tresoreria i comptabilitat. L’objectiu és evitar el buit entre promesa comercial, execució de laboratori, moviment físic de producte i realitat financera.', ['Demanda, reserves i pressió d’estoc', 'Moviments de magatzem, picking i evidència de lliurament', 'Factures, despeses, caixa i assentaments comptables', 'Dashboard executiu de marge, càrrega i risc']),
      section('Governança, rols i control multi-tenant', 'AquaVerify Cloud està preparada per a equips interns, distribuïdors, laboratoris, clients i tenants SaaS amb accessos per rol, preferències d’idioma, onboarding, consentiment legal, plantilles documentals i historial d’estats orientat a auditoria. Cada usuari veu els mòduls i accions que li corresponen.', ['Model multi-tenant per a HQ, distribuïdors, labs i clients', 'Navegació i permisos segons rol', 'Interfícies en castellà, anglès, francès, italià i català', 'Audit trail, consentiment legal i visibilitat d’estats'])
    ], { eyebrow: 'Plataforma', primaryCta: 'Sol·licitar demo plataforma', secondaryCta: 'Veure opció SaaS', seoTitle: 'AquaVerify Cloud Platform | LIMS, CRM, Work, WMS, Finances i AquaAI', seoDescription: 'Explora AquaVerify Cloud: plataforma completa per a anàlisi d’aigua, CRM, LIMS, ELN, Work, inventari, WMS, finances, portal client i AquaAI.', whitepaper: platformDeepDive('ca'), faqs: [
      { question: 'AquaVerify Cloud substitueix un LIMS?', answer: 'AquaVerify Cloud pot cobrir fluxos tipus LIMS i complementar sistemes existents, però la decisió s’ha d’avaluar cas per cas segons requisits, integracions, usuaris, dades històriques, abast del laboratori i configuració operativa.' },
      { question: 'Com documenta AquaVerify Cloud lot, operador, mètode i resultat?', answer: 'La plataforma pot ajudar a registrar mostra, lot, operador, mètode, lectura, revisió, estat i informe en un mateix flux traçable. La configuració concreta depèn del procés, permisos, plantilles i necessitats documentals.' },
      { question: 'AquaVerify Cloud pot generar documents CoA?', answer: 'AquaVerify Cloud pot donar suport a la generació i gestió documental de CoA i informes d’anàlisi segons configuració, dades disponibles, plantilles i procés intern. El contingut emès s’ha de revisar dins el sistema de qualitat i l’abast aplicable.' },
      { question: 'Es pot usar AquaVerify Cloud sense comprar kits AquaVerify?', answer: 'Sí, es pot avaluar com a capa digital per a operacions de qualitat de l’aigua, laboratori, reporting o portal client. L’abast es defineix segons el flux existent, mòduls necessaris, integracions i maduresa digital de l’equip.' },
      { question: 'Què passa si el laboratori treballa avui amb Excel?', answer: 'AquaVerify Cloud pot ajudar a migrar progressivament des de fulls de càlcul cap a registres estructurats, traçabilitat documental, plantilles, rols i portal client. El primer pas sol ser mapar mostres, mètodes, resultats, CoA i responsabilitats actuals.' }
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
  })
];
