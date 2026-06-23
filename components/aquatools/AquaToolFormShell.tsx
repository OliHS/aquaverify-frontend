import React, { useMemo, useRef, useState } from 'react';
import { Copy, Download, Printer, RotateCcw, Share2 } from 'lucide-react';
import { calculateAquaTool } from '../../vendor/aquatools-core/index.js';
import type { Language } from '../../utils/translations';

type FieldDef = {
  name: string;
  label: Record<Language, string>;
  kind?: 'input' | 'select';
  options?: string[];
  inputMode?: 'decimal' | 'numeric';
};

type ToolDef = {
  id: string;
  coreToolId: string;
  exampleInputs: Record<string, string>;
};

type Props = {
  tool: ToolDef;
  labels: any;
  lang: Language;
  canonicalPath: string;
};

const localeByLang: Record<Language, string> = {
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR',
  it: 'it-IT',
  ca: 'ca-ES'
};

const FIELD_LABELS = {
  mode: { en: 'Mode', es: 'Modo', fr: 'Mode', it: 'Modalità', ca: 'Mode' },
  mass: { en: 'Mass', es: 'Masa', fr: 'Masse', it: 'Massa', ca: 'Massa' },
  massUnit: { en: 'Mass unit', es: 'Unidad de masa', fr: 'Unité de masse', it: 'Unità massa', ca: 'Unitat de massa' },
  molarMass: { en: 'Molar mass', es: 'Masa molar', fr: 'Masse molaire', it: 'Massa molare', ca: 'Massa molar' },
  volume: { en: 'Volume', es: 'Volumen', fr: 'Volume', it: 'Volume', ca: 'Volum' },
  volumeUnit: { en: 'Volume unit', es: 'Unidad de volumen', fr: 'Unité volume', it: 'Unità volume', ca: 'Unitat volum' },
  moles: { en: 'Moles', es: 'Moles', fr: 'Moles', it: 'Moli', ca: 'Mols' },
  molesUnit: { en: 'Moles unit', es: 'Unidad de moles', fr: 'Unité moles', it: 'Unità moli', ca: 'Unitat mols' },
  concentration: { en: 'Concentration', es: 'Concentración', fr: 'Concentration', it: 'Concentrazione', ca: 'Concentració' },
  concentrationUnit: { en: 'Concentration unit', es: 'Unidad de concentración', fr: 'Unité concentration', it: 'Unità concentrazione', ca: 'Unitat concentració' },
  cStock: { en: 'Stock concentration', es: 'Concentración stock', fr: 'Concentration stock', it: 'Concentrazione stock', ca: 'Concentració stock' },
  cStockUnit: { en: 'Stock unit', es: 'Unidad stock', fr: 'Unité stock', it: 'Unità stock', ca: 'Unitat stock' },
  cTarget: { en: 'Target concentration', es: 'Concentración objetivo', fr: 'Concentration cible', it: 'Concentrazione target', ca: 'Concentració objectiu' },
  cTargetUnit: { en: 'Target unit', es: 'Unidad objetivo', fr: 'Unité cible', it: 'Unità target', ca: 'Unitat objectiu' },
  finalVolume: { en: 'Final volume', es: 'Volumen final', fr: 'Volume final', it: 'Volume finale', ca: 'Volum final' },
  finalVolumeUnit: { en: 'Final volume unit', es: 'Unidad volumen final', fr: 'Unité volume final', it: 'Unità volume finale', ca: 'Unitat volum final' },
  c1: { en: 'C1 concentration', es: 'Concentración C1', fr: 'Concentration C1', it: 'Concentrazione C1', ca: 'Concentració C1' },
  c1Unit: { en: 'C1 unit', es: 'Unidad C1', fr: 'Unité C1', it: 'Unità C1', ca: 'Unitat C1' },
  v1: { en: 'V1 volume', es: 'Volumen V1', fr: 'Volume V1', it: 'Volume V1', ca: 'Volum V1' },
  v1Unit: { en: 'V1 unit', es: 'Unidad V1', fr: 'Unité V1', it: 'Unità V1', ca: 'Unitat V1' },
  c2: { en: 'C2 concentration', es: 'Concentración C2', fr: 'Concentration C2', it: 'Concentrazione C2', ca: 'Concentració C2' },
  c2Unit: { en: 'C2 unit', es: 'Unidad C2', fr: 'Unité C2', it: 'Unità C2', ca: 'Unitat C2' },
  v2: { en: 'V2 volume', es: 'Volumen V2', fr: 'Volume V2', it: 'Volume V2', ca: 'Volum V2' },
  v2Unit: { en: 'V2 unit', es: 'Unidad V2', fr: 'Unité V2', it: 'Unità V2', ca: 'Unitat V2' },
  c0: { en: 'Initial concentration', es: 'Concentración inicial', fr: 'Concentration initiale', it: 'Concentrazione iniziale', ca: 'Concentració inicial' },
  c0Unit: { en: 'Initial unit', es: 'Unidad inicial', fr: 'Unité initiale', it: 'Unità iniziale', ca: 'Unitat inicial' },
  factor: { en: 'Dilution factor', es: 'Factor de dilución', fr: 'Facteur de dilution', it: 'Fattore diluizione', ca: 'Factor de dilució' },
  steps: { en: 'Steps', es: 'Pasos', fr: 'Étapes', it: 'Passaggi', ca: 'Passos' },
  transfer: { en: 'Transfer volume', es: 'Volumen transferido', fr: 'Volume transféré', it: 'Volume trasferito', ca: 'Volum transferit' },
  transferUnit: { en: 'Transfer unit', es: 'Unidad transferencia', fr: 'Unité transfert', it: 'Unità trasferimento', ca: 'Unitat transferència' },
  category: { en: 'Category', es: 'Categoría', fr: 'Catégorie', it: 'Categoria', ca: 'Categoria' },
  value: { en: 'Value', es: 'Valor', fr: 'Valeur', it: 'Valore', ca: 'Valor' },
  fromUnit: { en: 'From unit', es: 'Unidad origen', fr: 'Unité source', it: 'Unità origine', ca: 'Unitat origen' },
  toUnit: { en: 'To unit', es: 'Unidad destino', fr: 'Unité destino', it: 'Unità destinazione', ca: 'Unitat destí' },
  radiusCm: { en: 'Rotor radius', es: 'Radio del rotor', fr: 'Rayon du rotor', it: 'Raggio rotore', ca: 'Radi del rotor' },
  colonies: { en: 'Colonies', es: 'Colonias', fr: 'Colonies', it: 'Colonie', ca: 'Colònies' },
  dilution: { en: 'Dilution fraction', es: 'Fracción de dilución', fr: 'Fraction de dilution', it: 'Frazione diluizione', ca: 'Fracció de dilució' },
  platedVolume: { en: 'Plated volume', es: 'Volumen sembrado', fr: 'Volume ensemencé', it: 'Volume seminato', ca: 'Volum sembrat' },
  platedVolumeUnit: { en: 'Plated unit', es: 'Unidad siembra', fr: 'Unité ensemencée', it: 'Unità semina', ca: 'Unitat sembra' },
  unspiked: { en: 'Unspiked sample', es: 'Muestra sin fortificar', fr: 'Échantillon non dopé', it: 'Campione non fortificato', ca: 'Mostra sense fortificar' },
  spikedMeasured: { en: 'Measured spiked sample', es: 'Fortificada medida', fr: 'Échantillon dopé mesuré', it: 'Fortificato misurato', ca: 'Fortificada mesurada' },
  added: { en: 'Added concentration', es: 'Concentración añadida', fr: 'Concentration ajoutée', it: 'Concentrazione aggiunta', ca: 'Concentració afegida' },
  a: { en: 'Result A', es: 'Resultado A', fr: 'Résultat A', it: 'Risultato A', ca: 'Resultat A' },
  b: { en: 'Result B', es: 'Resultado B', fr: 'Résultat B', it: 'Risultato B', ca: 'Resultat B' },
  ca: { en: 'Calcium', es: 'Calcio', fr: 'Calcium', it: 'Calcio', ca: 'Calci' },
  mg: { en: 'Magnesium', es: 'Magnesio', fr: 'Magnésium', it: 'Magnesio', ca: 'Magnesi' },
  acidVolume: { en: 'Acid volume', es: 'Volumen de ácido', fr: 'Volume acide', it: 'Volume acido', ca: 'Volum àcid' },
  acidVolumeUnit: { en: 'Acid unit', es: 'Unidad ácido', fr: 'Unité acide', it: 'Unità acido', ca: 'Unitat àcid' },
  acidNormality: { en: 'Acid normality', es: 'Normalidad ácido', fr: 'Normalité acide', it: 'Normalità acido', ca: 'Normalitat àcid' },
  sampleVolume: { en: 'Sample volume', es: 'Volumen muestra', fr: 'Volume échantillon', it: 'Volume campione', ca: 'Volum mostra' },
  sampleVolumeUnit: { en: 'Sample unit', es: 'Unidad muestra', fr: 'Unité échantillon', it: 'Unità campione', ca: 'Unitat mostra' },
  meqPerL: { en: 'Equivalent concentration', es: 'Concentración equivalente', fr: 'Concentration équivalente', it: 'Concentrazione equivalente', ca: 'Concentració equivalent' },
  fromSpecies: { en: 'Source species', es: 'Especie origen', fr: 'Espèce source', it: 'Specie origine', ca: 'Espècie origen' },
  toSpecies: { en: 'Target species', es: 'Especie destino', fr: 'Espèce cible', it: 'Specie destinazione', ca: 'Espècie destí' },
  unit: { en: 'Unit', es: 'Unidad', fr: 'Unité', it: 'Unità', ca: 'Unitat' }
} satisfies Record<string, Record<Language, string>>;

