import type { DrawingBounds } from "../primitives/MyDrawingCanvas";

export type MyBearingsModuleParameters = {
  g1: number;
  g2: number;
  s1: number;
  s2: number;
  b: number;
};

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
