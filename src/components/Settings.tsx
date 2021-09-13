import * as React from "react";
import ReactModal from "react-modal";
import { DEFAULT_DATE_FORMAT, Settings as ISettings, Unit } from "types/Settings";
import { classes } from "lib/classes";
import { Positions, Theme } from "lib/constants";
import { FormField } from "./FormField";
import { PositionButtons } from "./PositionButtons";

interface Props {
  open: boolean;
  settings: ISettings;
  onSettingsChange: (settings: ISettings) => void;
  onClose: () => void;
}

ReactModal.setAppElement("#__next");
export const Settings = ({ open, settings, onClose, onSettingsChange }: Props) => {
  const [animation, setAnimation] = React.useState("modelAnimation");
  const [greetingPos, setGreetingPos] = React.useState(Positions.BOTTOM_RIGHT);
  const [dateFormat, setDateFormat] = React.useState(DEFAULT_DATE_FORMAT);
  const [showSearch, setSearch] = React.useState(true);
  const [searchEngine, setSearchEngine] = React.useState("");
  const [theme, setTheme] = React.useState<Theme>("dark");

  const [weatherPos, setWeatherPos] = React.useState(Positions.BOTTOM_LEFT);
  const [weatherLocation, setWeatherLocation] = React.useState("");
  const [showWeather, setShowWeather] = React.useState(false);
  const [unit, setUnit] = React.useState(Unit.METRIC);

  const isGreetingActive = (n: number) => (greetingPos === n ? "selected" : "");
  const isWeatherActive = (n: number) => (weatherPos === n ? "selected" : "");

  const styles: ReactModal.Styles = React.useMemo(
    () => ({
      content: {
        background: "var(--primary)",
        width: "40rem",
        maxWidth: "95%",
        height: "max-content",

        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        animation: `${animation} 200ms`,
      },
      overlay: {
        background: "rgba(0,0,0,0.7)",
      },
    }),
    [animation],
  );

  React.useEffect(() => {
    setAnimation("modalAnimation");
  }, [open]);

  React.useEffect(() => {
    if (settings.positions) {
      setGreetingPos(settings.positions.greeting);
      setWeatherPos(settings.positions.weather);
    }

    if (settings.search) {
      setSearch(settings.search.show);
      setSearchEngine(settings.search.engine);
    } else {
      setSearch(false);
      setSearchEngine("https://duckduckgo.com");
    }

    if (settings.weather) {
      setShowWeather(settings.weather.show);
      setWeatherLocation(settings.weather.location ?? "");
      setUnit(settings.weather.unit);
    }

    if (settings.date && settings.date.format) {
      setDateFormat(settings.date.format);
    }

    setTheme(settings.theme);
  }, [settings]);

  function onSearchClick(v: boolean) {
    setSearch(v);
    onSettingsChange({ ...settings, search: { ...settings.search, show: v } });
  }

  function onWeatherClick(v: boolean) {
    setShowWeather(v);
    onSettingsChange({ ...settings, weather: { ...settings.weather, show: v } });
  }

  function handleThemeChange(t: Theme) {
    document.body.classList.remove(theme);
    document.body.classList.add(t);

    setTheme(t);
    onSettingsChange({ ...settings, theme: t });
  }

  function onGreetingClick(n: number) {
    setGreetingPos(n);
    onSettingsChange({ ...settings, positions: { ...settings.positions, greeting: n } });
  }

  function onWeatherPosClick(n: number) {
    setWeatherPos(n);
    onSettingsChange({ ...settings, positions: { ...settings.positions, weather: n } });
  }

  function onUnitClick(unit: Unit) {
    setUnit(unit);
    onSettingsChange({ ...settings, weather: { ...settings.weather, unit } });
  }

  function onSearchEngine() {
    onSettingsChange({ ...settings, search: { ...settings.search, engine: searchEngine } });
  }

  function onWeatherLocation() {
    if (weatherLocation === settings.weather.location) return;

    onSettingsChange({ ...settings, weather: { ...settings.weather, location: weatherLocation } });
  }

  function onDateFormat() {
    onSettingsChange({ ...settings, date: { format: dateFormat } });
  }

  return (
    <ReactModal
      className="modalResponsive"
      style={styles}
      isOpen={open}
      onRequestClose={() => {
        setAnimation("closeAnimation");

        setTimeout(() => {
          onClose();
        }, 199);
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Settings</h1>

      <h3>Greeting</h3>
      <FormField fieldId="greeting-position" label="Greeting Position">
        <PositionButtons
          disabled={weatherPos}
          onClick={onGreetingClick}
          isActive={isGreetingActive}
        />
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

      <div style={{ marginTop: "1rem" }}>
        <h3>Themes</h3>

        <FormField fieldId="theme" label="Theme">
          <div style={{ display: "flex" }}>
            <button
              onClick={() => handleThemeChange("dark")}
              className={classes("positionBtn", "toggle", theme === "dark" && "selected")}
            >
              Dark
            </button>
            <button
              onClick={() => handleThemeChange("light")}
              className={classes("positionBtn", "toggle", theme === "light" && "selected")}
            >
              Light
            </button>
          </div>
        </FormField>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <h3>Search</h3>

        <FormField fieldId="search-enabled" label="Search enabled">
          <div style={{ display: "flex" }}>
            <button
              onClick={() => onSearchClick(true)}
              className={classes("positionBtn", "toggle", showSearch === true && "selected")}
            >
              On
            </button>
            <button
              onClick={() => onSearchClick(false)}
              className={classes("positionBtn", "toggle", showSearch === false && "selected")}
            >
              Off
            </button>
          </div>
        </FormField>

        <FormField fieldId="search-engine" label="Search engine (Not recommended changing.)">
          <input
            type="url"
            id="search-engine"
            placeholder="https://duckduckgo.com"
            className="formInput"
            onChange={(e) => setSearchEngine(e.target.value)}
            disabled={!showSearch}
            value={searchEngine}
            onBlur={onSearchEngine}
            style={{ opacity: !showSearch ? 0.5 : 1 }}
          />
        </FormField>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <h3>Weather</h3>

        <FormField fieldId="weather-enabled" label="Weather enabled">
          <div style={{ display: "flex" }}>
            <button
              onClick={() => onWeatherClick(true)}
              className={classes("positionBtn", "toggle", showWeather === true && "selected")}
            >
              On
            </button>
            <button
              onClick={() => onWeatherClick(false)}
              className={classes("positionBtn", "toggle", showWeather === false && "selected")}
            >
              Off
            </button>
          </div>
        </FormField>

        <FormField label="Weather unit" fieldId="weather-unit">
          <div style={{ display: "flex" }}>
            <button
              onClick={() => onUnitClick(Unit.METRIC)}
              className={classes("positionBtn", "toggle", unit === Unit.METRIC && "selected")}
            >
              Metric
            </button>
            <button
              onClick={() => onUnitClick(Unit.IMPERIAL)}
              className={classes("positionBtn", "toggle", unit === Unit.IMPERIAL && "selected")}
            >
              Imperial
            </button>
          </div>
        </FormField>

        <FormField fieldId="weather-position" label="Weather position">
          <PositionButtons
            disabled={greetingPos}
            onClick={onWeatherPosClick}
            isActive={isWeatherActive}
          />
        </FormField>

        <FormField fieldId="weather-location" label="Weather location">
          <input
            type="url"
            id="weather-location"
            placeholder="London"
            className="formInput"
            onChange={(e) => setWeatherLocation(e.target.value)}
            disabled={!showWeather}
            value={weatherLocation}
            onBlur={onWeatherLocation}
          />
        </FormField>
      </div>
    </ReactModal>
  );
};
