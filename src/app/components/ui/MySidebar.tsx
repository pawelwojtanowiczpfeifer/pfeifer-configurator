import React from "react";
import MyCard from "./MyCard";
import MyLabel from "./MyLabel";
import { UI_COLORS, type UIColorName } from "./colorPalette";
import type { SpacingSize } from "./spacingTokens";

type SidebarSize = "sm" | "md" | "lg" | "full";
type SidebarHeight = "auto" | "full" | "screen-dynamic";

export type SidebarProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  children?: React.ReactNode;
  size?: SidebarSize;
  height?: SidebarHeight;
  flex?: number;
  p?: SpacingSize;
  color?: UIColorName;
  backgroundColor?: UIColorName;
};

export default function MySidebar({
  title,
  children,
  size = "md",
  height = "auto",
  flex,
  p = "md",
  color,
  backgroundColor,
  className = "",
  style,
  ...props
}: SidebarProps) {
  const sizes = {
    sm: "w-56",
    md: "w-72",
    lg: "w-96",
    full: "w-full",
  };

  const heights = {
    auto: "",
    full: "self-stretch",
    "screen-dynamic": "h-dvh",
  };

  const selectedBackgroundColor = backgroundColor
    ? UI_COLORS[backgroundColor].hex
    : undefined;
  const selectedTextColor = color
    ? UI_COLORS[color].hex
    : backgroundColor
      ? UI_COLORS[backgroundColor].contrastTextHex
      : undefined;

  return (
    <MyCard
      p={p}
      className={`${sizes[size]} ${heights[height]} ${!backgroundColor ? "bg-white" : ""} ${className}`}
      style={{
        ...(selectedBackgroundColor || selectedTextColor
          ? {
              backgroundColor: selectedBackgroundColor,
              color: selectedTextColor,
            }
          : {}),
        ...(flex !== undefined ? { flex } : {}),
        ...style,
      }}
      {...props}
    >
      <div className="flex h-full flex-col gap-4">
        {title && (
          <MyLabel size="medium" color={color ?? backgroundColor}>
            {title}
          </MyLabel>
        )}
        <div className="space-y-3">{children}</div>
      </div>
    </MyCard>
  );
}
