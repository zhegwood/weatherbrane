import { roundValue } from "~~/server/utils/helpers";
import type { OpenMeteoJsonBlock } from "~~/server/types/open-meteo-json-block";
import { weatherCodeNames } from "~~/server/utils/open-meteo/weather-codes";

export class DailyWeatherForecast {
  time: Date;

  [field: string]: Date | number | string;

  constructor(
    time: number,
    fields: { field: string; values: number[] }[],
    index: number,
    utcOffsetSeconds: number,
  ) {
    this.time = new Date((time + utcOffsetSeconds) * 1000);

    fields.forEach(({ field, values }) => {
      const value = values[index];

      if (value !== undefined) {
        this[field] = roundValue(value);
      }
    });

    const weatherCode = this.weather_code;
    if (typeof weatherCode === "number") {
      this.weather_code_name =
        weatherCodeNames[weatherCode] || "Unknown weather condition";
    }
  }

  static fromResponse(
    block: OpenMeteoJsonBlock,
    fields: string[],
    utcOffsetSeconds: number,
  ) {
    const values = fields.map((field) => ({
      field,
      values: Array.isArray(block[field]) ? block[field] : [],
    }));
    const times = Array.isArray(block.time) ? block.time : [];

    return times.map(
      (time, index) =>
        new DailyWeatherForecast(time, values, index, utcOffsetSeconds),
    );
  }
}
