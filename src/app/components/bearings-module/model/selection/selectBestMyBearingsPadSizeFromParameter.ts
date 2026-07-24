import type { MyBearingsCandidateEvaluationInput } from "../evaluation";
import { resolveMyBearingsPadSizeRange } from "./resolveMyBearingsPadSizeRange";
import {
  getMyBearingsPadSizeRangeFromParameter,
} from "./getMyBearingsPadSizeRangeFromParameter";
import { selectBestMyBearingsPadSizeFromRange } from "./selectBestMyBearingsPadSizeFromRange";
import type {
  MyBearingsPadSizeBounds,
  MyBearingsPadSizeRangeSource,
  MyBearingsPadSizeSelectionResult,
  MyBearingsPadSizeVariant,
} from "./types";

type SelectBestMyBearingsPadSizeFromParameterInput<
  TVariant extends MyBearingsPadSizeVariant,
> = {
  parameter: MyBearingsPadSizeRangeSource;
  bounds?: MyBearingsPadSizeBounds;
  buildEvaluationInput: (variant: TVariant) => MyBearingsCandidateEvaluationInput;
};

export function selectBestMyBearingsPadSizeFromParameter<
  TVariant extends MyBearingsPadSizeVariant,
>({
  parameter,
  bounds,
  buildEvaluationInput,
}: SelectBestMyBearingsPadSizeFromParameterInput<TVariant>):
  | MyBearingsPadSizeSelectionResult<TVariant>
  | null {
  const range = getMyBearingsPadSizeRangeFromParameter({
    parameter,
  });

  if (!range) {
    return null;
  }

  const resolvedRange = bounds
    ? resolveMyBearingsPadSizeRange({
        range,
        bounds,
        effectiveWidthMm: bounds.maxWidthMm,
        effectiveLengthMm: bounds.maxLengthMm,
      })
    : range;

  if (!resolvedRange) {
    return null;
  }

  return selectBestMyBearingsPadSizeFromRange({
    range: resolvedRange,
    buildEvaluationInput: (variant) => ({
      ...buildEvaluationInput(variant),
      dimensionalLimits: {
        minWidthMm: resolvedRange.minWidthMm,
        maxWidthMm: resolvedRange.maxWidthMm,
        minLengthMm: resolvedRange.minLengthMm,
        maxLengthMm: resolvedRange.maxLengthMm,
      },
    }),
  });
}
