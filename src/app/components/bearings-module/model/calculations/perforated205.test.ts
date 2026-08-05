import { describe, expect, it } from "vitest";
import { calculatePerforated205 } from "./perforated205";

describe("Perforated 205 calculation", () => {
  it("applies the catalogue stress, deformation and rotation limits", () => {
    const result = calculatePerforated205({
      geometry: {
        isEndNotchedBeam: false,
        g1: 20,
        g2: 75,
        tc: 5,
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
      hasStuds: false,
      studHoleDiameterMm: 20,
      contactArea: {
        contactWidth: 250,
        contactLength: 300,
        contactAreaMm2: 75000,
        contactAreaM2: 0.075,
      },
      effectiveArea: {
        effectiveWidth: 170,
        effectiveLength: 220,
        effectiveAreaMm2: 37400,
        effectiveAreaM2: 0.0374,
      },
    });

    expect(result.methodCode).toBe("perforated205");
    expect(result.shapeCoefficient).toBeCloseTo(13.6364, 4);
    expect(result.rawCompressiveStressMPa).toBeCloseTo(211.14, 2);
    expect(result.compressiveStressLimitMPa).toBe(25);
    expect(result.allowableHorizontalDeformationMm).toBeCloseTo(1.705, 3);
    expect(result.allowableRotationPermille).toBeCloseTo(3.2, 3);
  });
});
