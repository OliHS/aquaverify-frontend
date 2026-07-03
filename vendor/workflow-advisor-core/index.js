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
                { questionId: 'evidence_needs', includesAny: ['coa', 'audit_trail', 'technical_review', 'electronic_approval'] },
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
            potential_fit: 'Potenziale adeguatezza',
            conditional_fit: 'Adeguatezza condizionata',
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

const reportVersion = 'workflow-advisor-report-v1';

const REPORT_SECTIONS = Object.freeze({
    en: {
        result: 'Assessment result',
        executiveSummary: 'Executive summary',
        interpretedContext: 'What we understood about your workflow',
        flowAnalysis: 'Current workflow analysis',
        priorityProblems: 'Priority problems identified',
        maturityAnalysis: 'Maturity by dimension',
        recommendations: 'Improvement recommendations',
        productEvaluation: 'Products to evaluate',
        digitalModules: 'Recommended digital modules',
        implementationPlan: 'Suggested improvement plan',
        missingInformation: 'Information needed to refine the recommendation',
        relatedResources: 'Related resources',
        limitations: 'Assessment limitations',
        cta: 'Request technical review',
        quickRead: 'Quick read',
        technicalExport: 'Technical export',
        technicalExportNote: 'This JSON is a technical export, not the consultative report.'
    },
    es: {
        result: 'Resultado del diagnostico',
        executiveSummary: 'Resumen ejecutivo',
        interpretedContext: 'Lo que hemos entendido de tu flujo',
        flowAnalysis: 'Analisis del flujo actual',
        priorityProblems: 'Problemas prioritarios detectados',
        maturityAnalysis: 'Madurez por dimensiones',
        recommendations: 'Recomendaciones de mejora',
        productEvaluation: 'Productos a evaluar',
        digitalModules: 'Modulos digitales recomendados',
        implementationPlan: 'Plan de mejora sugerido',
        missingInformation: 'Informacion que falta para afinar la recomendacion',
        relatedResources: 'Recursos relacionados',
        limitations: 'Limitaciones del diagnostico',
        cta: 'Solicitar revision tecnica',
        quickRead: 'Lectura rapida',
        technicalExport: 'Exportacion tecnica',
        technicalExportNote: 'Este JSON es una exportacion tecnica, no el informe consultivo.'
    },
    fr: {
        result: 'Resultat du diagnostic',
        executiveSummary: 'Resume executif',
        interpretedContext: 'Ce que nous avons compris de votre flux',
        flowAnalysis: 'Analyse du flux actuel',
        priorityProblems: 'Problemes prioritaires identifies',
        maturityAnalysis: 'Maturite par dimension',
        recommendations: 'Recommandations d amelioration',
        productEvaluation: 'Produits a evaluer',
        digitalModules: 'Modules numeriques recommandes',
        implementationPlan: 'Plan d amelioration suggere',
        missingInformation: 'Informations necessaires pour affiner la recommandation',
        relatedResources: 'Ressources associees',
        limitations: 'Limites du diagnostic',
        cta: 'Demander une revue technique',
        quickRead: 'Lecture rapide',
        technicalExport: 'Export technique',
        technicalExportNote: 'Ce JSON est un export technique, pas le rapport consultatif.'
    },
    it: {
        result: 'Risultato della valutazione',
        executiveSummary: 'Sintesi esecutiva',
        interpretedContext: 'Cosa abbiamo compreso del tuo flusso',
        flowAnalysis: 'Analisi del flusso attuale',
        priorityProblems: 'Problemi prioritari identificati',
        maturityAnalysis: 'Maturita per dimensione',
        recommendations: 'Raccomandazioni di miglioramento',
        productEvaluation: 'Prodotti da valutare',
        digitalModules: 'Moduli digitali consigliati',
        implementationPlan: 'Piano di miglioramento suggerito',
        missingInformation: 'Informazioni necessarie per affinare la raccomandazione',
        relatedResources: 'Risorse correlate',
        limitations: 'Limiti della valutazione',
        cta: 'Richiedi revisione tecnica',
        quickRead: 'Lettura rapida',
        technicalExport: 'Esportazione tecnica',
        technicalExportNote: 'Questo JSON e una esportazione tecnica, non il report consultivo.'
    },
    ca: {
        result: 'Resultat del diagnostic',
        executiveSummary: 'Resum executiu',
        interpretedContext: 'El que hem entes del teu flux',
        flowAnalysis: 'Analisi del flux actual',
        priorityProblems: 'Problemes prioritaris detectats',
        maturityAnalysis: 'Maduresa per dimensio',
        recommendations: 'Recomanacions de millora',
        productEvaluation: 'Productes a avaluar',
        digitalModules: 'Moduls digitals recomanats',
        implementationPlan: 'Pla de millora suggerit',
        missingInformation: 'Informacio necessaria per afinar la recomanacio',
        relatedResources: 'Recursos relacionats',
        limitations: 'Limitacions del diagnostic',
        cta: 'Sol licitar revisio tecnica',
        quickRead: 'Lectura rapida',
        technicalExport: 'Exportacio tecnica',
        technicalExportNote: 'Aquest JSON es una exportacio tecnica, no l informe consultiu.'
    }
});

