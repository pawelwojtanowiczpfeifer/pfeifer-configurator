"use client";

import MyBearingsModuleDrawing from "./MyBearingsModuleDrawing";
import { useMyBearingsModuleConfigurator } from "../MyBearingsModuleConfigurator";

export default function MyBearingsModuleDrawingContent() {
  const { geometry, hasStuds } = useMyBearingsModuleConfigurator();

  return (
    <MyBearingsModuleDrawing
      {...geometry}
      hasStuds={hasStuds}
      ariaLabel="Technical drawing preview"
    />
  );
}
