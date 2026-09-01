<script setup lang="ts">
import { onMounted } from "vue";
import { useTimezoneStore } from "~/stores/timezone";
import { useGeolocationStore } from "~/stores/geolocation";

const { setTimezone } = useTimezoneStore();
const { geoLocate } = useGeolocationStore();

onMounted(() => {
  setTimezone();
  geoLocate();
});
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
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
</style>
