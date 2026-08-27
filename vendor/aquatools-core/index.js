import legacy from './aquaToolsCalculations.esm.js';

const calculationVersion = '1.0.0';
const packageVersion = '1.0.0';

const publicToolIds = Object.freeze([
    'molarity',
    'dilution',
    'unit-converter',
    'rpm-rcf',
    'cfu-calculator',
    'recovery-rpd',
    'hardness-alkalinity',
    'chemical-species-converter'
]);

function normalizeInput(value, unit) {
    return unit ? { value, unit } : { value };
}

function warning(code, severity = 'warning') {
    return { code, severity, messageKey: `aquatools.warning.${code}` };
}

function errorResult(toolId, formulaId, err) {
    const code = err?.message || 'calculation_error';
    return {
        toolId,
        calculationVersion,
        normalizedInputs: {},
        primaryResult: null,
        formulaId,
        formulaDisplay: '',
        steps: [],
        warnings: [],
        errors: [{ code, messageKey: `aquatools.error.${code}` }]
    };
}

function result({ toolId, formulaId, formulaDisplay, normalizedInputs, primaryResult, secondaryResults, steps = [], warnings = [] }) {
    return {
        toolId,
        calculationVersion,
        normalizedInputs,
        primaryResult,
        secondaryResults,
        formulaId,
        formulaDisplay,
        steps,
        warnings: warnings.map((item) => typeof item === 'string' ? warning(item) : item),
        errors: []
    };
}

function parseCoreNumber(value, field = 'value') {
    if (typeof value === 'number') {
        if (!Number.isFinite(value)) throw new Error(`${field}_finite_required`);
        return value;
    }
    const raw = String(value ?? '').trim();
    if (!raw) throw new Error(`${field}_required`);
    const compact = raw.replace(/\s+/g, '');
    if (compact.includes(',') && compact.includes('.')) throw new Error('ambiguous_number');
    if (/^[+-]?\d{1,3}([,.]\d{3})+$/.test(compact)) throw new Error('ambiguous_number');
    if (!/^[+-]?(?:\d+(?:[,.]\d*)?|[,.]\d+)(?:e[+-]?\d+)?$/i.test(compact)) throw new Error('invalid_number');
    const parsed = Number(compact.replace(',', '.'));
    if (!Number.isFinite(parsed)) throw new Error(`${field}_finite_required`);
    return parsed;
}

function parseOptionalNumber(value, field) {
    if (value === undefined || value === null || value === '') return null;
    return parseCoreNumber(value, field);
}

function parseDilutionFraction(value) {
    const raw = String(value ?? '').trim().replace(/\s+/g, '');
    const power = raw.match(/^10\^?(-?\d+)$/i);
    if (power) return Math.pow(10, Number(power[1]));
    const ratio = raw.match(/^1:(\d+(?:[,.]\d+)?)$/);
    if (ratio) return 1 / parseCoreNumber(ratio[1], 'dilution');
    const parsed = parseCoreNumber(value, 'dilution');
    if (parsed <= 0) throw new Error('dilution_factor_positive_required');
    return parsed;
}

function recommendedMolarUnits(valueM) {
    return {
        M: valueM,
        mM: valueM / 1e-3,
        uM: valueM / 1e-6,
        nM: valueM / 1e-9,
        recommended: legacy.autoFormatConcentration(valueM)
    };
}

