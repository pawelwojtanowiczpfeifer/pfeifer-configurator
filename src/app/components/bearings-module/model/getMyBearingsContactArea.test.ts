import { describe, expect, it } from "vitest";
import { getMyBearingsContactArea } from "./getMyBearingsContactArea";
import { getMyBearingsEffectiveSurfaceArea } from "./getMyBearingsEffectiveSurfaceArea";

const BASE_GEOMETRY = {
  isEndNotchedBeam: false,
  g1: 20,
  g2: 75,
  tc: 15,
  b1: 300,
  a1: 200,
  a2: 300,
  b2: 250,
  b3: 280,
  cmin: 40,
  n: 1 as const,
  ds: 16,
  e1: 100,
  e2: 150,
  e3: 0,
};

describe("bearings contact and effective area", () => {
  it("keeps the cantilever calculation unchanged", () => {
    const result = getMyBearingsContactArea({
      ...BASE_GEOMETRY,
      connectionType: "cantilever",
    });

    expect(result.contactLength).toBe(180);
    expect(result.contactWidth).toBe(250);
    expect(result.contactAreaMm2).toBe(45000);
  });

  it("uses beam-top geometry for contact area", () => {
    const result = getMyBearingsContactArea({
      ...BASE_GEOMETRY,
      connectionType: "beam-top",
    });

    expect(result.contactLength).toBe(225);
    expect(result.contactWidth).toBe(250);
    expect(result.contactAreaMm2).toBe(56250);
  });

  it("reuses the same beam-top contact geometry for effective area", () => {
    const result = getMyBearingsEffectiveSurfaceArea({
      ...BASE_GEOMETRY,
      connectionType: "beam-top",
    });

    expect(result.effectiveLength).toBe(145);
    expect(result.effectiveWidth).toBe(170);
    expect(result.effectiveAreaMm2).toBe(24650);
  });
});
