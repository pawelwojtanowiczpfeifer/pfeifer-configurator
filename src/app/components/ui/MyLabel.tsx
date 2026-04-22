import React from "react";
import { UI_COLORS, type UIColorName } from "./colorPalette";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  children: React.ReactNode;
  variant?: "default" | "muted" | "error";
  size?: "small" | "medium" | "large";
  color?: UIColorName;
};

export default function MyLabel({
  children,
  variant = "default",
  size = "medium",
  color,
  className = "",
  style,
  ...props
}: LabelProps) {
  const base = "my-label";

  const variants = {
    default: "my-label--default",
    muted: "my-label--muted",
    error: "my-label--error",
  };

  const sizes = {
    small: "my-label--small",
    medium: "my-label--medium",
    large: "my-label--large",
  };

  return (
    <label
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      style={{
        ...(color ? { color: UI_COLORS[color].hex } : {}),
        ...style,
      }}
      {...props}
    >
      {children}
    </label>
  );
}
