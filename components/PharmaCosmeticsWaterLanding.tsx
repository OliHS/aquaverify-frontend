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
  cta?: { title: string; body: string };
  sections?: MarketingSection[];
  faqs?: Array<{ question: string; answer: string }>;
  buyerProblems?: IndustryBuyerProblemsContent;
};

type Props = {
  content: MarketingContent;
  pageLang: Language;
  showCookieConsent?: boolean;
};

type PharmaCopy = {
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
  waterTypes: string[];
  siteModels: string[];
  formSubmit: string;
  formPrivacy: string;
};

const COPY: Record<Language, PharmaCopy> = {
  en: {
    heroProof: [['Batch traceability', 'Water, sample, result, batch, product, equipment and owner stay connected.'], ['Connected QA/QC', 'Quality, laboratory, production and engineering work from one shared history.'], ['Audit-ready evidence', 'Records, CoA, trends, actions and deviations in a central workflow.'], ['Advanced indicators', 'Microbiology and viral indicators when the analytical plan requires them.']],
    heroSteps: [['Water type', 'Incoming, purified, WFI, process, rinse or ingredient water'], ['Critical point', 'Tank, loop, point of use, line, equipment or room'], ['Sample', 'Date, time, operator, batch, shift and custody'], ['Result', 'Method, laboratory, indicator, trend, CoA and review'], ['Decision', 'Release, hold, investigate, sanitise or close deviation']],
    sectionEyebrows: ['Water risk in regulated manufacturing', 'Operational workflow', 'Teams using the data', 'Risk matrix', 'AquaVerify modules', 'Applications by plant and product', 'Technical framework', 'Implementation stages', 'Go live plan'],
    sectionBodies: ['Water control in regulated manufacturing needs context by point, batch, product, equipment and decision.', 'Connect the physical point with method, result, review and documented action.', 'A shared water history helps every team act without losing technical context.', 'Each water type requires different evidence, decisions and follow-up.', 'Combine cloud workflows, field sampling, reports and microbiological products according to the quality programme.', 'Start with the most critical water system and expand across products, sites and contract manufacturing models.', 'Use quality, GMP and microbiological references as the framework for the water-control programme.', 'Move from isolated checks to multi-site, trend-driven water control.', 'Configure AquaVerify around existing laboratories, LIMS, ERP and quality procedures.'],
    matrixHeaders: ['Scenario', 'Risk to control', 'Evidence and decision'],
    moduleHeaders: ['Module', 'What it adds'],
    faqTitle: 'Frequently asked questions',
    formEyebrow: 'Pharma and cosmetics water diagnosis',
    formTitle: 'Turn water control into batch, quality and audit-ready evidence',
    formBody: 'Share water types, critical points, products, laboratory model and monthly sample volume. The request continues in AquaVerify Cloud with pharma/cosmetics context.',
    formLabels: ['Name', 'Company', 'Professional email', 'Country', 'Water type', 'Product or operation', 'Laboratory model', 'Samples per month', 'Current method', 'Main need'],
    formPlaceholders: ['Name and surname', 'Manufacturer, CDMO, CMO, cosmetic lab...', 'name@company.com', 'Spain, France, United States...', 'Creams, gels, sterile, non-sterile, personal care...', '50, 200, 1000+', 'Current lab, LIMS, Excel, CoA workflow...', 'Purified water, WFI, loop trends, deviations, CoA...'],
    waterTypes: ['Purified water', 'WFI / critical water', 'Process water', 'Cosmetic ingredient water', 'Cleaning / final rinse', 'Pretreatment / utilities', 'Multiple systems', 'Not defined yet'],
    siteModels: ['Internal QC laboratory', 'External partner laboratory', 'Mixed model', 'CDMO / CMO', 'Multi-site manufacturing', 'Not defined yet'],
    formSubmit: 'Continue in AquaVerify Cloud',
    formPrivacy: 'The commercial team receives the request with origin, water type, site model and regulated manufacturing context.'
  },
  es: {
    heroProof: [['Trazabilidad por lote', 'Agua, muestra, resultado, lote, producto, equipo y responsable quedan conectados.'], ['QA/QC conectado', 'Calidad, laboratorio, producción e ingeniería trabajan sobre un mismo historial.'], ['Evidencia audit-ready', 'Registros, CoA, tendencias, acciones y desviaciones en un flujo centralizado.'], ['Indicadores avanzados', 'Microbiología e indicadores virales cuando el plan analítico lo requiere.']],
    heroSteps: [['Tipo de agua', 'Entrada, purificada, WFI, proceso, enjuague o ingrediente'], ['Punto crítico', 'Depósito, loop, punto de uso, línea, equipo o sala'], ['Muestra', 'Fecha, hora, operador, lote, turno y custodia'], ['Resultado', 'Método, laboratorio, indicador, tendencia, CoA y revisión'], ['Decisión', 'Liberar, retener, investigar, sanitizar o cerrar desviación']],
    sectionEyebrows: ['Riesgo hídrico en fabricación regulada', 'Flujo operativo', 'Equipos que usan el dato', 'Matriz de riesgo', 'Módulos AquaVerify', 'Aplicaciones por planta y producto', 'Marco técnico', 'Implantación por etapas', 'Plan de puesta en marcha'],
    sectionBodies: ['El control del agua en fabricación regulada necesita contexto por punto, lote, producto, equipo y decisión.', 'Conecta el punto físico con método, resultado, revisión y acción documentada.', 'Un historial común del agua ayuda a cada equipo a actuar sin perder contexto técnico.', 'Cada tipo de agua requiere evidencias, decisiones y seguimiento diferentes.', 'Combina flujos cloud, muestreo en planta, informes y productos microbiológicos según el programa de calidad.', 'Empieza por el sistema de agua más crítico y escala a productos, plantas y modelos de fabricación contratada.', 'Usa referencias de calidad, GMP y microbiología como marco del programa de control del agua.', 'Pasa de controles aislados a control hídrico multi-planta guiado por tendencias.', 'Configura AquaVerify alrededor de laboratorios, LIMS, ERP y procedimientos de calidad existentes.'],
    matrixHeaders: ['Escenario', 'Riesgo a controlar', 'Evidencia y decisión'],
    moduleHeaders: ['Módulo', 'Qué aporta'],
    faqTitle: 'Preguntas frecuentes',
    formEyebrow: 'Diagnóstico de agua pharma y cosmética',
    formTitle: 'Convierte el control del agua en evidencia lista para lote, calidad y auditoría',
    formBody: 'Comparte tipos de agua, puntos críticos, productos, modelo de laboratorio y volumen mensual de muestras. La solicitud continúa en AquaVerify Cloud con contexto pharma/cosmética.',
    formLabels: ['Nombre', 'Empresa', 'Email profesional', 'País', 'Tipo de agua', 'Producto u operación', 'Modelo de laboratorio', 'Muestras al mes', 'Método actual', 'Necesidad principal'],
    formPlaceholders: ['Nombre y apellidos', 'Fabricante, CDMO, CMO, laboratorio cosmético...', 'nombre@empresa.com', 'España, Francia, Estados Unidos...', 'Cremas, geles, estéril, no estéril, cuidado personal...', '50, 200, 1000+', 'Laboratorio actual, LIMS, Excel, flujo CoA...', 'Agua purificada, WFI, tendencias de loop, desviaciones, CoA...'],
    waterTypes: ['Agua purificada', 'WFI / agua crítica', 'Agua de proceso', 'Agua ingrediente cosmético', 'Limpieza / último enjuague', 'Pretratamiento / utilities', 'Varios sistemas', 'Todavía no definido'],
    siteModels: ['Laboratorio QC interno', 'Laboratorio partner externo', 'Modelo mixto', 'CDMO / CMO', 'Fabricación multi-planta', 'Todavía no definido'],
    formSubmit: 'Continuar en AquaVerify Cloud',
    formPrivacy: 'El equipo comercial recibe la solicitud con origen, tipo de agua, modelo de planta y contexto de fabricación regulada.'
  },
  fr: {
    heroProof: [['Traçabilité par lot', 'Eau, échantillon, résultat, lot, produit, équipement et responsable restent connectés.'], ['QA/QC connecté', 'Qualité, laboratoire, production et ingénierie travaillent sur un même historique.'], ['Preuve pour audit', 'Registres, CoA, tendances, actions et déviations dans un flux centralisé.'], ['Indicateurs avancés', 'Microbiologie et indicateurs viraux lorsque le plan analytique l’exige.']],
    heroSteps: [['Type d’eau', 'Entrante, purifiée, WFI, procédé, rinçage ou ingrédient'], ['Point critique', 'Cuve, boucle, point d’utilisation, ligne, équipement ou salle'], ['Échantillon', 'Date, heure, opérateur, lot, équipe et traçabilité'], ['Résultat', 'Méthode, laboratoire, indicateur, tendance, CoA et revue'], ['Décision', 'Libérer, retenir, investiguer, assainir ou clôturer la déviation']],
    sectionEyebrows: ['Risque hydrique en fabrication réglementée', 'Flux opérationnel', 'Équipes utilisant la donnée', 'Matrice de risque', 'Modules AquaVerify', 'Applications par site et produit', 'Cadre technique', 'Implantation par étapes', 'Plan de mise en route'],
    sectionBodies: ['Le contrôle de l’eau en fabrication réglementée exige un contexte par point, lot, produit, équipement et décision.', 'Reliez le point physique à la méthode, au résultat, à la revue et à l’action documentée.', 'Un historique commun de l’eau aide chaque équipe à agir sans perdre le contexte technique.', 'Chaque type d’eau exige des preuves, décisions et suivis différents.', 'Combinez flux cloud, prélèvement sur site, rapports et produits microbiologiques selon le programme qualité.', 'Commencez par le système d’eau le plus critique puis étendez aux produits, sites et modèles de sous-traitance.', 'Utilisez les références qualité, GMP et microbiologie comme cadre du programme de contrôle de l’eau.', 'Passez de contrôles isolés à un contrôle hydrique multi-site piloté par les tendances.', 'Configurez AquaVerify autour des laboratoires, LIMS, ERP et procédures qualité existants.'],
    matrixHeaders: ['Scénario', 'Risque à maîtriser', 'Preuve et décision'],
    moduleHeaders: ['Module', 'Apport principal'],
    faqTitle: 'Questions fréquentes',
    formEyebrow: 'Diagnostic eau pharma et cosmétique',
    formTitle: 'Transformez le contrôle de l’eau en preuve prête pour lot, qualité et audit',
    formBody: 'Partagez types d’eau, points critiques, produits, modèle laboratoire et volume mensuel. La demande continue dans AquaVerify Cloud avec contexte pharma/cosmétique.',
    formLabels: ['Nom', 'Entreprise', 'Email professionnel', 'Pays', 'Type d’eau', 'Produit ou opération', 'Modèle laboratoire', 'Échantillons par mois', 'Méthode actuelle', 'Besoin principal'],
    formPlaceholders: ['Nom et prénom', 'Fabricant, CDMO, CMO, laboratoire cosmétique...', 'nom@entreprise.com', 'Espagne, France, États-Unis...', 'Crèmes, gels, stérile, non stérile, personal care...', '50, 200, 1000+', 'Laboratoire actuel, LIMS, Excel, flux CoA...', 'Eau purifiée, WFI, tendances de boucle, déviations, CoA...'],
    waterTypes: ['Eau purifiée', 'WFI / eau critique', 'Eau de procédé', 'Eau ingrédient cosmétique', 'Nettoyage / dernier rinçage', 'Prétraitement / utilities', 'Plusieurs systèmes', 'Pas encore défini'],
    siteModels: ['Laboratoire QC interne', 'Laboratoire partenaire externe', 'Modèle mixte', 'CDMO / CMO', 'Fabrication multi-site', 'Pas encore défini'],
    formSubmit: 'Continuer dans AquaVerify Cloud',
    formPrivacy: 'L’équipe commerciale reçoit la demande avec origine, type d’eau, modèle de site et contexte de fabrication réglementée.'
  },
  it: {
    heroProof: [['Tracciabilità per lotto', 'Acqua, campione, risultato, lotto, prodotto, attrezzatura e responsabile restano collegati.'], ['QA/QC connesso', 'Qualità, laboratorio, produzione e ingegneria lavorano su uno stesso storico.'], ['Evidenza per audit', 'Registri, CoA, trend, azioni e deviazioni in un flusso centralizzato.'], ['Indicatori avanzati', 'Microbiologia e indicatori virali quando il piano analitico lo richiede.']],
    heroSteps: [['Tipo acqua', 'In ingresso, purificata, WFI, processo, risciacquo o ingrediente'], ['Punto critico', 'Serbatoio, loop, punto d’uso, linea, attrezzatura o sala'], ['Campione', 'Data, ora, operatore, lotto, turno e custodia'], ['Risultato', 'Metodo, laboratorio, indicatore, trend, CoA e revisione'], ['Decisione', 'Rilasciare, trattenere, investigare, sanificare o chiudere deviazione']],
    sectionEyebrows: ['Rischio idrico in produzione regolata', 'Flusso operativo', 'Team che usano il dato', 'Matrice rischio', 'Moduli AquaVerify', 'Applicazioni per sito e prodotto', 'Quadro tecnico', 'Implementazione per fasi', 'Piano di avvio'],
    sectionBodies: ['Il controllo dell’acqua in produzione regolata richiede contesto per punto, lotto, prodotto, attrezzatura e decisione.', 'Collega il punto fisico a metodo, risultato, revisione e azione documentata.', 'Uno storico comune dell’acqua aiuta ogni team ad agire senza perdere contesto tecnico.', 'Ogni tipo d’acqua richiede evidenze, decisioni e follow-up diversi.', 'Combina flussi cloud, campionamento in sito, report e prodotti microbiologici secondo il programma qualità.', 'Inizia dal sistema acqua più critico e scala su prodotti, siti e modelli produttivi esternalizzati.', 'Usa riferimenti qualità, GMP e microbiologia come quadro del programma di controllo acqua.', 'Passa da controlli isolati a controllo idrico multi-sito guidato da trend.', 'Configura AquaVerify intorno a laboratori, LIMS, ERP e procedure qualità esistenti.'],
    matrixHeaders: ['Scenario', 'Rischio da controllare', 'Evidenza e decisione'],
    moduleHeaders: ['Modulo', 'Cosa apporta'],
    faqTitle: 'Domande frequenti',
    formEyebrow: 'Diagnosi acqua pharma e cosmetica',
    formTitle: 'Trasforma il controllo acqua in evidenza pronta per lotto, qualità e audit',
    formBody: 'Condividi tipi d’acqua, punti critici, prodotti, modello laboratorio e volume mensile. La richiesta continua in AquaVerify Cloud con contesto pharma/cosmetica.',
    formLabels: ['Nome', 'Azienda', 'Email professionale', 'Paese', 'Tipo acqua', 'Prodotto o operazione', 'Modello laboratorio', 'Campioni al mese', 'Metodo attuale', 'Esigenza principale'],
    formPlaceholders: ['Nome e cognome', 'Produttore, CDMO, CMO, laboratorio cosmetico...', 'nome@azienda.com', 'Spagna, Francia, Stati Uniti...', 'Creme, gel, sterile, non sterile, personal care...', '50, 200, 1000+', 'Laboratorio attuale, LIMS, Excel, flusso CoA...', 'Acqua purificata, WFI, trend loop, deviazioni, CoA...'],
    waterTypes: ['Acqua purificata', 'WFI / acqua critica', 'Acqua di processo', 'Acqua ingrediente cosmetico', 'Pulizia / ultimo risciacquo', 'Pretrattamento / utilities', 'Più sistemi', 'Non ancora definito'],
    siteModels: ['Laboratorio QC interno', 'Laboratorio partner esterno', 'Modello misto', 'CDMO / CMO', 'Produzione multi-sito', 'Non ancora definito'],
    formSubmit: 'Continua in AquaVerify Cloud',
    formPrivacy: 'Il team commerciale riceve la richiesta con origine, tipo acqua, modello sito e contesto di produzione regolata.'
  },
  ca: {
    heroProof: [['Traçabilitat per lot', 'Aigua, mostra, resultat, lot, producte, equip i responsable queden connectats.'], ['QA/QC connectat', 'Qualitat, laboratori, producció i enginyeria treballen sobre un mateix historial.'], ['Evidència per auditoria', 'Registres, CoA, tendències, accions i desviacions en un flux centralitzat.'], ['Indicadors avançats', 'Microbiologia i indicadors virals quan el pla analític ho requereix.']],
    heroSteps: [['Tipus d’aigua', 'Entrada, purificada, WFI, procés, esbandida o ingredient'], ['Punt crític', 'Dipòsit, loop, punt d’ús, línia, equip o sala'], ['Mostra', 'Data, hora, operador, lot, torn i custòdia'], ['Resultat', 'Mètode, laboratori, indicador, tendència, CoA i revisió'], ['Decisió', 'Alliberar, retenir, investigar, sanejar o tancar desviació']],
    sectionEyebrows: ['Risc hídric en fabricació regulada', 'Flux operatiu', 'Equips que usen la dada', 'Matriu de risc', 'Mòduls AquaVerify', 'Aplicacions per planta i producte', 'Marc tècnic', 'Implantació per etapes', 'Pla de posada en marxa'],
    sectionBodies: ['El control de l’aigua en fabricació regulada necessita context per punt, lot, producte, equip i decisió.', 'Connecta el punt físic amb mètode, resultat, revisió i acció documentada.', 'Un historial comú de l’aigua ajuda cada equip a actuar sense perdre context tècnic.', 'Cada tipus d’aigua requereix evidències, decisions i seguiment diferents.', 'Combina fluxos cloud, mostreig a planta, informes i productes microbiològics segons el programa de qualitat.', 'Comença pel sistema d’aigua més crític i escala a productes, plantes i models de fabricació subcontractada.', 'Usa referències de qualitat, GMP i microbiologia com a marc del programa de control de l’aigua.', 'Passa de controls aïllats a control hídric multi-planta guiat per tendències.', 'Configura AquaVerify al voltant de laboratoris, LIMS, ERP i procediments de qualitat existents.'],
    matrixHeaders: ['Escenari', 'Risc a controlar', 'Evidència i decisió'],
    moduleHeaders: ['Mòdul', 'Què aporta'],
    faqTitle: 'Preguntes freqüents',
    formEyebrow: 'Diagnòstic d’aigua pharma i cosmètica',
    formTitle: 'Converteix el control de l’aigua en evidència llesta per lot, qualitat i auditoria',
    formBody: 'Comparteix tipus d’aigua, punts crítics, productes, model de laboratori i volum mensual. La sol·licitud continua a AquaVerify Cloud amb context pharma/cosmètica.',
    formLabels: ['Nom', 'Empresa', 'Email professional', 'País', 'Tipus d’aigua', 'Producte o operació', 'Model de laboratori', 'Mostres al mes', 'Mètode actual', 'Necessitat principal'],
    formPlaceholders: ['Nom i cognoms', 'Fabricant, CDMO, CMO, laboratori cosmètic...', 'nom@empresa.com', 'Espanya, França, Estats Units...', 'Cremes, gels, estèril, no estèril, personal care...', '50, 200, 1000+', 'Laboratori actual, LIMS, Excel, flux CoA...', 'Aigua purificada, WFI, tendències de loop, desviacions, CoA...'],
    waterTypes: ['Aigua purificada', 'WFI / aigua crítica', 'Aigua de procés', 'Aigua ingredient cosmètic', 'Neteja / última esbandida', 'Pretractament / utilities', 'Diversos sistemes', 'Encara no definit'],
    siteModels: ['Laboratori QC intern', 'Laboratori partner extern', 'Model mixt', 'CDMO / CMO', 'Fabricació multi-planta', 'Encara no definit'],
    formSubmit: 'Continuar a AquaVerify Cloud',
    formPrivacy: 'L’equip comercial rep la sol·licitud amb origen, tipus d’aigua, model de planta i context de fabricació regulada.'
  }
};

