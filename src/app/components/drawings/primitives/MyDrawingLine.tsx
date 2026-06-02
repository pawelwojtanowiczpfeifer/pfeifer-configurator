import type { DrawingBounds } from "./MyDrawingCanvas";
import {
  LINE_WIDTHS,
  type LineStyle,
  type LineWidth,
  type Point2D,
  getLineParameters,
} from "./drawingParameters";

export type MyDrawingLineProps = {
  start: Point2D;
  end: Point2D;
  lineWidth?: LineWidth;
  lineStyle?: LineStyle;
  lineColor?: string;
  className?: string;
};

export function getDrawingLineBounds({
  start,
  end,
  lineWidth = "medium",
}: Pick<MyDrawingLineProps, "start" | "end" | "lineWidth">): DrawingBounds {
  const strokePadding = LINE_WIDTHS[lineWidth] / 2;

  return {
    minX: Math.min(start.x, end.x) - strokePadding,
    minY: Math.min(start.y, end.y) - strokePadding,
    maxX: Math.max(start.x, end.x) + strokePadding,
    maxY: Math.max(start.y, end.y) + strokePadding,
  };
}

export default function MyDrawingLine({
  start,
  end,
  lineWidth = "medium",
  lineStyle = "solid",
  lineColor = "#111827",
  className = "",
}: MyDrawingLineProps) {
  const { strokeWidth, strokeDasharray, stroke } = getLineParameters({
    lineWidth,
    lineStyle,
    lineColor,
  });

  return (
    <line
      x1={start.x}
      y1={start.y}
      x2={end.x}
      y2={end.y}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      strokeLinecap="square"
      vectorEffect="non-scaling-stroke"
      className={className}
      aria-label="Drawing line"
      role="img"
    />
  );
}

MyDrawingLine.getBounds = getDrawingLineBounds;
