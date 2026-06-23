import { locale, page, section, MARKETING_LANGUAGES } from './marketing-pages/shared.js';
import { AQUATOOLS_ROUTE_PATHS } from './aquatoolsRoutes.js';

export const AQUATOOLS_DATE_MODIFIED = '2026-06-22';
export const AQUATOOLS_CALCULATION_VERSION = '1.0.0';

export const AQUATOOLS_APPROVED_TOOL_IDS = [
  'aquatool-dilution',
  'aquatool-molarity',
  'aquatool-unit-converter',
  'aquatool-rpm-rcf',
  'aquatool-cfu',
  'aquatool-recovery-rpd',
  'aquatool-hardness-alkalinity',
  'aquatool-chemical-species'
];

export const AQUATOOLS_COPY = {
  en: {
    hubTitle: 'AquaTools Free laboratory calculators',
    hubDescription: 'Free browser-based calculators for laboratory dilutions, molarity, unit conversion, centrifuge RCF, CFU, recovery, hardness, alkalinity and nutrient species.',
    search: 'Search tools',
    allCategories: 'All categories',
    categories: {
      chemistry: 'Laboratory chemistry',
      microbiology: 'Microbiology',
      quality: 'Quality control',
      water: 'Water quality'
    },
    howTitle: 'Calculate in the browser',
    privacyTitle: 'Private by design',
    privacy: 'Inputs and results stay in your browser. AquaTools Free does not send calculation values to AquaVerify servers.',
    cloudTitle: 'Need saved records?',
    cloudBody: 'AquaVerify Cloud keeps the governed workflows: saved calculations, history, traceability, ELN, LIMS review, reports and collaboration.',
    cloudCta: 'Move from a one-off calculation to controlled sample, method and report workflows in AquaVerify Cloud.',
    primaryCta: 'Explore AquaVerify Cloud',
    formula: 'Formula',
    variables: 'Variables and units',
    example: 'Worked example',
    interpretation: 'How to read the result',
    validations: 'Validation rules',
    validationBody: 'Inputs must be finite, compatible and within calculation limits. Denominators cannot be zero.',
    warnings: 'Warnings',
    limitations: 'Limits',
    sources: 'Sources',
    sourcesBody: 'AquaVerify Cloud AquaTools calculation core and AquaTools Free v1 acceptance vectors.',
    relatedTools: 'Related calculators',
    industries: 'Industries',
    resources: 'Resources',
    glossary: 'Glossary',
    products: 'Products',
    faq: 'FAQ',
    calculate: 'Calculate',
    reset: 'Reset',
    result: 'Result',
    noResult: 'Run the calculator to see the formula steps, warnings and calculation version.',
    errorSummary: 'Check the highlighted inputs',
    copyResult: 'Copy result',
    copySummary: 'Copy summary',
    shareUrl: 'Share URL',
    downloadTxt: 'Download TXT',
    print: 'Print',
    disclaimer: 'This calculator is an educational and workflow aid. It does not replace a validated method, SOP, accreditation decision or regulatory interpretation.'
  },
  es: {
    hubTitle: 'Calculadoras de laboratorio AquaTools Free',
    hubDescription: 'Calculadoras gratuitas en navegador para diluciones, molaridad, conversión de unidades, RCF de centrífuga, UFC, recuperación, dureza, alcalinidad y especies nutritivas.',
    search: 'Buscar herramientas',
    allCategories: 'Todas las categorías',
    categories: {
      chemistry: 'Química de laboratorio',
      microbiology: 'Microbiología',
      quality: 'Control de calidad',
      water: 'Calidad del agua'
    },
    howTitle: 'Calcula en el navegador',
    privacyTitle: 'Privado por diseño',
    privacy: 'Los valores introducidos y los resultados permanecen en tu navegador. AquaTools Free no envía valores de cálculo a servidores AquaVerify.',
    cloudTitle: '¿Necesitas registros guardados?',
    cloudBody: 'AquaVerify Cloud conserva los flujos gobernados: cálculos guardados, historial, trazabilidad, ELN, revisión LIMS, informes y colaboración.',
    cloudCta: 'Pasa de un cálculo puntual a flujos controlados de muestra, método e informe en AquaVerify Cloud.',
    primaryCta: 'Explorar AquaVerify Cloud',
    formula: 'Fórmula',
    variables: 'Variables y unidades',
    example: 'Ejemplo resuelto',
    interpretation: 'Cómo interpretar el resultado',
    validations: 'Reglas de validación',
    validationBody: 'Las entradas deben ser finitas, compatibles y estar dentro de los límites de cálculo. Los denominadores no pueden ser cero.',
    warnings: 'Advertencias',
    limitations: 'Límites',
    sources: 'Fuentes',
    sourcesBody: 'Núcleo de cálculo AquaTools de AquaVerify Cloud y vectores de aceptación AquaTools Free v1.',
    relatedTools: 'Calculadoras relacionadas',
    industries: 'Industrias',
    resources: 'Recursos',
    glossary: 'Glosario',
    products: 'Productos',
    faq: 'FAQ',
    calculate: 'Calcular',
    reset: 'Reiniciar',
    result: 'Resultado',
    noResult: 'Ejecuta la calculadora para ver pasos de fórmula, advertencias y versión del cálculo.',
    errorSummary: 'Revisa los valores introducidos',
    copyResult: 'Copiar resultado',
    copySummary: 'Copiar resumen',
    shareUrl: 'Compartir URL',
    downloadTxt: 'Descargar TXT',
    print: 'Imprimir',
    disclaimer: 'Esta calculadora es una ayuda educativa y de flujo de trabajo. No sustituye un método validado, SOP, decisión de acreditación ni interpretación regulatoria.'
  },
  fr: {
    hubTitle: 'Calculateurs de laboratoire AquaTools Free',
    hubDescription: 'Calculateurs gratuits dans le navigateur pour dilutions, molarité, conversion unités, RCF centrifugeuse, UFC, récupération, dureté, alcalinité et espèces nutritives.',
    search: 'Rechercher un outil',
    allCategories: 'Toutes les catégories',
    categories: {
      chemistry: 'Chimie de laboratoire',
      microbiology: 'Microbiologie',
      quality: 'Contrôle qualité',
      water: 'Qualité de l’eau'
    },
    howTitle: 'Calculer dans le navigateur',
    privacyTitle: 'Privé par conception',
    privacy: 'Les valeurs saisies et résultats restent dans votre navigateur. AquaTools Free n’envoie pas les valeurs de calcul aux serveurs AquaVerify.',
    cloudTitle: 'Besoin d’enregistrements?',
    cloudBody: 'AquaVerify Cloud garde les flux gouvernés: calculs enregistrés, historique, traçabilité, ELN, revue LIMS, rapports et collaboration.',
    cloudCta: 'Passez d’un calcul ponctuel à des flux contrôlés d’échantillon, méthode et rapport dans AquaVerify Cloud.',
    primaryCta: 'Explorer AquaVerify Cloud',
    formula: 'Formule',
    variables: 'Variables et unités',
    example: 'Exemple travaillé',
    interpretation: 'Lire le résultat',
    validations: 'Règles de validation',
    validationBody: 'Les entrées doivent être finies, compatibles et dans les limites de calcul. Les dénominateurs ne peuvent pas être nuls.',
    warnings: 'Avertissements',
    limitations: 'Limites',
    sources: 'Sources',
    sourcesBody: 'Noyau de calcul AquaTools d’AquaVerify Cloud et vecteurs d’acceptation AquaTools Free v1.',
    relatedTools: 'Calculateurs associés',
    industries: 'Industries',
    resources: 'Ressources',
    glossary: 'Glossaire',
    products: 'Produits',
    faq: 'FAQ',
    calculate: 'Calculer',
    reset: 'Réinitialiser',
    result: 'Résultat',
    noResult: 'Lancez le calculateur pour voir les étapes, avertissements et version du calcul.',
    errorSummary: 'Vérifiez les valeurs saisies',
    copyResult: 'Copier le résultat',
    copySummary: 'Copier le résumé',
    shareUrl: 'Partager URL',
    downloadTxt: 'Télécharger TXT',
    print: 'Imprimer',
    disclaimer: 'Ce calculateur est une aide pédagogique et de workflow. Il ne remplace pas une méthode validée, un SOP, une décision d’accréditation ou une interprétation réglementaire.'
  },
  it: {
    hubTitle: 'Calcolatori di laboratorio AquaTools Free',
    hubDescription: 'Calcolatori gratuiti nel browser per diluizioni, molarità, conversione unità, RCF centrifuga, UFC, recupero, durezza, alcalinità e specie nutritive.',
    search: 'Cerca strumenti',
    allCategories: 'Tutte le categorie',
    categories: {
      chemistry: 'Chimica di laboratorio',
      microbiology: 'Microbiologia',
      quality: 'Controllo qualità',
      water: 'Qualità dell’acqua'
    },
    howTitle: 'Calcola nel browser',
    privacyTitle: 'Privato per progettazione',
    privacy: 'Valori inseriti e risultati restano nel browser. AquaTools Free non invia valori di calcolo ai server AquaVerify.',
    cloudTitle: 'Servono registri salvati?',
    cloudBody: 'AquaVerify Cloud mantiene i flussi governati: calcoli salvati, storico, tracciabilità, ELN, revisione LIMS, report e collaborazione.',
    cloudCta: 'Passa da un calcolo puntuale a flussi controllati di campione, metodo e report in AquaVerify Cloud.',
    primaryCta: 'Esplora AquaVerify Cloud',
    formula: 'Formula',
    variables: 'Variabili e unità',
    example: 'Esempio svolto',
    interpretation: 'Come leggere il risultato',
    validations: 'Regole di validazione',
    validationBody: 'Gli input devono essere finiti, compatibili e dentro i limiti di calcolo. I denominatori non possono essere zero.',
    warnings: 'Avvertenze',
    limitations: 'Limiti',
    sources: 'Fonti',
    sourcesBody: 'Core di calcolo AquaTools di AquaVerify Cloud e vettori di accettazione AquaTools Free v1.',
    relatedTools: 'Calcolatori correlati',
    industries: 'Settori',
    resources: 'Risorse',
    glossary: 'Glossario',
    products: 'Prodotti',
    faq: 'FAQ',
    calculate: 'Calcola',
    reset: 'Ripristina',
    result: 'Risultato',
    noResult: 'Esegui il calcolatore per vedere passaggi, avvertenze e versione del calcolo.',
    errorSummary: 'Controlla i valori inseriti',
    copyResult: 'Copia risultato',
    copySummary: 'Copia riepilogo',
    shareUrl: 'Condividi URL',
    downloadTxt: 'Scarica TXT',
    print: 'Stampa',
    disclaimer: 'Questo calcolatore è un supporto educativo e operativo. Non sostituisce un metodo validato, SOP, decisione di accreditamento o interpretazione regolatoria.'
  },
  ca: {
    hubTitle: 'Calculadores de laboratori AquaTools Free',
    hubDescription: 'Calculadores gratuïtes al navegador per a dilucions, molaritat, conversió d’unitats, RCF de centrífuga, UFC, recuperació, duresa, alcalinitat i espècies nutritives.',
    search: 'Cercar eines',
    allCategories: 'Totes les categories',
    categories: {
      chemistry: 'Química de laboratori',
      microbiology: 'Microbiologia',
      quality: 'Control de qualitat',
      water: 'Qualitat de l’aigua'
    },
    howTitle: 'Calcula al navegador',
    privacyTitle: 'Privat per disseny',
    privacy: 'Els valors introduïts i els resultats romanen al navegador. AquaTools Free no envia valors de càlcul als servidors AquaVerify.',
    cloudTitle: 'Necessites registres desats?',
    cloudBody: 'AquaVerify Cloud conserva els fluxos governats: càlculs desats, historial, traçabilitat, ELN, revisió LIMS, informes i col·laboració.',
    cloudCta: 'Passa d’un càlcul puntual a fluxos controlats de mostra, mètode i informe a AquaVerify Cloud.',
    primaryCta: 'Explorar AquaVerify Cloud',
    formula: 'Fórmula',
    variables: 'Variables i unitats',
    example: 'Exemple resolt',
    interpretation: 'Com llegir el resultat',
    validations: 'Regles de validació',
    validationBody: 'Les entrades han de ser finites, compatibles i dins dels límits de càlcul. Els denominadors no poden ser zero.',
    warnings: 'Advertiments',
    limitations: 'Límits',
    sources: 'Fonts',
    sourcesBody: 'Nucli de càlcul AquaTools d’AquaVerify Cloud i vectors d’acceptació AquaTools Free v1.',
    relatedTools: 'Calculadores relacionades',
    industries: 'Sectors',
    resources: 'Recursos',
    glossary: 'Glossari',
    products: 'Productes',
    faq: 'FAQ',
    calculate: 'Calcular',
    reset: 'Restablir',
    result: 'Resultat',
    noResult: 'Executa la calculadora per veure passos, advertiments i versió del càlcul.',
    errorSummary: 'Revisa els valors introduïts',
    copyResult: 'Copiar resultat',
    copySummary: 'Copiar resum',
    shareUrl: 'Compartir URL',
    downloadTxt: 'Descarregar TXT',
    print: 'Imprimir',
    disclaimer: 'Aquesta calculadora és una ajuda educativa i de flux de treball. No substitueix un mètode validat, SOP, decisió d’acreditació ni interpretació reguladora.'
  }
};

