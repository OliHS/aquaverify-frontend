import React, { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronRight, FileCheck2, FlaskConical, Gauge, Layers3, MapPin, ShieldCheck, Timer, Waves } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieConsent } from './CookieConsent';
import { IndustryGlossaryTerms } from './IndustryGlossaryTerms';
import type { Language } from '../utils/translations';
import { getPlatformSignupUrl } from '../utils/platformLinks';
import { trackCorporateEvent } from '../utils/corporateAnalytics';

type MarketingContent = {
  path: string;
  title: string;
  description: string;
  eyebrow?: string;
  primaryCta?: string;
  secondaryCta?: string;
  heroImage?: string;
  heroImageAlt?: string;
  gallery?: Array<{ src: string; alt: string; title?: string; body?: string }>;
  visuals?: {
    sampleFlow?: HtmlVisualBlock;
    maturity?: HtmlVisualBlock;
  };
  faqs?: Array<{ question: string; answer: string }>;
};

type HtmlVisualItem = {
  title?: string;
  body?: string;
  label?: string;
};

type HtmlVisualBlock = {
  eyebrow?: string;
  title?: string;
  body?: string;
  items?: HtmlVisualItem[];
  calloutTitle?: string;
  calloutBody?: string;
  cta?: string;
};

type Props = {
  content: MarketingContent;
  pageLang: Language;
  showCookieConsent?: boolean;
};

const iconMap = {
  shield: ShieldCheck,
  timer: Timer,
  file: FileCheck2,
  gauge: Gauge,
  flask: FlaskConical,
  map: MapPin,
  layers: Layers3,
  waves: Waves
};

