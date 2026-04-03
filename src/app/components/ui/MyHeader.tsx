import React from "react";
import MyLabel from "./MyLabel";
import MyRow from "./MyRow";

export type HeaderProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
};

export default function MyHeader({
  title,
  description,
  actions,
  className = "",
}: HeaderProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      <MyRow align="start" justify="between" className="gap-4">
        <div className="space-y-1">
          <MyLabel size="large">{title}</MyLabel>
          {description && <p className="text-sm text-zinc-600">{description}</p>}
        </div>

        {actions && <div className="shrink-0">{actions}</div>}
      </MyRow>
    </div>
  );
}
