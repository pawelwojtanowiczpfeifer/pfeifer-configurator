import type { MyBearingsCalculationCalculator } from "./types";
import { calculateRectangularBearing } from "./calculateRectangularBearing";

export const calculateS70: MyBearingsCalculationCalculator = (context) =>
  calculateRectangularBearing(context, {
    methodCode: "s70",
    rawCompressiveStress: (shapeCoefficient) => 6.99 * shapeCoefficient,
    compressiveStressLimitMPa: 21,
    hasHoleSensitivity: "studs",
  });
