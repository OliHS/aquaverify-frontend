const module = { exports: {} };
const self = globalThis;
(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.AquaToolsCalc = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    const MASS_TO_G = { g: 1, mg: 1e-3, ug: 1e-6, 'µg': 1e-6, ng: 1e-9 };
    const VOLUME_TO_L = { L: 1, mL: 1e-3, uL: 1e-6, 'µL': 1e-6, nL: 1e-9 };
    const MOLES_TO_MOL = { mol: 1, mmol: 1e-3, umol: 1e-6, 'µmol': 1e-6, nmol: 1e-9 };
    const MOLAR_TO_M = { M: 1, mM: 1e-3, uM: 1e-6, 'µM': 1e-6, nM: 1e-9, pM: 1e-12 };
    const MASS_VOLUME_TO_G_L = {
        'g/L': 1,
        'mg/L': 1e-3,
        'µg/L': 1e-6,
        'ng/L': 1e-9,
        'g/mL': 1000,
        'mg/mL': 1,
        'µg/mL': 1e-3,
        'ng/mL': 1e-6,
        'g/µL': 1e6,
        'mg/µL': 1000,
        'µg/µL': 1,
        'ng/µL': 1e-3
    };
    const WATER_CONCENTRATION_TO_MG_L = {
        'mg/L': 1,
        'µg/L': 1e-3,
        'ng/L': 1e-6,
        'g/L': 1000,
        'g/m3': 1,
        'g/m³': 1,
        ppm: 1
    };
    const FLOW_TO_M3_DAY = {
        'm3/d': 1,
        'm³/d': 1,
        'm3/day': 1,
        'm³/day': 1,
        'L/d': 1e-3,
        'L/day': 1e-3,
        'm3/h': 24,
        'm³/h': 24,
        'L/h': 0.024,
        'L/min': 1.44,
        'L/s': 86.4
    };
    const ION_PRESETS = {
        Ca: { charge: 2, molecularWeight: 40.078 },
        Mg: { charge: 2, molecularWeight: 24.305 },
        Na: { charge: 1, molecularWeight: 22.9898 },
        K: { charge: 1, molecularWeight: 39.0983 },
        NH4: { charge: 1, molecularWeight: 18.0385 },
        Fe2: { charge: 2, molecularWeight: 55.845 },
        Fe3: { charge: 3, molecularWeight: 55.845 },
        Mn: { charge: 2, molecularWeight: 54.938 },
        HCO3: { charge: -1, molecularWeight: 61.0168 },
        CO3: { charge: -2, molecularWeight: 60.0089 },
        Cl: { charge: -1, molecularWeight: 35.453 },
        SO4: { charge: -2, molecularWeight: 96.06 },
        NO3: { charge: -1, molecularWeight: 62.0049 },
        NO2: { charge: -1, molecularWeight: 46.0055 },
        F: { charge: -1, molecularWeight: 18.9984 },
        PO4: { charge: -3, molecularWeight: 94.9714 }
    };
    const CACO3_FACTORS = {
        'mg/L as CaCO3': 1,
        'meq/L': 50.043,
        'Ca mg/L': 100.0869 / 40.078,
        'Mg mg/L': 100.0869 / 24.305,
        '°fH': 10,
        '°dH': 17.848,
        '°eH': 14.254,
        gpg: 17.118
    };
    const SPECIES_FORMS = {
        NO3: { group: 'N', mass: 14.0067 + (15.999 * 3) },
        'NO3-N': { group: 'N', mass: 14.0067 },
        NO2: { group: 'N', mass: 14.0067 + (15.999 * 2) },
        'NO2-N': { group: 'N', mass: 14.0067 },
        NH4: { group: 'N', mass: 14.0067 + (1.0079 * 4) },
        'NH4-N': { group: 'N', mass: 14.0067 },
        PO4: { group: 'P', mass: 30.9738 + (15.999 * 4) },
        'PO4-P': { group: 'P', mass: 30.9738 },
        SO4: { group: 'S', mass: 32.065 + (15.999 * 4) },
        'SO4-S': { group: 'S', mass: 32.065 },
        Ca: { group: 'CaCO3', mass: 40.078 },
        'Ca-CaCO3': { group: 'CaCO3', mass: 100.0869 },
        Mg: { group: 'MgCO3', mass: 24.305 },
        'Mg-CaCO3': { group: 'MgCO3', mass: 100.0869 }
    };

    function normalizeUnit(unit) {
        const raw = String(unit || '').trim().replace(/μ/g, 'µ');
        const aliases = {
            uL: 'µL',
            ul: 'µL',
            ug: 'µg',
            umol: 'µmol',
            uM: 'µM',
            'ug/L': 'µg/L',
            'ug/mL': 'µg/mL',
            'ug/uL': 'µg/µL',
            'ug/µL': 'µg/µL',
            'g/uL': 'g/µL',
            'mg/uL': 'mg/µL',
            'ng/uL': 'ng/µL',
            ppmv: 'ppm v/v',
            'ppm_vv': 'ppm v/v',
            'ppm v/v': 'ppm v/v'
        };
        return aliases[raw] || raw;
    }

    function parseNumber(value) {
        if (value === null || value === undefined || value === '') return null;
        if (typeof value === 'number') return Number.isFinite(value) ? value : null;
        const normalized = String(value).trim().replace(/\s+/g, '').replace(',', '.');
        if (!normalized) return null;
        const parsed = Number(normalized);
        return Number.isFinite(parsed) ? parsed : null;
    }

    function formatNumber(value, decimals = 3) {
        const parsed = Number(value);
        if (!Number.isFinite(parsed)) return '';
        const abs = Math.abs(parsed);
        if (abs > 0 && (abs >= 1e9 || abs < Math.pow(10, -Math.max(decimals, 1)))) {
            return parsed.toExponential(decimals).replace(/\.?0+e/, 'e');
        }
        const rounded = parsed.toFixed(decimals);
        return rounded.replace(/\.?0+$/, '');
    }

    function formatScientific(value, decimals = 3) {
        const parsed = Number(value);
        if (!Number.isFinite(parsed)) return '';
        return parsed.toExponential(decimals).replace(/\.?0+e/, 'e');
    }

    function formatWithUnit(value, unit = '', decimals = 3) {
        const text = formatNumber(value, decimals);
        return unit ? `${text} ${normalizeUnit(unit)}` : text;
    }

    function parseNumberList(value) {
        if (Array.isArray(value)) return value.map(parseNumber).filter(Number.isFinite);
        return String(value || '')
            .split(/[\n;, \t]+/)
            .map(parseNumber)
            .filter(Number.isFinite);
    }

    function mean(values = []) {
        const clean = values.map(parseNumber).filter(Number.isFinite);
        if (!clean.length) throw new Error('insufficient_data');
        return clean.reduce((sum, value) => sum + value, 0) / clean.length;
    }

    function median(values = []) {
        const clean = values.map(parseNumber).filter(Number.isFinite).sort((a, b) => a - b);
        if (!clean.length) throw new Error('insufficient_data');
        const mid = Math.floor(clean.length / 2);
        return clean.length % 2 ? clean[mid] : (clean[mid - 1] + clean[mid]) / 2;
    }

    function standardDeviation(values = [], sample = true) {
        const clean = values.map(parseNumber).filter(Number.isFinite);
        if (clean.length < (sample ? 2 : 1)) return 0;
        const avg = mean(clean);
        const divisor = sample ? clean.length - 1 : clean.length;
        return Math.sqrt(clean.reduce((sum, value) => sum + Math.pow(value - avg, 2), 0) / divisor);
    }

    function cv(values = []) {
        const avg = mean(values);
        return avg === 0 ? null : (standardDeviation(values) / avg) * 100;
    }

    function rsd(values = []) {
        return cv(values);
    }

    function rpd(a, b) {
        const first = parseNumber(a);
        const second = parseNumber(b);
        if (!Number.isFinite(first) || !Number.isFinite(second)) throw new Error('positive_required');
        const denominator = (Math.abs(first) + Math.abs(second)) / 2;
        if (denominator === 0) throw new Error('zero_denominator');
        return (Math.abs(first - second) / denominator) * 100;
    }

    function bias(measured, reference) {
        const measuredValue = parseNumber(measured);
        const referenceValue = parseNumber(reference);
        if (!Number.isFinite(measuredValue) || !Number.isFinite(referenceValue)) throw new Error('positive_required');
        if (referenceValue === 0) throw new Error('zero_denominator');
        return ((measuredValue - referenceValue) / referenceValue) * 100;
    }

    function zScore(value, target, sd) {
        const parsedValue = parseNumber(value);
        const parsedTarget = parseNumber(target);
        const parsedSd = parseNumber(sd);
        if (!Number.isFinite(parsedValue) || !Number.isFinite(parsedTarget)) throw new Error('positive_required');
        assertPositive(parsedSd, 'zero_denominator');
        return (parsedValue - parsedTarget) / parsedSd;
    }

    function linearRegression(points = []) {
        const clean = points
            .map((point) => ({ x: parseNumber(point.x), y: parseNumber(point.y) }))
            .filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y));
        if (clean.length < 2) throw new Error('insufficient_data');
        const xMean = mean(clean.map((point) => point.x));
        const yMean = mean(clean.map((point) => point.y));
        const denominator = clean.reduce((sum, point) => sum + Math.pow(point.x - xMean, 2), 0);
        if (denominator === 0) throw new Error('zero_denominator');
        const slope = clean.reduce((sum, point) => sum + ((point.x - xMean) * (point.y - yMean)), 0) / denominator;
        const intercept = yMean - slope * xMean;
        const predictions = clean.map((point) => ({ ...point, predicted: slope * point.x + intercept }));
        const sse = calculateSSE(predictions);
        return {
            slope,
            intercept,
            points: predictions,
            sse,
            rmse: calculateRMSE(predictions),
            r2: calculateR2(predictions),
            formula: 'y = m x + b'
        };
    }

    function calculateSSE(points = []) {
        return points.reduce((sum, point) => {
            const y = parseNumber(point.y);
            const predicted = parseNumber(point.predicted);
            return Number.isFinite(y) && Number.isFinite(predicted) ? sum + Math.pow(y - predicted, 2) : sum;
        }, 0);
    }

    function calculateRMSE(points = []) {
        const clean = points.filter((point) => Number.isFinite(parseNumber(point.y)) && Number.isFinite(parseNumber(point.predicted)));
        if (!clean.length) return 0;
        return Math.sqrt(calculateSSE(clean) / clean.length);
    }

    function calculateR2(points = []) {
        const clean = points.filter((point) => Number.isFinite(parseNumber(point.y)) && Number.isFinite(parseNumber(point.predicted)));
        if (!clean.length) return 0;
        const yValues = clean.map((point) => parseNumber(point.y));
        const avg = mean(yValues);
        const sst = yValues.reduce((sum, value) => sum + Math.pow(value - avg, 2), 0);
        const sse = calculateSSE(clean);
        return sst === 0 ? (sse === 0 ? 1 : 0) : 1 - (sse / sst);
    }

    function calculateAdjustedR2(r2Value, n, p) {
        const r2Parsed = parseNumber(r2Value);
        const nParsed = parseNumber(n);
        const pParsed = parseNumber(p);
        if (!Number.isFinite(r2Parsed) || !Number.isFinite(nParsed) || !Number.isFinite(pParsed) || nParsed <= pParsed + 1) return null;
        return 1 - (1 - r2Parsed) * (nParsed - 1) / (nParsed - pParsed - 1);
    }

    function calculateAIC(sse, n, parameterCount) {
        const sseParsed = Math.max(parseNumber(sse) || 0, 1e-12);
        const nParsed = Math.max(parseNumber(n) || 0, 1);
        const pParsed = parseNumber(parameterCount) || 0;
        return nParsed * Math.log(sseParsed / nParsed) + (2 * pParsed);
    }

    function assertPositive(value, code = 'positive_required') {
        if (value === null || value === undefined || !Number.isFinite(value)) throw new Error(code);
        if (value < 0) throw new Error('negative_not_allowed');
        if (value === 0) throw new Error(code);
    }

    function assertNonNegative(value, code = 'positive_required') {
        if (value === null || value === undefined || !Number.isFinite(value)) throw new Error(code);
        if (value < 0) throw new Error('negative_not_allowed');
    }

    function convertMass(value, fromUnit, toUnit = 'g', options = {}) {
        const parsed = parseNumber(value);
        if (options.allowZero) assertNonNegative(parsed);
        else assertPositive(parsed);
        const from = normalizeUnit(fromUnit);
        const to = normalizeUnit(toUnit);
        if (!MASS_TO_G[from] || !MASS_TO_G[to]) throw new Error('invalid_mass_unit');
        return (parsed * MASS_TO_G[from]) / MASS_TO_G[to];
    }

    function convertVolume(value, fromUnit, toUnit = 'L', options = {}) {
        const parsed = parseNumber(value);
        if (options.allowZero) assertNonNegative(parsed, 'volume_positive_required');
        else assertPositive(parsed, 'volume_positive_required');
        const from = normalizeUnit(fromUnit);
        const to = normalizeUnit(toUnit);
        if (!VOLUME_TO_L[from] || !VOLUME_TO_L[to]) throw new Error('invalid_volume_unit');
        return (parsed * VOLUME_TO_L[from]) / VOLUME_TO_L[to];
    }

    function convertMoles(value, fromUnit, toUnit = 'mol', options = {}) {
        const parsed = parseNumber(value);
        if (options.allowZero) assertNonNegative(parsed);
        else assertPositive(parsed);
        const from = normalizeUnit(fromUnit);
        const to = normalizeUnit(toUnit);
        if (!MOLES_TO_MOL[from] || !MOLES_TO_MOL[to]) throw new Error('invalid_moles_unit');
        return (parsed * MOLES_TO_MOL[from]) / MOLES_TO_MOL[to];
    }

    function convertMolarConcentration(value, fromUnit, toUnit = 'M', options = {}) {
        const parsed = parseNumber(value);
        if (options.allowZero) assertNonNegative(parsed, 'concentration_positive_required');
        else assertPositive(parsed, 'concentration_positive_required');
        const from = normalizeUnit(fromUnit);
        const to = normalizeUnit(toUnit);
        if (!MOLAR_TO_M[from] || !MOLAR_TO_M[to]) throw new Error('invalid_molar_unit');
        return (parsed * MOLAR_TO_M[from]) / MOLAR_TO_M[to];
    }

    function splitMassVolumeUnit(unit) {
        const normalized = normalizeUnit(unit);
        const parts = normalized.split('/');
        if (parts.length !== 2) return null;
        const mass = normalizeUnit(parts[0]);
        const volume = normalizeUnit(parts[1]);
        return { mass, volume };
    }

    function convertMassVolumeConcentration(value, fromUnit, toUnit = 'g/L', options = {}) {
        const parsed = parseNumber(value);
        if (options.allowZero) assertNonNegative(parsed, 'concentration_positive_required');
        else assertPositive(parsed, 'concentration_positive_required');
        const from = splitMassVolumeUnit(fromUnit);
        const to = splitMassVolumeUnit(toUnit);
        if (!from || !to) throw new Error('invalid_mass_volume_unit');
        const fromMass = normalizeUnit(from.mass);
        const toMass = normalizeUnit(to.mass);
        const fromVolume = normalizeUnit(from.volume);
        const toVolume = normalizeUnit(to.volume);
        if (!MASS_TO_G[fromMass] || !VOLUME_TO_L[fromVolume] || !MASS_TO_G[toMass] || !VOLUME_TO_L[toVolume]) {
            throw new Error('invalid_mass_volume_unit');
        }
        const gPerL = parsed * MASS_TO_G[fromMass] / VOLUME_TO_L[fromVolume];
        return gPerL / (MASS_TO_G[toMass] / VOLUME_TO_L[toVolume]);
    }

    function normalizeFactorUnit(unit) {
        return String(unit || '').toUpperCase() === 'X' ? 'X' : unit;
    }

    function convertFactor(value, fromUnit = 'X', toUnit = 'X') {
        const parsed = parseNumber(value);
        assertPositive(parsed, 'concentration_positive_required');
        if (normalizeFactorUnit(fromUnit) !== 'X' || normalizeFactorUnit(toUnit) !== 'X') throw new Error('invalid_factor_unit');
        return parsed;
    }

    function isPercentUnit(unit) {
        return ['% w/v', '% v/v', '% w/w'].includes(String(unit || ''));
    }

    function getConcentrationKind(unit) {
        const normalized = normalizeUnit(unit);
        if (MOLAR_TO_M[normalized]) return 'molar';
        if (splitMassVolumeUnit(normalized)) return 'massVolume';
        if (normalizeFactorUnit(normalized) === 'X') return 'factor';
        if (isPercentUnit(normalized)) return normalized;
        return 'unknown';
    }

    function convertConcentration(value, fromUnit) {
        const kind = getConcentrationKind(fromUnit);
        if (kind === 'molar') return { kind, value: convertMolarConcentration(value, fromUnit, 'M'), baseUnit: 'M' };
        if (kind === 'massVolume') return { kind, value: convertMassVolumeConcentration(value, fromUnit, 'g/L'), baseUnit: 'g/L' };
        if (kind === 'factor') return { kind, value: convertFactor(value), baseUnit: 'X' };
        if (isPercentUnit(fromUnit)) {
            const parsed = parseNumber(value);
            assertPositive(parsed, 'concentration_positive_required');
            return { kind, value: parsed, baseUnit: fromUnit };
        }
        throw new Error('incompatible_concentration_units');
    }

    function assertCompatibleConcentrations(a, b) {
        if (a.kind !== b.kind) throw new Error('incompatible_concentration_units');
        return true;
    }

    function autoFormatConcentration(molarValue) {
        const abs = Math.abs(molarValue);
        if (abs >= 0.1) return { value: molarValue, unit: 'M', text: `${formatNumber(molarValue)} M` };
        if (abs >= 1e-3) return { value: molarValue / 1e-3, unit: 'mM', text: `${formatNumber(molarValue / 1e-3)} mM` };
        if (abs >= 1e-6) return { value: molarValue / 1e-6, unit: 'µM', text: `${formatNumber(molarValue / 1e-6)} µM` };
        if (abs >= 1e-9) return { value: molarValue / 1e-9, unit: 'nM', text: `${formatNumber(molarValue / 1e-9)} nM` };
        return { value: molarValue / 1e-12, unit: 'pM', text: `${formatNumber(molarValue / 1e-12)} pM` };
    }

    function autoFormatVolume(liters) {
        const abs = Math.abs(liters);
        if (abs >= 1) return { value: liters, unit: 'L', text: `${formatNumber(liters)} L` };
        if (abs >= 1e-3) return { value: liters / 1e-3, unit: 'mL', text: `${formatNumber(liters / 1e-3)} mL` };
        if (abs >= 1e-6) return { value: liters / 1e-6, unit: 'µL', text: `${formatNumber(liters / 1e-6)} µL` };
        return { value: liters / 1e-9, unit: 'nL', text: `${formatNumber(liters / 1e-9)} nL` };
    }

    function autoFormatMass(grams) {
        const abs = Math.abs(grams);
        if (abs >= 1) return { value: grams, unit: 'g', text: `${formatNumber(grams)} g` };
        if (abs >= 1e-3) return { value: grams / 1e-3, unit: 'mg', text: `${formatNumber(grams / 1e-3)} mg` };
        if (abs >= 1e-6) return { value: grams / 1e-6, unit: 'µg', text: `${formatNumber(grams / 1e-6)} µg` };
        return { value: grams / 1e-9, unit: 'ng', text: `${formatNumber(grams / 1e-9)} ng` };
    }

    function autoFormatMoles(moles) {
        const abs = Math.abs(moles);
        if (abs >= 1) return { value: moles, unit: 'mol', text: `${formatNumber(moles)} mol` };
        if (abs >= 1e-3) return { value: moles / 1e-3, unit: 'mmol', text: `${formatNumber(moles / 1e-3)} mmol` };
        if (abs >= 1e-6) return { value: moles / 1e-6, unit: 'µmol', text: `${formatNumber(moles / 1e-6)} µmol` };
        return { value: moles / 1e-9, unit: 'nmol', text: `${formatNumber(moles / 1e-9)} nmol` };
    }

    function formatConcentrationValue(concentration) {
        if (concentration.kind === 'molar') return autoFormatConcentration(concentration.value).text;
        if (concentration.kind === 'massVolume') return `${formatNumber(concentration.value)} g/L`;
        if (concentration.kind === 'factor') return `${formatNumber(concentration.value)}X`;
        if (isPercentUnit(concentration.kind)) return `${formatNumber(concentration.value)} ${concentration.kind}`;
        return formatNumber(concentration.value);
    }

    function molarityFromMass({ mass, massUnit, molarMass, volume, volumeUnit }) {
        const g = convertMass(mass, massUnit, 'g');
        const mw = parseNumber(molarMass);
        assertPositive(mw, 'molar_mass_positive_required');
        const liters = convertVolume(volume, volumeUnit, 'L');
        const molar = g / (mw * liters);
        return {
            valueM: molar,
            result: autoFormatConcentration(molar),
            formula: 'M = m / (MW x V)'
        };
    }

    function molarityFromMoles({ moles, molesUnit, volume, volumeUnit }) {
        const mol = convertMoles(moles, molesUnit, 'mol');
        const liters = convertVolume(volume, volumeUnit, 'L');
        const molar = mol / liters;
        const primary = Math.abs(molar) >= 0.01
            ? { value: molar, unit: 'M', text: `${formatNumber(molar)} M` }
            : autoFormatConcentration(molar);
        return {
            valueM: molar,
            result: primary,
            equivalent: `${formatNumber(molar / 1e-3)} mM`,
            formula: 'M = n / V'
        };
    }

    function molarityFromMassVolume({ concentration, concentrationUnit, molarMass }) {
        const gPerL = convertMassVolumeConcentration(concentration, concentrationUnit, 'g/L');
        const mw = parseNumber(molarMass);
        assertPositive(mw, 'molar_mass_positive_required');
        const molar = gPerL / mw;
        return {
            valueM: molar,
            result: autoFormatConcentration(molar),
            formula: 'M = c / MW'
        };
    }

    function dilutionSimple({ c1, c1Unit, v1, v1Unit, c2, c2Unit, v2, v2Unit }) {
        const warnings = [];
        const raw = { c1: parseNumber(c1), v1: parseNumber(v1), c2: parseNumber(c2), v2: parseNumber(v2) };
        const provided = Object.entries(raw).filter(([, value]) => value !== null).map(([key]) => key);
        if (provided.length < 3) throw new Error('need_three_variables');

        let C1 = raw.c1 !== null ? convertConcentration(raw.c1, c1Unit) : null;
        let C2 = raw.c2 !== null ? convertConcentration(raw.c2, c2Unit) : null;
        let V1 = raw.v1 !== null ? convertVolume(raw.v1, v1Unit, 'L') : null;
        let V2 = raw.v2 !== null ? convertVolume(raw.v2, v2Unit, 'L') : null;

        if (C1 && C2) assertCompatibleConcentrations(C1, C2);
        const concentrationKind = C1?.kind || C2?.kind;

        if (provided.length === 3) {
            if (raw.c1 === null) C1 = { kind: concentrationKind, value: (C2.value * V2) / V1, baseUnit: C2.baseUnit };
            if (raw.v1 === null) V1 = (C2.value * V2) / C1.value;
            if (raw.c2 === null) C2 = { kind: concentrationKind, value: (C1.value * V1) / V2, baseUnit: C1.baseUnit };
            if (raw.v2 === null) V2 = (C1.value * V1) / C2.value;
        } else {
            const left = C1.value * V1;
            const right = C2.value * V2;
            const tolerance = Math.max(Math.abs(left), Math.abs(right), 1) * 1e-3;
            if (Math.abs(left - right) > tolerance) warnings.push('dilution_equality_mismatch');
        }

        if (C1 && C2 && C2.value > C1.value) warnings.push('target_greater_than_stock');
        const solvent = V2 !== null && V1 !== null ? Math.max(0, V2 - V1) : null;
        if (V1 !== null && V1 < 1e-6) warnings.push('difficult_to_pipette');

        return {
            solved: provided.length === 3 ? ['c1', 'v1', 'c2', 'v2'].find((key) => raw[key] === null) : 'check',
            c1: C1,
            c2: C2,
            v1: V1,
            v2: V2,
            solvent,
            formula: 'C1 x V1 = C2 x V2',
            warnings
        };
    }

    function dilutionReverse({ cStock, cStockUnit, vStock, vStockUnit, vSolvent, vSolventUnit }) {
        const C = convertConcentration(cStock, cStockUnit);
        const stockL = convertVolume(vStock, vStockUnit, 'L');
        const solventL = convertVolume(vSolvent, vSolventUnit, 'L');
        const finalL = stockL + solventL;
        const finalConcentration = { ...C, value: (C.value * stockL) / finalL };
        return {
            finalVolume: finalL,
            finalConcentration,
            formula: 'Cfinal = (Cstock x Vstock) / Vfinal'
        };
    }

    function serialDilution({ c0, c0Unit, factor, steps, transfer, transferUnit }) {
        const C0 = convertConcentration(c0, c0Unit);
        const dilutionFactor = parseNumber(factor);
        const stepCount = Number.parseInt(parseNumber(steps), 10);
        const transferL = convertVolume(transfer, transferUnit, 'L');
        assertPositive(dilutionFactor, 'factor_positive_required');
        if (dilutionFactor <= 1) throw new Error('factor_greater_than_one_required');
        assertPositive(stepCount, 'steps_positive_required');
        const finalVolumeL = transferL * dilutionFactor;
        const diluentPerStepL = transferL * (dilutionFactor - 1);
        const table = [];
        for (let i = 0; i <= stepCount; i += 1) {
            table.push({
                step: i,
                concentration: { ...C0, value: C0.value / Math.pow(dilutionFactor, i) }
            });
        }
        return {
            finalConcentration: table[table.length - 1].concentration,
            transfer: transferL,
            diluentPerStep: diluentPerStepL,
            finalVolumePerStep: finalVolumeL,
            totalDiluent: diluentPerStepL * stepCount,
            table,
            formula: 'Ci = C0 / F^i'
        };
    }

    function prepareSolution({ molarMass, concentration, concentrationUnit, volume, volumeUnit, purity = 100 }) {
        const mw = parseNumber(molarMass);
        const purityValue = parseNumber(purity) ?? 100;
        assertPositive(mw, 'molar_mass_positive_required');
        assertPositive(purityValue, 'purity_positive_required');
        const molar = convertMolarConcentration(concentration, concentrationUnit, 'M');
        const liters = convertVolume(volume, volumeUnit, 'L');
        const moles = molar * liters;
        const grams = (moles * mw) / (purityValue / 100);
        return {
            moles,
            mass: grams,
            volume: liters,
            formula: 'mass = M x V x MW / purity'
        };
    }

    function percentagePreparation({ mode, percentType, percent, finalVolume, finalVolumeUnit, finalMass, finalMassUnit, stockPercent, targetPercent }) {
        const pct = parseNumber(percent);
        if (mode === 'stock') {
            const stock = parseNumber(stockPercent);
            const target = parseNumber(targetPercent);
            assertPositive(stock, 'concentration_positive_required');
            assertPositive(target, 'concentration_positive_required');
            const finalL = convertVolume(finalVolume, finalVolumeUnit, 'L');
            if (target > stock) throw new Error('target_greater_than_stock');
            const stockL = (target * finalL) / stock;
            return {
                stockVolume: stockL,
                solvent: finalL - stockL,
                percentType,
                formula: 'C1 x V1 = C2 x V2'
            };
        }

        assertPositive(pct, 'percent_positive_required');
        if (percentType === '% w/w') {
            const massG = convertMass(finalMass, finalMassUnit, 'g');
            return {
                soluteMass: (pct * massG) / 100,
                percentType,
                formula: '% w/w = g solute / g final x 100'
            };
        }
        const volumeL = convertVolume(finalVolume, finalVolumeUnit, 'L');
        const volumeMl = volumeL / 1e-3;
        if (percentType === '% w/v') {
            return {
                soluteMass: (pct * volumeMl) / 100,
                finalVolume: volumeL,
                percentType,
                formula: '% w/v = g solute / mL final x 100'
            };
        }
        if (percentType === '% v/v') {
            return {
                soluteVolume: ((pct * volumeMl) / 100) * 1e-3,
                finalVolume: volumeL,
                percentType,
                formula: '% v/v = mL solute / mL final x 100'
            };
        }
        throw new Error('invalid_percent_unit');
    }

    function effectiveReactions({ reactions, overageMode = 'none', overageValue = 0, roundEffective = false }) {
        const n = parseNumber(reactions);
        assertPositive(n, 'reactions_positive_required');
        let effective = n;
        const overage = parseNumber(overageValue) || 0;
        if (overageMode === 'percent') effective = n * (1 + overage / 100);
        if (overageMode === 'reactions') effective = n + overage;
        return roundEffective ? Math.ceil(effective) : effective;
    }

    function calculateComponentVolume(row, finalVolumeL) {
        if (row.locked || row.type === 'fixed') return convertVolume(row.volume, row.volumeUnit, 'L');
        if (row.type === 'factor') {
            const stock = parseNumber(row.stock);
            const target = parseNumber(row.target);
            assertPositive(stock, 'concentration_positive_required');
            assertPositive(target, 'concentration_positive_required');
            if (target > stock) throw new Error('target_greater_than_stock');
            return (target / stock) * finalVolumeL;
        }
        if (row.type === 'percentage') {
            const stock = parseNumber(row.stock);
            const target = parseNumber(row.target);
            assertPositive(stock, 'concentration_positive_required');
            assertPositive(target, 'concentration_positive_required');
            if (target > stock) throw new Error('target_greater_than_stock');
            return (target / stock) * finalVolumeL;
        }
        const stockC = convertConcentration(row.stock, row.stockUnit);
        const targetC = convertConcentration(row.target, row.targetUnit);
        assertCompatibleConcentrations(stockC, targetC);
        if (targetC.value > stockC.value) throw new Error('target_greater_than_stock');
        return (targetC.value * finalVolumeL) / stockC.value;
    }

    function masterMix({ name, reactions, finalVolume, finalVolumeUnit, overageMode = 'none', overageValue = 0, roundEffective = false, components = [] }) {
        const n = parseNumber(reactions);
        assertPositive(n, 'reactions_positive_required');
        const effective = effectiveReactions({ reactions, overageMode, overageValue, roundEffective });
        const finalVolumeL = convertVolume(finalVolume, finalVolumeUnit, 'L');
        const warnings = [];
        const rows = components.map((component, index) => {
            const volumePerReaction = calculateComponentVolume(component, finalVolumeL);
            if (volumePerReaction < 0.1e-6) warnings.push('very_low_component_volume');
            const includeInMix = component.includeInMix !== false;
            return {
                id: component.id || `c${index + 1}`,
                name: component.name || '',
                type: component.type || 'concentration',
                volumePerReaction,
                includeInMix,
                note: component.note || '',
                totalVolume: volumePerReaction * (includeInMix ? effective : n)
            };
        });
        const usedPerReaction = rows.reduce((sum, row) => sum + row.volumePerReaction, 0);
        const waterPerReaction = finalVolumeL - usedPerReaction;
        if (waterPerReaction < -1e-12) throw new Error('components_exceed_final_volume');
        const waterRow = {
            id: 'water',
            name: 'water',
            type: 'water',
            volumePerReaction: Math.max(0, waterPerReaction),
            includeInMix: true,
            note: '',
            totalVolume: Math.max(0, waterPerReaction) * effective
        };
        const excludedPerReaction = rows
            .filter((row) => !row.includeInMix)
            .reduce((sum, row) => sum + row.volumePerReaction, 0);
        const includedRows = [...rows.filter((row) => row.includeInMix), waterRow];
        const totalMasterMix = includedRows.reduce((sum, row) => sum + row.totalVolume, 0);
        return {
            name: name || '',
            reactions: n,
            effectiveReactions: effective,
            finalVolume: finalVolumeL,
            rows: [...rows, waterRow],
            waterPerReaction: waterRow.volumePerReaction,
            waterTotal: waterRow.totalVolume,
            masterMixPerReaction: finalVolumeL - excludedPerReaction,
            totalMasterMix,
            formula: 'Vcomponent = (Cfinal x Vreaction) / Cstock',
            warnings
        };
    }

    function mediumRecipe({ name, finalVolume, finalVolumeUnit, components = [] }) {
        const finalL = convertVolume(finalVolume, finalVolumeUnit, 'L');
        const warnings = ['solvent_is_approximate'];
        const rows = components.map((component, index) => {
            const mode = component.mode || 'solid_molarity';
            let result = null;
            let liquidVolume = 0;
            if (mode === 'solid_molarity') {
                const mass = prepareSolution({
                    molarMass: component.molarMass,
                    concentration: component.target,
                    concentrationUnit: component.targetUnit,
                    volume: finalL,
                    volumeUnit: 'L',
                    purity: component.purity || 100
                }).mass;
                result = { kind: 'mass', value: mass };
            } else if (mode === 'stock_concentration') {
                const stockC = convertConcentration(component.stock, component.stockUnit);
                const targetC = convertConcentration(component.target, component.targetUnit);
                assertCompatibleConcentrations(stockC, targetC);
                const volume = (targetC.value * finalL) / stockC.value;
                result = { kind: 'volume', value: volume };
                liquidVolume = volume;
            } else if (mode === 'percent_wv') {
                const pct = parseNumber(component.target);
                assertPositive(pct, 'percent_positive_required');
                result = { kind: 'mass', value: (pct * (finalL / 1e-3)) / 100 };
            } else if (mode === 'percent_vv') {
                const pct = parseNumber(component.target);
                assertPositive(pct, 'percent_positive_required');
                const volume = ((pct * (finalL / 1e-3)) / 100) * 1e-3;
                result = { kind: 'volume', value: volume };
                liquidVolume = volume;
            } else if (mode === 'mass_fixed') {
                result = { kind: 'mass', value: convertMass(component.fixedMass, component.fixedMassUnit || 'g', 'g') };
            } else if (mode === 'volume_fixed') {
                const volume = convertVolume(component.fixedVolume, component.fixedVolumeUnit || 'mL', 'L');
                result = { kind: 'volume', value: volume };
                liquidVolume = volume;
            }
            return {
                id: component.id || `m${index + 1}`,
                name: component.name || '',
                mode,
                result,
                liquidVolume,
                note: component.note || ''
            };
        });
        const knownLiquidVolume = rows.reduce((sum, row) => sum + (row.liquidVolume || 0), 0);
        return {
            name: name || '',
            finalVolume: finalL,
            rows,
            knownLiquidVolume,
            solventApprox: Math.max(0, finalL - knownLiquidVolume),
            formula: 'Σ components -> Vfinal',
            warnings
        };
    }

    function bufferAcidBase(input) {
        const pH = parseNumber(input.pH);
        const pKa = parseNumber(input.pKa);
        const totalM = convertMolarConcentration(input.totalConcentration, input.totalConcentrationUnit, 'M');
        const finalL = convertVolume(input.finalVolume, input.finalVolumeUnit, 'L');
        assertPositive(totalM, 'concentration_positive_required');
        if (pH === null || pKa === null) throw new Error('ph_pka_required');
        const ratio = Math.pow(10, pH - pKa);
        const acidM = totalM / (1 + ratio);
        const baseM = (totalM * ratio) / (1 + ratio);
        const acidMoles = acidM * finalL;
        const baseMoles = baseM * finalL;

        function speciesResult(mode, moles, mw, purity, stock, stockUnit) {
            if (mode === 'stock') {
                const stockM = convertMolarConcentration(stock, stockUnit, 'M');
                return { kind: 'volume', value: moles / stockM };
            }
            const mwValue = parseNumber(mw);
            const purityValue = parseNumber(purity) || 100;
            assertPositive(mwValue, 'molar_mass_positive_required');
            return { kind: 'mass', value: (moles * mwValue) / (purityValue / 100) };
        }

        return {
            ratio,
            acidConcentration: acidM,
            baseConcentration: baseM,
            acidMoles,
            baseMoles,
            acid: speciesResult(input.acidMode || 'solid', acidMoles, input.acidMolarMass, input.acidPurity, input.acidStock, input.acidStockUnit),
            base: speciesResult(input.baseMode || 'solid', baseMoles, input.baseMolarMass, input.basePurity, input.baseStock, input.baseStockUnit),
            formula: 'pH = pKa + log10([A-] / [HA])',
            warnings: ['buffer_theoretical_warning']
        };
    }

    function diluteStock({ stock, stockUnit, target, targetUnit, finalVolume, finalVolumeUnit }) {
        const stockC = convertConcentration(stock, stockUnit);
        const targetC = convertConcentration(target, targetUnit);
        assertCompatibleConcentrations(stockC, targetC);
        if (targetC.value > stockC.value) throw new Error('target_greater_than_stock');
        const finalL = convertVolume(finalVolume, finalVolumeUnit, 'L');
        const stockVolume = (targetC.value * finalL) / stockC.value;
        return {
            stockVolume,
            solvent: finalL - stockVolume,
            finalVolume: finalL,
            formula: 'Vstock = (Cfinal x Vfinal) / Cstock'
        };
    }

    function convertUnitValue(value, fromUnit, toUnit, factors, invalidCode) {
        const parsed = parseNumber(value);
        assertNonNegative(parsed);
        const from = normalizeUnit(fromUnit);
        const to = normalizeUnit(toUnit);
        if (!factors[from] || !factors[to]) throw new Error(invalidCode);
        return (parsed * factors[from]) / factors[to];
    }

    function volumeEquivalences(value, unit) {
        const liters = convertVolume(value, unit, 'L', { allowZero: true });
        return ['nL', 'µL', 'mL', 'L'].map((targetUnit) => ({
            unit: targetUnit,
            value: liters / VOLUME_TO_L[targetUnit],
            text: `${formatNumber(liters / VOLUME_TO_L[targetUnit], 6)} ${targetUnit}`
        }));
    }

    function massEquivalences(value, unit) {
        const grams = convertMass(value, unit, 'g', { allowZero: true });
        return ['ng', 'µg', 'mg', 'g'].map((targetUnit) => ({
            unit: targetUnit,
            value: grams / MASS_TO_G[targetUnit],
            text: `${formatNumber(grams / MASS_TO_G[targetUnit], 6)} ${targetUnit}`
        }));
    }

    function convertConcentrationBetween(value, fromUnit, toUnit, options = {}) {
        const parsed = parseNumber(value);
        assertNonNegative(parsed, 'concentration_positive_required');
        const from = normalizeUnit(fromUnit);
        const to = normalizeUnit(toUnit);
        const fromKind = getConcentrationKind(from);
        const toKind = getConcentrationKind(to);
        const mw = parseNumber(options.molarMass);

        if (fromKind === 'massVolume' && toKind === 'massVolume') {
            return convertMassVolumeConcentration(parsed, from, to, { allowZero: true });
        }
        if (fromKind === 'molar' && toKind === 'molar') {
            return convertMolarConcentration(parsed, from, to, { allowZero: true });
        }
        if ((fromKind === 'massVolume' && toKind === 'molar') || (fromKind === 'molar' && toKind === 'massVolume')) {
            assertPositive(mw, 'molar_mass_positive_required');
            if (fromKind === 'massVolume') {
                const gPerL = convertMassVolumeConcentration(parsed, from, 'g/L', { allowZero: true });
                const molar = gPerL / mw;
                return molar / MOLAR_TO_M[to];
            }
            const molar = convertMolarConcentration(parsed, from, 'M', { allowZero: true });
            const gPerL = molar * mw;
            return gPerL / MASS_VOLUME_TO_G_L[to];
        }
        throw new Error('incompatible_concentration_units');
    }

    function concentrationEquivalences(value, unit, options = {}) {
        const from = normalizeUnit(unit);
        const kind = getConcentrationKind(from);
        const units = kind === 'molar'
            ? ['M', 'mM', 'µM', 'nM', 'pM']
            : ['g/L', 'mg/L', 'µg/L', 'ng/L', 'g/mL', 'mg/mL', 'µg/mL', 'ng/mL', 'g/µL', 'mg/µL', 'µg/µL', 'ng/µL'];
        return units.map((targetUnit) => {
            const converted = convertConcentrationBetween(value, from, targetUnit, options);
            return { unit: targetUnit, value: converted, text: `${formatNumber(converted, 6)} ${targetUnit}` };
        });
    }

    function convertPercentPpm(value, fromUnit, toUnit, options = {}) {
        const parsed = parseNumber(value);
        assertNonNegative(parsed, 'percent_positive_required');
        const from = normalizeUnit(fromUnit);
        const to = normalizeUnit(toUnit);
        const densityInput = parseNumber(options.density);
        const density = densityInput || 1;
        if (density <= 0) throw new Error('density_positive_required');
        const warnings = ['ppm_aqueous_warning'];
        if (!densityInput && (from === '% v/v' || to === '% v/v' || from === 'ppm v/v' || to === 'ppm v/v')) {
            warnings.push('density_approximation_warning');
        }

        function toMgL(unit, amount) {
            if (unit === 'ppm') return amount;
            if (unit === '% w/v') return amount * 10000;
            if (unit === '% v/v') return amount * 10000 * density;
            if (unit === 'ppm v/v') return amount * density;
            throw new Error('invalid_percent_unit');
        }

        function fromMgL(unit, amount) {
            if (unit === 'ppm') return amount;
            if (unit === '% w/v') return amount / 10000;
            if (unit === '% v/v') return amount / (10000 * density);
            if (unit === 'ppm v/v') return amount / density;
            throw new Error('invalid_percent_unit');
        }

        const mgL = toMgL(from, parsed);
        return {
            value: fromMgL(to, mgL),
            formula: '% w/v -> mg/L; % v/v -> ppm x rho',
            warnings: Array.from(new Set(warnings)),
            approximate: true
        };
    }

    function percentPpmEquivalences(value, unit, options = {}) {
        return ['% w/v', '% v/v', 'ppm', 'ppm v/v'].map((targetUnit) => {
            const converted = convertPercentPpm(value, unit, targetUnit, options);
            return { unit: targetUnit, value: converted.value, text: `${formatNumber(converted.value, 6)} ${targetUnit}` };
        });
    }

    function convertTemperature(value, fromUnit, toUnit) {
        const parsed = parseNumber(value);
        if (parsed === null) throw new Error('positive_required');
        const from = normalizeUnit(fromUnit);
        const to = normalizeUnit(toUnit);
        if (from === 'K' && parsed < 0) throw new Error('temperature_below_absolute_zero');
        if (from === '°C' && parsed < -273.15) throw new Error('temperature_below_absolute_zero');
        if (from === '°F' && parsed < -459.67) throw new Error('temperature_below_absolute_zero');
        let celsius = parsed;
        if (from === '°F') celsius = (parsed - 32) * 5 / 9;
        if (from === 'K') celsius = parsed - 273.15;
        if (!['°C', '°F', 'K'].includes(from) || !['°C', '°F', 'K'].includes(to)) throw new Error('invalid_temperature_unit');
        if (to === '°F') return celsius * 9 / 5 + 32;
        if (to === 'K') return celsius + 273.15;
        return celsius;
    }

    function temperatureEquivalences(value, unit) {
        return ['°C', '°F', 'K'].map((targetUnit) => {
            const converted = convertTemperature(value, unit, targetUnit);
            return { unit: targetUnit, value: converted, text: `${formatNumber(converted, 3)} ${targetUnit}` };
        });
    }

    function rpmToRcf(rpm, radiusCm) {
        const rpmValue = parseNumber(rpm);
        const radius = parseNumber(radiusCm);
        assertNonNegative(rpmValue, 'rpm_positive_required');
        assertPositive(radius, 'radius_positive_required');
        return 1.118e-5 * radius * Math.pow(rpmValue, 2);
    }

    function rcfToRpm(rcf, radiusCm) {
        const rcfValue = parseNumber(rcf);
        const radius = parseNumber(radiusCm);
        assertNonNegative(rcfValue, 'rcf_positive_required');
        assertPositive(radius, 'radius_positive_required');
        return Math.sqrt(rcfValue / (1.118e-5 * radius));
    }

    function centrifugeEquivalences({ mode, value, radiusCm, presets = [] }) {
        return presets.map((preset) => {
            const calculated = mode === 'rpm_to_rcf' ? rpmToRcf(value, preset.radiusCm) : rcfToRpm(value, preset.radiusCm);
            return {
                label: preset.label || preset.key || '',
                radiusCm: preset.radiusCm,
                value: calculated
            };
        });
    }

    function cleanPoints(points = []) {
        return points
            .filter((point) => point && point.use !== false)
            .map((point, index) => ({
                id: point.id || `p${index + 1}`,
                label: point.label || point.name || `P${index + 1}`,
                x: parseNumber(point.x),
                y: parseNumber(point.y),
                notes: point.notes || ''
            }))
            .filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y));
    }

    function calculateFitMetrics(points, model, parameterCount) {
        const used = cleanPoints(points);
        const n = used.length;
        const yMean = used.reduce((sum, point) => sum + point.y, 0) / Math.max(n, 1);
        const residuals = used.map((point) => {
            const predicted = predictY(model, point.x);
            const residual = point.y - predicted;
            return {
                ...point,
                predicted,
                residual,
                residualPercent: point.y !== 0 ? (residual / point.y) * 100 : null
            };
        });
        const sse = residuals.reduce((sum, row) => sum + Math.pow(row.residual, 2), 0);
        const sst = used.reduce((sum, point) => sum + Math.pow(point.y - yMean, 2), 0);
        const r2 = sst === 0 ? (sse === 0 ? 1 : 0) : 1 - (sse / sst);
        const rmse = Math.sqrt(sse / Math.max(n, 1));
        const adjustedR2 = n > parameterCount + 1
            ? 1 - (1 - r2) * (n - 1) / (n - parameterCount - 1)
            : null;
        const safeSse = Math.max(sse, 1e-12);
        const aic = n * Math.log(safeSse / Math.max(n, 1)) + (2 * parameterCount);
        return { r2, adjustedR2, rmse, sse, aic, n, p: parameterCount, residuals };
    }

    function withMetrics(model, points, parameterCount) {
        const metrics = calculateFitMetrics(points, model, parameterCount);
        const warnings = [...(model.warnings || [])];
        if (metrics.n < 5) warnings.push('calibration_warning_few_standards');
        if (metrics.rmse > 0) {
            metrics.residuals.forEach((row) => {
                if (Math.abs(row.residual) > metrics.rmse * 2.5) warnings.push('calibration_warning_outlier');
            });
        }
        return {
            ...model,
            valid: true,
            warnings: Array.from(new Set(warnings)),
            errors: [],
            metrics
        };
    }

    function fitLinear(points, options = {}) {
        const used = cleanPoints(points);
        if (used.length < 2) throw new Error('calibration_insufficient_linear');
        const forceZero = Boolean(options.forceZero);
        const n = used.length;
        let slope;
        let intercept;
        if (forceZero) {
            const denominator = used.reduce((sum, point) => sum + point.x * point.x, 0);
            if (denominator === 0) throw new Error('calibration_invalid_parameters');
            slope = used.reduce((sum, point) => sum + point.x * point.y, 0) / denominator;
            intercept = 0;
        } else {
            const xMean = used.reduce((sum, point) => sum + point.x, 0) / n;
            const yMean = used.reduce((sum, point) => sum + point.y, 0) / n;
            const denominator = used.reduce((sum, point) => sum + Math.pow(point.x - xMean, 2), 0);
            if (denominator === 0) throw new Error('calibration_invalid_parameters');
            slope = used.reduce((sum, point) => sum + ((point.x - xMean) * (point.y - yMean)), 0) / denominator;
            intercept = yMean - slope * xMean;
        }
        if (!Number.isFinite(slope) || slope === 0) throw new Error('calibration_invalid_parameters');
        return withMetrics({
            type: forceZero ? 'linear_zero' : 'linear',
            equation: forceZero ? 'y = m x' : 'y = m x + b',
            params: { m: slope, b: intercept }
        }, used, forceZero ? 1 : 2);
    }

    function fitExponential(points) {
        const used = cleanPoints(points);
        if (used.length < 2) throw new Error('calibration_insufficient_exponential');
        if (used.some((point) => point.y <= 0)) throw new Error('calibration_requires_positive_y');
        const logPoints = used.map((point) => ({ ...point, y: Math.log(point.y) }));
        const logModel = fitLinear(logPoints);
        const a = Math.exp(logModel.params.b);
        const b = logModel.params.m;
        if (!Number.isFinite(a) || a <= 0 || !Number.isFinite(b) || b === 0) throw new Error('calibration_invalid_parameters');
        return withMetrics({
            type: 'exponential',
            equation: 'y = a e^(b x)',
            params: { a, b },
            warnings: ['calibration_warning_log_fit']
        }, used, 2);
    }

    function hill4plY(params, x) {
        if (x <= 0) return NaN;
        const ec50 = Math.exp(params.logEc50);
        const power = Math.pow(ec50 / x, params.hillSlope);
        return params.bottom + ((params.top - params.bottom) / (1 + power));
    }

    function hillSse(points, params) {
        if (!Number.isFinite(params.bottom) || !Number.isFinite(params.top) || !Number.isFinite(params.logEc50) || !Number.isFinite(params.hillSlope)) return Infinity;
        if (Math.abs(params.hillSlope) < 1e-8) return Infinity;
        return points.reduce((sum, point) => {
            const predicted = hill4plY(params, point.x);
            if (!Number.isFinite(predicted)) return Infinity;
            return sum + Math.pow(point.y - predicted, 2);
        }, 0);
    }

    function optimizeHillSeed(points, seed) {
        let current = { ...seed };
        let best = hillSse(points, current);
        const yValues = points.map((point) => point.y);
        const yRange = Math.max(...yValues) - Math.min(...yValues) || 1;
        const steps = { bottom: yRange / 2, top: yRange / 2, logEc50: 1, hillSlope: 0.75 };
        const keys = Object.keys(steps);
        for (let iteration = 0; iteration < 650; iteration += 1) {
            let improved = false;
            keys.forEach((key) => {
                [1, -1].forEach((direction) => {
                    const candidate = { ...current, [key]: current[key] + (steps[key] * direction) };
                    const sse = hillSse(points, candidate);
                    if (sse < best) {
                        current = candidate;
                        best = sse;
                        improved = true;
                    }
                });
            });
            if (!improved) {
                keys.forEach((key) => { steps[key] *= 0.7; });
            }
            if (Math.max(...Object.values(steps)) < 1e-8) break;
        }
        return { params: current, sse: best };
    }

    function fitHill4PL(points) {
        const used = cleanPoints(points).filter((point) => point.x > 0);
        if (used.length < 4) throw new Error('calibration_insufficient_hill');
        const sortedX = used.map((point) => point.x).sort((a, b) => a - b);
        const yValues = used.map((point) => point.y);
        const minY = Math.min(...yValues);
        const maxY = Math.max(...yValues);
        const medianX = sortedX[Math.floor(sortedX.length / 2)] || sortedX[0];
        const seeds = [
            { bottom: minY, top: maxY, logEc50: Math.log(medianX), hillSlope: 1 },
            { bottom: minY, top: maxY, logEc50: Math.log(medianX), hillSlope: -1 },
            { bottom: maxY, top: minY, logEc50: Math.log(medianX), hillSlope: 1 },
            { bottom: maxY, top: minY, logEc50: Math.log(medianX), hillSlope: -1 }
        ];
        const best = seeds.map((seed) => optimizeHillSeed(used, seed)).sort((a, b) => a.sse - b.sse)[0];
        if (!best || !Number.isFinite(best.sse)) throw new Error('calibration_hill_no_converge');
        const params = {
            Bottom: best.params.bottom,
            Top: best.params.top,
            EC50: Math.exp(best.params.logEc50),
            HillSlope: best.params.hillSlope
        };
        if (!Object.values(params).every(Number.isFinite) || params.EC50 <= 0) throw new Error('calibration_invalid_parameters');
        return withMetrics({
            type: 'hill_4pl',
            equation: 'y = Bottom + (Top - Bottom) / (1 + (EC50 / x)^HillSlope)',
            params
        }, used, 4);
    }

    function predictY(model, x) {
        const value = parseNumber(x);
        if (!model || !Number.isFinite(value)) return NaN;
        if (model.type === 'linear' || model.type === 'linear_zero') {
            return model.params.m * value + model.params.b;
        }
        if (model.type === 'exponential') {
            return model.params.a * Math.exp(model.params.b * value);
        }
        if (model.type === 'hill_4pl') {
            return model.params.Bottom + ((model.params.Top - model.params.Bottom) / (1 + Math.pow(model.params.EC50 / value, model.params.HillSlope)));
        }
        return NaN;
    }

    function inversePredictX(model, y) {
        const value = parseNumber(y);
        if (!model || !Number.isFinite(value)) throw new Error('calibration_unknown_invalid_y');
        if (model.type === 'linear' || model.type === 'linear_zero') {
            if (model.params.m === 0) throw new Error('calibration_invalid_parameters');
            return (value - model.params.b) / model.params.m;
        }
        if (model.type === 'exponential') {
            if (value <= 0 || model.params.a <= 0 || model.params.b === 0) throw new Error('calibration_requires_positive_y');
            return Math.log(value / model.params.a) / model.params.b;
        }
        if (model.type === 'hill_4pl') {
            const bottom = model.params.Bottom;
            const top = model.params.Top;
            const min = Math.min(bottom, top);
            const max = Math.max(bottom, top);
            if (value <= min || value >= max) throw new Error('calibration_hill_signal_outside');
            const ratio = (value - bottom) / (top - value);
            if (ratio <= 0 || !Number.isFinite(ratio) || model.params.HillSlope === 0) throw new Error('calibration_invalid_parameters');
            const x = model.params.EC50 * Math.pow(ratio, 1 / model.params.HillSlope);
            if (!Number.isFinite(x) || x <= 0) throw new Error('calibration_invalid_parameters');
            return x;
        }
        throw new Error('calibration_invalid_model');
    }

    function calculateResiduals(points, model) {
        return calculateFitMetrics(points, model, model.metrics?.p || 1).residuals;
    }

    function fitCalibrationModel(points, options = {}) {
        const type = options.modelType || 'linear';
        if (type === 'linear_zero') return fitLinear(points, { forceZero: true });
        if (type === 'exponential') return fitExponential(points);
        if (type === 'hill_4pl') return fitHill4PL(points);
        return fitLinear(points, { forceZero: false });
    }

    function compareModels(points) {
        const attempts = [
            ['linear', () => fitLinear(points)],
            ['linear_zero', () => fitLinear(points, { forceZero: true })],
            ['exponential', () => fitExponential(points)],
            ['hill_4pl', () => fitHill4PL(points)]
        ].map(([type, fit]) => {
            try {
                return fit();
            } catch (error) {
                return {
                    type,
                    equation: '',
                    params: {},
                    valid: false,
                    warnings: [],
                    errors: [error.message || 'calibration_model_error'],
                    metrics: { n: cleanPoints(points).length, p: 0 }
                };
            }
        });
        const valid = attempts.filter((model) => model.valid && Number.isFinite(model.metrics?.aic));
        const recommended = valid.sort((a, b) => a.metrics.aic - b.metrics.aic)[0] || null;
        return { models: attempts, recommendedType: recommended?.type || null };
    }

    function calculateUnknowns(unknowns = [], model, standards = []) {
        const usedStandards = cleanPoints(standards);
        const xValues = usedStandards.map((point) => point.x);
        const yValues = usedStandards.map((point) => point.y);
        const minX = Math.min(...xValues);
        const maxX = Math.max(...xValues);
        const minY = Math.min(...yValues);
        const maxY = Math.max(...yValues);
        return unknowns.filter((row) => row && row.use !== false).map((row, index) => {
            const y = parseNumber(row.y);
            const dilutionFactor = parseNumber(row.dilutionFactor) ?? 1;
            const output = {
                id: row.id || `u${index + 1}`,
                name: row.name || `U${index + 1}`,
                y,
                dilutionFactor,
                notes: row.notes || '',
                calculatedX: null,
                correctedX: null,
                status: 'ok',
                warnings: []
            };
            try {
                if (!Number.isFinite(y)) throw new Error('calibration_unknown_invalid_y');
                assertPositive(dilutionFactor, 'dilution_factor_positive_required');
                const x = inversePredictX(model, y);
                output.calculatedX = x;
                output.correctedX = x * dilutionFactor;
                if (dilutionFactor < 1) output.warnings.push('calibration_warning_dilution_below_one');
                if (y < minY || y > maxY) {
                    output.status = 'extrapolated';
                    output.warnings.push('calibration_warning_extrapolated');
                }
                if (x < minX || x > maxX) {
                    output.status = output.status === 'ok' ? 'out_of_range' : output.status;
                    output.warnings.push('calibration_warning_out_of_range');
                }
                if (x < 0) output.warnings.push('calibration_warning_negative_x');
            } catch (error) {
                output.status = 'error';
                output.warnings.push(error.message || 'calibration_unknown_error');
            }
            return output;
        });
    }

    function parseCalibrationPaste(text) {
        return String(text || '').split(/\r?\n/)
            .map((line) => line.trim())
            .filter(Boolean)
            .flatMap((line, rowIndex) => {
                const separator = line.includes('\t') ? '\t'
                    : line.includes(';') ? ';'
                        : line.includes(',') ? ','
                            : /\s{2,}/.test(line) ? /\s{2,}/
                                : /\s+/;
                const parts = line.split(separator).map((part) => part.trim()).filter(Boolean);
                if (parts.length < 2) return [];
                const x = parseNumber(parts[0]);
                if (!Number.isFinite(x)) return [];
                return parts.slice(1).map((part, index) => ({
                    id: `pasted-${Date.now()}-${rowIndex}-${index}`,
                    label: parts.length > 2 ? `${parts[0]} R${index + 1}` : `${parts[0]}`,
                    x,
                    y: parseNumber(part),
                    use: true,
                    replicateGroup: String(x),
                    notes: ''
                })).filter((point) => Number.isFinite(point.y));
            });
    }

    function groupReplicates(points = []) {
        const groups = new Map();
        cleanPoints(points).forEach((point) => {
            const key = String(point.x);
            if (!groups.has(key)) groups.set(key, []);
            groups.get(key).push(point);
        });
        return Array.from(groups.entries()).map(([x, rows]) => {
            const values = rows.map((row) => row.y);
            const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
            const variance = values.length > 1
                ? values.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / (values.length - 1)
                : 0;
            const sd = Math.sqrt(variance);
            return {
                x: parseNumber(x),
                n: values.length,
                mean,
                sd,
                cv: mean !== 0 ? (sd / mean) * 100 : null
            };
        });
    }

    function exportCalibrationCsv(data = {}, labels = {}) {
        const label = (key) => labels[key] || key;
        const rows = [
            [label('calibration_section_config')],
            [label('field_curve_name'), data.config?.curveName || ''],
            [label('field_analyte'), data.config?.analyte || ''],
            [label('field_x_unit'), data.config?.xUnit || ''],
            [label('field_y_signal'), data.config?.ySignal || ''],
            [],
            [label('calibration_section_standards')],
            [label('field_standard'), label('field_x_value'), label('field_y_value'), label('field_used'), label('field_note')],
            ...(data.standards || []).map((point) => [point.label || '', point.x ?? '', point.y ?? '', point.use === false ? label('common_no') : label('common_yes'), point.notes || '']),
            [],
            [label('calibration_section_model')],
            [label('field_model'), data.model?.type || ''],
            [label('formula'), data.model?.equation || ''],
            ...Object.entries(data.model?.params || {}).map(([key, value]) => [key, formatNumber(value, 6)]),
            [label('result_r2'), formatNumber(data.model?.metrics?.r2, 6)],
            [label('result_rmse'), formatNumber(data.model?.metrics?.rmse, 6)],
            [label('result_aic'), formatNumber(data.model?.metrics?.aic, 6)],
            [],
            [label('calibration_section_unknowns')],
            [label('field_sample'), label('field_y_value'), label('result_interpolated_concentration'), label('field_dilution_factor'), label('result_corrected_concentration'), label('field_status')],
            ...(data.unknowns || []).map((row) => [row.name || '', row.y ?? '', row.calculatedX ?? '', row.dilutionFactor ?? '', row.correctedX ?? '', row.status || ''])
        ];
        return rows.map((row) => row.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
    }

    function generateCalibrationSvg(data = {}, labels = {}) {
        const standards = data.standards || [];
        const used = standards.filter((point) => point.use !== false && Number.isFinite(parseNumber(point.x)) && Number.isFinite(parseNumber(point.y)));
        const excluded = standards.filter((point) => point.use === false && Number.isFinite(parseNumber(point.x)) && Number.isFinite(parseNumber(point.y)));
        const unknowns = data.unknowns || [];
        const model = data.model;
        const label = (key) => labels[key] || key;
        const width = 720;
        const height = 420;
        const pad = { left: 66, right: 26, top: 28, bottom: 58 };
        const allX = [
            ...used.map((point) => parseNumber(point.x)),
            ...unknowns.map((row) => row.calculatedX).filter(Number.isFinite)
        ];
        const allY = [
            ...used.map((point) => parseNumber(point.y)),
            ...excluded.map((point) => parseNumber(point.y)),
            ...unknowns.map((row) => row.y).filter(Number.isFinite)
        ];
        if (!allX.length || !allY.length || !model?.valid) return '';
        let minX = Math.min(...allX);
        let maxX = Math.max(...allX);
        let minY = Math.min(...allY);
        let maxY = Math.max(...allY);
        if (minX === maxX) { minX -= 1; maxX += 1; }
        if (minY === maxY) { minY -= 1; maxY += 1; }
        const xMargin = (maxX - minX) * 0.08;
        const yMargin = (maxY - minY) * 0.12;
        minX -= xMargin;
        maxX += xMargin;
        minY -= yMargin;
        maxY += yMargin;
        const scaleX = (x) => pad.left + ((x - minX) / (maxX - minX)) * (width - pad.left - pad.right);
        const scaleY = (y) => height - pad.bottom - ((y - minY) / (maxY - minY)) * (height - pad.top - pad.bottom);
        const curve = [];
        for (let i = 0; i <= 160; i += 1) {
            const x = minX + ((maxX - minX) * i / 160);
            if (model.type === 'hill_4pl' && x <= 0) continue;
            const y = predictY(model, x);
            if (Number.isFinite(y)) curve.push(`${i === 0 || !curve.length ? 'M' : 'L'} ${formatNumber(scaleX(x), 3)} ${formatNumber(scaleY(y), 3)}`);
        }
        const circles = used.map((point) => `<circle cx="${formatNumber(scaleX(parseNumber(point.x)), 3)}" cy="${formatNumber(scaleY(parseNumber(point.y)), 3)}" r="5" fill="#0891b2"><title>${escapeXml(point.label || '')}: ${formatNumber(point.x, 6)}, ${formatNumber(point.y, 6)}</title></circle>`).join('');
        const excludedCircles = excluded.map((point) => `<circle cx="${formatNumber(scaleX(parseNumber(point.x)), 3)}" cy="${formatNumber(scaleY(parseNumber(point.y)), 3)}" r="5" fill="#cbd5e1" stroke="#64748b" stroke-dasharray="3 2"><title>${escapeXml(point.label || '')}: ${formatNumber(point.x, 6)}, ${formatNumber(point.y, 6)}</title></circle>`).join('');
        const unknownMarks = unknowns.filter((row) => Number.isFinite(row.calculatedX) && Number.isFinite(row.y)).map((row) => {
            const x = scaleX(row.calculatedX);
            const y = scaleY(row.y);
            return `<g><line x1="${pad.left}" y1="${formatNumber(y, 3)}" x2="${formatNumber(x, 3)}" y2="${formatNumber(y, 3)}" stroke="#f59e0b" stroke-dasharray="5 4"/><line x1="${formatNumber(x, 3)}" y1="${formatNumber(y, 3)}" x2="${formatNumber(x, 3)}" y2="${height - pad.bottom}" stroke="#f59e0b" stroke-dasharray="5 4"/><rect x="${formatNumber(x - 5, 3)}" y="${formatNumber(y - 5, 3)}" width="10" height="10" fill="#f59e0b" transform="rotate(45 ${formatNumber(x, 3)} ${formatNumber(y, 3)})"><title>${escapeXml(row.name || '')}: ${formatNumber(row.calculatedX, 6)}</title></rect></g>`;
        }).join('');
        const xAxis = `${data.config?.xAxis || label('field_x_axis')}${data.config?.xUnit ? ` (${data.config.xUnit})` : ''}`;
        const yAxis = `${data.config?.yAxis || label('field_y_axis')}${data.config?.ySignal ? ` (${data.config.ySignal})` : ''}`;
        return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeXml(label('tool_calibration_curve'))}">
            <rect width="${width}" height="${height}" rx="18" fill="#ffffff"/>
            <line x1="${pad.left}" y1="${height - pad.bottom}" x2="${width - pad.right}" y2="${height - pad.bottom}" stroke="#94a3b8"/>
            <line x1="${pad.left}" y1="${pad.top}" x2="${pad.left}" y2="${height - pad.bottom}" stroke="#94a3b8"/>
            <text x="${width / 2}" y="${height - 18}" text-anchor="middle" font-size="13" font-weight="700" fill="#334155">${escapeXml(xAxis)}</text>
            <text x="18" y="${height / 2}" text-anchor="middle" font-size="13" font-weight="700" fill="#334155" transform="rotate(-90 18 ${height / 2})">${escapeXml(yAxis)}</text>
            <text x="${pad.left}" y="${height - 36}" font-size="11" fill="#64748b">${formatNumber(minX, 3)}</text>
            <text x="${width - pad.right}" y="${height - 36}" text-anchor="end" font-size="11" fill="#64748b">${formatNumber(maxX, 3)}</text>
            <text x="${pad.left - 8}" y="${height - pad.bottom}" text-anchor="end" font-size="11" fill="#64748b">${formatNumber(minY, 3)}</text>
            <text x="${pad.left - 8}" y="${pad.top + 4}" text-anchor="end" font-size="11" fill="#64748b">${formatNumber(maxY, 3)}</text>
            ${curve.length ? `<path d="${curve.join(' ')}" fill="none" stroke="#0f766e" stroke-width="3"/>` : ''}
            ${circles}
            ${excludedCircles}
            ${unknownMarks}
            <g transform="translate(${width - 190} 26)">
                <rect width="164" height="70" rx="12" fill="#f8fafc" stroke="#e2e8f0"/>
                <circle cx="16" cy="20" r="5" fill="#0891b2"/><text x="28" y="24" font-size="11" fill="#334155">${escapeXml(label('calibration_legend_standards'))}</text>
                <rect x="11" y="37" width="10" height="10" fill="#f59e0b" transform="rotate(45 16 42)"/><text x="28" y="46" font-size="11" fill="#334155">${escapeXml(label('calibration_legend_unknowns'))}</text>
                <line x1="10" y1="58" x2="22" y2="58" stroke="#0f766e" stroke-width="3"/><text x="28" y="62" font-size="11" fill="#334155">${escapeXml(label('calibration_legend_fit'))}</text>
            </g>
        </svg>`;
    }

    function escapeXml(value) {
        return String(value ?? '').replace(/[&<>"']/g, (char) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&apos;'
        }[char]));
    }

    function convertToCaCO3(value, fromUnit, toUnit = 'mg/L as CaCO3') {
        const parsed = parseNumber(value);
        assertNonNegative(parsed, 'concentration_positive_required');
        const from = normalizeUnit(fromUnit);
        const to = normalizeUnit(toUnit);
        if (!CACO3_FACTORS[from] || !CACO3_FACTORS[to]) throw new Error('incompatible_units');
        const asCaCO3 = parsed * CACO3_FACTORS[from];
        return {
            value: asCaCO3 / CACO3_FACTORS[to],
            baseValue: asCaCO3,
            from,
            to,
            factor: CACO3_FACTORS[from] / CACO3_FACTORS[to],
            formula: 'mg/L as CaCO3 = value x factor'
        };
    }

    function convertSpecies(value, fromForm, toForm) {
        const parsed = parseNumber(value);
        assertNonNegative(parsed, 'concentration_positive_required');
        const from = SPECIES_FORMS[fromForm];
        const to = SPECIES_FORMS[toForm];
        if (!from || !to || from.group !== to.group) throw new Error('incompatible_units');
        const factor = to.mass / from.mass;
        return {
            value: parsed * factor,
            factor,
            from: fromForm,
            to: toForm,
            formula: 'valueTarget = valueSource x MWtarget / MWsource'
        };
    }

    function standardPreparation({ cStock, cStockUnit, finalVolume, finalVolumeUnit, targets, targetUnit, includeBlank = true, minPipettableVolume = 1, minPipettableUnit = 'µL' }) {
        const stock = convertConcentration(cStock, cStockUnit);
        const finalL = convertVolume(finalVolume, finalVolumeUnit, 'L');
        const minVolumeL = convertVolume(minPipettableVolume, minPipettableUnit, 'L', { allowZero: true });
        const targetValues = parseNumberList(targets);
        if (!targetValues.length) throw new Error('insufficient_data');
        const values = includeBlank === false ? targetValues : Array.from(new Set([0, ...targetValues]));
        const rows = values.map((target, index) => {
            const targetConcentration = target === 0
                ? { ...stock, value: 0 }
                : convertConcentration(target, targetUnit || cStockUnit);
            assertCompatibleConcentrations(stock, targetConcentration);
            const stockVolume = targetConcentration.value === 0 ? 0 : (targetConcentration.value * finalL) / stock.value;
            const diluentVolume = finalL - stockVolume;
            const warnings = [];
            if (targetConcentration.value > stock.value) warnings.push('target_greater_than_stock');
            if (stockVolume > 0 && stockVolume < minVolumeL) warnings.push('difficult_to_pipette');
            if (diluentVolume < 0) warnings.push('negative_not_allowed');
            return {
                id: `std-${index + 1}`,
                target,
                stockVolume,
                diluentVolume,
                finalVolume: finalL,
                warnings
            };
        });
        return {
            rows,
            formula: 'Vstock = (Ctarget x Vfinal) / Cstock',
            warnings: Array.from(new Set(rows.flatMap((row) => row.warnings)))
        };
    }

    function spikeRecovery(input = {}) {
        const unspiked = parseNumber(input.unspiked);
        const spikedMeasured = parseNumber(input.spikedMeasured);
        let added = parseNumber(input.added);
        assertNonNegative(unspiked, 'concentration_positive_required');
        assertNonNegative(spikedMeasured, 'concentration_positive_required');

        if (input.useExact || (input.cStockSpike && input.vSpike && input.vFinal)) {
            const stock = parseNumber(input.cStockSpike);
            const spikeVolume = convertVolume(input.vSpike, input.vSpikeUnit || 'mL', 'L');
            const finalVolume = convertVolume(input.vFinal, input.vFinalUnit || 'mL', 'L');
            assertPositive(stock, 'concentration_positive_required');
            added = (stock * spikeVolume) / finalVolume;
        }

        assertPositive(added, 'concentration_positive_required');
        const recovery = ((spikedMeasured - unspiked) / added) * 100;
        const recoveryBias = recovery - 100;
        const min = parseNumber(input.criteriaMin) ?? 80;
        const max = parseNumber(input.criteriaMax) ?? 120;
        return {
            recovery,
            bias: recoveryBias,
            added,
            pass: recovery >= min && recovery <= max,
            criteriaMin: min,
            criteriaMax: max,
            formula: 'Recovery% = ((CspikedMeasured - Cunspiked) / Cadded) x 100',
            warnings: recovery < min || recovery > max ? ['out_of_range'] : []
        };
    }

    function quickStats(values) {
        const clean = parseNumberList(values);
        if (!clean.length) throw new Error('insufficient_data');
        const min = Math.min(...clean);
        const max = Math.max(...clean);
        const sd = standardDeviation(clean);
        const average = mean(clean);
        return {
            n: clean.length,
            mean: average,
            median: median(clean),
            sd,
            rsd: average === 0 ? null : (sd / average) * 100,
            cv: average === 0 ? null : (sd / average) * 100,
            min,
            max,
            range: max - min,
            formula: 'SD = sqrt(Σ(x - mean)^2 / (n - 1))'
        };
    }

    function lodLoqFromSlope({ sd, slope }) {
        const parsedSd = parseNumber(sd);
        const parsedSlope = parseNumber(slope);
        assertNonNegative(parsedSd, 'positive_required');
        assertPositive(parsedSlope, 'zero_denominator');
        return {
            lod: 3.3 * parsedSd / parsedSlope,
            loq: 10 * parsedSd / parsedSlope,
            formula: 'LOD = 3.3 x s / m; LOQ = 10 x s / m',
            warnings: ['lod_loq_basic_warning']
        };
    }

    function lodLoqFromBlanks({ values, factorLOD = 3, factorLOQ = 10, slope }) {
        const clean = parseNumberList(values);
        if (clean.length < 2) throw new Error('insufficient_data');
        const avg = mean(clean);
        const sd = standardDeviation(clean);
        const lodFactor = parseNumber(factorLOD) ?? 3;
        const loqFactor = parseNumber(factorLOQ) ?? 10;
        const lodSignal = avg + (lodFactor * sd);
        const loqSignal = avg + (loqFactor * sd);
        const parsedSlope = parseNumber(slope);
        return {
            mean: avg,
            sd,
            lodSignal,
            loqSignal,
            lodConcentration: Number.isFinite(parsedSlope) && parsedSlope > 0 ? lodSignal / parsedSlope : null,
            loqConcentration: Number.isFinite(parsedSlope) && parsedSlope > 0 ? loqSignal / parsedSlope : null,
            formula: 'Signal = mean(blank) + factor x SD(blank)',
            warnings: ['lod_loq_basic_warning']
        };
    }

    function hardnessFromCaMg({ ca, mg }) {
        const caValue = parseNumber(ca) || 0;
        const mgValue = parseNumber(mg) || 0;
        assertNonNegative(caValue, 'concentration_positive_required');
        assertNonNegative(mgValue, 'concentration_positive_required');
        const calciumHardness = caValue * 2.497;
        const magnesiumHardness = mgValue * 4.118;
        const totalHardness = calciumHardness + magnesiumHardness;
        let classification = 'hardness_soft';
        if (totalHardness >= 180) classification = 'hardness_very_hard';
        else if (totalHardness >= 120) classification = 'hardness_hard';
        else if (totalHardness >= 60) classification = 'hardness_moderately_hard';
        return {
            calciumHardness,
            magnesiumHardness,
            totalHardness,
            classification,
            formula: 'Hardness as CaCO3 = Ca x 2.497 + Mg x 4.118'
        };
    }

    function alkalinityTitration({ sampleVolume, sampleVolumeUnit = 'mL', acidNormality, acidVolume, acidVolumeUnit = 'mL', blankVolume = 0, blankVolumeUnit = 'mL' }) {
        const sampleMl = convertVolume(sampleVolume, sampleVolumeUnit, 'mL');
        const acidMl = convertVolume(acidVolume, acidVolumeUnit, 'mL');
        const blankMl = blankVolume ? convertVolume(blankVolume, blankVolumeUnit, 'mL', { allowZero: true }) : 0;
        const normality = parseNumber(acidNormality);
        assertPositive(sampleMl, 'volume_positive_required');
        assertPositive(normality, 'concentration_positive_required');
        const correctedVolume = acidMl - blankMl;
        if (correctedVolume < 0) throw new Error('negative_not_allowed');
        return {
            correctedVolume,
            alkalinity: (correctedVolume * normality * 50000) / sampleMl,
            formula: 'Alkalinity as CaCO3 mg/L = (A x N x 50000) / sample_mL'
        };
    }

    function sampleNormalization(input = {}) {
        const c2 = parseNumber(input.targetConcentration);
        const finalVolume = convertVolume(input.finalVolume, input.finalVolumeUnit || 'µL', 'µL');
        const minVolume = input.minPipettableVolume
            ? convertVolume(input.minPipettableVolume, input.minPipettableUnit || 'µL', 'µL', { allowZero: true })
            : 0;
        assertPositive(c2, 'concentration_positive_required');
        assertPositive(finalVolume, 'volume_positive_required');
        const samples = input.samples?.length ? input.samples : [{ name: input.sampleName || '', concentration: input.initialConcentration }];
        const rows = samples.map((sample, index) => {
            const c1 = parseNumber(sample.concentration);
            assertPositive(c1, 'concentration_positive_required');
            const sampleVolume = (c2 * finalVolume) / c1;
            const diluentVolume = finalVolume - sampleVolume;
            const warnings = [];
            if (c2 > c1) warnings.push('target_greater_than_stock');
            if (sampleVolume > 0 && sampleVolume < minVolume) warnings.push('difficult_to_pipette');
            return {
                id: sample.id || `sample-${index + 1}`,
                name: sample.name || '',
                initialConcentration: c1,
                sampleVolume,
                diluentVolume,
                finalVolume,
                status: warnings.length ? 'review' : 'ok',
                warnings
            };
        });
        return {
            rows,
            formula: 'Vsample = (C2 x V2) / C1',
            warnings: Array.from(new Set(rows.flatMap((row) => row.warnings)))
        };
    }

    function titrationGeneric({ sampleVolume, sampleVolumeUnit = 'mL', titrantConcentration, titrantVolume, titrantVolumeUnit = 'mL', stoichiometricFactor = 1, blankVolume = 0, blankVolumeUnit = 'mL', dilutionFactor = 1, resultUnit = '' }) {
        const sampleMl = convertVolume(sampleVolume, sampleVolumeUnit, 'mL');
        const titrantMl = convertVolume(titrantVolume, titrantVolumeUnit, 'mL');
        const blankMl = blankVolume ? convertVolume(blankVolume, blankVolumeUnit, 'mL', { allowZero: true }) : 0;
        const correctedVolume = titrantMl - blankMl;
        const concentration = parseNumber(titrantConcentration);
        const factor = parseNumber(stoichiometricFactor) ?? 1;
        const dilution = parseNumber(dilutionFactor) ?? 1;
        assertPositive(sampleMl, 'volume_positive_required');
        assertPositive(concentration, 'concentration_positive_required');
        assertPositive(factor, 'factor_positive_required');
        assertPositive(dilution, 'factor_positive_required');
        if (correctedVolume < 0) throw new Error('negative_not_allowed');
        return {
            correctedVolume,
            result: ((concentration * correctedVolume * factor) / sampleMl) * dilution,
            resultUnit,
            formula: 'Result = ((Ctitrant x Vcorrected x factor) / Vsample) x dilutionFactor',
            warnings: ['titration_sop_factor_warning']
        };
    }

    function solutionLabel(input = {}) {
        const preparation = input.preparationDate ? new Date(input.preparationDate) : new Date();
        if (Number.isNaN(preparation.getTime())) throw new Error('required_field');
        const manualExpiration = input.manualExpirationDate ? new Date(input.manualExpirationDate) : null;
        let expiration = manualExpiration && !Number.isNaN(manualExpiration.getTime()) ? manualExpiration : new Date(preparation.getTime());
        if (!manualExpiration) {
            const stability = parseNumber(input.stability) || 0;
            const unit = input.stabilityUnit || 'days';
            if (unit === 'hours') expiration.setHours(expiration.getHours() + stability);
            else if (unit === 'weeks') expiration.setDate(expiration.getDate() + (stability * 7));
            else if (unit === 'months') expiration.setMonth(expiration.getMonth() + stability);
            else expiration.setDate(expiration.getDate() + stability);
        }
        const now = input.now ? new Date(input.now) : new Date();
        return {
            solutionName: input.solutionName || '',
            concentration: input.concentration || '',
            unit: input.unit || '',
            solvent: input.solvent || '',
            preparedBy: input.preparedBy || '',
            lot: input.lot || '',
            preparationDate: preparation.toISOString().slice(0, 10),
            expirationDate: expiration.toISOString().slice(0, 10),
            status: expiration.getTime() < now.getTime() ? 'expired' : 'valid',
            printableText: [
                input.solutionName || '',
                input.concentration ? `${input.concentration} ${input.unit || ''}`.trim() : '',
                input.solvent || '',
                expiration.toISOString().slice(0, 10),
                input.storageCondition || '',
                input.lot || ''
            ].filter(Boolean).join('\n'),
            formula: 'expirationDate = preparationDate + stability',
            warnings: ['solution_label_sds_warning']
        };
    }

    function controlChart(input = {}) {
        const values = parseNumberList(input.values);
        if (!values.length) throw new Error('insufficient_data');
        const newValue = parseNumber(input.newValue);
        const center = parseNumber(input.targetMean);
        const targetSd = parseNumber(input.targetSd);
        const avg = Number.isFinite(center) ? center : mean(values);
        const sd = Number.isFinite(targetSd) ? targetSd : standardDeviation(values);
        const warningHigh = avg + (2 * sd);
        const warningLow = avg - (2 * sd);
        const controlHigh = avg + (3 * sd);
        const controlLow = avg - (3 * sd);
        const warnings = [];
        let status = 'ok';
        if (Number.isFinite(newValue)) {
            if (newValue > controlHigh || newValue < controlLow) {
                status = 'reject';
                warnings.push('control_chart_out_of_control');
            } else if (newValue > warningHigh || newValue < warningLow) {
                status = 'warning';
                warnings.push('control_chart_warning_limit');
            }
        }
        const recent = values.slice(-6);
        const increasing = recent.length >= 6 && recent.every((value, index) => index === 0 || value > recent[index - 1]);
        const decreasing = recent.length >= 6 && recent.every((value, index) => index === 0 || value < recent[index - 1]);
        if (increasing || decreasing) warnings.push('control_chart_trend_warning');
        return {
            n: values.length,
            mean: avg,
            sd,
            warningHigh,
            warningLow,
            controlHigh,
            controlLow,
            newValue,
            status,
            warnings: Array.from(new Set(warnings)),
            table: values.map((value, index) => ({ index: index + 1, value })),
            formula: 'UCL/LCL = mean +/- 3SD; warning = mean +/- 2SD'
        };
    }

    function measurementUncertainty(input = {}) {
        const k = parseNumber(input.k) ?? 2;
        const resultValue = parseNumber(input.result);
        assertPositive(k, 'factor_positive_required');
        const sources = (input.sources || [])
            .map((source, index) => {
                const rawUncertainty = parseNumber(source.uncertainty);
                const sensitivity = parseNumber(source.sensitivity) ?? 1;
                const distribution = source.distribution || 'normal';
                let divisor = parseNumber(source.divisor);
                if (!Number.isFinite(divisor) || divisor <= 0) {
                    if (distribution === 'rectangular') divisor = Math.sqrt(3);
                    else if (distribution === 'triangular') divisor = Math.sqrt(6);
                    else divisor = 1;
                }
                assertNonNegative(rawUncertainty, 'positive_required');
                const standardU = rawUncertainty / divisor;
                const contribution = Math.pow(sensitivity * standardU, 2);
                return {
                    id: source.id || `u${index + 1}`,
                    name: source.name || '',
                    rawUncertainty,
                    distribution,
                    divisor,
                    sensitivity,
                    standardU,
                    contribution,
                    unit: source.unit || ''
                };
            })
            .filter((source) => Number.isFinite(source.standardU));
        if (!sources.length) throw new Error('insufficient_data');
        const sumContribution = sources.reduce((sum, source) => sum + source.contribution, 0);
        const combined = Math.sqrt(sumContribution);
        const expanded = k * combined;
        return {
            sources: sources.map((source) => ({
                ...source,
                contributionPercent: sumContribution > 0 ? (source.contribution / sumContribution) * 100 : 0
            })),
            combined,
            expanded,
            k,
            result: resultValue,
            relativePercent: Number.isFinite(resultValue) && resultValue !== 0 ? (expanded / Math.abs(resultValue)) * 100 : null,
            formula: 'u_c = sqrt(sum((c_i x u_i)^2)); U = k x u_c',
            warnings: ['uncertainty_sop_warning']
        };
    }

    function advancedMdl(input = {}) {
        const blanks = parseNumberList(input.blanks);
        const lowSpikes = parseNumberList(input.lowSpikes);
        if (blanks.length < 2 && lowSpikes.length < 2) throw new Error('insufficient_data');
        const factorBlank = parseNumber(input.factorBlank) ?? 3.143;
        const factorSpike = parseNumber(input.factorSpike) ?? 3.143;
        const spikeConcentration = parseNumber(input.spikeConcentration);
        const blankMean = blanks.length ? mean(blanks) : 0;
        const blankSd = blanks.length > 1 ? standardDeviation(blanks) : 0;
        const spikeMean = lowSpikes.length ? mean(lowSpikes) : null;
        const spikeSd = lowSpikes.length > 1 ? standardDeviation(lowSpikes) : 0;
        const mdlBlank = blanks.length > 1 ? Math.max(0, blankMean + (factorBlank * blankSd)) : null;
        const mdlSpike = lowSpikes.length > 1 ? factorSpike * spikeSd : null;
        const candidates = [mdlBlank, mdlSpike].filter(Number.isFinite);
        const finalMdl = candidates.length ? Math.max(...candidates) : null;
        const recovery = Number.isFinite(spikeConcentration) && spikeConcentration !== 0 && Number.isFinite(spikeMean)
            ? ((spikeMean - blankMean) / spikeConcentration) * 100
            : null;
        return {
            blankMean,
            blankSd,
            spikeMean,
            spikeSd,
            mdlBlank,
            mdlSpike,
            finalMdl,
            recovery,
            nBlank: blanks.length,
            nSpike: lowSpikes.length,
            formula: 'MDL = max(MDLb, MDLs)',
            warnings: ['mdl_sop_regulatory_warning']
        };
    }

    function batchPlanner(input = {}) {
        const samples = Math.max(0, Math.floor(parseNumber(input.samples) || 0));
        if (samples <= 0) throw new Error('insufficient_data');
        const duplicateEvery = Math.max(0, Math.floor(parseNumber(input.duplicateEvery) || 0));
        const spikeEvery = Math.max(0, Math.floor(parseNumber(input.spikeEvery) || 0));
        const blankEvery = Math.max(0, Math.floor(parseNumber(input.blankEvery) || 0));
        const qcEvery = Math.max(0, Math.floor(parseNumber(input.qcEvery) || 0));
        const sequence = [];
        let position = 1;
        function add(type, label, sampleNumber = null) {
            sequence.push({ position: position++, type, label, sampleNumber });
        }
        if (input.includeCalibration) add('calibration', 'batch_item_calibration');
        add('blank', 'batch_item_initial_blank');
        add('qc', 'batch_item_initial_qc');
        for (let index = 1; index <= samples; index += 1) {
            if (blankEvery && index > 1 && (index - 1) % blankEvery === 0) add('blank', 'batch_item_blank');
            if (qcEvery && index > 1 && (index - 1) % qcEvery === 0) add('qc', 'batch_item_qc');
            add('sample', 'batch_item_sample', index);
            if (duplicateEvery && index % duplicateEvery === 0) add('duplicate', 'batch_item_duplicate', index);
            if (spikeEvery && index % spikeEvery === 0) add('spike', 'batch_item_spike', index);
        }
        if (input.includeContinuingVerification) add('qc', 'batch_item_closing_qc');
        return {
            sequence,
            totalVials: sequence.length,
            qcCount: sequence.filter((row) => ['blank', 'qc', 'duplicate', 'spike', 'calibration'].includes(row.type)).length,
            sampleCount: samples,
            formula: 'Sequence = samples + scheduled QC events'
        };
    }

    function specComparator(input = {}) {
        const result = parseNumber(input.result);
        const lowerLimit = parseNumber(input.lowerLimit);
        const upperLimit = parseNumber(input.upperLimit);
        const uncertainty = parseNumber(input.uncertainty);
        if (!Number.isFinite(result)) throw new Error('required_field');
        if (!Number.isFinite(lowerLimit) && !Number.isFinite(upperLimit)) throw new Error('required_field');
        let status = 'pass';
        let margin = null;
        let percentOfLimit = null;
        if (Number.isFinite(upperLimit)) {
            margin = upperLimit - result;
            percentOfLimit = upperLimit !== 0 ? (result / upperLimit) * 100 : null;
            if (result > upperLimit) status = 'fail';
            if (Number.isFinite(uncertainty) && result <= upperLimit && result + uncertainty > upperLimit) status = 'gray';
        }
        if (Number.isFinite(lowerLimit)) {
            const lowerMargin = result - lowerLimit;
            if (margin === null || Math.abs(lowerMargin) < Math.abs(margin)) margin = lowerMargin;
            if (result < lowerLimit) status = 'fail';
            if (Number.isFinite(uncertainty) && result >= lowerLimit && result - uncertainty < lowerLimit) status = 'gray';
        }
        return {
            status,
            margin,
            percentOfLimit,
            result,
            lowerLimit,
            upperLimit,
            uncertainty: Number.isFinite(uncertainty) ? uncertainty : null,
            formula: 'Compare result against manually entered limits',
            warnings: ['spec_limits_manual_warning']
        };
    }

    function decisionRule(input = {}) {
        const result = parseNumber(input.result);
        const expandedUncertainty = parseNumber(input.expandedUncertainty);
        const upperLimit = parseNumber(input.upperLimit);
        const lowerLimit = parseNumber(input.lowerLimit);
        const rule = input.rule || 'simple';
        if (!Number.isFinite(result)) throw new Error('required_field');
        if (!Number.isFinite(upperLimit) && !Number.isFinite(lowerLimit)) throw new Error('required_field');
        const U = Number.isFinite(expandedUncertainty) ? Math.max(0, expandedUncertainty) : 0;
        let decision = 'pass';
        const reasons = [];
        if (rule === 'guard_band') {
            if (Number.isFinite(upperLimit)) {
                if (result + U <= upperLimit) reasons.push('decision_upper_guard_pass');
                else if (result - U > upperLimit) {
                    decision = 'fail';
                    reasons.push('decision_upper_guard_fail');
                } else {
                    decision = 'gray';
                    reasons.push('decision_uncertain_zone');
                }
            }
            if (Number.isFinite(lowerLimit)) {
                if (result - U >= lowerLimit) reasons.push('decision_lower_guard_pass');
                else if (result + U < lowerLimit) {
                    decision = 'fail';
                    reasons.push('decision_lower_guard_fail');
                } else {
                    decision = decision === 'fail' ? decision : 'gray';
                    reasons.push('decision_uncertain_zone');
                }
            }
        } else if (rule === 'uncertainty_zone') {
            if (Number.isFinite(upperLimit) && result > upperLimit) decision = 'fail';
            if (Number.isFinite(lowerLimit) && result < lowerLimit) decision = 'fail';
            if (decision !== 'fail' && Number.isFinite(upperLimit) && result + U > upperLimit) decision = 'gray';
            if (decision !== 'fail' && Number.isFinite(lowerLimit) && result - U < lowerLimit) decision = 'gray';
            reasons.push(decision === 'gray' ? 'decision_uncertain_zone' : decision === 'fail' ? 'decision_simple_fail' : 'decision_simple_pass');
        } else {
            if (Number.isFinite(upperLimit) && result > upperLimit) decision = 'fail';
            if (Number.isFinite(lowerLimit) && result < lowerLimit) decision = 'fail';
            reasons.push(decision === 'fail' ? 'decision_simple_fail' : 'decision_simple_pass');
        }
        return {
            decision,
            reasons: Array.from(new Set(reasons)),
            result,
            expandedUncertainty: U,
            upperLimit,
            lowerLimit,
            rule,
            formula: rule === 'guard_band' ? 'Pass if result + U <= upper limit; fail if result - U > upper limit' : 'Pass if result is within limits',
            warnings: ['decision_rule_sop_warning']
        };
    }

    function normalizeFlowUnit(unit) {
        const normalized = normalizeUnit(unit).replace(/M³/g, 'm³').replace(/M3/g, 'm3');
        const aliases = {
            m3d: 'm3/d',
            m3day: 'm3/day',
            'm3 per day': 'm3/day',
            'm³ per day': 'm³/day',
            m3h: 'm3/h',
            'm3 per hour': 'm3/h',
            'm³ per hour': 'm³/h',
            ld: 'L/d',
            lday: 'L/day',
            lh: 'L/h',
            lmin: 'L/min',
            ls: 'L/s'
        };
        const compact = normalized.replace(/\s+/g, '').replace(/\/?per\/?/i, 'per');
        return aliases[compact] || aliases[normalized] || normalized;
    }

    function convertFlowToM3Day(value, unit = 'm3/d', options = {}) {
        const parsed = parseNumber(value);
        if (options.allowZero) assertNonNegative(parsed, 'flow_positive_required');
        else assertPositive(parsed, 'flow_positive_required');
        const normalized = normalizeFlowUnit(unit);
        const factor = FLOW_TO_M3_DAY[normalized];
        if (!factor) throw new Error('invalid_flow_unit');
        return parsed * factor;
    }

    function convertWaterConcentrationToMgL(value, unit = 'mg/L', options = {}) {
        const parsed = parseNumber(value);
        if (options.allowZero) assertNonNegative(parsed, 'concentration_positive_required');
        else assertPositive(parsed, 'concentration_positive_required');
        const normalized = normalizeUnit(unit);
        const factor = WATER_CONCENTRATION_TO_MG_L[normalized];
        if (!factor) throw new Error('invalid_water_concentration_unit');
        return parsed * factor;
    }

    function lsiRyznar(input = {}) {
        const pH = parseNumber(input.pH ?? input.ph);
        const temperature = parseNumber(input.temperature ?? input.temperatureC);
        const tds = parseNumber(input.tds ?? input.TDS);
        const calciumHardness = parseNumber(input.calciumHardness ?? input.calciumHardnessAsCaCO3);
        const alkalinity = parseNumber(input.alkalinity ?? input.alkalinityAsCaCO3);
        assertNonNegative(pH, 'required_field');
        if (!Number.isFinite(temperature)) throw new Error('required_field');
        if (temperature <= -273) throw new Error('temperature_below_absolute_zero');
        assertPositive(tds, 'concentration_positive_required');
        assertPositive(calciumHardness, 'concentration_positive_required');
        assertPositive(alkalinity, 'concentration_positive_required');
        const A = (Math.log10(tds) - 1) / 10;
        const B = -13.12 * Math.log10(temperature + 273) + 34.55;
        const C = Math.log10(calciumHardness) - 0.4;
        const D = Math.log10(alkalinity);
        const saturationPh = (9.3 + A + B) - (C + D);
        const lsi = pH - saturationPh;
        const ryznar = (2 * saturationPh) - pH;
        const tendency = lsi > 0.5 ? 'water_tendency_scaling' : lsi < -0.5 ? 'water_tendency_corrosive' : 'water_tendency_equilibrium';
        return {
            pH,
            temperature,
            tds,
            calciumHardness,
            alkalinity,
            saturationPh,
            lsi,
            ryznar,
            tendency,
            formula: 'pHs = (9.3 + A + B) - (C + D); LSI = pH - pHs; RSI = 2pHs - pH',
            warnings: ['lsi_approximation_warning']
        };
    }

    function ionPreset(row = {}) {
        return ION_PRESETS[row.ion] || ION_PRESETS[row.name] || null;
    }

    function normalizeIonRow(row = {}, fallbackType = '') {
        const preset = ionPreset(row);
        const concentration = parseNumber(row.concentration ?? row.mgL ?? row.value);
        assertNonNegative(concentration, 'concentration_positive_required');
        const charge = parseNumber(row.charge) ?? preset?.charge;
        const molecularWeight = parseNumber(row.molecularWeight ?? row.molarMass ?? row.mw) ?? preset?.molecularWeight;
        if (!Number.isFinite(charge) || charge === 0) throw new Error('required_field');
        assertPositive(molecularWeight, 'molar_mass_positive_required');
        const type = row.type || fallbackType || (charge > 0 ? 'cation' : 'anion');
        const meq = concentration * Math.abs(charge) / molecularWeight;
        return {
            type,
            ion: row.ion || row.name || '',
            concentration,
            charge,
            molecularWeight,
            meq
        };
    }

    function ionicBalance(input = {}) {
        const criterion = Math.abs(parseNumber(input.criterion) ?? 10);
        const rows = [
            ...(input.cations || []).map((row) => normalizeIonRow(row, 'cation')),
            ...(input.anions || []).map((row) => normalizeIonRow(row, 'anion')),
            ...(input.ions || []).map((row) => normalizeIonRow(row, row.type || ''))
        ];
        const activeRows = rows.filter((row) => row.concentration > 0);
        if (!activeRows.length) throw new Error('insufficient_data');
        const cationSum = activeRows
            .filter((row) => row.type === 'cation' || (!row.type && row.charge > 0))
            .reduce((sum, row) => sum + row.meq, 0);
        const anionSum = activeRows
            .filter((row) => row.type === 'anion' || (!row.type && row.charge < 0))
            .reduce((sum, row) => sum + row.meq, 0);
        if (cationSum + anionSum === 0) throw new Error('zero_denominator');
        const balanceErrorPercent = ((cationSum - anionSum) / (cationSum + anionSum)) * 100;
        const status = Math.abs(balanceErrorPercent) <= criterion ? 'ok' : 'review';
        return {
            rows: activeRows,
            cationSum,
            anionSum,
            balanceErrorPercent,
            criterion,
            status,
            formula: 'meq/L = mg/L x |charge| / MW; error% = (Σcations - Σanions) / (Σcations + Σanions) x 100'
        };
    }

    function convertChlorineStockToMgL(value, unit = '% w/v') {
        const parsed = parseNumber(value);
        assertPositive(parsed, 'concentration_positive_required');
        const normalized = normalizeUnit(unit);
        if (normalized === '% w/v' || normalized === '%') return parsed * 10000;
        if (normalized === 'g/L') return parsed * 1000;
        if (normalized === 'mg/L') return parsed;
        throw new Error('invalid_water_concentration_unit');
    }

    function chlorineDose(input = {}) {
        const waterVolumeL = convertVolume(input.waterVolume, input.waterVolumeUnit || 'L', 'L');
        const targetChlorine = convertWaterConcentrationToMgL(input.targetChlorine ?? input.dose, 'mg/L');
        const stockMgL = convertChlorineStockToMgL(input.stockConcentration ?? input.stock, input.stockUnit || '% w/v');
        const stockVolumeL = (targetChlorine * waterVolumeL) / stockMgL;
        return {
            waterVolumeL,
            targetChlorine,
            stockMgL,
            stockVolumeL,
            formula: 'Vstock = Ctarget x Vwater / Cstock',
            warnings: ['chlorine_safety_warning']
        };
    }

    function chlorineCt(input = {}) {
        const residual = convertWaterConcentrationToMgL(input.residualChlorine ?? input.residual, 'mg/L');
        const contactTime = parseNumber(input.contactTime ?? input.time);
        assertPositive(contactTime, 'positive_required');
        const ct = residual * contactTime;
        return {
            residual,
            contactTime,
            ct,
            formula: 'CT = C x t',
            warnings: ['chlorine_safety_warning']
        };
    }

    function chlorineDemand(input = {}) {
        const doseApplied = convertWaterConcentrationToMgL(input.doseApplied ?? input.dose, 'mg/L');
        const residualMeasured = convertWaterConcentrationToMgL(input.residualMeasured ?? input.residual, 'mg/L', { allowZero: true });
        const demand = doseApplied - residualMeasured;
        return {
            doseApplied,
            residualMeasured,
            demand,
            formula: 'Demand = dose applied - residual measured',
            warnings: demand < 0 ? ['out_of_range', 'chlorine_safety_warning'] : ['chlorine_safety_warning']
        };
    }

    function chemicalDosing(input = {}) {
        const flowM3Day = convertFlowToM3Day(input.flow, input.flowUnit || 'm3/d');
        const doseMgL = convertWaterConcentrationToMgL(input.dose, 'mg/L');
        const stockGL = parseNumber(input.stockConcentrationGL ?? input.stockConcentration);
        assertPositive(stockGL, 'concentration_positive_required');
        const purity = parseNumber(input.purity) ?? 100;
        assertPositive(purity, 'purity_positive_required');
        const activeKgDay = doseMgL * flowM3Day * 0.001;
        const productKgDay = activeKgDay / (purity / 100);
        const stockLDay = (productKgDay * 1000) / stockGL;
        const pumpMlMin = (stockLDay * 1000) / (24 * 60);
        return {
            flowM3Day,
            doseMgL,
            stockGL,
            purity,
            activeKgDay,
            productKgDay,
            stockLDay,
            pumpMlMin,
            formula: 'kg/day = dose_mg/L x flow_m3/day x 0.001'
        };
    }

    function flowLoad(input = {}) {
        const concentrationMgL = convertWaterConcentrationToMgL(input.concentration, input.concentrationUnit || 'mg/L', { allowZero: true });
        const flowM3Day = convertFlowToM3Day(input.flow, input.flowUnit || 'm3/d');
        const periodDays = parseNumber(input.periodDays);
        const kgDay = concentrationMgL * flowM3Day * 0.001;
        return {
            concentrationMgL,
            flowM3Day,
            kgDay,
            gHour: (kgDay * 1000) / 24,
            kgYear: kgDay * 365,
            periodDays: Number.isFinite(periodDays) && periodDays > 0 ? periodDays : null,
            periodMassKg: Number.isFinite(periodDays) && periodDays > 0 ? kgDay * periodDays : null,
            formula: 'kg/day = C_mg/L x Q_m3/day x 0.001'
        };
    }

    function streamMixing(input = {}) {
        const streams = (input.streams || []).map((stream, index) => {
            const flowM3Day = convertFlowToM3Day(stream.flow, stream.flowUnit || 'm3/d');
            const concentrationMgL = convertWaterConcentrationToMgL(stream.concentration, stream.concentrationUnit || 'mg/L', { allowZero: true });
            const temperature = parseNumber(stream.temperature);
            return {
                name: stream.name || `S${index + 1}`,
                flowM3Day,
                concentrationMgL,
                temperature: Number.isFinite(temperature) ? temperature : null
            };
        });
        if (!streams.length) throw new Error('insufficient_data');
        const totalFlowM3Day = streams.reduce((sum, stream) => sum + stream.flowM3Day, 0);
        assertPositive(totalFlowM3Day, 'flow_positive_required');
        const mixedConcentrationMgL = streams.reduce((sum, stream) => sum + (stream.flowM3Day * stream.concentrationMgL), 0) / totalFlowM3Day;
        const hasAllTemperatures = streams.every((stream) => Number.isFinite(stream.temperature));
        const mixedTemperatureC = hasAllTemperatures
            ? streams.reduce((sum, stream) => sum + (stream.flowM3Day * stream.temperature), 0) / totalFlowM3Day
            : null;
        return {
            streams,
            totalFlowM3Day,
            mixedConcentrationMgL,
            mixedTemperatureC,
            formula: 'Cmix = Σ(Ci x Qi) / ΣQi',
            warnings: ['ph_not_linear_warning']
        };
    }

    function parseDelimitedTable(value) {
        if (Array.isArray(value)) return value;
        return String(value || '')
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line) => line.split(/[;\t,]/).map((part) => part.trim()));
    }

    function cfuPlateCount(input = {}) {
        const colonies = parseNumber(input.colonies);
        const dilution = parseNumber(input.dilution);
        const platedMl = convertVolume(input.platedVolume, input.platedVolumeUnit || 'mL', 'mL');
        const minCount = parseNumber(input.minCount) ?? 30;
        const maxCount = parseNumber(input.maxCount) ?? 300;
        assertNonNegative(colonies, 'positive_required');
        assertPositive(dilution, 'dilution_factor_positive_required');
        assertPositive(platedMl, 'volume_positive_required');
        const cfuPerMl = colonies / (dilution * platedMl);
        const status = colonies < minCount ? 'low' : colonies > maxCount ? 'high' : 'countable';
        const warnings = status === 'countable' ? [] : ['cfu_count_range_warning'];
        return {
            colonies,
            dilution,
            platedMl,
            cfuPerMl,
            cfuPer100Ml: cfuPerMl * 100,
            status,
            formula: 'CFU/mL = colonies / (dilution x plated volume mL)',
            warnings
        };
    }

    function mpnThomas(input = {}) {
        const rows = (input.rows || parseDelimitedTable(input.series || input.rowsText)).map((row) => {
            const values = Array.isArray(row) ? row : [row.dilution, row.tubes, row.positive, row.volumeMl];
            const dilution = parseNumber(row.dilution ?? values[0]);
            const tubes = parseNumber(row.tubes ?? values[1]);
            const positive = parseNumber(row.positive ?? values[2]);
            const volumeMl = parseNumber(row.volumeMl ?? values[3]) ?? 1;
            assertPositive(dilution, 'dilution_factor_positive_required');
            assertPositive(tubes, 'positive_required');
            assertNonNegative(positive, 'positive_required');
            assertPositive(volumeMl, 'volume_positive_required');
            if (positive > tubes) throw new Error('out_of_range');
            return { dilution, tubes, positive, volumeMl };
        });
        if (!rows.length) throw new Error('insufficient_data');
        const positives = rows.reduce((sum, row) => sum + row.positive, 0);
        const totalVolume = rows.reduce((sum, row) => sum + (row.tubes * row.volumeMl * row.dilution), 0);
        const negativeVolume = rows.reduce((sum, row) => sum + ((row.tubes - row.positive) * row.volumeMl * row.dilution), 0);
        if (positives === 0) {
            return {
                rows,
                positives,
                totalVolume,
                negativeVolume,
                mpnPerMl: 0,
                mpnPer100Ml: 0,
                formula: 'Thomas approximation: MPN/mL = P / sqrt(N x T)',
                warnings: ['mpn_approximation_warning']
            };
        }
        assertPositive(totalVolume, 'volume_positive_required');
        assertPositive(negativeVolume, 'mpn_requires_negative_tubes');
        const mpnPerMl = positives / Math.sqrt(negativeVolume * totalVolume);
        return {
            rows,
            positives,
            totalVolume,
            negativeVolume,
            mpnPerMl,
            mpnPer100Ml: mpnPerMl * 100,
            formula: 'Thomas approximation: MPN/mL = P / sqrt(N x T)',
            warnings: ['mpn_approximation_warning']
        };
    }

    function qpcrEfficiency(input = {}) {
        const slope = parseNumber(input.slope);
        assertPositive(Math.abs(slope), 'positive_required');
        if (slope >= 0) throw new Error('qpcr_negative_slope_required');
        const efficiency = (Math.pow(10, -1 / slope) - 1) * 100;
        const status = efficiency >= 90 && efficiency <= 110 ? 'ok' : 'review';
        return {
            slope,
            efficiency,
            status,
            formula: 'Efficiency% = (10^(-1/slope) - 1) x 100'
        };
    }

    function qpcrDeltaDeltaCt(input = {}) {
        const ctTargetSample = parseNumber(input.ctTargetSample);
        const ctRefSample = parseNumber(input.ctRefSample);
        const ctTargetControl = parseNumber(input.ctTargetControl);
        const ctRefControl = parseNumber(input.ctRefControl);
        [ctTargetSample, ctRefSample, ctTargetControl, ctRefControl].forEach((value) => assertNonNegative(value, 'required_field'));
        const deltaCtSample = ctTargetSample - ctRefSample;
        const deltaCtControl = ctTargetControl - ctRefControl;
        const deltaDeltaCt = deltaCtSample - deltaCtControl;
        const foldChange = Math.pow(2, -deltaDeltaCt);
        return {
            deltaCtSample,
            deltaCtControl,
            deltaDeltaCt,
            foldChange,
            formula: 'Fold change = 2^-ΔΔCt'
        };
    }

    function dnaCopyNumber(input = {}) {
        const massG = convertMass(input.mass, input.massUnit || 'ng', 'g');
        const genomeSizeBp = parseNumber(input.genomeSizeBp ?? input.lengthBp);
        assertPositive(genomeSizeBp, 'positive_required');
        const copies = (massG * 6.02214076e23) / (genomeSizeBp * 660);
        return {
            massG,
            genomeSizeBp,
            copies,
            formula: 'copies = mass_g x NA / (bp x 660)'
        };
    }

    function ddpcrConcentration(input = {}) {
        const positiveDroplets = parseNumber(input.positiveDroplets);
        const totalDroplets = parseNumber(input.totalDroplets);
        const dropletVolumeNl = parseNumber(input.dropletVolumeNl) ?? 0.85;
        const dilutionFactor = parseNumber(input.dilutionFactor) ?? 1;
        assertNonNegative(positiveDroplets, 'positive_required');
        assertPositive(totalDroplets, 'positive_required');
        assertPositive(dropletVolumeNl, 'volume_positive_required');
        assertPositive(dilutionFactor, 'dilution_factor_positive_required');
        if (positiveDroplets >= totalDroplets) throw new Error('out_of_range');
        const lambda = -Math.log(1 - (positiveDroplets / totalDroplets));
        const copiesPerUl = (lambda / (dropletVolumeNl * 1e-3)) * dilutionFactor;
        return {
            positiveDroplets,
            totalDroplets,
            dropletVolumeNl,
            dilutionFactor,
            lambda,
            copiesPerUl,
            formula: 'copies/µL = -ln(1 - positive/total) / droplet volume µL'
        };
    }

    function od600Growth(input = {}) {
        const points = (input.points || parseDelimitedTable(input.values)).map((row) => {
            const values = Array.isArray(row) ? row : [row.time, row.od];
            return {
                time: parseNumber(row.time ?? values[0]),
                od: parseNumber(row.od ?? values[1])
            };
        }).filter((point) => Number.isFinite(point.time) && Number.isFinite(point.od) && point.od > 0);
        if (points.length < 2) throw new Error('insufficient_data');
        const regression = linearRegression(points.map((point) => ({ x: point.time, y: Math.log(point.od) })));
        const mu = regression.slope;
        const doublingTime = mu > 0 ? Math.log(2) / mu : null;
        return {
            points,
            mu,
            doublingTime,
            initialOd: points[0].od,
            finalOd: points[points.length - 1].od,
            foldChange: points[points.length - 1].od / points[0].od,
            r2: regression.r2,
            formula: 'ln(OD) = μ x t + b; doubling time = ln(2) / μ',
            warnings: mu <= 0 ? ['growth_rate_non_positive_warning'] : []
        };
    }

    function proteinAssay(input = {}) {
        const standards = (input.standards || parseDelimitedTable(input.standardsText)).map((row) => {
            const values = Array.isArray(row) ? row : [row.concentration, row.response];
            return {
                concentration: parseNumber(row.concentration ?? values[0]),
                response: parseNumber(row.response ?? values[1])
            };
        }).filter((row) => Number.isFinite(row.concentration) && Number.isFinite(row.response));
        if (standards.length < 2) throw new Error('insufficient_data');
        const model = linearRegression(standards.map((row) => ({ x: row.concentration, y: row.response })));
        if (model.slope === 0) throw new Error('zero_denominator');
        const minStandard = Math.min(...standards.map((row) => row.concentration));
        const maxStandard = Math.max(...standards.map((row) => row.concentration));
        const samples = (input.samples || parseDelimitedTable(input.samplesText)).map((row, index) => {
            const values = Array.isArray(row) ? row : [row.name, row.response, row.dilutionFactor];
            const maybeResponse = parseNumber(row.response ?? values[1]);
            const response = Number.isFinite(maybeResponse) ? maybeResponse : parseNumber(values[0]);
            const name = row.name || (Number.isFinite(maybeResponse) ? values[0] : `S${index + 1}`);
            const dilutionFactor = parseNumber(row.dilutionFactor ?? values[2]) ?? 1;
            assertPositive(dilutionFactor, 'dilution_factor_positive_required');
            const concentration = ((response - model.intercept) / model.slope) * dilutionFactor;
            return {
                name,
                response,
                dilutionFactor,
                concentration,
                status: concentration < minStandard || concentration > maxStandard ? 'review' : 'ok'
            };
        }).filter((row) => Number.isFinite(row.response));
        if (!samples.length) throw new Error('insufficient_data');
        return {
            standards,
            samples,
            slope: model.slope,
            intercept: model.intercept,
            r2: model.r2,
            formula: 'response = m x concentration + b',
            warnings: samples.some((row) => row.status === 'review') ? ['protein_assay_range_warning'] : []
        };
    }

    function enzymeActivity(input = {}) {
        const deltaAbs = parseNumber(input.deltaAbs);
        const timeMin = parseNumber(input.timeMin) ?? 1;
        const deltaAbsPerMin = parseNumber(input.deltaAbsPerMin) ?? (deltaAbs / timeMin);
        const extinctionCoefficient = parseNumber(input.extinctionCoefficient);
        const pathLengthCm = parseNumber(input.pathLengthCm) ?? 1;
        const reactionVolumeL = convertVolume(input.reactionVolume, input.reactionVolumeUnit || 'mL', 'L');
        const sampleVolumeMl = convertVolume(input.sampleVolume, input.sampleVolumeUnit || 'µL', 'mL');
        const dilutionFactor = parseNumber(input.dilutionFactor) ?? 1;
        const proteinConcentration = parseNumber(input.proteinConcentration);
        assertPositive(deltaAbsPerMin, 'positive_required');
        assertPositive(extinctionCoefficient, 'positive_required');
        assertPositive(pathLengthCm, 'positive_required');
        assertPositive(reactionVolumeL, 'volume_positive_required');
        assertPositive(sampleVolumeMl, 'volume_positive_required');
        assertPositive(dilutionFactor, 'dilution_factor_positive_required');
        const activityUmolMin = (deltaAbsPerMin * reactionVolumeL * 1e6 * dilutionFactor) / (extinctionCoefficient * pathLengthCm);
        const unitsPerMl = activityUmolMin / sampleVolumeMl;
        const specificActivity = Number.isFinite(proteinConcentration) && proteinConcentration > 0 ? unitsPerMl / proteinConcentration : null;
        return {
            deltaAbsPerMin,
            activityUmolMin,
            unitsPerMl,
            specificActivity,
            formula: 'U = ΔAbs/min x V(L) x 10^6 / (ε x path)'
        };
    }

    function parseWell(well) {
        const match = String(well || 'A1').trim().toUpperCase().match(/^([A-Z]+)(\d+)$/);
        if (!match) return { rowIndex: 0, column: 1 };
        let rowIndex = 0;
        for (const char of match[1]) rowIndex = (rowIndex * 26) + (char.charCodeAt(0) - 64);
        return { rowIndex: Math.max(0, rowIndex - 1), column: Math.max(1, Number.parseInt(match[2], 10) || 1) };
    }

    function rowNameFromIndex(index) {
        let value = index + 1;
        let name = '';
        while (value > 0) {
            const rem = (value - 1) % 26;
            name = String.fromCharCode(65 + rem) + name;
            value = Math.floor((value - 1) / 26);
        }
        return name;
    }

    function plateDesigner(input = {}) {
        const format = String(input.format || '96');
        const rowCount = format === '384' ? 16 : 8;
        const columnCount = format === '384' ? 24 : 12;
        const samples = Array.isArray(input.samples)
            ? input.samples.filter(Boolean)
            : String(input.samplesText || input.samples || '').split(/\r?\n|[,;]/).map((sample) => sample.trim()).filter(Boolean);
        if (!samples.length) throw new Error('insufficient_data');
        const replicates = Math.max(1, Math.floor(parseNumber(input.replicates) || 1));
        const start = parseWell(input.startWell || 'A1');
        const direction = input.direction || 'row';
        const wells = [];
        if (direction === 'column') {
            for (let col = 1; col <= columnCount; col += 1) {
                for (let row = 0; row < rowCount; row += 1) wells.push({ row, col, well: `${rowNameFromIndex(row)}${col}` });
            }
        } else {
            for (let row = 0; row < rowCount; row += 1) {
                for (let col = 1; col <= columnCount; col += 1) wells.push({ row, col, well: `${rowNameFromIndex(row)}${col}` });
            }
        }
        const startIndex = wells.findIndex((well) => well.row === start.rowIndex && well.col === start.column);
        const available = startIndex >= 0 ? wells.slice(startIndex) : wells;
        const needed = samples.length * replicates;
        if (needed > available.length) throw new Error('plate_not_enough_wells');
        const assignments = [];
        samples.forEach((sample) => {
            for (let replicate = 1; replicate <= replicates; replicate += 1) {
                const well = available[assignments.length];
                assignments.push({ well: well.well, sample, replicate });
            }
        });
        return {
            format,
            rowCount,
            columnCount,
            samples,
            replicates,
            assignments,
            formula: 'Sequential well assignment from selected start well'
        };
    }

    function pooling(input = {}) {
        const mode = input.mode || 'equal';
        const finalVolumeUl = input.finalVolume ? convertVolume(input.finalVolume, input.finalVolumeUnit || 'µL', 'µL') : null;
        const rows = (input.samples || parseDelimitedTable(input.samplesText)).map((row, index) => {
            const values = Array.isArray(row) ? row : [row.name, row.concentration];
            return {
                name: row.name || values[0] || `S${index + 1}`,
                concentration: parseNumber(row.concentration ?? values[1])
            };
        }).filter((row) => row.name);
        const sampleCount = rows.length || Math.floor(parseNumber(input.sampleCount) || 0);
        assertPositive(sampleCount, 'positive_required');
        const targetAmount = parseNumber(input.targetAmount);
        let poolRows;
        if (mode === 'normalized') {
            assertPositive(targetAmount, 'positive_required');
            poolRows = rows.map((row) => {
                assertPositive(row.concentration, 'concentration_positive_required');
                return {
                    name: row.name,
                    concentration: row.concentration,
                    volumeUl: targetAmount / row.concentration,
                    amount: targetAmount
                };
            });
        } else {
            if (!Number.isFinite(finalVolumeUl)) throw new Error('volume_positive_required');
            const volumeUl = finalVolumeUl / sampleCount;
            poolRows = Array.from({ length: sampleCount }, (_, index) => ({
                name: rows[index]?.name || `S${index + 1}`,
                concentration: rows[index]?.concentration ?? null,
                volumeUl,
                amount: Number.isFinite(rows[index]?.concentration) ? rows[index].concentration * volumeUl : null
            }));
        }
        const sampleVolumeTotalUl = poolRows.reduce((sum, row) => sum + row.volumeUl, 0);
        const diluentUl = Number.isFinite(finalVolumeUl) ? finalVolumeUl - sampleVolumeTotalUl : null;
        return {
            mode,
            rows: poolRows,
            sampleCount,
            targetAmount: Number.isFinite(targetAmount) ? targetAmount : null,
            finalVolumeUl,
            sampleVolumeTotalUl,
            diluentUl,
            formula: mode === 'normalized' ? 'Vsample = target amount / concentration' : 'Vsample = final pool volume / n',
            warnings: Number.isFinite(diluentUl) && diluentUl < 0 ? ['pool_volume_exceeded_warning'] : []
        };
    }

    function doeBasic(input = {}) {
        const factors = (input.factors || parseDelimitedTable(input.factorsText)).map((row, index) => {
            const values = Array.isArray(row) ? row : [row.name, row.low, row.high];
            return {
                name: row.name || values[0] || `F${index + 1}`,
                low: row.low ?? values[1],
                high: row.high ?? values[2]
            };
        }).filter((row) => row.name && row.low !== undefined && row.high !== undefined);
        if (!factors.length) throw new Error('insufficient_data');
        if (factors.length > 6) throw new Error('too_many_factors');
        const centerPoints = Math.max(0, Math.floor(parseNumber(input.centerPoints) || 0));
        const runs = [];
        const combinations = Math.pow(2, factors.length);
        for (let index = 0; index < combinations; index += 1) {
            const levels = {};
            factors.forEach((factor, factorIndex) => {
                levels[factor.name] = (index & (1 << factorIndex)) ? factor.high : factor.low;
            });
            runs.push({ type: 'factorial', levels });
        }
        for (let index = 0; index < centerPoints; index += 1) {
            const levels = {};
            factors.forEach((factor) => {
                const low = parseNumber(factor.low);
                const high = parseNumber(factor.high);
                levels[factor.name] = Number.isFinite(low) && Number.isFinite(high) ? (low + high) / 2 : `${factor.low}/${factor.high}`;
            });
            runs.push({ type: 'center', levels });
        }
        if (input.randomize) {
            for (let index = runs.length - 1; index > 0; index -= 1) {
                const swap = Math.floor(Math.random() * (index + 1));
                [runs[index], runs[swap]] = [runs[swap], runs[index]];
            }
        }
        return {
            factors,
            runs: runs.map((run, index) => ({ ...run, order: index + 1 })),
            formula: 'Full factorial runs = 2^k + center points'
        };
    }

    return {
        normalizeUnit,
        parseNumber,
        formatNumber,
        formatScientific,
        formatWithUnit,
        parseNumberList,
        mean,
        median,
        standardDeviation,
        rsd,
        cv,
        rpd,
        bias,
        zScore,
        linearRegression,
        calculateSSE,
        calculateRMSE,
        calculateR2,
        calculateAdjustedR2,
        calculateAIC,
        convertFlowToM3Day,
        convertWaterConcentrationToMgL,
        convertMass,
        convertVolume,
        convertMoles,
        convertMolarConcentration,
        convertMassVolumeConcentration,
        convertUnitValue,
        volumeEquivalences,
        massEquivalences,
        convertConcentrationBetween,
        concentrationEquivalences,
        convertPercentPpm,
        percentPpmEquivalences,
        convertTemperature,
        temperatureEquivalences,
        rpmToRcf,
        rcfToRpm,
        centrifugeEquivalences,
        convertToCaCO3,
        convertSpecies,
        getConcentrationKind,
        convertConcentration,
        autoFormatConcentration,
        autoFormatVolume,
        autoFormatMass,
        autoFormatMoles,
        formatConcentrationValue,
        molarityFromMass,
        molarityFromMoles,
        molarityFromMassVolume,
        dilutionSimple,
        dilutionReverse,
        serialDilution,
        prepareSolution,
        percentagePreparation,
        masterMix,
        mediumRecipe,
        bufferAcidBase,
        diluteStock,
        fitLinear,
        fitExponential,
        fitHill4PL,
        fitCalibrationModel,
        predictY,
        inversePredictX,
        calculateResiduals,
        calculateFitMetrics,
        compareModels,
        calculateUnknowns,
        parseCalibrationPaste,
        groupReplicates,
        exportCalibrationCsv,
        generateCalibrationSvg,
        standardPreparation,
        spikeRecovery,
        quickStats,
        lodLoqFromSlope,
        lodLoqFromBlanks,
        hardnessFromCaMg,
        alkalinityTitration,
        sampleNormalization,
        titrationGeneric,
        solutionLabel,
        controlChart,
        measurementUncertainty,
        advancedMdl,
        batchPlanner,
        specComparator,
        decisionRule,
        lsiRyznar,
        ionicBalance,
        chlorineDose,
        chlorineCt,
        chlorineDemand,
        chemicalDosing,
        flowLoad,
        streamMixing,
        cfuPlateCount,
        mpnThomas,
        qpcrEfficiency,
        qpcrDeltaDeltaCt,
        dnaCopyNumber,
        ddpcrConcentration,
        od600Growth,
        proteinAssay,
        enzymeActivity,
        plateDesigner,
        pooling,
        doeBasic
    };
}));

const AquaToolsCalc = module.exports || globalThis.AquaToolsCalc;
export default AquaToolsCalc;
