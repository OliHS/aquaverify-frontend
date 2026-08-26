import React from 'react';
import { ArrowRight, Beaker, CheckCircle2, ClipboardCheck, Factory, FileCheck2, FlaskConical, PackageCheck, Route, ShieldCheck, Waves } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieConsent } from './CookieConsent';
import { IndustryGlossaryTerms } from './IndustryGlossaryTerms';
import { IndustryBuyerProblemsSection, type IndustryBuyerProblemsContent } from './industries/IndustryBuyerProblemsSection';
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

type MarketingContent = {
  path: string;
  title: string;
  description: string;
  eyebrow?: string;
  primaryCta?: string;
  secondaryCta?: string;
  sections?: MarketingSection[];
  faqs?: Array<{ question: string; answer: string }>;
  buyerProblems?: IndustryBuyerProblemsContent;
};

type Props = {
  content: MarketingContent;
  pageLang: Language;
  showCookieConsent?: boolean;
};

type IndustrialCopy = {
  heroProof: Array<[string, string]>;
  heroSteps: Array<[string, string]>;
  digitalProof: string[];
  sectionEyebrows: string[];
  matrixHeaders: string[];
  moduleHeaders: string[];
  faqTitle: string;
  formEyebrow: string;
  formTitle: string;
  formBody: string;
  formLabels: string[];
  formPlaceholders: string[];
  facilityTypes: string[];
  labModels: string[];
  formSubmit: string;
  formPrivacy: string;
};

