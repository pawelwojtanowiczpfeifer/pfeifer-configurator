import { describe, expect, it } from "vitest";
import { calculateS70 } from "./s70";
import { getRectangularShapeCoefficient } from "./getRectangularShapeCoefficient";
import { getStudHoleDiameter } from "./getStudHoleDiameter";

describe("S70 calculation", () => {
  it("calculates the rectangular shape coefficient without holes", () => {
    const result = getRectangularShapeCoefficient({
      shorterSideMm: 250,
      longerSideMm: 300,
      thicknessMm: 15,
      hasHoles: false,
      numberOfHoles: 1,
      holeDiameterMm: getStudHoleDiameter(16, [
        { studDiameterMm: 16, openingDiameterMm: 20 },
      ]),
    });

    expect(result).toBeCloseTo(4.5455, 4);
  });

  it("calculates the core S70 values", () => {
    const result = calculateS70({
      geometry: {
        isEndNotchedBeam: false,
        g1: 20,
        g2: 75,
        tc: 15,
        b1: 300,
        a1: 200,
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
        designVerticalForce: 500,
        bearingRotation: 10,
        horizontalDeformation: 3,
      },
      hasStuds: true,
      studHoleDiameterMm: 20,
      contactArea: {
        contactWidth: 225,
        contactLength: 250,
        contactAreaMm2: 56250,
        contactAreaM2: 0.05625,
      },
      effectiveArea: {
        effectiveWidth: 145,
        effectiveLength: 170,
        effectiveAreaMm2: 24650,
        effectiveAreaM2: 0.02465,
      },
    });

    expect(result.methodCode).toBe("s70");
    expect(result.compressiveStressLimitMPa).toBeCloseTo(21, 0);
    expect(result.allowableHorizontalDeformationMm).toBeCloseTo(7.8, 1);
    expect(result.allowableRotationPermille).toBe(30);
    expect(result.tensileForceShortSideKN).toBeCloseTo(45, 0);
    expect(result.tensileForceLongSideKN).toBeCloseTo(50, 0);
    expect(result.horizontalForceKN).toBeNull();
  });
});