const SOURCE_REFS = [
  {
    label: 'AquaVerify Cloud AquaTools core',
    url: 'https://aquaverify.com/tools'
  },
  {
    label: 'AquaTools Free v1 acceptance vectors',
    url: 'https://aquaverify.com/tools'
  }
];

const SHARED_LINKS = {
  industryIds: ['water-testing-labs', 'water-quality-control', 'food-beverage-water-quality', 'pharma-cosmetics-water'],
  resourceIds: ['iso-17025-water-laboratories-guide', 'excel-to-lims-water-analysis', 'water-compliance-software-guide'],
  productIds: ['platform', 'enumera', 'lab-essentials']
};

const TOOL_GLOSSARY_IDS = {
  'aquatool-dilution': ['matrix', 'analytical-traceability', 'lims'],
  'aquatool-molarity': ['matrix', 'analytical-traceability', 'lims'],
  'aquatool-unit-converter': ['analytical-traceability', 'lims', 'coa-certificate-of-analysis'],
  'aquatool-rpm-rcf': ['method-blank', 'analytical-traceability', 'lims'],
  'aquatool-cfu': ['plaque-assay', 'pfu-plaque-forming-units', 'matrix'],
  'aquatool-recovery-rpd': ['iso-iec-17025', 'method-blank', 'audit-trail'],
  'aquatool-hardness-alkalinity': ['matrix', 'analytical-traceability', 'coa-certificate-of-analysis'],
  'aquatool-chemical-species': ['matrix', 'analytical-traceability', 'coa-certificate-of-analysis']
};

