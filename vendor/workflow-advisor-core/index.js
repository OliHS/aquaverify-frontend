const assessmentVersion = '1.0.0';
const questionnaireVersion = 'workflow-advisor-v1';
const rulesVersion = 'workflow-advisor-rules-v1';
const catalogVersion = 'workflow-advisor-catalog-v1';
const packageVersion = '1.0.0';

const languages = Object.freeze(['en', 'es', 'fr', 'it', 'ca']);

const assessmentPaths = Object.freeze({
    en: '/water-quality-workflow-assessment',
    es: '/es/diagnostico-flujo-calidad-agua',
    fr: '/fr/diagnostic-flux-qualite-eau',
    it: '/it/valutazione-flusso-qualita-acqua',
    ca: '/ca/diagnostic-flux-qualitat-aigua'
});

const processingPurposes = Object.freeze([
    'local_only',
    'research',
    'contact',
    'research_and_contact'
]);

const sectors = Object.freeze([
    'water-testing-labs',
    'water-quality-control',
    'municipal-water-testing',
    'food-beverage-water-quality',
    'industrial-process-water',
    'facility-water-risk',
    'agriculture-water',
    'pharma-cosmetics-water',
    'hospitality-tourism-water'
]);

const sectorLabels = Object.freeze({
    en: {
        'water-testing-labs': 'Water testing laboratories',
        'water-quality-control': 'Water quality control',
        'municipal-water-testing': 'Municipal water testing',
        'food-beverage-water-quality': 'Food and beverage water quality',
        'industrial-process-water': 'Industrial process water',
        'facility-water-risk': 'Facility water risk',
        'agriculture-water': 'Agriculture water',
        'pharma-cosmetics-water': 'Pharma and cosmetics water',
        'hospitality-tourism-water': 'Hospitality, tourism and leisure water'
    },
    es: {
        'water-testing-labs': 'Laboratorios de analisis de agua',
        'water-quality-control': 'Control de calidad del agua',
        'municipal-water-testing': 'Control municipal del agua',
        'food-beverage-water-quality': 'Agua en alimentacion y bebidas',
        'industrial-process-water': 'Agua de proceso industrial',
        'facility-water-risk': 'Riesgo de agua en instalaciones',
        'agriculture-water': 'Agua agricola',
        'pharma-cosmetics-water': 'Agua en pharma y cosmetica',
        'hospitality-tourism-water': 'Agua en hosteleria, turismo y ocio'
    },
    fr: {
        'water-testing-labs': 'Laboratoires d analyse de l eau',
        'water-quality-control': 'Controle qualite de l eau',
        'municipal-water-testing': 'Controle municipal de l eau',
        'food-beverage-water-quality': 'Eau en alimentation et boissons',
        'industrial-process-water': 'Eau de procede industriel',
        'facility-water-risk': 'Risque eau dans les installations',
        'agriculture-water': 'Eau agricole',
        'pharma-cosmetics-water': 'Eau pharma et cosmetique',
        'hospitality-tourism-water': 'Eau hotellerie, tourisme et loisirs'
    },
    it: {
        'water-testing-labs': 'Laboratori di analisi dell acqua',
        'water-quality-control': 'Controllo qualita dell acqua',
        'municipal-water-testing': 'Controllo municipale dell acqua',
        'food-beverage-water-quality': 'Acqua in alimenti e bevande',
        'industrial-process-water': 'Acqua di processo industriale',
        'facility-water-risk': 'Rischio acqua nelle strutture',
        'agriculture-water': 'Acqua agricola',
        'pharma-cosmetics-water': 'Acqua pharma e cosmetica',
        'hospitality-tourism-water': 'Acqua hospitality, turismo e leisure'
    },
    ca: {
        'water-testing-labs': 'Laboratoris d analisi d aigua',
        'water-quality-control': 'Control de qualitat de l aigua',
        'municipal-water-testing': 'Control municipal de l aigua',
        'food-beverage-water-quality': 'Aigua en alimentacio i begudes',
        'industrial-process-water': 'Aigua de proces industrial',
        'facility-water-risk': 'Risc d aigua en instal lacions',
        'agriculture-water': 'Aigua agricola',
        'pharma-cosmetics-water': 'Aigua en pharma i cosmetica',
        'hospitality-tourism-water': 'Aigua en hostaleria, turisme i oci'
    }
});

const buyerProblemIdsBySector = Object.freeze({
    'water-testing-labs': [
        'increase-throughput',
        'reduce-turnaround',
        'preserve-custody',
        'improve-client-visibility',
        'add-services-with-quality'
    ],
    'water-quality-control': [
        'standardize-control-plan',
        'connect-sampling-results',
        'document-evidence-for-audits',
        'compare-sites-and-trends',
        'coordinate-internal-and-external-labs'
    ],
    'municipal-water-testing': [
        'coordinate-network-sampling',
        'preserve-public-evidence',
        'manage-incidents-and-resampling',
        'connect-utility-and-lab',
        'prepare-water-safety-plan-records'
    ],
    'food-beverage-water-quality': [
        'link-water-to-production-risk',
        'reduce-release-delays',
        'document-cip-and-rinse-evidence',
        'prepare-customer-audit-evidence',
        'coordinate-plants-and-labs'
    ],
    'industrial-process-water': [
        'control-critical-process-points',
        'avoid-fragmented-maintenance-records',
        'compare-plants-and-assets',
        'manage-reuse-and-effluent-context',
        'connect-process-lab-and-quality'
    ],
    'facility-water-risk': [
        'map-assets-and-points',
        'manage-legionella-follow-up',
        'document-maintenance-and-reopening',
        'coordinate-contractors-and-labs',
        'prioritize-risk-actions'
    ],
    'agriculture-water': [
        'connect-water-source-to-crop-risk',
        'document-seasonal-campaigns',
        'coordinate-farm-packhouse-and-lab',
        'manage-reclaimed-water-evidence',
        'prepare-export-audit-records'
    ],
    'pharma-cosmetics-water': [
        'link-water-to-batch-and-quality',
        'document-oos-and-capa',
        'protect-data-integrity',
        'coordinate-cdmo-cmo-and-labs',
        'avoid-unreviewed-wfi-assumptions'
    ],
    'hospitality-tourism-water': [
        'control-multi-site-assets',
        'manage-seasonal-reopening',
        'coordinate-pools-spas-and-rooms',
        'reduce-guest-risk-response-time',
        'standardize-chain-reporting'
    ]
});

