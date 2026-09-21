import { MyDrawingCircle } from "../../drawings";
import { MyDrawingPolygonShape } from "../../drawings/primitives/MyDrawingPolygon";
import type { MyBearingsSelectedPadDrawing } from "../MyBearingsModuleConfigurator";

type Point = { x: number; y: number };

type MyBearingsSelectedPadPlanProps = {
  selectedPadDrawing: MyBearingsSelectedPadDrawing | null | undefined;
  center: Point;
  studCenters: Point[];
  hatchScale: number;
};

type MyBearingsSelectedPadSideProps = {
  selectedPadDrawing: MyBearingsSelectedPadDrawing | null | undefined;
  centerX: number;
  topY: number;
  bearingGapMm: number;
  hatchScale: number;
};

const PAD_EDGE = { lineWidth: "thin" as const, lineStyle: "solid" as const, lineColor: "#7c1d12" };
const WOOL_EDGE = { lineWidth: "thin" as const, lineStyle: "solid" as const, lineColor: "#725c3f" };

function rectangle(center: Point, width: number, height: number) {
  const left = center.x - width / 2;
  const top = center.y - height / 2;

  return [
    { x: left, y: top },
    { x: left + width, y: top },
    { x: left + width, y: top + height },
    { x: left, y: top + height },
  ];
}

/**
 * The final selected bearing is deliberately a standalone drawing layer.
 * Edit the two hatch objects below to alter its visual style without touching
 * the structural beam/support geometry.
 */
export function MyBearingsSelectedPadPlan({
  selectedPadDrawing,
  center,
  studCenters,
  hatchScale,
}: MyBearingsSelectedPadPlanProps) {
  if (!selectedPadDrawing) {
    return null;
  }

  const woolWidthMm = selectedPadDrawing.mineralWoolWidthMm;

  return (
    <>
      {woolWidthMm ? (
        <MyDrawingPolygonShape
          points={rectangle(
            center,
            selectedPadDrawing.widthMm + 2 * woolWidthMm,
            selectedPadDrawing.lengthMm + 2 * woolWidthMm,
          )}
          label="Ciflamon mineral wool"
          edges={[WOOL_EDGE, WOOL_EDGE, WOOL_EDGE, WOOL_EDGE]}
          hatch={{
            variant: "none",
            color: "#c3aa83",
            backgroundColor: "#c3aa83",
            spacing: 1,
            lineWidth: 1,
            scale: hatchScale,
          }}
        />
      ) : null}
      <MyDrawingPolygonShape
        points={rectangle(
          center,
          selectedPadDrawing.widthMm,
          selectedPadDrawing.lengthMm,
        )}
        label="Selected bearing pad"
        edges={[PAD_EDGE, PAD_EDGE, PAD_EDGE, PAD_EDGE]}
        hatch={{
          variant: "none",
          color: "#ff4723",
          backgroundColor: "#ff4723",
          spacing: 1,
          lineWidth: 1,
          scale: hatchScale,
        }}
      />
      {studCenters.map((studCenter, index) => (
        <MyDrawingCircle
          key={`${studCenter.x}-${studCenter.y}-${index}`}
          center={studCenter}
          diameter={selectedPadDrawing.studHoleDiameterMm}
          lineWidth="thin"
          lineStyle="solid"
          lineColor="#7c1d12"
          fillColor="rgba(255, 255, 255, 0.65)"
        />
      ))}
    </>
  );
}

export function MyBearingsSelectedPadSide({
  selectedPadDrawing,
  centerX,
  topY,
  bearingGapMm,
  hatchScale,
}: MyBearingsSelectedPadSideProps) {
  if (!selectedPadDrawing) {
    return null;
  }

  const padHeightMm = Math.min(selectedPadDrawing.thicknessMm, bearingGapMm);
  const padTopY = topY + (bearingGapMm - padHeightMm) / 2;
  const woolWidthMm = selectedPadDrawing.mineralWoolWidthMm;

  return (
    <>
      {woolWidthMm ? (
        <MyDrawingPolygonShape
          points={rectangle(
            { x: centerX, y: topY + bearingGapMm / 2 },
            selectedPadDrawing.widthMm + 2 * woolWidthMm,
            bearingGapMm,
          )}
          label="Ciflamon mineral wool"
          edges={[WOOL_EDGE, WOOL_EDGE, WOOL_EDGE, WOOL_EDGE]}
          hatch={{
            variant: "none",
            color: "#c3aa83",
            backgroundColor: "#c3aa83",
            spacing: 1,
            lineWidth: 1,
            scale: hatchScale,
          }}
        />
      ) : null}
      <MyDrawingPolygonShape
        points={rectangle(
          { x: centerX, y: padTopY + padHeightMm / 2 },
          selectedPadDrawing.widthMm,
          padHeightMm,
        )}
        label="Selected bearing pad"
        edges={[PAD_EDGE, PAD_EDGE, PAD_EDGE, PAD_EDGE]}
        hatch={{
          variant: "none",
          color: "#ff4723",
          backgroundColor: "#ff4723",
          spacing: 1,
          lineWidth: 1,
          scale: hatchScale,
        }}
      />
    </>
  );
}
