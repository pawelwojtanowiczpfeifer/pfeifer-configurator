import MySidebar from "@/app/components/ui/MySidebar";
import MyHStack from "@/app/components/ui/MyHStack";
import MyVStack from "@/app/components/ui/MyVStack";
import MyTopbar from "@/app/components/ui/MyTopbar";
import MyBottombar from "@/app/components/ui/MyBottombar";
import Link from "next/link";
import Image from "next/image";
import MyUserAvatar from "@/app/components/ui/MyUserAvatar";
import DrawingCanvas from "@/app/components/drawings/DrawingCanvas";
import DrawingScaleGroup from "@/app/components/drawings/DrawingScaleGroup";
import { DrawingPolygonShape } from "@/app/components/drawings/DrawingPolygon";
import DrawingDimensionLine from "@/app/components/drawings/DrawingDimensionLine";

export default function LoginPage() {
  return (
    <MyHStack width="full" maxWidth="app" centered>
      <MyVStack as="main" height="screen-dynamic" width="full" p="sm" gap="sm">
        <MyTopbar p="md">
          <MyHStack gap="md" align="center" justify="between">
            <Link href="/">
              <Image
                src="/logo/logo-pfeifer-studio-blue-large.svg"
                alt="Logo"
                width={240}
                height={80}
                className="object-contain"
              />
            </Link>

            <MyHStack gap="md" align="center">
              <MyUserAvatar
                name="Pawel"
                size="md"
                backgroundColor="partnerschaft"
              />
            </MyHStack>
          </MyHStack>
        </MyTopbar>
        <MyHStack
          gap="sm"
          align="start"
          justify="start"
          flex={1}
          minHeight="0"
          width="full"
          p="none"
        >
          <MySidebar
            title="Fill in - forms, project name etc."
            size="lg"
            height="full"
          />
          <MySidebar title="Drawing" size="full" height="full">
            <MyHStack
              gap="sm"
              align="center"
              justify="start"
              flex={1}
              minHeight="0"
              width="full"
              p="none"
            >
              <DrawingScaleGroup>
                <DrawingCanvas
                  fit="content"
                  width="full"
                  height="full"
                  px="3xl"
                  py="sm"
                  align="center"
                  justify="center"
                  ariaLabel="Technical drawing preview"
                >
                  <DrawingPolygonShape
                    points={[
                      { x: 0, y: 0 },
                      { x: 200, y: 0 },
                      { x: 200, y: 200 },
                      { x: 350, y: 200 },
                      { x: 350, y: 350 },
                      { x: 200, y: 350 },
                      { x: 200, y: 450 },
                      { x: 0, y: 450 },
                    ]}
                    edges={[
                      {
                        lineWidth: "thin",
                        lineStyle: "dashDot",
                        lineColor: "gray",
                      },
                      {
                        lineWidth: "thin",
                        lineStyle: "solid",
                        lineColor: "black",
                      },
                      {
                        lineWidth: "thin",
                        lineStyle: "solid",
                        lineColor: "black",
                      },
                      {
                        lineWidth: "thin",
                        lineStyle: "solid",
                        lineColor: "black",
                      },
                      {
                        lineWidth: "thin",
                        lineStyle: "solid",
                        lineColor: "black",
                      },
                      {
                        lineWidth: "thin",
                        lineStyle: "solid",
                        lineColor: "black",
                      },
                      {
                        lineWidth: "thin",
                        lineStyle: "dashDot",
                        lineColor: "gray",
                      },
                      {
                        lineWidth: "thin",
                        lineStyle: "dashDot",
                        lineColor: "gray",
                      },
                    ]}
                    hatch={{
                      spacing: 30,
                      variant: "none",
                      color: "#9ca3af",
                      lineWidth: 1,
                      backgroundColor: "lightgray",
                    }}
                  />
                  <DrawingPolygonShape
                    points={[
                      { x: 220, y: 0 },
                      { x: 520, y: 0 },
                      { x: 520, y: 185 },
                      { x: 220, y: 185 },
                    ]}
                    edges={[
                      {
                        lineWidth: "thin",
                        lineStyle: "dashDot",
                        lineColor: "gray",
                      },
                      {
                        lineWidth: "thin",
                        lineStyle: "dashDot",
                        lineColor: "gray",
                      },
                      {
                        lineWidth: "thin",
                        lineStyle: "solid",
                        lineColor: "black",
                      },
                      {
                        lineWidth: "thin",
                        lineStyle: "solid",
                        lineColor: "black",
                      },
                    ]}
                    hatch={{
                      spacing: 20,
                      variant: "cross",
                      color: "gray",
                      lineWidth: 1,
                      backgroundColor: "gainsboro",
                    }}
                  />
                  <DrawingDimensionLine
                    start={{ x: 200, y: 0 }}
                    end={{ x: 220, y: 0 }}
                    value={20}
                    symbol="g1"
                    textSize="lg"
                    textGap={20}
                    dimensionLinePosition="above"
                    arrowSize="xl"
                    arrowStyle="filled"
                  />
                  <DrawingDimensionLine
                    start={{ x: 350, y: 185 }}
                    end={{ x: 350, y: 200 }}
                    value={10}
                    symbol="g2"
                    textSize="lg"
                    textGap={0}
                    textOffsetY={10}
                    dimensionLinePosition="above"
                    arrowSize="xl"
                    arrowStyle="filled"
                    lineColor="black"
                  />
                  <DrawingDimensionLine
                    start={{ x: 200, y: 350 }}
                    end={{ x: 350, y: 350 }}
                    value={15}
                    symbol="S2"
                    textSize="lg"
                    textGap={10}
                    dimensionLinePosition="below"
                    arrowSize="xl"
                    arrowStyle="filled"
                    lineColor="black"
                  />
                </DrawingCanvas>
                <DrawingCanvas
                  fit="content"
                  width="full"
                  height="full"
                  px="3xl"
                  py="sm"
                  align="center"
                  justify="center"
                  ariaLabel="Technical drawing preview"
                >
                  <DrawingPolygonShape
                    points={[
                      { x: 0, y: 0 },
                      { x: 200, y: 0 },
                      { x: 200, y: 300 },
                      { x: 0, y: 300 },
                    ]}
                    edges={[
                      {
                        lineWidth: "thin",
                        lineStyle: "solid",
                        lineColor: "black",
                      },
                      {
                        lineWidth: "thin",
                        lineStyle: "solid",
                        lineColor: "black",
                      },
                      {
                        lineWidth: "thin",
                        lineStyle: "solid",
                        lineColor: "black",
                      },
                      {
                        lineWidth: "thin",
                        lineStyle: "dashDot",
                        lineColor: "gray",
                      },
                    ]}
                    hatch={{
                      spacing: 30,
                      variant: "none",
                      color: "#9ca3af",
                      lineWidth: 1,
                      backgroundColor: "lightgray",
                    }}
                  />
                  <DrawingPolygonShape
                    points={[
                      { x: 200, y: 0 },
                      { x: 350, y: 0 },
                      { x: 350, y: 300 },
                      { x: 200, y: 300 },
                    ]}
                    edges={[
                      {
                        lineWidth: "thin",
                        lineStyle: "solid",
                        lineColor: "black",
                      },
                      {
                        lineWidth: "thin",
                        lineStyle: "solid",
                        lineColor: "black",
                      },
                      {
                        lineWidth: "thin",
                        lineStyle: "solid",
                        lineColor: "black",
                      },
                      {
                        lineWidth: "thin",
                        lineStyle: "solid",
                        lineColor: "black",
                      },
                    ]}
                    hatch={{
                      spacing: 30,
                      variant: "none",
                      color: "#9ca3af",
                      lineWidth: 1,
                      backgroundColor: "lightgray",
                    }}
                  />
                  <DrawingPolygonShape
                    points={[
                      { x: 220, y: 25 },
                      { x: 520, y: 25 },
                      { x: 520, y: 275 },
                      { x: 220, y: 275 },
                    ]}
                    edges={[
                      {
                        lineWidth: "thin",
                        lineStyle: "solid",
                        lineColor: "black",
                      },
                      {
                        lineWidth: "thin",
                        lineStyle: "dashDot",
                        lineColor: "gray",
                      },
                      {
                        lineWidth: "thin",
                        lineStyle: "solid",
                        lineColor: "black",
                      },
                      {
                        lineWidth: "thin",
                        lineStyle: "solid",
                        lineColor: "black",
                      },
                    ]}
                    hatch={{
                      spacing: 20,
                      variant: "cross",
                      color: "gray",
                      lineWidth: 1,
                      backgroundColor: "gainsboro",
                    }}
                  />
                  <DrawingDimensionLine
                    start={{ x: 200, y: 0 }}
                    end={{ x: 220, y: 0 }}
                    value={20}
                    symbol="g1"
                    textSize="lg"
                    textGap={20}
                    dimensionLinePosition="above"
                    arrowSize="xl"
                    arrowStyle="filled"
                    lineColor="black"
                  />
                  <DrawingDimensionLine
                    start={{ x: 400, y: 25 }}
                    end={{ x: 400, y: 275 }}
                    value={250}
                    symbol="B"
                    textSize="lg"
                    textOrientation="vertical"
                    textGap={-10}
                    dimensionLinePosition="above"
                    arrowSize="xl"
                    arrowStyle="filled"
                    lineColor="black"
                  />
                  <DrawingDimensionLine
                    start={{ x: 350, y: 0 }}
                    end={{ x: 350, y: 300 }}
                    value={300}
                    symbol="S1"
                    textSize="lg"
                    textOrientation="vertical"
                    textGap={-15}
                    dimensionLinePosition="above"
                    arrowSize="xl"
                    arrowStyle="filled"
                    lineColor="black"
                  />
                </DrawingCanvas>
              </DrawingScaleGroup>
            </MyHStack>
          </MySidebar>
          <MySidebar title="Results" size="lg" height="full" />
        </MyHStack>

        <MyBottombar>Created by: iPW</MyBottombar>
      </MyVStack>
    </MyHStack>
  );
}
