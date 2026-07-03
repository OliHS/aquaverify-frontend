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
                { questionId: 'site_count_band', includesAny: ['six_to_twenty', 'more_than_twenty'] },
                { questionId: 'digitised_stages', excludesAll: ['chain_of_custody'] }
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
            audit_readiness: 'Preparación para auditoría',
            operational_complexity: 'Complejidad operativa',
            client_visibility: 'Visibilidad para clientes',
            digital_readiness: 'Preparación digital',
            analytical_context_completeness: 'Contexto analítico'
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

const reportV2Version = 'workflow-advisor-report-v2';

const V2_COPY = Object.freeze({
    en: {
        reportTitle: 'Assessment report',
        generatedAt: 'Generated',
        preparedBy: 'Prepared by',
        assessmentVersionLabel: 'Assessment version',
        language: 'Language',
        versions: 'Versions',
        quickRead: 'Quick read',
        primaryRisk: 'Primary risk',
        immediatePriority: 'Immediate priority',
        analyticalRoute: 'Analytical route',
        nextStep: 'Next step',
        executiveSummary: 'Executive summary',
        context: 'Interpreted context',
        flow: 'Workflow diagnosis',
        maturity: 'Maturity by dimension',
        priorityProblems: 'Priority problems',
        plan: 'Improvement plan',
        digitalModules: 'Digital capabilities inside the plan',
        analyticalReview: 'Analytical route / products to evaluate',
        missingInfo: 'Information still needed',
        relatedResources: 'Related resources',
        limitations: 'Limitations',
        ctaTitle: 'Request technical review',
        ctaButton: 'Request technical review',
        pdfButton: 'Print / save PDF',
        printButton: 'Print report',
        printInstructions: 'Use the browser print dialog and save as PDF. Disable browser headers and footers so the exported file only contains the AquaVerify report.',
        technicalExport: 'Technical export for support',
        technicalExportNote: 'This file is not the consultative report. It contains structured data for AquaVerify technical support.',
        status: {
            potential_fit: 'Potential fit',
            conditional_fit: 'Conditional fit',
            technical_review_required: 'Technical review required',
            product_to_evaluate: 'Product to evaluate'
        },
        levelLabels: ['Very limited', 'Basic', 'Partially structured', 'Structured', 'Advanced'],
        severity: { high: 'High', medium: 'Medium', low: 'Low' },
        noIndicated: 'not indicated',
        missingMethod: 'method not defined',
        routePending: 'Analytical route pending technical review',
        dashboardLater: 'Dashboards should come after the base sample, custody and evidence data are consistent.',
        limitationsList: [
            'This report uses structured answers only. SOPs, raw data, laboratory reports and internal documentation have not been reviewed.',
            'No automatic regulatory acceptance is inferred. Standards-based use must be reviewed by country, matrix, method, laboratory scope and competent authority.',
            'Product candidates are not closed recommendations until matrix, method, volume, intended use, laboratory and country have been reviewed.'
        ],
        fields: {
            sector_id: 'Sector',
            source_problem_id: 'Source problem',
            organization_type: 'Organization type',
            buyer_role: 'Role',
            site_count_band: 'Sites',
            lab_model: 'Laboratory model',
            sample_volume_band: 'Sample volume',
            current_systems: 'Current systems',
            digitised_stages: 'Digitised stages',
            priority_problem_ids: 'Priority problems',
            evidence_needs: 'Evidence needs',
            result_type: 'Result type',
            intended_use: 'Intended use',
            method_context: 'Method',
            sample_volume_context: 'Volume',
            country_code: 'Country',
            water_use_context: 'Water use context'
        }
    },
    es: {
        reportTitle: 'Informe de diagnóstico',
        generatedAt: 'Fecha',
        preparedBy: 'Preparado por',
        assessmentVersionLabel: 'Versión del diagnóstico',
        language: 'Idioma',
        versions: 'Versiones',
        quickRead: 'Lectura rápida',
        primaryRisk: 'Riesgo principal',
        immediatePriority: 'Prioridad inmediata',
        analyticalRoute: 'Ruta analítica',
        nextStep: 'Siguiente paso',
        executiveSummary: 'Resumen ejecutivo',
        context: 'Contexto interpretado',
        flow: 'Análisis del flujo',
        maturity: 'Madurez por dimensiones',
        priorityProblems: 'Problemas prioritarios',
        plan: 'Plan de mejora',
        digitalModules: 'Módulos digitales dentro del plan',
        analyticalReview: 'Ruta analítica / productos a evaluar',
        missingInfo: 'Información que falta',
        relatedResources: 'Recursos relacionados',
        limitations: 'Limitaciones',
        ctaTitle: 'Solicitar revisión técnica',
        ctaButton: 'Solicitar revisión técnica',
        pdfButton: 'Imprimir / guardar PDF',
        printButton: 'Imprimir informe',
        printInstructions: 'Usa el diálogo de impresión del navegador y guarda como PDF. Desactiva cabeceras y pies del navegador para que el archivo contenga solo el informe AquaVerify.',
        technicalExport: 'Exportación técnica para soporte',
        technicalExportNote: 'Este archivo no es el informe consultivo. Contiene datos estructurados para soporte técnico de AquaVerify.',
        status: {
            potential_fit: 'Encaje potencial',
            conditional_fit: 'Encaje condicionado',
            technical_review_required: 'Revisión técnica necesaria',
            product_to_evaluate: 'Producto a evaluar'
        },
        levelLabels: ['Muy limitado', 'Básico', 'Parcialmente estructurado', 'Estructurado', 'Avanzado'],
        severity: { high: 'Alta', medium: 'Media', low: 'Baja' },
        noIndicated: 'no indicado',
        missingMethod: 'método no definido',
        routePending: 'Ruta analítica pendiente de revisión técnica',
        dashboardLater: 'Los dashboards solo deberían añadirse cuando el dato base de muestra, custodia y evidencia sea consistente.',
        limitationsList: [
            'Este informe se basa únicamente en respuestas estructuradas. No se han revisado SOP, datos reales, informes de laboratorio ni documentación interna.',
            'No se infiere aceptación regulatoria automática. Cualquier uso sujeto a norma debe revisarse por país, matriz, método, alcance del laboratorio y autoridad competente.',
            'Los productos candidatos no son recomendaciones cerradas hasta revisar matriz, método, volumen, uso previsto, laboratorio y país.'
        ],
        fields: {
            sector_id: 'Sector',
            source_problem_id: 'Problema de origen',
            organization_type: 'Tipo de organización',
            buyer_role: 'Cargo o función',
            site_count_band: 'Sedes',
            lab_model: 'Modelo de laboratorio',
            sample_volume_band: 'Volumen de muestras',
            current_systems: 'Sistemas actuales',
            digitised_stages: 'Etapas digitalizadas',
            priority_problem_ids: 'Problemas prioritarios',
            evidence_needs: 'Necesidades de evidencia',
            result_type: 'Tipo de resultado',
            intended_use: 'Uso previsto',
            method_context: 'Método',
            sample_volume_context: 'Volumen',
            country_code: 'País',
            water_use_context: 'Uso del agua'
        }
    },
    fr: {
        reportTitle: 'Rapport de diagnostic',
        generatedAt: 'Date',
        preparedBy: 'Préparé par',
        assessmentVersionLabel: 'Version du diagnostic',
        language: 'Langue',
        versions: 'Versions',
        quickRead: 'Lecture rapide',
        primaryRisk: 'Risque principal',
        immediatePriority: 'Priorité immédiate',
        analyticalRoute: 'Route analytique',
        nextStep: 'Prochaine étape',
        executiveSummary: 'Résumé exécutif',
        context: 'Contexte interprété',
        flow: 'Diagnostic du flux',
        maturity: 'Maturité par dimension',
        priorityProblems: 'Problèmes prioritaires',
        plan: 'Plan d’amélioration',
        digitalModules: 'Modules numériques dans le plan',
        analyticalReview: 'Route analytique / produits à évaluer',
        missingInfo: 'Informations manquantes',
        relatedResources: 'Ressources associées',
        limitations: 'Limites',
        ctaTitle: 'Demander une revue technique',
        ctaButton: 'Demander une revue technique',
        pdfButton: 'Imprimer / enregistrer PDF',
        printButton: 'Imprimer le rapport',
        printInstructions: 'Utilisez la boîte de dialogue d’impression du navigateur et enregistrez en PDF. Désactivez les en-têtes et pieds du navigateur pour ne conserver que le rapport AquaVerify.',
        technicalExport: 'Export technique pour support',
        technicalExportNote: 'Ce fichier n’est pas le rapport consultatif. Il contient des données structurées pour le support technique AquaVerify.',
        status: {
            potential_fit: 'Adéquation potentielle',
            conditional_fit: 'Adéquation conditionnelle',
            technical_review_required: 'Revue technique nécessaire',
            product_to_evaluate: 'Produit à évaluer'
        },
        levelLabels: ['Très limité', 'Basique', 'Partiellement structuré', 'Structuré', 'Avancé'],
        severity: { high: 'Élevée', medium: 'Moyenne', low: 'Faible' },
        noIndicated: 'non indiqué',
        missingMethod: 'méthode non définie',
        routePending: 'Route analytique en attente de revue technique',
        dashboardLater: 'Les dashboards doivent venir après des données de base cohérentes sur échantillon, garde et preuve.',
        limitationsList: [
            'Ce rapport repose uniquement sur des réponses structurées. Les SOP, données réelles, rapports laboratoire et documents internes ne sont pas revus.',
            'Aucune acceptation réglementaire automatique n’est déduite. Tout usage normatif doit être revu par pays, matrice, méthode, portée laboratoire et autorité compétente.',
            'Les produits candidats ne sont pas des recommandations fermées avant revue de matrice, méthode, volume, usage prévu, laboratoire et pays.'
        ],
        fields: {
            sector_id: 'Secteur',
            source_problem_id: 'Problème source',
            organization_type: 'Type d’organisation',
            buyer_role: 'Rôle',
            site_count_band: 'Sites',
            lab_model: 'Modèle laboratoire',
            sample_volume_band: 'Volume d’échantillons',
            current_systems: 'Systèmes actuels',
            digitised_stages: 'Étapes numérisées',
            priority_problem_ids: 'Problèmes prioritaires',
            evidence_needs: 'Besoins de preuve',
            result_type: 'Type de résultat',
            intended_use: 'Usage prévu',
            method_context: 'Méthode',
            sample_volume_context: 'Volume',
            country_code: 'Pays',
            water_use_context: 'Usage de l’eau'
        }
    },
    it: {
        reportTitle: 'Report diagnostico',
        generatedAt: 'Data',
        preparedBy: 'Preparato da',
        assessmentVersionLabel: 'Versione della diagnosi',
        language: 'Lingua',
        versions: 'Versioni',
        quickRead: 'Lettura rapida',
        primaryRisk: 'Rischio principale',
        immediatePriority: 'Priorità immediata',
        analyticalRoute: 'Percorso analitico',
        nextStep: 'Prossimo passo',
        executiveSummary: 'Sintesi esecutiva',
        context: 'Contesto interpretato',
        flow: 'Diagnosi del flusso',
        maturity: 'Maturità per dimensione',
        priorityProblems: 'Problemi prioritari',
        plan: 'Piano di miglioramento',
        digitalModules: 'Moduli digitali nel piano',
        analyticalReview: 'Percorso analitico / prodotti da valutare',
        missingInfo: 'Informazioni mancanti',
        relatedResources: 'Risorse correlate',
        limitations: 'Limiti',
        ctaTitle: 'Richiedi revisione tecnica',
        ctaButton: 'Richiedi revisione tecnica',
        pdfButton: 'Stampa / salva PDF',
        printButton: 'Stampa report',
        printInstructions: 'Usa la finestra di stampa del browser e salva in PDF. Disattiva intestazioni e piè di pagina del browser per includere solo il report AquaVerify.',
        technicalExport: 'Esportazione tecnica per supporto',
        technicalExportNote: 'Questo file non è il report consultivo. Contiene dati strutturati per il supporto tecnico AquaVerify.',
        status: {
            potential_fit: 'Potenziale adeguatezza',
            conditional_fit: 'Adeguatezza condizionata',
            technical_review_required: 'Revisione tecnica necessaria',
            product_to_evaluate: 'Prodotto da valutare'
        },
        levelLabels: ['Molto limitato', 'Base', 'Parzialmente strutturato', 'Strutturato', 'Avanzato'],
        severity: { high: 'Alta', medium: 'Media', low: 'Bassa' },
        noIndicated: 'non indicato',
        missingMethod: 'metodo non definito',
        routePending: 'Percorso analitico in attesa di revisione tecnica',
        dashboardLater: 'Le dashboard dovrebbero arrivare dopo dati base coerenti su campione, custodia ed evidenza.',
        limitationsList: [
            'Questo report usa solo risposte strutturate. Non sono stati rivisti SOP, dati reali, report di laboratorio o documentazione interna.',
            'Non si deduce accettazione regolatoria automatica. Ogni uso normativo va rivisto per paese, matrice, metodo, ambito laboratorio e autorità competente.',
            'I prodotti candidati non sono raccomandazioni chiuse prima di rivedere matrice, metodo, volume, uso previsto, laboratorio e paese.'
        ],
        fields: {
            sector_id: 'Settore',
            source_problem_id: 'Problema di origine',
            organization_type: 'Tipo di organizzazione',
            buyer_role: 'Ruolo',
            site_count_band: 'Sedi',
            lab_model: 'Modello laboratorio',
            sample_volume_band: 'Volume campioni',
            current_systems: 'Sistemi attuali',
            digitised_stages: 'Fasi digitalizzate',
            priority_problem_ids: 'Problemi prioritari',
            evidence_needs: 'Esigenze di evidenza',
            result_type: 'Tipo risultato',
            intended_use: 'Uso previsto',
            method_context: 'Metodo',
            sample_volume_context: 'Volume',
            country_code: 'Paese',
            water_use_context: 'Uso dell’acqua'
        }
    },
    ca: {
        reportTitle: 'Informe de diagnòstic',
        generatedAt: 'Data',
        preparedBy: 'Preparat per',
        assessmentVersionLabel: 'Versió del diagnòstic',
        language: 'Idioma',
        versions: 'Versions',
        quickRead: 'Lectura ràpida',
        primaryRisk: 'Risc principal',
        immediatePriority: 'Prioritat immediata',
        analyticalRoute: 'Ruta analítica',
        nextStep: 'Pas següent',
        executiveSummary: 'Resum executiu',
        context: 'Context interpretat',
        flow: 'Diagnosi del flux',
        maturity: 'Maduresa per dimensió',
        priorityProblems: 'Problemes prioritaris',
        plan: 'Pla de millora',
        digitalModules: 'Mòduls digitals dins del pla',
        analyticalReview: 'Ruta analítica / productes a avaluar',
        missingInfo: 'Informació pendent',
        relatedResources: 'Recursos relacionats',
        limitations: 'Limitacions',
        ctaTitle: 'Sol·licitar revisió tècnica',
        ctaButton: 'Sol·licitar revisió tècnica',
        pdfButton: 'Imprimir / desar PDF',
        printButton: 'Imprimir informe',
        printInstructions: 'Fes servir el diàleg d’impressió del navegador i desa com a PDF. Desactiva capçaleres i peus del navegador perquè el fitxer només contingui l’informe AquaVerify.',
        technicalExport: 'Exportació tècnica per a suport',
        technicalExportNote: 'Aquest arxiu no és l’informe consultiu. Conté dades estructurades per al suport tècnic d’AquaVerify.',
        status: {
            potential_fit: 'Encaix potencial',
            conditional_fit: 'Encaix condicionat',
            technical_review_required: 'Revisió tècnica necessària',
            product_to_evaluate: 'Producte a avaluar'
        },
        levelLabels: ['Molt limitat', 'Bàsic', 'Parcialment estructurat', 'Estructurat', 'Avançat'],
        severity: { high: 'Alta', medium: 'Mitjana', low: 'Baixa' },
        noIndicated: 'no indicat',
        missingMethod: 'mètode no definit',
        routePending: 'Ruta analítica pendent de revisió tècnica',
        dashboardLater: 'Els dashboards haurien d’arribar després que la dada base de mostra, custòdia i evidència sigui consistent.',
        limitationsList: [
            'Aquest informe es basa només en respostes estructurades. No s’han revisat SOP, dades reals, informes de laboratori ni documentació interna.',
            'No s’infereix acceptació reguladora automàtica. Qualsevol ús subjecte a norma s’ha de revisar per país, matriu, mètode, abast del laboratori i autoritat competent.',
            'Els productes candidats no són recomanacions tancades fins a revisar matriu, mètode, volum, ús previst, laboratori i país.'
        ],
        fields: {
            sector_id: 'Sector',
            source_problem_id: 'Problema d’origen',
            organization_type: 'Tipus d’organització',
            buyer_role: 'Rol',
            site_count_band: 'Sedes',
            lab_model: 'Model de laboratori',
            sample_volume_band: 'Volum de mostres',
            current_systems: 'Sistemes actuals',
            digitised_stages: 'Etapes digitalitzades',
            priority_problem_ids: 'Problemes prioritaris',
            evidence_needs: 'Necessitats d’evidència',
            result_type: 'Tipus de resultat',
            intended_use: 'Ús previst',
            method_context: 'Mètode',
            sample_volume_context: 'Volum',
            country_code: 'País',
            water_use_context: 'Ús de l’aigua'
        }
    }
});

