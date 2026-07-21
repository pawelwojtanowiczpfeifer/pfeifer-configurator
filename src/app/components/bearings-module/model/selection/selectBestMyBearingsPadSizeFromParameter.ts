import type { MyBearingsCandidateEvaluationInput } from "../evaluation";
import { constrainMyBearingsPadSizeRangeToBounds } from "./constrainMyBearingsPadSizeRangeToBounds";
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

  const constrainedRange = bounds
    ? constrainMyBearingsPadSizeRangeToBounds({
        range,
        bounds,
      })
    : range;

  if (!constrainedRange) {
    return null;
  }

  return selectBestMyBearingsPadSizeFromRange({
    range: constrainedRange,
    buildEvaluationInput: (variant) => ({
      ...buildEvaluationInput(variant),
      dimensionalLimits: {
        minWidthMm: constrainedRange.minWidthMm,
        maxWidthMm: constrainedRange.maxWidthMm,
        minLengthMm: constrainedRange.minLengthMm,
        maxLengthMm: constrainedRange.maxLengthMm,
      },
    }),
  });
}
