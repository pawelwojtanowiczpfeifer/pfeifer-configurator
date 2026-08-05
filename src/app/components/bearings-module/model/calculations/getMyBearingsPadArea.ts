type GetMyBearingsPadAreaInput = {
  widthMm: number;
  lengthMm: number;
  hasStuds: boolean;
  holeDiameterMm: number;
  numberOfStuds: 1 | 2;
};

export type MyBearingsPadArea = {
  grossAreaMm2: number;
  holeAreaMm2: number;
  netAreaMm2: number;
  grossAreaM2: number;
  holeAreaM2: number;
  netAreaM2: number;
};

export function getMyBearingsPadArea({
  widthMm,
  lengthMm,
  hasStuds,
  holeDiameterMm,
  numberOfStuds,
}: GetMyBearingsPadAreaInput): MyBearingsPadArea {
  const grossAreaMm2 = widthMm * lengthMm;

  if (!hasStuds) {
    return {
      grossAreaMm2,
      holeAreaMm2: 0,
      netAreaMm2: grossAreaMm2,
      grossAreaM2: grossAreaMm2 / 1_000_000,
      holeAreaM2: 0,
      netAreaM2: grossAreaMm2 / 1_000_000,
    };
  }

  const holeAreaMm2 =
    numberOfStuds * ((Math.PI * holeDiameterMm * holeDiameterMm) / 4);
  const netAreaMm2 = Math.max(grossAreaMm2 - holeAreaMm2, 0);

  return {
    grossAreaMm2,
    holeAreaMm2,
    netAreaMm2,
    grossAreaM2: grossAreaMm2 / 1_000_000,
    holeAreaM2: holeAreaMm2 / 1_000_000,
    netAreaM2: netAreaMm2 / 1_000_000,
  };
}
