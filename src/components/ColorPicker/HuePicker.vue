<template>
  <div class="otus-color-picker__hue-picker" @click="clickHandler">
    <Marker :x="x" />
  </div>
</template>
<script setup lang="ts">
import useColorContext from './ColorContext';
import { computed } from 'vue';
import Marker from './Marker.vue';

const { colorHSV } = useColorContext();

const clickHandler = (e: MouseEvent) => {
  e.stopPropagation();
  const { left, width } = (e.target as HTMLDivElement).getBoundingClientRect();
  const clickX = e.clientX - left;
  const angle = (clickX / width) * 360;
  colorHSV.value = { ...colorHSV.value, h: angle };
};

const x = computed(() => {
  return (colorHSV.value.h / 360) * 100;
});
</script>