const sectionIcons = [ShieldCheck, Route, ClipboardCheck, Factory, Waves, FlaskConical, FileCheck2, PackageCheck, Beaker, CheckCircle2];

function classNames(...items: Array<string | false | null | undefined>) {
  return items.filter(Boolean).join(' ');
}

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

function splitMatrix(value: string): Array<[string, string]> {
  return value.split(' | ').map((part) => splitTitleBody(part));
}

const SectionHead: React.FC<{ eyebrow: string; title: string; body?: string; center?: boolean; inverse?: boolean }> = ({ eyebrow, title, body, center = false, inverse = false }) => (
  <div className={classNames('max-w-4xl', center && 'mx-auto text-center')}>
    <span className={classNames('inline-flex rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.16em]', inverse ? 'border-white/15 bg-white/10 text-cyan-100' : 'border-cyan-100 bg-cyan-50 text-cyan-700')}>{eyebrow}</span>
    <h2 className={classNames('mt-4 font-heading text-3xl font-black leading-tight md:text-5xl', inverse ? 'text-white' : 'text-slate-950')}>{title}</h2>
    {body && <p className={classNames('mt-4 text-base leading-8 md:text-lg', inverse ? 'text-cyan-50/75' : 'text-slate-600')}>{body}</p>}
  </div>
);

