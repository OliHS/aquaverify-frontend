import React from 'react';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  FlaskConical,
  Layers3,
  ShieldCheck
} from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieConsent } from './CookieConsent';
import { IndustryGlossaryTerms } from './IndustryGlossaryTerms';
import { MarketingLeadFormControls } from './MarketingLeadFormControls';
import type { Language } from '../utils/translations';
import { getPlatformSignupUrl } from '../utils/platformLinks';
import { trackCorporateEvent } from '../utils/corporateAnalytics';
import { useMarketingLeadCapture } from '../utils/marketingLeadCapture';

type MarketingSection = {
  title: string;
  body: string;
  bullets?: string[];
};

type DirectAnswerContent = {
  title: string;
  body: string;
};

type TechnicalTableContent = {
  title?: string;
  columns: string[];
  rows: string[][];
};

type MarketingContent = {
  path: string;
  title: string;
  description: string;
  directAnswer?: DirectAnswerContent;
  eyebrow?: string;
  primaryCta?: string;
  secondaryCta?: string;
  sections?: MarketingSection[];
  faqs?: Array<{ question: string; answer: string }>;
  technicalTable?: TechnicalTableContent;
};

type Props = {
  content: MarketingContent;
  pageLang: Language;
  showCookieConsent?: boolean;
};

type LabUiCopy = {
  heroPanelTitle: string;
  heroFallbackBenefits: string[];
  metrics: Array<[string, string]>;
  sectionEyebrows: string[];
  flowCardTitle: string;
  flowCardBody: string;
  outcomeChips: string[];
  tableHeaders: string[];
  referencesEyebrow: string;
  referencesTitle: string;
  referencesBody: string;
  references: Array<[string, string, string]>;
  faqEyebrow: string;
  faqTitle: string;
  formEyebrow: string;
  formTitle: string;
  formBody: string;
  formLabels: string[];
  formPlaceholders: string[];
  formSectors: string[];
  formSubmit: string;
  formPrivacy: string;
  fallbackFaqs: Array<[string, string]>;
};

