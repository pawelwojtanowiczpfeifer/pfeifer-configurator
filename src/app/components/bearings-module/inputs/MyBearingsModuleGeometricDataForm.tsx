"use client";

import { useState } from "react";
import MyInput from "@/app/components/ui/MyInput";
import MyLabel from "@/app/components/ui/MyLabel";
import MyVStack from "@/app/components/ui/MyVStack";
import { useMyBearingsModuleConfigurator } from "@/app/components/bearings-module/MyBearingsModuleConfigurator";
import MyCheckbox from "../../ui/MyCheckbox";
import MySelect from "../../ui/MySelect";
import MyDivider from "../../ui/MyDivider";

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
  const studsNumber = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
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
    ds: `${geometry.ds}`,
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

  const updateStudCount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextStudCount = Number(event.target.value) as
      | (typeof studsNumber)[number]["value"];
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

  const updateHasStuds = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextHasStuds = event.target.checked;

    setHasStuds(nextHasStuds);
    setGeometry((current) => ({
      ...current,
      n: nextHasStuds ? (current.n === 0 ? 1 : current.n) : 0,
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
        <MyCheckbox
          label="stud(s)"
          checked={hasStuds}
          onChange={updateHasStuds}
        />
        {hasStuds ? (
          <>
            <MyLabel size="small">
              number of studs (<b>n</b>)
            </MyLabel>
            <MySelect
              options={studsNumber}
              size="sm"
              value={geometry.n}
              onChange={updateStudCount}
            />
            <MyLabel size="small">
              {geometry.n === 1 ? "stud diameter " : "studs diameter "}(
              <b>
                d<sub>s</sub>
              </b>
              )
            </MyLabel>
            <MyInput
              type="number"
              size="sm"
              density="compact"
              suffix="mm"
              value={geometryInputs.ds}
              onChange={updateGeometryInput("ds")}
              onBlur={restoreGeometryInput("ds")}
            />
            <MyLabel size="small">
              edge distance (
              <b>
                e<sub>1</sub>
              </b>
              )
            </MyLabel>
            <MyInput
              type="number"
              size="sm"
              density="compact"
              suffix="mm"
              value={geometryInputs.e1}
              onChange={updateGeometryInput("e1")}
              onBlur={restoreGeometryInput("e1")}
            />
            <MyLabel size="small">
              edge distance (
              <b>
                e<sub>2</sub>
              </b>
              )
            </MyLabel>
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
                <MyLabel size="small">
                  distance between (
                  <b>
                    e<sub>3</sub>
                  </b>
                  )
                </MyLabel>
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
