<script setup lang="ts">
import { watch } from "vue";
import { storeToRefs } from "pinia";
import { useTimezoneStore } from "~/stores/timezone";
import { useGeolocationStore } from "~/stores/geolocation";
import { useForecastStore } from "~/stores/open-meteo/forecast";

const { timezone } = storeToRefs(useTimezoneStore());
const { geolocation } = storeToRefs(useGeolocationStore());
const forecastStore = useForecastStore();
const { fetchForecast } = useForecastStore();
const { currentWeather, hourlyWeather, dailyWeather } =
  storeToRefs(forecastStore);
const forecastPending = ref(false);
const forecastError = ref<Error | null>(null);

watch(
  [geolocation, timezone],
  async ([location, userTimezone]) => {
    if (!location || !userTimezone) {
      return;
    }

    forecastPending.value = true;
    forecastError.value = null;

    try {
      await fetchForecast(location, userTimezone);
    } catch (error) {
      forecastError.value = error as Error;
    } finally {
      forecastPending.value = false;
    }
  },
  { immediate: true },
);
</script>
<template>
  <h1 class="h1">Forecast</h1>
  <GlobalOverlay v-if="forecastPending" />
  <p v-else-if="forecastError">Unable to load forecast data.</p>
  <div class="p-4 border" v-else>
    <pre>{{ currentWeather }}</pre>
  </div>
  <div class="p-4 border" v-if="hourlyWeather.length">
    <pre>{{ hourlyWeather }}</pre>
  </div>
  <div class="p-4 border" v-if="dailyWeather.length">
    <pre>{{ dailyWeather }}</pre>
  </div>
  <Forecast />
</template>