const COPY: Record<Language, IndustrialCopy> = {
  en: {
    heroProof: [
      ['Control points', 'Intake, process, cooling, cleaning, reuse and discharge circuits.'],
      ['Microbiology', 'Bacterial indicators and somatic coliphages when the plan requires them.'],
      ['Deviation closure', 'Owner, corrective action, resampling and documented verification.'],
      ['Multi-site history', 'Comparable records across plants, laboratories and suppliers.']
    ],
    heroSteps: [['Intake', 'Source, pretreatment and point map'], ['Treatment', 'Filtration, disinfection and storage'], ['Process', 'Line, asset, matrix and criterion'], ['Cooling / CIP', 'Aerosols, utilities, cleaning and rinse'], ['Laboratory', 'Kit, method, result and CoA'], ['Decision', 'Action, resampling, report and closure']],
    digitalProof: ['Plant context: Sites, circuits, points, assets, samples, methods and owners remain connected.', 'Decision visibility: Teams see which line, utility or process may be affected by each result.', 'Evidence continuity: Attachments, CoA, actions and resampling stay linked to the same record.', 'Supplier coordination: Internal labs, external providers and hybrid workflows share one operational context.'],
    sectionEyebrows: ['Industrial water context', 'Digital operating layer', 'Traceable workflow', 'Shared plant data', 'Plant control map', 'AquaVerify modules', 'Technical framework', 'Operational maturity', 'Industrial use cases'],
    matrixHeaders: ['Water point', 'Operational risk', 'AquaVerify connects'],
    moduleHeaders: ['Module', 'Primary use', 'Value for the plant'],
    faqTitle: 'Frequently asked questions',
    formEyebrow: 'Industrial process water diagnosis',
    formTitle: 'Build a traceable water-control programme for your plant',
    formBody: 'Share your plant type, water circuits, sample volume and laboratory model. The request continues in AquaVerify Cloud with industrial process water context.',
    formLabels: ['Name', 'Company', 'Professional email', 'Country', 'Plant type', 'Water circuit', 'Laboratory model', 'Samples per month', 'Current method', 'Main need'],
    formPlaceholders: ['Name and surname', 'Industrial company or plant group', 'name@company.com', 'Spain, France, United States...', 'Manufacturing, utilities, treatment, engineering...', 'Cooling, process, CIP, reuse, effluent...', '50, 200, 1000+', 'Current lab, kit, spreadsheet, LIMS...', 'Audit, deviation, coliphages, traceability, reuse...'],
    facilityTypes: ['Manufacturing plant', 'Chemical or process industry', 'Cooling and utilities', 'Water treatment facility', 'Multi-site industrial group', 'Engineering / maintenance partner', 'Other'],
    labModels: ['Internal laboratory', 'External partner laboratory', 'Mixed model', 'Public or accredited laboratory', 'Not defined yet'],
    formSubmit: 'Continue in AquaVerify Cloud',
    formPrivacy: 'The commercial team receives the request with origin, industrial profile and process-water context.'
  },
  es: {
    heroProof: [
      ['Puntos de control', 'Captación, proceso, refrigeración, limpieza, reutilización y descarga.'],
      ['Microbiología', 'Indicadores bacterianos y colífagos somáticos cuando el plan los requiere.'],
      ['Cierre de desviaciones', 'Responsable, acción correctiva, remuestreo y verificación documentada.'],
      ['Histórico multi-planta', 'Registros comparables entre plantas, laboratorios y proveedores.']
    ],
    heroSteps: [['Captación', 'Fuente, pretratamiento y mapa de puntos'], ['Tratamiento', 'Filtración, desinfección y almacenamiento'], ['Proceso', 'Línea, activo, matriz y criterio'], ['Refrigeración / CIP', 'Aerosoles, servicios, limpieza y enjuague'], ['Laboratorio', 'Kit, método, resultado y CoA'], ['Decisión', 'Acción, remuestreo, informe y cierre']],
    digitalProof: ['Contexto de planta: Sedes, circuitos, puntos, activos, muestras, métodos y responsables permanecen conectados.', 'Visibilidad de decisión: El equipo ve qué línea, servicio o proceso puede quedar afectado por cada resultado.', 'Continuidad documental: Adjuntos, CoA, acciones y remuestreos quedan vinculados al mismo registro.', 'Coordinación de proveedores: Laboratorios internos, externos y modelos mixtos comparten un mismo contexto operativo.'],
    sectionEyebrows: ['Contexto del agua industrial', 'Capa operativa digital', 'Flujo trazable', 'Dato compartido en planta', 'Mapa de control en planta', 'Módulos AquaVerify', 'Marco técnico', 'Madurez operativa', 'Casos de uso industriales'],
    matrixHeaders: ['Punto de agua', 'Riesgo operativo', 'AquaVerify conecta'],
    moduleHeaders: ['Módulo', 'Uso principal', 'Valor para la planta'],
    faqTitle: 'Preguntas frecuentes',
    formEyebrow: 'Diagnóstico de agua de proceso industrial',
    formTitle: 'Construye un programa trazable de control del agua para tu planta',
    formBody: 'Comparte tipo de planta, circuitos de agua, volumen de muestras y modelo de laboratorio. La solicitud continúa en AquaVerify Cloud con contexto de agua de proceso industrial.',
    formLabels: ['Nombre', 'Empresa', 'Email profesional', 'País', 'Tipo de planta', 'Circuito de agua', 'Modelo de laboratorio', 'Muestras al mes', 'Método actual', 'Necesidad principal'],
    formPlaceholders: ['Nombre y apellidos', 'Empresa industrial o grupo de plantas', 'nombre@empresa.com', 'España, Francia, Estados Unidos...', 'Fabricación, servicios, tratamiento, ingeniería...', 'Refrigeración, proceso, CIP, reutilización, efluente...', '50, 200, 1000+', 'Laboratorio actual, kit, Excel, LIMS...', 'Auditoría, desviación, colífagos, trazabilidad, reutilización...'],
    facilityTypes: ['Planta de fabricación', 'Industria química o de proceso', 'Refrigeración y servicios', 'Instalación de tratamiento de agua', 'Grupo industrial multi-planta', 'Ingeniería / mantenimiento', 'Otro'],
    labModels: ['Laboratorio interno', 'Laboratorio partner externo', 'Modelo mixto', 'Laboratorio público o acreditado', 'Todavía no definido'],
    formSubmit: 'Continuar en AquaVerify Cloud',
    formPrivacy: 'El equipo comercial recibe la solicitud con origen, perfil industrial y contexto de agua de proceso.'
  },
  fr: {
    heroProof: [
      ['Points de contrôle', 'Captage, process, refroidissement, nettoyage, réutilisation et rejet.'],
      ['Microbiologie', 'Indicateurs bactériens et coliphages somatiques lorsque le plan les exige.'],
      ['Clôture des déviations', 'Responsable, action corrective, rééchantillonnage et vérification documentée.'],
      ['Historique multi-sites', 'Registres comparables entre sites, laboratoires et fournisseurs.']
    ],
    heroSteps: [['Captage', 'Source, prétraitement et carte des points'], ['Traitement', 'Filtration, désinfection et stockage'], ['Process', 'Ligne, actif, matrice et critère'], ['Refroidissement / CIP', 'Aérosols, utilités, nettoyage et rinçage'], ['Laboratoire', 'Kit, méthode, résultat et CoA'], ['Décision', 'Action, rééchantillonnage, rapport et clôture']],
    digitalProof: ['Contexte du site: Sites, circuits, points, actifs, échantillons, méthodes et responsables restent connectés.', 'Visibilité décisionnelle: Les équipes voient quelle ligne, utilité ou process peut être affecté par chaque résultat.', 'Continuité des preuves: Pièces jointes, CoA, actions et rééchantillonnages restent liés au même dossier.', 'Coordination fournisseurs: Laboratoires internes, prestataires externes et modèles hybrides partagent le même contexte opérationnel.'],
    sectionEyebrows: ['Contexte eau industrielle', 'Couche opérationnelle numérique', 'Flux traçable', 'Donnée partagée sur site', 'Carte de contrôle du site', 'Modules AquaVerify', 'Cadre technique', 'Maturité opérationnelle', 'Cas d’usage industriels'],
    matrixHeaders: ['Point d’eau', 'Risque opérationnel', 'AquaVerify relie'],
    moduleHeaders: ['Module', 'Usage principal', 'Valeur pour le site'],
    faqTitle: 'Questions fréquentes',
    formEyebrow: 'Diagnostic eau de process industriel',
    formTitle: 'Construisez un programme traçable de contrôle de l’eau pour votre site',
    formBody: 'Partagez votre type de site, circuits d’eau, volume d’échantillons et modèle laboratoire. La demande continue dans AquaVerify Cloud avec le contexte eau de process industriel.',
    formLabels: ['Nom', 'Entreprise', 'Email professionnel', 'Pays', 'Type de site', 'Circuit d’eau', 'Modèle laboratoire', 'Échantillons par mois', 'Méthode actuelle', 'Besoin principal'],
    formPlaceholders: ['Nom et prénom', 'Entreprise industrielle ou groupe de sites', 'nom@entreprise.com', 'Espagne, France, États-Unis...', 'Fabrication, utilités, traitement, ingénierie...', 'Refroidissement, process, CIP, réutilisation, effluent...', '50, 200, 1000+', 'Laboratoire actuel, kit, Excel, LIMS...', 'Audit, déviation, coliphages, traçabilité, réutilisation...'],
    facilityTypes: ['Site de fabrication', 'Industrie chimique ou de process', 'Refroidissement et utilités', 'Installation de traitement de l’eau', 'Groupe industriel multi-sites', 'Ingénierie / maintenance', 'Autre'],
    labModels: ['Laboratoire interne', 'Laboratoire partenaire externe', 'Modèle mixte', 'Laboratoire public ou accrédité', 'Pas encore défini'],
    formSubmit: 'Continuer dans AquaVerify Cloud',
    formPrivacy: 'L’équipe commerciale reçoit la demande avec origine, profil industriel et contexte eau de process.'
  },
  it: {
    heroProof: [
      ['Punti di controllo', 'Captazione, processo, raffreddamento, pulizia, riutilizzo e scarico.'],
      ['Microbiologia', 'Indicatori batterici e colifagi somatici quando il piano li richiede.'],
      ['Chiusura deviazioni', 'Responsabile, azione correttiva, ricampionamento e verifica documentata.'],
      ['Storico multi-sito', 'Registri confrontabili tra stabilimenti, laboratori e fornitori.']
    ],
    heroSteps: [['Captazione', 'Fonte, pretrattamento e mappa punti'], ['Trattamento', 'Filtrazione, disinfezione e stoccaggio'], ['Processo', 'Linea, asset, matrice e criterio'], ['Raffreddamento / CIP', 'Aerosol, utility, pulizia e risciacquo'], ['Laboratorio', 'Kit, metodo, risultato e CoA'], ['Decisione', 'Azione, ricampionamento, report e chiusura']],
    digitalProof: ['Contesto di stabilimento: Sedi, circuiti, punti, asset, campioni, metodi e responsabili restano collegati.', 'Visibilità decisionale: I team vedono quale linea, utility o processo può essere interessato da ogni risultato.', 'Continuità documentale: Allegati, CoA, azioni e ricampionamenti restano collegati allo stesso record.', 'Coordinamento fornitori: Laboratori interni, esterni e modelli ibridi condividono lo stesso contesto operativo.'],
    sectionEyebrows: ['Contesto acqua industriale', 'Livello operativo digitale', 'Flusso tracciabile', 'Dato condiviso in stabilimento', 'Mappa controllo impianto', 'Moduli AquaVerify', 'Quadro tecnico', 'Maturità operativa', 'Casi d’uso industriali'],
    matrixHeaders: ['Punto acqua', 'Rischio operativo', 'AquaVerify collega'],
    moduleHeaders: ['Modulo', 'Uso principale', 'Valore per lo stabilimento'],
    faqTitle: 'Domande frequenti',
    formEyebrow: 'Diagnosi acqua di processo industriale',
    formTitle: 'Costruisci un programma tracciabile di controllo acqua per il tuo stabilimento',
    formBody: 'Condividi tipo di stabilimento, circuiti acqua, volume campioni e modello laboratorio. La richiesta continua in AquaVerify Cloud con contesto acqua di processo industriale.',
    formLabels: ['Nome', 'Azienda', 'Email professionale', 'Paese', 'Tipo stabilimento', 'Circuito acqua', 'Modello laboratorio', 'Campioni al mese', 'Metodo attuale', 'Esigenza principale'],
    formPlaceholders: ['Nome e cognome', 'Azienda industriale o gruppo di stabilimenti', 'nome@azienda.com', 'Spagna, Francia, Stati Uniti...', 'Produzione, utility, trattamento, ingegneria...', 'Raffreddamento, processo, CIP, riutilizzo, effluente...', '50, 200, 1000+', 'Laboratorio attuale, kit, Excel, LIMS...', 'Audit, deviazione, colifagi, tracciabilità, riutilizzo...'],
    facilityTypes: ['Stabilimento produttivo', 'Industria chimica o di processo', 'Raffreddamento e utility', 'Impianto trattamento acqua', 'Gruppo industriale multi-sito', 'Ingegneria / manutenzione', 'Altro'],
    labModels: ['Laboratorio interno', 'Laboratorio partner esterno', 'Modello misto', 'Laboratorio pubblico o accreditato', 'Non ancora definito'],
    formSubmit: 'Continua in AquaVerify Cloud',
    formPrivacy: 'Il team commerciale riceve la richiesta con origine, profilo industriale e contesto acqua di processo.'
  },
  ca: {
    heroProof: [
      ['Punts de control', 'Captació, procés, refrigeració, neteja, reutilització i abocament.'],
      ['Microbiologia', 'Indicadors bacterians i colífags somàtics quan el pla els requereix.'],
      ['Tancament de desviacions', 'Responsable, acció correctiva, remostreig i verificació documentada.'],
      ['Històric multi-planta', 'Registres comparables entre plantes, laboratoris i proveïdors.']
    ],
    heroSteps: [['Captació', 'Font, pretractament i mapa de punts'], ['Tractament', 'Filtració, desinfecció i emmagatzematge'], ['Procés', 'Línia, actiu, matriu i criteri'], ['Refrigeració / CIP', 'Aerosols, serveis, neteja i esbandida'], ['Laboratori', 'Kit, mètode, resultat i CoA'], ['Decisió', 'Acció, remostreig, informe i tancament']],
    digitalProof: ['Context de planta: Seus, circuits, punts, actius, mostres, mètodes i responsables romanen connectats.', 'Visibilitat de decisió: L’equip veu quina línia, servei o procés pot quedar afectat per cada resultat.', 'Continuïtat documental: Adjunts, CoA, accions i remostrejos queden vinculats al mateix registre.', 'Coordinació de proveïdors: Laboratoris interns, externs i models mixtos comparteixen un mateix context operatiu.'],
    sectionEyebrows: ['Context de l’aigua industrial', 'Capa operativa digital', 'Flux traçable', 'Dada compartida a planta', 'Mapa de control a planta', 'Mòduls AquaVerify', 'Marc tècnic', 'Maduresa operativa', 'Casos d’ús industrials'],
    matrixHeaders: ['Punt d’aigua', 'Risc operatiu', 'AquaVerify connecta'],
    moduleHeaders: ['Mòdul', 'Ús principal', 'Valor per a la planta'],
    faqTitle: 'Preguntes freqüents',
    formEyebrow: 'Diagnòstic d’aigua de procés industrial',
    formTitle: 'Construeix un programa traçable de control de l’aigua per a la teva planta',
    formBody: 'Comparteix tipus de planta, circuits d’aigua, volum de mostres i model de laboratori. La sol·licitud continua a AquaVerify Cloud amb context d’aigua de procés industrial.',
    formLabels: ['Nom', 'Empresa', 'Email professional', 'País', 'Tipus de planta', 'Circuit d’aigua', 'Model de laboratori', 'Mostres al mes', 'Mètode actual', 'Necessitat principal'],
    formPlaceholders: ['Nom i cognoms', 'Empresa industrial o grup de plantes', 'nom@empresa.com', 'Espanya, França, Estats Units...', 'Fabricació, serveis, tractament, enginyeria...', 'Refrigeració, procés, CIP, reutilització, efluent...', '50, 200, 1000+', 'Laboratori actual, kit, Excel, LIMS...', 'Auditoria, desviació, colífags, traçabilitat, reutilització...'],
    facilityTypes: ['Planta de fabricació', 'Indústria química o de procés', 'Refrigeració i serveis', 'Instal·lació de tractament d’aigua', 'Grup industrial multi-planta', 'Enginyeria / manteniment', 'Altres'],
    labModels: ['Laboratori intern', 'Laboratori partner extern', 'Model mixt', 'Laboratori públic o acreditat', 'Encara no definit'],
    formSubmit: 'Continuar a AquaVerify Cloud',
    formPrivacy: 'L’equip comercial rep la sol·licitud amb origen, perfil industrial i context d’aigua de procés.'
  }
};

