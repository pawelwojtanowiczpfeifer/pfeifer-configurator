import { describe, expect, it } from "vitest";
import { getMyBearingsMineralWoolRequirement } from "./getMyBearingsMineralWoolRequirement";

describe("getMyBearingsMineralWoolRequirement", () => {
  it.each([
    ["R30", { minWidthMm: 25 }],
    ["R60", { minWidthMm: 25 }],
    ["R120", { minWidthMm: 45 }],
    ["not-specified", null],
  ] as const)("returns the approval requirement for %s", (fireResistance, expected) => {
    expect(getMyBearingsMineralWoolRequirement(fireResistance)).toEqual(
      expected,
    );
  });
});
