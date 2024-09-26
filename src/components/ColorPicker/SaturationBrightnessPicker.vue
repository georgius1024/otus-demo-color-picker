<template>
  <div
    class="otus-color-picker__lightness-and-saturation-picker"
    :style="{ backgroundColor: baseColor }"
    @click="clickHandler"
  >
    <div class="otus-color-picker__saturation-picker"></div>
    <div class="otus-color-picker__lightness-picker"></div>
    <Marker :x="x" :y="y" />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import tinycolor2 from 'tinycolor2';
import Marker from './Marker.vue';

const props = defineProps({
  color: { type: String, required: true }
});
const emit = defineEmits(['change']);

const baseColor = computed<string>(() => {
  const HSV = tinycolor2(props.color).toHsv();
  return tinycolor2({ ...HSV, s: 1, v: 1 }).toHexString();
});

const clickHandler = (e: MouseEvent) => {
  e.stopPropagation();
  const { left, top, width, height } = (
    e.target as HTMLDivElement
  ).getBoundingClientRect();
  const clickX = e.clientX - left;
  const clickY = e.clientY - top;
  const saturation = clickX / width;
  const brightness = 1 - clickY / height;
  const HSV = tinycolor2(props.color).toHsv();
  emit(
    'change',
    tinycolor2({ ...HSV, s: saturation, v: brightness }).toHexString()
  );
};
const x = computed(() => {
  const HSV = tinycolor2(props.color).toHsv();
  return HSV.s * 100;
});
const y = computed(() => {
  const HSV = tinycolor2(props.color).toHsv();
  return 100 - HSV.v * 100;
});
</script>
