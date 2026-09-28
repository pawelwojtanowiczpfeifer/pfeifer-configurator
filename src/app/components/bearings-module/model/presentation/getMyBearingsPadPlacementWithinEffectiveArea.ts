import { getMyBearingsContactArea } from "../getMyBearingsContactArea";
import { getMyBearingsEffectiveSurfaceArea } from "../getMyBearingsEffectiveSurfaceArea";
import type {
  MyBearingsConnectionType,
  MyBearingsModuleParameters,
} from "../types";
import {
  getMyBearingsHoleLayoutFromPadEdges,
} from "./getMyBearingsHoleLayoutFromPadEdges";

export type MyBearingsPadPlacementWithinEffectiveArea = {
  /** Final pad start measured from the first contact edge in a. */
  padAStartMm: number;
  /** Final pad start measured from the first contact edge in b. */
  padBStartMm: number;
  holeLayout: ReturnType<typeof getMyBearingsHoleLayoutFromPadEdges> | null;
};

type MyBearingsPadPlacementWithinEffectiveAreaInput = {
  geometry: MyBearingsModuleParameters;
  connectionType: MyBearingsConnectionType;
  padAMm: number;
  padBMm: number;
  hasStuds: boolean;
  holeDiameterMm: number | null;
};

function getContactStartBMm(
  geometry: MyBearingsModuleParameters,
  connectionType: MyBearingsConnectionType,
) {
  const supportLengthMm =
    connectionType === "beam-top" ? geometry.b3 : geometry.b1;

  return Math.max(0, (supportLengthMm - geometry.b2) / 2);
}

/**
 * Places the selected pad centrally in the effective bearing area. The pad
 * centre is therefore the intersection of the effective-area diagonals,
 * independently of the user-defined structural stud positions.
 */
export function getMyBearingsPadPlacementWithinEffectiveArea({
  geometry,
  connectionType,
  padAMm,
  padBMm,
  hasStuds,
  holeDiameterMm,
}: MyBearingsPadPlacementWithinEffectiveAreaInput): MyBearingsPadPlacementWithinEffectiveArea {
  const contactArea = getMyBearingsContactArea({
    ...geometry,
    connectionType,
  });
  const effectiveArea = getMyBearingsEffectiveSurfaceArea({
    ...geometry,
    connectionType,
  });
  const padAStartMm =
    geometry.cmin + (effectiveArea.effectiveWidth - padAMm) / 2;
  const padBStartMm =
    geometry.cmin + (effectiveArea.effectiveLength - padBMm) / 2;

  if (!hasStuds) {
    return { padAStartMm, padBStartMm, holeLayout: null };
  }

  if (holeDiameterMm == null) {
    throw new Error("A hole diameter is required when studs are enabled.");
  }

  const contactStartBMm = getContactStartBMm(geometry, connectionType);
  const studCenters = [
    {
      // e1 is measured from the opposite contact edge in the a direction.
      aMm: contactArea.contactWidth - geometry.e1,
      // e2 is measured from the support edge, not the first contact edge.
      bMm: geometry.e2 - contactStartBMm,
    },
    ...(geometry.n === 2
      ? [
          {
            aMm: contactArea.contactWidth - geometry.e1,
            bMm: geometry.e2 + geometry.e3 - contactStartBMm,
          },
        ]
      : []),
  ];

  return {
    padAStartMm,
    padBStartMm,
    holeLayout: getMyBearingsHoleLayoutFromPadEdges({
      padAStartMm,
      padBStartMm,
      padAMm,
      padBMm,
      holeDiameterMm,
      studCenters,
    }),
  };
}
