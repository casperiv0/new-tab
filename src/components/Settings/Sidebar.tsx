import { classes } from "lib/classes";
import { Tabs } from "types/Settings";

interface Props {
  activeTab: Tabs;
  setActiveTab: React.Dispatch<React.SetStateAction<Tabs>>;
}

const sidebarItems = [
  {
    label: "General Settings",
    value: Tabs.GENERAL,
  },
  {
    label: "Appearance Settings",
    value: Tabs.APPEARANCE,
  },
  {
    label: "Search Settings",
    value: Tabs.SEARCH,
  },
  {
    label: "Weather Settings",
    value: Tabs.WEATHER,
  },
  {
    label: "Bookmarks",
    value: Tabs.BOOKMARKS,
  },
  {
    label: "Advanced Settings",
    value: Tabs.ADVANCED,
  },
];

export const SettingsSidebar = ({ activeTab, setActiveTab }: Props) => {
  const isActive = (n: number) => (activeTab === n ? "active" : "");

  return (
    <aside className="settingsSidebar">
      <ul>
        {sidebarItems.map((item, index) => (
          <li
            key={index}
            onClick={() => setActiveTab(item.value)}
            className={classes("sidebarItem", isActive(item.value))}
          >
            <button>{item.label}</button>
          </li>
        ))}
      </ul>
    </aside>
  );
};
