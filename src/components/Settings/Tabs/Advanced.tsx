import * as React from "react";
import { useDownload } from "@casper124578/useful";
import { FormField } from "components/FormField";
import { useSettings } from "context/SettingsContext";

export const AdvancedTab = () => {
  const ref = React.useRef<HTMLInputElement>(null);
  const { settings, setSettings } = useSettings();
  const download = useDownload();

  function handleExport() {
    const now = Date.now();
    download({ filename: `settings_${now}.json`, data: JSON.stringify(settings, null, 2) });
  }

  function handleImport() {
    ref.current?.click();
  }

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      const [file] = e.target.files ?? [];

      if (!file) return;

      const data = await file.text();

      setSettings(JSON.parse(data));
      // eslint-disable-next-line no-empty
    } catch {}
  }

  return (
    <div className="tab">
      <h1 className="tabTitle">Advanced Settings</h1>

      <fieldset className="fieldSet">
        <FormField label="Export Settings" fieldId="export-settings">
          <button
            style={{ display: "block", padding: "0.5rem 1rem", width: "max-content" }}
            onClick={handleExport}
            className="positionBtn"
          >
            Export
          </button>
        </FormField>
      </fieldset>

      <fieldset className="fieldSet">
        <label>Import Settings</label>
        <button
          style={{ display: "block", padding: "0.5rem 1rem", width: "max-content" }}
          onClick={handleImport}
          className="positionBtn"
        >
          Import
        </button>
        <input
          accept=".json"
          onChange={handleFileSelect}
          style={{ display: "none" }}
          type="file"
          ref={ref}
        />
      </fieldset>
    </div>
  );
};
