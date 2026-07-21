import { describe, expect, it } from "vitest";
import { calculateTypeZ } from "./typeZ";

describe("Type Z calculation", () => {
  it("calculates the core Type Z values for the catalog example", () => {
    const result = calculateTypeZ({
      geometry: {
        isEndNotchedBeam: false,
        g1: 20,
        g2: 75,
        tc: 24,
        b1: 300,
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
        designVerticalForce: 1410,
        bearingRotation: 19,
        horizontalDeformation: 8,
      },
      hasStuds: false,
      contactArea: {
        contactLength: 150,
        contactWidth: 300,
        contactAreaMm2: 45000,
        contactAreaM2: 0.045,
      },
      effectiveArea: {
        effectiveLength: 150,
        effectiveWidth: 300,
        effectiveAreaMm2: 45000,
        effectiveAreaM2: 0.045,
      },
      transverseStiffness: 1,
    });

    expect(result.methodCode).toBe("typeZ");
    expect(result.compressiveStressLimitMPa).toBe(35);
    expect(result.allowableHorizontalDeformationMm).toBeCloseTo(8.4, 1);
    expect(result.allowableRotationPermille).toBe(43);
    expect(result.tensileForceShortSideKN).toBeCloseTo(169, 0);
    expect(result.tensileForceLongSideKN).toBeCloseTo(338, 0);
    expect(result.horizontalForceKN).toBe(36);
  });
});
