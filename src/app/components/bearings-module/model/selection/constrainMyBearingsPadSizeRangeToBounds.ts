import type {
  MyBearingsPadSizeBounds,
  MyBearingsPadSizeRange,
} from "./types";

type ConstrainMyBearingsPadSizeRangeToBoundsInput = {
  range: MyBearingsPadSizeRange;
  bounds: MyBearingsPadSizeBounds;
};

export function constrainMyBearingsPadSizeRangeToBounds({
  range,
  bounds,
}: ConstrainMyBearingsPadSizeRangeToBoundsInput): MyBearingsPadSizeRange | null {
  const maxWidthMm = Math.min(range.maxWidthMm, bounds.maxWidthMm);
  const maxLengthMm = Math.min(range.maxLengthMm, bounds.maxLengthMm);

  if (range.minWidthMm > maxWidthMm || range.minLengthMm > maxLengthMm) {
    return null;
  }

  return {
    ...range,
    maxWidthMm,
    maxLengthMm,
  };
}
