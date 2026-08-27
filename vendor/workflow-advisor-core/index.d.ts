export type WorkflowAdvisorLanguage = 'en' | 'es' | 'fr' | 'it' | 'ca';
export type WorkflowProcessingPurpose = 'local_only' | 'research' | 'contact' | 'research_and_contact';
export type WorkflowRecommendationType = 'product' | 'module' | 'resource' | 'tool' | 'next_step';
export type WorkflowFitStatus = 'potential_fit' | 'conditional_fit' | 'technical_review_required';
export type WorkflowRecommendationAudience = 'client' | 'internal' | 'resource';

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
  audience?: WorkflowRecommendationAudience;
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
  reportV2?: WorkflowAdvisorReportV2;
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

export type WorkflowAdvisorIndustryProfile = {
  sectorId: string;
  labels: Record<WorkflowAdvisorLanguage, string>;
  reportTitle: Record<WorkflowAdvisorLanguage, string>;
  reportSubtitle: Record<WorkflowAdvisorLanguage, string>;
  buyerContext: Record<WorkflowAdvisorLanguage, string>;
  coreObjects: string[];
  commonRisks: Record<WorkflowAdvisorLanguage, string[]>;
  evidenceObjects: Record<WorkflowAdvisorLanguage, string[]>;
  recommendedRoadmap: Record<WorkflowAdvisorLanguage, WorkflowAdvisorReportV2Phase[]>;
  recommendedResourceIds: string[];
  recommendedGlossaryTermIds: string[];
  recommendedToolIds: string[];
  forbiddenGenericPhrases?: string[];
};

export type WorkflowAdvisorReportV2Phase = {
  phaseId: string;
  phase?: number;
  title: string;
  objective: string;
  actions: string[];
  expectedOutcome: string;
  modulesRelated?: string[];
  productsToEvaluate?: string[];
  implementationCondition?: string;
  nextStep?: string;
  relatedCapabilities: Array<string | { targetId: string; title: string }>;
};

export type WorkflowAdvisorReportV2Recommendation = {
  recommendationId: string;
  targetId: string;
  title: string;
  status: string;
  phaseId?: string;
  phaseTitle?: string;
  relatedPhase?: string;
  paragraph: string;
  problemSolved?: string;
  requiredData?: string;
  operationalOutcome?: string;
  implementationCondition?: string;
  whyNow: string;
  whatToDefine: string[];
  nextStep: string;
  showToClient: boolean;
};

export type WorkflowAdvisorReportV2MissingInformation = {
  itemId: string;
  title: string;
  whyItMatters: string;
  owner: string;
  useInReview: string;
};

export type WorkflowAdvisorReportV2PilotRecommendation = {
  title: string;
  paragraph: string;
  scope: string;
  duration: string;
  roles: string;
  evidence: string;
  expectedOutcome: string;
};

export type WorkflowAdvisorReportV2DiagnosticDetail = {
  title: string;
  status: string;
  paragraph: string;
  signals?: Record<string, string | number | boolean>;
};

export type WorkflowAdvisorReportV2OverallMaturity = {
  title: string;
  score: number;
  label: string;
  display: string;
  description: string;
  includedDimensionIds: string[];
  excludedDimensionIds: string[];
};

export type WorkflowAdvisorReportV2OperationalComplexity = {
  title: string;
  dimensionId: 'operational_complexity';
  level: number;
  label: string;
  display: string;
  description: string;
};

