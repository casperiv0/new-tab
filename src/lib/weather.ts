import type { Weather } from "../types/Weather";
const API_URL = "https://weather-api-worker.caspertheghost.workers.dev";

export async function getWeather(location: string, unit: "metric" | "imperial"): Promise<Weather> {
  const res = await fetch(`${API_URL}?query=${location}&unit=${unit}`);
  const json = await res.json();

  return json.data as Weather;
}
