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
});
