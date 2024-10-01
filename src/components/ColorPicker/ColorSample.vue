<template>
  <div
    class="otus-color-picker__color-sample"
    :style="{ backgroundColor: colorValue }"
  ></div>
</template>
<script setup lang="ts">
import useColorContext from './ColorContext';
const { colorValue } = useColorContext();
</script>
