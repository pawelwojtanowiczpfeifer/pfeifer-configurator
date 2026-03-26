import Link from "next/link";
import Button from "./components/ui/Button";
import LanguageSwitcher from "./components/ui/LanguageSwitcher";
import { getLocale, getMessages } from "@/messages";

type HomePageProps = {
  searchParams: Promise<{ lang?: string | string[] }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const { lang } = await searchParams;
  const locale = getLocale(lang);
  const messages = getMessages(locale);

  return (
    <main className="space-y-6 p-10">
      <div className="flex items-center justify-between gap-4">
        <LanguageSwitcher currentLocale={locale} pathname="/" />
      </div>

      <Link href={{ pathname: "/ui", query: { lang: locale } }}>
        <Button>{messages.home.goToUiPlayground}</Button>
      </Link>

      <header className="space-y-2 py-5">
        <h1 className="text-2xl font-bold">{messages.home.title}</h1>
      </header>
    </main>
  );
}
