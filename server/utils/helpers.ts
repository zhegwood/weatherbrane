export const roundValue = (value: number | string | undefined) =>
	typeof value === "number" ? Math.round(value * 100) / 100 : value;
