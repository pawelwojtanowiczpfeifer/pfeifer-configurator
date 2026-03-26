import type { Messages } from "./types";

export const enMessages: Messages = {
  common: {
    german: "Deutsch",
    english: "English",
    home: "Home",
    polish: "Polski",
    uiPlayground: "UI Playground",
  },
  home: {
    goToUiPlayground: "Go to UI Playground",
    title: "Home Page",
  },
  ui: {
    buttons: "Buttons",
    cards: "Cards",
    checkbox: "Checkbox",
    drawingCard: "DrawingCard",
    goBackToHomepage: "Go back to homepage",
    inputs: "Inputs",
    parameterCard: "ParameterCard",
    select: "Select",
    title: "UI Playground",
  },
  buttons: {
    cancel: "Cancel",
    more: "More",
    save: "Save",
  },
  inputs: {
    amount: "Amount",
    email: "Email",
    fullName: "Full name",
    number: "Number",
    password: "Password",
  },
  checkbox: {
    acceptTermsDescription: "Example checkbox with a short description.",
    acceptTermsLabel: "I accept the terms",
    includeCalculationsDescription:
      "Checked by default to show the checked state.",
    includeCalculationsLabel: "Include additional calculations",
  },
  cards: {
    drawingPlaceholder: "Drawing will go here (e.g. SVG)",
    firstSubtitle: "Card description",
    firstText:
      "Card description can be longer and span multiple lines to show how the component handles more content.",
    firstTitle: "Card title",
    secondSubtitle: "Second card showing reusability",
    secondText: "A second card showing that the component is reusable.",
    secondTitle: "Project",
  },
  parameterCard: {
    geometryDescription: "Basic dimensions of the element",
    geometryTitle: "Geometry parameters",
    workingDescription: "Example of a second parameter set",
    workingTitle: "Operating parameters",
  },
  parameters: {
    coefficient: "Coefficient",
    height: "Height",
    length: "Length",
    mass: "Mass",
    pressure: "Pressure",
    temperature: "Temperature",
    thickness: "Thickness",
    type: "Execution type",
    width: "Width",
  },
  units: {
    bar: "bar",
    celsius: "\u00B0C",
    kilograms: "kg",
    millimeters: "mm",
    none: "-",
  },
  selectOptions: {
    custom: "Custom",
    premium: "Premium",
    standard: "Standard",
  },
};
