"use client";

import MyLabel from "@/app/components/ui/MyLabel";
import MySummaryRow from "@/app/components/ui/MySummaryRow";
import { useMyBearingsModuleConfigurator } from "../MyBearingsModuleConfigurator";
import { selectBestMyBearingsPadSizeAcrossMethods } from "../model/selection";
import type {
  MyBearingsPadSizeBearingTypeSource,
  MyBearingsPadSizeRange,
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
    value === "q" ||
    value === "compression"
  );
}

function buildCandidateEvaluationInput(
  methodCode: MyBearingsCalculationMethodCode,
  geometry: MyBearingsCandidateEvaluationInput["context"]["geometry"],
  forceAndDeformation: MyBearingsCandidateEvaluationInput["context"]["forceAndDeformation"],
  hasStuds: boolean,
  variant: MyBearingsPadSizeVariant,
  padThicknessMm: number,
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
      tc: padThicknessMm,
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
      contactAreaM2: padArea.netAreaM2,
    };

  const effectiveArea: MyBearingsCandidateEvaluationInput["context"]["effectiveArea"] =
    {
      effectiveLength: variant.lengthMm,
      effectiveWidth: variant.widthMm,
      effectiveAreaMm2: padArea.netAreaMm2,
      effectiveAreaM2: padArea.netAreaM2,
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

export default function MyBearingsPadSizeSelectionResult({
  bearingTypes,
}: MyBearingsPadSizeSelectionResultProps) {
  const { geometry, connectionType, forceAndDeformation, hasStuds } =
    useMyBearingsModuleConfigurator();

  if (!bearingTypes || bearingTypes.length === 0) {
    return (
      <div className="space-y-3">
        <MyLabel size="small">Bearing size selection</MyLabel>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
          No supported calculation method found for these bearing types.
        </div>
      </div>
    );
  }

  type MethodSelection = {
    methodCode: MyBearingsCalculationMethodCode;
    parameter: MyBearingsPadSizeRange;
    mapGeneratedVariant: (
      variant: MyBearingsPadSizeVariant,
    ) => MyBearingsPadSizeVariant;
    isEligibleForSelection: (
      variant: MyBearingsPadSizeVariant,
    ) => boolean;
    buildEvaluationInput: (
      variant: MyBearingsPadSizeVariant,
    ) => MyBearingsCandidateEvaluationInput;
  };

  const methods = bearingTypes.flatMap((bearingType): MethodSelection[] => {
    return bearingType.bearing_type_min_dimensions
      .filter((minDimension) => minDimension.is_active)
      .flatMap((minDimension): MethodSelection[] =>
        bearingType.bearing_type_parameters.flatMap(
          (parameterItem): MethodSelection[] => {
        const methodCode = parameterItem.calculation_method_code;

        if (!isSupportedMethodCode(methodCode)) {
          return [];
        }

        // require max widths/lengths
        if (
          parameterItem.max_width_mm == null ||
          parameterItem.max_length_mm == null
        ) {
          return [];
        }

        const stepMm =
          parameterItem.step_mm ??
          parameterItem.dimension_step_optimal_mm ??
          parameterItem.dimension_step_normal_mm ??
          undefined;

        return [
          {
            methodCode,
            parameter: {
              minWidthMm:
                parameterItem.min_width_mm ?? minDimension.min_width_mm,
              maxWidthMm: parameterItem.max_width_mm,
              minLengthMm:
                parameterItem.min_length_mm ?? minDimension.min_length_mm,
              maxLengthMm: parameterItem.max_length_mm,
              widthStepMm: stepMm,
              lengthStepMm: stepMm,
            },
            mapGeneratedVariant: (variant) => ({
              ...variant,
              padThicknessMm: minDimension.thickness_mm,
              bearingGapMm: minDimension.bearing_gap_mm,
              bearingTypeCode: bearingType.code,
              bearingTypeName: bearingType.name,
            }),
            isEligibleForSelection: (variant) =>
              variant.bearingGapMm === geometry.tc,
            buildEvaluationInput: (variant: MyBearingsPadSizeVariant) =>
              buildCandidateEvaluationInput(
                methodCode,
                geometry,
                forceAndDeformation,
                hasStuds,
                variant,
                minDimension.thickness_mm,
              ),
          },
        ];
          },
        ),
      );
  });

  const supportedParameters = bearingTypes.flatMap(
    (bt) => bt.bearing_type_parameters || [],
  );

  const selection = selectBestMyBearingsPadSizeAcrossMethods({
    geometry,
    connectionType,
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
  const candidatesForSelectedGap = selection.candidates.filter(
    (candidate) => candidate.isEligibleForSelection,
  );

  return (
    <div className="space-y-3">
      <MyLabel size="small">Bearing size selection</MyLabel>
      <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3">
        {selection?.selected ? (
          <>
            <MySummaryRow
              label="Selected type"
              value={
                selection.selected.variant.bearingTypeName ??
                selection.selected.variant.bearingTypeCode ??
                selection.selected.evaluation.methodCode
              }
            />
            <MySummaryRow
              label="Selected size (a x b)"
              value={`${selection.selected.variant.widthMm} x ${selection.selected.variant.lengthMm} mm`}
            />
            <MySummaryRow
              label="Bearing thickness"
              value={`${selection.selected.variant.padThicknessMm ?? "n/a"} mm`}
            />
            <MySummaryRow
              label="Usage"
              value={formatPercent(selection.selected.usagePercent)}
            />
            <MySummaryRow
              label="Candidates"
              value={candidatesForSelectedGap.length}
              className="border-b-0"
            />
          </>
        ) : (
          <div className="text-sm text-zinc-600">
            No bearing size fits inside the effective support area.
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
          <MySummaryRow label="Bearing gap" value={`${geometry.tc} mm`} />
          <MySummaryRow label="Methods" value={supportedParameters.length} />
          <MySummaryRow
            label="Candidates"
            value={candidatesForSelectedGap.length}
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
                value={
                  "shapeCoefficient" in selection.selected.evaluation.calculation
                    ? formatNumber(
                        selection.selected.evaluation.calculation.shapeCoefficient,
                      )
                    : "n/a"
                }
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
                label="Bearing width a"
                value={`${selection.selected.variant.widthMm} mm`}
              />
              <MySummaryRow
                label="Bearing length b"
                value={`${selection.selected.variant.lengthMm} mm`}
              />
              <MySummaryRow
                label="Bearing thickness t"
                value={`${selection.selected.variant.padThicknessMm ?? "n/a"} mm`}
              />
              <MySummaryRow
                label="Bearing gross area"
                value={`${formatNumber(
                  selectedPadArea?.grossAreaMm2 ?? 0,
                )} mm2`}
                className="border-b-0"
              />
              <MySummaryRow
                label="Hole area"
                value={`${formatNumber(selectedPadArea?.holeAreaMm2 ?? 0)} mm2`}
              />
              <MySummaryRow
                label="Bearing net area"
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
