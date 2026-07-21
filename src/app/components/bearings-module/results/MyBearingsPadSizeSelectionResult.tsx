"use client";

import MyLabel from "@/app/components/ui/MyLabel";
import MySummaryRow from "@/app/components/ui/MySummaryRow";
import { useMyBearingsModuleConfigurator } from "../MyBearingsModuleConfigurator";
import { selectBestMyBearingsPadSizeAcrossMethods } from "../model/selection";
import type {
  MyBearingsPadSizeBearingTypeSource,
  MyBearingsPadSizeMinDimensionSource,
  MyBearingsPadSizeRangeSource,
  MyBearingsPadSizeVariant,
} from "../model/selection";
import type { MyBearingsCalculationMethodCode } from "../model/calculations";
import type { MyBearingsCandidateEvaluationInput } from "../model/evaluation";
import type { MyBearingsCalculationContext } from "../model/calculations";
import { getMyBearingsPadArea } from "../model/calculations";

type MyBearingsPadSizeSelectionResultProps = {
  bearingTypes: MyBearingsPadSizeBearingTypeSource[];
};

function formatPercent(value: number) {
  return `${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
  }).format(value)}%`;
}

function formatRange(minValue: number, maxValue: number) {
  return `${minValue} - ${maxValue}`;
}

function formatKn(value: number) {
  return `${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value)} kN`;
}

function formatStress(value: number) {
  return `${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value)} N/mm2`;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 3,
  }).format(value);
}

function isSupportedMethodCode(
  value: string | null,
): value is MyBearingsCalculationMethodCode {
  return (
    value === "s65" ||
    value === "s70" ||
    value === "cr2000" ||
    value === "typeZ" ||
    value === "q"
  );
}

function buildCandidateEvaluationInput(
  methodCode: MyBearingsCalculationMethodCode,
  geometry: MyBearingsCandidateEvaluationInput["context"]["geometry"],
  forceAndDeformation: MyBearingsCandidateEvaluationInput["context"]["forceAndDeformation"],
  hasStuds: boolean,
  variant: MyBearingsPadSizeVariant,
): MyBearingsCandidateEvaluationInput {
  const padArea = getMyBearingsPadArea({
    widthMm: variant.widthMm,
    lengthMm: variant.lengthMm,
    hasStuds,
    studDiameterMm: geometry.ds,
    numberOfStuds: geometry.n,
  });

  const candidateGeometry: MyBearingsCandidateEvaluationInput["context"]["geometry"] =
    {
      ...geometry,
      a1: variant.widthMm,
      a2: variant.widthMm,
      b1: variant.lengthMm,
      b2: variant.lengthMm,
      b3: variant.lengthMm,
    };

  const contactArea: MyBearingsCandidateEvaluationInput["context"]["contactArea"] =
    {
      contactLength: variant.lengthMm,
      contactWidth: variant.widthMm,
      contactAreaMm2: padArea.netAreaMm2,
      contactAreaM2: padArea.netAreaM2 / 1_000_000,
    };

  const effectiveArea: MyBearingsCandidateEvaluationInput["context"]["effectiveArea"] =
    {
      effectiveLength: variant.lengthMm,
      effectiveWidth: variant.widthMm,
      effectiveAreaMm2: padArea.netAreaMm2,
      effectiveAreaM2: padArea.netAreaM2 / 1_000_000,
    };

  const context: MyBearingsCalculationContext = {
    geometry: candidateGeometry,
    forceAndDeformation,
    contactArea,
    effectiveArea,
    hasStuds,
  };

  return {
    methodCode,
    context,
    loadInput: {
      designVerticalForceKN: forceAndDeformation.designVerticalForce,
      bearingRotationPermille: forceAndDeformation.bearingRotation,
      horizontalDeformationMm: forceAndDeformation.horizontalDeformation,
    },
  };
}

function getMinDimensionForThickness(
  minDimensions: MyBearingsPadSizeMinDimensionSource[],
  thicknessMm: number,
) {
  const activeDimensions = minDimensions
    .filter((item) => item.is_active)
    .sort((left, right) => left.thickness_mm - right.thickness_mm);

  return (
    activeDimensions.find((item) => item.thickness_mm >= thicknessMm) ??
    activeDimensions[activeDimensions.length - 1] ??
    null
  );
}

