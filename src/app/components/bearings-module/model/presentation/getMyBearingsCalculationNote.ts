import type {
  MyBearingsCandidateCheckName,
  MyBearingsCandidateCheckStatus,
  MyBearingsCandidateEvaluation,
} from "../evaluation/types";
import type { MyBearingsCommercialDescription } from "./getMyBearingsCommercialDescription";

export type MyBearingsCalculationNote = {
  bearing: {
    code: string;
    name: string;
    dimensions: string;
    openings: string | null;
    fireProtection: string | null;
  };
  uls: {
    designForceKN: number;
    designStressMPa: number;
    resistanceStressMPa: number;
    designResistanceKN: number;
    usagePercent: number;
    status: MyBearingsCandidateCheckStatus;
  };
  rotation: {
    isChecked: boolean;
    fromStructurePermille: number | null;
    technicalApprovalAdditionPermille: number | null;
    unevennessAdditionPermille: number | null;
    totalPermille: number | null;
    maximumPermille: number;
    status: MyBearingsCandidateCheckStatus;
  };
  displacement: {
    isChecked: boolean;
    valueMm: number | null;
    maximumMm: number;
    status: MyBearingsCandidateCheckStatus;
  };
  fire: {
    requirement: string;
    durationMinutes: number | null;
    designForceKN: number;
    designStressMPa: number;
    resistanceStressMPa: number;
    usagePercent: number;
    status: MyBearingsCandidateCheckStatus;
  } | null;
};

type GetMyBearingsCalculationNoteInput = {
  bearing: {
    code: string;
    name: string;
    commercialDescription: MyBearingsCommercialDescription;
  };
  evaluation: MyBearingsCandidateEvaluation;
  isRotationChecked: boolean;
  isDisplacementChecked: boolean;
  fire: {
    requirement: string;
    durationMinutes: number | null;
    evaluation: MyBearingsCandidateEvaluation;
  } | null;
};

function getCheckStatus(
  evaluation: MyBearingsCandidateEvaluation,
  name: MyBearingsCandidateCheckName,
) {
  return evaluation.checks.find((check) => check.name === name)?.status ?? "skipped";
}

export function getMyBearingsCalculationNote({
  bearing,
  evaluation,
  isRotationChecked,
  isDisplacementChecked,
  fire,
}: GetMyBearingsCalculationNoteInput): MyBearingsCalculationNote {
  const { calculation } = evaluation;
  const netAreaMm2 =
    (evaluation.loadInput.designVerticalForceKN * 1_000) /
    Math.max(evaluation.designCompressiveStressKNPerMm2, Number.EPSILON);

  return {
    bearing: {
      code: bearing.code,
      name: bearing.name,
      dimensions: bearing.commercialDescription.sizeDescription,
      openings: bearing.commercialDescription.holesDescription,
      fireProtection: bearing.commercialDescription.mineralWoolDescription,
    },
    uls: {
      designForceKN: evaluation.loadInput.designVerticalForceKN,
      designStressMPa: evaluation.designCompressiveStressKNPerMm2,
      resistanceStressMPa: calculation.compressiveStressLimitMPa,
      designResistanceKN:
        (calculation.compressiveStressLimitMPa * netAreaMm2) / 1_000,
      usagePercent: evaluation.compressiveStressUsagePercent,
      status: getCheckStatus(evaluation, "compressiveStress"),
    },
    rotation: {
      isChecked: isRotationChecked,
      fromStructurePermille: isRotationChecked
        ? evaluation.loadInput.bearingRotationPermille ?? null
        : null,
      technicalApprovalAdditionPermille: isRotationChecked
        ? calculation.rotationTechnicalApprovalPermille
        : null,
      unevennessAdditionPermille: isRotationChecked
        ? calculation.rotationUnevennessPermille
        : null,
      totalPermille: isRotationChecked
        ? calculation.requiredRotationPermille
        : null,
      maximumPermille: calculation.allowableRotationPermille,
      status: getCheckStatus(evaluation, "bearingRotation"),
    },
    displacement: {
      isChecked: isDisplacementChecked,
      valueMm: isDisplacementChecked
        ? evaluation.loadInput.horizontalDeformationMm ?? null
        : null,
      maximumMm: calculation.allowableHorizontalDeformationMm,
      status: getCheckStatus(evaluation, "horizontalDeformation"),
    },
    fire: fire
      ? {
          requirement: fire.requirement,
          durationMinutes: fire.durationMinutes,
          designForceKN: fire.evaluation.loadInput.designVerticalForceKN,
          designStressMPa: fire.evaluation.designCompressiveStressKNPerMm2,
          resistanceStressMPa:
            fire.evaluation.calculation.compressiveStressLimitMPa,
          usagePercent: fire.evaluation.compressiveStressUsagePercent,
          status: getCheckStatus(fire.evaluation, "compressiveStress"),
        }
      : null,
  };
}
