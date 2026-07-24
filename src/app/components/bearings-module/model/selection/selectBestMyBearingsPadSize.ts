import type { MyBearingsCandidateEvaluation } from "../evaluation";
import type {
  MyBearingsPadSizeSelection,
  MyBearingsPadSizeSelectionResult,
  MyBearingsPadSizeVariant,
} from "./types";

type SelectBestMyBearingsPadSizeInput<TVariant extends MyBearingsPadSizeVariant> = {
  variants: TVariant[];
  evaluateVariant: (variant: TVariant) => MyBearingsCandidateEvaluation;
};

function getVariantFootprintAreaMm2(variant: MyBearingsPadSizeVariant) {
  return variant.widthMm * variant.lengthMm;
}

function compareSelections<TVariant extends MyBearingsPadSizeVariant>(
  left: MyBearingsPadSizeSelection<TVariant>,
  right: MyBearingsPadSizeSelection<TVariant>,
) {
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
}

export function selectBestMyBearingsPadSize<
  TVariant extends MyBearingsPadSizeVariant,
>({
  variants,
  evaluateVariant,
}: SelectBestMyBearingsPadSizeInput<TVariant>): MyBearingsPadSizeSelectionResult<TVariant> {
  const candidates = variants.map((variant) => {
    const evaluation = evaluateVariant(variant);
    const footprintAreaMm2 = getVariantFootprintAreaMm2(variant);

    return {
      variant,
      evaluation,
      footprintAreaMm2,
      usagePercent: evaluation.compressiveStressUsagePercent,
    };
  });

  const selected = candidates
    .filter((candidate) => candidate.evaluation.isValid)
    .sort(compareSelections)[0] ?? null;

  return {
    selected,
    candidates,
  };
}

