"use client";

import { useEffect } from "react";

import MyLabel from "@/app/components/ui/MyLabel";
import MySummaryRow from "@/app/components/ui/MySummaryRow";
import {
  useMyBearingsModuleConfigurator,
  type MyBearingsSelectedPadDrawing,
} from "../MyBearingsModuleConfigurator";
import { selectBestMyBearingsPadSizeAcrossMethods } from "../model/selection";
import type {
  MyBearingsPadSizeBearingTypeSource,
  MyBearingsPadSizeRange,
  MyBearingsPadSizeVariant,
} from "../model/selection";
import type { MyBearingsCalculationMethodCode } from "../model/calculations";
import type { MyBearingsCandidateEvaluationInput } from "../model/evaluation";
import type { MyBearingsCalculationContext } from "../model/calculations";
import { getMyBearingsPadArea, getStudHoleDiameter } from "../model/calculations";
import { getMyBearingsContactArea } from "../model/getMyBearingsContactArea";
import type { MyBearingsStudOpeningDiameter } from "../model/types";
import {
  getMyBearingsFireDurationMinutes,
} from "../model/fire-resistance/getMyBearingsFireDurationMinutes";
import { getMyBearingsFireResistanceStrategy } from "../model/fire-resistance/getMyBearingsFireResistanceStrategy";
import { getMyBearingsFireExposure } from "../model/fire-resistance/getMyBearingsFireExposure";
import { getMyBearingsFireReducedPadDimensions } from "../model/fire-resistance/getMyBearingsFireReducedPadDimensions";
import { getMyBearingsMineralWoolRequirement } from "../model/fire-resistance/getMyBearingsMineralWoolRequirement";
import {
  getMyBearingsFireMinimumSCheck,
  getMyBearingsMineralWoolFitCheck,
} from "../model/fire-resistance/getMyBearingsFireGeometryChecks";
import {
  getMyBearingsFireResolution,
  type MyBearingsFireCheckStatus,
} from "../model/fire-resistance/getMyBearingsFireResolution";
import { evaluateMyBearingsCandidate } from "../model/evaluation";
import type { MyBearingsFireResistanceSource } from "../model/fire-resistance/types";

type MyBearingsPadSizeSelectionResultProps = {
  bearingTypes: MyBearingsPadSizeBearingTypeSource[];
  openingDiameters: MyBearingsStudOpeningDiameter[];
  bearingFireResistance: MyBearingsFireResistanceSource[];
};

function MyBearingsSelectedPadDrawingSync({
  value,
}: {
  value: MyBearingsSelectedPadDrawing | null;
}) {
  const { setSelectedPadDrawing } = useMyBearingsModuleConfigurator();

  useEffect(() => {
    setSelectedPadDrawing((current) => {
      if (
        current?.widthMm === value?.widthMm &&
        current?.lengthMm === value?.lengthMm &&
        current?.thicknessMm === value?.thicknessMm &&
        current?.studHoleDiameterMm === value?.studHoleDiameterMm &&
        current?.mineralWoolWidthMm === value?.mineralWoolWidthMm
      ) {
        return current;
      }

      return value;
    });
  }, [setSelectedPadDrawing, value]);

  return null;
}

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

function formatExposedEdgeCount(count: number) {
  return `${count} exposed ${count === 1 ? "edge" : "edges"}`;
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
    value === "compression" ||
    value === "perforated205"
  );
}

