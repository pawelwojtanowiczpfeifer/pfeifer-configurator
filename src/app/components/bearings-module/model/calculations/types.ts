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
  | "q"
  | "compression"
  | "perforated205";

export type MyBearingsCalculationContext = {
  geometry: MyBearingsModuleParameters;
  forceAndDeformation: MyBearingsModuleForceAndDeformation;
  contactArea: MyBearingsContactArea;
  effectiveArea: MyBearingsEffectiveArea;
  hasStuds: boolean;
  studHoleDiameterMm: number;
  transverseStiffness?: number | null;
};

export type MyBearingsRotationVerificationResult = {
  allowableRotationPermille: number;
  rotationTechnicalApprovalPermille: number;
  rotationUnevennessPermille: number;
  requiredRotationPermille: number;
};

export type MyBearingsS65CalculationResult =
  MyBearingsRotationVerificationResult & {
  methodCode: "s65";
  shapeCoefficient: number;
  rawCompressiveStressMPa: number;
  compressiveStressLimitMPa: number;
  allowableHorizontalDeformationMm: number;
  tensileForceShortSideKN: number;
  tensileForceLongSideKN: number;
  horizontalForceKN: number | null;
  notes: string[];
};

export type MyBearingsS70CalculationResult =
  MyBearingsRotationVerificationResult & {
  methodCode: "s70";
  shapeCoefficient: number;
  rawCompressiveStressMPa: number;
  compressiveStressLimitMPa: number;
  allowableHorizontalDeformationMm: number;
  tensileForceShortSideKN: number;
  tensileForceLongSideKN: number;
  horizontalForceKN: number | null;
  notes: string[];
};

export type MyBearingsCR2000CalculationResult =
  MyBearingsRotationVerificationResult & {
  methodCode: "cr2000";
  shapeCoefficient: number;
  rawCompressiveStressMPa: number;
  compressiveStressLimitMPa: number;
  allowableHorizontalDeformationMm: number;
  tensileForceShortSideKN: number;
  tensileForceLongSideKN: number;
  horizontalForceKN: number | null;
  notes: string[];
};

export type MyBearingsTypeZCalculationResult =
  MyBearingsRotationVerificationResult & {
  methodCode: "typeZ";
  rawCompressiveStressMPa: number;
  compressiveStressLimitMPa: number;
  allowableHorizontalDeformationMm: number;
  tensileForceShortSideKN: number;
  tensileForceLongSideKN: number;
  horizontalForceKN: number | null;
  notes: string[];
};

export type MyBearingsQCalculationResult =
  MyBearingsRotationVerificationResult & {
  methodCode: "q";
  rawCompressiveStressMPa: number;
  compressiveStressLimitMPa: number;
  allowableHorizontalDeformationMm: number;
  tensileForceShortSideKN: number;
  tensileForceLongSideKN: number;
  horizontalForceKN: number | null;
  notes: string[];
};

export type MyBearingsCompressionCalculationResult =
  MyBearingsRotationVerificationResult & {
  methodCode: "compression";
  shapeCoefficient: number;
  rawCompressiveStressMPa: number;
  compressiveStressLimitMPa: number;
  allowableHorizontalDeformationMm: number;
  tensileForceShortSideKN: number;
  tensileForceLongSideKN: number;
  horizontalForceKN: number | null;
  notes: string[];
};

export type MyBearingsPerforated205CalculationResult =
  MyBearingsRotationVerificationResult & {
  methodCode: "perforated205";
  shapeCoefficient: number;
  rawCompressiveStressMPa: number;
  compressiveStressLimitMPa: number;
  allowableHorizontalDeformationMm: number;
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
  | MyBearingsQCalculationResult
  | MyBearingsCompressionCalculationResult
  | MyBearingsPerforated205CalculationResult;

export type MyBearingsCalculationCalculator = (
  context: MyBearingsCalculationContext,
) => MyBearingsCalculationResult;
