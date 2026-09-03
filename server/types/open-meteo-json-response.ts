import type { OpenMeteoJsonBlock } from "./open-meteo-json-block";

export type OpenMeteoJsonResponse = {
	latitude: number;
	longitude: number;
	elevation: number;
	generationtime_ms: number;
	utc_offset_seconds: number;
	timezone: string;
	timezone_abbreviation: string;
	current?: OpenMeteoJsonBlock;
	hourly?: OpenMeteoJsonBlock;
	daily?: OpenMeteoJsonBlock;
};
