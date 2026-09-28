import { getCalculationForMethod } from "../calculations";
import type {
  MyBearingsCandidateEvaluation,
  MyBearingsCandidateEvaluationInput,
  MyBearingsCandidateCheck,
  MyBearingsCandidateDimensionalLimits,
} from "./types";

function getCheckStatus(
  value: number | undefined,
  limit: number,
): "pass" | "fail" | "skipped" {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return "skipped";
  }

  return value <= limit ? "pass" : "fail";
}

function getDimensionsCheckStatus(
  widthMm: number | undefined,
  lengthMm: number | undefined,
  limits: MyBearingsCandidateDimensionalLimits | undefined,
): "pass" | "fail" | "skipped" {
  if (!limits) {
    return "skipped";
  }

  if (typeof widthMm !== "number" || typeof lengthMm !== "number") {
    return "skipped";
  }

  return widthMm >= limits.minWidthMm &&
    widthMm <= limits.maxWidthMm &&
    lengthMm >= limits.minLengthMm &&
    lengthMm <= limits.maxLengthMm
    ? "pass"
    : "fail";
}

export function evaluateMyBearingsCandidate({
  methodCode,
  context,
  loadInput,
  dimensionalLimits,
}: MyBearingsCandidateEvaluationInput): MyBearingsCandidateEvaluation {
  const calculator = getCalculationForMethod(methodCode);

  if (!calculator) {
    throw new Error(`No calculation available for method ${methodCode}.`);
  }

  const calculation = calculator({
    ...context,
    forceAndDeformation: {
      ...context.forceAndDeformation,
      designVerticalForce: loadInput.designVerticalForceKN,
      bearingRotation: loadInput.bearingRotationPermille ?? 0,
      horizontalDeformation: loadInput.horizontalDeformationMm ?? 0,
    },
  });

  const designCompressiveStressKNPerMm2 =
    (loadInput.designVerticalForceKN * 1_000) /
    Math.max(context.effectiveArea.effectiveAreaMm2, 1);

  const compressiveStressLimitMPa = calculation.compressiveStressLimitMPa;
  const compressiveStressUsagePercent =
    (designCompressiveStressKNPerMm2 / Math.max(compressiveStressLimitMPa, 1)) *
    100;
  const checks: MyBearingsCandidateCheck[] = [
    {
      name: "compressiveStress",
      status: getCheckStatus(
        designCompressiveStressKNPerMm2,
        compressiveStressLimitMPa,
      ),
      valueKNPerMm2: designCompressiveStressKNPerMm2,
      limitKNPerMm2: compressiveStressLimitMPa,
    },
    {
      name: "bearingRotation",
      status: getCheckStatus(
        typeof loadInput.bearingRotationPermille === "number"
          ? calculation.requiredRotationPermille
          : undefined,
        calculation.allowableRotationPermille,
      ),
      valuePermille:
        typeof loadInput.bearingRotationPermille === "number"
          ? calculation.requiredRotationPermille
          : undefined,
      limitPermille: calculation.allowableRotationPermille,
    },
    {
      name: "horizontalDeformation",
      status: getCheckStatus(
        loadInput.horizontalDeformationMm,
        calculation.allowableHorizontalDeformationMm,
      ),
      valueMm: loadInput.horizontalDeformationMm,
      limitMm: calculation.allowableHorizontalDeformationMm,
    },
    {
      name: "dimensions",
      status: getDimensionsCheckStatus(
        context.effectiveArea.effectiveWidth,
        context.effectiveArea.effectiveLength,
        dimensionalLimits,
      ),
      valueWidthMm: context.effectiveArea.effectiveWidth,
      valueLengthMm: context.effectiveArea.effectiveLength,
      minWidthMm: dimensionalLimits?.minWidthMm,
      maxWidthMm: dimensionalLimits?.maxWidthMm,
      minLengthMm: dimensionalLimits?.minLengthMm,
      maxLengthMm: dimensionalLimits?.maxLengthMm,
    },
  ];

  const reasons = checks
    .filter((check) => check.status === "fail")
    .map((check) => {
      if (check.name === "dimensions") {
        return "dimensions exceed allowable limits.";
      }

      return `${check.name} exceeds allowable limit.`;
    });

  return {
    methodCode,
    calculation,
    loadInput,
    designCompressiveStressKNPerMm2,
    compressiveStressUsagePercent,
    checks,
    isValid: reasons.length === 0,
    reasons,
  };
}
