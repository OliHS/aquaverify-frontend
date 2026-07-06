import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Beaker,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  CloudLightning,
  Factory,
  FileCheck2,
  FlaskConical,
  Gauge,
  Handshake,
  Hotel,
  Leaf,
  Microscope,
  Package,
  ShieldCheck,
  TestTube2,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../utils/translations';
import { getMarketingPagePath } from '../utils/marketingRoutes.js';
import { getPlatformSignupUrl } from '../utils/platformLinks';
import { HOME_FAQS } from '../utils/homeContent';
import { EditableText } from './admin/EditableText';
import { HomeWorkflowAdvisorCta } from './home/HomeWorkflowAdvisorCta';

const ENUMERA_VIDEO = '/videos/enumera-tray-video.mp4';
const ENUMERA_VIDEO_POSTER = '/images/home/enumera-tray-video-poster.jpg';
const SMART_CAP_IMAGE = '/images/home/aquaverify-smart-cap-1200.jpg';
const LEGACY_LIMS_IMAGE = 'https://tmttuszlxgrpzovmntoa.supabase.co/storage/v1/object/public/images/koysa1xep3m_1772472595932.png';
const PRODUCT_WORKFLOW_IMAGE = 'https://tmttuszlxgrpzovmntoa.supabase.co/storage/v1/object/public/images/jdcbhz045rp_1772119325794.png';
const INDUSTRY_NETWORK_IMAGE = 'https://tmttuszlxgrpzovmntoa.supabase.co/storage/v1/object/public/images/3esyi3jz9zb_1772117230391.png';
const CLOUD_HOME_ASSETS = [
  {
    src: '/images/platform/saas/aquaverify-crm-customer-360.jpg',
    alt: 'AquaVerify CRM customer portfolio screen',
    label: 'CRM'
  },
  {
    src: '/images/platform/saas/aquaverify-lims-dashboard.jpg',
    alt: 'AquaVerify LIMS workstation dashboard',
    label: 'LIMS'
  },
  {
    src: '/images/platform/saas/aquaverify-cloud-dashboard.jpg',
    alt: 'AquaVerify Cloud executive dashboard',
    label: 'Dashboard'
  },
  {
    src: LEGACY_LIMS_IMAGE,
    alt: 'AquaVerify LIMS dashboard visual from the corporate home',
    label: 'LIMS visual'
  }
];

type Copy = {
  heroEyebrow: string;
  heroTitle: string;
  heroHighlight: string;
  heroSlogan: string;
  heroLead: string;
  heroBody: string;
  ctas: { products: string; industries: string; platform: string; distributors: string; quote: string; signup: string };
  proof: Array<{ value: string; label: string }>;
  videoTitle: string;
  videoBody: string;
  videoBadges: string[];
  smartEyebrow: string;
  smartChip: string;
  smartTitle: string;
  smartBody: string;
  smartPoints: string[];
  quickTitle: string;
  quickBody: string;
  quick: Array<{ value: string; label: string }>;
  whatEyebrow: string;
  whatTitle: string;
  whatBody: string;
  stories: Array<{ title: string; body: string; bullets: string[] }>;
  flowEyebrow: string;
  flowTitle: string;
  flowBody: string;
  flow: Array<{ title: string; body: string }>;
  pathsEyebrow: string;
  pathsTitle: string;
  pathsBody: string;
  paths: Array<{ id: string; title: string; body: string; cta: string; pageId: string; secondaryPageId?: string; secondaryCta?: string }>;
  productsEyebrow: string;
  productsTitle: string;
  productsBody: string;
  products: Array<{ name: string; body: string; type: string; cta: string; pageId: string }>;
  compareEyebrow: string;
  compareTitle: string;
  compareBody: string;
  compareHeaders: string[];
  compare: Array<{ family: string; type: string; use: string; customer: string; pageId: string }>;
  platformEyebrow: string;
  platformTitle: string;
  platformBody: string;
  platformPoints: string[];
  industriesEyebrow: string;
  industriesTitle: string;
  industriesBody: string;
  industries: Array<{ title: string; body: string; pageId: string }>;
  partnersEyebrow: string;
  partnersTitle: string;
  partnersBody: string;
  distributorTitle: string;
  distributorBody: string;
  distributorCta: string;
  oemTitle: string;
  oemBody: string;
  oemCta: string;
  finalEyebrow: string;
  finalTitle: string;
  finalBody: string;
};

