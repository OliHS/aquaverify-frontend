import React from 'react';
import { ArrowRight, Beaker, CheckCircle2, ClipboardCheck, Factory, FileCheck2, FlaskConical, PackageCheck, Route, ShieldCheck, Waves } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieConsent } from './CookieConsent';
import { IndustryGlossaryTerms } from './IndustryGlossaryTerms';
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

type AgricultureCopy = {
  heroProof: Array<[string, string]>;
  heroSteps: Array<[string, string]>;
  sectionEyebrows: string[];
  sectionBodies: string[];
  matrixHeaders: string[];
  moduleHeaders: string[];
  faqTitle: string;
  formEyebrow: string;
  formTitle: string;
  formBody: string;
  formLabels: string[];
  formPlaceholders: string[];
  cropTypes: string[];
  labModels: string[];
  formSubmit: string;
  formPrivacy: string;
};

const COPY: Record<Language, AgricultureCopy> = {
  en: {
    heroProof: [['Plot-level traceability', 'Water sources, sampling points, crops, plots and seasons stay connected.'], ['Irrigation decisions', 'Results, deviations and actions support release, treatment or resampling decisions.'], ['Reclaimed water readiness', 'Evidence by water lot, source, campaign and applicable risk plan.'], ['Audit evidence', 'Reports, CoA, corrective actions and field records are easy to retrieve.']],
    heroSteps: [['Map sources', 'Wells, reservoirs, canals and reclaimed water'], ['Define points', 'Plot, crop, season and irrigation system'], ['Plan analysis', 'Indicators, frequency, matrix and criteria'], ['Sample in field', 'Operator, location, date and custody'], ['Review results', 'CoA, trend, alert and technical context'], ['Decide action', 'Release, treat, repeat or investigate']],
    sectionEyebrows: ['Agricultural water challenges', 'Traceable workflow', 'Teams involved', 'Risk matrix', 'AquaVerify modules', 'Use cases', 'Control maturity', 'Technical references'],
    sectionBodies: ['Agricultural water changes by source, weather, crop, season and operational context. Control needs more than isolated laboratory reports.', 'A connected workflow keeps every source, point, sample, result and action attached to the plot, crop and campaign.', 'AquaVerify helps agronomy, irrigation, quality, sustainability, laboratory and export teams work from the same evidence.', 'Different agricultural water uses require different evidence, frequency and response routes.', 'Combine digital traceability, field execution, reporting and microbiological products according to the analytical plan.', 'Start with the most urgent water control route and scale across farms, plots, crops, suppliers and seasons.', 'Move from scattered checks to a measurable programme that improves every campaign.', 'Use these references to frame sampling, reuse, microbiological indicators and customer audit expectations.'],
    matrixHeaders: ['Scenario', 'Water risk', 'Operational response'],
    moduleHeaders: ['Module', 'Primary use', 'Value for agriculture'],
    faqTitle: 'Frequently asked questions',
    formEyebrow: 'Agricultural water diagnosis',
    formTitle: 'Turn irrigation and agricultural water controls into traceable decisions',
    formBody: 'Share crop type, water source, irrigation model and monthly sample volume. The request continues in AquaVerify Cloud with agricultural water context.',
    formLabels: ['Name', 'Company', 'Professional email', 'Country', 'Crop or operation', 'Water source', 'Laboratory model', 'Samples per month', 'Current method', 'Main need'],
    formPlaceholders: ['Name and surname', 'Farm, cooperative, greenhouse or laboratory', 'name@company.com', 'Spain, France, United States...', 'Berries, leafy greens, citrus, greenhouse...', 'Well, reservoir, canal, reclaimed, hydroponic loop...', '50, 200, 1000+', 'Current lab, kit, spreadsheet, LIMS...', 'Irrigation, export audit, reclaimed water, deviations...'],
    cropTypes: ['Open-field fruit and vegetables', 'Leafy greens / ready-to-eat', 'Berries or high-value crops', 'Greenhouse / hydroponics', 'Packhouse / postharvest', 'Cooperative / grower group', 'Agricultural laboratory', 'Other'],
    labModels: ['Internal laboratory', 'External partner laboratory', 'Mixed model', 'Public or accredited laboratory', 'Not defined yet'],
    formSubmit: 'Continue in AquaVerify Cloud',
    formPrivacy: 'The commercial team receives the request with origin, crop profile, water source and agricultural control context.'
  },
  es: {
    heroProof: [['Trazabilidad por parcela', 'Fuentes, puntos, cultivos, parcelas y campañas quedan conectados.'], ['Decisiones de riego', 'Resultados, desviaciones y acciones apoyan liberar, tratar o remuestrear.'], ['Agua regenerada', 'Evidencia por lote de agua, fuente, campaña y plan de riesgo aplicable.'], ['Evidencia audit-ready', 'Informes, CoA, acciones correctivas y registros de campo localizables.']],
    heroSteps: [['Mapear fuentes', 'Pozos, balsas, canales y agua regenerada'], ['Definir puntos', 'Parcela, cultivo, campaña y sistema de riego'], ['Plan analítico', 'Indicadores, frecuencia, matriz y criterios'], ['Muestreo en campo', 'Operador, ubicación, fecha y custodia'], ['Revisar resultados', 'CoA, tendencia, alerta y contexto técnico'], ['Decidir acción', 'Liberar, tratar, repetir o investigar']],
    sectionEyebrows: ['Retos del agua agrícola', 'Flujo trazable', 'Equipos que intervienen', 'Matriz de riesgo', 'Módulos AquaVerify', 'Casos de uso', 'Madurez del control', 'Referencias técnicas'],
    sectionBodies: ['El agua agrícola cambia por fuente, clima, cultivo, campaña y contexto operativo. El control necesita más que informes aislados.', 'Un flujo conectado mantiene cada fuente, punto, muestra, resultado y acción vinculados a parcela, cultivo y campaña.', 'AquaVerify ayuda a agronomía, riego, calidad, sostenibilidad, laboratorio y exportación a trabajar sobre la misma evidencia.', 'Cada uso agrícola del agua exige evidencias, frecuencia y rutas de respuesta diferentes.', 'Combina trazabilidad digital, ejecución en campo, reporting y productos microbiológicos según el plan analítico.', 'Empieza por el flujo de control más urgente y escala a fincas, parcelas, cultivos, proveedores y campañas.', 'Pasa de controles dispersos a un programa medible que mejora en cada campaña.', 'Referencias útiles para orientar muestreo, reutilización, indicadores microbiológicos y auditorías de clientes.'],
    matrixHeaders: ['Escenario', 'Riesgo hídrico', 'Respuesta operativa'],
    moduleHeaders: ['Módulo', 'Uso principal', 'Valor para agricultura'],
    faqTitle: 'Preguntas frecuentes',
    formEyebrow: 'Diagnóstico de agua agrícola',
    formTitle: 'Convierte los controles de riego y agua agrícola en decisiones trazables',
    formBody: 'Comparte tipo de cultivo, fuente de agua, modelo de riego y volumen de muestras. La solicitud continúa en AquaVerify Cloud con contexto agrícola.',
    formLabels: ['Nombre', 'Empresa', 'Email profesional', 'País', 'Cultivo u operación', 'Fuente de agua', 'Modelo de laboratorio', 'Muestras al mes', 'Método actual', 'Necesidad principal'],
    formPlaceholders: ['Nombre y apellidos', 'Explotación, cooperativa, invernadero o laboratorio', 'nombre@empresa.com', 'España, Francia, Estados Unidos...', 'Berries, hoja verde, cítricos, invernadero...', 'Pozo, balsa, canal, regenerada, hidroponía...', '50, 200, 1000+', 'Laboratorio actual, kit, Excel, LIMS...', 'Riego, auditoría de exportación, agua regenerada, desviaciones...'],
    cropTypes: ['Frutas y hortalizas en campo abierto', 'Hoja verde / listo para consumo', 'Berries o cultivos de alto valor', 'Invernadero / hidroponía', 'Packhouse / postcosecha', 'Cooperativa / grupo productor', 'Laboratorio agrícola', 'Otro'],
    labModels: ['Laboratorio interno', 'Laboratorio partner externo', 'Modelo mixto', 'Laboratorio público o acreditado', 'Todavía no definido'],
    formSubmit: 'Continuar en AquaVerify Cloud',
    formPrivacy: 'El equipo comercial recibe la solicitud con origen, perfil de cultivo, fuente de agua y contexto de control agrícola.'
  },
  fr: {
    heroProof: [['Traçabilité par parcelle', 'Sources, points, cultures, parcelles et campagnes restent connectés.'], ['Décisions d’irrigation', 'Résultats, écarts et actions soutiennent libération, traitement ou reprélèvement.'], ['Eau réutilisée', 'Preuve par lot d’eau, source, campagne et plan de risque applicable.'], ['Preuve pour audit', 'Rapports, CoA, actions correctives et données terrain faciles à retrouver.']],
    heroSteps: [['Cartographier sources', 'Puits, bassins, canaux et eau réutilisée'], ['Définir les points', 'Parcelle, culture, campagne et irrigation'], ['Plan analytique', 'Indicateurs, fréquence, matrice et critères'], ['Prélever terrain', 'Opérateur, lieu, date et traçabilité'], ['Revoir résultats', 'CoA, tendance, alerte et contexte technique'], ['Décider action', 'Libérer, traiter, répéter ou investiguer']],
    sectionEyebrows: ['Défis de l’eau agricole', 'Flux traçable', 'Équipes impliquées', 'Matrice de risque', 'Modules AquaVerify', 'Cas d’usage', 'Maturité du contrôle', 'Références techniques'],
    sectionBodies: ['L’eau agricole varie selon source, météo, culture, campagne et contexte opérationnel. Le contrôle exige plus que des rapports isolés.', 'Un flux connecté garde chaque source, point, échantillon, résultat et action liés à la parcelle, la culture et la campagne.', 'AquaVerify aide agronomie, irrigation, qualité, durabilité, laboratoire et export à travailler sur la même preuve.', 'Chaque usage agricole de l’eau exige des preuves, fréquences et routes de réponse différentes.', 'Combinez traçabilité numérique, exécution terrain, reporting et produits microbiologiques selon le plan analytique.', 'Commencez par le flux de contrôle le plus urgent puis étendez aux exploitations, parcelles, cultures, prestataires et campagnes.', 'Passez de contrôles dispersés à un programme mesurable qui s’améliore à chaque campagne.', 'Références utiles pour cadrer prélèvement, réutilisation, indicateurs microbiologiques et audits clients.'],
    matrixHeaders: ['Scénario', 'Risque hydrique', 'Réponse opérationnelle'],
    moduleHeaders: ['Module', 'Usage principal', 'Valeur agricole'],
    faqTitle: 'Questions fréquentes',
    formEyebrow: 'Diagnostic eau agricole',
    formTitle: 'Transformez les contrôles d’irrigation et d’eau agricole en décisions traçables',
    formBody: 'Partagez type de culture, source d’eau, modèle d’irrigation et volume d’échantillons. La demande continue dans AquaVerify Cloud avec contexte agricole.',
    formLabels: ['Nom', 'Entreprise', 'Email professionnel', 'Pays', 'Culture ou opération', 'Source d’eau', 'Modèle laboratoire', 'Échantillons par mois', 'Méthode actuelle', 'Besoin principal'],
    formPlaceholders: ['Nom et prénom', 'Exploitation, coopérative, serre ou laboratoire', 'nom@entreprise.com', 'Espagne, France, États-Unis...', 'Berries, feuilles vertes, agrumes, serre...', 'Puits, bassin, canal, réutilisée, hydroponie...', '50, 200, 1000+', 'Laboratoire actuel, kit, Excel, LIMS...', 'Irrigation, audit export, eau réutilisée, écarts...'],
    cropTypes: ['Fruits et légumes plein champ', 'Feuilles vertes / prêt-à-consommer', 'Berries ou cultures à forte valeur', 'Serre / hydroponie', 'Packhouse / post-récolte', 'Coopérative / groupe producteurs', 'Laboratoire agricole', 'Autre'],
    labModels: ['Laboratoire interne', 'Laboratoire partenaire externe', 'Modèle mixte', 'Laboratoire public ou accrédité', 'Pas encore défini'],
    formSubmit: 'Continuer dans AquaVerify Cloud',
    formPrivacy: 'L’équipe commerciale reçoit la demande avec origine, profil culture, source d’eau et contexte de contrôle agricole.'
  },
  it: {
    heroProof: [['Tracciabilità per parcella', 'Fonti, punti, colture, parcelle e campagne restano collegati.'], ['Decisioni irrigue', 'Risultati, deviazioni e azioni supportano rilascio, trattamento o ricampionamento.'], ['Acqua riutilizzata', 'Evidenza per lotto d’acqua, fonte, campagna e piano di rischio applicabile.'], ['Evidenza per audit', 'Report, CoA, azioni correttive e registri campo facili da recuperare.']],
    heroSteps: [['Mappare fonti', 'Pozzi, vasche, canali e acqua riutilizzata'], ['Definire punti', 'Parcella, coltura, campagna e irrigazione'], ['Piano analitico', 'Indicatori, frequenza, matrice e criteri'], ['Campionare in campo', 'Operatore, luogo, data e custodia'], ['Rivedere risultati', 'CoA, trend, allerta e contesto tecnico'], ['Decidere azione', 'Rilasciare, trattare, ripetere o investigare']],
    sectionEyebrows: ['Sfide acqua agricola', 'Flusso tracciabile', 'Team coinvolti', 'Matrice rischio', 'Moduli AquaVerify', 'Casi d’uso', 'Maturità del controllo', 'Riferimenti tecnici'],
    sectionBodies: ['L’acqua agricola cambia per fonte, meteo, coltura, campagna e contesto operativo. Il controllo richiede più di report isolati.', 'Un flusso connesso mantiene ogni fonte, punto, campione, risultato e azione collegati a parcella, coltura e campagna.', 'AquaVerify aiuta agronomia, irrigazione, qualità, sostenibilità, laboratorio ed export a lavorare sulla stessa evidenza.', 'Ogni uso agricolo dell’acqua richiede evidenze, frequenze e percorsi di risposta diversi.', 'Combina tracciabilità digitale, esecuzione in campo, reporting e prodotti microbiologici secondo il piano analitico.', 'Inizia dal flusso di controllo più urgente e scala su aziende, parcelle, colture, fornitori e campagne.', 'Passa da controlli dispersi a un programma misurabile che migliora a ogni campagna.', 'Riferimenti utili per inquadrare campionamento, riutilizzo, indicatori microbiologici e audit cliente.'],
    matrixHeaders: ['Scenario', 'Rischio idrico', 'Risposta operativa'],
    moduleHeaders: ['Modulo', 'Uso principale', 'Valore agricolo'],
    faqTitle: 'Domande frequenti',
    formEyebrow: 'Diagnosi acqua agricola',
    formTitle: 'Trasforma i controlli di irrigazione e acqua agricola in decisioni tracciabili',
    formBody: 'Condividi tipo di coltura, fonte acqua, modello irriguo e volume campioni. La richiesta continua in AquaVerify Cloud con contesto agricolo.',
    formLabels: ['Nome', 'Azienda', 'Email professionale', 'Paese', 'Coltura o operazione', 'Fonte acqua', 'Modello laboratorio', 'Campioni al mese', 'Metodo attuale', 'Esigenza principale'],
    formPlaceholders: ['Nome e cognome', 'Azienda agricola, cooperativa, serra o laboratorio', 'nome@azienda.com', 'Spagna, Francia, Stati Uniti...', 'Berries, foglie verdi, agrumi, serra...', 'Pozzo, vasca, canale, riutilizzata, idroponica...', '50, 200, 1000+', 'Laboratorio attuale, kit, Excel, LIMS...', 'Irrigazione, audit export, acqua riutilizzata, deviazioni...'],
    cropTypes: ['Frutta e ortaggi in campo aperto', 'Foglie verdi / ready-to-eat', 'Berries o colture alto valore', 'Serra / idroponica', 'Packhouse / post-raccolta', 'Cooperativa / gruppo produttori', 'Laboratorio agricolo', 'Altro'],
    labModels: ['Laboratorio interno', 'Laboratorio partner esterno', 'Modello misto', 'Laboratorio pubblico o accreditato', 'Non ancora definito'],
    formSubmit: 'Continua in AquaVerify Cloud',
    formPrivacy: 'Il team commerciale riceve la richiesta con origine, profilo coltura, fonte acqua e contesto di controllo agricolo.'
  },
  ca: {
    heroProof: [['Traçabilitat per parcel·la', 'Fonts, punts, cultius, parcel·les i campanyes queden connectats.'], ['Decisions de reg', 'Resultats, desviacions i accions ajuden a alliberar, tractar o remostrejar.'], ['Aigua regenerada', 'Evidència per lot d’aigua, font, campanya i pla de risc aplicable.'], ['Evidència per auditoria', 'Informes, CoA, accions correctives i registres de camp localitzables.']],
    heroSteps: [['Mapar fonts', 'Pous, basses, canals i aigua regenerada'], ['Definir punts', 'Parcel·la, cultiu, campanya i sistema de reg'], ['Pla analític', 'Indicadors, freqüència, matriu i criteris'], ['Mostreig a camp', 'Operador, ubicació, data i custòdia'], ['Revisar resultats', 'CoA, tendència, alerta i context tècnic'], ['Decidir acció', 'Alliberar, tractar, repetir o investigar']],
    sectionEyebrows: ['Reptes de l’aigua agrícola', 'Flux traçable', 'Equips que intervenen', 'Matriu de risc', 'Mòduls AquaVerify', 'Casos d’ús', 'Maduresa del control', 'Referències tècniques'],
    sectionBodies: ['L’aigua agrícola canvia per font, clima, cultiu, campanya i context operatiu. El control necessita més que informes aïllats.', 'Un flux connectat manté cada font, punt, mostra, resultat i acció vinculats a parcel·la, cultiu i campanya.', 'AquaVerify ajuda agronomia, reg, qualitat, sostenibilitat, laboratori i exportació a treballar sobre la mateixa evidència.', 'Cada ús agrícola de l’aigua exigeix evidències, freqüència i rutes de resposta diferents.', 'Combina traçabilitat digital, execució en camp, reporting i productes microbiològics segons el pla analític.', 'Comença pel flux de control més urgent i escala a finques, parcel·les, cultius, proveïdors i campanyes.', 'Passa de controls dispersos a un programa mesurable que millora a cada campanya.', 'Referències útils per orientar mostreig, reutilització, indicadors microbiològics i auditories de clients.'],
    matrixHeaders: ['Escenari', 'Risc hídric', 'Resposta operativa'],
    moduleHeaders: ['Mòdul', 'Ús principal', 'Valor per agricultura'],
    faqTitle: 'Preguntes freqüents',
    formEyebrow: 'Diagnòstic d’aigua agrícola',
    formTitle: 'Converteix els controls de reg i aigua agrícola en decisions traçables',
    formBody: 'Comparteix tipus de cultiu, font d’aigua, model de reg i volum de mostres. La sol·licitud continua a AquaVerify Cloud amb context agrícola.',
    formLabels: ['Nom', 'Empresa', 'Email professional', 'País', 'Cultiu o operació', 'Font d’aigua', 'Model de laboratori', 'Mostres al mes', 'Mètode actual', 'Necessitat principal'],
    formPlaceholders: ['Nom i cognoms', 'Explotació, cooperativa, hivernacle o laboratori', 'nom@empresa.com', 'Espanya, França, Estats Units...', 'Berries, fulla verda, cítrics, hivernacle...', 'Pou, bassa, canal, regenerada, hidroponia...', '50, 200, 1000+', 'Laboratori actual, kit, Excel, LIMS...', 'Reg, auditoria export, aigua regenerada, desviacions...'],
    cropTypes: ['Fruites i hortalisses a camp obert', 'Fulla verda / llest per consumir', 'Berries o cultius d’alt valor', 'Hivernacle / hidroponia', 'Packhouse / postcollita', 'Cooperativa / grup productor', 'Laboratori agrícola', 'Altres'],
    labModels: ['Laboratori intern', 'Laboratori partner extern', 'Model mixt', 'Laboratori públic o acreditat', 'Encara no definit'],
    formSubmit: 'Continuar a AquaVerify Cloud',
    formPrivacy: 'L’equip comercial rep la sol·licitud amb origen, perfil de cultiu, font d’aigua i context de control agrícola.'
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
  const match = rest.match(/^(.+?\.)\s+(.*)$/);
  if (!match) return [scenario, rest.trim(), ''];
  return [scenario, match[1].trim(), match[2].trim()];
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

export const AgricultureWaterLanding: React.FC<Props> = ({ content, pageLang, showCookieConsent = true }) => {
  const copy = COPY[pageLang] || COPY.en;
  const sourceSections = Array.from({ length: 8 }, (_, index) => getSection(content, index, {
    title: copy.sectionEyebrows[index],
    body: copy.sectionBodies[index] || content.description,
    bullets: []
  }));
  const sections = sourceSections;
  const signupUrl = getPlatformSignupUrl({
    intent: 'agriculture_water',
    page: 'agriculture-water',
    category: 'industries',
    profile: 'agriculture',
    module: 'agriculture-water-diagnosis'
  }, pageLang);

  const handleCtaClick = (label: string) => {
    trackCorporateEvent('platform_link_click', {
      lang: pageLang,
      page: 'agriculture-water',
      category: 'industries',
      intent: 'agriculture_water',
      profile: 'agriculture',
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
      crop_type: String(form.get('crop_type') || '').trim(),
      water_source: String(form.get('water_source') || '').trim(),
      lab_model: String(form.get('lab_model') || '').trim(),
      sample_volume: String(form.get('sample_volume') || '').trim(),
      current_method: String(form.get('current_method') || '').trim(),
      main_need: String(form.get('main_need') || '').trim()
    };

    trackCorporateEvent('agriculture_water_diagnosis_submit', {
      lang: pageLang,
      page: 'agriculture-water',
      category: 'industries',
      intent: 'agriculture_water',
      profile: 'agriculture',
      country: fields.country,
      crop_type: fields.crop_type,
      water_source: fields.water_source,
      module: 'agriculture-water-diagnosis'
    });

    window.location.href = getPlatformSignupUrl({
      intent: 'agriculture_water',
      page: 'agriculture-water',
      category: 'industries',
      profile: 'agriculture',
      module: 'agriculture-water-diagnosis',
      product: 'agriculture-water',
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
                  {content.secondaryCta || sections[1].title}
                </a>
              </div>
            </div>

            <aside className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur">
              <h2 className="font-heading text-2xl font-black">{sections[1].title}</h2>
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
            <SectionHead eyebrow={copy.sectionEyebrows[0]} title={sections[0].title} body={sections[0].body || copy.sectionBodies[0]} />
            <CardGrid items={getBullets(sections[0])} />
          </div>
        </section>

        <section id="flujo" className="bg-primary py-16 text-white md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[1]} title={sections[1].title} body={sections[1].body || copy.sectionBodies[1]} inverse />
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {getBullets(sections[1]).map((item, index) => {
                const [title, body] = splitTitleBody(item);
                return (
                  <article key={item} className="rounded-2xl border border-white/15 bg-white/10 p-5">
                    <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-sm font-black text-white">{String(index + 1).padStart(2, '0')}</span>
                    <h3 className="font-heading text-lg font-black text-white">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-cyan-50/75">{body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="perfiles" className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[2]} title={sections[2].title} body={sections[2].body || copy.sectionBodies[2]} />
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

        <section id="matriz" className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[3]} title={sections[3].title} body={sections[3].body || copy.sectionBodies[3]} />
            <div className="mt-8 grid gap-4">
              <div className="hidden grid-cols-[0.8fr_1fr_1fr] gap-4 md:grid">
                {copy.matrixHeaders.map((header) => <div key={header} className="rounded-2xl bg-cyan-50 px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-cyan-800">{header}</div>)}
              </div>
              {getBullets(sections[3]).map((item) => {
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

        <section id="modulos" className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[4]} title={sections[4].title} body={sections[4].body || copy.sectionBodies[4]} />
            <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
              <div className="grid bg-primary text-xs font-black uppercase tracking-[0.12em] text-white md:grid-cols-[0.8fr_0.8fr_1.4fr]">
                {copy.moduleHeaders.map((header) => <div key={header} className="px-5 py-4">{header}</div>)}
              </div>
              <div className="divide-y divide-slate-100">
                {getBullets(sections[4]).map((item) => {
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

        <section id="casos" className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[5]} title={sections[5].title} body={sections[5].body || copy.sectionBodies[5]} center />
            <CardGrid items={getBullets(sections[5])} offset={5} cols="md:grid-cols-2 xl:grid-cols-3" />
          </div>
        </section>

        <section id="roadmap" className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[6]} title={sections[6].title} body={sections[6].body || copy.sectionBodies[6]} />
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {getBullets(sections[6]).map((item, index) => {
                const [title, body] = splitTitleBody(item);
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

        <section id="referencias" className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[7]} title={sections[7].title} body={sections[7].body || copy.sectionBodies[7]} />
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {getBullets(sections[7]).map((item) => {
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

        <IndustryGlossaryTerms industryId="agriculture-water" lang={pageLang} />

        <section id="diagnostico" className="bg-slate-50 py-16 pb-24 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.formEyebrow} title={copy.formTitle} body={copy.formBody} center />
            <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:p-8">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField label={copy.formLabels[0]} name="name" placeholder={copy.formPlaceholders[0]} required />
                <FormField label={copy.formLabels[1]} name="company" placeholder={copy.formPlaceholders[1]} required />
                <FormField label={copy.formLabels[2]} name="email" type="email" placeholder={copy.formPlaceholders[2]} required />
                <FormField label={copy.formLabels[3]} name="country" placeholder={copy.formPlaceholders[3]} />
                <label className="grid gap-2 text-sm font-black text-slate-800">
                  {copy.formLabels[4]}
                  <select name="crop_type" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100">
                    {copy.cropTypes.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
                <FormField label={copy.formLabels[5]} name="water_source" placeholder={copy.formPlaceholders[5]} />
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
