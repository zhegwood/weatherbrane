<script setup lang="ts">
const timezone = useState("timezone");
</script>
<template>
  <h1 class="h1">Forecast</h1>
  {{ timezone }}
  <Forecast />
</template>
