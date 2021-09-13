import * as React from "react";
import { Tabs } from "types/Settings";
import { SettingsSidebar } from "./Sidebar";
import { GeneralTab } from "./Tabs/General";

export const Settings = () => {
  const [activeTab, setActiveTab] = React.useState<Tabs>(Tabs.GENERAL);

  <div style={{ display: "flex" }}>
    <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
    <Renderer activeTab={activeTab} />
  </div>;
};

const Renderer = ({ activeTab }: { activeTab: Tabs }) => {
  switch (activeTab) {
    case Tabs.GENERAL: {
      return <GeneralTab />;
    }
    default: {
      return <p>Unknown Tab.</p>;
    }
  }
};
