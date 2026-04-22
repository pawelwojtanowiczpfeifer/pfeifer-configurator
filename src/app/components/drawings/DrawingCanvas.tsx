import {
  Children,
  Fragment,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import type { SpacingSize } from "../ui/spacingTokens";
type Point2D = {
  x: number;
  y: number;
};

type CanvasAlign = "start" | "center" | "end" | "stretch";
type CanvasJustify =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly";
type CanvasSize =
  | "auto"
  | "full"
  | "screen"
  | "screen-dynamic"
  | "1/2"
  | "1/3"
  | "2/3"
  | "72";
type CanvasFit = "frame" | "content";

const SPACING_VALUES: Record<SpacingSize, number> = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 40,
  "3xl": 48,
};

const widths = {
  auto: "",
  full: "w-full",
  screen: "w-screen",
  "screen-dynamic": "w-dvw",
  "1/2": "w-1/2",
  "1/3": "w-1/3",
  "2/3": "w-2/3",
  "72": "w-72",
};

const heights = {
  auto: "",
  full: "h-full",
  screen: "h-screen",
  "screen-dynamic": "h-dvh",
  "1/2": "h-1/2",
  "1/3": "h-1/3",
  "2/3": "h-2/3",
  "72": "h-72",
};

type DrawingCanvasProps = {
  viewBoxWidth?: number;
  viewBoxHeight?: number;
  fit?: CanvasFit;
  fitBounds?: DrawingBounds;
  width?: CanvasSize;
  height?: CanvasSize;
  align?: CanvasAlign;
  justify?: CanvasJustify;
  p?: SpacingSize;
  px?: SpacingSize;
  py?: SpacingSize;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
};

type Bounds = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};

export type DrawingBounds = Bounds;
type DrawingElementProps = {
  children?: ReactNode;
  points?: Point2D[];
  start?: Point2D;
  end?: Point2D;
};

type DrawingElementType = {
  getBounds?: (props: DrawingElementProps) => DrawingBounds | null;
};

function mergeBounds(bounds: Bounds[]) {
  if (bounds.length === 0) {
    return null;
  }

  return bounds.reduce((accumulator, current) => ({
    minX: Math.min(accumulator.minX, current.minX),
    minY: Math.min(accumulator.minY, current.minY),
    maxX: Math.max(accumulator.maxX, current.maxX),
    maxY: Math.max(accumulator.maxY, current.maxY),
  }));
}

export function mergeDrawingBounds(bounds: DrawingBounds[]) {
  return mergeBounds(bounds);
}

function getPointsBounds(points: Point2D[]) {
  if (points.length === 0) {
    return null;
  }

  const xValues = points.map((point) => point.x);
  const yValues = points.map((point) => point.y);

  return {
    minX: Math.min(...xValues),
    minY: Math.min(...yValues),
    maxX: Math.max(...xValues),
    maxY: Math.max(...yValues),
  };
}

export function getDrawingBoundsFromChildren(children: ReactNode): DrawingBounds | null {
  const bounds = Children.toArray(children).flatMap((child) => {
    if (!isValidElement<DrawingElementProps>(child)) {
      return [];
    }

    const element = child as ReactElement<DrawingElementProps>;
    const elementType = element.type as DrawingElementType;

    if (element.type === Fragment) {
      const fragmentBounds = getDrawingBoundsFromChildren(element.props.children);
      return fragmentBounds ? [fragmentBounds] : [];
    }

    if (elementType.getBounds) {
      const customBounds = elementType.getBounds(element.props);
      return customBounds ? [customBounds] : [];
    }

    if (Array.isArray(element.props.points)) {
      const pointsBounds = getPointsBounds(element.props.points);
      return pointsBounds ? [pointsBounds] : [];
    }

    if (element.props.start && element.props.end) {
      const lineBounds = getPointsBounds([
        element.props.start,
        element.props.end,
      ]);
      return lineBounds ? [lineBounds] : [];
    }

    if (element.props.children) {
      const nestedBounds = getDrawingBoundsFromChildren(element.props.children);
      return nestedBounds ? [nestedBounds] : [];
    }

    return [];
  });

  return mergeBounds(bounds);
}

export default function DrawingCanvas({
  viewBoxWidth,
  viewBoxHeight,
  fit = "frame",
  fitBounds,
  width = "auto",
  height = "auto",
  align = "center",
  justify = "center",
  p = "none",
  px = "none",
  py = "none",
  className = "",
  ariaLabel = "Drawing canvas",
  children,
}: DrawingCanvasProps) {
  const contentBounds = getDrawingBoundsFromChildren(children);
  const boundsForFit = fitBounds ?? contentBounds;
  const paddingX = px === "none" ? SPACING_VALUES[p] : SPACING_VALUES[px];
  const paddingY = py === "none" ? SPACING_VALUES[p] : SPACING_VALUES[py];
  const contentWidth = contentBounds
    ? contentBounds.maxX - contentBounds.minX
    : viewBoxWidth ?? 1;
  const contentHeight = contentBounds
    ? contentBounds.maxY - contentBounds.minY
    : viewBoxHeight ?? 1;
  const fitWidth = boundsForFit
    ? boundsForFit.maxX - boundsForFit.minX
    : contentWidth;
  const fitHeight = boundsForFit
    ? boundsForFit.maxY - boundsForFit.minY
    : contentHeight;
  const resolvedViewBoxWidth =
    fit === "content" ? fitWidth + paddingX * 2 : viewBoxWidth ?? contentWidth;
  const resolvedViewBoxHeight =
    fit === "content" ? fitHeight + paddingY * 2 : viewBoxHeight ?? contentHeight;
  const offsetX = contentBounds
    ? justify === "start" || justify === "between" || justify === "around" || justify === "evenly"
      ? -contentBounds.minX + (fit === "content" ? paddingX : 0)
      : justify === "end"
      ? resolvedViewBoxWidth - contentWidth - contentBounds.minX - (fit === "content" ? paddingX : 0)
      : (resolvedViewBoxWidth - contentWidth) / 2 - contentBounds.minX
    : 0;
  const offsetY = contentBounds
    ? align === "start"
      ? -contentBounds.minY + (fit === "content" ? paddingY : 0)
      : align === "end"
      ? resolvedViewBoxHeight - contentHeight - contentBounds.minY - (fit === "content" ? paddingY : 0)
      : align === "stretch"
      ? -contentBounds.minY + (fit === "content" ? paddingY : 0)
      : (resolvedViewBoxHeight - contentHeight) / 2 - contentBounds.minY
    : 0;
  const preserveAspectRatio =
    align === "stretch"
      ? "none"
      : `${justify === "start" ? "xMin" : justify === "end" ? "xMax" : "xMid"} ${
          align === "start" ? "YMin" : align === "end" ? "YMax" : "YMid"
        } meet`;

  return (
    <svg
      viewBox={`0 0 ${resolvedViewBoxWidth} ${resolvedViewBoxHeight}`}
      preserveAspectRatio={preserveAspectRatio}
      className={`${widths[width]} ${heights[height]} ${className}`}
      aria-label={ariaLabel}
      role="img"
    >
      <g transform={`translate(${offsetX} ${offsetY})`}>{children}</g>
    </svg>
  );
}
