import { Settings } from "types/Settings";
import { DEFAULT_SETTINGS, LOCAL_GREETING_KEY, Positions } from "./constants";

export function getLocalSettings() {
  const local = window.localStorage.getItem(LOCAL_GREETING_KEY);
  if (!local) return DEFAULT_SETTINGS;

  const parsed = JSON.parse(local) as Settings;

  if (!parsed.positions) {
    parsed.positions = {
      greeting: parsed.position ?? Positions.BOTTOM_RIGHT,
      weather: Positions.BOTTOM_LEFT,
    };
  }

  if (!parsed.search) {
    parsed.search = {
      show: parsed.showSearch ?? false,
      engine: parsed.searchEngine ?? "https://duckduckgo.com",
    };
  }

  return parsed;
}

export function saveLocalSettings(settings: Settings) {
  window.localStorage.setItem(LOCAL_GREETING_KEY, JSON.stringify(settings));
}
