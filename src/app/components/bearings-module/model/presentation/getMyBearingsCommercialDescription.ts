export type MyBearingsHoleLayoutFromPadEdges = {
  /** Hole centre positions measured from the first b edge of the pad. */
  bAxisCentersMm: number[];
  /** Shared hole centre position measured from the first a edge of the pad. */
  aAxisCenterMm: number;
};

export type MyBearingsCommercialDescriptionInput = {
  /** Commercial prefix, for example `Comp S65`. */
  commercialTypeCode: string;
  /** Commercial product name without dimensions, for example `Compact Bearing S65`. */
  commercialTypeName: string;
  /** Final pad dimension in the a direction. */
  aMm: number;
  /** Final pad dimension in the b direction. */
  bMm: number;
  thicknessMm: number;
  holeDiameterMm: number | null;
  holeLayout: MyBearingsHoleLayoutFromPadEdges | null;
  mineralWoolWidthMm: number | null;
};

export type MyBearingsCommercialDescription = {
  catalogCode: string;
  catalogDescription: string;
  sizeDescription: string;
  holesDescription: string | null;
  mineralWoolDescription: string | null;
};

function formatMm(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 3,
    useGrouping: false,
  }).format(value);
}

function getPadEdgeSegments(
  sizeMm: number,
  centersMm: number[],
  direction: "a" | "b",
) {
  if (centersMm.length === 0) {
    throw new Error(`At least one ${direction}-axis hole centre is required.`);
  }

  const sortedCenters = [...centersMm].sort((left, right) => left - right);

  if (sortedCenters.some((center) => center < 0 || center > sizeMm)) {
    throw new Error(`Hole centres must be within the pad ${direction} dimension.`);
  }

  return [
    sortedCenters[0],
    ...sortedCenters.slice(1).map((center, index) => center - sortedCenters[index]),
    sizeMm - sortedCenters[sortedCenters.length - 1],
  ];
}

/**
 * Formats the catalogue-facing identity of the final bearing pad.
 * Dimensions are deliberately ordered b x a x t, matching the commercial
 * convention rather than the internal a/width and b/length naming.
 */
export function getMyBearingsCommercialDescription({
  commercialTypeCode,
  commercialTypeName,
  aMm,
  bMm,
  thicknessMm,
  holeDiameterMm,
  holeLayout,
  mineralWoolWidthMm,
}: MyBearingsCommercialDescriptionInput): MyBearingsCommercialDescription {
  const hasHoles = holeLayout != null && holeDiameterMm != null;

  if ((holeLayout == null) !== (holeDiameterMm == null)) {
    throw new Error("A hole layout and hole diameter must be provided together.");
  }

  const holeCount = holeLayout?.bAxisCentersMm.length ?? 0;
  const woolMarker = mineralWoolWidthMm != null ? " OBn" : "";
  const holesMarker = hasHoles ? `-${holeCount}o` : "";
  const sizeDescription = `${formatMm(bMm)} × ${formatMm(aMm)} × ${formatMm(thicknessMm)} mm`;

  const holesDescription = hasHoles && holeLayout != null && holeDiameterMm != null
    ? (() => {
        const bSegments = getPadEdgeSegments(
          bMm,
          holeLayout.bAxisCentersMm,
          "b",
        );
        const aSegments = getPadEdgeSegments(aMm, [holeLayout.aAxisCenterMm], "a");

        return `${holeCount} ϕ ${formatMm(holeDiameterMm)}: ${bSegments
          .map(formatMm)
          .join("/")} × ${aSegments.map(formatMm).join("/")}`;
      })()
    : null;

  const mineralWoolDescription = mineralWoolWidthMm != null
    ? `Ciflamon cover ${formatMm(bMm + 2 * mineralWoolWidthMm)} × ${formatMm(aMm + 2 * mineralWoolWidthMm)} mm`
    : null;

  return {
    catalogCode: `${commercialTypeCode}${woolMarker} ${formatMm(bMm)}x${formatMm(aMm)}x${formatMm(thicknessMm)}${holesMarker}`,
    catalogDescription: `Calenberg ${commercialTypeName}${woolMarker ? ", OBn," : ","} ${sizeDescription}${hasHoles ? ", with openings." : ""}`,
    sizeDescription,
    holesDescription,
    mineralWoolDescription,
  };
}
