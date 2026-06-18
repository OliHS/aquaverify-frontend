import { getResourcesHubSeo } from '../resourcesHubContent.js';
import {
  WHITEPAPER_MARKDOWN_PAGE_IDS,
  getWhitepaperMarkdownPage
} from '../whitepaperMarkdownContent.js';
import { MARKETING_LANGUAGES, locale, page, section } from './shared.js';

const RESOURCE_HUB_PATHS = {
  en: '/resources',
  es: '/es/recursos',
  fr: '/fr/ressources',
  it: '/it/risorse',
  ca: '/ca/recursos'
};

function buildResourcesHubLocale(lang) {
  const hub = getResourcesHubSeo(lang);
  return locale(
    RESOURCE_HUB_PATHS[lang] || RESOURCE_HUB_PATHS.en,
    hub.title,
    hub.description,
    [
      section(hub.title, hub.description, [
        hub.primaryCta,
        hub.secondaryCta
      ])
    ],
    {
      eyebrow: hub.eyebrow,
      primaryCta: hub.primaryCta,
      secondaryCta: hub.secondaryCta,
      seoTitle: hub.seoTitle,
      seoDescription: hub.seoDescription,
      faqs: hub.faqs
    }
  );
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

export const RESOURCE_CORE_MARKETING_PAGES = [
  page('resources', 'resources', 'quote', Object.fromEntries(
    MARKETING_LANGUAGES.map((lang) => [lang, buildResourcesHubLocale(lang)])
  ), { schemaType: 'resourcesHub' }),
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
  }, { parentId: 'resources' })
];