const TOOL_CONTENT = {
  'aquatool-dilution': {
    coreToolId: 'dilution',
    categoryId: 'chemistry',
    icon: 'C1',
    time: '1 min',
    formula: 'C1 x V1 = C2 x V2',
    units: ['M, mM, µM, nM, pM', 'g/L, mg/L, µg/L, ng/L', 'L, mL, µL, nL', 'dilution factor'],
    exampleInputs: { mode: 'direct', cStock: '1', cStockUnit: 'g/L', cTarget: '2', cTargetUnit: 'µg/L', finalVolume: '2', finalVolumeUnit: 'L' },
    expectedResult: '4 µL stock; complete to 2 L final volume.',
    relatedToolIds: ['aquatool-molarity', 'aquatool-unit-converter', 'aquatool-chemical-species'],
    formulaId: 'dilution.direct.v1',
    copy: {
      en: ['Dilution calculator', 'Solve C1V1, prepare from stock or calculate serial dilution steps.', 'Use stock and target concentrations to calculate transfer volume and complete to final volume.', 'Example: 1 g/L stock to 2 µg/L in 2 L gives 4 µL of stock.'],
      es: ['Calculadora de diluciones', 'Resuelve C1V1, prepara desde stock o calcula pasos de dilución seriada.', 'Usa concentraciones stock y objetivo para calcular el volumen transferido y completar hasta volumen final.', 'Ejemplo: 1 g/L a 2 µg/L en 2 L da 4 µL de stock.'],
      fr: ['Calculateur de dilution', 'Résout C1V1, prépare depuis un stock ou calcule une dilution sériée.', 'Utilisez concentrations stock et cible pour calculer le volume transféré et compléter au volume final.', 'Exemple: 1 g/L vers 2 µg/L dans 2 L donne 4 µL de stock.'],
      it: ['Calcolatore diluizioni', 'Risolvi C1V1, prepara da stock o calcola diluizioni seriali.', 'Usa concentrazioni stock e target per calcolare il volume trasferito e completare al volume finale.', 'Esempio: 1 g/L a 2 µg/L in 2 L dà 4 µL di stock.'],
      ca: ['Calculadora de dilucions', 'Resol C1V1, prepara des de stock o calcula passos de dilució seriada.', 'Usa concentracions stock i objectiu per calcular el volum transferit i completar fins al volum final.', 'Exemple: 1 g/L a 2 µg/L en 2 L dona 4 µL de stock.']
    }
  },
  'aquatool-molarity': {
    coreToolId: 'molarity',
    categoryId: 'chemistry',
    icon: 'M',
    time: '1 min',
    formula: 'M = m / (MW x V)',
    units: ['g, mg, µg, ng', 'mol, mmol, µmol, nmol', 'L, mL, µL', 'g/mol'],
    exampleInputs: { mode: 'mass', mass: '0,5', massUnit: 'g', molarMass: '180.16', volume: '500', volumeUnit: 'mL' },
    expectedResult: '0.0055506 M; approximately 5.551 mM.',
    relatedToolIds: ['aquatool-dilution', 'aquatool-unit-converter', 'aquatool-chemical-species'],
    formulaId: 'molarity.mass.v1',
    copy: {
      en: ['Molarity calculator', 'Convert mass, moles or mass concentration into mol/L, mM, µM and nM.', 'Calculate molarity from mass, molar mass and volume without rounding intermediate values.', 'Example: 0.5 g, 180.16 g/mol and 500 mL gives 0.0055506 M.'],
      es: ['Calculadora de molaridad', 'Convierte masa, moles o concentración masa/volumen a mol/L, mM, µM y nM.', 'Calcula molaridad desde masa, masa molar y volumen sin redondear valores intermedios.', 'Ejemplo: 0,5 g, 180,16 g/mol y 500 mL da 0,0055506 M.'],
      fr: ['Calculateur de molarité', 'Convertit masse, moles ou concentration massique en mol/L, mM, µM et nM.', 'Calcule la molarité depuis masse, masse molaire et volume sans arrondir les intermédiaires.', 'Exemple: 0,5 g, 180,16 g/mol et 500 mL donnent 0,0055506 M.'],
      it: ['Calcolatore molarità', 'Converte massa, moli o concentrazione massa/volume in mol/L, mM, µM e nM.', 'Calcola la molarità da massa, massa molare e volume senza arrotondare valori intermedi.', 'Esempio: 0,5 g, 180,16 g/mol e 500 mL danno 0,0055506 M.'],
      ca: ['Calculadora de molaritat', 'Converteix massa, mols o concentració massa/volum a mol/L, mM, µM i nM.', 'Calcula molaritat des de massa, massa molar i volum sense arrodonir intermedis.', 'Exemple: 0,5 g, 180,16 g/mol i 500 mL dona 0,0055506 M.']
    }
  },
  'aquatool-unit-converter': {
    coreToolId: 'unit-converter',
    categoryId: 'chemistry',
    icon: '↔',
    time: '30 s',
    formula: 'value_to = value_from x factor',
    units: ['mass', 'volume', 'moles', 'molarity', 'mass/volume', 'temperature'],
    exampleInputs: { category: 'volume', value: '1', fromUnit: 'mL', toUnit: 'µL', molarMass: '' },
    expectedResult: '1 mL = 1000 µL.',
    relatedToolIds: ['aquatool-molarity', 'aquatool-dilution', 'aquatool-chemical-species'],
    formulaId: 'unit-converter.volume.v1',
    copy: {
      en: ['Laboratory unit converter', 'Convert mass, volume, moles, molarity, mass concentration and temperature units.', 'Use base-unit conversion and explicit molar mass when concentration dimensions change.', 'Example: 1 mL equals 1000 µL and 25 °C equals 77 °F.'],
      es: ['Conversor de unidades de laboratorio', 'Convierte masa, volumen, moles, molaridad, concentración masa/volumen y temperatura.', 'Usa conversión por unidad base y masa molar explícita cuando cambia la dimensión de concentración.', 'Ejemplo: 1 mL equivale a 1000 µL y 25 °C a 77 °F.'],
      fr: ['Convertisseur d’unités laboratoire', 'Convertit masse, volume, moles, molarité, concentration massique et température.', 'Utilise une unité de base et une masse molaire explicite quand la dimension change.', 'Exemple: 1 mL vaut 1000 µL et 25 °C vaut 77 °F.'],
      it: ['Convertitore unità laboratorio', 'Converte massa, volume, moli, molarità, concentrazione massa/volume e temperatura.', 'Usa conversione per unità base e massa molare esplicita quando cambia la dimensione.', 'Esempio: 1 mL equivale a 1000 µL e 25 °C a 77 °F.'],
      ca: ['Conversor d’unitats de laboratori', 'Converteix massa, volum, mols, molaritat, concentració massa/volum i temperatura.', 'Usa unitat base i massa molar explícita quan canvia la dimensió.', 'Exemple: 1 mL equival a 1000 µL i 25 °C a 77 °F.']
    }
  },
  'aquatool-rpm-rcf': {
    coreToolId: 'rpm-rcf',
    categoryId: 'chemistry',
    icon: '×g',
    time: '30 s',
    formula: 'RCF = 1.118 x 10^-5 x r_cm x RPM^2',
    units: ['RPM', 'xg', 'cm rotor radius'],
    exampleInputs: { mode: 'rpm_to_rcf', value: '10000', radiusCm: '8.5' },
    expectedResult: '10000 RPM at 8.5 cm gives approximately 9503 xg.',
    relatedToolIds: ['aquatool-unit-converter', 'aquatool-cfu', 'aquatool-recovery-rpd'],
    formulaId: 'rpm-rcf.rpm_to_rcf.v1',
    copy: {
      en: ['RPM to RCF converter', 'Convert centrifuge RPM to RCF, or RCF back to RPM, using the real rotor radius.', 'Enter the actual radius in cm; the calculator does not invent rotor presets.', 'Example: 10000 RPM and 8.5 cm gives about 9503 xg.'],
      es: ['Conversor RPM a RCF', 'Convierte RPM de centrífuga a RCF, o RCF a RPM, usando el radio real del rotor.', 'Introduce el radio real en cm; la calculadora no inventa presets de rotor.', 'Ejemplo: 10000 RPM y 8,5 cm da unos 9503 xg.'],
      fr: ['Convertisseur RPM vers RCF', 'Convertit RPM en RCF, ou RCF en RPM, avec le rayon réel du rotor.', 'Saisissez le rayon réel en cm; le calculateur n’invente pas de préréglages.', 'Exemple: 10000 RPM et 8,5 cm donnent environ 9503 xg.'],
      it: ['Convertitore RPM a RCF', 'Converte RPM in RCF, o RCF in RPM, usando il raggio reale del rotore.', 'Inserisci il raggio reale in cm; il calcolatore non inventa preset.', 'Esempio: 10000 RPM e 8,5 cm danno circa 9503 xg.'],
      ca: ['Conversor RPM a RCF', 'Converteix RPM de centrífuga a RCF, o RCF a RPM, amb el radi real del rotor.', 'Introdueix el radi real en cm; la calculadora no inventa presets.', 'Exemple: 10000 RPM i 8,5 cm dona prop de 9503 xg.']
    }
  },
  'aquatool-cfu': {
    coreToolId: 'cfu-calculator',
    categoryId: 'microbiology',
    icon: 'CFU',
    time: '1 min',
    formula: 'CFU/mL = colonies / (dilution fraction x plated volume mL)',
    units: ['colonies', '10^-n, 1:n or decimal dilution', 'mL, µL plated volume', 'CFU/mL'],
    exampleInputs: { colonies: '50', dilution: '10^-3', platedVolume: '0,1', platedVolumeUnit: 'mL' },
    expectedResult: '500000 CFU/mL; log10 result is shown when positive.',
    relatedToolIds: ['aquatool-dilution', 'aquatool-recovery-rpd', 'aquatool-rpm-rcf'],
    formulaId: 'cfu-calculator.plate-count.v1',
    copy: {
      en: ['CFU calculator', 'Calculate CFU/mL from colonies, dilution fraction and plated volume.', 'Accepts 10^-3, 1:1000 and decimal dilution notation without interpreting compliance.', 'Example: 50 colonies, 10^-3 and 0.1 mL gives 500000 CFU/mL.'],
      es: ['Calculadora UFC/CFU', 'Calcula UFC/mL desde colonias, fracción de dilución y volumen sembrado.', 'Acepta 10^-3, 1:1000 y notación decimal sin interpretar cumplimiento.', 'Ejemplo: 50 colonias, 10^-3 y 0,1 mL da 500000 UFC/mL.'],
      fr: ['Calculateur UFC/CFU', 'Calcule UFC/mL depuis colonies, fraction de dilution et volume ensemencé.', 'Accepte 10^-3, 1:1000 et notation décimale sans interpréter la conformité.', 'Exemple: 50 colonies, 10^-3 et 0,1 mL donnent 500000 UFC/mL.'],
      it: ['Calcolatore UFC/CFU', 'Calcola UFC/mL da colonie, frazione di diluizione e volume seminato.', 'Accetta 10^-3, 1:1000 e notazione decimale senza interpretare conformità.', 'Esempio: 50 colonie, 10^-3 e 0,1 mL danno 500000 UFC/mL.'],
      ca: ['Calculadora UFC/CFU', 'Calcula UFC/mL des de colònies, fracció de dilució i volum sembrat.', 'Accepta 10^-3, 1:1000 i notació decimal sense interpretar compliment.', 'Exemple: 50 colònies, 10^-3 i 0,1 mL dona 500000 UFC/mL.']
    }
  },
  'aquatool-recovery-rpd': {
    coreToolId: 'recovery-rpd',
    categoryId: 'quality',
    icon: '%',
    time: '1 min',
    formula: 'RPD% = |A - B| / ((A + B) / 2) x 100',
    units: ['same concentration units for paired values', '% recovery', '% bias', '% RPD'],
    exampleInputs: { mode: 'recovery', unspiked: '2,0', spikedMeasured: '6.8', added: '5.0' },
    expectedResult: 'Recovery is 96%; bias is -4%.',
    relatedToolIds: ['aquatool-cfu', 'aquatool-unit-converter', 'aquatool-dilution'],
    formulaId: 'recovery-rpd.recovery.v1',
    copy: {
      en: ['Recovery, bias and RPD calculator', 'Calculate spike recovery, bias and relative percent difference without default acceptance criteria.', 'Enter method-specific criteria only when your SOP defines them.', 'Example: 2.0, 6.8 and 5.0 gives 96% recovery.'],
      es: ['Calculadora de recuperación y RPD', 'Calcula recuperación, sesgo y diferencia porcentual relativa sin criterios por defecto.', 'Introduce criterios del método solo cuando tu SOP los defina.', 'Ejemplo: 2,0, 6,8 y 5,0 da 96% de recuperación.'],
      fr: ['Calculateur récupération et RPD', 'Calcule récupération, biais et différence relative sans critères par défaut.', 'Saisissez des critères méthode uniquement si votre SOP les définit.', 'Exemple: 2,0, 6,8 et 5,0 donnent 96% de récupération.'],
      it: ['Calcolatore recupero e RPD', 'Calcola recupero, bias e differenza percentuale relativa senza criteri predefiniti.', 'Inserisci criteri di metodo solo se definiti dalla SOP.', 'Esempio: 2,0, 6,8 e 5,0 danno recupero 96%.'],
      ca: ['Calculadora de recuperació i RPD', 'Calcula recuperació, biaix i diferència percentual relativa sense criteris per defecte.', 'Introdueix criteris de mètode només si el teu SOP els defineix.', 'Exemple: 2,0, 6,8 i 5,0 dona 96% de recuperació.']
    }
  },
  'aquatool-hardness-alkalinity': {
    coreToolId: 'hardness-alkalinity',
    categoryId: 'water',
    icon: 'CaCO3',
    time: '1 min',
    formula: 'Hardness as CaCO3 = Ca x 2.497 + Mg x 4.118',
    units: ['Ca mg/L', 'Mg mg/L', 'meq/L', 'mL sample', 'N acid', 'mg/L as CaCO3'],
    exampleInputs: { mode: 'hardness', ca: '40', mg: '12' },
    expectedResult: '149.296 mg/L as CaCO3.',
    relatedToolIds: ['aquatool-chemical-species', 'aquatool-unit-converter', 'aquatool-recovery-rpd'],
    formulaId: 'hardness-alkalinity.hardness.v1',
    copy: {
      en: ['Hardness and alkalinity calculator', 'Calculate hardness from Ca and Mg, CaCO3 equivalents or alkalinity from titration.', 'Reports as mg/L as CaCO3 without regulatory classification.', 'Example: Ca 40 mg/L and Mg 12 mg/L gives 149.296 mg/L as CaCO3.'],
      es: ['Calculadora de dureza y alcalinidad', 'Calcula dureza desde Ca y Mg, equivalentes CaCO3 o alcalinidad por titulación.', 'Informa mg/L como CaCO3 sin clasificación normativa.', 'Ejemplo: Ca 40 mg/L y Mg 12 mg/L da 149,296 mg/L como CaCO3.'],
      fr: ['Calculateur dureté et alcalinité', 'Calcule la dureté depuis Ca et Mg, équivalents CaCO3 ou alcalinité par titrage.', 'Rapporte en mg/L comme CaCO3 sans classification réglementaire.', 'Exemple: Ca 40 mg/L et Mg 12 mg/L donnent 149,296 mg/L comme CaCO3.'],
      it: ['Calcolatore durezza e alcalinità', 'Calcola durezza da Ca e Mg, equivalenti CaCO3 o alcalinità da titolazione.', 'Riporta mg/L come CaCO3 senza classificazione normativa.', 'Esempio: Ca 40 mg/L e Mg 12 mg/L danno 149,296 mg/L come CaCO3.'],
      ca: ['Calculadora de duresa i alcalinitat', 'Calcula duresa des de Ca i Mg, equivalents CaCO3 o alcalinitat per titulació.', 'Informa mg/L com CaCO3 sense classificació normativa.', 'Exemple: Ca 40 mg/L i Mg 12 mg/L dona 149,296 mg/L com CaCO3.']
    }
  },
  'aquatool-chemical-species': {
    coreToolId: 'chemical-species-converter',
    categoryId: 'water',
    icon: 'NO3',
    time: '30 s',
    formula: 'target = source x MWtarget / MWsource',
    units: ['NO3, NO3-N', 'PO4, PO4-P', 'NH4, NH4-N', 'NO2, NO2-N', 'mg/L, µg/L'],
    exampleInputs: { value: '10', unit: 'mg/L', fromSpecies: 'NO3', toSpecies: 'NO3-N' },
    expectedResult: '10 mg/L NO3 is approximately 2.259 mg/L NO3-N.',
    relatedToolIds: ['aquatool-hardness-alkalinity', 'aquatool-unit-converter', 'aquatool-dilution'],
    formulaId: 'chemical-species-converter.mass-ratio.v1',
    copy: {
      en: ['Chemical species converter', 'Convert nutrient reporting forms such as nitrate to nitrate-nitrogen.', 'Uses versioned molar mass ratios and does not compare with legal limits.', 'Example: 10 mg/L NO3 gives about 2.259 mg/L NO3-N.'],
      es: ['Conversor de especies químicas', 'Convierte formas de reporte de nutrientes, por ejemplo nitrato a nitrógeno-nitrato.', 'Usa ratios de masa molar versionados y no compara con límites legales.', 'Ejemplo: 10 mg/L NO3 da unos 2,259 mg/L NO3-N.'],
      fr: ['Convertisseur d’espèces chimiques', 'Convertit les formes de nutriments, par exemple nitrate vers azote nitrique.', 'Utilise des ratios de masse molaire versionnés et ne compare pas aux limites légales.', 'Exemple: 10 mg/L NO3 donnent environ 2,259 mg/L NO3-N.'],
      it: ['Convertitore specie chimiche', 'Converte forme di nutrienti, ad esempio nitrato in azoto nitrico.', 'Usa rapporti di massa molare versionati e non confronta limiti legali.', 'Esempio: 10 mg/L NO3 danno circa 2,259 mg/L NO3-N.'],
      ca: ['Conversor d’espècies químiques', 'Converteix formes de nutrients, per exemple nitrat a nitrogen-nitrat.', 'Usa ràtios de massa molar versionades i no compara amb límits legals.', 'Exemple: 10 mg/L NO3 dona prop de 2,259 mg/L NO3-N.']
    }
  }
};

