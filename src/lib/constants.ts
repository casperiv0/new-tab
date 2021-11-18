import { DEFAULT_DATE_FORMAT, Settings, Unit } from "src/types/Settings";

export const POSITION_CLASSES = ["topRight", "bottomLeft", "bottomRight"] as const;

export enum Positions {
  TOP_RIGHT = 0,
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
}

export const LOCAL_GREETING_KEY = "NEW_TAB_SETTINGS";

export type Theme = "dark" | "light";

// eslint-disable-next-line @typescript-eslint/ban-types
export type SearchEngine = DefaultSearchEngines | (string & {});
export type DefaultSearchEngines = keyof typeof DEFAULT_SEARCH_ENGINES;
export const DEFAULT_SEARCH_ENGINES = {
  duckduckgo: "https://duckduckgo.com?q=",
  startpage: "https://www.startpage.com/sp/search?q=",
  bravesearch: "https://search.brave.com/search?q=",
  bing: "https://bing.com/search?q=",
  google: "https://google.com/search?q=",
};

export const DEFAULT_SETTINGS: Settings = {
  theme: "dark",
  backgroundUrl: null,
  search: {
    show: false,
    engine: DEFAULT_SEARCH_ENGINES.duckduckgo,
    newTab: false,
  },
  weather: {
    show: false,
    location: null,
    unit: Unit.METRIC,
  },
  positions: {
    greeting: Positions.BOTTOM_RIGHT,
    weather: Positions.BOTTOM_LEFT,
  },
  date: {
    format: DEFAULT_DATE_FORMAT,
  },
  cursor: {
    enabled: false,
    timeout: 5,
  },
  bookmark: {
    bookmarks: [],
    newTab: true,
    enabled: true,
  },
  bookmarks: undefined,
  position: undefined,
  searchEngine: undefined,
  showSearch: undefined,
};
