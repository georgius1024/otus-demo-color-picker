<template>
  <div
    class="otus-color-picker__lightness-and-saturation-picker"
    :style="{ backgroundColor: baseColor() }"
    @click="clickHandler"
  >
    <div class="otus-color-picker__saturation-picker"></div>
    <div class="otus-color-picker__lightness-picker"></div>
    <Marker :x="x" :y="y"/>
  </div>
</template>
<script setup lang="ts">
import { inject, computed, Ref } from 'vue';
import tinycolor2 from 'tinycolor2';
import Marker from './Marker.vue';

const colorValue = inject<Ref<string>>('ColorValue');
const colorUpdate = inject<(e: string) => void>('ColorUpdate');

const baseColor = () => {
  const hsv = tinycolor2(colorValue?.value).toHsv();
  return tinycolor2({ ...hsv, s: 1, v: 0.5 }).toHexString();
};

const clickHandler = (e: MouseEvent) => {
  e.stopPropagation();
  const { left, top, width, height } = (
    e.target as HTMLDivElement
  ).getBoundingClientRect();
  const clickX = e.clientX - left;
  const clickY = e.clientY - top;
  console.log(clickX, clickY, width)
  const saturation = clickX / width;
  const brightness = 1 - clickY / height;
  console.log(saturation * 100, brightness * 100)
  const hsv = tinycolor2(colorValue?.value).toHsv();
  const updated = tinycolor2({
    ...hsv,
    s: saturation * 100,
    v: brightness * 100
  });
  colorUpdate && colorUpdate(updated.toHexString());
};
const x = computed(() => {
  const hsv = tinycolor2(colorValue?.value).toHsv();
  console.log(hsv.s * 100)
  return hsv.s * 100;
});
const y = computed(() => {
  const hsv = tinycolor2(colorValue?.value).toHsv();
  return 100 - hsv.v * 100;
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