const MASS_UNITS = ['g', 'mg', 'µg', 'ug', 'ng'];
const VOLUME_UNITS = ['L', 'mL', 'µL', 'uL', 'nL'];
const MOLES_UNITS = ['mol', 'mmol', 'µmol', 'umol', 'nmol'];
const MOLAR_UNITS = ['M', 'mM', 'µM', 'uM', 'nM', 'pM'];
const MASS_VOLUME_UNITS = ['g/L', 'mg/L', 'µg/L', 'ug/L', 'ng/L', 'g/mL', 'mg/mL', 'µg/mL', 'ug/mL', 'ng/mL', 'µg/µL', 'ug/uL'];
const TEMP_UNITS = ['°C', '°F', 'K'];
const SPECIES = ['NO3', 'NO3-N', 'PO4', 'PO4-P', 'NH4', 'NH4-N', 'NO2', 'NO2-N'];

function label(name: string): Record<Language, string> {
  return FIELD_LABELS[name as keyof typeof FIELD_LABELS] || FIELD_LABELS.value;
}

function select(name: string, options: string[]): FieldDef {
  return { name, label: label(name), kind: 'select', options };
}

function input(name: string, inputMode: 'decimal' | 'numeric' = 'decimal'): FieldDef {
  return { name, label: label(name), kind: 'input', inputMode };
}

