"use client";

import { useState } from "react";
import { useMyBearingsModuleConfigurator } from "@/app/components/bearings-module/MyBearingsModuleConfigurator";
import MyHStack from "@/app/components/ui/MyHStack";
import MyInput from "@/app/components/ui/MyInput";
import MyLabel from "@/app/components/ui/MyLabel";
import MyVStack from "@/app/components/ui/MyVStack";

export default function MyBearingsModuleForceAndDeformationForm() {
  const { forceAndDeformation, setForceAndDeformation } =
    useMyBearingsModuleConfigurator();
  const [inputs, setInputs] = useState({
    designVerticalForce: `${forceAndDeformation.designVerticalForce}`,
    bearingRotation: `${forceAndDeformation.bearingRotation}`,
    horizontalDeformation: `${forceAndDeformation.horizontalDeformation}`,
  });

  const updateInput =
    (key: keyof typeof inputs) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value;

      setInputs((current) => ({
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

      setForceAndDeformation((current) => ({
        ...current,
        [key]: parsedValue,
      }));
    };

  const restoreInput = (key: keyof typeof inputs) => () => {
    setInputs((current) => ({
      ...current,
      [key]: `${forceAndDeformation[key]}`,
    }));
  };

  return (
    <MyHStack gap="sm" align="end" className="overflow-x-auto">
      <MyVStack gap="xs" className="shrink-0">
        <MyLabel size="small">
          design vertical force (
          <b>
            F<sub>E,d</sub>
          </b>
          )
        </MyLabel>
        <MyInput
          type="number"
          size="sm"
          density="compact"
          suffix="kN"
          value={inputs.designVerticalForce}
          onChange={updateInput("designVerticalForce")}
          onBlur={restoreInput("designVerticalForce")}
        />
      </MyVStack>

      <MyVStack gap="xs" className="shrink-0">
        <MyLabel size="small">
          bearing rotation (
          <b>&alpha;</b>
          )
        </MyLabel>
        <MyInput
          type="number"
          size="sm"
          density="compact"
          suffix="‰"
          value={inputs.bearingRotation}
          onChange={updateInput("bearingRotation")}
          onBlur={restoreInput("bearingRotation")}
        />
      </MyVStack>

      <MyVStack gap="xs" className="shrink-0">
        <MyLabel size="small">
          horizontal deformation (<b>u</b>)
        </MyLabel>
        <MyInput
          type="number"
          size="sm"
          density="compact"
          suffix="mm"
          value={inputs.horizontalDeformation}
          onChange={updateInput("horizontalDeformation")}
          onBlur={restoreInput("horizontalDeformation")}
        />
      </MyVStack>
    </MyHStack>
  );
}
