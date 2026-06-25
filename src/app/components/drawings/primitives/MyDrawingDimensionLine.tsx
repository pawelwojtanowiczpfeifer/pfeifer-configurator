import type { DrawingBounds } from "./MyDrawingCanvas";
import {
  LINE_WIDTHS,
  type LineStyle,
  type LineWidth,
  type Point2D,
  getLineParameters,
} from "./drawingParameters";

export type MyDrawingDimensionLineProps = {
  start: Point2D;
  end: Point2D;
  value: number | string;
  unit?: string;
  symbol?: string;
  sizeScale?: number;
  offset?: number;
  dimensionLinePosition?: "above" | "below";
  extensionOvershoot?: number;
  extensionGap?: number;
  arrowStyle?: "open" | "filled" | "slash";
  arrowSize?: "sm" | "md" | "lg" | "xl" | number;
  textGap?: number;
  textOffsetX?: number;
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
const SHOW_DIMENSION_UNIT = false;
const TEXT_SIZES = {
  sm: 12,
  md: 14,
  lg: 24,
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
  const underscoreMatch = symbol.match(/^([^_]+)_([^_]+)$/);

  if (underscoreMatch) {
    return {
      base: underscoreMatch[1],
      subscript: underscoreMatch[2],
    };
  }

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

function resolveTextSize(textSize: MyDrawingDimensionLineProps["textSize"]) {
  return TEXT_SIZES[textSize ?? "md"];
}

function resolveArrowSize(arrowSize: MyDrawingDimensionLineProps["arrowSize"]) {
  if (typeof arrowSize === "number") {
    return arrowSize;
  }

  return ARROW_SIZES[arrowSize ?? "md"];
}

function resolveSizeScale(sizeScale: number | undefined) {
  if (!sizeScale || Number.isNaN(sizeScale) || sizeScale <= 0) {
    return 1;
  }

  return sizeScale;
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
}: Pick<MyDrawingDimensionLineProps, "value" | "unit" | "symbol">) {
  const resolvedUnit = SHOW_DIMENSION_UNIT ? (unit ?? "mm") : "";
  const dimensionText = `${formatDimensionValue(value)}${resolvedUnit}`;
  const label = symbol ? `${symbol}=${dimensionText}` : `=${dimensionText}`;

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
  sizeScale = 1,
  offset = 48,
  dimensionLinePosition = "above",
  extensionOvershoot = 8,
  extensionGap = 4,
  arrowSize = "md",
  textGap = 14,
  textOffsetX = 0,
  textOffsetY = 0,
  textOrientation = "horizontal",
  textSize = "md",
}: Pick<
  MyDrawingDimensionLineProps,
  | "start"
  | "end"
  | "value"
  | "unit"
  | "symbol"
  | "sizeScale"
  | "offset"
  | "dimensionLinePosition"
  | "extensionOvershoot"
  | "extensionGap"
  | "arrowSize"
  | "textGap"
  | "textOffsetX"
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
  const resolvedSizeScale = resolveSizeScale(sizeScale);
  const scaledOffset = offset * resolvedSizeScale;
  const scaledExtensionOvershoot = extensionOvershoot * resolvedSizeScale;
  const scaledExtensionGap = extensionGap * resolvedSizeScale;
  const scaledTextGap = textGap * resolvedSizeScale;
  const scaledTextOffsetX = textOffsetX * resolvedSizeScale;
  const scaledTextOffsetY = textOffsetY * resolvedSizeScale;
  const resolvedTextSize = resolveTextSize(textSize) * resolvedSizeScale;
  const resolvedArrowSize = resolveArrowSize(arrowSize) * resolvedSizeScale;
  const positionMultiplier = dimensionLinePosition === "below" ? 1 : -1;
  const normal = {
    x: -direction.y * positionMultiplier,
    y: direction.x * positionMultiplier,
  };
  const dimensionStart = {
    x: start.x + normal.x * scaledOffset,
    y: start.y + normal.y * scaledOffset,
  };
  const dimensionEnd = {
    x: end.x + normal.x * scaledOffset,
    y: end.y + normal.y * scaledOffset,
  };
  const { dimensionText, label } = getDimensionLabel({ value, unit, symbol });
  const estimatedLabelWidth = estimateTextWidth(label, resolvedTextSize);
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
          x: textAnchorPoint.x + normal.x * scaledTextGap + scaledTextOffsetX,
          y: textAnchorPoint.y + scaledTextOffsetY,
        }
      : {
          x:
            textAnchorPoint.x +
            normal.x *
              (resolvedArrowSize + scaledTextGap + estimatedLabelWidth / 2) +
            scaledTextOffsetX,
          y: textAnchorPoint.y + resolvedTextSize * 0.35 + scaledTextOffsetY,
        }
    : {
        x: textAnchorPoint.x + scaledTextOffsetX,
        y: textAnchorPoint.y - scaledTextGap + scaledTextOffsetY,
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
    x: dimensionStart.x + normal.x * scaledExtensionOvershoot,
    y: dimensionStart.y + normal.y * scaledExtensionOvershoot,
  };
  const startExtensionStart = {
    x: start.x + normal.x * scaledExtensionGap,
    y: start.y + normal.y * scaledExtensionGap,
  };
  const endExtensionEnd = {
    x: dimensionEnd.x + normal.x * scaledExtensionOvershoot,
    y: dimensionEnd.y + normal.y * scaledExtensionOvershoot,
  };
  const endExtensionStart = {
    x: end.x + normal.x * scaledExtensionGap,
    y: end.y + normal.y * scaledExtensionGap,
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
  sizeScale = 1,
  offset = 48,
  dimensionLinePosition = "above",
  extensionOvershoot = 8,
  extensionGap = 4,
  arrowStyle = "open",
  arrowSize = "md",
  textGap = 14,
  textOffsetX = 0,
  textOffsetY = 0,
  textOrientation = "horizontal",
  textSize = "md",
}: Pick<
  MyDrawingDimensionLineProps,
  | "start"
  | "end"
  | "value"
  | "unit"
  | "symbol"
  | "sizeScale"
  | "offset"
  | "dimensionLinePosition"
  | "extensionOvershoot"
  | "extensionGap"
  | "arrowStyle"
  | "arrowSize"
  | "textGap"
  | "textOffsetX"
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
    sizeScale,
    offset,
    dimensionLinePosition,
    extensionOvershoot,
    extensionGap,
    arrowSize,
    textGap,
    textOffsetX,
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