const REPORT_COPY = Object.freeze({
    en: {
        notIndicated: 'not indicated',
        levelLabels: ['Very limited', 'Basic', 'Partially structured', 'Structured', 'Advanced'],
        priority: { high: 'High priority', medium: 'Medium priority', low: 'Low priority' },
        type: { module: 'Digital module', product: 'Product', tool: 'Tool', resource: 'Resource', next_step: 'Technical next step', action: 'Improvement action' },
        groups: {
            operational: 'Operational route',
            digital: 'Digital route',
            analytical: 'Analytical route',
            reporting: 'Reporting and visibility',
            review: 'Technical review'
        },
        verbs: {
            why: 'Why it appears',
            improves: 'What it would improve',
            conditions: 'Conditions',
            constraints: 'What should not be assumed',
            next: 'Suggested next step',
            expected: 'Expected result'
        },
        summaryLead: 'This diagnosis points to a water workflow with {context} and {complexity}. The answers suggest that the flow can work in normal conditions, but it still needs a clearer connection between sampling point, custody, method, reading, review and report.',
        contextStrong: 'a well defined analytical context',
        contextWeak: 'analytical context still to be clarified',
        complexityHigh: 'high operational complexity',
        complexityLow: 'moderate operational complexity',
        summarySecond: 'The priority should be to secure a single history for each sample before expanding towards dashboards, trend views or broader customer visibility.',
        flow: 'The current workflow shows signals of separate records across sample capture, laboratory handling, review and reporting. A professional improvement plan should connect the operational route before adding visibility layers.',
        noProducts: 'No product is presented as a closed recommendation from this assessment. Product selection needs technical review of matrix, method, volume, country and intended use.',
        ctaBody: 'Share the structured result with AquaVerify so a specialist can review matrix, method, product route, digital modules and next steps.',
        limitations: [
            'This assessment uses structured answers only. It does not review SOPs, real data, laboratory reports or internal documentation.',
            'No automatic regulatory acceptance is inferred. Any standards-based use must be reviewed by country, matrix, method, laboratory scope and competent authority.',
            'The result is consultative and does not replace method validation, the quality system or technical sign-off.'
        ]
    },
    es: {
        notIndicated: 'no indicado',
        levelLabels: ['Muy limitado', 'Basico', 'Parcialmente estructurado', 'Estructurado', 'Avanzado'],
        priority: { high: 'Prioridad alta', medium: 'Prioridad media', low: 'Prioridad baja' },
        type: { module: 'Modulo digital', product: 'Producto', tool: 'Herramienta', resource: 'Recurso', next_step: 'Siguiente paso tecnico', action: 'Accion de mejora' },
        groups: {
            operational: 'Ruta operativa',
            digital: 'Ruta digital',
            analytical: 'Ruta analitica',
            reporting: 'Reporting y visibilidad',
            review: 'Revision tecnica'
        },
        verbs: {
            why: 'Por que aparece',
            improves: 'Que mejoraria',
            conditions: 'Condiciones',
            constraints: 'Que no debe asumirse',
            next: 'Siguiente paso',
            expected: 'Resultado esperado'
        },
        summaryLead: 'Este diagnostico apunta a un programa de agua con {context} y {complexity}. Las respuestas sugieren que el flujo puede funcionar en condiciones normales, pero todavia necesita conectar mejor punto de muestreo, custodia, metodo, lectura, revision e informe.',
        contextStrong: 'contexto analitico bien definido',
        contextWeak: 'contexto analitico aun por precisar',
        complexityHigh: 'complejidad operativa alta',
        complexityLow: 'complejidad operativa moderada',
        summarySecond: 'La prioridad deberia ser asegurar un historial unico por muestra antes de ampliar hacia dashboards, tendencias o mayor visibilidad para clientes.',
        flow: 'El flujo actual muestra senales de registros separados entre captura de muestra, gestion de laboratorio, revision y reporting. La mejora profesional deberia conectar primero la ruta operativa antes de anadir capas de visibilidad.',
        noProducts: 'Ningun producto se presenta como recomendacion cerrada desde este diagnostico. La seleccion requiere revision tecnica de matriz, metodo, volumen, pais y uso previsto.',
        ctaBody: 'Comparte el resultado estructurado con AquaVerify para que un especialista revise matriz, metodo, ruta de producto, modulos digitales y siguientes pasos.',
        limitations: [
            'Este diagnostico se basa solo en respuestas estructuradas. No se han revisado SOP, datos reales, informes de laboratorio ni documentacion interna.',
            'No se infiere aceptacion regulatoria automatica. Cualquier uso sujeto a norma debe revisarse por pais, matriz, metodo, alcance del laboratorio y autoridad competente.',
            'El resultado es consultivo y no sustituye validacion de metodo, sistema de calidad ni aprobacion tecnica.'
        ]
    },
    fr: {
        notIndicated: 'non indique',
        levelLabels: ['Tres limite', 'Basique', 'Partiellement structure', 'Structure', 'Avance'],
        priority: { high: 'Priorite elevee', medium: 'Priorite moyenne', low: 'Priorite basse' },
        type: { module: 'Module numerique', product: 'Produit', tool: 'Outil', resource: 'Ressource', next_step: 'Etape technique', action: 'Action d amelioration' },
        groups: {
            operational: 'Route operationnelle',
            digital: 'Route numerique',
            analytical: 'Route analytique',
            reporting: 'Reporting et visibilite',
            review: 'Revue technique'
        },
        verbs: {
            why: 'Pourquoi cela apparait',
            improves: 'Ce que cela ameliorerait',
            conditions: 'Conditions',
            constraints: 'Ce qu il ne faut pas supposer',
            next: 'Prochaine etape',
            expected: 'Resultat attendu'
        },
        summaryLead: 'Ce diagnostic indique un programme eau avec {context} et {complexity}. Les reponses suggerent que le flux peut fonctionner en conditions normales, mais qu il doit mieux relier point de prelevement, garde, methode, lecture, revue et rapport.',
        contextStrong: 'un contexte analytique bien defini',
        contextWeak: 'un contexte analytique a preciser',
        complexityHigh: 'une complexite operationnelle elevee',
        complexityLow: 'une complexite operationnelle moderee',
        summarySecond: 'La priorite devrait etre de securiser un historique unique par echantillon avant d etendre vers dashboards, tendances ou visibilite client.',
        flow: 'Le flux actuel montre des signaux de registres separes entre prelevement, gestion laboratoire, revue et reporting. L amelioration doit d abord connecter la route operationnelle avant d ajouter des couches de visibilite.',
        noProducts: 'Aucun produit n est presente comme recommandation fermee par ce diagnostic. La selection demande une revue technique de matrice, methode, volume, pays et usage prevu.',
        ctaBody: 'Partagez le resultat structure avec AquaVerify pour qu un specialiste revoie matrice, methode, route produit, modules numeriques et prochaines etapes.',
        limitations: [
            'Ce diagnostic repose uniquement sur des reponses structurees. Les SOP, donnees reelles, rapports laboratoire et documents internes ne sont pas revus.',
            'Aucune acceptation reglementaire automatique n est deduite. Tout usage lie a une norme doit etre revu par pays, matrice, methode, portee laboratoire et autorite competente.',
            'Le resultat est consultatif et ne remplace pas validation de methode, systeme qualite ni approbation technique.'
        ]
    },
    it: {
        notIndicated: 'non indicato',
        levelLabels: ['Molto limitato', 'Base', 'Parzialmente strutturato', 'Strutturato', 'Avanzato'],
        priority: { high: 'Priorita alta', medium: 'Priorita media', low: 'Priorita bassa' },
        type: { module: 'Modulo digitale', product: 'Prodotto', tool: 'Strumento', resource: 'Risorsa', next_step: 'Passo tecnico', action: 'Azione di miglioramento' },
        groups: {
            operational: 'Percorso operativo',
            digital: 'Percorso digitale',
            analytical: 'Percorso analitico',
            reporting: 'Reporting e visibilita',
            review: 'Revisione tecnica'
        },
        verbs: {
            why: 'Perche appare',
            improves: 'Cosa migliorerebbe',
            conditions: 'Condizioni',
            constraints: 'Cosa non va assunto',
            next: 'Prossimo passo',
            expected: 'Risultato atteso'
        },
        summaryLead: 'Questa valutazione indica un programma acqua con {context} e {complexity}. Le risposte suggeriscono che il flusso puo funzionare in condizioni normali, ma deve collegare meglio punto di campionamento, custodia, metodo, lettura, revisione e report.',
        contextStrong: 'contesto analitico ben definito',
        contextWeak: 'contesto analitico ancora da precisare',
        complexityHigh: 'complessita operativa alta',
        complexityLow: 'complessita operativa moderata',
        summarySecond: 'La priorita dovrebbe essere assicurare una cronologia unica per campione prima di estendere verso dashboard, trend o maggiore visibilita cliente.',
        flow: 'Il flusso attuale mostra segnali di registri separati tra campionamento, gestione laboratorio, revisione e reporting. Il miglioramento dovrebbe collegare prima il percorso operativo e poi aggiungere visibilita.',
        noProducts: 'Nessun prodotto e presentato come raccomandazione chiusa da questa valutazione. La selezione richiede revisione tecnica di matrice, metodo, volume, paese e uso previsto.',
        ctaBody: 'Condividi il risultato strutturato con AquaVerify affinche uno specialista riveda matrice, metodo, percorso prodotto, moduli digitali e prossimi passi.',
        limitations: [
            'Questa valutazione usa solo risposte strutturate. Non sono stati rivisti SOP, dati reali, report di laboratorio o documentazione interna.',
            'Non si deduce accettazione regolatoria automatica. Ogni uso legato a norma va rivisto per paese, matrice, metodo, ambito laboratorio e autorita competente.',
            'Il risultato e consultivo e non sostituisce validazione metodo, sistema qualita o approvazione tecnica.'
        ]
    },
    ca: {
        notIndicated: 'no indicat',
        levelLabels: ['Molt limitat', 'Basic', 'Parcialment estructurat', 'Estructurat', 'Avancat'],
        priority: { high: 'Prioritat alta', medium: 'Prioritat mitjana', low: 'Prioritat baixa' },
        type: { module: 'Modul digital', product: 'Producte', tool: 'Eina', resource: 'Recurs', next_step: 'Pas tecnic', action: 'Accio de millora' },
        groups: {
            operational: 'Ruta operativa',
            digital: 'Ruta digital',
            analytical: 'Ruta analitica',
            reporting: 'Reporting i visibilitat',
            review: 'Revisio tecnica'
        },
        verbs: {
            why: 'Per que apareix',
            improves: 'Que milloraria',
            conditions: 'Condicions',
            constraints: 'Que no s ha d assumir',
            next: 'Pas seguent',
            expected: 'Resultat esperat'
        },
        summaryLead: 'Aquest diagnostic apunta a un programa d aigua amb {context} i {complexity}. Les respostes suggereixen que el flux pot funcionar en condicions normals, pero encara ha de connectar millor punt de mostreig, custodia, metode, lectura, revisio i informe.',
        contextStrong: 'context analitic ben definit',
        contextWeak: 'context analitic encara per precisar',
        complexityHigh: 'complexitat operativa alta',
        complexityLow: 'complexitat operativa moderada',
        summarySecond: 'La prioritat hauria de ser assegurar un historial unic per mostra abans d ampliar cap a dashboards, tendencies o mes visibilitat per client.',
        flow: 'El flux actual mostra senyals de registres separats entre captura de mostra, gestio de laboratori, revisio i reporting. La millora hauria de connectar primer la ruta operativa abans d afegir capes de visibilitat.',
        noProducts: 'Cap producte es presenta com a recomanacio tancada des d aquest diagnostic. La seleccio requereix revisio tecnica de matriu, metode, volum, pais i us previst.',
        ctaBody: 'Comparteix el resultat estructurat amb AquaVerify perque un especialista revisi matriu, metode, ruta de producte, moduls digitals i passos seguents.',
        limitations: [
            'Aquest diagnostic es basa nomes en respostes estructurades. No s han revisat SOP, dades reals, informes de laboratori ni documentacio interna.',
            'No s infereix acceptacio reguladora automatica. Qualsevol us subjecte a norma s ha de revisar per pais, matriu, metode, abast del laboratori i autoritat competent.',
            'El resultat es consultiu i no substitueix validacio de metode, sistema de qualitat ni aprovacio tecnica.'
        ]
    }
});

