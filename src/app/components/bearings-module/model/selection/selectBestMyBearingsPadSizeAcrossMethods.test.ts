import { describe, expect, it } from "vitest";

import { selectBestMyBearingsPadSizeAcrossMethods } from "./selectBestMyBearingsPadSizeAcrossMethods";

describe("selectBestMyBearingsPadSizeAcrossMethods", () => {
  it("prefers the candidate with usage closest to 100%", () => {
    const result = selectBestMyBearingsPadSizeAcrossMethods({
      geometry: {
        isEndNotchedBeam: false,
        g1: 20,
        g2: 75,
        tc: 15,
        b1: 200,
        a1: 200,
        a2: 200,
        b2: 200,
        b3: 200,
        cmin: 40,
        n: 1,
        ds: 16,
        e1: 100,
        e2: 100,
        e3: 0,
      },
      methods: [
        {
          methodCode: "q",
          parameter: {
            minWidthMm: 100,
            maxWidthMm: 200,
            minLengthMm: 100,
            maxLengthMm: 200,
            widthStepMm: 100,
            lengthStepMm: 100,
          },
          buildEvaluationInput: (variant) => ({
            methodCode: "q",
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
                designVerticalForce: 1000,
                bearingRotation: 0,
                horizontalDeformation: 0,
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
              designVerticalForceKN: 280,
            },
          }),
        },
      ],
    });

    expect(result.selected?.variant.code).toBe("100x100");
  });

  it("selects the better candidate between S65 and S70 by usage", () => {
    const result = selectBestMyBearingsPadSizeAcrossMethods({
      geometry: {
        isEndNotchedBeam: false,
        g1: 20,
        g2: 75,
        tc: 15,
        b1: 200,
        a1: 200,
        a2: 200,
        b2: 200,
        b3: 200,
        cmin: 40,
        n: 1,
        ds: 16,
        e1: 100,
        e2: 100,
        e3: 0,
      },
      methods: [
        {
          methodCode: "s65",
          parameter: {
            min_width_mm: 100,
            max_width_mm: 100,
            min_length_mm: 100,
            max_length_mm: 100,
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
                designVerticalForce: 1000,
                bearingRotation: 0,
                horizontalDeformation: 0,
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
              designVerticalForceKN: 1000,
            },
          }),
        },
        {
          methodCode: "s70",
          parameter: {
            min_width_mm: 100,
            max_width_mm: 100,
            min_length_mm: 100,
            max_length_mm: 100,
            dimension_step_normal_mm: 10,
          },
          buildEvaluationInput: (variant) => ({
            methodCode: "s70",
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
                designVerticalForce: 1000,
                bearingRotation: 0,
                horizontalDeformation: 0,
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
              designVerticalForceKN: 1000,
            },
          }),
        },
      ],
    });

    expect(result.selected).toBeNull();
  });
});
