"use client";

import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import type {
  MyBearingsModuleForceAndDeformation,
  MyBearingsModuleParameters,
} from "./model/types";

const INITIAL_S2 = 200;

const INITIAL_GEOMETRY: MyBearingsModuleParameters = {
  g1: 20,
  g2: 15,
  s1: 300,
  s2: INITIAL_S2,
  b: 250,
  c: 30,
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

type MyBearingsModuleConfiguratorContextValue = {
  geometry: MyBearingsModuleParameters;
  setGeometry: React.Dispatch<React.SetStateAction<MyBearingsModuleParameters>>;
  forceAndDeformation: MyBearingsModuleForceAndDeformation;
  setForceAndDeformation: React.Dispatch<
    React.SetStateAction<MyBearingsModuleForceAndDeformation>
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
  const [forceAndDeformation, setForceAndDeformation] =
    useState<MyBearingsModuleForceAndDeformation>(
      INITIAL_FORCE_AND_DEFORMATION,
    );
  const [hasStuds, setHasStuds] = useState(false);

  return (
    <MyBearingsModuleConfiguratorContext.Provider
      value={{
        geometry,
        setGeometry,
        forceAndDeformation,
        setForceAndDeformation,
        hasStuds,
        setHasStuds,
      }}
    >
      {children}
    </MyBearingsModuleConfiguratorContext.Provider>
  );
}
