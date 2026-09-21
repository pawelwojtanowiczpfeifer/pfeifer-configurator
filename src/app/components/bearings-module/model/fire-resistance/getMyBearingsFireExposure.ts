import type {
  MyBearingsBeamTopHeadArrangement,
  MyBearingsConnectionType,
} from "../types";

export type MyBearingsFireExposedSideCount = 0 | 1 | 2;

export type MyBearingsFireExposure = {
  /** Number of exposed edges parallel to the A direction; reduces b. */
  exposedASides: MyBearingsFireExposedSideCount;
  /** Number of exposed edges parallel to the B direction; reduces a. */
  exposedBSides: MyBearingsFireExposedSideCount;
};

export type MyBearingsFireExposureInput = {
  connectionType: MyBearingsConnectionType;
  isEndNotchedBeam: boolean;
  beamTopHeadArrangement: MyBearingsBeamTopHeadArrangement;
};

const NO_FIRE_EXPOSURE: MyBearingsFireExposure = {
  exposedASides: 0,
  exposedBSides: 0,
};

/**
 * Returns the currently approved fire exposure map for a bearing detail.
 * This function deliberately has no dependency on dimensions, material data,
 * fire duration, or bearing selection.
 */
export function getMyBearingsFireExposure({
  connectionType,
  isEndNotchedBeam,
  beamTopHeadArrangement,
}: MyBearingsFireExposureInput): MyBearingsFireExposure {
  if (connectionType === "cantilever") {
    return isEndNotchedBeam
      ? { exposedASides: 2, exposedBSides: 0 }
      : { exposedASides: 2, exposedBSides: 1 };
  }

  if (beamTopHeadArrangement === "three-sided-head-upstand") {
    return isEndNotchedBeam
      ? NO_FIRE_EXPOSURE
      : { exposedASides: 0, exposedBSides: 1 };
  }

  if (
    beamTopHeadArrangement === "two-beams" ||
    beamTopHeadArrangement === "outer-head-upstand"
  ) {
    return isEndNotchedBeam
      ? { exposedASides: 2, exposedBSides: 0 }
      : { exposedASides: 2, exposedBSides: 1 };
  }

  return isEndNotchedBeam
    ? { exposedASides: 2, exposedBSides: 1 }
    : { exposedASides: 2, exposedBSides: 2 };
}
