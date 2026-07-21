import { describe, expect, it } from "vitest";

import { selectBestMyBearingsPadSizeForSupport } from "./selectBestMyBearingsPadSizeForSupport";

describe("selectBestMyBearingsPadSizeForSupport", () => {
  it("limits the selectable variants to the effective support area", () => {
    const result = selectBestMyBearingsPadSizeForSupport({
      geometry: {
        isEndNotchedBeam: false,
        g1: 20,
        g2: 75,
        tc: 20,
        b1: 160,
        a1: 160,
        a2: 300,
        b2: 160,
        b3: 160,
        cmin: 0,
        n: 1,
        ds: 16,
        e1: 80,
        e2: 80,
        e3: 0,
      },
      connectionType: "cantilever",
      parameter: {
        min_width_mm: 100,
        max_width_mm: 200,
        min_length_mm: 100,
        max_length_mm: 200,
        dimension_step_normal_mm: 50,
      },
      buildEvaluationInput: (variant) => ({
        methodCode: "s65",
        context: {
          geometry: {
            isEndNotchedBeam: false,
            g1: 20,
            g2: 75,
            tc: 20,
            b1: variant.lengthMm,
            a1: variant.widthMm,
            a2: 300,
            b2: variant.lengthMm,
            b3: variant.lengthMm,
            cmin: 0,
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

    expect(result?.selected?.variant.code).toBe("100x100");
    expect(result?.candidates).toHaveLength(2);
  });
});
