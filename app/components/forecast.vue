<script setup lang="ts">
import CurrentWeather from "./current-weather.vue";
import DailyWeather from "./daily-weather.vue";
</script>
<template>
  <div class="flex flex-col ga-4">
    <CurrentWeather />
    <DailyWeather />
  </div>
</template>
