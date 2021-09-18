import { classes } from "lib/classes";
import { Tabs } from "types/Settings";

interface Props {
  activeTab: Tabs;
  setActiveTab: React.Dispatch<React.SetStateAction<Tabs>>;
}

export const SettingsSidebar = ({ activeTab, setActiveTab }: Props) => {
  const isActive = (n: number) => (activeTab === n ? "active" : "");

  return (
    <aside className="settingsSidebar">
      <ul>
        <li
          onClick={() => setActiveTab(Tabs.GENERAL)}
          className={classes("sidebarItem", isActive(Tabs.GENERAL))}
        >
          <button>General Setting</button>
        </li>
        <li
          onClick={() => setActiveTab(Tabs.APPEARANCE)}
          className={classes("sidebarItem", isActive(Tabs.APPEARANCE))}
        >
          <button>Appearance Setting</button>
        </li>
        <li
          onClick={() => setActiveTab(Tabs.SEARCH)}
          className={classes("sidebarItem", isActive(Tabs.SEARCH))}
        >
          <button>Search Setting</button>
        </li>
        <li
          onClick={() => setActiveTab(Tabs.WEATHER)}
          className={classes("sidebarItem", isActive(Tabs.WEATHER))}
        >
          <button>Weather Setting</button>
        </li>
        <li
          onClick={() => setActiveTab(Tabs.BOOKMARKS)}
          className={classes("sidebarItem", isActive(Tabs.BOOKMARKS))}
        >
          <button>Bookmarks</button>
        </li>
        <li
          onClick={() => setActiveTab(Tabs.ADVANCED)}
          className={classes("sidebarItem", isActive(Tabs.ADVANCED))}
        >
          <button>Advanced Setting</button>
        </li>
      </ul>
    </aside>
  );
};
