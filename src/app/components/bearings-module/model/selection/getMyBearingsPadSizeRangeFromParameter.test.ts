import { describe, expect, it } from "vitest";

import { getMyBearingsPadSizeRangeFromParameter } from "./getMyBearingsPadSizeRangeFromParameter";

describe("getMyBearingsPadSizeRangeFromParameter", () => {
  it("maps database dimensions to internal range", () => {
    expect(
      getMyBearingsPadSizeRangeFromParameter({
        parameter: {
          min_width_mm: 100,
          max_width_mm: 160,
          min_length_mm: 100,
          max_length_mm: 200,
          step_mm: 10,
        },
      }),
    ).toEqual({
      minWidthMm: 100,
      maxWidthMm: 160,
      minLengthMm: 100,
      maxLengthMm: 200,
      widthStepMm: 10,
      lengthStepMm: 10,
    });
  });

  it("returns null when any boundary is missing", () => {
    expect(
      getMyBearingsPadSizeRangeFromParameter({
        parameter: {
          min_width_mm: null,
          max_width_mm: 160,
          min_length_mm: 100,
          max_length_mm: 200,
          dimension_step_normal_mm: 10,
        },
      }),
    ).toBeNull();
  });

  it("returns null when min is greater than max", () => {
    expect(
      getMyBearingsPadSizeRangeFromParameter({
        parameter: {
          min_width_mm: 170,
          max_width_mm: 160,
          min_length_mm: 100,
          max_length_mm: 200,
          dimension_step_normal_mm: 10,
        },
      }),
    ).toBeNull();
  });
});
