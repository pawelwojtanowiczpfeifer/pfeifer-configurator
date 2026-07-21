import { describe, expect, it } from "vitest";
import { selectBestMyBearingsPadSizeFromRange } from "./selectBestMyBearingsPadSizeFromRange";

describe("selectBestMyBearingsPadSizeFromRange", () => {
  it("selects the smallest valid variant from a range", () => {
    const result = selectBestMyBearingsPadSizeFromRange({
      range: {
        minWidthMm: 100,
        maxWidthMm: 150,
        minLengthMm: 100,
        maxLengthMm: 150,
        widthStepMm: 50,
        lengthStepMm: 50,
      },
      buildEvaluationInput: (variant) => ({
        methodCode: "q",
        context: {
          geometry: {
            isEndNotchedBeam: false,
            g1: 20,
            g2: 75,
            tc: 20,
            b1: 300,
            a1: variant.widthMm,
            a2: 300,
            b2: variant.lengthMm,
            b3: 280,
            cmin: 40,
            n: 1,
            ds: 16,
            e1: 100,
            e2: 150,
            e3: 0,
          },
          forceAndDeformation: {
            designVerticalForce: 100,
            bearingRotation: 0,
            horizontalDeformation: 0,
          },
          hasStuds: false,
          contactArea: {
            contactLength: variant.widthMm,
            contactWidth: variant.lengthMm,
            contactAreaMm2: variant.widthMm * variant.lengthMm,
            contactAreaM2: (variant.widthMm * variant.lengthMm) / 1_000_000,
          },
          effectiveArea: {
            effectiveLength: variant.widthMm,
            effectiveWidth: variant.lengthMm,
            effectiveAreaMm2: variant.widthMm * variant.lengthMm,
            effectiveAreaM2: (variant.widthMm * variant.lengthMm) / 1_000_000,
          },
          transverseStiffness: 1,
        },
        loadInput: {
          designVerticalForceKN: 100,
        },
      }),
    });

    expect(result.selected?.variant.code).toBe("100x100");
  });
});

