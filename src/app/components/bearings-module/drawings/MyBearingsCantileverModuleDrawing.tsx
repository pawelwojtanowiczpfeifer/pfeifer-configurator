import MyHStack from "@/app/components/ui/MyHStack";
import { mergeDrawingBounds } from "@/app/components/drawings/primitives/MyDrawingCanvas";
import MyBearingsCantileverSideView from "./MyBearingsCantileverSideView";
import MyBearingsCantileverTopView from "./MyBearingsCantileverTopView";
import type { MyBearingsModuleDrawingProps } from "./types";
import {
  getMyBearingsCantileverSideViewBounds,
  getMyBearingsCantileverSideViewGeometryBounds,
} from "./MyBearingsCantileverSideView";
import {
  getMyBearingsCantileverTopViewBounds,
  getMyBearingsCantileverTopViewGeometryBounds,
} from "./MyBearingsCantileverTopView";

const DEFAULT_DIMENSION_REFERENCE = {
  g1: 20,
  g2: 0.25 * 300,
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

function getBoundsWidthRatio(
  currentBounds:
    | {
        minX: number;
        maxX: number;
      }
    | undefined,
  referenceBounds:
    | {
        minX: number;
        maxX: number;
      }
    | undefined,
) {
  if (!currentBounds || !referenceBounds) {
    return 1;
  }

  return getBoundsScale(
    currentBounds.maxX - currentBounds.minX,
    referenceBounds.maxX - referenceBounds.minX,
  );
}

export default function MyBearingsCantileverModuleDrawing({
  g1,
  tc,
  b1,
  a1,
  b2,
  cmin,
  className,
  ariaLabel = "Bearings module drawing",
  ...geometry
}: MyBearingsModuleDrawingProps) {
  const sharedGeometryBounds =
    mergeDrawingBounds([
      getMyBearingsCantileverSideViewGeometryBounds({
        ...geometry,
        g1,
        tc,
        b1,
        a1,
        b2,
        cmin,
      }),
      getMyBearingsCantileverTopViewGeometryBounds({
        ...geometry,
        g1,
        tc,
        b1,
        a1,
        b2,
        cmin,
      }),
    ].filter((bounds) => bounds !== null)) ?? undefined;
  const defaultSharedGeometryBounds =
    mergeDrawingBounds([
      getMyBearingsCantileverSideViewGeometryBounds({
        ...DEFAULT_DIMENSION_REFERENCE,
        ...geometry,
        g1: DEFAULT_DIMENSION_REFERENCE.g1,
        tc: DEFAULT_DIMENSION_REFERENCE.tc,
        b1: DEFAULT_DIMENSION_REFERENCE.b1,
        a1: DEFAULT_DIMENSION_REFERENCE.a1,
        b2: DEFAULT_DIMENSION_REFERENCE.b2,
        cmin: DEFAULT_DIMENSION_REFERENCE.cmin,
      }),
      getMyBearingsCantileverTopViewGeometryBounds({
        ...DEFAULT_DIMENSION_REFERENCE,
        ...geometry,
        g1: DEFAULT_DIMENSION_REFERENCE.g1,
        tc: DEFAULT_DIMENSION_REFERENCE.tc,
        b1: DEFAULT_DIMENSION_REFERENCE.b1,
        a1: DEFAULT_DIMENSION_REFERENCE.a1,
        b2: DEFAULT_DIMENSION_REFERENCE.b2,
        cmin: DEFAULT_DIMENSION_REFERENCE.cmin,
      }),
    ].filter((bounds) => bounds !== null)) ?? undefined;
  const dimensionScale = getBoundsWidthRatio(
    sharedGeometryBounds,
    defaultSharedGeometryBounds,
  );
  const hatchScale = dimensionScale;
  const sharedBounds =
    mergeDrawingBounds([
      getMyBearingsCantileverSideViewBounds({
        ...geometry,
        g1,
        tc,
        b1,
        a1,
        b2,
        cmin,
        dimensionScale,
      }),
      getMyBearingsCantileverTopViewBounds({
        ...geometry,
        g1,
        tc,
        b1,
        a1,
        b2,
        cmin,
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
      <MyBearingsCantileverSideView
        {...geometry}
        g1={g1}
        tc={tc}
        b1={b1}
        a1={a1}
        b2={b2}
        cmin={cmin}
        fitBounds={sharedBounds}
        dimensionScale={dimensionScale}
        hatchScale={hatchScale}
        ariaLabel={`${ariaLabel} side view`}
      />
      <MyBearingsCantileverTopView
        {...geometry}
        g1={g1}
        tc={tc}
        b1={b1}
        a1={a1}
        b2={b2}
        cmin={cmin}
        fitBounds={sharedBounds}
        dimensionScale={dimensionScale}
        hatchScale={hatchScale}
        ariaLabel={`${ariaLabel} top view`}
      />
    </MyHStack>
  );
}
