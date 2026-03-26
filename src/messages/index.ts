import { deMessages } from "./de";
import { enMessages } from "./en";
import { plMessages } from "./pl";
import type { Locale, Messages } from "./types";

export function getLocale(value: string | string[] | undefined): Locale {
  if (value === "pl") {
    return "pl";
  }

  if (value === "de") {
    return "de";
  }

  return "en";
}

export function getMessages(locale: Locale): Messages {
  if (locale === "pl") {
    return plMessages;
  }

  if (locale === "de") {
    return deMessages;
  }

  return enMessages;
}
