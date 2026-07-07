import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Download, ShieldCheck, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Language } from '../../utils/translations';
import {
  assessWorkflow,
  buildWorkflowAdvisorReport,
  buildWorkflowAdvisorReportV2,
  buyerProblemIdsBySector,
  createAssessmentInput,
  getSectorLabel,
  questionnaire,
  sectors,
  type WorkflowAssessmentResult,
  type WorkflowAdvisorReportV2
} from '../../vendor/workflow-advisor-core/index.js';
import { getIndustryBuyerProblems } from '../../utils/industryBuyerProblemsContent.js';

type Props = {
  content: any;
  pageLang: Language;
};

type Answers = Record<string, string | string[] | number | boolean | null>;

const API_BASE = (import.meta.env.VITE_PLATFORM_URL || 'https://app.aquaverify.com').replace(/\/+$/, '');

const UI = {
  en: {
    progress: 'Step',
    progressAria: 'Progreso del diagnóstico',
    context: 'Context',
    workflow: 'Workflow',
    analytical: 'Analytical context',
    result: 'Result',
    resultTitle: 'Assessment result',
    back: 'Back',
    next: 'Next',
    calculate: 'Calculate result',
    print: 'Print',
    download: 'Download summary',
    downloadPdf: 'Print / save PDF',
    shareResult: 'Share result to improve the assessment',
    requestTechnicalReview: 'Request technical review',
    shareTitle: 'Before downloading the report',
    shareText: 'You can download the report without sharing your answers. If you want to help improve the assessment, AquaVerify can store your answers without contact details and in pseudonymised form to produce aggregated statistics by sector, problem and workflow maturity.',
    shareSubmit: 'Share and download',
    downloadWithoutSharing: 'Download without sharing',
    shareAndDownload: 'Share and download',
    shareCheckbox: 'I allow AquaVerify to store these answers in pseudonymised form for aggregated statistics and assessment improvement.',
    shareError: 'The result could not be shared. You can still download without sharing.',
    cancel: 'Cancel',
    requiredError: 'Please complete this field before continuing.',
    countryCodeError: 'Use a two-letter country code.',
    contactTitle: 'Optional contact request',
    submitContact: 'Request contact',
    saved: 'Result shared. Keep this delete token if you may want to delete the record later:',
    localOnly: 'Local mode by default',
    localNote: 'You can complete the assessment without identifying yourself. Answers stay in your browser unless you decide to share the result or request contact.',
    storageDisabled: 'Storage is not active on the platform yet. You can still use and print the local result.',
    contactSent: 'Contact request received.',
    privacyLink: 'Privacy policy',
    noMarketingNeeded: 'Marketing is optional and not required for contact.',
    technicalReview: 'Needs technical review'
  },
  es: {
    progress: 'Paso',
    progressAria: 'Progreso del diagnóstico',
    context: 'Contexto',
    workflow: 'Flujo',
    analytical: 'Contexto analítico',
    result: 'Resultado',
    resultTitle: 'Resultado del diagnóstico',
    back: 'Volver',
    next: 'Siguiente',
    calculate: 'Calcular resultado',
    print: 'Imprimir',
    download: 'Descargar resumen',
    downloadPdf: 'Imprimir / guardar PDF',
    shareResult: 'Compartir resultado para mejorar el diagnóstico',
    requestTechnicalReview: 'Solicitar revisión técnica',
    shareTitle: 'Antes de descargar el informe',
    shareText: 'Puedes descargar el informe sin compartir tus respuestas. Si quieres ayudar a mejorar el diagnóstico, AquaVerify puede guardar tus respuestas sin datos de contacto y de forma seudonimizada para elaborar estadísticas agregadas por sector, problema y madurez del flujo.',
    shareSubmit: 'Compartir y descargar',
    downloadWithoutSharing: 'Descargar sin compartir',
    shareAndDownload: 'Compartir y descargar',
    shareCheckbox: 'Permito que AquaVerify guarde estas respuestas de forma seudonimizada para estadísticas agregadas y mejora del diagnóstico.',
    shareError: 'No se ha podido compartir el resultado. Puedes descargar sin compartir.',
    cancel: 'Cancelar',
    requiredError: 'Completa este campo antes de continuar.',
    countryCodeError: 'Usa un código de país de dos letras.',
    contactTitle: 'Solicitud de revisión técnica',
    submitContact: 'Solicitar revisión técnica',
    saved: 'Resultado compartido. Conserva este token de borrado si quieres eliminar el registro más adelante:',
    localOnly: 'Modo local por defecto',
    localNote: 'Puedes completar el diagnóstico sin identificarte. Las respuestas permanecen en el navegador salvo que decidas compartir el resultado o solicitar contacto.',
    storageDisabled: 'El almacenamiento de resultados no está activo aún en la plataforma. Puedes usar e imprimir el resultado local.',
    contactSent: 'Solicitud de contacto recibida.',
    privacyLink: 'Política de privacidad',
    noMarketingNeeded: 'El marketing es opcional y no es necesario para solicitar contacto.',
    technicalReview: 'Necesita revisión técnica'
  },
  fr: {
    progress: 'Étape',
    progressAria: 'Progreso del diagnóstico',
    context: 'Contexte',
    workflow: 'Flux',
    analytical: 'Contexte analytique',
    result: 'Résultat',
    resultTitle: 'Résultat du diagnostic',
    back: 'Retour',
    next: 'Suivant',
    calculate: 'Calculer le résultat',
    print: 'Imprimer',
    download: 'Télécharger le résumé',
    downloadPdf: 'Imprimer / enregistrer PDF',
    shareResult: 'Partager le résultat pour améliorer le diagnostic',
    requestTechnicalReview: 'Demander une revue technique',
    shareTitle: 'Avant de télécharger le rapport',
    shareText: 'Vous pouvez télécharger le rapport sans partager vos réponses. Si vous souhaitez contribuer à améliorer le diagnostic, AquaVerify peut conserver vos réponses sans coordonnées et sous forme pseudonymisée afin de produire des statistiques agrégées par secteur, problème et maturité du flux.',
    shareSubmit: 'Partager et télécharger',
    downloadWithoutSharing: 'Télécharger sans partager',
    shareAndDownload: 'Partager et télécharger',
    shareCheckbox: 'J’autorise AquaVerify à conserver ces réponses sous forme pseudonymisée pour des statistiques agrégées et l’amélioration du diagnostic.',
    shareError: 'Le résultat n’a pas pu être partagé. Vous pouvez quand même télécharger sans partager.',
    cancel: 'Annuler',
    requiredError: 'Veuillez compléter ce champ avant de continuer.',
    countryCodeError: 'Utilisez un code pays à deux lettres.',
    contactTitle: 'Demande de contact optionnelle',
    submitContact: 'Demander une revue technique',
    saved: 'Résultat partagé. Gardez ce jeton de suppression si vous souhaitez supprimer l enregistrement:',
    localOnly: 'Mode local par défaut',
    localNote: 'Vous pouvez compléter le diagnostic sans vous identifier. Les réponses restent dans votre navigateur sauf si vous décidez de partager le résultat ou de demander un contact.',
    storageDisabled: 'Le stockage n est pas encore actif sur la plateforme. Vous pouvez utiliser et imprimer le resultat local.',
    contactSent: 'Demande de contact recue.',
    privacyLink: 'Politique de confidentialite',
    noMarketingNeeded: 'Le marketing est optionnel et non requis pour le contact.',
    technicalReview: 'Revue technique necessaire'
  },
  it: {
    progress: 'Passo',
    progressAria: 'Progreso del diagnóstico',
    context: 'Contesto',
    workflow: 'Flusso',
    analytical: 'Contesto analitico',
    result: 'Risultato',
    resultTitle: 'Risultato della valutazione',
    back: 'Indietro',
    next: 'Avanti',
    calculate: 'Calcola il risultato',
    print: 'Stampa',
    download: 'Scarica sintesi',
    downloadPdf: 'Stampa / salva PDF',
    shareResult: 'Condividi il risultato per migliorare la valutazione',
    requestTechnicalReview: 'Richiedi revisione tecnica',
    shareTitle: 'Prima di scaricare il report',
    shareText: 'Puoi scaricare il report senza condividere le risposte. Se vuoi aiutare a migliorare la valutazione, AquaVerify può salvare le risposte senza dati di contatto e in forma pseudonimizzata per elaborare statistiche aggregate per settore, problema e maturità del flusso.',
    shareSubmit: 'Condividi e scarica',
    downloadWithoutSharing: 'Scarica senza condividere',
    shareAndDownload: 'Condividi e scarica',
    shareCheckbox: 'Consento ad AquaVerify di salvare queste risposte in forma pseudonimizzata per statistiche aggregate e miglioramento della valutazione.',
    shareError: 'Non è stato possibile condividere il risultato. Puoi comunque scaricare senza condividere.',
    cancel: 'Annulla',
    requiredError: 'Completa questo campo prima di continuare.',
    countryCodeError: 'Usa un codice paese di due lettere.',
    contactTitle: 'Richiesta opzionale di contatto',
    submitContact: 'Richiedi revisione tecnica',
    saved: 'Risultato condiviso. Conserva questo token di cancellazione se vuoi eliminare il record:',
    localOnly: 'Modalita locale predefinita',
    localNote: 'Puoi completare la valutazione senza identificarti. Le risposte restano nel browser salvo che tu decida di condividere il risultato o richiedere un contatto.',
    storageDisabled: 'Lo storage non e ancora attivo sulla piattaforma. Puoi usare e stampare il risultato locale.',
    contactSent: 'Richiesta di contatto ricevuta.',
    privacyLink: 'Informativa privacy',
    noMarketingNeeded: 'Il marketing e opzionale e non serve per il contatto.',
    technicalReview: 'Revisione tecnica necessaria'
  },
  ca: {
    progress: 'Pas',
    progressAria: 'Progreso del diagnóstico',
    context: 'Context',
    workflow: 'Flux',
    analytical: 'Context analític',
    result: 'Resultat',
    resultTitle: 'Resultat del diagnòstic',
    back: 'Tornar',
    next: 'Següent',
    calculate: 'Calcular resultat',
    print: 'Imprimir',
    download: 'Descarregar resum',
    downloadPdf: 'Imprimir / desar PDF',
    shareResult: 'Compartir el resultat per millorar el diagnòstic',
    requestTechnicalReview: 'Sol·licitar revisió tècnica',
    shareTitle: 'Abans de descarregar l’informe',
    shareText: 'Pots descarregar l’informe sense compartir les respostes. Si vols ajudar a millorar el diagnòstic, AquaVerify pot desar les respostes sense dades de contacte i de manera pseudonimitzada per elaborar estadístiques agregades per sector, problema i maduresa del flux.',
    shareSubmit: 'Compartir i descarregar',
    downloadWithoutSharing: 'Descarregar sense compartir',
    shareAndDownload: 'Compartir i descarregar',
    shareCheckbox: 'Permeto que AquaVerify desi aquestes respostes de manera pseudonimitzada per a estadístiques agregades i millora del diagnòstic.',
    shareError: 'No s’ha pogut compartir el resultat. Pots descarregar sense compartir.',
    cancel: 'Cancel·lar',
    requiredError: 'Completa aquest camp abans de continuar.',
    countryCodeError: 'Fes servir un codi de país de dues lletres.',
    contactTitle: 'Sol·licitud de revisió tècnica',
    submitContact: 'Sol·licitar revisió tècnica',
    saved: 'Resultat compartit. Conserva aquest token de supressió si vols eliminar el registre:',
    localOnly: 'Mode local per defecte',
    localNote: 'Pots completar el diagnòstic sense identificar-te. Les respostes romanen al navegador tret que decideixis compartir el resultat o sol·licitar contacte.',
    storageDisabled: 'L emmagatzematge encara no esta actiu a la plataforma. Pots usar i imprimir el resultat local.',
    contactSent: 'Sol licitud de contacte rebuda.',
    privacyLink: 'Politica de privacitat',
    noMarketingNeeded: 'El marketing es opcional i no cal per al contacte.',
    technicalReview: 'Revisio tecnica necessaria'
  }
} as const;

const CONTACT_FIELD_LABELS: Record<string, Record<Language, string>> = {
  name: { en: 'Name', es: 'Nombre', fr: 'Nom', it: 'Nome', ca: 'Nom' },
  email: { en: 'Professional email', es: 'Email profesional', fr: 'Email professionnel', it: 'Email professionale', ca: 'Email professional' },
  company: { en: 'Company', es: 'Empresa', fr: 'Entreprise', it: 'Azienda', ca: 'Empresa' },
  countryCode: { en: 'Country', es: 'Pais', fr: 'Pays', it: 'Paese', ca: 'Pais' },
  buyerRole: { en: 'Role', es: 'Cargo o funcion', fr: 'Role', it: 'Ruolo', ca: 'Rol' },
  phone: { en: 'Phone', es: 'Telefono', fr: 'Telephone', it: 'Telefono', ca: 'Telefon' },
  comment: { en: 'Comment', es: 'Comentario', fr: 'Commentaire', it: 'Commento', ca: 'Comentari' },
  requestType: { en: 'Request type', es: 'Tipo de solicitud', fr: 'Type de demande', it: 'Tipo richiesta', ca: 'Tipus de sol licitud' }
};

const REQUEST_TYPE_LABELS: Record<string, Record<Language, string>> = {
  technical_review: { en: 'Technical review', es: 'Revision tecnica', fr: 'Revue technique', it: 'Revisione tecnica', ca: 'Revisio tecnica' },
  demo: { en: 'Demo', es: 'Demo', fr: 'Demo', it: 'Demo', ca: 'Demo' },
  quote: { en: 'Quote', es: 'Oferta', fr: 'Devis', it: 'Preventivo', ca: 'Oferta' },
  distributor: { en: 'Distributor', es: 'Distribuidor', fr: 'Distributeur', it: 'Distributore', ca: 'Distribuidor' },
  oem: { en: 'OEM', es: 'OEM', fr: 'OEM', it: 'OEM', ca: 'OEM' },
  integration: { en: 'Integration', es: 'Integracion', fr: 'Integration', it: 'Integrazione', ca: 'Integracio' },
  other: { en: 'Other', es: 'Otro', fr: 'Autre', it: 'Altro', ca: 'Altres' }
};

