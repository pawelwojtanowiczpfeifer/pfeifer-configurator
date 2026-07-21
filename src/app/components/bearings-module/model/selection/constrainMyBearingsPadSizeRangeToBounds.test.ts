import { describe, expect, it } from "vitest";

import { constrainMyBearingsPadSizeRangeToBounds } from "./constrainMyBearingsPadSizeRangeToBounds";

describe("constrainMyBearingsPadSizeRangeToBounds", () => {
  it("limits the range to the support dimensions", () => {
    expect(
      constrainMyBearingsPadSizeRangeToBounds({
        range: {
          minWidthMm: 100,
          maxWidthMm: 180,
          minLengthMm: 100,
          maxLengthMm: 220,
          widthStepMm: 10,
          lengthStepMm: 10,
        },
        bounds: {
          maxWidthMm: 150,
          maxLengthMm: 200,
        },
      }),
    ).toEqual({
      minWidthMm: 100,
      maxWidthMm: 150,
      minLengthMm: 100,
      maxLengthMm: 200,
      widthStepMm: 10,
      lengthStepMm: 10,
    });
  });

  it("returns null when the support area is too small", () => {
    expect(
      constrainMyBearingsPadSizeRangeToBounds({
        range: {
          minWidthMm: 160,
          maxWidthMm: 180,
          minLengthMm: 160,
          maxLengthMm: 220,
        },
        bounds: {
          maxWidthMm: 150,
          maxLengthMm: 150,
        },
      }),
    ).toBeNull();
  });
});
