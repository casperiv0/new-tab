import { getGreeting, Greeting } from "./greeting";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

interface Time {
  dayName: typeof DAYS[number];
  formattedTime: string;
  greeting: Greeting;
}

export function getTime(locales = ["BE-nl"]): Time {
  const date = new Date();
  const dayName = DAYS[date.getDay()]!;
  const formattedTime = date.toLocaleTimeString(locales, { hour: "2-digit", minute: "2-digit" });
  const greeting = getGreeting();

  return {
    dayName,
    formattedTime,
    greeting,
  };
}
