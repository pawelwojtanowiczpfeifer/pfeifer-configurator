import type { MyBearingsCalculationCalculator } from "./types";

function getTypeZHorizontalForce(
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

export const calculateTypeZ: MyBearingsCalculationCalculator = ({
  geometry,
  forceAndDeformation,
  effectiveArea,
  transverseStiffness,
}) => {
  const allowableHorizontalDeformationMm =
    geometry.tc <= 15 ? 0.4 * geometry.tc : 0.35 * geometry.tc;
  const allowableRotationPermille =
    geometry.tc <= 15
      ? Math.min((200 * geometry.tc) / Math.max(geometry.a1, 1), 40)
      : Math.min((350 * geometry.tc) / Math.max(geometry.a1, 1), 43);
  const totalRotationPermille =
    forceAndDeformation.bearingRotation +
    10 +
    625 / Math.max(geometry.a1, 1);
  const horizontalForceKN = getTypeZHorizontalForce(
    transverseStiffness,
    forceAndDeformation.horizontalDeformation,
    effectiveArea.effectiveAreaMm2,
  );

  return {
    methodCode: "typeZ",
    rawCompressiveStressMPa: 35,
    compressiveStressLimitMPa: 35,
    allowableHorizontalDeformationMm,
    allowableRotationPermille,
    tensileForceShortSideKN:
      (1.5 * forceAndDeformation.designVerticalForce * geometry.tc) /
      Math.max(geometry.b1, 1),
    tensileForceLongSideKN:
      (1.5 * forceAndDeformation.designVerticalForce * geometry.tc) /
      Math.max(geometry.a1, 1),
    horizontalForceKN,
    notes: [
      `Required rotation for the current load case is ${totalRotationPermille.toFixed(1)} permille.`,
      "Horizontal force is only calculated when transverse stiffness is available.",
    ],
  };
};
