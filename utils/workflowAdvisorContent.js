import {
  assessmentPaths,
  languages as WORKFLOW_ADVISOR_LANGUAGES
} from '../vendor/workflow-advisor-core/index.js';

export const WORKFLOW_ADVISOR_ROUTE_ID = 'workflow-advisor';
export const WORKFLOW_ADVISOR_DATE_MODIFIED = '2026-06-23';

export const WORKFLOW_ADVISOR_COPY = {
  es: {
    eyebrow: 'Diagnostico B2B gratuito',
    h1: 'Diagnostico de microbiologia, control y trazabilidad del agua',
    directAnswer: 'AquaVerify Workflow Advisor analiza tu sector, flujo de muestras, laboratorio, documentacion y problemas prioritarios. El resultado identifica brechas, niveles de madurez y posibles productos, modulos y recursos. Puedes completarlo sin identificarte y el diagnostico no sustituye una evaluacion tecnica, regulatoria ni del sistema de calidad.',
    cta: 'Analizar mi flujo',
    seoTitle: 'Diagnostico de flujo de microbiologia y trazabilidad del agua | AquaVerify',
    seoDescription: 'Diagnostico B2B gratuito para evaluar flujo de muestras, trazabilidad, evidencia, madurez y posibles productos, modulos y recursos AquaVerify.',
    blocks: [
      ['Que analiza', 'Sector, laboratorio, matrices, volumen, sistemas actuales, etapas digitalizadas, evidencias necesarias, problemas prioritarios y contexto analitico.'],
      ['Para quien es', 'Laboratorios, utilities, municipios, industria, instalaciones, agricultura, pharma, cosmetica, hosteleria, distribuidores y consultores tecnicos.'],
      ['Que resultado entrega', 'Resumen del flujo, brechas, niveles 1-5 de madurez, recomendaciones potenciales, condiciones, restricciones y pasos de mejora.'],
      ['Como funciona el motor de reglas', 'El diagnostico usa reglas deterministas versionadas. Ningun modelo generativo decide productos, compatibilidad, cumplimiento ni aceptacion regulatoria.'],
      ['Privacidad y opciones de guardado', 'Puedes usarlo solo en el navegador. Compartir respuestas seudonimizadas, solicitar contacto y aceptar marketing son decisiones separadas.'],
      ['Limitaciones', 'El diagnostico es orientativo y no reemplaza revision tecnica, validacion de metodos, sistema de calidad ni autoridad competente.']
    ],
    faq: [
      ['Necesito registrarme?', 'No. Puedes completar el diagnostico y ver el resultado sin nombre, email, empresa ni cuenta.'],
      ['Se guardan mis respuestas?', 'Solo si aceptas compartirlas para investigacion o solicitas contacto. En modo local_only el calculo permanece en el navegador.'],
      ['El resultado valida un metodo o cumplimiento?', 'No. Muestra madurez, brechas y posibles caminos de revision. No emite conformidad ni aceptacion regulatoria.'],
      ['Puedo pedir contacto sin aceptar marketing?', 'Si. El contacto y las comunicaciones comerciales son consentimientos separados.']
    ],
    privacyConsent: 'Permito que AquaVerify guarde estas respuestas sin datos de contacto y de forma seudonimizada para elaborar estadisticas agregadas y mejorar el diagnostico. Puedo continuar sin aceptar.',
    contactConsent: 'Solicito que AquaVerify utilice estos datos y el contexto del diagnostico para responder a mi solicitud.',
    marketingConsent: 'Quiero recibir comunicaciones comerciales sobre productos, recursos, eventos y novedades de AquaVerify.',
    limits: 'Este diagnostico es orientativo. No sustituye la evaluacion del laboratorio, la validacion o verificacion de metodos, el sistema de calidad, la autoridad competente ni la revision regulatoria por pais, matriz y uso previsto.'
  },
  en: {
    eyebrow: 'Free B2B assessment',
    h1: 'Water microbiology, control and traceability workflow assessment',
    directAnswer: 'AquaVerify Workflow Advisor reviews your sector, sample workflow, laboratory model, documentation and priority problems. It identifies gaps, maturity levels and potential products, modules and resources. You can complete it without identifying yourself, and the assessment does not replace technical, regulatory or quality-system review.',
    cta: 'Assess my workflow',
    seoTitle: 'Water microbiology and traceability workflow assessment | AquaVerify',
    seoDescription: 'Free B2B assessment for sample workflow, traceability, evidence, maturity and potential AquaVerify products, modules and resources.',
    blocks: [
      ['What it reviews', 'Sector, laboratory model, matrices, volume, current systems, digitised stages, evidence needs, priority problems and analytical context.'],
      ['Who it is for', 'Laboratories, utilities, municipalities, industries, facilities, agriculture, pharma, cosmetics, hospitality, distributors and technical consultants.'],
      ['What the result includes', 'Workflow summary, gaps, 1-5 maturity levels, potential recommendations, conditions, constraints and improvement steps.'],
      ['How the rules engine works', 'The assessment uses versioned deterministic rules. No generative model decides products, compatibility, compliance or regulatory acceptance.'],
      ['Privacy and storage', 'You can run it in the browser only. Sharing pseudonymised answers, requesting contact and accepting marketing are separate choices.'],
      ['Limits', 'The assessment is indicative and does not replace technical review, method validation, the quality system or competent authority review.']
    ],
    faq: [
      ['Do I need to register?', 'No. You can complete the assessment and view the result without name, email, company or account.'],
      ['Are my answers stored?', 'Only if you agree to research sharing or request contact. In local_only mode the calculation stays in the browser.'],
      ['Does the result validate a method or compliance?', 'No. It shows maturity, gaps and possible review paths. It does not issue conformity or regulatory acceptance.'],
      ['Can I request contact without marketing?', 'Yes. Contact and commercial communications are separate consents.']
    ],
    privacyConsent: 'I allow AquaVerify to store these answers without contact details and in pseudonymised form to produce aggregated statistics and improve the assessment. I can continue without agreeing.',
    contactConsent: 'I request AquaVerify to use these details and the assessment context to respond to my request.',
    marketingConsent: 'I want to receive commercial communications about AquaVerify products, resources, events and news.',
    limits: 'This assessment is indicative. It does not replace laboratory evaluation, method validation or verification, the quality system, the competent authority or regulatory review by country, matrix and intended use.'
  },
  fr: {
    eyebrow: 'Diagnostic B2B gratuit',
    h1: 'Diagnostic des flux de microbiologie, controle et tracabilite de l eau',
    directAnswer: 'AquaVerify Workflow Advisor analyse votre secteur, le flux des echantillons, le modele de laboratoire, la documentation et les problemes prioritaires. Le resultat identifie les ecarts, les niveaux de maturite et les produits, modules et ressources possibles. Vous pouvez le completer sans vous identifier et il ne remplace pas une revue technique, reglementaire ou du systeme qualite.',
    cta: 'Analyser mon flux',
    seoTitle: 'Diagnostic des flux de microbiologie et tracabilite de l eau | AquaVerify',
    seoDescription: 'Diagnostic B2B gratuit pour evaluer flux d echantillons, tracabilite, preuves, maturite et ressources AquaVerify potentielles.',
    blocks: [
      ['Ce qui est analyse', 'Secteur, laboratoire, matrices, volume, systemes, etapes numerisees, besoins de preuve, problemes prioritaires et contexte analytique.'],
      ['Pour qui', 'Laboratoires, utilities, municipalites, industries, installations, agriculture, pharma, cosmetique, hotellerie, distributeurs et consultants.'],
      ['Resultat obtenu', 'Resume du flux, ecarts, niveaux 1-5, recommandations potentielles, conditions, contraintes et etapes d amelioration.'],
      ['Moteur de regles', 'Le diagnostic utilise des regles deterministes versionnees. Aucun modele generatif ne decide produits, compatibilite ou acceptation reglementaire.'],
      ['Confidentialite', 'Vous pouvez l utiliser dans le navigateur. Recherche pseudonymisee, contact et marketing sont des choix separes.'],
      ['Limites', 'Le diagnostic est indicatif et ne remplace pas la revue technique, la validation des methodes, le systeme qualite ou l autorite competente.']
    ],
    faq: [
      ['Faut-il creer un compte?', 'Non. Vous pouvez voir le resultat sans nom, email, societe ni compte.'],
      ['Mes reponses sont-elles conservees?', 'Seulement avec accord recherche ou demande de contact. En mode local_only, le calcul reste dans le navigateur.'],
      ['Le resultat valide-t-il une methode?', 'Non. Il indique maturite, ecarts et pistes de revue, sans conformite ni acceptation reglementaire.'],
      ['Puis-je demander un contact sans marketing?', 'Oui. Contact et communications commerciales sont separes.']
    ],
    privacyConsent: 'J autorise AquaVerify a conserver ces reponses sans coordonnees et sous forme pseudonymisee afin de produire des statistiques agregees et d ameliorer le diagnostic. Je peux continuer sans accepter.',
    contactConsent: 'Je demande a AquaVerify d utiliser ces donnees et le contexte du diagnostic pour repondre a ma demande.',
    marketingConsent: 'Je souhaite recevoir des communications commerciales sur les produits, ressources, evenements et nouveautes AquaVerify.',
    limits: 'Ce diagnostic est indicatif. Il ne remplace pas l evaluation du laboratoire, la validation ou verification des methodes, le systeme qualite, l autorite competente ni la revue reglementaire par pays, matrice et usage prevu.'
  },
  it: {
    eyebrow: 'Valutazione B2B gratuita',
    h1: 'Valutazione dei flussi di microbiologia, controllo e tracciabilita dell acqua',
    directAnswer: 'AquaVerify Workflow Advisor analizza settore, flusso campioni, modello di laboratorio, documentazione e problemi prioritari. Il risultato identifica gap, livelli di maturita e possibili prodotti, moduli e risorse. Puoi completarlo senza identificarti e non sostituisce una revisione tecnica, regolatoria o del sistema qualita.',
    cta: 'Analizza il mio flusso',
    seoTitle: 'Valutazione workflow microbiologia e tracciabilita acqua | AquaVerify',
    seoDescription: 'Valutazione B2B gratuita per flusso campioni, tracciabilita, evidenze, maturita e possibili risorse AquaVerify.',
    blocks: [
      ['Cosa analizza', 'Settore, modello di laboratorio, matrici, volume, sistemi, fasi digitalizzate, esigenze di evidenza, problemi e contesto analitico.'],
      ['Per chi e', 'Laboratori, utilities, comuni, industrie, strutture, agricoltura, pharma, cosmetica, hospitality, distributori e consulenti.'],
      ['Risultato', 'Sintesi del flusso, gap, livelli 1-5, raccomandazioni potenziali, condizioni, vincoli e passi di miglioramento.'],
      ['Motore di regole', 'La valutazione usa regole deterministiche versionate. Nessun modello generativo decide prodotti, compatibilita o accettazione regolatoria.'],
      ['Privacy', 'Puoi usarla solo nel browser. Ricerca pseudonimizzata, contatto e marketing sono scelte separate.'],
      ['Limiti', 'La valutazione e orientativa e non sostituisce revisione tecnica, validazione metodi, sistema qualita o autorita competente.']
    ],
    faq: [
      ['Serve registrarsi?', 'No. Puoi vedere il risultato senza nome, email, azienda o account.'],
      ['Le risposte vengono salvate?', 'Solo con consenso ricerca o richiesta di contatto. In local_only il calcolo resta nel browser.'],
      ['Il risultato valida un metodo?', 'No. Mostra maturita, gap e percorsi di revisione, senza conformita o accettazione regolatoria.'],
      ['Posso chiedere contatto senza marketing?', 'Si. Contatto e comunicazioni commerciali sono separati.']
    ],
    privacyConsent: 'Autorizzo AquaVerify a conservare queste risposte senza dati di contatto e in forma pseudonimizzata per produrre statistiche aggregate e migliorare la valutazione. Posso continuare senza accettare.',
    contactConsent: 'Richiedo che AquaVerify utilizzi questi dati e il contesto della valutazione per rispondere alla mia richiesta.',
    marketingConsent: 'Desidero ricevere comunicazioni commerciali su prodotti, risorse, eventi e novita AquaVerify.',
    limits: 'Questa valutazione e orientativa. Non sostituisce la valutazione del laboratorio, la validazione o verifica dei metodi, il sistema qualita, l autorita competente o la revisione regolatoria per paese, matrice e uso previsto.'
  },
  ca: {
    eyebrow: 'Diagnostic B2B gratuit',
    h1: 'Diagnostic dels fluxos de microbiologia, control i tracabilitat de l aigua',
    directAnswer: 'AquaVerify Workflow Advisor analitza el sector, el flux de mostres, el model de laboratori, la documentacio i els problemes prioritaris. El resultat identifica bretxes, nivells de maduresa i possibles productes, moduls i recursos. Pots completar-lo sense identificar-te i no substitueix una revisio tecnica, reguladora ni del sistema de qualitat.',
    cta: 'Analitzar el meu flux',
    seoTitle: 'Diagnostic de flux microbiologia i tracabilitat de l aigua | AquaVerify',
    seoDescription: 'Diagnostic B2B gratuit per avaluar flux de mostres, tracabilitat, evidencia, maduresa i possibles recursos AquaVerify.',
    blocks: [
      ['Que analitza', 'Sector, laboratori, matrius, volum, sistemes, etapes digitalitzades, necessitats d evidencia, problemes i context analitic.'],
      ['Per a qui es', 'Laboratoris, utilities, municipis, industria, instal lacions, agricultura, pharma, cosmetica, hostaleria, distribuidors i consultors.'],
      ['Resultat', 'Resum del flux, bretxes, nivells 1-5, recomanacions potencials, condicions, restriccions i passos de millora.'],
      ['Motor de regles', 'El diagnostic usa regles deterministes versionades. Cap model generatiu decideix productes, compatibilitat o acceptacio reguladora.'],
      ['Privacitat', 'Pots usar-lo nomes al navegador. Recerca seudonimitzada, contacte i marketing son decisions separades.'],
      ['Limits', 'El diagnostic es orientatiu i no substitueix revisio tecnica, validacio de metodes, sistema de qualitat o autoritat competent.']
    ],
    faq: [
      ['Cal registrar-se?', 'No. Pots veure el resultat sense nom, email, empresa ni compte.'],
      ['Es desen les respostes?', 'Nomes amb consentiment de recerca o sol licitud de contacte. En local_only el calcul queda al navegador.'],
      ['El resultat valida un metode?', 'No. Mostra maduresa, bretxes i vies de revisio, sense conformitat ni acceptacio reguladora.'],
      ['Puc demanar contacte sense marketing?', 'Si. Contacte i comunicacions comercials son separats.']
    ],
    privacyConsent: 'Permeto que AquaVerify desi aquestes respostes sense dades de contacte i de manera seudonimitzada per elaborar estadistiques agregades i millorar el diagnostic. Puc continuar sense acceptar.',
    contactConsent: 'Sol licito que AquaVerify utilitzi aquestes dades i el context del diagnostic per respondre a la meva sol licitud.',
    marketingConsent: 'Vull rebre comunicacions comercials sobre productes, recursos, esdeveniments i novetats d AquaVerify.',
    limits: 'Aquest diagnostic es orientatiu. No substitueix l avaluacio del laboratori, la validacio o verificacio de metodes, el sistema de qualitat, l autoritat competent ni la revisio reguladora per pais, matriu i us previst.'
  }
};

