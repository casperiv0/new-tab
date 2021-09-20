import * as React from "react";
import { FormField } from "components/FormField";
import { useSettings } from "context/SettingsContext";
import { classes } from "lib/classes";
import { Theme } from "lib/constants";

export const AppearanceTab = () => {
  const { settings, setSettings } = useSettings();
  const showCursor = settings.cursor.enabled;

  const [backgroundUrl, setBackgroundUrl] = React.useState(settings.backgroundUrl ?? "");
  const [interval, setInterval] = React.useState(settings.cursor.interval ?? 5_000);

  function setTheme(theme: Theme) {
    setSettings({ ...settings, theme });
  }

  function enableOrDisableCursor(v: boolean) {
    setSettings({ ...settings, cursor: { ...settings.cursor, enabled: v } });
  }

  function onBackgroundUrl() {
    setSettings({ ...settings, backgroundUrl: backgroundUrl || null });
  }

  function onInterval() {
    setSettings({ ...settings, cursor: { ...settings.cursor, interval } });
  }

  React.useEffect(() => {
    if (settings.backgroundUrl) {
      setBackgroundUrl(settings.backgroundUrl);
    }
  }, [settings.backgroundUrl]);

  return (
    <div className="tab">
      <h1 className="tabTitle">Appearance Settings</h1>

      <FormField fieldId="theme" label="Theme">
        <div style={{ display: "flex" }}>
          <button
            onClick={() => setTheme("dark")}
            className={classes("positionBtn", "toggle", settings.theme === "dark" && "selected")}
          >
            Dark
          </button>
          <button
            onClick={() => setTheme("light")}
            className={classes("positionBtn", "toggle", settings.theme === "light" && "selected")}
          >
            Light
          </button>
        </div>
      </FormField>

      <FormField fieldId="date-format" label="Background URL">
        <input
          type="url"
          id="background-url"
          className="formInput"
          placeholder="https://example.com/image.png"
          onChange={(e) => setBackgroundUrl(e.target.value)}
          value={backgroundUrl}
          onBlur={onBackgroundUrl}
        />
      </FormField>

      <h1 className="tabTitle">Cursor Settings</h1>

      <FormField fieldId="cursor" label="Hide Cursor">
        <div style={{ display: "flex" }}>
          <button
            onClick={() => enableOrDisableCursor(true)}
            className={classes("positionBtn", "toggle", showCursor === true && "selected")}
          >
            On
          </button>
          <button
            onClick={() => enableOrDisableCursor(false)}
            className={classes("positionBtn", "toggle", showCursor === false && "selected")}
          >
            Off
          </button>
        </div>
      </FormField>

      <fieldset className="fieldSet" disabled={!showCursor}>
        <FormField fieldId="hide-cursor-interval" label="Hide Cursor Interval">
          <input
            type="url"
            id="hide-cursor-interval"
            className="formInput"
            onChange={(e) => setInterval(e.target.valueAsNumber)}
            value={interval}
            onBlur={onInterval}
          />
        </FormField>
      </fieldset>
    </div>
  );
};
