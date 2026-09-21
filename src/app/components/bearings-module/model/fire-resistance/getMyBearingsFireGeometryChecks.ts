import type { MyBearingsFireExposure } from "./getMyBearingsFireExposure";

export type MyBearingsFireMinimumSCheck = {
  availableMm: number;
  requiredMm: number;
  isValid: boolean;
};

/**
 * The approval's S dimension is the smaller horizontal contact dimension.
 * Both contact width and contact length must therefore meet the DB minimum.
 */
export function getMyBearingsFireMinimumSCheck({
  contactWidthMm,
  contactLengthMm,
  minSDimensionMm,
}: {
  contactWidthMm: number;
  contactLengthMm: number;
  minSDimensionMm: number;
}): MyBearingsFireMinimumSCheck {
  const availableMm = Math.min(contactWidthMm, contactLengthMm);

  return {
    availableMm,
    requiredMm: minSDimensionMm,
    isValid: availableMm >= minSDimensionMm,
  };
}

export type MyBearingsMineralWoolFitCheck = {
  availableCoverMm: number;
  requiredCoverMm: number;
  isValid: boolean;
};

/**
 * A selected bearing is constrained to the effective area, so c_min is the
 * guaranteed clear cover between it and every physical contact edge. Mineral
 * wool is accepted only when its prescribed strip width fits into that cover.
 */
export function getMyBearingsMineralWoolFitCheck({
  cminMm,
  requiredCoverMm,
  exposure,
}: {
  cminMm: number;
  requiredCoverMm: number;
  exposure: MyBearingsFireExposure;
}): MyBearingsMineralWoolFitCheck {
  const hasFireExposure =
    exposure.exposedASides > 0 || exposure.exposedBSides > 0;

  return {
    availableCoverMm: cminMm,
    requiredCoverMm: hasFireExposure ? requiredCoverMm : 0,
    isValid: !hasFireExposure || cminMm >= requiredCoverMm,
  };
}
