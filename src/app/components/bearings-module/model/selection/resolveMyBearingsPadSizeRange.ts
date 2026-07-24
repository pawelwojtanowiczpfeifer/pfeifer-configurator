import type { MyBearingsPadSizeBounds, MyBearingsPadSizeRange } from "./types";

type ResolveMyBearingsPadSizeRangeInput = {
  range: MyBearingsPadSizeRange;
  bounds: MyBearingsPadSizeBounds;
  effectiveWidthMm?: number;
  effectiveLengthMm?: number;
};

type DimensionRule = {
  minRatio: number;
  rounding: "ceil" | "floor";
};

const dimensionRules: Record<"width" | "length", DimensionRule> = {
  width: {
    minRatio: 0.5,
    rounding: "ceil",
  },
  length: {
    minRatio: 1,
    rounding: "floor",
  },
};

function roundToStep(value: number, step: number, rounding: "ceil" | "floor") {
  return rounding === "ceil"
    ? Math.ceil(value / step) * step
    : Math.floor(value / step) * step;
}

function getEffectiveMinimum(
  effectiveDimensionMm: number | undefined,
  initialMinimumMm: number,
  stepMm: number,
  dimension: "width" | "length",
) {
  if (effectiveDimensionMm == null) {
    return initialMinimumMm;
  }

  const rule = dimensionRules[dimension];
  const minimumByRule = roundToStep(
    effectiveDimensionMm * rule.minRatio,
    stepMm,
    rule.rounding,
  );

  return Math.max(initialMinimumMm, minimumByRule);
}

export function resolveMyBearingsPadSizeRange({
  range,
  bounds,
  effectiveWidthMm,
  effectiveLengthMm,
}: ResolveMyBearingsPadSizeRangeInput): MyBearingsPadSizeRange | null {
  const widthStepMm = range.widthStepMm ?? 25;
  const lengthStepMm = range.lengthStepMm ?? 25;

  const minWidthMm = getEffectiveMinimum(
    effectiveWidthMm,
    range.minWidthMm,
    widthStepMm,
    "width",
  );

  const minLengthMm = getEffectiveMinimum(
    effectiveLengthMm,
    range.minLengthMm,
    lengthStepMm,
    "length",
  );

  const maxWidthMm = Math.min(range.maxWidthMm, bounds.maxWidthMm);
  const maxLengthMm = Math.min(range.maxLengthMm, bounds.maxLengthMm);

  if (minWidthMm > maxWidthMm || minLengthMm > maxLengthMm) {
    return null;
  }

  return {
    ...range,
    minWidthMm,
    minLengthMm,
    maxWidthMm,
    maxLengthMm,
    widthStepMm,
    lengthStepMm,
  };
}
