import * as React from "react";
import { useSettings } from "context/SettingsContext";

export function useCursor(runTimeout: boolean) {
  // state to re-render the component, this will re-run the timeout
  const [state, setState] = React.useState(0);

  const { settings } = useSettings();
  const isEnabled = settings.cursor.enabled;

  function removeCursor() {
    document.body.classList.add("no-cursor");
  }

  function addCursor() {
    setState((p) => p + 1);
    document.body.classList.remove("no-cursor");
  }

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handler = () => addCursor();

    if (isEnabled && runTimeout) {
      timeout = setTimeout(() => {
        removeCursor();
      }, settings.cursor.timeout * 1000);

      window.addEventListener("mousemove", handler);
    }

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", handler);
    };
  }, [runTimeout, isEnabled, state, settings.cursor.timeout]);
}
