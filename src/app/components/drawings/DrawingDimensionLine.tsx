import type { DrawingBounds } from "./DrawingCanvas";
import {
  LINE_WIDTHS,
  type LineStyle,
  type LineWidth,
  type Point2D,
  getLineParameters,
} from "./drawingParameters";

export type DrawingDimensionLineProps = {
  start: Point2D;
  end: Point2D;
  value: number | string;
  unit?: string;
  symbol?: string;
  offset?: number;
  dimensionLinePosition?: "above" | "below";
  extensionOvershoot?: number;
  extensionGap?: number;
  arrowStyle?: "open" | "filled" | "slash";
  arrowSize?: "sm" | "md" | "lg" | "xl" | number;
  textGap?: number;
  textOffsetY?: number;
  textOrientation?: "horizontal" | "vertical";
  textSize?: "sm" | "md" | "lg" | "xl";
  lineWidth?: LineWidth;
  lineStyle?: LineStyle;
  lineColor?: string;
  className?: string;
  ariaLabel?: string;
};

const DEFAULT_LINE_COLOR = "#111827";
const TEXT_SIZES = {
  sm: 12,
  md: 14,
  lg: 18,
  xl: 24,
} as const;

const ARROW_SIZES = {
  sm: 8,
  md: 10,
  lg: 12,
  xl: 16,
} as const;

function formatDimensionValue(value: number | string) {
  return typeof value === "number" ? `${value}` : value;
}

function splitSymbol(symbol: string) {
  const match = symbol.match(/^([^0-9]+)([0-9]+)$/);

  if (!match) {
    return { base: symbol, subscript: "" };
  }

  return {
    base: match[1],
    subscript: match[2],
  };
}

function estimateTextWidth(text: string, textSize: number) {
  return Math.max(text.length * textSize * 0.62, textSize * 3.2);
}

function resolveTextSize(textSize: DrawingDimensionLineProps["textSize"]) {
  return TEXT_SIZES[textSize ?? "md"];
}

function resolveArrowSize(arrowSize: DrawingDimensionLineProps["arrowSize"]) {
  if (typeof arrowSize === "number") {
    return arrowSize;
  }

  return ARROW_SIZES[arrowSize ?? "md"];
}

function createArrowHeadPath(
  tip: Point2D,
  direction: Point2D,
  size: number,
  spread: number,
) {
  const baseCenter = {
    x: tip.x - direction.x * size,
    y: tip.y - direction.y * size,
  };
  const normal = {
    x: -direction.y,
    y: direction.x,
  };

  const left = {
    x: baseCenter.x + normal.x * spread,
    y: baseCenter.y + normal.y * spread,
  };
  const right = {
    x: baseCenter.x - normal.x * spread,
    y: baseCenter.y - normal.y * spread,
  };

  return `M ${left.x} ${left.y} L ${tip.x} ${tip.y} L ${right.x} ${right.y}`;
}

function createSlashArrowPath(
  tip: Point2D,
  direction: Point2D,
  size: number,
  spread: number,
) {
  const normal = {
    x: -direction.y,
    y: direction.x,
  };
  const center = {
    x: tip.x - direction.x * (size * 0.3),
    y: tip.y - direction.y * (size * 0.3),
  };
  const start = {
    x: center.x + normal.x * spread,
    y: center.y + normal.y * spread,
  };
  const end = {
    x: center.x - normal.x * spread,
    y: center.y - normal.y * spread,
  };

  return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
}

function getDimensionBounds(points: Point2D[], padding: number): DrawingBounds {
  const xValues = points.map((point) => point.x);
  const yValues = points.map((point) => point.y);

  return {
    minX: Math.min(...xValues) - padding,
    minY: Math.min(...yValues) - padding,
    maxX: Math.max(...xValues) + padding,
    maxY: Math.max(...yValues) + padding,
  };
}

function getDimensionLabel({
  value,
  unit,
  symbol,
}: Pick<DrawingDimensionLineProps, "value" | "unit" | "symbol">) {
  const dimensionText = `${formatDimensionValue(value)}${unit ?? "mm"}`;
  const label = symbol ? `${symbol} = ${dimensionText}` : `= ${dimensionText}`;

  return {
    dimensionText,
    label,
  };
}

