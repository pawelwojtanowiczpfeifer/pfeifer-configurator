import MyDrawingCanvas, {
  getDrawingBoundsFromChildren,
} from "@/app/components/drawings/primitives/MyDrawingCanvas";
import MyDrawingDimensionLine from "@/app/components/drawings/primitives/MyDrawingDimensionLine";
import { MyDrawingPolygonShape } from "@/app/components/drawings/primitives/MyDrawingPolygon";
import type { MyBearingsSideViewProps } from "./types";
import { MyDrawingLine } from "../../drawings";

function renderMyBearingsCantileverSideViewGeometry({
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
  const beamStartX = 1.2 * a1 + g1;
  const beamEndX = 1.2 * a1 + a1 + 0.75 * a1;
  const beamBottomY = 1.2 * a1;

  return (
    <>
      {hasStuds ? (
        <MyDrawingPolygonShape
          points={[
            { x: 1.2 * a1 + a1 - e1 - 0.5 * ds, y: 0 },
            { x: 1.2 * a1 + a1 - e1 - 0.5 * ds + ds, y: 0 },
            {
              x: 1.2 * a1 + a1 - e1 - 0.5 * ds + ds,
              y: 1.2 * a1 + tc + a1 - 35,
            },
            {
              x: 1.2 * a1 + a1 - e1 - 0.5 * ds,
              y: 1.2 * a1 + tc + a1 - 35,
            },
          ]}
          label="Stud"
          edges={[
            {
              lineWidth: "thin",
              lineStyle: "dashed",
              lineColor: "gray",
            },
            {
              lineWidth: "thin",
              lineStyle: "dashed",
              lineColor: "gray",
            },
            {
              lineWidth: "thin",
              lineStyle: "dashed",
              lineColor: "gray",
            },
            {
              lineWidth: "thin",
              lineStyle: "dashed",
              lineColor: "gray",
            },
          ]}
          hatch={{
            spacing: 10,
            variant: "secondary",
            color: "gray",
            lineWidth: 1,
            backgroundColor: "rgba(220, 220, 220, 0.8)",
            scale: hatchScale,
          }}
        />
      ) : null}
      {hasStuds ? (
        <MyDrawingLine
          start={{
            x: 1.2 * a1 + a1 - e1 - 0.5 * ds - (1.5 * ds - ds) / 2,
            y: 0,
          }}
          end={{
            x: 1.2 * a1 + a1 - e1 - 0.5 * ds - (1.5 * ds - ds) / 2,
            y: 1.2 * a1,
          }}
          lineWidth="thin"
          lineStyle="dashed"
          lineColor="gray"
        />
      ) : null}
      {hasStuds ? (
        <MyDrawingLine
          start={{
            x: 1.2 * a1 + a1 - e1 + 0.5 * ds + (1.5 * ds - ds) / 2,
            y: 0,
          }}
          end={{
            x: 1.2 * a1 + a1 - e1 + 0.5 * ds + (1.5 * ds - ds) / 2,
            y: 1.2 * a1,
          }}
          lineWidth="thin"
          lineStyle="dashed"
          lineColor="gray"
        />
      ) : null}
      <MyDrawingPolygonShape
        points={[
          { x: 0, y: 0 },
          { x: 1.2 * a1, y: 0 },
          { x: 1.2 * a1, y: 1.2 * a1 + tc },
          { x: 1.2 * a1 + a1, y: 1.2 * a1 + tc },
          { x: 1.2 * a1 + a1, y: 1.2 * a1 + tc + a1 },
          { x: 1.2 * a1, y: 1.2 * a1 + tc + a1 },
          { x: 1.2 * a1, y: 1.2 * a1 + tc + a1 + 0.5 * a1 },
          { x: 0, y: 1.2 * a1 + tc + a1 + 0.5 * a1 },
        ]}
        label="Support"
        edges={[
          {
            lineWidth: "thin",
            lineStyle: "dashDot",
            lineColor: "gray",
          },
          {
            lineWidth: "thin",
            lineStyle: "solid",
            lineColor: "black",
          },
          {
            lineWidth: "thin",
            lineStyle: "solid",
            lineColor: "black",
          },
          {
            lineWidth: "thin",
            lineStyle: "solid",
            lineColor: "black",
          },
          {
            lineWidth: "thin",
            lineStyle: "solid",
            lineColor: "black",
          },
          {
            lineWidth: "thin",
            lineStyle: "solid",
            lineColor: "black",
          },
          {
            lineWidth: "thin",
            lineStyle: "dashDot",
            lineColor: "gray",
          },
          {
            lineWidth: "thin",
            lineStyle: "dashDot",
            lineColor: "gray",
          },
        ]}
        hatch={{
          spacing: 30,
          variant: "none",
          color: "#9ca3af",
          lineWidth: 1,
          backgroundColor: "rgba(160, 160, 160, 0.6)",
          scale: hatchScale,
        }}
      />
      {!isEndNotchedBeam ? (
        <MyDrawingPolygonShape
          points={[
            { x: beamStartX, y: 0 },
            { x: beamEndX, y: 0 },
            { x: beamEndX, y: beamBottomY },
            { x: beamStartX, y: beamBottomY },
          ]}
          label="Beam"
          edges={[
            {
              lineWidth: "thin",
              lineStyle: "dashDot",
              lineColor: "gray",
            },
            {
              lineWidth: "thin",
              lineStyle: "dashDot",
              lineColor: "gray",
            },
            {
              lineWidth: "thin",
              lineStyle: "solid",
              lineColor: "black",
            },
            {
              lineWidth: "thin",
              lineStyle: "solid",
              lineColor: "black",
            },
          ]}
          hatch={{
            spacing: 20,
            variant: "cross",
            color: "gray",
            lineWidth: 1,
            backgroundColor: "rgba(220, 220, 220, 0.6)",
            scale: hatchScale,
          }}
        />
      ) : null}
      {isEndNotchedBeam ? (
        <MyDrawingPolygonShape
          points={[
            { x: beamStartX, y: 0 },
            { x: beamEndX, y: 0 },
            { x: beamEndX, y: 1.2 * a1 + tc + a1 },
            { x: beamStartX + a1, y: 1.2 * a1 + tc + a1 },
            { x: beamStartX + a1, y: 1.2 * a1 },
            { x: beamStartX, y: beamBottomY },
          ]}
          label="Beam"
          edges={[
            {
              lineWidth: "thin",
              lineStyle: "dashDot",
              lineColor: "gray",
            },
            {
              lineWidth: "thin",
              lineStyle: "dashDot",
              lineColor: "gray",
            },
            {
              lineWidth: "thin",
              lineStyle: "solid",
              lineColor: "black",
            },
            {
              lineWidth: "thin",
              lineStyle: "solid",
              lineColor: "black",
            },
            {
              lineWidth: "thin",
              lineStyle: "solid",
              lineColor: "black",
            },
            {
              lineWidth: "thin",
              lineStyle: "solid",
              lineColor: "black",
            },
          ]}
          hatch={{
            spacing: 20,
            variant: "cross",
            color: "gray",
            lineWidth: 1,
            backgroundColor: "rgba(220, 220, 220, 0.6)",
            scale: hatchScale,
          }}
        />
      ) : null}
    </>
  );
}

function renderMyBearingsCantileverSideViewDimensions({
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

  return (
    <>
      <MyDrawingDimensionLine
        start={{ x: 1.2 * a1, y: 0 }}
        end={{ x: 1.2 * a1 + g1, y: 0 }}
        value={g1}
        symbol="g1"
        sizeScale={dimensionScale}
        textSize="lg"
        textGap={20}
        dimensionLinePosition="above"
        arrowSize="xl"
        arrowStyle="filled"
      />
      <MyDrawingDimensionLine
        start={{ x: 1.2 * a1, y: 1.2 * a1 + tc }}
        end={{ x: 1.2 * a1, y: 1.2 * a1 }}
        value={tc}
        symbol="t_c"
        sizeScale={dimensionScale}
        textSize="lg"
        textGap={0}
        dimensionLinePosition="above"
        arrowSize="xl"
        arrowStyle="filled"
        lineColor="black"
      />
      <MyDrawingDimensionLine
        start={{ x: 1.2 * a1, y: 1.2 * a1 + tc + a1 + (hasStuds ? 45 : 0) }}
        end={{
          x: 1.2 * a1 + a1,
          y: 1.2 * a1 + tc + a1 + (hasStuds ? 45 : 0),
        }}
        value={a1}
        symbol="A1"
        sizeScale={dimensionScale}
        textSize="lg"
        textGap={10}
        dimensionLinePosition="below"
        arrowSize="xl"
        arrowStyle="filled"
        lineColor="black"
      />
      {hasStuds ? (
        <MyDrawingDimensionLine
          start={{
            x: 1.2 * a1 + a1 - e1,
            y: 1.2 * a1 + tc + a1,
          }}
          end={{ x: 1.2 * a1 + a1, y: 1.2 * a1 + tc + a1 }}
          value={e1}
          symbol="e1"
          sizeScale={dimensionScale}
          textSize="lg"
          textGap={10}
          textOffsetY={e1 <= 100 ? -5 : 0}
          textOffsetX={e1 < 90 ? e1 * 0.5 + 52 : 0}
          dimensionLinePosition="below"
          arrowSize="xl"
          arrowStyle="filled"
          lineColor="black"
        />
      ) : null}
    </>
  );
}

export function getMyBearingsCantileverSideViewGeometryBounds({
  g1,
  tc,
  b1,
  a1,
  b2,
  cmin,
  ...geometry
}: MyBearingsSideViewProps) {
  return getDrawingBoundsFromChildren(
    renderMyBearingsCantileverSideViewGeometry({
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

export function getMyBearingsCantileverSideViewBounds({
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
      {renderMyBearingsCantileverSideViewGeometry({
        g1,
        tc,
        b1,
        a1,
        b2,
        cmin,
        ...geometry,
      })}
      {renderMyBearingsCantileverSideViewDimensions({
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

export default function MyBearingsCantileverSideView({
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
      {renderMyBearingsCantileverSideViewGeometry({
        g1,
        tc,
        b1,
        a1,
        b2,
        cmin,
        ...geometry,
      })}
      {renderMyBearingsCantileverSideViewDimensions({
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

MyBearingsCantileverSideView.getBounds = getMyBearingsCantileverSideViewBounds;
