import { describe, expect, it } from "vitest";
import { calculateCompression } from "./compression";

describe("Compression calculation", () => {
  it("calculates the DIN 4141 compression-bearing limits", () => {
    const result = calculateCompression({
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
      hasStuds: false,
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

    expect(result.methodCode).toBe("compression");
    expect(result.shapeCoefficient).toBeCloseTo(4.5455, 4);
    expect(result.rawCompressiveStressMPa).toBeCloseTo(13.1, 1);
    expect(result.compressiveStressLimitMPa).toBe(5);
    expect(result.allowableHorizontalDeformationMm).toBeCloseTo(7.8, 1);
    expect(result.allowableRotationPermille).toBe(12);
  });
});
