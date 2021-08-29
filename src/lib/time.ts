const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export function getTime(locales = ["BE-nl"]) {
  const date = new Date();
  const dayName = DAYS[date.getDay()];
  const formattedTime = date.toLocaleTimeString(locales, { hour: "2-digit", minute: "2-digit" });

  return {
    dayName,
    formattedTime,
  };
}
