import MyDrawingCanvas, {
  getDrawingBoundsFromChildren,
} from "@/app/components/drawings/primitives/MyDrawingCanvas";
import MyDrawingDimensionLine from "@/app/components/drawings/primitives/MyDrawingDimensionLine";
import { MyDrawingPolygonShape } from "@/app/components/drawings/primitives/MyDrawingPolygon";
import type { MyBearingsTopViewProps } from "./types";
import { MyDrawingCircle } from "../../drawings";

function renderMyBearingsTopViewGeometry({
  g1,
  g2,
  s1,
  s2,
  b,
  c,
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
  void g2;
  void geometry;
  void dimensionScale;

  const supportStartX = 1.2 * s2;
  const supportEndX = supportStartX + s2;
  const beamStartX = supportStartX + g1;
  const beamEndX = supportStartX + s2 + 0.75 * s2;
  const beamStartY = (s1 - b) / 2;
  const beamEndY = beamStartY + b;

  const contactStartX = Math.max(supportStartX, beamStartX);
  const contactEndX = Math.min(supportEndX, beamEndX);
  const contactStartY = Math.max(0, beamStartY);
  const contactEndY = Math.min(s1, beamEndY);

  const effectiveStartX = contactStartX + c;
  const effectiveEndX = contactEndX - c;
  const effectiveStartY = contactStartY + c;
  const effectiveEndY = contactEndY - c;
  const shouldRenderEffectiveArea =
    effectiveStartX < effectiveEndX && effectiveStartY < effectiveEndY;

  return (
    <>
      <MyDrawingPolygonShape
        points={[
          { x: 0, y: 0 },
          { x: supportStartX, y: 0 },
          { x: supportStartX, y: s1 },
          { x: 0, y: s1 },
        ]}
        label="Support"
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

      <MyDrawingPolygonShape
        points={[
          { x: supportStartX, y: 0 },
          { x: supportEndX, y: 0 },
          { x: supportEndX, y: s1 },
          { x: supportStartX, y: s1 },
        ]}
        label="Support"
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
          center={{ x: 1.2 * s2 + s2 - e1, y: e2 }}
          diameter={ds}
          lineWidth="thin"
          lineStyle="solid"
          lineColor="black"
          fillColor="gray"
        />
      ) : null}
      {hasStuds ? (
        <MyDrawingCircle
          center={{ x: 1.2 * s2 + s2 - e1, y: e2 }}
          diameter={ds + 0.5 * ds}
          lineWidth="thin"
          lineStyle="solid"
          lineColor="black"
          fillColor="none"
        />
      ) : null}
      {hasStuds && n === 2 ? (
        <MyDrawingCircle
          center={{ x: 1.2 * s2 + s2 - e1, y: e2 + e3 }}
          diameter={ds}
          lineWidth="thin"
          lineStyle="solid"
          lineColor="black"
          fillColor="gray"
        />
      ) : null}
      {hasStuds && n === 2 ? (
        <MyDrawingCircle
          center={{ x: 1.2 * s2 + s2 - e1, y: e2 + e3 }}
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

function renderMyBearingsTopViewDimensions({
  g1,
  g2,
  s1,
  s2,
  b,
  c,
  n,
  ds,
  e1,
  e2,
  e3,
  hasStuds = false,
  dimensionScale = 1,
}: MyBearingsTopViewProps) {
  void g2;
  void n;
  void ds;
  void c;
  const supportStartX = 1.2 * s2;
  const supportEndX = supportStartX + s2;
  const beamStartX = supportStartX + g1;
  const beamStartY = (s1 - b) / 2;
  const beamEndY = beamStartY + b;

  return (
    <>
      <MyDrawingDimensionLine
        start={{ x: supportStartX, y: 0 }}
        end={{ x: beamStartX, y: 0 }}
        value={g1}
        symbol="g1"
        sizeScale={dimensionScale}
        textSize="lg"
        textGap={20}
        dimensionLinePosition="above"
        arrowSize="xl"
        arrowStyle="filled"
        lineColor="black"
      />
      <MyDrawingDimensionLine
        start={{ x: supportEndX + (hasStuds ? 0.2 * s2 : 0), y: 0 }}
        end={{ x: supportEndX + (hasStuds ? 0.2 * s2 : 0), y: s1 }}
        value={s1}
        symbol="S1"
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
          x: supportEndX + (hasStuds ? 0.4 * s2 : 0.2 * s2),
          y: beamStartY,
        }}
        end={{
          x: supportEndX + (hasStuds ? 0.4 * s2 : 0.2 * s2),
          y: beamEndY,
        }}
        value={b}
        symbol="B"
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
          start={{ x: supportEndX - e1, y: s1 }}
          end={{ x: supportEndX, y: s1 }}
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
          start={{ x: supportEndX, y: 0 }}
          end={{ x: supportEndX, y: e2 }}
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
          start={{ x: supportEndX, y: e2 }}
          end={{ x: supportEndX, y: e2 + e3 }}
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

export function getMyBearingsTopViewGeometryBounds({
  g1,
  g2,
  s1,
  s2,
  b,
  c,
  ...geometry
}: MyBearingsTopViewProps) {
  return getDrawingBoundsFromChildren(
    renderMyBearingsTopViewGeometry({ g1, g2, s1, s2, b, c, ...geometry }),
  );
}

export function getMyBearingsTopViewBounds({
  g1,
  g2,
  s1,
  s2,
  b,
  c,
  dimensionScale = 1,
  ...geometry
}: MyBearingsTopViewProps) {
  return getDrawingBoundsFromChildren(
    <>
      {renderMyBearingsTopViewGeometry({ g1, g2, s1, s2, b, c, ...geometry })}
      {renderMyBearingsTopViewDimensions({
        g1,
        g2,
        s1,
        s2,
        b,
        c,
        dimensionScale,
        ...geometry,
      })}
    </>,
  );
}

export default function MyBearingsTopView({
  g1,
  g2,
  s1,
  s2,
  b,
  c,
  className,
  ariaLabel = "Bearings top view",
  fitBounds,
  dimensionScale = 1,
  ...geometry
}: MyBearingsTopViewProps) {
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
      {renderMyBearingsTopViewGeometry({ g1, g2, s1, s2, b, c, ...geometry })}
      {renderMyBearingsTopViewDimensions({
        g1,
        g2,
        s1,
        s2,
        b,
        c,
        dimensionScale,
        ...geometry,
      })}
    </MyDrawingCanvas>
  );
}

MyBearingsTopView.getBounds = getMyBearingsTopViewBounds;
