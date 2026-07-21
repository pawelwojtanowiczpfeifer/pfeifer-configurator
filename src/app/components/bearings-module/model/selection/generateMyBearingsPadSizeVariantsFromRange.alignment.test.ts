import { describe, expect, it } from "vitest";
import { generateMyBearingsPadSizeVariantsFromRange } from "./generateMyBearingsPadSizeVariantsFromRange";

describe("generateMyBearingsPadSizeVariantsFromRange alignment", () => {
  it("aligns the minimum width and length to the step multiple", () => {
    const variants = generateMyBearingsPadSizeVariantsFromRange({
      range: {
        minWidthMm: 110,
        maxWidthMm: 160,
        minLengthMm: 115,
        maxLengthMm: 165,
        widthStepMm: 25,
        lengthStepMm: 25,
      },
    });

    expect(variants.map((variant) => variant.code)).toEqual([
      "125x125",
      "125x150",
      "150x125",
      "150x150",
    ]);
  });
});
