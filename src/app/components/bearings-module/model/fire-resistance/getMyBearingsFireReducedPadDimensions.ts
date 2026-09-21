import type { MyBearingsFireExposure } from "./getMyBearingsFireExposure";

export type MyBearingsFireReducedPadDimensionsInput = {
  /** Pad dimension in the A direction, in mm. */
  aMm: number;
  /** Pad dimension in the B direction, in mm. */
  bMm: number;
  /** Charring rate supplied for the selected pad material, in mm/min. */
  charringRateMmPerMinute: number;
  /** Fire duration required by the selected resistance class, in minutes. */
  fireDurationMinutes: number;
  exposure: MyBearingsFireExposure;
};

export type MyBearingsFireReducedPadDimensions = {
  /** Charring depth from one exposed edge, in mm. */
  charringDepthMm: number;
  /** Remaining A dimension after charring, in mm. */
  fireReducedAMm: number;
  /** Remaining B dimension after charring, in mm. */
  fireReducedBMm: number;
  /** Remaining pad area after charring, in mm². */
  fireReducedAreaMm2: number;
  /** True when charring consumes at least one pad direction entirely. */
  isFullyCharred: boolean;
};

/**
 * Reduces a pad's A and B dimensions by the approved fire exposure map.
 * An edge parallel to A reduces B; an edge parallel to B reduces A.
 *
 * This is intentionally independent of fire class, database data, and the
 * bearing selection. Its caller supplies the duration and material rate.
 */
export function getMyBearingsFireReducedPadDimensions({
  aMm,
  bMm,
  charringRateMmPerMinute,
  fireDurationMinutes,
  exposure,
}: MyBearingsFireReducedPadDimensionsInput): MyBearingsFireReducedPadDimensions {
  const charringDepthMm = charringRateMmPerMinute * fireDurationMinutes;
  const fireReducedAMm = Math.max(
    aMm - exposure.exposedBSides * charringDepthMm,
    0,
  );
  const fireReducedBMm = Math.max(
    bMm - exposure.exposedASides * charringDepthMm,
    0,
  );

  return {
    charringDepthMm,
    fireReducedAMm,
    fireReducedBMm,
    fireReducedAreaMm2: fireReducedAMm * fireReducedBMm,
    isFullyCharred: fireReducedAMm === 0 || fireReducedBMm === 0,
  };
}
