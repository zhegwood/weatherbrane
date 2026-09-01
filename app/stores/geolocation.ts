import { defineStore } from "pinia";
import { ref } from "vue";
import { useRuntimeConfig } from "#app";

interface GeolocationData {
  lat: number;
  lng: number;
}

export const useGeolocationStore = defineStore("geolocation", () => {
  const geolocation = ref<GeolocationData | null>(null);

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
          lng,
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

  return {
    geolocation,
    geoLocate,
  };
});