const OPTION_LABELS: Record<string, Record<string, string>> = {
  public_laboratory: { en: 'Public laboratory', es: 'Laboratorio publico', fr: 'Laboratoire public', it: 'Laboratorio pubblico', ca: 'Laboratori public' },
  private_laboratory: { en: 'Private laboratory', es: 'Laboratorio privado', fr: 'Laboratoire prive', it: 'Laboratorio privato', ca: 'Laboratori privat' },
  municipal_operator: { en: 'Municipal operator', es: 'Operador municipal', fr: 'Operateur municipal', it: 'Operatore municipale', ca: 'Operador municipal' },
  utility: { en: 'Utility', es: 'Utility', fr: 'Utility', it: 'Utility', ca: 'Utility' },
  manufacturer: { en: 'Manufacturer', es: 'Fabricante', fr: 'Fabricant', it: 'Produttore', ca: 'Fabricant' },
  facility_operator: { en: 'Facility operator', es: 'Operador de instalaciones', fr: 'Exploitant de site', it: 'Operatore struttura', ca: 'Operador instal lacio' },
  farm_or_grower: { en: 'Farm or grower', es: 'Explotacion agricola', fr: 'Exploitation agricole', it: 'Azienda agricola', ca: 'Explotacio agricola' },
  cooperative: { en: 'Cooperative', es: 'Cooperativa', fr: 'Cooperative', it: 'Cooperativa', ca: 'Cooperativa' },
  hospitality_operator: { en: 'Hospitality operator', es: 'Operador turistico', fr: 'Operateur hotelier', it: 'Operatore hospitality', ca: 'Operador turistic' },
  distributor: { en: 'Distributor', es: 'Distribuidor', fr: 'Distributeur', it: 'Distributore', ca: 'Distribuidor' },
  consultant: { en: 'Consultant', es: 'Consultor', fr: 'Consultant', it: 'Consulente', ca: 'Consultor' },
  engineering_company: { en: 'Engineering company', es: 'Ingenieria', fr: 'Ingenierie', it: 'Societa di ingegneria', ca: 'Enginyeria' },
  executive: { en: 'Executive', es: 'Direccion', fr: 'Direction', it: 'Direzione', ca: 'Direccio' },
  laboratory: { en: 'Laboratory', es: 'Laboratorio', fr: 'Laboratoire', it: 'Laboratorio', ca: 'Laboratori' },
  quality: { en: 'Quality', es: 'Calidad', fr: 'Qualite', it: 'Qualita', ca: 'Qualitat' },
  operations: { en: 'Operations', es: 'Operaciones', fr: 'Operations', it: 'Operazioni', ca: 'Operacions' },
  engineering_maintenance: { en: 'Engineering and maintenance', es: 'Ingenieria y mantenimiento', fr: 'Ingenierie et maintenance', it: 'Ingegneria e manutenzione', ca: 'Enginyeria i manteniment' },
  ehs: { en: 'EHS', es: 'EHS', fr: 'EHS', it: 'EHS', ca: 'EHS' },
  procurement: { en: 'Procurement', es: 'Compras', fr: 'Achats', it: 'Acquisti', ca: 'Compres' },
  digital_it: { en: 'Digital / IT', es: 'Digital / IT', fr: 'Digital / IT', it: 'Digital / IT', ca: 'Digital / IT' },
  regulatory: { en: 'Regulatory', es: 'Regulatorio', fr: 'Reglementaire', it: 'Regolatorio', ca: 'Regulador' },
  sales_distribution: { en: 'Sales / distribution', es: 'Ventas / distribucion', fr: 'Ventes / distribution', it: 'Vendite / distribuzione', ca: 'Vendes / distribucio' },
  one: { en: 'One', es: 'Una', fr: 'Un', it: 'Uno', ca: 'Un' },
  two_to_five: { en: '2 to 5', es: '2 a 5', fr: '2 a 5', it: '2 a 5', ca: '2 a 5' },
  six_to_twenty: { en: '6 to 20', es: '6 a 20', fr: '6 a 20', it: '6 a 20', ca: '6 a 20' },
  more_than_twenty: { en: 'More than 20', es: 'Mas de 20', fr: 'Plus de 20', it: 'Piu di 20', ca: 'Mes de 20' },
  internal: { en: 'Internal', es: 'Interno', fr: 'Interne', it: 'Interno', ca: 'Intern' },
  external: { en: 'External', es: 'Externo', fr: 'Externe', it: 'Esterno', ca: 'Extern' },
  mixed: { en: 'Mixed', es: 'Mixto', fr: 'Mixte', it: 'Misto', ca: 'Mixt' },
  not_applicable: { en: 'Not applicable', es: 'No aplica', fr: 'Non applicable', it: 'Non applicabile', ca: 'No aplica' },
  fewer_than_10_month: { en: 'Fewer than 10/month', es: 'Menos de 10/mes', fr: 'Moins de 10/mois', it: 'Meno di 10/mese', ca: 'Menys de 10/mes' },
  '10_to_49_month': { en: '10 to 49/month', es: '10 a 49/mes', fr: '10 a 49/mois', it: '10 a 49/mese', ca: '10 a 49/mes' },
  '50_to_199_month': { en: '50 to 199/month', es: '50 a 199/mes', fr: '50 a 199/mois', it: '50 a 199/mese', ca: '50 a 199/mes' },
  '200_to_999_month': { en: '200 to 999/month', es: '200 a 999/mes', fr: '200 a 999/mois', it: '200 a 999/mese', ca: '200 a 999/mes' },
  '1000_plus_month': { en: '1000+/month', es: '1000+/mes', fr: '1000+/mois', it: '1000+/mese', ca: '1000+/mes' },
  variable: { en: 'Variable', es: 'Variable', fr: 'Variable', it: 'Variabile', ca: 'Variable' },
  unknown: { en: 'Unknown', es: 'No definido', fr: 'Inconnu', it: 'Non definito', ca: 'No definit' },
  paper: { en: 'Paper', es: 'Papel', fr: 'Papier', it: 'Carta', ca: 'Paper' },
  spreadsheets: { en: 'Spreadsheets', es: 'Hojas de calculo', fr: 'Tableurs', it: 'Fogli di calcolo', ca: 'Fulls de calcul' },
  shared_forms: { en: 'Shared forms', es: 'Formularios compartidos', fr: 'Formulaires partages', it: 'Moduli condivisi', ca: 'Formularis compartits' },
  email: { en: 'Email', es: 'Correo', fr: 'Email', it: 'Email', ca: 'Correu' },
  external_lab_portal: { en: 'External lab portal', es: 'Portal de laboratorio externo', fr: 'Portail labo externe', it: 'Portale laboratorio esterno', ca: 'Portal laboratori extern' },
  lims: { en: 'LIMS', es: 'LIMS', fr: 'LIMS', it: 'LIMS', ca: 'LIMS' },
  qms: { en: 'QMS', es: 'QMS', fr: 'QMS', it: 'QMS', ca: 'QMS' },
  erp: { en: 'ERP', es: 'ERP', fr: 'ERP', it: 'ERP', ca: 'ERP' },
  custom_software: { en: 'Custom software', es: 'Software propio', fr: 'Logiciel interne', it: 'Software su misura', ca: 'Software propi' },
  aquaverify_cloud: { en: 'AquaVerify Cloud', es: 'AquaVerify Cloud', fr: 'AquaVerify Cloud', it: 'AquaVerify Cloud', ca: 'AquaVerify Cloud' },
  no_defined_system: { en: 'No defined system', es: 'Sin sistema definido', fr: 'Pas de systeme defini', it: 'Nessun sistema definito', ca: 'Sense sistema definit' },
  control_plan: { en: 'Control plan', es: 'Plan de control', fr: 'Plan de controle', it: 'Piano di controllo', ca: 'Pla de control' },
  sampling: { en: 'Sampling', es: 'Muestreo', fr: 'Echantillonnage', it: 'Campionamento', ca: 'Mostreig' },
  chain_of_custody: { en: 'Chain of custody', es: 'Cadena de custodia', fr: 'Chaine de tracabilite', it: 'Catena di custodia', ca: 'Cadena de custodia' },
  reception: { en: 'Reception', es: 'Recepcion', fr: 'Reception', it: 'Ricezione', ca: 'Recepcio' },
  analysis: { en: 'Analysis', es: 'Analisis', fr: 'Analyse', it: 'Analisi', ca: 'Analisi' },
  reading: { en: 'Reading', es: 'Lectura', fr: 'Lecture', it: 'Lettura', ca: 'Lectura' },
  technical_review: { en: 'Technical review', es: 'Revision tecnica', fr: 'Revue technique', it: 'Revisione tecnica', ca: 'Revisio tecnica' },
  coa_reporting: { en: 'CoA reporting', es: 'Informes CoA', fr: 'Rapports CoA', it: 'Report CoA', ca: 'Informes CoA' },
  customer_delivery: { en: 'Customer delivery', es: 'Entrega a cliente', fr: 'Livraison client', it: 'Consegna cliente', ca: 'Entrega client' },
  deviations: { en: 'Deviations', es: 'Desviaciones', fr: 'Deviations', it: 'Deviazioni', ca: 'Desviacions' },
  inventory: { en: 'Inventory', es: 'Inventario', fr: 'Inventaire', it: 'Inventario', ca: 'Inventari' },
  trend_analysis: { en: 'Trend analysis', es: 'Analisis de tendencias', fr: 'Analyse tendances', it: 'Analisi trend', ca: 'Analisi tendencies' },
  sampling_context: { en: 'Sampling context', es: 'Contexto de muestreo', fr: 'Contexte echantillonnage', it: 'Contesto campionamento', ca: 'Context mostreig' },
  kit_batch_traceability: { en: 'Kit batch traceability', es: 'Trazabilidad de lote de kit', fr: 'Tracabilite lot kit', it: 'Tracciabilita lotto kit', ca: 'Tracabilitat lot kit' },
  method_traceability: { en: 'Method traceability', es: 'Trazabilidad de metodo', fr: 'Tracabilite methode', it: 'Tracciabilita metodo', ca: 'Tracabilitat metode' },
  coa: { en: 'CoA', es: 'CoA', fr: 'CoA', it: 'CoA', ca: 'CoA' },
  audit_trail: { en: 'Audit trail', es: 'Audit trail', fr: 'Audit trail', it: 'Audit trail', ca: 'Audit trail' },
  electronic_approval: { en: 'Electronic approval', es: 'Aprobacion electronica', fr: 'Approbation electronique', it: 'Approvazione elettronica', ca: 'Aprovacio electronica' },
  deviations_and_capa: { en: 'Deviations and CAPA', es: 'Desviaciones y CAPA', fr: 'Deviations et CAPA', it: 'Deviazioni e CAPA', ca: 'Desviacions i CAPA' },
  customer_portal: { en: 'Customer portal', es: 'Portal cliente', fr: 'Portail client', it: 'Portale cliente', ca: 'Portal client' },
  dashboards: { en: 'Dashboards', es: 'Dashboards', fr: 'Dashboards', it: 'Dashboard', ca: 'Dashboards' },
  multi_site_history: { en: 'Multi-site history', es: 'Historico multisitio', fr: 'Historique multi-site', it: 'Storico multisito', ca: 'Historic multisite' },
  inventory_traceability: { en: 'Inventory traceability', es: 'Trazabilidad de inventario', fr: 'Tracabilite inventaire', it: 'Tracciabilita inventario', ca: 'Tracabilitat inventari' },
  urgent_incident: { en: 'Urgent incident', es: 'Incidencia urgente', fr: 'Incident urgent', it: 'Incidente urgente', ca: 'Incidencia urgent' },
  within_three_months: { en: 'Within 3 months', es: 'En 3 meses', fr: 'Sous 3 mois', it: 'Entro 3 mesi', ca: 'En 3 mesos' },
  three_to_six_months: { en: '3 to 6 months', es: '3 a 6 meses', fr: '3 a 6 mois', it: '3 a 6 mesi', ca: '3 a 6 mesos' },
  six_to_twelve_months: { en: '6 to 12 months', es: '6 a 12 meses', fr: '6 a 12 mois', it: '6 a 12 mesi', ca: '6 a 12 mesos' },
  exploring: { en: 'Exploring', es: 'Explorando', fr: 'Exploration', it: 'Esplorazione', ca: 'Explorant' },
  product_only: { en: 'Product only', es: 'Solo producto', fr: 'Produit seul', it: 'Solo prodotto', ca: 'Nomes producte' },
  software_only: { en: 'Software only', es: 'Solo software', fr: 'Logiciel seul', it: 'Solo software', ca: 'Nomes software' },
  product_and_software: { en: 'Product and software', es: 'Producto y software', fr: 'Produit et logiciel', it: 'Prodotto e software', ca: 'Producte i software' },
  authorised_distributor: { en: 'Authorised distributor', es: 'Distribuidor autorizado', fr: 'Distributeur autorise', it: 'Distributore autorizzato', ca: 'Distribuidor autoritzat' },
  oem_private_label: { en: 'OEM / private label', es: 'OEM / marca blanca', fr: 'OEM / marque blanche', it: 'OEM / private label', ca: 'OEM / marca blanca' },
  not_sure: { en: 'Not sure', es: 'No lo se', fr: 'Pas sur', it: 'Non sicuro', ca: 'No ho se' },
  somatic_coliphages: { en: 'Somatic coliphages', es: 'Colifagos somaticos', fr: 'Coliphages somatiques', it: 'Colifagi somatici', ca: 'Colifags somatics' },
  f_specific_coliphages: { en: 'F-specific coliphages', es: 'Colifagos F-especificos', fr: 'Coliphages F-specifiques', it: 'Colifagi F-specifici', ca: 'Colifags F-especifics' },
  e_coli: { en: 'E. coli', es: 'E. coli', fr: 'E. coli', it: 'E. coli', ca: 'E. coli' },
  total_coliforms: { en: 'Total coliforms', es: 'Coliformes totales', fr: 'Coliformes totaux', it: 'Coliformi totali', ca: 'Coliformes totals' },
  intestinal_enterococci: { en: 'Intestinal enterococci', es: 'Enterococos intestinales', fr: 'Enterocoques intestinaux', it: 'Enterococchi intestinali', ca: 'Enterococs intestinals' },
  legionella: { en: 'Legionella', es: 'Legionella', fr: 'Legionella', it: 'Legionella', ca: 'Legionella' },
  general_microbiology: { en: 'General microbiology', es: 'Microbiologia general', fr: 'Microbiologie generale', it: 'Microbiologia generale', ca: 'Microbiologia general' },
  chemical_water_parameters: { en: 'Chemical water parameters', es: 'Parametros quimicos', fr: 'Parametres chimiques', it: 'Parametri chimici', ca: 'Parametres quimics' },
  presence_absence: { en: 'Presence/absence', es: 'Presencia/ausencia', fr: 'Presence/absence', it: 'Presenza/assenza', ca: 'Presencia/absencia' },
  enumeration: { en: 'Enumeration', es: 'Enumeracion', fr: 'Denombrement', it: 'Enumerazione', ca: 'Enumeracio' },
  both: { en: 'Both', es: 'Ambos', fr: 'Les deux', it: 'Entrambi', ca: 'Ambdos' },
  operational_screening: { en: 'Operational screening', es: 'Screening operativo', fr: 'Screening operationnel', it: 'Screening operativo', ca: 'Screening operatiu' },
  routine_internal_control: { en: 'Routine internal control', es: 'Control interno rutinario', fr: 'Controle interne routine', it: 'Controllo interno routine', ca: 'Control intern rutinari' },
  treatment_verification: { en: 'Treatment verification', es: 'Verificacion de tratamiento', fr: 'Verification traitement', it: 'Verifica trattamento', ca: 'Verificacio tractament' },
  incident_investigation: { en: 'Incident investigation', es: 'Investigacion de incidencia', fr: 'Investigation incident', it: 'Indagine incidente', ca: 'Investigacio incidencia' },
  research_validation: { en: 'Research validation', es: 'Validacion de investigacion', fr: 'Validation recherche', it: 'Validazione ricerca', ca: 'Validacio recerca' },
  accredited_testing: { en: 'Accredited testing', es: 'Ensayo acreditado', fr: 'Essai accredite', it: 'Test accreditato', ca: 'Assaig acreditat' },
  regulatory_reporting: { en: 'Regulatory reporting', es: 'Reporte regulatorio', fr: 'Rapport reglementaire', it: 'Reporting regolatorio', ca: 'Informe regulador' },
  customer_audit_evidence: { en: 'Customer audit evidence', es: 'Evidencia para auditoria de cliente', fr: 'Preuve audit client', it: 'Evidenza audit cliente', ca: 'Evidencia auditoria client' },
  internal_sop: { en: 'Internal SOP', es: 'SOP interno', fr: 'SOP interne', it: 'SOP interno', ca: 'SOP intern' },
  iso_10705_2: { en: 'ISO 10705-2', es: 'ISO 10705-2', fr: 'ISO 10705-2', it: 'ISO 10705-2', ca: 'ISO 10705-2' },
  epa_1601: { en: 'EPA 1601', es: 'EPA 1601', fr: 'EPA 1601', it: 'EPA 1601', ca: 'EPA 1601' },
  epa_1602: { en: 'EPA 1602', es: 'EPA 1602', fr: 'EPA 1602', it: 'EPA 1602', ca: 'EPA 1602' },
  iso_9308: { en: 'ISO 9308', es: 'ISO 9308', fr: 'ISO 9308', it: 'ISO 9308', ca: 'ISO 9308' },
  iso_11731: { en: 'ISO 11731', es: 'ISO 11731', fr: 'ISO 11731', it: 'ISO 11731', ca: 'ISO 11731' },
  one_ml: { en: '1 mL', es: '1 mL', fr: '1 mL', it: '1 mL', ca: '1 mL' },
  one_hundred_ml: { en: '100 mL', es: '100 mL', fr: '100 mL', it: '100 mL', ca: '100 mL' },
  other_volume: { en: 'Other volume', es: 'Otro volumen', fr: 'Autre volume', it: 'Altro volume', ca: 'Altre volum' },
  varies: { en: 'Varies', es: 'Varia', fr: 'Variable', it: 'Varia', ca: 'Varia' },
  reduce_manual_transcription: { en: 'Reduce manual transcription', es: 'Reducir transcripcion manual', fr: 'Reduire la transcription manuelle', it: 'Ridurre trascrizione manuale', ca: 'Reduir transcripcio manual' },
  improve_audit_evidence: { en: 'Improve audit evidence', es: 'Mejorar evidencia de auditoria', fr: 'Ameliorer les preuves audit', it: 'Migliorare evidenze audit', ca: 'Millorar evidencia auditoria' },
  coordinate_external_labs: { en: 'Coordinate external labs', es: 'Coordinar laboratorios externos', fr: 'Coordonner laboratoires externes', it: 'Coordinare laboratori esterni', ca: 'Coordinar laboratoris externs' },
  compare_multiple_sites: { en: 'Compare multiple sites', es: 'Comparar multiples sedes', fr: 'Comparer plusieurs sites', it: 'Confrontare piu sedi', ca: 'Comparar multiples seus' },
  add_new_test: { en: 'Add a new test', es: 'Incorporar nuevo ensayo', fr: 'Ajouter un nouvel essai', it: 'Aggiungere nuovo test', ca: 'Afegir nou assaig' },
  improve_customer_visibility: { en: 'Improve customer visibility', es: 'Mejorar visibilidad para clientes', fr: 'Ameliorer visibilite client', it: 'Migliorare visibilita cliente', ca: 'Millorar visibilitat client' },
  drinking_water: { en: 'Drinking water', es: 'Agua potable', fr: 'Eau potable', it: 'Acqua potabile', ca: 'Aigua potable' },
  surface_water: { en: 'Surface water', es: 'Agua superficial', fr: 'Eau de surface', it: 'Acqua superficiale', ca: 'Aigua superficial' },
  wastewater: { en: 'Wastewater', es: 'Agua residual', fr: 'Eaux usees', it: 'Acque reflue', ca: 'Aigues residuals' },
  reclaimed_water: { en: 'Reclaimed water', es: 'Agua regenerada', fr: 'Eau reutilisee', it: 'Acqua rigenerata', ca: 'Aigua regenerada' },
  process_water: { en: 'Process water', es: 'Agua de proceso', fr: 'Eau de procede', it: 'Acqua di processo', ca: 'Aigua de proces' },
  pool_spa_water: { en: 'Pool or spa water', es: 'Piscina o spa', fr: 'Piscine ou spa', it: 'Piscina o spa', ca: 'Piscina o spa' },
  irrigation_water: { en: 'Irrigation water', es: 'Agua de riego', fr: 'Eau irrigation', it: 'Acqua irrigazione', ca: 'Aigua de reg' },
  purified_water: { en: 'Purified water', es: 'Agua purificada', fr: 'Eau purifiee', it: 'Acqua purificata', ca: 'Aigua purificada' },
  wfi: { en: 'WFI', es: 'WFI', fr: 'WFI', it: 'WFI', ca: 'WFI' },
  new_service: { en: 'New service', es: 'Nuevo servicio', fr: 'Nouveau service', it: 'Nuovo servizio', ca: 'Nou servei' },
  accredited_scope_review: { en: 'Accredited scope review', es: 'Revision de alcance acreditado', fr: 'Revue portee accreditee', it: 'Revisione ambito accreditato', ca: 'Revisio abast acreditat' },
  tat_pressure: { en: 'Turnaround pressure', es: 'Presion de TAT', fr: 'Pression delai', it: 'Pressione TAT', ca: 'Pressio TAT' },
  multiple_providers: { en: 'Multiple providers', es: 'Varios proveedores', fr: 'Plusieurs fournisseurs', it: 'Piu fornitori', ca: 'Diversos proveidors' },
  reading_review: { en: 'Reading and review', es: 'Lectura y revision', fr: 'Lecture et revue', it: 'Lettura e revisione', ca: 'Lectura i revisio' },
  plate_workflow: { en: 'Plate workflow', es: 'Flujo de placa', fr: 'Flux plaque', it: 'Flusso piastra', ca: 'Flux placa' },
  batch_release: { en: 'Batch release', es: 'Liberacion de lote', fr: 'Liberation lot', it: 'Rilascio lotto', ca: 'Alliberament lot' },
  line_release: { en: 'Line release', es: 'Liberacion de linea', fr: 'Liberation ligne', it: 'Rilascio linea', ca: 'Alliberament linia' },
  sanitation_release: { en: 'Sanitation release', es: 'Liberacion de saneamiento', fr: 'Liberation assainissement', it: 'Rilascio sanificazione', ca: 'Alliberament sanejament' },
  customer_audit: { en: 'Customer audit', es: 'Auditoria de cliente', fr: 'Audit client', it: 'Audit cliente', ca: 'Auditoria client' },
  internal_hold: { en: 'Internal hold', es: 'Retencion interna', fr: 'Blocage interne', it: 'Blocco interno', ca: 'Retencio interna' },
  domestic_hot_water: { en: 'Domestic hot water', es: 'ACS', fr: 'Eau chaude sanitaire', it: 'Acqua calda sanitaria', ca: 'ACS' },
  domestic_cold_water: { en: 'Domestic cold water', es: 'AFCH', fr: 'Eau froide sanitaire', it: 'Acqua fredda sanitaria', ca: 'AFCH' },
  storage_tanks: { en: 'Storage tanks', es: 'Depositos', fr: 'Reservoirs', it: 'Serbatoi', ca: 'Diposits' },
  showers: { en: 'Showers', es: 'Duchas', fr: 'Douches', it: 'Docce', ca: 'Dutxes' },
  cooling_towers: { en: 'Cooling towers', es: 'Torres de refrigeracion', fr: 'Tours aerorefrigerantes', it: 'Torri evaporative', ca: 'Torres de refrigeracio' },
  spas: { en: 'Spas', es: 'Spas', fr: 'Spas', it: 'Spa', ca: 'Spas' },
  fountains: { en: 'Fountains', es: 'Fuentes', fr: 'Fontaines', it: 'Fontane', ca: 'Fonts' },
  humidifiers: { en: 'Humidifiers', es: 'Humidificadores', fr: 'Humidificateurs', it: 'Umidificatori', ca: 'Humidificadors' },
  pools: { en: 'Pools', es: 'Piscinas', fr: 'Piscines', it: 'Piscine', ca: 'Piscines' },
  terminal_points: { en: 'Terminal points', es: 'Puntos terminales', fr: 'Points terminaux', it: 'Punti terminali', ca: 'Punts terminals' },
  loop: { en: 'Loop', es: 'Loop', fr: 'Boucle', it: 'Loop', ca: 'Loop' },
  point_of_use: { en: 'Point of use', es: 'Punto de uso', fr: 'Point d usage', it: 'Punto d uso', ca: 'Punt d us' },
  ingredient: { en: 'Ingredient', es: 'Ingrediente', fr: 'Ingredient', it: 'Ingrediente', ca: 'Ingredient' },
  cip_sip: { en: 'CIP/SIP', es: 'CIP/SIP', fr: 'CIP/SIP', it: 'CIP/SIP', ca: 'CIP/SIP' },
  final_rinse: { en: 'Final rinse', es: 'Enjuague final', fr: 'Rincage final', it: 'Risciacquo finale', ca: 'Esbandida final' },
  batch: { en: 'Batch', es: 'Lote', fr: 'Lot', it: 'Lotto', ca: 'Lot' },
  oos: { en: 'OOS', es: 'OOS', fr: 'OOS', it: 'OOS', ca: 'OOS' },
  capa: { en: 'CAPA', es: 'CAPA', fr: 'CAPA', it: 'CAPA', ca: 'CAPA' },
  data_integrity: { en: 'Data integrity', es: 'Integridad de datos', fr: 'Integrite donnees', it: 'Integrita dati', ca: 'Integritat dades' },
  signature: { en: 'Signature', es: 'Firma', fr: 'Signature', it: 'Firma', ca: 'Signatura' },
  cdmo_cmo: { en: 'CDMO/CMO', es: 'CDMO/CMO', fr: 'CDMO/CMO', it: 'CDMO/CMO', ca: 'CDMO/CMO' },
  hotels: { en: 'Hotels', es: 'Hoteles', fr: 'Hotels', it: 'Hotel', ca: 'Hotels' },
  resorts: { en: 'Resorts', es: 'Resorts', fr: 'Resorts', it: 'Resort', ca: 'Resorts' },
  campings: { en: 'Campings', es: 'Campings', fr: 'Campings', it: 'Campeggi', ca: 'Campings' },
  spa: { en: 'Spa', es: 'Spa', fr: 'Spa', it: 'Spa', ca: 'Spa' },
  water_parks: { en: 'Water parks', es: 'Parques acuaticos', fr: 'Parcs aquatiques', it: 'Parchi acquatici', ca: 'Parcs aquatics' },
  food_service: { en: 'Food service', es: 'Restauracion', fr: 'Restauration', it: 'Ristorazione', ca: 'Restauracio' },
  ice: { en: 'Ice', es: 'Hielo', fr: 'Glace', it: 'Ghiaccio', ca: 'Gel' },
  rooms: { en: 'Rooms', es: 'Habitaciones', fr: 'Chambres', it: 'Camere', ca: 'Habitacions' },
  seasonal_reopening: { en: 'Seasonal reopening', es: 'Reapertura estacional', fr: 'Reouverture saisonniere', it: 'Riapertura stagionale', ca: 'Reobertura estacional' },
  multi_site_chain: { en: 'Multi-site chain', es: 'Cadena multisitio', fr: 'Chaine multi-site', it: 'Catena multisito', ca: 'Cadena multisite' },
  other_not_listed: { en: 'Needs technical review', es: 'Necesita revision tecnica', fr: 'Revue technique necessaire', it: 'Revisione tecnica necessaria', ca: 'Revisio tecnica necessaria' },
  not_defined: { en: 'Not defined', es: 'No definido', fr: 'Non defini', it: 'Non definito', ca: 'No definit' }
};

