import React from "react";
import { UI_COLORS } from "./colorPalette";

type RadioSize = "full" | "sm" | "md" | "lg";
type RadioDensity = "default" | "compact";
type RadioOrientation = "vertical" | "horizontal";
type RadioVariant = "default" | "card";

export type RadioOption<Value extends string | number = string> = {
  label: string;
  value: Value;
  description?: string;
  disabled?: boolean;
};

export type RadioProps<Value extends string | number = string> = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> & {
  options: RadioOption<Value>[];
  className?: string;
  optionClassName?: string;
  size?: RadioSize;
  density?: RadioDensity;
  orientation?: RadioOrientation;
  variant?: RadioVariant;
};

export default function MyRadio<Value extends string | number = string>({
  options,
  className = "",
  optionClassName = "",
  size = "full",
  density = "default",
  orientation = "vertical",
  variant = "default",
  name,
  disabled,
  value,
  defaultValue,
  onChange,
  ...props
}: RadioProps<Value>) {
  const generatedName = React.useId();
  const groupName = name ?? `radio-${generatedName}`;

  const widths = {
    sm: "w-36",
    md: "w-48",
    lg: "w-64",
    full: "w-full",
  };

  const layout =
    orientation === "horizontal"
      ? "flex flex-wrap items-start gap-3"
      : "space-y-3";

  const densities = {
    default: {
      wrapper: "gap-3",
      description: "text-sm",
      marker: "mt-0.5",
    },
    compact: {
      wrapper: "gap-2.5",
      description: "text-xs",
      marker: "mt-0.5",
    },
  };

  const variants = {
    default: "rounded-none border-transparent bg-transparent p-0",
    card: "rounded-lg border border-zinc-300 bg-white px-3 py-2.5 transition hover:border-zinc-400 has-[:checked]:border-blue-600 has-[:checked]:ring-2 has-[:checked]:ring-blue-100",
  };

  return (
    <div className={`${widths[size]} ${layout} ${className}`}>
      {options.map((option, index) => {
        const optionId = `${groupName}-${String(option.value)}-${index}`;
        const isChecked =
          value !== undefined
            ? String(value) === String(option.value)
            : undefined;

        return (
          <label
            key={optionId}
            htmlFor={optionId}
            className={`flex cursor-pointer items-start ${
              densities[density].wrapper
            } ${variants[variant]} ${
              disabled || option.disabled
                ? "cursor-not-allowed opacity-60"
                : "text-zinc-900"
            } ${optionClassName}`}
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
              className={`h-4 w-4 border-zinc-300 focus:ring-2 focus:ring-zinc-300 ${densities[density].marker}`}
              style={{ accentColor: UI_COLORS.akzentblau.hex }}
              {...props}
            />

            <span className="space-y-1">
              <span className="block text-sm font-medium text-zinc-900">
                {option.label}
              </span>
              {option.description ? (
                <span
                  className={`block text-zinc-600 ${densities[density].description}`}
                >
                  {option.description}
                </span>
              ) : null}
            </span>
          </label>
        );
      })}
    </div>
  );
}
