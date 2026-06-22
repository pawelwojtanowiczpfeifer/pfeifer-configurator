"use client";

import { useState } from "react";
import MyFieldLabel from "@/app/components/ui/MyFieldLabel";
import MyInput from "@/app/components/ui/MyInput";
import MySegmentedControl, {
  type SegmentedControlOption,
} from "@/app/components/ui/MySegmentedControl";
import MySelect, { type SelectOption } from "@/app/components/ui/MySelect";
import MyVStack from "@/app/components/ui/MyVStack";
import MyLabel from "@/app/components/ui/MyLabel";
import { useMyBearingsModuleConfigurator } from "@/app/components/bearings-module/MyBearingsModuleConfigurator";
import MyCheckbox from "../../ui/MyCheckbox";

function getStudDefaults(n: 1 | 2, s1: number) {
  if (n === 2) {
    return {
      e2: 0.3 * s1,
      e3: 0.4 * s1,
    };
  }

  return {
    e2: 0.5 * s1,
    e3: 0,
  };
}

export default function MyBearingsModuleGeometricDataForm() {
  const beamTypeOptions: SegmentedControlOption<
    "without-end-notch" | "end-notched"
  >[] = [
    {
      label: "without end notch",
      value: "without-end-notch",
    },
    {
      label: "with end notch",
      value: "end-notched",
    },
  ];
  const studsNumber: SegmentedControlOption<1 | 2>[] = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
  ];
  const studDiameterOptions: SelectOption<number>[] = [
    { label: "10 mm", value: 10 },
    { label: "12 mm", value: 12 },
    { label: "16 mm", value: 16 },
    { label: "20 mm", value: 20 },
    { label: "25 mm", value: 25 },
    { label: "30 mm", value: 30 },
    { label: "32 mm", value: 32 },
    { label: "36 mm", value: 36 },
    { label: "40 mm", value: 40 },
  ];
  const { geometry, setGeometry, hasStuds, setHasStuds } =
    useMyBearingsModuleConfigurator();

  const [geometryInputs, setGeometryInputs] = useState({
    g1: `${geometry.g1}`,
    g2: `${geometry.g2}`,
    s1: `${geometry.s1}`,
    s2: `${geometry.s2}`,
    b: `${geometry.b}`,
    c: `${geometry.c}`,
    e1: `${geometry.e1}`,
    e2: `${geometry.e2}`,
    e3: `${geometry.e3}`,
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

  const restoreGeometryInput = (key: keyof typeof geometryInputs) => () => {
    setGeometryInputs((current) => ({
      ...current,
      [key]: `${geometry[key]}`,
    }));
  };

  const updateStudCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextStudCount: 1 | 2 = event.target.value === "2" ? 2 : 1;
    const studDefaults = getStudDefaults(nextStudCount, geometry.s1);

    setGeometry((current) => ({
      ...current,
      n: nextStudCount,
      ...studDefaults,
    }));
    setGeometryInputs((current) => ({
      ...current,
      e2: `${studDefaults.e2}`,
      e3: `${studDefaults.e3}`,
    }));
  };

  const updateBeamType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextIsEndNotchedBeam = event.target.value === "end-notched";

    setGeometry((current) => ({
      ...current,
      isEndNotchedBeam: nextIsEndNotchedBeam,
    }));
  };

  const updateHasStuds = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextHasStuds = event.target.checked;

    setHasStuds(nextHasStuds);
  };

  const updateStudDiameter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextStudDiameter = Number(event.target.value);

    if (Number.isNaN(nextStudDiameter)) {
      return;
    }

    setGeometry((current) => ({
      ...current,
      ds: nextStudDiameter,
    }));
  };

  return (
    <MyVStack gap="sm">
      <MyVStack gap="xs">
        <MyLabel size="small">
          <span className="text-[0.8125rem] font-normal text-zinc-600">
            beam type
          </span>
        </MyLabel>
        <MySegmentedControl
          options={beamTypeOptions}
          size="sm"
          density="dense"
          variant="tabs"
          tone="subtle"
          orientation="vertical"
          value={
            geometry.isEndNotchedBeam ? "end-notched" : "without-end-notch"
          }
          onChange={updateBeamType}
        />
        <MyFieldLabel
          symbol={
            <>
              g<sub>1</sub>
            </>
          }
          description="column-beam offset"
        />
        <MyInput
          type="number"
          size="sm"
          density="compact"
          suffix="mm"
          value={geometryInputs.g1}
          onChange={updateGeometryInput("g1")}
          onBlur={restoreGeometryInput("g1")}
        />
      </MyVStack>

      <MyVStack gap="xs">
        <MyFieldLabel
          symbol={
            <>
              g<sub>2</sub>
            </>
          }
          description="bearing gap"
        />
        <MyInput
          type="number"
          size="sm"
          density="compact"
          suffix="mm"
          value={geometryInputs.g2}
          onChange={updateGeometryInput("g2")}
          onBlur={restoreGeometryInput("g2")}
        />
      </MyVStack>

      <MyVStack gap="xs">
        <MyFieldLabel
          symbol={
            <>
              S<sub>1</sub>
            </>
          }
          description="cantilever width"
        />
        <MyInput
          type="number"
          size="sm"
          density="compact"
          suffix="mm"
          value={geometryInputs.s1}
          onChange={updateGeometryInput("s1")}
          onBlur={restoreGeometryInput("s1")}
        />
      </MyVStack>

      <MyVStack gap="xs">
        <MyFieldLabel
          symbol={
            <>
              S<sub>2</sub>
            </>
          }
          description="cantilever length"
        />
        <MyInput
          type="number"
          size="sm"
          density="compact"
          suffix="mm"
          value={geometryInputs.s2}
          onChange={updateGeometryInput("s2")}
          onBlur={restoreGeometryInput("s2")}
        />
      </MyVStack>

      <MyVStack gap="xs">
        <MyFieldLabel symbol="B" description="beam width" />
        <MyInput
          type="number"
          size="sm"
          density="compact"
          suffix="mm"
          value={geometryInputs.b}
          onChange={updateGeometryInput("b")}
          onBlur={restoreGeometryInput("b")}
        />
      </MyVStack>

      <MyVStack gap="xs">
        <MyFieldLabel symbol="c" description="bearing edge distance" />
        <MyInput
          type="number"
          size="sm"
          density="compact"
          suffix="mm"
          value={geometryInputs.c}
          onChange={updateGeometryInput("c")}
          onBlur={restoreGeometryInput("c")}
        />
      </MyVStack>
      <MyVStack gap="xs">
        <MyCheckbox
          label="stud(s)"
          checked={hasStuds}
          onChange={updateHasStuds}
        />
        {hasStuds ? (
          <>
            <MyFieldLabel symbol="n" description="number of studs" />
            <MySegmentedControl
              options={studsNumber}
              size="sm"
              density="dense"
              variant="tabs"
              tone="subtle"
              value={geometry.n}
              onChange={updateStudCount}
            />
            <MyFieldLabel
              symbol={
                <>
                  d<sub>s</sub>
                </>
              }
              description={
                geometry.n === 1 ? "stud diameter" : "studs diameter"
              }
            />
            <MySelect
              options={studDiameterOptions}
              size="sm"
              value={geometry.ds}
              onChange={updateStudDiameter}
            />
            <MyFieldLabel
              symbol={
                <>
                  e<sub>1</sub>
                </>
              }
              description="edge distance"
            />
            <MyInput
              type="number"
              size="sm"
              density="compact"
              suffix="mm"
              value={geometryInputs.e1}
              onChange={updateGeometryInput("e1")}
              onBlur={restoreGeometryInput("e1")}
            />
            <MyFieldLabel
              symbol={
                <>
                  e<sub>2</sub>
                </>
              }
              description="edge distance"
            />
            <MyInput
              type="number"
              size="sm"
              density="compact"
              suffix="mm"
              value={geometryInputs.e2}
              onChange={updateGeometryInput("e2")}
              onBlur={restoreGeometryInput("e2")}
            />
            {geometry.n === 2 ? (
              <>
                <MyFieldLabel
                  symbol={
                    <>
                      e<sub>3</sub>
                    </>
                  }
                  description="distance between"
                />
                <MyInput
                  type="number"
                  size="sm"
                  density="compact"
                  suffix="mm"
                  value={geometryInputs.e3}
                  onChange={updateGeometryInput("e3")}
                  onBlur={restoreGeometryInput("e3")}
                />{" "}
              </>
            ) : null}
          </>
        ) : null}
      </MyVStack>
    </MyVStack>
  );
}
