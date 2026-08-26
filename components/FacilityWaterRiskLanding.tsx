import React from 'react';
import { ArrowRight, Beaker, CheckCircle2, ClipboardCheck, Factory, FileCheck2, FlaskConical, PackageCheck, Route, ShieldCheck, Waves } from 'lucide-react';
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

type MarketingContent = {
  path: string;
  title: string;
  description: string;
  eyebrow?: string;
  primaryCta?: string;
  secondaryCta?: string;
  sections?: MarketingSection[];
  faqs?: Array<{ question: string; answer: string }>;
};

type Props = {
  content: MarketingContent;
  pageLang: Language;
  showCookieConsent?: boolean;
};

type FacilityCopy = {
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

const COPY: Record<Language, FacilityCopy> = {
  en: {
    heroProof: [
      ['Asset inventory', 'Sites, buildings, loops, tanks, terminal points and sensitive areas.'],
      ['Recurring control', 'Sampling, reviews, cleaning, inspections and closure evidence.'],
      ['Supplier chain', 'Maintenance, laboratories and owners working from one history.'],
      ['Audit readiness', 'Point-level evidence, deviations, resampling and documented closure.']
    ],
    heroSteps: [['Map assets', 'Sites, buildings, loops and points'], ['Classify risk', 'Use, exposure, temperature and history'], ['Plan controls', 'Calendar, tasks, sampling and evidence'], ['Field execution', 'Operator, point, photos and custody'], ['Lab review', 'Method, result, CoA and trend'], ['Close actions', 'Correction, resampling and auditable closure']],
    digitalProof: ['Site context: Buildings, assets, loops, points, suppliers and tasks stay connected.', 'Decision visibility: Teams see overdue controls, open actions, risk points and affected assets.', 'Evidence continuity: Field notes, reports, CoA, deviations and closures remain attached to the point.', 'Portfolio coordination: Multi-site managers compare sites, suppliers, response times and recurring deviations.'],
    sectionEyebrows: ['Water risk in facilities', 'Teams involved', 'Traceable workflow', 'Facilities and assets', 'Risk map', 'AquaVerify ecosystem', 'Technical references', 'Control maturity', 'Practical deployment'],
    matrixHeaders: ['Control area', 'Operational risk', 'AquaVerify connects'],
    moduleHeaders: ['Module', 'Primary use', 'Value for the facility'],
    faqTitle: 'Frequently asked questions',
    formEyebrow: 'Facility water risk diagnosis',
    formTitle: 'Turn your facility water controls into a traceable risk programme',
    formBody: 'Share building type, assets, sampling volume and supplier model. The request continues in AquaVerify Cloud with facility water-risk context.',
    formLabels: ['Name', 'Company', 'Professional email', 'Country', 'Facility type', 'Water assets', 'Laboratory model', 'Samples per month', 'Current method', 'Main need'],
    formPlaceholders: ['Name and surname', 'Facility owner, operator or service company', 'name@company.com', 'Spain, France, United States...', 'Hotel, hospital, campus, public building...', 'Showers, DHW, tanks, towers, spas, fountains...', '50, 200, 1000+', 'Current supplier, lab, spreadsheet, CMMS...', 'Legionella plan, audit, recurrence, suppliers, traceability...'],
    facilityTypes: ['Hotel / hospitality', 'Healthcare or care home', 'Sports centre / pool / spa', 'Campus or public building', 'Industrial or logistics site', 'Multi-site portfolio', 'Facility service company', 'Other'],
    labModels: ['Internal laboratory', 'External partner laboratory', 'Mixed model', 'Public or accredited laboratory', 'Not defined yet'],
    formSubmit: 'Continue in AquaVerify Cloud',
    formPrivacy: 'The commercial team receives the request with origin, facility profile and water-risk context.'
  },
  es: {
    heroProof: [
      ['Inventario de activos', 'Sedes, edificios, circuitos, depósitos, puntos terminales y zonas sensibles.'],
      ['Control recurrente', 'Muestreos, revisiones, limpiezas, inspecciones y evidencias de cierre.'],
      ['Cadena proveedor-laboratorio', 'Mantenimiento, laboratorios y propiedad trabajando sobre un mismo histórico.'],
      ['Preparación para auditoría', 'Evidencia por punto, desviaciones, remuestreos y cierre documentado.']
    ],
    heroSteps: [['Mapear activos', 'Sedes, edificios, circuitos y puntos'], ['Clasificar riesgo', 'Uso, exposición, temperatura e histórico'], ['Planificar controles', 'Calendario, tareas, muestras y evidencias'], ['Ejecutar en campo', 'Operador, punto, fotos y custodia'], ['Revisar laboratorio', 'Método, resultado, CoA y tendencia'], ['Cerrar acciones', 'Corrección, remuestreo y cierre auditable']],
    digitalProof: ['Contexto de instalación: Edificios, activos, circuitos, puntos, proveedores y tareas permanecen conectados.', 'Visibilidad de decisión: El equipo ve controles vencidos, acciones abiertas, puntos de riesgo y activos afectados.', 'Continuidad documental: Notas de campo, informes, CoA, desviaciones y cierres quedan asociados al punto.', 'Coordinación multi-sede: Los gestores comparan centros, proveedores, tiempos de respuesta y desviaciones recurrentes.'],
    sectionEyebrows: ['Riesgo hídrico en instalaciones', 'Equipos que intervienen', 'Flujo trazable', 'Instalaciones y activos', 'Mapa de riesgo', 'Ecosistema AquaVerify', 'Referencias técnicas', 'Madurez del control', 'Implantación práctica'],
    matrixHeaders: ['Área de control', 'Riesgo operativo', 'AquaVerify conecta'],
    moduleHeaders: ['Módulo', 'Uso principal', 'Valor para la instalación'],
    faqTitle: 'Preguntas frecuentes',
    formEyebrow: 'Diagnóstico de riesgo hídrico en instalaciones',
    formTitle: 'Convierte los controles del agua de tus instalaciones en un programa trazable',
    formBody: 'Comparte tipo de edificio, activos, volumen de muestras y modelo de proveedores. La solicitud continúa en AquaVerify Cloud con contexto de riesgo hídrico en instalaciones.',
    formLabels: ['Nombre', 'Empresa', 'Email profesional', 'País', 'Tipo de instalación', 'Activos de agua', 'Modelo de laboratorio', 'Muestras al mes', 'Método actual', 'Necesidad principal'],
    formPlaceholders: ['Nombre y apellidos', 'Propiedad, operador o empresa de facility', 'nombre@empresa.com', 'España, Francia, Estados Unidos...', 'Hotel, hospital, campus, edificio público...', 'Duchas, ACS, depósitos, torres, spas, fuentes...', '50, 200, 1000+', 'Proveedor actual, laboratorio, Excel, CMMS...', 'Legionella, auditoría, recurrencia, proveedores, trazabilidad...'],
    facilityTypes: ['Hotel / hospitality', 'Hospital, clínica o residencia', 'Centro deportivo / piscina / spa', 'Campus o edificio público', 'Centro industrial o logístico', 'Cartera multi-sede', 'Empresa facility services', 'Otro'],
    labModels: ['Laboratorio interno', 'Laboratorio partner externo', 'Modelo mixto', 'Laboratorio público o acreditado', 'Todavía no definido'],
    formSubmit: 'Continuar en AquaVerify Cloud',
    formPrivacy: 'El equipo comercial recibe la solicitud con origen, perfil de instalación y contexto de riesgo hídrico.'
  },
  fr: {
    heroProof: [
      ['Inventaire des actifs', 'Sites, bâtiments, boucles, réservoirs, points terminaux et zones sensibles.'],
      ['Contrôle récurrent', 'Prélèvements, revues, nettoyages, inspections et preuves de clôture.'],
      ['Chaîne prestataire-laboratoire', 'Maintenance, laboratoires et propriétaires sur le même historique.'],
      ['Préparation audit', 'Preuves par point, écarts, reprélèvements et clôture documentée.']
    ],
    heroSteps: [['Cartographier', 'Sites, bâtiments, boucles et points'], ['Classer le risque', 'Usage, exposition, température et historique'], ['Planifier', 'Calendrier, tâches, prélèvements et preuves'], ['Exécuter terrain', 'Opérateur, point, photos et traçabilité'], ['Revoir laboratoire', 'Méthode, résultat, CoA et tendance'], ['Clôturer', 'Correction, reprélèvement et clôture auditable']],
    digitalProof: ['Contexte installation: Bâtiments, actifs, boucles, points, prestataires et tâches restent connectés.', 'Visibilité décisionnelle: Les équipes voient contrôles en retard, actions ouvertes, points à risque et actifs concernés.', 'Continuité documentaire: Notes terrain, rapports, CoA, écarts et clôtures restent liés au point.', 'Coordination multi-sites: Les gestionnaires comparent sites, prestataires, délais de réponse et écarts récurrents.'],
    sectionEyebrows: ['Risque hydrique en installations', 'Équipes impliquées', 'Flux traçable', 'Installations et actifs', 'Carte de risque', 'Écosystème AquaVerify', 'Références techniques', 'Maturité du contrôle', 'Déploiement pratique'],
    matrixHeaders: ['Zone de contrôle', 'Risque opérationnel', 'AquaVerify relie'],
    moduleHeaders: ['Module', 'Usage principal', 'Valeur pour l’installation'],
    faqTitle: 'Questions fréquentes',
    formEyebrow: 'Diagnostic risque hydrique en installations',
    formTitle: 'Transformez les contrôles d’eau de vos installations en programme traçable',
    formBody: 'Partagez type de bâtiment, actifs, volume d’échantillons et modèle prestataire. La demande continue dans AquaVerify Cloud avec le contexte risque hydrique en installations.',
    formLabels: ['Nom', 'Entreprise', 'Email professionnel', 'Pays', 'Type d’installation', 'Actifs eau', 'Modèle laboratoire', 'Échantillons par mois', 'Méthode actuelle', 'Besoin principal'],
    formPlaceholders: ['Nom et prénom', 'Propriétaire, opérateur ou société facility', 'nom@entreprise.com', 'Espagne, France, États-Unis...', 'Hôtel, hôpital, campus, bâtiment public...', 'Douches, ECS, réservoirs, tours, spas, fontaines...', '50, 200, 1000+', 'Prestataire actuel, laboratoire, Excel, CMMS...', 'Legionella, audit, récurrence, prestataires, traçabilité...'],
    facilityTypes: ['Hôtel / hospitality', 'Hôpital, clinique ou résidence', 'Centre sportif / piscine / spa', 'Campus ou bâtiment public', 'Site industriel ou logistique', 'Portefeuille multi-sites', 'Société facility services', 'Autre'],
    labModels: ['Laboratoire interne', 'Laboratoire partenaire externe', 'Modèle mixte', 'Laboratoire public ou accrédité', 'Pas encore défini'],
    formSubmit: 'Continuer dans AquaVerify Cloud',
    formPrivacy: 'L’équipe commerciale reçoit la demande avec origine, profil installation et contexte de risque hydrique.'
  },
  it: {
    heroProof: [
      ['Inventario asset', 'Siti, edifici, circuiti, serbatoi, punti terminali e aree sensibili.'],
      ['Controllo ricorrente', 'Campionamenti, revisioni, pulizie, ispezioni ed evidenze di chiusura.'],
      ['Catena fornitore-laboratorio', 'Manutenzione, laboratori e proprietà sullo stesso storico.'],
      ['Preparazione audit', 'Evidenze per punto, deviazioni, ricampionamenti e chiusura documentata.']
    ],
    heroSteps: [['Mappare asset', 'Siti, edifici, circuiti e punti'], ['Classificare rischio', 'Uso, esposizione, temperatura e storico'], ['Pianificare', 'Calendario, task, campioni ed evidenze'], ['Eseguire in campo', 'Operatore, punto, foto e custodia'], ['Rivedere laboratorio', 'Metodo, risultato, CoA e trend'], ['Chiudere azioni', 'Correzione, ricampionamento e chiusura auditabile']],
    digitalProof: ['Contesto struttura: Edifici, asset, circuiti, punti, fornitori e task restano collegati.', 'Visibilità decisionale: I team vedono controlli scaduti, azioni aperte, punti a rischio e asset coinvolti.', 'Continuità documentale: Note di campo, report, CoA, deviazioni e chiusure restano collegati al punto.', 'Coordinamento multi-sito: I gestori confrontano siti, fornitori, tempi di risposta e deviazioni ricorrenti.'],
    sectionEyebrows: ['Rischio idrico nelle strutture', 'Team coinvolti', 'Flusso tracciabile', 'Strutture e asset', 'Mappa rischio', 'Ecosistema AquaVerify', 'Riferimenti tecnici', 'Maturità del controllo', 'Implementazione pratica'],
    matrixHeaders: ['Area di controllo', 'Rischio operativo', 'AquaVerify collega'],
    moduleHeaders: ['Modulo', 'Uso principale', 'Valore per la struttura'],
    faqTitle: 'Domande frequenti',
    formEyebrow: 'Diagnosi rischio idrico strutture',
    formTitle: 'Trasforma i controlli acqua delle tue strutture in un programma tracciabile',
    formBody: 'Condividi tipo di edificio, asset, volume campioni e modello fornitori. La richiesta continua in AquaVerify Cloud con contesto rischio idrico nelle strutture.',
    formLabels: ['Nome', 'Azienda', 'Email professionale', 'Paese', 'Tipo struttura', 'Asset acqua', 'Modello laboratorio', 'Campioni al mese', 'Metodo attuale', 'Esigenza principale'],
    formPlaceholders: ['Nome e cognome', 'Proprietà, operatore o società facility', 'nome@azienda.com', 'Spagna, Francia, Stati Uniti...', 'Hotel, ospedale, campus, edificio pubblico...', 'Docce, ACS, serbatoi, torri, spa, fontane...', '50, 200, 1000+', 'Fornitore attuale, laboratorio, Excel, CMMS...', 'Legionella, audit, ricorrenza, fornitori, tracciabilità...'],
    facilityTypes: ['Hotel / hospitality', 'Ospedale, clinica o residenza', 'Centro sportivo / piscina / spa', 'Campus o edificio pubblico', 'Sito industriale o logistico', 'Portafoglio multi-sito', 'Società facility services', 'Altro'],
    labModels: ['Laboratorio interno', 'Laboratorio partner esterno', 'Modello misto', 'Laboratorio pubblico o accreditato', 'Non ancora definito'],
    formSubmit: 'Continua in AquaVerify Cloud',
    formPrivacy: 'Il team commerciale riceve la richiesta con origine, profilo struttura e contesto rischio idrico.'
  },
  ca: {
    heroProof: [
      ['Inventari d’actius', 'Seus, edificis, circuits, dipòsits, punts terminals i zones sensibles.'],
      ['Control recurrent', 'Mostrejos, revisions, neteges, inspeccions i evidències de tancament.'],
      ['Cadena proveïdor-laboratori', 'Manteniment, laboratoris i propietat treballant sobre un mateix històric.'],
      ['Preparació per auditoria', 'Evidència per punt, desviacions, remostrejos i tancament documentat.']
    ],
    heroSteps: [['Mapar actius', 'Seus, edificis, circuits i punts'], ['Classificar risc', 'Ús, exposició, temperatura i històric'], ['Planificar', 'Calendari, tasques, mostres i evidències'], ['Executar en camp', 'Operador, punt, fotos i custòdia'], ['Revisar laboratori', 'Mètode, resultat, CoA i tendència'], ['Tancar accions', 'Correcció, remostreig i tancament auditable']],
    digitalProof: ['Context d’instal·lació: Edificis, actius, circuits, punts, proveïdors i tasques romanen connectats.', 'Visibilitat de decisió: L’equip veu controls vençuts, accions obertes, punts de risc i actius afectats.', 'Continuïtat documental: Notes de camp, informes, CoA, desviacions i tancaments queden associats al punt.', 'Coordinació multi-seu: Els gestors comparen centres, proveïdors, temps de resposta i desviacions recurrents.'],
    sectionEyebrows: ['Risc hídric en instal·lacions', 'Equips que intervenen', 'Flux traçable', 'Instal·lacions i actius', 'Mapa de risc', 'Ecosistema AquaVerify', 'Referències tècniques', 'Maduresa del control', 'Implantació pràctica'],
    matrixHeaders: ['Àrea de control', 'Risc operatiu', 'AquaVerify connecta'],
    moduleHeaders: ['Mòdul', 'Ús principal', 'Valor per a la instal·lació'],
    faqTitle: 'Preguntes freqüents',
    formEyebrow: 'Diagnòstic de risc hídric en instal·lacions',
    formTitle: 'Converteix els controls d’aigua de les teves instal·lacions en un programa traçable',
    formBody: 'Comparteix tipus d’edifici, actius, volum de mostres i model de proveïdors. La sol·licitud continua a AquaVerify Cloud amb context de risc hídric en instal·lacions.',
    formLabels: ['Nom', 'Empresa', 'Email professional', 'País', 'Tipus d’instal·lació', 'Actius d’aigua', 'Model de laboratori', 'Mostres al mes', 'Mètode actual', 'Necessitat principal'],
    formPlaceholders: ['Nom i cognoms', 'Propietat, operador o empresa facility', 'nom@empresa.com', 'Espanya, França, Estats Units...', 'Hotel, hospital, campus, edifici públic...', 'Dutxes, ACS, dipòsits, torres, spas, fonts...', '50, 200, 1000+', 'Proveïdor actual, laboratori, Excel, CMMS...', 'Legionel·la, auditoria, recurrència, proveïdors, traçabilitat...'],
    facilityTypes: ['Hotel / hospitality', 'Hospital, clínica o residència', 'Centre esportiu / piscina / spa', 'Campus o edifici públic', 'Centre industrial o logístic', 'Cartera multi-seu', 'Empresa facility services', 'Altres'],
    labModels: ['Laboratori intern', 'Laboratori partner extern', 'Model mixt', 'Laboratori públic o acreditat', 'Encara no definit'],
    formSubmit: 'Continuar a AquaVerify Cloud',
    formPrivacy: 'L’equip comercial rep la sol·licitud amb origen, perfil d’instal·lació i context de risc hídric.'
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
  const [body, outcome = ''] = rest.split(/(?:Outcome|Resultado|Résultat|Risultato|Resultat)\s*:\s*/);
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

export const FacilityWaterRiskLanding: React.FC<Props> = ({ content, pageLang, showCookieConsent = true }) => {
  const copy = COPY[pageLang] || COPY.en;
  const sourceSections = Array.from({ length: 9 }, (_, index) => getSection(content, index, {
    title: copy.sectionEyebrows[index],
    body: content.description,
    bullets: []
  }));
  const sections = sourceSections;
  const signupUrl = getPlatformSignupUrl({
    intent: 'facility_water_risk',
    page: 'facility-water-risk',
    category: 'industries',
    profile: 'facilities',
    module: 'facility-water-risk-diagnosis'
  }, pageLang);

  const handleCtaClick = (label: string) => {
    trackCorporateEvent('platform_link_click', {
      lang: pageLang,
      page: 'facility-water-risk',
      category: 'industries',
      intent: 'facility_water_risk',
      profile: 'facilities',
      label,
      target_url: signupUrl,
      path: content.path
    });
  };

  const leadCapture = useMarketingLeadCapture({
    formKey: 'facility-water-risk-diagnosis',
    requestType: 'facility_water_risk',
    lang: pageLang,
    sourcePath: content.path,
    detailFields: ['facility_type', 'water_use', 'lab_model', 'sample_volume', 'current_method'],
    details: { page: 'facility-water-risk', category: 'industries', profile: 'facilities', module: 'facility-water-risk-diagnosis' },
    onAccepted: (_result, payload) => trackCorporateEvent('facility_water_risk_diagnosis_submit', {
      lang: pageLang,
      page: 'facility-water-risk',
      category: 'industries',
      intent: 'facility_water_risk',
      profile: 'facilities',
      country: payload.details.country,
      facility_type: payload.details.facility_type,
      water_use: payload.details.water_use,
      module: 'facility-water-risk-diagnosis'
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

        <IndustryGlossaryTerms industryId="facility-water-risk" lang={pageLang} />

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
