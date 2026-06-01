import React from "react";

type InputSize = "full" | "sm" | "md" | "lg";
type InputDensity = "default" | "compact";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  className?: string;
  size?: InputSize;
  density?: InputDensity;
  suffix?: React.ReactNode;
};

export default function MyInput({
  type = "text",
  size = "full",
  density = "default",
  className = "",
  suffix,
  ...props
}: InputProps) {
  const base =
    "rounded-lg border border-zinc-300 bg-white text-zinc-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-500";

  const sizes = {
    sm: "w-36",
    md: "w-48",
    lg: "w-64",
    full: "w-full",
  };

  const densities = {
    default: "h-[42px] px-4 text-sm",
    compact: "h-[34px] px-3 text-sm leading-4",
  };

  return (
    <div className={`relative ${sizes[size]}`}>
      <input
        type={type}
        className={`${base} w-full ${densities[density]} ${
          suffix ? "pr-14" : ""
        } ${className}`}
        {...props}
      />
      {suffix ? (
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-zinc-500">
          {suffix}
        </span>
      ) : null}
    </div>
  );
}
