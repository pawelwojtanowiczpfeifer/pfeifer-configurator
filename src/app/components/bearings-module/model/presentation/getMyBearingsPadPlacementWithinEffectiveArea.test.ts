import { describe, expect, it } from "vitest";
import { getMyBearingsPadPlacementWithinEffectiveArea } from "./getMyBearingsPadPlacementWithinEffectiveArea";

const GEOMETRY = {
  isEndNotchedBeam: false,
  g1: 20,
  g2: 75,
  tc: 15,
  b1: 300,
  a1: 220,
  a2: 300,
  b2: 300,
  b3: 300,
  cmin: 25,
  n: 2 as const,
  ds: 16,
  e1: 100,
  e2: 75,
  e3: 100,
};

describe("getMyBearingsPadPlacementWithinEffectiveArea", () => {
  it("centres a pad in the effective area while preserving asymmetric stud positions", () => {
    expect(
      getMyBearingsPadPlacementWithinEffectiveArea({
        geometry: GEOMETRY,
        connectionType: "cantilever",
        padAMm: 100,
        padBMm: 200,
        hasStuds: true,
        holeDiameterMm: 30,
      }),
    ).toEqual({
      padAStartMm: 50,
      padBStartMm: 50,
      holeLayout: {
        aAxisCenterMm: 50,
        bAxisCentersMm: [25, 125],
      },
    });
  });

  it("returns no drilling layout when studs are disabled", () => {
    expect(
      getMyBearingsPadPlacementWithinEffectiveArea({
        geometry: GEOMETRY,
        connectionType: "cantilever",
        padAMm: 100,
        padBMm: 200,
        hasStuds: false,
        holeDiameterMm: null,
      }),
    ).toEqual({
      padAStartMm: 50,
      padBStartMm: 50,
      holeLayout: null,
    });
  });
});
