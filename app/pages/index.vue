<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useForecastStore } from "~/stores/open-meteo/forecast";
import Forecast from "../components/forecast.vue";

const forecastStore = useForecastStore();
const { currentWeather, hourlyWeather, dailyWeather } =
  storeToRefs(forecastStore);
</script>
<template>
  <h1 class="h1">Forecast</h1>
  <div class="p-4 border">
    <Forecast />
  </div>
  <div class="p-4 border" v-if="hourlyWeather.length">
    <pre>{{ hourlyWeather }}</pre>
  </div>
  <div class="p-4 border" v-if="dailyWeather.length">
    <pre>{{ dailyWeather }}</pre>
  </div>
  <Forecast />
</template>
