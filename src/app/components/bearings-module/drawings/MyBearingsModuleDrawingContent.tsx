"use client";

import MyBearingsModuleDrawing from "./MyBearingsModuleDrawing";
import { useMyBearingsModuleConfigurator } from "../MyBearingsModuleConfigurator";

export default function MyBearingsModuleDrawingContent() {
  const {
    geometry,
    connectionType,
    beamTopHeadArrangement,
    hasStuds,
    selectedPadDrawing,
    calculationStatus,
  } =
    useMyBearingsModuleConfigurator();

  return (
    <MyBearingsModuleDrawing
      {...geometry}
      connectionType={connectionType}
      beamTopHeadArrangement={beamTopHeadArrangement}
      hasStuds={hasStuds}
      selectedPadDrawing={
        calculationStatus === "current" ? selectedPadDrawing : null
      }
      ariaLabel="Technical drawing preview"
    />
  );
}
