import React from "react";

export type SummaryRowProps = {
  label: string;
  value: React.ReactNode;
  className?: string;
};

export default function MySummaryRow({
  label,
  value,
  className = "",
}: SummaryRowProps) {
  return (
    <div
      className={`flex items-center justify-between gap-6 border-b border-zinc-200 py-3 ${className}`}
    >
      <span className="text-sm text-zinc-600">{label}</span>
      <span className="text-sm font-medium text-zinc-900">{value}</span>
    </div>
  );
}