const PRIORITY_WHITEPAPER_PATHS = {
  'aquaverify-product-selection-guide': {
    en: '/resources/choose-aquaverify-product-water-microbiology',
    es: '/es/recursos/guia-elegir-producto-aquaverify',
    fr: '/fr/ressources/choisir-produit-aquaverify-microbiologie-eau',
    it: '/it/risorse/scegliere-prodotto-aquaverify-microbiologia-acqua',
    ca: '/ca/recursos/triar-producte-aquaverify-microbiologia-aigua'
  },
  'rd-3-2023-somatic-coliphages-guide': {
    en: '/resources/rd-3-2023-somatic-coliphages-water-operators',
    es: '/es/recursos/rd-3-2023-colifagos-somaticos',
    fr: '/fr/ressources/rd-3-2023-coliphages-somatiques-operateurs-eau',
    it: '/it/risorse/rd-3-2023-colifagi-somatici-operatori-acqua',
    ca: '/ca/recursos/rd-3-2023-colifags-somatics-operadors-aigua'
  },
  'iso-17025-water-laboratories-guide': {
    en: '/resources/iso-17025-water-laboratories-chain-of-custody-coa',
    es: '/es/recursos/iso-17025-laboratorios-analisis-agua',
    fr: '/fr/ressources/iso-17025-laboratoires-eau-chaine-custodie-coa',
    it: '/it/risorse/iso-17025-laboratori-acqua-catena-custodia-coa',
    ca: '/ca/recursos/iso-17025-laboratoris-aigua-cadena-custodia-coa'
  },
  'water-safety-plans-traceable-control': {
    en: '/resources/water-safety-plans-traceable-control-program',
    es: '/es/recursos/water-safety-plans-calidad-agua',
    fr: '/fr/ressources/water-safety-plans-programme-controle-tracable',
    it: '/it/risorse/water-safety-plans-programma-controllo-tracciabile',
    ca: '/ca/recursos/water-safety-plans-programa-control-tracable'
  },
  'food-beverage-water-microbiology-guide': {
    en: '/resources/food-beverage-water-microbiological-control-cip-audit',
    es: '/es/recursos/agua-industria-alimentaria-rd-3-2023',
    fr: '/fr/ressources/eau-alimentation-boissons-controle-microbiologique-cip-audit',
    it: '/it/risorse/acqua-alimenti-bevande-controllo-microbiologico-cip-audit',
    ca: '/ca/recursos/aigua-alimentacio-begudes-control-microbiologic-cip-auditoria'
  },
  'legionella-facility-water-risk-guide': {
    en: '/resources/legionella-water-risk-management-facilities',
    es: '/es/recursos/legionella-gestion-riesgo-instalaciones',
    fr: '/fr/ressources/legionella-gestion-risque-eau-installations',
    it: '/it/risorse/legionella-gestione-rischio-acqua-strutture',
    ca: '/ca/recursos/legionella-gestio-risc-aigua-instalacions'
  },
  'iso-19458-water-microbiological-sampling': {
    en: '/resources/iso-19458-water-microbiological-sampling',
    es: '/es/recursos/iso-19458-muestreo-microbiologico-agua',
    fr: '/fr/ressources/iso-19458-echantillonnage-microbiologique-eau',
    it: '/it/risorse/iso-19458-campionamento-microbiologico-acqua',
    ca: '/ca/recursos/iso-19458-mostreig-microbiologic-aigua'
  },
  'excel-to-lims-water-analysis': {
    en: '/resources/excel-to-lims-water-analysis',
    es: '/es/recursos/excel-a-lims-analisis-agua',
    fr: '/fr/ressources/excel-vers-lims-analyse-eau',
    it: '/it/risorse/da-excel-a-lims-analisi-acqua',
    ca: '/ca/recursos/excel-a-lims-analisi-aigua'
  },
  'oem-white-label-water-testing-kits': {
    en: '/resources/oem-white-label-water-testing-kits',
    es: '/es/recursos/oem-kits-analisis-agua-marca-blanca',
    fr: '/fr/ressources/oem-marque-blanche-kits-analyse-eau',
    it: '/it/risorse/oem-white-label-kit-analisi-acqua',
    ca: '/ca/recursos/oem-marca-blanca-kits-analisi-aigua'
  },
  'aquacoli-enumera-coli100-validation': {
    en: '/resources/aquacoli-enumera-coli100-iso-9308-2-validation',
    es: '/es/recursos/validacion-aquacoli-enumera-coli100-iso-9308-2',
    fr: '/fr/ressources/validation-aquacoli-enumera-coli100-iso-9308-2',
    it: '/it/risorse/validazione-aquacoli-enumera-coli100-iso-9308-2',
    ca: '/ca/recursos/validacio-aquacoli-enumera-coli100-iso-9308-2'
  },
  'urban-wastewater-wbe-multiviral-valencian-region': {
    en: '/resources/urban-wastewater-wbe-multiviral-valencian-region',
    es: '/es/recursos/epidemiologia-aguas-residuales-vigilancia-multiviral-valencia',
    fr: '/fr/ressources/epidemiologie-eaux-usees-surveillance-multivirale-valence',
    it: '/it/risorse/epidemiologia-acque-reflue-sorveglianza-multivirale-valencia',
    ca: '/ca/recursos/epidemiologia-aigues-residuals-vigilancia-multiviral-valencia'
  },
  'viral-pollution-wastewater-mediterranean-ecosystems': {
    en: '/resources/viral-pollution-wastewater-mediterranean-ecosystems',
    es: '/es/recursos/contaminacion-viral-aguas-residuales-ecosistemas-mediterraneos',
    fr: '/fr/ressources/pollution-virale-eaux-usees-ecosystemes-mediterraneens',
    it: '/it/risorse/inquinamento-virale-acque-reflue-ecosistemi-mediterranei',
    ca: '/ca/recursos/contaminacio-viral-aigues-residuals-ecosistemes-mediterranis'
  },
  'sars-cov-2-surrogates-decay-aquatic-environments': {
    en: '/resources/sars-cov-2-surrogates-decay-aquatic-environments',
    es: '/es/recursos/decaimiento-sars-cov-2-sustitutos-ambientes-acuaticos',
    fr: '/fr/ressources/decroissance-sars-cov-2-substituts-milieux-aquatiques',
    it: '/it/risorse/decadimento-sars-cov-2-surrogati-ambienti-acquatici',
    ca: '/ca/recursos/decaiment-sars-cov-2-substituts-ambients-aquatics'
  },
  'somatic-coliphage-method-comparison-water': {
    en: '/resources/somatic-coliphage-method-comparison-water',
    es: '/es/recursos/comparativa-metodos-colifagos-somaticos-agua',
    fr: '/fr/ressources/comparaison-methodes-coliphages-somatiques-eau',
    it: '/it/risorse/confronto-metodi-colifagi-somatici-acqua',
    ca: '/ca/recursos/comparativa-metodes-colifags-somatics-aigua'
  },
  'enteric-viruses-antibiotic-resistance-genes-mussels': {
    en: '/resources/enteric-viruses-antibiotic-resistance-genes-mussels',
    es: '/es/recursos/virus-entericos-genes-resistencia-antibioticos-mejillones',
    fr: '/fr/ressources/virus-enteriques-genes-resistance-antibiotiques-moules',
    it: '/it/risorse/virus-enterici-geni-resistenza-antibiotici-cozze',
    ca: '/ca/recursos/virus-enterics-gens-resistencia-antibiotics-musclos'
  },
  'editorial-methodology': {
    en: '/resources/editorial-methodology',
    es: '/es/recursos/metodologia-editorial',
    fr: '/fr/ressources/methodologie-editoriale',
    it: '/it/risorse/metodologia-editoriale',
    ca: '/ca/recursos/metodologia-editorial'
  }
};

