import Image from "next/image";
import Link from "next/link";
import MyButton from "@/app/components/ui/MyButton";
import MyHeader from "@/app/components/ui/MyHeader";
import MyUserAvatar from "@/app/components/ui/MyUserAvatar";
import MySelect from "@/app/components/ui/MySelect";
import MyRow from "@/app/components/ui/MyRow";

export default function LoginPage() {
  const selectLanguageOptions = [
    { label: "EN", value: "en" },
    { label: "PL", value: "pl" },
    { label: "DE", value: "de" },
  ];

  return (
    <main className="space-y-3 p-3">
      <MyHeader
        backgroundColor="pfeifer"
        leftContent={
          <Image
            src="/logo/logo-pfeifer-studio-white-large.svg"
            alt="Logo"
            width={240}
            height={80}
            className="object-contain"
          />
        }
        rightContent={
          <MyRow gap="medium" align="center">
            <MySelect
              options={selectLanguageOptions}
              defaultValue="en"
              fullWidth={false}
              widthPreset="sm"
            ></MySelect>
            <MyUserAvatar name="Pawel" size="lg" backgroundColor="akzentblau" />
          </MyRow>
        }
      />

      <Link href="/">
        <MyButton variant="outline" size="medium">
          Go back to homepage
        </MyButton>
      </Link>
    </main>
  );
}
