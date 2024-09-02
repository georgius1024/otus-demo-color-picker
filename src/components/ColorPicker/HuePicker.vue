<template>
<div class="otus-color-picker__hue-picker" @click="clickHandler"></div>
</template>
<script setup lang="ts">
import { inject } from 'vue';
import tinycolor2 from 'tinycolor2'

import type { ColorControl } from './index.vue';
const colorControl = inject<ColorControl>('colorControl')

const clickHandler = (e: MouseEvent)  => {
  e.stopPropagation()
  const {left, width} = (e.target as HTMLDivElement).getBoundingClientRect()
  const clickX = e.clientX - left
  const angle = (clickX / width) * 360
  const hsl = tinycolor2(colorControl?.color()).toHsl()
  colorControl?.update(tinycolor2({...hsl, h: angle}).toHexString())
}
</script>
<style lang="scss" scoped>
.otus-color-picker__hue-picker {
  height: 24px;
  display: block;
  border-radius: 4px;
  background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
}
</style>