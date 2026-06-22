"use client";

import React from "react";
import MyLabel from "@/app/components/ui/MyLabel";

export type MyFieldLabelProps = {
  symbol: React.ReactNode;
  description: string;
};

export default function MyFieldLabel({
  symbol,
  description,
}: MyFieldLabelProps) {
  return (
    <MyLabel size="small">
      <span className="inline-flex items-baseline gap-1.5">
        <b className="text-zinc-900">{symbol}</b>
        <span className="text-[0.8125rem] font-normal text-zinc-600">
          {description}
        </span>
      </span>
    </MyLabel>
  );
}
