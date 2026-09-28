import { describe, expect, it } from "vitest";
import { getMyBearingsHoleLayoutFromPadEdges } from "./getMyBearingsHoleLayoutFromPadEdges";

describe("getMyBearingsHoleLayoutFromPadEdges", () => {
  it("converts two structural stud centres into pad-edge distances", () => {
    expect(
      getMyBearingsHoleLayoutFromPadEdges({
        padAStartMm: 400,
        padBStartMm: 1_000,
        padAMm: 200,
        padBMm: 300,
        holeDiameterMm: 30,
        studCenters: [
          { aMm: 500, bMm: 1_050 },
          { aMm: 500, bMm: 1_250 },
        ],
      }),
    ).toEqual({
      aAxisCenterMm: 100,
      bAxisCentersMm: [50, 250],
    });
  });

  it("keeps one stud relative to the selected pad rather than the structure", () => {
    expect(
      getMyBearingsHoleLayoutFromPadEdges({
        padAStartMm: 350,
        padBStartMm: 900,
        padAMm: 100,
        padBMm: 200,
        holeDiameterMm: 30,
        studCenters: [{ aMm: 400, bMm: 1_000 }],
      }),
    ).toEqual({
      aAxisCenterMm: 50,
      bAxisCentersMm: [100],
    });
  });

  it("rejects a hole that extends outside the final pad", () => {
    expect(() =>
      getMyBearingsHoleLayoutFromPadEdges({
        padAStartMm: 400,
        padBStartMm: 1_000,
        padAMm: 200,
        padBMm: 300,
        holeDiameterMm: 30,
        studCenters: [{ aMm: 410, bMm: 1_050 }],
      }),
    ).toThrow("outside the final bearing pad");
  });
});
