import { classes } from "lib/classes";
import { Positions } from "lib/constants";

interface PositionProps {
  disabled: number;
  onClick: (n: number) => void;
  isActive: (n: number) => string;
}

export function PositionButtons({ disabled, onClick, isActive }: PositionProps) {
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
