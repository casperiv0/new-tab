import * as React from "react";
import Head from "next/head";
import { Gear } from "react-bootstrap-icons";
import { getGreeting } from "lib/greeting";
import { getTime } from "lib/time";
import { Settings } from "components/Settings";
import {
  POSITION_CLASSES,
  Positions,
  Settings as ISettings,
  DEFAULT_SETTINGS,
} from "lib/constants";
import { Search } from "components/Search";
import { getLocalSettings, saveLocalSettings } from "lib/settings";

export default function Index() {
  const [open, setOpen] = React.useState(false);
  const [greeting, setGreeting] = React.useState(getGreeting());
  const [time, setTime] = React.useState(getTime());

  const [settings, setSettings] = React.useState<ISettings>(DEFAULT_SETTINGS);

  React.useEffect(() => {
    setGreeting(getGreeting());
    setSettings(getLocalSettings());

    const interval = setInterval(() => {
      setTime(getTime());
    }, 1_000);

    return () => clearInterval(interval);
  }, []);

  function saveSettings(s: ISettings) {
    setSettings(s);
    saveLocalSettings(s);
  }

  const positionStyle = {
    [settings.position === Positions.TOP_LEFT ? "right" : "left"]: "1rem",
  };

  return (
    <>
      <Head>
        <title>New tab</title>
      </Head>

      <>
        <button
          aria-label="Enter settings"
          style={positionStyle}
          onClick={() => setOpen(true)}
          className="settingsBtn"
        >
          <Gear fill="var(--secondary)" width="20px" height="20px" />
        </button>

        <div className={`${POSITION_CLASSES[settings.position]}Container`}>
          <h1 className="greetingText">{greeting}</h1>
          <h2 className="timeText">
            {time.dayName} <span>•</span> {time.formattedTime}
          </h2>
        </div>

        <Settings
          open={open}
          onSettingsChange={saveSettings}
          settings={settings}
          onClose={() => {
            setOpen(false);
          }}
        />
        {settings.showSearch && <Search settings={settings} focusable={!open} />}
      </>
    </>
  );
}