const sectionIcons = [ShieldCheck, Route, ClipboardCheck, Factory, Waves, FlaskConical, FileCheck2, PackageCheck, Beaker, CheckCircle2];

function getSection(content: MarketingContent, index: number, fallback: MarketingSection): MarketingSection {
  return content.sections?.[index] || fallback;
}

function getBullets(section: MarketingSection, fallback: string[] = []) {
  return section.bullets?.length ? section.bullets : fallback;
}

function splitTitleBody(value: string): [string, string] {
  const [title, ...rest] = value.split(':');
  if (rest.length === 0) return [value, ''];
  return [title.trim(), rest.join(':').trim()];
}

function splitMatrix(value: string): [string, string, string] {
  const [scenario, rest] = splitTitleBody(value);
  const [risk, workflow = ''] = rest.split(/AquaVerify:\s*/);
  return [scenario, risk.trim(), workflow.trim()];
}

function splitModule(value: string): [string, string, string] {
  const [title, rest] = splitTitleBody(value);
  const [firstSentence, ...remaining] = rest.split('. ');
  return [title, firstSentence.trim().replace(/\.$/, ''), remaining.join('. ').trim()];
}

function splitReference(value: string): [string, string, string] {
  const urlMatch = value.match(/(https?:\/\/\S+)$/);
  const href = urlMatch?.[1] || '';
  const cleanValue = href ? value.replace(href, '').trim() : value;
  const [title, body] = splitTitleBody(cleanValue);
  return [title, body.replace(/\.$/, ''), href];
}

