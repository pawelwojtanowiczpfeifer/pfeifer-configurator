import type {
  MyBearingsCalculationContext,
  MyBearingsCalculationResult,
} from "./types";
import { getRectangularShapeCoefficient } from "./getRectangularShapeCoefficient";
import { getStudHoleDiameter } from "./getStudHoleDiameter";

type RectangularBearingFormula = {
  methodCode: "s65" | "s70" | "cr2000";
  rawCompressiveStress: (shapeCoefficient: number) => number;
  compressiveStressLimitMPa: number;
  hasHoleSensitivity?: "none" | "studs";
};

function getTransverseForce(
  transverseStiffness: number | null | undefined,
  effectiveAreaMm2: number,
  horizontalDeformationMm: number,
) {
  if (
    typeof transverseStiffness !== "number" ||
    !Number.isFinite(transverseStiffness)
  ) {
    return null;
  }

  return (
    (transverseStiffness * horizontalDeformationMm * effectiveAreaMm2) /
    20_000
  );
}

export function calculateRectangularBearing(
  context: MyBearingsCalculationContext,
  formula: RectangularBearingFormula,
): MyBearingsCalculationResult {
  const {
    geometry,
    forceAndDeformation,
    contactArea,
    effectiveArea,
    hasStuds,
    transverseStiffness,
  } = context;

  const shorterSideMm = Math.min(
    contactArea.contactLength,
    contactArea.contactWidth,
  );
  const longerSideMm = Math.max(
    contactArea.contactLength,
    contactArea.contactWidth,
  );

  const holeDiameterMm = getStudHoleDiameter(geometry.ds);
  const shapeCoefficient = getRectangularShapeCoefficient({
    shorterSideMm,
    longerSideMm,
    thicknessMm: geometry.tc,
    hasHoles: formula.hasHoleSensitivity === "studs" ? hasStuds : false,
    numberOfHoles: geometry.n,
    holeDiameterMm,
  });
  const rawCompressiveStressMPa = formula.rawCompressiveStress(shapeCoefficient);
  const compressiveStressLimitMPa = Math.min(
    rawCompressiveStressMPa,
    formula.compressiveStressLimitMPa,
  );
  const allowableHorizontalDeformationMm = Math.max(
    0.6 * (geometry.tc - 2),
    0,
  );
  const allowableRotationPermille = Math.min(
    (450 * geometry.tc) / Math.max(shorterSideMm, 1),
    40,
  );
  const tensileForceShortSideKN =
    (1.5 * forceAndDeformation.designVerticalForce * geometry.tc) /
    Math.max(longerSideMm, 1);
  const tensileForceLongSideKN =
    (1.5 * forceAndDeformation.designVerticalForce * geometry.tc) /
    Math.max(shorterSideMm, 1);
  const horizontalForceKN = getTransverseForce(
    transverseStiffness,
    effectiveArea.effectiveAreaMm2,
    forceAndDeformation.horizontalDeformation,
  );

  return {
    methodCode: formula.methodCode,
    shapeCoefficient,
    rawCompressiveStressMPa,
    compressiveStressLimitMPa,
    allowableHorizontalDeformationMm,
    allowableRotationPermille,
    tensileForceShortSideKN,
    tensileForceLongSideKN,
    horizontalForceKN,
    notes: [
      "Horizontal force is only calculated when transverse stiffness is available.",
    ],
  };
}
