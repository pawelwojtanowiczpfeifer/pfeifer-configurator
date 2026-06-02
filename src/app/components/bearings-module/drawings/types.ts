import type { DrawingBounds } from "@/app/components/drawings/primitives/MyDrawingCanvas";
import type { MyBearingsModuleParameters } from "@/app/components/bearings-module/model/types";

type MyBearingsDrawingSharedProps = MyBearingsModuleParameters & {
  hasStuds?: boolean;
};

export type MyBearingsModuleDrawingProps = MyBearingsDrawingSharedProps & {
  className?: string;
  ariaLabel?: string;
};

export type MyBearingsSideViewProps = MyBearingsDrawingSharedProps & {
  className?: string;
  ariaLabel?: string;
  fitBounds?: DrawingBounds;
};

export type MyBearingsTopViewProps = MyBearingsDrawingSharedProps & {
  className?: string;
  ariaLabel?: string;
  fitBounds?: DrawingBounds;
};
