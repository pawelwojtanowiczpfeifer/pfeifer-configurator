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

  const updateCheckEnabled =
    (
      key:
        | "isBearingRotationCheckEnabled"
        | "isHorizontalDeformationCheckEnabled",
    ) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForceAndDeformation((current) => ({
        ...current,
        [key]: event.target.checked,
      }));
    };

  return (
    <MyHStack
      gap="sm"
      align="start"
      justify="between"
      width="full"
      className="overflow-x-auto"
    >
      <MyVStack gap="xs" className="shrink-0 min-h-[58px]">
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

      <MyVStack gap="xs" className="shrink-0 min-h-[58px]">
        <div className="flex items-center gap-2">
          <MyFieldLabel symbol="α" description="bearing rotation" />
          <input
            type="checkbox"
            aria-label="Check bearing rotation"
            checked={forceAndDeformation.isBearingRotationCheckEnabled === true}
            onChange={updateCheckEnabled("isBearingRotationCheckEnabled")}
            className="h-4 w-4 rounded border-zinc-300 accent-[#005d9f]"
          />
        </div>
        {forceAndDeformation.isBearingRotationCheckEnabled ? (
          <MyInput
            type="number"
            size="sm"
            density="compact"
            suffix="‰"
            value={inputs.bearingRotation}
            onChange={updateInput("bearingRotation")}
            onBlur={restoreInput("bearingRotation")}
          />
        ) : null}
      </MyVStack>

      <MyVStack gap="xs" className="shrink-0 min-h-[58px]">
        <div className="flex items-center gap-2">
          <MyFieldLabel symbol="u" description="horizontal deformation" />
          <input
            type="checkbox"
            aria-label="Check horizontal deformation"
            checked={
              forceAndDeformation.isHorizontalDeformationCheckEnabled === true
            }
            onChange={updateCheckEnabled("isHorizontalDeformationCheckEnabled")}
            className="h-4 w-4 rounded border-zinc-300 accent-[#005d9f]"
          />
        </div>
        {forceAndDeformation.isHorizontalDeformationCheckEnabled ? (
          <MyInput
            type="number"
            size="sm"
            density="compact"
            suffix="mm"
            value={inputs.horizontalDeformation}
            onChange={updateInput("horizontalDeformation")}
            onBlur={restoreInput("horizontalDeformation")}
          />
        ) : null}
      </MyVStack>
    </MyHStack>
  );
}
