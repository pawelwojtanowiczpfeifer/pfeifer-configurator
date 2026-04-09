import React from "react";
import MyRow from "./MyRow";
import { HEADER_COLORS, type HeaderColorName } from "./headerColors";

export type HeaderProps = {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  className?: string;
  color?: HeaderColorName;
  backgroundColor?: HeaderColorName;
  align?: "start" | "center" | "end";
};

export default function MyHeader({
  leftContent,
  rightContent,
  className = "",
  color,
  backgroundColor,
  align = "center",
}: HeaderProps) {
  const selectedBackgroundColor = backgroundColor
    ? HEADER_COLORS[backgroundColor].hex
    : undefined;
  const selectedTextColor = color
    ? HEADER_COLORS[color].hex
    : backgroundColor
      ? HEADER_COLORS[backgroundColor].contrastTextHex
      : undefined;
  const justify = leftContent && rightContent ? "between" : "start";

  return (
    <div
      className={`space-y-3 ${backgroundColor ? "rounded-md px-5 py-4" : ""} ${className}`}
      style={
        selectedBackgroundColor || selectedTextColor
          ? {
              backgroundColor: selectedBackgroundColor,
              color: selectedTextColor,
            }
          : undefined
      }
    >
      <MyRow align={align} justify={justify} className="gap-4">
        {leftContent && <div className="min-w-0">{leftContent}</div>}
        {rightContent && <div className="shrink-0">{rightContent}</div>}
      </MyRow>
    </div>
  );
}
