import { evaluateMyBearingsCandidate } from "../evaluation";
import type { MyBearingsCandidateEvaluationInput } from "../evaluation";
import {
  generateMyBearingsPadSizeVariantsFromRange,
} from "./generateMyBearingsPadSizeVariantsFromRange";
import { selectBestMyBearingsPadSize } from "./selectBestMyBearingsPadSize";
import type {
  MyBearingsPadSizeRange,
  MyBearingsPadSizeSelectionResult,
  MyBearingsPadSizeVariant,
} from "./types";

type SelectBestMyBearingsPadSizeFromRangeInput<TVariant extends MyBearingsPadSizeVariant> = {
  range: MyBearingsPadSizeRange;
  buildEvaluationInput: (variant: TVariant) => MyBearingsCandidateEvaluationInput;
};

export function selectBestMyBearingsPadSizeFromRange<
  TVariant extends MyBearingsPadSizeVariant,
>({
  range,
  buildEvaluationInput,
}: SelectBestMyBearingsPadSizeFromRangeInput<TVariant>): MyBearingsPadSizeSelectionResult<TVariant> {
  const generatedVariants = generateMyBearingsPadSizeVariantsFromRange({
    range,
  }) as TVariant[];

  return selectBestMyBearingsPadSize({
    variants: generatedVariants,
    evaluateVariant: (variant) => evaluateMyBearingsCandidate(
      buildEvaluationInput(variant),
    ),
  });
}

