import { describe, expect, it } from "vitest";
import {
  getMyBearingsFireMinimumSCheck,
  getMyBearingsMineralWoolFitCheck,
} from "./getMyBearingsFireGeometryChecks";

describe("getMyBearingsFireMinimumSCheck", () => {
  it("uses the smaller contact dimension as S", () => {
    expect(
      getMyBearingsFireMinimumSCheck({
        contactWidthMm: 220,
        contactLengthMm: 180,
        minSDimensionMm: 180,
      }),
    ).toEqual({ availableMm: 180, requiredMm: 180, isValid: true });
  });

  it("fails when either contact dimension is below the approval minimum", () => {
    expect(
      getMyBearingsFireMinimumSCheck({
        contactWidthMm: 179,
        contactLengthMm: 250,
        minSDimensionMm: 180,
      }).isValid,
    ).toBe(false);
  });
});

describe("getMyBearingsMineralWoolFitCheck", () => {
  it("rejects a 45 mm R120 wool strip in a 40 mm edge cover", () => {
    expect(
      getMyBearingsMineralWoolFitCheck({
        cminMm: 40,
        requiredCoverMm: 45,
        exposure: { exposedASides: 2, exposedBSides: 1 },
      }),
    ).toEqual({ availableCoverMm: 40, requiredCoverMm: 45, isValid: false });
  });

  it("does not require wool where the fire map has no exposed edge", () => {
    expect(
      getMyBearingsMineralWoolFitCheck({
        cminMm: 0,
        requiredCoverMm: 45,
        exposure: { exposedASides: 0, exposedBSides: 0 },
      }),
    ).toEqual({ availableCoverMm: 0, requiredCoverMm: 0, isValid: true });
  });
});