const FIELD_LABELS = {
  en: {
    sector_id: 'Sector', country_code: 'Country', organization_type: 'Organization type', buyer_role: 'Role',
    site_count_band: 'Sites', lab_model: 'Laboratory model', sample_volume_band: 'Sample volume', current_systems: 'Current systems',
    digitised_stages: 'Digitised stages', priority_problem_ids: 'Priority problems', evidence_needs: 'Evidence needs',
    implementation_timeline: 'Timeline', preferred_route: 'Preferred route', target_groups: 'Target groups',
    result_type: 'Result type', intended_use: 'Intended use', method_context: 'Method context', sample_volume_context: 'Sample volume context'
  },
  es: {
    sector_id: 'Sector', country_code: 'Pais', organization_type: 'Tipo de organizacion', buyer_role: 'Rol',
    site_count_band: 'Sedes', lab_model: 'Modelo de laboratorio', sample_volume_band: 'Volumen de muestras', current_systems: 'Sistemas actuales',
    digitised_stages: 'Etapas digitalizadas', priority_problem_ids: 'Problemas prioritarios', evidence_needs: 'Necesidades de evidencia',
    implementation_timeline: 'Plazo', preferred_route: 'Ruta preferida', target_groups: 'Grupos objetivo',
    result_type: 'Tipo de resultado', intended_use: 'Uso previsto', method_context: 'Contexto de metodo', sample_volume_context: 'Volumen de muestra'
  },
  fr: {
    sector_id: 'Secteur', country_code: 'Pays', organization_type: 'Type d organisation', buyer_role: 'Role',
    site_count_band: 'Sites', lab_model: 'Modele laboratoire', sample_volume_band: 'Volume echantillons', current_systems: 'Systemes actuels',
    digitised_stages: 'Etapes numerisees', priority_problem_ids: 'Problemes prioritaires', evidence_needs: 'Besoins de preuve',
    implementation_timeline: 'Delai', preferred_route: 'Voie preferee', target_groups: 'Groupes cibles',
    result_type: 'Type de resultat', intended_use: 'Usage prevu', method_context: 'Contexte methode', sample_volume_context: 'Volume echantillon'
  },
  it: {
    sector_id: 'Settore', country_code: 'Paese', organization_type: 'Tipo organizzazione', buyer_role: 'Ruolo',
    site_count_band: 'Sedi', lab_model: 'Modello laboratorio', sample_volume_band: 'Volume campioni', current_systems: 'Sistemi attuali',
    digitised_stages: 'Fasi digitalizzate', priority_problem_ids: 'Problemi prioritari', evidence_needs: 'Esigenze di evidenza',
    implementation_timeline: 'Tempistica', preferred_route: 'Percorso preferito', target_groups: 'Gruppi target',
    result_type: 'Tipo risultato', intended_use: 'Uso previsto', method_context: 'Contesto metodo', sample_volume_context: 'Volume campione'
  },
  ca: {
    sector_id: 'Sector', country_code: 'Pais', organization_type: 'Tipus d organitzacio', buyer_role: 'Rol',
    site_count_band: 'Sedes', lab_model: 'Model de laboratori', sample_volume_band: 'Volum de mostres', current_systems: 'Sistemes actuals',
    digitised_stages: 'Etapes digitalitzades', priority_problem_ids: 'Problemes prioritaris', evidence_needs: 'Necessitats d evidencia',
    implementation_timeline: 'Termini', preferred_route: 'Ruta preferida', target_groups: 'Grups objectiu',
    result_type: 'Tipus de resultat', intended_use: 'Us previst', method_context: 'Context de metode', sample_volume_context: 'Volum de mostra'
  }
};

