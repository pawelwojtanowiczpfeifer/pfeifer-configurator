import MySidebar from "@/app/components/ui/MySidebar";
import MyHStack from "@/app/components/ui/MyHStack";
import MyVStack from "@/app/components/ui/MyVStack";
import MyTopbar from "@/app/components/ui/MyTopbar";
import MyBottombar from "@/app/components/ui/MyBottombar";
import Link from "next/link";
import Image from "next/image";
import MyUserAvatar from "@/app/components/ui/MyUserAvatar";

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
            title="Hi Pawel, here is your content"
            size="lg"
            height="full"
          />
          <MySidebar title="Add new project" size="full" height="full">
            <Link href="/ui/calc">
              <Image
                src="/icon/plus-icon-100-100.svg"
                alt="Add"
                width={40}
                height={40}
                className="object-contain"
              />
            </Link>
          </MySidebar>
          <MySidebar
            title="Hi Pawel, here is your content"
            size="lg"
            height="full"
          />
        </MyHStack>

        <MyBottombar children={undefined}></MyBottombar>
      </MyVStack>
    </MyHStack>
  );
}