function getFields(toolId: string, values: Record<string, string>): FieldDef[] {
  if (toolId === 'molarity') {
    const mode = values.mode || 'mass';
    if (mode === 'moles') return [select('mode', ['mass', 'moles', 'massVolume']), input('moles'), select('molesUnit', MOLES_UNITS), input('volume'), select('volumeUnit', VOLUME_UNITS)];
    if (mode === 'massVolume') return [select('mode', ['mass', 'moles', 'massVolume']), input('concentration'), select('concentrationUnit', MASS_VOLUME_UNITS), input('molarMass')];
    return [select('mode', ['mass', 'moles', 'massVolume']), input('mass'), select('massUnit', MASS_UNITS), input('molarMass'), input('volume'), select('volumeUnit', VOLUME_UNITS)];
  }
  if (toolId === 'dilution') {
    const mode = values.mode || 'direct';
    if (mode === 'serial') return [select('mode', ['direct', 'solver', 'serial']), input('c0'), select('c0Unit', MOLAR_UNITS), input('factor'), input('steps', 'numeric'), input('transfer'), select('transferUnit', VOLUME_UNITS)];
    if (mode === 'solver') return [select('mode', ['direct', 'solver', 'serial']), input('c1'), select('c1Unit', [...MOLAR_UNITS, ...MASS_VOLUME_UNITS]), input('v1'), select('v1Unit', VOLUME_UNITS), input('c2'), select('c2Unit', [...MOLAR_UNITS, ...MASS_VOLUME_UNITS]), input('v2'), select('v2Unit', VOLUME_UNITS)];
    return [select('mode', ['direct', 'solver', 'serial']), input('cStock'), select('cStockUnit', [...MOLAR_UNITS, ...MASS_VOLUME_UNITS]), input('cTarget'), select('cTargetUnit', [...MOLAR_UNITS, ...MASS_VOLUME_UNITS]), input('finalVolume'), select('finalVolumeUnit', VOLUME_UNITS)];
  }
  if (toolId === 'unit-converter') {
    const category = values.category || 'volume';
    const units = category === 'mass' ? MASS_UNITS : category === 'moles' ? MOLES_UNITS : category === 'molarity' ? MOLAR_UNITS : category === 'temperature' ? TEMP_UNITS : category === 'mass-volume' || category === 'concentration' ? MASS_VOLUME_UNITS : VOLUME_UNITS;
    return [select('category', ['volume', 'mass', 'moles', 'molarity', 'mass-volume', 'temperature']), input('value'), select('fromUnit', units), select('toUnit', units), input('molarMass')];
  }
  if (toolId === 'rpm-rcf') return [select('mode', ['rpm_to_rcf', 'rcf_to_rpm']), input('value'), input('radiusCm')];
  if (toolId === 'cfu-calculator') return [input('colonies', 'numeric'), input('dilution'), input('platedVolume'), select('platedVolumeUnit', VOLUME_UNITS)];
  if (toolId === 'recovery-rpd') {
    const mode = values.mode || 'recovery';
    if (mode === 'rpd') return [select('mode', ['recovery', 'rpd']), input('a'), input('b')];
    return [select('mode', ['recovery', 'rpd']), input('unspiked'), input('spikedMeasured'), input('added')];
  }
  if (toolId === 'hardness-alkalinity') {
    const mode = values.mode || 'hardness';
    if (mode === 'alkalinity') return [select('mode', ['hardness', 'alkalinity', 'equivalents']), input('acidVolume'), select('acidVolumeUnit', VOLUME_UNITS), input('acidNormality'), input('sampleVolume'), select('sampleVolumeUnit', VOLUME_UNITS)];
    if (mode === 'equivalents') return [select('mode', ['hardness', 'alkalinity', 'equivalents']), input('meqPerL')];
    return [select('mode', ['hardness', 'alkalinity', 'equivalents']), input('ca'), input('mg')];
  }
  return [input('value'), select('unit', ['mg/L', 'µg/L']), select('fromSpecies', SPECIES), select('toSpecies', SPECIES)];
}