const COPY: Record<Language, any> = {
  en: {
    nav: ['Challenge', 'Flow', 'Sectors', 'Technology', 'Process', 'FAQ'],
    breadcrumb: ['Industries', 'Water quality control'],
    valueBullets: [
      'Microbiological indicators such as somatic coliphages, E. coli, enterococci and other parameters according to the control programme.',
      'Ready-to-use kits and media for workflows designed around references such as ISO 10705-2 and EPA Method 1602.',
      'App, Cloud and digital reporting to link sample, user, location, time, result and report.',
      'Programmes adapted to utilities, food and beverage, laboratories, treatment, agriculture and seafood.'
    ],
    heroCard: {
      title: 'AquaVerify programme',
      subtitle: 'Sample -> result -> evidence',
      status: 'Audit-ready',
      metrics: [
        ['<6.5h', 'ENUMERA Soma result time*'],
        ['100 mL', 'low-count workflow'],
        ['360°', 'digital traceability']
      ],
      flow: [
        ['Sampling point', 'Location, matrix, batch and time', 'App'],
        ['Method and reading', 'Kit, laboratory or hybrid route', 'QA'],
        ['Report and action', 'CoA, alert, history and audit', 'Cloud']
      ],
      note: 'Manage the full chain of evidence: sampling context, method, result, report and follow-up.'
    },
    problem: {
      eyebrow: 'The challenge',
      title: 'Water control can no longer depend on scattered records',
      body: 'Quality teams need to prove where each sample was taken, which method was used, who handled it, when it was reviewed and how the evidence supports an operational or audit decision.',
      cards: [
        ['Invisible microbiological risk', 'Traditional indicators may not be enough to anticipate viral risk or barrier failure in raw, treated, reclaimed or process water.', 'shield'],
        ['Slow decisions', 'When analysis, reading and reporting arrive late, production, distribution, treatment or irrigation has already moved on.', 'timer'],
        ['Difficult audits', 'Paper records, spreadsheets, emails and isolated results make traceability and corrective actions harder to defend.', 'file'],
        ['Operational cost', 'Without clear data, teams repeat samples, overtreat, delay release decisions or carry avoidable uncertainty.', 'gauge']
      ]
    },
    infographic: {
      flowEyebrow: 'Visual workflow',
      flowTitle: 'From sample to auditable decision',
      flowBody: 'A connected workflow that brings method, sample, evidence, report and decision into one operational system.',
      matrixEyebrow: 'Sector matrix',
      matrixTitle: 'Sector, risk and solution matrix',
      matrixBody: 'A visual summary to connect each water-quality context with the most relevant control and reporting route.',
      maturityEyebrow: 'Maturity roadmap',
      maturityTitle: 'Water control maturity roadmap',
      maturityBody: 'See how an organisation can move from reactive checks to controlled, traceable and insight-led water quality management.'
    },
    sectors: {
      eyebrow: 'Sector workflows',
      title: 'Control programmes adapted to your operation',
      body: 'AquaVerify adapts the monitoring route to the water source, operational risk, sampling points and reporting requirements of each organisation.',
      tabs: [
        ['Municipal water and utilities', 'Source, treatment and network', 'For water quality directors, environmental engineers, network managers and compliance teams.', 'Main challenge', 'Meeting stricter requirements, monitoring source water and proving treatment performance without multiplying administrative load.', ['Somatic coliphage detection and enumeration programmes for faecal contamination and viral-risk context.', 'Traceability by network point, user, date, time and result.', 'Reports and evidence for water safety plans, internal audits and incident follow-up.'], ['Recommended control', 'Coliphages + network traceability'], ['Critical moment', 'Source, treatment and distribution'], ['Next step', 'Map sampling points']],
        ['Food and beverage', 'Process water and HACCP', 'For QA managers, production leaders, EHS teams and supply-chain auditors.', 'Main challenge', 'Process, cleaning, rinse or contact water can affect batches, line decisions and brand reputation.', ['Control routes for process water, ingredients, CIP, fresh produce washing and critical points.', 'Microbiology kits and digital reporting to support release decisions.', 'Evidence for internal audits, customer reviews, certifications and authorities.'], ['Recommended control', 'Indicators + HACCP reporting'], ['Critical moment', 'Contact, process and CIP water'], ['Next step', 'Validate critical points']],
        ['Environmental laboratories', 'Turnaround time and reports', 'For laboratory directors, senior technicians and environmental scientists.', 'Main challenge', 'Adding complex analyses while maintaining precision and reducing turnaround time without adding operational friction.', ['Somatic coliphage kits, ready-to-use media and reference-oriented workflows.', 'Digital sample, reading, review and report workflow.', 'Structured CoA, sample history and B2B customer coordination.'], ['Recommended control', 'ISO-oriented kits + LIMS/CoA'], ['Critical moment', 'Sample intake, reading and reporting'], ['Next step', 'Improve sample flow']],
        ['Water treatment facilities', 'Barriers and operations', 'For treatment engineers, operations leaders, EHS teams and plant managers.', 'Main challenge', 'Adjusting barriers, disinfection and processes when microbiological load changes, while avoiding undertreatment or unnecessary chemical cost.', ['Microbiological indicator monitoring across treatment-train points.', 'Digital history to review trends, deviations and corrective measures.', 'Operational reports for dosage, retention, release or investigation decisions.'], ['Recommended control', 'Barrier verification + digital history'], ['Critical moment', 'Inlet, post-barrier and outlet'], ['Next step', 'Review barrier evidence']],
        ['Agricultural water', 'Irrigation and campaigns', 'For agronomists, irrigation managers, sustainability and export-quality teams.', 'Main challenge', 'Reclaimed, surface or untreated water requires microbiological evidence to protect crops, animals and market access.', ['Microbiological verification for irrigation, hydroponics, aquaponics, livestock and fresh produce washing.', 'Georeferenced sampling records by plot, source or irrigation system.', 'Reporting for sustainability audits, certifications and chain traceability.'], ['Recommended control', 'Field verification + GIS'], ['Critical moment', 'Irrigation, washing and campaign'], ['Next step', 'Audit water sources']],
        ['Seafood and aquaculture', 'Water biosecurity', 'For biosecurity, QA, production, plant and export teams.', 'Main challenge', 'Bacterial or viral contamination in culture, washing, process or depuration water can trigger sanitary closures, perishable-product losses or export blocks.', ['Programmes for marine and brackish matrices with installation-specific indicator control.', 'Somatic coliphage monitoring and relevant parameters according to the biosecurity plan.', 'Alerts and traceability to act before a deviation affects biomass, product or permits.'], ['Recommended control', 'Aquaculture biosecurity + alerts'], ['Critical moment', 'Culture, depuration and process'], ['Next step', 'Define biosecurity plan']]
      ]
    },
    modules: {
      eyebrow: 'Technology + traceability',
      title: 'What your AquaVerify programme can include',
      body: 'AquaVerify can be configured as product supply, laboratory workflow, recurring control programme or digital traceability layer.',
      headers: ['Module', 'Primary use', 'Best suited for'],
      rows: [
        ['ENUMERA Soma 100 mL', 'Rapid enumeration of somatic coliphages in 100 mL; result time below 6.5 h and hands-on below 20 min according to product information.', 'Drinking water, reclaimed water and programmes needing fast decisions in low-count matrices.'],
        ['PLAQUE Soma 1 mL', 'Double-layer somatic coliphage enumeration for matrices using 1 mL or dilutions.', 'Laboratories, wastewater, surface water, sediments, sludge and shellfish extracts.'],
        ['PLAQUE Soma 100 mL', '100 mL enumeration route designed around ISO 10705-2 and EPA 1602 reference context.', 'Drinking water, reclaimed water and samples with expected low counts.'],
        ['INDICA Soma 100 mL', 'Presence/absence route for somatic coliphages in 100 mL for operational screening.', 'Rapid verification and escalation decisions.'],
        ['AquaVerify Cloud & App', 'Sample, location, user, time, reading, report and follow-up record.', 'Audited teams, multiple sampling points and supplier coordination.'],
        ['LIMS / Reporting / CoA', 'Standardisation from sample to report.', 'Laboratories, utilities, F&B and multi-site groups.']
      ]
    },
    process: {
      eyebrow: 'How it works',
      title: 'From sampling point to audit-ready report',
      body: 'A modular process that can start with kits, laboratory execution, digital traceability or a combined programme.',
      steps: [
        ['Design the programme', 'Define water type, critical points, frequency, parameters and reporting level.'],
        ['Select the method', 'Choose internal kit execution, partner laboratory, own laboratory or a hybrid model.'],
        ['Digitise the sample chain', 'Link each sample to location, user, date, time, batch, matrix and status.'],
        ['Validate evidence', 'Capture and review results with clear criteria to reduce manual error.'],
        ['Turn results into action', 'Generate report, history, alerts, corrective actions and audit documentation.']
      ]
    },
    regulation: {
      eyebrow: 'Compliance and audit',
      title: 'Regulation and audits require stronger water evidence',
      body: 'Water control is moving toward risk management, operational monitoring, barrier verification and documented evidence. AquaVerify helps teams organise process, method, evidence and decision in a defensible workflow.',
      sourcesTitle: 'Reference context',
      sourcesBody: 'Use the applicable standard, accredited method and competent authority requirements for each matrix and jurisdiction.'
    },
    profiles: {
      eyebrow: 'Teams',
      title: 'Built for teams that answer to audits, production and risk',
      items: [
        ['Water quality director', 'Compliance, network control and incident response.', 'Turn each sampling point into traceable evidence.'],
        ['Food & beverage QA manager', 'Avoid contamination, recalls and line blocks.', 'Validate critical water before production decisions.'],
        ['Laboratory director', 'Increase capacity and reduce turnaround time.', 'Standardise coliphage workflow and reporting.'],
        ['Treatment engineer', 'Verify barriers and optimise disinfection.', 'Make treatment decisions with microbiological history.'],
        ['Agronomy team', 'Protect irrigation, export and chain traceability.', 'Demonstrate water control by plot, source and campaign.'],
        ['Aquaculture biosecurity', 'Prevent closures and contamination losses.', 'Anticipate deviations in culture or process water.']
      ]
    },
    form: {
      eyebrow: 'Technical diagnosis',
      title: 'Build a more traceable, faster and defensible water control system',
      body: 'Share your sector, water type and sample volume. We will route you into the AquaVerify platform so the request enters the real CRM workflow with source and context.',
      labels: ['Name', 'Company', 'Professional email', 'Sector', 'Country', 'Water type', 'Samples per month', 'Current method', 'Main need'],
      placeholders: ['Name and surname', 'Organisation', 'name@company.com', 'Spain, France, United States...', 'Drinking, process, irrigation, reclaimed...', '50, 200, 1000+', 'Current kit, lab, spreadsheet, LIMS...', 'Audit, coliphages, turnaround time, digital traceability...'],
      sectors: ['Municipal water / utility', 'Food & beverage', 'Environmental laboratory', 'Water treatment', 'Agriculture', 'Seafood / aquaculture', 'Other'],
      submit: 'Continue in AquaVerify Cloud',
      privacy: 'The request continues in AquaVerify Cloud so the commercial team receives it with source, sector and water-control context.',
      sticky: 'Evaluate your water control'
    }
  },
  es: {
    nav: ['Problema', 'Flujo', 'Sectores', 'Tecnología', 'Proceso', 'FAQ'],
    breadcrumb: ['Industrias', 'Control de calidad del agua'],
    valueBullets: [
      'Indicadores microbiológicos como colífagos somáticos, E. coli, enterococos y otros parámetros según el programa de control.',
      'Kits y medios listos para usar en flujos diseñados alrededor de referencias como ISO 10705-2 y EPA Method 1602.',
      'App, Cloud y reporting digital para vincular muestra, usuario, ubicación, hora, resultado e informe.',
      'Programas adaptados a utilities, food & beverage, laboratorios, tratamiento, agricultura y seafood.'
    ],
    heroCard: {
      title: 'Programa AquaVerify',
      subtitle: 'Muestra -> resultado -> evidencia',
      status: 'Audit-ready',
      metrics: [['<6,5h', 'resultado en ENUMERA Soma*'], ['100 mL', 'flujo para bajos recuentos'], ['360°', 'trazabilidad digital']],
      flow: [['Punto de muestreo', 'Ubicación, matriz, lote y hora', 'App'], ['Método y lectura', 'Kit, laboratorio o flujo mixto', 'QA'], ['Informe y acción', 'CoA, alerta, histórico y auditoría', 'Cloud']],
      note: 'Gestiona la cadena completa de evidencia: contexto de muestra, método, resultado, informe y seguimiento.'
    },
    problem: {
      eyebrow: 'El problema que resolvemos',
      title: 'El control del agua ya no puede depender de registros dispersos',
      body: 'Los equipos de calidad necesitan demostrar dónde se tomó cada muestra, qué método se utilizó, quién la gestionó, cuándo se revisó y cómo la evidencia sostiene una decisión operativa o una auditoría.',
      cards: [
        ['Riesgo microbiológico invisible', 'Los indicadores tradicionales pueden no ser suficientes para anticipar riesgos virales o fallos de barrera en agua bruta, tratada, regenerada o de proceso.', 'shield'],
        ['Decisiones lentas', 'Cuando el análisis, la lectura y el informe llegan tarde, la operación ya ha seguido avanzando: producción, distribución, tratamiento o riego.', 'timer'],
        ['Auditorías difíciles', 'Registros en papel, Excel, emails y resultados aislados dificultan demostrar trazabilidad y acciones correctoras.', 'file'],
        ['Coste operativo', 'Sin datos claros, los equipos repiten muestras, sobreactúan, retrasan liberaciones o asumen incertidumbre evitable.', 'gauge']
      ]
    },
    infographic: {
      flowEyebrow: 'Flujo visual',
      flowTitle: 'De muestra a decisión auditable',
      flowBody: 'Un flujo conectado para reunir método, muestra, evidencia, informe y decisión en un mismo sistema operativo.',
      matrixEyebrow: 'Matriz sectorial',
      matrixTitle: 'Matriz sector, riesgo y solución',
      matrixBody: 'Un resumen visual para conectar cada contexto de calidad del agua con la ruta de control y reporting más adecuada.',
      maturityEyebrow: 'Roadmap de madurez',
      maturityTitle: 'Roadmap de madurez del control hídrico',
      maturityBody: 'Visualiza cómo una organización puede pasar de controles reactivos a una gestión controlada, trazable y basada en datos.'
    },
    sectors: {
      eyebrow: 'Soluciones por sector',
      title: 'Programas de control adaptados a tu operación',
      body: 'AquaVerify adapta la ruta de monitorización a la fuente de agua, riesgo operativo, puntos de muestreo y requisitos de reporting de cada organización.',
      tabs: [
        ['Empresas municipales y utilities', 'Captación, tratamiento y red', 'Para dirección de calidad del agua, ingeniería ambiental, responsables de red y compliance.', 'Reto principal', 'Cumplir requisitos cada vez más exigentes, controlar captaciones y demostrar eficacia de tratamiento sin multiplicar carga administrativa.', ['Programas de detección y enumeración de colífagos somáticos como indicadores de contaminación fecal y posible riesgo viral.', 'Trazabilidad por punto de red, usuario, fecha, hora y resultado.', 'Informes y evidencias para planes sanitarios del agua, auditorías internas y seguimiento de incidencias.'], ['Control recomendado', 'Colífagos + trazabilidad de red'], ['Momento crítico', 'Captación, tratamiento y distribución'], ['Siguiente paso', 'Mapear puntos de muestreo']],
        ['Food & beverage', 'Agua de proceso y APPCC', 'Para QA managers, responsables de producción, EHS y auditorías de cadena de suministro.', 'Reto principal', 'El agua de proceso, lavado, limpieza o contacto puede comprometer lotes, decisiones de línea y reputación de marca.', ['Flujos de control para agua de proceso, ingredientes, limpieza CIP, lavado de producto fresco y puntos críticos.', 'Kits microbiológicos y reporting digital para apoyar decisiones antes de liberar producción.', 'Evidencia para auditorías internas, clientes, certificaciones y autoridades.'], ['Control recomendado', 'Indicadores + reporting APPCC'], ['Momento crítico', 'Agua de contacto, proceso y CIP'], ['Siguiente paso', 'Validar puntos críticos']],
        ['Laboratorios ambientales', 'TAT, métodos y CoA', 'Para dirección de laboratorio, técnicos senior y equipos científicos ambientales.', 'Reto principal', 'Incorporar análisis complejos, mantener precisión y reducir tiempos de entrega sin aumentar fricción operativa.', ['Kits de colífagos somáticos, medios listos para usar y flujos apoyados en referencias metodológicas.', 'Digitalización del flujo de muestra, lectura, revisión e informe.', 'CoA estructurados, histórico de muestras y coordinación con clientes B2B.'], ['Control recomendado', 'Kits orientados a ISO + LIMS/CoA'], ['Momento crítico', 'Entrada, lectura y emisión'], ['Siguiente paso', 'Mejorar flujo de muestras']],
        ['Tratamiento de agua', 'Barreras y operación', 'Para ingeniería de tratamiento, operaciones, EHS y gestión de plantas.', 'Reto principal', 'Ajustar barreras, desinfección y procesos ante variaciones microbiológicas evitando subtratamientos o costes químicos innecesarios.', ['Monitorización de indicadores microbiológicos por puntos del tren de tratamiento.', 'Histórico digital para revisar tendencias, desviaciones y medidas correctoras.', 'Informes operativos para decisiones de dosificación, retención, liberación o investigación.'], ['Control recomendado', 'Verificación de barreras + histórico digital'], ['Momento crítico', 'Entrada, post-barrera y salida'], ['Siguiente paso', 'Revisar evidencias de barrera']],
        ['Agua agrícola', 'Riego, parcelas y campaña', 'Para agronomía, responsables de riego, sostenibilidad y calidad agroalimentaria.', 'Reto principal', 'El uso de agua regenerada, superficial o no tratada exige evidencia microbiológica para proteger cultivos, animales y acceso a mercados.', ['Verificación microbiológica de agua de riego, hidroponía, aquaponía, ganadería y lavado de producto fresco.', 'Registro georreferenciado por parcela, captación o sistema de riego.', 'Reporting para auditorías de sostenibilidad, certificaciones y trazabilidad de cadena.'], ['Control recomendado', 'Verificación en campo + GIS'], ['Momento crítico', 'Riego, lavado y campaña'], ['Siguiente paso', 'Auditar fuentes de agua']],
        ['Seafood y acuicultura', 'Bioseguridad hídrica', 'Para bioseguridad, QA, producción, planta y exportación.', 'Reto principal', 'La contaminación bacteriana o viral en agua de cultivo, lavado, proceso o depuración puede provocar cierres sanitarios, pérdidas y bloqueos de exportación.', ['Programas para matrices marinas y salobres, con control de indicadores relevantes por instalación.', 'Monitorización de colífagos somáticos y parámetros relevantes según el plan de bioseguridad.', 'Alertas y trazabilidad para actuar antes de que una desviación afecte biomasa, producto o permisos.'], ['Control recomendado', 'Bioseguridad acuícola + alertas'], ['Momento crítico', 'Cultivo, depuración y proceso'], ['Siguiente paso', 'Definir plan de bioseguridad']]
      ]
    },
    modules: {
      eyebrow: 'Tecnología + trazabilidad',
      title: 'Qué puede incluir tu programa AquaVerify',
      body: 'AquaVerify puede configurarse como suministro de producto, flujo de laboratorio, programa recurrente o capa digital de trazabilidad.',
      headers: ['Módulo', 'Uso principal', 'Ideal para'],
      rows: [
        ['ENUMERA Soma 100 mL', 'Enumeración rápida de colífagos somáticos en 100 mL; tiempo de resultado inferior a 6,5 h y hands-on inferior a 20 min según ficha de producto.', 'Agua de consumo, regenerada y programas que necesitan respuesta rápida en matrices con bajos recuentos.'],
        ['PLAQUE Soma 1 mL', 'Enumeración de colífagos somáticos con doble capa para matrices donde se trabaja con 1 mL o diluciones.', 'Laboratorios, aguas residuales, superficiales, sedimentos, lodos y extractos de marisco.'],
        ['PLAQUE Soma 100 mL', 'Ruta de enumeración en 100 mL diseñada alrededor del contexto ISO 10705-2 y EPA 1602.', 'Agua potable, regenerada y muestras con bajos recuentos esperados.'],
        ['INDICA Soma 100 mL', 'Presencia/ausencia de colífagos somáticos en 100 mL para screening operativo.', 'Verificación rápida y decisiones de escalado.'],
        ['AquaVerify Cloud & App', 'Registro de muestra, ubicación, usuario, hora, lectura, informe y seguimiento.', 'Equipos auditados, múltiples puntos de muestreo y coordinación con proveedores.'],
        ['LIMS / Reporting / CoA', 'Estandarización desde muestra hasta informe.', 'Laboratorios, utilities, F&B y grupos multi-site.']
      ]
    },
    process: {
      eyebrow: 'Cómo funciona',
      title: 'Del punto de muestreo al informe audit-ready',
      body: 'Un proceso modular que permite empezar con kits, laboratorio, trazabilidad digital o un programa combinado.',
      steps: [['Diseñamos el programa', 'Definimos tipo de agua, puntos críticos, frecuencia, parámetros y nivel de reporting.'], ['Seleccionamos el método', 'Elegimos kit interno, laboratorio partner, laboratorio propio o modelo híbrido.'], ['Digitalizamos la cadena', 'Vinculamos cada muestra con ubicación, usuario, fecha, hora, lote, matriz y estado.'], ['Validamos evidencia', 'Capturamos y revisamos resultados con criterios claros para reducir error manual.'], ['Convertimos en decisión', 'Generamos informe, histórico, alertas, acciones correctoras y documentación para auditoría.']]
    },
    regulation: {
      eyebrow: 'Compliance y auditoría',
      title: 'La regulación y las auditorías exigen más trazabilidad del agua',
      body: 'El control del agua avanza hacia gestión del riesgo, monitorización operativa, verificación de barreras y evidencia documentada. AquaVerify ayuda a organizar proceso, método, evidencia y decisión en un flujo defendible.',
      sourcesTitle: 'Contexto de referencia',
      sourcesBody: 'Utiliza siempre la norma aplicable, el método acreditado y los requisitos de la autoridad competente para cada matriz y jurisdicción.'
    },
    profiles: {
      eyebrow: 'Equipos',
      title: 'Pensado para equipos que responden ante auditorías, producción y riesgo',
      items: [['Dirección de calidad del agua', 'Cumplimiento, control de red y respuesta a incidencias.', 'Convierte cada punto de muestreo en evidencia trazable.'], ['QA Manager F&B', 'Evitar contaminación, recalls y bloqueos de línea.', 'Valida agua crítica antes de decisiones de producción.'], ['Dirección de laboratorio', 'Aumentar capacidad y reducir TAT.', 'Estandariza colífagos y reporting.'], ['Ingeniería de tratamiento', 'Verificar barreras y optimizar desinfección.', 'Toma decisiones con histórico microbiológico.'], ['Equipo agronómico', 'Proteger riego, exportación y trazabilidad.', 'Demuestra control del agua por parcela, fuente y campaña.'], ['Bioseguridad acuícola', 'Prevenir cierres y pérdidas por contaminación.', 'Anticipa desviaciones en agua de cultivo o proceso.']]
    },
    form: {
      eyebrow: 'Diagnóstico técnico',
      title: 'Construye un sistema de control del agua más trazable, rápido y defendible',
      body: 'Comparte tu sector, tipo de agua y volumen de muestras. Te llevaremos a AquaVerify Cloud para que la solicitud entre en el CRM real con origen y contexto.',
      labels: ['Nombre', 'Empresa', 'Email profesional', 'Sector', 'País', 'Tipo de agua', 'Muestras al mes', 'Método actual', 'Necesidad principal'],
      placeholders: ['Nombre y apellidos', 'Organización', 'nombre@empresa.com', 'España, Francia, Estados Unidos...', 'Consumo, proceso, riego, regenerada...', '50, 200, 1000+', 'Kit actual, laboratorio, Excel, LIMS...', 'Auditoría, colífagos, TAT, trazabilidad digital...'],
      sectors: ['Utility / municipal', 'Food & beverage', 'Laboratorio ambiental', 'Tratamiento de agua', 'Agricultura', 'Seafood / acuicultura', 'Otro'],
      submit: 'Continuar en AquaVerify Cloud',
      privacy: 'La solicitud continúa en AquaVerify Cloud para que el equipo comercial la reciba con origen, sector y contexto de control hídrico.',
      sticky: 'Evalúa tu control hídrico'
    }
  },
  fr: null,
  it: null,
  ca: null
};

