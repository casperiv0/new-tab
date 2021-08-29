import * as React from "react";
import ReactModal from "react-modal";
import useLocalStorage from "react-use/lib/useLocalStorage";
import { classes } from "lib/classes";
import { LOCAL_GREETING_KEY, Positions } from "lib/constants";

interface Props {
  open: boolean;
  onPositionSelect: (newPosition: number) => void;
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
  },
  overlay: {
    background: "rgba(0,0,0,0.7)",
  },
};

ReactModal.setAppElement("#__next");
export const Settings = ({ open, onClose, onPositionSelect }: Props) => {
  const [greetingPos, setGreetingPos] = React.useState(Positions.BOTTOM_RIGHT);
  const [value, updateLocal] = useLocalStorage(LOCAL_GREETING_KEY, Positions.BOTTOM_RIGHT);

  React.useEffect(() => {
    if (typeof value !== "undefined") {
      setGreetingPos(value);
    }
  }, [value]);

  function isActive(n: number) {
    return greetingPos === n ? "selected" : "";
  }

  function onClick(n: number) {
    setGreetingPos(n);
    updateLocal(n);
    onPositionSelect(n);
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
              className={classes("positionBtn", isActive(Positions.TOP_LEFT))}
            >
              Top left
            </button>
            <button
              onClick={() => onClick(Positions.TOP_RIGHT)}
              className={classes("positionBtn", isActive(Positions.TOP_RIGHT))}
            >
              Top right
            </button>
            <button
              onClick={() => onClick(Positions.BOTTOM_LEFT)}
              className={classes("positionBtn", isActive(Positions.BOTTOM_LEFT))}
            >
              Bottom Left
            </button>
            <button
              onClick={() => onClick(Positions.BOTTOM_RIGHT)}
              className={classes("positionBtn", isActive(Positions.BOTTOM_RIGHT))}
            >
              Bottom right
            </button>
          </div>
        </div>
      </form>
    </ReactModal>
  );
};