function modeLabel(value: string, lang: Language) {
  const labels: Record<string, Record<Language, string>> = {
    mass: { en: 'Mass', es: 'Masa', fr: 'Masse', it: 'Massa', ca: 'Massa' },
    moles: { en: 'Moles', es: 'Moles', fr: 'Moles', it: 'Moli', ca: 'Mols' },
    massVolume: { en: 'Mass/volume', es: 'Masa/volumen', fr: 'Masse/volume', it: 'Massa/volume', ca: 'Massa/volum' },
    direct: { en: 'Stock preparation', es: 'Preparación desde stock', fr: 'Préparation depuis stock', it: 'Preparazione da stock', ca: 'Preparació des de stock' },
    solver: { en: 'C1V1 solver', es: 'Solver C1V1', fr: 'Solveur C1V1', it: 'Solver C1V1', ca: 'Solver C1V1' },
    serial: { en: 'Serial dilution', es: 'Dilución seriada', fr: 'Dilution sériée', it: 'Diluizione seriale', ca: 'Dilució seriada' },
    rpm_to_rcf: { en: 'RPM to RCF', es: 'RPM a RCF', fr: 'RPM vers RCF', it: 'RPM a RCF', ca: 'RPM a RCF' },
    rcf_to_rpm: { en: 'RCF to RPM', es: 'RCF a RPM', fr: 'RCF vers RPM', it: 'RCF a RPM', ca: 'RCF a RPM' },
    recovery: { en: 'Recovery', es: 'Recuperación', fr: 'Récupération', it: 'Recupero', ca: 'Recuperació' },
    rpd: { en: 'RPD', es: 'RPD', fr: 'RPD', it: 'RPD', ca: 'RPD' },
    hardness: { en: 'Hardness', es: 'Dureza', fr: 'Dureté', it: 'Durezza', ca: 'Duresa' },
    alkalinity: { en: 'Alkalinity', es: 'Alcalinidad', fr: 'Alcalinité', it: 'Alcalinità', ca: 'Alcalinitat' },
    equivalents: { en: 'Equivalents', es: 'Equivalentes', fr: 'Équivalents', it: 'Equivalenti', ca: 'Equivalents' }
  };
  return labels[value]?.[lang] || value;
}