COPY.fr = {
  ...COPY.en,
  nav: ['Problème', 'Flux', 'Secteurs', 'Technologie', 'Processus', 'FAQ'],
  breadcrumb: ['Industries', 'Contrôle qualité de l’eau'],
  valueBullets: [
    'Indicateurs microbiologiques comme les coliphages somatiques, E. coli, entérocoques et autres paramètres selon le programme de contrôle.',
    'Kits et milieux prêts à l’emploi pour des workflows conçus autour de références comme ISO 10705-2 et EPA Method 1602.',
    'App, Cloud et reporting numérique pour relier échantillon, utilisateur, site, heure, résultat et rapport.',
    'Programmes adaptés aux utilities, à l’agroalimentaire, aux laboratoires, au traitement, à l’agriculture et au seafood.'
  ],
  heroCard: {
    title: 'Programme AquaVerify',
    subtitle: 'Échantillon -> résultat -> preuve',
    status: 'Prêt pour audit',
    metrics: [['<6,5h', 'délai résultat ENUMERA Soma*'], ['100 mL', 'workflow faibles concentrations'], ['360°', 'traçabilité numérique']],
    flow: [['Point de prélèvement', 'Site, matrice, lot et heure', 'App'], ['Méthode et lecture', 'Kit, laboratoire ou flux hybride', 'QA'], ['Rapport et action', 'CoA, alerte, historique et audit', 'Cloud']],
    note: 'Gérez toute la chaîne de preuve: contexte de prélèvement, méthode, résultat, rapport et suivi.'
  },
  problem: {
    eyebrow: 'Le problème',
    title: 'Le contrôle de l’eau ne peut plus dépendre de dossiers dispersés',
    body: 'Les équipes qualité doivent démontrer où chaque échantillon a été prélevé, quelle méthode a été utilisée, qui l’a géré, quand il a été revu et comment la preuve soutient une décision opérationnelle ou un audit.',
    cards: [
      ['Risque microbiologique invisible', 'Les indicateurs traditionnels peuvent être insuffisants pour anticiper le risque viral ou une rupture de barrière dans l’eau brute, traitée, réutilisée ou de process.', 'shield'],
      ['Décisions lentes', 'Quand l’analyse, la lecture et le rapport arrivent trop tard, la production, la distribution, le traitement ou l’irrigation ont déjà avancé.', 'timer'],
      ['Audits difficiles', 'Papier, tableurs, emails et résultats isolés compliquent la traçabilité et la défense des actions correctives.', 'file'],
      ['Coût opérationnel', 'Sans données claires, les équipes répètent des échantillons, surtraitent, retardent des libérations ou acceptent une incertitude évitable.', 'gauge']
    ]
  },
  infographic: {
    flowEyebrow: 'Workflow visuel',
    flowTitle: 'De l’échantillon à la décision auditable',
    flowBody: 'Un workflow connecté qui réunit méthode, échantillon, preuve, rapport et décision dans un même système opérationnel.',
    matrixEyebrow: 'Matrice sectorielle',
    matrixTitle: 'Matrice secteur, risque et solution',
    matrixBody: 'Un résumé visuel pour relier chaque contexte de qualité de l’eau à la meilleure route de contrôle et de reporting.',
    maturityEyebrow: 'Roadmap de maturité',
    maturityTitle: 'Roadmap de maturité du contrôle de l’eau',
    maturityBody: 'Visualisez le passage de contrôles réactifs à une gestion maîtrisée, traçable et pilotée par la donnée.'
  },
  sectors: {
    eyebrow: 'Workflows par secteur',
    title: 'Programmes de contrôle adaptés à votre opération',
    body: 'AquaVerify adapte la route de monitoring à la source d’eau, au risque opérationnel, aux points de prélèvement et aux exigences de reporting.',
    tabs: [
      ['Eau municipale et utilities', 'Captage, traitement et réseau', 'Pour directions qualité eau, ingénierie environnementale, responsables réseau et conformité.', 'Défi principal', 'Répondre à des exigences plus strictes, surveiller les captages et prouver la performance du traitement sans multiplier la charge administrative.', ['Programmes de détection et d’énumération des coliphages somatiques pour le contexte contamination fécale et risque viral.', 'Traçabilité par point de réseau, utilisateur, date, heure et résultat.', 'Rapports et preuves pour plans de sécurité sanitaire de l’eau, audits internes et suivi d’incidents.'], ['Contrôle recommandé', 'Coliphages + traçabilité réseau'], ['Moment critique', 'Captage, traitement et distribution'], ['Étape suivante', 'Cartographier les points']],
      ['Food & beverage', 'Eau de process et HACCP', 'Pour responsables QA, production, EHS et audits supply chain.', 'Défi principal', 'L’eau de process, de nettoyage, de rinçage ou de contact peut affecter les lots, les décisions de ligne et la réputation.', ['Routes de contrôle pour eau de process, ingrédients, CIP, lavage de produits frais et points critiques.', 'Kits microbiologiques et reporting numérique pour soutenir les décisions de libération.', 'Preuves pour audits internes, clients, certifications et autorités.'], ['Contrôle recommandé', 'Indicateurs + reporting HACCP'], ['Moment critique', 'Contact, process et CIP'], ['Étape suivante', 'Valider les points critiques']],
      ['Laboratoires environnementaux', 'Délais et rapports', 'Pour directions de laboratoire, techniciens senior et équipes scientifiques environnementales.', 'Défi principal', 'Ajouter des analyses complexes tout en maintenant la précision et en réduisant le délai de rendu.', ['Kits de coliphages somatiques, milieux prêts à l’emploi et workflows orientés références.', 'Workflow numérique d’échantillon, lecture, revue et rapport.', 'CoA structurés, historique d’échantillons et coordination client B2B.'], ['Contrôle recommandé', 'Kits orientés ISO + LIMS/CoA'], ['Moment critique', 'Réception, lecture et reporting'], ['Étape suivante', 'Fluidifier le flux échantillon']],
      ['Sites de traitement de l’eau', 'Barrières et opérations', 'Pour ingénierie de traitement, opérations, EHS et direction de sites.', 'Défi principal', 'Ajuster barrières, désinfection et process lorsque la charge microbiologique varie, en évitant sous-traitement ou coût chimique inutile.', ['Monitoring d’indicateurs microbiologiques sur le train de traitement.', 'Historique numérique pour revoir tendances, écarts et mesures correctives.', 'Rapports opérationnels pour dosage, rétention, libération ou investigation.'], ['Contrôle recommandé', 'Vérification barrière + historique'], ['Moment critique', 'Entrée, post-barrière et sortie'], ['Étape suivante', 'Revoir les preuves barrière']],
      ['Eau agricole', 'Irrigation et campagnes', 'Pour agronomie, irrigation, durabilité et qualité export.', 'Défi principal', 'L’eau réutilisée, de surface ou non traitée exige une preuve microbiologique pour protéger cultures, animaux et accès marché.', ['Vérification microbiologique pour irrigation, hydroponie, aquaponie, élevage et lavage de produits frais.', 'Enregistrements géoréférencés par parcelle, source ou système d’irrigation.', 'Reporting pour audits durabilité, certifications et traçabilité de chaîne.'], ['Contrôle recommandé', 'Vérification terrain + GIS'], ['Moment critique', 'Irrigation, lavage et campagne'], ['Étape suivante', 'Auditer les sources']],
      ['Seafood et aquaculture', 'Biosécurité de l’eau', 'Pour biosécurité, QA, production, site et export.', 'Défi principal', 'Une contamination bactérienne ou virale dans l’eau d’élevage, lavage, process ou dépuration peut déclencher fermetures, pertes ou blocages export.', ['Programmes pour matrices marines et saumâtres avec contrôle d’indicateurs par installation.', 'Monitoring des coliphages somatiques et paramètres pertinents selon le plan de biosécurité.', 'Alertes et traçabilité pour agir avant qu’un écart affecte biomasse, produit ou permis.'], ['Contrôle recommandé', 'Biosécurité aquaculture + alertes'], ['Moment critique', 'Élevage, dépuration et process'], ['Étape suivante', 'Définir le plan']]
    ]
  },
  modules: {
    eyebrow: 'Technologie + traçabilité',
    title: 'Ce que votre programme AquaVerify peut inclure',
    body: 'AquaVerify peut être configuré comme fourniture produit, workflow laboratoire, programme récurrent ou couche de traçabilité numérique.',
    headers: ['Module', 'Usage principal', 'Idéal pour'],
    rows: [
      ['ENUMERA Soma 100 mL', 'Énumération rapide des coliphages somatiques en 100 mL; délai résultat inférieur à 6,5 h et manipulation inférieure à 20 min selon les informations produit.', 'Eau potable, eau réutilisée et programmes nécessitant des décisions rapides en faibles concentrations.'],
      ['PLAQUE Soma 1 mL', 'Énumération double couche des coliphages somatiques pour matrices en 1 mL ou dilutions.', 'Laboratoires, eaux usées, eaux de surface, sédiments, boues et extraits de coquillages.'],
      ['PLAQUE Soma 100 mL', 'Route d’énumération en 100 mL conçue autour du contexte ISO 10705-2 et EPA 1602.', 'Eau potable, eau réutilisée et échantillons à faibles concentrations attendues.'],
      ['INDICA Soma 100 mL', 'Présence/absence des coliphages somatiques en 100 mL pour screening opérationnel.', 'Vérification rapide et décisions d’escalade.'],
      ['AquaVerify Cloud & App', 'Enregistrement échantillon, site, utilisateur, heure, lecture, rapport et suivi.', 'Équipes auditées, nombreux points de prélèvement et coordination fournisseurs.'],
      ['LIMS / Reporting / CoA', 'Standardisation de l’échantillon au rapport.', 'Laboratoires, utilities, F&B et groupes multi-sites.']
    ]
  },
  process: {
    eyebrow: 'Comment ça marche',
    title: 'Du point de prélèvement au rapport prêt pour audit',
    body: 'Un processus modulaire qui peut démarrer par kits, exécution laboratoire, traçabilité numérique ou programme combiné.',
    steps: [['Concevoir le programme', 'Définir type d’eau, points critiques, fréquence, paramètres et niveau de reporting.'], ['Choisir la méthode', 'Sélectionner kit interne, laboratoire partenaire, laboratoire propre ou modèle hybride.'], ['Numériser la chaîne échantillon', 'Relier chaque échantillon à site, utilisateur, date, heure, lot, matrice et statut.'], ['Valider la preuve', 'Capturer et revoir les résultats avec des critères clairs pour réduire l’erreur manuelle.'], ['Transformer en action', 'Générer rapport, historique, alertes, actions correctives et documentation d’audit.']]
  },
  regulation: {
    eyebrow: 'Conformité et audit',
    title: 'La réglementation et les audits exigent une preuve plus forte',
    body: 'Le contrôle de l’eau évolue vers gestion du risque, monitoring opérationnel, vérification des barrières et preuves documentées. AquaVerify aide à organiser processus, méthode, preuve et décision dans un workflow défendable.',
    sourcesTitle: 'Contexte de référence',
    sourcesBody: 'Utilisez toujours la norme applicable, la méthode accréditée et les exigences de l’autorité compétente pour chaque matrice et juridiction.'
  },
  profiles: {
    eyebrow: 'Équipes',
    title: 'Conçu pour les équipes responsables des audits, de la production et du risque',
    items: [['Direction qualité eau', 'Conformité, contrôle réseau et réponse incidents.', 'Transformer chaque point de prélèvement en preuve traçable.'], ['Responsable QA F&B', 'Éviter contamination, rappels et blocages de ligne.', 'Valider l’eau critique avant les décisions production.'], ['Direction laboratoire', 'Augmenter la capacité et réduire les délais.', 'Standardiser coliphages et reporting.'], ['Ingénierie traitement', 'Vérifier barrières et optimiser désinfection.', 'Décider avec un historique microbiologique.'], ['Équipe agronomie', 'Protéger irrigation, export et traçabilité.', 'Démontrer le contrôle par parcelle, source et campagne.'], ['Biosécurité aquaculture', 'Prévenir fermetures et pertes de contamination.', 'Anticiper les écarts en eau d’élevage ou de process.']]
  },
  form: {
    ...COPY.en.form,
    eyebrow: 'Diagnostic technique',
    title: 'Construisez un système de contrôle de l’eau plus traçable, rapide et défendable',
    body: 'Partagez votre secteur, type d’eau et volume d’échantillons. La demande continuera dans AquaVerify Cloud avec origine et contexte pour l’équipe commerciale.',
    labels: ['Nom', 'Entreprise', 'Email professionnel', 'Secteur', 'Pays', 'Type d’eau', 'Échantillons par mois', 'Méthode actuelle', 'Besoin principal'],
    placeholders: ['Nom et prénom', 'Organisation', 'nom@entreprise.com', 'France, Espagne, États-Unis...', 'Potable, process, irrigation, réutilisée...', '50, 200, 1000+', 'Kit actuel, laboratoire, tableur, LIMS...', 'Audit, coliphages, délais, traçabilité numérique...'],
    sectors: ['Utility / municipal', 'Food & beverage', 'Laboratoire environnemental', 'Traitement de l’eau', 'Agriculture', 'Seafood / aquaculture', 'Autre'],
    submit: 'Continuer dans AquaVerify Cloud',
    privacy: 'La demande continue dans AquaVerify Cloud avec le contexte nécessaire au suivi commercial.',
    sticky: 'Évaluer votre contrôle eau'
  }
};

