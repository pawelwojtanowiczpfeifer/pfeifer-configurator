import type { Messages } from "./types";

export const plMessages: Messages = {
  common: {
    german: "Deutsch",
    english: "English",
    home: "Start",
    polish: "Polski",
    uiPlayground: "Plac zabaw UI",
  },
  home: {
    goToUiPlayground: "Przejd\u017a do UI Playground",
    title: "Strona g\u0142\u00f3wna",
  },
  ui: {
    buttons: "Buttons",
    cards: "Cards",
    checkbox: "Checkbox",
    drawingCard: "DrawingCard",
    goBackToHomepage: "Wr\u00f3\u0107 do strony g\u0142\u00f3wnej",
    inputs: "Inputs",
    parameterCard: "ParameterCard",
    select: "Select",
    title: "UI Playground",
  },
  buttons: {
    cancel: "Anuluj",
    more: "Wi\u0119cej",
    save: "Zapisz",
  },
  inputs: {
    amount: "Kwota",
    email: "Email",
    fullName: "Imi\u0119 i nazwisko",
    number: "Liczba",
    password: "Has\u0142o",
  },
  checkbox: {
    acceptTermsDescription: "Przyk\u0142adowy checkbox z kr\u00f3tkim opisem.",
    acceptTermsLabel: "Akceptuj\u0119 regulamin",
    includeCalculationsDescription:
      "Domy\u015blnie zaznaczona opcja do pokazania stanu checked.",
    includeCalculationsLabel: "Uwzgl\u0119dnij obliczenia dodatkowe",
  },
  cards: {
    drawingPlaceholder: "Tu b\u0119dzie rysunek (np. SVG)",
    firstSubtitle: "Opis karty",
    firstText:
      "Opis karty, kt\u00f3ry mo\u017ce by\u0107 d\u0142u\u017cszy i zajmowa\u0107 kilka linii tekstu, aby pokaza\u0107 jak komponent radzi sobie z wi\u0119ksz\u0105 ilo\u015bci\u0105 tre\u015bci.",
    firstTitle: "Tytu\u0142 karty",
    secondSubtitle: "Druga karta pokazuj\u0105ca reu\u017cywalno\u015b\u0107",
    secondText: "Druga karta pokazuj\u0105ca, \u017ce komponent jest reu\u017cywalny.",
    secondTitle: "Projekt",
  },
  parameterCard: {
    geometryDescription: "Podstawowe wymiary elementu",
    geometryTitle: "Parametry geometryczne",
    workingDescription: "Przyk\u0142ad drugiego zestawu parametr\u00f3w",
    workingTitle: "Parametry robocze",
  },
  parameters: {
    coefficient: "Wsp\u00f3\u0142czynnik",
    height: "Wysoko\u015b\u0107",
    length: "D\u0142ugo\u015b\u0107",
    mass: "Masa",
    pressure: "Ci\u015bnienie",
    temperature: "Temperatura",
    thickness: "Grubo\u015b\u0107",
    type: "Typ wykonania",
    width: "Szeroko\u015b\u0107",
  },
  units: {
    bar: "bar",
    celsius: "\u00B0C",
    kilograms: "kg",
    millimeters: "mm",
    none: "-",
  },
  selectOptions: {
    custom: "Niestandardowy",
    premium: "Premium",
    standard: "Standard",
  },
};
