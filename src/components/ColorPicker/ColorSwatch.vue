<template>
  <div class="otus-color-picker__color-swatch" :style="{ backgroundColor: colorValue }"></div>
</template>
<script setup lang="ts">
import useColorContext from './ColorContext';
const {colorValue} = useColorContext()
</script>
<style lang="scss">
.otus-color-picker__color-swatch {
  display: block;
  width: 24px;
  height: 24px;
  border-radius: 2px;
}
</style>