const transversalProblemIds = Object.freeze([
    'reduce_manual_transcription',
    'improve_audit_evidence',
    'coordinate_external_labs',
    'compare_multiple_sites',
    'add_new_test',
    'improve_customer_visibility'
]);

const singleChoiceOptions = Object.freeze({
    organization_type: [
        'public_laboratory',
        'private_laboratory',
        'municipal_operator',
        'utility',
        'manufacturer',
        'facility_operator',
        'farm_or_grower',
        'cooperative',
        'hospitality_operator',
        'distributor',
        'consultant',
        'engineering_company',
        'other_not_listed'
    ],
    buyer_role: [
        'executive',
        'laboratory',
        'quality',
        'operations',
        'engineering_maintenance',
        'ehs',
        'procurement',
        'digital_it',
        'regulatory',
        'sales_distribution',
        'other_not_listed'
    ],
    site_count_band: ['one', 'two_to_five', 'six_to_twenty', 'more_than_twenty', 'unknown'],
    lab_model: ['internal', 'external', 'mixed', 'not_defined', 'not_applicable'],
    sample_volume_band: [
        'fewer_than_10_month',
        '10_to_49_month',
        '50_to_199_month',
        '200_to_999_month',
        '1000_plus_month',
        'variable',
        'unknown'
    ],
    implementation_timeline: [
        'urgent_incident',
        'within_three_months',
        'three_to_six_months',
        'six_to_twelve_months',
        'exploring',
        'unknown'
    ],
    preferred_route: [
        'product_only',
        'software_only',
        'product_and_software',
        'authorised_distributor',
        'oem_private_label',
        'technical_review',
        'not_sure'
    ],
    result_type: ['presence_absence', 'enumeration', 'both', 'not_defined'],
    intended_use: [
        'operational_screening',
        'routine_internal_control',
        'treatment_verification',
        'incident_investigation',
        'research_validation',
        'accredited_testing',
        'regulatory_reporting',
        'customer_audit_evidence',
        'not_defined'
    ],
    method_context: [
        'internal_sop',
        'iso_10705_2',
        'epa_1601',
        'epa_1602',
        'iso_9308',
        'iso_11731',
        'other_reference',
        'not_defined'
    ],
    sample_volume_context: ['one_ml', 'one_hundred_ml', 'other_volume', 'varies', 'unknown']
});

const multiChoiceOptions = Object.freeze({
    current_systems: [
        'paper',
        'spreadsheets',
        'shared_forms',
        'email',
        'external_lab_portal',
        'lims',
        'qms',
        'erp',
        'custom_software',
        'aquaverify_cloud',
        'no_defined_system'
    ],
    digitised_stages: [
        'control_plan',
        'sampling',
        'chain_of_custody',
        'reception',
        'analysis',
        'reading',
        'technical_review',
        'coa_reporting',
        'customer_delivery',
        'deviations',
        'inventory',
        'trend_analysis'
    ],
    priority_problem_ids: [],
    evidence_needs: [
        'sampling_context',
        'chain_of_custody',
        'kit_batch_traceability',
        'method_traceability',
        'technical_review',
        'coa',
        'audit_trail',
        'electronic_approval',
        'deviations_and_capa',
        'customer_portal',
        'dashboards',
        'multi_site_history',
        'inventory_traceability'
    ],
    target_groups: [
        'somatic_coliphages',
        'f_specific_coliphages',
        'e_coli',
        'total_coliforms',
        'intestinal_enterococci',
        'legionella',
        'general_microbiology',
        'chemical_water_parameters',
        'other_not_listed',
        'not_defined'
    ]
});

const sectorQuestionOptions = Object.freeze({
    water_use_context: [
        'drinking_water',
        'surface_water',
        'wastewater',
        'reclaimed_water',
        'process_water',
        'pool_spa_water',
        'irrigation_water',
        'purified_water',
        'wfi',
        'not_defined'
    ],
    laboratory_workflow_needs: [
        'new_service',
        'accredited_scope_review',
        'tat_pressure',
        'customer_portal',
        'multiple_providers',
        'reading_review',
        'plate_workflow'
    ],
    release_decision_context: [
        'batch_release',
        'line_release',
        'sanitation_release',
        'customer_audit',
        'internal_hold',
        'not_applicable'
    ],
    facility_assets: [
        'domestic_hot_water',
        'domestic_cold_water',
        'storage_tanks',
        'showers',
        'cooling_towers',
        'spas',
        'fountains',
        'humidifiers',
        'pools',
        'terminal_points'
    ],
    pharma_quality_context: [
        'purified_water',
        'wfi',
        'loop',
        'point_of_use',
        'ingredient',
        'cip_sip',
        'final_rinse',
        'batch',
        'oos',
        'capa',
        'data_integrity',
        'signature',
        'cdmo_cmo'
    ],
    hospitality_context: [
        'hotels',
        'resorts',
        'campings',
        'pools',
        'spa',
        'water_parks',
        'food_service',
        'ice',
        'rooms',
        'seasonal_reopening',
        'multi_site_chain'
    ]
});

const questionnaire = Object.freeze({
    questionnaireVersion,
    languages,
    sectors,
    requiredQuestions: [
        'sector_id',
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
        'preferred_route'
    ],
    optionalQuestions: [
        'country_code',
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
    ],
    singleChoiceOptions,
    multiChoiceOptions,
    sectorQuestionOptions,
    maxPriorityProblems: 3
});

