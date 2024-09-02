<template>
  <div
    class="otus-color-picker__lightness-and-saturation-picker"
    :style="{ backgroundColor: baseColor() }"
    @click="clickHandler"
  >
  <div class="otus-color-picker__saturation-picker"></div>
    <div class="otus-color-picker__lightness-picker"></div>
  </div>
</template>
<script setup lang="ts">
import { inject } from 'vue';
import tinycolor2 from 'tinycolor2';

import type { ColorControl } from './index.vue';
const colorControl = inject<ColorControl>('colorControl');
const baseColor = () => {
  const hsv = tinycolor2(colorControl?.color()).toHsv();
  return tinycolor2({ ...hsv, s: 1, v: 0.5 }).toHexString();
};

const clickHandler = (e: MouseEvent) => {
  e.stopPropagation();
  const { left, top, width, height } = (
    e.target as HTMLDivElement
  ).getBoundingClientRect();
  const clickX = e.clientX - left;
  const clickY = e.clientY - top;

  const saturation = clickX / width;
  const brightness = 1 - clickY / height;
  const hsv = tinycolor2(colorControl?.color()).toHsv();
  const updated = tinycolor2({ ...hsv, s: saturation * 100, v: brightness * 100 });
  colorControl?.update(updated.toHexString());
  // console.log(hsl2rgb(hsv.h, saturation, brightness))
  // colorControl?.update(hsl2rgb(hsv.h, saturation, brightness))
  // const updated = tinycolor2({ ...hsv, s: saturation, v: brightness });
  // colorControl?.update(updated.toHexString());
  // const diagonal = Math.sqrt(width * width + height * height)
  // const production = width * clickX + height * clickY
  // const projection = production / diagonal
  // console.log(projection)
  // const lightness = 1 - projection / diagonal
  // const lightness = Math.max(0, 1 - clickY / height)
  // const lightness = (1 - clickY / height)
  // const hsl = tinycolor2(colorControl?.color()).toHsl()
  // const updated = tinycolor2({...hsl, s: saturation, l: lightness})
  // colorControl?.update(updated.toHexString())
  // console.log({saturation, lightness})
  // const angle = clickX / width * 100
  // const hsl = tinycolor2(colorControl?.color()).toHsl()
  // hsl.h = angle
  // const updated = tinycolor2({...hsl, h: angle})
  // console.log(hsl, updated.toHexString())
  // colorControl?.update(updated.toHexString())
};
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
