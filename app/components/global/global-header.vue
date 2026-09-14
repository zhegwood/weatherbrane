<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTimezoneStore } from "~/stores/timezone";
import { useGeolocationStore } from "~/stores/geolocation";

const geolocationStore = useGeolocationStore();
const { geolocation } = storeToRefs(geolocationStore);
const { timezone, timeZones } = storeToRefs(useTimezoneStore());
</script>
<template>
  <nav
    class="flex flex-row justify-between items-center bg-white border-b border-gray-500 drop-shadow-sm"
  >
    <div>logo</div>
    <div class="flex flex-row items-center gap-4">
      <div>links</div>
      <GeolocationCoords v-if="geolocation" />
      <select v-model="timezone" class="w-[200px]">
        <option v-for="tz in timeZones" :key="tz" :value="tz">{{ tz }}</option>
      </select>
    </div>
  </nav>
</template>
