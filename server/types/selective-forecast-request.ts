import type { OpenMeteoForecastRequest } from "~~/server/types/open-meteo-forecast-request";

export type SelectiveForecastRequest = Omit<
  OpenMeteoForecastRequest,
  "current" | "hourly" | "daily"
> &
  Partial<Pick<OpenMeteoForecastRequest, "current" | "hourly" | "daily">>;
