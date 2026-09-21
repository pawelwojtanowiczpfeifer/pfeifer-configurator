import { describe, expect, it } from "vitest";
import { getMyBearingsFireDurationMinutes } from "./getMyBearingsFireDurationMinutes";

describe("getMyBearingsFireDurationMinutes", () => {
  it.each([
    ["R30", 30],
    ["R60", 60],
    ["R120", 120],
    ["not-specified", null],
  ] as const)("maps %s to %s minutes", (fireResistance, expectedMinutes) => {
    expect(getMyBearingsFireDurationMinutes(fireResistance)).toBe(
      expectedMinutes,
    );
  });
});
