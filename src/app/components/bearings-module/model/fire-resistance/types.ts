/** Row read from `bearing_fire_resistance` for one pad type and thickness. */
export type MyBearingsFireResistanceSource = {
  bearing_type_id: number;
  thickness_mm: number;
  min_S_dimension_mm: number;
  degradation_rate_without_cover_mm_per_min: number;
};