function calculateMolarity(input = {}) {
    const formulaId = `molarity.${input.mode || 'mass'}.v1`;
    try {
        const mode = input.mode || 'mass';
        if (mode === 'moles') {
            const out = legacy.molarityFromMoles(input);
            return result({
                toolId: 'molarity',
                formulaId,
                formulaDisplay: 'M = n / V',
                normalizedInputs: {
                    moles: normalizeInput(legacy.convertMoles(input.moles, input.molesUnit || 'mol', 'mol'), 'mol'),
                    volume: normalizeInput(legacy.convertVolume(input.volume, input.volumeUnit || 'L', 'L'), 'L')
                },
                primaryResult: { valueM: out.valueM, ...recommendedMolarUnits(out.valueM) },
                secondaryResults: { equivalent: out.equivalent },
                steps: [
                    { label: 'convert_moles', expression: 'n -> mol', value: legacy.convertMoles(input.moles, input.molesUnit || 'mol', 'mol'), unit: 'mol' },
                    { label: 'convert_volume', expression: 'V -> L', value: legacy.convertVolume(input.volume, input.volumeUnit || 'L', 'L'), unit: 'L' },
                    { label: 'calculate', expression: 'M = n / V', value: out.valueM, unit: 'mol/L' }
                ]
            });
        }
        if (mode === 'massVolume') {
            const out = legacy.molarityFromMassVolume(input);
            return result({
                toolId: 'molarity',
                formulaId,
                formulaDisplay: 'M = c / MW',
                normalizedInputs: {
                    concentration: normalizeInput(legacy.convertMassVolumeConcentration(input.concentration, input.concentrationUnit || 'g/L', 'g/L'), 'g/L'),
                    molarMass: normalizeInput(parseCoreNumber(input.molarMass, 'molar_mass'), 'g/mol')
                },
                primaryResult: { valueM: out.valueM, ...recommendedMolarUnits(out.valueM) },
                steps: [
                    { label: 'convert_concentration', expression: 'c -> g/L', value: legacy.convertMassVolumeConcentration(input.concentration, input.concentrationUnit || 'g/L', 'g/L'), unit: 'g/L' },
                    { label: 'calculate', expression: 'M = c / MW', value: out.valueM, unit: 'mol/L' }
                ],
                warnings: ['molar_mass_conversion_warning']
            });
        }
        const out = legacy.molarityFromMass(input);
        return result({
            toolId: 'molarity',
            formulaId,
            formulaDisplay: 'M = m / (MW x V)',
            normalizedInputs: {
                mass: normalizeInput(legacy.convertMass(input.mass, input.massUnit || 'g', 'g'), 'g'),
                molarMass: normalizeInput(parseCoreNumber(input.molarMass, 'molar_mass'), 'g/mol'),
                volume: normalizeInput(legacy.convertVolume(input.volume, input.volumeUnit || 'L', 'L'), 'L')
            },
            primaryResult: { valueM: out.valueM, ...recommendedMolarUnits(out.valueM) },
            steps: [
                { label: 'convert_mass', expression: 'm -> g', value: legacy.convertMass(input.mass, input.massUnit || 'g', 'g'), unit: 'g' },
                { label: 'convert_volume', expression: 'V -> L', value: legacy.convertVolume(input.volume, input.volumeUnit || 'L', 'L'), unit: 'L' },
                { label: 'calculate', expression: 'M = m / (MW x V)', value: out.valueM, unit: 'mol/L' }
            ]
        });
    } catch (err) {
        return errorResult('molarity', formulaId, err);
    }
}

