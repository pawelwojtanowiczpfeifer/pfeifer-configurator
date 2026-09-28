"use client";

import MyButton from "@/app/components/ui/MyButton";
import { useMyBearingsModuleConfigurator } from "./MyBearingsModuleConfigurator";

export default function MyBearingsCalculationActions() {
  const {
    calculateBearings,
    calculationStatus,
    isCalculationReportAvailable,
    openCalculationNotePreview,
  } = useMyBearingsModuleConfigurator();

  return (
    <div className="grid grid-cols-2 gap-3">
      <MyButton
        className="col-span-2 w-full"
        disabled={calculationStatus === "current"}
        onClick={calculateBearings}
      >
        Calculate bearing
      </MyButton>
      <MyButton
        className="w-full"
        variant="outline"
        disabled={calculationStatus !== "current" || !isCalculationReportAvailable}
        onClick={openCalculationNotePreview}
      >
        PDF Report
      </MyButton>
      <MyButton className="w-full" variant="outline" disabled>
        Drawing
      </MyButton>
    </div>
  );
}
