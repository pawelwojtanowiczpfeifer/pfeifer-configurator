"use client";

import MyBearingsModuleDrawing from "./MyBearingsModuleDrawing";
import { useMyBearingsModuleConfigurator } from "../MyBearingsModuleConfigurator";

export default function MyBearingsModuleDrawingContent() {
  const { geometry, connectionType, hasStuds } =
    useMyBearingsModuleConfigurator();

  return (
    <MyBearingsModuleDrawing
      {...geometry}
      connectionType={connectionType}
      hasStuds={hasStuds}
      ariaLabel="Technical drawing preview"
    />
  );
}
