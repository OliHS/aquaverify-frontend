import React from 'react';
import { ArrowRight, CheckCircle2, ClipboardCheck, FileCheck2, FlaskConical, Landmark, MapPin, Route, ShieldCheck, Waves } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieConsent } from './CookieConsent';
import type { Language } from '../utils/translations';
import { getPlatformSignupUrl } from '../utils/platformLinks';
import { trackCorporateEvent } from '../utils/corporateAnalytics';

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

type MunicipalCopy = {
  heroProof: Array<[string, string]>;
  heroSteps: Array<[string, string]>;
  sectionEyebrows: string[];
  moduleHeaders: string[];
  matrixHeaders: string[];
  references: Array<[string, string, string]>;
  faqEyebrow: string;
  formEyebrow: string;
  formTitle: string;
  formBody: string;
  formLabels: string[];
  formPlaceholders: string[];
  labModels: string[];
  formSubmit: string;
  formPrivacy: string;
};

const COPY: Record<Language, MunicipalCopy> = {
  en: {
    heroProof: [
      ['Source to tap', 'Traceability by location, date, operator and matrix.'],
      ['Somatic coliphages', 'Workflows for viral indicators in water programmes.'],
      ['WSP / risk plans', 'Evidence for water safety plans and risk management.'],
      ['Cloud + App', 'Samples, readings, reports and history in one environment.']
    ],
    heroSteps: [['Source', 'Point and context'], ['Treatment', 'Barrier verification'], ['Tank', 'Operational follow-up'], ['Network', 'Distributed sampling'], ['Laboratory', 'Reading and review'], ['Report', 'Decision and evidence']],
    sectionEyebrows: ['Challenge', 'Solution', 'Operating flow', 'Public service teams', 'Products and modules', 'Control matrix', 'Maturity roadmap', 'Reference context', 'Use cases'],
    moduleHeaders: ['Module', 'Primary use', 'Best suited for'],
    matrixHeaders: ['Scenario', 'Risk to reduce', 'AquaVerify workflow'],
    references: [
      ['Royal Decree 3/2023', 'Spanish technical and health criteria for drinking-water quality, control and supply.', 'https://www.boe.es/buscar/act.php?id=BOE-A-2023-628'],
      ['Directive (EU) 2020/2184', 'European framework for water intended for human consumption and risk-based approach.', 'https://www.boe.es/buscar/doc.php?id=DOUE-L-2020-81947'],
      ['WHO Water Safety Plan Manual', 'Practical guidance to develop and implement water safety plans.', 'https://www.who.int/publications/i/item/9789240067691'],
      ['ISO 10705-2:2000', 'Reference for detection and enumeration of bacteriophages: somatic coliphages.', 'https://www.iso.org/standard/20127.html']
    ],
    faqEyebrow: 'Frequently asked questions',
    formEyebrow: 'Municipal diagnosis',
    formTitle: 'Turn your municipal water programme into a traceable, defensible workflow',
    formBody: 'Share source type, network size, laboratory model, sample volume and reporting needs. The request continues in AquaVerify Cloud with municipal context.',
    formLabels: ['Name', 'Organisation', 'Professional email', 'Country', 'Source type', 'Network size', 'Laboratory model', 'Samples per month', 'Current method', 'Main reporting need'],
    formPlaceholders: ['Name and surname', 'Municipality, operator or laboratory', 'name@organisation.com', 'Spain, France, United States...', 'Surface, groundwater, mixed, treated...', 'Small town, regional network, multi-site...', '50, 200, 1000+', 'Current lab, kit, spreadsheet, LIMS...', 'Audit, WSP, coliphages, incidents, GIS...'],
    labModels: ['Own municipal laboratory', 'Public laboratory', 'External partner laboratory', 'Mixed model', 'Not defined yet'],
    formSubmit: 'Continue in AquaVerify Cloud',
    formPrivacy: 'The commercial team receives the request with source, municipal profile and water-programme context.'
  },
  es: {
    heroProof: [
      ['Captación a grifo', 'Trazabilidad por ubicación, fecha, operador y matriz.'],
      ['Colífagos somáticos', 'Flujos para indicadores víricos en programas de agua.'],
      ['PSA / WSP', 'Evidencia útil para planes sanitarios y gestión del riesgo.'],
      ['Cloud + App', 'Muestras, lecturas, informes e histórico en un mismo entorno.']
    ],
    heroSteps: [['Captación', 'Punto y contexto'], ['Tratamiento', 'Verificación de barreras'], ['Depósito', 'Seguimiento operativo'], ['Red', 'Muestreo distribuido'], ['Laboratorio', 'Lectura y revisión'], ['Informe', 'Decisión y evidencia']],
    sectionEyebrows: ['Reto', 'Solución', 'Flujo operativo', 'Equipos del servicio público', 'Productos y módulos', 'Matriz de control', 'Roadmap de madurez', 'Contexto de referencia', 'Casos de uso'],
    moduleHeaders: ['Módulo', 'Uso principal', 'Ideal para'],
    matrixHeaders: ['Escenario', 'Riesgo que se quiere reducir', 'Flujo AquaVerify'],
    references: [
      ['Real Decreto 3/2023', 'Criterios técnico-sanitarios de la calidad del agua de consumo, su control y suministro en España.', 'https://www.boe.es/buscar/act.php?id=BOE-A-2023-628'],
      ['Directiva (UE) 2020/2184', 'Marco europeo de calidad de las aguas destinadas al consumo humano y enfoque basado en riesgo.', 'https://www.boe.es/buscar/doc.php?id=DOUE-L-2020-81947'],
      ['WHO Water Safety Plan Manual', 'Guía práctica para desarrollar e implementar planes de seguridad del agua.', 'https://www.who.int/publications/i/item/9789240067691'],
      ['ISO 10705-2:2000', 'Referencia para detección y enumeración de bacteriófagos: colífagos somáticos.', 'https://www.iso.org/standard/20127.html']
    ],
    faqEyebrow: 'Preguntas frecuentes',
    formEyebrow: 'Diagnóstico municipal',
    formTitle: 'Convierte tu programa municipal de agua en un flujo trazable y defendible',
    formBody: 'Comparte tipo de captación, tamaño de red, laboratorio implicado, volumen de muestras y necesidades de reporting. La solicitud continúa en AquaVerify Cloud con contexto municipal.',
    formLabels: ['Nombre', 'Organización', 'Email profesional', 'País', 'Tipo de captación', 'Tamaño de red', 'Modelo de laboratorio', 'Muestras al mes', 'Método actual', 'Necesidad principal de reporting'],
    formPlaceholders: ['Nombre y apellidos', 'Ayuntamiento, operador o laboratorio', 'nombre@organizacion.com', 'España, Francia, Estados Unidos...', 'Superficial, subterránea, mixta, tratada...', 'Municipio pequeño, red regional, multi-sede...', '50, 200, 1000+', 'Laboratorio actual, kit, Excel, LIMS...', 'Auditoría, PSA, colífagos, incidencias, GIS...'],
    labModels: ['Laboratorio municipal propio', 'Laboratorio público', 'Laboratorio partner externo', 'Modelo mixto', 'Todavía no definido'],
    formSubmit: 'Continuar en AquaVerify Cloud',
    formPrivacy: 'El equipo comercial recibe la solicitud con origen, perfil municipal y contexto del programa de agua.'
  },
  fr: {
    heroProof: [
      ['Du captage au robinet', 'Traçabilité par lieu, date, opérateur et matrice.'],
      ['Coliphages somatiques', 'Flux pour indicateurs viraux dans les programmes d’eau.'],
      ['PSE / WSP', 'Preuves utiles pour plans de sécurité et gestion des risques.'],
      ['Cloud + App', 'Échantillons, lectures, rapports et historique dans un même environnement.']
    ],
    heroSteps: [['Captage', 'Point et contexte'], ['Traitement', 'Vérification des barrières'], ['Réservoir', 'Suivi opérationnel'], ['Réseau', 'Prélèvement distribué'], ['Laboratoire', 'Lecture et revue'], ['Rapport', 'Décision et preuve']],
    sectionEyebrows: ['Défi', 'Solution', 'Flux opérationnel', 'Équipes du service public', 'Produits et modules', 'Matrice de contrôle', 'Feuille de route', 'Contexte de référence', 'Cas d’usage'],
    moduleHeaders: ['Module', 'Usage principal', 'Idéal pour'],
    matrixHeaders: ['Scénario', 'Risque à réduire', 'Flux AquaVerify'],
    references: [
      ['Décret royal espagnol 3/2023', 'Critères techniques et sanitaires espagnols pour la qualité, le contrôle et la distribution de l’eau de consommation.', 'https://www.boe.es/buscar/act.php?id=BOE-A-2023-628'],
      ['Directive (UE) 2020/2184', 'Cadre européen relatif à la qualité des eaux destinées à la consommation humaine et approche fondée sur les risques.', 'https://www.boe.es/buscar/doc.php?id=DOUE-L-2020-81947'],
      ['Manuel OMS des plans de sécurité sanitaire de l’eau', 'Guide pratique pour élaborer et mettre en œuvre des plans de sécurité de l’eau.', 'https://www.who.int/publications/i/item/9789240067691'],
      ['ISO 10705-2:2000', 'Référence pour la détection et le dénombrement des bactériophages : coliphages somatiques.', 'https://www.iso.org/standard/20127.html']
    ],
    faqEyebrow: 'Questions fréquentes',
    formEyebrow: 'Diagnostic municipal',
    formTitle: 'Transformez votre programme municipal d’eau en flux traçable et défendable',
    formBody: 'Partagez type de captage, taille du réseau, modèle laboratoire, volume d’échantillons et besoins de reporting. La demande continue dans AquaVerify Cloud avec le contexte municipal.',
    formLabels: ['Nom', 'Organisation', 'Email professionnel', 'Pays', 'Type de captage', 'Taille du réseau', 'Modèle laboratoire', 'Échantillons par mois', 'Méthode actuelle', 'Besoin principal de reporting'],
    formPlaceholders: ['Nom et prénom', 'Collectivité, opérateur ou laboratoire', 'nom@organisation.com', 'Espagne, France, États-Unis...', 'Surface, souterraine, mixte, traitée...', 'Petite commune, réseau régional, multi-site...', '50, 200, 1000+', 'Laboratoire actuel, kit, Excel, LIMS...', 'Audit, PSE, coliphages, incidents, SIG...'],
    labModels: ['Laboratoire municipal interne', 'Laboratoire public', 'Laboratoire partenaire externe', 'Modèle mixte', 'Pas encore défini'],
    formSubmit: 'Continuer dans AquaVerify Cloud',
    formPrivacy: 'L’équipe commerciale reçoit la demande avec origine, profil municipal et contexte du programme eau.'
  },
  it: {
    heroProof: [
      ['Dalla captazione al rubinetto', 'Tracciabilità per luogo, data, operatore e matrice.'],
      ['Colifagi somatici', 'Workflow per indicatori virali nei programmi idrici.'],
      ['WSP / piani rischio', 'Evidenze utili per piani di sicurezza e gestione del rischio.'],
      ['Cloud + App', 'Campioni, letture, report e storico in un unico ambiente.']
    ],
    heroSteps: [['Captazione', 'Punto e contesto'], ['Trattamento', 'Verifica barriere'], ['Serbatoio', 'Follow-up operativo'], ['Rete', 'Campionamento distribuito'], ['Laboratorio', 'Lettura e revisione'], ['Report', 'Decisione ed evidenza']],
    sectionEyebrows: ['Sfida', 'Soluzione', 'Flusso operativo', 'Team del servizio pubblico', 'Prodotti e moduli', 'Matrice di controllo', 'Roadmap di maturità', 'Contesto di riferimento', 'Casi d’uso'],
    moduleHeaders: ['Modulo', 'Uso principale', 'Ideale per'],
    matrixHeaders: ['Scenario', 'Rischio da ridurre', 'Workflow AquaVerify'],
    references: [
      ['Regio Decreto spagnolo 3/2023', 'Criteri tecnico-sanitari spagnoli per qualità, controllo e fornitura dell’acqua di consumo.', 'https://www.boe.es/buscar/act.php?id=BOE-A-2023-628'],
      ['Direttiva (UE) 2020/2184', 'Quadro europeo per la qualità delle acque destinate al consumo umano e approccio basato sul rischio.', 'https://www.boe.es/buscar/doc.php?id=DOUE-L-2020-81947'],
      ['Manuale OMS Water Safety Plan', 'Guida pratica per sviluppare e implementare piani di sicurezza dell’acqua.', 'https://www.who.int/publications/i/item/9789240067691'],
      ['ISO 10705-2:2000', 'Riferimento per rilevazione ed enumerazione dei batteriofagi: colifagi somatici.', 'https://www.iso.org/standard/20127.html']
    ],
    faqEyebrow: 'Domande frequenti',
    formEyebrow: 'Diagnosi municipale',
    formTitle: 'Trasforma il programma municipale dell’acqua in un flusso tracciabile e difendibile',
    formBody: 'Condividi tipo di captazione, dimensione rete, modello laboratorio, volume campioni ed esigenze di reporting. La richiesta continua in AquaVerify Cloud con contesto municipale.',
    formLabels: ['Nome', 'Organizzazione', 'Email professionale', 'Paese', 'Tipo di captazione', 'Dimensione rete', 'Modello laboratorio', 'Campioni al mese', 'Metodo attuale', 'Esigenza principale di reporting'],
    formPlaceholders: ['Nome e cognome', 'Comune, gestore o laboratorio', 'nome@organizzazione.com', 'Spagna, Francia, Stati Uniti...', 'Superficiale, sotterranea, mista, trattata...', 'Piccolo comune, rete regionale, multi-sito...', '50, 200, 1000+', 'Laboratorio attuale, kit, Excel, LIMS...', 'Audit, WSP, colifagi, incidenti, GIS...'],
    labModels: ['Laboratorio municipale interno', 'Laboratorio pubblico', 'Laboratorio partner esterno', 'Modello misto', 'Non ancora definito'],
    formSubmit: 'Continua in AquaVerify Cloud',
    formPrivacy: 'Il team commerciale riceve la richiesta con origine, profilo municipale e contesto del programma idrico.'
  },
  ca: {
    heroProof: [
      ['De captació a aixeta', 'Traçabilitat per ubicació, data, operador i matriu.'],
      ['Colífags somàtics', 'Fluxos per a indicadors vírics en programes d’aigua.'],
      ['PSA / WSP', 'Evidència útil per a plans sanitaris i gestió del risc.'],
      ['Cloud + App', 'Mostres, lectures, informes i històric en un mateix entorn.']
    ],
    heroSteps: [['Captació', 'Punt i context'], ['Tractament', 'Verificació de barreres'], ['Dipòsit', 'Seguiment operatiu'], ['Xarxa', 'Mostreig distribuït'], ['Laboratori', 'Lectura i revisió'], ['Informe', 'Decisió i evidència']],
    sectionEyebrows: ['Repte', 'Solució', 'Flux operatiu', 'Equips del servei públic', 'Productes i mòduls', 'Matriu de control', 'Full de ruta', 'Context de referència', 'Casos d’ús'],
    moduleHeaders: ['Mòdul', 'Ús principal', 'Ideal per a'],
    matrixHeaders: ['Escenari', 'Risc que es vol reduir', 'Flux AquaVerify'],
    references: [
      ['Reial decret 3/2023', 'Criteris tècnic-sanitaris de la qualitat de l’aigua de consum, el seu control i subministrament a Espanya.', 'https://www.boe.es/buscar/act.php?id=BOE-A-2023-628'],
      ['Directiva (UE) 2020/2184', 'Marc europeu de qualitat de les aigües destinades al consum humà i enfocament basat en risc.', 'https://www.boe.es/buscar/doc.php?id=DOUE-L-2020-81947'],
      ['Manual OMS de plans de seguretat de l’aigua', 'Guia pràctica per desenvolupar i implementar plans de seguretat de l’aigua.', 'https://www.who.int/publications/i/item/9789240067691'],
      ['ISO 10705-2:2000', 'Referència per a detecció i enumeració de bacteriòfags: colífags somàtics.', 'https://www.iso.org/standard/20127.html']
    ],
    faqEyebrow: 'Preguntes freqüents',
    formEyebrow: 'Diagnòstic municipal',
    formTitle: 'Converteix el teu programa municipal d’aigua en un flux traçable i defensable',
    formBody: 'Comparteix tipus de captació, mida de xarxa, model de laboratori, volum de mostres i necessitats de reporting. La sol·licitud continua a AquaVerify Cloud amb context municipal.',
    formLabels: ['Nom', 'Organització', 'Email professional', 'País', 'Tipus de captació', 'Mida de xarxa', 'Model de laboratori', 'Mostres al mes', 'Mètode actual', 'Necessitat principal de reporting'],
    formPlaceholders: ['Nom i cognoms', 'Ajuntament, operador o laboratori', 'nom@organitzacio.com', 'Espanya, França, Estats Units...', 'Superficial, subterrània, mixta, tractada...', 'Municipi petit, xarxa regional, multi-seu...', '50, 200, 1000+', 'Laboratori actual, kit, Excel, LIMS...', 'Auditoria, PSA, colífags, incidències, GIS...'],
    labModels: ['Laboratori municipal propi', 'Laboratori públic', 'Laboratori partner extern', 'Model mixt', 'Encara no definit'],
    formSubmit: 'Continuar a AquaVerify Cloud',
    formPrivacy: 'L’equip comercial rep la sol·licitud amb origen, perfil municipal i context del programa d’aigua.'
  }
};

