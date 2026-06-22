"use client";

import MyFieldLabel from "@/app/components/ui/MyFieldLabel";
import MySelect, { type SelectOption } from "@/app/components/ui/MySelect";
import MyVStack from "@/app/components/ui/MyVStack";
import { useMyBearingsModuleConfigurator } from "@/app/components/bearings-module/MyBearingsModuleConfigurator";
import type { MyBearingsModuleFireResistance } from "../model/types";

const fireResistanceOptions: SelectOption<MyBearingsModuleFireResistance>[] = [
  { label: "not specified", value: "not-specified" },
  { label: "R30", value: "R30" },
  { label: "R60", value: "R60" },
  { label: "R120", value: "R120" },
];

export default function MyBearingsModuleFireResistanceForm() {
  const { fireResistance, setFireResistance } =
    useMyBearingsModuleConfigurator();

  const updateFireResistance = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFireResistance(event.target.value as MyBearingsModuleFireResistance);
  };

  return (
    <MyVStack gap="xs">
      <MyFieldLabel symbol="R" description="fire resistance" />
      <MySelect
        options={fireResistanceOptions}
        size="sm"
        value={fireResistance}
        onChange={updateFireResistance}
      />
    </MyVStack>
  );
}
