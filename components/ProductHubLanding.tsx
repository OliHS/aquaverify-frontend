import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Beaker,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Factory,
  FileCheck2,
  Gauge,
  Handshake,
  LayoutDashboard,
  Microscope,
  SearchCheck,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieConsent } from './CookieConsent';
import { getMarketingPagePath } from '../utils/marketingRoutes.js';
import { getPlatformSignupUrl } from '../utils/platformLinks';
import { trackCorporateEvent } from '../utils/corporateAnalytics';
import type { Language } from '../utils/translations';

type ProductHubLandingProps = {
  content: any;
  pageLang: Language;
  showCookieConsent?: boolean;
};

const COPY: Record<Language, {
  eyebrow: string;
  title: string;
  body: string;
  primary: string;
  secondary: string;
  distributor: string;
  decisionEyebrow: string;
  decisionTitle: string;
  comparisonTitle: string;
  sectorTitle: string;
  sectorBody: string;
  partnersTitle: string;
  partnersBody: string;
  faqTitle: string;
  families: Array<{ id: string; pageId: string; title: string; need: string; type: string; use: string; buyer: string; cta: string }>;
  sectorGroups: Array<{ title: string; pageId: string; products: string[] }>;
  partnerCards: Array<{ title: string; body: string; cta: string; pageId: string; intent: string }>;
  faqs: Array<{ question: string; answer: string }>;
}> = {
  en: {
    eyebrow: 'AquaVerify products',
    title: 'Water microbiology products connected to digital traceability',
    body: 'Choose the right path for enumeration, presence/absence screening, ISO/EPA-oriented workflows, daily lab essentials and connected sample-to-report operations.',
    primary: 'Request product recommendation',
    secondary: 'Compare product families',
    distributor: 'Find a distributor',
    decisionEyebrow: 'Choose by need',
    decisionTitle: 'Start from the question your team needs to answer',
    comparisonTitle: 'Compare AquaVerify product families',
    sectorTitle: 'Recommended paths by sector',
    sectorBody: 'Each sector can combine products, digital records and reporting according to sample volume, risk and operational context.',
    partnersTitle: 'Buy locally or build a partner program',
    partnersBody: 'AquaVerify products can be supplied through authorized distributors, direct technical conversations or OEM programs for qualified partners.',
    faqTitle: 'Product questions',
    families: [
      { id: 'count', pageId: 'enumera', title: 'ENUMERA', need: 'I need to count or enumerate microorganisms', type: 'Quantitative', use: 'Microbiological enumeration', buyer: 'Laboratories, municipal teams and QC', cta: 'View ENUMERA kits' },
      { id: 'screen', pageId: 'indica', title: 'INDICA', need: 'I need a clear presence/absence answer', type: 'Presence/absence', use: 'Fast screening and routine checks', buyer: 'Field teams, labs and quality teams', cta: 'View INDICA tests' },
      { id: 'standard', pageId: 'standard-kits', title: 'ISO/EPA kits', need: 'I need technical workflows aligned with reference methods', type: 'Technical workflows', use: 'ISO 10705-2 and EPA-oriented routines', buyer: 'Advanced laboratories and municipal programs', cta: 'View ISO/EPA kits' },
      { id: 'lab', pageId: 'lab-essentials', title: 'Lab Essentials', need: 'I need media, controls and routine microbiology materials', type: 'Operational support', use: 'Media, reagents, controls and prepared materials', buyer: 'Water microbiology laboratories', cta: 'View Lab Essentials' },
      { id: 'cloud', pageId: 'platform', title: 'AquaVerify Cloud', need: 'I need to register samples, results and reports', type: 'Digital platform', use: 'LIMS, CoA, traceability and customer portal', buyer: 'Labs, companies and distributors', cta: 'View AquaVerify Cloud' }
    ],
    sectorGroups: [
      { title: 'Water testing laboratories', pageId: 'water-testing-labs', products: ['ENUMERA', 'ISO/EPA kits', 'Lab Essentials', 'AquaVerify Cloud'] },
      { title: 'Water quality control', pageId: 'water-quality-control', products: ['ENUMERA', 'INDICA', 'AquaVerify Cloud'] },
      { title: 'Municipal water', pageId: 'municipal-water-testing', products: ['ENUMERA', 'INDICA', 'ISO/EPA kits', 'AquaVerify Cloud'] },
      { title: 'Food & beverage', pageId: 'food-beverage-water-quality', products: ['INDICA', 'ENUMERA', 'AquaVerify Cloud'] },
      { title: 'Industrial process water', pageId: 'industrial-process-water', products: ['INDICA', 'ENUMERA', 'AquaVerify Cloud'] },
      { title: 'Facilities and risk programs', pageId: 'facility-water-risk', products: ['INDICA', 'AquaVerify Cloud', 'Distributors'] }
    ],
    partnerCards: [
      { title: 'Authorized distributors', body: 'Find local commercial and technical support for AquaVerify products.', cta: 'Find an authorized distributor', pageId: 'distributors', intent: 'distributor_lookup' },
      { title: 'OEM and co-branding', body: 'Evaluate private-label, co-branded or specialized product programs.', cta: 'Explore OEM programs', pageId: 'oem', intent: 'oem_program' }
    ],
    faqs: [
      { question: 'What is the difference between ENUMERA and INDICA?', answer: 'ENUMERA is designed for quantitative enumeration workflows. INDICA is designed for clear presence/absence screening when the team needs a rapid qualitative answer.' },
      { question: 'Can AquaVerify products be used without AquaVerify Cloud?', answer: 'Products can be evaluated as laboratory workflows on their own, while AquaVerify Cloud adds traceability, reporting, customer portal and operational visibility.' },
      { question: 'Which family should a laboratory start with?', answer: 'Most water testing laboratories start by mapping matrix, method, volume and reporting needs, then combine ENUMERA, ISO/EPA kits, Lab Essentials and AquaVerify Cloud.' },
      { question: 'Are OEM or distributor programs available?', answer: 'AquaVerify can evaluate distributor, co-branding and OEM programs depending on territory, volume, portfolio fit and support requirements.' }
    ]
  },
  es: {
    eyebrow: 'Productos AquaVerify',
    title: 'Productos AquaVerify para microbiología del agua y trazabilidad de resultados',
    body: 'Elige la ruta adecuada para enumeración, cribado presencia/ausencia, flujos orientados a ISO/EPA, operación diaria de laboratorio y trazabilidad digital de muestra a informe.',
    primary: 'Solicitar recomendación técnica',
    secondary: 'Comparar familias',
    distributor: 'Encontrar distribuidor',
    decisionEyebrow: 'Elegir por necesidad',
    decisionTitle: 'Empieza por la pregunta que necesita responder tu equipo',
    comparisonTitle: 'Comparativa de familias AquaVerify',
    sectorTitle: 'Rutas recomendadas por sector',
    sectorBody: 'Cada sector puede combinar productos, registros digitales e informes según volumen de muestras, riesgo y contexto operativo.',
    partnersTitle: 'Comprar localmente o crear un programa partner',
    partnersBody: 'Los productos AquaVerify pueden suministrarse mediante distribuidores autorizados, conversación técnica directa o programas OEM para partners cualificados.',
    faqTitle: 'Preguntas sobre productos',
    families: [
      { id: 'count', pageId: 'enumera', title: 'ENUMERA', need: 'Necesito contar o enumerar microorganismos', type: 'Cuantitativa', use: 'Enumeración microbiológica', buyer: 'Laboratorios, municipios y equipos QC', cta: 'Ver kits ENUMERA' },
      { id: 'screen', pageId: 'indica', title: 'INDICA', need: 'Necesito una respuesta clara presencia/ausencia', type: 'Presencia/ausencia', use: 'Cribado rápido y control rutinario', buyer: 'Campo, laboratorios y calidad', cta: 'Ver pruebas INDICA' },
      { id: 'standard', pageId: 'standard-kits', title: 'Kits ISO/EPA', need: 'Necesito flujos técnicos alineables con métodos de referencia', type: 'Flujos técnicos', use: 'Rutinas orientadas a ISO 10705-2 y EPA', buyer: 'Laboratorios avanzados y programas municipales', cta: 'Ver kits ISO/EPA' },
      { id: 'lab', pageId: 'lab-essentials', title: 'Lab Essentials', need: 'Necesito medios, controles y materiales de microbiología diaria', type: 'Soporte operativo', use: 'Medios, reactivos, controles y preparados', buyer: 'Laboratorios de microbiología del agua', cta: 'Ver Lab Essentials' },
      { id: 'cloud', pageId: 'platform', title: 'AquaVerify Cloud', need: 'Necesito registrar muestras, resultados e informes', type: 'Plataforma digital', use: 'LIMS, CoA, trazabilidad y portal cliente', buyer: 'Laboratorios, empresas y distribuidores', cta: 'Ver AquaVerify Cloud' }
    ],
    sectorGroups: [
      { title: 'Laboratorios de análisis de agua', pageId: 'water-testing-labs', products: ['ENUMERA', 'Kits ISO/EPA', 'Lab Essentials', 'AquaVerify Cloud'] },
      { title: 'Control de calidad del agua', pageId: 'water-quality-control', products: ['ENUMERA', 'INDICA', 'AquaVerify Cloud'] },
      { title: 'Análisis de agua municipal', pageId: 'municipal-water-testing', products: ['ENUMERA', 'INDICA', 'Kits ISO/EPA', 'AquaVerify Cloud'] },
      { title: 'Alimentación y bebidas', pageId: 'food-beverage-water-quality', products: ['INDICA', 'ENUMERA', 'AquaVerify Cloud'] },
      { title: 'Agua de proceso industrial', pageId: 'industrial-process-water', products: ['INDICA', 'ENUMERA', 'AquaVerify Cloud'] },
      { title: 'Gestión de riesgo en instalaciones', pageId: 'facility-water-risk', products: ['INDICA', 'AquaVerify Cloud', 'Distribuidores'] }
    ],
    partnerCards: [
      { title: 'Distribuidores autorizados', body: 'Encuentra soporte comercial y técnico local para productos AquaVerify.', cta: 'Encontrar distribuidor autorizado', pageId: 'distributors', intent: 'distributor_lookup' },
      { title: 'OEM y co-branding', body: 'Evalúa programas marca blanca, co-branding o gamas especializadas.', cta: 'Explorar programas OEM', pageId: 'oem', intent: 'oem_program' }
    ],
    faqs: [
      { question: '¿Cuál es la diferencia entre ENUMERA e INDICA?', answer: 'ENUMERA está pensada para flujos cuantitativos de enumeración. INDICA está pensada para cribado presencia/ausencia cuando el equipo necesita una respuesta cualitativa clara.' },
      { question: '¿Los productos pueden usarse sin AquaVerify Cloud?', answer: 'Los productos pueden evaluarse como flujos de laboratorio independientes, mientras que AquaVerify Cloud añade trazabilidad, reporting, portal cliente y visibilidad operativa.' },
      { question: '¿Con qué familia debería empezar un laboratorio?', answer: 'La mayoría de laboratorios empieza mapeando matriz, método, volumen y necesidades de informe, y después combina ENUMERA, kits ISO/EPA, Lab Essentials y AquaVerify Cloud.' },
      { question: '¿Existen programas OEM o distribuidores?', answer: 'AquaVerify puede evaluar programas de distribución, co-branding y OEM según territorio, volumen, encaje de portfolio y necesidades de soporte.' }
    ]
  },
  fr: {
    eyebrow: 'Produits AquaVerify',
    title: 'Produits AquaVerify pour la microbiologie de l’eau et la traçabilité des résultats',
    body: 'Choisissez le bon parcours pour le dénombrement, le dépistage présence/absence, les flux orientés ISO/EPA, les essentiels de laboratoire et la traçabilité numérique de l’échantillon au rapport.',
    primary: 'Demander une recommandation technique',
    secondary: 'Comparer les gammes',
    distributor: 'Trouver un distributeur',
    decisionEyebrow: 'Choisir selon le besoin',
    decisionTitle: 'Commencez par la question à laquelle votre équipe doit répondre',
    comparisonTitle: 'Comparer les gammes AquaVerify',
    sectorTitle: 'Parcours recommandés par secteur',
    sectorBody: 'Chaque secteur peut combiner produits, enregistrements numériques et reporting selon volume, risque et contexte opérationnel.',
    partnersTitle: 'Acheter localement ou créer un programme partenaire',
    partnersBody: 'Les produits AquaVerify peuvent être fournis via distributeurs autorisés, échange technique direct ou programmes OEM pour partenaires qualifiés.',
    faqTitle: 'Questions produits',
    families: [
      { id: 'count', pageId: 'enumera', title: 'ENUMERA', need: 'Je dois compter ou dénombrer des micro-organismes', type: 'Quantitatif', use: 'Dénombrement microbiologique', buyer: 'Laboratoires, municipalités et équipes qualité', cta: 'Voir les kits ENUMERA' },
      { id: 'screen', pageId: 'indica', title: 'INDICA', need: 'J’ai besoin d’une réponse présence/absence claire', type: 'Présence/absence', use: 'Dépistage rapide et contrôle routine', buyer: 'Terrain, laboratoires et qualité', cta: 'Voir les tests INDICA' },
      { id: 'standard', pageId: 'standard-kits', title: 'Kits ISO/EPA', need: 'J’ai besoin de flux techniques alignables avec des méthodes de référence', type: 'Flux techniques', use: 'Routines orientées ISO 10705-2 et EPA', buyer: 'Laboratoires avancés et programmes municipaux', cta: 'Voir les kits ISO/EPA' },
      { id: 'lab', pageId: 'lab-essentials', title: 'Lab Essentials', need: 'J’ai besoin de milieux, contrôles et matériaux microbiologiques quotidiens', type: 'Support opérationnel', use: 'Milieux, réactifs, contrôles et préparations', buyer: 'Laboratoires de microbiologie de l’eau', cta: 'Voir Lab Essentials' },
      { id: 'cloud', pageId: 'platform', title: 'AquaVerify Cloud', need: 'Je dois enregistrer échantillons, résultats et rapports', type: 'Plateforme numérique', use: 'LIMS, CoA, traçabilité et portail client', buyer: 'Labs, entreprises et distributeurs', cta: 'Voir AquaVerify Cloud' }
    ],
    sectorGroups: [
      { title: 'Laboratoires d’analyse de l’eau', pageId: 'water-testing-labs', products: ['ENUMERA', 'Kits ISO/EPA', 'Lab Essentials', 'AquaVerify Cloud'] },
      { title: 'Contrôle qualité de l’eau', pageId: 'water-quality-control', products: ['ENUMERA', 'INDICA', 'AquaVerify Cloud'] },
      { title: 'Eau municipale', pageId: 'municipal-water-testing', products: ['ENUMERA', 'INDICA', 'Kits ISO/EPA', 'AquaVerify Cloud'] },
      { title: 'Agroalimentaire', pageId: 'food-beverage-water-quality', products: ['INDICA', 'ENUMERA', 'AquaVerify Cloud'] },
      { title: 'Eau de process industriel', pageId: 'industrial-process-water', products: ['INDICA', 'ENUMERA', 'AquaVerify Cloud'] },
      { title: 'Risque eau bâtiments', pageId: 'facility-water-risk', products: ['INDICA', 'AquaVerify Cloud', 'Distributeurs'] }
    ],
    partnerCards: [
      { title: 'Distributeurs autorisés', body: 'Trouvez un support commercial et technique local pour les produits AquaVerify.', cta: 'Trouver un distributeur autorisé', pageId: 'distributors', intent: 'distributor_lookup' },
      { title: 'OEM et co-branding', body: 'Évaluez des programmes marque blanche, co-branding ou gammes spécialisées.', cta: 'Explorer les programmes OEM', pageId: 'oem', intent: 'oem_program' }
    ],
    faqs: [
      { question: 'Quelle est la différence entre ENUMERA et INDICA?', answer: 'ENUMERA répond aux flux quantitatifs de dénombrement. INDICA répond au dépistage présence/absence lorsque l’équipe a besoin d’une réponse qualitative claire.' },
      { question: 'Les produits peuvent-ils être utilisés sans AquaVerify Cloud?', answer: 'Les produits peuvent être évalués comme flux de laboratoire autonomes, tandis qu’AquaVerify Cloud ajoute traçabilité, reporting, portail client et visibilité opérationnelle.' },
      { question: 'Par quelle gamme un laboratoire doit-il commencer?', answer: 'La plupart des laboratoires commencent par cartographier matrice, méthode, volume et besoins de rapport, puis combinent ENUMERA, kits ISO/EPA, Lab Essentials et AquaVerify Cloud.' },
      { question: 'Existe-t-il des programmes OEM ou distributeurs?', answer: 'AquaVerify peut évaluer des programmes de distribution, co-branding et OEM selon territoire, volume, adéquation du portfolio et besoins de support.' }
    ]
  },
  it: {
    eyebrow: 'Prodotti AquaVerify',
    title: 'Prodotti AquaVerify per microbiologia dell’acqua e tracciabilità dei risultati',
    body: 'Scegli il percorso giusto per enumerazione, screening presenza/assenza, flussi orientati ISO/EPA, operatività di laboratorio e tracciabilità digitale dal campione al report.',
    primary: 'Richiedi raccomandazione tecnica',
    secondary: 'Confronta le gamme',
    distributor: 'Trova un distributore',
    decisionEyebrow: 'Scegli per esigenza',
    decisionTitle: 'Parti dalla domanda a cui il tuo team deve rispondere',
    comparisonTitle: 'Confronta le famiglie AquaVerify',
    sectorTitle: 'Percorsi consigliati per settore',
    sectorBody: 'Ogni settore può combinare prodotti, registri digitali e report secondo volume campioni, rischio e contesto operativo.',
    partnersTitle: 'Acquista localmente o crea un programma partner',
    partnersBody: 'I prodotti AquaVerify possono essere forniti tramite distributori autorizzati, confronto tecnico diretto o programmi OEM per partner qualificati.',
    faqTitle: 'Domande sui prodotti',
    families: [
      { id: 'count', pageId: 'enumera', title: 'ENUMERA', need: 'Devo contare o enumerare microrganismi', type: 'Quantitativo', use: 'Enumerazione microbiologica', buyer: 'Laboratori, municipalità e team QC', cta: 'Vedi kit ENUMERA' },
      { id: 'screen', pageId: 'indica', title: 'INDICA', need: 'Mi serve una risposta presenza/assenza chiara', type: 'Presenza/assenza', use: 'Screening rapido e controlli routine', buyer: 'Campo, laboratori e qualità', cta: 'Vedi test INDICA' },
      { id: 'standard', pageId: 'standard-kits', title: 'Kit ISO/EPA', need: 'Mi servono flussi tecnici allineabili a metodi di riferimento', type: 'Flussi tecnici', use: 'Routine orientate ISO 10705-2 ed EPA', buyer: 'Laboratori avanzati e programmi municipali', cta: 'Vedi kit ISO/EPA' },
      { id: 'lab', pageId: 'lab-essentials', title: 'Lab Essentials', need: 'Mi servono terreni, controlli e materiali microbiologici quotidiani', type: 'Supporto operativo', use: 'Terreni, reagenti, controlli e preparati', buyer: 'Laboratori di microbiologia dell’acqua', cta: 'Vedi Lab Essentials' },
      { id: 'cloud', pageId: 'platform', title: 'AquaVerify Cloud', need: 'Devo registrare campioni, risultati e report', type: 'Piattaforma digitale', use: 'LIMS, CoA, tracciabilità e portale clienti', buyer: 'Labs, aziende e distributori', cta: 'Vedi AquaVerify Cloud' }
    ],
    sectorGroups: [
      { title: 'Laboratori analisi acqua', pageId: 'water-testing-labs', products: ['ENUMERA', 'Kit ISO/EPA', 'Lab Essentials', 'AquaVerify Cloud'] },
      { title: 'Controllo qualità acqua', pageId: 'water-quality-control', products: ['ENUMERA', 'INDICA', 'AquaVerify Cloud'] },
      { title: 'Acqua municipale', pageId: 'municipal-water-testing', products: ['ENUMERA', 'INDICA', 'Kit ISO/EPA', 'AquaVerify Cloud'] },
      { title: 'Food & beverage', pageId: 'food-beverage-water-quality', products: ['INDICA', 'ENUMERA', 'AquaVerify Cloud'] },
      { title: 'Acqua di processo', pageId: 'industrial-process-water', products: ['INDICA', 'ENUMERA', 'AquaVerify Cloud'] },
      { title: 'Rischio acqua strutture', pageId: 'facility-water-risk', products: ['INDICA', 'AquaVerify Cloud', 'Distributori'] }
    ],
    partnerCards: [
      { title: 'Distributori autorizzati', body: 'Trova supporto commerciale e tecnico locale per i prodotti AquaVerify.', cta: 'Trova distributore autorizzato', pageId: 'distributors', intent: 'distributor_lookup' },
      { title: 'OEM e co-branding', body: 'Valuta programmi private label, co-branding o gamme specializzate.', cta: 'Esplora programmi OEM', pageId: 'oem', intent: 'oem_program' }
    ],
    faqs: [
      { question: 'Qual è la differenza tra ENUMERA e INDICA?', answer: 'ENUMERA è pensata per flussi quantitativi di enumerazione. INDICA è pensata per screening presenza/assenza quando serve una risposta qualitativa chiara.' },
      { question: 'I prodotti possono essere usati senza AquaVerify Cloud?', answer: 'I prodotti possono essere valutati come flussi di laboratorio autonomi, mentre AquaVerify Cloud aggiunge tracciabilità, reporting, portale clienti e visibilità operativa.' },
      { question: 'Da quale famiglia dovrebbe iniziare un laboratorio?', answer: 'Molti laboratori iniziano mappando matrice, metodo, volume e necessità di report, poi combinano ENUMERA, kit ISO/EPA, Lab Essentials e AquaVerify Cloud.' },
      { question: 'Sono disponibili programmi OEM o distributori?', answer: 'AquaVerify può valutare programmi distributore, co-branding e OEM secondo territorio, volume, fit portfolio e necessità di supporto.' }
    ]
  },
  ca: {
    eyebrow: 'Productes AquaVerify',
    title: 'Productes AquaVerify per a microbiologia de l’aigua i traçabilitat de resultats',
    body: 'Tria la ruta adequada per a enumeració, cribratge presència/absència, fluxos orientats a ISO/EPA, operació diària de laboratori i traçabilitat digital de mostra a informe.',
    primary: 'Sol·licitar recomanació tècnica',
    secondary: 'Comparar famílies',
    distributor: 'Trobar distribuïdor',
    decisionEyebrow: 'Triar per necessitat',
    decisionTitle: 'Comença per la pregunta que necessita respondre el teu equip',
    comparisonTitle: 'Comparativa de famílies AquaVerify',
    sectorTitle: 'Rutes recomanades per sector',
    sectorBody: 'Cada sector pot combinar productes, registres digitals i informes segons volum de mostres, risc i context operatiu.',
    partnersTitle: 'Comprar localment o crear un programa partner',
    partnersBody: 'Els productes AquaVerify es poden subministrar mitjançant distribuïdors autoritzats, conversa tècnica directa o programes OEM per a partners qualificats.',
    faqTitle: 'Preguntes sobre productes',
    families: [
      { id: 'count', pageId: 'enumera', title: 'ENUMERA', need: 'Necessito comptar o enumerar microorganismes', type: 'Quantitativa', use: 'Enumeració microbiològica', buyer: 'Laboratoris, municipis i equips QC', cta: 'Veure kits ENUMERA' },
      { id: 'screen', pageId: 'indica', title: 'INDICA', need: 'Necessito una resposta clara presència/absència', type: 'Presència/absència', use: 'Cribratge ràpid i control rutinari', buyer: 'Camp, laboratoris i qualitat', cta: 'Veure proves INDICA' },
      { id: 'standard', pageId: 'standard-kits', title: 'Kits ISO/EPA', need: 'Necessito fluxos tècnics alineables amb mètodes de referència', type: 'Fluxos tècnics', use: 'Rutines orientades a ISO 10705-2 i EPA', buyer: 'Laboratoris avançats i programes municipals', cta: 'Veure kits ISO/EPA' },
      { id: 'lab', pageId: 'lab-essentials', title: 'Lab Essentials', need: 'Necessito medis, controls i materials de microbiologia diària', type: 'Suport operatiu', use: 'Medis, reactius, controls i preparats', buyer: 'Laboratoris de microbiologia de l’aigua', cta: 'Veure Lab Essentials' },
      { id: 'cloud', pageId: 'platform', title: 'AquaVerify Cloud', need: 'Necessito registrar mostres, resultats i informes', type: 'Plataforma digital', use: 'LIMS, CoA, traçabilitat i portal client', buyer: 'Labs, empreses i distribuïdors', cta: 'Veure AquaVerify Cloud' }
    ],
    sectorGroups: [
      { title: 'Laboratoris d’anàlisi d’aigua', pageId: 'water-testing-labs', products: ['ENUMERA', 'Kits ISO/EPA', 'Lab Essentials', 'AquaVerify Cloud'] },
      { title: 'Control de qualitat de l’aigua', pageId: 'water-quality-control', products: ['ENUMERA', 'INDICA', 'AquaVerify Cloud'] },
      { title: 'Anàlisi d’aigua municipal', pageId: 'municipal-water-testing', products: ['ENUMERA', 'INDICA', 'Kits ISO/EPA', 'AquaVerify Cloud'] },
      { title: 'Alimentació i begudes', pageId: 'food-beverage-water-quality', products: ['INDICA', 'ENUMERA', 'AquaVerify Cloud'] },
      { title: 'Aigua de procés industrial', pageId: 'industrial-process-water', products: ['INDICA', 'ENUMERA', 'AquaVerify Cloud'] },
      { title: 'Gestió de risc en instal·lacions', pageId: 'facility-water-risk', products: ['INDICA', 'AquaVerify Cloud', 'Distribuïdors'] }
    ],
    partnerCards: [
      { title: 'Distribuïdors autoritzats', body: 'Troba suport comercial i tècnic local per a productes AquaVerify.', cta: 'Trobar distribuïdor autoritzat', pageId: 'distributors', intent: 'distributor_lookup' },
      { title: 'OEM i co-branding', body: 'Avalua programes marca blanca, co-branding o gammes especialitzades.', cta: 'Explorar programes OEM', pageId: 'oem', intent: 'oem_program' }
    ],
    faqs: [
      { question: 'Quina diferència hi ha entre ENUMERA i INDICA?', answer: 'ENUMERA està pensada per a fluxos quantitatius d’enumeració. INDICA està pensada per a cribratge presència/absència quan l’equip necessita una resposta qualitativa clara.' },
      { question: 'Els productes es poden usar sense AquaVerify Cloud?', answer: 'Els productes es poden avaluar com a fluxos de laboratori independents, mentre que AquaVerify Cloud afegeix traçabilitat, reporting, portal client i visibilitat operativa.' },
      { question: 'Amb quina família hauria de començar un laboratori?', answer: 'La majoria de laboratoris comença mapejant matriu, mètode, volum i necessitats d’informe, i després combina ENUMERA, kits ISO/EPA, Lab Essentials i AquaVerify Cloud.' },
      { question: 'Hi ha programes OEM o distribuïdors?', answer: 'AquaVerify pot avaluar programes de distribució, co-branding i OEM segons territori, volum, encaix de portfolio i necessitats de suport.' }
    ]
  }
};