const FormField: React.FC<{ label: string; name: string; type?: string; placeholder?: string; required?: boolean }> = ({ label, name, type = 'text', placeholder, required = false }) => (
  <label className="grid gap-2 text-sm font-black text-slate-800">
    {label}
    <input name={name} type={type} placeholder={placeholder} required={required} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100" />
  </label>
);

const CardGrid: React.FC<{ items: string[]; offset?: number; cols?: string; inverse?: boolean }> = ({ items, offset = 0, cols = 'md:grid-cols-2 xl:grid-cols-4', inverse = false }) => (
  <div className={classNames('mt-8 grid gap-5', cols)}>
    {items.map((item, index) => {
      const [title, body] = splitTitleBody(item);
      const Icon = sectionIcons[(index + offset) % sectionIcons.length] || CheckCircle2;
      return (
        <article key={item + '-' + index} className={inverse ? 'rounded-2xl border border-white/15 bg-white/10 p-6 shadow-sm' : 'rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg'}>
          <div className={inverse ? 'mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-cyan-100' : 'mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700'}>
            <Icon className="h-5 w-5" />
          </div>
          <h3 className={classNames('font-heading text-lg font-black', inverse ? 'text-white' : 'text-slate-950')}>{title}</h3>
          {body && <p className={classNames('mt-3 text-sm leading-6', inverse ? 'text-cyan-50/75' : 'text-slate-600')}>{body}</p>}
        </article>
      );
    })}
  </div>
);

