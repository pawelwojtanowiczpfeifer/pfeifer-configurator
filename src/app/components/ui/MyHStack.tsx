import React from "react";
import {
  GAP_CLASSES,
  PADDING_CLASSES,
  PADDING_X_CLASSES,
  PADDING_Y_CLASSES,
  type SpacingSize,
} from "./spacingTokens";

type StackGap = SpacingSize;
type StackSpace = SpacingSize;
type StackAlign = "start" | "center" | "end" | "stretch";
type StackJustify =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly";
type StackSize =
  | "auto"
  | "full"
  | "screen"
  | "screen-dynamic"
  | "1/2"
  | "1/3"
  | "2/3"
  | "72";
type StackMinSize = "0" | "auto";
type StackMaxWidth = "none" | "5xl" | "6xl" | "7xl" | "app";
type StackOverflowY = "visible" | "hidden" | "auto";

const aligns = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const justifies = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

const sizes = {
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

const minHeights = {
  "0": "min-h-0",
  auto: "min-h-auto",
};

const minWidths = {
  "0": "min-w-0",
  auto: "min-w-auto",
};

const maxWidths = {
  none: "",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
  app: "max-w-[1536px]",
};

const overflowsY = {
  visible: "",
  hidden: "overflow-y-hidden",
  auto: "overflow-y-auto",
};

export type HStackProps<T extends React.ElementType = "div"> = {
  as?: T;
  children: React.ReactNode;
  gap?: StackGap;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  width?: StackSize;
  height?: StackSize;
  minHeight?: StackMinSize;
  minWidth?: StackMinSize;
  maxWidth?: StackMaxWidth;
  centered?: boolean;
  overflowY?: StackOverflowY;
  flex?: number;
  p?: StackSpace;
  px?: StackSpace;
  py?: StackSpace;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export default function MyHStack<T extends React.ElementType = "div">({
  as,
  children,
  gap = "md",
  align = "center",
  justify = "start",
  wrap = false,
  width = "auto",
  height = "auto",
  minHeight = "auto",
  minWidth = "auto",
  maxWidth = "none",
  centered = false,
  overflowY = "visible",
  flex,
  p = "none",
  px = "none",
  py = "none",
  className = "",
  style,
  ...props
}: HStackProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={`flex flex-row ${GAP_CLASSES[gap]} ${aligns[align]} ${justifies[justify]} ${
        wrap ? "flex-wrap" : "flex-nowrap"
      } ${sizes[width]} ${heights[height]} ${minHeights[minHeight]} ${
        minWidths[minWidth]
      } ${maxWidths[maxWidth]} ${centered ? "mx-auto" : ""} ${
        overflowsY[overflowY]
      } ${PADDING_CLASSES[p]} ${PADDING_X_CLASSES[px]} ${
        PADDING_Y_CLASSES[py]
      } ${className}`}
      style={{
        ...(flex !== undefined ? { flex } : {}),
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
