import * as React from "react";
import { FormField } from "components/FormField";
import { useSettings } from "context/SettingsContext";
import { classes } from "lib/classes";
import { DefaultSearchEngines, DEFAULT_SEARCH_ENGINES, SearchEngine } from "lib/constants";
import { SettingsSearch } from "types/Settings";

const SEARCH_ENGINES = {
  ...DEFAULT_SEARCH_ENGINES,
  custom: "",
};

function findSearchEngineKey(searchSettings: SettingsSearch) {
  const arr = Object.keys(DEFAULT_SEARCH_ENGINES);

  const found = arr.find(
    (k) => DEFAULT_SEARCH_ENGINES[k as DefaultSearchEngines] === searchSettings.engine,
  );

  if (!searchSettings.engine) {
    return "duckduckgo";
  }

  return found ?? "custom";
}

export const SearchTab = () => {
  const { settings, setSettings } = useSettings();

  const showSearch = settings.search.show;
  const inNewTab = settings.search.newTab;

  const [customEngine, setCustomEngine] = React.useState(settings.search.engine);
  const [selectedEngine, setSelectedEngine] = React.useState<SearchEngine>(
    findSearchEngineKey(settings.search),
  );

  const isCustom = !DEFAULT_SEARCH_ENGINES[selectedEngine as DefaultSearchEngines];

  function onSearchEngine() {
    setSettings({ ...settings, search: { ...settings.search, engine: customEngine } });
  }

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;

    if (value !== "custom") {
      setSelectedEngine(value);
      setSettings({
        ...settings,
        search: {
          ...settings.search,
          engine: DEFAULT_SEARCH_ENGINES[value as DefaultSearchEngines],
        },
      });
    } else {
      setSelectedEngine(value);
    }
  }

  function enableOrDisableSearch(v: boolean) {
    setSettings({ ...settings, search: { ...settings.search, show: v } });
  }

  function setNewTab(v: boolean) {
    setSettings({ ...settings, search: { ...settings.search, newTab: v } });
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

      <fieldset className="fieldSet" disabled={!showSearch}>
        <FormField fieldId="new-tab-results" label="Show results in a new tab">
          <div style={{ display: "flex" }}>
            <button
              disabled={!showSearch}
              onClick={() => setNewTab(true)}
              className={classes("positionBtn", "toggle", inNewTab === true && "selected")}
            >
              On
            </button>
            <button
              disabled={!showSearch}
              onClick={() => setNewTab(false)}
              className={classes("positionBtn", "toggle", inNewTab === false && "selected")}
            >
              Off
            </button>
          </div>
        </FormField>

        <FormField fieldId="search-engine" label="Search engine">
          <select
            id="search-engine"
            disabled={!showSearch}
            className="formInput"
            onChange={handleSelect}
            value={selectedEngine}
          >
            {Object.keys(SEARCH_ENGINES).map((v) => (
              <option value={v} key={v}>
                {v}
              </option>
            ))}
          </select>

          {isCustom ? (
            <>
              <input
                type="url"
                id="custom-search-engine"
                placeholder="https://duckduckgo.com?q="
                className="formInput"
                onChange={(e) => setCustomEngine(e.target.value)}
                disabled={!showSearch}
                value={customEngine}
                onBlur={onSearchEngine}
                style={{ opacity: !showSearch ? 0.5 : 1 }}
              />
              <span className="formSpan">Must be full search URL.</span>
            </>
          ) : null}
        </FormField>
      </fieldset>
    </div>
  );
};
