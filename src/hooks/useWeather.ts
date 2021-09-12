import * as React from "react";
import { useTabFocus } from "@casper124578/useful/hooks/useTabFocus";
import { getWeather } from "lib/weather";
import { SettingsWeather } from "types/Settings";
import { Weather } from "types/Weather";

export function useWeather(weatherSettings: SettingsWeather) {
  const isFocused = useTabFocus();
  const [weather, setWeather] = React.useState<Weather | null>(null);

  React.useEffect(() => {
    let interval: NodeJS.Timer;

    if (weatherSettings.show && weatherSettings.location && isFocused) {
      // get the weatherSettings when weatherSettings changes
      getWeather(weatherSettings.location, weatherSettings.unit)
        .then(setWeather)
        .catch(() => setWeather(null));

      // set a new interval when weatherSettings changes
      interval = setInterval(() => {
        getWeather(weatherSettings.location!, weatherSettings.unit)
          .then(setWeather)
          .catch(() => setWeather(null));

        // refresh weatherSettings every 30 minutes
      }, 60 * 30 * 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [weatherSettings, isFocused]);

  return weather;
}
