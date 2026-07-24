import { describe, expect, it } from "vitest";
import { selectBestMyBearingsPadSize } from "./selectBestMyBearingsPadSize";

describe("selectBestMyBearingsPadSize", () => {
  it("selects the valid variant with usage closest to 100%", () => {
    const result = selectBestMyBearingsPadSize({
      variants: [
        { code: "small", widthMm: 100, lengthMm: 100 },
        { code: "large", widthMm: 200, lengthMm: 200 },
      ],
      evaluateVariant: (variant) => ({
        methodCode: "q",
        calculation: {
          methodCode: "q",
          compressiveStressLimitMPa: 28,
          allowableHorizontalDeformationMm: 10,
          allowableRotationPermille: 43,
          tensileForceShortSideKN: 0,
          tensileForceLongSideKN: 0,
          horizontalForceKN: null,
          notes: [],
        },
        loadInput: {
          designVerticalForceKN: 100,
        },
        designCompressiveStressKNPerMm2: variant.code === "small" ? 2 : 1,
        compressiveStressUsagePercent: variant.code === "small" ? 50 : 90,
        checks: [],
        isValid: true,
        reasons: [],
      }),
    });

    expect(result.selected?.variant.code).toBe("large");
  });

  it("skips invalid variants", () => {
    const result = selectBestMyBearingsPadSize({
      variants: [
        { code: "150", widthMm: 150, lengthMm: 150 },
        { code: "100", widthMm: 100, lengthMm: 100 },
      ],
      evaluateVariant: (variant) => ({
        methodCode: "q",
        calculation: {
          methodCode: "q",
          compressiveStressLimitMPa: 28,
          allowableHorizontalDeformationMm: 10,
          allowableRotationPermille: 43,
          tensileForceShortSideKN: 0,
          tensileForceLongSideKN: 0,
          horizontalForceKN: null,
          notes: [],
        },
        loadInput: {
          designVerticalForceKN: 100,
        },
        designCompressiveStressKNPerMm2: variant.code === "100" ? 2 : 1,
        compressiveStressUsagePercent: variant.code === "100" ? 50 : 25,
        checks: [],
        isValid: variant.code !== "100",
        reasons: variant.code !== "100" ? [] : ["fail"],
      }),
    });

    expect(result.selected?.variant.code).toBe("150");
  });
});