function calculateDilution(input = {}) {
    const formulaId = `dilution.${input.mode || 'solver'}.v1`;
    try {
        const mode = input.mode || 'solver';
        if (mode === 'direct') {
            const out = legacy.diluteStock({
                stock: input.cStock,
                stockUnit: input.cStockUnit,
                target: input.cTarget,
                targetUnit: input.cTargetUnit,
                finalVolume: input.finalVolume,
                finalVolumeUnit: input.finalVolumeUnit
            });
            const minPipetteL = input.minPipettableVolume
                ? legacy.convertVolume(input.minPipettableVolume, input.minPipettableUnit || 'µL', 'L', { allowZero: true })
                : 1e-6;
            const warnings = [];
            if (out.stockVolume < minPipetteL) warnings.push('difficult_to_pipette');
            return result({
                toolId: 'dilution',
                formulaId,
                formulaDisplay: 'Vstock = (Ctarget x Vfinal) / Cstock',
                normalizedInputs: {
                    stockConcentration: legacy.convertConcentration(input.cStock, input.cStockUnit),
                    targetConcentration: legacy.convertConcentration(input.cTarget, input.cTargetUnit),
                    finalVolume: normalizeInput(out.finalVolume, 'L')
                },
                primaryResult: {
                    stockVolumeL: out.stockVolume,
                    diluentVolumeL: out.solvent,
                    finalVolumeL: out.finalVolume,
                    stockVolume: legacy.autoFormatVolume(out.stockVolume),
                    diluentVolume: legacy.autoFormatVolume(out.solvent)
                },
                steps: [
                    { label: 'calculate_stock', expression: 'Vstock = (Ctarget x Vfinal) / Cstock', value: out.stockVolume, unit: 'L' },
                    { label: 'complete_to_volume', expression: 'Vdiluent = Vfinal - Vstock', value: out.solvent, unit: 'L' }
                ],
                warnings
            });
        }
        if (mode === 'serial') {
            const out = legacy.serialDilution(input);
            return result({
                toolId: 'dilution',
                formulaId,
                formulaDisplay: 'Cn = C0 / F^n',
                normalizedInputs: {
                    initialConcentration: legacy.convertConcentration(input.c0, input.c0Unit),
                    factor: normalizeInput(parseCoreNumber(input.factor, 'factor')),
                    steps: normalizeInput(parseCoreNumber(input.steps, 'steps'))
                },
                primaryResult: {
                    finalConcentration: out.finalConcentration,
                    formatted: legacy.formatConcentrationValue(out.finalConcentration)
                },
                secondaryResults: {
                    table: out.table,
                    transferL: out.transfer,
                    diluentPerStepL: out.diluentPerStep,
                    finalVolumePerStepL: out.finalVolumePerStep
                },
                steps: out.table.map((row) => ({
                    label: `step_${row.step}`,
                    expression: `C${row.step} = C0 / F^${row.step}`,
                    value: row.concentration.value,
                    unit: row.concentration.baseUnit
                }))
            });
        }
        const out = legacy.dilutionSimple(input);
        return result({
            toolId: 'dilution',
            formulaId,
            formulaDisplay: 'C1 x V1 = C2 x V2',
            normalizedInputs: {
                c1: out.c1 ? normalizeInput(out.c1.value, out.c1.baseUnit) : null,
                v1: out.v1 !== null ? normalizeInput(out.v1, 'L') : null,
                c2: out.c2 ? normalizeInput(out.c2.value, out.c2.baseUnit) : null,
                v2: out.v2 !== null ? normalizeInput(out.v2, 'L') : null
            },
            primaryResult: {
                solved: out.solved,
                c1: out.c1,
                c2: out.c2,
                v1L: out.v1,
                v2L: out.v2,
                solventL: out.solvent,
                v1Formatted: out.v1 !== null ? legacy.autoFormatVolume(out.v1) : null,
                solventFormatted: out.solvent !== null ? legacy.autoFormatVolume(out.solvent) : null
            },
            steps: [{ label: 'solve', expression: 'C1 x V1 = C2 x V2' }],
            warnings: out.warnings
        });
    } catch (err) {
        return errorResult('dilution', formulaId, err);
    }
}

function calculateUnitConversion(input = {}) {
    const formulaId = `unit-converter.${input.category || 'mass'}.v1`;
    try {
        const category = input.category || 'mass';
        let value;
        let warnings = [];
        if (category === 'mass') value = legacy.convertMass(input.value, input.fromUnit, input.toUnit, { allowZero: true });
        else if (category === 'volume') value = legacy.convertVolume(input.value, input.fromUnit, input.toUnit, { allowZero: true });
        else if (category === 'moles') value = legacy.convertMoles(input.value, input.fromUnit, input.toUnit, { allowZero: true });
        else if (category === 'molarity') value = legacy.convertMolarConcentration(input.value, input.fromUnit, input.toUnit, { allowZero: true });
        else if (category === 'mass-volume' || category === 'concentration') value = legacy.convertConcentrationBetween(input.value, input.fromUnit, input.toUnit, { molarMass: input.molarMass });
        else if (category === 'temperature') value = legacy.convertTemperature(input.value, input.fromUnit, input.toUnit);
        else if (category === 'percent-ppm') {
            const converted = legacy.convertPercentPpm(input.value, input.fromUnit, input.toUnit, { density: input.density });
            value = converted.value;
            warnings = converted.warnings;
        } else {
            throw new Error('incompatible_units');
        }
        return result({
            toolId: 'unit-converter',
            formulaId,
            formulaDisplay: category === 'temperature' ? 'Unit conversion with temperature offset' : 'value_to = value_from x factor',
            normalizedInputs: {
                value: normalizeInput(parseCoreNumber(input.value, 'value'), input.fromUnit),
                molarMass: input.molarMass ? normalizeInput(parseCoreNumber(input.molarMass, 'molar_mass'), 'g/mol') : undefined
            },
            primaryResult: { value, unit: legacy.normalizeUnit(input.toUnit) },
            steps: [{ label: 'convert', expression: `${input.value} ${input.fromUnit} -> ${input.toUnit}`, value, unit: legacy.normalizeUnit(input.toUnit) }],
            warnings
        });
    } catch (err) {
        return errorResult('unit-converter', formulaId, err);
    }
}