const catalog = Object.freeze({
    version: catalogVersion,
    products: {
        'enumera-coli100': {
            family: 'ENUMERA',
            status: 'operational',
            resultTypes: ['enumeration', 'both'],
            targets: ['e_coli', 'total_coliforms'],
            methods: ['internal_sop', 'iso_9308'],
            constraints: ['constraint.review_matrix_method_country']
        },
        'enumera-soma100': {
            family: 'ENUMERA',
            status: 'operational',
            resultTypes: ['enumeration', 'both'],
            targets: ['somatic_coliphages'],
            methods: ['internal_sop', 'iso_10705_2'],
            constraints: ['constraint.review_coliphage_scope']
        },
        'enumera-entero100': {
            family: 'ENUMERA',
            status: 'technical_review',
            resultTypes: ['enumeration', 'both'],
            targets: ['intestinal_enterococci'],
            methods: ['internal_sop'],
            constraints: ['constraint.mapping_review_required']
        },
        'indica-screening': {
            family: 'INDICA',
            status: 'operational',
            resultTypes: ['presence_absence', 'both'],
            targets: ['e_coli', 'total_coliforms', 'general_microbiology'],
            methods: ['internal_sop'],
            constraints: ['constraint.screening_not_regulatory_replacement']
        },
        'plaque-soma': {
            family: 'PLAQUE',
            status: 'operational',
            resultTypes: ['enumeration', 'both'],
            targets: ['somatic_coliphages'],
            methods: ['iso_10705_2', 'internal_sop'],
            constraints: ['constraint.plate_workflow_review']
        },
        'iso-epa-kits': {
            family: 'Kits ISO/EPA',
            status: 'technical_review',
            resultTypes: ['presence_absence', 'enumeration', 'both'],
            targets: ['somatic_coliphages', 'f_specific_coliphages', 'e_coli', 'total_coliforms', 'legionella'],
            methods: ['iso_10705_2', 'epa_1601', 'epa_1602', 'iso_9308', 'iso_11731'],
            constraints: ['constraint.no_automatic_regulatory_acceptance']
        },
        'lab-essentials': {
            family: 'Lab Essentials',
            status: 'operational',
            resultTypes: ['presence_absence', 'enumeration', 'both', 'not_defined'],
            targets: ['general_microbiology', 'e_coli', 'total_coliforms', 'somatic_coliphages'],
            methods: ['internal_sop', 'other_reference', 'not_defined'],
            constraints: ['constraint.sop_and_inventory_review']
        }
    },
    modules: {
        'field-sampling': { status: 'operational', route: '/admin/lims/recepcion' },
        'sample-management': { status: 'operational', route: '/admin/lims' },
        'lims-review': { status: 'operational', route: '/admin/lims/hojas' },
        'coa-reporting': { status: 'operational', route: '/admin/lims' },
        'customer-portal': { status: 'operational', route: '/portal' },
        'inventory-traceability': { status: 'operational', route: '/admin/inventory' },
        'deviations-capa': { status: 'operational', route: '/admin/lims/validaciones' },
        dashboards: { status: 'operational', route: '/admin/dashboard' },
        crm: { status: 'operational', route: '/admin/crm' },
        aquatools: { status: 'operational', route: '/admin/lims/aquatools' },
        gis: { status: 'internal', route: '/api/geo' }
    },
    publicTools: [
        'molarity',
        'dilution',
        'unit-converter',
        'rpm-rcf',
        'cfu-calculator',
        'recovery-rpd',
        'hardness-alkalinity',
        'chemical-species-converter'
    ]
});

