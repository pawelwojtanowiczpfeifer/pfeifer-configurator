import MyHStack from "@/app/components/ui/MyHStack";
import { mergeDrawingBounds } from "@/app/components/drawings/primitives/MyDrawingCanvas";
import type { MyBearingsModuleDrawingProps } from "./types";
import MyBearingsBeamTopSideView, {
  getMyBearingsBeamTopSideViewBounds,
  getMyBearingsBeamTopSideViewGeometryBounds,
} from "./MyBearingsBeamTopSideView";
import MyBearingsBeamTopTopView, {
  getMyBearingsBeamTopTopViewBounds,
  getMyBearingsBeamTopTopViewGeometryBounds,
} from "./MyBearingsBeamTopTopView";

const DEFAULT_DIMENSION_REFERENCE = {
  g1: 20,
  g2: 20,
  tc: 15,
  b1: 300,
  a1: 200,
  a2: 300,
  b2: 250,
  b3: 300,
  cmin: 40,
  n: 1 as const,
  ds: 16,
  e1: 100,
  e2: 150,
  e3: 0,
};

function getBoundsScale(currentSize: number, referenceSize: number) {
  if (referenceSize <= 0 || currentSize <= 0) {
    return 1;
  }

  return currentSize / referenceSize;
}

function getBoundsRatio(
  currentBounds:
    | {
        minX: number;
        minY: number;
        maxX: number;
        maxY: number;
      }
    | undefined,
  referenceBounds:
    | {
        minX: number;
        minY: number;
        maxX: number;
        maxY: number;
      }
    | undefined,
) {
  if (!currentBounds || !referenceBounds) {
    return 1;
  }

  return Math.max(
    getBoundsScale(
      currentBounds.maxX - currentBounds.minX,
      referenceBounds.maxX - referenceBounds.minX,
    ),
    getBoundsScale(
      currentBounds.maxY - currentBounds.minY,
      referenceBounds.maxY - referenceBounds.minY,
    ),
  );
}

export default function MyBearingsBeamTopModuleDrawing({
  className,
  ariaLabel = "Bearings module drawing",
  ...geometry
}: MyBearingsModuleDrawingProps) {
  const sharedGeometryBounds =
    mergeDrawingBounds(
      [
        getMyBearingsBeamTopSideViewGeometryBounds(geometry),
        getMyBearingsBeamTopTopViewGeometryBounds(geometry),
      ].filter((bounds) => bounds !== null),
    ) ?? undefined;
  const sideGeometryBounds =
    getMyBearingsBeamTopSideViewGeometryBounds(geometry) ?? undefined;
  const topGeometryBounds =
    getMyBearingsBeamTopTopViewGeometryBounds(geometry) ?? undefined;
  const defaultSharedGeometryBounds =
    mergeDrawingBounds(
      [
        getMyBearingsBeamTopSideViewGeometryBounds({
          ...DEFAULT_DIMENSION_REFERENCE,
          ...geometry,
        }),
        getMyBearingsBeamTopTopViewGeometryBounds({
          ...DEFAULT_DIMENSION_REFERENCE,
          ...geometry,
        }),
      ].filter((bounds) => bounds !== null),
    ) ?? undefined;
  const defaultSideGeometryBounds =
    getMyBearingsBeamTopSideViewGeometryBounds({
      ...DEFAULT_DIMENSION_REFERENCE,
      ...geometry,
    }) ?? undefined;
  const defaultTopGeometryBounds =
    getMyBearingsBeamTopTopViewGeometryBounds({
      ...DEFAULT_DIMENSION_REFERENCE,
      ...geometry,
    }) ?? undefined;
  const dimensionScale = getBoundsRatio(
    sharedGeometryBounds,
    defaultSharedGeometryBounds,
  );
  const sideHatchScale = getBoundsRatio(
    sideGeometryBounds,
    defaultSideGeometryBounds,
  );
  const topHatchScale = getBoundsRatio(
    topGeometryBounds,
    defaultTopGeometryBounds,
  );
  const sharedBounds =
    mergeDrawingBounds(
      [
        getMyBearingsBeamTopSideViewBounds({
          ...geometry,
          dimensionScale,
        }),
        getMyBearingsBeamTopTopViewBounds({
          ...geometry,
          dimensionScale,
        }),
      ].filter((bounds) => bounds !== null),
    ) ?? sharedGeometryBounds;

  return (
    <MyHStack
      gap="sm"
      align="center"
      justify="center"
      width="full"
      minHeight="0"
      p="none"
      className={className}
    >
      <MyBearingsBeamTopSideView
        {...geometry}
        fitBounds={sharedBounds}
        dimensionScale={dimensionScale}
        hatchScale={sideHatchScale}
        ariaLabel={`${ariaLabel} side view`}
      />
      <MyBearingsBeamTopTopView
        {...geometry}
        fitBounds={sharedBounds}
        dimensionScale={dimensionScale}
        hatchScale={topHatchScale}
        ariaLabel={`${ariaLabel} top view`}
      />
    </MyHStack>
  );
}
