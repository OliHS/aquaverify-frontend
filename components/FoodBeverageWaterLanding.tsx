import React from 'react';
import { ArrowRight, Beaker, CheckCircle2, ClipboardCheck, Factory, FileCheck2, FlaskConical, PackageCheck, Route, ShieldCheck, Waves } from 'lucide-react';
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

type FoodCopy = {
  heroProof: Array<[string, string]>;
  heroSteps: Array<[string, string]>;
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

const COPY: Record<Language, FoodCopy> = {
  en: {
    heroProof: [
      ['HACCP / self-control', 'Controls linked to the plant’s food-safety system.'],
      ['Process water', 'Critical points, frequency and matrix documented.'],
      ['Batch and sample', 'Traceability between sample, product, line and owner.'],
      ['Audit evidence', 'Digital history of results, actions and reports.']
    ],
    heroSteps: [['Incoming water', 'Source, treatment and point of use'], ['Process', 'Ingredients, washing, mixing or contact'], ['CIP and rinse', 'Cleaning, sanitation and release'], ['Laboratory', 'Kit, method, batch and reading'], ['QA review', 'Result, history and criterion'], ['Report', 'Audit evidence and decision']],
    sectionEyebrows: ['Water as a critical point', 'Plant teams', 'From sampling point to decision', 'Food and beverage applications', 'Operating map', 'AquaVerify modules', 'Regulation and evidence', 'Operational maturity', 'Deployment'],
    matrixHeaders: ['Stage', 'Operational risk', 'AquaVerify connects'],
    moduleHeaders: ['Module', 'Primary value', 'Operational use'],
    faqTitle: 'Frequently asked questions',
    formEyebrow: 'Food and beverage diagnosis',
    formTitle: 'Turn water control into an operational advantage for quality and production',
    formBody: 'Share plant scenario, critical points, sample volume and laboratory workflow. The request continues in AquaVerify Cloud with food and beverage context.',
    formLabels: ['Name', 'Company', 'Professional email', 'Country', 'Facility type', 'Water use', 'Laboratory model', 'Samples per month', 'Current method', 'Main need'],
    formPlaceholders: ['Name and surname', 'Food or beverage company', 'name@company.com', 'Spain, France, United States...', 'Beverages, dairy, prepared foods, fresh produce...', 'Ingredient, process, CIP, rinse, ice...', '50, 200, 1000+', 'Current lab, kit, spreadsheet, LIMS...', 'Audit, HACCP, deviation, coliphages, traceability...'],
    facilityTypes: ['Beverages and bottled water', 'Prepared or processed food', 'Dairy products', 'Fruit and vegetable washing', 'Multi-site group', 'Supplier / co-manufacturer', 'Other'],
    labModels: ['Internal laboratory', 'External partner laboratory', 'Mixed model', 'Public or accredited laboratory', 'Not defined yet'],
    formSubmit: 'Continue in AquaVerify Cloud',
    formPrivacy: 'The commercial team receives the request with origin, food and beverage profile and water-control context.'
  },
  es: {
    heroProof: [
      ['APPCC / autocontrol', 'Controles vinculados al sistema de seguridad alimentaria.'],
      ['Agua de proceso', 'Puntos críticos, frecuencia y matriz documentados.'],
      ['Lote y muestra', 'Trazabilidad entre muestra, producto, línea y responsable.'],
      ['Evidencia de auditoría', 'Historial digital de resultados, acciones e informes.']
    ],
    heroSteps: [['Agua de entrada', 'Origen, tratamiento y punto de uso'], ['Proceso', 'Ingrediente, lavado, mezcla o contacto'], ['CIP y enjuague', 'Limpieza, saneamiento y liberación'], ['Laboratorio', 'Kit, método, lote y lectura'], ['Revisión QA', 'Resultado, histórico y criterio'], ['Informe', 'Evidencia para auditoría y decisión']],
    sectionEyebrows: ['Agua como punto crítico', 'Equipos de planta', 'De punto de muestreo a decisión', 'Aplicaciones en alimentación y bebidas', 'Mapa operativo', 'Módulos AquaVerify', 'Normativa y evidencia', 'Madurez operativa', 'Puesta en marcha'],
    matrixHeaders: ['Etapa', 'Riesgo operativo', 'AquaVerify conecta'],
    moduleHeaders: ['Módulo', 'Valor principal', 'Uso operativo'],
    faqTitle: 'Preguntas frecuentes',
    formEyebrow: 'Diagnóstico alimentación y bebidas',
    formTitle: 'Convierte el control del agua en una ventaja operativa para calidad y producción',
    formBody: 'Comparte tu escenario de planta, puntos críticos, volumen de muestras y flujo de laboratorio. La solicitud continúa en AquaVerify Cloud con contexto de alimentación y bebidas.',
    formLabels: ['Nombre', 'Empresa', 'Email profesional', 'País', 'Tipo de planta', 'Uso del agua', 'Modelo de laboratorio', 'Muestras al mes', 'Método actual', 'Necesidad principal'],
    formPlaceholders: ['Nombre y apellidos', 'Empresa alimentaria o de bebidas', 'nombre@empresa.com', 'España, Francia, Estados Unidos...', 'Bebidas, lácteos, preparados, hortofrutícola...', 'Ingrediente, proceso, CIP, enjuague, hielo...', '50, 200, 1000+', 'Laboratorio actual, kit, Excel, LIMS...', 'Auditoría, APPCC, desviación, colífagos, trazabilidad...'],
    facilityTypes: ['Bebidas y agua envasada', 'Alimentos preparados o procesados', 'Lácteos y derivados', 'Lavado de frutas y hortalizas', 'Grupo multi-planta', 'Proveedor / co-manufacturer', 'Otro'],
    labModels: ['Laboratorio interno', 'Laboratorio partner externo', 'Modelo mixto', 'Laboratorio público o acreditado', 'Todavía no definido'],
    formSubmit: 'Continuar en AquaVerify Cloud',
    formPrivacy: 'El equipo comercial recibe la solicitud con origen, perfil alimentación y bebidas y contexto de control del agua.'
  },
  fr: {
    heroProof: [
      ['HACCP / autocontrôle', 'Contrôles reliés au système de sécurité alimentaire.'],
      ['Eau de process', 'Points critiques, fréquence et matrice documentés.'],
      ['Lot et échantillon', 'Traçabilité entre échantillon, produit, ligne et responsable.'],
      ['Preuve d’audit', 'Historique numérique des résultats, actions et rapports.']
    ],
    heroSteps: [['Eau entrante', 'Origine, traitement et point d’usage'], ['Process', 'Ingrédient, lavage, mélange ou contact'], ['CIP et rinçage', 'Nettoyage, assainissement et libération'], ['Laboratoire', 'Kit, méthode, lot et lecture'], ['Revue QA', 'Résultat, historique et critère'], ['Rapport', 'Preuve d’audit et décision']],
    sectionEyebrows: ['Eau comme point critique', 'Équipes du site', 'Du point de prélèvement à la décision', 'Applications agroalimentaires', 'Carte opérationnelle', 'Modules AquaVerify', 'Réglementation et preuve', 'Maturité opérationnelle', 'Déploiement'],
    matrixHeaders: ['Étape', 'Risque opérationnel', 'AquaVerify relie'],
    moduleHeaders: ['Module', 'Valeur principale', 'Usage opérationnel'],
    faqTitle: 'Questions fréquentes',
    formEyebrow: 'Diagnostic agroalimentaire',
    formTitle: 'Transformez le contrôle de l’eau en avantage opérationnel pour la qualité et la production',
    formBody: 'Partagez votre contexte de site, points critiques, volume d’échantillons et flux laboratoire. La demande continue dans AquaVerify Cloud avec le contexte agroalimentaire.',
    formLabels: ['Nom', 'Entreprise', 'Email professionnel', 'Pays', 'Type de site', 'Usage de l’eau', 'Modèle laboratoire', 'Échantillons par mois', 'Méthode actuelle', 'Besoin principal'],
    formPlaceholders: ['Nom et prénom', 'Entreprise agroalimentaire ou boissons', 'nom@entreprise.com', 'Espagne, France, États-Unis...', 'Boissons, laitier, préparés, fruits et légumes...', 'Ingrédient, process, CIP, rinçage, glace...', '50, 200, 1000+', 'Laboratoire actuel, kit, Excel, LIMS...', 'Audit, HACCP, écart, coliphages, traçabilité...'],
    facilityTypes: ['Boissons et eau embouteillée', 'Aliments préparés ou transformés', 'Produits laitiers', 'Lavage fruits et légumes', 'Groupe multi-site', 'Fournisseur / co-manufacturer', 'Autre'],
    labModels: ['Laboratoire interne', 'Laboratoire partenaire externe', 'Modèle mixte', 'Laboratoire public ou accrédité', 'Pas encore défini'],
    formSubmit: 'Continuer dans AquaVerify Cloud',
    formPrivacy: 'L’équipe commerciale reçoit la demande avec origine, profil agroalimentaire et contexte de contrôle de l’eau.'
  },
  it: {
    heroProof: [
      ['HACCP / autocontrollo', 'Controlli collegati al sistema di sicurezza alimentare.'],
      ['Acqua di processo', 'Punti critici, frequenza e matrice documentati.'],
      ['Lotto e campione', 'Tracciabilità tra campione, prodotto, linea e responsabile.'],
      ['Evidenza audit', 'Storico digitale di risultati, azioni e report.']
    ],
    heroSteps: [['Acqua in ingresso', 'Origine, trattamento e punto uso'], ['Processo', 'Ingrediente, lavaggio, miscela o contatto'], ['CIP e risciacquo', 'Pulizia, sanificazione e rilascio'], ['Laboratorio', 'Kit, metodo, lotto e lettura'], ['Revisione QA', 'Risultato, storico e criterio'], ['Report', 'Evidenza audit e decisione']],
    sectionEyebrows: ['Acqua come punto critico', 'Team di stabilimento', 'Dal punto campione alla decisione', 'Applicazioni food & beverage', 'Mappa operativa', 'Moduli AquaVerify', 'Normativa ed evidenza', 'Maturità operativa', 'Implementazione'],
    matrixHeaders: ['Fase', 'Rischio operativo', 'AquaVerify collega'],
    moduleHeaders: ['Modulo', 'Valore principale', 'Uso operativo'],
    faqTitle: 'Domande frequenti',
    formEyebrow: 'Diagnosi food & beverage',
    formTitle: 'Trasforma il controllo dell’acqua in un vantaggio operativo per qualità e produzione',
    formBody: 'Condividi scenario dello stabilimento, punti critici, volume campioni e flusso laboratorio. La richiesta continua in AquaVerify Cloud con contesto food & beverage.',
    formLabels: ['Nome', 'Azienda', 'Email professionale', 'Paese', 'Tipo stabilimento', 'Uso dell’acqua', 'Modello laboratorio', 'Campioni al mese', 'Metodo attuale', 'Esigenza principale'],
    formPlaceholders: ['Nome e cognome', 'Azienda alimentare o beverage', 'nome@azienda.com', 'Spagna, Francia, Stati Uniti...', 'Bevande, lattiero, preparati, ortofrutta...', 'Ingrediente, processo, CIP, risciacquo, ghiaccio...', '50, 200, 1000+', 'Laboratorio attuale, kit, Excel, LIMS...', 'Audit, HACCP, deviazione, colifagi, tracciabilità...'],
    facilityTypes: ['Bevande e acqua confezionata', 'Alimenti preparati o trasformati', 'Lattiero-caseario', 'Lavaggio frutta e verdura', 'Gruppo multi-sito', 'Fornitore / co-manufacturer', 'Altro'],
    labModels: ['Laboratorio interno', 'Laboratorio partner esterno', 'Modello misto', 'Laboratorio pubblico o accreditato', 'Non ancora definito'],
    formSubmit: 'Continua in AquaVerify Cloud',
    formPrivacy: 'Il team commerciale riceve la richiesta con origine, profilo food & beverage e contesto di controllo acqua.'
  },
  ca: {
    heroProof: [
      ['APPCC / autocontrol', 'Controls vinculats al sistema de seguretat alimentària.'],
      ['Aigua de procés', 'Punts crítics, freqüència i matriu documentats.'],
      ['Lot i mostra', 'Traçabilitat entre mostra, producte, línia i responsable.'],
      ['Evidència d’auditoria', 'Històric digital de resultats, accions i informes.']
    ],
    heroSteps: [['Aigua d’entrada', 'Origen, tractament i punt d’ús'], ['Procés', 'Ingredient, rentat, barreja o contacte'], ['CIP i esbandida', 'Neteja, sanejament i alliberament'], ['Laboratori', 'Kit, mètode, lot i lectura'], ['Revisió QA', 'Resultat, històric i criteri'], ['Informe', 'Evidència d’auditoria i decisió']],
    sectionEyebrows: ['Aigua com a punt crític', 'Equips de planta', 'Del punt de mostreig a la decisió', 'Aplicacions en alimentació i begudes', 'Mapa operatiu', 'Mòduls AquaVerify', 'Normativa i evidència', 'Maduresa operativa', 'Desplegament'],
    matrixHeaders: ['Etapa', 'Risc operatiu', 'AquaVerify connecta'],
    moduleHeaders: ['Mòdul', 'Valor principal', 'Ús operatiu'],
    faqTitle: 'Preguntes freqüents',
    formEyebrow: 'Diagnòstic alimentació i begudes',
    formTitle: 'Converteix el control de l’aigua en un avantatge operatiu per a qualitat i producció',
    formBody: 'Comparteix escenari de planta, punts crítics, volum de mostres i flux de laboratori. La sol·licitud continua a AquaVerify Cloud amb context d’alimentació i begudes.',
    formLabels: ['Nom', 'Empresa', 'Email professional', 'País', 'Tipus de planta', 'Ús de l’aigua', 'Model de laboratori', 'Mostres al mes', 'Mètode actual', 'Necessitat principal'],
    formPlaceholders: ['Nom i cognoms', 'Empresa alimentària o de begudes', 'nom@empresa.com', 'Espanya, França, Estats Units...', 'Begudes, lactis, preparats, fruita i verdura...', 'Ingredient, procés, CIP, esbandida, gel...', '50, 200, 1000+', 'Laboratori actual, kit, Excel, LIMS...', 'Auditoria, APPCC, desviació, colífags, traçabilitat...'],
    facilityTypes: ['Begudes i aigua envasada', 'Aliments preparats o processats', 'Lactis i derivats', 'Rentat de fruites i hortalisses', 'Grup multi-seu', 'Proveïdor / co-manufacturer', 'Altres'],
    labModels: ['Laboratori intern', 'Laboratori partner extern', 'Model mixt', 'Laboratori públic o acreditat', 'Encara no definit'],
    formSubmit: 'Continuar a AquaVerify Cloud',
    formPrivacy: 'L’equip comercial rep la sol·licitud amb origen, perfil alimentació i begudes i context de control de l’aigua.'
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
  const [valueText, ...bodyParts] = rest.split('. ');
  return [title, valueText.trim(), bodyParts.join('. ').trim()];
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

export const FoodBeverageWaterLanding: React.FC<Props> = ({ content, pageLang, showCookieConsent = true }) => {
  const copy = COPY[pageLang] || COPY.en;
  const sections = Array.from({ length: 9 }, (_, index) => getSection(content, index, {
    title: copy.sectionEyebrows[index],
    body: content.description,
    bullets: []
  }));
  const signupUrl = getPlatformSignupUrl({
    intent: 'food_beverage',
    page: 'food-beverage-water-quality',
    category: 'industries',
    profile: 'food-beverage',
    module: 'food-beverage-water-diagnosis'
  }, pageLang);

  const handleCtaClick = (label: string) => {
    trackCorporateEvent('platform_link_click', {
      lang: pageLang,
      page: 'food-beverage-water-quality',
      category: 'industries',
      intent: 'food_beverage',
      profile: 'food-beverage',
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
      facility_type: String(form.get('facility_type') || '').trim(),
      water_use: String(form.get('water_use') || '').trim(),
      lab_model: String(form.get('lab_model') || '').trim(),
      sample_volume: String(form.get('sample_volume') || '').trim(),
      current_method: String(form.get('current_method') || '').trim(),
      main_need: String(form.get('main_need') || '').trim()
    };

    trackCorporateEvent('food_beverage_water_diagnosis_submit', {
      lang: pageLang,
      page: 'food-beverage-water-quality',
      category: 'industries',
      intent: 'food_beverage',
      profile: 'food-beverage',
      country: fields.country,
      facility_type: fields.facility_type,
      water_use: fields.water_use,
      module: 'food-beverage-water-diagnosis'
    });

    window.location.href = getPlatformSignupUrl({
      intent: 'food_beverage',
      page: 'food-beverage-water-quality',
      category: 'industries',
      profile: 'food-beverage',
      module: 'food-beverage-water-diagnosis',
      product: 'food-beverage-water-quality',
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
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_10%,rgba(20,191,209,0.34),transparent_30%),radial-gradient(circle_at_88%_18%,rgba(16,185,129,0.22),transparent_28%),linear-gradient(135deg,#07334d_0%,#084d6d_48%,#0d7895_100%)]" />
          <div className="container relative z-10 mx-auto grid gap-10 px-6 py-16 md:py-24 lg:grid-cols-[minmax(0,1fr)_27rem] lg:items-center">
            <div className="max-w-4xl">
              <div className="inline-flex rounded-full border border-cyan-200/25 bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
                {content.eyebrow || copy.sectionEyebrows[0]}
              </div>
              <h1 className="mt-6 font-heading text-4xl font-black leading-tight md:text-6xl">{content.title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-cyan-50/85">{content.description}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={signupUrl} onClick={() => handleCtaClick(content.primaryCta || copy.formSubmit)} className="inline-flex items-center justify-center rounded bg-white px-6 py-3 text-sm font-black text-primary shadow-lg transition hover:bg-secondary hover:text-white">
                  {content.primaryCta || copy.formSubmit}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a href="#flujo" className="inline-flex items-center justify-center rounded border border-white/25 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10">
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
              {getBullets(sections[1]).map((item) => {
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
                <div className="md:col-span-2">
                  <button type="submit" className="inline-flex w-full items-center justify-center rounded-full bg-cyan-600 px-6 py-4 text-sm font-black text-white shadow-lg transition hover:bg-cyan-700 md:w-auto">
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
