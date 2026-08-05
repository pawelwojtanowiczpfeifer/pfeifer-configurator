import { describe, expect, it } from "vitest";
import { calculateCR2000 } from "./cr2000";
import { getRectangularShapeCoefficient } from "./getRectangularShapeCoefficient";
import { getStudHoleDiameter } from "./getStudHoleDiameter";

describe("CR2000 calculation", () => {
  it("calculates the rectangular shape coefficient without holes", () => {
    const result = getRectangularShapeCoefficient({
      shorterSideMm: 150,
      longerSideMm: 320,
      thicknessMm: 16,
      hasHoles: false,
      numberOfHoles: 1,
      holeDiameterMm: getStudHoleDiameter(16, [
        { studDiameterMm: 16, openingDiameterMm: 20 },
      ]),
    });

    expect(result).toBeCloseTo(3.2, 1);
  });

  it("calculates the core CR2000 values", () => {
    const result = calculateCR2000({
      geometry: {
        isEndNotchedBeam: false,
        g1: 20,
        g2: 75,
        tc: 16,
        b1: 320,
        a1: 150,
        a2: 300,
        b2: 250,
        b3: 280,
        cmin: 40,
        n: 1,
        ds: 16,
        e1: 100,
        e2: 150,
        e3: 0,
      },
      forceAndDeformation: {
        designVerticalForce: 1250,
        bearingRotation: 12,
        horizontalDeformation: 3,
      },
      hasStuds: false,
      studHoleDiameterMm: 20,
      contactArea: {
        contactLength: 150,
        contactWidth: 320,
        contactAreaMm2: 48000,
        contactAreaM2: 0.048,
      },
      effectiveArea: {
        effectiveLength: 102,
        effectiveWidth: 272,
        effectiveAreaMm2: 27744,
        effectiveAreaM2: 0.027744,
      },
    });

    expect(result.methodCode).toBe("cr2000");
    expect(result.compressiveStressLimitMPa).toBe(28);
    expect(result.allowableHorizontalDeformationMm).toBeCloseTo(8.4, 1);
    expect(result.allowableRotationPermille).toBe(40);
    expect(result.tensileForceShortSideKN).toBeCloseTo(94, 0);
    expect(result.tensileForceLongSideKN).toBeCloseTo(200, 0);
    expect(result.horizontalForceKN).toBeNull();
  });
});
