<script setup lang="ts">
const timezone = useState("timezone");
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
