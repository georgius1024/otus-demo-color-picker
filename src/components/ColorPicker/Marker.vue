<template>
  <div
    class="otus-color-picker__marker"
    :style="{ left: `${x}%`, top: `${y ?? 50}%` }"
  />
</template>
<script setup lang="ts">
defineProps({
  x: { type: Number },
  y: { type: Number }
});
</script>

