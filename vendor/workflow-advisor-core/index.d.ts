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
export declare const allowedEvents: readonly string[];
export declare function assessWorkflow(input: WorkflowAssessmentInput): WorkflowAssessmentResult;
export declare function validateAssessmentInput(input: Partial<WorkflowAssessmentInput>): { ok: boolean; errors: Array<Record<string, unknown>>; input: WorkflowAssessmentInput };
export declare function sanitizeAnswersForPurpose(input: Partial<WorkflowAssessmentInput>, processingPurpose: WorkflowProcessingPurpose): { ok: boolean; errors?: Array<Record<string, unknown>>; answers: Record<string, unknown> };
export declare function deriveProcessingPurpose(consents: { researchConsent?: boolean; contactConsent?: boolean }): WorkflowProcessingPurpose;
export declare function isResearchPurpose(processingPurpose: WorkflowProcessingPurpose): boolean;
export declare function isContactPurpose(processingPurpose: WorkflowProcessingPurpose): boolean;
export declare function getLocalizedText(lang?: WorkflowAdvisorLanguage): Record<string, unknown>;
export declare function getAssessmentPath(lang?: WorkflowAdvisorLanguage): string;
export declare function getSectorLabel(sectorId: string, lang?: WorkflowAdvisorLanguage): string;
export declare function createAssessmentInput(input: Partial<WorkflowAssessmentInput>): WorkflowAssessmentInput;
