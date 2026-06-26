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

function getBeamTopDetailScale({
  a2,
}: Pick<MyBearingsModuleDrawingProps, "a2">) {
  return getBoundsScale(a2, DEFAULT_DIMENSION_REFERENCE.a2);
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
  const beamTopDetailScale = getBeamTopDetailScale(geometry);
  const dimensionScale = beamTopDetailScale;
  const sideHatchScale = beamTopDetailScale;
  const topHatchScale = beamTopDetailScale;
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
