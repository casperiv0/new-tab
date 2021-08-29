import { DEFAULT_SETTINGS, LOCAL_GREETING_KEY, Settings } from "./constants";

export function getLocalSettings() {
  const local = window.localStorage.getItem(LOCAL_GREETING_KEY);
  if (!local) return DEFAULT_SETTINGS;

  return JSON.parse(local) as Settings;
}

export function saveLocalSettings(settings: Settings) {
  window.localStorage.setItem(LOCAL_GREETING_KEY, JSON.stringify(settings));
}
