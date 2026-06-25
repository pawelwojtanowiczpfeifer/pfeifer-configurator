import type { DrawingBounds } from "@/app/components/drawings/primitives/MyDrawingCanvas";
import type { MyBearingsConnectionType } from "@/app/components/bearings-module/model/types";
import type { MyBearingsModuleParameters } from "@/app/components/bearings-module/model/types";

type MyBearingsDrawingSharedProps = MyBearingsModuleParameters & {
  hasStuds?: boolean;
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