const COPY: Record<Language, Copy> = {
  en: {
    heroEyebrow: 'We develop, manufacture and distribute',
    heroTitle: 'Innovative products for the',
    heroHighlight: 'detection of viruses and bacteria in water.',
    heroSlogan: 'Safe Water for a Better World.',
    heroLead: 'AquaVerify designs, manufactures and distributes water microbiology solutions to turn every sample into a reliable, traceable and actionable result.',
    heroBody: 'We combine water testing products, AquaVerify Cloud, technical reporting, authorized distributors and OEM programs for laboratories, utilities, industries, facilities, scientific partners and quality teams.',
    ctas: { products: 'View products', industries: 'Choose by industry', platform: 'View platform', distributors: 'Find a distributor', quote: 'Request a quote', signup: 'Create account' },
    proof: [
      { value: 'Viruses', label: 'microbiological detection' },
      { value: 'Bacteria', label: 'screening and enumeration' },
      { value: 'Cloud', label: 'LIMS, CoA and traceability' },
      { value: 'OEM', label: 'white label and channel' }
    ],
    videoTitle: 'ENUMERA in action',
    videoBody: 'A clear visual workflow showing how AquaVerify turns a water sample into an interpretable, documentable reading ready for reporting.',
    videoBadges: ['Visual reading', 'Reproducible workflow', 'Traceability-ready'],
    smartEyebrow: 'Featured technology',
    smartChip: 'Smart Cap',
    smartTitle: 'Innovation that simplifies technical work',
    smartBody: 'AquaVerify integrates product design, usability and operational consistency to support preparation, handling, reading and documentation.',
    smartPoints: ['Design focused on real laboratory and field use.', 'Less friction during preparation and execution of microbiological analysis.', 'Natural connection with digital traceability and technical reporting.'],
    quickTitle: 'One brand for products, software and distribution',
    quickBody: 'AquaVerify connects detection, documentation, local support and commercial expansion in an integrated solution.',
    quick: [
      { value: 'Products', label: 'ENUMERA · INDICA · ISO/EPA · Lab Essentials' },
      { value: 'Platform', label: 'CRM · LIMS · ELN · CoA · Portal' },
      { value: 'Industries', label: '9 priority industries' },
      { value: 'Channel', label: 'Distributors · OEM · White label' }
    ],
    whatEyebrow: 'What we do',
    whatTitle: 'AquaVerify brings R&D, manufacturing, channel and traceability into one commercial proposal',
    whatBody: 'Solutions designed to help laboratories, operators and industries detect, document and manage microbiological risks in water with greater operational clarity.',
    stories: [
      { title: 'We develop and manufacture innovative products', body: 'We build our own range of water microbiology solutions: screening, enumeration, technical workflows, culture media and laboratory materials.', bullets: ['Product design focused on real-world use.', 'Solutions for viruses, bacteria and microbiological water control.', 'Architecture designed for laboratories, utilities, industry and facilities.'] },
      { title: 'We distribute and connect analysis with digital evidence', body: 'AquaVerify also provides AquaVerify Cloud, authorized distributors, technical support and OEM programs to scale products and operations.', bullets: ['CRM, LIMS, ELN, CoA reports and customer portal.', 'Global network of distributors and partners.', 'OEM, co-branding and white-label options.'] }
    ],
    flowEyebrow: 'From sample to evidence',
    flowTitle: 'A complete flow so analysis becomes a decision, not just a reading',
    flowBody: 'AquaVerify connects product, sample, operation, technical review and report so each result can be used as actionable evidence.',
    flow: [
      { title: 'Sample', body: 'Point, location, customer and control objective.' },
      { title: 'Product', body: 'Kit, family, lot and associated material.' },
      { title: 'Preparation', body: 'Operator, protocol and assay execution.' },
      { title: 'Reading', body: 'Visual or quantitative result ready for review.' },
      { title: 'Cloud', body: 'LIMS record, customer link and traceability.' },
      { title: 'Report', body: 'CoA, technical review and document publication.' },
      { title: 'Action', body: 'Customer portal, audit, follow-up and decision.' }
    ],
    pathsEyebrow: 'Choose your path',
    pathsTitle: 'Solutions for every critical water need',
    pathsBody: 'Access products, platform, industry solutions, distributors and OEM programs directly.',
    paths: [
      { id: 'products', title: 'I need water testing products', body: 'Quantitative kits, presence/absence tests, ISO/EPA workflows and essential materials for water microbiology.', cta: 'View product catalog', pageId: 'products' },
      { id: 'platform', title: 'I need LIMS traceability and reporting', body: 'Connect sample, customer, operator, lot, result, technical review, CoA, customer portal and document history.', cta: 'View AquaVerify Cloud', pageId: 'platform' },
      { id: 'industries', title: 'I need an industry-specific solution', body: 'Laboratories, municipalities, food, industry, facilities, agriculture, pharma, cosmetics, hospitality and leisure.', cta: 'View industries', pageId: 'industries-hub' },
      { id: 'partners', title: 'I want to distribute or offer AquaVerify under my brand', body: 'Find local support, expand your channel or launch an OEM and white-label program with product and platform.', cta: 'View distributors', pageId: 'distributors', secondaryPageId: 'oem', secondaryCta: 'View OEM program' }
    ],
    productsEyebrow: 'AquaVerify products',
    productsTitle: 'AquaVerify products for every way to analyze water',
    productsBody: 'Choose between enumeration, presence/absence, technical workflows, laboratory support and digital traceability.',
    products: [
      { name: 'ENUMERA', body: 'Quantitative kits for microbiological enumeration in water and readings designed to become documentable results.', type: 'Quantitative · laboratories · municipal', cta: 'View quantitative ENUMERA kits', pageId: 'enumera' },
      { name: 'INDICA', body: 'Presence/absence tests for screening, rapid verification and routine water control.', type: 'Screening · fast · operational', cta: 'View INDICA tests', pageId: 'indica' },
      { name: 'ISO/EPA Kits', body: 'Technical workflows alignable with recognized references for laboratories and specialized control programs.', type: 'ISO · EPA · laboratory', cta: 'View ISO/EPA kits', pageId: 'standard-kits' },
      { name: 'Lab Essentials', body: 'Media, controls, reagents and prepared materials to reduce operational variability in water microbiology.', type: 'Media · controls · materials', cta: 'View Lab Essentials', pageId: 'lab-essentials' },
      { name: 'AquaVerify Cloud', body: 'CRM, LIMS, ELN, CoA, customer portal and traceability to connect product, sample, reading and report.', type: 'LIMS · CoA · portal', cta: 'View AquaVerify Cloud', pageId: 'platform' }
    ],
    compareEyebrow: 'Quick comparison',
    compareTitle: 'Choose the right AquaVerify family',
    compareBody: 'Compare AquaVerify families according to response type, use environment and required traceability.',
    compareHeaders: ['Family', 'Response type', 'Main use', 'Ideal customer', 'Next step'],
    compare: [
      { family: 'ENUMERA', type: 'Quantitative', use: 'Microbiological enumeration', customer: 'Laboratories, municipalities, quality control', pageId: 'enumera' },
      { family: 'INDICA', type: 'Presence/absence', use: 'Rapid screening', customer: 'Field, routine control, screening', pageId: 'indica' },
      { family: 'ISO/EPA Kits', type: 'Technical workflows', use: 'Reference-oriented methods', customer: 'Advanced laboratories', pageId: 'standard-kits' },
      { family: 'Lab Essentials', type: 'Operational support', use: 'Media, reagents, controls', customer: 'Microbiology laboratories', pageId: 'lab-essentials' },
      { family: 'AquaVerify Cloud', type: 'Digital', use: 'LIMS, CoA, traceability, portal', customer: 'Labs, companies, distributors', pageId: 'platform' }
    ],
    platformEyebrow: 'AquaVerify Cloud',
    platformTitle: 'From sample, batch and reading to CoA, portal and commercial follow-up',
    platformBody: 'AquaVerify Cloud connects CRM, LIMS, ELN, CoA, customer portal, inventory, batches and documentary traceability in one operational layer.',
    platformPoints: ['CRM context for leads, accounts and distributors.', 'LIMS workspace for samples, readings, review and reports.', 'Inventory, batches and evidence connected to technical documentation.'],
    industriesEyebrow: 'Industries',
    industriesTitle: 'Water quality workflows by sector',
    industriesBody: 'Each sector page connects the water source, operational risk, products, platform and reporting route.',
    industries: [
      { title: 'Water testing laboratories', body: 'Kits, controls, reporting and traceability for public and private laboratories.', pageId: 'water-testing-labs' },
      { title: 'Water quality control', body: 'Programs for teams that need reliable control of water quality.', pageId: 'water-quality-control' },
      { title: 'Municipal water testing', body: 'Sampling, treatment, network monitoring and technical evidence.', pageId: 'municipal-water-testing' },
      { title: 'Food and beverage', body: 'Water for process, cleaning, ingredients and quality programs.', pageId: 'food-beverage-water-quality' },
      { title: 'Industrial process water', body: 'Operational control for process water, utilities and deviations.', pageId: 'industrial-process-water' },
      { title: 'Facility water risk', body: 'Traceable plans for buildings, assets and recurring control.', pageId: 'facility-water-risk' },
      { title: 'Agriculture', body: 'Irrigation, reclaimed water, campaigns, plots and evidence.', pageId: 'agriculture-water' },
      { title: 'Pharma and cosmetics', body: 'Water evidence connected to batches, quality and documentation.', pageId: 'pharma-cosmetics-water' },
      { title: 'Hospitality, tourism and leisure', body: 'Water risk programs for hotels, leisure sites and multi-location operations.', pageId: 'hospitality-tourism-water' }
    ],
    partnersEyebrow: 'Distribution and OEM',
    partnersTitle: 'Two ways to scale AquaVerify locally or under your brand',
    partnersBody: 'AquaVerify supports customers through authorized distributors and supports scientific partners through OEM, co-branding and private-label routes.',
    distributorTitle: 'Authorized distributors',
    distributorBody: 'Local support, inventory, training, partner qualification and regional coverage for AquaVerify products and workflows.',
    distributorCta: 'Find an authorized distributor',
    oemTitle: 'OEM, co-branding and white label',
    oemBody: 'Programs for adapted packaging, technical supply, digital support and specialized distribution under a partner brand.',
    oemCta: 'Explore OEM programs',
    finalEyebrow: 'Ready to choose',
    finalTitle: 'Move from water analysis to traceable evidence',
    finalBody: 'Explore products, compare sectors, review AquaVerify Cloud or start a quote request with the right commercial context.'
  },
  es: {
    heroEyebrow: 'Desarrollamos, fabricamos y distribuimos',
    heroTitle: 'Productos innovadores para la',
    heroHighlight: 'detección de virus y bacterias en el agua.',
    heroSlogan: 'Safe Water for a Better World.',
    heroLead: 'AquaVerify desarrolla, fabrica y distribuye productos innovadores para la detección de virus y bacterias en el agua.',
    heroBody: 'Conectamos productos de análisis de agua, AquaVerify Cloud, reporting técnico, distribuidores autorizados y programas OEM para laboratorios, utilities, industrias, instalaciones, partners científicos y equipos de calidad.',
    ctas: { products: 'Ver productos', industries: 'Elegir por industria', platform: 'Ver plataforma', distributors: 'Encontrar distribuidor', quote: 'Solicitar cotización', signup: 'Crear cuenta' },
    proof: [
      { value: 'Virus', label: 'detección microbiológica' },
      { value: 'Bacterias', label: 'screening y enumeración' },
      { value: 'Cloud', label: 'LIMS, CoA y trazabilidad' },
      { value: 'OEM', label: 'marca blanca y canal' }
    ],
    videoTitle: 'ENUMERA en acción',
    videoBody: 'Un flujo visual claro que muestra cómo AquaVerify convierte una muestra de agua en una lectura interpretable, documentable y lista para reporting.',
    videoBadges: ['Lectura visual', 'Flujo reproducible', 'Listo para trazabilidad'],
    smartEyebrow: 'Tecnología destacada',
    smartChip: 'Smart Cap',
    smartTitle: 'Innovación que simplifica el trabajo técnico',
    smartBody: 'AquaVerify integra diseño de producto, facilidad de uso y consistencia operativa para apoyar preparación, manipulación, lectura y documentación.',
    smartPoints: ['Diseño pensado para laboratorio y campo reales.', 'Menos fricción durante la preparación y ejecución del análisis microbiológico.', 'Conexión natural con trazabilidad digital y reporting técnico.'],
    quickTitle: 'Una marca para productos, software y distribución',
    quickBody: 'AquaVerify conecta detección, documentación, soporte local y expansión comercial en una solución integrada.',
    quick: [
      { value: 'Productos', label: 'ENUMERA · INDICA · ISO/EPA · Lab Essentials' },
      { value: 'Plataforma', label: 'CRM · LIMS · ELN · CoA · Portal' },
      { value: 'Industrias', label: '9 sectores prioritarios' },
      { value: 'Canal', label: 'Distribuidores · OEM · Marca blanca' }
    ],
    whatEyebrow: 'Qué hacemos',
    whatTitle: 'AquaVerify une I+D, fabricación, canal y trazabilidad en una propuesta comercial',
    whatBody: 'Soluciones diseñadas para ayudar a laboratorios, operadores e industrias a detectar, documentar y gestionar riesgos microbiológicos en el agua con mayor claridad operativa.',
    stories: [
      { title: 'Desarrollamos y fabricamos productos innovadores', body: 'Construimos nuestra propia gama de soluciones para microbiología del agua: screening, enumeración, flujos técnicos, medios de cultivo y materiales de laboratorio.', bullets: ['Diseño de producto enfocado en el uso real.', 'Soluciones para virus, bacterias y control microbiológico del agua.', 'Arquitectura pensada para laboratorios, utilities, industria e instalaciones.'] },
      { title: 'Distribuimos y conectamos el análisis con evidencia digital', body: 'AquaVerify también ofrece AquaVerify Cloud, distribuidores autorizados, soporte técnico y programas OEM para escalar productos y operaciones.', bullets: ['CRM, LIMS, ELN, informes CoA y portal cliente.', 'Red global de distribuidores y partners.', 'Opciones OEM, co-branding y marca blanca.'] }
    ],
    flowEyebrow: 'De muestra a evidencia',
    flowTitle: 'Un flujo completo para que el análisis sea una decisión, no solo una lectura',
    flowBody: 'AquaVerify conecta producto, muestra, operación, revisión técnica e informe para que cada resultado pueda usarse como evidencia accionable.',
    flow: [
      { title: 'Muestra', body: 'Punto, ubicación, cliente y objetivo de control.' },
      { title: 'Producto', body: 'Kit, familia, lote y material asociado.' },
      { title: 'Preparación', body: 'Operador, protocolo y ejecución del ensayo.' },
      { title: 'Lectura', body: 'Resultado visual o cuantitativo listo para revisar.' },
      { title: 'Cloud', body: 'Registro LIMS, vínculo con cliente y trazabilidad.' },
      { title: 'Informe', body: 'CoA, revisión técnica y publicación documental.' },
      { title: 'Acción', body: 'Portal cliente, auditoría, seguimiento y decisión.' }
    ],
    pathsEyebrow: 'Elige tu camino',
    pathsTitle: 'Soluciones para cada necesidad crítica del agua',
    pathsBody: 'Accede directamente a productos, plataforma, soluciones por industria, distribuidores y programas OEM.',
    paths: [
      { id: 'products', title: 'Necesito productos de análisis de agua', body: 'Kits cuantitativos, pruebas presencia/ausencia, flujos ISO/EPA y materiales esenciales para microbiología del agua.', cta: 'Ver catálogo de productos', pageId: 'products' },
      { id: 'platform', title: 'Necesito trazabilidad LIMS y reporting', body: 'Conecta muestra, cliente, operador, lote, resultado, revisión técnica, CoA, portal cliente e histórico documental.', cta: 'Ver AquaVerify Cloud', pageId: 'platform' },
      { id: 'industries', title: 'Necesito una solución por sector', body: 'Laboratorios, municipios, alimentación, industria, instalaciones, agricultura, farma, cosmética, hostelería y ocio.', cta: 'Ver industrias', pageId: 'industries-hub' },
      { id: 'partners', title: 'Quiero distribuir u ofrecer AquaVerify bajo mi marca', body: 'Encuentra soporte local, amplía tu canal o lanza un programa OEM y marca blanca con producto y plataforma.', cta: 'Ver distribuidores', pageId: 'distributors', secondaryPageId: 'oem', secondaryCta: 'Ver programa OEM' }
    ],
    productsEyebrow: 'Productos AquaVerify',
    productsTitle: 'Productos AquaVerify para cada forma de analizar el agua',
    productsBody: 'Elige entre enumeración, presencia/ausencia, flujos técnicos, soporte de laboratorio y trazabilidad digital.',
    products: [
      { name: 'ENUMERA', body: 'Kits cuantitativos para enumeración microbiológica en agua y lecturas diseñadas para convertirse en resultados documentables.', type: 'Cuantitativo · laboratorios · municipal', cta: 'Ver kits cuantitativos ENUMERA', pageId: 'enumera' },
      { name: 'INDICA', body: 'Pruebas de presencia/ausencia para screening, verificación rápida y control rutinario del agua.', type: 'Screening · rápido · operativo', cta: 'Ver pruebas INDICA', pageId: 'indica' },
      { name: 'Kits ISO/EPA', body: 'Flujos técnicos alineables con referencias reconocidas para laboratorios y programas de control especializados.', type: 'ISO · EPA · laboratorio', cta: 'Ver kits ISO/EPA', pageId: 'standard-kits' },
      { name: 'Lab Essentials', body: 'Medios, controles, reactivos y materiales preparados para reducir variabilidad operativa en microbiología del agua.', type: 'Medios · controles · materiales', cta: 'Ver Lab Essentials', pageId: 'lab-essentials' },
      { name: 'AquaVerify Cloud', body: 'CRM, LIMS, ELN, CoA, portal cliente y trazabilidad para conectar producto, muestra, lectura e informe.', type: 'LIMS · CoA · portal', cta: 'Ver AquaVerify Cloud', pageId: 'platform' }
    ],
    compareEyebrow: 'Comparativa rápida',
    compareTitle: 'Elige la familia AquaVerify adecuada',
    compareBody: 'Compara las familias AquaVerify según tipo de respuesta, entorno de uso y trazabilidad requerida.',
    compareHeaders: ['Familia', 'Tipo de respuesta', 'Uso principal', 'Cliente ideal', 'Siguiente paso'],
    compare: [
      { family: 'ENUMERA', type: 'Cuantitativo', use: 'Enumeración microbiológica', customer: 'Laboratorios, municipios, quality control', pageId: 'enumera' },
      { family: 'INDICA', type: 'Presencia/ausencia', use: 'Screening rápido', customer: 'Campo, control rutinario, screening', pageId: 'indica' },
      { family: 'Kits ISO/EPA', type: 'Flujos técnicos', use: 'Métodos de referencia', customer: 'Laboratorios avanzados', pageId: 'standard-kits' },
      { family: 'Lab Essentials', type: 'Soporte operativo', use: 'Medios, reactivos, controles', customer: 'Laboratorios de microbiología', pageId: 'lab-essentials' },
      { family: 'AquaVerify Cloud', type: 'Digital', use: 'LIMS, CoA, trazabilidad, portal', customer: 'Labs, empresas, distribuidores', pageId: 'platform' }
    ],
    platformEyebrow: 'AquaVerify Cloud',
    platformTitle: 'De muestra, lote y lectura a CoA, portal y seguimiento comercial',
    platformBody: 'AquaVerify Cloud conecta CRM, LIMS, ELN, CoA, portal cliente, inventario, lotes y trazabilidad documental en una sola capa operativa.',
    platformPoints: ['Contexto CRM para leads, cuentas y distribuidores.', 'Espacio LIMS para muestras, lecturas, revisión e informes.', 'Inventario, lotes y evidencias conectados con documentación técnica.'],
    industriesEyebrow: 'Industrias',
    industriesTitle: 'Flujos de calidad del agua por sector',
    industriesBody: 'Cada página sectorial conecta fuente de agua, riesgo operativo, productos, plataforma y reporting.',
    industries: [
      { title: 'Laboratorios de análisis de agua', body: 'Kits, controles, reporting y trazabilidad para laboratorios públicos y privados.', pageId: 'water-testing-labs' },
      { title: 'Control de calidad del agua', body: 'Programas para equipos que necesitan control fiable de calidad del agua.', pageId: 'water-quality-control' },
      { title: 'Análisis de agua municipal', body: 'Muestreo, tratamiento, red y evidencia técnica.', pageId: 'municipal-water-testing' },
      { title: 'Alimentación y bebidas', body: 'Agua de proceso, limpieza, ingrediente y programas de calidad.', pageId: 'food-beverage-water-quality' },
      { title: 'Agua de proceso industrial', body: 'Control operativo para agua de proceso, utilities y desviaciones.', pageId: 'industrial-process-water' },
      { title: 'Gestión del riesgo en instalaciones', body: 'Planes trazables para edificios, activos y control recurrente.', pageId: 'facility-water-risk' },
      { title: 'Agricultura', body: 'Riego, agua regenerada, campañas, parcelas y evidencias.', pageId: 'agriculture-water' },
      { title: 'Industria farmacéutica y cosmética', body: 'Evidencia de agua conectada a lotes, calidad y documentación.', pageId: 'pharma-cosmetics-water' },
      { title: 'Hostelería, turismo y ocio', body: 'Programas de riesgo hídrico para hoteles, ocio y operaciones multi-sede.', pageId: 'hospitality-tourism-water' }
    ],
    partnersEyebrow: 'Distribución y OEM',
    partnersTitle: 'Dos formas de escalar AquaVerify localmente o bajo tu marca',
    partnersBody: 'AquaVerify atiende clientes mediante distribuidores autorizados y apoya a partners científicos con rutas OEM, co-branding y marca blanca.',
    distributorTitle: 'Distribuidores autorizados',
    distributorBody: 'Soporte local, inventario, capacitación, cualificación de partner y cobertura regional para productos y flujos AquaVerify.',
    distributorCta: 'Encontrar distribuidor autorizado',
    oemTitle: 'OEM, co-branding y marca blanca',
    oemBody: 'Programas para packaging adaptado, suministro técnico, soporte digital y distribución especializada bajo marca partner.',
    oemCta: 'Explorar programas OEM',
    finalEyebrow: 'Listo para elegir',
    finalTitle: 'Pasa del análisis de agua a evidencia trazable',
    finalBody: 'Explora productos, compara sectores, revisa AquaVerify Cloud o inicia una cotización con el contexto comercial adecuado.'
  },
  fr: {} as Copy,
  it: {} as Copy,
  ca: {} as Copy
};