function getDimensionGeometry({
  start,
  end,
  value,
  unit = "mm",
  symbol,
  offset = 28,
  dimensionLinePosition = "above",
  extensionOvershoot = 8,
  extensionGap = 4,
  arrowSize = "md",
  textGap = 14,
  textOffsetY = 0,
  textOrientation = "horizontal",
  textSize = "md",
}: Pick<
  DrawingDimensionLineProps,
  | "start"
  | "end"
  | "value"
  | "unit"
  | "symbol"
  | "offset"
  | "dimensionLinePosition"
  | "extensionOvershoot"
  | "extensionGap"
  | "arrowSize"
  | "textGap"
  | "textOffsetY"
  | "textOrientation"
  | "textSize"
>) {
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;
  const length = Math.hypot(deltaX, deltaY);

  if (length === 0) {
    return null;
  }

  const direction = {
    x: deltaX / length,
    y: deltaY / length,
  };
  const resolvedTextSize = resolveTextSize(textSize);
  const resolvedArrowSize = resolveArrowSize(arrowSize);
  const positionMultiplier = dimensionLinePosition === "below" ? 1 : -1;
  const normal = {
    x: -direction.y * positionMultiplier,
    y: direction.x * positionMultiplier,
  };
  const dimensionStart = {
    x: start.x + normal.x * offset,
    y: start.y + normal.y * offset,
  };
  const dimensionEnd = {
    x: end.x + normal.x * offset,
    y: end.y + normal.y * offset,
  };
  const { dimensionText, label } = getDimensionLabel({ value, unit, symbol });
  const estimatedLabelWidth = estimateTextWidth(label, resolvedTextSize);
  const estimatedVerticalTextWidth = resolvedTextSize * 0.9;
  const isVerticalDimension = Math.abs(direction.y) > Math.abs(direction.x);
  const minimumInternalLength = estimatedLabelWidth + resolvedArrowSize * 3;
  const useExternalArrows = length < minimumInternalLength;
  const arrowSpread = resolvedArrowSize * 0.42;
  const outerArrowExtension = resolvedArrowSize + 8;
  const textAnchorPoint = {
    x: (dimensionStart.x + dimensionEnd.x) / 2,
    y: (dimensionStart.y + dimensionEnd.y) / 2,
  };
  const textPosition = isVerticalDimension
    ? textOrientation === "vertical"
      ? {
          x: textAnchorPoint.x + normal.x * textGap,
          y: textAnchorPoint.y + textOffsetY,
        }
      : {
          x:
            textAnchorPoint.x +
            normal.x * (resolvedArrowSize + textGap + estimatedLabelWidth / 2),
          y: textAnchorPoint.y + resolvedTextSize * 0.35 + textOffsetY,
        }
    : {
        x: textAnchorPoint.x,
        y: textAnchorPoint.y - textGap + textOffsetY,
      };
  const lineStart = useExternalArrows
    ? {
        x: dimensionStart.x - direction.x * outerArrowExtension,
        y: dimensionStart.y - direction.y * outerArrowExtension,
      }
    : dimensionStart;
  const lineEnd = useExternalArrows
    ? {
        x: dimensionEnd.x + direction.x * outerArrowExtension,
        y: dimensionEnd.y + direction.y * outerArrowExtension,
      }
    : dimensionEnd;
  const startArrowDirection = useExternalArrows
    ? { x: direction.x, y: direction.y }
    : { x: -direction.x, y: -direction.y };
  const endArrowDirection = useExternalArrows
    ? { x: -direction.x, y: -direction.y }
    : { x: direction.x, y: direction.y };
  const startExtensionEnd = {
    x: dimensionStart.x + normal.x * extensionOvershoot,
    y: dimensionStart.y + normal.y * extensionOvershoot,
  };
  const startExtensionStart = {
    x: start.x + normal.x * extensionGap,
    y: start.y + normal.y * extensionGap,
  };
  const endExtensionEnd = {
    x: dimensionEnd.x + normal.x * extensionOvershoot,
    y: dimensionEnd.y + normal.y * extensionOvershoot,
  };
  const endExtensionStart = {
    x: end.x + normal.x * extensionGap,
    y: end.y + normal.y * extensionGap,
  };

  return {
    direction,
    normal,
    resolvedTextSize,
    resolvedArrowSize,
    arrowSpread,
    dimensionStart,
    dimensionEnd,
    dimensionText,
    label,
    estimatedLabelWidth,
    textOrientation,
    useExternalArrows,
    textPosition,
    lineStart,
    lineEnd,
    startArrowDirection,
    endArrowDirection,
    startExtensionStart,
    startExtensionEnd,
    endExtensionStart,
    endExtensionEnd,
  };
}

