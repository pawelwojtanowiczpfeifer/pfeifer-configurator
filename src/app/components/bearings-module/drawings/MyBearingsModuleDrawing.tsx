import MyHStack from "@/app/components/ui/MyHStack";
import MyDrawingScaleGroup from "@/app/components/drawings/primitives/MyDrawingScaleGroup";
import MyBearingsSideView from "./MyBearingsSideView";
import MyBearingsTopView from "./MyBearingsTopView";
import type { MyBearingsModuleDrawingProps } from "./types";

export default function MyBearingsModuleDrawing({
  g1,
  g2,
  s1,
  s2,
  b,
  c,
  className,
  ariaLabel = "Bearings module drawing",
  ...geometry
}: MyBearingsModuleDrawingProps) {
  return (
    <MyHStack
      gap="sm"
      align="center"
      justify="center"
      width="full"
      minHeight="0"
      p="none"
      className={className}
    >
      <MyDrawingScaleGroup>
        <MyBearingsSideView
          {...geometry}
          g1={g1}
          g2={g2}
          s1={s1}
          s2={s2}
          b={b}
          c={c}
          ariaLabel={`${ariaLabel} side view`}
        />
        <MyBearingsTopView
          {...geometry}
          g1={g1}
          g2={g2}
          s1={s1}
          s2={s2}
          b={b}
          c={c}
          ariaLabel={`${ariaLabel} top view`}
        />
      </MyDrawingScaleGroup>
    </MyHStack>
  );
}
