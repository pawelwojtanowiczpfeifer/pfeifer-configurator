import type { MyBearingsModuleFireResistance } from "../types";

export type MyBearingsMineralWoolRequirement = {
  /** Required minimum width of the mineral-wool strip, in mm. */
  minWidthMm: number;
};

/**
 * Returns the Ciflamon mineral-wool requirement from the approval.
 * The wool thickness is the bearing gap `tc` and is therefore supplied by
 * the geometry, not by this fire-class mapping.
 */
export function getMyBearingsMineralWoolRequirement(
  fireResistance: MyBearingsModuleFireResistance,
): MyBearingsMineralWoolRequirement | null {
  switch (fireResistance) {
    case "R30":
    case "R60":
      return { minWidthMm: 25 };
    case "R120":
      return { minWidthMm: 45 };
    case "not-specified":
      return null;
  }
}