const LAB_UI: Record<Language, LabUiCopy> = {
  en: {
    heroPanelTitle: 'Designed for laboratories that need to grow without losing control',
    heroFallbackBenefits: [
      'Reduce friction between intake, bench work, technical review and report delivery.',
      'Document chain of custody, batch, user, method, reading and validation.',
      'Add or scale somatic coliphage workflows with consistent operating steps.',
      'Give B2B customers a clear history by site, location and sample.'
    ],
    metrics: [['100 mL', 'Low-count workflows'], ['CoA', 'Traceable reports'], ['ISO 17025', 'Quality-system support'], ['B2B portal', 'History and communication']],
    sectionEyebrows: ['Laboratory challenge', 'AquaVerify solution', 'Operating flow', 'Decision matrix', 'Service evolution', 'Products and modules', 'Laboratory customers', 'Key capabilities'],
    flowCardTitle: 'Sample-to-report operating flow',
    flowCardBody: 'A practical structure to coordinate intake, bench work, quality and customer delivery without losing critical information.',
    outcomeChips: ['Less manual transcription', 'More consistent documentation', 'Clearer customer delivery', 'Audit-ready data'],
    tableHeaders: ['Need', 'Usual context', 'Product or workflow', 'Deliverable'],
    referencesEyebrow: 'Technical references',
    referencesTitle: 'Solid technical language for laboratories with demanding quality systems.',
    referencesBody: 'AquaVerify helps structure records, traceability and reports; accreditation, scope and method validity depend on each laboratory’s documented procedures.',
    references: [
      ['ISO/IEC 17025', 'International framework for testing and calibration laboratory competence, impartiality and consistent operation.', 'https://www.iso.org/ISO-IEC-17025-testing-and-calibration-laboratories.html'],
      ['ISO 10705-2', 'Water quality standard for detection and enumeration of bacteriophages; part 2 covers somatic coliphages.', 'https://www.iso.org/standard/20127.html'],
      ['US-EPA Method 1602', 'SAL procedure for somatic and F+ coliphages in water, with results expressed as plaque-forming units.', 'https://www.epa.gov/sites/default/files/2015-12/documents/method_1602_2001.pdf'],
      ['Spanish RD 3/2023', 'Spanish technical and sanitary framework for drinking water supply and quality control.', 'https://www.boe.es/buscar/act.php?id=BOE-A-2023-628']
    ],
    faqEyebrow: 'Frequently asked questions',
    faqTitle: 'Answers for laboratory management, quality, microbiology and B2B customers.',
    formEyebrow: 'Technical diagnosis',
    formTitle: 'Turn your water-sample workflow into a faster, traceable and scalable service.',
    formBody: 'Share laboratory type, matrices, volume and current method. The request continues in AquaVerify Cloud so the commercial team receives source, sector and technical context.',
    formLabels: ['Name', 'Company', 'Professional email', 'Sector', 'Country', 'Water type', 'Samples per month', 'Current method', 'Main need'],
    formPlaceholders: ['Name and surname', 'Organisation', 'name@company.com', 'Spain, France, United States...', 'Drinking, process, irrigation, reclaimed...', '50, 200, 1000+', 'Current kit, laboratory, spreadsheet, LIMS...', 'Audit, coliphages, TAT, digital traceability...'],
    formSectors: ['Environmental laboratory', 'Public laboratory', 'Utility / municipal', 'Food & beverage', 'Water treatment', 'Agriculture', 'Seafood / aquaculture', 'Other'],
    formSubmit: 'Continue in AquaVerify Cloud',
    formPrivacy: 'The request continues in AquaVerify Cloud so the commercial team receives it with source, sector and laboratory context.',
    fallbackFaqs: [
      ['Does AquaVerify replace an accredited laboratory?', 'No. AquaVerify acts as a product, traceability, digital workflow, reporting and customer-portal layer. Accredited testing must remain within the laboratory’s documented scope, methods, validations and procedures.']
    ]
  },
  es: {
    heroPanelTitle: 'Diseñado para laboratorios que deben crecer sin perder control',
    heroFallbackBenefits: [
      'Reducir fricción entre recepción, banco, revisión técnica y entrega del informe.',
      'Documentar cadena de custodia, lote, usuario, método, lectura y validación.',
      'Incorporar o escalar ensayos de colífagos somáticos con flujos consistentes.',
      'Ofrecer a clientes B2B un histórico claro por instalación, ubicación y muestra.'
    ],
    metrics: [['100 mL', 'Flujos para bajos recuentos'], ['CoA', 'Informes trazables'], ['ISO 17025', 'Apoyo documental'], ['Portal B2B', 'Histórico y comunicación']],
    sectionEyebrows: ['El reto del laboratorio de agua', 'Solución AquaVerify', 'Flujo operativo', 'Matriz de decisión', 'Evolución del servicio', 'Productos y módulos', 'Clientes del laboratorio', 'Capacidades clave'],
    flowCardTitle: 'Flujo operativo muestra a informe',
    flowCardBody: 'Una estructura para coordinar recepción, banco, calidad y cliente sin perder información crítica.',
    outcomeChips: ['Menos transcripción manual', 'Más consistencia documental', 'Entrega más clara al cliente', 'Datos preparados para auditoría'],
    tableHeaders: ['Necesidad', 'Contexto habitual', 'Producto o flujo', 'Entregable'],
    referencesEyebrow: 'Referencias técnicas',
    referencesTitle: 'Lenguaje técnico sólido para laboratorios con sistemas de calidad exigentes.',
    referencesBody: 'AquaVerify ayuda a estructurar registros, trazabilidad e informes; la acreditación, el alcance y la validez del método dependen de los procedimientos documentados por cada laboratorio.',
    references: [
      ['ISO/IEC 17025', 'Marco internacional para demostrar competencia, imparcialidad y operación consistente en laboratorios de ensayo y calibración.', 'https://www.iso.org/ISO-IEC-17025-testing-and-calibration-laboratories.html'],
      ['ISO 10705-2', 'Norma de calidad del agua para detección y enumeración de bacteriófagos; parte 2: colífagos somáticos.', 'https://www.iso.org/standard/20127.html'],
      ['US-EPA Method 1602', 'Procedimiento SAL para colífagos somáticos y F+ en agua, con resultados expresados como unidades formadoras de placa.', 'https://www.epa.gov/sites/default/files/2015-12/documents/method_1602_2001.pdf'],
      ['Real Decreto 3/2023', 'Marco español de criterios técnicos y sanitarios para agua de consumo, suministro y control de calidad.', 'https://www.boe.es/buscar/act.php?id=BOE-A-2023-628']
    ],
    faqEyebrow: 'Preguntas frecuentes',
    faqTitle: 'Respuestas para dirección, calidad, microbiología y clientes B2B.',
    formEyebrow: 'Diagnóstico técnico',
    formTitle: 'Convierte tu flujo de muestras de agua en un servicio más rápido, trazable y escalable.',
    formBody: 'Comparte el tipo de laboratorio, matrices, volumen y método actual. La solicitud continúa en AquaVerify Cloud para que el equipo comercial la reciba con origen, sector y contexto técnico.',
    formLabels: ['Nombre', 'Empresa', 'Email profesional', 'Sector', 'País', 'Tipo de agua', 'Muestras al mes', 'Método actual', 'Necesidad principal'],
    formPlaceholders: ['Nombre y apellidos', 'Organización', 'nombre@empresa.com', 'España, Francia, Estados Unidos...', 'Consumo, proceso, riego, regenerada...', '50, 200, 1000+', 'Kit actual, laboratorio, Excel, LIMS...', 'Auditoría, colífagos, TAT, trazabilidad digital...'],
    formSectors: ['Laboratorio ambiental', 'Laboratorio público', 'Utility / municipal', 'Food & beverage', 'Tratamiento de agua', 'Agricultura', 'Seafood / acuicultura', 'Otro'],
    formSubmit: 'Continuar en AquaVerify Cloud',
    formPrivacy: 'La solicitud continúa en AquaVerify Cloud para que el equipo comercial la reciba con origen, sector y contexto del laboratorio.',
    fallbackFaqs: [
      ['¿AquaVerify puede integrarse en un laboratorio que ya tiene LIMS?', 'Sí. AquaVerify Cloud puede complementar flujos existentes y conectar muestra, lote, operador, método, resultado, revisión, CoA y portal cliente. La integración o convivencia con un LIMS depende de requisitos, datos históricos, usuarios, validación interna, configuración y alcance operativo del laboratorio.']
    ]
  },
  fr: {
    heroPanelTitle: 'Conçu pour les laboratoires qui doivent croître sans perdre le contrôle',
    heroFallbackBenefits: [
      'Réduire les frictions entre réception, paillasse, revue technique et livraison du rapport.',
      'Documenter chaîne de traçabilité, lot, utilisateur, méthode, lecture et validation.',
      'Ajouter ou étendre les essais de coliphages somatiques avec des flux cohérents.',
      'Offrir aux clients B2B un historique clair par site, emplacement et échantillon.'
    ],
    metrics: [['100 mL', 'Flux faibles concentrations'], ['CoA', 'Rapports traçables'], ['ISO 17025', 'Support qualité'], ['Portail B2B', 'Historique et communication']],
    sectionEyebrows: ['Défi du laboratoire eau', 'Solution AquaVerify', 'Flux opérationnel', 'Matrice de décision', 'Évolution du service', 'Produits et modules', 'Clients du laboratoire', 'Capacités clés'],
    flowCardTitle: 'Flux opérationnel échantillon à rapport',
    flowCardBody: 'Une structure pratique pour coordonner réception, paillasse, qualité et client sans perdre d’information critique.',
    outcomeChips: ['Moins de transcription manuelle', 'Documentation plus cohérente', 'Livraison client plus claire', 'Données prêtes pour audit'],
    tableHeaders: ['Besoin', 'Contexte habituel', 'Produit ou flux', 'Livrable'],
    referencesEyebrow: 'Références techniques',
    referencesTitle: 'Un langage technique solide pour les laboratoires avec systèmes qualité exigeants.',
    referencesBody: 'AquaVerify aide à structurer les enregistrements, la traçabilité et les rapports; l’accréditation, le périmètre et la validité de méthode dépendent des procédures documentées par chaque laboratoire.',
    references: [
      ['ISO/IEC 17025', 'Cadre international pour démontrer compétence, impartialité et fonctionnement cohérent des laboratoires d’essais et d’étalonnage.', 'https://www.iso.org/ISO-IEC-17025-testing-and-calibration-laboratories.html'],
      ['ISO 10705-2', 'Norme de qualité de l’eau pour la détection et le dénombrement des bactériophages; partie 2: coliphages somatiques.', 'https://www.iso.org/standard/20127.html'],
      ['US-EPA Method 1602', 'Procédure SAL pour coliphages somatiques et F+ dans l’eau, avec résultats en unités formant plaque.', 'https://www.epa.gov/sites/default/files/2015-12/documents/method_1602_2001.pdf'],
      ['Décret espagnol RD 3/2023', 'Cadre technique et sanitaire espagnol pour l’eau de consommation et le contrôle qualité.', 'https://www.boe.es/buscar/act.php?id=BOE-A-2023-628']
    ],
    faqEyebrow: 'Questions fréquentes',
    faqTitle: 'Réponses pour direction, qualité, microbiologie et clients B2B.',
    formEyebrow: 'Diagnostic technique',
    formTitle: 'Transformez votre flux d’échantillons d’eau en service plus rapide, traçable et évolutif.',
    formBody: 'Partagez le type de laboratoire, les matrices, le volume et la méthode actuelle. La demande continue dans AquaVerify Cloud avec l’origine, le secteur et le contexte technique.',
    formLabels: ['Nom', 'Entreprise', 'Email professionnel', 'Secteur', 'Pays', 'Type d’eau', 'Échantillons par mois', 'Méthode actuelle', 'Besoin principal'],
    formPlaceholders: ['Nom et prénom', 'Organisation', 'nom@entreprise.com', 'Espagne, France, États-Unis...', 'Consommation, process, irrigation, réutilisée...', '50, 200, 1000+', 'Kit actuel, laboratoire, Excel, LIMS...', 'Audit, coliphages, TAT, traçabilité numérique...'],
    formSectors: ['Laboratoire environnemental', 'Laboratoire public', 'Utility / municipal', 'Food & beverage', 'Traitement de l’eau', 'Agriculture', 'Seafood / aquaculture', 'Autre'],
    formSubmit: 'Continuer dans AquaVerify Cloud',
    formPrivacy: 'La demande continue dans AquaVerify Cloud afin que l’équipe commerciale la reçoive avec origine, secteur et contexte laboratoire.',
    fallbackFaqs: [
      ['AquaVerify remplace-t-il un laboratoire accrédité?', 'Non. AquaVerify agit comme couche produit, traçabilité, flux numérique, reporting et portail client. Les essais accrédités doivent rester dans le périmètre, les méthodes, les validations et les procédures documentées du laboratoire.']
    ]
  },
  it: {
    heroPanelTitle: 'Progettato per laboratori che devono crescere senza perdere controllo',
    heroFallbackBenefits: [
      'Ridurre attrito tra accettazione, banco, revisione tecnica e consegna del report.',
      'Documentare catena di custodia, lotto, utente, metodo, lettura e validazione.',
      'Aggiungere o scalare saggi di colifagi somatici con workflow coerenti.',
      'Offrire ai clienti B2B uno storico chiaro per sito, ubicazione e campione.'
    ],
    metrics: [['100 mL', 'Workflow basse concentrazioni'], ['CoA', 'Report tracciabili'], ['ISO 17025', 'Supporto qualità'], ['Portale B2B', 'Storico e comunicazione']],
    sectionEyebrows: ['Sfida del laboratorio acqua', 'Soluzione AquaVerify', 'Flusso operativo', 'Matrice decisionale', 'Evoluzione del servizio', 'Prodotti e moduli', 'Clienti del laboratorio', 'Capacità chiave'],
    flowCardTitle: 'Flusso operativo campione-report',
    flowCardBody: 'Una struttura pratica per coordinare accettazione, banco, qualità e cliente senza perdere informazioni critiche.',
    outcomeChips: ['Meno trascrizione manuale', 'Documentazione più coerente', 'Consegna cliente più chiara', 'Dati pronti per audit'],
    tableHeaders: ['Esigenza', 'Contesto abituale', 'Prodotto o workflow', 'Deliverable'],
    referencesEyebrow: 'Riferimenti tecnici',
    referencesTitle: 'Linguaggio tecnico solido per laboratori con sistemi qualità esigenti.',
    referencesBody: 'AquaVerify aiuta a strutturare registri, tracciabilità e report; accreditamento, ambito e validità del metodo dipendono dalle procedure approvate da ogni laboratorio.',
    references: [
      ['ISO/IEC 17025', 'Quadro internazionale per dimostrare competenza, imparzialità e funzionamento coerente dei laboratori di prova e taratura.', 'https://www.iso.org/ISO-IEC-17025-testing-and-calibration-laboratories.html'],
      ['ISO 10705-2', 'Norma di qualità dell’acqua per rilevazione ed enumerazione dei batteriofagi; parte 2: colifagi somatici.', 'https://www.iso.org/standard/20127.html'],
      ['US-EPA Method 1602', 'Procedura SAL per colifagi somatici e F+ in acqua, con risultati espressi come unità formanti placca.', 'https://www.epa.gov/sites/default/files/2015-12/documents/method_1602_2001.pdf'],
      ['Real Decreto spagnolo 3/2023', 'Quadro tecnico-sanitario spagnolo per acqua potabile, fornitura e controllo qualità.', 'https://www.boe.es/buscar/act.php?id=BOE-A-2023-628']
    ],
    faqEyebrow: 'Domande frequenti',
    faqTitle: 'Risposte per direzione, qualità, microbiologia e clienti B2B.',
    formEyebrow: 'Diagnosi tecnica',
    formTitle: 'Trasforma il flusso dei campioni d’acqua in un servizio più rapido, tracciabile e scalabile.',
    formBody: 'Condividi tipo di laboratorio, matrici, volume e metodo attuale. La richiesta continua in AquaVerify Cloud con origine, settore e contesto tecnico.',
    formLabels: ['Nome', 'Azienda', 'Email professionale', 'Settore', 'Paese', 'Tipo di acqua', 'Campioni al mese', 'Metodo attuale', 'Esigenza principale'],
    formPlaceholders: ['Nome e cognome', 'Organizzazione', 'nome@azienda.com', 'Spagna, Francia, Stati Uniti...', 'Potabile, processo, irrigazione, riutilizzata...', '50, 200, 1000+', 'Kit attuale, laboratorio, Excel, LIMS...', 'Audit, colifagi, TAT, tracciabilità digitale...'],
    formSectors: ['Laboratorio ambientale', 'Laboratorio pubblico', 'Utility / municipale', 'Food & beverage', 'Trattamento acqua', 'Agricoltura', 'Seafood / acquacoltura', 'Altro'],
    formSubmit: 'Continua in AquaVerify Cloud',
    formPrivacy: 'La richiesta continua in AquaVerify Cloud così il team commerciale la riceve con origine, settore e contesto laboratorio.',
    fallbackFaqs: [
      ['AquaVerify sostituisce un laboratorio accreditato?', 'No. AquaVerify agisce come livello di prodotto, tracciabilità, workflow digitale, reporting e portale cliente. I test accreditati devono restare nell’ambito, metodi, validazioni e procedure approvati dal laboratorio.']
    ]
  },
  ca: {
    heroPanelTitle: 'Dissenyat per a laboratoris que han de créixer sense perdre control',
    heroFallbackBenefits: [
      'Reduir fricció entre recepció, banc, revisió tècnica i entrega de l’informe.',
      'Documentar cadena de custòdia, lot, usuari, mètode, lectura i validació.',
      'Incorporar o escalar assaigs de colífags somàtics amb fluxos consistents.',
      'Oferir als clients B2B un històric clar per instal·lació, ubicació i mostra.'
    ],
    metrics: [['100 mL', 'Fluxos per baixos recomptes'], ['CoA', 'Informes traçables'], ['ISO 17025', 'Suport documental'], ['Portal B2B', 'Històric i comunicació']],
    sectionEyebrows: ['Repte del laboratori d’aigua', 'Solució AquaVerify', 'Flux operatiu', 'Matriu de decisió', 'Evolució del servei', 'Productes i mòduls', 'Clients del laboratori', 'Capacitats clau'],
    flowCardTitle: 'Flux operatiu mostra a informe',
    flowCardBody: 'Una estructura pràctica per coordinar recepció, banc, qualitat i client sense perdre informació crítica.',
    outcomeChips: ['Menys transcripció manual', 'Documentació més consistent', 'Entrega al client més clara', 'Dades preparades per auditoria'],
    tableHeaders: ['Necessitat', 'Context habitual', 'Producte o flux', 'Entregable'],
    referencesEyebrow: 'Referències tècniques',
    referencesTitle: 'Llenguatge tècnic sòlid per a laboratoris amb sistemes de qualitat exigents.',
    referencesBody: 'AquaVerify ajuda a estructurar registres, traçabilitat i informes; l’acreditació, l’abast i la validesa del mètode depenen dels procediments documentats per cada laboratori.',
    references: [
      ['ISO/IEC 17025', 'Marc internacional per demostrar competència, imparcialitat i operació consistent en laboratoris d’assaig i calibratge.', 'https://www.iso.org/ISO-IEC-17025-testing-and-calibration-laboratories.html'],
      ['ISO 10705-2', 'Norma de qualitat de l’aigua per detecció i enumeració de bacteriòfags; part 2: colífags somàtics.', 'https://www.iso.org/standard/20127.html'],
      ['US-EPA Method 1602', 'Procediment SAL per a colífags somàtics i F+ en aigua, amb resultats com unitats formadores de placa.', 'https://www.epa.gov/sites/default/files/2015-12/documents/method_1602_2001.pdf'],
      ['Reial decret 3/2023', 'Marc espanyol de criteris tècnics i sanitaris per a aigua de consum, subministrament i control de qualitat.', 'https://www.boe.es/buscar/act.php?id=BOE-A-2023-628']
    ],
    faqEyebrow: 'Preguntes freqüents',
    faqTitle: 'Respostes per a direcció, qualitat, microbiologia i clients B2B.',
    formEyebrow: 'Diagnòstic tècnic',
    formTitle: 'Converteix el teu flux de mostres d’aigua en un servei més ràpid, traçable i escalable.',
    formBody: 'Comparteix el tipus de laboratori, matrius, volum i mètode actual. La sol·licitud continua a AquaVerify Cloud amb origen, sector i context tècnic.',
    formLabels: ['Nom', 'Empresa', 'Email professional', 'Sector', 'País', 'Tipus d’aigua', 'Mostres al mes', 'Mètode actual', 'Necessitat principal'],
    formPlaceholders: ['Nom i cognoms', 'Organització', 'nom@empresa.com', 'Espanya, França, Estats Units...', 'Consum, procés, reg, regenerada...', '50, 200, 1000+', 'Kit actual, laboratori, Excel, LIMS...', 'Auditoria, colífags, TAT, traçabilitat digital...'],
    formSectors: ['Laboratori ambiental', 'Laboratori públic', 'Utility / municipal', 'Food & beverage', 'Tractament d’aigua', 'Agricultura', 'Seafood / aqüicultura', 'Altres'],
    formSubmit: 'Continuar a AquaVerify Cloud',
    formPrivacy: 'La sol·licitud continua a AquaVerify Cloud perquè l’equip comercial la rebi amb origen, sector i context del laboratori.',
    fallbackFaqs: [
      ['AquaVerify substitueix un laboratori acreditat?', 'No. AquaVerify actua com a capa de producte, traçabilitat, flux digital, reporting i portal client. Els assaigs acreditats s’han d’integrar en l’abast, mètodes, validacions i procediments documentats pel laboratori.']
    ]
  }
};

