import * as React from "react";
import Head from "next/head";
import useLocalStorage from "react-use/lib/useLocalStorage";
import { getGreeting } from "lib/greeting";
import { getTime } from "lib/time";
import { Settings } from "components/Settings";
import { POSITION_CLASSES, Positions, LOCAL_GREETING_KEY } from "lib/constants";

export default function Index() {
  const [open, setOpen] = React.useState(false);
  const [greeting, setGreeting] = React.useState(getGreeting());
  const [time, setTime] = React.useState(getTime());

  const [position, setPosition] = React.useState(Positions.BOTTOM_RIGHT);

  const [rawPosition] = useLocalStorage(LOCAL_GREETING_KEY, Positions.BOTTOM_RIGHT);

  React.useEffect(() => {
    setGreeting(getGreeting());

    if (typeof rawPosition !== "undefined") {
      setPosition(rawPosition);
    }

    const interval = setInterval(() => {
      setTime(getTime());
    }, 5_000);

    return () => clearInterval(interval);
  }, [rawPosition]);

  return (
    <>
      <Head>
        <title>New tab</title>
      </Head>

      <>
        <div onClick={() => setOpen(true)} className={`${POSITION_CLASSES[position]}Container`}>
          <h1 className="greetingText">{greeting}</h1>
          <h2 className="timeText">
            {time.dayName} • {time.formattedTime}
          </h2>
        </div>

        <Settings
          open={open}
          onPositionSelect={(p) => setPosition(p)}
          onClose={() => {
            setOpen(false);
          }}
        />
      </>
    </>
  );
}