import type { DrawingBounds } from "@/app/components/drawings/primitives/MyDrawingCanvas";
import type { MyBearingsModuleParameters } from "@/app/components/bearings-module/model/types";

export type MyBearingsModuleDrawingProps = MyBearingsModuleParameters & {
  className?: string;
  ariaLabel?: string;
};

export type MyBearingsSideViewProps = MyBearingsModuleParameters & {
  className?: string;
  ariaLabel?: string;
  fitBounds?: DrawingBounds;
};

export type MyBearingsTopViewProps = MyBearingsModuleParameters & {
  className?: string;
  ariaLabel?: string;
  fitBounds?: DrawingBounds;
};
