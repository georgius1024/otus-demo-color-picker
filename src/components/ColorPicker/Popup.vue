<template>
  <div class="otus-color-picker__popup" :class="{ open }">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
defineProps({
  open: { type: Boolean, required: true }
});
</script>