const V2_OPTION_LABELS = Object.freeze({
    en: {
        '50_to_199_month': '50-199 samples/month',
        'connect-water-source-to-crop-risk': 'Connect water source, plot, crop and risk',
        'manage-reclaimed-water-evidence': 'Document reclaimed water evidence',
        improve_audit_evidence: 'Improve audit evidence',
        name: 'Name',
        email: 'Email',
        company: 'Company',
        countryCode: 'Country',
        buyerRole: 'Role',
        technical_review: 'Technical review',
        comment: 'Comment',
        private_laboratory: 'Private laboratory',
        executive: 'Executive',
        one: 'One',
        internal: 'Internal',
        erp: 'ERP',
        control_plan: 'Control plan',
        inventory: 'Inventory',
        method_traceability: 'Method traceability',
        coa: 'CoA',
        dashboards: 'Dashboards',
        presence_absence: 'Presence/absence',
        routine_internal_control: 'Routine internal control',
        not_defined: 'Not defined',
        irrigation_water: 'Irrigation water',
        reclaimed_water: 'Reclaimed water',
        external_lab_portal: 'External laboratory portal',
        spreadsheets: 'Spreadsheets',
        somatic_coliphages: 'Somatic coliphages',
        f_specific_coliphages: 'F-specific coliphages',
        general_microbiology: 'General microbiology',
        one_ml: '1 mL',
        manufacturer: 'Manufacturer',
        quality: 'Quality',
        two_to_five: '2 to 5',
        mixed: 'Mixed',
        custom_software: 'Custom software',
        chain_of_custody: 'Chain of custody',
        coa_reporting: 'CoA reporting',
        audit_trail: 'Audit trail',
        deviations_and_capa: 'Deviations and CAPA',
        technical_review: 'Technical review',
        both: 'Qualitative and quantitative',
        operational_screening: 'Operational screening',
        other_reference: 'Other methodological reference',
        drinking_water: 'Drinking water',
        process_water: 'Process water',
        'control-critical-process-points': 'Control critical process points',
        'avoid-fragmented-maintenance-records': 'Avoid fragmented maintenance records',
        'compare-plants-and-assets': 'Compare plants and assets',
        'manage-reuse-and-effluent-context': 'Manage reuse and effluent context',
        'connect-process-lab-and-quality': 'Connect process, laboratory and quality',
        coordinate_external_labs: 'Coordinate external laboratories'
    },
    es: {
        '50_to_199_month': '50-199 muestras/mes',
        'connect-water-source-to-crop-risk': 'Conectar fuente de agua, parcela, cultivo y riesgo',
        'manage-reclaimed-water-evidence': 'Documentar evidencia para agua regenerada',
        improve_audit_evidence: 'Mejorar evidencia para auditoría',
        name: 'Nombre',
        email: 'Correo electrónico',
        company: 'Empresa',
        countryCode: 'País',
        buyerRole: 'Cargo o función',
        technical_review: 'Revisión técnica',
        comment: 'Comentario',
        private_laboratory: 'Laboratorio privado',
        executive: 'Dirección',
        one: 'Una',
        internal: 'Interno',
        erp: 'ERP',
        control_plan: 'Plan de control',
        inventory: 'Inventario',
        method_traceability: 'Trazabilidad de método',
        coa: 'CoA',
        dashboards: 'Dashboards',
        presence_absence: 'Presencia/ausencia',
        routine_internal_control: 'Control interno rutinario',
        not_defined: 'No definido',
        irrigation_water: 'Agua de riego',
        reclaimed_water: 'Agua regenerada',
        external_lab_portal: 'Portal de laboratorio externo',
        spreadsheets: 'Hojas de cálculo',
        somatic_coliphages: 'Colífagos somáticos',
        f_specific_coliphages: 'Colífagos F-específicos',
        general_microbiology: 'Microbiología general',
        one_ml: '1 mL',
        manufacturer: 'Fabricante',
        quality: 'Calidad',
        two_to_five: '2 a 5',
        mixed: 'Mixto',
        custom_software: 'Software propio',
        chain_of_custody: 'Cadena de custodia',
        coa_reporting: 'Informes CoA',
        audit_trail: 'Audit trail',
        deviations_and_capa: 'Desviaciones y CAPA',
        technical_review: 'Revisión técnica',
        both: 'Cualitativo y cuantitativo',
        operational_screening: 'Cribado operativo',
        other_reference: 'Otra referencia metodológica',
        drinking_water: 'Agua de consumo',
        process_water: 'Agua de proceso',
        'control-critical-process-points': 'Controlar puntos críticos de proceso',
        'avoid-fragmented-maintenance-records': 'Evitar registros de mantenimiento fragmentados',
        'compare-plants-and-assets': 'Comparar plantas y activos',
        'manage-reuse-and-effluent-context': 'Gestionar reutilización y efluente',
        'connect-process-lab-and-quality': 'Conectar proceso, laboratorio y calidad',
        coordinate_external_labs: 'Coordinar laboratorios externos'
    },
    fr: {
        '50_to_199_month': '50-199 échantillons/mois',
        'connect-water-source-to-crop-risk': 'Relier source d’eau, parcelle, culture et risque',
        'manage-reclaimed-water-evidence': 'Documenter les preuves d’eau réutilisée',
        improve_audit_evidence: 'Améliorer les preuves d’audit',
        name: 'Nom',
        email: 'Email',
        company: 'Entreprise',
        countryCode: 'Pays',
        buyerRole: 'Rôle',
        technical_review: 'Revue technique',
        comment: 'Commentaire',
        private_laboratory: 'Laboratoire privé',
        executive: 'Direction',
        one: 'Un',
        internal: 'Interne',
        erp: 'ERP',
        control_plan: 'Plan de contrôle',
        inventory: 'Inventaire',
        method_traceability: 'Traçabilité méthode',
        coa: 'CoA',
        dashboards: 'Dashboards',
        presence_absence: 'Présence/absence',
        routine_internal_control: 'Contrôle interne de routine',
        not_defined: 'Non défini',
        irrigation_water: 'Eau d’irrigation',
        reclaimed_water: 'Eau réutilisée',
        external_lab_portal: 'Portail laboratoire externe',
        spreadsheets: 'Tableurs',
        somatic_coliphages: 'Coliphages somatiques',
        f_specific_coliphages: 'Coliphages F-spécifiques',
        general_microbiology: 'Microbiologie générale',
        one_ml: '1 mL',
        manufacturer: 'Fabricant',
        quality: 'Qualité',
        two_to_five: '2 à 5',
        mixed: 'Mixte',
        custom_software: 'Logiciel interne',
        chain_of_custody: 'Chaîne de traçabilité',
        coa_reporting: 'Rapports CoA',
        audit_trail: 'Audit trail',
        deviations_and_capa: 'Écarts et CAPA',
        technical_review: 'Revue technique',
        both: 'Qualitatif et quantitatif',
        operational_screening: 'Dépistage opérationnel',
        other_reference: 'Autre référence méthodologique',
        drinking_water: 'Eau de consommation',
        process_water: 'Eau de process',
        'control-critical-process-points': 'Contrôler les points critiques du process',
        'avoid-fragmented-maintenance-records': 'Éviter les registres de maintenance fragmentés',
        'compare-plants-and-assets': 'Comparer sites et actifs',
        'manage-reuse-and-effluent-context': 'Gérer réutilisation et effluent',
        'connect-process-lab-and-quality': 'Relier process, laboratoire et qualité',
        coordinate_external_labs: 'Coordonner les laboratoires externes'
    },
    it: {
        '50_to_199_month': '50-199 campioni/mese',
        'connect-water-source-to-crop-risk': 'Collegare fonte d’acqua, parcella, coltura e rischio',
        'manage-reclaimed-water-evidence': 'Documentare evidenza per acqua rigenerata',
        improve_audit_evidence: 'Migliorare evidenza per audit',
        name: 'Nome',
        email: 'Email',
        company: 'Azienda',
        countryCode: 'Paese',
        buyerRole: 'Ruolo',
        technical_review: 'Revisione tecnica',
        comment: 'Commento',
        private_laboratory: 'Laboratorio privato',
        executive: 'Direzione',
        one: 'Uno',
        internal: 'Interno',
        erp: 'ERP',
        control_plan: 'Piano di controllo',
        inventory: 'Inventario',
        method_traceability: 'Tracciabilità metodo',
        coa: 'CoA',
        dashboards: 'Dashboard',
        presence_absence: 'Presenza/assenza',
        routine_internal_control: 'Controllo interno di routine',
        not_defined: 'Non definito',
        irrigation_water: 'Acqua di irrigazione',
        reclaimed_water: 'Acqua rigenerata',
        external_lab_portal: 'Portale laboratorio esterno',
        spreadsheets: 'Fogli di calcolo',
        somatic_coliphages: 'Colifagi somatici',
        f_specific_coliphages: 'Colifagi F-specifici',
        general_microbiology: 'Microbiologia generale',
        one_ml: '1 mL',
        manufacturer: 'Produttore',
        quality: 'Qualità',
        two_to_five: '2 a 5',
        mixed: 'Misto',
        custom_software: 'Software proprietario',
        chain_of_custody: 'Catena di custodia',
        coa_reporting: 'Report CoA',
        audit_trail: 'Audit trail',
        deviations_and_capa: 'Deviazioni e CAPA',
        technical_review: 'Revisione tecnica',
        both: 'Qualitativo e quantitativo',
        operational_screening: 'Screening operativo',
        other_reference: 'Altro riferimento metodologico',
        drinking_water: 'Acqua potabile',
        process_water: 'Acqua di processo',
        'control-critical-process-points': 'Controllare i punti critici di processo',
        'avoid-fragmented-maintenance-records': 'Evitare registri di manutenzione frammentati',
        'compare-plants-and-assets': 'Confrontare impianti e asset',
        'manage-reuse-and-effluent-context': 'Gestire riuso ed effluente',
        'connect-process-lab-and-quality': 'Collegare processo, laboratorio e qualità',
        coordinate_external_labs: 'Coordinare laboratori esterni'
    },
    ca: {
        '50_to_199_month': '50-199 mostres/mes',
        'connect-water-source-to-crop-risk': 'Connectar font d’aigua, parcel·la, cultiu i risc',
        'manage-reclaimed-water-evidence': 'Documentar evidència per aigua regenerada',
        improve_audit_evidence: 'Millorar evidència per auditoria',
        name: 'Nom',
        email: 'Email',
        company: 'Empresa',
        countryCode: 'País',
        buyerRole: 'Rol',
        technical_review: 'Revisió tècnica',
        comment: 'Comentari',
        private_laboratory: 'Laboratori privat',
        executive: 'Direcció',
        one: 'Una',
        internal: 'Intern',
        erp: 'ERP',
        control_plan: 'Pla de control',
        inventory: 'Inventari',
        method_traceability: 'Traçabilitat de mètode',
        coa: 'CoA',
        dashboards: 'Dashboards',
        presence_absence: 'Presència/absència',
        routine_internal_control: 'Control intern rutinari',
        not_defined: 'No definit',
        irrigation_water: 'Aigua de reg',
        reclaimed_water: 'Aigua regenerada',
        external_lab_portal: 'Portal laboratori extern',
        spreadsheets: 'Fulls de càlcul',
        somatic_coliphages: 'Colífags somàtics',
        f_specific_coliphages: 'Colífags F-específics',
        general_microbiology: 'Microbiologia general',
        one_ml: '1 mL',
        manufacturer: 'Fabricant',
        quality: 'Qualitat',
        two_to_five: '2 a 5',
        mixed: 'Mixt',
        custom_software: 'Software propi',
        chain_of_custody: 'Cadena de custòdia',
        coa_reporting: 'Informes CoA',
        audit_trail: 'Audit trail',
        deviations_and_capa: 'Desviacions i CAPA',
        technical_review: 'Revisió tècnica',
        both: 'Qualitatiu i quantitatiu',
        operational_screening: 'Cribratge operatiu',
        other_reference: 'Una altra referència metodològica',
        drinking_water: 'Aigua de consum',
        process_water: 'Aigua de procés',
        'control-critical-process-points': 'Controlar punts crítics de procés',
        'avoid-fragmented-maintenance-records': 'Evitar registres de manteniment fragmentats',
        'compare-plants-and-assets': 'Comparar plantes i actius',
        'manage-reuse-and-effluent-context': 'Gestionar reutilització i efluent',
        'connect-process-lab-and-quality': 'Connectar procés, laboratori i qualitat',
        coordinate_external_labs: 'Coordinar laboratoris externs'
    }
});

const INDUSTRY_ROUTES = Object.freeze({
    'water-testing-labs': {
        en: '/industries/water-testing-laboratories',
        es: '/es/industrias/laboratorios-analisis-agua',
        fr: '/fr/industries/laboratoires-analyse-eau',
        it: '/it/settori/laboratori-analisi-acqua',
        ca: '/ca/sectors/laboratoris-analisi-aigua'
    },
    'water-quality-control': {
        en: '/industries/water-quality-control',
        es: '/es/industrias/control-calidad-agua',
        fr: '/fr/industries/controle-qualite-eau',
        it: '/it/settori/controllo-qualita-acqua',
        ca: '/ca/sectors/control-qualitat-aigua'
    },
    'municipal-water-testing': {
        en: '/industries/municipal-water-testing',
        es: '/es/industrias/analisis-agua-municipal',
        fr: '/fr/industries/analyse-eau-municipale',
        it: '/it/settori/analisi-acqua-municipale',
        ca: '/ca/sectors/analisi-aigua-municipal'
    },
    'food-beverage-water-quality': {
        en: '/industries/food-beverage-water-quality',
        es: '/es/industrias/calidad-agua-alimentacion-bebidas',
        fr: '/fr/industries/qualite-eau-agroalimentaire',
        it: '/it/settori/qualita-acqua-alimenti-bevande',
        ca: '/ca/sectors/qualitat-aigua-alimentacio-begudes'
    },
    'industrial-process-water': {
        en: '/industries/industrial-process-water',
        es: '/es/industrias/agua-proceso-industrial',
        fr: '/fr/industries/eau-process-industriel',
        it: '/it/settori/acqua-processo-industriale',
        ca: '/ca/sectors/aigua-proces-industrial'
    },
    'facility-water-risk': {
        en: '/industries/facility-water-risk-management',
        es: '/es/industrias/gestion-riesgo-agua-instalaciones',
        fr: '/fr/industries/gestion-risque-eau-batiments',
        it: '/it/settori/gestione-rischio-acqua-strutture',
        ca: '/ca/sectors/gestio-risc-aigua-installacions'
    },
    'agriculture-water': {
        en: '/industries/agriculture-water-management',
        es: '/es/industrias/agricultura',
        fr: '/fr/industries/eau-agriculture',
        it: '/it/settori/acqua-agricoltura',
        ca: '/ca/sectors/aigua-agricultura'
    },
    'pharma-cosmetics-water': {
        en: '/industries/pharmaceutical-cosmetics-water-quality',
        es: '/es/industrias/industria-farmaceutica-cosmetica',
        fr: '/fr/industries/qualite-eau-industrie-pharmaceutique-cosmetique',
        it: '/it/settori/qualita-acqua-industria-farmaceutica-cosmetica',
        ca: '/ca/sectors/qualitat-aigua-industria-farmaceutica-cosmetica'
    },
    'hospitality-tourism-water': {
        en: '/industries/hospitality-tourism-leisure-water-quality',
        es: '/es/industrias/hosteleria-turismo-ocio',
        fr: '/fr/industries/eau-hotellerie-tourisme-loisirs',
        it: '/it/settori/acqua-ospitalita-turismo-tempo-libero',
        ca: '/ca/sectors/aigua-hostaleria-turisme-oci'
    }
});

const GLOSSARY_RESOURCE_ROUTES = Object.freeze({
    reclaimed_water: {
        en: '/en/glossary/reclaimed-water',
        es: '/es/glosario/agua-regenerada',
        fr: '/fr/glossaire/eau-regeneree',
        it: '/it/glossario/acqua-rigenerata',
        ca: '/ca/glossari/aigua-regenerada'
    },
    irrigation: {
        en: '/en/glossary/agricultural-irrigation',
        es: '/es/glosario/riego-agricola',
        fr: '/fr/glossaire/irrigation-agricole',
        it: '/it/glossario/irrigazione-agricola',
        ca: '/ca/glossari/reg-agricola'
    },
    e_coli: {
        en: '/en/glossary/escherichia-coli-e-coli',
        es: '/es/glosario/escherichia-coli-e-coli',
        fr: '/fr/glossaire/escherichia-coli-e-coli',
        it: '/it/glossario/escherichia-coli-e-coli',
        ca: '/ca/glossari/escherichia-coli-e-coli'
    },
    somatic_coliphages: {
        en: '/en/glossary/somatic-coliphages',
        es: '/es/glosario/colifagos-somaticos',
        fr: '/fr/glossaire/coliphages-somatiques',
        it: '/it/glossario/colifagi-somatici',
        ca: '/ca/glossari/colifags-somatics'
    },
    f_specific_coliphages: {
        en: '/en/glossary/f-specific-coliphages',
        es: '/es/glosario/colifagos-f-especificos',
        fr: '/fr/glossaire/coliphages-f-specifiques',
        it: '/it/glossario/colifagi-f-specifici',
        ca: '/ca/glossari/colifags-f-especifics'
    },
    coa: {
        en: '/en/glossary/coa-certificate-of-analysis',
        es: '/es/glosario/coa-certificado-de-analisis',
        fr: '/fr/glossaire/coa-certificat-danalyse',
        it: '/it/glossario/coa-certificato-di-analisi',
        ca: '/ca/glossari/coa-certificat-danalisi'
    },
    process_water: {
        en: '/en/glossary/process-water',
        es: '/es/glosario/agua-de-proceso',
        fr: '/fr/glossaire/eau-de-process',
        it: '/it/glossario/acqua-di-processo',
        ca: '/ca/glossari/aigua-de-proces'
    },
    biofilm: {
        en: '/en/glossary/biofilm',
        es: '/es/glosario/biofilm',
        fr: '/fr/glossaire/biofilm',
        it: '/it/glossario/biofilm',
        ca: '/ca/glossari/biofilm'
    },
    digital_chain_custody: {
        en: '/en/glossary/digital-chain-of-custody',
        es: '/es/glosario/cadena-de-custodia-digital',
        fr: '/fr/glossaire/chaine-de-custodie-digitale',
        it: '/it/glossario/catena-di-custodia-digitale',
        ca: '/ca/glossari/cadena-de-custodia-digital'
    },
    iso_19458: {
        en: '/en/glossary/iso-19458',
        es: '/es/glosario/iso-19458',
        fr: '/fr/glossaire/iso-19458',
        it: '/it/glossario/iso-19458',
        ca: '/ca/glossari/iso-19458'
    },
    aquaverify_cloud: {
        en: '/platform',
        es: '/es/plataforma',
        fr: '/fr/plateforme',
        it: '/it/piattaforma',
        ca: '/ca/plataforma'
    },
    aquatools_chemical_species: {
        en: '/tools/chemical-species-converter',
        es: '/es/herramientas/conversor-especies-quimicas',
        fr: '/fr/outils/convertisseur-especes-chimiques',
        it: '/it/strumenti/convertitore-specie-chimiche',
        ca: '/ca/eines/conversor-especies-quimiques'
    },
    aquatools_hardness: {
        en: '/tools/hardness-alkalinity-calculator',
        es: '/es/herramientas/calculadora-dureza-alcalinidad',
        fr: '/fr/outils/calculateur-durete-alcalinite',
        it: '/it/strumenti/calcolatore-durezza-alcalinita',
        ca: '/ca/eines/calculadora-duresa-alcalinitat'
    },
    excel_to_lims: {
        en: '/en/resources/excel-to-lims-water-analysis',
        es: '/es/recursos/excel-a-lims-analisis-agua',
        fr: '/fr/ressources/excel-vers-lims-analyse-eau',
        it: '/it/risorse/da-excel-a-lims-analisi-acqua',
        ca: '/ca/recursos/excel-a-lims-analisi-aigua'
    }
});

function roadmapPhase(phaseId, title, objective, actions, expectedOutcome, relatedCapabilities = []) {
    return { phaseId, title, objective, actions, expectedOutcome, relatedCapabilities };
}

function localText(en, es, fr, it, ca) {
    return { en, es, fr, it, ca };
}

