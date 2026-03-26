import Link from "next/link";
import type { Locale } from "@/messages/types";

export type LanguageSwitcherProps = {
  currentLocale: Locale;
  pathname: string;
};

function languageLinkClassName(active: boolean) {
  return active
    ? "rounded-md bg-blue-600 px-3 py-1 text-sm font-medium text-white"
    : "rounded-md border border-slate-300 px-3 py-1 text-sm font-medium text-slate-700 transition hover:bg-slate-50";
}

export default function LanguageSwitcher({
  currentLocale,
  pathname,
}: LanguageSwitcherProps) {
  return (
    <div className="flex items-center gap-2">
      <Link
        href={{ pathname, query: { lang: "en" } }}
        className={languageLinkClassName(currentLocale === "en")}
      >
        EN
      </Link>
      <Link
        href={{ pathname, query: { lang: "pl" } }}
        className={languageLinkClassName(currentLocale === "pl")}
      >
        PL
      </Link>
      <Link
        href={{ pathname, query: { lang: "de" } }}
        className={languageLinkClassName(currentLocale === "de")}
      >
        DE
      </Link>
    </div>
  );
}
