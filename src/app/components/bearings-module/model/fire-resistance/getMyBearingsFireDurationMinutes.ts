import type { MyBearingsModuleFireResistance } from "../types";

/**
 * Converts the selected fire-resistance class to the required fire duration.
 * `null` means that no fire-resistance check was requested.
 */
export function getMyBearingsFireDurationMinutes(
  fireResistance: MyBearingsModuleFireResistance,
): number | null {
  switch (fireResistance) {
    case "R30":
      return 30;
    case "R60":
      return 60;
    case "R120":
      return 120;
    case "not-specified":
      return null;
  }
}