export type WorkflowAdvisorReportV2 = {
  reportVersion: string;
  reportKind: 'consultative_workflow_report';
  generatedAt: string;
  lang: WorkflowAdvisorLanguage;
  cover: {
    brand: string;
    title: string;
    sectorTitle: string;
    subtitle: string;
    generatedAtLabel: string;
    generatedAtLocalized: string;
    preparedByLabel: string;
    preparedBy: string;
    assessmentVersionLabel: string;
    assessmentVersion: string;
  };
  sector: { sectorId: string; label: string; url: string };
  title: string;
  subtitle: string;
  versions: Record<string, string>;
  sections: Record<string, string>;
  labels?: Record<string, string>;
  quickRead: { primaryRisk: string; immediatePriority: string; analyticalRoute: string; nextStep: string };
  quickReadItems: Array<{ id: string; label: string; value: string }>;
  executiveSummary: string[];
  overallMaturity?: WorkflowAdvisorReportV2OverallMaturity;
  operationalComplexity?: WorkflowAdvisorReportV2OperationalComplexity;
  interpretedContext: { title: string; buyerContext: string; facts: Array<{ field: string; label: string; value: string }> };
  flowDiagnosis: { paragraph: string; keySignals: string[] };
  maturity: Array<{ dimensionId: string; title: string; level: number; label: string; explanation: string; nextImprovement: string; interpretation?: string; firstImprovement?: string; aquaverifySupport?: string; relatedCapabilities?: string[]; implementationCondition?: string }>;
  priorityProblems: Array<{ problemId?: string; findingId?: string; title: string; priorityLabel: string; severity: string; paragraph: string; explanation?: string; operationalImpact?: string; improvementFocus?: string; aquaverifySupport?: string; relatedCapabilities?: string[]; nextStep?: string }>;
  improvementPlan: { phases: WorkflowAdvisorReportV2Phase[] };
  pilotRecommendation?: WorkflowAdvisorReportV2PilotRecommendation;
  recommendationSections: WorkflowAdvisorReportV2Recommendation[];
  analyticalReview: {
    title: string;
    status: string;
    paragraph: string;
    candidates: Array<{ productId: string; title: string; status: string; reason: string }>;
    nextStep: string;
    ctaLabel?: string;
  };
  missingInformation: WorkflowAdvisorReportV2MissingInformation[];
  relatedResources: Array<{ resourceId: string; type: string; typeLabel: string; title: string; description: string; url: string }>;
  diagnosticDetail?: WorkflowAdvisorReportV2DiagnosticDetail;
  limitations: string[];
  cta: { title: string; label: string; requestType: string };
  pdf: { buttonLabel: string; printLabel: string; instructions: string; mode: string; filename: string };
  technicalExport: { label: string; note: string };
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
export declare const reportV2Version: string;
export declare const REPORT_SECTIONS: Record<WorkflowAdvisorLanguage, Record<string, string>>;
export declare const REPORT_COPY: Record<WorkflowAdvisorLanguage, Record<string, unknown>>;
export declare const REPORT_TRANSLATIONS: Record<string, Record<string, Record<string, string>>>;
export declare const V2_COPY: Record<WorkflowAdvisorLanguage, Record<string, unknown>>;
export declare const V2_OPTION_LABELS: Record<WorkflowAdvisorLanguage, Record<string, string>>;
export declare const INDUSTRY_ROUTES: Record<string, Record<WorkflowAdvisorLanguage, string>>;
export declare const GLOSSARY_RESOURCE_ROUTES: Record<string, Record<WorkflowAdvisorLanguage, string>>;
export declare const workflowAdvisorIndustryProfiles: Record<string, WorkflowAdvisorIndustryProfile>;
export declare const allowedEvents: readonly string[];
export declare function calculateOverallWorkflowMaturity(scores: Array<{ dimensionId: string; level: number }>): { score: number; includedDimensionIds: string[]; excludedDimensionIds: string[]; weights: Record<string, number> };
export declare function assessWorkflow(input: WorkflowAssessmentInput): WorkflowAssessmentResult;
export declare function buildWorkflowAdvisorReport(input: { result: WorkflowAssessmentResult; answers?: Record<string, unknown>; questionnaire?: Record<string, unknown>; lang?: WorkflowAdvisorLanguage }): WorkflowAdvisorReport;
export declare function buildWorkflowAdvisorReportV2(input: { result: WorkflowAssessmentResult; answers?: Record<string, unknown>; questionnaire?: Record<string, unknown>; lang?: WorkflowAdvisorLanguage; industryProfile?: WorkflowAdvisorIndustryProfile }): WorkflowAdvisorReportV2;
export declare function validateAssessmentInput(input: Partial<WorkflowAssessmentInput>): { ok: boolean; errors: Array<Record<string, unknown>>; input: WorkflowAssessmentInput };
export declare function sanitizeAnswersForPurpose(input: Partial<WorkflowAssessmentInput>, processingPurpose: WorkflowProcessingPurpose): { ok: boolean; errors?: Array<Record<string, unknown>>; answers: Record<string, unknown> };
export declare function deriveProcessingPurpose(consents: { researchConsent?: boolean; contactConsent?: boolean }): WorkflowProcessingPurpose;
export declare function isResearchPurpose(processingPurpose: WorkflowProcessingPurpose): boolean;
export declare function isContactPurpose(processingPurpose: WorkflowProcessingPurpose): boolean;
export declare function getLocalizedText(lang?: WorkflowAdvisorLanguage): Record<string, unknown>;
export declare function getAssessmentPath(lang?: WorkflowAdvisorLanguage): string;
export declare function getSectorLabel(sectorId: string, lang?: WorkflowAdvisorLanguage): string;
export declare function createAssessmentInput(input: Partial<WorkflowAssessmentInput>): WorkflowAssessmentInput;