const PRIORITY_WHITEPAPER_CTA_LABELS = {
  en: ['Request technical recommendation', 'Explore resources'],
  es: ['Solicitar recomendación técnica', 'Explorar recursos'],
  fr: ['Demander une recommandation technique', 'Explorer les ressources'],
  it: ['Richiedi raccomandazione tecnica', 'Esplora risorse'],
  ca: ['Sol·licitar recomanació tècnica', 'Explorar recursos']
};

function buildPriorityWhitepaperPages() {
  return Object.entries(PRIORITY_WHITEPAPER_PATHS).map(([pageId, paths]) => page(
    pageId,
    'resources',
    pageId === 'iso-17025-water-laboratories-guide' ? 'saas' : 'quote',
    Object.fromEntries(MARKETING_LANGUAGES.map((lang) => {
      const whitepaper = getWhitepaperMarkdownPage(pageId, lang);
      const [primaryCta, secondaryCta] = PRIORITY_WHITEPAPER_CTA_LABELS[lang] || PRIORITY_WHITEPAPER_CTA_LABELS.en;
      return [lang, locale(
        paths[lang] || paths.en,
        whitepaper?.title || 'AquaVerify technical whitepaper',
        whitepaper?.metaDescription || 'AquaVerify technical whitepaper for water microbiology, traceability and product selection.',
        [],
        {
          eyebrow: 'Whitepaper',
          primaryCta,
          secondaryCta,
          seoTitle: whitepaper?.metaTitle,
          seoDescription: whitepaper?.metaDescription,
          faqs: whitepaper?.faqs || []
        }
      )];
    })),
    {
      parentId: 'resources',
      schemaType: 'TechArticle'
    }
  ));
}

export const RESOURCE_PRIORITY_MARKETING_PAGES = buildPriorityWhitepaperPages();