COPY.fr = {
  ...COPY.en,
  heroEyebrow: 'Nous développons, fabriquons et distribuons',
  heroTitle: 'Des produits innovants pour la',
  heroHighlight: 'détection des virus et bactéries dans l’eau.',
  heroLead: 'AquaVerify conçoit, fabrique et distribue des solutions de microbiologie de l’eau pour transformer chaque échantillon en résultat fiable, traçable et exploitable.',
  heroBody: 'Nous combinons produits d’analyse de l’eau, AquaVerify Cloud, reporting technique, distributeurs autorisés et programmes OEM pour laboratoires, utilities, industries, installations, partenaires scientifiques et équipes qualité.',
  ctas: { products: 'Voir les produits', industries: 'Choisir par secteur', platform: 'Voir la plateforme', distributors: 'Trouver un distributeur', quote: 'Demander un devis', signup: 'Créer un compte' },
  whatEyebrow: 'Ce que nous faisons',
  pathsEyebrow: 'Choisissez votre parcours',
  productsEyebrow: 'Produits AquaVerify',
  compareEyebrow: 'Comparaison rapide',
  platformEyebrow: 'AquaVerify Cloud',
  industriesEyebrow: 'Secteurs',
  partnersEyebrow: 'Distribution et OEM',
  finalEyebrow: 'Prêt à choisir',
  videoTitle: 'ENUMERA en action',
  smartEyebrow: 'Technologie mise en avant',
  smartTitle: 'Une innovation qui simplifie le travail technique',
  smartBody: 'AquaVerify intègre design produit, ergonomie et cohérence opérationnelle pour soutenir préparation, manipulation, lecture et documentation.',
  quickTitle: 'Une seule marque pour les produits, le logiciel et la distribution',
  pathsTitle: 'Des solutions pour chaque besoin critique en eau',
  productsTitle: 'Des produits AquaVerify pour chaque façon d’analyser l’eau',
  compareTitle: 'Choisir la bonne famille AquaVerify',
  platformTitle: 'De l’échantillon, du lot et de la lecture au CoA, portail et suivi commercial',
  industriesTitle: 'Flux de qualité de l’eau par secteur',
  partnersTitle: 'Deux façons de déployer AquaVerify localement ou sous votre marque',
  finalTitle: 'Passez de l’analyse de l’eau à une preuve traçable',
  proof: [
    { value: 'Virus', label: 'détection microbiologique' },
    { value: 'Bactéries', label: 'screening et énumération' },
    { value: 'Cloud', label: 'LIMS, CoA et traçabilité' },
    { value: 'OEM', label: 'marque blanche et canal' }
  ],
  videoBody: 'Un flux visuel clair qui montre comment AquaVerify transforme un échantillon d’eau en lecture interprétable, documentable et prête pour le reporting.',
  videoBadges: ['Lecture visuelle', 'Flux reproductible', 'Prêt pour la traçabilité'],
  smartPoints: ['Design orienté vers l’usage réel en laboratoire et sur le terrain.', 'Moins de friction pendant la préparation et l’exécution de l’analyse microbiologique.', 'Connexion naturelle avec la traçabilité numérique et le reporting technique.'],
  quickBody: 'AquaVerify connecte détection, documentation, support local et expansion commerciale dans une solution intégrée.',
  quick: [
    { value: 'Produits', label: 'ENUMERA · INDICA · ISO/EPA · Lab Essentials' },
    { value: 'Plateforme', label: 'CRM · LIMS · ELN · CoA · Portail' },
    { value: 'Secteurs', label: '9 secteurs prioritaires' },
    { value: 'Canal', label: 'Distributeurs · OEM · Marque blanche' }
  ],
  whatTitle: 'AquaVerify réunit R&D, fabrication, canal et traçabilité dans une seule proposition commerciale',
  whatBody: 'Des solutions conçues pour aider laboratoires, opérateurs et industries à détecter, documenter et gérer les risques microbiologiques de l’eau avec plus de clarté opérationnelle.',
  stories: [
    { title: 'Nous développons et fabriquons des produits innovants', body: 'Nous construisons notre propre gamme de solutions pour la microbiologie de l’eau : screening, énumération, flux techniques, milieux de culture et matériels de laboratoire.', bullets: ['Design produit orienté usage réel.', 'Solutions pour virus, bactéries et contrôle microbiologique de l’eau.', 'Architecture pensée pour laboratoires, utilities, industrie et installations.'] },
    { title: 'Nous distribuons et connectons l’analyse à la preuve numérique', body: 'AquaVerify propose aussi AquaVerify Cloud, des distributeurs autorisés, un support technique et des programmes OEM pour faire évoluer produits et opérations.', bullets: ['CRM, LIMS, ELN, rapports CoA et portail client.', 'Réseau global de distributeurs et partenaires.', 'Options OEM, co-branding et marque blanche.'] }
  ],
  flowTitle: 'Un flux complet pour que l’analyse devienne une décision, pas seulement une lecture',
  flowBody: 'AquaVerify connecte produit, échantillon, opération, revue technique et rapport afin que chaque résultat puisse être utilisé comme preuve exploitable.',
  flow: [
    { title: 'Échantillon', body: 'Point, localisation, client et objectif de contrôle.' },
    { title: 'Produit', body: 'Kit, famille, lot et matériel associé.' },
    { title: 'Préparation', body: 'Opérateur, protocole et exécution de l’essai.' },
    { title: 'Lecture', body: 'Résultat visuel ou quantitatif prêt à être revu.' },
    { title: 'Cloud', body: 'Enregistrement LIMS, lien client et traçabilité.' },
    { title: 'Rapport', body: 'CoA, revue technique et publication documentaire.' },
    { title: 'Action', body: 'Portail client, audit, suivi et décision.' }
  ],
  pathsBody: 'Accédez directement aux produits, à la plateforme, aux solutions sectorielles, aux distributeurs et aux programmes OEM.',
  paths: [
    { id: 'products', title: 'J’ai besoin de produits d’analyse de l’eau', body: 'Kits quantitatifs, tests présence/absence, flux ISO/EPA et matériels essentiels pour la microbiologie de l’eau.', cta: 'Voir le catalogue produits', pageId: 'products' },
    { id: 'platform', title: 'J’ai besoin de traçabilité LIMS et de reporting', body: 'Connectez échantillon, client, opérateur, lot, résultat, revue technique, CoA, portail client et historique documentaire.', cta: 'Voir AquaVerify Cloud', pageId: 'platform' },
    { id: 'industries', title: 'J’ai besoin d’une solution sectorielle', body: 'Laboratoires, municipalités, agroalimentaire, industrie, installations, agriculture, pharma, cosmétique, hôtellerie et loisirs.', cta: 'Voir les secteurs', pageId: 'industries-hub' },
    { id: 'partners', title: 'Je veux distribuer ou proposer AquaVerify sous ma marque', body: 'Trouvez un support local, développez votre canal ou lancez un programme OEM et marque blanche avec produit et plateforme.', cta: 'Voir distributeurs', pageId: 'distributors', secondaryPageId: 'oem', secondaryCta: 'Voir le programme OEM' }
  ],
  productsBody: 'Choisissez entre énumération, présence/absence, flux techniques, support laboratoire et traçabilité numérique.',
  products: [
    { name: 'ENUMERA', body: 'Kits quantitatifs pour l’énumération microbiologique de l’eau et lectures pensées pour devenir des résultats documentables.', type: 'Quantitatif · laboratoires · municipal', cta: 'Voir les kits ENUMERA quantitatifs', pageId: 'enumera' },
    { name: 'INDICA', body: 'Tests présence/absence pour screening, vérification rapide et contrôle de routine de l’eau.', type: 'Screening · rapide · opérationnel', cta: 'Voir les tests INDICA', pageId: 'indica' },
    { name: 'Kits ISO/EPA', body: 'Flux techniques alignables avec des références reconnues pour laboratoires et programmes spécialisés.', type: 'ISO · EPA · laboratoire', cta: 'Voir les kits ISO/EPA', pageId: 'standard-kits' },
    { name: 'Lab Essentials', body: 'Milieux, contrôles, réactifs et matériels préparés pour réduire la variabilité opérationnelle.', type: 'Milieux · contrôles · matériels', cta: 'Voir Lab Essentials', pageId: 'lab-essentials' },
    { name: 'AquaVerify Cloud', body: 'CRM, LIMS, ELN, CoA, portail client et traçabilité pour connecter produit, échantillon, lecture et rapport.', type: 'LIMS · CoA · portail', cta: 'Voir AquaVerify Cloud', pageId: 'platform' }
  ],
  compareHeaders: ['Famille', 'Type de réponse', 'Usage principal', 'Client idéal', 'Étape suivante'],
  compare: [
    { family: 'ENUMERA', type: 'Quantitatif', use: 'Énumération microbiologique', customer: 'Laboratoires, municipalités, qualité', pageId: 'enumera' },
    { family: 'INDICA', type: 'Présence/absence', use: 'Screening rapide', customer: 'Terrain, contrôle de routine, screening', pageId: 'indica' },
    { family: 'Kits ISO/EPA', type: 'Flux techniques', use: 'Méthodes orientées référence', customer: 'Laboratoires avancés', pageId: 'standard-kits' },
    { family: 'Lab Essentials', type: 'Support opérationnel', use: 'Milieux, réactifs, contrôles', customer: 'Laboratoires de microbiologie', pageId: 'lab-essentials' },
    { family: 'AquaVerify Cloud', type: 'Numérique', use: 'LIMS, CoA, traçabilité, portail', customer: 'Labs, entreprises, distributeurs', pageId: 'platform' }
  ],
  platformBody: 'AquaVerify Cloud connecte CRM, LIMS, ELN, CoA, portail client, inventaire, lots et traçabilité documentaire dans une seule couche opérationnelle.',
  platformPoints: ['Contexte CRM pour leads, comptes et distributeurs.', 'Espace LIMS pour échantillons, lectures, revue et rapports.', 'Inventaire, lots et preuves reliés à la documentation technique.'],
  industriesBody: 'Chaque page sectorielle relie source d’eau, risque opérationnel, produits, plateforme et reporting.',
  industries: [
    { title: 'Laboratoires d’analyse de l’eau', body: 'Kits, contrôles, reporting et traçabilité pour laboratoires publics et privés.', pageId: 'water-testing-labs' },
    { title: 'Contrôle qualité de l’eau', body: 'Programmes pour équipes qui nécessitent un contrôle fiable de l’eau.', pageId: 'water-quality-control' },
    { title: 'Analyse d’eau municipale', body: 'Échantillonnage, traitement, réseau et preuve technique.', pageId: 'municipal-water-testing' },
    { title: 'Agroalimentaire', body: 'Eau de process, nettoyage, ingrédient et programmes qualité.', pageId: 'food-beverage-water-quality' },
    { title: 'Eau de process industriel', body: 'Contrôle opérationnel pour eau de process, utilities et déviations.', pageId: 'industrial-process-water' },
    { title: 'Risque eau dans les installations', body: 'Plans traçables pour bâtiments, actifs et contrôle récurrent.', pageId: 'facility-water-risk' },
    { title: 'Agriculture', body: 'Irrigation, eau réutilisée, campagnes, parcelles et preuves.', pageId: 'agriculture-water' },
    { title: 'Pharma et cosmétique', body: 'Preuve eau connectée aux lots, à la qualité et à la documentation.', pageId: 'pharma-cosmetics-water' },
    { title: 'Hôtellerie, tourisme et loisirs', body: 'Programmes de risque hydrique pour sites hôteliers et multi-sites.', pageId: 'hospitality-tourism-water' }
  ],
  partnersBody: 'AquaVerify sert les clients via des distributeurs autorisés et accompagne les partenaires scientifiques via OEM, co-branding et marque blanche.',
  distributorTitle: 'Distributeurs autorisés',
  distributorBody: 'Support local, inventaire, formation, qualification partenaire et couverture régionale pour produits et flux AquaVerify.',
  distributorCta: 'Trouver un distributeur autorisé',
  oemTitle: 'OEM, co-branding et marque blanche',
  oemBody: 'Programmes pour packaging adapté, fourniture technique, support numérique et distribution spécialisée sous marque partenaire.',
  oemCta: 'Explorer les programmes OEM',
  finalBody: 'Explorez les produits, comparez les secteurs, découvrez AquaVerify Cloud ou démarrez une demande de devis avec le bon contexte commercial.'
};

