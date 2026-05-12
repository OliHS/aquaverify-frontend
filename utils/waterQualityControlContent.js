const ASSET_BASE = '/images/industries/water-quality-control';

const INFOGRAPHICS = {
  sampleToReport: `${ASSET_BASE}/sample-to-report.png`,
  sectorRiskSolution: `${ASSET_BASE}/sector-risk-solution.png`,
  maturity: `${ASSET_BASE}/water-control-maturity.png`
};

function section(title, body, bullets = []) {
  return { title, body, bullets };
}

function gallery(items) {
  return [
    {
      src: INFOGRAPHICS.sampleToReport,
      alt: items.sampleToReport.alt,
      title: items.sampleToReport.title,
      body: items.sampleToReport.body,
      fit: 'contain'
    },
    {
      src: INFOGRAPHICS.sectorRiskSolution,
      alt: items.sectorRiskSolution.alt,
      title: items.sectorRiskSolution.title,
      body: items.sectorRiskSolution.body,
      fit: 'contain'
    },
    {
      src: INFOGRAPHICS.maturity,
      alt: items.maturity.alt,
      title: items.maturity.title,
      body: items.maturity.body,
      fit: 'contain'
    }
  ];
}

const shared = {
  heroImage: INFOGRAPHICS.sampleToReport,
  heroImageFit: 'contain',
  ogImage: INFOGRAPHICS.sampleToReport
};