const icons = [Gauge, SearchCheck, FileCheck2, Beaker, LayoutDashboard];

const TABLE_HEADERS: Record<Language, string[]> = {
  en: ['Family', 'Type', 'Main use', 'Ideal customer', 'Action'],
  es: ['Familia', 'Tipo', 'Uso principal', 'Cliente ideal', 'Acción'],
  fr: ['Gamme', 'Type', 'Usage principal', 'Client idéal', 'Action'],
  it: ['Famiglia', 'Tipo', 'Uso principale', 'Cliente ideale', 'Azione'],
  ca: ['Família', 'Tipus', 'Ús principal', 'Client ideal', 'Acció']
};

function publicAsset(src?: string) {
  const value = String(src || '').trim();
  if (!value) return '';
  return /^https?:\/\//i.test(value) || value.startsWith('/') ? value : `/${value}`;
}

export const ProductHubLanding: React.FC<ProductHubLandingProps> = ({
  content,
  pageLang,
  showCookieConsent = true
}) => {
  const copy = COPY[pageLang] || COPY.en;
  const heroImage = publicAsset(content.heroImage);
  const heroTitle = content.title || copy.title;
  const heroBody = content.description || copy.body;
  const quoteUrl = getPlatformSignupUrl({ intent: 'product_recommendation', page: 'products' }, pageLang);
  const distributorUrl = getMarketingPagePath('distributors', pageLang);
  const tableHeaders = TABLE_HEADERS[pageLang] || TABLE_HEADERS.en;

  const trackClick = (event: string, payload: Record<string, string>) => {
    trackCorporateEvent(event, {
      lang: pageLang,
      page: 'products',
      path: content.path,
      ...payload
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-900">
      <Header />
      <main className="flex-grow pt-20">
        <section className="aq-page-hero">
          <div className="container mx-auto grid gap-10 px-6 py-20 md:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.82fr)] lg:items-center">
            <div>
              <div className="aq-hero-eyebrow">
                {content.eyebrow || copy.eyebrow}
              </div>
              <h1 className="aq-gradient-title mt-5 max-w-4xl font-heading text-4xl font-black leading-tight md:text-6xl">
                {heroTitle}
              </h1>
              <p className="aq-hero-copy mt-6 max-w-3xl text-lg leading-8">
                {heroBody}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={quoteUrl}
                  onClick={() => trackClick('submit_quote_form', { intent: 'product_recommendation', location: 'products_hero' })}
                  className="aq-cta-primary"
                >
                  {copy.primary}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a
                  href="#compare-products"
                  className="aq-cta-secondary"
                >
                  {copy.secondary}
                </a>
                <Link
                  to={distributorUrl}
                  onClick={() => trackClick('click_distributor_cta', { location: 'products_hero' })}
                  className="aq-cta-secondary"
                >
                  {copy.distributor}
                </Link>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-2xl">
              {heroImage ? (
                <img
                  src={heroImage}
                  alt={content.heroImageAlt || content.title}
                  className="h-full max-h-[420px] w-full rounded-xl bg-white object-contain p-4"
                  loading="eager"
                />
              ) : (
                <div className="grid aspect-[4/3] place-items-center rounded-2xl bg-cyan-50">
                  <Microscope className="h-20 w-20 text-primary" />
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">{copy.decisionEyebrow}</div>
              <h2 className="mt-3 font-heading text-3xl font-black text-primary md:text-4xl">{copy.decisionTitle}</h2>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {copy.families.map((family, index) => {
                const Icon = icons[index] || Sparkles;
                const url = getMarketingPagePath(family.pageId, pageLang);
                return (
                  <Link
                    key={family.id}
                    to={url}
                    onClick={() => trackClick('click_product_card', { product: family.pageId, location: 'products_decision' })}
                    className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-1 hover:border-primary/30 hover:bg-white hover:shadow-lg"
                  >
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary shadow-sm transition group-hover:bg-secondary group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-xl font-black text-slate-950">{family.title}</h3>
                    <p className="mt-3 flex-grow text-sm font-semibold leading-6 text-slate-600">{family.need}</p>
                    <span className="mt-5 inline-flex items-center text-sm font-black text-secondary">
                      {family.cta}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section id="compare-products" className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <h2 className="font-heading text-3xl font-black text-primary md:text-4xl">{copy.comparisonTitle}</h2>
            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="grid bg-primary px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-white md:grid-cols-[1fr_0.8fr_1fr_1fr_0.9fr]">
                {tableHeaders.map((header) => <span key={header}>{header}</span>)}
              </div>
              <div className="divide-y divide-slate-100">
                {copy.families.map((family) => {
                  const url = getMarketingPagePath(family.pageId, pageLang);
                  return (
                    <div key={family.id} className="grid gap-3 px-5 py-5 text-sm md:grid-cols-[1fr_0.8fr_1fr_1fr_0.9fr] md:items-center">
                      <div className="font-heading text-lg font-black text-slate-950">{family.title}</div>
                      <div className="font-semibold text-slate-600">{family.type}</div>
                      <div className="font-semibold text-slate-600">{family.use}</div>
                      <div className="font-semibold text-slate-600">{family.buyer}</div>
                      <Link
                        to={url}
                        onClick={() => trackClick('click_compare_products', { product: family.pageId, location: 'products_comparison' })}
                        className="inline-flex w-fit items-center rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 text-xs font-black text-primary transition hover:border-primary hover:bg-white"
                      >
                        {family.cta}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <h2 className="font-heading text-3xl font-black text-primary md:text-4xl">{copy.sectorTitle}</h2>
                <p className="mt-4 text-base leading-8 text-slate-600">{copy.sectorBody}</p>
                <Link
                  to={getMarketingPagePath('industries-hub', pageLang)}
                  onClick={() => trackClick('click_sector_card', { location: 'products_sector_overview' })}
                  className="aq-cta-primary mt-6"
                >
                  {pageLang === 'en' ? 'View all industries' : pageLang === 'fr' ? 'Voir tous les secteurs' : pageLang === 'it' ? 'Vedi tutti i settori' : pageLang === 'ca' ? 'Veure tots els sectors' : 'Ver todos los sectores'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {copy.sectorGroups.map((sector) => (
                  <Link
                    key={sector.pageId}
                    to={getMarketingPagePath(sector.pageId, pageLang)}
                    onClick={() => trackClick('click_sector_card', { sector: sector.pageId, location: 'products_sector_recommendations' })}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-primary/30 hover:bg-white hover:shadow-md"
                  >
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                      {sector.pageId === 'food-beverage-water-quality' ? <Factory className="h-5 w-5" /> : sector.pageId === 'municipal-water-testing' ? <Building2 className="h-5 w-5" /> : <ClipboardCheck className="h-5 w-5" />}
                    </div>
                    <h3 className="font-heading text-lg font-black text-slate-950">{sector.title}</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {sector.products.map((product) => (
                        <span key={product} className="rounded-full border border-cyan-100 bg-white px-3 py-1 text-[11px] font-black text-cyan-800">{product}</span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary py-16 text-white md:py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h2 className="font-heading text-3xl font-black md:text-4xl">{copy.partnersTitle}</h2>
              <p className="mt-4 text-base leading-8 text-cyan-50/85">{copy.partnersBody}</p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {copy.partnerCards.map((card) => (
                <Link
                  key={card.pageId}
                  to={getMarketingPagePath(card.pageId, pageLang)}
                  onClick={() => trackClick(card.intent === 'oem_program' ? 'click_oem_cta' : 'click_distributor_cta', { location: 'products_partner_paths' })}
                  className="group rounded-2xl border border-white/15 bg-white/10 p-6 shadow-lg transition hover:-translate-y-1 hover:bg-white hover:text-primary"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-secondary">
                    {card.pageId === 'oem' ? <ShieldCheck className="h-5 w-5" /> : <Handshake className="h-5 w-5" />}
                  </div>
                  <h3 className="font-heading text-2xl font-black">{card.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-cyan-50/85 group-hover:text-slate-600">{card.body}</p>
                  <span className="mt-6 inline-flex items-center text-sm font-black">
                    {card.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto max-w-4xl px-6">
            <h2 className="font-heading text-3xl font-black text-primary">{copy.faqTitle}</h2>
            <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-6 shadow-sm">
              {copy.faqs.map((faq) => (
                <div key={faq.question} className="py-6">
                  <h3 className="flex gap-3 font-heading text-lg font-black text-slate-950">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-secondary" />
                    {faq.question}
                  </h3>
                  <p className="mt-2 pl-7 text-sm leading-7 text-slate-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {showCookieConsent && <CookieConsent />}
    </div>
  );
};

export default ProductHubLanding;
