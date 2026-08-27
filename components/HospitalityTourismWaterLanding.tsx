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

type HospitalityCopy = {
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

const COPY: Record<Language, HospitalityCopy> = {
  "en": {
    "heroProof": [
      [
        "Site traceability",
        "Facilities, assets, sampling points, suppliers and actions stay connected."
      ],
      [
        "Critical assets",
        "Rooms, showers, hot water, pools, spas, kitchens, ice and leisure water are managed together."
      ],
      [
        "Incident response",
        "Alerts, corrective actions, resampling and reopening evidence are documented."
      ],
      [
        "Multi-site control",
        "Groups can compare hotels, resorts, campsites, restaurants and leisure venues."
      ]
    ],
    "heroSteps": [
      [
        "Inventory assets",
        "Rooms, wings, showers, tanks, pools, spas, fountains and kitchens"
      ],
      [
        "Classify risk",
        "Use, aerosolisation, temperature, occupancy, season and history"
      ],
      [
        "Plan controls",
        "Frequency, owner, supplier, method, criterion and route"
      ],
      [
        "Execute in field",
        "Date, time, operator, QR, observations and custody"
      ],
      [
        "Review results",
        "Reports, CoA, trends, alerts and operational impact"
      ],
      [
        "Close action",
        "Corrective action, verification, communication and closure evidence"
      ]
    ],
    "sectionEyebrows": [
      "Hospitality water risk",
      "Operational workflow",
      "Teams using the same evidence",
      "Risk matrix",
      "AquaVerify modules",
      "Programmes by venue type",
      "Control and inspection framework",
      "Preventive maturity",
      "Rollout plan"
    ],
    "sectionBodies": [
      "Hospitality and leisure water control needs context by site, asset, season, occupancy and operational decision.",
      "Connect the asset map with sampling, laboratory results, corrective actions and documented closure.",
      "A shared water history helps operations, maintenance, quality, wellness and food service work from the same evidence.",
      "Each asset requires a different control route, response time and closure evidence.",
      "Combine cloud workflows, field execution, laboratory reporting, incident management and microbiological indicators according to the water programme.",
      "Start with the highest-risk assets and scale across sites, suppliers, venues and seasons.",
      "Use applicable control plans, inspections and water management references as the framework for the programme.",
      "Move from scattered controls to preventive, multi-site water management.",
      "Configure AquaVerify around existing sites, suppliers, laboratories and operating procedures."
    ],
    "matrixHeaders": [
      "Asset or scenario",
      "Risk to control",
      "Evidence and decision"
    ],
    "moduleHeaders": [
      "Module",
      "What it adds"
    ],
    "faqTitle": "Frequently asked questions",
    "formEyebrow": "Hospitality and leisure water diagnosis",
    "formTitle": "Turn water control into operational evidence for every site and asset",
    "formBody": "Share venue type, critical assets, laboratory model and monthly sample volume. The request continues in AquaVerify Cloud with hospitality, tourism and leisure context.",
    "formLabels": [
      "Name",
      "Company",
      "Professional email",
      "Country",
      "Asset or water area",
      "Venue or service",
      "Operating model",
      "Samples per month",
      "Current method",
      "Main need"
    ],
    "formPlaceholders": [
      "Name and surname",
      "Hotel, resort, spa, campsite, restaurant...",
      "name@company.com",
      "Spain, France, United States...",
      "Hotel group, resort, spa, campsite, restaurant...",
      "50, 200, 1000+",
      "Maintenance supplier, lab, Excel, LIMS...",
      "Legionella plan, pools, season opening, incidents, inspections..."
    ],
    "waterTypes": [
      "Rooms / showers / hot water",
      "Pools and aquatic leisure",
      "Spa / jacuzzi / wellness",
      "Kitchens / ice / beverages",
      "Campsite sanitary blocks",
      "Sports and leisure venues",
      "Multi-site portfolio",
      "Not defined yet"
    ],
    "siteModels": [
      "Internal maintenance team",
      "External maintenance supplier",
      "External laboratory partner",
      "Mixed model",
      "Hotel group / multi-site",
      "Seasonal operation",
      "Not defined yet"
    ],
    "formSubmit": "Continue in AquaVerify Cloud",
    "formPrivacy": "The commercial team receives the request with origin, asset type, venue model and water-management context."
  },
  "es": {
    "heroProof": [
      [
        "Trazabilidad por sede",
        "Instalaciones, activos, puntos, proveedores y acciones quedan conectados."
      ],
      [
        "Activos críticos",
        "Habitaciones, duchas, ACS, piscinas, spas, cocina, hielo y ocio acuático se gestionan juntos."
      ],
      [
        "Respuesta a incidencias",
        "Alertas, medidas correctoras, remuestreos y reaperturas quedan documentadas."
      ],
      [
        "Control multi-sede",
        "Compara hoteles, resorts, campings, restaurantes y espacios de ocio."
      ]
    ],
    "heroSteps": [
      [
        "Inventariar activos",
        "Habitaciones, alas, duchas, depósitos, piscinas, spas, fuentes y cocinas"
      ],
      [
        "Clasificar riesgo",
        "Uso, aerosolización, temperatura, ocupación, temporada e historial"
      ],
      [
        "Planificar controles",
        "Frecuencia, responsable, proveedor, método, criterio y ruta"
      ],
      [
        "Ejecutar en campo",
        "Fecha, hora, operador, QR, observaciones y custodia"
      ],
      [
        "Revisar resultados",
        "Informes, CoA, tendencias, alertas e impacto operativo"
      ],
      [
        "Cerrar acción",
        "Medida correctora, verificación, comunicación y evidencia de cierre"
      ]
    ],
    "sectionEyebrows": [
      "Riesgo hídrico en hostelería",
      "Flujo operativo",
      "Equipos sobre la misma evidencia",
      "Matriz de riesgo",
      "Módulos AquaVerify",
      "Programas por tipo de establecimiento",
      "Marco de control e inspección",
      "Madurez preventiva",
      "Plan de puesta en marcha"
    ],
    "sectionBodies": [
      "El control del agua en hostelería y ocio necesita contexto por sede, activo, temporada, ocupación y decisión operativa.",
      "Conecta el mapa de activos con muestreo, laboratorio, acciones correctoras y cierre documentado.",
      "Un historial común del agua ayuda a operaciones, mantenimiento, calidad, wellness y restauración a trabajar con la misma evidencia.",
      "Cada activo requiere una ruta de control, tiempo de respuesta y evidencia de cierre diferentes.",
      "Combina flujos cloud, ejecución en campo, informes de laboratorio, incidencias e indicadores microbiológicos según el programa de agua.",
      "Empieza por los activos de mayor riesgo y escala a sedes, proveedores, establecimientos y temporadas.",
      "Usa planes de control, inspecciones y referencias de gestión del agua como marco del programa.",
      "Pasa de controles dispersos a una gestión preventiva y multi-sede del agua.",
      "Configura AquaVerify alrededor de sedes, proveedores, laboratorios y procedimientos operativos existentes."
    ],
    "matrixHeaders": [
      "Activo o escenario",
      "Riesgo a controlar",
      "Evidencia y decisión"
    ],
    "moduleHeaders": [
      "Módulo",
      "Qué aporta"
    ],
    "faqTitle": "Preguntas frecuentes",
    "formEyebrow": "Diagnóstico de agua en hostelería y ocio",
    "formTitle": "Convierte el control del agua en evidencia operativa por sede y activo",
    "formBody": "Comparte tipo de establecimiento, activos críticos, modelo de laboratorio y volumen mensual de muestras. La solicitud continúa en AquaVerify Cloud con contexto de hostelería, turismo y ocio.",
    "formLabels": [
      "Nombre",
      "Empresa",
      "Email profesional",
      "País",
      "Activo o zona de agua",
      "Establecimiento o servicio",
      "Modelo operativo",
      "Muestras al mes",
      "Método actual",
      "Necesidad principal"
    ],
    "formPlaceholders": [
      "Nombre y apellidos",
      "Hotel, resort, spa, camping, restaurante...",
      "nombre@empresa.com",
      "España, Francia, Estados Unidos...",
      "Grupo hotelero, resort, spa, camping, restaurante...",
      "50, 200, 1000+",
      "Proveedor mantenimiento, laboratorio, Excel, LIMS...",
      "Plan Legionella, piscinas, apertura temporada, incidencias, inspecciones..."
    ],
    "waterTypes": [
      "Habitaciones / duchas / ACS",
      "Piscinas y ocio acuático",
      "Spa / jacuzzi / wellness",
      "Cocinas / hielo / bebidas",
      "Bloques sanitarios de camping",
      "Centros deportivos y ocio",
      "Cartera multi-sede",
      "Todavía no definido"
    ],
    "siteModels": [
      "Equipo interno de mantenimiento",
      "Proveedor externo de mantenimiento",
      "Laboratorio externo partner",
      "Modelo mixto",
      "Grupo hotelero / multi-sede",
      "Operación estacional",
      "Todavía no definido"
    ],
    "formSubmit": "Continuar en AquaVerify Cloud",
    "formPrivacy": "El equipo comercial recibe la solicitud con origen, tipo de activo, modelo de establecimiento y contexto de gestión del agua."
  },
  "fr": {
    "heroProof": [
      [
        "Traçabilité par site",
        "Installations, actifs, points, prestataires et actions restent connectés."
      ],
      [
        "Actifs critiques",
        "Chambres, douches, ECS, piscines, spas, cuisine, glace et loisirs aquatiques sont gérés ensemble."
      ],
      [
        "Réponse aux incidents",
        "Alertes, actions correctives, reprélèvements et réouvertures sont documentés."
      ],
      [
        "Contrôle multi-site",
        "Comparez hôtels, resorts, campings, restaurants et lieux de loisirs."
      ]
    ],
    "heroSteps": [
      [
        "Inventorier les actifs",
        "Chambres, ailes, douches, cuves, piscines, spas, fontaines et cuisines"
      ],
      [
        "Classer le risque",
        "Usage, aérosolisation, température, occupation, saison et historique"
      ],
      [
        "Planifier contrôles",
        "Fréquence, responsable, prestataire, méthode, critère et route"
      ],
      [
        "Exécuter terrain",
        "Date, heure, opérateur, QR, observations et traçabilité"
      ],
      [
        "Revoir résultats",
        "Rapports, CoA, tendances, alertes et impact opérationnel"
      ],
      [
        "Clôturer action",
        "Action corrective, vérification, communication et preuve de clôture"
      ]
    ],
    "sectionEyebrows": [
      "Risque eau en hôtellerie",
      "Flux opérationnel",
      "Équipes sur la même preuve",
      "Matrice de risque",
      "Modules AquaVerify",
      "Programmes par type de site",
      "Cadre contrôle et inspection",
      "Maturité préventive",
      "Plan de mise en route"
    ],
    "sectionBodies": [
      "Le contrôle de l’eau en hôtellerie et loisirs exige un contexte par site, actif, saison, occupation et décision opérationnelle.",
      "Reliez carte des actifs, prélèvements, laboratoire, actions correctives et clôture documentée.",
      "Un historique commun de l’eau aide opérations, maintenance, qualité, wellness et restauration à travailler sur la même preuve.",
      "Chaque actif exige une route de contrôle, un délai de réponse et une preuve de clôture spécifiques.",
      "Combinez flux cloud, exécution terrain, rapports laboratoire, incidents et indicateurs microbiologiques selon le programme eau.",
      "Commencez par les actifs les plus à risque puis étendez aux sites, prestataires, établissements et saisons.",
      "Utilisez plans de contrôle, inspections et références de gestion de l’eau comme cadre du programme.",
      "Passez de contrôles dispersés à une gestion préventive et multi-site de l’eau.",
      "Configurez AquaVerify autour des sites, prestataires, laboratoires et procédures opérationnelles existants."
    ],
    "matrixHeaders": [
      "Actif ou scénario",
      "Risque à maîtriser",
      "Preuve et décision"
    ],
    "moduleHeaders": [
      "Module",
      "Apport principal"
    ],
    "faqTitle": "Questions fréquentes",
    "formEyebrow": "Diagnostic eau hôtellerie et loisirs",
    "formTitle": "Transformez le contrôle de l’eau en preuve opérationnelle par site et actif",
    "formBody": "Partagez type d’établissement, actifs critiques, modèle laboratoire et volume mensuel. La demande continue dans AquaVerify Cloud avec contexte hôtellerie, tourisme et loisirs.",
    "formLabels": [
      "Nom",
      "Entreprise",
      "Email professionnel",
      "Pays",
      "Actif ou zone d’eau",
      "Établissement ou service",
      "Modèle opérationnel",
      "Échantillons par mois",
      "Méthode actuelle",
      "Besoin principal"
    ],
    "formPlaceholders": [
      "Nom et prénom",
      "Hôtel, resort, spa, camping, restaurant...",
      "nom@entreprise.com",
      "Espagne, France, États-Unis...",
      "Groupe hôtelier, resort, spa, camping, restaurant...",
      "50, 200, 1000+",
      "Prestataire maintenance, laboratoire, Excel, LIMS...",
      "Plan Legionella, piscines, ouverture saison, incidents, inspections..."
    ],
    "waterTypes": [
      "Chambres / douches / ECS",
      "Piscines et loisirs aquatiques",
      "Spa / jacuzzi / wellness",
      "Cuisines / glace / boissons",
      "Blocs sanitaires camping",
      "Centres sportifs et loisirs",
      "Portefeuille multi-site",
      "Pas encore défini"
    ],
    "siteModels": [
      "Équipe maintenance interne",
      "Prestataire maintenance externe",
      "Laboratoire partenaire externe",
      "Modèle mixte",
      "Groupe hôtelier / multi-site",
      "Opération saisonnière",
      "Pas encore défini"
    ],
    "formSubmit": "Continuer dans AquaVerify Cloud",
    "formPrivacy": "L’équipe commerciale reçoit la demande avec origine, type d’actif, modèle d’établissement et contexte de gestion de l’eau."
  },
  "it": {
    "heroProof": [
      [
        "Tracciabilità per sede",
        "Strutture, asset, punti, fornitori e azioni restano collegati."
      ],
      [
        "Asset critici",
        "Camere, docce, ACS, piscine, spa, cucina, ghiaccio e leisure acquatico gestiti insieme."
      ],
      [
        "Risposta agli incidenti",
        "Allerte, azioni correttive, ricampionamenti e riaperture sono documentati."
      ],
      [
        "Controllo multi-sede",
        "Confronta hotel, resort, campeggi, ristoranti e luoghi leisure."
      ]
    ],
    "heroSteps": [
      [
        "Inventariare asset",
        "Camere, ali, docce, serbatoi, piscine, spa, fontane e cucine"
      ],
      [
        "Classificare rischio",
        "Uso, aerosol, temperatura, occupazione, stagione e storico"
      ],
      [
        "Pianificare controlli",
        "Frequenza, responsabile, fornitore, metodo, criterio e percorso"
      ],
      [
        "Eseguire in campo",
        "Data, ora, operatore, QR, osservazioni e custodia"
      ],
      [
        "Rivedere risultati",
        "Report, CoA, trend, allerte e impatto operativo"
      ],
      [
        "Chiudere azione",
        "Azione correttiva, verifica, comunicazione ed evidenza di chiusura"
      ]
    ],
    "sectionEyebrows": [
      "Rischio acqua nell’ospitalità",
      "Flusso operativo",
      "Team sulla stessa evidenza",
      "Matrice rischio",
      "Moduli AquaVerify",
      "Programmi per struttura",
      "Quadro controllo e ispezione",
      "Maturità preventiva",
      "Piano di avvio"
    ],
    "sectionBodies": [
      "Il controllo dell’acqua in ospitalità e leisure richiede contesto per sede, asset, stagione, occupazione e decisione operativa.",
      "Collega mappa asset, campionamento, laboratorio, azioni correttive e chiusura documentata.",
      "Uno storico comune dell’acqua aiuta operations, manutenzione, qualità, wellness e ristorazione a lavorare sulla stessa evidenza.",
      "Ogni asset richiede un percorso di controllo, tempo di risposta ed evidenza di chiusura diversi.",
      "Combina flussi cloud, esecuzione in campo, report laboratorio, incidenti e indicatori microbiologici secondo il programma acqua.",
      "Inizia dagli asset più critici e scala su sedi, fornitori, strutture e stagioni.",
      "Usa piani di controllo, ispezioni e riferimenti di gestione acqua come quadro del programma.",
      "Passa da controlli dispersi a gestione preventiva e multi-sede dell’acqua.",
      "Configura AquaVerify intorno a sedi, fornitori, laboratori e procedure operative esistenti."
    ],
    "matrixHeaders": [
      "Asset o scenario",
      "Rischio da controllare",
      "Evidenza e decisione"
    ],
    "moduleHeaders": [
      "Modulo",
      "Cosa apporta"
    ],
    "faqTitle": "Domande frequenti",
    "formEyebrow": "Diagnosi acqua ospitalità e leisure",
    "formTitle": "Trasforma il controllo acqua in evidenza operativa per sede e asset",
    "formBody": "Condividi tipo struttura, asset critici, modello laboratorio e volume mensile. La richiesta continua in AquaVerify Cloud con contesto ospitalità, turismo e tempo libero.",
    "formLabels": [
      "Nome",
      "Azienda",
      "Email professionale",
      "Paese",
      "Asset o zona acqua",
      "Struttura o servizio",
      "Modello operativo",
      "Campioni al mese",
      "Metodo attuale",
      "Esigenza principale"
    ],
    "formPlaceholders": [
      "Nome e cognome",
      "Hotel, resort, spa, campeggio, ristorante...",
      "nome@azienda.com",
      "Spagna, Francia, Stati Uniti...",
      "Gruppo hotel, resort, spa, campeggio, ristorante...",
      "50, 200, 1000+",
      "Fornitore manutenzione, laboratorio, Excel, LIMS...",
      "Piano Legionella, piscine, apertura stagione, incidenti, ispezioni..."
    ],
    "waterTypes": [
      "Camere / docce / ACS",
      "Piscine e leisure acquatico",
      "Spa / jacuzzi / wellness",
      "Cucine / ghiaccio / bevande",
      "Blocchi sanitari campeggio",
      "Centri sportivi e leisure",
      "Portfolio multi-sede",
      "Non ancora definito"
    ],
    "siteModels": [
      "Team manutenzione interno",
      "Fornitore manutenzione esterno",
      "Laboratorio partner esterno",
      "Modello misto",
      "Gruppo hotel / multi-sede",
      "Operazione stagionale",
      "Non ancora definito"
    ],
    "formSubmit": "Continua in AquaVerify Cloud",
    "formPrivacy": "Il team commerciale riceve la richiesta con origine, tipo asset, modello struttura e contesto di gestione acqua."
  },
  "ca": {
    "heroProof": [
      [
        "Traçabilitat per seu",
        "Instal·lacions, actius, punts, proveïdors i accions queden connectats."
      ],
      [
        "Actius crítics",
        "Habitacions, dutxes, ACS, piscines, spas, cuina, gel i oci aquàtic es gestionen junts."
      ],
      [
        "Resposta a incidències",
        "Alertes, accions correctores, remostrejos i reobertures queden documentats."
      ],
      [
        "Control multi-seu",
        "Compara hotels, resorts, càmpings, restaurants i espais d’oci."
      ]
    ],
    "heroSteps": [
      [
        "Inventariar actius",
        "Habitacions, ales, dutxes, dipòsits, piscines, spas, fonts i cuines"
      ],
      [
        "Classificar risc",
        "Ús, aerosolització, temperatura, ocupació, temporada i historial"
      ],
      [
        "Planificar controls",
        "Freqüència, responsable, proveïdor, mètode, criteri i ruta"
      ],
      [
        "Executar a camp",
        "Data, hora, operador, QR, observacions i custòdia"
      ],
      [
        "Revisar resultats",
        "Informes, CoA, tendències, alertes i impacte operatiu"
      ],
      [
        "Tancar acció",
        "Acció correctora, verificació, comunicació i evidència de tancament"
      ]
    ],
    "sectionEyebrows": [
      "Risc hídric en hostaleria",
      "Flux operatiu",
      "Equips sobre la mateixa evidència",
      "Matriu de risc",
      "Mòduls AquaVerify",
      "Programes per establiment",
      "Marc de control i inspecció",
      "Maduresa preventiva",
      "Pla de posada en marxa"
    ],
    "sectionBodies": [
      "El control de l’aigua en hostaleria i oci necessita context per seu, actiu, temporada, ocupació i decisió operativa.",
      "Connecta el mapa d’actius amb mostreig, laboratori, accions correctores i tancament documentat.",
      "Un historial comú de l’aigua ajuda operacions, manteniment, qualitat, wellness i restauració a treballar amb la mateixa evidència.",
      "Cada actiu requereix una ruta de control, temps de resposta i evidència de tancament diferents.",
      "Combina fluxos cloud, execució a camp, informes de laboratori, incidències i indicadors microbiològics segons el programa d’aigua.",
      "Comença pels actius de més risc i escala a seus, proveïdors, establiments i temporades.",
      "Usa plans de control, inspeccions i referències de gestió de l’aigua com a marc del programa.",
      "Passa de controls dispersos a una gestió preventiva i multi-seu de l’aigua.",
      "Configura AquaVerify al voltant de seus, proveïdors, laboratoris i procediments operatius existents."
    ],
    "matrixHeaders": [
      "Actiu o escenari",
      "Risc a controlar",
      "Evidència i decisió"
    ],
    "moduleHeaders": [
      "Mòdul",
      "Què aporta"
    ],
    "faqTitle": "Preguntes freqüents",
    "formEyebrow": "Diagnòstic d’aigua en hostaleria i oci",
    "formTitle": "Converteix el control de l’aigua en evidència operativa per seu i actiu",
    "formBody": "Comparteix tipus d’establiment, actius crítics, model de laboratori i volum mensual. La sol·licitud continua a AquaVerify Cloud amb context d’hostaleria, turisme i oci.",
    "formLabels": [
      "Nom",
      "Empresa",
      "Email professional",
      "País",
      "Actiu o zona d’aigua",
      "Establiment o servei",
      "Model operatiu",
      "Mostres al mes",
      "Mètode actual",
      "Necessitat principal"
    ],
    "formPlaceholders": [
      "Nom i cognoms",
      "Hotel, resort, spa, càmping, restaurant...",
      "nom@empresa.com",
      "Espanya, França, Estats Units...",
      "Grup hoteler, resort, spa, càmping, restaurant...",
      "50, 200, 1000+",
      "Proveïdor manteniment, laboratori, Excel, LIMS...",
      "Pla Legionella, piscines, obertura temporada, incidències, inspeccions..."
    ],
    "waterTypes": [
      "Habitacions / dutxes / ACS",
      "Piscines i oci aquàtic",
      "Spa / jacuzzi / wellness",
      "Cuines / gel / begudes",
      "Blocs sanitaris de càmping",
      "Centres esportius i oci",
      "Cartera multi-seu",
      "Encara no definit"
    ],
    "siteModels": [
      "Equip intern de manteniment",
      "Proveïdor extern de manteniment",
      "Laboratori extern partner",
      "Model mixt",
      "Grup hoteler / multi-seu",
      "Operació estacional",
      "Encara no definit"
    ],
    "formSubmit": "Continuar a AquaVerify Cloud",
    "formPrivacy": "L’equip comercial rep la sol·licitud amb origen, tipus d’actiu, model d’establiment i context de gestió de l’aigua."
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

export const HospitalityTourismWaterLanding: React.FC<Props> = ({ content, pageLang, showCookieConsent = true }) => {
  const copy = COPY[pageLang] || COPY.en;
  const sections = Array.from({ length: 9 }, (_, index) => getSection(content, index, {
    title: copy.sectionEyebrows[index],
    body: copy.sectionBodies[index] || content.description,
    bullets: []
  }));
  const pageId = 'hospitality-tourism-water';
  const signupUrl = getPlatformSignupUrl({
    intent: 'hospitality_tourism_water',
    page: pageId,
    category: 'industries',
    profile: 'hospitality-tourism',
    module: 'hospitality-tourism-water-diagnosis'
  }, pageLang);

  const handleCtaClick = (label: string) => {
    trackCorporateEvent('platform_link_click', {
      lang: pageLang,
      page: pageId,
      category: 'industries',
      intent: 'hospitality_tourism_water',
      profile: 'hospitality-tourism',
      label,
      target_url: signupUrl,
      path: content.path
    });
  };

  const leadCapture = useMarketingLeadCapture({
    formKey: 'hospitality-tourism-water-diagnosis',
    requestType: 'hospitality_tourism_water',
    lang: pageLang,
    sourcePath: content.path,
    detailFields: ['water_type', 'product_type', 'site_model', 'sample_volume', 'current_method'],
    details: { page: pageId, category: 'industries', profile: 'hospitality-tourism', module: 'hospitality-tourism-water-diagnosis' },
    onAccepted: () => trackCorporateEvent('hospitality_tourism_water_diagnosis_submit', {
      lang: pageLang,
      page: pageId,
      category: 'industries',
      intent: 'hospitality_tourism_water',
      profile: 'hospitality-tourism',
      module: 'hospitality-tourism-water-diagnosis'
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

        <IndustryGlossaryTerms industryId="hospitality-tourism-water" lang={pageLang} />

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