export function getDrawingDimensionLineBounds({
  start,
  end,
  value,
  unit = "mm",
  symbol,
  offset = 28,
  dimensionLinePosition = "above",
  extensionOvershoot = 8,
  extensionGap = 4,
  arrowStyle = "open",
  arrowSize = "md",
  textGap = 14,
  textOffsetY = 0,
  textOrientation = "horizontal",
  textSize = "md",
}: Pick<
  DrawingDimensionLineProps,
  | "start"
  | "end"
  | "value"
  | "unit"
  | "symbol"
  | "offset"
  | "dimensionLinePosition"
  | "extensionOvershoot"
  | "extensionGap"
  | "arrowStyle"
  | "arrowSize"
  | "textGap"
  | "textOffsetY"
  | "textOrientation"
  | "textSize"
>): DrawingBounds | null {
  const geometry = getDimensionGeometry({
    start,
    end,
    value,
    unit,
    symbol,
    offset,
    dimensionLinePosition,
    extensionOvershoot,
    extensionGap,
    arrowSize,
    textGap,
    textOffsetY,
    textOrientation,
    textSize,
  });

  if (!geometry) {
    return null;
  }

  const arrowPadding =
    arrowStyle === "slash"
      ? geometry.resolvedArrowSize
      : geometry.resolvedArrowSize * 0.7;

  const textHalfWidth =
    geometry.textOrientation === "vertical"
      ? geometry.resolvedTextSize * 0.7
      : geometry.estimatedLabelWidth / 2;
  const textHalfHeight =
    geometry.textOrientation === "vertical"
      ? geometry.estimatedLabelWidth / 2
      : geometry.resolvedTextSize;

  return getDimensionBounds(
    [
      start,
      end,
      geometry.startExtensionStart,
      geometry.startExtensionEnd,
      geometry.endExtensionStart,
      geometry.endExtensionEnd,
      geometry.lineStart,
      geometry.lineEnd,
      {
        x: geometry.textPosition.x - textHalfWidth,
        y: geometry.textPosition.y - textHalfHeight,
      },
      {
        x: geometry.textPosition.x + textHalfWidth,
        y: geometry.textPosition.y + textHalfHeight,
      },
    ],
    Math.max(LINE_WIDTHS.thick * 2, geometry.resolvedTextSize, arrowPadding),
  );
}

