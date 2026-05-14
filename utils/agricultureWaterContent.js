function section(title, body, bullets = []) {
  return { title, body, bullets };
}

export const AGRICULTURE_WATER_PAGE = {
  es: {
    path: `/es/industrias/agricultura`,
    title: `Control del agua agrícola para riego seguro, exportación y trazabilidad`,
    description: `AquaVerify ayuda a explotaciones, cooperativas, invernaderos, productores y laboratorios agrícolas a convertir el muestreo del agua en decisiones operativas: puntos georreferenciados, análisis microbiológico, resultados, desviaciones, informes y evidencias por parcela, cultivo y campaña.`,
    eyebrow: `Agricultura · Riego · Trazabilidad del agua`,
    primaryCta: `Solicitar diagnóstico`,
    secondaryCta: `Ver flujo de control`,
    seoTitle: `Gestión de calidad del agua en agricultura | AquaVerify`,
    seoDescription: `Control microbiológico y trazabilidad digital del agua agrícola: riego, aguas regeneradas, hidroponía, fertirrigación, packhouse, auditorías y evidencias por parcela.`,
    sections: [
      section(`Retos`, ``, [
        `Fuentes variables: Pozos, balsas, canales, aguas superficiales, desalinizadas o regeneradas pueden mostrar variaciones microbiológicas entre campañas o incluso entre eventos de riego.`,
        `Cultivos sensibles: Hortalizas, berries, hojas verdes, fruta fresca y cultivos listos para consumo requieren especial atención cuando el agua entra en contacto con la parte comestible.`,
        `Invernadero e hidroponía: Los sistemas cerrados o recirculados necesitan control por punto, tendencia y acción para evitar que una desviación se amplifique en todo el circuito.`,
        `Auditorías y exportación: El comprador no solo pide resultados: pide trazabilidad, criterios, acciones, histórico y capacidad de demostrar control del riesgo hídrico.`
]),
      section(`Flujo`, ``, [
        `Fuente de agua: Pozo, balsa, canal, red, agua regenerada, desalinizada o circuito interno.`,
        `Punto de muestreo: Ubicación, uso del agua, parcela, cultivo, temporada y responsable.`,
        `Plan analítico: Indicadores, frecuencia, matriz, criterio de alerta y método aplicable.`,
        `Ejecución: Muestreo en campo, kit, laboratorio partner o laboratorio interno.`,
        `Resultado: Lectura, revisión, CoA, tendencia, comparación con criterio y alerta.`,
        `Decisión: Liberar, retener, tratar, repetir, investigar origen o documentar acción.`
]),
      section(`Perfiles`, ``, [
        `Ingeniería agronómica: Define riesgos por cultivo, parcela, sistema de riego y etapa fenológica.`,
        `Responsable de riego: Coordina puntos, frecuencia, muestras, tratamientos y decisiones operativas.`,
        `Calidad y exportación: Prepara evidencias para clientes, auditorías y mercados destino.`,
        `Sostenibilidad y agua: Consolida fuentes, reutilización, eficiencia, indicadores y mejora continua.`,
        `Laboratorio y consultoría: Conecta resultados, informes, CoA, observaciones y soporte técnico.`
]),
      section(`Matriz`, ``, [
        `Riego de campo abierto: Variabilidad de la fuente, escorrentías, contaminación aguas arriba y cambios por lluvia o sequía. Mapa de puntos por parcela, histórico por campaña, alertas por desviación y soporte documental para decisiones de riego.`,
        `Invernadero e hidroponía: Recirculación, biofilm, acumulación de carga microbiológica y propagación rápida en circuitos cerrados. Control por circuito, tendencia por punto, registros de tratamiento, resultados y acciones correctivas vinculadas.`,
        `Agua regenerada para riego: Necesidad de plan de riesgo, permisos, requisitos de calidad, coordinación entre productor, operador y usuario final. Cadena de custodia, evidencias por lote de agua, informes, seguimiento de desviaciones y documentación para auditoría.`,
        `Balsas, canales y embalses: Aportes externos, fauna, sedimentos, algas, variación estacional y puntos con distinta exposición. Georreferenciación, muestreo recurrente, comparación por zona y trazabilidad del origen probable de desviaciones.`,
        `Packhouse y lavado de producto: Riesgo de transferencia al producto, exigencia de agua adecuada al uso y necesidad de registros postcosecha. Conexión entre punto de agua, lote, turno, resultado, CoA y evidencia disponible para cliente o entidad auditora.`,
        `Cooperativas y grupos productores: Múltiples fincas, proveedores, criterios distintos y necesidad de una visión común para compradores. Estandarización de puntos, roles, informes y panel de seguimiento para comparar riesgo, cumplimiento operativo y acciones.`
]),
      section(`Módulos`, ``, [
        `Plan de puntos de agua: Fuentes, balsas, pozos, canales, redes, circuitos, parcelas, cultivos, campañas y responsables. Inventario operativo con ubicación, criticidad, frecuencia, histórico y estado por punto.`,
        `Análisis microbiológico: Integración de resultados de laboratorio y kits para indicadores bacterianos y colífagos somáticos cuando el plan analítico lo requiere. Resultados comparables, revisión técnica y trazabilidad desde muestra hasta informe.`,
        `ENUMERA® Soma 100 mL: Enumeración de colífagos somáticos en 100 mL cuando se requiere un indicador viral complementario. Dato cuantitativo para planes de control, reutilización, investigación de contaminación fecal o verificación avanzada.`,
        `PLAQUE Soma e INDICA Soma: Opciones de análisis de colífagos somáticos por placa o presencia/ausencia según matriz, volumen y objetivo del control. Flexibilidad para laboratorio, validación, screening operativo o programas recurrentes.`,
        `AquaVerify App: Registro de muestra, ubicación, usuario, fecha, fotos, observaciones, lote/campaña y cadena de custodia. Menos pérdida de contexto y más consistencia entre campo, laboratorio e informe.`,
        `AquaVerify Cloud y CoA: Gestión de resultados, informes, desviaciones, acciones y documentación por punto o explotación. Evidencia centralizada para cliente, entidad auditora, auditoría interna y revisión de campaña.`
]),
      section(`Casos de uso`, ``, [
        `Riego de frutas y hortalizas: Seguimiento microbiológico por fuente y parcela para cultivos frescos, hojas verdes, berries, cítricos, fruta de hueso y producciones de alto valor.`,
        `Hidroponía e invernaderos: Control de circuitos, recirculación, depósitos, drenajes, nebulización, tratamientos y tendencias que afectan a producción protegida.`,
        `Agua regenerada y reutilización: Registro de permisos, lotes de agua, resultados, desviaciones y evidencias asociadas al plan de gestión del riesgo.`,
        `Packhouse y postcosecha: Vinculación del agua de lavado o enfriamiento con lote, turno, informe, criterio y documentación para cliente.`,
        `Cooperativas y grupos productores: Unificación de criterios, puntos, proveedores, laboratorios e informes para múltiples explotaciones y auditorías.`,
        `Investigación de desviaciones: Comparación de fuentes, zonas, fechas, condiciones y resultados para priorizar repetición, tratamiento o investigación del origen.`
]),
      section(`Hoja de ruta`, ``, [
        `Inventario hídrico: Mapa de fuentes, puntos, usos del agua, cultivos, parcelas y responsables.`,
        `Plan basado en riesgo: Frecuencia, indicadores, criterios, métodos y responsabilidades según cultivo y uso.`,
        `Ejecución trazable: Muestreo, resultados, CoA, desviaciones y acciones conectadas en un flujo único.`,
        `Comparación y tendencia: Lectura por campaña, fuente, parcela, cultivo, proveedor y laboratorio.`,
        `Optimización continua: Ajuste de puntos, tratamientos, frecuencia y decisiones para reducir incertidumbre.`
]),
      section(`Referencias`, ``, [
        `Reglamento (UE) 2020/741: Requisitos mínimos para la reutilización segura del agua en riego agrícola dentro de la Unión Europea.`,
        `Real Decreto 1085/2024: Marco español de reutilización del agua, con gestión del riesgo y usos agrícola, urbano, industrial y otros.`,
        `ISO 5667-1:2023: Guía para diseñar programas de muestreo y técnicas de muestreo de agua.`,
        `ISO 10705-2: Método de detección y enumeración de colífagos somáticos en agua.`,
        `Codex CXG 100-2023 y CXC 53-2003: Orientación sobre uso y reutilización segura del agua en producción alimentaria y frutas y hortalizas frescas.`,
        `GLOBALG.A.P. IFA: Estándar para producción primaria de frutas y hortalizas con trazabilidad, seguridad alimentaria y gestión del agua.`
])
    ],
    faqs: [
    {
        question: `¿AquaVerify sustituye una auditoría o validación agrícola o alimentaria?`,
        answer: `No. AquaVerify aporta trazabilidad, coordinación, resultados y evidencias. La auditoría o validación del plan corresponde a la entidad competente, entidad auditora, cliente o responsable técnico.`
    },
    {
        question: `¿Sirve para agua regenerada utilizada en riego?`,
        answer: `Sí. Puede ayudar a organizar puntos, lotes de agua, resultados, informes, desviaciones y acciones asociadas al plan de gestión del riesgo y a los requisitos aplicables.`
    },
    {
        question: `¿Puede trabajar con laboratorios externos?`,
        answer: `Sí. La plataforma puede conectar muestras, cadena de custodia, resultados, CoA, observaciones, desviaciones y documentación, tanto con laboratorio interno como con laboratorio partner.`
    },
    {
        question: `¿Qué tipos de agua agrícola puede gestionar?`,
        answer: `Pozos, balsas, canales, aguas superficiales, redes, aguas desalinizadas, aguas regeneradas, circuitos de hidroponía, fertirrigación y agua de lavado postcosecha.`
    },
    {
        question: `¿Dónde encajan los colífagos somáticos?`,
        answer: `Pueden utilizarse como indicador viral o fecal complementario cuando el plan analítico, la matriz y el criterio técnico lo justifican, especialmente en programas avanzados o de reutilización.`
    },
    {
        question: `¿Puede organizar datos por parcela, cultivo y campaña?`,
        answer: `Sí. Los puntos pueden relacionarse con parcelas, cultivos, campañas, lotes, productores, turnos, clientes, criterios y documentos.`
    },
    {
        question: `¿Ayuda a preparar auditorías de clientes o auditorías?`,
        answer: `Sí. Centraliza informes, CoA, histórico por punto, acciones correctivas, evidencias de muestreo y documentación para responder con rapidez y consistencia.`
    },
    {
        question: `¿Cómo se inicia un proyecto?`,
        answer: `El primer paso es revisar fuentes de agua, usos, cultivos, puntos críticos, volumen de muestras, laboratorios, requisitos de clientes y decisiones que hoy dependen de esos resultados.`
    }
]
  },
  en: {
    path: `/industries/agriculture-water-management`,
    title: `Agricultural water control for safer irrigation, export readiness and traceability`,
    description: `AquaVerify helps farms, cooperatives, greenhouses, growers and agricultural laboratories turn water sampling into operational decisions: georeferenced points, microbiological analysis, results, deviations, reports and evidence by plot, crop and season.`,
    eyebrow: `Agriculture · Irrigation · Water traceability`,
    primaryCta: `Request assessment`,
    secondaryCta: `View control workflow`,
    seoTitle: `Agricultural water quality management | AquaVerify`,
    seoDescription: `Microbiological control and digital traceability for agricultural water: irrigation, reclaimed water, hydroponics, fertigation, packhouse water, audits and evidence by plot.`,
    sections: [
      section(`Challenges`, ``, [
        `Variable sources: Wells, reservoirs, canals, surface water, desalinated water or reclaimed water can show microbiological variation across seasons or even between irrigation events.`,
        `Sensitive crops: Vegetables, berries, leafy greens, fresh fruit and ready-to-eat crops require special attention when water may contact the edible part.`,
        `Greenhouse and hydroponics: Closed or recirculated systems need control by point, trend and action to prevent a deviation from spreading across the circuit.`,
        `Audits and exports: Buyers ask for more than results: they need traceability, criteria, actions, history and proof of water-risk control.`
]),
      section(`Workflow`, ``, [
        `Water source: Well, reservoir, canal, network, reclaimed water, desalinated water or internal loop.`,
        `Sampling point: Location, water use, plot, crop, season and responsible person.`,
        `Analytical plan: Indicators, frequency, matrix, alert criterion and applicable method.`,
        `Execution: Field sampling, kit, partner laboratory or internal laboratory.`,
        `Result: Reading, review, CoA, trend, criterion comparison and alert.`,
        `Decision: Release, hold, treat, repeat, investigate source or document action.`
]),
      section(`Teams`, ``, [
        `Agronomic engineering: Defines risk by crop, plot, irrigation system and growth stage.`,
        `Irrigation manager: Coordinates points, frequency, samples, treatments and operational decisions.`,
        `Quality and export: Prepares evidence for customers, buyer audits and destination markets.`,
        `Sustainability and water: Consolidates sources, reuse, efficiency, indicators and continuous improvement.`,
        `Laboratory and consulting: Connects results, reports, CoA, observations and technical support.`
]),
      section(`Risk matrix`, ``, [
        `Open-field irrigation: Source variability, runoff, upstream contamination and changes after rainfall or drought. Point map by plot, seasonal history, deviation alerts and documentary support for irrigation decisions.`,
        `Greenhouse and hydroponics: Recirculation, biofilm, accumulation of microbiological load and rapid propagation in closed circuits. Circuit-level control, point trends, treatment records, results and linked corrective actions.`,
        `Reclaimed water for irrigation: Need for risk plan, permits, quality requirements and coordination between producer, operator and end user. Chain of custody, evidence by water lot, reports, deviation follow-up and audit documentation.`,
        `Reservoirs, canals and ponds: External inputs, wildlife, sediments, algae, seasonal variation and points with different exposure. Georeferencing, recurrent sampling, zone comparison and traceability of the likely origin of deviations.`,
        `Packhouse and produce washing: Risk of transfer to produce, fit-for-purpose water and postharvest record requirements. Connection between water point, lot, shift, result, CoA and evidence available for customer or audit body.`,
        `Cooperatives and grower groups: Multiple farms, providers, different criteria and the need for one common view for buyers. Standardized points, roles, reports and dashboard to compare risk, operational compliance and actions.`
]),
      section(`AquaVerify modules`, ``, [
        `Water point plan: Sources, reservoirs, wells, canals, networks, circuits, plots, crops, seasons and owners. Operational inventory with location, criticality, frequency, history and status by point.`,
        `Microbiological analysis: Integration of laboratory results and kits for bacterial indicators and somatic coliphages when required by the analytical plan. Comparable results, technical review and traceability from sample to report.`,
        `ENUMERA® Soma 100 mL: Enumeration of somatic coliphages in 100 mL when a complementary viral indicator is required. Quantitative data for control plans, reuse, fecal-contamination investigation or advanced verification.`,
        `PLAQUE Soma and INDICA Soma: Somatic coliphage analysis options by plate or presence/absence depending on matrix, volume and control objective. Flexibility for laboratory work, validation, operational screening or recurrent programmes.`,
        `AquaVerify App: Sample registration, location, user, date, photos, observations, lot or season and chain of custody. Less context loss and more consistency between field, laboratory and report.`,
        `AquaVerify Cloud and CoA: Management of results, reports, deviations, actions and documentation by point or farm. Centralized evidence for customers, audit bodies, internal audits and seasonal review.`
]),
      section(`Use cases`, ``, [
        `Fruit and vegetable irrigation: Microbiological follow-up by source and plot for fresh crops, leafy greens, berries, citrus, stone fruit and high-value production.`,
        `Hydroponics and greenhouses: Control of circuits, recirculation, tanks, drainage, misting, treatments and trends that affect protected production.`,
        `Reclaimed water and reuse: Records for permits, water lots, results, deviations and evidence associated with the risk-management plan.`,
        `Packhouse and postharvest: Linking washing or cooling water to lot, shift, report, criterion and customer documentation.`,
        `Cooperatives and grower groups: Unified criteria, points, providers, laboratories and reports across multiple farms and customer audits.`,
        `Deviation investigation: Comparison of sources, zones, dates, conditions and results to prioritize repeat sampling, treatment or source investigation.`
]),
      section(`Roadmap`, ``, [
        `Water inventory: Map of sources, points, water uses, crops, plots and owners.`,
        `Risk-based plan: Frequency, indicators, criteria, methods and responsibilities by crop and use.`,
        `Traceable execution: Sampling, results, CoA, deviations and actions connected in one workflow.`,
        `Comparison and trend: Reading by season, source, plot, crop, provider and laboratory.`,
        `Continuous optimization: Adjustment of points, treatments, frequency and decisions to reduce uncertainty.`
]),
      section(`References`, ``, [
        `Regulation (EU) 2020/741: Minimum requirements for the safe reuse of water for agricultural irrigation in the European Union.`,
        `Royal Decree 1085/2024: Spanish water-reuse framework covering risk management and agricultural, urban, industrial and other uses.`,
        `ISO 5667-1:2023: Guidance for the design of water sampling programmes and sampling techniques.`,
        `ISO 10705-2: Detection and enumeration method for somatic coliphages in water.`,
        `Codex CXG 100-2023 and CXC 53-2003: Guidance on safe water use and reuse in food production and fresh fruit and vegetables.`,
        `GLOBALG.A.P. IFA: Primary production standard for fruit and vegetables covering traceability, food safety and water management.`
])
    ],
    faqs: [
    {
        question: `Does AquaVerify replace an agricultural or food audit or validation?`,
        answer: `No. AquaVerify provides traceability, coordination, results and evidence. Audit or plan validation remains with the competent body, audit body, customer or technical owner.`
    },
    {
        question: `Can it be used for reclaimed water in irrigation?`,
        answer: `Yes. It can help organize points, water lots, results, reports, deviations and actions linked to the risk-management plan and applicable requirements.`
    },
    {
        question: `Can it work with external laboratories?`,
        answer: `Yes. The platform can connect samples, chain of custody, results, CoA, observations, deviations and documentation with either an internal laboratory or a partner laboratory.`
    },
    {
        question: `What types of agricultural water can it manage?`,
        answer: `Wells, reservoirs, canals, surface water, networks, desalinated water, reclaimed water, hydroponic circuits, fertigation and postharvest washing water.`
    },
    {
        question: `Where do somatic coliphages fit?`,
        answer: `They can be used as a complementary viral or fecal indicator when the analytical plan, matrix and technical criterion justify it, especially in advanced or reuse programmes.`
    },
    {
        question: `Can it organize data by plot, crop and season?`,
        answer: `Yes. Points can be related to plots, crops, seasons, lots, growers, shifts, customers, criteria and documents.`
    },
    {
        question: `Does it help prepare customer audits?`,
        answer: `Yes. It centralizes reports, CoA, point history, corrective actions, sampling evidence and documentation for fast and consistent responses.`
    },
    {
        question: `How does a project start?`,
        answer: `The first step is to review water sources, uses, crops, critical points, sample volumes, laboratories, customer requirements and the decisions that currently depend on those results.`
    }
]
  },
  fr: {
    path: `/fr/industries/eau-agriculture`,
    title: `Contrôle de l’eau agricole pour une irrigation plus sûre, l’exportation et la traçabilité`,
    description: `AquaVerify aide les exploitations, coopératives, serres, producteurs et laboratoires agricoles à transformer l’échantillonnage de l’eau en décisions opérationnelles : points géoréférencés, analyses microbiologiques, résultats, écarts, rapports et preuves par parcelle, culture et campagne.`,
    eyebrow: `Agriculture · Irrigation · Traçabilité eau`,
    primaryCta: `Demander une évaluation`,
    secondaryCta: `Voir le flux de contrôle`,
    seoTitle: `Gestion de la qualité de l’eau en agriculture | AquaVerify`,
    seoDescription: `Contrôle microbiologique et traçabilité numérique de l’eau agricole : irrigation, eau régénérée, hydroponie, fertigation, station de conditionnement, audits et preuves par parcelle.`,
    sections: [
      section(`Défis`, ``, [
        `Sources variables: Puits, bassins, canaux, eaux de surface, eaux dessalées ou régénérées peuvent présenter des variations microbiologiques entre campagnes ou même entre événements d’irrigation.`,
        `Cultures sensibles: Légumes, baies, feuilles vertes, fruits frais et cultures prêtes à consommer exigent une attention particulière lorsque l’eau peut toucher la partie comestible.`,
        `Serre et hydroponie: Les systèmes fermés ou recirculés nécessitent un contrôle par point, tendance et action afin d’éviter qu’un écart ne se propage dans tout le circuit.`,
        `Audits et exportation: L’acheteur ne demande pas seulement des résultats : il demande traçabilité, critères, actions, historique et preuve de maîtrise du risque hydrique.`
]),
      section(`Flux`, ``, [
        `Source d’eau: Puits, bassin, canal, réseau, eau régénérée, eau dessalée ou boucle interne.`,
        `Point d’échantillonnage: Localisation, usage de l’eau, parcelle, culture, saison et responsable.`,
        `Plan analytique: Indicateurs, fréquence, matrice, critère d’alerte et méthode applicable.`,
        `Exécution: Échantillonnage terrain, kit, laboratoire partenaire ou laboratoire interne.`,
        `Résultat: Lecture, revue, CoA, tendance, comparaison au critère et alerte.`,
        `Décision: Libérer, retenir, traiter, répéter, rechercher l’origine ou documenter l’action.`
]),
      section(`Équipes`, ``, [
        `Ingénierie agronomique: Définit le risque par culture, parcelle, système d’irrigation et stade de développement.`,
        `Responsable irrigation: Coordonne points, fréquence, échantillons, traitements et décisions opérationnelles.`,
        `Qualité et export: Prépare les preuves pour les clients, les audits d’acheteurs et les marchés de destination.`,
        `Durabilité et eau: Consolide sources, réutilisation, efficacité, indicateurs et amélioration continue.`,
        `Laboratoire et conseil: Relie résultats, rapports, CoA, observations et support technique.`
]),
      section(`Matrice`, ``, [
        `Irrigation en plein champ: Variabilité de la source, ruissellement, contamination en amont et changements après pluie ou sécheresse. Cartographie des points par parcelle, historique de campagne, alertes d’écart et support documentaire pour les décisions d’irrigation.`,
        `Serre et hydroponie: Recirculation, biofilm, accumulation de charge microbiologique et propagation rapide dans les circuits fermés. Contrôle par circuit, tendances par point, registres de traitement, résultats et actions correctives liées.`,
        `Eau régénérée pour l’irrigation: Besoin de plan de risque, permis, exigences de qualité et coordination entre producteur, opérateur et utilisateur final. Chaîne de garde, preuves par lot d’eau, rapports, suivi des écarts et documentation pour audit.`,
        `Bassins, canaux et retenues: Apports externes, faune, sédiments, algues, variation saisonnière et points exposés différemment. Géoréférencement, échantillonnage récurrent, comparaison par zone et traçabilité de l’origine probable des écarts.`,
        `Station de conditionnement et lavage: Risque de transfert au produit, eau adaptée à l’usage et exigences d’enregistrements post-récolte. Lien entre point d’eau, lot, équipe, résultat, CoA et preuve disponible pour client ou organisme d’audit.`,
        `Coopératives et groupes de producteurs: Plusieurs exploitations, prestataires, critères différents et besoin d’une vision commune pour les acheteurs. Standardisation des points, rôles, rapports et tableau de suivi pour comparer risque, conformité opérationnelle et actions.`
]),
      section(`Modules`, ``, [
        `Plan des points d’eau: Sources, bassins, puits, canaux, réseaux, circuits, parcelles, cultures, campagnes et responsables. Inventaire opérationnel avec localisation, criticité, fréquence, historique et statut par point.`,
        `Analyse microbiologique: Intégration des résultats de laboratoire et des kits pour indicateurs bactériens et coliphages somatiques lorsque le plan analytique l’exige. Résultats comparables, revue technique et traçabilité de l’échantillon au rapport.`,
        `ENUMERA® Soma 100 mL: Énumération des coliphages somatiques dans 100 mL lorsqu’un indicateur viral complémentaire est requis. Donnée quantitative pour plans de contrôle, réutilisation, recherche de contamination fécale ou vérification avancée.`,
        `PLAQUE Soma et INDICA Soma: Options d’analyse des coliphages somatiques par plaque ou présence/absence selon matrice, volume et objectif du contrôle. Flexibilité pour laboratoire, validation, screening opérationnel ou programmes récurrents.`,
        `AquaVerify App: Enregistrement de l’échantillon, localisation, utilisateur, date, photos, observations, lot ou campagne et chaîne de garde. Moins de perte de contexte et plus de cohérence entre terrain, laboratoire et rapport.`,
        `AquaVerify Cloud et CoA: Gestion des résultats, rapports, écarts, actions et documentation par point ou exploitation. Preuve centralisée pour client, organisme d’audit, audit interne et revue de campagne.`
]),
      section(`Cas d’usage`, ``, [
        `Irrigation fruits et légumes: Suivi microbiologique par source et parcelle pour cultures fraîches, feuilles vertes, baies, agrumes, fruits à noyau et productions à haute valeur.`,
        `Hydroponie et serres: Contrôle des circuits, recirculation, réservoirs, drainages, brumisation, traitements et tendances qui influencent la production protégée.`,
        `Eau régénérée et réutilisation: Enregistrement des permis, lots d’eau, résultats, écarts et preuves associés au plan de gestion du risque.`,
        `Conditionnement et post-récolte: Lien entre eau de lavage ou de refroidissement, lot, équipe, rapport, critère et documentation client.`,
        `Coopératives et groupes: Unification des critères, points, prestataires, laboratoires et rapports pour plusieurs exploitations et audits clients.`,
        `Investigation des écarts: Comparaison des sources, zones, dates, conditions et résultats afin de prioriser répétition, traitement ou recherche d’origine.`
]),
      section(`Feuille de route`, ``, [
        `Inventaire hydrique: Carte des sources, points, usages de l’eau, cultures, parcelles et responsables.`,
        `Plan fondé sur le risque: Fréquence, indicateurs, critères, méthodes et responsabilités selon culture et usage.`,
        `Exécution traçable: Échantillonnage, résultats, CoA, écarts et actions connectés dans un flux unique.`,
        `Comparaison et tendance: Lecture par campagne, source, parcelle, culture, prestataire et laboratoire.`,
        `Optimisation continue: Ajustement des points, traitements, fréquences et décisions pour réduire l’incertitude.`
]),
      section(`Références`, ``, [
        `Règlement (UE) 2020/741: Exigences minimales pour la réutilisation sûre de l’eau pour l’irrigation agricole dans l’Union européenne.`,
        `Décret royal 1085/2024: Cadre espagnol de réutilisation de l’eau avec gestion du risque et usages agricoles, urbains, industriels et autres.`,
        `ISO 5667-1:2023: Guide pour concevoir des programmes et techniques d’échantillonnage de l’eau.`,
        `ISO 10705-2: Méthode de détection et d’énumération des coliphages somatiques dans l’eau.`,
        `Codex CXG 100-2023 et CXC 53-2003: Orientations sur l’usage et la réutilisation sûrs de l’eau en production alimentaire et fruits et légumes frais.`,
        `GLOBALG.A.P. IFA: Standard de production primaire pour fruits et légumes couvrant traçabilité, sécurité alimentaire et gestion de l’eau.`
])
    ],
    faqs: [
    {
        question: `AquaVerify remplace-t-il un audit ou une validation agricole ou alimentaire ?`,
        answer: `Non. AquaVerify apporte traçabilité, coordination, résultats et preuves. L’audit ou la validation du plan relève de l’organisme compétent, de l’organisme d’audit, du client ou du responsable technique.`
    },
    {
        question: `Peut-il être utilisé pour l’eau régénérée en irrigation ?`,
        answer: `Oui. Il peut aider à organiser points, lots d’eau, résultats, rapports, écarts et actions liés au plan de gestion du risque et aux exigences applicables.`
    },
    {
        question: `Peut-il fonctionner avec des laboratoires externes ?`,
        answer: `Oui. La plateforme peut relier échantillons, chaîne de garde, résultats, CoA, observations, écarts et documentation avec un laboratoire interne ou partenaire.`
    },
    {
        question: `Quels types d’eau agricole peut-il gérer ?`,
        answer: `Puits, bassins, canaux, eaux de surface, réseaux, eaux dessalées, eaux régénérées, circuits hydroponiques, fertigation et eau de lavage post-récolte.`
    },
    {
        question: `Où s’intègrent les coliphages somatiques ?`,
        answer: `Ils peuvent servir d’indicateur viral ou fécal complémentaire lorsque le plan analytique, la matrice et le critère technique le justifient, notamment dans les programmes avancés ou de réutilisation.`
    },
    {
        question: `Les données peuvent-elles être organisées par parcelle, culture et campagne ?`,
        answer: `Oui. Les points peuvent être reliés aux parcelles, cultures, campagnes, lots, producteurs, équipes, clients, critères et documents.`
    },
    {
        question: `Aide-t-il à préparer les audits clients ?`,
        answer: `Oui. Il centralise rapports, CoA, historique par point, actions correctives, preuves d’échantillonnage et documentation pour répondre rapidement et de façon cohérente.`
    },
    {
        question: `Comment démarre un projet ?`,
        answer: `La première étape consiste à examiner sources d’eau, usages, cultures, points critiques, volumes d’échantillons, laboratoires, exigences clients et décisions dépendant aujourd’hui de ces résultats.`
    }
]
  },
  it: {
    path: `/it/settori/acqua-agricoltura`,
    title: `Controllo dell’acqua agricola per irrigazione sicura, export e tracciabilità`,
    description: `AquaVerify aiuta aziende agricole, cooperative, serre, produttori e laboratori agricoli a trasformare il campionamento dell’acqua in decisioni operative: punti georeferenziati, analisi microbiologiche, risultati, deviazioni, report ed evidenze per appezzamento, coltura e campagna.`,
    eyebrow: `Agricoltura · Irrigazione · Tracciabilità acqua`,
    primaryCta: `Richiedi valutazione`,
    secondaryCta: `Vedi flusso di controllo`,
    seoTitle: `Gestione della qualità dell’acqua in agricoltura | AquaVerify`,
    seoDescription: `Controllo microbiologico e tracciabilità digitale dell’acqua agricola: irrigazione, acque rigenerate, idroponica, fertirrigazione, packhouse, audit ed evidenze per appezzamento.`,
    sections: [
      section(`Sfide`, ``, [
        `Fonti variabili: Pozzi, vasche, canali, acque superficiali, dissalate o rigenerate possono mostrare variazioni microbiologiche tra campagne o anche tra eventi di irrigazione.`,
        `Colture sensibili: Ortaggi, berries, foglie verdi, frutta fresca e colture pronte al consumo richiedono attenzione quando l’acqua può entrare in contatto con la parte edibile.`,
        `Serra e idroponica: I sistemi chiusi o ricircolati richiedono controllo per punto, trend e azione per evitare che una deviazione si diffonda nel circuito.`,
        `Audit ed export: Il buyer non chiede solo risultati: richiede tracciabilità, criteri, azioni, storico e prova del controllo del rischio idrico.`
]),
      section(`Flusso`, ``, [
        `Fonte d’acqua: Pozzo, vasca, canale, rete, acqua rigenerata, acqua dissalata o circuito interno.`,
        `Punto di campionamento: Localizzazione, uso dell’acqua, appezzamento, coltura, stagione e responsabile.`,
        `Piano analitico: Indicatori, frequenza, matrice, criterio di allerta e metodo applicabile.`,
        `Esecuzione: Campionamento in campo, kit, laboratorio partner o laboratorio interno.`,
        `Risultato: Lettura, revisione, CoA, trend, confronto con criterio e allerta.`,
        `Decisione: Rilasciare, trattenere, trattare, ripetere, indagare l’origine o documentare l’azione.`
]),
      section(`Team`, ``, [
        `Ingegneria agronomica: Definisce il rischio per coltura, appezzamento, sistema di irrigazione e fase fenologica.`,
        `Responsabile irrigazione: Coordina punti, frequenza, campioni, trattamenti e decisioni operative.`,
        `Qualità ed export: Prepara evidenze per clienti, audit e mercati di destinazione.`,
        `Sostenibilità e acqua: Consolida fonti, riuso, efficienza, indicatori e miglioramento continuo.`,
        `Laboratorio e consulenza: Collega risultati, report, CoA, osservazioni e supporto tecnico.`
]),
      section(`Matrice`, ``, [
        `Irrigazione in campo aperto: Variabilità della fonte, ruscellamento, contaminazione a monte e variazioni dopo pioggia o siccità. Mappa dei punti per appezzamento, storico di campagna, alert di deviazione e supporto documentale per decisioni di irrigazione.`,
        `Serra e idroponica: Ricircolo, biofilm, accumulo di carica microbiologica e propagazione rapida nei circuiti chiusi. Controllo per circuito, trend per punto, registri di trattamento, risultati e azioni correttive collegate.`,
        `Acqua rigenerata per irrigazione: Necessità di piano di rischio, permessi, requisiti di qualità e coordinamento tra produttore, operatore e utilizzatore finale. Catena di custodia, evidenze per lotto d’acqua, report, follow-up delle deviazioni e documentazione per audit.`,
        `Vasche, canali e bacini: Apporti esterni, fauna, sedimenti, alghe, variazione stagionale e punti con esposizione diversa. Georeferenziazione, campionamento ricorrente, confronto per zona e tracciabilità della probabile origine delle deviazioni.`,
        `Packhouse e lavaggio prodotto: Rischio di trasferimento al prodotto, acqua adeguata all’uso e necessità di registri post-raccolta. Connessione tra punto acqua, lotto, turno, risultato, CoA ed evidenza disponibile per cliente o ente di audit.`,
        `Cooperative e gruppi produttori: Molteplici aziende, fornitori, criteri diversi e bisogno di una vista comune per i buyer. Standardizzazione di punti, ruoli, report e pannello di monitoraggio per confrontare rischio, conformità operativa e azioni.`
]),
      section(`Moduli`, ``, [
        `Piano dei punti acqua: Fonti, vasche, pozzi, canali, reti, circuiti, appezzamenti, colture, campagne e responsabili. Inventario operativo con localizzazione, criticità, frequenza, storico e stato per punto.`,
        `Analisi microbiologica: Integrazione di risultati di laboratorio e kit per indicatori batterici e colifagi somatici quando il piano analitico lo richiede. Risultati confrontabili, revisione tecnica e tracciabilità dal campione al report.`,
        `ENUMERA® Soma 100 mL: Enumerazione dei colifagi somatici in 100 mL quando è richiesto un indicatore virale complementare. Dato quantitativo per piani di controllo, riuso, indagine di contaminazione fecale o verifica avanzata.`,
        `PLAQUE Soma e INDICA Soma: Opzioni di analisi dei colifagi somatici su piastra o presenza/assenza secondo matrice, volume e obiettivo del controllo. Flessibilità per laboratorio, validazione, screening operativo o programmi ricorrenti.`,
        `AquaVerify App: Registrazione campione, posizione, utente, data, foto, osservazioni, lotto o campagna e catena di custodia. Meno perdita di contesto e maggiore coerenza tra campo, laboratorio e report.`,
        `AquaVerify Cloud e CoA: Gestione di risultati, report, deviazioni, azioni e documentazione per punto o azienda. Evidenza centralizzata per cliente, ente di audit, audit interno e revisione di campagna.`
]),
      section(`Casi d’uso`, ``, [
        `Irrigazione di frutta e ortaggi: Monitoraggio microbiologico per fonte e appezzamento per colture fresche, foglie verdi, berries, agrumi, drupacee e produzioni ad alto valore.`,
        `Idroponica e serre: Controllo di circuiti, ricircolo, serbatoi, drenaggi, nebulizzazione, trattamenti e trend che influenzano la produzione protetta.`,
        `Acqua rigenerata e riuso: Registrazione di permessi, lotti d’acqua, risultati, deviazioni ed evidenze associate al piano di gestione del rischio.`,
        `Packhouse e post-raccolta: Collegamento dell’acqua di lavaggio o raffreddamento a lotto, turno, report, criterio e documentazione cliente.`,
        `Cooperative e gruppi: Unificazione di criteri, punti, fornitori, laboratori e report per più aziende e audit.`,
        `Indagine deviazioni: Confronto di fonti, zone, date, condizioni e risultati per priorizzare ripetizione, trattamento o indagine dell’origine.`
]),
      section(`Roadmap`, ``, [
        `Inventario idrico: Mappa di fonti, punti, usi dell’acqua, colture, appezzamenti e responsabili.`,
        `Piano basato sul rischio: Frequenza, indicatori, criteri, metodi e responsabilità secondo coltura e uso.`,
        `Esecuzione tracciabile: Campionamento, risultati, CoA, deviazioni e azioni connessi in un unico flusso.`,
        `Confronto e trend: Lettura per campagna, fonte, appezzamento, coltura, fornitore e laboratorio.`,
        `Ottimizzazione continua: Adeguamento di punti, trattamenti, frequenza e decisioni per ridurre l’incertezza.`
]),
      section(`Riferimenti`, ``, [
        `Regolamento (UE) 2020/741: Requisiti minimi per il riutilizzo sicuro dell’acqua per l’irrigazione agricola nell’Unione europea.`,
        `Regio decreto 1085/2024: Quadro spagnolo per il riuso dell’acqua con gestione del rischio e usi agricoli, urbani, industriali e altri.`,
        `ISO 5667-1:2023: Guida per progettare programmi e tecniche di campionamento dell’acqua.`,
        `ISO 10705-2: Metodo di rilevazione ed enumerazione dei colifagi somatici nell’acqua.`,
        `Codex CXG 100-2023 e CXC 53-2003: Indicazioni sull’uso e riuso sicuro dell’acqua nella produzione alimentare e in frutta e ortaggi freschi.`,
        `GLOBALG.A.P. IFA: Standard di produzione primaria per frutta e ortaggi con tracciabilità, sicurezza alimentare e gestione dell’acqua.`
])
    ],
    faqs: [
    {
        question: `AquaVerify sostituisce un audit o una validazione agricola o alimentare?`,
        answer: `No. AquaVerify fornisce tracciabilità, coordinamento, risultati ed evidenze. L’audit o la validazione del piano restano in capo all’ente competente, all’ente di audit, al cliente o al responsabile tecnico.`
    },
    {
        question: `È adatto per acqua rigenerata usata in irrigazione?`,
        answer: `Sì. Può aiutare a organizzare punti, lotti d’acqua, risultati, report, deviazioni e azioni associati al piano di gestione del rischio e ai requisiti applicabili.`
    },
    {
        question: `Può lavorare con laboratori esterni?`,
        answer: `Sì. La piattaforma può collegare campioni, catena di custodia, risultati, CoA, osservazioni, deviazioni e documentazione con laboratorio interno o partner.`
    },
    {
        question: `Quali tipi di acqua agricola può gestire?`,
        answer: `Pozzi, vasche, canali, acque superficiali, reti, acque dissalate, acque rigenerate, circuiti idroponici, fertirrigazione e acqua di lavaggio post-raccolta.`
    },
    {
        question: `Dove rientrano i colifagi somatici?`,
        answer: `Possono essere usati come indicatore virale o fecale complementare quando piano analitico, matrice e criterio tecnico lo giustificano, soprattutto in programmi avanzati o di riuso.`
    },
    {
        question: `Può organizzare dati per appezzamento, coltura e campagna?`,
        answer: `Sì. I punti possono essere collegati ad appezzamenti, colture, campagne, lotti, produttori, turni, clienti, criteri e documenti.`
    },
    {
        question: `Aiuta a preparare audit cliente?`,
        answer: `Sì. Centralizza report, CoA, storico per punto, azioni correttive, evidenze di campionamento e documentazione per risposte rapide e coerenti.`
    },
    {
        question: `Come si avvia un progetto?`,
        answer: `Il primo passo è rivedere fonti d’acqua, usi, colture, punti critici, volumi di campioni, laboratori, requisiti cliente e decisioni che oggi dipendono da quei risultati.`
    }
]
  },
  ca: {
    path: `/ca/sectors/aigua-agricultura`,
    title: `Control de l’aigua agrícola per a reg segur, exportació i traçabilitat`,
    description: `AquaVerify ajuda explotacions, cooperatives, hivernacles, productors i laboratoris agrícoles a convertir el mostreig de l’aigua en decisions operatives: punts georeferenciats, anàlisi microbiològica, resultats, desviacions, informes i evidències per parcel·la, cultiu i campanya.`,
    eyebrow: `Agricultura · Reg · Traçabilitat de l’aigua`,
    primaryCta: `Sol·licitar diagnòstic`,
    secondaryCta: `Veure flux de control`,
    seoTitle: `Gestió de la qualitat de l’aigua en agricultura | AquaVerify`,
    seoDescription: `Control microbiològic i traçabilitat digital de l’aigua agrícola: reg, aigua regenerada, hidroponia, fertirrigació, packhouse, auditories i evidències per parcel·la.`,
    sections: [
      section(`Reptes`, ``, [
        `Fonts variables: Pous, basses, canals, aigües superficials, dessalades o regenerades poden mostrar variacions microbiològiques entre campanyes o fins i tot entre regs.`,
        `Cultius sensibles: Hortalisses, berries, fulles verdes, fruita fresca i cultius llestos per al consum requereixen atenció quan l’aigua pot contactar amb la part comestible.`,
        `Hivernacle i hidroponia: Els sistemes tancats o recirculats necessiten control per punt, tendència i acció per evitar que una desviació s’amplifiqui en tot el circuit.`,
        `Auditories i exportació: El comprador no només demana resultats: demana traçabilitat, criteris, accions, històric i prova del control del risc hídric.`
]),
      section(`Flux`, ``, [
        `Font d’aigua: Pou, bassa, canal, xarxa, aigua regenerada, aigua dessalada o circuit intern.`,
        `Punt de mostreig: Ubicació, ús de l’aigua, parcel·la, cultiu, temporada i responsable.`,
        `Pla analític: Indicadors, freqüència, matriu, criteri d’alerta i mètode aplicable.`,
        `Execució: Mostreig a camp, kit, laboratori partner o laboratori intern.`,
        `Resultat: Lectura, revisió, CoA, tendència, comparació amb criteri i alerta.`,
        `Decisió: Alliberar, retenir, tractar, repetir, investigar l’origen o documentar l’acció.`
]),
      section(`Equips`, ``, [
        `Enginyeria agronòmica: Defineix riscos per cultiu, parcel·la, sistema de reg i etapa fenològica.`,
        `Responsable de reg: Coordina punts, freqüència, mostres, tractaments i decisions operatives.`,
        `Qualitat i exportació: Prepara evidències per a clients, auditories de comprador i mercats de destí.`,
        `Sostenibilitat i aigua: Consolida fonts, reutilització, eficiència, indicadors i millora contínua.`,
        `Laboratori i consultoria: Connecta resultats, informes, CoA, observacions i suport tècnic.`
]),
      section(`Matriu`, ``, [
        `Reg a camp obert: Variabilitat de la font, escorrenties, contaminació aigües amunt i canvis per pluja o sequera. Mapa de punts per parcel·la, històric per campanya, alertes per desviació i suport documental per a decisions de reg.`,
        `Hivernacle i hidroponia: Recirculació, biofilm, acumulació de càrrega microbiològica i propagació ràpida en circuits tancats. Control per circuit, tendència per punt, registres de tractament, resultats i accions correctives vinculades.`,
        `Aigua regenerada per a reg: Necessitat de pla de risc, permisos, requisits de qualitat i coordinació entre productor, operador i usuari final. Cadena de custòdia, evidències per lot d’aigua, informes, seguiment de desviacions i documentació per a auditoria.`,
        `Basses, canals i embassaments: Aports externs, fauna, sediments, algues, variació estacional i punts amb exposició diferent. Georeferenciació, mostreig recurrent, comparació per zona i traçabilitat de l’origen probable de desviacions.`,
        `Packhouse i rentat de producte: Risc de transferència al producte, aigua adequada a l’ús i necessitat de registres postcollita. Connexió entre punt d’aigua, lot, torn, resultat, CoA i evidència disponible per a client o entitat auditora.`,
        `Cooperatives i grups productors: Múltiples finques, proveïdors, criteris diferents i necessitat d’una visió comuna per a compradors. Estandardització de punts, rols, informes i panell de seguiment per comparar risc, compliment operatiu i accions.`
]),
      section(`Mòduls`, ``, [
        `Pla de punts d’aigua: Fonts, basses, pous, canals, xarxes, circuits, parcel·les, cultius, campanyes i responsables. Inventari operatiu amb ubicació, criticitat, freqüència, històric i estat per punt.`,
        `Anàlisi microbiològica: Integració de resultats de laboratori i kits per a indicadors bacterians i colífags somàtics quan el pla analític ho requereix. Resultats comparables, revisió tècnica i traçabilitat des de mostra fins a informe.`,
        `ENUMERA® Soma 100 mL: Enumeració de colífags somàtics en 100 mL quan es requereix un indicador viral complementari. Dada quantitativa per a plans de control, reutilització, investigació de contaminació fecal o verificació avançada.`,
        `PLAQUE Soma i INDICA Soma: Opcions d’anàlisi de colífags somàtics per placa o presència/absència segons matriu, volum i objectiu del control. Flexibilitat per a laboratori, validació, cribratge operatiu o programes recurrents.`,
        `AquaVerify App: Registre de mostra, ubicació, usuari, data, fotos, observacions, lot o campanya i cadena de custòdia. Menys pèrdua de context i més consistència entre camp, laboratori i informe.`,
        `AquaVerify Cloud i CoA: Gestió de resultats, informes, desviacions, accions i documentació per punt o explotació. Evidència centralitzada per a client, entitat auditora, auditoria interna i revisió de campanya.`
]),
      section(`Casos d’ús`, ``, [
        `Reg de fruites i hortalisses: Seguiment microbiològic per font i parcel·la per a cultius frescos, fulles verdes, berries, cítrics, fruita de pinyol i produccions d’alt valor.`,
        `Hidroponia i hivernacles: Control de circuits, recirculació, dipòsits, drenatges, nebulització, tractaments i tendències que afecten la producció protegida.`,
        `Aigua regenerada i reutilització: Registre de permisos, lots d’aigua, resultats, desviacions i evidències associades al pla de gestió del risc.`,
        `Packhouse i postcollita: Vinculació de l’aigua de rentat o refredament amb lot, torn, informe, criteri i documentació per a client.`,
        `Cooperatives i grups productors: Unificació de criteris, punts, proveïdors, laboratoris i informes per a múltiples explotacions i auditories.`,
        `Investigació de desviacions: Comparació de fonts, zones, dates, condicions i resultats per prioritzar repetició, tractament o investigació de l’origen.`
]),
      section(`Full de ruta`, ``, [
        `Inventari hídric: Mapa de fonts, punts, usos de l’aigua, cultius, parcel·les i responsables.`,
        `Pla basat en risc: Freqüència, indicadors, criteris, mètodes i responsabilitats segons cultiu i ús.`,
        `Execució traçable: Mostreig, resultats, CoA, desviacions i accions connectades en un únic flux.`,
        `Comparació i tendència: Lectura per campanya, font, parcel·la, cultiu, proveïdor i laboratori.`,
        `Optimització contínua: Ajust de punts, tractaments, freqüència i decisions per reduir incertesa.`
]),
      section(`Referències`, ``, [
        `Reglament (UE) 2020/741: Requisits mínims per a la reutilització segura de l’aigua en reg agrícola dins la Unió Europea.`,
        `Reial decret 1085/2024: Marc espanyol de reutilització de l’aigua, amb gestió del risc i usos agrícola, urbà, industrial i altres.`,
        `ISO 5667-1:2023: Guia per dissenyar programes de mostreig i tècniques de mostreig d’aigua.`,
        `ISO 10705-2: Mètode de detecció i enumeració de colífags somàtics en aigua.`,
        `Codex CXG 100-2023 i CXC 53-2003: Orientació sobre ús i reutilització segura de l’aigua en producció alimentària i fruites i hortalisses fresques.`,
        `GLOBALG.A.P. IFA: Estàndard per a producció primària de fruites i hortalisses amb traçabilitat, seguretat alimentària i gestió de l’aigua.`
])
    ],
    faqs: [
    {
        question: `AquaVerify substitueix una auditoria o validació agrícola o alimentària?`,
        answer: `No. AquaVerify aporta traçabilitat, coordinació, resultats i evidències. L’auditoria o validació del pla correspon a l’entitat competent, entitat auditora, client o responsable tècnic.`
    },
    {
        question: `Serveix per a aigua regenerada utilitzada en reg?`,
        answer: `Sí. Pot ajudar a organitzar punts, lots d’aigua, resultats, informes, desviacions i accions associades al pla de gestió del risc i als requisits aplicables.`
    },
    {
        question: `Pot treballar amb laboratoris externs?`,
        answer: `Sí. La plataforma pot connectar mostres, cadena de custòdia, resultats, CoA, observacions, desviacions i documentació, tant amb laboratori intern com partner.`
    },
    {
        question: `Quins tipus d’aigua agrícola pot gestionar?`,
        answer: `Pous, basses, canals, aigües superficials, xarxes, aigües dessalades, aigües regenerades, circuits d’hidroponia, fertirrigació i aigua de rentat postcollita.`
    },
    {
        question: `On encaixen els colífags somàtics?`,
        answer: `Poden utilitzar-se com a indicador viral o fecal complementari quan el pla analític, la matriu i el criteri tècnic ho justifiquen, especialment en programes avançats o de reutilització.`
    },
    {
        question: `Pot organitzar dades per parcel·la, cultiu i campanya?`,
        answer: `Sí. Els punts poden relacionar-se amb parcel·les, cultius, campanyes, lots, productors, torns, clients, criteris i documents.`
    },
    {
        question: `Ajuda a preparar auditories de clients?`,
        answer: `Sí. Centralitza informes, CoA, històric per punt, accions correctives, evidències de mostreig i documentació per respondre amb rapidesa i consistència.`
    },
    {
        question: `Com s’inicia un projecte?`,
        answer: `El primer pas és revisar fonts d’aigua, usos, cultius, punts crítics, volum de mostres, laboratoris, requisits de clients i decisions que avui depenen d’aquests resultats.`
    }
]
  }
};
