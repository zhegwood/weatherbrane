export type OpenMeteoForecastRequest = {
	latitude: number[];
	longitude: number[];
	current: string;
	hourly: string;
	daily: string;
	wind_speed_unit: string;
	precipitation_unit: string;
	temperature_unit: string;
	timezone: string;
	timeformat: "unixtime";
};