export default function MyBearingsPadSizeSelectionResult({
  bearingTypes,
}: MyBearingsPadSizeSelectionResultProps) {
  const { geometry, connectionType, forceAndDeformation, hasStuds } =
    useMyBearingsModuleConfigurator();

  if (!bearingTypes || bearingTypes.length === 0) {
    return (
      <div className="space-y-3">
        <MyLabel size="small">Pad size selection</MyLabel>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
          No supported calculation method found for these bearing types.
        </div>
      </div>
    );
  }

  const methods = bearingTypes.flatMap((bearingType) => {
    const minDimension = getMinDimensionForThickness(
      bearingType.bearing_type_min_dimensions,
      geometry.tc,
    );

    if (!minDimension) {
      return [];
    }

    return bearingType.bearing_type_parameters
      .filter((p) => isSupportedMethodCode(p.calculation_method_code))
      .map((parameterItem) => {
        const methodCode = parameterItem.calculation_method_code as any;

        // require max widths/lengths
        if (
          parameterItem.max_width_mm == null ||
          parameterItem.max_length_mm == null
        ) {
          return null;
        }

        const stepMm =
          parameterItem.step_mm ??
          parameterItem.dimension_step_optimal_mm ??
          parameterItem.dimension_step_normal_mm ??
          undefined;

        return {
          methodCode,
          parameter: {
            minWidthMm: parameterItem.min_width_mm ?? minDimension.min_width_mm,
            maxWidthMm: parameterItem.max_width_mm,
            minLengthMm:
              parameterItem.min_length_mm ?? minDimension.min_length_mm,
            maxLengthMm: parameterItem.max_length_mm,
            widthStepMm: stepMm,
            lengthStepMm: stepMm,
          },
          buildEvaluationInput: (variant: MyBearingsPadSizeVariant) =>
            buildCandidateEvaluationInput(
              methodCode,
              geometry,
              forceAndDeformation,
              hasStuds,
              variant,
            ),
        } as any;
      })
      .filter(Boolean) as any[];
  });

  const supportedParameters = bearingTypes.flatMap(
    (bt) => bt.bearing_type_parameters || [],
  );

  const minDimension = (() => {
    for (const bt of bearingTypes) {
      const md = getMinDimensionForThickness(
        bt.bearing_type_min_dimensions,
        geometry.tc,
      );
      if (md) return md;
    }

    return null;
  })();

  const selection = selectBestMyBearingsPadSizeAcrossMethods({
    geometry,
    connectionType,
    parameter: {
      minWidthMm: 0,
      maxWidthMm: geometry.a1,
      minLengthMm: 0,
      maxLengthMm: geometry.b1,
    },
    methods,
  });

  const selectedPadArea = selection?.selected
    ? getMyBearingsPadArea({
        widthMm: selection.selected.variant.widthMm,
        lengthMm: selection.selected.variant.lengthMm,
        hasStuds,
        studDiameterMm: geometry.ds,
        numberOfStuds: geometry.n,
      })
    : null;

  return (
    <div className="space-y-3">
      <MyLabel size="small">Pad size selection</MyLabel>
      <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3">
        {selection?.selected ? (
          <>
            <MySummaryRow
              label="Selected size"
              value={
                selection.selected.variant.label ??
                selection.selected.variant.code
              }
            />
            <MySummaryRow
              label="Usage"
              value={formatPercent(selection.selected.usagePercent)}
            />
            <MySummaryRow
              label="Candidates"
              value={selection.candidates.length}
              className="border-b-0"
            />
          </>
        ) : (
          <div className="text-sm text-zinc-600">
            No pad size fits inside the effective support area.
          </div>
        )}
      </div>
      <div className="rounded-lg border border-dashed border-zinc-300 bg-white px-4 py-3">
        <MyLabel size="small">Debug</MyLabel>
        <div className="mt-2">
          <MySummaryRow
            label="Method"
            value={selection?.selected?.evaluation.methodCode ?? "none"}
          />
          <MySummaryRow label="Studs" value={hasStuds ? "on" : "off"} />
          <MySummaryRow label="tc" value={`${geometry.tc} mm`} />
          <MySummaryRow
            label="Min dim"
            value={`${minDimension.min_width_mm} x ${minDimension.min_length_mm} mm`}
          />
          <MySummaryRow label="Methods" value={supportedParameters.length} />
          <MySummaryRow
            label="Candidates"
            value={selection ? selection.candidates.length : 0}
          />
          <MySummaryRow
            label="Selected"
            value={selection?.selected?.variant.code ?? "none"}
            className="border-b-0"
          />
          {selection?.selected ? (
            <>
              <MySummaryRow
                label="FEd"
                value={formatKn(
                  selection.selected.evaluation.loadInput.designVerticalForceKN,
                )}
              />
              <MySummaryRow
                label="S"
                value={formatNumber(
                  selection.selected.evaluation.calculation.shapeCoefficient,
                )}
              />
              <MySummaryRow
                label="sigma raw"
                value={formatStress(
                  selection.selected.evaluation.calculation
                    .rawCompressiveStressMPa,
                )}
              />
              <MySummaryRow
                label="sigmaEd"
                value={formatStress(
                  selection.selected.evaluation.designCompressiveStressKNPerMm2,
                )}
              />
              <MySummaryRow
                label="sigmaRd"
                value={formatStress(
                  selection.selected.evaluation.calculation
                    .compressiveStressLimitMPa,
                )}
              />
              <MySummaryRow
                label="Strength check"
                value={
                  selection.selected.evaluation.checks.find(
                    (check) => check.name === "strength",
                  )?.status ?? "skipped"
                }
              />
              <MySummaryRow
                label="FRd"
                value={formatKn(
                  (selection.selected.evaluation.calculation
                    .compressiveStressLimitMPa *
                    (selectedPadArea?.netAreaMm2 ?? 0)) /
                    1000,
                )}
                className="border-b-0"
              />
              <MySummaryRow
                label="Pad gross area"
                value={`${formatNumber(
                  selectedPadArea?.grossAreaMm2 ?? 0,
                )} mm2`}
              />
              <MySummaryRow
                label="Hole area"
                value={`${formatNumber(selectedPadArea?.holeAreaMm2 ?? 0)} mm2`}
              />
              <MySummaryRow
                label="Pad net area"
                value={`${formatNumber(selectedPadArea?.netAreaMm2 ?? 0)} mm2`}
                className="border-b-0"
              />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
