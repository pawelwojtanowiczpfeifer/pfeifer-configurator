import React from "react";
import { PADDING_CLASSES, type SpacingSize } from "./spacingTokens";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  p?: SpacingSize;
  className?: string;
};

export default function MyCard({
  children,
  p = "md",
  className = "",
  ...props
}: CardProps) {
  const base = `rounded-lg border border-zinc-300 bg-white ${PADDING_CLASSES[p]}`;

  return (
    <div className={`${base} ${className}`} {...props}>
      {children}
    </div>
  );
}
