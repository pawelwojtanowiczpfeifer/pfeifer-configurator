import { describe, expect, it } from "vitest";

import { resolveMyBearingsPadSizeRange } from "./resolveMyBearingsPadSizeRange";

describe("resolveMyBearingsPadSizeRange", () => {
  it("applies effective-dimension minimums for width and length", () => {
    const result = resolveMyBearingsPadSizeRange({
      range: {
        minWidthMm: 60,
        maxWidthMm: 200,
        minLengthMm: 70,
        maxLengthMm: 200,
        widthStepMm: 25,
        lengthStepMm: 25,
      },
      bounds: {
        maxWidthMm: 180,
        maxLengthMm: 180,
      },
      effectiveWidthMm: 140,
      effectiveLengthMm: 130,
    });

    expect(result).toEqual({
      minWidthMm: 75,
      maxWidthMm: 180,
      minLengthMm: 125,
      maxLengthMm: 180,
      widthStepMm: 25,
      lengthStepMm: 25,
    });
  });
});
