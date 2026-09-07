import type { WeatherDataPoint } from "~/types/weather-data-point";
import type { ForecastResponse } from "~/types/forecast-response";
import { useGeolocationStore } from "~/stores/geolocation";
import { useTimezoneStore } from "~/stores/timezone";

export const useForecastStore = defineStore("forecast", () => {
  const currentWeather = ref<WeatherDataPoint | null>(null);
  const hourlyWeather = ref<WeatherDataPoint[]>([]);
  const dailyWeather = ref<WeatherDataPoint[]>([]);
  const { geolocation } = storeToRefs(useGeolocationStore());
  const { timezone } = storeToRefs(useTimezoneStore());

  const setStorage = (
    item: WeatherDataPoint | WeatherDataPoint[],
    key: string,
  ) => {
    localStorage.setItem(key, JSON.stringify(item));
  };

  const setCurrent = (item: WeatherDataPoint) => {
    setStorage(item, "weatherbrane-current-weather");
    currentWeather.value = item;
  };

  const setHourly = (item: WeatherDataPoint[]) => {
    setStorage(item, "weatherbrane-hourly-weather");
    hourlyWeather.value = item;
  };

  const setDaily = (item: WeatherDataPoint[]) => {
    setStorage(item, "weatherbrane-daily-weather");
    dailyWeather.value = item;
  };

  const fetchForecast = async () => {
    if (!geolocation.value || !timezone.value) {
      return;
    }

    const forecast = await $fetch<ForecastResponse>(
      "/api/open-meteo/forecast",
      {
        query: {
          latitude: geolocation.value.lat,
          longitude: geolocation.value.lng,
          timezone: timezone.value,
        },
      },
    );

    if (forecast.current) {
      setCurrent(forecast.current);
    }

    if (forecast.hourly) {
      setHourly(forecast.hourly);
    }

    if (forecast.daily) {
      setDaily(forecast.daily);
    }

    return forecast;
  };

  const fetchCurrentWeather = async () => {
    if (!geolocation.value || !timezone.value) {
      return;
    }

    const forecast = await $fetch<ForecastResponse>(
      "/api/open-meteo/forecast",
      {
        query: {
          latitude: geolocation.value.lat,
          longitude: geolocation.value.lng,
          timezone: timezone.value,
          current: true,
        },
      },
    );

    if (forecast.current) {
      setCurrent(forecast.current);
    }

    return forecast;
  };

  const fetchHourlyWeather = async () => {
    if (!geolocation.value || !timezone.value) {
      return;
    }

    const forecast = await $fetch<ForecastResponse>(
      "/api/open-meteo/forecast",
      {
        query: {
          latitude: geolocation.value.lat,
          longitude: geolocation.value.lng,
          timezone: timezone.value,
          hourly: true,
        },
      },
    );

    if (forecast.hourly) {
      setHourly(forecast.hourly);
    }

    return forecast;
  };

  const fetchDailyWeather = async () => {
    if (!geolocation.value || !timezone.value) {
      return;
    }

    const forecast = await $fetch<ForecastResponse>(
      "/api/open-meteo/forecast",
      {
        query: {
          latitude: geolocation.value.lat,
          longitude: geolocation.value.lng,
          timezone: timezone.value,
          daily: true,
        },
      },
    );

    if (forecast.daily) {
      setHourly(forecast.daily);
    }

    return forecast;
  };

  return {
    currentWeather,
    hourlyWeather,
    dailyWeather,
    fetchForecast,
    fetchCurrentWeather,
    fetchHourlyWeather,
    fetchDailyWeather,
  };
});
