"use client";

import MyLabel from "@/app/components/ui/MyLabel";
import MySummaryRow from "@/app/components/ui/MySummaryRow";
import { useMyBearingsModuleConfigurator } from "../MyBearingsModuleConfigurator";
import { getMyBearingsEffectiveSurfaceArea } from "../model/getMyBearingsEffectiveSurfaceArea";

function formatMillimeters(value: number) {
  return `${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value)} mm`;
}

function formatSquareMillimeters(value: number) {
  return `${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value)} mm2`;
}

export default function MyBearingsEffectiveSurfaceAreaResult() {
  const { geometry } = useMyBearingsModuleConfigurator();
  const effectiveArea = getMyBearingsEffectiveSurfaceArea(geometry);

  return (
    <div className="space-y-3">
      <MyLabel size="small">Effective area</MyLabel>
      <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3">
        <MySummaryRow
          label="Effective length"
          value={formatMillimeters(effectiveArea.effectiveLength)}
        />
        <MySummaryRow
          label="Effective width"
          value={formatMillimeters(effectiveArea.effectiveWidth)}
        />
        <MySummaryRow
          label="Aeff"
          value={formatSquareMillimeters(effectiveArea.effectiveAreaMm2)}
          className="border-b-0"
        />
      </div>
    </div>
  );
}
