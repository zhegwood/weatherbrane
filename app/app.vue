<script setup lang="ts">
import { onMounted } from "vue";

const timezone = useState<string>("timezone", () => "");

const geolocation = useState<{
  lat: number;
  lng: number;
} | null>("geolocation", () => null);

const setTimezone = () => {
  const storedTimezone = localStorage.getItem("weatherbrane-timezone");

  if (storedTimezone) {
    timezone.value = storedTimezone;
    return;
  } else {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    timezone.value = userTimezone;
    localStorage.setItem("weatherbrane-timezone", userTimezone);
  }
};

const fallbackToGoogleMapsGeolocation = async () => {
  try {
    const config = useRuntimeConfig();
    const apiKey = config.public.googleMapsApiKey as string | undefined;

    if (!apiKey) {
      console.error("Google Maps API key is not configured");
      return;
    }

    const response = await fetch(
      `https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`,
      { method: "POST" },
    );

    const {
      location: { lat, lng },
    } = await response.json();

    if (lat && lng) {
      const geoData = {
        lat,
        lng: lng,
      };
      geolocation.value = geoData;
      localStorage.setItem("weatherbrane-geolocation", JSON.stringify(geoData));
    }
  } catch (error) {
    console.error("Geolocation fallback failed:", error);
  }
};

const geoLocate = () => {
  const storedGeoLocation = localStorage.getItem("weatherbrane-geolocation");

  if (storedGeoLocation) {
    geolocation.value = JSON.parse(storedGeoLocation);
    return;
  }

  // Try browser geolocation first
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const geoData = { lat: latitude, lng: longitude };
      geolocation.value = geoData;
      localStorage.setItem("weatherbrane-geolocation", JSON.stringify(geoData));
    },
    (error) => {
      // User denied or error occurred, fall back to Google Maps Geolocation API
      fallbackToGoogleMapsGeolocation();
    },
  );
};

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
