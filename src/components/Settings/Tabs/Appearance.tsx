import * as React from "react";
import { FormField } from "components/FormField";
import { useSettings } from "context/SettingsContext";
import { classes } from "lib/classes";
import { Theme } from "lib/constants";

export const AppearanceTab = () => {
  const { settings, setSettings } = useSettings();

  const [backgroundUrl, setBackgroundUrl] = React.useState(settings.backgroundUrl ?? "");

  function setTheme(theme: Theme) {
    setSettings({ ...settings, theme });
  }

  function onBackgroundUrl() {
    setSettings({ ...settings, backgroundUrl: backgroundUrl || null });
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
    </div>
  );
};
