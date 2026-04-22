export type Point2D = {
  x: number;
  y: number;
};

export const LINE_WIDTHS = {
  thin: 1,
  medium: 2,
  thick: 4,
} as const;

export type LineWidth = keyof typeof LINE_WIDTHS;

export const LINE_STYLES = {
  solid: undefined,
  dashed: "10 6",
  dashDot: "14 5 2 5",
} as const;

export type LineStyle = keyof typeof LINE_STYLES;

export type DrawingColor = string;

export type LineParameters = {
  lineWidth?: LineWidth;
  lineStyle?: LineStyle;
  lineColor?: DrawingColor;
};

export function getLineParameters({
  lineWidth = "medium",
  lineStyle = "solid",
  lineColor = "#111827",
}: LineParameters) {
  return {
    strokeWidth: LINE_WIDTHS[lineWidth],
    strokeDasharray: LINE_STYLES[lineStyle],
    stroke: lineColor,
  };
}
