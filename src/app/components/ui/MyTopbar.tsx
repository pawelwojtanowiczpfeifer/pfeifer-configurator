import React from "react";
import { UI_COLORS, type UIColorName } from "./colorPalette";
import { BAR_PADDING_CLASSES, type BarSpacingSize } from "./spacingTokens";

export type TopbarProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
  p?: BarSpacingSize;
  border?: boolean;
  color?: UIColorName;
  backgroundColor?: UIColorName;
};

export default function MyTopbar({
  children,
  p = "md",
  border = true,
  color,
  backgroundColor,
  className = "",
  style,
  ...props
}: TopbarProps) {
  const selectedBackgroundColor = backgroundColor
    ? UI_COLORS[backgroundColor].hex
    : undefined;
  const selectedTextColor = color
    ? UI_COLORS[color].hex
    : backgroundColor
      ? UI_COLORS[backgroundColor].contrastTextHex
      : undefined;

  return (
    <header
      className={`rounded-lg ${BAR_PADDING_CLASSES[p]} ${
        border ? "border border-zinc-300" : ""
      } ${!backgroundColor ? "bg-white" : ""} ${className}`}
      style={{
        ...(selectedBackgroundColor || selectedTextColor
          ? {
              backgroundColor: selectedBackgroundColor,
              color: selectedTextColor,
            }
          : {}),
        ...style,
      }}
      {...props}
    >
      {children}
    </header>
  );
}
