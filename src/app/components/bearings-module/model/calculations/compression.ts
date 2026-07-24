import type { MyBearingsCalculationCalculator } from "./types";
import { calculateRectangularBearing } from "./calculateRectangularBearing";

export const calculateCompression: MyBearingsCalculationCalculator = (context) =>
  calculateRectangularBearing(context, {
    methodCode: "compression",
    rawCompressiveStress: (shapeCoefficient) =>
      (shapeCoefficient ** 2 + shapeCoefficient + 1) / 2,
    compressiveStressLimitMPa: 5,
    hasHoleSensitivity: "studs",
    allowableHorizontalDeformationMm: (thicknessMm) =>
      Math.max(0.6 * (thicknessMm - 2), 0),
    allowableRotationPermille: (shorterSideMm, thicknessMm) =>
      (200 * thicknessMm) / Math.max(shorterSideMm, 1),
  });
