<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTimezoneStore } from "~/stores/timezone";
import { useGeolocationStore } from "~/stores/geolocation";

const { timezone } = storeToRefs(useTimezoneStore());
const { geolocation } = storeToRefs(useGeolocationStore());
</script>
<template>
  <h1 class="h1">Forecast</h1>
  {{ timezone }}
  <pre>{{ geolocation }}</pre>
  <Forecast />
</template>
