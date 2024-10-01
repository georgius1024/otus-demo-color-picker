<template>
  <div
    class="otus-color-picker__color-sample"
    :style="{ backgroundColor: colorValue }"
  ></div>
</template>
<script setup lang="ts">
import { inject, Ref } from 'vue';
const colorValue = inject<Ref<string>>('ColorValue');
</script>
