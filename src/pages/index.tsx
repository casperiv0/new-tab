import * as React from "react";
import Head from "next/head";
import { Gear } from "react-bootstrap-icons";
import type { Weather } from "types/Weather";
import type { Settings as ISettings } from "types/Settings";
import { getTime } from "lib/time";
import { Settings } from "components/Settings";
import { POSITION_CLASSES, DEFAULT_SETTINGS } from "lib/constants";
import { Search } from "components/Search";
import { getLocalSettings, saveLocalSettings } from "lib/settings";
import { getWeather } from "lib/weather";

export default function Index() {
  const [open, setOpen] = React.useState(false);
  const [time, setTime] = React.useState(getTime());

  const [settings, setSettings] = React.useState<ISettings>(DEFAULT_SETTINGS);
  const [weather, setWeather] = React.useState<Weather | null>(null);

  React.useEffect(() => {
    let interval: NodeJS.Timer;

    if (settings.weather.show && settings.weather.location) {
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
  }, [settings.weather]);

  React.useEffect(() => {
    const s = getLocalSettings();

    setSettings(s);
    document.body.classList.add(s.theme);

    const interval = setInterval(() => {
      setTime(getTime());
    }, 1_000);

    return () => clearInterval(interval);
  }, []);

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
          <h2 className="timeText">
            {time.dayName} <span>•</span> {time.formattedTime}
          </h2>
        </div>

        {settings.weather.show && weather ? (
          <div
            title={weather.weather[0]?.description!}
            className={`${POSITION_CLASSES[settings.positions.weather]}Container`}
          >
            <p className="weatherText">{weather.main.temp.toFixed(0)}°C</p>
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
