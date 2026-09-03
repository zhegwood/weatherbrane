import { defineStore } from "pinia";
import { ref } from "vue";
import type { GeolocationData } from "~/types/geolocation-data";

export type WeatherDataPoint = {
	time: number;
	[field: string]: number | undefined;
};

type ForecastResponse = {
	current: WeatherDataPoint | null;
	hourly: WeatherDataPoint[] | null;
	daily: WeatherDataPoint[] | null;
};

export const useForecastStore = defineStore("forecast", () => {
	const currentWeather = ref<WeatherDataPoint | null>(null);
	const hourlyWeather = ref<WeatherDataPoint[]>([]);
	const dailyWeather = ref<WeatherDataPoint[]>([]);

	const fetchForecast = async (
		geolocation: GeolocationData,
		timezone: string,
	) => {
		const forecast = await $fetch<ForecastResponse>(
			"/api/open-meteo/forecast",
			{
				query: {
					latitude: geolocation.lat,
					longitude: geolocation.lng,
					timezone,
				},
			},
		);

		currentWeather.value = forecast.current;
		hourlyWeather.value = forecast.hourly || [];
		dailyWeather.value = forecast.daily || [];
	};

	return {
		currentWeather,
		hourlyWeather,
		dailyWeather,
		fetchForecast,
	};
});
