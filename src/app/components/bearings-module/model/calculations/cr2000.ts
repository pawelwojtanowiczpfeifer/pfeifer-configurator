import type { MyBearingsCalculationCalculator } from "./types";
import { calculateRectangularBearing } from "./calculateRectangularBearing";

export const calculateCR2000: MyBearingsCalculationCalculator = (context) =>
  calculateRectangularBearing(context, {
    methodCode: "cr2000",
    rawCompressiveStress: (shapeCoefficient) => 6 * shapeCoefficient ** 1.44,
    compressiveStressLimitMPa: 28,
    hasHoleSensitivity: "studs",
  });
