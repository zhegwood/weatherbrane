import type { WeatherDataPoint } from "~/types/weather-data-point";

export type ForecastResponse = {
  current: WeatherDataPoint | null;
  hourly: WeatherDataPoint[] | null;
  daily: WeatherDataPoint[] | null;
};
