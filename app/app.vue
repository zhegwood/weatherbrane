<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue";
import { useForecastStore } from "~/stores/open-meteo/forecast";

const { initialize } = useAppInitialization();
const isInitializing = useState("isInitializing", () => true);

const {
  fetchForecast,
  fetchCurrentWeather,
  fetchHourlyWeather,
  fetchDailyWeather,
} = useForecastStore();

let currentRefreshTimer: ReturnType<typeof setInterval> | undefined;
let hourlyRefreshTimer: ReturnType<typeof setInterval> | undefined;
let dailyRefreshTimer: ReturnType<typeof setInterval> | undefined;

onMounted(async () => {
  await initialize();

  try {
    await fetchForecast();
  } finally {
    isInitializing.value = false;
  }

  currentRefreshTimer = setInterval(
    async () => {
      localStorage.removeItem("weatherbrane-current-weather");
      await fetchCurrentWeather();
    },
    7 * 60 * 1000, //7 minutes
  );

  hourlyRefreshTimer = setInterval(
    async () => {
      localStorage.removeItem("weatherbrane-hourly-weather");
      await fetchHourlyWeather();
    },
    30 * 60 * 1000, //30 minutes
  );

  dailyRefreshTimer = setInterval(
    async () => {
      localStorage.removeItem("weatherbrane-daily-weather");
      await fetchDailyWeather();
    },
    3 * 60 * 60 * 1000, //3 hours
  );
});

onBeforeUnmount(() => {
  if (currentRefreshTimer) {
    clearInterval(currentRefreshTimer);
  }
  if (hourlyRefreshTimer) {
    clearInterval(hourlyRefreshTimer);
  }
  if (dailyRefreshTimer) {
    clearInterval(dailyRefreshTimer);
  }
});
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <GlobalOverlay v-if="isInitializing" />
</template>
<!-- Global on purpose -->
<style lang="css">
@reference "tailwindcss";

html,
body,
#__nuxt,
.app {
  @apply h-full w-full;
}
.g-interactive {
  @apply focus:outline-none focus:ring-offset-1 focus:ring-2 focus:ring-blue-500;
}
.h1 {
  @apply text-3xl font-semibold leading-tight mb-4;
}
input[type="text"],
input[type="password"] {
  @apply py-1 px-4 border rounded;
}
button[type="button"] {
  @apply py-1 px-4 border rounded hover:bg-gray-100 hover:cursor-pointer;
}
.sr-only {
  @apply absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0;
  clip: rect(0, 0, 0, 0);
}
</style>