const QUESTION_HELP_KEYS = [
  'sector_id',
  'country_code',
  'organization_type',
  'buyer_role',
  'site_count_band',
  'lab_model',
  'sample_volume_band',
  'current_systems',
  'digitised_stages',
  'priority_problem_ids',
  'evidence_needs',
  'implementation_timeline',
  'preferred_route',
  'target_groups',
  'result_type',
  'intended_use',
  'method_context',
  'sample_volume_context',
  'water_use_context',
  'laboratory_workflow_needs',
  'release_decision_context',
  'facility_assets',
  'pharma_quality_context',
  'hospitality_context'
] as const;

const workflowAdvisorQuestionHelp: Record<Language, Record<typeof QUESTION_HELP_KEYS[number], string>> = {
  en: {
    sector_id: 'Select the sector that best describes your operation. This adapts the questions, report language and recommendations.',
    country_code: 'Enter the main country for the programme. It is not used to geolocate you; it reminds the report that regulatory use must be reviewed by jurisdiction.',
    organization_type: 'The organization type helps distinguish laboratories, operators, manufacturers, facilities, agriculture, distributors and other B2B models.',
    buyer_role: 'Select your main function. The report can interpret quality, laboratory, operations, purchasing or leadership priorities differently.',
    site_count_band: 'Indicate how many sites or locations are involved. This helps estimate operational complexity and coordination needs.',
    lab_model: 'Indicate whether analysis is internal, external or mixed. This affects custody, review, CoA and coordination considerations.',
    sample_volume_band: 'Select an approximate sample range. Do not enter sensitive data or real results; we only estimate workflow complexity.',
    current_systems: 'Mark where requests, samples, results, reports or actions are recorded today. You can select several systems.',
    digitised_stages: 'Indicate which stages already have digital records. This helps detect gaps between sampling, testing, review, CoA, deviations and inventory.',
    priority_problem_ids: 'Choose up to three main problems. Prioritising keeps the report useful and avoids generic recommendations.',
    evidence_needs: 'Select the evidence you need to retain or demonstrate, such as custody, method, batch, review, CoA, audit trail or dashboards.',
    implementation_timeline: 'Indicate whether you are exploring, preparing an implementation or responding to an urgent need. This does not affect pricing or availability.',
    preferred_route: 'Indicate how you prefer to move forward: product, software, distributor, OEM, technical review or a combination.',
    target_groups: 'Select the target organisms or groups. If they are unclear, the report will keep the analytical route as technical review.',
    result_type: 'Indicate whether you need presence/absence, enumeration or both. This does not automatically select a product.',
    intended_use: 'Indicate the intended use of the result: internal control, screening, research, audit, regulatory reporting or another context.',
    method_context: 'Indicate whether a method or reference is already defined. If it is unclear, the report should not close a product recommendation.',
    sample_volume_context: 'Select the relevant sample volume. If it varies by matrix or method, it should be technically reviewed.',
    water_use_context: 'Select the water uses that define the programme. This helps align risks, evidence needs and the analytical route.',
    laboratory_workflow_needs: 'Select the laboratory workflow situations that matter most. This helps the report distinguish service, accreditation and turnaround needs.',
    release_decision_context: 'Select where water results influence release or hold decisions. This helps separate routine control from batch or sanitation evidence.',
    facility_assets: 'Select the assets or water systems involved. This helps interpret facility risk, sampling points and coordination needs.',
    pharma_quality_context: 'Select the quality contexts that apply. This helps keep recommendations aligned with review, data integrity and batch evidence.',
    hospitality_context: 'Select the hospitality contexts involved. This helps interpret seasonal, multi-site and guest-facing water risk.'
  },
  es: {
    sector_id: 'Selecciona el sector que mejor describe tu operación. Esto adapta las preguntas, el lenguaje del informe y las recomendaciones.',
    country_code: 'Indica el país principal del programa. No se usa para geolocalizarte; ayuda a recordar que cualquier uso regulatorio debe revisarse por jurisdicción.',
    organization_type: 'El tipo de organización ayuda a diferenciar laboratorios, operadores, fabricantes, instalaciones, agricultura, distribuidores y otros modelos B2B.',
    buyer_role: 'Selecciona tu función principal. El informe puede interpretar de forma distinta prioridades de calidad, laboratorio, operaciones, compras o dirección.',
    site_count_band: 'Indica cuántas sedes o ubicaciones participan. Esto ayuda a estimar complejidad operativa y necesidad de coordinación.',
    lab_model: 'Indica si el análisis se realiza internamente, externamente o con un modelo mixto. Esto afecta cadena de custodia, revisión, CoA y coordinación.',
    sample_volume_band: 'Selecciona un rango aproximado de muestras. No introduzcas datos sensibles ni resultados reales; solo necesitamos estimar complejidad del flujo.',
    current_systems: 'Marca dónde se registran hoy solicitudes, muestras, resultados, informes o acciones. Puedes seleccionar varios sistemas.',
    digitised_stages: 'Indica qué etapas ya tienen registro digital. Esto ayuda a detectar huecos entre muestreo, ensayo, revisión, CoA, desviaciones e inventario.',
    priority_problem_ids: 'Elige hasta tres problemas principales. Priorizar ayuda a generar un informe más útil y evita recomendaciones demasiado genéricas.',
    evidence_needs: 'Selecciona qué evidencias necesitas conservar o demostrar. Por ejemplo: cadena de custodia, método, lote, revisión, CoA, audit trail o dashboards.',
    implementation_timeline: 'Indica si estás explorando, preparando una implantación o respondiendo a una necesidad urgente. No afecta a precios ni disponibilidad.',
    preferred_route: 'Indica cómo prefieres avanzar: producto, software, distribuidor, OEM, revisión técnica o una combinación.',
    target_groups: 'Selecciona los organismos o grupos objetivo. Si no están claros, el informe mantendrá la ruta analítica como revisión técnica.',
    result_type: 'Indica si necesitas presencia/ausencia, enumeración o ambos. Esto no selecciona automáticamente un producto.',
    intended_use: 'Indica el uso previsto del resultado: control interno, cribado, investigación, auditoría, reporte regulatorio u otro contexto.',
    method_context: 'Indica si existe un método o referencia definida. Si no está claro, el informe no debe cerrar una recomendación de producto.',
    sample_volume_context: 'Selecciona el volumen de muestra relevante. Si varía según matriz o método, debe revisarse técnicamente.',
    water_use_context: 'Selecciona los usos del agua que definen el programa. Esto ayuda a alinear riesgos, evidencias y ruta analítica.',
    laboratory_workflow_needs: 'Selecciona las situaciones de flujo de laboratorio más importantes. Esto diferencia servicio, acreditación y presión de tiempos.',
    release_decision_context: 'Selecciona dónde el resultado de agua influye en liberar o retener. Esto separa control rutinario de evidencia de lote o saneamiento.',
    facility_assets: 'Selecciona los activos o sistemas de agua implicados. Esto ayuda a interpretar riesgo de instalación, puntos de muestreo y coordinación.',
    pharma_quality_context: 'Selecciona los contextos de calidad aplicables. Esto mantiene las recomendaciones alineadas con revisión, integridad de datos y evidencia de lote.',
    hospitality_context: 'Selecciona los contextos de hostelería implicados. Esto ayuda a interpretar riesgo estacional, multisitio y de cara al huésped.'
  },
  fr: {
    sector_id: 'Sélectionnez le secteur qui décrit le mieux votre opération. Cela adapte les questions, le langage du rapport et les recommandations.',
    country_code: 'Indiquez le pays principal du programme. Il ne sert pas à vous géolocaliser; il rappelle que tout usage réglementaire doit être revu par juridiction.',
    organization_type: 'Le type d’organisation aide à distinguer laboratoires, opérateurs, fabricants, installations, agriculture, distributeurs et autres modèles B2B.',
    buyer_role: 'Sélectionnez votre fonction principale. Le rapport peut interpréter différemment les priorités qualité, laboratoire, opérations, achats ou direction.',
    site_count_band: 'Indiquez combien de sites ou lieux participent. Cela aide à estimer la complexité opérationnelle et le besoin de coordination.',
    lab_model: 'Indiquez si l’analyse est interne, externe ou mixte. Cela influence la chaîne de traçabilité, la revue, le CoA et la coordination.',
    sample_volume_band: 'Sélectionnez une plage approximative d’échantillons. Ne saisissez pas de données sensibles ni de résultats réels; nous estimons seulement la complexité du flux.',
    current_systems: 'Cochez où les demandes, échantillons, résultats, rapports ou actions sont enregistrés aujourd’hui. Plusieurs systèmes peuvent être sélectionnés.',
    digitised_stages: 'Indiquez les étapes qui ont déjà un enregistrement numérique. Cela aide à détecter les écarts entre prélèvement, essai, revue, CoA, écarts et inventaire.',
    priority_problem_ids: 'Choisissez jusqu’à trois problèmes principaux. La priorisation rend le rapport plus utile et évite des recommandations trop génériques.',
    evidence_needs: 'Sélectionnez les preuves à conserver ou démontrer: chaîne de traçabilité, méthode, lot, revue, CoA, audit trail ou tableaux de bord.',
    implementation_timeline: 'Indiquez si vous explorez, préparez une mise en œuvre ou répondez à un besoin urgent. Cela n’affecte ni les prix ni la disponibilité.',
    preferred_route: 'Indiquez comment vous préférez avancer: produit, logiciel, distributeur, OEM, revue technique ou combinaison.',
    target_groups: 'Sélectionnez les organismes ou groupes cibles. S’ils ne sont pas clairs, le rapport gardera la voie analytique en revue technique.',
    result_type: 'Indiquez si vous avez besoin de présence/absence, dénombrement ou les deux. Cela ne sélectionne pas automatiquement un produit.',
    intended_use: 'Indiquez l’usage prévu du résultat: contrôle interne, criblage, recherche, audit, reporting réglementaire ou autre contexte.',
    method_context: 'Indiquez si une méthode ou référence est définie. Si ce n’est pas clair, le rapport ne doit pas fermer une recommandation produit.',
    sample_volume_context: 'Sélectionnez le volume d’échantillon pertinent. S’il varie selon matrice ou méthode, il doit être revu techniquement.',
    water_use_context: 'Sélectionnez les usages de l’eau qui définissent le programme. Cela aide à aligner risques, preuves et voie analytique.',
    laboratory_workflow_needs: 'Sélectionnez les situations de flux laboratoire les plus importantes. Cela distingue service, accréditation et pression des délais.',
    release_decision_context: 'Sélectionnez où le résultat d’eau influence une décision de libération ou blocage. Cela sépare contrôle routine et preuve de lot ou assainissement.',
    facility_assets: 'Sélectionnez les actifs ou systèmes d’eau concernés. Cela aide à interpréter le risque installation, les points de prélèvement et la coordination.',
    pharma_quality_context: 'Sélectionnez les contextes qualité applicables. Cela garde les recommandations alignées avec revue, intégrité des données et preuve de lot.',
    hospitality_context: 'Sélectionnez les contextes hôtellerie concernés. Cela aide à interpréter le risque saisonnier, multi-site et visible par les clients.'
  },
  it: {
    sector_id: 'Seleziona il settore che descrive meglio la tua operazione. Questo adatta domande, linguaggio del report e raccomandazioni.',
    country_code: 'Indica il paese principale del programma. Non viene usato per geolocalizzarti; ricorda che ogni uso regolatorio va rivisto per giurisdizione.',
    organization_type: 'Il tipo di organizzazione aiuta a distinguere laboratori, operatori, produttori, strutture, agricoltura, distributori e altri modelli B2B.',
    buyer_role: 'Seleziona la tua funzione principale. Il report può interpretare in modo diverso priorità di qualità, laboratorio, operazioni, acquisti o direzione.',
    site_count_band: 'Indica quante sedi o ubicazioni partecipano. Questo aiuta a stimare complessità operativa e necessità di coordinamento.',
    lab_model: 'Indica se l’analisi è interna, esterna o mista. Questo incide su catena di custodia, revisione, CoA e coordinamento.',
    sample_volume_band: 'Seleziona un intervallo approssimativo di campioni. Non inserire dati sensibili o risultati reali; serve solo a stimare la complessità del flusso.',
    current_systems: 'Indica dove oggi si registrano richieste, campioni, risultati, report o azioni. Puoi selezionare più sistemi.',
    digitised_stages: 'Indica quali fasi hanno già una registrazione digitale. Aiuta a individuare vuoti tra campionamento, test, revisione, CoA, deviazioni e inventario.',
    priority_problem_ids: 'Scegli fino a tre problemi principali. Dare priorità rende il report più utile ed evita raccomandazioni troppo generiche.',
    evidence_needs: 'Seleziona le evidenze da conservare o dimostrare, ad esempio custodia, metodo, lotto, revisione, CoA, audit trail o dashboard.',
    implementation_timeline: 'Indica se stai esplorando, preparando un’implementazione o rispondendo a un bisogno urgente. Non incide su prezzi o disponibilità.',
    preferred_route: 'Indica come preferisci procedere: prodotto, software, distributore, OEM, revisione tecnica o combinazione.',
    target_groups: 'Seleziona organismi o gruppi target. Se non sono chiari, il report manterrà la rotta analitica come revisione tecnica.',
    result_type: 'Indica se servono presenza/assenza, enumerazione o entrambi. Questo non seleziona automaticamente un prodotto.',
    intended_use: 'Indica l’uso previsto del risultato: controllo interno, screening, ricerca, audit, reporting regolatorio o altro contesto.',
    method_context: 'Indica se esiste un metodo o riferimento definito. Se non è chiaro, il report non deve chiudere una raccomandazione di prodotto.',
    sample_volume_context: 'Seleziona il volume di campione rilevante. Se varia per matrice o metodo, deve essere rivisto tecnicamente.',
    water_use_context: 'Seleziona gli usi dell’acqua che definiscono il programma. Aiuta ad allineare rischi, evidenze e rotta analitica.',
    laboratory_workflow_needs: 'Seleziona le situazioni di flusso laboratorio più importanti. Questo distingue servizio, accreditamento e pressione sui tempi.',
    release_decision_context: 'Seleziona dove il risultato dell’acqua influenza rilascio o blocco. Questo separa controllo routine da evidenza di lotto o sanificazione.',
    facility_assets: 'Seleziona asset o sistemi d’acqua coinvolti. Aiuta a interpretare rischio struttura, punti di campionamento e coordinamento.',
    pharma_quality_context: 'Seleziona i contesti qualità applicabili. Mantiene le raccomandazioni allineate con revisione, integrità dati ed evidenza di lotto.',
    hospitality_context: 'Seleziona i contesti hospitality coinvolti. Aiuta a interpretare rischio stagionale, multi-sede e visibile agli ospiti.'
  },
  ca: {
    sector_id: 'Selecciona el sector que descriu millor la teva operació. Això adapta les preguntes, el llenguatge de l’informe i les recomanacions.',
    country_code: 'Indica el país principal del programa. No s’utilitza per geolocalitzar-te; recorda que qualsevol ús regulador s’ha de revisar per jurisdicció.',
    organization_type: 'El tipus d’organització ajuda a diferenciar laboratoris, operadors, fabricants, instal·lacions, agricultura, distribuïdors i altres models B2B.',
    buyer_role: 'Selecciona la teva funció principal. L’informe pot interpretar diferent prioritats de qualitat, laboratori, operacions, compres o direcció.',
    site_count_band: 'Indica quantes seus o ubicacions participen. Això ajuda a estimar complexitat operativa i necessitat de coordinació.',
    lab_model: 'Indica si l’anàlisi es fa internament, externament o amb un model mixt. Això afecta cadena de custòdia, revisió, CoA i coordinació.',
    sample_volume_band: 'Selecciona un rang aproximat de mostres. No introdueixis dades sensibles ni resultats reals; només estimem la complexitat del flux.',
    current_systems: 'Marca on es registren avui sol·licituds, mostres, resultats, informes o accions. Pots seleccionar diversos sistemes.',
    digitised_stages: 'Indica quines etapes ja tenen registre digital. Això ajuda a detectar buits entre mostreig, assaig, revisió, CoA, desviacions i inventari.',
    priority_problem_ids: 'Tria fins a tres problemes principals. Prioritzar ajuda a generar un informe més útil i evita recomanacions massa genèriques.',
    evidence_needs: 'Selecciona quines evidències necessites conservar o demostrar, com cadena de custòdia, mètode, lot, revisió, CoA, audit trail o dashboards.',
    implementation_timeline: 'Indica si estàs explorant, preparant una implantació o responent a una necessitat urgent. No afecta preus ni disponibilitat.',
    preferred_route: 'Indica com prefereixes avançar: producte, software, distribuïdor, OEM, revisió tècnica o una combinació.',
    target_groups: 'Selecciona els organismes o grups objectiu. Si no són clars, l’informe mantindrà la ruta analítica com a revisió tècnica.',
    result_type: 'Indica si necessites presència/absència, enumeració o totes dues. Això no selecciona automàticament un producte.',
    intended_use: 'Indica l’ús previst del resultat: control intern, cribratge, investigació, auditoria, informe regulador o un altre context.',
    method_context: 'Indica si existeix un mètode o referència definida. Si no és clar, l’informe no ha de tancar una recomanació de producte.',
    sample_volume_context: 'Selecciona el volum de mostra rellevant. Si varia segons matriu o mètode, s’ha de revisar tècnicament.',
    water_use_context: 'Selecciona els usos de l’aigua que defineixen el programa. Això ajuda a alinear riscos, evidències i ruta analítica.',
    laboratory_workflow_needs: 'Selecciona les situacions de flux de laboratori més importants. Això diferencia servei, acreditació i pressió de terminis.',
    release_decision_context: 'Selecciona on el resultat d’aigua influeix en alliberar o retenir. Això separa control rutinari d’evidència de lot o sanejament.',
    facility_assets: 'Selecciona els actius o sistemes d’aigua implicats. Això ajuda a interpretar risc d’instal·lació, punts de mostreig i coordinació.',
    pharma_quality_context: 'Selecciona els contextos de qualitat aplicables. Això manté les recomanacions alineades amb revisió, integritat de dades i evidència de lot.',
    hospitality_context: 'Selecciona els contextos d’hostaleria implicats. Això ajuda a interpretar risc estacional, multiseu i visible per als hostes.'
  }
};

