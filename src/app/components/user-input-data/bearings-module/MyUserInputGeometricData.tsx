"use client";

import { useState } from "react";
import MyInput from "@/app/components/ui/MyInput";
import MyLabel from "@/app/components/ui/MyLabel";
import { useMyBearingsModuleConfigurator } from "@/app/components/bearings-module/MyBearingsModuleConfigurator";

export default function MyUserInputGeometricData() {
  const { geometry, setGeometry } = useMyBearingsModuleConfigurator();

  const [geometryInputs, setGeometryInputs] = useState({
    g1: `${geometry.g1}`,
    g2: `${geometry.g2}`,
    s1: `${geometry.s1}`,
    s2: `${geometry.s2}`,
    b: `${geometry.b}`,
  });

  const updateGeometryInput =
    (key: keyof typeof geometryInputs) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value;

      setGeometryInputs((current) => ({
        ...current,
        [key]: nextValue,
      }));

      if (nextValue === "") {
        return;
      }

      const parsedValue = Number(nextValue);

      if (Number.isNaN(parsedValue)) {
        return;
      }

      setGeometry((current) => ({
        ...current,
        [key]: parsedValue,
      }));
    };

  const restoreGeometryInput =
    (key: keyof typeof geometryInputs) => () => {
      setGeometryInputs((current) => ({
        ...current,
        [key]: `${geometry[key]}`,
      }));
    };

  return (
    <>
      <MyLabel size="small">column-beam offset g<sub>1</sub> [mm]</MyLabel>
      <MyInput
        type="number"
        value={geometryInputs.g1}
        onChange={updateGeometryInput("g1")}
        onBlur={restoreGeometryInput("g1")}
      />

      <MyLabel size="small">
        bearing gap g<sub>2</sub> [mm]
      </MyLabel>
      <MyInput
        type="number"
        value={geometryInputs.g2}
        onChange={updateGeometryInput("g2")}
        onBlur={restoreGeometryInput("g2")}
      />

      <MyLabel size="small">
        cantilever width S<sub>1</sub> [mm]
      </MyLabel>
      <MyInput
        type="number"
        value={geometryInputs.s1}
        onChange={updateGeometryInput("s1")}
        onBlur={restoreGeometryInput("s1")}
      />

      <MyLabel size="small">
        cantilever length S<sub>2</sub> [mm]
      </MyLabel>
      <MyInput
        type="number"
        value={geometryInputs.s2}
        onChange={updateGeometryInput("s2")}
        onBlur={restoreGeometryInput("s2")}
      />

      <MyLabel size="small">beam width B [mm]</MyLabel>
      <MyInput
        type="number"
        value={geometryInputs.b}
        onChange={updateGeometryInput("b")}
        onBlur={restoreGeometryInput("b")}
      />
    </>
  );
}
