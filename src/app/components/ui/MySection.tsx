import React from "react";
import MyCard from "./MyCard";
import MyLabel from "./MyLabel";
import MyRow from "./MyRow";

export type SectionProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export default function MySection({
  title,
  description,
  actions,
  children,
  className = "",
}: SectionProps) {
  return (
    <MyCard className={className}>
      <div className="space-y-4">
        <MyRow align="start" justify="between" className="gap-4">
          <div className="space-y-1">
            <MyLabel size="medium">{title}</MyLabel>
            {description && <p className="text-sm text-zinc-600">{description}</p>}
          </div>

          {actions && <div className="shrink-0">{actions}</div>}
        </MyRow>

        <div>{children}</div>
      </div>
    </MyCard>
  );
}
