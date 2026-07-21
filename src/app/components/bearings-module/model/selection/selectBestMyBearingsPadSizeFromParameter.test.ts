import { describe, expect, it } from "vitest";

import { selectBestMyBearingsPadSizeFromParameter } from "./selectBestMyBearingsPadSizeFromParameter";

describe("selectBestMyBearingsPadSizeFromParameter", () => {
  it("selects the best variant from database dimensions", () => {
    const result = selectBestMyBearingsPadSizeFromParameter({
      parameter: {
        min_width_mm: 100,
        max_width_mm: 120,
        min_length_mm: 100,
        max_length_mm: 120,
        dimension_step_normal_mm: 10,
      },
      buildEvaluationInput: (variant) => ({
        methodCode: "s65",
        context: {
          geometry: {
            isEndNotchedBeam: false,
            g1: 20,
            g2: 75,
            tc: 15,
            b1: variant.lengthMm,
            a1: variant.widthMm,
            a2: variant.widthMm,
            b2: variant.lengthMm,
            b3: variant.lengthMm,
            cmin: 40,
            n: 1,
            ds: 16,
            e1: variant.widthMm / 2,
            e2: variant.lengthMm / 2,
            e3: 0,
          },
          forceAndDeformation: {
            designVerticalForce: 500,
            bearingRotation: 10,
            horizontalDeformation: 3,
          },
          contactArea: {
            contactLength: variant.lengthMm,
            contactWidth: variant.widthMm,
            contactAreaMm2: variant.widthMm * variant.lengthMm,
            contactAreaM2: (variant.widthMm * variant.lengthMm) / 1_000_000,
          },
          effectiveArea: {
            effectiveLength: variant.lengthMm,
            effectiveWidth: variant.widthMm,
            effectiveAreaMm2: variant.widthMm * variant.lengthMm,
            effectiveAreaM2: (variant.widthMm * variant.lengthMm) / 1_000_000,
          },
          hasStuds: false,
        },
        loadInput: {
          designVerticalForceKN: 1,
        },
      }),
    });

    expect(result?.selected?.variant.widthMm).toBe(100);
    expect(result?.selected?.variant.lengthMm).toBe(100);
  });

  it("does not allow sizes beyond the effective support dimensions", () => {
    const result = selectBestMyBearingsPadSizeFromParameter({
      parameter: {
        min_width_mm: 100,
        max_width_mm: 200,
        min_length_mm: 100,
        max_length_mm: 200,
        dimension_step_normal_mm: 10,
      },
      bounds: {
        maxWidthMm: 120,
        maxLengthMm: 130,
      },
      buildEvaluationInput: (variant) => ({
        methodCode: "s65",
        context: {
          geometry: {
            isEndNotchedBeam: false,
            g1: 20,
            g2: 75,
            tc: 15,
            b1: variant.lengthMm,
            a1: variant.widthMm,
            a2: variant.widthMm,
            b2: variant.lengthMm,
            b3: variant.lengthMm,
            cmin: 40,
            n: 1,
            ds: 16,
            e1: variant.widthMm / 2,
            e2: variant.lengthMm / 2,
            e3: 0,
          },
          forceAndDeformation: {
            designVerticalForce: 500,
            bearingRotation: 10,
            horizontalDeformation: 3,
          },
          contactArea: {
            contactLength: variant.lengthMm,
            contactWidth: variant.widthMm,
            contactAreaMm2: variant.widthMm * variant.lengthMm,
            contactAreaM2: (variant.widthMm * variant.lengthMm) / 1_000_000,
          },
          effectiveArea: {
            effectiveLength: variant.lengthMm,
            effectiveWidth: variant.widthMm,
            effectiveAreaMm2: variant.widthMm * variant.lengthMm,
            effectiveAreaM2: (variant.widthMm * variant.lengthMm) / 1_000_000,
          },
          hasStuds: false,
        },
        loadInput: {
          designVerticalForceKN: 1,
        },
      }),
    });

    expect(result?.selected?.variant.widthMm).toBe(100);
    expect(result?.selected?.variant.lengthMm).toBe(100);
    expect(result?.candidates.every((candidate) => candidate.variant.widthMm <= 120)).toBe(
      true,
    );
    expect(result?.candidates.every((candidate) => candidate.variant.lengthMm <= 130)).toBe(
      true,
    );
  });

  it("returns null when the parameter is incomplete", () => {
    const result = selectBestMyBearingsPadSizeFromParameter({
      parameter: {
        min_width_mm: null,
        max_width_mm: 120,
        min_length_mm: 100,
        max_length_mm: 120,
        dimension_step_normal_mm: 10,
      },
      buildEvaluationInput: () => ({
        methodCode: "s65",
        context: {
          geometry: {
            isEndNotchedBeam: false,
            g1: 20,
            g2: 75,
            tc: 15,
            b1: 100,
            a1: 100,
            a2: 100,
            b2: 100,
            b3: 100,
            cmin: 40,
            n: 1,
            ds: 16,
            e1: 50,
            e2: 50,
            e3: 0,
          },
          forceAndDeformation: {
            designVerticalForce: 500,
            bearingRotation: 10,
            horizontalDeformation: 3,
          },
          contactArea: {
            contactLength: 100,
            contactWidth: 100,
            contactAreaMm2: 10_000,
            contactAreaM2: 0.01,
          },
          effectiveArea: {
            effectiveLength: 100,
            effectiveWidth: 100,
            effectiveAreaMm2: 10_000,
            effectiveAreaM2: 0.01,
          },
          hasStuds: false,
        },
        loadInput: {
          designVerticalForceKN: 1,
        },
      }),
    });

    expect(result).toBeNull();
  });
});
