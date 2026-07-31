import { getSupabaseClient } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import {
  MyBearingsContactAreaResult,
  MyBearingsEffectiveSurfaceAreaResult,
  MyBearingsModuleConfigurator,
  MyBearingsModuleDrawingContent,
  MyBearingsModuleFireResistanceForm,
  MyBearingsModuleForceAndDeformationForm,
  MyBearingsModuleGeometricDataForm,
  MyBearingsPadSizeSelectionResultView,
} from "@/app/components/bearings-module";
import MyBottombar from "@/app/components/ui/MyBottombar";
import MyHStack from "@/app/components/ui/MyHStack";
import MySidebar from "@/app/components/ui/MySidebar";
import MyTopbar from "@/app/components/ui/MyTopbar";
import MyUserAvatar from "@/app/components/ui/MyUserAvatar";
import MyVStack from "@/app/components/ui/MyVStack";
import type { MyBearingsPadSizeBearingTypeSource } from "@/app/components/bearings-module/model/selection";
import type { SelectOption } from "@/app/components/ui/MySelect";

export const dynamic = "force-dynamic";

type BearingTypeRow = MyBearingsPadSizeBearingTypeSource;

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
    ])
    .eq("is_active", true);

  const bearingTypes = (data ?? []) as BearingTypeRow[];

  return bearingTypes;
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
  const bearingTypes = await getSupportedBearingTypes();
  const bearingGapOptions = getBearingGapOptions(bearingTypes);

  return (
    <MyBearingsModuleConfigurator>
      <MyHStack width="full" maxWidth="app" centered>
        <MyVStack as="main" width="full" p="sm" gap="sm" className="min-h-dvh">
          <MyTopbar p="md">
            <MyHStack gap="md" align="center" justify="between">
              <Link href="/">
                <Image
                  src="/logo/logo-pfeifer-studio-blue-large.svg"
                  alt="Logo"
                  width={240}
                  height={80}
                  className="object-contain"
                />
              </Link>

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
            flex={1}
            minHeight="0"
            width="full"
            p="none"
          >
            <MySidebar title="Geometric" size="lg" height="full">
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
              <MySidebar title="Drawing" size="full" height="full" flex={1}>
                <MyBearingsModuleDrawingContent />
              </MySidebar>
            </MyVStack>
            <MySidebar title="Results" size="lg" height="full">
              <MyBearingsContactAreaResult />
              <MyBearingsEffectiveSurfaceAreaResult />
              {bearingTypes && bearingTypes.length > 0 ? (
                <MyBearingsPadSizeSelectionResultView
                  bearingTypes={bearingTypes}
                />
              ) : (
                <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
                  No supported parameters found in Supabase.
                </div>
              )}
            </MySidebar>
          </MyHStack>

          <MyBottombar>Created by: iPW</MyBottombar>
        </MyVStack>
      </MyHStack>
    </MyBearingsModuleConfigurator>
  );
}
