import type { MyBearingsCandidateEvaluation } from "../evaluation";

export type MyBearingsPadSizeVariant = {
  code: string;
  widthMm: number;
  lengthMm: number;
  label?: string;
};

export type MyBearingsPadSizeRange = {
  minWidthMm: number;
  maxWidthMm: number;
  minLengthMm: number;
  maxLengthMm: number;
  widthStepMm?: number;
  lengthStepMm?: number;
};

export type MyBearingsPadSizeBounds = {
  maxWidthMm: number;
  maxLengthMm: number;
};

export type MyBearingsPadSizeRangeSource = {
  min_width_mm: number | null;
  max_width_mm: number | null;
  min_length_mm: number | null;
  max_length_mm: number | null;
  dimension_step_normal_mm: number | null;
};

export type MyBearingsPadSizeTypeParameterSource = {
  id: number;
  bearing_type_id: number;
  max_width_mm: number | null;
  max_length_mm: number | null;
  max_compressive_stress_sigma_rd_MPa: number | null;
  calculation_method_code: string | null;
  dimension_step_normal_mm: number | null;
  dimension_step_optimal_mm: number | null;
  step_mm?: number | null;
};

export type MyBearingsPadSizeMinDimensionSource = {
  id: number;
  bearing_type_id: number;
  thickness_mm: number;
  min_width_mm: number;
  min_length_mm: number;
  min_dimension_factor: number | null;
  is_active: boolean;
};

export type MyBearingsPadSizeBearingTypeSource = {
  id: number;
  code: string;
  name: string;
  manufacturer: string | null;
  description: string | null;
  bearing_type_parameters: MyBearingsPadSizeTypeParameterSource[];
  bearing_type_min_dimensions: MyBearingsPadSizeMinDimensionSource[];
};

export type MyBearingsPadSizeSelection<TVariant extends MyBearingsPadSizeVariant> = {
  variant: TVariant;
  evaluation: MyBearingsCandidateEvaluation;
  footprintAreaMm2: number;
  usagePercent: number;
};

export type MyBearingsPadSizeSelectionResult<
  TVariant extends MyBearingsPadSizeVariant,
> = {
  selected: MyBearingsPadSizeSelection<TVariant> | null;
  candidates: Array<MyBearingsPadSizeSelection<TVariant>>;
};
