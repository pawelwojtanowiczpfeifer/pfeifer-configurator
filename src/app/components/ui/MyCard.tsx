import React from "react";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  className?: string;
};

export default function MyCard({
  children,
  className = "",
  ...props
}: CardProps) {
  const base = "rounded-lg border border-zinc-300 bg-white p-4";

  return (
    <div className={`${base} ${className}`} {...props}>
      {children}
    </div>
  );
}
