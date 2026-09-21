import { describe, expect, it } from "vitest";
import { getMyBearingsFireResistanceStrategy } from "./getMyBearingsFireResistanceStrategy";

describe("getMyBearingsFireResistanceStrategy", () => {
  it("does not require a fire path when no class was selected", () => {
    expect(
      getMyBearingsFireResistanceStrategy({
        fireDurationMinutes: null,
        degradationRateWithoutCoverMmPerMinute: 0,
      }),
    ).toBe("not-required");
  });

  it("permits a charring check only for a positive degradation rate", () => {
    expect(
      getMyBearingsFireResistanceStrategy({
        fireDurationMinutes: 60,
        degradationRateWithoutCoverMmPerMinute: 0.13,
      }),
    ).toBe("calculate-charring");
  });

  it.each([0, null, undefined, -0.1])(
    "requires mineral wool for rate %s",
    (degradationRateWithoutCoverMmPerMinute) => {
      expect(
        getMyBearingsFireResistanceStrategy({
          fireDurationMinutes: 60,
          degradationRateWithoutCoverMmPerMinute,
        }),
      ).toBe("mineral-wool-required");
    },
  );
});
