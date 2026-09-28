import type { MyBearingsCalculationCalculator } from "./types";

function getQHorizontalForce(
  transverseStiffness: number | null | undefined,
  horizontalDeformationMm: number,
  effectiveAreaMm2: number,
) {
  if (
    typeof transverseStiffness !== "number" ||
    !Number.isFinite(transverseStiffness)
  ) {
    return null;
  }

  return (
    (transverseStiffness * horizontalDeformationMm * effectiveAreaMm2) / 10_000
  );
}

export const calculateQ: MyBearingsCalculationCalculator = ({
  geometry,
  forceAndDeformation,
  effectiveArea,
  transverseStiffness,
}) => {
  const allowableHorizontalDeformationMm =
    geometry.tc <= 10 ? 0.4 * geometry.tc : 0.5 * geometry.tc;
  const allowableRotationPermille =
    geometry.tc <= 10
      ? Math.min((200 * geometry.tc) / Math.max(geometry.a1, 1), 40)
      : Math.min((350 * geometry.tc) / Math.max(geometry.a1, 1), 43);
  const rotationTechnicalApprovalPermille = 10;
  const rotationUnevennessPermille = 625 / Math.max(geometry.a1, 1);
  const requiredRotationPermille =
    forceAndDeformation.bearingRotation +
    rotationTechnicalApprovalPermille +
    rotationUnevennessPermille;
  const horizontalForceKN = getQHorizontalForce(
    transverseStiffness,
    forceAndDeformation.horizontalDeformation,
    effectiveArea.effectiveAreaMm2,
  );

  return {
    methodCode: "q",
    rawCompressiveStressMPa: 28,
    compressiveStressLimitMPa: 28,
    allowableHorizontalDeformationMm,
    allowableRotationPermille,
    rotationTechnicalApprovalPermille,
    rotationUnevennessPermille,
    requiredRotationPermille,
    tensileForceShortSideKN:
      (1.5 * forceAndDeformation.designVerticalForce * geometry.tc) /
      Math.max(geometry.b1, 1),
    tensileForceLongSideKN:
      (1.5 * forceAndDeformation.designVerticalForce * geometry.tc) /
      Math.max(geometry.a1, 1),
    horizontalForceKN,
    notes: [
      `Required rotation for the current load case is ${requiredRotationPermille.toFixed(1)} permille.`,
      "Horizontal force is only calculated when transverse stiffness is available.",
    ],
  };
};
