import format from "date-fns/format";
import { getGreeting, Greeting } from "./greeting";
import { DEFAULT_DATE_FORMAT } from "types/Settings";

interface Time {
  formattedTime: string;
  greeting: Greeting;
}

export function getTime(formatStr = DEFAULT_DATE_FORMAT): Time {
  let formattedTime = "";

  try {
    formattedTime = format(Date.now(), formatStr);
  } catch (e) {
    console.log(e);

    formattedTime = format(Date.now(), "EEEE • HH:mm");
  }

  const greeting = getGreeting();

  return {
    formattedTime,
    greeting,
  };
}
