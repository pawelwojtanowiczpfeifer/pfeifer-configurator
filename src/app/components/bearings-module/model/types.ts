export type MyBearingsModuleParameters = {
  isEndNotchedBeam: boolean;
  g1: number;
  g2: number;
  s1: number;
  s2: number;
  b: number;
  c: number;
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
