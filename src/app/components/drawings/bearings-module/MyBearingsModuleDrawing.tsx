import MyHStack from "@/app/components/ui/MyHStack";
import MyDrawingScaleGroup from "../primitives/MyDrawingScaleGroup";
import MyBearingsSideView from "./MyBearingsSideView";
import MyBearingsTopView from "./MyBearingsTopView";
import type { MyBearingsModuleDrawingProps } from "./types";

export default function MyBearingsModuleDrawing({
  g1,
  g2,
  s1,
  s2,
  b,
  className,
  ariaLabel = "Bearings module drawing",
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
          g1={g1}
          g2={g2}
          s1={s1}
          s2={s2}
          b={b}
          ariaLabel={`${ariaLabel} side view`}
        />
        <MyBearingsTopView
          g1={g1}
          g2={g2}
          s1={s1}
          s2={s2}
          b={b}
          ariaLabel={`${ariaLabel} top view`}
        />
      </MyDrawingScaleGroup>
    </MyHStack>
  );
}
