<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTimezoneStore } from "~/stores/timezone";
import { useGeolocationStore } from "~/stores/geolocation";

const geolocationStore = useGeolocationStore();
const { geolocation } = storeToRefs(geolocationStore);
const { timezone } = storeToRefs(useTimezoneStore());
</script>
<template>
  <nav
    class="flex flex-row justify-between items-center bg-white border-b border-gray-500 drop-shadow-sm"
  >
    <div>logo</div>
    <div class="flex flex-row items-center gap-4">
      <div>links</div>
      <GeolocationCoords v-if="geolocation" />
      {{ timezone }}
    </div>
  </nav>
</template>