function calculateRpmRcf(input = {}) {
    const formulaId = `rpm-rcf.${input.mode || 'rpm_to_rcf'}.v1`;
    try {
        const mode = input.mode || 'rpm_to_rcf';
        const radiusCm = parseCoreNumber(input.radiusCm, 'radius');
        const output = mode === 'rcf_to_rpm'
            ? { rpm: legacy.rcfToRpm(input.value, radiusCm), rcf: parseCoreNumber(input.value, 'rcf') }
            : { rpm: parseCoreNumber(input.value, 'rpm'), rcf: legacy.rpmToRcf(input.value, radiusCm) };
        return result({
            toolId: 'rpm-rcf',
            formulaId,
            formulaDisplay: mode === 'rcf_to_rpm' ? 'RPM = sqrt(RCF / (1.118 x 10^-5 x r_cm))' : 'RCF = 1.118 x 10^-5 x r_cm x RPM^2',
            normalizedInputs: {
                value: normalizeInput(parseCoreNumber(input.value, 'value'), mode === 'rcf_to_rpm' ? 'xg' : 'RPM'),
                radius: normalizeInput(radiusCm, 'cm')
            },
            primaryResult: { ...output, radiusCm },
            steps: [{ label: 'calculate', expression: mode === 'rcf_to_rpm' ? 'RPM = sqrt(RCF / (1.118e-5 x r))' : 'RCF = 1.118e-5 x r x RPM^2', value: mode === 'rcf_to_rpm' ? output.rpm : output.rcf, unit: mode === 'rcf_to_rpm' ? 'RPM' : 'xg' }],
            warnings: ['use_actual_rotor_radius']
        });
    } catch (err) {
        return errorResult('rpm-rcf', formulaId, err);
    }
}

function calculateCfu(input = {}) {
    const formulaId = 'cfu-calculator.plate-count.v1';
    try {
        const rows = Array.isArray(input.replicates) && input.replicates.length
            ? input.replicates
            : [{ colonies: input.colonies, dilution: input.dilution, platedVolume: input.platedVolume, platedVolumeUnit: input.platedVolumeUnit }];
        const results = rows.map((row) => legacy.cfuPlateCount({
            colonies: row.colonies,
            dilution: parseDilutionFraction(row.dilution),
            platedVolume: row.platedVolume,
            platedVolumeUnit: row.platedVolumeUnit || input.platedVolumeUnit || 'mL',
            minCount: input.minCount ?? 0,
            maxCount: input.maxCount ?? '1e99'
        }));
        const values = results.map((row) => row.cfuPerMl);
        const mean = legacy.mean(values);
        const sd = values.length > 1 ? legacy.standardDeviation(values) : 0;
        return result({
            toolId: 'cfu-calculator',
            formulaId,
            formulaDisplay: 'CFU/mL = colonies / (dilution fraction x plated volume mL)',
            normalizedInputs: {
                dilution: normalizeInput(parseDilutionFraction(rows[0].dilution)),
                platedVolume: normalizeInput(results[0].platedMl, 'mL')
            },
            primaryResult: {
                cfuPerMl: mean,
                ufcPerMl: mean,
                log10CfuPerMl: mean > 0 ? Math.log10(mean) : null
            },
            secondaryResults: {
                individualResults: results,
                sd,
                rsd: mean !== 0 && values.length > 1 ? (sd / mean) * 100 : null
            },
            steps: results.map((row, index) => ({ label: `replicate_${index + 1}`, expression: 'CFU/mL = colonies / (dilution x platedVolume)', value: row.cfuPerMl, unit: 'CFU/mL' })),
            warnings: ['cfu_method_range_user_defined', ...(results.some((row) => row.colonies === 0) ? ['zero_is_not_absence'] : [])]
        });
    } catch (err) {
        return errorResult('cfu-calculator', formulaId, err);
    }
}

