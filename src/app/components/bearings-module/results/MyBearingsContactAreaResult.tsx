"use client";

import MyLabel from "@/app/components/ui/MyLabel";
import MySummaryRow from "@/app/components/ui/MySummaryRow";
import { useMyBearingsModuleConfigurator } from "../MyBearingsModuleConfigurator";
import { getMyBearingsContactArea } from "../model/getMyBearingsContactArea";

function formatMillimeters(value: number) {
  return `${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value)} mm`;
}

export default function MyBearingsContactAreaResult() {
  const { geometry } = useMyBearingsModuleConfigurator();
  const contactArea = getMyBearingsContactArea(geometry);

  return (
    <div className="space-y-3">
      <MyLabel size="small">Contact area</MyLabel>
      <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3">
        <MySummaryRow
          label="Contact length"
          value={formatMillimeters(contactArea.contactLength)}
        />
        <MySummaryRow
          label="Contact width"
          value={formatMillimeters(contactArea.contactWidth)}
          className="border-b-0"
        />
      </div>
    </div>
  );
}
