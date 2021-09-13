import * as React from "react";
import ReactModal from "react-modal";
import { Tabs } from "types/Settings";
import { SettingsSidebar } from "./Sidebar";
import { AppearanceTab } from "./Tabs/Appearance";
import { GeneralTab } from "./Tabs/General";
import { SearchTab } from "./Tabs/Search";
import { WeatherTab } from "./Tabs/Weather";

enum Animations {
  OPEN = "modalAnimation",
  CLOSE = "closeAnimation",
}

ReactModal.setAppElement("#__next");

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const Settings = ({ isOpen, onClose }: Props) => {
  const [animation, setAnimation] = React.useState<Animations>(Animations.OPEN);

  const [activeTab, setActiveTab] = React.useState<Tabs>(Tabs.GENERAL);

  const styles: ReactModal.Styles = React.useMemo(
    () => ({
      content: {
        background: "var(--primary)",
        width: "40rem",
        maxWidth: "95%",
        height: "max-content",

        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        animation: `${animation} 200ms`,
        minHeight: "420px",
      },
      overlay: {
        background: "rgba(0,0,0,0.7)",
      },
    }),
    [animation],
  );

  React.useEffect(() => {
    setAnimation(Animations.OPEN);
  }, [isOpen]);

  return (
    <ReactModal
      className="modalResponsive"
      style={styles}
      isOpen={isOpen}
      onRequestClose={() => {
        setAnimation(Animations.CLOSE);

        setTimeout(() => {
          onClose();
        }, 199);
      }}
    >
      <div className="settingsContainer">
        <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <Renderer activeTab={activeTab} />
      </div>
    </ReactModal>
  );
};

const Renderer = ({ activeTab }: { activeTab: Tabs }) => {
  switch (activeTab) {
    case Tabs.GENERAL: {
      return <GeneralTab />;
    }
    case Tabs.WEATHER: {
      return <WeatherTab />;
    }
    case Tabs.SEARCH: {
      return <SearchTab />;
    }
    case Tabs.APPEARANCE: {
      return <AppearanceTab />;
    }
    default: {
      return <p>Unknown Tab.</p>;
    }
  }
};