function splitOutcome(value: string): [string, string, string] {
  const [step, rest] = splitTitleBody(value.replace(/^\d+\.\s*/, ''));
  const [body, outcome = ''] = rest.split(/(?:Outcome|Resultado|Résultat|Risultato|Resultat):\s*/);
  return [step, body.trim(), outcome.trim()];
}

const SectionHead: React.FC<{ eyebrow: string; title: string; body?: string; center?: boolean; inverse?: boolean }> = ({ eyebrow, title, body, center = false, inverse = false }) => (
  <div className={`max-w-4xl ${center ? 'mx-auto text-center' : ''}`}>
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.16em] ${inverse ? 'border-white/15 bg-white/10 text-cyan-100' : 'border-cyan-100 bg-cyan-50 text-cyan-700'}`}>{eyebrow}</span>
    <h2 className={`mt-4 font-heading text-3xl font-black leading-tight md:text-5xl ${inverse ? 'text-white' : 'text-slate-950'}`}>{title}</h2>
    {body && <p className={`mt-4 text-base leading-8 md:text-lg ${inverse ? 'text-cyan-50/75' : 'text-slate-600'}`}>{body}</p>}
  </div>
);

const FormField: React.FC<{ label: string; name: string; type?: string; placeholder?: string; required?: boolean }> = ({ label, name, type = 'text', placeholder, required = false }) => (
  <label className="grid gap-2 text-sm font-black text-slate-800">
    {label}
    <input name={name} type={type} placeholder={placeholder} required={required} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100" />
  </label>
);

const CardGrid: React.FC<{ items: string[]; offset?: number; cols?: string }> = ({ items, offset = 0, cols = 'md:grid-cols-2 xl:grid-cols-4' }) => (
  <div className={`mt-8 grid gap-5 ${cols}`}>
    {items.map((item, index) => {
      const [title, body] = splitTitleBody(item);
      const Icon = sectionIcons[(index + offset) % sectionIcons.length] || CheckCircle2;
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

export const IndustrialProcessWaterLanding: React.FC<Props> = ({ content, pageLang, showCookieConsent = true }) => {
  const copy = COPY[pageLang] || COPY.en;
  const sourceSections = Array.from({ length: 9 }, (_, index) => getSection(content, index, {
    title: copy.sectionEyebrows[index],
    body: content.description,
    bullets: []
  }));
  const sections = [
    sourceSections[0],
    sourceSections[1],
    sourceSections[2],
    sourceSections[3],
    sourceSections[4],
    sourceSections[5],
    sourceSections[8],
    sourceSections[6],
    sourceSections[7]
  ];
  const signupUrl = getPlatformSignupUrl({
    intent: 'industrial_process_water',
    page: 'industrial-process-water',
    category: 'industries',
    profile: 'industrial',
    module: 'industrial-process-water-diagnosis'
  }, pageLang);

  const handleCtaClick = (label: string) => {
    trackCorporateEvent('platform_link_click', {
      lang: pageLang,
      page: 'industrial-process-water',
      category: 'industries',
      intent: 'industrial_process_water',
      profile: 'industrial',
      label,
      target_url: signupUrl,
      path: content.path
    });
  };

  const leadCapture = useMarketingLeadCapture({
    formKey: 'industrial-process-water-diagnosis',
    requestType: 'industrial_process_water',
    lang: pageLang,
    sourcePath: content.path,
    detailFields: ['facility_type', 'water_use', 'lab_model', 'sample_volume', 'current_method'],
    details: { page: 'industrial-process-water', category: 'industries', profile: 'industrial', module: 'industrial-process-water-diagnosis' },
    onAccepted: () => trackCorporateEvent('industrial_process_water_diagnosis_submit', {
      lang: pageLang,
      page: 'industrial-process-water',
      category: 'industries',
      intent: 'industrial_process_water',
      profile: 'industrial',
      module: 'industrial-process-water-diagnosis'
    })
  });

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-900">
      <Header />
      <main className="flex-grow pt-20">
        <section className="aq-page-hero">
          <div className="absolute inset-0 bg-transparent" />
          <div className="container relative z-10 mx-auto grid gap-10 px-6 py-16 md:py-24 lg:grid-cols-[minmax(0,1fr)_27rem] lg:items-center">
            <div className="max-w-4xl">
              <div className="aq-hero-eyebrow">
                {content.eyebrow || copy.sectionEyebrows[0]}
              </div>
              <h1 className="aq-gradient-title mt-6 font-heading text-4xl font-black leading-tight md:text-6xl">{content.title}</h1>
              <p className="aq-hero-copy mt-6 max-w-3xl text-lg leading-8">{content.description}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={signupUrl} onClick={() => handleCtaClick(content.primaryCta || copy.formSubmit)} className="aq-cta-primary">
                  {content.primaryCta || copy.formSubmit}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a href="#flujo" className="aq-cta-secondary">
                  {content.secondaryCta || sections[2].title}
                </a>
              </div>
            </div>

            <aside className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur">
              <h2 className="font-heading text-2xl font-black">{sections[2].title}</h2>
              <div className="mt-5 grid gap-3">
                {copy.heroSteps.map(([title, body], index) => (
                  <div key={title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-2xl border border-white/15 bg-white/10 p-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-sm font-black">{index + 1}</span>
                    <span>
                      <strong className="block text-sm font-black">{title}</strong>
                      <span className="block text-xs font-semibold text-cyan-50/75">{body}</span>
                    </span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="relative z-10 bg-white">
          <div className="container mx-auto grid gap-4 px-6 py-8 md:grid-cols-2 xl:grid-cols-4">
            {copy.heroProof.map(([title, body]) => (
              <article key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="font-heading text-lg font-black text-primary">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <IndustryBuyerProblemsSection buyerProblems={content.buyerProblems} pageLang={pageLang} />

        <section id="reto" className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[0]} title={sections[0].title} body={sections[0].body} />
            <CardGrid items={getBullets(sections[0])} />
          </div>
        </section>

        <section id="equipos" className="bg-primary py-16 text-white md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[1]} title={sections[1].title} body={sections[1].body} inverse />
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {getBullets(sections[1], copy.digitalProof).map((item) => {
                const [title, body] = splitTitleBody(item);
                return (
                  <article key={item} className="rounded-2xl border border-white/15 bg-white/10 p-5">
                    <h3 className="font-heading text-lg font-black text-white">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-cyan-50/75">{body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="flujo" className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[2]} title={sections[2].title} body={sections[2].body} />
            <ol className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {getBullets(sections[2]).map((item, index) => {
                const [title, body] = splitTitleBody(item);
                return (
                  <li key={`${item}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-black text-white">{String(index + 1).padStart(2, '0')}</span>
                    <h3 className="mt-4 font-heading text-lg font-black text-slate-950">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section id="aplicaciones" className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[3]} title={sections[3].title} body={sections[3].body} center />
            <CardGrid items={getBullets(sections[3])} offset={3} cols="md:grid-cols-2 xl:grid-cols-3" />
          </div>
        </section>

        <section id="mapa" className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[4]} title={sections[4].title} body={sections[4].body} />
            <div className="mt-8 grid gap-4">
              <div className="hidden grid-cols-[0.8fr_1fr_1fr] gap-4 md:grid">
                {copy.matrixHeaders.map((header) => <div key={header} className="rounded-2xl bg-cyan-50 px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-cyan-800">{header}</div>)}
              </div>
              {getBullets(sections[4]).map((item) => {
                const [stage, risk, workflow] = splitMatrix(item);
                return (
                  <article key={item} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[0.8fr_1fr_1fr]">
                    {[stage, risk, workflow].map((value, index) => (
                      <div key={`${item}-${index}`}>
                        <div className="mb-1 text-[10px] font-black uppercase tracking-[0.12em] text-slate-400 md:hidden">{copy.matrixHeaders[index]}</div>
                        <p className={`${index === 0 ? 'font-heading text-lg font-black text-primary' : 'text-sm font-semibold leading-6 text-slate-600'}`}>{value}</p>
                      </div>
                    ))}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="modulos" className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[5]} title={sections[5].title} body={sections[5].body} />
            <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
              <div className="grid bg-primary text-xs font-black uppercase tracking-[0.12em] text-white md:grid-cols-[0.8fr_0.8fr_1.4fr]">
                {copy.moduleHeaders.map((header) => <div key={header} className="px-5 py-4">{header}</div>)}
              </div>
              <div className="divide-y divide-slate-100">
                {getBullets(sections[5]).map((item) => {
                  const [title, valueText, body] = splitModule(item);
                  return (
                    <div key={item} className="grid gap-3 px-5 py-5 md:grid-cols-[0.8fr_0.8fr_1.4fr]">
                      <h3 className="font-heading text-base font-black text-primary">{title}</h3>
                      <p className="text-sm font-black leading-6 text-cyan-700">{valueText}</p>
                      <p className="text-sm leading-6 text-slate-600">{body}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="normativa" className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[6]} title={sections[6].title} body={sections[6].body} />
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {getBullets(sections[6]).map((item) => {
                const [title, body, href] = splitReference(item);
                const card = (
                  <article className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg">
                    <FileCheck2 className="h-7 w-7 text-secondary" />
                    <h3 className="mt-4 font-heading text-lg font-black text-slate-950">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
                  </article>
                );
                return href ? <a key={item} href={href} target="_blank" rel="noreferrer">{card}</a> : <div key={item}>{card}</div>;
              })}
            </div>
          </div>
        </section>

        <section id="madurez" className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[7]} title={sections[7].title} body={sections[7].body} />
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {getBullets(sections[7]).map((item, index) => {
                const [title, body, outcome] = splitOutcome(item);
                return (
                  <article key={item} className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="absolute right-4 top-1 font-heading text-6xl font-black leading-none text-cyan-50">{index + 1}</div>
                    <h3 className="relative font-heading text-lg font-black text-primary">{title}</h3>
                    <p className="relative mt-3 text-sm leading-6 text-slate-600">{body}</p>
                    {outcome && <div className="relative mt-4 inline-flex rounded-full bg-cyan-50 px-3 py-1 text-xs font-black text-cyan-800">{outcome}</div>}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="implantacion" className="bg-primary py-16 text-white md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[8]} title={sections[8].title} body={sections[8].body} center inverse />
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {getBullets(sections[8]).map((item) => {
                const [title, body] = splitTitleBody(item);
                return (
                  <article key={item} className="rounded-2xl border border-white/15 bg-white p-5 text-slate-900 shadow-lg">
                    <h3 className="font-heading text-lg font-black text-primary">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {content.faqs?.length ? (
          <section id="faq" className="bg-white py-16 md:py-20">
            <div className="container mx-auto px-6">
              <SectionHead eyebrow="FAQ" title={copy.faqTitle} />
              <div className="mt-8 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                {content.faqs.map((faq) => (
                  <details key={faq.question} className="group py-5 first:pt-0 last:pb-0">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-lg font-black text-slate-950">
                      {faq.question}
                      <span className="rounded-full bg-cyan-50 px-3 py-1 text-cyan-700 transition group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <IndustryGlossaryTerms industryId="industrial-process-water" lang={pageLang} />

        <section id="diagnostico" className="bg-slate-50 py-16 pb-24 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.formEyebrow} title={copy.formTitle} body={copy.formBody} center />
            <form onSubmit={leadCapture.handleSubmit} className="relative mx-auto mt-8 max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:p-8">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField label={copy.formLabels[0]} name="name" placeholder={copy.formPlaceholders[0]} required />
                <FormField label={copy.formLabels[1]} name="company" placeholder={copy.formPlaceholders[1]} required />
                <FormField label={copy.formLabels[2]} name="email" type="email" placeholder={copy.formPlaceholders[2]} required />
                <FormField label={copy.formLabels[3]} name="country" placeholder={copy.formPlaceholders[3]} />
                <label className="grid gap-2 text-sm font-black text-slate-800">
                  {copy.formLabels[4]}
                  <select name="facility_type" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100">
                    {copy.facilityTypes.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
                <FormField label={copy.formLabels[5]} name="water_use" placeholder={copy.formPlaceholders[5]} />
                <label className="grid gap-2 text-sm font-black text-slate-800">
                  {copy.formLabels[6]}
                  <select name="lab_model" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100">
                    {copy.labModels.map((model) => <option key={model}>{model}</option>)}
                  </select>
                </label>
                <FormField label={copy.formLabels[7]} name="sample_volume" placeholder={copy.formPlaceholders[6]} />
                <FormField label={copy.formLabels[8]} name="current_method" placeholder={copy.formPlaceholders[7]} />
                <label className="grid gap-2 text-sm font-black text-slate-800 md:col-span-2">
                  {copy.formLabels[9]}
                  <textarea name="main_need" placeholder={copy.formPlaceholders[8]} className="min-h-28 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100" />
                </label>
                <MarketingLeadFormControls lang={pageLang} submitLabel={copy.formSubmit} privacyNote={copy.formPrivacy} status={leadCapture.status} copy={leadCapture.copy} />
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