const REPORT_LABELS_EN = Object.freeze({
    target: {
        'field-sampling': 'Field sampling and custody',
        'sample-management': 'Sample management',
        'lims-review': 'LIMS review layer',
        'coa-reporting': 'CoA and documentary reporting',
        'customer-portal': 'Customer portal',
        'inventory-traceability': 'Inventory and batch traceability',
        'deviations-capa': 'Deviations and CAPA',
        dashboards: 'Dashboards and trend views',
        crm: 'CRM follow-up',
        aquatools: 'AquaTools calculators',
        gis: 'Geographic context',
        'enumera-coli100': 'ENUMERA Coli 100 mL',
        'enumera-soma100': 'ENUMERA Soma 100 mL',
        'enumera-entero100': 'ENUMERA Entero 100 mL',
        'indica-screening': 'INDICA screening',
        'plaque-soma': 'PLAQUE Soma',
        'iso-epa-kits': 'ISO/EPA kits',
        'lab-essentials': 'Lab Essentials',
        'technical-review': 'Technical review'
    },
    finding: {
        fragmented_manual_workflow: 'Fragmented manual workflow',
        custody_traceability_gap: 'Custody and traceability gap',
        audit_evidence_gap: 'Documentary evidence gap',
        client_visibility_gap: 'Limited client visibility',
        analytical_context_needs_review: 'Analytical context needs review'
    },
    reason: {
        'reason.fragmented_sample_flow': 'The flow appears to depend on separate records between sample, assay, review and report.',
        'reason.digitised_stages_present': 'Several stages are already digitised and can be connected into a more consistent history.',
        'reason.traceability_signal_count': 'The answers show how many custody, method, reading, review and batch signals are already connected.',
        'reason.audit_evidence_signal_count': 'The evidence path is measured by review, CoA, deviation and inventory signals.',
        'reason.volume_sites_roles': 'Sample volume, sites and roles increase the coordination effort.',
        'reason.current_systems_readiness': 'Current systems indicate whether the team is ready to connect workflow data digitally.',
        'reason.analytical_context_fields': 'The analytical context is based on organism, result type, intended use, method and volume answers.',
        'reason.field_custody_needed': 'The answers indicate a need to keep field context, point, operator or custody chain.',
        'reason.review_not_connected': 'The analytical result and technical review do not appear fully connected in the same history.',
        'reason.coa_evidence_needed': 'The workflow needs structured documentary evidence for reports, review or audit conversations.',
        'reason.customer_visibility_gap': 'Results, status or reports may not yet be easy for customers or stakeholders to consult.',
        'reason.batch_inventory_traceability': 'Batch, kit, consumable or inventory traceability can strengthen the sample history.',
        'reason.deviation_closure_needed': 'The context suggests follow-up of incidents, deviations or corrective actions.',
        'reason.trends_and_sites': 'Multiple points, sites or recurring issues make trends and location status useful.',
        'reason.commercial_followup_needed': 'The route may need commercial follow-up, distributor coordination or partner tracking.',
        'reason.calculation_support': 'Calculation support can reduce friction around routine technical conversions.',
        'reason.quantitative_indicator_workflow': 'The diagnosis includes a quantitative indicator workflow.',
        'reason.somatic_coliphage_enumeration': 'The diagnosis includes somatic coliphage enumeration context.',
        'reason.presence_absence_screening': 'The diagnosis includes presence/absence screening context.',
        'reason.plate_workflow_needed': 'The answers suggest a plate workflow or reading-review need.',
        'reason.reference_method_context': 'The answers mention a reference method or a standards-oriented use.',
        'reason.context_needs_review': 'The analytical context is not complete enough for a closed recommendation.'
    },
    condition: {
        'condition.define_sampling_sop': 'Define a sampling SOP and minimum sample states before operating it.',
        'condition.configure_method_and_roles': 'Configure method, roles, permissions and review criteria before operational use.',
        'condition.define_report_templates': 'Define report templates, review states and publication rules.',
        'condition.define_customer_scope': 'Define who should see status, report history and follow-up information.',
        'condition.load_product_batches': 'Load product lots, consumables and expiration data before relying on traceability.',
        'condition.define_quality_workflow': 'Define deviation, review and closure workflow before using it as quality evidence.',
        'condition.define_dimensions': 'Define site, point, zone and time dimensions before building dashboards.',
        'condition.review_matrix_method_country': 'Confirm matrix, method, country, volume and intended use before selecting the product.',
        'condition.review_coliphage_scope': 'Confirm coliphage scope, host, volume, method and laboratory role.',
        'condition.screening_context_only': 'Use screening context carefully and define when confirmatory work is needed.',
        'condition.plate_equipment_review': 'Review equipment, host strain, incubation, reading and documentation needs.',
        'condition.no_automatic_acceptance': 'A reference method does not imply automatic acceptance.',
        'condition.collect_non_sensitive_context': 'Collect non-sensitive technical context before closing the recommendation.',
        'condition.technical_and_regulatory_review': 'Run technical and regulatory review before operational use.'
    },
    constraint: {
        'constraint.no_automatic_regulatory_acceptance': 'No automatic regulatory acceptance is inferred.',
        'constraint.product_mapping_review': 'Final product selection requires review of matrix, method, volume, country and intended use.',
        'constraint.review_matrix_method_country': 'Matrix, method and country must be reviewed before product selection.',
        'constraint.review_coliphage_scope': 'Coliphage scope must be reviewed before considering the product route closed.',
        'constraint.mapping_review_required': 'The product mapping remains subject to technical review.',
        'constraint.screening_not_regulatory_replacement': 'Screening does not replace a required reference procedure.',
        'constraint.plate_workflow_review': 'Plate workflow suitability must be reviewed before use.',
        'constraint.sop_and_inventory_review': 'SOP, inventory and material context must be reviewed.',
        'constraint.insufficient_analytical_context': 'The analytical context is insufficient for a closed product selection.',
        'constraint.regulated_use_review': 'Regulated or accredited use requires review by country, method, matrix and laboratory scope.',
        'constraint.wfi_not_assumed': 'WFI applicability is not assumed from this assessment.',
        'constraint.no_compliance_score': 'The assessment does not produce a regulatory acceptance score.'
    },
    assumption: {
        'assumption.structured_answers_only': 'This diagnosis is based only on structured answers.',
        'assumption.source_problem_preselected': 'A priority problem was preselected from the entry page.',
        'assumption.no_regulatory_acceptance_inferred': 'No automatic regulatory acceptance is inferred.'
    },
    action: {
        'standardize-sample-workflow': 'Standardize points, owners and sampling SOP',
        'connect-custody-method-batch': 'Digitize sample, custody, method and batch',
        'connect-reading-and-review': 'Connect reading, technical review and CoA',
        'improve-report-delivery': 'Improve report delivery and documentary evidence',
        'schedule-technical-review': 'Schedule technical review of analytical context',
        'scale-with-trends-and-dashboard': 'Scale towards trends, dashboards and point follow-up'
    }
});

