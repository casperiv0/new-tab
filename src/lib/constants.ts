export const POSITION_CLASSES = ["topLeft", "topRight", "bottomLeft", "bottomRight"] as const;

export enum Positions {
  TOP_LEFT = 0,
  TOP_RIGHT,
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
}

export const LOCAL_GREETING_KEY = "NEW_TAB_SETTINGS";

export interface Settings {
  position: number;
  showSearch: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  showSearch: false,
  position: Positions.BOTTOM_RIGHT,
} as const;
