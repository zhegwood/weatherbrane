<script setup lang="ts">
import { ref, watch } from "vue";
import { useGeolocationStore } from "~/stores/geolocation";

const geolocationStore = useGeolocationStore();
const { geolocation } = storeToRefs(geolocationStore);

const latitude = ref("");
const longitude = ref("");

const setGeo = () => {
  const lat = Number(latitude.value);
  const lng = Number(longitude.value);

  if (geolocation.value?.lat === lat && geolocation.value?.lng === lng) {
    return;
  }

  geolocationStore.setGeolocation({ lat, lng });
};

watch(
  geolocation,
  (value) => {
    if (!value) {
      return;
    }

    latitude.value = String(value.lat);
    longitude.value = String(value.lng);
  },
  { immediate: true },
);
</script>
<template>
  <div class="flex flex-row gap-2 items-center">
    <div>
      <label for="latitude" class="sr-only">Latitude</label>
      <input
        id="latitude"
        type="text"
        placeholder="latitude"
        class="g-interactive"
        v-model="latitude"
      />
    </div>
    <div>
      <label for="longitude" class="sr-only">Longitude</label>
      <input
        id="longitude"
        type="text"
        placeholder="longitude"
        class="g-interactive"
        v-model="longitude"
      />
    </div>
    <button type="button" @click="setGeo">Set Geo</button>
  </div>
</template>
