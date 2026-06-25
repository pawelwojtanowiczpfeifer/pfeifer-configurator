import type { MyBearingsVariantDrawingProps } from "./types";
import MyBearingsBeamTopModuleDrawing from "./MyBearingsBeamTopModuleDrawing";
import MyBearingsCantileverModuleDrawing from "./MyBearingsCantileverModuleDrawing";

export default function MyBearingsModuleDrawing({
  connectionType,
  ...drawingProps
}: MyBearingsVariantDrawingProps) {
  if (connectionType === "beam-top") {
    return <MyBearingsBeamTopModuleDrawing {...drawingProps} />;
  }

  return <MyBearingsCantileverModuleDrawing {...drawingProps} />;
}