const MARKDOWN_WHITEPAPER_FAQS = {
  en: {
    'coliphages-indicators': [
      { question: 'Do coliphages replace E. coli or enterococci monitoring?', answer: 'No. Coliphages add a viral-indicator layer. Bacterial indicators remain important and should be interpreted according to the applicable method, matrix and quality system.' },
      { question: 'What should a laboratory define before adding coliphages?', answer: 'Define the matrix, monitoring objective, reference method, volume, host strain, controls, reading criteria and documentary traceability needed for review and reporting.' }
    ],
    'eu-drinking-water-directive-coliphages': [
      { question: 'Does the EU Drinking Water Directive make every coliphage workflow automatically applicable?', answer: 'No. Applicability depends on the water matrix, risk assessment, competent authority expectations, laboratory scope and selected reference method.' },
      { question: 'How can AquaVerify support EU-oriented workflows?', answer: 'AquaVerify can help connect products, laboratory essentials and AquaVerify Cloud so sampling plans, treatment evidence, reviews and reports stay traceable.' }
    ],
    'water-compliance-software-guide': [
      { question: 'Does software replace method validation or accreditation?', answer: 'No. Software organizes evidence, audit trail, reports and customer context. Methods, training, validation, accreditation and regulatory review remain the responsibility of each organization.' },
      { question: 'When should a team evaluate AquaVerify Cloud?', answer: 'Evaluate a connected layer when samples, lots, methods, reviews, CoA, portal access or customer communication are becoming difficult to reconstruct across spreadsheets and separate tools.' }
    ],
    'us-drinking-water-compliance-coliform-rule': [
      { question: 'Is RTCR the same as EPA Method 1601 or 1602?', answer: 'No. RTCR focuses on total coliform and E. coli monitoring in public water systems. EPA Methods 1601 and 1602 belong to coliphage testing contexts.' },
      { question: 'What should US teams confirm before positioning a workflow?', answer: 'Confirm the applicable authority, state requirements, matrix, method, sample volume, quality controls and whether the discussion relates to RTCR, the Ground Water Rule or an internal program.' }
    ]
  },
  es: {
    'coliphages-indicators': [
      { question: '¿Los colífagos sustituyen la monitorización de E. coli o enterococos?', answer: 'No. Los colífagos añaden una capa de indicador viral. Los indicadores bacterianos siguen siendo importantes y deben interpretarse según método, matriz y sistema de calidad aplicables.' },
      { question: '¿Qué debe definir un laboratorio antes de añadir colífagos?', answer: 'Debe definir matriz, objetivo de monitorización, método de referencia, volumen, cepa huésped, controles, criterios de lectura y trazabilidad documental para revisión e informe.' }
    ],
    'eu-drinking-water-directive-coliphages': [
      { question: '¿La Directiva europea hace aplicable automáticamente cualquier flujo de colífagos?', answer: 'No. La aplicabilidad depende de la matriz, evaluación de riesgo, expectativas de la autoridad competente, alcance del laboratorio y método de referencia seleccionado.' },
      { question: '¿Cómo puede ayudar AquaVerify en flujos orientados a la UE?', answer: 'AquaVerify puede conectar productos, materiales de laboratorio y AquaVerify Cloud para mantener trazables planes de muestreo, evidencia de tratamiento, revisiones e informes.' }
    ],
    'water-compliance-software-guide': [
      { question: '¿El software sustituye la validación de método o la acreditación?', answer: 'No. El software organiza evidencia, audit trail, informes y contexto cliente. Métodos, formación, validación, acreditación y revisión regulatoria siguen dependiendo de cada organización.' },
      { question: '¿Cuándo conviene evaluar AquaVerify Cloud?', answer: 'Cuando muestras, lotes, métodos, revisiones, CoA, acceso de clientes o comunicación son difíciles de reconstruir entre hojas de cálculo y herramientas separadas.' }
    ],
    'us-drinking-water-compliance-coliform-rule': [
      { question: '¿RTCR es lo mismo que EPA Method 1601 o 1602?', answer: 'No. RTCR se centra en coliformes totales y E. coli en sistemas públicos de agua. EPA Methods 1601 y 1602 pertenecen a contextos de análisis de colífagos.' },
      { question: '¿Qué debe confirmar un equipo en Estados Unidos antes de posicionar un flujo?', answer: 'Debe confirmar autoridad aplicable, requisitos estatales, matriz, método, volumen de muestra, controles de calidad y si la conversación se refiere a RTCR, Ground Water Rule o un programa interno.' }
    ]
  },
  fr: {
    'coliphages-indicators': [
      { question: 'Les coliphages remplacent-ils le suivi E. coli ou entérocoques?', answer: 'Non. Les coliphages ajoutent une couche d’indicateur viral. Les indicateurs bactériens restent importants et doivent être interprétés selon méthode, matrice et système qualité applicables.' },
      { question: 'Que définir avant d’ajouter les coliphages?', answer: 'Il faut définir matrice, objectif de surveillance, méthode de référence, volume, souche hôte, contrôles, critères de lecture et traçabilité documentaire.' }
    ],
    'eu-drinking-water-directive-coliphages': [
      { question: 'La Directive européenne rend-elle tout flux coliphages automatiquement applicable?', answer: 'Non. L’applicabilité dépend de la matrice, de l’évaluation des risques, des attentes de l’autorité compétente, du périmètre laboratoire et de la méthode choisie.' },
      { question: 'Comment AquaVerify soutient-il les flux orientés UE?', answer: 'AquaVerify peut connecter produits, essentiels laboratoire et AquaVerify Cloud pour garder traçables plans de prélèvement, preuve de traitement, revues et rapports.' }
    ],
    'water-compliance-software-guide': [
      { question: 'Le logiciel remplace-t-il validation méthode ou accréditation?', answer: 'Non. Le logiciel organise preuve, piste d’audit, rapports et contexte client. Méthodes, formation, validation, accréditation et revue réglementaire restent propres à chaque organisation.' },
      { question: 'Quand évaluer AquaVerify Cloud?', answer: 'Lorsque échantillons, lots, méthodes, revues, CoA, accès client ou communication deviennent difficiles à reconstruire entre tableurs et outils séparés.' }
    ],
    'us-drinking-water-compliance-coliform-rule': [
      { question: 'La RTCR est-elle identique aux méthodes EPA 1601 ou 1602?', answer: 'Non. La RTCR porte sur coliformes totaux et E. coli dans les systèmes publics d’eau. Les méthodes EPA 1601 et 1602 relèvent des contextes coliphages.' },
      { question: 'Que doit confirmer une équipe américaine?', answer: 'L’autorité applicable, les exigences de l’État, la matrice, la méthode, le volume, les contrôles qualité et le contexte: RTCR, Ground Water Rule ou programme interne.' }
    ]
  },
  it: {
    'coliphages-indicators': [
      { question: 'I colifagi sostituiscono il monitoraggio di E. coli o enterococchi?', answer: 'No. I colifagi aggiungono uno strato di indicatore virale. Gli indicatori batterici restano importanti e vanno interpretati secondo metodo, matrice e sistema qualità applicabili.' },
      { question: 'Cosa definire prima di aggiungere i colifagi?', answer: 'Matrice, obiettivo di monitoraggio, metodo di riferimento, volume, ceppo ospite, controlli, criteri di lettura e tracciabilità documentale.' }
    ],
    'eu-drinking-water-directive-coliphages': [
      { question: 'La Direttiva europea rende automaticamente applicabile ogni workflow colifagi?', answer: 'No. L’applicabilità dipende da matrice, valutazione del rischio, aspettative dell’autorità competente, ambito del laboratorio e metodo scelto.' },
      { question: 'Come supporta AquaVerify i flussi orientati UE?', answer: 'AquaVerify può collegare prodotti, materiali di laboratorio e AquaVerify Cloud per rendere tracciabili piani di campionamento, evidenza di trattamento, revisioni e report.' }
    ],
    'water-compliance-software-guide': [
      { question: 'Il software sostituisce validazione metodo o accreditamento?', answer: 'No. Il software organizza evidenza, audit trail, report e contesto cliente. Metodi, formazione, validazione, accreditamento e revisione normativa restano responsabilità dell’organizzazione.' },
      { question: 'Quando valutare AquaVerify Cloud?', answer: 'Quando campioni, lotti, metodi, revisioni, CoA, accesso cliente o comunicazione diventano difficili da ricostruire tra fogli di calcolo e strumenti separati.' }
    ],
    'us-drinking-water-compliance-coliform-rule': [
      { question: 'RTCR è la stessa cosa dei metodi EPA 1601 o 1602?', answer: 'No. RTCR riguarda coliformi totali ed E. coli nei sistemi idrici pubblici. I metodi EPA 1601 e 1602 appartengono ai contesti di analisi dei colifagi.' },
      { question: 'Cosa deve confermare un team statunitense?', answer: 'Autorità applicabile, requisiti dello Stato, matrice, metodo, volume, controlli qualità e se il contesto riguarda RTCR, Ground Water Rule o programma interno.' }
    ]
  },
  ca: {
    'coliphages-indicators': [
      { question: 'Els colífags substitueixen el monitoratge d’E. coli o enterococs?', answer: 'No. Els colífags afegeixen una capa d’indicador viral. Els indicadors bacterians continuen sent importants i s’han d’interpretar segons mètode, matriu i sistema de qualitat aplicables.' },
      { question: 'Què cal definir abans d’afegir colífags?', answer: 'Matriu, objectiu de monitoratge, mètode de referència, volum, soca hoste, controls, criteris de lectura i traçabilitat documental.' }
    ],
    'eu-drinking-water-directive-coliphages': [
      { question: 'La Directiva europea fa aplicable automàticament qualsevol flux de colífags?', answer: 'No. L’aplicabilitat depèn de la matriu, l’avaluació de risc, l’autoritat competent, l’abast del laboratori i el mètode seleccionat.' },
      { question: 'Com ajuda AquaVerify en fluxos orientats a la UE?', answer: 'AquaVerify pot connectar productes, materials de laboratori i AquaVerify Cloud per mantenir traçables plans de mostreig, evidència de tractament, revisions i informes.' }
    ],
    'water-compliance-software-guide': [
      { question: 'El software substitueix la validació de mètode o l’acreditació?', answer: 'No. El software organitza evidència, audit trail, informes i context client. Mètodes, formació, validació, acreditació i revisió regulatòria continuen depenent de cada organització.' },
      { question: 'Quan convé avaluar AquaVerify Cloud?', answer: 'Quan mostres, lots, mètodes, revisions, CoA, accés de clients o comunicació són difícils de reconstruir entre fulls de càlcul i eines separades.' }
    ],
    'us-drinking-water-compliance-coliform-rule': [
      { question: 'RTCR és el mateix que EPA Method 1601 o 1602?', answer: 'No. RTCR se centra en coliformes totals i E. coli en sistemes públics d’aigua. EPA Methods 1601 i 1602 pertanyen a contextos d’anàlisi de colífags.' },
      { question: 'Què ha de confirmar un equip als Estats Units?', answer: 'Autoritat aplicable, requisits estatals, matriu, mètode, volum, controls de qualitat i si la conversa es refereix a RTCR, Ground Water Rule o programa intern.' }
    ]
  }
};

