import type {
  MyBearingsCalculationContext,
  MyBearingsCalculationMethodCode,
  MyBearingsCalculationResult,
} from "../calculations";

export type MyBearingsCandidateLoadInput = {
  designVerticalForceKN: number;
  bearingRotationPermille?: number;
  horizontalDeformationMm?: number;
};

export type MyBearingsCandidateCheckStatus = "pass" | "fail" | "skipped";

export type MyBearingsCandidateDimensionalLimits = {
  minWidthMm: number;
  maxWidthMm: number;
  minLengthMm: number;
  maxLengthMm: number;
};

export type MyBearingsCandidateCheckName =
  | "compressiveStress"
  | "bearingRotation"
  | "horizontalDeformation"
  | "dimensions"
  | "strength";

export type MyBearingsCandidateCheck = {
  name: MyBearingsCandidateCheckName;
  status: MyBearingsCandidateCheckStatus;
  valueKNPerMm2?: number;
  valuePermille?: number;
  valueMm?: number;
  valueWidthMm?: number;
  valueLengthMm?: number;
  limitKNPerMm2?: number;
  limitPermille?: number;
  limitMm?: number;
  minWidthMm?: number;
  maxWidthMm?: number;
  minLengthMm?: number;
  maxLengthMm?: number;
};

export type MyBearingsCandidateEvaluation = {
  methodCode: MyBearingsCalculationMethodCode;
  calculation: MyBearingsCalculationResult;
  loadInput: MyBearingsCandidateLoadInput;
  designCompressiveStressKNPerMm2: number;
  compressiveStressUsagePercent: number;
  checks: MyBearingsCandidateCheck[];
  isValid: boolean;
  reasons: string[];
};

export type MyBearingsCandidateEvaluationInput = {
  methodCode: MyBearingsCalculationMethodCode;
  context: MyBearingsCalculationContext;
  loadInput: MyBearingsCandidateLoadInput;
  dimensionalLimits?: MyBearingsCandidateDimensionalLimits;
};
