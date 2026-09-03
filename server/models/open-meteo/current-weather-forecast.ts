import { roundValue } from "~~/server/utils/helpers";
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

      if (typeof value === "number") {
        this[field] = roundValue(value);
      }
    });

    const weatherCode = this.weather_code;
    if (typeof weatherCode === "number") {
      this.weather_code_name =
        weatherCodeNames[weatherCode] || "Unknown weather condition";
    }
  }
}
