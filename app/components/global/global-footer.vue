<script setup lang="ts">
const year = computed(() => new Date().getFullYear());
</script>
<template>
  <div class="border-t border-gray-500 py-2 px-4">
    &copy;{{ year }} Weatherbrane
  </div>
</template>
