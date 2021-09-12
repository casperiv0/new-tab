import { DEFAULT_DATE_FORMAT, Settings } from "src/types/Settings";

export const POSITION_CLASSES = ["topRight", "bottomLeft", "bottomRight"] as const;

export enum Positions {
  TOP_RIGHT = 0,
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
}

export const LOCAL_GREETING_KEY = "NEW_TAB_SETTINGS";

export type Theme = "dark" | "light";

export const DEFAULT_SETTINGS: Settings = {
  theme: "dark",
  search: {
    show: false,
    engine: "https://duckduckgo.com",
  },
  weather: {
    show: false,
    location: null,
  },
  positions: {
    greeting: Positions.BOTTOM_RIGHT,
    weather: Positions.BOTTOM_LEFT,
  },
  date: {
    format: DEFAULT_DATE_FORMAT,
  },

  position: undefined,
  searchEngine: undefined,
  showSearch: undefined,
} as const;
