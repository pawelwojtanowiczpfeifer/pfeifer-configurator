import { describe, expect, it } from "vitest";
import type { MyBearingsCandidateEvaluation } from "../evaluation/types";
import { getMyBearingsCalculationNote } from "./getMyBearingsCalculationNote";

const evaluation = {
  methodCode: "s65",
  loadInput: {
    designVerticalForceKN: 100,
    bearingRotationPermille: 10,
    horizontalDeformationMm: 3,
  },
  designCompressiveStressKNPerMm2: 2,
  compressiveStressUsagePercent: 20,
  calculation: {
    methodCode: "s65",
    shapeCoefficient: 4,
    rawCompressiveStressMPa: 10,
    compressiveStressLimitMPa: 10,
    allowableHorizontalDeformationMm: 7.8,
    allowableRotationPermille: 40,
    rotationTechnicalApprovalPermille: 10,
    rotationUnevennessPermille: 3.125,
    requiredRotationPermille: 23.125,
    tensileForceShortSideKN: 0,
    tensileForceLongSideKN: 0,
    horizontalForceKN: null,
    notes: [],
  },
  checks: [
    { name: "compressiveStress", status: "pass" },
    { name: "bearingRotation", status: "pass" },
    { name: "horizontalDeformation", status: "skipped" },
    { name: "dimensions", status: "pass" },
  ],
  isValid: true,
  reasons: [],
} as MyBearingsCandidateEvaluation;

describe("getMyBearingsCalculationNote", () => {
  it("creates a serializable snapshot of the selection and verification data", () => {
    const result = getMyBearingsCalculationNote({
      bearing: {
        code: "S65-300x200x15",
        name: "Compact Bearing S65",
        commercialDescription: {
          catalogCode: "Comp S65 300x200x15-2o",
          catalogDescription: "Calenberg Compact Bearing S65",
          sizeDescription: "300 × 200 × 15 mm",
          holesDescription: "2 ϕ 30: 50/200/50 × 100/100",
          mineralWoolDescription: null,
        },
      },
      evaluation,
      isRotationChecked: true,
      isDisplacementChecked: false,
      fire: null,
    });

    expect(result).toMatchObject({
      bearing: {
        dimensions: "300 × 200 × 15 mm",
        openings: "2 ϕ 30: 50/200/50 × 100/100",
      },
      uls: {
        designResistanceKN: 500,
        status: "pass",
      },
      rotation: {
        isChecked: true,
        totalPermille: 23.125,
        status: "pass",
      },
      displacement: {
        isChecked: false,
        valueMm: null,
        maximumMm: 7.8,
        status: "skipped",
      },
      fire: null,
    });
    expect(JSON.stringify(result)).toBeTypeOf("string");
  });
});