function calculateRecoveryRpd(input = {}) {
    const formulaId = `recovery-rpd.${input.mode || 'recovery'}.v1`;
    try {
        if ((input.mode || 'recovery') === 'rpd') {
            const rpdValue = legacy.rpd(input.a, input.b);
            const mean = (parseCoreNumber(input.a, 'a') + parseCoreNumber(input.b, 'b')) / 2;
            const criterionMax = parseOptionalNumber(input.criterionMax, 'criterion_max');
            return result({
                toolId: 'recovery-rpd',
                formulaId,
                formulaDisplay: 'RPD% = |A - B| / ((A + B) / 2) x 100',
                normalizedInputs: {
                    a: normalizeInput(parseCoreNumber(input.a, 'a'), input.unit),
                    b: normalizeInput(parseCoreNumber(input.b, 'b'), input.unit)
                },
                primaryResult: {
                    rpd: rpdValue,
                    mean,
                    status: criterionMax === null ? 'not_evaluated' : rpdValue <= criterionMax ? 'within_criterion' : 'outside_criterion'
                },
                steps: [{ label: 'calculate', expression: 'RPD% = |A - B| / ((A + B) / 2) x 100', value: rpdValue, unit: '%' }],
                warnings: ['criteria_defined_by_method']
            });
        }
        const out = legacy.spikeRecovery({
            unspiked: input.unspiked,
            spikedMeasured: input.spikedMeasured,
            added: input.added,
            criteriaMin: input.criteriaMin ?? '-1e99',
            criteriaMax: input.criteriaMax ?? '1e99'
        });
        const min = parseOptionalNumber(input.criteriaMin, 'criteria_min');
        const max = parseOptionalNumber(input.criteriaMax, 'criteria_max');
        const status = min === null && max === null
            ? 'not_evaluated'
            : out.recovery >= (min ?? -Infinity) && out.recovery <= (max ?? Infinity)
                ? 'within_criterion'
                : 'outside_criterion';
        return result({
            toolId: 'recovery-rpd',
            formulaId,
            formulaDisplay: 'Recovery% = ((Cspiked - Cunspiked) / Cadded) x 100',
            normalizedInputs: {
                unspiked: normalizeInput(parseCoreNumber(input.unspiked, 'unspiked'), input.unit),
                spikedMeasured: normalizeInput(parseCoreNumber(input.spikedMeasured, 'spiked'), input.unit),
                added: normalizeInput(parseCoreNumber(input.added, 'added'), input.unit)
            },
            primaryResult: { recovery: out.recovery, bias: out.bias, status },
            steps: [
                { label: 'subtract_unspiked', expression: 'Cspiked - Cunspiked', value: parseCoreNumber(input.spikedMeasured, 'spiked') - parseCoreNumber(input.unspiked, 'unspiked'), unit: input.unit },
                { label: 'calculate', expression: 'Recovery% = ((Cspiked - Cunspiked) / Cadded) x 100', value: out.recovery, unit: '%' }
            ],
            warnings: ['criteria_defined_by_method']
        });
    } catch (err) {
        return errorResult('recovery-rpd', formulaId, err);
    }
}

