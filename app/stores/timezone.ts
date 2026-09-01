import { defineStore } from "pinia";
import { ref } from "vue";

export const useTimezoneStore = defineStore("timezone", () => {
  const timezone = ref<string>("");

  const setTimezone = () => {
    const storedTimezone = localStorage.getItem("weatherbrane-timezone");

    if (storedTimezone) {
      timezone.value = storedTimezone;
      return;
    }

    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    timezone.value = userTimezone;
    localStorage.setItem("weatherbrane-timezone", userTimezone);
  };

  return {
    timezone,
    setTimezone,
  };
});
