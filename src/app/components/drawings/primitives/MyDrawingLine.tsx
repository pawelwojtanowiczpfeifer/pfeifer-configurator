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

  const minX = Math.min(start.x, end.x);
  const minY = Math.min(start.y, end.y);
  const maxX = Math.max(start.x, end.x);
  const maxY = Math.max(start.y, end.y);
  const padding = LINE_WIDTHS.thick * 2;

  const width = Math.max(maxX - minX + padding * 2, strokeWidth + padding * 2);
  const height = Math.max(
    maxY - minY + padding * 2,
    strokeWidth + padding * 2,
  );

  const x1 = start.x - minX + padding;
  const y1 = start.y - minY + padding;
  const x2 = end.x - minX + padding;
  const y2 = end.y - minY + padding;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-label="Drawing line"
      role="img"
    >
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeLinecap="square"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
