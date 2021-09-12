import * as React from "react";
import Head from "next/head";
import { Gear } from "react-bootstrap-icons";
import { useTabFocus } from "@casper124578/useful/hooks/useTabFocus";
import type { Weather } from "types/Weather";
import type { Settings as ISettings } from "types/Settings";
import { getTime } from "lib/time";
import { Settings } from "components/Settings";
import { POSITION_CLASSES, DEFAULT_SETTINGS } from "lib/constants";
import { Search } from "components/Search";
import { getLocalSettings, saveLocalSettings } from "lib/settings";
import { getWeather } from "lib/weather";

export default function Index() {
  const isFocused = useTabFocus();

  const [settings, setSettings] = React.useState<ISettings>(DEFAULT_SETTINGS);
  const [weather, setWeather] = React.useState<Weather | null>(null);

  const [open, setOpen] = React.useState(false);
  const [time, setTime] = React.useState(getTime(settings.date?.format ?? undefined));

  React.useEffect(() => {
    let interval: NodeJS.Timer;

    if (settings.weather.show && settings.weather.location && isFocused) {
      // get the weather when settings.weather changes
      getWeather(settings.weather.location, "metric")
        .then(setWeather)
        .catch(() => setWeather(null));

      // set a new interval when settings.weather changes
      interval = setInterval(() => {
        getWeather(settings.weather.location!, "metric")
          .then(setWeather)
          .catch(() => setWeather(null));

        // refresh weather every 30 minutes
      }, 60 * 30 * 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [settings.weather, isFocused]);

  React.useEffect(() => {
    const s = getLocalSettings();

    setSettings(s);
    document.body.classList.add(s.theme);

    const interval = setInterval(() => {
      setTime(getTime(settings.date?.format ?? undefined));
    }, 1_000);

    return () => clearInterval(interval);
  }, [settings.date?.format]);

  function saveSettings(s: ISettings) {
    setSettings(s);
    saveLocalSettings(s);
  }

  return (
    <>
      <Head>
        <title>New tab</title>
      </Head>

      <>
        <button aria-label="Enter settings" onClick={() => setOpen(true)} className="settingsBtn">
          <Gear fill="var(--secondary)" width="20px" height="20px" />
        </button>

        <div className={`${POSITION_CLASSES[settings.positions.greeting]}Container`}>
          <h1 className="greetingText">{time.greeting}</h1>
          <h2 className="timeText">{time.formattedTime}</h2>
        </div>

        {settings.weather.show ? (
          <div
            style={{ opacity: weather ? 1 : 0, transition: "200ms" }}
            title={weather?.weather[0]?.description!}
            className={`${POSITION_CLASSES[settings.positions.weather]}Container`}
          >
            <p className="weatherText">{weather?.main.temp.toFixed(0)}°C</p>
          </div>
        ) : null}

        <Settings
          open={open}
          onSettingsChange={saveSettings}
          settings={settings}
          onClose={() => {
            setOpen(false);
          }}
        />
        {settings.search.show && <Search settings={settings} focusable={!open} />}
      </>
    </>
  );
}
