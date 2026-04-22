export type SpacingSize =
  | "none"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl";
export type BarSpacingSize = "sm" | "md" | "lg";

export const GAP_CLASSES: Record<SpacingSize, string> = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
  "2xl": "gap-10",
  "3xl": "gap-12",
};

export const PADDING_CLASSES: Record<SpacingSize, string> = {
  none: "",
  xs: "p-1",
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
  xl: "p-8",
  "2xl": "p-10",
  "3xl": "p-12",
};

export const PADDING_X_CLASSES: Record<SpacingSize, string> = {
  none: "",
  xs: "px-1",
  sm: "px-2",
  md: "px-4",
  lg: "px-6",
  xl: "px-8",
  "2xl": "px-10",
  "3xl": "px-12",
};

export const PADDING_Y_CLASSES: Record<SpacingSize, string> = {
  none: "",
  xs: "py-1",
  sm: "py-2",
  md: "py-4",
  lg: "py-6",
  xl: "py-8",
  "2xl": "py-10",
  "3xl": "py-12",
};

export const BAR_PADDING_CLASSES: Record<BarSpacingSize, string> = {
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
};