export const WORKFLOW_ADVISOR_MARKETING_PAGES = [{
  id: WORKFLOW_ADVISOR_ROUTE_ID,
  category: 'workflow-advisor',
  schemaType: 'WebApplication',
  family: 'workflow-advisor',
  translations: Object.fromEntries(WORKFLOW_ADVISOR_LANGUAGES.map((lang) => {
    const copy = WORKFLOW_ADVISOR_COPY[lang] || WORKFLOW_ADVISOR_COPY.en;
    return [lang, {
      path: assessmentPaths[lang],
      title: copy.h1,
      description: copy.directAnswer,
      seoTitle: copy.seoTitle,
      seoDescription: copy.seoDescription,
      heroTitle: copy.h1,
      eyebrow: copy.eyebrow,
      directAnswer: copy.directAnswer,
      cta: copy.cta,
      blocks: copy.blocks,
      faqs: copy.faq.map(([question, answer]) => ({ question, answer })),
      privacyConsent: copy.privacyConsent,
      contactConsent: copy.contactConsent,
      marketingConsent: copy.marketingConsent,
      limits: copy.limits,
      dateModified: WORKFLOW_ADVISOR_DATE_MODIFIED,
      ogImage: '/images/social/aquaverify-workflow-advisor.png'
    }];
  }))
}];

export function getWorkflowAdvisorPath(lang = 'en') {
  return assessmentPaths[lang] || assessmentPaths.en;
}
