export const UI_COLORS = {
  pfeifer: {
    name: "PFEIFER",
    hex: "#001871",
    contrastTextHex: "#ffffff",
  },
  technologie: {
    name: "Technologie",
    hex: "#627e88",
    contrastTextHex: "#ffffff",
  },
  silber: {
    name: "Silber",
    hex: "#a4aab1",
    contrastTextHex: "#171717",
  },
  natur: {
    name: "Natur",
    hex: "#c3aa83",
    contrastTextHex: "#171717",
  },
  partnerschaft: {
    name: "Partnerschaft",
    hex: "#b7352f",
    contrastTextHex: "#ffffff",
  },
  akzentblau: {
    name: "Akzentblau",
    hex: "#003fb5",
    contrastTextHex: "#ffffff",
  },
  stahlblau: {
    name: "Stahlblau",
    hex: "#91b5bf",
    contrastTextHex: "#171717",
  },
  draht: {
    name: "Draht",
    hex: "#e0e0e0",
    contrastTextHex: "#171717",
  },
  hanfSisal: {
    name: "Hanf / Sisal",
    hex: "#e0ceb0",
    contrastTextHex: "#171717",
  },
  auszeichnung: {
    name: "Auszeichnung",
    hex: "#ff4723",
    contrastTextHex: "#ffffff",
  },
  black: {
    name: "Black",
    hex: "#000000",
    contrastTextHex: "#ffffff",
  },
  white: {
    name: "White",
    hex: "#ffffff",
    contrastTextHex: "#171717",
  },
} as const;

export type UIColorName = keyof typeof UI_COLORS;
