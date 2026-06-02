import {
  LINE_WIDTHS,
  type LineStyle,
  type LineWidth,
  type Point2D,
  getLineParameters,
} from "./drawingParameters";
import type { DrawingBounds } from "./MyDrawingCanvas";

export type MyDrawingCircleProps = {
  center: Point2D;
  diameter: number;
  lineWidth?: LineWidth;
  lineStyle?: LineStyle;
  lineColor?: string;
  fillColor?: string;
  className?: string;
};

export function getDrawingCircleBounds({
  center,
  diameter,
  lineWidth = "medium",
}: Pick<MyDrawingCircleProps, "center" | "diameter" | "lineWidth">): DrawingBounds {
  const resolvedRadius = Math.max(diameter, 0) / 2;
  const strokePadding = LINE_WIDTHS[lineWidth] / 2;

  return {
    minX: center.x - resolvedRadius - strokePadding,
    minY: center.y - resolvedRadius - strokePadding,
    maxX: center.x + resolvedRadius + strokePadding,
    maxY: center.y + resolvedRadius + strokePadding,
  };
}

export default function MyDrawingCircle({
  center,
  diameter,
  lineWidth = "medium",
  lineStyle = "solid",
  lineColor = "#111827",
  fillColor = "none",
  className = "",
}: MyDrawingCircleProps) {
  const { strokeWidth, strokeDasharray, stroke } = getLineParameters({
    lineWidth,
    lineStyle,
    lineColor,
  });
  const resolvedRadius = Math.max(diameter, 0) / 2;

  return (
    <circle
      cx={center.x}
      cy={center.y}
      r={resolvedRadius}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      fill={fillColor}
      vectorEffect="non-scaling-stroke"
      className={className}
    />
  );
}

MyDrawingCircle.getBounds = getDrawingCircleBounds;
