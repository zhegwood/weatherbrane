<script setup lang="ts"></script>
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
</style>
