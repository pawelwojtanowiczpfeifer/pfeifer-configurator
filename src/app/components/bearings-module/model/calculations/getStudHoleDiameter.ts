import type { MyBearingsStudOpeningDiameter } from "../types";

export function getStudHoleDiameter(
  studDiameterMm: number,
  openingDiameters: MyBearingsStudOpeningDiameter[],
) {
  const openingDiameter = openingDiameters.find(
    (item) => item.studDiameterMm === studDiameterMm,
  )?.openingDiameterMm;

  if (openingDiameter == null) {
    throw new Error(
      `Missing opening diameter for stud diameter ${studDiameterMm} mm.`,
    );
  }

  return openingDiameter;
}
