import { getMarketingPagePath } from './marketingRoutes.js';

export const WORKFLOW_ADVISOR_HOME_CTA_EVENT = 'click_home_hero_workflow_advisor';
export const WORKFLOW_ADVISOR_HOME_CTA_FLAG = 'WORKFLOW_ADVISOR_HOME_CTA_ENABLED';
export const WORKFLOW_ADVISOR_REPORT_QUALITY_GATE_FLAG = 'WORKFLOW_ADVISOR_REPORT_QUALITY_GATE_REQUIRED';

export const WORKFLOW_ADVISOR_HOME_CTA_COPY = {
  en: {
    eyebrow: 'Free assessment',
    title: 'Not sure where to start?',
    body: 'Review your water microbiology, control and traceability workflow and receive initial guidance on problems, modules, products to evaluate and next steps.',
    button: 'Start free assessment',
    microcopy: 'No account required · Immediate result · Optional technical review'
  },
  es: {
    eyebrow: 'Diagnóstico gratuito',
    title: '¿No sabes por dónde empezar?',
    body: 'Analiza tu flujo de microbiología, control y trazabilidad del agua y recibe una orientación inicial sobre problemas, módulos, productos a evaluar y próximos pasos.',
    button: 'Hacer diagnóstico gratuito',
    microcopy: 'Sin registro obligatorio · Resultado inmediato · Revisión técnica opcional'
  },
  fr: {
    eyebrow: 'Diagnostic gratuit',
    title: 'Vous ne savez pas par où commencer ?',
    body: 'Analysez votre flux de microbiologie, de contrôle et de traçabilité de l’eau et recevez une première orientation sur les problèmes, modules, produits à évaluer et prochaines étapes.',
    button: 'Lancer le diagnostic gratuit',
    microcopy: 'Sans compte obligatoire · Résultat immédiat · Revue technique optionnelle'
  },
  it: {
    eyebrow: 'Valutazione gratuita',
    title: 'Non sai da dove iniziare?',
    body: 'Analizza il tuo flusso di microbiologia, controllo e tracciabilità dell’acqua e ricevi un primo orientamento su problemi, moduli, prodotti da valutare e prossimi passi.',
    button: 'Avvia la valutazione gratuita',
    microcopy: 'Nessun account obbligatorio · Risultato immediato · Revisione tecnica opzionale'
  },
  ca: {
    eyebrow: 'Diagnòstic gratuït',
    title: 'No saps per on començar?',
    body: 'Analitza el teu flux de microbiologia, control i traçabilitat de l’aigua i rep una orientació inicial sobre problemes, mòduls, productes a avaluar i passos següents.',
    button: 'Iniciar diagnòstic gratuït',
    microcopy: 'Sense registre obligatori · Resultat immediat · Revisió tècnica opcional'
  }
};

export function parseWorkflowAdvisorFlag(value, defaultValue = true) {
  if (value === undefined || value === null || value === '') return defaultValue;
  const normalized = String(value).trim().toLowerCase();
  if (['1', 'true', 'yes', 'y', 'on', 'enabled'].includes(normalized)) return true;
  if (['0', 'false', 'no', 'n', 'off', 'disabled'].includes(normalized)) return false;
  return defaultValue;
}

export function getWorkflowAdvisorFlag(name, defaultValue = true, env = {}) {
  const viteEnv = typeof import.meta !== 'undefined' ? (import.meta.env || {}) : {};
  const nodeEnv = typeof process !== 'undefined' ? (process.env || {}) : {};
  const source = {
    ...nodeEnv,
    ...viteEnv,
    ...env
  };

  return parseWorkflowAdvisorFlag(
    source[name] ?? source[`VITE_${name}`],
    defaultValue
  );
}

export function isWorkflowAdvisorHomeCtaEnabled(env = {}) {
  return getWorkflowAdvisorFlag(WORKFLOW_ADVISOR_HOME_CTA_FLAG, true, env);
}

export function isWorkflowAdvisorQualityGateRequired(env = {}) {
  return getWorkflowAdvisorFlag(WORKFLOW_ADVISOR_REPORT_QUALITY_GATE_FLAG, true, env);
}

export function resolveWorkflowAdvisorHomeCtaVisibility({
  enabled = true,
  qualityGateRequired = true,
  qualityPassed = false
} = {}) {
  if (!enabled) return false;
  if (qualityGateRequired && !qualityPassed) return false;
  return true;
}

export function getWorkflowAdvisorHomeCta(lang = 'en') {
  const normalizedLang = WORKFLOW_ADVISOR_HOME_CTA_COPY[lang] ? lang : 'en';
  return {
    ...WORKFLOW_ADVISOR_HOME_CTA_COPY[normalizedLang],
    lang: normalizedLang,
    href: getMarketingPagePath('workflow-advisor', normalizedLang),
    event: WORKFLOW_ADVISOR_HOME_CTA_EVENT
  };
}
