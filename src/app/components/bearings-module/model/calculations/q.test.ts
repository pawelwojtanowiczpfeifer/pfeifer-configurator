import { describe, expect, it } from "vitest";
import { calculateQ } from "./q";

describe("Q calculation", () => {
  it("calculates the core Q values for the catalog example", () => {
    const result = calculateQ({
      geometry: {
        isEndNotchedBeam: false,
        g1: 20,
        g2: 75,
        tc: 20,
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
        designVerticalForce: 1232,
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

    expect(result.methodCode).toBe("q");
    expect(result.compressiveStressLimitMPa).toBe(28);
    expect(result.allowableHorizontalDeformationMm).toBe(10);
    expect(result.allowableRotationPermille).toBe(43);
    expect(result.tensileForceShortSideKN).toBeCloseTo(123.2, 1);
    expect(result.tensileForceLongSideKN).toBeCloseTo(246.4, 1);
    expect(result.horizontalForceKN).toBe(36);
  });
});