function aquatoolsLocale(path, title, description, sections, options = {}) {
  return {
    ...locale(path, title, description, sections, options),
    aquatools: options.aquatools,
    cta: options.cta,
    dateModified: AQUATOOLS_DATE_MODIFIED
  };
}

function toolFaqs(lang) {
  const labels = AQUATOOLS_COPY[lang] || AQUATOOLS_COPY.en;
  const text = {
    en: [
      ['Are my inputs stored?', labels.privacy],
      ['Can I use this as an official method record?', labels.disclaimer],
      ['Where do saved calculations live?', labels.cloudBody]
    ],
    es: [
      ['¿Se guardan mis entradas?', labels.privacy],
      ['¿Puedo usarlo como registro oficial del método?', labels.disclaimer],
      ['¿Dónde se guardan los cálculos?', labels.cloudBody]
    ],
    fr: [
      ['Mes entrées sont-elles stockées?', labels.privacy],
      ['Puis-je l’utiliser comme enregistrement officiel?', labels.disclaimer],
      ['Où vivent les calculs enregistrés?', labels.cloudBody]
    ],
    it: [
      ['Gli input vengono salvati?', labels.privacy],
      ['Posso usarlo come record ufficiale?', labels.disclaimer],
      ['Dove stanno i calcoli salvati?', labels.cloudBody]
    ],
    ca: [
      ['Es desen les meves entrades?', labels.privacy],
      ['Puc usar-ho com a registre oficial?', labels.disclaimer],
      ['On es desen els càlculs?', labels.cloudBody]
    ]
  }[lang] || [];

  return text.map(([question, answer]) => ({ question, answer }));
}

