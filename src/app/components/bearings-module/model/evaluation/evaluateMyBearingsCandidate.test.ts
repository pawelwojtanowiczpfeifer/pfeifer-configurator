import { describe, expect, it } from "vitest";
import { evaluateMyBearingsCandidate } from "./evaluateMyBearingsCandidate";

const BASE_CONTEXT = {
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
    n: 1 as const,
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
};

describe("evaluateMyBearingsCandidate", () => {
  it("skips optional rotation and deformation checks when they are missing", () => {
    const result = evaluateMyBearingsCandidate({
      methodCode: "q",
      context: BASE_CONTEXT,
      loadInput: {
        designVerticalForceKN: 1232,
      },
    });

    expect(result.isValid).toBe(true);
    expect(result.compressiveStressUsagePercent).toBeCloseTo(97.78, 2);
    expect(result.checks[0]?.status).toBe("pass");
    expect(result.checks[1]?.status).toBe("skipped");
    expect(result.checks[2]?.status).toBe("skipped");
  });

  it("fails when the compressive stress exceeds the limit", () => {
    const result = evaluateMyBearingsCandidate({
      methodCode: "q",
      context: {
        ...BASE_CONTEXT,
        forceAndDeformation: {
          ...BASE_CONTEXT.forceAndDeformation,
          designVerticalForce: 2000,
        },
      },
      loadInput: {
        designVerticalForceKN: 2000,
      },
    });

    expect(result.isValid).toBe(false);
    expect(result.compressiveStressUsagePercent).toBeGreaterThan(100);
    expect(result.checks[0]?.status).toBe("fail");
  });

  it("applies the same compressive-stress check to S65 and S70", () => {
    for (const methodCode of ["s65", "s70"] as const) {
      const result = evaluateMyBearingsCandidate({
        methodCode,
        context: BASE_CONTEXT,
        loadInput: {
          designVerticalForceKN: 2000,
        },
      });

      expect(result.isValid).toBe(false);
      expect(result.checks).toHaveLength(4);
      expect(
        result.checks.find((check) => check.name === "compressiveStress")
          ?.status,
      ).toBe("fail");
    }
  });

  it("checks S65 against total rotation including both catalogue additions", () => {
    const context = {
      ...BASE_CONTEXT,
      geometry: {
        ...BASE_CONTEXT.geometry,
        tc: 15,
        a1: 300,
        a2: 300,
        b1: 300,
        b2: 300,
        b3: 300,
      },
      contactArea: {
        contactLength: 300,
        contactWidth: 300,
        contactAreaMm2: 90_000,
        contactAreaM2: 0.09,
      },
      effectiveArea: {
        effectiveLength: 300,
        effectiveWidth: 300,
        effectiveAreaMm2: 90_000,
        effectiveAreaM2: 0.09,
      },
    };

    const passing = evaluateMyBearingsCandidate({
      methodCode: "s65",
      context,
      loadInput: {
        designVerticalForceKN: 10,
        bearingRotationPermille: 10,
      },
    });
    const failing = evaluateMyBearingsCandidate({
      methodCode: "s65",
      context,
      loadInput: {
        designVerticalForceKN: 10,
        bearingRotationPermille: 11,
      },
    });

    const rotationCheck = passing.checks.find(
      (check) => check.name === "bearingRotation",
    );

    expect(passing.calculation.allowableRotationPermille).toBe(22.5);
    expect(passing.calculation.rotationTechnicalApprovalPermille).toBe(10);
    expect(passing.calculation.rotationUnevennessPermille).toBeCloseTo(
      625 / 300,
    );
    expect(rotationCheck?.valuePermille).toBeCloseTo(22.0833, 3);
    expect(rotationCheck?.status).toBe("pass");
    expect(
      failing.checks.find((check) => check.name === "bearingRotation")
        ?.status,
    ).toBe("fail");
  });

  it("uses the CR 2000 catalogue coefficient of 400 for maximum rotation", () => {
    const result = evaluateMyBearingsCandidate({
      methodCode: "cr2000",
      context: {
        ...BASE_CONTEXT,
        geometry: {
          ...BASE_CONTEXT.geometry,
          tc: 15,
          a1: 300,
          a2: 300,
          b1: 300,
          b2: 300,
          b3: 300,
        },
        contactArea: {
          contactLength: 300,
          contactWidth: 300,
          contactAreaMm2: 90_000,
          contactAreaM2: 0.09,
        },
        effectiveArea: {
          effectiveLength: 300,
          effectiveWidth: 300,
          effectiveAreaMm2: 90_000,
          effectiveAreaM2: 0.09,
        },
      },
      loadInput: {
        designVerticalForceKN: 10,
        bearingRotationPermille: 8,
      },
    });

    expect(result.calculation.allowableRotationPermille).toBe(20);
    expect(result.calculation.requiredRotationPermille).toBeCloseTo(20.0833, 3);
    expect(
      result.checks.find((check) => check.name === "bearingRotation")?.status,
    ).toBe("fail");
  });

  it("fails when the bearing dimensions are outside the allowed range", () => {
    const result = evaluateMyBearingsCandidate({
      methodCode: "q",
      context: {
        ...BASE_CONTEXT,
        geometry: {
          ...BASE_CONTEXT.geometry,
          a1: 80,
          a2: 80,
          b1: 90,
          b2: 90,
          b3: 90,
        },
      },
      loadInput: {
        designVerticalForceKN: 1232,
      },
      dimensionalLimits: {
        minWidthMm: 100,
        maxWidthMm: 200,
        minLengthMm: 100,
        maxLengthMm: 200,
      },
    });

    expect(result.isValid).toBe(false);
    expect(result.checks.find((check) => check.name === "dimensions")?.status).toBe(
      "fail",
    );
    expect(result.reasons).toContain("dimensions exceed allowable limits.");
  });

});
