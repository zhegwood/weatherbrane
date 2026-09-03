import { createError, getQuery, type H3Event } from "h3";
import { CurrentWeatherForecast } from "~~/server/models/open-meteo/current-weather-forecast";
import { HourlyWeatherForecast } from "~~/server/models/open-meteo/hourly-weather-forecast";
import { DailyWeatherForecast } from "~~/server/models/open-meteo/daily-weather-forecast";
import type { OpenMeteoForecastRequest } from "~~/server/types/open-meteo-forecast-request";
import type { OpenMeteoJsonResponse } from "~~/server/types/open-meteo-json-response";
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
  const timezone = String(query.timezone || "UTC");

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

  const params: OpenMeteoForecastRequest = {
    latitude: [latitude],
    longitude: [longitude],
    current,
    hourly,
    daily,
    ...units,
    timezone,
    timeformat: "unixtime",
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
      current: response.current
        ? new CurrentWeatherForecast(
            response.current,
            current.split(","),
            response.utc_offset_seconds,
          )
        : null,
      hourly: response.hourly
        ? HourlyWeatherForecast.fromResponse(
            response.hourly,
            hourly.split(","),
            response.utc_offset_seconds,
          )
        : [],
      daily: response.daily
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
