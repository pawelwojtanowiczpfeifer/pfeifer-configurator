import { getSupabaseClient } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import {
  MyBearingsContactAreaResult,
  MyBearingsCalculationActions,
  MyBearingsEffectiveSurfaceAreaResult,
  MyBearingsModuleConfigurator,
  MyBearingsModuleDrawingContent,
  MyBearingsModuleFireResistanceForm,
  MyBearingsModuleForceAndDeformationForm,
  MyBearingsModuleGeometricDataForm,
  MyBearingsPadSizeSelectionResultView,
  MyBearingsTechnicalVerification,
} from "@/app/components/bearings-module";
import MyBottombar from "@/app/components/ui/MyBottombar";
import MyHStack from "@/app/components/ui/MyHStack";
import MySidebar from "@/app/components/ui/MySidebar";
import MyTopbar from "@/app/components/ui/MyTopbar";
import MyUserAvatar from "@/app/components/ui/MyUserAvatar";
import MyVStack from "@/app/components/ui/MyVStack";
import type { MyBearingsPadSizeBearingTypeSource } from "@/app/components/bearings-module/model/selection";
import type { MyBearingsStudOpeningDiameter } from "@/app/components/bearings-module/model/types";
import type { MyBearingsFireResistanceSource } from "@/app/components/bearings-module/model/fire-resistance/types";
import type { SelectOption } from "@/app/components/ui/MySelect";

export const dynamic = "force-dynamic";

type BearingTypeRow = MyBearingsPadSizeBearingTypeSource;
type BearingOpeningDiameterRow = {
  stud_diameter_mm: number;
  opening_diameter_mm: number;
};

type BearingFireResistanceRow = MyBearingsFireResistanceSource;

async function getSupportedBearingTypes() {
  const supabase = await getSupabaseClient();

  const { data } = await supabase
    .from("bearing_types")
    .select(
      `
      id,
      code,
      name,
      manufacturer,
      description,
      bearing_type_parameters (*),
      bearing_type_min_dimensions (*)
    `,
    )
    .in("code", [
      "S 65",
      "S 70",
      "Compression",
      "CR 2000",
      "Q",
      "Type Z",
      "Perforated 205",
    ])
    .eq("is_active", true);

  const bearingTypes = (data ?? []) as BearingTypeRow[];

  return bearingTypes;
}

async function getStudOpeningDiameters(): Promise<
  MyBearingsStudOpeningDiameter[]
> {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase
    .from("bearing_opening_diameters")
    .select("stud_diameter_mm, opening_diameter_mm");

  if (error) {
    throw error;
  }

  return ((data ?? []) as BearingOpeningDiameterRow[]).map((row) => ({
    studDiameterMm: row.stud_diameter_mm,
    openingDiameterMm: row.opening_diameter_mm,
  }));
}

async function getBearingFireResistance(): Promise<
  MyBearingsFireResistanceSource[]
> {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase
    .from("bearing_fire_resistance")
    .select(
      "bearing_type_id, thickness_mm, min_S_dimension_mm, degradation_rate_without_cover_mm_per_min",
    );

  if (error) {
    throw error;
  }

  return (data ?? []) as BearingFireResistanceRow[];
}

function getBearingGapOptions(
  bearingTypes: MyBearingsPadSizeBearingTypeSource[],
): SelectOption<number>[] {
  const thicknessesByGap = new Map<number, Set<number>>();

  bearingTypes.forEach((bearingType) => {
    bearingType.bearing_type_min_dimensions.forEach((dimension) => {
      if (!dimension.is_active || dimension.bearing_gap_mm == null) {
        return;
      }

      const thicknesses = thicknessesByGap.get(dimension.bearing_gap_mm) ??
        new Set<number>();
      thicknesses.add(dimension.thickness_mm);
      thicknessesByGap.set(dimension.bearing_gap_mm, thicknesses);
    });
  });

  return [...thicknessesByGap.entries()]
    .sort(([leftGapMm], [rightGapMm]) => leftGapMm - rightGapMm)
    .map(([bearingGapMm, thicknesses]) => {
      const thicknessLabel = [...thicknesses].sort((left, right) => left - right).join("/");

      return {
        value: bearingGapMm,
        label: `${bearingGapMm} mm`,
        secondaryLabel: `(t = ${thicknessLabel} mm)`,
        tooltip: `Available bearing thicknesses: ${thicknessLabel} mm`,
      };
    });
}

