export type MyBearingsModuleParameters = {
  isEndNotchedBeam: boolean;
  g1: number;
  g2: number;
  tc: number;
  b1: number;
  a1: number;
  a2: number;
  b2: number;
  b3: number;
  cmin: number;
  n: 1 | 2;
  ds: number;
  e1: number;
  e2: number;
  e3: number;
};

export type MyBearingsModuleForceAndDeformation = {
  designVerticalForce: number;
  bearingRotation: number;
  horizontalDeformation: number;
};

export type MyBearingsConnectionType = "cantilever" | "beam-top";

export type MyBearingsModuleFireResistance =
  | "not-specified"
  | "R30"
  | "R60"
  | "R120";

export type MyBearingsContactArea = {
  contactLength: number;
  contactWidth: number;
  contactAreaMm2: number;
  contactAreaM2: number;
};

export type MyBearingsEffectiveArea = {
  effectiveLength: number;
  effectiveWidth: number;
  effectiveAreaMm2: number;
  effectiveAreaM2: number;
};
