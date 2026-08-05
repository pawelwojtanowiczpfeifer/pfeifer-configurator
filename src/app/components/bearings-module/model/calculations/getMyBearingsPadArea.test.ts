import { describe, expect, it } from "vitest";

import { getMyBearingsPadArea } from "./getMyBearingsPadArea";

describe("getMyBearingsPadArea", () => {
  it("returns gross area when there are no studs", () => {
    expect(
      getMyBearingsPadArea({
        widthMm: 160,
        lengthMm: 370,
        hasStuds: false,
        holeDiameterMm: 20,
        numberOfStuds: 1,
      }),
    ).toMatchObject({
      grossAreaMm2: 59200,
      holeAreaMm2: 0,
      netAreaMm2: 59200,
    });
  });

  it("subtracts the drilled hole areas when studs are present", () => {
    const result = getMyBearingsPadArea({
      widthMm: 160,
      lengthMm: 370,
      hasStuds: true,
      holeDiameterMm: 20,
      numberOfStuds: 2,
    });

    expect(result.grossAreaMm2).toBe(59200);
    expect(result.holeAreaMm2).toBeGreaterThan(0);
    expect(result.netAreaMm2).toBeLessThan(result.grossAreaMm2);
  });
});
