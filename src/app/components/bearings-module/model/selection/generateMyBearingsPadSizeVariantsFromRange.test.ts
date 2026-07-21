import { describe, expect, it } from "vitest";
import { generateMyBearingsPadSizeVariantsFromRange } from "./generateMyBearingsPadSizeVariantsFromRange";

describe("generateMyBearingsPadSizeVariantsFromRange", () => {
  it("generates variants from the smallest to the largest area", () => {
    const variants = generateMyBearingsPadSizeVariantsFromRange({
      range: {
        minWidthMm: 100,
        maxWidthMm: 150,
        minLengthMm: 100,
        maxLengthMm: 150,
        widthStepMm: 50,
        lengthStepMm: 50,
      },
    });

    expect(variants.map((variant) => variant.code)).toEqual([
      "100x100",
      "100x150",
      "150x100",
      "150x150",
    ]);
  });
});

