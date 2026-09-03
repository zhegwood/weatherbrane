export const roundValue = (value: number | string | undefined) =>
  typeof value === "number" ? Math.round(value * 100) / 100 : value;

export const getCompassDirection = (degrees: number | undefined) => {
  if (degrees === undefined || !Number.isFinite(degrees)) {
    return undefined;
  }

  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  const normalizedDegrees = ((degrees % 360) + 360) % 360;
  const directionIndex =
    Math.round(normalizedDegrees / 22.5) % directions.length;

  return directions[directionIndex];
};
