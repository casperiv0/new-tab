import { SearchEngine, Theme } from "lib/constants";

export const DEFAULT_DATE_FORMAT = "EEEE • HH:mm";
export enum Unit {
  METRIC = "metric",
  IMPERIAL = "imperial",
}

export enum Tabs {
  GENERAL,
  APPEARANCE,
  SEARCH,
  DATE,
  WEATHER,
  BOOKMARKS,
  ADVANCED,
}

export interface Settings {
  positions: SettingsPositions;
  theme: Theme;
  date: SettingsDate;
  backgroundUrl: string | null;
  bookmark: SettingsBookmark;
  cursor: SettingsCursor;

  // new stuff
  search: SettingsSearch;
  weather: SettingsWeather;

  /** @deprecated */
  showSearch: boolean | undefined;

  /** @deprecated */
  searchEngine: string | undefined;

  /** @deprecated */
  position: number | undefined;

  /** @deprecated */
  bookmarks: Bookmark[] | undefined;
}

export interface SettingsPositions {
  weather: number;
  greeting: number;
}

export interface SettingsSearch {
  show: boolean;
  engine: SearchEngine;
  newTab: boolean;
}

export interface SettingsWeather {
  show: boolean;
  location: string | null;
  unit: Unit;
}

export interface SettingsDate {
  format: string | null;
}

export interface Bookmark {
  url: string;
  faviconUrl: string | null;
}

export interface SettingsCursor {
  enabled: boolean;
  /** timeout in seconds */
  timeout: number;
}

export interface SettingsBookmark {
  newTab: boolean;
  enabled: boolean;
  bookmarks: Bookmark[];
}