COPY.it = {
  ...COPY.en,
  nav: ['Problema', 'Flusso', 'Settori', 'Tecnologia', 'Processo', 'FAQ'],
  breadcrumb: ['Settori', 'Controllo qualità acqua'],
  valueBullets: [
    'Indicatori microbiologici come colifagi somatici, E. coli, enterococchi e altri parametri secondo il programma di controllo.',
    'Kit e terreni pronti all’uso per workflow progettati intorno a riferimenti come ISO 10705-2 ed EPA Method 1602.',
    'App, Cloud e reporting digitale per collegare campione, utente, ubicazione, ora, risultato e report.',
    'Programmi adattati a utility, food & beverage, laboratori, trattamento, agricoltura e seafood.'
  ],
  heroCard: {
    title: 'Programma AquaVerify',
    subtitle: 'Campione -> risultato -> evidenza',
    status: 'Pronto per audit',
    metrics: [['<6,5h', 'tempo risultato ENUMERA Soma*'], ['100 mL', 'workflow basse concentrazioni'], ['360°', 'tracciabilità digitale']],
    flow: [['Punto di campionamento', 'Ubicazione, matrice, lotto e ora', 'App'], ['Metodo e lettura', 'Kit, laboratorio o flusso ibrido', 'QA'], ['Report e azione', 'CoA, alert, storico e audit', 'Cloud']],
    note: 'Gestisci l’intera catena di evidenza: contesto del campione, metodo, risultato, report e follow-up.'
  },
  problem: {
    eyebrow: 'La sfida',
    title: 'Il controllo dell’acqua non può più dipendere da registri dispersi',
    body: 'I team qualità devono dimostrare dove è stato prelevato ogni campione, quale metodo è stato usato, chi lo ha gestito, quando è stato revisionato e come l’evidenza supporta una decisione operativa o un audit.',
    cards: [
      ['Rischio microbiologico invisibile', 'Gli indicatori tradizionali possono non bastare per anticipare rischio virale o fallimenti di barriera in acqua grezza, trattata, riutilizzata o di processo.', 'shield'],
      ['Decisioni lente', 'Quando analisi, lettura e report arrivano tardi, produzione, distribuzione, trattamento o irrigazione sono già avanzati.', 'timer'],
      ['Audit complessi', 'Carta, fogli di calcolo, email e risultati isolati rendono più difficile difendere tracciabilità e azioni correttive.', 'file'],
      ['Costo operativo', 'Senza dati chiari, i team ripetono campioni, sovratrattano, ritardano rilasci o accettano incertezza evitabile.', 'gauge']
    ]
  },
  infographic: {
    flowEyebrow: 'Workflow visivo',
    flowTitle: 'Dal campione alla decisione auditabile',
    flowBody: 'Un workflow connesso che unisce metodo, campione, evidenza, report e decisione in un unico sistema operativo.',
    matrixEyebrow: 'Matrice settoriale',
    matrixTitle: 'Matrice settore, rischio e soluzione',
    matrixBody: 'Una sintesi visiva per collegare ogni contesto di qualità dell’acqua al percorso di controllo e reporting più adatto.',
    maturityEyebrow: 'Roadmap di maturità',
    maturityTitle: 'Roadmap di maturità del controllo acqua',
    maturityBody: 'Visualizza il passaggio da controlli reattivi a una gestione controllata, tracciabile e guidata dai dati.'
  },
  sectors: {
    eyebrow: 'Workflow per settore',
    title: 'Programmi di controllo adattati alla tua operazione',
    body: 'AquaVerify adatta il monitoraggio a fonte d’acqua, rischio operativo, punti di campionamento e requisiti di reporting.',
    tabs: [
      ['Acqua municipale e utility', 'Captazione, trattamento e rete', 'Per direzione qualità acqua, ingegneria ambientale, responsabili rete e compliance.', 'Sfida principale', 'Rispondere a requisiti più severi, monitorare la fonte e dimostrare la performance del trattamento senza aumentare il carico amministrativo.', ['Programmi di rilevazione ed enumerazione dei colifagi somatici per contesto di contaminazione fecale e rischio virale.', 'Tracciabilità per punto rete, utente, data, ora e risultato.', 'Report ed evidenze per water safety plan, audit interni e follow-up incidenti.'], ['Controllo consigliato', 'Colifagi + tracciabilità rete'], ['Momento critico', 'Captazione, trattamento e distribuzione'], ['Prossimo passo', 'Mappare i punti']],
      ['Food & beverage', 'Acqua di processo e HACCP', 'Per QA manager, produzione, EHS e audit supply chain.', 'Sfida principale', 'Acqua di processo, pulizia, risciacquo o contatto può influire su lotti, linee e reputazione.', ['Percorsi di controllo per acqua di processo, ingredienti, CIP, lavaggio prodotti freschi e punti critici.', 'Kit microbiologici e reporting digitale per supportare decisioni di rilascio.', 'Evidenze per audit interni, clienti, certificazioni e autorità.'], ['Controllo consigliato', 'Indicatori + reporting HACCP'], ['Momento critico', 'Contatto, processo e CIP'], ['Prossimo passo', 'Validare punti critici']],
      ['Laboratori ambientali', 'Tempi e report', 'Per direzione laboratorio, tecnici senior e team scientifici ambientali.', 'Sfida principale', 'Aggiungere analisi complesse mantenendo precisione e riducendo i tempi di consegna.', ['Kit per colifagi somatici, terreni pronti all’uso e workflow orientati ai riferimenti.', 'Workflow digitale di campione, lettura, revisione e report.', 'CoA strutturati, storico campioni e coordinamento clienti B2B.'], ['Controllo consigliato', 'Kit orientati ISO + LIMS/CoA'], ['Momento critico', 'Accettazione, lettura e reporting'], ['Prossimo passo', 'Migliorare il flusso campioni']],
      ['Impianti di trattamento acqua', 'Barriere e operazioni', 'Per ingegneria trattamento, operations, EHS e direzione impianto.', 'Sfida principale', 'Regolare barriere, disinfezione e processi quando cambia il carico microbiologico evitando sottotrattamento o costi chimici inutili.', ['Monitoraggio di indicatori microbiologici lungo il treno di trattamento.', 'Storico digitale per rivedere trend, deviazioni e misure correttive.', 'Report operativi per dosaggio, trattenimento, rilascio o investigazione.'], ['Controllo consigliato', 'Verifica barriere + storico'], ['Momento critico', 'Ingresso, post-barriera e uscita'], ['Prossimo passo', 'Rivedere evidenze']],
      ['Acqua agricola', 'Irrigazione e campagne', 'Per agronomia, irrigazione, sostenibilità e qualità export.', 'Sfida principale', 'Acqua riutilizzata, superficiale o non trattata richiede evidenza microbiologica per proteggere colture, animali e accesso al mercato.', ['Verifica microbiologica per irrigazione, idroponica, acquaponica, allevamento e lavaggio prodotti freschi.', 'Registri georeferenziati per parcella, fonte o sistema di irrigazione.', 'Reporting per audit sostenibilità, certificazioni e tracciabilità di filiera.'], ['Controllo consigliato', 'Verifica campo + GIS'], ['Momento critico', 'Irrigazione, lavaggio e campagna'], ['Prossimo passo', 'Audit fonti acqua']],
      ['Seafood e acquacoltura', 'Biosicurezza idrica', 'Per biosicurezza, QA, produzione, impianto ed export.', 'Sfida principale', 'Contaminazione batterica o virale in acqua di coltura, lavaggio, processo o depurazione può causare chiusure, perdite o blocchi export.', ['Programmi per matrici marine e salmastre con controllo indicatori per installazione.', 'Monitoraggio colifagi somatici e parametri pertinenti secondo il piano di biosicurezza.', 'Alert e tracciabilità per agire prima che una deviazione impatti biomassa, prodotto o permessi.'], ['Controllo consigliato', 'Biosicurezza acquacoltura + alert'], ['Momento critico', 'Coltura, depurazione e processo'], ['Prossimo passo', 'Definire il piano']]
    ]
  },
  modules: {
    eyebrow: 'Tecnologia + tracciabilità',
    title: 'Cosa può includere il tuo programma AquaVerify',
    body: 'AquaVerify può essere configurato come fornitura prodotto, workflow di laboratorio, programma ricorrente o layer di tracciabilità digitale.',
    headers: ['Modulo', 'Uso principale', 'Ideale per'],
    rows: [
      ['ENUMERA Soma 100 mL', 'Enumerazione rapida dei colifagi somatici in 100 mL; risultato sotto 6,5 h e hands-on sotto 20 min secondo informazioni prodotto.', 'Acqua potabile, riutilizzata e programmi con decisioni rapide in basse concentrazioni.'],
      ['PLAQUE Soma 1 mL', 'Enumerazione doppio strato dei colifagi somatici per matrici con 1 mL o diluizioni.', 'Laboratori, reflui, acque superficiali, sedimenti, fanghi ed estratti di molluschi.'],
      ['PLAQUE Soma 100 mL', 'Percorso di enumerazione 100 mL progettato intorno al contesto ISO 10705-2 ed EPA 1602.', 'Acqua potabile, riutilizzata e campioni con basse concentrazioni attese.'],
      ['INDICA Soma 100 mL', 'Presenza/assenza di colifagi somatici in 100 mL per screening operativo.', 'Verifica rapida e decisioni di escalation.'],
      ['AquaVerify Cloud & App', 'Registro di campione, ubicazione, utente, ora, lettura, report e follow-up.', 'Team auditati, molti punti di campionamento e coordinamento fornitori.'],
      ['LIMS / Reporting / CoA', 'Standardizzazione dal campione al report.', 'Laboratori, utility, F&B e gruppi multi-site.']
    ]
  },
  process: {
    eyebrow: 'Come funziona',
    title: 'Dal punto di campionamento al report pronto per audit',
    body: 'Un processo modulare che può iniziare con kit, esecuzione laboratorio, tracciabilità digitale o programma combinato.',
    steps: [['Progettare il programma', 'Definire tipo d’acqua, punti critici, frequenza, parametri e livello di reporting.'], ['Scegliere il metodo', 'Selezionare kit interno, laboratorio partner, laboratorio proprio o modello ibrido.'], ['Digitalizzare la catena campione', 'Collegare ogni campione a ubicazione, utente, data, ora, lotto, matrice e stato.'], ['Validare l’evidenza', 'Acquisire e revisionare risultati con criteri chiari per ridurre errore manuale.'], ['Convertire in azione', 'Generare report, storico, alert, azioni correttive e documentazione audit.']]
  },
  regulation: {
    eyebrow: 'Compliance e audit',
    title: 'Normativa e audit richiedono evidenze più solide',
    body: 'Il controllo dell’acqua evolve verso gestione del rischio, monitoraggio operativo, verifica barriere ed evidenza documentata. AquaVerify aiuta a organizzare processo, metodo, evidenza e decisione in un workflow difendibile.',
    sourcesTitle: 'Contesto di riferimento',
    sourcesBody: 'Usa sempre la norma applicabile, il metodo accreditato e i requisiti dell’autorità competente per ogni matrice e giurisdizione.'
  },
  profiles: {
    eyebrow: 'Team',
    title: 'Pensato per team responsabili di audit, produzione e rischio',
    items: [['Direzione qualità acqua', 'Compliance, controllo rete e risposta incidenti.', 'Trasforma ogni punto di campionamento in evidenza tracciabile.'], ['QA Manager F&B', 'Evitare contaminazioni, richiami e blocchi linea.', 'Valida acqua critica prima delle decisioni produttive.'], ['Direzione laboratorio', 'Aumentare capacità e ridurre TAT.', 'Standardizza colifagi e reporting.'], ['Ingegneria trattamento', 'Verificare barriere e ottimizzare disinfezione.', 'Decidere con storico microbiologico.'], ['Team agronomico', 'Proteggere irrigazione, export e tracciabilità.', 'Dimostra controllo per parcella, fonte e campagna.'], ['Biosicurezza acquacoltura', 'Prevenire chiusure e perdite da contaminazione.', 'Anticipa deviazioni in acqua di coltura o processo.']]
  },
  form: {
    ...COPY.en.form,
    eyebrow: 'Diagnosi tecnica',
    title: 'Costruisci un sistema di controllo acqua più tracciabile, rapido e difendibile',
    body: 'Condividi settore, tipo di acqua e volume campioni. La richiesta continuerà in AquaVerify Cloud con origine e contesto per il team commerciale.',
    labels: ['Nome', 'Azienda', 'Email professionale', 'Settore', 'Paese', 'Tipo di acqua', 'Campioni al mese', 'Metodo attuale', 'Esigenza principale'],
    placeholders: ['Nome e cognome', 'Organizzazione', 'nome@azienda.com', 'Italia, Spagna, Stati Uniti...', 'Potabile, processo, irrigazione, riuso...', '50, 200, 1000+', 'Kit attuale, laboratorio, foglio di calcolo, LIMS...', 'Audit, colifagi, tempi, tracciabilità digitale...'],
    sectors: ['Utility / municipale', 'Food & beverage', 'Laboratorio ambientale', 'Trattamento acqua', 'Agricoltura', 'Seafood / acquacoltura', 'Altro'],
    submit: 'Continua in AquaVerify Cloud',
    privacy: 'La richiesta continua in AquaVerify Cloud con il contesto necessario al follow-up commerciale.',
    sticky: 'Valuta il tuo controllo acqua'
  }
};

