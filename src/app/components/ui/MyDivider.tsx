import React from "react";

export type DividerProps = React.HTMLAttributes<HTMLHRElement>;

export default function MyDivider({ className = "", ...props }: DividerProps) {
  return (
    <hr
      className={`w-full border-0 border-t border-zinc-300 ${className}`}
      {...props}
    />
  );
}
