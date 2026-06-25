import MyDrawingCanvas, {
  getDrawingBoundsFromChildren,
} from "@/app/components/drawings/primitives/MyDrawingCanvas";
import MyDrawingDimensionLine from "@/app/components/drawings/primitives/MyDrawingDimensionLine";
import { MyDrawingPolygonShape } from "@/app/components/drawings/primitives/MyDrawingPolygon";
import type { MyBearingsTopViewProps } from "./types";
import { MyDrawingCircle } from "../../drawings";

const DRAWING_REFERENCE = {
  a2: 200,
  b2: 250,
  b3: 300,
};

const INPUT_REFERENCE = {
  a2: 300,
  b2: 250,
  b3: 300,
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

function renderMyBearingsBeamTopTopViewGeometry({
  g2,
  a2,
  b2,
  b3,
  cmin,
  n,
  ds,
  e1,
  e2,
  e3,
  hasStuds = false,
  dimensionScale = 1,
  hatchScale = 1,
  ...geometry
}: MyBearingsTopViewProps) {
  void geometry;
  void dimensionScale;

  const columnLength = scaleWithinFrame(
    a2,
    INPUT_REFERENCE.a2,
    DRAWING_REFERENCE.a2,
    0.35,
    1,
  );
  const columnWidth = scaleWithinFrame(
    b3,
    INPUT_REFERENCE.b3,
    DRAWING_REFERENCE.b3,
    0.35,
    1,
  );
  const beamStartX = g2;
  const beamEndX = columnLength + 0.75 * columnLength;
  const beamWidth = scaleWithinFrame(
    b2,
    INPUT_REFERENCE.b2,
    DRAWING_REFERENCE.b2,
    0.12,
    1,
  );
  const beamStartY = (columnWidth - beamWidth) / 2;
  const beamEndY = beamStartY + beamWidth;

  const contactStartX = Math.max(0, beamStartX);
  const contactEndX = Math.min(columnLength, beamEndX);
  const contactStartY = Math.max(0, beamStartY);
  const contactEndY = Math.min(columnWidth, beamEndY);

  const effectiveEdgeDistance = cmin;
  const effectiveStartX = contactStartX + effectiveEdgeDistance;
  const effectiveEndX = contactEndX - effectiveEdgeDistance;
  const effectiveStartY = contactStartY + effectiveEdgeDistance;
  const effectiveEndY = contactEndY - effectiveEdgeDistance;
  const shouldRenderEffectiveArea =
    effectiveStartX < effectiveEndX && effectiveStartY < effectiveEndY;

  const studX = columnLength - e1;
  const studY1 = e2;
  const studY2 = e2 + e3;

  return (
    <>
      <MyDrawingPolygonShape
        points={[
          { x: 0, y: 0 },
          { x: columnLength, y: 0 },
          { x: columnLength, y: columnWidth },
          { x: 0, y: columnWidth },
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
          spacing: 30,
          variant: "none",
          color: "#9ca3af",
          lineWidth: 1,
          backgroundColor: "rgba(160, 160, 160, 0.6)",
          scale: hatchScale,
        }}
      />
      <MyDrawingPolygonShape
        points={[
          { x: beamStartX, y: beamStartY },
          { x: beamEndX, y: beamStartY },
          { x: beamEndX, y: beamEndY },
          { x: beamStartX, y: beamEndY },
        ]}
        label="Beam"
        edges={[
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
          backgroundColor: "rgba(220, 220, 220, 0.8)",
          scale: hatchScale,
        }}
      />
      {shouldRenderEffectiveArea ? (
        <MyDrawingPolygonShape
          points={[
            { x: effectiveStartX, y: effectiveStartY },
            { x: effectiveEndX, y: effectiveStartY },
            { x: effectiveEndX, y: effectiveEndY },
            { x: effectiveStartX, y: effectiveEndY },
          ]}
          label="Effective contact area"
          edges={[
            {
              lineWidth: "thin",
              lineStyle: "dashed",
              lineColor: "#2563eb",
            },
            {
              lineWidth: "thin",
              lineStyle: "dashed",
              lineColor: "#2563eb",
            },
            {
              lineWidth: "thin",
              lineStyle: "dashed",
              lineColor: "#2563eb",
            },
            {
              lineWidth: "thin",
              lineStyle: "dashed",
              lineColor: "#2563eb",
            },
          ]}
          hatch={false}
        />
      ) : null}
      {hasStuds ? (
        <MyDrawingCircle
          center={{ x: studX, y: studY1 }}
          diameter={ds}
          lineWidth="thin"
          lineStyle="solid"
          lineColor="black"
          fillColor="gray"
        />
      ) : null}
      {hasStuds ? (
        <MyDrawingCircle
          center={{ x: studX, y: studY1 }}
          diameter={ds + 0.5 * ds}
          lineWidth="thin"
          lineStyle="solid"
          lineColor="black"
          fillColor="none"
        />
      ) : null}
      {hasStuds && n === 2 ? (
        <MyDrawingCircle
          center={{ x: studX, y: studY2 }}
          diameter={ds}
          lineWidth="thin"
          lineStyle="solid"
          lineColor="black"
          fillColor="gray"
        />
      ) : null}
      {hasStuds && n === 2 ? (
        <MyDrawingCircle
          center={{ x: studX, y: studY2 }}
          diameter={ds + 0.5 * ds}
          lineWidth="thin"
          lineStyle="solid"
          lineColor="black"
          fillColor="none"
        />
      ) : null}
    </>
  );
}

function renderMyBearingsBeamTopTopViewDimensions({
  g2,
  a2,
  b2,
  b3,
  cmin,
  n,
  ds,
  e1,
  e2,
  e3,
  hasStuds = false,
  dimensionScale = 1,
}: MyBearingsTopViewProps) {
  void cmin;
  void n;
  void ds;

  const columnLength = scaleWithinFrame(
    a2,
    INPUT_REFERENCE.a2,
    DRAWING_REFERENCE.a2,
    0.35,
    1,
  );
  const columnWidth = scaleWithinFrame(
    b3,
    INPUT_REFERENCE.b3,
    DRAWING_REFERENCE.b3,
    0.35,
    1,
  );
  const beamStartX = g2;
  const beamWidth = scaleWithinFrame(
    b2,
    INPUT_REFERENCE.b2,
    DRAWING_REFERENCE.b2,
    0.12,
    1,
  );
  const beamStartY = (columnWidth - beamWidth) / 2;
  const beamEndY = beamStartY + beamWidth;
  const studX = columnLength - e1;
  const studY1 = e2;
  const studY2 = e2 + e3;

  return (
    <>
      <MyDrawingDimensionLine
        start={{ x: 0, y: 0 }}
        end={{ x: beamStartX, y: 0 }}
        value={g2}
        symbol="g2"
        sizeScale={dimensionScale}
        textSize="lg"
        textGap={20}
        dimensionLinePosition="above"
        arrowSize="xl"
        arrowStyle="filled"
        lineColor="black"
      />
      <MyDrawingDimensionLine
        start={{ x: columnLength + (hasStuds ? 0.2 * columnLength : 0), y: 0 }}
        end={{
          x: columnLength + (hasStuds ? 0.2 * columnLength : 0),
          y: columnWidth,
        }}
        value={b3}
        symbol="B3"
        sizeScale={dimensionScale}
        textSize="lg"
        textOrientation="vertical"
        textGap={-10}
        dimensionLinePosition="above"
        arrowSize="xl"
        arrowStyle="filled"
        lineColor="black"
      />
      <MyDrawingDimensionLine
        start={{
          x: columnLength + (hasStuds ? 0.4 * columnLength : 0.2 * columnLength),
          y: beamStartY,
        }}
        end={{
          x: columnLength + (hasStuds ? 0.4 * columnLength : 0.2 * columnLength),
          y: beamEndY,
        }}
        value={b2}
        symbol="B2"
        sizeScale={dimensionScale}
        textSize="lg"
        textOrientation="vertical"
        textGap={-15}
        dimensionLinePosition="above"
        arrowSize="xl"
        arrowStyle="filled"
        lineColor="black"
      />
      {hasStuds ? (
        <MyDrawingDimensionLine
          start={{ x: studX, y: columnWidth }}
          end={{ x: columnLength, y: columnWidth }}
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
      {hasStuds ? (
        <MyDrawingDimensionLine
          start={{ x: columnLength, y: 0 }}
          end={{ x: columnLength, y: studY1 }}
          value={e2}
          symbol="e2"
          sizeScale={dimensionScale}
          textSize="lg"
          textOrientation="vertical"
          textGap={-15}
          textOffsetY={e2 < 90 ? e2 * -0.5 - 55 : 0}
          dimensionLinePosition="above"
          arrowSize="xl"
          arrowStyle="filled"
          lineColor="black"
        />
      ) : null}
      {hasStuds && n === 2 ? (
        <MyDrawingDimensionLine
          start={{ x: columnLength, y: studY1 }}
          end={{ x: columnLength, y: studY2 }}
          value={e3}
          symbol="e3"
          sizeScale={dimensionScale}
          textSize="lg"
          textOrientation="vertical"
          textGap={-15}
          textOffsetY={e3 < 90 ? e3 * 0.5 + 55 : 0}
          dimensionLinePosition="above"
          arrowSize="xl"
          arrowStyle="filled"
          lineColor="black"
        />
      ) : null}
    </>
  );
}

export function getMyBearingsBeamTopTopViewGeometryBounds(
  props: MyBearingsTopViewProps,
) {
  return getDrawingBoundsFromChildren(
    renderMyBearingsBeamTopTopViewGeometry(props),
  );
}

export function getMyBearingsBeamTopTopViewBounds(
  props: MyBearingsTopViewProps,
) {
  return getDrawingBoundsFromChildren(
    <>
      {renderMyBearingsBeamTopTopViewGeometry(props)}
      {renderMyBearingsBeamTopTopViewDimensions(props)}
    </>,
  );
}

export default function MyBearingsBeamTopTopView(
  props: MyBearingsTopViewProps,
) {
  const { className, ariaLabel = "Bearings top view", fitBounds } = props;

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
      {renderMyBearingsBeamTopTopViewGeometry(props)}
      {renderMyBearingsBeamTopTopViewDimensions(props)}
    </MyDrawingCanvas>
  );
}

MyBearingsBeamTopTopView.getBounds = getMyBearingsBeamTopTopViewBounds;
