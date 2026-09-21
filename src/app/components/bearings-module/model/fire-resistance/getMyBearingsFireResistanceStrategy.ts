export type MyBearingsFireResistanceStrategy =
  | "not-required"
  | "calculate-charring"
  | "mineral-wool-required";

export type MyBearingsFireResistanceStrategyInput = {
  /** `null` means the user did not request a fire-resistance class. */
  fireDurationMinutes: number | null;
  /**
   * Rate stored for the selected bearing type and thickness. A missing or
   * non-positive rate is not evidence of zero degradation; it requires cover.
   */
  degradationRateWithoutCoverMmPerMinute: number | null | undefined;
};

/**
 * Resolves the approved fire-resistance path for a selected pad material.
 * A positive unprotected degradation rate permits charring verification.
 * Zero or no rate requires mineral wool whenever fire resistance is requested.
 */
export function getMyBearingsFireResistanceStrategy({
  fireDurationMinutes,
  degradationRateWithoutCoverMmPerMinute,
}: MyBearingsFireResistanceStrategyInput): MyBearingsFireResistanceStrategy {
  if (fireDurationMinutes == null) {
    return "not-required";
  }

  return degradationRateWithoutCoverMmPerMinute != null &&
    degradationRateWithoutCoverMmPerMinute > 0
    ? "calculate-charring"
    : "mineral-wool-required";
}