COPY.it = {
  ...COPY.en,
  heroEyebrow: 'Sviluppiamo, produciamo e distribuiamo',
  heroTitle: 'Prodotti innovativi per la',
  heroHighlight: 'rilevazione di virus e batteri nell’acqua.',
  heroLead: 'AquaVerify progetta, produce e distribuisce soluzioni di microbiologia dell’acqua per trasformare ogni campione in un risultato affidabile, tracciabile e utilizzabile.',
  heroBody: 'Combiniamo prodotti per analisi dell’acqua, AquaVerify Cloud, reporting tecnico, distributori autorizzati e programmi OEM per laboratori, utility, industrie, strutture, partner scientifici e team qualità.',
  ctas: { products: 'Vedi prodotti', industries: 'Scegli per settore', platform: 'Vedi piattaforma', distributors: 'Trova distributore', quote: 'Richiedi preventivo', signup: 'Crea account' },
  whatEyebrow: 'Cosa facciamo',
  pathsEyebrow: 'Scegli il percorso',
  productsEyebrow: 'Prodotti AquaVerify',
  compareEyebrow: 'Confronto rapido',
  platformEyebrow: 'AquaVerify Cloud',
  industriesEyebrow: 'Settori',
  partnersEyebrow: 'Distribuzione e OEM',
  finalEyebrow: 'Pronto a scegliere',
  videoTitle: 'ENUMERA in azione',
  smartEyebrow: 'Tecnologia in evidenza',
  smartTitle: 'Innovazione che semplifica il lavoro tecnico',
  smartBody: 'AquaVerify integra design di prodotto, facilità d’uso e coerenza operativa per supportare preparazione, manipolazione, lettura e documentazione.',
  quickTitle: 'Un unico brand per prodotti, software e distribuzione',
  pathsTitle: 'Soluzioni per ogni esigenza critica dell’acqua',
  productsTitle: 'Prodotti AquaVerify per ogni modo di analizzare l’acqua',
  compareTitle: 'Scegli la famiglia AquaVerify corretta',
  platformTitle: 'Da campione, lotto e lettura a CoA, portale e follow-up commerciale',
  industriesTitle: 'Workflow di qualità dell’acqua per settore',
  partnersTitle: 'Due modi per scalare AquaVerify localmente o con il tuo brand',
  finalTitle: 'Passa dall’analisi dell’acqua all’evidenza tracciabile',
  proof: [
    { value: 'Virus', label: 'rilevazione microbiologica' },
    { value: 'Batteri', label: 'screening ed enumerazione' },
    { value: 'Cloud', label: 'LIMS, CoA e tracciabilità' },
    { value: 'OEM', label: 'private label e canale' }
  ],
  videoBody: 'Un flusso visivo chiaro che mostra come AquaVerify trasforma un campione d’acqua in una lettura interpretabile, documentabile e pronta per il reporting.',
  videoBadges: ['Lettura visiva', 'Workflow riproducibile', 'Pronto per tracciabilità'],
  smartPoints: ['Design pensato per uso reale in laboratorio e sul campo.', 'Meno frizione durante preparazione ed esecuzione dell’analisi microbiologica.', 'Connessione naturale con tracciabilità digitale e reporting tecnico.'],
  quickBody: 'AquaVerify collega rilevazione, documentazione, supporto locale ed espansione commerciale in una soluzione integrata.',
  quick: [
    { value: 'Prodotti', label: 'ENUMERA · INDICA · ISO/EPA · Lab Essentials' },
    { value: 'Piattaforma', label: 'CRM · LIMS · ELN · CoA · Portale' },
    { value: 'Settori', label: '9 settori prioritari' },
    { value: 'Canale', label: 'Distributori · OEM · Private label' }
  ],
  whatTitle: 'AquaVerify unisce R&D, produzione, canale e tracciabilità in una proposta commerciale',
  whatBody: 'Soluzioni progettate per aiutare laboratori, operatori e industrie a rilevare, documentare e gestire rischi microbiologici nell’acqua con maggiore chiarezza operativa.',
  stories: [
    { title: 'Sviluppiamo e produciamo prodotti innovativi', body: 'Costruiamo la nostra gamma di soluzioni per microbiologia dell’acqua: screening, enumerazione, flussi tecnici, terreni di coltura e materiali di laboratorio.', bullets: ['Design di prodotto orientato all’uso reale.', 'Soluzioni per virus, batteri e controllo microbiologico dell’acqua.', 'Architettura pensata per laboratori, utility, industria e strutture.'] },
    { title: 'Distribuiamo e colleghiamo l’analisi all’evidenza digitale', body: 'AquaVerify offre anche AquaVerify Cloud, distributori autorizzati, supporto tecnico e programmi OEM per scalare prodotti e operazioni.', bullets: ['CRM, LIMS, ELN, report CoA e portale clienti.', 'Rete globale di distributori e partner.', 'Opzioni OEM, co-branding e private label.'] }
  ],
  flowTitle: 'Un flusso completo perché l’analisi diventi decisione, non solo lettura',
  flowBody: 'AquaVerify collega prodotto, campione, operazione, revisione tecnica e report affinché ogni risultato possa essere usato come evidenza operativa.',
  flow: [
    { title: 'Campione', body: 'Punto, posizione, cliente e obiettivo di controllo.' },
    { title: 'Prodotto', body: 'Kit, famiglia, lotto e materiale associato.' },
    { title: 'Preparazione', body: 'Operatore, protocollo ed esecuzione del test.' },
    { title: 'Lettura', body: 'Risultato visivo o quantitativo pronto per revisione.' },
    { title: 'Cloud', body: 'Record LIMS, collegamento cliente e tracciabilità.' },
    { title: 'Report', body: 'CoA, revisione tecnica e pubblicazione documentale.' },
    { title: 'Azione', body: 'Portale cliente, audit, follow-up e decisione.' }
  ],
  pathsBody: 'Accedi direttamente a prodotti, piattaforma, soluzioni per settore, distributori e programmi OEM.',
  paths: [
    { id: 'products', title: 'Ho bisogno di prodotti per analisi dell’acqua', body: 'Kit quantitativi, test presenza/assenza, flussi ISO/EPA e materiali essenziali per microbiologia dell’acqua.', cta: 'Vedi catalogo prodotti', pageId: 'products' },
    { id: 'platform', title: 'Ho bisogno di tracciabilità LIMS e reporting', body: 'Collega campione, cliente, operatore, lotto, risultato, revisione tecnica, CoA, portale e storico documentale.', cta: 'Vedi AquaVerify Cloud', pageId: 'platform' },
    { id: 'industries', title: 'Ho bisogno di una soluzione per settore', body: 'Laboratori, comuni, alimentare, industria, strutture, agricoltura, pharma, cosmetica, ospitalità e leisure.', cta: 'Vedi settori', pageId: 'industries-hub' },
    { id: 'partners', title: 'Voglio distribuire o offrire AquaVerify con il mio brand', body: 'Trova supporto locale, amplia il canale o lancia un programma OEM e private label con prodotto e piattaforma.', cta: 'Vedi distributori', pageId: 'distributors', secondaryPageId: 'oem', secondaryCta: 'Vedi programma OEM' }
  ],
  productsBody: 'Scegli tra enumerazione, presenza/assenza, flussi tecnici, supporto laboratorio e tracciabilità digitale.',
  products: [
    { name: 'ENUMERA', body: 'Kit quantitativi per enumerazione microbiologica in acqua e letture pensate per diventare risultati documentabili.', type: 'Quantitativo · laboratori · municipale', cta: 'Vedi kit quantitativi ENUMERA', pageId: 'enumera' },
    { name: 'INDICA', body: 'Test presenza/assenza per screening, verifica rapida e controllo di routine dell’acqua.', type: 'Screening · rapido · operativo', cta: 'Vedi test INDICA', pageId: 'indica' },
    { name: 'Kit ISO/EPA', body: 'Flussi tecnici allineabili a riferimenti riconosciuti per laboratori e programmi specializzati.', type: 'ISO · EPA · laboratorio', cta: 'Vedi kit ISO/EPA', pageId: 'standard-kits' },
    { name: 'Lab Essentials', body: 'Terreni, controlli, reagenti e materiali preparati per ridurre la variabilità operativa.', type: 'Terreni · controlli · materiali', cta: 'Vedi Lab Essentials', pageId: 'lab-essentials' },
    { name: 'AquaVerify Cloud', body: 'CRM, LIMS, ELN, CoA, portale clienti e tracciabilità per collegare prodotto, campione, lettura e report.', type: 'LIMS · CoA · portale', cta: 'Vedi AquaVerify Cloud', pageId: 'platform' }
  ],
  compareHeaders: ['Famiglia', 'Tipo di risposta', 'Uso principale', 'Cliente ideale', 'Passo successivo'],
  compare: [
    { family: 'ENUMERA', type: 'Quantitativo', use: 'Enumerazione microbiologica', customer: 'Laboratori, comuni, quality control', pageId: 'enumera' },
    { family: 'INDICA', type: 'Presenza/assenza', use: 'Screening rapido', customer: 'Campo, controllo routine, screening', pageId: 'indica' },
    { family: 'Kit ISO/EPA', type: 'Flussi tecnici', use: 'Metodi orientati a riferimenti', customer: 'Laboratori avanzati', pageId: 'standard-kits' },
    { family: 'Lab Essentials', type: 'Supporto operativo', use: 'Terreni, reagenti, controlli', customer: 'Laboratori di microbiologia', pageId: 'lab-essentials' },
    { family: 'AquaVerify Cloud', type: 'Digitale', use: 'LIMS, CoA, tracciabilità, portale', customer: 'Labs, aziende, distributori', pageId: 'platform' }
  ],
  platformBody: 'AquaVerify Cloud collega CRM, LIMS, ELN, CoA, portale clienti, inventario, lotti e tracciabilità documentale in un unico livello operativo.',
  platformPoints: ['Contesto CRM per lead, account e distributori.', 'Workspace LIMS per campioni, letture, revisione e report.', 'Inventario, lotti ed evidenze collegati alla documentazione tecnica.'],
  industriesBody: 'Ogni pagina settoriale collega fonte d’acqua, rischio operativo, prodotti, piattaforma e reporting.',
  industries: [
    { title: 'Laboratori di analisi dell’acqua', body: 'Kit, controlli, reporting e tracciabilità per laboratori pubblici e privati.', pageId: 'water-testing-labs' },
    { title: 'Controllo qualità dell’acqua', body: 'Programmi per team che richiedono controllo affidabile della qualità dell’acqua.', pageId: 'water-quality-control' },
    { title: 'Analisi acqua municipale', body: 'Campionamento, trattamento, rete ed evidenza tecnica.', pageId: 'municipal-water-testing' },
    { title: 'Food & beverage', body: 'Acqua di processo, pulizia, ingrediente e programmi qualità.', pageId: 'food-beverage-water-quality' },
    { title: 'Acqua di processo industriale', body: 'Controllo operativo per acqua di processo, utility e deviazioni.', pageId: 'industrial-process-water' },
    { title: 'Rischio acqua in strutture', body: 'Piani tracciabili per edifici, asset e controllo ricorrente.', pageId: 'facility-water-risk' },
    { title: 'Agricoltura', body: 'Irrigazione, acqua riutilizzata, campagne, appezzamenti ed evidenze.', pageId: 'agriculture-water' },
    { title: 'Farmaceutica e cosmetica', body: 'Evidenza acqua collegata a lotti, qualità e documentazione.', pageId: 'pharma-cosmetics-water' },
    { title: 'Ospitalità, turismo e leisure', body: 'Programmi rischio idrico per hotel, leisure e operazioni multi-sede.', pageId: 'hospitality-tourism-water' }
  ],
  partnersBody: 'AquaVerify supporta i clienti tramite distributori autorizzati e partner scientifici con percorsi OEM, co-branding e private label.',
  distributorTitle: 'Distributori autorizzati',
  distributorBody: 'Supporto locale, inventario, formazione, qualifica partner e copertura regionale per prodotti e flussi AquaVerify.',
  distributorCta: 'Trova distributore autorizzato',
  oemTitle: 'OEM, co-branding e private label',
  oemBody: 'Programmi per packaging adattato, fornitura tecnica, supporto digitale e distribuzione specializzata con brand partner.',
  oemCta: 'Esplora programmi OEM',
  finalBody: 'Esplora prodotti, confronta settori, scopri AquaVerify Cloud o avvia una richiesta di preventivo con il giusto contesto commerciale.'
};

