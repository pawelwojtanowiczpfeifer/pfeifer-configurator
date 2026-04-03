import React from "react";
import MyCard from "./MyCard";
import MyLabel from "./MyLabel";

export type SidebarProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export default function MySidebar({
  title,
  children,
  className = "",
}: SidebarProps) {
  return (
    <MyCard className={className}>
      <div className="space-y-4">
        {title && <MyLabel size="medium">{title}</MyLabel>}
        <div className="space-y-3">{children}</div>
      </div>
    </MyCard>
  );
}