const REPORT_TRANSLATIONS = Object.freeze({
    en: REPORT_LABELS_EN,
    es: {
        target: {
            'field-sampling': 'Muestreo de campo y custodia',
            'sample-management': 'Gestion de muestras',
            'lims-review': 'Capa de revision LIMS',
            'coa-reporting': 'CoA y reporting documental',
            'customer-portal': 'Portal cliente',
            'inventory-traceability': 'Inventario y trazabilidad de lotes',
            'deviations-capa': 'Desviaciones y CAPA',
            dashboards: 'Dashboards y tendencias',
            crm: 'Seguimiento CRM',
            aquatools: 'Calculadoras AquaTools',
            gis: 'Contexto geografico',
            'enumera-coli100': 'ENUMERA Coli 100 mL',
            'enumera-soma100': 'ENUMERA Soma 100 mL',
            'enumera-entero100': 'ENUMERA Entero 100 mL',
            'indica-screening': 'Screening INDICA',
            'plaque-soma': 'PLAQUE Soma',
            'iso-epa-kits': 'Kits ISO/EPA',
            'lab-essentials': 'Lab Essentials',
            'technical-review': 'Revision tecnica'
        },
        finding: {
            fragmented_manual_workflow: 'Flujo manual fragmentado',
            custody_traceability_gap: 'Brecha de custodia y trazabilidad',
            audit_evidence_gap: 'Brecha de evidencia documental',
            client_visibility_gap: 'Visibilidad limitada para clientes',
            analytical_context_needs_review: 'Contexto analitico pendiente de revision'
        },
        reason: {
            'reason.fragmented_sample_flow': 'El flujo parece depender de registros separados entre muestra, ensayo, revision e informe.',
            'reason.digitised_stages_present': 'Varias etapas ya estan digitalizadas y pueden conectarse en un historial mas consistente.',
            'reason.traceability_signal_count': 'Las respuestas muestran cuantas senales de custodia, metodo, lectura, revision y lote estan conectadas.',
            'reason.audit_evidence_signal_count': 'La ruta de evidencia se mide por senales de revision, CoA, desviaciones e inventario.',
            'reason.volume_sites_roles': 'Volumen de muestras, sedes y roles aumentan el esfuerzo de coordinacion.',
            'reason.current_systems_readiness': 'Los sistemas actuales indican si el equipo esta preparado para conectar datos de flujo digitalmente.',
            'reason.analytical_context_fields': 'El contexto analitico se basa en organismo, tipo de resultado, uso previsto, metodo y volumen.',
            'reason.field_custody_needed': 'Las respuestas indican necesidad de conservar contexto de campo, punto, operador o cadena de custodia.',
            'reason.review_not_connected': 'El resultado analitico y la revision tecnica no parecen estar plenamente conectados en el mismo historial.',
            'reason.coa_evidence_needed': 'El flujo necesita evidencia documental estructurada para informes, revision o auditorias.',
            'reason.customer_visibility_gap': 'Resultados, estados o informes pueden no estar disponibles de forma facil de consultar.',
            'reason.batch_inventory_traceability': 'La trazabilidad de lote, kit, consumible o inventario puede reforzar el historial de muestra.',
            'reason.deviation_closure_needed': 'El contexto sugiere seguimiento de incidencias, desviaciones o acciones correctivas.',
            'reason.trends_and_sites': 'La presencia de varios puntos, sedes o problemas recurrentes hace util comparar tendencias y estado por ubicacion.',
            'reason.commercial_followup_needed': 'La ruta puede necesitar seguimiento comercial, coordinacion de distribuidor o trazabilidad de partner.',
            'reason.calculation_support': 'El apoyo de calculo puede reducir friccion en conversiones tecnicas rutinarias.',
            'reason.quantitative_indicator_workflow': 'El diagnostico incluye un flujo cuantitativo.',
            'reason.somatic_coliphage_enumeration': 'El diagnostico incluye contexto de enumeracion de colifagos somaticos.',
            'reason.presence_absence_screening': 'El diagnostico incluye contexto de presencia/ausencia.',
            'reason.plate_workflow_needed': 'Las respuestas sugieren necesidad de flujo de placa o lectura-revision.',
            'reason.reference_method_context': 'Las respuestas mencionan un metodo de referencia o uso orientado a norma.',
            'reason.context_needs_review': 'El contexto analitico no es suficiente para una recomendacion cerrada.'
        },
        condition: {
            'condition.define_sampling_sop': 'Antes de implantarlo conviene definir un SOP de muestreo y los estados minimos de cada muestra.',
            'condition.configure_method_and_roles': 'Deben configurarse metodo, roles, permisos y criterios de revision antes de usarlo operativamente.',
            'condition.define_report_templates': 'Conviene definir plantillas de informe, estados de revision y reglas de publicacion.',
            'condition.define_customer_scope': 'Hay que definir quien vera estados, historico de informes y seguimiento.',
            'condition.load_product_batches': 'Conviene cargar lotes, consumibles y caducidades antes de depender de la trazabilidad.',
            'condition.define_quality_workflow': 'Hay que definir flujo de desviacion, revision y cierre antes de usarlo como evidencia de calidad.',
            'condition.define_dimensions': 'Deben definirse sede, punto, zona y periodo antes de construir dashboards.',
            'condition.review_matrix_method_country': 'Confirma matriz, metodo, pais, volumen y uso previsto antes de seleccionar producto.',
            'condition.review_coliphage_scope': 'Confirma alcance de colifagos, hospedador, volumen, metodo y rol del laboratorio.',
            'condition.screening_context_only': 'Usa el screening con cautela y define cuando se necesita confirmacion.',
            'condition.plate_equipment_review': 'Revisa equipos, cepa hospedadora, incubacion, lectura y documentacion.',
            'condition.no_automatic_acceptance': 'El uso de una referencia metodologica no implica aceptacion automatica.',
            'condition.collect_non_sensitive_context': 'Recoge contexto tecnico no sensible antes de cerrar la recomendacion.',
            'condition.technical_and_regulatory_review': 'Ejecuta revision tecnica y regulatoria antes del uso operativo.'
        },
        constraint: {
            'constraint.no_automatic_regulatory_acceptance': 'No se infiere aceptacion regulatoria automatica.',
            'constraint.product_mapping_review': 'La seleccion final de producto requiere revision tecnica de matriz, metodo, volumen, pais y uso previsto.',
            'constraint.review_matrix_method_country': 'Matriz, metodo y pais deben revisarse antes de seleccionar producto.',
            'constraint.review_coliphage_scope': 'El alcance de colifagos debe revisarse antes de cerrar la ruta de producto.',
            'constraint.mapping_review_required': 'El mapeo de producto queda sujeto a revision tecnica.',
            'constraint.screening_not_regulatory_replacement': 'El screening no sustituye un procedimiento de referencia requerido.',
            'constraint.plate_workflow_review': 'La idoneidad del flujo de placa debe revisarse antes de usarlo.',
            'constraint.sop_and_inventory_review': 'SOP, inventario y materiales deben revisarse.',
            'constraint.insufficient_analytical_context': 'El contexto analitico es insuficiente para una seleccion cerrada de producto.',
            'constraint.regulated_use_review': 'El uso regulado o acreditado requiere revision por pais, metodo, matriz y alcance del laboratorio.',
            'constraint.wfi_not_assumed': 'La aplicabilidad WFI no se asume desde este diagnostico.',
            'constraint.no_compliance_score': 'El diagnostico no produce una puntuacion de aceptacion regulatoria.'
        },
        assumption: {
            'assumption.structured_answers_only': 'Este diagnostico se basa unicamente en respuestas estructuradas.',
            'assumption.source_problem_preselected': 'Un problema prioritario fue preseleccionado desde la pagina de entrada.',
            'assumption.no_regulatory_acceptance_inferred': 'No se infiere aceptacion regulatoria automatica.'
        },
        action: {
            'standardize-sample-workflow': 'Estandarizar puntos, responsables y SOP de muestreo',
            'connect-custody-method-batch': 'Digitalizar muestra, custodia, metodo y lote',
            'connect-reading-and-review': 'Conectar lectura, revision tecnica y CoA',
            'improve-report-delivery': 'Mejorar entrega de informes y evidencia documental',
            'schedule-technical-review': 'Agendar revision tecnica del contexto analitico',
            'scale-with-trends-and-dashboard': 'Escalar hacia tendencias, dashboards y seguimiento por punto'
        }
    },
    fr: {
        target: {
            'field-sampling': 'Prelevement terrain et garde',
            'sample-management': 'Gestion des echantillons',
            'lims-review': 'Couche de revue LIMS',
            'coa-reporting': 'CoA et reporting documentaire',
            'customer-portal': 'Portail client',
            'inventory-traceability': 'Inventaire et tracabilite des lots',
            'deviations-capa': 'Ecarts et CAPA',
            dashboards: 'Dashboards et vues de tendance',
            crm: 'Suivi CRM',
            aquatools: 'Calculateurs AquaTools',
            gis: 'Contexte geographique',
            'enumera-coli100': 'ENUMERA Coli 100 mL',
            'enumera-soma100': 'ENUMERA Soma 100 mL',
            'enumera-entero100': 'ENUMERA Entero 100 mL',
            'indica-screening': 'Screening INDICA',
            'plaque-soma': 'PLAQUE Soma',
            'iso-epa-kits': 'Kits ISO/EPA',
            'lab-essentials': 'Lab Essentials',
            'technical-review': 'Revue technique'
        },
        finding: {
            fragmented_manual_workflow: 'Flux manuel fragmente',
            custody_traceability_gap: 'Ecart de garde et de tracabilite',
            audit_evidence_gap: 'Ecart d evidence documentaire',
            client_visibility_gap: 'Visibilite client limitee',
            analytical_context_needs_review: 'Contexte analytique a revoir'
        },
        reason: {
            'reason.fragmented_sample_flow': 'Le flux semble dependre de registres separes entre echantillon, essai, revue et rapport.',
            'reason.digitised_stages_present': 'Plusieurs etapes sont deja numerisees et peuvent etre reliees dans un historique plus coherent.',
            'reason.traceability_signal_count': 'Les reponses indiquent combien de signaux de garde, methode, lecture, revue et lot sont deja connectes.',
            'reason.audit_evidence_signal_count': 'La route d evidence est mesuree par les signaux de revue, CoA, ecarts et inventaire.',
            'reason.volume_sites_roles': 'Le volume d echantillons, les sites et les roles augmentent l effort de coordination.',
            'reason.current_systems_readiness': 'Les systemes actuels indiquent si l equipe est prete a connecter les donnees de flux numeriquement.',
            'reason.analytical_context_fields': 'Le contexte analytique repose sur organisme, type de resultat, usage prevu, methode et volume.',
            'reason.field_custody_needed': 'Les reponses indiquent le besoin de conserver le contexte terrain, le point, l operateur ou la chaine de garde.',
            'reason.review_not_connected': 'Le resultat analytique et la revue technique ne semblent pas pleinement relies dans le meme historique.',
            'reason.coa_evidence_needed': 'Le flux a besoin d evidence documentaire structuree pour rapports, revue ou discussions d audit.',
            'reason.customer_visibility_gap': 'Les resultats, statuts ou rapports peuvent ne pas etre faciles a consulter par les clients ou parties prenantes.',
            'reason.batch_inventory_traceability': 'La tracabilite des lots, kits, consommables ou inventaire peut renforcer l historique de l echantillon.',
            'reason.deviation_closure_needed': 'Le contexte suggere un suivi des incidents, ecarts ou actions correctives.',
            'reason.trends_and_sites': 'Plusieurs points, sites ou problemes recurrents rendent utile la comparaison des tendances et de l etat par lieu.',
            'reason.commercial_followup_needed': 'La route peut demander un suivi commercial, une coordination distributeur ou un suivi partenaire.',
            'reason.calculation_support': 'Un appui de calcul peut reduire les frictions dans les conversions techniques de routine.',
            'reason.quantitative_indicator_workflow': 'Le diagnostic inclut un flux quantitatif d indicateur.',
            'reason.somatic_coliphage_enumeration': 'Le diagnostic inclut un contexte d enumeration de coliphages somatiques.',
            'reason.presence_absence_screening': 'Le diagnostic inclut un contexte de screening presence/absence.',
            'reason.plate_workflow_needed': 'Les reponses suggerent un besoin de flux sur plaque ou de lecture-revue.',
            'reason.reference_method_context': 'Les reponses mentionnent une methode de reference ou un usage oriente norme.',
            'reason.context_needs_review': 'Le contexte analytique n est pas assez complet pour une recommandation fermee.'
        },
        condition: {
            'condition.define_sampling_sop': 'Definir un SOP de prelevement et les etats minimaux de chaque echantillon avant exploitation.',
            'condition.configure_method_and_roles': 'Configurer methode, roles, permissions et criteres de revue avant usage operationnel.',
            'condition.define_report_templates': 'Definir les modeles de rapport, les etats de revue et les regles de publication.',
            'condition.define_customer_scope': 'Definir qui doit voir les statuts, l historique des rapports et les informations de suivi.',
            'condition.load_product_batches': 'Charger lots produit, consommables et dates d expiration avant de s appuyer sur la tracabilite.',
            'condition.define_quality_workflow': 'Definir le flux d ecart, de revue et de cloture avant de l utiliser comme evidence qualite.',
            'condition.define_dimensions': 'Definir site, point, zone et periode avant de construire des dashboards.',
            'condition.review_matrix_method_country': 'Confirmer matrice, methode, pays, volume et usage prevu avant de selectionner le produit.',
            'condition.review_coliphage_scope': 'Confirmer portee coliphages, hote, volume, methode et role du laboratoire.',
            'condition.screening_context_only': 'Utiliser le contexte de screening avec prudence et definir quand une confirmation est necessaire.',
            'condition.plate_equipment_review': 'Revoir equipement, souche hote, incubation, lecture et besoins documentaires.',
            'condition.no_automatic_acceptance': 'Une reference methodologique n implique pas une acceptation automatique.',
            'condition.collect_non_sensitive_context': 'Collecter le contexte technique non sensible avant de clore la recommandation.',
            'condition.technical_and_regulatory_review': 'Realiser une revue technique et reglementaire avant usage operationnel.'
        },
        constraint: {
            'constraint.no_automatic_regulatory_acceptance': 'Aucune acceptation reglementaire automatique n est deduite.',
            'constraint.product_mapping_review': 'La selection finale du produit demande une revue technique de matrice, methode, volume, pays et usage prevu.',
            'constraint.review_matrix_method_country': 'Matrice, methode et pays doivent etre revus avant selection du produit.',
            'constraint.review_coliphage_scope': 'La portee coliphages doit etre revue avant de considerer la route produit comme fermee.',
            'constraint.mapping_review_required': 'La correspondance produit reste soumise a revue technique.',
            'constraint.screening_not_regulatory_replacement': 'Le screening ne remplace pas une procedure de reference requise.',
            'constraint.plate_workflow_review': 'L adequation du flux sur plaque doit etre revue avant usage.',
            'constraint.sop_and_inventory_review': 'SOP, inventaire et contexte materiel doivent etre revus.',
            'constraint.insufficient_analytical_context': 'Le contexte analytique est insuffisant pour une selection produit fermee.',
            'constraint.regulated_use_review': 'Un usage regule ou accredite demande une revue par pays, methode, matrice et portee laboratoire.',
            'constraint.wfi_not_assumed': 'L applicabilite WFI n est pas supposee par ce diagnostic.',
            'constraint.no_compliance_score': 'Le diagnostic ne produit pas de score d acceptation reglementaire.'
        },
        assumption: {
            'assumption.structured_answers_only': 'Ce diagnostic repose uniquement sur des reponses structurees.',
            'assumption.source_problem_preselected': 'Un probleme prioritaire a ete preselectionne depuis la page d entree.',
            'assumption.no_regulatory_acceptance_inferred': 'Aucune acceptation reglementaire automatique n est deduite.'
        },
        action: {
            'standardize-sample-workflow': 'Standardiser les points, responsables et SOP de prelevement',
            'connect-custody-method-batch': 'Numeriser echantillon, garde, methode et lot',
            'connect-reading-and-review': 'Relier lecture, revue technique et CoA',
            'improve-report-delivery': 'Ameliorer la remise des rapports et l evidence documentaire',
            'schedule-technical-review': 'Planifier une revue technique du contexte analytique',
            'scale-with-trends-and-dashboard': 'Etendre vers tendances, dashboards et suivi par point'
        }
    },
    it: {
        target: {
            'field-sampling': 'Campionamento sul campo e custodia',
            'sample-management': 'Gestione campioni',
            'lims-review': 'Livello di revisione LIMS',
            'coa-reporting': 'CoA e reporting documentale',
            'customer-portal': 'Portale cliente',
            'inventory-traceability': 'Inventario e tracciabilita dei lotti',
            'deviations-capa': 'Deviazioni e CAPA',
            dashboards: 'Dashboard e viste trend',
            crm: 'Follow-up CRM',
            aquatools: 'Calcolatori AquaTools',
            gis: 'Contesto geografico',
            'enumera-coli100': 'ENUMERA Coli 100 mL',
            'enumera-soma100': 'ENUMERA Soma 100 mL',
            'enumera-entero100': 'ENUMERA Entero 100 mL',
            'indica-screening': 'Screening INDICA',
            'plaque-soma': 'PLAQUE Soma',
            'iso-epa-kits': 'Kit ISO/EPA',
            'lab-essentials': 'Lab Essentials',
            'technical-review': 'Revisione tecnica'
        },
        finding: {
            fragmented_manual_workflow: 'Flusso manuale frammentato',
            custody_traceability_gap: 'Lacuna di custodia e tracciabilita',
            audit_evidence_gap: 'Lacuna di evidenza documentale',
            client_visibility_gap: 'Visibilita cliente limitata',
            analytical_context_needs_review: 'Contesto analitico da rivedere'
        },
        reason: {
            'reason.fragmented_sample_flow': 'Il flusso sembra dipendere da registri separati tra campione, prova, revisione e report.',
            'reason.digitised_stages_present': 'Diverse fasi sono gia digitalizzate e possono essere collegate in una cronologia piu coerente.',
            'reason.traceability_signal_count': 'Le risposte mostrano quanti segnali di custodia, metodo, lettura, revisione e lotto sono gia collegati.',
            'reason.audit_evidence_signal_count': 'Il percorso di evidenza e misurato da segnali di revisione, CoA, deviazioni e inventario.',
            'reason.volume_sites_roles': 'Volume campioni, sedi e ruoli aumentano lo sforzo di coordinamento.',
            'reason.current_systems_readiness': 'I sistemi attuali indicano se il team e pronto a collegare digitalmente i dati del flusso.',
            'reason.analytical_context_fields': 'Il contesto analitico si basa su organismo, tipo di risultato, uso previsto, metodo e volume.',
            'reason.field_custody_needed': 'Le risposte indicano la necessita di conservare contesto di campo, punto, operatore o catena di custodia.',
            'reason.review_not_connected': 'Il risultato analitico e la revisione tecnica non sembrano pienamente collegati nello stesso storico.',
            'reason.coa_evidence_needed': 'Il flusso richiede evidenza documentale strutturata per report, revisione o conversazioni di audit.',
            'reason.customer_visibility_gap': 'Risultati, stati o report potrebbero non essere ancora facili da consultare per clienti o stakeholder.',
            'reason.batch_inventory_traceability': 'La tracciabilita di lotto, kit, consumabile o inventario puo rafforzare lo storico del campione.',
            'reason.deviation_closure_needed': 'Il contesto suggerisce follow-up di incidenti, deviazioni o azioni correttive.',
            'reason.trends_and_sites': 'Piu punti, sedi o problemi ricorrenti rendono utile confrontare trend e stato per ubicazione.',
            'reason.commercial_followup_needed': 'Il percorso puo richiedere follow-up commerciale, coordinamento distributore o tracciamento partner.',
            'reason.calculation_support': 'Il supporto di calcolo puo ridurre attrito nelle conversioni tecniche di routine.',
            'reason.quantitative_indicator_workflow': 'La valutazione include un flusso quantitativo di indicatore.',
            'reason.somatic_coliphage_enumeration': 'La valutazione include un contesto di enumerazione di colifagi somatici.',
            'reason.presence_absence_screening': 'La valutazione include un contesto di screening presenza/assenza.',
            'reason.plate_workflow_needed': 'Le risposte suggeriscono necessita di flusso su piastra o lettura-revisione.',
            'reason.reference_method_context': 'Le risposte menzionano un metodo di riferimento o un uso orientato a norma.',
            'reason.context_needs_review': 'Il contesto analitico non e abbastanza completo per una raccomandazione chiusa.'
        },
        condition: {
            'condition.define_sampling_sop': 'Definire un SOP di campionamento e gli stati minimi di ogni campione prima dell uso operativo.',
            'condition.configure_method_and_roles': 'Configurare metodo, ruoli, permessi e criteri di revisione prima dell uso operativo.',
            'condition.define_report_templates': 'Definire template di report, stati di revisione e regole di pubblicazione.',
            'condition.define_customer_scope': 'Definire chi deve vedere stati, storico report e informazioni di follow-up.',
            'condition.load_product_batches': 'Caricare lotti prodotto, consumabili e scadenze prima di affidarsi alla tracciabilita.',
            'condition.define_quality_workflow': 'Definire flusso di deviazione, revisione e chiusura prima di usarlo come evidenza qualita.',
            'condition.define_dimensions': 'Definire sede, punto, zona e periodo prima di costruire dashboard.',
            'condition.review_matrix_method_country': 'Confermare matrice, metodo, paese, volume e uso previsto prima di selezionare il prodotto.',
            'condition.review_coliphage_scope': 'Confermare ambito colifagi, ospite, volume, metodo e ruolo del laboratorio.',
            'condition.screening_context_only': 'Usare il contesto di screening con cautela e definire quando serve conferma.',
            'condition.plate_equipment_review': 'Rivedere attrezzatura, ceppo ospite, incubazione, lettura e bisogni documentali.',
            'condition.no_automatic_acceptance': 'Un riferimento metodologico non implica accettazione automatica.',
            'condition.collect_non_sensitive_context': 'Raccogliere contesto tecnico non sensibile prima di chiudere la raccomandazione.',
            'condition.technical_and_regulatory_review': 'Eseguire revisione tecnica e regolatoria prima dell uso operativo.'
        },
        constraint: {
            'constraint.no_automatic_regulatory_acceptance': 'Non si deduce accettazione regolatoria automatica.',
            'constraint.product_mapping_review': 'La selezione finale del prodotto richiede revisione tecnica di matrice, metodo, volume, paese e uso previsto.',
            'constraint.review_matrix_method_country': 'Matrice, metodo e paese devono essere rivisti prima della selezione prodotto.',
            'constraint.review_coliphage_scope': 'L ambito colifagi deve essere rivisto prima di considerare chiuso il percorso prodotto.',
            'constraint.mapping_review_required': 'La mappatura prodotto resta soggetta a revisione tecnica.',
            'constraint.screening_not_regulatory_replacement': 'Lo screening non sostituisce una procedura di riferimento richiesta.',
            'constraint.plate_workflow_review': 'L idoneita del flusso su piastra deve essere rivista prima dell uso.',
            'constraint.sop_and_inventory_review': 'SOP, inventario e contesto materiali devono essere rivisti.',
            'constraint.insufficient_analytical_context': 'Il contesto analitico e insufficiente per una selezione prodotto chiusa.',
            'constraint.regulated_use_review': 'L uso regolato o accreditato richiede revisione per paese, metodo, matrice e ambito laboratorio.',
            'constraint.wfi_not_assumed': 'L applicabilita WFI non e assunta da questa valutazione.',
            'constraint.no_compliance_score': 'La valutazione non produce un punteggio di accettazione regolatoria.'
        },
        assumption: {
            'assumption.structured_answers_only': 'Questa valutazione si basa solo su risposte strutturate.',
            'assumption.source_problem_preselected': 'Un problema prioritario e stato preselezionato dalla pagina di ingresso.',
            'assumption.no_regulatory_acceptance_inferred': 'Non si deduce accettazione regolatoria automatica.'
        },
        action: {
            'standardize-sample-workflow': 'Standardizzare punti, responsabili e SOP di campionamento',
            'connect-custody-method-batch': 'Digitalizzare campione, custodia, metodo e lotto',
            'connect-reading-and-review': 'Collegare lettura, revisione tecnica e CoA',
            'improve-report-delivery': 'Migliorare consegna report ed evidenza documentale',
            'schedule-technical-review': 'Pianificare revisione tecnica del contesto analitico',
            'scale-with-trends-and-dashboard': 'Scalare verso trend, dashboard e follow-up per punto'
        }
    },
    ca: {
        target: {
            'field-sampling': 'Mostreig de camp i custodia',
            'sample-management': 'Gestio de mostres',
            'lims-review': 'Capa de revisio LIMS',
            'coa-reporting': 'CoA i reporting documental',
            'customer-portal': 'Portal client',
            'inventory-traceability': 'Inventari i tracabilitat de lots',
            'deviations-capa': 'Desviacions i CAPA',
            dashboards: 'Dashboards i vistes de tendencia',
            crm: 'Seguiment CRM',
            aquatools: 'Calculadores AquaTools',
            gis: 'Context geografic',
            'enumera-coli100': 'ENUMERA Coli 100 mL',
            'enumera-soma100': 'ENUMERA Soma 100 mL',
            'enumera-entero100': 'ENUMERA Entero 100 mL',
            'indica-screening': 'Screening INDICA',
            'plaque-soma': 'PLAQUE Soma',
            'iso-epa-kits': 'Kits ISO/EPA',
            'lab-essentials': 'Lab Essentials',
            'technical-review': 'Revisio tecnica'
        },
        finding: {
            fragmented_manual_workflow: 'Flux manual fragmentat',
            custody_traceability_gap: 'Bretxa de custodia i tracabilitat',
            audit_evidence_gap: 'Bretxa d evidencia documental',
            client_visibility_gap: 'Visibilitat limitada per a clients',
            analytical_context_needs_review: 'Context analitic pendent de revisio'
        },
        reason: {
            'reason.fragmented_sample_flow': 'El flux sembla dependre de registres separats entre mostra, assaig, revisio i informe.',
            'reason.digitised_stages_present': 'Diverses etapes ja estan digitalitzades i es poden connectar en un historial mes coherent.',
            'reason.traceability_signal_count': 'Les respostes mostren quants senyals de custodia, metode, lectura, revisio i lot ja estan connectats.',
            'reason.audit_evidence_signal_count': 'La ruta d evidencia es mesura per senyals de revisio, CoA, desviacions i inventari.',
            'reason.volume_sites_roles': 'El volum de mostres, seus i rols augmenta l esforc de coordinacio.',
            'reason.current_systems_readiness': 'Els sistemes actuals indiquen si l equip esta preparat per connectar dades de flux digitalment.',
            'reason.analytical_context_fields': 'El context analitic es basa en organisme, tipus de resultat, us previst, metode i volum.',
            'reason.field_custody_needed': 'Les respostes indiquen necessitat de conservar context de camp, punt, operador o cadena de custodia.',
            'reason.review_not_connected': 'El resultat analitic i la revisio tecnica no semblen plenament connectats en el mateix historial.',
            'reason.coa_evidence_needed': 'El flux necessita evidencia documental estructurada per a informes, revisio o converses d auditoria.',
            'reason.customer_visibility_gap': 'Resultats, estats o informes potser encara no son facils de consultar per clients o parts interessades.',
            'reason.batch_inventory_traceability': 'La tracabilitat de lot, kit, consumible o inventari pot reforcar l historial de la mostra.',
            'reason.deviation_closure_needed': 'El context suggereix seguiment d incidents, desviacions o accions correctives.',
            'reason.trends_and_sites': 'Diversos punts, seus o problemes recurrents fan util comparar tendencies i estat per ubicacio.',
            'reason.commercial_followup_needed': 'La ruta pot requerir seguiment comercial, coordinacio de distribuidor o tracabilitat de partner.',
            'reason.calculation_support': 'El suport de calcul pot reduir friccio en conversions tecniques rutinaries.',
            'reason.quantitative_indicator_workflow': 'El diagnostic inclou un flux quantitatiu d indicador.',
            'reason.somatic_coliphage_enumeration': 'El diagnostic inclou context d enumeracio de colifags somatics.',
            'reason.presence_absence_screening': 'El diagnostic inclou context de screening presencia/absencia.',
            'reason.plate_workflow_needed': 'Les respostes suggereixen necessitat de flux de placa o lectura-revisio.',
            'reason.reference_method_context': 'Les respostes mencionen un metode de referencia o un us orientat a norma.',
            'reason.context_needs_review': 'El context analitic no es prou complet per a una recomanacio tancada.'
        },
        condition: {
            'condition.define_sampling_sop': 'Definir un SOP de mostreig i els estats minims de cada mostra abans de l us operatiu.',
            'condition.configure_method_and_roles': 'Configurar metode, rols, permisos i criteris de revisio abans de l us operatiu.',
            'condition.define_report_templates': 'Definir plantilles d informe, estats de revisio i regles de publicacio.',
            'condition.define_customer_scope': 'Definir qui ha de veure estats, historic d informes i informacio de seguiment.',
            'condition.load_product_batches': 'Carregar lots de producte, consumibles i caducitats abans de dependre de la tracabilitat.',
            'condition.define_quality_workflow': 'Definir flux de desviacio, revisio i tancament abans d usar-lo com a evidencia de qualitat.',
            'condition.define_dimensions': 'Definir seu, punt, zona i periode abans de construir dashboards.',
            'condition.review_matrix_method_country': 'Confirmar matriu, metode, pais, volum i us previst abans de seleccionar producte.',
            'condition.review_coliphage_scope': 'Confirmar abast de colifags, hoste, volum, metode i rol del laboratori.',
            'condition.screening_context_only': 'Usar el context de screening amb cautela i definir quan cal confirmacio.',
            'condition.plate_equipment_review': 'Revisar equipament, soca hoste, incubacio, lectura i necessitats documentals.',
            'condition.no_automatic_acceptance': 'Una referencia metodologica no implica acceptacio automatica.',
            'condition.collect_non_sensitive_context': 'Recollir context tecnic no sensible abans de tancar la recomanacio.',
            'condition.technical_and_regulatory_review': 'Fer revisio tecnica i reguladora abans de l us operatiu.'
        },
        constraint: {
            'constraint.no_automatic_regulatory_acceptance': 'No s infereix acceptacio reguladora automatica.',
            'constraint.product_mapping_review': 'La seleccio final de producte requereix revisio tecnica de matriu, metode, volum, pais i us previst.',
            'constraint.review_matrix_method_country': 'Matriu, metode i pais s han de revisar abans de seleccionar producte.',
            'constraint.review_coliphage_scope': 'L abast de colifags s ha de revisar abans de donar per tancada la ruta de producte.',
            'constraint.mapping_review_required': 'El mapeig de producte queda subjecte a revisio tecnica.',
            'constraint.screening_not_regulatory_replacement': 'El screening no substitueix un procediment de referencia requerit.',
            'constraint.plate_workflow_review': 'La idoneitat del flux de placa s ha de revisar abans de l us.',
            'constraint.sop_and_inventory_review': 'SOP, inventari i context de materials s han de revisar.',
            'constraint.insufficient_analytical_context': 'El context analitic es insuficient per a una seleccio tancada de producte.',
            'constraint.regulated_use_review': 'L us regulat o acreditat requereix revisio per pais, metode, matriu i abast del laboratori.',
            'constraint.wfi_not_assumed': 'L aplicabilitat WFI no s assumeix des d aquest diagnostic.',
            'constraint.no_compliance_score': 'El diagnostic no produeix una puntuacio d acceptacio reguladora.'
        },
        assumption: {
            'assumption.structured_answers_only': 'Aquest diagnostic es basa nomes en respostes estructurades.',
            'assumption.source_problem_preselected': 'Un problema prioritari es va preseleccionar des de la pagina d entrada.',
            'assumption.no_regulatory_acceptance_inferred': 'No s infereix acceptacio reguladora automatica.'
        },
        action: {
            'standardize-sample-workflow': 'Estandarditzar punts, responsables i SOP de mostreig',
            'connect-custody-method-batch': 'Digitalitzar mostra, custodia, metode i lot',
            'connect-reading-and-review': 'Connectar lectura, revisio tecnica i CoA',
            'improve-report-delivery': 'Millorar entrega d informes i evidencia documental',
            'schedule-technical-review': 'Programar revisio tecnica del context analitic',
            'scale-with-trends-and-dashboard': 'Escalar cap a tendencies, dashboards i seguiment per punt'
        }
    }
});