export default async function CalcPage() {
  const [bearingTypes, openingDiameters, bearingFireResistance] =
    await Promise.all([
    getSupportedBearingTypes(),
    getStudOpeningDiameters(),
    getBearingFireResistance(),
  ]);
  const bearingGapOptions = getBearingGapOptions(bearingTypes);

  return (
    <MyBearingsModuleConfigurator>
      <MyHStack width="full" maxWidth="app" centered>
        <MyVStack as="main" width="full" p="sm" gap="sm" className="min-h-dvh">
          <MyTopbar p="md">
            <MyHStack
              gap="md"
              align="center"
              justify="between"
              className="relative"
            >
              <Link href="/">
                <Image
                  src="/logo/logo-pfeifer-studio-blue-large.svg"
                  alt="Logo"
                  width={240}
                  height={80}
                  className="object-contain"
                />
              </Link>

              <div className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 whitespace-nowrap sm:flex">
                <span
                  className="text-xl font-normal tracking-[0.1em] text-[#163554]"
                  style={{ fontFamily: "var(--font-michroma)" }}
                >
                  Elastomeric Bearing Calculator
                </span>
                <span className="rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-amber-800">
                  Test version
                </span>
              </div>

              <MyHStack gap="md" align="center">
                <MyUserAvatar
                  name="Pawel"
                  size="md"
                  backgroundColor="partnerschaft"
                />
              </MyHStack>
            </MyHStack>
          </MyTopbar>
          <MyHStack
            gap="sm"
            align="stretch"
            justify="start"
            width="full"
            p="none"
          >
            <MySidebar title="Geometric" size="lg">
              <MyBearingsModuleGeometricDataForm
                bearingGapOptions={bearingGapOptions}
              />
            </MySidebar>
            <MyVStack flex={1} minHeight="0" gap="sm">
              <MyHStack gap="sm" align="stretch" width="full">
                <MySidebar title="Force and Deformation" size="full" flex={4}>
                  <MyBearingsModuleForceAndDeformationForm />
                </MySidebar>
                <MySidebar title="Fire resistance" size="full" flex={1}>
                  <MyBearingsModuleFireResistanceForm />
                </MySidebar>
              </MyHStack>
              <MySidebar title="Drawing" size="full">
                <MyBearingsModuleDrawingContent />
              </MySidebar>
            </MyVStack>
            <MyVStack minHeight="0" gap="sm" className="w-96 shrink-0">
              <MySidebar size="full" className="min-h-[134px]">
                <MyBearingsCalculationActions />
              </MySidebar>
              <MySidebar title="Results" size="full">
                {bearingTypes && bearingTypes.length > 0 ? (
                  <MyBearingsPadSizeSelectionResultView
                    bearingTypes={bearingTypes}
                    openingDiameters={openingDiameters}
                    bearingFireResistance={bearingFireResistance}
                    view="summary"
                  />
                ) : (
                  <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
                    No supported parameters found in Supabase.
                  </div>
                )}
              </MySidebar>
            </MyVStack>
          </MyHStack>

          {bearingTypes && bearingTypes.length > 0 ? (
            <MySidebar size="full">
              <MyBearingsTechnicalVerification>
                  <MyBearingsPadSizeSelectionResultView
                    bearingTypes={bearingTypes}
                    openingDiameters={openingDiameters}
                    bearingFireResistance={bearingFireResistance}
                    view="debug"
                    debugContent={
                      <>
                        <MyBearingsContactAreaResult />
                        <MyBearingsEffectiveSurfaceAreaResult />
                      </>
                    }
                  />
              </MyBearingsTechnicalVerification>
            </MySidebar>
          ) : null}

          <MyBottombar>
            developed by: Pawel Wojtanowicz R&amp;D PFEIFER Polska
          </MyBottombar>
        </MyVStack>
      </MyHStack>
    </MyBearingsModuleConfigurator>
  );
}
