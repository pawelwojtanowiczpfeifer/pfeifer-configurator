import type {
  MyBearingsContactArea,
  MyBearingsModuleParameters,
} from "./types";

export function getMyBearingsContactArea({
  g1,
  s1,
  s2,
  b,
}: MyBearingsModuleParameters): MyBearingsContactArea {
  const contactLength = Math.max(s2 - g1, 0);
  const contactWidth = Math.max(Math.min(b, s1), 0);
  const contactAreaMm2 = contactLength * contactWidth;

  return {
    contactLength,
    contactWidth,
    contactAreaMm2,
    contactAreaM2: contactAreaMm2 / 1_000_000,
  };
}
