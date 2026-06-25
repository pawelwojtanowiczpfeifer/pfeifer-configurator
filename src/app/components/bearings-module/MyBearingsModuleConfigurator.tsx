"use client";

import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import type {
  MyBearingsConnectionType,
  MyBearingsModuleFireResistance,
  MyBearingsModuleForceAndDeformation,
  MyBearingsModuleParameters,
} from "./model/types";

const INITIAL_S2 = 200;

const INITIAL_GEOMETRY: MyBearingsModuleParameters = {
  isEndNotchedBeam: false,
  g1: 20,
  g2: 20,
  tc: 15,
  b1: 300,
  a1: INITIAL_S2,
  a2: 300,
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
  designVerticalForce: 500,
  bearingRotation: 10,
  horizontalDeformation: 3,
};

const INITIAL_FIRE_RESISTANCE: MyBearingsModuleFireResistance =
  "not-specified";
const INITIAL_CONNECTION_TYPE: MyBearingsConnectionType = "cantilever";

type MyBearingsModuleConfiguratorContextValue = {
  geometry: MyBearingsModuleParameters;
  setGeometry: React.Dispatch<React.SetStateAction<MyBearingsModuleParameters>>;
  connectionType: MyBearingsConnectionType;
  setConnectionType: React.Dispatch<
    React.SetStateAction<MyBearingsConnectionType>
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
  const [geometry, setGeometry] =
    useState<MyBearingsModuleParameters>(INITIAL_GEOMETRY);
  const [connectionType, setConnectionType] = useState<MyBearingsConnectionType>(
    INITIAL_CONNECTION_TYPE,
  );
  const [forceAndDeformation, setForceAndDeformation] =
    useState<MyBearingsModuleForceAndDeformation>(
      INITIAL_FORCE_AND_DEFORMATION,
    );
  const [fireResistance, setFireResistance] = useState(
    INITIAL_FIRE_RESISTANCE,
  );
  const [hasStuds, setHasStuds] = useState(false);

  return (
    <MyBearingsModuleConfiguratorContext.Provider
      value={{
        geometry,
        setGeometry,
        connectionType,
        setConnectionType,
        forceAndDeformation,
        setForceAndDeformation,
        fireResistance,
        setFireResistance,
        hasStuds,
        setHasStuds,
      }}
    >
      {children}
    </MyBearingsModuleConfiguratorContext.Provider>
  );
}
