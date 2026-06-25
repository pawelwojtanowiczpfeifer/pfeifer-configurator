import MyDrawingCanvas, {
  getDrawingBoundsFromChildren,
} from "@/app/components/drawings/primitives/MyDrawingCanvas";
import MyDrawingDimensionLine from "@/app/components/drawings/primitives/MyDrawingDimensionLine";
import { MyDrawingPolygonShape } from "@/app/components/drawings/primitives/MyDrawingPolygon";
import type { MyBearingsSideViewProps } from "./types";
import { MyDrawingLine } from "../../drawings";

function renderMyBearingsBeamTopSideViewGeometry({
  isEndNotchedBeam,
  g1,
  tc,
  b1,
  a1,
  b2,
  cmin,
  e1,
  ds,
  hasStuds = false,
  dimensionScale = 1,
  hatchScale = 1,
  ...geometry
}: MyBearingsSideViewProps) {
  void b1;
  void b2;
  void cmin;
  void geometry;
  void dimensionScale;

  return <> null </>;
}

function renderMyBearingsBeamTopSideViewDimensions({
  g1,
  tc,
  b1,
  a1,
  b2,
  cmin,
  e1,
  hasStuds = false,
  dimensionScale = 1,
}: MyBearingsSideViewProps) {
  void b1;
  void b2;
  void cmin;

  return <>null</>;
}

export function getMyBearingsBeamTopSideViewGeometryBounds({
  g1,
  tc,
  b1,
  a1,
  b2,
  cmin,
  ...geometry
}: MyBearingsSideViewProps) {
  return getDrawingBoundsFromChildren(
    renderMyBearingsBeamTopSideViewGeometry({
      g1,
      tc,
      b1,
      a1,
      b2,
      cmin,
      ...geometry,
    }),
  );
}

export function getMyBearingsBeamTopSideViewBounds({
  g1,
  tc,
  b1,
  a1,
  b2,
  cmin,
  dimensionScale = 1,
  ...geometry
}: MyBearingsSideViewProps) {
  return getDrawingBoundsFromChildren(
    <>
      {renderMyBearingsBeamTopSideViewGeometry({
        g1,
        tc,
        b1,
        a1,
        b2,
        cmin,
        ...geometry,
      })}
      {renderMyBearingsBeamTopSideViewDimensions({
        g1,
        tc,
        b1,
        a1,
        b2,
        cmin,
        dimensionScale,
        ...geometry,
      })}
    </>,
  );
}

export default function MyBearingsBeamTopSideView({
  g1,
  tc,
  b1,
  a1,
  b2,
  cmin,
  className,
  ariaLabel = "Bearings side view",
  fitBounds,
  dimensionScale = 1,
  ...geometry
}: MyBearingsSideViewProps) {
  return (
    <MyDrawingCanvas
      fit="content"
      fitBounds={fitBounds}
      width="full"
      height="full"
      px="3xl"
      py="sm"
      align="center"
      justify="center"
      className={className}
      ariaLabel={ariaLabel}
    >
      {renderMyBearingsBeamTopSideViewGeometry({
        g1,
        tc,
        b1,
        a1,
        b2,
        cmin,
        ...geometry,
      })}
      {renderMyBearingsBeamTopSideViewDimensions({
        g1,
        tc,
        b1,
        a1,
        b2,
        cmin,
        dimensionScale,
        ...geometry,
      })}
    </MyDrawingCanvas>
  );
}

MyBearingsBeamTopSideView.getBounds = getMyBearingsBeamTopSideViewBounds;
