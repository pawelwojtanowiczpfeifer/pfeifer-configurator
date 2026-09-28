import { describe, expect, it } from "vitest";
import { getMyBearingsCommercialDescription } from "./getMyBearingsCommercialDescription";

describe("getMyBearingsCommercialDescription", () => {
  it("formats the catalogue code and two-hole edge distances in b x a x t order", () => {
    expect(
      getMyBearingsCommercialDescription({
        commercialTypeCode: "Comp S65",
        commercialTypeName: "Compact Bearing S65",
        aMm: 200,
        bMm: 300,
        thicknessMm: 10,
        holeDiameterMm: 30,
        holeLayout: {
          bAxisCentersMm: [50, 250],
          aAxisCenterMm: 100,
        },
        mineralWoolWidthMm: null,
      }),
    ).toEqual({
      catalogCode: "Comp S65 300x200x10-2o",
      catalogDescription:
        "Calenberg Compact Bearing S65, 300 × 200 × 10 mm, with openings.",
      sizeDescription: "300 × 200 × 10 mm",
      holesDescription: "2 ϕ 30: 50/200/50 × 100/100",
      mineralWoolDescription: null,
    });
  });

  it("adds the OBn marker and the outer Ciflamon envelope", () => {
    expect(
      getMyBearingsCommercialDescription({
        commercialTypeCode: "Comp S70",
        commercialTypeName: "Compact Bearing S70",
        aMm: 100,
        bMm: 200,
        thicknessMm: 15,
        holeDiameterMm: 30,
        holeLayout: {
          bAxisCentersMm: [100],
          aAxisCenterMm: 50,
        },
        mineralWoolWidthMm: 25,
      }),
    ).toEqual({
      catalogCode: "Comp S70 OBn 200x100x15-1o",
      catalogDescription:
        "Calenberg Compact Bearing S70, OBn, 200 × 100 × 15 mm, with openings.",
      sizeDescription: "200 × 100 × 15 mm",
      holesDescription: "1 ϕ 30: 100/100 × 50/50",
      mineralWoolDescription: "Ciflamon cover 250 × 150 mm",
    });
  });
});
