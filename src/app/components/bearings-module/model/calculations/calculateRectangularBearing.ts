import type {
  MyBearingsCalculationContext,
  MyBearingsCalculationResult,
} from "./types";
import { getRectangularShapeCoefficient } from "./getRectangularShapeCoefficient";

type RectangularBearingFormula = {
  methodCode: "s65" | "s70" | "cr2000" | "compression" | "perforated205";
  rawCompressiveStress: (shapeCoefficient: number) => number;
  compressiveStressLimitMPa: number;
  hasHoleSensitivity?: "none" | "studs";
  allowableHorizontalDeformationMm?: (thicknessMm: number) => number;
  allowableRotationPermille?: (
    shorterSideMm: number,
    thicknessMm: number,
  ) => number;
  rotationTechnicalApprovalPermille?: number;
  rotationUnevennessPermille?: (shorterSideMm: number) => number;
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
    studHoleDiameterMm,
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

  const shapeCoefficient = getRectangularShapeCoefficient({
    shorterSideMm,
    longerSideMm,
    thicknessMm: geometry.tc,
    hasHoles: formula.hasHoleSensitivity === "studs" ? hasStuds : false,
    numberOfHoles: geometry.n,
    holeDiameterMm: studHoleDiameterMm,
  });
  const rawCompressiveStressMPa = formula.rawCompressiveStress(shapeCoefficient);
  const compressiveStressLimitMPa = Math.min(
    rawCompressiveStressMPa,
    formula.compressiveStressLimitMPa,
  );
  const allowableHorizontalDeformationMm =
    formula.allowableHorizontalDeformationMm?.(geometry.tc) ??
    Math.max(0.6 * (geometry.tc - 2), 0);
  const allowableRotationPermille =
    formula.allowableRotationPermille?.(shorterSideMm, geometry.tc) ??
    Math.min((450 * geometry.tc) / Math.max(shorterSideMm, 1), 40);
  const rotationTechnicalApprovalPermille =
    formula.rotationTechnicalApprovalPermille ?? 0;
  const rotationUnevennessPermille =
    formula.rotationUnevennessPermille?.(shorterSideMm) ?? 0;
  const requiredRotationPermille =
    forceAndDeformation.bearingRotation +
    rotationTechnicalApprovalPermille +
    rotationUnevennessPermille;
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
    rotationTechnicalApprovalPermille,
    rotationUnevennessPermille,
    requiredRotationPermille,
    tensileForceShortSideKN,
    tensileForceLongSideKN,
    horizontalForceKN,
    notes: [
      "Horizontal force is only calculated when transverse stiffness is available.",
    ],
  } as MyBearingsCalculationResult;
}
