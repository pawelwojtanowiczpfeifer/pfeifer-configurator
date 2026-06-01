import React from "react";
import { UI_COLORS } from "./colorPalette";

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  description?: string;
  className?: string;
};

export default function MyCheckbox({
  label,
  description,
  className = "",
  style,
  ...props
}: CheckboxProps) {
  return (
    <label className={`flex items-start gap-3 ${className}`}>
      <input
        type="checkbox"
        className="mt-0.5 h-4 w-4 rounded-lg border-zinc-300 focus:ring-2 focus:ring-zinc-300 disabled:cursor-not-allowed disabled:opacity-60"
        style={{
          accentColor: UI_COLORS.akzentblau.hex,
          ...style,
        }}
        {...props}
      />

      <span className="space-y-1">
        <span className="block text-sm font-medium text-zinc-900">{label}</span>
        {description && (
          <span className="block text-sm text-zinc-600">{description}</span>
        )}
      </span>
    </label>
  );
}
