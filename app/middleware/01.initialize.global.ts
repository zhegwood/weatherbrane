export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) {
    return;
  }

  const nuxtApp = useNuxtApp();
  if (nuxtApp.isHydrating && nuxtApp.payload.serverRendered) {
    return;
  }

  await useAppInitialization().initialize();
});