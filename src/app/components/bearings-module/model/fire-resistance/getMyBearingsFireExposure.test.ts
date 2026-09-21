import { describe, expect, it } from "vitest";
import { getMyBearingsFireExposure } from "./getMyBearingsFireExposure";

describe("getMyBearingsFireExposure", () => {
  it.each([
    {
      name: "cantilever without end notch",
      input: {
        connectionType: "cantilever" as const,
        isEndNotchedBeam: false,
        beamTopHeadArrangement: "no-upstand" as const,
      },
      expected: { exposedASides: 2, exposedBSides: 1 },
    },
    {
      name: "cantilever with end notch",
      input: {
        connectionType: "cantilever" as const,
        isEndNotchedBeam: true,
        beamTopHeadArrangement: "no-upstand" as const,
      },
      expected: { exposedASides: 2, exposedBSides: 0 },
    },
    {
      name: "beam top without end notch and no upstand",
      input: {
        connectionType: "beam-top" as const,
        isEndNotchedBeam: false,
        beamTopHeadArrangement: "no-upstand" as const,
      },
      expected: { exposedASides: 2, exposedBSides: 2 },
    },
    {
      name: "beam top without end notch and two beams",
      input: {
        connectionType: "beam-top" as const,
        isEndNotchedBeam: false,
        beamTopHeadArrangement: "two-beams" as const,
      },
      expected: { exposedASides: 2, exposedBSides: 1 },
    },
    {
      name: "beam top without end notch and outer head upstand",
      input: {
        connectionType: "beam-top" as const,
        isEndNotchedBeam: false,
        beamTopHeadArrangement: "outer-head-upstand" as const,
      },
      expected: { exposedASides: 2, exposedBSides: 1 },
    },
    {
      name: "beam top without end notch and three-sided head upstand",
      input: {
        connectionType: "beam-top" as const,
        isEndNotchedBeam: false,
        beamTopHeadArrangement: "three-sided-head-upstand" as const,
      },
      expected: { exposedASides: 0, exposedBSides: 1 },
    },
    {
      name: "beam top with end notch and no upstand",
      input: {
        connectionType: "beam-top" as const,
        isEndNotchedBeam: true,
        beamTopHeadArrangement: "no-upstand" as const,
      },
      expected: { exposedASides: 2, exposedBSides: 1 },
    },
    {
      name: "beam top with end notch and two beams",
      input: {
        connectionType: "beam-top" as const,
        isEndNotchedBeam: true,
        beamTopHeadArrangement: "two-beams" as const,
      },
      expected: { exposedASides: 2, exposedBSides: 0 },
    },
    {
      name: "beam top with end notch and outer head upstand",
      input: {
        connectionType: "beam-top" as const,
        isEndNotchedBeam: true,
        beamTopHeadArrangement: "outer-head-upstand" as const,
      },
      expected: { exposedASides: 2, exposedBSides: 0 },
    },
    {
      name: "beam top with end notch and three-sided head upstand",
      input: {
        connectionType: "beam-top" as const,
        isEndNotchedBeam: true,
        beamTopHeadArrangement: "three-sided-head-upstand" as const,
      },
      expected: { exposedASides: 0, exposedBSides: 0 },
    },
  ])("returns the approved map for $name", ({ input, expected }) => {
    expect(getMyBearingsFireExposure(input)).toEqual(expected);
  });
});