function calculateHardnessAlkalinity(input = {}) {
    const formulaId = `hardness-alkalinity.${input.mode || 'hardness'}.v1`;
    try {
        const mode = input.mode || 'hardness';
        if (mode === 'alkalinity') {
            const out = legacy.alkalinityTitration(input);
            return result({
                toolId: 'hardness-alkalinity',
                formulaId,
                formulaDisplay: 'Alkalinity as CaCO3 = (Acorrected x N x 50000) / sample_mL',
                normalizedInputs: {
                    correctedAcidVolume: normalizeInput(out.correctedVolume, 'mL'),
                    normality: normalizeInput(parseCoreNumber(input.acidNormality, 'normality'), 'eq/L'),
                    sampleVolume: normalizeInput(legacy.convertVolume(input.sampleVolume, input.sampleVolumeUnit || 'mL', 'mL'), 'mL')
                },
                primaryResult: { alkalinityAsCaCO3: out.alkalinity, meqPerL: out.alkalinity / 50.043 },
                steps: [
                    { label: 'blank_correction', expression: 'Acorrected = Vacid - Vblank', value: out.correctedVolume, unit: 'mL' },
                    { label: 'calculate', expression: '(Acorrected x N x 50000) / sample_mL', value: out.alkalinity, unit: 'mg/L as CaCO3' }
                ]
            });
        }
        if (mode === 'equivalents') {
            const meq = parseCoreNumber(input.meqPerL, 'meq');
            const value = meq * 50.043;
            return result({
                toolId: 'hardness-alkalinity',
                formulaId,
                formulaDisplay: 'mg/L as CaCO3 = meq/L x 50.043',
                normalizedInputs: { meqPerL: normalizeInput(meq, 'meq/L') },
                primaryResult: { asCaCO3: value, meqPerL: meq },
                steps: [{ label: 'calculate', expression: 'meq/L x 50.043', value, unit: 'mg/L as CaCO3' }]
            });
        }
        const out = legacy.hardnessFromCaMg(input);
        return result({
            toolId: 'hardness-alkalinity',
            formulaId,
            formulaDisplay: 'Hardness as CaCO3 = Ca x 2.497 + Mg x 4.118',
            normalizedInputs: {
                calcium: normalizeInput(parseCoreNumber(input.ca ?? 0, 'calcium'), 'mg/L'),
                magnesium: normalizeInput(parseCoreNumber(input.mg ?? 0, 'magnesium'), 'mg/L')
            },
            primaryResult: {
                totalHardnessAsCaCO3: out.totalHardness,
                calciumHardnessAsCaCO3: out.calciumHardness,
                magnesiumHardnessAsCaCO3: out.magnesiumHardness
            },
            steps: [
                { label: 'calcium_contribution', expression: 'Ca x 2.497', value: out.calciumHardness, unit: 'mg/L as CaCO3' },
                { label: 'magnesium_contribution', expression: 'Mg x 4.118', value: out.magnesiumHardness, unit: 'mg/L as CaCO3' },
                { label: 'sum', expression: 'CaCO3 hardness = calcium + magnesium contributions', value: out.totalHardness, unit: 'mg/L as CaCO3' }
            ]
        });
    } catch (err) {
        return errorResult('hardness-alkalinity', formulaId, err);
    }
}

function calculateChemicalSpecies(input = {}) {
    const formulaId = 'chemical-species-converter.mass-ratio.v1';
    try {
        const out = legacy.convertSpecies(input.value, input.fromSpecies, input.toSpecies);
        return result({
            toolId: 'chemical-species-converter',
            formulaId,
            formulaDisplay: 'target = source x MWtarget / MWsource',
            normalizedInputs: {
                value: normalizeInput(parseCoreNumber(input.value, 'value'), input.unit || 'mg/L'),
                fromSpecies: { value: 1, unit: input.fromSpecies },
                toSpecies: { value: 1, unit: input.toSpecies }
            },
            primaryResult: { value: out.value, unit: input.unit || 'mg/L', factor: out.factor, fromSpecies: out.from, toSpecies: out.to },
            steps: [{ label: 'calculate', expression: 'target = source x MWtarget / MWsource', value: out.value, unit: input.unit || 'mg/L' }],
            warnings: ['confirm_reported_chemical_form']
        });
    } catch (err) {
        return errorResult('chemical-species-converter', formulaId, err);
    }
}

function calculateAquaTool(toolId, input = {}) {
    if (toolId === 'molarity') return calculateMolarity(input);
    if (toolId === 'dilution') return calculateDilution(input);
    if (toolId === 'unit-converter') return calculateUnitConversion(input);
    if (toolId === 'rpm-rcf') return calculateRpmRcf(input);
    if (toolId === 'cfu-calculator') return calculateCfu(input);
    if (toolId === 'recovery-rpd') return calculateRecoveryRpd(input);
    if (toolId === 'hardness-alkalinity') return calculateHardnessAlkalinity(input);
    if (toolId === 'chemical-species-converter') return calculateChemicalSpecies(input);
    return errorResult(toolId, `${toolId}.unknown`, new Error('unknown_tool'));
}

export {
    calculationVersion,
    packageVersion,
    publicToolIds,
    parseCoreNumber,
    parseDilutionFraction,
    calculateAquaTool,
    calculateMolarity,
    calculateDilution,
    calculateUnitConversion,
    calculateRpmRcf,
    calculateCfu,
    calculateRecoveryRpd,
    calculateHardnessAlkalinity,
    calculateChemicalSpecies
};
