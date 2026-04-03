import React from "react";

export type PageLayoutProps = {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export default function MyPageLayout({
  header,
  sidebar,
  children,
  className = "",
}: PageLayoutProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {header && <div>{header}</div>}

      <div className="flex items-start gap-6">
        {sidebar && <aside className="w-72 shrink-0">{sidebar}</aside>}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
