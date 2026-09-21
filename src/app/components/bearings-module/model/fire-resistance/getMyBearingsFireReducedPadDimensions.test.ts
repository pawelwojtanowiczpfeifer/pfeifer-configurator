import { describe, expect, it } from "vitest";
import { getMyBearingsFireReducedPadDimensions } from "./getMyBearingsFireReducedPadDimensions";

describe("getMyBearingsFireReducedPadDimensions", () => {
  it("reduces each dimension perpendicular to its exposed edges", () => {
    expect(
      getMyBearingsFireReducedPadDimensions({
        aMm: 200,
        bMm: 150,
        charringRateMmPerMinute: 0.7,
        fireDurationMinutes: 60,
        exposure: { exposedASides: 2, exposedBSides: 1 },
      }),
    ).toEqual({
      charringDepthMm: 42,
      fireReducedAMm: 158,
      fireReducedBMm: 66,
      fireReducedAreaMm2: 10_428,
      isFullyCharred: false,
    });
  });

  it("keeps dimensions unchanged when no pad edge is exposed", () => {
    expect(
      getMyBearingsFireReducedPadDimensions({
        aMm: 200,
        bMm: 150,
        charringRateMmPerMinute: 0.7,
        fireDurationMinutes: 60,
        exposure: { exposedASides: 0, exposedBSides: 0 },
      }),
    ).toEqual({
      charringDepthMm: 42,
      fireReducedAMm: 200,
      fireReducedBMm: 150,
      fireReducedAreaMm2: 30_000,
      isFullyCharred: false,
    });
  });

  it("never returns negative dimensions when charring consumes a pad", () => {
    expect(
      getMyBearingsFireReducedPadDimensions({
        aMm: 80,
        bMm: 150,
        charringRateMmPerMinute: 1,
        fireDurationMinutes: 60,
        exposure: { exposedASides: 0, exposedBSides: 2 },
      }),
    ).toEqual({
      charringDepthMm: 60,
      fireReducedAMm: 0,
      fireReducedBMm: 150,
      fireReducedAreaMm2: 0,
      isFullyCharred: true,
    });
  });
});
