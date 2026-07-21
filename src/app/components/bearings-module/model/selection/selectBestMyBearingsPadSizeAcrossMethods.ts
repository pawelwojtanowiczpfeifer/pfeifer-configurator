import { evaluateMyBearingsCandidate } from "../evaluation";
import type { MyBearingsCandidateEvaluationInput } from "../evaluation";
import { selectBestMyBearingsPadSize } from "./selectBestMyBearingsPadSize";
import type {
  MyBearingsPadSizeRange,
  MyBearingsPadSizeSelectionResult,
  MyBearingsPadSizeVariant,
} from "./types";
import type { MyBearingsCalculationMethodCode } from "../calculations";
import type { MyBearingsModuleParameters } from "../types";
import { getMyBearingsPadSizeRangeFromParameter } from "./getMyBearingsPadSizeRangeFromParameter";
import { constrainMyBearingsPadSizeRangeToBounds } from "./constrainMyBearingsPadSizeRangeToBounds";
import { generateMyBearingsPadSizeVariantsFromRange } from "./generateMyBearingsPadSizeVariantsFromRange";
import { getMyBearingsEffectiveSurfaceArea } from "../getMyBearingsEffectiveSurfaceArea";

type MethodSelectionInput<TVariant extends MyBearingsPadSizeVariant> = {
  methodCode: MyBearingsCalculationMethodCode;
  parameter: MyBearingsPadSizeRange;
  buildEvaluationInput: (variant: TVariant) => MyBearingsCandidateEvaluationInput;
};

type SelectBestMyBearingsPadSizeAcrossMethodsInput<
  TVariant extends MyBearingsPadSizeVariant,
> = {
  geometry: MyBearingsModuleParameters;
  connectionType?: "cantilever" | "beam-top";
  parameter: MyBearingsPadSizeRange;
  methods: MethodSelectionInput<TVariant>[];
};

function getVariantFootprintAreaMm2(variant: MyBearingsPadSizeVariant) {
  return variant.widthMm * variant.lengthMm;
}

export function selectBestMyBearingsPadSizeAcrossMethods<
  TVariant extends MyBearingsPadSizeVariant,
>({
  geometry,
  connectionType,
  parameter,
  methods,
}: SelectBestMyBearingsPadSizeAcrossMethodsInput<TVariant>): MyBearingsPadSizeSelectionResult<TVariant> {
  const allCandidates: Array<{
    variant: TVariant;
    evaluation: ReturnType<typeof evaluateMyBearingsCandidate>;
    footprintAreaMm2: number;
    usagePercent: number;
  }> = [];

  methods.forEach(({ methodCode, parameter: methodParameter, buildEvaluationInput }) => {
    const range = getMyBearingsPadSizeRangeFromParameter({
      parameter: {
        min_width_mm: methodParameter.minWidthMm,
        max_width_mm: methodParameter.maxWidthMm,
        min_length_mm: methodParameter.minLengthMm,
        max_length_mm: methodParameter.maxLengthMm,
        dimension_step_normal_mm: methodParameter.widthStepMm,
      },
    });

    const effectiveArea = getMyBearingsEffectiveSurfaceArea({
      ...geometry,
      connectionType,
    });

    const constrainedRange = range
      ? constrainMyBearingsPadSizeRangeToBounds({
          range,
          bounds: {
            maxWidthMm: effectiveArea.effectiveWidth,
            maxLengthMm: effectiveArea.effectiveLength,
          },
        })
      : null;

    if (!constrainedRange) {
      return;
    }

    const variants = generateMyBearingsPadSizeVariantsFromRange({
      range: constrainedRange,
    }) as TVariant[];

    variants.forEach((variant) => {
      const evaluation = evaluateMyBearingsCandidate(
        buildEvaluationInput(variant),
      );
      const footprintAreaMm2 = getVariantFootprintAreaMm2(variant);

      allCandidates.push({
        variant,
        evaluation,
        footprintAreaMm2,
        usagePercent: evaluation.compressiveStressUsagePercent,
      });
    });
  });

  const selected = allCandidates
    .filter((candidate) => candidate.evaluation.isValid)
    .sort((left, right) => {
      if (left.usagePercent !== right.usagePercent) {
        return right.usagePercent - left.usagePercent;
      }

      if (left.footprintAreaMm2 !== right.footprintAreaMm2) {
        return left.footprintAreaMm2 - right.footprintAreaMm2;
      }

      return left.variant.widthMm - right.variant.widthMm;
    })[0] ?? null;

  return {
    selected,
    candidates: allCandidates,
  };
}