const sectionIcons = [ShieldCheck, Route, ClipboardCheck, Landmark, FlaskConical, MapPin, Waves, FileCheck2, CheckCircle2];

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

function splitModule(value: string): [string, string, string] {
  const [title, rest] = splitTitleBody(value);
  const marker = rest.includes(' Ideal: ') ? ' Ideal: ' : rest.includes(' Idéal : ') ? ' Idéal : ' : rest.includes(' Ideale: ') ? ' Ideale: ' : rest.includes(' Ideal per a: ') ? ' Ideal per a: ' : '';
  if (!marker) return [title, rest, ''];
  const [body, ideal] = rest.split(marker);
  return [title, body.trim(), ideal.trim()];
}

function splitMatrix(value: string): [string, string, string] {
  const [title, rest] = splitTitleBody(value);
  const [risk, workflow = ''] = rest.split('→').map((item) => item.trim());
  return [title, risk, workflow];
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

export const MunicipalWaterLanding: React.FC<Props> = ({ content, pageLang, showCookieConsent = true }) => {
  const copy = COPY[pageLang] || COPY.en;
  const sections = [
    getSection(content, 0, { title: copy.sectionEyebrows[0], body: content.description, bullets: [] }),
    getSection(content, 1, { title: copy.sectionEyebrows[1], body: content.description, bullets: [] }),
    getSection(content, 2, { title: copy.sectionEyebrows[2], body: content.description, bullets: [] }),
    getSection(content, 3, { title: copy.sectionEyebrows[3], body: content.description, bullets: [] }),
    getSection(content, 4, { title: copy.sectionEyebrows[4], body: content.description, bullets: [] }),
    getSection(content, 5, { title: copy.sectionEyebrows[5], body: content.description, bullets: [] }),
    getSection(content, 6, { title: copy.sectionEyebrows[6], body: content.description, bullets: [] }),
    getSection(content, 7, { title: copy.sectionEyebrows[7], body: content.description, bullets: [] }),
    getSection(content, 8, { title: copy.sectionEyebrows[8], body: content.description, bullets: [] })
  ];
  const signupUrl = getPlatformSignupUrl({
    intent: 'municipal',
    page: 'municipal-water-testing',
    category: 'industries',
    profile: 'municipal',
    module: 'municipal-water-diagnosis'
  }, pageLang);

  const handleCtaClick = (label: string) => {
    trackCorporateEvent('platform_link_click', {
      lang: pageLang,
      page: 'municipal-water-testing',
      category: 'industries',
      intent: 'municipal',
      profile: 'municipal',
      label,
      target_url: signupUrl,
      path: content.path
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const fields = {
      name: String(form.get('name') || '').trim(),
      company: String(form.get('company') || '').trim(),
      email: String(form.get('email') || '').trim(),
      country: String(form.get('country') || '').trim(),
      source_type: String(form.get('source_type') || '').trim(),
      network_size: String(form.get('network_size') || '').trim(),
      lab_model: String(form.get('lab_model') || '').trim(),
      sample_volume: String(form.get('sample_volume') || '').trim(),
      current_method: String(form.get('current_method') || '').trim(),
      main_need: String(form.get('main_need') || '').trim()
    };

    trackCorporateEvent('municipal_water_diagnosis_submit', {
      lang: pageLang,
      page: 'municipal-water-testing',
      category: 'industries',
      intent: 'municipal',
      profile: 'municipal',
      country: fields.country,
      source_type: fields.source_type,
      module: 'municipal-water-diagnosis'
    });

    window.location.href = getPlatformSignupUrl({
      intent: 'municipal',
      page: 'municipal-water-testing',
      category: 'industries',
      profile: 'municipal',
      module: 'municipal-water-diagnosis',
      product: 'municipal-water-analysis',
      ...fields,
      prefill_name: fields.name,
      prefill_email: fields.email,
      prefill_company: fields.company
    }, pageLang);
  };

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

        <section id="solucion" className="bg-white py-16 md:py-20">
          <div className="container mx-auto grid gap-10 px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
            <SectionHead eyebrow={copy.sectionEyebrows[1]} title={sections[1].title} body={sections[1].body} />
            <CardGrid items={getBullets(sections[1])} offset={1} cols="md:grid-cols-2" />
          </div>
        </section>

        <section id="flujo" className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[2]} title={sections[2].title} body={sections[2].body} />
            <ol className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {getBullets(sections[2]).map((item, index) => {
                const [title, body] = splitTitleBody(item.replace(/^\d+\.\s*/, ''));
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

        <section className="bg-primary py-16 text-white md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[3]} title={sections[3].title} center inverse />
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {getBullets(sections[3]).map((item) => {
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

        <section id="modulos" className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[4]} title={sections[4].title} body={sections[4].body} />
            <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
              <div className="grid bg-primary text-xs font-black uppercase tracking-[0.12em] text-white md:grid-cols-[0.8fr_1.1fr_1.1fr]">
                {copy.moduleHeaders.map((header) => <div key={header} className="px-5 py-4">{header}</div>)}
              </div>
              <div className="divide-y divide-slate-100">
                {getBullets(sections[4]).map((item) => {
                  const [title, body, ideal] = splitModule(item);
                  return (
                    <div key={item} className="grid gap-3 px-5 py-5 md:grid-cols-[0.8fr_1.1fr_1.1fr]">
                      <h3 className="font-heading text-base font-black text-primary">{title}</h3>
                      <p className="text-sm leading-6 text-slate-600">{body}</p>
                      <p className="text-sm font-semibold leading-6 text-slate-700">{ideal}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[5]} title={sections[5].title} body={sections[5].body} />
            <div className="mt-8 grid gap-4">
              <div className="hidden grid-cols-[0.8fr_1fr_1fr] gap-4 md:grid">
                {copy.matrixHeaders.map((header) => <div key={header} className="rounded-2xl bg-cyan-50 px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-cyan-800">{header}</div>)}
              </div>
              {getBullets(sections[5]).map((item) => {
                const [scenario, risk, workflow] = splitMatrix(item);
                return (
                  <article key={item} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[0.8fr_1fr_1fr]">
                    {[scenario, risk, workflow].map((value, index) => (
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

        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[6]} title={sections[6].title} body={sections[6].body} />
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {getBullets(sections[6]).map((item, index) => {
                const [title, body] = splitTitleBody(item.replace(/^\d+\.\s*/, ''));
                return (
                  <article key={item} className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="absolute right-4 top-1 font-heading text-6xl font-black leading-none text-cyan-50">{index + 1}</div>
                    <h3 className="relative font-heading text-lg font-black text-primary">{title}</h3>
                    <p className="relative mt-3 text-sm leading-6 text-slate-600">{body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[7]} title={sections[7].title} body={sections[7].body} />
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {copy.references.map(([title, body, href]) => (
                <a key={title} href={href} target="_blank" rel="noreferrer" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg">
                  <FileCheck2 className="h-7 w-7 text-secondary" />
                  <h3 className="mt-4 font-heading text-lg font-black text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary py-16 text-white md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[8]} title={sections[8].title} center inverse />
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
              <SectionHead eyebrow={copy.faqEyebrow} title={copy.faqEyebrow} />
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

        <section id="diagnostico" className="bg-slate-50 py-16 pb-24 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.formEyebrow} title={copy.formTitle} body={copy.formBody} center />
            <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:p-8">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField label={copy.formLabels[0]} name="name" placeholder={copy.formPlaceholders[0]} required />
                <FormField label={copy.formLabels[1]} name="company" placeholder={copy.formPlaceholders[1]} required />
                <FormField label={copy.formLabels[2]} name="email" type="email" placeholder={copy.formPlaceholders[2]} required />
                <FormField label={copy.formLabels[3]} name="country" placeholder={copy.formPlaceholders[3]} />
                <FormField label={copy.formLabels[4]} name="source_type" placeholder={copy.formPlaceholders[4]} />
                <FormField label={copy.formLabels[5]} name="network_size" placeholder={copy.formPlaceholders[5]} />
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
                <div className="md:col-span-2">
                  <button type="submit" className="aq-cta-primary w-full py-4 md:w-auto">
                    {copy.formSubmit}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                  <p className="mt-3 text-xs font-semibold leading-5 text-slate-500">{copy.formPrivacy}</p>
                </div>
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
