import React from "react";

export type RowProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  gap?: "small" | "medium" | "large";
  align?: "start" | "center" | "end";
  justify?: "start" | "center" | "between" | "end";
  wrap?: boolean;
};

export default function MyRow({
  children,
  gap = "medium",
  align = "center",
  justify = "start",
  wrap = false,
  className = "",
  ...props
}: RowProps) {
  const base = "flex";

  const gaps = {
    small: "gap-2",
    medium: "gap-4",
    large: "gap-6",
  };

  const aligns = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
  };

  const justifies = {
    start: "justify-start",
    center: "justify-center",
    between: "justify-between",
    end: "justify-end",
  };

  return (
    <div
      className={`${base} ${gaps[gap]} ${aligns[align]} ${justifies[justify]} ${
        wrap ? "flex-wrap" : "flex-nowrap"
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