function localizedReportLabels(lang = 'en') {
    const base = REPORT_TRANSLATIONS.en;
    const selected = REPORT_TRANSLATIONS[lang] || base;
    return {
        target: { ...base.target, ...(selected.target || {}) },
        finding: { ...base.finding, ...(selected.finding || {}) },
        reason: { ...base.reason, ...(selected.reason || {}) },
        condition: { ...base.condition, ...(selected.condition || {}) },
        constraint: { ...base.constraint, ...(selected.constraint || {}) },
        assumption: { ...base.assumption, ...(selected.assumption || {}) },
        action: { ...base.action, ...(selected.action || {}) }
    };
}

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

const ANSWER_SNAPSHOT_FIELDS = Object.freeze([
    'sector_id',
    'source_problem_id',
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
    'sample_volume_context'
]);

const DIMENSION_ACTIONS = Object.freeze({
    workflow_maturity: 'standardize-sample-workflow',
    traceability: 'connect-custody-method-batch',
    audit_readiness: 'connect-reading-and-review',
    operational_complexity: 'standardize-sample-workflow',
    client_visibility: 'improve-report-delivery',
    digital_readiness: 'connect-custody-method-batch',
    analytical_context_completeness: 'schedule-technical-review'
});

const GROUP_TARGETS = Object.freeze({
    operational: ['field-sampling', 'sample-management'],
    digital: ['lims-review', 'inventory-traceability', 'deviations-capa', 'crm', 'aquatools', 'gis'],
    analytical: ['enumera-coli100', 'enumera-soma100', 'enumera-entero100', 'indica-screening', 'plaque-soma', 'iso-epa-kits', 'lab-essentials'],
    reporting: ['coa-reporting', 'customer-portal', 'dashboards'],
    review: ['technical-review']
});

