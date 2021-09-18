import * as React from "react";
import { FormField } from "components/FormField";
import { PositionButtons } from "components/PositionButtons";
import { classes } from "lib/classes";
import { Unit } from "types/Settings";
import { useSettings } from "context/SettingsContext";

export const WeatherTab = () => {
  const { settings, setSettings } = useSettings();

  const [location, setLocation] = React.useState(settings.weather.location ?? "");

  function enableOrDisableWeather(v: boolean) {
    setSettings({ ...settings, weather: { ...settings.weather, show: v } });
  }

  function setUnit(unit: Unit) {
    setSettings({ ...settings, weather: { ...settings.weather, unit } });
  }

  function setWeatherLocation() {
    setSettings({ ...settings, weather: { ...settings.weather, location } });
  }

  function setWeatherPosition(n: number) {
    setSettings({ ...settings, positions: { ...settings.positions, weather: n } });
  }

  const isActive = (n: number) => (settings.positions.weather === n ? "selected" : "");

  return (
    <div className="tab">
      <h1 className="tabTitle">Weather Settings</h1>

      <FormField fieldId="weather-enabled" label="Weather enabled">
        <div style={{ display: "flex" }}>
          <button
            onClick={() => enableOrDisableWeather(true)}
            className={classes(
              "positionBtn",
              "toggle",
              settings.weather.show === true && "selected",
            )}
          >
            On
          </button>
          <button
            onClick={() => enableOrDisableWeather(false)}
            className={classes(
              "positionBtn",
              "toggle",
              settings.weather.show === false && "selected",
            )}
          >
            Off
          </button>
        </div>
      </FormField>

      <fieldset disabled={!settings.weather.show} className="fieldSet">
        <FormField label="Weather unit" fieldId="weather-unit">
          <div style={{ display: "flex" }}>
            <button
              onClick={() => setUnit(Unit.METRIC)}
              className={classes(
                "positionBtn",
                "toggle",
                settings.weather.unit === Unit.METRIC && "selected",
              )}
            >
              Metric
            </button>
            <button
              onClick={() => setUnit(Unit.IMPERIAL)}
              className={classes(
                "positionBtn",
                "toggle",
                settings.weather.unit === Unit.IMPERIAL && "selected",
              )}
            >
              Imperial
            </button>
          </div>
        </FormField>

        <FormField fieldId="weather-position" label="Weather position">
          <PositionButtons
            disabled={settings.positions.greeting}
            onClick={setWeatherPosition}
            isActive={isActive}
          />
        </FormField>

        <FormField fieldId="weather-location" label="Weather location">
          <input
            type="url"
            id="weather-location"
            placeholder="London"
            className="formInput"
            onChange={(e) => setLocation(e.target.value)}
            disabled={!settings.weather.show}
            value={location}
            onBlur={setWeatherLocation}
          />
        </FormField>
      </fieldset>
    </div>
  );
};
