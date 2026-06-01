import MyDrawingCanvas, {
  getDrawingBoundsFromChildren,
} from "@/app/components/drawings/primitives/MyDrawingCanvas";
import MyDrawingDimensionLine from "@/app/components/drawings/primitives/MyDrawingDimensionLine";
import { MyDrawingPolygonShape } from "@/app/components/drawings/primitives/MyDrawingPolygon";
import type { MyBearingsSideViewProps } from "./types";

function renderMyBearingsSideViewContent({
  g1,
  g2,
  s1,
  s2,
  b,
  c,
}: MyBearingsSideViewProps) {
  void s1;
  void b;
  void c;

  return (
    <>
      <MyDrawingPolygonShape
        points={[
          { x: 0, y: 0 },
          { x: 1.2 * s2, y: 0 },
          { x: 1.2 * s2, y: 1.2 * s2 + g2 },
          { x: 1.2 * s2 + s2, y: 1.2 * s2 + g2 },
          { x: 1.2 * s2 + s2, y: 1.2 * s2 + g2 + s2 },
          { x: 1.2 * s2, y: 1.2 * s2 + g2 + s2 },
          { x: 1.2 * s2, y: 1.2 * s2 + g2 + s2 + 0.5 * s2 },
          { x: 0, y: 1.2 * s2 + g2 + s2 + 0.5 * s2 },
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
          backgroundColor: "lightgray",
        }}
      />
      <MyDrawingPolygonShape
        points={[
          { x: 1.2 * s2 + g1, y: 0 },
          { x: 1.2 * s2 + s2 + 0.75 * s2, y: 0 },
          { x: 1.2 * s2 + s2 + 0.75 * s2, y: 1.2 * s2 },
          { x: 1.2 * s2 + g1, y: 1.2 * s2 },
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
          backgroundColor: "rgba(220, 220, 220, 0.8)",
        }}
      />
      <MyDrawingDimensionLine
        start={{ x: 1.2 * s2, y: 0 }}
        end={{ x: 1.2 * s2 + g1, y: 0 }}
        value={g1}
        symbol="g1"
        textSize="lg"
        textGap={20}
        dimensionLinePosition="above"
        arrowSize="xl"
        arrowStyle="filled"
      />
      <MyDrawingDimensionLine
        start={{ x: 1.2 * s2 + s2, y: 1.2 * s2 }}
        end={{ x: 1.2 * s2 + s2, y: 1.2 * s2 + g2 }}
        value={g2}
        symbol="g2"
        textSize="lg"
        textGap={-5}
        textOffsetY={g2 >= 25 ? 0 : 10}
        dimensionLinePosition="above"
        arrowSize="xl"
        arrowStyle="filled"
        lineColor="black"
      />
      <MyDrawingDimensionLine
        start={{ x: 1.2 * s2, y: 1.2 * s2 + g2 + s2 }}
        end={{ x: 1.2 * s2 + s2, y: 1.2 * s2 + g2 + s2 }}
        value={s2}
        symbol="S2"
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

export function getMyBearingsSideViewBounds({
  g1,
  g2,
  s1,
  s2,
  b,
  c,
}: MyBearingsSideViewProps) {
  return getDrawingBoundsFromChildren(
    renderMyBearingsSideViewContent({ g1, g2, s1, s2, b, c }),
  );
}

export default function MyBearingsSideView({
  g1,
  g2,
  s1,
  s2,
  b,
  c,
  className,
  ariaLabel = "Bearings side view",
  fitBounds,
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
      {renderMyBearingsSideViewContent({ g1, g2, s1, s2, b, c })}
    </MyDrawingCanvas>
  );
}

MyBearingsSideView.getBounds = getMyBearingsSideViewBounds;