const CONTEXT_LABELS = Object.freeze({
    en: { organizationType: 'Organization', buyerRole: 'Role', sites: 'Sites', labModel: 'Laboratory model', sampleVolume: 'Sample volume', systems: 'Current systems', stages: 'Connected stages', evidence: 'Evidence needs' },
    es: { organizationType: 'Organizacion', buyerRole: 'Rol', sites: 'Sedes', labModel: 'Modelo de laboratorio', sampleVolume: 'Volumen de muestras', systems: 'Sistemas actuales', stages: 'Etapas conectadas', evidence: 'Necesidades de evidencia' },
    fr: { organizationType: 'Organisation', buyerRole: 'Role', sites: 'Sites', labModel: 'Modele laboratoire', sampleVolume: 'Volume echantillons', systems: 'Systemes actuels', stages: 'Etapes connectees', evidence: 'Besoins de preuve' },
    it: { organizationType: 'Organizzazione', buyerRole: 'Ruolo', sites: 'Sedi', labModel: 'Modello laboratorio', sampleVolume: 'Volume campioni', systems: 'Sistemi attuali', stages: 'Fasi connesse', evidence: 'Esigenze di evidenza' },
    ca: { organizationType: 'Organitzacio', buyerRole: 'Rol', sites: 'Sedes', labModel: 'Model laboratori', sampleVolume: 'Volum mostres', systems: 'Sistemes actuals', stages: 'Etapes connectades', evidence: 'Necessitats d evidencia' }
});

