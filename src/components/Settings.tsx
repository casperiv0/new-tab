import * as React from "react";
import ReactModal from "react-modal";
import { DEFAULT_DATE_FORMAT, Settings as ISettings } from "types/Settings";
import { classes } from "lib/classes";
import { Positions, Theme } from "lib/constants";

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

    if (settings.weather && settings.weather.show) {
      setShowWeather(settings.weather.show);
      setWeatherLocation(settings.weather.location ?? "");
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

      <div>
        <div>
          <h3 style={{ marginBottom: "0.5rem" }}>Greeting</h3>
          <label htmlFor="greeting-position">Greeting Position</label>
          <PositionButtons
            disabled={weatherPos}
            onClick={onGreetingClick}
            isActive={isGreetingActive}
          />
        </div>

        <div style={{ marginTop: "1rem" }}>
          <label htmlFor="date-format">
            Date format (
            <a rel="noopener noreferrer" target="_blank" href="https://date-fns.org/docs/format">
              read more here
            </a>
            )
          </label>
          <input
            type="text"
            id="date-format"
            placeholder={DEFAULT_DATE_FORMAT}
            className="formInput"
            onChange={(e) => setDateFormat(e.target.value)}
            value={dateFormat}
            onBlur={onDateFormat}
          />
        </div>

        <div style={{ marginTop: "1rem" }}>
          <h3 style={{ marginBottom: "0.5rem" }}>Themes</h3>
          <label htmlFor="show-search">Theme</label>

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
        </div>

        <div style={{ marginTop: "1rem" }}>
          <h3 style={{ marginBottom: "0.5rem" }}>Search</h3>
          <label htmlFor="show-search">Search enabled</label>

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

          <div style={{ marginTop: "1rem" }}>
            <label htmlFor="search-engine">Search engine (Not recommended changing.)</label>

            <input
              type="url"
              id="search-engine"
              placeholder="https://duckduckgo.com"
              className="formInput"
              onChange={(e) => setSearchEngine(e.target.value)}
              disabled={!showSearch}
              value={searchEngine}
              onBlur={onSearchEngine}
            />
          </div>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <h3 style={{ marginBottom: "0.5rem" }}>Weather</h3>
          <label htmlFor="show-search">Weather enabled</label>

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

          <div style={{ marginTop: "1rem" }}>
            <label htmlFor="weather-position">Weather Position</label>
            <PositionButtons
              disabled={greetingPos}
              onClick={onWeatherPosClick}
              isActive={isWeatherActive}
            />
          </div>

          <div style={{ marginTop: "1rem" }}>
            <label htmlFor="weather-location">Location</label>
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
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

interface PositionProps {
  disabled: number;
  onClick: (n: number) => void;
  isActive: (n: number) => string;
}

function PositionButtons({ disabled, onClick, isActive }: PositionProps) {
  return (
    <div style={{ gap: "0.5em", display: "flex" }}>
      <button
        disabled={Positions.TOP_RIGHT === disabled}
        onClick={() => onClick(Positions.TOP_RIGHT)}
        className={classes("positionBtn", isActive(Positions.TOP_RIGHT))}
      >
        Top right
      </button>
      <button
        disabled={Positions.BOTTOM_LEFT === disabled}
        onClick={() => onClick(Positions.BOTTOM_LEFT)}
        className={classes("positionBtn", isActive(Positions.BOTTOM_LEFT))}
      >
        Bottom Left
      </button>
      <button
        disabled={Positions.BOTTOM_RIGHT === disabled}
        onClick={() => onClick(Positions.BOTTOM_RIGHT)}
        className={classes("positionBtn", isActive(Positions.BOTTOM_RIGHT))}
      >
        Bottom right
      </button>
    </div>
  );
}
