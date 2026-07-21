import type {
  MyBearingsCalculationCalculator,
  MyBearingsCalculationMethodCode,
} from "./types";
import { calculateCR2000 } from "./cr2000";
import { calculateS65 } from "./s65";
import { calculateS70 } from "./s70";
import { calculateQ } from "./q";
import { calculateTypeZ } from "./typeZ";

const calculationRegistry: Record<
  MyBearingsCalculationMethodCode,
  MyBearingsCalculationCalculator | null
> = {
  s65: calculateS65,
  s70: calculateS70,
  cr2000: calculateCR2000,
  typeZ: calculateTypeZ,
  q: calculateQ,
};

export function getCalculationForMethod(
  methodCode: MyBearingsCalculationMethodCode,
) {
  return calculationRegistry[methodCode];
}
