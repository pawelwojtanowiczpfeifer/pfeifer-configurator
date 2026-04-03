import Image from "next/image";
import Link from "next/link";
import MyButton from "@/app/components/ui/MyButton";
import MyCard from "@/app/components/ui/MyCard";
import MyField from "@/app/components/ui/MyField";
import MyInput from "@/app/components/ui/MyInput";
import MyLabel from "@/app/components/ui/MyLabel";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 space-y-4">
      <MyCard className="w-full max-w-md space-y-6">
        <div className="flex justify-center">
          <Image
            src="/logo/logo-pfeifer-studio-large.svg"
            alt="Logo"
            width={240}
            height={80}
            className="object-contain"
          />
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold">Sign in</h1>
          <MyLabel variant="muted" size="small">
            Enter your credentials to continue.
          </MyLabel>
        </div>

        <MyField label="Email address">
          <MyInput type="email" />
        </MyField>

        <MyField label="Password">
          <MyInput type="password" />
        </MyField>

        <MyButton>Sign in</MyButton>
      </MyCard>
      <p className="w-full max-w-md">
        <Link href="/">
          <MyButton variant="outline" size="medium">
            Go back to homepage
          </MyButton>
        </Link>
      </p>
    </main>
  );
}
