import type {
  MyBearingsContactArea,
  MyBearingsConnectionType,
  MyBearingsModuleParameters,
} from "./types";

type MyBearingsContactAreaInput = MyBearingsModuleParameters & {
  connectionType?: MyBearingsConnectionType;
};

export function getMyBearingsContactArea({
  connectionType = "cantilever",
  g1,
  g2,
  b1,
  b2,
  a1,
  a2,
  b3,
}: MyBearingsContactAreaInput): MyBearingsContactArea {
  const contactLength =
    connectionType === "beam-top"
      ? Math.max(a2 - g2, 0)
      : Math.max(a1 - g1, 0);
  const contactWidth =
    connectionType === "beam-top"
      ? Math.max(Math.min(b2, b3), 0)
      : Math.max(Math.min(b2, b1), 0);
  const contactAreaMm2 = contactLength * contactWidth;

  return {
    contactLength,
    contactWidth,
    contactAreaMm2,
    contactAreaM2: contactAreaMm2 / 1_000_000,
  };
}
