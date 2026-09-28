import type { MyBearingsCalculationCalculator } from "./types";
import { calculateRectangularBearing } from "./calculateRectangularBearing";

export const calculateS65: MyBearingsCalculationCalculator = (context) =>
  calculateRectangularBearing(context, {
    methodCode: "s65",
    rawCompressiveStress: (shapeCoefficient) => 4.03 * shapeCoefficient ** 1.16,
    compressiveStressLimitMPa: 14,
    hasHoleSensitivity: "studs",
    rotationTechnicalApprovalPermille: 10,
    rotationUnevennessPermille: (shorterSideMm) =>
      625 / Math.max(shorterSideMm, 1),
  });
