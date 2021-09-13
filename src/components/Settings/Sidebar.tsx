import { Tabs } from "types/Settings";

interface Props {
  activeTab: Tabs;
  setActiveTab: React.Dispatch<React.SetStateAction<Tabs>>;
}

export const SettingsSidebar = ({ activeTab, setActiveTab }: Props) => {
  return <div>Hello world!</div>;
};
