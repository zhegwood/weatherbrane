<script setup lang="ts">
import GlobalHeader from "../components/global/global-header.vue";
import GlobalFooter from "../components/global/global-footer.vue";
</script>
<template>
  <div class="h-full w-full flex flex-col">
    <GlobalHeader class="flex-none px-4 py-2" />
    <div class="flex-auto w-full max-w-7xl mx-auto px-4 xl:px-0 py-4 overflow-y-auto">
      <slot />
    </div>
    <GlobalFooter class="flex-none" />
  </div>
</template>
