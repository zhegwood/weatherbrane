export type WeatherDataPoint = {
  time: string | Date;
  [field: string]: number | string | Date | undefined;
};
