import { DEFAULT_DATE_FORMAT, Settings, Unit } from "types/Settings";
import {
  DEFAULT_SEARCH_ENGINES,
  DEFAULT_SETTINGS,
  LOCAL_GREETING_KEY,
  Positions,
} from "./constants";

export function parseSettings(settings: Settings) {
  if (!settings.positions) {
    settings.positions = {
      greeting: settings.position ?? Positions.BOTTOM_RIGHT,
      weather: Positions.BOTTOM_LEFT,
    };
  }

  if (!settings.search) {
    settings.search = {
      show: settings.showSearch ?? false,
      engine: settings.searchEngine ?? DEFAULT_SEARCH_ENGINES.duckduckgo,
      newTab: false,
    };
  }

  if (!settings.weather) {
    settings.weather = {
      show: false,
      location: null,
      unit: Unit.METRIC,
    };
  }

  if (!settings.date) {
    settings.date = {
      format: DEFAULT_DATE_FORMAT,
    };
  }

  if (!settings.bookmark) {
    settings.bookmark = {
      bookmarks: [],
      newTab: true,
      enabled: true,
    };
  }

  if (settings.bookmark && typeof settings.bookmark.enabled === "undefined") {
    settings.bookmark.enabled = true;
  }

  if (settings.bookmarks) {
    settings.bookmark = {
      bookmarks: settings.bookmarks,
      newTab: settings.bookmark.newTab,
      enabled: true,
    };

    delete settings.bookmarks;
  }

  if (!settings.cursor) {
    settings.cursor = {
      enabled: false,
      timeout: 5,
    };
  }

  return settings;
}

export function getLocalSettings() {
  const local = window.localStorage.getItem(LOCAL_GREETING_KEY);
  if (!local) return DEFAULT_SETTINGS;

  const parsed = JSON.parse(local) as Settings;
  return parseSettings(parsed);
}

export function saveLocalSettings(settings: Settings) {
  window.localStorage.setItem(LOCAL_GREETING_KEY, JSON.stringify(settings));
}
