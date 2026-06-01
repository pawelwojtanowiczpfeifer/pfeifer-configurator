import React from "react";

type SelectSize = "full" | "sm" | "md" | "lg";

export type SelectOption<Value extends string | number = string> = {
  label: string;
  value: Value;
};

export type SelectProps<Value extends string | number = string> = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> & {
  options: SelectOption<Value>[];
  className?: string;
  size?: SelectSize;
};

export default function MySelect<Value extends string | number = string>({
  options,
  size = "full",
  className = "",
  ...props
}: SelectProps<Value>) {
  const base =
    "w-full appearance-none rounded-lg border border-zinc-300 bg-white text-zinc-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-500";

  const sizes = {
    sm: "w-36",
    md: "w-48",
    lg: "w-64",
    full: "w-full",
  };

  const fieldSizes = {
    sm: "h-[34px] px-3 pr-9 text-sm leading-4",
    md: "h-[42px] px-4 pr-10 text-sm",
    lg: "h-[42px] px-4 pr-10 text-sm",
    full: "h-[42px] px-4 pr-10 text-sm",
  };

  return (
    <div className={`relative ${sizes[size]}`}>
      <select className={`${base} ${fieldSizes[size]} ${className}`} {...props}>
        {options.map((option, index) => (
          <option
            key={`${option.value || option.label}-${index}`}
            value={String(option.value)}
          >
            {option.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-500">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}
