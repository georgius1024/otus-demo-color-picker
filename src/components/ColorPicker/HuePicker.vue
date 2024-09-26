<template>
  <div class="otus-color-picker__hue-picker" @click="clickHandler">
    <Marker :x="x" />
  </div>
</template>
<script setup lang="ts">
import tinycolor2 from 'tinycolor2';
import { computed } from 'vue';
import Marker from './Marker.vue';
const props = defineProps({
  color: { type: String, required: true }
});
const emit = defineEmits(['change']);

const clickHandler = (e: MouseEvent) => {
  e.stopPropagation();
  const { left, width } = (e.target as HTMLDivElement).getBoundingClientRect();
  const clickX = e.clientX - left;
  const angle = (clickX / width) * 360;
  const HSV = tinycolor2(props.color).toHsv();
  emit('change', tinycolor2({ ...HSV, h: angle }).toHexString());
};

const x = computed(() => {
  const HSV = tinycolor2(props.color).toHsv();
  return (HSV.h / 360) * 100;
});
</script>
