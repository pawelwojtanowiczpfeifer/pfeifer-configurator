import React from "react";
import MyLabel from "./MyLabel";

export type FieldProps = {
  label: string;
  description?: string;
  error?: string;
  children: React.ReactNode;
};

export default function MyField({
  label,
  description,
  error,
  children,
}: FieldProps) {
  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <MyLabel size="small">{label}</MyLabel>
        {description && <p className="text-sm text-zinc-600">{description}</p>}
      </div>

      {children}

      {error && <p className="text-sm text-red-700">{error}</p>}
    </div>
  );
}
