import Image from "next/image";
import Link from "next/link";
import MyButton from "@/app/components/ui/MyButton";
import MyCard from "@/app/components/ui/MyCard";
import MyField from "@/app/components/ui/MyField";
import MyInput from "@/app/components/ui/MyInput";
import MyLabel from "@/app/components/ui/MyLabel";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-3 py-3">
      <div className="w-full max-w-md space-y-4">
        <MyCard className="w-full space-y-8 border-zinc-200 bg-white p-8 shadow-sm">
          <div className="flex justify-center">
            <div className="rounded-lg bg-white/80 px-2 py-1">
              <Image
                src="/logo/logo-pfeifer-studio-blue-large.svg"
                alt="Logo"
                width={240}
                height={80}
                className="object-contain"
              />
            </div>
          </div>
          <div className="space-y-1 text-center">
            <MyLabel variant="default" size="medium">
              Sign in
            </MyLabel>
          </div>

          <div className="space-y-5">
            <MyField label="Email address">
              <MyInput type="email" />
            </MyField>

            <MyField label="Password">
              <MyInput type="password" />
            </MyField>
          </div>

          <div className="pt-1">
            <Link href="/ui/user">
              <MyButton variant="primary" size="medium">
                Sign in
              </MyButton>
            </Link>
          </div>
        </MyCard>

        <p className="w-full text-center">
          <Link href="/">
            <MyButton variant="outline" size="medium">
              Go back to homepage
            </MyButton>
          </Link>
        </p>
      </div>
    </main>
  );
}
