import MyDrawingCanvas, {
  getDrawingBoundsFromChildren,
} from "@/app/components/drawings/primitives/MyDrawingCanvas";
import MyDrawingDimensionLine from "@/app/components/drawings/primitives/MyDrawingDimensionLine";
import { MyDrawingPolygonShape } from "@/app/components/drawings/primitives/MyDrawingPolygon";
import type { MyBearingsSideViewProps } from "./types";

const DRAWING_REFERENCE = {
  a2: 200,
};

const INPUT_REFERENCE = {
  a2: 300,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function scaleWithinFrame(
  value: number,
  inputReference: number,
  drawingReference: number,
  minRatio: number,
  maxRatio: number,
) {
  const scaled =
    inputReference > 0 ? (value / inputReference) * drawingReference : value;

  return clamp(scaled, drawingReference * minRatio, drawingReference * maxRatio);
}

function renderMyBearingsBeamTopSideViewGeometry({
  isEndNotchedBeam,
  g2,
  tc,
  a2,
  b3,
  b2,
  cmin,
  dimensionScale = 1,
  hatchScale = 1,
  ...geometry
}: MyBearingsSideViewProps) {
  void b3;
  void b2;
  void cmin;
  void geometry;
  void dimensionScale;

  const columnWidth = scaleWithinFrame(
    a2,
    INPUT_REFERENCE.a2,
    DRAWING_REFERENCE.a2,
    0.35,
    1,
  );
  const beamStartX = g2;
  const beamEndX = columnWidth + 0.75 * columnWidth;
  const beamBottomY = 1.2 * columnWidth;
  const columnTopY = beamBottomY + tc;
  const columnBottomY = columnTopY + columnWidth;

  return (
    <>
      <MyDrawingPolygonShape
        points={[
          { x: 0, y: columnTopY },
          { x: columnWidth, y: columnTopY },
          { x: columnWidth, y: columnBottomY },
          { x: 0, y: columnBottomY },
        ]}
        label="Column"
        edges={[
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
            lineStyle: "solid",
            lineColor: "black",
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
            { x: beamEndX, y: columnTopY + columnWidth },
            { x: beamStartX + columnWidth, y: columnTopY + columnWidth },
            { x: beamStartX + columnWidth, y: beamBottomY },
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

function renderMyBearingsBeamTopSideViewDimensions({
  g2,
  tc,
  a2,
  b3,
  b2,
  cmin,
  dimensionScale = 1,
}: MyBearingsSideViewProps) {
  void b3;
  void b2;
  void cmin;

  const columnWidth = scaleWithinFrame(
    a2,
    INPUT_REFERENCE.a2,
    DRAWING_REFERENCE.a2,
    0.35,
    1,
  );
  const beamStartX = g2;
  const beamBottomY = 1.2 * columnWidth;
  const columnTopY = beamBottomY + tc;
  const columnBottomY = columnTopY + columnWidth;

  return (
    <>
      <MyDrawingDimensionLine
        start={{ x: 0, y: beamBottomY }}
        end={{ x: beamStartX, y: beamBottomY }}
        value={g2}
        symbol="g2"
        sizeScale={dimensionScale}
        textSize="lg"
        textGap={0}
        textOffsetX={-(0.5 * beamStartX + 32)}
        dimensionLinePosition="above"
        arrowSize="xl"
        arrowStyle="filled"
        lineColor="black"
      />
      <MyDrawingDimensionLine
        start={{ x: 0, y: columnTopY }}
        end={{ x: 0, y: beamBottomY }}
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
        start={{ x: 0, y: columnBottomY }}
        end={{ x: columnWidth, y: columnBottomY }}
        value={a2}
        symbol="A2"
        sizeScale={dimensionScale}
        textSize="lg"
        textGap={10}
        dimensionLinePosition="below"
        arrowSize="xl"
        arrowStyle="filled"
        lineColor="black"
      />
    </>
  );
}

export function getMyBearingsBeamTopSideViewGeometryBounds(
  props: MyBearingsSideViewProps,
) {
  return getDrawingBoundsFromChildren(
    renderMyBearingsBeamTopSideViewGeometry(props),
  );
}

export function getMyBearingsBeamTopSideViewBounds(
  props: MyBearingsSideViewProps,
) {
  return getDrawingBoundsFromChildren(
    <>
      {renderMyBearingsBeamTopSideViewGeometry(props)}
      {renderMyBearingsBeamTopSideViewDimensions(props)}
    </>,
  );
}

export default function MyBearingsBeamTopSideView(
  props: MyBearingsSideViewProps,
) {
  const { className, ariaLabel = "Bearings side view", fitBounds } = props;

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
      {renderMyBearingsBeamTopSideViewGeometry(props)}
      {renderMyBearingsBeamTopSideViewDimensions(props)}
    </MyDrawingCanvas>
  );
}

MyBearingsBeamTopSideView.getBounds = getMyBearingsBeamTopSideViewBounds;
