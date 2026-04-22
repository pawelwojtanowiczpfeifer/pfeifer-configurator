import React from "react";

export type SelectOption = {
  label: string;
  value: string;
};

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: SelectOption[];
  className?: string;
  fullWidth?: boolean;
  widthPreset?: "sm" | "md" | "lg";
  width?: string;
};

export default function MySelect({
  options,
  className = "",
  fullWidth = true,
  widthPreset = "md",
  width,
  ...props
}: SelectProps) {
  const base =
    "rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-500";

  const sizes = {
    sm: "w-24",
    md: "w-32",
    lg: "w-40",
  };

  const widthClass = fullWidth ? "w-full" : `shrink-0 ${sizes[widthPreset]}`;

  return (
    <select
      className={`${base} ${widthClass} ${className}`}
      style={width ? { width } : undefined}
      {...props}
    >
      {options.map((option, index) => (
        <option
          key={`${option.value || option.label}-${index}`}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}
