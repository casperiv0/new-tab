import * as React from "react";
import { FormField } from "components/FormField";
import { PositionButtons } from "components/PositionButtons";
import { useSettings } from "context/SettingsContext";
import { classes } from "lib/classes";
import { Theme } from "lib/constants";
import { DEFAULT_DATE_FORMAT } from "types/Settings";

export const GeneralTab = () => {
  const [dateFormat, setDateFormat] = React.useState("");

  const { settings, setSettings } = useSettings();

  function setGreetingPosition(n: number) {
    setSettings({ ...settings, positions: { ...settings.positions, greeting: n } });
  }

  function setTheme(theme: Theme) {
    setSettings({ ...settings, theme });
  }

  function onDateFormat() {
    setSettings({ ...settings, date: { ...settings.date, format: dateFormat } });
  }

  React.useEffect(() => {
    setDateFormat(settings.date.format ?? DEFAULT_DATE_FORMAT);
  }, [settings.date]);

  const isGreetingActive = (n: number) => (settings.positions.greeting === n ? "selected" : "");

  return (
    <div className="tab">
      <h1 className="tabTitle">General Settings</h1>

      <FormField fieldId="greeting-position" label="Greeting Position">
        <PositionButtons
          disabled={settings.positions.weather}
          onClick={setGreetingPosition}
          isActive={isGreetingActive}
        />
      </FormField>

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

      <FormField
        fieldId="date-format"
        label={
          <>
            Date format (
            <a rel="noopener noreferrer" target="_blank" href="https://date-fns.org/docs/format">
              read more here
            </a>
            )
          </>
        }
      >
        <input
          type="text"
          id="date-format"
          placeholder={DEFAULT_DATE_FORMAT}
          className="formInput"
          onChange={(e) => setDateFormat(e.target.value)}
          value={dateFormat}
          onBlur={onDateFormat}
        />
      </FormField>
    </div>
  );
};
