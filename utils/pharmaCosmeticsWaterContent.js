function section(title, body, bullets = []) {
  return { title, body, bullets };
}

export const PHARMA_COSMETICS_WATER_PAGE = {
  es: {
    path: `/es/industrias/industria-farmaceutica-cosmetica`,
    title: `Control del agua en industria farmacéutica y cosmética con trazabilidad de lote a auditoría`,
    description: `AquaVerify ayuda a fabricantes farmacéuticos, laboratorios cosméticos, CDMO, CMO y plantas de cuidado personal a convertir el control del agua en un flujo documentado: puntos de uso, muestras, métodos, resultados, CoA, tendencias, desviaciones y evidencias disponibles para calidad, producción, laboratorio y auditoría.`,
    eyebrow: `Farmacéutica · Cosmética · GMP · QA/QC`,
    primaryCta: `Solicitar diagnóstico de agua`,
    secondaryCta: `Ver flujo de calidad`,
    seoTitle: `Calidad del agua en industria farmacéutica y cosmética | AquaVerify`,
    seoDescription: `Control de calidad del agua en industria farmacéutica y cosmética: agua purificada, WFI, loops, puntos de uso, CoA, desviaciones y trazabilidad de lote a auditoría.`,
    cta: {
      title: `Convierte el control del agua en evidencia lista para calidad, lote y auditoría`,
      body: `Comparte tus tipos de agua, puntos críticos, productos, laboratorio y flujo actual de resultados. AquaVerify ayuda a diseñar un programa trazable para reducir incertidumbre, acelerar decisiones y documentar cada acción relevante.`
    },
    sections: [
      section(`El agua puede ser ingrediente, excipiente, medio de limpieza y fuente de desviaciones`, `En plantas farmacéuticas y cosméticas, el agua atraviesa captación, pretratamiento, ósmosis, almacenamiento, loops, puntos de uso, formulación, limpieza y enjuague. Una desviación microbiológica no afecta solo a un resultado: puede impactar lotes, equipos, tiempos de liberación, investigaciones y auditorías.`, [
        `Agua como materia crítica: El agua puede formar parte de la fórmula, actuar como excipiente o intervenir en operaciones donde la calidad microbiológica condiciona la decisión de uso.`,
        `Loops y puntos de uso: Depósitos, recirculaciones, válvulas, mangueras, filtros y zonas de baja circulación pueden generar variabilidad, biofilm o tendencias fuera de control.`,
        `Limpieza y enjuague: El agua de limpieza, último enjuague o preparación de equipos debe quedar vinculada al equipo, ciclo, lote siguiente y evidencia de liberación.`,
        `Auditorías y desviaciones: Los equipos de calidad necesitan demostrar qué punto se controló, qué criterio se aplicó, qué resultado se obtuvo y qué acción se tomó.`
      ]),
      section(`Del tipo de agua a la decisión de calidad`, `Un flujo digital permite conectar el punto físico con el lote, el método, el resultado, la revisión y la acción documentada.`, [
        `Clasificar el agua: Define agua de entrada, purificada, WFI, proceso, ingrediente cosmético, limpieza, enjuague o uso especial.`,
        `Mapear puntos: Registra captación, pretratamiento, RO, depósito, loop, punto de uso, línea, equipo, sala y formulación.`,
        `Asignar plan: Configura frecuencia, método, volumen, criterio, responsable, laboratorio, tiempo de espera y prioridad del resultado.`,
        `Tomar muestra: Documenta operador, fecha, hora, lote, turno, ubicación, fotos, observaciones y cadena de custodia.`,
        `Revisar resultado: Integra lectura, CoA, tendencia, indicador, método, revisión QA/QC y comparación con criterios definidos.`,
        `Cerrar decisión: Libera, retiene, remuestrea, investiga, sanitiza, abre CAPA o cierra desviación con evidencia auditable.`
      ]),
      section(`Un sistema común para calidad, laboratorio, producción e ingeniería`, `AquaVerify centraliza el historial del agua para que cada equipo pueda actuar sin perder contexto técnico ni trazabilidad documental.`, [
        `Quality Assurance: Revisa resultados, tendencias, desviaciones, CAPA, CoA y evidencias antes de liberar agua, equipo o lote.`,
        `QC microbiología: Gestiona muestras, métodos, controles, observaciones, resultados y comunicación con laboratorio interno o externo.`,
        `Producción y fabricación: Vincula agua, turno, equipo, línea, lote, formulación y decisión operativa antes de continuar el proceso.`,
        `Ingeniería y utilities: Controla pretratamiento, ósmosis, depósitos, loops, sanitización, puntos de uso, mantenimiento y cambios de configuración.`,
        `Regulatory, QP y Responsible Person: Prepara registros consistentes para expedientes, inspecciones, auditorías de cliente, PIF cosmético o revisión de lote.`
      ]),
      section(`Matriz de riesgo, decisión y evidencia esperada`, `Cada tipo de agua requiere una evidencia distinta. AquaVerify ayuda a conectar el punto, el método, el resultado y la decisión en un único historial.`, [
        `Loop de agua purificada: Biofilm, tendencia microbiológica, variación por punto de uso, tiempo de parada o sanitización incompleta. | Control por punto: Historial de loop, punto, fecha, operador, método, resultado, CoA, tendencia y acción documentada. | Decisión QA/QC: Liberación, alerta, remuestreo, investigación, sanitización o cierre de desviación.`,
        `WFI y áreas críticas: Mayor exigencia de trazabilidad, revisión y coordinación con el resto del plan de control de contaminación. | Evidencia integrada: Registro de punto crítico, lote, sala, turno, método, revisión de calidad y vínculo con documentación GMP. | Soporte a auditoría: Datos listos para inspección, revisión periódica, investigación o justificación técnica.`,
        `Agua como ingrediente cosmético: Impacto directo en fórmula, estabilidad microbiológica, lote, seguridad del producto y liberación. | Trazabilidad por fórmula: Relación entre agua, lote de fabricación, producto, tanque, resultado, criterio y CoA. | PIF y calidad: Registros consistentes para expediente de producto, responsable técnico, cliente o auditoría.`,
        `Último enjuague de equipos: Riesgo de arrastre microbiológico hacia el siguiente lote o línea, especialmente en productos acuosos. | Registro por equipo: Equipo, ciclo, lote anterior, lote siguiente, muestra, resultado, revisión y estado de liberación. | Cierre documentado: Evidencia de limpieza, investigación, repetición, retención o liberación del equipo.`,
        `Agua de entrada y pretratamiento: Cambios en carga microbiológica, fuente, filtros, RO, almacenamiento, mantenimiento o incidencias de suministro. | Tendencia de sistema: Seguimiento de captación, etapa de tratamiento, fecha, punto, resultado y posible causa de variación. | Acción técnica: Mantenimiento, cambio de filtro, sanitización, ajuste de frecuencia o investigación de origen.`
      ]),
      section(`Tecnología y reporting para un programa hídrico trazable`, `Los módulos pueden combinarse según matriz, método, laboratorio, tipo de agua, límites internos y criterios del sistema de calidad.`, [
        `AquaVerify Cloud: Puntos, usuarios, lotes, equipos, resultados, CoA, tendencias, desviaciones, acciones y evidencias en un entorno centralizado.`,
        `AquaVerify App: Registro de muestreo con ubicación, hora, responsable, fotos, observaciones, QR, lote, turno y cadena de custodia.`,
        `AquaVerify CoA: Informes CoA vinculados a muestra, método, laboratorio, criterio, revisión y estado de liberación.`,
        `ENUMERA® Soma 100 mL: Enumeración de colífagos somáticos en 100 mL cuando se requiere verificación avanzada de indicadores virales.`,
        `PLAQUE Soma 1 mL y 100 mL: Opciones de enumeración por placa para laboratorios que trabajan con ISO 10705-2, SAL/DAL o programas equivalentes.`,
        `MSA/MSB listos para usar: Medios y componentes preparados para estandarizar el flujo de laboratorio y reducir variabilidad operativa.`,
        `Gestión de desviaciones: Alertas, revisión, investigación, remuestreo, sanitización, CAPA y cierre documental por punto o lote.`,
        `Dashboard multi-planta: Visión consolidada por planta, sistema de agua, producto, cliente, laboratorio, tendencia y criticidad.`
      ]),
      section(`Programas de control para fabricación farmacéutica, cosmética y cuidado personal`, `La configuración se adapta al nivel de riesgo, tipo de producto, grado de agua, sistema de calidad, laboratorio y modelo de fabricación propio o contratado.`, [
        `Agua purificada: Seguimiento por depósito, loop, punto de uso, tendencia, método, lote afectado y evidencia de liberación.`,
        `WFI y fabricación estéril: Soporte documental para puntos críticos, revisión de calidad y evidencia integrada con el resto del plan analítico.`,
        `Medicamentos no estériles: Control del agua usada en soluciones, suspensiones, semisólidos, cremas, geles, jarabes o productos de uso tópico.`,
        `Cosmética y dermocosmética: Trazabilidad del agua como ingrediente en emulsiones, geles, champús, tónicos, cremas, sérums y productos de cuidado personal.`,
        `Limpieza, CIP/SIP y enjuague: Vinculación del último enjuague, ciclo, equipo, línea, lote anterior y lote siguiente con resultados y decisión.`,
        `Pretratamiento y utilities: Seguimiento de agua de entrada, filtros, ósmosis, UV, depósitos, recirculación, sanitización y puntos de baja circulación.`,
        `CDMO, CMO y private label: Estandarización de evidencias por cliente, producto, orden de fabricación, lote, planta y laboratorio externo.`,
        `Investigación de desviaciones: Comparación de puntos, fechas, lotes, equipos, resultados y tendencias para priorizar remuestreo, sanitización o causa probable.`
      ]),
      section(`Compatible con programas de calidad, GMP y control microbiológico`, `AquaVerify no sustituye el sistema de calidad ni la validación del laboratorio. Refuerza la trazabilidad, la revisión y la evidencia documental del programa de control del agua.`, [
        `EMA · Agua para uso farmacéutico: Soporte para organizar evidencias por tipo de agua, uso, método, punto, resultado y revisión de calidad.`,
        `EudraLex Volume 4 GMP: Flujos documentales alineables con control de calidad, documentación, sistemas informatizados, validación y liberación.`,
        `Farmacopea Europea: Uso de referencias como agua purificada, WFI y TOC dentro del plan analítico definido por la organización.`,
        `Reglamento cosmético UE 1223/2009: Apoyo a registros de seguridad, expediente de producto, trazabilidad de fabricación y evidencias para la persona responsable.`,
        `EN ISO 22716: Buenas prácticas de fabricación cosmética para producción, control, almacenamiento y envío.`,
        `ISO 21149 e ISO 16212: Referencias de microbiología cosmética para bacterias aerobias mesófilas, levaduras y mohos cuando aplican al producto o plan.`
      ]),
      section(`De puntos críticos aislados a control hídrico multi-planta`, `El programa puede empezar por un loop, una línea o un tipo de producto y ampliarse progresivamente hacia un modelo global.`, [
        `Inventario crítico: Clasificar tipos de agua, puntos, equipos, líneas, productos, laboratorios y responsables.`,
        `Plan de muestreo: Definir frecuencia, método, volumen, criterios, tiempos de respuesta y reglas de revisión.`,
        `Custodia digital: Capturar muestras, contexto, ubicación, lote, observaciones, fotos y cadena de custodia.`,
        `Reporting y tendencias: Emitir CoA, revisar alertas, analizar tendencias y conectar resultados con decisiones.`,
        `Desviaciones y escala: Estandarizar investigación, CAPA, auditoría, multi-planta, clientes y revisión periódica.`
      ]),
      section(`Una implementación enfocada en evidencia, adopción y continuidad operativa`, `AquaVerify se configura para convivir con el laboratorio interno, laboratorios externos, LIMS, ERP, procedimientos de calidad y modelos de fabricación contratada.`, [
        `Diagnóstico de puntos: Selección de puntos críticos, productos, grados de agua, equipos, responsables y documentación existente.`,
        `Configuración del flujo: Alta de usuarios, roles, criterios, formularios, muestras, CoA, alertas, desviaciones y acciones.`,
        `Piloto operativo: Validación del flujo en una línea, loop, planta, laboratorio o categoría de producto antes de ampliar.`,
        `Escalado controlado: Extensión a más plantas, clientes, productos, laboratorios y paneles de seguimiento.`
      ])
    ],
    faqs: [
      {
        question: `¿AquaVerify sustituye el sistema GMP o el laboratorio acreditado?`,
        answer: `No. AquaVerify organiza el flujo de muestreo, trazabilidad, resultados, CoA, tendencias y desviaciones. El sistema de calidad, la validación de métodos, los límites y el alcance del laboratorio siguen siendo responsabilidad de la organización y sus proveedores cualificados.`
      },
      {
        question: `¿Puede aplicarse a agua purificada y WFI?`,
        answer: `Sí, como capa de trazabilidad, evidencia y revisión para los puntos y métodos definidos por el programa de calidad. El grado de agua, los límites y los ensayos aplicables deben definirse según el uso, la farmacopea, el expediente y el sistema de calidad.`
      },
      {
        question: `¿Sirve para fabricación cosmética y cuidado personal?`,
        answer: `Sí. Permite vincular agua como ingrediente, agua de proceso, limpieza, enjuague, lote, fórmula, tanque, línea, resultado, CoA y registros para calidad, clientes, PIF o auditorías.`
      },
      {
        question: `¿Dónde encajan los colífagos somáticos?`,
        answer: `Los colífagos somáticos pueden utilizarse como indicadores virales en planes específicos de agua, verificación avanzada, investigación de contaminación o matrices donde el cliente, laboratorio o criterio técnico los requiera.`
      },
      {
        question: `¿Puede trabajar con laboratorios externos?`,
        answer: `Sí. La plataforma puede registrar cadena de custodia, recepción, método, resultado, observaciones, CoA y revisión, manteniendo la trazabilidad entre planta, laboratorio y equipo de calidad.`
      },
      {
        question: `¿Cómo ayuda ante una desviación?`,
        answer: `Permite comparar histórico, punto, lote, equipo, operador, método, tendencia y acciones previas para decidir remuestreo, investigación, sanitización, retención, liberación o CAPA con evidencia trazable.`
      }
    ]
  },
  en: {
    path: `/industries/pharmaceutical-cosmetics-water-quality`,
    title: `Water control for pharmaceutical and cosmetics manufacturing with batch-to-audit traceability`,
    description: `AquaVerify helps pharmaceutical manufacturers, cosmetic laboratories, CDMOs, CMOs and personal care plants turn water control into a documented workflow: points of use, samples, methods, results, CoA, trends, deviations and evidence available for quality, production, laboratory and audit teams.`,
    eyebrow: `Pharma · Cosmetics · GMP · QA/QC`,
    primaryCta: `Request water-control assessment`,
    secondaryCta: `View quality workflow`,
    seoTitle: `Water quality for pharmaceutical and cosmetics manufacturing | AquaVerify`,
    seoDescription: `Water quality control for pharmaceutical and cosmetics manufacturing: purified water, WFI, loops, points of use, CoA, deviations and batch-to-audit traceability.`,
    cta: {
      title: `Turn water control into evidence ready for quality, batch review and audit`,
      body: `Share your water types, critical points, products, laboratory and current result workflow. AquaVerify helps design a traceable programme to reduce uncertainty, accelerate decisions and document every relevant action.`
    },
    sections: [
      section(`Water can be an ingredient, excipient, cleaning medium and source of deviations`, `In pharmaceutical and cosmetics plants, water moves through intake, pretreatment, reverse osmosis, storage, loops, points of use, formulation, cleaning and rinsing. A microbiological deviation is not just a laboratory result: it can affect batches, equipment release, investigation time and audits.`, [
        `Water as critical material: Water may be part of the formula, act as an excipient or support operations where microbiological quality affects the usage decision.`,
        `Loops and points of use: Tanks, recirculation, valves, hoses, filters and low-flow areas can create variability, biofilm or out-of-control trends.`,
        `Cleaning and rinsing: Cleaning water, final rinse water and equipment preparation must be linked to the equipment, cycle, next batch and release evidence.`,
        `Audits and deviations: Quality teams need to show which point was controlled, which criterion applied, what result was obtained and what action was taken.`
      ]),
      section(`From water type to quality decision`, `A digital workflow connects the physical point with the batch, method, result, review and documented action.`, [
        `Classify water: Define incoming water, purified water, WFI, process water, cosmetic ingredient water, cleaning, rinsing or special use.`,
        `Map points: Register intake, pretreatment, RO, tank, loop, point of use, line, equipment, room and formulation.`,
        `Assign plan: Configure frequency, method, volume, criterion, owner, laboratory, holding time and result priority.`,
        `Take sample: Record operator, date, time, batch, shift, location, photos, observations and chain of custody.`,
        `Review result: Integrate reading, CoA, trend, indicator, method, QA/QC review and comparison with defined criteria.`,
        `Close decision: Release, hold, resample, investigate, sanitise, open CAPA or close deviation with auditable evidence.`
      ]),
      section(`One shared system for quality, laboratory, production and engineering`, `AquaVerify centralises water history so each team can act without losing technical context or documentary traceability.`, [
        `Quality Assurance: Reviews results, trends, deviations, CAPA, CoA and evidence before releasing water, equipment or batch.`,
        `QC microbiology: Manages samples, methods, controls, observations, results and communication with internal or external laboratories.`,
        `Production and manufacturing: Links water, shift, equipment, line, batch, formulation and operational decision before the process continues.`,
        `Engineering and utilities: Controls pretreatment, RO, tanks, loops, sanitisation, points of use, maintenance and configuration changes.`,
        `Regulatory, QP and Responsible Person: Prepares consistent records for dossiers, inspections, customer audits, cosmetic PIF or batch review.`
      ]),
      section(`Risk, decision and expected evidence matrix`, `Each water type requires different evidence. AquaVerify helps connect the point, method, result and decision in one history.`, [
        `Purified water loop: Biofilm, microbiological trend, point-of-use variability, downtime or incomplete sanitisation. | Point control: Loop, point, date, operator, method, result, CoA, trend and documented action history. | QA/QC decision: Release, alert, resample, investigation, sanitisation or deviation closure.`,
        `WFI and critical areas: Higher traceability and review requirements, coordinated with the broader contamination control plan. | Integrated evidence: Critical point, batch, room, shift, method, quality review and link to GMP documentation. | Audit support: Data ready for inspection, periodic review, investigation or technical justification.`,
        `Water as cosmetic ingredient: Direct impact on formula, microbiological stability, batch, product safety and release. | Formula traceability: Relationship between water, manufacturing batch, product, tank, result, criterion and CoA. | PIF and quality: Consistent records for product information file, technical owner, customer or audit.`,
        `Final equipment rinse: Risk of microbiological carryover to the next batch or line, especially for water-rich products. | Equipment record: Equipment, cycle, previous batch, next batch, sample, result, review and release status. | Documented closure: Cleaning evidence, investigation, repeat, hold or equipment release.`,
        `Incoming water and pretreatment: Changes in microbiological load, source, filters, RO, storage, maintenance or supply incidents. | System trend: Monitoring of intake, treatment stage, date, point, result and possible cause of variation. | Technical action: Maintenance, filter change, sanitisation, frequency adjustment or source investigation.`
      ]),
      section(`Technology and reporting for a traceable water programme`, `Modules can be combined according to matrix, method, laboratory, water type, internal limits and quality-system criteria.`, [
        `AquaVerify Cloud: Points, users, batches, equipment, results, CoA, trends, deviations, actions and evidence in a central environment.`,
        `AquaVerify App: Sampling record with location, time, owner, photos, observations, QR, batch, shift and chain of custody.`,
        `AquaVerify CoA: CoA reports linked to sample, method, laboratory, criterion, review and release status.`,
        `ENUMERA® Soma 100 mL: Enumeration of somatic coliphages in 100 mL when advanced viral-indicator verification is required.`,
        `PLAQUE Soma 1 mL and 100 mL: Plate enumeration options for laboratories working with ISO 10705-2, SAL/DAL or equivalent programmes.`,
        `Ready-to-use MSA/MSB: Prepared media and components to standardise laboratory flow and reduce operational variability.`,
        `Deviation management: Alerts, review, investigation, resampling, sanitisation, CAPA and documentary closure by point or batch.`,
        `Multi-site dashboard: Consolidated view by site, water system, product, customer, laboratory, trend and criticality.`
      ]),
      section(`Control programmes for pharmaceutical, cosmetics and personal care manufacturing`, `The configuration adapts to risk level, product type, water grade, quality system, laboratory and in-house or outsourced manufacturing model.`, [
        `Purified water: Follow-up by tank, loop, point of use, trend, method, affected batch and release evidence.`,
        `WFI and sterile manufacturing: Documentation support for critical points, quality review and evidence integrated with the wider analytical plan.`,
        `Non-sterile medicines: Control of water used in solutions, suspensions, semi-solids, creams, gels, syrups or topical products.`,
        `Cosmetics and dermocosmetics: Traceability of water as an ingredient in emulsions, gels, shampoos, toners, creams, serums and personal care products.`,
        `Cleaning, CIP/SIP and rinsing: Link final rinse, cycle, equipment, line, previous batch and next batch with results and decision.`,
        `Pretreatment and utilities: Monitor incoming water, filters, RO, UV, tanks, recirculation, sanitisation and low-flow points.`,
        `CDMO, CMO and private label: Standardise evidence by customer, product, manufacturing order, batch, site and external laboratory.`,
        `Deviation investigation: Compare points, dates, batches, equipment, results and trends to prioritise resampling, sanitisation or likely cause.`
      ]),
      section(`Compatible with quality, GMP and microbiological control programmes`, `AquaVerify does not replace the quality system or laboratory validation. It strengthens traceability, review and documentary evidence for the water-control programme.`, [
        `EMA · Water for pharmaceutical use: Support to organise evidence by water type, use, method, point, result and quality review.`,
        `EudraLex Volume 4 GMP: Documentary workflows alignable with quality control, documentation, computerised systems, validation and release.`,
        `European Pharmacopoeia: Use of references such as purified water, WFI and TOC within the analytical plan defined by the organisation.`,
        `EU Cosmetics Regulation 1223/2009: Support for safety records, product information files, manufacturing traceability and Responsible Person evidence.`,
        `EN ISO 22716: Cosmetic good manufacturing practice for production, control, storage and shipment.`,
        `ISO 21149 and ISO 16212: Cosmetic microbiology references for aerobic mesophilic bacteria, yeast and mould when applicable to product or plan.`
      ]),
      section(`From isolated critical points to multi-site water control`, `The programme can start with one loop, one line or one product type and progressively expand into a global model.`, [
        `Critical inventory: Classify water types, points, equipment, lines, products, laboratories and owners.`,
        `Sampling plan: Define frequency, method, volume, criteria, turnaround expectations and review rules.`,
        `Digital custody: Capture samples, context, location, batch, observations, photos and chain of custody.`,
        `Reporting and trends: Issue CoA, review alerts, analyse trends and connect results with decisions.`,
        `Deviations and scale: Standardise investigation, CAPA, audit, multi-site deployment, customers and periodic review.`
      ]),
      section(`An implementation focused on evidence, adoption and operational continuity`, `AquaVerify is configured to work alongside internal laboratories, external laboratories, LIMS, ERP, quality procedures and outsourced manufacturing models.`, [
        `Point assessment: Selection of critical points, products, water grades, equipment, owners and existing documentation.`,
        `Workflow setup: Users, roles, criteria, forms, samples, CoA, alerts, deviations and actions.`,
        `Operational pilot: Workflow validation on one line, loop, site, laboratory or product category before expansion.`,
        `Controlled scale-up: Extension to more sites, customers, products, laboratories and monitoring dashboards.`
      ])
    ],
    faqs: [
      {
        question: `Does AquaVerify replace the GMP system or accredited laboratory?`,
        answer: `No. AquaVerify organises sampling, traceability, results, CoA, trends and deviations. The quality system, method validation, limits and laboratory scope remain the responsibility of the organisation and its qualified providers.`
      },
      {
        question: `Can it be used for purified water and WFI?`,
        answer: `Yes, as a traceability, evidence and review layer for the points and methods defined by the quality programme. Water grade, limits and applicable tests must be defined according to use, pharmacopoeia, dossier and quality system.`
      },
      {
        question: `Is it suitable for cosmetics and personal care manufacturing?`,
        answer: `Yes. It links ingredient water, process water, cleaning, rinsing, batch, formula, tank, line, result, CoA and records for quality teams, customers, PIF or audits.`
      },
      {
        question: `Where do somatic coliphages fit?`,
        answer: `Somatic coliphages can be used as viral indicators in specific water plans, advanced verification, contamination investigation or matrices where the customer, laboratory or technical criterion requires them.`
      },
      {
        question: `Can it work with external laboratories?`,
        answer: `Yes. The platform can record chain of custody, receipt, method, result, observations, CoA and review, maintaining traceability between site, laboratory and quality team.`
      },
      {
        question: `How does it help during a deviation?`,
        answer: `It allows comparison of history, point, batch, equipment, operator, method, trend and previous actions to decide resampling, investigation, sanitisation, hold, release or CAPA with traceable evidence.`
      }
    ]
  },
  fr: {
    path: `/fr/industries/qualite-eau-industrie-pharmaceutique-cosmetique`,
    title: `Contrôle de l’eau en industrie pharmaceutique et cosmétique avec traçabilité du lot à l’audit`,
    description: `AquaVerify aide les fabricants pharmaceutiques, laboratoires cosmétiques, CDMO, CMO et sites de personal care à transformer le contrôle de l’eau en flux documenté : points d’utilisation, échantillons, méthodes, résultats, CoA, tendances, déviations et preuves disponibles pour qualité, production, laboratoire et audit.`,
    eyebrow: `Pharmaceutique · Cosmétique · GMP · QA/QC`,
    primaryCta: `Demander un diagnostic eau`,
    secondaryCta: `Voir le flux qualité`,
    seoTitle: `Qualité de l’eau pour l’industrie pharmaceutique et cosmétique | AquaVerify`,
    seoDescription: `Contrôle qualité de l’eau pour industrie pharmaceutique et cosmétique : eau purifiée, WFI, boucles, points d’utilisation, CoA, déviations et traçabilité du lot à l’audit.`,
    cta: {
      title: `Transformez le contrôle de l’eau en preuve prête pour qualité, revue de lot et audit`,
      body: `Partagez vos types d’eau, points critiques, produits, laboratoire et flux actuel de résultats. AquaVerify aide à concevoir un programme traçable pour réduire l’incertitude, accélérer les décisions et documenter chaque action pertinente.`
    },
    sections: [
      section(`L’eau peut être ingrédient, excipient, milieu de nettoyage et source de déviations`, `Dans les sites pharmaceutiques et cosmétiques, l’eau traverse captage, prétraitement, osmose inverse, stockage, boucles, points d’utilisation, formulation, nettoyage et rinçage. Une déviation microbiologique n’est pas seulement un résultat de laboratoire : elle peut affecter lots, équipements, temps d’investigation et audits.`, [
        `Eau comme matière critique: L’eau peut entrer dans la formule, agir comme excipient ou intervenir dans des opérations où la qualité microbiologique conditionne la décision d’utilisation.`,
        `Boucles et points d’utilisation: Cuves, recirculations, vannes, flexibles, filtres et zones de faible circulation peuvent générer variabilité, biofilm ou tendances hors contrôle.`,
        `Nettoyage et rinçage: L’eau de nettoyage, le dernier rinçage ou la préparation d’équipement doivent être liés à l’équipement, au cycle, au lot suivant et à la preuve de libération.`,
        `Audits et déviations: Les équipes qualité doivent démontrer quel point a été contrôlé, quel critère a été appliqué, quel résultat a été obtenu et quelle action a été prise.`
      ]),
      section(`Du type d’eau à la décision qualité`, `Un flux numérique relie le point physique au lot, à la méthode, au résultat, à la revue et à l’action documentée.`, [
        `Classer l’eau: Définir eau entrante, eau purifiée, WFI, eau de procédé, ingrédient cosmétique, nettoyage, rinçage ou usage spécial.`,
        `Cartographier les points: Enregistrer captage, prétraitement, RO, cuve, boucle, point d’utilisation, ligne, équipement, salle et formule.`,
        `Attribuer le plan: Configurer fréquence, méthode, volume, critère, responsable, laboratoire, délai d’attente et priorité du résultat.`,
        `Prélever: Documenter opérateur, date, heure, lot, équipe, localisation, photos, observations et chaîne de traçabilité.`,
        `Revoir le résultat: Intégrer lecture, CoA, tendance, indicateur, méthode, revue QA/QC et comparaison aux critères définis.`,
        `Clôturer la décision: Libérer, retenir, rééchantillonner, investiguer, assainir, ouvrir CAPA ou clôturer la déviation avec preuve auditable.`
      ]),
      section(`Un système commun pour qualité, laboratoire, production et ingénierie`, `AquaVerify centralise l’historique de l’eau afin que chaque équipe puisse agir sans perdre le contexte technique ni la traçabilité documentaire.`, [
        `Quality Assurance: Revoit résultats, tendances, déviations, CAPA, CoA et preuves avant libération de l’eau, de l’équipement ou du lot.`,
        `QC microbiologie: Gère échantillons, méthodes, contrôles, observations, résultats et communication avec laboratoires internes ou externes.`,
        `Production et fabrication: Relie eau, équipe, équipement, ligne, lot, formulation et décision opérationnelle avant poursuite du procédé.`,
        `Ingénierie et utilities: Contrôle prétraitement, RO, cuves, boucles, assainissement, points d’utilisation, maintenance et changements de configuration.`,
        `Réglementaire, QP et Responsible Person: Prépare des registres cohérents pour dossiers, inspections, audits client, PIF cosmétique ou revue de lot.`
      ]),
      section(`Matrice de risque, décision et preuve attendue`, `Chaque type d’eau exige une preuve différente. AquaVerify aide à connecter point, méthode, résultat et décision dans un historique unique.`, [
        `Boucle d’eau purifiée: Biofilm, tendance microbiologique, variabilité par point d’utilisation, arrêt ou assainissement incomplet. | Contrôle par point: Historique boucle, point, date, opérateur, méthode, résultat, CoA, tendance et action documentée. | Décision QA/QC: Libération, alerte, rééchantillonnage, investigation, assainissement ou clôture de déviation.`,
        `WFI et zones critiques: Exigence accrue de traçabilité, revue et coordination avec le plan global de contrôle de contamination. | Preuve intégrée: Point critique, lot, salle, équipe, méthode, revue qualité et lien avec documentation GMP. | Support audit: Données prêtes pour inspection, revue périodique, investigation ou justification technique.`,
        `Eau comme ingrédient cosmétique: Impact direct sur formule, stabilité microbiologique, lot, sécurité produit et libération. | Traçabilité formule: Relation entre eau, lot de fabrication, produit, cuve, résultat, critère et CoA. | PIF et qualité: Registres cohérents pour dossier produit, responsable technique, client ou audit.`,
        `Dernier rinçage d’équipement: Risque de transfert microbiologique vers le lot ou la ligne suivante, surtout pour produits riches en eau. | Registre équipement: Équipement, cycle, lot précédent, lot suivant, échantillon, résultat, revue et état de libération. | Clôture documentée: Preuve de nettoyage, investigation, répétition, rétention ou libération d’équipement.`,
        `Eau entrante et prétraitement: Changements de charge microbiologique, source, filtres, RO, stockage, maintenance ou incidents d’approvisionnement. | Tendance système: Suivi captage, étape de traitement, date, point, résultat et cause possible de variation. | Action technique: Maintenance, changement de filtre, assainissement, ajustement de fréquence ou investigation de source.`
      ]),
      section(`Technologie et reporting pour un programme hydrique traçable`, `Les modules peuvent être combinés selon matrice, méthode, laboratoire, type d’eau, limites internes et critères du système qualité.`, [
        `AquaVerify Cloud: Points, utilisateurs, lots, équipements, résultats, CoA, tendances, déviations, actions et preuves dans un environnement centralisé.`,
        `AquaVerify App: Registre d’échantillonnage avec localisation, heure, responsable, photos, observations, QR, lot, équipe et chaîne de traçabilité.`,
        `AquaVerify CoA: Rapports CoA liés à échantillon, méthode, laboratoire, critère, revue et état de libération.`,
        `ENUMERA® Soma 100 mL: Énumération des coliphages somatiques dans 100 mL lorsqu’une vérification avancée d’indicateurs viraux est requise.`,
        `PLAQUE Soma 1 mL et 100 mL: Options d’énumération sur plaque pour laboratoires travaillant avec ISO 10705-2, SAL/DAL ou programmes équivalents.`,
        `MSA/MSB prêts à l’emploi: Milieux et composants préparés pour standardiser le flux de laboratoire et réduire la variabilité opérationnelle.`,
        `Gestion des déviations: Alertes, revue, investigation, rééchantillonnage, assainissement, CAPA et clôture documentaire par point ou lot.`,
        `Dashboard multi-site: Vue consolidée par site, système d’eau, produit, client, laboratoire, tendance et criticité.`
      ]),
      section(`Programmes de contrôle pour fabrication pharmaceutique, cosmétique et personal care`, `La configuration s’adapte au niveau de risque, type de produit, grade d’eau, système qualité, laboratoire et modèle de fabrication interne ou sous-traitée.`, [
        `Eau purifiée: Suivi par cuve, boucle, point d’utilisation, tendance, méthode, lot concerné et preuve de libération.`,
        `WFI et fabrication stérile: Support documentaire pour points critiques, revue qualité et preuve intégrée au plan analytique global.`,
        `Médicaments non stériles: Contrôle de l’eau utilisée dans solutions, suspensions, semi-solides, crèmes, gels, sirops ou produits topiques.`,
        `Cosmétique et dermocosmétique: Traçabilité de l’eau comme ingrédient dans émulsions, gels, shampooings, toniques, crèmes, sérums et personal care.`,
        `Nettoyage, CIP/SIP et rinçage: Lien entre dernier rinçage, cycle, équipement, ligne, lot précédent et lot suivant avec résultats et décision.`,
        `Prétraitement et utilities: Suivi eau entrante, filtres, RO, UV, cuves, recirculation, assainissement et points de faible circulation.`,
        `CDMO, CMO et private label: Standardisation des preuves par client, produit, ordre de fabrication, lot, site et laboratoire externe.`,
        `Investigation de déviations: Comparaison points, dates, lots, équipements, résultats et tendances pour prioriser rééchantillonnage, assainissement ou cause probable.`
      ]),
      section(`Compatible avec les programmes qualité, GMP et contrôle microbiologique`, `AquaVerify ne remplace pas le système qualité ni la validation du laboratoire. Il renforce la traçabilité, la revue et la preuve documentaire du programme de contrôle de l’eau.`, [
        `EMA · Eau pour usage pharmaceutique: Support pour organiser les preuves par type d’eau, usage, méthode, point, résultat et revue qualité.`,
        `EudraLex Volume 4 GMP: Flux documentaires alignables avec contrôle qualité, documentation, systèmes informatisés, validation et libération.`,
        `Pharmacopée Européenne: Utilisation de références comme eau purifiée, WFI et TOC dans le plan analytique défini par l’organisation.`,
        `Règlement cosmétique UE 1223/2009: Support aux registres de sécurité, dossier produit, traçabilité de fabrication et preuves pour la personne responsable.`,
        `EN ISO 22716: Bonnes pratiques de fabrication cosmétique pour production, contrôle, stockage et expédition.`,
        `ISO 21149 et ISO 16212: Références de microbiologie cosmétique pour bactéries aérobies mésophiles, levures et moisissures lorsque applicable.`
      ]),
      section(`Des points critiques isolés au contrôle hydrique multi-site`, `Le programme peut commencer par une boucle, une ligne ou un type de produit et s’étendre progressivement vers un modèle global.`, [
        `Inventaire critique: Classer types d’eau, points, équipements, lignes, produits, laboratoires et responsables.`,
        `Plan d’échantillonnage: Définir fréquence, méthode, volume, critères, attentes de délai et règles de revue.`,
        `Custody numérique: Capturer échantillons, contexte, localisation, lot, observations, photos et chaîne de traçabilité.`,
        `Reporting et tendances: Émettre CoA, revoir alertes, analyser tendances et relier résultats aux décisions.`,
        `Déviations et échelle: Standardiser investigation, CAPA, audit, multi-site, clients et revue périodique.`
      ]),
      section(`Une implantation centrée sur la preuve, l’adoption et la continuité opérationnelle`, `AquaVerify se configure pour coexister avec laboratoires internes, laboratoires externes, LIMS, ERP, procédures qualité et modèles de fabrication sous-traitée.`, [
        `Diagnostic des points: Sélection des points critiques, produits, grades d’eau, équipements, responsables et documentation existante.`,
        `Configuration du flux: Utilisateurs, rôles, critères, formulaires, échantillons, CoA, alertes, déviations et actions.`,
        `Pilote opérationnel: Validation du flux sur une ligne, boucle, site, laboratoire ou catégorie de produit avant extension.`,
        `Extension contrôlée: Déploiement vers plus de sites, clients, produits, laboratoires et tableaux de suivi.`
      ])
    ],
    faqs: [
      {
        question: `AquaVerify remplace-t-il le système GMP ou le laboratoire accrédité ?`,
        answer: `Non. AquaVerify organise échantillonnage, traçabilité, résultats, CoA, tendances et déviations. Le système qualité, la validation des méthodes, les limites et le périmètre du laboratoire restent sous la responsabilité de l’organisation et de ses fournisseurs qualifiés.`
      },
      {
        question: `Peut-il s’appliquer à l’eau purifiée et à la WFI ?`,
        answer: `Oui, comme couche de traçabilité, preuve et revue pour les points et méthodes définis par le programme qualité. Le grade d’eau, les limites et les essais applicables doivent être définis selon l’usage, la pharmacopée, le dossier et le système qualité.`
      },
      {
        question: `Convient-il à la fabrication cosmétique et personal care ?`,
        answer: `Oui. Il relie eau ingrédient, eau de procédé, nettoyage, rinçage, lot, formule, cuve, ligne, résultat, CoA et registres pour qualité, clients, PIF ou audits.`
      },
      {
        question: `Où s’intègrent les coliphages somatiques ?`,
        answer: `Les coliphages somatiques peuvent servir d’indicateurs viraux dans des plans d’eau spécifiques, vérification avancée, investigation de contamination ou matrices où client, laboratoire ou critère technique les demande.`
      },
      {
        question: `Peut-il travailler avec des laboratoires externes ?`,
        answer: `Oui. La plateforme peut enregistrer chaîne de traçabilité, réception, méthode, résultat, observations, CoA et revue, en maintenant la traçabilité entre site, laboratoire et équipe qualité.`
      },
      {
        question: `Comment aide-t-il lors d’une déviation ?`,
        answer: `Il permet de comparer historique, point, lot, équipement, opérateur, méthode, tendance et actions précédentes afin de décider rééchantillonnage, investigation, assainissement, rétention, libération ou CAPA avec preuve traçable.`
      }
    ]
  },
  it: {
    path: `/it/settori/qualita-acqua-industria-farmaceutica-cosmetica`,
    title: `Controllo dell’acqua nell’industria farmaceutica e cosmetica con tracciabilità dal lotto all’audit`,
    description: `AquaVerify aiuta produttori farmaceutici, laboratori cosmetici, CDMO, CMO e siti personal care a trasformare il controllo dell’acqua in un flusso documentato: punti d’uso, campioni, metodi, risultati, CoA, trend, deviazioni e prove disponibili per qualità, produzione, laboratorio e audit.`,
    eyebrow: `Farmaceutica · Cosmetica · GMP · QA/QC`,
    primaryCta: `Richiedi diagnosi acqua`,
    secondaryCta: `Vedi flusso qualità`,
    seoTitle: `Qualità dell’acqua per industria farmaceutica e cosmetica | AquaVerify`,
    seoDescription: `Controllo qualità dell’acqua per industria farmaceutica e cosmetica: acqua purificata, WFI, loop, punti d’uso, CoA, deviazioni e tracciabilità dal lotto all’audit.`,
    cta: {
      title: `Trasforma il controllo dell’acqua in prova pronta per qualità, revisione lotto e audit`,
      body: `Condividi tipi d’acqua, punti critici, prodotti, laboratorio e flusso attuale dei risultati. AquaVerify aiuta a progettare un programma tracciabile per ridurre incertezza, accelerare decisioni e documentare ogni azione rilevante.`
    },
    sections: [
      section(`L’acqua può essere ingrediente, eccipiente, mezzo di pulizia e fonte di deviazioni`, `Negli stabilimenti farmaceutici e cosmetici, l’acqua attraversa presa, pretrattamento, osmosi inversa, stoccaggio, loop, punti d’uso, formulazione, pulizia e risciacquo. Una deviazione microbiologica non è solo un risultato di laboratorio: può incidere su lotti, attrezzature, tempi di investigazione e audit.`, [
        `Acqua come materiale critico: L’acqua può far parte della formula, agire da eccipiente o supportare operazioni in cui la qualità microbiologica condiziona la decisione d’uso.`,
        `Loop e punti d’uso: Serbatoi, ricircoli, valvole, tubi, filtri e zone a bassa circolazione possono generare variabilità, biofilm o trend fuori controllo.`,
        `Pulizia e risciacquo: Acqua di pulizia, ultimo risciacquo o preparazione delle attrezzature devono essere collegati ad attrezzatura, ciclo, lotto successivo e prova di rilascio.`,
        `Audit e deviazioni: I team qualità devono dimostrare quale punto è stato controllato, quale criterio è stato applicato, quale risultato è stato ottenuto e quale azione è stata presa.`
      ]),
      section(`Dal tipo d’acqua alla decisione qualità`, `Un flusso digitale collega il punto fisico con lotto, metodo, risultato, revisione e azione documentata.`, [
        `Classificare l’acqua: Definisci acqua in ingresso, purificata, WFI, processo, ingrediente cosmetico, pulizia, risciacquo o uso speciale.`,
        `Mappare i punti: Registra presa, pretrattamento, RO, serbatoio, loop, punto d’uso, linea, attrezzatura, sala e formula.`,
        `Assegnare il piano: Configura frequenza, metodo, volume, criterio, responsabile, laboratorio, tempo di attesa e priorità del risultato.`,
        `Prelevare il campione: Documenta operatore, data, ora, lotto, turno, posizione, foto, osservazioni e catena di custodia.`,
        `Rivedere il risultato: Integra lettura, CoA, trend, indicatore, metodo, revisione QA/QC e confronto con criteri definiti.`,
        `Chiudere la decisione: Rilascia, trattieni, ricampiona, investiga, sanifica, apri CAPA o chiudi deviazione con prova auditabile.`
      ]),
      section(`Un sistema comune per qualità, laboratorio, produzione e ingegneria`, `AquaVerify centralizza lo storico dell’acqua affinché ogni team possa agire senza perdere contesto tecnico o tracciabilità documentale.`, [
        `Quality Assurance: Rivede risultati, trend, deviazioni, CAPA, CoA e prove prima di rilasciare acqua, attrezzatura o lotto.`,
        `QC microbiologia: Gestisce campioni, metodi, controlli, osservazioni, risultati e comunicazione con laboratori interni o esterni.`,
        `Produzione e fabbricazione: Collega acqua, turno, attrezzatura, linea, lotto, formulazione e decisione operativa prima di continuare il processo.`,
        `Ingegneria e utilities: Controlla pretrattamento, RO, serbatoi, loop, sanificazione, punti d’uso, manutenzione e cambi di configurazione.`,
        `Regulatory, QP e Responsible Person: Prepara registri coerenti per dossier, ispezioni, audit cliente, PIF cosmetico o revisione lotto.`
      ]),
      section(`Matrice di rischio, decisione e prova attesa`, `Ogni tipo d’acqua richiede una prova diversa. AquaVerify aiuta a collegare punto, metodo, risultato e decisione in un unico storico.`, [
        `Loop acqua purificata: Biofilm, trend microbiologico, variabilità per punto d’uso, fermo impianto o sanificazione incompleta. | Controllo per punto: Storico loop, punto, data, operatore, metodo, risultato, CoA, trend e azione documentata. | Decisione QA/QC: Rilascio, allerta, ricampionamento, investigazione, sanificazione o chiusura deviazione.`,
        `WFI e aree critiche: Maggiori requisiti di tracciabilità, revisione e coordinamento con il piano globale di controllo contaminazione. | Prova integrata: Punto critico, lotto, sala, turno, metodo, revisione qualità e collegamento con documentazione GMP. | Supporto audit: Dati pronti per ispezione, revisione periodica, investigazione o giustificazione tecnica.`,
        `Acqua come ingrediente cosmetico: Impatto diretto su formula, stabilità microbiologica, lotto, sicurezza prodotto e rilascio. | Tracciabilità formula: Relazione tra acqua, lotto di produzione, prodotto, serbatoio, risultato, criterio e CoA. | PIF e qualità: Registri coerenti per fascicolo prodotto, responsabile tecnico, cliente o audit.`,
        `Ultimo risciacquo attrezzature: Rischio di trascinamento microbiologico verso lotto o linea successiva, soprattutto per prodotti ricchi d’acqua. | Registro attrezzatura: Attrezzatura, ciclo, lotto precedente, lotto successivo, campione, risultato, revisione e stato rilascio. | Chiusura documentata: Prova di pulizia, investigazione, ripetizione, trattenimento o rilascio attrezzatura.`,
        `Acqua in ingresso e pretrattamento: Cambi di carica microbiologica, fonte, filtri, RO, stoccaggio, manutenzione o incidenti di fornitura. | Trend sistema: Monitoraggio di presa, fase trattamento, data, punto, risultato e possibile causa di variazione. | Azione tecnica: Manutenzione, cambio filtro, sanificazione, adeguamento frequenza o investigazione della fonte.`
      ]),
      section(`Tecnologia e reporting per un programma idrico tracciabile`, `I moduli possono essere combinati secondo matrice, metodo, laboratorio, tipo d’acqua, limiti interni e criteri del sistema qualità.`, [
        `AquaVerify Cloud: Punti, utenti, lotti, attrezzature, risultati, CoA, trend, deviazioni, azioni e prove in un ambiente centralizzato.`,
        `AquaVerify App: Registro campionamento con posizione, ora, responsabile, foto, osservazioni, QR, lotto, turno e catena di custodia.`,
        `AquaVerify CoA: Report CoA collegati a campione, metodo, laboratorio, criterio, revisione e stato di rilascio.`,
        `ENUMERA® Soma 100 mL: Enumerazione di colifagi somatici in 100 mL quando è richiesta verifica avanzata di indicatori virali.`,
        `PLAQUE Soma 1 mL e 100 mL: Opzioni di enumerazione su piastra per laboratori che lavorano con ISO 10705-2, SAL/DAL o programmi equivalenti.`,
        `MSA/MSB pronti all’uso: Terreni e componenti preparati per standardizzare il flusso di laboratorio e ridurre variabilità operativa.`,
        `Gestione deviazioni: Allerte, revisione, investigazione, ricampionamento, sanificazione, CAPA e chiusura documentale per punto o lotto.`,
        `Dashboard multi-sito: Vista consolidata per sito, sistema acqua, prodotto, cliente, laboratorio, trend e criticità.`
      ]),
      section(`Programmi di controllo per produzione farmaceutica, cosmetica e personal care`, `La configurazione si adatta a livello di rischio, tipo di prodotto, grado d’acqua, sistema qualità, laboratorio e modello produttivo interno o esternalizzato.`, [
        `Acqua purificata: Monitoraggio per serbatoio, loop, punto d’uso, trend, metodo, lotto interessato e prova di rilascio.`,
        `WFI e produzione sterile: Supporto documentale per punti critici, revisione qualità e prova integrata con il resto del piano analitico.`,
        `Medicinali non sterili: Controllo dell’acqua usata in soluzioni, sospensioni, semisolidi, creme, gel, sciroppi o prodotti topici.`,
        `Cosmetica e dermocosmetica: Tracciabilità dell’acqua come ingrediente in emulsioni, gel, shampoo, tonici, creme, sieri e prodotti personal care.`,
        `Pulizia, CIP/SIP e risciacquo: Collegamento tra ultimo risciacquo, ciclo, attrezzatura, linea, lotto precedente e lotto successivo con risultati e decisione.`,
        `Pretrattamento e utilities: Monitoraggio acqua in ingresso, filtri, RO, UV, serbatoi, ricircolo, sanificazione e punti a bassa circolazione.`,
        `CDMO, CMO e private label: Standardizzazione di prove per cliente, prodotto, ordine di produzione, lotto, sito e laboratorio esterno.`,
        `Investigazione deviazioni: Confronto di punti, date, lotti, attrezzature, risultati e trend per prioritizzare ricampionamento, sanificazione o causa probabile.`
      ]),
      section(`Compatibile con programmi qualità, GMP e controllo microbiologico`, `AquaVerify non sostituisce il sistema qualità né la validazione del laboratorio. Rafforza tracciabilità, revisione e prova documentale del programma di controllo dell’acqua.`, [
        `EMA · Acqua per uso farmaceutico: Supporto per organizzare prove per tipo d’acqua, uso, metodo, punto, risultato e revisione qualità.`,
        `EudraLex Volume 4 GMP: Flussi documentali allineabili con controllo qualità, documentazione, sistemi informatizzati, validazione e rilascio.`,
        `Farmacopea Europea: Uso di riferimenti come acqua purificata, WFI e TOC nel piano analitico definito dall’organizzazione.`,
        `Regolamento cosmetico UE 1223/2009: Supporto a registri sicurezza, fascicolo prodotto, tracciabilità produttiva e prove per la persona responsabile.`,
        `EN ISO 22716: Buone pratiche di fabbricazione cosmetica per produzione, controllo, stoccaggio e spedizione.`,
        `ISO 21149 e ISO 16212: Riferimenti di microbiologia cosmetica per batteri aerobi mesofili, lieviti e muffe quando applicabili.`
      ]),
      section(`Dai punti critici isolati al controllo idrico multi-sito`, `Il programma può iniziare con un loop, una linea o un tipo di prodotto e ampliarsi gradualmente verso un modello globale.`, [
        `Inventario critico: Classificare tipi d’acqua, punti, attrezzature, linee, prodotti, laboratori e responsabili.`,
        `Piano campionamento: Definire frequenza, metodo, volume, criteri, tempi di risposta e regole di revisione.`,
        `Custodia digitale: Acquisire campioni, contesto, posizione, lotto, osservazioni, foto e catena di custodia.`,
        `Reporting e trend: Emettere CoA, rivedere allerte, analizzare trend e collegare risultati a decisioni.`,
        `Deviazioni e scala: Standardizzare investigazione, CAPA, audit, multi-sito, clienti e revisione periodica.`
      ]),
      section(`Un’implementazione focalizzata su prova, adozione e continuità operativa`, `AquaVerify si configura per convivere con laboratori interni, laboratori esterni, LIMS, ERP, procedure qualità e modelli di produzione esternalizzata.`, [
        `Diagnosi punti: Selezione di punti critici, prodotti, gradi d’acqua, attrezzature, responsabili e documentazione esistente.`,
        `Configurazione flusso: Utenti, ruoli, criteri, moduli, campioni, CoA, allerte, deviazioni e azioni.`,
        `Pilota operativo: Validazione del flusso su una linea, loop, sito, laboratorio o categoria prodotto prima dell’estensione.`,
        `Scalabilità controllata: Estensione a più siti, clienti, prodotti, laboratori e dashboard di monitoraggio.`
      ])
    ],
    faqs: [
      {
        question: `AquaVerify sostituisce il sistema GMP o il laboratorio accreditato?`,
        answer: `No. AquaVerify organizza campionamento, tracciabilità, risultati, CoA, trend e deviazioni. Sistema qualità, validazione metodi, limiti e ambito del laboratorio restano responsabilità dell’organizzazione e dei suoi fornitori qualificati.`
      },
      {
        question: `Può applicarsi ad acqua purificata e WFI?`,
        answer: `Sì, come livello di tracciabilità, prova e revisione per punti e metodi definiti dal programma qualità. Grado d’acqua, limiti e test applicabili devono essere definiti secondo uso, farmacopea, dossier e sistema qualità.`
      },
      {
        question: `È adatto alla produzione cosmetica e personal care?`,
        answer: `Sì. Collega acqua ingrediente, acqua di processo, pulizia, risciacquo, lotto, formula, serbatoio, linea, risultato, CoA e registri per qualità, clienti, PIF o audit.`
      },
      {
        question: `Dove si inseriscono i colifagi somatici?`,
        answer: `I colifagi somatici possono essere usati come indicatori virali in piani acqua specifici, verifica avanzata, investigazione contaminazione o matrici in cui cliente, laboratorio o criterio tecnico li richiedono.`
      },
      {
        question: `Può lavorare con laboratori esterni?`,
        answer: `Sì. La piattaforma può registrare catena di custodia, ricezione, metodo, risultato, osservazioni, CoA e revisione, mantenendo tracciabilità tra sito, laboratorio e team qualità.`
      },
      {
        question: `Come aiuta durante una deviazione?`,
        answer: `Permette di confrontare storico, punto, lotto, attrezzatura, operatore, metodo, trend e azioni precedenti per decidere ricampionamento, investigazione, sanificazione, trattenimento, rilascio o CAPA con prova tracciabile.`
      }
    ]
  },
  ca: {
    path: `/ca/sectors/qualitat-aigua-industria-farmaceutica-cosmetica`,
    title: `Control de l’aigua en indústria farmacèutica i cosmètica amb traçabilitat del lot a l’auditoria`,
    description: `AquaVerify ajuda fabricants farmacèutics, laboratoris cosmètics, CDMO, CMO i plantes de personal care a convertir el control de l’aigua en un flux documentat: punts d’ús, mostres, mètodes, resultats, CoA, tendències, desviacions i evidències disponibles per a qualitat, producció, laboratori i auditoria.`,
    eyebrow: `Farmacèutica · Cosmètica · GMP · QA/QC`,
    primaryCta: `Sol·licitar diagnòstic d’aigua`,
    secondaryCta: `Veure flux de qualitat`,
    seoTitle: `Qualitat de l’aigua per a indústria farmacèutica i cosmètica | AquaVerify`,
    seoDescription: `Control de qualitat de l’aigua en indústria farmacèutica i cosmètica: aigua purificada, WFI, loops, punts d’ús, CoA, desviacions i traçabilitat del lot a auditoria.`,
    cta: {
      title: `Converteix el control de l’aigua en evidència preparada per a qualitat, revisió de lot i auditoria`,
      body: `Comparteix els teus tipus d’aigua, punts crítics, productes, laboratori i flux actual de resultats. AquaVerify ajuda a dissenyar un programa traçable per reduir incertesa, accelerar decisions i documentar cada acció rellevant.`
    },
    sections: [
      section(`L’aigua pot ser ingredient, excipient, medi de neteja i font de desviacions`, `En plantes farmacèutiques i cosmètiques, l’aigua passa per captació, pretractament, osmosi inversa, emmagatzematge, loops, punts d’ús, formulació, neteja i esbandida. Una desviació microbiològica no és només un resultat de laboratori: pot afectar lots, equips, temps d’investigació i auditories.`, [
        `Aigua com a material crític: L’aigua pot formar part de la fórmula, actuar com a excipient o intervenir en operacions on la qualitat microbiològica condiciona la decisió d’ús.`,
        `Loops i punts d’ús: Dipòsits, recirculacions, vàlvules, mànegues, filtres i zones de baixa circulació poden generar variabilitat, biofilm o tendències fora de control.`,
        `Neteja i esbandida: L’aigua de neteja, l’última esbandida o la preparació d’equips han de quedar vinculades a l’equip, cicle, lot següent i evidència d’alliberament.`,
        `Auditories i desviacions: Els equips de qualitat han de demostrar quin punt es va controlar, quin criteri es va aplicar, quin resultat es va obtenir i quina acció es va prendre.`
      ]),
      section(`Del tipus d’aigua a la decisió de qualitat`, `Un flux digital permet connectar el punt físic amb el lot, el mètode, el resultat, la revisió i l’acció documentada.`, [
        `Classificar l’aigua: Defineix aigua d’entrada, purificada, WFI, procés, ingredient cosmètic, neteja, esbandida o ús especial.`,
        `Mapar punts: Registra captació, pretractament, RO, dipòsit, loop, punt d’ús, línia, equip, sala i fórmula.`,
        `Assignar pla: Configura freqüència, mètode, volum, criteri, responsable, laboratori, temps d’espera i prioritat del resultat.`,
        `Prendre mostra: Documenta operador, data, hora, lot, torn, ubicació, fotos, observacions i cadena de custòdia.`,
        `Revisar resultat: Integra lectura, CoA, tendència, indicador, mètode, revisió QA/QC i comparació amb criteris definits.`,
        `Tancar decisió: Allibera, retén, remostreja, investiga, saneja, obre CAPA o tanca desviació amb evidència auditable.`
      ]),
      section(`Un sistema comú per a qualitat, laboratori, producció i enginyeria`, `AquaVerify centralitza l’historial de l’aigua perquè cada equip pugui actuar sense perdre context tècnic ni traçabilitat documental.`, [
        `Quality Assurance: Revisa resultats, tendències, desviacions, CAPA, CoA i evidències abans d’alliberar aigua, equip o lot.`,
        `QC microbiologia: Gestiona mostres, mètodes, controls, observacions, resultats i comunicació amb laboratoris interns o externs.`,
        `Producció i fabricació: Vincula aigua, torn, equip, línia, lot, formulació i decisió operativa abans de continuar el procés.`,
        `Enginyeria i utilities: Controla pretractament, RO, dipòsits, loops, sanejament, punts d’ús, manteniment i canvis de configuració.`,
        `Regulatory, QP i Responsible Person: Prepara registres coherents per a dossiers, inspeccions, auditories de client, PIF cosmètic o revisió de lot.`
      ]),
      section(`Matriu de risc, decisió i evidència esperada`, `Cada tipus d’aigua requereix una evidència diferent. AquaVerify ajuda a connectar el punt, el mètode, el resultat i la decisió en un únic historial.`, [
        `Loop d’aigua purificada: Biofilm, tendència microbiològica, variabilitat per punt d’ús, parada o sanejament incomplet. | Control per punt: Historial de loop, punt, data, operador, mètode, resultat, CoA, tendència i acció documentada. | Decisió QA/QC: Alliberament, alerta, remostreig, investigació, sanejament o tancament de desviació.`,
        `WFI i àrees crítiques: Major exigència de traçabilitat, revisió i coordinació amb el pla global de control de contaminació. | Evidència integrada: Punt crític, lot, sala, torn, mètode, revisió de qualitat i vincle amb documentació GMP. | Suport a auditoria: Dades preparades per a inspecció, revisió periòdica, investigació o justificació tècnica.`,
        `Aigua com a ingredient cosmètic: Impacte directe en fórmula, estabilitat microbiològica, lot, seguretat del producte i alliberament. | Traçabilitat per fórmula: Relació entre aigua, lot de fabricació, producte, dipòsit, resultat, criteri i CoA. | PIF i qualitat: Registres coherents per a expedient de producte, responsable tècnic, client o auditoria.`,
        `Última esbandida d’equips: Risc d’arrossegament microbiològic cap al lot o línia següent, especialment en productes aquosos. | Registre per equip: Equip, cicle, lot anterior, lot següent, mostra, resultat, revisió i estat d’alliberament. | Tancament documentat: Evidència de neteja, investigació, repetició, retenció o alliberament de l’equip.`,
        `Aigua d’entrada i pretractament: Canvis en càrrega microbiològica, font, filtres, RO, emmagatzematge, manteniment o incidències de subministrament. | Tendència de sistema: Seguiment de captació, etapa de tractament, data, punt, resultat i possible causa de variació. | Acció tècnica: Manteniment, canvi de filtre, sanejament, ajust de freqüència o investigació de l’origen.`
      ]),
      section(`Tecnologia i reporting per a un programa hídric traçable`, `Els mòduls es poden combinar segons matriu, mètode, laboratori, tipus d’aigua, límits interns i criteris del sistema de qualitat.`, [
        `AquaVerify Cloud: Punts, usuaris, lots, equips, resultats, CoA, tendències, desviacions, accions i evidències en un entorn centralitzat.`,
        `AquaVerify App: Registre de mostreig amb ubicació, hora, responsable, fotos, observacions, QR, lot, torn i cadena de custòdia.`,
        `AquaVerify CoA: Informes CoA vinculats a mostra, mètode, laboratori, criteri, revisió i estat d’alliberament.`,
        `ENUMERA® Soma 100 mL: Enumeració de colífags somàtics en 100 mL quan es requereix verificació avançada d’indicadors virals.`,
        `PLAQUE Soma 1 mL i 100 mL: Opcions d’enumeració per placa per a laboratoris que treballen amb ISO 10705-2, SAL/DAL o programes equivalents.`,
        `MSA/MSB llestos per usar: Medis i components preparats per estandarditzar el flux de laboratori i reduir variabilitat operativa.`,
        `Gestió de desviacions: Alertes, revisió, investigació, remostreig, sanejament, CAPA i tancament documental per punt o lot.`,
        `Dashboard multi-planta: Visió consolidada per planta, sistema d’aigua, producte, client, laboratori, tendència i criticitat.`
      ]),
      section(`Programes de control per a fabricació farmacèutica, cosmètica i personal care`, `La configuració s’adapta al nivell de risc, tipus de producte, grau d’aigua, sistema de qualitat, laboratori i model de fabricació propi o subcontractat.`, [
        `Aigua purificada: Seguiment per dipòsit, loop, punt d’ús, tendència, mètode, lot afectat i evidència d’alliberament.`,
        `WFI i fabricació estèril: Suport documental per a punts crítics, revisió de qualitat i evidència integrada amb la resta del pla analític.`,
        `Medicaments no estèrils: Control de l’aigua usada en solucions, suspensions, semisòlids, cremes, gels, xarops o productes tòpics.`,
        `Cosmètica i dermocosmètica: Traçabilitat de l’aigua com a ingredient en emulsions, gels, xampús, tònics, cremes, sèrums i productes personal care.`,
        `Neteja, CIP/SIP i esbandida: Vinculació de l’última esbandida, cicle, equip, línia, lot anterior i lot següent amb resultats i decisió.`,
        `Pretractament i utilities: Seguiment d’aigua d’entrada, filtres, RO, UV, dipòsits, recirculació, sanejament i punts de baixa circulació.`,
        `CDMO, CMO i private label: Estandardització d’evidències per client, producte, ordre de fabricació, lot, planta i laboratori extern.`,
        `Investigació de desviacions: Comparació de punts, dates, lots, equips, resultats i tendències per prioritzar remostreig, sanejament o causa probable.`
      ]),
      section(`Compatible amb programes de qualitat, GMP i control microbiològic`, `AquaVerify no substitueix el sistema de qualitat ni la validació del laboratori. Reforça la traçabilitat, la revisió i l’evidència documental del programa de control de l’aigua.`, [
        `EMA · Aigua per a ús farmacèutic: Suport per organitzar evidències per tipus d’aigua, ús, mètode, punt, resultat i revisió de qualitat.`,
        `EudraLex Volume 4 GMP: Fluxos documentals alineables amb control de qualitat, documentació, sistemes informatitzats, validació i alliberament.`,
        `Farmacopea Europea: Ús de referències com aigua purificada, WFI i TOC dins el pla analític definit per l’organització.`,
        `Reglament cosmètic UE 1223/2009: Suport a registres de seguretat, expedient de producte, traçabilitat de fabricació i evidències per a la persona responsable.`,
        `EN ISO 22716: Bones pràctiques de fabricació cosmètica per a producció, control, emmagatzematge i enviament.`,
        `ISO 21149 i ISO 16212: Referències de microbiologia cosmètica per a bacteris aerobis mesòfils, llevats i floridures quan apliquen.`
      ]),
      section(`De punts crítics aïllats a control hídric multi-planta`, `El programa pot començar per un loop, una línia o un tipus de producte i ampliar-se progressivament cap a un model global.`, [
        `Inventari crític: Classificar tipus d’aigua, punts, equips, línies, productes, laboratoris i responsables.`,
        `Pla de mostreig: Definir freqüència, mètode, volum, criteris, temps de resposta i regles de revisió.`,
        `Custòdia digital: Capturar mostres, context, ubicació, lot, observacions, fotos i cadena de custòdia.`,
        `Reporting i tendències: Emetre CoA, revisar alertes, analitzar tendències i connectar resultats amb decisions.`,
        `Desviacions i escala: Estandarditzar investigació, CAPA, auditoria, multi-planta, clients i revisió periòdica.`
      ]),
      section(`Una implantació enfocada en evidència, adopció i continuïtat operativa`, `AquaVerify es configura per conviure amb laboratori intern, laboratoris externs, LIMS, ERP, procediments de qualitat i models de fabricació subcontractada.`, [
        `Diagnòstic de punts: Selecció de punts crítics, productes, graus d’aigua, equips, responsables i documentació existent.`,
        `Configuració del flux: Usuaris, rols, criteris, formularis, mostres, CoA, alertes, desviacions i accions.`,
        `Pilot operatiu: Validació del flux en una línia, loop, planta, laboratori o categoria de producte abans d’ampliar.`,
        `Escalat controlat: Extensió a més plantes, clients, productes, laboratoris i panells de seguiment.`
      ])
    ],
    faqs: [
      {
        question: `AquaVerify substitueix el sistema GMP o el laboratori acreditat?`,
        answer: `No. AquaVerify organitza mostreig, traçabilitat, resultats, CoA, tendències i desviacions. El sistema de qualitat, la validació de mètodes, els límits i l’abast del laboratori continuen sent responsabilitat de l’organització i dels seus proveïdors qualificats.`
      },
      {
        question: `Pot aplicar-se a aigua purificada i WFI?`,
        answer: `Sí, com a capa de traçabilitat, evidència i revisió per als punts i mètodes definits pel programa de qualitat. El grau d’aigua, els límits i els assajos aplicables s’han de definir segons l’ús, farmacopea, expedient i sistema de qualitat.`
      },
      {
        question: `Serveix per a fabricació cosmètica i personal care?`,
        answer: `Sí. Permet vincular aigua com a ingredient, aigua de procés, neteja, esbandida, lot, fórmula, dipòsit, línia, resultat, CoA i registres per a qualitat, clients, PIF o auditories.`
      },
      {
        question: `On encaixen els colífags somàtics?`,
        answer: `Els colífags somàtics es poden utilitzar com a indicadors virals en plans específics d’aigua, verificació avançada, investigació de contaminació o matrius on client, laboratori o criteri tècnic els requereixi.`
      },
      {
        question: `Pot treballar amb laboratoris externs?`,
        answer: `Sí. La plataforma pot registrar cadena de custòdia, recepció, mètode, resultat, observacions, CoA i revisió, mantenint la traçabilitat entre planta, laboratori i equip de qualitat.`
      },
      {
        question: `Com ajuda davant una desviació?`,
        answer: `Permet comparar historial, punt, lot, equip, operador, mètode, tendència i accions prèvies per decidir remostreig, investigació, sanejament, retenció, alliberament o CAPA amb evidència traçable.`
      }
    ]
  }
};
