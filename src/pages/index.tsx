import * as React from "react";
import Head from "next/head";
import { Gear } from "react-bootstrap-icons";
import { Settings as ISettings, Unit } from "types/Settings";
import { Settings } from "components/Settings";
import { POSITION_CLASSES, DEFAULT_SETTINGS } from "lib/constants";
import { Search } from "components/Search";
import { getLocalSettings, saveLocalSettings } from "lib/settings";
import { useWeather } from "hooks/useWeather";
import { useTime } from "hooks/useTime";

export default function Index() {
  const [settings, setSettings] = React.useState<ISettings>(DEFAULT_SETTINGS);
  const [open, setOpen] = React.useState(false);

  const time = useTime(settings.date);
  const weather = useWeather(settings.weather);

  React.useEffect(() => {
    const s = getLocalSettings();

    setSettings(s);
    document.body.classList.add(s.theme);
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
          <h2 className="timeText">{time.formattedTime}</h2>
        </div>

        {settings.weather.show ? (
          <div
            style={{ opacity: weather ? 1 : 0, transition: "200ms" }}
            title={weather?.weather[0]?.description!}
            className={`${POSITION_CLASSES[settings.positions.weather]}Container`}
          >
            <p className="weatherText">
              {weather?.main.temp.toFixed(0)}°{settings.weather.unit === Unit.METRIC ? "C" : "F"}
            </p>
          </div>
        ) : null}

        {settings.search.show && <Search settings={settings} focusable={!open} />}

        <Settings
          open={open}
          onSettingsChange={saveSettings}
          settings={settings}
          onClose={() => {
            setOpen(false);
          }}
        />
      </>
    </>
  );
}
