export type AquaToolWarning = {
  code: string;
  severity: 'info' | 'warning';
  messageKey: string;
};

export type AquaToolError = {
  code: string;
  field?: string;
  messageKey: string;
};

export type AquaToolCalculationResult<TPrimary, TSecondary = unknown> = {
  toolId: string;
  calculationVersion: string;
  normalizedInputs: Record<string, { value: number; unit?: string } | null | undefined>;
  primaryResult: TPrimary | null;
  secondaryResults?: TSecondary;
  formulaId: string;
  formulaDisplay: string;
  steps: Array<{
    label: string;
    expression: string;
    value?: number;
    unit?: string;
  }>;
  warnings: AquaToolWarning[];
  errors: AquaToolError[];
};

export type AquaToolId =
  | 'molarity'
  | 'dilution'
  | 'unit-converter'
  | 'rpm-rcf'
  | 'cfu-calculator'
  | 'recovery-rpd'
  | 'hardness-alkalinity'
  | 'chemical-species-converter';

export declare const calculationVersion: string;
export declare const packageVersion: string;
export declare const publicToolIds: readonly AquaToolId[];
export declare function calculateAquaTool(toolId: AquaToolId, input: Record<string, unknown>): AquaToolCalculationResult<unknown>;
export declare function calculateMolarity(input: Record<string, unknown>): AquaToolCalculationResult<unknown>;
export declare function calculateDilution(input: Record<string, unknown>): AquaToolCalculationResult<unknown>;
export declare function calculateUnitConversion(input: Record<string, unknown>): AquaToolCalculationResult<unknown>;
export declare function calculateRpmRcf(input: Record<string, unknown>): AquaToolCalculationResult<unknown>;
export declare function calculateCfu(input: Record<string, unknown>): AquaToolCalculationResult<unknown>;
export declare function calculateRecoveryRpd(input: Record<string, unknown>): AquaToolCalculationResult<unknown>;
export declare function calculateHardnessAlkalinity(input: Record<string, unknown>): AquaToolCalculationResult<unknown>;
export declare function calculateChemicalSpecies(input: Record<string, unknown>): AquaToolCalculationResult<unknown>;