function formatNumber(value: unknown, lang: Language) {
  const number = Number(value);
  if (!Number.isFinite(number)) return '';
  return new Intl.NumberFormat(localeByLang[lang], { maximumSignificantDigits: 8 }).format(number);
}

function resultLines(calculation: any, lang: Language) {
  if (!calculation || calculation.errors?.length) return [];
  const p = calculation.primaryResult || {};
  switch (calculation.toolId) {
    case 'molarity':
      return [
        `M: ${formatNumber(p.valueM, lang)} mol/L`,
        `mM: ${formatNumber(p.mM, lang)} mM`,
        `µM: ${formatNumber(p.uM, lang)} µM`
      ];
    case 'dilution':
      if (p.stockVolume) return [`${formatNumber(p.stockVolume.value, lang)} ${p.stockVolume.unit}`, `${formatNumber(p.diluentVolume.value, lang)} ${p.diluentVolume.unit}`];
      if (p.formatted) return [p.formatted];
      return [p.v1Formatted ? `${formatNumber(p.v1Formatted.value, lang)} ${p.v1Formatted.unit}` : 'C1V1 = C2V2'];
    case 'unit-converter':
      return [`${formatNumber(p.value, lang)} ${p.unit}`];
    case 'rpm-rcf':
      return [`${formatNumber(p.rcf, lang)} ×g`, `${formatNumber(p.rpm, lang)} RPM`];
    case 'cfu-calculator':
      return [`${formatNumber(p.cfuPerMl, lang)} CFU/mL`, p.log10CfuPerMl !== null ? `log10: ${formatNumber(p.log10CfuPerMl, lang)}` : ''];
    case 'recovery-rpd':
      return p.rpd !== undefined ? [`RPD: ${formatNumber(p.rpd, lang)}%`] : [`Recovery: ${formatNumber(p.recovery, lang)}%`, `Bias: ${formatNumber(p.bias, lang)}%`];
    case 'hardness-alkalinity':
      return p.alkalinityAsCaCO3 !== undefined
        ? [`${formatNumber(p.alkalinityAsCaCO3, lang)} mg/L as CaCO3`]
        : [`${formatNumber(p.totalHardnessAsCaCO3 ?? p.asCaCO3, lang)} mg/L as CaCO3`];
    case 'chemical-species-converter':
      return [`${formatNumber(p.value, lang)} ${p.unit} ${p.toSpecies}`];
    default:
      return [JSON.stringify(p)];
  }
}

function toSummary(tool: ToolDef, calculation: any, labels: any, canonicalPath: string, lang: Language) {
  const lines = [
    'AquaTools Free',
    `Tool: ${tool.id}`,
    `Calculation version: ${calculation?.calculationVersion || '1.0.0'}`,
    `URL: https://aquaverify.com${canonicalPath}`,
    '',
    labels.formula,
    calculation?.formulaDisplay || '',
    '',
    labels.result,
    ...resultLines(calculation, lang),
    '',
    labels.warnings,
    ...(calculation?.warnings || []).map((item: any) => item.code),
    '',
    labels.disclaimer
  ];
  return lines.filter((line) => line !== '').join('\n');
}

