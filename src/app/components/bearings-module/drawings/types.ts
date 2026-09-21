import type { DrawingBounds } from "@/app/components/drawings/primitives/MyDrawingCanvas";
import type {
  MyBearingsBeamTopHeadArrangement,
  MyBearingsConnectionType,
} from "@/app/components/bearings-module/model/types";
import type { MyBearingsModuleParameters } from "@/app/components/bearings-module/model/types";
import type { MyBearingsSelectedPadDrawing } from "../MyBearingsModuleConfigurator";

type MyBearingsDrawingSharedProps = MyBearingsModuleParameters & {
  hasStuds?: boolean;
  beamTopHeadArrangement?: MyBearingsBeamTopHeadArrangement;
  selectedPadDrawing?: MyBearingsSelectedPadDrawing | null;
};

export type MyBearingsModuleDrawingProps = MyBearingsDrawingSharedProps & {
  className?: string;
  ariaLabel?: string;
};

export type MyBearingsVariantDrawingProps = MyBearingsModuleDrawingProps & {
  connectionType: MyBearingsConnectionType;
};

export type MyBearingsSideViewProps = MyBearingsDrawingSharedProps & {
  className?: string;
  ariaLabel?: string;
  fitBounds?: DrawingBounds;
  dimensionScale?: number;
  hatchScale?: number;
};

export type MyBearingsTopViewProps = MyBearingsDrawingSharedProps & {
  className?: string;
  ariaLabel?: string;
  fitBounds?: DrawingBounds;
  dimensionScale?: number;
  hatchScale?: number;
};
