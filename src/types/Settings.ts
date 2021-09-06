import { Theme } from "lib/constants";

export interface Settings {
  positions: SettingsPositions;
  theme: Theme;

  // new stuff
  search: SettingsSearch;
  weather: SettingsWeather;

  /** @deprecated */
  showSearch: boolean | undefined;

  /** @deprecated */
  searchEngine: string | undefined;

  /** @deprecated */
  position: number | undefined;
}

export interface SettingsPositions {
  weather: number;
  greeting: number;
}

export interface SettingsSearch {
  show: boolean;
  engine: string;
}

export interface SettingsWeather {
  show: boolean;
  location: string | null;
}
