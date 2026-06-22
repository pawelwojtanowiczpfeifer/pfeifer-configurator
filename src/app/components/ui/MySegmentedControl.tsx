import React from "react";

type SegmentedSize = "full" | "sm" | "md" | "lg";
type SegmentedDensity = "default" | "compact" | "dense";
type SegmentedTone = "default" | "subtle";
type SegmentedOrientation = "horizontal" | "vertical";
type SegmentedVariant = "pill" | "tabs";

export type SegmentedControlOption<Value extends string | number = string> = {
  label: string;
  value: Value;
  disabled?: boolean;
};

export type SegmentedControlProps<Value extends string | number = string> =
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> & {
    options: SegmentedControlOption<Value>[];
    className?: string;
    size?: SegmentedSize;
    density?: SegmentedDensity;
    tone?: SegmentedTone;
    orientation?: SegmentedOrientation;
    variant?: SegmentedVariant;
    fullWidthOptions?: boolean;
  };

export default function MySegmentedControl<
  Value extends string | number = string,
>({
  options,
  className = "",
  size = "full",
  density = "default",
  tone = "default",
  orientation = "horizontal",
  variant = "pill",
  fullWidthOptions = true,
  name,
  disabled,
  value,
  defaultValue,
  onChange,
  ...props
}: SegmentedControlProps<Value>) {
  const generatedName = React.useId();
  const groupName = name ?? `segmented-${generatedName}`;

  const widths = {
    sm: "w-36",
    md: "w-48",
    lg: "w-64",
    full: "w-full",
  };

  const shells = {
    default:
      variant === "tabs" ? "border-zinc-200 bg-white" : "border-zinc-300 bg-zinc-100",
    subtle: "border-zinc-200 bg-white",
  };

  const layouts = {
    horizontal: variant === "tabs" ? "flex flex-row items-stretch" : "flex flex-row items-stretch gap-1",
    vertical: variant === "tabs" ? "flex flex-col" : "flex flex-col gap-1",
  };

  const segmentSizes = {
    default: "min-h-[42px] px-3 text-sm",
    compact: "min-h-[32px] px-2.5 text-xs leading-4",
    dense: "min-h-[28px] px-2 text-xs leading-4",
  };

  const segmentVariants = {
    pill: {
      base: "rounded-lg border border-transparent text-zinc-500",
      enabled: "hover:text-zinc-700",
      checked:
        "peer-checked:border-blue-600 peer-checked:bg-white peer-checked:text-zinc-900 peer-checked:shadow-sm",
    },
    tabs: {
      base: "border border-transparent bg-white text-zinc-500",
      enabled: "hover:bg-zinc-50 hover:text-zinc-700",
      checked:
        "peer-checked:border-blue-200 peer-checked:bg-blue-50 peer-checked:text-zinc-900",
    },
  };

  return (
    <div
      className={`${widths[size]} ${layouts[orientation]} ${
        variant === "tabs" ? "overflow-hidden rounded-lg border" : "rounded-xl border p-1"
      } ${shells[tone]} ${className}`}
      role="radiogroup"
    >
      {options.map((option, index) => {
        const optionId = `${groupName}-${String(option.value)}-${index}`;
        const isFirst = index === 0;
        const isLast = index === options.length - 1;
        const isChecked =
          value !== undefined
            ? String(value) === String(option.value)
            : undefined;

        return (
          <label
            key={optionId}
            htmlFor={optionId}
            className={`relative flex ${
              fullWidthOptions
                ? orientation === "horizontal"
                  ? "flex-1"
                  : "w-full"
                : ""
            } cursor-pointer ${
              variant === "tabs"
                ? orientation === "horizontal"
                  ? isFirst
                    ? ""
                    : "border-l border-zinc-200"
                  : isFirst
                    ? ""
                    : "border-t border-zinc-200"
                : ""
            }`}
          >
            <input
              id={optionId}
              type="radio"
              name={groupName}
              value={String(option.value)}
              defaultChecked={
                defaultValue !== undefined
                  ? String(defaultValue) === String(option.value)
                  : undefined
              }
              checked={isChecked}
              disabled={disabled || option.disabled}
              onChange={onChange}
              className="peer sr-only"
              {...props}
            />
            <span
              className={`flex w-full items-center justify-center whitespace-nowrap text-center font-medium transition ${segmentSizes[density]} ${segmentVariants[variant].base} ${
                disabled || option.disabled
                  ? "cursor-not-allowed opacity-50"
                  : segmentVariants[variant].enabled
              } ${segmentVariants[variant].checked} ${
                variant === "tabs"
                  ? orientation === "horizontal"
                    ? isFirst
                      ? "rounded-l-lg"
                      : isLast
                        ? "rounded-r-lg"
                        : ""
                    : isFirst
                      ? "rounded-t-lg"
                      : isLast
                        ? "rounded-b-lg"
                        : ""
                  : ""
              } peer-focus-visible:z-10 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-100`}
            >
              {option.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}