COPY.ca = {
  ...COPY.es,
  nav: ['Problema', 'Flux', 'Sectors', 'Tecnologia', 'Procés', 'FAQ'],
  breadcrumb: ['Sectors', 'Control de qualitat de l’aigua'],
  valueBullets: [
    'Indicadors microbiològics com colífags somàtics, E. coli, enterococs i altres paràmetres segons el programa de control.',
    'Kits i medis llestos per utilitzar en fluxos dissenyats al voltant de referències com ISO 10705-2 i EPA Method 1602.',
    'App, Cloud i reporting digital per vincular mostra, usuari, ubicació, hora, resultat i informe.',
    'Programes adaptats a utilities, alimentació i begudes, laboratoris, tractament, agricultura i seafood.'
  ],
  heroCard: {
    title: 'Programa AquaVerify',
    subtitle: 'Mostra -> resultat -> evidència',
    status: 'A punt per auditoria',
    metrics: [['<6,5h', 'resultat ENUMERA Soma*'], ['100 mL', 'flux per baixos recomptes'], ['360°', 'traçabilitat digital']],
    flow: [['Punt de mostreig', 'Ubicació, matriu, lot i hora', 'App'], ['Mètode i lectura', 'Kit, laboratori o flux híbrid', 'QA'], ['Informe i acció', 'CoA, alerta, històric i auditoria', 'Cloud']],
    note: 'Gestiona tota la cadena d’evidència: context de mostra, mètode, resultat, informe i seguiment.'
  },
  problem: {
    eyebrow: 'El repte',
    title: 'El control de l’aigua ja no pot dependre de registres dispersos',
    body: 'Els equips de qualitat han de demostrar on s’ha pres cada mostra, quin mètode s’ha utilitzat, qui l’ha gestionat, quan s’ha revisat i com l’evidència sosté una decisió operativa o una auditoria.',
    cards: [
      ['Risc microbiològic invisible', 'Els indicadors tradicionals poden no ser suficients per anticipar risc viral o fallades de barrera en aigua bruta, tractada, regenerada o de procés.', 'shield'],
      ['Decisions lentes', 'Quan l’anàlisi, la lectura i l’informe arriben tard, producció, distribució, tractament o reg ja han avançat.', 'timer'],
      ['Auditories difícils', 'Paper, fulls de càlcul, emails i resultats aïllats dificulten demostrar traçabilitat i accions correctores.', 'file'],
      ['Cost operatiu', 'Sense dades clares, els equips repeteixen mostres, sobretracten, endarrereixen alliberaments o assumeixen incertesa evitable.', 'gauge']
    ]
  },
  infographic: {
    flowEyebrow: 'Flux visual',
    flowTitle: 'De mostra a decisió auditable',
    flowBody: 'Un flux connectat per reunir mètode, mostra, evidència, informe i decisió en un mateix sistema operatiu.',
    matrixEyebrow: 'Matriu sectorial',
    matrixTitle: 'Matriu sector, risc i solució',
    matrixBody: 'Un resum visual per connectar cada context de qualitat de l’aigua amb la ruta de control i reporting més adequada.',
    maturityEyebrow: 'Roadmap de maduresa',
    maturityTitle: 'Roadmap de maduresa del control hídric',
    maturityBody: 'Visualitza com passar de controls reactius a una gestió controlada, traçable i basada en dades.'
  },
  sectors: {
    eyebrow: 'Fluxos per sector',
    title: 'Programes de control adaptats a la teva operació',
    body: 'AquaVerify adapta la ruta de monitoratge a la font d’aigua, risc operatiu, punts de mostreig i requisits de reporting de cada organització.',
    tabs: [
      ['Aigua municipal i utilities', 'Captació, tractament i xarxa', 'Per direcció de qualitat de l’aigua, enginyeria ambiental, responsables de xarxa i compliance.', 'Repte principal', 'Complir requisits més exigents, controlar captacions i demostrar eficàcia de tractament sense multiplicar càrrega administrativa.', ['Programes de detecció i enumeració de colífags somàtics com a indicadors de contaminació fecal i possible risc viral.', 'Traçabilitat per punt de xarxa, usuari, data, hora i resultat.', 'Informes i evidències per plans sanitaris de l’aigua, auditories internes i seguiment d’incidències.'], ['Control recomanat', 'Colífags + traçabilitat de xarxa'], ['Moment crític', 'Captació, tractament i distribució'], ['Següent pas', 'Mapar punts']],
      ['Food & beverage', 'Aigua de procés i APPCC', 'Per QA managers, producció, EHS i auditories de cadena de subministrament.', 'Repte principal', 'L’aigua de procés, neteja, esbandida o contacte pot comprometre lots, decisions de línia i reputació.', ['Fluxos de control per aigua de procés, ingredients, neteja CIP, rentat de producte fresc i punts crítics.', 'Kits microbiològics i reporting digital per donar suport a decisions d’alliberament.', 'Evidència per auditories internes, clients, certificacions i autoritats.'], ['Control recomanat', 'Indicadors + reporting APPCC'], ['Moment crític', 'Contacte, procés i CIP'], ['Següent pas', 'Validar punts crítics']],
      ['Laboratoris ambientals', 'Temps de resposta i informes', 'Per direcció de laboratori, tècnics senior i equips científics ambientals.', 'Repte principal', 'Incorporar anàlisis complexes mantenint precisió i reduint temps de lliurament.', ['Kits de colífags somàtics, medis llestos per usar i fluxos orientats a referències.', 'Digitalització del flux de mostra, lectura, revisió i informe.', 'CoA estructurats, històric de mostres i coordinació amb clients B2B.'], ['Control recomanat', 'Kits orientats ISO + LIMS/CoA'], ['Moment crític', 'Entrada, lectura i emissió'], ['Següent pas', 'Millorar flux mostres']],
      ['Tractament d’aigua', 'Barreres i operació', 'Per enginyeria de tractament, operacions, EHS i gestió de plantes.', 'Repte principal', 'Ajustar barreres, desinfecció i processos davant variacions microbiològiques evitant subtractaments o costos químics innecessaris.', ['Monitoratge d’indicadors microbiològics per punts del tren de tractament.', 'Històric digital per revisar tendències, desviacions i mesures correctores.', 'Informes operatius per decisions de dosificació, retenció, alliberament o investigació.'], ['Control recomanat', 'Verificació barreres + històric'], ['Moment crític', 'Entrada, post-barrera i sortida'], ['Següent pas', 'Revisar evidències']],
      ['Aigua agrícola', 'Reg, parcel·les i campanya', 'Per agronomia, responsables de reg, sostenibilitat i qualitat agroalimentària.', 'Repte principal', 'L’ús d’aigua regenerada, superficial o no tractada exigeix evidència microbiològica per protegir cultius, animals i accés a mercats.', ['Verificació microbiològica d’aigua de reg, hidroponia, aquaponia, ramaderia i rentat de producte fresc.', 'Registre georeferenciat per parcel·la, captació o sistema de reg.', 'Reporting per auditories de sostenibilitat, certificacions i traçabilitat de cadena.'], ['Control recomanat', 'Verificació en camp + GIS'], ['Moment crític', 'Reg, rentat i campanya'], ['Següent pas', 'Auditar fonts d’aigua']],
      ['Seafood i aqüicultura', 'Bioseguretat hídrica', 'Per bioseguretat, QA, producció, planta i exportació.', 'Repte principal', 'La contaminació bacteriana o viral en aigua de cultiu, rentat, procés o depuració pot provocar tancaments sanitaris, pèrdues i bloquejos d’exportació.', ['Programes per a matrius marines i salobres, amb control d’indicadors per instal·lació.', 'Monitoratge de colífags somàtics i paràmetres rellevants segons el pla de bioseguretat.', 'Alertes i traçabilitat per actuar abans que una desviació afecti biomassa, producte o permisos.'], ['Control recomanat', 'Bioseguretat aqüícola + alertes'], ['Moment crític', 'Cultiu, depuració i procés'], ['Següent pas', 'Definir el pla']]
    ]
  },
  modules: {
    eyebrow: 'Tecnologia + traçabilitat',
    title: 'Què pot incloure el teu programa AquaVerify',
    body: 'AquaVerify es pot configurar com a subministrament de producte, flux de laboratori, programa recurrent o capa digital de traçabilitat.',
    headers: ['Mòdul', 'Ús principal', 'Ideal per a'],
    rows: [
      ['ENUMERA Soma 100 mL', 'Enumeració ràpida de colífags somàtics en 100 mL; temps de resultat inferior a 6,5 h i hands-on inferior a 20 min segons informació de producte.', 'Aigua de consum, regenerada i programes que necessiten resposta ràpida en matrius amb baixos recomptes.'],
      ['PLAQUE Soma 1 mL', 'Enumeració de colífags somàtics amb doble capa per a matrius on es treballa amb 1 mL o dilucions.', 'Laboratoris, aigües residuals, superficials, sediments, llots i extractes de marisc.'],
      ['PLAQUE Soma 100 mL', 'Ruta d’enumeració en 100 mL dissenyada al voltant del context ISO 10705-2 i EPA 1602.', 'Aigua potable, regenerada i mostres amb baixos recomptes esperats.'],
      ['INDICA Soma 100 mL', 'Presència/absència de colífags somàtics en 100 mL per screening operatiu.', 'Verificació ràpida i decisions d’escalat.'],
      ['AquaVerify Cloud & App', 'Registre de mostra, ubicació, usuari, hora, lectura, informe i seguiment.', 'Equips auditats, múltiples punts de mostreig i coordinació amb proveïdors.'],
      ['LIMS / Reporting / CoA', 'Estandardització des de mostra fins a informe.', 'Laboratoris, utilities, F&B i grups multi-site.']
    ]
  },
  process: {
    eyebrow: 'Com funciona',
    title: 'Del punt de mostreig a l’informe a punt per auditoria',
    body: 'Un procés modular que permet començar amb kits, laboratori, traçabilitat digital o un programa combinat.',
    steps: [['Dissenyar el programa', 'Definir tipus d’aigua, punts crítics, freqüència, paràmetres i nivell de reporting.'], ['Seleccionar el mètode', 'Triar kit intern, laboratori partner, laboratori propi o model híbrid.'], ['Digitalitzar la cadena', 'Vincular cada mostra amb ubicació, usuari, data, hora, lot, matriu i estat.'], ['Validar evidència', 'Capturar i revisar resultats amb criteris clars per reduir error manual.'], ['Convertir en acció', 'Generar informe, històric, alertes, accions correctores i documentació per auditoria.']]
  },
  regulation: {
    eyebrow: 'Compliance i auditoria',
    title: 'La regulació i les auditories exigeixen més evidència de l’aigua',
    body: 'El control de l’aigua avança cap a gestió del risc, monitoratge operatiu, verificació de barreres i evidència documentada. AquaVerify ajuda a organitzar procés, mètode, evidència i decisió en un flux defensable.',
    sourcesTitle: 'Context de referència',
    sourcesBody: 'Utilitza sempre la norma aplicable, el mètode acreditat i els requisits de l’autoritat competent per a cada matriu i jurisdicció.'
  },
  profiles: {
    eyebrow: 'Equips',
    title: 'Pensat per a equips que responen davant auditories, producció i risc',
    items: [['Direcció de qualitat de l’aigua', 'Compliment, control de xarxa i resposta a incidències.', 'Converteix cada punt de mostreig en evidència traçable.'], ['QA Manager F&B', 'Evitar contaminació, recalls i bloquejos de línia.', 'Valida aigua crítica abans de decisions de producció.'], ['Direcció de laboratori', 'Augmentar capacitat i reduir TAT.', 'Estandarditza colífags i reporting.'], ['Enginyeria de tractament', 'Verificar barreres i optimitzar desinfecció.', 'Pren decisions amb històric microbiològic.'], ['Equip agronòmic', 'Protegir reg, exportació i traçabilitat.', 'Demostra control per parcel·la, font i campanya.'], ['Bioseguretat aqüícola', 'Prevenir tancaments i pèrdues per contaminació.', 'Anticipa desviacions en aigua de cultiu o procés.']]
  },
  form: {
    ...COPY.es.form,
    eyebrow: 'Diagnòstic tècnic',
    title: 'Construeix un sistema de control de l’aigua més traçable, ràpid i defensable',
    body: 'Comparteix sector, tipus d’aigua i volum de mostres. La sol·licitud continuarà a AquaVerify Cloud amb origen i context per a l’equip comercial.',
    labels: ['Nom', 'Empresa', 'Email professional', 'Sector', 'País', 'Tipus d’aigua', 'Mostres al mes', 'Mètode actual', 'Necessitat principal'],
    placeholders: ['Nom i cognoms', 'Organització', 'nom@empresa.com', 'Espanya, França, Estats Units...', 'Consum, procés, reg, regenerada...', '50, 200, 1000+', 'Kit actual, laboratori, full de càlcul, LIMS...', 'Auditoria, colífags, TAT, traçabilitat digital...'],
    sectors: ['Utility / municipal', 'Food & beverage', 'Laboratori ambiental', 'Tractament d’aigua', 'Agricultura', 'Seafood / aqüicultura', 'Altres'],
    submit: 'Continuar a AquaVerify Cloud',
    privacy: 'La sol·licitud continua a AquaVerify Cloud amb el context necessari per al seguiment comercial.',
    sticky: 'Avalua el teu control hídric'
  }
};

