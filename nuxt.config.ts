/// <reference types="node" />
// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2026-08-15", // Current compatibility date
  future: {
    compatibilityVersion: 4, // Ensures Nuxt 4 behavior
  },
  css: ["~/assets/css/main.css"], // Targets your main CSS file
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    public: {
      googleMapsApiKey: (process.env as any).GOOGLE_MAPS_API_KEY || "",
    },
  },
});
