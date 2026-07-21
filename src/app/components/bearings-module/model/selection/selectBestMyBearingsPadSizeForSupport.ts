import { getMyBearingsEffectiveSurfaceArea } from "../getMyBearingsEffectiveSurfaceArea";
import type { MyBearingsConnectionType, MyBearingsModuleParameters } from "../types";
import type { MyBearingsCandidateEvaluationInput } from "../evaluation";
import { selectBestMyBearingsPadSizeFromParameter } from "./selectBestMyBearingsPadSizeFromParameter";
import type {
  MyBearingsPadSizeRangeSource,
  MyBearingsPadSizeSelectionResult,
  MyBearingsPadSizeVariant,
} from "./types";

type SelectBestMyBearingsPadSizeForSupportInput<
  TVariant extends MyBearingsPadSizeVariant,
> = {
  geometry: MyBearingsModuleParameters;
  connectionType?: MyBearingsConnectionType;
  parameter: MyBearingsPadSizeRangeSource;
  buildEvaluationInput: (variant: TVariant) => MyBearingsCandidateEvaluationInput;
};

export function selectBestMyBearingsPadSizeForSupport<
  TVariant extends MyBearingsPadSizeVariant,
>({
  geometry,
  connectionType,
  parameter,
  buildEvaluationInput,
}: SelectBestMyBearingsPadSizeForSupportInput<TVariant>):
  | MyBearingsPadSizeSelectionResult<TVariant>
  | null {
  const effectiveArea = getMyBearingsEffectiveSurfaceArea({
    ...geometry,
    connectionType,
  });

  return selectBestMyBearingsPadSizeFromParameter({
    parameter,
    bounds: {
      maxWidthMm: effectiveArea.effectiveWidth,
      maxLengthMm: effectiveArea.effectiveLength,
    },
    buildEvaluationInput,
  });
}
