import Image from "next/image";
import Link from "next/link";
import {
  MyBearingsContactAreaResult,
  MyBearingsEffectiveSurfaceAreaResult,
  MyBearingsModuleConfigurator,
  MyBearingsModuleDrawingContent,
  MyBearingsModuleFireResistanceForm,
  MyBearingsModuleForceAndDeformationForm,
  MyBearingsModuleGeometricDataForm,
} from "@/app/components/bearings-module";
import MyBottombar from "@/app/components/ui/MyBottombar";
import MyHStack from "@/app/components/ui/MyHStack";
import MySidebar from "@/app/components/ui/MySidebar";
import MyTopbar from "@/app/components/ui/MyTopbar";
import MyUserAvatar from "@/app/components/ui/MyUserAvatar";
import MyVStack from "@/app/components/ui/MyVStack";

export default function CalcPage() {
  return (
    <MyBearingsModuleConfigurator>
      <MyHStack width="full" maxWidth="app" centered>
        <MyVStack as="main" width="full" p="sm" gap="sm" className="min-h-dvh">
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
            align="stretch"
            justify="start"
            flex={1}
            minHeight="0"
            width="full"
            p="none"
          >
            <MySidebar title="Geometric" size="lg" height="full">
              <MyBearingsModuleGeometricDataForm />
            </MySidebar>
            <MyVStack flex={1} minHeight="0" gap="sm">
              <MyHStack gap="sm" align="stretch" width="full">
                <MySidebar title="Force and Deformation" size="full" flex={4}>
                  <MyBearingsModuleForceAndDeformationForm />
                </MySidebar>
                <MySidebar title="Fire resistance" size="full" flex={1}>
                  <MyBearingsModuleFireResistanceForm />
                </MySidebar>
              </MyHStack>
              <MySidebar title="Drawing" size="full" height="full" flex={1}>
                <MyBearingsModuleDrawingContent />
              </MySidebar>
            </MyVStack>
            <MySidebar title="Results" size="lg" height="full">
              <MyBearingsContactAreaResult />
              <MyBearingsEffectiveSurfaceAreaResult />
            </MySidebar>
          </MyHStack>

          <MyBottombar>Created by: iPW</MyBottombar>
        </MyVStack>
      </MyHStack>
    </MyBearingsModuleConfigurator>
  );
}
