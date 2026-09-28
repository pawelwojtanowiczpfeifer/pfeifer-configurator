import MyDrawingCanvas, {
  getDrawingBoundsFromChildren,
} from "@/app/components/drawings/primitives/MyDrawingCanvas";
import MyDrawingDimensionLine from "@/app/components/drawings/primitives/MyDrawingDimensionLine";
import { MyDrawingPolygonShape } from "@/app/components/drawings/primitives/MyDrawingPolygon";
import type { MyBearingsTopViewProps } from "./types";
import { MyDrawingCircle, MyDrawingLine } from "../../drawings";
import { MyBearingsSelectedPadPlan } from "./MyBearingsSelectedPadDrawing";
import {
  BEAM_TOP_SECONDARY_BEAM_GAP_MM,
  BEAM_TOP_SECONDARY_BEAM_OVERHANG_MM,
  BEAM_TOP_SECONDARY_BEAM_SIDE_VIEW_STYLE,
} from "./beamTopSecondaryBeamParameters";
import { BEAM_TOP_OUTER_HEAD_UPSTAND_GAP_MM } from "./beamTopOuterHeadUpstandParameters";

// Presentation-only switch: the effective area is still calculated normally.
const SHOW_EFFECTIVE_AREA_OUTLINE = false;

function renderMyBearingsBeamTopTopViewGeometry({
  g1,
  g2,
  tc,
  b1,
  a1,
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
  selectedPadDrawing,
  beamTopHeadArrangement = "no-upstand",
  dimensionScale = 1,
  hatchScale = 1,
  ...geometry
}: MyBearingsTopViewProps) {
  void tc;
  void geometry;
  void dimensionScale;

  const supportStartX = 0;
  const supportEndX = supportStartX + a2;
  const beamStartX = supportStartX + g2;
  const beamEndX = supportStartX + a2 + 0.5 * a2;
  const beamStartY = (b3 - b2) / 2;
  const beamEndY = beamStartY + b2;
  const shouldRenderSecondaryBeam = beamTopHeadArrangement === "two-beams";
  const shouldRenderOuterHeadUpstand =
    beamTopHeadArrangement === "outer-head-upstand" ||
    beamTopHeadArrangement === "three-sided-head-upstand";
  const shouldRenderThreeSidedHeadUpstand =
    beamTopHeadArrangement === "three-sided-head-upstand";
  const secondaryBeamStartX =
    supportStartX - BEAM_TOP_SECONDARY_BEAM_OVERHANG_MM;
  const secondaryBeamEndX = beamStartX - BEAM_TOP_SECONDARY_BEAM_GAP_MM;
  const upstandEndX = Math.max(
    supportStartX,
    beamStartX - BEAM_TOP_OUTER_HEAD_UPSTAND_GAP_MM,
  );
  const threeSidedUpstandStartY = Math.max(
    0,
    beamStartY - BEAM_TOP_OUTER_HEAD_UPSTAND_GAP_MM,
  );
  const threeSidedUpstandEndY = Math.min(
    b3,
    beamEndY + BEAM_TOP_OUTER_HEAD_UPSTAND_GAP_MM,
  );

  const contactStartX = Math.max(supportStartX, beamStartX);
  const contactEndX = Math.min(supportEndX, beamEndX);
  const contactStartY = Math.max(0, beamStartY);
  const contactEndY = Math.min(b3, beamEndY);

  const effectiveStartX = contactStartX + cmin;
  const effectiveEndX = contactEndX - cmin;
  const effectiveStartY = contactStartY + cmin;
  const effectiveEndY = contactEndY - cmin;
  const shouldRenderEffectiveArea =
    effectiveStartX < effectiveEndX && effectiveStartY < effectiveEndY;

  return (
    <>
      <MyDrawingPolygonShape
        points={[
          { x: supportStartX, y: 0 },
          { x: supportEndX, y: 0 },
          { x: supportEndX, y: b3 },
          { x: supportStartX, y: b3 },
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

      {shouldRenderOuterHeadUpstand &&
      !shouldRenderThreeSidedHeadUpstand &&
      upstandEndX > supportStartX ? (
        <MyDrawingLine
          start={{ x: upstandEndX, y: 0 }}
          end={{ x: upstandEndX, y: b3 }}
          lineWidth="thin"
          lineStyle="solid"
          lineColor="black"
        />
      ) : null}

      {shouldRenderThreeSidedHeadUpstand &&
      upstandEndX > supportStartX ? (
        <>
          <MyDrawingLine
            start={{ x: upstandEndX, y: threeSidedUpstandStartY }}
            end={{ x: upstandEndX, y: threeSidedUpstandEndY }}
            lineWidth="thin"
            lineStyle="solid"
            lineColor="black"
          />
          <MyDrawingLine
            start={{ x: upstandEndX, y: threeSidedUpstandStartY }}
            end={{ x: supportEndX, y: threeSidedUpstandStartY }}
            lineWidth="thin"
            lineStyle="solid"
            lineColor="black"
          />
          <MyDrawingLine
            start={{ x: upstandEndX, y: threeSidedUpstandEndY }}
            end={{ x: supportEndX, y: threeSidedUpstandEndY }}
            lineWidth="thin"
            lineStyle="solid"
            lineColor="black"
          />
        </>
      ) : null}

      <MyBearingsSelectedPadPlan
        selectedPadDrawing={selectedPadDrawing}
        center={{
          x: (effectiveStartX + effectiveEndX) / 2,
          y: (effectiveStartY + effectiveEndY) / 2,
        }}
        studCenters={
          hasStuds
            ? [
                { x: a2 - e1, y: e2 },
                ...(n === 2 ? [{ x: a2 - e1, y: e2 + e3 }] : []),
              ]
            : []
        }
        hatchScale={hatchScale}
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
          backgroundColor: "rgba(220, 220, 220, 0.4)",
          scale: hatchScale,
        }}
      />

      {shouldRenderSecondaryBeam ? (
        <MyDrawingPolygonShape
          points={[
            { x: secondaryBeamStartX, y: beamStartY },
            { x: secondaryBeamEndX, y: beamStartY },
            { x: secondaryBeamEndX, y: beamEndY },
            { x: secondaryBeamStartX, y: beamEndY },
          ]}
          label="Secondary beam"
          edges={[
            {
              lineWidth: "thin",
              lineStyle: "dashed",
              lineColor: BEAM_TOP_SECONDARY_BEAM_SIDE_VIEW_STYLE.outlineColor,
            },
            {
              lineWidth: "thin",
              lineStyle: "dashed",
              lineColor: BEAM_TOP_SECONDARY_BEAM_SIDE_VIEW_STYLE.outlineColor,
            },
            {
              lineWidth: "thin",
              lineStyle: "dashed",
              lineColor: BEAM_TOP_SECONDARY_BEAM_SIDE_VIEW_STYLE.outlineColor,
            },
            {
              lineWidth: "thin",
              lineStyle: "dashed",
              lineColor: BEAM_TOP_SECONDARY_BEAM_SIDE_VIEW_STYLE.outlineColor,
            },
          ]}
          hatch={{
            spacing: 20,
            variant: "cross",
            color: BEAM_TOP_SECONDARY_BEAM_SIDE_VIEW_STYLE.hatchColor,
            lineWidth: 1,
            backgroundColor: "rgba(244, 244, 245, 0.4)",
            scale: hatchScale,
          }}
        />
      ) : null}
      {SHOW_EFFECTIVE_AREA_OUTLINE && shouldRenderEffectiveArea ? (
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
          center={{ x: a2 - e1, y: e2 }}
          diameter={ds}
          lineWidth="thin"
          lineStyle="solid"
          lineColor="black"
          fillColor="gray"
        />
      ) : null}
      {hasStuds ? (
        <MyDrawingCircle
          center={{ x: a2 - e1, y: e2 }}
          diameter={ds + 0.5 * ds}
          lineWidth="thin"
          lineStyle="solid"
          lineColor="black"
          fillColor="none"
        />
      ) : null}
      {hasStuds && n === 2 ? (
        <MyDrawingCircle
          center={{ x: a2 - e1, y: e2 + e3 }}
          diameter={ds}
          lineWidth="thin"
          lineStyle="solid"
          lineColor="black"
          fillColor="gray"
        />
      ) : null}
      {hasStuds && n === 2 ? (
        <MyDrawingCircle
          center={{ x: a2 - e1, y: e2 + e3 }}
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
  g1,
  g2,
  tc,
  b1,
  a1,
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
  void tc;
  void n;
  void ds;
  void cmin;

  const supportStartX = 0;
  const supportEndX = supportStartX + a2;
  const beamStartX = supportStartX + g2;
  const beamEndX = supportStartX + a2 + 0.5 * a2;
  const beamStartY = (b3 - b2) / 2;
  const beamEndY = beamStartY + b2;

  return (
    <>
      <MyDrawingDimensionLine
        start={{ x: supportStartX, y: 0 }}
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
        start={{ x: supportEndX + (hasStuds ? 0.15 * a2 : 0), y: 0 }}
        end={{ x: supportEndX + (hasStuds ? 0.15 * a2 : 0), y: b3 }}
        value={b3}
        symbol="B3"
        sizeScale={dimensionScale}
        textSize="lg"
        textOrientation="vertical"
        textGap={-15}
        dimensionLinePosition="above"
        arrowSize="xl"
        arrowStyle="filled"
        lineColor="black"
      />
      <MyDrawingDimensionLine
        start={{
          x: supportEndX + (hasStuds ? 0.25 * a2 : 0.2 * a2),
          y: beamStartY,
        }}
        end={{
          x: supportEndX + (hasStuds ? 0.25 * a2 : 0.2 * a2),
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
          start={{ x: supportEndX - e1, y: b3 }}
          end={{ x: supportEndX, y: b3 }}
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

export function getMyBearingsBeamTopTopViewGeometryBounds({
  g1,
  tc,
  b1,
  a1,
  b2,
  cmin,
  ...geometry
}: MyBearingsTopViewProps) {
  return getDrawingBoundsFromChildren(
    renderMyBearingsBeamTopTopViewGeometry({
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

export function getMyBearingsBeamTopTopViewBounds({
  g1,
  tc,
  b1,
  a1,
  b2,
  cmin,
  dimensionScale = 1,
  ...geometry
}: MyBearingsTopViewProps) {
  return getDrawingBoundsFromChildren(
    <>
      {renderMyBearingsBeamTopTopViewGeometry({
        g1,
        tc,
        b1,
        a1,
        b2,
        cmin,
        ...geometry,
      })}
      {renderMyBearingsBeamTopTopViewDimensions({
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

export default function MyBearingsBeamTopTopView({
  g1,
  tc,
  b1,
  a1,
  b2,
  cmin,
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
      {renderMyBearingsBeamTopTopViewGeometry({
        g1,
        tc,
        b1,
        a1,
        b2,
        cmin,
        ...geometry,
      })}
      {renderMyBearingsBeamTopTopViewDimensions({
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

MyBearingsBeamTopTopView.getBounds = getMyBearingsBeamTopTopViewBounds;
