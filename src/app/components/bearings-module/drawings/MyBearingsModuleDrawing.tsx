import MyHStack from "@/app/components/ui/MyHStack";
import { mergeDrawingBounds } from "@/app/components/drawings/primitives/MyDrawingCanvas";
import MyBearingsSideView from "./MyBearingsSideView";
import MyBearingsTopView from "./MyBearingsTopView";
import type { MyBearingsModuleDrawingProps } from "./types";
import {
  getMyBearingsSideViewBounds,
  getMyBearingsSideViewGeometryBounds,
} from "./MyBearingsSideView";
import {
  getMyBearingsTopViewBounds,
  getMyBearingsTopViewGeometryBounds,
} from "./MyBearingsTopView";

const DEFAULT_DIMENSION_REFERENCE = {
  g1: 20,
  g2: 15,
  s1: 300,
  s2: 200,
  b: 250,
  c: 30,
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

export default function MyBearingsModuleDrawing({
  g1,
  g2,
  s1,
  s2,
  b,
  c,
  className,
  ariaLabel = "Bearings module drawing",
  ...geometry
}: MyBearingsModuleDrawingProps) {
  const sharedGeometryBounds =
    mergeDrawingBounds([
      getMyBearingsSideViewGeometryBounds({
        ...geometry,
        g1,
        g2,
        s1,
        s2,
        b,
        c,
      }),
      getMyBearingsTopViewGeometryBounds({
        ...geometry,
        g1,
        g2,
        s1,
        s2,
        b,
        c,
      }),
    ].filter((bounds) => bounds !== null)) ?? undefined;
  const sideGeometryBounds =
    getMyBearingsSideViewGeometryBounds({
      ...geometry,
      g1,
      g2,
      s1,
      s2,
      b,
      c,
    }) ?? undefined;
  const topGeometryBounds =
    getMyBearingsTopViewGeometryBounds({
      ...geometry,
      g1,
      g2,
      s1,
      s2,
      b,
      c,
    }) ?? undefined;
  const defaultSharedGeometryBounds =
    mergeDrawingBounds([
      getMyBearingsSideViewGeometryBounds({
        ...DEFAULT_DIMENSION_REFERENCE,
        ...geometry,
        g1: DEFAULT_DIMENSION_REFERENCE.g1,
        g2: DEFAULT_DIMENSION_REFERENCE.g2,
        s1: DEFAULT_DIMENSION_REFERENCE.s1,
        s2: DEFAULT_DIMENSION_REFERENCE.s2,
        b: DEFAULT_DIMENSION_REFERENCE.b,
        c: DEFAULT_DIMENSION_REFERENCE.c,
      }),
      getMyBearingsTopViewGeometryBounds({
        ...DEFAULT_DIMENSION_REFERENCE,
        ...geometry,
        g1: DEFAULT_DIMENSION_REFERENCE.g1,
        g2: DEFAULT_DIMENSION_REFERENCE.g2,
        s1: DEFAULT_DIMENSION_REFERENCE.s1,
        s2: DEFAULT_DIMENSION_REFERENCE.s2,
        b: DEFAULT_DIMENSION_REFERENCE.b,
        c: DEFAULT_DIMENSION_REFERENCE.c,
      }),
    ].filter((bounds) => bounds !== null)) ?? undefined;
  const defaultSideGeometryBounds =
    getMyBearingsSideViewGeometryBounds({
      ...DEFAULT_DIMENSION_REFERENCE,
      ...geometry,
      g1: DEFAULT_DIMENSION_REFERENCE.g1,
      g2: DEFAULT_DIMENSION_REFERENCE.g2,
      s1: DEFAULT_DIMENSION_REFERENCE.s1,
      s2: DEFAULT_DIMENSION_REFERENCE.s2,
      b: DEFAULT_DIMENSION_REFERENCE.b,
      c: DEFAULT_DIMENSION_REFERENCE.c,
    }) ?? undefined;
  const defaultTopGeometryBounds =
    getMyBearingsTopViewGeometryBounds({
      ...DEFAULT_DIMENSION_REFERENCE,
      ...geometry,
      g1: DEFAULT_DIMENSION_REFERENCE.g1,
      g2: DEFAULT_DIMENSION_REFERENCE.g2,
      s1: DEFAULT_DIMENSION_REFERENCE.s1,
      s2: DEFAULT_DIMENSION_REFERENCE.s2,
      b: DEFAULT_DIMENSION_REFERENCE.b,
      c: DEFAULT_DIMENSION_REFERENCE.c,
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
    mergeDrawingBounds([
      getMyBearingsSideViewBounds({
        ...geometry,
        g1,
        g2,
        s1,
        s2,
        b,
        c,
        dimensionScale,
      }),
      getMyBearingsTopViewBounds({
        ...geometry,
        g1,
        g2,
        s1,
        s2,
        b,
        c,
        dimensionScale,
      }),
    ].filter((bounds) => bounds !== null)) ?? sharedGeometryBounds;

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
      <MyBearingsSideView
        {...geometry}
        g1={g1}
        g2={g2}
        s1={s1}
        s2={s2}
        b={b}
        c={c}
        fitBounds={sharedBounds}
        dimensionScale={dimensionScale}
        hatchScale={sideHatchScale}
        ariaLabel={`${ariaLabel} side view`}
      />
      <MyBearingsTopView
        {...geometry}
        g1={g1}
        g2={g2}
        s1={s1}
        s2={s2}
        b={b}
        c={c}
        fitBounds={sharedBounds}
        dimensionScale={dimensionScale}
        hatchScale={topHatchScale}
        ariaLabel={`${ariaLabel} top view`}
      />
    </MyHStack>
  );
}
