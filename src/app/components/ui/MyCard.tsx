import React from "react";
import { PADDING_CLASSES, type SpacingSize } from "./spacingTokens";

type CardMinWidth = "none" | "sm" | "md" | "lg";
type CardShadow = "none" | "sm" | "md" | "lg";

const CARD_MIN_WIDTH_CLASSES: Record<CardMinWidth, string> = {
  none: "",
  sm: "min-w-48",
  md: "min-w-56",
  lg: "min-w-64",
};

const CARD_SHADOW_CLASSES: Record<CardShadow, string> = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
};

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  p?: SpacingSize;
  minWidth?: CardMinWidth;
  shadow?: CardShadow;
  nowrap?: boolean;
  className?: string;
};

export default function MyCard({
  children,
  p = "md",
  minWidth = "none",
  shadow = "none",
  nowrap = false,
  className = "",
  ...props
}: CardProps) {
  const base = `flex flex-col rounded-lg border border-zinc-300 bg-white ${
    PADDING_CLASSES[p]
  } ${CARD_MIN_WIDTH_CLASSES[minWidth]} ${CARD_SHADOW_CLASSES[shadow]} ${
    nowrap ? "whitespace-nowrap" : ""
  }`;

  return (
    <div className={`${base} ${className}`} {...props}>
      {children}
    </div>
  );
}
