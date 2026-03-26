export type Locale = "de" | "en" | "pl";

export type Messages = {
  common: {
    german: string;
    english: string;
    home: string;
    polish: string;
    uiPlayground: string;
  };
  home: {
    goToUiPlayground: string;
    title: string;
  };
  ui: {
    buttons: string;
    cards: string;
    checkbox: string;
    drawingCard: string;
    goBackToHomepage: string;
    inputs: string;
    parameterCard: string;
    select: string;
    title: string;
  };
  buttons: {
    cancel: string;
    more: string;
    save: string;
  };
  inputs: {
    amount: string;
    email: string;
    fullName: string;
    number: string;
    password: string;
  };
  checkbox: {
    acceptTermsDescription: string;
    acceptTermsLabel: string;
    includeCalculationsDescription: string;
    includeCalculationsLabel: string;
  };
  cards: {
    drawingPlaceholder: string;
    firstSubtitle: string;
    firstText: string;
    firstTitle: string;
    secondSubtitle: string;
    secondText: string;
    secondTitle: string;
  };
  parameterCard: {
    geometryDescription: string;
    geometryTitle: string;
    workingDescription: string;
    workingTitle: string;
  };
  parameters: {
    coefficient: string;
    length: string;
    mass: string;
    pressure: string;
    temperature: string;
    thickness: string;
    type: string;
    width: string;
    height: string;
  };
  units: {
    bar: string;
    celsius: string;
    kilograms: string;
    millimeters: string;
    none: string;
  };
  selectOptions: {
    custom: string;
    premium: string;
    standard: string;
  };
};
