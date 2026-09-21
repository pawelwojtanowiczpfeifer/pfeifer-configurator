"use client";

import MyLabel from "@/app/components/ui/MyLabel";
import MyVStack from "@/app/components/ui/MyVStack";
import { useMyBearingsModuleConfigurator } from "../../MyBearingsModuleConfigurator";
import type { MyBearingsBeamTopHeadArrangement } from "../../model/types";
import MyBeamTopHeadArrangementIcon from "./MyBeamTopHeadArrangementIcon";

type ArrangementOption = {
  value: MyBearingsBeamTopHeadArrangement;
  tooltip: string;
  accessibleName: string;
};

const ARRANGEMENT_OPTIONS: ArrangementOption[] = [
  {
    value: "no-upstand",
    tooltip: "no upstand",
    accessibleName: "No upstand",
  },
  {
    value: "two-beams",
    tooltip: "two beams",
    accessibleName: "Two beams",
  },
  {
    value: "outer-head-upstand",
    tooltip: "outer head upstand",
    accessibleName: "Outer head upstand",
  },
  {
    value: "three-sided-head-upstand",
    tooltip: "three-sided head upstand",
    accessibleName: "Three-sided head upstand",
  },
];

export default function MyBeamTopHeadArrangementSelector() {
  const { beamTopHeadArrangement, setBeamTopHeadArrangement } =
    useMyBearingsModuleConfigurator();

  return (
    <MyVStack gap="xs">
      <MyLabel size="small">
        <span className="text-[0.8125rem] font-normal text-zinc-600">
          column head arrangement
        </span>
      </MyLabel>
      <div className="grid grid-cols-4 gap-1.5" role="radiogroup" aria-label="Column head arrangement">
        {ARRANGEMENT_OPTIONS.map((option) => {
          const isSelected = beamTopHeadArrangement === option.value;

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={option.accessibleName}
              title={option.tooltip}
              onClick={() => setBeamTopHeadArrangement(option.value)}
              className={`flex min-h-16 items-center justify-center rounded-lg border bg-white p-1.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 ${
                isSelected
                  ? "border-blue-600 ring-2 ring-blue-100"
                  : "border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50"
              }`}
            >
              <MyBeamTopHeadArrangementIcon arrangement={option.value} />
            </button>
          );
        })}
      </div>
    </MyVStack>
  );
}