COPY.ca = {
  ...COPY.es,
  heroEyebrow: 'Desenvolupem, fabriquem i distribuïm',
  heroTitle: 'Productes innovadors per a la',
  heroHighlight: 'detecció de virus i bacteris a l’aigua.',
  heroLead: 'AquaVerify desenvolupa, fabrica i distribueix productes innovadors per a la detecció de virus i bacteris a l’aigua.',
  heroBody: 'Connectem productes d’anàlisi d’aigua, AquaVerify Cloud, reporting tècnic, distribuïdors autoritzats i programes OEM per a laboratoris, utilities, indústries, instal·lacions, partners científics i equips de qualitat.',
  ctas: { products: 'Veure productes', industries: 'Triar per sector', platform: 'Veure plataforma', distributors: 'Trobar distribuïdor', quote: 'Sol·licitar pressupost', signup: 'Crear compte' },
  whatEyebrow: 'Què fem',
  pathsEyebrow: 'Tria el teu camí',
  productsEyebrow: 'Productes AquaVerify',
  compareEyebrow: 'Comparativa ràpida',
  platformEyebrow: 'AquaVerify Cloud',
  industriesEyebrow: 'Sectors',
  partnersEyebrow: 'Distribució i OEM',
  finalEyebrow: 'Preparat per triar',
  videoTitle: 'ENUMERA en acció',
  smartEyebrow: 'Tecnologia destacada',
  smartTitle: 'Innovació que simplifica el treball tècnic',
  smartBody: 'AquaVerify integra disseny de producte, facilitat d’ús i consistència operativa per donar suport a preparació, manipulació, lectura i documentació.',
  quickTitle: 'Una marca per a productes, software i distribució',
  pathsTitle: 'Solucions per a cada necessitat crítica de l’aigua',
  productsTitle: 'Productes AquaVerify per a cada manera d’analitzar l’aigua',
  compareTitle: 'Tria la família AquaVerify adequada',
  platformTitle: 'De mostra, lot i lectura a CoA, portal i seguiment comercial',
  industriesTitle: 'Fluxos de qualitat de l’aigua per sector',
  partnersTitle: 'Dues maneres d’escalar AquaVerify localment o sota la teva marca',
  finalTitle: 'Passa de l’anàlisi d’aigua a evidència traçable',
  proof: [
    { value: 'Virus', label: 'detecció microbiològica' },
    { value: 'Bacteris', label: 'cribratge i enumeració' },
    { value: 'Cloud', label: 'LIMS, CoA i traçabilitat' },
    { value: 'OEM', label: 'marca blanca i canal' }
  ],
  videoBody: 'Un flux visual clar que mostra com AquaVerify converteix una mostra d’aigua en una lectura interpretable, documentable i preparada per a reporting.',
  videoBadges: ['Lectura visual', 'Flux reproduïble', 'Preparat per a traçabilitat'],
  smartPoints: ['Disseny pensat per a laboratori i camp reals.', 'Menys fricció durant la preparació i execució de l’anàlisi microbiològica.', 'Connexió natural amb traçabilitat digital i reporting tècnic.'],
  quickBody: 'AquaVerify connecta detecció, documentació, suport local i expansió comercial en una solució integrada.',
  quick: [
    { value: 'Productes', label: 'ENUMERA · INDICA · ISO/EPA · Lab Essentials' },
    { value: 'Plataforma', label: 'CRM · LIMS · ELN · CoA · Portal' },
    { value: 'Sectors', label: '9 sectors prioritaris' },
    { value: 'Canal', label: 'Distribuïdors · OEM · Marca blanca' }
  ],
  whatTitle: 'AquaVerify uneix R+D, fabricació, canal i traçabilitat en una proposta comercial',
  whatBody: 'Solucions dissenyades per ajudar laboratoris, operadors i indústries a detectar, documentar i gestionar riscos microbiològics a l’aigua amb més claredat operativa.',
  stories: [
    { title: 'Desenvolupem i fabriquem productes innovadors', body: 'Construïm la nostra pròpia gamma de solucions per a microbiologia de l’aigua: cribratge, enumeració, fluxos tècnics, medis de cultiu i materials de laboratori.', bullets: ['Disseny de producte enfocat a l’ús real.', 'Solucions per a virus, bacteris i control microbiològic de l’aigua.', 'Arquitectura pensada per a laboratoris, utilities, indústria i instal·lacions.'] },
    { title: 'Distribuïm i connectem l’anàlisi amb evidència digital', body: 'AquaVerify també ofereix AquaVerify Cloud, distribuïdors autoritzats, suport tècnic i programes OEM per escalar productes i operacions.', bullets: ['CRM, LIMS, ELN, informes CoA i portal client.', 'Xarxa global de distribuïdors i partners.', 'Opcions OEM, co-branding i marca blanca.'] }
  ],
  flowTitle: 'Un flux complet perquè l’anàlisi sigui una decisió, no només una lectura',
  flowBody: 'AquaVerify connecta producte, mostra, operació, revisió tècnica i informe perquè cada resultat es pugui usar com a evidència accionable.',
  flow: [
    { title: 'Mostra', body: 'Punt, ubicació, client i objectiu de control.' },
    { title: 'Producte', body: 'Kit, família, lot i material associat.' },
    { title: 'Preparació', body: 'Operador, protocol i execució de l’assaig.' },
    { title: 'Lectura', body: 'Resultat visual o quantitatiu llest per revisar.' },
    { title: 'Cloud', body: 'Registre LIMS, vincle amb client i traçabilitat.' },
    { title: 'Informe', body: 'CoA, revisió tècnica i publicació documental.' },
    { title: 'Acció', body: 'Portal client, auditoria, seguiment i decisió.' }
  ],
  pathsBody: 'Accedeix directament a productes, plataforma, solucions per sector, distribuïdors i programes OEM.',
  paths: [
    { id: 'products', title: 'Necessito productes d’anàlisi d’aigua', body: 'Kits quantitatius, proves presència/absència, fluxos ISO/EPA i materials essencials per a microbiologia de l’aigua.', cta: 'Veure catàleg de productes', pageId: 'products' },
    { id: 'platform', title: 'Necessito traçabilitat LIMS i reporting', body: 'Connecta mostra, client, operador, lot, resultat, revisió tècnica, CoA, portal client i històric documental.', cta: 'Veure AquaVerify Cloud', pageId: 'platform' },
    { id: 'industries', title: 'Necessito una solució per sector', body: 'Laboratoris, municipis, alimentació, indústria, instal·lacions, agricultura, farma, cosmètica, hostaleria i oci.', cta: 'Veure sectors', pageId: 'industries-hub' },
    { id: 'partners', title: 'Vull distribuir o oferir AquaVerify sota la meva marca', body: 'Troba suport local, amplia el canal o llança un programa OEM i marca blanca amb producte i plataforma.', cta: 'Veure distribuïdors', pageId: 'distributors', secondaryPageId: 'oem', secondaryCta: 'Veure programa OEM' }
  ],
  productsBody: 'Tria entre enumeració, presència/absència, fluxos tècnics, suport de laboratori i traçabilitat digital.',
  products: [
    { name: 'ENUMERA', body: 'Kits quantitatius per a enumeració microbiològica en aigua i lectures dissenyades per convertir-se en resultats documentables.', type: 'Quantitatiu · laboratoris · municipal', cta: 'Veure kits quantitatius ENUMERA', pageId: 'enumera' },
    { name: 'INDICA', body: 'Proves de presència/absència per a cribratge, verificació ràpida i control rutinari de l’aigua.', type: 'Cribratge · ràpid · operatiu', cta: 'Veure proves INDICA', pageId: 'indica' },
    { name: 'Kits ISO/EPA', body: 'Fluxos tècnics alineables amb referències reconegudes per a laboratoris i programes especialitzats.', type: 'ISO · EPA · laboratori', cta: 'Veure kits ISO/EPA', pageId: 'standard-kits' },
    { name: 'Lab Essentials', body: 'Medis, controls, reactius i materials preparats per reduir variabilitat operativa.', type: 'Medis · controls · materials', cta: 'Veure Lab Essentials', pageId: 'lab-essentials' },
    { name: 'AquaVerify Cloud', body: 'CRM, LIMS, ELN, CoA, portal client i traçabilitat per connectar producte, mostra, lectura i informe.', type: 'LIMS · CoA · portal', cta: 'Veure AquaVerify Cloud', pageId: 'platform' }
  ],
  compareHeaders: ['Família', 'Tipus de resposta', 'Ús principal', 'Client ideal', 'Següent pas'],
  compare: [
    { family: 'ENUMERA', type: 'Quantitatiu', use: 'Enumeració microbiològica', customer: 'Laboratoris, municipis, quality control', pageId: 'enumera' },
    { family: 'INDICA', type: 'Presència/absència', use: 'Cribratge ràpid', customer: 'Camp, control rutinari, cribratge', pageId: 'indica' },
    { family: 'Kits ISO/EPA', type: 'Fluxos tècnics', use: 'Mètodes orientats a referència', customer: 'Laboratoris avançats', pageId: 'standard-kits' },
    { family: 'Lab Essentials', type: 'Suport operatiu', use: 'Medis, reactius, controls', customer: 'Laboratoris de microbiologia', pageId: 'lab-essentials' },
    { family: 'AquaVerify Cloud', type: 'Digital', use: 'LIMS, CoA, traçabilitat, portal', customer: 'Labs, empreses, distribuïdors', pageId: 'platform' }
  ],
  platformBody: 'AquaVerify Cloud connecta CRM, LIMS, ELN, CoA, portal client, inventari, lots i traçabilitat documental en una sola capa operativa.',
  platformPoints: ['Context CRM per a leads, comptes i distribuïdors.', 'Espai LIMS per a mostres, lectures, revisió i informes.', 'Inventari, lots i evidències connectats amb documentació tècnica.'],
  industriesBody: 'Cada pàgina sectorial connecta font d’aigua, risc operatiu, productes, plataforma i reporting.',
  industries: [
    { title: 'Laboratoris d’anàlisi d’aigua', body: 'Kits, controls, reporting i traçabilitat per a laboratoris públics i privats.', pageId: 'water-testing-labs' },
    { title: 'Control de qualitat de l’aigua', body: 'Programes per a equips que necessiten control fiable de qualitat de l’aigua.', pageId: 'water-quality-control' },
    { title: 'Anàlisi d’aigua municipal', body: 'Mostreig, tractament, xarxa i evidència tècnica.', pageId: 'municipal-water-testing' },
    { title: 'Alimentació i begudes', body: 'Aigua de procés, neteja, ingredient i programes de qualitat.', pageId: 'food-beverage-water-quality' },
    { title: 'Aigua de procés industrial', body: 'Control operatiu per a aigua de procés, utilities i desviacions.', pageId: 'industrial-process-water' },
    { title: 'Gestió del risc en instal·lacions', body: 'Plans traçables per a edificis, actius i control recurrent.', pageId: 'facility-water-risk' },
    { title: 'Agricultura', body: 'Reg, aigua regenerada, campanyes, parcel·les i evidències.', pageId: 'agriculture-water' },
    { title: 'Farmacèutica i cosmètica', body: 'Evidència d’aigua connectada a lots, qualitat i documentació.', pageId: 'pharma-cosmetics-water' },
    { title: 'Hostaleria, turisme i oci', body: 'Programes de risc hídric per a hotels, oci i operacions multi-seu.', pageId: 'hospitality-tourism-water' }
  ],
  partnersBody: 'AquaVerify atén clients mitjançant distribuïdors autoritzats i dona suport a partners científics amb rutes OEM, co-branding i marca blanca.',
  distributorTitle: 'Distribuïdors autoritzats',
  distributorBody: 'Suport local, inventari, capacitació, qualificació de partner i cobertura regional per a productes i fluxos AquaVerify.',
  distributorCta: 'Trobar distribuïdor autoritzat',
  oemTitle: 'OEM, co-branding i marca blanca',
  oemBody: 'Programes per a packaging adaptat, subministrament tècnic, suport digital i distribució especialitzada sota marca partner.',
  oemCta: 'Explorar programes OEM',
  finalBody: 'Explora productes, compara sectors, revisa AquaVerify Cloud o inicia una cotització amb el context comercial adequat.'
};

