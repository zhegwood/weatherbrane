<script setup lang="ts">
import { useForecastStore } from "~/stores/open-meteo/forecast";

const { currentWeather } = storeToRefs(useForecastStore());
</script>
<template>
  <div class="border border-gray-500 rounded-md p-4 self-start">
    content
    <div>
      <pre>{{ currentWeather }}</pre>
    </div>
  </div>
</template>
