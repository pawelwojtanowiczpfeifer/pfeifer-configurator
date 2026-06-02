"use client";

import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import type { MyBearingsModuleParameters } from "./model/types";

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

type MyBearingsModuleConfiguratorContextValue = {
  geometry: MyBearingsModuleParameters;
  setGeometry: React.Dispatch<React.SetStateAction<MyBearingsModuleParameters>>;
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
  const [hasStuds, setHasStuds] = useState(false);

  return (
    <MyBearingsModuleConfiguratorContext.Provider
      value={{ geometry, setGeometry, hasStuds, setHasStuds }}
    >
      {children}
    </MyBearingsModuleConfiguratorContext.Provider>
  );
}
