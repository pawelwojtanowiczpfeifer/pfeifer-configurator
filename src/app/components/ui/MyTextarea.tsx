import React from "react";

export type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    className?: string;
  };

export default function MyTextarea({
  rows = 4,
  className = "",
  ...props
}: TextareaProps) {
  const base =
    "w-full rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-500";

  return <textarea rows={rows} className={`${base} ${className}`} {...props} />;
}
