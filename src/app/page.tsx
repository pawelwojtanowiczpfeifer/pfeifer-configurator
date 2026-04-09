import Link from "next/link";
import MyButton from "./components/ui/MyButton";
import Image from "next/image";

export default function Home() {
  return (
    <main className="space-y-3 p-3">
      <div className="space-y-2 py-5">
        <Image
          src="/logo/logo-pfeifer-studio-blue-large.svg"
          alt="Logo"
          width={240}
          height={80}
          className="object-contain"
        />
      </div>
      <header className="space-y-2 py-5">
        <h1 className="text-2xl font-bold">Home Page</h1>
      </header>
      <div>
        <Link href="/ui">
          <MyButton variant="primary" size="medium">
            Go to UI Playground
          </MyButton>
        </Link>
      </div>

      <div>
        <Link href="/ui/login">
          <MyButton variant="primary" size="medium">
            Go to Login Page
          </MyButton>
        </Link>
      </div>

      <div>
        <Link href="/ui/user">
          <MyButton variant="primary" size="medium">
            Go to User Page
          </MyButton>
        </Link>
      </div>
    </main>
  );
}