export const PharmaCosmeticsWaterLanding: React.FC<Props> = ({ content, pageLang, showCookieConsent = true }) => {
  const copy = COPY[pageLang] || COPY.en;
  const sections = Array.from({ length: 9 }, (_, index) => getSection(content, index, {
    title: copy.sectionEyebrows[index],
    body: copy.sectionBodies[index] || content.description,
    bullets: []
  }));
  const pageId = 'pharma-cosmetics-water';
  const signupUrl = getPlatformSignupUrl({
    intent: 'pharma_cosmetics_water',
    page: pageId,
    category: 'industries',
    profile: 'pharma-cosmetics',
    module: 'pharma-cosmetics-water-diagnosis'
  }, pageLang);

  const handleCtaClick = (label: string) => {
    trackCorporateEvent('platform_link_click', {
      lang: pageLang,
      page: pageId,
      category: 'industries',
      intent: 'pharma_cosmetics_water',
      profile: 'pharma-cosmetics',
      label,
      target_url: signupUrl,
      path: content.path
    });
  };

  const leadCapture = useMarketingLeadCapture({
    formKey: 'pharma-cosmetics-water-diagnosis',
    requestType: 'pharma_cosmetics_water',
    lang: pageLang,
    sourcePath: content.path,
    detailFields: ['water_type', 'product_type', 'site_model', 'sample_volume', 'current_method'],
    details: { page: pageId, category: 'industries', profile: 'pharma-cosmetics', module: 'pharma-cosmetics-water-diagnosis' },
    onAccepted: (_result, payload) => trackCorporateEvent('pharma_cosmetics_water_diagnosis_submit', {
      lang: pageLang,
      page: pageId,
      category: 'industries',
      intent: 'pharma_cosmetics_water',
      profile: 'pharma-cosmetics',
      country: payload.details.country,
      water_type: payload.details.water_type,
      site_model: payload.details.site_model,
      module: 'pharma-cosmetics-water-diagnosis'
    })
  });

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-900">
      <Header />
      <main className="flex-grow pt-20">
        <section className="aq-page-hero">
          <div className="absolute inset-0 bg-transparent" />
          <div className="container relative z-10 mx-auto grid gap-10 px-6 py-16 md:py-24 lg:grid-cols-[minmax(0,1fr)_28rem] lg:items-center">
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

        <IndustryBuyerProblemsSection buyerProblems={content.buyerProblems} pageLang={pageLang} />

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
            <CardGrid items={getBullets(sections[2])} offset={2} cols="md:grid-cols-2 xl:grid-cols-3" />
          </div>
        </section>

        <section id="matriz" className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[3]} title={sections[3].title} body={sections[3].body || copy.sectionBodies[3]} />
            <div className="mt-8 grid gap-4">
              <div className="hidden grid-cols-[0.85fr_1fr_1fr] gap-4 md:grid">
                {copy.matrixHeaders.map((header) => <div key={header} className="rounded-2xl bg-cyan-50 px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-cyan-800">{header}</div>)}
              </div>
              {getBullets(sections[3]).map((item) => {
                const cells = splitMatrix(item);
                return (
                  <article key={item} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[0.85fr_1fr_1fr]">
                    {cells.map(([title, body], index) => (
                      <div key={item + '-' + index}>
                        <div className="mb-1 text-[10px] font-black uppercase tracking-[0.12em] text-slate-400 md:hidden">{copy.matrixHeaders[index]}</div>
                        <h3 className={index === 0 ? 'font-heading text-lg font-black text-primary' : 'text-sm font-black leading-6 text-slate-800'}>{title}</h3>
                        {body && <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>}
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
              <div className="grid bg-primary text-xs font-black uppercase tracking-[0.12em] text-white md:grid-cols-[0.55fr_1.45fr]">
                {copy.moduleHeaders.map((header) => <div key={header} className="px-5 py-4">{header}</div>)}
              </div>
              <div className="divide-y divide-slate-100">
                {getBullets(sections[4]).map((item) => {
                  const [title, body] = splitTitleBody(item);
                  return (
                    <div key={item} className="grid gap-3 px-5 py-5 md:grid-cols-[0.55fr_1.45fr]">
                      <h3 className="font-heading text-base font-black text-primary">{title}</h3>
                      <p className="text-sm leading-6 text-slate-600">{body}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="casos" className="bg-primary py-16 text-white md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[5]} title={sections[5].title} body={sections[5].body || copy.sectionBodies[5]} inverse center />
            <CardGrid items={getBullets(sections[5])} offset={5} cols="md:grid-cols-2 xl:grid-cols-4" inverse />
          </div>
        </section>

        <section id="marco" className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[6]} title={sections[6].title} body={sections[6].body || copy.sectionBodies[6]} />
            <CardGrid items={getBullets(sections[6])} offset={7} cols="md:grid-cols-2 xl:grid-cols-3" />
          </div>
        </section>

        <section id="roadmap" className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[7]} title={sections[7].title} body={sections[7].body || copy.sectionBodies[7]} />
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {getBullets(sections[7]).map((item, index) => {
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

        <section id="implantacion" className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.sectionEyebrows[8]} title={sections[8].title} body={sections[8].body || copy.sectionBodies[8]} />
            <CardGrid items={getBullets(sections[8])} offset={3} />
          </div>
        </section>

        {content.faqs?.length ? (
          <section id="faq" className="bg-slate-50 py-16 md:py-20">
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

        <IndustryGlossaryTerms industryId="pharma-cosmetics-water" lang={pageLang} />

        <section id="diagnostico" className="bg-slate-50 py-16 pb-24 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHead eyebrow={copy.formEyebrow} title={content.cta?.title || copy.formTitle} body={content.cta?.body || copy.formBody} center />
            <form onSubmit={leadCapture.handleSubmit} className="relative mx-auto mt-8 max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:p-8">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField label={copy.formLabels[0]} name="name" placeholder={copy.formPlaceholders[0]} required />
                <FormField label={copy.formLabels[1]} name="company" placeholder={copy.formPlaceholders[1]} required />
                <FormField label={copy.formLabels[2]} name="email" type="email" placeholder={copy.formPlaceholders[2]} required />
                <FormField label={copy.formLabels[3]} name="country" placeholder={copy.formPlaceholders[3]} />
                <label className="grid gap-2 text-sm font-black text-slate-800">
                  {copy.formLabels[4]}
                  <select name="water_type" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100">
                    {copy.waterTypes.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
                <FormField label={copy.formLabels[5]} name="product_type" placeholder={copy.formPlaceholders[4]} />
                <label className="grid gap-2 text-sm font-black text-slate-800">
                  {copy.formLabels[6]}
                  <select name="site_model" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100">
                    {copy.siteModels.map((model) => <option key={model}>{model}</option>)}
                  </select>
                </label>
                <FormField label={copy.formLabels[7]} name="sample_volume" placeholder={copy.formPlaceholders[5]} />
                <FormField label={copy.formLabels[8]} name="current_method" placeholder={copy.formPlaceholders[6]} />
                <label className="grid gap-2 text-sm font-black text-slate-800 md:col-span-2">
                  {copy.formLabels[9]}
                  <textarea name="main_need" placeholder={copy.formPlaceholders[7]} className="min-h-28 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100" />
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
