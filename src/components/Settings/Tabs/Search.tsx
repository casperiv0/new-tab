import * as React from "react";
import { FormField } from "components/FormField";
import { useSettings } from "context/SettingsContext";
import { classes } from "lib/classes";

export const SearchTab = () => {
  const { settings, setSettings } = useSettings();
  const showSearch = settings.search.show;

  const [searchEngine, setSearchEngine] = React.useState(settings.search.engine ?? "");

  function onSearchEngine() {
    setSettings({ ...settings, search: { ...settings.search, engine: searchEngine } });
  }

  function enableOrDisableSearch(v: boolean) {
    setSettings({ ...settings, search: { ...settings.search, show: v } });
  }

  return (
    <div className="tab">
      <h1 className="tabTitle">Search Settings</h1>

      <FormField fieldId="search-enabled" label="Search enabled">
        <div style={{ display: "flex" }}>
          <button
            onClick={() => enableOrDisableSearch(true)}
            className={classes("positionBtn", "toggle", showSearch === true && "selected")}
          >
            On
          </button>
          <button
            onClick={() => enableOrDisableSearch(false)}
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
  );
};
