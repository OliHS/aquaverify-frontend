import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Download, Printer, ShieldCheck } from 'lucide-react';
import type { Language } from '../../utils/translations';
import {
  assessWorkflow,
  buildWorkflowAdvisorReport,
  buyerProblemIdsBySector,
  createAssessmentInput,
  getSectorLabel,
  questionnaire,
  questionnaireVersion,
  sectors,
  type WorkflowAssessmentResult
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
    context: 'Context',
    workflow: 'Workflow',
    analytical: 'Analytical context',
    result: 'Result',
    back: 'Back',
    next: 'Next',
    calculate: 'Calculate result',
    print: 'Print',
    download: 'Download summary',
    saveResearch: 'Share for research',
    contactTitle: 'Optional contact request',
    submitContact: 'Request contact',
    saved: 'Saved for research. Keep this delete token if you may want to delete the record later:',
    localOnly: 'Local only: no answers are sent unless you choose research sharing or contact.',
    storageDisabled: 'Storage is not active on the platform yet. You can still use and print the local result.',
    contactSent: 'Contact request received.',
    privacyLink: 'Privacy policy',
    noMarketingNeeded: 'Marketing is optional and not required for contact.',
    technicalReview: 'Needs technical review'
  },
  es: {
    progress: 'Paso',
    context: 'Contexto',
    workflow: 'Flujo',
    analytical: 'Contexto analitico',
    result: 'Resultado',
    back: 'Volver',
    next: 'Siguiente',
    calculate: 'Calcular resultado',
    print: 'Imprimir',
    download: 'Descargar resumen',
    saveResearch: 'Compartir para investigacion',
    contactTitle: 'Solicitud opcional de contacto',
    submitContact: 'Solicitar contacto',
    saved: 'Guardado para investigacion. Conserva este token de borrado si quieres eliminar el registro mas adelante:',
    localOnly: 'Modo local: no se envian respuestas salvo que elijas investigacion o contacto.',
    storageDisabled: 'El almacenamiento no esta activo aun en la plataforma. Puedes usar e imprimir el resultado local.',
    contactSent: 'Solicitud de contacto recibida.',
    privacyLink: 'Politica de privacidad',
    noMarketingNeeded: 'El marketing es opcional y no es necesario para solicitar contacto.',
    technicalReview: 'Necesita revision tecnica'
  },
  fr: {
    progress: 'Etape',
    context: 'Contexte',
    workflow: 'Flux',
    analytical: 'Contexte analytique',
    result: 'Resultat',
    back: 'Retour',
    next: 'Suivant',
    calculate: 'Calculer le resultat',
    print: 'Imprimer',
    download: 'Telecharger resume',
    saveResearch: 'Partager pour recherche',
    contactTitle: 'Demande de contact optionnelle',
    submitContact: 'Demander contact',
    saved: 'Enregistre pour recherche. Gardez ce jeton de suppression si vous souhaitez supprimer l enregistrement:',
    localOnly: 'Mode local: aucune reponse n est envoyee sauf choix recherche ou contact.',
    storageDisabled: 'Le stockage n est pas encore actif sur la plateforme. Vous pouvez utiliser et imprimer le resultat local.',
    contactSent: 'Demande de contact recue.',
    privacyLink: 'Politique de confidentialite',
    noMarketingNeeded: 'Le marketing est optionnel et non requis pour le contact.',
    technicalReview: 'Revue technique necessaire'
  },
  it: {
    progress: 'Passo',
    context: 'Contesto',
    workflow: 'Flusso',
    analytical: 'Contesto analitico',
    result: 'Risultato',
    back: 'Indietro',
    next: 'Avanti',
    calculate: 'Calcola risultato',
    print: 'Stampa',
    download: 'Scarica sintesi',
    saveResearch: 'Condividi per ricerca',
    contactTitle: 'Richiesta opzionale di contatto',
    submitContact: 'Richiedi contatto',
    saved: 'Salvato per ricerca. Conserva questo token di cancellazione se vuoi eliminare il record:',
    localOnly: 'Modalita locale: nessuna risposta viene inviata salvo scelta ricerca o contatto.',
    storageDisabled: 'Lo storage non e ancora attivo sulla piattaforma. Puoi usare e stampare il risultato locale.',
    contactSent: 'Richiesta di contatto ricevuta.',
    privacyLink: 'Informativa privacy',
    noMarketingNeeded: 'Il marketing e opzionale e non serve per il contatto.',
    technicalReview: 'Revisione tecnica necessaria'
  },
  ca: {
    progress: 'Pas',
    context: 'Context',
    workflow: 'Flux',
    analytical: 'Context analitic',
    result: 'Resultat',
    back: 'Tornar',
    next: 'Seguent',
    calculate: 'Calcular resultat',
    print: 'Imprimir',
    download: 'Descarregar resum',
    saveResearch: 'Compartir per recerca',
    contactTitle: 'Sol licitud opcional de contacte',
    submitContact: 'Sol licitar contacte',
    saved: 'Desat per recerca. Conserva aquest token de supressio si vols eliminar el registre:',
    localOnly: 'Mode local: no s envien respostes llevat que triis recerca o contacte.',
    storageDisabled: 'L emmagatzematge encara no esta actiu a la plataforma. Pots usar i imprimir el resultat local.',
    contactSent: 'Sol licitud de contacte rebuda.',
    privacyLink: 'Politica de privacitat',
    noMarketingNeeded: 'El marketing es opcional i no cal per al contacte.',
    technicalReview: 'Revisio tecnica necessaria'
  }
} as const;

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