function hubFaqs(lang) {
  const labels = AQUATOOLS_COPY[lang] || AQUATOOLS_COPY.en;
  const localized = {
    en: [
      ['What is AquaTools Free?', 'A public hub of browser-based calculators for routine laboratory and water-quality calculations.'],
      ['Does AquaTools Free require registration?', 'No. The public calculators run without login and do not store calculation values.'],
      ['What stays in AquaVerify Cloud?', labels.cloudBody]
    ],
    es: [
      ['¿Qué es AquaTools Free?', 'Un hub público de calculadoras en navegador para cálculos rutinarios de laboratorio y calidad del agua.'],
      ['¿AquaTools Free requiere registro?', 'No. Las calculadoras públicas funcionan sin login y no guardan valores de cálculo.'],
      ['¿Qué queda en AquaVerify Cloud?', labels.cloudBody]
    ],
    fr: [
      ['Qu’est-ce qu’AquaTools Free?', 'Un hub public de calculateurs navigateur pour les calculs de laboratoire et qualité eau.'],
      ['AquaTools Free exige-t-il une inscription?', 'Non. Les calculateurs publics fonctionnent sans login et ne stockent pas les valeurs.'],
      ['Qu’est-ce qui reste dans AquaVerify Cloud?', labels.cloudBody]
    ],
    it: [
      ['Che cos’è AquaTools Free?', 'Un hub pubblico di calcolatori nel browser per calcoli di laboratorio e qualità dell’acqua.'],
      ['AquaTools Free richiede registrazione?', 'No. I calcolatori pubblici funzionano senza login e non salvano valori.'],
      ['Cosa resta in AquaVerify Cloud?', labels.cloudBody]
    ],
    ca: [
      ['Què és AquaTools Free?', 'Un hub públic de calculadores al navegador per a càlculs de laboratori i qualitat de l’aigua.'],
      ['AquaTools Free requereix registre?', 'No. Les calculadores públiques funcionen sense login i no desen valors.'],
      ['Què queda a AquaVerify Cloud?', labels.cloudBody]
    ]
  };
  return localized[lang];
}

