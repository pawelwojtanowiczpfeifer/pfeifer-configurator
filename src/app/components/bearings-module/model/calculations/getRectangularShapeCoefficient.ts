type RectangularShapeCoefficientInput = {
  shorterSideMm: number;
  longerSideMm: number;
  thicknessMm: number;
  hasHoles: boolean;
  numberOfHoles: number;
  holeDiameterMm: number;
};

export function getRectangularShapeCoefficient({
  shorterSideMm,
  longerSideMm,
  thicknessMm,
  hasHoles,
  numberOfHoles,
  holeDiameterMm,
}: RectangularShapeCoefficientInput) {
  if (
    shorterSideMm <= 0 ||
    longerSideMm <= 0 ||
    thicknessMm <= 0
  ) {
    return 0;
  }

  if (!hasHoles || numberOfHoles <= 0 || holeDiameterMm <= 0) {
    return (
      (shorterSideMm * longerSideMm) /
      (2 * thicknessMm * (shorterSideMm + longerSideMm))
    );
  }

  return (
    (shorterSideMm * longerSideMm -
      (Math.PI / 4) * numberOfHoles * holeDiameterMm ** 2) /
    (2 * thicknessMm * (shorterSideMm + longerSideMm) +
      thicknessMm * Math.PI * numberOfHoles * holeDiameterMm)
  );
}
