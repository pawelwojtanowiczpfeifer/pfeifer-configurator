import type {
  MyBearingsPadSizeRange,
  MyBearingsPadSizeRangeSource,
} from "./types";

type GetMyBearingsPadSizeRangeFromParameterInput = {
  parameter: MyBearingsPadSizeRangeSource;
};

function isFiniteNumber(value: number | null | undefined): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

export function getMyBearingsPadSizeRangeFromParameter({
  parameter,
}: GetMyBearingsPadSizeRangeFromParameterInput): MyBearingsPadSizeRange | null {
  if (
    !isFiniteNumber(parameter.min_width_mm) ||
    !isFiniteNumber(parameter.max_width_mm) ||
    !isFiniteNumber(parameter.min_length_mm) ||
    !isFiniteNumber(parameter.max_length_mm)
  ) {
    return null;
  }

  if (
    parameter.min_width_mm > parameter.max_width_mm ||
    parameter.min_length_mm > parameter.max_length_mm
  ) {
    return null;
  }

  const stepMm = isFiniteNumber(parameter.step_mm)
    ? parameter.step_mm
    : isFiniteNumber(parameter.dimension_step_optimal_mm)
    ? parameter.dimension_step_optimal_mm
    : isFiniteNumber(parameter.dimension_step_normal_mm)
    ? parameter.dimension_step_normal_mm
    : undefined;

  return {
    minWidthMm: parameter.min_width_mm,
    maxWidthMm: parameter.max_width_mm,
    minLengthMm: parameter.min_length_mm,
    maxLengthMm: parameter.max_length_mm,
    widthStepMm: stepMm,
    lengthStepMm: stepMm,
  };
}
