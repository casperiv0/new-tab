import { DEFAULT_SETTINGS } from "lib/constants";
import { getLocalSettings, saveLocalSettings } from "lib/settings";
import * as React from "react";
import { Settings } from "types/Settings";

interface Context {
  settings: Settings;
  setSettings: (settings: Settings) => void;
}

const SettingsContext = React.createContext<Context | undefined>(undefined);

interface ProviderProps {
  children: React.ReactChild | React.ReactChild[];
}
export const SettingsProvider = ({ children }: ProviderProps) => {
  const [settings, setSettings] = React.useState(DEFAULT_SETTINGS);

  React.useEffect(() => {
    const s = getLocalSettings();
    setSettings(s);
  }, []);

  function _setSettings(settings: Settings) {
    setSettings(settings);
    saveLocalSettings(settings);
  }

  const value = { settings, setSettings: _setSettings };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export function useSettings() {
  const context = React.useContext(SettingsContext);
  if (typeof context === "undefined") {
    throw new Error("`useSettings` must be used within a SettingsProvider");
  }

  return context;
}
