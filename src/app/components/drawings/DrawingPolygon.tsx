import { useId } from "react";
import {
  LINE_WIDTHS,
  type LineStyle,
  type LineWidth,
  type Point2D,
  getLineParameters,
} from "./drawingParameters";

export type DrawingPolygonEdgeStyle = {
  lineWidth?: LineWidth;
  lineStyle?: LineStyle;
  lineColor?: string;
};

export type DrawingPolygonHatch = {
  spacing?: number;
  variant?: "none" | "primary" | "secondary" | "cross";
  color?: string;
  lineWidth?: number;
  backgroundColor?: string;
};

export type DrawingPolygonProps = {
  points: Point2D[];
  edges?: DrawingPolygonEdgeStyle[];
  hatch?: DrawingPolygonHatch | false;
  className?: string;
  ariaLabel?: string;
};

export type DrawingPolygonShapeProps = {
  points: Point2D[];
  edges?: DrawingPolygonEdgeStyle[];
  hatch?: DrawingPolygonHatch | false;
};

const DEFAULT_EDGE_STYLE: Required<DrawingPolygonEdgeStyle> = {
  lineWidth: "medium",
  lineStyle: "solid",
  lineColor: "#111827",
};

const DEFAULT_HATCH: Required<DrawingPolygonHatch> = {
  spacing: 12,
  variant: "primary",
  color: "#9ca3af",
  lineWidth: 1,
  backgroundColor: "#ffffff",
};

const HATCH_ANGLES = {
  primary: 45,
  secondary: 135,
  cross: [45, 135],
} as const;

export function getPolygonBounds(
  points: Point2D[],
  edges: DrawingPolygonEdgeStyle[] = [],
) {
  const maxStrokeWidth = Math.max(
    ...edges.map((edge) => LINE_WIDTHS[edge.lineWidth ?? DEFAULT_EDGE_STYLE.lineWidth]),
    LINE_WIDTHS[DEFAULT_EDGE_STYLE.lineWidth],
  );
  const padding = maxStrokeWidth * 2;
  const xValues = points.map((point) => point.x);
  const yValues = points.map((point) => point.y);
  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);

  return {
    minX,
    maxX,
    minY,
    maxY,
    padding,
    width: maxX - minX + padding * 2,
    height: maxY - minY + padding * 2,
  };
}

export function DrawingPolygonShape({
  points,
  edges = [],
  hatch = DEFAULT_HATCH,
}: DrawingPolygonShapeProps) {
  const patternId = useId().replace(/:/g, "");
  const pointsAttribute = points.map((point) => `${point.x},${point.y}`).join(" ");
  const hatchSettings = hatch ? { ...DEFAULT_HATCH, ...hatch } : null;
  const hatchAngles = hatchSettings
    ? hatchSettings.variant === "none"
      ? []
      : hatchSettings.variant === "cross"
      ? HATCH_ANGLES.cross
      : [HATCH_ANGLES[hatchSettings.variant]]
    : [];

  return (
    <>
      {hatchSettings ? (
        <defs>
          {hatchAngles.map((angle, index) => (
            <pattern
              key={`${patternId}-${angle}-${index}`}
              id={`${patternId}-${index}`}
              width={hatchSettings.spacing}
              height={hatchSettings.spacing}
              patternUnits="userSpaceOnUse"
              patternTransform={`rotate(${angle})`}
            >
              <line
                x1="0"
                y1="0"
                x2={hatchSettings.spacing}
                y2="0"
                stroke={hatchSettings.color}
                strokeWidth={hatchSettings.lineWidth}
                vectorEffect="non-scaling-stroke"
              />
            </pattern>
          ))}
        </defs>
      ) : null}

      {hatchSettings ? (
        <>
          <polygon
            points={pointsAttribute}
            fill={hatchSettings.backgroundColor}
            stroke="none"
          />
          {hatchAngles.map((angle, index) => (
            <polygon
              key={`${patternId}-fill-${angle}-${index}`}
              points={pointsAttribute}
              fill={`url(#${patternId}-${index})`}
              stroke="none"
            />
          ))}
        </>
      ) : null}

      {points.map((point, index) => {
        const nextPoint = points[(index + 1) % points.length];
        const edge = edges[index] ?? DEFAULT_EDGE_STYLE;
        const { strokeWidth, strokeDasharray, stroke } = getLineParameters({
          lineWidth: edge.lineWidth ?? DEFAULT_EDGE_STYLE.lineWidth,
          lineStyle: edge.lineStyle ?? DEFAULT_EDGE_STYLE.lineStyle,
          lineColor: edge.lineColor ?? DEFAULT_EDGE_STYLE.lineColor,
        });

        return (
          <line
            key={`${point.x}-${point.y}-${nextPoint.x}-${nextPoint.y}`}
            x1={point.x}
            y1={point.y}
            x2={nextPoint.x}
            y2={nextPoint.y}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeLinecap="square"
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </>
  );
}

export default function DrawingPolygon({
  points,
  edges = [],
  hatch = DEFAULT_HATCH,
  className = "",
  ariaLabel = "Drawing polygon",
}: DrawingPolygonProps) {
  if (points.length < 3) {
    return null;
  }

  const { minX, minY, width, height, padding } = getPolygonBounds(points, edges);
  const translatedPoints = points.map((point) => ({
    x: point.x - minX + padding,
    y: point.y - minY + padding,
  }));

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-label={ariaLabel}
      role="img"
    >
      <DrawingPolygonShape points={translatedPoints} edges={edges} hatch={hatch} />
    </svg>
  );
}
