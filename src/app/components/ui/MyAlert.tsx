import React from "react";

export type AlertProps = React.HTMLAttributes<HTMLDivElement> & {
  variant: "info" | "success" | "warning" | "error";
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export default function MyAlert({
  variant,
  title,
  children,
  className = "",
  ...props
}: AlertProps) {
  const base = "rounded-md border px-4 py-3";

  const variants = {
    info: "border-blue-200 bg-blue-50 text-blue-900",
    success: "border-emerald-200 bg-emerald-50 text-emerald-900",
    warning: "border-amber-200 bg-amber-50 text-amber-900",
    error: "border-red-200 bg-red-50 text-red-900",
  };

  return (
    <div className={`${base} ${variants[variant]} ${className}`} {...props}>
      <div className="space-y-1">
        {title && <p className="text-sm font-medium">{title}</p>}
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
}