function toolContent(id, lang) {
  const tool = TOOL_CONTENT[id];
  const labels = AQUATOOLS_COPY[lang] || AQUATOOLS_COPY.en;
  const [title, description, directAnswer, exampleText] = tool.copy[lang] || tool.copy.en;
  const seoTitle = `${title} | AquaTools Free`;
  const fullTool = {
    id,
    ...tool,
    labels,
    directAnswer,
    exampleText,
    privacy: labels.privacy,
    disclaimer: labels.disclaimer,
    sourceRefs: SOURCE_REFS,
    glossaryTermIds: TOOL_GLOSSARY_IDS[id] || ['analytical-traceability', 'lims'],
    industryIds: SHARED_LINKS.industryIds,
    resourceIds: SHARED_LINKS.resourceIds,
    productIds: SHARED_LINKS.productIds,
    calculationVersion: AQUATOOLS_CALCULATION_VERSION
  };

  return aquatoolsLocale(
    AQUATOOLS_ROUTE_PATHS[id][lang],
    title,
    description,
    [
      section(labels.formula, tool.formula, tool.units),
      section(labels.example, exampleText, [tool.expectedResult]),
      section(labels.limitations, labels.disclaimer)
    ],
    {
      eyebrow: `AquaTools Free · ${labels.categories[tool.categoryId]}`,
      primaryCta: labels.calculate,
      secondaryCta: labels.primaryCta,
      seoTitle,
      seoDescription: `${description} Formula, variables, warnings and browser-only calculation are visible on the page.`,
      ogImage: `/images/social/${id.replace('aquatool-', 'aquatools-')}.png`,
      faqs: toolFaqs(lang),
      aquatools: fullTool
    }
  );
}

