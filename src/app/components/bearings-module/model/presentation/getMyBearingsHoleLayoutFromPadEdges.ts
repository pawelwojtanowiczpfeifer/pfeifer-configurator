import type { MyBearingsHoleLayoutFromPadEdges } from "./getMyBearingsCommercialDescription";

type MyBearingsPlanPoint = {
  /** Coordinate in the a direction, measured in one shared plan coordinate system. */
  aMm: number;
  /** Coordinate in the b direction, measured in one shared plan coordinate system. */
  bMm: number;
};

export type MyBearingsHoleLayoutFromPadEdgesInput = {
  /** Position of the first a edge of the final pad in the shared coordinate system. */
  padAStartMm: number;
  /** Position of the first b edge of the final pad in the shared coordinate system. */
  padBStartMm: number;
  padAMm: number;
  padBMm: number;
  holeDiameterMm: number;
  studCenters: MyBearingsPlanPoint[];
};

const COORDINATE_TOLERANCE_MM = 0.001;

/**
 * Converts structural stud centres into catalogue distances measured from the
 * final pad edges. It deliberately receives the pad placement explicitly:
 * connection-specific drawing or support-placement rules must not be guessed
 * in commercial formatting.
 */
export function getMyBearingsHoleLayoutFromPadEdges({
  padAStartMm,
  padBStartMm,
  padAMm,
  padBMm,
  holeDiameterMm,
  studCenters,
}: MyBearingsHoleLayoutFromPadEdgesInput): MyBearingsHoleLayoutFromPadEdges {
  if (studCenters.length < 1 || studCenters.length > 2) {
    throw new Error("Commercial hole notation supports one or two studs.");
  }

  const localStudCenters = studCenters
    .map((center) => ({
      aMm: center.aMm - padAStartMm,
      bMm: center.bMm - padBStartMm,
    }))
    .sort((left, right) => left.bMm - right.bMm);
  const holeRadiusMm = holeDiameterMm / 2;

  const hasHoleOutsidePad = localStudCenters.some(
    (center) =>
      center.aMm - holeRadiusMm < -COORDINATE_TOLERANCE_MM ||
      center.aMm + holeRadiusMm > padAMm + COORDINATE_TOLERANCE_MM ||
      center.bMm - holeRadiusMm < -COORDINATE_TOLERANCE_MM ||
      center.bMm + holeRadiusMm > padBMm + COORDINATE_TOLERANCE_MM,
  );

  if (hasHoleOutsidePad) {
    throw new Error("A stud hole falls outside the final bearing pad.");
  }

  const aAxisCenterMm = localStudCenters[0].aMm;
  const hasDifferentAAxis = localStudCenters.some(
    (center) =>
      Math.abs(center.aMm - aAxisCenterMm) > COORDINATE_TOLERANCE_MM,
  );

  if (hasDifferentAAxis) {
    throw new Error(
      "Commercial hole notation requires all stud centres on one a-axis.",
    );
  }

  return {
    aAxisCenterMm,
    bAxisCentersMm: localStudCenters.map((center) => center.bMm),
  };
}
