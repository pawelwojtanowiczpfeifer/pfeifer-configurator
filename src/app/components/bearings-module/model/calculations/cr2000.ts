import type { MyBearingsCalculationCalculator } from "./types";
import { calculateRectangularBearing } from "./calculateRectangularBearing";

export const calculateCR2000: MyBearingsCalculationCalculator = (context) =>
  calculateRectangularBearing(context, {
    methodCode: "cr2000",
    rawCompressiveStress: (shapeCoefficient) => 6 * shapeCoefficient ** 1.44,
    compressiveStressLimitMPa: 28,
    hasHoleSensitivity: "studs",
    allowableRotationPermille: (shorterSideMm, thicknessMm) =>
      Math.min((400 * thicknessMm) / Math.max(shorterSideMm, 1), 40),
    rotationTechnicalApprovalPermille: 10,
    rotationUnevennessPermille: (shorterSideMm) =>
      625 / Math.max(shorterSideMm, 1),
  });
