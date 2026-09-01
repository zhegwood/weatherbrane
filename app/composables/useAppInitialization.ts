import { useGeolocationStore } from "~/stores/geolocation";
import { useTimezoneStore } from "~/stores/timezone";

export const useAppInitialization = () => {
  const isInitializing = useState("isInitializing", () => true);
  const timezoneStore = useTimezoneStore();
  const geolocationStore = useGeolocationStore();

  const initialize = async () => {
    if (timezoneStore.timezone && geolocationStore.geolocation) {
      isInitializing.value = false;
      return;
    }

    isInitializing.value = true;

    try {
      await Promise.all([
        timezoneStore.setTimezone(),
        geolocationStore.geoLocate(),
      ]);
    } finally {
      isInitializing.value = false;
    }
  };

  return {
    initialize,
  };
};