function markdownWhitepaperFaqs(pageId, lang) {
  return MARKDOWN_WHITEPAPER_FAQS[lang]?.[pageId] || MARKDOWN_WHITEPAPER_FAQS.en?.[pageId] || [];
}

function applyMarkdownWhitepaperPages(pages) {
  for (const pageId of WHITEPAPER_MARKDOWN_PAGE_IDS) {
    const page = pages.find((item) => item.id === pageId);
    if (!page) continue;

    page.schemaType = 'TechArticle';

    for (const lang of MARKETING_LANGUAGES) {
      const whitepaper = getWhitepaperMarkdownPage(pageId, lang);
      const current = page.translations?.[lang];
      if (!whitepaper || !current) continue;

      page.translations[lang] = {
        ...current,
        title: whitepaper.title || current.title,
        description: whitepaper.metaDescription || current.description,
        sections: [],
        primaryCta: whitepaper.primaryCta?.label || current.primaryCta,
        secondaryCta: whitepaper.secondaryCta?.label || current.secondaryCta,
        seoTitle: whitepaper.metaTitle || current.seoTitle || whitepaper.title || current.title,
        seoDescription: whitepaper.metaDescription || current.seoDescription || current.description,
        faqs: whitepaper.faqs?.length ? whitepaper.faqs : markdownWhitepaperFaqs(pageId, lang),
        whitepaper: undefined,
        markdownWhitepaper: whitepaper
      };
    }
  }
  return pages;
}

export const RESOURCE_MARKETING_PAGES = applyMarkdownWhitepaperPages([
  ...RESOURCE_CORE_MARKETING_PAGES,
  ...RESOURCE_PRIORITY_MARKETING_PAGES
]);
