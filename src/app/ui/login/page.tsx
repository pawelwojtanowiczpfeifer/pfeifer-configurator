"use client";
import { FormEvent, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import MyButton from "@/app/components/ui/MyButton";
import MyCard from "@/app/components/ui/MyCard";
import MyField from "@/app/components/ui/MyField";
import MyInput from "@/app/components/ui/MyInput";
import MyLabel from "@/app/components/ui/MyLabel";
import { getSupabaseClient } from "@/lib/supabaseClient";
import MyVStack from "@/app/components/ui/MyVStack";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const router = useRouter();

  const getClientOrShowError = async () => {
    try {
      return await getSupabaseClient();
    } catch {
      setMessage("Login is temporarily unavailable. Supabase is not configured.");
      return null;
    }
  };

  const handleSignInSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    const supabase = await getClientOrShowError();

    if (!supabase) {
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Signed in successfully.");
    router.push("/ui/user");
  };

  const handleSignUp = async () => {
    setMessage("");
    const supabase = await getClientOrShowError();

    if (!supabase) {
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Account created. Check your email or try signing in.");
  };

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
            <p className="text-xs text-zinc-500">
              Hydrated: {isHydrated ? "yes" : "no"}
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSignInSubmit}>
            <MyField label="Email address">
              <MyInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </MyField>

            <MyField label="Password">
              <MyInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </MyField>

            {message && <p className="text-sm text-zinc-600">{message}</p>}

            <div className="pt-1">
              <MyVStack>
                <MyButton
                  type="submit"
                  variant="primary"
                  size="medium"
                  className="z-10 w-full"
                >
                  Sign in
                </MyButton>

                <MyButton
                  type="button"
                  variant="outline"
                  size="small"
                  className="z-10 w-full"
                  onClick={handleSignUp}
                >
                  Create account
                </MyButton>
              </MyVStack>
            </div>
          </form>
        </MyCard>

        <div className="w-full text-center">
          <Link
            href="/"
            className="inline-flex rounded-lg border border-blue-600 px-5 py-1 text-base font-medium text-blue-600 transition hover:bg-blue-50"
          >
            Go back to homepage
          </Link>
          {/*This button is just for testing the Supabase client connection and
          session retrieval. */}
          <button
            type="button"
            onClick={async () => {
              const supabase = await getClientOrShowError();

              if (!supabase) {
                return;
              }

              const { data, error } = await supabase.auth.getSession();

              console.log("Supabase session:", data);
              console.log("Supabase error:", error);
            }}
          >
            Test Supabase
          </button>
        </div>
      </div>
    </main>
  );
}
