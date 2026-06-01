import MyDrawingCanvas, {
  getDrawingBoundsFromChildren,
} from "@/app/components/drawings/primitives/MyDrawingCanvas";
import MyDrawingDimensionLine from "@/app/components/drawings/primitives/MyDrawingDimensionLine";
import { MyDrawingPolygonShape } from "@/app/components/drawings/primitives/MyDrawingPolygon";
import type { MyBearingsTopViewProps } from "./types";

function renderMyBearingsTopViewContent({
  g1,
  g2,
  s1,
  s2,
  b,
  c,
}: MyBearingsTopViewProps) {
  void g2;

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
        label="Left support section"
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
          backgroundColor: "lightgray",
        }}
      />
      <MyDrawingPolygonShape
        points={[
          { x: supportStartX, y: 0 },
          { x: supportEndX, y: 0 },
          { x: supportEndX, y: s1 },
          { x: supportStartX, y: s1 },
        ]}
        label="Support zone"
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
          backgroundColor: "lightgray",
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
      <MyDrawingDimensionLine
        start={{ x: supportStartX, y: 0 }}
        end={{ x: beamStartX, y: 0 }}
        value={g1}
        symbol="g1"
        textSize="lg"
        textGap={20}
        dimensionLinePosition="above"
        arrowSize="xl"
        arrowStyle="filled"
        lineColor="black"
      />
      <MyDrawingDimensionLine
        start={{ x: supportEndX, y: 0 }}
        end={{ x: supportEndX, y: s1 }}
        value={s1}
        symbol="S1"
        textSize="lg"
        textOrientation="vertical"
        textGap={-10}
        dimensionLinePosition="above"
        arrowSize="xl"
        arrowStyle="filled"
        lineColor="black"
      />
      <MyDrawingDimensionLine
        start={{ x: supportEndX + 0.3 * s2, y: beamStartY }}
        end={{ x: supportEndX + 0.3 * s2, y: beamEndY }}
        value={b}
        symbol="B"
        textSize="lg"
        textOrientation="vertical"
        textGap={-15}
        dimensionLinePosition="above"
        arrowSize="xl"
        arrowStyle="filled"
        lineColor="black"
      />
    </>
  );
}

export function getMyBearingsTopViewBounds({
  g1,
  g2,
  s1,
  s2,
  b,
  c,
}: MyBearingsTopViewProps) {
  return getDrawingBoundsFromChildren(
    renderMyBearingsTopViewContent({ g1, g2, s1, s2, b, c }),
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
      {renderMyBearingsTopViewContent({ g1, g2, s1, s2, b, c })}
    </MyDrawingCanvas>
  );
}

MyBearingsTopView.getBounds = getMyBearingsTopViewBounds;
