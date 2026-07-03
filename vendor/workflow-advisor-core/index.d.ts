export type WorkflowAdvisorLanguage = 'en' | 'es' | 'fr' | 'it' | 'ca';
export type WorkflowProcessingPurpose = 'local_only' | 'research' | 'contact' | 'research_and_contact';
export type WorkflowRecommendationType = 'product' | 'module' | 'resource' | 'tool' | 'next_step';
export type WorkflowFitStatus = 'potential_fit' | 'conditional_fit' | 'technical_review_required';

export type WorkflowAssessmentInput = {
  questionnaireVersion: string;
  lang: WorkflowAdvisorLanguage;
  sectorId: string;
  sourceProblemId?: string;
  answers: Record<string, string | string[] | number | boolean | null>;
};

export type WorkflowRecommendation = {
  recommendationId: string;
  type: WorkflowRecommendationType;
  targetId: string;
  fitStatus: WorkflowFitStatus;
  priority: 1 | 2 | 3;
  ruleIds: string[];
  reasonKeys: string[];
  conditionKeys: string[];
  constraintKeys: string[];
  evidenceQuestionIds: string[];
};

export type WorkflowAssessmentResult = {
  assessmentVersion: string;
  questionnaireVersion: string;
  rulesVersion: string;
  catalogVersion: string;
  sectorId: string;
  sourceProblemId?: string;
  scores: Array<{ dimensionId: string; level: 1 | 2 | 3 | 4 | 5; reasonKeys: string[] }>;
  findings: Array<{ findingId: string; priority: 'high' | 'medium' | 'low'; ruleIds?: string[]; reasonKeys: string[]; evidenceQuestionIds: string[] }>;
  recommendations: WorkflowRecommendation[];
  assumptions: string[];
  constraints: string[];
  recommendedActions: Array<{ actionId: string; priority: number; reasonKeys: string[] }>;
  matchedRuleIds?: string[];
  reportSnapshot?: WorkflowAdvisorReport;
};

export type WorkflowAdvisorReport = {
  reportVersion: string;
  lang: WorkflowAdvisorLanguage;
  sections: Record<string, string>;
  sector: { sectorId: string; label: string };
  answersSnapshot: Record<string, unknown>;
  executiveSummary: string[];
  interpretedContext: { items: Array<{ label: string; value: string }> };
  flowAnalysis: { summary: string; keySignals: string[] };
  maturityAnalysis: Array<{ name: string; level: number; label: string; explanation: string; nextImprovement: string }>;
  priorityProblems: Array<{ title: string; priorityLabel: string; explanation: string }>;
  recommendationGroups: Array<{ groupId: string; title: string; recommendations: WorkflowAdvisorReportRecommendation[] }>;
  productEvaluation: WorkflowAdvisorReportRecommendation[];
  digitalModules: WorkflowAdvisorReportRecommendation[];
  implementationPlan: Array<{ phase: number; title: string; explanation: string; relatedModules: string[]; condition: string; expectedOutcome: string }>;
  missingInformation: string[];
  relatedResources: Array<{ title: string; url: string }>;
  limitations: string[];
  cta: { title: string; body: string; label: string };
  technicalExport: { label: string; note: string };
};

export type WorkflowAdvisorReportRecommendation = {
  typeLabel: string;
  title: string;
  status: string;
  statusExplanation: string;
  priority: number;
  why: string;
  improves: string;
  conditions: string[];
  constraints: string[];
  nextStep: string;
};

export declare const assessmentVersion: string;
export declare const questionnaireVersion: string;
export declare const rulesVersion: string;
export declare const catalogVersion: string;
export declare const packageVersion: string;
export declare const languages: readonly WorkflowAdvisorLanguage[];
export declare const assessmentPaths: Record<WorkflowAdvisorLanguage, string>;
export declare const processingPurposes: readonly WorkflowProcessingPurpose[];
export declare const sectors: readonly string[];
export declare const sectorLabels: Record<WorkflowAdvisorLanguage, Record<string, string>>;
export declare const buyerProblemIdsBySector: Record<string, string[]>;
export declare const transversalProblemIds: readonly string[];
export declare const questionnaire: Record<string, unknown>;
export declare const catalog: Record<string, unknown>;
export declare const rules: readonly Record<string, unknown>[];
export declare const localizedText: Record<WorkflowAdvisorLanguage, Record<string, unknown>>;
export declare const reportVersion: string;
export declare const REPORT_SECTIONS: Record<WorkflowAdvisorLanguage, Record<string, string>>;
export declare const REPORT_COPY: Record<WorkflowAdvisorLanguage, Record<string, unknown>>;
export declare const REPORT_TRANSLATIONS: Record<string, Record<string, Record<string, string>>>;
export declare const allowedEvents: readonly string[];
export declare function assessWorkflow(input: WorkflowAssessmentInput): WorkflowAssessmentResult;
export declare function buildWorkflowAdvisorReport(input: { result: WorkflowAssessmentResult; answers?: Record<string, unknown>; questionnaire?: Record<string, unknown>; lang?: WorkflowAdvisorLanguage }): WorkflowAdvisorReport;
export declare function validateAssessmentInput(input: Partial<WorkflowAssessmentInput>): { ok: boolean; errors: Array<Record<string, unknown>>; input: WorkflowAssessmentInput };
export declare function sanitizeAnswersForPurpose(input: Partial<WorkflowAssessmentInput>, processingPurpose: WorkflowProcessingPurpose): { ok: boolean; errors?: Array<Record<string, unknown>>; answers: Record<string, unknown> };
export declare function deriveProcessingPurpose(consents: { researchConsent?: boolean; contactConsent?: boolean }): WorkflowProcessingPurpose;
export declare function isResearchPurpose(processingPurpose: WorkflowProcessingPurpose): boolean;
export declare function isContactPurpose(processingPurpose: WorkflowProcessingPurpose): boolean;
export declare function getLocalizedText(lang?: WorkflowAdvisorLanguage): Record<string, unknown>;
export declare function getAssessmentPath(lang?: WorkflowAdvisorLanguage): string;
export declare function getSectorLabel(sectorId: string, lang?: WorkflowAdvisorLanguage): string;
export declare function createAssessmentInput(input: Partial<WorkflowAssessmentInput>): WorkflowAssessmentInput;