const rules = Object.freeze([
    {
        ruleId: 'module.sample-management.fragmented-medium-high-volume',
        version: 1,
        when: {
            all: [
                { questionId: 'current_systems', includesAny: ['paper', 'spreadsheets', 'shared_forms', 'email', 'no_defined_system'] },
                { questionId: 'sample_volume_band', includesAny: ['50_to_199_month', '200_to_999_month', '1000_plus_month', 'variable'] }
            ]
        },
        outcome: {
            type: 'module',
            targetId: 'sample-management',
            fitStatus: 'potential_fit',
            priority: 1,
            reasonKeys: ['reason.fragmented_sample_flow'],
            conditionKeys: []
        }
    },
    {
        ruleId: 'module.field-sampling.custody-or-multisite',
        version: 1,
        when: {
            any: [
                { questionId: 'evidence_needs', includesAny: ['sampling_context', 'chain_of_custody', 'multi_site_history'] },
                { questionId: 'site_count_band', includesAny: ['six_to_twenty', 'more_than_twenty'] }
            ]
        },
        outcome: {
            type: 'module',
            targetId: 'field-sampling',
            fitStatus: 'potential_fit',
            priority: 1,
            reasonKeys: ['reason.field_custody_needed'],
            conditionKeys: ['condition.define_sampling_sop']
        }
    },
    {
        ruleId: 'module.lims-review.method-reading-review-gap',
        version: 1,
        when: {
            any: [
                { questionId: 'evidence_needs', includesAny: ['method_traceability', 'technical_review', 'electronic_approval'] },
                { questionId: 'digitised_stages', excludesAll: ['technical_review', 'reading'] }
            ]
        },
        outcome: {
            type: 'module',
            targetId: 'lims-review',
            fitStatus: 'potential_fit',
            priority: 1,
            reasonKeys: ['reason.review_not_connected'],
            conditionKeys: ['condition.configure_method_and_roles']
        }
    },
    {
        ruleId: 'module.coa-reporting.audit-or-customer-evidence',
        version: 1,
        when: {
            any: [
                { questionId: 'evidence_needs', includesAny: ['coa', 'audit_trail'] },
                { questionId: 'priority_problem_ids', includesAny: ['improve-client-visibility', 'improve_customer_visibility', 'document-evidence-for-audits', 'prepare-customer-audit-evidence'] }
            ]
        },
        outcome: {
            type: 'module',
            targetId: 'coa-reporting',
            fitStatus: 'potential_fit',
            priority: 2,
            reasonKeys: ['reason.coa_evidence_needed'],
            conditionKeys: ['condition.define_report_templates']
        }
    },
    {
        ruleId: 'module.customer-portal.email-b2b-visibility',
        version: 1,
        when: {
            any: [
                { questionId: 'current_systems', includesAny: ['email', 'external_lab_portal'] },
                { questionId: 'evidence_needs', includesAny: ['customer_portal'] },
                { questionId: 'priority_problem_ids', includesAny: ['improve-client-visibility', 'improve_customer_visibility'] }
            ]
        },
        outcome: {
            type: 'module',
            targetId: 'customer-portal',
            fitStatus: 'potential_fit',
            priority: 2,
            reasonKeys: ['reason.customer_visibility_gap'],
            conditionKeys: ['condition.define_customer_scope']
        }
    },
    {
        ruleId: 'module.inventory.batch-consumable-traceability',
        version: 1,
        when: {
            any: [
                { questionId: 'evidence_needs', includesAny: ['kit_batch_traceability', 'inventory_traceability'] },
                { questionId: 'digitised_stages', excludesAll: ['inventory'] }
            ]
        },
        outcome: {
            type: 'module',
            targetId: 'inventory-traceability',
            fitStatus: 'potential_fit',
            priority: 2,
            reasonKeys: ['reason.batch_inventory_traceability'],
            conditionKeys: ['condition.load_product_batches']
        }
    },
    {
        ruleId: 'module.deviations-capa.quality-incident-followup',
        version: 1,
        when: {
            any: [
                { questionId: 'evidence_needs', includesAny: ['deviations_and_capa'] },
                { questionId: 'sector_id', includesAny: ['food-beverage-water-quality', 'facility-water-risk', 'pharma-cosmetics-water'] }
            ]
        },
        outcome: {
            type: 'module',
            targetId: 'deviations-capa',
            fitStatus: 'conditional_fit',
            priority: 2,
            reasonKeys: ['reason.deviation_closure_needed'],
            conditionKeys: ['condition.define_quality_workflow']
        }
    },
    {
        ruleId: 'module.dashboards.multi-site-trends',
        version: 1,
        when: {
            any: [
                { questionId: 'site_count_band', includesAny: ['six_to_twenty', 'more_than_twenty'] },
                { questionId: 'evidence_needs', includesAny: ['dashboards', 'multi_site_history'] },
                { questionId: 'priority_problem_ids', includesAny: ['compare-sites-and-trends', 'compare-plants-and-assets', 'compare_multiple_sites'] }
            ]
        },
        outcome: {
            type: 'module',
            targetId: 'dashboards',
            fitStatus: 'potential_fit',
            priority: 2,
            reasonKeys: ['reason.trends_and_sites'],
            conditionKeys: ['condition.define_dimensions']
        }
    },
    {
        ruleId: 'module.crm.distributor-or-b2b-followup',
        version: 1,
        when: {
            any: [
                { questionId: 'organization_type', includesAny: ['distributor', 'consultant', 'engineering_company'] },
                { questionId: 'preferred_route', includesAny: ['authorised_distributor', 'oem_private_label'] }
            ]
        },
        outcome: {
            type: 'module',
            targetId: 'crm',
            fitStatus: 'potential_fit',
            priority: 3,
            reasonKeys: ['reason.commercial_followup_needed'],
            conditionKeys: []
        }
    },
    {
        ruleId: 'tool.aquatools.calculation-support',
        version: 1,
        when: {
            any: [
                { questionId: 'target_groups', includesAny: ['chemical_water_parameters', 'general_microbiology'] },
                { questionId: 'priority_problem_ids', includesAny: ['add_new_test'] }
            ]
        },
        outcome: {
            type: 'tool',
            targetId: 'aquatools',
            fitStatus: 'potential_fit',
            priority: 3,
            reasonKeys: ['reason.calculation_support'],
            conditionKeys: []
        }
    },
    {
        ruleId: 'product.enumera.coli-enumeration',
        version: 1,
        when: {
            all: [
                { questionId: 'result_type', includesAny: ['enumeration', 'both'] },
                { questionId: 'target_groups', includesAny: ['e_coli', 'total_coliforms'] }
            ]
        },
        outcome: {
            type: 'product',
            targetId: 'enumera-coli100',
            fitStatus: 'conditional_fit',
            priority: 2,
            reasonKeys: ['reason.quantitative_indicator_workflow'],
            conditionKeys: ['condition.review_matrix_method_country']
        }
    },
    {
        ruleId: 'product.enumera.soma-enumeration',
        version: 1,
        when: {
            all: [
                { questionId: 'result_type', includesAny: ['enumeration', 'both'] },
                { questionId: 'target_groups', includesAny: ['somatic_coliphages'] }
            ]
        },
        outcome: {
            type: 'product',
            targetId: 'enumera-soma100',
            fitStatus: 'conditional_fit',
            priority: 2,
            reasonKeys: ['reason.somatic_coliphage_enumeration'],
            conditionKeys: ['condition.review_coliphage_scope']
        }
    },
    {
        ruleId: 'product.indica.presence-absence',
        version: 1,
        when: {
            all: [
                { questionId: 'result_type', includesAny: ['presence_absence', 'both'] },
                { questionId: 'target_groups', includesAny: ['e_coli', 'total_coliforms', 'general_microbiology'] }
            ]
        },
        outcome: {
            type: 'product',
            targetId: 'indica-screening',
            fitStatus: 'conditional_fit',
            priority: 2,
            reasonKeys: ['reason.presence_absence_screening'],
            conditionKeys: ['condition.screening_context_only']
        }
    },
    {
        ruleId: 'product.plaque.soma-plate-workflow',
        version: 1,
        when: {
            all: [
                { questionId: 'target_groups', includesAny: ['somatic_coliphages'] },
                { questionId: 'method_context', includesAny: ['iso_10705_2', 'internal_sop'] },
                { questionId: 'laboratory_workflow_needs', includesAny: ['plate_workflow', 'reading_review'] }
            ]
        },
        outcome: {
            type: 'product',
            targetId: 'plaque-soma',
            fitStatus: 'conditional_fit',
            priority: 3,
            reasonKeys: ['reason.plate_workflow_needed'],
            conditionKeys: ['condition.plate_equipment_review']
        }
    },
    {
        ruleId: 'product.iso-epa.method-reference',
        version: 1,
        when: {
            any: [
                { questionId: 'method_context', includesAny: ['iso_10705_2', 'epa_1601', 'epa_1602', 'iso_9308', 'iso_11731'] },
                { questionId: 'intended_use', includesAny: ['accredited_testing', 'regulatory_reporting'] }
            ]
        },
        outcome: {
            type: 'product',
            targetId: 'iso-epa-kits',
            fitStatus: 'technical_review_required',
            priority: 1,
            reasonKeys: ['reason.reference_method_context'],
            conditionKeys: ['condition.no_automatic_acceptance'],
            constraintKeys: ['constraint.no_automatic_regulatory_acceptance']
        }
    },
    {
        ruleId: 'next-step.technical-review.unknown-context',
        version: 1,
        when: {
            any: [
                { questionId: 'target_groups', includesAny: ['other_not_listed', 'not_defined'] },
                { questionId: 'result_type', includesAny: ['not_defined'] },
                { questionId: 'method_context', includesAny: ['other_reference', 'not_defined'] },
                { questionId: 'preferred_route', includesAny: ['technical_review', 'not_sure'] }
            ]
        },
        outcome: {
            type: 'next_step',
            targetId: 'technical-review',
            fitStatus: 'technical_review_required',
            priority: 1,
            reasonKeys: ['reason.context_needs_review'],
            conditionKeys: ['condition.collect_non_sensitive_context'],
            constraintKeys: ['constraint.no_compliance_score', 'constraint.insufficient_analytical_context']
        }
    }
]);

