import React from "react";
import MyCard from "./MyCard";
import MyLabel from "./MyLabel";
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
};

export default function MySidebar({
  title,
  children,
  size = "md",
  height = "auto",
  flex,
  p = "md",
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
    full: "h-full",
    "screen-dynamic": "h-dvh",
  };

  return (
    <MyCard
      p={p}
      className={`${sizes[size]} ${heights[height]} ${className}`}
      style={flex !== undefined ? { flex, ...style } : style}
      {...props}
    >
      <div className="space-y-4">
        {title && <MyLabel size="medium">{title}</MyLabel>}
        <div className="space-y-3">{children}</div>
      </div>
    </MyCard>
  );
}