export const WATER_QUALITY_CONTROL_PAGE = {
  en: {
    path: '/industries/water-quality-control',
    title: 'Water quality control for companies and facilities',
    description: 'Turn every water sample into auditable evidence. AquaVerify connects microbiology kits, sampling workflows, laboratory partners and digital traceability for drinking water, process water, treatment, irrigation, reuse and aquaculture environments.',
    eyebrow: 'Water quality control',
    primaryCta: 'Request a water control diagnosis',
    secondaryCta: 'Explore sector workflows',
    seoTitle: 'Water quality control for companies | AquaVerify',
    seoDescription: 'Water quality control for companies: microbiology kits, somatic coliphages, digital traceability and reporting for audits. Request a technical diagnosis.',
    heroImageAlt: 'AquaVerify workflow from sampling plan to audit-ready water quality report',
    ...shared,
    sections: [
      section('Water control can no longer depend on scattered records', 'Quality teams need more than a result. They need to show where the sample was taken, which method was used, who handled it, when it was reviewed and how the evidence supports an operational or audit decision.', ['Invisible microbiological risk in raw, treated, reclaimed or process water', 'Slow decisions when analysis, reading and reporting are disconnected', 'Difficult audits caused by paper, spreadsheets, emails and isolated reports', 'Operational cost from repeated samples, overtreatment or avoidable uncertainty']),
      section('Control programmes adapted to your sector', 'AquaVerify can be configured for utilities, food and beverage sites, environmental laboratories, treatment plants, agriculture, seafood and aquaculture. Each programme starts from the matrix, sampling points, risk profile and reporting requirement.', ['Municipal water and utilities: source, treatment and network evidence', 'Food and beverage: process water, cleaning, rinse water and release decisions', 'Environmental laboratories: microbiology capacity, sample history and client reporting', 'Treatment plants: barrier verification, trend follow-up and corrective-action records']),
      section('Microbiology technology plus digital traceability', 'AquaVerify combines products, laboratory workflows and AquaVerify Cloud so every result can remain linked to sample context, product lot, operator, location, review status and report.', ['ENUMERA, INDICA and standard kit routes for quantitative or screening workflows', 'Somatic coliphage, E. coli, enterococci and other indicator workflows depending on the programme', 'LIMS, reporting and customer portal for recurring monitoring', 'Dashboards, alerts and history for distributed quality teams']),
      section('From sampling point to audit-ready report', 'The operational flow is simple: define the control programme, select method and execution route, digitise the chain of sample, record reading and validation, then convert results into report, action and follow-up.', ['Sampling plan and critical points', 'Internal kit, partner laboratory or hybrid execution', 'Location, user, date, time, matrix, batch and status', 'Report, history, alerts and corrective-action record']),
      section('Regulation and audits demand better water evidence', 'European and US water monitoring frameworks increasingly emphasise risk management, operational monitoring, treatment verification and documented evidence. AquaVerify helps teams organise that evidence without replacing the validation responsibilities of the laboratory or regulated operator.', ['EU Drinking Water Directive 2020/2184 includes risk-based operational monitoring and somatic coliphage context', 'Spain RD 3/2023 sets technical-health criteria for drinking water quality, control and supply', 'Regulation (EU) 2020/741 addresses minimum requirements for water reuse in agricultural irrigation', 'ISO 10705-2 and EPA Method 1602 provide recognised reference context for somatic coliphage workflows']),
      section('Designed for buyers who answer to audits, production and risk', 'Different stakeholders need different proof. AquaVerify structures the programme so quality, operations, laboratory and management teams can work from the same record.', ['Water quality directors: turn sampling points into traceable evidence', 'QA managers: validate critical water before production decisions', 'Lab directors: standardise sample-to-report flow and client communication', 'Treatment, agriculture and aquaculture teams: track deviations by site, source or campaign']),
      section('What your AquaVerify programme can include', 'The configuration depends on water type, matrix, sample volume, risk level, internal laboratory capacity and reporting needs.', ['Products and media for water microbiology workflows', 'Sampling app and Cloud record for operator, location and result context', 'LIMS, CoA and reporting templates', 'GIS, trend analysis and escalation rules for multi-site operations']),
      section('Is your water control programme audit-ready?', 'In a short technical diagnosis we review your sector, water type, current method, sample volume, accreditation needs and reporting friction. The output is a recommended route: products, laboratory workflow, SaaS, reporting or a combination.', ['Map the current workflow', 'Identify gaps in traceability and decision speed', 'Select product and method routes', 'Define the most useful digital layer'])
    ],
    gallery: gallery({
      sampleToReport: { alt: 'Infographic showing AquaVerify flow from sampling plan to audit-ready report', title: 'From sample to auditable decision', body: 'Plan, sample, test, validate, report and act in one connected quality workflow.' },
      sectorRiskSolution: { alt: 'Sector risk solution matrix for water quality control programmes', title: 'Sector, risk and solution matrix', body: 'Translate each sector risk into the right microbiology and reporting route.' },
      maturity: { alt: 'Water control maturity roadmap from reactive to predictive operation', title: 'Water control maturity roadmap', body: 'Move from reactive checks to controlled, traceable and insight-led water quality management.' }
    }),
    faqs: [
      { question: 'What companies can use AquaVerify?', answer: 'Utilities, food and beverage manufacturers, treatment plants, environmental laboratories, agricultural operations, aquaculture, seafood processors and any organisation that needs microbiological water control and traceable reporting.' },
      { question: 'Does AquaVerify replace an accredited laboratory?', answer: 'No. AquaVerify can work as a kit route, an internal workflow, a traceability layer or a coordination layer with laboratories. When official accreditation is required, the programme must be aligned with the relevant accredited laboratory or method.' },
      { question: 'Why are somatic coliphages relevant?', answer: 'Somatic coliphages are bacteriophages used as indicators of faecal contamination and possible viral risk. They are useful in treatment verification and microbiological water quality programmes.' },
      { question: 'Is the workflow aligned with ISO 10705-2 or EPA Method 1602?', answer: 'Some product and laboratory routes are designed around reference contexts such as ISO 10705-2 and EPA Method 1602. The final configuration must be validated according to matrix, country, laboratory scope and regulatory purpose.' },
      { question: 'Can the programme be adapted by sector?', answer: 'Yes. Sampling points, parameters, reports, frequencies and alert rules are different for a utility, a beverage plant, a wastewater facility, an agricultural operation or a seafood processor.' },
      { question: 'What does the digital layer add?', answer: 'It links sample, user, location, date, time, product context, result, report and corrective actions, reducing scattered documentation and making audits easier to prepare.' }
    ]
  },
  es: {
    path: '/es/industrias/control-calidad-agua',
    title: 'Control de calidad del agua para empresas e instalaciones',
    description: 'Convierte cada muestra de agua en una decisión auditable. AquaVerify integra kits microbiológicos, flujos de muestreo, partners de laboratorio y trazabilidad digital para agua de consumo, proceso, tratamiento, riego, reutilización y acuicultura.',
    eyebrow: 'Control de calidad del agua',
    primaryCta: 'Solicitar diagnóstico de control hídrico',
    secondaryCta: 'Ver soluciones por sector',
    seoTitle: 'Control de calidad del agua para empresas | AquaVerify',
    seoDescription: 'Control de calidad del agua para empresas: kits microbiológicos, colífagos somáticos, trazabilidad digital y reporting para auditorías. Solicita diagnóstico.',
    heroImageAlt: 'Flujo AquaVerify desde plan de muestreo hasta informe audit-ready de calidad del agua',
    ...shared,
    sections: [
      section('El control del agua ya no puede depender de registros dispersos', 'Los equipos de calidad no necesitan solo un resultado. Necesitan demostrar dónde se tomó la muestra, qué método se utilizó, quién la gestionó, cuándo se revisó y cómo la evidencia sostiene una decisión operativa o una auditoría.', ['Riesgo microbiológico invisible en agua bruta, tratada, regenerada o de proceso', 'Decisiones lentas cuando análisis, lectura e informe están desconectados', 'Auditorías difíciles con papel, Excel, emails y resultados aislados', 'Coste operativo por repetir muestras, sobreactuar o asumir incertidumbre']),
      section('Programas de control adaptados a tu sector', 'AquaVerify puede configurarse para utilities, alimentación y bebidas, laboratorios ambientales, plantas de tratamiento, agricultura, seafood y acuicultura. Cada programa parte de la matriz, puntos de muestreo, perfil de riesgo y necesidad de reporting.', ['Empresas municipales y utilities: evidencia desde captación, tratamiento y red', 'Food & beverage: agua de proceso, limpieza, enjuagues y decisiones de liberación', 'Laboratorios ambientales: capacidad microbiológica, histórico de muestras y reporting cliente', 'Tratamiento de agua: verificación de barreras, tendencias y acciones correctoras']),
      section('Tecnología microbiológica + trazabilidad digital', 'AquaVerify combina productos, flujos de laboratorio y AquaVerify Cloud para que cada resultado siga vinculado a contexto de muestra, lote de producto, operador, ubicación, revisión e informe.', ['ENUMERA, INDICA y kits estándar para flujos cuantitativos o de screening', 'Colífagos somáticos, E. coli, enterococos y otros indicadores según el programa', 'LIMS, reporting y portal cliente para monitorización recurrente', 'Dashboards, alertas e histórico para equipos de calidad distribuidos']),
      section('Del punto de muestreo al informe audit-ready', 'El flujo operativo es claro: diseñar el programa, seleccionar método y vía de ejecución, digitalizar la cadena de muestra, registrar lectura y validación, y convertir resultados en informe, acción y seguimiento.', ['Plan de muestreo y puntos críticos', 'Kit interno, laboratorio partner o ejecución híbrida', 'Ubicación, usuario, fecha, hora, matriz, lote y estado', 'Informe, histórico, alertas y registro de acciones correctoras']),
      section('La regulación y las auditorías exigen mejor evidencia del agua', 'Los marcos europeos y estadounidenses de control del agua avanzan hacia gestión del riesgo, monitorización operativa, verificación de barreras y evidencia documentada. AquaVerify ayuda a ordenar esa evidencia sin sustituir la validación del laboratorio ni la responsabilidad del operador regulado.', ['La Directiva (UE) 2020/2184 incorpora monitorización operativa basada en riesgo y contexto de colífagos somáticos', 'El RD 3/2023 fija criterios técnico-sanitarios de calidad, control y suministro de agua de consumo en España', 'El Reglamento (UE) 2020/741 aborda requisitos mínimos para reutilización de agua en riego agrícola', 'ISO 10705-2 y EPA Method 1602 aportan contexto de referencia para flujos de colífagos somáticos']),
      section('Diseñado para quienes responden ante auditorías, producción y riesgo', 'Cada perfil necesita una evidencia distinta. AquaVerify estructura el programa para que calidad, operaciones, laboratorio y dirección trabajen desde el mismo registro.', ['Dirección de calidad del agua: convertir puntos de muestreo en evidencia trazable', 'QA managers: validar agua crítica antes de decisiones de producción', 'Dirección de laboratorio: estandarizar muestra, informe y comunicación cliente', 'Tratamiento, agricultura y acuicultura: seguir desviaciones por planta, fuente o campaña']),
      section('Qué puede incluir tu programa AquaVerify', 'La configuración depende del tipo de agua, matriz, volumen de muestras, riesgo, capacidad interna de laboratorio y reporting requerido.', ['Productos y medios para microbiología del agua', 'App de muestreo y registro Cloud de operador, ubicación y resultado', 'LIMS, CoA y plantillas de reporting', 'GIS, análisis de tendencias y reglas de escalado para operaciones multi-site']),
      section('¿Tu programa de control del agua es audit-ready?', 'En un diagnóstico técnico breve revisamos sector, tipo de agua, método actual, volumen de muestras, necesidad de acreditación y fricciones de reporting. El resultado es una ruta recomendada: productos, flujo de laboratorio, SaaS, reporting o combinación.', ['Mapear el flujo actual', 'Identificar huecos de trazabilidad y velocidad de decisión', 'Seleccionar rutas de producto y método', 'Definir la capa digital más útil'])
    ],
    gallery: gallery({
      sampleToReport: { alt: 'Infografía del flujo AquaVerify desde plan de muestreo hasta informe audit-ready', title: 'De muestra a decisión auditable', body: 'Planifica, muestrea, analiza, valida, informa y actúa en un flujo de calidad conectado.' },
      sectorRiskSolution: { alt: 'Matriz sector riesgo solución para programas de control de calidad del agua', title: 'Matriz sector, riesgo y solución', body: 'Convierte el riesgo de cada sector en la ruta microbiológica y de reporting adecuada.' },
      maturity: { alt: 'Roadmap de madurez del control hídrico desde reactivo hasta predictivo', title: 'Roadmap de madurez del control hídrico', body: 'Pasa de controles reactivos a una gestión controlada, trazable y basada en datos.' }
    }),
    faqs: [
      { question: '¿Qué tipo de empresas pueden usar AquaVerify?', answer: 'Utilities, industrias alimentarias, plantas de tratamiento, laboratorios ambientales, explotaciones agrícolas, acuicultura, seafood y organizaciones que necesitan control microbiológico y trazabilidad del agua.' },
      { question: '¿AquaVerify sustituye a un laboratorio acreditado?', answer: 'No. AquaVerify puede funcionar como kit, flujo interno, capa de trazabilidad o coordinación con laboratorios. Cuando se requiere acreditación oficial, el programa debe alinearse con el laboratorio o método acreditado correspondiente.' },
      { question: '¿Por qué importan los colífagos somáticos?', answer: 'Son bacteriófagos usados como indicadores de contaminación fecal y posible riesgo viral. Son útiles para verificar tratamiento y reforzar programas de calidad microbiológica del agua.' },
      { question: '¿El flujo está alineado con ISO 10705-2 o EPA Method 1602?', answer: 'Algunas rutas de producto y laboratorio están diseñadas alrededor de referencias como ISO 10705-2 y EPA Method 1602. La configuración final debe validarse según matriz, país, alcance del laboratorio y finalidad regulatoria.' },
      { question: '¿Puede adaptarse por sector?', answer: 'Sí. Puntos de muestreo, parámetros, informes, frecuencias y alertas cambian entre una red municipal, una fábrica de bebidas, una EDAR, una explotación agrícola o una planta de seafood.' },
      { question: '¿Qué aporta la capa digital?', answer: 'Vincula muestra, usuario, ubicación, fecha, hora, contexto de producto, resultado, informe y acciones correctoras, reduciendo documentación dispersa y facilitando auditorías.' }
    ]
  },
  fr: {
    path: '/fr/industries/controle-qualite-eau',
    title: 'Contrôle qualité de l’eau pour entreprises et sites',
    description: 'Transformez chaque échantillon d’eau en preuve auditable. AquaVerify relie kits microbiologiques, flux de prélèvement, partenaires laboratoire et traçabilité numérique pour l’eau potable, l’eau de process, le traitement, l’irrigation, la réutilisation et l’aquaculture.',
    eyebrow: 'Contrôle qualité de l’eau',
    primaryCta: 'Demander un diagnostic eau',
    secondaryCta: 'Voir les flux par secteur',
    seoTitle: 'Contrôle qualité de l’eau pour entreprises | AquaVerify',
    seoDescription: 'Contrôle qualité de l’eau pour entreprises: kits microbiologiques, coliphages somatiques, traçabilité numérique et reporting pour audits.',
    heroImageAlt: 'Flux AquaVerify du plan de prélèvement au rapport audit-ready de qualité de l’eau',
    ...shared,
    sections: [
      section('Le contrôle de l’eau ne peut plus dépendre de dossiers dispersés', 'Les équipes qualité n’ont pas seulement besoin d’un résultat. Elles doivent démontrer où l’échantillon a été prélevé, quelle méthode a été utilisée, qui l’a géré, quand il a été revu et comment la preuve soutient une décision opérationnelle ou un audit.', ['Risque microbiologique invisible dans l’eau brute, traitée, réutilisée ou de process', 'Décisions lentes lorsque analyse, lecture et rapport sont déconnectés', 'Audits difficiles avec papier, Excel, emails et résultats isolés', 'Coûts opérationnels liés aux reprises d’échantillons, au surtraitement ou à l’incertitude']),
      section('Programmes de contrôle adaptés à votre secteur', 'AquaVerify se configure pour utilities, agroalimentaire, laboratoires environnementaux, usines de traitement, agriculture, seafood et aquaculture. Chaque programme part de la matrice, des points de prélèvement, du profil de risque et du besoin de reporting.', ['Utilities: preuves depuis captage, traitement et réseau', 'Food & beverage: eau de process, nettoyage, rinçage et décisions de libération', 'Laboratoires environnementaux: capacité microbiologique, historique échantillons et reporting client', 'Traitement de l’eau: vérification des barrières, tendances et actions correctives']),
      section('Technologie microbiologique + traçabilité numérique', 'AquaVerify combine produits, flux laboratoire et AquaVerify Cloud afin que chaque résultat reste lié au contexte échantillon, au lot produit, à l’opérateur, au site, à la revue et au rapport.', ['ENUMERA, INDICA et kits standard pour flux quantitatifs ou screening', 'Coliphages somatiques, E. coli, entérocoques et autres indicateurs selon le programme', 'LIMS, reporting et portail client pour suivi récurrent', 'Dashboards, alertes et historique pour équipes qualité distribuées']),
      section('Du point de prélèvement au rapport audit-ready', 'Le flux opérationnel est direct: concevoir le programme, choisir méthode et mode d’exécution, numériser la chaîne échantillon, enregistrer lecture et validation, puis transformer les résultats en rapport, action et suivi.', ['Plan de prélèvement et points critiques', 'Kit interne, laboratoire partenaire ou exécution hybride', 'Site, utilisateur, date, heure, matrice, lot et statut', 'Rapport, historique, alertes et actions correctives']),
      section('Réglementation et audits exigent une meilleure preuve eau', 'Les cadres européens et américains évoluent vers la gestion du risque, la surveillance opérationnelle, la vérification des barrières et l’évidence documentée. AquaVerify aide à organiser cette preuve sans remplacer la validation du laboratoire ni la responsabilité de l’opérateur réglementé.', ['La directive (UE) 2020/2184 inclut la surveillance opérationnelle fondée sur le risque et le contexte des coliphages somatiques', 'Le règlement (UE) 2020/741 fixe des exigences minimales pour la réutilisation de l’eau en irrigation agricole', 'ISO 10705-2 et EPA Method 1602 apportent un contexte de référence pour les flux coliphages somatiques', 'Les exigences finales dépendent de la matrice, du pays, de l’accréditation et de l’usage réglementaire']),
      section('Conçu pour ceux qui répondent aux audits, à la production et au risque', 'Chaque profil a besoin d’une preuve différente. AquaVerify structure le programme pour que qualité, opérations, laboratoire et direction travaillent à partir du même dossier.', ['Direction qualité eau: transformer chaque point de prélèvement en preuve traçable', 'QA managers: valider l’eau critique avant décisions production', 'Direction laboratoire: standardiser échantillon, rapport et communication client', 'Traitement, agriculture et aquaculture: suivre les écarts par site, source ou campagne']),
      section('Ce que votre programme AquaVerify peut inclure', 'La configuration dépend du type d’eau, de la matrice, du volume d’échantillons, du niveau de risque, de la capacité laboratoire interne et du reporting attendu.', ['Produits et milieux pour microbiologie de l’eau', 'App de prélèvement et enregistrement Cloud opérateur, site et résultat', 'LIMS, CoA et modèles de reporting', 'GIS, tendances et règles d’escalade pour opérations multi-sites']),
      section('Votre programme de contrôle eau est-il audit-ready?', 'Lors d’un diagnostic technique court, nous analysons secteur, type d’eau, méthode actuelle, volume d’échantillons, besoin d’accréditation et friction de reporting. Le résultat est une route recommandée: produits, workflow laboratoire, SaaS, reporting ou combinaison.', ['Cartographier le flux actuel', 'Identifier les écarts de traçabilité et vitesse décisionnelle', 'Sélectionner routes produit et méthode', 'Définir la couche numérique la plus utile'])
    ],
    gallery: gallery({
      sampleToReport: { alt: 'Infographie du flux AquaVerify du plan de prélèvement au rapport audit-ready', title: 'De l’échantillon à la décision auditable', body: 'Planifier, prélever, analyser, valider, rapporter et agir dans un flux qualité connecté.' },
      sectorRiskSolution: { alt: 'Matrice secteur risque solution pour programmes de contrôle qualité de l’eau', title: 'Matrice secteur, risque et solution', body: 'Transformer le risque sectoriel en bonne route microbiologique et reporting.' },
      maturity: { alt: 'Roadmap de maturité du contrôle de l’eau du réactif au prédictif', title: 'Roadmap de maturité contrôle eau', body: 'Passer de contrôles réactifs à une gestion contrôlée, traçable et pilotée par la donnée.' }
    }),
    faqs: [
      { question: 'Quelles entreprises peuvent utiliser AquaVerify?', answer: 'Utilities, industries agroalimentaires, usines de traitement, laboratoires environnementaux, agriculture, aquaculture, seafood et organisations ayant besoin de contrôle microbiologique et de traçabilité de l’eau.' },
      { question: 'AquaVerify remplace-t-il un laboratoire accrédité?', answer: 'Non. AquaVerify peut être un kit, un workflow interne, une couche de traçabilité ou une coordination avec laboratoires. Si une accréditation officielle est requise, le programme doit s’aligner avec le laboratoire ou la méthode accréditée applicable.' },
      { question: 'Pourquoi les coliphages somatiques sont-ils importants?', answer: 'Ce sont des bactériophages utilisés comme indicateurs de contamination fécale et de risque viral potentiel. Ils sont utiles pour vérifier le traitement et renforcer les programmes microbiologiques eau.' },
      { question: 'Le flux est-il aligné avec ISO 10705-2 ou EPA Method 1602?', answer: 'Certaines routes produit et laboratoire sont conçues autour de références comme ISO 10705-2 et EPA Method 1602. La configuration finale doit être validée selon matrice, pays, portée laboratoire et usage réglementaire.' },
      { question: 'Le programme peut-il être adapté par secteur?', answer: 'Oui. Points de prélèvement, paramètres, rapports, fréquences et alertes changent selon réseau municipal, usine de boissons, station de traitement, exploitation agricole ou seafood.' },
      { question: 'Que apporte la couche numérique?', answer: 'Elle relie échantillon, utilisateur, site, date, heure, contexte produit, résultat, rapport et actions correctives afin de réduire la documentation dispersée et préparer les audits.' }
    ]
  },
  it: {
    path: '/it/settori/controllo-qualita-acqua',
    title: 'Controllo qualità dell’acqua per aziende e strutture',
    description: 'Trasforma ogni campione d’acqua in evidenza auditabile. AquaVerify collega kit microbiologici, workflow di campionamento, partner di laboratorio e tracciabilità digitale per acqua potabile, acqua di processo, trattamento, irrigazione, riuso e acquacoltura.',
    eyebrow: 'Controllo qualità acqua',
    primaryCta: 'Richiedi diagnosi controllo acqua',
    secondaryCta: 'Vedi workflow per settore',
    seoTitle: 'Controllo qualità dell’acqua per aziende | AquaVerify',
    seoDescription: 'Controllo qualità dell’acqua per aziende: kit microbiologici, colifagi somatici, tracciabilità digitale e reporting per audit.',
    heroImageAlt: 'Workflow AquaVerify dal piano di campionamento al report audit-ready di qualità dell’acqua',
    ...shared,
    sections: [
      section('Il controllo dell’acqua non può più dipendere da registri dispersi', 'I team qualità non hanno bisogno solo di un risultato. Devono dimostrare dove è stato preso il campione, quale metodo è stato usato, chi lo ha gestito, quando è stato revisionato e come l’evidenza supporta una decisione operativa o un audit.', ['Rischio microbiologico invisibile in acqua grezza, trattata, riutilizzata o di processo', 'Decisioni lente quando analisi, lettura e report sono scollegati', 'Audit difficili con carta, Excel, email e risultati isolati', 'Costi operativi da ripetizione campioni, sovratrattamento o incertezza evitabile']),
      section('Programmi di controllo adattati al tuo settore', 'AquaVerify può configurarsi per utility, food & beverage, laboratori ambientali, impianti di trattamento, agricoltura, seafood e acquacoltura. Ogni programma parte da matrice, punti di campionamento, profilo di rischio e necessità di reporting.', ['Utility: evidenza da captazione, trattamento e rete', 'Food & beverage: acqua di processo, pulizia, risciacquo e decisioni di rilascio', 'Laboratori ambientali: capacità microbiologica, storico campioni e reporting clienti', 'Trattamento acqua: verifica barriere, trend e azioni correttive']),
      section('Tecnologia microbiologica + tracciabilità digitale', 'AquaVerify combina prodotti, workflow di laboratorio e AquaVerify Cloud affinché ogni risultato resti collegato a contesto campione, lotto prodotto, operatore, ubicazione, revisione e report.', ['ENUMERA, INDICA e kit standard per workflow quantitativi o screening', 'Colifagi somatici, E. coli, enterococchi e altri indicatori secondo il programma', 'LIMS, reporting e portale cliente per monitoraggio ricorrente', 'Dashboard, alert e storico per team qualità distribuiti']),
      section('Dal punto di campionamento al report audit-ready', 'Il flusso operativo è lineare: progettare il programma, scegliere metodo e via di esecuzione, digitalizzare la catena del campione, registrare lettura e validazione, quindi trasformare risultati in report, azione e follow-up.', ['Piano di campionamento e punti critici', 'Kit interno, laboratorio partner o esecuzione ibrida', 'Ubicazione, utente, data, ora, matrice, lotto e stato', 'Report, storico, alert e registro azioni correttive']),
      section('Normativa e audit richiedono migliore evidenza dell’acqua', 'I quadri europei e statunitensi evolvono verso gestione del rischio, monitoraggio operativo, verifica delle barriere ed evidenza documentata. AquaVerify aiuta a organizzare questa evidenza senza sostituire validazione del laboratorio o responsabilità dell’operatore regolato.', ['La direttiva (UE) 2020/2184 include monitoraggio operativo basato sul rischio e contesto dei colifagi somatici', 'Il regolamento (UE) 2020/741 riguarda requisiti minimi per il riuso dell’acqua in irrigazione agricola', 'ISO 10705-2 ed EPA Method 1602 offrono contesto di riferimento per workflow di colifagi somatici', 'I requisiti finali dipendono da matrice, paese, accreditamento e uso regolatorio']),
      section('Progettato per chi risponde ad audit, produzione e rischio', 'Ogni profilo richiede una prova diversa. AquaVerify struttura il programma affinché qualità, operations, laboratorio e direzione lavorino sullo stesso record.', ['Direzione qualità acqua: trasformare punti campione in evidenza tracciabile', 'QA manager: validare acqua critica prima delle decisioni produttive', 'Direzione laboratorio: standardizzare campione, report e comunicazione cliente', 'Trattamento, agricoltura e acquacoltura: seguire deviazioni per sito, fonte o campagna']),
      section('Cosa può includere il tuo programma AquaVerify', 'La configurazione dipende da tipo d’acqua, matrice, volume campioni, rischio, capacità interna di laboratorio e reporting richiesto.', ['Prodotti e terreni per microbiologia dell’acqua', 'App campionamento e record Cloud per operatore, ubicazione e risultato', 'LIMS, CoA e template di reporting', 'GIS, analisi trend e regole escalation per operazioni multi-site']),
      section('Il tuo programma controllo acqua è audit-ready?', 'In una breve diagnosi tecnica rivediamo settore, tipo d’acqua, metodo attuale, volume campioni, necessità di accreditamento e frizioni di reporting. Il risultato è una rotta consigliata: prodotti, workflow laboratorio, SaaS, reporting o combinazione.', ['Mappare il workflow attuale', 'Identificare gap di tracciabilità e velocità decisionale', 'Selezionare rotte prodotto e metodo', 'Definire il layer digitale più utile'])
    ],
    gallery: gallery({
      sampleToReport: { alt: 'Infografica AquaVerify dal piano di campionamento al report audit-ready', title: 'Dal campione alla decisione auditabile', body: 'Pianifica, campiona, analizza, valida, riporta e agisci in un workflow qualità connesso.' },
      sectorRiskSolution: { alt: 'Matrice settore rischio soluzione per programmi di controllo qualità acqua', title: 'Matrice settore, rischio e soluzione', body: 'Trasforma il rischio settoriale nella rotta microbiologica e di reporting corretta.' },
      maturity: { alt: 'Roadmap maturità controllo idrico da reattivo a predittivo', title: 'Roadmap maturità controllo idrico', body: 'Passa da controlli reattivi a gestione controllata, tracciabile e guidata dai dati.' }
    }),
    faqs: [
      { question: 'Che aziende possono usare AquaVerify?', answer: 'Utility, industrie alimentari, impianti di trattamento, laboratori ambientali, agricoltura, acquacoltura, seafood e organizzazioni che richiedono controllo microbiologico e tracciabilità dell’acqua.' },
      { question: 'AquaVerify sostituisce un laboratorio accreditato?', answer: 'No. AquaVerify può essere kit, workflow interno, layer di tracciabilità o coordinamento con laboratori. Quando serve accreditamento ufficiale, il programma deve allinearsi al laboratorio o metodo accreditato applicabile.' },
      { question: 'Perché sono importanti i colifagi somatici?', answer: 'Sono batteriofagi usati come indicatori di contaminazione fecale e possibile rischio virale. Sono utili per verificare il trattamento e rafforzare programmi microbiologici dell’acqua.' },
      { question: 'Il flusso è allineato con ISO 10705-2 o EPA Method 1602?', answer: 'Alcune rotte prodotto e laboratorio sono progettate intorno a riferimenti come ISO 10705-2 ed EPA Method 1602. La configurazione finale deve essere validata secondo matrice, paese, ambito laboratorio e uso regolatorio.' },
      { question: 'Il programma può adattarsi al settore?', answer: 'Sì. Punti di campionamento, parametri, report, frequenze e alert cambiano tra rete municipale, stabilimento bevande, impianto di trattamento, azienda agricola o seafood.' },
      { question: 'Cosa aggiunge il layer digitale?', answer: 'Collega campione, utente, ubicazione, data, ora, contesto prodotto, risultato, report e azioni correttive, riducendo documentazione dispersa e facilitando audit.' }
    ]
  },
  ca: {
    path: '/ca/sectors/control-qualitat-aigua',
    title: 'Control de qualitat de l’aigua per a empreses i instal·lacions',
    description: 'Converteix cada mostra d’aigua en evidència auditable. AquaVerify connecta kits microbiològics, fluxos de mostreig, partners de laboratori i traçabilitat digital per a aigua de consum, procés, tractament, reg, reutilització i aqüicultura.',
    eyebrow: 'Control de qualitat de l’aigua',
    primaryCta: 'Sol·licitar diagnòstic hídric',
    secondaryCta: 'Veure fluxos per sector',
    seoTitle: 'Control de qualitat de l’aigua per a empreses | AquaVerify',
    seoDescription: 'Control de qualitat de l’aigua per a empreses: kits microbiològics, colífags somàtics, traçabilitat digital i reporting per a auditories.',
    heroImageAlt: 'Flux AquaVerify del pla de mostreig fins a informe audit-ready de qualitat de l’aigua',
    ...shared,
    sections: [
      section('El control de l’aigua ja no pot dependre de registres dispersos', 'Els equips de qualitat no necessiten només un resultat. Han de demostrar on es va prendre la mostra, quin mètode es va utilitzar, qui la va gestionar, quan es va revisar i com l’evidència sosté una decisió operativa o una auditoria.', ['Risc microbiològic invisible en aigua bruta, tractada, reutilitzada o de procés', 'Decisions lentes quan anàlisi, lectura i informe estan desconnectats', 'Auditories difícils amb paper, Excel, emails i resultats aïllats', 'Cost operatiu per repetir mostres, sobretractar o assumir incertesa']),
      section('Programes de control adaptats al teu sector', 'AquaVerify es pot configurar per a utilities, alimentació i begudes, laboratoris ambientals, plantes de tractament, agricultura, seafood i aqüicultura. Cada programa parteix de la matriu, punts de mostreig, perfil de risc i necessitat de reporting.', ['Empreses municipals i utilities: evidència des de captació, tractament i xarxa', 'Food & beverage: aigua de procés, neteja, esbandides i decisions d’alliberament', 'Laboratoris ambientals: capacitat microbiològica, històric de mostres i reporting client', 'Tractament d’aigua: verificació de barreres, tendències i accions correctores']),
      section('Tecnologia microbiològica + traçabilitat digital', 'AquaVerify combina productes, fluxos de laboratori i AquaVerify Cloud perquè cada resultat continuï vinculat a context de mostra, lot de producte, operador, ubicació, revisió i informe.', ['ENUMERA, INDICA i kits estàndard per a fluxos quantitatius o de screening', 'Colífags somàtics, E. coli, enterococs i altres indicadors segons el programa', 'LIMS, reporting i portal client per a monitoratge recurrent', 'Dashboards, alertes i històric per a equips de qualitat distribuïts']),
      section('Del punt de mostreig a l’informe audit-ready', 'El flux operatiu és clar: dissenyar el programa, seleccionar mètode i via d’execució, digitalitzar la cadena de mostra, registrar lectura i validació, i convertir resultats en informe, acció i seguiment.', ['Pla de mostreig i punts crítics', 'Kit intern, laboratori partner o execució híbrida', 'Ubicació, usuari, data, hora, matriu, lot i estat', 'Informe, històric, alertes i registre d’accions correctores']),
      section('La regulació i les auditories exigeixen millor evidència de l’aigua', 'Els marcs europeus i estatunidencs avancen cap a gestió del risc, monitoratge operatiu, verificació de barreres i evidència documentada. AquaVerify ajuda a ordenar aquesta evidència sense substituir la validació del laboratori ni la responsabilitat de l’operador regulat.', ['La Directiva (UE) 2020/2184 incorpora monitoratge operatiu basat en risc i context de colífags somàtics', 'El Reglament (UE) 2020/741 aborda requisits mínims per a reutilització d’aigua en reg agrícola', 'ISO 10705-2 i EPA Method 1602 aporten context de referència per a fluxos de colífags somàtics', 'Els requisits finals depenen de matriu, país, acreditació i ús regulatori']),
      section('Dissenyat per a qui respon davant auditories, producció i risc', 'Cada perfil necessita una evidència diferent. AquaVerify estructura el programa perquè qualitat, operacions, laboratori i direcció treballin des del mateix registre.', ['Direcció de qualitat de l’aigua: convertir punts de mostreig en evidència traçable', 'QA managers: validar aigua crítica abans de decisions de producció', 'Direcció de laboratori: estandarditzar mostra, informe i comunicació client', 'Tractament, agricultura i aqüicultura: seguir desviacions per planta, font o campanya']),
      section('Què pot incloure el teu programa AquaVerify', 'La configuració depèn del tipus d’aigua, matriu, volum de mostres, risc, capacitat interna de laboratori i reporting requerit.', ['Productes i medis per a microbiologia de l’aigua', 'App de mostreig i registre Cloud d’operador, ubicació i resultat', 'LIMS, CoA i plantilles de reporting', 'GIS, anàlisi de tendències i regles d’escalat per a operacions multi-site']),
      section('El teu programa de control de l’aigua és audit-ready?', 'En un diagnòstic tècnic breu revisem sector, tipus d’aigua, mètode actual, volum de mostres, necessitat d’acreditació i friccions de reporting. El resultat és una ruta recomanada: productes, flux de laboratori, SaaS, reporting o combinació.', ['Mapar el flux actual', 'Identificar buits de traçabilitat i velocitat de decisió', 'Seleccionar rutes de producte i mètode', 'Definir la capa digital més útil'])
    ],
    gallery: gallery({
      sampleToReport: { alt: 'Infografia del flux AquaVerify del pla de mostreig fins a informe audit-ready', title: 'De mostra a decisió auditable', body: 'Planifica, mostreja, analitza, valida, informa i actua en un flux de qualitat connectat.' },
      sectorRiskSolution: { alt: 'Matriu sector risc solució per a programes de control de qualitat de l’aigua', title: 'Matriu sector, risc i solució', body: 'Converteix el risc de cada sector en la ruta microbiològica i de reporting adequada.' },
      maturity: { alt: 'Roadmap de maduresa del control hídric des de reactiu fins a predictiu', title: 'Roadmap de maduresa del control hídric', body: 'Passa de controls reactius a una gestió controlada, traçable i basada en dades.' }
    }),
    faqs: [
      { question: 'Quin tipus d’empreses poden usar AquaVerify?', answer: 'Utilities, indústries alimentàries, plantes de tractament, laboratoris ambientals, explotacions agrícoles, aqüicultura, seafood i organitzacions que necessiten control microbiològic i traçabilitat de l’aigua.' },
      { question: 'AquaVerify substitueix un laboratori acreditat?', answer: 'No. AquaVerify pot funcionar com a kit, flux intern, capa de traçabilitat o coordinació amb laboratoris. Quan cal acreditació oficial, el programa s’ha d’alinear amb el laboratori o mètode acreditat corresponent.' },
      { question: 'Per què importen els colífags somàtics?', answer: 'Són bacteriòfags utilitzats com a indicadors de contaminació fecal i possible risc viral. Són útils per verificar tractament i reforçar programes microbiològics d’aigua.' },
      { question: 'El flux està alineat amb ISO 10705-2 o EPA Method 1602?', answer: 'Algunes rutes de producte i laboratori estan dissenyades al voltant de referències com ISO 10705-2 i EPA Method 1602. La configuració final s’ha de validar segons matriu, país, abast del laboratori i finalitat regulatòria.' },
      { question: 'Es pot adaptar per sector?', answer: 'Sí. Punts de mostreig, paràmetres, informes, freqüències i alertes canvien entre una xarxa municipal, una fàbrica de begudes, una depuradora, una explotació agrícola o una planta de seafood.' },
      { question: 'Què aporta la capa digital?', answer: 'Vincula mostra, usuari, ubicació, data, hora, context de producte, resultat, informe i accions correctores, reduint documentació dispersa i facilitant auditories.' }
    ]
  }
};