const localizedText = Object.freeze({
    en: {
        fit: {
            potential_fit: 'Potential fit',
            conditional_fit: 'Conditional fit',
            technical_review_required: 'Technical review required'
        },
        maturity: {
            workflow_maturity: 'Workflow maturity',
            traceability: 'Traceability',
            audit_readiness: 'Audit readiness',
            operational_complexity: 'Operational complexity',
            client_visibility: 'Client visibility',
            digital_readiness: 'Digital readiness',
            analytical_context_completeness: 'Analytical context completeness'
        },
        limits: 'This assessment is indicative. It does not replace laboratory evaluation, method validation or verification, the quality system, the competent authority or regulatory review by country, matrix and intended use.'
    },
    es: {
        fit: {
            potential_fit: 'Encaje potencial',
            conditional_fit: 'Encaje condicionado',
            technical_review_required: 'Revision tecnica necesaria'
        },
        maturity: {
            workflow_maturity: 'Madurez del flujo',
            traceability: 'Trazabilidad',
            audit_readiness: 'Preparacion para auditoria',
            operational_complexity: 'Complejidad operativa',
            client_visibility: 'Visibilidad para clientes',
            digital_readiness: 'Preparacion digital',
            analytical_context_completeness: 'Contexto analitico completo'
        },
        limits: 'Este diagnostico es orientativo. No sustituye la evaluacion del laboratorio, la validacion o verificacion de metodos, el sistema de calidad, la autoridad competente ni la revision regulatoria por pais, matriz y uso previsto.'
    },
    fr: {
        fit: {
            potential_fit: 'Adequation potentielle',
            conditional_fit: 'Adequation conditionnelle',
            technical_review_required: 'Revue technique necessaire'
        },
        maturity: {
            workflow_maturity: 'Maturite du flux',
            traceability: 'Tracabilite',
            audit_readiness: 'Preparation audit',
            operational_complexity: 'Complexite operationnelle',
            client_visibility: 'Visibilite client',
            digital_readiness: 'Preparation numerique',
            analytical_context_completeness: 'Contexte analytique complet'
        },
        limits: 'Ce diagnostic est indicatif. Il ne remplace pas l evaluation du laboratoire, la validation ou verification des methodes, le systeme qualite, l autorite competente ni la revue reglementaire par pays, matrice et usage prevu.'
    },
    it: {
        fit: {
            potential_fit: 'Possibile aderenza',
            conditional_fit: 'Aderenza condizionata',
            technical_review_required: 'Revisione tecnica necessaria'
        },
        maturity: {
            workflow_maturity: 'Maturita del flusso',
            traceability: 'Tracciabilita',
            audit_readiness: 'Preparazione audit',
            operational_complexity: 'Complessita operativa',
            client_visibility: 'Visibilita cliente',
            digital_readiness: 'Preparazione digitale',
            analytical_context_completeness: 'Contesto analitico completo'
        },
        limits: 'Questa valutazione e orientativa. Non sostituisce la valutazione del laboratorio, la validazione o verifica dei metodi, il sistema qualita, l autorita competente o la revisione regolatoria per paese, matrice e uso previsto.'
    },
    ca: {
        fit: {
            potential_fit: 'Encaix potencial',
            conditional_fit: 'Encaix condicionat',
            technical_review_required: 'Revisio tecnica necessaria'
        },
        maturity: {
            workflow_maturity: 'Maduresa del flux',
            traceability: 'Tracabilitat',
            audit_readiness: 'Preparacio per auditoria',
            operational_complexity: 'Complexitat operativa',
            client_visibility: 'Visibilitat per a clients',
            digital_readiness: 'Preparacio digital',
            analytical_context_completeness: 'Context analitic complet'
        },
        limits: 'Aquest diagnostic es orientatiu. No substitueix l avaluacio del laboratori, la validacio o verificacio de metodes, el sistema de qualitat, l autoritat competent ni la revisio reguladora per pais, matriu i us previst.'
    }
});

const allowedEvents = Object.freeze([
    'started',
    'step_viewed',
    'step_completed',
    'result_viewed',
    'research_saved',
    'contact_started',
    'contact_submitted',
    'resource_clicked',
    'product_clicked',
    'module_clicked'
]);

function unique(values) {
    return [...new Set(values.filter(Boolean))];
}

function asArray(value) {
    if (Array.isArray(value)) return value.map((item) => String(item || '').trim()).filter(Boolean);
    if (value === null || value === undefined || value === '') return [];
    return [String(value).trim()].filter(Boolean);
}

