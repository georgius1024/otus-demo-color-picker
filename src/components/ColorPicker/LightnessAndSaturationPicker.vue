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
import Marker from './Marker.vue';
import useContext from './Context';

const { colorHSV, baseColor } = useContext();

const clickHandler = (e: MouseEvent) => {
  e.stopPropagation();
  const { left, top, width, height } = (
    e.target as HTMLDivElement
  ).getBoundingClientRect();
  const clickX = e.clientX - left;
  const clickY = e.clientY - top;
  const saturation = clickX / width;
  const brightness = 1 - clickY / height;
  colorHSV.value = {
    ...colorHSV.value,
    s: saturation * 100,
    v: brightness * 100
  };
};
const x = computed(() => {
  return colorHSV.value.s * 100;
});
const y = computed(() => {
  return 100 - colorHSV.value.v * 100;
});
</script>
<style lang="scss" scoped>
.otus-color-picker__lightness-and-saturation-picker {
  height: 240px;
  overflow: clip;
  border-radius: 4px;
  position: relative;
  display: block;
  .otus-color-picker__lightness-picker {
    position: absolute;
    background: linear-gradient(to top, #000, #0000);
    inset: 0;
  }
  .otus-color-picker__saturation-picker {
    position: absolute;
    background: linear-gradient(to right, #fff, #fff0);
    inset: 0;
  }
}
</style>
