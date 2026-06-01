"use client";

import MyBearingsModuleDrawing from "./MyBearingsModuleDrawing";
import { useMyBearingsModuleConfigurator } from "../MyBearingsModuleConfigurator";

export default function MyBearingsModuleDrawingContent() {
  const { geometry } = useMyBearingsModuleConfigurator();

  return (
    <MyBearingsModuleDrawing
      g1={geometry.g1}
      g2={geometry.g2}
      s1={geometry.s1}
      s2={geometry.s2}
      b={geometry.b}
      c={geometry.c}
      ariaLabel="Technical drawing preview"
    />
  );
}