function DrawingDimensionLine({
  start,
  end,
  value,
  unit = "mm",
  symbol,
  offset = 28,
  dimensionLinePosition = "above",
  extensionOvershoot = 8,
  extensionGap = 4,
  arrowStyle = "open",
  arrowSize = "md",
  textGap = 14,
  textOffsetY = 0,
  textOrientation = "horizontal",
  textSize = "md",
  lineWidth = "thin",
  lineStyle = "solid",
  lineColor = DEFAULT_LINE_COLOR,
  className = "",
  ariaLabel = "Drawing dimension line",
}: DrawingDimensionLineProps) {
  const { strokeWidth, strokeDasharray, stroke } = getLineParameters({
    lineWidth,
    lineStyle,
    lineColor,
  });
  const bounds = getDrawingDimensionLineBounds({
    start,
    end,
    value,
    unit,
    symbol,
    offset,
    dimensionLinePosition,
    extensionOvershoot,
    extensionGap,
    arrowStyle,
    arrowSize,
    textGap,
    textOffsetY,
    textOrientation,
    textSize,
  });

  if (!bounds) {
    return null;
  }

  const geometry = getDimensionGeometry({
    start,
    end,
    value,
    unit,
    symbol,
    offset,
    dimensionLinePosition,
    extensionOvershoot,
    extensionGap,
    arrowSize,
    textGap,
    textOffsetY,
    textOrientation,
    textSize,
  });

  if (!geometry) {
    return null;
  }

  const { base: symbolBase, subscript: symbolSubscript } = splitSymbol(symbol ?? "");

  return (
    <g className={className} aria-label={ariaLabel} role="img">
      <line
        x1={geometry.startExtensionStart.x}
        y1={geometry.startExtensionStart.y}
        x2={geometry.startExtensionEnd.x}
        y2={geometry.startExtensionEnd.y}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="square"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1={geometry.endExtensionStart.x}
        y1={geometry.endExtensionStart.y}
        x2={geometry.endExtensionEnd.x}
        y2={geometry.endExtensionEnd.y}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="square"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1={geometry.lineStart.x}
        y1={geometry.lineStart.y}
        x2={geometry.lineEnd.x}
        y2={geometry.lineEnd.y}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeLinecap="square"
        vectorEffect="non-scaling-stroke"
      />
      {arrowStyle === "filled" ? (
        <>
          <path
            d={`${createArrowHeadPath(
              geometry.dimensionStart,
              geometry.startArrowDirection,
              geometry.resolvedArrowSize,
              geometry.arrowSpread,
            )} Z`}
            fill={stroke}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinejoin="miter"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={`${createArrowHeadPath(
              geometry.dimensionEnd,
              geometry.endArrowDirection,
              geometry.resolvedArrowSize,
              geometry.arrowSpread,
            )} Z`}
            fill={stroke}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinejoin="miter"
            vectorEffect="non-scaling-stroke"
          />
        </>
      ) : arrowStyle === "slash" ? (
        <>
          <path
            d={createSlashArrowPath(
              geometry.dimensionStart,
              geometry.startArrowDirection,
              geometry.resolvedArrowSize,
              geometry.arrowSpread * 1.3,
            )}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="square"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={createSlashArrowPath(
              geometry.dimensionEnd,
              geometry.endArrowDirection,
              geometry.resolvedArrowSize,
              geometry.arrowSpread * 1.3,
            )}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="square"
            vectorEffect="non-scaling-stroke"
          />
        </>
      ) : (
        <>
          <path
            d={createArrowHeadPath(
              geometry.dimensionStart,
              geometry.startArrowDirection,
              geometry.resolvedArrowSize,
              geometry.arrowSpread,
            )}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="square"
            strokeLinejoin="miter"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={createArrowHeadPath(
              geometry.dimensionEnd,
              geometry.endArrowDirection,
              geometry.resolvedArrowSize,
              geometry.arrowSpread,
            )}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="square"
            strokeLinejoin="miter"
            vectorEffect="non-scaling-stroke"
          />
        </>
      )}
      <text
        x={geometry.textPosition.x}
        y={geometry.textPosition.y}
        transform={
          geometry.textOrientation === "vertical"
            ? `rotate(-90 ${geometry.textPosition.x} ${geometry.textPosition.y})`
            : undefined
        }
        fill={stroke}
        fontSize={geometry.resolvedTextSize}
        fontFamily="Arial, Helvetica, sans-serif"
        textAnchor="middle"
        dominantBaseline={
          geometry.textOrientation === "vertical" ? "middle" : "baseline"
        }
        lengthAdjust="spacingAndGlyphs"
      >
        {symbol ? (
          <>
            <tspan>{symbolBase}</tspan>
            {symbolSubscript ? (
              <tspan
                fontSize={geometry.resolvedTextSize * 0.72}
                baselineShift="sub"
              >
                {symbolSubscript}
              </tspan>
            ) : null}
            <tspan>{` = ${geometry.dimensionText}`}</tspan>
          </>
        ) : (
          `= ${geometry.dimensionText}`
        )}
      </text>
    </g>
  );
}

DrawingDimensionLine.getBounds = getDrawingDimensionLineBounds;

export default DrawingDimensionLine;