function MyDrawingDimensionLine({
  start,
  end,
  value,
  unit = "mm",
  symbol,
  sizeScale = 1,
  offset = 48,
  dimensionLinePosition = "above",
  extensionOvershoot = 8,
  extensionGap = 4,
  arrowStyle = "open",
  arrowSize = "md",
  textGap = 14,
  textOffsetX = 0,
  textOffsetY = 0,
  textOrientation = "horizontal",
  textSize = "md",
  lineWidth = "thin",
  lineStyle = "solid",
  lineColor = DEFAULT_LINE_COLOR,
  className = "",
  ariaLabel = "Drawing dimension line",
}: MyDrawingDimensionLineProps) {
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
    sizeScale,
    offset,
    dimensionLinePosition,
    extensionOvershoot,
    extensionGap,
    arrowStyle,
    arrowSize,
    textGap,
    textOffsetX,
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
    sizeScale,
    offset,
    dimensionLinePosition,
    extensionOvershoot,
    extensionGap,
    arrowSize,
    textGap,
    textOffsetX,
    textOffsetY,
    textOrientation,
    textSize,
  });

  if (!geometry) {
    return null;
  }

  const { base: symbolBase, subscript: symbolSubscript } = splitSymbol(
    symbol ?? "",
  );

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
          geometry.textOrientation === "vertical" ? "middle" : "alphabetic"
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
            <tspan>{`=${geometry.dimensionText}`}</tspan>
          </>
        ) : (
          `=${geometry.dimensionText}`
        )}
      </text>
    </g>
  );
}

MyDrawingDimensionLine.getBounds = getDrawingDimensionLineBounds;

export default MyDrawingDimensionLine;
