import Image from "next/image";
import Link from "next/link";
import MyBearingsModuleConfigurator from "@/app/components/bearings-module/MyBearingsModuleConfigurator";
import MyBearingsModuleDrawingContent from "@/app/components/bearings-module/MyBearingsModuleDrawingContent";
import MyUserInputGeometricData from "@/app/components/user-input-data/bearings-module/MyUserInputGeometricData";
import MyBottombar from "@/app/components/ui/MyBottombar";
import MyHStack from "@/app/components/ui/MyHStack";
import MyDivider from "@/app/components/ui/MyDivider";
import MyInput from "@/app/components/ui/MyInput";
import MyLabel from "@/app/components/ui/MyLabel";
import MySidebar from "@/app/components/ui/MySidebar";
import MyTopbar from "@/app/components/ui/MyTopbar";
import MyUserAvatar from "@/app/components/ui/MyUserAvatar";
import MyVStack from "@/app/components/ui/MyVStack";

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
          <MyBearingsModuleConfigurator>
            <MySidebar
              title="Fill in - forms, project name etc."
              size="lg"
              height="full"
            >
              <MyLabel size="small">Project name</MyLabel>
              <MyInput placeholder="Enter project name" />
              <MyDivider />
              <MyUserInputGeometricData />
            </MySidebar>
            <MySidebar title="Drawing" size="full" height="full">
              <MyBearingsModuleDrawingContent />
            </MySidebar>
            <MySidebar title="Results" size="lg" height="full" />
          </MyBearingsModuleConfigurator>
        </MyHStack>

        <MyBottombar>Created by: iPW</MyBottombar>
      </MyVStack>
    </MyHStack>
  );
}
