"use client";

import { useState } from "react";
import MyInput from "@/app/components/ui/MyInput";
import MyLabel from "@/app/components/ui/MyLabel";
import MyVStack from "@/app/components/ui/MyVStack";
import { useMyBearingsModuleConfigurator } from "@/app/components/bearings-module/MyBearingsModuleConfigurator";
import MyCheckbox from "../../ui/MyCheckbox";
import MySelect from "../../ui/MySelect";

export default function MyBearingsModuleGeometricDataForm() {
  const studsNumber = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
  ];
  const { geometry, setGeometry } = useMyBearingsModuleConfigurator();

  const [geometryInputs, setGeometryInputs] = useState({
    g1: `${geometry.g1}`,
    g2: `${geometry.g2}`,
    s1: `${geometry.s1}`,
    s2: `${geometry.s2}`,
    b: `${geometry.b}`,
    c: `${geometry.c}`,
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

  return (
    <MyVStack gap="sm">
      <MyVStack gap="xs">
        <MyLabel size="small">
          column-beam offset (
          <b>
            g<sub>1</sub>
          </b>
          )
        </MyLabel>
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
        <MyLabel size="small">
          bearing gap (
          <b>
            g<sub>2</sub>
          </b>
          )
        </MyLabel>
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
        <MyLabel size="small">
          cantilever width (
          <b>
            S<sub>1</sub>
          </b>
          )
        </MyLabel>
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
        <MyLabel size="small">
          cantilever length (
          <b>
            S<sub>2</sub>
          </b>
          )
        </MyLabel>
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
        <MyLabel size="small">
          beam width (<b>B</b>)
        </MyLabel>
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
        <MyLabel size="small">
          bearing edge distance (<b>c</b>)
        </MyLabel>
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
        <MyCheckbox label="studs" />
        <MyLabel size="small">
          number of studs (<b>n</b>)
        </MyLabel>
        <MySelect options={studsNumber} size="sm" defaultValue="1" />
        <MyLabel size="small">
          bearing edge distance (<b>c</b>)
        </MyLabel>
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
    </MyVStack>
  );
}
