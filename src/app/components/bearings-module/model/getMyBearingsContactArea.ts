import type {
  MyBearingsContactArea,
  MyBearingsModuleParameters,
} from "./types";

export function getMyBearingsContactArea({
  g1,
  b1,
  a1,
  b2,
}: MyBearingsModuleParameters): MyBearingsContactArea {
  const contactLength = Math.max(a1 - g1, 0);
  const contactWidth = Math.max(Math.min(b2, b1), 0);
  const contactAreaMm2 = contactLength * contactWidth;

  return {
    contactLength,
    contactWidth,
    contactAreaMm2,
    contactAreaM2: contactAreaMm2 / 1_000_000,
  };
}