const OPTION_LABELS = Object.freeze({
    en: { public_laboratory: 'Public laboratory', private_laboratory: 'Private laboratory', municipal_operator: 'Municipal operator', utility: 'Utility', manufacturer: 'Manufacturer', facility_operator: 'Facility operator', distributor: 'Distributor', consultant: 'Consultant', executive: 'Executive', laboratory: 'Laboratory', quality: 'Quality', operations: 'Operations', regulatory: 'Regulatory', one: 'One', two_to_five: '2 to 5', six_to_twenty: '6 to 20', more_than_twenty: 'More than 20', internal: 'Internal', external: 'External', mixed: 'Mixed', not_applicable: 'Not applicable', not_defined: 'Not defined', unknown: 'Not indicated', paper: 'Paper', spreadsheets: 'Spreadsheets', shared_forms: 'Shared forms', email: 'Email', external_lab_portal: 'External lab portal', lims: 'LIMS', qms: 'QMS', erp: 'ERP', custom_software: 'Custom software', no_defined_system: 'No defined system', control_plan: 'Control plan', sampling: 'Sampling', chain_of_custody: 'Chain of custody', reception: 'Reception', analysis: 'Analysis', reading: 'Reading', technical_review: 'Technical review', coa_reporting: 'CoA reporting', customer_delivery: 'Customer delivery', deviations: 'Deviations', inventory: 'Inventory', trend_analysis: 'Trend analysis', sampling_context: 'Sampling context', kit_batch_traceability: 'Kit batch traceability', method_traceability: 'Method traceability', coa: 'CoA', audit_trail: 'Audit trail', electronic_approval: 'Electronic approval', deviations_and_capa: 'Deviations and CAPA', customer_portal: 'Customer portal', dashboards: 'Dashboards', multi_site_history: 'Multi-site history', inventory_traceability: 'Inventory traceability', urgent_incident: 'Urgent incident', within_three_months: 'Within 3 months', three_to_six_months: '3 to 6 months', six_to_twelve_months: '6 to 12 months', exploring: 'Exploring', product_only: 'Product only', software_only: 'Software only', product_and_software: 'Product and software', authorised_distributor: 'Authorised distributor', oem_private_label: 'OEM / private label', technical_review_route: 'Technical review', not_sure: 'Not sure', somatic_coliphages: 'Somatic coliphages', f_specific_coliphages: 'F-specific coliphages', e_coli: 'E. coli', total_coliforms: 'Total coliforms', legionella: 'Legionella', general_microbiology: 'General microbiology', presence_absence: 'Presence/absence', enumeration: 'Enumeration', both: 'Both', routine_internal_control: 'Routine internal control', treatment_verification: 'Treatment verification', incident_investigation: 'Incident investigation', accredited_testing: 'Accredited testing', regulatory_reporting: 'Regulatory reporting', customer_audit_evidence: 'Customer audit evidence', internal_sop: 'Internal SOP', iso_10705_2: 'ISO 10705-2', epa_1601: 'EPA 1601', epa_1602: 'EPA 1602', iso_9308: 'ISO 9308', iso_11731: 'ISO 11731', one_hundred_ml: '100 mL', one_ml: '1 mL', varies: 'Varies' },
    es: { municipal_operator: 'Operador municipal', public_laboratory: 'Laboratorio publico', private_laboratory: 'Laboratorio privado', utility: 'Utility', manufacturer: 'Fabricante', facility_operator: 'Operador de instalaciones', distributor: 'Distribuidor', consultant: 'Consultor', executive: 'Direccion', laboratory: 'Laboratorio', quality: 'Calidad', operations: 'Operaciones', regulatory: 'Regulatorio', one: 'Una', two_to_five: '2 a 5', six_to_twenty: '6 a 20', more_than_twenty: 'Mas de 20', internal: 'Interno', external: 'Externo', mixed: 'Mixto', not_applicable: 'No aplica', not_defined: 'No definido', unknown: 'No indicado', paper: 'Papel', spreadsheets: 'Hojas de calculo', shared_forms: 'Formularios compartidos', email: 'Correo', external_lab_portal: 'Portal de laboratorio externo', lims: 'LIMS', qms: 'QMS', erp: 'ERP', custom_software: 'Software propio', no_defined_system: 'Sin sistema definido', control_plan: 'Plan de control', sampling: 'Muestreo', chain_of_custody: 'Cadena de custodia', reception: 'Recepcion', analysis: 'Analisis', reading: 'Lectura', technical_review: 'Revision tecnica', coa_reporting: 'Informes CoA', customer_delivery: 'Entrega a cliente', deviations: 'Desviaciones', inventory: 'Inventario', trend_analysis: 'Analisis de tendencias', sampling_context: 'Contexto de muestreo', kit_batch_traceability: 'Trazabilidad de lote de kit', method_traceability: 'Trazabilidad de metodo', coa: 'CoA', audit_trail: 'Audit trail', electronic_approval: 'Aprobacion electronica', deviations_and_capa: 'Desviaciones y CAPA', customer_portal: 'Portal cliente', dashboards: 'Dashboards', multi_site_history: 'Historico multisitio', inventory_traceability: 'Trazabilidad de inventario', urgent_incident: 'Incidencia urgente', within_three_months: 'En 3 meses', three_to_six_months: '3 a 6 meses', six_to_twelve_months: '6 a 12 meses', exploring: 'Explorando', product_only: 'Solo producto', software_only: 'Solo software', product_and_software: 'Producto y software', authorised_distributor: 'Distribuidor autorizado', oem_private_label: 'OEM / marca blanca', technical_review_route: 'Revision tecnica', not_sure: 'No lo se', somatic_coliphages: 'Colifagos somaticos', f_specific_coliphages: 'Colifagos F-especificos', e_coli: 'E. coli', total_coliforms: 'Coliformes totales', legionella: 'Legionella', general_microbiology: 'Microbiologia general', presence_absence: 'Presencia/ausencia', enumeration: 'Enumeracion', both: 'Ambos', routine_internal_control: 'Control interno rutinario', treatment_verification: 'Verificacion de tratamiento', incident_investigation: 'Investigacion de incidencia', accredited_testing: 'Ensayo acreditado', regulatory_reporting: 'Reporte regulatorio', customer_audit_evidence: 'Evidencia para auditoria de cliente', internal_sop: 'SOP interno', iso_10705_2: 'ISO 10705-2', epa_1601: 'EPA 1601', epa_1602: 'EPA 1602', iso_9308: 'ISO 9308', iso_11731: 'ISO 11731', one_hundred_ml: '100 mL', one_ml: '1 mL', varies: 'Varia' }
});

function reportText(lang = 'en') {
    return REPORT_COPY[lang] || REPORT_COPY.en;
}

function reportSections(lang = 'en') {
    return REPORT_SECTIONS[lang] || REPORT_SECTIONS.en;
}

function reportLabels(lang = 'en') {
    if (REPORT_TRANSLATIONS[lang]) return localizedReportLabels(lang);
    if (lang === 'en') return localizedReportLabels('en');
    return localizedReportLabels('es');
}

function optionLabel(value, lang = 'en') {
    const code = String(value || '');
    if (!code) return '';
    if (sectors.includes(code)) return getSectorLabel(code, lang);
    const selected = OPTION_LABELS[lang] || OPTION_LABELS.es || OPTION_LABELS.en;
    return selected[code] || OPTION_LABELS.en[code] || code.replace(/[_-]+/g, ' ');
}

function sentenceFromTemplate(template, values) {
    return String(template || '').replace(/\{(\w+)\}/g, (_match, key) => values[key] || '');
}

function localizeKey(labels, category, key) {
    return labels[category]?.[key] || String(key || '').replace(/^(reason|condition|constraint|assumption)\./, '').replace(/[_-]+/g, ' ');
}

function firstReasonText(item, labels) {
    const key = item.reasonKeys?.[0] || 'reason.context_needs_review';
    return localizeKey(labels, 'reason', key);
}

function buildAnswersSnapshot({ answers = {}, sectorId, sourceProblemId, lang }) {
    const snapshot = {};
    ANSWER_SNAPSHOT_FIELDS.forEach((field) => {
        const raw = field === 'sector_id' ? sectorId : field === 'source_problem_id' ? sourceProblemId : answers[field];
        if (raw === undefined || raw === null || raw === '' || (Array.isArray(raw) && raw.length === 0)) return;
        if (Array.isArray(raw)) {
            snapshot[field] = raw.map((value) => ({ value, label: optionLabel(value, lang) }));
            return;
        }
        snapshot[field] = { value: raw, label: field === 'country_code' ? String(raw).toUpperCase() : optionLabel(raw, lang) };
    });
    return snapshot;
}