function download(filename: string, text: string, type = 'text/plain') {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export const AquaToolFormShell: React.FC<Props> = ({ tool, labels, lang, canonicalPath }) => {
  const [values, setValues] = useState<Record<string, string>>(() => ({ ...tool.exampleInputs }));
  const [calculation, setCalculation] = useState<any>(null);
  const [status, setStatus] = useState('');
  const resultRef = useRef<HTMLDivElement>(null);
  const fields = useMemo(() => getFields(tool.coreToolId, values), [tool.coreToolId, values]);
  const hasResult = calculation && !calculation.errors?.length;
  const summary = hasResult ? toSummary(tool, calculation, labels, canonicalPath, lang) : '';

  const setValue = (name: string, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  const calculate = () => {
    const next = calculateAquaTool(tool.coreToolId, values);
    setCalculation(next);
    setStatus(next.errors?.length ? labels.errorSummary : labels.result);
    window.dispatchEvent(new CustomEvent('aquatools_calculation_success', {
      detail: { tool_id: tool.coreToolId, mode: values.mode || values.category || 'default', lang }
    }));
    window.setTimeout(() => resultRef.current?.focus(), 0);
  };

  const reset = () => {
    setValues({ ...tool.exampleInputs });
    setCalculation(null);
    setStatus('');
  };

  const copy = async (text: string, message: string) => {
    await navigator.clipboard?.writeText(text);
    setStatus(message);
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm" aria-labelledby="aquatool-form-title">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 id="aquatool-form-title" className="font-heading text-xl font-black text-primary">{labels.result}</h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">{labels.privacy}</p>
        </div>
        <span className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-black text-primary">
          v{calculation?.calculationVersion || '1.0.0'}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => {
          const id = `${tool.id}-${field.name}`;
          return (
            <label key={field.name} htmlFor={id} className="block">
              <span className="mb-1 block text-xs font-black uppercase tracking-[0.12em] text-slate-500">{field.label[lang]}</span>
              {field.kind === 'select' ? (
                <select
                  id={id}
                  value={values[field.name] || field.options?.[0] || ''}
                  onChange={(event) => setValue(field.name, event.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm font-bold text-slate-800 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                >
                  {(field.options || []).map((option) => (
                    <option key={option} value={option}>{modeLabel(option, lang)}</option>
                  ))}
                </select>
              ) : (
                <input
                  id={id}
                  value={values[field.name] || ''}
                  inputMode={field.inputMode || 'decimal'}
                  maxLength={40}
                  onChange={(event) => setValue(field.name, event.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                />
              )}
            </label>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" onClick={calculate} className="inline-flex items-center justify-center rounded-full bg-secondary px-5 py-3 text-sm font-black text-white shadow-lg shadow-cyan-500/20 transition hover:bg-primary">
          {labels.calculate}
        </button>
        <button type="button" onClick={reset} className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-black text-primary transition hover:border-cyan-200 hover:bg-cyan-50">
          <RotateCcw className="h-4 w-4" aria-hidden="true" /> {labels.reset}
        </button>
      </div>

      <div ref={resultRef} tabIndex={-1} aria-live="polite" className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-5 outline-none focus:ring-2 focus:ring-cyan-200">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">{status || labels.result}</p>
        {calculation?.errors?.length ? (
          <ul className="mt-3 space-y-2 text-sm font-bold text-rose-700">
            {calculation.errors.map((item: any) => <li key={item.code}>{item.code}</li>)}
          </ul>
        ) : hasResult ? (
          <>
            <div className="mt-3 space-y-1 font-heading text-2xl font-black text-slate-950">
              {resultLines(calculation, lang).filter(Boolean).map((line) => <p key={line}>{line}</p>)}
            </div>
            <ol className="mt-4 space-y-1 text-sm text-slate-600">
              {(calculation.steps || []).slice(0, 8).map((step: any) => (
                <li key={`${step.label}-${step.expression}`}>
                  <strong>{step.label}:</strong> {step.expression}{Number.isFinite(step.value) ? ` = ${formatNumber(step.value, lang)} ${step.unit || ''}` : ''}
                </li>
              ))}
            </ol>
            {calculation.warnings?.length > 0 && (
              <ul className="mt-4 space-y-1 text-sm text-amber-800">
                {calculation.warnings.map((item: any) => <li key={item.code}>{item.code}</li>)}
              </ul>
            )}
            <div className="mt-5 flex flex-wrap gap-2">
              <button type="button" onClick={() => copy(resultLines(calculation, lang).join('\n'), labels.copyResult)} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-primary">
                <Copy className="h-4 w-4" aria-hidden="true" /> {labels.copyResult}
              </button>
              <button type="button" onClick={() => copy(summary, labels.copySummary)} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-primary">
                <Copy className="h-4 w-4" aria-hidden="true" /> {labels.copySummary}
              </button>
              <button type="button" onClick={() => copy(`https://aquaverify.com${canonicalPath}`, labels.copySummary)} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-primary">
                <Share2 className="h-4 w-4" aria-hidden="true" /> {labels.shareUrl}
              </button>
              <button type="button" onClick={() => download(`aquatools-${tool.id}-${lang}.txt`, summary)} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-primary">
                <Download className="h-4 w-4" aria-hidden="true" /> {labels.downloadTxt}
              </button>
              <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-primary">
                <Printer className="h-4 w-4" aria-hidden="true" /> {labels.print}
              </button>
            </div>
          </>
        ) : (
          <p className="mt-3 text-sm text-slate-600">{labels.noResult}</p>
        )}
      </div>
    </section>
  );
};
