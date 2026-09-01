<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTimezoneStore } from "~/stores/timezone";
const { timezone } = storeToRefs(useTimezoneStore());
</script>
<template>
  <nav
    class="flex flex-row justify-between bg-white border-b border-gray-500 drop-shadow-sm"
  >
    <div>logo</div>
    <div class="flex flex-row gap-4">
      <div>links</div>
      <div>{{ timezone }}</div>
    </div>
  </nav>
</template>
