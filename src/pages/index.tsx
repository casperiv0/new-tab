import * as React from "react";
import Head from "next/head";
import { Gear } from "react-bootstrap-icons";
import { Unit } from "types/Settings";
import { POSITION_CLASSES } from "lib/constants";
import { Search } from "components/Search";
import { Bookmarks } from "components/Bookmarks";
import { useWeather } from "hooks/useWeather";
import { useTime } from "hooks/useTime";
import { Settings } from "components/Settings/Settings";
import { useSettings } from "context/SettingsContext";

export default function Index() {
  const { settings } = useSettings();
  const [open, setOpen] = React.useState(false);

  const time = useTime(settings.date);
  const weather = useWeather(settings.weather);

  React.useEffect(() => {
    if (settings.theme === "dark") {
      document.body.classList.remove("light");
    } else {
      document.body.classList.add(settings.theme);
    }
  }, [settings.theme]);

  return (
    <>
      <Head>
        <title>New tab</title>
      </Head>

      <>
        <div
          className="backgroundImg"
          style={{
            opacity: settings.backgroundUrl ? 1 : 0,
            backgroundImage: settings.backgroundUrl ? `url(${settings.backgroundUrl})` : undefined,
          }}
        />

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

        {settings.search.show && <Search focusable={!open} />}
        <Bookmarks />

        <Settings isOpen={open} onClose={() => setOpen(false)} />
      </>
    </>
  );
}
