<script setup lang="ts"></script>
<template>
  <div
    class="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-white/95"
    role="status"
    aria-live="polite"
  >
    <div class="flex items-center gap-3">
      <span
        class="h-5 w-5 animate-spin rounded-full border-2 border-black"
        aria-hidden="true"
      />
      <span>loading...</span>
    </div>
  </div>
</template>