const workflowAdvisorIndustryProfiles = Object.freeze({
    'water-testing-labs': {
        sectorId: 'water-testing-labs',
        labels: localText('Water testing laboratories', 'Laboratorios de análisis de agua', 'Laboratoires d’analyse de l’eau', 'Laboratori di analisi dell’acqua', 'Laboratoris d’anàlisi d’aigua'),
        reportTitle: localText('Assessment report - Water testing laboratories', 'Informe de diagnóstico - Laboratorios de análisis de agua', 'Rapport de diagnostic - Laboratoires d’analyse de l’eau', 'Report diagnostico - Laboratori di analisi dell’acqua', 'Informe de diagnòstic - Laboratoris d’anàlisi d’aigua'),
        reportSubtitle: localText('Sample-to-report workflow assessment: request, reception, bench, method, batch, review, CoA and client portal.', 'Evaluación del flujo solicitud-muestra-informe: recepción, banco, método, lote, revisión, CoA y portal cliente.', 'Évaluation du flux demande-échantillon-rapport : réception, paillasse, méthode, lot, revue, CoA et portail client.', 'Valutazione del flusso richiesta-campione-report: ricezione, banco, metodo, lotto, revisione, CoA e portale cliente.', 'Avaluació del flux sol·licitud-mostra-informe: recepció, banc, mètode, lot, revisió, CoA i portal client.'),
        buyerContext: localText('The flow is interpreted as a laboratory service workflow where turnaround time, sample identity, method traceability and client delivery matter together.', 'El flujo se interpreta como un servicio de laboratorio donde TAT, identidad de muestra, trazabilidad de método y entrega al cliente deben conectarse.', 'Le flux est lu comme un service laboratoire où délai, identité échantillon, traçabilité méthode et livraison client doivent rester connectés.', 'Il flusso è letto come servizio di laboratorio dove TAT, identità campione, tracciabilità metodo e consegna cliente devono restare collegati.', 'El flux s’interpreta com un servei de laboratori on TAT, identitat de mostra, traçabilitat de mètode i entrega al client han d’estar connectats.'),
        coreObjects: ['request', 'sample', 'bench', 'method', 'batch', 'operator', 'reading', 'technical review', 'CoA', 'client portal', 'TAT', 'scope'],
        commonRisks: {
            en: ['Disconnected sample, method and review records can slow reporting and scope decisions.'],
            es: ['Registros separados de muestra, método y revisión pueden ralentizar informes y decisiones de alcance.'],
            fr: ['Des registres séparés entre échantillon, méthode et revue peuvent ralentir rapports et décisions de portée.'],
            it: ['Registri separati tra campione, metodo e revisione possono rallentare report e decisioni di ambito.'],
            ca: ['Registres separats de mostra, mètode i revisió poden alentir informes i decisions d’abast.']
        },
        evidenceObjects: {
            en: ['request', 'sample reception', 'bench', 'method', 'batch', 'operator', 'reading', 'technical review', 'CoA', 'client portal'],
            es: ['solicitud', 'recepción', 'banco', 'método', 'lote', 'operador', 'lectura', 'revisión técnica', 'CoA', 'portal cliente'],
            fr: ['demande', 'réception', 'paillasse', 'méthode', 'lot', 'opérateur', 'lecture', 'revue technique', 'CoA', 'portail client'],
            it: ['richiesta', 'ricezione', 'banco', 'metodo', 'lotto', 'operatore', 'lettura', 'revisione tecnica', 'CoA', 'portale cliente'],
            ca: ['sol·licitud', 'recepció', 'banc', 'mètode', 'lot', 'operador', 'lectura', 'revisió tècnica', 'CoA', 'portal client']
        },
        recommendedRoadmap: {
            en: [
                roadmapPhase('lab-1', 'Sample registration and reception', 'Connect request, customer, sample and reception status.', ['Define request fields', 'Create sample identifier', 'Record reception conditions'], 'Each sample enters the workflow with accountable context.', ['sample-management']),
                roadmapPhase('lab-2', 'Bench, method, batch and reading', 'Link bench work with method, kit/media batch, operator and reading.', ['Configure methods', 'Record batches', 'Connect reading evidence'], 'The laboratory can reconstruct analytical execution.', ['sample-management', 'inventory-traceability']),
                roadmapPhase('lab-3', 'Technical review', 'Separate execution from technical review and approval.', ['Define review roles', 'Record criteria', 'Track corrections'], 'Reports are easier to defend internally and with customers.', ['lims-review']),
                roadmapPhase('lab-4', 'CoA and client portal', 'Publish reviewed deliverables with traceable history.', ['Define CoA template', 'Set publication rules', 'Expose report history'], 'Customers receive consistent reports without manual reconstruction.', ['coa-reporting', 'customer-portal']),
                roadmapPhase('lab-5', 'Service scaling and TAT', 'Use dashboards once the sample-to-report data is reliable.', ['Track TAT', 'Compare services', 'Prioritize bottlenecks'], 'The laboratory can scale services with measurable evidence.', ['dashboards'])
            ],
            es: [
                roadmapPhase('lab-1', 'Alta y recepción de muestras', 'Conectar solicitud, cliente, muestra y estado de recepción.', ['Definir campos de solicitud', 'Crear identificador de muestra', 'Registrar condiciones de recepción'], 'Cada muestra entra con contexto responsable.', ['sample-management']),
                roadmapPhase('lab-2', 'Banco, método, lote y lectura', 'Vincular trabajo de banco con método, lote de kit/medio, operador y lectura.', ['Configurar métodos', 'Registrar lotes', 'Conectar evidencia de lectura'], 'El laboratorio puede reconstruir la ejecución analítica.', ['sample-management', 'inventory-traceability']),
                roadmapPhase('lab-3', 'Revisión técnica', 'Separar ejecución, revisión técnica y aprobación.', ['Definir roles de revisión', 'Registrar criterios', 'Trazar correcciones'], 'Los informes son más defendibles ante cliente y auditoría.', ['lims-review']),
                roadmapPhase('lab-4', 'CoA y portal cliente', 'Publicar entregables revisados con historial trazable.', ['Definir plantilla CoA', 'Configurar reglas de publicación', 'Exponer histórico'], 'El cliente recibe informes consistentes sin reconstrucción manual.', ['coa-reporting', 'customer-portal']),
                roadmapPhase('lab-5', 'Escalado de servicios y TAT', 'Usar dashboards cuando el dato muestra-informe sea fiable.', ['Medir TAT', 'Comparar servicios', 'Priorizar cuellos de botella'], 'El laboratorio puede escalar servicios con evidencia medible.', ['dashboards'])
            ],
            fr: [], it: [], ca: []
        },
        recommendedResourceIds: ['aquaverify_cloud', 'coa', 'iso_19458'],
        recommendedGlossaryTermIds: ['coa', 'iso_19458'],
        recommendedToolIds: [],
        forbiddenGenericPhrases: ['water programme']
    },
    'water-quality-control': {
        sectorId: 'water-quality-control',
        labels: localText('Water quality control', 'Control de calidad del agua', 'Contrôle qualité de l’eau', 'Controllo qualità dell’acqua', 'Control de qualitat de l’aigua'),
        reportTitle: localText('Assessment report - Water quality control', 'Informe de diagnóstico - Control de calidad del agua', 'Rapport de diagnostic - Contrôle qualité de l’eau', 'Report diagnostico - Controllo qualità dell’acqua', 'Informe de diagnòstic - Control de qualitat de l’aigua'),
        reportSubtitle: localText('Risk-based control workflow: points, matrices, criteria, deviations, operational decisions and audit evidence.', 'Evaluación del programa de control: puntos, matrices, criterios, desviaciones, decisión operativa y evidencia de auditoría.', 'Évaluation du programme de contrôle : points, matrices, critères, écarts, décision opérationnelle et preuve d’audit.', 'Valutazione del programma di controllo: punti, matrici, criteri, deviazioni, decisione operativa ed evidenza audit.', 'Avaluació del programa de control: punts, matrius, criteris, desviacions, decisió operativa i evidència d’auditoria.'),
        buyerContext: localText('The result is read as a control programme moving from reactive checks toward preventive evidence.', 'El resultado se interpreta como un programa de control que debe pasar de controles reactivos a evidencia preventiva.', 'Le résultat est lu comme un programme de contrôle qui doit passer du réactif à la preuve préventive.', 'Il risultato è letto come programma di controllo che deve passare da controlli reattivi a evidenza preventiva.', 'El resultat s’interpreta com un programa de control que ha de passar de controls reactius a evidència preventiva.'),
        coreObjects: ['control programme', 'risk', 'sampling points', 'matrices', 'criteria', 'deviations', 'operational decision', 'audit evidence'],
        commonRisks: { en: ['Control evidence may be hard to defend if point, criterion, result and decision live separately.'], es: ['La evidencia de control puede ser difícil de defender si punto, criterio, resultado y decisión viven separados.'], fr: ['La preuve de contrôle est fragile si point, critère, résultat et décision restent séparés.'], it: ['L’evidenza di controllo è fragile se punto, criterio, risultato e decisione restano separati.'], ca: ['L’evidència de control és feble si punt, criteri, resultat i decisió queden separats.'] },
        evidenceObjects: { en: ['programme', 'risk', 'sampling point', 'matrix', 'criterion', 'deviation', 'decision', 'audit evidence'], es: ['programa', 'riesgo', 'punto de muestreo', 'matriz', 'criterio', 'desviación', 'decisión', 'evidencia de auditoría'], fr: ['programme', 'risque', 'point de prélèvement', 'matrice', 'critère', 'écart', 'décision', 'preuve d’audit'], it: ['programma', 'rischio', 'punto', 'matrice', 'criterio', 'deviazione', 'decisione', 'evidenza audit'], ca: ['programa', 'risc', 'punt', 'matriu', 'criteri', 'desviació', 'decisió', 'evidència d’auditoria'] },
        recommendedRoadmap: {
            en: [
                roadmapPhase('wqc-1', 'Programme of points and matrices', 'Define points, matrices and risk context.', ['Inventory points', 'Classify matrices', 'Assign criteria'], 'A clear control map.'),
                roadmapPhase('wqc-2', 'Sample and criterion record', 'Connect each sample with the applicable criterion.', ['Create sample IDs', 'Link criteria', 'Record method context'], 'Each result has interpretable context.'),
                roadmapPhase('wqc-3', 'Deviations and actions', 'Connect deviations with actions and closure.', ['Define deviation states', 'Assign owners', 'Document closure'], 'Follow-up becomes auditable.'),
                roadmapPhase('wqc-4', 'Audit evidence', 'Prepare CoA, review and evidence packs.', ['Define CoA', 'Store review evidence', 'Prepare audit trail'], 'Audits can be answered from one history.'),
                roadmapPhase('wqc-5', 'Trends and prevention', 'Use trends after base records are reliable.', ['Compare points', 'Review recurrence', 'Prioritize prevention'], 'The programme moves toward prevention.')
            ],
            es: [
                roadmapPhase('wqc-1', 'Programa de puntos y matrices', 'Definir puntos, matrices y contexto de riesgo.', ['Inventariar puntos', 'Clasificar matrices', 'Asignar criterios'], 'Un mapa de control claro.'),
                roadmapPhase('wqc-2', 'Registro de muestra y criterio', 'Conectar cada muestra con el criterio aplicable.', ['Crear identificadores', 'Vincular criterios', 'Registrar método'], 'Cada resultado tiene contexto interpretable.'),
                roadmapPhase('wqc-3', 'Desviaciones y acciones', 'Conectar desviaciones con acciones y cierre.', ['Definir estados', 'Asignar responsables', 'Documentar cierre'], 'El seguimiento se vuelve auditable.'),
                roadmapPhase('wqc-4', 'Evidencia para auditoría', 'Preparar CoA, revisión y paquete de evidencias.', ['Definir CoA', 'Guardar revisión', 'Preparar audit trail'], 'La auditoría se responde desde un historial común.'),
                roadmapPhase('wqc-5', 'Tendencias y prevención', 'Usar tendencias cuando los registros base sean fiables.', ['Comparar puntos', 'Revisar recurrencia', 'Priorizar prevención'], 'El programa evoluciona hacia prevención.')
            ],
            fr: [], it: [], ca: []
        },
        recommendedResourceIds: ['aquaverify_cloud', 'coa', 'iso_19458'],
        recommendedGlossaryTermIds: ['coa'],
        recommendedToolIds: [],
        forbiddenGenericPhrases: ['water programme']
    },
    'municipal-water-testing': {
        sectorId: 'municipal-water-testing',
        labels: localText('Municipal water', 'Agua municipal', 'Eau municipale', 'Acqua municipale', 'Aigua municipal'),
        reportTitle: localText('Assessment report - Municipal water', 'Informe de diagnóstico - Agua municipal', 'Rapport de diagnostic - Eau municipale', 'Report diagnostico - Acqua municipale', 'Informe de diagnòstic - Aigua municipal'),
        reportSubtitle: localText('Municipal workflow assessment: source, treatment, tank, network, field, laboratory, incident and institutional evidence.', 'Evaluación del flujo municipal: captación, tratamiento, depósito, red, campo, laboratorio, incidencia y evidencia institucional.', 'Évaluation du flux municipal : captage, traitement, réservoir, réseau, terrain, laboratoire, incident et preuve institutionnelle.', 'Valutazione del flusso municipale: captazione, trattamento, serbatoio, rete, campo, laboratorio, incidente ed evidenza istituzionale.', 'Avaluació del flux municipal: captació, tractament, dipòsit, xarxa, camp, laboratori, incidència i evidència institucional.'),
        buyerContext: localText('Municipal control links field teams, laboratories, operators, committees and the competent authority.', 'El control municipal conecta campo, laboratorio, operador, responsable municipal, comité técnico y autoridad competente.', 'Le contrôle municipal relie terrain, laboratoire, opérateur, comité technique et autorité compétente.', 'Il controllo municipale collega campo, laboratorio, operatore, comitato tecnico e autorità competente.', 'El control municipal connecta camp, laboratori, operador, comitè tècnic i autoritat competent.'),
        coreObjects: ['source', 'treatment', 'plant', 'tank', 'network', 'field', 'laboratory', 'operator', 'municipal owner', 'technical committee', 'competent authority', 'incident'],
        commonRisks: { en: ['Incidents become slower to investigate if field, laboratory and institutional evidence are disconnected.'], es: ['Una incidencia tarda más en investigarse si campo, laboratorio y evidencia institucional están desconectados.'], fr: ['Un incident est plus lent à instruire si terrain, laboratoire et preuve institutionnelle sont séparés.'], it: ['Un incidente richiede più tempo se campo, laboratorio ed evidenza istituzionale sono separati.'], ca: ['Una incidència triga més si camp, laboratori i evidència institucional estan separats.'] },
        evidenceObjects: { en: ['source', 'treatment', 'tank', 'network', 'field', 'laboratory', 'operator', 'incident', 'competent authority'], es: ['captación', 'tratamiento', 'depósito', 'red', 'campo', 'laboratorio', 'operador', 'incidencia', 'autoridad competente'], fr: ['captage', 'traitement', 'réservoir', 'réseau', 'terrain', 'laboratoire', 'opérateur', 'incident', 'autorité compétente'], it: ['captazione', 'trattamento', 'serbatoio', 'rete', 'campo', 'laboratorio', 'operatore', 'incidente', 'autorità competente'], ca: ['captació', 'tractament', 'dipòsit', 'xarxa', 'camp', 'laboratori', 'operador', 'incidència', 'autoritat competent'] },
        recommendedRoadmap: {
            en: [
                roadmapPhase('mun-1', 'Inventory of points and zones', 'Map source, treatment, tank, network and sensitive points.', ['Inventory points', 'Assign zones', 'Define owners'], 'A municipal point map.'),
                roadmapPhase('mun-2', 'Field-laboratory custody chain', 'Connect field collection with laboratory receipt.', ['Record operator', 'Record conditions', 'Track custody'], 'Each sample can be traced from field to lab.'),
                roadmapPhase('mun-3', 'Method, reading and technical review', 'Link method, reading and review evidence.', ['Configure method', 'Record reading', 'Approve review'], 'The result has defensible technical context.'),
                roadmapPhase('mun-4', 'Report, CoA or institutional deliverable', 'Prepare a reviewed deliverable for internal or external stakeholders.', ['Define report', 'Attach evidence', 'Document decision'], 'The municipality can communicate with consistent evidence.'),
                roadmapPhase('mun-5', 'Trends by source, treatment, tank or network', 'Use trends after the operational history is connected.', ['Compare zones', 'Review incidents', 'Prioritize actions'], 'Recurring issues become visible.')
            ],
            es: [
                roadmapPhase('mun-1', 'Inventario de puntos y zonas', 'Mapear captación, tratamiento, ETAP, depósito, red y puntos sensibles.', ['Inventariar puntos', 'Asignar zonas', 'Definir responsables'], 'Un mapa municipal de puntos.'),
                roadmapPhase('mun-2', 'Cadena de custodia campo-laboratorio', 'Conectar toma de muestra en campo con recepción en laboratorio.', ['Registrar operador', 'Registrar condiciones', 'Trazar custodia'], 'Cada muestra se reconstruye de campo a laboratorio.'),
                roadmapPhase('mun-3', 'Método, lectura y revisión técnica', 'Vincular método, lectura y evidencia de revisión.', ['Configurar método', 'Registrar lectura', 'Aprobar revisión'], 'El resultado tiene contexto técnico defendible.'),
                roadmapPhase('mun-4', 'Informe, CoA o entregable institucional', 'Preparar un entregable revisado para responsables internos o externos.', ['Definir informe', 'Adjuntar evidencia', 'Documentar decisión'], 'El municipio comunica con evidencia consistente.'),
                roadmapPhase('mun-5', 'Tendencias por captación, tratamiento, depósito o red', 'Usar tendencias cuando el historial operativo esté conectado.', ['Comparar zonas', 'Revisar incidencias', 'Priorizar acciones'], 'Los problemas recurrentes se vuelven visibles.')
            ],
            fr: [], it: [], ca: []
        },
        recommendedResourceIds: ['aquaverify_cloud', 'coa', 'somatic_coliphages'],
        recommendedGlossaryTermIds: ['somatic_coliphages', 'coa'],
        recommendedToolIds: [],
        forbiddenGenericPhrases: ['water programme']
    },
    'food-beverage-water-quality': {
        sectorId: 'food-beverage-water-quality',
        labels: localText('Food and beverage water', 'Agua en alimentación y bebidas', 'Eau agroalimentaire', 'Acqua food & beverage', 'Aigua en alimentació i begudes'),
        reportTitle: localText('Assessment report - Food and beverage water', 'Informe de diagnóstico - Agua en alimentación y bebidas', 'Rapport de diagnostic - Eau agroalimentaire', 'Report diagnostico - Acqua food & beverage', 'Informe de diagnòstic - Aigua en alimentació i begudes'),
        reportSubtitle: localText('Food water workflow assessment: ingredient water, contact water, washing, ice, steam, CIP, final rinse, line, batch and customer audit.', 'Evaluación del flujo de agua alimentaria: ingrediente, contacto, lavado, hielo, vapor, CIP, enjuague final, línea, lote y auditoría de cliente.', 'Évaluation du flux eau agroalimentaire : ingrédient, contact, lavage, glace, vapeur, CIP, rinçage final, ligne, lot et audit client.', 'Valutazione del flusso acqua alimentare: ingrediente, contatto, lavaggio, ghiaccio, vapore, CIP, risciacquo finale, linea, lotto e audit cliente.', 'Avaluació del flux d’aigua alimentària: ingredient, contacte, rentat, gel, vapor, CIP, esbandida final, línia, lot i auditoria de client.'),
        buyerContext: localText('The assessment treats water as part of production release, HACCP evidence and customer audit readiness.', 'El diagnóstico trata el agua como parte de liberación, APPCC/HACCP y evidencia para auditoría de cliente.', 'Le diagnostic traite l’eau comme partie de libération, HACCP et preuve pour audit client.', 'La valutazione tratta l’acqua come parte di rilascio, HACCP ed evidenza per audit cliente.', 'El diagnòstic tracta l’aigua com a part d’alliberament, APPCC/HACCP i evidència per auditoria de client.'),
        coreObjects: ['ingredient water', 'contact water', 'washing', 'ice', 'steam', 'CIP', 'final rinse', 'line', 'batch', 'HACCP', 'release', 'customer audit'],
        commonRisks: { en: ['Water evidence can become weak if line, batch, point, method and release decision are separated.'], es: ['La evidencia de agua se debilita si línea, lote, punto, método y decisión de liberación quedan separados.'], fr: ['La preuve eau est fragile si ligne, lot, point, méthode et décision de libération sont séparés.'], it: ['L’evidenza acqua è fragile se linea, lotto, punto, metodo e decisione di rilascio sono separati.'], ca: ['L’evidència d’aigua és feble si línia, lot, punt, mètode i decisió d’alliberament queden separats.'] },
        evidenceObjects: { en: ['ingredient water', 'CIP', 'final rinse', 'line', 'batch', 'HACCP', 'release', 'customer audit'], es: ['agua como ingrediente', 'CIP', 'enjuague final', 'línea', 'lote', 'APPCC/HACCP', 'liberación', 'auditoría de cliente'], fr: ['eau ingrédient', 'CIP', 'rinçage final', 'ligne', 'lot', 'HACCP', 'libération', 'audit client'], it: ['acqua ingrediente', 'CIP', 'risciacquo finale', 'linea', 'lotto', 'HACCP', 'rilascio', 'audit cliente'], ca: ['aigua com a ingredient', 'CIP', 'esbandida final', 'línia', 'lot', 'APPCC/HACCP', 'alliberament', 'auditoria de client'] },
        recommendedRoadmap: {
            en: [
                roadmapPhase('fb-1', 'Map water uses', 'Classify ingredient, contact, wash, ice, steam and rinse uses.', ['List uses', 'Assign lines', 'Define criticality'], 'Water uses are visible.'),
                roadmapPhase('fb-2', 'Critical points, line, batch and HACCP', 'Connect samples to production context.', ['Map points', 'Link line and batch', 'Define HACCP evidence'], 'Results can support release decisions.'),
                roadmapPhase('fb-3', 'Sample, method and review', 'Connect sample, method, reading and technical review.', ['Record method', 'Review result', 'Track deviations'], 'The laboratory record is defensible.'),
                roadmapPhase('fb-4', 'CoA and audit evidence', 'Prepare evidence for release or customer audit.', ['Define CoA', 'Attach evidence', 'Record decision'], 'Audit packs are faster to prepare.'),
                roadmapPhase('fb-5', 'Trends by plant, point, line or supplier', 'Use dashboards after base records are stable.', ['Compare trend', 'Review supplier', 'Prioritize prevention'], 'Recurring risk becomes visible.')
            ],
            es: [
                roadmapPhase('fb-1', 'Mapa de usos del agua', 'Clasificar agua como ingrediente, contacto, lavado, hielo, vapor y enjuague final.', ['Listar usos', 'Asignar líneas', 'Definir criticidad'], 'Los usos del agua quedan visibles.'),
                roadmapPhase('fb-2', 'Puntos críticos, línea, lote y APPCC', 'Conectar muestras con contexto de producción.', ['Mapear puntos', 'Vincular línea y lote', 'Definir evidencia APPCC'], 'Los resultados apoyan liberación y auditoría.'),
                roadmapPhase('fb-3', 'Muestra, método y revisión', 'Conectar muestra, método, lectura y revisión técnica.', ['Registrar método', 'Revisar resultado', 'Trazar desviaciones'], 'El registro de laboratorio es defendible.'),
                roadmapPhase('fb-4', 'CoA y evidencia para liberación o auditoría', 'Preparar evidencia para liberación o auditoría de cliente.', ['Definir CoA', 'Adjuntar evidencia', 'Registrar decisión'], 'El paquete de auditoría se prepara con menos reconstrucción.'),
                roadmapPhase('fb-5', 'Tendencias por planta, punto, línea o proveedor', 'Usar dashboards cuando los registros base sean estables.', ['Comparar tendencias', 'Revisar proveedor', 'Priorizar prevención'], 'El riesgo recurrente se vuelve visible.')
            ],
            fr: [], it: [], ca: []
        },
        recommendedResourceIds: ['aquaverify_cloud', 'coa', 'iso_19458'],
        recommendedGlossaryTermIds: ['coa', 'iso_19458'],
        recommendedToolIds: [],
        forbiddenGenericPhrases: ['water programme']
    },
    'industrial-process-water': {
        sectorId: 'industrial-process-water',
        labels: localText('Industrial process water', 'Agua de proceso industrial', 'Eau de procédé industriel', 'Acqua di processo industriale', 'Aigua de procés industrial'),
        reportTitle: localText('Assessment report - Industrial process water', 'Informe de diagnóstico - Agua de proceso industrial', 'Rapport de diagnostic - Eau de procédé industriel', 'Report diagnostico - Acqua di processo industriale', 'Informe de diagnòstic - Aigua de procés industrial'),
        reportSubtitle: localText('Indicative assessment of the industrial water control workflow: intake, treatment, circuit, asset, process, recirculation, cooling, cleaning, reuse, effluent and corrective action.', 'Evaluación orientativa del flujo de control de agua industrial: captación, tratamiento, circuito, activo, proceso, recirculación, refrigeración, limpieza, reutilización, efluente y acción correctiva.', 'Évaluation indicative du flux de contrôle d’eau industrielle : captage, traitement, circuit, actif, procédé, recirculation, refroidissement, nettoyage, réutilisation, effluent et action corrective.', 'Valutazione orientativa del flusso di controllo dell’acqua industriale: captazione, trattamento, circuito, asset, processo, ricircolo, raffreddamento, pulizia, riuso, effluente e azione correttiva.', 'Avaluació orientativa del flux de control d’aigua industrial: captació, tractament, circuit, actiu, procés, recirculació, refrigeració, neteja, reutilització, efluent i acció correctiva.'),
        buyerContext: localText('The assessment links water quality to assets, process conditions, EHS, maintenance and corrective action.', 'El diagnóstico conecta calidad del agua con activos, condiciones de proceso, EHS, mantenimiento y acción correctiva.', 'Le diagnostic relie qualité de l’eau, actifs, conditions procédé, EHS, maintenance et action corrective.', 'La valutazione collega qualità acqua, asset, condizioni di processo, EHS, manutenzione e azione correttiva.', 'El diagnòstic connecta qualitat de l’aigua amb actius, condicions de procés, EHS, manteniment i acció correctiva.'),
        coreObjects: ['intake', 'treatment', 'circuit', 'asset', 'process', 'recirculation', 'cooling', 'cleaning', 'reuse', 'effluent', 'maintenance', 'EHS', 'supplier', 'corrective action'],
        commonRisks: { en: ['Process-water decisions weaken if sample context is not connected to asset, circuit and operating condition.'], es: ['La decisión sobre agua de proceso se debilita si la muestra no se conecta con activo, circuito y condición operativa.'], fr: ['La décision eau procédé est fragile si l’échantillon n’est pas relié à l’actif, au circuit et à la condition opératoire.'], it: ['La decisione su acqua di processo è fragile se il campione non è collegato ad asset, circuito e condizione operativa.'], ca: ['La decisió sobre aigua de procés és feble si la mostra no es connecta amb actiu, circuit i condició operativa.'] },
        evidenceObjects: { en: ['intake', 'treatment', 'circuit', 'asset', 'process', 'recirculation', 'cooling', 'cleaning', 'reuse', 'effluent', 'corrective action'], es: ['captación', 'tratamiento', 'circuito', 'activo', 'proceso', 'recirculación', 'refrigeración', 'limpieza', 'reutilización', 'efluente', 'acción correctiva'], fr: ['captage', 'traitement', 'circuit', 'actif', 'procédé', 'recirculation', 'refroidissement', 'nettoyage', 'réutilisation', 'effluent', 'action corrective'], it: ['captazione', 'trattamento', 'circuito', 'asset', 'processo', 'ricircolo', 'raffreddamento', 'pulizia', 'riuso', 'effluente', 'azione correttiva'], ca: ['captació', 'tractament', 'circuit', 'actiu', 'procés', 'recirculació', 'refrigeració', 'neteja', 'reutilització', 'efluent', 'acció correctiva'] },
        recommendedRoadmap: {
            en: [
                roadmapPhase('ind-1', 'Map circuits and assets', 'Connect water points to circuits and assets.', ['Inventory circuits', 'Assign assets', 'Record conditions'], 'Operational context is visible.'),
                roadmapPhase('ind-2', 'Sample, point, condition and laboratory', 'Connect sample and laboratory result with operating context.', ['Define point', 'Record condition', 'Review lab model'], 'Results can be interpreted by process state.'),
                roadmapPhase('ind-3', 'Deviations and corrective actions', 'Document deviation, owner and closure.', ['Define states', 'Assign action', 'Record evidence'], 'Corrective action becomes traceable.'),
                roadmapPhase('ind-4', 'Reuse, recirculation or effluent', 'Add reuse or effluent evidence when applicable.', ['Classify water use', 'Define limits', 'Attach evidence'], 'Reuse decisions are documented.'),
                roadmapPhase('ind-5', 'Trends by plant, circuit or asset', 'Use trend views after base data is connected.', ['Compare circuits', 'Review recurrence', 'Prioritize maintenance'], 'Maintenance and EHS gain a shared view.')
            ],
            es: [
                roadmapPhase('ind-1', 'Mapa de circuitos y activos', 'Conectar puntos de agua con circuitos y activos.', ['Inventariar circuitos', 'Asignar activos', 'Registrar condiciones'], 'El contexto operativo queda visible.'),
                roadmapPhase('ind-2', 'Muestra, punto, condición operativa y laboratorio', 'Conectar muestra y resultado con estado de proceso.', ['Definir punto', 'Registrar condición', 'Revisar modelo de laboratorio'], 'El resultado se interpreta según estado operativo.'),
                roadmapPhase('ind-3', 'Desviaciones y acciones correctivas', 'Documentar desviación, responsable y cierre.', ['Definir estados', 'Asignar acción', 'Registrar evidencia'], 'La acción correctiva es trazable.'),
                roadmapPhase('ind-4', 'Reutilización, recirculación o efluente', 'Añadir evidencia específica cuando aplique.', ['Clasificar uso', 'Definir límites', 'Adjuntar evidencia'], 'Las decisiones de reutilización quedan documentadas.'),
                roadmapPhase('ind-5', 'Tendencias por planta, circuito o activo', 'Usar tendencias cuando el dato base esté conectado.', ['Comparar circuitos', 'Revisar recurrencia', 'Priorizar mantenimiento'], 'Mantenimiento y EHS comparten una vista común.')
            ],
            fr: [], it: [], ca: []
        },
        recommendedResourceIds: ['industrial-process-water-page', 'aquaverify_cloud'],
        recommendedGlossaryTermIds: ['process_water', 'biofilm', 'coa', 'digital_chain_custody'],
        recommendedToolIds: ['aquatools_hardness', 'aquatools_chemical_species', 'excel_to_lims'],
        forbiddenGenericPhrases: ['water programme']
    },
    'facility-water-risk': {
        sectorId: 'facility-water-risk',
        labels: localText('Facility water risk', 'Riesgo de agua en instalaciones', 'Risque eau en bâtiment', 'Rischio acqua nelle strutture', 'Risc d’aigua en instal·lacions'),
        reportTitle: localText('Assessment report - Facility water risk', 'Informe de diagnóstico - Riesgo de agua en instalaciones', 'Rapport de diagnostic - Risque eau en bâtiment', 'Report diagnostico - Rischio acqua nelle strutture', 'Informe de diagnòstic - Risc d’aigua en instal·lacions'),
        reportSubtitle: localText('Facility workflow assessment: sites, buildings, DHW, DCW, tanks, terminal points, showers, towers, spas, aerosolization, Legionella and inspection evidence.', 'Evaluación del flujo de instalaciones: sedes, edificios, ACS, AFCH, depósitos, puntos terminales, duchas, torres, spas, aerosolización, Legionella e inspección.', 'Évaluation bâtiment : sites, bâtiments, ECS, EFS, réservoirs, points terminaux, douches, tours, spas, aérosolisation, Legionella et inspection.', 'Valutazione strutture: sedi, edifici, ACS, AFCH, serbatoi, punti terminali, docce, torri, spa, aerosolizzazione, Legionella e ispezione.', 'Avaluació d’instal·lacions: seus, edificis, ACS, AFCH, dipòsits, punts terminals, dutxes, torres, spas, aerosolització, Legionella i inspecció.'),
        buyerContext: localText('The assessment does not replace a sanitary plan, PPCL/PSL, responsible technician or laboratory; it organizes evidence around assets and follow-up.', 'El diagnóstico no sustituye plan sanitario, PPCL/PSL, responsable técnico ni laboratorio; organiza evidencia por activos y seguimiento.', 'Le diagnostic ne remplace pas plan sanitaire, responsable technique ni laboratoire ; il organise preuve par actifs et suivi.', 'La valutazione non sostituisce piano sanitario, responsabile tecnico o laboratorio; organizza evidenza per asset e follow-up.', 'El diagnòstic no substitueix pla sanitari, responsable tècnic ni laboratori; organitza evidència per actius i seguiment.'),
        coreObjects: ['sites', 'buildings', 'DHW', 'DCW', 'tanks', 'terminal points', 'showers', 'towers', 'spas', 'fountains', 'aerosolization', 'Legionella', 'maintenance', 'supplier', 'laboratory', 'inspection', 'document closure'],
        commonRisks: { en: ['Inspection evidence weakens when assets, sampling, supplier, laboratory result and closure are separated.'], es: ['La evidencia ante inspección se debilita si activo, muestreo, proveedor, resultado y cierre documental están separados.'], fr: ['La preuve d’inspection est fragile si actif, prélèvement, prestataire, résultat et clôture documentaire sont séparés.'], it: ['L’evidenza per ispezione è fragile se asset, campionamento, fornitore, risultato e chiusura sono separati.'], ca: ['L’evidència per inspecció és feble si actiu, mostreig, proveïdor, resultat i tancament documental estan separats.'] },
        evidenceObjects: { en: ['DHW', 'DCW', 'terminal point', 'aerosolization', 'Legionella', 'supplier', 'inspection', 'document closure'], es: ['ACS', 'AFCH', 'punto terminal', 'aerosolización', 'Legionella', 'proveedor', 'inspección', 'cierre documental'], fr: ['ECS', 'EFS', 'point terminal', 'aérosolisation', 'Legionella', 'prestataire', 'inspection', 'clôture documentaire'], it: ['ACS', 'AFCH', 'punto terminale', 'aerosolizzazione', 'Legionella', 'fornitore', 'ispezione', 'chiusura documentale'], ca: ['ACS', 'AFCH', 'punt terminal', 'aerosolització', 'Legionella', 'proveïdor', 'inspecció', 'tancament documental'] },
        recommendedRoadmap: {
            en: [
                roadmapPhase('fac-1', 'Inventory of assets and points', 'Map buildings, assets and terminal points.', ['Inventory assets', 'Assign criticality', 'Define owners'], 'Asset control is visible.'),
                roadmapPhase('fac-2', 'Task and sampling plan', 'Connect maintenance and sampling tasks.', ['Define schedule', 'Assign supplier', 'Record evidence'], 'Tasks and samples share context.'),
                roadmapPhase('fac-3', 'Laboratory, result and action', 'Link laboratory result with follow-up action.', ['Record lab', 'Review result', 'Assign action'], 'Follow-up is traceable.'),
                roadmapPhase('fac-4', 'Inspection evidence', 'Prepare evidence pack for inspection.', ['Attach reports', 'Document closure', 'Track review'], 'Inspection can be answered from one history.'),
                roadmapPhase('fac-5', 'Multi-site and supplier follow-up', 'Use trends once asset records are complete.', ['Compare sites', 'Track suppliers', 'Prioritize risk'], 'Portfolio risk becomes easier to manage.')
            ],
            es: [
                roadmapPhase('fac-1', 'Inventario de activos y puntos', 'Mapear edificios, activos y puntos terminales.', ['Inventariar activos', 'Asignar criticidad', 'Definir responsables'], 'El control de activos queda visible.'),
                roadmapPhase('fac-2', 'Plan de tareas y muestreo', 'Conectar mantenimiento y tareas de muestreo.', ['Definir calendario', 'Asignar proveedor', 'Registrar evidencia'], 'Tareas y muestras comparten contexto.'),
                roadmapPhase('fac-3', 'Laboratorio, resultado y acción', 'Vincular resultado de laboratorio con acción de seguimiento.', ['Registrar laboratorio', 'Revisar resultado', 'Asignar acción'], 'El seguimiento es trazable.'),
                roadmapPhase('fac-4', 'Evidencia para inspección', 'Preparar paquete documental para inspección.', ['Adjuntar informes', 'Documentar cierre', 'Trazar revisión'], 'La inspección se responde desde un historial.'),
                roadmapPhase('fac-5', 'Seguimiento multi-sede y proveedores', 'Usar tendencias cuando el inventario esté completo.', ['Comparar sedes', 'Seguir proveedores', 'Priorizar riesgo'], 'El riesgo de cartera se gestiona mejor.')
            ],
            fr: [], it: [], ca: []
        },
        recommendedResourceIds: ['aquaverify_cloud', 'coa'],
        recommendedGlossaryTermIds: ['coa'],
        recommendedToolIds: [],
        forbiddenGenericPhrases: ['water programme']
    },
    'agriculture-water': {
        sectorId: 'agriculture-water',
        labels: localText('Agricultural water', 'Agua agrícola', 'Eau agricole', 'Acqua agricola', 'Aigua agrícola'),
        reportTitle: localText('Assessment report - Agricultural water', 'Informe de diagnóstico — Agua agrícola', 'Rapport de diagnostic - Eau agricole', 'Report diagnostico - Acqua agricola', 'Informe de diagnòstic - Aigua agrícola'),
        reportSubtitle: localText('Indicative assessment of the agricultural water control workflow: source, point, crop, season, sample, method, CoA and evidence for buyer or audit.', 'Evaluación orientativa del flujo de control de agua agrícola: fuente, punto, cultivo, campaña, muestra, método, CoA y evidencia para comprador o auditoría.', 'Évaluation indicative du flux de contrôle de l’eau agricole : source, point, culture, campagne, échantillon, méthode, CoA et preuve pour acheteur ou audit.', 'Valutazione orientativa del flusso di controllo acqua agricola: fonte, punto, coltura, campagna, campione, metodo, CoA ed evidenza per buyer o audit.', 'Avaluació orientativa del flux de control d’aigua agrícola: font, punt, cultiu, campanya, mostra, mètode, CoA i evidència per comprador o auditoria.'),
        buyerContext: localText('The assessment reads the flow as agricultural water evidence connected to source, plot, crop, season, sample, method and buyer or audit needs.', 'El diagnóstico interpreta el flujo como evidencia de agua agrícola conectada con fuente de agua, parcela, cultivo, campaña, muestra, método y necesidades de comprador o auditoría.', 'Le diagnostic lit le flux comme preuve d’eau agricole reliée à source, parcelle, culture, campagne, échantillon, méthode et besoins acheteur ou audit.', 'La valutazione legge il flusso come evidenza di acqua agricola collegata a fonte, parcella, coltura, campagna, campione, metodo e bisogni di buyer o audit.', 'El diagnòstic llegeix el flux com evidència d’aigua agrícola connectada amb font, parcel·la, cultiu, campanya, mostra, mètode i necessitats de comprador o auditoria.'),
        coreObjects: ['water source', 'well', 'pond', 'canal', 'surface water', 'reclaimed water', 'irrigation', 'hydroponics', 'fertigation', 'plot', 'crop', 'season', 'packhouse', 'buyer', 'export', 'audit'],
        commonRisks: { en: ['Fragmented traceability between source, plot, crop, sample, method and buyer evidence can weaken an audit response.'], es: ['La trazabilidad fragmentada entre fuente de agua, parcela, cultivo, campaña, muestra, método y evidencia para comprador puede debilitar una auditoría.'], fr: ['Une traçabilité fragmentée entre source, parcelle, culture, échantillon, méthode et preuve acheteur affaiblit la réponse audit.'], it: ['Una tracciabilità frammentata tra fonte, parcella, coltura, campione, metodo ed evidenza buyer indebolisce la risposta audit.'], ca: ['Una traçabilitat fragmentada entre font, parcel·la, cultiu, mostra, mètode i evidència per comprador debilita l’auditoria.'] },
        evidenceObjects: { en: ['water source', 'plot', 'crop', 'season', 'reclaimed water', 'irrigation', 'packhouse', 'buyer', 'audit', 'CoA'], es: ['fuente de agua', 'parcela', 'cultivo', 'campaña', 'agua regenerada', 'riego', 'packhouse', 'comprador', 'auditoría', 'CoA'], fr: ['source d’eau', 'parcelle', 'culture', 'campagne', 'eau réutilisée', 'irrigation', 'packhouse', 'acheteur', 'audit', 'CoA'], it: ['fonte d’acqua', 'parcella', 'coltura', 'campagna', 'acqua rigenerata', 'irrigazione', 'packhouse', 'buyer', 'audit', 'CoA'], ca: ['font d’aigua', 'parcel·la', 'cultiu', 'campanya', 'aigua regenerada', 'reg', 'packhouse', 'comprador', 'auditoria', 'CoA'] },
        recommendedRoadmap: {
            en: [
                roadmapPhase('ag-1', 'Water inventory and risk map', 'Connect sources, sampling points, plot, crop, season and water use.', ['Inventory sources', 'Define points', 'Link crop and season', 'Identify reclaimed water', 'Assign owner'], 'A point map that lets each sample be interpreted in its agricultural context.', ['field-sampling']),
                roadmapPhase('ag-2', 'Sample traceability and custody', 'Connect sampling, operator, date, matrix, custody and reception.', ['Create sample identifier', 'Record field context', 'Track custody'], 'Each result can be reconstructed from water source to report.', ['field-sampling', 'sample-management']),
                roadmapPhase('ag-3', 'Method, technical review and CoA', 'Link method, lot, reading, technical review and report.', ['Define method route', 'Record lot and reading', 'Review CoA'], 'More consistent evidence for technical owner, buyer or audit.', ['lims-review', 'coa-reporting']),
                roadmapPhase('ag-4', 'Evidence for reclaimed water, buyer or audit', 'Prepare evidence packs by source, crop, season or water lot.', ['Attach CoA', 'Record decisions', 'Document follow-up'], 'The team can justify decisions without rebuilding information from several systems.', ['coa-reporting', 'customer-portal']),
                roadmapPhase('ag-5', 'Trends and dashboards', 'Use dashboards only when the base data is consistent.', ['Compare sources', 'Review plot history', 'Track buyer evidence'], 'Reliable comparison by source, plot, season, crop or laboratory.', ['dashboards'])
            ],
            es: [
                roadmapPhase('ag-1', 'Inventario hídrico y mapa de riesgo', 'Relacionar fuentes, puntos, parcela/cultivo/campaña y uso del agua.', ['Inventariar fuentes', 'Definir puntos', 'Asociar cultivo/campaña', 'Identificar agua regenerada', 'Asignar responsable'], 'Un mapa de puntos que permita interpretar cada muestra en su contexto agrícola.', ['field-sampling']),
                roadmapPhase('ag-2', 'Trazabilidad de muestra y custodia', 'Conectar muestreo, operador, fecha, matriz, custodia y recepción.', ['Crear identificador único de muestra', 'Registrar contexto de campo', 'Trazar custodia'], 'Cada resultado puede reconstruirse desde la fuente de agua hasta el informe.', ['field-sampling', 'sample-management']),
                roadmapPhase('ag-3', 'Método, revisión técnica y CoA', 'Vincular método, lote, lectura, revisión técnica e informe.', ['Definir ruta de método', 'Registrar lote y lectura', 'Revisar CoA'], 'Evidencia más consistente para responsable técnico, comprador o auditoría.', ['lims-review', 'coa-reporting']),
                roadmapPhase('ag-4', 'Evidencia para agua regenerada, comprador o auditoría', 'Preparar un paquete documental por fuente, cultivo, campaña o lote de agua.', ['Adjuntar CoA', 'Registrar decisiones', 'Documentar seguimiento'], 'El equipo puede justificar decisiones y seguimiento sin reconstruir información desde varios sistemas.', ['coa-reporting', 'customer-portal']),
                roadmapPhase('ag-5', 'Tendencias y dashboards', 'Usar dashboards solo cuando el dato base sea consistente.', ['Comparar fuentes', 'Revisar histórico por parcela', 'Seguir evidencia para comprador'], 'Comparación fiable por fuente, parcela, campaña, cultivo o laboratorio.', ['dashboards'])
            ],
            fr: [], it: [], ca: []
        },
        recommendedResourceIds: ['agriculture-page', 'aquaverify_cloud', 'reclaimed_water', 'irrigation', 'e_coli', 'somatic_coliphages', 'f_specific_coliphages', 'coa', 'iso_19458'],
        recommendedGlossaryTermIds: ['reclaimed_water', 'irrigation', 'e_coli', 'somatic_coliphages', 'f_specific_coliphages', 'coa', 'iso_19458'],
        recommendedToolIds: ['aquatools_chemical_species', 'aquatools_hardness'],
        forbiddenGenericPhrases: ['programa de agua', 'muestra, ensayo, revisión e informe']
    },
    'pharma-cosmetics-water': {
        sectorId: 'pharma-cosmetics-water',
        labels: localText('Pharma and cosmetics water', 'Agua pharma y cosmética', 'Eau pharma et cosmétique', 'Acqua pharma e cosmetica', 'Aigua pharma i cosmètica'),
        reportTitle: localText('Assessment report - Pharma and cosmetics water', 'Informe de diagnóstico - Agua pharma y cosmética', 'Rapport de diagnostic - Eau pharma et cosmétique', 'Report diagnostico - Acqua pharma e cosmetica', 'Informe de diagnòstic - Aigua pharma i cosmètica'),
        reportSubtitle: localText('Pharma/cosmetics workflow assessment: incoming water, purified water, WFI when applicable, loop, point of use, equipment, batch, CIP/SIP, final rinse, OOS, CAPA and data integrity.', 'Evaluación del flujo pharma/cosmética: agua de entrada, agua purificada, WFI si aplica, loop, punto de uso, equipo, lote, CIP/SIP, último enjuague, OOS, CAPA e integridad de datos.', 'Évaluation pharma/cosmétique : eau d’entrée, eau purifiée, WFI si applicable, boucle, point d’usage, équipement, lot, CIP/SIP, rinçage final, OOS, CAPA et intégrité des données.', 'Valutazione pharma/cosmetica: acqua in ingresso, acqua purificata, WFI se applicabile, loop, punto d’uso, attrezzatura, lotto, CIP/SIP, ultimo risciacquo, OOS, CAPA e integrità dati.', 'Avaluació pharma/cosmètica: aigua d’entrada, aigua purificada, WFI si aplica, loop, punt d’ús, equip, lot, CIP/SIP, últim esbandit, OOS, CAPA i integritat de dades.'),
        buyerContext: localText('The assessment is consultative and does not imply GMP compliance, WFI suitability or regulatory acceptance.', 'El diagnóstico es consultivo y no implica cumplimiento GMP, idoneidad WFI ni aceptación regulatoria.', 'Le diagnostic est consultatif et n’implique pas conformité GMP, aptitude WFI ni acceptation réglementaire.', 'La valutazione è consultiva e non implica conformità GMP, idoneità WFI o accettazione regolatoria.', 'El diagnòstic és consultiu i no implica compliment GMP, idoneïtat WFI ni acceptació reguladora.'),
        coreObjects: ['incoming water', 'purified water', 'WFI', 'loop', 'point of use', 'equipment', 'batch', 'formulation', 'CIP/SIP', 'final rinse', 'OOS', 'deviation', 'CAPA', 'QA/QC', 'engineering', 'CDMO/CMO', 'data integrity'],
        commonRisks: { en: ['Quality review weakens if water point, equipment, batch, method, OOS and CAPA are disconnected.'], es: ['La revisión de calidad se debilita si punto de agua, equipo, lote, método, OOS y CAPA están desconectados.'], fr: ['La revue qualité est fragile si point d’eau, équipement, lot, méthode, OOS et CAPA sont séparés.'], it: ['La revisione qualità è fragile se punto acqua, attrezzatura, lotto, metodo, OOS e CAPA sono separati.'], ca: ['La revisió de qualitat és feble si punt d’aigua, equip, lot, mètode, OOS i CAPA estan separats.'] },
        evidenceObjects: { en: ['purified water', 'WFI', 'loop', 'point of use', 'batch', 'OOS', 'CAPA', 'QA/QC', 'technical review'], es: ['agua purificada', 'WFI', 'loop', 'punto de uso', 'lote', 'OOS', 'CAPA', 'QA/QC', 'revisión técnica'], fr: ['eau purifiée', 'WFI', 'boucle', 'point d’usage', 'lot', 'OOS', 'CAPA', 'QA/QC', 'revue technique'], it: ['acqua purificata', 'WFI', 'loop', 'punto d’uso', 'lotto', 'OOS', 'CAPA', 'QA/QC', 'revisione tecnica'], ca: ['aigua purificada', 'WFI', 'loop', 'punt d’ús', 'lot', 'OOS', 'CAPA', 'QA/QC', 'revisió tècnica'] },
        recommendedRoadmap: {
            en: [
                roadmapPhase('ph-1', 'Classify water type and point of use', 'Separate incoming, purified and WFI-applicable contexts.', ['Classify water', 'Map points', 'Record owner'], 'Water context is explicit.'),
                roadmapPhase('ph-2', 'Connect sample, equipment, batch and method', 'Trace sample to equipment, batch and method.', ['Create sample ID', 'Link equipment', 'Record method'], 'Data supports QA/QC review.'),
                roadmapPhase('ph-3', 'QA/QC review, CoA and deviations', 'Connect result review with CoA, OOS and deviation route.', ['Define review', 'Track OOS', 'Attach CoA'], 'Quality evidence is easier to defend.'),
                roadmapPhase('ph-4', 'Data integrity and CAPA', 'Document review, signatures and CAPA closure.', ['Record approval', 'Trace CAPA', 'Review integrity'], 'ALCOA-style evidence becomes stronger.'),
                roadmapPhase('ph-5', 'Trends by loop, point, product or plant', 'Use trends after quality records are consistent.', ['Compare loops', 'Review recurrence', 'Prioritize actions'], 'Trends support preventive quality review.')
            ],
            es: [
                roadmapPhase('ph-1', 'Clasificar tipo de agua y punto de uso', 'Separar agua de entrada, agua purificada y contexto WFI cuando aplique.', ['Clasificar agua', 'Mapear puntos', 'Asignar responsable'], 'El contexto de agua queda explícito.'),
                roadmapPhase('ph-2', 'Conectar muestra, equipo, lote y método', 'Trazar muestra con equipo, lote y método.', ['Crear ID de muestra', 'Vincular equipo', 'Registrar método'], 'El dato soporta revisión QA/QC.'),
                roadmapPhase('ph-3', 'Revisión QA/QC, CoA y desviaciones', 'Conectar revisión de resultado con CoA, OOS y desviación.', ['Definir revisión', 'Trazar OOS', 'Adjuntar CoA'], 'La evidencia de calidad es más defendible.'),
                roadmapPhase('ph-4', 'Integridad de datos y CAPA', 'Documentar revisión, firmas y cierre CAPA.', ['Registrar aprobación', 'Trazar CAPA', 'Revisar integridad'], 'La evidencia tipo ALCOA se fortalece.'),
                roadmapPhase('ph-5', 'Tendencias por loop, punto, producto o planta', 'Usar tendencias cuando los registros de calidad sean consistentes.', ['Comparar loops', 'Revisar recurrencia', 'Priorizar acciones'], 'Las tendencias apoyan revisión preventiva.')
            ],
            fr: [], it: [], ca: []
        },
        recommendedResourceIds: ['aquaverify_cloud', 'coa'],
        recommendedGlossaryTermIds: ['coa'],
        recommendedToolIds: [],
        forbiddenGenericPhrases: ['water programme']
    },
    'hospitality-tourism-water': {
        sectorId: 'hospitality-tourism-water',
        labels: localText('Hospitality and tourism water', 'Agua en hostelería y turismo', 'Eau hôtellerie et tourisme', 'Acqua hospitality e turismo', 'Aigua en hostaleria i turisme'),
        reportTitle: localText('Assessment report - Hospitality and tourism water', 'Informe de diagnóstico - Agua en hostelería y turismo', 'Rapport de diagnostic - Eau hôtellerie et tourisme', 'Report diagnostico - Acqua hospitality e turismo', 'Informe de diagnòstic - Aigua en hostaleria i turisme'),
        reportSubtitle: localText('Hospitality workflow assessment: guest, site, asset, room, shower, DHW, DCW, pool, spa, kitchen, ice, season, closure, reopening, supplier, laboratory, inspection and reputation.', 'Evaluación del flujo hotelero/turístico: huésped, sede, activo, habitación, ducha, ACS, AFCH, piscina, spa, cocina, hielo, temporada, cierre, reapertura, proveedor, laboratorio, inspección y reputación.', 'Évaluation hôtellerie/tourisme : client, site, actif, chambre, douche, ECS, EFS, piscine, spa, cuisine, glace, saison, fermeture, réouverture, prestataire, laboratoire, inspection et réputation.', 'Valutazione hospitality/turismo: ospite, sede, asset, camera, doccia, ACS, AFCH, piscina, spa, cucina, ghiaccio, stagione, chiusura, riapertura, fornitore, laboratorio, ispezione e reputazione.', 'Avaluació hostaleria/turisme: hoste, seu, actiu, habitació, dutxa, ACS, AFCH, piscina, spa, cuina, gel, temporada, tancament, reobertura, proveïdor, laboratori, inspecció i reputació.'),
        buyerContext: localText('The assessment treats water evidence as part of guest experience, operational continuity, seasonal reopening and brand reputation.', 'El diagnóstico trata el agua como parte de experiencia del huésped, continuidad operativa, temporada y reputación.', 'Le diagnostic traite l’eau comme partie de l’expérience client, continuité opérationnelle, saison et réputation.', 'La valutazione tratta l’acqua come parte di esperienza ospite, continuità operativa, stagione e reputazione.', 'El diagnòstic tracta l’aigua com a part de l’experiència de l’hoste, continuïtat operativa, temporada i reputació.'),
        coreObjects: ['guest', 'site', 'asset', 'room', 'shower', 'DHW', 'DCW', 'pool', 'spa', 'jacuzzi', 'kitchen', 'ice', 'season', 'closure', 'reopening', 'supplier', 'laboratory', 'inspection', 'reputation'],
        commonRisks: { en: ['Guest-facing water risk grows when asset, sampling, supplier, result and reopening evidence are separated.'], es: ['El riesgo ante el huésped crece cuando activo, muestreo, proveedor, resultado y reapertura quedan separados.'], fr: ['Le risque client augmente si actif, prélèvement, prestataire, résultat et réouverture sont séparés.'], it: ['Il rischio per l’ospite cresce se asset, campionamento, fornitore, risultato e riapertura sono separati.'], ca: ['El risc per a l’hoste creix si actiu, mostreig, proveïdor, resultat i reobertura queden separats.'] },
        evidenceObjects: { en: ['guest', 'site', 'asset', 'room', 'shower', 'pool', 'spa', 'ice', 'season', 'reopening', 'supplier', 'laboratory', 'inspection'], es: ['huésped', 'sede', 'activo', 'habitación', 'ducha', 'piscina', 'spa', 'hielo', 'temporada', 'reapertura', 'proveedor', 'laboratorio', 'inspección'], fr: ['client', 'site', 'actif', 'chambre', 'douche', 'piscine', 'spa', 'glace', 'saison', 'réouverture', 'prestataire', 'laboratoire', 'inspection'], it: ['ospite', 'sede', 'asset', 'camera', 'doccia', 'piscina', 'spa', 'ghiaccio', 'stagione', 'riapertura', 'fornitore', 'laboratorio', 'ispezione'], ca: ['hoste', 'seu', 'actiu', 'habitació', 'dutxa', 'piscina', 'spa', 'gel', 'temporada', 'reobertura', 'proveïdor', 'laboratori', 'inspecció'] },
        recommendedRoadmap: {
            en: [
                roadmapPhase('hos-1', 'Inventory guest-impacting assets', 'Map rooms, showers, pools, spas, kitchens and ice points.', ['Inventory assets', 'Classify guest impact', 'Assign owners'], 'Guest-impacting assets are visible.'),
                roadmapPhase('hos-2', 'Season and reopening control', 'Connect sampling with closure and reopening decisions.', ['Define season plan', 'Record reopening tasks', 'Track evidence'], 'Reopening evidence is easier to defend.'),
                roadmapPhase('hos-3', 'Sampling, supplier and result', 'Connect supplier, laboratory and result review.', ['Assign supplier', 'Record sample', 'Review result'], 'Follow-up is faster.'),
                roadmapPhase('hos-4', 'Action, communication and reopening', 'Document action and reopening decision.', ['Assign action', 'Record closure', 'Prepare communication'], 'Operational continuity is better protected.'),
                roadmapPhase('hos-5', 'Corporate view by site', 'Use dashboards once site data is consistent.', ['Compare sites', 'Track recurrence', 'Prioritize investment'], 'Portfolio risk and reputation are clearer.')
            ],
            es: [
                roadmapPhase('hos-1', 'Inventario de activos que afectan al huésped', 'Mapear habitaciones, duchas, piscinas, spas, cocina e hielo.', ['Inventariar activos', 'Clasificar impacto en huésped', 'Asignar responsables'], 'Los activos sensibles para el huésped quedan visibles.'),
                roadmapPhase('hos-2', 'Control por temporada y reapertura', 'Conectar muestreo con cierre y reapertura.', ['Definir plan de temporada', 'Registrar tareas de reapertura', 'Trazar evidencia'], 'La reapertura tiene evidencia defendible.'),
                roadmapPhase('hos-3', 'Muestreo, proveedor y resultado', 'Conectar proveedor, laboratorio y revisión de resultado.', ['Asignar proveedor', 'Registrar muestra', 'Revisar resultado'], 'El seguimiento es más rápido.'),
                roadmapPhase('hos-4', 'Acción, comunicación y reapertura', 'Documentar acción y decisión de reapertura.', ['Asignar acción', 'Registrar cierre', 'Preparar comunicación'], 'La continuidad operativa queda mejor protegida.'),
                roadmapPhase('hos-5', 'Visión corporativa por sede', 'Usar dashboards cuando el dato por sede sea consistente.', ['Comparar sedes', 'Trazar recurrencia', 'Priorizar inversión'], 'El riesgo de cartera y reputación es más claro.')
            ],
            fr: [], it: [], ca: []
        },
        recommendedResourceIds: ['aquaverify_cloud', 'coa'],
        recommendedGlossaryTermIds: ['coa'],
        recommendedToolIds: [],
        forbiddenGenericPhrases: ['water programme']
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

function recommendationAudience(type, targetId) {
    if (['crm', 'gis'].includes(targetId)) return 'internal';
    if (type === 'tool') return 'resource';
    return 'client';
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
        evidenceQuestionIds: unique(evidenceQuestionIds),
        audience: recommendationAudience(outcome.type, outcome.targetId)
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
            evidenceQuestionIds: unique([...existing.evidenceQuestionIds, ...item.evidenceQuestionIds]),
            audience: existing.audience === 'client' || item.audience === 'client'
                ? 'client'
                : existing.audience || item.audience
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

const V2_NARRATIVE = Object.freeze({
    en: {
        contextTitle: 'What the answers indicate',
        summaryLead: (sector, context, complexity) => `This report reads the answers as a ${sector} workflow with ${context} and ${complexity}.`,
        summarySecond: 'The useful improvement path is to make evidence reconstructable before closing product choices or dashboard views.',
        contextFragmentStrong: 'enough analytical context to orient a technical discussion',
        contextFragmentWeak: 'analytical context that still needs review',
        complexityHigh: 'high coordination pressure',
        complexityLow: 'moderate coordination pressure',
        flowParagraph: (systems, stages, evidence) => `The current flow combines ${systems}. Digitised stages include ${stages}. The evidence need is centred on ${evidence}.`,
        noValue: 'not indicated',
        selectedPriority: 'Priority selected by the user',
        findingPriority: 'Detected workflow signal',
        dashboardLater: 'Dashboards are useful after the base sample, custody, method and evidence data are consistent.',
        moduleWhyNow: (title, reason) => `${title} helps keep the workflow reconstructable. ${reason}`,
        moduleDefinition: 'Define owners, fields, permissions and acceptance criteria before treating this capability as operational evidence.',
        moduleNext: 'Use this as part of the phased plan rather than as a standalone capability area.',
        analyticalPending: (resultType, volume, targets) => `The analytical route remains open. The answers mention ${resultType}, ${volume} and ${targets}, but matrix, method, country, intended use and laboratory scope must be confirmed before evaluating INDICA, ENUMERA, PLAQUE or ISO/EPA kits.`,
        analyticalClear: 'The answers provide enough context to prepare a technical review, but the final product route must still be confirmed by matrix, method, country, volume, intended use and laboratory.',
        technicalReviewNext: 'Prepare a non-sensitive technical review with matrix, volume, method, country, intended use and laboratory role.',
        noClosedRecommendation: 'No closed recommendation',
        familiesToReview: {
            indica: 'Presence/absence or screening, subject to review.',
            enumera: 'Quantification, subject to review.',
            plaque: 'Reference or plate workflow, subject to review.'
        },
        noMissing: 'No major missing item was detected for this consultative report.',
        resourceTypes: { industry: 'Industry page', glossary: 'Glossary', platform: 'Platform', tool: 'Tool', resource: 'Resource' },
        roadmap: [
            ['Point map and context', 'Connect the main water points, uses and responsible owners.', ['Inventory points', 'Classify uses', 'Assign owners'], 'Each sample can be interpreted in context.'],
            ['Sample and custody history', 'Connect sampling, operator, date, custody and reception.', ['Create sample identifier', 'Record field context', 'Track custody'], 'The sample history becomes reconstructable.'],
            ['Method, reading and technical review', 'Link method, batch, reading, technical review and report evidence.', ['Define method route', 'Record lot and reading', 'Review result'], 'The result has defensible technical context.'],
            ['CoA, decision and audit evidence', 'Prepare reviewed evidence for customer, internal or audit use.', ['Define report template', 'Attach evidence', 'Record decision'], 'The team can answer without rebuilding data from several systems.'],
            ['Trends and dashboards', 'Use dashboards only after base records are consistent.', ['Compare points', 'Review recurrence', 'Prioritize actions'], 'Trend views become reliable for management.']
        ]
    },
    es: {
        contextTitle: 'Qué indican las respuestas',
        summaryLead: (sector, context, complexity) => `Este informe interpreta las respuestas como un flujo de ${sector} con ${context} y ${complexity}.`,
        summarySecond: 'La mejora útil es hacer que la evidencia sea reconstruible antes de cerrar decisiones de producto o vistas de dashboard.',
        contextFragmentStrong: 'contexto analítico suficiente para orientar una conversación técnica',
        contextFragmentWeak: 'contexto analítico que todavía necesita revisión',
        complexityHigh: 'alta presión de coordinación',
        complexityLow: 'presión de coordinación moderada',
        flowParagraph: (systems, stages, evidence) => `El flujo actual combina ${systems}. Las etapas digitalizadas incluyen ${stages}. La necesidad de evidencia se centra en ${evidence}.`,
        noValue: 'no indicado',
        selectedPriority: 'Prioridad seleccionada por el usuario',
        findingPriority: 'Señal de flujo detectada',
        dashboardLater: 'Los dashboards son útiles después de que el dato base de muestra, custodia, método y evidencia sea consistente.',
        moduleWhyNow: (title, reason) => `${title} ayuda a mantener el flujo reconstruible. ${reason}`,
        moduleDefinition: 'Definir responsables, campos, permisos y criterios de aceptación antes de tratar esta capacidad como evidencia operativa.',
        moduleNext: 'Usarlo como parte del plan por fases, no como un módulo aislado.',
        analyticalPending: (resultType, volume, targets) => `La ruta analítica sigue abierta. Las respuestas mencionan ${resultType}, ${volume} y ${targets}, pero deben confirmarse matriz, método, país, uso previsto y laboratorio antes de evaluar INDICA, ENUMERA, PLAQUE o kits ISO/EPA.`,
        analyticalClear: 'Las respuestas permiten preparar una revisión técnica, pero la ruta final de producto debe confirmarse por matriz, método, país, volumen, uso previsto y laboratorio.',
        technicalReviewNext: 'Preparar una revisión técnica no sensible con matriz, volumen, método, país, uso previsto y rol del laboratorio.',
        noClosedRecommendation: 'No recomendación cerrada',
        familiesToReview: {
            indica: 'Presencia/ausencia o cribado, sujeto a revisión.',
            enumera: 'Cuantificación, sujeto a revisión.',
            plaque: 'Referencia o placa, sujeto a revisión.'
        },
        noMissing: 'No se detectó ningún faltante principal para este informe consultivo.',
        resourceTypes: { industry: 'Página sectorial', glossary: 'Glosario', platform: 'Plataforma', tool: 'Herramienta', resource: 'Recurso' },
        roadmap: [
            ['Mapa de puntos y contexto', 'Conectar puntos de agua, usos y responsables principales.', ['Inventariar puntos', 'Clasificar usos', 'Asignar responsables'], 'Cada muestra puede interpretarse en contexto.'],
            ['Historial de muestra y custodia', 'Conectar muestreo, operador, fecha, custodia y recepción.', ['Crear identificador de muestra', 'Registrar contexto de campo', 'Trazar custodia'], 'El historial de muestra se vuelve reconstruible.'],
            ['Método, lectura y revisión técnica', 'Vincular método, lote, lectura, revisión técnica y evidencia de informe.', ['Definir ruta de método', 'Registrar lote y lectura', 'Revisar resultado'], 'El resultado tiene contexto técnico defendible.'],
            ['CoA, decisión y evidencia de auditoría', 'Preparar evidencia revisada para cliente, uso interno o auditoría.', ['Definir plantilla de informe', 'Adjuntar evidencia', 'Registrar decisión'], 'El equipo puede responder sin reconstruir datos desde varios sistemas.'],
            ['Tendencias y dashboards', 'Usar dashboards solo cuando los registros base sean consistentes.', ['Comparar puntos', 'Revisar recurrencia', 'Priorizar acciones'], 'Las tendencias se vuelven fiables para gestión.']
        ]
    },
    fr: {
        contextTitle: 'Ce que les réponses indiquent',
        summaryLead: (sector, context, complexity) => `Ce rapport lit les réponses comme un flux ${sector} avec ${context} et ${complexity}.`,
        summarySecond: 'La trajectoire utile consiste à rendre la preuve reconstructible avant de clore les choix produits ou les vues dashboard.',
        contextFragmentStrong: 'un contexte analytique suffisant pour orienter une discussion technique',
        contextFragmentWeak: 'un contexte analytique qui nécessite encore une revue',
        complexityHigh: 'une forte pression de coordination',
        complexityLow: 'une pression de coordination modérée',
        flowParagraph: (systems, stages, evidence) => `Le flux actuel combine ${systems}. Les étapes numérisées incluent ${stages}. Le besoin de preuve porte surtout sur ${evidence}.`,
        noValue: 'non indiqué',
        selectedPriority: 'Priorité sélectionnée par l’utilisateur',
        findingPriority: 'Signal de flux détecté',
        dashboardLater: 'Les dashboards sont utiles après cohérence des données de base sur échantillon, garde, méthode et preuve.',
        moduleWhyNow: (title, reason) => `${title} aide à rendre le flux reconstructible. ${reason}`,
        moduleDefinition: 'Définir responsables, champs, permissions et critères d’acceptation avant de traiter cette capacité comme preuve opérationnelle.',
        moduleNext: 'L’utiliser dans le plan par phases plutôt que comme module isolé.',
        analyticalPending: (resultType, volume, targets) => `La route analytique reste ouverte. Les réponses mentionnent ${resultType}, ${volume} et ${targets}, mais matrice, méthode, pays, usage prévu et portée laboratoire doivent être confirmés avant d’évaluer INDICA, ENUMERA, PLAQUE ou des kits ISO/EPA.`,
        analyticalClear: 'Les réponses permettent de préparer une revue technique, mais la route produit finale doit être confirmée par matrice, méthode, pays, volume, usage prévu et laboratoire.',
        technicalReviewNext: 'Préparer une revue technique non sensible avec matrice, volume, méthode, pays, usage prévu et rôle laboratoire.',
        noClosedRecommendation: 'Aucune recommandation fermée',
        familiesToReview: {
            indica: 'Présence/absence ou dépistage, sous réserve de revue.',
            enumera: 'Quantification, sous réserve de revue.',
            plaque: 'Référence ou plaque, sous réserve de revue.'
        },
        noMissing: 'Aucun manque principal n’a été détecté pour ce rapport consultatif.',
        resourceTypes: { industry: 'Page sectorielle', glossary: 'Glossaire', platform: 'Plateforme', tool: 'Outil', resource: 'Ressource' },
        roadmap: [
            ['Carte des points et du contexte', 'Relier les points d’eau, usages et responsables principaux.', ['Inventorier les points', 'Classer les usages', 'Attribuer les responsables'], 'Chaque échantillon peut être interprété dans son contexte.'],
            ['Historique échantillon et garde', 'Relier prélèvement, opérateur, date, garde et réception.', ['Créer l’identifiant échantillon', 'Documenter le contexte terrain', 'Tracer la garde'], 'L’historique échantillon devient reconstructible.'],
            ['Méthode, lecture et revue technique', 'Relier méthode, lot, lecture, revue technique et preuve de rapport.', ['Définir la route méthode', 'Documenter lot et lecture', 'Revoir le résultat'], 'Le résultat dispose d’un contexte technique défendable.'],
            ['CoA, décision et preuve audit', 'Préparer une preuve revue pour client, usage interne ou audit.', ['Définir le modèle de rapport', 'Joindre la preuve', 'Documenter la décision'], 'L’équipe peut répondre sans reconstruire depuis plusieurs systèmes.'],
            ['Tendances et dashboards', 'Utiliser les dashboards seulement après cohérence des enregistrements de base.', ['Comparer les points', 'Revoir les récurrences', 'Prioriser les actions'], 'Les tendances deviennent fiables pour le pilotage.']
        ]
    },
    it: {
        contextTitle: 'Cosa indicano le risposte',
        summaryLead: (sector, context, complexity) => `Questo report legge le risposte come un flusso ${sector} con ${context} e ${complexity}.`,
        summarySecond: 'Il percorso utile è rendere l’evidenza ricostruibile prima di chiudere scelte prodotto o viste dashboard.',
        contextFragmentStrong: 'contesto analitico sufficiente per orientare una discussione tecnica',
        contextFragmentWeak: 'contesto analitico che richiede ancora revisione',
        complexityHigh: 'alta pressione di coordinamento',
        complexityLow: 'pressione di coordinamento moderata',
        flowParagraph: (systems, stages, evidence) => `Il flusso attuale combina ${systems}. Le fasi digitalizzate includono ${stages}. Il bisogno di evidenza è centrato su ${evidence}.`,
        noValue: 'non indicato',
        selectedPriority: 'Priorità selezionata dall’utente',
        findingPriority: 'Segnale di flusso rilevato',
        dashboardLater: 'Le dashboard sono utili dopo dati base coerenti su campione, custodia, metodo ed evidenza.',
        moduleWhyNow: (title, reason) => `${title} aiuta a rendere il flusso ricostruibile. ${reason}`,
        moduleDefinition: 'Definire responsabili, campi, permessi e criteri di accettazione prima di trattare questa capacità come evidenza operativa.',
        moduleNext: 'Usarlo nel piano per fasi, non come modulo isolato.',
        analyticalPending: (resultType, volume, targets) => `Il percorso analitico resta aperto. Le risposte menzionano ${resultType}, ${volume} e ${targets}, ma matrice, metodo, paese, uso previsto e laboratorio devono essere confermati prima di valutare INDICA, ENUMERA, PLAQUE o kit ISO/EPA.`,
        analyticalClear: 'Le risposte permettono di preparare una revisione tecnica, ma il percorso prodotto finale deve essere confermato per matrice, metodo, paese, volume, uso previsto e laboratorio.',
        technicalReviewNext: 'Preparare una revisione tecnica non sensibile con matrice, volume, metodo, paese, uso previsto e ruolo laboratorio.',
        noClosedRecommendation: 'Nessuna raccomandazione chiusa',
        familiesToReview: {
            indica: 'Presenza/assenza o screening, soggetto a revisione.',
            enumera: 'Quantificazione, soggetta a revisione.',
            plaque: 'Riferimento o piastra, soggetto a revisione.'
        },
        noMissing: 'Nessun elemento mancante principale rilevato per questo report consultivo.',
        resourceTypes: { industry: 'Pagina settore', glossary: 'Glossario', platform: 'Piattaforma', tool: 'Strumento', resource: 'Risorsa' },
        roadmap: [
            ['Mappa dei punti e contesto', 'Collegare punti d’acqua, usi e responsabili principali.', ['Inventariare punti', 'Classificare usi', 'Assegnare responsabili'], 'Ogni campione può essere interpretato nel suo contesto.'],
            ['Storico campione e custodia', 'Collegare campionamento, operatore, data, custodia e ricezione.', ['Creare ID campione', 'Registrare contesto campo', 'Tracciare custodia'], 'Lo storico del campione diventa ricostruibile.'],
            ['Metodo, lettura e revisione tecnica', 'Collegare metodo, lotto, lettura, revisione tecnica ed evidenza report.', ['Definire percorso metodo', 'Registrare lotto e lettura', 'Rivedere risultato'], 'Il risultato ha contesto tecnico difendibile.'],
            ['CoA, decisione ed evidenza audit', 'Preparare evidenza rivista per cliente, uso interno o audit.', ['Definire template report', 'Allegare evidenza', 'Registrare decisione'], 'Il team può rispondere senza ricostruire dati da più sistemi.'],
            ['Trend e dashboard', 'Usare dashboard solo quando i record base sono coerenti.', ['Confrontare punti', 'Rivedere ricorrenze', 'Prioritizzare azioni'], 'I trend diventano affidabili per la gestione.']
        ]
    },
    ca: {
        contextTitle: 'Què indiquen les respostes',
        summaryLead: (sector, context, complexity) => `Aquest informe llegeix les respostes com un flux de ${sector} amb ${context} i ${complexity}.`,
        summarySecond: 'La millora útil és fer que l’evidència sigui reconstruïble abans de tancar decisions de producte o vistes de dashboard.',
        contextFragmentStrong: 'context analític suficient per orientar una conversa tècnica',
        contextFragmentWeak: 'context analític que encara necessita revisió',
        complexityHigh: 'alta pressió de coordinació',
        complexityLow: 'pressió de coordinació moderada',
        flowParagraph: (systems, stages, evidence) => `El flux actual combina ${systems}. Les etapes digitalitzades inclouen ${stages}. La necessitat d’evidència se centra en ${evidence}.`,
        noValue: 'no indicat',
        selectedPriority: 'Prioritat seleccionada per l’usuari',
        findingPriority: 'Senyal de flux detectat',
        dashboardLater: 'Els dashboards són útils després que la dada base de mostra, custòdia, mètode i evidència sigui consistent.',
        moduleWhyNow: (title, reason) => `${title} ajuda a fer que el flux sigui reconstruïble. ${reason}`,
        moduleDefinition: 'Definir responsables, camps, permisos i criteris d’acceptació abans de tractar aquesta capacitat com evidència operativa.',
        moduleNext: 'Usar-ho dins del pla per fases, no com un mòdul aïllat.',
        analyticalPending: (resultType, volume, targets) => `La ruta analítica continua oberta. Les respostes mencionen ${resultType}, ${volume} i ${targets}, però cal confirmar matriu, mètode, país, ús previst i laboratori abans d’avaluar INDICA, ENUMERA, PLAQUE o kits ISO/EPA.`,
        analyticalClear: 'Les respostes permeten preparar una revisió tècnica, però la ruta final de producte s’ha de confirmar per matriu, mètode, país, volum, ús previst i laboratori.',
        technicalReviewNext: 'Preparar una revisió tècnica no sensible amb matriu, volum, mètode, país, ús previst i rol del laboratori.',
        noClosedRecommendation: 'Cap recomanació tancada',
        familiesToReview: {
            indica: 'Presència/absència o cribratge, subjecte a revisió.',
            enumera: 'Quantificació, subjecta a revisió.',
            plaque: 'Referència o placa, subjecte a revisió.'
        },
        noMissing: 'No s’ha detectat cap mancança principal per a aquest informe consultiu.',
        resourceTypes: { industry: 'Pàgina sectorial', glossary: 'Glossari', platform: 'Plataforma', tool: 'Eina', resource: 'Recurs' },
        roadmap: [
            ['Mapa de punts i context', 'Connectar punts d’aigua, usos i responsables principals.', ['Inventariar punts', 'Classificar usos', 'Assignar responsables'], 'Cada mostra es pot interpretar en context.'],
            ['Historial de mostra i custòdia', 'Connectar mostreig, operador, data, custòdia i recepció.', ['Crear identificador de mostra', 'Registrar context de camp', 'Traçar custòdia'], 'L’historial de mostra esdevé reconstruïble.'],
            ['Mètode, lectura i revisió tècnica', 'Vincular mètode, lot, lectura, revisió tècnica i evidència d’informe.', ['Definir ruta de mètode', 'Registrar lot i lectura', 'Revisar resultat'], 'El resultat té context tècnic defensable.'],
            ['CoA, decisió i evidència d’auditoria', 'Preparar evidència revisada per client, ús intern o auditoria.', ['Definir plantilla d’informe', 'Adjuntar evidència', 'Registrar decisió'], 'L’equip pot respondre sense reconstruir dades des de diversos sistemes.'],
            ['Tendències i dashboards', 'Usar dashboards només quan els registres base siguin consistents.', ['Comparar punts', 'Revisar recurrència', 'Prioritzar accions'], 'Les tendències esdevenen fiables per a gestió.']
        ]
    }
});

const V2_RESOURCE_TITLES = Object.freeze({
    aquaverify_cloud: localText('AquaVerify Cloud', 'AquaVerify Cloud', 'AquaVerify Cloud', 'AquaVerify Cloud', 'AquaVerify Cloud'),
    'industrial-process-water-page': localText('Industrial process water', 'Agua de proceso industrial', 'Eau de process industriel', 'Acqua di processo industriale', 'Aigua de procés industrial'),
    'agriculture-page': localText('Agriculture water management', 'Gestión de agua agrícola', 'Gestion de l’eau agricole', 'Gestione acqua agricola', 'Gestió d’aigua agrícola'),
    reclaimed_water: localText('Reclaimed water', 'Agua regenerada', 'Eau réutilisée', 'Acqua rigenerata', 'Aigua regenerada'),
    process_water: localText('Process water', 'Agua de proceso', 'Eau de process', 'Acqua di processo', 'Aigua de procés'),
    biofilm: localText('Biofilm', 'Biofilm', 'Biofilm', 'Biofilm', 'Biofilm'),
    digital_chain_custody: localText('Digital chain of custody', 'Cadena de custodia digital', 'Chaîne de traçabilité numérique', 'Catena di custodia digitale', 'Cadena de custòdia digital'),
    irrigation: localText('Agricultural irrigation', 'Riego agrícola', 'Irrigation agricole', 'Irrigazione agricola', 'Reg agrícola'),
    e_coli: localText('E. coli', 'E. coli', 'E. coli', 'E. coli', 'E. coli'),
    somatic_coliphages: localText('Somatic coliphages', 'Colífagos somáticos', 'Coliphages somatiques', 'Colifagi somatici', 'Colífags somàtics'),
    f_specific_coliphages: localText('F-specific coliphages', 'Colífagos F-específicos', 'Coliphages F-spécifiques', 'Colifagi F-specifici', 'Colífags F-específics'),
    coa: localText('Certificate of analysis', 'Certificado de análisis', 'Certificat d’analyse', 'Certificato di analisi', 'Certificat d’anàlisi'),
    iso_19458: localText('ISO 19458', 'ISO 19458', 'ISO 19458', 'ISO 19458', 'ISO 19458'),
    excel_to_lims: localText('Excel to LIMS migration', 'Migración de Excel a LIMS', 'Migration Excel vers LIMS', 'Migrazione da Excel a LIMS', 'Migració d’Excel a LIMS'),
    aquatools_chemical_species: localText('Chemical species converter', 'Conversor de especies químicas', 'Convertisseur d’espèces chimiques', 'Convertitore specie chimiche', 'Conversor d’espècies químiques'),
    aquatools_hardness: localText('Hardness and alkalinity calculator', 'Calculadora de dureza y alcalinidad', 'Calculateur dureté et alcalinité', 'Calcolatore durezza e alcalinità', 'Calculadora de duresa i alcalinitat')
});

const V2_RESOURCE_DESCRIPTIONS = Object.freeze({
    aquaverify_cloud: localText('Operational layer for samples, custody, review, CoA, actions and evidence history.', 'Capa operativa para muestras, custodia, revisión, CoA, acciones e histórico de evidencia.', 'Couche opérationnelle pour échantillons, garde, revue, CoA, actions et historique de preuve.', 'Layer operativo per campioni, custodia, revisione, CoA, azioni e storico evidenze.', 'Capa operativa per a mostres, custòdia, revisió, CoA, accions i històric d’evidència.'),
    'industrial-process-water-page': localText('Sector page for connecting plant, laboratory, process assets and corrective actions.', 'Página sectorial para conectar planta, laboratorio, activos de proceso y acciones correctivas.', 'Page sectorielle pour relier usine, laboratoire, actifs process et actions correctives.', 'Pagina di settore per collegare impianto, laboratorio, asset di processo e azioni correttive.', 'Pàgina sectorial per connectar planta, laboratori, actius de procés i accions correctives.'),
    'agriculture-page': localText('Sector page for agricultural water evidence and audit workflows.', 'Página sectorial para evidencia de agua agrícola y flujos de auditoría.', 'Page sectorielle pour preuve d’eau agricole et flux d’audit.', 'Pagina di settore per evidenza acqua agricola e flussi audit.', 'Pàgina sectorial per evidència d’aigua agrícola i fluxos d’auditoria.'),
    reclaimed_water: localText('Glossary entry for reuse contexts that require explicit matrix and evidence review.', 'Glosario para contextos de reutilización que requieren matriz y revisión de evidencia explícitas.', 'Glossaire des contextes de réutilisation qui exigent matrice et preuve explicites.', 'Glossario per contesti di riuso che richiedono matrice e revisione evidenza esplicite.', 'Glossari per a contextos de reutilització que requereixen matriu i revisió d’evidència explícites.'),
    process_water: localText('Glossary entry for industrial process water, uses, matrices and operational decisions.', 'Glosario sobre agua de proceso industrial, usos, matrices y decisiones operativas.', 'Glossaire sur eau de process industriel, usages, matrices et décisions opérationnelles.', 'Glossario su acqua di processo industriale, usi, matrici e decisioni operative.', 'Glossari sobre aigua de procés industrial, usos, matrius i decisions operatives.'),
    biofilm: localText('Glossary entry for biofilm risk in circuits, assets, cooling, cleaning and reuse.', 'Glosario sobre riesgo de biofilm en circuitos, activos, refrigeración, limpieza y reutilización.', 'Glossaire du risque biofilm dans circuits, actifs, refroidissement, nettoyage et réutilisation.', 'Glossario sul rischio biofilm in circuiti, asset, raffreddamento, pulizia e riuso.', 'Glossari sobre risc de biofilm en circuits, actius, refrigeració, neteja i reutilització.'),
    digital_chain_custody: localText('Glossary entry for keeping sampling context connected from field to review.', 'Glosario para mantener contexto de muestreo conectado desde campo hasta revisión.', 'Glossaire pour garder le contexte de prélèvement relié du terrain à la revue.', 'Glossario per mantenere il contesto di campionamento collegato dal campo alla revisione.', 'Glossari per mantenir el context de mostreig connectat des del camp fins a la revisió.'),
    coa: localText('Glossary entry for reviewed analytical deliverables and certificate history.', 'Glosario sobre entregables analíticos revisados e histórico de certificados.', 'Glossaire des livrables analytiques revus et historique de certificats.', 'Glossario su deliverable analitici revisionati e storico certificati.', 'Glossari sobre lliurables analítics revisats i històric de certificats.'),
    iso_19458: localText('Sampling reference to review objectives, containers, transport and traceability.', 'Referencia de muestreo para revisar objetivos, recipientes, transporte y trazabilidad.', 'Référence de prélèvement pour revoir objectifs, contenants, transport et traçabilité.', 'Riferimento di campionamento per rivedere obiettivi, contenitori, trasporto e tracciabilità.', 'Referència de mostreig per revisar objectius, recipients, transport i traçabilitat.'),
    excel_to_lims: localText('Checklist for moving from spreadsheets to a connected sample-to-report workflow.', 'Checklist para pasar de hojas de cálculo a un flujo conectado de muestra a informe.', 'Checklist pour passer des tableurs à un flux connecté de l’échantillon au rapport.', 'Checklist per passare dai fogli di calcolo a un flusso connesso campione-report.', 'Checklist per passar de fulls de càlcul a un flux connectat de mostra a informe.'),
    aquatools_chemical_species: localText('Complementary calculator for routine chemistry conversions when water context requires it.', 'Calculadora complementaria para conversiones químicas rutinarias cuando el contexto del agua lo requiere.', 'Calculateur complémentaire pour conversions chimiques courantes selon le contexte eau.', 'Calcolatore complementare per conversioni chimiche di routine quando il contesto acqua lo richiede.', 'Calculadora complementària per conversions químiques rutinàries quan el context d’aigua ho requereix.'),
    aquatools_hardness: localText('Complementary calculator for hardness and alkalinity checks in operational water control.', 'Calculadora complementaria para dureza y alcalinidad en control operativo del agua.', 'Calculateur complémentaire pour dureté et alcalinité en contrôle opérationnel de l’eau.', 'Calcolatore complementare per durezza e alcalinità nel controllo operativo acqua.', 'Calculadora complementària per duresa i alcalinitat en control operatiu de l’aigua.')
});

const V2_TARGET_LABELS = Object.freeze({
    'field-sampling': localText('Field sampling and custody', 'Muestreo de campo y custodia', 'Prélèvement terrain et garde', 'Campionamento sul campo e custodia', 'Mostreig de camp i custòdia'),
    'sample-management': localText('Sample management', 'Gestión de muestras', 'Gestion des échantillons', 'Gestione campioni', 'Gestió de mostres'),
    'lims-review': localText('LIMS review layer', 'Capa de revisión LIMS', 'Couche de revue LIMS', 'Livello di revisione LIMS', 'Capa de revisió LIMS'),
    'coa-reporting': localText('CoA and documentary reporting', 'CoA y reporting documental', 'CoA et reporting documentaire', 'CoA e reporting documentale', 'CoA i reporting documental'),
    'customer-portal': localText('Customer portal', 'Portal cliente', 'Portail client', 'Portale cliente', 'Portal client'),
    'inventory-traceability': localText('Inventory and batch traceability', 'Inventario y trazabilidad de lotes', 'Inventaire et traçabilité des lots', 'Inventario e tracciabilità lotti', 'Inventari i traçabilitat de lots'),
    'deviations-capa': localText('Deviations and CAPA', 'Desviaciones y CAPA', 'Écarts et CAPA', 'Deviazioni e CAPA', 'Desviacions i CAPA'),
    dashboards: localText('Dashboards and trend views', 'Dashboards y tendencias', 'Dashboards et vues de tendance', 'Dashboard e viste trend', 'Dashboards i vistes de tendència')
});

const V2_MODULE_BLOCKS = Object.freeze({
    base: localText('Operational base', 'Base operativa', 'Base opérationnelle', 'Base operativa', 'Base operativa'),
    evidence: localText('Evidence and review', 'Evidencia y revisión', 'Preuve et revue', 'Evidenza e revisione', 'Evidència i revisió'),
    scale: localText('Scaling', 'Escalado', 'Passage à l’échelle', 'Scalabilità', 'Escalat')
});

const V2_MODULE_BLOCK_BY_TARGET = Object.freeze({
    'field-sampling': 'base',
    'sample-management': 'base',
    'inventory-traceability': 'base',
    'lims-review': 'evidence',
    'coa-reporting': 'evidence',
    'deviations-capa': 'evidence',
    'customer-portal': 'scale',
    dashboards: 'scale'
});

const V2_REASON_TEXT = Object.freeze({
    es: {
        'reason.fragmented_sample_flow': 'El flujo puede requerir reconstrucción manual entre muestra, circuito, laboratorio, revisión e informe.',
        'reason.digitised_stages_present': 'Ya existen etapas digitalizadas que conviene conectar en un historial operativo más coherente.',
        'reason.traceability_signal_count': 'La trazabilidad necesita unir custodia, método, lectura, revisión, lote y acción posterior.',
        'reason.audit_evidence_signal_count': 'La evidencia de auditoría debe conectar revisión técnica, CoA, desviaciones e inventario sin depender de documentos aislados.',
        'reason.volume_sites_roles': 'El volumen de muestras, sedes y roles aumenta el esfuerzo de coordinación entre proceso, laboratorio y calidad.',
        'reason.current_systems_readiness': 'Existe una base digital, pero el dato todavía puede quedar dividido entre sistemas, correo y hojas de cálculo.',
        'reason.analytical_context_fields': 'El contexto analítico requiere revisión antes de cerrar una ruta de producto.',
        'reason.field_custody_needed': 'El resultado necesita conservar punto, circuito, activo, operador, fecha, condiciones y estado de la muestra.',
        'reason.review_not_connected': 'El resultado analítico y la revisión técnica deben quedar conectados en el mismo historial.',
        'reason.coa_evidence_needed': 'El flujo necesita evidencia documental estructurada para CoA, revisión y conversaciones de auditoría.',
        'reason.customer_visibility_gap': 'Los responsables necesitan consultar estado, resultado, informe o acción por punto, circuito o activo.',
        'reason.batch_inventory_traceability': 'La trazabilidad de lote, kit, consumible o inventario refuerza el historial de muestra.',
        'reason.deviation_closure_needed': 'El contexto sugiere seguimiento de desviaciones, incidencias o acciones correctivas.',
        'reason.trends_and_sites': 'Las tendencias deben aparecer después de consolidar punto, circuito, activo y resultado.',
        'reason.calculation_support': 'El soporte de cálculo puede ayudar como complemento cuando el contexto químico del agua lo requiere.',
        'reason.quantitative_indicator_workflow': 'El caso menciona cuantificación, pero la ruta analítica aún necesita revisión técnica.',
        'reason.somatic_coliphage_enumeration': 'El caso menciona colífagos somáticos, pero falta confirmar matriz, método y alcance.',
        'reason.presence_absence_screening': 'El caso menciona cribado de presencia/ausencia, sujeto a confirmación técnica.',
        'reason.plate_workflow_needed': 'La ruta de placa requiere revisar equipamiento, incubación, lectura y evidencia documental.',
        'reason.reference_method_context': 'Una referencia metodológica no especificada exige revisión antes de seleccionar producto.',
        'reason.context_needs_review': 'El contexto analítico no es suficiente para una recomendación cerrada.'
    }
});

const V2_CONDITION_TEXT = Object.freeze({
    es: {
        'condition.define_sampling_sop': 'Definir estados mínimos de muestra y SOP de muestreo.',
        'condition.configure_method_and_roles': 'Definir método, roles, permisos y criterios de revisión.',
        'condition.define_report_templates': 'Definir plantilla de informe, estados de revisión y reglas de publicación.',
        'condition.define_customer_scope': 'Definir quién recibe el CoA o informe y qué información puede consultar.',
        'condition.load_product_batches': 'Definir lotes, consumibles y caducidades antes de depender de esa trazabilidad.',
        'condition.define_quality_workflow': 'Definir desviación, responsable, criterio de cierre y evidencia asociada.',
        'condition.define_dimensions': 'Definir planta, punto, circuito, activo y periodo antes de construir dashboards.',
        'condition.review_matrix_method_country': 'Confirmar matriz, método, país, volumen, uso previsto y laboratorio.',
        'condition.review_coliphage_scope': 'Confirmar organismo prioritario, huésped, volumen, método y alcance del laboratorio.',
        'condition.screening_context_only': 'Definir cuándo el cribado operativo requiere confirmación o revisión posterior.',
        'condition.collect_non_sensitive_context': 'Recoger contexto técnico no sensible antes de cerrar la recomendación.'
    }
});

const V2_ACTION_TEXT = Object.freeze({
    es: {
        'standardize-sample-workflow': 'Estandarizar puntos, activos, responsables y SOP de muestreo',
        'connect-custody-method-batch': 'Conectar muestra, custodia, método, lote y acción posterior',
        'connect-reading-and-review': 'Conectar lectura, revisión técnica y CoA',
        'improve-report-delivery': 'Mejorar informes, CoA e histórico de evidencia',
        'schedule-technical-review': 'Programar revisión técnica del contexto analítico',
        'scale-with-trends-and-dashboard': 'Escalar a tendencias cuando la base de datos sea consistente'
    }
});

const V2_INDUSTRIAL_PROBLEM_TEXT = Object.freeze({
    es: {
        'connect-process-lab-and-quality': {
            title: 'Coordinación entre proceso, laboratorio y calidad',
            paragraph: 'El flujo necesita que cada resultado se interprete junto con el circuito, activo, condición de proceso y criterio de calidad. Si esta relación queda repartida entre software propio, email y hojas de cálculo, la decisión puede depender de reconstrucciones manuales.'
        },
        'control-critical-process-points': {
            title: 'Control de puntos críticos de proceso',
            paragraph: 'Los puntos críticos deben diferenciarse por uso del agua, riesgo operativo, matriz, frecuencia y responsable. Un resultado aislado no explica si la acción afecta a mantenimiento, EHS, producción, reutilización o descarga.'
        },
        coordinate_external_labs: {
            title: 'Coordinación con laboratorios externos',
            paragraph: 'Cuando participa un laboratorio externo, la solicitud, custodia, método, CoA, revisión y seguimiento deben mantenerse conectados. Esto evita que el informe llegue sin suficiente contexto operativo.'
        }
    }
});

const V2_MATURITY_TEXT = Object.freeze({
    es: {
        workflow_maturity: 'El flujo es básico porque combina varios sistemas de trabajo y todavía puede requerir reconstrucción manual entre muestra, circuito, laboratorio, revisión e informe.',
        traceability: 'La trazabilidad es básica si el resultado no queda unido de forma consistente a activo, circuito, condición operativa, método, lote y acción posterior.',
        audit_readiness: 'La evidencia está parcialmente estructurada, pero debe conectar CoA, revisión técnica, acción correctiva y responsable para que una revisión no dependa de correos o documentos aislados.',
        operational_complexity: 'La complejidad aumenta cuando intervienen varios usos del agua, laboratorios externos, puntos críticos y decisiones de mantenimiento o EHS.',
        client_visibility: 'La visibilidad es limitada si los responsables no pueden consultar estado, resultado, informe o acción por punto, circuito o activo.',
        digital_readiness: 'Existe una base digital, pero debe consolidarse para que el dato no quede dividido entre software propio, email y hojas de cálculo.',
        analytical_context_completeness: 'El contexto analítico requiere revisión cuando el método se declara como otra referencia, el uso previsto es cribado operativo y se combinan varias matrices o usos del agua.'
    }
});

const V2_PHASE_CAPABILITIES = Object.freeze([
    ['field-sampling', 'sample-management'],
    ['sample-management', 'inventory-traceability'],
    ['lims-review', 'deviations-capa'],
    ['coa-reporting', 'customer-portal'],
    ['dashboards']
]);

function v2Copy(lang = 'en') {
    return V2_COPY[lang] || V2_COPY.en;
}

function v2Narrative(lang = 'en') {
    return V2_NARRATIVE[lang] || V2_NARRATIVE.en;
}

function profileForSector(sectorId) {
    return workflowAdvisorIndustryProfiles[sectorId] || workflowAdvisorIndustryProfiles['water-quality-control'];
}

function localizedMapValue(map, lang = 'en', fallback = '') {
    if (!map) return fallback;
    return map[lang] || map.en || map.es || fallback;
}

function localizedListFirst(map, lang = 'en', fallback = '') {
    const value = localizedMapValue(map, lang, fallback);
    if (Array.isArray(value)) return value[0] || fallback;
    return value || fallback;
}

function localizedDateV2(date, lang = 'en') {
    const locales = { en: 'en-US', es: 'es-ES', fr: 'fr-FR', it: 'it-IT', ca: 'ca-ES' };
    try {
        return new Intl.DateTimeFormat(locales[lang] || locales.en, { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
    } catch {
        return date.toISOString().slice(0, 10);
    }
}

function v2LocalizedKey(labels, category, key, lang = 'en') {
    if (category === 'reason' && V2_REASON_TEXT[lang]?.[key]) return V2_REASON_TEXT[lang][key];
    if (category === 'condition' && V2_CONDITION_TEXT[lang]?.[key]) return V2_CONDITION_TEXT[lang][key];
    if (category === 'action' && V2_ACTION_TEXT[lang]?.[key]) return V2_ACTION_TEXT[lang][key];
    return localizeKey(labels, category, key);
}

function firstReasonTextV2(item, labels, lang = 'en') {
    const key = item.reasonKeys?.[0] || 'reason.context_needs_review';
    return v2LocalizedKey(labels, 'reason', key, lang);
}

function optionLabelV2(value, lang = 'en') {
    const code = String(value || '');
    if (!code) return '';
    if (sectors.includes(code)) return localizedMapValue(profileForSector(code).labels, lang, getSectorLabel(code, lang));
    return V2_OPTION_LABELS[lang]?.[code]
        || V2_OPTION_LABELS.en?.[code]
        || optionLabel(code, lang)
        || code.replace(/[_-]+/g, ' ');
}

function targetLabelV2(targetId, lang = 'en') {
    return localizedMapValue(V2_TARGET_LABELS[targetId], lang, localizeKey(reportLabels(lang), 'target', targetId));
}

function answerArrayV2(answers = {}, field) {
    return asArray(answers[field]);
}

function answerValueV2(answers = {}, field, lang = 'en') {
    const value = answers[field];
    if (Array.isArray(value)) {
        const labels = value.map((item) => optionLabelV2(item, lang)).filter(Boolean);
        return labels.length ? labels.join(', ') : v2Narrative(lang).noValue;
    }
    if (value === undefined || value === null || value === '') return v2Narrative(lang).noValue;
    if (field === 'country_code') return String(value).toUpperCase();
    return optionLabelV2(value, lang);
}

function scoreLevel(result, dimensionId) {
    return result.scores.find((score) => score.dimensionId === dimensionId)?.level || 1;
}

function buildAnswersSnapshotV2({ answers = {}, sectorId, sourceProblemId, lang = 'en' }) {
    const copy = v2Copy(lang);
    const fields = [
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
        'result_type',
        'intended_use',
        'method_context',
        'sample_volume_context',
        'water_use_context'
    ];
    return fields
        .map((field) => {
            const raw = field === 'sector_id' ? sectorId : field === 'source_problem_id' ? sourceProblemId : answers[field];
            if (raw === undefined || raw === null || raw === '' || (Array.isArray(raw) && raw.length === 0)) return null;
            const label = copy.fields[field] || field.replace(/[_-]+/g, ' ');
            return { field, label, value: field === 'country_code' ? String(raw).toUpperCase() : answerValueV2({ [field]: raw }, field, lang) };
        })
        .filter(Boolean);
}

function fallbackRoadmap(profile, lang = 'en') {
    const narrative = v2Narrative(lang);
    const objects = profile.evidenceObjects?.[lang] || [];
    return narrative.roadmap.map(([title, objective, actions, expectedOutcome], index) => ({
        phaseId: `${profile.sectorId || 'workflow'}-${index + 1}`,
        title,
        objective: objects.length && index === 0
            ? `${objective} ${objects.slice(0, 4).join(', ')}.`
            : objective,
        actions,
        expectedOutcome,
        relatedCapabilities: V2_PHASE_CAPABILITIES[index] || []
    }));
}

function roadmapForProfile(profile, lang = 'en') {
    const localRoadmap = profile.recommendedRoadmap?.[lang];
    if (Array.isArray(localRoadmap) && localRoadmap.length) {
        return localRoadmap.map((phase, index) => ({
            ...phase,
            relatedCapabilities: phase.relatedCapabilities?.length ? phase.relatedCapabilities : (V2_PHASE_CAPABILITIES[index] || [])
        }));
    }
    return fallbackRoadmap(profile, lang);
}

function buildExecutiveSummaryV2({ result, profile, lang }) {
    const narrative = v2Narrative(lang);
    const sector = localizedMapValue(profile.labels, lang, getSectorLabel(result.sectorId, lang));
    const context = scoreLevel(result, 'analytical_context_completeness') >= 4 ? narrative.contextFragmentStrong : narrative.contextFragmentWeak;
    const complexity = scoreLevel(result, 'operational_complexity') >= 4 ? narrative.complexityHigh : narrative.complexityLow;
    const risk = localizedListFirst(profile.commonRisks, lang, '');
    return [
        narrative.summaryLead(sector, context, complexity),
        [localizedMapValue(profile.buyerContext, lang, ''), risk, narrative.summarySecond].filter(Boolean).join(' ')
    ];
}

function buildInterpretedContextV2({ result, answers, profile, lang }) {
    const narrative = v2Narrative(lang);
    const systems = answerValueV2(answers, 'current_systems', lang);
    const stages = answerValueV2(answers, 'digitised_stages', lang);
    const evidence = answerValueV2(answers, 'evidence_needs', lang);
    const waterUses = answerValueV2(answers, 'water_use_context', lang);
    if (lang === 'es' && result.sectorId === 'industrial-process-water') {
        return `El flujo indicado combina ${systems}. Aunque ya existen etapas digitalizadas como ${stages}, la conexión entre proceso, laboratorio y calidad todavía puede quedar fragmentada cuando intervienen varios puntos críticos, laboratorios externos o decisiones sobre ${waterUses}.`;
    }
    const buyerContext = localizedMapValue(profile.buyerContext, lang, '');
    return [buyerContext, narrative.flowParagraph(systems, stages, evidence)].filter(Boolean).join(' ');
}

function buildFlowDiagnosisV2({ result, answers, profile, lang }) {
    const narrative = v2Narrative(lang);
    const labels = reportLabels(lang);
    const systems = answerValueV2(answers, 'current_systems', lang);
    const stages = answerValueV2(answers, 'digitised_stages', lang);
    const evidence = answerValueV2(answers, 'evidence_needs', lang);
    const keySignals = unique([
        ...result.findings.map((finding) => localizeKey(labels, 'finding', finding.findingId)),
        ...(profile.evidenceObjects?.[lang] || []).slice(0, 5)
    ]).slice(0, 8);
    const paragraph = lang === 'es' && result.sectorId === 'industrial-process-water'
        ? `El flujo tiene una base digital parcial porque ${stages} ya aparecen como etapas digitalizadas. Sin embargo, la convivencia entre ${systems} puede dificultar reconstruir una decisión cuando el resultado debe relacionarse con circuito, activo, condición de proceso, laboratorio externo y acción correctiva. La mejora prioritaria es conectar los puntos de agua con activos y circuitos antes de ampliar hacia dashboards.`
        : narrative.flowParagraph(systems, stages, evidence);
    return {
        paragraph,
        keySignals
    };
}

function buildMaturityV2(result, lang = 'en') {
    const copy = v2Copy(lang);
    const labels = reportLabels(lang);
    return result.scores.map((score) => ({
        dimensionId: score.dimensionId,
        title: localizedText[lang]?.maturity?.[score.dimensionId] || localizedText.en.maturity[score.dimensionId] || score.dimensionId,
        level: score.level,
        label: copy.levelLabels[Math.max(0, Math.min(4, score.level - 1))],
        explanation: (result.sectorId === 'industrial-process-water' ? V2_MATURITY_TEXT[lang]?.[score.dimensionId] : '')
            || (score.reasonKeys || []).map((key) => v2LocalizedKey(labels, 'reason', key, lang)).join(' '),
        nextImprovement: v2LocalizedKey(labels, 'action', DIMENSION_ACTIONS[score.dimensionId] || 'standardize-sample-workflow', lang)
    }));
}

function buildPriorityProblemsV2({ result, answers, lang }) {
    const copy = v2Copy(lang);
    const narrative = v2Narrative(lang);
    const labels = reportLabels(lang);
    const selected = answerArrayV2(answers, 'priority_problem_ids').map((problemId) => ({
        problemId,
        title: V2_INDUSTRIAL_PROBLEM_TEXT[lang]?.[problemId]?.title || optionLabelV2(problemId, lang),
        priorityLabel: narrative.selectedPriority,
        severity: 'medium',
        paragraph: V2_INDUSTRIAL_PROBLEM_TEXT[lang]?.[problemId]?.paragraph || optionLabelV2(problemId, lang)
    }));
    const detected = result.findings.map((finding) => ({
        findingId: finding.findingId,
        title: localizeKey(labels, 'finding', finding.findingId),
        priorityLabel: copy.severity[finding.priority] || finding.priority,
        severity: finding.priority,
        paragraph: (finding.reasonKeys || []).map((key) => v2LocalizedKey(labels, 'reason', key, lang)).join(' ') || narrative.findingPriority
    }));
    return [...selected, ...detected].slice(0, 6);
}

function capabilityPhaseIndex(targetId) {
    const index = V2_PHASE_CAPABILITIES.findIndex((capabilities) => capabilities.includes(targetId));
    return index >= 0 ? index : 2;
}

function modulePlanBlock(targetId, lang = 'en') {
    const blockId = V2_MODULE_BLOCK_BY_TARGET[targetId] || 'evidence';
    return {
        blockId,
        title: localizedMapValue(V2_MODULE_BLOCKS[blockId], lang, localizedMapValue(V2_MODULE_BLOCKS.evidence, lang, 'Evidence and review'))
    };
}

function buildRecommendationSectionsV2({ result, roadmap, lang }) {
    const copy = v2Copy(lang);
    const narrative = v2Narrative(lang);
    const labels = reportLabels(lang);
    return result.recommendations
        .filter((item) => {
            if (item.type !== 'module' || item.audience === 'internal' || ['crm', 'gis'].includes(item.targetId)) return false;
            if (item.targetId === 'dashboards' && (scoreLevel(result, 'workflow_maturity') <= 2 || scoreLevel(result, 'traceability') <= 2)) return false;
            return true;
        })
        .sort((a, b) => capabilityPhaseIndex(a.targetId) - capabilityPhaseIndex(b.targetId) || a.priority - b.priority)
        .map((item) => {
            const title = targetLabelV2(item.targetId, lang);
            const phase = modulePlanBlock(item.targetId, lang);
            const reason = firstReasonTextV2(item, labels, lang);
            return {
                recommendationId: item.recommendationId,
                targetId: item.targetId,
                title,
                status: copy.status[item.fitStatus] || item.fitStatus,
                phaseId: phase.blockId,
                phaseTitle: phase.title,
                paragraph: narrative.moduleWhyNow(title, reason),
                whyNow: reason,
                whatToDefine: (item.conditionKeys || []).map((key) => v2LocalizedKey(labels, 'condition', key, lang)).filter(Boolean),
                nextStep: narrative.moduleNext,
                showToClient: true
            };
        });
}

function productCandidateTitle(targetId) {
    const product = catalog.products[targetId];
    if (product?.family) return product.family;
    if (targetId === 'iso-epa-kits') return 'Kits ISO/EPA';
    return String(targetId || '').replace(/[_-]+/g, ' ');
}

function buildAnalyticalReviewV2({ result, answers, lang }) {
    const copy = v2Copy(lang);
    const narrative = v2Narrative(lang);
    const labels = reportLabels(lang);
    const targets = answerArrayV2(answers, 'target_groups').map((item) => optionLabelV2(item, lang)).filter(Boolean);
    const resultType = answerValueV2(answers, 'result_type', lang);
    const volume = answerValueV2(answers, 'sample_volume_context', lang);
    const intendedUse = answerValueV2(answers, 'intended_use', lang);
    const methodLabel = answerValueV2(answers, 'method_context', lang);
    const waterUses = answerValueV2(answers, 'water_use_context', lang);
    const method = String(answers.method_context || '');
    const methodMissing = !method || ['not_defined', 'other_reference', 'unknown'].includes(method);
    const productRecommendations = result.recommendations.filter((item) => item.type === 'product');
    const candidateIds = unique(productRecommendations.map((item) => item.targetId));
    const pendingCandidates = [
        { productId: 'family-indica', title: 'INDICA', status: narrative.noClosedRecommendation, reason: narrative.familiesToReview.indica },
        { productId: 'family-enumera', title: 'ENUMERA', status: narrative.noClosedRecommendation, reason: narrative.familiesToReview.enumera },
        { productId: 'family-plaque-iso-epa', title: 'PLAQUE / Kits ISO/EPA', status: narrative.noClosedRecommendation, reason: narrative.familiesToReview.plaque }
    ];
    const candidates = methodMissing ? pendingCandidates : candidateIds.map((targetId) => ({
        productId: targetId,
        title: productCandidateTitle(targetId),
        status: copy.status.product_to_evaluate,
        reason: productRecommendations.find((item) => item.targetId === targetId)?.reasonKeys
            ?.map((key) => v2LocalizedKey(labels, 'reason', key, lang))
            .join(' ') || copy.routePending
    }));
    const targetText = targets.length ? targets.join(', ') : narrative.noValue;
    let paragraph = methodMissing
        ? narrative.analyticalPending(resultType, volume, targetText)
        : narrative.analyticalClear;
    if (lang === 'es'
        && result.sectorId === 'industrial-process-water'
        && methodMissing) {
        paragraph = `Has indicado resultado ${resultType.toLowerCase()}, volumen de ${volume}, ${intendedUse.toLowerCase()} y ${methodLabel.toLowerCase()}. También aparecen varios usos de agua: ${waterUses}. Con esta información no debe cerrarse un producto concreto. Antes de evaluar INDICA, ENUMERA, PLAQUE o kits ISO/EPA deben confirmarse matriz, organismo prioritario, volumen real de muestra, método, país, laboratorio y uso previsto.`;
    }
    if (lang === 'es'
        && result.sectorId === 'agriculture-water'
        && String(answers.result_type || '') === 'presence_absence'
        && String(answers.sample_volume_context || '') === 'one_ml'
        && methodMissing) {
        paragraph = 'Has indicado presencia/ausencia, volumen de 1 mL y varios grupos objetivo: colífagos somáticos, colífagos F-específicos, E. coli y microbiología general. Como el método no está definido, no debe cerrarse una recomendación de producto. Antes de evaluar INDICA, ENUMERA, PLAQUE o kits ISO/EPA deben confirmarse matriz, volumen, método, país, uso previsto y laboratorio.';
    }
    return {
        title: copy.routePending,
        status: copy.status.technical_review_required,
        paragraph,
        candidates,
        nextStep: narrative.technicalReviewNext
    };
}

function buildMissingInformationV2(answers = {}, lang = 'en') {
    const copy = v2Copy(lang);
    if (lang === 'es') {
        return [
            'Método o referencia exacta: necesario para saber si la ruta analítica debe orientarse a presencia/ausencia, enumeración, placa, referencia ISO/EPA o revisión específica.',
            'Matriz concreta para cada uso de agua: necesaria para diferenciar agua de consumo, agua de proceso, agua regenerada u otra matriz.',
            'Organismo prioritario: necesario para priorizar indicador, colífagos, E. coli, microbiología general u otro objetivo.',
            'Volumen real aplicable por matriz: necesario porque 1 mL puede no representar todos los usos o métodos.',
            'Uso del resultado: confirmar si será interno, contractual, auditoría o regulatorio.',
            'Laboratorio responsable y alcance: necesario para saber si el resultado procede de laboratorio interno, externo o mixto y con qué alcance.',
            'Criterios de revisión: necesarios para interpretar desviaciones, aceptación interna y acciones posteriores.',
            'Quién recibe el CoA o informe: necesario para orientar publicación, revisión y trazabilidad de entrega.',
            'Acciones ante una desviación: definir qué se activa ante resultado fuera de criterio, remuestreo, mantenimiento o EHS.',
            'País o jurisdicción aplicable a cada uso: necesario antes de cerrar cualquier evaluación técnica o regulatoria.'
        ];
    }
    const checks = [
        ['water_use_context', localText('Matrix or water use', 'Matriz o uso del agua', 'Matrice ou usage de l’eau', 'Matrice o uso acqua', 'Matriu o ús de l’aigua')],
        ['method_context', localText('Method', 'Método', 'Méthode', 'Metodo', 'Mètode')],
        ['sample_volume_context', localText('Sample volume', 'Volumen de muestra', 'Volume échantillon', 'Volume campione', 'Volum de mostra')],
        ['country_code', localText('Country', 'País', 'Pays', 'Paese', 'País')],
        ['intended_use', localText('Intended use', 'Uso previsto', 'Usage prévu', 'Uso previsto', 'Ús previst')],
        ['lab_model', localText('Laboratory role', 'Rol del laboratorio', 'Rôle laboratoire', 'Ruolo laboratorio', 'Rol del laboratori')]
    ];
    const missing = checks.filter(([field]) => {
        const value = answers[field];
        if (Array.isArray(value)) return value.length === 0 || value.some((item) => ['not_defined', 'unknown'].includes(item));
        return value === undefined || value === null || value === '' || ['not_defined', 'unknown', 'other_reference'].includes(String(value));
    }).map(([, label]) => localizedMapValue(label, lang));
    return missing.length ? missing : [v2Narrative(lang).noMissing || copy.noIndicated];
}

function buildRelatedResourcesV2({ profile, lang }) {
    const narrative = v2Narrative(lang);
    const ids = unique([
        ...(profile.recommendedResourceIds || []),
        ...(profile.recommendedGlossaryTermIds || []),
        ...(profile.recommendedToolIds || [])
    ]);
    return ids.map((resourceId) => {
        const isIndustry = resourceId === 'agriculture-page' || resourceId === 'industrial-process-water-page';
        const url = isIndustry
            ? (INDUSTRY_ROUTES[profile.sectorId]?.[lang] || INDUSTRY_ROUTES[profile.sectorId]?.en || '')
            : (GLOSSARY_RESOURCE_ROUTES[resourceId]?.[lang] || GLOSSARY_RESOURCE_ROUTES[resourceId]?.en || '');
        const type = resourceId === 'aquaverify_cloud'
            ? 'platform'
            : resourceId.startsWith('aquatools_')
                ? 'tool'
                : isIndustry
                    ? 'industry'
                    : resourceId === 'excel_to_lims'
                        ? 'resource'
                        : 'glossary';
        return {
            resourceId,
            type,
            typeLabel: narrative.resourceTypes[type] || narrative.resourceTypes.glossary,
            title: localizedMapValue(V2_RESOURCE_TITLES[resourceId], lang, optionLabelV2(resourceId, lang)),
            description: localizedMapValue(V2_RESOURCE_DESCRIPTIONS[resourceId], lang, ''),
            url
        };
    }).filter((resource) => resource.url && resource.description && !resource.url.includes('diagnostico'));
}

function buildWorkflowAdvisorReportV2({ result, answers = {}, questionnaire: questionnaireDefinition = questionnaire, lang = 'en', industryProfile } = {}) {
    if (!result) throw new Error('workflow_advisor_report_result_required');
    const safeLang = languages.includes(lang) ? lang : 'en';
    const copy = v2Copy(safeLang);
    const narrative = v2Narrative(safeLang);
    const profile = industryProfile || profileForSector(result.sectorId);
    const roadmap = roadmapForProfile(profile, safeLang);
    const analyticalReview = buildAnalyticalReviewV2({ result, answers, lang: safeLang });
    const sectorLabel = localizedMapValue(profile.labels, safeLang, getSectorLabel(result.sectorId, safeLang));
    const generatedAtDate = new Date();
    const quickRead = {
        primaryRisk: localizedListFirst(profile.commonRisks, safeLang, ''),
        immediatePriority: roadmap[0]?.title || narrative.contextTitle,
        analyticalRoute: analyticalReview.title,
        nextStep: roadmap[0]?.objective || narrative.technicalReviewNext
    };
    return {
        reportVersion: reportV2Version,
        reportKind: 'consultative_workflow_report',
        generatedAt: generatedAtDate.toISOString(),
        lang: safeLang,
        cover: {
            brand: 'AquaVerify',
            title: copy.reportTitle,
            sectorTitle: sectorLabel,
            subtitle: localizedMapValue(profile.reportSubtitle, safeLang, ''),
            generatedAtLabel: copy.generatedAt,
            generatedAtLocalized: localizedDateV2(generatedAtDate, safeLang),
            preparedByLabel: copy.preparedBy,
            preparedBy: 'AquaVerify Workflow Advisor',
            assessmentVersionLabel: copy.assessmentVersionLabel,
            assessmentVersion
        },
        sector: {
            sectorId: result.sectorId,
            label: sectorLabel,
            url: INDUSTRY_ROUTES[result.sectorId]?.[safeLang] || INDUSTRY_ROUTES[result.sectorId]?.en || ''
        },
        title: localizedMapValue(profile.reportTitle, safeLang, `${copy.reportTitle} - ${sectorLabel}`),
        subtitle: localizedMapValue(profile.reportSubtitle, safeLang, ''),
        versions: {
            assessmentVersion,
            questionnaireVersion: questionnaireDefinition.questionnaireVersion || questionnaireVersion,
            rulesVersion,
            catalogVersion,
            reportVersion: reportV2Version
        },
        sections: {
            quickRead: copy.quickRead,
            executiveSummary: copy.executiveSummary,
            context: copy.context,
            flow: copy.flow,
            maturity: copy.maturity,
            priorityProblems: copy.priorityProblems,
            plan: copy.plan,
            digitalModules: copy.digitalModules,
            analyticalReview: copy.analyticalReview,
            missingInfo: copy.missingInfo,
            relatedResources: copy.relatedResources,
            limitations: copy.limitations
        },
        quickRead,
        quickReadItems: [
            { id: 'primaryRisk', label: copy.primaryRisk, value: quickRead.primaryRisk },
            { id: 'immediatePriority', label: copy.immediatePriority, value: quickRead.immediatePriority },
            { id: 'analyticalRoute', label: copy.analyticalRoute, value: quickRead.analyticalRoute },
            { id: 'nextStep', label: copy.nextStep, value: quickRead.nextStep }
        ],
        executiveSummary: buildExecutiveSummaryV2({ result, profile, lang: safeLang }),
        interpretedContext: {
            title: narrative.contextTitle,
            buyerContext: buildInterpretedContextV2({ result, answers, profile, lang: safeLang }),
            facts: buildAnswersSnapshotV2({ answers, sectorId: result.sectorId, sourceProblemId: result.sourceProblemId, lang: safeLang })
        },
        flowDiagnosis: buildFlowDiagnosisV2({ result, answers, profile, lang: safeLang }),
        maturity: buildMaturityV2(result, safeLang),
        priorityProblems: buildPriorityProblemsV2({ result, answers, lang: safeLang }),
        improvementPlan: {
            phases: roadmap.map((phase, index) => ({
                ...phase,
                phase: index + 1,
                relatedCapabilities: (phase.relatedCapabilities || []).map((targetId) => ({
                    targetId,
                    title: targetLabelV2(targetId, safeLang)
                }))
            }))
        },
        recommendationSections: buildRecommendationSectionsV2({ result, roadmap, lang: safeLang }),
        analyticalReview,
        missingInformation: buildMissingInformationV2(answers, safeLang),
        relatedResources: buildRelatedResourcesV2({ profile, lang: safeLang }),
        limitations: copy.limitationsList,
        cta: {
            title: copy.ctaTitle,
            label: copy.ctaButton,
            requestType: 'technical_review'
        },
        pdf: {
            buttonLabel: copy.pdfButton,
            printLabel: copy.printButton,
            instructions: copy.printInstructions,
            mode: 'dedicated-print',
            filename: `aquaverify-workflow-advisor-${result.sectorId}-${safeLang}.pdf`
        },
        technicalExport: {
            label: copy.technicalExport,
            note: copy.technicalExportNote
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
    assessment.reportV2 = buildWorkflowAdvisorReportV2({
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
    reportV2Version,
    REPORT_SECTIONS,
    REPORT_COPY,
    REPORT_TRANSLATIONS,
    V2_COPY,
    V2_OPTION_LABELS,
    INDUSTRY_ROUTES,
    GLOSSARY_RESOURCE_ROUTES,
    workflowAdvisorIndustryProfiles,
    allowedEvents,
    assessWorkflow,
    buildWorkflowAdvisorReport,
    buildWorkflowAdvisorReportV2,
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