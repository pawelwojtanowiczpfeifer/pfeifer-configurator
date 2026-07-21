import { getSupabaseClient } from "@/lib/supabaseClient";

interface BearingTypeParameter {
  id: number;
  bearing_type_id: number;
  min_width_mm: number | null;
  max_width_mm: number | null;
  min_length_mm: number | null;
  max_length_mm: number | null;
  max_compressive_stress_sigma_rd_MPa: number | null;
  calculation_method_code: string | null;
  dimension_step_normal_mm: number | null;
  dimension_step_optimal_mm: number | null;
}

interface BearingTypeMinDimension {
  id: number;
  bearing_type_id: number;
  thickness_mm: number;
}

interface BearingType {
  id: number;
  code: string;
  name: string;
  manufacturer: string | null;
  description: string | null;
  bearing_type_parameters: BearingTypeParameter[]; 
  bearing_type_min_dimensions: BearingTypeMinDimension[];
}

interface SupabaseResponse<T> {
  data: T[] | null;
  error: { message: string } | null;
}

export default async function BearingTypesPage() {
  const supabase = await getSupabaseClient();

  const { data: bearingTypes, error } = (await supabase
    .from("bearing_types")
    .select(
      `
      *,
      bearing_type_parameters (*),
      bearing_type_min_dimensions (*)
    `,
    )
    .order("code", { ascending: true })) as SupabaseResponse<BearingType>;

  if (error) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Bearing Types</h1>
        <p>Error fetching data: {error.message}</p>
      </main>
    );
  }

  if (!bearingTypes || bearingTypes.length === 0) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Bearing Types</h1>
        <p>No bearing types found.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Bearing Types</h1>

      <ul>
        {bearingTypes.map((type) => (
          <li key={type.id} style={{ marginBottom: 24 }}>
            <strong>{type.code}</strong> - {type.name}
            <br />
            <span>{type.manufacturer}</span>
            <br />
            <small>{type.description}</small>
            {type.bearing_type_parameters?.map((params) => (
              <div key={params.id} style={{ marginTop: 8 }}>
                <div>
                  sigmaRd max: {params.max_compressive_stress_sigma_rd_MPa} MPa
                </div>
                <div>Min width: {params.min_width_mm} mm</div>
                <div>Max width: {params.max_width_mm} mm</div>
                <div>Min length: {params.min_length_mm} mm</div>
                <div>Max length: {params.max_length_mm} mm</div>
                <div>
                  Normal dimension step: {params.dimension_step_normal_mm} mm
                </div>
                <div>
                  Optimal dimension step: {params.dimension_step_optimal_mm} mm
                </div>
                <div>Method: {params.calculation_method_code}</div>
              </div>
            ))}
            <div style={{ marginTop: 8 }}>
              Thicknesses:{" "}
              {type.bearing_type_min_dimensions &&
              type.bearing_type_min_dimensions.length > 0
                ? type.bearing_type_min_dimensions
                    .map((item) => `${item.thickness_mm} mm`)
                    .join(", ")
                : "No thicknesses"}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
