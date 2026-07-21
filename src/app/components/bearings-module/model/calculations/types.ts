import type {
  MyBearingsContactArea,
  MyBearingsEffectiveArea,
  MyBearingsModuleForceAndDeformation,
  MyBearingsModuleParameters,
} from "../types";

export type MyBearingsCalculationMethodCode =
  | "s65"
  | "s70"
  | "cr2000"
  | "typeZ"
  | "q";

export type MyBearingsCalculationContext = {
  geometry: MyBearingsModuleParameters;
  forceAndDeformation: MyBearingsModuleForceAndDeformation;
  contactArea: MyBearingsContactArea;
  effectiveArea: MyBearingsEffectiveArea;
  hasStuds: boolean;
  transverseStiffness?: number | null;
};

export type MyBearingsS65CalculationResult = {
  methodCode: "s65";
  shapeCoefficient: number;
  rawCompressiveStressMPa: number;
  compressiveStressLimitMPa: number;
  allowableHorizontalDeformationMm: number;
  allowableRotationPermille: number;
  tensileForceShortSideKN: number;
  tensileForceLongSideKN: number;
  horizontalForceKN: number | null;
  notes: string[];
};

export type MyBearingsS70CalculationResult = {
  methodCode: "s70";
  shapeCoefficient: number;
  rawCompressiveStressMPa: number;
  compressiveStressLimitMPa: number;
  allowableHorizontalDeformationMm: number;
  allowableRotationPermille: number;
  tensileForceShortSideKN: number;
  tensileForceLongSideKN: number;
  horizontalForceKN: number | null;
  notes: string[];
};

export type MyBearingsCR2000CalculationResult = {
  methodCode: "cr2000";
  shapeCoefficient: number;
  rawCompressiveStressMPa: number;
  compressiveStressLimitMPa: number;
  allowableHorizontalDeformationMm: number;
  allowableRotationPermille: number;
  tensileForceShortSideKN: number;
  tensileForceLongSideKN: number;
  horizontalForceKN: number | null;
  notes: string[];
};

export type MyBearingsTypeZCalculationResult = {
  methodCode: "typeZ";
  rawCompressiveStressMPa: number;
  compressiveStressLimitMPa: number;
  allowableHorizontalDeformationMm: number;
  allowableRotationPermille: number;
  tensileForceShortSideKN: number;
  tensileForceLongSideKN: number;
  horizontalForceKN: number | null;
  notes: string[];
};

export type MyBearingsQCalculationResult = {
  methodCode: "q";
  rawCompressiveStressMPa: number;
  compressiveStressLimitMPa: number;
  allowableHorizontalDeformationMm: number;
  allowableRotationPermille: number;
  tensileForceShortSideKN: number;
  tensileForceLongSideKN: number;
  horizontalForceKN: number | null;
  notes: string[];
};

export type MyBearingsCalculationResult =
  | MyBearingsS65CalculationResult
  | MyBearingsS70CalculationResult
  | MyBearingsCR2000CalculationResult
  | MyBearingsTypeZCalculationResult
  | MyBearingsQCalculationResult;

export type MyBearingsCalculationCalculator = (
  context: MyBearingsCalculationContext,
) => MyBearingsCalculationResult;
