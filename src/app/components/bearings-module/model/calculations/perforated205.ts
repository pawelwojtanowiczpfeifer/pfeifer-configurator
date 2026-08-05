import type { MyBearingsCalculationCalculator } from "./types";
import { calculateRectangularBearing } from "./calculateRectangularBearing";

/**
 * Perforated Bearing 205 values from the manufacturer's catalogue.
 * The limit is governed by the shape-dependent permissible mean stress,
 * capped at 25 N/mm²; stud openings reduce the shape coefficient.
 */
export const calculatePerforated205: MyBearingsCalculationCalculator = (context) =>
  calculateRectangularBearing(context, {
    methodCode: "perforated205",
    rawCompressiveStress: (shapeCoefficient) =>
      (shapeCoefficient ** 2 + shapeCoefficient + 1) / 0.95,
    compressiveStressLimitMPa: 25,
    hasHoleSensitivity: "studs",
    allowableHorizontalDeformationMm: (thicknessMm) =>
      Math.max(0.55 * (thicknessMm - 1.9), 0),
    allowableRotationPermille: (shorterSideMm, thicknessMm) =>
      (160 * thicknessMm) / Math.max(shorterSideMm, 1),
  });
