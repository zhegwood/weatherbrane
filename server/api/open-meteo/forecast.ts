import { createError, getQuery, type H3Event } from "h3";
import { CurrentWeatherForecast } from "~~/server/models/open-meteo/current-weather-forecast";
import { HourlyWeatherForecast } from "~~/server/models/open-meteo/hourly-weather-forecast";
import { DailyWeatherForecast } from "~~/server/models/open-meteo/daily-weather-forecast";
import type { OpenMeteoJsonResponse } from "~~/server/types/open-meteo-json-response";
import type { SelectiveForecastRequest } from "~~/server/types/selective-forecast-request";
import {
  OPEN_METEO_URL,
  current,
  daily,
  hourly,
  units,
} from "~~/server/utils/open-meteo/config";

export default defineEventHandler(async (event: H3Event) => {
  const query = getQuery(event);
  const latitude = Number(query.latitude);
  const longitude = Number(query.longitude);
  const timezone = String(query.timezone ?? "UTC");
  const requestedSections = ["current", "hourly", "daily"].filter(
    (section) => query[section] === "true" || query[section] === true,
  );

  if (
    !Number.isFinite(latitude) ||
    latitude < -90 ||
    latitude > 90 ||
    !Number.isFinite(longitude) ||
    longitude < -180 ||
    longitude > 180
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: "Valid latitude and longitude are required",
    });
  }

  const fetchAllSections = requestedSections.length === 0;

  let shouldFetchCurrent = false;
  let shouldFetchHourly = false;
  let shouldFetchDaily = false;

  if (!fetchAllSections) {
    requestedSections.forEach((section) => {
      switch (section) {
        case "current":
          shouldFetchCurrent = true;
          break;
        case "hourly":
          shouldFetchHourly = true;
          break;
        case "daily":
          shouldFetchDaily = true;
          break;
      }
    });
  }

  const params: SelectiveForecastRequest = {
    latitude: [latitude],
    longitude: [longitude],
    ...units,
    timezone,
    timeformat: "unixtime",
    current: fetchAllSections || shouldFetchCurrent ? current : undefined,
    hourly: fetchAllSections || shouldFetchHourly ? hourly : undefined,
    daily: fetchAllSections || shouldFetchDaily ? daily : undefined,
  };

  try {
    const response = await $fetch<OpenMeteoJsonResponse>(OPEN_METEO_URL, {
      query: params,
    });

    return {
      latitude: response.latitude,
      longitude: response.longitude,
      elevation: response.elevation,
      generationTimeMilliseconds: response.generationtime_ms,
      utcOffsetSeconds: response.utc_offset_seconds,
      timezone: response.timezone,
      timezoneAbbreviation: response.timezone_abbreviation,
      current:
        (fetchAllSections || shouldFetchCurrent) && response.current
          ? new CurrentWeatherForecast(
              response.current,
              current.split(","),
              response.utc_offset_seconds,
            )
          : null,
      hourly:
        (fetchAllSections || shouldFetchHourly) && response.hourly
          ? HourlyWeatherForecast.fromResponse(
              response.hourly,
              hourly.split(","),
              response.utc_offset_seconds,
            )
          : [],
      daily:
        (fetchAllSections || shouldFetchDaily) && response.daily
          ? DailyWeatherForecast.fromResponse(
              response.daily,
              daily.split(","),
              response.utc_offset_seconds,
            )
          : [],
    };
  } catch (error: unknown) {
    console.error("Open-Meteo forecast request failed:", error);

    throw createError({
      statusCode: 502,
      statusMessage:
        error instanceof Error
          ? error.message
          : "Unable to fetch forecast data from Open-Meteo",
    });
  }
});