function downloadResult(result: WorkflowAssessmentResult | null, reportSnapshot: any) {
  if (!result) return;
  const blob = new Blob([JSON.stringify({
    technicalExport: {
      note: reportSnapshot?.technicalExport?.note,
      result
    },
    reportSnapshot
  }, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `aquaverify-workflow-advisor-${result.sectorId}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

const SelectField = ({ id, value, options, lang, onChange }: any) => (
  <label className="block">
    <span className="text-sm font-black text-slate-800">{fieldLabel(id, lang)}</span>
    <select
      value={value || ''}
      onChange={(event) => onChange(event.target.value)}
      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
    >
      <option value="">-</option>
      {options.map((option: string) => (
        <option key={option} value={option}>{optionLabel(option, lang)}</option>
      ))}
    </select>
  </label>
);

const MultiField = ({ id, values, options, lang, onToggle, optionLabels }: any) => (
  <fieldset>
    <legend className="text-sm font-black text-slate-800">{fieldLabel(id, lang)}</legend>
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
  </fieldset>
);

export const WorkflowAdvisorLanding: React.FC<Props> = ({ content, pageLang }) => {
  const copy = UI[pageLang] || UI.en;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(() => getInitialAnswers(pageLang));
  const [result, setResult] = useState<WorkflowAssessmentResult | null>(null);
  const [researchConsent, setResearchConsent] = useState(false);
  const [contactConsent, setContactConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [publicId, setPublicId] = useState('');
  const [contact, setContact] = useState({ name: '', email: '', company: '', countryCode: '', buyerRole: '', phone: '', requestType: 'technical_review', comment: '' });
  const sectorId = String(answers.sector_id || 'water-testing-labs');
  const buyerProblems = getIndustryBuyerProblems(sectorId, pageLang);
  const buyerProblemLabels = Object.fromEntries((buyerProblems?.problems || []).map((problem: any) => [problem.id, problem.question]));
  const priorityOptions = [...(buyerProblemIdsBySector[sectorId] || []), 'reduce_manual_transcription', 'improve_audit_evidence', 'coordinate_external_labs', 'compare_multiple_sites', 'add_new_test', 'improve_customer_visibility'];
  const sectorSpecificQuestion = sectorQuestionId(sectorId);
  const showDebugAnnex = import.meta.env.DEV;

  const resultSummary = useMemo(() => result ? {
    highFindings: result.findings.filter((finding) => finding.priority === 'high').length,
    technicalReviews: result.recommendations.filter((item) => item.fitStatus === 'technical_review_required').length
  } : null, [result]);

  const reportSnapshot = useMemo(() => {
    if (!result) return null;
    return (result as any).reportSnapshot || buildWorkflowAdvisorReport({
      result,
      answers: buildInput(pageLang, answers).answers,
      questionnaire,
      lang: pageLang
    });
  }, [answers, pageLang, result]);

  const setAnswer = (questionId: string, value: any) => {
    setAnswers((current) => ({ ...current, [questionId]: value }));
  };

  const calculate = () => {
    const input = buildInput(pageLang, answers);
    const next = assessWorkflow(input);
    setResult(next);
    setStep(3);
    window.setTimeout(() => document.getElementById('workflow-result')?.focus(), 80);
  };

  const saveAssessment = async (withContact = false) => {
    if (!result && !withContact) calculate();
    const input = buildInput(pageLang, answers);
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
          researchConsent,
          contactConsent: withContact || contactConsent,
          marketingConsent,
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
      setSaveMessage(data.deleteToken ? `${copy.saved} ${data.deleteToken}` : copy.storageDisabled);
      return data.publicId || '';
    } catch {
      setSaveMessage(copy.storageDisabled);
      return '';
    }
  };

  const submitContact = async () => {
    if (!contactConsent) return;
    const id = publicId || await saveAssessment(true);
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

  return (
    <main className="bg-white text-slate-900">
      <section className="bg-slate-950 text-white">
        <div className="container mx-auto grid min-h-[78vh] items-center gap-10 px-6 py-24 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-cyan-100">{content.eyebrow}</span>
            <h1 className="mt-5 font-heading text-4xl font-black leading-tight md:text-6xl">{content.heroTitle}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{content.directAnswer}</p>
            <a href="#workflow-advisor-tool" className="mt-8 inline-flex items-center rounded-full bg-secondary px-6 py-3 text-sm font-black text-white shadow-lg shadow-cyan-500/20">
              {content.cta}<ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="grid gap-3">
              {(content.blocks || []).slice(0, 4).map(([title, body]: [string, string]) => (
                <article key={title} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <h2 className="text-sm font-black text-white">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 py-12">
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
            <p className="mt-2 text-sm leading-7">{content.limits}</p>
          </article>
        </div>
      </section>

      <section id="workflow-advisor-tool" className="scroll-mt-24 py-14">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                {[copy.context, copy.workflow, copy.analytical, copy.result].map((label, index) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setStep(index)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-black ${step === index ? 'bg-cyan-50 text-cyan-800' : 'text-slate-500 hover:bg-slate-50'}`}
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-current text-xs">{index + 1}</span>
                    {label}
                  </button>
                ))}
              </div>
            </aside>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-700">{copy.progress} {step + 1} / 4</p>

              {step === 0 && (
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <SelectField id="sector_id" lang={pageLang} value={answers.sector_id} options={sectors} onChange={(value: string) => setAnswer('sector_id', value)} />
                  <label className="block">
                    <span className="text-sm font-black text-slate-800">{fieldLabel('country_code', pageLang)}</span>
                    <input value={String(answers.country_code || '')} onChange={(event) => setAnswer('country_code', event.target.value.toUpperCase().slice(0, 2))} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm uppercase outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100" placeholder="ES" />
                  </label>
                  <SelectField id="organization_type" lang={pageLang} value={answers.organization_type} options={questionnaire.singleChoiceOptions.organization_type} onChange={(value: string) => setAnswer('organization_type', value)} />
                  <SelectField id="buyer_role" lang={pageLang} value={answers.buyer_role} options={questionnaire.singleChoiceOptions.buyer_role} onChange={(value: string) => setAnswer('buyer_role', value)} />
                </div>
              )}

              {step === 1 && (
                <div className="mt-5 grid gap-6">
                  <div className="grid gap-5 md:grid-cols-3">
                    <SelectField id="site_count_band" lang={pageLang} value={answers.site_count_band} options={questionnaire.singleChoiceOptions.site_count_band} onChange={(value: string) => setAnswer('site_count_band', value)} />
                    <SelectField id="lab_model" lang={pageLang} value={answers.lab_model} options={questionnaire.singleChoiceOptions.lab_model} onChange={(value: string) => setAnswer('lab_model', value)} />
                    <SelectField id="sample_volume_band" lang={pageLang} value={answers.sample_volume_band} options={questionnaire.singleChoiceOptions.sample_volume_band} onChange={(value: string) => setAnswer('sample_volume_band', value)} />
                  </div>
                  <MultiField id="current_systems" lang={pageLang} values={answers.current_systems || []} options={questionnaire.multiChoiceOptions.current_systems} onToggle={(option: string) => setAnswer('current_systems', toggleMulti(answers, 'current_systems', option))} />
                  <MultiField id="digitised_stages" lang={pageLang} values={answers.digitised_stages || []} options={questionnaire.multiChoiceOptions.digitised_stages} onToggle={(option: string) => setAnswer('digitised_stages', toggleMulti(answers, 'digitised_stages', option))} />
                  <MultiField id="priority_problem_ids" lang={pageLang} values={answers.priority_problem_ids || []} options={priorityOptions} optionLabels={buyerProblemLabels} onToggle={(option: string) => setAnswer('priority_problem_ids', toggleMulti(answers, 'priority_problem_ids', option))} />
                  <MultiField id="evidence_needs" lang={pageLang} values={answers.evidence_needs || []} options={questionnaire.multiChoiceOptions.evidence_needs} onToggle={(option: string) => setAnswer('evidence_needs', toggleMulti(answers, 'evidence_needs', option))} />
                </div>
              )}

              {step === 2 && (
                <div className="mt-5 grid gap-6">
                  <div className="grid gap-5 md:grid-cols-2">
                    <SelectField id="implementation_timeline" lang={pageLang} value={answers.implementation_timeline} options={questionnaire.singleChoiceOptions.implementation_timeline} onChange={(value: string) => setAnswer('implementation_timeline', value)} />
                    <SelectField id="preferred_route" lang={pageLang} value={answers.preferred_route} options={questionnaire.singleChoiceOptions.preferred_route} onChange={(value: string) => setAnswer('preferred_route', value)} />
                    <SelectField id="result_type" lang={pageLang} value={answers.result_type} options={questionnaire.singleChoiceOptions.result_type} onChange={(value: string) => setAnswer('result_type', value)} />
                    <SelectField id="intended_use" lang={pageLang} value={answers.intended_use} options={questionnaire.singleChoiceOptions.intended_use} onChange={(value: string) => setAnswer('intended_use', value)} />
                    <SelectField id="method_context" lang={pageLang} value={answers.method_context} options={questionnaire.singleChoiceOptions.method_context} onChange={(value: string) => setAnswer('method_context', value)} />
                    <SelectField id="sample_volume_context" lang={pageLang} value={answers.sample_volume_context} options={questionnaire.singleChoiceOptions.sample_volume_context} onChange={(value: string) => setAnswer('sample_volume_context', value)} />
                  </div>
                  <MultiField id="target_groups" lang={pageLang} values={answers.target_groups || []} options={questionnaire.multiChoiceOptions.target_groups} onToggle={(option: string) => setAnswer('target_groups', toggleMulti(answers, 'target_groups', option))} />
                  <MultiField id={sectorSpecificQuestion} lang={pageLang} values={answers[sectorSpecificQuestion] || []} options={questionnaire.sectorQuestionOptions[sectorSpecificQuestion]} onToggle={(option: string) => setAnswer(sectorSpecificQuestion, toggleMulti(answers, sectorSpecificQuestion, option))} />
                </div>
              )}

              {step === 3 && (
                <div id="workflow-result" tabIndex={-1} className="mt-5 outline-none">
                  {!result ? (
                    <button type="button" onClick={calculate} className="rounded-full bg-primary px-5 py-3 text-sm font-black text-white">{copy.calculate}</button>
                  ) : (
                    <div className="space-y-6" aria-live="polite">
                      {reportSnapshot && (
                        <>
                          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-950">
                            <CheckCircle2 className="h-6 w-6" />
                            <p className="mt-3 text-xs font-black uppercase tracking-[0.16em]">{reportSnapshot.sections.result}</p>
                            <h2 className="mt-2 text-2xl font-black">{reportSnapshot.sector.label || getSectorLabel(result.sectorId, pageLang)}</h2>
                            {(reportSnapshot.executiveSummary || []).map((paragraph: string) => (
                              <p key={paragraph} className="mt-3 text-sm leading-7">{paragraph}</p>
                            ))}
                          </div>

                          <section className="grid gap-3 md:grid-cols-3">
                            <article className="rounded-2xl border border-slate-200 bg-white p-4">
                              <p className="text-xs font-black uppercase text-slate-400">{reportSnapshot.sections.quickRead}</p>
                              <strong className="mt-2 block text-2xl text-primary">{result.findings.length}</strong>
                              <span className="text-sm font-bold text-slate-500">{reportSnapshot.sections.priorityProblems}</span>
                            </article>
                            <article className="rounded-2xl border border-slate-200 bg-white p-4">
                              <p className="text-xs font-black uppercase text-slate-400">{copy.technicalReview}</p>
                              <strong className="mt-2 block text-2xl text-primary">{resultSummary?.technicalReviews || 0}</strong>
                              <span className="text-sm font-bold text-slate-500">{reportSnapshot.sections.productEvaluation}</span>
                            </article>
                            <article className="rounded-2xl border border-slate-200 bg-white p-4">
                              <p className="text-xs font-black uppercase text-slate-400">{reportSnapshot.sections.digitalModules}</p>
                              <strong className="mt-2 block text-2xl text-primary">{reportSnapshot.digitalModules?.length || 0}</strong>
                              <span className="text-sm font-bold text-slate-500">{reportSnapshot.sections.recommendations}</span>
                            </article>
                          </section>

                          <section className="grid gap-4 lg:grid-cols-2">
                            <article className="rounded-2xl border border-slate-200 p-5">
                              <h2 className="text-lg font-black">{reportSnapshot.sections.interpretedContext}</h2>
                              <dl className="mt-3 grid gap-2">
                                {(reportSnapshot.interpretedContext?.items || []).map((item: any) => (
                                  <div key={item.label} className="rounded-xl bg-slate-50 p-3">
                                    <dt className="text-xs font-black uppercase text-slate-400">{item.label}</dt>
                                    <dd className="mt-1 text-sm font-bold">{item.value}</dd>
                                  </div>
                                ))}
                              </dl>
                            </article>
                            <article className="rounded-2xl border border-slate-200 p-5">
                              <h2 className="text-lg font-black">{reportSnapshot.sections.flowAnalysis}</h2>
                              <p className="mt-3 text-sm leading-7 text-slate-600">{reportSnapshot.flowAnalysis?.summary}</p>
                              <div className="mt-4 flex flex-wrap gap-2">
                                {(reportSnapshot.flowAnalysis?.keySignals || []).map((signal: string) => (
                                  <span key={signal} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{signal}</span>
                                ))}
                              </div>
                            </article>
                          </section>

                          <section>
                            <h2 className="text-lg font-black">{reportSnapshot.sections.maturityAnalysis}</h2>
                            <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200">
                              <table className="w-full text-sm">
                                <tbody>
                                  {(reportSnapshot.maturityAnalysis || []).map((item: any) => (
                                    <tr key={item.name} className="border-t border-slate-100 align-top first:border-t-0">
                                      <td className="px-3 py-4 font-black text-primary">{item.name}<div className="mt-1 text-xs text-slate-400">{item.level} / 5 · {item.label}</div></td>
                                      <td className="px-3 py-4 text-slate-600">{item.explanation}<div className="mt-2 font-bold text-slate-700">{item.nextImprovement}</div></td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </section>

                          <section>
                            <h2 className="text-lg font-black">{reportSnapshot.sections.priorityProblems}</h2>
                            <div className="mt-3 grid gap-3 md:grid-cols-2">
                              {(reportSnapshot.priorityProblems || []).map((problem: any) => (
                                <article key={`${problem.title}-${problem.priorityLabel}`} className="rounded-2xl border border-slate-200 p-4">
                                  <p className="text-xs font-black uppercase text-cyan-700">{problem.priorityLabel}</p>
                                  <h3 className="mt-1 font-black">{problem.title}</h3>
                                  <p className="mt-2 text-sm leading-7 text-slate-600">{problem.explanation}</p>
                                </article>
                              ))}
                            </div>
                          </section>

                          <section>
                            <h2 className="text-lg font-black">{reportSnapshot.sections.recommendations}</h2>
                            <div className="mt-3 grid gap-4">
                              {(reportSnapshot.recommendationGroups || []).map((group: any) => (
                                <article key={group.groupId} className="rounded-2xl border border-slate-200 p-5">
                                  <h3 className="font-black">{group.title}</h3>
                                  <div className="mt-3 grid gap-3">
                                    {(group.recommendations || []).map((rec: any) => (
                                      <div key={`${group.groupId}-${rec.title}-${rec.status}`} className="rounded-xl bg-slate-50 p-3 text-sm">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                          <strong>{rec.title}</strong>
                                          <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-cyan-700">{rec.status}</span>
                                        </div>
                                        <p className="mt-2 leading-7 text-slate-600">{rec.why}</p>
                                        {rec.conditions?.length ? <p className="mt-2 text-xs font-bold text-slate-500">{rec.conditions.join(' ')}</p> : null}
                                        {rec.constraints?.length ? <p className="mt-2 text-xs font-bold text-rose-700">{rec.constraints.join(' ')}</p> : null}
                                      </div>
                                    ))}
                                  </div>
                                </article>
                              ))}
                            </div>
                          </section>

                          <section className="grid gap-4 lg:grid-cols-2">
                            <article className="rounded-2xl border border-slate-200 p-5">
                              <h2 className="text-lg font-black">{reportSnapshot.sections.productEvaluation}</h2>
                              {(reportSnapshot.productEvaluation || []).length ? (reportSnapshot.productEvaluation || []).map((product: any) => (
                                <div key={`${product.title}-${product.status}`} className="mt-3 rounded-xl bg-slate-50 p-3 text-sm">
                                  <strong>{product.title}</strong>
                                  <span className="ml-2 text-xs font-black text-cyan-700">{product.status}</span>
                                  <p className="mt-2 leading-7 text-slate-600">{product.statusExplanation}</p>
                                </div>
                              )) : <p className="mt-3 text-sm text-slate-500">{reportSnapshot.sections.productEvaluation}</p>}
                            </article>
                            <article className="rounded-2xl border border-slate-200 p-5">
                              <h2 className="text-lg font-black">{reportSnapshot.sections.digitalModules}</h2>
                              {(reportSnapshot.digitalModules || []).map((module: any) => (
                                <div key={module.title} className="mt-3 rounded-xl bg-slate-50 p-3 text-sm">
                                  <strong>{module.title}</strong>
                                  <p className="mt-2 leading-7 text-slate-600">{module.why}</p>
                                </div>
                              ))}
                            </article>
                          </section>

                          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                            <h2 className="font-black">{reportSnapshot.sections.implementationPlan}</h2>
                            <ol className="mt-3 grid gap-3">
                              {(reportSnapshot.implementationPlan || []).map((phase: any) => (
                                <li key={phase.phase} className="rounded-xl bg-white p-3 text-sm">
                                  <strong>{phase.phase}. {phase.title}</strong>
                                  <p className="mt-2 leading-7 text-slate-600">{phase.explanation}</p>
                                  {phase.relatedModules?.length ? <p className="mt-2 text-xs font-bold text-slate-500">{phase.relatedModules.join(' · ')}</p> : null}
                                </li>
                              ))}
                            </ol>
                          </section>

                          <section className="grid gap-4 lg:grid-cols-3">
                            <article className="rounded-2xl border border-slate-200 p-5">
                              <h2 className="font-black">{reportSnapshot.sections.missingInformation}</h2>
                              <p className="mt-3 text-sm leading-7 text-slate-600">{(reportSnapshot.missingInformation || []).join(' · ') || reportSnapshot.sections.missingInformation}</p>
                            </article>
                            <article className="rounded-2xl border border-slate-200 p-5">
                              <h2 className="font-black">{reportSnapshot.sections.relatedResources}</h2>
                              {(reportSnapshot.relatedResources || []).map((resource: any) => (
                                <p key={resource.title} className="mt-2 text-sm font-bold text-cyan-700">{resource.title}</p>
                              ))}
                            </article>
                            <article className="rounded-2xl border border-slate-200 p-5">
                              <h2 className="font-black">{reportSnapshot.sections.limitations}</h2>
                              {(reportSnapshot.limitations || []).map((item: string) => (
                                <p key={item} className="mt-2 text-sm leading-7 text-slate-600">{item}</p>
                              ))}
                            </article>
                          </section>
                        </>
                      )}

                      <div className="flex flex-wrap gap-3">
                        <button type="button" onClick={() => window.print()} className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm font-black"><Printer className="mr-2 h-4 w-4" />{copy.print}</button>
                        <button type="button" onClick={() => downloadResult(result, reportSnapshot)} className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm font-black"><Download className="mr-2 h-4 w-4" />{copy.download}</button>
                      </div>

                      {showDebugAnnex && (
                        <details className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                          <summary className="cursor-pointer font-black">{reportSnapshot?.technicalExport?.label || 'Technical export'}</summary>
                          <p className="mt-2 text-sm text-slate-600">{reportSnapshot?.technicalExport?.note}</p>
                          <pre className="mt-3 max-h-96 overflow-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100">{JSON.stringify(result, null, 2)}</pre>
                        </details>
                      )}

                      <section className="rounded-2xl border border-cyan-100 bg-cyan-50 p-5">
                        <label className="flex gap-3 text-sm font-bold text-cyan-950">
                          <input type="checkbox" checked={researchConsent} onChange={(event) => setResearchConsent(event.target.checked)} className="mt-1 h-4 w-4" />
                          <span>{content.privacyConsent} <a className="underline" href="https://app.aquaverify.com/legal/privacy">{copy.privacyLink}</a></span>
                        </label>
                        <button type="button" disabled={!researchConsent} onClick={() => saveAssessment(false)} className="mt-4 rounded-full bg-cyan-700 px-5 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-50">{copy.saveResearch}</button>
                      </section>

                      <section className="rounded-2xl border border-slate-200 p-5">
                        <h2 className="text-lg font-black">{copy.contactTitle}</h2>
                        <div className="mt-4 grid gap-3 md:grid-cols-2">
                          {['name', 'email', 'company', 'countryCode', 'buyerRole', 'phone'].map((field) => (
                            <input key={field} value={(contact as any)[field]} onChange={(event) => setContact((current) => ({ ...current, [field]: event.target.value }))} className="rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-cyan-400" placeholder={field} />
                          ))}
                          <select value={contact.requestType} onChange={(event) => setContact((current) => ({ ...current, requestType: event.target.value }))} className="rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-cyan-400">
                            {['technical_review', 'demo', 'quote', 'distributor', 'oem', 'integration', 'other'].map((item) => <option key={item} value={item}>{item.replace(/_/g, ' ')}</option>)}
                          </select>
                          <textarea value={contact.comment} onChange={(event) => setContact((current) => ({ ...current, comment: event.target.value }))} className="min-h-28 rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-cyan-400 md:col-span-2" placeholder="comment" />
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

              {saveMessage && <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-bold text-slate-700">{saveMessage}</div>}

              <div className="mt-8 flex justify-between">
                <button type="button" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))} className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm font-black disabled:opacity-40"><ArrowLeft className="mr-2 h-4 w-4" />{copy.back}</button>
                {step < 2 ? (
                  <button type="button" onClick={() => setStep((current) => current + 1)} className="inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-black text-white">{copy.next}<ArrowRight className="ml-2 h-4 w-4" /></button>
                ) : step === 2 ? (
                  <button type="button" onClick={calculate} className="inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-black text-white">{copy.calculate}<ArrowRight className="ml-2 h-4 w-4" /></button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14">
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
        @media print {
          header, footer, aside, button, nav { display: none !important; }
          main, section { background: #fff !important; color: #000 !important; }
          #workflow-result { display: block !important; }
        }
      `}</style>
    </main>
  );
};

export default WorkflowAdvisorLanding;