function cleanCode(value, max = 100) {
    return String(value || '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9_-]+/g, '_')
        .replace(/^_+|_+$/g, '')
        .slice(0, max);
}

function normalizeCountryCode(value) {
    const code = String(value || '').trim().toUpperCase();
    return /^[A-Z]{2}$/.test(code) ? code : '';
}

function getAnswer(input, questionId) {
    if (questionId === 'sector_id') return input.sectorId || input.answers?.sector_id;
    if (questionId === 'source_problem_id') return input.sourceProblemId || input.answers?.source_problem_id;
    return input.answers?.[questionId];
}

function getAnswerArray(input, questionId) {
    return asArray(getAnswer(input, questionId));
}

function conditionMatches(input, condition) {
    const values = getAnswerArray(input, condition.questionId);
    const expected = asArray(condition.includesAny || condition.equalsAny || []);
    if (condition.includesAny || condition.equalsAny) {
        return values.some((value) => expected.includes(value));
    }
    if (condition.excludesAll) {
        const excluded = asArray(condition.excludesAll);
        return excluded.every((value) => !values.includes(value));
    }
    if (condition.exists) return values.length > 0;
    if (condition.missing) return values.length === 0;
    return false;
}

function evaluateWhen(input, when) {
    if (!when) return true;
    if (Array.isArray(when.all)) return when.all.every((condition) => conditionMatches(input, condition));
    if (Array.isArray(when.any)) return when.any.some((condition) => conditionMatches(input, condition));
    return false;
}

function coerceInput(rawInput = {}) {
    const input = {
        questionnaireVersion: String(rawInput.questionnaireVersion || questionnaireVersion),
        lang: languages.includes(rawInput.lang) ? rawInput.lang : 'en',
        sectorId: cleanCode(rawInput.sectorId || rawInput.sector_id || rawInput.answers?.sector_id),
        sourceProblemId: cleanCode(rawInput.sourceProblemId || rawInput.source_problem_id || rawInput.answers?.source_problem_id),
        answers: {}
    };

    const rawAnswers = rawInput.answers && typeof rawInput.answers === 'object' ? rawInput.answers : {};
    Object.entries(rawAnswers).forEach(([key, value]) => {
        const questionId = cleanCode(key);
        if (!questionId) return;
        if (Array.isArray(value)) {
            input.answers[questionId] = unique(value.map((item) => cleanCode(item)).filter(Boolean));
        } else if (typeof value === 'number') {
            input.answers[questionId] = Number.isFinite(value) ? value : null;
        } else if (typeof value === 'boolean' || value === null) {
            input.answers[questionId] = value;
        } else {
            const cleaned = questionId === 'country_code' ? normalizeCountryCode(value) : cleanCode(value);
            input.answers[questionId] = cleaned || null;
        }
    });

    input.answers.sector_id = input.sectorId;
    if (input.sourceProblemId) input.answers.source_problem_id = input.sourceProblemId;
    return input;
}

function getAllowedPriorityProblems(sectorId) {
    return unique([...(buyerProblemIdsBySector[sectorId] || []), ...transversalProblemIds]);
}

function validateAssessmentInput(rawInput = {}) {
    const input = coerceInput(rawInput);
    const errors = [];

    if (input.questionnaireVersion !== questionnaireVersion) errors.push({ field: 'questionnaireVersion', code: 'unsupported_questionnaire_version' });
    if (!languages.includes(input.lang)) errors.push({ field: 'lang', code: 'unsupported_language' });
    if (!sectors.includes(input.sectorId)) errors.push({ field: 'sectorId', code: 'unknown_sector' });

    if (input.sourceProblemId) {
        const allowedSourceProblems = buyerProblemIdsBySector[input.sectorId] || [];
        if (!allowedSourceProblems.includes(input.sourceProblemId)) {
            errors.push({ field: 'sourceProblemId', code: 'unknown_source_problem' });
        }
    }

    Object.entries(singleChoiceOptions).forEach(([questionId, allowed]) => {
        const value = input.answers[questionId];
        if (value && !allowed.includes(value)) errors.push({ field: questionId, code: 'unknown_option' });
    });

    Object.entries(multiChoiceOptions).forEach(([questionId, baseAllowed]) => {
        const allowed = questionId === 'priority_problem_ids' ? getAllowedPriorityProblems(input.sectorId) : baseAllowed;
        const values = getAnswerArray(input, questionId);
        values.forEach((value) => {
            if (!allowed.includes(value)) errors.push({ field: questionId, code: 'unknown_option', value });
        });
        if (questionId === 'priority_problem_ids' && values.length > questionnaire.maxPriorityProblems) {
            errors.push({ field: questionId, code: 'too_many_priority_problems' });
        }
    });

    Object.entries(sectorQuestionOptions).forEach(([questionId, allowed]) => {
        getAnswerArray(input, questionId).forEach((value) => {
            if (!allowed.includes(value)) errors.push({ field: questionId, code: 'unknown_option', value });
        });
    });

    const countryCode = input.answers.country_code;
    if (countryCode && !normalizeCountryCode(countryCode)) errors.push({ field: 'country_code', code: 'invalid_country_code' });

    return { ok: errors.length === 0, errors, input };
}

function levelFromCount(count, bands) {
    if (count <= bands[0]) return 1;
    if (count <= bands[1]) return 2;
    if (count <= bands[2]) return 3;
    if (count <= bands[3]) return 4;
    return 5;
}

function computeScores(input) {
    const systems = getAnswerArray(input, 'current_systems');
    const stages = getAnswerArray(input, 'digitised_stages');
    const evidenceNeeds = getAnswerArray(input, 'evidence_needs');
    const contextAnswers = ['target_groups', 'result_type', 'intended_use', 'method_context', 'sample_volume_context', 'water_use_context']
        .map((questionId) => getAnswerArray(input, questionId))
        .filter((values) => values.length && !values.includes('not_defined') && !values.includes('unknown') && !values.includes('other_not_listed')).length;

    const paperLike = systems.some((item) => ['paper', 'spreadsheets', 'email', 'no_defined_system'].includes(item));
    const connectedSystems = systems.some((item) => ['lims', 'qms', 'erp', 'custom_software', 'aquaverify_cloud'].includes(item));
    const workflowLevel = paperLike && stages.length < 4 ? 2 : connectedSystems && stages.length >= 8 ? 4 : levelFromCount(stages.length, [1, 3, 6, 9]);
    const traceabilitySignals = ['sampling', 'chain_of_custody', 'reception', 'analysis', 'reading', 'technical_review', 'coa_reporting', 'inventory']
        .filter((item) => stages.includes(item)).length;
    const auditSignals = ['chain_of_custody', 'technical_review', 'coa_reporting', 'deviations', 'inventory']
        .filter((item) => stages.includes(item)).length;
    const siteBand = String(getAnswer(input, 'site_count_band') || 'unknown');
    const volumeBand = String(getAnswer(input, 'sample_volume_band') || 'unknown');
    const complexityLevel = Math.max(
        ['six_to_twenty', 'more_than_twenty'].includes(siteBand) ? 4 : siteBand === 'two_to_five' ? 3 : 2,
        ['200_to_999_month', '1000_plus_month'].includes(volumeBand) ? 5 : volumeBand === '50_to_199_month' ? 4 : 2
    );
    const visibilityLevel = stages.includes('customer_delivery') || systems.includes('external_lab_portal') ? 3 : evidenceNeeds.includes('customer_portal') ? 2 : 1;
    const digitalReadiness = connectedSystems ? Math.min(5, 3 + Math.floor(stages.length / 4)) : paperLike ? 2 : 3;

    return [
        { dimensionId: 'workflow_maturity', level: workflowLevel, reasonKeys: [paperLike ? 'reason.fragmented_sample_flow' : 'reason.digitised_stages_present'] },
        { dimensionId: 'traceability', level: levelFromCount(traceabilitySignals, [1, 2, 4, 6]), reasonKeys: ['reason.traceability_signal_count'] },
        { dimensionId: 'audit_readiness', level: levelFromCount(auditSignals, [0, 1, 3, 4]), reasonKeys: ['reason.audit_evidence_signal_count'] },
        { dimensionId: 'operational_complexity', level: complexityLevel, reasonKeys: ['reason.volume_sites_roles'] },
        { dimensionId: 'client_visibility', level: visibilityLevel, reasonKeys: ['reason.customer_visibility_gap'] },
        { dimensionId: 'digital_readiness', level: digitalReadiness, reasonKeys: ['reason.current_systems_readiness'] },
        { dimensionId: 'analytical_context_completeness', level: levelFromCount(contextAnswers, [1, 2, 3, 5]), reasonKeys: ['reason.analytical_context_fields'] }
    ];
}

function buildFindings(input) {
    const findings = [];
    const systems = getAnswerArray(input, 'current_systems');
    const stages = getAnswerArray(input, 'digitised_stages');
    const evidenceNeeds = getAnswerArray(input, 'evidence_needs');
    const targetGroups = getAnswerArray(input, 'target_groups');

    if (systems.some((item) => ['paper', 'spreadsheets', 'email', 'no_defined_system'].includes(item))) {
        findings.push({
            findingId: 'fragmented_manual_workflow',
            priority: 'high',
            ruleIds: ['module.sample-management.fragmented-medium-high-volume'],
            reasonKeys: ['reason.fragmented_sample_flow'],
            evidenceQuestionIds: ['current_systems', 'sample_volume_band']
        });
    }
    if (evidenceNeeds.includes('chain_of_custody') || !stages.includes('chain_of_custody')) {
        findings.push({
            findingId: 'custody_traceability_gap',
            priority: 'high',
            ruleIds: ['module.field-sampling.custody-or-multisite'],
            reasonKeys: ['reason.field_custody_needed'],
            evidenceQuestionIds: ['digitised_stages', 'evidence_needs']
        });
    }
    if (evidenceNeeds.some((item) => ['audit_trail', 'coa', 'technical_review', 'electronic_approval'].includes(item))) {
        findings.push({
            findingId: 'audit_evidence_gap',
            priority: 'medium',
            ruleIds: ['module.coa-reporting.audit-or-customer-evidence'],
            reasonKeys: ['reason.coa_evidence_needed'],
            evidenceQuestionIds: ['evidence_needs']
        });
    }
    if (evidenceNeeds.includes('customer_portal') || systems.includes('email')) {
        findings.push({
            findingId: 'client_visibility_gap',
            priority: 'medium',
            ruleIds: ['module.customer-portal.email-b2b-visibility'],
            reasonKeys: ['reason.customer_visibility_gap'],
            evidenceQuestionIds: ['current_systems', 'evidence_needs']
        });
    }
    if (!targetGroups.length || targetGroups.some((item) => ['other_not_listed', 'not_defined'].includes(item))) {
        findings.push({
            findingId: 'analytical_context_needs_review',
            priority: 'medium',
            ruleIds: ['next-step.technical-review.unknown-context'],
            reasonKeys: ['reason.context_needs_review'],
            evidenceQuestionIds: ['target_groups', 'result_type', 'method_context']
        });
    }

    return findings;
}

function enforceProductConstraints(input, recommendation) {
    if (recommendation.type !== 'product') return recommendation;

    const targetGroups = getAnswerArray(input, 'target_groups');
    const resultType = String(getAnswer(input, 'result_type') || '');
    const intendedUse = String(getAnswer(input, 'intended_use') || '');
    const method = String(getAnswer(input, 'method_context') || '');
    const waterContexts = getAnswerArray(input, 'water_use_context');
    const pharmaContexts = getAnswerArray(input, 'pharma_quality_context');
    const product = catalog.products[recommendation.targetId];
    const constraintKeys = [...recommendation.constraintKeys];
    const conditionKeys = [...recommendation.conditionKeys];

    const unknownContext = !targetGroups.length
        || targetGroups.some((item) => ['other_not_listed', 'not_defined'].includes(item))
        || !resultType
        || resultType === 'not_defined'
        || !method
        || ['not_defined', 'other_reference'].includes(method);

    const targetCovered = product && targetGroups.some((target) => product.targets.includes(target));
    const resultCovered = product && product.resultTypes.includes(resultType);
    const regulatedUse = ['accredited_testing', 'regulatory_reporting'].includes(intendedUse);
    const wfiContext = waterContexts.includes('wfi') || pharmaContexts.includes('wfi');

    if (unknownContext || !targetCovered || !resultCovered) {
        return {
            ...recommendation,
            fitStatus: 'technical_review_required',
            priority: Math.min(recommendation.priority, 2),
            conditionKeys: unique([...conditionKeys, 'condition.collect_non_sensitive_context']),
            constraintKeys: unique([...constraintKeys, 'constraint.insufficient_analytical_context'])
        };
    }

    if (regulatedUse || wfiContext || product.status === 'technical_review') {
        return {
            ...recommendation,
            fitStatus: 'technical_review_required',
            priority: Math.min(recommendation.priority, 1),
            conditionKeys: unique([...conditionKeys, 'condition.technical_and_regulatory_review']),
            constraintKeys: unique([
                ...constraintKeys,
                regulatedUse ? 'constraint.regulated_use_review' : '',
                wfiContext ? 'constraint.wfi_not_assumed' : '',
                product.status === 'technical_review' ? 'constraint.product_mapping_review' : ''
            ])
        };
    }

    return recommendation;
}

function recommendationFromRule(input, rule) {
    const outcome = rule.outcome || {};
    const evidenceQuestionIds = [];
    const collect = (condition) => {
        if (condition?.questionId) evidenceQuestionIds.push(condition.questionId);
    };
    (rule.when?.all || []).forEach(collect);
    (rule.when?.any || []).forEach(collect);

    const recommendation = {
        recommendationId: `${outcome.type}.${outcome.targetId}`,
        type: outcome.type,
        targetId: outcome.targetId,
        fitStatus: outcome.fitStatus || 'conditional_fit',
        priority: outcome.priority || 3,
        ruleIds: [rule.ruleId],
        reasonKeys: outcome.reasonKeys || [],
        conditionKeys: outcome.conditionKeys || [],
        constraintKeys: outcome.constraintKeys || [],
        evidenceQuestionIds: unique(evidenceQuestionIds)
    };
    return enforceProductConstraints(input, recommendation);
}

function mergeRecommendations(recommendations) {
    const byId = new Map();
    recommendations.forEach((item) => {
        const existing = byId.get(item.recommendationId);
        if (!existing) {
            byId.set(item.recommendationId, item);
            return;
        }
        const fitRank = { technical_review_required: 0, conditional_fit: 1, potential_fit: 2 };
        const mergedFit = fitRank[item.fitStatus] < fitRank[existing.fitStatus] ? item.fitStatus : existing.fitStatus;
        byId.set(item.recommendationId, {
            ...existing,
            fitStatus: mergedFit,
            priority: Math.min(existing.priority, item.priority),
            ruleIds: unique([...existing.ruleIds, ...item.ruleIds]),
            reasonKeys: unique([...existing.reasonKeys, ...item.reasonKeys]),
            conditionKeys: unique([...existing.conditionKeys, ...item.conditionKeys]),
            constraintKeys: unique([...existing.constraintKeys, ...item.constraintKeys]),
            evidenceQuestionIds: unique([...existing.evidenceQuestionIds, ...item.evidenceQuestionIds])
        });
    });
    return [...byId.values()].sort((a, b) => a.priority - b.priority || a.type.localeCompare(b.type) || a.targetId.localeCompare(b.targetId));
}

function buildRecommendedActions(scores, findings, recommendations) {
    const actions = [];
    const workflow = scores.find((score) => score.dimensionId === 'workflow_maturity');
    const traceability = scores.find((score) => score.dimensionId === 'traceability');
    if ((workflow?.level || 1) <= 2) actions.push({ actionId: 'standardize-sample-workflow', priority: 1, reasonKeys: ['reason.fragmented_sample_flow'] });
    if ((traceability?.level || 1) <= 3) actions.push({ actionId: 'connect-custody-method-batch', priority: 2, reasonKeys: ['reason.field_custody_needed'] });
    if (recommendations.some((item) => item.targetId === 'lims-review')) actions.push({ actionId: 'connect-reading-and-review', priority: 3, reasonKeys: ['reason.review_not_connected'] });
    if (recommendations.some((item) => item.targetId === 'customer-portal' || item.targetId === 'coa-reporting')) actions.push({ actionId: 'improve-report-delivery', priority: 4, reasonKeys: ['reason.coa_evidence_needed'] });
    if (findings.some((item) => item.findingId === 'analytical_context_needs_review')) actions.push({ actionId: 'schedule-technical-review', priority: 5, reasonKeys: ['reason.context_needs_review'] });
    actions.push({ actionId: 'scale-with-trends-and-dashboard', priority: 6, reasonKeys: ['reason.trends_and_sites'] });
    return mergeRecommendations(actions.map((action) => ({
        recommendationId: action.actionId,
        ...action,
        type: 'action',
        targetId: action.actionId,
        fitStatus: 'potential_fit',
        ruleIds: [],
        conditionKeys: [],
        constraintKeys: [],
        evidenceQuestionIds: []
    }))).slice(0, 5).map((item) => ({
        actionId: item.targetId,
        priority: item.priority,
        reasonKeys: item.reasonKeys
    }));
}

function assessWorkflow(rawInput = {}) {
    const validation = validateAssessmentInput(rawInput);
    if (!validation.ok) {
        const error = new Error('workflow_advisor_input_invalid');
        error.code = 'workflow_advisor_input_invalid';
        error.validation = validation;
        throw error;
    }

    const input = validation.input;
    const matchedRules = rules.filter((rule) => evaluateWhen(input, rule.when));
    const recommendations = mergeRecommendations(matchedRules.map((rule) => recommendationFromRule(input, rule)));
    const scores = computeScores(input);
    const findings = buildFindings(input);
    const constraints = unique(recommendations.flatMap((item) => item.constraintKeys));
    const assumptions = unique([
        'assumption.structured_answers_only',
        input.sourceProblemId ? 'assumption.source_problem_preselected' : '',
        'assumption.no_regulatory_acceptance_inferred'
    ]);

    return {
        assessmentVersion,
        questionnaireVersion,
        rulesVersion,
        catalogVersion,
        sectorId: input.sectorId,
        sourceProblemId: input.sourceProblemId || undefined,
        scores,
        findings,
        recommendations,
        assumptions,
        constraints,
        recommendedActions: buildRecommendedActions(scores, findings, recommendations),
        matchedRuleIds: matchedRules.map((rule) => rule.ruleId)
    };
}

function sanitizeAnswersForPurpose(rawInput = {}, processingPurpose = 'local_only') {
    const validation = validateAssessmentInput(rawInput);
    if (!validation.ok) return { ok: false, errors: validation.errors, answers: {} };
    const input = validation.input;
    const allowedQuestionIds = new Set([
        'sector_id',
        'source_problem_id',
        'country_code',
        ...questionnaire.requiredQuestions,
        ...questionnaire.optionalQuestions
    ]);

    const answers = {};
    if (processingPurpose === 'local_only') return { ok: true, answers };

    Object.entries(input.answers).forEach(([questionId, value]) => {
        if (!allowedQuestionIds.has(questionId)) return;
        if (typeof value === 'string') answers[questionId] = cleanCode(value);
        else if (Array.isArray(value)) answers[questionId] = unique(value.map((item) => cleanCode(item)).filter(Boolean));
        else if (typeof value === 'number' && Number.isFinite(value)) answers[questionId] = value;
        else if (typeof value === 'boolean' || value === null) answers[questionId] = value;
    });

    return { ok: true, answers };
}

function deriveProcessingPurpose({ researchConsent, contactConsent } = {}) {
    const research = researchConsent === true;
    const contact = contactConsent === true;
    if (research && contact) return 'research_and_contact';
    if (research) return 'research';
    if (contact) return 'contact';
    return 'local_only';
}

function isResearchPurpose(processingPurpose) {
    return processingPurpose === 'research' || processingPurpose === 'research_and_contact';
}

function isContactPurpose(processingPurpose) {
    return processingPurpose === 'contact' || processingPurpose === 'research_and_contact';
}

function getLocalizedText(lang = 'en') {
    return localizedText[lang] || localizedText.en;
}

function getAssessmentPath(lang = 'en') {
    return assessmentPaths[lang] || assessmentPaths.en;
}

function getSectorLabel(sectorId, lang = 'en') {
    return (sectorLabels[lang] && sectorLabels[lang][sectorId]) || sectorLabels.en[sectorId] || sectorId;
}

function createAssessmentInput({ lang, sectorId, sourceProblemId, answers }) {
    return coerceInput({ questionnaireVersion, lang, sectorId, sourceProblemId, answers });
}

export { 
    assessmentVersion,
    questionnaireVersion,
    rulesVersion,
    catalogVersion,
    packageVersion,
    languages,
    assessmentPaths,
    processingPurposes,
    sectors,
    sectorLabels,
    buyerProblemIdsBySector,
    transversalProblemIds,
    questionnaire,
    catalog,
    rules,
    localizedText,
    allowedEvents,
    assessWorkflow,
    validateAssessmentInput,
    sanitizeAnswersForPurpose,
    deriveProcessingPurpose,
    isResearchPurpose,
    isContactPurpose,
    getLocalizedText,
    getAssessmentPath,
    getSectorLabel,
    createAssessmentInput

};