const STEP_FIELDS = [
  ['sector_id', 'country_code', 'organization_type', 'buyer_role'],
  ['site_count_band', 'lab_model', 'sample_volume_band', 'current_systems', 'digitised_stages', 'priority_problem_ids', 'evidence_needs'],
  ['implementation_timeline', 'preferred_route', 'target_groups', 'result_type', 'intended_use', 'method_context', 'sample_volume_context'],
  []
] as const;

const REPORT_SECTION_TITLES: Record<Language, Record<string, string>> = {
  en: {
    interpretedContext: 'Interpreted context',
    workflowAnalysis: 'Workflow analysis',
    quickRead: 'Quick read',
    maturity: 'Maturity by dimension',
    priorityProblems: 'Priority problems',
    improvementPlan: 'Improvement plan',
    digitalModules: 'Digital modules within the plan',
    analyticalRoute: 'Analytical route / products to evaluate',
    missingInformation: 'Missing information',
    relatedResources: 'Related resources',
    limitations: 'Limitations',
    missingInfoWhy: 'Why it matters',
    missingInfoHelp: 'Define this before closing the analytical route, product evaluation or implementation decision.',
    firstImprovement: 'What to improve first'
  },
  es: {
    interpretedContext: 'Contexto interpretado',
    workflowAnalysis: 'Análisis del flujo',
    quickRead: 'Lectura rápida',
    maturity: 'Madurez por dimensiones',
    priorityProblems: 'Problemas prioritarios',
    improvementPlan: 'Plan de mejora',
    digitalModules: 'Módulos digitales dentro del plan',
    analyticalRoute: 'Ruta analítica / productos a evaluar',
    missingInformation: 'Información que falta',
    relatedResources: 'Recursos relacionados',
    limitations: 'Limitaciones',
    missingInfoWhy: 'Por qué importa',
    missingInfoHelp: 'Define este punto antes de cerrar la ruta analítica, la evaluación de producto o la decisión de implantación.',
    firstImprovement: 'Qué mejorar primero'
  },
  fr: {
    interpretedContext: 'Contexte interprété',
    workflowAnalysis: 'Analyse du flux',
    quickRead: 'Lecture rapide',
    maturity: 'Maturité par dimension',
    priorityProblems: 'Problèmes prioritaires',
    improvementPlan: 'Plan d’amélioration',
    digitalModules: 'Modules numériques dans le plan',
    analyticalRoute: 'Route analytique / produits à évaluer',
    missingInformation: 'Informations manquantes',
    relatedResources: 'Ressources associées',
    limitations: 'Limites',
    missingInfoWhy: 'Pourquoi c’est important',
    missingInfoHelp: 'Définissez ce point avant de fermer la route analytique, l’évaluation produit ou la décision de mise en œuvre.',
    firstImprovement: 'À améliorer en premier'
  },
  it: {
    interpretedContext: 'Contesto interpretato',
    workflowAnalysis: 'Analisi del flusso',
    quickRead: 'Lettura rapida',
    maturity: 'Maturità per dimensione',
    priorityProblems: 'Problemi prioritari',
    improvementPlan: 'Piano di miglioramento',
    digitalModules: 'Moduli digitali nel piano',
    analyticalRoute: 'Percorso analitico / prodotti da valutare',
    missingInformation: 'Informazioni mancanti',
    relatedResources: 'Risorse correlate',
    limitations: 'Limiti',
    missingInfoWhy: 'Perché è importante',
    missingInfoHelp: 'Definisci questo punto prima di chiudere il percorso analitico, la valutazione del prodotto o la decisione di implementazione.',
    firstImprovement: 'Cosa migliorare prima'
  },
  ca: {
    interpretedContext: 'Context interpretat',
    workflowAnalysis: 'Anàlisi del flux',
    quickRead: 'Lectura ràpida',
    maturity: 'Maduresa per dimensió',
    priorityProblems: 'Problemes prioritaris',
    improvementPlan: 'Pla de millora',
    digitalModules: 'Mòduls digitals dins del pla',
    analyticalRoute: 'Ruta analítica / productes a avaluar',
    missingInformation: 'Informació que falta',
    relatedResources: 'Recursos relacionats',
    limitations: 'Limitacions',
    missingInfoWhy: 'Per què importa',
    missingInfoHelp: 'Defineix aquest punt abans de tancar la ruta analítica, l’avaluació de producte o la decisió d’implantació.',
    firstImprovement: 'Què cal millorar primer'
  }
};

const WORKFLOW_RESULT_SECTION_ORDER = [
  'contexto-interpretado',
  'analisis-flujo',
  'madurez',
  'problemas',
  'plan-mejora',
  'modulos',
  'ruta-analitica',
  'informacion-faltante',
  'recursos',
  'limitaciones'
] as const;

function questionHelp(id: string, lang: Language) {
  return workflowAdvisorQuestionHelp[lang][id as typeof QUESTION_HELP_KEYS[number]];
}

function optionLabel(id: string, lang: Language) {
  if (sectors.includes(id)) return getSectorLabel(id, lang);
  return OPTION_LABELS[id]?.[lang] || OPTION_LABELS[id]?.en || id.replace(/[_-]+/g, ' ');
}

function fieldLabel(id: string, lang: Language) {
  return FIELD_LABELS[lang]?.[id as keyof typeof FIELD_LABELS.en] || FIELD_LABELS.en[id as keyof typeof FIELD_LABELS.en] || id;
}

function sectorQuestionId(sectorId: string) {
  if (sectorId === 'water-testing-labs') return 'laboratory_workflow_needs';
  if (sectorId === 'food-beverage-water-quality') return 'release_decision_context';
  if (sectorId === 'facility-water-risk') return 'facility_assets';
  if (sectorId === 'pharma-cosmetics-water') return 'pharma_quality_context';
  if (sectorId === 'hospitality-tourism-water') return 'hospitality_context';
  return 'water_use_context';
}

function getInitialAnswers(pageLang: Language): Answers {
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const sector = params.get('sector') || 'water-testing-labs';
  const safeSector = sectors.includes(sector) ? sector : 'water-testing-labs';
  const problem = params.get('problem') || '';
  const safeProblem = (buyerProblemIdsBySector[safeSector] || []).includes(problem) ? problem : '';
  return {
    sector_id: safeSector,
    source_problem_id: safeProblem || null,
    country_code: '',
    organization_type: '',
    buyer_role: '',
    site_count_band: '',
    lab_model: '',
    sample_volume_band: '',
    current_systems: [],
    digitised_stages: [],
    priority_problem_ids: safeProblem ? [safeProblem] : [],
    evidence_needs: [],
    implementation_timeline: '',
    preferred_route: '',
    target_groups: [],
    result_type: '',
    intended_use: '',
    method_context: '',
    sample_volume_context: '',
    water_use_context: [],
    laboratory_workflow_needs: [],
    release_decision_context: [],
    facility_assets: [],
    pharma_quality_context: [],
    hospitality_context: [],
    lang: pageLang
  };
}

function toggleMulti(answers: Answers, questionId: string, option: string) {
  const current = Array.isArray(answers[questionId]) ? answers[questionId] as string[] : [];
  return current.includes(option)
    ? current.filter((item) => item !== option)
    : [...current, option].slice(0, questionId === 'priority_problem_ids' ? 3 : 99);
}

function homePath(lang: Language) {
  return lang === 'en' ? '/' : `/${lang}`;
}

function buildInput(pageLang: Language, answers: Answers) {
  const sectorId = String(answers.sector_id || 'water-testing-labs');
  return createAssessmentInput({
    lang: pageLang,
    sectorId,
    sourceProblemId: String(answers.source_problem_id || '') || undefined,
    answers: {
      ...answers,
      sector_id: sectorId,
      country_code: String(answers.country_code || '').toUpperCase().slice(0, 2)
    }
  });
}

