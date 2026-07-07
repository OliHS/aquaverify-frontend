import fs from 'node:fs';
import path from 'node:path';
import {
  assessWorkflow,
  buildWorkflowAdvisorReportV2,
  questionnaireVersion,
  reportV2Version
} from '../../vendor/workflow-advisor-core/index.js';

export const GENERATED_DIR = 'generated';
export const QUALITY_STATUS_PATH = path.join(GENERATED_DIR, 'workflow-advisor-quality-status.json');

export const WORKFLOW_ADVISOR_GATE_FIXTURES = [
  {
    id: 'industrial',
    lang: 'es',
    input: {
      questionnaireVersion,
      lang: 'es',
      sectorId: 'industrial-process-water',
      answers: {
        country_code: 'ES',
        organization_type: 'manufacturer',
        buyer_role: 'quality',
        site_count_band: 'two_to_five',
        lab_model: 'mixed',
        sample_volume_band: '50_to_199_month',
        current_systems: ['custom_software', 'email', 'spreadsheets'],
        digitised_stages: ['chain_of_custody', 'coa_reporting'],
        priority_problem_ids: ['connect-process-lab-and-quality', 'control-critical-process-points', 'coordinate_external_labs'],
        evidence_needs: ['chain_of_custody', 'method_traceability', 'coa', 'audit_trail', 'deviations_and_capa'],
        implementation_timeline: 'within_three_months',
        preferred_route: 'technical_review',
        target_groups: ['somatic_coliphages', 'e_coli', 'general_microbiology'],
        result_type: 'both',
        intended_use: 'operational_screening',
        method_context: 'other_reference',
        sample_volume_context: 'one_ml',
        water_use_context: ['drinking_water', 'process_water', 'reclaimed_water']
      }
    }
  },
  {
    id: 'agriculture',
    lang: 'es',
    input: {
      questionnaireVersion,
      lang: 'es',
      sectorId: 'agriculture-water',
      answers: {
        country_code: 'FR',
        organization_type: 'private_laboratory',
        buyer_role: 'executive',
        site_count_band: 'one',
        lab_model: 'internal',
        sample_volume_band: '50_to_199_month',
        current_systems: ['external_lab_portal', 'erp', 'spreadsheets'],
        digitised_stages: ['control_plan', 'technical_review', 'inventory'],
        priority_problem_ids: ['connect-water-source-to-crop-risk', 'manage-reclaimed-water-evidence', 'improve_audit_evidence'],
        evidence_needs: ['dashboards', 'method_traceability', 'coa'],
        implementation_timeline: 'within_three_months',
        preferred_route: 'authorised_distributor',
        target_groups: ['somatic_coliphages', 'f_specific_coliphages', 'e_coli', 'general_microbiology'],
        result_type: 'presence_absence',
        intended_use: 'routine_internal_control',
        method_context: 'not_defined',
        sample_volume_context: 'one_ml',
        water_use_context: ['irrigation_water', 'reclaimed_water']
      }
    }
  },
  {
    id: 'municipal',
    lang: 'es',
    input: {
      questionnaireVersion,
      lang: 'es',
      sectorId: 'municipal-water-testing',
      answers: {
        country_code: 'ES',
        organization_type: 'municipal_operator',
        buyer_role: 'operations',
        site_count_band: 'six_to_twenty',
        lab_model: 'mixed',
        sample_volume_band: '200_to_999_month',
        current_systems: ['paper', 'spreadsheets', 'external_lab_portal'],
        digitised_stages: ['sampling', 'coa_reporting'],
        priority_problem_ids: ['coordinate-network-sampling', 'manage-incidents-and-resampling', 'improve_audit_evidence'],
        evidence_needs: ['chain_of_custody', 'method_traceability', 'coa', 'audit_trail'],
        implementation_timeline: 'within_three_months',
        preferred_route: 'product_and_software',
        target_groups: ['somatic_coliphages', 'e_coli', 'general_microbiology'],
        result_type: 'both',
        intended_use: 'treatment_verification',
        method_context: 'iso_10705_2',
        sample_volume_context: 'one_hundred_ml',
        water_use_context: ['drinking_water']
      }
    }
  }
];

export function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function append(lines, value) {
  if (value === undefined || value === null || value === '') return;
  if (Array.isArray(value)) {
    value.forEach((item) => append(lines, item));
    return;
  }
  lines.push(String(value));
}

export function buildFixtureReport(fixture) {
  const result = assessWorkflow(fixture.input);
  const report = result.reportV2 || buildWorkflowAdvisorReportV2({
    result,
    answers: fixture.input.answers,
    lang: fixture.lang || fixture.input.lang || 'es'
  });
  return { fixture, result, report };
}