function buildCandidateEvaluationInput(
  methodCode: MyBearingsCalculationMethodCode,
  geometry: MyBearingsCandidateEvaluationInput["context"]["geometry"],
  forceAndDeformation: MyBearingsCandidateEvaluationInput["context"]["forceAndDeformation"],
  hasStuds: boolean,
  studHoleDiameterMm: number,
  variant: MyBearingsPadSizeVariant,
  padThicknessMm: number,
): MyBearingsCandidateEvaluationInput {
  const padArea = getMyBearingsPadArea({
    widthMm: variant.widthMm,
    lengthMm: variant.lengthMm,
    hasStuds,
    holeDiameterMm: studHoleDiameterMm,
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
    studHoleDiameterMm,
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
  openingDiameters,
  bearingFireResistance,
}: MyBearingsPadSizeSelectionResultProps) {
  const {
    geometry,
    connectionType,
    forceAndDeformation,
    fireResistance,
    beamTopHeadArrangement,
    hasStuds,
  } =
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

  const hasOpeningDiameterForSelectedStud = openingDiameters.some(
    (item) => item.studDiameterMm === geometry.ds,
  );

  if (!hasOpeningDiameterForSelectedStud) {
    return (
      <div className="space-y-3">
        <MyLabel size="small">Bearing size selection</MyLabel>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
          No opening diameter is configured for the selected stud diameter.
        </div>
      </div>
    );
  }

  const studHoleDiameterMm = getStudHoleDiameter(geometry.ds, openingDiameters);

  type MethodSelection = {
    methodCode: MyBearingsCalculationMethodCode;
    maxCompressiveStressMPa: number | null;
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

  const getMethods = (
    sourceBearingTypes: MyBearingsPadSizeBearingTypeSource[],
  ) =>
    sourceBearingTypes.flatMap((bearingType): MethodSelection[] => {
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
            maxCompressiveStressMPa:
              parameterItem.max_compressive_stress_sigma_rd_MPa,
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
                studHoleDiameterMm,
                variant,
                minDimension.thickness_mm,
              ),
          },
        ];
          },
          ),
        );
    });

  let supportedParameters = bearingTypes.flatMap(
    (bt) => bt.bearing_type_parameters || [],
  );

  const baseSelection = selectBestMyBearingsPadSizeAcrossMethods({
    geometry,
    connectionType,
    methods: getMethods(bearingTypes),
  });

  let selection = baseSelection;
  let selectedPadArea = selection.selected
    ? getMyBearingsPadArea({
        widthMm: selection.selected.variant.widthMm,
        lengthMm: selection.selected.variant.lengthMm,
        hasStuds,
        holeDiameterMm: studHoleDiameterMm,
        numberOfStuds: geometry.n,
      })
    : null;
  let candidatesForSelectedGap = selection.candidates.filter(
    (candidate) => candidate.isEligibleForSelection,
  );
  let selectedBearingType = selection.selected
    ? bearingTypes.find(
        (bearingType) =>
          bearingType.code === selection.selected?.variant.bearingTypeCode,
      )
    : null;
  const baseSelectedBearingType = selectedBearingType;
  let selectedFireResistanceRecord =
    baseSelectedBearingType && selection.selected?.variant.padThicknessMm != null
      ? bearingFireResistance.find(
          (record) =>
            record.bearing_type_id === baseSelectedBearingType.id &&
            record.thickness_mm === selection.selected?.variant.padThicknessMm,
        )
      : null;
  const fireDurationMinutes = getMyBearingsFireDurationMinutes(fireResistance);
  const contactArea = getMyBearingsContactArea({
    ...geometry,
    connectionType,
  });
  const fireExposure = getMyBearingsFireExposure({
    connectionType,
    isEndNotchedBeam: geometry.isEndNotchedBeam,
    beamTopHeadArrangement,
  });
  const hasFireExposure =
    fireExposure.exposedASides > 0 || fireExposure.exposedBSides > 0;
  const fireExposureLabel = `A: ${formatExposedEdgeCount(fireExposure.exposedASides)} → b; B: ${formatExposedEdgeCount(fireExposure.exposedBSides)} → a`;
  let fireStrategy = getMyBearingsFireResistanceStrategy({
    fireDurationMinutes,
    degradationRateWithoutCoverMmPerMinute:
      selectedFireResistanceRecord?.degradation_rate_without_cover_mm_per_min,
  });
  if (fireDurationMinutes != null && !hasFireExposure) {
    fireStrategy = "not-required";
  }
  let minimumSCheck =
    fireDurationMinutes != null &&
    hasFireExposure &&
    selectedFireResistanceRecord != null
      ? getMyBearingsFireMinimumSCheck({
          contactWidthMm: contactArea.contactWidth,
          contactLengthMm: contactArea.contactLength,
          minSDimensionMm: selectedFireResistanceRecord.min_S_dimension_mm,
        })
      : null;
  let fireStrategyLabel =
    fireStrategy === "not-required"
      ? "Not required"
      : fireStrategy === "calculate-charring"
        ? "Charring verification"
        : "Mineral wool required";
  let fireReducedPadDimensions =
    fireStrategy === "calculate-charring" &&
    fireDurationMinutes != null &&
    selectedFireResistanceRecord != null &&
    selection?.selected
      ? getMyBearingsFireReducedPadDimensions({
          aMm: selection.selected.variant.widthMm,
          bMm: selection.selected.variant.lengthMm,
          charringRateMmPerMinute:
            selectedFireResistanceRecord.degradation_rate_without_cover_mm_per_min,
          fireDurationMinutes,
          exposure: fireExposure,
        })
      : null;
  let fireCandidateEvaluation =
    fireReducedPadDimensions != null &&
    !fireReducedPadDimensions.isFullyCharred &&
    selection?.selected
      ? (() => {
          const fireEvaluationInput = buildCandidateEvaluationInput(
            selection.selected.evaluation.methodCode,
            geometry,
            forceAndDeformation,
            hasStuds,
            studHoleDiameterMm,
            {
              ...selection.selected.variant,
              widthMm: fireReducedPadDimensions.fireReducedAMm,
              lengthMm: fireReducedPadDimensions.fireReducedBMm,
            },
            selection.selected.variant.padThicknessMm ?? geometry.tc,
          );

          return evaluateMyBearingsCandidate({
            ...fireEvaluationInput,
            loadInput: {
              ...fireEvaluationInput.loadInput,
              designVerticalForceKN:
                fireEvaluationInput.loadInput.designVerticalForceKN * 0.7,
            },
          });
        })()
      : null;
  let fireCheckLabel = fireReducedPadDimensions?.isFullyCharred
    ? "Fail — charring consumes the pad"
    : fireCandidateEvaluation?.isValid
      ? "Pass"
      : fireCandidateEvaluation
        ? "Fail"
        : "n/a";

  const baseFireCheckStatus: MyBearingsFireCheckStatus | null =
    fireStrategy === "calculate-charring"
      ? minimumSCheck?.isValid === false ||
        fireReducedPadDimensions?.isFullyCharred ||
          fireCandidateEvaluation?.isValid === false
        ? "fail"
        : fireCandidateEvaluation?.isValid
          ? "pass"
          : "fail"
      : null;
  const baseFireResolution = selection.selected
    ? getMyBearingsFireResolution({
        baseBearingTypeCode: selection.selected.variant.bearingTypeCode ?? "",
        baseFireStrategy: fireStrategy,
        baseFireCheckStatus,
      })
    : null;
  let fireResolutionNote: string | null = null;
  let hasFinalMineralWoolProtection = false;

  if (baseFireResolution?.action === "use-mineral-wool-on-base") {
    hasFinalMineralWoolProtection = true;
    fireStrategyLabel = "Mineral wool required";
    fireResolutionNote = "The base selection requires mineral wool.";
  }

  if (baseFireResolution?.action === "try-next-unprotected-type") {
    const nextBearingType = bearingTypes.find(
      (bearingType) =>
        bearingType.code === baseFireResolution.nextBearingTypeCode,
    );
    const nextSelection = nextBearingType
      ? selectBestMyBearingsPadSizeAcrossMethods({
          geometry,
          connectionType,
          methods: getMethods([nextBearingType]),
        })
      : null;
    const nextSelected = nextSelection?.selected;
    const nextFireResistanceRecord =
      nextBearingType && nextSelected?.variant.padThicknessMm != null
        ? bearingFireResistance.find(
            (record) =>
              record.bearing_type_id === nextBearingType.id &&
              record.thickness_mm === nextSelected.variant.padThicknessMm,
          )
        : null;
    const nextMinimumSCheck =
      nextFireResistanceRecord != null
        ? getMyBearingsFireMinimumSCheck({
            contactWidthMm: contactArea.contactWidth,
            contactLengthMm: contactArea.contactLength,
            minSDimensionMm: nextFireResistanceRecord.min_S_dimension_mm,
          })
        : null;
    const nextFireStrategy = getMyBearingsFireResistanceStrategy({
      fireDurationMinutes,
      degradationRateWithoutCoverMmPerMinute:
        nextFireResistanceRecord?.degradation_rate_without_cover_mm_per_min,
    });
    const nextFireReducedPadDimensions =
      nextFireStrategy === "calculate-charring" &&
      fireDurationMinutes != null &&
      nextFireResistanceRecord != null &&
      nextSelected
        ? getMyBearingsFireReducedPadDimensions({
            aMm: nextSelected.variant.widthMm,
            bMm: nextSelected.variant.lengthMm,
            charringRateMmPerMinute:
              nextFireResistanceRecord.degradation_rate_without_cover_mm_per_min,
            fireDurationMinutes,
            exposure: fireExposure,
          })
        : null;
    const nextFireCandidateEvaluation =
      nextFireReducedPadDimensions != null &&
      !nextFireReducedPadDimensions.isFullyCharred &&
      nextSelected
        ? (() => {
            const nextFireEvaluationInput = buildCandidateEvaluationInput(
              nextSelected.evaluation.methodCode,
              geometry,
              forceAndDeformation,
              hasStuds,
              studHoleDiameterMm,
              {
                ...nextSelected.variant,
                widthMm: nextFireReducedPadDimensions.fireReducedAMm,
                lengthMm: nextFireReducedPadDimensions.fireReducedBMm,
              },
              nextSelected.variant.padThicknessMm ?? geometry.tc,
            );

            return evaluateMyBearingsCandidate({
              ...nextFireEvaluationInput,
              loadInput: {
                ...nextFireEvaluationInput.loadInput,
                designVerticalForceKN:
                  nextFireEvaluationInput.loadInput.designVerticalForceKN * 0.7,
              },
            });
          })()
        : null;
    const nextTypeFireCheckStatus: MyBearingsFireCheckStatus =
      nextMinimumSCheck?.isValid !== false &&
      nextFireStrategy === "calculate-charring" &&
      !nextFireReducedPadDimensions?.isFullyCharred &&
      nextFireCandidateEvaluation?.isValid
        ? "pass"
        : "fail";
    const fireResolution = getMyBearingsFireResolution({
      baseBearingTypeCode: selection.selected?.variant.bearingTypeCode ?? "",
      baseFireStrategy: fireStrategy,
      baseFireCheckStatus,
      nextTypeFireCheckStatus,
    });

    if (
      fireResolution.action === "accept-next-unprotected-type" &&
      nextBearingType != null &&
      nextSelection != null &&
      nextSelected != null
    ) {
      const baseBearingTypeName =
        selection.selected?.variant.bearingTypeCode ?? "base type";
      selection = nextSelection;
      selectedBearingType = nextBearingType;
      selectedFireResistanceRecord = nextFireResistanceRecord;
      minimumSCheck = nextMinimumSCheck;
      selectedPadArea = getMyBearingsPadArea({
        widthMm: nextSelected.variant.widthMm,
        lengthMm: nextSelected.variant.lengthMm,
        hasStuds,
        holeDiameterMm: studHoleDiameterMm,
        numberOfStuds: geometry.n,
      });
      candidatesForSelectedGap = nextSelection.candidates.filter(
        (candidate) => candidate.isEligibleForSelection,
      );
      supportedParameters = nextBearingType.bearing_type_parameters;
      fireStrategy = nextFireStrategy;
      fireStrategyLabel = "Charring verification";
      fireReducedPadDimensions = nextFireReducedPadDimensions;
      fireCandidateEvaluation = nextFireCandidateEvaluation;
      fireCheckLabel = "Pass";
      fireResolutionNote = `Upgraded automatically from ${baseBearingTypeName}.`;
    } else {
      hasFinalMineralWoolProtection = true;
      fireStrategyLabel = "Mineral wool required";
      fireResolutionNote =
        "The next stronger unprotected type did not pass; the base selection requires mineral wool.";
    }
  }
  let fireSolutionUnavailableReason: string | null = null;
  let fireWarningMessage: string | null = null;
  if (
    fireDurationMinutes != null &&
    hasFireExposure &&
    selectedFireResistanceRecord == null
  ) {
    fireSolutionUnavailableReason =
      "No fire-resistance record is configured for the selected bearing type and thickness.";
  }
  if (
    fireDurationMinutes != null &&
    hasFireExposure &&
    minimumSCheck?.isValid === false
  ) {
    fireSolutionUnavailableReason = `The available minimum contact dimension (${formatNumber(minimumSCheck.availableMm)} mm) is below the approval minimum S (${formatNumber(minimumSCheck.requiredMm)} mm).`;
  }

  let mineralWoolRequirement = hasFinalMineralWoolProtection
    ? getMyBearingsMineralWoolRequirement(fireResistance)
    : null;
  const mineralWoolFitCheck = mineralWoolRequirement
    ? getMyBearingsMineralWoolFitCheck({
        cminMm: geometry.cmin,
        requiredCoverMm: mineralWoolRequirement.minWidthMm,
        exposure: fireExposure,
      })
    : null;
  if (mineralWoolFitCheck?.isValid === false) {
    fireSolutionUnavailableReason = `The available edge cover c_min (${formatNumber(mineralWoolFitCheck.availableCoverMm)} mm) is below the required mineral-wool width (${formatNumber(mineralWoolFitCheck.requiredCoverMm)} mm).`;
    fireWarningMessage = `Mineral wool cannot be installed: ${formatNumber(mineralWoolFitCheck.requiredCoverMm)} mm is required, but c_min is only ${formatNumber(mineralWoolFitCheck.availableCoverMm)} mm. Increase c_min to at least ${formatNumber(mineralWoolFitCheck.requiredCoverMm)} mm or revise the connection detail.`;
  }
  if (fireSolutionUnavailableReason != null) {
    hasFinalMineralWoolProtection = false;
    mineralWoolRequirement = null;
    fireStrategyLabel = "No approved fire solution";
    fireCheckLabel = "Fail";
    fireResolutionNote = fireSolutionUnavailableReason;
  }
  const selectedPadDrawing: MyBearingsSelectedPadDrawing | null =
    selection.selected
      ? {
          widthMm: selection.selected.variant.widthMm,
          lengthMm: selection.selected.variant.lengthMm,
          thicknessMm: selection.selected.variant.padThicknessMm ?? geometry.tc,
          studHoleDiameterMm,
          mineralWoolWidthMm: mineralWoolRequirement?.minWidthMm ?? null,
        }
      : null;

  return (
    <div className="space-y-3">
      <MyBearingsSelectedPadDrawingSync value={selectedPadDrawing} />
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
            <div className="mt-3 border-t border-zinc-200 pt-3">
              <MyLabel size="small">Fire resistance preview</MyLabel>
              <div className="mt-2">
                <MySummaryRow label="Requirement" value={fireResistance} />
                <MySummaryRow label="Fire duration" value={fireDurationMinutes == null ? "n/a" : `${fireDurationMinutes} min`} />
                <MySummaryRow
                  label="Exposed edges"
                  value={fireExposureLabel}
                />
                {minimumSCheck ? (
                  <>
                    <MySummaryRow
                      label="Available minimum contact dimension S"
                      value={`${formatNumber(minimumSCheck.availableMm)} mm`}
                    />
                    <MySummaryRow
                      label="Required minimum S"
                      value={`${formatNumber(minimumSCheck.requiredMm)} mm (${minimumSCheck.isValid ? "Pass" : "Fail"})`}
                    />
                  </>
                ) : null}
                <MySummaryRow
                  label="Uncovered degradation rate"
                  value={
                    selectedFireResistanceRecord
                      ? `${formatNumber(selectedFireResistanceRecord.degradation_rate_without_cover_mm_per_min)} mm/min`
                      : "No record"
                  }
                />
                <MySummaryRow
                  label="Fire path"
                  value={fireStrategyLabel}
                />
                {fireResolutionNote ? (
                  <div className="py-2 text-sm text-zinc-600">
                    {fireResolutionNote}
                  </div>
                ) : null}
                {fireWarningMessage ? (
                  <div
                    role="alert"
                    className="my-2 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800"
                  >
                    <span className="font-medium">Warning: </span>
                    {fireWarningMessage}
                  </div>
                ) : null}
                {mineralWoolRequirement ? (
                  <>
                    <MySummaryRow
                      label="Final fire solution"
                      value="Ciflamon mineral wool"
                    />
                    <MySummaryRow
                      label="Wool thickness"
                      value={`${geometry.tc} mm`}
                    />
                    <MySummaryRow
                      label="Minimum wool width"
                      value={`${mineralWoolRequirement.minWidthMm} mm`}
                    />
                  </>
                ) : null}
                {mineralWoolFitCheck ? (
                  <MySummaryRow
                    label="Available wool edge cover"
                    value={`${formatNumber(mineralWoolFitCheck.availableCoverMm)} / ${formatNumber(mineralWoolFitCheck.requiredCoverMm)} mm (${mineralWoolFitCheck.isValid ? "Pass" : "Fail"})`}
                  />
                ) : null}
                {fireReducedPadDimensions ? (
                  <>
                    <MySummaryRow
                      label={
                        hasFinalMineralWoolProtection
                          ? "Unprotected charring depth"
                          : "Charring depth"
                      }
                      value={`${formatNumber(fireReducedPadDimensions.charringDepthMm)} mm`}
                    />
                    <MySummaryRow
                      label={
                        hasFinalMineralWoolProtection
                          ? "Unprotected fire-reduced size (a x b)"
                          : "Fire-reduced size (a x b)"
                      }
                      value={`${formatNumber(fireReducedPadDimensions.fireReducedAMm)} x ${formatNumber(fireReducedPadDimensions.fireReducedBMm)} mm`}
                    />
                    <MySummaryRow
                      label={
                        hasFinalMineralWoolProtection
                          ? "Unprotected fire-reduced area"
                          : "Fire-reduced area"
                      }
                      value={`${formatNumber(fireReducedPadDimensions.fireReducedAreaMm2)} mm2`}
                    />
                    <MySummaryRow
                      label={
                        hasFinalMineralWoolProtection
                          ? "Unprotected fire design force"
                          : "Fire design force"
                      }
                      value={formatKn(
                        forceAndDeformation.designVerticalForce * 0.7,
                      )}
                    />
                    <MySummaryRow
                      label={
                        hasFinalMineralWoolProtection
                          ? "Unprotected fire check"
                          : "Fire check"
                      }
                      value={fireCheckLabel}
                    />
                    <MySummaryRow
                      label={
                        hasFinalMineralWoolProtection
                          ? "Unprotected fire usage"
                          : "Fire usage"
                      }
                      value={
                        fireCandidateEvaluation
                          ? formatPercent(
                              fireCandidateEvaluation.compressiveStressUsagePercent,
                            )
                          : "n/a"
                      }
                      className="border-b-0"
                    />
                  </>
                ) : (
                  <div className="border-b-0 py-2 text-sm text-zinc-600">
                    {fireStrategy === "mineral-wool-required"
                      ? "No uncovered charring calculation is available."
                      : "No fire-resistance check was requested."}
                  </div>
                )}
              </div>
            </div>
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
              {fireCandidateEvaluation ? (
                <>
                  <div className="mt-3 border-t border-zinc-200 pt-3">
                    <MyLabel size="small">
                      {hasFinalMineralWoolProtection
                        ? "Unprotected fire debug"
                        : "Fire debug"}
                    </MyLabel>
                  </div>
                  <MySummaryRow
                    label="FEd,fi"
                    value={formatKn(
                      fireCandidateEvaluation.loadInput.designVerticalForceKN,
                    )}
                  />
                  <MySummaryRow
                    label="sigmaEd,fi"
                    value={formatStress(
                      fireCandidateEvaluation.designCompressiveStressKNPerMm2,
                    )}
                  />
                  <MySummaryRow
                    label="sigmaRd,fi"
                    value={formatStress(
                      fireCandidateEvaluation.calculation
                        .compressiveStressLimitMPa,
                    )}
                  />
                  <MySummaryRow
                    label="eta,fi"
                    value={formatPercent(
                      fireCandidateEvaluation.compressiveStressUsagePercent,
                    )}
                    className="border-b-0"
                  />
                </>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
