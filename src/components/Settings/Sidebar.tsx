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
      <li className={classes("sidebarItem", isActive(Tabs.GENERAL))}>
        <button onClick={() => setActiveTab(Tabs.GENERAL)}>General Setting</button>
      </li>
      <li className={classes("sidebarItem", isActive(Tabs.SEARCH))}>
        <button onClick={() => setActiveTab(Tabs.SEARCH)}>Search Setting</button>
      </li>
      <li className={classes("sidebarItem", isActive(Tabs.WEATHER))}>
        <button onClick={() => setActiveTab(Tabs.WEATHER)}>Weather Setting</button>
      </li>
    </aside>
  );
};
