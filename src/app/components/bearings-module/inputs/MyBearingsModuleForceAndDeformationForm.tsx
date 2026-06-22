"use client";

import { useState } from "react";
import { useMyBearingsModuleConfigurator } from "@/app/components/bearings-module/MyBearingsModuleConfigurator";
import MyFieldLabel from "@/app/components/ui/MyFieldLabel";
import MyHStack from "@/app/components/ui/MyHStack";
import MyInput from "@/app/components/ui/MyInput";
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
    <MyHStack
      gap="sm"
      align="end"
      justify="between"
      width="full"
      className="overflow-x-auto"
    >
      <MyVStack gap="xs" className="shrink-0">
        <MyFieldLabel
          symbol={
            <>
              F<sub>E,d</sub>
            </>
          }
          description="design vertical force"
        />
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
        <MyFieldLabel symbol="α" description="bearing rotation" />
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
        <MyFieldLabel symbol="u" description="horizontal deformation" />
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
