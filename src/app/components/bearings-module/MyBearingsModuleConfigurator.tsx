"use client";

import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import type { MyBearingsModuleParameters } from "@/app/components/drawings/bearings-module/types";

const INITIAL_GEOMETRY: MyBearingsModuleParameters = {
  g1: 20,
  g2: 15,
  s1: 300,
  s2: 200,
  b: 250,
};

type MyBearingsModuleConfiguratorContextValue = {
  geometry: MyBearingsModuleParameters;
  setGeometry: React.Dispatch<React.SetStateAction<MyBearingsModuleParameters>>;
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

  return (
    <MyBearingsModuleConfiguratorContext.Provider
      value={{ geometry, setGeometry }}
    >
      {children}
    </MyBearingsModuleConfiguratorContext.Provider>
  );
}
