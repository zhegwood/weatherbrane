import { getCompassDirection, roundValue } from "~~/server/utils/helpers";
import type { OpenMeteoJsonBlock } from "~~/server/types/open-meteo-json-block";
import { weatherCodeNames } from "~~/server/utils/open-meteo/weather-codes";

export class CurrentWeatherForecast {
  time: Date;

  [field: string]: Date | number | string;

  constructor(
    block: OpenMeteoJsonBlock,
    fields: string[],
    utcOffsetSeconds: number,
  ) {
    this.time = new Date((Number(block.time) + utcOffsetSeconds) * 1000);

    fields.forEach((field, index) => {
      const value = block[field];

      if (!Array.isArray(value)) {
        const roundedValue = roundValue(value);

        if (roundedValue !== undefined) {
          this[field] = roundedValue;
        }
      }
    });

    Object.entries(this).forEach(([field, value]) => {
      if (
        field.startsWith("wind_direction_") &&
        !field.startsWith("wind_direction_compass_") &&
        typeof value === "number"
      ) {
        this[
          `wind_direction_compass_${field.slice("wind_direction_".length)}`
        ] = getCompassDirection(value) || "Unknown";
      }
    });

    const weatherCode = this.weather_code;
    if (typeof weatherCode === "number") {
      this.weather_code_name =
        weatherCodeNames[weatherCode] || "Unknown weather condition";
    }
  }
}