function downloadTechnicalExport(result: WorkflowAssessmentResult | null, reportSnapshot: any, reportV2: WorkflowAdvisorReportV2 | null) {
  if (!result) return;
  const blob = new Blob([JSON.stringify({
    technicalExport: {
      note: reportV2?.technicalExport?.note || reportSnapshot?.technicalExport?.note,
      result
    },
    reportSnapshot,
    reportV2
  }, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `aquaverify-workflow-advisor-${result.sectorId}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function printWorkflowReport() {
  document.body.classList.add('workflow-report-print-mode');
  window.print();
  window.setTimeout(() => document.body.classList.remove('workflow-report-print-mode'), 500);
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isAnswerEmpty(value: Answers[string]) {
  if (Array.isArray(value)) return value.length === 0;
  return value === null || value === undefined || value === '';
}

const SelectField = ({ id, value, options, lang, onChange, help, error }: any) => (
  <label className="block" data-question-id={id}>
    <span className="text-sm font-black text-slate-800">{fieldLabel(id, lang)}</span>
    {help ? <span id={`${id}-help`} className="mt-1 block text-xs font-semibold leading-5 text-slate-500">{help}</span> : null}
    <select
      value={value || ''}
      onChange={(event) => onChange(event.target.value)}
      aria-describedby={`${id}-help${error ? ` ${id}-error` : ''}`}
      aria-invalid={error ? 'true' : undefined}
      className={`mt-2 w-full rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 ${error ? 'border-red-300' : 'border-slate-200'}`}
    >
      <option value="">-</option>
      {options.map((option: string) => (
        <option key={option} value={option}>{optionLabel(option, lang)}</option>
      ))}
    </select>
    {error ? <span id={`${id}-error`} tabIndex={-1} className="mt-2 block text-xs font-black text-red-700">{error}</span> : null}
  </label>
);

const MultiField = ({ id, values, options, lang, onToggle, optionLabels, help, error }: any) => (
  <fieldset data-question-id={id} aria-describedby={`${id}-help${error ? ` ${id}-error` : ''}`} aria-invalid={error ? 'true' : undefined}>
    <legend className="text-sm font-black text-slate-800">{fieldLabel(id, lang)}</legend>
    {help ? <p id={`${id}-help`} className="mt-1 text-xs font-semibold leading-5 text-slate-500">{help}</p> : null}
    <div className="mt-2 grid gap-2 sm:grid-cols-2">
      {options.map((option: string) => {
        const selected = values.includes(option);
        return (
          <button
            key={option}
            type="button"
            aria-pressed={selected}
            onClick={() => onToggle(option)}
            className={`rounded-xl border px-3 py-2 text-left text-sm font-bold transition ${selected ? 'border-cyan-300 bg-cyan-50 text-cyan-900' : 'border-slate-200 bg-white text-slate-600 hover:border-cyan-200'}`}
          >
            {optionLabels?.[option] || optionLabel(option, lang)}
          </button>
        );
      })}
    </div>
    {error ? <p id={`${id}-error`} tabIndex={-1} className="mt-2 text-xs font-black text-red-700">{error}</p> : null}
  </fieldset>
);

const groupedRecommendations = (report: WorkflowAdvisorReportV2) => {
  const groups = new Map<string, any[]>();
  (report.recommendationSections || []).forEach((item: any) => {
    const title = item.phaseTitle || report.sections.digitalModules;
    groups.set(title, [...(groups.get(title) || []), item]);
  });
  return [...groups.entries()].map(([title, items]) => ({ title, items }));
};

const WorkflowReportSection = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="workflow-report-section workflow-report-page rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
    <h2 className="text-xl font-black text-slate-950">{title}</h2>
    <div className="mt-4 space-y-5">{children}</div>
  </section>
);

const WorkflowReportV2 = ({ report }: { report: WorkflowAdvisorReportV2 }) => (
  <article className="workflow-result workflow-report workflow-report-print mx-auto max-w-5xl space-y-8 bg-white text-slate-950" data-report-section-order={WORKFLOW_RESULT_SECTION_ORDER.join(' ')}>
    {(() => {
      const lang = report.lang as Language;
      const titles = REPORT_SECTION_TITLES[lang];
      const labels = (report as any).labels || {};
      const label = (key: string, fallback: string) => labels[key] || fallback;
      const analyticalTitle = report.analyticalReview?.title || titles.analyticalRoute;
      return (
        <>
          <header className="workflow-report-section workflow-report-page workflow-report-header rounded-2xl border border-slate-200 bg-white p-6 text-slate-950 shadow-sm md:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <img src="/images/logo-name.png" alt="AquaVerify" className="h-10 w-auto" />
              <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-cyan-800">Workflow Advisor</span>
            </div>
            <p className="mt-8 text-sm font-black text-cyan-700">{report.cover?.title || report.title}</p>
            <h2 className="mt-2 text-3xl font-black">{report.cover?.sectorTitle || report.sector?.label}</h2>
            <p className="mt-4 max-w-4xl text-sm font-bold leading-7 text-slate-700">{report.cover?.subtitle || report.subtitle}</p>
            <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-3">
                <dt className="text-xs font-black uppercase text-slate-400">{report.cover?.generatedAtLabel}</dt>
                <dd className="mt-1 font-bold">{report.cover?.generatedAtLocalized}</dd>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <dt className="text-xs font-black uppercase text-slate-400">{report.cover?.preparedByLabel}</dt>
                <dd className="mt-1 font-bold">{report.cover?.preparedBy}</dd>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <dt className="text-xs font-black uppercase text-slate-400">{report.cover?.assessmentVersionLabel}</dt>
                <dd className="mt-1 font-bold">{report.cover?.assessmentVersion}</dd>
              </div>
            </dl>
            <div className="workflow-report-footer mt-8 border-t border-slate-200 pt-3 text-xs font-bold text-slate-500">AquaVerify · Safe Water for a Better World</div>
          </header>

          <section className="workflow-report-section workflow-report-page rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-950 shadow-sm md:p-7">
            <CheckCircle2 className="h-6 w-6" />
            <h2 className="mt-2 text-xl font-black">{report.sections.executiveSummary}</h2>
            {(report.executiveSummary || []).map((paragraph) => (
              <p key={paragraph} className="mt-3 text-sm leading-7">{paragraph}</p>
            ))}
          </section>

          <section className="workflow-report-section workflow-report-page rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
            <h2 className="text-xl font-black text-slate-950">{titles.quickRead}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {(report.quickReadItems || []).map((item) => (
                <article key={item.id} className="workflow-report-card rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-black uppercase text-slate-400">{item.label}</p>
                  <p className="mt-2 text-sm font-bold text-slate-700">{String(item.value)}</p>
                </article>
              ))}
            </div>
          </section>

          <WorkflowReportSection id="contexto-interpretado" title={titles.interpretedContext}>
            <p className="text-sm leading-7 text-slate-600">{report.interpretedContext?.buyerContext}</p>
            <dl className="grid gap-4 sm:grid-cols-2">
              {(report.interpretedContext?.facts || []).map((item) => (
                <div key={item.field} className="workflow-report-card rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <dt className="text-xs font-black uppercase text-slate-400">{item.label}</dt>
                  <dd className="mt-1 text-sm font-bold">{item.value}</dd>
                </div>
              ))}
            </dl>
          </WorkflowReportSection>

          <WorkflowReportSection id="analisis-flujo" title={titles.workflowAnalysis}>
            <p className="text-sm leading-7 text-slate-600">{report.flowDiagnosis?.paragraph}</p>
            <div className="flex flex-wrap gap-2">
              {(report.flowDiagnosis?.keySignals || []).map((signal) => (
                <span key={signal} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{signal}</span>
              ))}
            </div>
          </WorkflowReportSection>

          <WorkflowReportSection id="madurez" title={titles.maturity}>
            <div className="space-y-4">
              {(report.maturity || []).map((item) => (
                <article key={item.dimensionId} className="workflow-report-card rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-black text-primary">{item.title}</h3>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-600">{item.level} / 5 · {item.label}</span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{(item as any).interpretation || item.explanation}</p>
                  <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
                    <p className="leading-7 text-slate-700"><strong>{label('firstImprovement', titles.firstImprovement)}:</strong> {(item as any).firstImprovement || item.nextImprovement}</p>
                    {(item as any).aquaverifySupport ? <p className="leading-7 text-slate-700"><strong>{label('aquaverifySupport', 'How AquaVerify can help')}:</strong> {(item as any).aquaverifySupport}</p> : null}
                    {(item as any).relatedCapabilities?.length ? (
                      <div>
                        <strong className="text-slate-950">{label('relatedCapabilities', 'Related modules or capabilities')}</strong>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
                          {(item as any).relatedCapabilities.map((capability: string) => <li key={capability}>{capability}</li>)}
                        </ul>
                      </div>
                    ) : null}
                    {(item as any).implementationCondition ? <p className="leading-7 text-slate-700"><strong>{label('implementationCondition', 'Condition before implementation')}:</strong> {(item as any).implementationCondition}</p> : null}
                  </div>
                </article>
              ))}
            </div>
          </WorkflowReportSection>

          <WorkflowReportSection id="problemas" title={titles.priorityProblems}>
            <div className="space-y-4">
              {(report.priorityProblems || []).map((problem) => (
                <article key={`${problem.title}-${problem.priorityLabel}`} className="workflow-report-card rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-black uppercase text-cyan-700">{problem.priorityLabel}</p>
                  <h3 className="mt-1 font-black">{problem.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{(problem as any).explanation || problem.paragraph}</p>
                  <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
                    {(problem as any).operationalImpact ? <p className="leading-7 text-slate-700"><strong>{label('operationalImpact', 'Operational impact')}:</strong> {(problem as any).operationalImpact}</p> : null}
                    {(problem as any).improvementFocus ? <p className="leading-7 text-slate-700"><strong>{label('improvementFocus', 'Improvement focus')}:</strong> {(problem as any).improvementFocus}</p> : null}
                    {(problem as any).aquaverifySupport ? <p className="leading-7 text-slate-700"><strong>{label('aquaverifySupport', 'How AquaVerify can help')}:</strong> {(problem as any).aquaverifySupport}</p> : null}
                    {(problem as any).relatedCapabilities?.length ? (
                      <div>
                        <strong className="text-slate-950">{label('relatedCapabilities', 'Related modules or capabilities')}</strong>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
                          {(problem as any).relatedCapabilities.map((capability: string) => <li key={capability}>{capability}</li>)}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                  {(problem as any).nextStep ? <p className="mt-4 text-sm leading-7 text-slate-700"><strong>{label('nextStep', 'Next step')}:</strong> {(problem as any).nextStep}</p> : null}
                </article>
              ))}
            </div>
          </WorkflowReportSection>

          <WorkflowReportSection id="plan-mejora" title={titles.improvementPlan}>
            <ol className="space-y-4">
              {(report.improvementPlan?.phases || []).map((phase) => (
                <li key={phase.phaseId} className="workflow-report-card rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm">
                  <strong className="text-base text-slate-950">{phase.phase}. {phase.title}</strong>
                  <p className="mt-2 leading-7 text-slate-600"><strong>{label('objective', 'Objective')}:</strong> {phase.objective}</p>
                  {phase.actions?.length ? (
                    <div className="mt-3">
                      <strong className="text-slate-950">{label('actions', 'Actions')}</strong>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">{phase.actions.map((action) => <li key={action}>{action}</li>)}</ul>
                    </div>
                  ) : null}
                  {(phase as any).modulesRelated?.length ? (
                    <p className="mt-3 leading-7 text-slate-700"><strong>{label('modulesRelated', 'Related modules')}:</strong> {(phase as any).modulesRelated.join(', ')}</p>
                  ) : null}
                  {(phase as any).implementationCondition ? <p className="mt-2 leading-7 text-slate-700"><strong>{label('implementationCondition', 'Condition before implementation')}:</strong> {(phase as any).implementationCondition}</p> : null}
                  <p className="mt-2 leading-7 text-slate-700"><strong>{label('expectedOutcome', 'Expected outcome')}:</strong> {phase.expectedOutcome}</p>
                  {(phase as any).nextStep ? <p className="mt-2 leading-7 text-slate-700"><strong>{label('nextStep', 'Next step')}:</strong> {(phase as any).nextStep}</p> : null}
                </li>
              ))}
            </ol>
          </WorkflowReportSection>

          <WorkflowReportSection id="modulos" title={titles.digitalModules}>
            {groupedRecommendations(report).map((group) => (
              <div key={group.title} className="mt-4">
                <h3 className="text-sm font-black text-cyan-800">{group.title}</h3>
                <div className="mt-2 grid gap-2">
                  {group.items.map((rec) => (
                    <article key={rec.recommendationId} className="workflow-report-card rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <strong>{rec.title}</strong>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-cyan-700">{rec.status}</span>
                      </div>
                      <p className="mt-2 leading-7 text-slate-600"><strong>{label('relatedPhase', 'Related phase')}:</strong> {(rec as any).relatedPhase || rec.phaseTitle}</p>
                      <p className="mt-2 leading-7 text-slate-600"><strong>{label('problemSolved', 'Problem solved')}:</strong> {(rec as any).problemSolved || rec.paragraph}</p>
                      {(rec as any).requiredData ? <p className="mt-2 leading-7 text-slate-700"><strong>{label('requiredData', 'Required data')}:</strong> {(rec as any).requiredData}</p> : null}
                      {(rec as any).operationalOutcome ? <p className="mt-2 leading-7 text-slate-700"><strong>{label('expectedOutcome', 'Expected outcome')}:</strong> {(rec as any).operationalOutcome}</p> : null}
                      {(rec as any).implementationCondition ? <p className="mt-2 leading-7 text-slate-700"><strong>{label('implementationCondition', 'Condition before implementation')}:</strong> {(rec as any).implementationCondition}</p> : null}
                      {rec.whatToDefine?.length ? <p className="mt-2 text-xs font-bold text-slate-500">{rec.whatToDefine.join(' ')}</p> : null}
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </WorkflowReportSection>

          <WorkflowReportSection id="ruta-analitica" title={analyticalTitle}>
            <p className="text-sm leading-7 text-slate-600">{report.analyticalReview?.paragraph}</p>
            {(report.analyticalReview?.candidates || []).map((candidate) => (
              <article key={candidate.productId} className="workflow-report-card mt-3 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm">
                <strong>{candidate.title}</strong>
                <span className="ml-2 text-xs font-black text-cyan-700">{candidate.status}</span>
                <p className="mt-2 leading-7 text-slate-600">{candidate.reason}</p>
              </article>
            ))}
          </WorkflowReportSection>

          <WorkflowReportSection id="informacion-faltante" title={titles.missingInformation}>
            <ul className="space-y-3 text-sm leading-7 text-slate-600">
              {(report.missingInformation || []).map((item) => (
                <li key={item} className="workflow-report-card rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <strong className="block text-slate-950">{item}</strong>
                  <span className="mt-1 block text-xs font-black uppercase tracking-[0.12em] text-slate-400">{titles.missingInfoWhy}</span>
                  <span className="mt-1 block">{titles.missingInfoHelp}</span>
                </li>
              ))}
            </ul>
          </WorkflowReportSection>

          <WorkflowReportSection id="recursos" title={titles.relatedResources}>
            {(report.relatedResources || []).map((resource) => (
              <article key={`${resource.title}-${resource.url}`} className="workflow-report-card rounded-xl border border-slate-100 bg-slate-50 p-4">
                <a href={resource.url} className="block text-sm font-bold text-cyan-700">{resource.title}</a>
                {resource.description ? <p className="mt-1 text-xs leading-5 text-slate-500">{resource.description}</p> : null}
              </article>
            ))}
          </WorkflowReportSection>

          <WorkflowReportSection id="limitaciones" title={titles.limitations}>
            {(report.limitations || []).map((item) => (
              <p key={item} className="mt-2 text-sm leading-7 text-slate-600">{item}</p>
            ))}
          </WorkflowReportSection>
        </>
      );
    })()}
  </article>
);

export const WorkflowAdvisorLanding: React.FC<Props> = ({ content, pageLang }) => {
  const copy = UI[pageLang] || UI.en;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(() => getInitialAnswers(pageLang));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<WorkflowAssessmentResult | null>(null);
  const [researchConsent, setResearchConsent] = useState(false);
  const [contactConsent, setContactConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [pdfModalError, setPdfModalError] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const [publicId, setPublicId] = useState('');
  const [contact, setContact] = useState({ name: '', email: '', company: '', countryCode: '', buyerRole: '', phone: '', requestType: 'technical_review', comment: '' });
  const questionnaireTopRef = useRef<HTMLElement | null>(null);
  const resultTopRef = useRef<HTMLDivElement | null>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const resultHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const downloadButtonRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const sectorId = String(answers.sector_id || 'water-testing-labs');
  const buyerProblems = getIndustryBuyerProblems(sectorId, pageLang);
  const buyerProblemLabels = Object.fromEntries((buyerProblems?.problems || []).map((problem: any) => [problem.id, problem.question]));
  const priorityOptions = [...(buyerProblemIdsBySector[sectorId] || []), 'reduce_manual_transcription', 'improve_audit_evidence', 'coordinate_external_labs', 'compare_multiple_sites', 'add_new_test', 'improve_customer_visibility'];
  const sectorSpecificQuestion = sectorQuestionId(sectorId);
  const showDebugAnnex = import.meta.env.DEV;

  const reportSnapshot = useMemo(() => {
    if (!result) return null;
    return (result as any).reportSnapshot || buildWorkflowAdvisorReport({
      result,
      answers: buildInput(pageLang, answers).answers,
      questionnaire,
      lang: pageLang
    });
  }, [answers, pageLang, result]);

  const reportV2 = useMemo(() => {
    if (!result) return null;
    return (result as any).reportV2 || buildWorkflowAdvisorReportV2({
      result,
      answers: buildInput(pageLang, answers).answers,
      questionnaire,
      lang: pageLang
    });
  }, [answers, pageLang, result]);

  const setAnswer = (questionId: string, value: any) => {
    setErrors((current) => {
      if (!current[questionId]) return current;
      const next = { ...current };
      delete next[questionId];
      return next;
    });
    setAnswers((current) => ({ ...current, [questionId]: value }));
  };

  const scrollAndFocus = useCallback((target: HTMLElement | null, focusTarget?: HTMLElement | null) => {
    if (!target) return;
    target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    window.setTimeout(() => (focusTarget || target).focus({ preventScroll: true }), prefersReducedMotion() ? 0 : 160);
  }, []);

  const focusFirstError = useCallback((fieldId: string) => {
    const wrapper = document.querySelector<HTMLElement>(`[data-question-id="${fieldId}"]`);
    if (!wrapper) return;
    const error = wrapper.querySelector<HTMLElement>(`#${fieldId}-error`);
    const focusable = wrapper.querySelector<HTMLElement>('select, input, textarea, button, [tabindex]:not([tabindex="-1"])');
    wrapper.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    window.setTimeout(() => (focusable || error || wrapper).focus({ preventScroll: true }), prefersReducedMotion() ? 0 : 160);
  }, []);

  const stepFields = useCallback((stepIndex: number) => {
    const fields = [...(STEP_FIELDS[stepIndex] || [])] as string[];
    if (stepIndex === 2) fields.push(sectorSpecificQuestion);
    return fields;
  }, [sectorSpecificQuestion]);

  const validateCurrentStep = useCallback((stepIndex: number) => {
    const nextErrors: Record<string, string> = {};
    for (const fieldId of stepFields(stepIndex)) {
      if (isAnswerEmpty(answers[fieldId])) {
        nextErrors[fieldId] = copy.requiredError;
      }
      if (fieldId === 'country_code' && String(answers.country_code || '').trim().length > 0 && !/^[A-Z]{2}$/i.test(String(answers.country_code))) {
        nextErrors[fieldId] = copy.countryCodeError;
      }
    }
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      focusFirstError(firstError);
      return false;
    }
    return true;
  }, [answers, copy.countryCodeError, copy.requiredError, focusFirstError, stepFields]);

  const goToStep = useCallback((nextStep: number) => {
    setStep(nextStep);
    window.setTimeout(() => {
      const focusTarget = nextStep === 3 ? resultHeadingRef.current || stepHeadingRef.current : stepHeadingRef.current;
      scrollAndFocus(nextStep === 3 ? resultTopRef.current || questionnaireTopRef.current : questionnaireTopRef.current, focusTarget);
    }, 40);
  }, [scrollAndFocus]);

  const calculate = useCallback(() => {
    const input = buildInput(pageLang, answers);
    const next = assessWorkflow(input);
    setResult(next);
    goToStep(3);
  }, [answers, goToStep, pageLang]);

  const handleNext = () => {
    if (!validateCurrentStep(step)) return;
    goToStep(Math.min(3, step + 1));
  };

  const handleBack = () => {
    setErrors({});
    goToStep(Math.max(0, step - 1));
  };

  const handleCalculate = () => {
    if (!validateCurrentStep(2)) return;
    calculate();
  };

  const saveAssessment = async (purpose: 'research' | 'contact') => {
    if (!result) calculate();
    const input = buildInput(pageLang, answers);
    const isResearchSave = purpose === 'research';
    const isContactSave = purpose === 'contact';
    try {
      const response = await fetch(`${API_BASE}/api/public/v1/workflow-assessments`, {
        method: 'POST',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': `wa-${Date.now()}-${Math.random().toString(36).slice(2)}`
        },
        body: JSON.stringify({
          input,
          researchConsent: isResearchSave,
          contactConsent: isContactSave,
          marketingConsent: isContactSave ? marketingConsent : false,
          sourcePath: window.location.pathname,
          referrerHost: document.referrer ? new URL(document.referrer).hostname : '',
          utm: Object.fromEntries(new URLSearchParams(window.location.search).entries())
        })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setSaveMessage(data.error === 'workflow_storage_disabled' ? copy.storageDisabled : (data.error || 'Save failed'));
        return '';
      }
      setPublicId(data.publicId || '');
      if (isResearchSave) setSaveMessage(data.deleteToken ? `${copy.saved} ${data.deleteToken}` : copy.saved.replace(/:$/, '.'));
      return data.publicId || '';
    } catch {
      setSaveMessage(copy.storageDisabled);
      return '';
    }
  };

  const closePdfModal = useCallback(() => {
    setIsPdfModalOpen(false);
    setPdfModalError('');
    setResearchConsent(false);
    window.setTimeout(() => downloadButtonRef.current?.focus({ preventScroll: true }), 40);
  }, []);

  const openPdfModal = () => {
    setPdfModalError('');
    setResearchConsent(false);
    setIsPdfModalOpen(true);
  };

  const downloadWithoutSharing = () => {
    closePdfModal();
    window.setTimeout(printWorkflowReport, 60);
  };

  const shareAndDownload = async () => {
    if (!researchConsent) return;
    const id = await saveAssessment('research');
    if (id) {
      closePdfModal();
      window.setTimeout(printWorkflowReport, 60);
    } else {
      setPdfModalError(copy.shareError);
    }
  };

  const submitContact = async () => {
    if (!contactConsent) return;
    const id = publicId || await saveAssessment('contact');
    if (!id) return;
    try {
      const response = await fetch(`${API_BASE}/api/public/v1/workflow-assessments/${encodeURIComponent(id)}/lead`, {
        method: 'POST',
        credentials: 'omit',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...contact, contactConsent, marketingConsent })
      });
      const data = await response.json().catch(() => ({}));
      setSaveMessage(response.ok ? copy.contactSent : (data.error || copy.storageDisabled));
    } catch {
      setSaveMessage(copy.storageDisabled);
    }
  };

  useEffect(() => {
    if (!isPdfModalOpen) return;
    const modal = modalRef.current;
    const focusableSelector = 'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';
    const focusFirst = () => modal?.querySelector<HTMLElement>(focusableSelector)?.focus();
    window.setTimeout(focusFirst, 40);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closePdfModal();
        return;
      }
      if (event.key !== 'Tab' || !modal) return;
      const focusable = Array.from(modal.querySelectorAll<HTMLElement>(focusableSelector));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closePdfModal, isPdfModalOpen]);

  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="workflow-advisor-landing border-b border-cyan-100 bg-[radial-gradient(circle_at_88%_8%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_10%_16%,rgba(10,45,77,0.08),transparent_30%),#ffffff]">
        <div className="container mx-auto grid min-h-[72vh] items-center gap-8 px-6 py-24 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
              <Link to={homePath(pageLang)} className="transition hover:text-primary">AquaVerify</Link>
              <span aria-hidden="true">/</span>
              <span className="text-cyan-700">Workflow Advisor</span>
            </nav>
            <span className="mt-6 inline-flex rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-cyan-800">{content.eyebrow}</span>
            <h1 className="mt-5 max-w-5xl font-heading text-4xl font-black leading-tight text-primary md:text-6xl">{content.heroTitle}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">{content.directAnswer}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#workflow-advisor-tool" className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-black text-white shadow-lg shadow-primary/20 transition hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-500">
                {content.cta}<ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <span className="inline-flex items-center rounded-full border border-cyan-100 bg-white px-4 py-2 text-xs font-black text-slate-600 shadow-sm">
                <ShieldCheck aria-hidden="true" className="mr-2 h-4 w-4 text-cyan-700" />
                {copy.localOnly}
              </span>
            </div>
            <p className="mt-4 max-w-2xl text-sm font-bold leading-6 text-slate-500">{copy.localNote}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-xl shadow-slate-200/60 backdrop-blur">
            <div className="grid gap-3">
              {(content.blocks || []).slice(0, 4).map(([title, body]: [string, string]) => (
                <article key={title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h2 className="text-sm font-black text-primary">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="workflow-advisor-landing border-b border-slate-200 bg-slate-50 py-12">
        <div className="container mx-auto grid gap-4 px-6 md:grid-cols-3">
          {(content.blocks || []).slice(4).map(([title, body]: [string, string]) => (
            <article key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-black text-slate-950">{title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">{body}</p>
            </article>
          ))}
          <article className="rounded-2xl border border-cyan-100 bg-cyan-50 p-5 text-cyan-950">
            <ShieldCheck className="h-6 w-6" />
            <h2 className="mt-3 font-black">{copy.localOnly}</h2>
            <p className="mt-2 text-sm leading-7">{copy.localNote}</p>
          </article>
        </div>
      </section>

      <section id="workflow-advisor-tool" className="workflow-advisor-form scroll-mt-24 py-14">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="workflow-advisor-shell space-y-5">
            <nav aria-label="Progreso del diagnóstico" className="workflow-advisor-stepper no-print sticky top-20 z-30 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
              <ol className="grid gap-2 sm:grid-cols-4">
                {[copy.context, copy.workflow, copy.analytical, copy.result].map((label, index) => {
                  const isCurrent = step === index;
                  const isComplete = index < step || (index === 3 && !!result);
                  const isEnabled = index <= step || (index === 3 && !!result);
                  return (
                    <li key={label}>
                      <button
                        type="button"
                        disabled={!isEnabled}
                        aria-current={isCurrent ? 'step' : undefined}
                        aria-disabled={!isEnabled ? 'true' : undefined}
                        onClick={() => {
                          if (isEnabled) goToStep(index);
                        }}
                        className={`flex h-full w-full items-center gap-3 rounded-xl border px-3 py-3 text-left text-sm font-black transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 ${isCurrent ? 'border-cyan-200 bg-cyan-50 text-cyan-800' : isComplete ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-transparent text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60'}`}
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current text-xs">{index + 1}</span>
                        <span>{label}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>

            <section ref={questionnaireTopRef} className="workflow-questionnaire-panel workflow-form-panel scroll-mt-32 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
              <p className="no-print text-xs font-black uppercase tracking-[0.16em] text-cyan-700">{copy.progress} {step + 1} / 4</p>
              <h2 ref={stepHeadingRef} tabIndex={-1} className="mt-2 text-2xl font-black text-slate-950 outline-none">
                {[copy.context, copy.workflow, copy.analytical, copy.result][step]}
              </h2>

              {step === 0 && (
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <SelectField id="sector_id" lang={pageLang} value={answers.sector_id} options={sectors} help={questionHelp('sector_id', pageLang)} error={errors.sector_id} onChange={(value: string) => setAnswer('sector_id', value)} />
                  <label className="block" data-question-id="country_code">
                    <span className="text-sm font-black text-slate-800">{fieldLabel('country_code', pageLang)}</span>
                    <span id="country_code-help" className="mt-1 block text-xs font-semibold leading-5 text-slate-500">{questionHelp('country_code', pageLang)}</span>
                    <input
                      value={String(answers.country_code || '')}
                      onChange={(event) => setAnswer('country_code', event.target.value.toUpperCase().slice(0, 2))}
                      aria-describedby={`country_code-help${errors.country_code ? ' country_code-error' : ''}`}
                      aria-invalid={errors.country_code ? 'true' : undefined}
                      className={`mt-2 w-full rounded-xl border px-3 py-3 text-sm uppercase outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 ${errors.country_code ? 'border-red-300' : 'border-slate-200'}`}
                      placeholder="ES"
                    />
                    {errors.country_code ? <span id="country_code-error" tabIndex={-1} className="mt-2 block text-xs font-black text-red-700">{errors.country_code}</span> : null}
                  </label>
                  <SelectField id="organization_type" lang={pageLang} value={answers.organization_type} options={questionnaire.singleChoiceOptions.organization_type} help={questionHelp('organization_type', pageLang)} error={errors.organization_type} onChange={(value: string) => setAnswer('organization_type', value)} />
                  <SelectField id="buyer_role" lang={pageLang} value={answers.buyer_role} options={questionnaire.singleChoiceOptions.buyer_role} help={questionHelp('buyer_role', pageLang)} error={errors.buyer_role} onChange={(value: string) => setAnswer('buyer_role', value)} />
                </div>
              )}

              {step === 1 && (
                <div className="mt-5 grid gap-6">
                  <div className="grid gap-5 md:grid-cols-3">
                    <SelectField id="site_count_band" lang={pageLang} value={answers.site_count_band} options={questionnaire.singleChoiceOptions.site_count_band} help={questionHelp('site_count_band', pageLang)} error={errors.site_count_band} onChange={(value: string) => setAnswer('site_count_band', value)} />
                    <SelectField id="lab_model" lang={pageLang} value={answers.lab_model} options={questionnaire.singleChoiceOptions.lab_model} help={questionHelp('lab_model', pageLang)} error={errors.lab_model} onChange={(value: string) => setAnswer('lab_model', value)} />
                    <SelectField id="sample_volume_band" lang={pageLang} value={answers.sample_volume_band} options={questionnaire.singleChoiceOptions.sample_volume_band} help={questionHelp('sample_volume_band', pageLang)} error={errors.sample_volume_band} onChange={(value: string) => setAnswer('sample_volume_band', value)} />
                  </div>
                  <MultiField id="current_systems" lang={pageLang} values={answers.current_systems || []} options={questionnaire.multiChoiceOptions.current_systems} help={questionHelp('current_systems', pageLang)} error={errors.current_systems} onToggle={(option: string) => setAnswer('current_systems', toggleMulti(answers, 'current_systems', option))} />
                  <MultiField id="digitised_stages" lang={pageLang} values={answers.digitised_stages || []} options={questionnaire.multiChoiceOptions.digitised_stages} help={questionHelp('digitised_stages', pageLang)} error={errors.digitised_stages} onToggle={(option: string) => setAnswer('digitised_stages', toggleMulti(answers, 'digitised_stages', option))} />
                  <MultiField id="priority_problem_ids" lang={pageLang} values={answers.priority_problem_ids || []} options={priorityOptions} optionLabels={buyerProblemLabels} help={questionHelp('priority_problem_ids', pageLang)} error={errors.priority_problem_ids} onToggle={(option: string) => setAnswer('priority_problem_ids', toggleMulti(answers, 'priority_problem_ids', option))} />
                  <MultiField id="evidence_needs" lang={pageLang} values={answers.evidence_needs || []} options={questionnaire.multiChoiceOptions.evidence_needs} help={questionHelp('evidence_needs', pageLang)} error={errors.evidence_needs} onToggle={(option: string) => setAnswer('evidence_needs', toggleMulti(answers, 'evidence_needs', option))} />
                </div>
              )}

              {step === 2 && (
                <div className="mt-5 grid gap-6">
                  <div className="grid gap-5 md:grid-cols-2">
                    <SelectField id="implementation_timeline" lang={pageLang} value={answers.implementation_timeline} options={questionnaire.singleChoiceOptions.implementation_timeline} help={questionHelp('implementation_timeline', pageLang)} error={errors.implementation_timeline} onChange={(value: string) => setAnswer('implementation_timeline', value)} />
                    <SelectField id="preferred_route" lang={pageLang} value={answers.preferred_route} options={questionnaire.singleChoiceOptions.preferred_route} help={questionHelp('preferred_route', pageLang)} error={errors.preferred_route} onChange={(value: string) => setAnswer('preferred_route', value)} />
                    <SelectField id="result_type" lang={pageLang} value={answers.result_type} options={questionnaire.singleChoiceOptions.result_type} help={questionHelp('result_type', pageLang)} error={errors.result_type} onChange={(value: string) => setAnswer('result_type', value)} />
                    <SelectField id="intended_use" lang={pageLang} value={answers.intended_use} options={questionnaire.singleChoiceOptions.intended_use} help={questionHelp('intended_use', pageLang)} error={errors.intended_use} onChange={(value: string) => setAnswer('intended_use', value)} />
                    <SelectField id="method_context" lang={pageLang} value={answers.method_context} options={questionnaire.singleChoiceOptions.method_context} help={questionHelp('method_context', pageLang)} error={errors.method_context} onChange={(value: string) => setAnswer('method_context', value)} />
                    <SelectField id="sample_volume_context" lang={pageLang} value={answers.sample_volume_context} options={questionnaire.singleChoiceOptions.sample_volume_context} help={questionHelp('sample_volume_context', pageLang)} error={errors.sample_volume_context} onChange={(value: string) => setAnswer('sample_volume_context', value)} />
                  </div>
                  <MultiField id="target_groups" lang={pageLang} values={answers.target_groups || []} options={questionnaire.multiChoiceOptions.target_groups} help={questionHelp('target_groups', pageLang)} error={errors.target_groups} onToggle={(option: string) => setAnswer('target_groups', toggleMulti(answers, 'target_groups', option))} />
                  <MultiField id={sectorSpecificQuestion} lang={pageLang} values={answers[sectorSpecificQuestion] || []} options={questionnaire.sectorQuestionOptions[sectorSpecificQuestion]} help={questionHelp(sectorSpecificQuestion, pageLang)} error={errors[sectorSpecificQuestion]} onToggle={(option: string) => setAnswer(sectorSpecificQuestion, toggleMulti(answers, sectorSpecificQuestion, option))} />
                </div>
              )}

              {step === 3 && (
                <div id="workflow-result" ref={resultTopRef} tabIndex={-1} className="mt-5 scroll-mt-32 outline-none">
                  <h2 ref={resultHeadingRef} tabIndex={-1} className="mb-5 text-2xl font-black text-slate-950 outline-none">{copy.resultTitle}</h2>
                  {!result ? (
                    <button type="button" onClick={handleCalculate} className="rounded-full bg-primary px-5 py-3 text-sm font-black text-white">{copy.calculate}</button>
                  ) : (
                    <div className="space-y-6" aria-live="polite">
                      {reportV2 && <WorkflowReportV2 report={reportV2} />}

                      <div className="workflow-result-actions no-print rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="flex flex-wrap gap-3">
                          <button ref={downloadButtonRef} type="button" onClick={openPdfModal} className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-black text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"><Download aria-hidden="true" className="mr-2 h-4 w-4" />{copy.downloadPdf}</button>
                          <button type="button" onClick={() => document.getElementById('workflow-contact-request')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="inline-flex items-center rounded-full border border-cyan-200 bg-white px-4 py-2 text-sm font-black text-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500">{copy.requestTechnicalReview}</button>
                        </div>
                      </div>

                      {showDebugAnnex && (
                        <details className="no-print rounded-2xl border border-slate-200 bg-slate-50 p-5">
                          <summary className="cursor-pointer font-black">{reportV2?.technicalExport?.label || reportSnapshot?.technicalExport?.label || 'Technical export'}</summary>
                          <p className="mt-2 text-sm text-slate-600">{reportV2?.technicalExport?.note || reportSnapshot?.technicalExport?.note}</p>
                          <button type="button" onClick={() => downloadTechnicalExport(result, reportSnapshot, reportV2)} className="mt-3 inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black">
                            <Download className="mr-2 h-4 w-4" />JSON
                          </button>
                          <pre className="mt-3 max-h-96 overflow-auto rounded-xl bg-slate-900 p-4 text-xs text-slate-100">{JSON.stringify(result, null, 2)}</pre>
                        </details>
                      )}

                      <section id="workflow-contact-request" className="workflow-advisor-contact-form no-print scroll-mt-24 rounded-2xl border border-slate-200 p-5">
                        <h2 className="text-lg font-black">{copy.contactTitle}</h2>
                        <div className="mt-4 grid gap-3 md:grid-cols-2">
                          {['name', 'email', 'company', 'countryCode', 'buyerRole', 'phone'].map((field) => (
                            <label key={field} className="block">
                              <span className="text-xs font-black uppercase text-slate-500">{CONTACT_FIELD_LABELS[field]?.[pageLang] || field}</span>
                              <input value={(contact as any)[field]} onChange={(event) => setContact((current) => ({ ...current, [field]: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-cyan-400" />
                            </label>
                          ))}
                          <label className="block">
                            <span className="text-xs font-black uppercase text-slate-500">{CONTACT_FIELD_LABELS.requestType?.[pageLang]}</span>
                            <select value={contact.requestType} onChange={(event) => setContact((current) => ({ ...current, requestType: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-cyan-400">
                              {['technical_review', 'demo', 'quote', 'distributor', 'oem', 'integration', 'other'].map((item) => <option key={item} value={item}>{REQUEST_TYPE_LABELS[item]?.[pageLang] || item}</option>)}
                            </select>
                          </label>
                          <label className="block md:col-span-2">
                            <span className="text-xs font-black uppercase text-slate-500">{CONTACT_FIELD_LABELS.comment?.[pageLang]}</span>
                            <textarea value={contact.comment} onChange={(event) => setContact((current) => ({ ...current, comment: event.target.value }))} className="mt-1 min-h-28 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-cyan-400" />
                          </label>
                        </div>
                        <label className="mt-4 flex gap-3 text-sm font-bold">
                          <input type="checkbox" checked={contactConsent} onChange={(event) => setContactConsent(event.target.checked)} className="mt-1 h-4 w-4" />
                          <span>{content.contactConsent}</span>
                        </label>
                        <label className="mt-3 flex gap-3 text-sm font-bold">
                          <input type="checkbox" checked={marketingConsent} onChange={(event) => setMarketingConsent(event.target.checked)} className="mt-1 h-4 w-4" />
                          <span>{content.marketingConsent}</span>
                        </label>
                        <p className="mt-2 text-xs font-bold text-slate-500">{copy.noMarketingNeeded}</p>
                        <button type="button" disabled={!contactConsent} onClick={submitContact} className="mt-4 rounded-full bg-primary px-5 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-50">{copy.submitContact}</button>
                      </section>
                    </div>
                  )}
                </div>
              )}

              {isPdfModalOpen && (
                <div className="workflow-advisor-modal workflow-advisor-research-modal no-print fixed inset-0 z-[110] flex items-end justify-center bg-slate-900/45 px-4 py-6 backdrop-blur-sm sm:items-center" role="dialog" aria-modal="true" aria-labelledby="workflow-pdf-share-title">
                  <div ref={modalRef} className="w-full max-w-xl rounded-2xl bg-white shadow-2xl">
                    <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">AquaVerify</p>
                        <h2 id="workflow-pdf-share-title" className="mt-1 text-xl font-black text-slate-950">{copy.shareTitle}</h2>
                      </div>
                      <button type="button" onClick={closePdfModal} className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500" aria-label={copy.cancel}>
                        <X size={18} />
                      </button>
                    </div>
                    <div className="space-y-4 px-6 py-5">
                      <p className="text-sm leading-7 text-slate-600">{copy.shareText}</p>
                      <label className="flex gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-bold text-emerald-950">
                        <input type="checkbox" checked={researchConsent} onChange={(event) => setResearchConsent(event.target.checked)} className="mt-1 h-4 w-4 rounded border-emerald-300 text-emerald-700 focus:ring-emerald-500" />
                        <span>{copy.shareCheckbox}</span>
                      </label>
                      <a className="inline-flex text-sm font-bold text-cyan-700 hover:text-cyan-900" href="https://app.aquaverify.com/legal/privacy" target="_blank" rel="noreferrer">{copy.privacyLink}</a>
                      {pdfModalError ? <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-bold text-red-800">{pdfModalError}</p> : null}
                    </div>
                    <div className="flex flex-col gap-2 border-t border-slate-100 px-6 py-5 sm:flex-row sm:justify-end">
                      <button type="button" onClick={closePdfModal} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500">{copy.cancel}</button>
                      <button type="button" onClick={downloadWithoutSharing} className="rounded-xl border border-cyan-200 bg-white px-4 py-3 text-sm font-black text-cyan-800 transition hover:bg-cyan-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500">{copy.downloadWithoutSharing}</button>
                      <button type="button" disabled={!researchConsent} onClick={shareAndDownload} className="rounded-xl bg-emerald-700 px-4 py-3 text-sm font-black text-white transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:cursor-not-allowed disabled:opacity-50">{copy.shareAndDownload}</button>
                    </div>
                  </div>
                </div>
              )}

              {saveMessage && <div className="no-print mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-bold text-slate-700">{saveMessage}</div>}

              <div className="no-print mt-8 flex justify-between">
                <button type="button" disabled={step === 0} onClick={handleBack} className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm font-black disabled:opacity-40"><ArrowLeft className="mr-2 h-4 w-4" />{copy.back}</button>
                {step < 2 ? (
                  <button type="button" onClick={handleNext} className="inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-black text-white">{copy.next}<ArrowRight className="ml-2 h-4 w-4" /></button>
                ) : step === 2 ? (
                  <button type="button" onClick={handleCalculate} className="inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-black text-white">{copy.calculate}<ArrowRight className="ml-2 h-4 w-4" /></button>
                ) : null}
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="workflow-advisor-faq bg-slate-50 py-14">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-black">FAQ</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {(content.faqs || []).map((faq: any) => (
              <article key={faq.question} className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-black">{faq.question}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .workflow-report-section {
          scroll-margin-top: 7rem;
        }
        @media print {
          @page {
            size: A4;
            margin: 10mm;
          }
          body.workflow-report-print-mode * {
            visibility: hidden !important;
          }
          body.workflow-report-print-mode .workflow-report-print,
          body.workflow-report-print-mode .workflow-report-print * {
            visibility: visible !important;
          }
          body.workflow-report-print-mode .workflow-report-print {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: none !important;
          }
          body.workflow-report-print-mode .no-print,
          body.workflow-report-print-mode .workflow-advisor-stepper,
          body.workflow-report-print-mode .workflow-advisor-landing,
          body.workflow-report-print-mode .workflow-advisor-contact-form,
          body.workflow-report-print-mode .workflow-advisor-consent,
          body.workflow-report-print-mode .workflow-advisor-modal,
          body.workflow-report-print-mode .workflow-advisor-research-modal,
          body.workflow-report-print-mode .workflow-advisor-faq,
          body.workflow-report-print-mode .workflow-advisor-cookie,
          body.workflow-report-print-mode .cookie-banner,
          body.workflow-report-print-mode nav,
          body.workflow-report-print-mode aside,
          body.workflow-report-print-mode header:not(.workflow-report-header),
          body.workflow-report-print-mode footer:not(.workflow-report-footer) {
            display: none !important;
          }
          .no-print,
          .workflow-advisor-stepper,
          .workflow-advisor-consent,
          .workflow-advisor-contact-form,
          .workflow-advisor-faq,
          .workflow-advisor-modal,
          .cookie-banner,
          nav,
          header:not(.workflow-report-header),
          footer:not(.workflow-report-footer) {
            display: none !important;
          }
          body.workflow-report-print-mode main,
          body.workflow-report-print-mode section,
          body.workflow-report-print-mode article {
            background: #fff !important;
            color: #000 !important;
            box-shadow: none !important;
          }
          body.workflow-report-print-mode .workflow-advisor-form,
          body.workflow-report-print-mode #workflow-result,
          body.workflow-report-print-mode .workflow-report-print {
            display: block !important;
          }
          body.workflow-report-print-mode .workflow-form-panel {
            border: 0 !important;
            padding: 0 !important;
          }
          body.workflow-report-print-mode .workflow-report-print {
            font-size: 10px !important;
            line-height: 1.35 !important;
          }
          body.workflow-report-print-mode .workflow-report-print > :not([hidden]) ~ :not([hidden]) {
            margin-top: 8px !important;
          }
          body.workflow-report-print-mode .workflow-report-section {
            break-inside: auto;
            page-break-inside: auto;
          }
          body.workflow-report-print-mode .workflow-report-card {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          body.workflow-report-print-mode .workflow-report-print header,
          body.workflow-report-print-mode .workflow-report-print section,
          body.workflow-report-print-mode .workflow-report-print article {
            border-radius: 8px !important;
            padding: 9px !important;
          }
          body.workflow-report-print-mode .workflow-report-print .workflow-report-header {
            padding: 14px !important;
          }
          body.workflow-report-print-mode .workflow-report-print h2 {
            font-size: 13px !important;
            margin: 0 0 4px !important;
          }
          body.workflow-report-print-mode .workflow-report-print h3,
          body.workflow-report-print-mode .workflow-report-print strong {
            font-size: 10px !important;
          }
          body.workflow-report-print-mode .workflow-report-print p,
          body.workflow-report-print-mode .workflow-report-print li,
          body.workflow-report-print-mode .workflow-report-print td,
          body.workflow-report-print-mode .workflow-report-print th,
          body.workflow-report-print-mode .workflow-report-print dd,
          body.workflow-report-print-mode .workflow-report-print dt {
            font-size: 9px !important;
            line-height: 1.35 !important;
            margin-top: 4px !important;
          }
          body.workflow-report-print-mode .workflow-report-print table,
          body.workflow-report-print-mode .workflow-report-print dl,
          body.workflow-report-print-mode .workflow-report-print ol,
          body.workflow-report-print-mode .workflow-report-print ul {
            margin-top: 6px !important;
          }
          body.workflow-report-print-mode .workflow-report-print tr,
          body.workflow-report-print-mode .workflow-report-print li {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>
    </main>
  );
};

export default WorkflowAdvisorLanding;
