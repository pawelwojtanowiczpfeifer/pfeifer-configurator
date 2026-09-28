"use client";

import {
  useCallback,
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import type {
  MyBearingsBeamTopHeadArrangement,
  MyBearingsConnectionType,
  MyBearingsModuleFireResistance,
  MyBearingsModuleForceAndDeformation,
  MyBearingsModuleParameters,
} from "./model/types";

export type MyBearingsSelectedPadDrawing = {
  widthMm: number;
  lengthMm: number;
  thicknessMm: number;
  studHoleDiameterMm: number;
  mineralWoolWidthMm: number | null;
};

export type MyBearingsCalculationStatus =
  | "not-calculated"
  | "current"
  | "outdated";

const INITIAL_S2 = 200;
const INITIAL_A2 = 300;

const INITIAL_GEOMETRY: MyBearingsModuleParameters = {
  isEndNotchedBeam: false,
  g1: 20,
  g2: 0.25 * INITIAL_A2,
  tc: 15,
  b1: 300,
  a1: INITIAL_S2,
  a2: INITIAL_A2,
  b2: 250,
  b3: 300,
  cmin: 40,
  n: 1,
  ds: 16,
  e1: 0.5 * INITIAL_S2,
  e2: 0.5 * 300,
  e3: 0,
};

const INITIAL_FORCE_AND_DEFORMATION: MyBearingsModuleForceAndDeformation = {
  designVerticalForce: 50,
  bearingRotation: 10,
  isBearingRotationCheckEnabled: false,
  horizontalDeformation: 3,
  isHorizontalDeformationCheckEnabled: false,
};

const INITIAL_FIRE_RESISTANCE: MyBearingsModuleFireResistance =
  "not-specified";
const INITIAL_CONNECTION_TYPE: MyBearingsConnectionType = "cantilever";
const INITIAL_BEAM_TOP_HEAD_ARRANGEMENT: MyBearingsBeamTopHeadArrangement =
  "no-upstand";

type MyBeamTopGeometryByHeadArrangement = Record<
  MyBearingsBeamTopHeadArrangement,
  MyBearingsModuleParameters
>;

function getBeamTopGeometryPreset(
  arrangement: MyBearingsBeamTopHeadArrangement,
): MyBearingsModuleParameters {
  const baseGeometry = { ...INITIAL_GEOMETRY };

  if (arrangement === "two-beams") {
    return {
      ...baseGeometry,
      // Keeps the two beam bearings symmetric with a 20 mm opening.
      g2: (baseGeometry.a2 + 20) / 2,
    };
  }

  if (arrangement === "three-sided-head-upstand") {
    return {
      ...baseGeometry,
      // Leaves a visibly useful outer upstand and space for both side walls.
      g2: 75,
      b3: 400,
    };
  }

  return baseGeometry;
}

function getInitialBeamTopGeometryByHeadArrangement(): MyBeamTopGeometryByHeadArrangement {
  return {
    "no-upstand": getBeamTopGeometryPreset("no-upstand"),
    "two-beams": getBeamTopGeometryPreset("two-beams"),
    "outer-head-upstand": getBeamTopGeometryPreset("outer-head-upstand"),
    "three-sided-head-upstand": getBeamTopGeometryPreset(
      "three-sided-head-upstand",
    ),
  };
}

type MyBearingsModuleConfiguratorContextValue = {
  geometry: MyBearingsModuleParameters;
  setGeometry: React.Dispatch<React.SetStateAction<MyBearingsModuleParameters>>;
  connectionType: MyBearingsConnectionType;
  setConnectionType: React.Dispatch<
    React.SetStateAction<MyBearingsConnectionType>
  >;
  beamTopHeadArrangement: MyBearingsBeamTopHeadArrangement;
  setBeamTopHeadArrangement: React.Dispatch<
    React.SetStateAction<MyBearingsBeamTopHeadArrangement>
  >;
  forceAndDeformation: MyBearingsModuleForceAndDeformation;
  setForceAndDeformation: React.Dispatch<
    React.SetStateAction<MyBearingsModuleForceAndDeformation>
  >;
  fireResistance: MyBearingsModuleFireResistance;
  setFireResistance: React.Dispatch<
    React.SetStateAction<MyBearingsModuleFireResistance>
  >;
  hasStuds: boolean;
  setHasStuds: React.Dispatch<React.SetStateAction<boolean>>;
  calculationStatus: MyBearingsCalculationStatus;
  calculateBearings: () => void;
  isCalculationReportAvailable: boolean;
  setIsCalculationReportAvailable: React.Dispatch<React.SetStateAction<boolean>>;
  isCalculationNotePreviewOpen: boolean;
  openCalculationNotePreview: () => void;
  closeCalculationNotePreview: () => void;
  selectedPadDrawing: MyBearingsSelectedPadDrawing | null;
  setSelectedPadDrawing: React.Dispatch<
    React.SetStateAction<MyBearingsSelectedPadDrawing | null>
  >;
};

const MyBearingsModuleConfiguratorContext =
  createContext<MyBearingsModuleConfiguratorContextValue | null>(null);

export function useMyBearingsModuleConfigurator() {
  const context = useContext(MyBearingsModuleConfiguratorContext);

  if (!context) {
    throw new Error(
      "useMyBearingsModuleConfigurator must be used within MyBearingsModuleConfigurator.",
    );
  }

  return context;
}

export default function MyBearingsModuleConfigurator({
  children,
}: PropsWithChildren) {
  const [connectionType, setConnectionTypeState] = useState<MyBearingsConnectionType>(
    INITIAL_CONNECTION_TYPE,
  );
  const [beamTopHeadArrangement, setBeamTopHeadArrangementState] = useState(
    INITIAL_BEAM_TOP_HEAD_ARRANGEMENT,
  );
  const [cantileverGeometry, setCantileverGeometry] =
    useState<MyBearingsModuleParameters>(INITIAL_GEOMETRY);
  const [beamTopGeometryByHeadArrangement, setBeamTopGeometryByHeadArrangement] =
    useState<MyBeamTopGeometryByHeadArrangement>(
      getInitialBeamTopGeometryByHeadArrangement,
    );
  const [forceAndDeformation, setForceAndDeformationState] =
    useState<MyBearingsModuleForceAndDeformation>(
      INITIAL_FORCE_AND_DEFORMATION,
    );
  const [fireResistance, setFireResistanceState] = useState(
    INITIAL_FIRE_RESISTANCE,
  );
  const [hasStuds, setHasStudsState] = useState(false);
  const [calculationStatus, setCalculationStatus] =
    useState<MyBearingsCalculationStatus>("not-calculated");
  const [isCalculationReportAvailable, setIsCalculationReportAvailable] =
    useState(false);
  const [isCalculationNotePreviewOpen, setIsCalculationNotePreviewOpen] =
    useState(false);
  // This is presentation data derived by the selection result. Keeping it here
  // lets both technical views render the exact final (including fire) solution.
  const [selectedPadDrawing, setSelectedPadDrawing] =
    useState<MyBearingsSelectedPadDrawing | null>(null);

  const markCalculationOutdated = useCallback(() => {
    setIsCalculationNotePreviewOpen(false);
    setIsCalculationReportAvailable(false);
    setCalculationStatus((current) =>
      current === "current" ? "outdated" : current,
    );
  }, []);

  const calculateBearings = useCallback(() => {
    setIsCalculationReportAvailable(false);
    setCalculationStatus("current");
  }, []);

  const openCalculationNotePreview = useCallback(() => {
    if (isCalculationReportAvailable) {
      setIsCalculationNotePreviewOpen(true);
    }
  }, [isCalculationReportAvailable]);

  const closeCalculationNotePreview = useCallback(() => {
    setIsCalculationNotePreviewOpen(false);
  }, []);

  const geometry =
    connectionType === "beam-top"
      ? beamTopGeometryByHeadArrangement[beamTopHeadArrangement]
      : cantileverGeometry;

  const setGeometry = useCallback<
    React.Dispatch<React.SetStateAction<MyBearingsModuleParameters>>
  >(
    (nextGeometry) => {
      markCalculationOutdated();

      if (connectionType === "beam-top") {
        setBeamTopGeometryByHeadArrangement((currentProfiles) => {
          const currentGeometry =
            currentProfiles[beamTopHeadArrangement];
          const resolvedGeometry =
            typeof nextGeometry === "function"
              ? nextGeometry(currentGeometry)
              : nextGeometry;

          return {
            ...currentProfiles,
            [beamTopHeadArrangement]: resolvedGeometry,
          };
        });
        return;
      }

      setCantileverGeometry(nextGeometry);
    },
    [beamTopHeadArrangement, connectionType, markCalculationOutdated],
  );

  const setConnectionType = useCallback<
    React.Dispatch<React.SetStateAction<MyBearingsConnectionType>>
  >(
    (nextConnectionType) => {
      markCalculationOutdated();
      setConnectionTypeState(nextConnectionType);
    },
    [markCalculationOutdated],
  );

  const setBeamTopHeadArrangement = useCallback<
    React.Dispatch<React.SetStateAction<MyBearingsBeamTopHeadArrangement>>
  >(
    (nextArrangement) => {
      markCalculationOutdated();
      setBeamTopHeadArrangementState(nextArrangement);
    },
    [markCalculationOutdated],
  );

  const setForceAndDeformation = useCallback<
    React.Dispatch<React.SetStateAction<MyBearingsModuleForceAndDeformation>>
  >(
    (nextForceAndDeformation) => {
      markCalculationOutdated();
      setForceAndDeformationState(nextForceAndDeformation);
    },
    [markCalculationOutdated],
  );

  const setFireResistance = useCallback<
    React.Dispatch<React.SetStateAction<MyBearingsModuleFireResistance>>
  >(
    (nextFireResistance) => {
      markCalculationOutdated();
      setFireResistanceState(nextFireResistance);
    },
    [markCalculationOutdated],
  );

  const setHasStuds = useCallback<React.Dispatch<React.SetStateAction<boolean>>>(
    (nextHasStuds) => {
      markCalculationOutdated();
      setHasStudsState(nextHasStuds);
    },
    [markCalculationOutdated],
  );

  return (
    <MyBearingsModuleConfiguratorContext.Provider
      value={{
        geometry,
        setGeometry,
        connectionType,
        setConnectionType,
        beamTopHeadArrangement,
        setBeamTopHeadArrangement,
        forceAndDeformation,
        setForceAndDeformation,
        fireResistance,
        setFireResistance,
        hasStuds,
        setHasStuds,
        calculationStatus,
        calculateBearings,
        isCalculationReportAvailable,
        setIsCalculationReportAvailable,
        isCalculationNotePreviewOpen,
        openCalculationNotePreview,
        closeCalculationNotePreview,
        selectedPadDrawing,
        setSelectedPadDrawing,
      }}
    >
      {children}
    </MyBearingsModuleConfiguratorContext.Provider>
  );
}
