import * as React from "react";
import ReactModal from "react-modal";
import { classes } from "lib/classes";
import { Positions, Settings as ISettings } from "lib/constants";

interface Props {
  open: boolean;
  settings: ISettings;
  onSettingsChange: (settings: ISettings) => void;
  onClose: () => void;
}

const styles: ReactModal.Styles = {
  content: {
    background: "black",
    width: "32rem",
    maxWidth: "95%",
    height: "max-content",

    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    animation: "modalAnimation 200ms",
  },
  overlay: {
    background: "rgba(0,0,0,0.7)",
  },
};

ReactModal.setAppElement("#__next");
export const Settings = ({ open, settings, onClose, onSettingsChange }: Props) => {
  const [greetingPos, setGreetingPos] = React.useState(Positions.BOTTOM_RIGHT);
  const [showSearch, setSearch] = React.useState(true);

  React.useEffect(() => {
    setGreetingPos(settings.position);
    setSearch(settings.showSearch);
  }, [settings]);

  function isGreetingActive(n: number) {
    return greetingPos === n ? "selected" : "";
  }

  function onSearchClick(b: boolean) {
    setSearch(b);
    onSettingsChange({ ...settings, showSearch: b });
  }

  function onClick(n: number) {
    setGreetingPos(n);
    onSettingsChange({ ...settings, position: n });
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <ReactModal style={styles} isOpen={open} onRequestClose={() => onClose()}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Settings</h1>

      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="greeting-position">Greeting Position</label>
          <div style={{ gap: "0.5em", display: "flex" }}>
            <button
              onClick={() => onClick(Positions.TOP_LEFT)}
              className={classes("positionBtn", isGreetingActive(Positions.TOP_LEFT))}
            >
              Top left
            </button>
            <button
              onClick={() => onClick(Positions.TOP_RIGHT)}
              className={classes("positionBtn", isGreetingActive(Positions.TOP_RIGHT))}
            >
              Top right
            </button>
            <button
              onClick={() => onClick(Positions.BOTTOM_LEFT)}
              className={classes("positionBtn", isGreetingActive(Positions.BOTTOM_LEFT))}
            >
              Bottom Left
            </button>
            <button
              onClick={() => onClick(Positions.BOTTOM_RIGHT)}
              className={classes("positionBtn", isGreetingActive(Positions.BOTTOM_RIGHT))}
            >
              Bottom right
            </button>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <label htmlFor="show-search">Show search</label>

            <div style={{ display: "flex" }}>
              <button
                onClick={() => onSearchClick(!showSearch)}
                className={classes("positionBtn", "toggle", showSearch === true && "selected")}
              >
                On
              </button>
              <button
                onClick={() => onSearchClick(!showSearch)}
                className={classes("positionBtn", "toggle", showSearch === false && "selected")}
              >
                Off
              </button>
            </div>
          </div>
        </div>
      </form>
    </ReactModal>
  );
};