const pathIcons = [Package, CloudLightning, Building2, Handshake];
const productIcons = [Gauge, TestTube2, FileCheck2, Beaker, CloudLightning];
const industryIcons = [Microscope, ShieldCheck, Building2, FlaskConical, Factory, ClipboardList, Leaf, TestTube2, Hotel];

const SectionHead: React.FC<{ eyebrow: string; title: string; body: string; sectionId: string }> = ({ eyebrow, title, body, sectionId }) => (
  <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
    <div className="max-w-3xl">
      <EditableText as="div" sectionId={sectionId} field="eyebrow" fallback={eyebrow} className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700 block" />
      <EditableText as="h2" sectionId={sectionId} field="title" fallback={title} className="mt-3 font-heading text-3xl font-black leading-tight text-primary md:text-5xl block" />
    </div>
    <EditableText as="p" sectionId={sectionId} field="body" fallback={body} className="max-w-xl text-base leading-8 text-slate-600 block" />
  </div>
);

const InternalCta: React.FC<{ to: string; children: React.ReactNode; tone?: 'primary' | 'dark' | 'light'; event?: string }> = ({ to, children, tone = 'light', event }) => {
  const tones = {
    primary: 'bg-secondary text-white shadow-lg shadow-cyan-500/20 hover:bg-primary',
    dark: 'bg-primary text-white shadow-lg shadow-primary/20 hover:bg-secondary',
    light: 'border border-slate-200 bg-white text-primary hover:border-cyan-200 hover:bg-cyan-50'
  };
  return (
    <Link to={to} data-event={event} className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-black transition ${tones[tone]}`}>
      {children}
      <ArrowRight className="ml-2 h-4 w-4" />
    </Link>
  );
};

export const HomeEcosystemLanding: React.FC = () => {
  const { lang } = useLanguage();
  const copy = COPY[lang] || COPY.en;
  const [activeCloudAssetIndex, setActiveCloudAssetIndex] = useState(0);
  const activeCloudAsset = CLOUD_HOME_ASSETS[activeCloudAssetIndex] || CLOUD_HOME_ASSETS[0];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveCloudAssetIndex((current) => (current + 1) % CLOUD_HOME_ASSETS.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);

  const showPreviousCloudAsset = () => {
    setActiveCloudAssetIndex((current) => (current - 1 + CLOUD_HOME_ASSETS.length) % CLOUD_HOME_ASSETS.length);
  };

  const showNextCloudAsset = () => {
    setActiveCloudAssetIndex((current) => (current + 1) % CLOUD_HOME_ASSETS.length);
  };
  const quoteUrl = getPlatformSignupUrl({ intent: 'quote', page: 'home' }, lang);
  const signupUrl = getPlatformSignupUrl({ intent: 'signup', page: 'home' }, lang);
  const faqs = HOME_FAQS[lang] || HOME_FAQS.en;

  return (
    <>
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_90%_8%,rgba(34,211,238,0.24),transparent_26%),radial-gradient(circle_at_10%_16%,rgba(10,45,77,0.10),transparent_30%)] pt-32 pb-16 md:pt-36">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl">
            <EditableText as="div" sectionId="homeHero" field="eyebrow" fallback={copy.heroEyebrow} className="inline-flex rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-primary block w-fit" />
            <h1 className="mt-5 max-w-5xl font-heading text-5xl font-black leading-[0.95] tracking-[-0.04em] text-primary md:text-7xl">
              <EditableText as="span" sectionId="homeHero" field="title" fallback={copy.heroTitle} />{' '}
              <EditableText as="span" sectionId="homeHero" field="highlightMain" fallback={copy.heroHighlight} className="bg-gradient-to-r from-primary via-secondary to-emerald-500 bg-clip-text text-transparent" />
              <EditableText as="span" sectionId="homeHero" field="slogan" fallback={copy.heroSlogan} className="mt-2 block bg-gradient-to-r from-primary via-secondary to-emerald-500 bg-clip-text text-transparent" />
            </h1>
            <EditableText as="p" sectionId="homeHero" field="lead" fallback={copy.heroLead} className="mt-6 max-w-5xl text-xl leading-8 text-slate-700 block" />
            <EditableText as="p" sectionId="homeHero" field="body" fallback={copy.heroBody} className="mt-4 max-w-5xl text-base leading-8 text-slate-600 block" />
            <div className="mt-8 flex flex-wrap gap-3">
              <InternalCta to={getMarketingPagePath('products', lang)} tone="primary" event="click_home_hero_products">{copy.ctas.products}</InternalCta>
              <InternalCta to={getMarketingPagePath('industries-hub', lang)} tone="dark" event="click_home_hero_industries">{copy.ctas.industries}</InternalCta>
              <InternalCta to={getMarketingPagePath('platform', lang)} event="click_home_hero_platform">{copy.ctas.platform}</InternalCta>
              <InternalCta to={getMarketingPagePath('distributors', lang)} event="click_home_hero_distributors">{copy.ctas.distributors}</InternalCta>
            </div>
            <HomeWorkflowAdvisorCta lang={lang} />
            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {copy.proof.map((item) => (
                <div key={item.value} className="rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-sm">
                  <strong className="block text-2xl font-black leading-none text-primary">{item.value}</strong>
                  <span className="mt-2 block text-[11px] font-black uppercase tracking-[0.12em] text-slate-500">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:items-stretch">
            <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-[#071521] p-4 shadow-2xl">
              <div className="relative min-h-[360px] flex-1 overflow-hidden rounded-3xl border border-white/10 bg-[#071521] md:min-h-[500px]">
                <video
                  className="absolute inset-0 h-full w-full object-contain object-center"
                  src={ENUMERA_VIDEO}
                  poster={ENUMERA_VIDEO_POSTER}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="ENUMERA tray color reading workflow"
                />
              </div>
              <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/70 p-5 text-white">
                <h2 className="font-heading text-2xl font-black">{copy.videoTitle}</h2>
                <p className="mt-2 text-sm leading-6 text-cyan-50/80">{copy.videoBody}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {copy.videoBadges.map((badge) => <span key={badge} className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-black text-cyan-50">{badge}</span>)}
                </div>
              </div>
            </article>

            <article className="group flex h-full flex-col rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-xl">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-black uppercase tracking-[0.16em] text-cyan-700">{copy.smartEyebrow}</span>
                <span className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-[11px] font-black text-primary">{copy.smartChip}</span>
              </div>
              <div className="mt-4 overflow-hidden rounded-2xl bg-slate-50">
                <img
                  alt="AquaVerify Smart Cap technology"
                  className="h-64 w-full object-cover transition duration-700 group-hover:scale-105"
                  src={SMART_CAP_IMAGE}
                  width={1200}
                  height={900}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h2 className="mt-5 font-heading text-2xl font-black leading-tight text-primary">{copy.smartTitle}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{copy.smartBody}</p>
              <div className="mt-4 grid gap-2">
                {copy.smartPoints.map((point, index) => (
                  <div key={point} className="flex gap-3 text-sm font-semibold leading-6 text-slate-700">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-xs font-black text-cyan-700">{index + 1}</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="aq-deferred-section bg-white pb-16 pt-8 md:pb-20 md:pt-10" id="what-we-do">
        <div className="container mx-auto px-6">
          <article className="mb-8 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-xl">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-center">
              <div>
                <span className="text-[11px] font-black uppercase tracking-[0.16em] text-cyan-700">AquaVerify</span>
                <h2 className="mt-3 font-heading text-2xl font-black leading-tight text-primary">{copy.quickTitle}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{copy.quickBody}</p>
                <div className="mt-4 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                  <img src={PRODUCT_WORKFLOW_IMAGE} alt="AquaVerify product workflow visual" className="h-32 w-full object-cover" loading="lazy" decoding="async" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {copy.quick.map((item) => (
                  <div key={item.value} className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                    <strong className="block text-lg font-black text-primary">{item.value}</strong>
                    <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>
          <SectionHead eyebrow={copy.whatEyebrow} title={copy.whatTitle} body={copy.whatBody} sectionId="homeWhat" />
          <div className="grid gap-5 lg:grid-cols-2">
            {copy.stories.map((story, index) => (
              <article key={story.title} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-primary">
                  {index === 0 ? <Factory className="h-5 w-5" /> : <CloudLightning className="h-5 w-5" />}
                </div>
                <h3 className="font-heading text-2xl font-black text-primary">{story.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{story.body}</p>
                <ul className="mt-5 grid gap-3">
                  {story.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm font-semibold leading-6 text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="aq-deferred-section bg-slate-50 py-16 md:py-20" id="sample-to-evidence">
        <div className="container mx-auto px-6">
          <SectionHead eyebrow={copy.flowEyebrow} title={copy.flowTitle} body={copy.flowBody} sectionId="homeFlow" />
          <div className="rounded-[2rem] bg-gradient-to-br from-[#071521] via-[#0b2f4c] to-[#0b5064] p-5 text-white shadow-2xl md:p-7">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-7">
              {copy.flow.map((step, index) => (
                <article key={step.title} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-300/15 text-sm font-black text-cyan-100">{index + 1}</span>
                  <h3 className="mt-4 font-heading text-lg font-black">{step.title}</h3>
                  <p className="mt-2 text-xs font-semibold leading-5 text-cyan-50/75">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="aq-deferred-section bg-white py-16 md:py-20" id="solutions" data-aq-section="buyer-pathways">
        <div className="container mx-auto px-6">
          <SectionHead eyebrow={copy.pathsEyebrow} title={copy.pathsTitle} body={copy.pathsBody} sectionId="homePaths" />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {copy.paths.map((path, index) => {
              const Icon = pathIcons[index] || Package;
              return (
                <article key={path.id} className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-xl font-black leading-tight text-primary">{path.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{path.body}</p>
                  <div className="mt-auto flex flex-wrap gap-3 pt-6">
                    <Link to={getMarketingPagePath(path.pageId, lang)} className="inline-flex items-center text-sm font-black text-secondary hover:text-primary">
                      {path.cta}<ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                    {path.secondaryPageId && <Link to={getMarketingPagePath(path.secondaryPageId, lang)} className="inline-flex items-center text-sm font-black text-primary hover:text-secondary">{path.secondaryCta}</Link>}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="aq-deferred-section bg-slate-50 py-16 md:py-20" id="products">
        <div className="container mx-auto px-6">
          <SectionHead eyebrow={copy.productsEyebrow} title={copy.productsTitle} body={copy.productsBody} sectionId="homeProducts" />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {copy.products.map((product, index) => {
              const Icon = productIcons[index] || Package;
              return (
                <article key={product.name} className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex h-36 items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-emerald-50">
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-primary shadow-lg">
                      <Icon className="h-9 w-9" />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-heading text-2xl font-black text-primary">{product.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{product.body}</p>
                    <div className="mt-4 rounded-2xl bg-slate-50 px-3 py-2 text-[11px] font-black uppercase tracking-[0.1em] text-slate-500">{product.type}</div>
                    <Link to={getMarketingPagePath(product.pageId, lang)} className="mt-auto inline-flex items-center pt-6 text-sm font-black text-secondary hover:text-primary">
                      {product.cta}<ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="aq-deferred-section bg-white py-16 md:py-20" id="product-comparison">
        <div className="container mx-auto px-6">
          <SectionHead eyebrow={copy.compareEyebrow} title={copy.compareTitle} body={copy.compareBody} sectionId="homeCompare" />
          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="bg-slate-50 text-[11px] font-black uppercase tracking-[0.12em] text-slate-500">
                <tr>{copy.compareHeaders.map((header) => <th key={header} className="px-5 py-4">{header}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {copy.compare.map((row) => (
                  <tr key={row.family}>
                    <td className="px-5 py-4 font-black text-primary">{row.family}</td>
                    <td className="px-5 py-4 font-semibold text-slate-700">{row.type}</td>
                    <td className="px-5 py-4 text-slate-600">{row.use}</td>
                    <td className="px-5 py-4 text-slate-600">{row.customer}</td>
                    <td className="px-5 py-4"><Link to={getMarketingPagePath(row.pageId, lang)} className="font-black text-secondary hover:text-primary">{row.family}</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="aq-deferred-section bg-slate-50 py-16 md:py-20" id="platform">
        <div className="container mx-auto grid gap-6 px-6 lg:grid-cols-[1.06fr_0.94fr] lg:items-stretch">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">{copy.platformEyebrow}</span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-black text-slate-600">CRM · LIMS · ELN · CoA</span>
            </div>
            <div
              className="overflow-hidden rounded-3xl border border-slate-100 bg-white"
              role="region"
              aria-roledescription="carousel"
              aria-label="AquaVerify Cloud screenshots"
            >
              <div className="relative aspect-[16/10] bg-white">
                {CLOUD_HOME_ASSETS.map((asset, index) => (
                  <div
                    key={asset.src}
                    className={`absolute inset-0 transition-opacity duration-700 ${index === activeCloudAssetIndex ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                    aria-hidden={index !== activeCloudAssetIndex}
                  >
                    <img
                      alt={asset.alt}
                      className="h-full w-full bg-white object-contain object-top"
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      src={asset.src}
                    />
                  </div>
                ))}

                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/85 via-primary/45 to-transparent px-5 pb-4 pt-16">
                  <div className="inline-flex rounded-full border border-white/15 bg-white/15 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-white backdrop-blur">
                    {activeCloudAsset.label} · {activeCloudAssetIndex + 1}/{CLOUD_HOME_ASSETS.length}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={showPreviousCloudAsset}
                  className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-primary/80 text-white shadow-lg backdrop-blur transition hover:bg-secondary focus:outline-none focus:ring-4 focus:ring-cyan-100"
                  aria-label="Previous AquaVerify Cloud screen"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={showNextCloudAsset}
                  className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-primary/80 text-white shadow-lg backdrop-blur transition hover:bg-secondary focus:outline-none focus:ring-4 focus:ring-cyan-100"
                  aria-label="Next AquaVerify Cloud screen"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>

                <div className="absolute right-4 top-4 flex gap-1.5">
                  {CLOUD_HOME_ASSETS.map((asset, index) => (
                    <button
                      key={`${asset.src}-dot`}
                      type="button"
                      onClick={() => setActiveCloudAssetIndex(index)}
                      className={`h-2.5 rounded-full transition-all ${index === activeCloudAssetIndex ? 'w-7 bg-secondary' : 'w-2.5 bg-primary/35 hover:bg-primary/60'}`}
                      aria-label={`Show ${asset.label} screen`}
                      aria-current={index === activeCloudAssetIndex ? 'true' : undefined}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="AquaVerify Cloud screenshot thumbnails">
              {CLOUD_HOME_ASSETS.map((asset, index) => (
                <button
                  key={asset.src}
                  type="button"
                  onClick={() => setActiveCloudAssetIndex(index)}
                  className={`overflow-hidden rounded-2xl border bg-slate-50 text-left transition hover:-translate-y-0.5 hover:shadow-md ${index === activeCloudAssetIndex ? 'border-cyan-300 ring-4 ring-cyan-100' : 'border-slate-100'}`}
                  aria-label={`Show ${asset.label} screen`}
                  aria-current={index === activeCloudAssetIndex ? 'true' : undefined}
                >
                  <img src={asset.src} alt={asset.alt} className="aspect-video w-full object-cover object-top" loading="lazy" decoding="async" />
                  <span className="block px-3 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">{asset.label}</span>
                </button>
              ))}
            </div>
          </article>
          <article className="rounded-[2rem] bg-gradient-to-br from-[#071521] via-[#0b2f4c] to-[#0b5064] p-8 text-white shadow-2xl">
            <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">{copy.platformEyebrow}</span>
            <h2 className="mt-4 font-heading text-4xl font-black leading-tight md:text-5xl">{copy.platformTitle}</h2>
            <p className="mt-4 text-base leading-8 text-cyan-50/80">{copy.platformBody}</p>
            <div className="mt-6 grid gap-3">
              {copy.platformPoints.map((point) => (
                <div key={point} className="flex gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm font-semibold leading-6 text-cyan-50">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <InternalCta to={getMarketingPagePath('platform', lang)} tone="primary" event="click_home_platform">{copy.ctas.platform}</InternalCta>
              <a href={signupUrl} data-event="click_home_platform_signup" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-black text-white transition hover:bg-white/15">
                {copy.ctas.signup}<ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="aq-deferred-section bg-white py-16 md:py-20" id="industries">
        <div className="container mx-auto px-6">
          <SectionHead eyebrow={copy.industriesEyebrow} title={copy.industriesTitle} body={copy.industriesBody} sectionId="homeIndustries" />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {copy.industries.map((industry, index) => {
              const Icon = industryIcons[index] || Building2;
              return (
                <Link key={industry.pageId} to={getMarketingPagePath(industry.pageId, lang)} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-primary transition group-hover:bg-secondary group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-xl font-black text-primary">{industry.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{industry.body}</p>
                  <span className="mt-5 inline-flex items-center text-sm font-black text-secondary">{copy.ctas.industries}<ArrowRight className="ml-1 h-4 w-4" /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="aq-deferred-section bg-slate-50 py-16 md:py-20" id="distributors">
        <div className="container mx-auto px-6">
          <SectionHead eyebrow={copy.partnersEyebrow} title={copy.partnersTitle} body={copy.partnersBody} sectionId="homePartners" />
          <div className="grid gap-5 lg:grid-cols-2">
            <article className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
              <img src={INDUSTRY_NETWORK_IMAGE} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-[0.07]" loading="lazy" decoding="async" />
              <div className="relative">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-primary"><Users className="h-5 w-5" /></div>
                <h3 className="font-heading text-3xl font-black text-primary">{copy.distributorTitle}</h3>
                <p className="mt-4 text-base leading-8 text-slate-600">{copy.distributorBody}</p>
                <InternalCta to={getMarketingPagePath('distributors', lang)} tone="primary" event="click_home_distributors">{copy.distributorCta}</InternalCta>
              </div>
            </article>
            <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl" id="oem">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-primary"><Handshake className="h-5 w-5" /></div>
              <h3 className="font-heading text-3xl font-black text-primary">{copy.oemTitle}</h3>
              <p className="mt-4 text-base leading-8 text-slate-600">{copy.oemBody}</p>
              <InternalCta to={getMarketingPagePath('oem', lang)} tone="dark" event="click_home_oem">{copy.oemCta}</InternalCta>
            </article>
          </div>
        </div>
      </section>

      <section className="aq-deferred-section bg-primary py-16 text-white" id="quote" data-aq-section="home-final-cta">
        <div className="container mx-auto grid gap-8 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">{copy.finalEyebrow}</span>
            <h2 className="mt-4 font-heading text-4xl font-black leading-tight md:text-6xl">{copy.finalTitle}</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-cyan-50/80">{copy.finalBody}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <InternalCta to={getMarketingPagePath('products', lang)} tone="primary">{copy.ctas.products}</InternalCta>
            <InternalCta to={getMarketingPagePath('platform', lang)}>{copy.ctas.platform}</InternalCta>
            <InternalCta to={getMarketingPagePath('distributors', lang)}>{copy.ctas.distributors}</InternalCta>
            <a href={quoteUrl} data-event="click_home_final_quote" className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-black text-primary transition hover:bg-cyan-50">
              {copy.ctas.quote}<ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="aq-deferred-section bg-white py-16 md:py-20" id="faq">
        <div className="container mx-auto px-6">
          <SectionHead eyebrow="FAQ" title={lang === 'en' ? 'Questions before choosing AquaVerify' : lang === 'fr' ? 'Questions avant de choisir AquaVerify' : lang === 'it' ? 'Domande prima di scegliere AquaVerify' : lang === 'ca' ? 'Preguntes abans de triar AquaVerify' : 'Preguntas antes de elegir AquaVerify'} body={lang === 'en' ? 'Clear answers for buyers comparing products, software, distributors and OEM routes.' : lang === 'fr' ? 'Réponses claires pour comparer produits, logiciel, distributeurs et parcours OEM.' : lang === 'it' ? 'Risposte chiare per confrontare prodotti, software, distributori e percorsi OEM.' : lang === 'ca' ? 'Respostes clares per comparar productes, software, distribuïdors i rutes OEM.' : 'Respuestas claras para comparar productos, software, distribuidores y rutas OEM.'} sectionId="homeFaqIntro" />
          <div className="grid gap-4 lg:grid-cols-2">
            {faqs.map((faq) => (
              <details key={faq.question} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <summary className="cursor-pointer list-none font-heading text-lg font-black text-primary">{faq.question}</summary>
                <p className="mt-3 text-sm leading-7 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeEcosystemLanding;