export function buildFixtureReports(fixtures = WORKFLOW_ADVISOR_GATE_FIXTURES) {
  return fixtures.map(buildFixtureReport);
}

export function visibleReportText(report) {
  const lines = [];
  append(lines, report.cover?.brand);
  append(lines, report.cover?.title || report.title);
  append(lines, report.cover?.sectorTitle || report.sector?.label);
  append(lines, report.cover?.subtitle || report.subtitle);
  append(lines, report.cover?.generatedAtLabel);
  append(lines, report.cover?.generatedAtLocalized);
  append(lines, report.cover?.preparedByLabel);
  append(lines, report.cover?.preparedBy);
  append(lines, report.cover?.assessmentVersionLabel);
  append(lines, report.cover?.assessmentVersion);
  append(lines, Object.values(report.sections || {}));
  append(lines, Object.values(report.labels || {}));
  append(lines, report.executiveSummary);

  for (const item of report.quickReadItems || []) {
    append(lines, item.label);
    append(lines, item.value);
  }

  append(lines, report.interpretedContext?.buyerContext);
  for (const fact of report.interpretedContext?.facts || []) {
    append(lines, fact.label);
    append(lines, fact.value);
  }

  append(lines, report.flowDiagnosis?.paragraph);
  append(lines, report.flowDiagnosis?.keySignals);

  for (const item of report.maturity || []) {
    append(lines, item.title);
    append(lines, item.level);
    append(lines, item.label);
    append(lines, item.interpretation || item.explanation);
    append(lines, item.firstImprovement || item.nextImprovement);
    append(lines, item.aquaverifySupport);
    append(lines, item.relatedCapabilities);
    append(lines, item.implementationCondition);
  }

  for (const problem of report.priorityProblems || []) {
    append(lines, problem.priorityLabel);
    append(lines, problem.title);
    append(lines, problem.explanation || problem.paragraph);
    append(lines, problem.operationalImpact);
    append(lines, problem.improvementFocus);
    append(lines, problem.aquaverifySupport);
    append(lines, problem.relatedCapabilities);
    append(lines, problem.nextStep);
  }

  for (const phase of report.improvementPlan?.phases || []) {
    append(lines, phase.phase);
    append(lines, phase.title);
    append(lines, phase.objective);
    append(lines, phase.actions);
    append(lines, phase.modulesRelated);
    append(lines, phase.productsToEvaluate);
    append(lines, phase.implementationCondition);
    append(lines, phase.expectedOutcome);
    append(lines, phase.nextStep);
  }

  for (const rec of report.recommendationSections || []) {
    append(lines, rec.phaseTitle);
    append(lines, rec.title);
    append(lines, rec.status);
    append(lines, rec.relatedPhase);
    append(lines, rec.problemSolved || rec.paragraph);
    append(lines, rec.requiredData);
    append(lines, rec.operationalOutcome);
    append(lines, rec.implementationCondition);
    append(lines, rec.whatToDefine);
  }

  append(lines, report.analyticalReview?.title);
  append(lines, report.analyticalReview?.status);
  append(lines, report.analyticalReview?.paragraph);
  append(lines, report.analyticalReview?.nextStep);
  for (const candidate of report.analyticalReview?.candidates || []) {
    append(lines, candidate.title);
    append(lines, candidate.status);
    append(lines, candidate.reason);
  }

  append(lines, report.missingInformation);
  for (const resource of report.relatedResources || []) {
    append(lines, resource.typeLabel);
    append(lines, resource.title);
    append(lines, resource.description);
  }
  append(lines, report.limitations);

  return lines.join('\n').replace(/\s+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

export function normalizeWhitespace(text) {
  return String(text || '').replace(/\s+/g, ' ').trim();
}

export function stripUrls(text) {
  return String(text || '').replace(/https?:\/\/\S+/g, '').replace(/\/[A-Za-z0-9._~:/?#[\]@!$&'()*+,;=%-]+/g, '');
}

export function writeGeneratedJson(filePath, payload) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(payload, null, 2)}\n`);
}

export function writeQualityStatus(passed, details = {}) {
  writeGeneratedJson(QUALITY_STATUS_PATH, {
    passed,
    checkedAt: new Date().toISOString().slice(0, 10),
    fixtures: WORKFLOW_ADVISOR_GATE_FIXTURES.map((fixture) => fixture.id),
    reportVersion: reportV2Version,
    ...details
  });
}

export function buildReportTextPages(report) {
  const labels = report.labels || {};
  const blocks = [
    [
      report.cover?.brand,
      report.cover?.title,
      report.cover?.sectorTitle,
      report.cover?.subtitle,
      report.cover?.generatedAtLabel,
      report.cover?.generatedAtLocalized,
      report.cover?.preparedByLabel,
      report.cover?.preparedBy
    ].filter(Boolean).join('\n'),
    [
      report.sections?.executiveSummary,
      ...(report.executiveSummary || [])
    ].filter(Boolean).join('\n'),
    [
      report.sections?.quickRead,
      ...(report.quickReadItems || []).map((item) => `${item.label}: ${item.value}`),
      report.sections?.context,
      report.interpretedContext?.buyerContext,
      ...(report.interpretedContext?.facts || []).map((fact) => `${fact.label}: ${fact.value}`),
      report.sections?.flow,
      report.flowDiagnosis?.paragraph,
      ...(report.flowDiagnosis?.keySignals || [])
    ].filter(Boolean).join('\n'),
    [
      report.sections?.maturity,
      ...(report.maturity || []).map((item) => `${item.title}. ${item.level}/5 ${item.label}. ${item.interpretation || item.explanation} ${labels.firstImprovement || ''}: ${item.firstImprovement || item.nextImprovement} ${labels.aquaverifySupport || ''}: ${item.aquaverifySupport || ''} ${labels.relatedCapabilities || ''}: ${(item.relatedCapabilities || []).join(' ')} ${labels.implementationCondition || ''}: ${item.implementationCondition || ''}`)
    ].filter(Boolean).join('\n'),
    [
      report.sections?.priorityProblems,
      ...(report.priorityProblems || []).map((problem) => `${problem.priorityLabel}. ${problem.title}. ${problem.explanation || problem.paragraph} ${labels.operationalImpact || ''}: ${problem.operationalImpact || ''} ${labels.improvementFocus || ''}: ${problem.improvementFocus || ''} ${labels.aquaverifySupport || ''}: ${problem.aquaverifySupport || ''} ${labels.relatedCapabilities || ''}: ${(problem.relatedCapabilities || []).join(' ')} ${labels.nextStep || ''}: ${problem.nextStep || ''}`)
    ].filter(Boolean).join('\n'),
    [
      report.sections?.plan,
      ...(report.improvementPlan?.phases || []).map((phase) => `${phase.phase}. ${phase.title}. ${labels.objective || ''}: ${phase.objective} ${labels.actions || ''}: ${(phase.actions || []).join(' ')} ${labels.modulesRelated || ''}: ${(phase.modulesRelated || []).join(' ')} ${(phase.productsToEvaluate || []).join(' ')} ${labels.implementationCondition || ''}: ${phase.implementationCondition || ''} ${labels.expectedOutcome || ''}: ${phase.expectedOutcome} ${labels.nextStep || ''}: ${phase.nextStep || ''}`)
    ].filter(Boolean).join('\n'),
    [
      report.sections?.digitalModules,
      ...(report.recommendationSections || []).map((rec) => `${rec.phaseTitle || ''}. ${rec.title}. ${rec.status}. ${labels.relatedPhase || ''}: ${rec.relatedPhase || ''}. ${labels.problemSolved || ''}: ${rec.problemSolved || rec.paragraph} ${labels.requiredData || ''}: ${rec.requiredData || ''} ${labels.expectedOutcome || ''}: ${rec.operationalOutcome || ''} ${labels.implementationCondition || ''}: ${rec.implementationCondition || ''} ${(rec.whatToDefine || []).join(' ')}`)
    ].filter(Boolean).join('\n'),
    [
      report.sections?.analyticalReview,
      report.analyticalReview?.title,
      report.analyticalReview?.status,
      report.analyticalReview?.paragraph,
      ...(report.analyticalReview?.candidates || []).map((candidate) => `${candidate.title}. ${candidate.status}. ${candidate.reason}`),
      report.analyticalReview?.nextStep
    ].filter(Boolean).join('\n'),
    [
      report.sections?.missingInfo,
      ...(report.missingInformation || []),
      report.sections?.relatedResources,
      ...(report.relatedResources || []).map((resource) => `${resource.typeLabel}. ${resource.title}. ${resource.description || ''}`),
      report.sections?.limitations,
      ...(report.limitations || [])
    ].filter(Boolean).join('\n')
  ]
    .map((block) => block.split('\n').map((line) => line.trimEnd()).join('\n').trim())
    .filter((block) => normalizeWhitespace(block).length > 0);

  const pages = [];
  let current = '';
  for (const block of blocks) {
    const next = current ? `${current}\n\n${block}` : block;
    if (normalizeWhitespace(next).length > 1800 && normalizeWhitespace(current).length >= 120) {
      pages.push(current);
      current = block;
    } else {
      current = next;
    }
  }
  if (normalizeWhitespace(current).length < 120 && pages.length) {
    pages[pages.length - 1] = `${pages[pages.length - 1]}\n\n${current}`;
  } else if (current) {
    pages.push(current);
  }

  return pages;
}