export const WaterQualityControlLanding: React.FC<Props> = ({ content, pageLang, showCookieConsent = true }) => {
  const copy = COPY[pageLang] || COPY.en;
  const [activeSector, setActiveSector] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const sampleFlowVisual = content.visuals?.sampleFlow;
  const maturityVisual = content.visuals?.maturity;
  const diagnosisHref = useMemo(() => getPlatformSignupUrl({
    intent: 'contact',
    page: 'water-quality-control',
    category: 'industries',
    module: 'water-quality-diagnosis'
  }, pageLang), [pageLang]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '').trim();
    const company = String(form.get('company') || '').trim();
    const email = String(form.get('email') || '').trim();
    const sector = String(form.get('sector') || '').trim();
    const country = String(form.get('country') || '').trim();
    const waterType = String(form.get('water_type') || '').trim();
    const sampleVolume = String(form.get('sample_volume') || '').trim();
    const currentMethod = String(form.get('current_method') || '').trim();
    const mainNeed = String(form.get('main_need') || '').trim();

    trackCorporateEvent('water_quality_diagnosis_submit', {
      lang: pageLang,
      page: 'water-quality-control',
      intent: 'contact',
      profile: sector,
      country,
      product: waterType,
      module: 'water-quality-diagnosis'
    });

    window.location.href = getPlatformSignupUrl({
      intent: 'contact',
      page: 'water-quality-control',
      category: 'industries',
      profile: sector,
      product: waterType,
      module: 'water-quality-diagnosis',
      country,
      water_type: waterType,
      sample_volume: sampleVolume,
      current_method: currentMethod,
      main_need: mainNeed,
      prefill_name: name,
      prefill_email: email,
      prefill_company: company
    }, pageLang);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fdfd] font-sans text-slate-900">
      <Header />
      <main className="flex-grow pt-20">
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_10%_10%,rgba(24,168,169,.16),transparent_34%),radial-gradient(circle_at_88%_16%,rgba(246,178,56,.18),transparent_26%),linear-gradient(135deg,#f5fcfc_0%,#ffffff_55%,#effafa_100%)] py-16 md:py-20">
          <div className="container mx-auto grid gap-10 px-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,.82fr)] lg:items-center">
            <div>
              <div className="mb-5 flex flex-wrap gap-2 text-sm font-bold text-slate-500">
                <span>{copy.breadcrumb[0]}</span><span>/</span><span>{copy.breadcrumb[1]}</span>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-cyan-700">
                <span className="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_0_4px_rgba(6,182,212,.14)]" />
                {content.eyebrow}
              </span>
              <h1 className="aq-gradient-title mt-5 max-w-4xl font-heading text-4xl font-black leading-tight md:text-6xl">{content.title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{content.description}</p>
              <ul className="mt-7 grid gap-3 md:grid-cols-2">
                {copy.valueBullets.map((item: string) => (
                  <li key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm font-semibold leading-6 text-slate-700 shadow-sm">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#diagnostico" className="aq-cta-primary">
                  {content.primaryCta}<ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a href="#sectores" className="aq-cta-secondary">
                  {content.secondaryCta}
                </a>
              </div>
            </div>

            <aside className="rounded-[28px] border border-slate-200 bg-white/90 p-5 shadow-2xl">
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="font-heading text-lg font-black text-slate-950">{copy.heroCard.title}</h2>
                  <p className="mt-1 text-sm font-semibold text-slate-500">{copy.heroCard.subtitle}</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />{copy.heroCard.status}
                </span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {copy.heroCard.metrics.map((metric: string[]) => (
                  <div key={metric[1]} className="rounded-2xl border border-slate-200 bg-cyan-50/50 p-4">
                    <strong className="block text-2xl font-black text-primary">{metric[0]}</strong>
                    <span className="mt-1 block text-xs font-bold leading-5 text-slate-500">{metric[1]}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid gap-3">
                {copy.heroCard.flow.map((row: string[], index: number) => (
                  <div key={row[0]} className="grid grid-cols-[2.25rem_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-sm font-black text-cyan-700">{index + 1}</span>
                    <span>
                      <b className="block text-sm font-black text-slate-900">{row[0]}</b>
                      <small className="text-xs font-semibold text-slate-500">{row[1]}</small>
                    </span>
                    <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-black text-cyan-700">{row[2]}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl border border-amber-100 bg-amber-50 p-4 text-sm font-bold leading-6 text-amber-900">{copy.heroCard.note}</div>
            </aside>
          </div>
        </section>

        <nav className="sticky top-20 z-30 border-y border-slate-200 bg-white/90 backdrop-blur">
          <div className="container mx-auto flex flex-wrap justify-center gap-2 px-6 py-3">
            {['problema', 'infografia-flujo', 'sectores', 'tecnologia', 'funciona', 'faq'].map((id, index) => (
              <a key={id} href={`#${id}`} className="rounded-full px-3 py-2 text-xs font-black text-slate-600 transition hover:bg-cyan-50 hover:text-cyan-700">{copy.nav[index]}</a>
            ))}
          </div>
        </nav>

        <section id="problema" className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.problem.eyebrow} title={copy.problem.title} body={copy.problem.body} />
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {copy.problem.cards.map((card: string[]) => {
                const Icon = iconMap[card[2] as keyof typeof iconMap] || ShieldCheck;
                return (
                  <article key={card[0]} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700"><Icon className="h-5 w-5" /></div>
                    <h3 className="font-heading text-lg font-black text-slate-950">{card[0]}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{card[1]}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <SampleFlowSection
          id="infografia-flujo"
          visual={sampleFlowVisual}
          fallback={{
            eyebrow: copy.infographic.flowEyebrow,
            title: copy.infographic.flowTitle,
            body: copy.infographic.flowBody
          }}
        />

        <section id="sectores" className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectors.eyebrow} title={copy.sectors.title} body={copy.sectors.body} />
            <div className="mt-8 grid gap-6 lg:grid-cols-[20rem_minmax(0,1fr)]">
              <div className="grid gap-2 lg:sticky lg:top-40 lg:self-start">
                {copy.sectors.tabs.map((tab: any[], index: number) => (
                  <button key={tab[0]} type="button" onClick={() => setActiveSector(index)} className={`flex items-center justify-between rounded-2xl border p-4 text-left shadow-sm transition ${activeSector === index ? 'border-primary bg-primary text-white' : 'border-slate-200 bg-white text-slate-800 hover:border-cyan-200 hover:bg-cyan-50'}`}>
                    <span>
                      <b className="block text-sm font-black">{tab[0]}</b>
                      <small className={`mt-1 block text-xs font-bold ${activeSector === index ? 'text-cyan-50/75' : 'text-slate-500'}`}>{tab[1]}</small>
                    </span>
                    <ChevronRight className={`h-4 w-4 ${activeSector === index ? 'text-cyan-200' : 'text-cyan-600'}`} />
                  </button>
                ))}
              </div>
              <SectorPanel tab={copy.sectors.tabs[activeSector]} />
            </div>
          </div>
        </section>

        <section id="tecnologia" className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.modules.eyebrow} title={copy.modules.title} body={copy.modules.body} />
            <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <table className="hidden w-full text-left text-sm md:table">
                <thead className="bg-primary text-white">
                  <tr>{copy.modules.headers.map((header: string) => <th key={header} className="px-5 py-4 font-black">{header}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {copy.modules.rows.map((row: string[]) => (
                    <tr key={row[0]}>
                      <td className="w-1/4 px-5 py-4 font-black text-slate-900">{row[0]}</td>
                      <td className="px-5 py-4 font-semibold leading-6 text-slate-600">{row[1]}</td>
                      <td className="px-5 py-4 font-semibold leading-6 text-slate-600">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="grid gap-3 p-4 md:hidden">
                {copy.modules.rows.map((row: string[]) => (
                  <article key={row[0]} className="rounded-2xl border border-slate-200 p-4">
                    <h3 className="font-heading text-base font-black text-primary">{row[0]}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{row[1]}</p>
                    <p className="mt-2 text-xs font-bold leading-5 text-slate-500">{row[2]}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="funciona" className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.process.eyebrow} title={copy.process.title} body={copy.process.body} center />
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {copy.process.steps.map((step: string[], index: number) => (
                <article key={step[0]} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-600 text-sm font-black text-white">{index + 1}</div>
                  <h3 className="font-heading text-base font-black text-slate-950">{step[0]}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{step[1]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <MaturitySection
          id="madurez"
          visual={maturityVisual}
          fallback={{
            eyebrow: copy.infographic.maturityEyebrow,
            title: copy.infographic.maturityTitle,
            body: copy.infographic.maturityBody
          }}
        />

        <section id="regulacion" className="bg-white py-16 md:py-20">
          <div className="container mx-auto grid gap-6 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,.72fr)]">
            <article className="rounded-3xl bg-primary p-8 text-white shadow-xl">
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-cyan-50">{copy.regulation.eyebrow}</span>
              <h2 className="mt-5 font-heading text-3xl font-black leading-tight md:text-5xl">{copy.regulation.title}</h2>
              <p className="mt-5 text-base leading-8 text-cyan-50/85">{copy.regulation.body}</p>
            </article>
            <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-xl font-black text-slate-950">{copy.regulation.sourcesTitle}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{copy.regulation.sourcesBody}</p>
              <div className="mt-5 grid gap-3 text-sm font-black text-cyan-700">
                <a href="https://www.boe.es/buscar/act.php?id=BOE-A-2023-628" target="_blank" rel="noreferrer">Real Decreto 3/2023</a>
                <a href="https://www.iso.org/standard/20127.html" target="_blank" rel="noreferrer">ISO 10705-2</a>
                <a href="https://www.epa.gov/sites/default/files/2015-12/documents/method_1602_2001.pdf" target="_blank" rel="noreferrer">EPA Method 1602</a>
              </div>
            </aside>
          </div>
        </section>

        <section className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.profiles.eyebrow} title={copy.profiles.title} />
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {copy.profiles.items.map((item: string[]) => (
                <article key={item[0]} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="font-heading text-lg font-black text-primary">{item[0]}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{item[1]}</p>
                  <div className="mt-4 rounded-2xl bg-cyan-50 p-4 text-sm font-black leading-6 text-cyan-800">{item[2]}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow="FAQ" title={pageLang === 'en' ? 'Frequently asked questions' : pageLang === 'fr' ? 'Questions fréquentes' : pageLang === 'it' ? 'Domande frequenti' : pageLang === 'ca' ? 'Preguntes freqüents' : 'Preguntas frecuentes'} center />
            <div className="mx-auto mt-8 max-w-4xl divide-y divide-slate-100 rounded-3xl border border-slate-200 bg-white shadow-sm">
              {(content.faqs || []).map((faq, index) => (
                <div key={faq.question} className="p-5">
                  <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 text-left font-heading text-lg font-black text-slate-950">
                    <span>{faq.question}</span><span className="text-cyan-600">{openFaq === index ? '-' : '+'}</span>
                  </button>
                  {openFaq === index && <p className="mt-3 text-sm leading-7 text-slate-600">{faq.answer}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <IndustryGlossaryTerms industryId="water-quality-control" lang={pageLang} />

        <section id="diagnostico" className="bg-slate-50 py-16 pb-28 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.form.eyebrow} title={copy.form.title} body={copy.form.body} center />
            <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:p-8">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField label={copy.form.labels[0]} name="name" placeholder={copy.form.placeholders[0]} required />
                <FormField label={copy.form.labels[1]} name="company" placeholder={copy.form.placeholders[1]} required />
                <FormField label={copy.form.labels[2]} name="email" type="email" placeholder={copy.form.placeholders[2]} required />
                <label className="grid gap-2 text-sm font-black text-slate-800">
                  {copy.form.labels[3]}
                  <select name="sector" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100">
                    {copy.form.sectors.map((sector: string) => <option key={sector}>{sector}</option>)}
                  </select>
                </label>
                <FormField label={copy.form.labels[4]} name="country" placeholder={copy.form.placeholders[3]} />
                <FormField label={copy.form.labels[5]} name="water_type" placeholder={copy.form.placeholders[4]} />
                <FormField label={copy.form.labels[6]} name="sample_volume" placeholder={copy.form.placeholders[5]} />
                <FormField label={copy.form.labels[7]} name="current_method" placeholder={copy.form.placeholders[6]} />
                <label className="grid gap-2 text-sm font-black text-slate-800 md:col-span-2">
                  {copy.form.labels[8]}
                  <textarea name="main_need" placeholder={copy.form.placeholders[7]} className="min-h-28 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100" />
                </label>
                <div className="md:col-span-2">
                  <button type="submit" className="aq-cta-primary w-full py-4 md:w-auto">
                    {copy.form.submit}<ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                  <p className="mt-3 text-xs font-semibold leading-5 text-slate-500">{copy.form.privacy}</p>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
      <div className="fixed bottom-5 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-slate-200 bg-white/90 p-2 shadow-2xl backdrop-blur md:flex">
        <span className="pl-3 text-xs font-black text-slate-500">{copy.form.sticky}</span>
        <a href="#diagnostico" className="aq-cta-primary px-4 py-2 text-xs">{content.primaryCta}</a>
        <a href="#sectores" className="rounded-full border border-slate-200 px-4 py-2 text-xs font-black text-slate-700">{copy.nav[2]}</a>
      </div>
      <Footer />
      {showCookieConsent && <CookieConsent />}
    </div>
  );
};

const SectionHead: React.FC<{ eyebrow: string; title: string; body?: string; center?: boolean }> = ({ eyebrow, title, body, center = false }) => (
  <div className={`max-w-4xl ${center ? 'mx-auto text-center' : ''}`}>
    <span className="inline-flex rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-cyan-700">{eyebrow}</span>
    <h2 className="mt-4 font-heading text-3xl font-black leading-tight text-slate-950 md:text-5xl">{title}</h2>
    {body && <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">{body}</p>}
  </div>
);

const SampleFlowSection: React.FC<{ id: string; visual?: HtmlVisualBlock; fallback: { eyebrow: string; title: string; body: string } }> = ({ id, visual, fallback }) => {
  const steps = (visual?.items || []).filter((item) => item.title || item.body);
  if (steps.length === 0) return null;
  return (
    <section id={id} className="bg-slate-50 py-16 md:py-20">
      <div className="container mx-auto px-6">
        <SectionHead eyebrow={visual?.eyebrow || fallback.eyebrow} title={visual?.title || fallback.title} body={visual?.body || fallback.body} center />
        <div className="mx-auto mt-8 max-w-6xl rounded-3xl border border-slate-200 bg-white p-5 shadow-xl md:p-7">
          <div className="grid gap-4 md:grid-cols-5">
            {steps.map((step, index) => (
              <article key={`${step.title}-${index}`} className={`relative rounded-2xl border p-5 shadow-sm ${index === steps.length - 1 ? 'border-emerald-200 bg-emerald-50' : 'border-cyan-100 bg-cyan-50/35'}`}>
                <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-full text-base font-black text-white ${index === steps.length - 1 ? 'bg-emerald-700' : 'bg-cyan-600'}`}>{index + 1}</div>
                <h3 className="font-heading text-lg font-black text-slate-950">{step.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{step.body}</p>
                {index < steps.length - 1 && (
                  <span className="pointer-events-none absolute -right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-cyan-700 shadow-md md:flex">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                )}
              </article>
            ))}
          </div>
          {(visual?.calloutTitle || visual?.calloutBody) && (
            <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-5">
              {visual.calloutTitle && <h3 className="font-heading text-xl font-black text-amber-950">{visual.calloutTitle}</h3>}
              {visual.calloutBody && <p className="mt-2 text-sm font-bold leading-6 text-amber-900">{visual.calloutBody}</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const MaturitySection: React.FC<{ id: string; visual?: HtmlVisualBlock; fallback: { eyebrow: string; title: string; body: string } }> = ({ id, visual, fallback }) => {
  const stages = (visual?.items || []).filter((item) => item.title || item.body || item.label);
  if (stages.length === 0) return null;
  return (
    <section id={id} className="bg-slate-50 py-16 md:py-20">
      <div className="container mx-auto px-6">
        <SectionHead eyebrow={visual?.eyebrow || fallback.eyebrow} title={visual?.title || fallback.title} body={visual?.body || fallback.body} center />
        <div className="mx-auto mt-8 max-w-6xl rounded-3xl border border-slate-200 bg-white p-5 shadow-xl md:p-7">
          <div className="grid gap-4 lg:grid-cols-4">
            {stages.map((stage, index) => (
              <article key={`${stage.title}-${index}`} className={`rounded-2xl border p-5 ${index === stages.length - 1 ? 'border-emerald-200 bg-emerald-50' : index >= 2 ? 'border-teal-200 bg-teal-50/40' : 'border-slate-200 bg-white'}`}>
                <div className="mb-5 flex items-center justify-between gap-3">
                  <h3 className="font-heading text-xl font-black text-slate-950">{stage.title}</h3>
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black text-white ${index === 0 ? 'bg-slate-400' : index === 1 ? 'bg-cyan-600' : index === 2 ? 'bg-teal-700' : 'bg-emerald-600'}`}>{index + 1}</span>
                </div>
                <p className="text-sm font-semibold leading-6 text-slate-600">{stage.body}</p>
                {stage.label && (
                  <div className={`mt-5 rounded-2xl px-4 py-3 text-center text-sm font-black ${index === 0 ? 'bg-slate-100 text-slate-600' : index === 1 ? 'bg-cyan-50 text-cyan-800' : 'bg-emerald-100 text-emerald-800'}`}>{stage.label}</div>
                )}
              </article>
            ))}
          </div>
          {visual?.cta && (
            <div className="mt-6 rounded-full border border-cyan-100 bg-cyan-50 px-5 py-4 text-center text-sm font-black text-cyan-800 md:text-base">{visual.cta}</div>
          )}
        </div>
      </div>
    </section>
  );
};

const SectorPanel: React.FC<{ tab: any[] }> = ({ tab }) => (
  <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:p-8">
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_18rem]">
      <div>
        <span className="inline-flex rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-cyan-700">{tab[1]}</span>
        <h3 className="mt-4 font-heading text-3xl font-black text-slate-950">{tab[0]}</h3>
        <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">{tab[2]}</p>
        <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50 p-4">
          <div className="text-xs font-black uppercase tracking-[0.14em] text-amber-700">{tab[3]}</div>
          <p className="mt-2 text-sm font-semibold leading-6 text-amber-950">{tab[4]}</p>
        </div>
        <ul className="mt-5 grid gap-3">
          {tab[5].map((item: string) => (
            <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-slate-700">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <aside className="grid gap-3 self-start">
        {[tab[6], tab[7], tab[8]].map((item: string[]) => (
          <div key={item[0]} className="rounded-2xl border border-slate-200 bg-cyan-50/40 p-4">
            <div className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">{item[0]}</div>
            <div className="mt-2 text-sm font-black leading-6 text-primary">{item[1]}</div>
          </div>
        ))}
      </aside>
    </div>
  </article>
);

const FormField: React.FC<{ label: string; name: string; type?: string; placeholder?: string; required?: boolean }> = ({ label, name, type = 'text', placeholder, required = false }) => (
  <label className="grid gap-2 text-sm font-black text-slate-800">
    {label}
    <input name={name} type={type} placeholder={placeholder} required={required} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100" />
  </label>
);
