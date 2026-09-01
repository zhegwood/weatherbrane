/// <reference types="node" />
// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  // Current compatibility date
  compatibilityDate: "2026-08-15",

  future: {
    compatibilityVersion: 4, // Ensures Nuxt 4 behavior
  },

  // Targets your main CSS file
  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    public: {
      googleMapsApiKey: (process.env as any).GOOGLE_MAPS_API_KEY || "",
    },
  },

  modules: ["@pinia/nuxt"],
});