function hubContent(lang) {
  const labels = AQUATOOLS_COPY[lang] || AQUATOOLS_COPY.en;
  return aquatoolsLocale(
    AQUATOOLS_ROUTE_PATHS.aquatools[lang],
    labels.hubTitle,
    labels.hubDescription,
    [
      section(labels.howTitle, labels.hubDescription, AQUATOOLS_TOOL_DEFINITIONS.map((tool) => tool.copy[lang][0])),
      section(labels.privacyTitle, labels.privacy),
      section(labels.cloudTitle, labels.cloudBody)
    ],
    {
      eyebrow: 'AquaTools Free',
      primaryCta: labels.search,
      secondaryCta: labels.primaryCta,
      seoTitle: `${labels.hubTitle} | AquaVerify`,
      seoDescription: labels.hubDescription,
      ogImage: '/images/social/aquatools-free.png',
      faqs: hubFaqs(lang),
      aquatools: {
        labels,
        toolCount: AQUATOOLS_APPROVED_TOOL_IDS.length,
        calculationVersion: AQUATOOLS_CALCULATION_VERSION,
        privacy: labels.privacy,
        disclaimer: labels.disclaimer,
        glossaryTermIds: ['analytical-traceability', 'lims', 'matrix', 'plaque-assay', 'iso-iec-17025']
      }
    }
  );
}

export const AQUATOOLS_TOOL_DEFINITIONS = AQUATOOLS_APPROVED_TOOL_IDS.map((id) => ({
  id,
  ...TOOL_CONTENT[id]
}));

export const AQUATOOLS_MARKETING_PAGES = [
  page('aquatools', 'aquatools', 'tools', Object.fromEntries(
    MARKETING_LANGUAGES.map((lang) => [lang, hubContent(lang)])
  ), {
    schemaType: 'AquaToolsCollection',
    dateModified: AQUATOOLS_DATE_MODIFIED
  }),
  ...AQUATOOLS_APPROVED_TOOL_IDS.map((id) => page(id, 'aquatools', 'tools', Object.fromEntries(
    MARKETING_LANGUAGES.map((lang) => [lang, toolContent(id, lang)])
  ), {
    parentId: 'aquatools',
    schemaType: 'AquaTool',
    dateModified: AQUATOOLS_DATE_MODIFIED
  }))
];
