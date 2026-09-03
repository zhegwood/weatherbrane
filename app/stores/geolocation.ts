import { defineStore } from "pinia";
import { ref } from "vue";
import { useRuntimeConfig } from "#app";
import type { GeolocationData } from "~/types/geolocation-data";

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

      if (!lat || !lng) {
        throw new Error("Invalid geolocation data from API");
      }

      const geoData = {
        lat,
        lng,
      };
      geolocation.value = geoData;
      localStorage.setItem("weatherbrane-geolocation", JSON.stringify(geoData));
    } catch (error) {
      console.error("Geolocation fallback failed:", error);
    }
  };

  const getCurrentPosition = () =>
    new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

  const geoLocate = async () => {
    const storedGeoLocation = localStorage.getItem("weatherbrane-geolocation");

    if (storedGeoLocation) {
      geolocation.value = JSON.parse(storedGeoLocation);
      return;
    }

    try {
      const { coords } = await getCurrentPosition();
      const geoData = { lat: coords.latitude, lng: coords.longitude };
      geolocation.value = geoData;
      localStorage.setItem(
        "weatherbrane-geolocation",
        JSON.stringify(geoData),
      );
    } catch {
      await fallbackToGoogleMapsGeolocation();
    }
  };

  return {
    geolocation,
    geoLocate,
  };
});