const sectionIconMap = [ShieldCheck, Layers3, ClipboardCheck, FileCheck2, FlaskConical, FlaskConical, Building2, CheckCircle2];

function getSection(content: MarketingContent, index: number, fallback: MarketingSection): MarketingSection {
  return content.sections?.[index] || fallback;
}

function getBullets(section: MarketingSection, fallback: string[] = []) {
  return section.bullets?.length ? section.bullets : fallback;
}

function splitCardText(value: string): [string, string] {
  const [title, ...rest] = value.split(':');
  if (rest.length === 0) return [value, ''];
  return [title.trim(), rest.join(':').trim()];
}

const SectionHead: React.FC<{ eyebrow: string; title: string; body?: string; center?: boolean }> = ({ eyebrow, title, body, center = false }) => (
  <div className={`max-w-4xl ${center ? 'mx-auto text-center' : ''}`}>
    <span className="inline-flex rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-cyan-700">{eyebrow}</span>
    <h2 className="mt-4 font-heading text-3xl font-black leading-tight text-slate-950 md:text-5xl">{title}</h2>
    {body && <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">{body}</p>}
  </div>
);

const FormField: React.FC<{ label: string; name: string; type?: string; placeholder?: string; required?: boolean }> = ({ label, name, type = 'text', placeholder, required = false }) => (
  <label className="grid gap-2 text-sm font-black text-slate-800">
    {label}
    <input name={name} type={type} placeholder={placeholder} required={required} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100" />
  </label>
);

const CardGrid: React.FC<{ items: string[]; iconOffset?: number; cols?: string }> = ({ items, iconOffset = 0, cols = 'md:grid-cols-2 xl:grid-cols-4' }) => (
  <div className={`mt-8 grid gap-5 ${cols}`}>
    {items.map((item, index) => {
      const [title, body] = splitCardText(item);
      const Icon = sectionIconMap[(index + iconOffset) % sectionIconMap.length] || CheckCircle2;
      return (
        <article key={`${item}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg">
          <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="font-heading text-lg font-black text-slate-950">{title}</h3>
          {body && <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>}
        </article>
      );
    })}
  </div>
);

const AnswerLayer: React.FC<{
  directAnswer?: DirectAnswerContent;
  technicalTable?: TechnicalTableContent;
}> = ({ directAnswer, technicalTable }) => {
  if (!directAnswer && !technicalTable) return null;

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          {directAnswer && (
            <div>
              <h2 className="font-heading text-2xl font-black text-primary">{directAnswer.title}</h2>
              <p className="mt-3 text-base leading-8 text-slate-600">{directAnswer.body}</p>
            </div>
          )}
          {technicalTable && technicalTable.columns.length > 0 && technicalTable.rows.length > 0 && (
            <div className={directAnswer ? 'mt-7' : ''}>
              {technicalTable.title && (
                <h3 className="font-heading text-xl font-black text-slate-900">{technicalTable.title}</h3>
              )}
              <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                  <thead className="bg-slate-50 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                    <tr>
                      {technicalTable.columns.map((column) => (
                        <th key={column} scope="col" className="px-4 py-3">{column}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {technicalTable.rows.map((row, rowIndex) => (
                      <tr key={`${row.join('-')}-${rowIndex}`}>
                        {technicalTable.columns.map((column, columnIndex) => (
                          <td key={`${column}-${rowIndex}`} className="px-4 py-4 align-top leading-6 text-slate-600">
                            {row[columnIndex] || ''}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export const WaterTestingLabsLanding: React.FC<Props> = ({ content, pageLang, showCookieConsent = true }) => {
  const copy = LAB_UI[pageLang] || LAB_UI.en;
  const sections = [
    getSection(content, 0, { title: copy.sectionEyebrows[0], body: content.description, bullets: copy.heroFallbackBenefits }),
    getSection(content, 1, { title: copy.sectionEyebrows[1], body: content.description, bullets: copy.heroFallbackBenefits }),
    getSection(content, 2, { title: copy.sectionEyebrows[2], body: content.description, bullets: copy.outcomeChips }),
    getSection(content, 3, { title: copy.sectionEyebrows[3], body: content.description, bullets: copy.outcomeChips }),
    getSection(content, 4, { title: copy.sectionEyebrows[4], body: content.description, bullets: copy.outcomeChips }),
    getSection(content, 5, { title: copy.sectionEyebrows[5], body: content.description, bullets: [] }),
    getSection(content, 6, { title: copy.sectionEyebrows[6], body: content.description, bullets: [] }),
    getSection(content, 7, { title: copy.sectionEyebrows[7], body: content.description, bullets: [] })
  ];
  const heroBenefits = getBullets(sections[1], copy.heroFallbackBenefits).slice(0, 4);
  const faqs = (content.faqs?.length ? content.faqs.map((item) => [item.question, item.answer]) : copy.fallbackFaqs) as string[][];
  const signupUrl = getPlatformSignupUrl({
    intent: 'quote',
    page: 'water-testing-labs',
    category: 'industries',
    profile: 'labs'
  }, pageLang);

  const trackSignup = (label: string, targetUrl: string) => {
    trackCorporateEvent('platform_link_click', {
      lang: pageLang,
      page: 'water-testing-labs',
      category: 'industries',
      intent: 'quote',
      label,
      target_url: targetUrl,
      path: content.path
    });
  };

  const leadCapture = useMarketingLeadCapture({
    formKey: 'water-testing-labs-diagnosis',
    requestType: 'quote',
    lang: pageLang,
    sourcePath: content.path,
    detailFields: ['sector', 'water_type', 'sample_volume', 'current_method'],
    details: {
      page: 'water-testing-labs',
      category: 'industries',
      profile: 'labs',
      module: 'lab-diagnosis'
    },
    onAccepted: (_result, payload) => {
      trackCorporateEvent('water_testing_lab_diagnosis_submit', {
        lang: pageLang,
        page: 'water-testing-labs',
        category: 'industries',
        intent: 'quote',
        profile: 'labs',
        country: payload.details.country,
        product: payload.details.water_type,
        module: 'lab-diagnosis'
      });
    }
  });

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-900">
      <Header />
      <main className="flex-grow pt-20">
        <section className="aq-page-hero">
          <div className="absolute inset-0 bg-transparent" />
          <div className="container relative z-10 mx-auto grid gap-10 px-6 py-16 md:py-24 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-center">
            <div className="max-w-4xl">
              <div className="aq-hero-eyebrow">
                {content.eyebrow || copy.sectionEyebrows[0]}
              </div>
              <h1 className="aq-gradient-title mt-6 font-heading text-4xl font-black leading-tight md:text-6xl">{content.title}</h1>
              <p className="aq-hero-copy mt-6 max-w-3xl text-lg leading-8">{content.description}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={signupUrl}
                  onClick={() => trackSignup(content.primaryCta || copy.formSubmit, signupUrl)}
                  className="aq-cta-primary"
                >
                  {content.primaryCta || copy.formSubmit}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a href="#flujo" className="aq-cta-secondary">
                  {content.secondaryCta || sections[2].title}
                </a>
              </div>
            </div>

            <aside className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur">
              <h2 className="font-heading text-2xl font-black">{copy.heroPanelTitle}</h2>
              <ul className="mt-5 space-y-3 text-sm font-semibold leading-6 text-cyan-50/90">
                {heroBenefits.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {copy.metrics.map(([value, label]) => (
                  <div key={value} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                    <div className="font-heading text-2xl font-black text-white">{value}</div>
                    <div className="mt-1 text-xs font-bold leading-5 text-cyan-50/75">{label}</div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <AnswerLayer directAnswer={content.directAnswer} technicalTable={content.technicalTable} />

        <section id="reto" className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[0]} title={sections[0].title} body={sections[0].body} />
            <CardGrid items={getBullets(sections[0], copy.heroFallbackBenefits)} />
          </div>
        </section>

        <section id="solucion" className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[1]} title={sections[1].title} body={sections[1].body} />
            <CardGrid items={getBullets(sections[1], copy.heroFallbackBenefits)} iconOffset={1} />
          </div>
        </section>

        <section id="flujo" className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[2]} title={sections[2].title} body={sections[2].body} />
            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:p-8">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <h3 className="font-heading text-2xl font-black text-primary">{copy.flowCardTitle}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{copy.flowCardBody}</p>
                </div>
                <ClipboardCheck className="h-10 w-10 text-secondary" />
              </div>
              <ol className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {getBullets(sections[2], copy.outcomeChips).map((item, index) => {
                  const [title, body] = splitCardText(item);
                  return (
                    <li key={`${item}-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-black text-white">{String(index + 1).padStart(2, '0')}</span>
                        <h3 className="font-heading text-lg font-black text-slate-950">{title}</h3>
                      </div>
                      {body && <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>}
                    </li>
                  );
                })}
              </ol>
              <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {copy.outcomeChips.map((item) => (
                  <div key={item} className="rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 text-center text-xs font-black text-cyan-800">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[3]} title={sections[3].title} body={sections[3].body} />
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {getBullets(sections[3], copy.outcomeChips).map((item, index) => {
                const [title, body] = splitCardText(item);
                return (
                  <article key={`${item}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">{copy.tableHeaders[index % copy.tableHeaders.length]}</div>
                    <h3 className="mt-3 font-heading text-lg font-black text-slate-950">{title}</h3>
                    {body && <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[4]} title={sections[4].title} body={sections[4].body} />
            <CardGrid items={getBullets(sections[4], copy.outcomeChips)} iconOffset={3} cols="md:grid-cols-2 xl:grid-cols-5" />
          </div>
        </section>

        <section id="productos" className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[5]} title={sections[5].title} body={sections[5].body} />
            <CardGrid items={getBullets(sections[5], [])} iconOffset={5} cols="md:grid-cols-2 xl:grid-cols-3" />
          </div>
        </section>

        <section className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[6]} title={sections[6].title} body={sections[6].body} />
            <CardGrid items={getBullets(sections[6], [])} iconOffset={6} />
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[7]} title={sections[7].title} body={sections[7].body} />
            <CardGrid items={getBullets(sections[7], [])} iconOffset={7} cols="md:grid-cols-2 xl:grid-cols-5" />
          </div>
        </section>

        <section className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.referencesEyebrow} title={copy.referencesTitle} body={copy.referencesBody} />
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {copy.references.map(([title, body, href]) => (
                <a key={title} href={href} target="_blank" rel="noreferrer" className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg">
                  <FileCheck2 className="h-7 w-7 text-secondary" />
                  <h3 className="mt-4 font-heading text-xl font-black text-slate-950 group-hover:text-primary">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.faqEyebrow} title={copy.faqTitle} />
            <div className="mt-8 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              {faqs.map(([question, answer]) => (
                <details key={question} className="group py-5 first:pt-0 last:pb-0">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-lg font-black text-slate-950">
                    {question}
                    <span className="rounded-full bg-cyan-50 px-3 py-1 text-cyan-700 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <IndustryGlossaryTerms industryId="water-testing-labs" lang={pageLang} />

        <section id="diagnostico" className="bg-slate-50 py-16 pb-24 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.formEyebrow} title={copy.formTitle} body={copy.formBody} center />
            <form onSubmit={leadCapture.handleSubmit} className="relative mx-auto mt-8 max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:p-8">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField label={copy.formLabels[0]} name="name" placeholder={copy.formPlaceholders[0]} required />
                <FormField label={copy.formLabels[1]} name="company" placeholder={copy.formPlaceholders[1]} required />
                <FormField label={copy.formLabels[2]} name="email" type="email" placeholder={copy.formPlaceholders[2]} required />
                <label className="grid gap-2 text-sm font-black text-slate-800">
                  {copy.formLabels[3]}
                  <select name="sector" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100">
                    {copy.formSectors.map((sector) => <option key={sector}>{sector}</option>)}
                  </select>
                </label>
                <FormField label={copy.formLabels[4]} name="country" placeholder={copy.formPlaceholders[3]} />
                <FormField label={copy.formLabels[5]} name="water_type" placeholder={copy.formPlaceholders[4]} />
                <FormField label={copy.formLabels[6]} name="sample_volume" placeholder={copy.formPlaceholders[5]} />
                <FormField label={copy.formLabels[7]} name="current_method" placeholder={copy.formPlaceholders[6]} />
                <label className="grid gap-2 text-sm font-black text-slate-800 md:col-span-2">
                  {copy.formLabels[8]}
                  <textarea name="main_need" placeholder={copy.formPlaceholders[7]} className="min-h-28 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100" />
                </label>
                <MarketingLeadFormControls
                  lang={pageLang}
                  submitLabel={copy.formSubmit}
                  privacyNote={copy.formPrivacy}
                  status={leadCapture.status}
                  copy={leadCapture.copy}
                />
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
      {showCookieConsent && <CookieConsent />}
    </div>
  );
};