function mapRecommendationForReport(item, lang, labels, copy) {
    const title = localizeKey(labels, 'target', item.targetId);
    const statusLabel = localizedText[lang]?.fit?.[item.fitStatus] || localizedText.en.fit[item.fitStatus] || item.fitStatus;
    return {
        typeLabel: copy.type[item.type] || item.type,
        title,
        status: statusLabel,
        statusExplanation: item.fitStatus === 'potential_fit'
            ? firstReasonText(item, labels)
            : item.fitStatus === 'conditional_fit'
                ? `${firstReasonText(item, labels)} ${copy.verbs.conditions}: ${(item.conditionKeys || []).map((key) => localizeKey(labels, 'condition', key)).join(' ')}`
                : `${firstReasonText(item, labels)} ${copy.verbs.constraints}: ${(item.constraintKeys || []).map((key) => localizeKey(labels, 'constraint', key)).join(' ')}`,
        priority: item.priority,
        why: firstReasonText(item, labels),
        improves: firstReasonText(item, labels),
        conditions: (item.conditionKeys || []).map((key) => localizeKey(labels, 'condition', key)),
        constraints: (item.constraintKeys || []).map((key) => localizeKey(labels, 'constraint', key)),
        nextStep: item.type === 'product'
            ? localizeKey(labels, 'condition', item.conditionKeys?.[0] || 'condition.review_matrix_method_country')
            : localizeKey(labels, 'action', DIMENSION_ACTIONS.digital_readiness)
    };
}

function groupRecommendations(result, lang, labels, copy) {
    const groups = Object.keys(GROUP_TARGETS).map((groupId) => ({
        groupId,
        title: copy.groups[groupId],
        recommendations: []
    }));
    const byGroup = Object.fromEntries(groups.map((group) => [group.groupId, group]));
    result.recommendations.forEach((item) => {
        let groupId = Object.entries(GROUP_TARGETS).find(([, targets]) => targets.includes(item.targetId))?.[0];
        if (!groupId && item.type === 'product') groupId = 'analytical';
        if (!groupId && item.fitStatus === 'technical_review_required') groupId = 'review';
        if (!groupId) groupId = item.type === 'module' ? 'digital' : 'review';
        byGroup[groupId].recommendations.push(mapRecommendationForReport(item, lang, labels, copy));
        if (item.fitStatus === 'technical_review_required' && groupId !== 'review') {
            byGroup.review.recommendations.push(mapRecommendationForReport(item, lang, labels, copy));
        }
    });
    return groups.filter((group) => group.recommendations.length > 0);
}

function buildMaturityAnalysis(result, lang, labels, copy) {
    return result.scores.map((score) => ({
        name: localizedText[lang]?.maturity?.[score.dimensionId] || localizedText.en.maturity[score.dimensionId] || score.dimensionId,
        level: score.level,
        label: copy.levelLabels[Math.max(0, Math.min(4, score.level - 1))],
        explanation: (score.reasonKeys || []).map((key) => localizeKey(labels, 'reason', key)).join(' '),
        nextImprovement: localizeKey(labels, 'action', DIMENSION_ACTIONS[score.dimensionId] || 'standardize-sample-workflow')
    }));
}

function buildImplementationPlan(result, labels, copy) {
    const actions = result.recommendedActions.length ? result.recommendedActions : [
        { actionId: 'standardize-sample-workflow', priority: 1 },
        { actionId: 'connect-custody-method-batch', priority: 2 },
        { actionId: 'connect-reading-and-review', priority: 3 },
        { actionId: 'improve-report-delivery', priority: 4 },
        { actionId: 'scale-with-trends-and-dashboard', priority: 5 }
    ];
    return actions.slice(0, 5).map((action, index) => ({
        phase: index + 1,
        title: localizeKey(labels, 'action', action.actionId),
        explanation: localizeKey(labels, 'reason', action.reasonKeys?.[0] || 'reason.fragmented_sample_flow'),
        relatedModules: result.recommendations
            .filter((item) => item.type === 'module')
            .slice(0, 3)
            .map((item) => localizeKey(labels, 'target', item.targetId)),
        condition: copy.verbs.conditions,
        expectedOutcome: copy.verbs.expected
    }));
}

function buildMissingInformation(result, answers, lang, copy) {
    const productNeedsReview = result.recommendations.some((item) => item.type === 'product' && item.fitStatus !== 'potential_fit');
    if (!productNeedsReview) return [];
    const checks = [
        ['target_groups', { en: 'organism', es: 'organismo', fr: 'organisme', it: 'organismo', ca: 'organisme' }],
        ['sample_volume_context', { en: 'volume', es: 'volumen', fr: 'volume', it: 'volume', ca: 'volum' }],
        ['method_context', { en: 'method', es: 'metodo', fr: 'methode', it: 'metodo', ca: 'metode' }],
        ['intended_use', { en: 'intended use', es: 'uso previsto', fr: 'usage prevu', it: 'uso previsto', ca: 'us previst' }],
        ['country_code', { en: 'country', es: 'pais', fr: 'pays', it: 'paese', ca: 'pais' }],
        ['lab_model', { en: 'laboratory model', es: 'laboratorio', fr: 'modele laboratoire', it: 'modello laboratorio', ca: 'model laboratori' }]
    ];
    return checks
        .filter(([field]) => {
            const value = answers[field];
            return value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0) || value === 'unknown' || value === 'not_defined';
        })
        .map(([, label]) => label[lang] || label.en || copy.notIndicated);
}

function buildWorkflowAdvisorReport({ result, answers = {}, questionnaire: questionnaireDefinition = questionnaire, lang = 'en' } = {}) {
    if (!result) throw new Error('workflow_advisor_report_result_required');
    const safeLang = languages.includes(lang) ? lang : 'en';
    const copy = reportText(safeLang);
    const sections = reportSections(safeLang);
    const labels = reportLabels(safeLang);
    const maturity = buildMaturityAnalysis(result, safeLang, labels, copy);
    const complexity = result.scores.find((score) => score.dimensionId === 'operational_complexity')?.level || 1;
    const analytical = result.scores.find((score) => score.dimensionId === 'analytical_context_completeness')?.level || 1;
    const summary = [
        sentenceFromTemplate(copy.summaryLead, {
            context: analytical >= 4 ? copy.contextStrong : copy.contextWeak,
            complexity: complexity >= 4 ? copy.complexityHigh : copy.complexityLow
        }),
        copy.summarySecond
    ];
    const recommendationGroups = groupRecommendations(result, safeLang, labels, copy);
    const productEvaluation = result.recommendations
        .filter((item) => item.type === 'product')
        .map((item) => mapRecommendationForReport(item, safeLang, labels, copy));
    const digitalModules = result.recommendations
        .filter((item) => item.type === 'module')
        .map((item) => mapRecommendationForReport(item, safeLang, labels, copy));
    return {
        reportVersion,
        lang: safeLang,
        sections,
        sector: { sectorId: result.sectorId, label: getSectorLabel(result.sectorId, safeLang) },
        answersSnapshot: buildAnswersSnapshot({ answers, sectorId: result.sectorId, sourceProblemId: result.sourceProblemId, lang: safeLang, questionnaire: questionnaireDefinition }),
        executiveSummary: summary,
        interpretedContext: {
            items: [
                { label: CONTEXT_LABELS[safeLang]?.organizationType || CONTEXT_LABELS.en.organizationType, value: optionLabel(answers.organization_type, safeLang) || copy.notIndicated },
                { label: CONTEXT_LABELS[safeLang]?.sites || CONTEXT_LABELS.en.sites, value: optionLabel(answers.site_count_band, safeLang) || copy.notIndicated },
                { label: CONTEXT_LABELS[safeLang]?.labModel || CONTEXT_LABELS.en.labModel, value: optionLabel(answers.lab_model, safeLang) || copy.notIndicated },
                { label: CONTEXT_LABELS[safeLang]?.sampleVolume || CONTEXT_LABELS.en.sampleVolume, value: optionLabel(answers.sample_volume_band, safeLang) || copy.notIndicated }
            ]
        },
        flowAnalysis: {
            summary: copy.flow,
            keySignals: result.findings.map((finding) => localizeKey(labels, 'finding', finding.findingId))
        },
        maturityAnalysis: maturity,
        priorityProblems: result.findings.map((finding) => ({
            title: localizeKey(labels, 'finding', finding.findingId),
            priorityLabel: copy.priority[finding.priority] || finding.priority,
            explanation: (finding.reasonKeys || []).map((key) => localizeKey(labels, 'reason', key)).join(' ')
        })),
        recommendationGroups,
        productEvaluation,
        digitalModules,
        implementationPlan: buildImplementationPlan(result, labels, copy),
        missingInformation: buildMissingInformation(result, answers, safeLang, copy),
        relatedResources: [
            { title: localizeKey(labels, 'target', 'sample-management'), url: getAssessmentPath(safeLang) },
            { title: localizeKey(labels, 'target', 'coa-reporting'), url: getAssessmentPath(safeLang) },
            { title: localizeKey(labels, 'target', 'iso-epa-kits'), url: getAssessmentPath(safeLang) }
        ],
        limitations: copy.limitations,
        cta: {
            title: sections.cta,
            body: copy.ctaBody,
            label: sections.cta
        },
        technicalExport: {
            label: sections.technicalExport,
            note: sections.technicalExportNote
        }
    };
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

    const assessment = {
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
    assessment.reportSnapshot = buildWorkflowAdvisorReport({
        result: assessment,
        answers: input.answers,
        questionnaire,
        lang: input.lang
    });
    return assessment;
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
    reportVersion,
    REPORT_SECTIONS,
    REPORT_COPY,
    REPORT_TRANSLATIONS,
    allowedEvents,
    assessWorkflow,
    buildWorkflowAdvisorReport,
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