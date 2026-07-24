import { evaluateMyBearingsCandidate } from "../evaluation";
import type { MyBearingsCandidateEvaluationInput } from "../evaluation";
import type {
  MyBearingsPadSizeRange,
  MyBearingsPadSizeSelectionResult,
  MyBearingsPadSizeVariant,
} from "./types";
import type { MyBearingsCalculationMethodCode } from "../calculations";
import type { MyBearingsModuleParameters } from "../types";
import { getMyBearingsPadSizeRangeFromParameter } from "./getMyBearingsPadSizeRangeFromParameter";
import { generateMyBearingsPadSizeVariantsFromRange } from "./generateMyBearingsPadSizeVariantsFromRange";
import { resolveMyBearingsPadSizeRange } from "./resolveMyBearingsPadSizeRange";
import { getMyBearingsEffectiveSurfaceArea } from "../getMyBearingsEffectiveSurfaceArea";

type MethodSelectionInput<TVariant extends MyBearingsPadSizeVariant> = {
  methodCode: MyBearingsCalculationMethodCode;
  parameter: MyBearingsPadSizeRange;
  mapGeneratedVariant?: (variant: MyBearingsPadSizeVariant) => TVariant;
  isEligibleForSelection?: (
    variant: TVariant,
    evaluation: ReturnType<typeof evaluateMyBearingsCandidate>,
  ) => boolean;
  buildEvaluationInput: (variant: TVariant) => MyBearingsCandidateEvaluationInput;
};

type SelectBestMyBearingsPadSizeAcrossMethodsInput<
  TVariant extends MyBearingsPadSizeVariant,
> = {
  geometry: MyBearingsModuleParameters;
  connectionType?: "cantilever" | "beam-top";
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
  methods,
}: SelectBestMyBearingsPadSizeAcrossMethodsInput<TVariant>): MyBearingsPadSizeSelectionResult<TVariant> {
  const allCandidates: Array<{
    variant: TVariant;
    evaluation: ReturnType<typeof evaluateMyBearingsCandidate>;
    footprintAreaMm2: number;
    usagePercent: number;
    isEligibleForSelection: boolean;
  }> = [];

  methods.forEach(
    ({
      parameter: methodParameter,
      mapGeneratedVariant,
      isEligibleForSelection,
      buildEvaluationInput,
    }) => {
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

    const resolvedRange = range
      ? resolveMyBearingsPadSizeRange({
          range,
          bounds: {
            maxWidthMm: effectiveArea.effectiveWidth,
            maxLengthMm: effectiveArea.effectiveLength,
          },
          effectiveWidthMm: effectiveArea.effectiveWidth,
          effectiveLengthMm: effectiveArea.effectiveLength,
        })
      : null;

    if (!resolvedRange) {
      return;
    }

    const generatedVariants = generateMyBearingsPadSizeVariantsFromRange({
      range: resolvedRange,
    });
    const variants = mapGeneratedVariant
      ? generatedVariants.map(mapGeneratedVariant)
      : (generatedVariants as TVariant[]);

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
        isEligibleForSelection:
          isEligibleForSelection?.(variant, evaluation) ?? true,
      });
    });
    },
  );

  const selected = allCandidates
    .filter(
      (candidate) =>
        candidate.evaluation.isValid && candidate.isEligibleForSelection,
    )
    .sort((left, right) => {
      const leftUsageGapToTarget = Math.abs(100 - left.usagePercent);
      const rightUsageGapToTarget = Math.abs(100 - right.usagePercent);

      if (leftUsageGapToTarget !== rightUsageGapToTarget) {
        return leftUsageGapToTarget - rightUsageGapToTarget;
      }

      if (left.footprintAreaMm2 !== right.footprintAreaMm2) {
        return left.footprintAreaMm2 - right.footprintAreaMm2;
      }

      if (left.variant.widthMm !== right.variant.widthMm) {
        return left.variant.widthMm - right.variant.widthMm;
      }

      return left.variant.lengthMm - right.variant.lengthMm;
    })[0] ?? null;

  return {
    selected,
    candidates: allCandidates,
  };
}
