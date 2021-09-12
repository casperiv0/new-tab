import * as React from "react";
import { SettingsDate } from "types/Settings";
import { getTime } from "lib/time";

export function useTime(dateSettings: SettingsDate) {
  const [time, setTime] = React.useState(getTime(dateSettings.format ?? undefined));

  React.useEffect(() => {
    setTime(getTime(dateSettings.format ?? undefined));

    const interval = setInterval(() => {
      setTime(getTime(dateSettings.format ?? undefined));
    }, 1_000);

    return () => {
      clearInterval(interval);
    };
  }, [dateSettings.format]);

  return time;
}
