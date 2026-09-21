import { describe, expect, it } from "vitest";
import { getMyBearingsFireResolution } from "./getMyBearingsFireResolution";

describe("getMyBearingsFireResolution", () => {
  it("accepts the base type when no fire class is required", () => {
    expect(
      getMyBearingsFireResolution({
        baseBearingTypeCode: "S 65",
        baseFireStrategy: "not-required",
        baseFireCheckStatus: null,
      }),
    ).toEqual({ action: "accept-base" });
  });

  it("accepts a base type that passes the unprotected fire check", () => {
    expect(
      getMyBearingsFireResolution({
        baseBearingTypeCode: "S 65",
        baseFireStrategy: "calculate-charring",
        baseFireCheckStatus: "pass",
      }),
    ).toEqual({ action: "accept-base" });
  });

  it("requires mineral wool immediately when the base has no unprotected rate", () => {
    expect(
      getMyBearingsFireResolution({
        baseBearingTypeCode: "Type Z",
        baseFireStrategy: "mineral-wool-required",
        baseFireCheckStatus: null,
      }),
    ).toEqual({ action: "use-mineral-wool-on-base" });
  });

  it.each([
    ["Compression", "S 65"],
    ["S 65", "S 70"],
    ["S 70", "CR 2000"],
  ] as const)("tries %s once, using %s as the next type", (base, next) => {
    expect(
      getMyBearingsFireResolution({
        baseBearingTypeCode: base,
        baseFireStrategy: "calculate-charring",
        baseFireCheckStatus: "fail",
      }),
    ).toEqual({
      action: "try-next-unprotected-type",
      nextBearingTypeCode: next,
    });
  });

  it("accepts the one stronger type when it passes", () => {
    expect(
      getMyBearingsFireResolution({
        baseBearingTypeCode: "S 65",
        baseFireStrategy: "calculate-charring",
        baseFireCheckStatus: "fail",
        nextTypeFireCheckStatus: "pass",
      }),
    ).toEqual({ action: "accept-next-unprotected-type" });
  });

  it("returns to the base type with mineral wool when the one attempt fails", () => {
    expect(
      getMyBearingsFireResolution({
        baseBearingTypeCode: "S 65",
        baseFireStrategy: "calculate-charring",
        baseFireCheckStatus: "fail",
        nextTypeFireCheckStatus: "fail",
      }),
    ).toEqual({ action: "use-mineral-wool-on-base" });
  });

  it("does not try a stronger type after CR 2000", () => {
    expect(
      getMyBearingsFireResolution({
        baseBearingTypeCode: "CR 2000",
        baseFireStrategy: "calculate-charring",
        baseFireCheckStatus: "fail",
      }),
    ).toEqual({ action: "use-mineral-wool-on-base" });
  });
});
