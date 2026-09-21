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
  } =
    useMyBearingsModuleConfigurator();

  return (
    <MyBearingsModuleDrawing
      {...geometry}
      connectionType={connectionType}
      beamTopHeadArrangement={beamTopHeadArrangement}
      hasStuds={hasStuds}
      selectedPadDrawing={selectedPadDrawing}
      ariaLabel="Technical drawing preview"
    />
  );
}
