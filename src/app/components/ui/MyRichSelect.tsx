"use client";

import { useId, useState } from "react";

type RichSelectSize = "sm" | "md" | "lg" | "full";
type RichSelectLayout = "inline" | "stacked";

export type RichSelectOption<Value extends string | number = string> = {
  value: Value;
  label: string;
  secondaryLabel?: string;
  tooltip?: string;
};

type MyRichSelectProps<Value extends string | number> = {
  options: RichSelectOption<Value>[];
  value: Value;
  onValueChange: (value: Value) => void;
  size?: RichSelectSize;
  width?: "default" | "wide";
  layout?: RichSelectLayout;
  disabled?: boolean;
  ariaLabel: string;
};

export default function MyRichSelect<Value extends string | number>({
  options,
  value,
  onValueChange,
  size = "full",
  width = "default",
  layout = "inline",
  disabled = false,
  ariaLabel,
}: MyRichSelectProps<Value>) {
  const [isOpen, setIsOpen] = useState(false);
  const listId = useId();
  const selectedOption = options.find((option) => option.value === value);

  const widths = {
    default: {
      sm: "w-36",
      md: "w-48",
      lg: "w-64",
      full: "w-full",
    },
    wide: {
      sm: "w-56",
      md: "w-56",
      lg: "w-64",
      full: "w-full",
    },
  };

  const buttonSizes = {
    sm: "h-[34px] px-3 text-sm leading-4",
    md: "h-[42px] px-4 text-sm",
    lg: "h-[42px] px-4 text-sm",
    full: "h-[42px] px-4 text-sm",
  };

  const selectOption = (option: RichSelectOption<Value>) => {
    onValueChange(option.value);
    setIsOpen(false);
  };

  const isStacked = layout === "stacked";

  return (
    <div
      className={`relative ${widths[width][size]}`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        type="button"
        className={`flex w-full items-center justify-between rounded-lg border border-zinc-300 bg-white pr-3 text-left text-zinc-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-500 ${isStacked ? "h-[50px] px-3 py-1" : buttonSizes[size]}`}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        title={selectedOption?.tooltip}
        disabled={disabled}
        onClick={() => setIsOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setIsOpen(false);
          }

          if (event.key === "ArrowDown") {
            event.preventDefault();
            setIsOpen(true);
          }
        }}
      >
        <span className={`min-w-0 ${isStacked ? "flex flex-col" : "truncate whitespace-nowrap"}`}>
          <span className={isStacked ? "text-sm leading-4" : undefined}>
            {selectedOption?.label}
          </span>
          {selectedOption?.secondaryLabel && (
            <span className={isStacked ? "text-xs leading-4 text-zinc-500" : "ml-1 text-xs text-zinc-500"}>
              {selectedOption.secondaryLabel}
            </span>
          )}
        </span>
        <svg
          className="shrink-0 text-zinc-500"
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
      </button>
      {isOpen && (
        <ul
          id={listId}
          role="listbox"
          aria-label={ariaLabel}
          className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-zinc-200 bg-white py-1 shadow-lg"
        >
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <li key={String(option.value)} role="none">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`flex w-full px-3 py-2 text-left text-sm outline-none hover:bg-zinc-100 focus:bg-zinc-100 ${
                    isSelected ? "bg-zinc-50 text-zinc-900" : "text-zinc-700"
                  } ${isStacked ? "flex-col" : "items-baseline"}`}
                  title={option.tooltip}
                  onClick={() => selectOption(option)}
                >
                  <span className={isStacked ? "leading-4" : "whitespace-nowrap"}>{option.label}</span>
                  {option.secondaryLabel && (
                    <span className={isStacked ? "text-xs leading-4 text-zinc-500" : "ml-1 whitespace-nowrap text-xs text-zinc-500"}>
                      {option.secondaryLabel}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
