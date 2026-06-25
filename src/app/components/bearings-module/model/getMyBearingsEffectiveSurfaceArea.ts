import type {
  MyBearingsEffectiveArea,
  MyBearingsModuleParameters,
} from "./types";
import { getMyBearingsContactArea } from "./getMyBearingsContactArea";

export function getMyBearingsEffectiveSurfaceArea({
  cmin,
  ...geometry
}: MyBearingsModuleParameters): MyBearingsEffectiveArea {
  const contactArea = getMyBearingsContactArea({ cmin, ...geometry });
  const effectiveLength = Math.max(contactArea.contactLength - 2 * cmin, 0);
  const effectiveWidth = Math.max(contactArea.contactWidth - 2 * cmin, 0);
  const effectiveAreaMm2 = effectiveLength * effectiveWidth;

  return {
    effectiveLength,
    effectiveWidth,
    effectiveAreaMm2,
    effectiveAreaM2: effectiveAreaMm2 / 1_000_000,
  };
}
