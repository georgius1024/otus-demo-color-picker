<template>
  <div
    class="otus-color-picker__color-sample"
    :style="{ backgroundColor: color }"
  ></div>
</template>
<script setup lang="ts">
defineProps({
  color: { type: String, required: true }
});
</script>
